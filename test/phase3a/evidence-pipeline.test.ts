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

interface CapturedCommandBlock {
  readonly command: string;
  readonly exitStatus: number;
  readonly stdoutDeclaredBytes: number;
  readonly stdout: string;
  readonly stderrDeclaredBytes: number;
  readonly stderr: string;
}

const BINARY_PATH = "/Users/michaeldaley/.local/bin/agy";

/**
 * Ratified stop and command evidence records establishing that nested
 * `agy plugin <subcommand>` and `agy plugins <subcommand>` treat `--help`,
 * `-h`, and `-help` as positional arguments rather than help flags on
 * `agy 1.4.0` (`DEC-20261016-05` B2, B3 item 3; `DEC-20261016-06` B4).
 */
const RATIFIED_STOP_RECORD_PATH =
  "/Users/michaeldaley/task56-r2-input/builder-stop-r2-reinvestigation.txt";
const RATIFIED_STOP_RECORD_SHA256 =
  "949be70ec95ba91e0500f352306a084861b87d7b246069c0af049bd3a6f04c87";
const RATIFIED_COMMANDS_RECORD_PATH =
  "/Users/michaeldaley/task56-r2-input/builder-step3-commands-r2.txt";
const RATIFIED_COMMANDS_RECORD_SHA256 =
  "a0ab3bba19c2dcb0da4f2e95e89c7d9b5a33bfc63e5cf804fb4afd471f9449d5";

const TOP_LEVEL_HELP_COMMANDS: readonly string[] = [
  `${BINARY_PATH} --help < /dev/null`,
  `${BINARY_PATH} -h < /dev/null`,
  `${BINARY_PATH} help < /dev/null`,
];

const ALL_TWELVE_SUBCOMMANDS: readonly string[] = [
  "agent",
  "agents",
  "changelog",
  "help",
  "install",
  "mcp",
  "mic-serve",
  "models",
  "plugin",
  "plugins",
  "remote-control",
  "update",
];

const FLAG_DOCUMENTED_SUBCOMMANDS: readonly string[] = [
  "agent",
  "agents",
  "changelog",
  "install",
  "mic-serve",
  "models",
];

const MCP_NESTED_SUBCOMMANDS: readonly string[] = [
  "add",
  "remove",
  "list",
  "enable",
  "disable",
];

const REMOTE_CONTROL_NESTED_SUBCOMMANDS: readonly string[] = [
  "start",
  "status",
  "stop",
];

const PLUGIN_SAFE_NESTED_SUBCOMMANDS: readonly string[] = [
  "list",
  "import",
  "install",
  "uninstall",
  "enable",
  "disable",
  "validate",
];

const REQUIRED_HELP_COMMANDS: readonly string[] = [
  ...TOP_LEVEL_HELP_COMMANDS,
  ...ALL_TWELVE_SUBCOMMANDS.map((sub) => `${BINARY_PATH} help ${sub} < /dev/null`),
  ...FLAG_DOCUMENTED_SUBCOMMANDS.flatMap((sub) => [
    `${BINARY_PATH} ${sub} --help < /dev/null`,
    `${BINARY_PATH} ${sub} -h < /dev/null`,
  ]),
  ...MCP_NESTED_SUBCOMMANDS.flatMap((nested) => [
    `${BINARY_PATH} mcp ${nested} --help < /dev/null`,
    `${BINARY_PATH} mcp ${nested} -h < /dev/null`,
    `${BINARY_PATH} help mcp ${nested} < /dev/null`,
  ]),
  ...REMOTE_CONTROL_NESTED_SUBCOMMANDS.flatMap((nested) => [
    `${BINARY_PATH} remote-control ${nested} --help < /dev/null`,
    `${BINARY_PATH} remote-control ${nested} -h < /dev/null`,
    `${BINARY_PATH} help remote-control ${nested} < /dev/null`,
  ]),
  ...PLUGIN_SAFE_NESTED_SUBCOMMANDS.flatMap((nested) => [
    `${BINARY_PATH} help plugin ${nested} < /dev/null`,
    `${BINARY_PATH} plugin help ${nested} < /dev/null`,
    `${BINARY_PATH} help plugins ${nested} < /dev/null`,
    `${BINARY_PATH} plugins help ${nested} < /dev/null`,
  ]),
];

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

