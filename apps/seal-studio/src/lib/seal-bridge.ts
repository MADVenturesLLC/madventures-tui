// apps/seal-studio/src/lib/seal-bridge.ts
// Dev-only seal gateway between the browser and @mad/founder-act's pure core.
//
// The studio calls the sealAct LIBRARY (validate + hash), then writes with
// the exact same discipline as the CLI's own runSeal: content-addressed
// filename <act_sha256>.json, exclusive "wx" flag, confined to
// <repoRoot>/.mad/founder-acts. No process is spawned anywhere in the app;
// the CLI-equivalent invocation is shown in the UI for transparency only.
//
// Fail-closed rules:
//   - A write happens ONLY through sealToDisk, and only when req.confirmed
//     is exactly true — the UI sets that only after the two-step ritual
//     (checkbox + hold). Actor "founder" is refused without it; actor "demo"
//     is refused without it too (fixtures still go through the ritual).
//   - Field validation mirrors the founder-act core authoritatively on this
//     side as well; sealAct re-validates as the final gate.
//   - This middleware exists only in `vite` dev (configureServer); the
//     production build ships no seal endpoint at all.

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { sealAct } from "@mad/founder-act";

const SEALABLE_KINDS = ["merge", "commission", "hold", "freeze", "reopen", "authorize_review"] as const;
const SHA1_RE = /^[0-9a-f]{40}$/;
const ISO_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/;
const UUID_V4_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const ULID_RE = /^[0-9A-HJKMNP-TV-Z]{26}$/;

const SUBJECT_MAX = 512;
const REASON_MAX = 256;
const SCOPE_ENTRY_MAX = 256;
const ACTS_SUBPATH = join(".mad", "founder-acts");

export interface SealRequest {
  mode: "founder" | "demo";
  /** Set only by the UI after the two-step Founder confirm. Exactly true or the bridge fails closed. */
  confirmed: boolean;
  id: string;
  issued_at: string;
  kind: string;
  subject: string;
  scope: string[];
  head_sha?: string;
  reason_code: string;
  expires_at?: string;
}

/** Server-authoritative mirror of the founder-act core rules, before sealing. */
export function validateSealRequest(req: unknown): { ok: true; req: SealRequest } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  if (typeof req !== "object" || req === null) {
    return { ok: false, errors: ["seal request is not a JSON object"] };
  }
  const raw = req as Record<string, unknown>;
  const str = (key: string): string | undefined => {
    const v = raw[key];
    if (v === undefined) return undefined;
    if (typeof v !== "string") {
      errors.push(`field "${key}" must be a string`);
      return undefined;
    }
    if (v.includes("\0")) errors.push(`field "${key}" contains a NUL byte`);
    return v;
  };

  const mode = str("mode");
  if (mode !== undefined && mode !== "founder" && mode !== "demo") {
    errors.push('mode must be "founder" or "demo"');
  }
  if (raw["confirmed"] !== true) {
    errors.push("confirmed must be exactly true — the Founder confirm gate is not satisfied");
  }

  const id = str("id");
  if (id === undefined) errors.push("id is required");
  else if (!UUID_V4_RE.test(id) && !ULID_RE.test(id)) errors.push("id must be a UUIDv4 or ULID");

  const issuedAt = str("issued_at");
  if (issuedAt === undefined) errors.push("issued_at is required");
  else if (!ISO_RE.test(issuedAt)) errors.push("issued_at must be ISO-8601");

  const kind = str("kind");
  if (kind === undefined) errors.push("kind is required");
  else if (!(SEALABLE_KINDS as readonly string[]).includes(kind)) {
    errors.push(`kind "${kind}" is outside the studio's sealed enum`);
  }

  const subject = str("subject");
  if (subject === undefined) errors.push("subject is required");
  else if (subject.trim().length === 0) errors.push("subject must be non-empty");
  else if (subject.length > SUBJECT_MAX) errors.push(`subject exceeds ${SUBJECT_MAX} characters`);

  const scope = raw["scope"];
  if (!Array.isArray(scope) || scope.some((s) => typeof s !== "string")) {
    errors.push("scope must be an array of strings");
  } else {
    for (const entry of scope as string[]) {
      if (entry.includes("\0")) errors.push("scope entry contains a NUL byte");
      if (entry.length === 0) errors.push("scope entries must be non-empty");
      if (entry.length > SCOPE_ENTRY_MAX) errors.push(`scope entry exceeds ${SCOPE_ENTRY_MAX} characters`);
    }
    if (kind === "commission" && (scope as string[]).length === 0) {
      errors.push('kind "commission" requires a non-empty scope');
    }
  }

  const headSha = str("head_sha");
  if (headSha !== undefined && headSha !== "" && !SHA1_RE.test(headSha)) {
    errors.push("head_sha must be 40 lowercase hex characters");
  }
  if (kind === "merge" && (headSha === undefined || headSha === "")) {
    errors.push('kind "merge" requires head_sha');
  }

  const reason = str("reason_code");
  if (reason === undefined) errors.push("reason_code is required");
  else if (reason.trim().length === 0) errors.push("reason_code must be non-empty");
  else if (reason.length > REASON_MAX) errors.push(`reason_code exceeds ${REASON_MAX} characters`);

  const expires = str("expires_at");
  if (expires !== undefined && expires !== "" && !ISO_RE.test(expires)) {
    errors.push("expires_at must be ISO-8601");
  }

  if (errors.length > 0 || mode === undefined || id === undefined || issuedAt === undefined ||
      kind === undefined || subject === undefined || reason === undefined) {
    return { ok: false, errors: errors.length > 0 ? errors : ["seal request is incomplete"] };
  }
  return {
    ok: true,
    req: {
      mode: mode as "founder" | "demo",
      confirmed: true,
      id,
      issued_at: issuedAt,
      kind,
      subject,
      scope: scope as string[],
      reason_code: reason,
      ...(headSha !== undefined && headSha !== "" ? { head_sha: headSha } : {}),
      ...(expires !== undefined && expires !== "" ? { expires_at: expires } : {}),
    },
  };
}

