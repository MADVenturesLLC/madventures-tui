// packages/founder-act/src/act.ts
// FounderActV0 — sealed Founder authorization object.
//
// A FounderAct is the ONLY artifact builders/projector/preflight may treat as
// Founder authorization for: merge, commission, hold, freeze, reopen,
// authorize_review (spend ceiling changes via the other_named allowlist).
// A chat message is never an act; only the CLI writes act files.
//
// Identity pipeline:
//   body_sha256 = sha256(canonicalJson(payload without body_sha256, act_sha256))
//   act_sha256  = sha256(canonicalJson(payload without act_sha256))
// i.e. body_sha256 hashes the semantic content; act_sha256 is the
// content-addressed identity that binds body_sha256 into the act.
//
// v0 honesty: this is an INTEGRITY seal (hash), not a signature. verify
// proves a file is intact, NOT that the Founder actually authorized it.
// Ed25519/Keychain signing is a later wave.

import { canonicalJson, sha256Hex } from "./canonical";

export const ACT_SCHEMA = "founder_act_v0" as const;

export const ACT_KINDS = [
  "merge",
  "commission",
  "hold",
  "freeze",
  "reopen",
  "authorize_review",
  "other_named",
] as const;
export type ActKind = (typeof ACT_KINDS)[number];

/** actor "founder" is authorization-grade; "demo" is fixture-only, never authority. */
export type ActV0Actor = "founder" | "demo";

export interface EvidenceRef {
  kind: string;
  ref: string;
}

/** Payload fields excluding the two hash fields. body_sha256 covers exactly this. */
export type ActBodyV0 = {
  schema: typeof ACT_SCHEMA;
  id: string;
  kind: ActKind;
  subject: string;
  head_sha?: string;
  base_sha?: string;
  scope: string[];
  actor: ActV0Actor;
  issued_at: string;
  expires_at?: string;
  reason_code: string;
  evidence_refs: EvidenceRef[];
  kind_name?: string;
};

/** A fully sealed act. act_sha256 is the identity used as the filename stem. */
export type SealedActV0 = ActBodyV0 & { body_sha256: string; act_sha256: string };

export type FounderActV0 = SealedActV0 & { actor: "founder" };

export function isFounderAct(act: SealedActV0): act is FounderActV0 {
  return act.actor === "founder";
}

export type SealInput = {
  kind: ActKind;
  subject: string;
  scope: string[];
  actor: ActV0Actor;
  reason_code: string;
  evidence_refs: EvidenceRef[];
  id?: string | undefined;
  head_sha?: string | undefined;
  base_sha?: string | undefined;
  issued_at?: string | undefined;
  expires_at?: string | undefined;
  kind_name?: string | undefined;
};

export const ISO_8601_PATTERN =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/;
const SHA1_HEX_PATTERN = /^[0-9a-f]{40}$/;
const SHA256_HEX_PATTERN = /^[0-9a-f]{64}$/;
const UUID_V4_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const ULID_PATTERN = /^[0-9A-HJKMNP-TV-Z]{26}$/;

const SUBJECT_MAX = 512;
const REASON_MAX = 256;
const SCOPE_ENTRY_MAX = 256;
const EVIDENCE_KIND_MAX = 64;
const EVIDENCE_REF_MAX = 512;

export function isIso8601(s: string): boolean {
  if (!ISO_8601_PATTERN.test(s)) return false;
  return Number.isFinite(Date.parse(s));
}

