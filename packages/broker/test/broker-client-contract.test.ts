// packages/broker/test/broker-client-contract.test.ts
// Phase 3A M9 Task 20: the closed BrokerClient command and snapshot contract
// (specification sections 9.3-9.4; plan Task 20).
//
// Invariants under test: the command union is closed at exactly seven kinds;
// the error-code union is closed at exactly fourteen values; BrokerSnapshot
// carries no transferPhase field; OutputFrame keys output identity on
// executionId and never on surfaceId. The contract is plain data — no PTY
// descriptor, process handle, or Ledger handle crosses it — and the broker
// OwnershipState is consumed from ../src/ownership-machine, never redeclared.
// The @ts-expect-error assertions are verified by tsc, not by bun test.

import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { BROKER_COMMAND_KINDS, BROKER_ERROR_CODES } from "../src/client";
import type { BrokerSnapshot, OutputFrame } from "../src/client";
import type { OwnershipState } from "../src/ownership-machine";
import { PROTOCOL_VERSION, parseSurfaceId } from "@madventures/protocol";
import type {
  ExecutionIdentity,
  RepositoryFingerprint,
  TaskEnvelopeV1,
} from "@madventures/protocol";

// ─── Fixtures ───

const SESSION_ID = "ses-contract-001";

const EXECUTION_IDENTITY: ExecutionIdentity = {
  execution_id: "exec-contract-001",
  role: "builder",
  surface: parseSurfaceId("claude-code"),
  model: "model-contract",
  provider: "provider-contract",
  independence_domain: "domain-a",
  effort: "medium",
};

const REPOSITORY_FINGERPRINT: RepositoryFingerprint = {
  kind: "commit",
  sha256: "a".repeat(64),
  git_sha: "b".repeat(40),
};

const TASK_ENVELOPE: TaskEnvelopeV1 = {
  protocol_version: PROTOCOL_VERSION,
  task_id: "task-contract-001",
  authorization_reference: "ACT-contract-001",
  repository: "MADVenturesLLC/madventures-tui",
  branch: "build/m9-task20-r1",
  worktree: "/fixtures/contract",
  repository_fingerprint: REPOSITORY_FINGERPRINT,
  executions: [EXECUTION_IDENTITY],
  initial_writer: "exec-contract-001",
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

// The existing Phase 2 broker ownership-state type, consumed from its single
// authoritative declaration in ../src/ownership-machine.
const OWNERSHIP_STATE: OwnershipState = { kind: "free" };

const SNAPSHOT: BrokerSnapshot = {
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
  ],
  activeWriterExecutionId: "exec-contract-001",
  fencingToken: 1,
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
  ownershipState: OWNERSHIP_STATE,
  verification: null,
  review: null,
  incident: null,
  eventLog: [],
  queueDepth: 0,
  ledgerSeq: 0,
};

// ─── Contract closure ───

test("the command union has exactly seven kinds", () => {
  expect(BROKER_COMMAND_KINDS.length).toBe(7);
  expect([...BROKER_COMMAND_KINDS]).toEqual([
    "pty_input",
    "pty_resize",
    "pty_terminate",
    "approval_resolve",
    "session_pause",
    "session_resume",
    "session_close",
  ]);
});

test("the error code union has exactly fourteen values", () => {
  expect(BROKER_ERROR_CODES.length).toBe(14);
  expect([...BROKER_ERROR_CODES]).toEqual([
    "invalid_command",
    "unauthorized",
    "session_mismatch",
    "execution_not_found",
    "identity_mismatch",
    "stale_fencing_token",
    "session_not_writable",
    "invalid_dimensions",
    "approval_not_pending",
    "incident_active",
    "reconciliation_required",
    "host_unavailable",
    "ledger_write_failed",
    "invariant_failure",
  ]);
});

test("the snapshot contract exposes no transferPhase field", () => {
  expect(SNAPSHOT.sessionId).toBe(SESSION_ID);
  expect("transferPhase" in SNAPSHOT).toBe(false);
  // tsc rejects a fresh BrokerSnapshot object literal carrying transferPhase:
  // every required field is written explicitly, so excess-property checking
  // evaluates transferPhase against BrokerSnapshot. The directive sits
  // directly above the prohibited property because TS2353 is reported at the
  // property's own line. The guard must stay used (verified by tsc; its
  // removal is proven to fail compilation by the negative proof).
  const rejected: BrokerSnapshot = {
    sessionId: SESSION_ID,
    snapshotSeq: 1,
    connected: true,
    phase: "active",
    taskEnvelopeHash: "d".repeat(64),
    task: TASK_ENVELOPE,
    repositoryFingerprint: REPOSITORY_FINGERPRINT,
    executions: SNAPSHOT.executions,
    activeWriterExecutionId: "exec-contract-001",
    fencingToken: 1,
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
    ownershipState: OWNERSHIP_STATE,
    verification: null,
    review: null,
    incident: null,
    eventLog: [],
    queueDepth: 0,
    ledgerSeq: 0,
    // @ts-expect-error transferPhase must not exist on BrokerSnapshot
    transferPhase: "offered",
  };
  void rejected;
});

test("output frames key on executionId and never on surfaceId", () => {
  const frame: OutputFrame = {
    sessionId: SESSION_ID,
    executionId: "exec-contract-001",
    outputSeq: 1,
    bytes: new Uint8Array([104, 105]),
  };
  expect(frame.executionId).toBe("exec-contract-001");
  expect("surfaceId" in frame).toBe(false);
  // tsc rejects an OutputFrame literal carrying surfaceId.
  // @ts-expect-error surfaceId must not exist on OutputFrame
  const rejected: OutputFrame = { ...frame, surfaceId: "surf-contract-001" };
  void rejected;
});

// The plan's Task 20 ownership rule: ownershipState references the existing
// Phase 2 broker type declared in ../src/ownership-machine — consumed, never
// redeclared. Runtime tuples cannot see a type alias, so this is proven by
// inspecting the production source: client.ts imports OwnershipState from
// ./ownership-machine and declares no ownership-state union of its own.
test("client.ts consumes the authoritative OwnershipState and declares no ownership union", () => {
  const source = readFileSync(join(import.meta.dir, "..", "src", "client.ts"), "utf8");
  const importMatches = source.match(/^import .*OwnershipState.*from "\.\/ownership-machine";$/gm) ?? [];
  expect(importMatches.length).toBe(1);
  expect(source).not.toMatch(/^export (?:type|interface) OwnershipState\b/m);
  expect(source).not.toMatch(/\btype OwnershipState\s*=/);
  expect(source).not.toMatch(/receiver-validating/);
});
