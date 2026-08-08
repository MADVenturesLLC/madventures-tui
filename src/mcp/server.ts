// src/mcp/server.ts
// MCP stdio server. Both CLIs (Claude Code and Antigravity) connect to this
// via their MCP config. Exposes the broker tool contract.
//
// Each CLI spawns its own instance of this server. They communicate with
// the broker daemon over the Unix socket.

import { StateMachine } from "../broker/state-machine";
import { Ledger } from "../broker/ledger";
import { InboxManager } from "../broker/inbox";
import { TransferManager } from "../broker/transfer";
import { MCP_TOOLS } from "../shared/protocol";
import type { CliId, BrokerState } from "../shared/types";

// Minimal MCP stdio server — reads JSON-RPC from stdin, writes to stdout.
// In production, use @modelcontextprotocol/sdk; this is a lightweight stub
// that demonstrates the tool contract.

interface JsonRpcRequest {
  jsonrpc: "2.0";
  id: number | string;
  method: string;
  params?: Record<string, unknown>;
}

interface JsonRpcResponse {
  jsonrpc: "2.0";
  id: number | string;
  result?: unknown;
  error?: { code: number; message: string };
}

const CLAUDE_ID: CliId = "claude"; // determined by which CLI spawned this instance

function handleRequest(req: JsonRpcRequest): JsonRpcResponse {
  switch (req.method) {
    case "initialize":
      return {
        jsonrpc: "2.0",
        id: req.id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: { tools: {} },
          serverInfo: { name: "founder-tui-broker", version: "0.1.0" },
        },
      };

    case "tools/list":
      return {
        jsonrpc: "2.0",
        id: req.id,
        result: { tools: MCP_TOOLS },
      };

    case "tools/call": {
      const toolName = req.params?.["name"] as string;
      const args = (req.params?.["arguments"] ?? {}) as Record<string, unknown>;

      switch (toolName) {
        case "get_state":
          // TODO: fetch from broker over socket
          return {
            jsonrpc: "2.0",
            id: req.id,
            result: {
              content: [{ type: "text", text: JSON.stringify({ owner: "free" }) }],
            },
          };

        case "send_message":
          // TODO: forward to broker
          return {
            jsonrpc: "2.0",
            id: req.id,
            result: {
              content: [{ type: "text", text: `Message queued to ${args["to"]}` }],
            },
          };

        case "request_transfer":
          return {
            jsonrpc: "2.0",
            id: req.id,
            result: {
              content: [{ type: "text", text: `Transfer requested to ${args["to"]}` }],
            },
          };

        case "accept_transfer":
          return {
            jsonrpc: "2.0",
            id: req.id,
            result: {
              content: [{ type: "text", text: "Transfer accepted" }],
            },
          };

        case "attest":
          return {
            jsonrpc: "2.0",
            id: req.id,
            result: {
              content: [{ type: "text", text: "Attestation recorded" }],
            },
          };

        case "get_inbox":
          return {
            jsonrpc: "2.0",
            id: req.id,
            result: {
              content: [{ type: "text", text: "[]" }],
            },
          };

        default:
          return {
            jsonrpc: "2.0",
            id: req.id,
            error: { code: -32601, message: `Unknown tool: ${toolName}` },
          };
      }
    }

    default:
      return {
        jsonrpc: "2.0",
        id: req.id,
        error: { code: -32601, message: `Unknown method: ${req.method}` },
      };
  }
}

// Stdio loop
if (import.meta.main) {
  const decoder = new TextDecoder();
  let buffer = "";

  process.stdin.on("data", (chunk: Buffer) => {
    buffer += decoder.decode(chunk);
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const req = JSON.parse(line) as JsonRpcRequest;
        const res = handleRequest(req);
        process.stdout.write(JSON.stringify(res) + "\n");
      } catch {
        // ignore malformed
      }
    }
  });

  process.stdin.on("close", () => process.exit(0));
}
