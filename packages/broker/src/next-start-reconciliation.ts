// packages/broker/src/next-start-reconciliation.ts
// Section 9.5 next-start durable-prefix completion.
//
// When the broker starts, the prior session's ledger may end in a durable
// prefix that never reached its typed terminal record. This module decides,
// deterministically from the canonical lifecycle projection, which missing
// lifecycle records complete that prefix. Every recognized durable prefix has
// exactly one completion, and closure kinds are never doubled.
//
// This is next-start reconciliation only (section 2.5). It never restores an
// interrupted session to active, never invokes a Founder session_close, and
// never mints a new Founder command. Lifecycle legality is decided only by
// reduceLedgerEvent: the table below decides WHICH records a prefix still
// needs, and the reducer decides the order those records may legally take.
// This module holds no transition table of its own.

import type { LedgerRow, LifecycleState } from "@madventures/ledger";
import { INITIAL_LIFECYCLE_STATE, ReducerError, computeEventHash, reduceLedgerEvent } from "@madventures/ledger";
import type {
  InterruptionReasonCodeV1,
  LedgerEventV1,
  LifecyclePayloadByTypeV1,
  RepositoryFingerprint,
  SessionLifecycleEventTypeV1,
  SessionLifecycleEventV1,
} from "@madventures/protocol";
import { PROTOCOL_VERSION, canonicalJson } from "@madventures/protocol";

// ─── Public contract ───

export type PrefixKind =
  | "open_no_activation"
  | "interrupted_only"
  | "interrupted_invalidated"
  | "interruption_through_closing"
  | "founder_close_at_closing"
  | "no_typed_terminal";

/**
 * The already-existing facts a completion needs in order to construct valid
 * SessionLifecycleEventV1 records. A mechanical immutable data carrier only:
 * session identity, fencing state, incident identity, reason code, closure
 * kind, and phase all come from the canonical LifecycleState, never from here.
 */
export interface PrefixContext {
  /** The prior session's task-envelope hash. */
  readonly taskEnvelopeHash: string;
  /** The prior session's repository fingerprint. */
  readonly repositoryFingerprint: RepositoryFingerprint;
  /** The durable chain head: the event hash of the last durable ledger row. */
  readonly previousEventHash: string;
  /** The event id of the last durable ledger row, or null when there is none. */
  readonly lastDurableEventId: string | null;
  /** Deterministic timestamp stamped on every planned record. */
  readonly createdAt: string;
  /** Deterministic event ids, consumed in order; at least one per planned record. */
  readonly eventIds: readonly string[];
  /**
   * Affirmative, already-established proof that no governed process remains.
   * `true` is the only value that permits `session_closed` from a durable
   * `session_closing`; `null` means no proof was supplied. This module never
   * discovers, probes, or terminates processes.
   */
  readonly governedProcessesGone: true | null;
  /**
   * The command_id carried by the already-durable Founder `session_closing`,
   * or null when the durable prefix is not a Founder close. Reused verbatim to
   * complete that sequence; never used to initiate a closure.
   */
  readonly founderCommandId: string | null;
}

/** A durable lifecycle order the canonical reducer refuses. */
export class ReconciliationOrderError extends Error {
  constructor(
    public readonly kind: ReducerError["kind"],
    message?: string,
    options?: { cause?: unknown },
  ) {
    super(message ?? kind, options);
    this.name = "ReconciliationOrderError";
  }
}

/**
 * Replay durable ledger rows through the canonical reducer to obtain the
 * prior session's lifecycle projection. A typed reducer rejection is an
 * impossible durable order at this boundary and is re-raised as
 * ReconciliationOrderError; nothing is normalized or skipped.
 */
export function replayDurablePrefix(rows: readonly LedgerRow[]): LifecycleState {
  let state: LifecycleState = INITIAL_LIFECYCLE_STATE;
  for (const row of rows) {
    const event = JSON.parse(row.event_json) as LedgerEventV1;
    try {
      state = reduceLedgerEvent(state, event);
    } catch (error) {
      if (error instanceof ReducerError) {
        throw new ReconciliationOrderError(error.kind, `${error.message} (row ${row.sequence})`, { cause: error });
      }
      throw error;
    }
  }
  return state;
}

/** Classify the durable prefix from the canonical projection alone. */
export function classifyDurablePrefix(state: LifecycleState): PrefixKind | "complete" {
  if (state.sessionId === null || state.phase === "closed") return "complete";
  switch (state.phase) {
    case "starting":
      return "open_no_activation";
    case "interrupted":
      return state.tokenState === "invalidated" ? "interrupted_invalidated" : "interrupted_only";
    case "closing":
      return state.closureKind === "founder" ? "founder_close_at_closing" : "interruption_through_closing";
    case "active":
    case "paused":
      return "no_typed_terminal";
  }
}

/**
 * The section 9.5 completion for a durable prefix: the missing lifecycle
 * records, chained from the durable head, in the order the canonical reducer
 * accepts. An already complete prefix plans nothing.
 */
