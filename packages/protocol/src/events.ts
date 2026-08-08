// packages/protocol/src/events.ts
// Bridge event V1 — typed events that flow through the broker.

import type { RepositoryFingerprint } from "./task-envelope";
import { PROTOCOL_VERSION } from "./task-envelope";
import { canonicalJson } from "./canonical-json";

export const EVENT_TYPES = [
  "message", "action_request", "action_accept", "action_reject",
  "artifact_publish", "ownership_request", "ownership_release",
  "ownership_accept", "ownership_reject", "verification_result",
  "review_verdict", "pause", "resume", "incident", "session_close",
] as const;

export type EventType = typeof EVENT_TYPES[number];

const EVENT_TYPE_SET = new Set<string>(EVENT_TYPES);

export interface BridgeEventV1 {
  readonly protocol_version: typeof PROTOCOL_VERSION;
  readonly event_id: string;
  readonly session_id: string;
  readonly parent_event_id: string | null;
  readonly sender_execution_id: string;
  readonly receiver_execution_id: string;
  readonly sender_role: string;
  readonly sender_surface: string;
  readonly sender_model: string;
  readonly sender_provider: string;
  readonly task_envelope_hash: string;
  readonly repository_fingerprint: RepositoryFingerprint;
  readonly event_type: EventType;
  readonly payload_hash: string;
  readonly payload: Record<string, unknown>;
  readonly created_at: string;
  readonly previous_event_hash: string;
}

const KNOWN_EVENT_KEYS = new Set([
  "protocol_version", "event_id", "session_id", "parent_event_id",
  "sender_execution_id", "receiver_execution_id", "sender_role",
  "sender_surface", "sender_model", "sender_provider",
  "task_envelope_hash", "repository_fingerprint", "event_type",
  "payload_hash", "payload", "created_at", "previous_event_hash",
]);

const MAX_INLINE_PAYLOAD_BYTES = 64 * 1024; // 64KB max for inline payloads

/**
 * Parse and validate a BridgeEventV1 from raw input.
 * Rejects: unknown fields, oversized inline payloads, mismatched hashes,
 * invalid parent IDs, unsupported versions, unknown event types,
 * and timestamps after the provided envelope expiration.
 */
export function parseBridgeEvent(
  raw: Record<string, unknown>,
  options?: { envelopeExpiresAt?: string },
): BridgeEventV1 {
  // Check for unknown fields
  for (const key of Object.keys(raw)) {
    if (!KNOWN_EVENT_KEYS.has(key)) {
      throw new Error(`unknown field: ${key}`);
    }
  }

  // Protocol version
  if (raw["protocol_version"] !== PROTOCOL_VERSION) {
    throw new Error(`unsupported protocol_version: ${String(raw["protocol_version"])}`);
  }

  // Event type — must be known
  const eventType = raw["event_type"];
  if (typeof eventType !== "string" || !EVENT_TYPE_SET.has(eventType)) {
    throw new Error(`unknown event_type: ${String(eventType)}`);
  }

  // Oversized inline payloads
  const payload = raw["payload"];
  if (payload !== undefined && payload !== null) {
    const payloadStr = JSON.stringify(payload);
    if (payloadStr.length > MAX_INLINE_PAYLOAD_BYTES) {
      throw new Error("oversized inline payload");
    }
  }

  // Parent event ID — must be null or non-empty string
  const parentId = raw["parent_event_id"];
  if (parentId !== null && (typeof parentId !== "string" || parentId.length === 0)) {
    throw new Error("invalid parent event ID");
  }

  // Hash verification — if payload_hash is provided, verify it matches the canonical hash of payload
  const payloadHash = raw["payload_hash"];
  if (typeof payloadHash === "string" && payloadHash.length > 0 && payload !== undefined && payload !== null) {
    const computedHash = computePayloadHash(payload);
    if (payloadHash !== computedHash) {
      throw new Error("mismatched payload hash");
    }
  }

  // Timestamp after envelope expiration
  const createdAt = raw["created_at"];
  if (typeof createdAt === "string" && options?.envelopeExpiresAt) {
    if (new Date(createdAt).getTime() > new Date(options.envelopeExpiresAt).getTime()) {
      throw new Error("timestamp after envelope expiration");
    }
  }

  return raw as unknown as BridgeEventV1;
}

function computePayloadHash(payload: unknown): string {
  // Use Bun.hash for synchronous hash computation
  const json = canonicalJson(payload);
  return Bun.hash(json).toString(16);
}

export { PROTOCOL_VERSION };