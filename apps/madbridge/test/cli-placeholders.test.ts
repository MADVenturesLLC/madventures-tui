// apps/madbridge/test/cli-placeholders.test.ts
// Phase 3A external-control placeholders — spec section 4.3.
//
// Asserts:
//   - `status`, `pause`, `resume`, and `close` stay recognized names
//   - Each exits 69 with the exact human line for its command
//   - Each --json emits the exact object and values
//   - Only `close` carries the supervisor-termination sentence
//   - No placeholder imports the broker or probes the filesystem

import { test, expect, describe } from "bun:test";
import { readFileSync } from "fs";
import { join } from "path";
import { runCli, type CliResult } from "../src/cli";

// ─── Spec section 4.3 literals ───

const SHARED_LINE = "External control unavailable. Use the certified TUI governance controls.";

const CLOSE_LINE =
  "External control unavailable. Use the certified TUI governance controls. If the TUI is unresponsive during an incident, terminate the foreground supervisor process; supervisor exit terminates all governed children fail-closed.";

const SHARED_JSON =
  '{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls."}';

const CLOSE_JSON =
  '{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls. If the TUI is unresponsive during an incident, terminate the foreground supervisor process; supervisor exit terminates all governed children fail-closed."}';

const SUPERVISOR_SENTENCE =
  "If the TUI is unresponsive during an incident, terminate the foreground supervisor process; supervisor exit terminates all governed children fail-closed.";

const PLACEHOLDERS = [
  { name: "status", line: SHARED_LINE, json: SHARED_JSON },
  { name: "pause", line: SHARED_LINE, json: SHARED_JSON },
  { name: "resume", line: SHARED_LINE, json: SHARED_JSON },
  { name: "close", line: CLOSE_LINE, json: CLOSE_JSON },
] as const;

async function cli(args: string[]): Promise<CliResult> {
  return runCli(args, { stdin: "", cwd: process.cwd() });
}

function sourceOf(command: string): string {
  return readFileSync(join(import.meta.dir, "..", "src", "commands", `${command}.ts`), "utf8");
}

// ─── Tests ───

describe("external-control placeholders", () => {
  for (const { name, line } of PLACEHOLDERS) {
    test(`${name} exits 69 with the exact human line`, async () => {
      const result = await cli([name]);
      expect(result.exitCode).toBe(69);
      expect(result.stderr).toBe(`${line}\n`);
      expect(result.stdout).toBe("");
    });
  }

  for (const { name, json } of PLACEHOLDERS) {
    test(`${name} --json emits the exact object`, async () => {
      const result = await cli([name, "--json"]);
      expect(result.exitCode).toBe(69);
      expect(result.stdout).toBe(json);
      expect(result.stderr).toBe("");
      expect(Object.keys(JSON.parse(result.stdout))).toEqual(["ok", "error", "hint"]);
    });
  }

  test("close carries the supervisor-termination sentence and the other three do not", async () => {
    const close = await cli(["close"]);
    expect(close.stderr).toContain(SUPERVISOR_SENTENCE);
    expect((await cli(["close", "--json"])).stdout).toContain(SUPERVISOR_SENTENCE);

    for (const name of ["status", "pause", "resume"]) {
      const result = await cli([name]);
      expect(result.stderr).not.toContain(SUPERVISOR_SENTENCE);
      expect((await cli([name, "--json"])).stdout).not.toContain(SUPERVISOR_SENTENCE);
    }
  });

  test("no placeholder command imports @madventures/broker", () => {
    for (const { name } of PLACEHOLDERS) {
      expect(sourceOf(name)).not.toMatch(/@madventures\/broker/);
    }
  });

  test("no placeholder command touches the filesystem", () => {
    for (const { name } of PLACEHOLDERS) {
      expect(sourceOf(name)).not.toMatch(
        /existsSync|readFileSync|statSync|readdirSync|process\.env\.MADV_/,
      );
    }
  });
});
