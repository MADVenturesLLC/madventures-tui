// packages/policy/test/path-policy.test.ts
// Path policy tests: glob matching, traversal, normalization.

import { expect, test } from "bun:test";
import { assertWithinAllowedPath } from "../src/path-policy";

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