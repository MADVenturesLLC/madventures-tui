// apps/madv-agent/test/turn-loop-guards.test.ts
// BITE PROOFS for the loop guards found by running the agent against a live
// model: it sent 68 tool blocks in two replies, 25 of them distinct, and read
// the same file 13 times. Each test below fails on the code that shipped at
// d604ae3, where every block was executed and the budget was 6.

import { describe, expect, test } from "bun:test";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { PassThrough } from "node:stream";
import { EventWriter, readEvents } from "../src/events";
import { runTurn } from "../src/turn";
import { terminalApprover } from "../src/approval";

const enc = new TextEncoder();

function sse(content: string): Response {
  const stream = new ReadableStream<Uint8Array>({
    start(c) {
      c.enqueue(enc.encode(`data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`));
      c.enqueue(
        enc.encode(
          `data: ${JSON.stringify({ choices: [{ delta: {}, finish_reason: "stop" }], model: "m" })}\n\n`,
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

function project(): string {
  const dir = mkdtempSync(join(tmpdir(), "madv-loop-"));
  writeFileSync(join(dir, "a.txt"), "hello\n");
  return dir;
}

function block(path: string): string {
  return "```madv-tool\n" + JSON.stringify({ tool: "read_file", args: { path } }) + "\n```";
}

const sessionFile = (dir: string): string =>
  join(dir, ".madv-agent", "sessions", "s-loop", "events.jsonl");

describe("turn loop guards", () => {
  test("BITE: 62 blocks in one reply run at most 4 calls, the rest are refused by name", async () => {
    const dir = project();
    const writer = new EventWriter(sessionFile(dir));
    writer.loadExisting();
    // 62 identical-block replies is exactly what the live model produced.
    const flood = Array.from({ length: 62 }, () => block("a.txt")).join("\n");

    await runTurn(writer, "go", {
      proxyUrl: "http://127.0.0.1:14933",
      projectDir: dir,
      fetchImpl: scriptedFetch([flood, "done"]),
    });

    const results = readEvents(writer.filePath).filter((e) => e.type === "tool_result");
    const ran = results.filter((e) => (e.payload as { status: string }).status === "ok");
    const refused = results.filter((e) => (e.payload as { status: string }).status === "refused");
    // 1 distinct call runs; the other 61 are duplicates of it.
    expect(ran.length).toBe(1);
    expect(refused.length).toBe(61);
    expect((refused[0]?.payload as { summary: string }).summary).toMatch(/duplicate call/);
  });

  test("BITE: more than maxCallsPerRound DISTINCT calls are capped, and the cap is explained", async () => {
    const dir = project();
    const writer = new EventWriter(sessionFile(dir));
    writer.loadExisting();
    // 8 distinct paths, all inside the root.
    const flood = Array.from({ length: 8 }, (_, i) => {
      writeFileSync(join(dir, `f${i}.txt`), `file ${i}\n`);
      return block(`f${i}.txt`);
    }).join("\n");

    await runTurn(writer, "go", {
      proxyUrl: "http://127.0.0.1:14933",
      projectDir: dir,
      fetchImpl: scriptedFetch([flood, "done"]),
    });

    const results = readEvents(writer.filePath)
      .filter((e) => e.type === "tool_result")
      .map((e) => e.payload as { status: string; summary: string });
    expect(results.filter((r) => r.status === "ok").length).toBe(4);
    const capped = results.filter((r) => r.status === "refused");
    expect(capped.length).toBe(4);
    expect(capped[0]?.summary).toMatch(/at most 4 are run/);
    expect(capped[0]?.summary).toMatch(/send one tool call per reply/);
  });

  test("BITE: the loop breaker stops a call repeated round after round", async () => {
    const dir = project();
    const writer = new EventWriter(sessionFile(dir));
    writer.loadExisting();
    // The same call, every round — the exact pathology seen live.
    const replies = Array.from({ length: 10 }, () => block("a.txt"));

    const res = await runTurn(writer, "go", {
      proxyUrl: "http://127.0.0.1:14933",
      projectDir: dir,
      fetchImpl: scriptedFetch(replies),
      maxRounds: 10,
    });

    const types = readEvents(writer.filePath).map((e) => e.type);
    const loopError = readEvents(writer.filePath).find(
      (e) => e.type === "stream_error" && /loop breaker/.test(JSON.stringify(e.payload)),
    );
    expect(loopError).toBeDefined();
    // One execution per round until the breaker trips at the 4th repeat.
    expect(types.filter((x) => x === "tool_call").length).toBeLessThanOrEqual(4);
    expect(res.toolCalls).toBeLessThanOrEqual(4);
  });

  test("BITE: the round budget is 40, not 6 — eight distinct rounds all run", async () => {
    const dir = project();
    const writer = new EventWriter(sessionFile(dir));
    writer.loadExisting();
    // Eight DIFFERENT calls, so the loop breaker is not what stops this.
    const replies = Array.from({ length: 8 }, (_, i) => {
      writeFileSync(join(dir, `r${i}.txt`), `round ${i}\n`);
      return block(`r${i}.txt`);
    });

    const res = await runTurn(writer, "go", {
      proxyUrl: "http://127.0.0.1:14933",
      projectDir: dir,
      fetchImpl: scriptedFetch(replies),
    });

    // With the old default of 6 this stops at 6 calls; the budget is now 40.
    expect(res.toolCalls).toBe(8);
    const calls = readEvents(writer.filePath).filter((e) => e.type === "tool_call");
    expect(calls.length).toBe(8);
  });
});

describe("approval over a pipe", () => {
  test("BITE: one piped stream answers several requests in order", async () => {
    const input = new PassThrough();
    const output = new PassThrough();
    const approver = terminalApprover({ input, output });

    // The bug this guards: a fresh readline interface per request consumed the
    // whole buffer on the first answer, so requests 2..n saw EOF and denied.
    input.write("y\ny\nn\n");
    input.end();

    const req = { tool: "write_file", kind: "write" as const, summary: "write a", detail: "{}" };
    const a = await approver(req);
    const b = await approver(req);
    const c = await approver(req);
    expect([a.granted, b.granted, c.granted]).toEqual([true, true, false]);
    expect(c.reason).toContain('answered "n"');
  });
});
