import { expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import {
  ADAPTER_REGISTRY,
  CapabilityRecordError,
  capabilityRecordFilename,
  evaluateCapabilityFreshness,
  parseCapabilityRecord,
  type CapabilityRecordV1,
  type ObservedSurfaceFacts,
} from "../src";

const registration = [...ADAPTER_REGISTRY.values()][0]!;
const linuxHost = {
  os_name: "Ubuntu",
  os_version: "26.04 LTS",
  kernel_release: "7.0.0-fixture",
  reported_model: "fixture-reported-model",
  adapter_registration: registration.surface,
};
const macHost = {
  arch: "arm64", macos_version: "15.0", macos_build: "24A335",
  bun_version: "1.4.2", bun_path: "/fixture/bin/bun",
  bun_sha256: "b".repeat(64), term: "xterm-256color", shell: "/bin/zsh",
};

function raw(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    surface: registration.surface, provider: registration.provider,
    requested_model: "fixture-requested-model", role_eligibility: ["builder"],
    independence_domain: registration.independence_domain,
    organization_id: registration.organization_id,
    cli_version: registration.supported_versions[0]!,
    binary_path: "/fixture/bin/surface", binary_sha256: "a".repeat(64),
    evaluated_at: "2026-09-01T00:00:00.000Z", expires_at: "2026-10-01T00:00:00.000Z",
    host: { ...linuxHost },
    identity_attestation: { result: "pass", primitive: "fixture-response-model", sanitized_facts: "" },
    auth_readiness: { result: "no_primitive", primitive: null },
    pty: { result: "pass", observed_ms: {} }, independent_review_eligible: true,
    limitations: [], overall: "pass", redaction_rules_applied: [],
    ...overrides,
  };
}

function record(overrides: Record<string, unknown> = {}): CapabilityRecordV1 {
  return parseCapabilityRecord(raw(overrides));
}

function observed(value: CapabilityRecordV1): ObservedSurfaceFacts {
  return { cli_version: value.cli_version, binary_sha256: value.binary_sha256, host: value.host };
}

function expectRejected(value: Record<string, unknown>): void {
  expect(() => parseCapabilityRecord(value)).toThrow(CapabilityRecordError);
}

test("Linux host fields are exactly B5 facts and parsed records are frozen", () => {
  const input = raw();
  const parsed = parseCapabilityRecord(input);
  expect(Object.keys(parsed.host).sort()).toEqual([
    "adapter_registration", "kernel_release", "os_name", "os_version", "reported_model",
  ]);
  expect(parsed.host).toStrictEqual(linuxHost);
  expect(parsed.host).not.toBe(input.host);
  expect(Object.isFrozen(parsed)).toBe(true);
  expect(Object.isFrozen(parsed.host)).toBe(true);
  expect(parsed.binary_sha256).toBe("a".repeat(64));
  expect(parsed.cli_version).toBe(registration.supported_versions[0]!);
  expect(parsed.evaluated_at).toBe("2026-09-01T00:00:00.000Z");
});

test("Linux operating-system name mismatch is stale", () => {
  const value = record();
  const facts = { ...observed(value), host: { ...linuxHost, os_name: "Debian" } };
  expect(evaluateCapabilityFreshness(value, value.evaluated_at, facts)).toEqual({ fresh: false, reason: "host_changed" });
});

test("Linux operating-system version mismatch is stale", () => {
  const value = record();
  const facts = { ...observed(value), host: { ...linuxHost, os_version: "26.10" } };
  expect(evaluateCapabilityFreshness(value, value.evaluated_at, facts)).toEqual({ fresh: false, reason: "host_changed" });
});

test("Linux kernel release mismatch is stale", () => {
  const value = record();
  const facts = { ...observed(value), host: { ...linuxHost, kernel_release: "7.0.1-fixture" } };
  expect(evaluateCapabilityFreshness(value, value.evaluated_at, facts)).toEqual({ fresh: false, reason: "host_changed" });
});

test("Linux executable SHA-256 mismatch is stale", () => {
  const value = record();
  const facts = { ...observed(value), binary_sha256: "c".repeat(64) };
  expect(evaluateCapabilityFreshness(value, value.evaluated_at, facts)).toEqual({ fresh: false, reason: "binary_hash_changed" });
});

test("Linux executable version mismatch is stale", () => {
  const value = record();
  const facts = { ...observed(value), cli_version: "fixture-other-version" };
  expect(evaluateCapabilityFreshness(value, value.evaluated_at, facts)).toEqual({ fresh: false, reason: "cli_version_changed" });
});

test("Linux freshness expires at the exact 30-day horizon", () => {
  const value = record();
  const facts = observed(value);
  const before = new Date(Date.parse(value.expires_at) - 1).toISOString();
  expect(evaluateCapabilityFreshness(value, before, facts)).toEqual({ fresh: true });
  expect(evaluateCapabilityFreshness(value, value.expires_at, facts)).toEqual({ fresh: false, reason: "horizon_expired" });
  expectRejected(raw({ expires_at: before }));
});

