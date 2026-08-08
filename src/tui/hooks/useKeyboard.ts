// src/tui/hooks/useKeyboard.ts
// F1: Configurable prefixed/modified shortcuts (Ctrl+key, not bare keys).

import { useCallback } from "react";
import type { FocusTarget } from "../../shared/ui-types";
import type { KeyBindingMap } from "../../shared/keybindings";

export function useKeyboard(
  bindings: KeyBindingMap,
  onFocusChange: (target: FocusTarget) => void,
  onApproval: (accept: boolean) => void,
  onToggleApproval: () => void,
  onQuit: () => void,
) {
  return useCallback((key: string) => {
    // Normalize key: OpenTUI sends "ctrl+1" style or raw chars
    const normalized = key.toLowerCase();
    const action = bindings.get(normalized);
    if (!action) return;

    switch (action) {
      case "focus-claude": onFocusChange("claude"); break;
      case "focus-antigravity": onFocusChange("antigravity"); break;
      case "focus-governance": onFocusChange("governance"); break;
      case "focus-events": onFocusChange("events"); break;
      case "toggle-approval": onToggleApproval(); break;
      case "accept-approval": onApproval(true); break;
      case "reject-approval": onApproval(false); break;
      case "quit": onQuit(); break;
    }
  }, [bindings, onFocusChange, onApproval, onToggleApproval, onQuit]);
}
