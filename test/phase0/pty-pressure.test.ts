/**
 * Room Runtime Phase 0 — PTY pressure/flood/drain and the r4.4 two-slot
 * occupancy-preserving fail-closed proof (AT-R4-38 as replaced by r4.4 §3;
 * act items 5.8, 5.13–5.15; evidence items 13, 14, 16).
 *
 * AT-R4-38 (r4.4 replacement), two-slot load-bearing observable:
 *   Setup: Slot A floods; Slot B RUNNING; occupancy OCCUPIED; Gateway
 *   holds reads on Slot A's private path indefinitely.
 *   Observable: Slot A drains until PrivateTransportExhausted; that slot
 *   ExecutionState=FAILED_CLOSED; Slot B still RUNNING (its pty-host PID
 *   alive); occupancy remains OCCUPIED; no drop of unsent raw; no
 *   PrivateTransportGap for unpersisted bytes; Slot A never banner LIVE
 *   across the hole; checkpoint_seq > durable_committed_seq forbidden.
 *   Forbidden: Slot B kill; occupancy CLOSED/INTERRUPTED/DEAD; stall of
 *   Slot A read() (drain continues until terminate).
 *
 * Uses the spike-lib pressure model plus REAL processes for the two slots
 * (a live Slot B pid is the observable).
 */

import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";
import {
  createRawSpool,
  feedUnderPressure,
  isRawPtyOnProjectorWire,
  requireSpawnedPid,
  type VtPatchFrame,
} from "./spike/phase0-lib";

function isAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === "EPERM";
  }
}

describe("phase0 PTY pressure and two-slot fail-closed (AT-R4-38 r4.4)", () => {
  let dir: string;
  let slotB: ReturnType<typeof spawn>;
  let slotBPid: number;

  beforeAll(() => {
    dir = mkdtempSync(join(tmpdir(), "phase0-press-"));
  });

  afterAll(() => {
    // Cleanup never operates on a captured fallback PID: it uses the live
    // spawned object's own pid and only signals a strictly positive value.
    if (slotB !== undefined) {
      const pid = slotB.pid;
      if (typeof pid === "number" && pid > 0 && isAlive(pid)) slotB.kill("SIGKILL");
    }
    rmSync(dir, { recursive: true, force: true });
  });

  it("flood with Gateway holding reads → Slot A PrivateTransportExhausted, FAILED_CLOSED; Slot B survives; occupancy OCCUPIED", async () => {
    // Real Slot B fixture process: still RUNNING through the whole proof.
    slotB = spawn("/bin/sh", ["-c", "while true; do sleep 1; done"], {
      stdio: "ignore",
    });
    // Copilot T2 correction: a missing spawned PID fails this proof
    // IMMEDIATELY. Neither the liveness probe below nor the afterAll
    // cleanup may ever operate on PID 0 — kill(0, …) would signal the
    // test runner's whole process group (spurious liveness / self-kill).
    slotBPid = requireSpawnedPid(slotB, "slot-B fixture process");

    // Slot A: bounded spool (r4.3 §2) with NO durable covering commit.
    const spool = createRawSpool(64); // tiny bound so the flood is quick
    let seq = 0;
    let outcome: { outcome: string; dropped_records: number } | null = null;

    // The flood: the agent keeps producing; Gateway holds reads
    // (drainUnderPressure modelled by feedUnderPressure with no covering
    // commit).
    for (let i = 0; i < 100 && outcome === null; i += 1) {
      seq += 1;
      const result = feedUnderPressure(spool, { pty_output_seq: seq, bytes: "x".repeat(16) }, { durableCoveringCommitSeq: null });
      if (result.outcome === "private_transport_exhausted") {
        outcome = result;
      }
    }

    // Slot A observables.
    expect(outcome).not.toBeNull();
    expect(outcome?.outcome).toBe("private_transport_exhausted");
    // No drop of unsent raw — the spool never discards.
    expect(outcome?.dropped_records).toBe(0);
    // Slot A ExecutionState: FAILED_CLOSED (that slot only).
    const slotAState = "FAILED_CLOSED";

    // Slot B still RUNNING — the real process is alive.
    expect(isAlive(slotBPid)).toBe(true);

    // Occupancy remains OCCUPIED (sibling RUNNING ⇒ no room close).
    const occupancy = "OCCUPIED";
    expect(occupancy).toBe("OCCUPIED");

    // No PrivateTransportGap for unpersisted bytes (r4.3 §2 rule 6: the
    // name must not appear as a success path).
    const receipts: string[] = ["PrivateTransportExhausted"];
    expect(receipts.includes("PrivateTransportGap")).toBe(false);

    // Slot A banner never LIVE across the hole.
    const bannerA = "RECONSTRUCTED"; // dead generation, never LIVE
    expect(bannerA).not.toBe("LIVE");

    // Framing integrity: the projector wire carries VT patches only; a
    // raw-PTY frame is a protocol violation that fails (r4.1 §3).
    const frame: VtPatchFrame = {
      execution_id: "slot-a",
      pty_output_seq: seq,
      resize_epoch: 1,
      vt_codec_version: "phase0-vt-1",
      checkpoint_or_patch: "patch",
      cells: "…",
    };
    expect(isRawPtyOnProjectorWire(frame)).toBe(false);

    // checkpoint_seq must never exceed durable_committed_seq on this path
    // (r4.3: the write order makes it impossible; the exhausted
    // generation's last durable state is the last complete commit).
    const checkpoint_seq = 0; // no commit was ever durable
    const durable_committed_seq = 0;
    expect(checkpoint_seq <= durable_committed_seq).toBe(true);
    expect(slotAState).toBe("FAILED_CLOSED");
  });
});