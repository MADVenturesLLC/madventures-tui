// apps/madv-agent/test/shell-timeout-forwarding.test.ts
// The review found that --shell-timeout was parsed and then DROPPED: the call
// site forwarded maxRounds and nothing else, so the flag did nothing at all.
// A test that only inspected the parse would not have caught it. This one
// measures: a 6-second command under --shell-timeout 5 must be killed at 5s,
// which cannot happen while the 120s default is in force.

import { describe, expect, test } from "bun:test";
import { mkdtempSync, readdirSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runCli, type CliIo } from "../src/cli";

const enc = new TextEncoder();

function sse(content: string): Response {
  const stream = new ReadableStream<Uint8Array>({
    start(c) {
      c.enqueue(enc.encode(`data: ${JSON.stringify({ choices: [{ delta: { content }, finish_reason: null }] })}\n\n`));
      c.enqueue(enc.encode(`data: ${JSON.stringify({ choices: [{ delta: {}, finish_reason: "stop" }], model: "m" })}\n\n`));
      c.enqueue(enc.encode("data: [DONE]\n\n"));
      c.close();
    },
  });
  return new Response(stream, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

function toolResults(dir: string): string[] {
  const sessions = join(dir, ".madv-agent", "sessions");
  const id = readdirSync(sessions)[0] ?? "";
  const lines = readFileSync(join(sessions, id, "events.jsonl"), "utf8").trim().split("\n");
  return lines
    .map((l) => JSON.parse(l) as { type: string; payload: Record<string, unknown> })
    .filter((e) => e.type === "tool_result")
    .map((e) => String(e.payload.summary));
}

describe("--shell-timeout reaches the tool", () => {
  test("BITE: a 6s command under --shell-timeout 5 is killed at 5000ms", async () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-fwd-"));
    const io: CliIo = {
      env: { PATH: "/usr/bin:/bin", HOME: tmpdir() },
      cwd: dir,
      argv: ["--project", dir, "--shell-timeout", "5", "--prompt", "run a slow command"],
      stdout: () => {},
      stderr: () => {},
      deleteEnv: () => {},
      processHooks: { onExit: () => {}, onSignal: () => {}, exit: () => {} },
      // Approved by the harness, attributed to the harness — not the Founder.
      approver: async () => ({ granted: true, by: "test(forwarding)" }),
    };
    const real = globalThis.fetch;
    // One tool call, then a plain answer. Otherwise the loop breaker stops the
    // turn after three identical 5-second kills, and the elapsed bound would
    // measure that instead of the timeout.
    let call = 0;
    globalThis.fetch = (async () => {
      call += 1;
      return call === 1
        ? sse('```madv-tool\n{"tool":"shell","args":{"argv":["sleep","6"]}}\n```')
        : sse("the command was killed at the timeout");
    }) as unknown as typeof fetch;
    const started = Date.now();
    try {
      await runCli(io);
    } finally {
      globalThis.fetch = real;
    }
    const elapsed = Date.now() - started;
    const results = toolResults(dir);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toContain("timed out after 5000ms");
    expect(elapsed).toBeLessThan(7_000);
  }, 30_000);
});
