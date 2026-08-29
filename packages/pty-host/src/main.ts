// packages/pty-host/src/main.ts
// madv-pty-host — the private PTY host executable. Invoked only by the
// supervisor process; never a CLI subcommand and never listed in operator
// help. It has no independent launch authority: command-line flags and
// ambient MADV_* environment variables are never read. The only source of
// launch authority is the inherited control channel's first valid `launch`
// frame. Direct invocation without that channel fails before any PTY or
// child process is created.

import { readFileSync } from "node:fs";
import { decodeCommand, encodeFact, MalformedFrameError } from "./frames";
import type { HostCommandFrame, HostFactFrame } from "./frames";
import { PtyReadError, spawnGoverned } from "./terminal";
import type { GovernedSession } from "./terminal";
import { ArtifactHashMismatch, verifyAndLaunch } from "./launch";
import { HOST_DEADLINES_MS, onLifelineEof, terminateChildGroup } from "./signals";

function failNoControlChannel(reason: string): never {
  process.stderr.write(`no_control_channel: ${reason}\n`);
  process.exit(1);
}

function emit(fact: HostFactFrame): void {
  process.stdout.write(encodeFact(fact));
}

function concatBytes(a: Uint8Array<ArrayBuffer>, b: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> {
  const out = new Uint8Array(a.byteLength + b.byteLength);
  out.set(a, 0);
  out.set(b, a.byteLength);
  return out;
}

/**
 * A directly cancellable command-frame reader over stdin. A plain
 * `for await` async generator cannot be reliably interrupted mid-read —
 * `.return()` only takes effect once the pending read settles, which never
 * happens while the writer keeps the pipe open. Holding the underlying
 * `ReadableStreamDefaultReader` lets `close()` cancel an in-flight read
 * directly, which is what makes a clean, non-`process.exit()` shutdown
 * possible (requirement: flush-safe exit).
 */
function createFrameReader(): {
  next: () => Promise<HostCommandFrame | null>;
  close: () => Promise<void>;
} {
  const reader = Bun.stdin.stream().getReader();
  let buffer: Uint8Array<ArrayBuffer> = new Uint8Array(0);
  let eof = false;

  async function next(): Promise<HostCommandFrame | null> {
    for (;;) {
      const decoded = decodeCommand(buffer);
      if (decoded !== null) {
        buffer = buffer.subarray(decoded.consumed);
        return decoded.frame;
      }
      if (eof) return null;
      const { done, value } = await reader.read();
      if (done) {
        eof = true;
        continue;
      }
      buffer = concatBytes(buffer, new Uint8Array(value));
    }
  }

  async function close(): Promise<void> {
    await reader.cancel().catch(() => {});
  }

  return { next, close };
}

export interface FrameReader {
  readonly next: () => Promise<HostCommandFrame | null>;
  readonly close: () => Promise<void>;
}

/**
 * Owns the `launched`/`ready`-gated buffering (child output can arrive
 * before those lifecycle facts are written) and, symmetrically, a
 * PTY-closure gate: once `markClosed()` has been called, output must not
 * continue — no further `data` callback may emit an `output` fact. Bun's
 * own `Bun.Terminal` `exit` callback should already guarantee no `data`
 * callback fires past that point (verified empirically — see terminal.ts),
 * but this makes the invariant hold structurally, in this module, rather
 * than resting solely on that external contract. A callback that still
 * fires after closure is not a benign no-op: it is recorded as an explicit
 * invariant failure (diagnostic + non-zero exit status), not silently
 * dropped, since it would mean output arrived that the wire protocol has
 * no further way to deliver. Exported so the ordering seam is directly,
 * deterministically testable without a real PTY or subprocess.
 */
export function makeOutputPipeline(): {
  readonly onOutput: (bytes: Uint8Array) => void;
  readonly markReady: () => void;
  readonly markClosed: () => void;
} {
  let readyEmitted = false;
  let closed = false;
  const pendingOutput: Uint8Array[] = [];
  return {
    onOutput: (bytes) => {
      if (closed) {
        process.stderr.write(
          `pty-host: invariant violation: output callback fired after PTY closure (${bytes.byteLength} bytes dropped)\n`,
        );
        process.exitCode = 1;
        return;
      }
      if (!readyEmitted) {
        // The callback's chunk is only guaranteed valid for the duration of
        // the callback, so anything retained beyond it must be an owned copy.
        pendingOutput.push(bytes.slice());
        return;
      }
      emit({ kind: "output", bytes });
    },
    markReady: () => {
      readyEmitted = true;
      for (const bytes of pendingOutput) {
        if (!closed) emit({ kind: "output", bytes });
      }
      pendingOutput.length = 0;
    },
    markClosed: () => {
      closed = true;
    },
  };
}

/**
 * The bound on awaiting PTY closure after `terminal.close()` — a safety net
 * for `ptyClosed` never resolving, not a completion signal in itself.
 * Reused, not invented: the same outer child-exit deadline the repo's M17
 * Bun.Terminal spike already establishes and uses for exactly this class of
 * bounded post-exit wait — `CHILD_EXIT_WAIT_MS`,
 * test/phase3a/spike/bun-terminal-spike.ts:108.
 */
const PTY_CLOSE_WAIT_MS = 3000; // test/phase3a/spike/bun-terminal-spike.ts:108 (CHILD_EXIT_WAIT_MS)

export class PtyClosureTimeoutError extends Error {}

/**
 * Awaits `ptyClosed`, bounded by `boundMs` — an isolated, directly testable
 * unit so a test can exercise a never-settling `ptyClosed` deterministically
 * with a small injected bound instead of the production `PTY_CLOSE_WAIT_MS`.
 * The timer is always cleared once `ptyClosed` settles either way, so a fast
 * resolution never leaves a stray handle keeping the process alive for the
 * full bound.
 */
export function awaitPtyClosure(ptyClosed: Promise<void>, boundMs: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new PtyClosureTimeoutError(`PTY did not close within ${boundMs}ms`));
    }, boundMs);
    ptyClosed.then(
      () => {
        clearTimeout(timer);
        resolve();
      },
      (err: unknown) => {
        clearTimeout(timer);
        reject(err instanceof Error ? err : new Error(String(err)));
      },
    );
  });
}

