// apps/madbridge/test/init-storage.test.ts
//
// init previews the host storage root and, only after Founder
// confirmation, creates it. It writes nothing into the governed
// repository, previews and creates only root/sessions/capability at
// mode 0700, never creates runtime/, and never deletes or migrates an
// existing .madv-runtime directory - that is legacy user data (spec
// §9.9).

import { afterEach, beforeEach, expect, test } from "bun:test";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, realpathSync, rmSync, statSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { runCli } from "../src/cli";

let repoDir: string;
let storageDir: string;
let previousStorageDir: string | undefined;

beforeEach(() => {
  // os.tmpdir() resolves under /var on macOS, itself a symlink to
  // /private/var - canonicalize both mkdtemp roots so neither trips
  // validateStorageRoot's symlink_component check on the mkdtemp root
  // itself (the "root" leaf below storageDir is left non-existent, which
  // is the actual scenario being tested).
  repoDir = realpathSync(mkdtempSync(join(tmpdir(), "madv-init-repo-")));
  storageDir = join(realpathSync(mkdtempSync(join(tmpdir(), "madv-init-storage-"))), "root");
  previousStorageDir = process.env.MADV_STORAGE_DIR;
  process.env.MADV_STORAGE_DIR = storageDir;
});

afterEach(() => {
  if (previousStorageDir === undefined) {
    delete process.env.MADV_STORAGE_DIR;
  } else {
    process.env.MADV_STORAGE_DIR = previousStorageDir;
  }
  rmSync(repoDir, { recursive: true, force: true });
});

test("init writes nothing inside the repository", async () => {
  const before = readdirSync(repoDir).sort();
  const result = await runCli(["init", "--yes"], { stdin: "", cwd: repoDir });
  expect(result.exitCode).toBe(0);
  const after = readdirSync(repoDir).sort();
  expect(after).toEqual(before);
});

test("init previews exactly the root, sessions, and capability directories", async () => {
  const result = await runCli(["init", "--json"], { stdin: "n", cwd: repoDir });
  const json = JSON.parse(result.stdout);
  expect(json.preview.root).toBe(storageDir);
  expect(json.preview.subdirectories).toEqual(["sessions", "capability"]);
});

test("init creates the three directories with mode 0700", async () => {
  const result = await runCli(["init", "--yes"], { stdin: "", cwd: repoDir });
  expect(result.exitCode).toBe(0);
  for (const dir of [storageDir, join(storageDir, "sessions"), join(storageDir, "capability")]) {
    expect(existsSync(dir)).toBe(true);
    expect(statSync(dir).mode & 0o777).toBe(0o700);
  }
});

test("init does not create runtime/", async () => {
  await runCli(["init", "--yes"], { stdin: "", cwd: repoDir });
  expect(existsSync(join(storageDir, "runtime"))).toBe(false);
});

test("init does not delete or migrate an existing .madv-runtime", async () => {
  const legacyDir = join(repoDir, ".madv-runtime");
  const legacyFile = join(legacyDir, "config.json");
  mkdirSync(legacyDir, { recursive: true });
  writeFileSync(legacyFile, '{"legacy":true}');

  const result = await runCli(["init", "--yes"], { stdin: "", cwd: repoDir });

  expect(result.exitCode).toBe(0);
  expect(existsSync(legacyFile)).toBe(true);
  expect(readdirSync(legacyDir)).toEqual(["config.json"]);
});

test("declined init creates nothing", async () => {
  const result = await runCli(["init"], { stdin: "n", cwd: repoDir });
  expect(result.exitCode).toBe(0);
  expect(existsSync(storageDir)).toBe(false);
});
