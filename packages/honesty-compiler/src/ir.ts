// packages/honesty-compiler/src/ir.ts
// @mad/honesty-compiler — Claim IR v0.
//
// A CLOSED intermediate representation for declared claims. The compiler
// turns a claims document into ClaimIR[], rung-typechecks it against
// @mad/claim-boundary, binds each required evidence ref, and emits ONE
// @mad/single-verdict verdict — or fails closed. It is a compiler, not a
// linter essay: unknown fields, unknown enum values, and undeclared
// exclusions are structural failures, not style notes.
//
// LIBRARY — NOT PHASE_0 — NOT OCCUPANCY — NOT GATEWAY HONESTY — NOT ROOM
// RUNTIME — NOT MERGE AUTHORITY. Zero runtime dependencies beyond the three
// @mad honesty libraries. Makes no network calls and invents no evidence.

// ─── Closed vocabularies ─────────────────────────────────────────────────────

export const HONESTY_COMPILER_SCHEMA = "HONESTY_COMPILER_V0";

export const REPORT_SCHEMA = "honesty-compiler/v0";

export const PRODUCED_BY = "mad-honesty-compiler/v0";

/** What a claim may say it is. Anything else is unrepresentable. */
export const CLAIM_KINDS = ["ship", "verify", "fixture", "spec_only", "not_claim"] as const;
export type ClaimKind = (typeof CLAIM_KINDS)[number];

/**
 * The @mad/claim-boundary claim each kind asserts. A rung that does not
 * prove this claim cannot carry this kind — that is the over-claim check.
 * spec_only and not_claim assert nothing.
 */
export const KIND_TO_ASSERTED_CLAIM: Readonly<Record<ClaimKind, string | null>> = {
  ship: "merge",
  verify: "verification",
  fixture: "execution",
  spec_only: null,
  not_claim: null,
};

/** Closed evidence-ref vocabulary for v0. */
export const EVIDENCE_REF_KINDS = ["build_memory", "argus_packet", "proving_ground", "test_suite"] as const;
export type EvidenceRefKind = (typeof EVIDENCE_REF_KINDS)[number];

/**
 * The standard forbidden set. A ship/verify claim MUST declare every one of
 * these in not_evidence_of, and no claim may ASSERT them anywhere in its id
 * or text. Declaring them as exclusions is the point; asserting them is a
 * forbidden token.
 */
export const STANDARD_FORBIDDEN = [
  "PHASE_0",
  "OCCUPANCY_PROOF",
  "GATEWAY_HONESTY",
  "ROOM_RUNTIME",
  "AE01_FIX",
  "PRODUCTION_MERGE_AUTHORITY",
] as const;
export type StandardForbiddenToken = (typeof STANDARD_FORBIDDEN)[number];

/** The compiler's own boundary, as printed in reports and handoffs. */
export const COMPILER_NOT_EVIDENCE_OF: readonly string[] = [...STANDARD_FORBIDDEN, "merge"];

/**
 * Lowercase probes for forbidden assertion language in claim id/text.
 * Underscore and spaced variants are both probed so "phase 0" cannot
 * smuggle PHASE_0 past the scan.
 */
const FORBIDDEN_TEXT_PROBES: readonly string[] = [
  "phase_0",
  "phase 0",
  "occupancy_proof",
  "occupancy proof",
  "gateway_honesty",
  "gateway honesty",
  "room_runtime",
  "room runtime",
  "ae01_fix",
  "ae01 fix",
  "production_merge_authority",
  "production merge authority",
];

const COST_CEILING_PROBES: readonly string[] = ["cost-ceiling", "cost_ceiling", "cost ceiling"];

// ─── Records ─────────────────────────────────────────────────────────────────

export type BuildMemoryRef = {
  kind: "build_memory";
  /** subject the memory record is keyed by */
  subject: string;
  /** 40 lowercase hex chars — the head the claim binds to */
  headSha: string;
};

export type ArgusPacketRef = {
  kind: "argus_packet";
  /** path resolved against the claims input's directory, confined to root */
  path: string;
  /** sha256 (64 lowercase hex) of the packet file's UTF-8 bytes */
  sha256: string;
};

