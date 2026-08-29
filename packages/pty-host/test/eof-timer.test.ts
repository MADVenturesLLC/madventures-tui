// Regression: the EOF child-exit wait's deadline timer must be settlement-
// aware (Tier-2 round-5 finding 3). Structure: run the REAL host over a
// real pipe (main-guard's spawnLiveHost shape), drive stdin EOF, observe a
// clean exited fact, then hold the test open past the 5 s outer bound while
// capturing unhandled rejections. Under the pre-fix implementation the
// loser timer threw "…exceeded the §9.8 outer bound" into a settled race
// after the child exited — an unhandled rejection that surfaces here. The
// corrected implementation cancels the timer; none must arrive.
//
// CodeRabbit CR-13 (PR #35 round-8): cleanup hardening. `host` is declared
// outside `try` so the finally block can reach it for bounded cleanup
// regardless of whether the body settled normally or failed via expect().
// If an assertion fails before settlement, the test cleanup force-closes
// stdin, kills the host, and SIGKILLs the process group — the host cannot
// leak with a live `sleep 300` grandchild that would otherwise keep the
// runner alive past the test's allocation.
import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { encodeCommand, decodeFact } from "../src/frames";
import type { HostFactFrame } from "../src/frames";

const MAIN_ENTRY = join(import.meta.dir, "..", "src", "main.ts");
const REPO_ROOT = join(import.meta.dir, "..", "..", "..");
const BUN = process.execPath;

test("the EOF child-exit deadline timer fires no unhandled rejection after clean containment", async () => {
  const unhandled: unknown[] = [];
  const onUnhandled = (reason: unknown): void => {
    unhandled.push(reason);
  };
  process.on("unhandledRejection", onUnhandled);
  // Host declared outside try so finally can clean it up on every path.
  const host = Bun.spawn([BUN, MAIN_ENTRY], {
    cwd: REPO_ROOT,
    stdin: "pipe",
    stdout: "pipe",
    stderr: "pipe",
    env: { PATH: process.env.PATH ?? "", HOME: process.env.HOME ?? "" },
  });
  try {
    const hash = new Bun.CryptoHasher("sha256").update(readFileSync("/bin/sh")).digest("hex");
    host.stdin.write(
      encodeCommand({
        kind: "launch",
        path: "/bin/sh",
        sha256: hash,
        argv: ["-c", "echo EOF_TIMER_READY; sleep 300"],
        env: {},
        executionId: "exec-eof-timer",
      }),
    );
    host.stdin.flush();
    const facts: { kind: string }[] = [];
    let buffer = new Uint8Array(0);
    (async () => {
      const reader = host.stdout.getReader();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const merged = new Uint8Array(buffer.byteLength + value.byteLength);
        merged.set(buffer);
        merged.set(value, buffer.byteLength);
        buffer = merged;
        for (;;) {
          const decoded = decodeFact(buffer as Uint8Array<ArrayBuffer>);
          if (decoded === null) break;
          facts.push({ kind: decoded.frame.kind });
          buffer = buffer.subarray(decoded.consumed);
        }
      }
    })();

    const waitFor = async (kind: string, timeoutMs: number): Promise<boolean> => {
      const t0 = performance.now();
      while (!facts.some((f) => f.kind === kind) && performance.now() - t0 < timeoutMs) {
        await Bun.sleep(20);
      }
      return facts.some((f) => f.kind === kind);
    };

    expect(await waitFor("ready", 5000)).toBe(true);
    // Deliberate lifeline EOF: triggers onLifelineEof + the bounded
    // child-exit wait with its 5 s deadline timer.
    host.stdin.end();

    // The host must exit cleanly: exited fact, zero exit code.
    expect(await waitFor("exited", 10000)).toBe(true);
    // The host exits cleanly after its own 2 s grace ladder; the 5 s
    // deadline timer for child.exit must have been cancelled.
    const exitCode: number = await Promise.race([
      host.exited,
      (async () => { await Bun.sleep(5000); return -1; })(),
    ]);
    // Zero: the host shut down cleanly through the EOF containment path.
    expect(exitCode).toBe(0);
  } finally {
    // Bounded cleanup: close stdin, wait up to 2 s for settlement, then
    // SIGKILL the host + process group on the failure path. Each step
    // is bounded so a hung host cannot extend the test past its budget.
    try { host.stdin.end(); } catch { /* already closed */ }
    try {
      const settled = await Promise.race([
        host.exited,
        (async () => { await Bun.sleep(2000); return -1; })(),
      ]);
      if (settled === -1) {
        try { host.kill(); } catch { /* gone */ }
      }
    } catch {
      try { host.kill(); } catch { /* gone */ }
    }
    // Belt-and-suspenders: ensure the spawned `sleep 300` grandchild and
    // its group are gone. The host's own ladder already SIGKILLed them
    // in the success path; this is for the assertion-failure path where
    // the host may not have completed containment.
    try {
      // host.pid is the host process — its group is the launched child.
      process.kill(-host.pid, "SIGKILL");
    } catch {
      // Group already gone or platform without negative-pgid kill.
    }
    // Hold past the 5 s outer bound: any leaked timer would fire NOW into
    // an already-settled race and land in `unhandled`.
    await Bun.sleep(5600);
    process.removeListener("unhandledRejection", onUnhandled);
    expect(unhandled).toHaveLength(0);
  }
}, 20000);

