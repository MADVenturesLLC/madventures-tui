import { afterAll, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Ledger } from "@madventures/ledger";
import type { SessionStorage } from "@madventures/storage";
import type { BrokerSnapshot } from "../../../packages/broker/src/client";
import { planPrefixCompletion, replayDurablePrefix } from "../../../packages/broker/src/next-start-reconciliation";
import * as harness from "../runtime-harness";

type ExitMode = "clean" | "SIGTERM" | "crash" | "SIGKILL";
interface ChildSupervisor {
  readonly supervisorPid: number;
  readonly hostPids: readonly number[];
  readonly childPids: readonly number[];
  readonly processGroups: readonly number[];
  readonly storage: SessionStorage;
  readonly initialSnapshot: BrokerSnapshot;
  exit(mode: ExitMode): Promise<{ exitCode: number | null; signalCode: string | null; stderr: string }>;
  dispose(): Promise<void>;
}

let livenessEpermCount = 0;
afterAll(() => console.log(`supervisor-death alive EPERM count=${livenessEpermCount}; runtime-harness alive EPERM count=${harness.fixtureLivenessEpermCount()}`));

function alive(pid: number): boolean {
  try { process.kill(pid, 0); return true; }
  catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "EPERM") { livenessEpermCount += 1; return false; }
    if (code === "ESRCH") return false;
    throw error;
  }
}

async function scenario(mode: ExitMode, reconcile = false): Promise<void> {
  const start = Reflect.get(harness, "startFixtureSessionInChildProcess") as (() => Promise<ChildSupervisor>) | undefined;
  expect(typeof start, "the harness has no spawned supervisor entry point for a killable session").toBe("function");
  const child = await start!();
  try {
    expect(child.hostPids).toHaveLength(2);
    expect(child.childPids).toHaveLength(2);
    expect(child.processGroups).toHaveLength(2);
    expect(child.initialSnapshot.phase).toBe("active");
    expect(child.initialSnapshot.tokenState).toBe("valid");
    const pids = [child.supervisorPid, ...child.hostPids, ...child.childPids];
    for (const pid of pids) expect(alive(pid)).toBe(true);
    const started = performance.now();
    const outcome = await child.exit(mode);
    if (mode === "SIGTERM") expect(outcome.stderr, "SIGTERM must reach its signal handler").toBe("FIXTURE_SUPERVISOR_SIGNAL:SIGTERM\n");
    if (mode === "clean") expect(outcome.stderr).toBe("");
    if (mode === "crash") {
      expect(outcome.stderr, "crash must report the uncaught synthetic exception").toContain("error: Synthetic supervisor crash");
      expect(outcome.stderr).toMatch(/at .*supervisor-entry\.ts:\d+/);
    }
    if (mode === "clean" || mode === "SIGTERM") expect(outcome.exitCode).toBe(0);
    else expect(outcome.exitCode).not.toBe(0);
    expect(outcome.signalCode).toBe(mode === "SIGKILL" ? "SIGKILL" : null);
    const deadline = started + 5000;
    while (pids.some(alive) && performance.now() < deadline) await Bun.sleep(10);
    const deathMs = performance.now() - started;
    console.log(`supervisor ${mode}: exit=${outcome.exitCode} signal=${outcome.signalCode} final_death_ms=${deathMs.toFixed(2)}`);
    for (const pid of pids) expect(alive(pid), `recorded PID ${pid} survives ${mode}`).toBe(false);
    for (const pgid of child.processGroups) expect(alive(-pgid)).toBe(false);
    expect(deathMs).toBeLessThanOrEqual(5000);

    const ledgerPath = join(child.storage.ledgerDir, "ledger.sqlite3");
    expect(existsSync(ledgerPath)).toBe(true);
    const ledger = new Ledger(ledgerPath);
    try {
      const rows = ledger.readAfter(0);
      expect(ledger.verify().valid).toBe(true);
      const events = rows.map(row => JSON.parse(row.event_json));
      if (mode === "crash") {
        expect(replayDurablePrefix(rows).phase, "an uncaught crash must not take the graceful close path").toBe("active");
        expect(events.some(event => event.event_type === "session_closing")).toBe(false);
      }
      if (mode === "SIGKILL") {
        expect(events.filter(event => ["session_interrupted", "session_closing", "session_closed", "session_unclean_closure"]
          .includes(event.event_type))).toEqual([]);
        expect(replayDurablePrefix(rows).phase).toBe("active");
      }
      if (mode === "clean" || mode === "SIGTERM") {
        expect(replayDurablePrefix(rows).phase).toBe("closed");
        expect(replayDurablePrefix(rows).tokenState).toBe("invalidated");
      }
      if (reconcile) {
        const last = rows.at(-1)!;
        const first = events[0]!;
        const completion = planPrefixCompletion(replayDurablePrefix(rows), {
          taskEnvelopeHash: first.task_envelope_hash,
          repositoryFingerprint: first.repository_fingerprint,
          previousEventHash: last.event_hash,
          lastDurableEventId: last.event_id,
          createdAt: new Date().toISOString(),
          eventIds: Array.from({ length: 4 }, () => crypto.randomUUID()),
          governedProcessesGone: true,
          founderCommandId: null,
        });
        expect(completion.map(event => event.event_type)).toEqual(["session_unclean_closure", "fencing_token_invalidated"]);
        ledger.appendMany(completion);
        const completed = replayDurablePrefix(ledger.readAfter(0));
        expect(completed.phase).toBe("closed");
        expect(completed.tokenState).toBe("invalidated");
        expect(ledger.verify().valid).toBe(true);
        expect(planPrefixCompletion(completed, {
          taskEnvelopeHash: first.task_envelope_hash, repositoryFingerprint: first.repository_fingerprint,
          previousEventHash: ledger.readAfter(0).at(-1)!.event_hash, lastDurableEventId: null,
          createdAt: new Date().toISOString(), eventIds: [], governedProcessesGone: true, founderCommandId: null,
        })).toEqual([]);
      }
    } finally { ledger.close(); }
  } finally { await child.dispose(); }
}

test("supervisor clean exit terminates every governed child", async () => { await scenario("clean"); }, 15_000);
test("supervisor SIGTERM terminates every governed child", async () => { await scenario("SIGTERM"); }, 15_000);
test("supervisor crash terminates every governed child", async () => { await scenario("crash"); }, 15_000);
test("supervisor SIGKILL terminates every governed child and leaves no typed terminal prefix", async () => { await scenario("SIGKILL"); }, 15_000);
test("next-start reconciliation appends session_unclean_closure after SIGKILL", async () => { await scenario("SIGKILL", true); }, 15_000);
test("no governed process survives any supervisor-death scenario", async () => {
  for (const mode of ["clean", "SIGTERM", "crash", "SIGKILL"] as const) await scenario(mode);
}, 30_000);
