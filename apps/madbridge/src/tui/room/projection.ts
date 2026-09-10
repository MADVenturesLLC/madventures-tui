// apps/madbridge/src/tui/room/projection.ts
// Room Runtime Phase 1 — canonical-state projection (capability K).
//
// PURE DERIVATION, PRESENTATION ONLY. Every banner is derived from canonical
// Gateway facts (r4 §7.6 Table 9 formulas), never from screen scraping and
// never by upgrading evidence:
//
//   LIVE                  occupancy OCCUPIED ∧ this viewer ATTACHED ∧ at live
//                         per-exec pty_output_seq ∧ RecoveryKind ≠
//                         RECONSTRUCTION for this generation
//   LIVE_UNATTENDED       occupancy OCCUPIED ∧ some slot RUNNING ∧
//                         InputAuthority UNOWNED
//   LIVE_WITH_HISTORY_GAP viewer ATTACHED ∧ a Gap or history_truncated flag
//   DETACHED              occupancy OCCUPIED ∧ this viewer not attached
//                         (occupancy is NOT down — viewer axis ≠ room axis)
//   REPLAYING             this viewer REPLAYING
//   RECONSTRUCTED         RecoveryKind = RECONSTRUCTION for this generation
//                         (NEVER painted LIVE for the dead PTY)
//   READ_ONLY (viewer)    viewer caps = read / no input lease
//   WAITING_FOUNDER /     from BlockReason / OccupancyState — hard gates,
//   BLOCKED /             never presentation shorthand
//   INTERRUPTED / CLOSED
//
// Forbidden readings this module makes unrepresentable by construction:
//   - a local slot or viewer failure is never painted as Room death (slot
//     FAILED_CLOSED shows slot-local truth; occupancy keeps its own axis);
//   - a dead PTY (ExecutionState EXITED/FAILED_CLOSED, or occupancy not
//     OCCUPIED) can never derive LIVE;
//   - fixture facts never become live-occupancy proof — the projection
//     reports exactly the canonical axes the Gateway sent, plus the derived
//     label, plus an explicit fixture qualifier.

import type {
  RoomBlockReason,
  RoomExecutionFact,
  RoomInputAuthority,
  RoomOccupancyState,
  RoomRecoveryKind,
  RoomSnapshotBody,
  RoomViewerState,
} from "@madventures/protocol";

/** Derived operator presentation labels (r4 Table 9 — NOT authority states). */
export type DerivedBanner =
  | "LIVE"
  | "LIVE_UNATTENDED"
  | "LIVE_WITH_HISTORY_GAP"
  | "DETACHED"
  | "REPLAYING"
  | "RECONSTRUCTED"
  | "READ_ONLY"
  | "WAITING_FOUNDER"
  | "BLOCKED"
  | "INTERRUPTED"
  | "CLOSED"
  | "PREPARED"
  | "ABSENT";

export interface ViewerProjectionFacts {
  /** This viewer's Gateway-reported attachment state. */
  readonly attachment: RoomViewerState;
  /** This viewer's caps as the Gateway recorded them. */
  readonly caps: "read" | "read+input";
  /** True when this viewer holds a Gap or saw history_truncated. */
  readonly hasGapOrTruncation: boolean;
  /** True when this viewer is at the live per-execution pty_output_seq. */
  readonly atLiveSeq: boolean;
}

export interface RoomProjection {
  readonly banner: DerivedBanner;
  /** Canonical axes, restated unchanged — derivation never replaces them. */
  readonly occupancy: RoomOccupancyState;
  readonly blockReason: RoomBlockReason;
  readonly inputAuthority: RoomInputAuthority;
  readonly recoveryKind: RoomRecoveryKind | null;
  readonly executions: readonly RoomExecutionFact[];
  /** Phase 1 honesty qualifier — always true in this tranche. */
  readonly fixtureOccupancyOnly: true;
}

/**
 * Derive the operator banner from canonical facts. Deterministic and total:
 * every input shape maps to exactly one label, and the hard gates
 * (WAITING_FOUNDER / CLOSED / INTERRUPTED / RECONSTRUCTED) take precedence
 * over any LIVE reading.
 */
export function deriveRoomProjection(
  snapshot: RoomSnapshotBody,
  viewer: ViewerProjectionFacts,
  recoveryKind: RoomRecoveryKind | null,
): RoomProjection {
  const banner = deriveBanner(snapshot, viewer, recoveryKind);
  return {
    banner,
    occupancy: snapshot.occupancy,
    blockReason: snapshot.block_reason,
    inputAuthority: snapshot.input_authority,
    recoveryKind,
    executions: snapshot.executions,
    fixtureOccupancyOnly: true,
  };
}

function someSlotRunning(snapshot: RoomSnapshotBody): boolean {
  return snapshot.executions.some((execution) => execution.state === "RUNNING");
}

function anyDeadPty(snapshot: RoomSnapshotBody): boolean {
  return snapshot.executions.some((execution) => execution.state === "EXITED" || execution.state === "FAILED_CLOSED");
}

function deriveBanner(
  snapshot: RoomSnapshotBody,
  viewer: ViewerProjectionFacts,
  recoveryKind: RoomRecoveryKind | null,
): DerivedBanner {
  // Hard gates first — never presentation shorthand (act §17).
  if (snapshot.occupancy === "ABSENT") return "ABSENT";
  if (snapshot.occupancy === "CLOSED") return "CLOSED";
  if (snapshot.occupancy === "INTERRUPTED") return "INTERRUPTED";
  if (snapshot.block_reason === "WAITING_FOUNDER") return "WAITING_FOUNDER";
  if (snapshot.block_reason !== "NONE") return "BLOCKED";
  // RECONSTRUCTION for this generation is never LIVE for the dead PTY.
  if (recoveryKind === "RECONSTRUCTION") return "RECONSTRUCTED";
  if (viewer.attachment === "REPLAYING") return "REPLAYING";
  if (snapshot.occupancy === "PREPARED") return "PREPARED";

  // Occupancy OCCUPIED below this line.
  if (viewer.attachment !== "ATTACHED") {
    // Viewer axis ≠ room axis: detached viewer, occupancy may still be live.
    return "DETACHED";
  }
  // A dead PTY is never LIVE; surface the honest non-LIVE reading.
  if (anyDeadPty(snapshot) || !someSlotRunning(snapshot)) {
    return snapshot.input_authority.kind === "UNOWNED" ? "LIVE_UNATTENDED" : "READ_ONLY";
  }
  if (viewer.hasGapOrTruncation) return "LIVE_WITH_HISTORY_GAP";
  if (!viewer.atLiveSeq) return "REPLAYING";
  if (snapshot.input_authority.kind === "UNOWNED") return "LIVE_UNATTENDED";
  if (viewer.caps === "read") return "READ_ONLY";
  return "LIVE";
}

/**
 * The single honest banner line for the TUI. Carries the derived label, the
 * canonical axes behind it, and the fixture qualifier — so the label can
 * never be read as live-occupancy proof on its own.
 */
export function renderRoomBannerLine(projection: RoomProjection, width: number): string {
  const core = `ROOM ${projection.banner} — occupancy=${projection.occupancy} block=${projection.blockReason} input=${projection.inputAuthority.kind} FIXTURE OCCUPANCY ONLY`;
  if (core.length <= width) return core + " ".repeat(width - core.length);
  return core.slice(0, width);
}
