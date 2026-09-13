// packages/founder-act/src/canonical.ts
// Deterministic serialization + sha256 for FounderAct identity.
//
// canonicalJson: recursive, lexicographically key-sorted, no whitespace,
// undefined-valued object entries dropped, arrays keep order. Two objects
// that differ only in key order MUST canonicalize to the same string —
// test/founder-act.test.ts fails if that invariant is broken.

import { createHash } from "node:crypto";

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

export function sha256Hex(input: string): string {
  return createHash("sha256").update(input, "utf8").digest("hex");
}