export function planPrefixCompletion(
  state: LifecycleState,
  ctx: PrefixContext,
): readonly SessionLifecycleEventV1[] {
  const kind = classifyDurablePrefix(state);
  if (kind === "complete") return [];
  const sessionId = state.sessionId;
  if (sessionId === null) return [];

  const tokenValid = state.tokenState === "valid";
  const records: PlannedRecord[] = [];

  switch (kind) {
    case "open_no_activation":
      // The reducer accepts fencing_token_invalidated only in interrupted,
      // closing, or closed, so the abort lands first when a token was issued.
      records.push(abortRecord());
      if (tokenValid) records.push(invalidationRecord("rollback", null));
      break;

    case "interrupted_only":
      if (tokenValid) records.push(invalidationRecord("interruption", requireIncidentId(state)));
      records.push(interruptionTerminal("session_closing", state));
      records.push(interruptionTerminal("session_closed", state));
      break;

    case "interrupted_invalidated":
      records.push(interruptionTerminal("session_closing", state));
      records.push(interruptionTerminal("session_closed", state));
      break;

    case "interruption_through_closing":
      requireGovernedProcessesGone(ctx, kind);
      records.push(interruptionTerminal("session_closed", state));
      break;

    case "founder_close_at_closing":
      if (tokenValid) records.push(invalidationRecord("founder_close", null));
      requireGovernedProcessesGone(ctx, kind);
      records.push(founderClosedRecord(ctx));
      break;

    case "no_typed_terminal":
      // The unclean closure moves the phase to closed, the only phase in which
      // the reducer then accepts the missing invalidation.
      records.push(uncleanClosureRecord(ctx));
      if (tokenValid) records.push(invalidationRecord("rollback", null));
      break;
  }

  return chain(records, state, ctx, sessionId);
}

// ─── Record construction ───

type PlannedRecord = {
  readonly [K in SessionLifecycleEventTypeV1]: {
    readonly event_type: K;
    readonly payload: LifecyclePayloadByTypeV1[K];
    readonly reason_code: K extends "session_interrupted" ? InterruptionReasonCodeV1 : string | null;
  };
}[SessionLifecycleEventTypeV1];

function abortRecord(): PlannedRecord {
  return {
    event_type: "session_abort",
    payload: { abort_reason: "next_start_open_without_activation" },
    reason_code: null,
  };
}

function invalidationRecord(
  reason: LifecyclePayloadByTypeV1["fencing_token_invalidated"]["invalidation_reason"],
  incidentId: string | null,
): PlannedRecord {
  return {
    event_type: "fencing_token_invalidated",
    payload: { invalidation_reason: reason, incident_id: incidentId },
    reason_code: null,
  };
}

function interruptionTerminal(
  eventType: "session_closing" | "session_closed",
  state: LifecycleState,
): PlannedRecord {
  const incidentId = requireIncidentId(state);
  const reasonCode = state.reasonCode;
  if (reasonCode === null) {
    throw new Error(`${eventType}: the interrupted state carries no reason_code to preserve`);
  }
  return {
    event_type: eventType,
    payload: { closure_kind: "interruption", incident_id: incidentId, reason_code: reasonCode },
    reason_code: reasonCode,
  };
}

function founderClosedRecord(ctx: PrefixContext): PlannedRecord {
  if (ctx.founderCommandId === null) {
    throw new Error("founder_close_at_closing: the durable Founder session_closing command_id is required; none is fabricated");
  }
  return {
    event_type: "session_closed",
    payload: {
      command_id: ctx.founderCommandId,
      authorized_by: "founder",
      closure_kind: "founder",
      incident_id: null,
    },
    reason_code: null,
  };
}

function uncleanClosureRecord(ctx: PrefixContext): PlannedRecord {
  return {
    event_type: "session_unclean_closure",
    payload: { detected_at_startup: true, last_durable_event_id: ctx.lastDurableEventId },
    reason_code: null,
  };
}

function requireIncidentId(state: LifecycleState): string {
  if (state.incident === null) {
    throw new Error("interruption completion requires the open incident from the durable state");
  }
  return state.incident.id;
}

function requireGovernedProcessesGone(ctx: PrefixContext, kind: PrefixKind): void {
  if (ctx.governedProcessesGone !== true) {
    throw new Error(`${kind}: session_closed requires affirmative proof that no governed process remains`);
  }
}

/**
 * Stamp the shared base fields and chain event-level previous hashes: the
 * first record points at the durable head, each later record at the
 * immediately preceding planned record, using the ledger's own hash algorithm
 * over canonical JSON so the persisted rows and the planned chain coincide.
 */
function chain(
  records: readonly PlannedRecord[],
  state: LifecycleState,
  ctx: PrefixContext,
  sessionId: string,
): readonly SessionLifecycleEventV1[] {
  if (ctx.eventIds.length < records.length) {
    throw new Error(`completion needs ${records.length} event ids, context supplied ${ctx.eventIds.length}`);
  }
  const planned: SessionLifecycleEventV1[] = [];
  let previous = ctx.previousEventHash;
  records.forEach((record, index) => {
    const event = {
      protocol_version: PROTOCOL_VERSION,
      event_id: ctx.eventIds[index]!,
      session_id: sessionId,
      event_type: record.event_type,
      actor: "madbridge",
      task_envelope_hash: ctx.taskEnvelopeHash,
      repository_fingerprint: ctx.repositoryFingerprint,
      fencing_token: state.fencingToken,
      reason_code: record.reason_code,
      created_at: ctx.createdAt,
      previous_event_hash: previous,
      payload: record.payload,
    } as SessionLifecycleEventV1;
    planned.push(event);
    previous = computeEventHash(previous, canonicalJson(event));
  });
  return planned;
}
