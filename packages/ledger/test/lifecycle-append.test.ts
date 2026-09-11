// packages/ledger/test/lifecycle-append.test.ts
// Phase 3A M6 Task 13: Ledger.append() accepts LedgerEventV1.
// Phase 3A M6 Task 14: Ledger.appendMany() writes the incident pair atomically.
//
// Specification section 9.6: both union members (BridgeEventV1 and
// SessionLifecycleEventV1) use the existing events table, sequence, canonical
// JSON, previous hash, event hash, and chain head. There is one chain and
// lifecycle truth lives on it. The incident pair uses an atomic multi-append
// transaction on that same chain (sections 9.3 and 9.6): no snapshot or
// callback between the two appends, both records or neither.
//
// The lifecycle fixtures below are fully typed SessionLifecycleEventV1 values
// with no cast.

import { expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { canonicalJson, PROTOCOL_VERSION } from "@madventures/protocol";
import type { LedgerEventV1, SessionLifecycleEventV1 } from "@madventures/protocol";
import { computeEventHash } from "../src/hash-chain";
import { SCHEMA_SQL } from "../src/schema";
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

function sessionInterrupted(
  overrides: { event_id?: string; previous_event_hash?: string; source_event_id?: string | null } = {},
): SessionLifecycleEventV1 {
  return {
    protocol_version: PROTOCOL_VERSION,
    event_id: overrides.event_id ?? crypto.randomUUID(),
    session_id: "sess-test-001",
    event_type: "session_interrupted",
    actor: "madbridge",
    task_envelope_hash: "a".repeat(64),
    repository_fingerprint: {
      kind: "commit",
      sha256: "b".repeat(64),
      git_sha: "c".repeat(40),
    },
    fencing_token: null,
    reason_code: "execution_reported_incident",
    created_at: "2026-08-08T16:00:02.000Z",
    previous_event_hash: overrides.previous_event_hash ?? "0".repeat(64),
    payload: {
      incident_id: "inc-test-001",
      reason: "execution reported an incident",
      severity: "high",
      source_event_id: overrides.source_event_id ?? null,
      reported_by_execution_id: "exec-claude",
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

// ---------------------------------------------------------------------------
// Task 14: appendMany() — the incident pair is indivisible.
// ---------------------------------------------------------------------------

test("appendMany writes both records or neither", () => {
  const ledger = testLedger();
  const existing = ledger.append(validEvent());
  const before = ledger.verify();
  expect(before).toEqual({ valid: true, count: 1, head: existing.event_hash });

  const incident = validEvent();
  // The second record collides with an already-persisted event_id, so the
  // batch cannot complete. Nothing from it may survive.
  const duplicate = sessionInterrupted({ event_id: existing.event_id, source_event_id: incident.event_id });

  // The failure must be the ledger's own uniqueness rejection, not a missing
  // method: a bare toThrow() would be satisfied by a TypeError.
  expect(() => ledger.appendMany([incident, duplicate])).toThrow(/UNIQUE constraint failed: events\.event_id/);

  const after = ledger.verify();
  expect(after).toEqual(before);
  const rows = ledger.readAfter(0);
  expect(rows).toHaveLength(1);
  expect(rows.map((r) => r.event_id)).toEqual([existing.event_id]);

  // Sequence state was not partially committed: the next single append takes
  // the sequence immediately after the pre-batch head, on the same chain.
  const next = ledger.append(validEvent());
  expect(next.sequence).toBe(2);
  expect(next.previous_hash).toBe(existing.event_hash);
  expect(ledger.verify()).toEqual({ valid: true, count: 2, head: next.event_hash });
});

test("appendMany chains hashes within the batch", () => {
  const ledger = testLedger();
  const batch: readonly LedgerEventV1[] = [validEvent(), sessionOpen(), sessionInterrupted()];

  const rows = ledger.appendMany(batch);

  expect(rows).toHaveLength(3);
  for (let i = 1; i < rows.length; i++) {
    const prev = rows[i - 1];
    const row = rows[i];
    expect(prev).toBeDefined();
    expect(row).toBeDefined();
    if (prev === undefined || row === undefined) return;
    expect(row.previous_hash).toBe(prev.event_hash);
    expect(row.sequence).toBe(prev.sequence + 1);
  }
  expect(ledger.verify()).toMatchObject({ valid: true, count: 3 });
});

test("appendMany appends the incident and its derived lifecycle record atomically", () => {
  const ledger = testLedger();
  const incident = validEvent();
  const interrupted = sessionInterrupted({ source_event_id: incident.event_id });

  const [row1, row2] = ledger.appendMany([incident, interrupted]);

  expect(row1).toBeDefined();
  expect(row2).toBeDefined();
  if (row1 === undefined || row2 === undefined) return;
  expect(row1.event_id).toBe(incident.event_id);
  expect(row2.event_id).toBe(interrupted.event_id);
  expect(row2.previous_hash).toBe(row1.event_hash);

  const persisted = ledger.readAfter(0);
  expect(persisted).toHaveLength(2);
  expect(persisted.map((r) => r.event_id)).toEqual([incident.event_id, interrupted.event_id]);
  const stored = persisted[1];
  expect(stored).toBeDefined();
  if (stored === undefined) return;
  const parsed = JSON.parse(stored.event_json) as SessionLifecycleEventV1;
  expect(parsed.event_type).toBe("session_interrupted");
  expect(ledger.verify()).toEqual({ valid: true, count: 2, head: row2.event_hash });
});

test("appendMany chains the first record from the pre-batch head and moves the head to the last record", () => {
  const ledger = testLedger();
  const preBatch = ledger.append(validEvent());
  const eventA = validEvent();
  const eventB = sessionInterrupted({ source_event_id: eventA.event_id });

  const [rowA, rowB] = ledger.appendMany([eventA, eventB]);

  expect(rowA).toBeDefined();
  expect(rowB).toBeDefined();
  if (rowA === undefined || rowB === undefined) return;
  // eventA chains from the pre-batch chain head.
  expect(rowA.previous_hash).toBe(preBatch.event_hash);
  expect(rowA.event_hash).toBe(computeEventHash(preBatch.event_hash, canonicalJson(eventA)));
  // eventB chains from eventA, using the existing hash-chain computation.
  expect(rowB.previous_hash).toBe(rowA.event_hash);
  expect(rowB.event_hash).toBe(computeEventHash(rowA.event_hash, canonicalJson(eventB)));
  // The final chain head is eventB's hash, and the head sequence advanced by
  // exactly the batch size.
  expect(ledger.verify()).toEqual({ valid: true, count: 3, head: rowB.event_hash });
  const next = ledger.append(validEvent());
  expect(next.sequence).toBe(4);
  expect(next.previous_hash).toBe(rowB.event_hash);
});

test("appendMany returns rows in input order", () => {
  const ledger = testLedger();
  const events = [validEvent(), sessionOpen(), validEvent(), sessionInterrupted()];

  const rows = ledger.appendMany(events);

  expect(rows.map((r) => r.event_id)).toEqual(events.map((e) => e.event_id));
  expect(rows.map((r) => r.sequence)).toEqual([1, 2, 3, 4]);
  expect(ledger.readAfter(0).map((r) => r.event_id)).toEqual(events.map((e) => e.event_id));
});

test("appendMany with an empty batch writes nothing and leaves the head unchanged", () => {
  const ledger = testLedger();
  const existing = ledger.append(validEvent());

  const rows = ledger.appendMany([]);

  expect(rows).toEqual([]);
  expect(ledger.verify()).toEqual({ valid: true, count: 1, head: existing.event_hash });
});

test("single append still works alongside appendMany on the same chain", () => {
  const ledger = testLedger();
  const first = ledger.append(validEvent());
  const [second, third] = ledger.appendMany([validEvent(), sessionInterrupted()]);
  const fourth = ledger.append(sessionOpen());

  expect(second).toBeDefined();
  expect(third).toBeDefined();
  if (second === undefined || third === undefined) return;
  expect(second.previous_hash).toBe(first.event_hash);
  expect(fourth.previous_hash).toBe(third.event_hash);
  expect(fourth.sequence).toBe(4);
  expect(ledger.verify()).toEqual({ valid: true, count: 4, head: fourth.event_hash });
});

test("the schema adds exactly one index, idx_events_created_at on events(created_at)", () => {
  const db = new Database(":memory:");
  db.run(SCHEMA_SQL);

  const indexes = db
    .query("SELECT name, tbl_name, sql FROM sqlite_master WHERE type = 'index' AND sql IS NOT NULL ORDER BY name")
    .all() as Array<{ name: string; tbl_name: string; sql: string }>;
  expect(indexes.map((i) => i.name)).toEqual(["idx_events_created_at"]);
  const index = indexes[0];
  expect(index).toBeDefined();
  if (index === undefined) return;
  expect(index.tbl_name).toBe("events");
  expect(index.sql.replace(/\s+/g, " ")).toContain("ON events(created_at)");

  // Still one events table and one chain head: no second store, no second chain.
  const tables = db
    .query("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
    .all() as Array<{ name: string }>;
  expect(tables.map((t) => t.name)).toEqual(["chain_head", "events"]);
  db.close();
});
