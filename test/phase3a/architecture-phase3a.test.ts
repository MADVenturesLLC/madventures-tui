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

// ── Task 33: quarantine socket, MCP, and PtyManager from production reach ──
// (plan Task 33, §9.10/§4.4; act ARCHITECT-TASK33-PHASE2-ACT item 8(e)/(f))
//
// Static analysis, consistent with this file's existing convention: scans
// real export/import specifiers via the TypeScript AST rather than a
// runtime `import * as ns` namespace object, because named TYPE exports
// (e.g. McpToolDef, PtyManagerSnapshot) are erased at runtime and would
// never appear as keys of a runtime namespace object — a dynamic-import
// check would silently under-test the invariant for every type-only name.
// The AST scan below catches both value and type-level named exports.

const QUARANTINED_INDEX_EXPORTS = [
  "BrokerSocket",
  "MADV_RUNTIME_DIR",
  "MADV_SOCKET_PATH",
  "MCP_TOOLS",
  "McpServer",
  "McpToolDef",
  "PtyManager",
  "createPtyManager",
] as const;

/**
 * Resolve a relative `import`/`export … from` specifier to an existing file
 * on disk (`.ts`, `.tsx`, or an `index.ts`/`index.tsx` inside it), or null
 * for a non-relative specifier or one that resolves to nothing on disk.
 */
function resolveRelativeSpecifier(fromFile: string, specifier: string): string | null {
  if (!specifier.startsWith(".")) return null;
  const base = join(dirname(fromFile), specifier);
  const candidates =
    base.endsWith(".ts") || base.endsWith(".tsx")
      ? [base]
      : [`${base}.ts`, `${base}.tsx`, join(base, "index.ts"), join(base, "index.tsx")];
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

/** True if a declaration node (function/class/interface/etc.) carries the `export` modifier. */
function hasExportModifier(node: ts.Node): boolean {
  return ts.canHaveModifiers(node) && (ts.getModifiers(node)?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) ?? false);
}

/**
 * Named export identifiers (value or type) visible from a single module
 * file: both directly-declared exports (`export const X`, `export class X`,
 * `export function X`, `export interface X`, `export type X`, `export enum
 * X` — the form every quarantined source file in this repo actually uses)
 * and `export { X }` re-export clauses.
 *
 * A bare `export * from "…"` re-export is followed to its resolved target
 * and the target's own exports (recursively, through further wildcards)
 * are folded in — a named-exports-only scan reports an empty set for
 * `export * from "./socket"` while every one of socket.ts's own exports
 * still flows through untouched. `export * as ns from …` is not followed —
 * it introduces one namespace identifier (`ns`), not the target's
 * individual names, so it cannot silently reintroduce a quarantined name
 * into this set.
 */
function collectNamedExportIdentifiers(filePath: string, visited: Set<string> = new Set()): Set<string> {
  if (visited.has(filePath)) return new Set();
  visited.add(filePath);
  const source = readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    /* setParentNodes */ true,
    scriptKindFor(filePath),
  );
  const names = new Set<string>();
  const visit = (node: ts.Node): void => {
    if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      if (node.exportClause && ts.isNamedExports(node.exportClause)) {
        for (const element of node.exportClause.elements) {
          names.add(element.name.text);
        }
      } else if (!node.exportClause) {
        const target = resolveRelativeSpecifier(filePath, node.moduleSpecifier.text);
        if (target) {
          for (const name of collectNamedExportIdentifiers(target, visited)) {
            names.add(name);
          }
        }
      }
    } else if (ts.isVariableStatement(node) && hasExportModifier(node)) {
      for (const decl of node.declarationList.declarations) {
        if (ts.isIdentifier(decl.name)) names.add(decl.name.text);
      }
    } else if (
      (ts.isFunctionDeclaration(node) ||
        ts.isClassDeclaration(node) ||
        ts.isInterfaceDeclaration(node) ||
        ts.isTypeAliasDeclaration(node) ||
        ts.isEnumDeclaration(node)) &&
      hasExportModifier(node) &&
      node.name
    ) {
      names.add(node.name.text);
    }
    node.forEachChild(visit);
  };
  visit(sourceFile);
  return names;
}

/**
 * Files (production or test/harness) under packages/ and apps/ whose
 * import/export module specifier's final path segment is exactly
 * `moduleBaseName` (e.g. "socket" matches "./socket" and "../src/socket"
 * but not "socket-io" or "polysocket"). Repo-relative, portable-slash,
 * sorted paths.
 */
function findModuleSpecifierImporters(root: string, moduleBaseName: string): string[] {
  const importers: string[] = [];
  const files = [
    ...listSourceFiles(join(root, "packages")),
    ...listSourceFiles(join(root, "apps")),
    ...listSourceFiles(join(root, "test")),
  ];
  for (const file of files) {
    const portable = toPortablePath(file);
    if (portable.includes("/node_modules/")) continue;
    const source = readFileSync(file, "utf8");
    const sourceFile = ts.createSourceFile(
      file,
      source,
      ts.ScriptTarget.Latest,
      /* setParentNodes */ true,
      scriptKindFor(file),
    );
    let matched = false;
    const visit = (node: ts.Node): void => {
      const specifier =
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier
          ? node.moduleSpecifier
          : null;
      if (specifier && ts.isStringLiteral(specifier)) {
        const lastSegment = specifier.text.split("/").pop();
        if (lastSegment === moduleBaseName) matched = true;
      }
      node.forEachChild(visit);
    };
    visit(sourceFile);
    if (matched) importers.push(toPortablePath(relative(root, file)));
  }
  return importers.sort();
}

