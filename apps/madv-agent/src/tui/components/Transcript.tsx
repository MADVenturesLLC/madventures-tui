// apps/madv-agent/src/tui/components/Transcript.tsx
// The transcript pane: the session so far, reconstructed from the event
// stream (never from a side store). Presentation only.
// TranscriptLine lives in src/bootstrap.ts (outside src/tui/) and is
// re-exported here for presentation callers.

import type { TranscriptLine } from "../../bootstrap";

export type { TranscriptLine };

const KIND_PREFIX: Record<TranscriptLine["kind"], string> = {
  user: "you › ",
  assistant: "assistant › ",
  system: "·· ",
};

export function renderLine(line: TranscriptLine): string {
  return `${KIND_PREFIX[line.kind]}${line.text}`;
}

export function Transcript(props: { lines: TranscriptLine[] }) {
  return (
    <box style={{ flexGrow: 1, flexDirection: "column", paddingBottom: 1 }}>
      {props.lines.map((line, i) => (
        <text key={i} fg={line.kind === "user" ? "#7fd4ff" : line.kind === "system" ? "#8a8f98" : "#e6e6e6"}>
          {renderLine(line)}
        </text>
      ))}
    </box>
  );
}
