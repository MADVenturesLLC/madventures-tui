// apps/madbridge/src/tui/components/FixtureBanner.tsx
// Permanent fixture warning band — a separate one-row truth label.
// Always shows: FIXTURE DATA — NOT A LIVE SESSION
// This is a fixed band that never combines with the StatusBar so the
// StatusBar can always carry all six governance facts.

import { useTerminalDimensions } from "@opentui/react";
import { POSEIDON } from "../theme";

interface Props {
  /** Override terminal width for testing. */
  widthOverride?: number;
}

const BANNER_TEXT = "FIXTURE DATA — NOT A LIVE SESSION";

export function FixtureBanner({ widthOverride }: Props) {
  const { width: termWidth } = useTerminalDimensions();
  const width = widthOverride ?? termWidth;

  const line = buildFixtureBanner(width);

  return (
    <box paddingLeft={0} paddingRight={0}>
      <text fg={POSEIDON.warn}>{line}</text>
    </box>
  );
}

export function buildFixtureBanner(width: number): string {
  if (BANNER_TEXT.length <= width) {
    return BANNER_TEXT + " ".repeat(width - BANNER_TEXT.length);
  }
  // Hard truncate — never wrap.
  return BANNER_TEXT.slice(0, width);
}

export { BANNER_TEXT as FIXTURE_BANNER_TEXT };