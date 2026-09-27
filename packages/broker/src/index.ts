// packages/broker/src/index.ts
export { createInMemoryBrokerForTest } from "./broker";
export type { InMemoryBroker, DispatchResult } from "./broker";
export { validateCredential, createCredential } from "./credentials";
export type { Credential } from "./credentials";
export { interruptSession, reconcileRepository, rebuildBrokerState } from "./reconciliation";
export type {
  InterruptReason,
  InterruptInput,
  InterruptResult,
  ReconcileInput,
  ReconcileOutcome,
  ReconcileResult,
  RepositorySnapshot,
} from "./reconciliation";
export {
  classifyDurablePrefix,
  planPrefixCompletion,
  replayDurablePrefix,
  ReconciliationOrderError,
} from "./next-start-reconciliation";
export type { PrefixKind, PrefixContext } from "./next-start-reconciliation";
export { transitionSession, InvalidTransitionError } from "./session-machine";
export type { SessionState, SessionEvent } from "./session-machine";
export { spawnPtyHost } from "./pty-host-supervisor";
export type { PtyHostHandle, HostLaunchDescriptor } from "./pty-host-supervisor";

// Phase 3A M9 Task 20: the closed BrokerClient contract (specification
// sections 9.3-9.4). Types plus the two closure tuples; no behavior.
// OwnershipState is deliberately NOT re-exported here: its single public
// authority remains packages/broker/src/ownership-machine.ts.
export { BROKER_COMMAND_KINDS, BROKER_ERROR_CODES } from "./client";
export type {
  ClientPrincipal,
  BrokerClient,
  BrokerCommand,
  BrokerErrorCode,
  BrokerResult,
  BrokerSnapshot,
  ExecutionSnapshot,
  OutputFrame,
  PendingApprovalSnapshot,
  PendingTransferSnapshot,
  PermissionSummarySnapshot,
  VerificationSnapshot,
  ReviewSnapshot,
  IncidentSnapshot,
  LedgerEntrySnapshot,
} from "./client";

// Phase 3A M10 Task 22: the in-process BrokerClient (specification sections
// 9.3-9.4; plan Task 22; Founder Decision DEC-20260926-01). The broker
// authority this client is bound to is deliberately NOT exported here or
// from ./in-process-client; that authority's own module remains the single
// place it is declared and exported.
export { createInProcessBrokerClient, unsafeTestOnlyIngestOutputFrame } from "./in-process-client";
export type { InProcessBrokerClient, StampedBrokerSnapshot } from "./in-process-client";
