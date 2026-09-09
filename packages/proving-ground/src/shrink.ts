// packages/proving-ground/src/shrink.ts
// Counterexample minimization for claim-boundary vectors (v0 scope).
//
// Generic delta-debugging-lite over JSON vectors: try deleting optional keys,
// then removing array elements one at a time. A candidate survives only if it
// PRESERVES the failing verdict class (same primary issue code) — shrink stops
// when no single-step reduction still fails. Other challenge kinds report
// unsupported minimization honestly rather than pretending.

import type { LawVerdict } from "./law";
import { judge } from "./law";

export interface ShrinkStep {
  step: number;
  operation: string;
  kept: unknown;
  stillFails: boolean;
}

export interface ShrinkResult {
  minimal: unknown;
  steps: ShrinkStep[];
  /** The primary reject code that had to survive shrinking. */
  preservedCode: string;
}

function primaryCode(verdict: LawVerdict): string | null {
  return verdict.verdict === "reject" ? (verdict.codes[0] ?? null) : null;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Shrink a FAILING vector while the same primary reject code persists.
 * Returns the original vector untouched if it does not fail with a code.
 */
export function shrinkClaimVector(vector: unknown): ShrinkResult {
  const initial = judge(vector);
  const code = primaryCode(initial);
  if (code === null) {
    return { minimal: vector, steps: [], preservedCode: "(not failing)" };
  }

  const stillFailsWithCode = (v: unknown): boolean => {
    const verdict = judge(v);
    return verdict.verdict === "reject" && verdict.codes.includes(code);
  };

  const steps: ShrinkStep[] = [];
  let current: unknown = vector;
  let step = 0;

  // 1. Drop keys that are irrelevant to the failing law (gloss first — it is
  //    never semantic; then any other non-essential keys).
  if (isRecord(current)) {
    const keyOrder = ["gloss", ...Object.keys(current).filter((k) => k !== "gloss" && k !== "rung" && k !== "not_evidence_of")];
    for (const key of keyOrder) {
      if (!isRecord(current) || !(key in current)) continue;
      const candidate: Record<string, unknown> = { ...current };
      delete candidate[key];
      step += 1;
      if (stillFailsWithCode(candidate)) {
        steps.push({ step, operation: `drop key '${key}'`, kept: candidate, stillFails: true });
        current = candidate;
      } else {
        steps.push({ step, operation: `drop key '${key}' (rejected: changes verdict)`, kept: current, stillFails: false });
      }
    }
  }

  // 2. Remove not_evidence_of elements one at a time.
  if (isRecord(current) && Array.isArray(current["not_evidence_of"])) {
    const elements = [...(current["not_evidence_of"] as unknown[])];
    for (let i = elements.length - 1; i >= 0; i--) {
      if (!isRecord(current)) break;
      const list = [...(current["not_evidence_of"] as unknown[])];
      if (list.length <= 1) break; // keep at least one element for a meaningful repro
      list.splice(i, 1);
      const candidate: Record<string, unknown> = { ...current, not_evidence_of: list };
      step += 1;
      if (stillFailsWithCode(candidate)) {
        steps.push({ step, operation: `remove not_evidence_of[${String(i)}]`, kept: candidate, stillFails: true });
        current = candidate;
      } else {
        steps.push({ step, operation: `remove not_evidence_of[${String(i)}] (rejected: changes verdict)`, kept: current, stillFails: false });
      }
    }
  }

  return { minimal: current, steps, preservedCode: code };
}
