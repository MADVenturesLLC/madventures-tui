// packages/adapter-antigravity/test/integration.test.ts
import { expect, test } from "bun:test";
import { AntigravityAdapter } from "../src/adapter";
import { fakeShell } from "../src/shell";

test("adapter exposes launch/notify/terminate even when attest is unverifiable", async () => {
  const shell = fakeShell({
    "which agy": "/usr/bin/agy",
    "agy --version": "1.1.9",
  });
  const adapter = new AntigravityAdapter(shell);

  // attest fails closed (kept out of active) but adapter object is usable
  await expect(adapter.attest()).rejects.toThrow(/model_identity_unverifiable/);

  const preview = await adapter.prepareConfigPreview();
  expect(preview.backupPath.endsWith(".bak")).toBe(true);

  const exec = await adapter.launch({
    sessionId: "s1",
    executionId: "exec-staged",
    credentialPath: "/tmp/c",
    repositoryPath: "/tmp/r",
    exactModel: "gemini-2.5-pro",
    provider: "google",
    effort: "medium",
  });
  expect(exec.executionId).toBe("exec-staged");
});

test("inbox rejects injection", async () => {
  const shell = fakeShell({ "which agy": "/usr/bin/agy" });
  const adapter = new AntigravityAdapter(shell);
  await expect(adapter.notifyInbox("a; rm -rf /")).rejects.toThrow(/injection|invalid/);
});
