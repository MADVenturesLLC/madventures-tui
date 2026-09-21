// apps/madbridge/src/cli.ts
// MadBridge CLI entry point — the nine approved commands plus the four
// frozen Room Runtime Phase 1 attach verbs.
//
// Commands: init, doctor, start, status, pause, resume,
//           verify-ledger, export-evidence, close
// Phase 1 attach family (Commission Final r3 §9 — verbs frozen exactly;
// no aliases, no competing public contract):
//           join --room <room_id>, leave, follow --json, rooms --json
// Founder-ruled addition (2026-09-20, Act GLM-20260920-FIRST-LIVE-ROOM-JOIN,
// Option A): room create — thin front-end for the amended IPC v2 CreateRoom
// control op; the Gateway mints the room_id.
//
// Exit codes: 0 = success, nonzero = blocked / invalid / interrupted
// --json: produces JSON output on stdout

import { initCommand } from "./commands/init";
import { doctorCommand } from "./commands/doctor";
import { startCommand } from "./commands/start";
import { statusCommand } from "./commands/status";
import { pauseCommand } from "./commands/pause";
import { resumeCommand } from "./commands/resume";
import { verifyLedgerCommand } from "./commands/verify-ledger";
import { exportEvidenceCommand } from "./commands/export-evidence";
import { closeCommand } from "./commands/close";
import { joinCommand } from "./commands/join";
import { roomCommand } from "./commands/room";
import { leaveCommand } from "./commands/leave";
import { followCommand } from "./commands/follow";
import { roomsCommand } from "./commands/rooms";

export interface CliResult {
  exitCode: number;
  stdout: string;
  stderr: string;
}

export interface CliContext {
  stdin: string;
  cwd: string;
}

const COMMANDS = new Set([
  "init", "doctor", "start", "status", "pause",
  "resume", "verify-ledger", "export-evidence", "close",
  // Room Runtime Phase 1 frozen attach verbs (r3 §9).
  "join", "leave", "follow", "rooms",
  // Founder-ruled addition (2026-09-20): production room-create front-end.
  "room",
]);

const HELP_TEXT = `madv-tui — MadBridge governance CLI

Usage: madv-tui <command> [options]

Commands:
  init              Preview and create the host storage root (no repository writes)
  doctor            Read-only environment health checks
  start             Present but not certified — live startup requires Phase 3B
  status            Reserved external-control name — no external control plane
  pause             Reserved external-control name — no external control plane
  resume            Reserved external-control name — no external control plane
  close             Reserved external-control name — no external control plane
  verify-ledger     Perform complete-chain verification
  export-evidence   Write sanitized evidence package
  join              Attach to a Gateway room as a viewer (--room <room_id>)
  leave             Detach this viewer (occupancy untouched)
  follow            Observe projection streams read-only (--json)
  rooms             List Gateway-provided room facts (--json)
  room create       Request a live room; the Gateway mints the room_id

Global options:
  --json            Output JSON on stdout
  --help            Show this help
`;

function parseArgs(args: string[]): {
  command: string | null;
  flags: Record<string, string | boolean>;
  positional: string[];
} {
  if (args.length === 0) {
    return { command: null, flags: {}, positional: [] };
  }

  const command = args[0]!;
  const rest = args.slice(1);
  const flags: Record<string, string | boolean> = {};
  const positional: string[] = [];

  let i = 0;
  while (i < rest.length) {
    const arg = rest[i]!;
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      // Check if next arg is a value (not a flag)
      if (i + 1 < rest.length && !rest[i + 1]!.startsWith("--")) {
        flags[key] = rest[i + 1]!;
        // Consume exactly the pair. (Phase 1 fix: the previous `i += 2` was
        // followed by the loop's `i++`, silently dropping the flag after any
        // valued flag — `join --room <id> --json` lost `--json`.)
        i += 2;
        continue;
      }
      flags[key] = true;
    } else {
      positional.push(arg);
    }
    i++;
  }

  return { command, flags, positional };
}

export async function runCli(args: string[], ctx: CliContext): Promise<CliResult> {
  const { command, flags, positional } = parseArgs(args);

  if (!command) {
    return {
      exitCode: 1,
      stdout: "",
      stderr: HELP_TEXT,
    };
  }

  if (command === "--help" || command === "-h") {
    return {
      exitCode: 0,
      stdout: HELP_TEXT,
      stderr: "",
    };
  }

  if (!COMMANDS.has(command)) {
    if (flags["json"]) {
      return {
        exitCode: 2,
        stdout: JSON.stringify({ error: `unknown command: ${command}`, ok: false }),
        stderr: "",
      };
    }
    return {
      exitCode: 2,
      stdout: "",
      stderr: `unknown command: ${command}\n\n${HELP_TEXT}`,
    };
  }

  const json = flags["json"] === true;

  try {
    switch (command) {
      case "init":
        return await initCommand(flags, { ...ctx, json });
      case "doctor":
        return await doctorCommand(flags, { ...ctx, json });
      case "start":
        return await startCommand(flags, { ...ctx, json });
      case "status":
        return await statusCommand(flags, { ...ctx, json });
      case "pause":
        return await pauseCommand(flags, { ...ctx, json });
      case "resume":
        return await resumeCommand(flags, { ...ctx, json });
      case "verify-ledger":
        return await verifyLedgerCommand(flags, { ...ctx, json });
      case "export-evidence":
        return await exportEvidenceCommand(flags, { ...ctx, json });
      case "close":
        return await closeCommand(flags, { ...ctx, json });
      case "join":
        return await joinCommand(flags, { ...ctx, json });
      case "leave":
        return await leaveCommand(flags, { ...ctx, json });
      case "follow":
        return await followCommand(flags, { ...ctx, json });
      case "rooms":
        return await roomsCommand(flags, { ...ctx, json });
      case "room":
        return await roomCommand(flags, positional, { ...ctx, json });
      default: {
        // exhaustiveness check — should never reach here because
        // COMMANDS.has() already filtered unknown commands above
        return {
          exitCode: 99,
          stdout: "",
          stderr: `internal error: unhandled command ${command}`,
        };
      }
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (json) {
      return {
        exitCode: 1,
        stdout: JSON.stringify({ error: message, ok: false }),
        stderr: "",
      };
    }
    return {
      exitCode: 1,
      stdout: "",
      stderr: `error: ${message}\n`,
    };
  }
}

// ─── Main entry point ───

async function main() {
  const args = process.argv.slice(2);
  const ctx: CliContext = {
    stdin: "",
    cwd: process.cwd(),
  };

  // Read stdin if available (for init confirmation)
  try {
    if (process.stdin && !process.stdin.isTTY) {
      const chunks: Buffer[] = [];
      for await (const chunk of process.stdin) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
      ctx.stdin = Buffer.concat(chunks).toString().trim();
    }
  } catch {
    // stdin may not be available
  }

  const result = await runCli(args, ctx);
  // Preserve command-returned output bytes: append a newline only when a
  // non-empty stream does not already end in one. Commands already return
  // trailing-newline output (e.g. `${HUMAN_LINE}\n`); appending again would
  // emit a double newline from the shipped entrypoint.
  if (result.stdout) {
    process.stdout.write(result.stdout.endsWith("\n") ? result.stdout : `${result.stdout}\n`);
  }
  if (result.stderr) {
    process.stderr.write(result.stderr.endsWith("\n") ? result.stderr : `${result.stderr}\n`);
  }
  process.exit(result.exitCode);
}

// Run only if invoked directly (not imported by tests)
const isMain = typeof Bun !== "undefined" && Bun.main === import.meta.path;
if (isMain) {
  main();
}
