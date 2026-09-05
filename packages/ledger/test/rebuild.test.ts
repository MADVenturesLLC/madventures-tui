// packages/ledger/test/rebuild.test.ts
// State reconstruction from ledger events.
//
// Phase 3A: replay is a fold of the single reduceLedgerEvent. Ordinary
// BridgeEventV1 traffic is lifecycle-inert — it never changes phase, incident,
// or fencing state. Typed SessionLifecycleEventV1 records are the only source
// of lifecycle change, and `"reconciling"` is not a Phase 3A phase.

import { expect, test, describe } from "bun:test";
import { rebuildState, rebuildBrokerState, ReducerError } from "../src/rebuild";
import type { LedgerRow } from "../src/ledger";
import { testLedger, validEvent } from "./fixtures";

// ─── Local lifecycle row helper ───
//
// Task 12 tests construct LedgerRow values directly. Ledger.append() still
// takes BridgeEventV1; widening it to LedgerEventV1 is M6 and is not done here.
// This helper only exercises replay/reducer behavior and proves nothing about
// persistence or append-chain support.

let nextSequence = 1;

function lifecycleRow(
  eventType: string,
  payload: unknown,
  overrides: Record<string, unknown> = {},
): LedgerRow {
  const sequence = nextSequence++;
  const event = {
    protocol_version: "madbridge-protocol/v1",
    event_id: `evt-${eventType}-${sequence}`,
    session_id: "ses-1",
    event_type: eventType,
    actor: "madbridge",
    task_envelope_hash: "a".repeat(64),
    repository_fingerprint: { kind: "commit", sha256: "a".repeat(64), git_sha: "b".repeat(40) },
    fencing_token: null,
    reason_code: null,
    created_at: "2026-09-04T00:00:00.000Z",
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
    authorization_reference: "FOUNDER-20260904-01",
    execution_ids: ["exec-builder", "exec-reviewer"],
  });
const tokenRow = () =>
  lifecycleRow("fencing_token_issued", { writer_execution_id: "exec-builder" }, { fencing_token: 1 });
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

/** The typed ReducerError kind replay raises for a history, or "<accepted>". */
function replayFailureOf(rows: readonly LedgerRow[]): string {
  try {
    rebuildBrokerState(rows);
    return "<accepted>";
  } catch (error) {
    return error instanceof ReducerError ? error.kind : `<${String(error)}>`;
  }
}

// ─── rebuildState ───

test("rebuildState reconstructs from verified events", () => {
  const ledger = testLedger();
  ledger.append(validEvent());
  ledger.append(validEvent());

  const events = ledger.readAfter(0);
  const state = rebuildState(events);

  expect(state.count).toBe(2);
  expect(state.lastEventHash).toBe(events[1]?.event_hash ?? "0".repeat(64));
});

test("rebuildState on empty events returns zero count", () => {
  const state = rebuildState([]);
  expect(state.count).toBe(0);
  expect(state.lastEventHash).toBe("0".repeat(64));
});

test("rebuildBrokerState on empty events returns starting state", () => {
  const state = rebuildBrokerState([]);
  expect(state.count).toBe(0);
  expect(state.sessionState).toBe("starting");
  expect(state.tokenUsable).toBe(false);
  expect(state.currentFencingToken).toBeNull();
});

// ─── Category A: ordinary BridgeEvent history is lifecycle-inert ───

test("rebuildBrokerState leaves ordinary events lifecycle-inert", () => {
  // Was: "reconstructs from normal events", which asserted that the first
  // ordinary event synthesized `active`. Phase 3A synthesizes nothing.
  const ledger = testLedger();
  ledger.append(validEvent());
  ledger.append(validEvent());

  const events = ledger.readAfter(0);
  const state = rebuildBrokerState(events);

  expect(state.count).toBe(2);
  expect(state.hasIncident).toBe(false);
  expect(state.tokenUsable).toBe(false);
  expect(state.sessionState).toBe("starting");
});

test("a legacy incident BridgeEvent does not mark an incident or disturb the token", () => {
  // Was: "detects incident and marks token unusable". Only session_interrupted
  // populates the incident; a published execution incident is evidence of who
  // reported the problem, not lifecycle state.
  const ledger = testLedger();
  ledger.append(validEvent());
  ledger.append({ ...validEvent(), event_type: "incident" });

  const state = rebuildBrokerState(ledger.readAfter(0));

  expect(state.hasIncident).toBe(false);
  expect(state.sessionState).toBe("starting");
  expect(state.tokenUsable).toBe(false);
});

test("legacy pause and resume BridgeEvents do not move the lifecycle phase", () => {
  // Was: "reconstructs resume after incident with new token". Legacy
  // execution-authored pause/resume are historical data only.
  const ledger = testLedger();
  ledger.append(validEvent());
  ledger.append({ ...validEvent(), event_type: "pause" });
  ledger.append({ ...validEvent(), event_type: "resume" });

  const state = rebuildBrokerState(ledger.readAfter(0));

  expect(state.sessionState).toBe("starting");
  expect(state.currentFencingToken).toBeNull();
  expect(state.hasIncident).toBe(false);
});

