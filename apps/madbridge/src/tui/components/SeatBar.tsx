// apps/madbridge/src/tui/components/SeatBar.tsx
// Founder seat switcher — one row, always visible.
//
// Renders [ BUILDER* ][ ARCHITECT ][ OPERATOR ] where the `*` textual marker
// (never color alone) identifies the active seat. Colors come from the
// Poseidon palette: the active seat in sky accent, the others in sky mute.
//
// The seat is LOCAL UI posture. This component owns no state and no
// authority — selection happens through the keyboard router's seat actions
// (Alt+1/2/3). Presentation only.

import { POSEIDON } from "../theme";
import { SEATS } from "../types";
import type { SeatId, SeatSpec } from "../types";

export interface SeatBarProps {
  /** The currently active seat. */
  seat: SeatId;
}

/**
 * Build one seat cell as a pure function.
 * Format: "[ BUILDER* ]" for the active seat, "[ ARCHITECT ]" otherwise.
 * The active seat carries a textual `*` marker.
 */
export function seatCell(spec: SeatSpec, activeSeat: SeatId): string {
  const marker = spec.id === activeSeat ? "*" : "";
  return "[ " + spec.label + marker + " ]";
}

/**
 * Build the full seat row text as a pure function.
 * Format: [ BUILDER* ][ ARCHITECT ][ OPERATOR ]
 */
export function buildSeatRow(activeSeat: SeatId): string {
  return SEATS.map((s) => seatCell(s, activeSeat)).join("");
}

export function SeatBar({ seat }: SeatBarProps) {
  return (
    <box flexDirection="row" paddingLeft={0} paddingRight={0}>
      {SEATS.map((s) => (
        <text key={s.id} fg={s.id === seat ? POSEIDON.accent : POSEIDON.dim}>
          {seatCell(s, seat)}
        </text>
      ))}
    </box>
  );
}
