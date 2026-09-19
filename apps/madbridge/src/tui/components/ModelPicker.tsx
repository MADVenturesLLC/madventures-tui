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
  /** Override terminal height for testing. */
  heightOverride?: number;
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

/**
 * The visible row window for a cursor position: the window slides so the
 * cursor stays inside it, clamped to the catalog bounds. Non-windowed
 * catalogs (len <= maxVisible) render in full.
 */
export function pickerWindow(
  catalogLength: number,
  pickerIndex: number,
  maxVisible: number,
): { start: number; end: number } {
  if (maxVisible <= 0 || catalogLength <= maxVisible) {
    return { start: 0, end: catalogLength };
  }
  const rawStart = pickerIndex - Math.floor(maxVisible / 2);
  const start = Math.min(Math.max(0, rawStart), catalogLength - maxVisible);
  return { start, end: start + maxVisible };
}

/**
 * Honest position suffix for the header: "· 4–18 of 48" while windowed,
 * "· 48 models" when everything fits, "" otherwise (loading/unavailable
 * states carry their own reason rows).
 */
export function pickerPositionSuffix(
  hasCursor: boolean,
  window: { start: number; end: number },
  catalog: SeatCatalogState,
): string {
  if (!hasCursor) return "";
  const total = catalog.status === "ok" ? catalog.models.length : 0;
  if (total === 0) return "";
  if (window.end - window.start >= total) return " · " + String(total) + " models";
  return " · " + String(window.start + 1) + "–" + String(window.end) + " of " + String(total);
}

export function ModelPicker({ catalog, pickerIndex, widthOverride, heightOverride }: ModelPickerProps) {
  const { width: termWidth, height: termHeight } = useTerminalDimensions();
  const width = widthOverride ?? termWidth;
  const height = heightOverride ?? termHeight;
  const innerWidth = Math.max(0, width - 4); // border + padding overhead

  // Window the list: catalogs can be far taller than the terminal, so only
  // maxVisible rows render and the window follows the cursor. The header
  // carries the honest position (window + total).
  const maxVisible = Math.max(3, Math.floor(height * 0.5) - 4);
  const window = pickerWindow(
    catalog.status === "ok" ? catalog.models.length : 0,
    pickerIndex,
    maxVisible,
  );
  const hasCursor = catalog.status === "ok" && catalog.models.length > 0;
  const allRows = buildPickerRows(catalog, pickerIndex, innerWidth);
  const rows = hasCursor
    ? allRows.slice(window.start, window.start + maxVisible)
    : allRows;

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
        {truncateToWidth(PICKER_HEADER + pickerPositionSuffix(hasCursor, window, catalog), innerWidth)}
      </text>
      {rows.map((row, i) => {
        const modelIndex = window.start + i;
        return (
          <text
            key={i}
            fg={hasCursor && modelIndex === pickerIndex ? POSEIDON.text : POSEIDON.dim}
          >
            {row}
          </text>
        );
      })}
    </box>
  );
}
