// packages/broker/src/fencing.ts
// Phase 3A M8 Task 18: deterministic fencing-token issuance, transfer, and
// invalidation (specification section 9.5; plan Task 18 with the 2026-09-13
// Founder event-construction context ruling).
//
// Pure record construction only. Every value carried into a record originates
// with the caller through FencingRecordContext: this module performs zero clock
// reads, zero identifier generation, zero repository fingerprinting, zero
// ledger reads, and zero environment discovery. Lifecycle legality remains
// owned by the canonical reducer; these helpers fail closed on the Task 18
// preconditions and never repair or coerce lifecycle state. The live-session
// owner of the carried values is RuntimeBroker (Task 19), not this module.

import { PROTOCOL_VERSION } from "@madventures/protocol";
import type { RepositoryFingerprint, SessionLifecycleEventV1 } from "@madventures/protocol";
import type { LifecycleState } from "@madventures/ledger";

/**
 * Immutable mechanical carrier of already-established record values. It
 * grants no authority to discover or generate any of them.
 */
export interface FencingRecordContext {
  readonly taskEnvelopeHash: string;
  readonly repositoryFingerprint: RepositoryFingerprint;
  readonly previousEventHash: string;
  readonly createdAt: string;
  readonly eventId: string;
}

export type FencingErrorKind =
  | "missing_session_id"
  | "invalid_phase"
  | "missing_fencing_token"
  | "invalid_token_state";

export class FencingError extends Error {
  constructor(
    public readonly kind: FencingErrorKind,
    message?: string,
  ) {
    super(message ?? kind);
    this.name = "FencingError";
  }
}

/** The first token of every session. Derived, never random. */
export const INITIAL_FENCING_TOKEN = 1 as const;

export type InvalidationReason = "interruption" | "founder_close" | "rollback";

type FencingTokenIssuedEvent = Extract<SessionLifecycleEventV1, { readonly event_type: "fencing_token_issued" }>;
type FencingTokenInvalidatedEvent = Extract<
  SessionLifecycleEventV1,
  { readonly event_type: "fencing_token_invalidated" }
>;

const LIFECYCLE_ACTOR = "madbridge" as const;

/** One real NUL byte (U+0000) at runtime; written as an escape so the source stays text. */
const NUL = "\u0000";

/** Phases in which the canonical reducer accepts `fencing_token_issued`. */
const TRANSFER_PHASES: ReadonlySet<LifecycleState["phase"]> = new Set(["starting", "active"]);

/** Phases in which the canonical reducer accepts `fencing_token_invalidated`. */
const INVALIDATION_PHASES: ReadonlySet<LifecycleState["phase"]> = new Set(["interrupted", "closing", "closed"]);

function requireSessionId(state: LifecycleState, operation: string): string {
  if (state.sessionId === null) {
    throw new FencingError("missing_session_id", `${operation} requires an existing session; lifecycle state has no session id`);
  }
  return state.sessionId;
}

function requirePhase(state: LifecycleState, allowed: ReadonlySet<LifecycleState["phase"]>, operation: string): void {
  if (!allowed.has(state.phase)) {
    throw new FencingError("invalid_phase", `${operation} is not permitted in phase ${state.phase}`);
  }
}

/**
 * The current token, required to be an issued, valid, usable-as-recorded,
 * positive integer. A missing token is never treated as zero; a malformed or
 * invalidated token is never coerced.
 */
function requireCurrentToken(state: LifecycleState, operation: string, requireUsable: boolean): number {
  if (state.tokenState === "not_issued" || state.fencingToken === null) {
    if (state.tokenState === "valid") {
      throw new FencingError("invalid_token_state", `${operation}: token state is valid but no token value is recorded`);
    }
    throw new FencingError("missing_fencing_token", `${operation} requires an issued fencing token`);
  }
  if (state.tokenState !== "valid") {
    throw new FencingError("invalid_token_state", `${operation}: current token is ${state.tokenState}`);
  }
  if (requireUsable && !state.tokenUsable) {
    throw new FencingError("invalid_token_state", `${operation}: current token is not usable`);
  }
  const token = state.fencingToken;
  if (!Number.isSafeInteger(token) || token < INITIAL_FENCING_TOKEN) {
    throw new FencingError("invalid_token_state", `${operation}: current token value ${String(token)} is malformed`);
  }
  return token;
}

/** Initial issuance for a new session: `fencing_token_issued` with value 1. */
export function issueInitialToken(
  sessionId: string,
  writerExecutionId: string,
  ctx: FencingRecordContext,
): SessionLifecycleEventV1 {
  return issuedRecord(sessionId, INITIAL_FENCING_TOKEN, writerExecutionId, ctx);
}

/** Ownership transfer inside an existing session: value = current + 1. */
export function issueTransferToken(
  state: LifecycleState,
  writerExecutionId: string,
  ctx: FencingRecordContext,
): SessionLifecycleEventV1 {
  const sessionId = requireSessionId(state, "ownership transfer");
  requirePhase(state, TRANSFER_PHASES, "ownership transfer");
  const current = requireCurrentToken(state, "ownership transfer", true);
  return issuedRecord(sessionId, current + 1, writerExecutionId, ctx);
}

/** Invalidation of the current token for one of the three approved reasons. */
export function invalidateToken(
  state: LifecycleState,
  reason: InvalidationReason,
  incidentId: string | null,
  ctx: FencingRecordContext,
): SessionLifecycleEventV1 {
  const sessionId = requireSessionId(state, "token invalidation");
  requirePhase(state, INVALIDATION_PHASES, "token invalidation");
  const current = requireCurrentToken(state, "token invalidation", false);
  const event: FencingTokenInvalidatedEvent = {
    protocol_version: PROTOCOL_VERSION,
    event_id: ctx.eventId,
    session_id: sessionId,
    event_type: "fencing_token_invalidated",
    actor: LIFECYCLE_ACTOR,
    task_envelope_hash: ctx.taskEnvelopeHash,
    repository_fingerprint: ctx.repositoryFingerprint,
    fencing_token: current,
    reason_code: null,
    created_at: ctx.createdAt,
    previous_event_hash: ctx.previousEventHash,
    payload: { invalidation_reason: reason, incident_id: incidentId },
  };
  return event;
}

/**
 * Logical composite identity `(session_id, fencing_token)` joined by exactly
 * one real NUL byte (U+0000), matching the repository's canonical-key
 * separator precedent. A formatting surface only: it creates no database
 * uniqueness constraint.
 */
export function tokenKey(sessionId: string, token: number): string {
  return `${sessionId}${NUL}${token}`;
}

function issuedRecord(
  sessionId: string,
  token: number,
  writerExecutionId: string,
  ctx: FencingRecordContext,
): FencingTokenIssuedEvent {
  return {
    protocol_version: PROTOCOL_VERSION,
    event_id: ctx.eventId,
    session_id: sessionId,
    event_type: "fencing_token_issued",
    actor: LIFECYCLE_ACTOR,
    task_envelope_hash: ctx.taskEnvelopeHash,
    repository_fingerprint: ctx.repositoryFingerprint,
    fencing_token: token,
    reason_code: null,
    created_at: ctx.createdAt,
    previous_event_hash: ctx.previousEventHash,
    payload: { writer_execution_id: writerExecutionId },
  };
}