/**
 * The one containment signal the host ever sends on its own authority: a
 * single SIGTERM to the child's process group (no grace period, no SIGKILL —
 * that escalation ladder remains Task 43's responsibility). Extracted as an
 * injectable seam so synthetic tests can prove containment happened exactly
 * once without any real PID or process group ever being signaled.
 */
function sigtermProcessGroup(pgid: number): void {
  try {
    process.kill(-pgid, "SIGTERM");
  } catch {
    // Group already gone — nothing left to signal.
  }
}

/**
 * Authoritative "is this child still running?" probe. Not a scheduler
 * heuristic: it combines Bun's reaped-process fields with a POSIX liveness
 * check and, on the repository's CI platforms, zombie discrimination.
 *
 * Evidence:
 * - Bun `Subprocess.killed` / `exitCode` / `signalCode` are set only once
 *   the process has been reaped (`bun-types` Subprocess docs).
 * - `process.kill(pid, 0)` probes the process table without signaling.
 *   Bun 1.3.14 surfaces failures as `SystemError` with `code` (e.g. `ESRCH`).
 *   Only `ESRCH` proves absence; `EPERM`/`EACCES`/unknown must fail closed
 *   toward "still running" (containment), never the successful join path.
 * - Spike evidence (test/phase3a/spike/bun-terminal-spike.ts): Linux PTY
 *   slave closure surfaces as EIO/`code:1`, macOS as EOF/`code:0` — so PTY
 *   status alone is not a child-liveness signal.
 * - Zombies still occupy a PID (kill 0 succeeds) until reaped; CI platforms
 *   discriminate them via `/proc/<pid>/stat` (Linux) or `ps -o state=` (macOS).
 *
 * Injectable in tests so synthetic sessions never touch a real PID.
 */
