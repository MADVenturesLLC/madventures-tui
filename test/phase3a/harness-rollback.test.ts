import { expect, spyOn, test } from "bun:test";
import { existsSync, fstatSync, readdirSync, type BigIntStats } from "node:fs";
import { Ledger, INITIAL_LIFECYCLE_STATE, reduceLedgerEvent } from "@madventures/ledger";
import { BUILD_STEPS } from "../../packages/supervisor/src/build";
import * as hosts from "../../packages/broker/src/pty-host-supervisor";
import * as harness from "./runtime-harness";

function alive(pid: number): boolean {
  try { process.kill(pid, 0); return true; }
  catch (error) { if ((error as NodeJS.ErrnoException).code === "ESRCH") return false; throw error; }
}

const identity = (stat: BigIntStats): string => `${stat.dev}:${stat.ino}:${stat.birthtimeNs}`;
function descriptors(): Map<number, BigIntStats> {
  const result = new Map<number, BigIntStats>();
  for (const entry of readdirSync("/dev/fd")) {
    try { result.set(Number(entry), fstatSync(Number(entry), { bigint: true })); }
    catch (error) { if ((error as NodeJS.ErrnoException).code !== "EBADF") throw error; }
  }
  return result;
}

for (const step of BUILD_STEPS) {
  test(`injected failure at every build step leaves no residual process (${step})`, async () => {
    const channels = new Set<string>();
    const spawn = hosts.spawnPtyHost;
    const spawnSpy = spyOn(hosts, "spawnPtyHost").mockImplementation(descriptor => {
      const before = new Set([...descriptors().values()].map(identity));
      const handle = spawn(descriptor);
      for (const stat of descriptors().values()) {
        if (!before.has(identity(stat)) && stat.ino !== 0n && (stat.isSocket() || stat.isFIFO())) channels.add(identity(stat));
      }
      return handle;
    });
    const close = Ledger.prototype.close;
    let ledgerClosed = false;
    let recordsClosed = false;
    const closeSpy = spyOn(Ledger.prototype, "close").mockImplementation(function(this: Ledger) {
      const events = this.readAfter(0).map(row => JSON.parse(row.event_json));
      if (events.length) {
        const state = events.reduce(reduceLedgerEvent, INITIAL_LIFECYCLE_STATE);
        expect(state.phase).toBe("closed");
        expect(state.tokenState).not.toBe("valid");
        expect(events.filter(event => event.event_type === "session_abort")).toHaveLength(1);
        recordsClosed = true;
      }
      close.call(this);
      expect(() => this.readAfter(0)).toThrow();
      ledgerClosed = true;
    });
    let failure: harness.FixtureStartupFailure | undefined;
    try {
      if (step === "storage") {
        for (const options of [{ injectFailureAt: "unknown" }, { injectFailureAt: undefined }]) {
          await expect(harness.startFixtureSession(options as harness.HarnessOptions)).rejects.toThrow("InvalidHarnessOptions");
        }
        let accessed = false;
        await expect(harness.startFixtureSession({ get injectFailureAt(): "storage" { accessed = true; return "storage"; } }))
          .rejects.toThrow("InvalidHarnessOptions");
        expect(accessed).toBe(false);
      }
      try { await harness.startFixtureSession({ injectFailureAt: step }); }
      catch (error) {
        expect(error).toBeInstanceOf(harness.FixtureStartupFailure);
        failure = error as harness.FixtureStartupFailure;
      }
      expect(failure).toBeDefined();
      expect(failure!.failedStep).toBe(step);
      expect(failure!.failure).toBe("injected_failure");
      expect(failure!.hostPids).toHaveLength(BUILD_STEPS.indexOf(step) > BUILD_STEPS.indexOf("hosts") ? 2 : 0);
      expect(failure!.childPids).toHaveLength(BUILD_STEPS.indexOf(step) > BUILD_STEPS.indexOf("children") ? 2 : 0);
      expect(failure!.processGroups).toHaveLength(failure!.childPids.length);
      for (const pid of [...failure!.hostPids, ...failure!.childPids]) expect(alive(pid)).toBe(false);
      for (const pgid of failure!.processGroups) expect(alive(-pgid)).toBe(false);
      expect(existsSync(failure!.fixtureRoot)).toBe(false);
      expect(ledgerClosed).toBe(BUILD_STEPS.indexOf(step) > BUILD_STEPS.indexOf("ledger_open"));
      expect(recordsClosed).toBe(BUILD_STEPS.indexOf(step) > BUILD_STEPS.indexOf("session_open"));
      expect(channels.size).toBe(failure!.hostPids.length * 3);
      const openChannels = () => [...descriptors().values()].filter(stat => channels.has(identity(stat)));
      const deadline = performance.now() + 1_000;
      while (openChannels().length && performance.now() < deadline) await Bun.sleep(10);
      expect(openChannels()).toHaveLength(0);
    } finally {
      closeSpy.mockRestore();
      spawnSpy.mockRestore();
      // Failed containment must not turn a deliberate break into an orphan.
      if (failure !== undefined) {
        for (const pid of [...failure.processGroups.map(pgid => -pgid), ...failure.hostPids, ...failure.childPids]) {
          try { process.kill(pid, "SIGKILL"); }
          catch (error) { if ((error as NodeJS.ErrnoException).code !== "ESRCH") throw error; }
        }
        const pids = [...failure.hostPids, ...failure.childPids, ...failure.processGroups.map(pgid => -pgid)];
        const deadline = performance.now() + 1_000;
        while (pids.some(alive) && performance.now() < deadline) await Bun.sleep(10);
        expect(pids.some(alive)).toBe(false);
      }
    }
  }, 15_000);
}
