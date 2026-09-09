// packages/proving-ground/src/law.ts
// The law oracle for claim-boundary lying receipts.
//
// The law, stated once:
//   L1  A receipt whose not_evidence_of omits any claim forced by its rung is
//       REJECTED (INCOMPLETE_NOT_EVIDENCE_OF) — lying by omission.
//   L2  A receipt that disclaims a claim its rung proves is REJECTED
//       (OVERBROAD_NOT_EVIDENCE_OF) — contradiction.
//   L3  Anything outside the closed rung/claim vocabularies is REJECTED
//       (UNKNOWN_RUNG / UNKNOWN_CLAIM).
//   L4  Structural garbage (missing fields, duplicates, unknown fields,
//       non-string gloss) is REJECTED with its typed code.
//   L5  Prose (gloss) NEVER changes semantics — a lying gloss on a legal
//       boundary is ACCEPTED, and the canonical rung is unchanged.
//   L6  A shape-valid "merge-ready" receipt (rung merged, empty forced set)
//       is ACCEPTED — the library cannot know entitlement. Shape-valid is NOT
//       evidence; the caller owes the supporting records (audit A3). Recorded
//       as a citation, never as proof.
//
// The oracle judges vectors against these laws using @mad/claim-boundary's
// public API. Expectations are derived from the laws, not from the library's
// convenience — if the library drifts from the law, the challenge fails.

import {
  EVIDENCE_CLAIMS,
  EVIDENCE_RUNGS,
  forcedNotEvidenceOf,
  makeClaimBoundary,
  parseClaimBoundary,
  validateClaimBoundary,
  type ClaimBoundary,
  type ClaimBoundaryIssue,
  type EvidenceRung,
} from "@mad/claim-boundary";
import { pick } from "./rng";

export type LawVerdict =
  | { verdict: "reject"; codes: string[] }
  | { verdict: "accept"; canonical: ClaimBoundary };

export function judge(vector: unknown): LawVerdict {
  const issues: ClaimBoundaryIssue[] = validateClaimBoundary(vector);
  if (issues.length > 0) {
    return { verdict: "reject", codes: issues.map((i) => i.code) };
  }
  return { verdict: "accept", canonical: parseClaimBoundary(vector) };
}

export interface LawCase {
  caseId: string;
  origin: "authored" | "fuzz";
  /** Human-usable description of the lie (or legal shape) under test. */
  label: string;
  vector: unknown;
  expect:
    | { verdict: "reject"; anyCodes: string[] }
    | { verdict: "accept"; rung: EvidenceRung; notEvidenceOf: string[] };
  /** A3-style note when a case proves shape-validity is not evidence. */
  citation?: string;
}

function forced(rung: EvidenceRung): string[] {
  return [...forcedNotEvidenceOf(rung)];
}

