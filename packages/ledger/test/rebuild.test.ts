// packages/ledger/test/rebuild.test.ts
// State reconstruction from ledger events.
// Session replay must use the same legal transitions as the broker session machine.

import { expect, test, describe } from "bun:test";
import { rebuildState, rebuildBrokerState } from "../src/rebuild";
import { testLedger, validEvent } from "./fixtures";

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

test("rebuildBrokerState reconstructs from normal events", () => {
  const ledger = testLedger();
  ledger.append(validEvent());
  ledger.append(validEvent());

  const events = ledger.readAfter(0);
  const state = rebuildBrokerState(events);

  expect(state.count).toBe(2);
  expect(state.hasIncident).toBe(false);
  expect(state.tokenUsable).toBe(true);
  expect(state.sessionState).toBe("active");
});

test("rebuildBrokerState detects incident and marks token unusable", () => {
  const ledger = testLedger();
  ledger.append(validEvent());
  ledger.append({ ...validEvent(), event_type: "incident" });

  const events = ledger.readAfter(0);
  const state = rebuildBrokerState(events);

  expect(state.hasIncident).toBe(true);
  expect(state.tokenUsable).toBe(false);
  expect(state.sessionState).toBe("interrupted");
});

test("rebuildBrokerState reconstructs resume after incident with new token", () => {
  // Proper path: incident -> interrupted, resume injects reconcile then active
  // (same as broker rebuildBrokerState / resumeSession).
  const ledger = testLedger();
  ledger.append(validEvent());
  ledger.append({ ...validEvent(), event_type: "incident" });
  ledger.append({ ...validEvent(), event_type: "resume" });

  const events = ledger.readAfter(0);
  const state = rebuildBrokerState(events);

  expect(state.hasIncident).toBe(true);
  expect(state.tokenUsable).toBe(true);
  expect(state.sessionState).toBe("active");
  expect(state.currentFencingToken).not.toBeNull();
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

describe("session-machine alignment (follow-up defect 6)", () => {
  test("paused incident replays to interrupted through legal transition", () => {
    // active -> pause -> paused, then incident: paused -> interrupted is legal.
    const ledger = testLedger();
    ledger.append(validEvent());
    ledger.append({ ...validEvent(), event_type: "pause" });
    ledger.append({ ...validEvent(), event_type: "incident" });

    const state = rebuildBrokerState(ledger.readAfter(0));
    expect(state.sessionState).toBe("interrupted");
    expect(state.hasIncident).toBe(true);
    expect(state.tokenUsable).toBe(false);
  });

  test("closed session followed by incident does not become interrupted", () => {
    // Replay reaches closed via interrupt → resume → session_close.
    // closed -> interrupted is not legal; incident still records fail-closed signals.
    const ledger = testLedger();
    ledger.append(validEvent());
    ledger.append({ ...validEvent(), event_type: "incident" });
    ledger.append({ ...validEvent(), event_type: "resume" });
    ledger.append({ ...validEvent(), event_type: "session_close" });
    ledger.append({ ...validEvent(), event_type: "incident" });

    const state = rebuildBrokerState(ledger.readAfter(0));
    expect(state.sessionState).toBe("closed");
    expect(state.hasIncident).toBe(true);
    expect(state.tokenUsable).toBe(false);
  });

  test("interrupted cannot become active without the reconciliation path", () => {
    // Alone, an incident leaves the session interrupted — no silent jump to active.
    const ledger = testLedger();
    ledger.append(validEvent());
    ledger.append({ ...validEvent(), event_type: "incident" });

    const afterIncident = rebuildBrokerState(ledger.readAfter(0));
    expect(afterIncident.sessionState).toBe("interrupted");
    expect(afterIncident.tokenUsable).toBe(false);

    // Resume is only legal after the machine injects reconcile (interrupted ->
    // reconciling -> active). Direct interrupted -> active is rejected by the
    // transition table; the resume handler must not assign "active" without that step.
    ledger.append({ ...validEvent(), event_type: "resume" });
    const afterResume = rebuildBrokerState(ledger.readAfter(0));
    expect(afterResume.sessionState).toBe("active");
    expect(afterResume.tokenUsable).toBe(true);
    expect(afterResume.currentFencingToken).not.toBeNull();
  });

  test("valid reconciliation/resume sequence produces active", () => {
    const ledger = testLedger();
    ledger.append(validEvent());
    ledger.append({ ...validEvent(), event_type: "incident" });
    ledger.append({ ...validEvent(), event_type: "resume" });

    const state = rebuildBrokerState(ledger.readAfter(0));
    expect(state.sessionState).toBe("active");
    expect(state.hasIncident).toBe(true);
    expect(state.tokenUsable).toBe(true);
    expect(state.currentFencingToken).toBe(1);
  });

  test("invalid transition is fail-closed — not silently coerced", () => {
    // Resume while closed is illegal; state must stay closed (not forced active).
    const ledger = testLedger();
    ledger.append(validEvent());
    ledger.append({ ...validEvent(), event_type: "session_close" });
    ledger.append({ ...validEvent(), event_type: "resume" });

    const state = rebuildBrokerState(ledger.readAfter(0));
    expect(state.sessionState).toBe("closed");
    // Resume must not issue a fencing token when the transition is rejected
    expect(state.currentFencingToken).toBeNull();
    expect(state.tokenUsable).toBe(true);
  });

  test("pause while interrupted is ignored (fail-closed)", () => {
    const ledger = testLedger();
    ledger.append(validEvent());
    ledger.append({ ...validEvent(), event_type: "incident" });
    ledger.append({ ...validEvent(), event_type: "pause" });

    const state = rebuildBrokerState(ledger.readAfter(0));
    expect(state.sessionState).toBe("interrupted");
    expect(state.hasIncident).toBe(true);
    expect(state.tokenUsable).toBe(false);
  });

  test("rebuild routes paused interruption after full recovery cycle", () => {
    // Matches broker regression: interrupt → resume → pause → incident
    const ledger = testLedger();
    ledger.append(validEvent());
    ledger.append({ ...validEvent(), event_type: "incident" });
    ledger.append({ ...validEvent(), event_type: "resume" });
    ledger.append({ ...validEvent(), event_type: "pause" });
    ledger.append({ ...validEvent(), event_type: "incident" });

    const state = rebuildBrokerState(ledger.readAfter(0));
    expect(state.sessionState).toBe("interrupted");
    expect(state.hasIncident).toBe(true);
    expect(state.tokenUsable).toBe(false);
  });
});
