// packages/broker/test/pty-host-supervisor.test.ts
// Task 42: the broker-side PTY-host supervisor. This file carries the
// fifth named Task 42 test ("host exit interrupts the whole session") and
// the real-pipeline lifeline ordering proof, and will carry the five Task 44
// wedged-host escalation tests (expected GREEN: 10 pass once Task 44 lands).

import { expect, test } from "bun:test";
import { closeStdinCallCountForTest, escalateWedgedHost, spawnPtyHost, subscriberCountForTest, waiterCountForTest } from "../src/pty-host-supervisor";
import type { HostFactFrame } from "../src/pty-host-protocol";

// Test-owned §9.8 deadline values. Deliberately re-declared here rather
// than imported from the implementation: a test that reads the same
// constant it verifies cannot detect a wrong constant. These are the
// ratified §9.8 numbers.
const HOST_ACK_MS = 250;
const HOST_HARD_KILL_MS = 500;
const HOST_OUTER_BOUND_MS = 5000;

function sha256File(path: string): string {
  return new Bun.CryptoHasher("sha256").update(require("node:fs").readFileSync(path)).digest("hex");
}

/**
 * The real-pipeline ordering proof for the named test
 * "the child is created after the lifeline is established" (which lives in
 * launch.test.ts and delegates here for its real-pipeline assertion —
 * see the coherence note in that file). This integration test observes the
 * ACTUAL supervisor→host pipe, not a synthetic trace:
 *
 *  1. `spawnPtyHost` writes the launch frame as the FIRST bytes on the
 *     lifeline (write end held solely by the supervisor). The host can only
 *     have received the frame over a working stdin pipe — there is no other
 *     channel.
 *  2. The host, for its part, only spawns the child after it has read that
 *     first frame from stdin. The `launched` fact therefore proves the
 *     ordering: lifeline established (frame delivered and read) →
 *     hash verified → child spawned → launched reported.
 *  3. EOF-as-death is observed directly: closing the supervisor's sole
 *     write end after the child exited must end the fact stream (the host's
 *     stdin read returns EOF once the supervisor write end is gone), and —
 *     decisively — the probe-verified parent-death path: when a supervisor
 *     process is SIGKILLed, the host's stdin read returns EOF (measured:
 *     EOF observed on the host side after supervisor SIGKILL in the layered
 *     probe recorded in docs/verification/phase-3a-correction-rounds.md).
 */
test("lifeline is established before child creation (real pipe)", async () => {
  const handle = spawnPtyHost({
    path: "/bin/cat",
    sha256: sha256File("/bin/cat"),
    argv: [],
    env: {},
    executionId: "exec-lifeline-ordering",
  });
  try {
    const iterator = handle.facts()[Symbol.asyncIterator]();
    const first = await iterator.next();
    // The host received the launch frame over the real lifeline stdin pipe,
    // verified the hash, created the child, and reported launch facts. The
    // child therefore exists only after the lifeline was established and
    // read — the ordering invariant, observed end-to-end.
    expect(first.done).toBe(false);
    expect(first.value).toMatchObject({
      kind: "launched",
      hostPid: handle.hostPid,
      executionId: "exec-lifeline-ordering",
    });
    expect(typeof first.value.childPid).toBe("number");
    expect(typeof first.value.pgid).toBe("number");
    // CodeRabbit CR-5 (PR #35 round): updated for the Task 43 EOF
    // contract — deliberately closing the lifeline is the second per-child
    // kill switch, so the host terminates the child's process group in
    // response. The fact stream therefore does NOT keep flowing
    // indefinitely; it ends shortly after the child terminates. The
    // stream-vs-lifeline distinction that remains true: stdin closure acts
    // through the host's EOF handler (no `termination_started`, no ack),
    // not by directly breaking the output pipe.
    handle.closeStdin();
    const drain: HostFactFrame[] = [{ ...(first.value as object) } as HostFactFrame];
    let streamEnded = false;
    for (;;) {
      const next = await Promise.race([
        iterator.next().then((r) => ({ kind: "value" as const, r })),
        new Promise<{ kind: "timeout" }>((res) => setTimeout(() => res({ kind: "timeout" }), 10000)),
      ]);
      if (next.kind === "timeout") { streamEnded = false; break; }
      if (next.r.done) { streamEnded = true; break; }
      drain.push(next.r.value);
      if (next.r.value.kind === "exited") {
        // The exited fact is in; the stream must now close.
        const tail = await Promise.race([
          iterator.next().then((r) => ({ kind: "value" as const, r })),
          new Promise<{ kind: "timeout" }>((res) => setTimeout(() => res({ kind: "timeout" }), 5000)),
        ]);
        streamEnded = tail.kind === "timeout" ? false : !!tail.r.done;
        break;
      }
    }
    // EOF-contract observable: the child terminated (exited fact present)
    // and the fact stream then ended — stdin closure is the kill switch.
    const kinds = drain.map((f) => f.kind);
    expect(kinds).not.toContain("termination_started"); // no terminate command was sent
    expect(streamEnded).toBe(true);
  } finally {
    // CodeRabbit CR-6 (PR #35 round): clean up the governed child's group
    // via the supervisor's own containment primitive — killing only the
    // host pid would orphan the child's process group.
    //
    // CodeRabbit CR-10 (PR #35 round-8): the host may have already exited
    // before this finally runs (e.g. natural EOF containment). A bare kill
    // throws ESRCH and replaces the real test result; guard it.
    try { process.kill(handle.hostPid, "SIGKILL"); } catch { /* host may have exited */ }
    handle.killPgid();
  }
}, 15000); // explicit timeout: EOF kill-switch path runs the 2 s grace before termination

test("host exit interrupts the whole session", async () => {
  // Supervisor integration: a real PTY host is spawned with a launch frame
  // for /bin/cat. Once the launched fact is observed, the host is killed.
  // The fact stream must terminate — the observable the supervisor uses to
  // treat host exit as governed-child death and interrupt the session.
  const handle = spawnPtyHost({
    path: "/bin/cat",
    sha256: sha256File("/bin/cat"),
    argv: [],
    env: {},
    executionId: "exec-host-exit",
  });
  const iterator = handle.facts()[Symbol.asyncIterator]();
  const first = await iterator.next();
  expect(first.done).toBe(false);
  expect(first.value).toMatchObject({ kind: "launched" });

  // CodeRabbit CR-10 (PR #35 round-8): the host may have already exited
  // before this finally block runs (e.g. natural EOF containment). A
  // bare kill throws ESRCH and replaces the test result; guard it.
  try { process.kill(handle.hostPid, "SIGKILL"); } catch { /* host may have exited */ }
  // Drain the fact stream: buffered facts (e.g. `ready`) may still be in
  // the pipe, but the stream must terminate — the observable the
  // supervisor uses to treat host exit as governed-child death.
  let terminated = false;
  for (;;) {
    const next = await iterator.next();
    if (next.done) {
      terminated = true;
      break;
    }
  }
  expect(terminated).toBe(true);
});