export type ProvingGroundRef = {
  kind: "proving_ground";
  challengeId: string;
};

export type TestSuiteRef = {
  kind: "test_suite";
  name: string;
  /** declared exit code; a used ref must be 0 */
  exitCode: number;
};

export type EvidenceRef = BuildMemoryRef | ArgusPacketRef | ProvingGroundRef | TestSuiteRef;

export type ClaimIr = {
  id: string;
  text: string;
  kind: ClaimKind;
  subject?: string;
  rung?: string;
  requires: EvidenceRef[];
  not_evidence_of: string[];
};

// ─── Issues (fail-closed, claim-boundary idiom: issues, not exceptions) ──────

export type Issue = { code: string; message: string; path?: string };

const HEAD_SHA_RE = /^[0-9a-f]{40}$/;
const CONTENT_SHA_RE = /^[0-9a-f]{64}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Forbidden assertion tokens present in a claim id or text, or null. */
export function forbiddenTokenIn(text: string): string | null {
  const lower = text.toLowerCase();
  for (const probe of FORBIDDEN_TEXT_PROBES) {
    if (lower.includes(probe)) return probe;
  }
  const hasCostCeiling = COST_CEILING_PROBES.some((probe) => lower.includes(probe));
  if (hasCostCeiling && lower.includes("production")) return "cost-ceiling production";
  return null;
}

/** Validate one evidence ref (closed union, closed fields). */
export function validateEvidenceRefInput(value: unknown, path: string): Issue[] {
  if (!isRecord(value)) {
    return [{ code: "BAD_EVIDENCE_REF", message: "evidence ref must be an object", path }];
  }
  const kind = value["kind"];
  if (typeof kind !== "string" || !(EVIDENCE_REF_KINDS as readonly string[]).includes(kind)) {
    return [
      {
        code: "UNKNOWN_EVIDENCE_REF_KIND",
        message: `unknown evidence ref kind ${JSON.stringify(kind)} — closed set is [${EVIDENCE_REF_KINDS.join(", ")}]`,
        path,
      },
    ];
  }
  const issues: Issue[] = [];
  if (kind === "build_memory") {
    if (typeof value["subject"] !== "string" || value["subject"].length === 0) {
      issues.push({ code: "BAD_EVIDENCE_REF", message: "build_memory ref needs a non-empty subject", path });
    }
    if (typeof value["headSha"] !== "string" || !HEAD_SHA_RE.test(value["headSha"])) {
      issues.push({
        code: "BAD_EVIDENCE_REF",
        message: `build_memory ref headSha must be 40 lowercase hex chars, got ${JSON.stringify(value["headSha"])}`,
        path,
      });
    }
  } else if (kind === "argus_packet") {
    if (typeof value["path"] !== "string" || value["path"].length === 0) {
      issues.push({ code: "BAD_EVIDENCE_REF", message: "argus_packet ref needs a non-empty path", path });
    }
    if (typeof value["sha256"] !== "string" || !CONTENT_SHA_RE.test(value["sha256"])) {
      issues.push({
        code: "BAD_EVIDENCE_REF",
        message: `argus_packet ref sha256 must be 64 lowercase hex chars, got ${JSON.stringify(value["sha256"])}`,
        path,
      });
    }
  } else if (kind === "proving_ground") {
    if (typeof value["challengeId"] !== "string" || value["challengeId"].length === 0) {
      issues.push({ code: "BAD_EVIDENCE_REF", message: "proving_ground ref needs a non-empty challengeId", path });
    }
  } else {
    if (typeof value["name"] !== "string" || value["name"].length === 0) {
      issues.push({ code: "BAD_EVIDENCE_REF", message: "test_suite ref needs a non-empty name", path });
    }
    if (typeof value["exitCode"] !== "number" || !Number.isInteger(value["exitCode"])) {
      issues.push({ code: "BAD_EVIDENCE_REF", message: "test_suite ref exitCode must be an integer", path });
    }
  }
  const allowed = kind === "build_memory"
    ? ["kind", "subject", "headSha"]
    : kind === "argus_packet"
      ? ["kind", "path", "sha256"]
      : kind === "proving_ground"
        ? ["kind", "challengeId"]
        : ["kind", "name", "exitCode"];
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key)) {
      issues.push({ code: "UNKNOWN_FIELD", message: `unknown field "${key}" in evidence ref — fail-closed`, path });
    }
  }
  return issues;
}

