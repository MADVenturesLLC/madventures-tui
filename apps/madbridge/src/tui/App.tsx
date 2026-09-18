// apps/madbridge/src/tui/App.tsx
// Root layout — Writer's Stage TUI.
// React is presentation only: it projects broker state and routes keyboard
// input. It cannot decide authority, permissions, ownership, evidence
// acceptance, hashing, or recovery.
//
// There is NO approval toggle. The DecisionStrip is the live Founder
// decision surface (double border). It is presentation-only — resolution
// goes through the keyboard router's shared validation guard. The broker
// records the ledger entry.
//
// Approval keys are INERT unless ALL of:
//   - a pending approval is bound (displayedApprovalId !== null)
//   - focus === "governance"
//   - no incident/interruption has precedence
//   - the stored approval still exists in the snapshot
//   - approval.colorState.kind === "pending"
//   - the approval ID is not already in resolvedApprovalIds
// Claude, Antigravity, and Events focus are ALL inert.
//
// Resolution flows through a single guarded path:
//   routeKeyEvent() → validateApprovalResolution() → onApprovalResolve

import { useReducer, useCallback, useMemo, useEffect, useRef } from "react";
import { useKeyboard as useOpenTuiKeyboard, useTerminalDimensions } from "@opentui/react";
import type { KeyEvent } from "@opentui/core";
import { ClaudePane } from "./panes/ClaudePane";
import { AntigravityPane } from "./panes/AntigravityPane";
import { GovernancePane } from "./panes/GovernancePane";
import { DecisionStrip } from "./components/DecisionStrip";
import { IncidentBand, incidentActive } from "./components/IncidentBand";
import { StatusBar } from "./components/StatusBar";
import { FixtureBanner } from "./components/FixtureBanner";
import { EventLog } from "./components/EventLog";
import { DockStrip } from "./components/DockStrip";
import { PaneTabs } from "./components/PaneTabs";
import { SeatBar } from "./components/SeatBar";
import { ModelBar, SeatModelRow } from "./components/ModelBar";
import { ModelPicker } from "./components/ModelPicker";
import { useBrokerState } from "./hooks/useBrokerState";
import { useSeatState } from "./hooks/useSeatState";
import { loadKeybindings, resolveKey, translateKeyEvent } from "./keybindings";
import type { KeyAction } from "./keybindings";
import type {
  FocusTarget,
  SeatId,
  BrokerSnapshot,
  ApprovalRequestEvent,
  PendingApproval,
} from "./types";
import { routeKeyEvent, pruneResolvedIds } from "./keyboard-router";
import type { KeyboardRouterState } from "./keyboard-router";
import type { loadOmpCatalog } from "./omp-catalog";

// Wide mode threshold: terminal width >= 80 shows stage + dock composition.
// Narrow mode (< 80) shows a tab row + a single selected surface.
const WIDE_MODE_MIN_WIDTH = 80;

interface UIState {
  focus: FocusTarget;
  /** Active Founder seat — LOCAL UI posture. Selecting a seat focuses the
   * seat's pane and sets the mode label on the bars. It never touches
   * broker authority, permissions, ownership, or approval semantics. */
  seat: SeatId;
  /** Whether the OMP model picker modal is open (LOCAL UI state). While
   * open, the router captures navigation keys and nothing reaches PTYs. */
  showModelPicker: boolean;
  showApprovalDialog: boolean;
  displayedApprovalId: string | null;
  /** IDs of approvals that have already been submitted (accept or reject).
   * Once submitted, an approval ID cannot be resolved again or auto-reopened
   * while the broker snapshot still contains it. */
  resolvedApprovalIds: ReadonlySet<string>;
  claudeOutput: string;
  antigravityOutput: string;
}

type UIAction =
  | { type: "focus"; target: FocusTarget }
  | { type: "seat"; seat: SeatId }
  | { type: "show-model-picker"; show: boolean }
  | { type: "show-approval"; show: boolean; approvalId: string | null }
  | { type: "add-resolved"; id: string }
  | { type: "prune-resolved"; ids: ReadonlySet<string> }
  | { type: "pty-output"; pane: "claude" | "antigravity"; data: string };

