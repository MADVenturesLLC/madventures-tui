// apps/madv-agent/test/cli.test.ts
// CLI behaviour: argument parsing, scrub-at-entry, session listing, the
// end-to-end scripted prompt against a mock proxy, and the proxy-down
// refusal path (exit code 5, URL named, no fallback).

import { describe, expect, test } from "bun:test";
import { parseArgs, runCli, HELP_TEXT, type CliIo, type ProcessHooks } from "../src/cli";
import { verifyChain, readEvents, listSessions } from "../src/events";
import { openNewSession } from "../src/session";
import { lockPath, lockExists } from "../src/lock";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

function makeIo(
  argv: string[],
  env: Record<string, string | undefined> = {},
): { io: CliIo; out: string[]; err: string[]; env: Record<string, string | undefined> } {
  const fakeEnv: Record<string, string | undefined> = {
    PATH: "/usr/bin:/bin",
    HOME: "/home/founder",
    GH_TOKEN: "ghp_decoy",
    OPENAI_API_KEY: "sk_decoy",
    ...env,
  };
  const out: string[] = [];
  const err: string[] = [];
  const io: CliIo = {
    env: fakeEnv,
    cwd: process.cwd(),
    argv,
    stdout: (t) => {
      out.push(t);
    },
    stderr: (t) => {
      err.push(t);
    },
    deleteEnv: (name: string) => {
      delete fakeEnv[name];
    },
  };
  return { io, out, err, env: fakeEnv };
}

function sseChunk(id: number, delta: string, model: string): string {
  return `data: ${JSON.stringify({
    id: `chatcmpl-${id}`,
    model,
    choices: [{ index: 0, delta: { content: delta }, finish_reason: null }],
  })}\n\n`;
}

describe("argument parsing", () => {
  test("--project, --resume <id>, bare --resume, --prompt", () => {
    expect(parseArgs(["--project", "/tmp/x"])).toEqual({
      projectDir: "/tmp/x",
      help: false,
    });
    expect(parseArgs(["--project=/tmp/x"])).toEqual({
      projectDir: "/tmp/x",
      help: false,
    });
    expect(parseArgs(["--resume", "s-1"])).toEqual({
      resumeId: "s-1",
      help: false,
    });
    expect(parseArgs(["--resume"])).toEqual({ resumeId: null, help: false });
    expect(parseArgs(["--prompt", "hi"])).toEqual({ prompt: "hi", help: false });
    expect(parseArgs([])).toEqual({ help: false });
    expect(parseArgs(["--help"]).help).toBe(true);
    expect(() => parseArgs(["--bogus"])).toThrow(/unknown argument/);
    expect(() => parseArgs(["--prompt"])).toThrow(/requires a value/);
  });
});

describe("scrub at entry, through runCli", () => {
  test("the environment loses GH_TOKEN and OPENAI_API_KEY before anything runs", async () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-agent-cli-"));
    const { io, env, out } = makeIo(["--resume", "--project", dir]);
    const result = await runCli(io);
    expect(result.code).toBe(0);
    expect(env["GH_TOKEN"]).toBeUndefined();
    expect(env["OPENAI_API_KEY"]).toBeUndefined();
    expect(out.join("\n")).toContain("no sessions");
  });

  test("a non-loopback proxy URL is refused before any network activity", async () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-agent-cli-"));
    const { io, err } = makeIo(["--prompt", "hi", "--project", dir], {
      MADV_AGENT_PROXY_URL: "http://10.1.2.3:14933",
    });
    const result = await runCli(io);
    expect(result.code).toBe(2);
    expect(err.join("\n")).toContain("loopback");
  });
});

describe("session listing (--resume alone)", () => {
  test("lists sessions with event counts and chain integrity", async () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-agent-cli-"));
    // Seed one session via a scripted prompt against a mock proxy.
    const server = Bun.serve({
      port: 0,
      fetch: async (req) => {
        const body = (await req.json()) as { messages: unknown[] };
        void body;
        const enc = new TextEncoder();
        const stream = new ReadableStream<Uint8Array>({
          start(c) {
            c.enqueue(enc.encode(sseChunk(1, "ok", "glm-5.3-flash:cloud")));
            c.enqueue(enc.encode("data: [DONE]\n\n"));
            c.close();
          },
        });
        return new Response(stream, {
          status: 200,
          headers: { "Content-Type": "text/event-stream" },
        });
      },
    });
    const proxyEnv = { MADV_AGENT_PROXY_URL: `http://127.0.0.1:${server.port}` };
    const first = makeIo(["--prompt", "ping", "--project", dir], proxyEnv);
    const r1 = await runCli(first.io);
    expect(r1.code).toBe(0);

    const second = makeIo(["--resume", "--project", dir]);
    const r2 = await runCli(second.io);
    expect(r2.code).toBe(0);
    expect(second.out.join("\n")).toMatch(/sessions in/);
    expect(second.out.join("\n")).toMatch(/chain=ok/);
    expect(second.out.join("\n")).toMatch(/events=4/); // start, scrub, user, assistant
    server.stop(true);
  });
});

