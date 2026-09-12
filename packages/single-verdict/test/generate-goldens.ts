// packages/single-verdict/test/generate-goldens.ts
// Regenerates test/goldens/*.json from the serializer itself — the goldens are
// always authentic serializer output, never hand-written JSON.
//
//   bun packages/single-verdict/test/generate-goldens.ts

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { makeClaimBoundary } from "@mad/claim-boundary";
import { makeVerdict, serializeVerdict, type EvidenceLink } from "../src/index";

const SHA = "a".repeat(40);
const REF = { path: "docs/verification/example.md", sha256: "c".repeat(64), kind: "log" } as const;

function link(rung?: Parameters<typeof makeClaimBoundary>[0]): EvidenceLink {
  return rung === undefined ? { ref: { ...REF } } : { ref: { ...REF }, boundary: makeClaimBoundary(rung) };
}

function base(overrides: Partial<Parameters<typeof makeVerdict>[0]> = {}): Parameters<typeof makeVerdict>[0] {
  return {
    verdict: "HOLD",
    subject: { name: "@madventures/ledger", sha: SHA },
    reason_code: "FOUNDER_HOLD",
    produced_by: "builder:test",
    produced_at: "2026-09-12T00:00:00.000Z",
    evidence_refs: [link()],
    ...overrides,
  };
}

const goldens: Array<[string, ReturnType<typeof makeVerdict>]> = [
  ["ship.golden.json", makeVerdict(base({
    verdict: "SHIP",
    reason_code: "EVIDENCE_FRESH",
    evidence_refs: [link("merged")],
    memory: { subject: "@madventures/ledger", status: "VALID" },
  }))],
  ["verify-pass-with-findings.golden.json", makeVerdict(base({
    verdict: "VERIFY_PASS_WITH_FINDINGS",
    reason_code: "EVIDENCE_FRESH",
    evidence_refs: [link("verified")],
    findings: [{ code: "MINOR_GAP", message: "one golden pending" }],
    memory: { subject: "@madventures/ledger", status: "VALID" },
  }))],
  ["stale-evidence.golden.json", makeVerdict(base({ verdict: "STALE_EVIDENCE", reason_code: "EVIDENCE_STALE" }))],
  ["spec-only.golden.json", makeVerdict(base({ verdict: "SPEC_ONLY", reason_code: "SPEC_ONLY_NO_IMPLEMENTATION" }))],
];

const outDir = join(import.meta.dir, "goldens");
mkdirSync(outDir, { recursive: true });
for (const [name, record] of goldens) {
  writeFileSync(join(outDir, name), `${serializeVerdict(record)}\n`, "utf8");
  console.log(`wrote goldens/${name}`);
}
