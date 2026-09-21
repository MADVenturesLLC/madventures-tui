// packages/adapter-claude-code/test/integration.test.ts
import { expect, test } from "bun:test";
import { ClaudeCodeAdapter } from "../src/adapter";
import { fakeShell } from "../src/shell";

test("full lifecycle: attest -> preview -> launch -> notify -> terminate", async () => {
  const shell = fakeShell({
    "which claude": "/usr/bin/claude",
    "claude --version": "2.1.226",
    "claude config get model": "claude-fable-5|anthropic",
    "claude config get effort": "high",
  });
  const adapter = new ClaudeCodeAdapter(shell);

  const id = await adapter.attest();
  expect(id.executionId).toMatch(/^exec-cc-/);

  const exec = await adapter.launch({
    sessionId: "s1",
    executionId: id.executionId,
    credentialPath: "/tmp/c",
    repositoryPath: "/tmp/r",
    exactModel: "claude-fable-5",
    provider: "anthropic",
    effort: "high",
  });
  expect(exec.executionId).toBe(id.executionId);
  expect(exec.pid).toBeGreaterThan(0);

  await adapter.notifyInbox("evt-abc123");
  expect(shell.calls.some((c) => c.includes("inbox evt-abc123"))).toBe(true);

  await adapter.terminate("SIGTERM");
  expect(shell.calls.some((c) => c.includes("disconnect SIGTERM"))).toBe(true);
});
