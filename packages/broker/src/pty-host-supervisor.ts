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
// §3.2 descriptor contract (lifeline): the host's stdin is simultaneously
// its private framed command stream and its death lifeline — EOF means the
// supervisor is gone or has deliberately revoked the child. The supervisor
// therefore holds the SOLE write end:
//
//   - The write end is a `FileSink` created by `Bun.spawn` with
//     `stdin: "pipe"`. It exists only in the supervisor process; no child,
//     sibling host, or adapter ever receives a duplicate (close-on-exec
//     hygiene by construction: Bun marks spawned pipe fds close-on-exec,
//     and no code path dups the fd elsewhere).
//   - The supervisor closes the write end exactly when the session ends
//     (`closeStdin` — the deliberate lifeline EOF kill switch) or dies;
//     in both cases the host's stdin read returns EOF and §3.4's
//     lifeline-EOF termination applies (wired in Task 43).
//   - No unintended duplicates are created: no other descriptor, stream,
//     or reference to the write end exists inside the supervisor.
//
// The child cannot exist before its death-watch. The supervisor treats host
// exit as governed-child death and interrupts the whole session — the fact
// stream ends when the host's stdout closes.

// NOTE (environment allowlist, §3.2/§5.4/PLAN-OPEN-2): the host is spawned
// with EXACTLY the descriptor's environment — no ambient variable crosses
// from the supervisor into the host. The supervisor resolves the host
// executable to an absolute path before spawning so a minimal environment
// cannot break resolution; the governed child's environment is the
// descriptor's allowlisted environment, forwarded verbatim by the host.

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { decodeFact, encodeCommand } from "./pty-host-protocol";
import type { HostCommandFrame, HostFactFrame } from "./pty-host-protocol";

const MODULE_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(MODULE_DIR, "..", "..", "..");
const HOST_ENTRY = "packages/pty-host/src/main.ts";

/** The bun executable, resolved once at module load. */
const BUN_EXECUTABLE: string = process.execPath;

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
 * (deliberate lifeline EOF); `killPgid` is the direct-PGID containment
 * primitive the wedged-host escalation path (Task 44) uses.
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
 * host's fd 0), the write end supervisor-owned, and the launch frame sent
 * immediately. The fact stream ends when the host exits — the death-watch
 * observable that makes host exit equivalent to governed-child death.
 *
 * Environment (§3.2/§5.4): the host receives EXACTLY `descriptor.env` plus
 * nothing — no ambient supervisor variable is inherited. The host
 * executable is resolved to an absolute path (`process.execPath`) so the
 * minimal environment cannot break spawning; the governed child inside the
 * host then receives the descriptor's allowlisted environment verbatim.
 */
export function spawnPtyHost(descriptor: HostLaunchDescriptor): PtyHostHandle {
  // §3.3 step 2: the lifeline read end is inherited at birth via the
  // spawned process's fd 0; the write end (below) exists only here.
  const proc = Bun.spawn([BUN_EXECUTABLE, HOST_ENTRY], {
    cwd: REPO_ROOT,
    stdin: "pipe",
    stdout: "pipe",
    stderr: "pipe",
    // Allowlisted environment ONLY — ambient inheritance is prohibited.
    env: { ...descriptor.env },
  });

  // §3.3 step 3: the supervisor holds the sole write end. `proc.stdin` is
  // the only reference to the write end in this (or any) process; it is
  // never duplicated, never leaked to a child, and closed exactly once on
  // deliberate EOF. Stdout/stderr remain the fact and diagnostics channels.
  const stdinSink = proc.stdin;
  if (stdinSink === undefined) {
    // The write end does not exist — the lifeline cannot be established.
    // Fail closed before any command is sent.
    try {
      proc.kill();
    } catch {
      // Already gone.
    }
    throw new Error("pty-host supervisor: host stdin is not a writable lifeline");
  }

  // §3.3 step 4: the first frame over the lifeline is the authorized
  // launch descriptor — the host receives the authorized absolute path,
  // expected hash, arguments, environment, and identity before anything
  // else.
  stdinSink.write(
    encodeCommand({
      kind: "launch",
      path: descriptor.path,
      sha256: descriptor.sha256,
      argv: descriptor.argv,
      env: descriptor.env,
      executionId: descriptor.executionId,
    }),
  );
  stdinSink.flush();

  // §3.3 step 8: normal commands ride the same framed lifeline.
  const send = (f: HostCommandFrame): void => {
    stdinSink.write(encodeCommand(f));
    stdinSink.flush();
  };

  // Deliberate lifeline EOF (§3.4 second kill switch): ends the host's
  // stdin; Task 43 wires the host-side EOF handler that terminates the
  // child's process group in response.
  const closeStdin = (): void => {
    stdinSink.end();
    stdinSink.flush();
  };

  let reportedPgid: number | null = null;

  const facts = async function* (): AsyncGenerator<HostFactFrame> {
    for await (const frame of factStream(proc)) {
      if (frame.kind === "launched") reportedPgid = frame.pgid;
      yield frame;
    }
  };

  return {
    hostPid: proc.pid,
    send,
    facts,
    closeStdin,
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