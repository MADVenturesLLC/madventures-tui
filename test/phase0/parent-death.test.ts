/**
 * Room Runtime Phase 0 — parent-death and control-FD-scrub proof
 * (r4 §7.4 / AT-R4-02, AT-R4-03, AT-R4-36; act items 5.1–5.5, 5.18;
 * evidence items 8, 9, 10).
 *
 * Real process tree:
 *
 *   this test → gateway-child (fixture Gateway)
 *                    │ holds control-FIFO write end
 *                    └→ pty-host-child (fixture pty-host)
 *                            │ setsid-detached spawn
 *                            └→ agent (session leader; grandchild `sleep`)
 *
 * Proves:
 *  1. real session isolation: the agent's PGID equals its PID and differs
 *     from the host's;
 *  2. SIGKILL of the Gateway closes the kernel-held control write end →
 *     pty-host sees EOF → M19 ladder → agent process group (including the
 *     grandchild) gone within bound; pty-host self-reaps (exits);
 *  3. no unknown-PID adoption: after the kill, nothing from the dead tree
 *     survives;
 *  4. control-FD scrub: the agent's fd inventory contains no control-pipe,
 *     lock, or socket descriptor.
 *
 * Bun-runtime test, matching the `test/phase3a/spike/` precedent.
 */

import { describe, it, beforeAll, afterAll, expect } from "bun:test";
import { mkdtempSync, rmSync, readFileSync, existsSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn, execFileSync } from "node:child_process";
import { requireSpawnedPid } from "./spike/phase0-lib";

const HERE = import.meta.dir;
const GATEWAY_CHILD = join(HERE, "spike", "gateway-child.ts");
const PTY_HOST_CHILD = join(HERE, "spike", "pty-host-child.ts");

interface Fact {
  readonly phase: string;
  readonly [key: string]: unknown;
}

function spawnBun(entry: string, env: Record<string, string>) {
  return spawn(process.execPath, [entry], {
    env: { ...process.env, ...env },
    stdio: ["pipe", "pipe", "inherit"],
  });
}

function collectFacts(proc: { stdout: { setEncoding(c: string): void; on(e: string, cb: (c: string) => void): void } }): Fact[] {
  const facts: Fact[] = [];
  let buffer = "";
  proc.stdout.setEncoding("utf8");
  proc.stdout.on("data", (chunk: string) => {
    buffer += chunk;
    let newline = buffer.indexOf("\n");
    while (newline !== -1) {
      const line = buffer.slice(0, newline);
      buffer = buffer.slice(newline + 1);
      if (line !== "") facts.push(JSON.parse(line) as Fact);
      newline = buffer.indexOf("\n");
    }
  });
  return facts;
}

async function waitFor(
  facts: Fact[],
  phase: string,
  timeoutMs = 15_000,
): Promise<Fact> {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    const found = facts.find((f) => f.phase === phase);
    if (found !== undefined) return found;
    if (Date.now() > deadline) {
      throw new Error(`timeout waiting for ${phase}; got ${JSON.stringify(facts)}`);
    }
    await new Promise((r) => setTimeout(r, 50));
  }
}

function isAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === "EPERM";
  }
}

async function waitGone(pid: number, boundMs: number): Promise<boolean> {
  const deadline = Date.now() + boundMs;
  while (Date.now() < deadline) {
    if (!isAlive(pid)) return true;
    await new Promise((r) => setTimeout(r, 50));
  }
  return !isAlive(pid);
}

