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
  const closeStdin = (): void => {
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

  const enqueue = (frame: HostFactFrame): void => {
    if (frame.kind === "launched") {
      reportedPgid = frame.pgid;
      if (pinnedLaunchedFact === null) pinnedLaunchedFact = frame;
    }
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
      const wake = await new Promise<boolean>((resolve) => {
        const timer = setTimeout(() => resolve(false), hangNetMs);
        queue.waiters.add((receivedDone) => {
          clearTimeout(timer);
          resolve(receivedDone);
        });
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
  return handle;
}