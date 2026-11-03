// Hardening D item 4 (DEC-20261103-01 B6 item 5): the lifeline-EOF
// child-exit wait in runSteadyState ends only once the monotonic clock has
// reached the moment its timer was armed plus the §9.8 outer bound. A timer
// that fires early must wait out the remainder, as escalateWedgedHost's
// acknowledgement window does since Hardening C (DEC-20261102-04 A4).
//
// Harness: the T12 shape of eof-timer.test.ts. The real host state machine
// (runSteadyState) runs over a REAL session — real Bun.Terminal, real
// detached child process group, real signals — with one field overridden:
// a Proxy around the real child whose `exited` never settles, so only the
// outer-bound timer can end the wait. The test forces that timer to fire
// early by replacing the global setTimeout for the test's duration: the
// first two timers armed with a delay between 1 s and the outer bound —
// only the lifeline-EOF timer and its re-arms; the ladder's polls are 10 ms
// — run their callbacks after 50 ms instead. No production seam is used.
// The test measures, on its own clock, from just before the command
// channel reports EOF until the fail-closed diagnostic that ends the wait.
import { expect, test } from "bun:test";
import { decodeFact } from "../src/frames";
import { makeOutputPipeline, runSteadyState } from "../src/main";
import type { FrameReader } from "../src/main";
import { spawnGoverned } from "../src/terminal";

// Test-owned §9.8 outer bound, deliberately not imported from the
// implementation: a test that reads the constant it verifies cannot detect
// a wrong constant.
const OUTER_BOUND_MS = 5000;
const EARLY_FIRE_MS = 50;
const EARLY_FIRINGS = 2;

test("a lifeline-EOF timer that fires early does not end the wait before the §9.8 outer bound", async () => {
  // Immediate-EOF command channel; the test's clock starts just before the
  // host is told the channel ended, which is before the host arms its timer.
  let eofAt: number | undefined;
  let readerCloses = 0;
  const eofReader: FrameReader = {
    next: async () => {
      eofAt = performance.now();
      return null;
    },
    close: async () => {
      readerCloses += 1;
    },
  };

  const pipeline = makeOutputPipeline();
  const real = spawnGoverned("/bin/sleep", ["300"], {}, pipeline.onOutput);
  const pgid = real.pgid;
  // Stall ONLY the reaper observation; everything else stays real.
  const stalledExited = new Promise<never>(() => {});
  const session = {
    ...real,
    child: new Proxy(real.child, {
      get(target, prop) {
        if (prop === "exited") return stalledExited;
        return (target as unknown as Record<string | symbol, unknown>)[prop];
      },
    }),
  } as typeof real;

  const realSetTimeout = globalThis.setTimeout;
  const earlyFirings: { readonly requestedMs: number; readonly armedAt: number; firedAt?: number }[] = [];
  globalThis.setTimeout = ((callback: (...args: unknown[]) => void, delay?: number, ...args: unknown[]) => {
    const requested = delay ?? 0;
    if (earlyFirings.length >= EARLY_FIRINGS || requested < 1000 || requested > OUTER_BOUND_MS) {
      return realSetTimeout(callback, delay, ...args);
    }
    const firing: { readonly requestedMs: number; readonly armedAt: number; firedAt?: number } = {
      requestedMs: requested,
      armedAt: performance.now(),
    };
    earlyFirings.push(firing);
    return realSetTimeout(() => {
      firing.firedAt = performance.now();
      callback(...args);
    }, EARLY_FIRE_MS);
  }) as typeof setTimeout;

  const originalExitCode = process.exitCode;
  const originalStdoutWrite = process.stdout.write.bind(process.stdout);
  const originalStderrWrite = process.stderr.write.bind(process.stderr);
  const emittedKinds: string[] = [];
  let factBuffer = new Uint8Array(0);
  const stderrChunks: string[] = [];
  let waitEndedAt: number | undefined;
  process.stdout.write = ((chunk: unknown): boolean => {
    const bytes =
      chunk instanceof Uint8Array
        ? chunk
        : new TextEncoder().encode(typeof chunk === "string" ? chunk : String(chunk));
    const merged = new Uint8Array(factBuffer.byteLength + bytes.byteLength);
    merged.set(factBuffer);
    merged.set(bytes, factBuffer.byteLength);
    factBuffer = merged;
    for (;;) {
      const decoded = decodeFact(factBuffer as Uint8Array<ArrayBuffer>);
      if (decoded === null) break;
      emittedKinds.push(decoded.frame.kind);
      factBuffer = factBuffer.subarray(decoded.consumed);
    }
    return true;
  }) as typeof process.stdout.write;
  process.stderr.write = ((chunk: unknown): boolean => {
    const text = typeof chunk === "string" ? chunk : new TextDecoder().decode(chunk as Uint8Array);
    if (waitEndedAt === undefined && text.includes("lifeline-EOF containment incomplete")) {
      waitEndedAt = performance.now();
    }
    stderrChunks.push(text);
    return true;
  }) as typeof process.stderr.write;
  process.exitCode = 0;

  try {
    pipeline.markReady();
    await Promise.race([
      runSteadyState(eofReader, session, pipeline.markClosed),
      Bun.sleep(OUTER_BOUND_MS + 3000).then(() => {
        throw new Error("the lifeline-EOF wait did not end within the outer bound plus 3 s");
      }),
    ]);

    // The test reached its claim: the lifeline-EOF timer was armed for the
    // outer bound and fired early, before the outer bound had passed.
    expect(earlyFirings.length).toBeGreaterThanOrEqual(1);
    expect(earlyFirings[0]!.requestedMs).toBe(OUTER_BOUND_MS);
    expect(earlyFirings[0]!.firedAt).toBeDefined();
    expect(earlyFirings[0]!.firedAt! - earlyFirings[0]!.armedAt).toBeLessThan(OUTER_BOUND_MS);

    // The wait ended through its fail-closed path, and not before the outer
    // bound, measured on this test's clock from before the EOF.
    expect(eofAt).toBeDefined();
    expect(waitEndedAt).toBeDefined();
    expect(waitEndedAt! - eofAt!).toBeGreaterThanOrEqual(OUTER_BOUND_MS);

    // Every other behavior of the fail-closed path is unchanged.
    const stderrText = stderrChunks.join("");
    expect(stderrText).toContain("lifeline-EOF child exit exceeded the §9.8 outer bound");
    expect(stderrText).toContain("failing closed");
    expect(process.exitCode).toBe(1);
    expect(emittedKinds).not.toContain("drained");
    expect(emittedKinds).not.toContain("exited");
    expect(readerCloses).toBe(1);
  } finally {
    globalThis.setTimeout = realSetTimeout;
    process.stdout.write = originalStdoutWrite;
    process.stderr.write = originalStderrWrite;
    process.exitCode = originalExitCode === undefined ? 0 : originalExitCode;
    try {
      process.kill(-pgid, "SIGKILL");
    } catch {
      /* group already gone */
    }
    try {
      await Promise.race([real.child.exited, Bun.sleep(2_000)]);
    } catch {
      /* reaping is Bun-internal; never fails */
    }
  }
}, 20_000);