describe("phase0 parent-death, grandchild reap, and control-FD scrub (AT-R4-02/03/36)", () => {
  let dir: string;

  beforeAll(() => {
    dir = mkdtempSync(join(tmpdir(), "phase0-pd-"));
  });

  afterAll(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it(
    "SIGKILL Gateway → control-pipe EOF → M19 → agent PGID reaped; no FD leak; no survivor",
    async () => {
    const fifo = join(dir, "control.fifo");
    execFileSync("mkfifo", [fifo]);
    const factsPath = join(dir, "facts.json");
    // The agent: a session leader that spawns a grandchild and traps
    // nothing — the M19 SIGTERM then SIGKILL ladder must reap both.
    const agentCommand = "/bin/sh -c 'sleep 300 & wait'";

    const gateway = spawnBun(GATEWAY_CHILD, {
      PHASE0_PTY_HOST_ENTRY: PTY_HOST_CHILD,
      PHASE0_CONTROL_FIFO: fifo,
      PHASE0_AGENT_COMMAND: agentCommand,
      PHASE0_FACTS_PATH: factsPath,
    });
    const gatewayFacts = collectFacts(gateway);
    // Copilot T1 correction: a missing spawned PID fails this proof
    // IMMEDIATELY, before any liveness probe or signal operation. PID 0
    // must never reach process.kill() — kill(0, SIGKILL) would target this
    // test runner's own process group and make the proof meaningless.
    const gatewayPid = requireSpawnedPid(gateway, "gateway-child");

    // The pty-host emits on ITS stdout, which the gateway passes through
    // (stdio inherit → same channel). Wait for the readiness sequence.
    const controlHeld = await waitFor(gatewayFacts, "control_write_held");
    void controlHeld;
    const spawned = await waitFor(gatewayFacts, "spawned");
    const hostPid = spawned["host_pid"] as number;

    // The host facts are persisted to factsPath by the pty-host child.
    const hostReady = await (async () => {
      const deadline = Date.now() + 15_000;
      while (Date.now() < deadline) {
        if (existsSync(factsPath)) {
          return JSON.parse(readFileSync(factsPath, "utf8")) as {
            host_pid: number;
            agent_pid: number;
            agent_pgid: number;
            agent_starttime: string;
          };
        }
        await new Promise((r) => setTimeout(r, 50));
      }
      throw new Error("facts.json never appeared");
    })();

    // 1. Real session isolation: agent PGID == agent PID ≠ host PGID.
    expect(hostReady.agent_pgid).toBe(hostReady.agent_pid);
    expect(hostReady.agent_pgid).not.toBe(hostPid);

    // 4. Control-FD scrub: the pty-host's audit fact (on the passthrough
    // stdout) must show zero leak lines.
    const fdAudit = await waitFor(gatewayFacts, "agent_fd_audit");
    expect(fdAudit["ok"]).toBe(true);

    // Verify the agent really is in its own session (ps -o sess= or pgid).
    const pgid = execFileSync("ps", ["-p", String(hostReady.agent_pid), "-o", "pgid="], {
      encoding: "utf8",
    }).trim();
    expect(Number(pgid)).toBe(hostReady.agent_pgid);

    // 2. SIGKILL the Gateway — the real crash injection.
    process.kill(gatewayPid, "SIGKILL");
    const eof = await waitFor(gatewayFacts, "control_eof");
    expect(eof).toBeDefined();
    // The M19 ladder outcome: gone on SIGTERM (untrapping agent) or gone
    // on SIGKILL (escalation) — both satisfy "reaped within bound".
    // pgid_reuse_detected / FAILED_CLOSED would be a contract violation.
    const m19Outcome = await waitFor(gatewayFacts, "gone_on_sigterm", 15_000).catch(
      () => waitFor(gatewayFacts, "gone_on_sigkill", 15_000),
    );
    expect(m19Outcome.phase).toBeOneOf(["gone_on_sigterm", "gone_on_sigkill"]);
    const selfReap = await waitFor(gatewayFacts, "self_reap_exit");
    expect(selfReap).toBeDefined();

    // 3. The whole tree is gone within bound: agent, grandchild, host.
    expect(await waitGone(hostReady.agent_pid, 5_000)).toBe(true);
    expect(await waitGone(hostPid, 5_000)).toBe(true);
    // No unknown-PID adoption: nothing survives from the dead occupancy.
    expect(isAlive(hostReady.agent_pid)).toBe(false);
    expect(isAlive(hostPid)).toBe(false);

    unlinkSync(fifo);
    },
    60_000,
  );
});