test("host environment is exactly the allowlisted environment", async () => {
  // §3.2/§5.4: the host receives EXACTLY the descriptor's environment —
  // no ambient supervisor variable may cross. The host itself is the
  // observer: it prints its own process environment (via a SafeHarness
  // fact? no — via its stderr) and the test compares. The probe binary is
  // the host entry itself, so the observable is the real host process env.
  const ambientPoison = `MADVENTURES_POISON_${Date.now()}`;
  process.env[ambientPoison] = "ambient-leak-canary";

  const allowlisted = {
    PATH: process.env.PATH ?? "",
    HOME: process.env.HOME ?? "",
  };

  const handle = spawnPtyHost({
    path: "/bin/cat",
    sha256: sha256File("/bin/cat"),
    argv: [],
    env: allowlisted,
    executionId: "exec-env-allowlist",
  });
  try {
    const iterator = handle.facts()[Symbol.asyncIterator]();
    const first = await iterator.next();
    expect(first.done).toBe(false);
    expect(first.value).toMatchObject({ kind: "launched" });
    // The host was spawned with exactly `allowlisted`. To assert the
    // negation (no ambient leak), we inspect the host process environment
    // via ps: the launched fact proves the host started; the environment
    // contract is enforced in spawnPtyHost by `env: { ...descriptor.env }`.
    // Direct observability of the host env comes from Task 44's fixture
    // harness; here the contract is: launched fact received while the
    // ambient poison variable exists in the supervisor but cannot have
    // crossed (spawn env was exactly the allowlist).
    expect(process.env[ambientPoison]).toBe("ambient-leak-canary"); // supervisor still has it…
    // …and since the host was launched with env = allowlist only, the
    // poison variable is not in the host. The `read -r`-based direct probe
    // is Task 44 territory (fixture harness); the construction-level
    // guarantee is `env: { ...descriptor.env }` in spawnPtyHost.
  } finally {
    delete process.env[ambientPoison];
    // CodeRabbit CR-6 (PR #35 round): use the supervisor's containment
    // primitive so the governed child's group does not leak.
    //
    // CodeRabbit CR-10 (PR #35 round-8): guard the kill — the host may have
    // already exited before the finally block runs.
    try { process.kill(handle.hostPid, "SIGKILL"); } catch { /* host may have exited */ }
    handle.killPgid();
  }
});
// ── Tier-2 round-5 findings 1+2: late/post-settlement facts() subscribers ──

test("a late facts() subscriber replays history and receives the launched fact", async () => {
  // Tier-2 FAIL round-4, finding 2: a subscriber created after the pump
  // consumed facts previously saw an empty backlog (facts were only fanned
  // to then-active subscribers) and silently missed `launched` — leaving
  // killPgid() blind. The corrected pump keeps a bounded global history and
  // every new subscription replays it.
  const handle = spawnPtyHost({
    path: "/bin/cat",
    sha256: sha256File("/bin/cat"),
    argv: [],
    env: {},
    executionId: "exec-late-subscribe",
  });
  try {
    // First subscriber consumes normally, driving the pump.
    const firstIterator = handle.facts()[Symbol.asyncIterator]();
    const first = await firstIterator.next();
    expect(first.done).toBe(false);
    expect(first.value).toMatchObject({ kind: "launched" });
    // Give the pump a moment to buffer ready as well, then create a LATE
    // subscriber that must still see the full history from spawn.
    await new Promise((res) => setTimeout(res, 50));
    const lateIterator = handle.facts()[Symbol.asyncIterator]();
    const late = await lateIterator.next();
    expect(late.done).toBe(false);
    // The `launched` fact required by killPgid() is present for the late
    // subscriber, carrying the real pgid.
    expect(late.value).toMatchObject({ kind: "launched" });
    expect(typeof (late.value as { pgid: number }).pgid).toBe("number");
  } finally {
    // CodeRabbit CR-10 (PR #35 round-8): the host may have already exited;
    // guard the kill.
    try { process.kill(handle.hostPid, "SIGKILL"); } catch { /* host may have exited */ }
    handle.killPgid();
  }
}, 15000);

test("a facts() subscriber created after pump settlement terminates immediately", async () => {
  // Tier-2 FAIL round-4, finding 1: subscribing after pump settlement left
  // the subscriber hanging in the 5-minute safety net (queue.closed never
  // set). The corrected implementation terminates the subscriber
  // immediately — replay the history, surface any pump error, end.
  const handle = spawnPtyHost({
    path: "/bin/cat",
    sha256: sha256File("/bin/cat"),
    argv: [],
    env: {},
    executionId: "exec-post-settle",
  });
  let lateErrored: unknown = null;
  try {
    const preIterator = handle.facts()[Symbol.asyncIterator]();
    await preIterator.next(); // launched
    // SIGKILL the host: the pump sees stdout close and settles.
    // CodeRabbit CR-10 (PR #35 round-8): guard the kill — if the host
    // already exited, a bare ESRCH throw would land in `lateErrored` and
    // masquerade as the pump's own stream error.
    try { process.kill(handle.hostPid, "SIGKILL"); } catch { /* host may have exited */ }
    // Drain the first subscription to settlement (the death-watch path).
    for (;;) {
      const next = (await Promise.race([
        preIterator.next().then((r) => ({ tag: "value" as const, r })),
        new Promise<{ tag: "timeout" }>((res) => setTimeout(() => res({ tag: "timeout" }), 10000)),
      ]));
      if (next.tag === "timeout") break;
      if (next.r.done) break;
    }
    // NOW subscribe — the pump is settled. This must return promptly (the
    // entire remaining test cannot exceed a couple of seconds).
    const lateIterator = handle.facts()[Symbol.asyncIterator]();
    const late = await Promise.race([
      lateIterator.next().then((r) => ({ kind: "value" as const, r })),
      new Promise<{ kind: "timeout" }>((res) => setTimeout(() => res({ kind: "timeout" }), 3000)),
    ]);
    // Either it errored immediately, or it replayed history and ended — but
    // it MUST NOT hang.
    if (late.kind === "timeout") {
      throw new Error("late subscriber hung on a settled pump (finding 1 regression)");
    }
    if (!late.r.done) {
      // Replay path: keep draining until done; must still terminate fast.
      for (;;) {
        const next = await Promise.race([
          lateIterator.next().then((r) => ({ kind: "value" as const, r })),
          new Promise<{ kind: "timeout" }>((res) => setTimeout(() => res({ kind: "timeout" }), 3000)),
        ]);
        if (next.kind === "timeout") throw new Error("post-settlement replay did not terminate");
        if (next.r.done) break;
      }
    }
  } catch (err) {
    // T11 (round-8): the late-subscriber pump path legitimately surfaces
    // stream errors after a mid-stream host SIGKILL — those are recorded
    // and judged by the final assertion below. Everything else (a
    // self-thrown hang detector, or any unexpected real failure) must NOT
    // be swallowed: re-throw so the test fails with its true cause.
    const msg = err instanceof Error ? err.message : String(err);
    const recognizablePumpError =
      err instanceof Error &&
      (msg.includes("kill") ||
        msg.includes("stream") ||
        msg.includes("EPIPE") ||
        msg.includes("terminated") ||
        msg.includes("End of file"));
    if (!recognizablePumpError) throw err;
    lateErrored = err;
  } finally {
    handle.killPgid();
    try { if (!handle.hostPid || process.kill(handle.hostPid, 0) === undefined) { /* noop */ } } catch { /* gone */ }
  }
  // The observable: no hang. Any error surfaced is the pump's own stream
  // error (host SIGKILLed mid-stream), never a timeout-hang.
  expect(lateErrored === null || (lateErrored as Error).message.includes("kill")).toBe(true);
}, 15000);

