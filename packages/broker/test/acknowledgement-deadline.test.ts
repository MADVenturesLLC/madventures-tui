import { expect, spyOn, test } from "bun:test";
import { readFileSync } from "node:fs";
import { escalateWedgedHost, spawnPtyHost } from "../src/pty-host-supervisor";
import type { HostFactFrame } from "../src/pty-host-protocol";

test("an early acknowledgement timer waits until 250 ms before classifying a silent host as failed", async () => {
  const handle = spawnPtyHost({
    path: "/bin/cat",
    sha256: new Bun.CryptoHasher("sha256").update(readFileSync("/bin/cat")).digest("hex"),
    argv: [],
    env: {},
    executionId: "hardening-c-early-ack-timer",
  });
  let pgid: number | undefined;
  try {
    const first = await handle.facts()[Symbol.asyncIterator]().next();
    expect(first.done).toBe(false);
    expect(first.value.kind).toBe("launched");
    pgid = (first.value as Extract<HostFactFrame, { kind: "launched" }>).pgid;
    process.kill(handle.hostPid, "SIGSTOP");

    // Capture only the acknowledgement timer, then restore the real timer
    // before firing its callback. The stopped host cannot acknowledge.
    const realSetTimeout = globalThis.setTimeout;
    const controlled: { fire?: () => void; delay?: number } = {};
    const timer = spyOn(globalThis, "setTimeout").mockImplementationOnce(((
      callback: (...args: unknown[]) => void, delay?: number, ...args: unknown[]
    ) => {
      const parked = realSetTimeout(() => {}, delay);
      controlled.delay = delay ?? 0;
      controlled.fire = () => {
        clearTimeout(parked);
        callback(...args);
      };
      return parked;
    }) as typeof setTimeout);
    const started = performance.now();
    const escalation = (() => {
      try { return escalateWedgedHost(handle, pgid!, handle.hostPid); }
      finally { timer.mockRestore(); }
    })();
    expect(controlled.delay).toBeGreaterThan(0);
    expect(controlled.delay).toBeLessThanOrEqual(250);
    if (controlled.fire === undefined) throw new Error("acknowledgement timer was not captured");
    const firedMs = performance.now() - started;
    controlled.fire();
    expect(firedMs).toBeLessThan(250);

    const outcome = await escalation;
    expect(outcome.reason).toBe("pty_host_failure");
    expect(outcome.state).toBe("S3");
    expect(outcome.escalated).toBe(true);
    expect(outcome.sessionInterruptionRequired).toBe(true);
    expect(outcome.observedMs.ackWindowEndedMs).toBeGreaterThanOrEqual(250);
  } finally {
    if (pgid !== undefined) { try { process.kill(-pgid, "SIGKILL"); } catch {} }
    try { process.kill(handle.hostPid, "SIGKILL"); } catch {}
    handle.closeStdin();
  }
});
