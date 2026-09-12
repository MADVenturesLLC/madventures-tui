// packages/single-verdict/src/index.ts
// @mad/single-verdict — Single Verdict v0.
//
// ONE closed-enum, Founder-facing verdict per subject. Mission Control may
// only DISPLAY it; it may never invent, upgrade, or color outside it.
//
// Three gates make fake green unrepresentable:
//
//   1. MEMORY GATE — a positive verdict (SHIP | VERIFY_PASS |
//      VERIFY_PASS_WITH_FINDINGS) requires @mad/build-memory evidence that
//      the subject is VALID at its head SHA. STALE/UNKNOWN requires a
//      re-bind (a fresh build-memory record) first; there is no override.
//   2. CLAIM GATE — evidence links may carry a @mad/claim-boundary. If a
//      link's rung forbids the claim the verdict asserts (merge for SHIP,
//      verification for VERIFY_PASS*), the verdict is refused.
//      claim-boundary is imported, never weakened.
//   3. SCHEMA GATE — validation is fail-closed over closed enums: unknown
//      fields, unknown verdicts, unknown reason codes, and reason codes not
//      allowed for the verdict are structurally invalid. `assertDisplayable`
//      is the only door a UI gets through.
//
// LIBRARY — NOT PHASE_0 — NOT OCCUPANCY — NOT MISSION CONTROL. Zero runtime
// dependencies beyond the two @mad honesty libraries.

import {
  parseClaimBoundary,
  provenClaims,
  validateClaimBoundary,
  type ClaimBoundary,
  type EvidenceRung,
} from "@mad/claim-boundary";
import {
  validateEvidenceRef,
  type EvidenceRef,
  type MemoryStatus,
} from "@mad/build-memory";

// ─── Closed vocabularies ─────────────────────────────────────────────────────

export const VERDICTS = [
  "SHIP",
  "HOLD",
  "VERIFY_PASS",
  "VERIFY_PASS_WITH_FINDINGS",
  "VERIFY_FAIL",
  "BLOCKED",
  "STALE_EVIDENCE",
  "SPEC_ONLY",
] as const;
export type Verdict = (typeof VERDICTS)[number];

export const SINGLE_VERDICT_SCHEMA = "mad.single-verdict/v0";

export const REASON_CODES = [
  "EVIDENCE_FRESH",
  "FOUNDER_HOLD",
  "EVIDENCE_INSUFFICIENT",
  "VERIFY_FAILED",
  "DEPENDENCY_BLOCKED",
  "EVIDENCE_STALE",
  "SPEC_ONLY_NO_IMPLEMENTATION",
] as const;
export type ReasonCode = (typeof REASON_CODES)[number];

/** Which reason codes a verdict may carry — closed mapping, no free text. */
export const ALLOWED_REASONS: Readonly<Record<Verdict, readonly ReasonCode[]>> = {
  SHIP: ["EVIDENCE_FRESH"],
  HOLD: ["FOUNDER_HOLD", "EVIDENCE_INSUFFICIENT"],
  VERIFY_PASS: ["EVIDENCE_FRESH"],
  VERIFY_PASS_WITH_FINDINGS: ["EVIDENCE_FRESH"],
  VERIFY_FAIL: ["VERIFY_FAILED"],
  BLOCKED: ["DEPENDENCY_BLOCKED", "EVIDENCE_INSUFFICIENT"],
  STALE_EVIDENCE: ["EVIDENCE_STALE"],
  SPEC_ONLY: ["SPEC_ONLY_NO_IMPLEMENTATION"],
};

export const POSITIVE_VERDICTS: readonly Verdict[] = ["SHIP", "VERIFY_PASS", "VERIFY_PASS_WITH_FINDINGS"];

/** The claim each verdict asserts — what a rung must not forbid. */
export const VERDICT_CLAIM: Readonly<Record<Verdict, "merge" | "verification" | null>> = {
  SHIP: "merge",
  HOLD: null,
  VERIFY_PASS: "verification",
  VERIFY_PASS_WITH_FINDINGS: "verification",
  VERIFY_FAIL: null,
  BLOCKED: null,
  STALE_EVIDENCE: null,
  SPEC_ONLY: null,
};

