// test/phase3a/negative-control.ts
// Task 34 (M14) — the broker.sock negative control (plan §M14 Task 34 and
// the negative-control scope note): a bounded, symlink-safe filesystem
// sweep proving no `broker.sock` exists under the three governed roots.
//
// Scope (deliberate): it asserts absence under these roots only — NOT "no
// socket anywhere on the machine" (broader than the §4.4 invariant, and an
// unbounded scan would silently swallow permission errors). The structural
// guarantee that no such path is REACHABLE is carried by the architecture
// tests; this sweep is the complementary observation.
//
// Roots (depth-bounded to 6 directory levels, entries inside a depth-6
// directory are checked; a socket one level deeper is NOT reported):
//   1. the resolved storage root — MADV_STORAGE_DIR override, else the
//      passwd home (os.userInfo().homedir, matching packages/storage home.ts;
//      process.env.HOME is never consulted);
//   2. the fixed literal quarantined legacy path /tmp/madv-broker-runtime;
//   3. the repository worktree (derived from this module's committed
//      location, never process.cwd()).
//
// MADV_RUNTIME_DIR is deliberately NEVER read (r4 quarantine: runtime dirs
// are not an audit root).
//
// Also checks (§5.1): <storage-root>/runtime is absent; if present it is
// named and treated as a violation.
//
// Output: one `broker_sock_matches[<root>]=<n>` line per root plus every
// hit named on its own line; exit 1 on any hit or violation, else 0.

import { readdirSync, lstatSync, existsSync, realpathSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { userInfo } from "node:os";

const MAX_DEPTH = 6;
const SOCKET_NAME = "broker.sock";
const LEGACY_ROOT = "/tmp/madv-broker-runtime";

const MODULE_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(MODULE_DIR, "..", "..");

function storageRoot(): string {
  const override = process.env.MADV_STORAGE_DIR;
  if (override && override.length > 0) return override;
  return realpathSync(userInfo().homedir);
}

interface Sweep {
  matches: string[];
  errors: string[];
}

function isSymbolicLink(path: string): boolean {
  try {
    return lstatSync(path).isSymbolicLink();
  } catch {
    return false;
  }
}

/** Walk one root up to MAX_DEPTH directory levels, collecting broker.sock hits. */
function sweep(root: string): Sweep {
  const matches: string[] = [];
  const errors: string[] = [];

  const walk = (dir: string, depth: number): void => {
    let entries: string[];
    try {
      entries = readdirSync(dir);
    } catch (err) {
      // Permission/IO failures are REPORTED, never swallowed silently.
      errors.push(`${dir}: ${(err as Error).message}`);
      return;
    }
    for (const entry of entries) {
      const full = join(dir, entry);
      // Symlinks are skipped without following — in either role.
      if (isSymbolicLink(full)) continue;
      if (entry === SOCKET_NAME) {
        matches.push(full);
        continue;
      }
      if (depth < MAX_DEPTH) {
        try {
          if (lstatSync(full).isDirectory()) walk(full, depth + 1);
        } catch {
          // Non-directory or vanished between calls: not a directory to walk.
        }
      }
    }
  };

  if (existsSync(root)) walk(root, 0);
  return { matches, errors };
}

function main(): number {
  const roots: Array<{ label: string; path: string }> = [
    { label: "storage-root", path: storageRoot() },
    { label: "legacy-quarantine", path: LEGACY_ROOT },
    { label: "repo-worktree", path: REPO_ROOT },
  ];

  let violations = 0;
  for (const root of roots) {
    const result = sweep(root.path);
    console.log(`broker_sock_matches[${root.label}]=${result.matches.length}`);
    for (const hit of result.matches) {
      console.log(`  hit: ${hit}`);
    }
    for (const err of result.errors) {
      // Reported, never silently swallowed — but an unreadable directory is
      // an observation, not a finding: the plan's exit rule is "exits 1 if
      // anything is found", and a real home-directory sweep legitimately
      // encounters permission-denied paths (e.g. ~/Library subdirs).
      console.log(`  unreadable: ${err}`);
    }
    violations += result.matches.length;
  }

  // §5.1: the storage root must not carry a runtime directory.
  const storageRuntime = join(storageRoot(), "runtime");
  if (existsSync(storageRuntime)) {
    console.log(`runtime-dir-present[storage-root]=${storageRuntime}`);
    violations += 1;
  }

  if (violations > 0) {
    console.log(`negative-control: FAIL (${violations} violation${violations === 1 ? "" : "s"})`);
    return 1;
  }
  console.log("negative-control: PASS (no broker.sock under any governed root)");
  return 0;
}

process.exit(main());
