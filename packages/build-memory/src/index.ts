// packages/build-memory/src/index.ts
// @mad/build-memory — Verified Build Memory v0.
//
// Durable, SHA-hard memory of what was verified and what is stale, keyed by
// subject (package | app | claim-id). The one rule this library exists to
// enforce: HARD INVALIDATION. If the current head SHA or content hash of a
// subject no longer matches what was recorded, the subject is STALE — never
// silently "still pass". A subject with no record is UNKNOWN. An operator
// retraction is INVALIDATED. Only an exact SHA (and tree, when recorded)
// match is VALID.
//
// Evidence is structured or it is not evidence: every ref is
// (path, sha256, kind) over the closed kind set — free-text-only "proof"
// is unrepresentable.
//
// This entry is isomorphic (browser + bun): zero node imports. The fs-backed
// store lives at the "./node" subpath; the CLI at src/cli.ts.
//
// LIBRARY — NOT PHASE_0 — NOT OCCUPANCY — NOT LEDGER — NOT MISSION CONTROL.
// Zero dependencies. Nothing from room-runtime, broker, pty-host, adapters,
// or any live surface is imported or implied. This package decides nothing
// about authority; it only makes stale evidence look stale.

// ─── Closed vocabularies ─────────────────────────────────────────────────────

export const MEMORY_STATUSES = ["VALID", "STALE", "UNKNOWN", "INVALIDATED"] as const;
export type MemoryStatus = (typeof MEMORY_STATUSES)[number];

export const MEMORY_REASON_CODES = [
  "SHA_MATCH",
  "SHA_MISMATCH",
  "TREE_MISMATCH",
  "SHA_AND_TREE_MISMATCH",
  "RECORD_MISSING",
  "INVALIDATED_BY_OPERATOR",
] as const;
export type MemoryReasonCode = (typeof MEMORY_REASON_CODES)[number];

export const EVIDENCE_REF_KINDS = ["argus_packet", "claim", "golden", "log"] as const;
export type EvidenceRefKind = (typeof EVIDENCE_REF_KINDS)[number];

// ─── Records ─────────────────────────────────────────────────────────────────

export type EvidenceRef = {
  path: string;
  /** sha256 hex of the referenced content — 64 lowercase hex chars */
  sha256: string;
  kind: EvidenceRefKind;
};

export type BuildMemoryRecord = {
  /** Subject id: package | app | claim-id (e.g. "@madventures/ledger", "claim:BUILD_GATE") */
  subject: string;
  /** git commit SHA the subject was verified at — 40 lowercase hex chars */
  head_sha: string;
  /** optional content/tree hash — 64 lowercase hex chars */
  index_tree?: string;
  /** ISO-8601 timestamp of the verification */
  verified_at: string;
  evidence_refs: EvidenceRef[];
  /** optional reference to a @mad/single-verdict verdict for this record */
  verdict_ref?: string;
};

/** What a store returns per subject: the record plus any operator retraction. */
export type StoredEntry = {
  record: BuildMemoryRecord;
  invalidated?: { reason: string; at: string };
};

export type MemoryStatusResult = {
  subject: string;
  status: MemoryStatus;
  reason_code: MemoryReasonCode;
  recorded_head_sha?: string;
  current_head_sha?: string;
};

// ─── sha256 (pure, isomorphic — cross-checked against node:crypto in tests) ──

const SHA256_K = new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]);

