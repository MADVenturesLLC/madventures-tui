// apps/projector-mc/src/lib/room-status.ts
// Vendored RoomStatus IR mirror + honesty render model (Lane 3,
// build/projector-room-status-v0).
//
// PROVENANCE — this is a FIXTURE-ONLY vendored mirror, not a second authority:
//   source: MADVenturesLLC/founder-os-build-room
//           packages/room-status/src/vocabulary.ts + status.ts
//   branch: build/room-status-ir-v0
//   head:   81d1203e6c0c5382bcf2773d61eed5f0dde4f8ee
// The tui monorepo cannot import a sibling repository's package without a
// packaging decision (workspace member / published tarball / git dependency —
// FOUNDER_DECISION_REQUIRED), so Lane 3 vendors the closed vocabulary and
// pins it against fixtures/room-status-vocabulary.pin.json (a hand-edit to
// either side fails test/room-status.test.ts). When the real IR becomes
// importable, this file is deleted in favor of the import — the render model
// below is the only part meant to survive.
//
// Honesty rules mirrored from Lane 1 and enforced for DISPLAY:
//   - completed is emerald ONLY with non-empty evidence_refs;
//   - an illegal completed (no evidence) is displayed as verifying plus an
//     IR_FAULT banner — never painted success, never silently dropped;
//   - block_reason shows its CODE only when the phase is blocked;
//   - unknown / verifying / blocked render in tones distinct from completed.
// Color discipline: status color comes only from the PHASE_TONE /
// OCCUPANCY_TONE maps below — the same rule tokens.css applies to verdicts
// and memory. No ad-hoc color.

export const ROOM_STATUS_IR_VERSIONS = [1] as const;
export type RoomStatusIrVersion = (typeof ROOM_STATUS_IR_VERSIONS)[number];

export const ROOM_OCCUPANCY = ["empty", "occupied", "closed"] as const;
export type RoomOccupancy = (typeof ROOM_OCCUPANCY)[number];

export const AGENT_PHASES = [
  "idle",
  "running",
  "waiting_approval",
  "blocked",
  "verifying",
  "completed",
  "failed",
  "unknown",
] as const;
export type AgentPhase = (typeof AGENT_PHASES)[number];

export const ROOM_BLOCK_REASONS = [
  "policy_deny",
  "completion_gap",
  "backpressure",
  "hook_error",
  "human_hold",
  "other_named",
] as const;
export type RoomBlockReason = (typeof ROOM_BLOCK_REASONS)[number];

export const EVIDENCE_REF_KINDS = ["path", "sha", "handoff", "receipt"] as const;
export type EvidenceRefKind = (typeof EVIDENCE_REF_KINDS)[number];

export interface EvidenceRef {
  readonly kind: EvidenceRefKind;
  readonly ref: string;
}

export interface AgentSlotPhase {
  readonly slotId: string;
  readonly phase: AgentPhase;
  readonly blockReason?: RoomBlockReason;
}

export interface RoomStatus {
  readonly irVersion: RoomStatusIrVersion;
  readonly roomId: string;
  readonly occupancy: RoomOccupancy;
  readonly agentPhase: AgentPhase;
  readonly blockReason?: RoomBlockReason;
  readonly slotPhases?: readonly AgentSlotPhase[];
  readonly evidenceRefs: readonly EvidenceRef[];
  readonly observedSeq: number;
}

export class RoomStatusParseError extends Error {
  constructor(
    public readonly reason: string,
    detail: string,
  ) {
    super(`room-status IR rejected (${reason}): ${detail}`);
    this.name = "RoomStatusParseError";
  }
}

function isMember<T extends string>(set: readonly T[], value: unknown): value is T {
  return typeof value === "string" && (set as readonly string[]).includes(value);
}

/** Display tones — the projector's only status palette (see tokens.css). */
export type Tone = "emerald" | "amber" | "rose" | "zinc" | "violet";

