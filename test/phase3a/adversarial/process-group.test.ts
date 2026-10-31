import { afterAll, expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { join } from "node:path";
import { startProcessScenario as start, fixtureProcessReport as report, fixtureLivenessEpermCount, type HarnessSession } from "../runtime-harness";
type ProcessReport = ReturnType<typeof report>;
let livenessEpermCount = 0;
afterAll(() => console.log(`process-group alive EPERM count=${livenessEpermCount}; runtime-harness alive EPERM count=${fixtureLivenessEpermCount()}`));

function alive(pid: number): boolean {
  try { process.kill(pid, 0); return true; }
  catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "EPERM") { livenessEpermCount += 1; return false; }
    if (code === "ESRCH") return false;
    throw error;
  }
}
function gone(data: ProcessReport): void {
  for (const pid of [...data.hostPids, ...data.childPids, ...data.descendantPids]) expect(alive(pid)).toBe(false);
  for (const pgid of data.processGroups) expect(alive(-pgid)).toBe(false);
}
async function ready(session: HarnessSession): Promise<void> {
  const output = session.client.output("builder")[Symbol.asyncIterator]();
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([(async () => {
      let text = "";
      while (!text.includes("FIXTURE_READY")) {
        const frame = await output.next();
        if (frame.done) throw new Error("FixtureOutputEndedBeforeReady");
        text += new TextDecoder().decode(frame.value.bytes);
      }
    })(), new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error("FixtureReadinessTimeout")), 5000); })]);
  } finally { clearTimeout(timer); void output.return?.().catch(() => {}); }
}

test("a grandchild in the governed process group is terminated", async () => {
  const session = await start("grandchild");
  try {
    const data = report(session);
    expect(data.descendantPids).toHaveLength(1);
    expect(alive(data.descendantPids[0]!)).toBe(true);
    await session.interrupt("child_failure");
    gone(data);
  } finally { await session.close(); }
}, 15_000);

test("a child that ignores SIGTERM is SIGKILLed within the outer bound", async () => {
  const session = await start("ignore-term");
  try {
    const data = report(session);
    expect(alive(data.childPids[0]!)).toBe(true);
    await ready(session);
    const started = performance.now();
    await session.interrupt("child_failure");
    const deathMs = performance.now() - started;
    console.log(`ignore_SIGTERM: final_death_ms=${deathMs.toFixed(2)}`);
    expect(deathMs).toBeGreaterThanOrEqual(2000);
    expect(deathMs).toBeLessThanOrEqual(5000);
    gone(data);
  } finally { await session.close(); }
}, 15_000);

test("deliberate lifeline EOF terminates that child's process group only", async () => {
  const session = await start("lifeline-eof");
  try {
    const data = report(session);
    expect(data.descendantPids, "lifeline EOF needs a member independent of the group leader").toHaveLength(1);
    for (const pid of data.descendantPids) expect(alive(pid)).toBe(true);
    const started = performance.now();
    while ((alive(-data.processGroups[0]!) || alive(data.hostPids[0]!)) && performance.now() - started < 5000) await Bun.sleep(10);
    const deathMs = performance.now() - started;
    console.log(`lifeline_EOF: final_death_ms=${deathMs.toFixed(2)}`);
    expect(deathMs).toBeLessThanOrEqual(5000);
    expect(alive(-data.processGroups[0]!)).toBe(false);
    expect(alive(data.childPids[0]!)).toBe(false);
    expect(alive(data.hostPids[0]!)).toBe(false);
    for (const pid of data.descendantPids) expect(alive(pid), "lifeline EOF must terminate the independent group member").toBe(false);
    expect(alive(-data.processGroups[1]!)).toBe(true);
    expect(alive(data.childPids[1]!)).toBe(true);
  } finally { await session.close(); }
}, 15_000);

test("PTY-host exit interrupts the whole session with pty_host_failure", async () => {
  const session = await start("host-exit");
  try {
    const data = report(session);
    const started = performance.now();
    while ((await session.client.getSnapshot()).phase !== "closed" && performance.now() - started < 5000) await Bun.sleep(10);
    const snapshot = await session.client.getSnapshot();
    expect(snapshot.phase).toBe("closed");
    expect(snapshot.tokenState).toBe("invalidated");
    const ledger = new Database(join(session.storage.ledgerDir, "ledger.sqlite3"), { readonly: true });
    try {
      const events = (ledger.query("SELECT event_json FROM events ORDER BY sequence").all() as { event_json: string }[])
        .map(row => JSON.parse(row.event_json));
      expect(events.find(event => event.event_type === "session_interrupted")?.reason_code).toBe("pty_host_failure");
    } finally { ledger.close(); }
    gone(data);
    console.log(`host_exit: final_death_ms=${(performance.now() - started).toFixed(2)}`);
  } finally { await session.close(); }
}, 15_000);

test("a descendant that calls setsid is documented as escaping, not silently claimed contained", async () => {
  const session = await start("setsid");
  const data = report(session);
  try {
    expect(data.descendantPids).toHaveLength(1);
    const escaped = data.descendantPids[0]!;
    expect(alive(escaped)).toBe(true);
    expect(alive(-escaped)).toBe(true);
    await session.interrupt("child_failure");
    expect(alive(escaped)).toBe(true);
    for (const pgid of data.processGroups) expect(alive(-pgid)).toBe(false);
    expect(report(session).residuals).toContainEqual({ kind: "setsid_escape", pid: escaped });
    console.log(`setsid_residual: recorded_count=${report(session).residuals.length} group_containment=false`);
  } finally { await session.close(); }
  for (const pid of data.descendantPids) expect(alive(pid)).toBe(false);
}, 15_000);
