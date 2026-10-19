import { expect, test } from "bun:test";
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync } from "node:fs";
import { tmpdir, userInfo } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import * as ts from "typescript";
import { ADAPTER_REGISTRY, parseSurfaceId } from "@madventures/protocol";
import { validateStorageRoot } from "@madventures/storage";
import * as harness from "./runtime-harness";
import { createFakeByteRouter } from "./fixture-adapters";

const ROOT = realpathSync(join(dirname(fileURLToPath(import.meta.url)), "../.."));
const MARKER = /runtime-harness|phase3a/i;
const digest = (source: string): string => new Bun.CryptoHasher("sha256").update(source).digest("hex");
const ROUTER_IMPORTER = "apps/madbridge/test/pty-focus.test.tsx";
const ROUTER_TARGET = "../../../test/phase3a/fixture-adapters";

// Exact-byte exceptions approved in the Task 48 supplement (SHA-256 1a89df93b328362159825b3c3c8e1d578924763dc94c5e0d5791991096ed136d).
// Drift requires review; these are expression exceptions, never file exclusions.
const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> = {
  [ROUTER_IMPORTER]: { sha256: "2faefe54d7c9be2051bce621629203072515263d58bc69b31bd2fe927faedb01" },
  "packages/protocol/src/adapter-registry.ts": {
    sha256: "3129d3cead6312e4cb90eb6832e6a46597f3d352254021d5929b82ec651f4566", call: "source[Symbol.iterator]()",
  },
  "packages/protocol/src/lifecycle-events.ts": {
    sha256: "9210012a505848a7379ab7b9cf9d840f33197de58f85b23c359653760479c603", call: "PAYLOAD_SHAPE[knownType](payload)",
  },
  "packages/supervisor/src/build.ts": {
    sha256: "bd73bb219e96bc76d3b4e544cde9152ef028ce12d02003ff67d93347f39ca35d", call: "host.handle.facts()[Symbol.asyncIterator]()",
  },
};

type Reason = "static-import" | "command-dispatch" | "control-flow-gate" | "dynamic-import"
  | "dynamic-import-unresolvable" | "environment-gate" | "path-construction"
  | "computed-dispatch-unresolvable" | "exception-drift" | "syntax-error";
interface Finding { file: string; line: number; reason: Reason; expression: string }
interface Scope { parent: Scope | undefined; bindings: Map<string, ts.Node | null> }

function unwrap(node: ts.Node): ts.Node {
  while (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isTypeAssertionExpression(node)
    || ts.isNonNullExpression(node) || ts.isSatisfiesExpression(node)) node = node.expression;
  return node;
}

