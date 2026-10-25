import { afterEach, expect, test } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { GENESIS_HASH, Ledger } from "@madventures/ledger";
import { PROTOCOL_VERSION, parseSurfaceId, sha256CanonicalSync } from "@madventures/protocol";
import type { BridgeEventV1, LedgerEventV1, SessionLifecycleEventV1 } from "@madventures/protocol";
import type { BrokerErrorCode, BrokerSnapshot, ClientPrincipal, ExecutionSnapshot } from "../src/client";
import { createInProcessBrokerClient } from "../src/in-process-client";
import { RuntimeBroker } from "../src/runtime-broker";
import type { LifecycleObservation } from "../src/runtime-broker";
import { projectSnapshot } from "../src/snapshot";
import {
  evaluatePublishLegality,
  PUBLISHABLE_COLLABORATION_EVENT_TYPES,
  RESERVED_LEGACY_GOVERNANCE_EVENT_TYPES,
} from "../src/publish-legality";

const SESSION = "session-task24";
const EXECUTION = "execution-task24";
const HASH = "a".repeat(64);
const FINGERPRINT = { kind: "commit", sha256: "b".repeat(64), git_sha: "c".repeat(40) } as const;
const PRINCIPAL: ClientPrincipal = { kind: "execution", executionId: EXECUTION };
const PHASES: readonly BrokerSnapshot["phase"][] = ["starting", "active", "paused", "interrupted", "closing", "closed"];
const NORMAL_TYPES = [
  "message", "action_request", "action_accept", "action_reject", "artifact_publish",
  "ownership_request", "ownership_release", "ownership_accept", "ownership_reject",
  "verification_result", "review_verdict",
] as const;
const LEGACY_TYPES = ["pause", "resume", "session_close"] as const;
const INCIDENT = { id: "incident-existing", reason: "synthetic incident", severity: "high", timestamp: "2026-10-22T00:00:00Z" } as const;

function execution(state: ExecutionSnapshot["state"] = "ready"): ExecutionSnapshot {
  return {
    identity: {
      execution_id: EXECUTION, role: "builder", surface: parseSurfaceId("claude-code"),
      model: "synthetic-model", provider: "synthetic-provider", independence_domain: "synthetic-domain", effort: "medium",
    },
    state, hostPid: null, childPid: null, processGroupId: null,
    executablePath: "/fixtures/task24-unused", executableSha256: "d".repeat(64), exitCode: null, exitSignal: null,
  };
}

function snapshot(overrides: Partial<BrokerSnapshot> = {}): BrokerSnapshot {
  return {
    sessionId: SESSION, snapshotSeq: null, connected: null, phase: "active",
    taskEnvelopeHash: HASH, task: null, repositoryFingerprint: FINGERPRINT,
    executions: [execution()], activeWriterExecutionId: EXECUTION,
    fencingToken: 1, tokenState: "valid", pendingApprovals: [], pendingTransfers: null,
    permissionSummary: null, ownershipState: null, verification: null, review: null,
    incident: null, eventLog: [], queueDepth: null, ledgerSeq: 3, ...overrides,
  };
}

function event(overrides: Partial<BridgeEventV1> = {}): BridgeEventV1 {
  const payload = overrides.payload ?? { text: "synthetic message" };
  return {
    protocol_version: PROTOCOL_VERSION, event_id: "event-task24", session_id: SESSION,
    parent_event_id: null, sender_execution_id: EXECUTION, receiver_execution_id: "execution-peer",
    sender_role: "builder", sender_surface: "claude-code", sender_model: "synthetic-model", sender_provider: "synthetic-provider",
    task_envelope_hash: HASH, repository_fingerprint: FINGERPRINT, event_type: "message",
    payload_hash: sha256CanonicalSync(payload), payload, created_at: "2026-10-22T00:00:00Z",
    previous_event_hash: GENESIS_HASH, ...overrides,
  };
}

function incident(): BridgeEventV1 {
  return event({ event_type: "incident", payload: { incident_id: "incident-published", reason: "synthetic incident", severity: "high" } });
}

function refused(result: ReturnType<typeof evaluatePublishLegality>, error: BrokerErrorCode): void {
  expect(result).toMatchObject({ ok: false, error });
}

class TestLedger extends Ledger {
  calls: LedgerEventV1[] = [];
  reject: (event: LedgerEventV1) => boolean = () => false;