test("a legacy session_close BridgeEvent does not close the session", () => {
  const ledger = testLedger();
  ledger.append(validEvent());
  ledger.append({ ...validEvent(), event_type: "session_close" });

  const state = rebuildBrokerState(ledger.readAfter(0));

  expect(state.sessionState).toBe("starting");
  expect(state.sessionState).not.toBe("closed");
});

test("ordinary traffic interleaved with lifecycle records changes nothing extra", () => {
  const ledger = testLedger();
  ledger.append(validEvent());
  ledger.append({ ...validEvent(), event_type: "incident" });
  const bridgeRows = ledger.readAfter(0);

  const withoutTraffic = rebuildBrokerState([openRow(), tokenRow(), activatedRow()]);
  const withTraffic = rebuildBrokerState([
    openRow(),
    tokenRow(),
    ...bridgeRows,
    activatedRow(),
    ...bridgeRows,
  ]);

  expect(withTraffic.sessionState).toBe(withoutTraffic.sessionState);
  expect(withTraffic.hasIncident).toBe(withoutTraffic.hasIncident);
  expect(withTraffic.currentFencingToken).toBe(withoutTraffic.currentFencingToken);
  expect(withTraffic.tokenUsable).toBe(withoutTraffic.tokenUsable);
});

test("rebuildBrokerState persists last fingerprint from events", () => {
  const ledger = testLedger();
  const evt1 = validEvent();
  ledger.append(evt1);
  const evt2 = { ...validEvent(), repository_fingerprint: { ...evt1.repository_fingerprint, sha256: "d".repeat(64) } };
  ledger.append(evt2);

  const events = ledger.readAfter(0);
  const state = rebuildBrokerState(events);

  expect(state.lastFingerprint?.sha256).toBe("d".repeat(64));
});

// ─── Category B: typed lifecycle replay ───

describe("typed lifecycle replay (Phase 3A)", () => {
  test("typed activation replays to active with a valid token", () => {
    const state = rebuildBrokerState([openRow(), tokenRow(), activatedRow()]);
    expect(state.sessionState).toBe("active");
    expect(state.currentFencingToken).toBe(1);
    expect(state.tokenUsable).toBe(true);
  });

  test("paused interruption replays to interrupted through the typed record", () => {
    // Was: "paused incident replays to interrupted through legal transition",
    // driven by an ordinary `incident` after an ordinary `pause`.
    const state = rebuildBrokerState([
      openRow(),
      tokenRow(),
      activatedRow(),
      pausedRow(),
      interruptedRow(),
    ]);
    expect(state.sessionState).toBe("interrupted");
    expect(state.hasIncident).toBe(true);
    expect(state.tokenUsable).toBe(false);
  });

  test("a closed session is not reopened by a later interruption record", () => {
    // Was: "closed session followed by incident does not become interrupted".
    // Phase 3A rejects the out-of-phase lifecycle record fail-closed, and the
    // rejection is a typed replay failure rather than a silent skip.
    const closing = lifecycleRow("session_closing", {
      command_id: "cmd-4",
      authorized_by: "founder",
      closure_kind: "founder",
      incident_id: null,
    });
    const closed = lifecycleRow("session_closed", {
      command_id: "cmd-4",
      authorized_by: "founder",
      closure_kind: "founder",
      incident_id: null,
    });
    const prefix = [openRow(), tokenRow(), activatedRow(), closing, closed];

    const state = rebuildBrokerState(prefix);
    expect(state.sessionState).toBe("closed");
    expect(state.tokenUsable).toBe(false);

    expect(replayFailureOf([...prefix, interruptedRow()])).toBe("invalid_phase_precondition");
  });

  test("interrupted does not become active again without a typed transition", () => {
    // Was: "interrupted cannot become active without the reconciliation path",
    // which relied on interrupted -> reconciling -> active. `"reconciling"` is
    // not a Phase 3A phase, and session_resumed is legal only from paused.
    const interrupted = rebuildBrokerState([
      openRow(),
      tokenRow(),
      activatedRow(),
      interruptedRow(),
    ]);
    expect(interrupted.sessionState).toBe("interrupted");
    expect(interrupted.tokenUsable).toBe(false);

    expect(String(interrupted.sessionState)).not.toBe("reconciling");

    // session_resumed is legal only from paused. Replaying it over interrupted
    // rejects the history rather than leaving the projection where it was.
    expect(
      replayFailureOf([
        openRow(),
        tokenRow(),
        activatedRow(),
        interruptedRow(),
        resumedRow(),
      ]),
    ).toBe("invalid_phase_precondition");
  });

  test("pause and resume replay to active only through the typed records", () => {
    // Was: "valid reconciliation/resume sequence produces active".
    const state = rebuildBrokerState([
      openRow(),
      tokenRow(),
      activatedRow(),
      pausedRow(),
      resumedRow(),
    ]);
    expect(state.sessionState).toBe("active");
    expect(state.currentFencingToken).toBe(1);
    expect(state.tokenUsable).toBe(true);
  });

  test("an illegal typed transition is fail-closed, not silently coerced", () => {
    // Was: "invalid transition is fail-closed — not silently coerced", driven by
    // an ordinary resume while closed. A session_closed with no preceding
    // session_closing is an impossible order; replay preserves the projection.
    const closed = lifecycleRow("session_closed", {
      command_id: "cmd-4",
      authorized_by: "founder",
      closure_kind: "founder",
      incident_id: null,
    });
    const prefix = [openRow(), tokenRow(), activatedRow()];

    const state = rebuildBrokerState(prefix);
    expect(state.sessionState).toBe("active");
    expect(state.sessionState).not.toBe("closed");

    expect(replayFailureOf([...prefix, closed])).toBe("impossible_order");
  });

  test("pause while interrupted is rejected (fail-closed)", () => {
    // Was: "pause while interrupted is ignored (fail-closed)". Ignoring it is
    // exactly what section 9.6 forbids: the replay is rejected, typed.
    const prefix = [openRow(), tokenRow(), activatedRow(), interruptedRow()];

    const state = rebuildBrokerState(prefix);
    expect(state.sessionState).toBe("interrupted");
    expect(state.hasIncident).toBe(true);
    expect(state.tokenUsable).toBe(false);

    expect(replayFailureOf([...prefix, pausedRow()])).toBe("invalid_phase_precondition");
  });

  test("replay routes a paused interruption after a full recovery cycle", () => {
    // Was: "rebuild routes paused interruption after full recovery cycle",
    // driven by interrupt -> resume -> pause -> incident via ordinary events.
    const state = rebuildBrokerState([
      openRow(),
      tokenRow(),
      activatedRow(),
      pausedRow(),
      resumedRow(),
      pausedRow(),
      interruptedRow(),
    ]);
    expect(state.sessionState).toBe("interrupted");
    expect(state.hasIncident).toBe(true);
    expect(state.tokenUsable).toBe(false);
  });
});

