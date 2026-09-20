// packages/honesty-compiler/src/bind.ts
// P2 Evidence bind — every required evidence ref must actually bind, or the
// compile fails closed.
//
//   build_memory   status must be VALID for the subject at the claimed head
//                  (STALE / UNKNOWN / INVALIDATED → FAIL). Live mode also
//                  requires the claimed head to equal the working git HEAD.
//   argus_packet   file must exist under the root and its UTF-8 sha256 must
//                  match the declared sha256.
//   proving_ground challenge id must exist if the package is present; when
//                  absent or unverifiable the ref SKIPs with an explicit
//                  reason. A SKIP never satisfies an evidence requirement.
//   test_suite     declared exitCode must be 0. Declared evidence only in
//                  v0 — it is not emitted into verdict refs because it
//                  carries no path/sha256 to cite.
//
// THE STALE GUARD is the `status.status !== "VALID"` check below. Removing
// it must fail the named mutation test in test/honesty-compiler.test.ts.

import { evaluateMemoryStatus, sha256Hex, type EvidenceRef as VerdictEvidenceRef, type MemoryStore, type MemoryStatus } from "@mad/build-memory";
import { resolve } from "node:path";

import type { ClaimIr, EvidenceRef, Issue } from "./ir";
import { confineToRoot, readTextFile } from "./node-io";

export type SkipNote = { claimId: string; refIndex: number; kind: string; reason: string };

/** A verdict-ready evidence ref bound during P2. */
export type BoundVerdictRef = { ref: VerdictEvidenceRef; rung?: string };

export type BoundClaim = {
  index: number;
  claim: ClaimIr;
  verdictRefs: BoundVerdictRef[];
  memory?: { subject: string; status: MemoryStatus; headSha: string };
};

export type BindContext = {
  mode: "fixture" | "live";
  /** build-memory store — sealed fixture store or live JSON store */
  store: MemoryStore;
  /** store file path as recorded in emitted verdict refs */
  storePath: string;
  /** sha256 of the store file's UTF-8 bytes (cited in verdict refs) */
  storeSha256: string;
  /** live mode: the working git HEAD; fixture mode: null (sealed world) */
  headSha: string | null;
  /** confinement root */
  rootDir: string;
  /** directory of the claims input — argus paths resolve against it */
  inputDir: string;
};

export type BindResult = {
  bounds: BoundClaim[];
  issues: Issue[];
  skips: SkipNote[];
};

const PROVING_GROUND_SPECIFIER = "@mad/proving-ground";

async function loadProvingGround(): Promise<unknown | null> {
  try {
    return await import(PROVING_GROUND_SPECIFIER);
  } catch {
    return null;
  }
}

/** Does the (shape-unknown) proving-ground module know this challenge id? */
function challengeKnown(module: unknown, challengeId: string): boolean | null {
  if (typeof module !== "object" || module === null) return null;
  const rec = module as Record<string, unknown>;
  const candidates = [rec["CHALLENGE_IDS"], rec["CHALLENGES"], rec["challengeIds"], rec["challenges"]];
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      for (const entry of candidate) {
        if (entry === challengeId) return true;
        if (typeof entry === "object" && entry !== null && (entry as Record<string, unknown>)["id"] === challengeId) return true;
      }
      return false;
    }
  }
  return null;
}

function resolveArgusPath(ctx: BindContext, rawPath: string): { path: string } | { issue: Issue } {
  // argus paths are declared relative to the claims input's directory; the
  // joined absolute path is then confined to the root.
  const joined = resolve(ctx.inputDir, rawPath);
  const confined = confineToRoot(ctx.rootDir, joined, "argus_packet path");
  if ("issue" in confined) {
    return { issue: { ...confined.issue, message: `${confined.issue.message} (resolved against the claims input directory)` } };
  }
  return confined;
}

/**
 * P2: bind every evidence ref of every parsed claim. Aggregates issues —
 * a claim may fail for several reasons and the Founder sees all of them.
 */
