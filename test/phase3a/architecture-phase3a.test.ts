import { describe, expect, test } from "bun:test";
import {
  readFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
  writeFileSync,
  rmSync,
  mkdtempSync,
} from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import * as ts from "typescript";

/**
 * Phase 3A baseline floor.
 *
 * Pins the Phase 2 suite as an executable floor (spec section 6.8.1): no required
 * test may be silently disabled, and no test may be focused. Detection is
 * syntax-aware (TypeScript AST), so it is immune to whitespace and line breaks
 * between an identifier and its member, and it never treats comments or string
 * literals as calls.
 */

// Repository root is derived from this module's committed location, never from
// process.cwd(), so the guard cannot be silently disabled by running tests from
// outside the repository.
const MODULE_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(MODULE_DIR, "..", "..");

// The exact comment that authorizes a skip. For a skip to count as disposed,
// the line immediately above its starting line (after leading whitespace is
// removed) must START with this marker. Marker text inside a string or later
// in a non-comment line does not authorize anything.
const DISPOSITION_MARKER = "// FOUNDER-DISPOSITION:";

const GOVERNED_IDENTIFIERS = new Set(["test", "describe", "it"]);

interface Violation {
  file: string;
  line: number;
  text: string;
  reason: string;
}

function report(v: Violation): string {
  return `${v.file}:${v.line} [${v.reason}] ${v.text}`;
}

/** Resolve the TypeScript script kind from a governed file extension. */
function scriptKindFor(fileName: string): ts.ScriptKind {
  return fileName.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
}

/**
 * Syntax-aware detection of governed skip/only call expressions in a source
 * string. Returns violations with accurate 1-based starting source lines.
 *
 * - Whitespace and line breaks between the identifier and member are ignored.
 * - Comments and string/template literals are never treated as calls.
 * - A skip is permitted only when the line immediately above its starting line
 *   (after trimming leading whitespace) starts with the disposition marker.
 * - A focus (.only) call is never permitted, even with a valid disposition.
 */
function findViolationsInSource(sourceText: string, fileName: string): Violation[] {
  const sourceFile = ts.createSourceFile(
    fileName,
    sourceText,
    ts.ScriptTarget.Latest,
    /* setParentNodes */ true,
    scriptKindFor(fileName),
  );
  const lines = sourceText.split(/\r?\n/);
  const violations: Violation[] = [];

  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
      const access = node.expression;
      const member = access.name.text;
      if (member === "skip" || member === "only") {
        const receiver = access.expression;
        if (ts.isIdentifier(receiver) && GOVERNED_IDENTIFIERS.has(receiver.text)) {
          const start = node.getStart(sourceFile);
          const lineNumber = sourceFile.getLineAndCharacterOfPosition(start).line + 1;
          const text = sourceText.slice(start, node.getEnd()).replace(/\s+/g, " ").trim();
          if (member === "only") {
            violations.push({ file: fileName, line: lineNumber, text, reason: "focus" });
          } else {
            const above = lineNumber >= 2 ? (lines[lineNumber - 2] ?? "") : "";
            if (!above.trim().startsWith(DISPOSITION_MARKER)) {
              violations.push({ file: fileName, line: lineNumber, text, reason: "skip" });
            }
          }
        }
      }
    }
    node.forEachChild(visit);
  };
  visit(sourceFile);
  return violations;
}

/** Recursively list .ts/.tsx files beneath a directory. */
function listSourceFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listSourceFiles(full));
    } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
      out.push(full);
    }
  }
  return out;
}

/**
 * Enumerate governed test files relative to a repository root: the top-level
 * test/ tree plus every directory named test nested under packages/ or apps/.
 * Deterministic order; node_modules is excluded.
 */
function enumerateGovernedFiles(root: string): string[] {
  const files = new Set<string>();
  for (const f of listSourceFiles(join(root, "test"))) files.add(f);
  for (const area of ["packages", "apps"]) {
    for (const f of listSourceFiles(join(root, area))) {
      if (f.includes("/node_modules/")) continue;
      if (f.includes("/test/")) files.add(f);
    }
  }
  return [...files].sort();
}

/**
 * Scan every governed test file under a repository root. Fails closed if the
 * required top-level test root is absent. Violations carry repo-relative paths.
 */
function scanRepository(root: string): Violation[] {
  const topTest = join(root, "test");
  if (!existsSync(topTest)) {
    throw new Error(
      `Phase 3A baseline floor: required top-level test root not found at ${topTest}`,
    );
  }
  const violations: Violation[] = [];
  for (const file of enumerateGovernedFiles(root)) {
    const rel = relative(root, file);
    const source = readFileSync(file, "utf8");
    violations.push(...findViolationsInSource(source, rel));
  }
  return violations.sort((a, b) =>
    a.file === b.file ? a.line - b.line : a.file < b.file ? -1 : 1,
  );
}

// ── Negative-control scaffolding (temp roots only; never persisted) ───────

function makeTempRoot(): string {
  return mkdtempSync(join(tmpdir(), "phase3a-guard-"));
}

function writeTempFile(root: string, relPath: string, content: string): void {
  const full = join(root, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, "utf8");
}

