// packages/preflight/src/checks.ts
// The five v0 checks, in the commission's deterministic order — as PURE
// evaluators. This module executes nothing and contains no command text:
// the argv table lives in ../checks.json (data, validated at load by the
// orchestrator), and all process spawning lives in src/spawn.ts behind the
// single execution choke point (src/runner.ts). Commands are always argv
// arrays handed to the spawner; a shell is never invoked.
//
// Tests call the evaluators directly with synthetic outcomes — no spawning
// in tests, and no test depends on the builder machine's toolchain.

import {
  findForbiddenImports,
  FORBIDDEN_SPECIFIERS,
  type CheckResult,
  type ForbiddenImportHit,
  type ScanSourceFile,
} from "./index";

// ─── Executor-side input type ────────────────────────────────────────────────

/** Shape the spawner produces; mirrors spawn.CommandOutcome without importing it. */
export type CommandOutcomeLike = {
  exit_code: number;
  stdout: string;
  stderr: string;
  duration_ms: number;
};

// ─── Shared helpers ──────────────────────────────────────────────────────────

function firstLines(text: string, max: number): string {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  if (lines.length === 0) return "";
  return lines.slice(0, max).join(" | ");
}

/** Pulls the "N pass / R fail / S skip" tail the repo's test runner prints. */
export function parseSuiteCounts(stdout: string): { pass: number; fail: number } | null {
  const passMatch = stdout.match(/(\d+)\s+pass/);
  const failMatch = stdout.match(/(\d+)\s+fail/);
  if (passMatch === null || failMatch === null) return null;
  return { pass: Number(passMatch[1]), fail: Number(failMatch[1]) };
}

/**
 * Default build-memory subjects, applied automatically when the memory gate
 * is enabled (packages/build-memory resolvable) and --subjects is absent.
 * These are the projector spine subjects — the same set the projector's
 * spine room displays — so `bun run preflight` exercises the memory gate
 * for shipped spine packages with no extra flags. --subjects always
 * overrides. Subjects without a record evaluate UNKNOWN by the library's
 * contract and FAIL the gate (MEMORY_STALE) — preflight never invents
 * VALID/SHIP for them.
 */
export const DEFAULT_MEMORY_SUBJECTS: readonly string[] = [
  "@mad/build-memory",
  "@mad/single-verdict",
  "apps/projector-mc",
];

/**
 * The one CLI-supplied value that can reach a subprocess argv is the
 * build-memory subject. This gate confines it to a strict charset with no
 * leading dash, so it can neither carry metacharacters (moot — no shell —
 * but defense in depth) nor be mistaken for a CLI flag. Scoped package
 * names start with "@" (e.g. @mad/build-memory).
 */
export function isValidMemorySubject(subject: string): boolean {
  return /^[A-Za-z0-9@][A-Za-z0-9._@/-]{0,127}$/.test(subject);
}

// ─── 1. typecheck ────────────────────────────────────────────────────────────

/**
 * The typed source of truth is the repo's own verify-backbone typecheck
 * (checks.json → checks.tsc.cmd). Preflight runs exactly that — no weaker
 * second typecheck.
 */
export function evalTypecheck(outcome: CommandOutcomeLike): CheckResult {
  if (outcome.exit_code === 0) {
    return {
      name: "tsc",
      status: "PASS",
      ms: outcome.duration_ms,
      summary: "typecheck clean",
      exit_code: 0,
    };
  }
  return {
    name: "tsc",
    status: "FAIL",
    ms: outcome.duration_ms,
    summary: `typecheck failed — ${firstLines(outcome.stdout || outcome.stderr, 3)}`,
    exit_code: outcome.exit_code,
    code: "TSC_ERRORS",
  };
}

// ─── 2. unit tests ───────────────────────────────────────────────────────────

/**
 * The full suite at the repo root (checks.json → checks.test.cmd) — same
 * backbone as the repo's verify script. This subsumes the commission's
 * default package floor (tui-chaos, claim-boundary on base main) and is
 * honest about the whole tree rather than only "changed" packages: a
 * protocol change can break broker tests without protocol's own tests
 * failing. Scoping was rejected for v0; see README.
 */
export function evalTests(outcome: CommandOutcomeLike): CheckResult {
  const counts = parseSuiteCounts(outcome.stdout);
  const countsText = counts !== null ? `${counts.pass} pass, ${counts.fail} fail` : "see log";
  if (outcome.exit_code === 0) {
    return { name: "test", status: "PASS", ms: outcome.duration_ms, summary: `suite green: ${countsText}`, exit_code: 0 };
  }
  return {
    name: "test",
    status: "FAIL",
    ms: outcome.duration_ms,
    summary: `unit tests failed (${countsText}) — ${firstLines(outcome.stderr || outcome.stdout, 2)}`,
    exit_code: outcome.exit_code,
    code: "TEST_FAILURES",
  };
}

// ─── 3. tui-chaos ────────────────────────────────────────────────────────────

/**
 * Reuses tui-chaos's supported entry verbatim (checks.json) — preflight
 * does not rewrite tui-chaos. Missing on base → SKIP with reason: never a
 * fail, never a silent drop.
 */
