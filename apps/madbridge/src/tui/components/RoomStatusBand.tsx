// apps/madbridge/src/tui/components/RoomStatusBand.tsx
// Room Runtime Phase 1 — the Room projection band (capability K).
//
// Presentation ONLY (r3 §7): renders canonical Gateway facts plus the derived
// banner from room/projection.ts. It decides no authority, mints no state,
// and never upgrades a fixture fact. A slot-local failure renders as a
// slot-local failure (FAILED_CLOSED on that execution row); it is never
// painted as Room death — the occupancy axis renders separately.
//
// FIXTURE OCCUPANCY ONLY: the band always carries the fixture qualifier, and
// the existing FixtureBanner ("FIXTURE DATA — NOT A LIVE SESSION") remains
// the standing truth band for fixture data; this band never replaces or
// weakens it.

import { useTerminalDimensions } from "@opentui/react";
import type { RoomSnapshotBody } from "@madventures/protocol";
import {
  deriveRoomProjection,
  renderRoomBannerLine,
  type RoomProjection,
  type ViewerProjectionFacts,
} from "../room/projection";
import type { RoomRecoveryKind } from "@madventures/protocol";

interface Props {
  readonly snapshot: RoomSnapshotBody;
  readonly viewer: ViewerProjectionFacts;
  readonly recoveryKind: RoomRecoveryKind | null;
  /** Override terminal width for testing. */
  readonly widthOverride?: number;
}

export function RoomStatusBand({ snapshot, viewer, recoveryKind, widthOverride }: Props) {
  const { width: termWidth } = useTerminalDimensions();
  const width = widthOverride ?? termWidth;
  const projection = deriveRoomProjection(snapshot, viewer, recoveryKind);
  return (
    <box flexDirection="column">
      <text>{renderRoomBannerLine(projection, width)}</text>
      {projection.executions.map((execution) => (
        <text key={execution.execution_id}>
          {renderExecutionLine(execution.execution_id, execution.state, execution.history_truncated, width)}
        </text>
      ))}
    </box>
  );
}

/**
 * One execution row: slot-local truth. EXITED/FAILED_CLOSED render as
 * slot-local facts with the occupancy axis untouched elsewhere — a dead PTY
 * is never rendered as LIVE and a slot failure is never rendered as Room
 * death (act §17; r4 Table 9 ExecutionState axis).
 */
export function renderExecutionLine(
  executionId: string,
  state: string,
  historyTruncated: boolean,
  width: number,
): string {
  const truncated = historyTruncated ? " history=TRUNCATED(owner-ring)" : "";
  const line = `  exec ${executionId}: ${state}${truncated}`;
  return line.length <= width ? line : line.slice(0, width);
}

export type { RoomProjection };
