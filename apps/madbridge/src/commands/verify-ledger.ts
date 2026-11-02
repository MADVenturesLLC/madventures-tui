// apps/madbridge/src/commands/verify-ledger.ts
// verify-ledger — performs complete-chain verification.
// Opens the ledger database and runs verify() to check every link
// in the hash chain from genesis to head.

import { existsSync } from "fs";
import { dirname, join } from "path";
import { Ledger } from "@madventures/ledger";
import { assertHomeConsistency, proposeStorageRoot, validateStorageRoot } from "@madventures/storage";
import type { CommandFlags, CommandContext, CommandResult } from "./types";

export function resolveEvidencePaths(flags: CommandFlags, ctx: CommandContext):
  | { readonly ok: true; readonly ledgerPath: string; readonly artifactsDir: string; readonly outputDir: string }
  | { readonly ok: false; readonly result: CommandResult } {
  const fail = (error: string) => ({ ok: false as const, result: {
    exitCode: 1, stdout: ctx.json ? JSON.stringify({ ok: false, error }) : "",
    stderr: ctx.json ? "" : `error: ${error}\n`,
  } });
  const explicit = (path: string) => path.startsWith("/") ? path : join(ctx.cwd, path);
  const session = flags["session"];
  let sessionDir: string | undefined;
  if (session !== undefined) {
    // Match the filesystem-safe IDs accepted by createSessionStorage.
    if (typeof session !== "string" || !/^[A-Za-z0-9_-]{1,128}$/.test(session)) return fail("invalid_session");
    try {
      assertHomeConsistency(process.env);
      const root = proposeStorageRoot(process.env, ctx.cwd, ctx.cwd);
      sessionDir = join(root, "sessions", session);
      for (const path of [root, sessionDir]) {
        const validation = validateStorageRoot(path, ctx.cwd, ctx.cwd);
        if (!validation.ok) return fail(`storage_root_invalid:${validation.failure}`);
      }
    } catch { return fail("storage_root_invalid"); }
  } else if (typeof flags["ledger"] !== "string") return fail("session_required");

  const ledgerPath = typeof flags["ledger"] === "string" ? explicit(flags["ledger"])
    : join(sessionDir!, "ledger", "ledger.sqlite3"); // The transactional build's existing filename.
  if (sessionDir !== undefined && typeof flags["ledger"] !== "string") {
    const validation = validateStorageRoot(dirname(ledgerPath), ctx.cwd, ctx.cwd);
    if (!validation.ok) return fail(`storage_root_invalid:${validation.failure}`);
  }
  return { ok: true, ledgerPath,
    artifactsDir: typeof flags["artifacts"] === "string" ? explicit(flags["artifacts"])
      : join(sessionDir ?? dirname(dirname(ledgerPath)), "artifacts"),
    outputDir: typeof flags["output"] === "string" ? explicit(flags["output"])
      : sessionDir === undefined ? join(ctx.cwd, "evidence-export") : join(sessionDir, "sanitized-evidence"),
  };
}

export async function verifyLedgerCommand(
  flags: CommandFlags,
  ctx: CommandContext,
): Promise<CommandResult> {
  const paths = resolveEvidencePaths(flags, ctx);
  if (!paths.ok) return paths.result;
  const { ledgerPath } = paths;

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
