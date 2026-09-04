// packages/protocol/src/lifecycle-events.ts
// The closed Phase 3A lifecycle vocabulary (specification section 9.6).
//
// Broker lifecycle truth is a second closed protocol record in the same ledger
// as BridgeEventV1, never a fabricated execution identity. Every lifecycle
// record carries actor "madbridge".
//
// The two unions below are derived from their runtime tuples rather than
// declared twice. The resulting unions are exactly the section 9.6 lists; the
// derivation makes it structurally impossible for the enumerable tuple and the
// type to drift apart, which is the invariant this milestone establishes.

import type { BridgeEventV1 } from "./events";
import type { RepositoryFingerprint } from "./task-envelope";
import { PROTOCOL_VERSION } from "./task-envelope";

/** The twelve lifecycle event types, in specification order. */
export const SESSION_LIFECYCLE_EVENT_TYPES = [
  "session_open",
  "session_abort",
  "session_unclean_closure",
  "session_activated",
  "session_paused",
  "session_resumed",
  "session_closing",
  "session_closed",
  "session_interrupted",
  "approval_resolved",
  "fencing_token_issued",
  "fencing_token_invalidated",
] as const;

export type SessionLifecycleEventTypeV1 = typeof SESSION_LIFECYCLE_EVENT_TYPES[number];

/** The twelve interruption reason codes, in specification order. */
export const INTERRUPTION_REASON_CODES = [
  "child_failure",
  "adapter_failure",
  "pty_host_failure",
  "host_command_deadline_expired",
  "authentication_expired",
  "identity_mismatch",
  "output_sequence_invariant_failed",
  "snapshot_sequence_invariant_failed",
  "ledger_write_failed",
  "broker_invariant_failed",
  "containment_failed",
  "execution_reported_incident",
] as const;

export type InterruptionReasonCodeV1 = typeof INTERRUPTION_REASON_CODES[number];

export interface PublishedIncidentPayloadV1 {
  readonly incident_id: string;
  readonly reason: string;
  readonly severity: "low" | "medium" | "high";
}

export interface SessionInterruptedPayloadV1 extends PublishedIncidentPayloadV1 {
  readonly source_event_id: string | null;
  readonly reported_by_execution_id: string | null;
}

export interface FounderCommandPayloadV1 {
  readonly command_id: string;
  readonly authorized_by: "founder";
}

export type SessionTerminalPayloadV1 =
  | (FounderCommandPayloadV1 & {
      readonly closure_kind: "founder";
      readonly incident_id: null;
    })
  | {
      readonly closure_kind: "interruption";
      readonly incident_id: string;
      readonly reason_code: InterruptionReasonCodeV1;
    };

export type LifecyclePayloadByTypeV1 = {
  readonly session_open: {
    readonly authorization_reference: string;
    readonly execution_ids: readonly string[];
  };
  readonly session_abort: { readonly abort_reason: string };
  readonly session_unclean_closure: {
    readonly detected_at_startup: true;
    readonly last_durable_event_id: string | null;
  };
  readonly session_activated: {
    readonly execution_ids: readonly string[];
    readonly readiness_snapshot_seq: number;
  };
  readonly session_paused: FounderCommandPayloadV1;
  readonly session_resumed: FounderCommandPayloadV1;
  readonly session_closing: SessionTerminalPayloadV1;
  readonly session_closed: SessionTerminalPayloadV1;
  readonly session_interrupted: SessionInterruptedPayloadV1;
  readonly approval_resolved: FounderCommandPayloadV1 & {
    readonly approval_id: string;
    readonly resolution: "approved" | "rejected";
  };
  readonly fencing_token_issued: {
    readonly writer_execution_id: string;
  };
  readonly fencing_token_invalidated: {
    readonly invalidation_reason: "interruption" | "founder_close" | "rollback";
    readonly incident_id: string | null;
  };
};

