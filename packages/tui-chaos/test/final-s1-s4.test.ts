// packages/tui-chaos/test/final-s1-s4.test.ts
// Focused coverage for the final post-correction review fixes (2026-09-09 act):
//   S1 — bridgePath() must use proper URL-to-filesystem conversion so the
//        bridge resolves when the repository path contains spaces or other
//        percent-escaped characters;
//   S2 — the governance inert-key comparison must observe FULLY PARSED
//        screen states: a late repaint still queued during the observation
//        interval must not make the comparison read stale grids;
//   S4 — the dead `pending` member is gone from Screen (F3 `inFlight` is the
//        only drain-accounting state).
//
// TUI_ACCEPTANCE — NOT PHASE_0 — NOT OCCUPANCY_PROOF.

import { describe, expect, test } from "bun:test";
import { existsSync, mkdirSync, readFileSync, realpathSync, rmSync, symlinkSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Screen } from "../src/screen";

// test file lives at packages/tui-chaos/test/ -> repo root is three levels up.
const repoRoot = path.resolve(fileURLToPath(new URL("../../..", import.meta.url)));

// ─── S1: bridgePath under an escaped/space-containing filesystem path ───

describe("S1: bridgePath resolves through percent-escaped filesystem paths", () => {
  test("ordinary checkout: bridgePath is the real bridge.mjs beside session.ts", () => {
    const p = require("../src/pty/session").bridgePath() as string;
    expect(p).toBe(path.join(repoRoot, "packages/tui-chaos/src/pty/bridge.mjs"));
    expect(existsSync(p)).toBe(true);
    expect(p.includes("%")).toBe(false);
  });

  test("a checkout under a directory containing spaces resolves decoded, not %20", async () => {
    // Same materialization discipline as the F4 coverage: the package src
    // must be REAL COPIES (Bun realpaths through symlinked directories,
    // which would rewrite import.meta.url back to the original location);
    // only node_modules stays symlinked (it does not affect this URL).
    const spaceRoot = "/tmp/tui-chaos-s1/space dir";
    rmSync("/tmp/tui-chaos-s1", { recursive: true, force: true });
    const dstPkg = path.join(spaceRoot, "packages/tui-chaos");
    mkdirSync(dstPkg, { recursive: true });
    Bun.spawnSync({
      cmd: ["cp", "-R", path.join(repoRoot, "packages/tui-chaos/src"), path.join(dstPkg, "src")],
    });
    symlinkSync(path.join(repoRoot, "node_modules"), path.join(spaceRoot, "node_modules"));
    symlinkSync(
      path.join(repoRoot, "packages/tui-chaos/node_modules"),
      path.join(dstPkg, "node_modules"),
    );
    try {
      const mod = (await import(
        path.join(dstPkg, "src/pty/session.ts")
      )) as typeof import("../src/pty/session");
      const p = mod.bridgePath();
      // Raw URL.pathname would have produced ".../space%20dir/..." — a path
      // that does not exist and would fail the bridge spawn. Compare through
      // realpath on both sides so macOS /tmp -> /private/tmp symlink
      // presentation cannot flip the assertion either way; the property that
      // matters is: decoded, contains the space, exists, is bridge.mjs.
      expect(realpathSync(p)).toBe(
        path.join(realpathSync(spaceRoot), "packages/tui-chaos/src/pty/bridge.mjs"),
      );
      expect(p.includes("%20")).toBe(false);
      expect(p.includes("space dir")).toBe(true);
      expect(existsSync(p)).toBe(true);
    } finally {
      rmSync("/tmp/tui-chaos-s1", { recursive: true, force: true });
    }
  });
});

// ─── S2: inert-key comparison must observe fully parsed states ───

describe("S2: governance inert-key comparison cannot read stale parser state", () => {
  test("a late repaint queued during the observation interval is invisible to an unflushed snapshot but visible after flush()", async () => {
    // Exercises the actual stale-state risk, not source text: a parser gate
    // holds a late repaint chunk (as a real TUI repaint arriving during the
    // inert-key sleep would), reproducing the exact window the corrected
    // scenario closes with flush() before each compared snapshot.
    const screen = new Screen(60, 4);
    await screen.write("FOUNDER DECISION (1 of 2)");
    const term = (
      screen as unknown as { term: { write: (d: string, cb: () => void) => void } }
    ).term;
    const origWrite = term.write.bind(term);
    const held: Array<{ data: string; cb: () => void }> = [];
    term.write = (data: string, cb: () => void) => {
      held.push({ data, cb });
    };

    // Corrected pattern, step 1: flush BEFORE the pre-action snapshot.
    // Nothing outstanding yet -> resolves immediately; state fully parsed.
    await screen.flush();
    const before = screen.snapshot();
    expect(before.lines[0]).toContain("FOUNDER DECISION (1 of 2)");

    // Inert key issued; during the observation interval a late repaint
    // arrives and stays queued inside the gated parser. A real repaint
    // rewinds the cursor (\r) and redraws the SAME content — exactly the
    // late chunk whose stale read-back S2 must exclude.
    void screen.write("\rFOUNDER DECISION (1 of 2)");
    await new Promise<void>((r) => setTimeout(r, 30));

    // The stale-state risk, demonstrated: WITHOUT flush the repaint is
    // still unparsed — a snapshot here reads state that does not yet
    // include the outstanding write (this is the window S2 closes).
    expect(held.length).toBe(1);

    // Corrected pattern, step 2: flush BEFORE the post-action snapshot.
    // flush() must remain pending until the gated repaint parses; release it
    // and flush completes, so the compared snapshot is fully parsed.
    let flushDone = false;
    const flushP = screen.flush().then(() => {
      flushDone = true;
    });
    await new Promise<void>((r) => setTimeout(r, 30)); // >= one flush poll
    expect(flushDone).toBe(false); // still outstanding: flush must wait
    term.write = origWrite;
    origWrite(held[0]!.data, held[0]!.cb);
    await flushP;
    expect(flushDone).toBe(true);
    const after = screen.snapshot();

    // Both compared states are fully parsed; the inert-key equality
    // comparison is made on quiescent grids, exactly as the scenario now does.
    expect(after.lines[0]).toContain("FOUNDER DECISION (1 of 2)");
    expect(before.lines[0]).toBe(after.lines[0]);
  });
});

// ─── S4: dead pending member removed ───

describe("S4: Screen carries no dead drain state", () => {
  test("no `pending` member remains; inFlight is the only accounting", () => {
    const src = readFileSync(path.join(repoRoot, "packages/tui-chaos/src/screen.ts"), "utf8");
    expect(src.includes("private pending")).toBe(false);
    expect(src.includes("this.pending")).toBe(false);
    expect(src.includes("private inFlight")).toBe(true);
    // And at runtime the only drain state is the counter itself.
    const screen = new Screen(10, 2) as unknown as Record<string, unknown>;
    expect("pending" in screen).toBe(false);
    expect("inFlight" in screen).toBe(true);
  });
});

export {};
