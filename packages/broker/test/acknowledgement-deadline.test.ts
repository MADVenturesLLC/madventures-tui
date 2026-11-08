import { expect, spyOn, test } from "bun:test";
import { readFileSync } from "node:fs";
import { escalateWedgedHost, pendingAckRegisteredForTest, spawnPtyHost } from "../src/pty-host-supervisor";
import type { EscalationOutcome } from "../src/pty-host-supervisor";
import type { HostFactFrame } from "../src/pty-host-protocol";

// Test-owned §9.8 acknowledgement deadline, deliberately not imported from
// the implementation: a test that reads the constant it verifies cannot
// detect a wrong constant.
const HOST_ACK_MS = 250;

interface ParkedTimer {
  readonly delay: number;
  readonly handle: ReturnType<typeof setTimeout>;
  fired: boolean;
  cleared: boolean;
  readonly fire: () => void;
}

// Parks the first `count` timers of at most 250 ms that the code under test
// arms: each is backed by an inert real timer, so `clearTimeout` accepts its
// handle, and its callback runs only when the test calls `fire()`. Later
// timers, and longer ones, are real. `clearTimeout` is observed so the test
// can tell whether a parked timer was cleared.
function parkAcknowledgementTimers(count: number): { readonly parked: ParkedTimer[]; readonly restore: () => void } {
  const realSetTimeout = globalThis.setTimeout;
  const realClearTimeout = globalThis.clearTimeout;
  const parked: ParkedTimer[] = [];
  const set = spyOn(globalThis, "setTimeout").mockImplementation(((
    callback: (...args: unknown[]) => void, delay?: number, ...args: unknown[]
  ) => {
    if (parked.length >= count || (delay ?? 0) > HOST_ACK_MS) return realSetTimeout(callback, delay, ...args);
    const handle = realSetTimeout(() => {}, delay);
    const timer: ParkedTimer = {
      delay: delay ?? 0,
      handle,
      fired: false,
      cleared: false,
      fire: () => {
        realClearTimeout(handle);
        timer.fired = true;
        callback(...args);
      },
    };
    parked.push(timer);
    return handle;
  }) as typeof setTimeout);
  const clear = spyOn(globalThis, "clearTimeout").mockImplementation(((id?: ReturnType<typeof setTimeout>) => {
    for (const timer of parked) if (timer.handle === id) timer.cleared = true;
    return realClearTimeout(id);
  }) as typeof clearTimeout);
  return { parked, restore: () => { set.mockRestore(); clear.mockRestore(); } };
}

test("an early acknowledgement timer waits until 250 ms before classifying a silent host as failed", async () => {
  const handle = spawnPtyHost({
    path: "/bin/cat",
    sha256: new Bun.CryptoHasher("sha256").update(readFileSync("/bin/cat")).digest("hex"),
    argv: [],
    env: {},
    executionId: "hardening-c-early-ack-timer",
  });
  let pgid: number | undefined;
  // The classification probe is the signal-0 check of the host PID; this
  // test times it on its own clock rather than reading production's.
  const realKill = process.kill.bind(process);
  let classifiedAt: number | undefined;
  const kill = spyOn(process, "kill").mockImplementation(((pid: number, signal?: string | number) => {
    if (pid === handle.hostPid && signal === 0 && classifiedAt === undefined) classifiedAt = performance.now();
    return realKill(pid, signal);
  }) as typeof process.kill);
  try {
    const first = await handle.facts()[Symbol.asyncIterator]().next();
    expect(first.done).toBe(false);
    expect(first.value.kind).toBe("launched");
    pgid = (first.value as Extract<HostFactFrame, { kind: "launched" }>).pgid;
    process.kill(handle.hostPid, "SIGSTOP");

    // Park the acknowledgement timer and its first re-arm, and fire each
    // early in turn: two consecutive early firings. The second re-arm is a
    // real timer. The stopped host cannot acknowledge.
    const timers = parkAcknowledgementTimers(2);
    const started = performance.now();
    let escalation: Promise<EscalationOutcome>;
    try {
      escalation = escalateWedgedHost(handle, pgid!, handle.hostPid);
      expect(timers.parked).toHaveLength(1);
      timers.parked[0]!.fire();
      expect(timers.parked).toHaveLength(2);
      timers.parked[1]!.fire();
    } finally { timers.restore(); }
    const firedMs = performance.now() - started;
    for (const timer of timers.parked) {
      expect(timer.delay).toBeGreaterThan(0);
      expect(timer.delay).toBeLessThanOrEqual(250);
      expect(timer.fired).toBe(true);
    }
    expect(firedMs).toBeLessThan(250);

    const outcome = await escalation;
    expect(classifiedAt).toBeDefined();
    expect(classifiedAt! - started).toBeGreaterThanOrEqual(HOST_ACK_MS);
    expect(outcome.reason).toBe("pty_host_failure");
    expect(outcome.state).toBe("S3");
    expect(outcome.escalated).toBe(true);
    expect(outcome.sessionInterruptionRequired).toBe(true);
    expect(outcome.observedMs.ackWindowEndedMs).toBeGreaterThanOrEqual(250);
  } finally {
    kill.mockRestore();
    if (pgid !== undefined) { try { process.kill(-pgid, "SIGKILL"); } catch {} }
    try { process.kill(handle.hostPid, "SIGKILL"); } catch {}
    handle.closeStdin();
  }
});

test("an acknowledgement after an early acknowledgement timer leaves no acknowledgement timer live", async () => {
  const handle = spawnPtyHost({
    path: "/bin/cat",
    sha256: new Bun.CryptoHasher("sha256").update(readFileSync("/bin/cat")).digest("hex"),
    argv: [],
    env: {},
    executionId: "hardening-d-ack-after-early-timer",
  });
  let pgid: number | undefined;
  try {
    const first = await handle.facts()[Symbol.asyncIterator]().next();
    expect(first.done).toBe(false);
    expect(first.value.kind).toBe("launched");
    pgid = (first.value as Extract<HostFactFrame, { kind: "launched" }>).pgid;

    // The host is not stopped, so it acknowledges the terminate command.
    // The acknowledgement timer fires early before the host can answer, and
    // the timer it re-arms stays parked, so only the acknowledgement can end
    // the window.
    const timers = parkAcknowledgementTimers(2);
    let outcome: EscalationOutcome;
    try {
      const escalation = escalateWedgedHost(handle, pgid!, handle.hostPid);
      expect(timers.parked).toHaveLength(1);
      timers.parked[0]!.fire();
      expect(timers.parked).toHaveLength(2);
      expect(pendingAckRegisteredForTest(handle)).toBe(true);
      outcome = await Promise.race([
        escalation,
        Bun.sleep(5000).then((): never => { throw new Error("the host did not acknowledge within 5000 ms"); }),
      ]);
    } finally { timers.restore(); }

    expect(outcome.state).toBe("S1");
    expect(outcome.escalated).toBe(false);
    expect(timers.parked[0]!.fired).toBe(true);
    // Every acknowledgement timer the window armed has fired or been cleared.
    expect(timers.parked.filter((timer) => !timer.fired && !timer.cleared)).toHaveLength(0);
    expect(timers.parked[1]!.cleared).toBe(true);
  } finally {
    if (pgid !== undefined) { try { process.kill(-pgid, "SIGKILL"); } catch {} }
    try { process.kill(handle.hostPid, "SIGKILL"); } catch {}
    handle.closeStdin();
  }
});
