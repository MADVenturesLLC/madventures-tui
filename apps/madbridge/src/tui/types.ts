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

/**
 * Founder seat — a named LOCAL posture. A seat chooses which pane gets focus
 * and which mode label the bars show. It is UI state ONLY: it never changes
 * broker authority, permissions, ownership, fencing tokens, or approval
 * resolution.
 */
export type SeatId = "builder" | "architect" | "operator";

/**
 * Honest mode label for a seat. APPLY = authoring allowed, PLAN = planning
 * posture (no silent apply), READ = observe/route only. The mode is part of
 * the seat's fixed contract — it is derived from the seat, never invented
 * and never independent of it.
 */
export type SeatMode = "APPLY" | "PLAN" | "READ";

export interface SeatSpec {
  readonly id: SeatId;
  /** Uppercase display label used in SeatBar and the StatusBar. */
  readonly label: string;
  /** The seat's fixed mode. */
  readonly mode: SeatMode;
  /** The pane this seat focuses when selected. */
  readonly focus: FocusTarget;
  /** One-line role statement for the seat. */
  readonly blurb: string;
}

/**
 * The three seats and their fixed contracts. Single source of truth for
 * SeatBar, ModelBar, StatusBar, and the keyboard router's seat actions.
 */
export const SEATS: readonly SeatSpec[] = [
  {
    id: "builder",
    label: "BUILDER",
    mode: "APPLY",
    focus: "claude",
    blurb: "implement approved slices",
  },
  {
    id: "architect",
    label: "ARCHITECT",
    mode: "PLAN",
    focus: "claude",
    blurb: "plan / structure / options — no silent apply",
  },
  {
    id: "operator",
    label: "OPERATOR",
    mode: "READ",
    focus: "governance",
    blurb: "run / monitor / route — no code authoring",
  },
] as const;

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
