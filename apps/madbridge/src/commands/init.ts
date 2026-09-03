// apps/madbridge/src/commands/init.ts
// init — preview and, only after Founder confirmation, create the host
// storage root (spec §9.9). Resolves the passwd home, validates $HOME
// consistency, previews the default root or MADV_STORAGE_DIR override,
// previews only root/sessions/capability, and writes nothing into the
// governed repository. init is not required for transactional startup.
// Existing .madv-runtime data is legacy user data and is never deleted
// or migrated.

import { mkdirSync } from "fs";
import { join } from "path";
import {
  assertHomeConsistency,
  proposeStorageRoot,
  STORAGE_SUBDIRECTORIES,
  validateStorageRoot,
} from "@madventures/storage";
import type { CommandContext, CommandFlags, CommandResult } from "./types";

interface Preview {
  root: string;
  subdirectories: readonly string[];
}

export async function initCommand(
  flags: CommandFlags,
  ctx: CommandContext,
): Promise<CommandResult> {
  assertHomeConsistency(process.env);

  const root = proposeStorageRoot(process.env, ctx.cwd, ctx.cwd);
  const preview: Preview = { root, subdirectories: STORAGE_SUBDIRECTORIES };

  const autoConfirm = flags["yes"] === true;
  const confirmed = autoConfirm || ctx.stdin === "y" || ctx.stdin === "yes";

  if (!confirmed) {
    if (ctx.json) {
      return {
        exitCode: 0,
        stdout: JSON.stringify({ ok: true, preview, applied: false }),
        stderr: "",
      };
    }
    return {
      exitCode: 0,
      stdout: formatPreview(preview, false),
      stderr: "",
    };
  }

  const validation = validateStorageRoot(root, ctx.cwd, ctx.cwd);
  if (!validation.ok) {
    const message = `storage root failed validation: ${validation.failure}`;
    if (ctx.json) {
      return {
        exitCode: 1,
        stdout: JSON.stringify({ ok: false, preview, applied: false, error: message }),
        stderr: "",
      };
    }
    return { exitCode: 1, stdout: "", stderr: `error: ${message}\n` };
  }

  mkdirSync(root, { recursive: true, mode: 0o700 });
  for (const dir of STORAGE_SUBDIRECTORIES) {
    mkdirSync(join(root, dir), { recursive: true, mode: 0o700 });
  }

  if (ctx.json) {
    return {
      exitCode: 0,
      stdout: JSON.stringify({ ok: true, preview, applied: true }),
      stderr: "",
    };
  }

  return {
    exitCode: 0,
    stdout: formatPreview(preview, true),
    stderr: "",
  };
}

function formatPreview(preview: Preview, applied: boolean): string {
  const lines: string[] = [];
  lines.push(applied ? "Init applied:" : "Init preview (not applied):");
  lines.push("");
  lines.push(`Root: ${preview.root}`);
  lines.push("Subdirectories:");
  for (const dir of preview.subdirectories) {
    lines.push(`  ${dir}`);
  }
  if (!applied) {
    lines.push("");
    lines.push("To apply, run with --yes or pipe 'y' to stdin.");
  }
  return lines.join("\n");
}
