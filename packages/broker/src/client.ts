// packages/broker/src/client.ts
// Phase 3A M9 Task 20: the closed BrokerClient contract (specification
// sections 9.3-9.4; plan Task 20). Types only, plus the two runtime tuples
// that make the closure assertable. No behavior is implemented here.
//
// Boundary rules pinned by the specification:
// - executionId is the identity key for client operations; surfaceId is not
//   a parallel key and does not appear in the contract.
// - Every command carries a unique commandId and sessionId.
// - Plain data only: no PTY descriptor, no process handle, and no Ledger
//   handle crosses this contract.
// - ownershipState references the existing Phase 2 broker ownership-state
//   type declared in ./ownership-machine.ts — consumed, never redeclared.
//   There is no transferPhase field on BrokerSnapshot.

import type { BridgeEventV1, ExecutionIdentity, RepositoryFingerprint, TaskEnvelopeV1 } from "@madventures/protocol";
import type { OwnershipState } from "./ownership-machine";

/** The principal a BrokerClient is bound to at construction; callers cannot declare or change their own. */
export type ClientPrincipal =
  | { readonly kind: "founder_tui" }
  | { readonly kind: "execution"; readonly executionId: string };

/** The closed Phase 3A BrokerCommand union (spec section 9.3). */
export type BrokerCommand =
  | {
      readonly kind: "pty_input";
      readonly commandId: string;
      readonly sessionId: string;
      readonly executionId: string;
      readonly fencingToken: number;
      readonly bytes: Uint8Array;
    }
  | {
      readonly kind: "pty_resize";
      readonly commandId: string;
      readonly sessionId: string;
      readonly executionId: string;
      readonly fencingToken: number;
      readonly cols: number;
      readonly rows: number;
    }
  | {
      readonly kind: "pty_terminate";
      readonly commandId: string;
      readonly sessionId: string;
      readonly executionId: string;
      readonly reason: "founder_request" | "session_interrupt" | "rollback";
    }
  | {
      readonly kind: "approval_resolve";
      readonly commandId: string;
      readonly sessionId: string;
      readonly approvalId: string;
      readonly decision: "accept" | "reject";
    }
  | {
      readonly kind: "session_pause";
      readonly commandId: string;
      readonly sessionId: string;
      readonly reason: string;
    }
  | {
      readonly kind: "session_resume";
      readonly commandId: string;
      readonly sessionId: string;
    }
  | {
      readonly kind: "session_close";
      readonly commandId: string;
      readonly sessionId: string;
      readonly reason: string;
    };

/** The closed BrokerErrorCode union (spec section 9.3). */
export type BrokerErrorCode =
  | "invalid_command"
  | "unauthorized"
  | "session_mismatch"
  | "execution_not_found"
  | "identity_mismatch"
  | "stale_fencing_token"
  | "session_not_writable"
  | "invalid_dimensions"
  | "approval_not_pending"
  | "incident_active"
  | "reconciliation_required"
  | "host_unavailable"
  | "ledger_write_failed"
  | "invariant_failure";

/** The result of a request() or publish() call. detail is sanitized and carries no secret-marked value. */
export type BrokerResult =
  | {
      readonly ok: true;
      readonly commandId: string;
      readonly acceptedSnapshotSeq: number;
    }
  | {
      readonly ok: false;
      readonly commandId: string;
      readonly error: BrokerErrorCode;
      readonly detail: string;
    };

/** The client-facing broker session projection (spec section 9.4). */
export interface BrokerSnapshot {
  readonly sessionId: string;
  readonly snapshotSeq: number;
  readonly connected: boolean;
  readonly phase:
    | "starting"
    | "active"
    | "paused"
    | "interrupted"
    | "closing"
    | "closed";
  readonly taskEnvelopeHash: string;
  readonly task: TaskEnvelopeV1;
  readonly repositoryFingerprint: RepositoryFingerprint;
  readonly executions: readonly ExecutionSnapshot[];
  readonly activeWriterExecutionId: string | null;
  readonly fencingToken: number | null;
  readonly tokenState: "not_issued" | "valid" | "invalidated";
  readonly pendingApprovals: readonly PendingApprovalSnapshot[];
  readonly pendingTransfers: readonly PendingTransferSnapshot[];
  readonly permissionSummary: PermissionSummarySnapshot;
  // Existing Phase 2 broker ownership-state type, declared in
  // packages/broker/src/ownership-machine.ts. Consumed, never redeclared.
  readonly ownershipState: OwnershipState;
  readonly verification: VerificationSnapshot | null;
  readonly review: ReviewSnapshot | null;
  readonly incident: IncidentSnapshot | null;
  readonly eventLog: readonly LedgerEntrySnapshot[];
  readonly queueDepth: number;
  readonly ledgerSeq: number;
}