/** Closed-field shape + semantic validation. Used by seal (pre-hash) and verify (post-parse). */
export function validateActBody(
  raw: unknown,
  opts: { kindNameAllowlist?: string[] } = {},
): { ok: true; body: ActBodyV0 } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, errors: ["act payload is not a JSON object"] };
  }
  const obj = raw as Record<string, unknown>;

  const allowed = new Set([
    "schema",
    "id",
    "kind",
    "subject",
    "head_sha",
    "base_sha",
    "scope",
    "actor",
    "issued_at",
    "expires_at",
    "reason_code",
    "evidence_refs",
    "kind_name",
    "body_sha256",
    "act_sha256",
  ]);
  for (const key of Object.keys(obj)) {
    if (!allowed.has(key)) errors.push(`unknown field "${key}" (field set is closed)`);
  }

  const str = (key: string): string | undefined => {
    const v = obj[key];
    if (v === undefined) return undefined;
    if (typeof v !== "string") {
      errors.push(`field "${key}" must be a string`);
      return undefined;
    }
    return v;
  };

  if (obj.schema !== ACT_SCHEMA) {
    errors.push(`schema must be "${ACT_SCHEMA}" (got ${JSON.stringify(obj.schema)})`);
  }

  const id = str("id");
  if (id !== undefined && !UUID_V4_PATTERN.test(id) && !ULID_PATTERN.test(id)) {
    errors.push(`id must be a UUIDv4 or ULID (got "${id}")`);
  }

  const kind = str("kind");
  if (kind !== undefined && !(ACT_KINDS as readonly string[]).includes(kind)) {
    errors.push(`kind "${kind}" is outside the closed enum (${ACT_KINDS.join(", ")})`);
  }

  const subject = str("subject");
  if (subject !== undefined) {
    if (subject.length === 0) errors.push('subject must be non-empty');
    if (subject.length > SUBJECT_MAX) {
      errors.push(`subject exceeds ${SUBJECT_MAX} characters`);
    }
  }

  for (const key of ["head_sha", "base_sha"] as const) {
    const v = str(key);
    if (v !== undefined && !SHA1_HEX_PATTERN.test(v)) {
      errors.push(`${key} must be 40 lowercase hex characters when present`);
    }
  }
  if (kind === "merge" && obj.head_sha === undefined) {
    errors.push('kind "merge" requires head_sha');
  }

  const scope = obj.scope;
  if (!Array.isArray(scope) || scope.some((s) => typeof s !== "string")) {
    errors.push('scope must be an array of strings');
  } else {
    const entries = scope as string[];
    for (const entry of entries) {
      if (entry.length === 0) errors.push('scope entries must be non-empty');
      if (entry.length > SCOPE_ENTRY_MAX) {
        errors.push(`scope entry exceeds ${SCOPE_ENTRY_MAX} characters`);
      }
      if (entry === "*" && kind !== "hold" && kind !== "freeze") {
        errors.push('scope ["*"] is allowed only for hold/freeze with an explicit reason');
      }
    }
    if (kind === "commission" && entries.length === 0) {
      errors.push('kind "commission" requires a non-empty scope');
    }
  }

  const actor = str("actor");
  if (actor !== undefined && actor !== "founder" && actor !== "demo") {
    errors.push(`actor must be "founder" or "demo" (got "${actor}")`);
  }

  const issuedAt = str("issued_at");
  if (issuedAt !== undefined && !isIso8601(issuedAt)) {
    errors.push("issued_at must be ISO-8601 (e.g. 2026-09-13T00:00:00Z)");
  }

  const expiresAt = str("expires_at");
  if (expiresAt !== undefined && !isIso8601(expiresAt)) {
    errors.push("expires_at must be ISO-8601 when present");
  }

  const reason = str("reason_code");
  if (reason !== undefined) {
    if (reason.length === 0) errors.push("reason_code must be non-empty");
    if (reason.length > REASON_MAX) {
      errors.push(`reason_code exceeds ${REASON_MAX} characters`);
    }
  }

  const evidence = obj.evidence_refs;
  if (!Array.isArray(evidence)) {
    errors.push("evidence_refs must be an array");
  } else {
    for (const [i, ref] of evidence.entries()) {
      if (ref === null || typeof ref !== "object" || Array.isArray(ref)) {
        errors.push(`evidence_refs[${i}] must be an object with kind and ref`);
        continue;
      }
      const r = ref as Record<string, unknown>;
      if (typeof r.kind !== "string" || r.kind.length === 0 || r.kind.length > EVIDENCE_KIND_MAX) {
        errors.push(`evidence_refs[${i}].kind must be a non-empty string (max ${EVIDENCE_KIND_MAX})`);
      }
      if (typeof r.ref !== "string" || r.ref.length === 0 || r.ref.length > EVIDENCE_REF_MAX) {
        errors.push(`evidence_refs[${i}].ref must be a non-empty string (max ${EVIDENCE_REF_MAX})`);
      }
      const extra = Object.keys(r).filter((k) => k !== "kind" && k !== "ref");
      if (extra.length > 0) errors.push(`evidence_refs[${i}] has unknown fields: ${extra.join(", ")}`);
    }
  }

  const kindName = str("kind_name");
  if (kindName !== undefined) {
    if (kind !== "other_named") {
      errors.push('kind_name is allowed only when kind is "other_named"');
    }
    if (kindName.length === 0 || kindName.length > REASON_MAX) {
      errors.push(`kind_name must be a non-empty string (max ${REASON_MAX})`);
    } else if (opts.kindNameAllowlist !== undefined && !opts.kindNameAllowlist.includes(kindName)) {
      errors.push(`kind_name "${kindName}" is not in the allowlist (${opts.kindNameAllowlist.join(", ") || "empty"})`);
    }
  }
  if (kind === "other_named" && kindName === undefined) {
    errors.push('kind "other_named" requires kind_name from the allowlist file');
  }

  if (errors.length > 0) return { ok: false, errors };

  // Assemble the typed body (undefined optional fields stay absent).
  const body: ActBodyV0 = {
    schema: ACT_SCHEMA,
    id: id as string,
    kind: kind as ActKind,
    subject: subject as string,
    scope: scope as string[],
    actor: actor as ActV0Actor,
    issued_at: issuedAt as string,
    reason_code: reason as string,
    evidence_refs: evidence as EvidenceRef[],
    ...(obj.head_sha !== undefined ? { head_sha: obj.head_sha as string } : {}),
    ...(obj.base_sha !== undefined ? { base_sha: obj.base_sha as string } : {}),
    ...(expiresAt !== undefined ? { expires_at: expiresAt } : {}),
    ...(kindName !== undefined ? { kind_name: kindName } : {}),
  };
  return { ok: true, body };
}

