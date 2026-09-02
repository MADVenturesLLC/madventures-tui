// apps/madbridge/test/cli-gate.test.ts
// Phase 3A production `start` gate — spec section 4.2.
//
// Asserts:
//   - Exit status 78 and the exact human line
//   - The exact JSON shape, values, and key order
//   - Identical output under every flag, argument, and positional
//   - No filesystem inspection
//   - No runtime-module import and no dynamic import

import { test, expect, describe } from "bun:test";
import { chmodSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { runCli, type CliResult } from "../src/cli";

// ─── Spec section 4.2 literals ───

const HUMAN_LINE =
  "Live runtime not certified. Phase 3A runtime foundation is present; live startup requires Phase 3B certification.";

const JSON_LINE =
  '{"ok":false,"error":"live_runtime_not_certified","hint":"Phase 3A runtime foundation is present; live startup requires Phase 3B certification."}';

const START_SOURCE = join(import.meta.dir, "..", "src", "commands", "start.ts");

async function cli(args: string[], cwd: string = process.cwd()): Promise<CliResult> {
  return runCli(args, { stdin: "", cwd });
}

// ─── Tests ───

describe("production start gate", () => {
  test("start exits 78 with the exact human line", async () => {
    const result = await cli(["start"]);
    expect(result.exitCode).toBe(78);
    expect(result.stderr).toBe(`${HUMAN_LINE}\n`);
    expect(result.stdout).toBe("");
  });

  test("start --json emits the exact object and key order", async () => {
    const result = await cli(["start", "--json"]);
    expect(result.exitCode).toBe(78);
    expect(result.stdout).toBe(JSON_LINE);
    expect(result.stderr).toBe("");
    expect(Object.keys(JSON.parse(result.stdout))).toEqual(["ok", "error", "hint"]);
  });

  test("start ignores every flag and argument", async () => {
    const textBaseline = await cli(["start"]);
    const jsonBaseline = await cli(["start", "--json"]);

    // Text mode: every flag, alternate argument path, and positional argument
    // produces byte-identical output.
    for (const args of [
      ["start", "--envelope", "x"],
      ["start", "--force"],
      ["start", "--dev"],
      ["start", "--live"],
      ["start", "some-positional-argument"],
    ]) {
      expect(await cli(args)).toEqual(textBaseline);
    }

    // JSON mode is likewise unaffected by any accompanying argument.
    expect(await cli(["start", "--json", "--envelope", "x"])).toEqual(jsonBaseline);
  });

  test("start performs no filesystem read", async () => {
    const tempDir = mkdtempSync(join(tmpdir(), "madv-gate-"));
    const blockedDir = join(tempDir, "blocked");
    mkdirSync(blockedDir);
    try {
      const before = readdirSync(tempDir).sort();
      // Mode 0000 makes the parent unsearchable: any probe of the envelope
      // path below would raise EACCES rather than return the gate output.
      chmodSync(blockedDir, 0o000);
      const result = await runCli(
        ["start", "--envelope", join(blockedDir, "envelope.json")],
        { stdin: "", cwd: tempDir },
      );
      expect(result.exitCode).toBe(78);
      expect(result.stderr).toBe(`${HUMAN_LINE}\n`);
      chmodSync(blockedDir, 0o700);
      // The working directory is untouched: nothing read, nothing written.
      expect(readdirSync(tempDir).sort()).toEqual(before);
    } finally {
      chmodSync(blockedDir, 0o700);
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test("start.ts imports no runtime module", () => {
    const source = readFileSync(START_SOURCE, "utf8");
    expect(source).not.toMatch(/@madventures\/(broker|ledger|storage|supervisor|pty-host)/);
    expect(source).not.toMatch(/import\s*\(/);
  });
});
