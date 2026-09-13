// apps/seal-studio/src/lib/canonical.ts
// Browser-side twin of packages/founder-act/src/canonical.ts.
//
// The studio never imports @mad/founder-act into the client bundle (that
// package is node-crypto-backed). Instead this file ports canonicalJson
// verbatim — recursive, lexicographically key-sorted, no whitespace,
// undefined-valued object entries dropped, arrays keep order — and hashes
// with WebCrypto instead of node:crypto. test/canonical.test.ts fails if
// the twin ever drifts from the package.

export function canonicalJson(value: unknown): string {
  if (value === null || typeof value === "string" || typeof value === "boolean") {
    return JSON.stringify(value) as string;
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new Error("non-finite number is not canonicalizable");
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((entry) => canonicalJson(entry)).join(",")}]`;
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, v]) => v !== undefined)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
    const inner = entries.map(([k, v]) => `${JSON.stringify(k)}:${canonicalJson(v)}`).join(",");
    return `{${inner}}`;
  }
  throw new Error(`value of type ${typeof value} is not canonicalizable`);
}

/** sha256 hex via WebCrypto — same digest as node:crypto sha256Hex. */
export async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}