/**
 * Task 33 quarantine table (annex §3.4 item 15(d)): each module severed from
 * production reach, keyed by the module basename `findModuleSpecifierImporters`
 * matches, and the importers it is still permitted to have. `socket` is owned
 * by the test "no production or harness file imports socket.ts" and is not
 * repeated here. `mcp-config` names two files, one per adapter package
 * (`packages/adapter-claude-code/src/mcp-config.ts` and
 * `packages/adapter-antigravity/src/mcp-config.ts`); the basename scan covers
 * both under the single row, and its empty permitted list means neither may be
 * imported by any production or harness file.
 */
const QUARANTINED_MODULE_IMPORTERS: ReadonlyArray<{
  readonly module: string;
  readonly permitted: readonly string[];
}> = [
  { module: "mcp-server", permitted: ["packages/broker/test/mcp-contract.test.ts"] },
  { module: "pty-manager", permitted: [] },
  { module: "mcp-config", permitted: [] },
];

interface QuarantineViolation {
  module: string;
  importer: string;
}

/** Importers of every quarantined module under a root, keyed by module basename. */
function quarantinedModuleImporters(root: string): Record<string, string[]> {
  const importers: Record<string, string[]> = {};
  for (const { module } of QUARANTINED_MODULE_IMPORTERS) {
    importers[module] = findModuleSpecifierImporters(root, module);
  }
  return importers;
}

/**
 * Every importer of a quarantined module that is not on that module's
 * permitted list. Empty on a compliant tree. A missing sanctioned edge is not
 * a violation here; the positive guard below asserts the full importer map,
 * so removing the sanctioned edge fails that test instead.
 */
function findQuarantineViolations(root: string): QuarantineViolation[] {
  const importers = quarantinedModuleImporters(root);
  const violations: QuarantineViolation[] = [];
  for (const { module, permitted } of QUARANTINED_MODULE_IMPORTERS) {
    for (const importer of importers[module] ?? []) {
      if (!permitted.includes(importer)) violations.push({ module, importer });
    }
  }
  return violations;
}

