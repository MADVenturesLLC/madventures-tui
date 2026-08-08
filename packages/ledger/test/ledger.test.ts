// packages/ledger/test/ledger.test.ts
// Ledger atomicity and tamper-evidence tests.

import { expect, test } from "bun:test";
import { testLedger, validEvent } from "./fixtures";
import type { BridgeEventV1 } from "@madventures/protocol";

test("append advances event and chain head in one transaction", () => {
  const ledger = testLedger();
  const row = ledger.append(validEvent());
  expect(ledger.verify()).toEqual({ valid: true, count: 1, head: row.event_hash });
});

test("modified payload breaks complete-chain verification", () => {
  const ledger = testLedger();
  ledger.append(validEvent());
  ledger.unsafeTestOnlyMutatePayload(1, '{"changed":true}');
  expect(ledger.verify()).toMatchObject({ valid: false, brokenSequence: 1 });
});

test("multiple appends maintain chain integrity", () => {
  const ledger = testLedger();
  const e1 = ledger.append(validEvent());
  const e2 = ledger.append(validEventWithHash(e1.event_hash));
  const e3 = ledger.append(validEventWithHash(e2.event_hash));
  const result = ledger.verify();
  expect(result).toMatchObject({ valid: true, count: 3 });
  expect(result.head).toBe(e3.event_hash);
});

test("readAfter returns events after a given sequence number", () => {
  const ledger = testLedger();
  ledger.append(validEvent());
  ledger.append(validEvent());
  ledger.append(validEvent());
  const after1 = ledger.readAfter(1);
  expect(after1).toHaveLength(2);
  const after0 = ledger.readAfter(0);
  expect(after0).toHaveLength(3);
});

test("empty ledger verifies as valid with zero count", () => {
  const ledger = testLedger();
  expect(ledger.verify()).toEqual({ valid: true, count: 0, head: "0".repeat(64) });
});

function validEventWithHash(prevHash: string): BridgeEventV1 {
  return { ...validEvent(), previous_event_hash: prevHash };
}