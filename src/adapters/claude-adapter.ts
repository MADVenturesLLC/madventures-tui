// src/adapters/claude-adapter.ts
// Claude Code adapter — connects Claude Code's hook/plugin system to the broker.
// Claude Code triggers hooks on events (file write, command run, etc).
// This adapter translates those events into broker socket messages.
//
// TODO: implement using Claude Code's hook system once the broker socket layer
// is stable. For now this is a stub documenting the integration surface.

import type { SocketMessage } from "../shared/protocol";
import { BROKER_SOCKET_PATH } from "../shared/protocol";

export class ClaudeAdapter {
  // Will connect to broker over Unix socket
  // Will register Claude Code hooks:
  //   - PreToolUse → notify broker of intent to write
  //   - PostToolUse → notify broker of completed write, send code hash
  //   - OnDisconnect → trigger pause + last verified code preservation
  //   - OnResume → trigger re-attestation flow

  connect(): void {
    // TODO: Bun.connect(BROKER_SOCKET_PATH)
  }

  disconnect(): void {
    // TODO: clean socket close, broker will detect and pause
  }
}
