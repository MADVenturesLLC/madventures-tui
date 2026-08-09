// apps/madbridge/src/tui/hooks/useKeyboard.ts
// Keyboard handler — routes bytes to focused PTY, resolves global actions.
// Bare digits pass through to the focused PTY unchanged.
// Global actions require a configured modifier/prefix (ctrl+key).

import { useCallback } from "react";
import type { FocusTarget } from "../types";
import type { KeyBindingMap, KeyAction } from "../keybindings";
import { resolveKey } from "../keybindings";

export interface KeyboardHandler {
  (key: string): void;
}

export interface UseKeyboardOptions {
  bindings: KeyBindingMap;
  onFocusChange: (target: FocusTarget) => void;
  onApproval: (accept: boolean) => void;
  onQuit: () => void;
  onPtyWrite: (data: string) => void;
}

/**
 * useKeyboard returns a handler that:
 * 1. Checks if the key is a global action (requires ctrl+ prefix)
 * 2. If yes, dispatches the global action
 * 3. If no (including bare digits), writes the byte to the focused PTY
 */
export function useKeyboard(opts: UseKeyboardOptions): KeyboardHandler {
  return useCallback((key: string) => {
    const action: KeyAction | null = resolveKey(key, opts.bindings);

    if (action !== null) {
      switch (action) {
        case "focus-claude":
          opts.onFocusChange("claude");
          break;
        case "focus-antigravity":
          opts.onFocusChange("antigravity");
          break;
        case "focus-governance":
          opts.onFocusChange("governance");
          break;
        case "focus-events":
          opts.onFocusChange("events");
          break;
        case "accept-approval":
          opts.onApproval(true);
          break;
        case "reject-approval":
          opts.onApproval(false);
          break;
        case "quit":
          opts.onQuit();
          break;
      }
      return;
    }

    // Not a global action — pass through to focused PTY.
    // Bare digits (1, 2, 3, etc.) pass through unchanged.
    opts.onPtyWrite(key);
  }, [opts]);
}
