import { expect, test } from "bun:test";
import type { BrokerSnapshot as Source } from "@madventures/broker";
import { parseSurfaceId, type ExecutionIdentity, type TaskEnvelopeV1 } from "@madventures/protocol";
import { clientSnapshotToProjection as project } from "../../apps/madbridge/src/tui/live/projection";
import type { BrokerSnapshot as Projection } from "../../apps/madbridge/src/tui/types";
import { fingerprint, sparseSnapshot } from "./snapshot-input";

const empty: Projection = {
  connected: null, sessionState: "starting", ownershipState: null, activeWriter: null, fencingToken: null, task: null,
  executions: null, repositoryFingerprint: fingerprint, pendingApprovals: [], pendingTransfers: null,
  permissionSummary: null, transferPhase: null, verificationStatus: null, reviewStatus: null,
  incident: null, eventLog: [], queueDepth: null,
};
const identity: ExecutionIdentity = { execution_id: "second", role: "observer", surface: parseSurfaceId("sample"),
  model: "scripted", provider: "offline", independence_domain: "sample", effort: "low" };
const first: ExecutionIdentity = { ...identity, execution_id: "first", role: "builder", effort: "high" };
const identities = [first, identity];
const working = { ...fingerprint, kind: "working_tree", base_git_sha: "synthetic-base" } as const;
const task: TaskEnvelopeV1 = { protocol_version: "madbridge-protocol/v1", task_id: "task", authorization_reference: "",
  repository: "", branch: "", worktree: "", repository_fingerprint: working, executions: identities, initial_writer: "first",
  scope: { allowedReadPaths: [], allowedWritePaths: [], allowedCommandCategories: ["read"], allowedArtifactCategories: ["report"],
    maxArtifactSizeBytes: 1, dataClass: "confidential", allowedEgressDestinations: [] },
  pair_constraints: { required_roles: ["builder", "independent-reviewer"], require_distinct_providers: true,
    require_distinct_independence_domains: true, prohibit_self_review: true, allowed_surface_pairs: [[first.surface, identity.surface]] },
  expires_at: "", created_at: "", envelope_hash: "" };
const owner = { executionId: "first", worktreeId: "tree", fencingToken: 37, repositoryFingerprint: working };
const approval = { id: "approval", type: "transfer", actor: "offline", taskId: "task", repositoryFingerprint: working,
  scope: "read", timestamp: "stamp" };
const approvalStates = ["pending", "approved", "rejected", "expired"] as const;
const transfers = [{ id: "transfer", from: "first", to: "second", reason: "synthetic", fencingToken: 37, timestamp: "stamp" }];
const permissions = { allowedReadPaths: ["source"], allowedWritePaths: [], allowedCommandCategories: ["test"],
  allowedEgressDestinations: [], dataClass: "internal" };
const verification = { result: "warning", detail: "synthetic", verifiedBy: "second", timestamp: "stamp" } as const;
const review = { decision: "changes-requested", comments: "synthetic", reviewedBy: "second", timestamp: "stamp" } as const;
const incident = { id: "incident", reason: "synthetic", timestamp: "stamp", severity: "medium" } as const;
const rows = [
  { seq: 1, type: "session_open", actor: "offline", fencingToken: null, hash: "one", timestamp: "early" },
  { seq: 9, type: "synthetic", actor: "first", fencingToken: 37, hash: "nine", timestamp: "late" },
];
const full: Source = {
  sessionId: "session", snapshotSeq: 74, connected: true, phase: "active", taskEnvelopeHash: "envelope", task,
  repositoryFingerprint: working, executions: identities.map(id => ({ identity: id, state: "ready", hostPid: 1,
    childPid: 2, processGroupId: 3, executablePath: "stand-in", executableSha256: "digest", exitCode: null, exitSignal: null })),
  activeWriterExecutionId: "first", fencingToken: 37, tokenState: "valid",
  pendingApprovals: approvalStates.map(state => ({ ...approval, state })), pendingTransfers: transfers,
  permissionSummary: permissions, ownershipState: { kind: "owned", ...owner }, verification, review, incident,
  eventLog: rows, queueDepth: 12, ledgerSeq: 9,
};
const expected: Projection = { connected: true, sessionState: "active", ownershipState: "owned", activeWriter: "first",
  fencingToken: 37, task, executions: identities, repositoryFingerprint: working,
  pendingApprovals: [
    { ...approval, colorState: { kind: "pending", text: "PENDING — awaiting Founder decision" } },
    { ...approval, colorState: { kind: "approved", text: "APPROVED — Founder authorized" } },
    { ...approval, colorState: { kind: "rejected", text: "REJECTED — Founder denied" } },
    { ...approval, colorState: { kind: "expired", text: "EXPIRED — decision window elapsed" } },
  ], pendingTransfers: transfers, permissionSummary: permissions, transferPhase: null, verificationStatus: verification,
  reviewStatus: review, incident, eventLog: rows, queueDepth: 12 };

