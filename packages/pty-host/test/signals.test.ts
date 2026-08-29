// packages/pty-host/test/signals.test.ts
// Task 43: the bounded termination ladder and lifeline-EOF kill switch.
//
// The five named tests from the ratified plan (M19 section SHA-256
// 411500a3fad1b8107c52f7c8591381d7d825ee9379194c7edc14484d7d39f61b):
//  1. termination_started is emitted within 500 ms
//  2. a child ignoring SIGTERM is SIGKILLed after the 2 s grace
//  3. lifeline EOF terminates the child process group without a terminate command
//  4. all deadlines are measured on a monotonic clock
//  5. a grandchild in the same process group is terminated
//
// Invariant under test (plan Step 4): there are two independent kill
// switches and both complete inside the normative §9.8 deadlines.

import { expect, test } from "bun:test";
import { spawn, type Subprocess } from "bun";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { encodeCommand, decodeFact } from "../src/frames";
import type { HostCommandFrame, HostFactFrame } from "../src/frames";
// Task 43 planned surface — the import itself is the RED mechanism: before
// implementation, this module does not exist and every test fails with
// `Cannot find module "../src/signals"` (the plan's exact named RED reason).
import { HOST_DEADLINES_MS, terminateChildGroup, onLifelineEof } from "../src/signals";

// The planned surface is exercised through the real host (tests 1-3, 5) and
// through direct reference here so the binding is verified, not dead:
void HOST_DEADLINES_MS;
void terminateChildGroup;
void onLifelineEof;

const MAIN_ENTRY = join(import.meta.dir, "..", "src", "main.ts");
const REPO_ROOT = join(import.meta.dir, "..", "..", "..");
const BUN = process.execPath;

function sha256File(path: string): string {
  return new Bun.CryptoHasher("sha256").update(readFileSync(path)).digest("hex");
}

function launchFrame(path: string, argv: readonly string[]): Extract<HostCommandFrame, { kind: "launch" }> {
  return { kind: "launch", path, sha256: sha256File(path), argv, env: {}, executionId: "exec-signals" };
}

/** A child that ignores SIGTERM entirely (TERM trapped to a no-op) and stays alive. */
const IGNORE_TERM_ARGV = [
  "-c",
  'trap "" TERM; echo READY_IGN Mark; while true; do sleep 1; done',
];

/** A child that spawns a grandchild sharing its process group, then idles. */
const GRANDCHILD_ARGV = [
  "-c",
  "/bin/sleep 300 & echo GC_READY_$$_; wait",
];

interface LiveSession {
  readonly host: Subprocess<"pipe", "pipe", "pipe">;
  readonly facts: () => readonly HostFactFrame[];
  readonly waitForFact: (predicate: (f: HostFactFrame) => boolean, timeoutMs?: number) => Promise<HostFactFrame>;
  /** Resolves once any output-fact text contains `marker`. */
  readonly waitForOutputContaining: (marker: string, timeoutMs?: number) => Promise<void>;
  readonly pgid: () => number;
  readonly send: (f: HostCommandFrame) => void;
  readonly closeStdin: () => void;
  /** True once no process in the child's group is alive. */
  readonly groupGone: () => Promise<boolean>;
}

