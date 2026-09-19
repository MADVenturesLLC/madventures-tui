// apps/madbridge/src/tui/keyboard-router.ts
// Pure keyboard routing logic — extracted from App.tsx so tests can
// exercise the real production path without rendering.
//
// This module is the single source of truth for key-to-action resolution
// and PTY byte routing. App.tsx delegates to routeKeyEvent() so the
// behavioral tests observe the same logic the production App uses.

import type { KeyAction } from "./keybindings";
import type {
  FocusTarget,
  SeatId,
  BrokerSnapshot,
  ApprovalRequestEvent,
  PendingApproval,
} from "./types";
import { SEATS } from "./types";

export interface KeyboardRouterState {
  /** Current focus target. */
  focus: FocusTarget;
  /** Whether the decision dialog is currently visible. */
  showApprovalDialog: boolean;
  /** The approval ID bound to the currently displayed decision dialog.
   * Stored when the dialog opens — NOT recalculated from pendingApprovals
   * at resolution time. */
  displayedApprovalId: string | null;
  /** IDs of approvals that have already been submitted (accept or reject).
   * Once an approval ID is in this set, it cannot be resolved again or
   * auto-reopened while the broker snapshot still contains it. */
  resolvedApprovalIds: ReadonlySet<string>;
  /** Current Founder seat (LOCAL UI posture — see types.ts SeatId).
   * Optional for compatibility with pre-seat state literals. */
  seat?: SeatId;
  /** Whether the model picker modal is open. While open, navigation keys are
   * captured by the picker and NEVER reach the PTYs. Optional for
   * compatibility with pre-picker state literals. */
  showModelPicker?: boolean;
}

export interface KeyboardRouterCallbacks {
  onFocusChange: (target: FocusTarget) => void;
  onApprovalResolve: (event: ApprovalRequestEvent) => void;
  onPtyWrite: (data: string) => void;
  onQuit: () => void;
  /** Called to open/close the decision dialog. */
  onShowApprovalDialog: (show: boolean, approvalId: string | null) => void;
  /** Called when a seat action selects a seat. The seat's pane focus change
   * is ALSO emitted through onFocusChange by the router itself. */
  onSeatSelect?: (seat: SeatId) => void;
  /** Model picker modal callbacks (all optional — absent in pre-picker callers). */
  onModelPickerOpen?: () => void;
  onModelPickerNav?: (delta: number) => void;
  onModelPickerConfirm?: () => void;
  onModelPickerClose?: () => void;
}

export interface RouteKeyInput {
  /** The translated keybinding string (e.g. "alt+1", "a"). */
  keyStr: string;
  /** The resolved action, or null if not a global action. */
  action: KeyAction | null;
  /** The OpenTUI-generated input sequence for PTY delivery. */
  sequence: string;
  /** The canonical key name (used for fallback only). */
  name: string;
  /** Current router state. */
  state: KeyboardRouterState;
  /** Current broker snapshot (for finding the displayed approval). */
  snapshot: BrokerSnapshot | null;
  /** Callbacks for side effects. */
  callbacks: KeyboardRouterCallbacks;
  /** Keybindings map (for re-checking if needed). */
  bindings: ReadonlyMap<string, KeyAction>;
}

/**
 * Validate that an approval can be resolved. Returns the matching
 * PendingApproval if resolution is allowed, or null if it must fail closed.
 *
 * ALL of these conditions must hold:
 * 1. showApprovalDialog === true
 * 2. displayedApprovalId !== null
 * 3. focus === "governance" (Claude, Antigravity, Events are ALL inert)
 * 4. No incident/interruption has precedence (fail closed when
 *    snapshot.sessionState === "interrupted" or snapshot.incident !== null)
 * 5. The stored approval ID still exists in the snapshot's pendingApprovals
 * 6. approval.colorState.kind === "pending" (expired/approved/rejected are inert)
 * 7. The approval ID is NOT in resolvedApprovalIds (no duplicate submission)
 */
