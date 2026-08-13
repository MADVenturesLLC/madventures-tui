import { describe, expect, test } from "bun:test";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Phase 3A baseline floor.
 *
 * Pins the Phase 2 suite as an executable floor (spec section 6.8.1): no required test
 * may be silently disabled, and no test may be focused. These guards keep the
 * 714 / 2606-expect / 35-file floor honest across the Phase 3A migration.
 */

// The exact comment that authorizes a skip. It must appear on the line
// immediately above the skip call.
const DISPOSITION_MARKER = "// FOUNDER-DISPOSITION:";

// Detection patterns. These are escaped regex literals so the guard never
// matches its own definitions: the source text here uses backslash-escaped
// metacharacters, which are not the literal call forms searched for at runtime.
const SKIP_CALLS = [/test\.skip\(/, /describe\.skip\(/, /it\.skip\(/];
const ONLY_CALLS = [/test\.only\(/, /describe\.only\(/, /it\.only\(/];

/** Recursively list every executable TypeScript test-source file beneath a directory.

 * On this repository the governed roots carry both `.ts` and `.tsx` test sources,
 * so both extensions are enumerated. The set is closed: speculative extensions
 * that do not appear under the governed roots are intentionally not added.
 */
function listTsFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listTsFiles(full));
    } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
      out.push(full);
    }
  }
  return out;
}

/**
 * Enumerate the required test files: the top-level test/ tree plus every
 * directory named test nested under packages/ or apps/. Deterministic.
 */
function listRequiredTestFiles(): string[] {
  const files = new Set<string>();
  for (const f of listTsFiles("test")) files.add(f);
  for (const root of ["packages", "apps"]) {
    for (const f of listTsFiles(root)) {
      if (f.includes("/node_modules/")) continue;
      if (f.includes("/test/")) files.add(f);
    }
  }
  return [...files].sort();
}

interface Violation {
  file: string;
  line: number;
  text: string;
  reason: string;
}

/** Scan every required test file and collect every violation. */
function findViolations(): Violation[] {
  const violations: Violation[] = [];
  for (const file of listRequiredTestFiles()) {
    const lines = readFileSync(file, "utf8").split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i] ?? "";
      // A focus marker is never permitted, with or without a disposition.
      if (ONLY_CALLS.some((re) => re.test(line))) {
        violations.push({ file, line: i + 1, text: line.trim(), reason: "focus" });
        continue;
      }
      // A skip is permitted only with a disposition marker directly above it.
      if (SKIP_CALLS.some((re) => re.test(line))) {
        const above = i > 0 ? (lines[i - 1] ?? "") : "";
        if (!above.includes(DISPOSITION_MARKER)) {
          violations.push({ file, line: i + 1, text: line.trim(), reason: "skip" });
        }
      }
    }
  }
  return violations.sort((a, b) =>
    a.file === b.file ? a.line - b.line : a.file < b.file ? -1 : 1,
  );
}

function report(v: Violation): string {
  return `${v.file}:${v.line} [${v.reason}] ${v.text}`;
}

describe("Phase 3A baseline floor", () => {
  test("no required test file uses test.skip or describe.skip without a disposition marker", () => {
    const violations = findViolations().filter((v) => v.reason === "skip");
    expect(violations.map(report)).toEqual([]);
  });

  test("no source file marks a test .only", () => {
    const violations = findViolations().filter((v) => v.reason === "focus");
    expect(violations.map(report)).toEqual([]);
  });
});
