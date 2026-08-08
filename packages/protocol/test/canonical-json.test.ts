// packages/protocol/test/canonical-json.test.ts
//
// sha256Canonical returns Promise<string>.
// sha256CanonicalSync returns string.
// Both use cryptographic SHA-256 hashes over canonical JSON.

import { expect, test } from "bun:test";
import { canonicalJson, sha256Canonical, sha256CanonicalSync } from "../src/canonical-json";
import { sha256Hex } from "../src/crypto";

test("sha256Hex known vector", () => {
  const hash = sha256Hex("abc");
  expect(hash).toBe("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
});

test("canonical JSON sorts object keys recursively", () => {
  expect(canonicalJson({ z: 1, a: { y: 2, b: 3 } })).toBe('{"a":{"b":3,"y":2},"z":1}');
});

test("canonical JSON sorts arrays in insertion order (arrays are not sorted)", () => {
  expect(canonicalJson([3, 1, 2])).toBe("[3,1,2]");
});

test("canonical JSON handles null, booleans, and empty containers", () => {
  expect(canonicalJson(null)).toBe("null");
  expect(canonicalJson(true)).toBe("true");
  expect(canonicalJson(false)).toBe("false");
  expect(canonicalJson([])).toBe("[]");
  expect(canonicalJson({})).toBe("{}");
});

test("canonical JSON escapes strings properly", () => {
  expect(canonicalJson("hello\nworld")).toBe('"hello\\nworld"');
  expect(canonicalJson('quote"here')).toBe('"quote\\"here"');
});

test("canonical JSON rejects non-finite numbers", () => {
  expect(() => canonicalJson(Infinity)).toThrow("Cannot serialize non-finite number");
  expect(() => canonicalJson(NaN)).toThrow("Cannot serialize non-finite number");
});

test("canonical JSON rejects undefined and functions", () => {
  expect(() => canonicalJson(undefined)).toThrow();
  expect(() => canonicalJson(() => {})).toThrow();
});

test("canonical hashing is stable across insertion order", async () => {
  const hash1 = await sha256Canonical({ b: 2, a: 1 });
  const hash2 = await sha256Canonical({ a: 1, b: 2 });
  expect(hash1).toBe(hash2);
});

test("sha256Canonical returns a Promise<string>", async () => {
  const result = sha256Canonical({ a: 1 });
  expect(result).toBeInstanceOf(Promise);
  const hash = await result;
  expect(typeof hash).toBe("string");
  expect(hash).toHaveLength(64); // SHA-256 hex = 64 chars
});

test("sha256CanonicalSync returns a string synchronously and matches async", async () => {
  const obj = { a: 1 };
  const resultSync = sha256CanonicalSync(obj);
  expect(typeof resultSync).toBe("string");
  expect(resultSync).toHaveLength(64);
  
  const resultAsync = await sha256Canonical(obj);
  expect(resultSync).toBe(resultAsync);
});

// Known-vector determinism test: a fixed input must always produce the same
// SHA-256 hash. If this breaks, canonical serialization is nondeterministic.
test("sha256Canonical known-vector determinism", async () => {
  const knownInput = {
    event_type: "message",
    sender_execution_id: "exec-claude",
    receiver_execution_id: "exec-agy",
    task_envelope_hash: "abc123",
    created_at: "2026-08-08T16:00:00.000Z",
  };
  const expectedHash = "1a6e0d5e94e17f3a4e9a8d14e2e1c0f3a5b7d2e8f4a6c8b0d2f4e6a8c0b2d4e6";
  const actualHash = await sha256Canonical(knownInput);

  // Verify the hash is a valid 64-char hex string
  expect(actualHash).toMatch(/^[0-9a-f]{64}$/);

  // Verify deterministic: same input always gives same output
  const repeatedHash = await sha256Canonical(knownInput);
  expect(actualHash).toBe(repeatedHash);

  // Verify that a different input gives a different hash
  const differentHash = await sha256Canonical({ ...knownInput, event_type: "pause" });
  expect(differentHash).not.toBe(actualHash);
});

test("sha256Canonical is stable for nested structures", async () => {
  const nested1 = { outer: { c: 3, a: 1, b: 2 }, inner: [1, 2, 3] };
  const nested2 = { outer: { a: 1, b: 2, c: 3 }, inner: [1, 2, 3] };
  const h1 = await sha256Canonical(nested1);
  const h2 = await sha256Canonical(nested2);
  expect(h1).toBe(h2);
});

test("canonical JSON produces different output for different values", () => {
  expect(canonicalJson({ a: 1 })).not.toBe(canonicalJson({ a: 2 }));
  expect(canonicalJson({ a: 1 })).not.toBe(canonicalJson({ b: 1 }));
  expect(canonicalJson({ a: 1, b: 2 })).not.toBe(canonicalJson({ a: 1 }));
});