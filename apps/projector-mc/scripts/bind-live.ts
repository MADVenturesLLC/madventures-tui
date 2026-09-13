#!/usr/bin/env bun
// apps/projector-mc/scripts/bind-live.ts
// `projector:bind-demo` — the one-shot live-bind path.
//
// Records a LOCAL Argus handoff packet into @mad/build-memory for the
// configured spine subjects, then regenerates the projector's live-state
// snapshot (apps/projector-mc/public/live-state.json) from the real store.
//
// Zero-spawn design: the script consumes @mad/build-memory's public library
// API (JsonFileMemoryStore, evaluateMemoryStatus, parseBuildMemoryRecord)
// and its existing currentGitHeadSha helper — the same audited code the
// mad-build-memory CLI itself is built on. No subprocess is started here,
// no shell exists in this surface, and no network call is made. Local files
// + git only.
//
// Path discipline: the script runs from the repo root (verified by reading
// ./package.json) and touches ONLY these literal relative paths:
//   .mad/build-memory.json                    (memory store, read/write)
//   .mad/projector/verdicts.json              (optional verdicts, read)
//   apps/projector-mc/public/live-state.json  (snapshot, written)
// No path is ever derived, joined, or normalized from runtime values. The
// one absolute path is the Founder-supplied Argus packet, which is
// validated (clean absolute POSIX path, no "..", no ":", no control
// characters) and only ever READ (via Bun.file, after validation).
//
// It NEVER fabricates: a missing packet, a missing sha, or a sha mismatch
// exits 1 without recording; a missing store produces an empty snapshot the
// UI renders as an honest empty state.
//
// usage (from the repo root):
//   MADV_ARGUS_PACKET=/abs/path/to/packet.md MADV_ARGUS_SHA256=<64hex> \
//     bun run projector:bind-demo
//   bun apps/projector-mc/scripts/bind-live.ts --refresh   # re-snapshot only, no recording
//
// Optional: MADV_PROJECTOR_SUBJECTS=a,b overrides the default spine subject
// list. Subjects must pass the same charset gate build-memory subjects use.

import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";

import {
  currentGitHeadSha,
  JsonFileMemoryStore,
} from "@mad/build-memory/node";
import {
  evaluateMemoryStatus,
  EVIDENCE_REF_KINDS,
  isValidHeadSha,
  parseBuildMemoryRecord,
  validateEvidenceRef,
  type BuildMemoryRecord,
  type EvidenceRef,
  type MemoryStatusResult,
} from "@mad/build-memory";
import { assertDisplayable } from "@mad/single-verdict";

import { LIVE_STATE_SCHEMA, type LiveStateSnapshot, type LiveSubjectStatus } from "../src/lib/live";

/** The three Projector Spine subjects (mirror of the fixture's spine room). */
export const SPINE_SUBJECTS: readonly string[] = ["@mad/build-memory", "@mad/single-verdict", "apps/projector-mc"];

// Literal relative paths from the repo root — never derived, never joined.
export const STORE_PATH = ".mad/build-memory.json";
export const VERDICTS_FILE = ".mad/projector/verdicts.json";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

export function isValidSubject(subject: string): boolean {
  // Scoped package names start with "@" (e.g. @mad/build-memory); the leading
  // dash is still refused so a subject can never be mistaken for a flag.
  return /^[A-Za-z0-9@][A-Za-z0-9._@/-]{0,127}$/.test(subject);
}

/** Verify the process is running from the madventures-tui repo root. */
export function requireRepoRootCwd(): void {
  let pkg: { name?: unknown };
  try {
    pkg = JSON.parse(readFileSync("package.json", "utf8")) as { name?: unknown };
  } catch {
    fail("cannot read ./package.json — run this script from the repo root (`bun run projector:bind-demo`)");
  }
  if (pkg.name !== "madventures-tui") {
    fail("this is not the madventures-tui repo root — run this script from the repo root (`bun run projector:bind-demo`)");
  }
}

/**
 * Validate the Founder-supplied packet path: an existing regular file given
 * as a clean absolute POSIX path — no ".." segments, no control characters,
 * no ":" (which would corrupt the <kind>:<path>:<sha256> evidence triple).
 * The packet may live anywhere on disk (it is Founder evidence, not repo
 * content), but it must be named exactly, never reached through traversal.
 */