export type ChildRunningProbe = (session: GovernedSession) => boolean;

/**
 * Classifies a `process.kill(pid, 0)` failure.
 * - `absent`: ESRCH — no process table entry.
 * - `uncertain`: any other failure (EPERM, EACCES, unknown) — must not be
 *   treated as proof the child is gone.
 */
export function classifyKillZeroError(err: unknown): "absent" | "uncertain" {
  const code =
    typeof err === "object" && err !== null && "code" in err && typeof (err as { code: unknown }).code === "string"
      ? (err as { code: string }).code
      : undefined;
  if (code === "ESRCH") return "absent";
  return "uncertain";
}

/**
 * Extract the process state character from a Linux `/proc/<pid>/stat` line.
 * Command names may contain parentheses, so the state is the first field
 * after the final `)`.
 */
export function parseLinuxProcStatState(stat: string): string | null {
  const closeParen = stat.lastIndexOf(")");
  if (closeParen < 0 || closeParen + 2 >= stat.length) return null;
  return stat[closeParen + 2] ?? null;
}

/** macOS `ps -o state=` zombie forms include bare `Z` and decorated `Z+`. */
export function isMacOsZombiePsState(state: string): boolean {
  return state.trimStart().startsWith("Z");
}

function isZombiePid(pid: number): boolean {
  if (process.platform === "linux") {
    try {
      const stat = readFileSync(`/proc/${pid}/stat`, "utf8");
      return parseLinuxProcStatState(stat) === "Z";
    } catch {
      // Cannot read stat after kill(0) succeeded: do not claim "zombie"
      // (which would force not-running). Treat as not-zombie so the probe
      // fails closed toward running.
      return false;
    }
  }
  if (process.platform === "darwin") {
    const result = Bun.spawnSync(["ps", "-o", "state=", "-p", String(pid)], {
      stdout: "pipe",
      stderr: "ignore",
    });
    if (result.exitCode !== 0) return false;
    const state = new TextDecoder().decode(result.stdout as Uint8Array).trim();
    return isMacOsZombiePsState(state);
  }
  // Unknown platform: cannot discriminate zombies. Treat as not-zombie so
  // kill(0) success is interpreted as running (fail closed toward
  // containment if the PTY is already gone).
  return false;
}

export function defaultChildRunningProbe(session: GovernedSession): boolean {
  const child = session.child;
  // Bun: killed/exitCode/signalCode reflect a reaped process.
  if (child.killed) return false;
  if (child.exitCode !== null || child.signalCode !== null) return false;
  try {
    process.kill(child.pid, 0);
  } catch (err) {
    // Only ESRCH proves absence. EPERM/EACCES/unknown → still-running
    // (fail closed toward containment).
    return classifyKillZeroError(err) !== "absent";
  }
  // Entry exists: running or zombie. Only "running" is live-child failure.
  if (isZombiePid(child.pid)) return false;
  return true;
}

function isPtyReadLifecycleError(err: unknown): boolean {
  return err instanceof PtyReadError || (err instanceof Error && err.name === "PtyReadError");
}

/**
 * How the session closer correlates the two independent lifecycle facts
 * (child termination and PTY termination). Arrival order is not meaningful
 * by itself; see runSteadyState.
 */
export type SessionClosePtyPath =
  /** Child done first (or terminate path): close terminal, await PTY settlement. */
  | "await_pty"
  /** Both facts already observed as one lifecycle — publish drained/exited. */
  | "pty_already_settled_success"
  /** PTY gone beneath an authoritatively live child — contain, no terminal facts. */
  | "pty_already_settled_failure";

