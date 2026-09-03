// packages/storage/src/session-storage.ts
// Transactional session-directory creation and bounded rollback
// (spec §5.2, §9.6, §5.7).
//
// session_open is the durable boundary: before it a newly created
// session directory may be removed; after it the directory persists
// and receives session_abort. Capability records are never deleted
// by startup rollback, and Phase 3A never automatically deletes
// session or capability storage.

import { mkdirSync, rmSync } from "node:fs";
import { join, sep } from "node:path";
import { validateStorageRoot } from "./storage-root";

const SESSION_ID_PATTERN = /^[A-Za-z0-9_-]{1,128}$/;

export interface SessionStorage {
  readonly root: string;
  readonly sessionDir: string;
  readonly ledgerDir: string;
  readonly artifactsDir: string;
  readonly sanitizedEvidenceDir: string;
}

export function createSessionStorage(
  root: string,
  sessionId: string,
  repositoryRoot: string,
  worktree: string,
): SessionStorage {
  if (!SESSION_ID_PATTERN.test(sessionId)) {
    throw new Error(`session id is not filesystem-safe: ${sessionId}`);
  }

  const sessionDir = join(root, "sessions", sessionId);
  const ledgerDir = join(sessionDir, "ledger");
  const artifactsDir = join(sessionDir, "artifacts");
  const sanitizedEvidenceDir = join(sessionDir, "sanitized-evidence");

  // Validate before any filesystem mutation - validateStorageRoot is pure
  // preflight and creates nothing, so an invalid root or a symlink planted
  // above sessionDir is rejected before we ever create or traverse it.
  const preflight = validateStorageRoot(sessionDir, repositoryRoot, worktree);
  if (!preflight.ok) {
    throw new Error(`session storage failed preflight validation: ${preflight.failure}`);
  }

  for (const dir of [sessionDir, ledgerDir, artifactsDir, sanitizedEvidenceDir]) {
    mkdirSync(dir, { recursive: true, mode: 0o700 });
  }

  // Revalidate what was actually created (spec §5.2): closes the TOCTOU
  // window between the preflight check above and this creation.
  const revalidation = validateStorageRoot(sessionDir, repositoryRoot, worktree);
  if (!revalidation.ok) {
    rmSync(sessionDir, { recursive: true, force: true });
    throw new Error(`session storage failed revalidation: ${revalidation.failure}`);
  }

  return { root, sessionDir, ledgerDir, artifactsDir, sanitizedEvidenceDir };
}

export function rollbackSessionStorage(
  storage: SessionStorage,
  sessionOpenDurable: boolean,
): "removed" | "retained" {
  if (storage.sessionDir === storage.root) {
    throw new Error("rollback must not target the storage root");
  }

  const boundary = join(storage.root, "sessions") + sep;
  if (!storage.sessionDir.startsWith(boundary)) {
    throw new Error(`session directory is not under ${boundary}: ${storage.sessionDir}`);
  }

  if (sessionOpenDurable) {
    return "retained";
  }

  rmSync(storage.sessionDir, { recursive: true, force: true });
  return "removed";
}
