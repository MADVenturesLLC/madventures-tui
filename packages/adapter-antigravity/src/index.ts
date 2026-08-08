// packages/adapter-antigravity/src/index.ts
export { AntigravityAdapter, ModelIdentityUnverifiable } from "./adapter";
export type {
  AdapterV1,
  ConfigChangeSet,
  LaunchInput,
  ManagedExecution,
  ExecutionIdentity,
} from "./adapter";
export { attestAntigravity } from "./attestation";
export { prepareConfigPreview } from "./mcp-config";
export { realShell, fakeShell, resolveExecutable } from "./shell";
export type { Shell, ShellResult } from "./shell";
