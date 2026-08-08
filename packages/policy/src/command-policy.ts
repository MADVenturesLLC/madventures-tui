// packages/policy/src/command-policy.ts
// Command classification and category validation.

import type { CommandCategory } from "@madventures/protocol";

export function classifyCommand(command: string): CommandCategory | null {
  const lower = command.toLowerCase().trim();

  // Read commands
  if (lower === "cat" || lower === "ls" || lower === "head" || lower === "tail" ||
      lower === "grep" || lower === "rg" || lower === "find" || lower === "wc" ||
      lower.startsWith("git log") || lower.startsWith("git show") ||
      lower.startsWith("git diff") || lower.startsWith("git status") ||
      lower.startsWith("git branch")) {
    return "read";
  }

  // Write commands
  if (lower.startsWith("sed") || lower.startsWith("awk") || lower === "touch" ||
      lower === "mkdir" || lower === "rm" || lower === "cp" || lower === "mv" ||
      lower.startsWith("echo") || lower.startsWith("printf") ||
      lower.startsWith("git add") || lower.startsWith("git commit") ||
      lower.startsWith("git checkout") || lower.startsWith("git reset") ||
      lower.startsWith("git rebase") || lower.startsWith("git cherry-pick")) {
    return "write";
  }

  // Build commands
  if (lower === "make" || lower.startsWith("make ") ||
      lower.startsWith("bun run") || lower.startsWith("npm run") ||
      lower.startsWith("yarn ") || lower.startsWith("pnpm ") ||
      lower === "tsc" || lower.startsWith("tsc ") ||
      lower.startsWith("cargo build") || lower.startsWith("go build")) {
    return "build";
  }

  // Test commands
  if (lower.startsWith("bun test") || lower.startsWith("npm test") ||
      lower.startsWith("yarn test") || lower.startsWith("pytest") ||
      lower.startsWith("cargo test") || lower.startsWith("go test") ||
      lower.startsWith("jest")) {
    return "test";
  }

  // Git commands (not already classified as read/write)
  if (lower.startsWith("git ")) {
    return "git";
  }

  // Network commands
  if (lower.startsWith("curl") || lower.startsWith("wget") ||
      lower.startsWith("ssh") || lower.startsWith("scp") ||
      lower.startsWith("http") || lower.startsWith("ftp")) {
    return "network";
  }

  // Everything else is shell
  return "shell";
}

export function isCommandCategoryAllowed(
  category: CommandCategory | null,
  allowedCategories: readonly CommandCategory[],
): boolean {
  if (category === null) return false;
  return allowedCategories.includes(category);
}