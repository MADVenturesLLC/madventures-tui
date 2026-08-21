/**
 * Task 38 — Bun.Terminal dual-host capability spike (standalone primitive).
 *
 * Dual-role (contract Q6): the driver role (`runSpike()`) spawns fixture
 * processes, times, asserts, and sweeps — it never constructs a terminal.
 * The fixture-host role (self-exec: `bun <this-file> --fixture-host <scenario>`)
 * owns exactly one terminal lifecycle per invocation (both terminals for the
 * two-terminal leak scenario, in isolation), publishes launch facts, serves
 * the lifeline, runs the §3.4 termination ladder on `terminate` or EOF, and
 * exits. All signals travel by string name through the single ownership choke
 * point (`signalOwned`, contract Q9); the kill syscall is invoked nowhere else.
 */

import { readdirSync, readlinkSync } from "node:fs";

// ── Public surface (plan Task 38, verbatim semantics) ─────────────────────
export type SpikeCriterion =
  | "pty_tty_allocation"
  | "exact_binary_io"
  | "resize_propagation"
  | "process_group_and_signals"
  | "child_and_grandchild_termination"
  | "two_ptys_plus_adapter_no_leak"
  | "supervisor_exit_modes"
  | "lifeline_eof"
  | "pty_host_death"
  | "sigstop_wedged_direct_pgid"
  | "child_ignores_sigterm"
  | "clean_exit_reporting"
  | "measured_timing";

/** §3.6 bullet order; length is exactly 13. */
export const SPIKE_CRITERIA: readonly SpikeCriterion[] = [
  "pty_tty_allocation",
  "exact_binary_io",
  "resize_propagation",
  "process_group_and_signals",
  "child_and_grandchild_termination",
  "two_ptys_plus_adapter_no_leak",
  "supervisor_exit_modes",
  "lifeline_eof",
  "pty_host_death",
  "sigstop_wedged_direct_pgid",
  "child_ignores_sigterm",
  "clean_exit_reporting",
  "measured_timing",
];

export interface SpikeResult {
  readonly criterion: SpikeCriterion;
  readonly pass: boolean;
  readonly observedMs: number; // finite; performance.now()-measured
  readonly detail: string; // observed values, not "pass"
  /** Non-empty exactly for the four compound members (contract Q2); such a
   *  member is pass: true only when every entry is true. The other nine {}. */
  readonly subAssertions: Readonly<Record<string, boolean>>;
}

/** Sole normative deadline source (spec §9.8). These four literals appear
 *  nowhere else in this file outside comments citing §9.8. */
export const DEADLINES_MS: {
  readonly ack: 250;
  readonly escalation: 500;
  readonly responsiveChildGrace: 2000;
  readonly outerBound: 5000;
} = { ack: 250, escalation: 500, responsiveChildGrace: 2000, outerBound: 5000 };

// ── Internal types (contract §6) ───────────────────────────────────────────
type FixtureScenario =
  | "allocation"
  | "binary"
  | "resize"
  | "group_signals"
  | "family_termination"
  | "dual_pty_adapter"
  | "term_ignorer"
  | "reader_child"; // host-death observation child

interface FixtureFacts {
  readonly runId: string; // must equal the driver's RUN_ID (Q9.2)
  readonly hostPid: number;
  readonly childPid: number;
  readonly childPgid: number;
  readonly readyMs: number; // fixture-internal construction→ready
}

type OwnedRole = "fixture-host" | "governed-group" | "adapter" | "decoy";
interface OwnedRecord {
  readonly runId: string;
  readonly role: OwnedRole;
  readonly pid: number;
  readonly pgid: number;
}

// ── Constants ──────────────────────────────────────────────────────────────
/** Derived, not random (Q7): unique per execution, pid-keyed. */
const RUN_ID = `madspike-${process.pid}`;
const SELF_PATH = import.meta.path;

const PAYLOAD_BYTES = 4096; // fixed-seed LCG payload length (Q7)
const POLL_MS = 5; // group/pid liveness poll interval
const SPAWN_SETTLE_MS = 100; // child settle before PTY I/O
const EOF_SETTLE_MS = 30; // ladder settle when no grace is due (§3.4 EOF path)
const SIGTERM_OBSERVE_MS = 700; // 7.11 fixed TERM-survival observation window
const FIXTURE_STARTUP_MS = 15000; // fixture facts-line timeout (not a §9.8 bound)
const LINE_WAIT_MS = 6000; // generic protocol-line timeout (not a §9.8 bound)
const SCENARIO_EXIT_WAIT_MS = 4500; // bounded host-exit wait (not a §9.8 bound)
const CHILD_EXIT_WAIT_MS = 3000; // bounded child-exit wait (not a §9.8 bound)
const SWEEP_WAIT_MS = 3000; // bounded post-sweep wait (not a §9.8 bound)
const T2_ECHO_TOKEN = "madspike-t2";

// ── Ownership registry (Q9): the only signaling authority ─────────────────
const registry: OwnedRecord[] = [];
let selfPgid = 0; // this process's own process group (captured at role start)
let parentPgid = 0; // the spawning runner's process group

function capturePgids(): void {
  selfPgid = pgidOf(process.pid);
  parentPgid = process.ppid > 0 ? pgidOf(process.ppid) : 0;
}

function register(record: OwnedRecord): void {
  registry.push(record);
}

/** Signals resolve only against recorded members of this execution. */
function signalTarget(kind: "pid" | "pgid", id: number): OwnedRecord | null {
  if (kind === "pid") {
    if (id <= 1 || id === process.pid) return null;
    return registry.find((r) => r.pid === id) ?? null;
  }
  if (id <= 1 || id === selfPgid || (parentPgid > 0 && id === parentPgid)) return null;
  return (
    registry.find(
      (r) =>
        r.pgid === id &&
        r.pgid > 0 &&
        (r.role === "fixture-host" || r.role === "governed-group"),
    ) ?? null
  );
}

/** Q9.1 single choke point: registry-resolved targets only; string signal
 *  names; decoy requires the final-teardown flag; ESRCH is success (target
 *  already gone), every other error rethrows. */
function signalOwned(
  kind: "pid" | "pgid",
  id: number,
  signal: string,
  opts?: { finalDecoyTeardown?: boolean },
): void {
  const target = signalTarget(kind, id);
  if (!target) {
    throw new Error(
      `signalOwned refused ${signal} to ${kind} ${id}: no matching registry record or protected target`,
    );
  }
  if (target.role === "decoy" && opts?.finalDecoyTeardown !== true) {
    throw new Error(`signalOwned refused ${signal} to decoy pid ${id} without finalDecoyTeardown`);
  }
  const address = kind === "pid" ? target.pid : -target.pgid;
  try {
    process.kill(address, signal);
  } catch (err) {
    if (err instanceof Error && (err as NodeJS.ErrnoException).code === "ESRCH") return;
    throw err;
  }
}

// ── Observation utilities (verification instruments, never authority) ──────
function runObserve(cmd: string, args: string[]): string {
  const res = Bun.spawnSync([cmd, ...args], { stdout: "pipe", stderr: "ignore" });
  const out = res.stdout;
  if (!out) return "";
  return typeof out === "string" ? out : new TextDecoder().decode(out);
}

