// apps/madbridge/src/tui/keybindings.ts
// Configurable Ctrl+key shortcuts — NOT bare digit keys.
// Bare 1-4 interferes with CLI typing inside managed PTYs.
// Override via FOUNDER_TUI_KEYS env var: "ctrl+1:focus-claude,ctrl+2:focus-antigravity,..."

export type KeyAction =
  | "focus-claude"
  | "focus-antigravity"
  | "focus-governance"
  | "focus-events"
  | "accept-approval"
  | "reject-approval"
  | "quit";

export interface KeyBinding {
  key: string;
  action: KeyAction;
}

export const DEFAULT_KEYBINDINGS: readonly KeyBinding[] = [
  { key: "ctrl+1", action: "focus-claude" },
  { key: "ctrl+2", action: "focus-antigravity" },
  { key: "ctrl+3", action: "focus-governance" },
  { key: "ctrl+4", action: "focus-events" },
  { key: "ctrl+y", action: "accept-approval" },
  { key: "ctrl+n", action: "reject-approval" },
  { key: "ctrl+q", action: "quit" },
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
 * All bindings require a modifier/prefix (ctrl+) — bare digits pass through.
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