/** Phase → tone. completed is the ONLY emerald phase, and only with evidence (renderRoomStatus). */
export const PHASE_TONE: Readonly<Record<AgentPhase, Tone>> = {
  idle: "zinc",
  running: "violet",
  waiting_approval: "amber",
  blocked: "rose",
  verifying: "amber",
  completed: "emerald",
  failed: "rose",
  unknown: "zinc",
};

/** Occupancy → tone. Occupied reads active (violet); nothing here implies health. */
export const OCCUPANCY_TONE: Readonly<Record<RoomOccupancy, Tone>> = {
  empty: "zinc",
  occupied: "violet",
  closed: "zinc",
};

/** Machine codes for IR faults the UI must surface, never hide. */
export type RoomStatusFault =
  | { readonly code: "completed_without_evidence"; readonly detail: string }
  | { readonly code: "slot_completed_without_evidence"; readonly detail: string };

export interface RoomStatusView {
  readonly roomId: string;
  readonly occupancy: RoomOccupancy;
  /** The phase that may be DISPLAYED — downgraded when the IR was illegal. */
  readonly displayedPhase: AgentPhase;
  readonly tone: Tone;
  readonly blockReason: RoomBlockReason | null;
  readonly evidenceRefs: readonly EvidenceRef[];
  /** Non-null when the incoming record violated the completed-needs-evidence rule. */
  readonly fault: RoomStatusFault | null;
}

function narrowBlockReason(value: unknown): RoomBlockReason | undefined {
  if (value === undefined) return undefined;
  if (!isMember(ROOM_BLOCK_REASONS, value)) {
    throw new RoomStatusParseError("block_reason_enum", `unknown block reason: ${JSON.stringify(value)}`);
  }
  return value;
}

function parseEvidenceRefs(value: unknown): EvidenceRef[] {
  if (!Array.isArray(value)) throw new RoomStatusParseError("evidence_refs_type", "evidenceRefs must be an array");
  const refs: EvidenceRef[] = [];
  for (const entry of value) {
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
      throw new RoomStatusParseError("evidence_ref_shape", "each evidenceRef must be an object");
    }
    const record = entry as Record<string, unknown>;
    if (!isMember(EVIDENCE_REF_KINDS, record["kind"])) {
      throw new RoomStatusParseError("evidence_ref_kind", `unknown evidence kind: ${JSON.stringify(record["kind"])}`);
    }
    if (typeof record["ref"] !== "string" || record["ref"].length === 0) {
      throw new RoomStatusParseError("evidence_ref_value", "evidenceRef.ref must be a non-empty string");
    }
    refs.push({ kind: record["kind"], ref: record["ref"] });
  }
  return refs;
}

function parseSlotPhases(value: unknown): AgentSlotPhase[] {
  if (!Array.isArray(value)) throw new RoomStatusParseError("slot_phases_type", "slotPhases must be an array");
  const slots: AgentSlotPhase[] = [];
  for (const entry of value) {
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
      throw new RoomStatusParseError("slot_phase_shape", "each slotPhase must be an object");
    }
    const record = entry as Record<string, unknown>;
    if (typeof record["slotId"] !== "string" || record["slotId"].length === 0) {
      throw new RoomStatusParseError("slot_phase_id", "slotPhase.slotId must be a non-empty string");
    }
    if (!isMember(AGENT_PHASES, record["phase"])) {
      throw new RoomStatusParseError("slot_phase_enum", `unknown agent phase: ${JSON.stringify(record["phase"])}`);
    }
    const blockReason = narrowBlockReason(record["blockReason"]);
    if (blockReason !== undefined && record["phase"] !== "blocked") {
      throw new RoomStatusParseError(
        "block_reason_requires_blocked",
        `slot blockReason is only truthful with phase "blocked", got "${String(record["phase"])}"`,
      );
    }
    slots.push(
      blockReason === undefined
        ? { slotId: record["slotId"], phase: record["phase"] }
        : { slotId: record["slotId"], phase: record["phase"], blockReason },
    );
  }
  return slots;
}

/**
 * Validate an untrusted RoomStatus record. Mirrors the Lane 1 non-strict
 * invariants (closed enums; block_reason only with blocked; a closed room
 * cannot claim an active phase). The completed-needs-evidence rule is NOT a
 * parse throw here — the UI must be able to RECEIVE an illegal record and
 * render it as verifying + fault (renderRoomStatus), which is stricter than
 * refusing to look at it.
 */
