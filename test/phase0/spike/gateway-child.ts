/**
 * Room Runtime Phase 0 — fixture Gateway-role child (isolated spike; never
 * imported by production).
 *
 * Stands in for the Gateway process in the parent-death proofs (r4 §7.4 /
 * AT-R4-03): it HOLDS the control-pipe write-end (a real FIFO), spawns a
 * real `pty-host`-role child, and is the SIGKILL target. When this process
 * is SIGKILLed, the kernel closes the FIFO write-end and the pty-host
 * child's blocking read returns EOF — the death signal — after which the
 * pty-host self-reaps the agent process group and exits.
 *
 * The control pipe is Gateway↔pty-host only (r4.1 §6.1): the agent never
 * receives either end.
 *
 * Bun-runtime fixture, matching the `test/phase3a/spike/` precedent.
 */

import { openSync, closeSync } from "node:fs";
import { spawn } from "node:child_process";

function emit(fact: Record<string, unknown>): void {
  process.stdout.write(`${JSON.stringify(fact)}\n`);
}

const ptyHostEntry = process.env.PHASE0_PTY_HOST_ENTRY ?? "";
const controlFifo = process.env.PHASE0_CONTROL_FIFO ?? "";
const agentCommand = process.env.PHASE0_AGENT_COMMAND ?? "";
const factsPath = process.env.PHASE0_FACTS_PATH ?? "";

if (
  ptyHostEntry === "" ||
  controlFifo === "" ||
  agentCommand === "" ||
  factsPath === ""
) {
  emit({ phase: "error", message: "missing env" });
  process.exit(1);
}

// Spawn the pty-host child FIRST. The child opens the FIFO read end, which
// unblocks this process's write-open below — the FIFO rendezvous requires
// both ends open; opening write-first would deadlock (no reader exists
// until the child starts).
const ptyHost = spawn(process.execPath, [ptyHostEntry], {
  env: {
    ...process.env,
    PHASE0_CONTROL_FIFO: controlFifo,
    PHASE0_AGENT_COMMAND: agentCommand,
    PHASE0_FACTS_PATH: factsPath,
  },
  stdio: ["ignore", "inherit", "inherit"],
  detached: false,
});
emit({ phase: "spawned", host_pid: ptyHost.pid });
ptyHost.on("exit", (code, signal) => {
  emit({ phase: "host_exit", code, signal });
});

// Hold the control-pipe WRITE end for this process's lifetime. The open
// blocks until the pty-host opens the read end — a real rendezvous. The
// kernel closes this fd on exit INCLUDING SIGKILL: that closure is the
// parent-death signal (r4 §7.4 Table 7).
const controlWriteFd = openSync(controlFifo, "w");
emit({ phase: "control_write_held", fd: controlWriteFd });

// Hold until killed (SIGKILL from the parent test) or stdin EOF.
process.stdin.resume();
process.stdin.on("end", () => {
  emit({ phase: "gateway_stdin_end" });
  closeSync(controlWriteFd);
  process.exit(0);
});
process.on("SIGTERM", () => {
  emit({ phase: "gateway_sigterm" });
  closeSync(controlWriteFd);
  process.exit(0);
});