// packages/policy/src/egress-policy.ts
// Egress validation: reject unapproved network destinations.

export function isEgressAllowed(
  destination: string | null,
  allowedDestinations: readonly string[],
): boolean {
  if (destination === null) return true; // no egress requested
  if (allowedDestinations.length === 0) return false; // no egress allowed

  for (const allowed of allowedDestinations) {
    if (destination === allowed) return true;
    if (matchesPattern(destination, allowed)) return true;
  }
  return false;
}

function matchesPattern(destination: string, pattern: string): boolean {
  // Simple domain matching: *.example.com matches api.example.com
  if (pattern.startsWith("*.")) {
    const suffix = pattern.slice(1); // .example.com
    try {
      const destUrl = new URL(destination);
      return destUrl.hostname.endsWith(suffix);
    } catch {
      return destination.endsWith(suffix);
    }
  }
  try {
    const destUrl = new URL(destination);
    const allowedUrl = new URL(pattern);
    return destUrl.hostname === allowedUrl.hostname;
  } catch {
    return destination === pattern;
  }
}