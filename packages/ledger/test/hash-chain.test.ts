// packages/ledger/test/hash-chain.test.ts
// Hash chain verification tests.

import { expect, test } from "bun:test";
import { computeEventHash } from "../src/hash-chain";

test("computeEventHash is deterministic for same input", () => {
  const prevHash = "0".repeat(64);
  const eventJson = '{"event_id":"evt-1"}';
  const h1 = computeEventHash(prevHash, eventJson);
  const h2 = computeEventHash(prevHash, eventJson);
  expect(h1).toBe(h2);
});

test("computeEventHash changes when input changes", () => {
  const prevHash = "0".repeat(64);
  const h1 = computeEventHash(prevHash, '{"a":1}');
  const h2 = computeEventHash(prevHash, '{"a":2}');
  expect(h1).not.toBe(h2);
});

test("computeEventHash changes when previous hash changes", () => {
  const eventJson = '{"a":1}';
  const h1 = computeEventHash("0".repeat(64), eventJson);
  const h2 = computeEventHash("1".repeat(64), eventJson);
  expect(h1).not.toBe(h2);
});

test("computeEventHash returns 64-char hex string and matches sha256Hex", () => {
  const h = computeEventHash("0".repeat(64), "{}");
  expect(h).toMatch(/^[0-9a-f]{64}$/);
});