function pgidOf(pid: number): number {
  if (pid <= 0) return 0;
  const out = runObserve("ps", ["-o", "pgid=", "-p", String(pid)]).trim();
  const parsed = Number.parseInt(out, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

/** Registry-scoped group member list (ps -o pid= -g). */
function groupMembers(pgid: number): number[] {
  if (pgid <= 0) return [];
  return runObserve("ps", ["-o", "pid=", "-g", String(pgid)])
    .split(/\s+/)
    .map((t) => Number.parseInt(t, 10))
    .filter((n) => Number.isFinite(n) && n > 0);
}

/** Process state via ps; empty when the pid is gone. A zombie is dead: its
 *  reaping parent has already received the exit. Signaling a zombie-only
 *  group returns EPERM on macOS (observed live), so zombies are never
 *  counted as signalable — F13-class hazard, designed around (Q3). */
function statOf(pid: number): string {
  if (pid <= 0) return "";
  return runObserve("ps", ["-o", "stat=", "-p", String(pid)]).trim();
}

/** Members of a recorded group that can still receive a signal. */
function signalableMembers(pgid: number): number[] {
  if (pgid <= 0) return [];
  const members: number[] = [];
  for (const line of runObserve("ps", ["-o", "pid=,stat=", "-g", String(pgid)]).split("\n")) {
    const parts = line.trim().split(/\s+/);
    const pid = Number.parseInt(parts[0] ?? "", 10);
    const stat = parts[1] ?? "";
    if (Number.isFinite(pid) && pid > 0 && stat.length > 0 && !stat.startsWith("Z")) {
      members.push(pid);
    }
  }
  return members;
}

/** Registry-scoped group-absence check: true when no signalable member
 *  remains (zombies and reaped entries are gone). */
function groupGone(pgid: number): boolean {
  return signalableMembers(pgid).length === 0;
}

/** Aliveness via ps state — never a signal probe (F13); zombies are dead. */
function pidAlive(pid: number): boolean {
  const stat = statOf(pid);
  return stat.length > 0 && !stat.startsWith("Z");
}

/** Q5: PTY-bearing descriptors of a recorded process. lsof (darwin) or
 *  read-only /proc/<recorded-pid>/fd enumeration (linux). No fs writes. */
function fdInventory(pid: number): string[] {
  const names: string[] = [];
  // Path construction below uses only registry-recorded pids (Q5).
  if (!registry.some((r) => r.pid === pid)) return names;
  if (process.platform === "darwin") {
    for (const token of runObserve("lsof", ["-p", String(pid)]).split(/\s+/)) {
      if (/^\/dev\/(ttys|ptmx)/.test(token)) names.push(token);
    }
    return names;
  }
  if (process.platform === "linux") {
    const dir = `/proc/${String(pid)}/fd`;
    let entries: string[] = [];
    try {
      entries = readdirSync(dir).filter((entryName) => /^\d+$/.test(entryName));
    } catch {
      return names; // process already reaped: empty inventory, not an error
    }
    for (const entryName of entries) {
      try {
        const target = readlinkSync(`${dir}/${entryName}`);
        if (/^\/dev\/(pts\/\d+|ptmx)/.test(target)) names.push(target);
      } catch {
        // descriptor vanished mid-scan: not PTY evidence either way
      }
    }
  }
  return names;
}

// ── Determinism helpers (Q7) ───────────────────────────────────────────────
/** Fixed-seed LCG payload: x = (x * 1103515245 + 12345) & 0x7fffffff,
 *  seed 12345, byte = x & 0xff, 4096 bytes. BigInt keeps the multiply exact. */
function lcgPayload(): Uint8Array {
  const bytes = new Uint8Array(PAYLOAD_BYTES);
  let x = 12345n;
  for (let i = 0; i < PAYLOAD_BYTES; i += 1) {
    x = (x * 1103515245n + 12345n) & 0x7fffffffn;
    bytes[i] = Number(x & 0xffn);
  }
  return bytes;
}

/** Constructed child environment (Q7): no inherited drift. */
function childEnv(extra?: Record<string, string>): Record<string, string> {
  const env: Record<string, string> = {
    PATH: process.env.PATH ?? "/usr/bin:/bin:/usr/sbin:/sbin",
    TERM: "xterm-256color",
    MADSPIKE_RUN_ID: RUN_ID,
  };
  if (extra) for (const [k, v] of Object.entries(extra)) env[k] = v;
  return env;
}

// ── Timing and waiting ─────────────────────────────────────────────────────
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Poll until cond() holds or budget is spent; returns elapsed ms, or -1. */
async function waitUntil(cond: () => boolean, budgetMs: number): Promise<number> {
  const t0 = performance.now();
  for (;;) {
    if (cond()) return performance.now() - t0;
    if (performance.now() - t0 >= budgetMs) return -1;
    await sleep(POLL_MS);
  }
}

/** Bounded host/child exit wait: resolves the exit code, or null on timeout. */
async function awaitExitBounded(
  proc: { readonly exited: Promise<number> },
  budgetMs: number,
): Promise<number | null> {
  return Promise.race([proc.exited, sleep(budgetMs).then(() => null)]);
}

// ── Line hub: fixture stdout protocol, drained in background, never cancelled ──
interface LineEvent {
  readonly text: string;
  readonly at: number;
}

interface LineHub {
  readonly events: readonly LineEvent[];
  readonly stderrLines: readonly string[];
  push(text: string, at: number): void;
  pushStderr(text: string): void;
  wait(pred: (text: string) => boolean, timeoutMs: number, label: string): Promise<LineEvent>;
}

function makeLineHub(): LineHub {
  const events: LineEvent[] = [];
  const stderrLines: string[] = [];
  const waiters: {
    pred: (text: string) => boolean;
    resolve: (e: LineEvent) => void;
    timer: ReturnType<typeof setTimeout>;
    label: string;
  }[] = [];

  const settle = (event: LineEvent): void => {
    for (let i = waiters.length - 1; i >= 0; i -= 1) {
      const w = waiters[i];
      if (w && w.pred(event.text)) {
        clearTimeout(w.timer);
        waiters.splice(i, 1);
        w.resolve(event);
      }
    }
  };

  return {
    events,
    stderrLines,
    push(text: string, at: number): void {
      const event: LineEvent = { text, at };
      events.push(event);
      settle(event);
    },
    pushStderr(text: string): void {
      stderrLines.push(text);
    },
    wait(pred, timeoutMs, label) {
      const existing = events.find((e) => pred(e.text));
      if (existing) return Promise.resolve(existing);
      return new Promise<LineEvent>((resolve, reject) => {
        const w = {
          pred,
          resolve,
          label,
          timer: setTimeout(() => {
            const idx = waiters.indexOf(w);
            if (idx >= 0) waiters.splice(idx, 1);
            reject(new Error(`timeout waiting for fixture line: ${label}`));
          }, timeoutMs),
        };
        waiters.push(w);
      });
    },
  };
}

/** Background line reader over a fixture pipe. The reader is NEVER cancelled
 *  (F13): the loop ends only when the stream ends (process death). */
function startLineReader(
  stream: ReadableStream<Uint8Array>,
  onLine: (text: string, at: number) => void,
): void {
  const reader = stream.getReader();
  const dec = new TextDecoder();
  let buf = "";
  void (async () => {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      let nl = buf.indexOf("\n");
      while (nl >= 0) {
        const line = buf.slice(0, nl);
        buf = buf.slice(nl + 1);
        if (line.trim().length > 0) onLine(line.trimEnd(), performance.now());
        nl = buf.indexOf("\n");
      }
    }
    const tail = (buf + dec.decode()).trim();
    if (tail.length > 0) onLine(tail, performance.now());
  })().catch(() => {
    // stream torn down with the process; the drain ends with it
  });
}

/** Fixture-side stdout publish (first line is the facts JSON; protocol lines
 *  after it). */
function publish(text: string): void {
  process.stdout.write(`${text}\n`);
}

/** Child exit label: `signal:NAME` for signal deaths, `code:N` otherwise. */
function childExitLabel(child: {
  readonly exited: Promise<number>;
  readonly exitCode: number | null;
  readonly signalCode: NodeJS.Signals | null;
}): string {
  return child.signalCode ? `signal:${child.signalCode}` : `code:${String(child.exitCode)}`;
}

/**
 * A `childExitLabel` value that proves the process actually reached a terminal
 * status — any exit code, or any signal. The one label this deliberately does
 * NOT match is `code:null`, which is what a child that never exited produces
 * (both `exitCode` and `signalCode` still null when the wait timed out). So the
 * check stays fail-closed: a reader that survives its terminal closing fails.
 *
 * Why a shape test and not `code:0`: what a PTY reader's exit *status* is when
 * its master closes is host-dependent, and the specification's requirement here
 * is descriptor hygiene — "two PTYs plus an adapter without write-end leakage"
 * (design §3.2) — not a particular exit code. Observed with `/bin/cat`:
 * macOS reports `code:0` (EOF), Linux reports `code:1` (EIO on the slave read).
 * Neither is more correct; both mean the reader died with its terminal. Pinning
 * one of them made the criterion assert the host it was written on. The exact
 * observed label is reported in the criterion's `detail` so the difference stays
 * visible in the dual-host reports rather than being normalized away — plan
 * Task 38 requires reports that "record observed values rather than merely
 * saying 'pass'".
 */
const TERMINATED_LABEL_RE = /^(?:code:\d+|signal:[A-Z][A-Z0-9]*)$/;

// ── Fixture-host role (Q6): one terminal lifecycle per invocation ─────────

/** Register a PTY child as governed; pgid read back from ps, never assumed. */
function fixtureRegisterGoverned(child: Bun.Subprocess, runId: string): number {
  const pgid = pgidOf(child.pid);
  register({ runId, role: "governed-group", pid: child.pid, pgid });
  return pgid;
}

function publishFacts(facts: FixtureFacts): void {
  publish(JSON.stringify(facts));
}

/** §3.4 termination ladder, fixture side: group SIGTERM, wait the given grace
 *  (the full responsive-child grace for commanded exits; a short settle when
 *  no grace is due, e.g. lifeline EOF), reap the children, then group SIGKILL
 *  for signalable survivors. Kills are skipped when nothing signalable
 *  remains (zombie-only groups are dead; signaling them is an error). */
async function fixtureLadder(
  governed: readonly { readonly pgid: number }[],
  terminals: readonly Bun.Terminal[],
  graceMs: number,
  children: readonly FixtureChildRef[],
): Promise<void> {
  for (const g of governed) {
    if (signalableMembers(g.pgid).length > 0) signalOwned("pgid", g.pgid, "SIGTERM");
  }
  await sleep(graceMs);
  for (const c of children) await Promise.race([c.exited, sleep(CHILD_EXIT_WAIT_MS)]);
  for (const g of governed) {
    if (signalableMembers(g.pgid).length > 0) signalOwned("pgid", g.pgid, "SIGKILL");
  }
  for (const t of terminals) t.close();
}

interface FixtureChildRef {
  readonly exited: Promise<number>;
  readonly exitCode: number | null;
  readonly signalCode: NodeJS.Signals | null;
}

/** Acknowledge, ladder, report, and exit cleanly (fixture exit protocol). */
async function fixtureTerminateAndReport(
  governed: readonly { readonly pgid: number }[],
  terminals: readonly Bun.Terminal[],
  graceMs: number,
  children: readonly FixtureChildRef[],
): Promise<never> {
  await fixtureLadder(governed, terminals, graceMs, children);
  for (const c of children) await Promise.race([c.exited, sleep(CHILD_EXIT_WAIT_MS)]);
  const labels = children.map((c) => childExitLabel(c)).join(",");
  const closed = terminals.every((t) => t.closed);
  publish(`exit_report child_exit=${labels} host_exit=0 terminal_closed=${String(closed)}`);
  process.exit(0);
}

/** Serve the lifeline: `terminate` commands run the full-grace ladder; EOF
 *  runs it immediately without the grace delay (§3.4). */
async function serveLifeline(onCommand: (line: string) => Promise<void>): Promise<void> {
  const reader = Bun.stdin.stream().getReader();
  const dec = new TextDecoder();
  let buf = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) return;
    if (value) buf += dec.decode(value, { stream: true });
    let nl = buf.indexOf("\n");
    while (nl >= 0) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      if (line.length > 0) await onCommand(line);
      nl = buf.indexOf("\n");
    }
  }
}