test("macOS records are stale against Linux observed facts", () => {
  const value = record({ host: macHost });
  const facts = { ...observed(value), host: linuxHost };
  expect(evaluateCapabilityFreshness(value, value.evaluated_at, facts)).toEqual({ fresh: false, reason: "host_changed" });
});

test("Linux records are stale against macOS observed facts", () => {
  const value = record();
  const facts = { ...observed(value), host: macHost };
  expect(evaluateCapabilityFreshness(value, value.evaluated_at, facts)).toEqual({ fresh: false, reason: "host_changed" });
});

test("incomplete observed host facts fail closed for either operating system", () => {
  for (const value of [record(), record({ host: macHost })]) {
    for (const host of [{}, { os_name: linuxHost.os_name }]) {
      expect(evaluateCapabilityFreshness(value, value.evaluated_at, { ...observed(value), host }))
        .toEqual({ fresh: false, reason: "host_changed" });
    }
  }
});

test("mixed macOS and Linux host fields are rejected", () => {
  expectRejected(raw({ host: { ...macHost, ...linuxHost } }));
  expectRejected(raw({ host: { ...macHost, os_name: linuxHost.os_name } }));
});

test("Linux records reject every macOS host field with any value", () => {
  for (const field of Object.keys(macHost)) {
    for (const value of [undefined, null, "", "fixture-value", 42, false]) {
      expectRejected(raw({ host: { ...linuxHost, [field]: value } }));
    }
  }
});

test("Linux host fields reject missing, empty and non-string values", () => {
  for (const field of Object.keys(linuxHost)) {
    const missing = { ...linuxHost } as Record<string, unknown>;
    delete missing[field];
    expectRejected(raw({ host: missing }));
    for (const value of ["", undefined, null, 42, false]) {
      expectRejected(raw({ host: { ...linuxHost, [field]: value } }));
    }
  }
});

test("Linux adapter registration must match the record's registered surface", () => {
  const other = [...ADAPTER_REGISTRY.values()].find(value => value.surface !== registration.surface)!;
  try {
    parseCapabilityRecord(raw({ host: { ...linuxHost, adapter_registration: other.surface } }));
    throw new Error("expected registration rejection");
  } catch (error) {
    expect(error).toBeInstanceOf(CapabilityRecordError);
    expect((error as CapabilityRecordError).kind).toBe("registration_mismatch");
    expect((error as CapabilityRecordError).field).toBe("host.adapter_registration");
  }
});

test("Linux reported model is recorded independently of the requested model", () => {
  const value = record();
  expect(value.host.reported_model).toBe("fixture-reported-model");
  expect(value.requested_model).toBe("fixture-requested-model");
  const facts = { ...observed(value), host: { ...linuxHost, reported_model: "another-reported-model" } };
  expect(evaluateCapabilityFreshness(value, value.evaluated_at, facts)).toEqual({ fresh: true });
});

test("Linux filenames distinguish hosts without changing macOS filenames", () => {
  const value = record();
  const name = capabilityRecordFilename(value);
  expect(name).not.toContain("/");
  expect(name).toEndWith(".json");
  for (const field of ["os_name", "os_version", "kernel_release"] as const) {
    const other = record({ host: { ...linuxHost, [field]: linuxHost[field] + "-other" } });
    expect(capabilityRecordFilename(other)).not.toBe(name);
  }
  const otherHash = record({ binary_sha256: "a".repeat(12) + "b".repeat(52) });
  expect(capabilityRecordFilename(otherHash)).not.toBe(name);
  const mac = record({ host: macHost });
  expect(capabilityRecordFilename(mac)).toBe("2026-09-01T00:00:00.000Z-aaaaaaaaaaaa.json");
});

test("the pre-act Antigravity macOS record retains parsing freshness and filename", () => {
  // Static pre-DEC-20261108-04 evidence, used solely as a test fixture.
  const report = readFileSync(new URL("../../../docs/verification/2026-08-12-antigravity-surface-investigation.md", import.meta.url));
  expect(createHash("sha256").update(report).digest("hex")).toBe("843ec841002370d033947ac45c1b2891da12ff059fea706732eda02a4f5c4d2c");
  const section = report.toString().split("## Capability record")[1]!;
  const bytes = section.match(/```json\n([^\n]+)\n```/)![1]! + "\n";
  expect(createHash("sha256").update(bytes).digest("hex")).toBe("0b7e9d47a31d4e9439ad1846f949f57518defcebfe3ef6ab0dbbfa98673ee983");
  const original = JSON.parse(bytes);
  const value = parseCapabilityRecord(original);
  expect(value).toStrictEqual(original);
  expect(JSON.stringify(value) + "\n").toBe(bytes);
  expect(capabilityRecordFilename(value)).toBe("2026-10-16T20:43:50.078Z-a4502aaf310b.json");
  expect(evaluateCapabilityFreshness(value, value.evaluated_at, observed(value))).toEqual({ fresh: true });
});

test("capability record production reads no running host or ambient clock", () => {
  const source = readFileSync(new URL("../src/capability-record.ts", import.meta.url), "utf8");
  expect(source).not.toMatch(/process\s*(?:\.|\[)|node:(?:fs|os)|Date\.now\s*\(|new Date\s*\(\s*\)/);
});
