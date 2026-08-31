// packages/broker/src/pty-host-supervisor.ts
// Task 42: the broker-side PTY-host supervisor.
//
// §3.3 gap-free launch ordering, supervisor side:
//  1. The supervisor creates the anonymous channel.
//  2. It spawns the PTY host with the lifeline read end inherited at birth
//     and an allowlisted environment.
//  3. It closes every unintended duplicate descriptor and monitors host exit.
//  4. The host receives the authorized absolute path, expected hash,
//     arguments, environment, and identity.
//  5. Directly before `exec`, the host verifies the artifact hash.
//  6. The host creates the PTY/session/process group and launches the child.
//  7. The host reports host PID, child PID, child PGID, identity, and
//     readiness.
//  8. The broker begins normal input, output, resize, and termination
//     commands.
//
// §3.2 descriptor contract (lifeline): the host's stdin is simultaneously
// its private framed command stream and its death lifeline — EOF means the
// supervisor is gone or has deliberately revoked the child. The supervisor
// therefore holds the SOLE write end:
//
//   - The write end is a `FileSink` created by `Bun.spawn` with
//     `stdin: "pipe"`. It exists only in the supervisor process; no child,
//     sibling host, or adapter ever receives a duplicate (close-on-exec
//     hygiene by construction: Bun marks spawned pipe fds close-on-exec,
//     and no code path dups the fd elsewhere).
//   - The supervisor closes the write end exactly when the session ends
//     (`closeStdin` — the deliberate lifeline EOF kill switch) or dies;
//     in both cases the host's stdin read returns EOF and §3.4's
//     lifeline-EOF termination applies (wired in Task 43).
//   - No unintended duplicates are created: no other descriptor, stream,
//     or reference to the write end exists inside the supervisor.
//
// The child cannot exist before its death-watch. The supervisor treats host
// exit as governed-child death and interrupts the whole session — the fact
// stream ends when the host's stdout closes.

// NOTE (environment allowlist, §3.2/§5.4/PLAN-OPEN-2): the host is spawned
// with EXACTLY the descriptor's environment — no ambient variable crosses
// from the supervisor into the host. The supervisor resolves the host
// executable to an absolute path before spawning so a minimal environment
// cannot break resolution; the governed child's environment is the
// descriptor's allowlisted environment, forwarded verbatim by the host.

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { decodeFact, encodeCommand } from "./pty-host-protocol";
import type { HostCommandFrame, HostFactFrame } from "./pty-host-protocol";

const MODULE_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(MODULE_DIR, "..", "..", "..");
const HOST_ENTRY = "packages/pty-host/src/main.ts";

/** The bun executable, resolved once at module load. */
const BUN_EXECUTABLE: string = process.execPath;

/** The authorized launch descriptor the supervisor hands the host. */
export interface HostLaunchDescriptor {
  readonly path: string;
  readonly sha256: string;
  readonly argv: readonly string[];
  readonly env: Readonly<Record<string, string>>;
  readonly executionId: string;
}

/**
 * The supervisor's handle on one PTY host. `send` writes a command frame
 * over the lifeline (the host's stdin); `facts` is the decoded fact stream
 * from the host's stdout; `closeStdin` is the second per-child kill switch
 * (deliberate lifeline EOF); `killPgid` is the direct-PGID containment
 * primitive the wedged-host escalation path (Task 44) uses.
 */
export interface PtyHostHandle {
  readonly hostPid: number;
  send(f: HostCommandFrame): void;
  facts(): AsyncIterable<HostFactFrame>;
  closeStdin(): void;
  killPgid(): void;
}

/**
 * Test-only observability: the number of live `facts()` subscriber queues
 * for a handle. Kept OFF the public `PtyHostHandle` contract (the ratified
 * interface has exactly five members) — the T7-CR cleanup regression
 * needs to observe retention, so the count is registered here at
 * construction and read through this module-level accessor.
 */
const subscriberCounts = new WeakMap<PtyHostHandle, () => number>();

export function subscriberCountForTest(handle: PtyHostHandle): number {
  return subscriberCounts.get(handle)?.() ?? 0;
}

/**
 * Test-only observability: the total number of live wait callbacks across
 * all `facts()` subscriber queues for a handle. Kept OFF the public
 * `PtyHostHandle` contract and out of the package barrel, exactly like
 * `subscriberCountForTest`. The round-12 stale-waiter regression needs to
 * prove that repeated hang-net expirations do not accumulate callbacks.
 */
const waiterCounts = new WeakMap<PtyHostHandle, () => number>();

export function waiterCountForTest(handle: PtyHostHandle): number {
  return waiterCounts.get(handle)?.() ?? 0;
}

/**
 * Test-only observability: how many times `closeStdin()` was invoked on a
 * handle. Kept OFF the public `PtyHostHandle` contract and out of the
 * package barrel, exactly like `subscriberCountForTest`.
 *
 * The C7 S1 regression must prove that a timely acknowledgement leaves the
 * lifeline-EOF kill switch UNUSED. Counting inside `spawnPtyHost`'s own
 * `closeStdin` (rather than inside `escalateWedgedHost`) makes this an
 * INDEPENDENT observation: the counter increments at the real call site, so
 * the escalation path cannot report a close it did not perform, nor hide
 * one it did.
 */
