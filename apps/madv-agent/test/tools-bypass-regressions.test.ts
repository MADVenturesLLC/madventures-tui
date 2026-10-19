// apps/madv-agent/test/tools-bypass-regressions.test.ts
// The four bypasses an independent verifier found in the first N3 head, each
// now a regression test. Every one of these FAILS on the code that shipped at
// 3890ef2 — that is the point of keeping them:
//
//   B1  `search` walked with stat() and followed symlinks out of the root, so a
//       read-only search could read files the boundary forbade.
//   B2  the hard write-deny compared the first path segment case-sensitively,
//       so `.GIT/hooks/…` and `.Madv-Agent/…` addressed the same directories on
//       a case-insensitive filesystem and were allowed.
//   B3  `shell` judged argv[0] by its basename, so a symlink named `tool` that
//       pointed at /bin/sh ran a shell.
//   B4  the approval prompt printed raw argument text, so control characters
//       could repaint it and show something other than what would run.

import { describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { assertArgv, assertPath, PolicyRefusal } from "../src/policy";
import { searchTool } from "../src/tools";
import { sanitizeForDisplay } from "../src/approval";

function project(): string {
  return mkdtempSync(join(tmpdir(), "madv-bypass-"));
}

describe("N3 bypass regressions", () => {
  test("B1: search does not follow a symlink out of the root", () => {
    const root = project();
    const outside = project();
    writeFileSync(join(outside, "secret.txt"), "TOKEN_LEAK_CANARY\n");
    symlinkSync(outside, join(root, "linked-dir"));
    symlinkSync(join(outside, "secret.txt"), join(root, "linked-file.txt"));
    writeFileSync(join(root, "inside.txt"), "nothing secret here\n");

    const res = searchTool.run({ pattern: "TOKEN_LEAK_CANARY" }, { projectDir: root });
    expect(res.ok).toBe(true);
    expect(res.output ?? "").not.toContain("TOKEN_LEAK_CANARY");
    expect(res.summary).toContain("0 hit");
  });

  test("B2: the hard write-deny is case-insensitive on this filesystem", () => {
    const root = project();
    for (const bad of [".GIT/hooks/pre-commit", ".Madv-Agent/sessions/x/events.jsonl", ".Git/config"]) {
      expect(() => assertPath({ projectDir: root, path: bad, mode: "write" })).toThrow(
        /must not be writable by the agent/,
      );
    }
  });

  test("B3: argv[0] that is a symlink to a shell is refused", () => {
    const root = project();
    const link = join(root, "innocent-tool");
    symlinkSync("/bin/sh", link);
    expect(() => assertArgv([link, "-c", "echo pwned"])).toThrow(/is a symlink/);

    // And a real path that RESOLVES to a shell is refused even when the name
    // looks harmless (`/bin/sh` itself, and a copy-free hard link target).
    expect(() => assertArgv(["/bin/sh", "script.sh"])).toThrow(PolicyRefusal);
  });

  test("B4: control characters cannot repaint the approval prompt", () => {
    const hostile = "read ok\n\n  action:  write /etc/passwd\n  approve? [y/N] y\r";
    const safe = sanitizeForDisplay(hostile);
    expect(safe).not.toContain("\n");
    expect(safe).not.toContain("\r");
    expect(safe).toContain("\\x0a");
    expect(safe).toContain("\\x0d");
    // A long argument is capped rather than allowed to scroll the prompt away.
    expect(sanitizeForDisplay("a".repeat(1000)).length).toBeLessThan(420);
  });
});
