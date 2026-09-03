// apps/madbridge/src/commands/close.ts
// close — a reserved external-control name (spec section 4.3).
//
// Phase 3A exposes no external control plane. The command is a constant: it
// performs no socket, PID, filesystem, ledger, or discovery probing. Its
// output additionally names the incident path, because `close` is the command
// an operator reaches for when the TUI itself is unresponsive.

import type { CommandFlags, CommandContext, CommandResult } from "./types";

const HUMAN_LINE =
  "External control unavailable. Use the certified TUI governance controls. If the TUI is unresponsive during an incident, terminate the foreground supervisor process; supervisor exit terminates all governed children fail-closed.";

const JSON_BODY =
  '{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls. If the TUI is unresponsive during an incident, terminate the foreground supervisor process; supervisor exit terminates all governed children fail-closed."}';

export async function closeCommand(
  _flags: CommandFlags,
  ctx: CommandContext,
): Promise<CommandResult> {
  if (ctx.json) {
    return { exitCode: 69, stdout: JSON_BODY, stderr: "" };
  }
  return { exitCode: 69, stdout: "", stderr: `${HUMAN_LINE}\n` };
}