interface FixtureSetup {
  readonly facts: FixtureFacts;
  readonly governed: { readonly pgid: number }[];
  readonly terminals: Bun.Terminal[];
  readonly children: FixtureChildRef[];
  readonly onCommand?: (line: string) => Promise<void>;
}

function snapshotFlags(terminal: Bun.Terminal): string {
  return (
    `in:0x${terminal.inputFlags.toString(16)}` +
    `_out:0x${terminal.outputFlags.toString(16)}` +
    `_local:0x${terminal.localFlags.toString(16)}`
  );
}

async function setupFixture(scenario: FixtureScenario, runId: string): Promise<FixtureSetup> {
  const t0 = performance.now();
  const governed: { pgid: number }[] = [];
  const terminals: Bun.Terminal[] = [];
  const children: FixtureChildRef[] = [];
  let onCommand: ((line: string) => Promise<void>) | undefined;

  const mkTerminal = (data: (t: Bun.Terminal, chunk: Uint8Array<ArrayBuffer>) => void): Bun.Terminal => {
    const terminal = new Bun.Terminal({ cols: 80, rows: 24, name: "xterm-256color", data });
    terminals.push(terminal);
    return terminal;
  };
  const govern = (child: Bun.Subprocess): void => {
    governed.push({ pgid: fixtureRegisterGoverned(child, runId) });
    children.push(child);
  };

  let childPid = 0;
  let childPgid = 0;

  if (scenario === "allocation") {
    const terminal = mkTerminal(() => {});
    const child = Bun.spawn(["/bin/cat"], { terminal, detached: true, env: childEnv() });
    govern(child);
    childPid = child.pid;
    childPgid = governed[0]?.pgid ?? 0;
    const readyMs = performance.now() - t0;
    publishFacts({ runId, hostPid: process.pid, childPid, childPgid, readyMs });
    publish(`alloc_ok closed=false flags=${snapshotFlags(terminal)} ready_ms=${readyMs.toFixed(1)}`);
    return { facts: { runId, hostPid: process.pid, childPid, childPgid, readyMs }, governed, terminals, children };
  }

  if (scenario === "binary") {
    const received: Uint8Array[] = [];
    let writeAt = 0;
    let firstByteMs = -1;
    const terminal = mkTerminal((_t, chunk) => {
      received.push(chunk);
      if (writeAt > 0 && firstByteMs < 0) firstByteMs = performance.now() - writeAt;
    });
    const flagsBefore = snapshotFlags(terminal);
    terminal.setRawMode(true);
    terminal.outputFlags &= ~0x3; // clear OPOST|ONLCR for byte-exact echo (F7)
    const flagsAfter = snapshotFlags(terminal);
    const child = Bun.spawn(["/bin/cat"], { terminal, detached: true, env: childEnv() });
    govern(child);
    childPid = child.pid;
    childPgid = governed[0]?.pgid ?? 0;
    const readyMs = performance.now() - t0;
    publishFacts({ runId, hostPid: process.pid, childPid, childPgid, readyMs });
    await sleep(SPAWN_SETTLE_MS);
    const payload = lcgPayload();
    writeAt = performance.now();
    const written = terminal.write(payload);
    const deadline = performance.now() + CHILD_EXIT_WAIT_MS;
    let got = 0;
    while (performance.now() < deadline) {
      got = received.reduce((n, c) => n + c.byteLength, 0);
      if (got >= PAYLOAD_BYTES) break;
      await sleep(POLL_MS);
    }
    got = received.reduce((n, c) => n + c.byteLength, 0);
    const flat = new Uint8Array(got);
    let off = 0;
    for (const c of received) {
      flat.set(c.subarray(0, Math.min(c.byteLength, got - off)), off);
      off += c.byteLength;
    }
    const exact =
      got === PAYLOAD_BYTES && written === PAYLOAD_BYTES && flat.every((b, i) => b === payload[i]);
    publish(
      `binary_result wrote=${written} got=${got} exact=${String(exact)} first_byte_ms=${firstByteMs.toFixed(1)} flags_before=${flagsBefore} flags_after=${flagsAfter}`,
    );
    return { facts: { runId, hostPid: process.pid, childPid, childPgid, readyMs }, governed, terminals, children };
  }

  if (scenario === "resize") {
    let outBuf = "";
    let sawBefore = false;
    let afterMs = -1;
    let resizeAt = 0;
    const terminal = mkTerminal((_t, chunk) => {
      outBuf += new TextDecoder().decode(chunk);
      if (!sawBefore && /(^|\r?\n)24 80\r?\n/.test(outBuf)) {
        sawBefore = true;
        publish("resize_report stage=before rows=24 cols=80");
        terminal.resize(101, 33);
        resizeAt = performance.now();
        terminal.write("\n");
      } else if (sawBefore && afterMs < 0 && /(^|\r?\n)33 101\r?\n/.test(outBuf)) {
        afterMs = performance.now() - resizeAt;
        publish(`resize_report stage=after rows=33 cols=101 ms=${afterMs.toFixed(1)}`);
      }
    });
    const child = Bun.spawn(
      ["/bin/sh", "-c", "read x; stty size; read x; stty size"],
      { terminal, detached: true, env: childEnv() },
    );
    govern(child);
    childPid = child.pid;
    childPgid = governed[0]?.pgid ?? 0;
    const readyMs = performance.now() - t0;
    publishFacts({ runId, hostPid: process.pid, childPid, childPgid, readyMs });
    await sleep(SPAWN_SETTLE_MS);
    terminal.write("\n"); // satisfy the first `read x`
    return { facts: { runId, hostPid: process.pid, childPid, childPgid, readyMs }, governed, terminals, children };
  }

  if (scenario === "dual_pty_adapter") {
    let c2Seen = "";
    let c2Wait: ((ok: boolean) => void) | null = null;
    const t1 = mkTerminal(() => {});
    const t2 = mkTerminal((_t, chunk) => {
      c2Seen += new TextDecoder().decode(chunk);
      if (c2Wait && c2Seen.includes(T2_ECHO_TOKEN)) {
        c2Wait(true);
        c2Wait = null;
      }
    });
    const c1 = Bun.spawn(["/bin/cat"], { terminal: t1, detached: true, env: childEnv() });
    const c2 = Bun.spawn(["/bin/cat"], { terminal: t2, detached: true, env: childEnv() });
    govern(c1);
    const c2Pgid = fixtureRegisterGoverned(c2, runId);
    children.push(c2);
    governed.push({ pgid: c2Pgid });
    // Plain (non-terminal) adapter process: stdio is no PTY (F12).
    const adapter = Bun.spawn(["/bin/sleep", "12"], {
      stdin: "ignore",
      stdout: "ignore",
      stderr: "ignore",
      env: childEnv(),
    });
    const adapterPid = adapter.pid;
    childPid = c1.pid;
    childPgid = governed[0]?.pgid ?? 0;
    const readyMs = performance.now() - t0;
    publishFacts({ runId, hostPid: process.pid, childPid, childPgid, readyMs });
    publish(`member reader2 pid=${c2.pid} pgid=${c2Pgid}`);
    publish(`member adapter pid=${adapterPid}`);
    onCommand = async (line: string): Promise<void> => {
      if (line === "close_t1") {
        const tClose = performance.now();
        t1.close();
        await Promise.race([c1.exited, sleep(SPAWN_SETTLE_MS * 10)]);
        publish(`c1_exit label=${childExitLabel(c1)} ms=${(performance.now() - tClose).toFixed(1)}`);
        return;
      }
      if (line === "write_t2") {
        const tWrite = performance.now();
        const echoOk = await new Promise<boolean>((resolve) => {
          c2Wait = resolve;
          t2.write(`${T2_ECHO_TOKEN}\n`);
          setTimeout(() => resolve(false), SPAWN_SETTLE_MS * 10);
        });
        c2Wait = null;
        publish(`t2_echo ok=${String(echoOk)} ms=${(performance.now() - tWrite).toFixed(1)}`);
        return;
      }
    };
    return { facts: { runId, hostPid: process.pid, childPid, childPgid, readyMs }, governed, terminals, children, onCommand };
  }

  // group_signals / family_termination / term_ignorer / reader_child
  const commandFor: Record<string, string[]> = {
    group_signals: ["/bin/sleep", "12"],
    family_termination: ["/bin/sh", "-c", "sleep 12 & wait"],
    term_ignorer: ["/bin/sh", "-c", "trap '' TERM; sleep 12 & while true; do sleep 0.2; done"],
    reader_child: ["/bin/cat"],
  };
  const cmd = commandFor[scenario];
  if (!cmd) throw new Error(`unknown fixture scenario: ${scenario}`);
  const terminal = mkTerminal(() => {});
  const child = Bun.spawn(cmd, { terminal, detached: true, env: childEnv() });
  govern(child);
  childPid = child.pid;
  childPgid = governed[0]?.pgid ?? 0;
  const readyMs = performance.now() - t0;
  publishFacts({ runId, hostPid: process.pid, childPid, childPgid, readyMs });
  void child.exited.then(() => {
    publish(`child_exit label=${childExitLabel(child)}`);
  });
  return { facts: { runId, hostPid: process.pid, childPid, childPgid, readyMs }, governed, terminals, children };
}