/** Hand-pinned law cases — always run, seed-independent. */
export function authoredLawCases(): LawCase[] {
  const cases: LawCase[] = [];

  // L1 — omission: executed without "merge".
  const incomplete = makeClaimBoundary("executed");
  cases.push({
    caseId: "cb-incomplete-executed-minus-merge",
    origin: "authored",
    label: "executed receipt drops 'merge' from not_evidence_of — lie by omission",
    vector: {
      rung: "executed",
      not_evidence_of: forced("executed").filter((c) => c !== "merge"),
    },
    expect: { verdict: "reject", anyCodes: ["INCOMPLETE_NOT_EVIDENCE_OF"] },
  });

  // L1 variant — prepared drops everything but one (maximal omission).
  cases.push({
    caseId: "cb-incomplete-prepared-minimal",
    origin: "authored",
    label: "prepared receipt claims only 'merge' is not proven — hides six lies",
    vector: { rung: "prepared", not_evidence_of: ["merge"] },
    expect: { verdict: "reject", anyCodes: ["INCOMPLETE_NOT_EVIDENCE_OF"] },
  });

  // L2 — contradiction: executed disclaims its own execution ("merge-ready" at executed).
  cases.push({
    caseId: "cb-overbroad-executed-self-disclaimer",
    origin: "authored",
    label: "executed receipt disclaims 'execution' — merge-ready at executed",
    vector: {
      rung: "executed",
      not_evidence_of: [...forced("executed"), "execution"],
    },
    expect: { verdict: "reject", anyCodes: ["OVERBROAD_NOT_EVIDENCE_OF"] },
  });

  // L2 variant — merge-ready at prepared: prepared receipt disclaims everything above
  // preparation INCLUDING what it cannot have (verified/review/ci/merge) AND its own
  // proven claims — the maximal "this is done" lie.
  cases.push({
    caseId: "cb-overbroad-prepared-done-lie",
    origin: "authored",
    label: "prepared receipt disclaims proven preparation — 'done' lie at the bottom rung",
    vector: {
      rung: "prepared",
      not_evidence_of: ["verification", "review", "ci", "merge", "preparation"],
    },
    expect: { verdict: "reject", anyCodes: ["OVERBROAD_NOT_EVIDENCE_OF", "INCOMPLETE_NOT_EVIDENCE_OF"] },
  });

  // L3 — closed vocabulary.
  cases.push({
    caseId: "cb-unknown-rung",
    origin: "authored",
    label: "rung 'shipped' is not on the ladder",
    vector: { rung: "shipped", not_evidence_of: [] },
    expect: { verdict: "reject", anyCodes: ["UNKNOWN_RUNG"] },
  });
  cases.push({
    caseId: "cb-unknown-claim",
    origin: "authored",
    label: "claim 'deployed' is not in the closed claim set",
    vector: {
      rung: "ci",
      not_evidence_of: [...forced("ci"), "deployed"],
    },
    expect: { verdict: "reject", anyCodes: ["UNKNOWN_CLAIM"] },
  });

  // L4 — structural garbage.
  cases.push({
    caseId: "cb-missing-declaration",
    origin: "authored",
    label: "receipt with no not_evidence_of at all",
    vector: { rung: "verified" },
    expect: { verdict: "reject", anyCodes: ["MISSING_NOT_EVIDENCE_OF"] },
  });
  cases.push({
    caseId: "cb-duplicate-claim",
    origin: "authored",
    label: "'merge' declared twice in not_evidence_of",
    vector: { rung: "ci", not_evidence_of: ["merge", "merge"] },
    expect: { verdict: "reject", anyCodes: ["DUPLICATE_CLAIM"] },
  });
  cases.push({
    caseId: "cb-unknown-field",
    origin: "authored",
    label: "stowaway field 'verified: true' smuggled into the boundary",
    vector: { rung: "ci", not_evidence_of: forced("ci"), verified: true },
    expect: { verdict: "reject", anyCodes: ["UNKNOWN_FIELD"] },
  });

  // L5 — lying gloss cannot upgrade the rung.
  const glossLie = makeClaimBoundary("prepared", "fully verified, independently reviewed, CI green, and merged");
  cases.push({
    caseId: "cb-gloss-lie-prepared",
    origin: "authored",
    label: "prepared receipt whose gloss claims verified+reviewed+ci+merge",
    vector: glossLie,
    expect: {
      verdict: "accept",
      rung: "prepared",
      notEvidenceOf: forced("prepared"),
    },
    citation:
      "Prose is never semantic: the boundary stays 'prepared' and still disclaims every claim above it — including everything the gloss boasts.",
  });

  // L6 — merge-ready SHAPE is legal; entitlement is the caller's burden (audit A3).
  cases.push({
    caseId: "cb-merge-ready-shape-valid",
    origin: "authored",
    label: "rung 'merged' with empty forced set and triumphant gloss — shape-valid, evidence unproven",
    vector: { rung: "merged", not_evidence_of: [], gloss: "merge-ready — nothing left to disclaim" },
    expect: { verdict: "accept", rung: "merged", notEvidenceOf: [] },
    citation:
      "validateClaimBoundary(makeClaimBoundary('merged')) accepts with no external evidence. Shape-valid ≠ evidence: the caller must validate supporting records and subject identities before deriving the displayed rung (audit A3).",
  });

  // Canonical sanity — every rung's canonical boundary is legal and exact.
  for (const rung of EVIDENCE_RUNGS) {
    cases.push({
      caseId: `cb-canonical-${rung}`,
      origin: "authored",
      label: `canonical boundary at rung '${rung}' is legal and exact`,
      vector: makeClaimBoundary(rung),
      expect: { verdict: "accept", rung, notEvidenceOf: forced(rung) },
    });
  }

  return cases;
}

export type MutationKind =
  | "drop-random-forced"
  | "add-proven-claim"
  | "inject-unknown-claim"
  | "duplicate-random-claim"
  | "shuffle-order"
  | "delete-declaration"
  | "corrupt-rung";

export const MUTATION_KINDS: readonly MutationKind[] = [
  "drop-random-forced",
  "add-proven-claim",
  "inject-unknown-claim",
  "duplicate-random-claim",
  "shuffle-order",
  "delete-declaration",
  "corrupt-rung",
];

/**
 * Apply one seeded mutation to a canonical boundary. Returns the mutated
 * vector and the law expectation it must be judged against.
 * Shuffle is the one LEGAL mutation — set semantics mean order never matters.
 */
