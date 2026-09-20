// packages/broker/test/command-legality.test.ts
// Phase 3A M9 Task 21: the pinned command legality matrix (specification
// section 9.3; plan Task 21). Twenty-one named tests: three added by the
// 2026-09-17 Founder amendment (the F1 unknown-field closure, clause A's
// readiness limb, clause B's fencing-token positivity limb), ten matrix
// rows, four retained, four originally-new (execution_not_found,
// invalid_dimensions, invalid_command precedence, and the D7 non-writer
// negative proof).

import { expect, test } from "bun:test";
import { evaluateCommandLegality } from "../src/command-legality";
import type { BrokerCommand, BrokerSnapshot, ClientPrincipal, ExecutionSnapshot } from "../src/client";
import { PROTOCOL_VERSION, parseSurfaceId } from "@madventures/protocol";
import type { ExecutionIdentity, RepositoryFingerprint, TaskEnvelopeV1 } from "@madventures/protocol";

// ─── Fixtures ───

const SESSION_ID = "ses-legality-001";
const EXECUTION_ID = "exec-legality-001";
const OTHER_EXECUTION_ID = "exec-legality-002";
const CURRENT_TOKEN = 7;

const FOUNDER_PRINCIPAL: ClientPrincipal = { kind: "founder_tui" };
const EXECUTION_PRINCIPAL: ClientPrincipal = { kind: "execution", executionId: EXECUTION_ID };

const EXECUTION_IDENTITY: ExecutionIdentity = {
  execution_id: EXECUTION_ID,
  role: "builder",
  surface: parseSurfaceId("claude-code"),
  model: "model-legality",
  provider: "provider-legality",
  independence_domain: "domain-a",
  effort: "medium",
};

const OTHER_EXECUTION_IDENTITY: ExecutionIdentity = {
  execution_id: OTHER_EXECUTION_ID,
  role: "builder",
  surface: parseSurfaceId("claude-code"),
  model: "model-legality",
  provider: "provider-legality",
  independence_domain: "domain-b",
  effort: "medium",
};

const REPOSITORY_FINGERPRINT: RepositoryFingerprint = {
  kind: "commit",
  sha256: "a".repeat(64),
  git_sha: "b".repeat(40),
};

const TASK_ENVELOPE: TaskEnvelopeV1 = {
  protocol_version: PROTOCOL_VERSION,
  task_id: "task-legality-001",
  authorization_reference: "ACT-legality-001",
  repository: "MADVenturesLLC/madventures-tui",
  branch: "build/m9-task21-r1",
  worktree: "/fixtures/legality",
  repository_fingerprint: REPOSITORY_FINGERPRINT,
  executions: [EXECUTION_IDENTITY, OTHER_EXECUTION_IDENTITY],
  initial_writer: EXECUTION_ID,
  scope: {
    allowedReadPaths: ["docs/"],
    allowedWritePaths: ["packages/broker/"],
    allowedCommandCategories: ["read", "write", "test"],
    allowedArtifactCategories: ["code", "test-result"],
    maxArtifactSizeBytes: 1048576,
    dataClass: "internal",
    allowedEgressDestinations: [],
  },
  pair_constraints: {
    required_roles: ["builder", "independent-reviewer"],
    require_distinct_providers: true,
    require_distinct_independence_domains: true,
    prohibit_self_review: true,
  },
  expires_at: "2026-12-31T00:00:00Z",
  created_at: "2026-09-15T00:00:00Z",
  envelope_hash: "c".repeat(64),
};

/**
 * A complete, otherwise-legal BrokerSnapshot: `phase` "active", no incident,
 * `activeWriterExecutionId` bound to EXECUTION_ID, `fencingToken` the
 * current positive token. Every test overrides only the fields its row
 * needs, per the load-bearing fixture requirement: `snapshot.executions`
 * always contains the command's executionId, and `activeWriterExecutionId`
 * always equals it, unless the test is specifically proving predicate 4 or 5.
 */
