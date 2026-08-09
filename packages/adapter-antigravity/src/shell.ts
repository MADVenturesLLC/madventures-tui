// packages/adapter-antigravity/src/shell.ts
// Shell abstraction for the Antigravity adapter (mirror of claude-code shell).

export interface ShellResult {
  readonly stdout: string;
  readonly code: number;
}

export interface SpawnResult {
  readonly pid: number;
}

export interface Shell {
  run(command: string): Promise<ShellResult>;
  spawn(command: string[], options?: any): SpawnResult;
}

export async function resolveExecutable(shell: Shell, name: string): Promise<string> {
  const r = await shell.run(`which ${name}`);
  if (r.code !== 0 || r.stdout.trim().length === 0) {
    throw new Error(`executable_not_found:${name}`);
  }
  return r.stdout.trim();
}

export function realShell(): Shell {
  return {
    async run(command: string): Promise<ShellResult> {
      const proc = Bun.spawn(command.split(/\s+/), { stdout: "pipe", stderr: "pipe" });
      const stdout = await new Response(proc.stdout).text();
      const code = await proc.exited;
      return { stdout, code };
    },
    spawn(command: string[], options?: any): SpawnResult {
      return Bun.spawn(command, options);
    }
  };
}

export function fakeShell(responses: Record<string, string>): Shell & { calls: string[] } {
  const calls: string[] = [];
  return {
    calls,
    async run(command: string): Promise<ShellResult> {
      calls.push(command);
      let best: { key: string; value: string } | null = null;
      for (const key of Object.keys(responses)) {
        if (command.includes(key) && (!best || key.length > best.key.length)) {
          best = { key, value: responses[key]! };
        }
      }
      if (!best) return { stdout: "", code: 0 };
      return { stdout: best.value, code: 0 };
    },
    spawn(command: string[], _options?: any): SpawnResult {
      calls.push(command.join(" "));
      return { pid: 9999 };
    }
  };
}
