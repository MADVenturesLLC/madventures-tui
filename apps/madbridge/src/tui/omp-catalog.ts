// apps/madbridge/src/tui/omp-catalog.ts
// OMP model catalog — LOCAL UI data source for the ModelBar/ModelPicker.
//
// v0 contract (Founder commission GLM-20260918-FOUNDER-TUI-SEATS): the
// catalog is read by shelling out to OMP's public CLI (`omp models ls
// --json`, verified against omp v18.2.4). OMP internals are NOT imported.
//
// Every failure is honest: the caller receives an explicit unavailable
// reason ("omp not found on PATH", "timed out", "unparseable output") and
// the UI must render that reason — never a fabricated model list.

import { existsSync } from "node:fs";
import { homedir } from "node:os";
import type { SeatCatalogState } from "./hooks/useSeatState";

export interface OmpModelInfo {
  /** Fully qualified selector, e.g. "alibaba-token-plan/glm-5.2". */
  readonly selector: string;
  /** Human model name, e.g. "GLM-5.2". */
  readonly name: string;
  /** Provider id, e.g. "alibaba-token-plan". */
  readonly provider: string;
}

/**
 * Resolve the omp binary. PATH alone is not trustworthy inside a `bun run`
 * process: bun prepends every ancestor node_modules/.bin directory to PATH,
 * including a stray $HOME/node_modules/.bin — whose omp shim (pnpm
 * pi-coding-agent 18.1.10) execs a Mach-O binary named cli.js that bun
 * cannot parse ("Unexpected …"). Resolution order:
 *   1. MAD_OMP_BIN env override
 *   2. ~/.bun/bin/omp (the bun-installed omp)
 *   3. plain "omp" (PATH)
 */
export function resolveOmpBin(): string {
  if (process.env.MAD_OMP_BIN) return process.env.MAD_OMP_BIN;
  const bunInstalled = homedir() + "/.bun/bin/omp";
  if (existsSync(bunInstalled)) return bunInstalled;
  return "omp";
}

/**
 * Frozen argv table — the ONLY command this module will ever execute.
 * Verified against `omp models --help` (omp v18.2.4): `models ls --json`
 * lists the catalog as JSON.
 */
const OMP_CATALOG_COMMAND: readonly string[] = Object.freeze([
  "models",
  "ls",
  "--json",
]);

const DEFAULT_TIMEOUT_MS = 5000;
const MAX_STDOUT_BYTES = 8 * 1024 * 1024;

/**
 * Parse the stdout of `omp models ls --json` into model entries.
 * Throws on any shape deviation — the caller maps the throw to an honest
 * "unparseable output" reason instead of guessing a partial catalog.
 */
export function parseOmpModelsJson(text: string): readonly OmpModelInfo[] {
  const parsed: unknown = JSON.parse(text);
  if (typeof parsed !== "object" || parsed === null) {
    throw new Error("catalog root is not an object");
  }
  const models = (parsed as { models?: unknown }).models;
  if (!Array.isArray(models)) {
    throw new Error("catalog is missing a models array");
  }
  return models.map((entry) => {
    if (typeof entry !== "object" || entry === null) {
      throw new Error("model entry is not an object");
    }
    const rec = entry as Record<string, unknown>;
    if (typeof rec.selector !== "string" || rec.selector.length === 0) {
      throw new Error("model entry is missing a selector");
    }
    if (typeof rec.name !== "string" || typeof rec.provider !== "string") {
      throw new Error("model entry is missing name/provider");
    }
    return {
      selector: rec.selector,
      name: rec.name,
      provider: rec.provider,
    };
  });
}

/**
 * Load the OMP model catalog by running the public CLI.
 * Never throws — every failure maps to an explicit unavailable reason.
 */
export async function loadOmpCatalog(
  options?: { bin?: string; timeoutMs?: number },
): Promise<Extract<SeatCatalogState, { status: "ok" | "unavailable" }>> {
  // Deterministic-mode seam (used by the tui-chaos harness): the probe is
  // environment-dependent, so harness runs disable it explicitly and the
  // bars render the reason — golden grids stay identical on every machine.
  if (process.env.MAD_TUI_CATALOG === "off") {
    return { status: "unavailable", reason: "catalog disabled (MAD_TUI_CATALOG=off)" };
  }

  const bin = options?.bin ?? resolveOmpBin();
  const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  let stdout: string;
  try {
    const { execFile } = await import("node:child_process");
    const { promisify } = await import("node:util");
    const run = promisify(execFile);
    const result = await run(bin, [...OMP_CATALOG_COMMAND], {
      timeout: timeoutMs,
      maxBuffer: MAX_STDOUT_BYTES,
    });
    stdout = result.stdout;
  } catch (err) {
    return { status: "unavailable", reason: describeSpawnError(err, bin, timeoutMs) };
  }

  try {
    return { status: "ok", models: parseOmpModelsJson(stdout) };
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    return {
      status: "unavailable",
      reason: "unparseable omp output (" + sanitizeReason(detail) + ")",
    };
  }
}

function describeSpawnError(err: unknown, bin: string, timeoutMs: number): string {
  const errno = err as { code?: string; killed?: boolean; message?: string };
  if (errno?.code === "ENOENT") {
    return "omp not found (looked for: " + bin + ")";
  }
  if (errno?.killed) {
    return "omp timed out after " + String(timeoutMs) + "ms";
  }
  const message = errno?.message ?? String(err);
  return "omp failed: " + sanitizeReason(message);
}

/**
 * Collapse a failure reason to ONE line for single-row rendering: execFile
 * embeds the child's multi-line stderr in err.message, and a newline inside
 * a ModelBar/picker string corrupts the fixed row layout.
 */
export function sanitizeReason(message: string): string {
  const collapsed = message.replace(/\s+/g, " ").trim();
  return collapsed.length > 160 ? collapsed.slice(0, 157) + "…" : collapsed;
}
