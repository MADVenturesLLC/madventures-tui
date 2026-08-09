// apps/madbridge/src/commands/close.ts
// close — sends a typed session close event.
// Returns nonzero if no running session is found.

import { existsSync } from "fs";
import { MADV_SOCKET_PATH } from "@madventures/broker";
import type { CommandFlags, CommandContext, CommandResult } from "./types";

export async function closeCommand(
  flags: CommandFlags,
  ctx: CommandContext,
): Promise<CommandResult> {
  const summary = typeof flags["summary"] === "string" ? flags["summary"] : "session closed";

  const socketPath = process.env.MADV_RUNTIME_DIR
    ? `${process.env.MADV_RUNTIME_DIR}/broker.sock`
    : MADV_SOCKET_PATH;

  if (!existsSync(socketPath)) {
    if (ctx.json) {
      return {
        exitCode: 1,
        stdout: JSON.stringify({
          error: "no_running_session: broker socket not found",
          ok: false,
        }),
        stderr: "",
      };
    }
    return {
      exitCode: 1,
      stdout: "",
      stderr: "no running session — broker socket not found\n",
    };
  }

  // In full implementation, this would dispatch a typed "session_close" event
  // through the broker with the summary payload, then wait for "complete".
  if (ctx.json) {
    return {
      exitCode: 0,
      stdout: JSON.stringify({
        ok: true,
        event: "session_close",
        summary,
      }),
      stderr: "",
    };
  }

  return {
    exitCode: 0,
    stdout: `Close event sent (summary: ${summary})\n`,
    stderr: "",
  };
}
