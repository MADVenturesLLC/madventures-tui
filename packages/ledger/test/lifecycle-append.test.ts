// packages/ledger/test/lifecycle-append.test.ts
// Phase 3A M6 Task 13: Ledger.append() accepts LedgerEventV1.
//
// Specification section 9.6: both union members (BridgeEventV1 and
// SessionLifecycleEventV1) use the existing events table, sequence, canonical
// JSON, previous hash, event hash, and chain head. There is one chain and
// lifecycle truth lives on it.
//
// The lifecycle fixture below is a fully typed SessionLifecycleEventV1 with no
// cast. While append() is still typed BridgeEventV1 this file fails
// `bunx tsc --noEmit` — that typecheck rejection is the Task 13 RED.

import { expect, test } from "bun:test";
import { PROTOCOL_VERSION } from "@madventures/protocol";
import type { SessionLifecycleEventV1 } from "@madventures/protocol";
import { Ledger } from "../src/ledger";
import { testLedger, validEvent } from "./fixtures";

function sessionOpen(overrides: { event_id?: string; previous_event_hash?: string } = {}): SessionLifecycleEventV1 {
  return {
    protocol_version: PROTOCOL_VERSION,
    event_id: overrides.event_id ?? crypto.randomUUID(),
    session_id: "sess-test-001",
    event_type: "session_open",
    actor: "madbridge",
    task_envelope_hash: "a".repeat(64),
    repository_fingerprint: {
      kind: "commit",
      sha256: "b".repeat(64),
      git_sha: "c".repeat(40),
    },
    fencing_token: null,
    reason_code: null,
    created_at: "2026-08-08T16:00:01.000Z",
    previous_event_hash: overrides.previous_event_hash ?? "0".repeat(64),
    payload: {
      authorization_reference: "FOUNDER-20260904-01",
      execution_ids: ["exec-claude", "exec-agy"],
    },
  };
}

test("a lifecycle record appends onto the same chain as a bridge event", () => {
  const ledger = testLedger();
  const row1 = ledger.append(validEvent());
  const row2 = ledger.append(sessionOpen({ previous_event_hash: row1.event_hash }));

  const result = ledger.verify();
  expect(result.valid).toBe(true);
  expect(result.count).toBe(2);
  expect(row2.previous_hash).toBe(row1.event_hash);
  expect(result.head).toBe(row2.event_hash);
});

test("bridge event append behavior is unchanged by the widened signature", () => {
  const ledger = testLedger();
  const row = ledger.append(validEvent());
  expect(row.sequence).toBe(1);
  expect(ledger.verify()).toEqual({ valid: true, count: 1, head: row.event_hash });
});

test("a persisted lifecycle row reads back with its typed fields intact", () => {
  const ledger = testLedger();
  const event = sessionOpen({ event_id: "evt-session-open-readback" });
  const written = ledger.append(event);

  const rows = ledger.readAfter(0);
  expect(rows).toHaveLength(1);
  const stored = rows[0];
  expect(stored).toBeDefined();
  if (stored === undefined) return;

  expect(stored.sequence).toBe(written.sequence);
  expect(stored.event_id).toBe("evt-session-open-readback");
  expect(stored.event_hash).toBe(written.event_hash);
  expect(stored.previous_hash).toBe(written.previous_hash);
  expect(stored.created_at).toBe(event.created_at);

  const parsed = JSON.parse(stored.event_json) as SessionLifecycleEventV1;
  expect(parsed.event_type).toBe("session_open");
  expect(parsed.actor).toBe("madbridge");
  expect(parsed.session_id).toBe(event.session_id);
  expect(parsed.payload).toEqual(event.payload);
});

test("bridge and lifecycle records share one monotonically linked chain", () => {
  const ledger = testLedger();
  const bridge = ledger.append(validEvent());
  const open = ledger.append(sessionOpen({ previous_event_hash: bridge.event_hash }));

  expect(bridge.sequence).toBe(1);
  expect(open.sequence).toBe(2);
  expect(open.previous_hash).toBe(bridge.event_hash);

  const result = ledger.verify();
  expect(result).toMatchObject({ valid: true, count: 2 });
  expect(result.head).toBe(open.event_hash);
});

test("interleaved bridge and lifecycle records stay on the same chain", () => {
  const ledger = testLedger();
  const rows = [
    ledger.append(validEvent()),
    ledger.append(sessionOpen()),
    ledger.append(validEvent()),
    ledger.append(sessionOpen()),
    ledger.append(validEvent()),
  ];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    expect(row).toBeDefined();
    if (row === undefined) return;
    expect(row.sequence).toBe(i + 1);
    if (i > 0) {
      const prev = rows[i - 1];
      expect(prev).toBeDefined();
      if (prev === undefined) return;
      expect(row.previous_hash).toBe(prev.event_hash);
    }
  }

  const result = ledger.verify();
  expect(result).toMatchObject({ valid: true, count: 5 });
  const last = rows[rows.length - 1];
  expect(last).toBeDefined();
  if (last === undefined) return;
  expect(result.head).toBe(last.event_hash);
  expect(ledger.readAfter(0)).toHaveLength(5);
});

test("appendMany is not present on the Ledger (Task 14 not started)", () => {
  const ledger = testLedger();
  const prototypeMethods = Object.getOwnPropertyNames(Ledger.prototype);
  expect(prototypeMethods).not.toContain("appendMany");
  expect(Object.getOwnPropertyNames(ledger)).not.toContain("appendMany");
});
