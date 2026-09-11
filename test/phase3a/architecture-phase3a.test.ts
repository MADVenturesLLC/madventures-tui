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
import { ADAPTER_REGISTRY } from "../../packages/protocol/src/adapter-registry";

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

/**
 * Phase 3A admission authority (Task 6).
 *
 * Invariant: production surface admission reads one closed, Founder-approved,
 * immutable map — ADAPTER_REGISTRY in packages/protocol/src/adapter-registry.ts
 * — and no other production module contains a surface-admission list.
 * packages/policy/** is excluded: its surface/model constants are legacy
 * Phase 2 action-policy validation, untouched in Phase 3A, and are not
 * envelope-admission authorities (Q4). This scanner is distinct from the
 * manual two-line grep verification: the scanner proves no admission source
 * exists outside the registry (policy excluded by documented disposition);
 * the grep proves token removal is complete outside the untouched policy
 * package.
 */

const ADMISSION_LIST_PATTERN = /KNOWN_SURFACES|allowedSurfaces|SUPPORTED_SURFACES/;
const ADAPTER_REGISTRY_PATH = "packages/protocol/src/adapter-registry.ts";

// The invariant is about admission by value, not by identifier name: any
// production collection initializer carrying a currently registered
// SurfaceId is an admission list, whatever it is called. Values are read
// from the real registry so this check cannot drift from the actual
// admission source.
const REGISTERED_SURFACE_IDS: ReadonlySet<string> = new Set(
  [...ADAPTER_REGISTRY.keys()].map(String),
);

interface AdmissionViolation {
  file: string;
  line: number;
  text: string;
}

function reportAdmission(v: AdmissionViolation): string {
  return `${v.file}:${v.line} [admission-list] ${v.text}`;
}

/**
 * Convert a filesystem path to forward-slash form so exclusion and equality
 * checks behave identically whether the host produced POSIX or Windows-style
 * separators. Used only for string comparison — the original path (returned
 * separately, untouched) is what filesystem calls must keep using.
 */
function toPortablePath(p: string): string {
  return p.replace(/\\/g, "/");
}

/** Recursively list .ts/.tsx production files under packages/ and apps/, excluding /test/ and /node_modules/. */
function enumerateProductionFiles(root: string): string[] {
  const files = new Set<string>();
  for (const area of ["packages", "apps"]) {
    for (const f of listSourceFiles(join(root, area))) {
      const portablePath = toPortablePath(f);
      if (portablePath.includes("/node_modules/") || portablePath.includes("/test/")) continue;
      files.add(f);
    }
  }
  return [...files].sort();
}

/**
 * Elements of a collection initializer — an array literal, or the array
 * literal argument of `new Set([...])` — or null if the node is neither.
 * Direct Map entry tuples are excluded here; Map keys are handled by
 * `mapInitializerKeyElements` so Map values are not treated as tuple elements.
 */
function collectionInitializerElements(node: ts.Node): readonly ts.Expression[] | null {
  if (ts.isArrayLiteralExpression(node)) {
    if (isDirectMapEntryTuple(node)) return null;
    return node.elements;
  }
  if (
    ts.isNewExpression(node) &&
    ts.isIdentifier(node.expression) &&
    node.expression.text === "Set" &&
    node.arguments &&
    node.arguments.length > 0 &&
    ts.isArrayLiteralExpression(node.arguments[0]!)
  ) {
    return (node.arguments[0] as ts.ArrayLiteralExpression).elements;
  }
  return null;
}

/**
 * Peel transparent TypeScript expression wrappers — parentheses, `as` /
 * `as const`, angle-bracket assertions, `satisfies`, and non-null `!` — so
 * Map-shape recognition and StringLiteralLike key checks see the underlying
 * node. Pure; does not unwrap identifiers, calls, spreads, or `await`.
 */
function unwrapTransparentExpression(node: ts.Node): ts.Node {
  let current = node;
  while (
    ts.isParenthesizedExpression(current) ||
    ts.isAsExpression(current) ||
    ts.isTypeAssertionExpression(current) ||
    ts.isSatisfiesExpression(current) ||
    ts.isNonNullExpression(current)
  ) {
    current = current.expression;
  }
  return current;
}

/**
 * True when `node` is a direct entry tuple of `new Map([[k, v], ...])` — an
 * array-literal element of the Map constructor's array-literal argument.
 * Suppressing generic array treatment for these tuples prevents Map values
 * from being flagged while still allowing recursive visitation of nested
 * independent admission collections inside those values. Transparent wrappers
 * around the tuple or the Map iterable are peeled via
 * `unwrapTransparentExpression` on the constructor argument and by climbing
 * wrapper parents whose `.expression` is the wrapped child.
 */
