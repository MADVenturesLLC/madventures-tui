// packages/preflight/src/runner.ts
// The single execution choke point. Loads the check-command table from
// ../checks.json (data, validated here at load), runs each enabled check
// sequentially in deterministic order, captures logs, and assembles the
// report. This is the only module that turns check names into subprocess
// invocations, and it does so exclusively through spawn.ts's RunCommand —
// argv arrays, never shell strings, no user input in any argv (the one
// CLI-supplied element, the build-memory subject, passes
// isValidMemorySubject() before it is appended).

import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  aggregateTotals,
  buildClaimBoundarySection,
  CHECK_NAMES,
  computeExitCode,
  PREFLIGHT_CLAIM,
  PREFLIGHT_NOT_EVIDENCE_OF,
  renderHuman,
  type CheckName,
  type CheckResult,
  type PreflightReport,
  type ScanSourceFile,
} from "./index";
import {
  evalChaos,
  evalImports,
  evalMemory,
  evalTests,
  evalTypecheck,
  DEFAULT_MEMORY_SUBJECTS,
  isValidMemorySubject,
  renderImportHits,
} from "./checks";
import { spawnRunner, CommandStartError, CommandTimeoutError, type RunCommand } from "./spawn";

// ─── Config (../checks.json) ─────────────────────────────────────────────────

export class PreflightConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PreflightConfigError";
  }
}

type CheckCommandConfig = {
  cmd: string[];
  requires?: string;
  appends_subject?: boolean;
};

type CheckConfig = {
  checks: Partial<Record<CheckName, CheckCommandConfig>>;
};

const MAX_ARGV = 16;
const MAX_ARG_LEN = 512;

function validateCommand(cmd: unknown, owner: string): string[] {
  if (!Array.isArray(cmd) || cmd.length < 1 || cmd.length > MAX_ARGV) {
    throw new PreflightConfigError(`checks.json: ${owner}.cmd must be an array of 1..${MAX_ARGV} strings`);
  }
  for (const part of cmd) {
    if (typeof part !== "string" || part.length === 0 || part.length > MAX_ARG_LEN) {
      throw new PreflightConfigError(`checks.json: ${owner}.cmd elements must be non-empty strings <= ${MAX_ARG_LEN} chars`);
    }
  }
  return cmd;
}

/** Reads + validates the command table. Throws PreflightConfigError. */
export function loadCheckConfig(pkgDir: string): CheckConfig {
  const path = join(pkgDir, "checks.json");
  let raw: string;
  try {
    raw = readFileSync(path, "utf8");
  } catch {
    throw new PreflightConfigError(`cannot read ${path}`);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new PreflightConfigError(`checks.json is not valid JSON (${err instanceof Error ? err.message : String(err)})`);
  }
  if (parsed === null || typeof parsed !== "object") {
    throw new PreflightConfigError("checks.json: expected an object with a checks map");
  }
  const checksRaw = (parsed as Record<string, unknown>)["checks"];
  if (checksRaw === null || typeof checksRaw !== "object") {
    throw new PreflightConfigError("checks.json: expected a checks map");
  }
  const config: CheckConfig = { checks: {} };
  for (const [name, entryRaw] of Object.entries(checksRaw as Record<string, unknown>)) {
    if (!(CHECK_NAMES as readonly string[]).includes(name)) {
      throw new PreflightConfigError(`checks.json: unknown check name "${name}"`);
    }
    if (entryRaw === null || typeof entryRaw !== "object") {
      throw new PreflightConfigError(`checks.json: "${name}" must be an object`);
    }
    const entry = entryRaw as Record<string, unknown>;
    const cmd = validateCommand(entry["cmd"], name);
    const cfgEntry: CheckCommandConfig = { cmd };
    const requires = entry["requires"];
    if (requires !== undefined) {
      if (typeof requires !== "string" || requires.length === 0) {
        throw new PreflightConfigError(`checks.json: "${name}".requires must be a non-empty string`);
      }
      cfgEntry.requires = requires;
    }
    if (entry["appends_subject"] === true) cfgEntry.appends_subject = true;
    config.checks[name as CheckName] = cfgEntry;
  }
  return config;
}

// ─── Source collection for the imports check ─────────────────────────────────

const SCAN_EXTENSIONS = new Set([".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs"]);
// Production source only. Test files may legitimately import governed
// packages (broker's own tests exercise the pty-host boundary; madbridge
// tests exercise broker); the denylist guards the commission's "production
// paths", not boundary tests.
const SCAN_ROOTS: readonly [string, string][] = [
  ["packages", "src"],
  ["apps", "src"],
];

function collectSourceFiles(repoRoot: string, dir: string, out: ScanSourceFile[]): void {
  const abs = join(repoRoot, dir);
  let entries;
  try {
    entries = readdirSync(abs, { withFileTypes: true });
  } catch {
    return; // absent tree (e.g. no apps/*/test on a given base) — nothing to scan
  }
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === "dist" || entry.name === "out") continue;
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      collectSourceFiles(repoRoot, rel, out);
      continue;
    }
    if (!entry.isFile()) continue;
    const dot = entry.name.lastIndexOf(".");
    if (dot === -1) continue;
    if (!SCAN_EXTENSIONS.has(entry.name.slice(dot))) continue;
    try {
      if (!statSync(join(abs, entry.name)).isFile()) continue;
      out.push({ path: rel, content: readFileSync(join(abs, entry.name), "utf8") });
    } catch {
      // unreadable file — leave it to the typecheck/tests to surface
    }
  }
}

