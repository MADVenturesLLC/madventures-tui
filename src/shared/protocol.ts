// shared/protocol.ts
// Socket message protocol between broker and clients (TUI + CLI adapters).
// MCP tool contract schemas live here too — both CLIs call these over MCP.

import type {
  BrokerState,
  CliId,
  Message,
  TransferRequest,
  Attestation,
} from "./types";

// --- Socket protocol (broker ↔ TUI / adapters) ---

export type SocketMessage =
  | { kind: "subscribe"; client: "tui" | CliId }
  | { kind: "state"; state: BrokerState }
  | { kind: "state-update"; patch: Partial<BrokerState> }
  | { kind: "message"; message: Message }
  | { kind: "ledger-entry"; entry: BrokerState["eventLog"][number] }
  | { kind: "transfer-requested"; request: TransferRequest }
  | { kind: "approval-needed"; request: BrokerState["pendingApproval"] }
  | { kind: "error"; code: string; detail: string };

// --- MCP tool contract (exposed to both CLIs) ---

export interface McpToolDef {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export const MCP_TOOLS: McpToolDef[] = [
  {
    name: "send_message",
    description: "Send a message to the other CLI's inbox via the broker.",
    inputSchema: {
      type: "object",
      properties: {
        to: { type: "string", enum: ["claude", "antigravity"] },
        content: { type: "string" },
      },
      required: ["to", "content"],
    },
  },
  {
    name: "request_transfer",
    description:
      "Request ownership transfer. Broker records last verified code state and pauses writing until the other CLI accepts and attests.",
    inputSchema: {
      type: "object",
      properties: {
        to: { type: "string", enum: ["claude", "antigravity"] },
        reason: { type: "string" },
      },
      required: ["to", "reason"],
    },
  },
  {
    name: "accept_transfer",
    description:
      "Accept an incoming ownership transfer. Caller must provide attestation of the last verified code state.",
    inputSchema: {
      type: "object",
      properties: {
        attestation: { type: "object" },
      },
      required: ["attestation"],
    },
  },
  {
    name: "attest",
    description:
      "Attest to the current code state. Required after a pause/interrupt before writing can resume.",
    inputSchema: {
      type: "object",
      properties: {
        codeHash: { type: "string" },
      },
      required: ["codeHash"],
    },
  },
  {
    name: "get_state",
    description: "Get the full broker state: owner, inboxes, queue, pending approvals.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_inbox",
    description: "Get messages in the caller's inbox.",
    inputSchema: { type: "object", properties: {} },
  },
];

// --- Unix socket path ---

export const BROKER_SOCKET_PATH =
  process.env.FOUNDER_TUI_SOCKET ?? "/tmp/founder-tui-broker.sock";