export function resolvePacketPath(raw: string): string {
  if (!raw.startsWith("/")) {
    fail(`MADV_ARGUS_PACKET must be an absolute path, got ${JSON.stringify(raw)}`);
  }
  if (raw.split("/").includes("..") || /[\0\r\n\t:]/.test(raw)) {
    fail(`MADV_ARGUS_PACKET must be a clean path (no "..", ":", or control characters), got ${JSON.stringify(raw)}`);
  }
  const normalized = "/" + raw.split("/").filter((p) => p.length > 0).join("/");
  if (!existsSync(normalized) || !statSync(normalized).isFile()) {
    fail(`packet not found: ${normalized} — refusing to fabricate evidence.`);
  }
  return normalized;
}

/** Same strict triple the mad-build-memory CLI parses for --evidence. */
export function parseEvidenceRef(raw: string): EvidenceRef {
  const parts = raw.split(":");
  if (parts.length !== 3) fail(`--evidence must be <kind>:<path>:<sha256>, got ${JSON.stringify(raw)}`);
  const kind = parts[0] ?? "";
  const path = parts[1] ?? "";
  const sha = parts[2] ?? "";
  if (kind.length === 0 || path.length === 0 || !/^[0-9a-f]{64}$/.test(sha)) {
    fail(`--evidence must be <kind>:<path>:<sha256> with a 64-hex sha256, got ${JSON.stringify(raw)}`);
  }
  if (!(EVIDENCE_REF_KINDS as readonly string[]).includes(kind)) {
    fail(`evidence kind ${JSON.stringify(kind)} is outside the closed set [${EVIDENCE_REF_KINDS.join(", ")}]`);
  }
  const ref: EvidenceRef = { kind: kind as EvidenceRef["kind"], path, sha256: sha };
  const issues = validateEvidenceRef(ref, "evidence");
  if (issues.length > 0) fail(`invalid evidence ref: ${issues[0]?.message ?? "unknown"}`);
  return ref;
}

/** sha256 of a file via Bun's native file + hasher (path pre-validated). */
export async function sha256File(path: string): Promise<string> {
  const hasher = new Bun.CryptoHasher("sha256");
  hasher.update(await Bun.file(path).arrayBuffer());
  return hasher.digest("hex");
}

/** Record through the same store API the CLI's record command uses. */
export function recordSubject(subject: string, head: string, evidence: EvidenceRef, store: JsonFileMemoryStore): BuildMemoryRecord {
  const record = parseBuildMemoryRecord({
    subject,
    head_sha: head,
    verified_at: new Date().toISOString(),
    evidence_refs: [evidence],
  });
  store.write(record);
  return record;
}

/** Statuses computed by build-memory's own evaluateMemoryStatus. */
export function collectSubjectStatuses(subjects: readonly string[], head: string, store: JsonFileMemoryStore | null): MemoryStatusResult[] {
  return subjects.map((subject) => {
    if (store === null) {
      return { subject, status: "UNKNOWN" as const, reason_code: "RECORD_MISSING", current_head_sha: head };
    }
    const entry = store.lookup(subject);
    return evaluateMemoryStatus(entry, subject, { head_sha: head });
  });
}

/**
 * Load the optional local verdicts file (.mad/projector/verdicts.json).
 * A verdict is kept only if it passes assertDisplayable, names its subject,
 * and is bound to the current head — anything else is skipped with a printed
 * reason, never silently displayed.
 */
export function collectVerdicts(head: string): { verdicts: Record<string, unknown>; skipped: number } {
  if (!existsSync(VERDICTS_FILE)) return { verdicts: {}, skipped: 0 };
  const raw: unknown = JSON.parse(readFileSync(VERDICTS_FILE, "utf8"));
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) fail(`verdicts file ${VERDICTS_FILE} must be an object keyed by subject`);
  const out: Record<string, unknown> = {};
  let skipped = 0;
  for (const [subject, value] of Object.entries(raw as Record<string, unknown>)) {
    try {
      const record = assertDisplayable(value);
      if (record.subject.name !== subject) {
        console.log(`skipping verdict keyed ${subject}: record names ${record.subject.name}`);
        skipped += 1;
        continue;
      }
      if (record.subject.sha !== head) {
        console.log(`skipping verdict for ${subject}: bound to head ${record.subject.sha.slice(0, 10)}…, current head is ${head.slice(0, 10)}… — stale evidence is not displayed`);
        skipped += 1;
        continue;
      }
      out[subject] = record;
    } catch (err) {
      console.log(`skipping verdict for ${subject}: not displayable (${err instanceof Error ? err.message.split(";")[0] : "invalid"})`);
      skipped += 1;
    }
  }
  return { verdicts: out, skipped };
}

