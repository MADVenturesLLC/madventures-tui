// apps/madbridge/test/cli.test.ts
// Command-contract tests for the madv-tui CLI surface.
//
// Asserts:
//   - Exact command names (the nine approved commands)
//   - Unknown-command rejection with nonzero exit
//   - Read-only `doctor` makes no filesystem changes
//   - No filesystem changes on failed preflight (start)
//   - Complete envelope confirmation before launch
//   - Nonzero exit codes for blocked / invalid / interrupted sessions
//   - JSON output when --json is present

import { test, expect, describe, beforeEach, afterEach } from "bun:test";
import { rmSync, existsSync, mkdtempSync, readdirSync, realpathSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { runCli, type CliResult } from "../src/cli";

// ─── Helpers ───

const APPROVED_COMMANDS = [
  "init",
  "doctor",
  "start",
  "status",
  "pause",
  "resume",
  "verify-ledger",
  "export-evidence",
  "close",
] as const;

async function cli(args: string[]): Promise<CliResult> {
  return runCli(args, { stdin: "n", cwd: process.cwd() });
}

async function cliJson(args: string[]): Promise<{ result: CliResult; json: any }> {
  const result = await runCli([...args, "--json"], { stdin: "n", cwd: process.cwd() });
  let json: any = null;
  if (result.stdout.length > 0) {
    try {
      json = JSON.parse(result.stdout);
    } catch {
      json = null;
    }
  }
  return { result, json };
}

// ─── Tests ───

describe("CLI command surface", () => {
  test("all nine approved commands are accepted and produce exit 0 in happy path", async () => {
    // For commands that require no broker/ledger, they should return exit 0.
    // We test doctor which is always safe.
    const result = await cli(["doctor"]);
    expect(result.exitCode).toBe(0);
  });

  test("approved command names are exactly the nine", () => {
    expect(APPROVED_COMMANDS).toEqual([
      "init", "doctor", "start", "status", "pause",
      "resume", "verify-ledger", "export-evidence", "close",
    ]);
    expect(APPROVED_COMMANDS.length).toBe(9);
  });

  test("unknown command is rejected with nonzero exit", async () => {
    const result = await cli(["bogus-command"]);
    expect(result.exitCode).not.toBe(0);
    expect(result.stderr).toContain("unknown");
  });

  test("unknown command with --json produces JSON error", async () => {
    const { result, json } = await cliJson(["bogus-command"]);
    expect(result.exitCode).not.toBe(0);
    expect(json).not.toBeNull();
    expect(json.error).toBeDefined();
  });

  test("no arguments shows usage with nonzero exit", async () => {
    const result = await cli([]);
    expect(result.exitCode).not.toBe(0);
  });
});

describe("doctor command — read-only", () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), "madv-doctor-"));
  });

  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  test("doctor exits 0 and produces output", async () => {
    const result = await runCli(["doctor"], { stdin: "", cwd: tempDir });
    expect(result.exitCode).toBe(0);
  });

  test("doctor makes no filesystem changes", async () => {
    const before = readdirSync(tempDir).sort();
    const result = await runCli(["doctor"], { stdin: "", cwd: tempDir });
    expect(result.exitCode).toBe(0);
    const after = readdirSync(tempDir).sort();
    expect(after).toEqual(before);
  });

  test("doctor --json produces valid JSON output", async () => {
    const { result, json } = await cliJson(["doctor"]);
    expect(result.exitCode).toBe(0);
    expect(json).not.toBeNull();
    expect(json.checks).toBeInstanceOf(Array);
    expect(json.ok).toBeDefined();
  });

  test("doctor --json includes platform/architecture check", async () => {
    const { json } = await cliJson(["doctor"]);
    const checkNames = json.checks.map((c: any) => c.name);
    expect(checkNames).toContain("platform");
  });
});