  override append(value: LedgerEventV1) {
    this.calls.push(value);
    if (this.reject(value)) throw new Error("synthetic append failure");
    return super.append(value);
  }
}

const roots: { root: string; ledger: Ledger }[] = [];
afterEach(() => {
  for (const { root, ledger } of roots.splice(0)) {
    ledger.close();
    rmSync(root, { recursive: true, force: true });
  }
});

async function fixture() {
  const root = mkdtempSync(join(tmpdir(), "task24-publish-"));
  const ledger = new TestLedger(join(root, "ledger.sqlite3"));
  roots.push({ root, ledger });
  ledger.append({
    protocol_version: PROTOCOL_VERSION, event_id: "open-task24", session_id: SESSION,
    event_type: "session_open", actor: "madbridge", task_envelope_hash: HASH, repository_fingerprint: FINGERPRINT,
    fencing_token: null, reason_code: null, created_at: "2026-10-22T00:00:00Z", previous_event_hash: GENESIS_HASH,
    payload: { authorization_reference: "synthetic-task24-authorization", execution_ids: [EXECUTION] },
  });
  let generated = 0;
  let terminations = 0;
  const observations: LifecycleObservation[] = [];
  const observedSnapshots: BrokerSnapshot[] = [];
  const broker = new RuntimeBroker({
    ledger, provenance: { taskEnvelopeHash: HASH, repositoryFingerprint: FINGERPRINT }, executions: [execution()],
    sources: { nextEventId: () => `lifecycle-task24-${++generated}`, now: () => "2026-10-22T00:00:00Z" },
    terminateGovernedProcesses: async () => { terminations += 1; },
    observe: value => {
      observations.push(value);
      observedSnapshots.push(projectSnapshot(broker.snapshotProjectionInput()));
    },
  });
  await broker.activate(EXECUTION, [EXECUTION]);
  ledger.calls.length = 0;
  observations.length = 0;
  observedSnapshots.length = 0;
  return { ledger, broker, observations, observedSnapshots, terminations: () => terminations };
}

test("publish row: normal collaboration set above in any non-active phase yields session_not_writable", () => {
  for (const event_type of NORMAL_TYPES) for (const phase of PHASES.filter(p => p !== "active")) {
    for (const activeIncident of [null, INCIDENT]) {
      refused(evaluatePublishLegality(event({ event_type }), snapshot({ phase, incident: activeIncident }), PRINCIPAL), "session_not_writable");
    }
  }
});

test("publish row: normal collaboration set above in active + incident yields incident_active", () => {
  for (const event_type of NORMAL_TYPES) {
    refused(evaluatePublishLegality(event({ event_type }), snapshot({ incident: INCIDENT, executions: [execution("attesting")] }), PRINCIPAL), "incident_active");
  }
});

test("publish row: incident in starting/interrupted/closing/closed yields session_not_writable", () => {
  for (const phase of PHASES.filter(p => p !== "active" && p !== "paused")) {
    for (const activeIncident of [null, INCIDENT]) {
      refused(evaluatePublishLegality(incident(), snapshot({ phase, incident: activeIncident, executions: [execution("failed")] }), PRINCIPAL), "session_not_writable");
    }
  }
});

test("publish row: incident in active/paused + existing incident yields incident_active", () => {
  for (const phase of ["active", "paused"] as const) {
    refused(evaluatePublishLegality(incident(), snapshot({ phase, incident: INCIDENT, executions: [execution("exited")] }), PRINCIPAL), "incident_active");
  }
});

test("publish row: legacy pause/resume/session_close in every phase yields unauthorized", () => {
  for (const event_type of LEGACY_TYPES) for (const phase of PHASES) {
    refused(evaluatePublishLegality(event({ event_type }), snapshot({ phase, incident: INCIDENT, executions: [execution("declared")] }), PRINCIPAL), "unauthorized");
  }
});

test("publish row: unknown or malformed event in every phase yields invalid_command", () => {
  for (const phase of PHASES) for (const candidate of [
    { ...event(), event_type: "unknown" }, { ...event(), extra: "synthetic content" },
    { ...event(), payload_hash: "f".repeat(64) }, { ...event(), protocol_version: "unknown" },
  ]) {
    const result = evaluatePublishLegality(candidate as BridgeEventV1, snapshot({ phase }), { kind: "founder_tui" });
    refused(result, "invalid_command");
    expect(result).toMatchObject({ detail: "step 1: invalid_command" });
  }
});