export function validateApprovalResolution(
  state: KeyboardRouterState,
  snapshot: BrokerSnapshot | null,
): PendingApproval | null {
  // 1. Dialog must be visible
  if (!state.showApprovalDialog) return null;

  // 2. Must be bound to a stored approval ID
  if (state.displayedApprovalId === null) return null;

  // 3. Only governance focus authorizes — Claude, Antigravity, Events
  // are ALL inert even if the dialog is somehow visible.
  if (state.focus !== "governance") return null;

  // 4. Incident/interruption precedence — fail closed. A hidden decision
  // must never be accepted behind the incident surface. Both keyboard
  // resolution and any shared component resolution callback inherit this
  // guard because they all call this single function.
  if (snapshot?.sessionState === "interrupted") return null;
  if (snapshot?.incident) return null;

  // 5. The stored approval must still exist in the pending array.
  // If it's been removed, resolution emits nothing.
  const pending = snapshot?.pendingApprovals?.find(
    (a: PendingApproval) => a.id === state.displayedApprovalId,
  );
  if (!pending) return null;

  // 6. The approval must still be in "pending" state — not expired,
  // approved, or rejected.
  if (pending.colorState.kind !== "pending") return null;

  // 7. Prevent duplicate submission — if this ID was already submitted,
  // it must remain non-resolvable.
  if (state.resolvedApprovalIds.has(pending.id)) return null;

  return pending;
}

/**
 * Route a key event through the production logic.
 *
 * Returns the updated KeyboardRouterState (immutably) so tests can observe
 * state changes without rendering.
 */
export function routeKeyEvent(input: RouteKeyInput): KeyboardRouterState {
  const { action, sequence, name, state, snapshot, callbacks, keyStr } = input;

  // ─── Global action ───
  if (action !== null) {
    switch (action) {
      case "seat-builder":
      case "seat-architect":
      case "seat-operator": {
        // A seat is a named posture: it selects the seat (mode label on the
        // bars) AND focuses the seat's pane. LOCAL UI state only — no broker
        // authority, permissions, ownership, or approval semantics change.
        const seat: SeatId =
          action === "seat-builder" ? "builder"
          : action === "seat-architect" ? "architect"
          : "operator";
        const spec = SEATS.find((s) => s.id === seat);
        callbacks.onSeatSelect?.(seat);
        if (spec) {
          callbacks.onFocusChange(spec.focus);
          return { ...state, seat, focus: spec.focus };
        }
        return { ...state, seat };
      }

      case "focus-claude":
        callbacks.onFocusChange("claude");
        return { ...state, focus: "claude" };

      case "focus-antigravity":
        callbacks.onFocusChange("antigravity");
        return { ...state, focus: "antigravity" };

      case "focus-governance":
        callbacks.onFocusChange("governance");
        return { ...state, focus: "governance" };

      case "focus-events":
        callbacks.onFocusChange("events");
        return { ...state, focus: "events" };

      case "accept-approval":
      case "reject-approval": {
        const pending = validateApprovalResolution(state, snapshot);
        if (!pending) {
          // If the stored approval is gone, close the dialog safely.
          if (state.showApprovalDialog && state.displayedApprovalId !== null) {
            const stillExists = snapshot?.pendingApprovals?.find(
              (a: PendingApproval) => a.id === state.displayedApprovalId,
            );
            if (!stillExists) {
              callbacks.onShowApprovalDialog(false, null);
              return {
                ...state,
                showApprovalDialog: false,
                displayedApprovalId: null,
              };
            }
          }
          return state; // inert
        }

        // Resolve ONLY the displayed approval and mark it as resolved
        // to prevent duplicate submission.
        callbacks.onApprovalResolve({
          taskId: pending.taskId,
          actor: pending.actor,
          scope: pending.scope,
          repositoryFingerprint: pending.repositoryFingerprint,
          timestamp: new Date().toISOString(),
          resolution: action === "accept-approval" ? "accept" : "reject",
        });

        const newResolved = new Set(state.resolvedApprovalIds);
        newResolved.add(pending.id);

        callbacks.onShowApprovalDialog(false, null);
        return {
          ...state,
          showApprovalDialog: false,
          displayedApprovalId: null,
          resolvedApprovalIds: newResolved,
        };
      }

      case "open-model-picker":
        callbacks.onModelPickerOpen?.();
        return { ...state, showModelPicker: true };

      case "quit":
        callbacks.onQuit();
        return state;
    }
  }

  // ─── Model picker modal ───
  // While the picker is open it captures navigation keys; NOTHING reaches
  // the PTYs. Global actions above still run (quit, approval resolution —
  // the latter still gated by validateApprovalResolution).
  // Navigation accepts up/down AND vim-style k/j (plain characters that
  // survive every terminal input path, including PTY-managed ones).
  if (state.showModelPicker) {
    if (name === "up" || name === "k") {
      callbacks.onModelPickerNav?.(-1);
      return state;
    }
    if (name === "down" || name === "j") {
      callbacks.onModelPickerNav?.(1);
      return state;
    }
    if (name === "return" || name === "enter") {
      callbacks.onModelPickerConfirm?.();
      return { ...state, showModelPicker: false };
    }
    if (name === "escape") {
      callbacks.onModelPickerClose?.();
      return { ...state, showModelPicker: false };
    }
    return state; // swallow other keys while the modal is open
  }

  // ─── Not a global action — pass through to PTY ───
  const ptyData = resolvePtySequence(sequence, name, keyStr);
  if (ptyData !== null) {
    callbacks.onPtyWrite(ptyData);
  }
  return state;
}

