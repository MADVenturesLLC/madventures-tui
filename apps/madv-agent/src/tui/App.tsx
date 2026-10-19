// apps/madv-agent/src/tui/App.tsx
// The madv-agent v0 shell (N1): transcript above, prompt below, status line.
// React is presentation only: it projects session state and routes keyboard
// input. Authority, hashing, and event writes live outside React.
//
// The environment was scrubbed BEFORE this component renders (cli.ts), the
// lock is held by the caller, and every model call goes to the madmik3 proxy
// on loopback. No provider key exists anywhere in this process.

import { useState, useCallback, useRef } from "react";
import { useKeyboard } from "@opentui/react";
import { Transcript, type TranscriptLine } from "./components/Transcript";
import { PromptInput } from "./components/PromptInput";
import { StatusBar } from "./components/StatusBar";
import type { TurnResult } from "../turn";
import { ProxyRefusedError } from "../proxy-error";

export interface AppProps {
  projectDirName: string;
  sessionId: string;
  initialLines: TranscriptLine[];
  initialTailHash: string;
  scrubCount: number;
  /** One turn: streams via onDelta and appends both events. */
  runTurn: (userText: string, onDelta: (delta: string) => void) => Promise<TurnResult>;
  onExit: () => void;
}

export function App(props: AppProps) {
  const [lines, setLines] = useState<TranscriptLine[]>(props.initialLines);
  const [tailHash, setTailHash] = useState(props.initialTailHash);
  const [modelLabel, setModelLabel] = useState("pinned-by-proxy");
  const [streaming, setStreaming] = useState(false);
  const streamTextRef = useRef("");
  const [streamText, setStreamText] = useState<string | null>(null);

  useKeyboard((key) => {
    if (key.name === "c" && key.ctrl) {
      props.onExit();
    }
  });

  const handleSend = useCallback(
    (value: string) => {
      if (streaming) return;
      const trimmed = value.trim();
      setLines((prev) => [...prev, { kind: "user", text: trimmed }]);
      setStreaming(true);
      streamTextRef.current = "";
      setStreamText("");

      props
        .runTurn(trimmed, (delta) => {
          // Live: each delta extends the assistant line as it arrives.
          streamTextRef.current += delta;
          setStreamText(streamTextRef.current);
        })
        .then((result) => {
          setModelLabel(result.model ?? "pinned-by-proxy");
          setTailHash(result.assistantEvent.hash);
          setLines((prev) => [
            ...prev,
            { kind: "assistant", text: result.content },
          ]);
          setStreamText(null);
        })
        .catch((err: unknown) => {
          setStreamText(null);
          if (err instanceof ProxyRefusedError) {
            setLines((prev) => [...prev, { kind: "system", text: `REFUSED: ${err.message}` }]);
          } else {
            setLines((prev) => [
              ...prev,
              { kind: "system", text: `ERROR: ${err instanceof Error ? err.message : String(err)}` },
            ]);
          }
        })
        .finally(() => {
          setStreaming(false);
        });
    },
    [props, streaming],
  );

  return (
    <box style={{ flexGrow: 1, flexDirection: "column" }}>
      <Transcript lines={lines} />
      {streamText !== null && (
        <box style={{ height: 2, flexDirection: "column" }}>
          <text fg="#e6e6e6">{`assistant › ${streamText}`}</text>
        </box>
      )}
      <PromptInput onSubmit={handleSend} disabled={streaming} />
      <StatusBar
        sessionId={props.sessionId}
        modelLabel={modelLabel}
        project={props.projectDirName}
        tailHash={tailHash}
        scrubCount={props.scrubCount}
      />
    </box>
  );
}
