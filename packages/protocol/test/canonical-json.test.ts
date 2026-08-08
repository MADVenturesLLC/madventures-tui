import { expect, test } from "bun:test";
import { canonicalJson, sha256Canonical } from "../src/canonical-json";

test("canonical JSON sorts object keys recursively", () => {
  expect(canonicalJson({ z: 1, a: { y: 2, b: 3 } })).toBe('{"a":{"b":3,"y":2},"z":1}');
});

test("canonical hashing is stable across insertion order", async () => {
  const hash1 = await sha256Canonical({ b: 2, a: 1 });
  const hash2 = await sha256Canonical({ a: 1, b: 2 });
  expect(hash1).toBe(hash2);
});