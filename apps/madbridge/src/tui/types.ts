// apps/madbridge/src/tui/types.ts
// TUI-specific types — presentation only.
// These types are for React rendering. They do NOT decide authority,
// permissions, ownership, evidence acceptance, hashing, or recovery.
// All authority comes from the broker's immutable snapshots.

import type {
  TaskEnvelopeV1,
  ExecutionIdentity,
  RepositoryFingerprint,
} from "@madventures/protocol";

export type FocusTarget = "claude" | "antigravity" | "governance" | "events";

/** Color states for approval — explicit text for every color state. */
export type ApprovalColorState =
  | { kind: "pending"; text: "PENDING — awaiting Founder decision" }
  | { kind: "approved"; text: "APPROVED — Founder authorized" }
  | { kind: "rejected"; text: "REJECTED — Founder denied" }
  | { kind: "expired"; text: "EXPIRED — decision window elapsed" };

/**
 * Typed approval event emitted by the UI for the broker.
 * The UI does NOT create authority — it sends a resolution request.
 * The broker records the immutable ledger entry.
 */
export interface ApprovalRequestEvent {
  readonly taskId: string;
  readonly actor: string;
  readonly scope: string;
  readonly repositoryFingerprint: RepositoryFingerprint;
  readonly timestamp: string;
  readonly resolution: "accept" | "reject";
}

/** Immutable broker snapshot for TUI consumption. */
export interface BrokerSnapshot {
  readonly connected: boolean;
  readonly sessionState:
    | "starting"
    | "active"
    | "paused"
    | "interrupted"
    | "reconciling"
    | "closing"
    | "closed";
  readonly ownershipState:
    | "free"
    | "owned"
    | "transfer-requested"
    | "sender-released"
    | "receiver-validating"
    | "rejected";
  readonly activeWriter: string | null;
  readonly fencingToken: number;
  readonly task: TaskEnvelopeV1 | null;
  readonly executions: readonly ExecutionIdentity[];
  readonly repositoryFingerprint: RepositoryFingerprint | null;
  readonly pendingApprovals: readonly PendingApproval[];
  readonly pendingTransfers: readonly PendingTransfer[];
  readonly permissionSummary: PermissionSummary;
  readonly transferPhase: string | null;
  readonly verificationStatus: VerificationStatus | null;
  readonly reviewStatus: ReviewStatus | null;
  readonly incident: IncidentRecord | null;
  readonly eventLog: readonly LedgerEntryProjection[];
  readonly queueDepth: number;
}

export interface PendingApproval {
  readonly id: string;
  readonly type: string;
  readonly actor: string;
  readonly taskId: string;
  readonly repositoryFingerprint: RepositoryFingerprint;
  readonly scope: string;
  readonly timestamp: string;
  readonly colorState: ApprovalColorState;
}

export interface PendingTransfer {
  readonly id: string;
  readonly from: string;
  readonly to: string;
  readonly reason: string;
  readonly fencingToken: number;
  readonly timestamp: string;
}

export interface PermissionSummary {
  readonly allowedReadPaths: readonly string[];
  readonly allowedWritePaths: readonly string[];
  readonly allowedCommandCategories: readonly string[];
  readonly allowedEgressDestinations: readonly string[];
  readonly dataClass: string;
}

export interface VerificationStatus {
  readonly result: "pass" | "fail" | "warning" | "pending";
  readonly detail: string;
  readonly verifiedBy: string;
  readonly timestamp: string;
}

export interface ReviewStatus {
  readonly decision: "approved" | "changes-requested" | "rejected" | "pending";
  readonly comments: string;
  readonly reviewedBy: string;
  readonly timestamp: string;
}

export interface IncidentRecord {
  readonly id: string;
  readonly reason: string;
  readonly timestamp: string;
  readonly severity: "low" | "medium" | "high";
}

export interface LedgerEntryProjection {
  readonly seq: number;
  readonly type: string;
  readonly actor: string;
  readonly fencingToken: number;
  readonly hash: string;
  readonly timestamp: string;
}
