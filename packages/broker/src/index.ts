// packages/broker/src/index.ts
export { createInMemoryBrokerForTest } from "./broker";
export type { InMemoryBroker, DispatchResult } from "./broker";
export { BrokerSocket, MADV_RUNTIME_DIR, MADV_SOCKET_PATH } from "./socket";
export { MCP_TOOLS, McpServer } from "./mcp-server";
export type { McpToolDef } from "./mcp-server";
export { validateCredential, createCredential } from "./credentials";
export type { Credential } from "./credentials";
export { PtyManager, createPtyManager } from "./pty-manager";
export type { PtyId, PtyLaunchOptions, PtyHandle, PtyManagerSnapshot } from "./pty-manager";
export { interruptSession, reconcileRepository, resumeSession, rebuildBrokerState } from "./reconciliation";
export type {
  InterruptReason,
  InterruptInput,
  InterruptResult,
  ReconcileInput,
  ReconcileOutcome,
  ReconcileResult,
  RepositorySnapshot,
  ResumeApproval,
  ResumeResult,
} from "./reconciliation";
export { transitionSession, InvalidTransitionError } from "./session-machine";
export type { SessionState, SessionEvent } from "./session-machine";
