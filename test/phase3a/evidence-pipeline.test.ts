import { expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { Database } from "bun:sqlite";
import { Ledger } from "@madventures/ledger";
import { runCli } from "../../apps/madbridge/src/cli";
import { exportEvidenceCommand } from "../../apps/madbridge/src/commands/export-evidence";
import { startFixtureSession, type HarnessSession } from "./runtime-harness";
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
  const clauses = text.split(/(?:(?:\.|\!|\?)(?=\s|$)\s*|(?:;|\n)+)/);
  for (const clause of clauses) {
    if (
      /(?:^|\W)(?:config get model|init\.model|--model|requested-model echo)\b/i.test(
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
        /(?:^|[,;:]|\b(?:and|but|while|whereas|yet|however|so|because|since|although|though|therefore|thus|hence)\b)\s*(?!(?:neither|nor|no|not)\b)(?:[-*]\s+)?(?:the\s+|a\s+|an\s+)?(?:agy\s+)?[`"']?(?:config get model|init\.model|--model|requested-model echo)\b[`"']?(?:\s+flag)?(?:\s|[,:—–-]|\([^)]*\)|\[[^\]]*\]|,[^,]*,)*(?:is|are|was|were)?(?:\s|[,:—–-]|\([^)]*\)|\[[^\]]*\]|,[^,]*,)*(?!(?:not|never|neither|fails?\s+to\s+be|ineligible\s+as)\b)(?:accept(?:ed|able)|passing|valid|sufficient)\b/i,
      );
      expect(clause).not.toMatch(
        /(?:^|[,;:]|\b(?:and|but|while|whereas|yet|however|so|because|since|although|though|therefore|thus|hence)\b)\s*(?!(?:neither|nor|no|not)\b)(?:[-*]\s+)?(?:the\s+|a\s+|an\s+)?(?:agy\s+)?[`"']?(?:config get model|init\.model|--model|requested-model echo)\b[`"']?(?:\s+flag)?(?:\s|[,:—–-]|\([^)]*\)|\[[^\]]*\]|,[^,]*,)*(?!(?:does|do|did)?\s*(?:not|never|fails?\s+to)\b)(?:accept(?:s)?|pass(?:es)?|qualif(?:y|ies)|satisf(?:y|ies))\b/i,
      );
      expect(clause).not.toMatch(
        /(?<!\b(?:neither|nor|no|not|never)\s+(?:(?:the|a|an|any)\s+)?(?:agy\s+)?[`"']?)(?<!\bnor\s+(?:any\s+)?[`"']?(?:config get model|init\.model|--model|requested-model echo)[`"']?(?:\s+flag)?\s+or\s+(?:(?:the|a|an|any)\s+)?(?:agy\s+)?[`"']?)(?:config get model|init\.model|--model|requested-model echo)\b[`"']?(?:\s+flag)?\)?(?:[\s,():—–-]+(?!not\b|never\b|neither\b|nor\b|none\b|cannot\b|fails?\b|failing\b|failed\b|ineligible\b|rejected\b|unaccepted\b)[`"'\w()-]+){0,6}[\s,():—–-]+\b(?:accept(?:s|ed|able|ing)?|pass(?:es|ing)?|qualif(?:y|ies|ied|ying)|satisf(?:y|ies|ied|ying)|valid|sufficient)\b/i,
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

async function closedEvidenceFixture(
  run: (session: HarnessSession, id: string) => Promise<void>,
  fixtureMarker?: string,
  fixturePayload?: Readonly<Record<string, string>>,
): Promise<void> {
  const session = await startFixtureSession({ retainStorage: true, ...(fixtureMarker === undefined ? {} : { fixtureMarker }),
    ...(fixturePayload === undefined ? {} : { fixturePayload }) });
  const previous = process.env.MADV_STORAGE_DIR;
  try {
    const snapshot = await session.client.getSnapshot();
    expect(snapshot.phase).toBe("active");
    if (fixtureMarker !== undefined) {
      const started = performance.now();
      let observed = false;
      while (!observed && performance.now() - started < 5000) {
        const db = new Database(join(session.storage.ledgerDir, "ledger.sqlite3"), { readonly: true });
        try {
          observed = (db.query("SELECT event_json FROM events ORDER BY sequence").all() as { event_json: string }[])
            .some(row => JSON.parse(row.event_json).payload?.text === fixtureMarker);
        } finally { db.close(); }
        if (!observed) await Bun.sleep(5);
      }
      expect(observed, "the marker must reach the ledger through fixture output").toBe(true);
    }
    await session.close();
    process.env.MADV_STORAGE_DIR = session.storage.root;
    await run(session, snapshot.sessionId);
  } finally {
    if (previous === undefined) delete process.env.MADV_STORAGE_DIR;
    else process.env.MADV_STORAGE_DIR = previous;
    await session.close();
    rmSync(dirname(session.storage.root), { recursive: true });
  }
}

test("production verify-ledger validates a fixture-produced ledger", async () => {
  await closedEvidenceFixture(async (_session, id) => {
    const result = await runCli(["verify-ledger", "--session", id, "--json"], { stdin: "", cwd: process.cwd() });
    expect(result.exitCode).toBe(0);
    const output = JSON.parse(result.stdout);
    expect(output.valid).toBe(true);
    expect(output.count).toBeGreaterThan(0);
  });
}, 15000);

test("production export-evidence consumes a fixture-produced session", async () => {
  await closedEvidenceFixture(async (session, id) => {
    const result = await runCli(["export-evidence", "--session", id, "--json"], { stdin: "", cwd: process.cwd() });
    expect(result.exitCode).toBe(0);
    const output = JSON.parse(result.stdout);
    expect(output.outputDir).toBe(session.storage.sanitizedEvidenceDir);
    expect(output.eventCount).toBeGreaterThan(0);
    expect(existsSync(join(output.outputDir, "manifest.json"))).toBe(true);
    const ledger = new Ledger(join(session.storage.ledgerDir, "ledger.sqlite3"));
    try { expect(output.manifest.ledger_head_hash).toBe(ledger.verify().head); }
    finally { ledger.close(); }
  });
}, 15000);

test("exported evidence contains no allowlisted secret value", async () => {
  const marker = "fixture.exact+a$b^value";
  await closedEvidenceFixture(async (session, id) => {
    const result = await exportEvidenceCommand({ session: id }, { cwd: process.cwd(), stdin: "", json: true }, {
      environment: { LANG: marker },
      allowlist: { ref: "fixture-only-exact-value", variables: [{ name: "LANG", required: true, secret: true }] },
    });
    expect(result.exitCode).toBe(0);
    const output = JSON.parse(result.stdout);
    const files = readdirSync(output.outputDir);
    expect(files.length).toBeGreaterThan(0);
    for (const file of files) expect(readFileSync(join(output.outputDir, file), "utf8")).not.toContain(marker);
    expect(readFileSync(join(output.outputDir, "ledger-sanitized.json"), "utf8")).toContain("<redacted:LANG>");
    const manifest = JSON.parse(readFileSync(join(session.storage.sanitizedEvidenceDir, "manifest.json"), "utf8"));
    expect(manifest.redaction_rules_applied).toContain("exact_allowlisted_secret_values");
    expect(manifest.redaction_rules_applied).toContain("secret-value:LANG");
  }, marker);
}, 15000);

for (const kind of ["allowlisted secret", "known token pattern"] as const) {
  test(`exported evidence redacts a ${kind} in nested property keys`, async () => {
    const marker = kind === "allowlisted secret" ? 'fixture.key+a$b^"escaped\\value' : "ghp_" + "x".repeat(36);
    await closedEvidenceFixture(async (session, id) => {
      const ledger = new Ledger(join(session.storage.ledgerDir, "ledger.sqlite3"));
      try {
        const message = ledger.readAfter(0).map(row => JSON.parse(row.event_json)).find(event => event.event_type === "message");
        expect(message.payload).toEqual({ text: marker, [marker]: [{ [marker]: marker }] });
      } finally { ledger.close(); }
      const result = await exportEvidenceCommand({ session: id }, { cwd: process.cwd(), stdin: "", json: true },
        kind === "allowlisted secret" ? {
          environment: { LANG: marker },
          allowlist: { ref: "fixture-only-key-redaction", variables: [{ name: "LANG", required: true, secret: true }] },
        } : undefined);
      expect(result.exitCode).toBe(0);
      const output = JSON.parse(result.stdout);
      for (const file of readdirSync(output.outputDir)) {
        const text = readFileSync(join(output.outputDir, file), "utf8");
        expect(text).not.toContain(marker);
        if (file.endsWith(".json")) expect(() => JSON.parse(text)).not.toThrow();
      }
      const exported = JSON.parse(readFileSync(join(output.outputDir, "ledger-sanitized.json"), "utf8"));
      const message = exported.map((row: { event_json: string }) => JSON.parse(row.event_json))
        .find((event: { event_type: string }) => event.event_type === "message");
      const redacted = kind === "allowlisted secret" ? "<redacted:LANG>" : "[REDACTED]";
      expect(message.payload).toEqual({ text: redacted, [redacted]: [{ [redacted]: redacted }] });
      expect(JSON.parse(readFileSync(join(output.outputDir, "manifest.json"), "utf8")).redaction_rules_applied)
        .toContain(kind === "allowlisted secret" ? "secret-value:LANG" : "known_token_patterns");
    }, marker);
  }, 15000);
}

test("the manifest records which redaction rules ran", async () => {
  await closedEvidenceFixture(async (session, id) => {
    const result = await runCli(["export-evidence", "--session", id, "--json"], { stdin: "", cwd: process.cwd() });
    expect(result.exitCode).toBe(0);
    const manifest = JSON.parse(readFileSync(join(session.storage.sanitizedEvidenceDir, "manifest.json"), "utf8"));
    expect(manifest.redaction_rules_applied).toContain("known_token_patterns");
    expect(manifest.redaction_rules_applied).toContain("exact_allowlisted_secret_values");
    expect(manifest.redaction_rules_applied.some((rule: string) => rule.startsWith("secret-value:"))).toBe(false);
  });
}, 15000);

test("verify-ledger no longer defaults to .madv-runtime", async () => {
  const legacy = mkdtempSync(join(tmpdir(), "task55-legacy-"));
  try {
    const directory = join(legacy, ".madv-runtime", "ledger");
    mkdirSync(directory, { recursive: true });
    new Ledger(join(directory, "ledger.db")).close();
    const result = await runCli(["verify-ledger", "--json"], { stdin: "", cwd: legacy });
    expect(result.exitCode).toBe(1);
    expect(JSON.parse(result.stdout).error).toBe("session_required");
  } finally { rmSync(legacy, { recursive: true }); }
});

test("token-prefixed allowlisted secrets leave no suffix in exported keys or values", async () => {
  const marker = "sk-" + "a".repeat(20) + "_FIXTURE_SUFFIX";
  await closedEvidenceFixture(async (session, id) => {
    const result = await exportEvidenceCommand({ session: id }, { cwd: process.cwd(), stdin: "", json: true }, {
      environment: { LANG: marker },
      allowlist: { ref: "fixture-only-prefixed-value", variables: [
        { name: "LANG", required: true, secret: true },
        { name: "UNSET_FIXTURE", required: false, secret: true },
      ] },
    });
    expect(result.exitCode).toBe(0);
    for (const file of readdirSync(session.storage.sanitizedEvidenceDir)) {
      const text = readFileSync(join(session.storage.sanitizedEvidenceDir, file), "utf8");
      expect(text).not.toContain(marker);
      expect(text).not.toContain("_FIXTURE_SUFFIX");
      if (file.endsWith(".json")) expect(() => JSON.parse(text)).not.toThrow();
    }
    const exported = JSON.parse(readFileSync(join(session.storage.sanitizedEvidenceDir, "ledger-sanitized.json"), "utf8"));
    const message = exported.map((row: { event_json: string }) => JSON.parse(row.event_json))
      .find((event: { event_type: string }) => event.event_type === "message");
    expect(message.payload).toEqual({ text: "<redacted:LANG>", "<redacted:LANG>": [{ "<redacted:LANG>": "<redacted:LANG>" }] });
    const manifest = JSON.parse(readFileSync(join(session.storage.sanitizedEvidenceDir, "manifest.json"), "utf8"));
    expect(manifest.redaction_rules_applied).toEqual([
      "known_token_patterns", "exact_allowlisted_secret_values", "secret-value:LANG",
    ]);
  }, marker);
}, 15000);

test("colliding redacted keys retain every value deterministically", async () => {
  const marker = "ghp_" + "c".repeat(36);
  await closedEvidenceFixture(async (session) => {
    const flags = { ledger: join(session.storage.ledgerDir, "ledger.sqlite3"), output: session.storage.sanitizedEvidenceDir };
    const ctx = { cwd: process.cwd(), stdin: "", json: true };
    expect((await exportEvidenceCommand(flags, ctx)).exitCode).toBe(0);
    const first = readFileSync(join(session.storage.sanitizedEvidenceDir, "ledger-sanitized.json"), "utf8");
    const events = JSON.parse(first).map((row: { event_json: string }) => JSON.parse(row.event_json));
    const payload = events.find((event: { event_type: string }) => event.event_type === "message")?.payload;
    expect(payload).toBeDefined();
    expect(Object.keys(payload)).toHaveLength(4);
    expect(Object.values(payload).sort()).toEqual(["[REDACTED]", "first", "second", "reserved"].sort());
    expect((await exportEvidenceCommand(flags, ctx)).exitCode).toBe(0);
    expect(readFileSync(join(session.storage.sanitizedEvidenceDir, "ledger-sanitized.json"), "utf8")).toBe(first);
    expect(first).not.toContain(marker);
  }, marker, { text: marker, [marker]: "first", [marker + "x"]: "second", "[REDACTED]#2": "reserved" });
}, 15000);

for (const command of ["verify-ledger", "export-evidence"] as const) {
  for (const invalid of ["invalid storage root", "inconsistent HOME"] as const) {
    test(`${command} rejects an ${invalid} without exporting`, async () => {
      await closedEvidenceFixture(async (session, id) => {
        const previousHome = process.env.HOME;
        const previousRoot = process.env.MADV_STORAGE_DIR;
        const output = join(session.storage.sanitizedEvidenceDir, "rejected-export");
        const before = readdirSync(session.storage.root, { recursive: true }).sort();
        try {
          if (invalid === "invalid storage root") process.env.MADV_STORAGE_DIR = "relative-fixture-root";
          else process.env.HOME = join(session.storage.root, "fixture-home-mismatch");
          const result = await runCli([command, "--session", id, "--ledger",
            join(session.storage.ledgerDir, "ledger.sqlite3"), "--output", output, "--json"], { stdin: "", cwd: process.cwd() });
          expect(result.exitCode).toBe(1);
          expect(JSON.parse(result.stdout)).toEqual({ ok: false,
            error: invalid === "invalid storage root" ? "storage_root_invalid:not_absolute" : "storage_root_invalid" });
          expect(existsSync(output)).toBe(false);
          expect(readdirSync(session.storage.root, { recursive: true }).sort()).toEqual(before);
        } finally {
          if (previousHome === undefined) delete process.env.HOME; else process.env.HOME = previousHome;
          if (previousRoot === undefined) delete process.env.MADV_STORAGE_DIR; else process.env.MADV_STORAGE_DIR = previousRoot;
        }
      });
    }, 15000);
  }
}