describe("Task 33 — socket, MCP, and PtyManager quarantine from production reach", () => {
  test("the broker package index exports no socket, MCP, or PtyManager symbol", () => {
    const exported = collectNamedExportIdentifiers(join(REPO_ROOT, "packages/broker/src/index.ts"));
    for (const name of QUARANTINED_INDEX_EXPORTS) {
      expect(exported.has(name)).toBe(false);
    }
  });

  test("no production or harness file imports socket.ts", () => {
    const importers = findModuleSpecifierImporters(REPO_ROOT, "socket");
    expect(importers).toEqual(["packages/broker/test/socket.test.ts"]);
  });

  test("no production file constructs a unix:// URL", () => {
    for (const file of enumerateProductionFiles(REPO_ROOT)) {
      const source = readFileSync(file, "utf8");
      expect(source).not.toContain("unix://");
    }
  });

  test("quarantined modules admit only their sanctioned importers: mcp-server one edge, pty-manager none, both mcp-config none", () => {
    expect(quarantinedModuleImporters(REPO_ROOT)).toEqual({
      "mcp-server": ["packages/broker/test/mcp-contract.test.ts"],
      "pty-manager": [],
      "mcp-config": [],
    });
    expect(findQuarantineViolations(REPO_ROOT)).toEqual([]);
  });

  test("the quarantine guard detects a planted pty-manager import", () => {
    const root = makeTempRoot();
    try {
      writeTempFile(
        root,
        "packages/broker/src/planted.ts",
        'import { PtyManager } from "./pty-manager";\nexport { PtyManager };\n',
      );
      expect(findQuarantineViolations(root)).toEqual([
        { module: "pty-manager", importer: "packages/broker/src/planted.ts" },
      ]);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  test("the quarantine guard detects a planted import of the claude-code mcp-config", () => {
    const root = makeTempRoot();
    try {
      writeTempFile(
        root,
        "packages/adapter-claude-code/src/planted.ts",
        'import { prepareConfigPreview } from "./mcp-config";\nexport { prepareConfigPreview };\n',
      );
      expect(findQuarantineViolations(root)).toEqual([
        { module: "mcp-config", importer: "packages/adapter-claude-code/src/planted.ts" },
      ]);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  test("the quarantine guard detects a planted import of the antigravity mcp-config", () => {
    const root = makeTempRoot();
    try {
      writeTempFile(
        root,
        "packages/adapter-antigravity/src/planted.ts",
        'import { prepareConfigPreview } from "./mcp-config";\nexport { prepareConfigPreview };\n',
      );
      expect(findQuarantineViolations(root)).toEqual([
        { module: "mcp-config", importer: "packages/adapter-antigravity/src/planted.ts" },
      ]);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  test("the export-identifier scan follows a bare wildcard re-export to its target's exports", () => {
    const root = makeTempRoot();
    try {
      writeTempFile(
        root,
        "packages/broker/src/quarantined-leaf.ts",
        "export const BrokerSocket = 1;\nexport const OTHER = 2;\n",
      );
      writeTempFile(root, "packages/broker/src/index.ts", 'export * from "./quarantined-leaf";\n');
      const exported = collectNamedExportIdentifiers(join(root, "packages/broker/src/index.ts"));
      expect(exported.has("BrokerSocket")).toBe(true);
      expect(exported.has("OTHER")).toBe(true);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  test("the export-identifier scan does not follow a namespace wildcard re-export", () => {
    const root = makeTempRoot();
    try {
      writeTempFile(root, "packages/broker/src/quarantined-leaf.ts", "export const BrokerSocket = 1;\n");
      writeTempFile(
        root,
        "packages/broker/src/index.ts",
        'export * as quarantined from "./quarantined-leaf";\n',
      );
      const exported = collectNamedExportIdentifiers(join(root, "packages/broker/src/index.ts"));
      expect(exported.has("BrokerSocket")).toBe(false);
      expect(exported.has("quarantined")).toBe(false);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  test("the quarantine guard detects a second mcp-server importer beside the sanctioned edge", () => {
    const root = makeTempRoot();
    try {
      // The sanctioned edge is reproduced so the planted file is a second
      // importer beside it, not a replacement for it.
      writeTempFile(
        root,
        "packages/broker/test/mcp-contract.test.ts",
        'import { McpServer } from "../src/mcp-server";\nexport { McpServer };\n',
      );
      writeTempFile(
        root,
        "packages/broker/src/planted.ts",
        'import { McpServer } from "./mcp-server";\nexport { McpServer };\n',
      );
      expect(quarantinedModuleImporters(root)["mcp-server"]).toEqual([
        "packages/broker/src/planted.ts",
        "packages/broker/test/mcp-contract.test.ts",
      ]);
      expect(findQuarantineViolations(root)).toEqual([
        { module: "mcp-server", importer: "packages/broker/src/planted.ts" },
      ]);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════
// Task 34 — no broker.sock path is reachable; dead native dependency removed
// (plan §M14 Task 34; PLAN-OPEN-4 node-pty removal; PLAN-OPEN-6 root scripts)
// ═══════════════════════════════════════════════════════════════════════

import { spawn } from "node:child_process";
import * as net from "node:net";
import { lstatSync } from "node:fs";
import { sweep } from "./negative-control";

const LEGACY_SOCKET = "/tmp/madv-broker-runtime/broker.sock";
const CHILD_DEADLINE_MS = 5_000;
const CHILD_GRACE_MS = 500;
const CHILD_CAP_BYTES = 65_536;
const START_JSON_BODY =
  '{"ok":false,"error":"live_runtime_not_certified","hint":"Phase 3A runtime foundation is present; live startup requires Phase 3B certification."}';

function socketAbsent(path: string): boolean {
  return !existsSync(path);
}

/** One broker.sock presence reading at a named Step 1 assertion point. */
interface SocketObservation {
  checkpoint: "before-launch" | "readiness" | "end";
  path: string;
  present: boolean;
}

function observeSockets(
  checkpoint: SocketObservation["checkpoint"],
  paths: readonly string[],
): SocketObservation[] {
  return paths.map((path) => ({ checkpoint, path, present: !socketAbsent(path) }));
}

/** Throws, naming each checkpoint and path, if any reading found a socket. */
function assertSocketsAbsent(observations: readonly SocketObservation[]): void {
  const present = observations
    .filter((o) => o.present)
    .map((o) => `broker.sock present at ${o.checkpoint}: ${o.path}`);
  if (present.length > 0) throw new Error(present.join("\n"));
}

interface ChildOutcome {
  code: number | null;
  signal: string | null;
  stdout: string;
  stderr: string;
  timedOut: boolean;
  overflowed: boolean;
  /** A spawn failure or other child-process error, else null. */
  error: string | null;
  /** Monotonic ms from spawn when readiness was first observed, else null. */
  readyAtMs: number | null;
  /** The child had exited, by code or signal, before readiness was observed. */
  exitedBeforeReadiness: boolean;
  /** Readings taken inside the runner: at readiness (before the test's SIGTERM) and at the end. */
  sockets: SocketObservation[];
}

function spawnPiped(cmd: string, args: readonly string[], env: Record<string, string>) {
  return spawn(cmd, args, { cwd: REPO_ROOT, env, stdio: ["ignore", "pipe", "pipe"] });
}

/**
 * Bounded isolated child runner (Task 34 Step 1 discipline):
 * - deadline: 5,000 ms on a monotonic clock from spawn until the child exits
 *   or readiness is observed;
 * - caps: 65,536 bytes each for stdout and stderr, counted by Buffer length
 *   from spawn until the stream closes, so output written after readiness or
 *   after SIGTERM still counts; bytes are decoded once, for the returned
 *   strings, so no character is split across chunks;
 * - stdin ignored;
 * - on readiness, timeout or overflow: one SIGTERM, then SIGKILL after 500 ms
 *   if the child is still alive;
 * - both socket paths read at readiness, before that SIGTERM, and at the end.
 * It resolves only after the child has exited and both streams have closed,
 * or after a spawn failure. It never rejects and never leaves a live child.
 */
function runBoundedChild(
  cmd: string,
  args: readonly string[],
  env: Record<string, string>,
  readiness?: (stdout: Buffer) => boolean,
  sockets: readonly string[] = [],
): Promise<ChildOutcome> {
  return new Promise((resolve) => {
    const out: Buffer[] = [];
    const err: Buffer[] = [];
    let outBytes = 0;
    let errBytes = 0;
    let overflowed = false;
    let timedOut = false;
    let error: string | null = null;
    let readyAtMs: number | null = null;
    let exitedBeforeReadiness = false;
    let exit: { code: number | null; signal: string | null } | null = null;
    let outClosed = false;
    let errClosed = false;
    let terminating = false;
    let settled = false;
    let deadlineTimer: ReturnType<typeof setTimeout> | undefined;
    let killTimer: ReturnType<typeof setTimeout> | undefined;
    const observations: SocketObservation[] = [];

    const finish = (spawnFailed: boolean) => {
      if (settled || (!spawnFailed && (exit === null || !outClosed || !errClosed))) return;
      settled = true;
      clearTimeout(deadlineTimer);
      clearTimeout(killTimer);
      // The end reading: after the child is reaped and its streams closed, or
      // after a spawn failure. Every failure outcome passes through here.
      observations.push(...observeSockets("end", sockets));
      resolve({
        code: exit?.code ?? null,
        signal: exit?.signal ?? null,
        stdout: Buffer.concat(out).toString("utf8"),
        stderr: Buffer.concat(err).toString("utf8"),
        timedOut,
        overflowed,
        error,
        readyAtMs,
        exitedBeforeReadiness,
        sockets: observations,
      });
    };

    let child: ReturnType<typeof spawnPiped>;
    try {
      child = spawnPiped(cmd, args, env);
    } catch (e) {
      error = (e as Error).message;
      finish(true);
      return;
    }
    const startedAt = performance.now();
    const alive = () =>
      child.pid !== undefined && exit === null && child.exitCode === null && child.signalCode === null;

    const terminate = () => {
      if (terminating || !alive()) return;
      terminating = true;
      child.kill("SIGTERM");
      killTimer = setTimeout(() => {
        if (alive()) child.kill("SIGKILL");
      }, CHILD_GRACE_MS);
    };

    const checkCaps = () => {
      if (!overflowed && (outBytes > CHILD_CAP_BYTES || errBytes > CHILD_CAP_BYTES)) {
        overflowed = true;
        terminate();
      }
    };

    deadlineTimer = setTimeout(() => {
      timedOut = true;
      terminate();
    }, CHILD_DEADLINE_MS);

    child.stdout.on("data", (chunk: Buffer) => {
      out.push(chunk);
      outBytes += chunk.length;
      checkCaps();
      if (readiness && readyAtMs === null && !overflowed && readiness(Buffer.concat(out))) {
        readyAtMs = performance.now() - startedAt;
        if (!alive()) exitedBeforeReadiness = true;
        clearTimeout(deadlineTimer);
        observations.push(...observeSockets("readiness", sockets));
        // Readiness performs the test-controlled SIGTERM immediately (plan
        // Step 1: the TUI is terminated by the test after readiness).
        terminate();
      }
    });
    child.stderr.on("data", (chunk: Buffer) => {
      err.push(chunk);
      errBytes += chunk.length;
      checkCaps();
    });
    child.stdout.on("close", () => {
      outClosed = true;
      finish(false);
    });
    child.stderr.on("close", () => {
      errClosed = true;
      finish(false);
    });
    child.on("exit", (code, signal) => {
      exit = { code, signal };
      if (readyAtMs === null) exitedBeforeReadiness = true;
      clearTimeout(deadlineTimer);
      finish(false);
    });
    child.on("error", (e) => {
      error ??= e.message;
      // No pid: the spawn itself failed, so there is no child to reap.
      if (child.pid === undefined) finish(true);
    });
  });
}

interface EntryPathSpec {
  /** Arguments to the Bun executable: the entry point and its flags. */
  args: readonly string[];
  /** Readiness on captured stdout (TUI path only; the CLI path has none). */
  readiness?: (stdout: Buffer) => boolean;
  /** Outcome assertions; they run only after every socket-absence assertion. */
  assertOutcome: (r: ChildOutcome) => void;
  /** Parent of the disposable MADV_RUNTIME_DIR (default: the OS temp dir). */
  parentDir?: string;
}

/**
 * One Step 1 entry-point path. Both socket paths, the fixed legacy path and
 * <MADV_RUNTIME_DIR>/broker.sock, are asserted absent before launch, then at
 * every reading the runner took (readiness and end), before any assertion on
 * code, signal, output or timing. The runner never rejects, so those socket
 * assertions always run. The finally block removes the disposable runtime
 * directory, so removal follows the final socket-absence assertion on every
 * path, including when it or an outcome assertion throws.
 */
async function runEntryPath(spec: EntryPathSpec): Promise<void> {
  const runtimeDir = mkdtempSync(join(spec.parentDir ?? tmpdir(), "task34-runtime-"));
  const sockets = [LEGACY_SOCKET, join(runtimeDir, "broker.sock")];
  try {
    assertSocketsAbsent(observeSockets("before-launch", sockets));
    const r = await runBoundedChild(
      process.execPath,
      spec.args,
      { MADV_RUNTIME_DIR: runtimeDir, PATH: process.env.PATH ?? "" },
      spec.readiness,
      sockets,
    );
    assertSocketsAbsent(r.sockets);
    spec.assertOutcome(r);
  } finally {
    rmSync(runtimeDir, { recursive: true, force: true });
  }
}

/** CLI path: exit code 78 and the exact gate body; a spawn failure, signal, timeout or overflow fails it. */
function assertCliOutcome(r: ChildOutcome): void {
  expect(r.error).toBeNull();
  expect(r.timedOut).toBe(false);
  expect(r.overflowed).toBe(false);
  expect(r.code).toBe(78);
  // Exactly one trailing newline tolerated; bytes otherwise exact.
  const body = r.stdout.endsWith("\n") ? r.stdout.slice(0, -1) : r.stdout;
  expect(body).toBe(START_JSON_BODY);
}

/**
 * TUI path acceptance: every reason the outcome fails (empty means accepted).
 * Readiness must be observed before the 5,000 ms deadline and while the child
 * was still running. After readiness, the test's SIGTERM ending in exit code
 * 0, SIGTERM, or SIGKILL after the 500 ms grace is the expected cleanup.
 * Neither code 0 nor a signal substitutes for readiness.
 */
function tuiPathFailures(r: ChildOutcome): string[] {
  const failures: string[] = [];
  if (r.error !== null) failures.push(`child error: ${r.error}`);
  if (r.timedOut) failures.push("deadline passed before readiness");
  if (r.overflowed) failures.push("stdout or stderr passed the byte cap");
  if (r.readyAtMs === null) failures.push("readiness never observed");
  else if (r.readyAtMs >= CHILD_DEADLINE_MS) {
    failures.push(`readiness observed at ${Math.round(r.readyAtMs)} ms, after the deadline`);
  }
  if (r.exitedBeforeReadiness) failures.push(`exited before readiness (code ${r.code}, signal ${r.signal})`);
  const cleanup = r.code === 0 || (r.code === null && (r.signal === "SIGTERM" || r.signal === "SIGKILL"));
  if (!cleanup) failures.push(`unexpected end (code ${r.code}, signal ${r.signal})`);
  return failures;
}

function listenUnix(path: string): Promise<net.Server> {
  const server = net.createServer(() => {});
  return new Promise((res) => server.listen(path, () => res(server)));
}

// bun.lock is JSONC: JSON plus trailing commas before a closing brace or
// bracket. Strip those outside string literals, then parse. The alternation
// consumes each string literal whole, so a comma inside a string is never
// touched. Anything else that is not JSON makes JSON.parse throw, and the
// caller fails closed on that.
function parseJsonc(text: string): unknown {
  const stripped = text.replace(
    /("(?:[^"\\]|\\.)*")|,(\s*[}\]])/g,
    (_match, literal: string | undefined, closer: string | undefined) => literal ?? closer ?? "",
  );
  return JSON.parse(stripped);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

describe("Task 34: no broker.sock path is reachable", () => {
  // 15s test budget: the plan's 5,000 ms deadline belongs to EACH child,
  // and this test launches two children in sequence (CLI + TUI).
  test("launching every production entry point in bounded isolated processes creates no broker.sock", async () => {
    // ── CLI path: `start --json` must fail closed with the exact gate body.
    await runEntryPath({
      args: ["apps/madbridge/src/cli.ts", "start", "--json"],
      assertOutcome: assertCliOutcome,
    });

    // ── TUI path (default production form, no --fixture): readiness is the
    // StatusBar's honest disconnected word. DEVIATION FROM PLAN LITERAL
    // (disclosed): Step 1 names wide-form "NOT CONNECTED"; at this base the
    // piped renderer emits the medium-format token "NOCONN" (same fact,
    // same buildStatusLine path), empirically probed at the task base.
    // The TUI is terminated by the runner (SIGTERM/SIGKILL discipline);
    // those are expected cleanup outcomes, not unexpected signals.
    await runEntryPath({
      args: ["apps/madbridge/src/tui/main.tsx"],
      readiness: (out) => out.includes("NOCONN"),
      assertOutcome: (r) => expect(tuiPathFailures(r)).toEqual([]),
    });
  }, 15_000);

  test("no production workspace manifest or bun.lock workspace block declares node-pty or node-addon-api, and tui-chaos is the only exempt workspace", () => {
    // FOUNDER-ACT-20261002-M14-TASK34 B2 reads PLAN-OPEN-4 as follows: its aim
    // (spec §9.7, node-pty is not an implementation choice for the PRODUCTION
    // runtime) stands; node-pty is permitted in packages/tui-chaos, a private
    // acceptance harness whose pty bridge (src/pty/bridge.mjs) live-imports it,
    // and in the root trustedDependencies entry that supports it, and nowhere
    // else. The resolved node-pty@1.1.0 and node-addon-api@7.1.1 entries in
    // bun.lock stay while tui-chaos needs them. This test enforces that ruling
    // as a rule, not only as a skipped directory: every production manifest and
    // every bun.lock workspace block other than the one exempt workspace must
    // be free of both packages.
    //
    // Act C1 (correcting finding F2): the former lockfile scan keyed on the
    // string "@madventures/broker@workspace", which bun.lock does not contain,
    // so it could not fail. Workspace dependencies live under the top-level
    // "workspaces" object of bun.lock, keyed by workspace path. The scan now
    // parses that object and fails closed if it, or the packages/broker block,
    // cannot be found.
    const HARNESS_CARVE_OUT = new Set(["packages/tui-chaos"]);
    const NATIVE_PTY_PACKAGES = ["node-pty", "node-addon-api"];
    const sections = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"];
    const manifests = [join(REPO_ROOT, "package.json")];
    for (const scope of ["packages", "apps"]) {
      const scopeDir = join(REPO_ROOT, scope);
      for (const entry of readdirSync(scopeDir)) {
        if (HARNESS_CARVE_OUT.has(`${scope}/${entry}`)) continue;
        const p = join(scopeDir, entry, "package.json");
        if (existsSync(p)) manifests.push(p);
      }
    }
    for (const manifest of manifests) {
      const json = JSON.parse(readFileSync(manifest, "utf8")) as Record<string, unknown>;
      for (const section of sections) {
        const deps = json[section] as Record<string, string> | undefined;
        expect(deps?.["node-pty"], `${manifest} [${section}] node-pty`).toBeUndefined();
        expect(deps?.["node-addon-api"], `${manifest} [${section}] node-addon-api`).toBeUndefined();
      }
    }

    // Lockfile: parse the "workspaces" object of bun.lock. Fail closed if the
    // file does not parse, has no workspaces object, or has no packages/broker
    // block, because a scan that finds nothing to check proves nothing.
    let lock: unknown;
    try {
      lock = parseJsonc(readFileSync(join(REPO_ROOT, "bun.lock"), "utf8"));
    } catch (err) {
      throw new Error(
        "FAIL CLOSED: bun.lock could not be parsed as JSONC, so no workspace block was checked: " + String(err),
      );
    }
    if (!isRecord(lock) || !isRecord(lock.workspaces)) {
      throw new Error('FAIL CLOSED: bun.lock has no "workspaces" object, so no workspace block was checked');
    }
    const workspaces = lock.workspaces;
    if (!isRecord(workspaces["packages/broker"])) {
      throw new Error(
        'FAIL CLOSED: bun.lock "workspaces" has no "packages/broker" block, so the broker lockfile check did not run',
      );
    }
    const lockViolations: string[] = [];
    for (const [workspace, block] of Object.entries(workspaces)) {
      if (HARNESS_CARVE_OUT.has(workspace)) continue;
      const label = workspace === "" ? '"" (root)' : workspace;
      if (!isRecord(block)) {
        throw new Error(`FAIL CLOSED: bun.lock workspace "${label}" block is not an object`);
      }
      for (const section of sections) {
        const deps = block[section];
        if (!isRecord(deps)) continue;
        for (const pkg of NATIVE_PTY_PACKAGES) {
          if (Object.prototype.hasOwnProperty.call(deps, pkg)) {
            lockViolations.push(
              `bun.lock workspace "${label}" [${section}] lists ${pkg}: ${JSON.stringify(deps[pkg])}`,
            );
          }
        }
      }
    }
    if (lockViolations.length > 0) {
      throw new Error(
        "native PTY dependency outside the packages/tui-chaos carve-out (FOUNDER-ACT-20261002-M14-TASK34 B2):\n" +
          lockViolations.join("\n"),
      );
    }
    // The broker package.json itself (belt and braces with the manifest loop).
    const brokerPkg = JSON.parse(
      readFileSync(join(REPO_ROOT, "packages/broker/package.json"), "utf8"),
    ) as Record<string, unknown>;
    expect((brokerPkg.dependencies as Record<string, string>)?.["node-pty"]).toBeUndefined();
  });

  test("root package.json exposes no quarantined script key", () => {
    const json = JSON.parse(readFileSync(join(REPO_ROOT, "package.json"), "utf8")) as {
      scripts?: Record<string, unknown>;
    };
    expect(json.scripts?.["broker"]).toBeUndefined();
    expect(json.scripts?.["mcp"]).toBeUndefined();
  });

  test("the negative control detects a seeded broker.sock and exits 1", async () => {
    const storage = mkdtempSync(join(tmpdir(), "task34-seed-"));
    const sockPath = join(storage, "broker.sock");
    const server = await listenUnix(sockPath);
    try {
      const r = await runBoundedChild(
        process.execPath,
        ["test/phase3a/negative-control.ts"],
        { MADV_STORAGE_DIR: storage, PATH: process.env.PATH ?? "" },
      );
      expect(r.stdout).toContain("broker_sock_matches");
      expect(r.stdout).toContain(sockPath);
      expect(r.code).toBe(1);
    } finally {
      server.close();
      rmSync(storage, { recursive: true, force: true });
    }
  });

  test("the negative control respects its depth bound", async () => {
    // Root A: socket at exactly depth 6 → named, exit 1.
    const a = mkdtempSync(join(tmpdir(), "task34-depthA-"));
    const deep6 = join(a, "d1", "d2", "d3", "d4", "d5", "d6");
    mkdirSync(deep6, { recursive: true });
    const sockA = join(deep6, "broker.sock");
    const serverA = await listenUnix(sockA);
    try {
      const r = await runBoundedChild(
        process.execPath,
        ["test/phase3a/negative-control.ts"],
        { MADV_STORAGE_DIR: a, PATH: process.env.PATH ?? "" },
      );
      expect(r.stdout).toContain(sockA);
      expect(r.code).toBe(1);
    } finally {
      serverA.close();
      rmSync(a, { recursive: true, force: true });
    }

    // Root B: socket at depth 7 only → not named, exit 0.
    const b = mkdtempSync(join(tmpdir(), "task34-depthB-"));
    const deep7 = join(b, "d1", "d2", "d3", "d4", "d5", "d6", "d7");
    mkdirSync(deep7, { recursive: true });
    const sockB = join(deep7, "broker.sock");
    const serverB = await listenUnix(sockB);
    try {
      const r = await runBoundedChild(
        process.execPath,
        ["test/phase3a/negative-control.ts"],
        { MADV_STORAGE_DIR: b, PATH: process.env.PATH ?? "" },
      );
      expect(r.stdout.includes(sockB)).toBe(false);
      expect(r.code).toBe(0);
    } finally {
      serverB.close();
      rmSync(b, { recursive: true, force: true });
    }
  });

  test("the negative control never reads MADV_RUNTIME_DIR", async () => {
    const storage = mkdtempSync(join(tmpdir(), "task34-clean-"));
    const runtime = mkdtempSync(join(tmpdir(), "task34-runtime-seeded-"));
    const sockPath = join(runtime, "broker.sock");
    const server = await listenUnix(sockPath);
    try {
      const r = await runBoundedChild(
        process.execPath,
        ["test/phase3a/negative-control.ts"],
        {
          MADV_STORAGE_DIR: storage,
          MADV_RUNTIME_DIR: runtime,
          PATH: process.env.PATH ?? "",
        },
      );
      // The seeded runtime dir is IGNORED: not named, and the run stays clean.
      expect(r.stdout.includes(sockPath)).toBe(false);
      expect(r.code).toBe(0);
    } finally {
      server.close();
      rmSync(storage, { recursive: true, force: true });
      rmSync(runtime, { recursive: true, force: true });
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════
// Task 34 correction C2 (FOUNDER-ACT-20261003-M14-CORRECTION-C2): each
// V-labelled test pins the finding it names (V1 byte cap, V2 TUI deadline
// and readiness, V3 socket checkpoints and reaping, V4 lstat errors).
// ═══════════════════════════════════════════════════════════════════════

const CHILD_ENV = { PATH: process.env.PATH ?? "" };
const TUI_READY = (out: Buffer): boolean => out.includes("NOCONN");

describe("Task 34 correction C2: the Step 1 runner, entry-path checks and negative-control sweep", () => {
  test("the bounded child runner keeps the Step 1 production limits: 5,000 ms deadline, 500 ms grace, 65,536-byte cap", () => {
    expect({ deadlineMs: CHILD_DEADLINE_MS, graceMs: CHILD_GRACE_MS, capBytes: CHILD_CAP_BYTES }).toEqual({
      deadlineMs: 5_000,
      graceMs: 500,
      capBytes: 65_536,
    });
  });

  test("V1: the runner caps stdout and stderr by bytes, each separately, including output written after readiness and the test's SIGTERM", async () => {
    const run = (script: string, readiness?: (out: Buffer) => boolean) =>
      runBoundedChild(process.execPath, ["-e", script], CHILD_ENV, readiness);
    // é is two bytes in UTF-8 and one UTF-16 unit.
    // 32,768 é = 65,536 bytes on each stream: at the cap, not past it.
    const atCap = await run(
      "process.stdout.write('é'.repeat(32768)); process.stderr.write('é'.repeat(32768));",
    );
    // 32,769 é = 65,538 bytes, but only 32,769 UTF-16 units.
    const overStdout = await run("process.stdout.write('é'.repeat(32769));");
    const overStderr = await run("process.stderr.write('é'.repeat(32769));");
    // Readiness first, then 35,000 é (70,000 bytes) only after the test's SIGTERM.
    const afterSigterm = await run(
      "process.on('SIGTERM', () => process.stdout.write('é'.repeat(35000), () => process.exit(0))); process.stdout.write('NOCONN'); setInterval(() => {}, 1000);",
      TUI_READY,
    );
    expect({
      atCapBytes: [Buffer.byteLength(atCap.stdout), Buffer.byteLength(atCap.stderr)],
      atCapOnEachStream: atCap.overflowed,
      stdout65538Bytes: overStdout.overflowed,
      stderr65538Bytes: overStderr.overflowed,
      afterReadinessAndSigterm: afterSigterm.overflowed,
    }).toEqual({
      atCapBytes: [65_536, 65_536],
      atCapOnEachStream: false,
      stdout65538Bytes: true,
      stderr65538Bytes: true,
      afterReadinessAndSigterm: true,
    });
  }, 15_000);

  test("V1: the runner decodes the collected bytes once, so a two-byte character split across two chunks is returned intact", async () => {
    // The first byte of é (0xc3) is written and flushed alone; the second
    // (0xa9) follows 100 ms later, on stdout and on stderr.
    const r = await runBoundedChild(
      process.execPath,
      [
        "-e",
        "const half = (b) => Buffer.from([b]); process.stdout.write(half(0xc3), () => process.stderr.write(half(0xc3), () => setTimeout(() => { process.stdout.write(half(0xa9)); process.stderr.write(half(0xa9)); }, 100)));",
      ],
      CHILD_ENV,
    );
    expect({ stdout: r.stdout, stderr: r.stderr }).toEqual({ stdout: "é", stderr: "é" });
  }, 15_000);

  test("V2: the TUI-path acceptance rejects exit code 0 without readiness, a token that arrives only after the child exited 0, and a SIGTERM-ignoring child whose readiness token arrives only after the 5,000 ms deadline", async () => {
    const exitZero = await runBoundedChild(process.execPath, ["-e", "process.exit(0)"], CHILD_ENV, TUI_READY);
    // sh exits 0 at once; a background subshell prints the token 200 ms later.
    const afterExit = await runBoundedChild(
      "/bin/sh",
      ["-c", "(sleep 0.2; printf NOCONN) & exit 0"],
      CHILD_ENV,
      TUI_READY,
    );
    // Ignores SIGTERM and prints the token once, when the deadline's SIGTERM
    // arrives, so the token lands after the deadline and before the SIGKILL.
    const late = await runBoundedChild(
      process.execPath,
      [
        "-e",
        "let sent = false; process.on('SIGTERM', () => { if (!sent) { sent = true; process.stdout.write('NOCONN'); } }); setInterval(() => {}, 1000);",
      ],
      CHILD_ENV,
      TUI_READY,
    );
    // The probes did what they claim before the acceptance is judged.
    expect({ code: exitZero.code, stdout: exitZero.stdout }).toEqual({ code: 0, stdout: "" });
    expect({ timedOut: late.timedOut, stdout: late.stdout, signal: late.signal }).toEqual({
      timedOut: true,
      stdout: "NOCONN",
      signal: "SIGKILL",
    });
    expect({
      exitZeroWithoutReadiness: tuiPathFailures(exitZero).length > 0,
      readinessOnlyAfterExit: tuiPathFailures(afterExit).length > 0,
      readinessAfterDeadline: tuiPathFailures(late).length > 0,
    }).toEqual({ exitZeroWithoutReadiness: true, readinessOnlyAfterExit: true, readinessAfterDeadline: true });
    // Checked after the verdicts: the token did arrive, but only after exit.
    expect({ code: afterExit.code, stdout: afterExit.stdout, timedOut: afterExit.timedOut }).toEqual({
      code: 0,
      stdout: "NOCONN",
      timedOut: false,
    });
  }, 15_000);

  test("V3: the runner resolves only after stdout and stderr close, so output a descendant writes after the child exits is still captured", async () => {
    // sh exits at once; a background subshell holds both pipes for 300 ms.
    const r = await runBoundedChild(
      "/bin/sh",
      ["-c", "(sleep 0.3; printf late; printf late >&2) & exit 0"],
      CHILD_ENV,
    );
    expect({ code: r.code, stdout: r.stdout, stderr: r.stderr }).toEqual({
      code: 0,
      stdout: "late",
      stderr: "late",
    });
  }, 15_000);

  test("V3: a TUI-path child that creates broker.sock before readiness and removes it on SIGTERM fails at the readiness checkpoint, and its runtime directory is removed afterward", async () => {
    const parentDir = mkdtempSync(join(tmpdir(), "task34-c2-"));
    try {
      let failure = "";
      await runEntryPath({
        // A plain file named broker.sock: every absence check is an existence check.
        args: [
          "-e",
          "const fs = require('node:fs'); const sock = require('node:path').join(process.env.MADV_RUNTIME_DIR, 'broker.sock'); fs.writeFileSync(sock, ''); process.on('SIGTERM', () => { fs.unlinkSync(sock); process.exit(0); }); process.stdout.write('NOCONN'); setInterval(() => {}, 1000);",
        ],
        readiness: TUI_READY,
        assertOutcome: (r) => expect(tuiPathFailures(r)).toEqual([]),
        parentDir,
      }).catch((err: unknown) => {
        failure = String(err);
      });
      expect(failure).toContain("broker.sock present at readiness");
      expect(readdirSync(parentDir)).toEqual([]);
    } finally {
      rmSync(parentDir, { recursive: true, force: true });
    }
  }, 15_000);

  test("V3: when a child leaves broker.sock and fails its outcome, the socket-absence assertion runs before the outcome assertion and the runtime directory is removed only after it", async () => {
    const parentDir = mkdtempSync(join(tmpdir(), "task34-c2-"));
    try {
      let failure = "";
      await runEntryPath({
        // Leaves broker.sock and exits 1, so the CLI outcome (code 78) fails too.
        args: [
          "-e",
          "require('node:fs').writeFileSync(require('node:path').join(process.env.MADV_RUNTIME_DIR, 'broker.sock'), ''); process.exit(1);",
        ],
        assertOutcome: assertCliOutcome,
        parentDir,
      }).catch((err: unknown) => {
        failure = String(err);
      });
      // The socket inside the runtime directory was seen, so the directory
      // still existed at that assertion; it is gone now.
      expect(failure).toContain("broker.sock present at end");
      expect(readdirSync(parentDir)).toEqual([]);
    } finally {
      rmSync(parentDir, { recursive: true, force: true });
    }
  }, 15_000);

  test("V4: the sweep records a non-ENOENT lstat failure in its errors list, still reports every broker.sock match, and ignores a vanished path", () => {
    const root = mkdtempSync(join(tmpdir(), "task34-c2-lstat-"));
    try {
      // Faults are injected through the sweep's fs seam, not file permissions,
      // so the result is the same for every user id, uid 0 included.
      for (const dir of ["seeded", "blocked", "untyped"]) mkdirSync(join(root, dir));
      for (const file of ["seeded/broker.sock", "blocked/broker.sock", "untyped/broker.sock", "vanished"]) {
        writeFileSync(join(root, file), "");
      }
      const injected: Record<string, string> = {
        [join(root, "blocked")]: "EACCES",
        [join(root, "untyped", "broker.sock")]: "EACCES",
        [join(root, "vanished")]: "ENOENT",
      };
      const result = sweep(root, {
        readdirSync: (path) => readdirSync(path),
        lstatSync: (path) => {
          const code = injected[path];
          if (code !== undefined) {
            throw Object.assign(new Error(`${code}: injected lstat failure, lstat '${path}'`), { code });
          }
          return lstatSync(path);
        },
      });
      expect({
        matches: [...result.matches].sort(),
        errorPaths: result.errors.map((e) => e.slice(0, e.indexOf(": "))).sort(),
        everyErrorIsEacces: result.errors.every((e) => e.includes("EACCES")),
      }).toEqual({
        // blocked/ is not walked: its type is unknown. untyped/broker.sock still
        // counts: an entry whose lstat failed is not proven to be a symlink.
        matches: [join(root, "seeded", "broker.sock"), join(root, "untyped", "broker.sock")].sort(),
        errorPaths: [join(root, "blocked"), join(root, "untyped", "broker.sock")].sort(),
        everyErrorIsEacces: true,
      });
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