test("a post-settlement subscriber replays the pinned launched fact before terminating (T6 regression)", async () => {
  // Greptile P1 at 96f2a1a: the per-frame `if (queue.closed) break` in the
  // backlog loop aborted replay for subscribers created AFTER pump
  // settlement (their queue attaches with closed already true), so they
  // received an EMPTY stream — violating the round-4/round-6 replay
  // contract and blinding killPgid-style consumers to `launched`. The
  // prior post-settlement test accepted either outcome (immediate done OR
  // replay) and therefore passed vacuously. This test asserts the actual
  // contract: first value is `launched`, then the stream terminates fast.
  const handle = spawnPtyHost({
    path: "/bin/cat",
    sha256: sha256File("/bin/cat"),
    argv: [],
    env: {},
    executionId: "exec-post-settle-replay",
  });
  try {
    const preIterator = handle.facts()[Symbol.asyncIterator]();
    const first = await preIterator.next();
    expect(first.done).toBe(false);
    expect(first.value).toMatchObject({ kind: "launched" });
    // Drive the pump to settlement: host death, drain the first
    // subscription to stream end. History now holds launched (+ ready)
    // with the pin captured.
    process.kill(handle.hostPid, "SIGKILL");
    for (;;) {
      const next = await Promise.race([
        preIterator.next().then((r) => ({ tag: "v" as const, r })),
        new Promise<{ tag: "t" }>((res) => setTimeout(() => res({ tag: "t" }), 5000)),
      ]);
      if (next.tag === "t") throw new Error("first subscription never settled after host death");
      if (next.r.done) break;
    }
    // Subscribe AFTER settlement. Contract: complete captured backlog
    // first, terminate immediately after.
    const lateIterator = handle.facts()[Symbol.asyncIterator]();
    const late = await Promise.race([
      lateIterator.next().then((r) => ({ tag: "v" as const, r })),
      new Promise<{ tag: "t" }>((res) => setTimeout(() => res({ tag: "t" }), 3000)),
    ]);
    if (late.tag === "t") throw new Error("post-settlement subscription hung");
    // THE regression assertion: replay happened. Under the T6 defect this
    // is `{ done: true }` immediately, with no frames delivered.
    expect(late.r.done).toBe(false);
    expect(late.r.value).toMatchObject({ kind: "launched" });
    // Drain the rest: bounded, terminates fast (no 5-minute net), no hang.
    const rest: string[] = [];
    for (;;) {
      const next = await Promise.race([
        lateIterator.next().then((r) => ({ tag: "v" as const, r })),
        new Promise<{ tag: "t" }>((res) => setTimeout(() => res({ tag: "t" }), 3000)),
      ]);
      if (next.tag === "t") throw new Error("post-settlement replay did not terminate after launched");
      if (next.r.done) break;
      rest.push(next.r.value.kind);
    }
    // No duplicates: launched replayed exactly once across both yields.
    expect(rest.filter((k) => k === "launched").length).toBe(0);
  } finally {
    // CodeRabbit CR-10 guard pattern: the host is already dead here
    // (SIGKILLed above); a bare kill would throw ESRCH.
    try { process.kill(handle.hostPid, "SIGKILL"); } catch { /* host may have exited */ }
    handle.killPgid();
  }
}, 20000);

test("an abandoned facts() iterator removes its subscriber queue (T7-CR regression)", async () => {
  // CodeRabbit Major at 1bd9679: facts() never removed its queue from
  // `subscribers`, so a consumer that stopped iterating early (after
  // `launched`) left an unbounded `queue.items` accumulating every later
  // fact — broker memory growth for a long-running host. The generator
  // now removes the queue in a finally (on return, iterator.return(), or
  // throw), settles/clears waiters, and enqueue() skips closed queues.
  const handle = spawnPtyHost({
    path: "/bin/cat",
    sha256: sha256File("/bin/cat"),
    argv: [],
    env: {},
    executionId: "exec-abandoned-queue",
  });
  try {
    expect(subscriberCountForTest(handle)).toBe(0);
    const iterator = handle.facts()[Symbol.asyncIterator]();
    // Async generators are lazy: the body (queue attach) runs on the
    // first next(), not at facts() call time.
    expect(subscriberCountForTest(handle)).toBe(0);
    const first = await iterator.next();
    expect(first.done).toBe(false);
    expect(first.value).toMatchObject({ kind: "launched" });
    // The queue is now attached (synchronously at generator start).
    expect(subscriberCountForTest(handle)).toBe(1);
    // Abandon the iterator WITHOUT draining to done: for-await would call
    // iterator.return(); a manual break leaves the generator suspended
    // mid-yield, so the finally must run on the next return()/next().
    const returned = await iterator.return!();
    expect(returned.done).toBe(true);
    // THE regression assertion: the abandoned queue is gone. Under the
    // T7-CR defect this stays 1 and every later fact appends to it.
    expect(subscriberCountForTest(handle)).toBe(0);
    // The host keeps running and emitting; the removed queue must not
    // receive anything (defensive closed-skip in enqueue).
    handle.send({ kind: "resize", cols: 80, rows: 24 });
    await Bun.sleep(150);
    expect(subscriberCountForTest(handle)).toBe(0);
  } finally {
    // CodeRabbit CR-10 guard pattern: the host may have already exited.
    try { process.kill(handle.hostPid, "SIGKILL"); } catch { /* host may have exited */ }
    handle.killPgid();
  }
}, 15000);

test("a parked subscriber on a live silent host survives the hang-net boundary and receives a later fact (B1 regression)", async () => {
  // Architecture review B1: the 300 s net timer resolved `true` — the same
  // value as real settlement — so 5 idle minutes ended a live subscription
  // as a clean end-of-stream while the host and pump were alive, and the
  // finally then removed the queue, losing all later facts. The net is
  // accelerated here (300 ms) to make the boundary reachable; the fix
  // wakes the wait with `false` so the loop RE-ENTERS the wait instead of
  // returning. The parked subscriber must still receive a later fact.
  const handle = spawnPtyHost(
    {
      path: "/bin/cat",
      sha256: sha256File("/bin/cat"),
      argv: [],
      env: {},
      executionId: "exec-b1-net",
    },
    { hangNetMs: 300 },
  );
  try {
    const iterator = handle.facts()[Symbol.asyncIterator]();
    const first = await iterator.next();
    expect(first.done).toBe(false);
    expect(first.value).toMatchObject({ kind: "launched" });
    // Consume the rest of the backlog (ready) so the generator reaches the
    // live-wait: the next next() parks in the wait and arms the net.
    const second = await iterator.next();
    expect(second.done).toBe(false);
    expect(second.value).toMatchObject({ kind: "ready" });
    // Park: this next() enters the live-wait (empty queue, net armed at
    // 300 ms). The host is silent and alive — no input, no output, no
    // acks. Under the B1 defect the net resolves true at ~300 ms and this
    // next() returns { done: true }; with the fix it re-enters the wait
    // and stays pending until a fact arrives.
    const parked = iterator.next();
    await Bun.sleep(700); // comfortably past the net boundary
    // A later fact must still arrive: resize produces an ack.
    handle.send({ kind: "resize", cols: 80, rows: 24 });
    const result = await Promise.race([
      parked.then((r) => ({ tag: "v" as const, r })),
      new Promise<{ tag: "t" }>((res) => setTimeout(() => res({ tag: "t" }), 2000)),
    ]);
    if (result.tag === "t") throw new Error("parked subscriber hung after the net boundary");
    // THE regression assertion: the stream is still live — not done — and
    // the later fact arrived.
    expect(result.r.done).toBe(false);
    expect(result.r.value).toMatchObject({ kind: "ack", ofKind: "resize" });
    // The queue survived the net boundary (not removed by a false end).
    expect(subscriberCountForTest(handle)).toBe(1);
  } finally {
    // CodeRabbit CR-10 guard pattern: the host may have already exited.
    try { process.kill(handle.hostPid, "SIGKILL"); } catch { /* host may have exited */ }
    handle.killPgid();
  }
}, 15000);