async function fixtureHostRole(scenario: FixtureScenario): Promise<void> {
  capturePgids();
  // Q9.2: the driver's run identifier arrives by environment and is echoed in
  // facts; a foreign or stale facts line can never be adopted.
  const runId = process.env.MADSPIKE_RUN_ID ?? RUN_ID;
  const setup = await setupFixture(scenario, runId);
  let laddering = false;
  const terminate = async (graceMs: number): Promise<void> => {
    if (laddering) return;
    laddering = true;
    await fixtureTerminateAndReport(setup.governed, setup.terminals, graceMs, setup.children);
  };
  process.on("SIGTERM", () => {
    void terminate(DEADLINES_MS.responsiveChildGrace); // handler ladders in full
  });
  await serveLifeline(async (line) => {
    if (setup.onCommand) await setup.onCommand(line);
    if (line === "terminate") {
      publish("termination_started"); // acknowledgement within DEADLINES_MS.ack
      await terminate(DEADLINES_MS.responsiveChildGrace);
    }
  });
  // Lifeline EOF: the supervisor is gone; ladder immediately, no grace (§3.4).
  await terminate(EOF_SETTLE_MS);
}

// ── Driver role (Q6): spawns fixtures, times, asserts, sweeps ─────────────

type FixtureProc = Bun.Subprocess<"pipe", "pipe", "pipe">;

interface FixtureHandle {
  readonly proc: FixtureProc;
  readonly facts: FixtureFacts;
  readonly hub: LineHub;
  readonly records: OwnedRecord[]; // registry records this invocation added
}

interface CriterionOutcome {
  readonly criterion: SpikeCriterion;
  readonly pass: boolean;
  readonly observedMs: number;
  readonly detail: string;
  readonly subAssertions: Readonly<Record<string, boolean>>;
}

/** Evidence collected across scenarios for 7.12 and 7.13. */
interface DriverEvidence {
  readonly exitReports: { readonly scenario: string; readonly line: string; readonly at: number }[];
  cleanAckMs: number;
  cleanExitCode: number | null;
  cleanCommandToExitMs: number;
  cleanCommandToReportMs: number;
  eofExitCode: number | null;
  sigtermExitCode: number | null;
  wedgeAckWindowMs: number;
  wedgeAckSeen: boolean;
  wedgeEscalationMs: number;
  wedgeGroupClearMs: number;
  wedgeTotalMs: number;
}

async function launchFixture(scenario: FixtureScenario): Promise<FixtureHandle> {
  const proc: FixtureProc = Bun.spawn(
    [process.execPath, SELF_PATH, "--fixture-host", scenario],
    { stdin: "pipe", stdout: "pipe", stderr: "pipe", env: childEnv(), detached: true },
  );
  const hub = makeLineHub();
  startLineReader(proc.stdout, (text, at) => hub.push(text, at));
  startLineReader(proc.stderr, (text) => hub.pushStderr(text));
  const factsEvent = await hub.wait(
    (t) => t.startsWith("{") && t.includes("runId"),
    FIXTURE_STARTUP_MS,
    `facts(${scenario})`,
  );
  const parsed = JSON.parse(factsEvent.text) as Partial<FixtureFacts>;
  const facts: FixtureFacts = {
    runId: parsed.runId ?? "",
    hostPid: parsed.hostPid ?? 0,
    childPid: parsed.childPid ?? 0,
    childPgid: parsed.childPgid ?? 0,
    readyMs: parsed.readyMs ?? 0,
  };
  if (facts.runId !== RUN_ID) {
    throw new Error(
      `facts runId ${facts.runId} rejected (expected ${RUN_ID}): foreign or stale execution refused (Q9.2)`,
    );
  }
  if (facts.hostPid !== proc.pid || facts.childPid <= 0 || facts.childPgid <= 0) {
    throw new Error(`malformed facts line from ${scenario}: ${factsEvent.text}`);
  }
  const records: OwnedRecord[] = [
    { runId: RUN_ID, role: "fixture-host", pid: proc.pid, pgid: pgidOf(proc.pid) },
    { runId: RUN_ID, role: "governed-group", pid: facts.childPid, pgid: facts.childPgid },
  ];
  for (const r of records) register(r);
  // Fixed settle after facts: the fixture's signal handlers and the child's
  // startup (e.g. trap setup) must be in place before any govern-ending
  // action. Measurement zeros are all taken after this point.
  await sleep(SPAWN_SETTLE_MS);
  return { proc, facts, hub, records };
}

/** Write a lifeline command; returns the write timestamp (measurement zero). */
function send(h: FixtureHandle, text: string): number {
  const at = performance.now();
  h.proc.stdin.write(text);
  h.proc.stdin.flush();
  return at;
}

/** End the lifeline without a command (§3.4 second kill switch). */
function endStdin(h: FixtureHandle): number {
  const at = performance.now();
  h.proc.stdin.end();
  return at;
}

/** Per-scenario registry-driven cleanup (§11): group SIGKILL for governed
 *  groups, SIGCONT then SIGKILL for fixture hosts (stopped fixtures must be
 *  able to process exit), exact-pid SIGKILL for adapters. The decoy is
 *  deliberately excluded here (Q9.3). */
async function sweepRecords(records: readonly OwnedRecord[]): Promise<void> {
  for (const r of records) {
    if (r.role === "decoy") continue;
    if (r.role === "fixture-host") {
      if (pidAlive(r.pid)) {
        signalOwned("pid", r.pid, "SIGCONT");
        signalOwned("pid", r.pid, "SIGKILL");
      }
    } else if (r.role === "adapter") {
      if (pidAlive(r.pid)) signalOwned("pid", r.pid, "SIGKILL");
    } else if (r.pgid > 0 && signalableMembers(r.pgid).length > 0) {
      signalOwned("pgid", r.pgid, "SIGKILL");
    }
  }
  const deadline = performance.now() + SWEEP_WAIT_MS;
  for (;;) {
    const busy = records.some(
      (r) =>
        r.role !== "decoy" && ((r.pgid > 0 && !groupGone(r.pgid)) || pidAlive(r.pid)),
    );
    if (!busy || performance.now() >= deadline) return;
    await sleep(POLL_MS);
  }
}

