// packages/protocol/src/pair-constraints.ts
// The single authority for active-surface cardinality and pair constraints.
//
// Spec section 1.2: exactly one production module encodes how many active
// surfaces a Version 1 live pair may contain. No other production module may
// carry a paired two-tuple identifier name or a literal comparison of
// `executions.length` against that number. The Phase 3A architecture guard in
// test/phase3a/architecture-phase3a.test.ts enforces both prohibitions and is
// itself proven against a seeded violation.

import type { ExecutionIdentity } from "./task-envelope";

/**
 * The exact number of active surfaces a Version 1 live pair may contain.
 * This is the only place in production source that encodes that number.
 */
export const MAX_ACTIVE_SURFACES_V1 = 2 as const;

/** Raised when a set of executions does not hold exactly MAX_ACTIVE_SURFACES_V1 entries. */
export class CardinalityError extends Error {
  constructor(public readonly received: number) {
    super(
      `expected exactly ${MAX_ACTIVE_SURFACES_V1} active surfaces, received ${received}`,
    );
    this.name = "CardinalityError";
  }
}

/**
 * Enforce the active-surface cardinality constraint.
 *
 * One constraint rejects both under-count and over-count, so no caller needs
 * its own count check. Callers that must distinguish "no executions supplied
 * at all" from "the wrong number supplied" perform that presence check before
 * calling this; presence is not cardinality.
 */
export function assertActiveSurfaceCardinality(
  executions: readonly ExecutionIdentity[],
): void {
  if (executions.length !== MAX_ACTIVE_SURFACES_V1) {
    throw new CardinalityError(executions.length);
  }
}