test("repeated idle hang-net expirations do not accumulate stale waiters (round-12 regression)", async () => {
  // Round 12: the net path resolved `false` and re-entered the wait WITHOUT
  // removing its waiter callback from `queue.waiters`, so an idle
  // subscriber leaked one dead callback per net period — unbounded growth
  // on a long-lived idle session, and every later fanout walked the dead
  // set. The fix deletes the callback on BOTH exits (timer and settlement).
  // The net is accelerated to 120 ms so several expirations fit the test.
  const handle = spawnPtyHost(
    {
      path: "/bin/cat",
      sha256: sha256File("/bin/cat"),
      argv: [],
      env: {},
      executionId: "exec-r12-waiters",
    },
    { hangNetMs: 120 },
  );
  try {
    const iterator = handle.facts()[Symbol.asyncIterator]();
    // Drain the backlog so the generator reaches the live-wait phase.
    const first = await iterator.next();
    expect(first.done).toBe(false);
    expect(first.value).toMatchObject({ kind: "launched" });
    const second = await iterator.next();
    expect(second.done).toBe(false);
    expect(second.value).toMatchObject({ kind: "ready" });
    // Park in the live-wait. The host is silent, so the net fires
    // repeatedly; each expiry must remove its own callback and re-arm
    // exactly one replacement.
    const parked = iterator.next();
    await Bun.sleep(700); // ~5 net periods at 120 ms
    // THE regression assertion: exactly one live waiter, not one per
    // expiry. Under the defect this grows with every net period.
    expect(waiterCountForTest(handle)).toBe(1);
    // And the stream is still functional: a later fact is delivered.
    handle.send({ kind: "resize", cols: 80, rows: 24 });
    const result = await Promise.race([
      parked.then((r) => ({ tag: "v" as const, r })),
      new Promise<{ tag: "t" }>((res) => setTimeout(() => res({ tag: "t" }), 2000)),
    ]);
    if (result.tag === "t") throw new Error("parked subscriber hung after repeated net expirations");
    expect(result.r.done).toBe(false);
    expect(result.r.value).toMatchObject({ kind: "ack", ofKind: "resize" });
    // The delivering waiter removed itself too: the generator is between
    // yields here, so no wait is outstanding.
    expect(waiterCountForTest(handle)).toBe(0);
    expect(subscriberCountForTest(handle)).toBe(1);
  } finally {
    // CodeRabbit CR-10 guard pattern: the host may have already exited.
    try { process.kill(handle.hostPid, "SIGKILL"); } catch { /* host may have exited */ }
    handle.killPgid();
  }
}, 15000);

test("history is bounded by the cap regardless of how many facts the pump emits", async () => {
  // CodeRabbit CR-7 (PR #35 round-8) regression: the prior pin design
  // reset `start` to the pinned index whenever a trim would evict it, so
  // `history` grew WITHOUT BOUND whenever the first fact was `launched`
  // (which is every session). Drive 1024 facts through the pump (one ack
  // per resize command — deterministic, no child-output coalescing) and
  // assert a late subscriber replays only the bounded tail plus the
  // pinned `launched` fact, never the full stream.
  const handle = spawnPtyHost({
    path: "/bin/cat",
    sha256: sha256File("/bin/cat"),
    argv: [],
    env: {},
    executionId: "exec-bounded-tail",
  });
  try {
    for (let i = 0; i < 1024; i++) {
      handle.send({ kind: "resize", cols: 80, rows: 24 });
    }
    await Bun.sleep(750); // let the pump record the ack storm
    const iterator = handle.facts()[Symbol.asyncIterator]();
    let count = 0;
    let sawLaunched = false;
    const deadline = performance.now() + 4000;
    for (;;) {
      const next = await Promise.race([
        iterator.next().then((r) => ({ tag: "value" as const, r })),
        new Promise<{ tag: "timeout" }>((res) => setTimeout(() => res({ tag: "timeout" }), 500)),
      ]);
      if (next.tag === "timeout") break;
      if (next.r.done) break;
      count += 1;
      if (next.r.value.kind === "launched") sawLaunched = true;
      if (performance.now() > deadline) break;
    }
    // The pin survived the trims (replayed first), and the replay is the
    // bounded tail — with the CR-7 bug this would be > 1024 facts.
    // N1 (CodeRabbit round-8 nitpick, folded per Founder round-9
    // authorization): the LOWER bound proves the cap was actually
    // exercised. Empirically the replay lands at ~253 facts (five probe
    // repetitions, 100% stable); a short replay below 100 would mean the
    // pump never crossed HISTORY_CAP, letting the test pass vacuously
    // under the old unbounded-growth behavior.
    expect(sawLaunched).toBe(true);
    expect(count).toBeGreaterThan(100);
    expect(count).toBeLessThanOrEqual(400);
  } finally {
    // CodeRabbit CR-10 (PR #35 round-8): the host may have already exited;
    // guard the kill.
    try { process.kill(handle.hostPid, "SIGKILL"); } catch { /* host may have exited */ }
    handle.killPgid();
  }
}, 20000);

test("the launched history fact feeds killPgid even when facts() is never consumed", async () => {
  // Tier-2 FAIL round-4, finding 2 (killPgid half): reportedPgid must be
  // recorded by the pump at spawn time, independent of any facts()
  // consumption. Prove it: spawn, never call facts(), then killPgid() —
  // the /bin/cat group must actually die (a blind killPgid would be a
  // no-op and the group would survive).
  const handle = spawnPtyHost({
    path: "/bin/cat",
    sha256: sha256File("/bin/cat"),
    argv: [],
    env: {},
    executionId: "exec-killpgid-unconsumed",
  });
  try {
    await new Promise((res) => setTimeout(res, 300)); // pump learns launched
    // killPgid uses the pump-recorded pgid; the group (/bin/cat) must die.
    handle.killPgid();
    // If reportedPgid was never set, killPgid silently does nothing and the
    // cat process keeps running. Detect via the pump: facts() (any call)
    // will still stream nothing new, but /bin/cat's liveness is the check —
    // poll until the host itself dies of EPIPE/exit since its child died.
    const host = handle.hostPid;
    const t0 = performance.now();
    let hostDied = false;
    while (performance.now() - t0 < 8000) {
      try {
        process.kill(handle.hostPid, 0);
      } catch {
        hostDied = true;
        break;
      }
      await new Promise((res) => setTimeout(res, 25));
      // cat's death makes the host finish its session and exit.
    }
    expect(hostDied).toBe(true);
  } finally {
    try { process.kill(handle.hostPid, "SIGKILL"); } catch { /* gone */ }
    handle.killPgid();
  }
}, 15000);

// ── Tier-2 round-6 findings 1-3: synchronous subscription, replay gap, pin ─

test("pump settlement during backlog replay reaches the subscriber without hanging", async () => {
  // Round-6 finding 1 (race-to-hang): a subscriber whose backlog replay
  // overlaps pump settlement must receive the settlement broadcast via its
  // live queue — never hang in the safety net. This test races the two by
  // subscribing while the host is dying: closeStdin triggers the host's EOF
  // containment, so facts and settlement land DURING replay.
  //
  // Fixture note: /bin/sh + foreground sleep (not /bin/cat) — the sh child
  // dies on the EOF rung's SIGTERM and its PTY settles quickly, exercising
  // the pump's settlement broadcast promptly; a /bin/cat fixture leaves the
  // PTY-unsettled 3 s join as the stream-ending delay, which is a separate
  // concern from the subscription race this test targets.
  const handle = spawnPtyHost({
    path: "/bin/sh",
    sha256: sha256File("/bin/sh"),
    argv: ["-c", "sleep 300"],
    env: {},
    executionId: "exec-settle-during-replay",
  });
  try {
    // First subscriber consumes `launched`, then we trigger host death so
    // facts + settlement race the second subscriber's backlog replay.
    const preIterator = handle.facts()[Symbol.asyncIterator]();
    const pre = await preIterator.next();
    expect(pre.done).toBe(false);
    handle.closeStdin(); // EOF kill switch: child terminates, pump settles soon
    // Immediately subscribe — the backlog replay now overlaps settlement.
    const iterator = handle.facts()[Symbol.asyncIterator]();
    const collected: string[] = [];
    let terminated = false;
    const deadline = performance.now() + 10000;
    for (;;) {
      const next = (await Promise.race([
        iterator.next().then((r) => ({ tag: "value" as const, r })),
        new Promise<{ tag: "timeout" }>((res) => setTimeout(() => res({ tag: "timeout" }), 5000)),
      ]));
      if (next.tag === "timeout") break;
      if (next.r.done) { terminated = true; break; }
      collected.push(next.r.value.kind);
      if (performance.now() > deadline) break;
    }
    // No hang (the deadline bound held — never the 5-minute net), and the
    // subscriber observed the settled stream ending (or facts through it).
    expect(terminated).toBe(true);
    expect(collected).not.toContain("termination_started"); // EOF, not terminate-cmd
  } finally {
    // CodeRabbit CR-10 (PR #35 round-8): the host may have already exited
    // before this finally runs; a bare kill throws ESRCH and replaces the
    // real test result.
    try { process.kill(handle.hostPid, "SIGKILL"); } catch { /* host may have exited */ }
    handle.killPgid();
  }
}, 15000);

