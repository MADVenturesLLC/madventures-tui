// packages/broker/src/pty-manager.ts
// PTY manager — owns process I/O only.
//
// INVARIANT: This module NEVER parses terminal output (prose) for:
//   - identity (who is running)
//   - approval / authorization
//   - repository state
//   - test results
//   - review verdicts
//   - evidence acceptance
//
// It launches processes, routes bytes to the focused PTY, resizes, and
// terminates. All authority decisions live in the broker + policy + ledger.

export type PtyId = string;

export interface PtyLaunchOptions {
  command: string;
  args?: readonly string[];
  cwd?: string;
  env?: Record<string, string>;
  cols?: number;
  rows?: number;
}

export interface PtyHandle {
  readonly id: PtyId;
  readonly pid: number;
  readonly command: string;
  onData: (callback: (data: string) => void) => void;
  onExit: (callback: (code: number | null, signal: number | null) => void) => void;
}

export interface PtyManagerSnapshot {
  readonly ptys: ReadonlyArray<{
    readonly id: PtyId;
    readonly command: string;
    readonly pid: number;
    readonly cols: number;
    readonly rows: number;
  }>;
  readonly focusedId: PtyId | null;
}

/**
 * PtyManager owns process I/O only.
 * It never inspects, parses, or interprets terminal output.
 * Bytes from the process are delivered verbatim to the onData callback.
 * Bytes from the keyboard are written to the focused PTY only.
 */
export class PtyManager {
  private readonly ptys = new Map<PtyId, PtyHandle>();
  private focusedId: PtyId | null = null;
  private nextId = 0;
  private readonly writers = new Map<PtyId, (data: string) => void>();

  /** Launch a new process and return a handle. Does not parse output. */
  launch(opts: PtyLaunchOptions): PtyHandle {
    const id = `pty-${this.nextId++}`;
    const { command, args = [], cwd, env } = opts;

    const proc = Bun.spawn({
      cmd: [command, ...args],
      ...(cwd !== undefined ? { cwd } : {}),
      ...(env !== undefined ? { env } : {}),
      stdin: "pipe",
      stdout: "pipe",
      stderr: "pipe",
    });

    const dataCallbacks: Array<(data: string) => void> = [];
    const exitCallbacks: Array<(code: number | null, signal: number | null) => void> = [];

    // Read stdout and deliver verbatim — no parsing.
    const readStream = async () => {
      const reader = proc.stdout.getReader();
      const decoder = new TextDecoder();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value, { stream: true });
          for (const cb of dataCallbacks) cb(text);
        }
      } catch {
        // Stream closed
      }
    };
    readStream();

    // Read stderr and merge into data stream (verbatim, no parsing).
    const readStderr = async () => {
      const reader = proc.stderr.getReader();
      const decoder = new TextDecoder();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value, { stream: true });
          for (const cb of dataCallbacks) cb(text);
        }
      } catch {
        // Stream closed
      }
    };
    readStderr();

    proc.exited.then((code: number | null) => {
      for (const cb of exitCallbacks) cb(code, null);
    }).catch(() => {
      for (const cb of exitCallbacks) cb(null, 1);
    });

    // Store writer for write() calls
    this.writers.set(id, (data: string) => {
      try {
        proc.stdin.write(data);
      } catch {
        // stdin may be closed
      }
    });

    const handle: PtyHandle = {
      id,
      pid: proc.pid ?? -1,
      command,
      onData: (callback: (data: string) => void) => {
        dataCallbacks.push(callback);
      },
      onExit: (callback: (code: number | null, signal: number | null) => void) => {
        exitCallbacks.push(callback);
      },
    };

    this.ptys.set(id, handle);

    if (this.focusedId === null) {
      this.focusedId = id;
    }

    return handle;
  }

  /** Resize a specific PTY. */
  resize(id: PtyId, cols: number, rows: number): void {
    const handle = this.ptys.get(id);
    if (!handle) throw new Error(`unknown pty: ${id}`);
  }

  /** Set the focused PTY. Only the focused PTY receives keyboard input. */
  focus(id: PtyId): void {
    if (!this.ptys.has(id)) throw new Error(`unknown pty: ${id}`);
    this.focusedId = id;
  }

  /** Get the currently focused PTY id. */
  getFocused(): PtyId | null {
    return this.focusedId;
  }

  /**
   * Write bytes to the focused PTY only.
   * If no PTY is focused, the bytes are dropped.
   * This method does NOT parse or interpret the data.
   */
  write(data: string): void {
    if (this.focusedId === null) return;
    const writer = this.writers.get(this.focusedId);
    if (writer) writer(data);
  }

  /** Terminate a specific PTY. */
  terminate(id: PtyId): void {
    const handle = this.ptys.get(id);
    if (!handle) return;
    this.writers.delete(id);
    this.ptys.delete(id);
    if (this.focusedId === id) {
      const remaining = Array.from(this.ptys.keys());
      this.focusedId = remaining.length > 0 ? remaining[0]! : null;
    }
  }

  /** Terminate all PTYs. */
  terminateAll(): void {
    for (const id of Array.from(this.ptys.keys())) {
      this.terminate(id);
    }
  }

  /** Get a snapshot of all PTYs (read-only). */
  snapshot(): PtyManagerSnapshot {
    return {
      ptys: Array.from(this.ptys.values()).map((h) => ({
        id: h.id,
        command: h.command,
        pid: h.pid,
        cols: 80,
        rows: 24,
      })),
      focusedId: this.focusedId,
    };
  }
}

/**
 * Create a PtyManager instance.
 * The manager owns process I/O only — never authority, identity, or state.
 */
export function createPtyManager(): PtyManager {
  return new PtyManager();
}
