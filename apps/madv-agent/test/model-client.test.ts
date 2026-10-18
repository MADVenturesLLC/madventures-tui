// apps/madv-agent/test/model-client.test.ts
// BITE PROOF (a): a streamed reply arrives as live deltas (in order) and is
// appended to the event stream by the turn loop.
// BITE PROOF (c): proxy stopped ⇒ explicit refusal naming the proxy URL —
// never a fallback, never a silent degrade.

import { describe, expect, test } from "bun:test";
import { streamChatCompletion } from "../src/model-client";
import { runTurn } from "../src/turn";
import { EventWriter, readEvents, type SessionEvent } from "../src/events";
import { ProxyRefusedError } from "../src/proxy-error";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

function sseResponse(chunks: string[], model: string): Response {
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
        await new Promise((r) => setTimeout(r, 5));
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

function sseChunk(id: number, delta: string | null, model: string): string {
  return `data: ${JSON.stringify({
    id: `chatcmpl-${id}`,
    model,
    choices: [{ index: 0, delta: delta === null ? {} : { content: delta }, finish_reason: null }],
  })}\n\n`;
}

describe("streaming model client", () => {
  test("deltas arrive live, in order, and accumulate to the full content", async () => {
    const model = "glm-5.3-flash:cloud";
    const seenAt: number[] = [];
    const deltas: string[] = [];
    // A streamed body: each piece arrives separately from the mock server.
    const response = sseResponse(
      [sseChunk(1, "Hel", model), sseChunk(2, "lo", model), sseChunk(3, "!", model)],
      model,
    );
    const result = await streamChatCompletion({
      proxyUrl: "http://127.0.0.1:14933",
      messages: [{ role: "user", content: "say hello" }],
      onDelta: (d) => {
        seenAt.push(Date.now());
        deltas.push(d);
      },
      fetchImpl: async () => response,
    });
    expect(deltas).toEqual(["Hel", "lo", "!"]);
    expect(result.content).toBe("Hello!");
    expect(result.model).toBe(model);
  });

  test("one turn appends user_message and assistant_message to the event stream", async () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-agent-turn-"));
    const writer = new EventWriter(join(dir, "events.jsonl"));
    const model = "glm-5.3-flash:cloud";
    const deltas: string[] = [];
    const response = sseResponse(
      [sseChunk(1, "one ", model), sseChunk(2, "two", model)],
      model,
    );
    const result = await runTurn(writer, "count for me", {
      proxyUrl: "http://127.0.0.1:14933",
      onDelta: (d) => deltas.push(d),
      fetchImpl: async () => response,
    });
    expect(deltas).toEqual(["one ", "two"]);
    expect(result.content).toBe("one two");

    const events = readEvents(writer.filePath) as SessionEvent[];
    expect(events.map((e) => e.type)).toEqual([
      "user_message",
      "assistant_message",
    ]);
    expect((events[0] as { payload: { content: string } }).payload.content).toBe("count for me");
    expect((events[1] as { payload: { content: string } }).payload.content).toBe("one two");
    expect((events[1] as { payload: { model: string } }).payload.model).toBe(model);
  });
});

describe("proxy-down refusal (design §6)", () => {
  test("unreachable proxy ⇒ ProxyRefusedError naming the URL, never a fallback", async () => {
    // Find a port, then close it — the proxy is "stopped".
    const server = Bun.serve({
      port: 0,
      fetch: () => new Response("unused"),
    });
    const deadUrl = `http://127.0.0.1:${server.port}`;
    server.stop(true);

    let caught: unknown = null;
    try {
      await streamChatCompletion({
        proxyUrl: deadUrl,
        messages: [{ role: "user", content: "anyone there?" }],
      });
    } catch (err) {
      caught = err;
    }
    expect(caught).toBeInstanceOf(ProxyRefusedError);
    const refusal = caught as ProxyRefusedError;
    expect(refusal.message).toContain(deadUrl);
    expect(refusal.message).toContain("refusing to fall back");
    expect(refusal.proxyUrl).toBe(deadUrl);
  });

  test("runTurn surfaces the refusal instead of writing an assistant event", async () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-agent-refusal-"));
    const writer = new EventWriter(join(dir, "events.jsonl"));
    const server = Bun.serve({ port: 0, fetch: () => new Response("x") });
    const deadUrl = `http://127.0.0.1:${server.port}`;
    server.stop(true);

    let caught: unknown = null;
    try {
      await runTurn(writer, "hello", { proxyUrl: deadUrl });
    } catch (err) {
      caught = err;
    }
    expect(caught).toBeInstanceOf(ProxyRefusedError);
    const events = readEvents(writer.filePath) as SessionEvent[];
    // Only the user message was written; there is NO assistant fallback text.
    expect(events.map((e) => e.type)).toEqual(["user_message"]);
  });
});