const closeStdinCounts = new WeakMap<PtyHostHandle, () => number>();

export function closeStdinCallCountForTest(handle: PtyHostHandle): number {
  return closeStdinCounts.get(handle)?.() ?? 0;
}

/**
 * Production acknowledgement registry, keyed by handle.
 *
 * Greptile P1 (PR #36, bound to head dda3481): the previous design took the
 * acknowledgement exclusively from a test-populated map, so in production
 * the lookup always returned `undefined`, the ack branch could never win its
 * race, and a RESPONSIVE host would have been escalated against once the
 * caller was wired up. The C7 S1 semantics were therefore unreachable
 * outside tests — the same "works only in the test" defect class as an
 * inferred-liveness detector.
 *
 * The acknowledgement is now owned by the supervisor and resolved from the
 * REAL decoded-fact path: `enqueue()` — the single pump that every host fact
 * flows through — settles the pending record the moment it observes the
 * command-specific `ack`. Tests exercise the same production path; nothing
 * injects an acknowledgement.
 */
interface PendingAck {
  /** The command whose acknowledgement is awaited. */
  readonly ofKind: HostCommandFrame["kind"];
  /** Settled with true on a matching ack, false on any terminal path. */
  readonly settle: (acked: boolean) => void;
  /** Resolves once, on the first settle. */
  readonly promise: Promise<boolean>;
  settled: boolean;
}

/** Registers/looks up the pending acknowledgement owned by a handle. */
const pendingAcks = new WeakMap<PtyHostHandle, PendingAck>();

/** Registers/looks up the supervisor-internal ack notifier for a handle. */
const ackNotifiers = new WeakMap<PtyHostHandle, (frame: HostFactFrame) => void>();

/**
 * Test-only observability: whether a pending acknowledgement record is
 * currently registered for a handle. Off the public contract and off the
 * barrel. Proves requirement 3/4 — that no stale acknowledgement state
 * survives a terminal path and can satisfy a later escalation.
 */
const pendingAckProbes = new WeakMap<PtyHostHandle, () => boolean>();

export function pendingAckRegisteredForTest(handle: PtyHostHandle): boolean {
  return pendingAckProbes.get(handle)?.() ?? false;
}

/**
 * Clears any pending acknowledgement for a handle. Invoked on the two
 * lifecycle terminal paths the escalation call itself does not own — host
 * exit and fact-stream settlement — so no acknowledgement state can survive
 * to satisfy a LATER escalation (requirement 4).
 */
const lifecycleAckClosers = new WeakMap<PtyHostHandle, () => void>();

/**
 * §9.8 host deadline mirror (broker-local; Task 44 packet C5).
 *
 * The governing plan's Task 44 Interfaces line reads "Consumes:
 * `PtyHostHandle`, `HOST_DEADLINES_MS`", but no governing text authorizes a
 * broker->pty-host package import (the ratified constant lives in
 * `packages/pty-host/src/signals.ts`) and the repo's architecture-boundaries
 * guard governs cross-package edges. Task 44 therefore declares a
 * module-local mirror of the ratified §9.8 values. §9.8 is the SOLE
 * normative source; `packages/pty-host/src/signals.ts` `HOST_DEADLINES_MS`
 * is the same table.
 */
const HOST_DEADLINES_MS: {
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

/**
 * Module-private host lifecycle record (Task 44 packet C3).
 *
 * BINDING RULE (Founder, Task 44): `send()` / `closeStdin()` success or
 * failure is NEVER liveness evidence. Probed on Bun 1.3.14: a write to a
 * dead host's stdin succeeds silently — `FileSink` swallows EPIPE, there is
 * no synchronous throw and no unhandled rejection — so a detector built on
 * write failure never fires and its test passes vacuously. `proc.exited` is
 * the sole authoritative host-death signal; a signal-0 probe is
 * corroboration only and never declares lifecycle death.
 *
 * The watch is attached at SPAWN time (alongside the stdout pump), not when
 * escalation begins, so S0 (early exit) is observable the moment it happens
 * and `escalateWedgedHost` never races to attach a watcher mid-escalation.
 */
interface HostLifecycle {
  /** True once `proc.exited` has resolved — authoritative host death. */
  exitedResolved: boolean;
  /** Resolves when the OS reports host exit. Attached at spawn time. */
  exited: Promise<void>;
}

const lifecycles = new WeakMap<PtyHostHandle, HostLifecycle>();

function concatBytes(a: Uint8Array<ArrayBuffer>, b: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> {
  const out = new Uint8Array(a.byteLength + b.byteLength);
  out.set(a, 0);
  out.set(b, a.byteLength);
  return out;
}

async function* factStream(proc: Bun.Subprocess): AsyncGenerator<HostFactFrame> {
  const stdout = proc.stdout;
  if (stdout === undefined || typeof stdout === "number") {
    // stdout was not piped — the host cannot produce facts. This is a
    // supervisor construction error, not a runtime condition.
    throw new Error("pty-host supervisor: host stdout is not a stream");
  }
  const reader = stdout.getReader();
  let buffer: Uint8Array<ArrayBuffer> = new Uint8Array(0);
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer = concatBytes(buffer, new Uint8Array(value));
      for (;;) {
        const decoded = decodeFact(buffer);
        if (decoded === null) break;
        yield decoded.frame;
        buffer = buffer.subarray(decoded.consumed);
      }
    }
  } finally {
    reader.releaseLock();
  }
}