export function evalChaos(outcome: CommandOutcomeLike | null): CheckResult {
  if (outcome === null) {
    return {
      name: "tui-chaos",
      status: "SKIP",
      ms: 0,
      summary: "tui-chaos not present",
      reason: "packages/tui-chaos does not exist on this base",
    };
  }
  if (outcome.exit_code === 0) {
    return { name: "tui-chaos", status: "PASS", ms: outcome.duration_ms, summary: "tui-chaos scenarios passed (REP-v1-tui)", exit_code: 0 };
  }
  return {
    name: "tui-chaos",
    status: "FAIL",
    ms: outcome.duration_ms,
    summary: `tui-chaos failed (exit ${outcome.exit_code}) — ${firstLines(outcome.stdout || outcome.stderr, 2)}`,
    exit_code: outcome.exit_code,
    code: "CHAOS_FAIL",
  };
}

// ─── 4. imports ──────────────────────────────────────────────────────────────

/**
 * Pure import scan. The orchestrator gathers source files under
 * packages/[pkg]/src and apps/[app]/src (production source only). Prose
 * mentions never match — the pattern matches
 * statement-leading imports only (repo convention from claim-boundary's
 * purity test).
 */
export function evalImports(
  files: readonly ScanSourceFile[],
  allowlist: readonly string[],
): { result: CheckResult; hits: ForbiddenImportHit[] } {
  const hits = findForbiddenImports(files, { allowlist });
  if (hits.length === 0) {
    return {
      result: {
        name: "imports",
        status: "PASS",
        ms: 0,
        summary: `no forbidden imports (denylist: ${FORBIDDEN_SPECIFIERS.length} patterns, files scanned: ${files.length})`,
      },
      hits: [],
    };
  }
  const shown = hits.slice(0, 5).map((h) => `${h.path}:${h.line} imports ${h.specifier}`);
  return {
    result: {
      name: "imports",
      status: "FAIL",
      ms: 0,
      summary: `${hits.length} forbidden import(s) — ${shown.join("; ")}${hits.length > shown.length ? ` (+${hits.length - shown.length} more in log)` : ""}`,
      code: "FORBIDDEN_IMPORT",
    },
    hits,
  };
}

/** The orchestrator renders hits into the evidence log with this. */
export function renderImportHits(
  hits: readonly { path: string; specifier: string; denied: string; line: number }[],
): string {
  return (
    hits
      .map((h) => `${h.path}:${h.line}: import "${h.specifier}" matches denylist "${h.denied}"`)
      .join("\n") + "\n"
  );
}

// ─── 5. memory ───────────────────────────────────────────────────────────────

export type MemorySubjectOutcome = {
  subject: string;
  outcome: CommandOutcomeLike;
};

/**
 * Optional build-memory gate. ON by default for the spine subjects when
 * @mad/build-memory is resolvable on the base (--subjects overrides the
 * list). Semantics, per the library contract — nothing invented:
 *   - packages/build-memory absent            → SKIP with explicit reason
 *   - no subjects at all                      → SKIP with explicit reason
 *   - invalid subject charset                 → FAIL (MEMORY_SUBJECT_INVALID)
 *   - store absent (.mad/build-memory.json)   → SKIP "nothing bound yet"
 *   - subject with no record                  → library says UNKNOWN → FAIL
 *                                               (MEMORY_STALE) — never VALID
 *   - STALE / UNKNOWN / INVALIDATED           → FAIL (MEMORY_STALE)
 * Exit 1 from the memory CLI means "not VALID"; exit 2 is a contract error.
 */
export function evalMemory(
  presentOnBase: boolean,
  storePresent: boolean,
  subjects: readonly string[],
  subjectOutcomes: readonly MemorySubjectOutcome[] | null,
): CheckResult {
  if (!presentOnBase) {
    return {
      name: "memory",
      status: "SKIP",
      ms: 0,
      summary: "@mad/build-memory not resolvable on base",
      reason: "packages/build-memory does not exist on this base",
    };
  }
  if (subjects.length === 0) {
    return {
      name: "memory",
      status: "SKIP",
      ms: 0,
      summary: "no memory subjects configured",
      reason: "pass --subjects <a,b,c> to gate on build-memory records",
    };
  }
  const invalid = subjects.filter((s) => !isValidMemorySubject(s));
  if (invalid.length > 0) {
    return {
      name: "memory",
      status: "FAIL",
      ms: 0,
      summary: "invalid memory subject (allowed: [A-Za-z0-9@] start, then [A-Za-z0-9._@/-], max 128)",
      code: "MEMORY_SUBJECT_INVALID",
    };
  }
  if (!storePresent) {
    return {
      name: "memory",
      status: "SKIP",
      ms: 0,
      summary: "no memory store bound yet",
      reason: ".mad/build-memory.json does not exist — bind subjects first (mad-build-memory record …) or pass --subjects with an existing store",
    };
  }
  const failures: string[] = [];
  let ms = 0;
  for (const { subject, outcome } of subjectOutcomes ?? []) {
    ms += outcome.duration_ms;
    if (outcome.exit_code === 0) continue;
    if (outcome.exit_code === 1) {
      const statusWord = firstLines(outcome.stderr || outcome.stdout, 1) || "not VALID";
      failures.push(`${subject}: ${statusWord}`);
    } else {
      failures.push(`${subject}: contract/usage error (exit ${outcome.exit_code})`);
    }
  }
  if (failures.length === 0) {
    return { name: "memory", status: "PASS", ms, summary: `memory VALID for: ${subjects.join(", ")}` };
  }
  return {
    name: "memory",
    status: "FAIL",
    ms,
    summary: `memory gate: ${failures.join("; ")}`,
    code: "MEMORY_STALE",
  };
}
