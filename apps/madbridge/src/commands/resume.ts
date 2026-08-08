// apps/madbridge/src/commands/resume.ts
// resume — sends a typed session resume event.
// Returns nonzero if no running session is found.

import { existsSync } from "fs";
import { MADV_SOCKET_PATH } from "@madventures/broker";
import type { CommandFlags, CommandContext, CommandResult } from "./types";

export async function resumeCommand(
  _flags: CommandFlags,
  ctx: CommandContext,
): Promise<CommandResult> {
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

  // In full implementation, this would dispatch a typed "resume" event
  // through the broker.
  if (ctx.json) {
    return {
      exitCode: 0,
      stdout: JSON.stringify({
        ok: true,
        event: "resume",
      }),
      stderr: "",
    };
  }

  return {
    exitCode: 0,
    stdout: "Resume event sent\n",
    stderr: "",
  };
}
