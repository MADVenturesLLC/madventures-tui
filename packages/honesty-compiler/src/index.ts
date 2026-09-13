// packages/honesty-compiler/src/index.ts
// @mad/honesty-compiler — public API.
//
// The closed Claim IR, the four-pass compiler, and the P4 report renderers.
// Library surface only; the CLI lives at src/cli.ts. Importing this module
// must stay node-safe: node I/O lives in node-io.ts and is pulled in by the
// compiler, not by the IR.

export {
  CLAIM_KINDS,
  COMPILER_NOT_EVIDENCE_OF,
  EVIDENCE_REF_KINDS,
  HONESTY_COMPILER_SCHEMA,
  KIND_TO_ASSERTED_CLAIM,
  PRODUCED_BY,
  REPORT_SCHEMA,
  STANDARD_FORBIDDEN,
  claimLanguageIssues,
  forbiddenTokenIn,
  validateClaimIr,
  validateEvidenceRefInput,
  type ArgusPacketRef,
  type BuildMemoryRef,
  type ClaimIr,
  type ClaimKind,
  type EvidenceRef,
  type EvidenceRefKind,
  type Issue,
  type ProvingGroundRef,
  type StandardForbiddenToken,
  type TestSuiteRef,
} from "./ir";
export { extractDeclaredClaimsJson, parseClaimsDocument } from "./parse";
export { rungCheck } from "./rung";
export { bindEvidence, type BindContext, type BoundClaim, type BoundVerdictRef, type SkipNote } from "./bind";
export { emitVerdict, FIXTURE_HEAD_SHA } from "./emit";
export {
  compileClaims,
  type ClaimOutcome,
  type CompileMode,
  type CompileOptions,
  type CompileOutcome,
  type CompileResult,
} from "./compiler";
export { renderHuman, renderJsonLine } from "./report";
