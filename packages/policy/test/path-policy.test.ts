// packages/policy/test/path-policy.test.ts
// Path policy tests: glob matching, traversal, containment, symlink rejection.

import { afterAll, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { assertWithinAllowedPath } from "../src/path-policy";

// --- Behavioral tests against a nonexistent root (textual checks) ---

test("allows path matching glob", () => {
  expect(() => assertWithinAllowedPath("src/index.ts", ["src/**"], "/repo")).not.toThrow();
  expect(() => assertWithinAllowedPath("src/deep/nested/file.ts", ["src/**"], "/repo")).not.toThrow();
});

test("rejects path outside allowed glob", () => {
  expect(() => assertWithinAllowedPath("secrets.env", ["src/**"], "/repo")).toThrow("path_denied");
});

test("rejects path traversal", () => {
  expect(() => assertWithinAllowedPath("src/../../../etc/passwd", ["src/**"], "/repo")).toThrow("path_denied");
});

test("rejects relative escape via ..", () => {
  expect(() => assertWithinAllowedPath("../outside", ["src/**"], "/repo")).toThrow("path_denied");
});

test("allows exact path match", () => {
  expect(() => assertWithinAllowedPath("package.json", ["package.json"], "/repo")).not.toThrow();
});

test("rejects absolute path outside repo", () => {
  expect(() => assertWithinAllowedPath("/etc/passwd", ["src/**"], "/repo")).toThrow("path_denied");
});

// --- Real filesystem fixtures: containment + symlink rejection ---

const base = mkdtempSync(join(tmpdir(), "path-policy-"));
const repo = join(base, "repo");
const srcDir = join(repo, "src");
const realFile = join(srcDir, "index.ts");
const sibling = join(base, "repo-secrets");

mkdirSync(srcDir, { recursive: true });
mkdirSync(join(repo, "docs"), { recursive: true });
mkdirSync(sibling, { recursive: true });
writeFileSync(realFile, "export {};\n");
writeFileSync(join(repo, "package.json"), "{}\n");
writeFileSync(join(sibling, "creds.env"), "SECRET=1\n");

// Symlink fixtures:
//   docs/link-to-src -> repo/src        (symlinked directory component, target in-repo)
//   src/link.ts      -> repo/src/index.ts (symlinked final component, target in-repo)
//   src/escape       -> repo-secrets    (symlink pointing outside repo)
symlinkSync(srcDir, join(repo, "docs", "link-to-src"));
symlinkSync(realFile, join(srcDir, "link.ts"));
symlinkSync(sibling, join(srcDir, "escape"));

afterAll(() => {
  rmSync(base, { recursive: true, force: true });
});

test("allows legitimate symlink-free path under real root", () => {
  expect(() => assertWithinAllowedPath(realFile, ["src/**"], repo)).not.toThrow();
  expect(() => assertWithinAllowedPath("src/index.ts", ["src/**"], repo)).not.toThrow();
  expect(() => assertWithinAllowedPath("package.json", ["package.json"], repo)).not.toThrow();
});

test("rejects sibling-prefix escape (repo vs repo-secrets)", () => {
  // root: <base>/repo — candidate: <base>/repo-secrets/creds.env
  // A raw startsWith(root) prefix check would contain this candidate.
  const candidate = join(sibling, "creds.env");
  expect(() => assertWithinAllowedPath(candidate, ["**"], repo)).toThrow("path_denied");
  expect(() => assertWithinAllowedPath(sibling, ["**"], repo)).toThrow("path_denied");
});

test("rejects symlinked directory component inside repo", () => {
  const viaLink = join(repo, "docs", "link-to-src", "index.ts");
  expect(() => assertWithinAllowedPath(viaLink, ["**"], repo)).toThrow("path_denied");
});

test("rejects symlinked final file inside repo", () => {
  // Target is a legitimate in-repo file; the symlink component itself is denied.
  expect(() => assertWithinAllowedPath(join(srcDir, "link.ts"), ["src/**"], repo)).toThrow("path_denied");
});

test("rejects symlink pointing outside repo", () => {
  const viaEscape = join(srcDir, "escape", "creds.env");
  expect(() => assertWithinAllowedPath(viaEscape, ["**"], repo)).toThrow("path_denied");
});

test("rejects traversal even under a real root", () => {
  expect(() => assertWithinAllowedPath("src/../../repo-secrets/creds.env", ["**"], repo)).toThrow("path_denied");
});
