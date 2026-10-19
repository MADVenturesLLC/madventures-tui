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
import { mkdtempSync, symlinkSync, writeFileSync } from "node:fs";
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

    // POSITIVE CONTROL (R2): with the root comparison unresolvable, this search
    // returned 0 hits for everything and the test above passed for the wrong
    // reason. A search that finds nothing inside the root is broken, not safe.
    const inside = searchTool.run({ pattern: "nothing secret here" }, { projectDir: root });
    expect(inside.output ?? "").toContain("inside.txt");
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
    // R1: argv[0] is RESOLVED, so an innocent-looking name that points at a
    // shell is refused for what it is.
    expect(() => assertArgv([link, "echo", "pwned"])).toThrow(/is a shell/);

    // And a bare name is resolved through PATH, not skipped.
    expect(() => assertArgv(["sh", "script.sh"])).toThrow(/is a shell/);
    expect(() => assertArgv(["/bin/sh", "script.sh"])).toThrow(PolicyRefusal);
    // A real, non-shell program still passes.
    expect(assertArgv(["echo", "hello"])).toEqual(["echo", "hello"]);
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

    // R3: bidi and other Unicode FORMAT characters are not control codes, and
    // they can reorder text without being visible. They must be escaped too.
    const bidi = sanitizeForDisplay("safe\u202Egnp.exe");
    expect(bidi).toContain("\\u202e");
    expect(bidi).toContain("safe");
    const zeroWidth = sanitizeForDisplay("a\u200Bb");
    expect(zeroWidth).toContain("\\u200b");
  });
});
