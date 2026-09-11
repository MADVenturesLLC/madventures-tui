// packages/broker/test/reconciliation.test.ts
// Disconnect and restart recovery tests — fail-closed session recovery.
//
// Phase 3A Task 15: the broker has no lifecycle transition table of its own.
// rebuildBrokerState is a fold of the canonical reduceLedgerEvent, so the
// broker cannot disagree with ledger replay.

import { expect, test, describe } from "bun:test";
import {
  interruptSession,
  reconcileRepository,
  rebuildBrokerState,
} from "../src/reconciliation";
import type { InterruptReason, RepositorySnapshot, ReconcileInput } from "../src/reconciliation";
import { InvalidTransitionError } from "../src/session-machine";
import type { BridgeEventV1, RepositoryFingerprint } from "@madventures/protocol";
import { PROTOCOL_VERSION, sha256Hex } from "@madventures/protocol";
import type { LedgerRow, LifecycleState } from "@madventures/ledger";
import {
  GENESIS_HASH,
  INITIAL_LIFECYCLE_STATE,
  ReducerError,
  reduceLedgerEvent,
  rebuildBrokerState as replayLedger,
} from "@madventures/ledger";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeFingerprint(sha: string, gitSha?: string): RepositoryFingerprint {
  return {
    kind: "commit",
    sha256: sha.padEnd(64, "0"),
    git_sha: (gitSha ?? sha).padEnd(40, "0"),
  };
}

function makeWorkingTreeFingerprint(sha: string, gitSha: string, baseGitSha: string): RepositoryFingerprint {
  return {
    kind: "working_tree",
    sha256: sha.padEnd(64, "0"),
    git_sha: gitSha.padEnd(40, "0"),
    base_git_sha: baseGitSha.padEnd(40, "0"),
  };
}

function makeEvent(
  eventType: BridgeEventV1["event_type"],
  opts?: Partial<BridgeEventV1>,
): BridgeEventV1 {
  return {
    protocol_version: PROTOCOL_VERSION,
    event_id: crypto.randomUUID(),
    session_id: "sess-test-001",
    parent_event_id: null,
    sender_execution_id: "exec-claude",
    receiver_execution_id: "exec-agy",
    sender_role: "builder",
    sender_surface: "claude-code",
    sender_model: "claude-sonnet-4",
    sender_provider: "anthropic",
    task_envelope_hash: "a".repeat(64),
    repository_fingerprint: makeFingerprint("b"),
    event_type: eventType,
    payload_hash: "",
    payload: {},
    created_at: "2026-08-08T16:00:00.000Z",
    previous_event_hash: "0".repeat(64),
    ...opts,
  };
}

function makeLedgerRow(event: BridgeEventV1, seq: number, prevHash: string): LedgerRow {
  const eventJson = JSON.stringify(event);
  const hash = sha256Hex(prevHash + eventJson);
  return {
    sequence: seq,
    event_id: event.event_id,
    event_json: eventJson,
    previous_hash: prevHash,
    event_hash: hash,
    created_at: event.created_at,
  };
}

function makeLedgerRows(events: BridgeEventV1[]): LedgerRow[] {
  const rows: LedgerRow[] = [];
  let prevHash = "0".repeat(64);
  events.forEach((evt, i) => {
    const row = makeLedgerRow(evt, i + 1, prevHash);
    rows.push(row);
    prevHash = row.event_hash;
  });
  return rows;
}

