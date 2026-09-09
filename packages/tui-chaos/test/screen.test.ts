// packages/tui-chaos/test/screen.test.ts
// Screen model unit tests — synthetic ANSI feeds, no PTY required.

import { describe, expect, test } from "bun:test";
import { Screen, waitFor } from "../src/screen";

describe("Screen", () => {
  test("renders plain text into the cell grid", async () => {
    const screen = new Screen(40, 8);
    await screen.write("Hello harness");
    const snap = screen.snapshot();
    expect(snap.lines[0]).toContain("Hello harness");
    expect(snap.lines[1]).toBe("");
  });

  test("clear-screen and cursor-addressing are honored", async () => {
    const screen = new Screen(20, 4);
    await screen.write("stale stale stale");
    await screen.write("\x1b[2J\x1b[H");
    await screen.write("fresh");
    const snap = screen.snapshot();
    expect(snap.lines[0]).toContain("fresh");
    expect(snap.lines.some((l) => l.includes("stale"))).toBe(false);
    expect(snap.cursor).toEqual({ x: 5, y: 0 });
  });

  test("color escape sequences produce a non-empty color signature", async () => {
    const screen = new Screen(30, 3);
    await screen.write("\x1b[31mRED\x1b[0m plain");
    const snap = screen.snapshot();
    expect(snap.lines[0]).toContain("RED");
    expect(snap.colorLines[0]).toContain(":p1/"); // SGR 31 -> palette fg 1
  });

  test("grid hash is stable across identical feeds and differs across content", async () => {
    const a = new Screen(30, 3);
    const b = new Screen(30, 3);
    const feed = "deterministic row\n\x1b[32mgreen\x1b[0m";
    await a.write(feed);
    await b.write(feed);
    expect(a.snapshot().hash).toBe(b.snapshot().hash);

    const c = new Screen(30, 3);
    await c.write(feed + "!");
    expect(c.snapshot().hash).not.toBe(a.snapshot().hash);
  });

  test("resize keeps existing content and accepts new writes at the new size", async () => {
    const screen = new Screen(40, 6);
    await screen.write("before resize");
    screen.resize(20, 4);
    await screen.write("\r\nnarrow");
    const snap = screen.snapshot();
    expect(snap.cols).toBe(20);
    expect(snap.lines[0]).toContain("before resize");
    expect(snap.lines[1]).toContain("narrow");
  });

  test("waitFor resolves on match and reports timeout otherwise", async () => {
    const screen = new Screen(20, 3);
    await screen.write("target");
    expect(await waitFor(screen, (s) => s.lines[0]!.includes("target"), 500)).toBe(true);
    expect(
      await waitFor(screen, (s) => s.lines[0]!.includes("absent"), 120, 20),
    ).toBe(false);
  });

  // ─── F3: drain accounting under overlapping writes ───

  test("flush() waits through the final overlapping write before returning", async () => {
    // Reproduces the ready-state review finding: two overlapping (not
    // awaited) writes, the first completing parse while the second is still
    // in flight. A boolean "drained" flag set true by the FIRST callback
    // lets flush() return before the second write is parsed; in-flight
    // counting cannot. Order below is deterministic: flush() may return
    // only after the last write's callback fired and resolved its promise.
    const screen = new Screen(40, 4);
    const events: string[] = [];
    const p1 = screen.write("first-");
    const p2 = screen.write("second").then(() => {
      events.push("second-parsed");
    });
    await p1.then(() => {
      events.push("first-awaited");
    });
    await screen.flush();
    events.push("flushed");
    expect(events).toEqual(["first-awaited", "second-parsed", "flushed"]);
    await p2;
    const snap = screen.snapshot();
    expect(snap.lines[0]).toContain("first-");
    expect(snap.lines[0]).toContain("second");
  });

  test("flush() accounts for multiple overlapping writes (PTY onData pattern)", async () => {
    // onData() calls write() fire-and-forget; three chunks can be in flight
    // at once. After flush(), every chunk must be reflected in the grid.
    const screen = new Screen(60, 4);
    const w1 = screen.write("alpha ");
    const w2 = screen.write("beta ");
    const w3 = screen.write("gamma");
    await screen.flush();
    const line = screen.snapshot().lines[0]!;
    expect(line).toContain("alpha");
    expect(line).toContain("beta");
    expect(line).toContain("gamma");
    await Promise.all([w1, w2, w3]);
  });

  test("flush() is a no-op promise when nothing is in flight", async () => {
    const screen = new Screen(20, 2);
    await screen.write("settled");
    await screen.flush();
    await screen.flush();
    expect(screen.snapshot().lines[0]).toContain("settled");
  });

  test("drain accounting holds while a later queued write is still outstanding", async () => {
    // Deterministic negative coverage for the ready-state review finding:
    // a controlled parser double releases each write callback on demand,
    // reproducing the exact interleaving the real parser can produce when
    // its write budget splits overlapping writes across macrotasks — the
    // first write's callback fires while the second is still queued.
    // A boolean "drained" flag set by the FIRST callback lets flush()
    // return early; in-flight counting cannot. (Verified to fail the
    // previous boolean-drained implementation and pass the corrected one.)
    const { Terminal } = await import("@xterm/headless");
    const origWrite = Terminal.prototype.write;
    const queued: Array<{ data: string; cb: () => void }> = [];
    Terminal.prototype.write = function (data: string, cb?: () => void) {
      queued.push({ data, cb: cb ?? (() => {}) });
    };
    try {
      const screen = new Screen(40, 4);
      const p1 = screen.write("one");
      const p2 = screen.write("two");
      expect(queued.length).toBe(2);

      let flushDone = false;
      const flushP = screen.flush().then(() => {
        flushDone = true;
      });
      // Neither write parsed yet: flush() must not be able to complete.
      await new Promise((r) => setTimeout(r, 20));
      expect(flushDone).toBe(false);

      // Parser finishes chunk 1 only. Chunk 2 is STILL outstanding —
      // flush() must remain pending. (The old boolean-drained screen
      // reports drained here and flush() returns: the defect.)
      queued[0]!.cb();
      await new Promise((r) => setTimeout(r, 20));
      expect(flushDone).toBe(false);

      // Parser finishes the final write: flush() may now complete.
      queued[1]!.cb();
      await flushP;
      expect(flushDone).toBe(true);
      await Promise.all([p1, p2]);
    } finally {
      Terminal.prototype.write = origWrite;
    }
  });
});