describe("Phase 3A baseline floor", () => {
  test("no required test file uses test.skip or describe.skip without a disposition marker", () => {
    const violations = scanRepository(REPO_ROOT).filter((v) => v.reason === "skip");
    expect(violations.map(report)).toEqual([]);
  });

  test("no source file marks a test .only", () => {
    const violations = scanRepository(REPO_ROOT).filter((v) => v.reason === "focus");
    expect(violations.map(report)).toEqual([]);
  });

  // ── F1: syntax-aware detection of spaced and multiline calls ───────────

  test("detects spaced skip and only calls for test, describe, and it", () => {
    const source = [
      `test . skip ("a");`,
      `describe . skip ("b");`,
      `it . skip ("c");`,
      `test . only ("d");`,
    ].join("\n");
    const v = findViolationsInSource(source, "spaced.ts");
    expect(v).toHaveLength(4);
    expect(v.filter((x) => x.reason === "skip")).toHaveLength(3);
    expect(v.filter((x) => x.reason === "focus")).toHaveLength(1);
  });

  test("detects multiline skip and only calls and maps them to their starting line", () => {
    const source = [
      `test`,
      `  .skip("a");`,
      `describe`,
      `  .only("b");`,
      `it`,
      `  .skip("c");`,
    ].join("\n");
    const v = findViolationsInSource(source, "multiline.ts");
    expect(v).toHaveLength(3);
    expect(v[0]!.line).toBe(1);
    expect(v.filter((x) => x.reason === "skip")).toHaveLength(2);
    expect(v.filter((x) => x.reason === "focus")).toHaveLength(1);
  });

  test("ignores call-like text in comments and string literals", () => {
    const source = [
      `// test.skip("a");`,
      `const s = "test.only(b)";`,
      `/* describe.skip(c) */`,
      `const t = \`it.skip(d)\`;`,
    ].join("\n");
    const v = findViolationsInSource(source, "noise.ts");
    expect(v).toEqual([]);
  });

  // ── F3: a real disposition comment is required ─────────────────────────

  test("an indented disposition comment immediately above a skip allows it", () => {
    const source = `  // FOUNDER-DISPOSITION: tracked in JIRA-1\ntest.skip("a");`;
    const v = findViolationsInSource(source, "disposed.ts");
    expect(v).toEqual([]);
  });

  test("marker text inside a string or later in a non-comment line does not authorize a skip", () => {
    const inString = `const m = "// FOUNDER-DISPOSITION:";\ntest.skip("a");`;
    const midLine = `const x = 1; // FOUNDER-DISPOSITION:\ntest.skip("a");`;
    expect(
      findViolationsInSource(inString, "s.ts").filter((x) => x.reason === "skip"),
    ).toHaveLength(1);
    expect(
      findViolationsInSource(midLine, "s.ts").filter((x) => x.reason === "skip"),
    ).toHaveLength(1);
  });

  test("a blank line between the valid marker and the skip fails", () => {
    const source = `// FOUNDER-DISPOSITION: r\n\ntest.skip("a");`;
    const v = findViolationsInSource(source, "blank.ts");
    expect(v.filter((x) => x.reason === "skip")).toHaveLength(1);
  });

  test(".only with a valid disposition marker still fails", () => {
    const source = `// FOUNDER-DISPOSITION: r\ntest.only("a");`;
    const v = findViolationsInSource(source, "only.ts");
    expect(v.filter((x) => x.reason === "focus")).toHaveLength(1);
  });

  // ── F2: root anchoring, fail-closed, and cwd independence ──────────────

  test("repository root is derived from the module location, not the working directory", () => {
    const saved = process.cwd();
    try {
      process.chdir(tmpdir());
      expect(REPO_ROOT).not.toBe(process.cwd());
      expect(existsSync(join(REPO_ROOT, "test"))).toBe(true);
      expect(existsSync(join(REPO_ROOT, "package.json"))).toBe(true);
    } finally {
      process.chdir(saved);
    }
  });

  test("scan still detects a planted violation when run from a non-root working directory", () => {
    const root = makeTempRoot();
    writeTempFile(root, "test/probe.test.ts", 'test.skip("p", () => {});\n');
    const saved = process.cwd();
    try {
      process.chdir(tmpdir());
      const v = scanRepository(root);
      expect(v.filter((x) => x.reason === "skip")).toHaveLength(1);
    } finally {
      process.chdir(saved);
      rmSync(root, { recursive: true, force: true });
    }
  });

  test("scan fails closed when the required top-level test root is missing", () => {
    const root = makeTempRoot(); // empty: no top-level test/ directory
    try {
      expect(() => scanRepository(root)).toThrow();
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  test("governed enumeration covers nested packages and apps test roots and tsx sources", () => {
    const root = makeTempRoot();
    writeTempFile(root, "test/top.test.ts", 'test("ok", () => {});\n');
    writeTempFile(root, "packages/a/test/nested.test.ts", 'test.skip("n", () => {});\n');
    writeTempFile(root, "apps/b/test/app.test.tsx", 'test.only("o", () => {});\n');
    try {
      const v = scanRepository(root);
      expect(v.some((x) => x.reason === "skip")).toBe(true);
      expect(v.some((x) => x.reason === "focus")).toBe(true);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
