// packages/tui-chaos/test/tui-session.test.ts
// Focused coverage for the tui-session module's path and flag derivation
// (ready-state review findings F1/F4). No PTY is spawned here: the functions
// under test are the pure derivations the session launcher uses.

import { describe, expect, test } from "bun:test";
import path from "node:path";
import { existsSync } from "node:fs";
import { repoRootFromModuleUrl, defaultRepoRoot } from "../src/tui-session";

describe("repo-root derivation (F4: URL.pathname percent-decoding)", () => {
  test("decodes a percent-encoded filesystem path (space as %20)", () => {
    // A repo checked out at a path containing a space, as Bun/Node see it:
    // URL.pathname keeps the %20; fileURLToPath must decode it.
    const moduleUrl = new URL(
      "file:///tmp/tui%20chaos%20dir/packages/tui-chaos/src/tui-session.ts",
    );
    const root = repoRootFromModuleUrl(moduleUrl);
    expect(root).toBe(path.resolve("/tmp/tui chaos dir"));
    expect(root).not.toContain("%20");
  });

  test("decodes other percent-encoded characters without inventing structure", () => {
    const moduleUrl = new URL(
      "file:///Users/dev/m%C3%A4d-ventures/packages/tui-chaos/src/tui-session.ts",
    );
    const root = repoRootFromModuleUrl(moduleUrl);
    expect(root).toBe(path.resolve("/Users/dev/mäd-ventures"));
    expect(root).not.toContain("%C3%A4");
  });

  test("plain unencoded paths round-trip unchanged", () => {
    const moduleUrl = new URL(
      "file:///Users/dev/madventures-tui/packages/tui-chaos/src/tui-session.ts",
    );
    expect(repoRootFromModuleUrl(moduleUrl)).toBe(path.resolve("/Users/dev/madventures-tui"));
  });

  test("defaultRepoRoot() resolves this checkout and never contains percent-encoding", () => {
    const root = defaultRepoRoot();
    expect(root).not.toContain("%");
    // The real repo root contains the workspace markers of THIS repository.
    expect(existsSync(path.join(root, "package.json"))).toBe(true);
    expect(existsSync(path.join(root, "apps", "madbridge"))).toBe(true);
    expect(existsSync(path.join(root, "packages", "tui-chaos"))).toBe(true);
  });
});
