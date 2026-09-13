// packages/preflight/src/spawn.ts
// The real command runner. One place where processes are born; everything
// downstream takes a RunCommand so tests can inject fakes. Local only —
// preflight never makes network calls of any kind.

export type CommandOutcome = {
  exit_code: number;
  stdout: string;
  stderr: string;
  duration_ms: number;
};

export type RunCommand = (cmd: readonly string[], cwd: string) => Promise<CommandOutcome>;

/** A check could not start at all: binary missing, cwd missing, spawn blew up. */
export class CommandStartError extends Error {
  readonly cmd: readonly string[];

  constructor(cmd: readonly string[], cause: unknown) {
    const spec = `${cmd[0] ?? "<none>"}${cmd.length > 1 ? " …" : ""}`;
    super(`could not start command: ${spec} (${cause instanceof Error ? cause.message : String(cause)})`);
    this.name = "CommandStartError";
    this.cmd = cmd;
  }
}

/** A check started but blew past its budget; killed by signal. */
export class CommandTimeoutError extends Error {
  readonly cmd: readonly string[];
  readonly timeout_ms: number;

  constructor(cmd: readonly string[], timeout_ms: number) {
    const spec = `${cmd[0] ?? "<none>"}${cmd.length > 1 ? " …" : ""}`;
    super(`command exceeded ${timeout_ms}ms budget and was killed: ${spec}`);
    this.name = "CommandTimeoutError";
    this.cmd = cmd;
    this.timeout_ms = timeout_ms;
  }
}

export const DEFAULT_CHECK_TIMEOUT_MS = 600_000;

export function spawnRunner(opts?: { timeout_ms?: number }): RunCommand {
  const timeoutMs = opts?.timeout_ms ?? DEFAULT_CHECK_TIMEOUT_MS;
  return async (cmd, cwd) => {
    const started = Date.now();
    const abort = new AbortController();
    const timer = setTimeout(() => abort.abort(), timeoutMs);
    let proc: Bun.Subprocess<"ignore", "pipe", "pipe">;
    try {
      proc = Bun.spawn({
        cmd: [...cmd],
        cwd,
        stdin: "ignore",
        stdout: "pipe",
        stderr: "pipe",
        signal: abort.signal,
      });
    } catch (err) {
      clearTimeout(timer);
      throw new CommandStartError(cmd, err);
    }
    try {
      const [stdout, stderr, exit] = await Promise.all([
        new Response(proc.stdout).text(),
        new Response(proc.stderr).text(),
        proc.exited,
      ]);
      clearTimeout(timer);
      const durationMs = Date.now() - started;
      if (exit === null) {
        throw new CommandTimeoutError(cmd, timeoutMs);
      }
      return { exit_code: exit, stdout, stderr, duration_ms: durationMs };
    } catch (err) {
      if (err instanceof CommandTimeoutError) throw err;
      // Read failures after a kill land here; classify as timeout if aborted.
      if (abort.signal.aborted) throw new CommandTimeoutError(cmd, timeoutMs);
      throw err;
    }
  };
}
