// shared/types.ts
// Core domain types — used by broker, MCP server, adapters, and TUI.
// Framework-independent: no React, no OpenTUI imports.

// ─── Actors and identity ───

export type CliId = "claude" | "antigravity";

export interface ActorIdentity {
  cli: CliId;
  model: string;          // e.g. "claude-sonnet-4", "gemini-2.5-pro"
  sessionId: string;      // unique per CLI session
  authzRef: string;       // reference to authorization scope (role/permission set)
}

// ─── Fencing tokens ───
// Monotonically increasing. Each ownership grant carries a token.
// Stale owners present an old token and are rejected.

export type FencingToken = number;

// ─── Task envelope ───
// Every action is bound to a task envelope. No task = no action.

export interface TaskEnvelope {
  id: string;             // UUID
  title: string;
  repoFingerprint: string; // git rev-parse HEAD + remote URL hash
  worktree: string;       // absolute path to worktree
  scope: TaskScope;
  createdAt: number;
  createdBy: ActorIdentity;
}

export interface TaskScope {
  paths: string[];         // allowed file paths/globs (relative to worktree)
  commandCategories: CommandCategory[];
  dataClass: DataClass;
  egressAllowed: boolean;
  expiresAt: number | null; // null = no expiry
}

export type CommandCategory =
  | "read"
  | "write"
  | "build"
  | "test"
  | "git"
  | "shell"
  | "network";

export type DataClass =
  | "public"
  | "internal"
  | "confidential"
  | "restricted";

// ─── Session lifecycle (F3: separated from ownership) ───

export type SessionStatus =
  | "starting"
  | "active"
  | "paused"          // disconnected mid-write, awaiting reconciliation
  | "reconciling"     // reconnecting, verifying code state
  | "closed";

export interface SessionState {
  cli: CliId;
  status: SessionStatus;
  startedAt: number;
  lastActive: number;
  pid: number | null;
  ptyFd: number | null;   // PTY file descriptor for managed CLI
  lastVerifiedCode: string | null;  // hash of code at last attestation
  interruptedAt: number | null;
}

// ─── Ownership lifecycle (F3: separated from session) ───

export type OwnershipStatus =
  | "free"
  | "owned"
  | "transfer-requested"
  | "sender-released"
  | "receiver-validating"
  | "rejected";

export interface OwnershipState {
  status: OwnershipStatus;
  holder: CliId | null;
  fencingToken: FencingToken;
  heldSince: number | null;
  attested: boolean;
  // Transfer sub-state
  transferFrom: CliId | null;
  transferTo: CliId | null;
  transferReason: string | null;
  transferRequestedAt: number | null;
  rejectionReason: string | null;
}

// ─── Approval (F2: typed immutable event, NOT UI state) ───

export type ApprovalType =
  | "transfer"
  | "attestation"
  | "resume"
  | "pause"
  | "closure"
  | "artifact-publication";

export interface ApprovalEvent {
  id: string;              // UUID, immutable
  type: ApprovalType;
  actor: ActorIdentity;    // who is requesting
  task: TaskEnvelope;      // bound task
  repoFingerprint: string; // repo at time of request
  scope: TaskScope;        // what's in scope
  timestamp: number;       // when requested
  // Resolution (set when approved/rejected — null = pending)
  resolution: "pending" | "approved" | "rejected" | null;
  resolvedBy: ActorIdentity | null;
  resolvedAt: number | null;
  rejectionReason: string | null;
  // Immutable hash for ledger inclusion
  hash: string | null;     // set when appended to ledger
}

// ─── Messages ───

export interface Message {
  id: string;
  from: CliId;
  to: CliId;
  content: string;
  timestamp: number;
  acknowledged: boolean;   // F5: inbox acknowledgment
  acknowledgedAt: number | null;
}

// ─── Ledger ───

export type LedgerEntryType =
  | "session-start"
  | "session-pause"
  | "session-resume"
  | "session-close"
  | "ownership-acquire"
  | "ownership-release"
  | "ownership-transfer-request"
  | "ownership-transfer-accept"
  | "ownership-transfer-reject"
  | "attestation"
  | "interrupt"
  | "message"
  | "approval"
  | "artifact-publish"
  | "artifact-inspect"
  | "verification"
  | "review"
  | "governed-closure";

export interface LedgerEntry {
  seq: number;
  type: LedgerEntryType;
  actor: CliId;
  fencingToken: FencingToken;
  task: TaskEnvelope | null;
  payload: Record<string, unknown>;
  prevHash: string;
  hash: string;
  timestamp: number;
}

// ─── Attestation ───

export interface Attestation {
  id: string;
  actor: ActorIdentity;
  codeHash: string;
  repoFingerprint: string;
  fencingToken: FencingToken;
  timestamp: number;
  signature: string;
}

// ─── Transfer request ───

export interface TransferRequest {
  id: string;
  from: ActorIdentity;
  to: CliId;
  reason: string;
  fencingToken: FencingToken;     // current token
  lastVerifiedCode: string;
  task: TaskEnvelope;
  timestamp: number;
  status: "pending" | "accepted" | "rejected" | "expired";
}

// ─── Artifacts ───

export interface Artifact {
  id: string;
  publishedBy: ActorIdentity;
  task: TaskEnvelope;
  type: "code" | "diff" | "document" | "report" | "test-result";
  path: string;                   // relative to worktree
  hash: string;                   // content hash
  repoFingerprint: string;
  timestamp: number;
  inspected: boolean;
  inspectionResult: string | null;
}

// ─── Verification and review records ───

export interface VerificationRecord {
  id: string;
  task: TaskEnvelope;
  verifiedBy: ActorIdentity;
  what: string;                   // what was verified
  result: "pass" | "fail" | "warning";
  detail: string;
  fencingToken: FencingToken;
  timestamp: number;
}

export interface ReviewRecord {
  id: string;
  task: TaskEnvelope;
  reviewedBy: ActorIdentity;
  artifact: Artifact;
  decision: "approved" | "changes-requested" | "rejected";
  comments: string;
  fencingToken: FencingToken;
  timestamp: number;
}

// ─── Broker state (aggregate for TUI consumption) ───

export interface BrokerState {
  ownership: OwnershipState;
  sessions: Record<CliId, SessionState>;
  inboxes: Record<CliId, Message[]>;
  eventLog: LedgerEntry[];
  pendingApprovals: ApprovalEvent[];
  pendingTransfers: TransferRequest[];
  artifacts: Artifact[];
  queueDepth: number;
  fencingToken: FencingToken;
}
