// packages/storage/src/storage-root.ts
// The single storage-root validator (spec §5.1, §5.2, §4.4).
//
// One validator governs both the default root and the MADV_STORAGE_DIR
// override; there is no relaxed test-only path. Validation is pure and
// side-effect free - it never creates the proposed path. MADV_RUNTIME_DIR
// is quarantined (§4.4) and is never read by storage resolution.

import { accessSync, constants, lstatSync, realpathSync, statSync } from "node:fs";
import { isAbsolute, join, sep } from "node:path";
import { resolvePasswdHome } from "./home";

export type StorageRootFailure =
  | "not_absolute"
  | "inside_repository"
  | "symlink_component"
  | "not_owned_by_uid"
  | "group_or_other_accessible"
  | "realpath_unstable"
  | "not_writable_local";

export const STORAGE_SUBDIRECTORIES = ["sessions", "capability"] as const;

export function proposeStorageRoot(
  env: NodeJS.ProcessEnv,
  _repositoryRoot: string,
  _worktree: string,
): string {
  const override = env.MADV_STORAGE_DIR;
  if (override !== undefined) {
    return override;
  }
  return join(resolvePasswdHome(), "Library", "Application Support", "MADVentures", "madventures-tui");
}

export function validateStorageRoot(
  path: string,
  repositoryRoot: string,
  worktree: string,
): { readonly ok: true } | { readonly ok: false; readonly failure: StorageRootFailure } {
  if (!isAbsolute(path)) {
    return { ok: false, failure: "not_absolute" };
  }

  if (isInsideBoundary(path, repositoryRoot) || isInsideBoundary(path, worktree)) {
    return { ok: false, failure: "inside_repository" };
  }

  let existing = "";
  for (const candidate of ancestorPaths(path)) {
    let info;
    try {
      info = lstatSync(candidate);
    } catch {
      break;
    }
    if (info.isSymbolicLink()) {
      return { ok: false, failure: "symlink_component" };
    }
    existing = candidate;
  }

  // ancestorPaths() always yields "/" first for an absolute path, and "/"
  // always exists, so existing is never empty here. Fail closed rather
  // than silently accepting a path with no verifiable ancestor.
  if (existing === "") {
    throw new Error(`validateStorageRoot: no existing ancestor found for ${path}`);
  }

  const stat = statSync(existing);

  // POSIX-only (macOS): process.getuid is typed optional only for Windows.
  if (stat.uid !== process.getuid!()) {
    return { ok: false, failure: "not_owned_by_uid" };
  }

  if ((stat.mode & 0o077) !== 0) {
    return { ok: false, failure: "group_or_other_accessible" };
  }

  if (realpathSync(existing) !== existing) {
    return { ok: false, failure: "realpath_unstable" };
  }

  try {
    accessSync(existing, constants.W_OK);
  } catch {
    return { ok: false, failure: "not_writable_local" };
  }

  return { ok: true };
}

function isInsideBoundary(path: string, boundary: string): boolean {
  const normalizedBoundary = boundary.endsWith(sep) ? boundary : boundary + sep;
  return path === boundary || path.startsWith(normalizedBoundary);
}

/**
 * Cumulative ancestor paths from the filesystem root down, e.g.
 * "/a/b/c" -> ["/", "/a", "/a/b", "/a/b/c"]. The root is always included:
 * without it, a proposed path whose first named component does not exist
 * (e.g. "/newtop/dir") walked no candidates at all, leaving the deepest
 * existing ancestor empty and skipping every ownership/mode/realpath
 * check entirely.
 */
function ancestorPaths(path: string): string[] {
  const parts = path.split(sep).filter((part) => part.length > 0);
  const acc: string[] = [sep];
  let current = "";
  for (const part of parts) {
    current = current + sep + part;
    acc.push(current);
  }
  return acc;
}
