// apps/madbridge/src/commands/start.ts
// start — the Phase 3A production gate (spec section 4.2).
//
// Production `start` contains no path to the live runtime. It is a constant:
// no flag, positional argument, environment variable, debug branch, dynamic
// import, or alternate argument path reaches a runtime, and the command
// performs no filesystem inspection and imports no runtime module.
//
// Removing this gate is a Phase 3B certification event, not an incidental
// edit. See spec section 4.2 for the evidence the certification commit cites.

import type { CommandFlags, CommandContext, CommandResult } from "./types";

const HUMAN_LINE =
  "Live runtime not certified. Phase 3A runtime foundation is present; live startup requires Phase 3B certification.";

const JSON_BODY =
  '{"ok":false,"error":"live_runtime_not_certified","hint":"Phase 3A runtime foundation is present; live startup requires Phase 3B certification."}';

export async function startCommand(
  _flags: CommandFlags,
  ctx: CommandContext,
): Promise<CommandResult> {
  if (ctx.json) {
    return { exitCode: 78, stdout: JSON_BODY, stderr: "" };
  }
  return { exitCode: 78, stdout: "", stderr: `${HUMAN_LINE}\n` };
}
