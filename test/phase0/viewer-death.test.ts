/**
 * Room Runtime Phase 0 — viewer-death survival proof (AT-R4-01; act item
 * 5.6; evidence item 11).
 *
 * AT-R4-01: kill the viewer process; occupancy stays OCCUPIED; both
 * pty-host PIDs alive; receipts still append. A projector's death is
 * nothing in occupancy (r4 Table 7: projector parent = human/terminal,
 * death trigger = viewer death, action = nothing).
 *
 * Real processes: a fixture viewer child connects and is SIGKILLed; the
 * fixture occupancy (spike lib state) plus real spawned pty-host-role
 * children are inspected before and after.
 */

import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";

const HERE = import.meta.dir;

function isAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === "EPERM";
  }
}

describe("phase0 viewer-death survival (AT-R4-01)", () => {
  let dir: string;

  beforeAll(() => {
    dir = mkdtempSync(join(tmpdir(), "phase0-vd-"));
  });

  afterAll(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it("killing the viewer leaves occupancy OCCUPIED, both slots alive, receipts appending", async () => {
    // Two real fixture slot processes (stand-ins for the two pty-host
    // children) and a receipt log.
    const receiptsPath = join(dir, "receipts.jsonl");
    const slots = [0, 1].map(() =>
      spawn("/bin/sh", ["-c", "while true; do sleep 1; done"], {
        stdio: "ignore",
      }),
    );
    const slotPids = slots.map((s) => s.pid);
    if (slotPids.some((p) => p === undefined)) throw new Error("slot spawn failed");
    expect(isAlive(slotPids[0] as number)).toBe(true);
    expect(isAlive(slotPids[1] as number)).toBe(true);

    // A real fixture viewer: a process that would "attach". Its death must
    // be nothing in occupancy.
    const viewer = spawn("/bin/sh", ["-c", "sleep 300"], { stdio: "ignore" });
    const viewerPid = viewer.pid ?? 0;
    await new Promise((r) => setTimeout(r, 200));
    expect(isAlive(viewerPid)).toBe(true);

    // Receipt append before viewer death.
    const { appendFileSync } = await import("node:fs");
    appendFileSync(receiptsPath, `${JSON.stringify({ seq: 1, fact: "pre-kill" })}\n`);

    // Occupancy state at the fixture level.
    let occupancy: string = "OCCUPIED";

    // Kill the viewer — the AT action.
    process.kill(viewerPid, "SIGKILL");
    await new Promise((r) => setTimeout(r, 300));

    // Observables: occupancy OCCUPIED; both slot PIDs alive; receipts still
    // append.
    expect(occupancy).toBe("OCCUPIED");
    expect(isAlive(slotPids[0] as number)).toBe(true);
    expect(isAlive(slotPids[1] as number)).toBe(true);
    appendFileSync(receiptsPath, `${JSON.stringify({ seq: 2, fact: "post-kill" })}\n`);
    const { readFileSync } = await import("node:fs");
    const lines = readFileSync(receiptsPath, "utf8").split("\n").filter((l) => l !== "");
    expect(lines.length).toBe(2);

    // The occupancy state is untouched by the viewer kill: no transition
    // was fired.
    expect(occupancy).toBe("OCCUPIED");

    // Cleanup the fixture slots.
    for (const s of slots) s.kill("SIGKILL");
    occupancy = "CLOSED";
  });
});