function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case "focus":
      return { ...state, focus: action.target };
    case "seat":
      return { ...state, seat: action.seat };
    case "show-model-picker":
      return { ...state, showModelPicker: action.show };
    case "show-approval":
      return { ...state, showApprovalDialog: action.show, displayedApprovalId: action.approvalId };
    case "add-resolved": {
      const newSet = new Set(state.resolvedApprovalIds);
      newSet.add(action.id);
      return { ...state, resolvedApprovalIds: newSet };
    }
    case "prune-resolved":
      return { ...state, resolvedApprovalIds: action.ids };
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
  /** OMP catalog loader override (tests inject a deterministic stub; the
   * production default shells out to the public `omp models ls --json`
   * CLI once at mount). LOCAL UI data only. */
  catalogLoader?: typeof loadOmpCatalog;
}

export function App({ subscribe, onPtyWrite, onApprovalResolve, onQuit, fixture = false, catalogLoader }: AppProps) {
  const { state, connected } = useBrokerState(subscribe);
  const keybindings = useMemo(() => loadKeybindings(), []);
  // Seat model-profile state — LOCAL UI only (pinned OMP profiles + catalog).
  const seatState = useSeatState(catalogLoader ? { loadCatalog: catalogLoader } : undefined);

  const [ui, dispatch] = useReducer(uiReducer, {
    focus: "claude",
    seat: "builder",
    showModelPicker: false,
    showApprovalDialog: false,
    displayedApprovalId: null,
    resolvedApprovalIds: new Set<string>(),
    claudeOutput: "",
    antigravityOutput: "",
  });

  // Keep refs for the keyboard handler so it always sees the latest state.
  // The ref is updated synchronously in the dispatch wrapper below so that
  // rapid keypresses within the same flush cycle see the updated state.
  const stateRef = useRef(state);
  const uiRef = useRef(ui);
  stateRef.current = state;

  // Synchronous dispatch wrapper — updates the ref immediately so the
  // keyboard handler sees the latest focus/dialog state within the same
  // event loop tick, before React re-renders.
  const dispatchSync = useCallback((action: UIAction) => {
    uiRef.current = uiReducer(uiRef.current, action);
    dispatch(action);
  }, []);

  const handlePtyWrite = useCallback((data: string) => {
    onPtyWrite?.(data);
  }, [onPtyWrite]);

  const handleFocusChange = useCallback((target: FocusTarget) => {
    dispatchSync({ type: "focus", target });
  }, [dispatchSync]);

  const handleSeatSelect = useCallback((seat: SeatId) => {
    dispatchSync({ type: "seat", seat });
  }, [dispatchSync]);

  const handleModelPickerOpen = useCallback(() => {
    dispatchSync({ type: "show-model-picker", show: true });
  }, [dispatchSync]);

  const handleModelPickerClose = useCallback(() => {
    dispatchSync({ type: "show-model-picker", show: false });
  }, [dispatchSync]);

  // The keyboard handler must see the latest catalog + cursor without
  // re-registering; mirror them into a ref like uiRef/stateRef above.
  const seatStateRef = useRef(seatState);
  seatStateRef.current = seatState;

  const handleModelPickerNav = useCallback((delta: number) => {
    seatStateRef.current.movePicker(delta);
  }, []);

  const handleModelPickerConfirm = useCallback(() => {
    const { catalog, pickerIndex } = seatStateRef.current;
    if (catalog.status !== "ok") return; // honest no-op — nothing to pin
    const model = catalog.models[pickerIndex];
    if (!model) return;
    seatStateRef.current.pinModel(uiRef.current.seat, model.selector);
    // The router closed the modal in its own state; App's UI state closes
    // through this callback.
    dispatchSync({ type: "show-model-picker", show: false });
  }, [dispatchSync]);

  const handleApprovalResolve = useCallback((event: ApprovalRequestEvent) => {
    onApprovalResolve?.(event);
  }, [onApprovalResolve]);

  const handleQuit = useCallback(() => {
    onQuit?.();
  }, [onQuit]);

  const handleShowApprovalDialog = useCallback((show: boolean, approvalId: string | null) => {
    dispatchSync({ type: "show-approval", show, approvalId });
  }, [dispatchSync]);

  // Prune resolvedApprovalIds when the snapshot changes — remove IDs
  // that no longer exist in the pending array so a fresh approval with
  // the same ID (after snapshot rotation) can be opened.
  useEffect(() => {
    const pruned = pruneResolvedIds(ui.resolvedApprovalIds, state);
    if (pruned.size !== ui.resolvedApprovalIds.size) {
      dispatchSync({ type: "prune-resolved", ids: pruned });
    }
  }, [state, ui.resolvedApprovalIds, dispatchSync]);

  // Auto-bind the decision surface to a pending approval whenever one
  // exists and no incident has precedence. The DecisionStrip is visible
  // across ALL focus targets (not just governance) so the Founder always
  // sees what awaits decision. The surface is only ARMED for resolution
  // when Governance is focused.
  //
  // Stored-ID binding: the displayed approval ID is set once and never
  // recalculated from pendingApprovals[0] at resolution time. Queue
  // reordering cannot change which approval is resolved.
  useEffect(() => {
    const currentResolved = uiRef.current.resolvedApprovalIds;

    // If no incident is active, bind to the first unresolved pending approval.
    if (!incidentActive(state) && !ui.showApprovalDialog) {
      const firstPending = state?.pendingApprovals?.find(
        (a: PendingApproval) =>
          a.colorState.kind === "pending" &&
          !currentResolved.has(a.id),
      );
      if (firstPending) {
        dispatchSync({ type: "show-approval", show: true, approvalId: firstPending.id });
      }
    }

    // If the displayed approval disappears, expires, changes state, or
    // becomes locally resolved, close/unarm the surface safely. Never
    // substitute another approval during the same key action.
    if (ui.showApprovalDialog && ui.displayedApprovalId !== null) {
      const stillPending = state?.pendingApprovals?.find(
        (a: PendingApproval) => a.id === ui.displayedApprovalId,
      );
      if (!stillPending || stillPending.colorState.kind !== "pending" || currentResolved.has(stillPending.id)) {
        dispatchSync({ type: "show-approval", show: false, approvalId: null });
      }
    }

    // If an incident arrives, close the decision surface — IncidentBand
    // takes precedence. The displayed approval remains in the snapshot's
    // pending array (represented by the StatusBar pending count) but the
    // decision surface is unarmed.
    if (incidentActive(state) && ui.showApprovalDialog) {
      dispatchSync({ type: "show-approval", show: false, approvalId: null });
    }
  }, [ui.focus, ui.showApprovalDialog, ui.displayedApprovalId, ui.resolvedApprovalIds, state, dispatchSync]);

  // Wire OpenTUI's useKeyboard KeyEvent stream through the translator
  // and the extracted routeKeyEvent production logic.
  useOpenTuiKeyboard((keyEvent: KeyEvent) => {
    const keyStr = translateKeyEvent({
      name: keyEvent.name,
      ctrl: keyEvent.ctrl,
      meta: keyEvent.meta,
      shift: keyEvent.shift,
    });

    const action: KeyAction | null = resolveKey(keyStr, keybindings);

    const routerState: KeyboardRouterState = {
      focus: uiRef.current.focus,
      seat: uiRef.current.seat,
      showModelPicker: uiRef.current.showModelPicker,
      showApprovalDialog: uiRef.current.showApprovalDialog,
      displayedApprovalId: uiRef.current.displayedApprovalId,
      resolvedApprovalIds: uiRef.current.resolvedApprovalIds,
    };

    const newState = routeKeyEvent({
      keyStr,
      action,
      sequence: keyEvent.sequence,
      name: keyEvent.name,
      state: routerState,
      snapshot: stateRef.current,
      callbacks: {
        onFocusChange: handleFocusChange,
        onSeatSelect: handleSeatSelect,
        onModelPickerOpen: handleModelPickerOpen,
        onModelPickerNav: handleModelPickerNav,
        onModelPickerConfirm: handleModelPickerConfirm,
        onModelPickerClose: handleModelPickerClose,
        onApprovalResolve: (event) => {
          handleApprovalResolve(event);
          // Mark the approval as resolved to prevent duplicate submission.
          if (uiRef.current.displayedApprovalId) {
            dispatchSync({ type: "add-resolved", id: uiRef.current.displayedApprovalId });
          }
        },
        onPtyWrite: handlePtyWrite,
        onQuit: handleQuit,
        onShowApprovalDialog: handleShowApprovalDialog,
      },
      bindings: keybindings,
    });

    // Sync resolvedApprovalIds if routeKeyEvent added to the set.
    if (newState.resolvedApprovalIds !== uiRef.current.resolvedApprovalIds) {
      dispatchSync({ type: "prune-resolved", ids: newState.resolvedApprovalIds });
    }
  });

  // The approval displayed in the DecisionStrip — looked up by the stored
  // ID, NOT pendingApprovals[0]. Queue reordering cannot change which
  // approval is resolved.
  const pendingApproval = state?.pendingApprovals?.find(
    (a: PendingApproval) => a.id === ui.displayedApprovalId,
  ) ?? null;

  // ─── Composition: wide (>=80) vs narrow (<80) ───
  // Wide mode: the focused agent/surface occupies the full-width stage; the
  //   other agent appears as a compact dock strip below it.
  // Narrow mode: a tab row projects the current FocusTarget; exactly one
  //   selected surface renders full-width. No three-pane squeezing.
  const { width: termWidth } = useTerminalDimensions();
  const wideMode = termWidth >= WIDE_MODE_MIN_WIDTH;

  // The docked agent is whichever of Claude/Antigravity is NOT focused.
  // When a non-agent surface (Governance/Events) is focused in wide mode,
  // both agents remain reachable via their dock strips.
  const claudeFocused = ui.focus === "claude";
  const antigravityFocused = ui.focus === "antigravity";
  const governanceFocused = ui.focus === "governance";
  const eventsFocused = ui.focus === "events";

  // IncidentBand is active when sessionState is interrupted or an incident
  // record exists. It takes precedence over DecisionStrip.
  const incident = incidentActive(state);

  // DecisionStrip binding: visible only when no incident is active AND a
  // pending approval is bound AND it still exists and is pending.
  // The surface is ARMED for resolution only when Governance is focused.
  // `pendingApproval` is already looked up by stored ID above.
  const decisionVisible =
    !incident &&
    ui.showApprovalDialog &&
    pendingApproval !== null &&
    pendingApproval.colorState.kind === "pending" &&
    !ui.resolvedApprovalIds.has(pendingApproval.id);

  // Compute position: 1-based index among unresolved pending approvals.
  const unresolvedPending = state?.pendingApprovals?.filter(
    (a) => a.colorState.kind === "pending" && !ui.resolvedApprovalIds.has(a.id),
  ) ?? [];
  const decisionPosition = pendingApproval
    ? unresolvedPending.findIndex((a) => a.id === pendingApproval.id) + 1
    : 1;

  // Armed = Governance focused + no incident + approval is pending + bound.
  const decisionArmed = decisionVisible && governanceFocused && !incident;

  return (
    <box flexDirection="column" flexGrow={1}>
      {/* ── Founder seat rows — always visible. Wide terminals get two
          rows (SeatBar, then ModelBar). Narrow terminals share ONE row so
          the whole stack still fits 24 lines without compressing any
          truth band (a compressed box corrupts its children). ── */}
      {wideMode ? (
        <>
          <SeatBar seat={ui.seat} />
          <ModelBar seat={ui.seat} profile={seatState.profiles[ui.seat] ?? null} catalog={seatState.catalog} />
        </>
      ) : (
        <SeatModelRow seat={ui.seat} profile={seatState.profiles[ui.seat] ?? null} catalog={seatState.catalog} />
      )}

      {/* ── IncidentBand: before the stage area, takes precedence ── */}
      {incident && <IncidentBand state={state} />}

      {/* ── Stage area (wrapped so bands/status bar get reserved space) ──
          flexShrink+minHeight=0+overflow=hidden make the stage the ONLY
          region that yields when a short terminal (e.g. 60×24) cannot fit
          the full pane content — the decision strip and status bar keep
          their full geometry and never overlap. ── */}
      <box flexGrow={1} flexShrink={1} minHeight={0} overflow="hidden" flexDirection="column">
        {wideMode ? (
          <>
            {/* Wide mode: focused surface is the full-width stage. */}
            {claudeFocused && (
              <ClaudePane active={true} state={state} ptyOutput={ui.claudeOutput} />
            )}
            {antigravityFocused && (
              <AntigravityPane active={true} state={state} ptyOutput={ui.antigravityOutput} />
            )}
            {governanceFocused && (
              <GovernancePane active={true} state={state} />
            )}
            {eventsFocused && (
              <EventLog entries={state?.eventLog ?? []} />
            )}

            {/* Dock strips: the non-focused agent(s) appear as compact strips. */}
            {!claudeFocused && !governanceFocused && !eventsFocused && (
              // Antigravity is focused → Claude is docked.
              <DockStrip surface="claude-code" state={state} ptyOutput={ui.claudeOutput} />
            )}
            {!antigravityFocused && !governanceFocused && !eventsFocused && (
              // Claude is focused → Antigravity is docked.
              <DockStrip surface="antigravity" state={state} ptyOutput={ui.antigravityOutput} />
            )}
            {governanceFocused && (
              // Governance is the stage → both agents are docked and reachable.
              <>
                <DockStrip surface="claude-code" state={state} ptyOutput={ui.claudeOutput} />
                <DockStrip surface="antigravity" state={state} ptyOutput={ui.antigravityOutput} />
              </>
            )}
            {eventsFocused && (
              // Events is the stage → both agents are docked and reachable.
              <>
                <DockStrip surface="claude-code" state={state} ptyOutput={ui.claudeOutput} />
                <DockStrip surface="antigravity" state={state} ptyOutput={ui.antigravityOutput} />
              </>
            )}
          </>
        ) : (
          <>
            {/* Narrow mode: tab row + exactly one selected surface. */}
            <PaneTabs focus={ui.focus} />
            {claudeFocused && (
              <ClaudePane active={true} state={state} ptyOutput={ui.claudeOutput} />
            )}
            {antigravityFocused && (
              <AntigravityPane active={true} state={state} ptyOutput={ui.antigravityOutput} />
            )}
            {governanceFocused && (
              <GovernancePane active={true} state={state} />
            )}
            {eventsFocused && (
              <EventLog entries={state?.eventLog ?? []} />
            )}
          </>
        )}
      </box>

      {/* ── DecisionStrip: full width after stage/dock, before banner/status.
          Replaces the overlay ApprovalDialog as the live decision surface.
          Not rendered concurrently with IncidentBand (incident takes
          precedence). Presentation-only — resolution goes through the
          existing shared validation and resolution logic. ── */}
      {decisionVisible && pendingApproval && (
        <DecisionStrip
          approval={pendingApproval}
          position={decisionPosition}
          total={unresolvedPending.length}
          armed={decisionArmed}
          keybindings={keybindings}
        />
      )}

      {/* ── ModelPicker: Ctrl+P modal overlay. Captures nav keys while
          open (router-enforced); pinning sets the seat's LOCAL profile. ── */}
      {ui.showModelPicker && (
        <ModelPicker catalog={seatState.catalog} pickerIndex={seatState.pickerIndex} />
      )}

      {/* Bottom: fixture banner (separate truth band) + status bar. */}
      {fixture && <FixtureBanner />}
      <StatusBar state={state} connected={connected} focus={ui.focus} seat={ui.seat} />
    </box>
  );
}

export default App;