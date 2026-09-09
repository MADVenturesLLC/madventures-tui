// packages/claim-boundary/src/index.ts
// @mad/claim-boundary — a pure honesty library for MADVentures receipts.
//
// Every durable receipt must declare what it is NOT evidence of. This module
// turns the prose "claim boundary" discipline into a CLOSED enum set that is
// FORCED by the receipt's evidence rung:
//
//   not_evidence_of(rung) === every claim strictly above that rung.
//
// The ladder is cumulative: a receipt at rung R is evidence of every claim at
// or below R (each rung presupposes the ones before it) and is NOT evidence of
// anything above R. Because the set is fully determined by the rung, a
// boundary that omits a forced exclusion, adds a contradiction, or speaks
// outside the closed vocabulary is structurally invalid — not merely ill-advised.
//
// The lie this closes: "exit code 0" and "done" being readable as
// verification, review, CI, or merge. See EXIT_CODE_0_MUST_NOT_PROVE.
//
// Zero dependencies. Nothing from gateway-daemon, broker, pty-host, adapters,
// or any live surface is imported or implied. This package decides nothing
// about authority; it only makes dishonest boundaries unrepresentable, so
// TUI, BR, FounderOS, and later Gateway can all share one vocabulary.

// ─── Normative ladder ────────────────────────────────────────────────────────
// Declaration order IS the ordering. Do not reorder without a Founder ruling:
// every derived boundary, every stored receipt, and every cross-surface
// comparison inherits its meaning from this order.

export const EVIDENCE_RUNGS = [
  "prepared",
  "dispatched",
  "executed",
  "attested",
  "verified",
  "reviewed",
  "ci",
  "merged",
] as const;

export type EvidenceRung = (typeof EVIDENCE_RUNGS)[number];

/** Closed claim vocabulary. Nothing outside this set is speakable. */
export const EVIDENCE_CLAIMS = [
  "preparation",
  "dispatch",
  "execution",
  "attestation",
  "verification",
  "review",
  "ci",
  "merge",
] as const;

export type EvidenceClaim = (typeof EVIDENCE_CLAIMS)[number];

export type ClaimBoundary = {
  rung: EvidenceRung;
  /** Closed set: what this receipt must NOT be treated as proving */
  not_evidence_of: EvidenceClaim[];
  /** Optional human gloss; NEVER sufficient alone — enums are authoritative */
  gloss?: string;
};

/** The claim a receipt at each rung directly evidences. Compile-time exhaustive: */
/** adding a rung without a claim mapping (or vice versa) fails to typecheck. */
export const RUNG_TO_CLAIM = {
  prepared: "preparation",
  dispatched: "dispatch",
  executed: "execution",
  attested: "attestation",
  verified: "verification",
  reviewed: "review",
  ci: "ci",
  merged: "merge",
} as const satisfies Readonly<Record<EvidenceRung, EvidenceClaim>>;

// ─── Ladder invariants (fail-closed) ─────────────────────────────────────────

/**
 * Structural self-check of the ladder itself. If any invariant is broken the
 * library refuses to derive or validate boundaries rather than deriving a
 * dishonest one. Checked on every derive/validate — it is O(rungs).
 */
export function ladderInvariantViolations(): string[] {
  const problems: string[] = [];
  if (EVIDENCE_RUNGS.length !== EVIDENCE_CLAIMS.length) {
    problems.push(
      `ladder length mismatch: ${String(EVIDENCE_RUNGS.length)} rungs vs ${String(EVIDENCE_CLAIMS.length)} claims`,
    );
  }
  const claimSet = new Set<string>(EVIDENCE_CLAIMS);
  if (claimSet.size !== EVIDENCE_CLAIMS.length) {
    problems.push("duplicate claims in EVIDENCE_CLAIMS");
  }
  const rungSet = new Set<string>(EVIDENCE_RUNGS);
  if (rungSet.size !== EVIDENCE_RUNGS.length) {
    problems.push("duplicate rungs in EVIDENCE_RUNGS");
  }
  for (const rung of EVIDENCE_RUNGS) {
    if (!claimSet.has(RUNG_TO_CLAIM[rung])) {
      problems.push(`rung "${rung}" maps to claim "${RUNG_TO_CLAIM[rung]}" which is outside the closed claim set`);
    }
  }
  for (let i = 0; i < EVIDENCE_RUNGS.length; i++) {
    const rung = EVIDENCE_RUNGS[i];
    const claim = EVIDENCE_CLAIMS[i];
    if (rung !== undefined && claim !== undefined && RUNG_TO_CLAIM[rung] !== claim) {
      problems.push(
        `ladder position ${String(i)}: rung "${rung}" maps to "${RUNG_TO_CLAIM[rung]}" but claim at that position is "${claim}"`,
      );
    }
  }
  return problems;
}

