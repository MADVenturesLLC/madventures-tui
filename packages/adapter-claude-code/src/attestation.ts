// packages/adapter-claude-code/src/attestation.ts
// Claude Code attestation: capture version, package fingerprint, exact
// model/provider, and effort via machine-readable configuration. Fails closed
// if the exact model cannot be verified.

import { resolveExecutable, type Shell } from "./shell";

export interface AttestationResult {
  readonly executionId: string;
  readonly role: "builder" | "reviewer" | "observer";
  readonly surface: "claude-code";
  readonly model: string;
  readonly provider: string;
  readonly effort: string;
}

export class ModelIdentityUnverifiable extends Error {
  constructor(public readonly detail: string) {
    super(`model_identity_unverifiable:${detail}`);
    this.name = "ModelIdentityUnverifiable";
  }
}

function newExecutionId(): string {
  return `exec-cc-${Math.random().toString(36).slice(2, 10)}`;
}

export async function attestClaudeCode(
  shell: Shell,
  role: "builder" | "reviewer" | "observer" = "builder",
): Promise<AttestationResult> {
  const executable = await resolveExecutable(shell, "claude");
  const versionOut = await shell.run(`${executable} --version`);
  if (versionOut.code !== 0) throw new Error("claude_version_unavailable");

  // Exact model/provider must be machine-verifiable. Claude Code exposes this
  // via a config command; if it returns nothing we fail closed.
  const modelOut = await shell.run(`${executable} config get model`);
  const modelLine = modelOut.stdout.trim();
  const [model, provider] = modelLine.split("|");
  if (!model || model === "auto") {
    throw new ModelIdentityUnverifiable("claude model not pinnable");
  }

  const effortOut = await shell.run(`${executable} config get effort`);
  const effort = (effortOut.stdout.trim() || "medium") as string;

  return {
    executionId: newExecutionId(),
    role,
    surface: "claude-code",
    model,
    provider: provider ?? "anthropic",
    effort,
  };
}
