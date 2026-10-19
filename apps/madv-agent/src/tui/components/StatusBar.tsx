// apps/madv-agent/src/tui/components/StatusBar.tsx
// The status line (design §2): session · model · project · ledger tail hash.
// The ledger tail hash is the hash of the last event in the session's
// events.jsonl — the event stream IS the ledger view (design §3).

export function StatusBar(props: {
  sessionId: string;
  modelLabel: string;
  project: string;
  tailHash: string;
  scrubCount: number;
}) {
  const tail = props.tailHash === "0".repeat(64) ? "empty" : props.tailHash.slice(0, 12);
  return (
    <box style={{ height: 1, flexDirection: "row", backgroundColor: "#101418" }}>
      <text fg="#8a8f98">
        {` session ${props.sessionId} · model ${props.modelLabel} · project ${props.project} · tail ${tail} · scrubbed ${props.scrubCount} env vars `}
      </text>
    </box>
  );
}
