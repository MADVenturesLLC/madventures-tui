// packages/tui-chaos/src/pty/session.ts
// Bun-side client for the node PTY bridge (bridge.mjs).
//
// The harness runs under Bun; node-pty events only work under Node, so all
// PTY traffic is tunneled through a short-lived `node bridge.mjs` child that
// speaks JSON lines on stdio (see bridge.mjs for the protocol). This module
// hides that detail behind a plain PtySession interface.

import { spawn as bunSpawn, type Subprocess } from "bun";
import { createHash } from "node:crypto";

export interface PtySpawnOptions {
  file: string;
  args: string[];
  cwd: string;
  env: Record<string, string>;
  cols: number;
  rows: number;
}

export interface PtyExit {
  exitCode: number | null;
  signal: string | null;
}

export interface PtySession {
  readonly pid: number;
  onData(cb: (data: string) => void): void;
  write(data: string): void;
  resize(cols: number, rows: number): void;
  kill(signal?: string): void;
  close(): Promise<void>;
  exit: Promise<PtyExit>;
}

/** Locate a `node` binary able to run the bridge. Bun cannot host node-pty. */
export function findNodeRuntime(): string {
  const which = (globalThis as { Bun?: { which(cmd: string): string | null } }).Bun?.which;
  if (typeof which === "function") {
    const found = which("node");
    if (found) return found;
  }
  throw new Error(
    "tui-chaos PTY transport needs a `node` binary on PATH (the node-pty addon " +
      "does not deliver events under the Bun runtime). Install Node.js >= 20 " +
      "and retry.",
  );
}

export function bridgePath(): string {
  return new URL("./bridge.mjs", import.meta.url).pathname;
}

export async function openPtySession(opts: PtySpawnOptions): Promise<PtySession> {
  const nodeBin = findNodeRuntime();
  const proc = bunSpawn([nodeBin, bridgePath()], {
    stdin: "pipe",
    stdout: "pipe",
    stderr: "pipe",
  });

  const dataCallbacks: Array<(data: string) => void> = [];
  let lineBuffer = "";
  let spawnedResolve!: (pid: number) => void;
  let spawnedReject!: (err: Error) => void;
  const spawned = new Promise<number>((res, rej) => {
    spawnedResolve = res;
    spawnedReject = rej;
  });
  let exitResolve!: (exit: PtyExit) => void;
  const exit = new Promise<PtyExit>((res) => {
    exitResolve = res;
  });
  let sawExit = false;

  const sendLine = (obj: unknown) => {
    proc.stdin.write(JSON.stringify(obj) + "\n");
  };

  // Drain bridge stdout: JSON lines with base64 data payloads.
  const pump = async () => {
    const reader = proc.stdout.getReader();
    const decoder = new TextDecoder();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      lineBuffer += decoder.decode(value, { stream: true });
      let idx: number;
      while ((idx = lineBuffer.indexOf("\n")) >= 0) {
        const line = lineBuffer.slice(0, idx);
        lineBuffer = lineBuffer.slice(idx + 1);
        if (line.trim().length === 0) continue;
        let msg: {
          ev: string;
          pid?: number;
          data?: string;
          exitCode?: number | null;
          signal?: string | null;
          message?: string;
        };
        try {
          msg = JSON.parse(line);
        } catch {
          continue;
        }
        switch (msg.ev) {
          case "spawned":
            spawnedResolve(msg.pid ?? -1);
            break;
          case "data":
            if (msg.data !== undefined) {
              const text = Buffer.from(msg.data, "base64").toString("utf8");
              for (const cb of dataCallbacks) cb(text);
            }
            break;
          case "exit":
            sawExit = true;
            exitResolve({ exitCode: msg.exitCode ?? null, signal: msg.signal ?? null });
            break;
          case "error":
            spawnedReject(new Error(msg.message ?? "bridge error"));
            break;
          default:
            break;
        }
      }
    }
  };
  void pump();

  // Surface bridge startup failures (missing node, crash, protocol error).
  void (async () => {
    const stderrText = await new Response(proc.stderr).text();
    if (!sawExit && stderrText.trim().length > 0) {
      spawnedReject(new Error(`bridge stderr: ${stderrText.trim().slice(0, 500)}`));
    }
  })();

  proc.exited.then((code) => {
    if (!sawExit) {
      sawExit = true;
      exitResolve({ exitCode: code ?? null, signal: null });
      spawnedReject(new Error(`bridge exited before spawn (code ${code ?? "null"})`));
    }
  });

  sendLine({
    op: "spawn",
    file: opts.file,
    args: opts.args,
    cwd: opts.cwd,
    env: opts.env,
    cols: opts.cols,
    rows: opts.rows,
  });
  const pid = await spawned;

  const session: PtySession = {
    pid,
    onData(cb) {
      dataCallbacks.push(cb);
    },
    write(data) {
      sendLine({ op: "write", data: Buffer.from(data, "utf8").toString("base64") });
    },
    resize(cols, rows) {
      sendLine({ op: "resize", cols, rows });
    },
    kill(signal) {
      sendLine({ op: "kill", signal: signal ?? "SIGTERM" });
    },
    async close() {
      sendLine({ op: "close" });
      await exit;
      try {
        proc.stdin.end();
      } catch {
        // Bridge may already be gone.
      }
    },
    exit,
  };
  return session;
}

/** Stable sha256 over the full grid text — used for golden fixtures. */
export function sha256(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

// Re-exported for consumers that want the subprocess type visible.
export type { Subprocess as BridgeSubprocess };
