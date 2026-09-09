// packages/tui-chaos/test/review-corrections.test.ts
// Focused coverage for the ready-state review corrections (2026-09-09 act):
//   F1 — evidence fixture_flags must equal the flags the run actually used;
//   F2 — the packet's asciinema reference must be a file the run actually
//        wrote (or null), never an invented filename;
//   F3 — Screen drain accounting: flush() must not report drained while a
//        later queued write is still outstanding (overlapping writes);
//   F4 — defaultRepoRoot() must survive percent-encoded filesystem paths
//        (a repository checkout under a directory containing spaces).
//
// TUI_ACCEPTANCE — NOT PHASE_0 — NOT OCCUPANCY_PROOF.

import { describe, expect, test } from "bun:test";
import { existsSync, mkdirSync, readFileSync, realpathSync, rmSync, symlinkSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Screen } from "../src/screen";
import { defaultRepoRoot } from "../src/tui-session";
import type { EvidencePacket } from "../src/evidence";

// test file lives at packages/tui-chaos/test/ -> repo root is three levels up.
const repoRoot = path.resolve(fileURLToPath(new URL("../../..", import.meta.url)));

// ─── F3: overlapping writes vs flush() ───

describe("F3: Screen drain accounting under overlapping writes", () => {
  test("flush() blocks while a later queued write is still outstanding (regression vs boolean drain)", async () => {
    const screen = new Screen(60, 4);
    // Deterministic parser gate: intercept term.write so chunks stay
    // UNPARSED until the test releases them individually. This is the exact
    // reviewed race shape: chunk 1's parser callback has fired while chunk 2
    // is still queued inside the parser.
    const term = (
      screen as unknown as { term: { write: (d: string, cb: () => void) => void } }
    ).term;
    const origWrite = term.write.bind(term);
    const held: Array<{ data: string; cb: () => void }> = [];
    term.write = (data: string, cb: () => void) => {
      held.push({ data, cb });
    };

    const pA = screen.write("AAA-"); // awaited later
    void screen.write("BBB"); // un-awaited, exactly like the PTY onData path

    let flushDone = false;
    const flushPromise = screen.flush().then(() => {
      flushDone = true;
    });

    // Release ONLY the first chunk: AAA parses, its callback fires. BBB is
    // still outstanding. The previous boolean-drained implementation set
    // drained=true on this first callback, so flush() returned early and a
    // snapshot could observe a grid without BBB — this test fails there.
    term.write = origWrite;
    origWrite(held[0]!.data, held[0]!.cb);
    await pA;
    await new Promise<void>((r) => setTimeout(r, 30)); // >= one flush poll (5ms)

    expect(flushDone).toBe(false); // OLD impl: true -> FAIL (regression)
    expect(screen.snapshot().lines[0]).not.toContain("BBB");

    // Release the second chunk: now everything is parsed and flush completes.
    origWrite(held[1]!.data, held[1]!.cb);
    await flushPromise;
    expect(flushDone).toBe(true);
    expect(screen.snapshot().lines[0]).toContain("AAA-BBB");
  });

  test("rapid un-awaited onData-shaped writes all land before flush() returns", async () => {
    const screen = new Screen(80, 4);
    const chunks = ["first ", "\x1b[31mred\x1b[0m ", "third ", "fourth chunk"];
    for (const c of chunks) {
      void screen.write(c); // fire-and-forget, as tui-session onData does
    }
    await screen.flush();
    const line = screen.snapshot().lines[0] ?? "";
    for (const c of ["first ", "red", "third ", "fourth chunk"]) {
      expect(line).toContain(c);
    }
  });

  test("flush() after full drain is immediate and repeatable", async () => {
    const screen = new Screen(20, 3);
    await screen.write("settled");
    await screen.flush();
    await screen.flush();
    expect(screen.snapshot().lines[0]).toContain("settled");
  });
});

// ─── F4: percent-encoded repo root ───

describe("F4: defaultRepoRoot survives percent-encoded paths", () => {
  test("ordinary-path behavior unchanged (still resolves the real repo root)", () => {
    const root = defaultRepoRoot();
    expect(root).toBe(repoRoot);
    expect(existsSync(path.join(root, "package.json"))).toBe(true);
  });

  test("a checkout under a directory containing spaces resolves decoded, not %20", async () => {
    // Materialize a mini-layout whose path contains a space. The package src
    // must be REAL COPIES (Bun realpaths through symlinked directories, which
    // would rewrite import.meta.url back to the original location); only
    // node_modules stays a symlink (it does not affect this module's URL).
    const spaceRoot = "/tmp/tui-chaos-f4/space dir";
    rmSync("/tmp/tui-chaos-f4", { recursive: true, force: true });
    mkdirSync(path.join(spaceRoot, "packages"), { recursive: true });
    const dstPkg = path.join(spaceRoot, "packages/tui-chaos");
    mkdirSync(dstPkg, { recursive: true });
    Bun.spawnSync({
      cmd: ["cp", "-R", path.join(repoRoot, "packages/tui-chaos/src"), path.join(dstPkg, "src")],
    });
    // node_modules stays a symlink (it does not affect this module's URL):
    // link BOTH the workspace root and the package-local one — the latter is
    // where bun's isolated install puts @xterm/headless for this package.
    symlinkSync(path.join(repoRoot, "node_modules"), path.join(spaceRoot, "node_modules"));
    symlinkSync(
      path.join(repoRoot, "packages/tui-chaos/node_modules"),
      path.join(dstPkg, "node_modules"),
    );
    try {
      const mod = (await import(
        path.join(spaceRoot, "packages/tui-chaos/src/tui-session.ts")
      )) as typeof import("../src/tui-session");
      const root = mod.defaultRepoRoot();
      // Raw URL.pathname would have produced ".../space%20dir" (nonexistent).
      // Compare against the OS's own resolution (macOS maps /tmp ->
      // /private/tmp); the assertion that matters is: decoded, no %20, real.
      expect(root).toBe(realpathSync(spaceRoot));
      expect(root.includes("%20")).toBe(false);
      expect(root.includes("space dir")).toBe(true);
      expect(existsSync(root)).toBe(true);
    } finally {
      rmSync("/tmp/tui-chaos-f4", { recursive: true, force: true });
    }
  });
});