function spawnSignalsHost(argv: readonly string[]): LiveSession {
  const host = Bun.spawn([BUN, MAIN_ENTRY], {
    cwd: REPO_ROOT,
    stdin: "pipe",
    stdout: "pipe",
    stderr: "pipe",
    env: { PATH: process.env.PATH ?? "", HOME: process.env.HOME ?? "" },
  });
  host.stdin.write(encodeCommand(launchFrame("/bin/sh", argv)));
  host.stdin.flush();

  const facts: HostFactFrame[] = [];
  let buffer = new Uint8Array(0);
  let waiters: Array<() => void> = [];
  let pgid = -1;

  const wake = () => {
    const current = waiters;
    waiters = [];
    for (const w of current) w();
  };

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
        const decoded = decodeFact(buffer);
        if (decoded === null) break;
        if (decoded.frame.kind === "launched") pgid = decoded.frame.pgid;
        facts.push(decoded.frame);
        buffer = buffer.subarray(decoded.consumed);
      }
      wake();
    }
  })();

  const waitForFact = (predicate: (f: HostFactFrame) => boolean, timeoutMs = 10000): Promise<HostFactFrame> =>
    new Promise<HostFactFrame>((resolve, reject) => {
      let recheck: ReturnType<typeof setInterval> | undefined;
      const timer = setTimeout(() => {
        if (recheck !== undefined) clearInterval(recheck);
        reject(new Error("waitForFact timeout"));
      }, timeoutMs);
      const check = () => {
        const found = facts.find(predicate);
        if (found) {
          if (recheck !== undefined) clearInterval(recheck);
          clearTimeout(timer);
          resolve(found);
        }
      };
      check();
      waiters.push(check);
      // Deterministic re-check: a waiter registered in the same tick as the
      // reader's wake loop can miss that wake entirely (the wake list was
      // already drained), and stdout may stay silent for a long time after.
      // A periodic re-check makes the waiter race-free regardless of when
      // facts land relative to registration — same guarantee the live-host
      // harness in main-guard.test.ts provides via its updateWaiters.
      recheck = setInterval(check, 20);
    });

  const groupGone = async (): Promise<boolean> => {
    if (pgid === -1) return true;
    try {
      // Signal 0 probes group liveness without delivering anything.
      process.kill(-pgid, 0);
      return false;
    } catch {
      return true;
    }
  };

  const outputText = (): string => {
    const dec = new TextDecoder();
    let text = "";
    for (const f of facts) {
      if (f.kind === "output") text += dec.decode(f.bytes, { stream: false });
    }
    return text;
  };

  const waitForOutputContaining = (marker: string, timeoutMs = 10000): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      let recheck: ReturnType<typeof setInterval> | undefined;
      const timer = setTimeout(() => {
        if (recheck !== undefined) clearInterval(recheck);
        reject(new Error(`waitForOutputContaining timeout: ${marker}`));
      }, timeoutMs);
      const check = () => {
        if (outputText().includes(marker)) {
          if (recheck !== undefined) clearInterval(recheck);
          clearTimeout(timer);
          resolve();
        }
      };
      check();
      waiters.push(check);
      recheck = setInterval(check, 20);
    });

  return {
    host,
    facts: () => facts,
    waitForFact,
    waitForOutputContaining,
    pgid: () => pgid,
    send: (f) => {
      host.stdin.write(encodeCommand(f));
      host.stdin.flush();
    },
    closeStdin: () => {
      host.stdin.end();
      host.stdin.flush();
    },
    groupGone,
  };
}

// ── Named test 1: termination_started within 500 ms ─────────────────────────

test("termination_started is emitted within 500 ms", async () => {
  const s = spawnSignalsHost(["-c", "echo T43_READY_$$_; sleep 300"]);
  try {
    await s.waitForFact((f) => f.kind === "ready");
    const t0 = performance.now();
    s.send({ kind: "terminate" });
    const ts = await s.waitForFact((f) => f.kind === "termination_started");
    const elapsed = performance.now() - t0;
    expect(ts.kind).toBe("termination_started");
    expect(elapsed).toBeLessThan(500);
  } finally {
    try { s.send({ kind: "terminate" }); } catch { /* already closed */ }
    await s.host.exited;
  }
}, 15000); // explicit per-test timeout: bun's 5 s default would fire before the assertion window completes
// ── Named test 2: SIGTERM-ignoring child SIGKILLed after the 2 s grace ─────