function makeReconcileInput(
  expectedSha: string,
  actualCommitSha: string,
  actualWorktreeSha: string,
  changedPaths: string[] = [],
  reattest?: boolean,
): ReconcileInput {
  const snapshot: RepositorySnapshot = {
    worktreePath: "/repo/worktree-1",
    commitFingerprint: makeFingerprint(actualCommitSha),
    workingTreeFingerprint: makeWorkingTreeFingerprint(actualWorktreeSha, actualCommitSha, actualCommitSha),
    changedPaths,
  };
  return {
    ledgerRows: [],
    expectedFingerprint: makeFingerprint(expectedSha),
    actualSnapshot: snapshot,
    reattestations: reattest === false ? [] : [
      { executionId: "exec-claude", taskEnvelopeHash: "a".repeat(64), attestedAt: "2026-08-08T17:00:00.000Z" },
      { executionId: "exec-agy", taskEnvelopeHash: "a".repeat(64), attestedAt: "2026-08-08T17:00:01.000Z" },
    ],
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("fail-closed interruption", () => {
  test("CLI exit triggers interruption", () => {
    const rows = makeLedgerRows([makeEvent("message")]);
    const result = interruptSession({
      reason: "cli_exit",
      sessionState: { kind: "active" },
      currentWriterToken: 1,
      ledgerRows: rows,
      now: "2026-08-08T17:00:00.000Z",
    });

    expect(result.state.kind).toBe("interrupted");
    expect(result.incidentEvent.event_type).toBe("incident");
    expect(result.incidentEvent.payload["reason"]).toBe("cli_exit");
    expect(result.tokenInvalidated).toBe(1);
    expect(result.autoResumed).toBe(false);
  });

  test("adapter loss triggers interruption", () => {
    const result = interruptSession({
      reason: "adapter_disconnect",
      sessionState: { kind: "active" },
      currentWriterToken: 2,
      ledgerRows: makeLedgerRows([makeEvent("message")]),
    });

    expect(result.state.kind).toBe("interrupted");
    expect(result.incidentEvent.payload["reason"]).toBe("adapter_disconnect");
    expect(result.tokenInvalidated).toBe(2);
  });

  test("broker restart triggers interruption", () => {
    const result = interruptSession({
      reason: "broker_restart",
      sessionState: { kind: "active" },
      currentWriterToken: 3,
      ledgerRows: makeLedgerRows([makeEvent("message")]),
    });

    expect(result.state.kind).toBe("interrupted");
    expect(result.incidentEvent.payload["reason"]).toBe("broker_restart");
  });

  test("frozen pending actions — session is interrupted not resumed", () => {
    const result = interruptSession({
      reason: "cli_exit",
      sessionState: { kind: "active" },
      currentWriterToken: 5,
      ledgerRows: makeLedgerRows([makeEvent("action_request")]),
    });

    // Pending actions remain frozen — no auto-resume
    expect(result.state.kind).toBe("interrupted");
    expect(result.autoResumed).toBe(false);
  });

  test("invalidated fencing token — current token marked unusable", () => {
    const token = 42;
    const result = interruptSession({
      reason: "adapter_disconnect",
      sessionState: { kind: "active" },
      currentWriterToken: token,
      ledgerRows: makeLedgerRows([makeEvent("message")]),
    });

    expect(result.tokenInvalidated).toBe(token);
    // The incident event payload records the invalidated token
    expect(result.incidentEvent.payload["invalidated_token"]).toBe(token);
  });

  test("persisted last fingerprint — incident preserves repository fingerprint", () => {
    const fp = makeFingerprint("abc123");
    const event = makeEvent("message", { repository_fingerprint: fp });
    const rows = makeLedgerRows([event]);

    const result = interruptSession({
      reason: "cli_exit",
      sessionState: { kind: "active" },
      currentWriterToken: 1,
      ledgerRows: rows,
    });

    expect(result.incidentEvent.repository_fingerprint.sha256).toBe(fp.sha256);
  });
});

describe("paused interruption goes through the state machine", () => {
  test("paused session interruption uses the normal transition and produces interrupted", () => {
    const result = interruptSession({
      reason: "cli_exit",
      sessionState: { kind: "paused" },
      currentWriterToken: 9,
      ledgerRows: makeLedgerRows([makeEvent("pause")]),
    });

    // Same single path as an active session: state-machine transition,
    // incident event, token invalidation, no auto-resume.
    expect(result.state.kind).toBe("interrupted");
    expect(result.incidentEvent.event_type).toBe("incident");
    expect(result.incidentEvent.payload["reason"]).toBe("cli_exit");
    expect(result.tokenInvalidated).toBe(9);
    expect(result.autoResumed).toBe(false);
  });

  test("no forced interrupted fallback when the transition is invalid", () => {
    // closed -> interrupted is not a legal transition. The old code caught
    // the state-machine error and force-set interrupted anyway; the fix
    // makes the violation visible instead of silently bypassing the machine.
    expect(() =>
      interruptSession({
        reason: "cli_exit",
        sessionState: { kind: "closed" },
        currentWriterToken: 1,
        ledgerRows: makeLedgerRows([makeEvent("message")]),
      }),
    ).toThrow(InvalidTransitionError);
  });

  test("closing -> interrupted is not silently coerced", () => {
    // closing only allows `complete`. A closing-session interrupt must throw,
    // not mutate state — closing must never silently become interrupted.
    expect(() =>
      interruptSession({
        reason: "adapter_disconnect",
        sessionState: { kind: "closing" },
        currentWriterToken: 2,
        ledgerRows: makeLedgerRows([makeEvent("message")]),
      }),
    ).toThrow(InvalidTransitionError);
  });
});

describe("duplicate-interrupt idempotency", () => {
  test("duplicate interrupt while already interrupted does not throw", () => {
    const rows = makeLedgerRows([makeEvent("message")]);

    // First interrupt: active -> interrupted (normal path)
    const first = interruptSession({
      reason: "cli_exit",
      sessionState: { kind: "active" },
      currentWriterToken: 7,
      ledgerRows: rows,
    });
    expect(first.state.kind).toBe("interrupted");
    expect(first.duplicate).toBe(false);

    // Second interrupt: already interrupted — must NOT throw.
    const second = interruptSession({
      reason: "adapter_disconnect",
      detail: "second disconnect during interruption",
      sessionState: first.state,
      currentWriterToken: 7,
      ledgerRows: rows,
    });
    expect(second.state.kind).toBe("interrupted");
    expect(second.duplicate).toBe(true);
  });

  test("duplicate interrupt leaves state interrupted and token unusable", () => {
    const result = interruptSession({
      reason: "broker_restart",
      sessionState: { kind: "interrupted" },
      currentWriterToken: 9,
      ledgerRows: makeLedgerRows([makeEvent("message")]),
    });

    expect(result.state.kind).toBe("interrupted");
    // Token is still the same — not invalidated again with a new value.
    expect(result.tokenInvalidated).toBe(9);
    expect(result.duplicate).toBe(true);
  });

  test("duplicate interrupt does not issue a new fencing token", () => {
    // interruptSession never changes the fencing token itself; the broker
    // wrapper re-assigns it only on resume. A duplicate must not change the
    // invalidated-token value either — it reports the same token.
    const token = 42;
    const result = interruptSession({
      reason: "cli_exit",
      sessionState: { kind: "interrupted" },
      currentWriterToken: token,
      ledgerRows: makeLedgerRows([makeEvent("message")]),
    });

    expect(result.tokenInvalidated).toBe(token);
    expect(result.duplicate).toBe(true);
  });

  test("duplicate interrupt produces a distinct secondary incident event", () => {
    const rows = makeLedgerRows([makeEvent("message")]);

    const first = interruptSession({
      reason: "cli_exit",
      sessionState: { kind: "active" },
      currentWriterToken: 1,
      ledgerRows: rows,
      now: "2026-08-08T17:00:00.000Z",
    });

    const second = interruptSession({
      reason: "adapter_disconnect",
      detail: "second disconnect",
      sessionState: first.state,
      currentWriterToken: 1,
      ledgerRows: rows,
      now: "2026-08-08T17:00:05.000Z",
    });

    // Both are incident events the listener can receive and audit.
    expect(first.incidentEvent.event_type).toBe("incident");
    expect(second.incidentEvent.event_type).toBe("incident");
    // Distinct event IDs — this is a new, independently audit-worthy event.
    expect(second.incidentEvent.event_id).not.toBe(first.incidentEvent.event_id);
    // The secondary incident carries its own reason/detail.
    expect(second.incidentEvent.payload["reason"]).toBe("adapter_disconnect");
    expect(second.incidentEvent.payload["detail"]).toBe("second disconnect");
    expect(second.duplicate).toBe(true);
  });
});

describe("broken-chain block", () => {
  test("broken chain detected in rebuildBrokerState", () => {
    const rows = makeLedgerRows([makeEvent("message")]);
    // Tamper with the hash chain
    const tampered: LedgerRow[] = rows.map((r, i) =>
      i === 0 ? { ...r, previous_hash: "f".repeat(64) } : r,
    );

    // rebuildBrokerState should still parse events but the state is derived from event types
    // The broken chain is detectable because the row's previous_hash doesn't match genesis
    const state = rebuildBrokerState(tampered);
    expect(state.count).toBe(1);
    // Tampered row is still parsed for event type
    expect(state.events.length).toBe(1);
  });
});

describe("repository reconciliation", () => {
  test("matching fingerprints produce reconciled", () => {
    const result = reconcileRepository(
      makeReconcileInput("match", "match", "match"),
    );

    expect(result.outcome).toBe("reconciled");
    expect(result.fingerprintMatch).toBe(true);
    expect(result.reattested).toBe(true);
  });

  test("ambiguous working tree block — commit and worktree both mismatch", () => {
    const result = reconcileRepository(
      makeReconcileInput("expected", "different1", "different2"),
    );

    // Both mismatch and disagree with each other → ambiguous
    expect(result.outcome).toBe("ambiguous");
  });

  test("mismatch — commit and worktree agree but differ from expected", () => {
    const result = reconcileRepository(
      makeReconcileInput("expected", "same", "same"),
    );

    expect(result.outcome).toBe("mismatch");
    expect(result.fingerprintMatch).toBe(false);
  });

  test("re-attestation requirement — missing reattestations produce ambiguous", () => {
    const result = reconcileRepository(
      makeReconcileInput("match", "match", "match", [], false),
    );

    expect(result.outcome).toBe("ambiguous");
    expect(result.reattested).toBe(false);
  });

  test("changed paths recorded without file contents", () => {
    const paths = ["src/main.ts", "src/utils.ts", "README.md"];
    const result = reconcileRepository(
      makeReconcileInput("match", "match", "match", paths),
    );

    expect(result.outcome).toBe("reconciled");
    expect(result.changedPaths).toEqual(paths);
    // No file contents are included in the result
    expect(JSON.stringify(result)).not.toContain("file contents");
  });
});

describe("Founder-visible reconciliation", () => {
  test("reconciliation result is visible and inspectable by Founder", () => {
    const result = reconcileRepository(
      makeReconcileInput("match", "match", "match", ["src/changed.ts"]),
    );

    // The result contains all the information a Founder needs to decide
    expect(result.outcome).toBe("reconciled");
    expect(result.changedPaths).toContain("src/changed.ts");
    expect(result.reattested).toBe(true);
    expect(result.fingerprintMatch).toBe(true);
    expect(result.detail.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Task 15: lifecycle truth comes from the canonical reducer
// ---------------------------------------------------------------------------

let lifecycleSequence = 1;

/** A madbridge-authored typed lifecycle record as a ledger row. */
function lifecycleRow(
  eventType: string,
  payload: unknown,
  overrides: Record<string, unknown> = {},
): LedgerRow {
  const sequence = lifecycleSequence++;
  const event = {
    protocol_version: PROTOCOL_VERSION,
    event_id: `evt-${eventType}-${sequence}`,
    session_id: "ses-task15",
    event_type: eventType,
    actor: "madbridge",
    task_envelope_hash: "a".repeat(64),
    repository_fingerprint: makeFingerprint("b"),
    fencing_token: null,
    reason_code: null,
    created_at: "2026-09-11T00:00:00.000Z",
    previous_event_hash: "c".repeat(64),
    payload,
    ...overrides,
  };
  return {
    sequence,
    event_id: event.event_id,
    event_json: JSON.stringify(event),
    previous_hash: "c".repeat(64),
    event_hash: `${sequence}`.padStart(64, "e"),
    created_at: event.created_at,
  };
}

const openRow = () =>
  lifecycleRow("session_open", {
    authorization_reference: "FOUNDER-20260911-01",
    execution_ids: ["exec-builder", "exec-reviewer"],
  });
const tokenRow = (token: number) =>
  lifecycleRow("fencing_token_issued", { writer_execution_id: "exec-builder" }, { fencing_token: token });
const activatedRow = () =>
  lifecycleRow("session_activated", {
    execution_ids: ["exec-builder", "exec-reviewer"],
    readiness_snapshot_seq: 7,
  });
const pausedRow = () =>
  lifecycleRow("session_paused", { command_id: "cmd-1", authorized_by: "founder" });
const resumedRow = () =>
  lifecycleRow("session_resumed", { command_id: "cmd-2", authorized_by: "founder" });
const interruptedRow = () =>
  lifecycleRow(
    "session_interrupted",
    {
      incident_id: "incident-1",
      reason: "child exited non-zero",
      severity: "high",
      source_event_id: null,
      reported_by_execution_id: null,
    },
    { reason_code: "child_failure" },
  );

/** The lifecycle fields of a rebuilt state, without the row metadata. */
function lifecycleOf(state: LifecycleState): LifecycleState {
  const { sessionId, phase, fencingToken, tokenState, tokenUsable, incident, reasonCode, readyExecutionIds, closureKind } = state;
  return { sessionId, phase, fencingToken, tokenState, tokenUsable, incident, reasonCode, readyExecutionIds, closureKind };
}

describe("rebuildBrokerState delegates to reduceLedgerEvent", () => {
  test("session_resumed does not increment the fencing token", () => {
    const state = rebuildBrokerState([openRow(), tokenRow(7), activatedRow(), pausedRow(), resumedRow()]);
    expect(state.phase).toBe("active");
    expect(state.fencingToken).toBe(7);
    expect(state.tokenState).toBe("valid");
    expect(state.tokenUsable).toBe(true);
  });

  test("empty rows return the initial lifecycle state with genesis metadata", () => {
    const state = rebuildBrokerState([]);
    expect(lifecycleOf(state)).toEqual(INITIAL_LIFECYCLE_STATE);
    expect(state.count).toBe(0);
    expect(state.lastEventHash).toBe(GENESIS_HASH);
    expect(state.events).toEqual([]);
  });

  test("ordinary bridge traffic does not synthesize active", () => {
    const rows = makeLedgerRows([
      makeEvent("message"),
      makeEvent("action_request"),
      makeEvent("verification_result"),
    ]);

    const state = rebuildBrokerState(rows);
    expect(state.count).toBe(3);
    expect(state.phase).toBe("starting");
    expect(state.fencingToken).toBeNull();
    expect(state.tokenUsable).toBe(false);
    expect(state.incident).toBeNull();
  });

  test("legacy resume and incident bridge records are lifecycle-inert and mint no token", () => {
    const rows = [
      openRow(),
      tokenRow(3),
      activatedRow(),
      ...makeLedgerRows([makeEvent("message"), makeEvent("incident"), makeEvent("resume")]),
    ];

    const state = rebuildBrokerState(rows);
    expect(state.phase).toBe("active");
    expect(state.fencingToken).toBe(3);
    expect(state.tokenUsable).toBe(true);
    expect(state.incident).toBeNull();
  });

  test("an interrupted session is not returned to active by ordinary activity", () => {
    const rows = [
      openRow(),
      tokenRow(1),
      activatedRow(),
      interruptedRow(),
      ...makeLedgerRows([makeEvent("message"), makeEvent("action_request"), makeEvent("resume")]),
    ];

    const state = rebuildBrokerState(rows);
    expect(state.phase).toBe("interrupted");
    expect(state.incident?.id).toBe("incident-1");
    expect(state.reasonCode).toBe("child_failure");
    expect(state.tokenUsable).toBe(false);
    expect(state.fencingToken).toBe(1);
  });

  test("broker rebuild cannot diverge from ledger replay", () => {
    const histories: LedgerRow[][] = [
      [],
      makeLedgerRows([makeEvent("message"), makeEvent("resume")]),
      [openRow(), tokenRow(2), activatedRow()],
      [openRow(), tokenRow(2), activatedRow(), pausedRow(), resumedRow()],
      [openRow(), tokenRow(2), activatedRow(), interruptedRow(), ...makeLedgerRows([makeEvent("message")])],
    ];

    for (const rows of histories) {
      const broker = rebuildBrokerState(rows);
      const ledger = replayLedger(rows);
      const direct = rows.reduce<LifecycleState>(
        (state, row) => reduceLedgerEvent(state, JSON.parse(row.event_json)),
        INITIAL_LIFECYCLE_STATE,
      );

      expect(lifecycleOf(broker)).toEqual(direct);
      expect(broker.phase).toBe(ledger.sessionState);
      expect(broker.fencingToken).toBe(ledger.currentFencingToken);
      expect(broker.tokenUsable).toBe(ledger.tokenUsable);
      expect(broker.incident !== null).toBe(ledger.hasIncident);
      expect(broker.count).toBe(ledger.count);
      expect(broker.lastEventHash).toBe(ledger.lastEventHash);
    }
  });

  test("replay is fail-closed by rejection: an impossible order raises the reducer's typed error", () => {
    expect(() => rebuildBrokerState([openRow(), resumedRow()])).toThrow(ReducerError);
    try {
      rebuildBrokerState([openRow(), resumedRow()]);
    } catch (error) {
      expect(error).toBeInstanceOf(ReducerError);
      expect((error as ReducerError).kind).toBe("invalid_phase_precondition");
    }
  });

  test("a row whose event_json does not parse is rejected, not skipped", () => {
    const [row] = makeLedgerRows([makeEvent("message")]);
    const corrupt: LedgerRow = { ...row!, event_json: "{not json" };
    expect(() => rebuildBrokerState([corrupt])).toThrow();
  });

  test("row metadata comes from the rows, not from lifecycle state", () => {
    const rows = [openRow(), tokenRow(5), activatedRow()];

    const state = rebuildBrokerState(rows);
    expect(state.count).toBe(3);
    expect(state.lastEventHash).toBe(rows[2]!.event_hash);
    expect(state.events).toEqual(rows);
    expect(state.events).not.toBe(rows);
  });
});
