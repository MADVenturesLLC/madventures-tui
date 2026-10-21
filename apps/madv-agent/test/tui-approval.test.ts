// apps/madv-agent/test/tui-approval.test.ts
// N4 BITE PROOFS.
//   - the pane answers the gate: a granted answer runs the tool, a denied one
//     refuses it, and both are EVENTS;
//   - with no pane mounted the gate fails CLOSED (no auto-approve);
//   - a second question supersedes the first as a denial, never an approval.

import { describe, expect, test } from "bun:test";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { openNewSession } from "../src/session";
import { runCli, type CliIo } from "../src/cli";
import type { TuiBootstrap } from "../src/bootstrap";

const enc = new TextEncoder();

function sse(content: string): Response {
  const stream = new ReadableStream<Uint8Array>({
    start(c) {
      c.enqueue(
        enc.encode(`data: ${JSON.stringify({ choices: [{ delta: { content }, finish_reason: null }] })}\n\n`),
      );
      c.enqueue(
        enc.encode(
          `data: ${JSON.stringify({ choices: [{ delta: {}, finish_reason: "stop" }], model: "glm-5.3-flash:cloud" })}\n\n`,
        ),
      );
      c.enqueue(enc.encode("data: [DONE]\n\n"));
      c.close();
    },
  });
  return new Response(stream, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

function scriptedFetch(replies: string[]): typeof fetch {
  let i = 0;
  return (async () => sse(replies[i++] ?? "done")) as unknown as typeof fetch;
}

function toolCall(tool: string, args: unknown): string {
  return "```madv-tool\n" + JSON.stringify({ tool, args }) + "\n```";
}

function makeIo(args: string[]): CliIo {
  return {
    env: { PATH: "/usr/bin:/bin", HOME: "/home/founder" },
    cwd: process.cwd(),
    // parseArgs reads io.argv as the ARGUMENT LIST, not the process argv — a
    // "bun cli.ts" prefix here is an unknown argument and runCli exits early.
    argv: args,
    stdout: () => {},
    stderr: () => {},
    deleteEnv: () => {},
    processHooks: { onExit: () => {}, onSignal: () => {}, exit: () => {} },
  };
}

function approvalEvents(dir: string, sessionId: string): Array<Record<string, unknown>> {
  const file = join(dir, ".madv-agent", "sessions", sessionId, "events.jsonl");
  const lines = readFileSync(file, "utf8").trim().split("\n");
  return lines
    .map((l) => JSON.parse(l) as { type: string; payload: unknown })
    .filter((e) => e.type === "approval")
    .map((e) => e.payload as Record<string, unknown>);
}

describe("N4 — the pane is the approval gate", () => {
  test("BITE: a granted answer in the pane runs the tool", async () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-n4-"));
    const opened = openNewSession(dir, { kept: {}, dropped: [] }, { pid: 1, argv: [] });
    const io = makeIo(["--resume", opened.id, "--project", dir]);
    const realFetch = globalThis.fetch;
    globalThis.fetch = scriptedFetch([toolCall("shell", { argv: ["echo", "pane-ok"] }), "finished"]);
    let asked = 0;
    try {
      io.tui = async (b: TuiBootstrap) => {
        b.registerApprovalHandler(async () => {
          asked += 1;
          return { granted: true, by: "founder(pane)" };
        });
        await b.runTurn("run echo", () => {});
      };
      await runCli(io);
    } finally {
      globalThis.fetch = realFetch;
    }
    const approvals = approvalEvents(dir, opened.id);
    expect(asked).toBe(1);
    expect(approvals.length).toBe(1);
    expect(approvals[0]?.granted).toBe(true);
    expect(String(approvals[0]?.by)).toBe("founder(pane)");
  });

  test("BITE: no pane mounted is a refusal, not an automatic yes", async () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-n4-"));
    const opened = openNewSession(dir, { kept: {}, dropped: [] }, { pid: 1, argv: [] });
    const io = makeIo(["--resume", opened.id, "--project", dir]);
    const realFetch = globalThis.fetch;
    globalThis.fetch = scriptedFetch([toolCall("shell", { argv: ["echo", "should-not-run"] }), "done"]);
    try {
      io.tui = async (b: TuiBootstrap) => {
        // Deliberately register nothing: this is a renderer that never mounted
        // a dialog.
        await b.runTurn("run echo", () => {});
      };
      await runCli(io);
    } finally {
      globalThis.fetch = realFetch;
    }
    const approvals = approvalEvents(dir, opened.id);
    expect(approvals.length).toBe(1);
    expect(approvals[0]?.granted).toBe(false);
    expect(String(approvals[0]?.reason)).toContain("fails closed");
  });

  test("a denial in the pane is recorded with its reason", async () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-n4-"));
    const opened = openNewSession(dir, { kept: {}, dropped: [] }, { pid: 1, argv: [] });
    const io = makeIo(["--resume", opened.id, "--project", dir]);
    const realFetch = globalThis.fetch;
    globalThis.fetch = scriptedFetch([toolCall("shell", { argv: ["echo", "nope"] }), "done"]);
    try {
      io.tui = async (b: TuiBootstrap) => {
        b.registerApprovalHandler(async () => ({ granted: false, by: "founder(pane)", reason: "denied in the pane" }));
        await b.runTurn("run echo", () => {});
      };
      await runCli(io);
    } finally {
      globalThis.fetch = realFetch;
    }
    const approvals = approvalEvents(dir, opened.id);
    expect(approvals[0]?.granted).toBe(false);
    expect(String(approvals[0]?.reason)).toContain("denied in the pane");
  });

  test("BITE: --approve-unattended grants, and never records the Founder", async () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-n4-"));
    const opened = openNewSession(dir, { kept: {}, dropped: [] }, { pid: 1, argv: [] });
    const io = makeIo(["--resume", opened.id, "--project", dir, "--approve-unattended"]);
    const realFetch = globalThis.fetch;
    globalThis.fetch = scriptedFetch([toolCall("shell", { argv: ["echo", "unattended"] }), "done"]);
    try {
      io.tui = async (b: TuiBootstrap) => {
        await b.runTurn("run echo", () => {});
      };
      await runCli(io);
    } finally {
      globalThis.fetch = realFetch;
    }
    const approvals = approvalEvents(dir, opened.id);
    expect(approvals.length).toBe(1);
    expect(approvals[0]?.granted).toBe(true);
    expect(String(approvals[0]?.by)).toBe("orchestrator(unattended)");
    expect(JSON.stringify(approvals[0])).not.toContain("founder");
  });

  test("BITE: after the pane unregisters, a request is refused, not parked", async () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-n4-"));
    const opened = openNewSession(dir, { kept: {}, dropped: [] }, { pid: 1, argv: [] });
    const io = makeIo(["--resume", opened.id, "--project", dir]);
    const realFetch = globalThis.fetch;
    globalThis.fetch = scriptedFetch([toolCall("shell", { argv: ["echo", "after-unmount"] }), "done"]);
    try {
      io.tui = async (b: TuiBootstrap) => {
        const unregister = b.registerApprovalHandler(async () => ({ granted: true, by: "pane" }));
        unregister(); // the pane unmounted
        await b.runTurn("run echo", () => {});
      };
      await runCli(io);
    } finally {
      globalThis.fetch = realFetch;
    }
    const approvals = approvalEvents(dir, opened.id);
    expect(approvals.length).toBe(1);
    expect(approvals[0]?.granted).toBe(false);
    expect(String(approvals[0]?.reason)).toContain("fails closed");
  });
});
