// packages/pty-host/src/launch.ts
// Task 42: gap-free launch with adjacent-to-`exec` artifact re-hash.
//
// The host re-hashes the same absolute path directly before `exec` (§2.2),
// with no storage, broker, or lifeline step between the final verification
// and that child's `exec` (§2.1). The TOCTOU window is one syscall wide and
// no child exists outside a death-watch (§3.3).

import { readFileSync } from "node:fs";
import { spawnGoverned } from "./terminal";
import type { GovernedSession } from "./terminal";
import type { HostCommandFrame } from "./frames";

/** Thrown when the artifact's hash at launch time differs from the authorized hash. */
export class ArtifactHashMismatch extends Error {
  constructor(path: string, expected: string, actual: string) {
    super(`artifact hash mismatch for ${path}: expected ${expected}, got ${actual}`);
    this.name = "ArtifactHashMismatch";
  }
}

/**
 * Injectable dependency seam for deterministic tests. The default `spawn`
 * creates a real governed session; tests substitute fakes so no real
 * process is ever created. `trace` records the ordered call sequence so the
 * "exactly `hash` then `exec`" invariant is provable without a real PTY.
 */
export interface LaunchDeps {
  readonly hashFile: (path: string) => string;
  readonly spawn: (
    path: string,
    argv: readonly string[],
    env: Readonly<Record<string, string>>,
  ) => GovernedSession;
  readonly trace?: (step: string) => void;
}

const defaultDeps: LaunchDeps = {
  hashFile: (path) => new Bun.CryptoHasher("sha256").update(readFileSync(path)).digest("hex"),
  spawn: (path, argv, env) => spawnGoverned(path, argv, env, () => {}),
  trace: () => {},
};

/**
 * Verifies the artifact hash immediately before spawn, then launches the
 * child in a new PTY/session/process group. Returns the launch facts the
 * supervisor reports: host PID, child PID, and child PGID.
 *
 * The ordered call trace is exactly `hash` then `exec`: nothing (no
 * storage, broker, or lifeline step) may sit between the final verification
 * and the child's `exec`. On mismatch, throws `ArtifactHashMismatch` and no
 * child is created.
 */
export function verifyAndLaunch(
  frame: Extract<HostCommandFrame, { kind: "launch" }>,
  deps: Partial<LaunchDeps> = {},
): { readonly hostPid: number; readonly childPid: number; readonly pgid: number; readonly session: GovernedSession } {
  const hashFile = deps.hashFile ?? defaultDeps.hashFile;
  const spawn = deps.spawn ?? defaultDeps.spawn;
  const trace = deps.trace ?? (() => {});

  // Adjacent-to-exec re-hash: the artifact is hashed immediately before
  // spawn, with no intervening storage, broker, or lifeline call.
  const actual = hashFile(frame.path);
  trace("hash");
  if (actual !== frame.sha256) {
    throw new ArtifactHashMismatch(frame.path, frame.sha256, actual);
  }
  const session = spawn(frame.path, frame.argv, frame.env);
  trace("exec");
  return { hostPid: process.pid, childPid: session.child.pid, pgid: session.pgid, session };
}