export function hashBody(body: ActBodyV0): { body_sha256: string; act_sha256: string } {
  const bodySha = sha256Hex(canonicalJson(body));
  const actSha = sha256Hex(canonicalJson({ ...body, body_sha256: bodySha }));
  return { body_sha256: bodySha, act_sha256: actSha };
}

/**
 * Seal: validate fields, compute body_sha256 + act_sha256 identity.
 * Gating flags (--founder-confirm / --demo-fixture) are CLI-level policy;
 * this function is the pure core.
 */
export function sealAct(
  input: SealInput,
  opts: { kindNameAllowlist?: string[] } = {},
): { ok: true; act: SealedActV0 } | { ok: false; errors: string[] } {
  const candidate = {
    schema: ACT_SCHEMA,
    id: input.id ?? crypto.randomUUID(),
    kind: input.kind,
    subject: input.subject,
    scope: input.scope,
    actor: input.actor,
    issued_at: input.issued_at ?? new Date().toISOString(),
    reason_code: input.reason_code,
    evidence_refs: input.evidence_refs,
    ...(input.head_sha !== undefined ? { head_sha: input.head_sha } : {}),
    ...(input.base_sha !== undefined ? { base_sha: input.base_sha } : {}),
    ...(input.expires_at !== undefined ? { expires_at: input.expires_at } : {}),
    ...(input.kind_name !== undefined ? { kind_name: input.kind_name } : {}),
  };
  const checked = validateActBody(candidate, opts);
  if (!checked.ok) return checked;
  const hashes = hashBody(checked.body);
  return { ok: true, act: { ...checked.body, ...hashes } };
}

/** Recompute both hashes over a parsed act. Mismatch = tampering. */
export function checkHashes(
  raw: Record<string, unknown>,
): { ok: true; act: SealedActV0 } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  for (const key of ["body_sha256", "act_sha256"] as const) {
    const v = raw[key];
    if (typeof v !== "string" || !SHA256_HEX_PATTERN.test(v)) {
      errors.push(`${key} must be a 64 lowercase hex sha256`);
    }
  }
  if (errors.length > 0) return { ok: false, errors };

  const body: Record<string, unknown> = { ...raw };
  delete body.body_sha256;
  delete body.act_sha256;
  const recomputed = hashBody(body as unknown as ActBodyV0);
  if (recomputed.body_sha256 !== raw.body_sha256) {
    errors.push("body_sha256 mismatch — act content does not match its seal");
  }
  if (recomputed.act_sha256 !== raw.act_sha256) {
    errors.push("act_sha256 mismatch — act identity does not match its content");
  }
  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, act: raw as unknown as SealedActV0 };
}