export type SessionLifecycleEventBaseV1<K extends SessionLifecycleEventTypeV1> = {
  readonly protocol_version: typeof PROTOCOL_VERSION;
  readonly event_id: string;
  readonly session_id: string;
  readonly event_type: K;
  readonly actor: "madbridge";
  readonly task_envelope_hash: string;
  readonly repository_fingerprint: RepositoryFingerprint;
  readonly fencing_token: number | null;
  readonly reason_code: K extends "session_interrupted"
    ? InterruptionReasonCodeV1
    : string | null;
  readonly created_at: string;
  readonly previous_event_hash: string;
};

export type SessionLifecycleEventV1 = {
  [K in SessionLifecycleEventTypeV1]: SessionLifecycleEventBaseV1<K> & {
    readonly payload: LifecyclePayloadByTypeV1[K];
  };
}[SessionLifecycleEventTypeV1];

/** Both union members share the existing events table, sequence, and hash chain. */
export type LedgerEventV1 = BridgeEventV1 | SessionLifecycleEventV1;

// ─── Validation (specification section 9.6) ───

/** The closed set of reasons a lifecycle record can be rejected. */
export type LifecycleValidationFailure =
  | "unknown_event_type"
  | "unknown_field"
  | "base_record_shape"
  | "missing_reason_code"
  | "payload_shape"
  | "incident_id_mismatch"
  | "reason_code_mismatch"
  | "execution_set_mismatch"
  | "duplicate_execution_id"
  | "actor_not_madbridge";

export class LifecycleValidationError extends Error {
  constructor(
    public readonly failure: LifecycleValidationFailure,
    message?: string,
  ) {
    super(message ?? failure);
    this.name = "LifecycleValidationError";
  }
}

/**
 * The session facts a record is validated against: the complete envelope
 * execution set, and the currently open interruption, if any.
 */
export interface LifecycleContext {
  readonly envelopeExecutionIds: readonly string[];
  readonly openIncidentId: string | null;
  readonly openReasonCode: InterruptionReasonCodeV1 | null;
}

const KNOWN_LIFECYCLE_KEYS: ReadonlySet<string> = new Set([
  "protocol_version",
  "event_id",
  "session_id",
  "event_type",
  "actor",
  "task_envelope_hash",
  "repository_fingerprint",
  "fencing_token",
  "reason_code",
  "created_at",
  "previous_event_hash",
  "payload",
]);

const LIFECYCLE_EVENT_TYPE_SET: ReadonlySet<string> = new Set(SESSION_LIFECYCLE_EVENT_TYPES);
const INTERRUPTION_REASON_CODE_SET: ReadonlySet<string> = new Set(INTERRUPTION_REASON_CODES);

function fail(failure: LifecycleValidationFailure, message?: string): never {
  throw new LifecycleValidationError(failure, message);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string");
}

/** Exact key-set match, so an unexpected payload field is a shape failure. */
function hasExactKeys(payload: Record<string, unknown>, keys: readonly string[]): boolean {
  const actual = Object.keys(payload);
  return actual.length === keys.length && keys.every((key) => key in payload);
}

function isFounderCommand(payload: Record<string, unknown>): boolean {
  return typeof payload["command_id"] === "string" && payload["authorized_by"] === "founder";
}

function isTerminalPayload(payload: Record<string, unknown>): boolean {
  if (payload["closure_kind"] === "founder") {
    return (
      hasExactKeys(payload, ["command_id", "authorized_by", "closure_kind", "incident_id"]) &&
      isFounderCommand(payload) &&
      payload["incident_id"] === null
    );
  }
  if (payload["closure_kind"] === "interruption") {
    return (
      hasExactKeys(payload, ["closure_kind", "incident_id", "reason_code"]) &&
      typeof payload["incident_id"] === "string" &&
      typeof payload["reason_code"] === "string" &&
      INTERRUPTION_REASON_CODE_SET.has(payload["reason_code"])
    );
  }
  return false;
}

function isRepositoryFingerprint(value: unknown): boolean {
  if (!isRecord(value)) return false;
  if (value["kind"] !== "commit" && value["kind"] !== "working_tree") return false;
  if (typeof value["sha256"] !== "string") return false;
  if (typeof value["git_sha"] !== "string") return false;
  const baseGitSha = value["base_git_sha"];
  return baseGitSha === undefined || typeof baseGitSha === "string";
}

