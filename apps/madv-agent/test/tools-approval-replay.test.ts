// apps/madv-agent/test/tools-approval-replay.test.ts
// BITE PROOFS (N3 §4.2, §4.4, §4.5, §4.6).
//   - an approval-needing call is refused unless a human grants it, and the
//     denial is an EVENT, not a silent skip;
//   - approval is per invocation (two identical calls ask twice);
//   - `shell` refuses a shell string outright;
//   - replay reconstructs the refusals from the stream alone.

import { describe, expect, test } from "bun:test";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { EventWriter, readEvents, reconstructTranscript } from "../src/events";
import { runTurn } from "../src/turn";
import { scriptedApprover } from "../src/approval";

const enc = new TextEncoder();

function sse(content: string): Response {
  const stream = new ReadableStream<Uint8Array>({
    start(c) {
      const payload = { choices: [{ delta: { content }, finish_reason: null }] };
      c.enqueue(enc.encode(`data: ${JSON.stringify(payload)}\n\n`));
      const fin = { choices: [{ delta: {}, finish_reason: "stop" }], model: "glm-5.3-flash:cloud" };
      c.enqueue(enc.encode(`data: ${JSON.stringify(fin)}\n\n`));
      c.enqueue(enc.encode("data: [DONE]\n\n"));
      c.close();
    },
  });
  return new Response(stream, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

/** A proxy that answers with the next scripted reply on each call. */
function scriptedFetch(replies: string[]): typeof fetch {
  let i = 0;
  return (async () => sse(replies[i++] ?? "done")) as unknown as typeof fetch;
}

function toolCall(tool: string, args: unknown): string {
  return "```madv-tool\n" + JSON.stringify({ tool, args }) + "\n```";
}

function project(): string {
  return mkdtempSync(join(tmpdir(), "madv-turn-"));
}

function sessionFile(dir: string): string {
  return join(dir, ".madv-agent", "sessions", "s-test", "events.jsonl");
}

describe("tools, approval and replay (N3)", () => {
  test("BITE: a write is refused when the approver denies, and the denial is recorded", async () => {
    const dir = project();
    const writer = new EventWriter(sessionFile(dir));
    writer.loadExisting();

    await runTurn(writer, "write a file", {
      proxyUrl: "http://127.0.0.1:14933",
      projectDir: dir,
      fetchImpl: scriptedFetch([
        toolCall("write_file", { path: "out.txt", content: "hi" }),
        "done",
      ]),
      approver: scriptedApprover([false]),
    });

    const types = readEvents(writer.filePath).map((e) => e.type);
    expect(types).toContain("tool_call");
    expect(types).toContain("approval");
    expect(types).toContain("tool_result");

    const approval = readEvents(writer.filePath).find((e) => e.type === "approval");
    expect((approval?.payload as { granted: boolean }).granted).toBe(false);

    const result = readEvents(writer.filePath).find((e) => e.type === "tool_result");
    expect((result?.payload as { status: string }).status).toBe("denied");

    // The file was NOT created — a denial is not a deferral.
    expect(() => readFileSync(join(dir, "out.txt"), "utf8")).toThrow();
  });

  test("BITE: approval is per invocation — two identical calls ask twice", async () => {
    const dir = project();
    const writer = new EventWriter(sessionFile(dir));
    writer.loadExisting();
    let asked = 0;
    const counting = scriptedApprover([true, false]);

    await runTurn(writer, "write twice", {
      proxyUrl: "http://127.0.0.1:14933",
      projectDir: dir,
      fetchImpl: scriptedFetch([
        toolCall("write_file", { path: "a.txt", content: "1" }) +
          "\n" +
          toolCall("write_file", { path: "b.txt", content: "2" }),
        "done",
      ]),
      approver: (req) => {
        asked += 1;
        return counting(req);
      },
    });

    expect(asked).toBe(2);
    const approvals = readEvents(writer.filePath).filter((e) => e.type === "approval");
    expect(approvals.length).toBe(2);
    expect(readFileSync(join(dir, "a.txt"), "utf8")).toBe("1");
    expect(() => readFileSync(join(dir, "b.txt"), "utf8")).toThrow();
  });

  test("BITE: shell refuses a shell string, and runs a plain argv", async () => {
    const dir = project();
    const writer = new EventWriter(sessionFile(dir));
    writer.loadExisting();

    await runTurn(writer, "run something", {
      proxyUrl: "http://127.0.0.1:14933",
      projectDir: dir,
      fetchImpl: scriptedFetch([
        toolCall("shell", { argv: ["sh", "-c", "echo pwned"] }),
        toolCall("shell", { argv: ["echo", "hello"] }),
        "done",
      ]),
      approver: scriptedApprover([true, true]),
    });

    const results = readEvents(writer.filePath)
      .filter((e) => e.type === "tool_result")
      .map((e) => e.payload as { status: string; summary: string; output?: string });

    expect(results[0]?.status).toBe("refused");
    expect(results[0]?.summary).toMatch(/is a shell/);
    expect(results[1]?.status).toBe("ok");
    expect(results[1]?.output).toContain("hello");
  });

  test("BITE: replay reproduces the refusals from the events alone", async () => {
    const dir = project();
    const writer = new EventWriter(sessionFile(dir));
    writer.loadExisting();

    await runTurn(writer, "read something secret", {
      proxyUrl: "http://127.0.0.1:14933",
      projectDir: dir,
      fetchImpl: scriptedFetch([toolCall("read_file", { path: "../outside.txt" }), "done"]),
    });

    const transcript = reconstructTranscript(readEvents(writer.filePath));
    const joined = transcript.map((m) => m.content).join("\n");
    expect(joined).toContain("TOOL_RESULT read_file [refused]");
    expect(joined).toContain("outside the project root");
  });

  test("a session with no approver refuses anything needing one (fails closed)", async () => {
    const dir = project();
    const writer = new EventWriter(sessionFile(dir));
    writer.loadExisting();

    await runTurn(writer, "write a file", {
      proxyUrl: "http://127.0.0.1:14933",
      projectDir: dir,
      fetchImpl: scriptedFetch([toolCall("write_file", { path: "out.txt", content: "hi" }), "done"]),
    });

    const result = readEvents(writer.filePath).find((e) => e.type === "tool_result");
    expect((result?.payload as { status: string }).status).toBe("denied");
    expect((result?.payload as { summary: string }).summary).toMatch(/no approver is configured/);
  });
});
