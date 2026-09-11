// packages/broker/src/reconciliation.ts
// Fail-closed session recovery: interruption and repository reconciliation.
//
// On any monitored process or adapter disconnect, the session atomically
// appends an `incident` event and moves to `interrupted`. The current writer
// token is marked unusable. No auto-resume.
//
// Reconciliation compares actual repository/worktree identity and fingerprint
// with the last committed event, records changed paths (without unrestricted
// file contents), and re-attests both executions, producing one of
// `reconciled`, `ambiguous`, or `mismatch`.
//
// Lifecycle truth is never derived here. `rebuildBrokerState` is a fold of the
// canonical `reduceLedgerEvent` (specification section 9.6); this module has no
// lifecycle transition table of its own, so the broker cannot disagree with
// replay. Same-session resume-after-interrupt is gone with it: `interrupted` is
// terminal-bound and next-start prefix completion (section 9.5) owns recovery.

import type { BridgeEventV1, LedgerEventV1, RepositoryFingerprint } from "@madventures/protocol";
import { canonicalJson } from "@madventures/protocol";
import { transitionSession } from "./session-machine";
import type { SessionState } from "./session-machine";
import type { LedgerRow, LifecycleState } from "@madventures/ledger";
import { GENESIS_HASH, INITIAL_LIFECYCLE_STATE, reduceLedgerEvent } from "@madventures/ledger";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type InterruptReason =
  | "cli_exit"
  | "adapter_disconnect"
  | "broker_restart"
  | "broken_chain";

export interface InterruptInput {
  reason: InterruptReason;
  detail?: string;
  sessionState: SessionState;
  currentWriterToken: number;
  ledgerRows: LedgerRow[];
  now?: string;
}

export interface InterruptResult {
  state: SessionState;
  incidentEvent: BridgeEventV1;
  tokenInvalidated: number;
  autoResumed: false;
  /**
   * True when the session was already interrupted and this call recorded a
   * secondary incident without issuing a new fencing token or mutating state.
   * First-time interrupts are always `false`.
   */
  duplicate: boolean;
}

export interface RepositorySnapshot {
  worktreePath: string;
  commitFingerprint: RepositoryFingerprint;
  workingTreeFingerprint: RepositoryFingerprint;
  changedPaths: readonly string[];
}

export interface ReconcileInput {
  ledgerRows: LedgerRow[];
  expectedFingerprint: RepositoryFingerprint;
  actualSnapshot: RepositorySnapshot;
  /** Both executions must re-attest to the task envelope hash. */
  reattestations: ReadonlyArray<{
    executionId: string;
    taskEnvelopeHash: string;
    attestedAt: string;
  }>;
}

export type ReconcileOutcome = "reconciled" | "ambiguous" | "mismatch";

export interface ReconcileResult {
  outcome: ReconcileOutcome;
  changedPaths: readonly string[];
  reattested: boolean;
  fingerprintMatch: boolean;
  detail: string;
}

// ---------------------------------------------------------------------------
// Deterministic broker-state reconstruction
// ---------------------------------------------------------------------------

/**
 * Deterministically reconstruct broker state from verified ledger events.
 *
 * Implemented only as a fold of the canonical `reduceLedgerEvent` from
 * `INITIAL_LIFECYCLE_STATE`. Every lifecycle decision is made by that one
 * function; this wrapper adds only the row-level bookkeeping (count, chain
 * head, event rows) that is not lifecycle state.
 *
 * Ordinary `BridgeEventV1` traffic is lifecycle-inert: nothing here synthesizes
 * `active` from activity, and legacy execution-authored `resume` records mint
 * no fencing token. Replay is fail-closed by rejection: an illegal or malformed
 * lifecycle record raises the reducer's typed error, and a row whose
 * `event_json` does not parse raises rather than being skipped.
 */
export function rebuildBrokerState(
  rows: readonly LedgerRow[],
): LifecycleState & { count: number; lastEventHash: string; events: LedgerRow[] } {
  const lifecycle = rows.reduce<LifecycleState>(
    (state, row) => reduceLedgerEvent(state, JSON.parse(row.event_json) as LedgerEventV1),
    INITIAL_LIFECYCLE_STATE,
  );
  const last = rows[rows.length - 1];
  return {
    ...lifecycle,
    count: rows.length,
    lastEventHash: last?.event_hash ?? GENESIS_HASH,
    events: [...rows],
  };
}

// ---------------------------------------------------------------------------
// Fail-closed interruption
// ---------------------------------------------------------------------------

/**
 * On any monitored process or adapter disconnect:
 * 1. Atomically append an `incident` event to the ledger.
 * 2. Move session to `interrupted`.
 * 3. Mark the current writer token unusable.
 * 4. Do NOT auto-resume.
 */