/**
 * The required structural contract of SessionLifecycleEventBaseV1, excluding
 * every field that already has a more specific failure code: `event_type`
 * (unknown_event_type), `actor` (actor_not_madbridge), `payload`
 * (payload_shape), and `reason_code` (missing_reason_code and
 * reason_code_mismatch). Type shape only; no semantic constraint beyond what
 * section 9.6 states.
 */
function hasValidBaseRecordShape(raw: Record<string, unknown>): boolean {
  if (raw["protocol_version"] !== PROTOCOL_VERSION) return false;
  if (typeof raw["event_id"] !== "string") return false;
  if (typeof raw["session_id"] !== "string") return false;
  if (typeof raw["task_envelope_hash"] !== "string") return false;
  if (!isRepositoryFingerprint(raw["repository_fingerprint"])) return false;
  const fencingToken = raw["fencing_token"];
  if (fencingToken !== null && typeof fencingToken !== "number") return false;
  if (typeof raw["created_at"] !== "string") return false;
  return typeof raw["previous_event_hash"] === "string";
}

/**
 * Per-type payload shape predicates, keyed by event type.
 *
 * A lookup map rather than a switch: the unknown-type check runs first, so
 * every key reaching here exists, and there is no `default:` branch that could
 * return a value for an unrecognized type.
 */
const PAYLOAD_SHAPE: Readonly<
  Record<SessionLifecycleEventTypeV1, (payload: Record<string, unknown>) => boolean>
> = {
  session_open: (p) =>
    hasExactKeys(p, ["authorization_reference", "execution_ids"]) &&
    typeof p["authorization_reference"] === "string" &&
    isStringArray(p["execution_ids"]),
  session_abort: (p) =>
    hasExactKeys(p, ["abort_reason"]) && typeof p["abort_reason"] === "string",
  session_unclean_closure: (p) =>
    hasExactKeys(p, ["detected_at_startup", "last_durable_event_id"]) &&
    p["detected_at_startup"] === true &&
    (p["last_durable_event_id"] === null || typeof p["last_durable_event_id"] === "string"),
  session_activated: (p) =>
    hasExactKeys(p, ["execution_ids", "readiness_snapshot_seq"]) &&
    isStringArray(p["execution_ids"]) &&
    typeof p["readiness_snapshot_seq"] === "number",
  session_paused: (p) => hasExactKeys(p, ["command_id", "authorized_by"]) && isFounderCommand(p),
  session_resumed: (p) => hasExactKeys(p, ["command_id", "authorized_by"]) && isFounderCommand(p),
  session_closing: isTerminalPayload,
  session_closed: isTerminalPayload,
  session_interrupted: (p) =>
    hasExactKeys(p, [
      "incident_id",
      "reason",
      "severity",
      "source_event_id",
      "reported_by_execution_id",
    ]) &&
    typeof p["incident_id"] === "string" &&
    typeof p["reason"] === "string" &&
    (p["severity"] === "low" || p["severity"] === "medium" || p["severity"] === "high") &&
    (p["source_event_id"] === null || typeof p["source_event_id"] === "string") &&
    (p["reported_by_execution_id"] === null ||
      typeof p["reported_by_execution_id"] === "string"),
  approval_resolved: (p) =>
    hasExactKeys(p, ["command_id", "authorized_by", "approval_id", "resolution"]) &&
    isFounderCommand(p) &&
    typeof p["approval_id"] === "string" &&
    (p["resolution"] === "approved" || p["resolution"] === "rejected"),
  fencing_token_issued: (p) =>
    hasExactKeys(p, ["writer_execution_id"]) && typeof p["writer_execution_id"] === "string",
  fencing_token_invalidated: (p) =>
    hasExactKeys(p, ["invalidation_reason", "incident_id"]) &&
    (p["invalidation_reason"] === "interruption" ||
      p["invalidation_reason"] === "founder_close" ||
      p["invalidation_reason"] === "rollback") &&
    (p["incident_id"] === null || typeof p["incident_id"] === "string"),
};

