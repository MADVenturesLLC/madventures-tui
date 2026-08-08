// packages/policy/src/fingerprint.ts
// Repository fingerprinting: compute a RepositoryFingerprint from a repo path.

import type { RepositoryFingerprint } from "@madventures/protocol";
import { canonicalJson, sha256Canonical } from "@madventures/protocol";
import { spawnSync } from "child_process";

export async function fingerprintRepository(repoPath: string): Promise<RepositoryFingerprint> {
  // Get current git SHA
  const shaResult = spawnSync("git", ["rev-parse", "HEAD"], {
    cwd: repoPath,
    encoding: "utf-8",
  });

  const gitSha = shaResult.stdout?.trim() ?? "";

  // Check for uncommitted changes
  const diffResult = spawnSync("git", ["diff", "--stat"], {
    cwd: repoPath,
    encoding: "utf-8",
  });

  const hasUncommitted = (diffResult.stdout?.trim().length ?? 0) > 0;

  if (hasUncommitted) {
    // Working tree fingerprint — includes uncommitted diff
    const diffSha = await sha256Canonical({
      git_sha: gitSha,
      diff: diffResult.stdout?.trim() ?? "",
    });
    return {
      kind: "working_tree",
      sha256: diffSha,
      git_sha: gitSha,
      base_git_sha: gitSha,
    };
  }

  // Clean commit fingerprint
  const commitSha = await sha256Canonical({
    git_sha: gitSha,
    repo: repoPath,
  });

  return {
    kind: "commit",
    sha256: commitSha,
    git_sha: gitSha,
  };
}