/**
 * Validate one parsed claim against the closed IR. Shape only — rung
 * semantics are P1, evidence binding is P2.
 */
export function validateClaimIr(value: unknown, path: string): Issue[] {
  if (!isRecord(value)) {
    return [{ code: "NOT_AN_OBJECT", message: "claim must be an object", path }];
  }
  const issues: Issue[] = [];

  if (typeof value["id"] !== "string" || value["id"].length === 0) {
    issues.push({ code: "BAD_ID", message: "claim id must be a non-empty string", path: `${path}.id` });
  }
  if (typeof value["text"] !== "string" || value["text"].length === 0) {
    issues.push({ code: "BAD_TEXT", message: "claim text must be a non-empty string", path: `${path}.text` });
  }
  const kind = value["kind"];
  if (typeof kind !== "string" || !(CLAIM_KINDS as readonly string[]).includes(kind)) {
    issues.push({
      code: "UNKNOWN_CLAIM_KIND",
      message: `unknown claim kind ${JSON.stringify(kind)} — closed set is [${CLAIM_KINDS.join(", ")}]`,
      path: `${path}.kind`,
    });
  }
  if ("subject" in value && value["subject"] !== undefined && (typeof value["subject"] !== "string" || value["subject"].length === 0)) {
    issues.push({ code: "BAD_SUBJECT", message: "subject, when present, must be a non-empty string", path: `${path}.subject` });
  }
  if ("rung" in value && value["rung"] !== undefined && (typeof value["rung"] !== "string" || value["rung"].length === 0)) {
    issues.push({ code: "BAD_RUNG", message: "rung, when present, must be a non-empty string", path: `${path}.rung` });
  }
  if (!Array.isArray(value["requires"])) {
    issues.push({ code: "BAD_REQUIRES", message: "requires must be an array of evidence refs", path: `${path}.requires` });
  } else {
    value["requires"].forEach((ref, i) => {
      issues.push(...validateEvidenceRefInput(ref, `${path}.requires[${String(i)}]`));
    });
  }
  if (!Array.isArray(value["not_evidence_of"]) || value["not_evidence_of"].some((e) => typeof e !== "string")) {
    issues.push({ code: "BAD_NOT_EVIDENCE_OF", message: "not_evidence_of must be an array of strings", path: `${path}.not_evidence_of` });
  }

  // ship/verify are claims about a subject — a subject is structurally required.
  if (kind === "ship" || kind === "verify") {
    if (typeof value["subject"] !== "string" || value["subject"].length === 0) {
      issues.push({ code: "SUBJECT_REQUIRED_FOR_SHIP_VERIFY", message: `kind "${kind}" requires a subject`, path: `${path}.subject` });
    }
  }

  for (const key of Object.keys(value)) {
    if (!["id", "text", "kind", "subject", "rung", "requires", "not_evidence_of"].includes(key)) {
      issues.push({ code: "UNKNOWN_FIELD", message: `unknown field "${key}" in claim — fail-closed`, path: `${path}.${key}` });
    }
  }
  return issues;
}

/** P0 scan: forbidden assertion tokens in id/text of an already-validated claim. */
export function claimLanguageIssues(claim: ClaimIr, path: string): Issue[] {
  const issues: Issue[] = [];
  const idHit = forbiddenTokenIn(claim.id);
  if (idHit !== null) {
    issues.push({ code: "FORBIDDEN_TOKEN", message: `claim id asserts forbidden token "${idHit}"`, path: `${path}.id` });
  }
  const textHit = forbiddenTokenIn(claim.text);
  if (textHit !== null) {
    issues.push({ code: "FORBIDDEN_TOKEN", message: `claim text asserts forbidden token "${textHit}"`, path: `${path}.text` });
  }
  return issues;
}
