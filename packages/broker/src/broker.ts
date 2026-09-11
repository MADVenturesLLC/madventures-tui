// packages/broker/src/broker.ts
// MadBridge broker: dispatch ordering, subscription, lifecycle.
// Extended with fail-closed session recovery: interruption and reconciliation.

import type { Credential } from "./credentials";
import { validateCredential } from "./credentials";
import { McpServer, MCP_TOOLS } from "./mcp-server";
import type { McpToolDef } from "./mcp-server";
import { BrokerSocket, MADV_RUNTIME_DIR, MADV_SOCKET_PATH } from "./socket";
import { interruptSession, reconcileRepository, rebuildBrokerState } from "./reconciliation";
import type { InterruptReason, ReconcileInput, ReconcileResult } from "./reconciliation";
import { transitionSession } from "./session-machine";
import type { SessionState } from "./session-machine";
import type { BridgeEventV1 } from "@madventures/protocol";

export interface DispatchResult {
  kind: "ok" | "error";
  detail?: string;
}

export type BrokerEvent = DispatchResult;

export interface InMemoryBroker {
  running: boolean;
  runtimeDir: string;
  socketPath: string;
  tcpPort: number | null;
  mcpTools: McpToolDef[];
  sessionState: SessionState;
  fencingToken: number;
  tokenUsable: boolean;
  stop(): void;
  dispatch(event: any, credential: Credential): Promise<DispatchResult>;
  subscribe(listener: (event: any) => void): () => void;
  interrupt(reason: InterruptReason, detail?: string): void;
  reconcile(input: ReconcileInput): ReconcileResult;
}

export async function createInMemoryBrokerForTest(): Promise<InMemoryBroker> {
  const listeners: Array<(event: any) => void> = [];
  let running = true;

  const socket = new BrokerSocket();

  let sessionState: SessionState = { kind: "active" };
  let fencingToken = 1;
  let tokenUsable = true;

  const broker: InMemoryBroker = {
    running: true,
    runtimeDir: MADV_RUNTIME_DIR,
    socketPath: MADV_SOCKET_PATH,
    tcpPort: null,
    mcpTools: MCP_TOOLS,
    sessionState,
    fencingToken,
    tokenUsable,

    stop() {
      running = false;
      broker.running = false;
      socket.stop();
    },

    async dispatch(event: any, credential: Credential): Promise<DispatchResult> {
      // 1. Authenticate credential
      if (!validateCredential(credential, event.sender_execution_id ?? "", 0)) {
        const err: DispatchResult = { kind: "error", detail: "credential_mismatch" };
        listeners.forEach((l) => l(err));
        return err;
      }

      // 2. Check token usability — fail-closed
      if (!tokenUsable) {
        const err: DispatchResult = { kind: "error", detail: "token_invalidated_session_interrupted" };
        listeners.forEach((l) => l(err));
        return err;
      }

      // 3. Parse schema — basic event type check
      const eventType = event.event_type;
      if (!eventType) {
        const err: DispatchResult = { kind: "error", detail: "missing_event_type" };
        listeners.forEach((l) => l(err));
        return err;
      }

      const ok: DispatchResult = { kind: "ok" };
      listeners.forEach((l) => l(ok));
      return ok;
    },

    subscribe(listener: (event: any) => void): () => void {
      listeners.push(listener);
      return () => {
        const idx = listeners.indexOf(listener);
        if (idx >= 0) listeners.splice(idx, 1);
      };
    },

    interrupt(reason: InterruptReason, detail?: string) {
      const result = interruptSession({
        reason,
        detail: detail ?? "",
        sessionState,
        currentWriterToken: fencingToken,
        ledgerRows: [],
      });
      sessionState = result.state;
      tokenUsable = false;
      broker.sessionState = sessionState;
      broker.tokenUsable = tokenUsable;
      listeners.forEach((l) => l(result.incidentEvent));
    },

    reconcile(input: ReconcileInput): ReconcileResult {
      return reconcileRepository(input);
    },
  };

  return broker;
}

// Re-export reconciliation utilities
export { interruptSession, reconcileRepository, rebuildBrokerState };
export type { InterruptReason, ReconcileInput, ReconcileResult };