test("the pinned table maps every broker member and declared phase and ownership kind", () => {
  const table: Array<[Source, Projection]> = [[sparseSnapshot, empty], [full, expected]];
  for (const phase of ["starting", "active", "paused", "interrupted", "closing", "closed"] as const) {
    table.push([{ ...full, phase }, { ...expected, sessionState: phase }]);
  }
  const ownership: Array<[Source["ownershipState"], Projection["ownershipState"]]> = [
    [null, null], [{ kind: "free" }, "free"], [{ kind: "owned", ...owner }, "owned"],
    [{ kind: "transfer-requested", ...owner, transferTo: "second" }, "transfer-requested"],
    [{ kind: "sender-released", ...owner, transferTo: "second" }, "sender-released"],
    [{ kind: "rejected", ...owner, reason: "synthetic" }, "rejected"],
  ];
  for (const [input, output] of ownership) table.push([{ ...full, ownershipState: input }, { ...expected, ownershipState: output }]);
  table.push([{ ...full, connected: false, snapshotSeq: 0, tokenState: "invalidated", ledgerSeq: 1000,
    sessionId: "", taskEnvelopeHash: "", executions: [], pendingTransfers: [], fencingToken: 0, queueDepth: 0 },
    { ...expected, connected: false, executions: [], pendingTransfers: [], fencingToken: 0, queueDepth: 0 }]);
  for (const [input, output] of table) {
    const original = structuredClone(input);
    expect(project(original)).toEqual(output);
    expect(original).toEqual(input);
  }
});

test("the mapper rejects unknown shapes without disclosing supplied values", () => {
  function rejects(input: unknown, member: string) {
    let message = "";
    try { project(input as Source); } catch (error) { if (error instanceof TypeError) message = error.message; }
    expect(message).toContain(member + ": ");
    expect(message).toMatch(/missing|expected|outside the declared set|invalid surface identifier/);
    expect(message).not.toContain("synthetic-invalid-value");
  }
  for (const key of Object.keys(full)) {
    const missing: Record<string, unknown> = { ...full };
    delete missing[key];
    rejects(missing, "snapshot." + key);
  }
  for (const key of ["phase", "repositoryFingerprint", "tokenState", "ledgerSeq", "sessionId", "taskEnvelopeHash", "pendingApprovals", "eventLog"]) {
    rejects({ ...full, [key]: null }, "snapshot." + key);
  }
  const invalid = "synthetic-invalid-value";
  for (const [value, member] of [
    [{}, "kind"], [{ ...fingerprint, kind: invalid }, "kind"], [{ ...fingerprint, sha256: false }, "sha256"],
    [{ ...fingerprint, git_sha: 4 }, "git_sha"], [{ ...fingerprint, base_git_sha: undefined }, "base_git_sha"],
  ] as const) rejects({ ...full, repositoryFingerprint: value }, "snapshot.repositoryFingerprint." + member);
  rejects({ ...full, phase: invalid }, "snapshot.phase");
  rejects({ ...full, connected: invalid }, "snapshot.connected");
  rejects({ ...full, ownershipState: { kind: invalid } }, "snapshot.ownershipState.kind");
  rejects({ ...full, ownershipState: { ...owner, kind: "sender-released" } }, "snapshot.ownershipState.transferTo");
  rejects({ ...full, pendingApprovals: [{ ...approval, state: invalid }] }, "snapshot.pendingApprovals[].state");
  rejects({ ...full, executions: [{ ...full.executions![0], identity: { ...first, role: invalid } }] }, "snapshot.executions[].identity.role");
  rejects({ ...full, task: { ...task, scope: { ...task.scope, dataClass: invalid } } }, "snapshot.task.scope.dataClass");
  rejects({ ...full, permissionSummary: { ...permissions, allowedReadPaths: [false] } }, "snapshot.permissionSummary.allowedReadPaths[]");
  rejects({ ...full, eventLog: [{ ...rows[0], fencingToken: invalid }] }, "snapshot.eventLog[].fencingToken");
});
