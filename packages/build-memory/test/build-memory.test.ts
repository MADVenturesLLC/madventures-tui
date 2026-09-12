// packages/build-memory/test/build-memory.test.ts
// Pins the HARD INVALIDATION contract: match = VALID, mutation = STALE,
// missing = UNKNOWN, retraction = INVALIDATED — plus the structured-evidence
// schema, the sealed fixture, and the pure sha256 (cross-checked against
// node:crypto so the isomorphic implementation cannot silently drift).

import { createHash } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterAll, describe, expect, test } from "bun:test";

import {
  BuildMemoryError,
  canonicalJson,
  evaluateMemoryStatus,
  FixtureMemoryStore,
  isValidContentSha,
  isValidHeadSha,
  parseBuildMemoryRecord,
  sealFixture,
  sha256Hex,
  validateBuildMemoryRecord,
  validateEvidenceRef,
  type BuildMemoryRecord,
  type StoredEntry,
} from "../src/index";
import { confineToCwd, JsonFileMemoryStore } from "../src/node-store";

const SHA_A = "a".repeat(40);
const SHA_B = "b".repeat(40);
const TREE_1 = "1".repeat(64);
const TREE_2 = "2".repeat(64);
const REF_SHA = "c".repeat(64);

function record(overrides: Partial<Record<string, unknown>> = {}): Record<string, unknown> {
  return {
    subject: "@madventures/ledger",
    head_sha: SHA_A,
    verified_at: "2026-09-12T00:00:00.000Z",
    evidence_refs: [{ path: "docs/verification/example.md", sha256: REF_SHA, kind: "log" }],
    ...overrides,
  };
}

function entry(overrides: Partial<Record<string, unknown>> = {}, invalidated?: { reason: string; at: string }): StoredEntry {
  const stored: StoredEntry = { record: parseBuildMemoryRecord(record(overrides)) };
  if (invalidated !== undefined) stored.invalidated = invalidated;
  return stored;
}

// ─── sha256 must agree with node:crypto everywhere ───────────────────────────

describe("sha256Hex (isomorphic implementation)", () => {
  const cases: Array<[string, string]> = [
    ["", "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"],
    ["abc", "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"],
    ["hello unicode 🚀 ✓", ""],
    ["x".repeat(1000), ""],
  ];
  for (const [input, known] of cases) {
    test(`matches node:crypto for ${input.length === 0 ? "empty string" : JSON.stringify(input.slice(0, 20)) + (input.length > 20 ? "…" : "")}`, () => {
      const expected = known === "" ? createHash("sha256").update(input, "utf8").digest("hex") : known;
      expect(sha256Hex(input)).toBe(expected);
    });
  }
});

describe("canonicalJson", () => {
  test("is key-order independent and drops undefined", () => {
    expect(canonicalJson({ b: 1, a: 2 })).toBe(canonicalJson({ a: 2, b: 1 }));
    expect(canonicalJson({ a: 1, z: undefined })).toBe(canonicalJson({ a: 1 }));
    expect(canonicalJson([{ b: 1, a: [true, null] }])).toBe(`[{"a":[true,null],"b":1}]`);
  });
});

// ─── Validation: fail-closed schema ──────────────────────────────────────────

