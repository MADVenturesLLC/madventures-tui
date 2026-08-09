// test/acceptance/disposable-repo.ts
// Isolated disposable Git repository fixture for acceptance tests.
//
// Creates a temporary directory, initializes Git, commits one file, creates
// dedicated Claude and Antigravity worktrees, and returns cleanup handles.
//
// SAFETY: refuses any path inside the production repository or any branch
// named `main` or `master` for destructive controls.

import { mkdtempSync, rmSync, existsSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { spawnSync } from "child_process";

export interface DisposableRepo {
  /** Root repo path (bare-ish working repo with one commit). */
  rootPath: string;
  /** Worktree path for the Claude execution. */
  claudeWorktree: string;
  /** Worktree path for the Antigravity execution. */
  antigravityWorktree: string;
  /** Branch name used for the disposable repo (never main/master). */
  branch: string;
  /** Initial commit SHA. */
  initialSha: string;
  /** Repository fingerprint components. */
  gitSha: string;
  /** Cleanup function — removes all temp directories. */
  cleanup: () => void;
}

const PRODUCTION_REPO_MARKERS = ["madventures-tui", ".madv-runtime"];

function git(cwd: string, ...args: string[]): string {
  const result = spawnSync("git", args, {
    cwd,
    encoding: "utf-8",
    stdio: ["pipe", "pipe", "pipe"],
  });
  if (result.status !== 0) {
    throw new Error(
      `git ${args.join(" ")} failed in ${cwd}: ${result.stderr?.trim() ?? result.stdout?.trim() ?? "unknown"}`,
    );
  }
  return (result.stdout ?? "").trim();
}

function isInsideProductionRepo(path: string): boolean {
  return PRODUCTION_REPO_MARKERS.some((marker) => path.includes(marker));
}

function isForbiddenBranch(branch: string): boolean {
  return branch === "main" || branch === "master";
}

/**
 * Create a disposable Git repository fixture.
 *
 * @param options Optional overrides for branch name and path.
 * @returns DisposableRepo handle with cleanup function.
 */
export function createDisposableRepo(options?: {
  branch?: string;
  basePath?: string;
}): DisposableRepo {
  // Generate a unique branch name — never main/master
  let branch = options?.branch ?? `test-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  if (isForbiddenBranch(branch)) {
    throw new Error(`refusing to create disposable repo with forbidden branch: ${branch}`);
  }

  // Create temp directory — refuse if inside production repo
  const baseDir = options?.basePath ?? tmpdir();
  const tempDir = mkdtempSync(join(baseDir, "madv-test-repo-"));

  if (isInsideProductionRepo(tempDir)) {
    rmSync(tempDir, { recursive: true, force: true });
    throw new Error(`refusing to create disposable repo inside production repo: ${tempDir}`);
  }

  // Initialize git
  git(tempDir, "init", "--initial-branch", branch);
  git(tempDir, "config", "user.email", "test@madv.local");
  git(tempDir, "config", "user.name", "Test Fixture");

  // Create one committed file
  const seedFile = join(tempDir, "README.md");
  const { writeFileSync } = require("fs");
  writeFileSync(seedFile, "# Disposable Test Repo\n\nCreated by acceptance test fixture.\n");
  git(tempDir, "add", "README.md");
  git(tempDir, "commit", "-m", "test: initial disposable repo commit");

  const initialSha = git(tempDir, "rev-parse", "HEAD");
  const gitSha = initialSha;

  // Create worktrees for Claude and Antigravity
  const claudeWorktree = join(baseDir, `madv-wt-claude-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`);
  const antigravityWorktree = join(baseDir, `madv-wt-agy-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`);

  // Create worktree branches
  const claudeBranch = `${branch}-claude`;
  const agyBranch = `${branch}-agy`;

  git(tempDir, "worktree", "add", "-b", claudeBranch, claudeWorktree);
  git(tempDir, "worktree", "add", "-b", agyBranch, antigravityWorktree);

  const cleanup = () => {
    // Remove worktrees first
    try {
      git(tempDir, "worktree", "remove", "--force", claudeWorktree);
    } catch {
      // ignore
    }
    try {
      git(tempDir, "worktree", "remove", "--force", antigravityWorktree);
    } catch {
      // ignore
    }
    // Remove temp directories
    for (const dir of [tempDir, claudeWorktree, antigravityWorktree]) {
      if (existsSync(dir)) {
        rmSync(dir, { recursive: true, force: true });
      }
    }
  };

  return {
    rootPath: tempDir,
    claudeWorktree,
    antigravityWorktree,
    branch,
    initialSha,
    gitSha,
    cleanup,
  };
}

/**
 * Assert that a path is NOT inside the production repository.
 * Used as a destructive-control guard in tests.
 */
export function assertNotProductionRepo(path: string): void {
  if (isInsideProductionRepo(path)) {
    throw new Error(`refusing operation inside production repo: ${path}`);
  }
}

/**
 * Assert that a branch name is not main or master.
 */
export function assertNotForbiddenBranch(branch: string): void {
  if (isForbiddenBranch(branch)) {
    throw new Error(`refusing operation on forbidden branch: ${branch}`);
  }
}