// ---------------------------------------------------------------------------
// T12 (round-8, Founder directive 2026-08-29): the EOF §9.8 timeout path must
// be proven bounded FAIL-CLOSED containment — not merely bounded completion —
// with a REAL process fixture, and the real failure-path behavior must be
// observed before any production change is trusted.
//
// Why this shape is the deepest faithful harness (probe results, 2026-08-29):
//   * SIGKILL is untrappable and a `detached:true` direct child is always in
//     the group the host signals, so NO real child can survive the §3.4
//     ladder (SIGTERM -> 2 s grace -> SIGKILL) past the 5 s outer bound. A
//     real-process timeout path is therefore only reachable by stalling the
//     kernel-reaper OBSERVATION, never the kill itself.
//   * The black-box host binary cannot be made to stall its own reaper from
//     outside without a production seam (none exists; none was added).
//   * So the fixture runs the real host state machine (runSteadyState) over a
//     REAL session — real Bun.Terminal, real detached child process group,
//     real signals, real reaping — and overrides exactly one field: a Proxy
//     around the real child whose `exited` never settles. The child (sh
//     trapping SIGTERM to a no-op) is really killed by the real ladder at
//     ~2 s; at t=5 s the host's deadline fires and the fail-closed path
//     executes against a real, genuinely-contained process group.
//
// Four invariants asserted:
//   1. bounded return — runSteadyState completes within bound+2 s (and NOT
//      early: >= 4.5 s proves the real 5 s deadline actually elapsed);
//   2. no success facts — no `drained`/`exited` lifecycle frames on the
//      fact channel (real `output` frames may legitimately arrive);
//   3. fail-closed — stderr carries "lifeline-EOF containment incomplete"
//      and "failing closed", and process.exitCode === 1;
//   4. no live process left in the governed PGID — the REAL kill(-pgid, 0)
//      signal-0 group probe (never `ps -p`) reaches ESRCH within 2 s after
//      the host returns: the real ladder's SIGKILL containment held.
//
// Cleanup kills are real (never patched, per Founder directive). The
// test-process exitCode touched by the fail-closed path is saved/restored.
import {
  makeOutputPipeline,
  makeSessionCloser,
  runSteadyState,
} from "../src/main";
import type { FrameReader } from "../src/main";
import { spawnGoverned } from "../src/terminal";

function groupAlive(pgid: number): boolean {
  try {
    process.kill(-pgid, 0);
    return true;
  } catch {
    return false;
  }
}

