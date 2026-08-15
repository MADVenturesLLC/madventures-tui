// packages/adapter-antigravity/src/attestation.ts
// Antigravity (agy) attestation. Same contract as Claude Code, but agy on the
// installed version has NO machine-verifiable exact-model primitive, so
// attestation returns ModelIdentityUnverifiable and the execution is kept out
// of `active`. We never infer model identity from terminal prose.

import { resolveExecutable, type Shell } from "./shell";

export interface AttestationResult {
  readonly executionId: string;
  readonly role: "builder" | "independent-reviewer" | "observer";
  readonly surface: "antigravity";
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
  return `exec-agy-${Math.random().toString(36).slice(2, 10)}`;
}

// agy exposes no machine-readable exact-model primitive on the installed
// version. We probe for one; if absent, fail closed.
export async function attestAntigravity(
  shell: Shell,
  role: "builder" | "independent-reviewer" | "observer" = "independent-reviewer",
): Promise<AttestationResult> {
  const executable = await resolveExecutable(shell, "agy");
  const versionOut = await shell.run(`${executable} --version`);
  if (versionOut.code !== 0) throw new Error("agy_version_unavailable");

  // Probe for an exact-model primitive. If `agy config get model` returns nothing
  // (or "auto"), agy cannot satisfy attestation.
  const modelOut = await shell.run(`${executable} config get model`);
  const modelLine = modelOut.stdout.trim();
  const [model, provider] = modelLine.split("|");
  if (!model || model === "auto") {
    throw new ModelIdentityUnverifiable("agy has no machine-verifiable exact-model primitive");
  }

  const effortOut = await shell.run(`${executable} config get effort`);
  const effort = (effortOut.stdout.trim() || "medium") as string;

  return {
    executionId: newExecutionId(),
    role,
    surface: "antigravity",
    model,
    provider: provider ?? "google",
    effort,
  };
}