/** Injected in unit tests (mock fs); defaults to the real node fs. */
export interface FsLike {
  mkdir(path: string, opts: { recursive: boolean }): Promise<unknown>;
  writeFile(path: string, data: string, opts: { flag: "wx" }): Promise<unknown>;
}

export type SealResult =
  | { ok: true; act_sha256: string; body_sha256: string; path: string; demo: boolean; already_sealed: boolean }
  | { ok: false; status: number; errors: string[] };

/**
 * The single door from UI to disk. Everything else in the studio only
 * computes. Writes the sealed act exactly like the CLI does: JSON + trailing
 * newline, exclusive-create, content-addressed under the acts dir.
 */
export async function sealToDisk(
  raw: unknown,
  opts: { repoRoot: string; fs?: FsLike },
): Promise<SealResult> {
  const fs: FsLike = opts.fs ?? { mkdir, writeFile };
  const checked = validateSealRequest(raw);
  if (!checked.ok) return { ok: false, status: 400, errors: checked.errors };
  const req = checked.req;

  const sealed = sealAct({
    kind: req.kind as Parameters<typeof sealAct>[0]["kind"],
    subject: req.subject,
    scope: req.scope,
    actor: req.mode,
    reason_code: req.reason_code,
    evidence_refs: [],
    id: req.id,
    issued_at: req.issued_at,
    ...(req.head_sha !== undefined ? { head_sha: req.head_sha } : {}),
    ...(req.expires_at !== undefined ? { expires_at: req.expires_at } : {}),
  });
  if (!sealed.ok) return { ok: false, status: 422, errors: sealed.errors.map((e) => `seal refused: ${e}`) };
  const act = sealed.act;

  const dir = join(opts.repoRoot, ACTS_SUBPATH);
  const path = join(dir, `${act.act_sha256}.json`);
  await fs.mkdir(dir, { recursive: true });
  try {
    await fs.writeFile(path, `${JSON.stringify(act, null, 2)}\n`, { flag: "wx" });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("EEXIST")) {
      return { ok: true, act_sha256: act.act_sha256, body_sha256: act.body_sha256, path, demo: req.mode === "demo", already_sealed: true };
    }
    return { ok: false, status: 500, errors: [`failed to write act file: ${message}`] };
  }
  return { ok: true, act_sha256: act.act_sha256, body_sha256: act.body_sha256, path, demo: req.mode === "demo", already_sealed: false };
}
