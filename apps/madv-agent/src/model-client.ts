// apps/madv-agent/src/model-client.ts
// The model client: chat-completion requests to the madmik3 proxy on
// loopback, streamed (SSE), rendered delta by delta. The agent sends no
// credentials — the proxy holds the provider key. One provider, chat-completion
// shape only; the model is pinned server-side by the proxy.

import { chatCompletionsUrl } from "./proxy";
import { ProxyRefusedError, ProxyRequestError } from "./proxy-error";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface StreamResult {
  /** The full assistant text, accumulated from the deltas. */
  content: string;
  /** The model the proxy pinned, as reported on the response chunks. */
  model: string | null;
}

export interface StreamOptions {
  /** The madmik3 proxy base URL (loopback). The ONLY model endpoint. */
  proxyUrl: string;
  messages: ChatMessage[];
  /** Called live, once per non-empty content delta, in arrival order. */
  onDelta?: (delta: string) => void;
  signal?: AbortSignal;
  /** Test seam: fetch implementation. Defaults to globalThis.fetch. */
  fetchImpl?: (url: string, init?: RequestInit) => Promise<Response>;
}

/**
 * Build the request the client sends. Exported for the credential property
 * test: no Authorization header, no key material anywhere in the request.
 */
export function buildChatRequest(proxyUrl: string, messages: ChatMessage[]): {
  url: string;
  init: RequestInit;
} {
  const body = JSON.stringify({
    messages,
    stream: true,
  });
  const init: RequestInit = {
    method: "POST",
    // Deliberately NO Authorization header: the proxy holds the credential
    // and refuses requests that carry one.
    headers: { "Content-Type": "application/json" },
    body,
  };
  return { url: chatCompletionsUrl(proxyUrl), init };
}

interface ChatCompletionChunk {
  model?: string;
  choices?: Array<{
    delta?: { content?: string | null };
    finish_reason?: string | null;
  }>;
}

/**
 * Stream one chat completion from the madmik3 proxy.
 * Unreachable proxy ⇒ ProxyRefusedError naming the URL — never a fallback,
 * never a silent degrade (design §6).
 */
export async function streamChatCompletion(opts: StreamOptions): Promise<StreamResult> {
  const { proxyUrl, messages, onDelta, signal, fetchImpl = fetch } = opts;
  const { url, init } = buildChatRequest(proxyUrl, messages);

  let response: Response;
  const fetchInit: RequestInit = init;
  if (signal !== undefined) fetchInit.signal = signal;
  try {
    response = await fetchImpl(url, fetchInit);
  } catch (err) {
    if (signal?.aborted) throw err;
    const cause = err instanceof Error ? err.message : String(err);
    throw new ProxyRefusedError(
      `model proxy unavailable at ${proxyUrl} (${cause}) — refusing to fall back: ` +
        `this agent holds no provider key and will not use one`,
      proxyUrl,
    );
  }

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 500);
    throw new ProxyRequestError(
      `model proxy at ${proxyUrl} answered ${response.status}: ${detail}`,
      response.status,
    );
  }

  if (!response.body) {
    throw new ProxyRequestError(`model proxy at ${proxyUrl} returned an empty body`, 502);
  }

  let content = "";
  let model: string | null = null;
  let sseBuffer = "";

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      sseBuffer += decoder.decode(value, { stream: true });
      let newlineIndex: number;
      while ((newlineIndex = sseBuffer.indexOf("\n")) !== -1) {
        const line = sseBuffer.slice(0, newlineIndex).replace(/\r$/, "");
        sseBuffer = sseBuffer.slice(newlineIndex + 1);
        if (!line.startsWith("data:")) continue;
        const data = line.slice(5).trim();
        if (data === "[DONE]") continue;
        let chunk: ChatCompletionChunk;
        try {
          chunk = JSON.parse(data) as ChatCompletionChunk;
        } catch {
          continue; // not JSON — skip the line; the chain is authoritative
        }
        if (typeof chunk.model === "string" && model === null) model = chunk.model;
        const delta = chunk.choices?.[0]?.delta?.content;
        if (typeof delta === "string" && delta.length > 0) {
          content += delta;
          onDelta?.(delta);
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  return { content, model };
}
