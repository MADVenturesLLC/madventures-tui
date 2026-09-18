// apps/madbridge/src/tui/components/PaneTabs.tsx
// Narrow-mode tab row — projects ONLY the current FocusTarget.
//
// This component owns NO authority, keyboard routing, or broker state. It
// is a pure projection: it shows which surface is selected and marks it
// with a textual marker (`*`). Color is supplementary, never the sole
// indicator.
//
// Existing Alt+1 through Alt+4 routing remains the only focus authority.

import type { FocusTarget } from "../types";
import { POSEIDON } from "../theme";

export interface PaneTabsProps {
  /** The currently focused surface. */
  focus: FocusTarget;
}

interface TabSpec {
  target: FocusTarget;
  label: string;
}

const TABS: readonly TabSpec[] = [
  { target: "claude", label: "CLAUDE" },
  { target: "antigravity", label: "AGY" },
  { target: "governance", label: "GOV" },
  { target: "events", label: "LOG" },
];

/**
 * Build one tab cell as a pure function.
 * Format: "[ GOV* ]" for the selected tab, "[ AGY  ]" otherwise
 * (matching the historical PaneTabs spacing convention).
 */
export function buildTabCell(tab: TabSpec, focus: FocusTarget): string {
  const marker = tab.target === focus ? "*" : " ";
  return "[ " + tab.label + marker + " ]";
}

/**
 * Build the tab row text as a pure function.
 * Format: [ CLAUDE* ][ AGY ][ GOV ][ LOG ]
 * The selected tab carries a textual `*` marker.
 */
export function buildTabRow(focus: FocusTarget): string {
  const cells = TABS.map((tab) => {
    const selected = tab.target === focus;
    const marker = selected ? "*" : " ";
    return "[ " + tab.label + marker + " ]";
  });
  return cells.join("");
}

export function PaneTabs({ focus }: PaneTabsProps) {
  const line = buildTabRow(focus);
  // Poseidon: selected tab in sky accent, others in sky mute — the textual
  // `*` marker remains the authoritative selection indicator (color is
  // supplementary, never the sole indicator).
  return (
    <box flexDirection="row" paddingLeft={0} paddingRight={0}>
      {TABS.map((tab) => (
        <text
          key={tab.target}
          fg={tab.target === focus ? POSEIDON.accent : POSEIDON.dim}
        >
          {buildTabCell(tab, focus)}
        </text>
      ))}
    </box>
  );
}