function collectScanScope(repoRoot: string): ScanSourceFile[] {
  const files: ScanSourceFile[] = [];
  for (const [top, leaf] of SCAN_ROOTS) {
    const topLevel = join(repoRoot, top);
    if (!existsSync(topLevel)) continue;
    for (const pkg of readdirSync(topLevel, { withFileTypes: true })) {
      if (!pkg.isDirectory()) continue;
      collectSourceFiles(repoRoot, `${top}/${pkg.name}/${leaf}`, files);
    }
  }
  return files;
}

// ─── Orchestration ───────────────────────────────────────────────────────────

export type PreflightRunOptions = {
  repoRoot: string;
  /** Subset of checks to run; omitted = all, in deterministic order. */
  only?: readonly CheckName[];
  /** Stop at the first FAIL (tooling or plain). Default: run all, aggregate. */
  bail?: boolean;
  /** build-memory subjects. Empty/omitted → memory check SKIPs. */
  subjects?: readonly string[];
  /** Path prefixes excluded from the forbidden-import scan. */
  importAllowlist?: readonly string[];
  /** Override the spawner (tests inject fakes). Default: spawnRunner(). */
  runCommand?: RunCommand;
  /** Write per-check logs + report files. Default true. */
  artifacts?: boolean;
  /** Override the run id (tests). Default: timestamp + 4 hex chars. */
  runId?: string;
  /** Clock for durations (tests). Default: Date.now. */
  clock?: () => number;
  /** @mad/claim-boundary module (or a test double) for the honesty section. */
  claimBoundaryModule?: unknown;
};

export const PREFLIGHT_GLOSS =
  "local preflight run on the builder machine; catches obvious breaks before push. Claims nothing beyond this machine and this moment.";

function toolingFail(name: CheckName, ms: number, message: string, code: string): CheckResult {
  return { name, status: "FAIL", ms, summary: message, tooling: true, code };
}

function toTooling(name: CheckName, ms: number, err: unknown): CheckResult {
  if (err instanceof CommandTimeoutError) return toolingFail(name, ms, err.message, "TOOLING_TIMEOUT");
  if (err instanceof CommandStartError) return toolingFail(name, ms, err.message, "TOOLING_START");
  return toolingFail(name, ms, `preflight tooling error: ${err instanceof Error ? err.message : String(err)}`, "TOOLING_ERROR");
}

function makeRunId(): string {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return `${stamp}-${randomUUID().slice(0, 4)}`;
}

function requiredCmd(cfg: CheckConfig, name: CheckName): CheckCommandConfig | null {
  return cfg.checks[name] ?? null;
}

