// packages/pty-host/src/terminal.ts
// Minimal Bun.Terminal wrapper: one PTY, one governed child. No workspace
// imports — private infrastructure, closed operation set only.

/**
 * `Bun.Terminal`'s `exit` callback reports PTY lifecycle status, not the
 * subprocess exit code: `exitCode === 0` is a clean EOF, `exitCode === 1` is
 * a PTY read error. A read error is not a successful closure and must not
 * be treated as one.
 *
 * Authoritative contract (bun-types 1.3.14, bun.d.ts:7789): "Callback invoked
 * when the PTY stream closes (EOF or read error). Note: exitCode is a PTY
 * lifecycle status (0=clean EOF, 1=error), NOT the subprocess exit code. Use
 * Subprocess.exited or onExit callback for actual process exit information."
 *
 * Corroborating spike evidence (test/phase3a/spike/bun-terminal-spike.ts,
 * descriptor-hygiene criterion): the same child (`/bin/cat`, which exits 0)
 * reports `code:0` (EOF) on macOS and `code:1` (EIO on the slave read) on
 * Linux — the reported value tracks the PTY's read representation, not the
 * child's exit code. The child's authoritative exit code is read from
 * `Bun.Subprocess.exitCode`/`signalCode` after reaping, never from this
 * callback.
 */
export class PtyReadError extends Error {
  constructor(exitCode: number, signal: string | null) {
    super(`PTY lifecycle reported a read error (exitCode=${exitCode}, signal=${signal ?? "null"})`);
    this.name = "PtyReadError";
  }
}

export interface GovernedSession {
  readonly terminal: Bun.Terminal;
  readonly child: Bun.Subprocess;
  // A `detached: true` spawn makes the child the leader of its own new
  // process group, so its pgid equals its pid at spawn time.
  readonly pgid: number;
  /**
   * Settles once `Bun.Terminal`'s own `exit` lifecycle callback fires — PTY
   * EOF/read closure, which is distinct from `Bun.Subprocess.exited` (child
   * process reaping) and, empirically, fires strictly after every `data`
   * callback the PTY will ever deliver. This is the only reliable "no
   * further output callback can occur" signal; a fixed quiet interval since
   * the last callback is not — it can only prove nothing has arrived *yet*,
   * never that nothing more will.
   *
   * Resolves only on a clean EOF (`exitCode === 0`); rejects with
   * `PtyReadError` on a PTY read error (`exitCode === 1`) — a non-clean
   * lifecycle result is not a successful closure.
   */
  readonly ptyClosed: Promise<void>;
}

export function spawnGoverned(
  path: string,
  argv: readonly string[],
  env: Readonly<Record<string, string>>,
  onOutput: (bytes: Uint8Array) => void,
): GovernedSession {
  let resolvePtyClosed: () => void = () => {};
  let rejectPtyClosed: (err: Error) => void = () => {};
  const ptyClosed = new Promise<void>((resolve, reject) => {
    resolvePtyClosed = resolve;
    rejectPtyClosed = reject;
  });

  const terminal = new Bun.Terminal({
    cols: 80,
    rows: 24,
    name: "xterm-256color",
    data: (_terminal, chunk) => onOutput(chunk),
    exit: (_terminal, exitCode, signal) => {
      if (exitCode === 0) {
        resolvePtyClosed();
      } else {
        rejectPtyClosed(new PtyReadError(exitCode, signal));
      }
    },
  });
  const child = Bun.spawn([path, ...argv], {
    terminal,
    detached: true,
    env: { ...env },
  });
  return { terminal, child, pgid: child.pid, ptyClosed };
}