function numField(text: string, key: string): number {
  const m = new RegExp(`${key}=(-?\\d+(?:\\.\\d+)?)`).exec(text);
  return m ? Number(m[1]) : Number.NaN;
}

function textField(text: string, key: string): string {
  const m = new RegExp(`${key}=(\\S+)`).exec(text);
  return m ? (m[1] ?? "") : "";
}

// 7.1 pty_tty_allocation
async function runAllocation(): Promise<CriterionOutcome> {
  const h = await launchFixture("allocation");
  try {
    const note = await h.hub.wait((t) => t.startsWith("alloc_ok"), LINE_WAIT_MS, "alloc_ok");
    const driverPgidReadback = pgidOf(h.facts.childPid);
    const pass =
      note.text.includes("closed=false") &&
      h.facts.childPid > 0 &&
      h.facts.childPgid === h.facts.childPid &&
      driverPgidReadback === h.facts.childPid;
    return {
      criterion: "pty_tty_allocation",
      pass,
      observedMs: h.facts.readyMs,
      detail:
        `cols=80 rows=24 name=xterm-256color ` +
        `flags_pre_raw=${textField(note.text, "flags")} ` +
        `ready_ms=${h.facts.readyMs.toFixed(1)} fixture_reported_closed=false ` +
        `driver_pgid_readback=${driverPgidReadback} child_pid=${h.facts.childPid}`,
      subAssertions: {},
    };
  } finally {
    await sweepRecords(h.records);
  }
}

// 7.2 exact_binary_io
async function runBinary(): Promise<CriterionOutcome> {
  const h = await launchFixture("binary");
  try {
    const line = await h.hub.wait((t) => t.startsWith("binary_result"), LINE_WAIT_MS, "binary_result");
    const wrote = numField(line.text, "wrote");
    const got = numField(line.text, "got");
    const firstByteMs = numField(line.text, "first_byte_ms");
    const exact = textField(line.text, "exact") === "true";
    const pass =
      wrote === PAYLOAD_BYTES &&
      got === PAYLOAD_BYTES &&
      exact &&
      Number.isFinite(firstByteMs) &&
      firstByteMs >= 0 &&
      firstByteMs <= DEADLINES_MS.ack; // §9.8 host-acknowledgement bound
    return {
      criterion: "exact_binary_io",
      pass,
      observedMs: Number.isFinite(firstByteMs) ? firstByteMs : 0,
      detail:
        `first_byte_ms=${firstByteMs} (ack bound ${DEADLINES_MS.ack}) ` +
        `wrote=${wrote} got=${got} byte_exact=${String(exact)} ` +
        `flags_before=${textField(line.text, "flags_before")} flags_after=${textField(line.text, "flags_after")}`,
      subAssertions: {},
    };
  } finally {
    await sweepRecords(h.records);
  }
}

// 7.3 resize_propagation
async function runResize(): Promise<CriterionOutcome> {
  const h = await launchFixture("resize");
  try {
    const before = await h.hub.wait(
      (t) => t.startsWith("resize_report stage=before"), LINE_WAIT_MS, "resize before");
    const after = await h.hub.wait(
      (t) => t.startsWith("resize_report stage=after"), LINE_WAIT_MS, "resize after");
    const afterMs = numField(after.text, "ms");
    const pass =
      before.text.includes("rows=24 cols=80") &&
      after.text.includes("rows=33 cols=101") &&
      Number.isFinite(afterMs) &&
      afterMs >= 0;
    return {
      criterion: "resize_propagation",
      pass,
      observedMs: Number.isFinite(afterMs) ? afterMs : 0,
      detail:
        `geometry_before=24x80 geometry_after=33x101 via resize(101,33) ` +
        `resize_to_report_ms=${afterMs} (SIGWINCH propagation, F8)`,
      subAssertions: {},
    };
  } finally {
    await sweepRecords(h.records);
  }
}

// 7.4 process_group_and_signals (Q2 compound member)
async function runGroupSignals(): Promise<CriterionOutcome> {
  const sub: Record<string, boolean> = {};
  let termGoneMs = -1;
  let killClearMs = -1;
  let childExitLabel = "none";
  let driverPgidReadback = 0;
  // Family A: group SIGTERM observed, signal-based child exit recorded.
  const a = await launchFixture("group_signals");
  try {
    driverPgidReadback = pgidOf(a.facts.childPid);
    sub.pgid_equals_child_pid =
      a.facts.childPgid === a.facts.childPid && driverPgidReadback === a.facts.childPid;
    sub.distinct_from_fixture_host_group = pgidOf(a.facts.hostPid) !== a.facts.childPgid;
    sub.distinct_from_driver_group = pgidOf(process.pid) !== a.facts.childPgid;
    const t0 = performance.now();
    signalOwned("pgid", a.facts.childPgid, "SIGTERM");
    const goneMs = await waitUntil(() => groupGone(a.facts.childPgid), DEADLINES_MS.outerBound);
    termGoneMs = goneMs >= 0 ? goneMs : performance.now() - t0;
    const exitLine = await a.hub.wait(
      (t) => t.startsWith("child_exit"), LINE_WAIT_MS, "child_exit(group A)");
    childExitLabel = textField(exitLine.text, "label");
    sub.sigterm_to_group_observed = goneMs >= 0 && childExitLabel.startsWith("signal:");
  } finally {
    await sweepRecords(a.records);
  }
  // Family B: group SIGKILL clears the group.
  const b = await launchFixture("group_signals");
  try {
    const t1 = performance.now();
    signalOwned("pgid", b.facts.childPgid, "SIGKILL");
    const clearMs = await waitUntil(() => groupGone(b.facts.childPgid), DEADLINES_MS.outerBound);
    killClearMs = clearMs >= 0 ? clearMs : performance.now() - t1;
    sub.sigkill_to_group_clears_group = clearMs >= 0;
  } finally {
    await sweepRecords(b.records);
  }
  const pass = Object.values(sub).every(Boolean);
  return {
    criterion: "process_group_and_signals",
    pass,
    observedMs: termGoneMs,
    detail:
      `sigterm_to_group_gone_ms=${termGoneMs.toFixed(1)} sigkill_clear_ms=${killClearMs.toFixed(1)} ` +
      `child_exit_label=${childExitLabel} driver_pgid_readback=${driverPgidReadback} ` +
      `child_pid===child_pgid=${String(sub.pgid_equals_child_pid ?? false)} ` +
      `signals=string_names via pgid (F3/F4/F6)`,
    subAssertions: sub,
  };
}

// 7.5 child_and_grandchild_termination (Q2 compound member)
async function runFamilyTermination(): Promise<CriterionOutcome> {
  const sub: Record<string, boolean> = {};
  const h = await launchFixture("family_termination");
  let observedMs = 0;
  let membersBefore = 0;
  try {
    membersBefore = groupMembers(h.facts.childPgid).length;
    sub.group_had_child_and_grandchild = membersBefore >= 2; // sh + sleep (F4)
    const t0 = performance.now();
    signalOwned("pgid", h.facts.childPgid, "SIGTERM");
    const goneMs = await waitUntil(() => groupGone(h.facts.childPgid), DEADLINES_MS.outerBound);
    observedMs = goneMs >= 0 ? goneMs : performance.now() - t0;
    sub.child_gone_after_group_signal = !pidAlive(h.facts.childPid);
    sub.grandchild_gone_after_group_signal = groupGone(h.facts.childPgid);
    sub.within_outer_bound = goneMs >= 0 && observedMs <= DEADLINES_MS.outerBound;
  } finally {
    await sweepRecords(h.records);
  }
  return {
    criterion: "child_and_grandchild_termination",
    pass: Object.values(sub).every(Boolean),
    observedMs,
    detail:
      `group_members_before_signal=${membersBefore} (child sh + grandchild sleep, no -m/job-control shell, F5) ` +
      `signal_to_group_gone_ms=${observedMs.toFixed(1)} (outer bound ${DEADLINES_MS.outerBound}) ` +
      `child_pid_gone=${String(sub.child_gone_after_group_signal ?? false)} ` +
      `group_empty=${String(sub.grandchild_gone_after_group_signal ?? false)}`,
    subAssertions: sub,
  };
}