function extractCommandCaptures(report: string): readonly CapturedCommandBlock[] {
  const captureRegex =
    /^- \*\*Command:\*\* `([^`\n]+)`\n- \*\*Exit status:\*\* `(-?\d+)`\n- \*\*Stdout \((\d+) bytes\):\*\*\n```text\n([\s\S]*?)```\n- \*\*Stderr \((\d+) bytes\):\*\*\n```text\n([\s\S]*?)```/gm;
  const captures: CapturedCommandBlock[] = [];
  let match: RegExpExecArray | null;
  while ((match = captureRegex.exec(report)) !== null) {
    captures.push({
      command: match[1]!,
      exitStatus: Number(match[2]!),
      stdoutDeclaredBytes: Number(match[3]!),
      stdout: match[4]!,
      stderrDeclaredBytes: Number(match[5]!),
      stderr: match[6]!,
    });
  }
  return captures;
}

function hasKeyRecursive(value: unknown, targetKey: string): boolean {
  if (typeof value !== "object" || value === null) return false;
  if (Array.isArray(value)) {
    return value.some((item) => hasKeyRecursive(item, targetKey));
  }
  if (Object.prototype.hasOwnProperty.call(value, targetKey)) return true;
  return Object.values(value as Record<string, unknown>).some((nested) =>
    hasKeyRecursive(nested, targetKey),
  );
}

function assertNoUnacceptedIdentityClaim(text: string): void {
  const clauses = text.split(/(?:[.!?](?=\s|$)\s*|\n+)/);
  for (const clause of clauses) {
    if (
      /(?:^|[^A-Za-z0-9_])(?:config get model|init\.model|--model|requested-model echo)\b/i.test(
        clause,
      ) &&
      /\b(?:pass(?:es|ing)?|accept(?:s|ed|able|ing)?|qualif(?:y|ies|ied|ying)|satisf(?:y|ies|ied|ying)|valid|sufficient)\b/i.test(
        clause,
      )
    ) {
      expect(clause).toMatch(
        /\b(?:no|not|never|neither|nor|none|cannot|fails?|failing|failed|ineligible|rejected|omits?|omitted|absent|unaccepted)\b/i,
      );
      expect(clause).not.toMatch(
        /(?:^|[,;:]|\b(?:and|but|while|whereas|yet|however|so|because|since|although|though|therefore|thus|hence)\b)\s*(?!(?:neither|nor|no|not)\b)(?:[-*]\s+)?(?:the\s+|a\s+|an\s+)?(?:agy\s+)?[`"']?(?:config get model|init\.model|--model|requested-model echo)[`"']?(?:\s+flag)?\s+(?:is|are|was|were)?\s*(?!(?:not|never|neither|fails?\s+to\s+be|ineligible\s+as)\b)(?:accepted|passing|valid|sufficient)\b/i,
      );
      expect(clause).not.toMatch(
        /(?:^|[,;:]|\b(?:and|but|while|whereas|yet|however|so|because|since|although|though|therefore|thus|hence)\b)\s*(?!(?:neither|nor|no|not)\b)(?:[-*]\s+)?(?:the\s+|a\s+|an\s+)?(?:agy\s+)?[`"']?(?:config get model|init\.model|--model|requested-model echo)[`"']?(?:\s+flag)?\s+(?!(?:does|do|did)?\s*(?:not|never|fails?\s+to)\b)(?:pass(?:es)?|qualif(?:y|ies)|satisf(?:y|ies))\b/i,
      );
      expect(clause).not.toMatch(
        /(?<!\b(?:neither|nor|no|not|never)\s+(?:(?:the|a|an|any)\s+)?(?:agy\s+)?[`"']?)(?<!\bnor\s+(?:any\s+)?[`"']?(?:config get model|init\.model|--model|requested-model echo)[`"']?(?:\s+flag)?\s+or\s+(?:(?:the|a|an|any)\s+)?(?:agy\s+)?[`"']?)(?:config get model|init\.model|--model|requested-model echo)\b[`"']?(?:\s+flag)?\)?(?:\s+(?!not\b|never\b|neither\b|nor\b|none\b|cannot\b|fails?\b|failing\b|failed\b|ineligible\b|rejected\b|unaccepted\b)[`"'\w()-]+){0,6}\s+\b(?:accept(?:s|ed|able|ing)?|pass(?:es|ing)?|qualif(?:y|ies|ied|ying)|satisf(?:y|ies|ied|ying)|valid|sufficient)\b/i,
      );
    }
  }
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
  expect(record.identity_attestation.result).toBe("fail");
  expect(blockBytes).toBe(JSON.stringify(record));

  const storedFileBytes = `${blockBytes}\n`;
  const computedSha256 = createHash("sha256").update(storedFileBytes, "utf8").digest("hex");

  expect(recordedFilename).toBe(capabilityRecordFilename(record));
  expect(recordedSha256).toBe(computedSha256);

  expect(report).not.toMatch(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
  expect(report).not.toMatch(/\bsk-[A-Za-z0-9_-]{8,}/);
  expect(report).not.toMatch(/\bya29\.[A-Za-z0-9._-]+/);
  expect(report).not.toMatch(/\bAIza[0-9A-Za-z_-]{20,}/);

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

  const streamHeaderRegex = /^- \*\*(Stdout|Stderr) \((\d+) bytes\):\*\*\n```text\n([\s\S]*?)```/gm;
  let streamHeaderCount = 0;
  let streamMatch: RegExpExecArray | null;
  while ((streamMatch = streamHeaderRegex.exec(report)) !== null) {
    streamHeaderCount += 1;
    const declaredBytes = Number(streamMatch[2]!);
    const content = streamMatch[3]!;
    expect(Buffer.byteLength(content, "utf8")).toBe(declaredBytes);
  }

  const captures = extractCommandCaptures(report);
  expect(captures.length).toBeGreaterThan(0);
  expect(streamHeaderCount).toBe(captures.length * 2);

  for (const capture of captures) {
    expect(Buffer.byteLength(capture.stdout, "utf8")).toBe(capture.stdoutDeclaredBytes);
    expect(Buffer.byteLength(capture.stderr, "utf8")).toBe(capture.stderrDeclaredBytes);
  }

  const byCommand = new Map<string, CapturedCommandBlock[]>();
  for (const capture of captures) {
    const list = byCommand.get(capture.command) ?? [];
    list.push(capture);
    byCommand.set(capture.command, list);
  }

  const whichCmd = "command -v agy < /dev/null";
  const shasumCmd = `shasum -a 256 ${record.binary_path} < /dev/null`;
  const versionCmd = `${record.binary_path} --version < /dev/null`;

  const whichCaptures = byCommand.get(whichCmd) ?? [];
  expect(whichCaptures.length).toBeGreaterThanOrEqual(2);
  for (const c of whichCaptures) {
    expect(c.exitStatus).toBe(0);
    expect(c.stdout).toBe(`${record.binary_path}\n`);
  }

  const shasumCaptures = byCommand.get(shasumCmd) ?? [];
  expect(shasumCaptures.length).toBeGreaterThanOrEqual(2);
  for (const c of shasumCaptures) {
    expect(c.exitStatus).toBe(0);
    expect(c.stdout).toBe(`${record.binary_sha256}  ${record.binary_path}\n`);
  }

  const versionCaptures = byCommand.get(versionCmd) ?? [];
  expect(versionCaptures.length).toBeGreaterThanOrEqual(3);
  for (const c of versionCaptures) {
    expect(c.exitStatus).toBe(0);
    expect(c.stdout).toBe(`${record.cli_version}\n`);
  }

  expect(captures[0]?.command).toBe(whichCmd);
  expect(captures[1]?.command).toBe(shasumCmd);
  expect(captures[2]?.command).toBe(versionCmd);
  expect(captures[captures.length - 3]?.command).toBe(whichCmd);
  expect(captures[captures.length - 2]?.command).toBe(shasumCmd);
  expect(captures[captures.length - 1]?.command).toBe(versionCmd);

  for (const helpCmd of REQUIRED_HELP_COMMANDS) {
    const found = byCommand.get(helpCmd) ?? [];
    expect(found.length).toBe(1);
  }

  // Per DEC-20261016-05 B2, B3 item 3 and DEC-20261016-06 B4, the ratified stop
  // and command evidence records establish that passing --help, -h, or -help to
  // nested `agy plugin <subcommand>` or `agy plugins <subcommand>` invokes
  // subcommand handlers with those flags as positional arguments (e.g.
  // `plugins.(*Manager).Uninstall`). Those forms are prohibited from execution
  // and the committed report must cite both ratified evidence records and their
  // SHA-256 digests.
  expect(report).toContain(RATIFIED_STOP_RECORD_PATH);
  expect(report).toContain(RATIFIED_STOP_RECORD_SHA256);
  expect(report).toContain(RATIFIED_COMMANDS_RECORD_PATH);
  expect(report).toContain(RATIFIED_COMMANDS_RECORD_SHA256);
  for (const capture of captures) {
    expect(capture.command).not.toMatch(/\/agy\s+plugins?\s+\S+\s+(?:--help|-h|-help)\b/);
  }
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
    "Spec section 2.2 requires either a documented CLI or API primitive returning the resolved provider and exact model for the actual session, or structured per-session or per-response metadata naming the provider and exact model actually used.",
  );
  expect(facts).toContain("Neither clause is met");
  expect(facts).toContain("config get model");
  expect(facts).toContain("init.model");
  expect(report).toContain(
    "**Failing identity evidence (all of these):** configuration files; requested flags or environment values",
  );

  assertNoUnacceptedIdentityClaim(facts);
  assertNoUnacceptedIdentityClaim(report);

  const captures = extractCommandCaptures(report);
  const structuredCaptures = captures.filter(
    (c) =>
      c.command.includes("--output-format json") ||
      c.command.includes("--output-format stream-json"),
  );
  expect(structuredCaptures.length).toBe(4);

  if (record.identity_attestation.result === "fail" || record.overall === "fail") {
    for (const capture of structuredCaptures) {
      expect(capture.stdout).not.toMatch(/"provider"\s*:/);
      const lines = capture.stdout
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
      expect(lines.length).toBeGreaterThan(0);
      for (const line of lines) {
        const parsedLine = JSON.parse(line) as unknown;
        expect(hasKeyRecursive(parsedLine, "provider")).toBe(false);
      }
    }
  }
});
