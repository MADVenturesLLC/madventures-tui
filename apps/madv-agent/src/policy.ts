// apps/madv-agent/src/policy.ts
// The boundary N3 inherits from DEC-20261017-04 Amendment 3: the project root
// is the permitted region. This module is the ONLY place a tool's target path
// is authorised, and it is called at USE time — immediately before the
// operation — so a path approved a moment ago and swapped since is caught.
//
// Containment, symlink rejection and traversal rejection are delegated to
// @madventures/policy (packages/policy), which already implements the
// fail-closed ordering: textual containment → lstat component walk → realpath
// containment. This module adds the two rules that package does not carry:
//   - the hard write-deny on `.madv-agent/**` and `.git/**` (the session stream
//     must not be forgeable by the agent that writes it, and git internals are
//     never the agent's to touch);
//   - use-time re-checking, so the path checked is the path used.

import { assertWithinAllowedPath } from "@madventures/policy";
import { lstatSync } from "node:fs";
import { isAbsolute, relative, resolve, sep } from "node:path";

/** Write targets refused even inside an allow-listed project root. */
export const HARD_DENY_WRITE = [".madv-agent", ".git"] as const;

export class PolicyRefusal extends Error {
  readonly reason: string;
  constructor(reason: string) {
    super(reason);
    this.name = "PolicyRefusal";
    this.reason = reason;
  }
}

export interface PathTarget {
  projectDir: string;
  path: string;
  mode: "read" | "write";
}

/**
 * Authorise one path against the project root. Returns the absolute path to
 * use; throws PolicyRefusal otherwise. Callers must use the returned value and
 * must call this at use time (see assertPathAtUse).
 */
export function assertPath({ projectDir, path, mode }: PathTarget): string {
  if (typeof path !== "string" || path.length === 0) {
    throw new PolicyRefusal("refused: empty path");
  }
  try {
    assertWithinAllowedPath(path, ["**"], projectDir);
  } catch {
    throw new PolicyRefusal(
      `refused: ${path} is outside the project root (${projectDir}) — an agent may only reach what it can see`,
    );
  }

  const abs = isAbsolute(path) ? resolve(path) : resolve(projectDir, path);
  const rel = relative(projectDir, abs);
  // `rel === ""` is the project root itself: a legitimate cwd for shell, and a
  // legitimate search scope, but never a write target.
  if (rel.startsWith("..") || isAbsolute(rel)) {
    throw new PolicyRefusal(`refused: ${path} is not inside the project root (${projectDir})`);
  }
  if (rel.length === 0) {
    if (mode === "write") throw new PolicyRefusal("refused: the project root is not a file to write");
    return abs;
  }

  if (mode === "write") {
    const top = rel.split(sep)[0] ?? "";
    if ((HARD_DENY_WRITE as readonly string[]).includes(top)) {
      throw new PolicyRefusal(
        `refused: writing to ${top}/** is forbidden — the session stream and git internals ` +
          `must not be writable by the agent that they record`,
      );
    }
  }
  return abs;
}

/**
 * Authorise AND confirm the path has not become a symlink since it was
 * approved. This is the use-time check the design §4 demands: no caller may
 * reuse an earlier decision.
 */
export function assertPathAtUse(target: PathTarget): string {
  const abs = assertPath(target);
  try {
    const st = lstatSync(abs);
    if (st.isSymbolicLink()) {
      throw new PolicyRefusal(
        `refused: ${abs} is a symlink at use time — it was checked as a regular path`,
      );
    }
  } catch (err) {
    if (err instanceof PolicyRefusal) throw err;
    const code = (err as NodeJS.ErrnoException).code;
    // A missing target is fine for a write (the file is about to be created);
    // for a read the tool surfaces its own not-found error.
    if (code !== "ENOENT") throw err;
  }
  return abs;
}

/** Shells are refused outright: the tool takes argv, never a command string. */
const SHELLS = ["sh", "bash", "zsh", "dash", "ksh", "fish", "csh", "tcsh"];

export function assertArgv(argv: unknown): string[] {
  if (!Array.isArray(argv) || argv.length === 0) {
    throw new PolicyRefusal("refused: shell requires a non-empty argv array");
  }
  const out: string[] = [];
  for (const a of argv) {
    if (typeof a !== "string") throw new PolicyRefusal("refused: shell argv entries must be strings");
    out.push(a);
  }
  const head = (out[0] ?? "").split("/").pop() ?? "";
  if (SHELLS.includes(head)) {
    throw new PolicyRefusal(
      `refused: ${head} is a shell — the shell tool runs argv directly and will not ` +
        `interpret a command string`,
    );
  }
  if (out.includes("-c")) {
    throw new PolicyRefusal("refused: `-c` is not accepted — the shell tool runs argv, not a script string");
  }
  return out;
}