export function sha256Hex(content: string): string {
  const msg = new TextEncoder().encode(content);
  const padded = new Uint8Array((msg.length + 9 + 63) & ~63);
  padded.set(msg);
  padded[msg.length] = 0x80;
  const bitLen = msg.length * 8;
  const view = new DataView(padded.buffer);
  view.setUint32(padded.length - 8, Math.floor(bitLen / 0x100000000));
  view.setUint32(padded.length - 4, bitLen >>> 0);

  let h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
  let h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
  const w = new Uint32Array(64);

  for (let offset = 0; offset < padded.length; offset += 64) {
    for (let i = 0; i < 16; i++) w[i] = view.getUint32(offset + i * 4);
    // All w[...] / SHA256_K[...] reads below are in-bounds by loop construction.
    for (let i = 16; i < 64; i++) {
      const wm15 = w[i - 15]!;
      const wm2 = w[i - 2]!;
      const s0 = ((wm15 >>> 7) | (wm15 << 25)) ^ ((wm15 >>> 18) | (wm15 << 14)) ^ (wm15 >>> 3);
      const s1 = ((wm2 >>> 17) | (wm2 << 15)) ^ ((wm2 >>> 19) | (wm2 << 13)) ^ (wm2 >>> 10);
      w[i] = (w[i - 16]! + s0 + w[i - 7]! + s1) >>> 0;
    }
    let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7;
    for (let i = 0; i < 64; i++) {
      const S1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
      const ch = (e & f) ^ (~e & g);
      const t1 = (h + S1 + ch + SHA256_K[i]! + w[i]!) >>> 0;
      const S0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (S0 + maj) >>> 0;
      h = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0;
    }
    h0 = (h0 + a) >>> 0; h1 = (h1 + b) >>> 0; h2 = (h2 + c) >>> 0; h3 = (h3 + d) >>> 0;
    h4 = (h4 + e) >>> 0; h5 = (h5 + f) >>> 0; h6 = (h6 + g) >>> 0; h7 = (h7 + h) >>> 0;
  }
  return [h0, h1, h2, h3, h4, h5, h6, h7].map((x) => x.toString(16).padStart(8, "0")).join("");
}

// ─── Canonical JSON (used for sealing fixtures) ──────────────────────────────

export function canonicalJson(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value) ?? "null";
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([, v]) => v !== undefined)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${canonicalJson(v)}`).join(",")}}`;
}

// ─── Fail-closed validation (claim-boundary idiom: issues, not exceptions) ──

export type BuildMemoryIssueCode =
  | "NOT_AN_OBJECT"
  | "MISSING_SUBJECT"
  | "BAD_SUBJECT"
  | "MISSING_HEAD_SHA"
  | "BAD_HEAD_SHA"
  | "BAD_INDEX_TREE"
  | "MISSING_VERIFIED_AT"
  | "BAD_VERIFIED_AT"
  | "MISSING_EVIDENCE_REFS"
  | "EVIDENCE_REFS_NOT_ARRAY"
  | "BAD_EVIDENCE_REF"
  | "DUPLICATE_EVIDENCE_REF"
  | "BAD_VERDICT_REF"
  | "UNKNOWN_FIELD";

export interface BuildMemoryIssue {
  code: BuildMemoryIssueCode;
  message: string;
  path?: string;
}

const HEAD_SHA_RE = /^[0-9a-f]{40}$/;
const CONTENT_SHA_RE = /^[0-9a-f]{64}$/;

export function isValidHeadSha(value: unknown): value is string {
  return typeof value === "string" && HEAD_SHA_RE.test(value);
}

export function isValidContentSha(value: unknown): value is string {
  return typeof value === "string" && CONTENT_SHA_RE.test(value);
}

function isEvidenceRefKind(value: unknown): value is EvidenceRefKind {
  return typeof value === "string" && (EVIDENCE_REF_KINDS as readonly string[]).includes(value);
}

export function validateEvidenceRef(value: unknown, path: string): BuildMemoryIssue[] {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return [{ code: "BAD_EVIDENCE_REF", message: "evidence ref must be an object", path }];
  }
  const rec = value as Record<string, unknown>;
  const issues: BuildMemoryIssue[] = [];
  if (typeof rec["path"] !== "string" || rec["path"].length === 0) {
    issues.push({ code: "BAD_EVIDENCE_REF", message: "evidence ref needs a non-empty path", path: `${path}.path` });
  }
  if (!isValidContentSha(rec["sha256"])) {
    issues.push({
      code: "BAD_EVIDENCE_REF",
      message: `evidence ref sha256 must be 64 lowercase hex chars, got ${JSON.stringify(rec["sha256"])}`,
      path: `${path}.sha256`,
    });
  }
  if (!isEvidenceRefKind(rec["kind"])) {
    issues.push({
      code: "BAD_EVIDENCE_REF",
      message: `evidence ref kind ${JSON.stringify(rec["kind"])} is outside the closed set [${EVIDENCE_REF_KINDS.join(", ")}]`,
      path: `${path}.kind`,
    });
  }
  for (const key of Object.keys(rec)) {
    if (key !== "path" && key !== "sha256" && key !== "kind") {
      issues.push({ code: "BAD_EVIDENCE_REF", message: `unknown field "${key}" — fail-closed`, path: `${path}.${key}` });
    }
  }
  return issues;
}

