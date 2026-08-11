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
  return (
    <box paddingLeft={0} paddingRight={0}>
      <text>{line}</text>
    </box>
  );
}
