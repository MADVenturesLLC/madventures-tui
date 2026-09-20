// packages/honesty-compiler/scripts/seal-fixtures.ts
// One-shot sealer for the package's sealed fixtures. Run from the repo root:
//   bun packages/honesty-compiler/scripts/seal-fixtures.ts
// Rewrites fixtures/build-memory/fixture-store.json with a fresh seal over
// the rows below. The rows are synthetic fixture data only — no live
// system state, no real subjects, no real packets.

import { readFileSync, writeFileSync } from "node:fs";

import { sealFixture, sha256Hex, type StoredEntry } from "@mad/build-memory";

const PACKET_PATH = "packages/honesty-compiler/fixtures/argus/packet-honest.json";
const OUT_PATH = "packages/honesty-compiler/fixtures/build-memory/fixture-store.json";

const VALID_HEAD = "5eedcafe5eedcafe5eedcafe5eedcafe5eedcafe";

const packetSha = sha256Hex(readFileSync(PACKET_PATH, "utf8"));

const rows: Record<string, StoredEntry> = {
  "example-subject": {
    record: {
      subject: "example-subject",
      head_sha: VALID_HEAD,
      verified_at: "2026-09-13T00:00:00.000Z",
      evidence_refs: [{ path: PACKET_PATH, sha256: packetSha, kind: "argus_packet" }],
    },
  },
};

const fixture = sealFixture(rows);
writeFileSync(OUT_PATH, `${JSON.stringify(fixture, null, 2)}\n`, "utf8");
process.stdout.write(`sealed ${OUT_PATH}\n  packet sha256: ${packetSha}\n  seal sha256: ${fixture.sealed_sha256}\n`);
