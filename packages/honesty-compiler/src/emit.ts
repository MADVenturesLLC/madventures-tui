// packages/honesty-compiler/src/emit.ts
// P3 Emit — ONE @mad/single-verdict verdict for the whole compile, built
// through makeVerdict so every factory gate (memory, rung, schema) runs
// against the real library. SHIP and VERIFY_PASS* are refused on non-VALID
// memory by that gate; this module never downgrades a refusal silently — a
// refusal becomes a FAIL verdict whose findings carry the refusal detail.

import { makeClaimBoundary, type EvidenceRung } from "@mad/claim-boundary";
import {
  makeVerdict,
  VERDICT_CLAIM,
  VerdictRefusal,
  type EvidenceLink,
  type ReasonCode,
  type Verdict,
  type VerdictInput,
  type VerdictRecord,
} from "@mad/single-verdict";

import type { BoundClaim, BindContext } from "./bind";
import { PRODUCED_BY, type Issue } from "./ir";

/** Fallback subject SHA in fixture mode when no memory head is bound. */
export const FIXTURE_HEAD_SHA = "5eedcafe5eedcafe5eedcafe5eedcafe5eedcafe";

type VerdictSelection = { verdict: Verdict; reason: ReasonCode; assertedClaim: string | null; sourceKinds: string[] };

function selectVerdict(bounds: readonly BoundClaim[]): VerdictSelection {
  const kinds = new Set(bounds.map((b) => b.claim.kind));
  if (kinds.has("ship")) return { verdict: "SHIP", reason: "EVIDENCE_FRESH", assertedClaim: VERDICT_CLAIM["SHIP"], sourceKinds: ["ship"] };
  if (kinds.has("verify")) {
    return { verdict: "VERIFY_PASS", reason: "EVIDENCE_FRESH", assertedClaim: VERDICT_CLAIM["VERIFY_PASS"], sourceKinds: ["verify"] };
  }
  if (kinds.has("fixture")) {
    return { verdict: "HOLD", reason: "EVIDENCE_INSUFFICIENT", assertedClaim: VERDICT_CLAIM["HOLD"], sourceKinds: ["fixture"] };
  }
  return { verdict: "SPEC_ONLY", reason: "SPEC_ONLY_NO_IMPLEMENTATION", assertedClaim: VERDICT_CLAIM["SPEC_ONLY"], sourceKinds: [] };
}

function subjectOf(bounds: readonly BoundClaim[]): string | null {
  for (const bound of bounds) {
    const kind = bound.claim.kind;
    if ((kind === "ship" || kind === "verify") && bound.claim.subject !== undefined) return bound.claim.subject;
  }
  const declared = new Set<string>();
  for (const bound of bounds) {
    if (bound.claim.subject !== undefined) declared.add(bound.claim.subject);
  }
  return declared.size === 1 ? (declared.values().next().value ?? null) : null;
}

function evidenceLinksFor(selection: VerdictSelection, bounds: readonly BoundClaim[]): EvidenceLink[] {
  const links: EvidenceLink[] = [];
  if (selection.sourceKinds.length === 0) return links;
  for (const bound of bounds) {
    if (!selection.sourceKinds.includes(bound.claim.kind)) continue;
    for (const boundRef of bound.verdictRefs) {
      const link: EvidenceLink = { ref: boundRef.ref };
      if (boundRef.rung !== undefined) link.boundary = makeClaimBoundary(boundRef.rung as EvidenceRung);
      links.push(link);
    }
  }
  return links;
}

function failRecord(
  subjectName: string,
  subjectSha: string,
  findings: { code: string; message: string }[],
  now?: string,
): VerdictRecord {
  const input: VerdictInput = {
    verdict: "VERIFY_FAIL",
    subject: { name: subjectName, sha: subjectSha },
    reason_code: "VERIFY_FAILED",
    produced_by: PRODUCED_BY,
    evidence_refs: [],
    findings,
    ...(now !== undefined ? { produced_at: now } : {}),
  };
  return makeVerdict(input);
}

function asFindings(issues: readonly Issue[]): { code: string; message: string }[] {
  return issues.map((issue) => ({
    code: issue.code,
    message: issue.path !== undefined ? `${issue.path}: ${issue.message}` : issue.message,
  }));
}

/**
 * P3: build the single verdict. `compileIssues` non-empty forces a FAIL
 * verdict carrying every issue as a finding. A makeVerdict refusal of a
 * positive verdict also lands here as FAIL — surfaced, never swallowed.
 */
export function emitVerdict(
  bounds: readonly BoundClaim[],
  ctx: BindContext,
  compileIssues: readonly Issue[],
  now?: string,
): VerdictRecord {
  const declaredSubject = subjectOf(bounds);
  const subjectName = declaredSubject ?? "claims-input";
  const boundHead = bounds.find((b) => b.memory !== undefined)?.memory?.headSha;
  const subjectSha = ctx.mode === "live" ? (ctx.headSha ?? FIXTURE_HEAD_SHA) : (boundHead ?? FIXTURE_HEAD_SHA);

  if (compileIssues.length > 0) {
    return failRecord(subjectName, subjectSha, asFindings(compileIssues), now);
  }

  const selection = selectVerdict(bounds);
  const memory = bounds.find((b) => b.memory !== undefined)?.memory;
  const input: VerdictInput = {
    verdict: selection.verdict,
    subject: { name: subjectName, sha: subjectSha },
    reason_code: selection.reason,
    produced_by: PRODUCED_BY,
    evidence_refs: evidenceLinksFor(selection, bounds),
    ...(memory !== undefined && selection.verdict !== "HOLD" && selection.verdict !== "SPEC_ONLY"
      ? { memory: { subject: memory.subject, status: memory.status } }
      : {}),
    ...(now !== undefined ? { produced_at: now } : {}),
  };
  try {
    return makeVerdict(input);
  } catch (err) {
    if (err instanceof VerdictRefusal) {
      return failRecord(
        subjectName,
        subjectSha,
        [{ code: "VERDICT_REFUSED", message: `${err.code}: ${err.detail}` }],
        now,
      );
    }
    throw err;
  }
}
