// DEC-20261022-01 B2: schema, identity, reserved types, phase/readiness, references.
import { isDeepStrictEqual } from "node:util";
import { parseBridgeEvent } from "@madventures/protocol";
import type { BridgeEventV1 } from "@madventures/protocol";
import type { BrokerErrorCode, BrokerSnapshot, ClientPrincipal } from "./client";

export const PUBLISHABLE_COLLABORATION_EVENT_TYPES = Object.freeze([
  "message", "action_request", "action_accept", "action_reject", "artifact_publish",
  "ownership_request", "ownership_release", "ownership_accept", "ownership_reject",
  "verification_result", "review_verdict",
] as const);

export const RESERVED_LEGACY_GOVERNANCE_EVENT_TYPES = Object.freeze(["pause", "resume", "session_close"] as const);

type PublishLegalityResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly error: BrokerErrorCode; readonly detail: string };

function failure(step: number, error: BrokerErrorCode, detail = `step ${step}: ${error}`): PublishLegalityResult {
  return { ok: false, error, detail };
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function nonemptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function hex(value: unknown, length: 40 | 64): boolean {
  return typeof value === "string" && value.length === length && /^[0-9a-f]+$/i.test(value);
}

function completeShape(value: Record<string, unknown>): boolean {
  const strings = [
    "protocol_version", "event_id", "session_id", "sender_execution_id", "receiver_execution_id",
    "sender_role", "sender_surface", "sender_model", "sender_provider", "task_envelope_hash",
    "event_type", "payload_hash", "created_at", "previous_event_hash",
  ];
  if (!strings.every(key => nonemptyString(value[key]))) return false;
  if (value.parent_event_id !== null && !nonemptyString(value.parent_event_id)) return false;
  if (!isPlainObject(value.payload)) return false;
  if (!/^[0-9a-f]{64}$/.test(value.payload_hash as string) || !/^[0-9a-f]{64}$/.test(value.task_envelope_hash as string)) return false;
  const fingerprint = value.repository_fingerprint;
  if (!isPlainObject(fingerprint)) return false;
  if (Object.keys(fingerprint).some(key => !["kind", "sha256", "git_sha", "base_git_sha"].includes(key))) return false;
  if (fingerprint.kind !== "commit" && fingerprint.kind !== "working_tree") return false;
  if (!hex(fingerprint.sha256, 64) || !hex(fingerprint.git_sha, 40)) return false;
  if ((fingerprint.kind === "working_tree" || "base_git_sha" in fingerprint) && !hex(fingerprint.base_git_sha, 40)) return false;
  if (value.event_type === "incident") {
    const payload = value.payload;
    if (Object.keys(payload).length !== 3 || !["incident_id", "reason", "severity"].every(key => Object.hasOwn(payload, key))) return false;
    if (!nonemptyString(payload.incident_id) || !nonemptyString(payload.reason)) return false;
    if (payload.severity !== "low" && payload.severity !== "medium" && payload.severity !== "high") return false;
  }
  return true;
}

export function evaluatePublishLegality(
  event: BridgeEventV1,
  snapshot: BrokerSnapshot,
  principal: ClientPrincipal,
): PublishLegalityResult {
  // Step 1: the parser is partial; the complete declared shape is checked here.
  let parsed: BridgeEventV1;
  try {
    const captured: unknown = structuredClone(event);
    if (!isPlainObject(captured)) return failure(1, "invalid_command");
    parsed = parseBridgeEvent(captured);
    if (!completeShape(captured)) return failure(1, "invalid_command");
  } catch {
    return failure(1, "invalid_command");
  }

  // Step 2: bound principal and canonical event identity precede every state check.
  if (principal.kind === "founder_tui" || principal.executionId !== parsed.sender_execution_id) return failure(2, "unauthorized");
  if (parsed.session_id !== snapshot.sessionId) return failure(2, "session_mismatch");
  if (snapshot.executions === null) return failure(2, "invariant_failure", "executions not produced by the snapshot");
  const sender = snapshot.executions.find(value => value.identity.execution_id === parsed.sender_execution_id);
  if (sender === undefined) return failure(2, "execution_not_found");
  const identity = sender.identity;
  if (parsed.sender_role !== identity.role || parsed.sender_surface !== identity.surface ||
      parsed.sender_model !== identity.model || parsed.sender_provider !== identity.provider ||
      parsed.task_envelope_hash !== snapshot.taskEnvelopeHash ||
      !isDeepStrictEqual(parsed.repository_fingerprint, snapshot.repositoryFingerprint)) return failure(2, "identity_mismatch");

  // Step 3: legacy execution-authored governance never changes lifecycle state.
  if (RESERVED_LEGACY_GOVERNANCE_EVENT_TYPES.some(type => type === parsed.event_type)) return failure(3, "unauthorized");

  // Step 4: phase masks an existing incident, which masks execution readiness.
  const phaseAllowed = parsed.event_type === "incident"
    ? snapshot.phase === "active" || snapshot.phase === "paused"
    : snapshot.phase === "active";
  if (!phaseAllowed) return failure(4, "session_not_writable");
  if (snapshot.incident !== null) return failure(4, "incident_active");
  if (sender.state !== "ready") return failure(4, "invariant_failure");

  // Step 5: neither pending-approval creation nor pending-transfer production exists.
  if (parsed.event_type === "action_accept" || parsed.event_type === "action_reject") return failure(5, "approval_not_pending");
  if (parsed.event_type === "ownership_accept" || parsed.event_type === "ownership_reject") {
    return failure(5, "invariant_failure", "pendingTransfers not produced by the snapshot");
  }
  return { ok: true };
}