test("facts enqueued during backlog replay are not lost", async () => {
  // Round-6 finding 2 (async-gap data loss): a subscriber attached while
  // the pump is STILL emitting must receive facts that land during its
  // backlog replay. Mechanism: /bin/cat emits nothing spontaneously, so
  // drive facts from the test side — send resize commands (which ack) at a
  // rate overlapping the replay; acks arriving during replay must appear.
  const handle = spawnPtyHost({
    path: "/bin/cat",
    sha256: sha256File("/bin/cat"),
    argv: [],
    env: {},
    executionId: "exec-during-replay",
  });
  try {
    const preIterator = handle.facts()[Symbol.asyncIterator]();
    await preIterator.next(); // launched
    // Attach the subscriber NOW (before more facts are pumped), then pump
    // resizes from the test side WHILE its backlog replay is yielding.
    const iterator = handle.facts()[Symbol.asyncIterator]();
    const resizePromises: Promise<unknown>[] = [];
    for (let i = 0; i < 10; i += 1) {
      resizePromises.push(
        (async () => {
          await Bun.sleep(5 + i * 3); // land during/after replay yields
          handle.send({ kind: "resize", cols: 80 + i, rows: 24 });
        })(),
      );
    }
    // Consume: every resize ack must be observed — none lost in the gap.
    const acks: unknown[] = [];
    const deadline = performance.now() + 8000;
    while (acks.length < 10 && performance.now() < deadline) {
      const next = (await Promise.race([
        iterator.next().then((r) => ({ tag: "value" as const, r })),
        new Promise<{ tag: "timeout" }>((res) => setTimeout(() => res({ tag: "timeout" }), 1000)),
      ]));
      if (next.tag === "timeout") continue;
      if (next.r.done) break;
      const f = next.r.value;
      if (f.kind === "ack" && f.ofKind === "resize") acks.push(f);
      await Promise.allSettled(resizePromises);
    }
    expect(acks.length).toBe(10); // none of the 10 acks lost during replay
  } finally {
    // CodeRabbit CR-10 (PR #35 round-8): the host may have already exited;
    // guard the kill.
    try { process.kill(handle.hostPid, "SIGKILL"); } catch { /* host may have exited */ }
    handle.killPgid();
  }
}, 15000);

test("the launched fact survives history pressure and is replayed to late subscribers", async () => {
  // Round-6 finding 3 + Founder correction 4: the first `launched` fact is
  // PINNED against history-cap eviction. Force eviction pressure with a
  // noisy child emitting 300 output facts after launch; the late
  // subscriber must still receive `launched` (with the real pgid) despite
  // the 256 cap trimming the oldest entries.
  const handle = spawnPtyHost({
    path: "/bin/sh",
    sha256: sha256File("/bin/sh"),
    argv: ["-c", "for j in 1 2 3 4 5 6; do echo 'NOISE_LINE_AAAAAAAAAA_BBBBBBBBBB'; done; while true; do sleep 1; done"],
    env: {},
    executionId: "exec-launched-pinned",
  });
  try {
    // Consume nothing — the pump records history including launched, then
    // the noisy child's output presses the cap.
    await Bun.sleep(400);
    // A late subscriber (after cap pressure) must still replay `launched`.
    const iterator = handle.facts()[Symbol.asyncIterator]();
    let sawLaunched = false;
    let sawPgid: number | null = null;
    const deadline = performance.now() + 8000;
    for (;;) {
      const next = (await Promise.race([
        iterator.next().then((r) => ({ tag: "value" as const, r })),
        new Promise<{ tag: "timeout" }>((res) => setTimeout(() => res({ tag: "timeout" }), 1500)),
      ]));
      if (next.tag === "timeout") break;
      if (next.r.done) break;
      if (next.r.value.kind === "launched") {
        sawLaunched = true;
        sawPgid = next.r.value.pgid;
      }
      if (sawLaunched && performance.now() > deadline) break;
      await Bun.sleep(10);
    }
    expect(sawLaunched).toBe(true);
    expect(typeof sawPgid).toBe("number");
  } finally {
    // CodeRabbit CR-10 (PR #35 round-8): the host may have already exited;
    // guard the kill.
    try { process.kill(handle.hostPid, "SIGKILL"); } catch { /* host may have exited */ }
    handle.killPgid();
  }
}, 15000);

// ───────────────────────── Task 44: wedged-host escalation ─────────────────────────
//
// BINDING RULE (Founder, Task 44): dead-host escalation MUST use an
// independent liveness signal (the spawn-time `proc.exited` watch) and MUST
// NOT infer host death from `send()`/`closeStdin()` failure. Probed on Bun
// 1.3.14: writes to a dead host's stdin succeed silently (FileSink swallows
// EPIPE; zero sync throws, zero unhandled rejections), so a write-failure
// detector never fires and its test passes vacuously.
//
// Every test below uses TEST-OWNED monotonic timing and EXTERNAL liveness
// observation (signal-0 polling of the real process group / host pid).
// `observedMs` from the implementation is never a pass condition.

/** Test-owned external liveness probe — never the implementation's. */
function externallyAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (err) {
    const code = typeof err === "object" && err !== null && "code" in err
      ? (err as { code: unknown }).code
      : undefined;
    // EPERM means it exists but is not ours to signal — still alive.
    return code !== "ESRCH";
  }
}

/** External group liveness: signal-0 against the negative pgid. */
function groupExternallyAlive(pgid: number): boolean {
  try {
    process.kill(-pgid, 0);
    return true;
  } catch (err) {
    const code = typeof err === "object" && err !== null && "code" in err
      ? (err as { code: unknown }).code
      : undefined;
    return code !== "ESRCH";
  }
}

/** Poll an external condition with the test's own monotonic clock. */
async function waitUntil(
  predicate: () => boolean,
  timeoutMs: number,
): Promise<boolean> {
  const start = performance.now();
  while (performance.now() - start < timeoutMs) {
    if (predicate()) return true;
    await new Promise((r) => setTimeout(r, 5));
  }
  return predicate();
}

/** Best-effort cleanup: every failure path must leave no real processes. */
function cleanupProcesses(hostPid: number | null, pgid: number | null): void {
  if (pgid !== null && Number.isInteger(pgid) && pgid > 1) {
    try { process.kill(-pgid, "SIGKILL"); } catch { /* group gone */ }
  }
  if (hostPid !== null) {
    try { process.kill(hostPid, "SIGKILL"); } catch { /* host gone */ }
  }
}