describe("validateBuildMemoryRecord", () => {
  test("accepts a valid record", () => {
    expect(validateBuildMemoryRecord(record())).toEqual([]);
  });

  test("rejects non-objects", () => {
    expect(validateBuildMemoryRecord(null).map((i) => i.code)).toContain("NOT_AN_OBJECT");
    expect(validateBuildMemoryRecord("nope").map((i) => i.code)).toContain("NOT_AN_OBJECT");
  });

  test("rejects missing head_sha — memory without a SHA is not memory", () => {
    const { head_sha: _omitted, ...rest } = record();
    void _omitted;
    expect(validateBuildMemoryRecord(rest).map((i) => i.code)).toContain("MISSING_HEAD_SHA");
  });

  test("rejects a malformed or uppercase head_sha", () => {
    expect(validateBuildMemoryRecord(record({ head_sha: SHA_A.toUpperCase() })).map((i) => i.code)).toContain("BAD_HEAD_SHA");
    expect(validateBuildMemoryRecord(record({ head_sha: SHA_A.slice(1) })).map((i) => i.code)).toContain("BAD_HEAD_SHA");
    expect(isValidHeadSha(SHA_A)).toBe(true);
    expect(isValidHeadSha(SHA_A.slice(0, 39))).toBe(false);
  });

  test("rejects evidence refs outside the closed kind set", () => {
    const issues = validateEvidenceRef({ path: "x", sha256: REF_SHA, kind: "screenshot" }, "evidence_refs[0]");
    expect(issues.map((i) => i.code)).toContain("BAD_EVIDENCE_REF");
    expect(validateEvidenceRef({ path: "x", sha256: "nothex", kind: "log" }, "evidence_refs[0]").map((i) => i.code)).toContain("BAD_EVIDENCE_REF");
    expect(isValidContentSha(REF_SHA)).toBe(true);
  });

  test("rejects unknown fields — fail-closed against stowaway data", () => {
    expect(validateBuildMemoryRecord(record({ vibes: "green" })).map((i) => i.code)).toContain("UNKNOWN_FIELD");
  });

  test("rejects duplicate evidence refs", () => {
    const dupe = record({ evidence_refs: [
      { path: "a", sha256: REF_SHA, kind: "log" },
      { path: "a", sha256: REF_SHA, kind: "log" },
    ] });
    expect(validateBuildMemoryRecord(dupe).map((i) => i.code)).toContain("DUPLICATE_EVIDENCE_REF");
  });

  test("parseBuildMemoryRecord throws BuildMemoryError on invalid input", () => {
    expect(() => parseBuildMemoryRecord(record({ head_sha: "zzz" }))).toThrow(BuildMemoryError);
  });
});

// ─── HARD INVALIDATION: the contract ─────────────────────────────────────────

describe("evaluateMemoryStatus — hard invalidation", () => {
  test("record with matching SHA is VALID", () => {
    const result = evaluateMemoryStatus(entry(), "@madventures/ledger", { head_sha: SHA_A });
    expect(result.status).toBe("VALID");
    expect(result.reason_code).toBe("SHA_MATCH");
  });

  test("mutated SHA is STALE — never silently 'still pass'", () => {
    const result = evaluateMemoryStatus(entry(), "@madventures/ledger", { head_sha: SHA_B });
    expect(result.status).toBe("STALE");
    expect(result.reason_code).toBe("SHA_MISMATCH");
    expect(result.recorded_head_sha).toBe(SHA_A);
    expect(result.current_head_sha).toBe(SHA_B);
  });

  test("mutated SHA and tree is STALE with SHA_AND_TREE_MISMATCH", () => {
    const result = evaluateMemoryStatus(entry({ index_tree: TREE_1 }), "@madventures/ledger", { head_sha: SHA_B, index_tree: TREE_2 });
    expect(result.status).toBe("STALE");
    expect(result.reason_code).toBe("SHA_AND_TREE_MISMATCH");
  });

  test("same SHA but changed tree is STALE (TREE_MISMATCH)", () => {
    const result = evaluateMemoryStatus(entry({ index_tree: TREE_1 }), "@madventures/ledger", { head_sha: SHA_A, index_tree: TREE_2 });
    expect(result.status).toBe("STALE");
    expect(result.reason_code).toBe("TREE_MISMATCH");
  });

  test("missing record is UNKNOWN — never treated as passing", () => {
    const result = evaluateMemoryStatus(null, "claim:NEVER_RECORDED", { head_sha: SHA_A });
    expect(result.status).toBe("UNKNOWN");
    expect(result.reason_code).toBe("RECORD_MISSING");
  });

  test("operator retraction is INVALIDATED regardless of SHA match", () => {
    const result = evaluateMemoryStatus(
      entry({}, { reason: "evidence retracted", at: "2026-09-12T01:00:00.000Z" }),
      "@madventures/ledger",
      { head_sha: SHA_A },
    );
    expect(result.status).toBe("INVALIDATED");
    expect(result.reason_code).toBe("INVALIDATED_BY_OPERATOR");
  });

  test("throws on a malformed current SHA — no quiet wrong answers", () => {
    expect(() => evaluateMemoryStatus(entry(), "@madventures/ledger", { head_sha: "main" })).toThrow(BuildMemoryError);
  });
});