function analyze(file: string, source: string): Finding[] {
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const findings: Finding[] = [];
  const report = (reason: Reason, node: ts.Node = tree) => findings.push({
    file, reason, line: tree.getLineAndCharacterOfPosition(node.getStart(tree)).line + 1,
    expression: node.getText(tree),
  });
  const diagnostics = ts.transpileModule(source, {
    fileName: file, reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.Preserve },
  }).diagnostics ?? [];
  if (diagnostics.some(diagnostic => diagnostic.category === ts.DiagnosticCategory.Error)) report("syntax-error");
  const exception = EXCEPTIONS[file];
  const pinned = exception !== undefined && digest(source) === exception.sha256;
  if (exception !== undefined && !pinned) report("exception-drift");

  // Phase 1: lexical binding prevents an outer safe const from hiding an unknown parameter.
  const scopes = new WeakMap<ts.Node, Scope>();
  const imports = new Map<ts.Node, { module: string; original: string }>();
  const constants = new Map<ts.Node, ts.Expression>();
  const methods = new Map<ts.Node, { object: ts.Expression; method: string }>();
  const bind = (scope: Scope, name: string, node: ts.Node) => {
    scope.bindings.set(name, scope.bindings.has(name) ? null : node);
  };
  function bindName(scope: Scope, name: ts.BindingName, declaration: ts.Node, initializer?: ts.Expression): void {
    if (ts.isIdentifier(name)) {
      bind(scope, name.text, declaration);
      if (initializer !== undefined) {
        constants.set(declaration, initializer);
        const value = unwrap(initializer);
        if (ts.isPropertyAccessExpression(value)) methods.set(declaration, { object: value.expression, method: value.name.text });
        if (ts.isElementAccessExpression(value) && ts.isStringLiteral(value.argumentExpression)) {
          methods.set(declaration, { object: value.expression, method: value.argumentExpression.text });
        }
      }
    } else {
      for (const element of name.elements) {
        if (!ts.isBindingElement(element)) continue;
        bindName(scope, element.name, element);
        const key = element.propertyName ?? (ts.isIdentifier(element.name) ? element.name : undefined);
        if (initializer !== undefined && !element.dotDotDotToken && key !== undefined
          && (ts.isIdentifier(key) || ts.isStringLiteral(key))) {
          methods.set(element, { object: initializer, method: key.text });
        }
      }
    }
  }
  function gather(node: ts.Node, parent: Scope | undefined): void {
    if (parent !== undefined && (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) && node.name) {
      bind(parent, node.name.text, node);
    }
    const scope: Scope = parent === undefined || ts.isBlock(node) || ts.isFunctionLike(node)
      || ts.isCatchClause(node) || ts.isForStatement(node) || ts.isForOfStatement(node) || ts.isForInStatement(node)
      ? { parent, bindings: new Map() } : parent;
    scopes.set(node, scope);
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const module = node.moduleSpecifier.text, clause = node.importClause;
      const add = (name: ts.Identifier, original: string, declaration: ts.Node) => {
        bind(scope, name.text, declaration); imports.set(declaration, { module, original });
      };
      if (clause?.name) add(clause.name, "*", clause);
      if (clause?.namedBindings && ts.isNamespaceImport(clause.namedBindings)) add(clause.namedBindings.name, "*", clause.namedBindings);
      if (clause?.namedBindings && ts.isNamedImports(clause.namedBindings)) {
        for (const element of clause.namedBindings.elements) add(element.name, (element.propertyName ?? element.name).text, element);
      }
    }
    if (ts.isVariableDeclaration(node)) {
      const constant = ts.isVariableDeclarationList(node.parent) && (node.parent.flags & ts.NodeFlags.Const) !== 0;
      bindName(scope, node.name, node, constant ? node.initializer : undefined);
    }
    if (ts.isParameter(node)) bindName(scope, node.name, node);
    ts.forEachChild(node, child => gather(child, scope));
  }
  gather(tree, undefined);
  function binding(node: ts.Identifier): ts.Node | null | undefined {
    for (let scope = scopes.get(node); scope !== undefined; scope = scope.parent) {
      if (scope.bindings.has(node.text)) return scope.bindings.get(node.text);
    }
    return undefined;
  }
  function reference(raw: ts.Node, seen = new Set<ts.Node>()): string | undefined {
    const node = unwrap(raw);
    if (ts.isIdentifier(node)) {
      const declaration = binding(node);
      if (declaration === undefined) return node.text;
      if (declaration === null || seen.has(declaration)) return undefined;
      const next = new Set(seen).add(declaration), imported = imports.get(declaration), method = methods.get(declaration);
      if (imported) return imported.original === "*" ? imported.module : `${imported.module}.${imported.original}`;
      if (method) {
        const object = reference(method.object, next);
        return object === undefined ? undefined : `${object}.${method.method}`;
      }
      const value = constants.get(declaration);
      return value === undefined ? undefined : reference(value, next);
    }
    if (ts.isPropertyAccessExpression(node) || (ts.isElementAccessExpression(node) && ts.isStringLiteral(node.argumentExpression))) {
      const object = reference(node.expression, seen);
      const key = ts.isPropertyAccessExpression(node) ? node.name.text : (node.argumentExpression as ts.StringLiteral).text;
      return object === undefined ? undefined : `${object}.${key}`;
    }
    return undefined;
  }
  function stringValue(raw: ts.Node, seen = new Set<ts.Node>()): string | undefined {
    const node = unwrap(raw);
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isIdentifier(node)) {
      const declaration = binding(node);
      if (declaration == null || seen.has(declaration)) return undefined;
      const value = constants.get(declaration);
      return value === undefined ? undefined : stringValue(value, new Set(seen).add(declaration));
    }
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
      const left = stringValue(node.left, seen), right = stringValue(node.right, seen);
      return left === undefined || right === undefined ? undefined : left + right;
    }
    if (ts.isTemplateExpression(node)) {
      let result = node.head.text;
      for (const span of node.templateSpans) {
        const value = stringValue(span.expression, seen);
        if (value === undefined) return undefined;
        result += value + span.literal.text;
      }
      return result;
    }
    return undefined;
  }
  function hasMarker(node: ts.Node, seen = new Set<ts.Node>()): boolean {
    if (seen.has(node)) return false;
    const next = new Set(seen).add(node);
    const value = stringValue(node);
    if (value !== undefined && MARKER.test(value)) return true;
    if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) return MARKER.test(node.text);
    if (ts.isIdentifier(node)) {
      const declaration = binding(node), initializer = declaration == null ? undefined : constants.get(declaration);
      if (initializer !== undefined && hasMarker(initializer, next)) return true;
    }
    return ts.forEachChild(node, child => hasMarker(child, next) || undefined) === true;
  }
  function hasEnvironment(node: ts.Node): boolean {
    const name = reference(node);
    return (name !== undefined && /(^|\.)env(\.|$)/.test(name))
      || ts.forEachChild(node, child => hasEnvironment(child) || undefined) === true;
  }
  function permittedRouter(node: ts.Node): boolean {
    if (!pinned || file !== ROUTER_IMPORTER || !ts.isImportDeclaration(node)
      || !ts.isStringLiteral(node.moduleSpecifier) || node.moduleSpecifier.text !== ROUTER_TARGET) return false;
    const clause = node.importClause, bindings = clause?.namedBindings;
    if (!clause || clause.name || clause.isTypeOnly || !bindings || !ts.isNamedImports(bindings) || bindings.elements.length !== 1) return false;
    const element = bindings.elements[0]!;
    return !element.isTypeOnly && element.propertyName === undefined && element.name.text === "createFakeByteRouter";
  }
  const dispatch = new Set(["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"]);
  const logical = new Set([ts.SyntaxKind.AmpersandAmpersandToken, ts.SyntaxKind.BarBarToken, ts.SyntaxKind.QuestionQuestionToken]);
  // Phase 2: findings are independent, so an exception never skips the rest of a subtree.
  function visit(node: ts.Node): void {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier
      && ts.isStringLiteral(node.moduleSpecifier) && MARKER.test(node.moduleSpecifier.text) && !permittedRouter(node)) report("static-import", node);
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)
      && node.moduleReference.expression && hasMarker(node.moduleReference.expression)) report("static-import", node);
    if (ts.isImportTypeNode(node) && hasMarker(node.argument)) report("static-import", node);
    if (ts.isCallExpression(node)) {
      const callee = unwrap(node.expression), name = reference(callee);
      const declaration = ts.isIdentifier(callee) ? binding(callee) : undefined;
      const method = ts.isPropertyAccessExpression(callee) ? callee.name.text
        : (declaration == null ? undefined : methods.get(declaration)?.method) ?? name?.split(".").at(-1);
      if (callee.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(callee) && callee.text === "require") || name === "require") {
        const target = node.arguments[0] === undefined ? undefined : stringValue(node.arguments[0]);
        if (target === undefined) report("dynamic-import-unresolvable", node);
        else if (MARKER.test(target)) report("dynamic-import", node);
      }
      const marked = node.arguments.some(argument => hasMarker(argument));
      if (marked && method !== undefined && dispatch.has(method)) report("command-dispatch", node);
      if (marked && (method === "join" || method === "resolve")) report("path-construction", node);
      if (ts.isElementAccessExpression(callee)) {
        if (!ts.isStringLiteral(callee.argumentExpression)) {
          if (!(pinned && exception?.call === node.getText(tree))) report("computed-dispatch-unresolvable", node);
        } else if (["join", "resolve"].includes(callee.argumentExpression.text) && marked) report("path-construction", node);
      }
    }
    if (ts.isTaggedTemplateExpression(node)) {
      const tag = reference(node.tag);
      if ((tag === "$" || tag === "bun.$") && hasMarker(node.template)) report("command-dispatch", node);
    }
    if ((ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken || ts.isTemplateExpression(node))
      && hasMarker(node)) report("path-construction", node);
    const gated = ts.isIfStatement(node) ? hasMarker(node.thenStatement) || (node.elseStatement !== undefined && hasMarker(node.elseStatement))
      : ts.isConditionalExpression(node) ? hasMarker(node.whenTrue) || hasMarker(node.whenFalse)
      : ts.isSwitchStatement(node) ? hasMarker(node.caseBlock)
      : ts.isBinaryExpression(node) && logical.has(node.operatorToken.kind) && hasMarker(node);
    if (gated) {
      report("control-flow-gate", node);
      if (hasEnvironment(node)) report("environment-gate", node);
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  return findings;
}