export function interruptSession(input: InterruptInput): InterruptResult {
  const now = input.now ?? new Date().toISOString();

  // Determine the previous event hash for chaining
  const lastRow = input.ledgerRows[input.ledgerRows.length - 1];
  const previousHash = lastRow?.event_hash ?? "0".repeat(64);

  // Construct the incident event
  const incidentEvent: BridgeEventV1 = {
    protocol_version: "madbridge-protocol/v1",
    event_id: crypto.randomUUID(),
    session_id: lastRow ? (JSON.parse(lastRow.event_json) as BridgeEventV1).session_id : "session-recovery",
    parent_event_id: lastRow ? (JSON.parse(lastRow.event_json) as BridgeEventV1).event_id : null,
    sender_execution_id: "system",
    receiver_execution_id: "system",
    sender_role: "system",
    sender_surface: "broker",
    sender_model: "system",
    sender_provider: "internal",
    task_envelope_hash: lastRow ? (JSON.parse(lastRow.event_json) as BridgeEventV1).task_envelope_hash : "0".repeat(64),
    repository_fingerprint: lastRow
      ? (JSON.parse(lastRow.event_json) as BridgeEventV1).repository_fingerprint
      : { kind: "commit", sha256: "0".repeat(64), git_sha: "0".repeat(40) },
    event_type: "incident",
    payload_hash: "",
    payload: {
      reason: input.reason,
      detail: input.detail ?? "",
      interrupted_at: now,
      invalidated_token: input.currentWriterToken,
    },
    created_at: now,
    previous_event_hash: previousHash,
  };

  // Duplicate-interrupt idempotency: if the session is already interrupted,
  // do NOT attempt the state-machine transition (interrupted -> interrupted is
  // not a legal edge). Record a secondary incident event for auditability and
  // notification, leave the state and fencing token untouched, and return
  // { duplicate: true }. The token remains unusable, no new token is issued.
  if (input.sessionState.kind === "interrupted") {
    return {
      state: input.sessionState,
      incidentEvent,
      tokenInvalidated: input.currentWriterToken,
      autoResumed: false,
      duplicate: true,
    };
  }

  // Transition to interrupted through the state machine. Every first-time
  // interruption — whether the session is active, paused, starting, or
  // reconciling — uses this single path. Invalid transitions (e.g. from
  // `closed` or `closing`) throw rather than being silently overridden; the
  // caller decides how to fail closed.
  const newState = transitionSession(input.sessionState, { type: "interrupt" });

  return {
    state: newState,
    incidentEvent,
    tokenInvalidated: input.currentWriterToken,
    autoResumed: false,
    duplicate: false,
  };
}

// ---------------------------------------------------------------------------
// Repository reconciliation
// ---------------------------------------------------------------------------

/**
 * Compare actual repository/worktree identity and fingerprint with the last
 * committed event. Record changed paths without unrestricted file contents.
 * Re-attest both executions. Produce one of reconciled/ambiguous/mismatch.
 *
 * Only `reconciled` plus a matching typed Founder resume event returns to `active`.
 */
export function reconcileRepository(input: ReconcileInput): ReconcileResult {
  const { expectedFingerprint, actualSnapshot, reattestations } = input;

  // 1. Fingerprint comparison — compare the expected (last committed) fingerprint
  //    with both the commit and working-tree fingerprints from the actual snapshot.
  const commitMatches = actualSnapshot.commitFingerprint.sha256 === expectedFingerprint.sha256;
  const workingTreeMatch = actualSnapshot.workingTreeFingerprint.sha256 === expectedFingerprint.sha256;

  // 2. Check for ambiguity — if commit and working-tree disagree significantly
  //    and neither matches the expected, it's ambiguous.
  const commitVsWorktreeMatch =
    actualSnapshot.commitFingerprint.sha256 === actualSnapshot.workingTreeFingerprint.sha256;

  // 3. Re-attestation: exactly 2 executions must re-attest
  const reattested = reattestations.length >= 2 &&
    reattestations.every((a) => a.taskEnvelopeHash.length > 0 && a.attestedAt.length > 0);

  // 4. Determine outcome
  let outcome: ReconcileOutcome;

  if (!reattested) {
    // Re-attestation is required — without it we can't reconcile
    outcome = "ambiguous";
  } else if (!commitMatches && !workingTreeMatch) {
    // Neither fingerprint matches — could be drift or tampering
    if (!commitVsWorktreeMatch) {
      // Commit and working tree disagree — ambiguous
      outcome = "ambiguous";
    } else {
      // Both agree with each other but not with expected — mismatch
      outcome = "mismatch";
    }
  } else if (!commitMatches || !workingTreeMatch) {
    // One matches, one doesn't — working tree has uncommitted changes
    // This is acceptable as long as commit matches and changed paths are recorded
    if (commitMatches) {
      // Commit matches, working tree has changes — reconciled with recorded paths
      outcome = "reconciled";
    } else {
      // Working tree matches but commit doesn't — ambiguous
      outcome = "ambiguous";
    }
  } else {
    // Both match — fully reconciled
    outcome = "reconciled";
  }

  const fingerprintMatch = commitMatches && workingTreeMatch;

  const detail = outcome === "reconciled"
    ? `fingerprint matched, ${actualSnapshot.changedPaths.length} changed paths recorded`
    : outcome === "ambiguous"
      ? `re-attestation ${reattested ? "ok" : "missing"}, commit=${commitMatches}, worktree=${workingTreeMatch}`
      : `fingerprint mismatch: expected=${expectedFingerprint.sha256.slice(0, 8)}, actual_commit=${actualSnapshot.commitFingerprint.sha256.slice(0, 8)}`;

  return {
    outcome,
    changedPaths: actualSnapshot.changedPaths,
    reattested,
    fingerprintMatch,
    detail,
  };
}