export function mutate(
  kind: MutationKind,
  base: ClaimBoundary,
  rng: () => number,
  _pickClaim: (rng: () => number) => string,
): { vector: unknown; expect: LawCase["expect"] } {
  const forcedSet = forced(base.rung);
  // Proven claims for this rung = the claims at or below it on the ladder.
  const provenSet = EVIDENCE_CLAIMS.slice(0, EVIDENCE_RUNGS.indexOf(base.rung) + 1);
  switch (kind) {
    case "drop-random-forced": {
      if (forcedSet.length === 0) {
        // merged has an empty forced set — dropping is impossible; lie upward instead.
        return { vector: { rung: "merged", not_evidence_of: ["merge"] }, expect: { verdict: "reject", anyCodes: ["OVERBROAD_NOT_EVIDENCE_OF"] } };
      }
      const drop = pick(rng, forcedSet);
      const kept = forcedSet.filter((c) => c !== drop);
      return {
        vector: { rung: base.rung, not_evidence_of: kept },
        expect: { verdict: "reject", anyCodes: ["INCOMPLETE_NOT_EVIDENCE_OF"] },
      };
    }
    case "add-proven-claim": {
      // Must pick a PROVEN claim — adding a forced claim would be a duplicate,
      // not a contradiction.
      const proven = pick(rng, provenSet);
      return {
        vector: { rung: base.rung, not_evidence_of: [...forcedSet, proven] },
        expect: { verdict: "reject", anyCodes: ["OVERBROAD_NOT_EVIDENCE_OF"] },
      };
    }
    case "inject-unknown-claim": {
      return {
        vector: { rung: base.rung, not_evidence_of: [...forcedSet, "deployed"] },
        expect: { verdict: "reject", anyCodes: ["UNKNOWN_CLAIM"] },
      };
    }
    case "duplicate-random-claim": {
      if (forcedSet.length === 0) {
        return {
          vector: { rung: base.rung, not_evidence_of: ["merge", "merge"] },
          expect: { verdict: "reject", anyCodes: ["OVERBROAD_NOT_EVIDENCE_OF", "DUPLICATE_CLAIM"] },
        };
      }
      const dup = pick(rng, forcedSet);
      return {
        vector: { rung: base.rung, not_evidence_of: [...forcedSet, dup] },
        expect: { verdict: "reject", anyCodes: ["DUPLICATE_CLAIM"] },
      };
    }
    case "shuffle-order": {
      const shuffled = [...forcedSet];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        const tmp = shuffled[i] as string;
        shuffled[i] = shuffled[j] as string;
        shuffled[j] = tmp;
      }
      return {
        vector: { rung: base.rung, not_evidence_of: shuffled },
        expect: { verdict: "accept", rung: base.rung, notEvidenceOf: forcedSet },
      };
    }
    case "delete-declaration": {
      return {
        vector: { rung: base.rung },
        expect: { verdict: "reject", anyCodes: ["MISSING_NOT_EVIDENCE_OF"] },
      };
    }
    case "corrupt-rung": {
      return {
        vector: { rung: "shipped", not_evidence_of: forcedSet },
        expect: { verdict: "reject", anyCodes: ["UNKNOWN_RUNG"] },
      };
    }
  }
}

/** Seeded mutation claims: the full closed claim set (forced ∪ proven over all rungs). */
export function mutationClaimPool(): string[] {
  return [...EVIDENCE_CLAIMS];
}

/** The law oracle's judgment of a single case. Pure. */
export function judgeLawCase(lawCase: LawCase): { pass: boolean; actual: string } {
  const verdict = judge(lawCase.vector);
  const expected = lawCase.expect;
  if (expected.verdict === "reject") {
    if (verdict.verdict !== "reject") {
      return { pass: false, actual: `accepted (canonical rung ${verdict.canonical.rung}) — law says reject` };
    }
    const missing = expected.anyCodes.filter((c) => !verdict.codes.includes(c));
    if (missing.length > 0) {
      return { pass: false, actual: `rejected but missing code(s) ${missing.join(",")}; got [${verdict.codes.join(",")}]` };
    }
    return { pass: true, actual: `rejected with [${verdict.codes.join(",")}]` };
  }
  // expect accept
  if (verdict.verdict !== "accept") {
    return { pass: false, actual: `rejected with [${verdict.codes.join(",")}] — law says accept` };
  }
  const canonical = verdict.canonical;
  if (canonical.rung !== expected.rung) {
    return { pass: false, actual: `accepted but canonical rung ${canonical.rung} ≠ ${expected.rung}` };
  }
  const got = canonical.not_evidence_of.join(",");
  const want = expected.notEvidenceOf.join(",");
  if (got !== want) {
    return { pass: false, actual: `accepted but canonical set [${got}] ≠ [${want}]` };
  }
  return { pass: true, actual: `accepted, canonical rung ${canonical.rung}, set exact` };
}