test("a legacy execution-authored pause is rejected with unauthorized in every phase", () => {
  expect(RESERVED_LEGACY_GOVERNANCE_EVENT_TYPES).toEqual(LEGACY_TYPES);
  for (const phase of PHASES) {
    refused(evaluatePublishLegality(event({ event_type: "pause" }), snapshot({ phase }), PRINCIPAL), "unauthorized");
  }
});

test("a malformed incident in a closed session is invalid_command, not session_not_writable", () => {
  for (const payload of [
    {}, { incident_id: "i", reason: "r", severity: "critical" },
    { incident_id: "", reason: "r", severity: "high" }, { incident_id: "i", reason: "", severity: "high" },
    { incident_id: "i", reason: "r", severity: "high", extra: "synthetic content" },
    { incident_id: 1, reason: "r", severity: "high" },
  ]) {
    refused(evaluatePublishLegality(event({ event_type: "incident", payload }), snapshot({ phase: "closed" }), PRINCIPAL), "invalid_command");
  }
});

test("a valid incident in a closed session is session_not_writable", () => {
  refused(evaluatePublishLegality(incident(), snapshot({ phase: "closed" }), PRINCIPAL), "session_not_writable");
});

test("an execution principal publishing another execution's sender id is unauthorized", async () => {
  refused(evaluatePublishLegality(event({ sender_execution_id: "another-execution" }), snapshot({ phase: "closed" }), PRINCIPAL), "unauthorized");
  refused(evaluatePublishLegality(event({ session_id: "other-session" }), snapshot({ executions: null }), PRINCIPAL), "session_mismatch");
  expect(evaluatePublishLegality(event({ event_type: "pause" }), snapshot({ executions: null }), PRINCIPAL)).toEqual({
    ok: false, error: "invariant_failure", detail: "executions not produced by the snapshot",
  });
  refused(evaluatePublishLegality(event({ event_type: "pause" }), snapshot({ executions: [] }), PRINCIPAL), "execution_not_found");
  for (const mismatch of [
    { sender_role: "observer" }, { sender_surface: "antigravity" }, { sender_model: "different-model" },
    { sender_provider: "different-provider" }, { task_envelope_hash: "e".repeat(64) },
    { repository_fingerprint: { ...FINGERPRINT, git_sha: "e".repeat(40) } },
  ]) {
    refused(evaluatePublishLegality(event({ event_type: "pause", ...mismatch }), snapshot({ phase: "closed" }), PRINCIPAL), "identity_mismatch");
  }
  const f = await fixture();
  const principal = { kind: "execution" as const, executionId: EXECUTION };
  const client = createInProcessBrokerClient(f.broker, principal);
  principal.executionId = "another-execution";
  expect(await client.publish(event({ sender_execution_id: "another-execution" }))).toMatchObject({ ok: false, error: "unauthorized" });
  expect(f.ledger.calls).toHaveLength(0);
});

test("an ordinary collaboration event does not require a pending approval", () => {
  expect(PUBLISHABLE_COLLABORATION_EVENT_TYPES).toEqual(NORMAL_TYPES);
  for (const event_type of ["message", "action_request", "artifact_publish", "ownership_request", "ownership_release", "verification_result", "review_verdict"] as const) {
    expect(evaluatePublishLegality(event({ event_type }), snapshot({ activeWriterExecutionId: "another-execution" }), PRINCIPAL)).toEqual({ ok: true });
    for (const state of ["declared", "host-starting", "launching", "attesting", "exited", "failed"] as const) {
      refused(evaluatePublishLegality(event({ event_type }), snapshot({ executions: [execution(state)] }), PRINCIPAL), "invariant_failure");
    }
  }
  for (const phase of ["active", "paused"] as const) {
    expect(evaluatePublishLegality(incident(), snapshot({ phase }), PRINCIPAL)).toEqual({ ok: true });
    refused(evaluatePublishLegality(incident(), snapshot({ phase, executions: [execution("attesting")] }), PRINCIPAL), "invariant_failure");
  }
});

