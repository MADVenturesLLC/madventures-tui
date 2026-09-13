// packages/preflight/src/index.ts
// @mad/preflight — pure core. Types, constants, aggregation, exit codes,
// forbidden-import scanning, and report rendering. No fs, no spawn, no
// process side effects live here; src/checks.ts + src/runner.ts are the IO
// layer and src/cli.ts is the entrypoint.
//
// What this is NOT (binding, per commission GLM-20260912-MAD-PREFLIGHT-V0):
// not Phase 0, not an occupancy proof, not Gateway honesty, not a merge
// authority. It is a local fail-on-machine-before-push bug catcher. Exit
// nonzero on any failed check; a silent pass is not a feature.

// ─── Honesty constants ──────────────────────────────────────────────────────

/** The only claim a preflight receipt makes. Ever. */
export const PREFLIGHT_CLAIM = "PREFLIGHT_LOCAL_V0";

/**
 * v0 honesty strings, hardcoded per commission. These sit OUTSIDE
 * @mad/claim-boundary's closed rung vocabulary (preparation..merge); they are
 * a prose boundary, not a rung-derived one. The rung-derived boundary rides
 * alongside in the report's `claim_boundary` field when the module is
 * resolvable (it is, on base main) — see README.
 */
export const PREFLIGHT_NOT_EVIDENCE_OF = [
  "PHASE_0",
  "OCCUPANCY_PROOF",
  "GATEWAY_HONESTY",
  "ROOM_RUNTIME",
] as const;

// ─── Check vocabulary ────────────────────────────────────────────────────────

/** Deterministic check order. Declaration order IS run order. Do not reorder. */
export const CHECK_NAMES = ["tsc", "test", "tui-chaos", "imports", "memory"] as const;

export type CheckName = (typeof CHECK_NAMES)[number];

export const CHECK_STATUSES = ["PASS", "FAIL", "SKIP"] as const;

export type CheckStatus = (typeof CHECK_STATUSES)[number];

export type CheckResult = {
  name: CheckName;
  status: CheckStatus;
  ms: number;
  /** Human one-liner. Evidence paths and skipped reasons are separate fields. */
  summary: string;
  /** Underlying command exit code, when a command actually ran. */
  exit_code?: number;
  /** Structured failure family, e.g. MEMORY_STALE, FORBIDDEN_IMPORT. */
  code?: string;
  /** True when the check could not start (spawn/config failure). Drives exit 2. */
  tooling?: boolean;
  /** Why a check was skipped. Required for SKIP; absent for PASS/FAIL. */
  reason?: string;
  /** Relative path to the captured evidence log, e.g. <run-id>/tsc.log. */
  evidence?: string;
};

export type PreflightTotals = {
  pass: number;
  fail: number;
  skip: number;
};

export type ClaimBoundarySection = {
  rung: string;
  not_evidence_of: string[];
  gloss?: string;
};

export type PreflightReport = {
  claim: string;
  not_evidence_of: string[];
  /** Rung-derived boundary via @mad/claim-boundary; null if unresolvable. */
  claim_boundary: ClaimBoundarySection | null;
  run_id: string;
  repo_root: string;
  checks: CheckResult[];
  totals: PreflightTotals;
  wall_clock_ms: number;
  started_at: string;
  ended_at: string;
  exit_code: 0 | 1 | 2;
};

// ─── Aggregation & exit codes ────────────────────────────────────────────────

export function aggregateTotals(results: readonly CheckResult[]): PreflightTotals {
  let pass = 0;
  let fail = 0;
  let skip = 0;
  for (const r of results) {
    if (r.status === "PASS") pass += 1;
    else if (r.status === "FAIL") fail += 1;
    else skip += 1;
  }
  return { pass, fail, skip };
}

/**
 * 0 = all enabled checks passed (SKIPs allowed). 1 = one or more failures.
 * 2 = preflight tooling error: at least one check could not start. A tooling
 * error dominates a plain failure — the operator must see that the gate
 * itself was broken, not merely that code failed.
 */
export function computeExitCode(results: readonly CheckResult[]): 0 | 1 | 2 {
  let sawFail = false;
  let sawTooling = false;
  for (const r of results) {
    if (r.status !== "FAIL") continue;
    if (r.tooling === true) sawTooling = true;
    else sawFail = true;
  }
  if (sawTooling) return 2;
  if (sawFail) return 1;
  return 0;
}

// ─── Forbidden-import scanning ───────────────────────────────────────────────

/**
 * Denylist, encoded from repo conventions + the commission's blast radius.
 * The first five are lifted verbatim from claim-boundary's own purity test
 * ("source never imports governance infrastructure") — that test is the
 * repo's existing convention for what must never be imported. The sixth,
 * `room-runtime-worker`, covers the Room Runtime stack the commission
 * forbids (it has no package name today, so the path fragment is the only
 * stable specifier to deny).
 */
