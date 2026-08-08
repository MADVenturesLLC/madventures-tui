// src/tui/hooks/useKeyboard.ts
// Keyboard input handler for focus routing and approval actions.
// Uses OpenTUI's key event system.

import { useCallback } from "react";
import type { FocusTarget } from "../App";

export function useKeyboard(
  onFocusChange: (target: FocusTarget) => void,
  onApproval: (accept: boolean) => void,
) {
  return useCallback((key: string) => {
    switch (key) {
      case "1": onFocusChange("claude"); break;
      case "2": onFocusChange("antigravity"); break;
      case "3": onFocusChange("governance"); break;
      case "4": onFocusChange("events"); break;
      case "y": onApproval(true); break;
      case "n": onApproval(false); break;
    }
  }, [onFocusChange, onApproval]);
}
