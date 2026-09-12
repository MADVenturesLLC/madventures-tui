// apps/projector-mc/fixtures/generate-demo.ts
// Regenerates fixtures/demo.json — the sealed projector demo dataset.
//
// Honesty property: every verdict in the fixture is produced through
// makeVerdict (memory gate + claim gate enforced at generation time) against
// memory statuses computed by evaluateMemoryStatus from the sealed rows and
// the simulated current SHAs. The UI cannot render a verdict that the
// factories would refuse to make. All SHAs, evidence refs, and subjects are
// clearly synthetic demo data.
//
//   bun apps/projector-mc/fixtures/generate-demo.ts

import { writeFileSync } from "node:fs";
import { join } from "node:path";

import { makeClaimBoundary } from "@mad/claim-boundary";
import {
  evaluateMemoryStatus,
  parseBuildMemoryRecord,
  sealFixture,
  type BuildMemoryRecord,
  type StoredEntry,
} from "@mad/build-memory";
import { makeVerdict, type EvidenceLink, type VerdictRecord } from "@mad/single-verdict";

const AT = "2026-09-12T12:00:00.000Z";
const sha40 = (s: string) => s.padEnd(40, "0").slice(0, 40);
const sha64 = (s: string) => s.padEnd(64, "0").slice(0, 64);
const PRODUCED_BY = "builder:hephaestus-br";

const SPECS: Array<{
  subject: string;
  recorded?: { head_sha: string; index_tree?: string; verified_at: string; evidence: Array<{ path: string; sha256: string; kind: "argus_packet" | "claim" | "golden" | "log" }> };
  current: { head_sha: string; index_tree?: string };
  invalidated?: { reason: string; at: string };
  build: (memory: { subject: string; status: "VALID" | "STALE" | "UNKNOWN" | "INVALIDATED" } | undefined) => VerdictRecord;
}> = [
  {
    subject: "@madventures/ledger",
    recorded: {
      head_sha: sha40("deadbeef1"),
      index_tree: sha64("cafed00d1"),
      verified_at: AT,
      evidence: [
        { path: "docs/verification/demo-ledger-run.json", sha256: sha64("a11ce5d0"), kind: "argus_packet" },
        { path: "packages/ledger/test/goldens/rebuild.json", sha256: sha64("b0b5e5d0"), kind: "golden" },
      ],
    },
    current: { head_sha: sha40("deadbeef1"), index_tree: sha64("cafed00d1") },
    build: (memory) => makeVerdict({
      verdict: "VERIFY_PASS",
      subject: { name: "@madventures/ledger", sha: sha40("deadbeef1") },
      reason_code: "EVIDENCE_FRESH",
      produced_by: PRODUCED_BY,
      produced_at: AT,
      evidence_refs: [{ ref: { path: "docs/verification/demo-ledger-run.json", sha256: sha64("a11ce5d0"), kind: "argus_packet" }, boundary: makeClaimBoundary("verified") }],
      ...(memory !== undefined ? { memory } : {}),
    }),
  },
  {
    subject: "@madventures/broker",
    recorded: {
      head_sha: sha40("beefcafe1"),
      verified_at: AT,
      evidence: [{ path: "docs/verification/demo-broker-run.json", sha256: sha64("c0ffee00"), kind: "argus_packet" }],
    },
    // head has moved since the record — the memory is STALE by construction
    current: { head_sha: sha40("feedface1") },
    build: () => makeVerdict({
      verdict: "STALE_EVIDENCE",
      subject: { name: "@madventures/broker", sha: sha40("feedface1") },
      reason_code: "EVIDENCE_STALE",
      produced_by: PRODUCED_BY,
      produced_at: AT,
      evidence_refs: [{ ref: { path: "docs/verification/demo-broker-run.json", sha256: sha64("c0ffee00"), kind: "argus_packet" } }],
    }),
  },
  {
    subject: "@mad/claim-boundary",
    recorded: {
      head_sha: sha40("facade110"),
      index_tree: sha64("cabba9e0"),
      verified_at: AT,
      evidence: [
        { path: "docs/verification/demo-claim-run.json", sha256: sha64("ba5eba11"), kind: "argus_packet" },
        { path: "docs/verification/demo-claim-review.md", sha256: sha64("f00dc0de"), kind: "log" },
      ],
    },
    current: { head_sha: sha40("facade110"), index_tree: sha64("cabba9e0") },
    build: (memory) => makeVerdict({
      verdict: "SHIP",
      subject: { name: "@mad/claim-boundary", sha: sha40("facade110") },
      reason_code: "EVIDENCE_FRESH",
      produced_by: PRODUCED_BY,
      produced_at: AT,
      evidence_refs: [{ ref: { path: "docs/verification/demo-claim-run.json", sha256: sha64("ba5eba11"), kind: "argus_packet" }, boundary: makeClaimBoundary("merged") }],
      ...(memory !== undefined ? { memory } : {}),
    }),
  },
  {
    subject: "@mad/build-memory",
    recorded: {
      head_sha: sha40("d00dfeed1"),
      verified_at: AT,
      evidence: [{ path: "packages/build-memory/test/build-memory.test.ts", sha256: sha64("deadf00d"), kind: "golden" }],
    },
    current: { head_sha: sha40("d00dfeed1") },
    // operator retraction — status INVALIDATED regardless of the SHA match
    invalidated: { reason: "demo: evidence retracted by operator", at: AT },
    build: () => makeVerdict({
      verdict: "HOLD",
      subject: { name: "@mad/build-memory", sha: sha40("d00dfeed1") },
      reason_code: "FOUNDER_HOLD",
      produced_by: PRODUCED_BY,
      produced_at: AT,
      evidence_refs: [{ ref: { path: "packages/build-memory/test/build-memory.test.ts", sha256: sha64("deadf00d"), kind: "golden" } }],
    }),
  },
  {
    subject: "@mad/single-verdict",
    // no memory row at all — status UNKNOWN
    current: { head_sha: sha40("abcdef011") },
    build: () => makeVerdict({
      verdict: "SPEC_ONLY",
      subject: { name: "@mad/single-verdict", sha: sha40("abcdef011") },
      reason_code: "SPEC_ONLY_NO_IMPLEMENTATION",
      produced_by: PRODUCED_BY,
      produced_at: AT,
      evidence_refs: [{ ref: { path: "docs/superpowers/specs/demo-single-verdict.md", sha256: sha64("5eedf00d"), kind: "log" } }],
    }),
  },
  {
    subject: "apps/projector-mc",
    recorded: {
      head_sha: sha40("0abcdef01"),
      index_tree: sha64("0dd5eed1"),
      verified_at: AT,
      evidence: [{ path: "apps/projector-mc/test/render-model.test.ts", sha256: sha64("fade5eed"), kind: "golden" }],
    },
    current: { head_sha: sha40("0abcdef01"), index_tree: sha64("0dd5eed1") },
    build: (memory) => makeVerdict({
      verdict: "VERIFY_FAIL",
      subject: { name: "apps/projector-mc", sha: sha40("0abcdef01") },
      reason_code: "VERIFY_FAILED",
      produced_by: PRODUCED_BY,
      produced_at: AT,
      evidence_refs: [{ ref: { path: "apps/projector-mc/test/render-model.test.ts", sha256: sha64("fade5eed"), kind: "golden" } }],
      findings: [{ code: "DEMO_FAIL", message: "synthetic failure — demonstrates the rose path" }],
      ...(memory !== undefined ? { memory } : {}),
    }),
  },
];

