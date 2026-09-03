// packages/storage/test/home.test.ts
//
// resolvePasswdHome() returns the realpath of the authenticated user's
// passwd home. assertHomeConsistency() throws HomeMismatchError when
// $HOME diverges from it, per spec §5.2.

import { expect, test } from "bun:test";
import { mkdtempSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { assertHomeConsistency, HomeMismatchError, resolvePasswdHome } from "../src/home";

test("a $HOME that does not resolve to the passwd home is a typed failure", () => {
  expect(() => assertHomeConsistency({ HOME: "/tmp" })).toThrow(HomeMismatchError);
});

test("an absent $HOME is accepted and the passwd home is used", () => {
  expect(() => assertHomeConsistency({})).not.toThrow();
});

test("a $HOME that is a symlink resolving to the passwd home is accepted", () => {
  const dir = mkdtempSync(join(tmpdir(), "madv-home-test-"));
  const link = join(dir, "home-link");
  symlinkSync(resolvePasswdHome(), link);
  try {
    expect(() => assertHomeConsistency({ HOME: link })).not.toThrow();
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