test("an action_accept referencing a resolved approval fails with approval_not_pending", async () => {
  for (const event_type of ["action_accept", "action_reject"] as const) {
    const candidate = event({ event_type, payload: { approval_id: "resolved-approval" } });
    refused(evaluatePublishLegality(candidate, snapshot({ pendingApprovals: [{
      id: "resolved-approval", type: "synthetic", actor: EXECUTION, taskId: "task24",
      repositoryFingerprint: FINGERPRINT, scope: "synthetic", timestamp: "2026-10-22T00:00:00Z", state: "approved",
    }] }), PRINCIPAL), "approval_not_pending");
    const f = await fixture();
    const before = f.ledger.readAfter(0);
    expect(await createInProcessBrokerClient(f.broker, PRINCIPAL).publish(candidate)).toMatchObject({ ok: false, error: "approval_not_pending" });
    expect(f.ledger.readAfter(0)).toEqual(before);
    expect(f.observations).toHaveLength(0);
  }
});

test("BrokerResult.commandId equals event.event_id for publish", async () => {
  const f = await fixture();
  const client = createInProcessBrokerClient(f.broker, PRINCIPAL);
  for (const candidate of [event(), event({ event_id: "event-refused", event_type: "action_accept" }), { event_id: "event-malformed" }]) {
    expect((await client.publish(candidate as BridgeEventV1)).commandId).toBe(candidate.event_id);
  }
  for (const candidate of [null, undefined, {}, { event_id: 7 }]) {
    expect(await client.publish(candidate as unknown as BridgeEventV1)).toMatchObject({ ok: false, commandId: "", error: "invalid_command" });
  }
  const uncloneable = { ...event({ event_id: "event-uncloneable" }), payload: { synthetic: () => {} } };
  expect(await client.publish(uncloneable)).toMatchObject({ ok: false, commandId: "event-uncloneable", error: "invalid_command" });
  const unreadable = Object.defineProperty({}, "event_id", { enumerable: true, get() { throw new Error("synthetic getter failure"); } });
  expect(await client.publish(unreadable as BridgeEventV1)).toMatchObject({ ok: false, commandId: "", error: "invalid_command" });
});

test("an accepted ordinary event is appended once and published in exactly one snapshot", async () => {
  const f = await fixture();
  const client = createInProcessBrokerClient(f.broker, PRINCIPAL);
  const untouchedClient = createInProcessBrokerClient(f.broker, PRINCIPAL);
  expect((await client.getSnapshot()).snapshotSeq).toBe(1);
  const iterator = client.snapshots()[Symbol.asyncIterator]();
  expect((await iterator.next()).value?.snapshotSeq).toBe(2);
  const initialSeq = f.broker.snapshotSeq;
  let number = 0;
  for (const event_type of ["message", "action_request", "artifact_publish", "ownership_request", "ownership_release", "verification_result", "review_verdict"] as const) {
    const before = f.ledger.readAfter(0);
    const candidate = event({ event_type, event_id: `ordinary-${++number}`, previous_event_hash: f.ledger.verify().head });
    expect(await client.publish(candidate)).toEqual({ ok: true, commandId: candidate.event_id, acceptedSnapshotSeq: 2 });
    const rows = f.ledger.readAfter(0);
    expect(rows).toHaveLength(before.length + 1);
    expect(JSON.parse(rows.at(-1)!.event_json)).toEqual(candidate);
    expect(f.ledger.calls).toHaveLength(number);
    expect(f.observations).toHaveLength(number);
    expect(f.observations.at(-1)).toEqual({ snapshotSeq: initialSeq + number, phase: "active", ledgerSeq: rows.length });
    expect(f.observedSnapshots.at(-1)).toMatchObject({ phase: "active", ledgerSeq: rows.length, verification: null, review: null, pendingTransfers: null, pendingApprovals: [] });
    expect(f.ledger.verify().valid).toBe(true);
  }
  expect(await untouchedClient.publish(event({ event_id: "unstamped-client-event" }))).toEqual({ ok: true, commandId: "unstamped-client-event", acceptedSnapshotSeq: 0 });
  const head = f.ledger.verify().head;
  await f.broker.pause("check-folded-head");
  expect((JSON.parse(f.ledger.readAfter(0).at(-1)!.event_json) as SessionLifecycleEventV1).previous_event_hash).toBe(head);
  expect((await client.getSnapshot()).snapshotSeq).toBe(3);
  await iterator.return?.();
});

test("an ownership_accept fails closed while pendingTransfers is not produced", async () => {
  for (const event_type of ["ownership_accept", "ownership_reject"] as const) {
    const candidate = event({ event_type });
    expect(evaluatePublishLegality(candidate, snapshot(), PRINCIPAL)).toEqual({
      ok: false, error: "invariant_failure", detail: "pendingTransfers not produced by the snapshot",
    });
    const f = await fixture();
    const before = f.ledger.readAfter(0);
    expect(await createInProcessBrokerClient(f.broker, PRINCIPAL).publish(candidate)).toEqual({
      ok: false, commandId: candidate.event_id, error: "invariant_failure", detail: "pendingTransfers not produced by the snapshot",
    });
    expect(f.ledger.readAfter(0)).toEqual(before);
    expect(f.observations).toHaveLength(0);
  }
});

