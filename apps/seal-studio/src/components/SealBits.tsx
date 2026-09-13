// apps/seal-studio/src/components/SealBits.tsx
// The deliberate-commitment controls. Nothing here seals casually: the hold
// button needs a sustained press, the tamper demo can only compute — it
// never touches disk.

import { useEffect, useRef, useState } from "react";

const HOLD_MS = 1_200;

/**
 * Hold-to-seal. Fires only after a sustained press; releasing early resets.
 * The progress fill is CSS-variable driven — no bounce, 0 → 1 linear.
 */
export function HoldButton(props: {
  disabled: boolean;
  label: string;
  onComplete: () => void;
}): React.JSX.Element {
  const [fill, setFill] = useState(0);
  const frame = useRef<number | null>(null);
  const startedAt = useRef<number>(0);

  const stop = (): void => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    setFill(0);
  };

  const tick = (onComplete: () => void): void => {
    const progress = Math.min(1, (performance.now() - startedAt.current) / HOLD_MS);
    setFill(progress);
    if (progress >= 1) {
      stop();
      onComplete();
      return;
    }
    frame.current = requestAnimationFrame(() => tick(onComplete));
  };

  useEffect(() => stop, []);

  return (
    <button
      type="button"
      className="hold-btn"
      style={{ "--fill": fill } as React.CSSProperties}
      disabled={props.disabled}
      data-testid="hold-seal"
      onPointerDown={() => {
        if (props.disabled) return;
        startedAt.current = performance.now();
        tick(props.onComplete);
      }}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
    >
      <div className="fill" />
      <span>{fill > 0 ? "keep holding…" : props.label}</span>
    </button>
  );
}

/**
 * Tamper demo: flip one field on a copy of the draft and recompute. The two
 * hashes diverge — that divergence is the whole honesty model of a hash
 * seal. Pure computation; nothing is written.
 */
export function TamperDemo(props: {
  tamperSha: string | null;
  baseSha: string | null;
  onRun: () => void;
}): React.JSX.Element {
  const diverged = props.tamperSha !== null && props.baseSha !== null && props.tamperSha !== props.baseSha;
  return (
    <div className="demo-block" data-testid="tamper-demo">
      <div className="field-row">
        <span className="panel-label">Tamper demo — flip one field, watch the hash move</span>
        <button type="button" onClick={props.onRun} data-testid="tamper-run">
          Flip subject
        </button>
      </div>
      {props.tamperSha !== null && props.baseSha !== null ? (
        <div>
          <div className="demo-hashes">sealed&nbsp;&nbsp; {props.baseSha}</div>
          <div className="demo-hashes">tampered {props.tamperSha}</div>
          <p className="verdict" data-tone={diverged ? "emerald" : "zinc"}>
            {diverged
              ? "One flipped field → a different integrity hash. Verification would report INVALID. That is the tamper-evidence working."
              : "Tampered copy matches the base — that should be impossible for a real act."}
          </p>
        </div>
      ) : (
        <p className="hint">Nothing written by this demo. It only computes both hashes in the browser.</p>
      )}
    </div>
  );
}