/** Display tones — the ONLY color vocabulary a UI may derive from a verdict. */
export const VERDICT_TONES = ["emerald", "amber", "rose", "zinc", "violet"] as const;
export type VerdictTone = (typeof VERDICT_TONES)[number];

export const VERDICT_TONE: Readonly<Record<Verdict, VerdictTone>> = {
  SHIP: "emerald",
  HOLD: "amber",
  VERIFY_PASS: "emerald",
  VERIFY_PASS_WITH_FINDINGS: "amber",
  VERIFY_FAIL: "rose",
  BLOCKED: "rose",
  STALE_EVIDENCE: "zinc",
  SPEC_ONLY: "violet",
};

// ─── Records ─────────────────────────────────────────────────────────────────

export type VerdictSubject = {
  /** package | app | claim-id the verdict is about */
  name: string;
  /** git commit SHA the verdict is bound to — 40 lowercase hex chars */
  sha: string;
};

export type Finding = { code: string; message: string };

/** Evidence link: a structured evidence ref plus its optional claim boundary. */
export type EvidenceLink = {
  ref: EvidenceRef;
  boundary?: ClaimBoundary;
};

export type VerdictRecord = {
  schema: typeof SINGLE_VERDICT_SCHEMA;
  verdict: Verdict;
  subject: VerdictSubject;
  reason_code: ReasonCode;
  produced_by: string;
  produced_at: string;
  evidence_refs: EvidenceLink[];
  findings?: Finding[];
};

export type VerdictInput = {
  verdict: Verdict;
  subject: VerdictSubject;
  reason_code: ReasonCode;
  produced_by: string;
  produced_at?: string;
  evidence_refs: EvidenceLink[];
  findings?: Finding[];
  /** build-memory status for subject — REQUIRED for positive verdicts */
  memory?: { subject: string; status: MemoryStatus };
};

// ─── Fail-closed validation ──────────────────────────────────────────────────

export type VerdictIssueCode =
  | "NOT_AN_OBJECT"
  | "BAD_SCHEMA"
  | "UNKNOWN_VERDICT"
  | "BAD_SUBJECT"
  | "BAD_SUBJECT_SHA"
  | "MISSING_REASON_CODE"
  | "UNKNOWN_REASON_CODE"
  | "REASON_NOT_ALLOWED_FOR_VERDICT"
  | "MISSING_PRODUCED_BY"
  | "BAD_PRODUCED_BY"
  | "MISSING_PRODUCED_AT"
  | "BAD_PRODUCED_AT"
  | "MISSING_EVIDENCE_REFS"
  | "EVIDENCE_REFS_NOT_ARRAY"
  | "BAD_EVIDENCE_LINK"
  | "BAD_BOUNDARY"
  | "BAD_FINDING"
  | "UNKNOWN_FIELD";

export interface VerdictIssue {
  code: VerdictIssueCode;
  message: string;
  path?: string;
}

