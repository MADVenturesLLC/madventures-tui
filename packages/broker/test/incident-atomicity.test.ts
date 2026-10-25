import { afterEach, expect, test } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { GENESIS_HASH, INITIAL_LIFECYCLE_STATE, Ledger, computeEventHash, reduceLedgerEvent } from "@madventures/ledger";
import { PROTOCOL_VERSION, canonicalJson, parseSurfaceId, sha256CanonicalSync } from "@madventures/protocol";
import { parseSessionLifecycleEvent } from "../../protocol/src/lifecycle-events";
import type { BridgeEventV1, LedgerEventV1, SessionLifecycleEventV1 } from "@madventures/protocol";
import type { BrokerSnapshot, ExecutionSnapshot } from "../src/client";
import { createInProcessBrokerClient } from "../src/in-process-client";
import { RuntimeBroker } from "../src/runtime-broker";
import type { LifecycleObservation } from "../src/runtime-broker";
import { projectSnapshot } from "../src/snapshot";

const SESSION = "session-task25";
const EXECUTION = "execution-task25";
const HASH = "a".repeat(64);
const FINGERPRINT = { kind: "commit", sha256: "b".repeat(64), git_sha: "c".repeat(40) } as const;
const TIME = "2026-10-25T00:00:00Z";

class RecordingLedger extends Ledger {
  appends: LedgerEventV1[] = [];
  batches: (readonly LedgerEventV1[])[] = [];
  rejectAll = false;

  override append(event: LedgerEventV1) {
    this.appends.push(event);
    return super.append(event);
  }

  override appendMany(events: readonly LedgerEventV1[]) {
    this.batches.push([...events]);
    if (this.rejectAll) throw new Error("synthetic permanent ledger failure");
    return super.appendMany(events);
  }
}

const roots: { root: string; ledger: Ledger }[] = [];
afterEach(() => {
  for (const { root, ledger } of roots.splice(0)) {
    ledger.close();
    rmSync(root, { recursive: true, force: true });
  }
});

async function fixture(terminate: () => Promise<void> = async () => {}) {
  const root = mkdtempSync(join(tmpdir(), "task25-incident-"));
  const ledger = new RecordingLedger(join(root, "ledger.sqlite3"));
  roots.push({ root, ledger });
  ledger.append({
    protocol_version: PROTOCOL_VERSION, event_id: "open-task25", session_id: SESSION,
    event_type: "session_open", actor: "madbridge", task_envelope_hash: HASH, repository_fingerprint: FINGERPRINT,
    fencing_token: null, reason_code: null, created_at: TIME, previous_event_hash: GENESIS_HASH,
    payload: { authorization_reference: "synthetic-task25-authorization", execution_ids: [EXECUTION] },
  });
  const execution: ExecutionSnapshot = {
    identity: {
      execution_id: EXECUTION, role: "builder", surface: parseSurfaceId("claude-code"),
      model: "synthetic-model", provider: "synthetic-provider", independence_domain: "synthetic-domain", effort: "medium",
    },
    state: "ready", hostPid: null, childPid: null, processGroupId: null,
    executablePath: "/fixtures/task25-unused", executableSha256: "d".repeat(64), exitCode: null, exitSignal: null,
  };
  let generated = 0;
  let collision: string | null = null;
  let terminations = 0;
  const observations: LifecycleObservation[] = [];
  const snapshots: BrokerSnapshot[] = [];
  const broker = new RuntimeBroker({
    ledger, provenance: { taskEnvelopeHash: HASH, repositoryFingerprint: FINGERPRINT }, executions: [execution],
    sources: {
      nextEventId: () => {
        if (collision !== null) { const id = collision; collision = null; return id; }
        return `lifecycle-task25-${++generated}`;
      },
      now: () => TIME,
    },
    terminateGovernedProcesses: async () => { terminations += 1; await terminate(); },
    observe: value => {
      observations.push(value);
      snapshots.push(projectSnapshot(broker.snapshotProjectionInput()));
    },
  });
  await broker.activate(EXECUTION, [EXECUTION]);
  ledger.appends.length = 0;
  ledger.batches.length = 0;
  observations.length = 0;
  snapshots.length = 0;
  return {
    ledger, broker, observations, snapshots, terminations: () => terminations,
    collideNextId: (id: string) => { collision = id; },
  };
}

function incident(ledger: Ledger, severity: "low" | "medium" | "high" = "high"): BridgeEventV1 {
  const payload = { incident_id: "incident-task25", reason: "synthetic incident", severity };
  return {
    protocol_version: PROTOCOL_VERSION, event_id: "event-task25", session_id: SESSION,
    parent_event_id: null, sender_execution_id: EXECUTION, receiver_execution_id: "execution-peer",
    sender_role: "builder", sender_surface: "claude-code", sender_model: "synthetic-model", sender_provider: "synthetic-provider",
    task_envelope_hash: HASH, repository_fingerprint: FINGERPRINT, event_type: "incident",
    payload_hash: sha256CanonicalSync(payload), payload, created_at: TIME, previous_event_hash: ledger.verify().head,
  };
}

