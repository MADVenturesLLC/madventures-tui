import { expect, test } from "bun:test";
import { repeatInstalledAttester, runOfflineScenario, runStartupSignal } from "./scenarios";

test("both stand-ins pass probes and attestation before present", async () => {
  const result = await runOfflineScenario("healthy");
  expect(result.detail).toBe("");
  expect(result.code).toBe(0);
  expect(result.activated).toBe(true);
  const stages = result.trace.trim().split("\n");
  let previous = -1;
  for (const event of ["claude-code identity probe", "claude-code auth probe", "madv-surface identity probe", "madv-surface auth probe",
    "claude-code attestation write", "claude-code result success", "madv-surface attestation write no_tools=true",
    "madv-surface result success", "present active", "exit 0"]) {
    expect(stages.filter(s => s === event).length).toBe(1);
    const index = stages.indexOf(event);
    expect(index).toBeGreaterThan(previous);
    previous = index;
  }
}, 45_000);

test("a failed health barrier exits nonzero naming the component", async () => {
  const result = await runOfflineScenario("barrier");
  expect(result.code).toBe(1);
  expect(result.component).toBe("storage");
  expect(result.presented).toBe(false);
  expect(result.trace).toContain("madv-surface auth probe");
}, 45_000);

test("a second attester invocation refuses the fourth call before the child receives it", async () => {
  for (const surface of ["claude-code", "madv-surface"]) {
    const result = await repeatInstalledAttester(surface);
    expect(result.detail).toContain("surface=" + surface + " cause=attestation_budget_exhausted");
    expect(result.trace.split("\n").filter(s => s.startsWith(surface + " attestation write")).length).toBe(1);
    expect(result.trace).not.toContain("extra write");
  }
}, 90_000);

test("composition refuses disallowed user, managed, project and local settings before launch", async () => {
  for (const location of ["user", "managed", "project", "local"] as const) {
    const result = await runOfflineScenario(location);
    expect(result.code).toBe(1);
    expect(result.detail).toBe("auth_not_ready");
    expect(result.presented).toBe(false);
    expect(result.trace).not.toContain("probe");
    expect(result.trace).not.toContain("launch");
  }
}, 45_000);

test("startup cancellation closes the subscription and ends the stand-in group", async () => {
  const result = await runOfflineScenario("cancel");
  expect(result.detail).toContain("surface=claude-code cause=attestation_cancelled");
  expect(result.code).toBe(1);
  expect(result.presented).toBe(false);
  expect(result.groupsEnded).toBe(true);
}, 45_000);

test("monitor failures after activation durably interrupt with the registered reason", async () => {
  for (const [mode, reason] of [["fallback", "identity_mismatch"], ["madv-auth", "authentication_expired"]] as const) {
    const result = await runOfflineScenario(mode);
    expect(result.detail).toBe("");
    expect(result.activated).toBe(true);
    expect(result.reason).toBe(reason);
    expect(result.groupsEnded).toBe(true);
  }
  const failure = await runOfflineScenario("attestation");
  expect(failure.presented).toBe(false);
  expect(failure.detail).toContain("surface=claude-code cause=identity_mismatch");
}, 90_000);

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  test(`composition cancels startup on ${signal} and restores both signal listener counts`, async () => {
    const result = await runStartupSignal(signal);
    expect(result.countAtRaise).toBe(1);
    expect(result.soleCompositionListener).toBe(true);
    expect(result.emitted).toBe(true);
    expect(result.detail).toContain("surface=claude-code cause=attestation_cancelled");
    expect(result.code).toBe(1);
    expect(result.presented).toBe(false);
    expect(result.groupsEnded).toBe(true);
    expect(result.after).toEqual(result.before);
  }, 45_000);
}
