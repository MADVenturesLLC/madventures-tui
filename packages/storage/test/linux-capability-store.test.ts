import { expect, test } from "bun:test";
import { createHash } from "node:crypto";
import * as fs from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import {
  ADAPTER_REGISTRY, CapabilityRecordError, capabilityRecordFilename,
  evaluateCapabilityFreshness, parseCapabilityRecord,
  type CapabilityRecordV1, type ObservedSurfaceFacts,
} from "@madventures/protocol";
import { CapabilityStoreError, latestFreshRecord, readCapabilityRecords, writeCapabilityRecord } from "../src";

const registration = [...ADAPTER_REGISTRY.values()][0]!;
const REPO = "/fixture/repository";
const WORKTREE = "/fixture/worktree";
const NOW = "2026-09-03T00:00:00.000Z";
const linuxHost = {
  os_name: "Ubuntu", os_version: "26.04 LTS", kernel_release: "7.0.0-fixture",
  reported_model: "fixture-reported-model", adapter_registration: registration.surface,
};
const macHost = {
  arch: "arm64", macos_version: "15.0", macos_build: "24A335",
  bun_version: "1.4.2", bun_path: "/fixture/bin/bun",
  bun_sha256: "b".repeat(64), term: "xterm-256color", shell: "/bin/zsh",
};

function withRoot(run: (root: string) => void): void {
  const root = fs.realpathSync(fs.mkdtempSync(join(tmpdir(), "h2-capability-store-")));
  try { run(root); } finally { fs.rmSync(root, { recursive: true, force: true }); }
}

function raw(overrides: Record<string, unknown> = {}, adapter = registration): Record<string, unknown> {
  return {
    surface: adapter.surface, provider: adapter.provider,
    requested_model: "fixture-requested-model", role_eligibility: ["builder"],
    independence_domain: adapter.independence_domain, organization_id: adapter.organization_id,
    cli_version: adapter.supported_versions[0]!, binary_path: "/fixture/bin/surface",
    binary_sha256: "a".repeat(64), evaluated_at: "2026-09-01T00:00:00.000Z",
    expires_at: "2026-10-01T00:00:00.000Z",
    host: { ...linuxHost, adapter_registration: adapter.surface },
    identity_attestation: { result: "pass", primitive: "fixture-response-model", sanitized_facts: "" },
    auth_readiness: { result: "no_primitive", primitive: null },
    pty: { result: "pass", observed_ms: {} }, independent_review_eligible: true,
    limitations: [], overall: "pass", redaction_rules_applied: [], ...overrides,
  };
}

function record(overrides: Record<string, unknown> = {}, adapter = registration): CapabilityRecordV1 {
  return parseCapabilityRecord(raw(overrides, adapter));
}

function observed(value: CapabilityRecordV1): ObservedSurfaceFacts {
  return { cli_version: value.cli_version, binary_sha256: value.binary_sha256, host: value.host };
}

function write(root: string, value: CapabilityRecordV1): string {
  return writeCapabilityRecord(root, REPO, WORKTREE, value);
}

function select(root: string, value: CapabilityRecordV1, facts = observed(value), now = NOW): CapabilityRecordV1 | null {
  return latestFreshRecord(root, REPO, WORKTREE, value.surface, now, facts);
}

test("Linux selection refuses an operating-system name mismatch", () => withRoot(root => {
  const value = record();
  write(root, value);
  expect(select(root, value, { ...observed(value), host: { ...linuxHost, os_name: "Debian" } })).toBeNull();
}));

test("Linux selection refuses an operating-system version mismatch", () => withRoot(root => {
  const value = record();
  write(root, value);
  expect(select(root, value, { ...observed(value), host: { ...linuxHost, os_version: "26.10" } })).toBeNull();
}));

test("Linux selection refuses a kernel release mismatch", () => withRoot(root => {
  const value = record();
  write(root, value);
  expect(select(root, value, { ...observed(value), host: { ...linuxHost, kernel_release: "7.0.1-fixture" } })).toBeNull();
}));

