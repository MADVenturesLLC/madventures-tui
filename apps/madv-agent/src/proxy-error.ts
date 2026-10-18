// apps/madv-agent/src/proxy-error.ts
// The refusal error type, in its own module so callers can distinguish it
// without importing the network client.

export class ProxyRefusedError extends Error {
  readonly proxyUrl: string;

  constructor(message: string, proxyUrl: string) {
    super(message);
    this.name = "ProxyRefusedError";
    this.proxyUrl = proxyUrl;
  }
}

export class ProxyRequestError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ProxyRequestError";
    this.status = status;
  }
}

/**
 * A malformed SSE frame from the proxy. Never silently skipped (D4): the
 * call must fail loudly rather than return partial content as a success.
 */
export class SseFrameError extends ProxyRequestError {
  constructor(message: string) {
    super(message, 502);
    this.name = "SseFrameError";
  }
}
