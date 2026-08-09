// apps/madbridge/src/commands/verify-ledger.ts
// verify-ledger — performs complete-chain verification.
// Opens the ledger database and runs verify() to check every link
// in the hash chain from genesis to head.

import { existsSync } from "fs";
import { join } from "path";
import { Ledger } from "@madventures/ledger";
import type { CommandFlags, CommandContext, CommandResult } from "./types";

export async function verifyLedgerCommand(
  flags: CommandFlags,
  ctx: CommandContext,
): Promise<CommandResult> {
  // Resolve ledger path
  const ledgerPath = typeof flags["ledger"] === "string"
    ? (flags["ledger"].startsWith("/") ? flags["ledger"] : join(ctx.cwd, flags["ledger"]))
    : join(ctx.cwd, ".madv-runtime", "ledger", "ledger.db");

  if (!existsSync(ledgerPath)) {
    if (ctx.json) {
      return {
        exitCode: 1,
        stdout: JSON.stringify({
          error: "ledger_not_found",
          ok: false,
          path: ledgerPath,
        }),
        stderr: "",
      };
    }
    return {
      exitCode: 1,
      stdout: "",
      stderr: `ledger not found: ${ledgerPath}\n`,
    };
  }

  // Open and verify — complete chain verification
  let ledger: Ledger;
  try {
    ledger = new Ledger(ledgerPath);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (ctx.json) {
      return {
        exitCode: 1,
        stdout: JSON.stringify({ error: `ledger_open_failed: ${msg}`, ok: false }),
        stderr: "",
      };
    }
    return {
      exitCode: 1,
      stdout: "",
      stderr: `failed to open ledger: ${msg}\n`,
    };
  }

  let result;
  try {
    result = ledger.verify();
  } catch (err) {
    ledger.close();
    const msg = err instanceof Error ? err.message : String(err);
    if (ctx.json) {
      return {
        exitCode: 1,
        stdout: JSON.stringify({ error: `verification_failed: ${msg}`, ok: false }),
        stderr: "",
      };
    }
    return {
      exitCode: 1,
      stdout: "",
      stderr: `verification failed: ${msg}\n`,
    };
  }

  ledger.close();

  if (!result.valid) {
    if (ctx.json) {
      return {
        exitCode: 1,
        stdout: JSON.stringify({
          ok: false,
          valid: false,
          count: result.count,
          head: result.head,
          brokenSequence: result.brokenSequence,
        }),
        stderr: "",
      };
    }
    return {
      exitCode: 1,
      stdout: "",
      stderr: `ledger verification FAILED at sequence ${result.brokenSequence} (${result.count} events checked)\n`,
    };
  }

  if (ctx.json) {
    return {
      exitCode: 0,
      stdout: JSON.stringify({
        ok: true,
        valid: true,
        count: result.count,
        head: result.head,
      }),
      stderr: "",
    };
  }

  return {
    exitCode: 0,
    stdout: `Ledger verification: PASS\nEvents: ${result.count}\nHead: ${result.head.slice(0, 16)}…\n`,
    stderr: "",
  };
}
