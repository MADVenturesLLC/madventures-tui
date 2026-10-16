import { expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  capabilityRecordFilename,
  evaluateCapabilityFreshness,
  lookupRegistration,
  parseCapabilityRecord,
  parseSurfaceId,
} from "@madventures/protocol";

const REPORT_PATH = join(
  import.meta.dir,
  "..",
  "..",
  "docs",
  "verification",
  "2026-08-12-antigravity-surface-investigation.md",
);

interface ExtractedRecordBlock {
  readonly sectionText: string;
  readonly blocks: readonly string[];
  readonly recordedFilename: string | null;
  readonly recordedSha256: string | null;
}

function readInvestigationReport(): string {
  return readFileSync(REPORT_PATH, "utf8");
}

function extractCapabilityRecordSection(report: string): ExtractedRecordBlock {
  const headingMatch = /^## Capability record\r?\n([\s\S]*?)(?=^## |\z)/m.exec(report);
  if (headingMatch === null) {
    throw new Error("missing '## Capability record' section in investigation report");
  }
  const sectionHeaderIndex = report.indexOf("## Capability record");
  const afterHeader = report.slice(sectionHeaderIndex + "## Capability record".length);
  const nextHeadingMatch = /\r?\n## /.exec(afterHeader);
  const sectionText =
    nextHeadingMatch === null ? afterHeader : afterHeader.slice(0, nextHeadingMatch.index);

  const blocks: string[] = [];
  const fenceRegex = /```json\n([\s\S]*?)\n```/g;
  let match: RegExpExecArray | null;
  while ((match = fenceRegex.exec(sectionText)) !== null) {
    blocks.push(match[1]!);
  }

  const filenameMatch = /\*\*Stored record filename:\*\*\s*`([^`\n]+)`/.exec(sectionText);
  const sha256Match = /\*\*Stored record SHA-256:\*\*\s*`([0-9a-f]{64})`/.exec(sectionText);

  return {
    sectionText,
    blocks,
    recordedFilename: filenameMatch?.[1] ?? null,
    recordedSha256: sha256Match?.[1] ?? null,
  };
}

test("an Antigravity capability record exists and states an explicit overall verdict", () => {
  const report = readInvestigationReport();
  const { blocks } = extractCapabilityRecordSection(report);
  expect(blocks.length).toBe(1);

  const raw = JSON.parse(blocks[0]!) as Record<string, unknown>;
  const record = parseCapabilityRecord(raw);

  const surface = parseSurfaceId("antigravity");
  const registration = lookupRegistration(surface);
  expect(registration).toBeDefined();

  expect(record.surface).toBe(surface);
  expect(record.provider).toBe(registration!.provider);
  expect(record.independence_domain).toBe(registration!.independence_domain);
  expect(record.organization_id).toBe(registration!.organization_id);
  expect(record.requested_model).toBe("gemini-4-argon-high");

  expect(["pass", "fail"]).toContain(record.overall);
  expect(record.overall).toBe("fail");
  expect(record.identity_attestation.result).toBe("fail");
  expect(record.identity_attestation.primitive).toBe("agy config get model");

  expect(record.auth_readiness).toEqual({
    result: "no_primitive",
    primitive: null,
  });
  expect(record.role_eligibility).toEqual([]);
  expect(record.independent_review_eligible).toBe(false);
  expect(record.pty).toEqual({
    result: "fail",
    observed_ms: {},
  });

  expect(
    record.limitations.some(
      (item) => item.includes("9.13") && item.includes("no governed session"),
    ),
  ).toBe(true);
  if (!registration!.supported_versions.includes(record.cli_version)) {
    expect(
      record.limitations.some(
        (item) =>
          item.includes(record.cli_version) &&
          item.includes(registration!.supported_versions[0]!),
      ),
    ).toBe(true);
  }

  expect(record.host.arch).toBe("arm64");
  expect(record.host.bun_version).toBe("1.4.2");
  expect(record.host.bun_path).toBe("/Users/michaeldaley/.bun/bin/bun");
  expect(record.host.bun_sha256).toBe(
    "35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5",
  );

  expect(
    evaluateCapabilityFreshness(record, record.evaluated_at, {
      cli_version: record.cli_version,
      binary_sha256: record.binary_sha256,
      host: record.host,
    }),
  ).toEqual({ fresh: true });
});

test("a failing investigation still persists a record and a report", () => {
  const report = readInvestigationReport();
  const { blocks, recordedFilename, recordedSha256 } = extractCapabilityRecordSection(report);
  expect(blocks.length).toBe(1);

  const blockBytes = blocks[0]!;
  const record = parseCapabilityRecord(JSON.parse(blockBytes) as Record<string, unknown>);
  expect(record.overall).toBe("fail");
  expect(blockBytes).toBe(JSON.stringify(record));

  const storedFileBytes = `${blockBytes}\n`;
  const computedSha256 = createHash("sha256").update(storedFileBytes, "utf8").digest("hex");

  expect(recordedFilename).toBe(capabilityRecordFilename(record));
  expect(recordedSha256).toBe(computedSha256);

  expect(report).toContain(record.binary_path);
  expect(report).toContain(record.binary_sha256);
  expect(report).toContain(record.cli_version);
  expect(report).toContain(record.evaluated_at);
  expect(report).toContain(record.expires_at);
  expect(report).toContain(
    "a documented CLI or API primitive returning the resolved provider and exact model for the actual session",
  );
  expect(report).toContain(
    "structured per-session or per-response metadata naming the provider and exact model actually used",
  );
});

test("no configured model string is accepted as identity evidence", () => {
  const report = readInvestigationReport();
  const { blocks } = extractCapabilityRecordSection(report);
  expect(blocks.length).toBe(1);

  const record = parseCapabilityRecord(JSON.parse(blocks[0]!) as Record<string, unknown>);
  expect(record.overall).toBe("fail");
  expect(record.identity_attestation.result).toBe("fail");

  const facts = record.identity_attestation.sanitized_facts;
  expect(facts).toContain(
    "a documented CLI or API primitive returning the resolved provider and exact model for the actual session",
  );
  expect(facts).toContain(
    "structured per-session or per-response metadata naming the provider and exact model actually used",
  );
  expect(facts).toContain("config get model");
  expect(facts).not.toMatch(/config get model[^.\n]*\bpass(?:es|ing)?\b/i);
  expect(facts).not.toMatch(/init\.model[^.\n]*\bpass(?:es|ing)?\b/i);
  expect(facts).not.toMatch(/--model[^.\n]*\bpass(?:es|ing)?\b/i);
});