/**
 * Minimal, single-shot session shutdown: optionally announce and signal
 * (the terminate-command path only), then join child completion with PTY
 * completion before publishing `drained`/`exited`. Idempotent: a second
 * call is a no-op, so a terminate command racing a natural exit can never
 * double-publish the terminal facts.
 *
 * A fixed quiet interval since the last `data` callback is deliberately not
 * used here: it can only prove nothing has arrived *yet*, never that
 * nothing more will — only the PTY's own closure signal proves that. If
 * that signal never arrives within the bound, this fails closed: a
 * diagnostic and non-zero exit status, no `drained`, no `exited` — the
 * bound is a failure, never a substitute for actual PTY closure.
 *
 * PTY read-error / EIO status after the child has already exited is NOT a
 * failure: on Linux, normal slave closure is reported as EIO (`code:1`)
 * while macOS reports EOF (`code:0`). Once the child lifecycle fact is in
 * hand, either PTY representation completes the join successfully.
 */
export function makeSessionCloser(
  session: GovernedSession,
  frameReader: FrameReader,
  markOutputClosed: () => void,
  ptyCloseWaitMs: number = PTY_CLOSE_WAIT_MS,
  signalProcessGroup: (pgid: number) => void = sigtermProcessGroup,
): (opts: {
  readonly announce: boolean;
  readonly signal: boolean;
  readonly ptyPath?: SessionClosePtyPath;
}) => Promise<void> {
  let finished = false;
  return async (opts) => {
    if (finished) return;
    finished = true;
    const ptyPath: SessionClosePtyPath = opts.ptyPath ?? "await_pty";
    if (opts.signal) {
      // Task 43 §3.4 ladder (Founder scope ruling 2026-08-28): SIGTERM to
      // the negative PGID, §9.8 responsive-host grace, then SIGKILL to any
      // survivor — routed through the injected signalProcessGroup seam so
      // deterministic tests and fail-closed EPERM semantics hold.
      // `termination_started` publishes ONLY when this closer is handling
      // the explicit terminate command (`announce: true`): containment
      // paths (malformed frame, PTY loss, write failure) signal the group
      // identically but never publish a commanded-termination fact. Emit
      // order on the terminate path is termination_started THEN ack (the
      // §9.8 500 ms clock starts at the command).
      // The timing evidence flows through the typed return (observedMs in
      // the ladder); the seam interactions are asserted by the synthetic
      // tests, and no unsolicited stderr line is emitted.
      await terminateChildGroup(session.pgid, emit, {
        emitStarted: opts.announce,
        ...(signalProcessGroup
          ? {
              seams: {
                signalProcessGroup: (pgid: number, signal: "SIGTERM" | "SIGKILL") => {
                  if (signal === "SIGTERM") {
                    signalProcessGroup(pgid);
                  } else {
                    // Tier-2 FAIL remediation (df19365 logic inversion, corrected
                    // per Founder correction authorization 2026-08-28): the
                    // prior positive-match filter swallowed errors lacking a
                    // .code property. Explicit allow-list: ONLY ESRCH is
                    // swallowed (group already gone = desired terminal state,
                    // mirroring the default seam in signals.ts). Everything
                    // else — EPERM, code-less Errors, null, primitives,
                    // objects with other codes — re-throws, preserving
                    // fail-closed semantics.
                    try {
                      process.kill(-pgid, "SIGKILL");
                    } catch (err) {
                      if (
                        typeof err === "object" && err !== null && "code" in err &&
                        (err as { code: unknown }).code === "ESRCH"
                      ) {
                        // Group already gone: terminal state, nothing to do.
                      } else {
                        throw err;
                      }
                    }
                  }
                },
              },
            }
          : {}),
      });
      if (opts.announce) {
        emit({ kind: "ack", ofKind: "terminate" });
      }
    }
    await session.child.exited;

    if (ptyPath === "pty_already_settled_failure") {
      // ptyClosed already rejected before this call was reached (see
      // onPtySettled): the PTY has already stopped delivering data on its
      // own, so closing here only releases the host's master handle — it
      // cannot race pending output.
      try {
        session.terminal.close();
      } catch {
        // Already closed.
      }
      markOutputClosed();
      await frameReader.close();
      return;
    }

    if (ptyPath === "pty_already_settled_success") {
      // Same reasoning as above: ptyClosed already resolved before this call.
      try {
        session.terminal.close();
      } catch {
        // Already closed.
      }
      markOutputClosed();
      emit({ kind: "drained" });
      emit({ kind: "exited", code: session.child.exitCode, signal: session.child.signalCode });
      await frameReader.close();
      return;
    }

    // ptyPath === "await_pty": the child exited before the PTY was observed
    // to settle. Two distinct callers reach this branch:
    //  - the host itself just signaled the child (opts.signal === true —
    //    a malformed frame, stdin EOF, a rejected second launch, or a
    //    terminate command): this design sends a single SIGTERM with no
    //    grace period, and empirically a signal-killed child's PTY slave
    //    does not settle on its own without an explicit close() — so close
    //    it immediately, exactly as this path always has.
    //  - the child exited entirely on its own (opts.signal === false — the
    //    only way this branch is reached without the host having sent
    //    anything): a voluntary exit may have just written its final output
    //    through the PTY, and on Linux child reaping can be observed before
    //    that output is delivered through the `data` callback — the
    //    confirmed defect. Force-closing here can discard it, so await
    //    natural settlement first (empirically fast — verified via a
    //    synthetic Bun.Terminal probe) and only close the master afterward.
    if (opts.signal) {
      try {
        session.terminal.close();
      } catch {
        // Already closed.
      }
    }
    try {
      await awaitPtyClosure(session.ptyClosed, ptyCloseWaitMs);
    } catch (err) {
      // Child is already reaped here. A PTY read-error/EIO is the Linux
      // normal-close representation of that same death — complete the join.
      // Timeouts and other non-lifecycle failures still fail closed.
      if (!isPtyReadLifecycleError(err)) {
        markOutputClosed();
        try {
          session.terminal.close();
        } catch {
          // Already closed.
        }
        const detail = err instanceof Error ? err.message : String(err);
        process.stderr.write(`pty-host: pty closure failure: ${detail}\n`);
        process.exitCode = 1;
        await frameReader.close();
        return;
      }
    }
    if (!opts.signal) {
      // Natural settlement (clean or EIO) is now confirmed alongside child
      // exit — only now is closing the master safe.
      try {
        session.terminal.close();
      } catch {
        // Already closed by natural settlement.
      }
    }
    markOutputClosed();
    emit({ kind: "drained" });
    emit({ kind: "exited", code: session.child.exitCode, signal: session.child.signalCode });
    await frameReader.close();
  };
}

