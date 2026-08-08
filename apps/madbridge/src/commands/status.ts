// apps/madbridge/src/commands/status.ts
// status — reads a broker snapshot.
// Returns nonzero if no broker is running.

import { existsSync } from "fs";
import { join } from "path";
import { MADV_SOCKET_PATH } from "@madventures/broker";
import type { CommandFlags, CommandContext, CommandResult } from "./types";

export async function statusCommand(
  _flags: CommandFlags,
  ctx: CommandContext,
): Promise<CommandResult> {
  // Check if broker socket exists
  const socketPath = process.env.MADV_RUNTIME_DIR
    ? join(process.env.MADV_RUNTIME_DIR, "broker.sock")
    : MADV_SOCKET_PATH;

  if (!existsSync(socketPath)) {
    if (ctx.json) {
      return {
        exitCode: 1,
        stdout: JSON.stringify({
          error: "no_broker_available: broker socket not found",
          ok: false,
          socketPath,
        }),
        stderr: "",
      };
    }
    return {
      exitCode: 1,
      stdout: "",
      stderr: `no broker running (socket not found: ${socketPath})\n`,
    };
  }

  // In a full implementation, this would connect to the broker and read a snapshot.
  // For now, report that the socket exists.
  if (ctx.json) {
    return {
      exitCode: 0,
      stdout: JSON.stringify({
        ok: true,
        connected: true,
        socketPath,
        sessionState: "unknown",
      }),
      stderr: "",
    };
  }

  return {
    exitCode: 0,
    stdout: `Broker: connected (${socketPath})\nSession: unknown\n`,
    stderr: "",
  };
}
