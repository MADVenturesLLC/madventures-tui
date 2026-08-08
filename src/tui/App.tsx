// src/tui/App.tsx — Root layout, focus routing, keyboard handler
import { useReducer, useCallback } from "react";
import { ClaudePane } from "./panes/ClaudePane";
import { AntigravityPane } from "./panes/AntigravityPane";
import { GovernancePane } from "./panes/GovernancePane";
import { ApprovalDialog } from "./components/ApprovalDialog";
import { StatusBar } from "./components/StatusBar";
import { EventLog } from "./components/EventLog";
import { useBrokerState } from "./hooks/useBrokerState";

export type FocusTarget = "claude" | "antigravity" | "governance" | "events";

interface UIState {
  focus: FocusTarget;
  showApproval: boolean;
}

type UIAction =
  | { type: "focus"; target: FocusTarget }
  | { type: "toggle-approval" };

function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case "focus":
      return { ...state, focus: action.target };
    case "toggle-approval":
      return { ...state, showApproval: !state.showApproval };
    default:
      return state;
  }
}

export function App() {
  const { state, connected } = useBrokerState();
  const [ui, dispatch] = useReducer(uiReducer, {
    focus: "claude",
    showApproval: state?.pendingApproval != null,
  });

  const onKey = useCallback((key: string) => {
    switch (key) {
      case "1": dispatch({ type: "focus", target: "claude" }); break;
      case "2": dispatch({ type: "focus", target: "antigravity" }); break;
      case "3": dispatch({ type: "focus", target: "governance" }); break;
      case "4": dispatch({ type: "focus", target: "events" }); break;
      case "a": dispatch({ type: "toggle-approval" }); break;
    }
  }, []);

  return (
    <box flexDirection="column" flexGrow={1}>
      {/* Top: three panes side by side */}
      <box flexDirection="row" flexGrow={1}>
        <ClaudePane
          active={ui.focus === "claude"}
          state={state}
          onKey={onKey}
        />
        <AntigravityPane
          active={ui.focus === "antigravity"}
          state={state}
          onKey={onKey}
        />
        <GovernancePane
          active={ui.focus === "governance"}
          state={state}
          onKey={onKey}
        />
      </box>

      {/* Middle: event log (collapsible) */}
      {ui.focus === "events" && (
        <EventLog entries={state?.eventLog ?? []} />
      )}

      {/* Bottom: status bar always visible */}
      <StatusBar state={state} connected={connected} focus={ui.focus} />

      {/* Overlay: approval dialog when needed */}
      {ui.showApproval && state?.pendingApproval && (
        <ApprovalDialog
          request={state.pendingApproval}
          onAccept={() => dispatch({ type: "toggle-approval" })}
          onReject={() => dispatch({ type: "toggle-approval" })}
        />
      )}
    </box>
  );
}
