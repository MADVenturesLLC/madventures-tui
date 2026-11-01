import { expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { existsSync } from "node:fs";
import { join } from "node:path";
import * as harness from "../runtime-harness";

test("live attestation mismatch interrupts the session with identity_mismatch", async () => {
  const session = await harness.startFixtureSession({ mismatchAttestationAfter: 150 });
  try {
    const initial = await session.client.getSnapshot();
    expect(initial.phase).toBe("active");
    const started = performance.now();
    while (((await session.client.getSnapshot()).phase !== "closed" || harness.fixtureFaultReport(session).deathMs === 0)
      && performance.now() - started < 5000) await Bun.sleep(5);
    const snapshot = await session.client.getSnapshot();
    expect(snapshot.phase).toBe("closed");
    expect(snapshot.tokenState).toBe("invalidated");
    const db = new Database(join(session.storage.ledgerDir, "ledger.sqlite3"), { readonly: true });
    try {
      const events = (db.query("SELECT event_json FROM events ORDER BY sequence").all() as { event_json: string }[]).map(row => JSON.parse(row.event_json));
      expect(events.find(event => event.event_type === "session_interrupted")?.reason_code).toBe("identity_mismatch");
    } finally { db.close(); }
    const data = harness.fixtureFaultReport(session);
    console.log(`attestation_drift ${JSON.stringify(data)}`);
    expect(data.reportedModel).toBe("fixture-drifted-model");
    expect(data.reportedModel).not.toBe(initial.executions![0]!.identity.model);
    expect(data.deathMs).toBeLessThanOrEqual(5000);
  } finally { await session.close(); }
}, 15000);

test("replacing the executable between preflight and exec is caught by the adjacent re-hash", async () => {
  let failure: harness.FixtureStartupFailure | undefined;
  let unexpected: harness.HarnessSession | undefined;
  const started = performance.now();
  try {
    try { unexpected = await harness.startFixtureSession({ swapBinaryBeforeExec: true }); }
    catch (error) { expect(error).toBeInstanceOf(harness.FixtureStartupFailure); failure = error as harness.FixtureStartupFailure; }
    expect(failure).toBeDefined();
    expect(failure!.failedStep).toBe("children");
    expect(failure!.failure).toBe("child_launch_failed");
    expect(existsSync(failure!.fixtureRoot)).toBe(false);
    const data = harness.fixtureResidualReport();
    expect(data.livePids).toEqual([]);
    expect(data.liveGroups).toEqual([]);
    expect(data.openLedgers).toBe(0);
    expect(data.swappedBinaryExecuted).toBe(false);
    const deathMs = performance.now() - started;
    console.log(`adjacent_rehash final_death_ms=${deathMs}`);
    expect(deathMs).toBeLessThanOrEqual(5000);
  } finally { await unexpected?.close(); }
}, 15000);
