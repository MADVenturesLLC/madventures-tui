// packages/proving-ground/src/index.ts
// Public API for the Adversarial Proving Ground.

export { mulberry32, pick, intBetween, type Rng } from "./rng";
export {
  PACKET_LABEL,
  PACKET_SCHEMA,
  type CaseRecord,
  type ChallengeDecl,
  type ChallengeKind,
  type ChallengeOutcome,
  type ChallengeResult,
  type ProvingGroundPacket,
} from "./types";
export {
  authoredLawCases,
  judge,
  judgeLawCase,
  mutate,
  mutationClaimPool,
  MUTATION_KINDS,
  type LawCase,
  type LawVerdict,
  type MutationKind,
} from "./law";
export { runMalformedAuthority } from "./runners/malformed-authority";
export { checkTuiPrereqs, runTuiGovernance } from "./runners/tui-governance";
export {
  DRIFT_PINS,
  evaluateDriftPin,
  runInstructionDrift,
  type DriftPin,
  type DriftPinVerdict,
} from "./runners/instruction-drift";
export { runSpecCard, validateSpecCard } from "./runners/spec-card";
export { shrinkClaimVector, type ShrinkResult, type ShrinkStep } from "./shrink";
export {
  CLAIM_BOUNDARY_REGRESSION_DIR,
  listPromoted,
  readFixtureIds,
  writeClaimBoundaryFixture,
} from "./promote";
export { challengeDeclarations, DEFAULT_SEED, findChallenge } from "./challenges";
export { runSuite, type SuiteOptions } from "./suite";
export { buildPacket, makeRunId } from "./packet";
