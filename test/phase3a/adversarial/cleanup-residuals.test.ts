import { afterAll, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import * as harness from "../runtime-harness";

afterAll(() => console.log(`Task 54 runtime-harness alive EPERM count=${harness.fixtureLivenessEpermCount()}`));

test("the first surface is torn down when the second surface fails to launch", async () => {
  let failure: harness.FixtureStartupFailure | undefined;
  let unexpected: harness.HarnessSession | undefined;
  const started = performance.now();
  try {
    try { unexpected = await harness.startFixtureSession({ failSecondSurfaceLaunch: true }); }
    catch (error) { expect(error).toBeInstanceOf(harness.FixtureStartupFailure); failure = error as harness.FixtureStartupFailure; }
    expect(failure).toBeDefined();
    expect(failure!.hostPids).toHaveLength(2);
    expect(failure!.childPids).toHaveLength(1);
    expect(failure!.processGroups).toHaveLength(1);
    expect(failure!.failedStep).toBe("children");
    expect(existsSync(failure!.fixtureRoot)).toBe(false);
    expect(harness.fixtureResidualReport().livePids).toEqual([]);
    expect(harness.fixtureResidualReport().liveGroups).toEqual([]);
    const deathMs = performance.now() - started;
    console.log(`second_surface_failure final_death_ms=${deathMs}`);
    expect(deathMs).toBeLessThanOrEqual(5000);
  } finally { await unexpected?.close(); }
}, 15000);

test("no child, descendant, host, descriptor, open ledger session, or live fencing token remains after the adversarial suite", async () => {
  // Bun's file discovery order is not a post-suite barrier; own the fault cohort here.
  for (const options of [
    { processScenario: "setsid" }, { wedgeHostAfter: 50 }, { emitMalformedFrame: "unknown" },
    { skewOutputSeq: "gap" }, { failLedgerAppendAfter: 1 }, { expireAuthAfter: 150 },
    { mismatchAttestationAfter: 150 },
  ] as const) {
    const fixture = await harness.startFixtureSession(options);
    try {
      if (!("processScenario" in options)) {
        const started = performance.now();
        while (harness.fixtureFaultReport(fixture).deathMs === 0 && performance.now() - started < 5000) await Bun.sleep(5);
        const data = harness.fixtureFaultReport(fixture);
        console.log(`census_fault ${JSON.stringify(data)}`);
        expect(data.deathMs).toBeGreaterThan(0);
        expect(data.deathMs).toBeLessThanOrEqual(5000);
        if (data.escalation !== null) {
          expect(data.escalation.state).toBe("S3");
          expect(data.terminateAcks).toBe(0);
          expect(data.terminationStarted).toBe(false);
          expect(data.escalation.unnecessaryHostExitConfirmed).toBe(false);
          for (const field of ["ackWindowEndedMs", "pgidKillAttemptedMs", "hostKillAttemptedMs"]) {
            expect(data.escalation.observedMs[field]).toBeGreaterThanOrEqual(249);
          }
          expect(data.escalation.observedMs.pgidKillAttemptedMs).toBeLessThanOrEqual(500);
          expect(data.escalation.observedMs.hostKillAttemptedMs).toBeLessThanOrEqual(500);
        }
      }
      await fixture.close();
    } finally { await fixture.close(); }
  }
  for (const mode of ["clean", "SIGTERM", "crash", "SIGKILL"] as const) {
    const child = await harness.startFixtureSessionInChildProcess();
    const started = performance.now();
    try { await child.exit(mode); }
    finally { await child.dispose(); }
    const deathMs = performance.now() - started;
    console.log(`census_supervisor ${mode} final_death_ms=${deathMs}`);
    expect(deathMs).toBeLessThanOrEqual(5000);
  }
  const session = await harness.startProcessScenario("grandchild");
  const snapshot = await session.client.getSnapshot();
  expect(snapshot.phase).toBe("active");
  const started = performance.now();
  await session.close();
  const deathMs = performance.now() - started;
  const deadline = performance.now() + 1000;
  while (harness.fixtureResidualReport().openDescriptors.length && performance.now() < deadline) await Bun.sleep(5);
  const data = harness.fixtureResidualReport();
  console.log(`residual_census final_death_ms=${deathMs} ${JSON.stringify(data)}`);
  expect(data.recordedRuns).toBeGreaterThan(0);
  expect(data.recordedHosts).toBeGreaterThanOrEqual(2);
  expect(data.recordedChildren).toBeGreaterThanOrEqual(2);
  expect(data.recordedDescriptors).toBeGreaterThan(0);
  expect(data.livePids).toEqual([]);
  expect(data.liveGroups).toEqual([]);
  expect(data.openDescriptors).toEqual([]);
  expect(data.openLedgers).toBe(0);
  expect(data.openSessions).toBe(0);
  expect(data.liveTokens).toBe(0);
  expect(deathMs).toBeLessThanOrEqual(5000);
}, 30000);