const HEAD_SHA_RE = /^[0-9a-f]{40}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Validate an unknown value as a VerdictRecord. Empty issues = valid. */
export function validateVerdict(value: unknown): VerdictIssue[] {
  if (!isRecord(value)) {
    return [{ code: "NOT_AN_OBJECT", message: "verdict record must be an object" }];
  }
  const rec = value as Record<string, unknown>;
  const issues: VerdictIssue[] = [];

  if (rec["schema"] !== SINGLE_VERDICT_SCHEMA) {
    issues.push({ code: "BAD_SCHEMA", message: `schema must be ${SINGLE_VERDICT_SCHEMA}, got ${JSON.stringify(rec["schema"])}`, path: "schema" });
  }

  let verdict: Verdict | null = null;
  if (!isVerdictName(rec["verdict"])) {
    issues.push({ code: "UNKNOWN_VERDICT", message: `verdict ${JSON.stringify(rec["verdict"])} is outside the closed set [${VERDICTS.join(", ")}]`, path: "verdict" });
  } else {
    verdict = rec["verdict"];
  }

  // subject
  if (!isRecord(rec["subject"])) {
    issues.push({ code: "BAD_SUBJECT", message: "subject must be an object { name, sha }", path: "subject" });
  } else {
    const subject = rec["subject"];
    if (typeof subject["name"] !== "string" || subject["name"].length === 0) {
      issues.push({ code: "BAD_SUBJECT", message: "subject.name must be a non-empty string", path: "subject.name" });
    }
    if (typeof subject["sha"] !== "string" || !HEAD_SHA_RE.test(subject["sha"])) {
      issues.push({ code: "BAD_SUBJECT_SHA", message: `subject.sha must be 40 lowercase hex chars, got ${JSON.stringify(subject["sha"])}`, path: "subject.sha" });
    }
    for (const key of Object.keys(subject)) {
      if (key !== "name" && key !== "sha") {
        issues.push({ code: "BAD_SUBJECT", message: `unknown field "${key}" in subject`, path: `subject.${key}` });
      }
    }
  }

  // reason_code
  if (!("reason_code" in rec)) {
    issues.push({ code: "MISSING_REASON_CODE", message: "missing reason_code — a verdict without a reason is a vibe", path: "reason_code" });
  } else if (!isReasonCode(rec["reason_code"])) {
    issues.push({ code: "UNKNOWN_REASON_CODE", message: `reason_code ${JSON.stringify(rec["reason_code"])} is outside the closed set [${REASON_CODES.join(", ")}]`, path: "reason_code" });
  } else if (verdict !== null && !ALLOWED_REASONS[verdict].includes(rec["reason_code"])) {
    issues.push({
      code: "REASON_NOT_ALLOWED_FOR_VERDICT",
      message: `reason_code "${String(rec["reason_code"])}" is not allowed for verdict "${verdict}" — allowed: [${ALLOWED_REASONS[verdict].join(", ")}]`,
      path: "reason_code",
    });
  }

  // produced_by / produced_at
  if (!("produced_by" in rec)) {
    issues.push({ code: "MISSING_PRODUCED_BY", message: "missing produced_by — an unattributed verdict is unaccountable", path: "produced_by" });
  } else if (typeof rec["produced_by"] !== "string" || rec["produced_by"].length === 0) {
    issues.push({ code: "BAD_PRODUCED_BY", message: "produced_by must be a non-empty string", path: "produced_by" });
  }

  if (!("produced_at" in rec)) {
    issues.push({ code: "MISSING_PRODUCED_AT", message: "missing produced_at", path: "produced_at" });
  } else if (typeof rec["produced_at"] !== "string" || Number.isNaN(Date.parse(rec["produced_at"]))) {
    issues.push({ code: "BAD_PRODUCED_AT", message: "produced_at must be an ISO-8601 timestamp", path: "produced_at" });
  }

  // evidence_refs
  if (!("evidence_refs" in rec)) {
    issues.push({ code: "MISSING_EVIDENCE_REFS", message: "missing evidence_refs — an unsupported verdict is a vibe", path: "evidence_refs" });
  } else if (!Array.isArray(rec["evidence_refs"])) {
    issues.push({ code: "EVIDENCE_REFS_NOT_ARRAY", message: "evidence_refs must be an array", path: "evidence_refs" });
  } else {
    const links = rec["evidence_refs"] as unknown[];
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const linkPath = `evidence_refs[${String(i)}]`;
      if (!isRecord(link)) {
        issues.push({ code: "BAD_EVIDENCE_LINK", message: "evidence link must be an object { ref, boundary? }", path: linkPath });
        continue;
      }
      for (const issue of validateEvidenceRef(link["ref"], `${linkPath}.ref`)) {
        issues.push({ code: "BAD_EVIDENCE_LINK", message: issue.message, path: issue.path === undefined ? `${linkPath}.ref` : `${linkPath}.${issue.path}` });
      }
      if ("boundary" in link && link["boundary"] !== undefined) {
        for (const issue of validateClaimBoundary(link["boundary"])) {
          issues.push({ code: "BAD_BOUNDARY", message: issue.message, path: issue.path === undefined ? `${linkPath}.boundary` : `${linkPath}.${issue.path}` });
        }
      }
      for (const key of Object.keys(link)) {
        if (key !== "ref" && key !== "boundary") {
          issues.push({ code: "BAD_EVIDENCE_LINK", message: `unknown field "${key}" in evidence link`, path: `${linkPath}.${key}` });
        }
      }
    }
  }

  // findings
  if ("findings" in rec && rec["findings"] !== undefined) {
    if (!Array.isArray(rec["findings"])) {
      issues.push({ code: "BAD_FINDING", message: "findings must be an array", path: "findings" });
    } else {
      for (let i = 0; i < rec["findings"].length; i++) {
        const f = rec["findings"][i];
        const fPath = `findings[${String(i)}]`;
        if (!isRecord(f) || typeof f["code"] !== "string" || f["code"].length === 0 || typeof f["message"] !== "string" || f["message"].length === 0) {
          issues.push({ code: "BAD_FINDING", message: "finding must be { code, message } with non-empty strings", path: fPath });
        }
      }
    }
  }

  // unknown fields
  for (const key of Object.keys(rec)) {
    if (key !== "schema" && key !== "verdict" && key !== "subject" && key !== "reason_code" && key !== "produced_by" && key !== "produced_at" && key !== "evidence_refs" && key !== "findings") {
      issues.push({ code: "UNKNOWN_FIELD", message: `unknown field "${key}" — fail-closed: verdicts speak only through the closed schema`, path: key });
    }
  }

  return issues;
}