test("a legal published incident takes the atomic incident path", async () => {
  for (const phase of ["active", "paused"] as const) {
    const f = await fixture();
    if (phase === "paused") await f.broker.pause("pause-for-incident");
    const client = createInProcessBrokerClient(f.broker, PRINCIPAL);
    const before = f.ledger.readAfter(0);
    const observations = f.observations.length;
    expect(evaluatePublishLegality(incident(), await client.getSnapshot(), PRINCIPAL)).toEqual({ ok: true });
    expect(await client.publish(incident())).toEqual({ ok: true, commandId: incident().event_id, acceptedSnapshotSeq: 1 });
    const events = f.ledger.readAfter(before.length).map(row => JSON.parse(row.event_json));
    expect(events.map(value => value.event_type)).toEqual(["incident", "session_interrupted", "fencing_token_invalidated", "session_closing", "session_closed"]);
    expect(events[0]).toEqual(incident());
    expect(events[1]).toMatchObject({ reason_code: "execution_reported_incident", payload: {
      ...incident().payload, source_event_id: incident().event_id, reported_by_execution_id: incident().sender_execution_id,
    } });
    expect(f.observations).toHaveLength(observations + 4);
    expect(f.observations[observations]).toMatchObject({ phase: "interrupted", ledgerSeq: before.length + 2 });
    expect(f.terminations()).toBe(1);
    expect(f.ledger.verify().valid).toBe(true);
  }
});

test("a founder principal publishing any event is unauthorized", async () => {
  const f = await fixture();
  const founder = createInProcessBrokerClient(f.broker, { kind: "founder_tui" });
  for (const event_type of [...NORMAL_TYPES, ...LEGACY_TYPES, "incident"] as const) {
    const candidate = event_type === "incident" ? incident() : event({ event_type });
    refused(evaluatePublishLegality(candidate, snapshot({ phase: "closed", executions: null }), { kind: "founder_tui" }), "unauthorized");
    expect(await founder.publish(candidate)).toMatchObject({ ok: false, error: "unauthorized" });
  }
  expect(f.ledger.calls).toHaveLength(0);
});

test("a publish missing a required BridgeEventV1 field is invalid_command", () => {
  const check = (candidate: unknown) => refused(evaluatePublishLegality(candidate as BridgeEventV1, snapshot({ phase: "closed" }), PRINCIPAL), "invalid_command");
  for (const key of Object.keys(event())) {
    const candidate = { ...event() } as Record<string, unknown>;
    delete candidate[key];
    check(candidate);
  }
  for (const key of ["event_id", "session_id", "sender_execution_id", "receiver_execution_id", "sender_role", "sender_surface", "sender_model", "sender_provider", "created_at", "previous_event_hash"]) {
    for (const value of ["", null, 1, false, [], {}]) check({ ...event(), [key]: value });
  }
  for (const value of ["", 1, false, [], {}]) check({ ...event(), parent_event_id: value });
  for (const payload of [null, [], "synthetic", 1, new Date(0), new Map()]) {
    check({ ...event(), payload, payload_hash: sha256CanonicalSync(payload) });
  }
  for (const task_envelope_hash of ["a".repeat(63), "a".repeat(65), "A".repeat(64), "g".repeat(64)]) check({ ...event(), task_envelope_hash });
  for (const repository_fingerprint of [null, [], {}, { ...FINGERPRINT, kind: "unknown" }, { ...FINGERPRINT, sha256: "g".repeat(64) }, { ...FINGERPRINT, git_sha: "c".repeat(39) }, { ...FINGERPRINT, kind: "working_tree" }, { ...FINGERPRINT, kind: "working_tree", base_git_sha: "g".repeat(40) }]) {
    check({ ...event(), repository_fingerprint });
  }
  const fingerprint = { kind: "working_tree", sha256: "b".repeat(64), git_sha: "c".repeat(40), base_git_sha: "d".repeat(40) } as const;
  expect(evaluatePublishLegality(event({ repository_fingerprint: fingerprint, parent_event_id: "parent" }), snapshot({ repositoryFingerprint: { base_git_sha: fingerprint.base_git_sha, git_sha: fingerprint.git_sha, sha256: fingerprint.sha256, kind: fingerprint.kind } }), PRINCIPAL)).toEqual({ ok: true });
  const input = event();
  const before = structuredClone(input);
  evaluatePublishLegality(input, snapshot(), PRINCIPAL);
  expect(input).toEqual(before);
});