// ─── Assemble: memory rows, current state, verdicts through the real gates ──

const rows: Record<string, StoredEntry> = {};
const current: Record<string, { head_sha: string; index_tree?: string }> = {};
const verdicts: Record<string, VerdictRecord> = {};

for (const spec of SPECS) {
  current[spec.subject] = spec.current;
  let memory: { subject: string; status: "VALID" | "STALE" | "UNKNOWN" | "INVALIDATED" } | undefined;
  if (spec.recorded === undefined) {
    memory = { subject: spec.subject, status: "UNKNOWN" };
  } else {
    const record: BuildMemoryRecord = parseBuildMemoryRecord({
      subject: spec.subject,
      head_sha: spec.recorded.head_sha,
      verified_at: spec.recorded.verified_at,
      evidence_refs: spec.recorded.evidence,
      ...(spec.recorded.index_tree !== undefined ? { index_tree: spec.recorded.index_tree } : {}),
    } as unknown);
    const entry: StoredEntry = { record };
    if (spec.invalidated !== undefined) entry.invalidated = spec.invalidated;
    rows[spec.subject] = entry;
    memory = { subject: spec.subject, status: evaluateMemoryStatus(entry, spec.subject, spec.current).status };
  }
  verdicts[spec.subject] = spec.build(memory);
}

const demo = {
  schema: "mad.projector-demo/v0",
  generated_at: AT,
  note: "SYNTHETIC DEMO DATA — every subject, SHA, and evidence ref is fabricated for the projector demo; the seals and verdicts are produced by the real libraries.",
  rooms: [
    { id: "plane:ledger", label: "Ledger Plane", subjects: ["@madventures/ledger"] },
    { id: "plane:broker", label: "Broker Plane", subjects: ["@madventures/broker"] },
    { id: "plane:claim", label: "Claim Boundary", subjects: ["@mad/claim-boundary"] },
    { id: "spine:projector", label: "Projector Spine", subjects: ["@mad/build-memory", "@mad/single-verdict", "apps/projector-mc"] },
  ],
  current,
  memory_fixture: sealFixture(rows),
  verdicts,
};

const out = join(import.meta.dir, "demo.json");
writeFileSync(out, `${JSON.stringify(demo, null, 2)}\n`, "utf8");
console.log(`wrote fixtures/demo.json (${String(Object.keys(verdicts).length)} subjects, seal ${demo.memory_fixture.sealed_sha256.slice(0, 16)}…)`);
