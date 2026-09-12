import { VERDICT_TONE } from "@mad/single-verdict";

import type { SubjectView } from "../lib/render-model";
import { Chip, MemoryChip } from "./StatusBar";

export function RoomRail(props: {
  rooms: Array<{ id: string; label: string; subjects: SubjectView[] }>;
  visibleSubjects: Set<string>;
  selectedSubject: string | null;
  onSelect: (subject: string) => void;
}) {
  return (
    <>
      {props.rooms.map((room) => (
        <section className="room" key={room.id}>
          <div className="room-head">
            <span className="label">{room.label}</span>
          </div>
          {room.subjects.map((view) => (
            <button
              key={view.subject}
              className="room-subject"
              aria-selected={view.subject === props.selectedSubject}
              onClick={() => props.onSelect(view.subject)}
              disabled={!props.visibleSubjects.has(view.subject)}
              style={props.visibleSubjects.has(view.subject) ? undefined : { opacity: 0.35 }}
            >
              <span className="name">{view.subject}</span>
              {view.gateBreach ? (
                <Chip label="GATE_BREACH" tone="rose" title="positive verdict while memory is not VALID — this must never render" />
              ) : view.verdict !== null ? (
                <Chip label={view.verdict.verdict} tone={VERDICT_TONE[view.verdict.verdict]} title={view.verdict.reason_code} />
              ) : (
                <Chip label="NO VERDICT" tone="zinc" title="no verdict on record for this subject" />
              )}
              <MemoryChip status={view.memory.status} reason={view.memory.reason_code} />
            </button>
          ))}
        </section>
      ))}
    </>
  );
}
