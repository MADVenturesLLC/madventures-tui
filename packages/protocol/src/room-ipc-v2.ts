// packages/protocol/src/room-ipc-v2.ts
// Room Runtime Phase 1 — TUI boundary CONSUMER representation of IPC v2.
//
// PROTOCOL OWNERSHIP (Commission Final r3 §10, ONE CANONICAL PROTOCOL OWNER):
// canonical truth resides EXCLUSIVELY in Build Room's
// `packages/gateway-protocol/src/ipc-v2.ts`. This file is the limited
// consumer-side definition at the TUI boundary, existing purely to satisfy
// process separation without breaking types. It duplicates NO authoritative
// behavior: it cannot decide versions, mint identities, or reinterpret the
// closed vocabularies — it only names the shapes the Gateway sends and
// validates untrusted inbound frames against the SAME closed sets the
// canonical owner defines, so a Gateway that drifted would fail here loudly
// rather than being silently re-interpreted.
//
// The TUI is a strict projection and operator-interaction surface (r3 §7):
// it never mints room authority, occupancy, viewer identity, or execution
// identity. Every fact below is Gateway-provided.
//
// Semantic sources (bound by r3 §13): r4 §7.6 Table 9 (state axes), r4 §7.7
// (framing/cursors/version negotiation), r4 §7.8 (Gap vs history_truncated),
// r4 §7.15 (closed control names, disconnect reasons), r4.1 §3 (projector
// wire is VT patches — never raw PTY), r4.1 §5 (Gateway mints viewer_id).

/** The version this consumer speaks. The Gateway's Hello confirms or refuses. */
export const ROOM_IPC_VERSION = 2;

/** Frame mux (r4 §7.7). The consumer receives 0x01 and 0x02 only. */
export const ROOM_FRAME_CONTROL = 0x01;
export const ROOM_FRAME_VT_PATCH = 0x02;

/** Closed canonical state axes — consumer mirror of r4 Table 9. */
export const ROOM_OCCUPANCY_STATES = ["ABSENT", "PREPARED", "OCCUPIED", "INTERRUPTED", "CLOSED"] as const;
export type RoomOccupancyState = (typeof ROOM_OCCUPANCY_STATES)[number];

export const ROOM_VIEWER_STATES = [
  "NONE", "HELLO", "JOINING", "REPLAYING", "ATTACHED", "DETACHED", "STALE", "DISCONNECTED_BACKPRESSURE",
] as const;
export type RoomViewerState = (typeof ROOM_VIEWER_STATES)[number];

export const ROOM_EXECUTION_STATES = ["EMPTY", "LAUNCHING", "RUNNING", "EXITED", "FAILED_CLOSED"] as const;
export type RoomExecutionState = (typeof ROOM_EXECUTION_STATES)[number];

export const ROOM_RECOVERY_KINDS = ["LIVE_REATTACH", "HISTORY_REPLAY", "NATIVE_RESUME", "RECONSTRUCTION"] as const;
export type RoomRecoveryKind = (typeof ROOM_RECOVERY_KINDS)[number];

export const ROOM_BLOCK_REASONS = [
  "NONE", "WAITING_FOUNDER", "CLOCK_UNRELIABLE", "DISK", "DUPLICATE", "PGID_REUSE", "CUSTODY", "CRASH_LOOP", "ADAPTER_HUNG",
] as const;
export type RoomBlockReason = (typeof ROOM_BLOCK_REASONS)[number];

/**
 * Canonical InputAuthorityState (r4 Table 9). `HELD` carries the
 * Gateway-minted viewer id + epoch. The TUI DISPLAYS this; it never assigns
 * it (r4.1 §5: a projector-chosen identity is a spoof the Gateway refuses).
 */
export type RoomInputAuthority =
  | { readonly kind: "UNOWNED" }
  | { readonly kind: "HELD"; readonly viewerId: string; readonly inputEpoch: number }
  | { readonly kind: "TRANSFERRING" }
  | { readonly kind: "REVOKED" };

