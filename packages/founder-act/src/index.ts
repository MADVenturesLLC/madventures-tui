// packages/founder-act/src/index.ts
// Public surface of @mad/founder-act.

export {
  ACT_KINDS,
  ACT_SCHEMA,
  checkHashes,
  hashBody,
  isFounderAct,
  sealAct,
  validateActBody,
  type ActBodyV0,
  type ActKind,
  type ActV0Actor,
  type EvidenceRef,
  type FounderActV0,
  type SealInput,
  type SealedActV0,
} from "./act";
export { canonicalJson, sha256Hex } from "./canonical";
export { renderShow } from "./show";
export {
  resolveActToken,
  verifyAct,
  verifyActFile,
  verifyActFileWithRevocation,
  type ActStatus,
  type VerifyOptions,
  type VerifyResult,
} from "./verify";
