// packages/honesty-compiler/src/parse.ts
// P0 Parse — claims input → ClaimIR[], fail-closed.
//
// Two input shapes, nothing else:
//   1. a JSON document: { schema: "HONESTY_COMPILER_V0", claims: [...] }
//   2. a markdown handoff containing a section titled "Declared claims"
//      whose first fenced block is the same JSON document.
//
// Free prose is NEVER scraped into claims: under-claiming beats
// hallucination. Unknown top-level fields, unknown enums, unknown claim
// fields, and forbidden assertion tokens are structural failures.

import {
  HONESTY_COMPILER_SCHEMA,
  claimLanguageIssues,
  validateClaimIr,
  type ClaimIr,
  type Issue,
} from "./ir";

type ParsedDocument = {
  claims: ClaimIr[] | null;
  issues: Issue[];
};

const FENCE_OPEN_RE = /^\s{0,3}```\S*\s*$/;
const FENCE_CLOSE_RE = /^\s{0,3}```\s*$/;
const DECLARED_CLAIMS_HEADING_RE = /^\s{0,3}#{1,6}\s+.*declared claims/i;

/** Extract the first fenced JSON block under a "Declared claims" heading. */
export function extractDeclaredClaimsJson(markdown: string): { json: string | null; error?: string } {
  const lines = markdown.split("\n");
  let headingIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line !== undefined && DECLARED_CLAIMS_HEADING_RE.test(line)) {
      headingIndex = i;
      break;
    }
  }
  if (headingIndex === -1) {
    return { json: null, error: 'no section heading matching "Declared claims" found' };
  }
  let openIndex = -1;
  for (let i = headingIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    if (line !== undefined && /^\s{0,3}#{1,6}\s+/.test(line)) break;
    if (line !== undefined && FENCE_OPEN_RE.test(line)) {
      openIndex = i;
      break;
    }
  }
  if (openIndex === -1) {
    return { json: null, error: 'no fenced block found under the "Declared claims" heading' };
  }
  const body: string[] = [];
  for (let i = openIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    if (line === undefined) break;
    if (FENCE_CLOSE_RE.test(line)) {
      return { json: body.join("\n") };
    }
    body.push(line);
  }
  return { json: null, error: "fenced block under \"Declared claims\" is never closed" };
}

function validateTopLevel(parsed: unknown, issues: Issue[]): ClaimIr[] | null {
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    issues.push({ code: "NOT_AN_OBJECT", message: "claims document must be a JSON object" });
    return null;
  }
  const rec = parsed as Record<string, unknown>;
  if (rec["schema"] !== HONESTY_COMPILER_SCHEMA) {
    issues.push({
      code: "BAD_SCHEMA",
      message: `schema must be ${HONESTY_COMPILER_SCHEMA}, got ${JSON.stringify(rec["schema"])}`,
      path: "schema",
    });
  }
  const rawClaims = rec["claims"];
  if (!Array.isArray(rawClaims)) {
    issues.push({ code: "BAD_CLAIMS", message: "claims must be an array", path: "claims" });
    return null;
  }
  if (rawClaims.length === 0) {
    issues.push({ code: "EMPTY_CLAIMS", message: "claims is empty — a claims document with no claims fails closed", path: "claims" });
    return null;
  }
  for (const key of Object.keys(rec)) {
    if (key !== "schema" && key !== "claims") {
      issues.push({ code: "UNKNOWN_FIELD", message: `unknown field "${key}" in claims document — fail-closed`, path: key });
    }
  }
  const claims: ClaimIr[] = [];
  let shapeOk = true;
  rawClaims.forEach((raw, i) => {
    const path = `claims[${String(i)}]`;
    const claimIssues = validateClaimIr(raw, path);
    issues.push(...claimIssues);
    if (claimIssues.length > 0) {
      shapeOk = false;
      return;
    }
    const rec0 = raw as Record<string, unknown>;
    const claim: ClaimIr = {
      id: rec0["id"] as string,
      text: rec0["text"] as string,
      kind: rec0["kind"] as ClaimIr["kind"],
      requires: rec0["requires"] as ClaimIr["requires"],
      not_evidence_of: rec0["not_evidence_of"] as string[],
    };
    if (typeof rec0["subject"] === "string") claim.subject = rec0["subject"];
    if (typeof rec0["rung"] === "string") claim.rung = rec0["rung"];
    claims.push(claim);
  });
  if (!shapeOk) return null;
  // Forbidden-token scan runs on structurally valid claims only, in order.
  for (let i = 0; i < claims.length; i++) {
    const claim = claims[i];
    if (claim !== undefined) issues.push(...claimLanguageIssues(claim, `claims[${String(i)}]`));
  }
  // All ship/verify claims in one document must speak about one subject.
  const shipVerifySubjects = new Set<string>();
  for (const claim of claims) {
    if ((claim.kind === "ship" || claim.kind === "verify") && claim.subject !== undefined) {
      shipVerifySubjects.add(claim.subject);
    }
  }
  if (shipVerifySubjects.size > 1) {
    issues.push({
      code: "SUBJECT_CONFLICT",
      message: `ship/verify claims declare conflicting subjects [${[...shipVerifySubjects].join(", ")}] — one verdict, one subject`,
      path: "claims",
    });
  }
  return claims;
}

/** Parse a claims document (raw file text) into ClaimIR[] or issues. */
export function parseClaimsDocument(text: string, sourceLabel: string): ParsedDocument {
  const issues: Issue[] = [];
  const isMarkdown = sourceLabel.endsWith(".md") || sourceLabel.endsWith(".markdown");
  let jsonText = text;
  if (isMarkdown) {
    const extracted = extractDeclaredClaimsJson(text);
    if (extracted.json === null) {
      issues.push({ code: "NO_DECLARED_CLAIMS_BLOCK", message: `${sourceLabel}: ${extracted.error ?? "no claims block"}` });
      return { claims: null, issues };
    }
    jsonText = extracted.json;
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText) as unknown;
  } catch (err) {
    issues.push({
      code: "UNPARSEABLE_JSON",
      message: `${sourceLabel}: claims JSON did not parse: ${err instanceof Error ? err.message : String(err)}`,
    });
    return { claims: null, issues };
  }
  const claims = validateTopLevel(parsed, issues);
  return { claims: issues.length > 0 ? null : claims, issues };
}