/** Validate an unknown value as a BuildMemoryRecord. Empty issues = valid. */
export function validateBuildMemoryRecord(value: unknown): BuildMemoryIssue[] {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return [{ code: "NOT_AN_OBJECT", message: "build-memory record must be an object" }];
  }
  const rec = value as Record<string, unknown>;
  const issues: BuildMemoryIssue[] = [];

  if (!("subject" in rec)) {
    issues.push({ code: "MISSING_SUBJECT", message: "missing subject", path: "subject" });
  } else if (typeof rec["subject"] !== "string" || rec["subject"].length === 0) {
    issues.push({ code: "BAD_SUBJECT", message: "subject must be a non-empty string", path: "subject" });
  }

  if (!("head_sha" in rec)) {
    issues.push({ code: "MISSING_HEAD_SHA", message: "missing head_sha — memory without a SHA is not memory", path: "head_sha" });
  } else if (!isValidHeadSha(rec["head_sha"])) {
    issues.push({ code: "BAD_HEAD_SHA", message: `head_sha must be 40 lowercase hex chars, got ${JSON.stringify(rec["head_sha"])}`, path: "head_sha" });
  }

  if ("index_tree" in rec && rec["index_tree"] !== undefined && !isValidContentSha(rec["index_tree"])) {
    issues.push({ code: "BAD_INDEX_TREE", message: "index_tree must be 64 lowercase hex chars", path: "index_tree" });
  }

  if (!("verified_at" in rec)) {
    issues.push({ code: "MISSING_VERIFIED_AT", message: "missing verified_at", path: "verified_at" });
  } else if (typeof rec["verified_at"] !== "string" || Number.isNaN(Date.parse(rec["verified_at"]))) {
    issues.push({ code: "BAD_VERIFIED_AT", message: "verified_at must be an ISO-8601 timestamp", path: "verified_at" });
  }

  if (!("evidence_refs" in rec)) {
    issues.push({ code: "MISSING_EVIDENCE_REFS", message: "missing evidence_refs — unverified memory is not memory", path: "evidence_refs" });
  } else if (!Array.isArray(rec["evidence_refs"])) {
    issues.push({ code: "EVIDENCE_REFS_NOT_ARRAY", message: "evidence_refs must be an array", path: "evidence_refs" });
  } else {
    const seen = new Set<string>();
    const refs = rec["evidence_refs"] as unknown[];
    for (let i = 0; i < refs.length; i++) {
      const ref = refs[i];
      const refPath = `evidence_refs[${String(i)}]`;
      for (const issue of validateEvidenceRef(ref, refPath)) issues.push(issue);
      if (typeof ref === "object" && ref !== null && !Array.isArray(ref)) {
        const key = canonicalJson(ref);
        if (seen.has(key)) issues.push({ code: "DUPLICATE_EVIDENCE_REF", message: "duplicate evidence ref", path: refPath });
        seen.add(key);
      }
    }
  }

  if ("verdict_ref" in rec && rec["verdict_ref"] !== undefined && (typeof rec["verdict_ref"] !== "string" || rec["verdict_ref"].length === 0)) {
    issues.push({ code: "BAD_VERDICT_REF", message: "verdict_ref must be a non-empty string", path: "verdict_ref" });
  }

  for (const key of Object.keys(rec)) {
    if (key !== "subject" && key !== "head_sha" && key !== "index_tree" && key !== "verified_at" && key !== "evidence_refs" && key !== "verdict_ref") {
      issues.push({ code: "UNKNOWN_FIELD", message: `unknown field "${key}" — fail-closed: records speak only through the closed schema`, path: key });
    }
  }

  return issues;
}

