import type { BrokerSnapshot as ClientSnapshot, PendingApprovalSnapshot } from "@madventures/broker";
import { KNOWN_COMMAND_CATEGORIES, KNOWN_DATA_CLASSES, KNOWN_ROLES, parseSurfaceId } from "@madventures/protocol";
import type { ApprovalColorState, BrokerSnapshot } from "../types";

type Check = (value: unknown, member: string) => void;
type Fields = Readonly<Record<string, Check>>;

function fault(member: string, problem: string): never {
  throw new TypeError(member + ": " + problem);
}

function primitive(type: "string" | "number" | "boolean"): Check {
  return (value, member) => {
    if (typeof value !== type) fault(member, "expected " + type);
  };
}
const string = primitive("string");
const number = primitive("number");
const boolean = primitive("boolean");

function oneOf(...allowed: readonly (string | boolean)[]): Check {
  return (value, member) => {
    if (!allowed.some(item => item === value)) fault(member, "outside the declared set");
  };
}

function nullable(check: Check): Check {
  return (value, member) => { if (value !== null) check(value, member); };
}

function list(check: Check): Check {
  return (value, member) => {
    if (!Array.isArray(value)) fault(member, "expected array");
    for (const element of value) check(element, member + "[]");
  };
}

function tuple(...elements: readonly Check[]): Check {
  return (value, member) => {
    if (!Array.isArray(value) || value.length !== elements.length) fault(member, "expected tuple");
    elements.forEach((check, index) => check(value[index], member + "[]"));
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function record(required: Fields, optional: Fields = {}): Check {
  return (value, member) => {
    if (!isRecord(value)) fault(member, "expected object");
    for (const [key, check] of Object.entries(required)) {
      const path = member + "." + key;
      if (!Object.hasOwn(value, key)) fault(path, "missing");
      check(value[key], path);
    }
    for (const [key, check] of Object.entries(optional)) {
      if (Object.hasOwn(value, key)) check(value[key], member + "." + key);
    }
  };
}

const surface: Check = (value, member) => {
  if (typeof value !== "string") fault(member, "expected surface identifier");
  try { parseSurfaceId(value); } catch { fault(member, "invalid surface identifier"); }
};
const fingerprint = record({
  kind: oneOf("commit", "working_tree"), sha256: string, git_sha: string,
}, { base_git_sha: string });
const identity = record({
  execution_id: string, role: oneOf(...KNOWN_ROLES), surface, model: string,
  provider: string, independence_domain: string, effort: oneOf("low", "medium", "high"),
});
const task = record({
  protocol_version: oneOf("madbridge-protocol/v1"), task_id: string, authorization_reference: string,
  repository: string, branch: string, worktree: string, repository_fingerprint: fingerprint,
  executions: list(identity), initial_writer: string,
  scope: record({
    allowedReadPaths: list(string), allowedWritePaths: list(string),
    allowedCommandCategories: list(oneOf(...KNOWN_COMMAND_CATEGORIES)),
    allowedArtifactCategories: list(oneOf("code", "diff", "document", "report", "test-result")),
    maxArtifactSizeBytes: number, dataClass: oneOf(...KNOWN_DATA_CLASSES), allowedEgressDestinations: list(string),
  }),
  pair_constraints: record({
    required_roles: tuple(oneOf("builder"), oneOf("independent-reviewer")),
    require_distinct_providers: oneOf(true), require_distinct_independence_domains: oneOf(true),
    prohibit_self_review: oneOf(true),
  }, { allowed_surface_pairs: list(tuple(surface, surface)) }),
  expires_at: string, created_at: string, envelope_hash: string,
});
const execution = record({
  identity, state: oneOf("declared", "host-starting", "launching", "attesting", "ready", "exited", "failed"),
  hostPid: nullable(number), childPid: nullable(number), processGroupId: nullable(number),
  executablePath: string, executableSha256: string, exitCode: nullable(number), exitSignal: nullable(string),
});

const ownerFields = { executionId: string, worktreeId: string, fencingToken: number };
const ownerKind = record({ kind: oneOf("free", "owned", "transfer-requested", "sender-released", "rejected") });
const owned = record({ ...ownerFields, repositoryFingerprint: fingerprint });
const transferring = record({ ...ownerFields, repositoryFingerprint: fingerprint, transferTo: string });
const rejected = record({ ...ownerFields, reason: string });

const ownership: Check = (value, member) => {
  if (!isRecord(value)) fault(member, "expected ownership object");
  ownerKind(value, member);
  switch (value.kind) {
    case "owned": owned(value, member); break;
    case "transfer-requested":
    case "sender-released": transferring(value, member); break;
    case "rejected": rejected(value, member); break;
  }
};

const snapshotShape = record({
  sessionId: string, snapshotSeq: nullable(number), connected: nullable(boolean),
  phase: oneOf("starting", "active", "paused", "interrupted", "closing", "closed"),
  taskEnvelopeHash: string, task: nullable(task), repositoryFingerprint: fingerprint,
  executions: nullable(list(execution)), activeWriterExecutionId: nullable(string), fencingToken: nullable(number),
  tokenState: oneOf("not_issued", "valid", "invalidated"), ownershipState: nullable(ownership),
  pendingApprovals: list(record({
    id: string, type: string, actor: string, taskId: string, repositoryFingerprint: fingerprint,
    scope: string, timestamp: string, state: oneOf("pending", "approved", "rejected", "expired"),
  })),
  pendingTransfers: nullable(list(record({
    id: string, from: string, to: string, reason: string, fencingToken: number, timestamp: string,
  }))),
  permissionSummary: nullable(record({
    allowedReadPaths: list(string), allowedWritePaths: list(string), allowedCommandCategories: list(string),
    allowedEgressDestinations: list(string), dataClass: string,
  })),
  verification: nullable(record({
    result: oneOf("pass", "fail", "warning", "pending"), detail: string, verifiedBy: string, timestamp: string,
  })),
  review: nullable(record({
    decision: oneOf("approved", "changes-requested", "rejected", "pending"), comments: string, reviewedBy: string, timestamp: string,
  })),
  incident: nullable(record({ id: string, reason: string, timestamp: string, severity: oneOf("low", "medium", "high") })),
  eventLog: list(record({ seq: number, type: string, actor: string, fencingToken: nullable(number), hash: string, timestamp: string })),
  queueDepth: nullable(number), ledgerSeq: number,
});

function approvalColor(kind: PendingApprovalSnapshot["state"]): ApprovalColorState {
  switch (kind) {
    case "pending": return { kind, text: "PENDING — awaiting Founder decision" };
    case "approved": return { kind, text: "APPROVED — Founder authorized" };
    case "rejected": return { kind, text: "REJECTED — Founder denied" };
    case "expired": return { kind, text: "EXPIRED — decision window elapsed" };
  }
}

export function clientSnapshotToProjection(snapshot: ClientSnapshot): BrokerSnapshot {
  snapshotShape(snapshot, "snapshot");
  return {
    connected: snapshot.connected, sessionState: snapshot.phase, ownershipState: snapshot.ownershipState?.kind ?? null,
    activeWriter: snapshot.activeWriterExecutionId, fencingToken: snapshot.fencingToken, task: snapshot.task,
    executions: snapshot.executions?.map(execution => execution.identity) ?? null,
    repositoryFingerprint: snapshot.repositoryFingerprint,
    pendingApprovals: snapshot.pendingApprovals.map(({ state, ...approval }) => ({ ...approval, colorState: approvalColor(state) })),
    pendingTransfers: snapshot.pendingTransfers, permissionSummary: snapshot.permissionSummary, transferPhase: null,
    verificationStatus: snapshot.verification, reviewStatus: snapshot.review, incident: snapshot.incident,
    eventLog: snapshot.eventLog, queueDepth: snapshot.queueDepth,
  };
}