/**
 * Determine the correct bytes to send to the PTY for an unbound key.
 *
 * Priority:
 * 1. The OpenTUI-generated `sequence` field (the actual terminal input bytes).
 * 2. If `sequence` is empty, fall back to the raw character from `keyStr`
 *    ONLY if it's a single printable character.
 * 3. If neither is available, return null (drop the input safely — never
 *    forward a canonical name like "return" as PTY data).
 */
export function resolvePtySequence(
  sequence: string,
  name: string,
  keyStr: string,
): string | null {
  if (sequence.length > 0) {
    return sequence;
  }
  if (keyStr.length === 1 && keyStr.charCodeAt(0) >= 32) {
    return keyStr;
  }
  if (name.length === 1 && name.charCodeAt(0) >= 32) {
    return name;
  }
  return null;
}

/**
 * Open the decision dialog and bind to a specific approval ID.
 *
 * Will NOT open if the approval ID is already in resolvedApprovalIds
 * (prevents auto-reopen after submission while the snapshot still
 * contains the approval).
 */
export function openDecisionDialog(
  approval: PendingApproval,
  callbacks: KeyboardRouterCallbacks,
  currentState: KeyboardRouterState,
): KeyboardRouterState {
  // Prevent reopening an already-resolved approval.
  if (currentState.resolvedApprovalIds.has(approval.id)) {
    return currentState;
  }
  // Only open for pending approvals.
  if (approval.colorState.kind !== "pending") {
    return currentState;
  }
  callbacks.onShowApprovalDialog(true, approval.id);
  return {
    ...currentState,
    showApprovalDialog: true,
    displayedApprovalId: approval.id,
  };
}

/**
 * Close the decision dialog and clear the displayed approval ID.
 */
export function closeDecisionDialog(
  callbacks: KeyboardRouterCallbacks,
  currentState: KeyboardRouterState,
): KeyboardRouterState {
  callbacks.onShowApprovalDialog(false, null);
  return { ...currentState, showApprovalDialog: false, displayedApprovalId: null };
}

/**
 * Prune the resolvedApprovalIds set: remove IDs that no longer exist in
 * the current pendingApprovals. This allows a fresh approval with the same
 * ID (after broker snapshot rotation) to be opened again.
 */
export function pruneResolvedIds(
  resolvedIds: ReadonlySet<string>,
  snapshot: BrokerSnapshot | null,
): ReadonlySet<string> {
  const currentIds = new Set(snapshot?.pendingApprovals?.map((a) => a.id) ?? []);
  const pruned = new Set<string>();
  for (const id of resolvedIds) {
    if (currentIds.has(id)) {
      pruned.add(id);
    }
  }
  return pruned;
}