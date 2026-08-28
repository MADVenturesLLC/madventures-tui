// packages/broker/src/pty-host-supervisor.ts
// Task 42: the broker-side PTY-host supervisor.
//
// §3.3 gap-free launch ordering, supervisor side:
//  1. The supervisor creates the anonymous channel.
//  2. It spawns the PTY host with the lifeline read end inherited at birth
//     and an allowlisted environment.
//  3. It closes every unintended duplicate descriptor and monitors host exit.
//  4. The host receives the authorized absolute path, expected hash,
//     arguments, environment, and identity.
//  5. Directly before `exec`, the host verifies the artifact hash.
//  6. The host creates the PTY/session/process group and launches the child.
//  7. The host reports host PID, child PID, child PGID, identity, and
//     readiness.
//  8. The broker begins normal input, output, resize, and termination
//     commands.
//
// The child cannot exist before its death-watch. The supervisor treats host
// exit as governed-child death and interrupts the whole session — the fact
// stream ends when the host's stdout closes.

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { decodeFact, encodeCommand } from "./pty-host-protocol";
import type { HostCommandFrame, HostFactFrame } from "./pty-host-protocol";

const MODULE_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(MODULE_DIR, "..", "..", "..");
const HOST_ENTRY = "packages/pty-host/src/main.ts";

/** The authorized launch descriptor the supervisor hands the host. */
export interface HostLaunchDescriptor {
  readonly path: string;
  readonly sha256: string;
  readonly argv: readonly string[];
  readonly env: Readonly<Record<string, string>>;
  readonly executionId: string;
}

/**
 * The supervisor's handle on one PTY host. `send` writes a command frame
 * over the lifeline (the host's stdin); `facts` is the decoded fact stream
 * from the host's stdout; `closeStdin` is the second per-child kill switch
 * (lifeline EOF); `killPgid` is the direct-PGID containment primitive the
 * wedged-host escalation path (Task 44) uses.
 */
export interface PtyHostHandle {
  readonly hostPid: number;
  send(f: HostCommandFrame): void;
  facts(): AsyncIterable<HostFactFrame>;
  closeStdin(): void;
  killPgid(): void;
}

function concatBytes(a: Uint8Array<ArrayBuffer>, b: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> {
  const out = new Uint8Array(a.byteLength + b.byteLength);
  out.set(a, 0);
  out.set(b, a.byteLength);
  return out;
}

async function* factStream(proc: Bun.Subprocess): AsyncGenerator<HostFactFrame> {
  const stdout = proc.stdout;
  if (stdout === undefined || typeof stdout === "number") {
    // stdout was not piped — the host cannot produce facts. This is a
    // supervisor construction error, not a runtime condition.
    throw new Error("pty-host supervisor: host stdout is not a stream");
  }
  const reader = stdout.getReader();
  let buffer: Uint8Array<ArrayBuffer> = new Uint8Array(0);
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer = concatBytes(buffer, new Uint8Array(value));
      for (;;) {
        const decoded = decodeFact(buffer);
        if (decoded === null) break;
        yield decoded.frame;
        buffer = buffer.subarray(decoded.consumed);
      }
    }
  } finally {
    reader.releaseLock();
  }
}

/**
 * Spawns the PTY host with the lifeline read end inherited at birth (the
 * host's stdin), the write end supervisor-owned, and the launch frame sent
 * immediately. The fact stream ends when the host exits — the death-watch
 * observable.
 */
export function spawnPtyHost(descriptor: HostLaunchDescriptor): PtyHostHandle {
  const proc = Bun.spawn(["bun", HOST_ENTRY], {
    cwd: REPO_ROOT,
    stdin: "pipe",
    stdout: "pipe",
    stderr: "pipe",
    env: { ...process.env },
  });

  // The first frame over the lifeline is the authorized launch descriptor.
  proc.stdin.write(
    encodeCommand({
      kind: "launch",
      path: descriptor.path,
      sha256: descriptor.sha256,
      argv: descriptor.argv,
      env: descriptor.env,
      executionId: descriptor.executionId,
    }),
  );

  let reportedPgid: number | null = null;

  const facts = async function* (): AsyncGenerator<HostFactFrame> {
    for await (const frame of factStream(proc)) {
      if (frame.kind === "launched") reportedPgid = frame.pgid;
      yield frame;
    }
  };

  return {
    hostPid: proc.pid,
    send: (f) => {
      proc.stdin.write(encodeCommand(f));
    },
    facts,
    closeStdin: () => {
      proc.stdin.end();
    },
    killPgid: () => {
      if (reportedPgid !== null) {
        try {
          process.kill(-reportedPgid, "SIGKILL");
        } catch {
          // Group already gone.
        }
      }
    },
  };
}
