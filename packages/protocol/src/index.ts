// packages/protocol/src/index.ts
// Public exports for the madbridge-protocol/v1 package.

export { PROTOCOL_VERSION, EVENT_TYPES } from "./events";
export type { EventType, BridgeEventV1 } from "./events";
export { parseBridgeEvent } from "./events";

export type {
  TaskEnvelopeV1,
  TaskScope,
  ExecutionIdentity,
  RepositoryFingerprint,
  CliSurface,
  ExecutionRole,
  DataClass,
  CommandCategory,
  ArtifactCategory,
  Effort,
} from "./task-envelope";
export type { SurfaceId } from "./surface-id";
export {
  parseTaskEnvelope,
  KNOWN_ROLES,
  KNOWN_SURFACES,
  KNOWN_DATA_CLASSES,
  KNOWN_COMMAND_CATEGORIES,
} from "./task-envelope";
export { parseSurfaceId } from "./surface-id";

export { canonicalJson, sha256Canonical, sha256CanonicalSync } from "./canonical-json";
export { sha256Hex } from "./crypto";
export { newEventId, newSessionId } from "./ids";
export { encodeWire, decodeWire } from "./wire";
export type { WireMessage } from "./wire";