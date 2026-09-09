// packages/proving-ground/src/paths.ts
// Repo-root resolution and fail-closed path containment for artifacts.

import path from "node:path";

export function repoRoot(): string {
  // packages/proving-ground/src -> repo root is three levels up.
  return path.resolve(new URL("../../..", import.meta.url).pathname);
}

export function provingGroundDir(root: string): string {
  return path.join(root, "testdata", "proving-ground");
}

export function runsDir(root: string): string {
  return path.join(provingGroundDir(root), "runs");
}

export function regressionsDir(root: string, challenge: string): string {
  return path.join(provingGroundDir(root), "regressions", challenge);
}

/** Resolve `candidate` inside `base`; refuse any escape (no traversal). */
export function resolveWithin(base: string, candidate: string): string {
  const resolved = path.resolve(base, candidate);
  if (resolved !== base && !resolved.startsWith(base + path.sep)) {
    throw new Error(`path escapes artifact root: ${candidate}`);
  }
  return resolved;
}

/** Artifact / fixture file names are harness-controlled identifiers. */
export function assertSafeName(name: string): string {
  if (!/^[A-Za-z0-9._-]+$/.test(name)) {
    throw new Error(`unsafe file name: ${name}`);
  }
  return name;
}