export async function runPreflight(opts: PreflightRunOptions): Promise<PreflightReport> {
  const clock = opts.clock ?? Date.now;
  const startedAt = new Date().toISOString();
  const wallStart = clock();

  if (!existsSync(join(opts.repoRoot, "package.json"))) {
    throw new PreflightConfigError(`no package.json at repo root: ${opts.repoRoot} (pass --cwd)`);
  }
  const cfg = loadCheckConfig(join(import.meta.dir, ".."));
  const runCommand = opts.runCommand ?? spawnRunner();
  const artifacts = opts.artifacts ?? true;
  const runId = opts.runId ?? makeRunId();
  const artifactDir = join(opts.repoRoot, ".mad", "preflight", runId);
  if (artifacts) {
    mkdirSync(artifactDir, { recursive: true });
  }

  const only = opts.only;
  const selected: readonly CheckName[] =
    only !== undefined && only.length > 0
      ? CHECK_NAMES.filter((n) => only.includes(n))
      : CHECK_NAMES;

  const writeLog = (
    name: CheckName,
    header: readonly string[],
    body: string,
    stderr: string,
    exit: number | null,
  ): string => {
    const rel = join(".mad", "preflight", runId, `${name}.log`);
    const text = [...header, `# exit: ${exit === null ? "killed" : String(exit)}`, "", body, "--- stderr ---", stderr].join("\n");
    if (artifacts) writeFileSync(join(artifactDir, `${name}.log`), text);
    return rel;
  };

  /** Spawns via the injected runner and turns every throw into a tooling FAIL. */
  const runCheck = async (
    name: CheckName,
    cmd: readonly string[],
    evalResult: (outcome: Awaited<ReturnType<RunCommand>>) => CheckResult,
  ): Promise<CheckResult> => {
    const t0 = clock();
    try {
      const outcome = await runCommand(cmd, opts.repoRoot);
      const rel = writeLog(
        name,
        [`# cmd: ${cmd.join(" ")}`, `# cwd: ${opts.repoRoot}`],
        outcome.stdout,
        outcome.stderr,
        outcome.exit_code,
      );
      const base = evalResult(outcome);
      return base.status === "SKIP" ? base : { ...base, evidence: rel };
    } catch (err) {
      return toTooling(name, clock() - t0, err);
    }
  };

  const results: CheckResult[] = [];

  for (const name of selected) {
    let result: CheckResult;

    if (name === "tsc") {
      const entry = requiredCmd(cfg, "tsc");
      result =
        entry === null
          ? toolingFail(name, 0, "checks.json has no tsc entry", "TOOLING_CONFIG")
          : await runCheck(name, entry.cmd, evalTypecheck);
    } else if (name === "test") {
      const entry = requiredCmd(cfg, "test");
      result =
        entry === null
          ? toolingFail(name, 0, "checks.json has no test entry", "TOOLING_CONFIG")
          : await runCheck(name, entry.cmd, evalTests);
    } else if (name === "tui-chaos") {
      const entry = requiredCmd(cfg, "tui-chaos");
      if (entry === null) {
        result = toolingFail(name, 0, "checks.json has no tui-chaos entry", "TOOLING_CONFIG");
      } else if (entry.requires !== undefined && !existsSync(join(opts.repoRoot, entry.requires))) {
        result = evalChaos(null);
      } else {
        result = await runCheck(name, entry.cmd, evalChaos);
      }
    } else if (name === "imports") {
      const t0 = clock();
      try {
        const files = collectScanScope(opts.repoRoot);
        const { result: base, hits } = evalImports(files, opts.importAllowlist ?? []);
        let evidence: string | undefined;
        if (hits.length > 0) {
          evidence = writeLog(name, ["# forbidden-import scan"], renderImportHits(hits), "", 1);
        }
        result = evidence !== undefined ? { ...base, evidence } : base;
      } catch (err) {
        result = toTooling(name, clock() - t0, err);
      }
    } else if (name === "memory") {
      const entry = requiredCmd(cfg, "memory");
      if (entry === null) {
        result = toolingFail(name, 0, "checks.json has no memory entry", "TOOLING_CONFIG");
      } else {
        const present = entry.requires !== undefined && existsSync(join(opts.repoRoot, entry.requires));
        // --subjects overrides; absent flag → the spine defaults (see checks.ts)
        const subjects =
          opts.subjects !== undefined && opts.subjects.length > 0 ? opts.subjects : DEFAULT_MEMORY_SUBJECTS;
        // The memory CLI evaluates against its default store .mad/build-memory.json
        // in the repo root; nothing bound yet → honest SKIP, never a guess.
        const storePresent = existsSync(join(opts.repoRoot, ".mad", "build-memory.json"));
        if (!present) {
          result = evalMemory(false, storePresent, [], null);
        } else if (subjects.some((s) => !isValidMemorySubject(s))) {
          // never append a non-conforming subject to an argv — let the
          // evaluator fail the check with MEMORY_SUBJECT_INVALID
          result = evalMemory(true, storePresent, subjects, null);
        } else if (!storePresent) {
          result = evalMemory(true, false, subjects, null);
        } else {
          const t0 = clock();
          try {
            const outcomes: { subject: string; outcome: Awaited<ReturnType<RunCommand>> }[] = [];
            for (const subject of subjects) {
              const cmd = [...entry.cmd, subject];
              const outcome = await runCommand(cmd, opts.repoRoot);
              outcomes.push({ subject, outcome });
            }
            const last = outcomes[outcomes.length - 1];
            const rel = writeLog(
              name,
              [`# per-subject status runs (subjects: ${subjects.join(", ")})`, `# cwd: ${opts.repoRoot}`],
              last?.outcome.stdout ?? "",
              last?.outcome.stderr ?? "",
              last?.outcome.exit_code ?? null,
            );
            const base = evalMemory(true, true, subjects, outcomes);
            result = base.status === "SKIP" ? base : { ...base, evidence: rel };
          } catch (err) {
            result = toTooling(name, clock() - t0, err);
          }
        }
      }
    } else {
      result = toolingFail(name, 0, `unroutable check name: ${name}`, "TOOLING_CONFIG");
    }

    results.push(result);
    if (opts.bail === true && result.status === "FAIL") break;
  }

  const wallClockMs = clock() - wallStart;
  const report: PreflightReport = {
    claim: PREFLIGHT_CLAIM,
    not_evidence_of: [...PREFLIGHT_NOT_EVIDENCE_OF],
    claim_boundary: buildClaimBoundarySection(opts.claimBoundaryModule, PREFLIGHT_GLOSS),
    run_id: runId,
    repo_root: opts.repoRoot,
    checks: results,
    totals: aggregateTotals(results),
    wall_clock_ms: wallClockMs,
    started_at: startedAt,
    ended_at: new Date().toISOString(),
    exit_code: computeExitCode(results),
  };

  if (artifacts) {
    writeFileSync(join(artifactDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
    writeFileSync(join(artifactDir, "report.txt"), `${renderHuman(report)}\n`);
  }
  return report;
}
