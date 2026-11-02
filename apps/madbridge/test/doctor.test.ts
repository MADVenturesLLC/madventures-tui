// apps/madbridge/test/doctor.test.ts
// Doctor-specific contract tests — read-only checks and output structure.

import { test, expect, describe, beforeEach, afterEach } from "bun:test";
import { rmSync, mkdtempSync, readdirSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { runCli as runHostCli, type CliContext, type CliResult } from "../src/cli";

async function runCli(args: Array<string>, ctx: CliContext): Promise<CliResult> {
  if (args.at(0) !== "doctor") return runHostCli(args, ctx);
  const root = mkdtempSync(join(tmpdir(), "madv-doctor-fixtures-"));
  const bin = join(root, "bin");
  const cwd = process.cwd();
  const path = process.env.PATH;
  const home = process.env.HOME;
  try {
    mkdirSync(bin);
    mkdirSync(join(root, "cwd"));
    for (const name of "bun claude agy".split(" ")) {
      writeFileSync(join(bin, name), "#!/bin/sh\nprintf '1.4.2-fixture\\n'\n", { mode: 0o700 });
    }
    process.env.PATH = bin;
    process.env.HOME = root;
    // doctor reads process.cwd(), so its filesystem assertions need the real cwd.
    process.chdir(ctx.cwd === cwd ? join(root, "cwd") : ctx.cwd);
    const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
    const homeBefore = readdirSync(root, { recursive: true }).sort();
    const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
    expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
    expect(readdirSync(root, { recursive: true }).sort()).toEqual(homeBefore);
    return result;
  } finally {
    process.chdir(cwd);
    if (path === undefined) delete process.env.PATH;
    else process.env.PATH = path;
    if (home === undefined) delete process.env.HOME;
    else process.env.HOME = home;
    rmSync(root, { recursive: true, force: true });
  }
}

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
    // The shared runner checks the actual fixture HOME and cwd before cleanup.
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
    expect(json.checks.find((check: any) => check.name === "platform")?.status).toBe("ok");
  });

  test("doctor includes bun check", async () => {
    const result = await runDoctor(["--json"]);
    const json = JSON.parse(result.stdout);
    const names = json.checks.map((c: any) => c.name);
    expect(names).toContain("bun");
    expect(json.checks.find((check: any) => check.name === "bun")?.status).toBe("ok");
  });

  test("doctor includes claude-code check", async () => {
    const result = await runDoctor(["--json"]);
    const json = JSON.parse(result.stdout);
    const names = json.checks.map((c: any) => c.name);
    expect(names).toContain("claude-code");
    expect(json.checks.find((check: any) => check.name === "claude-code")?.status).toBe("ok");
  });

  test("doctor includes agy check", async () => {
    const result = await runDoctor(["--json"]);
    const json = JSON.parse(result.stdout);
    const names = json.checks.map((c: any) => c.name);
    expect(names).toContain("agy");
    expect(json.checks.find((check: any) => check.name === "agy")?.status).toBe("ok");
  });

  test("doctor includes opentui check", async () => {
    const result = await runDoctor(["--json"]);
    const json = JSON.parse(result.stdout);
    const names = json.checks.map((c: any) => c.name);
    expect(names).toContain("opentui");
    expect(json.checks.find((check: any) => check.name === "opentui")?.status).toBe("ok");
  });

  test("doctor includes directory-permissions check", async () => {
    const result = await runDoctor(["--json"]);
    const json = JSON.parse(result.stdout);
    const names = json.checks.map((c: any) => c.name);
    expect(names).toContain("directory-permissions");
    expect(json.checks.find((check: any) => check.name === "directory-permissions")?.status).toBe("ok");
  });

  test("doctor includes adapter-protocol check", async () => {
    const result = await runDoctor(["--json"]);
    const json = JSON.parse(result.stdout);
    const names = json.checks.map((c: any) => c.name);
    expect(names).toContain("adapter-protocol");
    expect(json.checks.find((check: any) => check.name === "adapter-protocol")?.status).toBe("ok");
  });

  test("doctor includes exact-model-visibility check", async () => {
    const result = await runDoctor(["--json"]);
    const json = JSON.parse(result.stdout);
    const names = json.checks.map((c: any) => c.name);
    expect(names).toContain("exact-model-visibility");
    expect(json.checks.find((check: any) => check.name === "exact-model-visibility")?.status).toBe("warn");
  });
});

const EXPECTED_STATUSES: Record<string, string> = {
  platform: "ok", bun: "ok", "claude-code": "ok", agy: "ok", opentui: "ok",
  "directory-permissions": "ok", "adapter-protocol": "ok", "exact-model-visibility": "warn",
};

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
      expect(check.status).toBe(EXPECTED_STATUSES[check.name]);
    }
  });

  test("ok field reflects aggregate check status", async () => {
    const result = await runDoctor(["--json"]);
    const json = JSON.parse(result.stdout);
    const anyFail = json.checks.some((c: any) => c.status === "fail");
    expect(json.ok).toBe(!anyFail);
  });
});
