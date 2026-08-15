// packages/protocol/src/surface-id.ts
// Branded SurfaceId with syntax-only validation. Syntax is not eligibility.

export type SurfaceId = string & { readonly __brand: "SurfaceId" };

export const SURFACE_ID_PATTERN: RegExp = /^[a-z][a-z0-9-]{1,63}$/;

export class InvalidSurfaceIdError extends Error {
  constructor() {
    super("invalid surface id");
    this.name = "InvalidSurfaceIdError";
  }
}

export function isSurfaceIdSyntax(raw: string): boolean {
  return SURFACE_ID_PATTERN.test(raw);
}

export function parseSurfaceId(raw: string): SurfaceId {
  if (!isSurfaceIdSyntax(raw)) {
    throw new InvalidSurfaceIdError();
  }
  return raw as SurfaceId;
}
