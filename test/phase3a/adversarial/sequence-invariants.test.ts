import { afterAll, expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { join } from "node:path";
import * as harness from "../runtime-harness";

let epermCount = 0;
afterAll(() => console.log(`sequence-invariants alive EPERM count=${epermCount}`));
function alive(pid: number): boolean {
  try { process.kill(pid, 0); return true; }
  catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "EPERM") { epermCount += 1; return false; }
    if (code === "ESRCH") return false;
    throw error;
  }
}
async function scenario(options: harness.HarnessOptions, kind: string, stream = "output"): Promise<harness.FixtureFaultReport> {
  const session = await harness.startFixtureSession(options);
  try {
    const initial = await session.client.getSnapshot();
    expect(initial.phase).toBe("active");
    const started = performance.now();
    const report = Reflect.get(harness, "fixtureFaultReport") as (session: harness.HarnessSession) => harness.FixtureFaultReport;
    while (((await session.client.getSnapshot()).phase !== "closed" || report(session).deathMs === 0)
      && performance.now() - started < 5000) await Bun.sleep(5);
    const data = report(session);
    console.log(`sequence_fault ${JSON.stringify(data)}`);
    expect(data.errorName).toBe("SequenceInvariantError");
    expect(data.sequenceKind).toBe(kind);
    const closed = await session.client.getSnapshot();
    expect(closed.phase).toBe("closed");
    expect(closed.tokenState).toBe("invalidated");
    const db = new Database(join(session.storage.ledgerDir, "ledger.sqlite3"), { readonly: true });
    try {
      const events = (db.query("SELECT event_json FROM events ORDER BY sequence").all() as { event_json: string }[])
        .map(row => JSON.parse(row.event_json));
      expect(events.find(event => event.event_type === "session_interrupted")?.reason_code)
        .toBe(`${stream}_sequence_invariant_failed`);
    } finally { db.close(); }
    for (const execution of initial.executions!) {
      for (const pid of [execution.hostPid!, execution.childPid!, -execution.processGroupId!]) expect(alive(pid)).toBe(false);
    }
    expect(Number.isFinite(data.detectedMs)).toBe(true);
    expect(data.detectedMs).toBeGreaterThanOrEqual(0);
    expect(data.deathMs).toBeLessThanOrEqual(5000);
    return data;
  } finally { await session.close(); }
}

test("a duplicate output sequence interrupts the session", async () => {
  await scenario({ skewOutputSeq: "duplicate" }, "duplicate");
}, 15000);
test("an output sequence regression interrupts the session", async () => {
  await scenario({ skewOutputSeq: "regression" }, "regression");
}, 15000);
test("an output sequence gap interrupts the session", async () => {
  await scenario({ skewOutputSeq: "gap" }, "gap");
}, 15000);
test("a snapshot sequence gap interrupts the session", async () => {
  await scenario({ skewSnapshotSeq: true }, "gap", "snapshot");
}, 15000);
test("every timing assertion reports observed values, not just pass", async () => {
  const data = await scenario({ skewOutputSeq: "gap" }, "gap");
  expect(Number.isFinite(data.deathMs)).toBe(true);
  expect(data.deathMs).toBeGreaterThanOrEqual(data.detectedMs);
}, 15000);
