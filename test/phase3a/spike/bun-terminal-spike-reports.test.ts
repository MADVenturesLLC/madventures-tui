import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { expect, test } from "bun:test";

/**
 * Task 39 Step 1 (plan Task 39, amended 2026-08-21 — Founder ruling, Option A):
 * the report-existence assertion over the two host-authored §6.5 spike reports.
 *
 * Isolation correction 2026-08-21: this file reads report files only. It must
 * not import `./bun-terminal-spike` and must not invoke `runSpike()` — Task
 * 38's test file executes the full host spike at module scope, and putting
 * this assertion there would run the spike on the aggregator before report
 * validation. Imports here are the test runner and filesystem/checksum
 * utilities only.
 */

const REPORT_PATHS = [
  new URL("../../../docs/verification/2026-08-12-bun-terminal-spike-imac.md", import.meta.url),
  new URL("../../../docs/verification/2026-08-12-bun-terminal-spike-macbook.md", import.meta.url),
] as const;

/** `Report SHA-256:` is the report's final line, computed over the body excluding that line. */
const CHECKSUM_TAIL = /^([\s\S]*\n)Report SHA-256: ([0-9a-f]{64})\n?$/;

test("both dual-host spike reports exist, name the same SHA, and carry a checksum", () => {
  const reports = REPORT_PATHS.map((url) => {
    const content = readFileSync(url, "utf8"); // ENOENT here is the expected RED before the reports exist

    const shaLines = content.match(/^Candidate SHA: ([0-9a-f]{40})$/m);
    if (!shaLines) throw new Error(`${url.pathname} carries no full-SHA "Candidate SHA:" line`);
    const candidateSha = shaLines[1];

    const archLine = content.match(/^Architecture: (\S+)$/m);
    if (!archLine) throw new Error(`${url.pathname} carries no "Architecture:" line`);
    const architecture = archLine[1];

    const tail = CHECKSUM_TAIL.exec(content);
    if (!tail) throw new Error(`${url.pathname} does not end with a "Report SHA-256:" line`);
    const body = tail[1];
    const declared = tail[2];
    if (!body || !declared) throw new Error(`${url.pathname} checksum tail parsed incompletely`);
    const recomputed = createHash("sha256").update(body, "utf8").digest("hex");

    return { candidateSha, architecture, declared, recomputed };
  });

  const [imac, macbook] = reports;
  if (!imac || !macbook) throw new Error("expected exactly two reports");

  // Each report's declared checksum recomputes over its own body.
  expect(imac.recomputed).toBe(imac.declared);
  expect(macbook.recomputed).toBe(macbook.declared);

  // Both reports name the same candidate SHA.
  expect(imac.candidateSha).toBe(macbook.candidateSha);

  // The two architectures are exactly the two supported hosts.
  expect([imac.architecture, macbook.architecture].sort()).toEqual(["arm64", "x86_64"]);
});
