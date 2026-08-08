// packages/adapter-claude-code/test/attestation.test.ts
import { expect, test } from "bun:test";
import { attestClaudeCode, ModelIdentityUnverifiable } from "../src/attestation";
import { fakeShell } from "../src/shell";

test("attest returns exact model and provider", async () => {
  const shell = fakeShell({
    "which claude": "/usr/bin/claude",
    "claude --version": "2.1.226",
    "claude config get model": "claude-fable-5|anthropic",
    "claude config get effort": "high",
  });
  const id = await attestClaudeCode(shell);
  expect(id.surface).toBe("claude-code");
  expect(id.model).toBe("claude-fable-5");
  expect(id.provider).toBe("anthropic");
  expect(id.effort).toBe("high");
});

test("attest fails closed when model is auto", async () => {
  const shell = fakeShell({
    "which claude": "/usr/bin/claude",
    "claude --version": "2.1.226",
    "claude config get model": "auto",
  });
  await expect(attestClaudeCode(shell)).rejects.toBeInstanceOf(ModelIdentityUnverifiable);
});

test("attest fails closed when model primitive missing", async () => {
  const shell = fakeShell({
    "which claude": "/usr/bin/claude",
    "claude --version": "2.1.226",
  });
  await expect(attestClaudeCode(shell)).rejects.toThrow(/model_identity_unverifiable/);
});