export class BuildMemoryError extends Error {
  readonly issues: readonly BuildMemoryIssue[];
  constructor(issues: readonly BuildMemoryIssue[]) {
    super(`invalid build-memory: ${issues.map((i) => `${i.code}${i.path ? `@${i.path}` : ""} (${i.message})`).join("; ")}`);
    this.name = "BuildMemoryError";
    this.issues = issues;
  }
}

/** Parse and return a canonical record or throw BuildMemoryError. */
export function parseBuildMemoryRecord(value: unknown): BuildMemoryRecord {
  const issues = validateBuildMemoryRecord(value);
  if (issues.length > 0) throw new BuildMemoryError(issues);
  const rec = value as Record<string, unknown>;
  const record: BuildMemoryRecord = {
    subject: rec["subject"] as string,
    head_sha: rec["head_sha"] as string,
    verified_at: rec["verified_at"] as string,
    evidence_refs: rec["evidence_refs"] as EvidenceRef[],
  };
  if (typeof rec["index_tree"] === "string") record.index_tree = rec["index_tree"];
  if (typeof rec["verdict_ref"] === "string") record.verdict_ref = rec["verdict_ref"];
  return record;
}

function parseStoredEntry(value: unknown): StoredEntry {
  if (typeof value !== "object" || value === null) {
    throw new BuildMemoryError([{ code: "NOT_AN_OBJECT", message: "stored entry must be an object" }]);
  }
  const e = value as Record<string, unknown>;
  const stored: StoredEntry = { record: parseBuildMemoryRecord(e["record"]) };
  const inv = e["invalidated"];
  if (typeof inv === "object" && inv !== null) {
    const r = inv as Record<string, unknown>;
    if (typeof r["reason"] === "string" && typeof r["at"] === "string") stored.invalidated = { reason: r["reason"], at: r["at"] };
  }
  return stored;
}

// ─── HARD INVALIDATION: the one pure function everything hangs off ───────────

/**
 * Compute the memory status of a subject. Fail-closed by construction:
 *   no record            → UNKNOWN  (never treated as passing)
 *   operator retraction  → INVALIDATED
 *   head SHA mismatch    → STALE    (SHA_AND_TREE_MISMATCH when both differ)
 *   tree mismatch        → STALE    (finer-grained content check)
 *   exact SHA (+tree)    → VALID
 * Throws on contract-violating inputs (malformed record or current SHA) —
 * a caller must never be able to obtain a quiet wrong answer.
 */
export function evaluateMemoryStatus(
  entry: StoredEntry | null,
  subject: string,
  current: { head_sha: string; index_tree?: string },
): MemoryStatusResult {
  if (!isValidHeadSha(current.head_sha)) {
    throw new BuildMemoryError([{ code: "BAD_HEAD_SHA", message: "current head_sha must be 40 lowercase hex chars", path: "current.head_sha" }]);
  }
  if (current.index_tree !== undefined && !isValidContentSha(current.index_tree)) {
    throw new BuildMemoryError([{ code: "BAD_INDEX_TREE", message: "current index_tree must be 64 lowercase hex chars", path: "current.index_tree" }]);
  }
  if (entry !== null && entry.invalidated === undefined) {
    const issues = validateBuildMemoryRecord(entry.record);
    if (issues.length > 0) throw new BuildMemoryError(issues);
  }

  if (entry === null) {
    return { subject, status: "UNKNOWN", reason_code: "RECORD_MISSING", current_head_sha: current.head_sha };
  }
  if (entry.invalidated !== undefined) {
    return {
      subject,
      status: "INVALIDATED",
      reason_code: "INVALIDATED_BY_OPERATOR",
      recorded_head_sha: entry.record.head_sha,
      current_head_sha: current.head_sha,
    };
  }

  const shaMatches = entry.record.head_sha === current.head_sha;
  const treeMismatch =
    shaMatches && entry.record.index_tree !== undefined && current.index_tree !== undefined && entry.record.index_tree !== current.index_tree;

  if (!shaMatches) {
    const bothDiffer =
      entry.record.index_tree !== undefined && current.index_tree !== undefined && entry.record.index_tree !== current.index_tree;
    return {
      subject,
      status: "STALE",
      reason_code: bothDiffer ? "SHA_AND_TREE_MISMATCH" : "SHA_MISMATCH",
      recorded_head_sha: entry.record.head_sha,
      current_head_sha: current.head_sha,
    };
  }
  if (treeMismatch) {
    return { subject, status: "STALE", reason_code: "TREE_MISMATCH", recorded_head_sha: entry.record.head_sha, current_head_sha: current.head_sha };
  }
  return { subject, status: "VALID", reason_code: "SHA_MATCH", recorded_head_sha: entry.record.head_sha, current_head_sha: current.head_sha };
}

