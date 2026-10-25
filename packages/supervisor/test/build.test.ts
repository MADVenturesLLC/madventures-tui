import { expect, spyOn, test } from "bun:test";
import { existsSync } from "node:fs";
import { PROTOCOL_VERSION, sha256CanonicalSync } from "@madventures/protocol";
import * as build from "../src/build";
import type { BuildInput, BuildResult } from "../src/build";
import { RuntimeBroker } from "../../broker/src/runtime-broker";
import { startFixtureSession } from "../../../test/phase3a/runtime-harness";

async function captureFixtureBuild() {
  const original = build.runTransactionalBuildWithDependencies;
  let captured: { input: BuildInput; result: BuildResult } | undefined;
  const capture = spyOn(build, "runTransactionalBuildWithDependencies").mockImplementation(async (input, deps) => {
    const result = await original(input, deps);
    captured = { input, result };
    return result;
  });
  try {
    const session = await startFixtureSession();
    if (captured === undefined || !captured.result.ok) {
      await session.close();
      throw new Error("expected a captured successful build");
    }
    return { session, input: captured.input, result: captured.result };
  } finally {
    capture.mockRestore();
  }
}

test("Task49 prerequisite build projects actual launch facts and dispatches pause and resume through its broker delegate", async () => {
  const { session, input, result } = await captureFixtureBuild();
  try {
    const expected = input.envelope.executions.map((identity, index) => {
      const child = result.state.children[index]!;
      const launch = input.plan.executions[index]!;
      expect(child.executionId).toBe(identity.execution_id);
      expect(launch.surface).toBe(identity.surface);
      for (const pid of [child.hostPid, child.childPid, child.pgid]) {
        expect(pid).toBeGreaterThan(0);
        expect(() => process.kill(pid!, 0)).not.toThrow();
      }
      return {
        identity: structuredClone(identity), state: "ready" as const, hostPid: child.hostPid,
        childPid: child.childPid, processGroupId: child.pgid,
        executablePath: launch.executablePath, executableSha256: launch.artifactSha256,
        exitCode: null, exitSignal: null,
      };
    });
    expect(expected).toHaveLength(2);
    expect(result.snapshot.executions).toEqual(expected);
    const active = await session.client.getSnapshot();
    expect(active.phase).toBe("active");
    expect(active.executions).toEqual(expected);
    expect(active.tokenState).toBe("valid");
    expect(active.fencingToken).toBeGreaterThan(0);
    const write = {
      kind: "pty_input" as const, commandId: "prereq-input", sessionId: active.sessionId,
      executionId: "builder", fencingToken: active.fencingToken!, bytes: new Uint8Array([0, 27, 255]),
    };
    expect((await session.client.request(write)).ok).toBe(true);
    expect((await session.client.request({
      kind: "session_pause", commandId: "prereq-pause", sessionId: active.sessionId, reason: "test",
    })).ok).toBe(true);
    const paused = await session.client.getSnapshot();
    expect(paused.phase).toBe("paused");
    expect(paused.fencingToken).toBe(active.fencingToken);
    expect((await session.client.request(write)).ok).toBe(false);
    expect((await session.client.request({
      kind: "session_resume", commandId: "prereq-resume", sessionId: active.sessionId,
    })).ok).toBe(true);
    const resumed = await session.client.getSnapshot();
    expect(resumed.phase).toBe("active");
    expect(resumed.fencingToken).toBe(active.fencingToken);
    expect(resumed.executions).toEqual(expected);
    Object.assign(active.executions![0]!.identity, { execution_id: "forged" });
    expect((await session.client.getSnapshot()).executions).toEqual(expected);
  } finally {
    await session.close();
  }
  expect(existsSync(session.storage.sessionDir)).toBe(false);
}, 20_000);

test("Task49 prerequisite durable activation fallback retains execution launch facts", async () => {
  const original = RuntimeBroker.prototype.snapshotProjectionInput;
  let activeReads = 0;
  const projection = spyOn(RuntimeBroker.prototype, "snapshotProjectionInput").mockImplementation(function (this: RuntimeBroker) {
    const input = original.call(this);
    if (input.lifecycle.phase === "active") {
      activeReads += 1;
      throw new Error("injected active projection failure");
    }
    return input;
  });
  let captured: Awaited<ReturnType<typeof captureFixtureBuild>> | undefined;
  try {
    captured = await captureFixtureBuild();
    projection.mockRestore();
    const { result, session } = captured;
    expect(activeReads).toBeGreaterThanOrEqual(2);
    expect(result.snapshot.phase).toBe("active");
    expect(result.snapshot.executions).toHaveLength(2);
    expect(result.snapshot.executions).toEqual((await session.client.getSnapshot()).executions);
    expect(result.state.ledger!.readAfter(0).map(row => JSON.parse(row.event_json).event_type)).toEqual([
      "session_open", "fencing_token_issued", "session_activated",
    ]);
  } finally {
    projection.mockRestore();
    await captured?.session.close();
  }
}, 20_000);