test("no snapshot is emitted between the source incident and the derived lifecycle record", async () => {
  for (const phase of ["active", "paused"] as const) {
    const f = await fixture();
    if (phase === "paused") await f.broker.pause("pause-task25");
    f.observations.length = 0;
    f.snapshots.length = 0;
    f.ledger.appends.length = 0;
    f.ledger.batches.length = 0;
    const before = f.ledger.readAfter(0).length;
    const seq = f.broker.snapshotSeq;
    const candidate = incident(f.ledger);
    expect(await f.broker.publishIncident(candidate)).toEqual({ ok: true, commandId: candidate.event_id });
    const rows = f.ledger.readAfter(before);
    expect(rows.map(row => JSON.parse(row.event_json).event_type)).toEqual([
      "incident", "session_interrupted", "fencing_token_invalidated", "session_closing", "session_closed",
    ]);
    expect(f.ledger.batches.filter(batch => batch.length === 2)).toEqual([[candidate, JSON.parse(rows[1]!.event_json)]]);
    expect(f.ledger.appends.map(event => event.event_type)).toEqual(["fencing_token_invalidated", "session_closing", "session_closed"]);
    expect(f.observations).toEqual([
      { snapshotSeq: seq + 1, phase: "interrupted", ledgerSeq: before + 2 },
      { snapshotSeq: seq + 2, phase: "interrupted", ledgerSeq: before + 3 },
      { snapshotSeq: seq + 3, phase: "closing", ledgerSeq: before + 4 },
      { snapshotSeq: seq + 4, phase: "closed", ledgerSeq: before + 5 },
    ]);
    expect(f.snapshots.some(snapshot => snapshot.phase === "active" && snapshot.incident !== null)).toBe(false);
    expect(f.snapshots.some(snapshot => snapshot.ledgerSeq === before + 1)).toBe(false);
    expect(f.snapshots[0]).toMatchObject({ phase: "interrupted", incident: { id: "incident-task25" }, ledgerSeq: before + 2 });
    expect(f.ledger.verify().valid).toBe(true);
    let state = INITIAL_LIFECYCLE_STATE;
    for (const row of f.ledger.readAfter(0)) state = reduceLedgerEvent(state, JSON.parse(row.event_json));
    expect(f.broker.snapshotProjectionInput().lifecycle).toEqual(state);
  }
});

test("the derived record copies source_event_id and reported_by_execution_id from the originating event", async () => {
  for (const severity of ["low", "medium", "high"] as const) {
    const f = await fixture();
    const candidate = incident(f.ledger, severity);
    const before = f.ledger.readAfter(0).length;
    await f.broker.publishIncident(candidate);
    const rows = f.ledger.readAfter(before);
    expect(JSON.parse(rows[0]!.event_json)).toEqual(candidate);
    const derived = JSON.parse(rows[1]!.event_json) as SessionLifecycleEventV1;
    expect(derived).toMatchObject({
      actor: "madbridge", event_type: "session_interrupted", session_id: candidate.session_id,
      task_envelope_hash: HASH, repository_fingerprint: FINGERPRINT, reason_code: "execution_reported_incident",
      previous_event_hash: computeEventHash(candidate.previous_event_hash, canonicalJson(candidate)),
      payload: { ...candidate.payload, source_event_id: candidate.event_id, reported_by_execution_id: candidate.sender_execution_id },
    });
    expect(derived.event_id).not.toBe(candidate.event_id);
    expect(() => parseSessionLifecycleEvent(derived, {
      envelopeExecutionIds: [EXECUTION], openIncidentId: null, openReasonCode: null,
    })).not.toThrow();
    expect(f.snapshots[0]!.incident).toEqual({ id: "incident-task25", reason: "synthetic incident", severity, timestamp: derived.created_at });
  }
});

test("a supervisor-originated interruption sets both source fields to null", async () => {
  const f = await fixture();
  const before = f.ledger.readAfter(0).length;
  await f.broker.interrupt("child_failure", "synthetic supervisor failure", "high", "incident-supervisor", null, null);
  const events = f.ledger.readAfter(before).map(row => JSON.parse(row.event_json));
  expect(events.map(event => event.event_type)).toEqual(["session_interrupted", "fencing_token_invalidated", "session_closing", "session_closed"]);
  expect(events[0]).toMatchObject({ reason_code: "child_failure", payload: { source_event_id: null, reported_by_execution_id: null } });
  expect(f.ledger.verify().valid).toBe(true);
});