// ─── Category C: replay surfaces typed lifecycle failures ───
//
// Section 9.6 names four typed reconciliation failures and makes them binding
// in replay as well as live apply. Replay must therefore reject an illegal
// history with the same typed error the reducer raises — it must not preserve
// the prior projection and carry on as though the record were absent.

describe("replay propagates typed reducer failures", () => {
  test("replay propagates unknown_lifecycle_type", () => {
    const unknown = lifecycleRow("session_teleported", { anything: true });
    expect(replayFailureOf([openRow(), tokenRow(), activatedRow(), unknown])).toBe(
      "unknown_lifecycle_type",
    );
  });

  test("replay propagates impossible_order", () => {
    // session_unclean_closure requires no typed terminal prefix; a completed
    // founder close is exactly such a prefix.
    const closing = lifecycleRow("session_closing", {
      command_id: "cmd-4",
      authorized_by: "founder",
      closure_kind: "founder",
      incident_id: null,
    });
    const closed = lifecycleRow("session_closed", {
      command_id: "cmd-4",
      authorized_by: "founder",
      closure_kind: "founder",
      incident_id: null,
    });
    const unclean = lifecycleRow("session_unclean_closure", {
      detected_at_startup: true,
      last_durable_event_id: "evt-last",
    });
    expect(
      replayFailureOf([openRow(), tokenRow(), activatedRow(), closing, closed, unclean]),
    ).toBe("impossible_order");
  });

  test("replay propagates incident_id_mismatch", () => {
    // Both throw sites are covered: the closure record and the terminal
    // record. An interruption close must name the incident it is closing, and
    // replay rejects a history that names a different one.
    const interruptedPrefix = [openRow(), tokenRow(), activatedRow(), interruptedRow()];

    const closingFor = (incidentId: string) =>
      lifecycleRow("session_closing", {
        command_id: "cmd-5",
        authorized_by: "founder",
        closure_kind: "interruption",
        incident_id: incidentId,
      });
    const closedFor = (incidentId: string) =>
      lifecycleRow("session_closed", {
        command_id: "cmd-5",
        authorized_by: "founder",
        closure_kind: "interruption",
        incident_id: incidentId,
      });

    // The legal prefix establishes the open incident.
    const opened = rebuildBrokerState(interruptedPrefix);
    expect(opened.sessionState).toBe("interrupted");
    expect(opened.hasIncident).toBe(true);

    // The matching incident id closes cleanly, so the rejections below are
    // caused by the mismatch itself and not by the closing records.
    const legal = rebuildBrokerState([
      ...interruptedPrefix,
      closingFor("incident-1"),
      closedFor("incident-1"),
    ]);
    expect(legal.sessionState).toBe("closed");

    // Mismatch at the closure record.
    expect(replayFailureOf([...interruptedPrefix, closingFor("incident-999")])).toBe(
      "incident_id_mismatch",
    );

    // Mismatch at the terminal record, after a legal closure.
    expect(
      replayFailureOf([
        ...interruptedPrefix,
        closingFor("incident-1"),
        closedFor("incident-999"),
      ]),
    ).toBe("incident_id_mismatch");
  });
});