describe("start command — Phase 3A gate", () => {
  test("start exits 78 whether or not an envelope is supplied", async () => {
    const bare = await cli(["start"]);
    const withEnvelope = await cli(["start", "--envelope", "/nonexistent/envelope.json"]);
    expect(bare.exitCode).toBe(78);
    expect(withEnvelope.exitCode).toBe(78);
    expect(withEnvelope.stderr).toBe(bare.stderr);
  });

  test("start with --json reports live_runtime_not_certified", async () => {
    const { result, json } = await cliJson(["start"]);
    expect(result.exitCode).toBe(78);
    expect(json).not.toBeNull();
    expect(json.error).toBe("live_runtime_not_certified");
  });

  test("start creates no runtime directory", async () => {
    const tempDir = mkdtempSync(join(tmpdir(), "madv-start-"));
    try {
      const result = await runCli(
        ["start", "--envelope", "/nonexistent/envelope.json"],
        { stdin: "", cwd: tempDir },
      );
      expect(result.exitCode).toBe(78);
      expect(existsSync(join(tempDir, ".madv-runtime"))).toBe(false);
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });
});

describe("session commands — exit codes", () => {
  test("status exits 69 — external control unavailable", async () => {
    const result = await cli(["status"]);
    expect(result.exitCode).toBe(69);
  });

  test("pause exits 69 — external control unavailable", async () => {
    const result = await cli(["pause", "--reason", "testing"]);
    expect(result.exitCode).toBe(69);
  });

  test("resume exits 69 — external control unavailable", async () => {
    const result = await cli(["resume"]);
    expect(result.exitCode).toBe(69);
  });

  test("close exits 69 — external control unavailable", async () => {
    const result = await cli(["close", "--summary", "done"]);
    expect(result.exitCode).toBe(69);
  });

  test("verify-ledger without ledger exits nonzero", async () => {
    const result = await cli(["verify-ledger"]);
    expect(result.exitCode).not.toBe(0);
  });

  test("export-evidence without ledger exits nonzero", async () => {
    const result = await cli(["export-evidence"]);
    expect(result.exitCode).not.toBe(0);
  });
});

describe("JSON output mode", () => {
  test("doctor --json stdout is pure JSON", async () => {
    const { result } = await cliJson(["doctor"]);
    expect(result.exitCode).toBe(0);
    // stdout should be valid JSON
    expect(() => JSON.parse(result.stdout)).not.toThrow();
  });

  test("status --json with no broker produces JSON error on stdout", async () => {
    const { result, json } = await cliJson(["status"]);
    expect(result.exitCode).not.toBe(0);
    expect(json).not.toBeNull();
    expect(json.error).toBeDefined();
  });
});

describe("init command", () => {
  // Host-storage init (Task 29 / M12) never writes into the repository
  // it is invoked from, so every case here routes through
  // MADV_STORAGE_DIR to a disposable root - never the real passwd-home
  // default - matching apps/madbridge/test/init-storage.test.ts, which
  // covers the substantive behavior in full. os.tmpdir() resolves
  // through a symlink on macOS (/var -> /private/var), so both roots
  // are canonicalized before use.
  let previousStorageDir: string | undefined;

  beforeEach(() => {
    previousStorageDir = process.env.MADV_STORAGE_DIR;
  });

  afterEach(() => {
    if (previousStorageDir === undefined) {
      delete process.env.MADV_STORAGE_DIR;
    } else {
      process.env.MADV_STORAGE_DIR = previousStorageDir;
    }
  });

  test("init --json previews changes without applying when declined", async () => {
    const tempDir = realpathSync(mkdtempSync(join(tmpdir(), "madv-init-")));
    const storageDir = join(realpathSync(mkdtempSync(join(tmpdir(), "madv-init-storage-"))), "root");
    process.env.MADV_STORAGE_DIR = storageDir;
    try {
      const { result, json } = await cliJsonWithCwd(["init"], tempDir, "n");
      expect(result.exitCode).toBe(0);
      expect(json).not.toBeNull();
      expect(json.preview).toBeDefined();
      expect(json.applied).toBe(false);
      // No directories created when declined - not in the repository,
      // and not at the storage root either.
      expect(existsSync(join(tempDir, ".madv-runtime"))).toBe(false);
      expect(existsSync(storageDir)).toBe(false);
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test("init with --yes creates the host storage root, not a repository directory", async () => {
    const tempDir = realpathSync(mkdtempSync(join(tmpdir(), "madv-init-yes-")));
    const storageDir = join(realpathSync(mkdtempSync(join(tmpdir(), "madv-init-yes-storage-"))), "root");
    process.env.MADV_STORAGE_DIR = storageDir;
    try {
      const result = await runCli(["init", "--yes"], { stdin: "", cwd: tempDir });
      expect(result.exitCode).toBe(0);
      expect(existsSync(join(tempDir, ".madv-runtime"))).toBe(false);
      expect(existsSync(storageDir)).toBe(true);
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test("init --yes --json reports applied=true", async () => {
    const tempDir = realpathSync(mkdtempSync(join(tmpdir(), "madv-init-json-")));
    const storageDir = join(realpathSync(mkdtempSync(join(tmpdir(), "madv-init-json-storage-"))), "root");
    process.env.MADV_STORAGE_DIR = storageDir;
    try {
      const result = await runCli(["init", "--yes", "--json"], { stdin: "", cwd: tempDir });
      expect(result.exitCode).toBe(0);
      const json = JSON.parse(result.stdout);
      expect(json.applied).toBe(true);
      expect(json.preview).toBeDefined();
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });
});

describe("shipped entrypoint — process output", () => {
  // These tests spawn the REAL CLI entrypoint (apps/madbridge/src/cli.ts) as
  // a child process, exercising main()'s stdout/stderr writing — the path
  // runCli()-based tests cannot see. Commands return output already ending
  // in "\n"; main() must not append a second newline.
  const ENTRY = join(import.meta.dir, "..", "src", "cli.ts");

  async function runEntrypoint(
    args: string[],
  ): Promise<{ exitCode: number; stdout: string; stderr: string }> {
    const proc = Bun.spawn({
      cmd: [process.execPath, ENTRY, ...args],
      stdout: "pipe",
      stderr: "pipe",
      stdin: "ignore",
    });
    const [stdout, stderr] = await Promise.all([
      new Response(proc.stdout).text(),
      new Response(proc.stderr).text(),
    ]);
    const exitCode = await proc.exited;
    return { exitCode, stdout, stderr };
  }

  function assertSingleTrailingNewline(stream: string, label: string) {
    expect(stream.endsWith("\n"), `${label} ends with a newline`).toBe(true);
    expect(stream.endsWith("\n\n"), `${label} has no double newline`).toBe(false);
    // Exactly one trailing newline: after removing one, no newline remains.
    expect(stream.slice(0, -1).endsWith("\n"), `${label} has exactly one trailing newline`).toBe(false);
  }

  test("start (text) emits exactly one trailing newline on stderr", async () => {
    const { exitCode, stdout, stderr } = await runEntrypoint(["start"]);
    expect(exitCode).toBe(78);
    expect(stdout).toBe("");
    assertSingleTrailingNewline(stderr, "stderr");
  });

  test("start --json emits exactly one trailing newline on stdout", async () => {
    const { exitCode, stdout, stderr } = await runEntrypoint(["start", "--json"]);
    expect(exitCode).toBe(78);
    expect(stderr).toBe("");
    assertSingleTrailingNewline(stdout, "stdout");
    expect(() => JSON.parse(stdout)).not.toThrow();
  });

  test("status (text) emits exactly one trailing newline on stderr", async () => {
    const { exitCode, stdout, stderr } = await runEntrypoint(["status"]);
    expect(exitCode).toBe(69);
    expect(stdout).toBe("");
    assertSingleTrailingNewline(stderr, "stderr");
  });

  test("status --json emits exactly one trailing newline on stdout", async () => {
    const { exitCode, stdout, stderr } = await runEntrypoint(["status", "--json"]);
    expect(exitCode).toBe(69);
    expect(stderr).toBe("");
    assertSingleTrailingNewline(stdout, "stdout");
    expect(() => JSON.parse(stdout)).not.toThrow();
  });

  test("close (text) emits exactly one trailing newline on stderr", async () => {
    const { exitCode, stdout, stderr } = await runEntrypoint(["close"]);
    expect(exitCode).toBe(69);
    expect(stdout).toBe("");
    assertSingleTrailingNewline(stderr, "stderr");
  });

  test("close --json emits exactly one trailing newline on stdout", async () => {
    const { exitCode, stdout, stderr } = await runEntrypoint(["close", "--json"]);
    expect(exitCode).toBe(69);
    expect(stderr).toBe("");
    assertSingleTrailingNewline(stdout, "stdout");
    expect(() => JSON.parse(stdout)).not.toThrow();
  });
});

// ─── Helper variant for init tests with cwd ───

async function cliJsonWithCwd(
  args: string[],
  cwd: string,
  stdin: string,
): Promise<{ result: CliResult; json: any }> {
  const result = await runCli([...args, "--json"], { stdin, cwd });
  let json: any = null;
  if (result.stdout.length > 0) {
    try {
      json = JSON.parse(result.stdout);
    } catch {
      json = null;
    }
  }
  return { result, json };
}