/**
 * Spawns the PTY host with the lifeline read end inherited at birth (the
 * host's fd 0), the write end supervisor-owned, and the launch frame sent
 * immediately. The fact stream ends when the host exits — the death-watch
 * observable that makes host exit equivalent to governed-child death.
 *
 * Environment (§3.2/§5.4): the host receives EXACTLY `descriptor.env` plus
 * nothing — no ambient supervisor variable is inherited. The host
 * executable is resolved to an absolute path (`process.execPath`) so the
 * minimal environment cannot break spawning; the governed child inside the
 * host then receives the descriptor's allowlisted environment verbatim.
 */
export function spawnPtyHost(
  descriptor: HostLaunchDescriptor,
  opts: { readonly hangNetMs?: number } = {},
): PtyHostHandle {
  // The live-wait net period. Injectable so the B1 regression can
  // accelerate the 5-minute horizon; production default unchanged.
  const hangNetMs = opts.hangNetMs ?? 300000;
  // §3.3 step 2: the lifeline read end is inherited at birth via the
  // spawned process's fd 0; the write end (below) exists only here.
  const proc = Bun.spawn([BUN_EXECUTABLE, HOST_ENTRY], {
    cwd: REPO_ROOT,
    stdin: "pipe",
    stdout: "pipe",
    stderr: "pipe",
    // Allowlisted environment ONLY — ambient inheritance is prohibited.
    env: { ...descriptor.env },
  });

  // §3.3 step 3: the supervisor holds the sole write end. `proc.stdin` is
  // the only reference to the write end in this (or any) process; it is
  // never duplicated, never leaked to a child, and closed exactly once on
  // deliberate EOF. Stdout/stderr remain the fact and diagnostics channels.
  const stdinSink = proc.stdin;
  if (stdinSink === undefined) {
    // The write end does not exist — the lifeline cannot be established.
    // Fail closed before any command is sent.
    try {
      proc.kill();
    } catch {
      // Already gone.
    }
    throw new Error("pty-host supervisor: host stdin is not a writable lifeline");
  }

  // §3.3 step 4: the first frame over the lifeline is the authorized
  // launch descriptor — the host receives the authorized absolute path,
  // expected hash, arguments, environment, and identity before anything
  // else.
  stdinSink.write(
    encodeCommand({
      kind: "launch",
      path: descriptor.path,
      sha256: descriptor.sha256,
      argv: descriptor.argv,
      env: descriptor.env,
      executionId: descriptor.executionId,
    }),
  );
  stdinSink.flush();

  // §3.3 step 8: normal commands ride the same framed lifeline.
  // CodeRabbit CR-2 (PR #35 round): after host death the pipe write end is
  // broken — a bare write/flush throws EPIPE synchronously into the broker
  // caller (the per-keystroke input path). Fail-closed discipline: a dead
  // host is a terminal state, so EPIPE is swallowed (the send is a no-op —
  // there is nothing left to command); any other error propagates.
  const send = (f: HostCommandFrame): void => {
    try {
      stdinSink.write(encodeCommand(f));
      stdinSink.flush();
    } catch (err) {
      if (
        typeof err === "object" && err !== null && "code" in err &&
        (err as { code: unknown }).code === "EPIPE"
      ) {
        // Host already dead: terminal state, nothing to command.
      } else {
        throw err;
      }
    }
  };

  // Deliberate lifeline EOF (§3.4 second kill switch): ends the host's
  // stdin; the host's EOF handler terminates the child's process group in
  // response. Same EPIPE guard as `send` — a broken pipe after host death
  // means the lifeline is already closed.
  let closeStdinCalls = 0;
  const closeStdin = (): void => {
    closeStdinCalls += 1;
    try {
      stdinSink.end();
      stdinSink.flush();
    } catch (err) {
      if (
        typeof err === "object" && err !== null && "code" in err &&
        (err as { code: unknown }).code === "EPIPE"
      ) {
        // Host already dead: lifeline already closed.
      } else {
        throw err;
      }
    }
  };

  // CodeRabbit CR-3 (PR #35 round): a single pump owns the stdout stream
  // (a ReadableStream admits one active reader — a second facts() call on
  // the old per-call generator threw a locked-stream error). The pump:
  //  - starts at spawn time (independent of consumer behavior);
  //  - records reportedPgid the moment the launched fact arrives, so
  //    killPgid() works even if facts() is never iterated;
  //  - maintains a bounded global history so late subscribers replay the
  //    facts they missed (including `launched`, which killPgid needs);
  //  - fans every decoded fact out to every active subscriber queue.
  //
  // Tier-2 FAIL remediation (round-4 findings 1+2): the first pump version
  // (a) left late subscribers hanging — their queue.closed was never set
  // because the pump's finally had already run — and (b) dropped all
  // history, so late subscribers missed the launched fact. Fix: a global
  // history buffer (capped) records every fact; a subscriber created at
  // ANY time snapshots `history + settled + error` atomically, so it sees
  // prior facts and terminates immediately when the pump is settled.
  //
  // Tier-2 FAIL remediation round-6 (findings 1-3): the previous
  // subscribe-time snapshot raced the pump — the subscribe-to-subscribers
  // attachment happened only AFTER the asynchronous backlog yield, so facts
  // enqueued (or settlement) during that yield missed the new subscriber.
  // Corrected per the reviewer's own strategy AND the Founder's
  // authorization: every subscriber queue is added to `subscribers`
  // SYNCHRONOUSLY at generator start, BEFORE any backlog yield — facts
  // arriving during backlog replay are delivered into the live queue (no
  // loss), and pump settlement reaches the live queue via the normal
  // finally broadcast (no hang). History replay skips facts already handed
  // to the live queue. The first `launched` fact is replayed to late
  // subscribers even if the bounded `history` has been trimmed — the pin
  // lives outside `history` (see `pinnedLaunchedFact` and the backlog
  // construction below). Late replay of `launched` is required for the
  // reportedPgid/killPgid() correctness contract.
  //
  // CodeRabbit CR-7 (PR #35 round-8): the prior pin design stored the
  // first `launched` fact inside `history` and reset `start` to 0 when the
  // trim would have evicted it — `history.slice(0)` returned the full
  // contents and `history` grew without bound. The fixed design stores
  // the pinned fact in a SEPARATE variable that is never trimmed.
  let reportedPgid: number | null = null;
  let pinnedLaunchedFact: HostFactFrame | null = null;
  const HISTORY_CAP = 256; // bounded: launch/ready/ack/live output facts for one child session
  let history: HostFactFrame[] = [];
  const subscribers = new Set<{
    readonly items: HostFactFrame[];
    readonly waiters: Set<(done: boolean) => void>;
    closed: boolean;
  }>();
  let pumpError: Error | null = null;
  let pumpSettled = false;

  // Production acknowledgement notifier (Greptile P1 remediation). Assigned
  // at handle construction; `enqueue` calls it for every decoded fact.
  let ackNotify: ((frame: HostFactFrame) => void) | undefined;

  // Clears the pending acknowledgement on lifecycle terminal paths owned by
  // the supervisor itself (host exit, fact-stream settlement). Assigned at
  // handle construction, once the handle identity exists.
  let clearPendingAckLocal: () => void = () => {};

  const enqueue = (frame: HostFactFrame): void => {
    if (frame.kind === "launched") {
      reportedPgid = frame.pgid;
      if (pinnedLaunchedFact === null) pinnedLaunchedFact = frame;
    }
    // Production acknowledgement path (Greptile P1 remediation): every
    // decoded host fact flows through this single pump, so settling the
    // pending acknowledgement here means `escalateWedgedHost` observes the
    // REAL host response — not an injected test signal. The notifier is
    // registered at handle construction below.
    ackNotify?.(frame);
    history.push(frame);
    if (history.length > HISTORY_CAP) {
      // Trim the oldest half. The pinned `launched` fact is replayed
      // separately (see backlog construction below), so eviction here
      // cannot lose it.
      history = history.slice(history.length - Math.floor(HISTORY_CAP / 2));
    }
    for (const q of subscribers) {
      // T7-CR: skip closed queues defensively — a queue is closed only by
      // the iterator's finally (abandoned subscriber) or pump settlement;
      // it must never receive further facts.
      if (q.closed) continue;
      q.items.push(frame);
      for (const w of q.waiters) w(false);
      q.waiters.clear();
    }
  };

  const settleSubscribers = (): void => {
    // Requirement 3: fact-stream settlement is a terminal path — no ack can
    // arrive after it, so any pending record is cleared rather than left to
    // satisfy a later escalation.
    clearPendingAckLocal();
    for (const q of subscribers) {
      if (!q.closed) {
        q.closed = true;
        for (const w of q.waiters) w(true);
      }
      q.waiters.clear();
    }
  };

  const pump = (async () => {
    try {
      for await (const frame of factStream(proc)) {
        enqueue(frame);
      }
    } catch (err) {
      pumpError = err instanceof Error ? err : new Error(String(err));
    } finally {
      pumpSettled = true;
      settleSubscribers();
    }
  })();
  void pump;

  // Task 44 packet C3: attach the AUTHORITATIVE exit watch at spawn time,
  // alongside the stdout pump. Host death is therefore observable the
  // moment it happens (making S0 detectable) instead of only once
  // escalation starts, and no escalation path ever races to attach a
  // watcher mid-ladder.
  const lifecycle: HostLifecycle = {
    exitedResolved: false,
    exited: Promise.resolve(),
  };
  lifecycle.exited = (async () => {
    try {
      await proc.exited;
    } catch {
      // A spawn-level rejection still means the host is not running.
    }
    lifecycle.exitedResolved = true;
  })();
  void lifecycle.exited;

  const facts = async function* (): AsyncGenerator<HostFactFrame> {
    // Round-6 correction: the subscriber queue is attached to `subscribers`
    // SYNCHRONOUSLY here — before this generator yields anything — so:
    //  - facts the pump enqueues during backlog replay are queued for this
    //    subscriber (round-6 finding 2: no data loss in the async gap);
    //  - if the pump settles during backlog replay, the finally broadcast
    //    reaches this subscriber's queue (round-6 finding 1: no hang);
    //  - the subscriber then consumes backlog + queued facts until the
    //    stream ends (backlog entries already in queue.items are skipped —
    //    see the seen-guard below).
    //
    // Post-settlement subscribers: the queue is closed by the sync attach
    // path below when pumpSettled is already true, so after the replay they
    // terminate immediately (round-4 finding 1 contract preserved).
    const settledAtSubscribe = pumpSettled;
    const errorAtSubscribe = pumpError;
    const queue: {
      items: HostFactFrame[];
      waiters: Set<(done: boolean) => void>;
      closed: boolean;
    } = {
      items: [],
      waiters: new Set(),
      closed: settledAtSubscribe,
    };
    subscribers.add(queue);

    try {
    // Backlog: the history as of synchronous attach, with the pinned
    // `launched` fact prepended if it is not already present in the live
    // queue. Facts enqueued after this snapshot arrive via the live queue
    // (enqueue pushes to it). The pinned `launched` fact is stored outside
    // `history` (see CodeRabbit CR-7 above) so it survives history-cap
    // trimming; prepending it here gives a late subscriber the same
    // `launched` fact an early subscriber would see.
    const backlog = pinnedLaunchedFact === null || history.includes(pinnedLaunchedFact)
      ? history.slice()
      : [pinnedLaunchedFact, ...history];
    const seen = new Set<HostFactFrame>(queue.items);
    // T6 (Greptile P1 at 96f2a1a): replay the COMPLETE captured backlog
    // regardless of `queue.closed`. The backlog is a static snapshot taken
    // at synchronous attach, so it cannot race the live stream; `closed`
    // gates only the live-wait phase below. Under the prior per-frame
    // `if (queue.closed) break`, a post-settlement subscriber (attached
    // with closed already true) received an EMPTY stream instead of the
    // documented replay — silently violating the round-4/round-6 replay
    // contract and leaving killPgid-style consumers blind to `launched`.
    for (const frame of backlog) {
      // Skip facts the live queue already received during replay.
      if (seen.has(frame)) continue;
      // A fact already handed to this subscriber? The dedupe guard covers
      // the overlap window: history entries that enqueue() fanned into the
      // queue between attach and replay.
      yield frame;
    }
    if (settledAtSubscribe) {
      // Post-settlement subscription: replay finished; surface the pump
      // error (if any) and terminate immediately — no hanging.
      if (errorAtSubscribe !== null) throw errorAtSubscribe;
      return;
    }
    for (;;) {
      const next = queue.items.shift();
      if (next !== undefined) {
        yield next;
        continue;
      }
      if (queue.closed) {
        if (pumpError !== null) throw pumpError;
        return;
      }
      // Wait for the next fact or for pump settlement. The net timer is a
      // hang guard only: on expiry it wakes the wait to RE-ENTER — it must
      // never present as end-of-stream. Real settlement is signalled
      // exclusively by the waiter callback (receivedDone=true). B1
      // (architecture review): the prior net resolved `true`, the same
      // value as settlement, so 5 idle minutes ended a live subscription
      // as a clean stream end while the host and pump were alive.
      //
      // Round 12 (stale-waiter retention): the waiter callback must be
      // removed from `queue.waiters` on BOTH exits. Previously the net
      // path resolved `false` and re-entered the loop WITHOUT removing
      // its callback, so every idle expiry left a dead callback behind
      // and an idle subscriber accumulated one per net period forever.
      // The timer path now deletes the callback before resolving, and
      // the settlement path clears the timer and deletes the same
      // callback — so exactly one live waiter exists per parked wait.
      const wake = await new Promise<boolean>((resolve) => {
        let timer: ReturnType<typeof setTimeout> | undefined;
        const waiter = (receivedDone: boolean): void => {
          if (timer !== undefined) clearTimeout(timer);
          queue.waiters.delete(waiter);
          resolve(receivedDone);
        };
        timer = setTimeout(() => {
          queue.waiters.delete(waiter);
          resolve(false);
        }, hangNetMs);
        queue.waiters.add(waiter);
      });
      if (wake && queue.items.length === 0) {
        if (pumpError !== null) throw pumpError;
        return;
      }
    }
    } finally {
      // T7-CR (CodeRabbit Major at 1bd9679): remove the subscriber queue
      // when the iterator ends — normal return, early termination via
      // iterator.return(), or a throw. An abandoned queue would otherwise
      // stay in `subscribers` and accumulate every later fact in
      // `queue.items`: unbounded broker memory growth for a long-running
      // host. Settle and clear waiters so no pending 5-minute-net waiter
      // is left dangling.
      subscribers.delete(queue);
      queue.closed = true;
      for (const w of queue.waiters) w(true);
      queue.waiters.clear();
    }
  };

  const handle: PtyHostHandle = {
    hostPid: proc.pid,
    send,
    facts,
    closeStdin,
    killPgid: () => {
      if (reportedPgid !== null) {
        try {
          process.kill(-reportedPgid, "SIGKILL");
        } catch {
          // Group already gone.
        }
      }
    },
  };
  subscriberCounts.set(handle, () => subscribers.size);
  waiterCounts.set(handle, () => {
    let total = 0;
    for (const q of subscribers) total += q.waiters.size;
    return total;
  });
  lifecycles.set(handle, lifecycle);
  closeStdinCounts.set(handle, () => closeStdinCalls);

  // Production acknowledgement wiring (Greptile P1 remediation).
  //
  // The notifier settles the pending record from the REAL decoded-fact
  // stream. Two settlement sources, per requirement 2:
  //   - a matching `ack` whose `ofKind` equals the awaited command; or
  //   - `termination_started`, the ratified first termination-specific fact
  //     (§9.8: "the host must report `termination_started` within 500 ms of
  //     the broker's command"), which on the terminate path the host emits
  //     BEFORE the ack (main.ts orders termination_started then ack).
  ackNotify = (frame: HostFactFrame): void => {
    const pending = pendingAcks.get(handle);
    if (pending === undefined || pending.settled) return;
    const isMatchingAck = frame.kind === "ack" && frame.ofKind === pending.ofKind;
    const isTerminationFirstFact = pending.ofKind === "terminate" && frame.kind === "termination_started";
    if (isMatchingAck || isTerminationFirstFact) pending.settle(true);
  };
  pendingAckProbes.set(handle, () => {
    const p = pendingAcks.get(handle);
    return p !== undefined && !p.settled;
  });
  lifecycleAckClosers.set(handle, () => {
    const p = pendingAcks.get(handle);
    if (p !== undefined && !p.settled) p.settle(false);
    pendingAcks.delete(handle);
  });
  clearPendingAckLocal = () => {
    const p = pendingAcks.get(handle);
    if (p !== undefined && !p.settled) p.settle(false);
    pendingAcks.delete(handle);
  };
  // Requirement 3: host exit is a terminal path. An exited host will never
  // acknowledge, so clear the pending record as soon as the authoritative
  // watch resolves.
  void lifecycle.exited.then(() => { clearPendingAckLocal(); });
  return handle;
}

