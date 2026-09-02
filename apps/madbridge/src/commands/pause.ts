// apps/madbridge/src/commands/pause.ts
// pause — a reserved external-control name (spec section 4.3).
//
// Phase 3A exposes no external control plane. The command is a constant: it
// performs no socket, PID, filesystem, ledger, or discovery probing, and it
// instructs the operator to use the certified TUI governance controls.

import type { CommandFlags, CommandContext, CommandResult } from "./types";

const HUMAN_LINE = "External control unavailable. Use the certified TUI governance controls.";

const JSON_BODY =
  '{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls."}';

export async function pauseCommand(
  _flags: CommandFlags,
  ctx: CommandContext,
): Promise<CommandResult> {
  if (ctx.json) {
    return { exitCode: 69, stdout: JSON_BODY, stderr: "" };
  }
  return { exitCode: 69, stdout: "", stderr: `${HUMAN_LINE}\n` };
}
