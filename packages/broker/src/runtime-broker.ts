// packages/broker/src/runtime-broker.ts
// Phase 3A M8 Task 19: pin the two durable lifecycle orders and the activation
// barrier (specification sections 2.5 and 9.5; plan Task 19 with the
// 2026-09-13 Founder RuntimeBroker dependency, ordering, and failure-injection
// rulings).
//
// Invariant: durable order is the observable order, and no `active` state is
// ever visible before it is durable. Every lifecycle record this broker writes
// goes through the injected Ledger; every projection change comes from folding
// the row the Ledger actually returned through the canonical reducer; every
// observation is published only after that fold. Lifecycle legality is owned by
// `reduceLedgerEvent`, durability by `Ledger`, and fencing record construction
// by the Task 18 helpers. Retained execution snapshots carry launch facts,
// never process handles, a registry, a clock, or a source of randomness.
//
// Construction derives the lifecycle projection, the session identity, and the
// durable chain head from the injected Ledger's own rows. Execution launch
// facts may be supplied separately; lifecycle and fencing authority remain
// entirely derived from the chain.

import { GENESIS_HASH, INITIAL_LIFECYCLE_STATE, computeEventHash, reduceLedgerEvent } from "@madventures/ledger";
import type { Ledger, LedgerRow, LifecyclePhase, LifecycleState } from "@madventures/ledger";
import { PROTOCOL_VERSION, canonicalJson } from "@madventures/protocol";
import type {
  InterruptionReasonCodeV1,
  LedgerEventV1,
  LifecyclePayloadByTypeV1,
  RepositoryFingerprint,
  SessionLifecycleEventTypeV1,
  SessionLifecycleEventV1,
} from "@madventures/protocol";
import { invalidateToken, issueInitialToken } from "./fencing";
import type { FencingRecordContext } from "./fencing";
import type { SnapshotProjectionInput } from "./snapshot";
import type { ExecutionSnapshot } from "./client";

// ─── Dependency contract ───

/**
 * Immutable, already-established session provenance. Neither the session
 * identity nor the durable head is carried here: both are derived from the
 * ledger at construction.
 */
export interface RuntimeBrokerProvenance {
  readonly taskEnvelopeHash: string;
  readonly repositoryFingerprint: RepositoryFingerprint;
}

/**
 * Deterministic per-record sources. Injected; never ambient. Each record
 * consumes exactly one `nextEventId()` call and then exactly one `now()` call,
 * in record construction order.
 */
export interface RuntimeBrokerSources {
  readonly now: () => string;
  readonly nextEventId: () => string;
}

/** The narrow governed-process authority boundary. */
export type GovernedProcessTerminator = () => Promise<void>;

/**
 * M8-local lifecycle observation. NOT the M9 `BrokerSnapshot` contract and NOT
 * exported from `packages/broker/src/index.ts`. It carries only the fields this
 * task can publish truthfully, and exists solely to prove the activation
 * barrier and the terminal ordering.
 */
export interface LifecycleObservation {
  readonly snapshotSeq: number;
  readonly phase: LifecyclePhase;
  readonly ledgerSeq: number;
}

export interface RuntimeBrokerDeps {
  /** The one ledger and the one hash chain. Never constructed by this task. */
  readonly ledger: Ledger;
  readonly provenance: RuntimeBrokerProvenance;
  readonly sources: RuntimeBrokerSources;
  /** Launch facts retained across build-time reconstruction, never lifecycle authority. */
  readonly executions?: readonly ExecutionSnapshot[] | null;
  /**
   * Required. Awaited after durable `session_closing` and before
   * `session_closed` is appended.
   */
  readonly terminateGovernedProcesses: GovernedProcessTerminator;
  /** Required M8-local observation sink. */
  readonly observe: (observation: LifecycleObservation) => void;
}

export type InterruptionSeverity = "low" | "medium" | "high";

// ─── Error contract ───

export type RuntimeBrokerErrorKind =
  | "missing_session_id"
  | "invalid_readiness_set"
  | "invalid_phase"
  | "activation_failed";

export class RuntimeBrokerError extends Error {
  constructor(
    public readonly kind: RuntimeBrokerErrorKind,
    message?: string,
    options?: { cause?: unknown },
  ) {
    super(message ?? kind, options);
    this.name = "RuntimeBrokerError";
  }
}

// ─── Record vocabulary ───

const LIFECYCLE_ACTOR = "madbridge" as const;

/**
 * The canonical abort reason of the already-ratified open-no-activation
 * prefix (next-start-reconciliation.ts). No new abort vocabulary.
 */
