// packages/pty-host/src/signals.ts
// Task 43: the bounded termination ladder and lifeline-EOF kill switch.
//
// §3.4 normal termination ladder:
//  1. Broker sends a typed terminate command.
//  2. Host sends SIGTERM to the child process group.
//  3. Host waits the §9.8 responsive-host child grace.
//  4. Host sends SIGKILL to any surviving process group and reports exit.
//
// §9.8 fixed deadlines (the sole normative table):
//   ack 250 ms · terminationStarted 500 ms · responsiveChildGrace 2 s ·
//   outerBound 5 s. All deadlines are measured on a monotonic clock
//   (performance.now()) and reported as observed durations — the code never
//   reads a wall clock.
//
// Fact discipline (Founder scope ruling, 2026-08-28): `termination_started`
// is the broker's §9.8 escalation-clock observable and fires ONLY on the
// explicit terminate-command path. Host-initiated containment (malformed
// frame, PTY loss beneath a live child, input-write failure, lifeline EOF)
// terminates the group identically but publishes no commanded-termination
// fact.
//
// Seam discipline: the ladder routes its signals through the injected
// `signalProcessGroup` seam and its death-detection through the injected
// `isChildRunning`-style liveness seam, so fail-closed EPERM semantics and
// deterministic synthetic tests remain authoritative. When no seam is
// injected the defaults are the real `process.kill(-pgid, …)` and the real
// signal-0 group probe.

import type { HostFactFrame } from "./frames";

/** The §9.8 normative deadline table (milliseconds). */
export const HOST_DEADLINES_MS: {
  readonly ack: 250;
  readonly terminationStarted: 500;
  readonly responsiveChildGrace: 2000;
  readonly outerBound: 5000;
} = {
  ack: 250,
  terminationStarted: 500,
  responsiveChildGrace: 2000,
  outerBound: 5000,
};

/** Default containment signaling: SIGTERM/SIGKILL to the negative PGID. */
function killGroup(pgid: number, signal: "SIGTERM" | "SIGKILL"): void {
  try {
    process.kill(-pgid, signal);
  } catch {
    // Group already gone (ESRCH) — nothing left to signal. EPERM cannot
    // occur for a group this host created; any failure means gone.
  }
}

/** Default group-liveness probe: signal 0 to the negative PGID. */
function groupIsAlive(pgid: number): boolean {
  try {
    process.kill(-pgid, 0);
    return true;
  } catch {
    // ESRCH — the group no longer exists. A signal-0 probe to a live group
    // the host itself created cannot fail with EPERM, so any failure here
    // means gone; a late survivor is still caught by the SIGKILL rung.
    return false;
  }
}

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

/** Injected seams for the ladder (defaults are the real process primitives). */
export interface LadderSeams {
  /**
   * Containment signal seam. Injected by runSteadyState so synthetic tests
   * observe exactly what the host would signal. The seam receives the
   * NEGATIVE pgid and the signal.
   */
  readonly signalProcessGroup: (pgid: number, signal: "SIGTERM" | "SIGKILL") => void;
  /**
   * Group-liveness seam: true when the process group still contains a live
   * process. Synthetic tests substitute deterministic probes; production
   * uses signal 0 (fail-closed semantics preserved upstream in main.ts).
   */
  readonly groupIsAlive: (pgid: number) => boolean;
}

const defaultSeams: LadderSeams = {
  signalProcessGroup: (pgid, signal) => killGroup(pgid, signal),
  groupIsAlive: (pgid) => {
    try {
      process.kill(-pgid, 0);
      return true;
    } catch {
      return false;
    }
  },
};

/**
 * The §3.4 bounded termination ladder for one child process group.
 *
 * 1. If `emitStarted`, emits `termination_started` (the broker's §9.8 500 ms
 *    observable, measured on the monotonic clock). Containment paths NEVER
 *    emit it — they pass `emitStarted: false`.
 * 2. Sends SIGTERM to the child process group via the injected signal seam
 *    (negative PGID — grandchildren in the group are reached).
 * 3. Waits the §9.8 responsive-host child grace (2 s), probing liveness
 *    through the injected seam on the monotonic clock.
 * 4. If any survivor remains at grace end, sends SIGKILL through the same
 *    seam — bounded by the §9.8 outer bound (5 s total).
 *
 * Every observed duration is recorded in the returned `observedMs` record:
 * `termination_started` (only meaningful when emitted), `grace_waited`
 * (ms of grace actually consumed), and `total`. Monotonic timing only
 * (`performance.now()`); the record itself is the authorized evidence path.
 */
