import { linkSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export function writeTranscript(directory: string, name: string, trace: string): void {
  const output = realpathSync(directory);
  const temporary = mkdtempSync(join(output, ".m1-transcript-"));
  try {
    const prepared = join(temporary, name);
    writeFileSync(prepared, [
      "Offline M1 | " + name,
      "Stand-ins: madbridge-claude-v5 and madv-surface",
      trace.trimEnd(), "",
    ].join("\n"), { mode: 0o600 });
    linkSync(prepared, join(output, name));
    console.log(name);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
}