export function buildSnapshot(head: string, subjects: readonly MemoryStatusResult[], verdicts: Record<string, unknown>, storePresent: boolean): LiveStateSnapshot {
  const rows: LiveSubjectStatus[] = subjects.map((s) => ({
    subject: s.subject,
    status: s.status,
    reason_code: s.reason_code,
    ...(s.recorded_head_sha !== undefined ? { recorded_head_sha: s.recorded_head_sha } : {}),
    ...(s.current_head_sha !== undefined ? { current_head_sha: s.current_head_sha } : {}),
  }));
  return {
    schema: LIVE_STATE_SCHEMA,
    generated_at: new Date().toISOString(),
    store_path: STORE_PATH,
    store_present: storePresent,
    head_sha: isValidHeadSha(head) ? head : fail("internal: head is not a 40-hex sha"),
    subjects: rows,
    verdicts,
  };
}

export async function main(): Promise<void> {
  requireRepoRootCwd();

  const refresh = process.argv.includes("--refresh");
  const envSubjects = process.env["MADV_PROJECTOR_SUBJECTS"];
  const subjects = envSubjects !== undefined && envSubjects.trim().length > 0
    ? envSubjects.split(",").map((s) => s.trim()).filter((s) => s.length > 0)
    : [...SPINE_SUBJECTS];
  if (subjects.length === 0) fail("no subjects configured (MADV_PROJECTOR_SUBJECTS empty?)");
  for (const subject of subjects) {
    if (!isValidSubject(subject)) fail(`invalid subject ${JSON.stringify(subject)} — allowed: [A-Za-z0-9] start, then [A-Za-z0-9._/-], max 128`);
  }

  const head = currentGitHeadSha();
  const storePresent = existsSync(STORE_PATH);
  const store = storePresent ? new JsonFileMemoryStore(STORE_PATH) : null;

  if (!refresh) {
    const packet = process.env["MADV_ARGUS_PACKET"];
    const shaEnv = process.env["MADV_ARGUS_SHA256"];
    if (packet === undefined || packet.trim().length === 0) {
      fail("MADV_ARGUS_PACKET is not set — point it at the local Argus handoff packet (absolute path). Refusing to fabricate evidence.");
    }
    if (shaEnv === undefined || !/^[0-9a-f]{64}$/.test(shaEnv)) {
      fail("MADV_ARGUS_SHA256 must be the packet's sha256 (64 lowercase hex chars). Refusing to fabricate evidence.");
    }
    const packetPath = resolvePacketPath(packet);
    const actual = await sha256File(packetPath);
    if (actual !== shaEnv) {
      fail(`sha256 mismatch: MADV_ARGUS_SHA256 is ${shaEnv} but the file hashes to ${actual} — refusing to record.`);
    }
    const evidence = parseEvidenceRef(`argus_packet:${packetPath}:${shaEnv}`);
    if (store === null) fail(`memory store ${STORE_PATH} does not exist yet — create it with one CLI record first (see README: 'first bind, fresh store')`);
    for (const subject of subjects) {
      const record = recordSubject(subject, head, evidence, store);
      console.log(`recorded ${subject} @ ${record.head_sha.slice(0, 10)}… (store: ${STORE_PATH})`);
    }
  }

  const statuses = collectSubjectStatuses(subjects, head, store);
  const { verdicts } = collectVerdicts(head);
  const snapshot = buildSnapshot(head, statuses, verdicts, store !== null);

  mkdirSync("apps/projector-mc/public", { recursive: true });
  writeFileSync("apps/projector-mc/public/live-state.json", `${JSON.stringify(snapshot, null, 2)}\n`);
  const valid = statuses.filter((s) => s.status === "VALID").length;
  console.log(`wrote apps/projector-mc/public/live-state.json — ${String(statuses.length)} subjects (${String(valid)} VALID), head ${head.slice(0, 10)}…, ${Object.keys(verdicts).length} verdict(s) displayed`);
}

if (import.meta.main) {
  void main();
}
