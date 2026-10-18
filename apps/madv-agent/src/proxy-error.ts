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
