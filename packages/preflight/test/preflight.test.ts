// packages/preflight/test/preflight.test.ts
// Pins the honesty surface of preflight: aggregation and exit codes,
// SKIP-vs-FAIL semantics, the denylist scanner (planted-import fixture),
// the fake-runner failure path, bail behavior, the memory gate's
// MEMORY_STALE path, and the report's claim boundary.

import { describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, readFileSync, existsSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import {
  aggregateTotals,
  buildClaimBoundarySection,
  CHECK_NAMES,
  computeExitCode,
  findForbiddenImports,
  PREFLIGHT_CLAIM,
  PREFLIGHT_NOT_EVIDENCE_OF,
  renderHuman,
  renderJson,
  type CheckResult,
} from "../src/index";
import { DEFAULT_MEMORY_SUBJECTS, evalMemory, isValidMemorySubject, parseSuiteCounts } from "../src/checks";
import { loadCheckConfig, PreflightConfigError, runPreflight } from "../src/runner";
import type { CommandOutcome, RunCommand } from "../src/spawn";

// ─── fixtures ────────────────────────────────────────────────────────────────

function tmpRepo(): string {
  return mkdtempSync(join(tmpdir(), "pf-test-"));
}

function writeP(root: string, rel: string, content: string): void {
  const abs = join(root, rel);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, content);
}

function outcome(exit_code: number, stdout = "", stderr = "", duration_ms = 1): CommandOutcome {
  return { exit_code, stdout, stderr, duration_ms };
}

type ScriptedResponse = { exit_code: number; stdout?: string; stderr?: string };

/** Fake runner keyed by the joined argv (e.g. "bun test"). Records every call. */
function fakeRunner(
  script: Record<string, ScriptedResponse>,
  fallback: ScriptedResponse = { exit_code: 0, stdout: "3 pass\n0 fail\n0 skip" },
): { run: RunCommand; calls: string[][] } {
  const calls: string[][] = [];
  const run: RunCommand = async (cmd) => {
    calls.push([...cmd]);
    const key = cmd.join(" ");
    const hit = script[key];
    if (hit !== undefined) {
      return outcome(hit.exit_code, hit.stdout ?? "", hit.stderr ?? "");
    }
    return outcome(fallback.exit_code, fallback.stdout, fallback.stderr);
  };
  return { run, calls };
}

function result(name: string, status: CheckResult["status"], tooling = false): CheckResult {
  return { name: name as CheckResult["name"], status, ms: 1, summary: "", ...(tooling ? { tooling: true } : {}) };
}

// ─── aggregation & exit codes ────────────────────────────────────────────────

describe("aggregation and exit codes", () => {
  test("empty results exit 0", () => {
    expect(computeExitCode([])).toBe(0);
    expect(aggregateTotals([])).toEqual({ pass: 0, fail: 0, skip: 0 });
  });

  test("PASS and SKIP exit 0 — a SKIP is never a failure", () => {
    const results = [result("tsc", "PASS"), result("tui-chaos", "SKIP")];
    expect(computeExitCode(results)).toBe(0);
    expect(aggregateTotals(results)).toEqual({ pass: 1, fail: 0, skip: 1 });
  });

  test("a plain FAIL exits 1", () => {
    const results = [result("tsc", "PASS"), result("test", "FAIL")];
    expect(computeExitCode(results)).toBe(1);
  });

  test("a tooling FAIL exits 2 even alongside plain failures", () => {
    const results = [result("tsc", "FAIL", true), result("test", "FAIL")];
    expect(computeExitCode(results)).toBe(2);
  });

  test("a tooling FAIL alone exits 2", () => {
    expect(computeExitCode([result("memory", "FAIL", true)])).toBe(2);
  });
});

// ─── denylist scanner ────────────────────────────────────────────────────────