function isVerdictName(value: unknown): value is Verdict {
  return typeof value === "string" && (VERDICTS as readonly string[]).includes(value);
}

function isReasonCode(value: unknown): value is ReasonCode {
  return typeof value === "string" && (REASON_CODES as readonly string[]).includes(value);
}

export class VerdictError extends Error {
  readonly issues: readonly VerdictIssue[];
  constructor(issues: readonly VerdictIssue[]) {
    super(`invalid single-verdict: ${issues.map((i) => `${i.code}${i.path ? `@${i.path}` : ""} (${i.message})`).join("; ")}`);
    this.name = "VerdictError";
    this.issues = issues;
  }
}

// ─── Factory gates (refusals, never silent downgrades) ───────────────────────

export type VerdictRefusalCode = "MEMORY_STALE_REQUIRES_REBIND" | "CLAIM_FORBIDDEN_BY_RUNG" | "INVALID_INPUT";

export class VerdictRefusal extends Error {
  readonly code: VerdictRefusalCode;
  readonly detail: string;
  constructor(code: VerdictRefusalCode, detail: string) {
    super(`${code}: ${detail}`);
    this.name = "VerdictRefusal";
    this.code = code;
    this.detail = detail;
  }
}

/**
 * Build a verdict record through all three gates. Throws VerdictRefusal when
 * a gate forbids the verdict — never downgrades silently, so the caller (and
 * the Founder) see exactly what was refused and why.
 */
export function makeVerdict(input: VerdictInput): VerdictRecord {
  // gate 1: memory
  if (POSITIVE_VERDICTS.includes(input.verdict)) {
    if (input.memory === undefined) {
      throw new VerdictRefusal("MEMORY_STALE_REQUIRES_REBIND", `verdict ${input.verdict} for ${input.subject.name} requires build-memory evidence — no memory status was provided`);
    }
    if (input.memory.status !== "VALID") {
      throw new VerdictRefusal(
        "MEMORY_STALE_REQUIRES_REBIND",
        `verdict ${input.verdict} for ${input.subject.name} refused: build-memory status is ${input.memory.status} — re-bind a fresh record first`,
      );
    }
    if (input.memory.subject !== input.subject.name) {
      throw new VerdictRefusal("MEMORY_STALE_REQUIRES_REBIND", `memory status is for ${input.memory.subject}, verdict subject is ${input.subject.name} — subjects must match`);
    }
  }

  // gate 2: claim boundary
  const assertedClaim = VERDICT_CLAIM[input.verdict];
  if (assertedClaim !== null) {
    for (let i = 0; i < input.evidence_refs.length; i++) {
      const boundary = input.evidence_refs[i]?.boundary;
      if (boundary === undefined) continue;
      const proven = provenClaims(boundary.rung);
      if (!proven.includes(assertedClaim)) {
        throw new VerdictRefusal(
          "CLAIM_FORBIDDEN_BY_RUNG",
          `verdict ${input.verdict} asserts claim "${assertedClaim}" but evidence_refs[${String(i)}] is at rung "${boundary.rung}" which forbids it (proves only [${proven.join(", ")}])`,
        );
      }
    }
  }

  const produced_at = input.produced_at ?? new Date().toISOString();
  const record: VerdictRecord = {
    schema: SINGLE_VERDICT_SCHEMA,
    verdict: input.verdict,
    subject: { name: input.subject.name, sha: input.subject.sha },
    reason_code: input.reason_code,
    produced_by: input.produced_by,
    produced_at,
    evidence_refs: input.evidence_refs.map((link) => {
      const out: EvidenceLink = {
        ref: { path: link.ref.path, sha256: link.ref.sha256, kind: link.ref.kind },
      };
      if (link.boundary !== undefined) out.boundary = parseClaimBoundary(link.boundary);
      return out;
    }),
  };
  if (input.findings !== undefined && input.findings.length > 0) {
    record.findings = input.findings.map((f) => ({ code: f.code, message: f.message }));
  }

  const issues = validateVerdict(record);
  if (issues.length > 0) throw new VerdictError(issues);
  return record;
}

