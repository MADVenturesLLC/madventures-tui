import { afterAll, expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { join } from "node:path";
import * as harness from "../runtime-harness";

let epermCount = 0;
afterAll(() => console.log(`wedged-host alive EPERM count=${epermCount}`));
function alive(pid: number): boolean {
  try { process.kill(pid, 0); return true; }
  catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "EPERM") { epermCount += 1; return false; }
    if (code === "ESRCH") return false;
    throw error;
  }
}

async function scenario(options: harness.HarnessOptions): Promise<harness.FixtureFaultReport> {
  const session = await harness.startFixtureSession(options);
  let assertionFailure: unknown;
  try {
    const initial = await session.client.getSnapshot();
    expect(initial.phase).toBe("active");
    const descendants = options.processScenario === "grandchild" ? harness.fixtureProcessReport(session).descendantPids : [];
    if (options.processScenario === "grandchild") {
      expect(descendants).toHaveLength(1);
      for (const pid of descendants) expect(alive(pid)).toBe(true);
    }
    const started = performance.now();
    const report = Reflect.get(harness, "fixtureFaultReport") as (session: harness.HarnessSession) => harness.FixtureFaultReport;
    expect(typeof report).toBe("function");
    while (((await session.client.getSnapshot()).phase !== "closed" || report(session).deathMs === 0)
      && performance.now() - started < 5000) await Bun.sleep(5);
    const data = report(session);
    console.log(`host_fault ${JSON.stringify(data)}`);
    for (const pid of descendants) expect(alive(pid), "the recorded governed descendant must be gone within the outer bound").toBe(false);
    const closed = await session.client.getSnapshot();
    expect(closed.phase).toBe("closed");
    expect(closed.tokenState).toBe("invalidated");
    const db = new Database(join(session.storage.ledgerDir, "ledger.sqlite3"), { readonly: true });
    try {
      const rows = db.query("SELECT event_json FROM events ORDER BY sequence").all() as { event_json: string }[];
      expect(rows.map(row => JSON.parse(row.event_json)).find(event => event.event_type === "session_interrupted")?.reason_code)
        .toBe("pty_host_failure");
    } finally { db.close(); }
    for (const execution of initial.executions!) {
      for (const pid of [execution.hostPid!, execution.childPid!, -execution.processGroupId!]) expect(alive(pid)).toBe(false);
    }
    expect(data.deathMs).toBeGreaterThanOrEqual(0);
    expect(data.deathMs).toBeLessThanOrEqual(5000);
    if (options.wedgeHostAfter !== undefined) {
      const escalation = data.escalation!;
      expect(escalation.state).toBe("S3");
      expect(escalation.escalated).toBe(true);
      expect(escalation.closeStdinCalled).toBe(true);
      expect(escalation.unnecessaryHostExitConfirmed).toBe(false);
      expect(escalation.sessionInterruptionRequired).toBe(true);
      expect(escalation.killOrder).toEqual(["pgid", "host"]);
      expect(data.terminateAcks).toBe(0);
      expect(data.terminationStarted).toBe(false);
      // Addendum 1 permits 1 ms only on the deadline lower bounds.
      for (const field of ["ackWindowEndedMs", "pgidKillAttemptedMs", "hostKillAttemptedMs"]) {
        expect(escalation.observedMs[field]).toBeGreaterThanOrEqual(249);
      }
      expect(escalation.observedMs.pgidKillAttemptedMs).toBeLessThanOrEqual(500);
      expect(escalation.observedMs.hostKillAttemptedMs).toBeLessThanOrEqual(500);
    }
    return data;
  } catch (error) { assertionFailure = error; throw error; }
  finally {
    try { await session.close(); }
    catch (cleanupError) {
      if (assertionFailure === undefined) throw cleanupError;
      throw new AggregateError([assertionFailure, cleanupError], "FixtureAssertionAndCleanupFailed");
    }
  }
}

test("a SIGSTOPped host is cleared through the direct PGID path", async () => {
  await scenario({ wedgeHostAfter: 50, processScenario: "grandchild" });
}, 15000);
test("the wedged-host descendant survives host death without a direct PGID kill", async () => {
  const session = await harness.startFixtureSession({ wedgeHostAfter: 10000, processScenario: "grandchild" });
  try {
    const initial = await session.client.getSnapshot();
    const descendants = harness.fixtureProcessReport(session).descendantPids;
    expect(descendants).toHaveLength(1);
    expect(alive(descendants[0]!)).toBe(true);
    const started = performance.now();
    process.kill(initial.executions![0]!.hostPid!, "SIGKILL");
    while (alive(initial.executions![0]!.hostPid!) && performance.now() - started < 5000) await Bun.sleep(5);
    expect(alive(initial.executions![0]!.hostPid!)).toBe(false);
    await Bun.sleep(100);
    console.log(`wedged_descendant_calibration host_dead_ms=${performance.now() - started} descendant_alive=${alive(descendants[0]!)}`);
    expect(alive(descendants[0]!), "host death alone must leave the governed descendant alive").toBe(true);
  } finally { await session.close(); }
}, 15000);
test("a host that never acknowledges a command is treated as host failure at 250 ms", async () => {
  await scenario({ wedgeHostAfter: 50 });
}, 15000);
test("a wedged host receives no responsive-host grace", async () => {
  const data = await scenario({ wedgeHostAfter: 50 });
  expect(data.escalation!.observedMs.escalatedMs).toBeLessThanOrEqual(500);
}, 15000);
test("malformed host frames fail closed and interrupt the session", async () => {
  const data = await scenario({ emitMalformedFrame: "malformed" });
  expect(data.errorName).toBe("MalformedFrameError");
}, 15000);
test("unknown host frame tags fail closed", async () => {
  const data = await scenario({ emitMalformedFrame: "unknown" });
  expect(data.errorName).toBe("MalformedFrameError");
}, 15000);