/**
 * The closed steady-state loop: exactly input, resize, and terminate are
 * meaningful after the single launch. Ends the session on command, child
 * lifecycle, command-stream EOF, or PTY lifecycle — rejecting (never
 * silently ignoring, never spawning a second child for) any further
 * `launch` frame.
 *
 * Child termination and PTY termination are two independently delivered
 * lifecycle facts. Their arrival order is not meaningful by itself:
 * success requires both, and a PTY EIO/read-error status is not proof that
 * a live child failed (Linux normal close). Correlation uses the child's
 * authoritative lifecycle fields plus an injectable running-probe — never
 * a fixed number of event-loop turns, sleeps, or quiet windows.
 *
 * The PTY lifecycle is observed from the moment steady state begins (both
 * fulfillment and rejection handlers attached immediately) so an early PTY
 * read error can never become an unhandled rejection while the host stays
 * blocked on its command channel. Containment (single SIGTERM, no ladder)
 * runs only when the PTY is gone beneath an authoritatively still-running
 * child.
 */
export async function runSteadyState(
  frameReader: FrameReader,
  session: GovernedSession,
  markOutputClosed: () => void,
  signalProcessGroup: (pgid: number) => void = sigtermProcessGroup,
  isChildRunning: ChildRunningProbe = defaultChildRunningProbe,
): Promise<void> {
  const close = makeSessionCloser(session, frameReader, markOutputClosed, PTY_CLOSE_WAIT_MS, signalProcessGroup);

  let childExitedObserved = false;
  const childExited = session.child.exited.then(() => {
    childExitedObserved = true;
    return "child_exited" as const;
  });

  type PtySettlement =
    | { readonly kind: "pty_closed" }
    | { readonly kind: "pty_read_error"; readonly err: Error };
  // Attaching both handlers now is what makes an early PTY read error
  // observed rather than an unhandled rejection.
  const ptySettled: Promise<PtySettlement> = session.ptyClosed.then(
    (): PtySettlement => ({ kind: "pty_closed" }),
    (err: unknown): PtySettlement => ({
      kind: "pty_read_error",
      err: err instanceof Error ? err : new Error(String(err)),
    }),
  );

  /**
   * PTY fact observed while child.exited may or may not have arrived.
   * Correlate with the authoritative child lifecycle — never with a
   * turn-count race.
   */
  async function onPtySettled(kind: "pty_closed" | "pty_read_error", err?: Error): Promise<void> {
    if (childExitedObserved) {
      // Both facts present (either order). Join succeeds; EIO is fine.
      await close({ announce: false, signal: false, ptyPath: "pty_already_settled_success" });
      return;
    }
    if (!isChildRunning(session)) {
      // Child is not running (reaped, fully gone, or zombie). Await the
      // authoritative exited promise — however many turns that takes — then
      // complete the successful join. No containment.
      await session.child.exited;
      childExitedObserved = true;
      await close({ announce: false, signal: false, ptyPath: "pty_already_settled_success" });
      return;
    }
    // PTY gone beneath an authoritatively live child: fail closed once.
    const detail =
      kind === "pty_read_error" && err
        ? `PTY read error while child still running: ${err.message}`
        : "PTY closed while child still running";
    process.stderr.write(`pty-host: ${detail}; containing the child and failing closed\n`);
    process.exitCode = 1;
    await close({ announce: false, signal: true, ptyPath: "pty_already_settled_failure" });
  }

  for (;;) {
    const framePromise = frameReader.next().catch((err: unknown) => ({
      malformed: err instanceof MalformedFrameError ? err.message : String(err),
    }));
    const outcome = await Promise.race([
      framePromise.then((r) => ({ source: "frame" as const, r })),
      childExited.then((source) => ({ source, r: undefined })),
      ptySettled.then((p) =>
        p.kind === "pty_read_error"
          ? ({ source: "pty_read_error" as const, err: p.err })
          : ({ source: "pty_closed" as const }),
      ),
    ]);

    if (outcome.source === "child_exited") {
      // Child fact first: closer awaits PTY (EIO accepted) then drained/exited.
      await close({ announce: false, signal: false, ptyPath: "await_pty" });
      return;
    }

    if (outcome.source === "pty_read_error") {
      await onPtySettled("pty_read_error", outcome.err);
      return;
    }

    if (outcome.source === "pty_closed") {
      await onPtySettled("pty_closed");
      return;
    }

    const r = outcome.r;
    if (typeof r === "object" && r !== null && "malformed" in r) {
      // A malformed steady-state frame is a protocol violation: diagnose it
      // clearly, fail non-zero, and contain the existing child with the
      // same single-SIGTERM minimal shutdown — no grace or escalation
      // ladder, which remains Task 43's responsibility.
      process.stderr.write(`pty-host: malformed steady-state frame: ${r.malformed}\n`);
      process.exitCode = 1;
      await close({ announce: false, signal: true });
      return;
    }
    if (r === null) {
      // Command stream ended (stdin EOF): the §3.2/§3.4 lifeline loss and
      // the SECOND per-child kill switch. EOF requires the host to
      // terminate its child process group — via onLifelineEof, which
      // signals the negative PGID immediately and completes the bounded
      // ladder (grace, then SIGKILL) without publishing
      // `termination_started`: no terminate command was ever sent.
      onLifelineEof(session.pgid, emit);
      // CodeRabbit CR-3a (PR #35 round): the child-exit wait MUST be
      // bounded by the §9.8 outer bound — `onLifelineEof` runs its ladder
      // detached, and if reaping stalls past the outer bound the host
      // would hang here forever, violating "all governed processes gone
      // within five seconds". On expiry, fail closed: non-zero exit, no
      // success facts.
      //
      // Tier-2 FAIL remediation (round-4 finding 3): the prior race loser
      // (a throwing async IIFE) kept running after the race settled and
      // threw into an unsettled promise 5 s later — an unhandled rejection
      // that could crash the process post-shutdown. The deadline is now
      // settlement-aware: one shared deadline state, polled by a single
      // cancellable waiter whose throw lands only while the race is still
      // live. When the child exits first, the timer is cancelled before it
      // can ever fire.
      let eofRaceSettled = false;
      let eofTimer: ReturnType<typeof setTimeout> | undefined;
      try {
        await new Promise<void>((resolveExit, rejectExit) => {
          const settle = (err?: Error) => {
            if (eofRaceSettled) return;
            eofRaceSettled = true;
            if (eofTimer !== undefined) clearTimeout(eofTimer);
            if (err) rejectExit(err);
            else resolveExit();
          };
          void session.child.exited.then(
            () => {
              if (!eofRaceSettled) {
                eofRaceSettled = true;
                if (eofTimer !== undefined) clearTimeout(eofTimer);
                resolveExit();
              }
            },
            (err) => {
              if (!eofRaceSettled) {
                eofRaceSettled = true;
                if (eofTimer !== undefined) clearTimeout(eofTimer);
                rejectExit(err instanceof Error ? err : new Error(String(err)));
              }
            },
          );
          eofTimer = setTimeout(() => {
            const err = new Error("lifeline-EOF child exit exceeded the §9.8 outer bound");
            if (!eofRaceSettled) {
              eofRaceSettled = true;
              rejectExit(err);
            }
            // If the race already settled, this timer's callback is a
            // no-op — the error is never thrown into a settled promise.
          }, HOST_DEADLINES_MS.outerBound);
        });
      } catch (err) {
        const detail = err instanceof Error ? err.message : String(err);
        process.stderr.write(`pty-host: lifeline-EOF containment incomplete: ${detail}; failing closed\n`);
        process.exitCode = 1;
        await close({ announce: false, signal: false, ptyPath: "pty_already_settled_failure" });
        return;
      }
      // CodeRabbit CR-3b (PR #35 round): the previous
      // Promise.race([ptyClosed, Promise.resolve()]) settled from the
      // already-resolved Promise.resolve() at construction — ptySettled was
      // always true and the await_pty join was dead code. Fix: attach a
      // settlement flag to the LIVE outer ptyClosed promise, marking
      // whether it has actually resolved or rejected by now, and select
      // the ptyPath from that flag.
      let ptySettledNow = false;
      session.ptyClosed.then(
        () => { ptySettledNow = true; },
        () => { ptySettledNow = true; },
      );
      // Give already-queued settlement callbacks one macrotask to run so
      // the flag reflects the PTY's current state, not just registration
      // order.
      await new Promise((res) => setTimeout(res, 0));
      await close({ announce: false, signal: false, ptyPath: ptySettledNow ? "pty_already_settled_success" : "await_pty" });
      return;
    }

    const frame = r;
    if (frame.kind === "launch") {
      // A second launch frame is a protocol violation, not a request: it
      // is rejected, never ignored, and never spawns another child. Close
      // the current session with the same minimal containment used for
      // stdin EOF.
      process.stderr.write("pty-host: rejected a launch frame after the session was already launched\n");
      process.exitCode = 1;
      await close({ announce: false, signal: true });
      return;
    } else if (frame.kind === "input" || frame.kind === "resize") {
      // A terminal write/resize failure must not escape the steady-state
      // loop: an unguarded throw would propagate out of runSteadyState and
      // out of main, skipping close() — no drained, no exited, and no
      // containment SIGTERM, so the child process group could survive.
      // Fail closed instead: diagnose, mark the exit code, contain the
      // child, and complete the session shutdown exactly once.
      try {
        if (frame.kind === "input") session.terminal.write(frame.bytes);
        else session.terminal.resize(frame.cols, frame.rows);
      } catch (err) {
        const detail = err instanceof Error ? err.message : String(err);
        process.stderr.write(`pty-host: terminal ${frame.kind} failed: ${detail}; containing the child\n`);
        process.exitCode = 1;
        await close({ announce: false, signal: true });
        return;
      }
      emit({ kind: "ack", ofKind: frame.kind });
    } else if (frame.kind === "terminate") {
      await close({ announce: true, signal: true });
      return;
    }
  }
}