export async function bindEvidence(claims: readonly ClaimIr[], ctx: BindContext): Promise<BindResult> {
  const issues: Issue[] = [];
  const skips: SkipNote[] = [];
  const bounds: BoundClaim[] = [];
  const provingGround = await loadProvingGround();

  for (let i = 0; i < claims.length; i++) {
    const claim = claims[i];
    if (claim === undefined) continue;
    const path = `claims[${String(i)}]`;
    const verdictRefs: BoundVerdictRef[] = [];
    let boundCount = 0;
    let memory: BoundClaim["memory"];

    for (let r = 0; r < claim.requires.length; r++) {
      const ref = claim.requires[r];
      if (ref === undefined) continue;
      const refPath = `${path}.requires[${String(r)}]`;

      if (ref.kind === "build_memory") {
        if (claim.subject !== undefined && ref.subject !== claim.subject) {
          issues.push({
            code: "MEMORY_SUBJECT_MISMATCH",
            message: `build_memory ref subject "${ref.subject}" does not match claim subject "${claim.subject}"`,
            path: refPath,
          });
          continue;
        }
        if (ctx.mode === "live" && ctx.headSha !== null && ref.headSha !== ctx.headSha) {
          issues.push({
            code: "BIND_HEAD_MISMATCH",
            message: `claim binds headSha ${ref.headSha} but the working head is ${ctx.headSha} — re-bind at the named head`,
            path: refPath,
          });
          continue;
        }
        const entry = ctx.store.lookup(ref.subject);
        // THE STALE GUARD — anything but exact VALID fails closed.
        const status = evaluateMemoryStatus(entry, ref.subject, { head_sha: ref.headSha });
        if (status.status !== "VALID") {
          issues.push({
            code: "EVIDENCE_MEMORY_NOT_VALID",
            message: `build-memory for subject "${ref.subject}" is ${status.status} (${status.reason_code}) at claimed head ${ref.headSha}${status.recorded_head_sha !== undefined ? `, recorded ${status.recorded_head_sha}` : ""} — ${status.status} memory cannot bind`,
            path: refPath,
          });
          continue;
        }
        boundCount += 1;
        if (memory === undefined) memory = { subject: ref.subject, status: "VALID", headSha: ref.headSha };
        const memoryRef: BoundVerdictRef = { ref: { path: ctx.storePath, sha256: ctx.storeSha256, kind: "claim" } };
        if (claim.rung !== undefined) memoryRef.rung = claim.rung;
        verdictRefs.push(memoryRef);
      } else if (ref.kind === "argus_packet") {
        const resolved = resolveArgusPath(ctx, ref.path);
        if ("issue" in resolved) {
          issues.push({ ...resolved.issue, path: refPath });
          continue;
        }
        const file = readTextFile(resolved.path, "argus packet");
        if ("issue" in file) {
          issues.push({ ...file.issue, path: refPath });
          continue;
        }
        const computed = sha256Hex(file.text);
        if (computed !== ref.sha256) {
          issues.push({
            code: "EVIDENCE_SHA_MISMATCH",
            message: `argus packet ${ref.path} hashes to ${computed}, claim declares ${ref.sha256}`,
            path: refPath,
          });
          continue;
        }
        boundCount += 1;
        const argusRef: BoundVerdictRef = { ref: { path: ref.path, sha256: ref.sha256, kind: "argus_packet" } };
        if (claim.rung !== undefined) argusRef.rung = claim.rung;
        verdictRefs.push(argusRef);
      } else if (ref.kind === "proving_ground") {
        const known = challengeKnown(provingGround, ref.challengeId);
        if (known === true) {
          boundCount += 1;
        } else if (known === false) {
          issues.push({
            code: "PROVING_GROUND_CHALLENGE_MISSING",
            message: `proving-ground challenge id "${ref.challengeId}" does not exist`,
            path: refPath,
          });
        } else {
          skips.push({
            claimId: claim.id,
            refIndex: r,
            kind: "proving_ground",
            reason: provingGround === null ? "PROVING_GROUND_PACKAGE_ABSENT" : "PROVING_GROUND_API_UNRECOGNIZED",
          });
        }
      } else {
        if (ref.exitCode !== 0) {
          issues.push({
            code: "EVIDENCE_TEST_FAILED",
            message: `test_suite "${ref.name}" declares exit code ${String(ref.exitCode)} — only exit code 0 may bind`,
            path: refPath,
          });
          continue;
        }
        boundCount += 1;
        // Declared evidence only: no path/sha256 to cite, so this ref is not
        // emitted into verdict evidence_refs (documented v0 constraint).
      }
    }

    if (claim.kind === "ship" || claim.kind === "verify") {
      const hasMemory = claim.requires.some((ref) => ref.kind === "build_memory");
      if (!hasMemory) {
        issues.push({
          code: "MEMORY_REQUIRED_FOR_SHIP_VERIFY",
          message: `claim "${claim.id}" is kind "${claim.kind}" but binds no build_memory ref — a positive claim without SHA-hard memory is a vibe`,
          path: `${path}.requires`,
        });
      }
    }
    if (boundCount === 0 && (claim.kind === "ship" || claim.kind === "verify" || claim.kind === "fixture")) {
      issues.push({
        code: "EVIDENCE_UNBOUND",
        message: `claim "${claim.id}" is kind "${claim.kind}" but no evidence ref bound — under-claiming beats hallucination, unbinding beats neither`,
        path: `${path}.requires`,
      });
    }

    bounds.push({ index: i, claim, verdictRefs, ...(memory !== undefined ? { memory } : {}) });
  }

  return { bounds, issues, skips };
}
