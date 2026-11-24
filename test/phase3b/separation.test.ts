import { expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";
import { runTransactionalBuild } from "../../packages/supervisor/src/index";
import { closeOfflineBuild, offlineStart } from "./offline";

const apps = join(import.meta.dir, "../../apps");
const seams = new Set(["runTransactionalBuildWithDependencies", "runPurePreflightWithDependencies"]);
const internalModule = /(?:^|\/)supervisor\/src\/(?:build|preflight)(?:\.[cm]?[jt]s)?$/;

function* appSources(directory: string): Generator<string> {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory() && entry.name !== "node_modules") yield* appSources(path);
    if (entry.isFile() && /\.[cm]?[jt]sx?$/.test(entry.name)) yield path;
  }
}

function usesSeam(node: ts.Node): boolean {
  if (ts.isImportSpecifier(node) || ts.isExportSpecifier(node)) {
    return seams.has((node.propertyName ?? node.name).text);
  }
  if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)
      && internalModule.test(node.moduleSpecifier.text) && node.importClause?.namedBindings
      && ts.isNamespaceImport(node.importClause.namedBindings)) return true;
  if (ts.isExportDeclaration(node) && !node.exportClause && node.moduleSpecifier
      && ts.isStringLiteral(node.moduleSpecifier) && internalModule.test(node.moduleSpecifier.text)) return true;
  if (ts.isPropertyAccessExpression(node) && seams.has(node.name.text)) return true;
  if (ts.isElementAccessExpression(node) && ts.isStringLiteral(node.argumentExpression)
      && seams.has(node.argumentExpression.text)) return true;
  if (ts.isBindingElement(node)) {
    const key = node.propertyName ?? node.name;
    if ((ts.isIdentifier(key) || ts.isStringLiteral(key)) && seams.has(key.text)) return true;
  }
  return ts.forEachChild(node, child => usesSeam(child) || undefined) === true;
}

test("application code imports neither internal supervisor seam", () => {
  const imports: string[] = [];
  for (const path of appSources(apps)) {
    const text = readFileSync(path, "utf8");
    if (!text.includes("WithDependencies") && !text.includes("supervisor/src/")) continue;
    if (usesSeam(ts.createSourceFile(path, text, ts.ScriptTarget.Latest))) imports.push(path);
  }
  expect(imports).toEqual([]);
});

test("the original public build still fails closed without an attester", async () => {
  const fixture = offlineStart();
  try {
    const result = await runTransactionalBuild({
      sessionId: "offline-no-attester", envelope: fixture.envelope, plan: fixture.plan,
    });
    try {
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.failedStep).toBe("reattest");
        expect(result.failure).toBe("reattestation_failed");
        expect(result.detail).toBe("step=reattest execution=builder failure=reattestation_failed");
        expect(result.partialState.completedSteps).not.toContain("activate");
      }
    } finally { await closeOfflineBuild(result); }
  } finally { fixture.dispose(); }
}, 15000);