/** Per-execution cursors (r4 Table 10) — always qualified by execution_id. */
export interface RoomExecutionCursors {
  readonly ptyOutputSeq: number;
  readonly ptyCheckpointSeq: number;
  readonly resizeEpoch: number;
  readonly durableCommittedSeq: number;
}

export interface RoomExecutionFact {
  readonly execution_id: string;
  readonly state: RoomExecutionState;
  readonly cursors: RoomExecutionCursors;
  /** OWNER-RING fact (r4 §7.8). Distinct from a per-viewer Gap; never one flag for both. */
  readonly history_truncated: boolean;
}

export interface RoomViewerFact {
  readonly viewer_id: string;
  readonly attachment: RoomViewerState;
  readonly caps: "read" | "read+input";
}

/** The Gateway's RoomSnapshot body (r4 §7.15 closed control vocabulary). */
export interface RoomSnapshotBody {
  readonly room_id: string;
  readonly occupancy: RoomOccupancyState;
  readonly block_reason: RoomBlockReason;
  readonly input_authority: RoomInputAuthority;
  readonly executions: readonly RoomExecutionFact[];
  readonly viewers: readonly RoomViewerFact[];
  readonly room_seq: number;
}

/** r4.1 §3: the projector wire is VT patches — NEVER raw PTY bytes. */
export interface RoomVtPatch {
  readonly execution_id: string;
  readonly pty_output_seq: number;
  readonly resize_epoch: number;
  readonly vt_codec_version: string;
  readonly checkpoint_or_patch:
    | { readonly kind: "checkpoint"; readonly cells: readonly string[]; readonly cursor: { readonly row: number; readonly col: number } }
    | { readonly kind: "patch"; readonly text: string };
}

/** r4 §7.8: per-viewer Gap. `history_truncated` here is the owner-ring fact. */
export interface RoomGap {
  readonly op: "Gap";
  readonly execution_id: string;
  readonly from_seq: number;
  readonly to_seq: number;
  readonly fillable: boolean;
  readonly history_truncated: boolean;
}

/** Disconnect reasons (r4 §7.15 closed set; `leave` ≠ `occupancy_closed`). */
export const ROOM_DISCONNECT_REASONS = [
  "leave", "viewer_quit", "viewer_backpressure", "frame_too_large",
  "ipc_version_unsupported", "stale_viewer", "occupancy_closed", "internal_error",
] as const;
export type RoomDisconnectReason = (typeof ROOM_DISCONNECT_REASONS)[number];

/** Receipt rung wire vocabulary — semantics live in @mad/claim-boundary. */
export const ROOM_RECEIPT_RUNGS = [
  "prepared", "dispatched", "executed", "attested", "verified", "reviewed", "ci", "merged",
] as const;
export type RoomReceiptRung = (typeof ROOM_RECEIPT_RUNGS)[number];

export interface RoomReceiptRef {
  readonly op: "ReceiptRef";
  readonly receipt_id: string;
  readonly kind: string;
  readonly rung: RoomReceiptRung;
  readonly room_seq: number;
  readonly facts: Record<string, unknown>;
}

/** Any inbound control body the consumer recognizes. */
export type RoomControlBody =
  | { readonly op: "Hello"; readonly ok: true; readonly ipc_version: number; readonly supported: readonly number[]; readonly limits: { readonly max_frame_bytes: number; readonly viewer_queue_frames: number } }
  | { readonly op: "JoinRoom"; readonly ok: true; readonly room_id: string; readonly viewer_id: string; readonly viewer_capability: string; readonly occupancy_epoch: number; readonly recovery_kind: RoomRecoveryKind; readonly snapshot: RoomSnapshotBody; readonly input: "granted" | "input_held" | "unchanged" }
  | { readonly op: "LeaveRoom"; readonly ok: true; readonly room_id: string; readonly viewer_id: string; readonly disconnect: RoomDisconnectReason }
  | { readonly op: "FollowRoom"; readonly ok: true; readonly target: string; readonly rooms?: readonly RoomSnapshotBody[]; readonly viewer_id?: string | null; readonly snapshot?: RoomSnapshotBody }
  | { readonly op: "TakeoverInput"; readonly ok: true; readonly room_id: string; readonly viewer_id: string; readonly input_epoch: number; readonly already_holder?: boolean }
  | { readonly op: "InputFrame"; readonly ok: true; readonly room_id: string; readonly viewer_id: string; readonly input_epoch: number; readonly accepted_bytes: number }
  | { readonly op: "ResizeFrame"; readonly ok: true; readonly room_id: string; readonly cols: number; readonly rows: number }
  | { readonly op: "RoomSnapshot"; readonly body: RoomSnapshotBody }
  | { readonly op: "RoomDelta"; readonly room_seq: number; readonly facts: Partial<Omit<RoomSnapshotBody, "room_id" | "room_seq">> }
  | { readonly op: "FixtureVerificationResult"; readonly room_id: string; readonly execution_id: string; readonly rung: "executed"; readonly result: string }
  | RoomGap
  | RoomReceiptRef
  | { readonly op: "Nack"; readonly reason: string; readonly detail?: string; readonly supported?: readonly number[] }
  | { readonly op: "Disconnect"; readonly reason: RoomDisconnectReason };