test("a child ignoring SIGTERM is SIGKILLed after the 2 s grace", async () => {
  const s = spawnSignalsHost(IGNORE_TERM_ARGV);
  try {
    await s.waitForFact((f) => f.kind === "ready");
    // Deterministic trap installation: wait until the child's own output
    // proves the `trap "" TERM` line has executed — never signal before
    // the trap exists, or the test measures the wrong thing (a child that
    // dies to the first SIGTERM is a different scenario than one that
    // forces the SIGKILL rung).
    await s.waitForOutputContaining("READY_IGN");
    const t0 = performance.now();
    s.send({ kind: "terminate" });
    // termination_started must come fast (≤500ms); exit evidence then waits
    // out the responsive-host grace because the child traps TERM.
    await s.waitForFact((f) => f.kind === "termination_started", 2000);
    const exited = await s.waitForFact((f) => f.kind === "exited", 8000);
    const total = performance.now() - t0;
    // CodeRabbit CR-10 (PR #35 round): the test is named for the SIGKILL
    // rung, so assert it directly. The child traps TERM and cannot exit
    // voluntarily, so the outcome is deterministic: code null, signal
    // SIGKILL. (The old disjunction accepted any non-zero code or any
    // non-null signal, including SIGTERM — it did not prove the rung.)
    if (exited.kind === "exited") {
      expect(exited.signal).toBe("SIGKILL");
      expect(exited.code).toBeNull();
    } else {
      expect.unreachable();
    }
    expect(total).toBeGreaterThanOrEqual(2000); // observed grace ≥ 2 s
    expect(total).toBeLessThan(5000);            // outer bound
    await expect(s.groupGone()).resolves.toBe(true);
  } finally {
    try { s.host.kill(); } catch { /* gone */ }
  }
}, 15000); // 2 s grace + SIGKILL + settle cannot fit bun's 5 s default

// ── Named test 3: lifeline EOF without a terminate command ─────────────────

test("lifeline EOF terminates the child process group without a terminate command", async () => {
  const s = spawnSignalsHost(["-c", "echo T43_EOF_$$_; sleep 300"]);
  try {
    await s.waitForFact((f) => f.kind === "ready");
    // NO terminate command is ever sent — the supervisor's sole write end
    // closes, and the host must terminate the child's process group.
    s.closeStdin();
    const exited = await s.waitForFact((f) => f.kind === "exited", 8000);
    expect(exited.kind).toBe("exited");
    await expect(s.groupGone()).resolves.toBe(true);
    // No terminate command was sent, so nothing may announce a commanded
    // termination: no ack, no termination_started.
    const kinds = s.facts().map((f) => f.kind);
    expect(kinds).not.toContain("termination_started");
  } finally {
    try { s.host.kill(); } catch { /* gone */ }
  }
}, 15000); // EOF-driven termination must be observed on real process timescales, not bun's 5 s default

// ── Named test 4: monotonic clock ──────────────────────────────────────────

test("all deadlines are measured on a monotonic clock", async () => {
  // Static contract proof: the deadline path reads performance.now() and
  // never Date.now(). Source-level assertion with a byte-exact search over
  // the implementation module — the plan's Step 6 check, executable.
  const src = await Bun.file(join(import.meta.dir, "..", "src", "signals.ts")).text();
  expect(src).toContain("performance.now()");
  // Code-level check only: the identifier does not appear in executable
  // positions. Comment prose naming `Date.now()` (the prohibition record)
  // is stripped before the scan so documentation cannot trip the contract.
  const codeOnly = src
    .split("\n")
    .filter((line) => !line.trimStart().startsWith("//"))
    .map((line) => line.replace(/\/\*[\s\S]*?\*\//g, ""))
    .join("\n");
  expect(codeOnly).not.toContain("Date.now(");
});

// ── Named test 5: grandchild in the same process group terminated ──────────

test("a grandchild in the same process group is terminated", async () => {
  const s = spawnSignalsHost(GRANDCHILD_ARGV);
  try {
    await s.waitForFact((f) => f.kind === "ready");
    // CodeRabbit CR-11 (PR #35 round): `ready` proves only that the host
    // launched the child — not that /bin/sh has executed
    // `/bin/sleep 300 &`. If terminate won that race, the group would hold
    // no grandchild and the test would pass vacuously. The fixture already
    // echoes GC_READY after spawning the sleeper: wait for it so
    // negative-PGID delivery is genuinely exercised.
    await s.waitForOutputContaining("GC_READY");
    // The grandchild (/bin/sleep 300) shares the child's process group; the
    // negative-PGID signal must reach it. Observed from outside: the whole
    // group is gone after the terminate command completes.
    s.send({ kind: "terminate" });
    await s.waitForFact((f) => f.kind === "exited", 8000);
    await expect(s.groupGone()).resolves.toBe(true);
  } finally {
    try { s.host.kill(); } catch { /* gone */ }
  }
}, 15000); // grandchild includes a 300 s sleeper; termination observation needs > 5 s headroom
