// apps/madbridge/src/commands/types.ts
// Shared types for CLI command implementations.

export interface CommandFlags {
  readonly [key: string]: string | boolean;
}

export interface CommandContext {
  readonly stdin: string;
  readonly cwd: string;
  readonly json: boolean;
}

export interface CommandResult {
  readonly exitCode: number;
  readonly stdout: string;
  readonly stderr: string;
}
