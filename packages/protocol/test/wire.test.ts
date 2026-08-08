// packages/protocol/test/wire.test.ts
// Wire protocol round-trip and rejection tests.

import { expect, test } from "bun:test";
import { encodeWire, decodeWire } from "../src/wire";
import type { WireMessage } from "../src/wire";

test("encodeWire appends newline delimiter", () => {
  const msg: WireMessage = { kind: "error", code: "test", detail: "detail" };
  const encoded = encodeWire(msg);
  expect(encoded.endsWith("\n")).toBe(true);
});

test("decodeWire round-trips a subscribe message", () => {
  const msg: WireMessage = { kind: "subscribe", executionId: "exec-claude", credentialPath: "/tmp/cred" };
  const encoded = encodeWire(msg);
  const decoded = decodeWire(encoded);
  expect(decoded).toEqual(msg);
});

test("decodeWire round-trips an error message", () => {
  const msg: WireMessage = { kind: "error", code: "AUTH_FAILED", detail: "credential mismatch" };
  const encoded = encodeWire(msg);
  const decoded = decodeWire(encoded);
  expect(decoded).toEqual(msg);
});

test("decodeWire round-trips an event message", () => {
  const msg: WireMessage = {
    kind: "event",
    event: {
      protocol_version: "madbridge-protocol/v1",
      event_id: "evt-001",
      session_id: "sess-001",
      parent_event_id: null,
      sender_execution_id: "exec-claude",
      receiver_execution_id: "exec-agy",
      sender_role: "builder",
      sender_surface: "claude-code",
      sender_model: "claude-sonnet-4",
      sender_provider: "anthropic",
      task_envelope_hash: "a".repeat(64),
      repository_fingerprint: { kind: "commit", sha256: "b".repeat(64), git_sha: "c".repeat(40) },
      event_type: "message",
      payload_hash: "",
      payload: {},
      created_at: "2026-08-08T16:00:00.000Z",
      previous_event_hash: "d".repeat(64),
    },
  };
  const encoded = encodeWire(msg);
  const decoded = decodeWire(encoded);
  expect(decoded).toEqual(msg);
});

test("decodeWire returns null for empty string", () => {
  expect(decodeWire("")).toBeNull();
  expect(decodeWire("   \n  \n")).toBeNull();
});

test("decodeWire returns null for malformed JSON", () => {
  expect(decodeWire("{not valid json}")).toBeNull();
  expect(decodeWire("}")).toBeNull();
  expect(decodeWire("[1,2,")).toBeNull();
});

test("encodeWire + decodeWire is deterministic for identical input", () => {
  const msg: WireMessage = { kind: "subscribe", executionId: "exec-agy", credentialPath: "/tmp/cred2" };
  const encoded1 = encodeWire(msg);
  const encoded2 = encodeWire(msg);
  expect(encoded1).toBe(encoded2);
  expect(decodeWire(encoded1)).toEqual(decodeWire(encoded2));
});