// ─── Stores ──────────────────────────────────────────────────────────────────

export const MEMORY_STORE_FORMAT = "mad.build-memory/v0";

export interface MemoryStore {
  /** Recorded entry for a subject, or null. Never a computed pass/fail. */
  lookup(subject: string): StoredEntry | null;
  write(record: BuildMemoryRecord): void;
  invalidate(subject: string, reason: string): void;
  /** Factual listing — recorded state only, never a computed pass/fail. */
  list(): StoredEntry[];
}

// ─── Sealed fixture mode (no live git, no fs writes) ─────────────────────────

export const MEMORY_FIXTURE_FORMAT = "mad.build-memory-fixture/v0";

export type FixtureFile = {
  format: typeof MEMORY_FIXTURE_FORMAT;
  /** sha256 of canonicalJson(records) — tamper-evidence for demo data */
  sealed_sha256: string;
  records: Record<string, StoredEntry>;
};

/**
 * Build a sealed fixture from plain rows. Sealing recomputes the digest so a
 * projector loading the fixture can prove the rows are exactly what was
 * sealed — a hand-edited "still green" demo row fails the seal.
 */
export function sealFixture(rows: Record<string, StoredEntry>): FixtureFile {
  return { format: MEMORY_FIXTURE_FORMAT, sealed_sha256: sha256Hex(canonicalJson(rows)), records: rows };
}

export class FixtureMemoryStore implements MemoryStore {
  readonly #rows: Record<string, StoredEntry>;
  readonly #sealSha: string;

  private constructor(rows: Record<string, StoredEntry>, sealSha: string) {
    this.#rows = rows;
    this.#sealSha = sealSha;
  }

  /** Parse + verify the seal. Throws BuildMemoryError on tamper or bad rows. */
  static load(value: unknown): FixtureMemoryStore {
    if (typeof value !== "object" || value === null) {
      throw new BuildMemoryError([{ code: "NOT_AN_OBJECT", message: "fixture must be an object" }]);
    }
    const file = value as Record<string, unknown>;
    if (file["format"] !== MEMORY_FIXTURE_FORMAT) {
      throw new BuildMemoryError([{ code: "NOT_AN_OBJECT", message: `fixture format ${JSON.stringify(file["format"])} — expected ${MEMORY_FIXTURE_FORMAT}` }]);
    }
    const recordsRaw = file["records"];
    if (typeof recordsRaw !== "object" || recordsRaw === null) {
      throw new BuildMemoryError([{ code: "NOT_AN_OBJECT", message: "fixture has no records object" }]);
    }
    const rows: Record<string, StoredEntry> = {};
    for (const [subject, entry] of Object.entries(recordsRaw as Record<string, unknown>)) {
      rows[subject] = parseStoredEntry(entry);
    }
    const expected = typeof file["sealed_sha256"] === "string" ? file["sealed_sha256"] : "";
    const actual = sha256Hex(canonicalJson(rows));
    if (expected !== actual) {
      throw new BuildMemoryError([
        { code: "NOT_AN_OBJECT", message: `fixture seal mismatch: expected ${expected || "(none)"}, computed ${actual} — the rows were edited after sealing` },
      ]);
    }
    return new FixtureMemoryStore(rows, actual);
  }

  get seal(): string {
    return this.#sealSha;
  }

  lookup(subject: string): StoredEntry | null {
    return this.#rows[subject] ?? null;
  }

  write(_record: BuildMemoryRecord): void {
    throw new Error("FixtureMemoryStore is read-only — fixtures are sealed evidence, not a live store");
  }

  invalidate(_subject: string, _reason: string): void {
    throw new Error("FixtureMemoryStore is read-only — fixtures are sealed evidence, not a live store");
  }

  list(): StoredEntry[] {
    return Object.values(this.#rows);
  }
}
