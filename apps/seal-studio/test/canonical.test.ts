// apps/seal-studio/test/canonical.test.ts
// The browser twin of founder-act's canonicalization must never drift:
// every case here canonicalizes identically through both implementations,
// and WebCrypto's sha-256 matches node:crypto's byte for byte.

import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";

import { canonicalJson } from "@mad/founder-act";
import { canonicalJson as browserCanonical, sha256Hex } from "../src/lib/canonical";

const GNRALY: unknown[] = [
  { b: 1, a: 2 },
  { a: 2, b: 1 },
  { z: undefined, a: 1 },
  { nested: { y: [1, { k: "v", j: null }], x: undefined } },
  ["alpha", "beta", ["gamma", { delta: true }]],
  "unicode: 中文 — dash",
  0,
  -3.5,
  true,
  null,
  { empty: {}, arr: [] },
  { "key with space": "value", "": "empty key" },
];

describe("canonicalJson twin parity", () => {
  test("browser twin matches @mad/founder-act on gnarly values", () => {
    for (const value of GNRALY) {
      expect(browserCanonical(value)).toBe(canonicalJson(value));
    }  });

  test("key order never changes the canonical form", () => {
    expect(browserCanonical({ b: 1, a: 2 })).toBe(browserCanonical({ a: 2, b: 1 }));
  });

  test("undefined-valued entries are dropped", () => {
    expect(browserCanonical({ a: 1, gone: undefined })).toBe('{"a":1}');
  });
});

describe("sha256 parity (WebCrypto vs node:crypto)", () => {
  test("same digest as node for the canonical body of a real act", async () => {
    const body = browserCanonical({
      schema: "founder_act_v0",
      id: "3f2504e0-4f89-41d3-9a0c-0305e82c3301",
      kind: "commission",
      subject: "demo/parity",
      scope: ["apps/**"],
      actor: "founder",
      issued_at: "2026-09-13T00:00:00Z",
      reason_code: "PARITY",
      evidence_refs: [],
    });
    const viaWebCrypto = await sha256Hex(body);
    const viaNode = createHash("sha256").update(body, "utf8").digest("hex");
    expect(viaWebCrypto).toBe(viaNode);
    expect(viaWebCrypto).toMatch(/^[0-9a-f]{64}$/);
  });
});
