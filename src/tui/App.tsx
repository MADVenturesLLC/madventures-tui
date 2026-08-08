// src/tui/App.tsx — Root layout, focus routing, configurable keyboard handler
import { useReducer, useCallback, useMemo } from "react";
import { ClaudePane } from "./panes/ClaudePane";
import { AntigravityPane } from "./panes/AntigravityPane";
import { GovernancePane } from "./panes/GovernancePane";
import { ApprovalDialog } from "./components/ApprovalDialog";
import { StatusBar } from "./components/StatusBar";
import { EventLog } from "./components/EventLog";
import { useBrokerState } from "./hooks/useBrokerState";
import { loadKeybindings } from "../shared/keybindings";
import type { FocusTarget } from "../shared/ui-types";

interface UIState {
  focus: FocusTarget;
  showApprovalDialog: boolean;
}

type UIAction =
  | { type: "focus"; target: FocusTarget }
  | { type: "toggle-approval" };

function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case "focus":
      return { ...state, focus: action.target };
    case "toggle-approval":
      return { ...state, showApprovalDialog: !state.showApprovalDialog };
    default:
      return state;
  }
}

export function App() {
  const { state, connected } = useBrokerState();
  const keybindings = useMemo(() => loadKeybindings(), []);

  const [ui, dispatch] = useReducer(uiReducer, {
    focus: "claude",
    showApprovalDialog: false,
  });

  const onKey = useCallback((key: string) => {
    const normalized = key.toLowerCase();
    const action = keybindings.get(normalized);
    if (!action) return;

    switch (action) {
      case "focus-claude": dispatch({ type: "focus", target: "claude" }); break;
      case "focus-antigravity": dispatch({ type: "focus", target: "antigravity" }); break;
      case "focus-governance": dispatch({ type: "focus", target: "governance" }); break;
      case "focus-events": dispatch({ type: "focus", target: "events" }); break;
      case "toggle-approval": dispatch({ type: "toggle-approval" }); break;
      case "quit": break; // handled by renderer
    }
  }, [keybindings]);

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

      {/* Middle: event log (visible when focused) */}
      {ui.focus === "events" && (
        <EventLog entries={state?.eventLog ?? []} />
      )}

      {/* Bottom: status bar always visible */}
      <StatusBar state={state} connected={connected} focus={ui.focus} />

      {/* Overlay: approval dialog — shows pending approval events from broker.
          UI does NOT create authority. It displays broker authority events.
          Acceptance/rejection is sent to the broker, which records a ledger entry. */}
      {ui.showApprovalDialog && (state?.pendingApprovals?.length ?? 0) > 0 && (
        <ApprovalDialog
          approval={state!.pendingApprovals[0]!}
          onAccept={() => dispatch({ type: "toggle-approval" })}
          onReject={() => dispatch({ type: "toggle-approval" })}
        />
      )}
    </box>
  );
}