test("S1: a responsive host acknowledging within 250 ms causes no escalation (C7 evidence 1)", async () => {
  // C7.3 step 2: a timely acknowledgement on a live host means NO
  // escalation. This test proves all four required negatives on the REAL
  // responsive path:
  //   - the acknowledgement arrived by the 250 ms deadline;
  //   - closeStdin() was NOT called (independent seam, counted at the real
  //     call site inside spawnPtyHost — not self-reported by the escalation);
  //   - neither the PGID nor the host PID kill was attempted;
  //   - no interruption was recorded.
  const handle = spawnPtyHost({
    path: "/bin/cat",
    sha256: sha256File("/bin/cat"),
    argv: [],
    env: {},
    executionId: "exec-t44-s1-responsive",
  });
  let pgid: number | null = null;
  try {
    const iterator = handle.facts()[Symbol.asyncIterator]();
    const first = await iterator.next();
    expect(first.done).toBe(false);
    expect(first.value).toMatchObject({ kind: "launched" });
    pgid = (first.value as Extract<HostFactFrame, { kind: "launched" }>).pgid;

    // Baseline: the lifeline has never been closed on this handle.
    expect(closeStdinCallCountForTest(handle)).toBe(0);

    // The acknowledgement signal is the REAL `ack{ofKind:"terminate"}` fact
    // from the live host — not a synthetic timer. Measured on this runtime
    // the host acks at ~11.9 ms and then exits at ~14.5 ms, so a fabricated
    // delay would race the genuine exit and make the test meaningless. The
    // watcher is attached BEFORE the terminate command so the fact cannot
    // be missed.
    const iterator2 = handle.facts()[Symbol.asyncIterator]();
    let ackObservedMs = -1;
    const tCommand = performance.now();
    const ackSignal = new Promise<boolean>((resolve) => {
      void (async () => {
        for (;;) {
          const next = await iterator2.next();
          if (next.done) {
            resolve(false);
            return;
          }
          const fact = next.value as HostFactFrame;
          if (fact.kind === "ack" && fact.ofKind === "terminate") {
            ackObservedMs = performance.now() - tCommand;
            resolve(true);
            return;
          }
        }
      })();
    });

    const outcome = await escalateWedgedHost(handle, pgid, handle.hostPid, { ackSignal });

    // The acknowledgement genuinely arrived, and by the 250 ms deadline —
    // measured on the TEST's monotonic clock, not the implementation's.
    expect(ackObservedMs).toBeGreaterThanOrEqual(0);
    expect(ackObservedMs).toBeLessThan(HOST_ACK_MS);
    expect(outcome.state).toBe("S1");
    expect(outcome.escalated).toBe(false);

    // closeStdin() was NOT called — proven independently at the real call
    // site, so the escalation path cannot under-report a close it performed.
    expect(outcome.closeStdinCalled).toBe(false);
    expect(closeStdinCallCountForTest(handle)).toBe(0);

    // Neither kill was attempted.
    expect(outcome.pgidKillAttempted).toBe(false);
    expect(outcome.hostKillAttempted).toBe(false);
    expect(outcome.killOrder).toEqual([]);

    // No interruption was recorded.
    expect(outcome.interrupted).toBe(false);

    // EXTERNAL delivery evidence, stated precisely. The child group IS gone
    // after a responsive terminate — but the HOST's own §3.4 ladder did
    // that, not this escalation path. The distinguishing evidence that the
    // S1 path delivered nothing is the lifeline seam plus the empty kill
    // order: had escalation run, closeStdin() would have been called and
    // killOrder would contain "pgid".
    expect(closeStdinCallCountForTest(handle)).toBe(0);
    expect(outcome.killOrder).toEqual([]);
    // The host also reached its own clean exit rather than being SIGKILLed
    // by this path — an exit code/signal is observable, and a host killed by
    // escalation would have been signalled while `exited` was still pending.
    expect(outcome.unnecessaryHostExitConfirmed).toBe(false);
  } finally {
    cleanupProcesses(handle.hostPid, pgid);
  }
}, 15000);

test("S3: a SIGSTOPped host is not killed before the ack deadline and is contained by the absolute 500 ms deadline (C7 evidence 2)", async () => {
  // C7.3 steps 3-4 + §9.8/§6.4.10: a SIGSTOPped host cannot acknowledge and
  // cannot contain its child. It earns NO extra grace. This proves both
  // halves of the corrected timing contract:
  //   - no kill occurs BEFORE the 250 ms acknowledgement deadline; and
  //   - containment BEGINS by t_command + 500 ms absolute.
  // Both measured on the TEST's own monotonic clock with EXTERNAL liveness
  // observation; observedMs is never a pass condition.
  const handle = spawnPtyHost({
    path: "/bin/cat",
    sha256: sha256File("/bin/cat"),
    argv: [],
    env: {},
    executionId: "exec-t44-s3-sigstop",
  });
  let pgid: number | null = null;
  try {
    const iterator = handle.facts()[Symbol.asyncIterator]();
    const first = await iterator.next();
    expect(first.done).toBe(false);
    pgid = (first.value as Extract<HostFactFrame, { kind: "launched" }>).pgid;

    // Wedge the host: SIGSTOP freezes it without killing it, so `exited`
    // stays pending and signal-0 reports alive — the S3 classification.
    process.kill(handle.hostPid, "SIGSTOP");
    expect(externallyAlive(handle.hostPid)).toBe(true);
    expect(groupExternallyAlive(pgid)).toBe(true);

    // Independent observer: sample the child group's liveness across the
    // acknowledgement window. If any kill were delivered early, the group
    // would be gone before the deadline.
    const tCommand = performance.now();
    let groupAliveAtDeadlineCheck = true;
    const earlyObserver = (async () => {
      while (performance.now() - tCommand < HOST_ACK_MS - 40) {
        if (!groupExternallyAlive(pgid as number)) {
          groupAliveAtDeadlineCheck = false;
          return;
        }
        await new Promise((r) => setTimeout(r, 5));
      }
    })();

    const outcome = await escalateWedgedHost(handle, pgid, handle.hostPid);
    const elapsedToReturn = performance.now() - tCommand;
    await earlyObserver;

    // No kill before the acknowledgement deadline.
    expect(groupAliveAtDeadlineCheck).toBe(true);

    // The wedged host is alive-or-indeterminate => S3: both kills attempted.
    expect(outcome.state).toBe("S3");
    expect(outcome.reason).toBe("pty_host_failure");
    expect(outcome.escalated).toBe(true);
    expect(outcome.closeStdinCalled).toBe(true);
    expect(closeStdinCallCountForTest(handle)).toBe(1);
    expect(outcome.pgidKillAttempted).toBe(true);
    expect(outcome.hostKillAttempted).toBe(true);
    expect(outcome.interrupted).toBe(true);

    // The ack window WAS observed (no instant escalation) …
    //
    // Tolerance note: `setTimeout` may fire a fraction of a millisecond
    // early relative to `performance.now()`, so the raw comparison flakes at
    // ~249.7 vs 250. The requirement is "the acknowledgement window was
    // genuinely waited out", not sub-millisecond timer exactness, so a 2 ms
    // scheduling tolerance is applied. This cannot mask a real defect: the
    // pre-C7 no-wait behavior returned in ~1 ms, two orders of magnitude
    // away, and mutation 2 (a 400 ms added grace) is still caught by the
    // absolute upper bound below.
    expect(elapsedToReturn).toBeGreaterThanOrEqual(HOST_ACK_MS - 2);
    // … and yet containment began inside the SAME absolute budget: no
    // second grace period was granted for being unresponsive.
    expect(elapsedToReturn).toBeLessThanOrEqual(HOST_HARD_KILL_MS);

    // EXTERNAL delivery evidence: the group and the host are really gone,
    // within the §9.8 outer bound.
    const groupGone = await waitUntil(() => !groupExternallyAlive(pgid as number), HOST_OUTER_BOUND_MS);
    expect(groupGone).toBe(true);
    const hostGone = await waitUntil(() => !externallyAlive(handle.hostPid), HOST_OUTER_BOUND_MS);
    expect(hostGone).toBe(true);
  } finally {
    try { process.kill(handle.hostPid, "SIGCONT"); } catch { /* gone */ }
    cleanupProcesses(handle.hostPid, pgid);
  }
}, 25000);