/** The ledger reason every Task 44 escalation state binds at entry. */
export type EscalationReasonCode = "pty_host_failure";

/** The lifecycle state an escalation resolved through (packet C4). */
export type EscalationState = "S0" | "S1" | "S2" | "S3" | "S4" | "S5";

export interface EscalationOutcome {
  /**
   * Bound at escalation ENTRY and never relabelled — §3.4 line 399 ("host
   * unresponsiveness past the deadline is host failure") plus §3.3's rule
   * that the supervisor treats host exit as governed-child death. A late
   * host exit mid-ladder (S5) does NOT change this value.
   */
  readonly reason: EscalationReasonCode;
  readonly state: EscalationState;
  /**
   * False only for S1 (timely acknowledgement, host alive). True for every
   * state that entered the Task 44 escalation ladder.
   */
  readonly escalated: boolean;
  /**
   * Whether the lifeline-EOF kill switch was invoked. C7: never on the S1
   * path, and never on S0 (the host has already exited — the lifeline is
   * moot and S0's action set is containment-only). Cross-checked in tests
   * against `closeStdinCallCountForTest`, which counts at the real call
   * site inside `spawnPtyHost`.
   */
  readonly closeStdinCalled: boolean;
  /**
   * Whether the CALLER must perform the durable session interruption.
   *
   * `true`  — Task 47/53's caller must perform the durable session
   *           interruption. Every escalation state (S0, S2, S3, S4, S5)
   *           requires it.
   * `false` — the responsive S1 path requires no interruption; the normal
   *           ladder owns containment.
   *
   * `escalateWedgedHost` does NOT itself interrupt the broker session: it
   * has no session handle and no RuntimeBroker dependency. This field is a
   * DIRECTIVE TO THE CALLER, not a report of a side effect this primitive
   * performed. Tier-2 at head 35b608f flagged the previous name
   * (`interrupted`) as a false claim of a completed interruption.
   */
  readonly sessionInterruptionRequired: boolean;
  /** True when the child PGID SIGKILL was attempted (mandatory always). */
  readonly pgidKillAttempted: boolean;
  /**
   * True only in S3: `exited` pending AND signal-0 not ESRCH. Never true
   * after `proc.exited` resolved (PID-recycling protection) and never true
   * on ESRCH corroboration alone.
   */
  readonly hostKillAttempted: boolean;
  /** S0/S2 only: host death confirmed, so a host-PID kill was unnecessary. */
  readonly unnecessaryHostExitConfirmed: boolean;
  /** Ordered record of kill ATTEMPTS — ordering evidence, not delivery. */
  readonly killOrder: readonly ("pgid" | "host")[];
  /**
   * Test/diagnostic timings measured from `t_command`. NEVER a pass
   * condition on its own: tests assert against their own monotonic clock
   * and external liveness observations.
   */
  readonly observedMs: Record<string, number>;
}

