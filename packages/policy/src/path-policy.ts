// packages/policy/src/path-policy.ts
// Path validation: glob matching, traversal rejection, normalization.
// Resolves paths relative to the approved repository root.

export function assertWithinAllowedPath(
  requestedPath: string,
  allowedPaths: readonly string[],
  repoRoot: string,
): void {
  const normalized = normalizePath(requestedPath, repoRoot);

  // Reject path traversal
  if (normalized.includes("..")) {
    throw new Error("path_denied");
  }

  // Reject absolute paths outside the repo
  if (normalized.startsWith("/") && !normalized.startsWith(repoRoot)) {
    throw new Error("path_denied");
  }

  // Strip repo root prefix for glob matching
  const relativePath = normalized.startsWith(repoRoot)
    ? normalized.slice(repoRoot.length).replace(/^\//, "")
    : normalized.replace(/^\//, "");

  for (const pattern of allowedPaths) {
    if (matchGlob(relativePath, pattern)) return;
  }

  throw new Error("path_denied");
}

function normalizePath(path: string, repoRoot: string): string {
  // If absolute, use as-is
  if (path.startsWith("/")) {
    return path;
  }
  // If relative, resolve against repo root
  return `${repoRoot}/${path}`;
}

function matchGlob(path: string, pattern: string): boolean {
  // Convert glob to regex.
  // Order: escape regex specials in literal text, THEN replace glob markers.
  // Use placeholders for glob tokens to avoid collision with escaping.

  // Step 1: Mark glob tokens with placeholders
  let marked = pattern
    .replace(/\*\*/g, "\x00GLOBSTAR\x00")
    .replace(/\*/g, "\x00STAR\x00")
    .replace(/\?/g, "\x00Q\x00");

  // Step 2: Escape regex special characters in the remaining literal text
  marked = marked.replace(/[.+^${}()|[\]\\]/g, "\\$&");

  // Step 3: Replace placeholders with regex patterns
  const regexStr = marked
    .replace(/\x00GLOBSTAR\x00/g, ".*")
    .replace(/\x00STAR\x00/g, "[^/]*")
    .replace(/\x00Q\x00/g, "[^/]");

  const regex = new RegExp(`^${regexStr}$`);
  return regex.test(path);
}

export function isPathAllowed(
  requestedPath: string,
  allowedPaths: readonly string[],
  repoRoot: string,
): boolean {
  try {
    assertWithinAllowedPath(requestedPath, allowedPaths, repoRoot);
    return true;
  } catch {
    return false;
  }
}