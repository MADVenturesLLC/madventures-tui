// packages/proving-ground/src/types.ts
// Core contracts for the Adversarial Proving Ground.

export type ChallengeKind =
  | "malformed_authority"
  | "tui_governance"
  | "static_instruction_drift"
  | "spec_card";

export type ChallengeOutcome = "pass" | "fail" | "unsupported" | "spec_only";

export interface ChallengeDecl {
  id: string;
  kind: ChallengeKind;
  title: string;
  /** Name of the independent oracle that judges this challenge. */
  oracle: string;
  /** Default deterministic seed. Overridable via --seed. */
  seed: number;
  /** Quarantined challenges never gate CI (excluded from --suite v0 unless --include-flaky). */
  flaky?: boolean;
  /** spec_card challenges point at their markdown card + schema. */
  specCardPath?: string;
  specSchemaPath?: string;
  /** Why a challenge is skipped in a given environment (recorded, never silent). */
  unsupportedReason?: string;
}

export interface CaseRecord {
  caseId: string;
  /** "authored" = hand-pinned law case; "fuzz" = seeded generated case. */
  origin: "authored" | "fuzz" | "vector" | "pin" | "check";
  seedOffset?: number;
  /** Compact description of the input (never full secrets — there are none). */
  input: unknown;
  expected: string;
  actual: string;
  pass: boolean;
  /** Citation hook for future Verified Build Memory (A3-style observations). */
  citation?: string;
}

export interface ChallengeResult {
  id: string;
  kind: ChallengeKind;
  title: string;
  outcome: ChallengeOutcome;
  oracle: string;
  seed: number;
  durationMs: number;
  cases: CaseRecord[];
  artifacts: string[];
  /** Required when outcome === "unsupported". */
  unsupportedReason?: string;
  /** Citation hooks for future Verified Build Memory. */
  citations: string[];
}

export const PACKET_SCHEMA = "REP-v1-pg";
export const PACKET_LABEL = "PROVING_GROUND — NOT PHASE_0 — NOT OCCUPANCY_PROOF";

export interface ProvingGroundPacket {
  schema: "REP-v1-pg";
  label: string;
  run_id: string;
  git_sha: string;
  seed: number;
  started_at: string;
  finished_at: string;
  challenges: ChallengeResult[];
  promoted_regressions: string[];
  summary: {
    total: number;
    passed: number;
    failed: number;
    unsupported: number;
    spec_only: number;
    /** Exit-ok requires zero FAILs. unsupported/spec_only are explicit, never silent. */
    exit_ok: boolean;
  };
  artifacts: { dir: string; packet: string };
}