describe("forbidden-import scanner", () => {
  test("planted forbidden import in a temp dir is caught with a line number", () => {
    const dir = tmpRepo();
    try {
      const rel = "packages/foo/src/bad.ts";
      writeP(dir, rel, 'import { broker } from "@madventures/broker";\nexport const x = 1;\n');
      const content = readFileSync(join(dir, rel), "utf8");
      const hits = findForbiddenImports([{ path: rel, content }]);
      expect(hits.length).toBe(1);
      expect(hits[0]?.specifier).toBe("@madventures/broker");
      expect(hits[0]?.line).toBe(1);
      expect(hits[0]?.denied).toBe("@madventures/broker");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test("prose mentions never match — only statement-leading imports", () => {
    const prose = [
      "// the @madventures/broker package is forbidden",
      'const note = "see @madventures/pty-host docs";',
      "/* gateway-daemon lives elsewhere */",
    ].join("\n");
    expect(findForbiddenImports([{ path: "a.ts", content: prose }]).length).toBe(0);
  });

  test("multi-line and side-effect imports are matched", () => {
    const src = [
      "import {",
      "  thing,",
      '} from "@madventures/pty-host";',
      'import "@madventures/adapter-antigravity";',
    ].join("\n");
    const hits = findForbiddenImports([{ path: "a.ts", content: src }]);
    expect(hits.length).toBe(2);
  });

  test("allowlist paths are skipped entirely", () => {
    const hits = findForbiddenImports(
      [{ path: "packages/broker/src/inner.ts", content: 'import "@madventures/broker";' }],
      { allowlist: ["packages/broker/src/"] },
    );
    expect(hits.length).toBe(0);
  });
});

// ─── evaluators ──────────────────────────────────────────────────────────────

describe("evaluators", () => {
  test("parseSuiteCounts reads the runner tail", () => {
    expect(parseSuiteCounts(" 42 pass\n 1 fail\n 3 skip")).toEqual({ pass: 42, fail: 1 });
    expect(parseSuiteCounts("no summary here")).toBeNull();
  });

  test("memory gate: STALE status fails with MEMORY_STALE, never a SHIP claim", () => {
    const r = evalMemory(
      true,
      true,
      ["builder-x"],
      [{ subject: "builder-x", outcome: { exit_code: 1, stdout: "", stderr: "STALE head moved", duration_ms: 5 } }],
    );
    expect(r.status).toBe("FAIL");
    expect(r.code).toBe("MEMORY_STALE");
    expect(r.summary).toContain("STALE");
  });

  test("memory gate: VALID passes", () => {
    const r = evalMemory(
      true,
      true,
      ["builder-x"],
      [{ subject: "builder-x", outcome: { exit_code: 0, stdout: "VALID", stderr: "", duration_ms: 5 } }],
    );
    expect(r.status).toBe("PASS");
  });

  test("memory gate: absent package skips with reason; no subjects skips", () => {
    const absent = evalMemory(false, true, ["x"], null);
    expect(absent.status).toBe("SKIP");
    expect(absent.reason).toContain("does not exist on this base");
    const noSubjects = evalMemory(true, true, [], null);
    expect(noSubjects.status).toBe("SKIP");
  });

  test("memory gate: an absent store skips with an explicit bind hint — nothing invented", () => {
    const r = evalMemory(true, false, ["@mad/build-memory"], null);
    expect(r.status).toBe("SKIP");
    expect(r.reason).toContain(".mad/build-memory.json does not exist");
  });

  test("memory gate: a subject with no record (UNKNOWN) FAILS — never invented VALID", () => {
    const r = evalMemory(
      true,
      true,
      ["apps/projector-mc"],
      [{ subject: "apps/projector-mc", outcome: { exit_code: 1, stdout: "", stderr: "UNKNOWN\nRECORD_MISSING", duration_ms: 4 } }],
    );
    expect(r.status).toBe("FAIL");
    expect(r.code).toBe("MEMORY_STALE");
    expect(r.summary).toContain("UNKNOWN");
    expect(r.summary).not.toContain("VALID for");
  });

  test("memory subject charset gate accepts scoped names, rejects flag-shaped subjects", () => {
    expect(isValidMemorySubject("builder-1")).toBe(true);
    expect(isValidMemorySubject("@mad/build-memory")).toBe(true);
    expect(isValidMemorySubject("apps/projector-mc")).toBe(true);
    expect(isValidMemorySubject("--store")).toBe(false);
    expect(isValidMemorySubject("a b")).toBe(false);
  });

  test("DEFAULT_MEMORY_SUBJECTS are exactly the projector spine subjects", () => {
    expect(DEFAULT_MEMORY_SUBJECTS).toEqual(["@mad/build-memory", "@mad/single-verdict", "apps/projector-mc"]);
  });

  test("claim boundary section: rung executed excludes everything above it", () => {
    const fake = {
      makeClaimBoundary: (rung: string) => ({
        rung,
        not_evidence_of: ["attestation", "verification", "review", "ci", "merge"],
      }),
    };
    const section = buildClaimBoundarySection(fake, "gloss");
    expect(section?.rung).toBe("executed");
    expect(section?.not_evidence_of).toContain("merge");
  });

  test("claim boundary section degrades to null on an unusable module", () => {
    expect(buildClaimBoundarySection(null, "g")).toBeNull();
    expect(buildClaimBoundarySection({}, "g")).toBeNull();
  });
});

// ─── orchestration with injected runners ─────────────────────────────────────

describe("runPreflight with injected runners", () => {
  test("clean tree passes: exit 0, SKIPs carry explicit reasons, artifacts written", async () => {
    const dir = tmpRepo();
    try {
      writeP(dir, "package.json", '{"name":"fake-repo","type":"module"}');
      const { run } = fakeRunner({
        "bunx tsc --noEmit": { exit_code: 0 },
        "bun test": { exit_code: 0, stdout: "12 pass\n0 fail\n0 skip" },
      });
      const report = await runPreflight({
        repoRoot: dir,
        runCommand: run,
        claimBoundaryModule: null,
      });
      expect(report.exit_code).toBe(0);
      expect(report.claim).toBe(PREFLIGHT_CLAIM);
      expect(report.not_evidence_of).toEqual([...PREFLIGHT_NOT_EVIDENCE_OF]);
      const byName = new Map(report.checks.map((c) => [c.name, c]));
      expect(byName.get("tsc")?.status).toBe("PASS");
      expect(byName.get("tui-chaos")?.status).toBe("SKIP");
      expect(byName.get("tui-chaos")?.reason).toBeDefined();
      expect(byName.get("memory")?.status).toBe("SKIP");
      expect(report.totals).toEqual({ pass: 3, fail: 0, skip: 2 });
      expect(existsSync(join(dir, ".mad", "preflight", report.run_id, "report.json"))).toBe(true);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test("failing check runner exits 1 with code and evidence", async () => {
    const dir = tmpRepo();
    try {
      writeP(dir, "package.json", '{"name":"fake-repo","type":"module"}');
      const { run } = fakeRunner({
        "bunx tsc --noEmit": { exit_code: 2, stdout: "src/bad.ts(1,1): error TS2307: Cannot find module 'x'." },
      });
      const report = await runPreflight({ repoRoot: dir, runCommand: run, claimBoundaryModule: null });
      expect(report.exit_code).toBe(1);
      const byName = new Map(report.checks.map((c) => [c.name, c]));
      expect(byName.get("tsc")?.status).toBe("FAIL");
      expect(byName.get("tsc")?.code).toBe("TSC_ERRORS");
      expect(byName.get("tsc")?.evidence).toBeDefined();
      // run all: a failed tsc does not stop the suite from running
      expect(byName.get("test")?.status).toBe("PASS");
      const logPath = join(dir, byName.get("tsc")?.evidence ?? "nope");
      expect(existsSync(logPath)).toBe(true);
      expect(readFileSync(logPath, "utf8")).toContain("error TS2307");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test("--bail stops at the first FAIL: later checks never run", async () => {
    const dir = tmpRepo();
    try {
      writeP(dir, "package.json", '{"name":"fake-repo","type":"module"}');
      const { run, calls } = fakeRunner({
        "bunx tsc --noEmit": { exit_code: 1, stdout: "error TS1" },
      });
      const report = await runPreflight({ repoRoot: dir, runCommand: run, bail: true, claimBoundaryModule: null });
      expect(report.exit_code).toBe(1);
      expect(report.checks.map((c) => c.name)).toEqual(["tsc"]);
      expect(calls.length).toBe(1);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test("planted forbidden import fails the run end-to-end", async () => {
    const dir = tmpRepo();
    try {
      writeP(dir, "package.json", '{"name":"fake-repo","type":"module"}');
      writeP(dir, "packages/foo/src/bad.ts", 'import x from "@madventures/broker";\n');
      const { run } = fakeRunner({});
      const report = await runPreflight({ repoRoot: dir, runCommand: run, claimBoundaryModule: null });
      const imports = report.checks.find((c) => c.name === "imports");
      expect(imports?.status).toBe("FAIL");
      expect(imports?.code).toBe("FORBIDDEN_IMPORT");
      expect(report.exit_code).toBe(1);
      expect(imports?.evidence).toBeDefined();
      const logPath = join(dir, imports?.evidence ?? "nope");
      expect(readFileSync(logPath, "utf8")).toContain("@madventures/broker");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test("MEMORY_STALE path drives the run to exit 1", async () => {
    const dir = tmpRepo();
    try {
      writeP(dir, "package.json", '{"name":"fake-repo","type":"module"}');
      writeP(dir, "packages/build-memory/package.json", '{"name":"@mad/build-memory","type":"module"}');
      writeP(dir, join(".mad", "build-memory.json"), '{"format":"mad.build-memory/v0","records":{}}');
      const { run } = fakeRunner({});
      const report = await runPreflight({
        repoRoot: dir,
        runCommand: run,
        subjects: ["proj-a"],
        claimBoundaryModule: null,
      });
      const memory = report.checks.find((c) => c.name === "memory");
      // fallback scripted runner exits 0 → VALID
      expect(memory?.status).toBe("PASS");
      expect(memory?.summary).toContain("proj-a");

      const stale = fakeRunner({
        "bun packages/build-memory/src/cli.ts status proj-a": { exit_code: 1, stderr: "STALE head moved" },
      });
      const report2 = await runPreflight({
        repoRoot: dir,
        runCommand: stale.run,
        subjects: ["proj-a"],
        claimBoundaryModule: null,
      });
      const memory2 = report2.checks.find((c) => c.name === "memory");
      expect(memory2?.status).toBe("FAIL");
      expect(memory2?.code).toBe("MEMORY_STALE");
      expect(report2.exit_code).toBe(1);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test("default spine subjects apply WITHOUT --subjects when the store is bound", async () => {
    const dir = tmpRepo();
    try {
      writeP(dir, "package.json", '{"name":"fake-repo","type":"module"}');
      writeP(dir, "packages/build-memory/package.json", '{"name":"@mad/build-memory","type":"module"}');
      writeP(dir, join(".mad", "build-memory.json"), '{"format":"mad.build-memory/v0","records":{}}');
      const { run, calls } = fakeRunner({});
      const report = await runPreflight({
        repoRoot: dir,
        runCommand: run,
        only: ["memory"],
        claimBoundaryModule: null,
      });
      const memory = report.checks.find((c) => c.name === "memory");
      expect(memory?.status).toBe("PASS");
      for (const subject of DEFAULT_MEMORY_SUBJECTS) {
        expect(memory?.summary).toContain(subject);
        expect(calls.some((cmd) => cmd[cmd.length - 1] === subject)).toBe(true);
      }
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test("--subjects overrides the default spine subjects", async () => {
    const dir = tmpRepo();
    try {
      writeP(dir, "package.json", '{"name":"fake-repo","type":"module"}');
      writeP(dir, "packages/build-memory/package.json", '{"name":"@mad/build-memory","type":"module"}');
      writeP(dir, join(".mad", "build-memory.json"), '{"format":"mad.build-memory/v0","records":{}}');
      const { run, calls } = fakeRunner({});
      const report = await runPreflight({
        repoRoot: dir,
        runCommand: run,
        only: ["memory"],
        subjects: ["custom-x"],
        claimBoundaryModule: null,
      });
      const memory = report.checks.find((c) => c.name === "memory");
      expect(memory?.status).toBe("PASS");
      expect(memory?.summary).toContain("custom-x");
      expect(memory?.summary).not.toContain("@mad/build-memory");
      expect(calls.some((cmd) => cmd[cmd.length - 1] === "custom-x")).toBe(true);
      expect(calls.some((cmd) => cmd[cmd.length - 1] === "@mad/build-memory")).toBe(false);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test("store absent → memory SKIP with explicit reason, even with defaults", async () => {
    const dir = tmpRepo();
    try {
      writeP(dir, "package.json", '{"name":"fake-repo","type":"module"}');
      writeP(dir, "packages/build-memory/package.json", '{"name":"@mad/build-memory","type":"module"}');
      // no .mad/build-memory.json — nothing bound yet
      const { run, calls } = fakeRunner({});
      const report = await runPreflight({
        repoRoot: dir,
        runCommand: run,
        only: ["memory"],
        claimBoundaryModule: null,
      });
      const memory = report.checks.find((c) => c.name === "memory");
      expect(memory?.status).toBe("SKIP");
      expect(memory?.reason).toContain(".mad/build-memory.json does not exist");
      expect(calls.length).toBe(0); // no status runs before anything is bound
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test("only-filter preserves deterministic order", async () => {
    const dir = tmpRepo();
    try {
      writeP(dir, "package.json", '{"name":"fake-repo","type":"module"}');
      const { run } = fakeRunner({});
      const report = await runPreflight({
        repoRoot: dir,
        runCommand: run,
        only: ["imports", "tsc"],
        artifacts: false,
        claimBoundaryModule: null,
      });
      expect(report.checks.map((c) => c.name)).toEqual(["tsc", "imports"]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test("unspawnable command becomes a tooling FAIL and exits 2", async () => {
    const dir = tmpRepo();
    try {
      writeP(dir, "package.json", '{"name":"fake-repo","type":"module"}');
      const run: RunCommand = async () => {
        throw new Error("spawn ENOENT");
      };
      const report = await runPreflight({ repoRoot: dir, runCommand: run, only: ["tsc"], artifacts: false, claimBoundaryModule: null });
      expect(report.exit_code).toBe(2);
      expect(report.checks[0]?.tooling).toBe(true);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test("missing repo root is a config error", async () => {
    const dir = tmpRepo();
    try {
      await expect(
        runPreflight({ repoRoot: join(dir, "nope"), artifacts: false, claimBoundaryModule: null }),
      ).rejects.toBeInstanceOf(PreflightConfigError);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

// ─── config validation ───────────────────────────────────────────────────────

describe("checks.json validation", () => {
  test("the shipped config loads", () => {
    const cfg = loadCheckConfig(join(import.meta.dir, ".."));
    expect(cfg.checks["tsc"]?.cmd).toEqual(["bunx", "tsc", "--noEmit"]);
    expect(cfg.checks["test"]?.cmd).toEqual(["bun", "test"]);
    expect(cfg.checks["tui-chaos"]?.requires).toBe("packages/tui-chaos");
    expect(cfg.checks["memory"]?.requires).toBe("packages/build-memory");
  });

  test("malformed configs are rejected", () => {
    const dir = tmpRepo();
    try {
      writeP(dir, "checks.json", "{ not json");
      expect(() => loadCheckConfig(dir)).toThrow(PreflightConfigError);
      writeP(dir, "checks.json", '{"checks":{"nope":{"cmd":["x"]}}}');
      expect(() => loadCheckConfig(dir)).toThrow(/unknown check name/);
      writeP(dir, "checks.json", '{"checks":{"tsc":{"cmd":[]}}}');
      expect(() => loadCheckConfig(dir)).toThrow(/cmd must be an array/);
      writeP(dir, "checks.json", '{"checks":{"tsc":{"cmd":[42]}}}');
      expect(() => loadCheckConfig(dir)).toThrow(/non-empty strings/);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

// ─── rendering ───────────────────────────────────────────────────────────────

describe("rendering", () => {
  test("renderJson emits a single line with the exact honesty fields", async () => {
    const dir = tmpRepo();
    try {
      writeP(dir, "package.json", '{"name":"fake-repo","type":"module"}');
      const { run } = fakeRunner({});
      const report = await runPreflight({ repoRoot: dir, runCommand: run, artifacts: false, claimBoundaryModule: null });
      const json = renderJson(report);
      expect(json.split("\n").length).toBe(1);
      const parsed = JSON.parse(json) as Record<string, unknown>;
      expect(parsed["claim"]).toBe("PREFLIGHT_LOCAL_V0");
      expect(parsed["not_evidence_of"]).toEqual(["PHASE_0", "OCCUPANCY_PROOF", "GATEWAY_HONESTY", "ROOM_RUNTIME"]);
      expect(parsed["exit_code"]).toBe(0);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test("renderHuman lists every check with its status and the claim line", async () => {
    const dir = tmpRepo();
    try {
      writeP(dir, "package.json", '{"name":"fake-repo","type":"module"}');
      const { run } = fakeRunner({});
      const report = await runPreflight({ repoRoot: dir, runCommand: run, artifacts: false, claimBoundaryModule: null });
      const human = renderHuman(report);
      for (const name of CHECK_NAMES) {
        expect(human).toContain(name);
      }
      expect(human).toContain("PREFLIGHT_LOCAL_V0");
      expect(human).toContain("totals:");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