test("EOF §9.8 timeout path is bounded fail-closed containment over a real process group (T12)", async () => {
  // Immediate-EOF command channel: first next() reports stdin EOF.
  let readerCloses = 0;
  const eofReader: FrameReader = {
    next: async () => null,
    close: async () => {
      readerCloses += 1;
    },
  };

  const pipeline = makeOutputPipeline();
  // Real child in a real detached process group; SIGTERM is ignored so the
  // ladder must escalate to the real SIGKILL rung (~2 s) — well before the
  // 5 s host deadline, mirroring the empirical macOS probe result.
  const real = spawnGoverned(
    "/bin/sh",
    ["-c", 'trap "" TERM; echo READY; while :; do sleep 0.05; done'],
    {},
    pipeline.onOutput,
  );
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

  const originalExitCode = process.exitCode;
  const originalStdoutWrite = process.stdout.write.bind(process.stdout);
  const originalStderrWrite = process.stderr.write.bind(process.stderr);
  // Facts are binary frames on the real wire: decode them through the real
  // codec and assert on the emitted KINDS, not raw text.
  const emittedKinds: string[] = [];
  let factBuffer = new Uint8Array(0);
  const stderrChunks: string[] = [];
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
    stderrChunks.push(typeof chunk === "string" ? chunk : new TextDecoder().decode(chunk as Uint8Array));
    return true;
  }) as typeof process.stderr.write;
  process.exitCode = 0;

  try {
    pipeline.markReady();
    const t0 = performance.now();
    // Invariant 1: the host completes despite the stalled reaper observation.
    await Promise.race([
      runSteadyState(eofReader, session, pipeline.markClosed),
      Bun.sleep(7_000).then(() => {
        throw new Error("EOF timeout path exceeded the §9.8 bound by 2 s (invariant 1: unbounded wait)");
      }),
    ]);
    const elapsed = performance.now() - t0;
    // And it completed via the real 5 s deadline, not a short-circuit.
    expect(elapsed).toBeGreaterThanOrEqual(4_500);

    // Invariant 2: no false successful lifecycle facts. A real `output`
    // frame (the child's READY line) may legitimately reach the channel;
    // what must NEVER appear on the fail-closed path is a successful
    // lifecycle completion: no `drained`, no `exited`.
    expect(emittedKinds).not.toContain("drained");
    expect(emittedKinds).not.toContain("exited");

    // Invariant 3: fail-closed diagnostic and non-zero process exit status.
    const stderrText = stderrChunks.join("");
    expect(stderrText).toContain("lifeline-EOF containment incomplete");
    expect(stderrText).toContain("failing closed");
    expect(process.exitCode).toBe(1);

    // The closer completed its join (frameReader closed exactly once).
    expect(readerCloses).toBe(1);

    // Invariant 4: the REAL governed process group is gone (signal-0 probe
    // -> ESRCH). The ladder's SIGKILL rung contained it at ~2 s; the
    // reaper-observation stall did not, and could not, keep it alive.
    const reaped = await Promise.race([
      (async () => {
        for (let i = 0; i < 100 && groupAlive(pgid); i++) await Bun.sleep(20);
        return !groupAlive(pgid);
      })(),
      Bun.sleep(2_000).then(() => false),
    ]);
    expect(reaped).toBe(true);
  } finally {
    process.stdout.write = originalStdoutWrite;
    process.stderr.write = originalStderrWrite;
    process.exitCode = originalExitCode === undefined ? 0 : originalExitCode;
    // Belt-and-suspenders cleanup with REAL kills: the group should already
    // be gone; awaiting the REAL reaper promise (not the Proxy's) keeps the
    // runner clean.
    try {
      process.kill(-pgid, "SIGKILL");
    } catch {
      /* group already gone — the desired terminal state */
    }
    try {
      await Promise.race([real.child.exited, Bun.sleep(2_000)]);
    } catch {
      /* reaping is Bun-internal; never fails */
    }
  }
}, 20_000);

test("control: awaitChildExit is the real control — the default closer keeps a stalled reaper pending, false completes (T12)", async () => {
  // The pre-T12 failure mode, observed directly rather than asserted from
  // reasoning: with the default awaitChildExit:true, the closer PENDING
  // FOREVER on a never-settling child.exited is exactly the unbounded wait
  // the §9.8 bound must cut off. With awaitChildExit:false the same closer
  // seam completes immediately.
  const stalled = new Promise<never>(() => {});
  let closes = 0;
  const reader: FrameReader = {
    next: async () => null,
    close: async () => {
      closes += 1;
    },
  };
  const session = {
    terminal: { close: () => {} } as unknown as Bun.Terminal,
    child: { exited: stalled, exitCode: null, signalCode: null, pid: 4242 } as unknown as Bun.Subprocess,
    pgid: 4242,
    ptyClosed: Promise.resolve(),
  } as never;
  const closerDefault = makeSessionCloser(session, reader, () => {}, 3_000, () => {});
  const pendingObserved = await Promise.race([
    closerDefault({ announce: false, signal: false, ptyPath: "pty_already_settled_failure" }).then(() => false),
    Bun.sleep(400).then(() => true),
  ]);
  expect(pendingObserved).toBe(true); // still awaiting the stalled reaper
  expect(closes).toBe(0); // never reached its join phase

  const closerBounded = makeSessionCloser(session, reader, () => {}, 3_000, () => {});
  await Promise.race([
    closerBounded({
      announce: false,
      signal: false,
      ptyPath: "pty_already_settled_failure",
      awaitChildExit: false,
    }),
    Bun.sleep(400).then(() => {
      throw new Error("awaitChildExit:false did not complete within 400 ms (invariant 1)");
    }),
  ]);
  expect(closes).toBe(1); // join completed without the reaper
});