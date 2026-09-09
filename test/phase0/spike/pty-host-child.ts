/**
 * Room Runtime Phase 0 — fixture pty-host-role child (isolated spike; never
 * imported by production).
 *
 * Implements the frozen parent-death contract (r4 §7.4 Table 7, AT-R4-02 /
 * AT-R4-03) as real processes:
 *
 *  - opens the control FIFO READ end (Gateway holds the write end);
 *  - spawns the agent in its OWN session (detached spawn = session leader,
 *    recording {pid, pgid, starttime});
 *  - blocks on a real read of the control pipe; Gateway death (SIGKILL of
 *    the Gateway) closes the write end → EOF → M19 ladder against the
 *    recorded agent PGID (identity re-checked via starttime) → self-reap
 *    exit;
 *  - never adopts an unknown PID;
 *  - the agent's fd inventory is audited for control-pipe/lock/socket
 *    leaks (r4.1 §6.1 / AT-R4-36).
 *
 * Bun-runtime fixture, matching the `test/phase3a/spike/` precedent.
 */

import {
  openSync,
  readSync,
  closeSync,
  writeSync,
  fsyncSync,
} from "node:fs";
import { spawn, execFileSync } from "node:child_process";

function emit(fact: Record<string, unknown>): void {
  process.stdout.write(`${JSON.stringify(fact)}\n`);
}

const controlFifo = process.env.PHASE0_CONTROL_FIFO ?? "";
const agentCommand = process.env.PHASE0_AGENT_COMMAND ?? "";
const factsPath = process.env.PHASE0_FACTS_PATH ?? "";

if (controlFifo === "" || agentCommand === "" || factsPath === "") {
  emit({ phase: "error", message: "missing env" });
  process.exit(1);
}

function startTimeOf(pid: number): string {
  try {
    return execFileSync("ps", ["-p", String(pid), "-o", "lstart="], {
      encoding: "utf8",
    }).trim();
  } catch {
    return "";
  }
}

/** The M19 termination ladder (r4 §7.4). */
async function m19(
  pid: number,
  pgid: number,
  starttime: string,
): Promise<Record<string, unknown>> {
  const alive = (target: number): boolean => {
    try {
      process.kill(target, 0);
      return true;
    } catch (error) {
      return (error as NodeJS.ErrnoException).code === "EPERM";
    }
  };
  // Steps 1–2: recorded identity; re-read live identity. A mismatch on a
  // LIVE process → skip kill, pgid_reuse_detected, FAILED_CLOSED. A process
  // that is already gone needs no kill — that is success, not reuse.
  if (alive(pgid)) {
    const liveStart = startTimeOf(pgid);
    if (liveStart !== starttime) {
      return { phase: "pgid_reuse_detected", skipped_kill: true };
    }
  } else {
    return { phase: "gone_pre_m19" };
  }
  // Step 3: kill(-pgid, SIGTERM).
  try {
    process.kill(-pgid, "SIGTERM");
  } catch (error) {
    return { phase: "sigterm_failed", error: String(error) };
  }
  // Step 4: bounded wait (proposed 3 s at production; the fixture uses a
  // shorter bound to keep the proof's runtime bounded — the ladder's SHAPE
  // is the contract; the duration is a named measurement input).
  await new Promise((r) => setTimeout(r, 500));
  // Gone on SIGTERM is the success outcome. Only a STILL-LIVE process
  // needs the identity re-check before SIGKILL escalation.
  if (!alive(pgid)) {
    return { phase: "gone_on_sigterm" };
  }
  if (startTimeOf(pgid) !== starttime) {
    return { phase: "pgid_reuse_detected", skipped_kill: true };
  }
  try {
    process.kill(-pgid, "SIGKILL");
  } catch (error) {
    return { phase: "sigkill_failed", error: String(error) };
  }
  // Step 6: confirm gone within bound, else FAILED_CLOSED.
  const deadline = Date.now() + 5_000;
  for (;;) {
    if (!alive(pgid)) return { phase: "gone_on_sigkill" };
    if (Date.now() > deadline) return { phase: "FAILED_CLOSED", still_alive: true };
    await new Promise((r) => setTimeout(r, 50));
  }
}