function baseSnapshot(overrides: Partial<BrokerSnapshot> = {}): BrokerSnapshot {
  return {
    sessionId: SESSION_ID,
    snapshotSeq: 1,
    connected: true,
    phase: "active",
    taskEnvelopeHash: "d".repeat(64),
    task: TASK_ENVELOPE,
    repositoryFingerprint: REPOSITORY_FINGERPRINT,
    executions: [
      {
        identity: EXECUTION_IDENTITY,
        state: "ready",
        hostPid: 4242,
        childPid: 4243,
        processGroupId: 4242,
        executablePath: "/fixtures/bun",
        executableSha256: "e".repeat(64),
        exitCode: null,
        exitSignal: null,
      },
      {
        identity: OTHER_EXECUTION_IDENTITY,
        state: "ready",
        hostPid: 5252,
        childPid: 5253,
        processGroupId: 5252,
        executablePath: "/fixtures/bun",
        executableSha256: "f".repeat(64),
        exitCode: null,
        exitSignal: null,
      },
    ],
    activeWriterExecutionId: EXECUTION_ID,
    fencingToken: CURRENT_TOKEN,
    tokenState: "valid",
    pendingApprovals: [],
    pendingTransfers: [],
    permissionSummary: {
      allowedReadPaths: ["docs/"],
      allowedWritePaths: ["packages/broker/"],
      allowedCommandCategories: ["read", "write", "test"],
      allowedEgressDestinations: [],
      dataClass: "internal",
    },
    ownershipState: { kind: "free" },
    verification: null,
    review: null,
    incident: null,
    eventLog: [],
    queueDepth: 0,
    ledgerSeq: 0,
    ...overrides,
  };
}

/**
 * Like baseSnapshot(), but with EXECUTION_ID's own ExecutionSnapshot entry
 * state overridden — for clause A's readiness limb. Everything else stays
 * fully legal (active, no incident, current positive token, active writer).
 */
function baseSnapshotWithExecutionState(state: ExecutionSnapshot["state"]): BrokerSnapshot {
  const snapshot = baseSnapshot();
  return {
    ...snapshot,
    executions: (snapshot.executions ?? []).map((execution) =>
      execution.identity.execution_id === EXECUTION_ID ? { ...execution, state } : execution,
    ),
  };
}

function ptyInput(overrides: Partial<Extract<BrokerCommand, { kind: "pty_input" }>> = {}): BrokerCommand {
  return {
    kind: "pty_input",
    commandId: "cmd-1",
    sessionId: SESSION_ID,
    executionId: EXECUTION_ID,
    fencingToken: CURRENT_TOKEN,
    bytes: new Uint8Array([1]),
    ...overrides,
  };
}

function ptyResize(overrides: Partial<Extract<BrokerCommand, { kind: "pty_resize" }>> = {}): BrokerCommand {
  return {
    kind: "pty_resize",
    commandId: "cmd-2",
    sessionId: SESSION_ID,
    executionId: EXECUTION_ID,
    fencingToken: CURRENT_TOKEN,
    cols: 80,
    rows: 24,
    ...overrides,
  };
}

function ptyTerminate(overrides: Partial<Extract<BrokerCommand, { kind: "pty_terminate" }>> = {}): BrokerCommand {
  return {
    kind: "pty_terminate",
    commandId: "cmd-3",
    sessionId: SESSION_ID,
    executionId: EXECUTION_ID,
    reason: "founder_request",
    ...overrides,
  };
}

function approvalResolve(overrides: Partial<Extract<BrokerCommand, { kind: "approval_resolve" }>> = {}): BrokerCommand {
  return {
    kind: "approval_resolve",
    commandId: "cmd-4",
    sessionId: SESSION_ID,
    approvalId: "appr-1",
    decision: "accept",
    ...overrides,
  };
}

function sessionPause(overrides: Partial<Extract<BrokerCommand, { kind: "session_pause" }>> = {}): BrokerCommand {
  return {
    kind: "session_pause",
    commandId: "cmd-5",
    sessionId: SESSION_ID,
    reason: "founder paused",
    ...overrides,
  };
}

function sessionResume(overrides: Partial<Extract<BrokerCommand, { kind: "session_resume" }>> = {}): BrokerCommand {
  return {
    kind: "session_resume",
    commandId: "cmd-6",
    sessionId: SESSION_ID,
    ...overrides,
  };
}

function sessionClose(overrides: Partial<Extract<BrokerCommand, { kind: "session_close" }>> = {}): BrokerCommand {
  return {
    kind: "session_close",
    commandId: "cmd-7",
    sessionId: SESSION_ID,
    reason: "founder closed",
    ...overrides,
  };
}

const ACTIVE_INCIDENT = {
  id: "incident-1",
  reason: "adversarial anomaly",
  timestamp: "2026-09-17T00:00:00Z",
  severity: "high" as const,
};

