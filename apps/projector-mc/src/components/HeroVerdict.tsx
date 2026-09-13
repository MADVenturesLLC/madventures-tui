import { VERDICT_TONE } from "@mad/single-verdict";
import { FOUNDER_INTENTS, type FounderIntentName } from "../lib/intent";
import type { SubjectView } from "../lib/render-model";

import { Chip, MemoryChip } from "./StatusBar";

export function HeroVerdict(props: {
  view: SubjectView;
  onOpenEvidence: () => void;
  onCopySha: () => void;
  onIntent: (name: FounderIntentName) => void;
}) {
  const { view } = props;
  const currentSha = view.memory.current_head_sha ?? "";
  const verdict = view.verdict;

  return (
    <>
      <div>
        <span className="label">Verdict</span>
        <h1
          className="hero-verdict"
          style={{ color: verdict === null ? "var(--tone-zinc)" : `var(--tone-${VERDICT_TONE[verdict.verdict]})` }}
        >
          {verdict === null ? "NO VERDICT" : verdict.verdict}
        </h1>
        <div className="hero-subject">{view.subject}</div>
        {verdict !== null && (
          <div className="hero-meta">
            {verdict.produced_by} · {verdict.produced_at}
          </div>
        )}
      </div>

      <div className="sha-row">
        <span className="label">head</span>
        <span className="sha" title={`${currentSha} — press c or click copy`}>{currentSha}</span>
        <button className="copy-sha" onClick={props.onCopySha} aria-label="Copy head SHA">⧉ copy SHA</button>
        <button onClick={props.onOpenEvidence}>evidence ⏎</button>
      </div>

      <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
        <MemoryChip status={view.memory.status} reason={view.memory.reason_code} />
        <span className="label">{view.memory.reason_code}</span>
        {view.gateBreach && <Chip label="GATE_BREACH" tone="rose" title="positive verdict while memory is not VALID" />}
      </div>

      {verdict !== null && <p className="reason">reason_code: <span className="mono">{verdict.reason_code}</span></p>}

      {verdict !== null && verdict.findings !== undefined && verdict.findings.length > 0 && (
        <div>
          <span className="label">findings</span>
          {verdict.findings.map((f) => (
            <p className="reason" key={f.code}>
              <span className="mono">{f.code}</span> — {f.message}
            </p>
          ))}
        </div>
      )}

      <div className="hero-actions">
        {FOUNDER_INTENTS.map((name) => (
          <button key={name} disabled={verdict === null} onClick={() => props.onIntent(name)}>
            emit {name} intent
          </button>
        ))}
        <span className="label" style={{ alignSelf: "center" }}>
          typed intent event only — no GitHub, no merge, no gateway
        </span>
      </div>
    </>
  );
}
