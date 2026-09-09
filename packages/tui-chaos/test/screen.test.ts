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
});