export function parseRoomStatus(value: unknown): RoomStatus {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new RoomStatusParseError("shape", "RoomStatus must be a JSON object");
  }
  const record = value as Record<string, unknown>;
  if (record["irVersion"] !== 1) {
    throw new RoomStatusParseError("ir_version", `unsupported IR version: ${JSON.stringify(record["irVersion"])}`);
  }
  if (typeof record["roomId"] !== "string" || record["roomId"].length === 0) {
    throw new RoomStatusParseError("room_id", "roomId must be a non-empty string");
  }
  if (!isMember(ROOM_OCCUPANCY, record["occupancy"])) {
    throw new RoomStatusParseError("occupancy_enum", `unknown occupancy: ${JSON.stringify(record["occupancy"])}`);
  }
  if (!isMember(AGENT_PHASES, record["agentPhase"])) {
    throw new RoomStatusParseError("agent_phase_enum", `unknown agent phase: ${JSON.stringify(record["agentPhase"])}`);
  }
  if (typeof record["observedSeq"] !== "number" || !Number.isInteger(record["observedSeq"]) || record["observedSeq"] < 0) {
    throw new RoomStatusParseError("observed_seq", "observedSeq must be a non-negative integer");
  }
  const blockReason = narrowBlockReason(record["blockReason"]);
  if (blockReason !== undefined && record["agentPhase"] !== "blocked") {
    throw new RoomStatusParseError(
      "block_reason_requires_blocked",
      `room blockReason is only truthful with phase "blocked", got "${String(record["agentPhase"])}"`,
    );
  }
  if (record["occupancy"] === "closed" && (record["agentPhase"] === "running" || record["agentPhase"] === "verifying")) {
    throw new RoomStatusParseError("closed_not_active", `a closed room cannot claim phase "${String(record["agentPhase"])}"`);
  }
  const evidenceRefs = parseEvidenceRefs(record["evidenceRefs"] ?? []);
  const slotPhases = record["slotPhases"] === undefined ? undefined : parseSlotPhases(record["slotPhases"]);
  return {
    irVersion: 1,
    roomId: record["roomId"],
    occupancy: record["occupancy"],
    agentPhase: record["agentPhase"],
    ...(blockReason === undefined ? {} : { blockReason }),
    ...(slotPhases === undefined ? {} : { slotPhases }),
    evidenceRefs,
    observedSeq: record["observedSeq"],
  };
}

/**
 * The Lane 3 honesty gate. A completed phase (room or slot) with no evidence
 * refs is downgraded to verifying and flagged — success is never painted on
 * an illegal record. Legal completed (with refs) is the only emerald.
 */
export function renderRoomStatus(status: RoomStatus): RoomStatusView {
  const hasEvidence = status.evidenceRefs.length > 0;
  let fault: RoomStatusFault | null = null;
  if (status.agentPhase === "completed" && !hasEvidence) {
    fault = {
      code: "completed_without_evidence",
      detail: "room completed with empty evidence_refs — Lane 1 strict requires at least one ref",
    };
  } else if ((status.slotPhases ?? []).some((slot) => slot.phase === "completed") && !hasEvidence) {
    fault = {
      code: "slot_completed_without_evidence",
      detail: "a slot claims completed with empty room-level evidence_refs",
    };
  }
  const displayedPhase: AgentPhase = fault === null ? status.agentPhase : "verifying";
  return {
    roomId: status.roomId,
    occupancy: status.occupancy,
    displayedPhase,
    tone: PHASE_TONE[displayedPhase],
    blockReason: status.agentPhase === "blocked" ? (status.blockReason ?? null) : null,
    evidenceRefs: status.evidenceRefs,
    fault,
  };
}

/** Short display form of an evidence ref (full value stays in the title). */
export function shortEvidenceRef(ref: EvidenceRef): string {
  return ref.kind === "sha" ? ref.ref.slice(0, 10) : ref.ref;
}
