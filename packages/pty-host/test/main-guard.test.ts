// packages/pty-host/test/main-guard.test.ts
// madv-pty-host has no independent authority: without the supervisor's
// control channel and a valid first launch frame, it cannot create a PTY
// or a child, regardless of command-line flags or ambient environment.
// Also covers the full valid session lifecycle and its shutdown triggers
// (terminate command, natural child exit, a rejected second launch frame,
// and a malformed steady-state frame) — driven event-first: every command
// is sent only after observing the fact it depends on, never after a fixed
// sleep. Timeouts here are failure bounds only.

import { expect, test } from "bun:test";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { mkdtempSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { encodeCommand, decodeFact } from "../src/frames";
import type { HostCommandFrame, HostFactFrame } from "../src/frames";
import {
  makeSessionCloser,
  makeOutputPipeline,
  awaitPtyClosure,
  PtyClosureTimeoutError,
  runSteadyState,
  defaultChildRunningProbe,
  classifyKillZeroError,
  parseLinuxProcStatState,
  isMacOsZombiePsState,
} from "../src/main";
import type { FrameReader } from "../src/main";
import { PtyReadError } from "../src/terminal";
import type { GovernedSession } from "../src/terminal";

const MODULE_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(MODULE_DIR, "..", "..", "..");
const MAIN_ENTRY = "packages/pty-host/src/main.ts";

/**
 * A shell script that, if actually executed, records its own PID to a
 * marker file. Its absence after a run is a deterministic, PID-backed proof
 * that no child process was ever created — stronger than an absence-of-
 * stdout inference.
 */
function makeSentinel(): { readonly scriptPath: string; readonly markerPath: string; readonly cleanup: () => void } {
  const dir = mkdtempSync(join(tmpdir(), "pty-host-sentinel-"));
  const markerPath = join(dir, "marker");
  const scriptPath = join(dir, "sentinel.sh");
  writeFileSync(scriptPath, `#!/bin/sh\necho $$ > "${markerPath}"\n`, { mode: 0o755 });
  return { scriptPath, markerPath, cleanup: () => rmSync(dir, { recursive: true, force: true }) };
}

interface RunResult {
  readonly exitCode: number;
  readonly stdout: Uint8Array;
  readonly stderr: string;
}

/** One-shot runner for the guard tests: a single stdin payload, then EOF. */
async function runHost(
  args: readonly string[],
  opts: { readonly stdinBytes?: Uint8Array; readonly env?: Record<string, string> } = {},
): Promise<RunResult> {
  const proc = Bun.spawn(["bun", MAIN_ENTRY, ...args], {
    cwd: REPO_ROOT,
    stdin: "pipe",
    stdout: "pipe",
    stderr: "pipe",
    env: { ...process.env, ...opts.env },
  });
  if (opts.stdinBytes && opts.stdinBytes.byteLength > 0) {
    proc.stdin.write(opts.stdinBytes);
  }
  proc.stdin.end();
  const stdout = new Uint8Array(await new Response(proc.stdout).arrayBuffer());
  const stderr = await new Response(proc.stderr).text();
  const exitCode = await proc.exited;
  return { exitCode, stdout, stderr };
}

function concatBytes(a: Uint8Array<ArrayBuffer>, b: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> {
  const out = new Uint8Array(a.byteLength + b.byteLength);
  out.set(a, 0);
  out.set(b, a.byteLength);
  return out;
}

interface LiveHost {
  /** Write a command frame immediately; the caller decides when, based on facts already observed. */
  readonly write: (bytes: Uint8Array) => void;
  /** Every fact decoded from stdout so far, in arrival order. */
  readonly facts: () => readonly HostFactFrame[];
  /** Resolves as soon as a fact matching `predicate` has been observed; timeoutMs is a failure bound only. */
  readonly waitForFact: (predicate: (f: HostFactFrame) => boolean, timeoutMs?: number) => Promise<HostFactFrame>;
  /** Resolves as soon as the concatenated text of every `output` fact so far contains `marker`. */
  readonly waitForOutputContaining: (marker: string, timeoutMs?: number) => Promise<void>;
  /** Closes stdin and waits for the process to exit and stdout to be fully drained and decoded. */
  readonly finish: () => Promise<{ readonly exitCode: number; readonly stderr: string; readonly leftoverBytes: number }>;
}

/**
 * Spawns the host with stdin held open under the caller's control and
 * decodes stdout fact frames incrementally, live, while the process runs.
 * `waitForFact`/`waitForOutputContaining` are the only synchronization
 * primitive: every test built on this drives the protocol by observing real
 * facts, never by guessing how long an operation takes.
 */
function spawnLiveHost(args: readonly string[] = [], opts: { readonly env?: Record<string, string> } = {}): LiveHost {
  const proc = Bun.spawn(["bun", MAIN_ENTRY, ...args], {
    cwd: REPO_ROOT,
    stdin: "pipe",
    stdout: "pipe",
    stderr: "pipe",
    env: { ...process.env, ...opts.env },
  });

  const facts: HostFactFrame[] = [];
  let buffer: Uint8Array<ArrayBuffer> = new Uint8Array(0);
  let leftoverBytes = 0;
  let updateWaiters: Array<() => void> = [];

  function signalUpdate(): void {
    const toRun = updateWaiters;
    updateWaiters = [];
    for (const w of toRun) w();
  }

  const pumped = (async () => {
    const reader = proc.stdout.getReader();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer = concatBytes(buffer, new Uint8Array(value));
      for (;;) {
        const decoded = decodeFact(buffer);
        if (decoded === null) break;
        facts.push(decoded.frame);
        buffer = buffer.subarray(decoded.consumed);
      }
      signalUpdate();
    }
    leftoverBytes = buffer.byteLength;
    signalUpdate();
  })();

  async function waitForCondition(check: () => boolean, timeoutMs: number): Promise<void> {
    const deadlineAt = performance.now() + timeoutMs;
    while (!check()) {
      const remaining = deadlineAt - performance.now();
      if (remaining <= 0) {
        throw new Error(`condition not observed within ${timeoutMs}ms`);
      }
      await Promise.race([
        new Promise<void>((resolve) => updateWaiters.push(resolve)),
        new Promise<void>((resolve) => setTimeout(resolve, remaining)),
      ]);
    }
  }

  async function waitForFact(predicate: (f: HostFactFrame) => boolean, timeoutMs = 4000): Promise<HostFactFrame> {
    await waitForCondition(() => facts.some(predicate), timeoutMs);
    const found = facts.find(predicate);
    if (!found) throw new Error("waitForFact: condition satisfied but no matching fact found");
    return found;
  }

  async function waitForOutputContaining(marker: string, timeoutMs = 4000): Promise<void> {
    await waitForCondition(() => {
      const text = facts
        .filter((f) => f.kind === "output")
        .map((f) => new TextDecoder().decode((f as { bytes: Uint8Array }).bytes))
        .join("");
      return text.includes(marker);
    }, timeoutMs);
  }

  async function finish(): Promise<{ exitCode: number; stderr: string; leftoverBytes: number }> {
    proc.stdin.end();
    const stderr = await new Response(proc.stderr).text();
    const exitCode = await proc.exited;
    await pumped;
    return { exitCode, stderr, leftoverBytes };
  }

  return { write: (bytes) => proc.stdin.write(bytes), facts: () => facts, waitForFact, waitForOutputContaining, finish };
}

function outputText(facts: readonly HostFactFrame[]): string {
  return facts
    .filter((f) => f.kind === "output")
    .map((f) => new TextDecoder().decode((f as { bytes: Uint8Array }).bytes))
    .join("");
}

test("direct invocation without a control channel fails before PTY creation", async () => {
  const sentinel = makeSentinel();
  try {
    const result = await runHost(["--path", sentinel.scriptPath]);
    expect(result.exitCode).not.toBe(0);
    expect(result.stderr).toContain("no_control_channel");
    // No fact frame — launched or otherwise — was ever written, which is only
    // possible once a child has been created.
    expect(result.stdout.byteLength).toBe(0);
    // Deterministic proof: the sentinel executable was never run.
    expect(existsSync(sentinel.markerPath)).toBe(false);
  } finally {
    sentinel.cleanup();
  }
});

test("a command-line executable path confers no launch authority", async () => {
  const sentinel = makeSentinel();
  try {
    const result = await runHost(["--path", sentinel.scriptPath]);
    expect(result.exitCode).not.toBe(0);
    expect(result.stderr).toContain("no_control_channel");
    expect(result.stdout.byteLength).toBe(0);
    expect(existsSync(sentinel.markerPath)).toBe(false);
  } finally {
    sentinel.cleanup();
  }
});

test("an ambient MADV_ variable confers no launch authority", async () => {
  const sentinel = makeSentinel();
  try {
    const result = await runHost([], {
      env: { MADV_LAUNCH_PATH: sentinel.scriptPath, MADV_RUNTIME_DIR: "/tmp" },
    });
    expect(result.exitCode).not.toBe(0);
    expect(result.stderr).toContain("no_control_channel");
    expect(result.stdout.byteLength).toBe(0);
    expect(existsSync(sentinel.markerPath)).toBe(false);
  } finally {
    sentinel.cleanup();
  }
});

test("the first frame must be a launch frame", async () => {
  const sentinel = makeSentinel();
  try {
    const notLaunch = encodeCommand({ kind: "terminate" });
    const result = await runHost(["--path", sentinel.scriptPath], {
      stdinBytes: notLaunch,
      env: { MADV_LAUNCH_PATH: sentinel.scriptPath },
    });
    expect(result.exitCode).not.toBe(0);
    expect(result.stderr).toContain("no_control_channel");
    expect(result.stdout.byteLength).toBe(0);
    expect(existsSync(sentinel.markerPath)).toBe(false);
  } finally {
    sentinel.cleanup();
  }
});

test("a valid session lifecycle emits every fact in order exactly once, with no truncation", async () => {
  const host = spawnLiveHost();
  host.write(
    encodeCommand({
      kind: "launch",
      path: "/bin/cat",
      sha256: "a".repeat(64),
      argv: [],
      env: {},
      executionId: "exec-lifecycle",
    }),
  );
  await host.waitForFact((f) => f.kind === "ready");

  host.write(encodeCommand({ kind: "input", bytes: new TextEncoder().encode("ping\n") }));
  await host.waitForFact((f) => f.kind === "ack" && f.ofKind === "input");
  await host.waitForOutputContaining("ping\r\nping\r\n"); // local echo + /bin/cat's own echo

  host.write(encodeCommand({ kind: "resize", cols: 90, rows: 30 }));
  await host.waitForFact((f) => f.kind === "ack" && f.ofKind === "resize");

  host.write(encodeCommand({ kind: "terminate" }));
  await host.waitForFact((f) => f.kind === "exited");

  const { exitCode, stderr, leftoverBytes } = await host.finish();
  expect(exitCode).toBe(0);
  expect(stderr).toBe("");
  expect(leftoverBytes).toBe(0); // no truncated final frame

  const facts = host.facts();
  const kinds = facts.map((f) => f.kind);

  expect(kinds[0]).toBe("launched");
  expect(kinds[1]).toBe("ready");
  expect(kinds.filter((k) => k === "launched")).toHaveLength(1);
  expect(kinds.filter((k) => k === "ready")).toHaveLength(1);
  for (const kind of ["termination_started", "drained", "exited"] as const) {
    expect(kinds.filter((k) => k === kind)).toHaveLength(1);
  }

  const acks = facts.filter((f) => f.kind === "ack");
  expect(acks.map((f) => f.ofKind).sort()).toEqual(["input", "resize", "terminate"]);
  expect(outputText(facts)).toBe("ping\r\nping\r\n");

  const termStartedIdx = kinds.indexOf("termination_started");
  const terminateAckIdx = facts.findIndex((f) => f.kind === "ack" && f.ofKind === "terminate");
  const drainedIdx = kinds.indexOf("drained");
  const exitedIdx = kinds.indexOf("exited");
  expect(termStartedIdx).toBeLessThan(terminateAckIdx);
  expect(terminateAckIdx).toBeLessThan(drainedIdx);
  expect(drainedIdx).toBeLessThan(exitedIdx);
  expect(exitedIdx).toBe(kinds.length - 1);
});

test("natural child exit without a terminate command publishes an exact marker, drained, and exited exactly once", async () => {
  const marker = "NATURAL_EXIT_MARKER_7b21";
  const host = spawnLiveHost();
  host.write(
    encodeCommand({
      kind: "launch",
      path: "/bin/sh",
      sha256: "b".repeat(64),
      argv: ["-c", `echo ${marker}; exit 7`],
      env: {},
      executionId: "exec-natural",
    }),
  );
  // Deliberately never send terminate; wait for the natural-exit lifecycle to
  // complete on its own.
  await host.waitForFact((f) => f.kind === "exited");

  const { exitCode, stderr, leftoverBytes } = await host.finish();
  expect(exitCode).toBe(0);
  expect(stderr).toBe("");
  expect(leftoverBytes).toBe(0);

  const facts = host.facts();
  const kinds = facts.map((f) => f.kind);
  expect(kinds[0]).toBe("launched");
  expect(kinds[1]).toBe("ready");
  expect(outputText(facts)).toContain(marker);
  expect(kinds.filter((k) => k === "drained")).toHaveLength(1);
  expect(kinds.filter((k) => k === "exited")).toHaveLength(1);
  expect(kinds[kinds.length - 1]).toBe("exited");

  const exited = facts.find((f) => f.kind === "exited");
  expect(exited).toMatchObject({ kind: "exited", code: 7, signal: null });

  // No terminate was ever sent, so nothing announces a commanded termination.
  expect(kinds).not.toContain("termination_started");
  expect(facts.some((f) => f.kind === "ack" && f.ofKind === "terminate")).toBe(false);
});

test("a second launch frame is rejected, not ignored, and never creates another child", async () => {
  const host = spawnLiveHost();
  host.write(
    encodeCommand({
      kind: "launch",
      path: "/bin/cat",
      sha256: "c".repeat(64),
      argv: [],
      env: {},
      executionId: "exec-first",
    }),
  );
  await host.waitForFact((f) => f.kind === "ready");

  host.write(
    encodeCommand({
      kind: "launch",
      path: "/bin/sh",
      sha256: "d".repeat(64),
      argv: [],
      env: {},
      executionId: "exec-second",
    }),
  );
  await host.waitForFact((f) => f.kind === "exited");

  const { exitCode, stderr, leftoverBytes } = await host.finish();
  // Rejection is a protocol violation, distinct from a clean terminate.
  expect(exitCode).not.toBe(0);
  expect(stderr.length).toBeGreaterThan(0);
  expect(leftoverBytes).toBe(0);

  const kinds = host.facts().map((f) => f.kind);
  // Exactly one session was ever launched; the second launch frame produced
  // no second `launched` fact.
  expect(kinds.filter((k) => k === "launched")).toHaveLength(1);
  expect(kinds.filter((k) => k === "drained")).toHaveLength(1);
  expect(kinds.filter((k) => k === "exited")).toHaveLength(1);
  expect(kinds[kinds.length - 1]).toBe("exited");
});

test("a malformed steady-state frame is diagnosed, fails non-zero, and closes the session exactly once", async () => {
  const host = spawnLiveHost();
  host.write(
    encodeCommand({
      kind: "launch",
      path: "/bin/cat",
      sha256: "e".repeat(64),
      argv: [],
      env: {},
      executionId: "exec-malformed",
    }),
  );
  await host.waitForFact((f) => f.kind === "ready");

  // Valid length prefix, unknown command tag: a malformed steady-state frame.
  host.write(new Uint8Array([0x00, 0x00, 0x00, 0x01, 0xfe]));
  await host.waitForFact((f) => f.kind === "exited");

  const { exitCode, stderr, leftoverBytes } = await host.finish();
  expect(exitCode).not.toBe(0);
  expect(stderr).toContain("malformed steady-state frame");
  expect(leftoverBytes).toBe(0);

  const kinds = host.facts().map((f) => f.kind);
  expect(kinds).not.toContain("termination_started"); // not a terminate command
  expect(kinds.filter((k) => k === "drained")).toHaveLength(1);
  expect(kinds.filter((k) => k === "exited")).toHaveLength(1);
  expect(kinds[kinds.length - 1]).toBe("exited");
});

test("early child output cannot precede launched and ready, and is required, not merely allowed", async () => {
  // A child that produces output the instant it is spawned, before the host
  // has had any command to react to — the sharpest test of the
  // launched/ready output-buffering guarantee. Zero output is a failure.
  const marker = "IMMEDIATE_OUTPUT_MARKER_3f90";
  const host = spawnLiveHost();
  host.write(
    encodeCommand({
      kind: "launch",
      path: "/bin/sh",
      sha256: "f".repeat(64),
      argv: ["-c", `echo ${marker}`],
      env: {},
      executionId: "exec-early",
    }),
  );
  await host.waitForOutputContaining(marker); // throws (fails the test) if never observed

  const facts = host.facts();
  const kinds = facts.map((f) => f.kind);
  expect(kinds[0]).toBe("launched");
  expect(kinds[1]).toBe("ready");
  const firstOutputIdx = kinds.indexOf("output");
  expect(firstOutputIdx).toBeGreaterThanOrEqual(2);

  await host.waitForFact((f) => f.kind === "exited");
  await host.finish();
});

// ── Deterministic PTY-lifecycle unit tests ──────────────────────────────
// Fully synthetic: no real subprocess, no real PTY, no dependence on
// Bun/macOS scheduling. `child.exited` and `ptyClosed` are plain promises
// these tests resolve/reject by hand, in the exact order and timing they
// choose, so the lifecycle-ordering seam — "the child process is gone" vs.
// "the PTY itself has finished delivering data, cleanly or not" — is
// exercised deterministically, including paths a real PTY essentially never
// produces on demand (a read error, a closure that never arrives).

interface CapturedHostIO {
  readonly facts: HostFactFrame[];
  readonly stderrText: () => string;
}

/** Patches process.stdout/stderr.write and process.exitCode for the duration of `fn`, then restores all three. */
async function withCapturedHostIO<T>(fn: (io: CapturedHostIO) => Promise<T>): Promise<T> {
  const facts: HostFactFrame[] = [];
  const stderrChunks: string[] = [];
  const originalStdoutWrite = process.stdout.write.bind(process.stdout);
  const originalStderrWrite = process.stderr.write.bind(process.stderr);
  const originalExitCode = process.exitCode;
  let residualBuffer: Uint8Array<ArrayBuffer> = new Uint8Array(0);

  process.stdout.write = (chunk: unknown): boolean => {
    const bytes: Uint8Array<ArrayBuffer> =
      typeof chunk === "string" ? new Uint8Array(new TextEncoder().encode(chunk)) : new Uint8Array(chunk as Uint8Array);
    residualBuffer = concatBytes(residualBuffer, bytes);
    for (;;) {
      const decoded = decodeFact(residualBuffer);
      if (decoded === null) break;
      facts.push(decoded.frame);
      residualBuffer = residualBuffer.subarray(decoded.consumed);
    }
    return true;
  };
  process.stderr.write = (chunk: unknown): boolean => {
    stderrChunks.push(typeof chunk === "string" ? chunk : new TextDecoder().decode(chunk as Uint8Array));
    return true;
  };
  // Bun quirk (verified): once process.exitCode has been set to a number,
  // assigning `undefined` does NOT clear it back — only assigning `0` does.
  // Both the pre-test baseline and the restore must account for this, or a
  // test that exercises a fail-closed path leaks a nonzero exit code into
  // this whole `bun test` process regardless of every test passing.
  process.exitCode = 0;

  try {
    return await fn({ facts, stderrText: () => stderrChunks.join("") });
  } finally {
    process.stdout.write = originalStdoutWrite;
    process.stderr.write = originalStderrWrite;
    process.exitCode = originalExitCode === undefined ? 0 : originalExitCode;
  }
}

interface FakeSession {
  readonly fakeSession: GovernedSession;
  readonly resolveChildExited: () => void;
  readonly resolvePtyClosed: () => void;
  readonly rejectPtyClosed: (err: Error) => void;
}

function makeFakeSession(): FakeSession {
  let resolveChildExited!: () => void;
  const childExited = new Promise<void>((resolve) => {
    resolveChildExited = resolve;
  });
  let resolvePtyClosed!: () => void;
  let rejectPtyClosed!: (err: Error) => void;
  const ptyClosed = new Promise<void>((resolve, reject) => {
    resolvePtyClosed = resolve;
    rejectPtyClosed = reject;
  });
  const fakeSession: GovernedSession = {
    terminal: { close: () => {} } as unknown as Bun.Terminal,
    child: { exited: childExited, exitCode: 0, signalCode: null, pid: 4242 } as unknown as Bun.Subprocess,
    pgid: 4242,
    ptyClosed,
  };
  return { fakeSession, resolveChildExited, resolvePtyClosed, rejectPtyClosed };
}

const fakeFrameReader: FrameReader = { next: async () => null, close: async () => {} };

interface FakeSessionWithCloseObserver extends FakeSession {
  readonly closeCallCount: () => number;
  /** True as soon as `terminal.close()` is called while `ptyClosed` has not yet settled. */
  readonly closeCalledBeforeSettlement: () => boolean;
}

/**
 * Same synthetic session as `makeFakeSession`, plus an instrumented
 * `terminal.close()` that records whether it was ever invoked before
 * `ptyClosed` settled (resolved or rejected) — the exact ordering the
 * confirmed Task 41 Linux defect violates. `resolvePtyClosed`/
 * `rejectPtyClosed` mark settlement themselves, so this needs no real PTY,
 * no real subprocess, and no dependence on Linux scheduling to reproduce
 * the race deterministically.
 */
function makeFakeSessionWithCloseObserver(): FakeSessionWithCloseObserver {
  let resolveChildExited!: () => void;
  const childExited = new Promise<void>((resolve) => {
    resolveChildExited = resolve;
  });
  let settled = false;
  let closeCalls = 0;
  let closeCalledBeforeSettlement = false;
  let resolvePtyClosedInner!: () => void;
  let rejectPtyClosedInner!: (err: Error) => void;
  const ptyClosed = new Promise<void>((resolve, reject) => {
    resolvePtyClosedInner = resolve;
    rejectPtyClosedInner = reject;
  });
  const fakeSession: GovernedSession = {
    terminal: {
      close: () => {
        closeCalls += 1;
        if (!settled) closeCalledBeforeSettlement = true;
      },
    } as unknown as Bun.Terminal,
    child: { exited: childExited, exitCode: 0, signalCode: null, pid: 4242 } as unknown as Bun.Subprocess,
    pgid: 4242,
    ptyClosed,
  };
  return {
    fakeSession,
    resolveChildExited,
    resolvePtyClosed: () => {
      settled = true;
      resolvePtyClosedInner();
    },
    rejectPtyClosed: (err: Error) => {
      settled = true;
      rejectPtyClosedInner(err);
    },
    closeCallCount: () => closeCalls,
    closeCalledBeforeSettlement: () => closeCalledBeforeSettlement,
  };
}

test("RED (Task 41): await_pty path must not force-close the PTY master before natural ptyClosed settlement — the confirmed Linux data-loss defect", async () => {
  // Reproduces the CI failure mode synthetically: child.exited resolves
  // first, output arrives in the window between child exit and PTY
  // settlement, and only then does the PTY settle naturally. On the
  // pre-fix d8ac686 implementation, `session.terminal.close()` is called
  // immediately after `child.exited` resolves — strictly before
  // `ptyClosed` is ever observed to settle — which this observer catches
  // deterministically without depending on a real PTY or Linux scheduling.
  await withCapturedHostIO(async (io) => {
    const { fakeSession, resolveChildExited, resolvePtyClosed, closeCallCount, closeCalledBeforeSettlement } =
      makeFakeSessionWithCloseObserver();
    const pipeline = makeOutputPipeline();
    pipeline.markReady();

    const close = makeSessionCloser(fakeSession, fakeFrameReader, pipeline.markClosed);
    // No ptyPath override: defaults to "await_pty", the child-exit-first path.
    const closePromise = close({ announce: false, signal: false });

    // (a) child.exited resolves first.
    resolveChildExited();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    // (c) Output delivered strictly between child exit and PTY settlement.
    const marker = "TASK41_BETWEEN_EXIT_AND_SETTLE_MARKER_c41a";
    pipeline.onOutput(new TextEncoder().encode(marker));
    await Promise.resolve();
    await Promise.resolve();

    // (b) The regression assertion: terminal.close() must not have fired
    // yet, since ptyClosed has not been settled.
    expect(closeCalledBeforeSettlement()).toBe(false);

    resolvePtyClosed();
    await closePromise;

    expect(closeCalledBeforeSettlement()).toBe(false);
    expect(closeCallCount()).toBeGreaterThanOrEqual(1); // still closed eventually — no resource leak

    const facts = io.facts;
    const kinds = facts.map((f) => f.kind);
    const text = facts
      .filter((f) => f.kind === "output")
      .map((f) => new TextDecoder().decode(f.bytes))
      .join("");
    expect(text).toContain(marker); // preserved, not dropped by a premature close
    const outputIdx = kinds.indexOf("output");
    const drainedIdx = kinds.indexOf("drained");
    const exitedIdx = kinds.indexOf("exited");
    expect(outputIdx).toBeGreaterThanOrEqual(0);
    expect(outputIdx).toBeLessThan(drainedIdx); // (d) drained occurs after that output
    expect(drainedIdx).toBeLessThan(exitedIdx); // (e) exited occurs after drained
    expect(process.exitCode).not.toBe(1);
  });
});

test("clean PTY closure: child exit alone cannot emit drained; output before closure is retained; closure precedes drained; drained precedes exited", async () => {
  await withCapturedHostIO(async (io) => {
    const { fakeSession, resolveChildExited, resolvePtyClosed } = makeFakeSession();
    const pipeline = makeOutputPipeline();
    pipeline.markReady();

    const close = makeSessionCloser(fakeSession, fakeFrameReader, pipeline.markClosed);
    const closePromise = close({ announce: false, signal: false });

    // Child exit alone cannot emit `drained`.
    resolveChildExited();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    expect(io.facts.some((f) => f.kind === "drained")).toBe(false);

    // Output arriving after child exit but before PTY closure is retained.
    const preCloseMarker = "POST_EXIT_PRE_CLOSE_MARKER_9f21";
    pipeline.onOutput(new TextEncoder().encode(preCloseMarker));
    await Promise.resolve();
    await Promise.resolve();
    const preCloseOutputText = io.facts
      .filter((f) => f.kind === "output")
      .map((f) => new TextDecoder().decode(f.bytes))
      .join("");
    expect(preCloseOutputText).toContain(preCloseMarker);
    expect(io.facts.some((f) => f.kind === "drained")).toBe(false); // PTY not closed yet

    // Only once PTY closure resolves does `drained`, then `exited`, appear.
    resolvePtyClosed();
    await closePromise;

    const kinds = io.facts.map((f) => f.kind);
    const outputIdx = kinds.indexOf("output");
    const drainedIdx = kinds.indexOf("drained");
    const exitedIdx = kinds.indexOf("exited");
    expect(outputIdx).toBeGreaterThanOrEqual(0);
    expect(outputIdx).toBeLessThan(drainedIdx); // the output PTY closure gated precedes drained
    expect(drainedIdx).toBeLessThan(exitedIdx);
    expect(kinds.filter((k) => k === "drained")).toHaveLength(1);
    expect(kinds.filter((k) => k === "exited")).toHaveLength(1);
    expect(process.exitCode).not.toBe(1); // clean closure never marks a failure exit
  });
});

test("PTY closure EIO after child exit is normal join success (Linux close representation), drained then exited", async () => {
  await withCapturedHostIO(async (io) => {
    const { fakeSession, resolveChildExited, rejectPtyClosed } = makeFakeSession();
    const pipeline = makeOutputPipeline();
    pipeline.markReady();

    const close = makeSessionCloser(fakeSession, fakeFrameReader, pipeline.markClosed);
    const closePromise = close({ announce: false, signal: false });

    resolveChildExited();
    await Promise.resolve();
    await Promise.resolve();
    // Linux normal slave closure is EIO / Terminal exitCode === 1. Once the
    // child lifecycle fact is already in hand, that PTY representation must
    // complete the join — not fail closed.
    rejectPtyClosed(new PtyReadError(1, null));
    await closePromise;

    expect(process.exitCode).not.toBe(1);
    const kinds = io.facts.map((f) => f.kind);
    expect(kinds.filter((k) => k === "drained")).toHaveLength(1);
    expect(kinds.filter((k) => k === "exited")).toHaveLength(1);
    expect(kinds.indexOf("drained")).toBeLessThan(kinds.indexOf("exited"));
  });
});

test("PTY closure timeout: a never-settling ptyClosed fails closed within an injected bound, no drained, no exited", async () => {
  // Exercises the isolated closure-wait helper directly, with a small
  // injected bound — proves the timeout path fires and cleans up without
  // ever waiting the production PTY_CLOSE_WAIT_MS (3000ms).
  const neverSettles = new Promise<void>(() => {});
  await expect(awaitPtyClosure(neverSettles, 20)).rejects.toBeInstanceOf(PtyClosureTimeoutError);

  // And through the full session closer, with the same small bound injected,
  // so the fail-closed behavior (diagnostic, non-zero, no drained/exited) is
  // proven end-to-end rather than only in the isolated helper.
  await withCapturedHostIO(async (io) => {
    const { fakeSession, resolveChildExited } = makeFakeSession(); // ptyClosed is deliberately never settled
    const pipeline = makeOutputPipeline();
    pipeline.markReady();

    const close = makeSessionCloser(fakeSession, fakeFrameReader, pipeline.markClosed, 20);
    const closePromise = close({ announce: false, signal: false });

    resolveChildExited();
    await closePromise; // resolves once the 20ms injected bound elapses — fast, deterministic

    expect(process.exitCode).toBe(1);
    expect(io.stderrText()).toContain("pty closure failure");
    expect(io.stderrText()).toContain("PTY did not close within 20ms");
    const kinds = io.facts.map((f) => f.kind);
    expect(kinds).not.toContain("drained");
    expect(kinds).not.toContain("exited");
  });
});

test("post-closure callback: an output callback after markClosed() is recorded as an invariant failure, not silently accepted or dropped, and emits no late output fact", async () => {
  await withCapturedHostIO(async (io) => {
    const pipeline = makeOutputPipeline();
    pipeline.markReady();
    pipeline.markClosed();

    const outputCountBefore = io.facts.filter((f) => f.kind === "output").length;
    pipeline.onOutput(new TextEncoder().encode("SHOULD_NEVER_APPEAR_AFTER_CLOSE"));

    expect(process.exitCode).toBe(1);
    expect(io.stderrText()).toContain("invariant violation");
    expect(io.stderrText()).toContain("output callback fired after PTY closure");
    expect(io.facts.filter((f) => f.kind === "output")).toHaveLength(outputCountBefore); // no late fact emitted
    expect(
      io.facts.some(
        (f) => f.kind === "output" && new TextDecoder().decode(f.bytes).includes("SHOULD_NEVER_APPEAR_AFTER_CLOSE"),
      ),
    ).toBe(false);
  });
});

test("drain correctness: a large, spaced-out shutdown tail fully arrives before drained, which precedes exited", async () => {
  // A sufficiently large, uniquely delimited tail — TAIL_LINE_0..TAIL_LINE_49
  // each separated by a real delay, ending in a final marker — queued to
  // continue arriving after the terminate command is sent and the SIGTERM
  // that follows it. This is the deterministic stress case for the drain
  // predicate: on the pre-fix implementation (a fixed quiet/max-wait pair
  // that returns once the max wait elapses regardless of whether output is
  // still active) this class of scenario is exactly what the invariant
  // "a maximum deadline must never be treated as successful drain
  // completion while output remains active" exists to rule out.
  const readyMarker = "DRAIN_TRAP_READY_2c14";
  const tailLineCount = 50;
  const tailFinalMarker = "DRAIN_TAIL_FINAL_MARKER_8e05";
  const trapBody =
    Array.from({ length: tailLineCount }, (_, i) => `echo TAIL_LINE_${i}; sleep 0.01`).join("; ") +
    `; echo ${tailFinalMarker}; exit 0`;
  const host = spawnLiveHost();
  host.write(
    encodeCommand({
      kind: "launch",
      path: "/bin/sh",
      sha256: "0".repeat(64),
      argv: ["-c", `trap "${trapBody}" TERM; echo ${readyMarker}; while true; do sleep 1; done`],
      env: {},
      executionId: "exec-drain",
    }),
  );
  await host.waitForFact((f) => f.kind === "ready");
  // Only send terminate once the child has actually installed its trap —
  // observed via its own output, never guessed via a fixed sleep.
  await host.waitForOutputContaining(readyMarker);

  host.write(encodeCommand({ kind: "terminate" }));
  await host.waitForFact((f) => f.kind === "exited", 10000);

  const { exitCode, stderr, leftoverBytes } = await host.finish();
  expect(exitCode).toBe(0);
  expect(stderr).toBe("");
  expect(leftoverBytes).toBe(0); // no bytes, and no partial frame, remain after `exited`

  const facts = host.facts();
  const kinds = facts.map((f) => f.kind);
  const text = outputText(facts);

  // Every expected tail marker arrived — not just the last one.
  for (let i = 0; i < tailLineCount; i += 1) {
    expect(text).toContain(`TAIL_LINE_${i}`);
  }
  expect(text).toContain(tailFinalMarker);

  const lastOutputIdx = kinds.lastIndexOf("output");
  const drainedIdx = kinds.indexOf("drained");
  const exitedIdx = kinds.indexOf("exited");
  expect(lastOutputIdx).toBeGreaterThanOrEqual(0);
  expect(lastOutputIdx).toBeLessThan(drainedIdx); // all expected output precedes drained
  expect(drainedIdx).toBeLessThan(exitedIdx);
  expect(kinds.filter((k) => k === "drained")).toHaveLength(1);
  expect(kinds.filter((k) => k === "exited")).toHaveLength(1);
  expect(exitedIdx).toBe(kinds.length - 1); // exited is final; no output fact follows it
});

// ── Independent child/PTY lifecycle facts (Task 41 platform-safe join) ───
// Child termination and PTY termination arrive independently. Tests settle
// or reject them by hand, in any order and after any number of turns, and
// inject an authoritative running-probe so synthetic sessions never touch a
// real PID. No fixed event-loop-turn arbitration remains in production.

/** A frame reader whose command channel never settles on its own; close() calls are counted. */
function makePendingFrameReader(): { readonly reader: FrameReader; readonly closeCount: () => number } {
  let closes = 0;
  return {
    reader: {
      next: () => new Promise<HostCommandFrame | null>(() => {}),
      close: async () => {
        closes += 1;
      },
    },
    closeCount: () => closes,
  };
}

/** Flushes the microtask queue plus one macrotask turn, so every settled-promise continuation has run. */
function flushTurn(): Promise<void> {
  return new Promise((resolve) => setImmediate(resolve));
}

/**
 * Flushes event-loop turns until `condition` holds. Deterministic: the code
 * under test is expected to act within a fixed few turns; the turn bound
 * only keeps a regression from spinning forever, it is never a wait for
 * wall-clock time.
 */
async function flushUntil(condition: () => boolean, maxTurns = 40): Promise<void> {
  for (let i = 0; i < maxTurns && !condition(); i += 1) {
    await flushTurn();
  }
}

/** Patches process.kill into a counter for the duration of `fn`, restores it, and returns the real-kill call count. */
async function countRealKillCalls(fn: () => Promise<void>): Promise<number> {
  const realKill = process.kill;
  let calls = 0;
  process.kill = (() => {
    calls += 1;
    return true;
  }) as unknown as typeof process.kill;
  try {
    await fn();
  } finally {
    process.kill = realKill;
  }
  return calls;
}

test("PTY closes first, child.exited resolves more than two event-loop turns later: normal lifecycle succeeds without false containment", async () => {
  // Directly exposes the retired two-turn arbitration defect: under that
  // heuristic this sequence was falsely failed after exactly two turns.
  await withCapturedHostIO(async (io) => {
    const { fakeSession, resolveChildExited, resolvePtyClosed } = makeFakeSession();
    const pipeline = makeOutputPipeline();
    pipeline.markReady();
    const frameReader = makePendingFrameReader();
    const signaledPgids: number[] = [];
    // Child is not authoritatively running — exited is merely delayed.
    const isChildRunning = () => false;
    try {
      const realKillCalls = await countRealKillCalls(async () => {
        const steady = runSteadyState(
          frameReader.reader,
          fakeSession,
          pipeline.markClosed,
          (pgid) => {
            signaledPgids.push(pgid);
          },
          isChildRunning,
        );
        await flushTurn();

        resolvePtyClosed();
        // More than two event-loop turns with child.exited still pending.
        await flushTurn();
        await flushTurn();
        await flushTurn();
        await flushTurn();
        await flushTurn();

        expect(signaledPgids).toHaveLength(0); // no false containment
        expect(process.exitCode).not.toBe(1);
        expect(io.facts.some((f) => f.kind === "drained")).toBe(false); // still waiting on child

        resolveChildExited();
        await steady;

        expect(signaledPgids).toHaveLength(0);
        const kinds = io.facts.map((f) => f.kind);
        expect(kinds.filter((k) => k === "drained")).toHaveLength(1);
        expect(kinds.filter((k) => k === "exited")).toHaveLength(1);
        expect(kinds.indexOf("drained")).toBeLessThan(kinds.indexOf("exited"));
        expect(frameReader.closeCount()).toBe(1);
        expect(process.exitCode).not.toBe(1);
      });
      expect(realKillCalls).toBe(0);
    } finally {
      resolveChildExited();
      resolvePtyClosed();
    }
  });
});

test("PTY EIO (Linux normal-close representation) then child exit: join succeeds, no automatic live-child failure", async () => {
  await withCapturedHostIO(async (io) => {
    const { fakeSession, resolveChildExited, rejectPtyClosed } = makeFakeSession();
    const pipeline = makeOutputPipeline();
    pipeline.markReady();
    const frameReader = makePendingFrameReader();
    const signaledPgids: number[] = [];
    const isChildRunning = () => false; // not live — death confirmed / pending reap
    const unhandled: unknown[] = [];
    const onUnhandled = (reason: unknown): void => {
      unhandled.push(reason);
    };
    process.on("unhandledRejection", onUnhandled);
    try {
      const realKillCalls = await countRealKillCalls(async () => {
        const steady = runSteadyState(
          frameReader.reader,
          fakeSession,
          pipeline.markClosed,
          (pgid) => {
            signaledPgids.push(pgid);
          },
          isChildRunning,
        );
        await flushTurn();

        rejectPtyClosed(new PtyReadError(1, null));
        await flushTurn();
        await flushTurn();
        await flushTurn();

        expect(signaledPgids).toHaveLength(0);
        expect(process.exitCode).not.toBe(1);

        resolveChildExited();
        await steady;

        expect(signaledPgids).toHaveLength(0);
        const kinds = io.facts.map((f) => f.kind);
        expect(kinds.filter((k) => k === "drained")).toHaveLength(1);
        expect(kinds.filter((k) => k === "exited")).toHaveLength(1);
        expect(frameReader.closeCount()).toBe(1);
        expect(process.exitCode).not.toBe(1);
      });
      expect(realKillCalls).toBe(0);
      expect(unhandled).toHaveLength(0);
    } finally {
      process.removeListener("unhandledRejection", onUnhandled);
      resolveChildExited();
    }
  });
});

test("PTY fails while child is authoritatively still alive: containment exactly once, reader closes, non-zero diagnostic, no drained/exited, no unhandled rejection, no real PID signaled", async () => {
  await withCapturedHostIO(async (io) => {
    const { fakeSession, resolveChildExited, rejectPtyClosed } = makeFakeSession();
    const pipeline = makeOutputPipeline();
    pipeline.markReady();
    const frameReader = makePendingFrameReader();
    const signaledPgids: number[] = [];
    const isChildRunning = () => true; // authoritative live-child signal
    const unhandled: unknown[] = [];
    const onUnhandled = (reason: unknown): void => {
      unhandled.push(reason);
    };
    process.on("unhandledRejection", onUnhandled);
    try {
      const realKillCalls = await countRealKillCalls(async () => {
        const steady = runSteadyState(
          frameReader.reader,
          fakeSession,
          pipeline.markClosed,
          (pgid) => {
            signaledPgids.push(pgid);
          },
          isChildRunning,
        );
        await flushTurn();

        rejectPtyClosed(new PtyReadError(1, null));
        await flushUntil(() => signaledPgids.length > 0);

        expect(signaledPgids).toEqual([4242]);
        expect(process.exitCode).toBe(1);
        expect(io.stderrText()).toContain("PTY read error while child still running");

        resolveChildExited();
        await steady;

        expect(signaledPgids).toEqual([4242]);
        expect(frameReader.closeCount()).toBe(1);
        expect(process.exitCode).toBe(1);
        const kinds = io.facts.map((f) => f.kind);
        expect(kinds).not.toContain("drained");
        expect(kinds).not.toContain("exited");
      });
      expect(realKillCalls).toBe(0);
      expect(unhandled).toHaveLength(0);
    } finally {
      process.removeListener("unhandledRejection", onUnhandled);
      resolveChildExited();
    }
  });
});

test("unexpected clean PTY closure while child authoritatively alive: contained exactly once, no drained/exited, no real PID signaled", async () => {
  await withCapturedHostIO(async (io) => {
    const { fakeSession, resolveChildExited, resolvePtyClosed } = makeFakeSession();
    const pipeline = makeOutputPipeline();
    pipeline.markReady();
    const frameReader = makePendingFrameReader();
    const signaledPgids: number[] = [];
    const isChildRunning = () => true;
    try {
      const realKillCalls = await countRealKillCalls(async () => {
        const steady = runSteadyState(
          frameReader.reader,
          fakeSession,
          pipeline.markClosed,
          (pgid) => {
            signaledPgids.push(pgid);
          },
          isChildRunning,
        );
        await flushTurn();

        resolvePtyClosed();
        await flushUntil(() => signaledPgids.length > 0);

        expect(signaledPgids).toEqual([4242]);
        expect(process.exitCode).toBe(1);
        expect(io.stderrText()).toContain("PTY closed while child still running");

        resolveChildExited();
        await steady;

        expect(signaledPgids).toEqual([4242]);
        expect(frameReader.closeCount()).toBe(1);
        expect(process.exitCode).toBe(1);
        const kinds = io.facts.map((f) => f.kind);
        expect(kinds).not.toContain("drained");
        expect(kinds).not.toContain("exited");
      });
      expect(realKillCalls).toBe(0);
    } finally {
      resolveChildExited();
    }
  });
});

test("steady-state child-exit-first lifecycle is unchanged: no containment signal, drained only after clean PTY closure, then exited", async () => {
  await withCapturedHostIO(async (io) => {
    const { fakeSession, resolveChildExited, resolvePtyClosed } = makeFakeSession();
    const pipeline = makeOutputPipeline();
    pipeline.markReady();
    const frameReader = makePendingFrameReader();
    const signaledPgids: number[] = [];
    try {
      const realKillCalls = await countRealKillCalls(async () => {
        const steady = runSteadyState(frameReader.reader, fakeSession, pipeline.markClosed, (pgid) => {
          signaledPgids.push(pgid);
        });
        await flushTurn();

        // Natural child exit first: no containment signal is sent, and
        // `drained` still waits for the PTY's own clean closure.
        resolveChildExited();
        await flushTurn();
        expect(signaledPgids).toHaveLength(0);
        expect(io.facts.some((f) => f.kind === "drained")).toBe(false);

        resolvePtyClosed();
        await steady;

        const kinds = io.facts.map((f) => f.kind);
        expect(kinds.filter((k) => k === "drained")).toHaveLength(1);
        expect(kinds.filter((k) => k === "exited")).toHaveLength(1);
        expect(kinds.indexOf("drained")).toBeLessThan(kinds.indexOf("exited"));
        expect(io.facts.find((f) => f.kind === "exited")).toMatchObject({ kind: "exited", code: 0, signal: null });
        expect(frameReader.closeCount()).toBe(1);
        expect(process.exitCode).not.toBe(1); // the normal sequence stays a clean result
      });
      expect(realKillCalls).toBe(0);
    } finally {
      resolveChildExited();
      resolvePtyClosed();
    }
  });
});

// ── Production child-running probe classifier ───────────────────────────
// Exercises the real production probe / pure classifiers. Synthetic PIDs
// only; process.kill is monkey-patched and always restored. No real PID or
// process group is ever signaled.

function unreapedChildSession(pid = 4242): GovernedSession {
  return {
    terminal: { close: () => {} } as unknown as Bun.Terminal,
    child: {
      exited: new Promise<void>(() => {}),
      exitCode: null,
      signalCode: null,
      killed: false,
      pid,
    } as unknown as Bun.Subprocess,
    pgid: pid,
    ptyClosed: new Promise<void>(() => {}),
  };
}

function makeErrno(code: string, message = `${code}: synthetic`): Error {
  const err = new Error(message) as Error & { code: string };
  err.name = "SystemError";
  err.code = code;
  return err;
}

test("production probe: reaped Bun child fields mean not running", () => {
  const reapedByExitCode: GovernedSession = {
    ...unreapedChildSession(),
    child: {
      exited: Promise.resolve(0),
      exitCode: 0,
      signalCode: null,
      killed: false,
      pid: 4242,
    } as unknown as Bun.Subprocess,
  };
  const reapedByKilled: GovernedSession = {
    ...unreapedChildSession(),
    child: {
      exited: Promise.resolve(0),
      exitCode: null,
      signalCode: null,
      killed: true,
      pid: 4242,
    } as unknown as Bun.Subprocess,
  };
  const reapedBySignal: GovernedSession = {
    ...unreapedChildSession(),
    child: {
      exited: Promise.resolve(null as unknown as number),
      exitCode: null,
      signalCode: "SIGTERM",
      killed: false,
      pid: 4242,
    } as unknown as Bun.Subprocess,
  };
  expect(defaultChildRunningProbe(reapedByExitCode)).toBe(false);
  expect(defaultChildRunningProbe(reapedByKilled)).toBe(false);
  expect(defaultChildRunningProbe(reapedBySignal)).toBe(false);
});

test("production probe: kill(0) success with non-zombie process is running; ESRCH is not running", () => {
  const session = unreapedChildSession(4242);
  const realKill = process.kill;
  const realPlatform = Object.getOwnPropertyDescriptor(process, "platform");
  try {
    // Force a platform with no zombie side-channel so kill(0) success alone decides.
    Object.defineProperty(process, "platform", { configurable: true, value: "sunos" });

    process.kill = ((pid: number, signal?: number | string) => {
      expect(pid).toBe(4242);
      expect(signal).toBe(0);
      return true;
    }) as typeof process.kill;
    expect(defaultChildRunningProbe(session)).toBe(true);

    process.kill = ((pid: number, signal?: number | string) => {
      expect(pid).toBe(4242);
      expect(signal).toBe(0);
      throw makeErrno("ESRCH");
    }) as typeof process.kill;
    expect(defaultChildRunningProbe(session)).toBe(false);
  } finally {
    process.kill = realKill;
    if (realPlatform) Object.defineProperty(process, "platform", realPlatform);
  }
});

test("production probe: EPERM, EACCES, and unknown kill(0) errors fail closed as running", () => {
  const session = unreapedChildSession(4242);
  const realKill = process.kill;
  try {
    for (const code of ["EPERM", "EACCES", "EIO", "UNKNOWN"] as const) {
      process.kill = (() => {
        throw makeErrno(code);
      }) as typeof process.kill;
      // Behavioral requirement: uncertain probe must NOT claim "not running".
      expect(defaultChildRunningProbe(session)).toBe(true);
    }
    // Classifier unit shape (used by the probe).
    expect(classifyKillZeroError(makeErrno("ESRCH"))).toBe("absent");
    expect(classifyKillZeroError(makeErrno("EPERM"))).toBe("uncertain");
    expect(classifyKillZeroError(makeErrno("EACCES"))).toBe("uncertain");
    expect(classifyKillZeroError(new Error("no code"))).toBe("uncertain");
  } finally {
    process.kill = realKill;
  }
});

test("production probe: Linux /proc stat zombie parsing handles command names with parentheses", () => {
  // Real shape: "pid (comm with (parens)) state ..."
  const withParensInComm = "12345 (my (weird) app) Z 1 1 1 0 -1";
  expect(parseLinuxProcStatState(withParensInComm)).toBe("Z");
  const running = "99 (bash) R 1 1 1 0 -1";
  expect(parseLinuxProcStatState(running)).toBe("R");
  const sleeping = "42 (node (main)) S 1 1 1 0 -1";
  expect(parseLinuxProcStatState(sleeping)).toBe("S");
  expect(parseLinuxProcStatState("broken")).toBeNull();
});

test("production probe: macOS ps zombie states including Z+ are recognized", () => {
  expect(isMacOsZombiePsState("Z")).toBe(true);
  expect(isMacOsZombiePsState("Z+")).toBe(true);
  expect(isMacOsZombiePsState(" Z+")).toBe(true);
  expect(isMacOsZombiePsState("R")).toBe(false);
  expect(isMacOsZombiePsState("S+")).toBe(false);
  expect(isMacOsZombiePsState("T")).toBe(false);
});

test("production probe EPERM on PTY-first path contains once (fail closed), never successful join", async () => {
  // End-to-end: defaultChildRunningProbe with EPERM must take containment,
  // not the delayed-success join path.
  await withCapturedHostIO(async (io) => {
    const { fakeSession, resolveChildExited, resolvePtyClosed } = makeFakeSession();
    // Unreaped fields so the probe reaches kill(0).
    (fakeSession.child as { exitCode: number | null }).exitCode = null;
    (fakeSession.child as { signalCode: string | null }).signalCode = null;
    (fakeSession.child as { killed: boolean }).killed = false;

    const pipeline = makeOutputPipeline();
    pipeline.markReady();
    const frameReader = makePendingFrameReader();
    const signaledPgids: number[] = [];
    const realKill = process.kill;
    try {
      process.kill = ((pid: number, signal?: number | string) => {
        // Probe uses signal 0; containment uses -pgid + SIGTERM via injected seam.
        if (signal === 0) throw makeErrno("EPERM");
        return true;
      }) as typeof process.kill;

      const steady = runSteadyState(
        frameReader.reader,
        fakeSession,
        pipeline.markClosed,
        (pgid) => {
          signaledPgids.push(pgid);
        },
        // Real production probe — not an injected boolean.
        defaultChildRunningProbe,
      );
      await flushTurn();
      resolvePtyClosed();
      await flushUntil(() => signaledPgids.length > 0);

      expect(signaledPgids).toEqual([4242]);
      expect(process.exitCode).toBe(1);
      expect(io.stderrText()).toContain("PTY closed while child still running");

      resolveChildExited();
      await steady;

      const kinds = io.facts.map((f) => f.kind);
      expect(kinds).not.toContain("drained");
      expect(kinds).not.toContain("exited");
      expect(frameReader.closeCount()).toBe(1);
    } finally {
      process.kill = realKill;
      resolveChildExited();
    }
  });
});