test("the accepted result is returned only after the phase is interrupted", async () => {
  for (const deliveries of [0, 2]) {
    const f = await fixture();
    const client = createInProcessBrokerClient(f.broker, { kind: "execution", executionId: EXECUTION });
    for (let n = 0; n < deliveries; n += 1) await client.getSnapshot();
    const before = f.ledger.readAfter(0).length;
    const candidate = incident(f.ledger);
    const result = await client.publish(candidate);
    expect(result).toEqual({ ok: true, commandId: candidate.event_id, acceptedSnapshotSeq: deliveries });
    expect(f.observations[0]).toMatchObject({ phase: "interrupted", ledgerSeq: before + 2 });
    expect(JSON.parse(f.ledger.readAfter(before)[1]!.event_json)).toMatchObject({ event_type: "session_interrupted" });
    expect(f.snapshots[0]).toMatchObject({ phase: "interrupted", incident: { id: "incident-task25" } });
    expect((await client.getSnapshot()).snapshotSeq).toBe(deliveries + 1);
  }
});

test("the mandatory invalidation, closing, and closed records follow the incident pair", async () => {
  let release!: () => void;
  const gate = new Promise<void>(resolve => { release = resolve; });
  const f = await fixture(() => gate);
  const before = f.ledger.readAfter(0).length;
  const pending = f.broker.publishIncident(incident(f.ledger));
  try {
    expect(f.terminations()).toBe(1);
    expect(f.ledger.readAfter(before).map(row => JSON.parse(row.event_json).event_type)).toEqual([
      "incident", "session_interrupted", "fencing_token_invalidated", "session_closing",
    ]);
    expect(f.broker.snapshotProjectionInput().lifecycle.phase).toBe("closing");
  } finally {
    release();
    await pending;
  }
  const events = f.ledger.readAfter(before).map(row => JSON.parse(row.event_json));
  expect(events.map(event => event.event_type)).toEqual([
    "incident", "session_interrupted", "fencing_token_invalidated", "session_closing", "session_closed",
  ]);
  expect(events[2].payload).toEqual({ invalidation_reason: "interruption", incident_id: "incident-task25" });
  for (const event of events.slice(3)) {
    expect(event).toMatchObject({ reason_code: "execution_reported_incident", payload: {
      closure_kind: "interruption", incident_id: "incident-task25", reason_code: "execution_reported_incident",
    } });
  }
  expect(f.snapshots.map(snapshot => snapshot.phase)).toEqual(["interrupted", "interrupted", "closing", "closed"]);
  expect(f.ledger.verify().valid).toBe(true);
});

test("a failed incident append interrupts the session with ledger_write_failed", async () => {
  for (const permanent of [false, true]) {
    const f = await fixture();
    const client = createInProcessBrokerClient(f.broker, { kind: "execution", executionId: EXECUTION });
    const candidate = incident(f.ledger);
    const before = f.ledger.readAfter(0).length;
    const interruptions: Parameters<RuntimeBroker["interrupt"]>[] = [];
    const interrupt = f.broker.interrupt.bind(f.broker);
    f.broker.interrupt = async (...args) => { interruptions.push(args); await interrupt(...args); };
    // Collide on the second insert to exercise real SQLite rollback of the source row.
    f.collideNextId(candidate.event_id);
    f.ledger.rejectAll = permanent;
    expect(await client.publish(candidate)).toMatchObject({ ok: false, commandId: candidate.event_id, error: "ledger_write_failed" });
    expect(interruptions).toHaveLength(1);
    expect(interruptions[0]![0]).toBe("ledger_write_failed");
    expect(interruptions[0]!.slice(4)).toEqual([null, null]);
    expect(f.terminations()).toBe(1);
    const events = f.ledger.readAfter(before).map(row => JSON.parse(row.event_json));
    expect(events.some(event => event.event_id === candidate.event_id || event.reason_code === "execution_reported_incident")).toBe(false);
    if (permanent) {
      expect(events).toEqual([]);
      expect(f.observations).toEqual([]);
    } else {
      expect(events.map(event => event.event_type)).toEqual(["session_interrupted", "fencing_token_invalidated", "session_closing", "session_closed"]);
      expect(events[0]).toMatchObject({ reason_code: "ledger_write_failed", payload: { source_event_id: null, reported_by_execution_id: null } });
      expect(f.snapshots.map(snapshot => snapshot.phase)).toEqual(["interrupted", "interrupted", "closing", "closed"]);
      expect(f.snapshots[0]!.incident!.id).not.toBe("incident-task25");
    }
    expect(f.ledger.verify().valid).toBe(true);
  }
});