describe("scripted prompt end to end (bites a + b + d at CLI level)", () => {
  test("one prompt streams deltas live and appends a verifying hash chain", async () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-agent-cli-"));
    let requests = 0;
    let authHeader: string | null = "unset";
    const server = Bun.serve({
      port: 0,
      fetch: async (req) => {
        requests++;
        authHeader = req.headers.get("Authorization");
        const enc = new TextEncoder();
        const stream = new ReadableStream<Uint8Array>({
          start(c) {
            c.enqueue(enc.encode(sseChunk(1, "streamed ", "glm-5.3-flash:cloud")));
            c.enqueue(enc.encode(sseChunk(2, "answer", "glm-5.3-flash:cloud")));
            c.enqueue(enc.encode("data: [DONE]\n\n"));
            c.close();
          },
        });
        return new Response(stream, {
          status: 200,
          headers: { "Content-Type": "text/event-stream" },
        });
      },
    });

    const { io, out, env } = makeIo(["--prompt", "say something streamed", "--project", dir], {
      MADV_AGENT_PROXY_URL: `http://127.0.0.1:${server.port}`,
    });
    const result = await runCli(io);
    server.stop(true);

    expect(result.code).toBe(0);
    expect(requests).toBe(1);
    expect(authHeader).toBeNull(); // no credential is sent to the proxy
    // Scrub happened at entry, and the decoys never reached the request.
    expect(env["GH_TOKEN"]).toBeUndefined();
    expect(env["OPENAI_API_KEY"]).toBeUndefined();
    // Live deltas, in order, on stdout.
    expect(out.join("\n")).toContain("streamed ");
    expect(out.join("\n")).toContain("answer");
    expect(out.join("\n")).toContain("scrubbed 2 environment variable(s): GH_TOKEN, OPENAI_API_KEY");

    // The session's events verify as a chain and contain both messages.
    const sessions = listSessions(dir);
    expect(sessions).toHaveLength(1);
    expect(sessions[0]!.chainOk).toBe(true);
    const events = readEvents(join(dir, ".madv-agent", "sessions", sessions[0]!.id, "events.jsonl"));
    expect(events.map((e) => e.type)).toEqual([
      "session_start",
      "env_scrub",
      "user_message",
      "assistant_message",
    ]);
    expect(verifyChain(events).ok).toBe(true);
    const scrubPayload = events[1]!.payload as { dropped: string[] };
    expect(scrubPayload.dropped).toEqual(["GH_TOKEN", "OPENAI_API_KEY"]);
    // Names only — the event stream carries no values.
    expect(JSON.stringify(events)).not.toContain("ghp_decoy");
    expect(JSON.stringify(events)).not.toContain("sk_decoy");
  });
});

describe("proxy-down refusal through the CLI", () => {
  test("exit code 5, the refusal names the proxy URL, no assistant fallback", async () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-agent-cli-"));
    const server = Bun.serve({ port: 0, fetch: () => new Response("x") });
    const deadUrl = `http://127.0.0.1:${server.port}`;
    server.stop(true);

    const { io, err, out } = makeIo(["--prompt", "anyone?", "--project", dir], {
      MADV_AGENT_PROXY_URL: deadUrl,
    });
    const result = await runCli(io);
    expect(result.code).toBe(5);
    expect(err.join("\n")).toContain(deadUrl);
    expect(err.join("\n")).toContain("refusing to fall back");
    // No assistant text anywhere on stdout.
    expect(out.join("\n")).not.toMatch(/assistant · model/);
  });
});

describe("help", () => {
  test("--help prints the usage text and exits 0", async () => {
    const { io, out } = makeIo(["--help"]);
    const result = await runCli(io);
    expect(result.code).toBe(0);
    expect(out.join("\n")).toBe(HELP_TEXT);
  });
});

describe("path traversal via --resume is refused (D2)", () => {
  test("--resume ../../etc/passwd is refused before any path is touched", async () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-agent-cli-"));
    const { io, err } = makeIo(["--resume", "../../etc/passwd", "--project", dir]);
    const result = await runCli(io);
    expect(result.code).toBe(4);
    expect(err.join("\n")).toContain("not a session id");
    expect(err.join("\n")).toContain("../../etc/passwd");
  });

  test("a dot-segment id is equally refused", async () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-agent-cli-"));
    const { io, err } = makeIo(["--resume=../../.ssh/id_rsa", "--project", dir]);
    const result = await runCli(io);
    expect(result.code).toBe(4);
    expect(err.join("\n")).toContain("not a session id");
  });
});