function isDirectMapEntryTuple(node: ts.ArrayLiteralExpression): boolean {
  let child: ts.Node = node;
  let parent: ts.Node | undefined = node.parent;
  while (
    parent &&
    (ts.isParenthesizedExpression(parent) ||
      ts.isAsExpression(parent) ||
      ts.isTypeAssertionExpression(parent) ||
      ts.isSatisfiesExpression(parent) ||
      ts.isNonNullExpression(parent)) &&
    parent.expression === child
  ) {
    child = parent;
    parent = parent.parent;
  }
  if (!parent || !ts.isArrayLiteralExpression(parent)) return false;

  let iterableChild: ts.Node = parent;
  let grand: ts.Node | undefined = parent.parent;
  while (
    grand &&
    (ts.isParenthesizedExpression(grand) ||
      ts.isAsExpression(grand) ||
      ts.isTypeAssertionExpression(grand) ||
      ts.isSatisfiesExpression(grand) ||
      ts.isNonNullExpression(grand)) &&
    grand.expression === iterableChild
  ) {
    iterableChild = grand;
    grand = grand.parent;
  }
  return (
    !!grand &&
    ts.isNewExpression(grand) &&
    ts.isIdentifier(grand.expression) &&
    grand.expression.text === "Map" &&
    !!grand.arguments &&
    grand.arguments.length > 0 &&
    unwrapTransparentExpression(grand.arguments[0]!) === parent
  );
}

/**
 * Map keys from `new Map([[k, v], ...])` entry tuples — only element 0 of each
 * direct entry-tuple array literal. Returns null when the node is not a Map
 * constructed from an array literal of entry tuples.
 */
function mapInitializerKeyElements(node: ts.Node): readonly ts.Expression[] | null {
  if (
    !(
      ts.isNewExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "Map" &&
      node.arguments &&
      node.arguments.length > 0 &&
      ts.isArrayLiteralExpression(unwrapTransparentExpression(node.arguments[0]!))
    )
  ) {
    return null;
  }
  const iterable = unwrapTransparentExpression(
    node.arguments[0]!,
  ) as ts.ArrayLiteralExpression;
  const keys: ts.Expression[] = [];
  for (const entry of iterable.elements) {
    const unwrappedEntry = unwrapTransparentExpression(entry);
    if (ts.isArrayLiteralExpression(unwrappedEntry) && unwrappedEntry.elements.length > 0) {
      keys.push(unwrappedEntry.elements[0]!);
    }
  }
  return keys;
}

// Mutable collection writes that can populate a collection created empty:
// Set.add, Array.push/unshift, and Map.set. A collection is an admission
// source whether its registered SurfaceIds arrive in the initializer or are
// written in afterwards, so both forms are inspected. For `.set()`, only
// argument 0 (the Map key) is an admission authority.
const MUTABLE_COLLECTION_WRITE_MEMBERS: ReadonlySet<string> = new Set([
  "add",
  "push",
  "unshift",
  "set",
]);

/**
 * Arguments of a mutable collection write — `x.add(...)`, `x.push(...)`,
 * `x.unshift(...)`, or `x.set(k, v)` — or null if the node is not such a call.
 * For `.set()`, only argument 0 is returned so Map values are not inspected.
 * This closes the empty-initializer gap: `new Set<SurfaceId>()` followed by
 * `.add("claude-code")` carries exactly the admission authority that
 * `new Set(["claude-code"])` does; likewise `map.set("claude-code", v)`.
 */
function mutableCollectionWriteArguments(node: ts.Node): readonly ts.Expression[] | null {
  if (
    ts.isCallExpression(node) &&
    ts.isPropertyAccessExpression(node.expression) &&
    MUTABLE_COLLECTION_WRITE_MEMBERS.has(node.expression.name.text)
  ) {
    if (node.expression.name.text === "set") {
      return node.arguments.length > 0 ? [node.arguments[0]!] : [];
    }
    return node.arguments;
  }
  return null;
}

