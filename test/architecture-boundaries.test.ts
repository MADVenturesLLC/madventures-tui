import { describe, expect, test } from "bun:test";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Architecture boundary tests.
 *
 * These tests enforce the single-production-definition rule: after retiring
 * the prototype source trees (src/tui, src/broker, src/mcp, src/adapters,
 * src/permissions, src/shared), exactly one production implementation of each
 * core capability must remain, all living under packages/ or apps/.
 */

// ── Helpers ──────────────────────────────────────────────────────────────

/** Recursively list all .ts/.tsx files under a directory. */
function listSourceFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...listSourceFiles(fullPath));
    } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
      results.push(fullPath);
    }
  }
  return results;
}

/** Read all production source files (packages/ + apps/) as a single string. */
function readProductionSource(): string {
  const dirs = ["packages", "apps"];
  const chunks: string[] = [];
  for (const dir of dirs) {
    for (const file of listSourceFiles(dir)) {
      if (file.includes("/test/") || file.includes("/node_modules/")) continue;
      chunks.push(readFileSync(file, "utf8"));
    }
  }
  return chunks.join("\n");
}

// ── Boundary: React presentation isolation ───────────────────────────────

describe("workspace boundaries", () => {
  test("React presentation does not import policy or ledger implementations", () => {
    const app = readFileSync("apps/madbridge/src/tui/App.tsx", "utf8");
    expect(app).not.toMatch(/packages\/(policy|ledger)|@madventures\/(policy|ledger)/);
  });

  // ── Step 2: Strengthen the boundary test ───────────────────────────────

  test("exactly one production definition for broker startup", () => {
    // The broker daemon wiring must live in packages/broker/src/broker.ts.
    // The InMemoryBroker interface is the single production broker contract.
    const source = readProductionSource();
    const brokerInterfaceMatches = source.match(/export interface InMemoryBroker\b/g) || [];
    expect(brokerInterfaceMatches.length).toBe(1);
  });

  test("exactly one production definition for policy evaluation", () => {
    const source = readProductionSource();
    const policyEvalMatches = source.match(/export function evaluateAction\b/g) || [];
    expect(policyEvalMatches.length).toBe(1);
  });

  test("exactly one production definition for protocol event parsing", () => {
    const source = readProductionSource();
    const parseEventMatches = source.match(/export function parseBridgeEvent\b/g) || [];
    expect(parseEventMatches.length).toBe(1);
  });

  test("exactly one production definition for ledger append", () => {
    const source = readProductionSource();
    const ledgerClassMatches = source.match(/export class Ledger\b/g) || [];
    expect(ledgerClassMatches.length).toBe(1);
  });

  test("exactly one production definition for approval submission", () => {
    const source = readProductionSource();
    // The MCP tool list must include the bridge.message.send approval tool
    const approvalToolMatches = source.match(/bridge\.message\.send/g) || [];
    expect(approvalToolMatches.length).toBeGreaterThanOrEqual(1);
  });

  test("no production socket path contains /tmp/", () => {
    const source = readProductionSource();
    // No production code should bind a socket to /tmp/.
    // The runtime dir must come from MADV_RUNTIME_DIR env var, not a /tmp/ default.
    const socketBindMatches = source.match(/\.listen\s*\([^)]*\/tmp\//g) || [];
    expect(socketBindMatches.length).toBe(0);
    // No hardcoded /tmp/ socket path in production source
    const hardcodedTmpSocket = source.match(/["'`]\/tmp\/[^"'`]*\.sock["'`]/g) || [];
    expect(hardcodedTmpSocket.length).toBe(0);
  });

  test("prototype source trees have been removed", () => {
    // After Task 11, these prototype directories must not exist
    const prototypePaths = [
      "src/tui",
      "src/broker",
      "src/mcp",
      "src/adapters",
      "src/permissions",
      "src/shared",
    ];
    for (const p of prototypePaths) {
      expect(existsSync(p)).toBe(false);
    }
  });

  test("no production code imports from deleted prototype paths", () => {
    const source = readProductionSource();
    // No imports referencing the old src/ prototype directories
    expect(source).not.toMatch(/from\s+["']\.\.\/\.\.\/src\//);
    expect(source).not.toMatch(/from\s+["']\.\/broker\//);
    expect(source).not.toMatch(/from\s+["']\.\/shared\//);
    expect(source).not.toMatch(/from\s+["']\.\/mcp\//);
    expect(source).not.toMatch(/from\s+["']\.\/adapters\//);
    expect(source).not.toMatch(/from\s+["']\.\/permissions\//);
    expect(source).not.toMatch(/from\s+["']\.\/tui\//);
  });
});
