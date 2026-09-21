// packages/adapter-claude-code/src/index.ts
export { ClaudeCodeAdapter } from "./adapter";
export type {
  AdapterV1,
  ConfigChangeSet,
  LaunchInput,
  ManagedExecution,
  ExecutionIdentity,
} from "./adapter";
export { attestClaudeCode, ModelIdentityUnverifiable } from "./attestation";
export { realShell, fakeShell, resolveExecutable } from "./shell";
export type { Shell, ShellResult } from "./shell";
