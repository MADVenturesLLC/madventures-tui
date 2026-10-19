// apps/madv-agent/src/proxy.ts
// The single model-access configuration: the madmik3 proxy base URL on
// loopback. The agent holds a URL and nothing else — never a provider key.

export const DEFAULT_PROXY_URL = "http://127.0.0.1:14933";

const LOOPBACK_HOSTS: ReadonlySet<string> = new Set(["127.0.0.1", "localhost", "[::1]", "::1"]);

/**
 * Resolve the proxy base URL from the (already scrubbed) environment.
 * MADV_AGENT_PROXY_URL overrides the default; a non-loopback host is refused
 * before any network activity.
 */
export function resolveProxyUrl(env: Record<string, string | undefined>): string {
  const raw = env["MADV_AGENT_PROXY_URL"] ?? DEFAULT_PROXY_URL;
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error(
      `MADV_AGENT_PROXY_URL is not a valid URL: ${raw} (default: ${DEFAULT_PROXY_URL})`,
    );
  }
  if (parsed.protocol !== "http:") {
    throw new Error(
      `the madmik3 proxy is loopback HTTP only; refusing ${parsed.protocol}//${parsed.host}`,
    );
  }
  if (!LOOPBACK_HOSTS.has(parsed.hostname)) {
    throw new Error(
      `the madmik3 proxy must be on loopback; refusing non-loopback host "${parsed.hostname}"`,
    );
  }
  // Normalise: origin only, no path/query — the client appends /v1/chat/completions.
  return parsed.origin;
}

/** Build the chat-completions endpoint for a proxy base URL. */
export function chatCompletionsUrl(proxyUrl: string): string {
  return `${proxyUrl}/v1/chat/completions`;
}