export const FORBIDDEN_SPECIFIERS = [
  "@madventures/broker",
  "@madventures/pty-host",
  "@madventures/adapter-claude-code",
  "@madventures/adapter-antigravity",
  "gateway-daemon",
  "room-runtime-worker",
] as const;

/**
 * Statement-leading import/export-from/require specifiers only — NOT prose.
 * Same regex claim-boundary's purity test uses: its own docs name the
 * infrastructure it refuses to import, so prose must never match.
 */
export const IMPORT_PATTERN =
  /^\s*(?:import\s+[^'"]*from\s+|import\s+|require\(\s*|export\s+[^'"]*from\s+)["']([^"']+)["']/gm;

export type ForbiddenImportHit = {
  path: string;
  specifier: string;
  denied: string;
  line: number;
};

export type ScanSourceFile = {
  path: string;
  content: string;
};

/**
 * Files whose paths start with any allowlist prefix are skipped entirely.
 * Matching is prefix-on-posix-path (e.g. "packages/broker/src/").
 */
export function isAllowlisted(path: string, allowlist: readonly string[]): boolean {
  return allowlist.some((prefix) => prefix !== "" && path.startsWith(prefix));
}

export function findForbiddenImports(
  files: readonly ScanSourceFile[],
  opts?: { denylist?: readonly string[]; allowlist?: readonly string[] },
): ForbiddenImportHit[] {
  const denylist = opts?.denylist ?? FORBIDDEN_SPECIFIERS;
  const allowlist = opts?.allowlist ?? [];
  const hits: ForbiddenImportHit[] = [];
  for (const file of files) {
    if (isAllowlisted(file.path, allowlist)) continue;
    for (const match of file.content.matchAll(IMPORT_PATTERN)) {
      const specifier = match[1];
      if (specifier === undefined) continue;
      const denied = denylist.find((d) => specifier.includes(d));
      if (denied !== undefined) {
        const before = file.content.slice(0, match.index ?? 0);
        hits.push({
          path: file.path,
          specifier,
          denied,
          line: before.split("\n").length,
        });
      }
    }
  }
  return hits;
}

// ─── Honesty section ─────────────────────────────────────────────────────────

type ClaimBoundaryModule = {
  makeClaimBoundary: (rung: string, gloss?: string) => {
    rung: string;
    not_evidence_of: string[];
    gloss?: string;
  };
};

/**
 * Rung "executed": a local preflight run evidences that checks executed on
 * this machine — nothing above the executed rung. Uses @mad/claim-boundary
 * when resolvable (present on base main); degrades to null otherwise, in
 * which case the hardcoded v0 strings above remain the report's boundary.
 */
export function buildClaimBoundarySection(
  module: unknown,
  gloss: string,
): ClaimBoundarySection | null {
  if (module === null || typeof module !== "object") return null;
  const candidate = module as Partial<ClaimBoundaryModule>;
  if (typeof candidate.makeClaimBoundary !== "function") return null;
  try {
    const boundary = candidate.makeClaimBoundary("executed", gloss);
    return {
      rung: boundary.rung,
      not_evidence_of: [...boundary.not_evidence_of],
      ...(boundary.gloss !== undefined ? { gloss: boundary.gloss } : {}),
    };
  } catch {
    return null;
  }
}

// ─── Rendering ───────────────────────────────────────────────────────────────

function statusGlyph(status: CheckStatus): string {
  if (status === "PASS") return "PASS";
  if (status === "FAIL") return "FAIL";
  return "SKIP";
}

export function renderHuman(report: PreflightReport): string {
  const lines: string[] = [];
  lines.push(`mad preflight — run ${report.run_id}`);
  lines.push(`repo: ${report.repo_root}`);
  for (const r of report.checks) {
    const name = r.name.padEnd(10, " ");
    const glyph = statusGlyph(r.status).padEnd(4, " ");
    const ms = `${r.ms}ms`.padStart(9, " ");
    let detail = r.summary;
    if (r.status === "SKIP" && r.reason !== undefined) detail = `skipped — ${r.reason}`;
    if (r.evidence !== undefined) detail = `${detail} [${r.evidence}]`;
    lines.push(`  ${name} ${glyph} ${ms}  ${detail}`);
  }
  lines.push(
    `totals: ${report.totals.pass} pass, ${report.totals.fail} fail, ${report.totals.skip} skip — wall ${(report.wall_clock_ms / 1000).toFixed(1)}s`,
  );
  lines.push(
    `claim: ${report.claim} (not evidence of: ${report.not_evidence_of.join(", ")})`,
  );
  return lines.join("\n");
}

/** Single-line machine summary. Compose as the LAST stdout line. */
export function renderJson(report: PreflightReport): string {
  return JSON.stringify({
    claim: report.claim,
    not_evidence_of: report.not_evidence_of,
    claim_boundary: report.claim_boundary,
    run_id: report.run_id,
    repo_root: report.repo_root,
    checks: report.checks,
    totals: report.totals,
    wall_clock_ms: report.wall_clock_ms,
    started_at: report.started_at,
    ended_at: report.ended_at,
    exit_code: report.exit_code,
  });
}
