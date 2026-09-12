import type { FounderIntent } from "../lib/intent";
import type { SubjectView } from "../lib/render-model";
import { MemoryChip } from "./StatusBar";

function Kv(props: { k: string; v: string }) {
  return (
    <div className="kv">
      <span className="k">{props.k}</span>
      <span className="v">{props.v}</span>
    </div>
  );
}

export function EvidenceDrawer(props: {
  open: boolean;
  view: SubjectView;
  intents: FounderIntent[];
  onClose: () => void;
}) {
  const { view } = props;
  const verdict = view.verdict;
  return (
    <>
      <div
        className={props.open ? "drawer-scrim open" : "drawer-scrim"}
        style={props.open ? undefined : { pointerEvents: "none" }}
        onClick={props.onClose}
      />
      <aside
        className={props.open ? "drawer panel open" : "drawer panel"}
        role="dialog"
        aria-label={`Evidence for ${view.subject}`}
        aria-hidden={!props.open}
      >
        <div className="drawer-section">
          <span className="label">subject</span>
          <Kv k="name" v={view.subject} />
          <Kv k="current head" v={view.memory.current_head_sha ?? "—"} />
          {view.memory.recorded_head_sha !== undefined && <Kv k="recorded head" v={view.memory.recorded_head_sha} />}
          <div className="kv">
            <span className="k">memory</span>
            <MemoryChip status={view.memory.status} reason={view.memory.reason_code} />
          </div>
          <Kv k="reason" v={view.memory.reason_code} />
        </div>

        <div className="drawer-section">
          <span className="label">verdict</span>
          {verdict === null ? (
            <p className="reason">No verdict object on record. The projector does not invent one.</p>
          ) : (
            <>
              <Kv k="verdict" v={verdict.verdict} />
              <Kv k="reason_code" v={verdict.reason_code} />
              <Kv k="produced_by" v={verdict.produced_by} />
              <Kv k="produced_at" v={verdict.produced_at} />
              {verdict.findings !== undefined &&
                verdict.findings.map((f) => <Kv key={f.code} k={`finding: ${f.code}`} v={f.message} />)}
            </>
          )}
        </div>

        {verdict !== null && (
          <div className="drawer-section">
            <span className="label">evidence links</span>
            {verdict.evidence_refs.map((link, i) => (
              <div className="evidence-tile panel" key={`${link.ref.path}-${String(i)}`} style={{ marginTop: "8px" }}>
                <span className="kind label">{link.ref.kind}</span>
                <span className="path">{link.ref.path}</span>
                <span className="path" style={{ color: "var(--text-3)" }} title={link.ref.sha256}>
                  sha256 {link.ref.sha256.slice(0, 16)}…
                </span>
                {link.boundary !== undefined && (
                  <span className="path" style={{ color: "var(--text-2)" }}>
                    rung {link.boundary.rung} — not evidence of:{" "}
                    {link.boundary.not_evidence_of.length === 0 ? "(nothing above; top rung)" : link.boundary.not_evidence_of.join(", ")}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="drawer-section">
          <span className="label">session intent log (typed events only)</span>
          {props.intents.length === 0 ? (
            <p className="reason">No founder intents emitted this session.</p>
          ) : (
            props.intents.map((e, i) => (
              <Kv key={`${e.at}-${String(i)}`} k={`${e.intent}`} v={`${e.subject} @ ${e.at}`} />
            ))
          )}
        </div>

        <button onClick={props.onClose}>close ⎋</button>
      </aside>
    </>
  );
}