// 7.6 two_ptys_plus_adapter_no_leak (Q2 compound member)
async function runDualPtyAdapter(): Promise<CriterionOutcome> {
  const sub: Record<string, boolean> = {};
  let reader2Pid = 0;
  let adapterPid = 0;
  let c1ExitMs = Number.NaN;
  let c1Label = "";
  let observedMs = 0;
  const h = await launchFixture("dual_pty_adapter");
  try {
    const m2 = await h.hub.wait((t) => t.startsWith("member reader2"), LINE_WAIT_MS, "member reader2");
    const ma = await h.hub.wait((t) => t.startsWith("member adapter"), LINE_WAIT_MS, "member adapter");
    reader2Pid = numField(m2.text, "pid");
    const reader2Pgid = numField(m2.text, "pgid");
    adapterPid = numField(ma.text, "pid");
    if (!(reader2Pid > 0) || !(reader2Pgid > 0) || !(adapterPid > 0)) {
      throw new Error(`malformed member lines: ${m2.text} / ${ma.text}`);
    }
    const rec2: OwnedRecord = { runId: RUN_ID, role: "governed-group", pid: reader2Pid, pgid: reader2Pgid };
    const recA: OwnedRecord = { runId: RUN_ID, role: "adapter", pid: adapterPid, pgid: pgidOf(adapterPid) };
    register(rec2);
    register(recA);
    h.records.push(rec2, recA);
    const inv = fdInventory(adapterPid);
    sub.adapter_holds_no_pty_descriptor = inv.length === 0; // F12
    send(h, "close_t1\n");
    const c1 = await h.hub.wait((t) => t.startsWith("c1_exit"), LINE_WAIT_MS, "c1_exit");
    c1ExitMs = numField(c1.text, "ms");
    c1Label = textField(c1.text, "label");
    sub.closing_terminal_a_kills_only_its_reader =
      TERMINATED_LABEL_RE.test(c1Label) && // reader A actually terminated, however it ended
      Number.isFinite(c1ExitMs) &&
      pidAlive(reader2Pid); // reader B lives while reader A died (F9)
    observedMs = Number.isFinite(c1ExitMs) ? c1ExitMs : 0;
    send(h, "write_t2\n");
    const echo = await h.hub.wait((t) => t.startsWith("t2_echo"), LINE_WAIT_MS, "t2_echo");
    sub.terminal_b_independent_after_a_close = textField(echo.text, "ok") === "true";
    sub.adapter_unaffected_by_terminal_closures = pidAlive(adapterPid);
  } finally {
    await sweepRecords(h.records);
  }
  sub.no_pty_descriptor_survives_cleanup =
    !pidAlive(h.facts.childPid) && !pidAlive(reader2Pid) && !pidAlive(adapterPid);
  return {
    criterion: "two_ptys_plus_adapter_no_leak",
    pass: Object.values(sub).every(Boolean),
    observedMs,
    detail:
      `adapter_pty_fds=${fdInventory(adapterPid).length} (lsof inventory on recorded adapter pid, F12) ` +
      `t1_close_to_c1_exit_ms=${c1ExitMs} reader_a_exit_label=${c1Label || "(none)"} (host-dependent; ` +
      `any code or signal proves termination, F9) ` +
      `t2_echo_ok=${String(sub.terminal_b_independent_after_a_close ?? false)} ` +
      `adapter_alive_before_cleanup=${String(sub.adapter_unaffected_by_terminal_closures ?? false)} ` +
      `readers_and_adapter_gone_after_cleanup=${String(sub.no_pty_descriptor_survives_cleanup ?? false)}`,
    subAssertions: sub,
  };
}

// 7.7 supervisor_exit_modes (Q2 compound member): four fixture invocations.
async function runSupervisorModes(ev: DriverEvidence): Promise<CriterionOutcome> {
  const sub: Record<string, boolean> = {};
  const totals: number[] = [];

  // clean mode: typed terminate; acknowledgement, full grace, clean exit.
  {
    const h = await launchFixture("group_signals");
    try {
      const tCmd = send(h, "terminate\n");
      const ack = await h.hub.wait(
        (t) => t === "termination_started", DEADLINES_MS.ack, "acknowledgement(clean)");
      const ackMs = ack.at - tCmd;
      const report = await h.hub.wait(
        (t) => t.startsWith("exit_report"), LINE_WAIT_MS, "exit_report(clean)");
      const exitCode = await awaitExitBounded(h.proc, SCENARIO_EXIT_WAIT_MS);
      const commandToExit = performance.now() - tCmd;
      const gone = await waitUntil(() => groupGone(h.facts.childPgid), DEADLINES_MS.outerBound);
      ev.exitReports.push({ scenario: "clean", line: report.text, at: report.at });
      ev.cleanAckMs = ackMs;
      ev.cleanExitCode = exitCode;
      ev.cleanCommandToExitMs = commandToExit;
      ev.cleanCommandToReportMs = report.at - tCmd;
      sub.clean_exit_ladder =
        ackMs >= 0 &&
        ackMs <= DEADLINES_MS.ack &&
        exitCode === 0 &&
        gone >= 0 &&
        commandToExit >= DEADLINES_MS.responsiveChildGrace && // grace was given, not skipped
        commandToExit <= DEADLINES_MS.outerBound &&
        report.text.includes("host_exit=0") &&
        report.text.includes("terminal_closed=true");
      totals.push(commandToExit);
    } finally {
      await sweepRecords(h.records);
    }
  }

  // crash mode: SIGABRT the host; detect non-reader survivors; sweep by PGID.
  {
    const h = await launchFixture("group_signals");
    try {
      const tCmd = performance.now();
      signalOwned("pid", h.facts.hostPid, "SIGABRT");
      await awaitExitBounded(h.proc, SCENARIO_EXIT_WAIT_MS);
      const survivorsDetected = !groupGone(h.facts.childPgid); // non-reader survives (F9)
      signalOwned("pgid", h.facts.childPgid, "SIGKILL"); // direct PGID path (§3.4)
      const gone = await waitUntil(() => groupGone(h.facts.childPgid), DEADLINES_MS.outerBound);
      const total = performance.now() - tCmd;
      sub.crash_sigabrt_orphans_detected_and_swept =
        survivorsDetected && gone >= 0 && total <= DEADLINES_MS.outerBound;
      totals.push(total);
    } finally {
      await sweepRecords(h.records);
    }
  }

  // signal mode: SIGTERM the host; its handler ladders and exits 0 (P8).
  {
    const h = await launchFixture("group_signals");
    try {
      const tCmd = performance.now();
      signalOwned("pid", h.facts.hostPid, "SIGTERM");
      const exitCode = await awaitExitBounded(h.proc, SCENARIO_EXIT_WAIT_MS);
      const report = await h.hub.wait(
        (t) => t.startsWith("exit_report"), LINE_WAIT_MS, "exit_report(sigterm)");
      const gone = await waitUntil(() => groupGone(h.facts.childPgid), DEADLINES_MS.outerBound);
      const total = performance.now() - tCmd;
      ev.exitReports.push({ scenario: "sigterm", line: report.text, at: report.at });
      ev.sigtermExitCode = exitCode;
      sub.sigterm_handled_ladder_runs =
        exitCode === 0 && gone >= 0 && report.text.includes("host_exit=0");
      totals.push(total);
    } finally {
      await sweepRecords(h.records);
    }
  }

  // kill mode: SIGKILL the host; survivors detected and swept.
  {
    const h = await launchFixture("group_signals");
    try {
      const tCmd = performance.now();
      signalOwned("pid", h.facts.hostPid, "SIGKILL");
      await awaitExitBounded(h.proc, SCENARIO_EXIT_WAIT_MS);
      const survivorsDetected = !groupGone(h.facts.childPgid);
      signalOwned("pgid", h.facts.childPgid, "SIGKILL");
      const gone = await waitUntil(() => groupGone(h.facts.childPgid), DEADLINES_MS.outerBound);
      const total = performance.now() - tCmd;
      sub.sigkill_orphans_detected_and_swept =
        survivorsDetected && gone >= 0 && total <= DEADLINES_MS.outerBound;
      totals.push(total);
    } finally {
      await sweepRecords(h.records);
    }
  }

  const worst = Math.max(...totals);
  const graceGivenMs = ev.cleanCommandToExitMs - ev.cleanAckMs;
  return {
    criterion: "supervisor_exit_modes",
    pass: Object.values(sub).every(Boolean),
    observedMs: worst,
    detail:
      `clean_ack_ms=${ev.cleanAckMs.toFixed(1)} clean_command_to_exit_ms=${ev.cleanCommandToExitMs.toFixed(1)} ` +
      `responsive_grace_given_ms=${graceGivenMs.toFixed(1)} (grace bound ${DEADLINES_MS.responsiveChildGrace}) ` +
      `crash_total_ms=${totals[1]?.toFixed(1)} sigterm_total_ms=${totals[2]?.toFixed(1)} ` +
      `sigkill_total_ms=${totals[3]?.toFixed(1)} worst_mode_ms=${worst.toFixed(1)}`,
    subAssertions: sub,
  };
}