async function main(): Promise<void> {
  // process.argv beyond the program name confers no launch authority, and
  // neither does any MADV_* ambient environment variable: neither is ever
  // read here, by design.
  if (process.stdin.isTTY) {
    failNoControlChannel("stdin is a TTY");
  }

  const frameReader = createFrameReader();
  let first: HostCommandFrame | null;
  try {
    first = await frameReader.next();
  } catch (err) {
    const detail = err instanceof MalformedFrameError ? err.message : String(err);
    failNoControlChannel(`first frame is malformed: ${detail}`);
  }
  if (first === null || first.kind !== "launch") {
    failNoControlChannel("first frame is not a valid launch frame");
  }
  const launch = first;

  // Child output can arrive before `launched`/`ready` are written (the PTY
  // may produce data the instant the child is spawned), and output must not
  // continue after PTY closure is confirmed. The pipeline gates both ends.
  const outputPipeline = makeOutputPipeline();

  // Gap-free launch (Task 42): the artifact is re-hashed immediately before
  // exec, with no storage, broker, or lifeline step between the final
  // verification and the child's exec. A mismatch fails closed before any
  // child exists.
  let launchFacts: { hostPid: number; childPid: number; pgid: number; session: GovernedSession };
  try {
    launchFacts = verifyAndLaunch(launch, {
      spawn: (path, argv, env) => spawnGoverned(path, argv, env, outputPipeline.onOutput),
    });
  } catch (err) {
    if (err instanceof ArtifactHashMismatch) {
      process.stderr.write(`pty-host: ${err.message}; refusing to launch\n`);
      process.exitCode = 1;
      await frameReader.close();
      return;
    }
    throw err;
  }
  const session = launchFacts.session;

  emit({
    kind: "launched",
    hostPid: launchFacts.hostPid,
    childPid: launchFacts.childPid,
    pgid: launchFacts.pgid,
    executionId: launch.executionId,
  });
  emit({ kind: "ready" });
  outputPipeline.markReady();

  await runSteadyState(frameReader, session, outputPipeline.markClosed);

  // No process.exit() here: it would truncate any final frame still
  // buffered in the stdout pipe. The stdin reader was cancelled inside the
  // session closer above, so — with no PTY, no child, and no pending stdin
  // read left open — the event loop drains naturally once these writes
  // actually flush, guaranteeing `output`/`drained`/`exited` reach the
  // inherited channel before the process exits.
}

// Only run as the entry point (`bun packages/pty-host/src/main.ts`), never
// as a side effect of another module importing this file's exports — as
// the test suite does to exercise makeSessionCloser/makeOutputPipeline
// directly, deterministically, without a real control channel.
if (import.meta.main) {
  await main();
}
