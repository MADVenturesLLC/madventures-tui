// packages/protocol/test/events.test.ts
// Comprehensive negative-control tests for parseBridgeEvent.
// Every mandated rejection behavior is tested through the public parser.

import { expect, test } from "bun:test";
import { parseBridgeEvent, PROTOCOL_VERSION, EVENT_TYPES } from "../src";
import { canonicalJson } from "../src/canonical-json";

// ─── Valid fixture ───

function validEvent(): Record<string, unknown> {
  return {
    protocol_version: PROTOCOL_VERSION,
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
    repository_fingerprint: {
      kind: "commit",
      sha256: "b".repeat(64),
      git_sha: "c".repeat(40),
    },
    event_type: "message",
    payload_hash: "",
    payload: {},
    created_at: "2026-08-08T16:00:00.000Z",
    previous_event_hash: "d".repeat(64),
  };
}

// ─── Protocol version rejection ───

test("rejects unsupported protocol version", () => {
  const evt = validEvent();
  evt["protocol_version"] = "madbridge-protocol/v2";
  expect(() => parseBridgeEvent(evt)).toThrow("unsupported protocol_version");
});

// ─── Unknown event type rejection ───

test("rejects unknown event type", () => {
  const evt = validEvent();
  evt["event_type"] = "shell_exec";
  expect(() => parseBridgeEvent(evt)).toThrow("unknown event_type");
});

test("accepts all 15 known event types", () => {
  for (const type of EVENT_TYPES) {
    const evt = validEvent();
    evt["event_type"] = type;
    expect(() => parseBridgeEvent(evt)).not.toThrow();
  }
});

// ─── Unknown field rejection ───

test("rejects unknown field", () => {
  const evt = validEvent();
  evt["malicious_field"] = "inject";
  expect(() => parseBridgeEvent(evt)).toThrow("unknown field");
});

// ─── Oversized inline payload rejection ───

test("rejects oversized inline payload", () => {
  const evt = validEvent();
  evt["payload"] = { data: "x".repeat(65 * 1024) };
  expect(() => parseBridgeEvent(evt)).toThrow("oversized inline payload");
});

test("accepts payload within size limit", () => {
  const evt = validEvent();
  evt["payload"] = { data: "x".repeat(1024) };
  evt["payload_hash"] = ""; // skip hash check for this test
  expect(() => parseBridgeEvent(evt)).not.toThrow();
});

// ─── Mismatched payload hash rejection ───

test("rejects mismatched payload hash", () => {
  const evt = validEvent();
  evt["payload"] = { message: "hello" };
  evt["payload_hash"] = "deadbeef"; // wrong hash
  expect(() => parseBridgeEvent(evt)).toThrow("mismatched payload hash");
});

test("accepts correct payload hash", () => {
  const evt = validEvent();
  const payload = { message: "hello" };
  evt["payload"] = payload;
  evt["payload_hash"] = Bun.hash(canonicalJson(payload)).toString(16);
  expect(() => parseBridgeEvent(evt)).not.toThrow();
});

// ─── Invalid parent event ID rejection ───

test("rejects empty string parent event ID", () => {
  const evt = validEvent();
  evt["parent_event_id"] = "";
  expect(() => parseBridgeEvent(evt)).toThrow("invalid parent event ID");
});

test("rejects non-string, non-null parent event ID", () => {
  const evt = validEvent();
  evt["parent_event_id"] = 123;
  expect(() => parseBridgeEvent(evt)).toThrow("invalid parent event ID");
});

test("accepts null parent event ID (root event)", () => {
  const evt = validEvent();
  evt["parent_event_id"] = null;
  expect(() => parseBridgeEvent(evt)).not.toThrow();
});

test("accepts non-empty string parent event ID", () => {
  const evt = validEvent();
  evt["parent_event_id"] = "evt-000";
  evt["payload_hash"] = ""; // skip hash check
  expect(() => parseBridgeEvent(evt)).not.toThrow();
});

// ─── Timestamp after envelope expiration ───

test("rejects timestamp after envelope expiration", () => {
  const evt = validEvent();
  evt["created_at"] = "2026-08-08T18:00:00.000Z";
  expect(() => parseBridgeEvent(evt, { envelopeExpiresAt: "2026-08-08T17:00:00.000Z" }))
    .toThrow("timestamp after envelope expiration");
});

test("accepts timestamp before envelope expiration", () => {
  const evt = validEvent();
  evt["created_at"] = "2026-08-08T16:00:00.000Z";
  expect(() => parseBridgeEvent(evt, { envelopeExpiresAt: "2026-08-08T17:00:00.000Z" }))
    .not.toThrow();
});

test("accepts timestamp equal to envelope expiration boundary", () => {
  const evt = validEvent();
  evt["created_at"] = "2026-08-08T17:00:00.000Z";
  evt["payload_hash"] = ""; // skip hash check
  expect(() => parseBridgeEvent(evt, { envelopeExpiresAt: "2026-08-08T17:00:00.000Z" }))
    .not.toThrow();
});

test("skips expiration check when no envelope expiration provided", () => {
  const evt = validEvent();
  evt["created_at"] = "2026-12-31T23:59:59.000Z";
  evt["payload_hash"] = ""; // skip hash check
  expect(() => parseBridgeEvent(evt)).not.toThrow();
});