function rungIndex(rung: EvidenceRung): number {
  return EVIDENCE_RUNGS.indexOf(rung);
}

/** Claims this rung DOES evidence — the rung itself and everything below. */
export function provenClaims(rung: EvidenceRung): EvidenceClaim[] {
  return EVIDENCE_CLAIMS.slice(0, rungIndex(rung) + 1);
}

/**
 * The forced boundary: claims strictly above the rung. This is the ENTIRE
 * closed set the receipt must declare as not_evidence_of — no omissions,
 * no additions, no free text.
 */
export function forcedNotEvidenceOf(rung: EvidenceRung): EvidenceClaim[] {
  return EVIDENCE_CLAIMS.slice(rungIndex(rung) + 1);
}

// ─── The lie this library exists to close ────────────────────────────────────

/**
 * "Exit code 0" and "done" are execution facts. Every rung at or below
 * "executed" must therefore declare these four claims as not-evidence-of.
 * Structurally guaranteed by the ladder; pinned here and in tests so a
 * future ladder reorder cannot quietly reopen the lie.
 */
export const EXIT_CODE_0_MUST_NOT_PROVE = [
  "verification",
  "review",
  "ci",
  "merge",
] as const satisfies readonly EvidenceClaim[];

// ─── Construction ────────────────────────────────────────────────────────────

/** Derive the canonical boundary for a rung. The gloss never affects semantics. */
export function makeClaimBoundary(rung: EvidenceRung, gloss?: string): ClaimBoundary {
  const violations = ladderInvariantViolations();
  if (violations.length > 0) {
    throw new Error(`claim ladder corrupted — refusing to derive a boundary: ${violations.join("; ")}`);
  }
  const boundary: ClaimBoundary = { rung, not_evidence_of: forcedNotEvidenceOf(rung) };
  if (gloss !== undefined) {
    boundary.gloss = gloss;
  }
  return boundary;
}

// ─── Validation of durable receipts ──────────────────────────────────────────

export type ClaimBoundaryIssueCode =
  | "LADDER_INVARIANT_VIOLATION"
  | "NOT_AN_OBJECT"
  | "MISSING_RUNG"
  | "UNKNOWN_RUNG"
  | "MISSING_NOT_EVIDENCE_OF"
  | "NOT_EVIDENCE_OF_NOT_ARRAY"
  | "UNKNOWN_CLAIM"
  | "DUPLICATE_CLAIM"
  | "INCOMPLETE_NOT_EVIDENCE_OF"
  | "OVERBROAD_NOT_EVIDENCE_OF"
  | "GLOSS_NOT_STRING"
  | "UNKNOWN_FIELD";

export interface ClaimBoundaryIssue {
  code: ClaimBoundaryIssueCode;
  message: string;
  /** Field or array index the issue attaches to, when applicable. */
  path?: string;
}

export class ClaimBoundaryError extends Error {
  readonly issues: readonly ClaimBoundaryIssue[];
  constructor(issues: readonly ClaimBoundaryIssue[]) {
    super(`invalid claim boundary: ${issues.map((i) => `${i.code}${i.path ? `@${i.path}` : ""} (${i.message})`).join("; ")}`);
    this.name = "ClaimBoundaryError";
    this.issues = issues;
  }
}

function isEvidenceRung(value: unknown): value is EvidenceRung {
  return typeof value === "string" && (EVIDENCE_RUNGS as readonly string[]).includes(value);
}

function isEvidenceClaim(value: unknown): value is EvidenceClaim {
  return typeof value === "string" && (EVIDENCE_CLAIMS as readonly string[]).includes(value);
}

/**
 * Validate an unknown value (e.g. a parsed durable receipt field) as a
 * ClaimBoundary. Returns every issue found; an empty array means valid.
 *
 * Semantics come ONLY from the enums: a boundary is valid iff
 *   1. the ladder itself is intact (fail closed),
 *   2. `rung` is in the closed rung set,
 *   3. `not_evidence_of` is a duplicate-free array over the closed claim set
 *      that EXACTLY equals forcedNotEvidenceOf(rung) — omissions are
 *      INCOMPLETE, proven-claim contradictions are OVERBROAD,
 *   4. `gloss`, if present, is a string (and is never semantic),
 *   5. no unknown fields are present (fail closed against stowaway data).
 */
