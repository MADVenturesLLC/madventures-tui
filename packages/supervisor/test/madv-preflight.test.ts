import { expect, test } from "bun:test";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ADAPTER_REGISTRY, parseSurfaceId, parseCapabilityRecord, evaluateCapabilityFreshness, type ExecutionIdentity } from "@madventures/protocol";
import { evaluatePairEligibility, parsePairConstraints } from "../../protocol/src/pair-constraints";
import { encodeUserInput } from "@madventures/adapter-madv-surface";
import { buildAllowlistedEnvironment } from "../src/environment";
import type { ProbeRequest } from "../src/attestation";
import { CANARY, MODEL, madvFixture } from "./madv-preflight-support";

test("missing MINIMAX_API_KEY maps to auth_not_ready before probes", async () => {
  const f = madvFixture(); delete f.input.ambient.MINIMAX_API_KEY;
  const seen: ProbeRequest[] = [];
  const result = await f.run({ probe: async request => { seen.push(request); return f.deps.probe!(request); } });
  expect(result).toEqual({ ok: false, failure: "auth_not_ready", detail: "auth_not_ready" });
  expect(seen.filter(request => request.executablePath.endsWith("madv-surface"))).toHaveLength(0);
});
test("madv-surface reuses one allowlisted environment for four consumers", async () => {
  const f = madvFixture(), seen: ProbeRequest[] = [];
  let builds = 0;
  const result = await f.run({
    buildEnvironment: (registration, ambient) => { if (registration.surface === f.reg.surface) builds++; return buildAllowlistedEnvironment(registration, ambient); },
    probe: async request => { seen.push(request); return f.deps.probe!(request); },
  });
  expect(result.ok).toBe(true);
  if (!result.ok) return;
  const launch = result.plan.executions.find(execution => execution.surface === f.reg.surface)!;
  const probes = seen.filter(request => request.executablePath === launch.executablePath);
  expect(builds).toBe(1); expect(probes).toHaveLength(2);
  // LaunchExecution.environment is the sole host/child environment in the plan.
  const consumers = [probes[0]!.environment, probes[1]!.environment, launch.environment, launch.environment];
  for (const value of consumers) {
    expect(value).toBe(launch.environment);
    expect(JSON.stringify(value)).toBe(JSON.stringify(launch.environment));
    expect(value.MINIMAX_API_KEY).toBe(CANARY);
    expect(Object.keys(value)).toEqual(["HOME", "PATH", "SHELL", "TERM", "TMPDIR", "MINIMAX_API_KEY", "USER"]);
  }
});