/**
 * A promise that never settles. Used to keep a losing branch out of a
 * `Promise.race` without resolving it to a spurious winner.
 */
function await_never<T>(): Promise<T> {
  return new Promise<T>(() => {});
}

/** Signal-0 corroboration. Never declares death; never alone kills. */
function probeSignal0(pid: number): "alive" | "eperm" | "esrch" {
  try {
    process.kill(pid, 0);
    return "alive";
  } catch (err) {
    const code = typeof err === "object" && err !== null && "code" in err
      ? (err as { code: unknown }).code
      : undefined;
    if (code === "ESRCH") return "esrch";
    // EPERM: the process exists but is not ours to signal — alive.
    return "eperm";
  }
}

/**
 * §3.4 / §9.8: the mandatory host-bypassing direct-PGID escalation.
 *
 * A wedged host stops reading commands and stops emitting facts, so the
 * supervisor must contain the governed child WITHOUT the host's
 * cooperation. Ordering: send terminate -> close host stdin -> wait the
 * bounded acknowledgement deadline -> SIGKILL the reported child PGID ->
 * SIGKILL the host (only where permitted) -> REQUEST session interruption
 * from the caller via `sessionInterruptionRequired` (this primitive does
 * not perform the interruption itself; Task 47/53 owns that).
 *
 * BINDING RULE (Founder, Task 44): host death is determined EXCLUSIVELY by
 * the spawn-time `proc.exited` watch. `send()` and `closeStdin()` are
 * issued for their protocol effect only — their success or failure is never
 * read as liveness evidence, because on Bun 1.3.14 a write to a dead host's
 * stdin succeeds silently.
 *
 * Timing (packet C3): `t_command` — the moment the terminate command is
 * issued — is the SOLE anchor. The 250 ms acknowledgement period consumes
 * the same absolute 500 ms hard-kill budget; there is no second grace
 * window. Both kill attempts begin no later than `t_command + 500 ms`.
 */
