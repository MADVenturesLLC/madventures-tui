// packages/broker/src/broker.ts
// MadBridge broker: dispatch ordering, subscription, lifecycle.

import type { Credential } from "./credentials";
import { validateCredential } from "./credentials";
import { McpServer, MCP_TOOLS } from "./mcp-server";
import type { McpToolDef } from "./mcp-server";
import { BrokerSocket, MADV_RUNTIME_DIR, MADV_SOCKET_PATH } from "./socket";

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
  stop(): void;
  dispatch(event: any, credential: Credential): Promise<DispatchResult>;
  subscribe(listener: (event: any) => void): () => void;
}

export async function createInMemoryBrokerForTest(): Promise<InMemoryBroker> {
  const listeners: Array<(event: any) => void> = [];
  let running = true;

  const socket = new BrokerSocket();

  const broker: InMemoryBroker = {
    running: true,
    runtimeDir: MADV_RUNTIME_DIR,
    socketPath: MADV_SOCKET_PATH,
    tcpPort: null,
    mcpTools: MCP_TOOLS,

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

      // 2. Parse schema — basic event type check
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
  };

  return broker;
}