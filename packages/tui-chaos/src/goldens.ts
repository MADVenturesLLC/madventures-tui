// packages/tui-chaos/src/goldens.ts
// Golden grid fixtures for governance_focus and layout_resize.
//
// A golden is the scenario's final full grid text (sha256-stamped header).
// Golden mode is opt-in per scenario: update with `run --update-goldens`,
// compare by default. A mismatch fails the scenario with a row-level diff so
// the failure is actionable without re-running anything.

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

export const GOLDEN_SCENARIOS = ["governance_focus", "layout_resize"] as const;

export function goldensDir(repoRoot: string): string {
  return path.join(repoRoot, "testdata", "tui-chaos", "goldens");
}

export function goldenPath(repoRoot: string, scenario: string): string {
  return path.join(goldensDir(repoRoot), `${scenario}.grid.txt`);
}

function stamp(grid: string): string {
  return `# golden grid for tui-chaos — sha256:${createHash("sha256").update(grid, "utf8").digest("hex")}\n`;
}

/**
 * Right-trim every row. Terminal rows often carry trailing spaces painted
 * with a non-default background attribute, which xterm's translateToString
 * cannot trim — and repo policy (git diff --check) forbids trailing
 * whitespace in committed files. Comparison normalizes both sides the same
 * way, so equality semantics are unchanged.
 */
function normalizeGrid(grid: string): string {
  return grid
    .split("\n")
    .map((row) => row.replace(/[ \t]+$/, ""))
    .join("\n");
}

export function updateGolden(repoRoot: string, scenario: string, grid: string): string {
  const file = goldenPath(repoRoot, scenario);
  const normalized = normalizeGrid(grid);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, stamp(normalized) + normalized + "\n", "utf8");
  return file;
}

export interface GoldenComparison {
  scenario: string;
  pass: boolean;
  detail: string;
  goldenFile: string;
}

export function compareGolden(repoRoot: string, scenario: string, grid: string): GoldenComparison {
  const file = goldenPath(repoRoot, scenario);
  if (!existsSync(file)) {
    return {
      scenario,
      pass: false,
      detail: `golden missing: ${file} — run once with --update-goldens to record it`,
      goldenFile: file,
    };
  }
  const raw = readFileSync(file, "utf8");
  const goldenGrid = normalizeGrid(raw.replace(/^#.*\n/, "").replace(/\n$/, ""));
  const actualGrid = normalizeGrid(grid);
  if (goldenGrid === actualGrid) {
    return { scenario, pass: true, detail: `matches ${file}`, goldenFile: file };
  }
  const goldenRows = goldenGrid.split("\n");
  const actualRows = actualGrid.split("\n");
  const diffs: string[] = [];
  const maxRows = Math.max(goldenRows.length, actualRows.length);
  for (let i = 0; i < maxRows && diffs.length < 10; i++) {
    const g = goldenRows[i] ?? "<missing>";
    const a = actualRows[i] ?? "<missing>";
    if (g !== a) {
      diffs.push(`row ${i + 1}:\n  golden: ${JSON.stringify(g)}\n  actual: ${JSON.stringify(a)}`);
    }
  }
  return {
    scenario,
    pass: false,
    detail: `grid differs from golden ${file}\n${diffs.join("\n")}`,
    goldenFile: file,
  };
}