/**
 * Validate one lifecycle record, or throw a typed failure.
 *
 * Failures are decided in the specification's fixed precedence, so the reported
 * reason is deterministic when a record has more than one defect:
 *
 *   unknown_event_type -> unknown_field -> base_record_shape
 *   -> actor_not_madbridge -> payload_shape -> missing_reason_code
 *   -> execution_set_mismatch / duplicate_execution_id
 *   -> incident_id_mismatch -> reason_code_mismatch
 *
 * Within the sixth position, duplicates are checked before set equality: a
 * duplicated id also perturbs the set, so checking equality first would mask
 * the more specific failure.
 *
 * There is no default branch that returns a value. An unrecognized event type
 * is rejected at the first step and never reaches payload handling.
 */
export function parseSessionLifecycleEvent(
  raw: Record<string, unknown>,
  context: LifecycleContext,
): SessionLifecycleEventV1 {
  // 1. Unknown event type.
  const eventType = raw["event_type"];
  if (typeof eventType !== "string" || !LIFECYCLE_EVENT_TYPE_SET.has(eventType)) {
    fail("unknown_event_type", `unknown lifecycle event_type: ${String(eventType)}`);
  }
  const knownType = eventType as SessionLifecycleEventTypeV1;

  // 2. Unknown top-level field.
  for (const key of Object.keys(raw)) {
    if (!KNOWN_LIFECYCLE_KEYS.has(key)) {
      fail("unknown_field", `unknown lifecycle field: ${key}`);
    }
  }

  // 3. Required lifecycle-base structure. A record that reaches the return path
  //    must satisfy the whole base contract, not merely type, actor, and payload.
  if (!hasValidBaseRecordShape(raw)) {
    fail("base_record_shape", `record does not satisfy the lifecycle base contract`);
  }

  // 4. Actor identity. Lifecycle truth is authored by madbridge, never by an
  //    execution, and never by a fabricated sender.
  if (raw["actor"] !== "madbridge") {
    fail("actor_not_madbridge", `actor must be madbridge, received ${String(raw["actor"])}`);
  }

  // 5. Payload shape for this exact type.
  const payload = raw["payload"];
  if (!isRecord(payload) || !PAYLOAD_SHAPE[knownType](payload)) {
    fail("payload_shape", `payload does not match ${knownType}`);
  }

  // 6. Interruption records carry a real reason code.
  const reasonCode = raw["reason_code"];
  if (knownType === "session_interrupted") {
    if (typeof reasonCode !== "string" || !INTERRUPTION_REASON_CODE_SET.has(reasonCode)) {
      fail("missing_reason_code", "session_interrupted requires a non-null reason_code");
    }
  }

  // 7. Activation carries the complete envelope execution set, order ignored.
  if (knownType === "session_activated") {
    const executionIds = payload["execution_ids"] as readonly string[];
    if (new Set(executionIds).size !== executionIds.length) {
      fail("duplicate_execution_id", "session_activated execution_ids contains a duplicate");
    }
    const expected = new Set(context.envelopeExecutionIds);
    const actual = new Set(executionIds);
    const equal =
      expected.size === actual.size && [...expected].every((id) => actual.has(id));
    if (!equal) {
      fail("execution_set_mismatch", "session_activated execution_ids is not the envelope set");
    }
  }

  // 8 and 9. Terminals preserve incident and reason linkage.
  if (
    (knownType === "session_closing" || knownType === "session_closed") &&
    payload["closure_kind"] === "founder" &&
    reasonCode !== null
  ) {
    fail("reason_code_mismatch", "a founder-kind terminal must carry reason_code null");
  }
  if (
    (knownType === "session_closing" || knownType === "session_closed") &&
    payload["closure_kind"] === "interruption"
  ) {
    if (payload["incident_id"] !== context.openIncidentId) {
      fail("incident_id_mismatch", "terminal incident_id does not match the open incident");
    }
    if (
      payload["reason_code"] !== context.openReasonCode ||
      reasonCode !== payload["reason_code"]
    ) {
      fail("reason_code_mismatch", "terminal reason_code does not match the open interruption");
    }
  }

  return raw as unknown as SessionLifecycleEventV1;
}
