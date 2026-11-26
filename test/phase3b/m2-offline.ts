import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { offlineStart } from "./offline";
import { offlinePreflight } from "./preflight-input";
import type { End, Surface } from "./end-stand-in";

export function prepareM2(surface: Surface, before: boolean, end: End) {
  const f = offlineStart();
  try {
    const probe = readFileSync(new URL("./stand-in.ts", import.meta.url));
    const launch = readFileSync(new URL("./end-stand-in.ts", import.meta.url));
    const bun = "'" + process.execPath.replaceAll("'", "'\\''") + "'";
    const bootstrap = ["#!/bin/sh", 'cd "${0%/*}/../work" || exit 2',
      'if [ -t 0 ]; then exec ' + bun + ' --no-env-file "$0.launch.ts" "$@"; fi',
      'exec ' + bun + ' --no-env-file "$0.ts" "$@"', ""].join("\n");
    for (const child of f.plan.executions) {
      writeFileSync(child.executablePath, bootstrap);
      writeFileSync(child.executablePath + ".ts", probe);
      writeFileSync(child.executablePath + ".launch.ts", launch);
    }
    const stateProbe = join(f.bin, "ps");
    writeFileSync(stateProbe + ".ts", launch);
    writeFileSync(stateProbe, '#!/bin/sh\ncd "${0%/*}/../work" || exit 2\nexec ' + bun + ' --no-env-file "$0.ts" "$@"\n', { mode: 0o700 });
    writeFileSync(join(f.root, "m2-case.json"), JSON.stringify({ surface, before, end }));
    writeFileSync(join(f.root, "scenario"), "healthy");
    writeFileSync(join(f.root, "trace"), "");
    const input = offlinePreflight(f);
    return { ...f, input, release: () => writeFileSync(join(f.root, "release-end"), ""),
      start: { envelope: f.envelope, preflight: input, workingDirectory: f.work, configFolder: f.config, managedFolder: f.managed } };
  } catch (error) { f.dispose(); throw error; }
}