// ─── Three added by the 2026-09-17 Founder amendment (lead the named order) ───

test("a known command kind carrying an unknown field fails with invalid_command before any other predicate", () => {
  // Fixture is otherwise fully legal: correct sessionId, executionId present
  // in snapshot.executions and equal to activeWriterExecutionId, active
  // phase, no incident, current fencing token — so if predicate 1's field
  // check did not fire, this command would legally succeed. One extra,
  // unrecognized field is enough to trigger the rejection.
  const withExtraField = {
    ...ptyInput({ sessionId: SESSION_ID, executionId: EXECUTION_ID, fencingToken: CURRENT_TOKEN }),
    extra: true,
  } as unknown as BrokerCommand;
  const result = evaluateCommandLegality(
    withExtraField,
    baseSnapshot({ sessionId: SESSION_ID, activeWriterExecutionId: EXECUTION_ID, fencingToken: CURRENT_TOKEN, phase: "active", incident: null }),
    FOUNDER_PRINCIPAL,
  );
  expect(result).toEqual({ ok: false, error: "invalid_command", detail: "unknown field on command" });
});

test("a writer-only command against a non-ready execution fails with invariant_failure", () => {
  // Clause A. The table drives every non-ready member of the seven-member
  // ExecutionSnapshot.state union, plus "ready" retained as the legal
  // control that must still succeed. The fixture is otherwise fully legal
  // AND carries the current positive fencing token, so that if the
  // readiness check did not fire the command would legally succeed. A test
  // that varies one unnamed non-ready state does not prove clause A.
  const nonReadyStates: readonly ExecutionSnapshot["state"][] = [
    "declared",
    "host-starting",
    "launching",
    "attesting",
    "exited",
    "failed",
  ];
  for (const state of nonReadyStates) {
    const result = evaluateCommandLegality(
      ptyInput({ executionId: EXECUTION_ID, fencingToken: CURRENT_TOKEN }),
      baseSnapshotWithExecutionState(state),
      FOUNDER_PRINCIPAL,
    );
    expect(result).toEqual({ ok: false, error: "invariant_failure", detail: "target execution is not ready" });
  }
  // The legal control: "ready" must still succeed.
  const ready = evaluateCommandLegality(
    ptyInput({ executionId: EXECUTION_ID, fencingToken: CURRENT_TOKEN }),
    baseSnapshotWithExecutionState("ready"),
    FOUNDER_PRINCIPAL,
  );
  expect(ready).toEqual({ ok: true });
});

test("a non-positive supplied fencing token fails with stale_fencing_token", () => {
  // Clause B. Every row presents its value on BOTH the command and the
  // snapshot and is otherwise fully legal, so equality alone would let it
  // pass; a table fixed at 0 alone would not prove the rule is
  // Number.isSafeInteger(token) && token > 0.
  const badTokens = [0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, Number.MAX_SAFE_INTEGER + 1];
  for (const badToken of badTokens) {
    const result = evaluateCommandLegality(
      ptyInput({ executionId: EXECUTION_ID, fencingToken: badToken }),
      baseSnapshot({ activeWriterExecutionId: EXECUTION_ID, fencingToken: badToken }),
      FOUNDER_PRINCIPAL,
    );
    expect(result).toEqual({ ok: false, error: "stale_fencing_token", detail: "fencing token is not the current token" });
  }
});

test("a writer-only command against executions: null fails with invariant_failure before readiness is evaluated", () => {
  // D9 Part B item 12 makes `executions` nullable: `null` means the projection
  // did not produce the collection, which is NOT the same as producing an empty
  // one. A writer-only command cannot be adjudicated without it, so it fails
  // closed at predicate 4 — before clause A's readiness limb is reached. The
  // fixture is otherwise fully legal and carries the current positive token on
  // both command and snapshot, so a command that reached readiness would
  // succeed; only the null collection refuses it. pty_terminate is deliberately
  // NOT exercised here: it stays ungated, and asserting it would invert the
  // ruling.
  const result = evaluateCommandLegality(
    ptyInput({ executionId: EXECUTION_ID, fencingToken: CURRENT_TOKEN }),
    baseSnapshot({
      sessionId: SESSION_ID,
      executions: null,
      activeWriterExecutionId: EXECUTION_ID,
      fencingToken: CURRENT_TOKEN,
      phase: "active",
      incident: null,
    }),
    FOUNDER_PRINCIPAL,
  );
  expect(result).toEqual({
    ok: false,
    error: "invariant_failure",
    detail: "executions not produced by the snapshot",
  });
});

