// packages/adapter-claude-code/src/mcp-config.ts
// Produce a diff-like config preview and a restorable backup before changing
// Claude Code MCP/hook configuration. Never mutates live config during preview.

import { mkdtempSync, writeFileSync, existsSync, readFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

function sha256Hex(s: string): string {
  const h = new Bun.CryptoHasher("sha256");
  h.update(s);
  return h.digest("hex");
}

export interface ConfigChangeSet {
  readonly targetPath: string;
  readonly beforeSha256: string | null;
  readonly proposedSha256: string;
  readonly renderedDiff: string;
  readonly backupPath: string;
}

export function prepareConfigPreview(
  targetPath: string,
  proposedContent: string,
): ConfigChangeSet {
  const before = existsSync(targetPath) ? readFileSync(targetPath, "utf8") : null;
  const beforeSha256 = before ? sha256Hex(before) : null;
  const proposedSha256 = sha256Hex(proposedContent);

  // Backup (always restorable): if no current file, back up an empty marker so
  // the restore path is always present and the change is reversible.
  const dir = mkdtempSync(join(tmpdir(), "madv-bak-"));
  const backupPath = join(dir, "settings.backup.bak");
  writeFileSync(backupPath, before ?? "");

  const renderedDiff = before === null
    ? `+ ${proposedContent}`
    : renderUnifiedDiff(before, proposedContent);

  return { targetPath, beforeSha256, proposedSha256, renderedDiff, backupPath };
}

function renderUnifiedDiff(before: string, after: string): string {
  const b = before.split("\n");
  const a = after.split("\n");
  const out: string[] = [];
  for (let i = 0; i < Math.max(b.length, a.length); i++) {
    const bl = b[i];
    const al = a[i];
    if (bl === undefined) out.push(`+ ${al}`);
    else if (al === undefined) out.push(`- ${bl}`);
    else if (bl !== al) {
      out.push(`- ${bl}`);
      out.push(`+ ${al}`);
    } else {
      out.push(`  ${bl}`);
    }
  }
  return out.join("\n");
}