// ─── Serializer (stable JSON for goldens and wire) ───────────────────────────

/** Serialize with a fixed key order — byte-stable for goldens. */
export function serializeVerdict(record: VerdictRecord): string {
  const ordered: Record<string, unknown> = {
    schema: record.schema,
    verdict: record.verdict,
    subject: { name: record.subject.name, sha: record.subject.sha },
    reason_code: record.reason_code,
    produced_by: record.produced_by,
    produced_at: record.produced_at,
    evidence_refs: record.evidence_refs.map((link) => {
      const out: Record<string, unknown> = {
        ref: { path: link.ref.path, sha256: link.ref.sha256, kind: link.ref.kind },
      };
      if (link.boundary !== undefined) out.boundary = { rung: link.boundary.rung, not_evidence_of: link.boundary.not_evidence_of, ...(link.boundary.gloss !== undefined ? { gloss: link.boundary.gloss } : {}) };
      return out;
    }),
  };
  if (record.findings !== undefined) ordered["findings"] = record.findings.map((f) => ({ code: f.code, message: f.message }));
  return JSON.stringify(ordered, null, 2);
}

export function parseVerdictJson(text: string): VerdictRecord {
  return parseVerdict(JSON.parse(text) as unknown);
}

/** Parse and return a canonical record or throw VerdictError. */
export function parseVerdict(value: unknown): VerdictRecord {
  const issues = validateVerdict(value);
  if (issues.length > 0) throw new VerdictError(issues);
  const rec = value as Record<string, unknown>;
  const subject = rec["subject"] as Record<string, unknown>;
  const record: VerdictRecord = {
    schema: SINGLE_VERDICT_SCHEMA,
    verdict: rec["verdict"] as Verdict,
    subject: { name: subject["name"] as string, sha: subject["sha"] as string },
    reason_code: rec["reason_code"] as ReasonCode,
    produced_by: rec["produced_by"] as string,
    produced_at: rec["produced_at"] as string,
    evidence_refs: (rec["evidence_refs"] as Record<string, unknown>[]).map((link) => {
      const ref = link["ref"] as Record<string, unknown>;
      const out: EvidenceLink = { ref: { path: ref["path"] as string, sha256: ref["sha256"] as string, kind: ref["kind"] as EvidenceRef["kind"] } };
      if (link["boundary"] !== undefined) out.boundary = parseClaimBoundary(link["boundary"]);
      return out;
    }),
  };
  if (rec["findings"] !== undefined) {
    record.findings = (rec["findings"] as Record<string, unknown>[]).map((f) => ({ code: f["code"] as string, message: f["message"] as string }));
  }
  return record;
}

// ─── The only door a UI gets through ─────────────────────────────────────────

export class VerdictDisplayError extends VerdictError {}

/**
 * Parse for display. A UI must call this before rendering anything derived
 * from a verdict object — it throws rather than letting the UI invent.
 */
export function assertDisplayable(value: unknown): VerdictRecord {
  try {
    return parseVerdict(value);
  } catch (err) {
    if (err instanceof VerdictError) throw new VerdictDisplayError(err.issues);
    throw err;
  }
}

// Re-exports so a UI can share one vocabulary without importing three packages.
export type { ClaimBoundary, EvidenceRung, EvidenceRef, MemoryStatus };
export { EVIDENCE_RUNGS, EVIDENCE_CLAIMS, provenClaims } from "@mad/claim-boundary";
export { MEMORY_STATUSES, type EvidenceRefKind } from "@mad/build-memory";
