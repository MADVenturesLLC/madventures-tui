// apps/projector-mc/src/components/RoomStatusPanel.tsx
// Lane 3 projector surface: occupancy chip, agent phase (closed enum), the
// block_reason CODE when blocked, and evidence chips (path / short SHA).
// Every value comes from a validated RoomStatus record; the fault banner
// renders when the record was illegal (completed without evidence) — the
// displayed phase is the DOWNGRADED phase, so success is never painted.
// This panel is labeled as fixture replay: it never claims a live Gateway.

import { shortEvidenceRef, type RoomStatusView } from "../lib/room-status";
import type { RoomStatusScenario } from "../lib/room-status-fixture";
import { Chip } from "./StatusBar";

function EvidenceChip(props: { kind: string; ref: string }) {
  return (
    <Chip
      label={props.ref}
      tone="zinc"
      title={`${props.kind}: ${props.ref}`}
    />
  );
}

export function RoomStatusPanel(props: {
  scenario: RoomStatusScenario;
  scenarioIdx: number;
  total: number;
  onNext: () => void;
}) {
  const view: RoomStatusView = props.scenario.view;
  const status = props.scenario.status;
  return (
    <section className="roomstatus-panel panel" aria-label="Room status (fixture replay)">
      <div className="roomstatus-row">
        <span className="label">room status</span>
        <Chip label="fixture replay" tone="violet" title="Replayed RoomStatus fixture — NOT a live Gateway feed" />
        <span className="roomstatus-scenario">
          {props.scenarioIdx + 1}/{props.total} · {props.scenario.name}
        </span>
        <span className="spacer" />
        <button onClick={props.onNext} aria-label="Next RoomStatus scenario">
          r next
        </button>
      </div>

      <div className="roomstatus-row">
        <span className="mono" style={{ color: "var(--text-1)" }}>
          {view.roomId}
        </span>
        <Chip label={view.occupancy} tone={view.occupancy === "occupied" ? "violet" : "zinc"} title={`occupancy: ${view.occupancy} (seq ${String(status.observedSeq)})`} />
        <Chip
          label={faultAwarePhaseLabel(view)}
          tone={view.tone}
          title={
            view.fault === null
              ? `agent_phase: ${view.displayedPhase}`
              : `${view.fault.code} — ${view.fault.detail}`
          }
        />
        {view.blockReason !== null && (
          <Chip label={`block: ${view.blockReason}`} tone="rose" title={`block_reason code: ${view.blockReason}`} />
        )}
      </div>

      {view.fault !== null && (
        <div className="roomstatus-fault" role="alert">
          IR_FAULT {view.fault.code} — displayed as verifying; success never painted without evidence_refs
        </div>
      )}

      {view.evidenceRefs.length > 0 && (
        <div className="roomstatus-row">
          <span className="label">evidence</span>
          {view.evidenceRefs.map((ref) => (
            <EvidenceChip key={`${ref.kind}:${ref.ref}`} kind={ref.kind} ref={shortEvidenceRef(ref)} />
          ))}
        </div>
      )}
    </section>
  );
}

function faultAwarePhaseLabel(view: RoomStatusView): string {
  return view.fault === null ? view.displayedPhase : `${view.displayedPhase} (downgraded)`;
}