test("madv-surface probes run exactly once with pinned arguments and input", async () => {
  const f = madvFixture(), seen: ProbeRequest[] = [];
  const result = await f.run({ probe: async request => { seen.push(request); return f.deps.probe!(request); } });
  expect(result.ok).toBe(true);
  const madv = seen.filter(request => request.executablePath.endsWith("madv-surface"));
  expect(madv.map(request => request.kind)).toEqual(["identity", "auth"]);
  expect(madv[0]!.registration).toBe(f.reg); expect(madv[1]!.registration).toBe(f.reg);
  expect(madv[0]!.arguments).toEqual([...f.reg.identity_probe.argv, "--model", MODEL]);
  expect(madv[0]!.stdin).toBe(encodeUserInput("Reply with your model identifier and nothing else."));
  expect(madv[1]!.arguments).toEqual(["auth", "status", "--profile", "minimax"]); expect(madv[1]!.stdin).toBe("");
  if (result.ok) expect(result.plan.executions.find(execution => execution.surface === f.reg.surface)!.arguments).toEqual([...f.reg.non_interactive_flags, "--model", MODEL]);
});
test("unsupported madv-surface roles fail before any probe", async () => {
  const f = madvFixture(); f.envelope.executions[0].role = "independent-reviewer"; f.envelope.executions[1].role = "builder"; f.sign();
  let probes = 0;
  const result = await f.run({ probe: async request => { probes++; return f.deps.probe!(request); } });
  expect(result).toEqual({ ok: false, failure: "pair_ineligible", detail: "pair_ineligible" });
  expect(probes).toBe(0);
});
test("madv-surface hash and version changes refuse the capability record", async () => {
  const f = madvFixture();
  const digest = new Bun.CryptoHasher("sha256").update(readFileSync(join(f.bin, f.reg.executable_name))).digest("hex");
  const host = { arch: "arm64", macos_version: "fixture-version", macos_build: "fixture-build", bun_version: "1.4.2", bun_path: "/fixture/bun", bun_sha256: "b".repeat(64), term: "fixture-term", shell: "/fixture/shell" };
  f.input.observedHostFacts = { [f.reg.surface]: { binary_sha256: digest, cli_version: "0.1.1", host } };
  const base = { surface: f.reg.surface, provider: f.reg.provider, independence_domain: f.reg.independence_domain, organization_id: f.reg.organization_id,
    requested_model: MODEL, cli_version: "0.1.1", binary_path: join(f.bin, f.reg.executable_name), binary_sha256: digest,
    evaluated_at: "2026-11-15T00:00:00.000Z", expires_at: "2026-12-15T00:00:00.000Z", host,
    role_eligibility: ["independent-reviewer"], independent_review_eligible: true, overall: "pass",
    identity_attestation: { result: "pass", primitive: "synthetic", sanitized_facts: "Synthetic unit evidence only." },
    auth_readiness: { result: "pass", primitive: "synthetic" }, pty: { result: "fail", observed_ms: {} }, limitations: ["unit only"], redaction_rules_applied: [] };
  for (const change of [{}, { binary_sha256: "c".repeat(64) }, { cli_version: "0.1.0" }]) {
    const candidate = parseCapabilityRecord({ ...base, ...change });
    const result = await f.run({ freshRecord: (root, repo, worktree, surface, now, observed) => {
      if (surface !== f.reg.surface) return f.deps.freshRecord!(root, repo, worktree, surface, now, observed);
      return evaluateCapabilityFreshness(candidate, now, observed).fresh ? candidate : null;
    } });
    if (Object.keys(change).length === 0) expect(result.ok).toBe(true);
    else expect(result).toEqual({ ok: false, failure: "capability_record_stale", detail: "capability_record_stale" });
  }
});
test("real registry admits Claude with madv-surface and refuses shared review control", () => {
  const f = madvFixture(), executions = f.envelope.executions as ExecutionIdentity[];
  const constraints = parsePairConstraints(f.envelope.pair_constraints);
  const organizations = new Map(executions.map(execution => [execution.surface, ADAPTER_REGISTRY.get(execution.surface)!.organization_id]));
  expect(evaluatePairEligibility(executions, constraints, organizations).ok).toBe(true);
  expect(evaluatePairEligibility(executions.map(execution => ({ ...execution, provider: f.reg.provider })), constraints, organizations)).toEqual({ ok: false, failure: "provider_not_distinct" });
  expect(evaluatePairEligibility(executions.map(execution => ({ ...execution, independence_domain: f.reg.independence_domain })), constraints, organizations)).toEqual({ ok: false, failure: "independence_domain_not_distinct" });
  const shared = new Map(organizations); shared.set(f.claude.surface, f.reg.organization_id);
  expect(evaluatePairEligibility(executions, constraints, shared)).toEqual({ ok: false, failure: "common_review_control" });
});
test("real-registry Antigravity is refused before its probes", async () => {
  const f = madvFixture(), agy = ADAPTER_REGISTRY.get(parseSurfaceId("antigravity"))!;
  f.envelope.executions[0] = { ...f.envelope.executions[0], surface: agy.surface, provider: agy.provider, independence_domain: agy.independence_domain };
  writeFileSync(join(f.bin, agy.executable_name), "# controlled artifact\n", { mode: 0o700 }); f.sign();
  let probes = 0;
  expect(await f.run({ probe: async request => { probes++; return f.deps.probe!(request); } })).toEqual({ ok: false, failure: "pair_ineligible", detail: "pair_ineligible" });
  expect(probes).toBe(0);
});