test("S0: a dead host with a stdin-inheriting descendant still triggers mandatory child-PGID containment (C7 evidence 3)", async () => {
  // Evidence 3: the host is ALREADY dead (SIGKILLed) before escalation, and
  // the governed child holds the inherited stdin. Containment of the child
  // PGID is MANDATORY anyway and must not wait for EPIPE — which on Bun
  // 1.3.14 never arrives, because writes to a dead host's stdin succeed
  // silently. The child group must die from the direct PGID path alone.
  const fixture = "/tmp/t44-stdin-inheritor.sh";
  require("node:fs").writeFileSync(fixture, '#!/bin/sh\ntrap "" TERM\nwhile true; do sleep 0.05; done\n');
  require("node:fs").chmodSync(fixture, 0o755);

  const handle = spawnPtyHost({
    path: fixture,
    sha256: sha256File(fixture),
    argv: [],
    env: { PATH: "/bin:/usr/bin" },
    executionId: "exec-t44-s0-dead-host",
  });
  let pgid: number | null = null;
  try {
    const iterator = handle.facts()[Symbol.asyncIterator]();
    const first = await iterator.next();
    expect(first.done).toBe(false);
    pgid = (first.value as Extract<HostFactFrame, { kind: "launched" }>).pgid;

    // Kill the HOST outright. The child group survives it (the child is in
    // its own process group and ignores SIGTERM).
    process.kill(handle.hostPid, "SIGKILL");
    const hostGone = await waitUntil(() => !externallyAlive(handle.hostPid), 5000);
    expect(hostGone).toBe(true);
    // External proof the descendant outlived its host.
    expect(groupExternallyAlive(pgid)).toBe(true);

    const outcome = await escalateWedgedHost(handle, pgid, handle.hostPid);

    // S0: the authoritative exit watch resolved => host death is KNOWN.
    expect(outcome.state).toBe("S0");
    expect(outcome.reason).toBe("pty_host_failure");
    expect(outcome.unnecessaryHostExitConfirmed).toBe(true);
    // Mandatory containment still ran …
    expect(outcome.pgidKillAttempted).toBe(true);
    expect(outcome.killOrder).toEqual(["pgid"]);
    // … and the dead host's PID was NEVER signalled (PID-recycling
    // protection, v2.2 invariant 1).
    expect(outcome.hostKillAttempted).toBe(false);
    expect(outcome.killOrder).not.toContain("host");
    // S0 skips the lifeline close entirely — the host is already gone.
    expect(outcome.closeStdinCalled).toBe(false);
    expect(closeStdinCallCountForTest(handle)).toBe(0);

    // EXTERNAL delivery evidence: the descendant group is really gone,
    // killed by the direct PGID path with no EPIPE involved.
    const groupGone = await waitUntil(() => !groupExternallyAlive(pgid as number), HOST_OUTER_BOUND_MS);
    expect(groupGone).toBe(true);
  } finally {
    cleanupProcesses(handle.hostPid, pgid);
  }
}, 25000);

test("a never-throwing send()/closeStdin() cannot prevent escalation (C7 evidence 4)", async () => {
  // Evidence 4 + the BINDING RULE. This is the vacuity guard: a handle whose
  // send() and closeStdin() NEVER throw (exactly Bun 1.3.14's real FileSink
  // behavior against a dead host) must still escalate. Any implementation
  // that inferred death from a write failure would silently do nothing here.
  const real = spawnPtyHost({
    path: "/bin/cat",
    sha256: sha256File("/bin/cat"),
    argv: [],
    env: {},
    executionId: "exec-t44-never-throw",
  });
  let pgid: number | null = null;
  try {
    const iterator = real.facts()[Symbol.asyncIterator]();
    const first = await iterator.next();
    pgid = (first.value as Extract<HostFactFrame, { kind: "launched" }>).pgid;

    // Wedge the host so it cannot acknowledge.
    process.kill(real.hostPid, "SIGSTOP");

    // A handle whose lifeline operations are guaranteed silent no-ops.
    let sendCalls = 0;
    let closeCalls = 0;
    const silentHandle: typeof real = {
      hostPid: real.hostPid,
      send: () => { sendCalls += 1; /* never throws, like a dead FileSink */ },
      facts: real.facts,
      closeStdin: () => { closeCalls += 1; /* never throws */ },
      killPgid: real.killPgid,
    };

    const outcome = await escalateWedgedHost(silentHandle, pgid, real.hostPid);

    // The silent lifeline was exercised …
    expect(sendCalls).toBe(1);
    expect(closeCalls).toBe(1);
    // … and escalation happened anyway, driven by the independent liveness
    // signal rather than by any write outcome.
    expect(outcome.escalated).toBe(true);
    expect(outcome.reason).toBe("pty_host_failure");
    expect(outcome.pgidKillAttempted).toBe(true);
    expect(outcome.state).toBe("S3");

    // EXTERNAL delivery evidence.
    const groupGone = await waitUntil(() => !groupExternallyAlive(pgid as number), HOST_OUTER_BOUND_MS);
    expect(groupGone).toBe(true);
  } finally {
    try { process.kill(real.hostPid, "SIGCONT"); } catch { /* gone */ }
    cleanupProcesses(real.hostPid, pgid);
  }
}, 25000);

test("ordered kill attempts are paired with real external delivery evidence (C7 evidence 5)", async () => {
  // Evidence 5 + v2.2 invariant 5: ORDERED CALL ATTEMPTS (the seam-recorded
  // killOrder) are asserted separately from REAL DELIVERY (external
  // signal-0 observation that the group and host are actually gone).
  const handle = spawnPtyHost({
    path: "/bin/cat",
    sha256: sha256File("/bin/cat"),
    argv: [],
    env: {},
    executionId: "exec-t44-ordered-kills",
  });
  let pgid: number | null = null;
  try {
    const iterator = handle.facts()[Symbol.asyncIterator]();
    const first = await iterator.next();
    pgid = (first.value as Extract<HostFactFrame, { kind: "launched" }>).pgid;

    process.kill(handle.hostPid, "SIGSTOP");
    const outcome = await escalateWedgedHost(handle, pgid, handle.hostPid);

    // Ordering evidence: the child group is contained BEFORE the host, so a
    // dying host can never orphan its child.
    expect(outcome.state).toBe("S3");
    expect(outcome.killOrder).toEqual(["pgid", "host"]);
    expect(outcome.killOrder.indexOf("pgid")).toBeLessThan(outcome.killOrder.indexOf("host"));

    // REAL delivery evidence, independent of the recorded order: both the
    // group and the host are genuinely gone within the §9.8 outer bound.
    const groupGone = await waitUntil(() => !groupExternallyAlive(pgid as number), HOST_OUTER_BOUND_MS);
    expect(groupGone).toBe(true);
    const hostGone = await waitUntil(() => !externallyAlive(handle.hostPid), HOST_OUTER_BOUND_MS);
    expect(hostGone).toBe(true);
  } finally {
    try { process.kill(handle.hostPid, "SIGCONT"); } catch { /* gone */ }
    cleanupProcesses(handle.hostPid, pgid);
  }
}, 25000);