// ─── Ten matrix rows ───

test("legality row: pty_input in any non-active phase yields session_not_writable", () => {
  const result = evaluateCommandLegality(ptyInput(), baseSnapshot({ phase: "starting" }), FOUNDER_PRINCIPAL);
  expect(result).toEqual({ ok: false, error: "session_not_writable", detail: "session phase does not accept PTY input" });
});

test("legality row: pty_input in active + incident yields incident_active", () => {
  const result = evaluateCommandLegality(
    ptyInput(),
    baseSnapshot({ phase: "active", incident: ACTIVE_INCIDENT }),
    FOUNDER_PRINCIPAL,
  );
  expect(result).toEqual({ ok: false, error: "incident_active", detail: "an incident is active" });
});

test("legality row: pty_terminate in closed yields session_not_writable", () => {
  const result = evaluateCommandLegality(ptyTerminate(), baseSnapshot({ phase: "closed" }), FOUNDER_PRINCIPAL);
  expect(result).toEqual({ ok: false, error: "session_not_writable", detail: "session is already closed" });
});

test("legality row: approval_resolve in active + incident yields incident_active", () => {
  const result = evaluateCommandLegality(
    approvalResolve(),
    baseSnapshot({ phase: "active", incident: ACTIVE_INCIDENT }),
    FOUNDER_PRINCIPAL,
  );
  expect(result).toEqual({ ok: false, error: "incident_active", detail: "an incident is active" });
});

test("legality row: approval_resolve in any non-active phase yields session_not_writable", () => {
  const result = evaluateCommandLegality(approvalResolve(), baseSnapshot({ phase: "paused" }), FOUNDER_PRINCIPAL);
  expect(result).toEqual({ ok: false, error: "session_not_writable", detail: "session phase does not accept this command" });
});

test("legality row: session_pause in active + incident yields incident_active", () => {
  const result = evaluateCommandLegality(
    sessionPause(),
    baseSnapshot({ phase: "active", incident: ACTIVE_INCIDENT }),
    FOUNDER_PRINCIPAL,
  );
  expect(result).toEqual({ ok: false, error: "incident_active", detail: "an incident is active" });
});

test("legality row: session_pause in any other phase yields session_not_writable", () => {
  const result = evaluateCommandLegality(sessionPause(), baseSnapshot({ phase: "interrupted" }), FOUNDER_PRINCIPAL);
  expect(result).toEqual({ ok: false, error: "session_not_writable", detail: "session phase does not accept this command" });
});

test("legality row: session_resume in any other phase yields session_not_writable", () => {
  const result = evaluateCommandLegality(sessionResume(), baseSnapshot({ phase: "active" }), FOUNDER_PRINCIPAL);
  expect(result).toEqual({ ok: false, error: "session_not_writable", detail: "session phase does not accept this command" });
});

test("legality row: session_close in active + incident yields incident_active", () => {
  const result = evaluateCommandLegality(
    sessionClose(),
    baseSnapshot({ phase: "active", incident: ACTIVE_INCIDENT }),
    FOUNDER_PRINCIPAL,
  );
  expect(result).toEqual({ ok: false, error: "incident_active", detail: "an incident is active" });
});

test("legality row: session_close in any other phase yields session_not_writable", () => {
  const result = evaluateCommandLegality(sessionClose(), baseSnapshot({ phase: "closing" }), FOUNDER_PRINCIPAL);
  expect(result).toEqual({ ok: false, error: "session_not_writable", detail: "session phase does not accept this command" });
});

// ─── Four retained ───

test("a paused session retains its token but rejects pty_input with session_not_writable", () => {
  const result = evaluateCommandLegality(
    ptyInput({ fencingToken: CURRENT_TOKEN }),
    baseSnapshot({ phase: "paused", fencingToken: CURRENT_TOKEN }),
    FOUNDER_PRINCIPAL,
  );
  expect(result.ok).toBe(false);
  expect(result).toEqual({ ok: false, error: "session_not_writable", detail: "session phase does not accept PTY input" });
});

