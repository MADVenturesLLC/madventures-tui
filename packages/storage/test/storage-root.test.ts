// packages/storage/test/storage-root.test.ts
//
// validateStorageRoot() is the single validator for both the default root
// and the MADV_STORAGE_DIR override, and is pure (creates nothing). Tests
// use disposable mkdtemp roots under the macOS per-user private temporary
// tree and exercise the same production validator - there is no relaxed
// test path (spec §5.1, §5.2, §4.4).

import { expect, test } from "bun:test";
import { existsSync, mkdirSync, mkdtempSync, realpathSync, rmSync, symlinkSync } from "node:fs";
import { chmodSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { resolvePasswdHome } from "../src/home";
import { proposeStorageRoot, STORAGE_SUBDIRECTORIES, validateStorageRoot } from "../src/storage-root";

const REPO = "/repo";
const WORKTREE = "/repo";

function tempRoot(): string {
  // os.tmpdir() resolves under /var on macOS, and /var is itself a symlink
  // to /private/var - canonicalize immediately so the mkdtemp root itself
  // is not a false-positive symlink_component in every other test's walk.
  return realpathSync(mkdtempSync(join(tmpdir(), "madv-storage-test-")));
}

test("storage root rejects not_absolute", () => {
  const result = validateStorageRoot("relative/path", REPO, WORKTREE);
  expect(result).toEqual({ ok: false, failure: "not_absolute" });
});

test("storage root rejects inside_repository", () => {
  const result = validateStorageRoot("/repo/storage", REPO, WORKTREE);
  expect(result).toEqual({ ok: false, failure: "inside_repository" });
});

test("storage root rejects symlink_component", () => {
  const dir = tempRoot();
  try {
    const real = join(dir, "real");
    mkdirSync(real);
    const link = join(dir, "link");
    symlinkSync(real, link);
    const proposed = join(link, "sub");
    const result = validateStorageRoot(proposed, REPO, WORKTREE);
    expect(result).toEqual({ ok: false, failure: "symlink_component" });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("storage root rejects not_owned_by_uid", () => {
  // /usr is root-owned and a real (non-symlink) top-level directory on
  // every stock macOS and Linux install, including Ubuntu's usrmerge
  // layout, where /usr is the merge *target* and so is never itself a
  // symlink - unlike /etc, which is a symlink on macOS. Its uid
  // deterministically differs from the current (non-root) process's uid.
  const proposed = "/usr/__madv_storage_test_not_owned__";
  const result = validateStorageRoot(proposed, REPO, WORKTREE);
  expect(result).toEqual({ ok: false, failure: "not_owned_by_uid" });
});

test("storage root rejects group_or_other_accessible", () => {
  const dir = tempRoot();
  try {
    const restricted = join(dir, "restricted");
    mkdirSync(restricted);
    chmodSync(restricted, 0o750);
    const result = validateStorageRoot(restricted, REPO, WORKTREE);
    expect(result).toEqual({ ok: false, failure: "group_or_other_accessible" });
  } finally {
    chmodSync(dir, 0o700);
    rmSync(dir, { recursive: true, force: true });
  }
});

test("storage root rejects realpath_unstable", () => {
  const dir = tempRoot();
  try {
    // Explicit 0o700 so this isolates the realpath check: plain mkdirSync
    // picks up the process umask (commonly 0o755), which would otherwise
    // trip group_or_other_accessible before the realpath comparison runs.
    mkdirSync(join(dir, "a"), { mode: 0o700 });
    mkdirSync(join(dir, "b"), { mode: 0o700 });
    // Raw concatenation, not path.join(), which would normalize ".." away
    // before it ever reached the validator.
    const proposed = `${dir}/a/../b`;
    const result = validateStorageRoot(proposed, REPO, WORKTREE);
    expect(result).toEqual({ ok: false, failure: "realpath_unstable" });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("storage root rejects not_writable_local", () => {
  const dir = tempRoot();
  try {
    const readOnly = join(dir, "readonly");
    mkdirSync(readOnly);
    chmodSync(readOnly, 0o500);
    const result = validateStorageRoot(readOnly, REPO, WORKTREE);
    expect(result).toEqual({ ok: false, failure: "not_writable_local" });
  } finally {
    chmodSync(dir, 0o700);
    rmSync(dir, { recursive: true, force: true });
  }
});

test("a proposed path whose first component does not exist still walks to the filesystem root, not an empty ancestor", () => {
  // Regression: ancestorPaths() used to omit "/" itself, so a path whose
  // first named component did not exist (nothing to lstat) left the
  // deepest existing ancestor empty and short-circuited to { ok: true },
  // skipping every ownership/mode/realpath check. "/" always exists and
  // is root-owned on a stock install, so this must now reject.
  const proposed = "/__madv_storage_test_nonexistent_top_level__/sub";
  const result = validateStorageRoot(proposed, REPO, WORKTREE);
  expect(result).toEqual({ ok: false, failure: "not_owned_by_uid" });
});

test("the default root is <passwd-home>/Library/Application Support/MADVentures/madventures-tui", () => {
  const expected = join(resolvePasswdHome(), "Library", "Application Support", "MADVentures", "madventures-tui");
  expect(proposeStorageRoot({}, REPO, WORKTREE)).toBe(expected);
});

test("MADV_STORAGE_DIR is the only override and uses the same validator", () => {
  const dir = tempRoot();
  try {
    const proposed = proposeStorageRoot({ MADV_STORAGE_DIR: dir }, REPO, WORKTREE);
    expect(proposed).toBe(dir);
    const result = validateStorageRoot(proposed, REPO, WORKTREE);
    expect(result).toEqual({ ok: true });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("MADV_RUNTIME_DIR is ignored by storage resolution", () => {
  const withRuntimeDir = proposeStorageRoot({ MADV_RUNTIME_DIR: "/tmp/madv-broker-runtime" }, REPO, WORKTREE);
  const withoutRuntimeDir = proposeStorageRoot({}, REPO, WORKTREE);
  expect(withRuntimeDir).toBe(withoutRuntimeDir);

  const dir = tempRoot();
  try {
    const overridden = proposeStorageRoot(
      { MADV_STORAGE_DIR: dir, MADV_RUNTIME_DIR: "/tmp/madv-broker-runtime" },
      REPO,
      WORKTREE,
    );
    expect(overridden).toBe(dir);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("validation creates nothing", () => {
  const dir = tempRoot();
  try {
    const proposed = join(dir, "not-yet-created");
    expect(existsSync(proposed)).toBe(false);
    validateStorageRoot(proposed, REPO, WORKTREE);
    expect(existsSync(proposed)).toBe(false);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("runtime/ is not part of the Phase 3A subdirectory set", () => {
  expect(STORAGE_SUBDIRECTORIES).toEqual(["sessions", "capability"]);
  expect(STORAGE_SUBDIRECTORIES as readonly string[]).not.toContain("runtime");
});