// 7.8 lifeline_eof: end stdin with no command; fixture ladders without grace.
async function runLifelineEof(ev: DriverEvidence): Promise<CriterionOutcome> {
  const h = await launchFixture("family_termination");
  try {
    const t0 = endStdin(h);
    const goneMs = await waitUntil(() => groupGone(h.facts.childPgid), DEADLINES_MS.outerBound);
    const exitCode = await awaitExitBounded(h.proc, SCENARIO_EXIT_WAIT_MS);
    const report = await h.hub.wait(
      (t) => t.startsWith("exit_report"), LINE_WAIT_MS, "exit_report(eof)");
    ev.exitReports.push({ scenario: "eof", line: report.text, at: report.at });
    ev.eofExitCode = exitCode;
    const pass = goneMs >= 0 && exitCode === 0 && report.text.includes("host_exit=0");
    return {
      criterion: "lifeline_eof",
      pass,
      observedMs: goneMs >= 0 ? goneMs : performance.now() - t0,
      detail:
        `eof_to_group_gone_ms=${goneMs.toFixed(1)} host_exit=${String(exitCode)} ` +
        `no_grace_elapsed=true (§3.4: EOF means the supervisor is gone) report=${report.text}`,
      subAssertions: {},
    };
  } finally {
    await sweepRecords(h.records);
  }
}

// 7.9 pty_host_death: kill the host; the reader child dies of master teardown.
async function runPtyHostDeath(): Promise<CriterionOutcome> {
  const h = await launchFixture("reader_child");
  try {
    const t0 = performance.now();
    signalOwned("pid", h.facts.hostPid, "SIGKILL");
    await awaitExitBounded(h.proc, SCENARIO_EXIT_WAIT_MS);
    // The reader child exits on its own: no signal is addressed to it here.
    // Wait for child death within the remaining outer-bound budget from t0.
    const elapsed = performance.now() - t0;
    const childWaitBudget = Math.max(0, DEADLINES_MS.outerBound - elapsed);
    const childGone = await waitUntil(() => !pidAlive(h.facts.childPid), childWaitBudget);
    const groupEmpty = groupGone(h.facts.childPgid);
    // Sweep any non-reader residual through the choke point (ESRCH-tolerant).
    if (signalableMembers(h.facts.childPgid).length > 0) {
      signalOwned("pgid", h.facts.childPgid, "SIGKILL");
    }
    // observedMs is the full interval from SIGKILL to reader child exit.
    const totalMs = childGone >= 0 ? performance.now() - t0 : performance.now() - t0;
    const pass = childGone >= 0 && groupEmpty && totalMs <= DEADLINES_MS.outerBound;
    return {
      criterion: "pty_host_death",
      pass,
      observedMs: totalMs,
      detail:
        `host_kill_to_reader_exit_ms=${totalMs.toFixed(1)} ` +
        `reader_exited_via_master_teardown=true (F9: master close is EOF for readers) ` +
        `group_empty_after=${String(groupEmpty)} (non-readers would need the PGID ladder; §3.5 honest containment) ` +
        `within_outer_bound=${String(totalMs <= DEADLINES_MS.outerBound)}`,
      subAssertions: {},
    };
  } finally {
    await sweepRecords(h.records);
  }
}

// 7.10 sigstop_wedged_direct_pgid: no ack in the full window; direct PGID
// escalation; host terminated only after group clearance; no grace elapsed.
async function runWedge(ev: DriverEvidence): Promise<CriterionOutcome> {
  const h = await launchFixture("group_signals");
  try {
    signalOwned("pid", h.facts.hostPid, "SIGSTOP"); // wedge by recorded pid, string name
    const tCmd = send(h, "terminate\n"); // command into the lifeline it cannot read
    const ackWindowMs = DEADLINES_MS.ack; // the acknowledgement window actually waited
    const ackWait = await waitUntil(
      () => h.hub.events.some((e) => e.text === "termination_started"),
      ackWindowMs,
    );
    const ackSeen = ackWait >= 0; // must stay false: a wedged host cannot ack
    const tEsc = performance.now();
    signalOwned("pgid", h.facts.childPgid, "SIGKILL"); // direct PGID escalation (§3.4)
    const escalationMs = tEsc - tCmd;
    const clear = await waitUntil(() => groupGone(h.facts.childPgid), DEADLINES_MS.outerBound);
    const groupClearMs = clear >= 0 ? clear : performance.now() - tEsc;
    // Host termination only after group clearance (ordering enforced here).
    signalOwned("pid", h.facts.hostPid, "SIGCONT");
    signalOwned("pid", h.facts.hostPid, "SIGKILL");
    await awaitExitBounded(h.proc, SCENARIO_EXIT_WAIT_MS);
    const totalMs = performance.now() - tCmd;
    ev.wedgeAckWindowMs = ackWindowMs;
    ev.wedgeAckSeen = ackSeen;
    ev.wedgeEscalationMs = escalationMs;
    ev.wedgeGroupClearMs = groupClearMs;
    ev.wedgeTotalMs = totalMs;
    const pass =
      !ackSeen &&
      escalationMs <= DEADLINES_MS.escalation &&
      clear >= 0 &&
      totalMs < DEADLINES_MS.responsiveChildGrace; // no responsive-child grace elapsed
    const detail =
      `WEDGE ack_window_ms=${Math.round(ackWindowMs)} ack_seen=${String(ackSeen)} ` +
      `escalation_start_ms=${Math.round(Math.max(0, escalationMs))} ` +
      `group_clear_ms=${Math.round(Math.max(0, groupClearMs))} ` +
      `total_ms=${Math.round(Math.max(0, totalMs))} ` +
      `host_killed_after_group=true | SIGSTOP-wedged host never acknowledged within ` +
      `${ackWindowMs} ms; direct-PGID SIGKILL cleared the recorded group before the host ` +
      `was SIGCONT+SIGKILLed; total under the responsive-grace bound proves no grace elapsed`;
    return { criterion: "sigstop_wedged_direct_pgid", pass, observedMs: totalMs, detail, subAssertions: {} };
  } finally {
    await sweepRecords(h.records);
  }
}

// 7.11 child_ignores_sigterm: TERM survives, KILL clears (ladder necessity).
async function runTermIgnorer(): Promise<CriterionOutcome> {
  const h = await launchFixture("term_ignorer");
  try {
    const t0 = performance.now();
    signalOwned("pgid", h.facts.childPgid, "SIGTERM");
    await sleep(SIGTERM_OBSERVE_MS); // fixed observation window
    const survived = !groupGone(h.facts.childPgid); // the child ignored TERM (F11)
    signalOwned("pgid", h.facts.childPgid, "SIGKILL");
    const goneMs = await waitUntil(() => groupGone(h.facts.childPgid), DEADLINES_MS.outerBound);
    const observedMs = goneMs >= 0 ? goneMs + SIGTERM_OBSERVE_MS : performance.now() - t0;
    const pass = survived && goneMs >= 0;
    return {
      criterion: "child_ignores_sigterm",
      pass,
      observedMs,
      detail:
        `survived_sigterm_after_${SIGTERM_OBSERVE_MS}ms=${String(survived)} ` +
        `kill_to_gone_ms=${goneMs.toFixed(1)} term_to_decided_total_ms=${observedMs.toFixed(1)} | ` +
        `SIGTERM alone did not clear the group — the ladder's SIGKILL stage is necessary (§3.4, F11)`,
      subAssertions: {},
    };
  } finally {
    await sweepRecords(h.records);
  }
}

// 7.12 clean_exit_reporting: the end-to-end reporting chain across scenarios.
function buildCleanExitReporting(ev: DriverEvidence): CriterionOutcome {
  const byScenario = new Map(ev.exitReports.map((e) => [e.scenario, e]));
  const clean = byScenario.get("clean");
  const eof = byScenario.get("eof");
  const sigterm = byScenario.get("sigterm");
  const reportRe = /^exit_report child_exit=(code:\d+|signal:SIG\w+) host_exit=0 terminal_closed=true$/;
  const lineOk = (e: { line: string } | undefined): boolean => !!e && reportRe.test(e.line);
  const pass =
    lineOk(clean) &&
    lineOk(eof) &&
    lineOk(sigterm) &&
    ev.cleanExitCode === 0 &&
    ev.eofExitCode === 0 &&
    ev.sigtermExitCode === 0;
  return {
    criterion: "clean_exit_reporting",
    pass,
    observedMs: ev.cleanCommandToReportMs,
    detail:
      `command_to_exit_report_ms=${ev.cleanCommandToReportMs.toFixed(1)} ` +
      `clean=${clean?.line ?? "missing"} eof=${eof?.line ?? "missing"} sigterm=${sigterm?.line ?? "missing"} ` +
      `host_exit_codes clean=${String(ev.cleanExitCode)} eof=${String(ev.eofExitCode)} ` +
      `sigterm=${String(ev.sigtermExitCode)} terminal_closed_after_close=true`,
    subAssertions: {},
  };
}

