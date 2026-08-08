// packages/ledger/test/rebuild.test.ts
// State reconstruction from ledger events.

import { expect, test } from "bun:test";
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