/**
 * Syntax-aware detection of surface-admission collections whose contents
 * include a currently registered SurfaceId value, in either of the two forms
 * a collection can acquire them: a collection initializer (an array literal,
 * `new Set([...])`, or Map entry keys of `new Map([[k, v], ...])`), or a
 * mutable collection write (`.add`, `.push`, `.unshift`, `.set` key) into a
 * collection that may have been created empty. This is what closes the
 * identifier-name gap: an admission list under any name is still a collection
 * built from ratified SurfaceId strings, whenever those strings are put into
 * it. A bare SurfaceId string used outside a collection initializer or a
 * mutable collection write (a comparison, an ordinary call argument, a type
 * literal), and a SurfaceId used only as a Map value, is never flagged.
 */
function findRegisteredSurfaceCollectionsInSource(sourceText: string, fileName: string): number[] {
  const sourceFile = ts.createSourceFile(
    fileName,
    sourceText,
    ts.ScriptTarget.Latest,
    /* setParentNodes */ true,
    scriptKindFor(fileName),
  );
  const lineNumbers: number[] = [];

  const visit = (node: ts.Node): void => {
    const elements =
      mapInitializerKeyElements(node) ??
      collectionInitializerElements(node) ??
      mutableCollectionWriteArguments(node);
    if (elements) {
      const carriesRegisteredSurface = elements.some((el) => {
        const unwrapped = unwrapTransparentExpression(el);
        return (
          ts.isStringLiteralLike(unwrapped) &&
          REGISTERED_SURFACE_IDS.has((unwrapped as ts.StringLiteralLike).text)
        );
      });
      if (carriesRegisteredSurface) {
        const start = node.getStart(sourceFile);
        lineNumbers.push(sourceFile.getLineAndCharacterOfPosition(start).line + 1);
      }
    }
    node.forEachChild(visit);
  };
  visit(sourceFile);
  return lineNumbers;
}

/**
 * Scan production source under a repository root for surface-admission
 * collections outside the sanctioned adapter registry, excluding the
 * untouched packages/policy/ package. Detection is the union of two
 * strategies: the legacy identifier-name pattern (KNOWN_SURFACES,
 * allowedSurfaces, SUPPORTED_SURFACES) and syntax-aware detection of any
 * collection carrying a registered SurfaceId value — by initializer or by
 * mutable write — whatever its name. Fails closed if packages/ or apps/ is
 * absent.
 */
function scanAdmissionSources(root: string): AdmissionViolation[] {
  if (!existsSync(join(root, "packages")) || !existsSync(join(root, "apps"))) {
    throw new Error(
      `Phase 3A admission-source scan: required packages/ and apps/ roots not found under ${root}`,
    );
  }
  const violations: AdmissionViolation[] = [];
  for (const file of enumerateProductionFiles(root)) {
    const rel = toPortablePath(relative(root, file));
    if (rel === ADAPTER_REGISTRY_PATH) continue;
    if (rel.startsWith("packages/policy/")) continue;

    const sourceText = readFileSync(file, "utf8");
    const lines = sourceText.split(/\r?\n/);
    const flaggedLines = new Set<number>();
    lines.forEach((lineText, idx) => {
      if (ADMISSION_LIST_PATTERN.test(lineText)) {
        flaggedLines.add(idx + 1);
      }
    });
    for (const lineNumber of findRegisteredSurfaceCollectionsInSource(sourceText, rel)) {
      flaggedLines.add(lineNumber);
    }

    for (const lineNumber of [...flaggedLines].sort((a, b) => a - b)) {
      violations.push({ file: rel, line: lineNumber, text: lines[lineNumber - 1]!.trim() });
    }
  }
  return violations.sort((a, b) =>
    a.file === b.file ? a.line - b.line : a.file < b.file ? -1 : 1,
  );
}

