// src/adapters/antigravity-adapter.ts
// Antigravity (Gemini CLI) adapter — connects Antigravity's MCP config to the broker.
// Antigravity reads MCP config from ~/.gemini/config/mcp_config.json
// (NOT ~/.gemini/settings.json — that's the Gemini CLI path, Antigravity ignores it).
//
// This adapter is spawned by Antigravity as an MCP stdio server process.
// It connects to the broker over the Unix socket and forwards tool calls.

import type { SocketMessage } from "../shared/protocol";
import { BROKER_SOCKET_PATH } from "../shared/protocol";

export class AntigravityAdapter {
  // Antigravity spawns `bun run src/mcp/server.ts` via MCP config:
  //
  // ~/.gemini/config/mcp_config.json:
  // {
  //   "mcpServers": {
  //     "founder-broker": {
  //       "command": "bun",
  //       "args": ["run", "/Users/michaeldaley/founder-tui/src/mcp/server.ts"]
  //     }
  //   }
  // }

  connect(): void {
    // TODO: connect to broker socket, identify as "antigravity"
  }

  disconnect(): void {
    // TODO: notify broker of disconnect → pause + preserve last verified code
  }
}
