// packages/honesty-compiler/src/rung.ts
// P1 Rung typecheck — every claim's kind must be legal at its rung, and its
// not_evidence_of must be complete. All rung semantics come from
// @mad/claim-boundary, imported read-only and never weakened: the forced
// exclusion set, the proven claim set, and the closed rung enum are that
// library's alone.

import {
  EVIDENCE_RUNGS,
  forcedNotEvidenceOf,
  provenClaims,
  type EvidenceRung,
} from "@mad/claim-boundary";

import {
  KIND_TO_ASSERTED_CLAIM,
  STANDARD_FORBIDDEN,
  type ClaimIr,
  type Issue,
} from "./ir";

function isKnownRung(rung: string): rung is EvidenceRung {
  return (EVIDENCE_RUNGS as readonly string[]).includes(rung);
}

/**
 * P1: rung legality + boundary completeness for each parsed claim.
 * Aggregates every issue — the Founder sees all of them, not the first.
 */
export function rungCheck(claims: readonly ClaimIr[]): Issue[] {
  const issues: Issue[] = [];
  for (let i = 0; i < claims.length; i++) {
    const claim = claims[i];
    if (claim === undefined) continue;
    const path = `claims[${String(i)}]`;

    const asserted = KIND_TO_ASSERTED_CLAIM[claim.kind];
    if (claim.rung === undefined) {
      // Only kinds that assert a claim need a rung; spec_only/not_claim may
      // omit one. A ship/verify/fixture claim with no rung is untypeable.
      if (asserted !== null) {
        issues.push({
          code: "MISSING_RUNG_FOR_KIND",
          message: `kind "${claim.kind}" asserts claim "${asserted}" but declares no rung — fail-closed`,
          path: `${path}.rung`,
        });
      }
      continue;
    }
    if (!isKnownRung(claim.rung)) {
      issues.push({
        code: "UNKNOWN_RUNG",
        message: `unknown rung ${JSON.stringify(claim.rung)} — closed set is [${EVIDENCE_RUNGS.join(", ")}]`,
        path: `${path}.rung`,
      });
      continue;
    }

    if (asserted !== null && !(provenClaims(claim.rung) as readonly string[]).includes(asserted)) {
      issues.push({
        code: "OVERCLAIM_VS_RUNG",
        message: `claim "${claim.id}" is kind "${claim.kind}" (asserts "${asserted}") at rung "${claim.rung}" which proves only [${provenClaims(claim.rung).join(", ")}] — over-claim`,
        path: `${path}.rung`,
      });
    }

    const declared = new Set(claim.not_evidence_of);
    const forced = forcedNotEvidenceOf(claim.rung);
    const missingForced = forced.filter((c) => !declared.has(c));
    if (missingForced.length > 0) {
      issues.push({
        code: "INCOMPLETE_FORCED_EXCLUSIONS",
        message: `rung "${claim.rung}" forces not_evidence_of to include [${missingForced.join(", ")}] — the boundary lies by omission`,
        path: `${path}.not_evidence_of`,
      });
    }
    const proven = provenClaims(claim.rung);
    const overbroad = claim.not_evidence_of.filter((c) => (proven as readonly string[]).includes(c));
    if (overbroad.length > 0) {
      issues.push({
        code: "OVERBROAD_EXCLUSIONS",
        message: `rung "${claim.rung}" evidences [${overbroad.join(", ")}] — declaring them not-evidence-of is a contradiction`,
        path: `${path}.not_evidence_of`,
      });
    }

    if (claim.kind === "ship" || claim.kind === "verify") {
      const missingStandard = STANDARD_FORBIDDEN.filter((t) => !declared.has(t));
      if (missingStandard.length > 0) {
        issues.push({
          code: "MISSING_STANDARD_EXCLUSION",
          message: `kind "${claim.kind}" must declare the standard forbidden set in not_evidence_of — missing [${missingStandard.join(", ")}]`,
          path: `${path}.not_evidence_of`,
        });
      }
    }
  }
  return issues;
}
