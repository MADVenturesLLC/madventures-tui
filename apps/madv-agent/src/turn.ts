// apps/madv-agent/src/turn.ts
// One N1 turn: user message event → streamed model call through the proxy →
// assistant message event. Deltas are surfaced live through onDelta as they
// arrive, before the assistant message event is appended.
//
// D4: a stream that fails mid-flight (malformed SSE frame, error status) is
// recorded as a stream_error event — never as a successful reply. The error
// is then rethrown so the caller surfaces it.

import {
  EventWriter,
  readEvents,
  reconstructTranscript,
  type SessionEvent,
} from "./events";
import { streamChatCompletion, type StreamResult } from "./model-client";
import { ProxyRequestError } from "./proxy-error";

export interface TurnDeps {
  /** The proxy base URL — the only model endpoint the agent will call. */
  proxyUrl: string;
  /** Called live per delta, in arrival order (renders the stream). */
  onDelta?: (delta: string) => void;
  fetchImpl?: (url: string, init?: RequestInit) => Promise<Response>;
  signal?: AbortSignal;
}

export interface TurnResult extends StreamResult {
  userEvent: SessionEvent;
  assistantEvent: SessionEvent;
}

/**
 * Run one scripted turn. Appends, in order: user_message, then — only after
 * the stream completes — assistant_message with the full content and the
 * proxy-pinned model. The request history is reconstructed from the session's
 * events alone, ending with the user message appended for this turn.
 */
export async function runTurn(
  writer: EventWriter,
  userText: string,
  deps: TurnDeps,
): Promise<TurnResult> {
  const userEvent = writer.append("user_message", { content: userText });

  const history = reconstructTranscript(readEvents(writer.filePath));
  const messages = history.map((m) => ({ role: m.role, content: m.content }));

  const streamOpts: Parameters<typeof streamChatCompletion>[0] = {
    proxyUrl: deps.proxyUrl,
    messages,
  };
  if (deps.fetchImpl !== undefined) streamOpts.fetchImpl = deps.fetchImpl;
  if (deps.signal !== undefined) streamOpts.signal = deps.signal;

  let streamed = 0;
  try {
    const result = await streamChatCompletion({
      ...streamOpts,
      onDelta: (delta) => {
        streamed += delta.length;
        deps.onDelta?.(delta);
      },
    });

    const assistantEvent = writer.append("assistant_message", {
      content: result.content,
      model: result.model,
    });

    return { ...result, userEvent, assistantEvent };
  } catch (err) {
    // D4: the failed turn is an error EVENT in the stream — a partial or
    // empty reply is never recorded as an assistant_message.
    if (err instanceof ProxyRequestError) {
      writer.append("stream_error", {
        reason: err.message.slice(0, 500),
        streamed_chars: streamed,
        recorded_as: "error",
      });
    }
    throw err;
  }
}
