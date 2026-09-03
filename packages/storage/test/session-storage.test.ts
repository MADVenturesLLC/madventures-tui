// packages/storage/test/session-storage.test.ts
//
// createSessionStorage() builds sessions/<id>/{ledger,artifacts,
// sanitized-evidence} transactionally at mode 0700 and revalidates
// through the single storage-root validator. rollbackSessionStorage()
// removes only the session directory, only before the session_open
// durable boundary, and never touches the root, sessions/, or
// capability/ (spec §5.2, §9.6, §5.7).

import { expect, test } from "bun:test";
import { existsSync, mkdirSync, mkdtempSync, realpathSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createSessionStorage, rollbackSessionStorage } from "../src/session-storage";
import type { SessionStorage } from "../src/session-storage";

const REPO = "/repo";
const WORKTREE = "/repo";

function tempRoot(): string {
  return realpathSync(mkdtempSync(join(tmpdir(), "madv-session-test-")));
}

test("session directories are created 0700 and revalidated", () => {
  const root = tempRoot();
  try {
    const storage = createSessionStorage(root, "session-a", REPO, WORKTREE);
    for (const dir of [storage.sessionDir, storage.ledgerDir, storage.artifactsDir, storage.sanitizedEvidenceDir]) {
      expect(existsSync(dir)).toBe(true);
      expect(statSync(dir).mode & 0o777).toBe(0o700);
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("rollback before session_open removes only the session directory", () => {
  const root = tempRoot();
  try {
    mkdirSync(join(root, "capability"), { recursive: true, mode: 0o700 });
    const sibling = createSessionStorage(root, "sibling-session", REPO, WORKTREE);
    const storage = createSessionStorage(root, "session-b", REPO, WORKTREE);

    const result = rollbackSessionStorage(storage, false);

    expect(result).toBe("removed");
    expect(existsSync(storage.sessionDir)).toBe(false);
    expect(existsSync(sibling.sessionDir)).toBe(true);
    expect(existsSync(join(root, "capability"))).toBe(true);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("rollback after session_open retains the directory", () => {
  const root = tempRoot();
  try {
    const storage = createSessionStorage(root, "session-c", REPO, WORKTREE);

    const result = rollbackSessionStorage(storage, true);

    expect(result).toBe("retained");
    expect(existsSync(storage.sessionDir)).toBe(true);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("rollback never targets the storage root", () => {
  const root = tempRoot();
  try {
    const storage: SessionStorage = {
      root,
      sessionDir: root,
      ledgerDir: join(root, "ledger"),
      artifactsDir: join(root, "artifacts"),
      sanitizedEvidenceDir: join(root, "sanitized-evidence"),
    };
    expect(() => rollbackSessionStorage(storage, false)).toThrow();
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("a session id containing a path separator is rejected", () => {
  const root = tempRoot();
  try {
    expect(() => createSessionStorage(root, "../escape", REPO, WORKTREE)).toThrow();
    expect(() => createSessionStorage(root, "a/b", REPO, WORKTREE)).toThrow();
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
