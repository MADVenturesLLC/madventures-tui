// apps/madv-agent/src/lock.ts
// One active session per project directory (design §2). The lock file
// .madv-agent/lock makes a second concurrent instance refuse to start, so two
// processes can never write one event stream.

import {
  closeSync,
  mkdirSync,
  openSync,
  readFileSync,
  rmSync,
  writeSync,
  existsSync,
} from "node:fs";
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

function readHolderPid(path: string): number | null {
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
    let fd: number;
    try {
      // O_CREAT|O_EXCL: creation is the lock — atomic on local filesystems.
      fd = openSync(path, "wx");
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== "EEXIST") throw err;
      const holder = readHolderPid(path);
      if (holder === null) {
        // Unparseable lock: stale, reclaim.
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
    try {
      writeSync(fd, `${process.pid}\n`);
    } finally {
      closeSync(fd);
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
