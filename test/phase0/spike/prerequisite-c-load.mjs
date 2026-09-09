/**
 * Room Runtime Phase 0 — Prerequisite C inventory/load spike (r4 §9
 * Prerequisite C; act item 5.19; evidence item 17).
 *
 * Executed by the NODE 22 binary (Founder-confirmed proof runtime: nvm
 * Node 22.23.2; the host-default Node 26 is NOT the bound proof target).
 *
 * What this spike measures, in order of depth:
 *
 *  1. REAL-ENTRY LOAD: attempts to load the real MadBridge broker and
 *     ledger entry-point sources under Node 22 (via its type-stripping
 *     flag — a runtime flag on the proof binary only; no dependency,
 *     engine, package, or toolchain-file change). Failure classes:
 *       - `resolution`  — Node's ESM resolver cannot resolve the
 *         workspace's Bun-first module graph (extensionless relative
 *         imports; workspace symlinks without main/exports; tsconfig path
 *         aliases only Bun resolves). This is a load boundary, recorded
 *         honestly; it is NOT itself the Bun-dependency question.
 *       - `bun-sqlite`  — the load reached a bun:sqlite import and
 *         failed on it.
 *       - `bun-global` — the load reached a Bun.* global and failed.
 *       - `other`      — any other failure, recorded verbatim.
 *
 *  2. DIRECT DEPENDENCY PROBE: `await import("bun:sqlite")` under Node 22 —
 *     the definitive answer to whether the ledger's storage engine is
 *     loadable by Node at all, independent of resolution strategy.
 *
 *  3. BUN GLOBAL PRESENCE: `typeof Bun` in the Node process (expected
 *     false; recorded, not assumed).
 *
 *  4. SOCKET SIDE EFFECTS: whether loading binds/creates any socket path
 *     (quarantined socket behavior).
 *
 * Per r4 §9 Prerequisite C: the objective is to prove whether the
 * broker+ledger subset can load under Node 22 without Bun globals,
 * bun:sqlite, Bun subprocess types, or quarantined socket behavior as a
 * side effect. This spike measures and records; it does NOT adopt any
 * remediation option. On fail, the finding routes to the Founder with
 * the r4 §9 options — never a silent adoption.
 *
 * Output: a JSON verdict on stdout (consumed by the TUI proof record and
 * the runner test).
 *
 * Plain .mjs (no TypeScript): Node 22 executes this file directly.
 */

import { mkdtempSync, rmSync, existsSync, realpathSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { hostname } from "node:os";

const RUNTIME = `node ${process.version} on ${hostname()} (${process.platform})`;

// Resolve repo root from this file's location:
// <repo>/test/phase0/spike/prerequisite-c-load.mjs
const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = realpathSync(join(HERE, "..", "..", ".."));

function classify(error) {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("bun:sqlite")) {
    return { failure: message, failure_class: "bun-sqlite" };
  }
  if (
    message.includes("Bun.") ||
    message.includes("Bun is not defined") ||
    message.includes("'Bun'") ||
    message.includes('"Bun"')
  ) {
    return { failure: message, failure_class: "bun-global" };
  }
  // Node's ESM resolution failures for the Bun-first module graph:
  // "Cannot find module './credentials'", "Cannot find package
  // '@madventures/protocol/index.js'" — the workspace's extensionless
  // relative imports, main-less workspace symlinks, and tsconfig path
  // aliases that only Bun resolves.
  if (
    message.includes("Cannot find module") ||
    message.includes("Cannot find package") ||
    message.includes("ERR_MODULE_NOT_FOUND")
  ) {
    return { failure: message, failure_class: "resolution" };
  }
  return { failure: message, failure_class: "other" };
}

const verdicts = [];

// --- socket side-effect check ---------------------------------------------
// The quarantined-socket question: does loading broker/ledger bind or
// create any socket path as a side effect? Inventory the runtime dir
// before and after imports.
const runtimeDir = mkdtempSync(join(tmpdir(), "phase0-prereqc-"));
const MADV_SOCKET_PATH = join(runtimeDir, "broker.sock");
process.env.MADV_RUNTIME_DIR = runtimeDir;
process.env.MADV_SOCKET_PATH = MADV_SOCKET_PATH;

// --- ledger (real entry point source) --------------------------------------
try {
  const ledger = await import(
    join(REPO_ROOT, "packages", "ledger", "src", "index.ts")
  );
  verdicts.push({
    entry: "packages/ledger/src/index.ts",
    loaded: true,
    runtime: RUNTIME,
  });
  void ledger;
} catch (error) {
  const { failure, failure_class } = classify(error);
  verdicts.push({
    entry: "packages/ledger/src/index.ts",
    loaded: false,
    failure,
    failure_class,
    runtime: RUNTIME,
  });
}

// --- broker (real entry point source) --------------------------------------
try {
  const broker = await import(
    join(REPO_ROOT, "packages", "broker", "src", "index.ts")
  );
  verdicts.push({
    entry: "packages/broker/src/index.ts",
    loaded: true,
    runtime: RUNTIME,
  });
  void broker;
} catch (error) {
  const { failure, failure_class } = classify(error);
  verdicts.push({
    entry: "packages/broker/src/index.ts",
    loaded: false,
    failure,
    failure_class,
    runtime: RUNTIME,
  });
}

// --- direct bun:sqlite dependency probe ------------------------------------
// The definitive Bun-dependency question, independent of the workspace
// resolution strategy: can Node 22 load the ledger's storage engine at all?
let bunSqliteLoadable = false;
let bunSqliteFailure = null;
try {
  await import("bun:sqlite");
  bunSqliteLoadable = true;
} catch (error) {
  bunSqliteFailure = error instanceof Error ? error.message : String(error);
}

// --- socket side-effect verdict --------------------------------------------
const socketSideEffects = [];
if (existsSync(MADV_SOCKET_PATH)) socketSideEffects.push(MADV_SOCKET_PATH);
if (existsSync(join(runtimeDir, "ipc.sock"))) socketSideEffects.push(join(runtimeDir, "ipc.sock"));

const verdict = {
  runtime: RUNTIME,
  exec_path: process.execPath,
  strip_types: process.execArgv.includes("--experimental-strip-types"),
  bun_detected: typeof globalThis.Bun !== "undefined",
  verdicts,
  bun_sqlite_loadable_by_node: bunSqliteLoadable,
  bun_sqlite_probe_failure: bunSqliteFailure,
  socket_side_effects: socketSideEffects,
};

process.stdout.write(`${JSON.stringify(verdict, null, 2)}\n`);

rmSync(runtimeDir, { recursive: true, force: true });
process.exit(0);