// apps/madbridge/src/tui/components/ModelPicker.tsx
// OMP model picker overlay — opened with Ctrl+P, closed with esc.
//
// While the picker is open the keyboard router CAPTURES navigation keys
// (up/down/return/escape) and nothing reaches the PTYs — the modal contract
// is stated in keybindings.ts and enforced in keyboard-router.ts.
//
// Honesty: the list is exactly what `omp models ls --json` reported. A
// failed or empty catalog renders an explicit reason — never a fabricated
// model list. Pinning a model sets the seat's LOCAL profile preference
// (ModelBar); it does not change any broker or agent state.
//
// Presentation only.

import { useTerminalDimensions } from "@opentui/react";
import { TextAttributes } from "@opentui/core";
import type { SeatCatalogState } from "../hooks/useSeatState";
import { POSEIDON } from "../theme";
import { truncateToWidth } from "./agent-identity";

export interface ModelPickerProps {
  catalog: SeatCatalogState;
  /** Cursor index into the catalog (clamped by useSeatState.movePicker). */
  pickerIndex: number;
  /** Override terminal width for testing. */
  widthOverride?: number;
}

/**
 * Build the picker's body rows as a pure function. The cursor row is marked
 * with a textual "▸ " marker (never color alone).
 */
export function buildPickerRows(
  catalog: SeatCatalogState,
  pickerIndex: number,
  width: number,
): string[] {
  if (catalog.status === "loading") {
    return [truncateToWidth("catalog loading…", width)];
  }
  if (catalog.status === "unavailable") {
    return [truncateToWidth("catalog unavailable (" + catalog.reason + ")", width)];
  }
  if (catalog.models.length === 0) {
    return ["no models reported by omp"];
  }
  return catalog.models.map((m, i) => {
    const marker = i === pickerIndex ? "▸ " : "  ";
    return truncateToWidth(marker + m.selector + " — " + m.name, width);
  });
}

const PICKER_HEADER = "MODEL PICKER — j/k or up/down move · return pin · esc close";

export function ModelPicker({ catalog, pickerIndex, widthOverride }: ModelPickerProps) {
  const { width: termWidth } = useTerminalDimensions();
  const width = widthOverride ?? termWidth;
  const innerWidth = Math.max(0, width - 4); // border + padding overhead

  const rows = buildPickerRows(catalog, pickerIndex, innerWidth);
  const hasCursor = catalog.status === "ok" && catalog.models.length > 0;

  return (
    <box
      position="absolute"
      top="30%"
      left="10%"
      width="80%"
      borderStyle="single"
      borderColor={POSEIDON.accent}
      flexDirection="column"
      paddingLeft={1}
      paddingRight={1}
    >
      <text fg={POSEIDON.accent} attributes={TextAttributes.BOLD}>
        {truncateToWidth(PICKER_HEADER, innerWidth)}
      </text>
      {rows.map((row, i) => (
        <text
          key={i}
          fg={hasCursor && i === pickerIndex ? POSEIDON.text : POSEIDON.dim}
        >
          {row}
        </text>
      ))}
    </box>
  );
}
