// packages/claim-boundary/test/claim-boundary.test.ts
// The ladder is normative; these tests pin every derived boundary, the
// exit-code-0 lie closure, and the fail-closed validator behavior.

import { describe, expect, test } from "bun:test";
import {
  EVIDENCE_CLAIMS,
  EVIDENCE_RUNGS,
  EXIT_CODE_0_MUST_NOT_PROVE,
  RUNG_TO_CLAIM,
  canonicalClaimBoundary,
  forcedNotEvidenceOf,
  isClaimBoundary,
  ladderInvariantViolations,
  makeClaimBoundary,
  parseClaimBoundary,
  provenClaims,
  validateClaimBoundary,
  type ClaimBoundary,
  type ClaimBoundaryIssueCode,
  type EvidenceRung,
} from "../src/index";

// Exhaustive golden table — the forced boundary for EVERY rung.
// If the ladder order ever changes, this table is the contract to revisit.
const FORCED: Record<EvidenceRung, string> = {
  prepared: "dispatch, execution, attestation, verification, review, ci, merge",
  dispatched: "execution, attestation, verification, review, ci, merge",
  executed: "attestation, verification, review, ci, merge",
  attested: "verification, review, ci, merge",
  verified: "review, ci, merge",
  reviewed: "ci, merge",
  ci: "merge",
  merged: "",
};

const ALL_RUNGS = [...EVIDENCE_RUNGS] as EvidenceRung[];

describe("ladder invariants", () => {
  test("ladder is intact", () => {
    expect(ladderInvariantViolations()).toEqual([]);
  });

  test("closed enums are exact", () => {
    expect(EVIDENCE_RUNGS).toEqual([
      "prepared", "dispatched", "executed", "attested", "verified", "reviewed", "ci", "merged",
    ]);
    expect(EVIDENCE_CLAIMS).toEqual([
      "preparation", "dispatch", "execution", "attestation", "verification", "review", "ci", "merge",
    ]);
  });

  test("every rung maps to the claim at the same ladder position", () => {
    for (let i = 0; i < EVIDENCE_RUNGS.length; i++) {
      const rung = EVIDENCE_RUNGS[i];
      const claim = EVIDENCE_CLAIMS[i];
      expect(rung).toBeDefined();
      expect(claim).toBeDefined();
      if (rung === undefined || claim === undefined) continue;
      expect(RUNG_TO_CLAIM[rung]).toBe(claim);
    }
  });
});

describe("forced boundaries (exhaustive over all rungs)", () => {
  test("not_evidence_of is exactly the claims strictly above the rung", () => {
    for (const rung of ALL_RUNGS) {
      const boundary = makeClaimBoundary(rung);
      expect(boundary.rung).toBe(rung);
      expect(boundary.not_evidence_of.join(", ")).toBe(FORCED[rung]);
      expect(boundary.gloss).toBeUndefined();
    }
  });

  test("proven claims are cumulative — rung and everything below", () => {
    expect(provenClaims("prepared")).toEqual(["preparation"]);
    expect(provenClaims("executed")).toEqual(["preparation", "dispatch", "execution"]);
    expect(provenClaims("merged")).toEqual([...EVIDENCE_CLAIMS]);
  });

  test("merged rung: nothing left to disclaim (empty forced set is valid)", () => {
    const boundary = makeClaimBoundary("merged");
    expect(boundary.not_evidence_of).toEqual([]);
    expect(validateClaimBoundary(boundary)).toEqual([]);
  });

  test("forced + proven partitions the closed claim set, for every rung", () => {
    for (const rung of ALL_RUNGS) {
      const union = [...provenClaims(rung), ...forcedNotEvidenceOf(rung)].sort();
      expect(union).toEqual([...EVIDENCE_CLAIMS].sort());
    }
  });
});

describe("the lie this library closes", () => {
  test("exit code 0 ('executed') must not prove verification, review, ci, or merge", () => {
    const boundary = makeClaimBoundary("executed");
    for (const claim of EXIT_CODE_0_MUST_NOT_PROVE) {
      expect(boundary.not_evidence_of).toContain(claim);
    }
  });

  test("same for every rung below 'verified' — 'done' can never read as proof", () => {
    for (const rung of ["prepared", "dispatched", "executed", "attested"] as const) {
      const declared = makeClaimBoundary(rung).not_evidence_of;
      for (const claim of EXIT_CODE_0_MUST_NOT_PROVE) {
        expect(declared).toContain(claim);
      }
    }
  });

  test("a lying gloss never changes semantics", () => {
    const honest = makeClaimBoundary("prepared");
    const lying = makeClaimBoundary("prepared", "fully verified, reviewed, CI green, and merged");
    expect(lying.not_evidence_of).toEqual(honest.not_evidence_of);
    expect(validateClaimBoundary(lying)).toEqual([]);
    expect(parseClaimBoundary(lying).rung).toBe("prepared");
  });
});

