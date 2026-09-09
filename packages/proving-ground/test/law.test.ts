// packages/proving-ground/test/law.test.ts
// The law oracle against the real @mad/claim-boundary library.

import { describe, expect, test } from "bun:test";
import {
  authoredLawCases,
  judge,
  judgeLawCase,
  mutate,
  mutationClaimPool,
  MUTATION_KINDS,
} from "../src/law";
import { makeClaimBoundary, forcedNotEvidenceOf, validateClaimBoundary } from "@mad/claim-boundary";
import { mulberry32, pick } from "../src/rng";
import { EVIDENCE_RUNGS } from "@mad/claim-boundary";

describe("authored law cases", () => {
  const cases = authoredLawCases();

  test("catalog covers every law L1–L6", () => {
    const ids = cases.map((c) => c.caseId);
    expect(ids).toContain("cb-incomplete-executed-minus-merge"); // L1
    expect(ids).toContain("cb-overbroad-executed-self-disclaimer"); // L2
    expect(ids).toContain("cb-unknown-rung"); // L3
    expect(ids).toContain("cb-missing-declaration"); // L4
    expect(ids).toContain("cb-gloss-lie-prepared"); // L5
    expect(ids).toContain("cb-merge-ready-shape-valid"); // L6
  });

  test("every authored case passes the law oracle", () => {
    for (const c of cases) {
      const judgment = judgeLawCase(c);
      if (!judgment.pass) {
        throw new Error(`${c.caseId} failed the law oracle: ${judgment.actual}`);
      }
      expect(judgment.pass).toBe(true);
    }
  });

  test("exit-code-0 lie: every rung below verified disclaims all four claims", () => {
    for (const rung of EVIDENCE_RUNGS) {
      const forced = forcedNotEvidenceOf(rung);
      if (rung === "verified" || rung === "reviewed" || rung === "ci" || rung === "merged") continue;
      for (const claim of ["verification", "review", "ci", "merge"] as const) {
        expect(forced).toContain(claim);
      }
    }
  });
});

describe("seeded mutations obey the law", () => {
  test("all mutation kinds, all rungs, seed 20260906 — verdicts match expectations", () => {
    const rng = mulberry32(20260906);
    const pool = mutationClaimPool();
    for (const kind of MUTATION_KINDS) {
      for (const rung of EVIDENCE_RUNGS) {
        const base = makeClaimBoundary(rung);
        const { vector, expect: expected } = mutate(kind, base, rng, (r) => pick(r, pool));
        const judgment = judgeLawCase({
          caseId: `synthetic-${kind}-${rung}`,
          origin: "fuzz",
          label: kind,
          vector,
          expect: expected,
        });
        if (!judgment.pass) {
          throw new Error(`${kind}/${rung} failed the law oracle: ${judgment.actual}`);
        }
        expect(judgment.pass).toBe(true);
      }
    }
  });

  test("mutation pool is the full closed claim set", () => {
    expect(mutationClaimPool().sort()).toEqual([
      "attestation", "ci", "dispatch", "execution", "merge", "preparation", "review", "verification",
    ]);
  });

  test("judge() accepts canonical boundaries for every rung", () => {
    for (const rung of EVIDENCE_RUNGS) {
      expect(validateClaimBoundary(makeClaimBoundary(rung))).toEqual([]);
      expect(judge(makeClaimBoundary(rung)).verdict).toBe("accept");
    }
  });
});