test("a failed append interrupts the session with ledger_write_failed", async () => {
  for (const permanent of [false, true]) {
    const f = await fixture();
    const client = createInProcessBrokerClient(f.broker, PRINCIPAL);
    const before = f.ledger.readAfter(0);
    const interruptions: Parameters<RuntimeBroker["interrupt"]>[] = [];
    const interrupt = f.broker.interrupt.bind(f.broker);
    f.broker.interrupt = async (...args) => { interruptions.push(args); await interrupt(...args); };
    f.ledger.reject = value => permanent || value.event_type === "message";
    expect(await client.publish(event())).toMatchObject({ ok: false, commandId: event().event_id, error: "ledger_write_failed" });
    expect(interruptions).toHaveLength(1);
    expect(interruptions[0]![0]).toBe("ledger_write_failed");
    expect(interruptions[0]!.slice(4)).toEqual([null, null]);
    expect(f.terminations()).toBe(1);
    const rows = f.ledger.readAfter(before.length);
    expect(rows.some(row => row.event_id === event().event_id)).toBe(false);
    if (permanent) {
      expect(rows).toEqual([]);
      expect(f.observations).toHaveLength(0);
    } else {
      const events = rows.map(row => JSON.parse(row.event_json) as SessionLifecycleEventV1);
      expect(events.map(value => value.event_type)).toEqual(["session_interrupted", "fencing_token_invalidated", "session_closing", "session_closed"]);
      expect(events[0]).toMatchObject({ reason_code: "ledger_write_failed", payload: { source_event_id: null, reported_by_execution_id: null } });
      expect(f.observedSnapshots.map(value => value.phase)).toEqual(["interrupted", "interrupted", "closing", "closed"]);
    }
  }
});

test("a sender that is not ready fails at step 4 before any reference check", () => {
  for (const event_type of ["action_accept", "action_reject", "ownership_accept", "ownership_reject"] as const) {
    for (const state of ["declared", "host-starting", "launching", "attesting", "exited", "failed"] as const) {
      expect(evaluatePublishLegality(event({ event_type }), snapshot({ executions: [execution(state)] }), PRINCIPAL)).toEqual({
        ok: false, error: "invariant_failure", detail: "step 4: invariant_failure",
      });
    }
  }
});

test("a principal mismatch is unauthorized before any session check", () => {
  for (const principal of [{ kind: "execution", executionId: "another-execution" }, { kind: "founder_tui" }] as const) {
    expect(evaluatePublishLegality(event({ session_id: "other-session" }), snapshot(), principal)).toEqual({
      ok: false, error: "unauthorized", detail: "step 2: unauthorized",
    });
  }
});

test("a duplicate event_id is refused without appending or interrupting the session", async () => {
  const f = await fixture();
  const client = createInProcessBrokerClient(f.broker, PRINCIPAL);
  const candidate = event();
  expect(await client.publish(candidate)).toMatchObject({ ok: true, commandId: candidate.event_id });
  const rows = f.ledger.readAfter(0);
  const head = f.ledger.verify().head;
  const before = await client.getSnapshot();
  const brokerSeq = f.broker.snapshotSeq;
  expect(f.ledger.calls).toHaveLength(1);
  expect(f.observations).toHaveLength(1);
  expect(await client.publish(candidate)).toEqual({
    ok: false, commandId: candidate.event_id, error: "invalid_command", detail: "publish: duplicate event_id",
  });
  expect(f.ledger.readAfter(0)).toEqual(rows);
  expect(f.ledger.readAfter(0).filter(row => row.event_id === candidate.event_id)).toHaveLength(1);
  expect(f.ledger.verify().head).toBe(head);
  expect(f.ledger.calls).toHaveLength(1);
  expect(f.observations).toHaveLength(1);
  expect(f.broker.snapshotSeq).toBe(brokerSeq);
  expect((await client.getSnapshot()).phase).toBe(before.phase);
  expect(before.phase).toBe("active");
  expect(f.terminations()).toBe(0);
});