// ---------------------------------------------------------------------------
// Pure consumer-side validation (shape only — authority stays Gateway-side)
// ---------------------------------------------------------------------------

function inSet(value: unknown, set: readonly string[]): boolean {
  return typeof value === "string" && set.includes(value);
}

/** Validate an inbound snapshot body; returns a list of human-readable defects. */
export function validateRoomSnapshotBody(value: unknown): string[] {
  const problems: string[] = [];
  if (typeof value !== "object" || value === null) return ["snapshot is not an object"];
  const rec = value as Record<string, unknown>;
  if (typeof rec["room_id"] !== "string") problems.push("room_id is not a string");
  if (!inSet(rec["occupancy"], ROOM_OCCUPANCY_STATES)) problems.push(`occupancy ${JSON.stringify(rec["occupancy"])} is outside the canonical axis`);
  if (!inSet(rec["block_reason"], ROOM_BLOCK_REASONS)) problems.push(`block_reason ${JSON.stringify(rec["block_reason"])} is outside the canonical axis`);
  const authority = rec["input_authority"];
  if (typeof authority !== "object" || authority === null || !inSet((authority as Record<string, unknown>)["kind"], ["UNOWNED", "HELD", "TRANSFERRING", "REVOKED"])) {
    problems.push("input_authority is not a canonical InputAuthorityState");
  }
  if (!Array.isArray(rec["executions"])) {
    problems.push("executions is not an array");
  } else {
    for (const execution of rec["executions"] as unknown[]) {
      if (typeof execution !== "object" || execution === null) {
        problems.push("execution fact is not an object");
        continue;
      }
      const fact = execution as Record<string, unknown>;
      if (typeof fact["execution_id"] !== "string") problems.push("execution_id is not a string");
      if (!inSet(fact["state"], ROOM_EXECUTION_STATES)) problems.push(`execution state ${JSON.stringify(fact["state"])} is outside the canonical axis`);
    }
  }
  if (typeof rec["room_seq"] !== "number") problems.push("room_seq is not a number");
  return problems;
}

/** Validate an inbound VT patch frame; raw PTY bytes are NOT a projector frame (r4.1 §3). */
export function validateRoomVtPatch(value: unknown): string[] {
  const problems: string[] = [];
  if (typeof value !== "object" || value === null) return ["patch is not an object"];
  const rec = value as Record<string, unknown>;
  if (typeof rec["execution_id"] !== "string") problems.push("execution_id is not a string");
  if (typeof rec["pty_output_seq"] !== "number") problems.push("pty_output_seq is not a number");
  if (typeof rec["resize_epoch"] !== "number") problems.push("resize_epoch is not a number");
  if (typeof rec["vt_codec_version"] !== "string") problems.push("vt_codec_version is not a string");
  const body = rec["checkpoint_or_patch"];
  if (typeof body !== "object" || body === null || !inSet((body as Record<string, unknown>)["kind"], ["checkpoint", "patch"])) {
    problems.push("checkpoint_or_patch is not a canonical VT checkpoint/patch");
  }
  return problems;
}
