// packages/protocol/test/adapter-registry.test.ts
// Tests for the closed, Founder-approved adapter registry — the sole
// production admission source (Task 6).

import { expect, test } from "bun:test";
import {
  ADAPTER_REGISTRY,
  lookupRegistration,
  type AdapterRegistrationV1,
} from "../src/adapter-registry";
import { parseSurfaceId } from "../src/surface-id";
import { normalizeIdentifier, normalizeIndependenceDomain } from "../src/normalization";

const CLAUDE_CODE_REGISTRATION: AdapterRegistrationV1 = {
  surface: parseSurfaceId("claude-code"),
  executable_name: "madbridge-claude-v5",
  provider: "anthropic",
  supported_versions: ["2.1.233"],
  identity_probe: {
    argv: ["--print", "--input-format", "stream-json", "--output-format", "stream-json", "--verbose", "--no-session-persistence"],
    parse: "json",
  },
  auth_readiness_probe: { argv: ["auth", "status"], parse: "json" },
  non_interactive_flags: ["--print", "--input-format", "stream-json", "--output-format", "stream-json", "--verbose", "--no-session-persistence"],
  environment_allowlist_ref: "claude-code-v1",
  independence_domain: "anthropic",
  organization_id: "anthropic",
  auth_failure_detection: [
    "auth_status_exit_code:1",
    "system/api_retry.error:authentication_failed",
    "system/api_retry.error:oauth_org_not_allowed",
  ],
  limitations: [
    "fable is requested intent only; live eligibility requires exact equality with system/init.model",
  ],
};

const ANTIGRAVITY_REGISTRATION: AdapterRegistrationV1 = {
  surface: parseSurfaceId("antigravity"),
  executable_name: "agy",
  provider: "google",
  supported_versions: ["1.1.13"],
  identity_probe: { argv: ["config", "get", "model"], parse: "kv" },
  auth_readiness_probe: null,
  non_interactive_flags: [],
  environment_allowlist_ref: "antigravity-v1",
  independence_domain: "google",
  organization_id: "google",
  auth_failure_detection: [],
  limitations: [
    "configuration-only identity evidence — no actual-session identity primitive exists",
    "no documented non-mutating non-interactive auth-readiness primitive",
  ],
};

test("registry values are stored already normalized", () => {
  for (const entry of ADAPTER_REGISTRY.values()) {
    expect(entry.independence_domain).toBe(normalizeIndependenceDomain(entry.independence_domain));
    expect(entry.organization_id).toBe(normalizeIdentifier(entry.organization_id));
    expect(entry.provider).toBe(normalizeIdentifier(entry.provider));
  }
});

test("the registry contains exactly the two Founder-ratified surfaces", () => {
  expect(ADAPTER_REGISTRY.size).toBe(2);
  expect(new Set(ADAPTER_REGISTRY.keys())).toEqual(
    new Set([parseSurfaceId("claude-code"), parseSurfaceId("antigravity")]),
  );
});

test("claude-code registration matches the PLAN-OPEN-1 ruling field for field", () => {
  expect(ADAPTER_REGISTRY.get(parseSurfaceId("claude-code"))).toEqual(CLAUDE_CODE_REGISTRATION);
});

test("antigravity registration matches the PLAN-OPEN-1 ruling field for field", () => {
  expect(ADAPTER_REGISTRY.get(parseSurfaceId("antigravity"))).toEqual(ANTIGRAVITY_REGISTRATION);
});

test("registry entries and the registry are deeply frozen", () => {
  expect(Object.isFrozen(ADAPTER_REGISTRY)).toBe(true);
  for (const entry of ADAPTER_REGISTRY.values()) {
    expect(Object.isFrozen(entry)).toBe(true);
    expect(Object.isFrozen(entry.identity_probe)).toBe(true);
    expect(Object.isFrozen(entry.identity_probe.argv)).toBe(true);
    expect(Object.isFrozen(entry.supported_versions)).toBe(true);
    expect(Object.isFrozen(entry.non_interactive_flags)).toBe(true);
    expect(Object.isFrozen(entry.auth_failure_detection)).toBe(true);
    expect(Object.isFrozen(entry.limitations)).toBe(true);
    if (entry.auth_readiness_probe !== null) {
      expect(Object.isFrozen(entry.auth_readiness_probe)).toBe(true);
      expect(Object.isFrozen(entry.auth_readiness_probe.argv)).toBe(true);
    }
    expect(() => {
      (entry as { executable_name: string }).executable_name = "tampered";
    }).toThrow(TypeError);
  }
});

test("lookupRegistration returns the ratified entry and undefined for a syntactically valid unregistered surface", () => {
  const claudeCode = parseSurfaceId("claude-code");
  const fromLookup = lookupRegistration(claudeCode);
  const fromIteration = ADAPTER_REGISTRY.get(claudeCode);
  expect(fromLookup).toBe(fromIteration);
  expect(fromLookup).toBeDefined();

  expect(lookupRegistration(parseSurfaceId("totally-made-up"))).toBeUndefined();
});

test("registry membership cannot be mutated at runtime", () => {
  const probe = ADAPTER_REGISTRY as unknown as Record<string, unknown>;
  expect(probe.set).toBeUndefined();
  expect(probe.delete).toBeUndefined();
  expect(probe.clear).toBeUndefined();

  expect(() => {
    (probe as { set: unknown }).set = () => undefined;
  }).toThrow(TypeError);

  ADAPTER_REGISTRY.forEach((_value, _key, map) => {
    expect(Object.isFrozen(map)).toBe(true);
    expect((map as unknown as Record<string, unknown>).set).toBeUndefined();
  });

  expect(ADAPTER_REGISTRY.size).toBe(2);
  const sortedKeys: string[] = [...ADAPTER_REGISTRY.keys()].map(String).sort();
  expect(sortedKeys).toEqual(["antigravity", "claude-code"]);
});