export async function escalateWedgedHost(
  handle: PtyHostHandle,
  pgid: number,
  hostPid: number,
): Promise<EscalationOutcome> {
  const lifecycle = lifecycles.get(handle);
  const observedMs: Record<string, number> = {};
  const killOrder: ("pgid" | "host")[] = [];

  // ---- Requirement 1: register the pending acknowledgement BEFORE the
  // terminate command is sent. The host can ack in ~11.9 ms (measured), and
  // `enqueue` runs synchronously on the decode path, so registering after
  // the send would let an immediate acknowledgement race registration and be
  // missed entirely.
  let settleAck: (acked: boolean) => void = () => {};
  const ackPromise = new Promise<boolean>((resolve) => {
    settleAck = resolve;
  });
  const pending: PendingAck = {
    ofKind: "terminate",
    settled: false,
    promise: ackPromise,
    settle: (acked: boolean) => {
      if (pending.settled) return;
      pending.settled = true;
      settleAck(acked);
    },
  };
  pendingAcks.set(handle, pending);

  // Requirement 3: clear on EVERY terminal path this call owns. Idempotent.
  const clearPendingAck = (): void => {
    if (!pending.settled) pending.settle(false);
    if (pendingAcks.get(handle) === pending) pendingAcks.delete(handle);
  };

  try {
    return await runEscalation();
  } finally {
    // Requirement 3/4: escalation completion OR throw — no stale
    // acknowledgement state, waiter, or timer survives this call.
    clearPendingAck();
  }

  async function runEscalation(): Promise<EscalationOutcome> {

  // ---- t_command: the sole timing anchor (monotonic) ----
  // C7.3 step 1: send the terminate command and begin observing BOTH the
  // already-attached spawn-time `proc.exited` watch AND the command-specific
  // acknowledgement. `closeStdin()` is deliberately NOT called here.
  const tCommand = performance.now();
  handle.send({ kind: "terminate" });
  observedMs.terminateSentMs = performance.now() - tCommand;

  // ---- Acknowledgement window (C7.3 step 2) ----
  // C7 ordering correction (Founder-ruled, Kimi-confirmed against §9.8):
  // the prior implementation called `closeStdin()` BEFORE this wait, per
  // packet v2.2 C3 and the plan's Interfaces line. That is superseded.
  // §9.8 is explicit: "If the 250 ms acknowledgement deadline expires, the
  // supervisor closes host stdin and starts the host-bypassing escalation
  // ladder" — the close is conditional on expiry and is the ladder's FIRST
  // act, not a precondition of the wait.
  //
  // Why it matters (probe evidence, Bun 1.3.14): `closeStdin()` is the
  // deliberate lifeline-EOF kill switch from Task 43. A healthy host honours
  // terminate + EOF and exits in ~26 ms — well inside this 250 ms window —
  // so closing first made S1 UNREACHABLE: every healthy host presented as
  // S0 by classification time.
  const ackDeadline = tCommand + HOST_DEADLINES_MS.ack;
  let acked = false;
  let earlyExit = false;
  if (lifecycle?.exitedResolved === true) {
    // The host was already gone before escalation began.
    earlyExit = true;
  } else {
    // Event-driven race, deliberately NOT a polling loop. On the real
    // responsive path the host emits `ack` and then exits ~2-3 ms later
    // (measured, Bun 1.3.14), so a coarse poll can observe the exit while
    // missing the acknowledgement that causally preceded it. Racing the
    // promises observes whichever genuinely happened FIRST — the faithful
    // reading of C7.3 step 2, whose two bullets describe a race.
    let timer: ReturnType<typeof setTimeout> | undefined;
    const ackWon: Promise<"ack"> = new Promise<"ack">((resolve) => {
      void ackPromise.then((v) => {
        if (v) resolve("ack");
      }, () => {
        // A rejected acknowledgement is not an acknowledgement; let the
        // deadline or the exit watch decide.
      });
    });
    const exitWon: Promise<"exit"> = lifecycle === undefined
      ? await_never<"exit">()
      : lifecycle.exited.then<"exit">(() => "exit");
    const deadlineWon = new Promise<"deadline">((resolve) => {
      timer = setTimeout(() => resolve("deadline"), Math.max(0, ackDeadline - performance.now()));
    });
    const winner = await Promise.race([ackWon, exitWon, deadlineWon]);
    if (timer !== undefined) clearTimeout(timer);
    if (winner === "ack") acked = true;
    else if (winner === "exit") earlyExit = true;
  }
  observedMs.ackWindowEndedMs = performance.now() - tCommand;

  // ---- S1 (C7.3 step 2): acknowledged in time and still alive ----
  // NO escalation: no `closeStdin()`, no PGID kill, no host kill, and no
  // session interruption is requested of the caller. The normal ladder owns
  // containment from here.
  if (acked && lifecycle?.exitedResolved !== true) {
    observedMs.escalatedMs = -1;
    return {
      reason: "pty_host_failure",
      state: "S1",
      escalated: false,
      closeStdinCalled: false,
      sessionInterruptionRequired: false,
      pgidKillAttempted: false,
      hostKillAttempted: false,
      unnecessaryHostExitConfirmed: false,
      killOrder: [],
      observedMs,
    };
  }

  // ---- Escalation entry (C7.3 step 3): the reason binds HERE, forever ----
  // Reached ONLY on acknowledgement-deadline expiry without acknowledgement,
  // or on prior host exit. C7.3 step 4: a late acknowledgement arriving from
  // this point on does NOT cancel escalation.
  const reason: EscalationReasonCode = "pty_host_failure";

  // §9.8: on expiry "the supervisor closes host stdin and starts the
  // host-bypassing escalation ladder". Best-effort — it starts no new clock
  // and its success or failure is NEVER liveness evidence.
  //
  // S0 exception (C7.3 step 2 / packet C4): when the host has already
  // exited, its enumerated action set is containment-only and the lifeline
  // is moot, so the close is skipped entirely.
  let closeStdinCalled = false;
  if (!earlyExit) {
    handle.closeStdin();
    closeStdinCalled = true;
    observedMs.stdinClosedMs = performance.now() - tCommand;
  }

  // Classification (packet C4). `proc.exited` is authoritative; signal-0 is
  // corroboration only.
  const exitedAtClassification = lifecycle?.exitedResolved === true;
  const corroboration = exitedAtClassification ? "esrch" : probeSignal0(hostPid);
  observedMs.classifiedMs = performance.now() - tCommand;

  let state: EscalationState;
  if (earlyExit) state = "S0";
  else if (exitedAtClassification) state = "S2";
  else if (corroboration === "esrch") state = "S4";
  else state = "S3";

  // Invariant 3: PGID containment is MANDATORY in every terminal state, and
  // it does not wait for EPIPE, for the host, or for anything else.
  //
  // The caller-supplied `pgid` is the authoritative containment target (the
  // plan's Task 44 signature passes it explicitly, sourced from the
  // `launched` fact). `handle.killPgid()` is invoked as well because it is
  // the ratified containment primitive and covers the case where the
  // supervisor recorded the group but the caller passed a stale value.
  killOrder.push("pgid");
  if (Number.isInteger(pgid) && pgid > 1) {
    try {
      process.kill(-pgid, "SIGKILL");
    } catch {
      // Group already gone.
    }
  }
  handle.killPgid();
  observedMs.pgidKillAttemptedMs = performance.now() - tCommand;

  // Invariants 1/2/4: the host PID is signalled ONLY while `exited` is
  // pending AND signal-0 is not ESRCH. After `proc.exited` resolves the PID
  // may have been recycled, so signalling it could kill an unrelated
  // process. ESRCH corroborates death but never declares it and never
  // authorizes a kill on its own.
  let hostKillAttempted = false;
  if (state === "S3") {
    killOrder.push("host");
    try {
      process.kill(hostPid, "SIGKILL");
    } catch {
      // Already gone, or not ours to signal.
    }
    hostKillAttempted = true;
    observedMs.hostKillAttemptedMs = performance.now() - tCommand;
  }

  observedMs.escalatedMs = performance.now() - tCommand;
  return {
    reason,
    state,
    escalated: true,
    closeStdinCalled,
    sessionInterruptionRequired: true,
    pgidKillAttempted: true,
    hostKillAttempted,
    unnecessaryHostExitConfirmed: state === "S0" || state === "S2",
    killOrder,
    observedMs,
  };
  }
}