export async function terminateChildGroup(
  pgid: number,
  emit: (f: HostFactFrame) => void,
  opts: { readonly emitStarted?: boolean; readonly seams?: Partial<LadderSeams> } = {},
): Promise<{ readonly observedMs: Record<string, number> }> {
  const emitStarted = opts.emitStarted ?? true;
  const signal = opts.seams?.signalProcessGroup ?? defaultSeams.signalProcessGroup;
  const alive = opts.seams?.groupIsAlive ?? defaultSeams.groupIsAlive;

  const t0 = performance.now();
  let graceWaited = 0;

  // §9.8: the host reports termination_started within 500 ms of the
  // broker's command — this is the broker's escalation clock observable.
  // Containment paths (no terminate command) MUST NOT emit it.
  if (emitStarted) {
    emit({ kind: "termination_started" });
  }
  const terminationStartedMs = performance.now() - t0;

  // Rung 1: SIGTERM to the negative PGID — the child AND every grandchild
  // in its group.
  signal(pgid, "SIGTERM");
  const tSigterm = performance.now();
  if (!alive(pgid)) {
    // Group already gone: nothing to terminate; report immediately.
    const total = performance.now() - t0;
    return {
      observedMs: { termination_started: terminationStartedMs, grace_waited: 0, total },
    };
  }

  // Rung 2: wait the responsive-host child grace (§9.8: 2 s), probing on
  // the monotonic clock. Exit the wait the moment the group is gone.
  // CodeRabbit CR-8 (PR #35 round): grace_waited measures the grace
  // actually consumed AFTER the SIGTERM — the clock starts here, not at
  // function entry (t0 also covers the emit and dispatch, which are not
  // grace time).
  const graceDeadline = tSigterm + HOST_DEADLINES_MS.responsiveChildGrace;
  while (performance.now() < graceDeadline) {
    if (!alive(pgid)) break;
    await sleep(10);
  }
  graceWaited = Math.min(performance.now() - tSigterm, HOST_DEADLINES_MS.responsiveChildGrace);

  // Rung 3: any survivor gets SIGKILL — bounded by the §9.8 outer bound.
  if (alive(pgid)) {
    signal(pgid, "SIGKILL");
    while (performance.now() - t0 < HOST_DEADLINES_MS.outerBound && alive(pgid)) {
      await sleep(10);
    }
  }

  const total = performance.now() - t0;
  return { observedMs: { termination_started: terminationStartedMs, grace_waited: graceWaited, total } };
}

/**
 * The second, simpler §3.4 per-child kill switch: the lifeline's stdin EOF.
 * Deliberately closing one host's stdin (or the supervisor dying) produces
 * EOF with NO terminate command — the host must terminate its child process
 * group in response. The first rung is synchronous (immediate SIGTERM to
 * the negative PGID through the injected seam); the bounded completion
 * (grace, then SIGKILL to survivors) rides the same ladder machinery in the
 * background. EOF-driven termination NEVER publishes `termination_started`
 * — no terminate command was received, so no commanded-termination fact may
 * be published.
 */
export function onLifelineEof(
  pgid: number,
  emit: (f: HostFactFrame) => void,
  opts: { readonly seams?: Partial<LadderSeams> } = {},
): void {
  const signal = opts.seams?.signalProcessGroup ?? defaultSeams.signalProcessGroup;
  const alive = opts.seams?.groupIsAlive ?? defaultSeams.groupIsAlive;

  // Immediate containment rung: SIGTERM to the negative PGID.
  signal(pgid, "SIGTERM");
  if (!alive(pgid)) {
    // Group already gone.
    return;
  }
  void (async () => {
    const t0 = performance.now();
    const graceDeadline = t0 + HOST_DEADLINES_MS.responsiveChildGrace;
    while (performance.now() < graceDeadline && alive(pgid)) {
      await sleep(10);
    }
    if (alive(pgid)) {
      signal(pgid, "SIGKILL");
    }
  })();
}