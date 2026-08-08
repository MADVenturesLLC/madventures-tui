// shared/keybindings.ts
// F1: Configurable keybindings with prefixed/modified shortcuts.
// Bare 1-4 keys interfere with CLI typing. Default uses Ctrl+number.

export type KeyAction =
  | "focus-claude"
  | "focus-antigravity"
  | "focus-governance"
  | "focus-events"
  | "toggle-approval"
  | "accept-approval"
  | "reject-approval"
  | "quit";

export interface KeyBinding {
  key: string;        // e.g. "ctrl+1", "ctrl+a", "ctrl+q"
  action: KeyAction;
}

export const DEFAULT_KEYBINDINGS: KeyBinding[] = [
  { key: "ctrl+1", action: "focus-claude" },
  { key: "ctrl+2", action: "focus-antigravity" },
  { key: "ctrl+3", action: "focus-governance" },
  { key: "ctrl+4", action: "focus-events" },
  { key: "ctrl+a", action: "toggle-approval" },
  { key: "ctrl+y", action: "accept-approval" },
  { key: "ctrl+n", action: "reject-approval" },
  { key: "ctrl+q", action: "quit" },
];

export type KeyBindingMap = Map<string, KeyAction>;

export function parseKeybindings(bindings: KeyBinding[]): KeyBindingMap {
  const map = new Map<string, KeyAction>();
  for (const b of bindings) {
    map.set(b.key, b.action);
  }
  return map;
}

/**
 * Load keybindings from env or config file, falling back to defaults.
 * Override format (env var FOUNDER_TUI_KEYS):
 *   "ctrl+1:focus-claude,ctrl+2:focus-antigravity,..."
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
