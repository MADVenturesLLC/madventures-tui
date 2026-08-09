// apps/madbridge/src/tui/App.tsx
// Root layout — three-pane OpenTUI React UI.
// React is presentation only: it projects broker state and routes keyboard
// input. It cannot decide authority, permissions, ownership, evidence
// acceptance, hashing, or recovery.
//
// There is NO approval toggle. The ApprovalDialog emits typed events with
// explicit text for every color state. The broker records the ledger entry.
//
// Approval keys are INERT unless the decision/approval surface is focused.
// This prevents accidental or context-blind approval resolution.

import { useReducer, useCallback, useMemo } from "react";
import { useKeyboard as useOpenTuiKeyboard } from "@opentui/react";
import type { KeyEvent } from "@opentui/core";
import { ClaudePane } from "./panes/ClaudePane";
import { AntigravityPane } from "./panes/AntigravityPane";
import { GovernancePane } from "./panes/GovernancePane";
import { ApprovalDialog } from "./components/ApprovalDialog";
import { StatusBar } from "./components/StatusBar";
import { FixtureBanner } from "./components/FixtureBanner";
import { EventLog } from "./components/EventLog";
import { useBrokerState } from "./hooks/useBrokerState";
import { loadKeybindings, resolveKey, translateKeyEvent } from "./keybindings";
import type { KeyAction } from "./keybindings";
import type { FocusTarget, BrokerSnapshot, ApprovalRequestEvent } from "./types";

interface UIState {
  focus: FocusTarget;
  showApprovalDialog: boolean;
  claudeOutput: string;
  antigravityOutput: string;
}

type UIAction =
  | { type: "focus"; target: FocusTarget }
  | { type: "show-approval"; show: boolean }
  | { type: "pty-output"; pane: "claude" | "antigravity"; data: string };

function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case "focus":
      return { ...state, focus: action.target };
    case "show-approval":
      return { ...state, showApprovalDialog: action.show };
    case "pty-output": {
      if (action.pane === "claude") {
        return { ...state, claudeOutput: state.claudeOutput + action.data };
      }
      return { ...state, antigravityOutput: state.antigravityOutput + action.data };
    }
  }
}

interface AppProps {
  /** External subscribe function to receive immutable broker snapshots. */
  subscribe?: (listener: (snapshot: BrokerSnapshot) => void) => () => void;
  /** PTY write callback — bytes go to the focused PTY. */
  onPtyWrite?: (data: string) => void;
  /** Approval resolution callback — sends typed event to broker. */
  onApprovalResolve?: (event: ApprovalRequestEvent) => void;
  /** Quit callback. */
  onQuit?: () => void;
  /** Fixture mode — permanently labels the view as fixture data. */
  fixture?: boolean;
}

export function App({ subscribe, onPtyWrite, onApprovalResolve, onQuit, fixture = false }: AppProps) {
  const { state, connected } = useBrokerState(subscribe);
  const keybindings = useMemo(() => loadKeybindings(), []);

  const [ui, dispatch] = useReducer(uiReducer, {
    focus: "claude",
    showApprovalDialog: false,
    claudeOutput: "",
    antigravityOutput: "",
  });

  const handlePtyWrite = useCallback((data: string) => {
    onPtyWrite?.(data);
    // PTY output is routed back via broker — no parsing in React
  }, [onPtyWrite]);

  const handleFocusChange = useCallback((target: FocusTarget) => {
    dispatch({ type: "focus", target });
  }, []);

  const handleApproval = useCallback((accept: boolean, approvalId: string | null) => {
    // Approval keys are inert unless decision/approval focus is active.
    // This prevents accidental or context-blind resolution.
    if (ui.focus !== "governance" && ui.focus !== "events") {
      return;
    }

    // Find the pending approval matching the displayed id.
    const pending = state?.pendingApprovals?.find((a) => a.id === approvalId);
    if (!pending) return;

    onApprovalResolve?.({
      taskId: pending.taskId,
      actor: pending.actor,
      scope: pending.scope,
      repositoryFingerprint: pending.repositoryFingerprint,
      timestamp: new Date().toISOString(),
      resolution: accept ? "accept" : "reject",
    });
    dispatch({ type: "show-approval", show: false });
  }, [state, onApprovalResolve, ui.focus]);

  const handleQuit = useCallback(() => {
    onQuit?.();
  }, [onQuit]);

  // Wire OpenTUI's useKeyboard KeyEvent stream through the translator
  // into the existing tested resolveKey path.
  useOpenTuiKeyboard((keyEvent: KeyEvent) => {
    // Translate KeyEvent to the keybinding string format.
    const keyStr = translateKeyEvent({
      name: keyEvent.name,
      ctrl: keyEvent.ctrl,
      meta: keyEvent.meta,
      shift: keyEvent.shift,
    });

    const action: KeyAction | null = resolveKey(keyStr, keybindings);

    if (action !== null) {
      switch (action) {
        case "focus-claude":
          handleFocusChange("claude");
          break;
        case "focus-antigravity":
          handleFocusChange("antigravity");
          break;
        case "focus-governance":
          handleFocusChange("governance");
          break;
        case "focus-events":
          handleFocusChange("events");
          break;
        case "accept-approval": {
          // Bind to the displayed approval id — do not resolve from
          // unfocused context.
          const displayedId = state?.pendingApprovals?.[0]?.id ?? null;
          handleApproval(true, displayedId);
          break;
        }
        case "reject-approval": {
          const displayedId = state?.pendingApprovals?.[0]?.id ?? null;
          handleApproval(false, displayedId);
          break;
        }
        case "quit":
          handleQuit();
          break;
      }
      return;
    }

    // Not a global action — pass through to focused PTY.
    // Bare digits (1, 2, 3, etc.) pass through unchanged.
    handlePtyWrite(keyEvent.name);
  });

  const pendingApproval = state?.pendingApprovals?.[0] ?? null;

  return (
    <box flexDirection="column" flexGrow={1}>
      {/* Top: three panes side by side */}
      <box flexDirection="row" flexGrow={1}>
        <ClaudePane
          active={ui.focus === "claude"}
          state={state}
          ptyOutput={ui.claudeOutput}
        />
        <AntigravityPane
          active={ui.focus === "antigravity"}
          state={state}
          ptyOutput={ui.antigravityOutput}
        />
        <GovernancePane
          active={ui.focus === "governance"}
          state={state}
        />
      </box>

      {/* Middle: event log (visible when focused) */}
      {ui.focus === "events" && (
        <EventLog entries={state?.eventLog ?? []} />
      )}

      {/* Bottom: fixture banner (separate truth band) + status bar.
          The fixture banner is a separate one-row band so the StatusBar
          can always carry all six governance facts without being squeezed. */}
      {fixture && <FixtureBanner />}
      <StatusBar state={state} connected={connected} focus={ui.focus} />

      {/* Overlay: approval dialog — shows pending approval events from broker.
          UI does NOT create authority. It displays broker authority events.
          Acceptance/rejection is sent to the broker, which records a ledger entry.
          NO approval toggle — explicit text for every color state. */}
      {ui.showApprovalDialog && pendingApproval && (
        <ApprovalDialog
          approval={pendingApproval}
          onResolve={(event) => {
            onApprovalResolve?.(event);
            dispatch({ type: "show-approval", show: false });
          }}
        />
      )}
    </box>
  );
}

export default App;