export function validateClaimBoundary(value: unknown): ClaimBoundaryIssue[] {
  const violations = ladderInvariantViolations();
  if (violations.length > 0) {
    return [
      {
        code: "LADDER_INVARIANT_VIOLATION",
        message: `claim ladder corrupted — refusing to validate: ${violations.join("; ")}`,
      },
    ];
  }
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return [{ code: "NOT_AN_OBJECT", message: "claim boundary must be an object" }];
  }
  const rec = value as Record<string, unknown>;
  const issues: ClaimBoundaryIssue[] = [];

  // ── rung ──
  let rung: EvidenceRung | null = null;
  if (!("rung" in rec)) {
    issues.push({ code: "MISSING_RUNG", message: "missing rung", path: "rung" });
  } else if (!isEvidenceRung(rec["rung"])) {
    issues.push({
      code: "UNKNOWN_RUNG",
      message: `unknown rung ${JSON.stringify(rec["rung"])} — closed set is [${EVIDENCE_RUNGS.join(", ")}]`,
      path: "rung",
    });
  } else {
    rung = rec["rung"];
  }

  // ── not_evidence_of ──
  if (!("not_evidence_of" in rec)) {
    issues.push({
      code: "MISSING_NOT_EVIDENCE_OF",
      message: "missing not_evidence_of — a receipt MUST declare what it is not evidence of",
      path: "not_evidence_of",
    });
  } else if (!Array.isArray(rec["not_evidence_of"])) {
    issues.push({
      code: "NOT_EVIDENCE_OF_NOT_ARRAY",
      message: "not_evidence_of must be an array over the closed claim set",
      path: "not_evidence_of",
    });
  } else {
    const seen = new Set<string>();
    const entries = rec["not_evidence_of"] as unknown[];
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (!isEvidenceClaim(entry)) {
        issues.push({
          code: "UNKNOWN_CLAIM",
          message: `unknown claim ${JSON.stringify(entry)} — closed set is [${EVIDENCE_CLAIMS.join(", ")}]`,
          path: `not_evidence_of[${String(i)}]`,
        });
        continue;
      }
      if (seen.has(entry)) {
        issues.push({
          code: "DUPLICATE_CLAIM",
          message: `claim "${entry}" declared more than once`,
          path: `not_evidence_of[${String(i)}]`,
        });
        continue;
      }
      seen.add(entry);
    }
    if (rung !== null) {
      const forced = forcedNotEvidenceOf(rung);
      const missing = forced.filter((c) => !seen.has(c));
      if (missing.length > 0) {
        issues.push({
          code: "INCOMPLETE_NOT_EVIDENCE_OF",
          message: `rung "${rung}" forces not_evidence_of to include [${missing.join(", ")}] — the boundary lies by omission`,
          path: "not_evidence_of",
        });
      }
      const proven = provenClaims(rung);
      const overbroad = [...seen].filter((c) => proven.includes(c as EvidenceClaim));
      if (overbroad.length > 0) {
        issues.push({
          code: "OVERBROAD_NOT_EVIDENCE_OF",
          message: `rung "${rung}" evidences [${overbroad.join(", ")}] — declaring them not-evidence-of is a contradiction`,
          path: "not_evidence_of",
        });
      }
    }
  }

  // ── gloss ──
  if ("gloss" in rec && rec["gloss"] !== undefined && typeof rec["gloss"] !== "string") {
    issues.push({
      code: "GLOSS_NOT_STRING",
      message: `gloss must be a string, got ${typeof rec["gloss"]} — and it is never semantic either way`,
      path: "gloss",
    });
  }

  // ── unknown fields ──
  for (const key of Object.keys(rec)) {
    if (key !== "rung" && key !== "not_evidence_of" && key !== "gloss") {
      issues.push({
        code: "UNKNOWN_FIELD",
        message: `unknown field "${key}" — fail-closed: a boundary speaks only through the closed enums`,
        path: key,
      });
    }
  }

  return issues;
}

/** Type-guard form of validateClaimBoundary. */
export function isClaimBoundary(value: unknown): value is ClaimBoundary {
  return validateClaimBoundary(value).length === 0;
}

/**
 * Parse and return a CANONICAL boundary (not_evidence_of rebuilt in ladder
 * order from the validated rung) or throw ClaimBoundaryError. The gloss is
 * carried through but never participates in validation semantics.
 */
export function parseClaimBoundary(value: unknown): ClaimBoundary {
  const issues = validateClaimBoundary(value);
  if (issues.length > 0) {
    throw new ClaimBoundaryError(issues);
  }
  const rec = value as Record<string, unknown>;
  const gloss = rec["gloss"];
  return makeClaimBoundary(rec["rung"] as EvidenceRung, typeof gloss === "string" ? gloss : undefined);
}

/**
 * Canonical form: identical to rebuilding from the rung. Because the closed
 * set is forced by the rung, two valid boundaries for the same rung are
 * always semantically identical regardless of stored array order.
 */
export function canonicalClaimBoundary(boundary: ClaimBoundary): ClaimBoundary {
  return makeClaimBoundary(boundary.rung, boundary.gloss);
}
