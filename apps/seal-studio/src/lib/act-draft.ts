// apps/seal-studio/src/lib/act-draft.ts
// The draft act: the FounderActV0 shape mirrored locally (the client bundle
// must stay free of node-crypto imports), plus the two identity fields that
// make the live preview hash EXACTLY the hash the CLI will seal under:
// the studio fixes id + issued_at when a draft opens and passes both to the
// CLI (--id / --issued-at). Same fields + same id = same act_sha256.

import { canonicalJson, sha256Hex } from "./canonical";

export const ACT_SCHEMA = "founder_act_v0" as const;

/** Sealed enum minus other_named — that kind stays a CLI affordance (allowlist file). */
export const SEALABLE_KINDS = [
  "merge",
  "commission",
  "hold",
  "freeze",
  "reopen",
  "authorize_review",
] as const;
export type SealableKind = (typeof SEALABLE_KINDS)[number];
export type ActorKind = "founder" | "demo";

export interface DraftState {
  kind: SealableKind;
  subject: string;
  scope: string[];
  headSha: string;
  reasonCode: string;
  expiresAt: string; // ISO-8601 or ""
  actor: ActorKind;
}

/** Frozen per draft session; regenerating starts a new draft (and a new hash). */
export interface ActIdentity {
  id: string;
  issuedAt: string;
}

export function newIdentity(): ActIdentity {
  return { id: crypto.randomUUID(), issuedAt: new Date().toISOString() };
}

export const EMPTY_DRAFT: DraftState = {
  kind: "commission",
  subject: "",
  scope: [],
  headSha: "",
  reasonCode: "",
  expiresAt: "",
  actor: "founder",
};

/** Assemble the hash-coverable body. Empty optionals stay absent. All
 * user-entered fields are trimmed exactly as the CLI seals them, so the
 * preview hash is always the hash the seal writes. */
export function buildBody(draft: DraftState, identity: ActIdentity): Record<string, unknown> {
  return {
    schema: ACT_SCHEMA,
    id: identity.id,
    kind: draft.kind,
    subject: draft.subject.trim(),
    ...(draft.headSha.trim() !== "" ? { head_sha: draft.headSha.trim() } : {}),
    scope: draft.scope,
    actor: draft.actor,
    issued_at: identity.issuedAt,
    ...(draft.expiresAt.trim() !== "" ? { expires_at: draft.expiresAt.trim() } : {}),
    reason_code: draft.reasonCode.trim(),
    evidence_refs: [],
  };
}

export interface ActHashes {
  bodyJson: string;
  actJson: string;
  bodySha256: string;
  actSha256: string;
}

/**
 * The exact identity pipeline from founder-act's act.ts, computed in-browser:
 *   body_sha256 = sha256(canonicalJson(body))
 *   act_sha256  = sha256(canonicalJson({ ...body, body_sha256 }))
 */
export async function actHashes(draft: DraftState, identity: ActIdentity): Promise<ActHashes> {
  const body = buildBody(draft, identity);
  const bodyJson = canonicalJson(body);
  const bodySha256 = await sha256Hex(bodyJson);
  const actJson = canonicalJson({ ...body, body_sha256: bodySha256 });
  const actSha256 = await sha256Hex(actJson);
  return { bodyJson, actJson, bodySha256, actSha256 };
}

const SHA1_RE = /^[0-9a-f]{40}$/;
const ISO_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/;

/** Live client-side validation, mirroring the founder-act core rules. The CLI re-validates authoritatively. */
export function draftErrors(draft: DraftState): string[] {
  const errors: string[] = [];
  if (draft.subject.trim().length === 0) errors.push("subject is required");
  else if (draft.subject.length > 512) errors.push("subject exceeds 512 characters");
  if (draft.reasonCode.trim().length === 0) errors.push("reason_code is required");
  else if (draft.reasonCode.length > 256) errors.push("reason_code exceeds 256 characters");
  const head = draft.headSha.trim();
  if (head !== "" && !SHA1_RE.test(head)) errors.push("head_sha must be 40 lowercase hex characters");
  if (draft.kind === "merge" && head === "") errors.push('kind "merge" requires head_sha');
  if (draft.kind === "commission" && draft.scope.length === 0) {
    errors.push('kind "commission" requires a non-empty scope');
  }
  if (draft.scope.some((s) => s.length === 0)) errors.push("scope entries must be non-empty");
  if (draft.scope.some((s) => s.length > 256)) errors.push("scope entry exceeds 256 characters");
  if (draft.scope.includes("*") && draft.kind !== "hold" && draft.kind !== "freeze") {
    errors.push('scope ["*"] is allowed only for hold/freeze');
  }
  if (draft.expiresAt.trim() !== "" && !ISO_RE.test(draft.expiresAt.trim())) {
    errors.push("expires_at must be ISO-8601");
  }
  return errors;
}

/** Deep-link parse: ?kind=commission&subject=...&scope=a,b&head_sha=...&reason_code=... */
export function draftFromSearchParams(params: URLSearchParams): Partial<DraftState> {
  const draft: Partial<DraftState> = {};
  const kind = params.get("kind");
  if (kind !== null && (SEALABLE_KINDS as readonly string[]).includes(kind)) {
    draft.kind = kind as SealableKind;
  }
  const subject = params.get("subject");
  if (subject !== null) draft.subject = subject;
  const scope = params.get("scope");
  if (scope !== null) {
    draft.scope = scope
      .split(",")
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0);
  }
  const headSha = params.get("head_sha");
  if (headSha !== null) draft.headSha = headSha;
  const reasonCode = params.get("reason_code");
  if (reasonCode !== null) draft.reasonCode = reasonCode;
  const actor = params.get("actor");
  if (actor === "founder" || actor === "demo") draft.actor = actor;
  return draft;
}

/** The equivalent CLI invocation, shown read-only in the UI — the UI hides nothing. */
export function equivalentCommand(draft: DraftState, identity: ActIdentity, confirmed: boolean): string {
  const parts = [
    "bun run packages/founder-act/src/main.ts",
    "seal",
    "--kind",
    draft.kind,
    "--subject",
    JSON.stringify(draft.subject.trim()),
    "--scope",
    draft.scope.join(",") || '""',
    "--reason-code",
    JSON.stringify(draft.reasonCode.trim()),
    "--id",
    identity.id,
    "--issued-at",
    identity.issuedAt,
  ];
  const head = draft.headSha.trim();
  if (head !== "") parts.push("--head-sha", head);
  if (draft.expiresAt.trim() !== "") parts.push("--expires-at", draft.expiresAt.trim());
  parts.push("--actor", draft.actor);
  parts.push(draft.actor === "founder" ? "--founder-confirm" : "--demo-fixture");
  if (!confirmed) parts.push("#  (blocked — Founder confirm not set)");
  return parts.join(" ");
}
