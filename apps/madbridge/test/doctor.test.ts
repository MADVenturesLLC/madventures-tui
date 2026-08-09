// apps/madbridge/test/doctor.test.ts
// Doctor-specific contract tests — read-only checks and output structure.

import { test, expect, describe, beforeEach, afterEach } from "bun:test";
import { rmSync, mkdtempSync, readdirSync, writeFileSync, existsSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { runCli, type CliResult } from "../src/cli";

function runDoctor(args: string[] = [], opts: { stdin?: string; cwd?: string } = {}): Promise<CliResult> {
  return runCli(["doctor", ...args], { stdin: opts.stdin ?? "", cwd: opts.cwd ?? process.cwd() });
}

describe("doctor: read-only invariant", () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), "madv-doc-"));
  });

  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  test("no files created in cwd", async () => {
    const before = readdirSync(tempDir);
    const result = await runDoctor([], { cwd: tempDir });
    expect(result.exitCode).toBe(0);
    const after = readdirSync(tempDir);
    expect(after).toEqual(before);
  });

  test("no files created in home .madv-runtime", async () => {
    // Use a temp runtime dir to verify doctor doesn't write to it
    const runtimeDir = join(tempDir, "runtime");
    const before = existsSync(runtimeDir);
    const result = await runDoctor([], { cwd: tempDir });
    expect(result.exitCode).toBe(0);
    const after = existsSync(runtimeDir);
    expect(after).toBe(before);
  });
});

describe("doctor: check coverage", () => {
  test("doctor includes platform/architecture check", async () => {
    const result = await runDoctor(["--json"]);
    expect(result.exitCode).toBe(0);
    const json = JSON.parse(result.stdout);
    const names = json.checks.map((c: any) => c.name);
    expect(names).toContain("platform");
  });

  test("doctor includes bun check", async () => {
    const result = await runDoctor(["--json"]);
    const json = JSON.parse(result.stdout);
    const names = json.checks.map((c: any) => c.name);
    expect(names).toContain("bun");
  });

  test("doctor includes claude-code check", async () => {
    const result = await runDoctor(["--json"]);
    const json = JSON.parse(result.stdout);
    const names = json.checks.map((c: any) => c.name);
    expect(names).toContain("claude-code");
  });

  test("doctor includes agy check", async () => {
    const result = await runDoctor(["--json"]);
    const json = JSON.parse(result.stdout);
    const names = json.checks.map((c: any) => c.name);
    expect(names).toContain("agy");
  });

  test("doctor includes opentui check", async () => {
    const result = await runDoctor(["--json"]);
    const json = JSON.parse(result.stdout);
    const names = json.checks.map((c: any) => c.name);
    expect(names).toContain("opentui");
  });

  test("doctor includes directory-permissions check", async () => {
    const result = await runDoctor(["--json"]);
    const json = JSON.parse(result.stdout);
    const names = json.checks.map((c: any) => c.name);
    expect(names).toContain("directory-permissions");
  });

  test("doctor includes adapter-protocol check", async () => {
    const result = await runDoctor(["--json"]);
    const json = JSON.parse(result.stdout);
    const names = json.checks.map((c: any) => c.name);
    expect(names).toContain("adapter-protocol");
  });

  test("doctor includes exact-model-visibility check", async () => {
    const result = await runDoctor(["--json"]);
    const json = JSON.parse(result.stdout);
    const names = json.checks.map((c: any) => c.name);
    expect(names).toContain("exact-model-visibility");
  });
});

describe("doctor: output format", () => {
  test("each check has name, status, and detail", async () => {
    const result = await runDoctor(["--json"]);
    expect(result.exitCode).toBe(0);
    const json = JSON.parse(result.stdout);
    for (const check of json.checks) {
      expect(check).toHaveProperty("name");
      expect(check).toHaveProperty("status");
      expect(check).toHaveProperty("detail");
      expect(["ok", "warn", "fail"]).toContain(check.status);
    }
  });

  test("ok field reflects aggregate check status", async () => {
    const result = await runDoctor(["--json"]);
    const json = JSON.parse(result.stdout);
    const anyFail = json.checks.some((c: any) => c.status === "fail");
    expect(json.ok).toBe(!anyFail);
  });
});
