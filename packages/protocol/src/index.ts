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
  KNOWN_DATA_CLASSES,
  KNOWN_COMMAND_CATEGORIES,
} from "./task-envelope";
export { parseSurfaceId } from "./surface-id";

export { canonicalJson, sha256Canonical, sha256CanonicalSync } from "./canonical-json";
export { sha256Hex } from "./crypto";

// Room Runtime Phase 1 — TUI boundary CONSUMER representation of Gateway
// IPC v2 (Commission Final r3 §10: canonical truth stays in Build Room's
// packages/gateway-protocol; this is the limited consumer-side definition
// only — no duplicated authoritative behavior).
export * from "./room-ipc-v2";
export { newEventId, newSessionId } from "./ids";
export { encodeWire, decodeWire } from "./wire";
export type { WireMessage } from "./wire";

export type { AdapterRegistrationV1 } from "./adapter-registry";
export { ADAPTER_REGISTRY, lookupRegistration } from "./adapter-registry";

export type {
  SessionLifecycleEventTypeV1,
  InterruptionReasonCodeV1,
  PublishedIncidentPayloadV1,
  SessionInterruptedPayloadV1,
  FounderCommandPayloadV1,
  SessionTerminalPayloadV1,
  LifecyclePayloadByTypeV1,
  SessionLifecycleEventBaseV1,
  SessionLifecycleEventV1,
  LedgerEventV1,
} from "./lifecycle-events";
export {
  SESSION_LIFECYCLE_EVENT_TYPES,
  INTERRUPTION_REASON_CODES,
} from "./lifecycle-events";

export type {
  CapabilityRecordV1,
  ObservedSurfaceFacts,
  StalenessReason,
} from "./capability-record";
export {
  CapabilityRecordError,
  parseCapabilityRecord,
  evaluateCapabilityFreshness,
  capabilityRecordFilename,
} from "./capability-record";