describe("Phase 3A admission authority", () => {
  test("adapter-registry.ts is the only production admission source", () => {
    const violations = scanAdmissionSources(REPO_ROOT);
    expect(violations.map(reportAdmission)).toEqual([]);
  });

  test("admission-source scanner detects a planted surface-admission list and scopes its exclusions exactly", () => {
    const root = makeTempRoot();
    try {
      writeTempFile(
        root,
        "packages/protocol/src/task-envelope.ts",
        'export const KNOWN_SURFACES = ["claude-code"];\n',
      );
      writeTempFile(
        root,
        "packages/adapter-x/src/a.ts",
        "const allowedSurfaces: string[] = [];\n",
      );
      writeTempFile(root, "apps/foo/src/b.ts", "const SUPPORTED_SURFACES = [];\n");
      writeTempFile(
        root,
        "packages/policy/src/engine.ts",
        'const KNOWN_SURFACES = new Set(["claude-code", "antigravity"]);\n',
      );
      writeTempFile(
        root,
        ADAPTER_REGISTRY_PATH,
        "// KNOWN_SURFACES referenced here only as prose; this is the authority file\nexport const ADAPTER_REGISTRY = new Map();\n",
      );
      writeTempFile(
        root,
        "packages/adapter-y/src/shadow-admission.ts",
        'const ratifiedAdapters = new Set(["claude-code", "antigravity"]);\n',
      );

      const violations = scanAdmissionSources(root);
      const flaggedFiles = new Set(violations.map((v) => v.file));

      expect(flaggedFiles.has("packages/protocol/src/task-envelope.ts")).toBe(true);
      expect(flaggedFiles.has("packages/adapter-x/src/a.ts")).toBe(true);
      expect(flaggedFiles.has("apps/foo/src/b.ts")).toBe(true);
      expect(flaggedFiles.has("packages/policy/src/engine.ts")).toBe(false);
      expect(flaggedFiles.has(ADAPTER_REGISTRY_PATH)).toBe(false);
      // Differently named collection carrying registered SurfaceId values must
      // still be caught — detection is by value, not only by legacy identifier.
      expect(flaggedFiles.has("packages/adapter-y/src/shadow-admission.ts")).toBe(true);
      expect(violations).toHaveLength(4);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }

    const emptyRoot = makeTempRoot();
    try {
      expect(() => scanAdmissionSources(emptyRoot)).toThrow();
    } finally {
      rmSync(emptyRoot, { recursive: true, force: true });
    }
  });

  test("path exclusions normalize Windows-style backslash separators identically to POSIX", () => {
    const windowsTestFile = String.raw`C:\repo\packages\adapter-x\test\fixture.ts`;
    expect(toPortablePath(windowsTestFile).includes("/test/")).toBe(true);

    const windowsNodeModulesFile = String.raw`C:\repo\packages\adapter-x\node_modules\dep\index.ts`;
    expect(toPortablePath(windowsNodeModulesFile).includes("/node_modules/")).toBe(true);

    const windowsRegistryRelPath = String.raw`packages\protocol\src\adapter-registry.ts`;
    expect(toPortablePath(windowsRegistryRelPath)).toBe(ADAPTER_REGISTRY_PATH);

    const windowsPolicyRelPath = String.raw`packages\policy\src\engine.ts`;
    expect(toPortablePath(windowsPolicyRelPath).startsWith("packages/policy/")).toBe(true);

    // POSIX paths are unaffected by normalization (idempotent — no backslashes to convert).
    const posixTestFile = "packages/adapter-x/test/fixture.ts";
    expect(toPortablePath(posixTestFile)).toBe(posixTestFile);
    const posixNodeModulesFile = "packages/adapter-x/node_modules/dep/index.ts";
    expect(toPortablePath(posixNodeModulesFile)).toBe(posixNodeModulesFile);
    expect(toPortablePath(ADAPTER_REGISTRY_PATH)).toBe(ADAPTER_REGISTRY_PATH);
    expect(toPortablePath("packages/policy/src/engine.ts").startsWith("packages/policy/")).toBe(
      true,
    );
  });

  test("admission-source scanner detects registered SurfaceIds written into mutable collections", () => {
    const root = makeTempRoot();
    try {
      // The authority file itself is always excluded; it only has to exist so
      // the temp root is a well-formed scan target.
      writeTempFile(root, ADAPTER_REGISTRY_PATH, "export const ADAPTER_REGISTRY = new Map();\n");
      // Bypass 1: a Set created empty, then populated by .add().
      writeTempFile(
        root,
        "packages/adapter-y/src/set-write.ts",
        'const ratifiedAdapters = new Set<string>();\nratifiedAdapters.add("claude-code");\n',
      );
      // Bypass 2: an array created empty, then populated by .push().
      writeTempFile(
        root,
        "apps/foo/src/array-write.ts",
        'const ratifiedAdapters: string[] = [];\nratifiedAdapters.push("antigravity");\n',
      );
      // Unregistered values are not admission authorities and must stay unflagged.
      writeTempFile(
        root,
        "packages/adapter-y/src/unregistered-write.ts",
        'const other = new Set<string>();\nother.add("grok");\nconst more: string[] = [];\nmore.push("codex");\n',
      );
      // A bare registered ID outside any collection is still never flagged.
      writeTempFile(
        root,
        "packages/adapter-y/src/bare-usage.ts",
        'export function isClaude(s: string): boolean {\n  return s === "claude-code";\n}\n',
      );

      const violations = scanAdmissionSources(root);
      const flagged = new Set(violations.map((v) => `${v.file}:${v.line}`));

      expect(flagged.has("packages/adapter-y/src/set-write.ts:2")).toBe(true);
      expect(flagged.has("apps/foo/src/array-write.ts:2")).toBe(true);
      expect(violations.some((v) => v.file === "packages/adapter-y/src/unregistered-write.ts")).toBe(
        false,
      );
      expect(violations.some((v) => v.file === "packages/adapter-y/src/bare-usage.ts")).toBe(false);
      expect(violations).toHaveLength(2);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  test("admission-source scanner treats Map keys and .set() argument 0 as admission authorities", () => {
    const root = makeTempRoot();
    try {
      writeTempFile(root, ADAPTER_REGISTRY_PATH, "export const ADAPTER_REGISTRY = new Map();\n");
      // Ensure apps/ exists so the fail-closed packages/+apps/ gate accepts the temp root.
      writeTempFile(root, "apps/foo/src/.keep.ts", "export {};\n");

      // P0 — preservation control: registered SurfaceId as Map key must remain detected.
      writeTempFile(
        root,
        "packages/adapter-y/src/map-key.ts",
        'const ratifiedByKey = new Map([["claude-code", true]]);\n',
      );
      // R1 — false-negative RED: registered SurfaceId as .set() first argument must be detected.
      writeTempFile(
        root,
        "packages/adapter-y/src/map-set-key.ts",
        'const collection = new Map<string, boolean>();\ncollection.set("antigravity", true);\n',
      );
      // Nested independent admission collection inside a Map value must remain detectable.
      writeTempFile(
        root,
        "packages/adapter-y/src/map-nested-set.ts",
        'const nested = new Map([["alias", new Set(["claude-code"])]]);\n',
      );
      // Existing Array / Set initializer and mutable-write forms remain admission authorities.
      writeTempFile(
        root,
        "packages/adapter-y/src/preserved-forms.ts",
        [
          'const asArray = ["claude-code"];',
          'const asSet = new Set(["antigravity"]);',
          "const emptySet = new Set<string>();",
          'emptySet.add("claude-code");',
          "const emptyArr: string[] = [];",
          'emptyArr.push("antigravity");',
          "const front: string[] = [];",
          'front.unshift("claude-code");',
          "",
        ].join("\n"),
      );

      // R2 — false-positive RED: registered SurfaceId only as a Map value must NOT be detected.
      writeTempFile(
        root,
        "packages/adapter-y/src/map-value-only.ts",
        'const aliasMap = new Map([["alias", "claude-code"]]);\n',
      );
      // Registered SurfaceId only as .set() value argument must NOT be detected.
      writeTempFile(
        root,
        "packages/adapter-y/src/map-set-value-only.ts",
        'const collection = new Map<string, string>();\ncollection.set("alias", "antigravity");\n',
      );
      // Unknown IDs in Map keys are not admission authorities.
      writeTempFile(
        root,
        "packages/adapter-y/src/map-unknown-key.ts",
        'const other = new Map([["grok", true]]);\nother.set("codex", false);\n',
      );
      // Registered IDs in unrelated method/function arguments stay unflagged.
      writeTempFile(
        root,
        "packages/adapter-y/src/unrelated-args.ts",
        [
          'declare function configure(id: string): void;',
          'configure("claude-code");',
          'console.log("antigravity");',
          "",
        ].join("\n"),
      );
      // Bare comparisons remain unflagged.
      writeTempFile(
        root,
        "packages/adapter-y/src/bare-comparison.ts",
        'export function isClaude(s: string): boolean {\n  return s === "claude-code";\n}\n',
      );

      const violations = scanAdmissionSources(root);
      const flagged = new Set(violations.map((v) => `${v.file}:${v.line}`));
      const flaggedFiles = new Set(violations.map((v) => v.file));

      // P0 preservation plus the two RED controls in one object so a baseline run
      // surfaces R1 (set-key miss) and R2 (map-value false positive) together.
      expect({
        // P0 — Map-key positive with exact 1-based file:line reporting.
        mapKeyDetected: flagged.has("packages/adapter-y/src/map-key.ts:1"),
        // R1 — .set() key positive with exact 1-based file:line reporting.
        setKeyDetected: flagged.has("packages/adapter-y/src/map-set-key.ts:2"),
        // R2 — Map-value-only must not be flagged.
        mapValueOnlyDetected: flaggedFiles.has("packages/adapter-y/src/map-value-only.ts"),
      }).toEqual({
        mapKeyDetected: true,
        setKeyDetected: true,
        mapValueOnlyDetected: false,
      });

      expect(flaggedFiles.has("packages/adapter-y/src/map-nested-set.ts")).toBe(true);
      expect(flaggedFiles.has("packages/adapter-y/src/preserved-forms.ts")).toBe(true);
      expect(flaggedFiles.has("packages/adapter-y/src/map-set-value-only.ts")).toBe(false);
      expect(flaggedFiles.has("packages/adapter-y/src/map-unknown-key.ts")).toBe(false);
      expect(flaggedFiles.has("packages/adapter-y/src/unrelated-args.ts")).toBe(false);
      expect(flaggedFiles.has("packages/adapter-y/src/bare-comparison.ts")).toBe(false);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  test("admission-source scanner unwraps transparent AST wrappers around Map structure", () => {
    const root = makeTempRoot();
    try {
      writeTempFile(root, ADAPTER_REGISTRY_PATH, "export const ADAPTER_REGISTRY = new Map();\n");
      writeTempFile(root, "apps/foo/src/.keep.ts", "export {};\n");

      // R3-1 — false positive: Map iterable wrapped (W1–W6).
      writeTempFile(
        root,
        "packages/adapter-y/src/wrapped-iterable.ts",
        [
          'const a = new Map(([["alias", "claude-code"]]));',
          'const b = new Map([["alias", "claude-code"]] as const);',
          'const c = new Map([["alias", "claude-code"]] as Array<[string, string]>);',
          'const d = new Map(<Array<[string, string]>>[["alias", "claude-code"]]);',
          'const e = new Map([["alias", "claude-code"]] satisfies Array<[string, string]>);',
          'const f = new Map(([["alias", "claude-code"]])!);',
          "",
        ].join("\n"),
      );
      // R3-2 — false positive: one wrapped tuple inside a bare iterable (W7).
      writeTempFile(
        root,
        "packages/adapter-y/src/wrapped-tuple.ts",
        'const a = new Map([["alias", "claude-code"] as const]);\n',
      );
      // R3-3 — false negative: wrapped Map keys (W8/W9).
      writeTempFile(
        root,
        "packages/adapter-y/src/wrapped-map-key.ts",
        [
          'const a = new Map([[("claude-code"), true]]);',
          'const b = new Map([["claude-code" as const, true]]);',
          "",
        ].join("\n"),
      );
      // R3-4 — false negative: wrapped .set() keys (W10).
      writeTempFile(
        root,
        "packages/adapter-y/src/wrapped-set-key.ts",
        [
          "const m = new Map<string, boolean>();",
          'm.set(("claude-code"), true);',
          'm.set("antigravity" as const, true);',
          "",
        ].join("\n"),
      );
      // W11 — preservation: wrapped Set iterable must remain detected.
      writeTempFile(
        root,
        "packages/adapter-y/src/wrapped-set-iterable.ts",
        'const s = new Set((["claude-code"]));\n',
      );
      // Nested independent Set inside a wrapped Map value must remain detected.
      writeTempFile(
        root,
        "packages/adapter-y/src/wrapped-nested-set.ts",
        'const nested = new Map([["alias", new Set(["claude-code"])] as const]);\n',
      );

      const violations = scanAdmissionSources(root);
      const flagged = new Set(violations.map((v) => `${v.file}:${v.line}`));
      const flaggedFiles = new Set(violations.map((v) => v.file));

      expect({
        // R3-1 — wrapped Map iterables must not flag Map values.
        wrappedIterableDetected: flaggedFiles.has("packages/adapter-y/src/wrapped-iterable.ts"),
        // R3-2 — wrapped entry tuple must not flag Map values.
        wrappedTupleDetected: flaggedFiles.has("packages/adapter-y/src/wrapped-tuple.ts"),
        // R3-3 — wrapped Map keys must be detected at exact 1-based lines.
        wrappedMapKeyLine1: flagged.has("packages/adapter-y/src/wrapped-map-key.ts:1"),
        wrappedMapKeyLine2: flagged.has("packages/adapter-y/src/wrapped-map-key.ts:2"),
        // R3-4 — wrapped .set() keys must be detected at exact 1-based lines.
        wrappedSetKeyLine2: flagged.has("packages/adapter-y/src/wrapped-set-key.ts:2"),
        wrappedSetKeyLine3: flagged.has("packages/adapter-y/src/wrapped-set-key.ts:3"),
      }).toEqual({
        wrappedIterableDetected: false,
        wrappedTupleDetected: false,
        wrappedMapKeyLine1: true,
        wrappedMapKeyLine2: true,
        wrappedSetKeyLine2: true,
        wrappedSetKeyLine3: true,
      });

      expect(flaggedFiles.has("packages/adapter-y/src/wrapped-set-iterable.ts")).toBe(true);
      expect(flaggedFiles.has("packages/adapter-y/src/wrapped-nested-set.ts")).toBe(true);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});

/**
 * Phase 3A pty-host isolation (Task 41).
 *
 * Invariant: the private PTY host imports no application-authority module —
 * broker, ledger, policy, storage, artifact-store, or any adapter. It is
 * private infrastructure with a closed operation set, not an application.
 */

const PTY_HOST_FORBIDDEN_IMPORT = /@madventures\/(broker|ledger|policy|storage|artifact-store|adapter-\w+)|packages\/(broker|ledger|policy|storage)/;

describe("Phase 3A pty-host isolation", () => {
  test("the pty-host package imports no application authority module", () => {
    const dir = join(REPO_ROOT, "packages", "pty-host", "src");
    const violations: string[] = [];
    for (const file of listSourceFiles(dir)) {
      const rel = relative(REPO_ROOT, file);
      const source = readFileSync(file, "utf8");
      if (PTY_HOST_FORBIDDEN_IMPORT.test(source)) {
        violations.push(rel);
      }
    }
    expect(violations).toEqual([]);
  });

  test("the isolation scan detects a planted forbidden import", () => {
    const root = makeTempRoot();
    try {
      writeTempFile(
        root,
        "packages/pty-host/src/planted.ts",
        'import { thing } from "@madventures/broker";\nexport { thing };\n',
      );
      const dir = join(root, "packages", "pty-host", "src");
      const violations: string[] = [];
      for (const file of listSourceFiles(dir)) {
        const source = readFileSync(file, "utf8");
        if (PTY_HOST_FORBIDDEN_IMPORT.test(source)) violations.push(file);
      }
      expect(violations).toHaveLength(1);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});

/**
 * Phase 3A surface cardinality.
 *
 * Spec section 1.2: exactly one production module encodes how many active
 * surfaces a Version 1 live pair may contain. Two patterns are forbidden
 * everywhere else — paired two-tuple identifier names, which smuggle the
 * cardinality into an identity system, and a literal comparison of
 * `executions.length` against two.
 *
 * Two exemptions exist, both documented in the spec and neither widened here:
 * `packages/protocol/src/pair-constraints.ts`, the authority module itself,
 * and `apps/madbridge/src/tui/**`. `PairConstraintsV1.allowed_surface_pairs`
 * is exempt from the paired-name pattern by that exact field name only
 * (spec section 1.2), so the pattern below never matches it.
 */

const PAIRED_SURFACE_NAME_PATTERN = /surfaceA|surfaceB|adapterA|adapterB/;
// Every literal comparison of executions.length against exactly two, in either
// operand order: `2 < executions.length` encodes the same forbidden rule as
// `executions.length > 2`, so a guard that reads only one order can be evaded
// by writing the comparison backwards. The invariant is operator-independent,
// so loose equality counts too: `==` and `!=` would be unusual in this
// TypeScript repository, but "unusual" is not "impossible" and this guard is
// fail-closed.
//
// Alternation order is load-bearing. Each longer operator must precede the
// shorter one it starts with — === before ==, !== before !=, <= before <,
// >= before > — or the longer form is consumed as its prefix and the match
// fails. The digit guards keep the literal 2 from matching inside 20, 12,
// or 2.5.
const CARDINALITY_COMPARISON = String.raw`(?:===|!==|==|!=|<=|>=|<|>)`;
const CARDINALITY_LITERAL = String.raw`(?<![\d.])2(?![\d.])`;
const LITERAL_CARDINALITY_PATTERN = new RegExp(
  `executions\\.length\\s*${CARDINALITY_COMPARISON}\\s*${CARDINALITY_LITERAL}` +
    `|${CARDINALITY_LITERAL}\\s*${CARDINALITY_COMPARISON}\\s*executions\\.length`,
);
const CARDINALITY_AUTHORITY_PATH = "packages/protocol/src/pair-constraints.ts";
const CARDINALITY_EXEMPT_PREFIX = "apps/madbridge/src/tui/";

function findCardinalityViolations(root: string): string[] {
  const violations: string[] = [];
  for (const file of enumerateProductionFiles(root)) {
    const rel = toPortablePath(relative(root, file));
    if (rel === CARDINALITY_AUTHORITY_PATH) continue;
    if (rel.startsWith(CARDINALITY_EXEMPT_PREFIX)) continue;
    const source = readFileSync(file, "utf8");
    if (PAIRED_SURFACE_NAME_PATTERN.test(source)) {
      violations.push(`${rel} [paired-surface-name]`);
    }
    if (LITERAL_CARDINALITY_PATTERN.test(source)) {
      violations.push(`${rel} [literal-cardinality]`);
    }
  }
  return violations.sort();
}

describe("Phase 3A surface cardinality", () => {
  test("no production module encodes surface cardinality outside MAX_ACTIVE_SURFACES_V1", () => {
    expect(findCardinalityViolations(REPO_ROOT)).toEqual([]);
  });

  test("the cardinality pattern detects every literal comparison against two", () => {
    // Arrange — every comparison form a production module could use to encode
    // the cardinality, in both operand orders, plus near-misses that must not
    // be flagged. Loose equality is included: the invariant is about the
    // comparison, not about which operator spelling a module chose.
    const operators = ["===", "!==", "==", "!=", "<", "<=", ">", ">="];
    const detected = [
      ...operators.map((operator) => `executions.length ${operator} 2`),
      ...operators.map((operator) => `2 ${operator} executions.length`),
      "if (executions.length===2) {",
      "return executions.length >= 2;",
      "if (executions.length==2) {",
      "if (executions.length!=2) {",
    ];
    const ignored = [
      "executions.length === 20",
      "executions.length !== 20",
      "executions.length >= 20",
      "executions.length == 20",
      "executions.length != 20",
      "20 == executions.length",
      "20 > executions.length",
      "12 < executions.length",
      "executions.length < 2.5",
      "executions.length === 0",
      "executions.length !== MAX_ACTIVE_SURFACES_V1",
    ];

    // Act / Assert — a guard that misses an operator or an operand order can be
    // evaded, and one that matches 20 fails builds it has no business failing.
    for (const source of detected) {
      expect(LITERAL_CARDINALITY_PATTERN.test(source)).toBe(true);
    }
    for (const source of ignored) {
      expect(LITERAL_CARDINALITY_PATTERN.test(source)).toBe(false);
    }
  });
});

// ── Phase 3A lifecycle transition authority (spec sections 9.6 and 9.14.2) ──

/**
 * Spec section 9.6: one function decides every lifecycle transition. Task 15
 * deletes the broker's duplicate reducer and its resume path, so production
 * source carries exactly one canonical `reduceLedgerEvent` and no
 * `resumeSession`. The broker cannot disagree with replay because it has no
 * second lifecycle transition table.
 */
const REDUCER_EXPORT = "export function reduceLedgerEvent";
const RESUME_EXPORT = "export function resumeSession";

/** Concatenate every production .ts/.tsx source under packages/ and apps/. */
function readProductionSource(root: string): string {
  return enumerateProductionFiles(root)
    .map((file) => readFileSync(file, "utf8"))
    .join("\n");
}

function countOccurrences(haystack: string, needle: string): number {
  return haystack.split(needle).length - 1;
}

describe("Phase 3A lifecycle transition authority", () => {
  test("only one production module defines a lifecycle transition table", () => {
    const source = readProductionSource(REPO_ROOT);
    expect(countOccurrences(source, REDUCER_EXPORT)).toBe(1);
    expect(countOccurrences(source, RESUME_EXPORT)).toBe(0);
  });

  test("the authority scan counts a planted second reducer and a planted resumeSession", () => {
    const root = makeTempRoot();
    writeTempFile(root, "packages/ledger/src/rebuild.ts", `${REDUCER_EXPORT}() {}\n`);
    writeTempFile(
      root,
      "packages/broker/src/reconciliation.ts",
      `${REDUCER_EXPORT}() {}\n${RESUME_EXPORT}() {}\n`,
    );
    // Test files are not production source and must not count.
    writeTempFile(root, "packages/broker/test/planted.test.ts", `${RESUME_EXPORT}() {}\n`);

    const source = readProductionSource(root);
    expect(countOccurrences(source, REDUCER_EXPORT)).toBe(2);
    expect(countOccurrences(source, RESUME_EXPORT)).toBe(1);
  });
});
