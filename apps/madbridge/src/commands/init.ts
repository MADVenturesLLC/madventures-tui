// apps/madbridge/src/commands/init.ts
// init — preview runtime directory and CLI configuration changes,
// request Founder confirmation, create only approved directories,
// and preserve restorable backups.

import { existsSync, mkdirSync, readFileSync, writeFileSync, renameSync, readdirSync } from "fs";
import { join } from "path";
import type { CommandFlags, CommandContext, CommandResult } from "./types";

const APPROVED_DIRS = [
  ".madv-runtime",
  ".madv-runtime/sessions",
  ".madv-runtime/ledger",
  ".madv-runtime/artifacts",
  ".madv-runtime/backups",
];

export async function initCommand(
  flags: CommandFlags,
  ctx: CommandContext,
): Promise<CommandResult> {
  const cwd = ctx.cwd;

  // Build preview of what would change
  const preview = buildPreview(cwd);

  // Check if --yes flag is present (auto-confirm)
  const autoConfirm = flags["yes"] === true;
  let confirmed = autoConfirm;

  if (!autoConfirm) {
    // Request Founder confirmation via stdin
    if (ctx.json) {
      // In JSON mode, return preview and ask for confirmation
      // If stdin contains "y" or "yes", apply; otherwise just preview
      confirmed = ctx.stdin === "y" || ctx.stdin === "yes";
    } else {
      // In text mode, check stdin
      confirmed = ctx.stdin === "y" || ctx.stdin === "yes";
    }
  }

  if (!confirmed) {
    // Return preview only, no changes applied
    if (ctx.json) {
      return {
        exitCode: 0,
        stdout: JSON.stringify({
          ok: true,
          preview,
          applied: false,
          message: "Confirmation declined. No changes made.",
        }),
        stderr: "",
      };
    }
    return {
      exitCode: 0,
      stdout: formatPreview(preview, false),
      stderr: "",
    };
  }

  // Apply changes — create approved directories
  const created: string[] = [];
  const backed_up: string[] = [];

  for (const dir of APPROVED_DIRS) {
    const fullPath = join(cwd, dir);
    if (!existsSync(fullPath)) {
      mkdirSync(fullPath, { recursive: true, mode: 0o700 });
      created.push(dir);
    }
  }

  // Preserve restorable backup of existing config if present
  const configPath = join(cwd, ".madv-runtime", "config.json");
  if (existsSync(configPath)) {
    const backupPath = join(cwd, ".madv-runtime", "backups", `config-${Date.now()}.bak`);
    const existing = readFileSync(configPath);
    writeFileSync(backupPath, existing);
    backed_up.push(backupPath);
  }

  // Write default config
  const defaultConfig = {
    version: "madbridge-protocol/v1",
    runtime_dir: ".madv-runtime",
    created_at: new Date().toISOString(),
  };
  writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));

  if (ctx.json) {
    return {
      exitCode: 0,
      stdout: JSON.stringify({
        ok: true,
        preview,
        applied: true,
        created,
        backed_up,
      }),
      stderr: "",
    };
  }

  return {
    exitCode: 0,
    stdout: formatPreview(preview, true) + `\nCreated: ${created.join(", ") || "none"}\n`,
    stderr: "",
  };
}

interface PreviewItem {
  path: string;
  action: "create" | "exists" | "backup";
}

function buildPreview(cwd: string): { dirs: PreviewItem[]; config: PreviewItem } {
  const dirs: PreviewItem[] = APPROVED_DIRS.map((dir) => {
    const fullPath = join(cwd, dir);
    return {
      path: dir,
      action: existsSync(fullPath) ? "exists" as const : "create" as const,
    };
  });

  const configPath = join(cwd, ".madv-runtime", "config.json");
  return {
    dirs,
    config: {
      path: ".madv-runtime/config.json",
      action: existsSync(configPath) ? "backup" as const : "create" as const,
    },
  };
}

function formatPreview(preview: { dirs: PreviewItem[]; config: PreviewItem }, applied: boolean): string {
  const lines: string[] = [];
  lines.push(applied ? "Init applied:" : "Init preview (not applied):");
  lines.push("");
  lines.push("Directories:");
  for (const d of preview.dirs) {
    lines.push(`  ${d.action === "create" ? "+" : "="} ${d.path}`);
  }
  lines.push("");
  lines.push(`Config: ${preview.config.action} ${preview.config.path}`);
  if (!applied) {
    lines.push("");
    lines.push("To apply, run with --yes or pipe 'y' to stdin.");
  }
  return lines.join("\n");
}