test("an adapter client from the build publishes an accepted event through its broker delegate", async () => {
  const { session, input, result } = await captureFixtureBuild();
  try {
    const adapter = result.state.adapters[0]!;
    const identity = input.envelope.executions.find(value => value.execution_id === adapter.executionId)!;
    const snapshot = await adapter.client.getSnapshot();
    expect(snapshot.phase).toBe("active");
    const ledger = result.state.ledger!;
    const before = ledger.readAfter(0);
    const payload = { text: "synthetic build-delegate message" };
    const candidate = {
      protocol_version: PROTOCOL_VERSION, event_id: "event-task24-build-delegate", session_id: snapshot.sessionId,
      parent_event_id: null, sender_execution_id: identity.execution_id,
      receiver_execution_id: input.envelope.executions[1]!.execution_id,
      sender_role: identity.role, sender_surface: identity.surface, sender_model: identity.model, sender_provider: identity.provider,
      task_envelope_hash: snapshot.taskEnvelopeHash, repository_fingerprint: snapshot.repositoryFingerprint,
      event_type: "message" as const, payload_hash: sha256CanonicalSync(payload), payload,
      created_at: "2026-10-23T00:00:00Z", previous_event_hash: ledger.verify().head,
    };
    await expect(adapter.client.publish(candidate)).resolves.toMatchObject({ ok: true, commandId: candidate.event_id });
    const rows = ledger.readAfter(0);
    expect(rows).toHaveLength(before.length + 1);
    expect(rows.filter(row => row.event_id === candidate.event_id)).toHaveLength(1);
    expect(JSON.parse(rows.at(-1)!.event_json)).toEqual(candidate);
    expect(ledger.verify().valid).toBe(true);
  } finally {
    await session.close();
  }
  expect(existsSync(session.storage.sessionDir)).toBe(false);
}, 20_000);

test("an adapter client from the build publishes a legal incident through its broker delegate", async () => {
  const { session, input, result } = await captureFixtureBuild();
  try {
    const adapter = result.state.adapters[0]!;
    const identity = input.envelope.executions.find(value => value.execution_id === adapter.executionId)!;
    const snapshot = await adapter.client.getSnapshot();
    expect(snapshot.phase).toBe("active");
    const ledger = result.state.ledger!;
    const before = ledger.readAfter(0).length;
    const payload = { incident_id: "incident-task25-build-delegate", reason: "synthetic incident", severity: "high" };
    const candidate = {
      protocol_version: PROTOCOL_VERSION, event_id: "event-task25-build-delegate", session_id: snapshot.sessionId,
      parent_event_id: null, sender_execution_id: identity.execution_id,
      receiver_execution_id: input.envelope.executions[1]!.execution_id,
      sender_role: identity.role, sender_surface: identity.surface, sender_model: identity.model, sender_provider: identity.provider,
      task_envelope_hash: snapshot.taskEnvelopeHash, repository_fingerprint: snapshot.repositoryFingerprint,
      event_type: "incident" as const, payload_hash: sha256CanonicalSync(payload), payload,
      created_at: "2026-10-25T00:00:00Z", previous_event_hash: ledger.verify().head,
    };
    await expect(adapter.client.publish(candidate)).resolves.toEqual({ ok: true, commandId: candidate.event_id, acceptedSnapshotSeq: 1 });
    const rows = ledger.readAfter(before);
    expect(rows.map(row => JSON.parse(row.event_json).event_type)).toEqual([
      "incident", "session_interrupted", "fencing_token_invalidated", "session_closing", "session_closed",
    ]);
    expect(JSON.parse(rows[0]!.event_json)).toEqual(candidate);
    expect(JSON.parse(rows[1]!.event_json)).toMatchObject({ event_type: "session_interrupted", payload: { source_event_id: candidate.event_id } });
    expect(ledger.verify().valid).toBe(true);
  } finally {
    // The incident already closed the broker; the fixture still owns resource cleanup.
    const cleanup = (await session.client.getSnapshot()).phase === "closed"
      ? spyOn(RuntimeBroker.prototype, "founderClose").mockResolvedValue(undefined) : null;
    try { await session.close(); } finally { cleanup?.mockRestore(); }
  }
  expect(existsSync(session.storage.sessionDir)).toBe(false);
}, 20_000);