test("Linux selection refuses an executable SHA-256 mismatch", () => withRoot(root => {
  const value = record();
  write(root, value);
  expect(select(root, value, { ...observed(value), binary_sha256: "c".repeat(64) })).toBeNull();
}));

test("superseded Linux records remain byte for byte and newer is selected", () => withRoot(root => {
  const older = record();
  const newer = record({ evaluated_at: "2026-09-02T00:00:00.000Z", expires_at: "2026-10-02T00:00:00.000Z" });
  const oldPath = write(root, older);
  const oldBytes = fs.readFileSync(oldPath);
  const newPath = write(root, newer);
  const newBytes = fs.readFileSync(newPath);
  expect(newPath).not.toBe(oldPath);
  expect(fs.readdirSync(join(root, "capability", older.surface)).sort()).toEqual([basename(oldPath), basename(newPath)].sort());
  expect(readCapabilityRecords(root, REPO, WORKTREE, older.surface)).toEqual([newer, older]);
  expect(select(root, older)).toEqual(newer);
  const changedOld = record({ overall: "fail", limitations: ["fixture collision attempt"] });
  expect(() => write(root, changedOld)).toThrow(CapabilityStoreError);
  expect(fs.readFileSync(oldPath)).toEqual(oldBytes);
  expect(fs.readFileSync(newPath)).toEqual(newBytes);
  expect(readCapabilityRecords(root, REPO, WORKTREE, older.surface)).toEqual([newer, older]);
}));

test("pre-act macOS bytes read back unchanged with original filename and freshness", () => withRoot(root => {
  // Byte-for-byte pre-H2 evidence is a static fixture, never a live record write.
  const report = fs.readFileSync(new URL("../../../docs/verification/2026-08-12-antigravity-surface-investigation.md", import.meta.url));
  expect(createHash("sha256").update(report).digest("hex")).toBe("843ec841002370d033947ac45c1b2891da12ff059fea706732eda02a4f5c4d2c");
  const section = report.toString().split("## Capability record")[1]!;
  const bytes = section.match(/```json\n([^\n]+)\n```/)![1]! + "\n";
  expect(createHash("sha256").update(bytes).digest("hex")).toBe("0b7e9d47a31d4e9439ad1846f949f57518defcebfe3ef6ab0dbbfa98673ee983");
  const value = parseCapabilityRecord(JSON.parse(bytes));
  const filename = "2026-10-16T20:43:50.078Z-a4502aaf310b.json";
  expect(capabilityRecordFilename(value)).toBe(filename);
  expect(evaluateCapabilityFreshness(value, value.evaluated_at, observed(value))).toEqual({ fresh: true });
  const dir = join(root, "capability", value.surface);
  fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
  const path = join(dir, filename);
  fs.writeFileSync(path, bytes, { flag: "wx", mode: 0o600 });
  expect(readCapabilityRecords(root, REPO, WORKTREE, value.surface)).toEqual([value]);
  expect(select(root, value, observed(value), value.evaluated_at)).toEqual(value);
  expect(fs.readFileSync(path, "utf8")).toBe(bytes);
  expect(fs.readdirSync(dir)).toEqual([filename]);
}));

test("Linux selection is scoped to host surface and full executable hash", () => withRoot(root => {
  const otherAdapter = [...ADAPTER_REGISTRY.values()].find(value => value.surface !== registration.surface)!;
  const values = [
    record(),
    record({ host: { ...linuxHost, os_name: "Debian" } }),
    record({ host: { ...linuxHost, os_version: "26.10" } }),
    record({ host: { ...linuxHost, kernel_release: "7.0.1-fixture" } }),
    record({ binary_sha256: "a".repeat(12) + "c".repeat(52) }),
    record({}, otherAdapter),
  ];
  const paths = values.map(value => write(root, value));
  expect(new Set(paths).size).toBe(values.length);
  for (const value of values) expect(select(root, value)).toEqual(value);
  expect(readCapabilityRecords(root, REPO, WORKTREE, registration.surface)).toHaveLength(5);
  expect(readCapabilityRecords(root, REPO, WORKTREE, otherAdapter.surface)).toHaveLength(1);
}));