// --- fixture main -----------------------------------------------------------

// Agent spawn: real session isolation (detached spawn = the child becomes
// a session and process-group leader; pgid == pid). The agent command is a
// POSIX shell string; spawn the REAL /bin/sh explicitly (never
// `shell: true`, whose host-side semantics are runtime-specific) so the
// shell — and the grandchild it backgrounds — stay alive in the new
// session until the M19 ladder reaps the group.
const agent = spawn("/bin/sh", ["-c", agentCommand], {
  stdio: "ignore",
  detached: true,
});
// PID-safety micro-correction (Founder authorization 2026-09-05): no
// unknown/zero/non-positive agent PID may enter liveness, lsof, identity,
// pgid, or signal operations. A missing or invalid spawned PID fails the
// fixture closed IMMEDIATELY (same fail-closed principle as the T1–T3
// corrections). There is no PID-zero fallback: kill(0/−0, …) would target
// the fixture's own process group (default process-group signaling) and
// unknown-PID adoption is forbidden by the parent-death contract.
const agentPid = agent.pid;
if (typeof agentPid !== "number" || !Number.isInteger(agentPid) || agentPid <= 0) {
  emit({
    phase: "error",
    message: `agent spawn produced no usable PID (got ${String(agentPid)}); failing closed before any liveness, lsof, identity, pgid, or signal operation`,
  });
  process.exit(1);
}
// pgid == pid model (detached session leader) — derived only AFTER the
// PID validation above.
const agentPgid = agentPid;
const agentStarttime = await new Promise<string>((resolve) => {
  const timer = setTimeout(() => resolve(""), 2_000);
  agent.on("spawn", () => {
    clearTimeout(timer);
    resolve(startTimeOf(agentPid));
  });
});
agent.unref();
emit({
  phase: "agent_spawned",
  agent_pid: agentPid,
  agent_pgid: agentPgid,
  agent_starttime: agentStarttime,
});

// FD-scrub audit (r4.1 §6.1 / AT-R4-36): the agent's fd inventory must
// contain no control-pipe, lock, or IPC socket descriptor.
try {
  const lsof = execFileSync("lsof", ["-p", String(agentPid)], { encoding: "utf8" });
  const leaks = lsof
    .split("\n")
    .filter(
      (line) =>
        line.includes(controlFifo) ||
        line.includes("occupancy.lock") ||
        line.includes("ipc.sock"),
    );
  emit({ phase: "agent_fd_audit", ok: leaks.length === 0, leak_lines: leaks.length });
} catch (error) {
  emit({ phase: "agent_fd_audit", ok: false, error: String(error) });
}

// Persist the recorded identity for the parent test's process-tree audit.
const facts = {
  host_pid: process.pid,
  agent_pid: agentPid,
  agent_pgid: agentPgid,
  agent_starttime: agentStarttime,
};
const factsFd = openSync(factsPath, "w");
writeSync(factsFd, JSON.stringify(facts));
fsyncSync(factsFd);
closeSync(factsFd);
emit({ phase: "facts_written" });

// Control-pipe watch: a blocking read on the FIFO read end returns 0 (EOF)
// only when the Gateway's write end closes — normal exit OR SIGKILL. This
// is the parent-death channel (r4 §7.4).
const controlFd = openSync(controlFifo, "r");
emit({ phase: "control_watch", fd: controlFd });
const buf = Buffer.alloc(1);
const n = readSync(controlFd, buf, 0, 1, null);
if (n === 0) {
  emit({ phase: "control_eof" });
  const outcome = await m19(agentPid, agentPgid, agentStarttime);
  emit(outcome);
  emit({ phase: "self_reap_exit" });
  process.exit(0);
}
// Any byte received is an explicit close command in the fixture protocol.
emit({ phase: "control_byte", byte: buf[0] });
const outcome = await m19(agentPid, agentPgid, agentStarttime);
emit(outcome);
emit({ phase: "self_reap_exit" });
process.exit(0);