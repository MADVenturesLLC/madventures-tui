// packages/protocol/src/normalization.ts
// Pinned independence-domain and identifier normalization.

const INDEPENDENCE_DOMAIN_PATTERN = /^[a-z][a-z0-9-]{1,63}$/;
const IDENTIFIER_PATTERN = /^[a-z0-9][a-z0-9._-]{0,63}$/;

export class NormalizationError extends Error {
  constructor(
    public readonly kind: "independence_domain" | "identifier",
    public readonly input: string,
  ) {
    super(`invalid ${kind}`);
    this.name = "NormalizationError";
  }
}

export function normalizeIndependenceDomain(raw: string): string {
  const normalized = raw
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  if (!INDEPENDENCE_DOMAIN_PATTERN.test(normalized)) {
    throw new NormalizationError("independence_domain", raw);
  }
  return normalized;
}

export function normalizeIdentifier(raw: string): string {
  const normalized = raw.normalize("NFKC").trim().toLowerCase();
  if (!IDENTIFIER_PATTERN.test(normalized)) {
    throw new NormalizationError("identifier", raw);
  }
  return normalized;
}