/** Launch facts for one execution of the session (spec section 9.4). */
export interface ExecutionSnapshot {
  readonly identity: ExecutionIdentity;
  readonly state:
    | "declared"
    | "host-starting"
    | "launching"
    | "attesting"
    | "ready"
    | "exited"
    | "failed";
  readonly hostPid: number | null;
  readonly childPid: number | null;
  readonly processGroupId: number | null;
  readonly executablePath: string;
  readonly executableSha256: string;
  readonly exitCode: number | null;
  readonly exitSignal: string | null;
}

/** One output frame; output identity keys on executionId, never surfaceId. */
export interface OutputFrame {
  readonly sessionId: string;
  readonly executionId: string;
  readonly outputSeq: number;
  readonly bytes: Uint8Array;
}

/** A pending approval as projected to the client (spec section 9.4). */
export interface PendingApprovalSnapshot {
  readonly id: string;
  readonly type: string;
  readonly actor: string;
  readonly taskId: string;
  readonly repositoryFingerprint: RepositoryFingerprint;
  readonly scope: string;
  readonly timestamp: string;
  readonly state: "pending" | "approved" | "rejected" | "expired";
}

/** A pending ownership transfer as projected to the client (spec section 9.4). */
export interface PendingTransferSnapshot {
  readonly id: string;
  readonly from: string;
  readonly to: string;
  readonly reason: string;
  readonly fencingToken: number;
  readonly timestamp: string;
}

/** The effective permission summary of the session (spec section 9.4). */
export interface PermissionSummarySnapshot {
  readonly allowedReadPaths: readonly string[];
  readonly allowedWritePaths: readonly string[];
  readonly allowedCommandCategories: readonly string[];
  readonly allowedEgressDestinations: readonly string[];
  readonly dataClass: string;
}

/** The latest verification verdict, when one exists (spec section 9.4). */
export interface VerificationSnapshot {
  readonly result: "pass" | "fail" | "warning" | "pending";
  readonly detail: string;
  readonly verifiedBy: string;
  readonly timestamp: string;
}

/** The latest review verdict, when one exists (spec section 9.4). */
export interface ReviewSnapshot {
  readonly decision:
    | "approved"
    | "changes-requested"
    | "rejected"
    | "pending";
  readonly comments: string;
  readonly reviewedBy: string;
  readonly timestamp: string;
}

/** The active incident, when one exists (spec section 9.4). */
export interface IncidentSnapshot {
  readonly id: string;
  readonly reason: string;
  readonly timestamp: string;
  readonly severity: "low" | "medium" | "high";
}

/** One ledger row as projected to the client (spec section 9.4). */
export interface LedgerEntrySnapshot {
  readonly seq: number;
  readonly type: string;
  readonly actor: string;
  readonly fencingToken: number | null;
  readonly hash: string;
  readonly timestamp: string;
}

/** The in-process client boundary (spec section 9.3). close() releases only this client's subscriptions. */
export interface BrokerClient {
  getSnapshot(): Promise<BrokerSnapshot>;
  snapshots(): AsyncIterable<BrokerSnapshot>;
  output(executionId: string): AsyncIterable<OutputFrame>;
  request(command: BrokerCommand): Promise<BrokerResult>;
  publish(event: BridgeEventV1): Promise<BrokerResult>;
  close(): Promise<void>;
}

/** The closed set of BrokerCommand kinds, in union order. Runtime tuple so the closure is assertable. */
export const BROKER_COMMAND_KINDS = [
  "pty_input",
  "pty_resize",
  "pty_terminate",
  "approval_resolve",
  "session_pause",
  "session_resume",
  "session_close",
] as const;

/** The closed set of BrokerErrorCode values, in union order. Runtime tuple so the closure is assertable. */
export const BROKER_ERROR_CODES = [
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
] as const;
