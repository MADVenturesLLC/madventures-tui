// packages/honesty-compiler/test/honesty-compiler.test.ts
// Goldens + fail-closed behavior tests for @mad/honesty-compiler.
//
// Goldens pin produced_at, so a golden changes only when compiler behavior
// changes — regenerate with test/generate-goldens.ts and review the diff.
// Never hand-edit a golden.
//
// The MUTATION GUARD test below is the one named in the README: removing
// the STALE guard in src/bind.ts must fail that test.

import { readFileSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { afterEach, describe, expect, test } from "bun:test";

import { compileClaims, extractDeclaredClaimsJson, forbiddenTokenIn, parseClaimsDocument, renderJsonLine, rungCheck, type CompileOutcome } from "../src/index";
import type { ClaimIr } from "../src/ir";

const REPO_ROOT = resolve(import.meta.dir, "../../..");
const CLAIMS_DIR = resolve(import.meta.dir, "../fixtures/claims");
const GOLDENS_DIR = resolve(import.meta.dir, "goldens");
const PINNED_NOW = "2026-09-13T12:00:00.000Z";

type GoldenCase = { name: string; file: string; exit: 0 | 1 };

const GOLDEN_CASES: readonly GoldenCase[] = [
  { name: "pass-verify", file: "honest-verify.json", exit: 0 },
  { name: "pass-spec-only", file: "honest-spec-only.json", exit: 0 },
  { name: "pass-fixture-suite", file: "honest-fixture-suite.json", exit: 0 },
  { name: "pass-proving-ground-skip", file: "pass-proving-ground-skip.json", exit: 0 },
  { name: "fail-overclaim-rung", file: "lying-overclaim-rung.json", exit: 1 },
  { name: "fail-stale-ship", file: "lying-stale-ship.json", exit: 1 },
  { name: "fail-missing-evidence", file: "lying-missing-evidence.json", exit: 1 },
  { name: "fail-forbidden-token", file: "lying-forbidden-token.json", exit: 1 },
  { name: "fail-unknown-field", file: "lying-unknown-field.json", exit: 1 },
  { name: "fail-bad-argus-sha", file: "lying-bad-argus-sha.json", exit: 1 },
];

async function compileFixtureFile(file: string): Promise<CompileOutcome> {
  const claimsText = readFileSync(resolve(CLAIMS_DIR, file), "utf8");
  return compileClaims({
    mode: "fixture",
    rootDir: REPO_ROOT,
    sourceLabel: `packages/honesty-compiler/fixtures/claims/${file}`,
    inputDir: CLAIMS_DIR,
    claimsText,
    now: PINNED_NOW,
  });
}

describe("goldens (fixture mode, pinned now)", () => {
  for (const c of GOLDEN_CASES) {
    test(`${c.name} exits ${String(c.exit)} and matches its golden byte-for-byte in content`, async () => {
      const outcome = await compileFixtureFile(c.file);
      expect(outcome.ok).toBe(true);
      if (!outcome.ok) return;
      expect(outcome.result.exit_code).toBe(c.exit);
      const rendered = JSON.parse(renderJsonLine(outcome.result)) as unknown;
      const golden = JSON.parse(readFileSync(resolve(GOLDENS_DIR, `${c.name}.golden.json`), "utf8")) as unknown;
      expect(rendered).toEqual(golden);
    });
  }
});

describe("mutation guard", () => {
  test("MUTATION GUARD: STALE build-memory with kind=ship must FAIL — removing the STALE guard in src/bind.ts must fail this test", async () => {
    const outcome = await compileFixtureFile("lying-stale-ship.json");
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(outcome.result.exit_code).toBe(1);
    expect(outcome.result.verdict.verdict).toBe("VERIFY_FAIL");
    const codes = outcome.result.failures.map((f) => f.code);
    expect(codes).toContain("EVIDENCE_MEMORY_NOT_VALID");
    // The claim tried to bind a head the memory no longer holds; the guard
    // must be the reason it failed, not a side effect.
    const stale = outcome.result.failures.find((f) => f.code === "EVIDENCE_MEMORY_NOT_VALID");
    expect(stale?.message).toContain("STALE");
  });
});

describe("fail-closed behavior", () => {
  test("declared test_suite exit code 1 cannot bind", async () => {
    const claimsText = JSON.stringify({
      schema: "HONESTY_COMPILER_V0",
      claims: [
        {
          id: "t-failing-suite",
          text: "example-subject passes its goldens.",
          kind: "fixture",
          subject: "example-subject",
          rung: "executed",
          requires: [{ kind: "test_suite", name: "example:goldens", exitCode: 1 }],
          not_evidence_of: ["attestation", "verification", "review", "ci", "merge"],
        },
      ],
    });
    const outcome = await compileClaims({
      mode: "fixture",
      rootDir: REPO_ROOT,
      sourceLabel: "inline.json",
      inputDir: CLAIMS_DIR,
      claimsText,
      now: PINNED_NOW,
    });
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(outcome.result.exit_code).toBe(1);
    expect(outcome.result.failures.map((f) => f.code)).toContain("EVIDENCE_TEST_FAILED");
  });

  test("live mode with no memory record fails UNKNOWN, not silently passing", async () => {
    const head = Bun.spawnSync(["git", "rev-parse", "HEAD"], { cwd: REPO_ROOT, stdout: "pipe" }).stdout.toString().trim();
    expect(head).toMatch(/^[0-9a-f]{40}$/);
    const claimsText = JSON.stringify({
      schema: "HONESTY_COMPILER_V0",
      claims: [
        {
          id: "t-live-unknown",
          text: "example-subject typechecks and its test suite passes at the working head.",
          kind: "verify",
          subject: "example-subject",
          rung: "verified",
          requires: [{ kind: "build_memory", subject: "example-subject", headSha: head }],
          not_evidence_of: ["review", "ci", "merge", "PHASE_0", "OCCUPANCY_PROOF", "GATEWAY_HONESTY", "ROOM_RUNTIME", "AE01_FIX", "PRODUCTION_MERGE_AUTHORITY"],
        },
      ],
    });
    const outcome = await compileClaims({
      mode: "live",
      rootDir: REPO_ROOT,
      sourceLabel: "inline.json",
      inputDir: CLAIMS_DIR,
      claimsText,
      now: PINNED_NOW,
    });
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    // The worktree keeps no .mad/build-memory.json: the subject is UNKNOWN.
    expect(outcome.result.exit_code).toBe(1);
    const codes = outcome.result.failures.map((f) => f.code);
    expect(codes).toContain("EVIDENCE_MEMORY_NOT_VALID");
    expect(outcome.result.failures.find((f) => f.code === "EVIDENCE_MEMORY_NOT_VALID")?.message).toContain("UNKNOWN");
  });

  test("tampered sealed fixture is a tooling error, never a verdict", async () => {
    const tmp = mkdtempSync(resolve(REPO_ROOT, "packages/honesty-compiler/test/.tmp-tamper-"));
    try {
      const store = JSON.parse(readFileSync(resolve(REPO_ROOT, "packages/honesty-compiler/fixtures/build-memory/fixture-store.json"), "utf8")) as Record<string, unknown>;
      const rows = store["records"] as Record<string, { record: { head_sha: string } }>;
      rows["example-subject"]!.record.head_sha = "ffffffffffffffffffffffffffffffffffffffff";
      const tamperedPath = resolve(tmp, "tampered-fixture.json");
      writeFileSync(tamperedPath, JSON.stringify(store, null, 2), "utf8");
      const outcome = await compileClaims({
        mode: "fixture",
        rootDir: REPO_ROOT,
        sourceLabel: "inline.json",
        inputDir: CLAIMS_DIR,
        claimsText: readFileSync(resolve(CLAIMS_DIR, "honest-verify.json"), "utf8"),
        fixtureStorePath: tamperedPath,
        now: PINNED_NOW,
      });
      expect(outcome.ok).toBe(false);
      if (outcome.ok) return;
      expect(outcome.issue.code).toBe("FIXTURE_SEAL_BROKEN");
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  });

  test("argus path escaping the root is refused", async () => {
    const claimsText = JSON.stringify({
      schema: "HONESTY_COMPILER_V0",
      claims: [
        {
          id: "t-escape",
          text: "tries to read outside the root",
          kind: "fixture",
          subject: "example-subject",
          rung: "executed",
          requires: [{ kind: "argus_packet", path: "../../../../../etc/hostname", sha256: "a".repeat(64) }],
          not_evidence_of: ["attestation", "verification", "review", "ci", "merge"],
        },
      ],
    });
    const outcome = await compileClaims({
      mode: "fixture",
      rootDir: REPO_ROOT,
      sourceLabel: "inline.json",
      inputDir: CLAIMS_DIR,
      claimsText,
      now: PINNED_NOW,
    });
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(outcome.result.exit_code).toBe(1);
    expect(outcome.result.failures.map((f) => f.code)).toContain("PATH_OUTSIDE_ROOT");
  });
});

describe("bugbot findings (PR #83)", () => {
  test("malformed live store is a tooling failure, never a crash (Bugbot 33c2c137)", async () => {
    const head = Bun.spawnSync(["git", "rev-parse", "HEAD"], { cwd: REPO_ROOT, stdout: "pipe" }).stdout.toString().trim();
    const tmp = mkdtempSync(resolve(REPO_ROOT, "packages/honesty-compiler/test/.tmp-store-"));
    try {
      const storePath = resolve(tmp, "build-memory.json");
      // Present, parseable, but malformed: a good format line, records that
      // are not objects (format checks out, records are the trap).
      writeFileSync(storePath, JSON.stringify({ format: "mad.build-memory/v0", records: { "example-subject": "garbage" } }), "utf8");
      const claimsText = JSON.stringify({
        schema: "HONESTY_COMPILER_V0",
        claims: [
          {
            id: "t-malformed-store",
            text: "example-subject passes at this head.",
            kind: "verify",
            subject: "example-subject",
            rung: "verified",
            requires: [{ kind: "build_memory", subject: "example-subject", headSha: head }],
            not_evidence_of: ["review", "ci", "merge"],
          },
        ],
      });
      const outcome = await compileClaims({
        mode: "live",
        rootDir: REPO_ROOT,
        sourceLabel: "inline.json",
        inputDir: CLAIMS_DIR,
        claimsText,
        storePath,
        now: PINNED_NOW,
      });
      expect(outcome.ok).toBe(false);
      if (outcome.ok) return;
      expect(outcome.issue.code).toBe("STORE_MALFORMED");
      expect(outcome.issue.message).toContain("example-subject");
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  });

  test("verdict binds the ship/verify claim's memory, not an earlier claim's (Bugbot 98a1c5b4)", async () => {
    const head = Bun.spawnSync(["git", "rev-parse", "HEAD"], { cwd: REPO_ROOT, stdout: "pipe" }).stdout.toString().trim();
    const tmp = mkdtempSync(resolve(REPO_ROOT, "packages/honesty-compiler/test/.tmp-memory-"));
    try {
      const storePath = resolve(tmp, "build-memory.json");
      // Two VALID records; the earlier fixture claim binds other-subject, the
      // later verify claim binds example-subject. The verdict must take the
      // verify claim's memory or makeVerdict refuses subject mismatch.
      const records = {
        "other-subject": {
          record: {
            subject: "other-subject",
            head_sha: head,
            verified_at: "2026-09-13T00:00:00.000Z",
            evidence_refs: [],
          },
        },
        "example-subject": {
          record: {
            subject: "example-subject",
            head_sha: head,
            verified_at: "2026-09-13T00:00:00.000Z",
            evidence_refs: [],
          },
        },
      };
      writeFileSync(storePath, JSON.stringify({ format: "mad.build-memory/v0", records }), "utf8");
      const claimsText = JSON.stringify({
        schema: "HONESTY_COMPILER_V0",
        claims: [
          {
            id: "t-early-fixture",
            text: "other-subject passes its fixture suite.",
            kind: "fixture",
            subject: "other-subject",
            rung: "executed",
            requires: [{ kind: "build_memory", subject: "other-subject", headSha: head }],
            not_evidence_of: ["attestation", "verification", "review", "ci", "merge"],
          },
          {
            id: "t-verify",
            text: "example-subject typechecks and its test suite passes at the recorded head.",
            kind: "verify",
            subject: "example-subject",
            rung: "verified",
            requires: [{ kind: "build_memory", subject: "example-subject", headSha: head }],
            not_evidence_of: ["review", "ci", "merge", "PHASE_0", "OCCUPANCY_PROOF", "GATEWAY_HONESTY", "ROOM_RUNTIME", "AE01_FIX", "PRODUCTION_MERGE_AUTHORITY"],
          },
        ],
      });
      const outcome = await compileClaims({
        mode: "live",
        rootDir: REPO_ROOT,
        sourceLabel: "inline.json",
        inputDir: CLAIMS_DIR,
        claimsText,
        storePath,
        now: PINNED_NOW,
      });
      expect(outcome.ok).toBe(true);
      if (!outcome.ok) return;
      // Before the fix the first bound memory (other-subject) was used and
      // makeVerdict refused the verdict; now the verify claim's own record
      // selects the verdict and the compile passes.
      expect(outcome.result.exit_code).toBe(0);
      expect(outcome.result.verdict.verdict).toBe("VERIFY_PASS");
      expect(outcome.result.verdict.subject.name).toBe("example-subject");
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  });
});

describe("P0 parse", () => {
  test("forbidden token probes catch underscore, spaced, and cost-ceiling variants", () => {
    expect(forbiddenTokenIn("completes PHASE_0")).toBe("phase_0");
    expect(forbiddenTokenIn("completes phase 0")).toBe("phase 0");
    expect(forbiddenTokenIn("gateway honesty achieved")).toBe("gateway honesty");
    expect(forbiddenTokenIn("ROOM_RUNTIME is live")).toBe("room_runtime");
    expect(forbiddenTokenIn("cost-ceiling is fine for production")).toBe("cost-ceiling production");
    expect(forbiddenTokenIn("a perfectly ordinary claim about tests")).toBeNull();
  });

  test("markdown handoff: extracts the fenced JSON under Declared claims", () => {
    const claimsText = readFileSync(resolve(CLAIMS_DIR, "honest-verify.json"), "utf8");
    const markdown = `# Handoff\n\nSome prose the compiler must NOT scrape.\n\n## Declared claims\n\n\`\`\`json\n${claimsText}\`\`\`\n\nMore prose.\n`;
    const extracted = extractDeclaredClaimsJson(markdown);
    expect(extracted.json).not.toBeNull();
    const parsed = parseClaimsDocument(markdown, "handoff.md");
    expect(parsed.issues).toEqual([]);
    expect(parsed.claims).not.toBeNull();
    expect(parsed.claims?.[0]?.id).toBe("example-verify-1");
  });

  test("markdown without a Declared claims section fails closed", () => {
    const parsed = parseClaimsDocument("# Handoff\n\nno claims here\n", "handoff.md");
    expect(parsed.claims).toBeNull();
    expect(parsed.issues.map((i) => i.code)).toContain("NO_DECLARED_CLAIMS_BLOCK");
  });

  test("empty claims array fails closed", () => {
    const parsed = parseClaimsDocument(JSON.stringify({ schema: "HONESTY_COMPILER_V0", claims: [] }), "empty.json");
    expect(parsed.claims).toBeNull();
    expect(parsed.issues.map((i) => i.code)).toContain("EMPTY_CLAIMS");
  });
});

describe("P1 rung typecheck", () => {
  function claim(overrides: Partial<ClaimIr>): ClaimIr {
    return {
      id: "t",
      text: "t",
      kind: "ship",
      subject: "s",
      rung: "merged",
      requires: [],
      not_evidence_of: ["PHASE_0", "OCCUPANCY_PROOF", "GATEWAY_HONESTY", "ROOM_RUNTIME", "AE01_FIX", "PRODUCTION_MERGE_AUTHORITY"],
      ...overrides,
    };
  }

  test("ship at a rung that forbids merge is an over-claim", () => {
    const issues = rungCheck([claim({ rung: "executed" })]);
    expect(issues.map((i) => i.code)).toContain("OVERCLAIM_VS_RUNG");
  });

  test("ship at merged is legal", () => {
    expect(rungCheck([claim({ rung: "merged" })])).toEqual([]);
  });

  test("omitting a forced exclusion is an incomplete boundary", () => {
    const issues = rungCheck([claim({ rung: "verified", not_evidence_of: ["ci", "merge", "PHASE_0", "OCCUPANCY_PROOF", "GATEWAY_HONESTY", "ROOM_RUNTIME", "AE01_FIX", "PRODUCTION_MERGE_AUTHORITY"] })]);
    expect(issues.map((i) => i.code)).toContain("INCOMPLETE_FORCED_EXCLUSIONS");
  });

  test("declaring a proven claim as not-evidence-of is overbroad", () => {
    const issues = rungCheck([claim({ rung: "merged", not_evidence_of: ["merge", "PHASE_0", "OCCUPANCY_PROOF", "GATEWAY_HONESTY", "ROOM_RUNTIME", "AE01_FIX", "PRODUCTION_MERGE_AUTHORITY"] })]);
    expect(issues.map((i) => i.code)).toContain("OVERBROAD_EXCLUSIONS");
  });

  test("ship without a rung is untypeable", () => {
    const noRung: ClaimIr = {
      id: "t",
      text: "t",
      kind: "ship",
      subject: "s",
      requires: [],
      not_evidence_of: ["PHASE_0", "OCCUPANCY_PROOF", "GATEWAY_HONESTY", "ROOM_RUNTIME", "AE01_FIX", "PRODUCTION_MERGE_AUTHORITY"],
    };
    const issues = rungCheck([noRung]);
    expect(issues.map((i) => i.code)).toContain("MISSING_RUNG_FOR_KIND");
  });

  test("unknown rung fails closed", () => {
    const issues = rungCheck([claim({ rung: "phase-9-final" })]);
    expect(issues.map((i) => i.code)).toContain("UNKNOWN_RUNG");
  });
});

describe("CLI", () => {
  const CLI = resolve(REPO_ROOT, "packages/honesty-compiler/src/cli.ts");

  function run(args: string[]): { code: number; stdout: string; stderr: string } {
    const proc = Bun.spawnSync(["bun", CLI, ...args], { cwd: REPO_ROOT, stdout: "pipe", stderr: "pipe" });
    return { code: proc.exitCode ?? -1, stdout: proc.stdout.toString(), stderr: proc.stderr.toString() };
  }

  test("honest fixture input: exit 0, JSON last line, VERIFY_PASS", () => {
    const r = run(["--fixture", "--input", "packages/honesty-compiler/fixtures/claims/honest-verify.json", "--json-only", "--now", PINNED_NOW]);
    expect(r.code).toBe(0);
    const last = r.stdout.trimEnd().split("\n").pop() ?? "";
    const parsed = JSON.parse(last) as { claim: string; verdict: { verdict: string }; exit_code: number };
    expect(parsed.claim).toBe("HONESTY_COMPILER_V0");
    expect(parsed.verdict.verdict).toBe("VERIFY_PASS");
    expect(parsed.exit_code).toBe(0);
  });

  test("lying fixture input: exit 1 with FAIL verdict as the JSON last line", () => {
    const r = run(["--fixture", "--input", "packages/honesty-compiler/fixtures/claims/lying-stale-ship.json", "--json-only", "--now", PINNED_NOW]);
    expect(r.code).toBe(1);
    const last = r.stdout.trimEnd().split("\n").pop() ?? "";
    const parsed = JSON.parse(last) as { verdict: { verdict: string } };
    expect(parsed.verdict.verdict).toBe("VERIFY_FAIL");
  });

  test("human summary plus machine JSON last line by default", () => {
    const r = run(["--fixture", "--input", "packages/honesty-compiler/fixtures/claims/honest-verify.json", "--now", PINNED_NOW]);
    expect(r.code).toBe(0);
    const lines = r.stdout.trimEnd().split("\n");
    expect(lines[0]?.startsWith("mad-honesty-compile (fixture)")).toBe(true);
    const last = lines.pop() ?? "";
    expect(() => JSON.parse(last) as unknown).not.toThrow();
  });

  test("missing input file is a tooling error (exit 2)", () => {
    const r = run(["--fixture", "--input", "no/such/file.json"]);
    expect(r.code).toBe(2);
    expect(r.stderr).toContain("cannot read claims input");
  });

  test("unknown flag is a usage error (exit 2)", () => {
    const r = run(["--bogus"]);
    expect(r.code).toBe(2);
  });

  test("--help exits 0 with the claim footer", () => {
    const r = run(["--help"]);
    expect(r.code).toBe(0);
    expect(r.stdout).toContain("HONESTY_COMPILER_V0");
    expect(r.stdout).toContain("Not merge authority");
  });
});
