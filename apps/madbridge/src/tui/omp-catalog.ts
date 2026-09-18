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
  const bin = options?.bin ?? "omp";
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
      reason: "unparseable omp output (" + detail + ")",
    };
  }
}

function describeSpawnError(err: unknown, bin: string, timeoutMs: number): string {
  const errno = err as { code?: string; killed?: boolean; message?: string };
  if (errno?.code === "ENOENT") {
    return "omp not found on PATH (looked for: " + bin + ")";
  }
  if (errno?.killed) {
    return "omp timed out after " + String(timeoutMs) + "ms";
  }
  const message = errno?.message ?? String(err);
  return "omp failed: " + truncateReason(message);
}

function truncateReason(message: string): string {
  return message.length > 160 ? message.slice(0, 157) + "…" : message;
}
