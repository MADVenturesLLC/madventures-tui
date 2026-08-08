// packages/adapter-antigravity/test/attestation.test.ts
import { expect, test } from "bun:test";
import { attestAntigravity, ModelIdentityUnverifiable } from "../src/attestation";
import { fakeShell } from "../src/shell";

test("attest fails closed: agy has no machine-verifiable exact model", async () => {
  const shell = fakeShell({
    "which agy": "/usr/bin/agy",
    "agy --version": "1.1.9",
    // no `config get model` -> unverifiable
  });
  await expect(attestAntigravity(shell)).rejects.toBeInstanceOf(ModelIdentityUnverifiable);
});

test("attest would succeed if agy exposed a model primitive", async () => {
  const shell = fakeShell({
    "which agy": "/usr/bin/agy",
    "agy --version": "1.1.9",
    "config get model": "gemini-2.5-pro|google",
    "config get effort": "medium",
  });
  const id = await attestAntigravity(shell);
  expect(id.surface).toBe("antigravity");
  expect(id.model).toBe("gemini-2.5-pro");
});