test("a newer Linux CLI mismatch does not fall back to a superseded record", () => withRoot(root => {
  const older = record();
  const newer = record({ cli_version: "fixture-new-version", evaluated_at: "2026-09-02T00:00:00.000Z", expires_at: "2026-10-02T00:00:00.000Z" });
  write(root, older);
  write(root, newer);
  expect(select(root, older)).toBeNull();
  expect(select(root, newer)).toEqual(newer);
  expect(readCapabilityRecords(root, REPO, WORKTREE, older.surface)).toEqual([newer, older]);
}));

test("Linux selection refuses records at their horizon and on CLI version drift", () => withRoot(root => {
  const value = record();
  write(root, value);
  expect(select(root, value, observed(value), new Date(Date.parse(value.expires_at) - 1).toISOString())).toEqual(value);
  expect(select(root, value, observed(value), value.expires_at)).toBeNull();
  expect(select(root, value, { ...observed(value), cli_version: "fixture-other-version" })).toBeNull();
}));

test("store selection refuses records of the other operating system", () => {
  for (const [stored, wanted] of [[record(), record({ host: macHost })], [record({ host: macHost }), record()]] as const) {
    withRoot(root => {
      write(root, stored);
      expect(select(root, wanted)).toBeNull();
    });
  }
});

test("mixed and macOS-bearing Linux records are rejected before store creation", () => withRoot(root => {
  for (const host of [{ ...linuxHost, ...macHost }, { ...linuxHost, macos_build: undefined }]) {
    expect(() => write(root, raw({ host }) as unknown as CapabilityRecordV1)).toThrow(CapabilityRecordError);
    expect(fs.readdirSync(root)).toEqual([]);
  }
}));

test("macOS default refusal is preserved while explicit host selection isolates records", () => withRoot(root => {
  const older = record({ host: macHost });
  const newer = record({ host: macHost, binary_sha256: "f".repeat(64), evaluated_at: "2026-09-02T00:00:00.000Z", expires_at: "2026-10-02T00:00:00.000Z" });
  write(root, older);
  write(root, newer);
  expect(select(root, older)).toBeNull();
  expect(select(root, newer)).toEqual(newer);
  expect(latestFreshRecord(root, REPO, WORKTREE, older.surface, NOW, observed(older), { by_host: true })).toEqual(older);
  const otherHost = record({ host: { ...macHost, macos_build: "24A336" }, evaluated_at: "2026-09-02T01:00:00.000Z", expires_at: "2026-10-02T01:00:00.000Z" });
  write(root, otherHost);
  expect(latestFreshRecord(root, REPO, WORKTREE, older.surface, NOW, observed(older), { by_host: true })).toEqual(older);
  expect(select(root, otherHost)).toEqual(otherHost);
}));

test("existing macOS stores retain bytes filenames and descending read order", () => withRoot(root => {
  const older = record({ host: macHost });
  const low = record({ host: macHost, evaluated_at: "2026-09-02T00:00:00.000Z", expires_at: "2026-10-02T00:00:00.000Z" });
  const high = record({ host: macHost, evaluated_at: low.evaluated_at, expires_at: low.expires_at, binary_sha256: "f".repeat(64) });
  const dir = join(root, "capability", older.surface);
  fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
  const snapshots = [older, low, high].map(value => {
    const name = value.evaluated_at + "-" + value.binary_sha256.slice(0, 12) + ".json";
    const bytes = JSON.stringify(value) + "\n";
    fs.writeFileSync(join(dir, name), bytes, { flag: "wx", mode: 0o600 });
    return { name, bytes };
  });
  expect(readCapabilityRecords(root, REPO, WORKTREE, older.surface)).toEqual([high, low, older]);
  for (const { name, bytes } of snapshots) expect(fs.readFileSync(join(dir, name), "utf8")).toBe(bytes);
  expect(fs.readdirSync(dir).sort()).toEqual(snapshots.map(value => value.name).sort());
  expect(select(root, low)).toBeNull();
  expect(select(root, high)).toEqual(high);
}));
