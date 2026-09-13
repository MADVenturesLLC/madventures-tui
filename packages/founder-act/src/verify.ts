// packages/founder-act/src/verify.ts
// Verify pipeline for a FounderAct: shape → hash → revocation → expiry.
//
// Statuses:
//   VALID        — well-formed, hashes intact, not revoked, not expired
//   INVALID      — shape violation or hash mismatch (tampering / wrong schema)
//   REVOKED_REF  — a sibling "<act_sha256>.revoked" marker file exists
//   EXPIRED      — expires_at is in the past
// Precedence: shape/hash failures are INVALID; a revoked act reports
// REVOKED_REF even if also expired (revocation is the stronger state).
//
// Path containment: act files are read only from inside an allowed root
// (the acts directory or the working directory). Tokens are either a
// 64-hex sha (joined as <dir>/<sha>.json) or a clean .json path with no
// ".." segments — nothing outside the allowed roots is ever read.
//
// v0 honesty: VALID proves integrity of the file, not the truth of its
// contents. An act with actor "demo" verifies VALID and is NOT Founder
// authority — callers must check isFounderAct().

import { readFile, stat } from "node:fs/promises";
import { isAbsolute, join, resolve, sep } from "node:path";
import {
  checkHashes,
  isFounderAct,
  validateActBody,
  type SealedActV0,
} from "./act";

export type ActStatus = "VALID" | "INVALID" | "EXPIRED" | "REVOKED_REF";

export interface VerifyResult {
  status: ActStatus;
  act?: SealedActV0;
  path?: string;
  reasons: string[];
  founderAuthored: boolean;
}

export interface VerifyOptions {
  now?: Date;
  kindNameAllowlist?: string[];
}

export function verifyAct(
  raw: unknown,
  opts: VerifyOptions = {},
): VerifyResult {
  const now = opts.now ?? new Date();

  const shape = validateActBody(
    raw,
    opts.kindNameAllowlist !== undefined ? { kindNameAllowlist: opts.kindNameAllowlist } : {},
  );
  if (!shape.ok) {
    return { status: "INVALID", reasons: shape.errors, founderAuthored: false };
  }

  const hashes = checkHashes(raw as Record<string, unknown>);
  if (!hashes.ok) {
    return { status: "INVALID", reasons: hashes.errors, founderAuthored: false };
  }

  const act = hashes.act;
  const founderAuthored = isFounderAct(act);

  if (act.expires_at !== undefined && Date.parse(act.expires_at) < now.getTime()) {
    return { status: "EXPIRED", act, reasons: [`expired at ${act.expires_at}`], founderAuthored };
  }

  return { status: "VALID", act, reasons: [], founderAuthored };
}

const SHA256_HEX_PATTERN = /^[0-9a-f]{64}$/;

function isInside(candidate: string, root: string): boolean {
  const c = resolve(candidate);
  const r = resolve(root);
  return c === r || c.startsWith(r + sep);
}

/**
 * Resolve a verify/show token to an act file path under an allowed root.
 * Sha token: <dir>/<sha>.json. Path token: must end in .json, contain no
 * ".." segments, and resolve inside dir or cwd. Anything else is refused —
 * the CLI reads acts, not arbitrary files.
 */
export async function resolveActToken(
  token: string,
  dir: string,
  extraRoots: string[] = [process.cwd()],
): Promise<{ path: string } | { error: string }> {
  if (SHA256_HEX_PATTERN.test(token)) {
    const path = join(resolve(dir), `${token}.json`);
    try {
      await stat(path);
      return { path };
    } catch {
      return { error: `no act file found for sha ${token} in ${dir}` };
    }
  }
  if (token.includes("\0")) return { error: "act path contains a NUL byte" };
  if (token.split("/").includes("..") || token.split("\\").includes("..")) {
    return { error: 'act path must not contain ".." segments' };
  }
  if (!token.endsWith(".json")) {
    return { error: "act path must end in .json (or pass a 64-hex sha)" };
  }
  const resolved = isAbsolute(token) ? resolve(token) : resolve(process.cwd(), token);
  const roots = [dir, ...extraRoots];
  if (!roots.some((root) => isInside(resolved, root))) {
    return { error: `act path is outside the allowed directories (${roots.join(", ")})` };
  }
  try {
    await stat(resolved);
    return { path: resolved };
  } catch {
    return { error: `act file not found: ${token}` };
  }
}

export async function verifyActFile(
  path: string,
  opts: VerifyOptions = {},
): Promise<VerifyResult> {
  let text: string;
  try {
    text = await readFile(path, "utf8");
  } catch (err) {
    return { status: "INVALID", path, reasons: [`unreadable act file: ${String(err)}`], founderAuthored: false };
  }

  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch (err) {
    return { status: "INVALID", path, reasons: [`act file is not valid JSON: ${String(err)}`], founderAuthored: false };
  }

  const result = verifyAct(raw, opts);
  return { ...result, path };
}

/**
 * Revocation is checked at the filesystem layer: a sibling
 * "<act_sha256>.revoked" marker file (any content) flips a VALID act to
 * REVOKED_REF. Kept out of verifyAct so the pure core stays fs-free.
 */
export async function verifyActFileWithRevocation(
  path: string,
  opts: VerifyOptions = {},
): Promise<VerifyResult & { revokedMarker?: string }> {
  const result = await verifyActFile(path, opts);
  if (result.status !== "VALID" || result.act === undefined) return result;
  const marker = `${path}.revoked`;
  try {
    await stat(marker);
    return {
      ...result,
      status: "REVOKED_REF",
      reasons: [`revocation marker present: ${marker}`],
      revokedMarker: marker,
    };
  } catch {
    return result;
  }
}