test("pty_terminate is legal during interrupted and closing but not after closed", () => {
  const interrupted = evaluateCommandLegality(ptyTerminate(), baseSnapshot({ phase: "interrupted" }), FOUNDER_PRINCIPAL);
  expect(interrupted).toEqual({ ok: true });
  const closing = evaluateCommandLegality(ptyTerminate(), baseSnapshot({ phase: "closing" }), FOUNDER_PRINCIPAL);
  expect(closing).toEqual({ ok: true });
  const closed = evaluateCommandLegality(ptyTerminate(), baseSnapshot({ phase: "closed" }), FOUNDER_PRINCIPAL);
  expect(closed).toEqual({ ok: false, error: "session_not_writable", detail: "session is already closed" });
});

test("an execution principal cannot issue a Founder governance command", () => {
  const result = evaluateCommandLegality(sessionPause(), baseSnapshot(), EXECUTION_PRINCIPAL);
  expect(result.ok).toBe(false);
  expect(result).toEqual({ ok: false, error: "unauthorized", detail: "execution principal cannot issue a governance command" });
});

test("a stale fencing token yields stale_fencing_token, not session_not_writable", () => {
  // Fixture is otherwise fully legal, INCLUDING active-writer identity, so
  // predicate 7 (the token check) is the one that fires.
  const result = evaluateCommandLegality(
    ptyInput({ fencingToken: CURRENT_TOKEN - 1, executionId: EXECUTION_ID }),
    baseSnapshot({ phase: "active", activeWriterExecutionId: EXECUTION_ID, fencingToken: CURRENT_TOKEN }),
    FOUNDER_PRINCIPAL,
  );
  expect(result.ok).toBe(false);
  expect(result).not.toEqual({ ok: false, error: "session_not_writable", detail: "session phase does not accept PTY input" });
  expect(result).toEqual({ ok: false, error: "stale_fencing_token", detail: "fencing token is not the current token" });
});

// ─── Four new ───

test("a command naming an execution absent from the snapshot fails with execution_not_found", () => {
  const result = evaluateCommandLegality(
    ptyTerminate({ executionId: "exec-does-not-exist" }),
    baseSnapshot(),
    FOUNDER_PRINCIPAL,
  );
  expect(result).toEqual({ ok: false, error: "execution_not_found", detail: "named execution is absent from the snapshot" });
});

test("a resize carrying a non-positive or non-integer dimension fails with invalid_dimensions", () => {
  const badValues = [0, -1, 1.5, Number.MAX_SAFE_INTEGER + 1];
  for (const bad of badValues) {
    const badCols = evaluateCommandLegality(ptyResize({ cols: bad }), baseSnapshot(), FOUNDER_PRINCIPAL);
    expect(badCols).toEqual({ ok: false, error: "invalid_dimensions", detail: "resize dimensions must be positive safe integers" });
    const badRows = evaluateCommandLegality(ptyResize({ rows: bad }), baseSnapshot(), FOUNDER_PRINCIPAL);
    expect(badRows).toEqual({ ok: false, error: "invalid_dimensions", detail: "resize dimensions must be positive safe integers" });
  }
});

test("an unknown command variant fails with invalid_command before any other predicate", () => {
  // Simultaneously malformed (unknown kind) AND would-be-unauthorized (an
  // execution principal, a governance-shaped payload): invalid_command must
  // win, because predicate 1 precedes predicate 2.
  const malformed = {
    kind: "session_teleport",
    commandId: "cmd-malformed",
    sessionId: SESSION_ID,
  } as unknown as BrokerCommand;
  const result = evaluateCommandLegality(malformed, baseSnapshot(), EXECUTION_PRINCIPAL);
  expect(result).toEqual({ ok: false, error: "invalid_command", detail: "unknown command variant" });
});

test("a non-writer execution cannot send PTY input with the current session fencing token", () => {
  // The D7 negative proof. Four distinct values: SESSION_ID, the snapshot's
  // activeWriterExecutionId (EXECUTION_ID), a DIFFERENT existing execution
  // (OTHER_EXECUTION_ID), and the snapshot's exact current positive token
  // (CURRENT_TOKEN) presented on the command — so the rejection cannot be
  // satisfied by a stale-fencing check.
  const result = evaluateCommandLegality(
    ptyInput({ sessionId: SESSION_ID, executionId: OTHER_EXECUTION_ID, fencingToken: CURRENT_TOKEN }),
    baseSnapshot({ sessionId: SESSION_ID, activeWriterExecutionId: EXECUTION_ID, fencingToken: CURRENT_TOKEN }),
    FOUNDER_PRINCIPAL,
  );
  expect(result).toEqual({ ok: false, error: "unauthorized", detail: "execution is not the active writer" });
});