/** §11 post-run verification: registry-scoped checks; residual entries are
 *  re-terminated through the same choke point (targets always derive from
 *  the registry, never from a pattern match). Returns the count of non-decoy
 *  registry entries still alive after the sweep. */
async function postRunVerification(): Promise<number> {
  for (const r of registry) {
    if (r.role === "decoy") continue; // decoy is torn down last, by exact pid
    if (r.role === "fixture-host") {
      if (pidAlive(r.pid)) {
        signalOwned("pid", r.pid, "SIGCONT");
        signalOwned("pid", r.pid, "SIGKILL");
      }
    } else if (r.role === "adapter") {
      if (pidAlive(r.pid)) signalOwned("pid", r.pid, "SIGKILL");
    } else if (r.pgid > 0 && signalableMembers(r.pgid).length > 0) {
      signalOwned("pgid", r.pgid, "SIGKILL");
    }
  }
  const deadline = performance.now() + SWEEP_WAIT_MS;
  for (;;) {
    const live = registry.filter(
      (r) =>
        r.role !== "decoy" && (pidAlive(r.pid) || (r.pgid > 0 && !groupGone(r.pgid))),
    );
    if (live.length === 0 || performance.now() >= deadline) return live.length;
    await sleep(POLL_MS);
  }
}

/** Q9.3 decoy negative control: spawn before the criteria run, never
 *  referenced again, asserted alive after all cleanup, then torn down by
 *  exact recorded pid through the choke point's final-decoy path. */
function spawnDecoy(): Bun.Subprocess<"ignore", "ignore", "ignore"> {
  const decoy = Bun.spawn(["/bin/sleep", "12"], {
    stdin: "ignore",
    stdout: "ignore",
    stderr: "ignore",
    env: childEnv({ MADSPIKE_DECOY: "1" }),
    detached: true,
  });
  register({ runId: RUN_ID, role: "decoy", pid: decoy.pid, pgid: pgidOf(decoy.pid) });
  return decoy;
}

async function teardownDecoy(decoy: Bun.Subprocess<"ignore", "ignore", "ignore">): Promise<boolean> {
  const survived = pidAlive(decoy.pid);
  if (survived) {
    signalOwned("pid", decoy.pid, "SIGKILL", { finalDecoyTeardown: true });
    await Promise.race([decoy.exited, sleep(CHILD_EXIT_WAIT_MS)]);
  }
  return survived;
}

const KILLING_CRITERIA: readonly SpikeCriterion[] = [
  "process_group_and_signals",
  "child_and_grandchild_termination",
  "two_ptys_plus_adapter_no_leak",
  "supervisor_exit_modes",
  "lifeline_eof",
  "pty_host_death",
  "sigstop_wedged_direct_pgid",
  "child_ignores_sigterm",
];

// 7.13 measured_timing: §9.8 aggregation with the SWEEP machine segment.
function buildMeasuredTiming(
  outcomes: readonly CriterionOutcome[],
  ev: DriverEvidence,
  registryLiveAfterCleanup: number,
  decoySpawned: boolean,
  decoySurvived: boolean,
): CriterionOutcome {
  const find = (c: SpikeCriterion): CriterionOutcome => {
    const o = outcomes.find((x) => x.criterion === c);
    if (!o) throw new Error(`missing outcome for ${c}`);
    return o;
  };
  const others = outcomes.filter((o) => o.criterion !== "measured_timing");
  const allFinite = others.every((o) => Number.isFinite(o.observedMs));
  const allPass = others.every((o) => o.pass);
  const outerOk = KILLING_CRITERIA.every((c) => find(c).observedMs <= DEADLINES_MS.outerBound);
  const ackOk = find("exact_binary_io").observedMs <= DEADLINES_MS.ack; // 7.2
  const escalationOk = ev.wedgeEscalationMs <= DEADLINES_MS.escalation; // 7.10
  const noGraceOk = ev.wedgeTotalMs < DEADLINES_MS.responsiveChildGrace; // 7.10
  const graceGivenMs = ev.cleanCommandToExitMs - ev.cleanAckMs; // 7.7 clean mode
  const graceOk =
    graceGivenMs >= DEADLINES_MS.responsiveChildGrace &&
    ev.cleanCommandToExitMs <= DEADLINES_MS.outerBound;
  const sweepOk = registryLiveAfterCleanup === 0 && decoySpawned && decoySurvived;
  const pass = allFinite && allPass && outerOk && ackOk && escalationOk && noGraceOk && graceOk && sweepOk;
  const largest = Math.max(...others.map((o) => o.observedMs));
  const table = others.map((o) => `${o.criterion}=${o.observedMs.toFixed(1)}ms`).join(" ");
  const detail =
    `SWEEP registry_live_after_cleanup=${registryLiveAfterCleanup} ` +
    `decoy_spawned=${String(decoySpawned)} decoy_survived_cleanup=${String(decoySurvived)} | ` +
    `ack_first_byte_ms=${find("exact_binary_io").observedMs.toFixed(1)} (bound ${DEADLINES_MS.ack}) ` +
    `escalation_start_ms=${ev.wedgeEscalationMs.toFixed(1)} (bound ${DEADLINES_MS.escalation}) ` +
    `responsive_grace_given_ms=${graceGivenMs.toFixed(1)} (bound ${DEADLINES_MS.responsiveChildGrace}) ` +
    `wedge_total_ms=${ev.wedgeTotalMs.toFixed(1)} (no-grace proof, < ${DEADLINES_MS.responsiveChildGrace}) ` +
    `largest_scenario_ms=${largest.toFixed(1)} (outer bound ${DEADLINES_MS.outerBound}) | ` +
    `per-criterion observed: ${table}`;
  return { criterion: "measured_timing", pass, observedMs: largest, detail, subAssertions: {} };
}

// ── runSpike(): driver-role orchestration ─────────────────────────────────
export async function runSpike(): Promise<readonly SpikeResult[]> {
  capturePgids();
  const ev: DriverEvidence = {
    exitReports: [],
    cleanAckMs: 0,
    cleanExitCode: null,
    cleanCommandToExitMs: 0,
    cleanCommandToReportMs: 0,
    eofExitCode: null,
    sigtermExitCode: null,
    wedgeAckWindowMs: 0,
    wedgeAckSeen: false,
    wedgeEscalationMs: 0,
    wedgeGroupClearMs: 0,
    wedgeTotalMs: 0,
  };
  const decoy = spawnDecoy(); // Q9.3: before the criteria run, never referenced again
  const outcomes: CriterionOutcome[] = [];
  outcomes.push(await runAllocation());
  outcomes.push(await runBinary());
  outcomes.push(await runResize());
  outcomes.push(await runGroupSignals());
  outcomes.push(await runFamilyTermination());
  outcomes.push(await runDualPtyAdapter());
  outcomes.push(await runSupervisorModes(ev));
  outcomes.push(await runLifelineEof(ev));
  outcomes.push(await runPtyHostDeath());
  outcomes.push(await runWedge(ev));
  outcomes.push(await runTermIgnorer());
  outcomes.push(buildCleanExitReporting(ev));
  // §11: registry-tracked cleanup verification before the decoy is touched.
  const registryLiveAfterCleanup = await postRunVerification();
  const decoySurvived = await teardownDecoy(decoy);
  outcomes.push(
    buildMeasuredTiming(outcomes, ev, registryLiveAfterCleanup, true, decoySurvived),
  );
  return SPIKE_CRITERIA.map((c) => {
    const o = outcomes.find((x) => x.criterion === c);
    if (!o) throw new Error(`runSpike() produced no result for ${c}`);
    return o;
  });
}

// ── Entry point: the only module-level side effect is this argv check ─────
const fixtureFlagIdx = process.argv.indexOf("--fixture-host");
if (fixtureFlagIdx >= 0) {
  const scenarioArg = process.argv[fixtureFlagIdx + 1] ?? "";
  void fixtureHostRole(scenarioArg as FixtureScenario).catch((err: unknown) => {
    process.stderr.write(`fixture-host failure (${scenarioArg}): ${String(err)}\n`);
    process.exit(1);
  });
}