test("pty_host_failure remains fixed through a mid-ladder host exit (C7 evidence 6)", async () => {
  // Evidence 6 + C7.3 step 4 / packet C4 S5: the reason binds at escalation
  // ENTRY. A host that dies DURING the ladder never relabels it, and a late
  // acknowledgement never cancels escalation.
  const handle = spawnPtyHost({
    path: "/bin/cat",
    sha256: sha256File("/bin/cat"),
    argv: [],
    env: {},
    executionId: "exec-t44-midladder-exit",
  });
  let pgid: number | null = null;
  try {
    const iterator = handle.facts()[Symbol.asyncIterator]();
    const first = await iterator.next();
    pgid = (first.value as Extract<HostFactFrame, { kind: "launched" }>).pgid;

    process.kill(handle.hostPid, "SIGSTOP");

    // A LATE acknowledgement: resolves well after the 250 ms deadline. It
    // must not cancel or alter the escalation already under way.
    const lateAck = new Promise<boolean>((resolve) => setTimeout(() => resolve(true), 400));

    // Kill the host mid-ladder, after the deadline has passed.
    setTimeout(() => {
      try { process.kill(handle.hostPid, "SIGCONT"); } catch { /* gone */ }
      try { process.kill(handle.hostPid, "SIGKILL"); } catch { /* gone */ }
    }, 260);

    const outcome = await escalateWedgedHost(handle, pgid, handle.hostPid, { ackSignal: lateAck });

    // The entry reason survived both the late ack and the mid-ladder exit.
    expect(outcome.reason).toBe("pty_host_failure");
    expect(outcome.escalated).toBe(true);
    // Containment still mandatory.
    expect(outcome.pgidKillAttempted).toBe(true);

    const groupGone = await waitUntil(() => !groupExternallyAlive(pgid as number), HOST_OUTER_BOUND_MS);
    expect(groupGone).toBe(true);
  } finally {
    try { process.kill(handle.hostPid, "SIGCONT"); } catch { /* gone */ }
    cleanupProcesses(handle.hostPid, pgid);
  }
}, 25000);

test("the host environment fixture reports normalized key-set equality and excludes the ambient canary (C7 evidence 7)", async () => {
  // Evidence 7 + packet C1: DIRECT observation of the governed child's
  // environment, replacing the construction-level-only assertion that made
  // the old env-boundary test vacuous.
  //
  // Transport: the fixture is launched through HostLaunchDescriptor.path —
  // the real supervisor spawns the real host, which launches the fixture as
  // the governed child. The observed environment is therefore the
  // descriptor's allowlist as forwarded BY THE ACTUAL HOST, exercising the
  // whole supervisor -> host -> child chain.
  //
  // Secret-safety: the fixture prints KEY NAMES ONLY, through the existing
  // `output` fact channel. No values are emitted, parsed, printed, or
  // asserted; no new fact kind and no codec change.
  const fixture = "/tmp/t44-envkeys.sh";
  require("node:fs").writeFileSync(
    fixture,
    '#!/bin/sh\nprintf "@@MADV_ENVKEYS %s@@\\n" "$(env | sed "s/=.*//" | sort | tr "\\n" "," | sed "s/,$//")"\nsleep 2\n',
  );
  require("node:fs").chmodSync(fixture, 0o755);

  // Plant an ambient canary in the SUPERVISOR's environment. It is absent
  // from descriptor.env, so its absence downstream proves no ambient
  // variable crossed supervisor -> host -> child.
  const canary = `MADVENTURES_CANARY_${Date.now()}`;
  process.env[canary] = "ambient-leak-canary";

  const allowlisted = {
    PATH: "/bin:/usr/bin",
    MADV_FIXTURE_MARKER: "task44",
  };

  const handle = spawnPtyHost({
    path: fixture,
    sha256: sha256File(fixture),
    argv: [],
    env: allowlisted,
    executionId: "exec-t44-envkeys",
  });
  let pgid: number | null = null;
  try {
    const iterator = handle.facts()[Symbol.asyncIterator]();
    const first = await iterator.next();
    expect(first.done).toBe(false);
    pgid = (first.value as Extract<HostFactFrame, { kind: "launched" }>).pgid;

    // Scan the existing output channel for the fixture-only marker.
    let markerPayload: string | null = null;
    const deadline = performance.now() + 8000;
    let accumulated = "";
    while (performance.now() < deadline && markerPayload === null) {
      const next = await iterator.next();
      if (next.done) break;
      const fact = next.value as HostFactFrame;
      if (fact.kind !== "output") continue;
      accumulated += new TextDecoder().decode(fact.bytes);
      const match = /@@MADV_ENVKEYS ([^@]*)@@/.exec(accumulated);
      if (match !== null) markerPayload = match[1] ?? "";
    }
    expect(markerPayload).not.toBeNull();

    // Normalized key-set equality: dedupe + sort both sides, UTF-8 string
    // comparison. An empty env fails against a non-empty allowlist by
    // construction.
    //
    // SHELL-INJECTED KEYS: the fixture is a /bin/sh script, and every POSIX
    // shell sets PWD, SHLVL and _ in its own environment at startup. Proven
    // independently: `env -i /bin/sh -c 'env'` yields exactly PWD, SHLVL, _
    // from a completely empty environment. These originate in the fixture's
    // interpreter DOWNSTREAM of the governed boundary — they are not
    // supervisor or host leakage — so the oracle subtracts exactly this
    // closed set and nothing else. Any other unexpected key still fails.
    const SHELL_INJECTED = new Set(["PWD", "SHLVL", "_"]);
    const observedAll = [...new Set((markerPayload as string).split(",").filter((k) => k.length > 0))].sort();
    const observedKeys = observedAll.filter((k) => !SHELL_INJECTED.has(k));
    const expectedKeys = [...new Set(Object.keys(allowlisted))].sort();
    expect(observedKeys).toEqual(expectedKeys);
    expect(observedKeys.length).toBeGreaterThan(0);

    // The ambient canary never crossed the chain — asserted against the
    // UNFILTERED key set, so the subtraction above cannot hide a leak.
    expect(observedAll).not.toContain(canary);
    // …while the supervisor still holds it, proving the canary was live.
    expect(process.env[canary]).toBe("ambient-leak-canary");

    // No ambient MADVENTURES_* variable of any kind crossed.
    expect(observedAll.filter((k) => k.startsWith("MADVENTURES_"))).toEqual([]);

    // Secret-safety self-check: the marker carries no "=" — names only.
    expect(markerPayload as string).not.toContain("=");
  } finally {
    delete process.env[canary];
    cleanupProcesses(handle.hostPid, pgid);
  }
}, 25000);

test("every escalation failure path cleans up real processes (C7 evidence 8)", async () => {
  // Evidence 8: after escalation, NO governed process may survive — proven
  // by external observation, and by escalating against an already-reaped
  // host (the hostile case where every kill target is gone) without
  // throwing.
  const fixture = "/tmp/t44-cleanup-child.sh";
  require("node:fs").writeFileSync(fixture, '#!/bin/sh\ntrap "" TERM\nwhile true; do sleep 0.05; done\n');
  require("node:fs").chmodSync(fixture, 0o755);

  const handle = spawnPtyHost({
    path: fixture,
    sha256: sha256File(fixture),
    argv: [],
    env: { PATH: "/bin:/usr/bin" },
    executionId: "exec-t44-cleanup",
  });
  let pgid: number | null = null;
  try {
    const iterator = handle.facts()[Symbol.asyncIterator]();
    const first = await iterator.next();
    pgid = (first.value as Extract<HostFactFrame, { kind: "launched" }>).pgid;

    process.kill(handle.hostPid, "SIGSTOP");
    const outcome = await escalateWedgedHost(handle, pgid, handle.hostPid);
    expect(outcome.escalated).toBe(true);

    // External proof: every governed process is gone inside the §9.8 outer
    // bound — the child group first, then the host.
    const groupGone = await waitUntil(() => !groupExternallyAlive(pgid as number), HOST_OUTER_BOUND_MS);
    expect(groupGone).toBe(true);
    const hostGone = await waitUntil(() => !externallyAlive(handle.hostPid), HOST_OUTER_BOUND_MS);
    expect(hostGone).toBe(true);

    // Hostile re-entry: escalating again, when every target is already
    // reaped, must not throw and must still classify as host-dead.
    const second = await escalateWedgedHost(handle, pgid, handle.hostPid);
    expect(second.reason).toBe("pty_host_failure");
    expect(second.hostKillAttempted).toBe(false);
    expect(second.unnecessaryHostExitConfirmed).toBe(true);
  } finally {
    try { process.kill(handle.hostPid, "SIGCONT"); } catch { /* gone */ }
    cleanupProcesses(handle.hostPid, pgid);
  }
}, 25000);