const ABORT_REASON_OPEN_WITHOUT_ACTIVATION = "next_start_open_without_activation";

type ReasonCodeOf<K extends SessionLifecycleEventTypeV1> = K extends "session_interrupted"
  ? InterruptionReasonCodeV1
  : string | null;

function parseRow(row: LedgerRow): LedgerEventV1 {
  return JSON.parse(row.event_json) as LedgerEventV1;
}

function requireReadinessSet(readyExecutionIds: readonly string[]): void {
  if (readyExecutionIds.length === 0) {
    throw new RuntimeBrokerError("invalid_readiness_set", "activation requires a non-empty ready execution set");
  }
  if (new Set(readyExecutionIds).size !== readyExecutionIds.length) {
    throw new RuntimeBrokerError("invalid_readiness_set", "activation requires a ready execution set without duplicates");
  }
}

// ─── RuntimeBroker ───

export class RuntimeBroker {
  private readonly deps: RuntimeBrokerDeps;
  private readonly sessionId: string;
  private state: LifecycleState;
  private executionSnapshots: readonly ExecutionSnapshot[] | null;
  /** The durable chain head: seeded from the replayed rows, advanced only from rows the Ledger returns. */
  private head: string;
  /** M8-local monotonic observation sequence; not the M9 snapshot contract. */
  private seq = 0;

  constructor(deps: RuntimeBrokerDeps) {
    this.deps = deps;
    const rows = deps.ledger.readAfter(0);
    let state: LifecycleState = INITIAL_LIFECYCLE_STATE;
    for (const row of rows) {
      // A typed reducer rejection is an impossible durable order: it propagates.
      state = reduceLedgerEvent(state, parseRow(row));
    }
    const last = rows[rows.length - 1];
    this.head = last === undefined ? GENESIS_HASH : last.event_hash;
    if (state.sessionId === null) {
      throw new RuntimeBrokerError(
        "missing_session_id",
        "construction requires a durable session_open; the replayed projection carries no session id",
      );
    }
    this.sessionId = state.sessionId;
    this.state = state;
    this.executionSnapshots = deps.executions == null ? null : structuredClone(deps.executions);
  }

  get snapshotSeq(): number {
    return this.seq;
  }

  /**
   * Task 22's one permitted read-only accessor (DEC-20260926-01 B4). Returns
   * the D10-R1 SnapshotProjectionInput built from this broker's own
   * authoritative in-memory state and the complete durable ledger chain
   * starting at sequence 1 (DEC-20260926-01 B3). Mutates nothing: `state` and
   * `provenance` are copied, so no returned value is an object this broker
   * later reads (DEC-20260929-01 B1 item 2), and the ledger is read fresh via
   * `readAfter(0)` so the caller always receives the full chain, never a cached
   * suffix.
   */
  snapshotProjectionInput(): SnapshotProjectionInput {
    return {
      lifecycle: structuredClone(this.state),
      ledgerRows: this.deps.ledger.readAfter(0),
      provenance: structuredClone(this.deps.provenance),
      executions: this.executionSnapshots === null ? null : structuredClone(this.executionSnapshots),
    };
  }

  /**
   * Startup: `fencing_token_issued` then `session_activated`, as two separate
   * durable appends. The first `active` observation follows the second fold.
   * If activation is not made durable after a durable issuance, the session is
   * aborted and its token invalidated in one atomic batch, and no `active`
   * observation is ever published.
   */
  async activate(
    writerExecutionId: string,
    readyExecutionIds: readonly string[],
    executionSnapshots?: readonly ExecutionSnapshot[],
  ): Promise<void> {
    requireReadinessSet(readyExecutionIds);
    if (this.state.phase !== "starting" || this.state.tokenState !== "not_issued") {
      throw new RuntimeBrokerError(
        "invalid_phase",
        `activation requires phase starting with no issued token, found ${this.state.phase} with token ${this.state.tokenState}`,
      );
    }
    const executions = executionSnapshots === undefined ? this.executionSnapshots : structuredClone(executionSnapshots);
    this.persist(issueInitialToken(this.sessionId, writerExecutionId, this.fencingContext()));
    this.executionSnapshots = executions;
    try {
      this.persist(
        this.record(
          "session_activated",
          { execution_ids: [...readyExecutionIds], readiness_snapshot_seq: this.seq },
          null,
        ),
      );
    } catch (error) {
      this.compensateFailedActivation();
      throw new RuntimeBrokerError(
        "activation_failed",
        "session_activated was not made durable; the session was aborted and its token invalidated",
        { cause: error },
      );
    }
  }

