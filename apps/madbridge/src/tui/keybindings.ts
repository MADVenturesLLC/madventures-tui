// apps/madbridge/src/tui/keybindings.ts
// Configurable Alt+key shortcuts — NOT bare digit keys.
// Bare 1-4 interferes with CLI typing inside managed PTYs.
// Override via FOUNDER_TUI_KEYS env var: "alt+1:focus-claude,alt+2:focus-antigravity,..."
//
// Alt+digit is terminal-deliverable (ESC followed by digit) unlike Ctrl+digit
// which many terminals intercept for tab-switching.
//
// Seat keys (Alt+1/2/3) were authorized by the Founder commission
// GLM-20260918-FOUNDER-TUI-SEATS: a seat is a named posture that focuses the
// seat's pane (builder/architect → Claude, operator → Governance) and sets
// the mode label on the bars. The previous Alt+1..4 pane-focus map moved to
// Alt+4 (antigravity) and Alt+5 (events); "focus-claude" and
// "focus-governance" remain valid actions reachable via the FOUNDER_TUI_KEYS
// override. Ctrl+P opens the model picker — a modal whose keys are captured
// while open, which intentionally withholds Ctrl+P from the PTYs.

export type KeyAction =
  | "seat-builder"
  | "seat-architect"
  | "seat-operator"
  | "focus-claude"
  | "focus-antigravity"
  | "focus-governance"
  | "focus-events"
  | "accept-approval"
  | "reject-approval"
  | "open-model-picker"
  | "quit";

export interface KeyBinding {
  key: string;
  action: KeyAction;
}

export const DEFAULT_KEYBINDINGS: readonly KeyBinding[] = [
  { key: "alt+1", action: "seat-builder" },
  { key: "alt+2", action: "seat-architect" },
  { key: "alt+3", action: "seat-operator" },
  { key: "alt+4", action: "focus-antigravity" },
  { key: "alt+5", action: "focus-events" },
  { key: "alt+y", action: "accept-approval" },
  { key: "alt+n", action: "reject-approval" },
  { key: "ctrl+p", action: "open-model-picker" },
  { key: "alt+q", action: "quit" },
] as const;

export type KeyBindingMap = ReadonlyMap<string, KeyAction>;

export function parseKeybindings(bindings: readonly KeyBinding[]): KeyBindingMap {
  const map = new Map<string, KeyAction>();
  for (const b of bindings) {
    map.set(b.key, b.action);
  }
  return map;
}

/**
 * Load keybindings from env or config, falling back to defaults.
 * All bindings require a modifier/prefix (alt+) — bare digits pass through.
 * Override via FOUNDER_TUI_KEYS="alt+1:focus-claude,..."
 */
export function loadKeybindings(): KeyBindingMap {
  const envKeys = process.env.FOUNDER_TUI_KEYS;
  if (!envKeys) return parseKeybindings(DEFAULT_KEYBINDINGS);

  const custom: KeyBinding[] = envKeys
    .split(",")
    .map((entry) => {
      const [key, action] = entry.trim().split(":");
      if (!key || !action) return null;
      return { key: key.trim(), action: action.trim() as KeyAction } satisfies KeyBinding;
    })
    .filter((b): b is KeyBinding => b !== null);

  return parseKeybindings(custom.length > 0 ? custom : DEFAULT_KEYBINDINGS);
}

/**
 * Check if a key is a global action (requires modifier/prefix).
 * Bare digit keys (e.g. "1", "2", "3") are NOT global actions —
 * they pass through to the focused PTY.
 */
export function isGlobalAction(key: string, bindings: KeyBindingMap): boolean {
  const normalized = key.toLowerCase();
  return bindings.has(normalized);
}

/**
 * Resolve a key to an action, or null if it's not a global action.
 * Returns null for bare digits and any unmapped key.
 */
export function resolveKey(key: string, bindings: KeyBindingMap): KeyAction | null {
  const normalized = key.toLowerCase();
  return bindings.get(normalized) ?? null;
}

/**
 * Translate an OpenTUI KeyEvent into the keybinding string format.
 * Produces strings like "alt+1", "ctrl+y", "shift+a", or just "a" for bare keys.
 *
 * This is the bridge between the OpenTUI KeyEvent stream and the tested
 * resolveKey path. For bare keys (no modifier), returns the key name as-is
 * so it flows through to the PTY write path.
 */
export function translateKeyEvent(key: {
  name: string;
  ctrl: boolean;
  meta: boolean;
  shift: boolean;
}): string {
  const parts: string[] = [];
  if (key.ctrl) parts.push("ctrl");
  if (key.meta) parts.push("alt");
  if (key.shift && key.name.length > 1) parts.push("shift");

  if (parts.length === 0) return key.name;

  return parts.join("+") + "+" + key.name;
}
