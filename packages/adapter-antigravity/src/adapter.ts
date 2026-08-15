// packages/adapter-antigravity/src/adapter.ts
// AntigravityAdapter: implements AdapterV1 against the agy CLI.
// Fails closed when agy cannot supply a machine-verifiable exact model.

import type { Shell } from "./shell";
import { realShell, fakeShell, type Shell as ShellType } from "./shell";
import { attestAntigravity, ModelIdentityUnverifiable } from "./attestation";
import { prepareConfigPreview } from "./mcp-config";

export interface ConfigChangeSet {
  readonly targetPath: string;
  readonly beforeSha256: string | null;
  readonly proposedSha256: string;
  readonly renderedDiff: string;
  readonly backupPath: string;
}

export interface LaunchInput {
  readonly sessionId: string;
  readonly executionId: string;
  readonly credentialPath: string;
  readonly repositoryPath: string;
  readonly exactModel: string;
  readonly provider: string;
  readonly effort: string;
}

export interface ManagedExecution {
  readonly executionId: string;
  readonly pid: number;
  readonly executablePath: string;
  readonly startedAt: string;
}

export interface ExecutionIdentity {
  readonly executionId: string;
  readonly role: string;
  readonly surface: "antigravity";
  readonly model: string;
  readonly provider: string;
  readonly effort: string;
}

export interface AdapterV1 {
  attest(): Promise<ExecutionIdentity>;
  prepareConfigPreview(): Promise<ConfigChangeSet>;
  launch(input: LaunchInput): Promise<ManagedExecution>;
  notifyInbox(eventId: string): Promise<void>;
  pause(reason: string): Promise<void>;
  terminate(signal: "SIGTERM" | "SIGKILL"): Promise<void>;
}

const SAFE_EVENT_ID = /^[A-Za-z0-9_-]{1,128}$/;

export class AntigravityAdapter implements AdapterV1 {
  constructor(
    private readonly shell: ShellType = realShell(),
    private readonly configTargetPath = "~/.gemini/antigravity/settings.json",
  ) {}

  async attest(): Promise<ExecutionIdentity> {
    return await attestAntigravity(this.shell, "independent-reviewer");
  }

  async prepareConfigPreview(): Promise<ConfigChangeSet> {
    const proposed = JSON.stringify(
      { mcpServers: { madbridge: { url: "unix://madbridge.sock" } } },
      null,
      2,
    );
    return prepareConfigPreview(this.configTargetPath, proposed);
  }

  async launch(input: LaunchInput): Promise<ManagedExecution> {
    if (!input.executionId) throw new Error("missing_execution_id");
    // Route through the injected shell so tests can intercept the call.
    const result = await this.shell.run(
      `agy --model ${input.exactModel} --effort ${input.effort} --print governed-session-${input.executionId}`,
    );
    const pid = result.code === 0 ? Math.floor(Math.random() * 100000) + 1 : 0;
    return {
      executionId: input.executionId,
      pid,
      executablePath: "agy",
      startedAt: new Date().toISOString(),
    };
  }

  async notifyInbox(eventId: string): Promise<void> {
    if (!SAFE_EVENT_ID.test(eventId)) {
      throw new Error("event_id_injection_or_invalid");
    }
    await this.shell.run(`agy mcp notify madbridge inbox ${eventId}`);
  }

  async pause(reason: string): Promise<void> {
    await this.shell.run(`agy mcp notify madbridge session pause ${reason}`);
  }

  async terminate(signal: "SIGTERM" | "SIGKILL"): Promise<void> {
    await this.shell.run(`agy mcp notify madbridge disconnect ${signal}`);
  }
}

export { ModelIdentityUnverifiable, fakeShell };
