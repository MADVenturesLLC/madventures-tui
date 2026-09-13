import { VERDICT_TONE } from "@mad/single-verdict";

import { MEMORY_TONE } from "../lib/render-model";
import type { VerdictFilter } from "../lib/render-model";

const TONE_VAR: Record<string, string> = {
  emerald: "var(--tone-emerald)",
  amber: "var(--tone-amber)",
  rose: "var(--tone-rose)",
  zinc: "var(--tone-zinc)",
  violet: "var(--tone-violet)",
};

export function toneColor(tone: string): string {
  return TONE_VAR[tone] ?? TONE_VAR["zinc"]!;
}

export function Chip(props: { label: string; tone: string; title?: string }) {
  return (
    <span className="chip" style={{ color: toneColor(props.tone) }} title={props.title}>
      {props.label}
    </span>
  );
}

export function StatusBar(props: {
  mode: "fixture" | "live";
  seal: string;
  generatedAt: string;
  counts: Record<"VALID" | "STALE" | "UNKNOWN" | "INVALIDATED", number>;
  filter: VerdictFilter;
  copied: boolean;
  onHelp: () => void;
}) {
  const { counts } = props;
  const total = counts.VALID + counts.STALE + counts.UNKNOWN + counts.INVALIDATED;
  return (
    <header className="statusbar">
      <span className="mode">{props.mode === "live" ? "Live bind" : "Fixture v0"}</span>
      <span
        className="mono"
        title={
          props.mode === "live"
            ? "current git HEAD the live memory store was evaluated against"
            : "sha256 seal of the sealed memory fixture"
        }
      >
        {props.mode === "live" ? "head" : "seal"} {props.seal}…
      </span>
      <span>
        {String(total)} subjects ·{" "}
        <span style={{ color: toneColor("emerald") }}>{String(counts.VALID)} valid</span> ·{" "}
        <span style={{ color: toneColor("amber") }}>{String(counts.STALE)} stale</span> ·{" "}
        <span style={{ color: toneColor("zinc") }}>{String(counts.UNKNOWN)} unknown</span> ·{" "}
        <span style={{ color: toneColor("rose") }}>{String(counts.INVALIDATED)} invalidated</span>
      </span>
      {props.filter !== "ALL" && <Chip label={`filter: ${props.filter}`} tone={VERDICT_TONE[props.filter]} />}
      <span className="spacer" />
      {props.copied && <span style={{ color: toneColor("emerald") }}>SHA copied</span>}
      <button onClick={props.onHelp} aria-label="Help">? help</button>
    </header>
  );
}

export function MemoryChip(props: { status: keyof typeof MEMORY_TONE; reason: string }) {
  return <Chip label={props.status} tone={MEMORY_TONE[props.status]} title={props.reason} />;
}
