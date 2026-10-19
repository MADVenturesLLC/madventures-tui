// apps/madv-agent/test/policy-boundary.test.ts
// BITE PROOFS (N3 §4.1, §4.2, §4.3). Each of these fails if the check it
// guards is removed:
//   - the project root is the boundary (traversal, absolute escape, symlink out);
//   - `.madv-agent/**` and `.git/**` are never writable, even inside the root;
//   - the path checked is the path used (a path that becomes a symlink between
//     authorisation and use is refused at use time).

import { describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { assertArgv, assertPath, assertPathAtUse, PolicyRefusal } from "../src/policy";

function project(): string {
  const dir = mkdtempSync(join(tmpdir(), "madv-policy-"));
  mkdirSync(join(dir, "src"), { recursive: true });
  writeFileSync(join(dir, "src", "a.ts"), "export const a = 1;\n");
  return dir;
}

describe("policy boundary (N3)", () => {
  test("BITE: traversal and absolute escapes are refused", () => {
    const root = project();
    for (const bad of ["../outside.txt", "../../etc/passwd", "/etc/passwd"]) {
      expect(() => assertPath({ projectDir: root, path: bad, mode: "read" })).toThrow(PolicyRefusal);
    }
    // A legitimate path resolves.
    expect(assertPath({ projectDir: root, path: "src/a.ts", mode: "read" })).toBe(join(root, "src/a.ts"));
  });

  test("BITE: a symlink pointing out of the root is refused", () => {
    const root = project();
    const outside = mkdtempSync(join(tmpdir(), "madv-outside-"));
    writeFileSync(join(outside, "secret.txt"), "do not read\n");
    symlinkSync(join(outside, "secret.txt"), join(root, "link.txt"));
    expect(() => assertPath({ projectDir: root, path: "link.txt", mode: "read" })).toThrow(PolicyRefusal);
  });

  test("BITE: writes to .madv-agent/** and .git/** are refused inside the root", () => {
    const root = project();
    for (const bad of [
      ".madv-agent/sessions/x/events.jsonl",
      ".git/hooks/pre-commit",
      ".git/config",
    ]) {
      expect(() => assertPath({ projectDir: root, path: bad, mode: "write" })).toThrow(
        /must not be writable by the agent/,
      );
    }
    // Reading them is not the same question, and writes elsewhere are fine.
    expect(assertPath({ projectDir: root, path: "src/new.ts", mode: "write" })).toBe(join(root, "src/new.ts"));
  });

  test("BITE (TOCTOU): a path that becomes a symlink before use is refused at use time", () => {
    const root = project();
    const outside = mkdtempSync(join(tmpdir(), "madv-outside-"));
    writeFileSync(join(outside, "secret.txt"), "do not read\n");

    // Authorised now, as a regular file…
    expect(assertPath({ projectDir: root, path: "src/a.ts", mode: "read" })).toBe(join(root, "src/a.ts"));

    // …swapped for a symlink before the caller gets to use it.
    const fs = require("node:fs") as typeof import("node:fs");
    fs.rmSync(join(root, "src", "a.ts"));
    symlinkSync(join(outside, "secret.txt"), join(root, "src", "a.ts"));

    // Refused at use time. The message may come from our use-time lstat check or
    // from the policy package's own symlink walk — either way the call does not
    // proceed, which is the property under test.
    expect(() => assertPathAtUse({ projectDir: root, path: "src/a.ts", mode: "read" })).toThrow(
      PolicyRefusal,
    );
  });

  test("BITE: shell takes argv, and refuses a shell or `-c` outright", () => {
    expect(() => assertArgv(["sh", "-c", "rm -rf /"])).toThrow(PolicyRefusal);
    expect(() => assertArgv(["/bin/bash", "-lc", "echo hi"])).toThrow(PolicyRefusal);
    expect(() => assertArgv(["echo", "-c"])).toThrow(/`-c` is not accepted/);
    expect(() => assertArgv("echo hi")).toThrow(/non-empty argv array/);
    expect(assertArgv(["bun", "test", "apps/madv-agent"])).toEqual(["bun", "test", "apps/madv-agent"]);
  });
});