  async publish(event: import("@madventures/protocol").BridgeEventV1) {
    let row: LedgerRow;
    try {
      if (this.deps.ledger.hasEventId(event.event_id)) {
        return { ok: false as const, commandId: event.event_id, error: "invalid_command" as const, detail: "publish: duplicate event_id" };
      }
      row = this.deps.ledger.append(event);
    } catch {
      try {
        await this.interrupt("ledger_write_failed", "publish: ledger_write_failed", "high", this.deps.sources.nextEventId(), null, null);
      } catch {
        // A non-durable interruption still requires teardown; next start reconciles its closure.
        if (this.state.phase !== "closing" && this.state.phase !== "closed") {
          try { await this.deps.terminateGovernedProcesses(); } catch { /* The returned ledger failure cannot certify teardown. */ }
        }
      }
      return { ok: false as const, commandId: event.event_id, error: "ledger_write_failed" as const, detail: "publish: ledger_write_failed" };
    }
    this.fold(row);
    return { ok: true as const, commandId: event.event_id };
  }

  async publishIncident(event: import("@madventures/protocol").BridgeEventV1) {
    const payload = event.payload as unknown as import("@madventures/protocol").PublishedIncidentPayloadV1;
    const reason = "execution_reported_incident" as const;
    const interrupted = {
      ...this.record("session_interrupted", {
        incident_id: payload.incident_id,
        reason: payload.reason,
        severity: payload.severity,
        source_event_id: event.event_id,
        reported_by_execution_id: event.sender_execution_id,
      }, reason),
      previous_event_hash: computeEventHash(this.head, canonicalJson(event)),
    };
    reduceLedgerEvent(reduceLedgerEvent(this.state, event), interrupted);
    let rows: readonly LedgerRow[];
    try {
      rows = this.deps.ledger.appendMany([event, interrupted]);
    } catch {
      try {
        await this.interrupt("ledger_write_failed", "publishIncident: ledger_write_failed", "high", this.deps.sources.nextEventId(), null, null);
      } catch {
        // A non-durable interruption still requires teardown; next start reconciles its closure.
        if (this.state.phase !== "closing" && this.state.phase !== "closed") {
          try { await this.deps.terminateGovernedProcesses(); } catch { /* The returned ledger failure cannot certify teardown. */ }
        }
      }
      return { ok: false as const, commandId: event.event_id, error: "ledger_write_failed" as const, detail: "publishIncident: ledger_write_failed" };
    }
    // Fold the source silently so the pair has only its interrupted observation.
    this.state = reduceLedgerEvent(this.state, parseRow(rows[0]!));
    this.head = rows[0]!.event_hash;
    this.fold(rows[1]!);
    this.persist(invalidateToken(this.state, "interruption", payload.incident_id, this.fencingContext()));
    const terminal = { closure_kind: "interruption", incident_id: payload.incident_id, reason_code: reason } as const;
    this.persist(this.record("session_closing", terminal, reason));
    await this.deps.terminateGovernedProcesses();
    this.persist(this.record("session_closed", terminal, reason));
    return { ok: true as const, commandId: event.event_id };
  }

  async pause(commandId: string): Promise<void> {
    if (this.state.phase !== "active") {
      throw new RuntimeBrokerError("invalid_phase", `pause requires phase active, found ${this.state.phase}`);
    }
    this.persist(this.record("session_paused", { command_id: commandId, authorized_by: "founder" }, null));
  }

  async resume(commandId: string): Promise<void> {
    if (this.state.phase !== "paused") {
      throw new RuntimeBrokerError("invalid_phase", `resume requires phase paused, found ${this.state.phase}`);
    }
    this.persist(this.record("session_resumed", { command_id: commandId, authorized_by: "founder" }, null));
  }

  /**
   * Interruption: `session_interrupted` → `fencing_token_invalidated` →
   * `session_closing` → governed-process termination → `session_closed`. Each
   * record is its own durable prefix (section 9.5 next-start states). A
   * rejecting terminator leaves the session at durable `closing`.
   */
  async interrupt(
    reason: InterruptionReasonCodeV1,
    detail: string,
    severity: InterruptionSeverity,
    incidentId: string,
    sourceEventId: string | null,
    reportedBy: string | null,
  ): Promise<void> {
    this.persist(
      this.record(
        "session_interrupted",
        {
          incident_id: incidentId,
          reason: detail,
          severity,
          source_event_id: sourceEventId,
          reported_by_execution_id: reportedBy,
        },
        reason,
      ),
    );
    this.persist(invalidateToken(this.state, "interruption", incidentId, this.fencingContext()));
    const terminal = { closure_kind: "interruption", incident_id: incidentId, reason_code: reason } as const;
    this.persist(this.record("session_closing", terminal, reason));
    await this.deps.terminateGovernedProcesses();
    this.persist(this.record("session_closed", terminal, reason));
  }

