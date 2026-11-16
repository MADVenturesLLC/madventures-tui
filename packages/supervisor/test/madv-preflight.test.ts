import { expect, test } from "bun:test";
import { buildAllowlistedEnvironment } from "../src/environment";
import type { ProbeRequest } from "../src/attestation";
import { CANARY, madvFixture } from "./madv-preflight-support";

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