function sourceFiles(directory: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const path = join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Unscanned source symlink: ${path}`);
    if (entry.isDirectory()) files.push(...sourceFiles(path));
    else if (/\.tsx?$/.test(entry.name)) files.push(path);
  }
  return files.sort();
}

const files = [
  ...sourceFiles(join(ROOT, "apps")),
  ...readdirSync(join(ROOT, "packages"), { withFileTypes: true }).flatMap(entry => {
    if (entry.isSymbolicLink()) throw new Error(`Unscanned package symlink: ${entry.name}`);
    const directory = join(ROOT, "packages", entry.name, "src");
    return entry.isDirectory() && existsSync(directory) ? sourceFiles(directory) : [];
  }),
];
const productionFindings = files.flatMap(path => analyze(relative(ROOT, path), readFileSync(path, "utf8")));
function productionClean(reasons: readonly Reason[]): void {
  expect(files.length).toBeGreaterThan(0);
  for (const path of Object.keys(EXCEPTIONS)) expect(files).toContain(join(ROOT, path));
  expect(productionFindings.filter(finding => reasons.includes(finding.reason)
    || finding.reason === "exception-drift" || finding.reason === "syntax-error")).toEqual([]);
}
function detects(reason: Reason, source: string, file = "apps/seed.ts", expression?: string): void {
  const findings = analyze(file, source);
  expect(findings.some(finding => finding.reason === reason && (expression === undefined || finding.expression === expression)),
    `${file}: expected ${reason} in ${expression ?? source}`).toBe(true);
}

test("no file under apps/ or packages/*/src statically imports, command-dispatches to, or argument-gates runtime-harness", () => {
  productionClean(["static-import", "command-dispatch", "control-flow-gate"]);
  for (const source of [
    'import { startFixtureSession } from "../test/phase3a/runtime-harness";',
    'export { startFixtureSession } from "../test/phase3a/runtime-harness";',
    'export * from "../test/phase3a/runtime-harness";',
  ]) detects("static-import", source);
  for (const method of ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"]) {
    detects("command-dispatch", `import { ${method} as run } from "node:child_process"; run("test/phase3a/runtime-harness");`);
  }
  for (const source of [
    'import * as cp from "node:child_process"; cp.spawn("bun", ["test/phase3a/runtime-harness"]);',
    'import cp from "node:child_process"; const run = cp.spawn; run("test/phase3a/runtime-harness");',
    'const target = "test/phase3a/runtime-harness"; spawn("bun", [target]);',
    'Bun.spawn(["bun", "test/phase3a/runtime-harness"]);',
    'Bun.spawnSync({ cmd: ["bun", "test/phase3a/runtime-harness"] });',
    'import { $ } from "bun"; $`bun test/phase3a/runtime-harness`;',
    'import { $ as shell } from "bun"; const target = "test/phase3a/runtime-harness"; shell`bun ${target}`;',
    '$`bun test/phase3a/runtime-harness`;',
    'const run = Bun.spawn; const command = ["bun", "test/phase3a/runtime-harness"]; run(command);',
  ]) detects("command-dispatch", source);
  for (const source of [
    'switch (mode) { case "fixture": require("test/phase3a/runtime-harness"); }',
    'if (enabled && process.argv.includes("--fixture")) require("test/phase3a/runtime-harness");',
    'if (enabled || debug) require("test/phase3a/runtime-harness");',
    'const { FIXTURE } = process.env; if (FIXTURE) require("test/phase3a/runtime-harness");',
    'const target = "test/phase3a/runtime-harness"; enabled ? run(target) : run("src/main");',
    'enabled && require("test/phase3a/runtime-harness");',
    'enabled || require("test/phase3a/runtime-harness");',
    'enabled ?? require("test/phase3a/runtime-harness");',
  ]) detects("control-flow-gate", source);
  expect(analyze("apps/ordinary.ts", 'import { join } from "node:path"; export { join }; Bun.spawn(["bun", "src/main.ts"]);')).toEqual([]);
  const source = readFileSync(join(ROOT, ROUTER_IMPORTER), "utf8");
  expect(analyze(ROUTER_IMPORTER, source)).toEqual([]);
  detects("static-import", source, "apps/another-importer.ts");
  detects("static-import", source.replace(ROUTER_TARGET, "../../../test/phase3a/runtime-harness"), ROUTER_IMPORTER);
  detects("static-import", source.replace("import { createFakeByteRouter }", "import { startFixtureSession }"), ROUTER_IMPORTER);
  for (const edge of [
    `import router from "${ROUTER_TARGET}";`, `import * as router from "${ROUTER_TARGET}";`,
    `export { createFakeByteRouter } from "${ROUTER_TARGET}";`,
  ]) detects("static-import", edge, ROUTER_IMPORTER, edge);
  detects("exception-drift", source + "\n// changed bytes\n", ROUTER_IMPORTER);
  const added = 'require("test/phase3a/runtime-harness");';
  detects("dynamic-import", source + "\n" + added, ROUTER_IMPORTER, added.slice(0, -1));
});

test("no production file uses a dynamic import or environment-gated route to the test tree", () => {
  productionClean(["dynamic-import", "dynamic-import-unresolvable", "environment-gate"]);
  for (const source of [
    'import("test/phase3a/runtime-harness");', 'require("test/phase3a/runtime-harness");',
    'const target = "test/phase3a/runtime-harness"; import(target);',
    'const a = "runtime", b = "-harness"; require(a + b);',
    'const target = "phase3a"; import(`test/${target}/runtime-harness`);',
  ]) detects("dynamic-import", source);
  for (const source of [
    'import(computeTarget());', 'require(target);', 'let target = "react"; import(target);',
    'const target = "react"; function load(target: string) { return import(target); }',
    'const a = b; const b = a; import(a);',
    'function load(require: Function, target: string) { return require(target); }',
  ]) detects("dynamic-import-unresolvable", source);
  for (const source of [
    'if (process.env.FIXTURE) require("test/phase3a/runtime-harness");',
    'const { FIXTURE: active } = process.env; if (active) require("test/phase3a/runtime-harness");',
    'const environment = process.env; environment.FIXTURE ? require("test/phase3a/runtime-harness") : null;',
    'switch (config.env) { case "test": require("test/phase3a/runtime-harness"); }',
    'process.env.FIXTURE && require("test/phase3a/runtime-harness");',
  ]) detects("environment-gate", source);
  expect(analyze("apps/ordinary.ts", 'require("react"); const target = "react"; import(target);')).toEqual([]);
});

test("no production file constructs a filesystem path into the test tree", () => {
  productionClean(["path-construction", "computed-dispatch-unresolvable"]);
  for (const source of [
    'path.join("test/phase3a", "runtime-harness.ts");', 'path.resolve("test/phase3a/runtime-harness");',
    'import { join as build } from "node:path"; build("test/phase3a/runtime-harness");',
    'import { resolve as build } from "path"; build("test/phase3a/runtime-harness");',
    'const build = path.join; build("test/phase3a/runtime-harness");',
    'const path = require("node:path"); const build = path.join; build("test/phase3a/runtime-harness");',
    'path["join"]("test/phase3a/runtime-harness");',
    'path["resolve"]("test/phase3a/runtime-harness");',
    'const target = root + "/test/phase3a/runtime-harness";',
    'const target = `${root}/test/phase3a/runtime-harness`;',
    'const target = "runtime" + "-harness";',
    'import * as location from "node:path"; location.join("test/phase3a/runtime-harness");',
    'const target = "test/phase3a/runtime-harness"; path.join(root, target);',
    'import path from "node:path"; const build = path["resolve"]; build("phase3a");',
  ]) detects("path-construction", source);
  for (const source of ['path[method]("src", "App.tsx");', 'object[Symbol.iterator]();', 'object[`join`]("src");']) {
    detects("computed-dispatch-unresolvable", source);
  }
  expect(analyze("apps/ordinary.ts", 'import * as path from "node:path"; path.join("src", "App.tsx");')).toEqual([]);
  for (const [file, exception] of Object.entries(EXCEPTIONS)) {
    if (exception.call === undefined) continue;
    const source = readFileSync(join(ROOT, file), "utf8"), call = exception.call;
    expect(source.split(call).length).toBe(2);
    expect(analyze(file, source)).toEqual([]);
    detects("exception-drift", source + "\n// changed bytes\n", file);
    for (const mutated of [
      call.replace(/^[^[]+/, "differentReceiver"),
      call.replace(/\[[^\]]+\]/, "[differentKey]"),
      call.replace(/\([^()]*\)$/, '("unexpected")'),
    ]) detects("computed-dispatch-unresolvable", source.replace(call, mutated), file, mutated);
    const added = 'escape[selector]("test/phase3a/runtime-harness")';
    detects("computed-dispatch-unresolvable", source + `\n${added};\n`, file, added);
  }
});

test("the harness rejects a real registered surface", async () => {
  const directories = () => readdirSync(userInfo().homedir).filter(name => name.startsWith(".madbridge-task48-")).sort();
  const before = directories();
  expect(ADAPTER_REGISTRY.size).toBeGreaterThan(0);
  for (const surface of [...ADAPTER_REGISTRY.keys(), parseSurfaceId("unknown-surface")]) {
    await expect(harness.startFixtureSession({ surfaces: [harness.FIXTURE_SURFACE_IDS[0]!, surface] }))
      .rejects.toBeInstanceOf(harness.RealSurfaceRejected);
  }
  for (const key of ["envelope", "plan", "registration", "probe", "live_attester", "executablePath", "provider", "independence_domain", "storageRoot"]) {
    await expect(harness.startFixtureSession({ [key]: {} } as harness.HarnessOptions)).rejects.toThrow("InvalidHarnessOptions");
  }
  let called = false;
  await expect(harness.startFixtureSession({ get surfaces() { called = true; return harness.FIXTURE_SURFACE_IDS; } }))
    .rejects.toThrow("InvalidHarnessOptions");
  expect(called).toBe(false);
  await expect(harness.startFixtureSession({ surfaces: [] })).rejects.toThrow("FixturePairRequired");
  await expect(harness.startFixtureSession({ surfaces: [harness.FIXTURE_SURFACE_IDS[0]!, harness.FIXTURE_SURFACE_IDS[0]!] }))
    .rejects.toThrow("FixturePairRequired");
  expect(directories()).toEqual(before);
});

test("the harness exposes no gate-removal function", () => {
  expect(Object.keys(harness).filter(name => /gate|certif|enable.*start/i.test(name))).toEqual([]);
  const source = readFileSync(join(ROOT, "test/phase3a/fixture-adapters.ts"), "utf8");
  expect(analyze("test/phase3a/fixture-adapters.ts", source)).toEqual([]);
  const router = createFakeByteRouter(), bytes = new Uint8Array([1, 2, 3]);
  const received: Uint8Array[] = [];
  router.onData("builder", data => received.push(data));
  router.write("reviewer", bytes);
  expect(received).toEqual([]);
  router.write("builder", bytes);
  expect(received).toEqual([bytes]);
});

test("fixture surface ids are absent from the production registry", () => {
  expect(harness.FIXTURE_SURFACE_IDS.length).toBe(2);
  expect(harness.FIXTURE_REGISTRY.size).toBe(2);
  expect(Object.isFrozen(harness.FIXTURE_SURFACE_IDS)).toBe(true);
  expect(Object.isFrozen(harness.FIXTURE_REGISTRY)).toBe(true);
  expect("set" in harness.FIXTURE_REGISTRY).toBe(false);
  expect([...harness.FIXTURE_REGISTRY.keys()]).toEqual([...harness.FIXTURE_SURFACE_IDS]);
  for (const surface of harness.FIXTURE_SURFACE_IDS) {
    expect(ADAPTER_REGISTRY.has(surface)).toBe(false);
    const registration = harness.FIXTURE_REGISTRY.get(surface)!;
    expect(Object.isFrozen(registration)).toBe(true);
    expect(Object.isFrozen(registration.identity_probe.argv)).toBe(true);
  }
  harness.FIXTURE_REGISTRY.forEach((_value, _key, map) => expect(map).toBe(harness.FIXTURE_REGISTRY));
});

const LEGACY_SOCKET = "/tmp/madv-broker-runtime/broker.sock";
const STARTED = "HARNESS_STARTED_NO_SOCKET", CLOSED = "HARNESS_CLOSED_NO_SOCKET";
interface Outcome {
  code: number | null; signal: string | null; stdout: string; stderr: string;
  error: string | null; timedOut: boolean; overflowed: boolean; socketObservations: boolean[];
}

function isolatedHarness(script: string, runtime: string, sockets: readonly string[]): Promise<Outcome> {
  return new Promise(resolve => {
    const buffers: Buffer[][] = [[], []], sizes = [0, 0];
    const observations: boolean[] = [];
    let error: string | null = null, timedOut = false, overflowed = false, terminating = false;
    let killTimer: ReturnType<typeof setTimeout> | undefined;
    let deadline: ReturnType<typeof setTimeout> | undefined;
    let child: ReturnType<typeof spawn>;
    const finish = (code: number | null, signal: string | null) => {
      clearTimeout(deadline); clearTimeout(killTimer);
      observations.push(...sockets.map(path => existsSync(path)));
      resolve({ code, signal, stdout: Buffer.concat(buffers[0]!).toString(), stderr: Buffer.concat(buffers[1]!).toString(),
        error, timedOut, overflowed, socketObservations: observations });
    };
    try {
      child = spawn(process.execPath, ["--eval", script], {
        cwd: ROOT, stdio: ["ignore", "pipe", "pipe"],
        env: { PATH: process.env.PATH, HOME: userInfo().homedir, MADV_RUNTIME_DIR: runtime },
      });
    } catch (cause) { error = String(cause); finish(null, null); return; }
    const alive = () => child.pid !== undefined && child.exitCode === null && child.signalCode === null;
    const terminate = () => {
      if (terminating || !alive()) return;
      terminating = true;
      child.kill("SIGTERM");
      killTimer = setTimeout(() => { if (alive()) child.kill("SIGKILL"); }, 500);
    };
    deadline = setTimeout(() => { timedOut = true; terminate(); }, 5000);
    for (const [index, stream] of [child.stdout!, child.stderr!].entries()) {
      stream.on("data", (chunk: Buffer) => {
        const room = Math.max(0, 65536 - sizes[index]!);
        sizes[index]! += chunk.length;
        buffers[index]!.push(chunk.subarray(0, room));
        if (sizes[index]! > 65536) { overflowed = true; terminate(); }
        if (index === 0) observations.push(...sockets.map(path => existsSync(path)));
      });
      stream.on("error", cause => { error ??= cause.message; terminate(); });
    }
    child.on("error", cause => { error ??= cause.message; terminate(); });
    child.on("close", finish); // close follows exit/reaping and closure of both captured streams.
  });
}

test("running the fixture harness in an isolated process creates no broker.sock", async () => {
  const runtime = realpathSync(mkdtempSync(join(tmpdir(), "task48-runtime-")));
  const sockets = [join(runtime, "broker.sock"), LEGACY_SOCKET];
  try {
    expect(validateStorageRoot(runtime, ROOT, ROOT).ok).toBe(true);
    expect(sockets.map(path => existsSync(path))).toEqual([false, false]);
    const script = `
      import { strict as assert } from "node:assert";
      import { existsSync } from "node:fs";
      import { dirname } from "node:path";
      import { startFixtureSession } from ${JSON.stringify(join(ROOT, "test/phase3a/runtime-harness.ts"))};
      import { validateStorageRoot } from ${JSON.stringify(join(ROOT, "packages/storage/src/index.ts"))};
      const sockets = ${JSON.stringify(sockets)};
      const absent = () => assert.deepEqual(sockets.map(path => existsSync(path)), [false, false]);
      absent();
      const session = await startFixtureSession();
      try {
        assert.equal((await session.client.getSnapshot()).phase, "active");
        assert.equal(existsSync(session.storage.sessionDir), true);
        assert.equal(validateStorageRoot(session.storage.root, ${JSON.stringify(ROOT)}, ${JSON.stringify(ROOT)}).ok, true);
        absent();
        console.log(${JSON.stringify(STARTED)});
      } finally { await session.close(); }
      await session.close();
      assert.equal((await session.client.getSnapshot()).connected, false);
      assert.equal(existsSync(dirname(session.storage.root)), false);
      absent();
      console.log(${JSON.stringify(CLOSED)});
    `;
    const result = await isolatedHarness(script, runtime, sockets);
    // Socket checks precede outcome checks and directory removal even on failure.
    expect(result.socketObservations.every(present => !present)).toBe(true);
    expect(sockets.map(path => existsSync(path))).toEqual([false, false]);
    expect({ code: result.code, signal: result.signal, error: result.error, timedOut: result.timedOut,
      overflowed: result.overflowed, stderr: result.stderr }).toEqual({
      code: 0, signal: null, error: null, timedOut: false, overflowed: false, stderr: "",
    });
    expect(result.stdout.trim().split(/\r?\n/)).toEqual([STARTED, CLOSED]);
  } finally {
    try { expect(sockets.map(path => existsSync(path))).toEqual([false, false]); }
    finally { rmSync(runtime, { recursive: true }); }
  }
}, 15000);
