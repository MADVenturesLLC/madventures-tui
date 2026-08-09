// apps/madbridge/src/tui/App.tsx
// Root layout — three-pane OpenTUI React UI.
// React is presentation only: it projects broker state and routes keyboard
// input. It cannot decide authority, permissions, ownership, evidence
// acceptance, hashing, or recovery.
//
// There is NO approval toggle. The ApprovalDialog emits typed events with
// explicit text for every color state. The broker records the ledger entry.

import { useReducer, useCallback, useMemo, useState } from "react";
import { ClaudePane } from "./panes/ClaudePane";
import { AntigravityPane } from "./panes/AntigravityPane";
import { GovernancePane } from "./panes/GovernancePane";
import { ApprovalDialog } from "./components/ApprovalDialog";
import { StatusBar } from "./components/StatusBar";
import { EventLog } from "./components/EventLog";
import { useBrokerState } from "./hooks/useBrokerState";
import { useKeyboard } from "./hooks/useKeyboard";
import { loadKeybindings } from "./keybindings";
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
}

export function App({ subscribe, onPtyWrite, onApprovalResolve, onQuit }: AppProps) {
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

  const handleApproval = useCallback((accept: boolean) => {
    const pending = state?.pendingApprovals?.[0];
    if (pending) {
      onApprovalResolve?.({
        taskId: pending.taskId,
        actor: pending.actor,
        scope: pending.scope,
        repositoryFingerprint: pending.repositoryFingerprint,
        timestamp: new Date().toISOString(),
        resolution: accept ? "accept" : "reject",
      });
    }
    dispatch({ type: "show-approval", show: false });
  }, [state, onApprovalResolve]);

  const handleQuit = useCallback(() => {
    onQuit?.();
  }, [onQuit]);

  const onKey = useKeyboard({
    bindings: keybindings,
    onFocusChange: handleFocusChange,
    onApproval: handleApproval,
    onQuit: handleQuit,
    onPtyWrite: handlePtyWrite,
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

      {/* Bottom: status bar always visible — persistent labels even in narrow layouts */}
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