// ─── F1/F2: evidence packet truthfulness (real harness subprocess) ───

function runHarness(args: string[]): { exitCode: number; stdout: string } {
  const proc = Bun.spawnSync({
    cmd: [process.execPath, path.join(repoRoot, "packages/tui-chaos/src/cli.ts"), ...args],
    cwd: repoRoot,
    stdout: "pipe",
    stderr: "pipe",
  });
  return { exitCode: proc.exitCode, stdout: proc.stdout.toString() };
}

function parsePacket(stdout: string): EvidencePacket {
  const i = stdout.indexOf('{\n  "schema"');
  if (i < 0) throw new Error("no packet JSON in stdout:\n" + stdout.slice(0, 2000));
  return JSON.parse(stdout.slice(i)) as EvidencePacket;
}

describe("F1/F2: real run — mixed selection (governance_focus + ansi_flood)", () => {
  test("packet records the flags the run actually used and references existing casts", () => {
    const r = runHarness([
      "run",
      "--scenarios",
      "governance_focus,ansi_flood",
      "--out",
      "/tmp/tui-chaos-f1f2/mixed",
      "--json",
    ]);
    expect(r.exitCode).toBe(0);
    const packet = parsePacket(r.stdout);
    // F1: ansi_flood in the selection => the STREAM flag was actually used.
    expect(packet.subject.fixture_flags).toContain("MADV_TUI_FIXTURE=1");
    expect(packet.subject.fixture_flags).toContain("MADV_TUI_FIXTURE_STREAM=1");
    expect(packet.git_sha).toMatch(/^[0-9a-f]{40}$/);
    // F2: the referenced cast must exist and belong to THIS run's artifacts.
    const cast = packet.artifacts.asciinema;
    expect(cast).not.toBeNull();
    expect(existsSync(cast!)).toBe(true);
    // Each scenario's artifact list carries its own actual cast.
    const gf = packet.scenarios.find((s) => s.name === "governance_focus");
    const af = packet.scenarios.find((s) => s.name === "ansi_flood");
    expect(gf?.artifacts.some((a) => a.endsWith("governance_focus.cast") && existsSync(a))).toBe(true);
    expect(af?.artifacts.some((a) => a.endsWith("ansi_flood.cast") && existsSync(a))).toBe(true);
    expect(packet.label).toBe("TUI_ACCEPTANCE — NOT PHASE_0 — NOT OCCUPANCY_PROOF");
    expect(packet.summary).toEqual({ total: 2, passed: 2, failed: 0, exit_ok: true });
  });
});

describe("F1/F2: real run — excluding governance_focus", () => {
  test("single ansi_flood run references its own cast, never a nonexistent one", () => {
    const r = runHarness(["run", "--scenarios", "ansi_flood", "--out", "/tmp/tui-chaos-f1f2/flood", "--json"]);
    expect(r.exitCode).toBe(0);
    const packet = parsePacket(r.stdout);
    expect(packet.subject.fixture_flags).toContain("MADV_TUI_FIXTURE_STREAM=1");
    const cast = packet.artifacts.asciinema;
    expect(cast).not.toBeNull();
    expect(cast!.endsWith("ansi_flood.cast")).toBe(true);
    expect(existsSync(cast!)).toBe(true);
    // The run never wrote governance_focus.cast — the packet must not point
    // at it (the exact defect F2 reported).
    expect(existsSync(path.join(path.dirname(cast!), "governance_focus.cast"))).toBe(false);
  });
});

describe("F1/F2: real run — ordinary fixture-only scenario", () => {
  test("layout_resize-only run records only the base fixture flag", () => {
    const r = runHarness(["run", "--scenarios", "layout_resize", "--out", "/tmp/tui-chaos-f1f2/plain", "--json"]);
    expect(r.exitCode).toBe(0);
    const packet = parsePacket(r.stdout);
    expect(packet.subject.fixture_flags).toEqual(["--fixture", "MADV_TUI_FIXTURE=1"]);
    const cast = packet.artifacts.asciinema;
    expect(cast).not.toBeNull();
    expect(cast!.endsWith("layout_resize.cast")).toBe(true);
    expect(existsSync(cast!)).toBe(true);
  });
});

export {};
