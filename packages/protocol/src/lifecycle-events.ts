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
