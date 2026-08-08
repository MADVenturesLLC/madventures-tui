// packages/protocol/src/canonical-json.ts
// Canonical JSON serialization: recursively sorted keys, no whitespace.
// Used for deterministic hashing of events and task envelopes.

export function canonicalJson(value: unknown): string {
  return serialize(value);
}

function serialize(value: unknown): string {
  if (value === null) return "null";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new Error("Cannot serialize non-finite number");
    return String(value);
  }
  if (typeof value === "string") return JSON.stringify(value);
  if (Array.isArray(value)) {
    return "[" + value.map(serialize).join(",") + "]";
  }
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const keys = Object.keys(obj).sort();
    return "{" + keys.map((k) => JSON.stringify(k) + ":" + serialize(obj[k])).join(",") + "}";
  }
  throw new Error(`Cannot serialize value of type ${typeof value}`);
}

export async function sha256Canonical(value: unknown): Promise<string> {
  const json = canonicalJson(value);
  const encoder = new TextEncoder();
  const buf = await crypto.subtle.digest("SHA-256", encoder.encode(json));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function sha256CanonicalSync(value: unknown): string {
  // Bun supports crypto.subtle.digest synchronously via Bun.hash
  // but for cross-compat we use the async version in tests.
  // This sync version uses Bun.Hash for convenience.
  const json = canonicalJson(value);
  return Bun.hash(json).toString(16);
}