// ─── JSON-file store round-trip ──────────────────────────────────────────────

describe("JsonFileMemoryStore", () => {
  const dir = mkdtempSync(join(tmpdir(), "mad-build-memory-test-"));
  const storePath = join(dir, "build-memory.json");

  afterAll(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  test("write → lookup → invalidate round-trips and persists to disk", () => {
    const store = new JsonFileMemoryStore(storePath);
    store.write(parseBuildMemoryRecord(record({ subject: "apps/demo" })));
    expect(store.lookup("apps/demo")?.record.head_sha).toBe(SHA_A);
    // a fresh store over the same file sees the persisted row
    expect(new JsonFileMemoryStore(storePath).lookup("apps/demo")?.record.head_sha).toBe(SHA_A);

    store.invalidate("apps/demo", "hand retracted for test");
    expect(store.lookup("apps/demo")?.invalidated?.reason).toBe("hand retracted for test");
    expect(evaluateMemoryStatus(store.lookup("apps/demo"), "apps/demo", { head_sha: SHA_A }).status).toBe("INVALIDATED");
  });

  test("refuses to invalidate an unknown subject", () => {
    const store = new JsonFileMemoryStore(join(dir, "empty.json"));
    expect(() => store.invalidate("ghost", "reason")).toThrow(BuildMemoryError);
  });

  test("refuses an invalid record", () => {
    const store = new JsonFileMemoryStore(join(dir, "guard.json"));
    expect(() => store.write({ subject: "", head_sha: SHA_A, verified_at: "nope", evidence_refs: [] } as unknown as BuildMemoryRecord)).toThrow(BuildMemoryError);
  });

  test("lookup of an absent subject returns null (→ UNKNOWN upstream)", () => {
    const store = new JsonFileMemoryStore(join(dir, "empty2.json"));
    expect(store.lookup("absent")).toBeNull();
  });
});

// ─── Sealed fixtures: tamper-evident, no live git ────────────────────────────

describe("sealed fixtures", () => {
  test("seal → load round-trips; tampering breaks the seal", () => {
    const fixture = sealFixture({ "@madventures/ledger": entry({ subject: "@madventures/ledger" }) });
    const store = FixtureMemoryStore.load(JSON.parse(JSON.stringify(fixture)));
    expect(store.lookup("@madventures/ledger")?.record.head_sha).toBe(SHA_A);

    const tampered = JSON.parse(JSON.stringify(fixture)) as Record<string, unknown>;
    const records = tampered["records"] as Record<string, { record: { head_sha: string } }>;
    records["@madventures/ledger"]!.record.head_sha = SHA_B; // hand-edit to "still green"
    expect(() => FixtureMemoryStore.load(tampered)).toThrow(/seal mismatch/);
  });

  test("rejects wrong format and read-only mutation", () => {
    expect(() => FixtureMemoryStore.load({ format: "mad.build-memory/v0", sealed_sha256: "x", records: {} })).toThrow(/fixture format/);
    const store = FixtureMemoryStore.load(sealFixture({ "s": entry({ subject: "s" }) }));
    expect(() => store.write(parseBuildMemoryRecord(record()))).toThrow(/read-only/);
    expect(() => store.invalidate("s", "no")).toThrow(/read-only/);
  });
});

// ─── CLI helpers ─────────────────────────────────────────────────────────────

describe("confineToCwd", () => {
  test("keeps paths inside the working directory", () => {
    expect(confineToCwd(".mad/build-memory.json", "--store").endsWith(".mad/build-memory.json")).toBe(true);
  });

  test("refuses paths that escape the working directory", () => {
    expect(() => confineToCwd("../../etc/passwd", "--store")).toThrow(/working directory/);
  });
});