  /**
   * Founder close: `session_closing` → `fencing_token_invalidated` →
   * governed-process termination → `session_closed`. Closing and invalidation
   * are separate durable prefixes. A rejecting terminator leaves the session at
   * durable `closing`.
   */
  async founderClose(commandId: string): Promise<void> {
    const terminal = {
      command_id: commandId,
      authorized_by: "founder",
      closure_kind: "founder",
      incident_id: null,
    } as const;
    this.persist(this.record("session_closing", terminal, null));
    this.persist(invalidateToken(this.state, "founder_close", null, this.fencingContext()));
    await this.deps.terminateGovernedProcesses();
    this.persist(this.record("session_closed", terminal, null));
  }

  // ─── Durability, folding, and observation ───

  /**
   * One durable step: admit the record through the canonical reducer so an
   * illegal record never reaches the chain, append it through the injected
   * Ledger, then fold and observe the row the Ledger actually returned.
   */
  private persist(event: SessionLifecycleEventV1): void {
    reduceLedgerEvent(this.state, event);
    this.fold(this.deps.ledger.append(event));
  }

  /**
   * Fold one returned durable row: the projection comes from the row's own
   * bytes, the head from the row's own hash, and the observation follows both.
   */
  private fold(row: LedgerRow): void {
    this.state = reduceLedgerEvent(this.state, parseRow(row));
    this.head = row.event_hash;
    this.seq += 1;
    this.deps.observe({ snapshotSeq: this.seq, phase: this.state.phase, ledgerSeq: row.sequence });
  }

  /**
   * Failed-activation compensation after a durable issuance: `session_abort`
   * then `fencing_token_invalidated`, persisted as one atomic batch. The
   * reducer accepts the invalidation only once the abort has moved the phase
   * to `closed`, so the invalidation is constructed against the post-abort
   * projection and its event-level previous hash names the planned abort
   * record, following the next-start completion precedent. The head itself
   * advances only from the returned rows.
   */
  private compensateFailedActivation(): void {
    const abort = this.record("session_abort", { abort_reason: ABORT_REASON_OPEN_WITHOUT_ACTIVATION }, null);
    const aborted = reduceLedgerEvent(this.state, abort);
    const invalidation = invalidateToken(aborted, "rollback", null, {
      taskEnvelopeHash: this.deps.provenance.taskEnvelopeHash,
      repositoryFingerprint: this.deps.provenance.repositoryFingerprint,
      previousEventHash: computeEventHash(this.head, canonicalJson(abort)),
      eventId: this.deps.sources.nextEventId(),
      createdAt: this.deps.sources.now(),
    });
    reduceLedgerEvent(aborted, invalidation);
    for (const row of this.deps.ledger.appendMany([abort, invalidation])) {
      this.fold(row);
    }
  }

  // ─── Record construction ───

  /** The Task 18 carrier, built here from provenance, the tracked head, and the injected sources. */
  private fencingContext(): FencingRecordContext {
    return {
      taskEnvelopeHash: this.deps.provenance.taskEnvelopeHash,
      repositoryFingerprint: this.deps.provenance.repositoryFingerprint,
      previousEventHash: this.head,
      eventId: this.deps.sources.nextEventId(),
      createdAt: this.deps.sources.now(),
    };
  }

  /** A madbridge-authored lifecycle record stamped from the same sources as the fencing carrier. */
  private record<K extends SessionLifecycleEventTypeV1>(
    eventType: K,
    payload: LifecyclePayloadByTypeV1[K],
    reasonCode: ReasonCodeOf<K>,
  ): SessionLifecycleEventV1 {
    const ctx = this.fencingContext();
    return {
      protocol_version: PROTOCOL_VERSION,
      event_id: ctx.eventId,
      session_id: this.sessionId,
      event_type: eventType,
      actor: LIFECYCLE_ACTOR,
      task_envelope_hash: ctx.taskEnvelopeHash,
      repository_fingerprint: ctx.repositoryFingerprint,
      fencing_token: this.state.fencingToken,
      reason_code: reasonCode,
      created_at: ctx.createdAt,
      previous_event_hash: ctx.previousEventHash,
      payload,
    } as SessionLifecycleEventV1;
  }
}
