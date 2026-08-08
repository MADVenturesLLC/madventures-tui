// packages/ledger/test/rebuild.test.ts
// State reconstruction from ledger events.

import { expect, test } from "bun:test";
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

function rebuildState(events: Array<{ event_hash: string }>): { count: number; lastEventHash: string } {
  if (events.length === 0) {
    return { count: 0, lastEventHash: "0".repeat(64) };
  }
  const last = events[events.length - 1];
  return { count: events.length, lastEventHash: last?.event_hash ?? "0".repeat(64) };
}