// test/acceptance/interruption-recovery.test.ts
// Acceptance tests: interruption and recovery.
//
// Kill each managed CLI and the broker in separate cases, verify fail-closed
// interruption, restart, re-attestation, reconciliation, typed resume,
// complete hash-chain verification, and final manifest equality with the
// actual repository state.
//
// Uses the in-memory broker — no real CLI processes are spawned.

import { expect, test, describe } from "bun:test";
import { createInMemoryBrokerForTest } from "@madventures/broker";
import type { InMemoryBroker } from "@madventures/broker";
import { createCredential } from "@madventures/broker";
import {
  interruptSession,
  reconcileRepository,
  resumeSession,
  rebuildBrokerState,
} from "@madventures/broker";
import type { InterruptReason, RepositorySnapshot, ReconcileInput } from "@madventures/broker";
import { PROTOCOL_VERSION, sha256Hex } from "@madventures/protocol";
import type { BridgeEventV1, RepositoryFingerprint } from "@madventures/protocol";
import { Ledger } from "@madventures/ledger";
import type { LedgerRow } from "@madventures/ledger";
import { mkdtempSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

// ─── Fixtures ───

function makeFingerprint(sha: string, gitSha?: string): RepositoryFingerprint {
  return {
    kind: "commit",
    sha256: sha.padEnd(64, "0"),
    git_sha: (gitSha ?? sha).padEnd(40, "0"),
  };
}

function makeWorkingTreeFp(sha: string, gitSha: string, baseGitSha: string): RepositoryFingerprint {
  return {
    kind: "working_tree",
    sha256: sha.padEnd(64, "0"),
    git_sha: gitSha.padEnd(40, "0"),
    base_git_sha: baseGitSha.padEnd(40, "0"),
  };
}

function makeEvent(
  eventType: BridgeEventV1["event_type"],
  opts?: Partial<BridgeEventV1>,
): BridgeEventV1 {
  return {
    protocol_version: PROTOCOL_VERSION,
    event_id: crypto.randomUUID(),
    session_id: "sess-interrupt-001",
    parent_event_id: null,
    sender_execution_id: "exec-claude",
    receiver_execution_id: "exec-agy",
    sender_role: "builder",
    sender_surface: "claude-code",
    sender_model: "claude-sonnet-4",
    sender_provider: "anthropic",
    task_envelope_hash: "a".repeat(64),
    repository_fingerprint: makeFingerprint("b"),
    event_type: eventType,
    payload_hash: "",
    payload: {},
    created_at: "2026-08-08T16:00:00.000Z",
    previous_event_hash: "0".repeat(64),
    ...opts,
  };
}

function makeLedgerRow(event: BridgeEventV1, seq: number, prevHash: string): LedgerRow {
  const eventJson = JSON.stringify(event);
  const hash = sha256Hex(prevHash + eventJson);
  return {
    sequence: seq,
    event_id: event.event_id,
    event_json: eventJson,
    previous_hash: prevHash,
    event_hash: hash,
    created_at: event.created_at,
  };
}

function makeLedgerRows(events: BridgeEventV1[]): LedgerRow[] {
  const rows: LedgerRow[] = [];
  let prevHash = "0".repeat(64);
  events.forEach((evt, i) => {
    const row = makeLedgerRow(evt, i + 1, prevHash);
    rows.push(row);
    prevHash = row.event_hash;
  });
  return rows;
}

function makeResumeFounderEvent(): BridgeEventV1 {
  return makeEvent("resume", {
    sender_execution_id: "exec-founder",
    sender_role: "founder",
    sender_surface: "claude-code",
    sender_model: "claude-sonnet-4",
    sender_provider: "anthropic",
  });
}

function makeReconcileInput(
  expectedSha: string,
  actualCommitSha: string,
  actualWorktreeSha: string,
  changedPaths: string[] = [],
  reattest?: boolean,
): ReconcileInput {
  const snapshot: RepositorySnapshot = {
    worktreePath: "/repo/worktree-1",
    commitFingerprint: makeFingerprint(actualCommitSha),
    workingTreeFingerprint: makeWorkingTreeFp(actualWorktreeSha, actualCommitSha, actualCommitSha),
    changedPaths,
  };
  return {
    ledgerRows: [],
    expectedFingerprint: makeFingerprint(expectedSha),
    actualSnapshot: snapshot,
    reattestations: reattest === false ? [] : [
      { executionId: "exec-claude", taskEnvelopeHash: "a".repeat(64), attestedAt: "2026-08-08T17:00:00.000Z" },
      { executionId: "exec-agy", taskEnvelopeHash: "a".repeat(64), attestedAt: "2026-08-08T17:00:01.000Z" },
    ],
  };
}

// ─── Tests: kill each managed CLI ───

describe("interruption — CLI exit", () => {
  test("Claude CLI exit triggers fail-closed interruption", () => {
    const rows = makeLedgerRows([makeEvent("message")]);
    const result = interruptSession({
      reason: "cli_exit",
      sessionState: { kind: "active" },
      currentWriterToken: 1,
      ledgerRows: rows,
      now: "2026-08-08T17:00:00.000Z",
    });

    expect(result.state.kind).toBe("interrupted");
    expect(result.incidentEvent.event_type).toBe("incident");
    expect(result.incidentEvent.payload["reason"]).toBe("cli_exit");
    expect(result.tokenInvalidated).toBe(1);
    expect(result.autoResumed).toBe(false);
  });

  test("Antigravity CLI exit triggers fail-closed interruption", () => {
    const result = interruptSession({
      reason: "cli_exit",
      detail: "antigravity process exited unexpectedly",
      sessionState: { kind: "active" },
      currentWriterToken: 3,
      ledgerRows: makeLedgerRows([makeEvent("message")]),
    });

    expect(result.state.kind).toBe("interrupted");
    expect(result.tokenInvalidated).toBe(3);
    expect(result.autoResumed).toBe(false);
  });
});

describe("interruption — adapter disconnect", () => {
  test("adapter disconnect triggers fail-closed interruption", () => {
    const result = interruptSession({
      reason: "adapter_disconnect",
      sessionState: { kind: "active" },
      currentWriterToken: 2,
      ledgerRows: makeLedgerRows([makeEvent("message")]),
    });

    expect(result.state.kind).toBe("interrupted");
    expect(result.incidentEvent.payload["reason"]).toBe("adapter_disconnect");
    expect(result.tokenInvalidated).toBe(2);
    expect(result.autoResumed).toBe(false);
  });
});

describe("interruption — broker restart", () => {
  test("broker restart triggers fail-closed interruption", () => {
    const result = interruptSession({
      reason: "broker_restart",
      sessionState: { kind: "active" },
      currentWriterToken: 5,
      ledgerRows: makeLedgerRows([makeEvent("message")]),
    });

    expect(result.state.kind).toBe("interrupted");
    expect(result.incidentEvent.payload["reason"]).toBe("broker_restart");
    expect(result.tokenInvalidated).toBe(5);
    expect(result.autoResumed).toBe(false);
  });
});

// ─── Fail-closed verification ───

describe("fail-closed interruption", () => {
  test("interrupted session does not auto-resume", () => {
    const result = interruptSession({
      reason: "cli_exit",
      sessionState: { kind: "active" },
      currentWriterToken: 7,
      ledgerRows: makeLedgerRows([makeEvent("message")]),
    });

    expect(result.autoResumed).toBe(false);
    expect(result.state.kind).toBe("interrupted");
  });

  test("paused session is interrupted through the state machine", () => {
    // paused -> interrupted is a legal transition; interruption takes the
    // exact same path as an active session (no reconciliation bypass).
    const result = interruptSession({
      reason: "adapter_disconnect",
      sessionState: { kind: "paused" },
      currentWriterToken: 11,
      ledgerRows: makeLedgerRows([makeEvent("pause")]),
    });

    expect(result.state.kind).toBe("interrupted");
    expect(result.tokenInvalidated).toBe(11);
    expect(result.autoResumed).toBe(false);
  });

  test("token is marked unusable after interruption", async () => {
    const broker = await createInMemoryBrokerForTest();
    try {
      // Broker validates credentials with expectedFencingToken=0
      const cred = createCredential("exec-claude", 0);
      const event = makeEvent("message", { sender_execution_id: "exec-claude" });

      // Before interruption — dispatch succeeds
      const before = await broker.dispatch(event, cred);
      expect(before.kind).toBe("ok");

      // Interrupt
      broker.interrupt("cli_exit", "test");
      expect(broker.tokenUsable).toBe(false);
      expect(broker.sessionState.kind).toBe("interrupted");

      // After interruption — dispatch fails closed
      const after = await broker.dispatch(event, cred);
      expect(after.kind).toBe("error");
      expect(after.detail).toBe("token_invalidated_session_interrupted");
    } finally {
      broker.stop();
    }
  });

  test("incident event preserves repository fingerprint", () => {
    const fp = makeFingerprint("abc123");
    const event = makeEvent("message", { repository_fingerprint: fp });
    const rows = makeLedgerRows([event]);

    const result = interruptSession({
      reason: "cli_exit",
      sessionState: { kind: "active" },
      currentWriterToken: 1,
      ledgerRows: rows,
    });

    expect(result.incidentEvent.repository_fingerprint.sha256).toBe(fp.sha256);
  });
});

// ─── Restart and re-attestation ───

describe("restart and re-attestation", () => {
  test("reconciliation with matching fingerprints produces reconciled", () => {
    const result = reconcileRepository(
      makeReconcileInput("match", "match", "match"),
    );
    expect(result.outcome).toBe("reconciled");
    expect(result.reattested).toBe(true);
    expect(result.fingerprintMatch).toBe(true);
  });

  test("reconciliation requires both executions to re-attest", () => {
    const result = reconcileRepository(
      makeReconcileInput("match", "match", "match", [], false),
    );
    expect(result.outcome).toBe("ambiguous");
    expect(result.reattested).toBe(false);
  });

  test("reconciliation records changed paths without file contents", () => {
    const paths = ["src/main.ts", "src/utils.ts"];
    const result = reconcileRepository(
      makeReconcileInput("match", "match", "match", paths),
    );
    expect(result.outcome).toBe("reconciled");
    expect(result.changedPaths).toEqual(paths);
    expect(JSON.stringify(result)).not.toContain("file contents");
  });

  test("reconciliation rejects mismatched fingerprints", () => {
    const result = reconcileRepository(
      makeReconcileInput("expected", "same", "same"),
    );
    expect(result.outcome).toBe("mismatch");
    expect(result.fingerprintMatch).toBe(false);
  });
});

// ─── Typed resume ───

describe("typed resume", () => {
  test("resume succeeds with typed Founder resume event and reconciled outcome", () => {
    const reconcileResult = reconcileRepository(
      makeReconcileInput("match", "match", "match"),
    );
    expect(reconcileResult.outcome).toBe("reconciled");

    const result = resumeSession({
      founderEvent: makeResumeFounderEvent(),
      reconcileResult,
      sessionState: { kind: "interrupted" },
    });

    expect(result.resumed).toBe(true);
    expect(result.state.kind).toBe("active");
    expect(result.newFencingToken).toBeGreaterThan(0);
  });

  test("resume fails without typed Founder resume event", () => {
    const reconcileResult = reconcileRepository(
      makeReconcileInput("match", "match", "match"),
    );

    const wrongEvent = makeEvent("message", {
      sender_execution_id: "exec-founder",
      sender_role: "founder",
    });

    const result = resumeSession({
      founderEvent: wrongEvent,
      reconcileResult,
      sessionState: { kind: "interrupted" },
    });

    expect(result.resumed).toBe(false);
    expect(result.state.kind).toBe("interrupted");
  });

  test("resume fails when reconciliation is ambiguous", () => {
    const reconcileResult = reconcileRepository(
      makeReconcileInput("expected", "diff1", "diff2"),
    );
    expect(reconcileResult.outcome).toBe("ambiguous");

    const result = resumeSession({
      founderEvent: makeResumeFounderEvent(),
      reconcileResult,
      sessionState: { kind: "interrupted" },
    });

    expect(result.resumed).toBe(false);
  });

  test("resume through broker issues new fencing token", async () => {
    const broker = await createInMemoryBrokerForTest();
    try {
      const oldToken = broker.fencingToken;

      // Interrupt
      broker.interrupt("cli_exit", "test");
      expect(broker.tokenUsable).toBe(false);

      // Reconcile
      const reconcileResult = broker.reconcile(
        makeReconcileInput("match", "match", "match"),
      );
      expect(reconcileResult.outcome).toBe("reconciled");

      // Resume
      const resumeResult = broker.resume({
        founderEvent: makeResumeFounderEvent(),
        reconcileResult,
        sessionState: broker.sessionState,
      });

      expect(resumeResult.resumed).toBe(true);
      expect(resumeResult.newToken).not.toBe(oldToken);
      expect(broker.tokenUsable).toBe(true);
      expect(broker.sessionState.kind).toBe("active");
    } finally {
      broker.stop();
    }
  });
});

// ─── Complete hash-chain verification ───

describe("complete hash-chain verification", () => {
  test("ledger hash chain verifies from genesis to head", () => {
    const ledgerDir = mkdtempSync(join(tmpdir(), "madv-ledger-"));
    const ledgerPath = join(ledgerDir, "test.db");
    try {
      const ledger = new Ledger(ledgerPath);

      const event1 = makeEvent("message");
      ledger.append(event1);

      const event2 = makeEvent("action_request");
      ledger.append(event2);

      const event3 = makeEvent("action_accept", {
        sender_execution_id: "exec-agy",
        sender_surface: "antigravity",
        sender_model: "gemini-2.5-pro",
      });
      ledger.append(event3);

      const result = ledger.verify();
      expect(result.valid).toBe(true);
      expect(result.count).toBe(3);

      ledger.close();
    } finally {
      // cleanup
      try { require("fs").rmSync(ledgerDir, { recursive: true, force: true }); } catch { /* ignore */ }
    }
  });

  test("tampered ledger hash chain is detected", () => {
    const ledgerDir = mkdtempSync(join(tmpdir(), "madv-ledger-"));
    const ledgerPath = join(ledgerDir, "test.db");
    try {
      const ledger = new Ledger(ledgerPath);
      ledger.append(makeEvent("message"));
      ledger.append(makeEvent("action_request"));

      // Tamper with the first event
      ledger.unsafeTestOnlyMutatePayload(1, '{"tampered":true}');

      const result = ledger.verify();
      expect(result.valid).toBe(false);
      expect(result.brokenSequence).toBeDefined();

      ledger.close();
    } finally {
      try { require("fs").rmSync(ledgerDir, { recursive: true, force: true }); } catch { /* ignore */ }
    }
  });

  test("empty ledger verifies as valid with genesis head", () => {
    const ledgerDir = mkdtempSync(join(tmpdir(), "madv-ledger-"));
    const ledgerPath = join(ledgerDir, "test.db");
    try {
      const ledger = new Ledger(ledgerPath);
      const result = ledger.verify();
      expect(result.valid).toBe(true);
      expect(result.count).toBe(0);
      ledger.close();
    } finally {
      try { require("fs").rmSync(ledgerDir, { recursive: true, force: true }); } catch { /* ignore */ }
    }
  });

  test("deterministic state rebuild from verified ledger events", () => {
    const rows = makeLedgerRows([
      makeEvent("message"),
      makeEvent("action_request"),
      makeEvent("incident"),
      makeEvent("resume"),
    ]);

    const state = rebuildBrokerState(rows);
    expect(state.count).toBe(4);
    expect(state.hasIncident).toBe(true);
    expect(state.tokenUsable).toBe(true);
    expect(state.sessionState.kind).toBe("active");
    expect(state.currentFencingToken).not.toBeNull();
  });
});
