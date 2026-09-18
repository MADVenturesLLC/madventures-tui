// apps/madbridge/src/tui/theme.ts
// Poseidon palette — the single source of color truth for the TUI HUD.
//
// Values are the mandated Poseidon palette (from the poseidon-black skin):
// black ocean background, cobalt structure, sky accent, white text, red for
// error/critical. No grey. No teal. No green — the "ok" role is carried by
// the sky accent, matching the poseidon-black skin's ui_ok.
//
// OpenTUI accepts hex strings as ColorInput (RGBA.fromHex), so these
// constants drop straight into fg=/borderColor= props.
//
// Presentation only — colors are always supplementary to explicit text.

export const POSEIDON = {
  /** Black ocean — the mandated background (#050A12). */
  background: "#050A12",
  /** Near-black status bar ground (#02060C). */
  statusBg: "#02060C",
  /** Cobalt — structural borders, the decision surface (#2A6FB9). */
  cobalt: "#2A6FB9",
  /** Dark cobalt — inactive/secondary borders (#1A4A86). */
  uiBorder: "#1A4A86",
  /** Sky blue — the accent: focused panes, active seat, the "ok" role (#5DB8F5). */
  accent: "#5DB8F5",
  /** Light sky — the warn role (#7EC8F0). */
  warn: "#7EC8F0",
  /** Red — error/critical, incidents, reject (#EF5350). */
  error: "#EF5350",
  /** White — primary text (#FFFFFF). */
  text: "#FFFFFF",
  /** Light blue — secondary/bright text (#EAF7FF). */
  lightText: "#EAF7FF",
  /** Sky mute — dim/secondary text (#87CEEB). */
  dim: "#87CEEB",
} as const;

export type PoseidonColor = (typeof POSEIDON)[keyof typeof POSEIDON];