describe("validation of durable receipts (fail-closed)", () => {
  test("canonical and reordered-but-set-equal boundaries validate", () => {
    const canonical = makeClaimBoundary("executed");
    expect(validateClaimBoundary(canonical)).toEqual([]);

    const shuffled: ClaimBoundary = {
      rung: "executed",
      not_evidence_of: [...canonical.not_evidence_of].reverse(),
    };
    expect(validateClaimBoundary(shuffled)).toEqual([]);
    // Set equality means canonicalization is deterministic.
    expect(canonicalClaimBoundary(shuffled)).toEqual(canonical);
  });

  test("omitting a forced claim is INCOMPLETE — the lie by omission is rejected", () => {
    const tampered = makeClaimBoundary("executed");
    const withoutMerge = tampered.not_evidence_of.filter((c) => c !== "merge");
    const issues = validateClaimBoundary({ rung: "executed", not_evidence_of: withoutMerge });
    expect(issues.map((i) => i.code)).toContain("INCOMPLETE_NOT_EVIDENCE_OF");
    expect(issues[0]?.message).toContain("merge");
  });

  test("declaring a proven claim as not-evidence-of is OVERBROAD — contradiction rejected", () => {
    const issues = validateClaimBoundary({
      rung: "executed",
      not_evidence_of: [...makeClaimBoundary("executed").not_evidence_of, "execution"],
    });
    expect(issues.map((i) => i.code)).toContain("OVERBROAD_NOT_EVIDENCE_OF");
  });

  test("unknown claim and unknown rung are rejected — the vocabulary is closed", () => {
    const claimIssues = validateClaimBoundary({
      rung: "executed",
      not_evidence_of: [...makeClaimBoundary("executed").not_evidence_of, "deployed"],
    });
    expect(claimIssues.map((i) => i.code)).toContain("UNKNOWN_CLAIM");

    const rungIssues = validateClaimBoundary({
      rung: "shipped",
      not_evidence_of: [],
    });
    expect(rungIssues.map((i) => i.code)).toContain("UNKNOWN_RUNG");
  });

  test("missing declaration, non-array, duplicates, non-object all rejected", () => {
    const codes = (v: unknown) => validateClaimBoundary(v).map((i) => i.code);
    expect(codes({ rung: "executed" })).toContain("MISSING_NOT_EVIDENCE_OF");
    expect(codes({ rung: "executed", not_evidence_of: "everything" })).toContain("NOT_EVIDENCE_OF_NOT_ARRAY");
    expect(codes({ rung: "ci", not_evidence_of: ["merge", "merge"] })).toContain("DUPLICATE_CLAIM");
    expect(codes("merged")).toContain("NOT_AN_OBJECT");
    expect(codes(null)).toContain("NOT_AN_OBJECT");
    expect(codes([])).toContain("NOT_AN_OBJECT");
  });

  test("unknown fields are fail-closed, not ignored", () => {
    const issues = validateClaimBoundary({
      rung: "ci",
      not_evidence_of: ["merge"],
      verified: true,
    });
    expect(issues.map((i) => i.code)).toContain("UNKNOWN_FIELD");
    expect(issues[0]?.path).toBe("verified");
  });

  test("non-string gloss rejected; missing optional gloss fine", () => {
    expect(
      validateClaimBoundary({ rung: "ci", not_evidence_of: ["merge"], gloss: 42 }).map((i) => i.code),
    ).toContain("GLOSS_NOT_STRING");
    expect(validateClaimBoundary({ rung: "ci", not_evidence_of: ["merge"] })).toEqual([]);
  });

  test("isClaimBoundary narrows and parseClaimBoundary throws typed errors", () => {
    expect(isClaimBoundary(makeClaimBoundary("reviewed"))).toBe(true);
    expect(isClaimBoundary({ rung: "reviewed" })).toBe(false);

    let caught: unknown;
    try {
      parseClaimBoundary({ rung: "executed", not_evidence_of: [] });
    } catch (err) {
      caught = err;
    }
    expect(caught).toBeInstanceOf(Error);
    const codes = (caught as { issues: { code: ClaimBoundaryIssueCode }[] }).issues.map((i) => i.code);
    expect(codes).toContain("INCOMPLETE_NOT_EVIDENCE_OF");
  });
});

describe("durable receipt round-trip", () => {
  test("JSON round-trip preserves semantics and canonicalizes order", () => {
    const original = makeClaimBoundary("dispatched", "handed to Claude Code via broker envelope");
    const revived: unknown = JSON.parse(JSON.stringify(original));
    expect(validateClaimBoundary(revived)).toEqual([]);
    const parsed = parseClaimBoundary(revived);
    expect(parsed).toEqual(original);
    expect(canonicalClaimBoundary(parsed)).toEqual(makeClaimBoundary("dispatched", original.gloss));
  });
});

describe("package isolation (pure honesty library)", () => {
  test("declares no dependencies at all", async () => {
    const pkg = (await import("../package.json")) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    expect(pkg.dependencies ?? {}).toEqual({});
    expect(pkg.devDependencies ?? {}).toEqual({});
  });

  test("source never imports governance infrastructure", async () => {
    const { readdirSync, readFileSync } = await import("node:fs");
    const { join } = await import("node:path");
    const srcDir = join(import.meta.dir, "..", "src");
    const forbidden = [
      "@madventures/broker",
      "@madventures/pty-host",
      "@madventures/adapter-claude-code",
      "@madventures/adapter-antigravity",
      "gateway-daemon",
    ];
    // Match statement-leading import/export-from/require specifiers, not prose —
    // the module's own docs name the infrastructure it refuses to depend on.
    const importPattern = /^\s*(?:import\s+[^'"]*from\s+|import\s+|require\(\s*|export\s+[^'"]*from\s+)["']([^"']+)["']/gm;
    for (const file of readdirSync(srcDir)) {
      const source = readFileSync(join(srcDir, file), "utf8");
      const specifiers = new Set<string>();
      for (const match of source.matchAll(importPattern)) {
        if (match[1] !== undefined) specifiers.add(match[1]);
      }
      for (const mod of forbidden) {
        const imported = [...specifiers].some((spec) => spec.includes(mod));
        expect(imported).toBe(false);
      }
    }
  });
});
