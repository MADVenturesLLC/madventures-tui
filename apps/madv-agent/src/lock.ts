// apps/madv-agent/src/lock.ts
// One active session per project directory (design §2). The lock file
// .madv-agent/lock makes a second concurrent instance refuse to start, so two
// processes can never write one event stream.
//
// Creation is atomic WITH content (D5): the pid is written to a unique temp
// file first, then hard-linked onto the lock path — link(2) fails with EEXIST
// if the lock exists, so the lock file can never be observed empty. A reader
// therefore always sees a holder pid; an unparseable lock is corruption, not
// a creation window, and is reclaimed.

import { linkSync, mkdirSync, readFileSync, rmSync, unlinkSync, writeFileSync, existsSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { join } from "node:path";

export function lockPath(projectDir: string): string {
  return join(projectDir, ".madv-agent", "lock");
}

export class LockHeldError extends Error {
  readonly path: string;
  readonly holderPid: number;

  constructor(path: string, holderPid: number) {
    super(
      `another madv-agent instance is already running in this project ` +
        `(pid ${holderPid}, lock ${path}) — refusing to start a second concurrent session`,
    );
    this.name = "LockHeldError";
    this.path = path;
    this.holderPid = holderPid;
  }
}

function processAlive(pid: number): boolean {
  try {
    // signal 0: existence probe only.
    process.kill(pid, 0);
    return true;
  } catch (err) {
    return (err as NodeJS.ErrnoException).code === "EPERM";
  }
}

export function readHolderPid(path: string): number | null {
  try {
    const raw = readFileSync(path, "utf8").trim();
    const pid = Number.parseInt(raw, 10);
    return Number.isInteger(pid) ? pid : null;
  } catch {
    return null;
  }
}

export interface ProjectLock {
  path: string;
  release: () => void;
}

/**
 * Acquire the project lock. Refuses while a live process holds it; a lock
 * left by a dead process (crash) is stale and may be reclaimed.
 */
export function acquireProjectLock(projectDir: string): ProjectLock {
  const path = lockPath(projectDir);
  const parent = join(path, "..");
  mkdirSync(parent, { recursive: true });

  for (let attempt = 0; attempt < 2; attempt++) {
    // D5: write the pid into a unique temp file FIRST, then link(2) it onto
    // the lock path. link is atomic and fails with EEXIST when the lock
    // exists, so content and creation are one step — no empty-lock window.
    const temp = join(parent, `.lock.${process.pid}.${randomUUID()}`);
    writeFileSync(temp, `${process.pid}\n`);
    let linked = false;
    try {
      try {
        linkSync(temp, path);
        linked = true;
      } catch (err) {
        if ((err as NodeJS.ErrnoException).code !== "EEXIST") throw err;
      }
    } finally {
      unlinkSync(temp);
    }

    if (!linked) {
      const holder = readHolderPid(path);
      if (holder === null) {
        // Unparseable lock: corrupt (never a creation window — see above),
        // reclaim.
        rmSync(path, { force: true });
        continue;
      }
      // Any live holder refuses — including this process: two instances in
      // one process is exactly what the lock exists to prevent.
      if (processAlive(holder)) {
        throw new LockHeldError(path, holder);
      }
      // Stale (dead holder): reclaim.
      rmSync(path, { force: true });
      continue;
    }

    let released = false;
    return {
      path,
      release: () => {
        if (released) return;
        released = true;
        const current = readHolderPid(path);
        if (current === process.pid) rmSync(path, { force: true });
      },
    };
  }
  throw new LockHeldError(path, readHolderPid(path) ?? -1);
}

/** Whether a lock file currently exists (does not probe liveness). */
export function lockExists(projectDir: string): boolean {
  return existsSync(lockPath(projectDir));
}
