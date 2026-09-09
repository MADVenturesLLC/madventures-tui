// packages/proving-ground/src/runners/malformed-authority.ts
// Challenge: lie to the claim-boundary library every way the law forbids and
// a few ways it permits — then require the oracle's verdicts to match the law
// exactly. Authored law cases always run; a seeded mutation fuzz rounds out
// coverage. Deterministic under a fixed seed.

import { EVIDENCE_RUNGS, makeClaimBoundary } from "@mad/claim-boundary";
import { mulberry32, pick } from "../rng";
import {
  MUTATION_KINDS,
  authoredLawCases,
  judgeLawCase,
  mutate,
  mutationClaimPool,
  type LawCase,
} from "../law";
import type { CaseRecord, ChallengeResult } from "../types";

const FUZZ_CASES = 64;

function runCase(lawCase: LawCase, seedOffset?: number): CaseRecord {
  const judgment = judgeLawCase(lawCase);
  return {
    caseId: lawCase.caseId,
    origin: lawCase.origin,
    input: { label: lawCase.label, vector: lawCase.vector },
    expected:
      lawCase.expect.verdict === "reject"
        ? `reject (${lawCase.expect.anyCodes.join("|")})`
        : `accept rung=${lawCase.expect.rung}`,
    actual: judgment.actual,
    pass: judgment.pass,
    ...(lawCase.citation !== undefined ? { citation: lawCase.citation } : {}),
    ...(seedOffset !== undefined ? { seedOffset } : {}),
  };
}

export function runMalformedAuthority(seed: number): Omit<ChallengeResult, "durationMs"> {
  const rng = mulberry32(seed);
  const pool = mutationClaimPool();
  const cases: CaseRecord[] = [];

  for (const authored of authoredLawCases()) {
    cases.push(runCase(authored));
  }

  const rungs = [...EVIDENCE_RUNGS];
  for (let i = 0; i < FUZZ_CASES; i++) {
    const kind = pick(rng, MUTATION_KINDS);
    const rung = pick(rng, rungs);
    const base = makeClaimBoundary(rung);
    const mutation = mutate(kind, base, rng, (r) => pick(r, pool));
    const fuzzCase: LawCase = {
      caseId: `cb-fuzz-${String(i).padStart(3, "0")}-${kind}`,
      origin: "fuzz",
      label: `seeded ${kind} on ${rung}`,
      vector: mutation.vector,
      expect: mutation.expect,
    };
    cases.push(runCase(fuzzCase, i));
  }

  const failed = cases.filter((c) => !c.pass);
  return {
    id: "pg-cb-lies",
    kind: "malformed_authority",
    title: "Claim-boundary lying receipts are judged by the law, not by luck",
    outcome: failed.length === 0 ? "pass" : "fail",
    oracle: "@mad/claim-boundary validate/parse (law oracle in src/law.ts)",
    seed,
    cases,
    artifacts: [],
    citations: cases.filter((c) => c.citation !== undefined).map((c) => c.citation as string),
  };
}
