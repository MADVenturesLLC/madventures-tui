// apps/madbridge/src/tui/components/ModelBar.tsx
// One-row model profile bar — always visible under the SeatBar.
//
// What this bar claims (and does NOT claim):
//   - MODEL is the Founder's pinned OMP model profile for the active seat,
//     or the explicit word "unpinned". It is a LOCAL preference.
//   - It is NOT a claim about what any broker-connected agent is running —
//     that lives in the pane headers, derived from the broker snapshot.
//   - MODE is the seat's fixed posture (builder→APPLY, architect→PLAN,
//     operator→READ).
//   - When the OMP catalog could not be loaded, the bar says so with the
//     explicit reason — the picker has no catalog to offer.
//
// Presentation only. Width-aware: the line truncates with `…`, never wraps.

import { useTerminalDimensions } from "@opentui/react";
import type { SeatId } from "../types";
import { seatMode, seatLabel, truncateToWidth } from "./agent-identity";
import { POSEIDON } from "../theme";
import { buildSeatRow } from "./SeatBar";
import type { SeatCatalogState } from "../hooks/useSeatState";

export interface ModelBarProps {
  /** The active seat (LOCAL UI posture). */
  seat: SeatId;
  /** The seat's pinned model selector, or null when unpinned. */
  profile: string | null;
  /** OMP catalog state — rendered only as an honest availability note. */
  catalog: SeatCatalogState;
  /** Override terminal width for testing. */
  widthOverride?: number;
}

/** The explicit word for a seat with no pinned profile. */
export const UNPINNED_WORD = "unpinned";

/**
 * Build the model bar line as a pure function.
 * Format: MODEL <profile> | PROFILE <SEAT> | MODE <mode>[ | <catalog note>]
 */
export function buildModelLine(input: {
  seatWord: string;
  modeWord: string;
  profileWord: string;
  catalogNote: string;
  width: number;
}): string {
  const line =
    "MODEL " + input.profileWord +
    " | PROFILE " + input.seatWord +
    " | MODE " + input.modeWord +
    input.catalogNote;
  return truncateToWidth(line, input.width);
}

/** The honest catalog note appended to the line, or "" when all is well. */
export function catalogNote(catalog: SeatCatalogState): string {
  if (catalog.status === "loading") return " | catalog loading";
  if (catalog.status === "unavailable") return " | catalog unavailable (" + catalog.reason + ")";
  return "";
}

export function ModelBar({ seat, profile, catalog, widthOverride }: ModelBarProps) {
  const { width: termWidth } = useTerminalDimensions();
  const width = widthOverride ?? termWidth;

  const line = buildModelLine({
    seatWord: seatLabel(seat),
    modeWord: seatMode(seat),
    profileWord: profile ?? UNPINNED_WORD,
    catalogNote: catalogNote(catalog),
    width,
  });

  return (
    <box paddingLeft={0} paddingRight={0}>
      <text fg={POSEIDON.lightText}>{line}</text>
    </box>
  );
}

/**
 * Narrow-mode combined row: the seat switcher and the model line share one
 * physical row so a 60×24 terminal still fits the decision strip, status
 * bar, and full pane geometry without any band being compressed. The seat
 * cells keep their textual `*` marker; per-seat coloring (supplementary
 * anyway) is only used by the wide-mode SeatBar.
 */
export function buildSeatModelRow(
  seat: SeatId,
  profile: string | null,
  catalog: SeatCatalogState,
  width: number,
): string {
  const seatRow = buildSeatRow(seat);
  const modelPart = buildModelLine({
    seatWord: seatLabel(seat),
    modeWord: seatMode(seat),
    profileWord: profile ?? UNPINNED_WORD,
    catalogNote: catalogNote(catalog),
    width: Number.MAX_SAFE_INTEGER,
  });
  return truncateToWidth(seatRow + " " + modelPart, width);
}

export function SeatModelRow({ seat, profile, catalog, widthOverride }: {
  seat: SeatId;
  profile: string | null;
  catalog: SeatCatalogState;
  widthOverride?: number;
}) {
  const { width: termWidth } = useTerminalDimensions();
  const width = widthOverride ?? termWidth;
  return (
    <box paddingLeft={0} paddingRight={0}>
      <text fg={POSEIDON.lightText}>{buildSeatModelRow(seat, profile, catalog, width)}</text>
    </box>
  );
}