describe("the lock is released on every exit path (D3)", () => {
  function fakeHooks() {
    const exitCbs: Array<() => void> = [];
    const signalCbs: Array<() => void> = [];
    let exitedWith: number | null = null;
    const hooks: ProcessHooks = {
      onExit: (cb) => exitCbs.push(cb),
      onSignal: (cb) => signalCbs.push(cb),
      exit: (code) => {
        exitedWith = code;
      },
    };
    return {
      hooks,
      runExit: () => exitCbs.forEach((cb) => cb()),
      runSignal: () => signalCbs.forEach((cb) => cb()),
      get exitedWith() {
        return exitedWith;
      },
    };
  }

  test("BITE: a clean resume (TUI) return leaves the lock released, not stale", async () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-agent-cli-"));
    const opened = openNewSession(dir, { kept: {}, dropped: [] }, { pid: 1, argv: [] });
    const { io } = makeIo(["--resume", opened.id, "--project", dir]);
    // Fake TUI: returns immediately, like a renderer that finished on its own.
    io.tui = async () => {};
    const fakes = fakeHooks();
    io.processHooks = fakes.hooks;

    const result = await runCli(io);
    expect(result.code).toBe(0);
    // While the TUI is notionally live the lock is still held…
    expect(lockExists(dir)).toBe(true);
    // …and a clean exit (normal renderer return) releases it.
    fakes.runExit();
    expect(lockExists(dir)).toBe(false);
  });

  test("BITE: a signal exit also releases the lock", async () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-agent-cli-"));
    const opened = openNewSession(dir, { kept: {}, dropped: [] }, { pid: 1, argv: [] });
    const { io } = makeIo(["--resume", opened.id, "--project", dir]);
    io.tui = async () => {};
    const fakes = fakeHooks();
    io.processHooks = fakes.hooks;
    await runCli(io);
    expect(lockExists(dir)).toBe(true);
    fakes.runSignal();
    expect(fakes.exitedWith).toBe(130);
    expect(lockExists(dir)).toBe(false);
  });

  test("the release is wired for the resume path specifically (regression to D3's exact leak)", async () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-agent-cli-"));
    const opened = openNewSession(dir, { kept: {}, dropped: [] }, { pid: 1, argv: [] });
    const { io } = makeIo(["--resume", opened.id, "--project", dir]);
    let wired = false;
    io.tui = async () => {};
    const hooks: ProcessHooks = {
      onExit: (cb) => {
        wired = true;
        cb();
      },
      onSignal: () => {},
      exit: () => {},
    };
    io.processHooks = hooks;
    await runCli(io);
    // If the wiring were removed (the D3 defect), no handler would have been
    // registered and the lock would still exist here.
    expect(wired).toBe(true);
    expect(lockExists(dir)).toBe(false);
  });
});

describe("a malformed SSE frame is an error, not a reply (D4, end to end)", () => {
  test("--prompt exits 6, stderr names the frame, stdout carries no reply summary", async () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-agent-cli-"));
    const server = Bun.serve({
      port: 0,
      fetch: async () => {
        const enc = new TextEncoder();
        const stream = new ReadableStream<Uint8Array>({
          start(c) {
            c.enqueue(enc.encode('data: {"choices":[{"delta":{"content":"partial"}}]}\n\n'));
            c.enqueue(enc.encode("data: oops-not-json\n\n"));
            c.enqueue(enc.encode("data: [DONE]\n\n"));
            c.close();
          },
        });
        return new Response(stream, { status: 200, headers: { "Content-Type": "text/event-stream" } });
      },
    });
    const { io, err, out, env } = makeIo(["--prompt", "say hi", "--project", dir], {
      MADV_AGENT_PROXY_URL: `http://127.0.0.1:${server.port}`,
    });
    const result = await runCli(io);
    server.stop(true);
    expect(result.code).toBe(6);
    expect(err.join("\n")).toContain("STREAM ERROR");
    expect(err.join("\n")).toContain("malformed SSE frame");
    expect(out.join("\n")).not.toContain("[assistant ·");
    // The session records the error, not a reply.
    const sessions = listSessions(dir);
    const events = readEvents(join(dir, ".madv-agent", "sessions", sessions[0]!.id, "events.jsonl"));
    expect(events.map((e) => e.type)).toEqual([
      "session_start",
      "env_scrub",
      "user_message",
      "stream_error",
    ]);
    expect(verifyChain(events).ok).toBe(true);
    expect(env["GH_TOKEN"]).toBeUndefined();
  });
});
