// packages/honesty-compiler/test/generate-goldens.ts
// Regenerates test/goldens/*.golden.json from the fixtures. Run from the
// repo root:
//   bun packages/honesty-compiler/test/generate-goldens.ts
// Goldens pin produced_at via `now`, so the only reason a golden changes is
// that compiler behavior changed — review the diff, never hand-edit.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { compileClaims, renderJsonLine } from "../src/index";

const REPO_ROOT = resolve(import.meta.dir, "../../..");
const PINNED_NOW = "2026-09-13T12:00:00.000Z";

const CASES: ReadonlyArray<{ name: string; file: string }> = [
  { name: "pass-verify", file: "honest-verify.json" },
  { name: "pass-spec-only", file: "honest-spec-only.json" },
  { name: "pass-fixture-suite", file: "honest-fixture-suite.json" },
  { name: "pass-proving-ground-skip", file: "pass-proving-ground-skip.json" },
  { name: "fail-overclaim-rung", file: "lying-overclaim-rung.json" },
  { name: "fail-stale-ship", file: "lying-stale-ship.json" },
  { name: "fail-missing-evidence", file: "lying-missing-evidence.json" },
  { name: "fail-forbidden-token", file: "lying-forbidden-token.json" },
  { name: "fail-unknown-field", file: "lying-unknown-field.json" },
  { name: "fail-bad-argus-sha", file: "lying-bad-argus-sha.json" },
];

const CLAIMS_DIR = resolve(import.meta.dir, "../fixtures/claims");

for (const c of CASES) {
  const claimsText = readFileSync(resolve(CLAIMS_DIR, c.file), "utf8");
  const outcome = await compileClaims({
    mode: "fixture",
    rootDir: REPO_ROOT,
    sourceLabel: `packages/honesty-compiler/fixtures/claims/${c.file}`,
    inputDir: CLAIMS_DIR,
    claimsText,
    now: PINNED_NOW,
  });
  if (!outcome.ok) {
    throw new Error(`tooling error while generating ${c.name}: ${outcome.issue.message}`);
  }
  const golden = JSON.stringify(JSON.parse(renderJsonLine(outcome.result)), null, 2);
  const outPath = resolve(import.meta.dir, `goldens/${c.name}.golden.json`);
  writeFileSync(outPath, `${golden}\n`, "utf8");
  process.stdout.write(`${c.name}: exit ${String(outcome.result.exit_code)} verdict ${outcome.result.verdict.verdict}\n`);
}
