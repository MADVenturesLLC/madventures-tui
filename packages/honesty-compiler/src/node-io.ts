// packages/honesty-compiler/src/node-io.ts
// Node/bun-only I/O for @mad/honesty-compiler: cwd-confined path resolution
// and the working directory's git HEAD. Mirrors the semantics of
// @mad/build-memory's node-store (confine before any read; typed failures
// instead of raw throws) but takes an explicit root so `--cwd` works.
// The browser-safe modules (ir, parse, rung) never import this file.

import { readFileSync } from "node:fs";
import { resolve, sep } from "node:path";

import type { Issue } from "./ir";

/** Resolve an operator-supplied path against root and refuse escapes. */
export function confineToRoot(root: string, rawPath: string, label: string): { path: string } | { issue: Issue } {
  const resolved = resolve(root, rawPath);
  const base = resolve(root);
  if (resolved !== base && !resolved.startsWith(base + sep)) {
    return {
      issue: {
        code: "PATH_OUTSIDE_ROOT",
        message: `${label} must stay inside the root (${base}) — refused: ${rawPath}`,
      },
    };
  }
  return { path: resolved };
}

/** Read a UTF-8 text file, or a typed issue. Binary content is refused. */
export function readTextFile(path: string, label: string): { text: string } | { issue: Issue } {
  let text: string;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    return { issue: { code: "FILE_UNREADABLE", message: `cannot read ${label} at ${path}` } };
  }
  if (text.includes("\uFFFD")) {
    return { issue: { code: "FILE_NOT_UTF8", message: `${label} at ${path} is not valid UTF-8 text — binary evidence is unsupported in v0` } };
  }
  return { text };
}

/** Current git HEAD of the given root, or a typed issue. No network. */
export function gitHeadSha(root: string): { sha: string } | { issue: Issue } {
  const proc = Bun.spawnSync(["git", "rev-parse", "HEAD"], { cwd: root, stdout: "pipe", stderr: "pipe" });
  const out = proc.stdout.toString().trim();
  if (proc.exitCode !== 0 || !/^[0-9a-f]{40}$/.test(out)) {
    return { issue: { code: "NO_GIT_HEAD", message: `could not read git HEAD under ${root}` } };
  }
  return { sha: out };
}
