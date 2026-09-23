// test/adapter-parity.shared.ts
// Shared parity suite run identically against both CLI adapters.
// The suite never executes the real CLIs in CI; it injects a fake shell so
// every behavior (executable resolution, version capture, fingerprint, model
// visibility, effort capture, fail-closed unverifiable-model handling,
// child-execution propagation, inbox notification, disconnect) is exercised
// deterministically and safely. Config-preview and backup/restore coverage
// was removed by Task 33's quarantine of the production preview path; there
// is no longer a preview behavior for this suite to exercise.

import { expect, test } from "bun:test";

// ---- Adapter contract (mirrors the plan's AdapterV1) ----
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
  readonly surface: "claude-code" | "antigravity";
  readonly model: string;
  readonly provider: string;
  readonly effort: string;
}

export interface AdapterV1 {
  attest(): Promise<ExecutionIdentity>;
  launch(input: LaunchInput): Promise<ManagedExecution>;
  notifyInbox(eventId: string): Promise<void>;
  pause(reason: string): Promise<void>;
  terminate(signal: "SIGTERM" | "SIGKILL"): Promise<void>;
}

// A fake command runner injected into adapters under test.
export interface FakeShell {
  readonly responses: Record<string, string>;
  readonly calls: string[];
  run(command: string): Promise<{ stdout: string; code: number }>;
}

// Default model/effort responses so attest() succeeds in tests that only
// care about version resolution. Tests that verify fail-closed behavior
// omit these keys.
function baseResponses(surface?: "claude-code" | "antigravity"): Record<string, string> {
  const base: Record<string, string> = {};
  if (surface) {
    const bin = surface === "claude-code" ? "claude" : "agy";
    base[`which ${bin}`] = `/usr/bin/${bin}`;
  }
  return base;
}

export function makeFakeShell(responses: Record<string, string>, surface?: "claude-code" | "antigravity"): FakeShell {
  const calls: string[] = [];
  const merged: Record<string, string> = { ...baseResponses(surface), ...responses };
  return {
    responses: merged,
    calls,
    async run(command: string): Promise<{ stdout: string; code: number }> {
      calls.push(command);
      let best: { key: string; value: string } | null = null;
      for (const key of Object.keys(merged)) {
        if (command.includes(key) && (!best || key.length > best.key.length)) {
          best = { key, value: merged[key]! };
        }
      }
      if (!best) return { stdout: "", code: 0 };
      return { stdout: best.value, code: 0 };
    },
  };
}

// Run the shared suite against a factory that builds an adapter bound to the
// given fake shell. `surface` is "claude-code" or "antigravity".
export function runAdapterParity(
  surface: "claude-code" | "antigravity",
  factory: (shell: FakeShell) => AdapterV1,
): void {
  // --- executable resolution + version + fingerprint ---
  test(`[${surface}] resolves executable and captures version`, async () => {
    const shell = makeFakeShell({
      "--version": "1.2.3",
      "config get model": "claude-fable-5|anthropic",
      "config get effort": "high",
    }, surface);
    const adapter = factory(shell);
    const id = await adapter.attest();
    expect(id.surface).toBe(surface);
    expect(id.executionId).toBeString();
    expect(id.executionId.length).toBeGreaterThan(0);
    expect(shell.calls.some((c) => c.includes("--version"))).toBe(true);
  });

  // --- exact model/provider visibility ---
  test(`[${surface}] exposes exact model and provider`, async () => {
    const shell = makeFakeShell({
      "--version": "1.2.3",
      "config get model": "claude-fable-5|anthropic",
    }, surface);
    const adapter = factory(shell);
    const id = await adapter.attest();
    expect(id.model).toBe("claude-fable-5");
    expect(id.provider).toBe("anthropic");
  });

  // --- effort capture ---
  test(`[${surface}] captures effort`, async () => {
    const shell = makeFakeShell({
      "--version": "1.2.3",
      "config get model": "claude-fable-5|anthropic",
      "config get effort": "high",
    }, surface);
    const adapter = factory(shell);
    const id = await adapter.attest();
    expect(id.effort).toBe("high");
  });

  // --- missing-model failure (fail closed) ---
  test(`[${surface}] fails closed when exact model is unverifiable`, async () => {
    const shell = makeFakeShell({ "--version": "1.2.3" }, surface); // no config get model
    const adapter = factory(shell);
    await expect(adapter.attest()).rejects.toThrow(/model_identity_unverifiable|unverifiable/);
  });

  // --- child-execution ID propagation ---
  test(`[${surface}] launch propagates child execution id`, async () => {
    const shell = makeFakeShell({
      "--version": "1.2.3",
      "config get model": "claude-fable-5|anthropic",
    }, surface);
    const adapter = factory(shell);
    const input: LaunchInput = {
      sessionId: "sess-1",
      executionId: "exec-1",
      credentialPath: "/tmp/cred-1",
      repositoryPath: "/tmp/repo",
      exactModel: "claude-fable-5",
      provider: "anthropic",
      effort: "high",
    };
    const exec = await adapter.launch(input);
    expect(exec.executionId).toBe("exec-1");
    expect(exec.pid).toBeGreaterThan(0);
    expect(exec.executablePath).toBeString();
    expect(exec.startedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  // --- inbox notification without command injection ---
  test(`[${surface}] notifyInbox rejects injected event ids`, async () => {
    const shell = makeFakeShell({ "--version": "1.2.3" }, surface);
    const adapter = factory(shell);
    await expect(adapter.notifyInbox("evt-1; rm -rf /")).rejects.toThrow(/injection|invalid/);
  });

  // --- disconnect notification ---
  test(`[${surface}] terminate sends disconnect signal`, async () => {
    const shell = makeFakeShell({ "--version": "1.2.3" }, surface);
    const adapter = factory(shell);
    await adapter.terminate("SIGTERM");
    expect(shell.calls.some((c) => c.includes("disconnect"))).toBe(true);
  });
}
