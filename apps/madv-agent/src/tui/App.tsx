// apps/madv-agent/src/tui/App.tsx
// The madv-agent v0 shell (N1): transcript above, prompt below, status line.
// React is presentation only: it projects session state and routes keyboard
// input. Authority, hashing, and event writes live outside React.
//
// The environment was scrubbed BEFORE this component renders (cli.ts), the
// lock is held by the caller, and every model call goes to the madmik3 proxy
// on loopback. No provider key exists anywhere in this process.

import { useState, useCallback, useRef, useEffect } from "react";
import { useKeyboard } from "@opentui/react";
import { Transcript, type TranscriptLine } from "./components/Transcript";
import { PromptInput } from "./components/PromptInput";
import { StatusBar } from "./components/StatusBar";
import { ApprovalDialog } from "./components/ApprovalDialog";
import { decideApprovalKey } from "../approval-keys";
import type { ApprovalDecision, ApprovalRequest } from "../approval";
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
  /** N4: hand the pane's approval gate to the caller; returns its revocation. */
  registerApprovalHandler: (
    handler: (req: ApprovalRequest) => Promise<ApprovalDecision>,
  ) => () => void;
  onExit: () => void;
}

export function App(props: AppProps) {
  const [lines, setLines] = useState<TranscriptLine[]>(props.initialLines);
  const [tailHash, setTailHash] = useState(props.initialTailHash);
  const [modelLabel, setModelLabel] = useState("pinned-by-proxy");
  const [streaming, setStreaming] = useState(false);
  const streamTextRef = useRef("");
  const [streamText, setStreamText] = useState<string | null>(null);
  // N4: one question at a time. The resolver is held in a ref so the keyboard
  // route (and the unmount route) can settle it exactly once.
  const [pendingApproval, setPendingApproval] = useState<ApprovalRequest | null>(null);
  const approvalResolverRef = useRef<((d: ApprovalDecision) => void) | null>(null);

  const settle = useCallback((granted: boolean, reason?: string) => {
    const resolve = approvalResolverRef.current;
    if (resolve === null) return;
    approvalResolverRef.current = null;
    setPendingApproval(null);
    resolve({ granted, by: "founder(pane)", ...(granted ? {} : { reason: reason ?? "denied in the pane" }) });
  }, []);

  useEffect(() => {
    const unregister = props.registerApprovalHandler(
      (req) =>
        new Promise<ApprovalDecision>((resolve) => {
          // A second question while one is open denies the older one: an
          // unanswered prompt must never be silently overwritten.
          if (approvalResolverRef.current !== null) {
            approvalResolverRef.current({
              granted: false,
              by: "founder(pane)",
              reason: "superseded by a later approval request",
            });
          }
          approvalResolverRef.current = resolve;
          setPendingApproval(req);
        }),
    );
    return () => {
      // Unregister FIRST: a request arriving after this point must be refused
      // by the CLI, not turned into a promise against an unmounted component
      // (which would hang the turn instead of failing closed).
      unregister();
      // Fail closed: if the pane goes away with a question open, it is denied.
      const resolve = approvalResolverRef.current;
      approvalResolverRef.current = null;
      if (resolve !== null) {
        resolve({
          granted: false,
          by: "founder(pane)",
          reason: "pane closed while a request was open — refused (fails closed)",
        });
      }
    };
  }, [props.registerApprovalHandler]);

  // The pending request is mirrored in a ref so the keyboard route never reads
  // a stale closure.
  const pendingRef = useRef<ApprovalRequest | null>(null);
  pendingRef.current = pendingApproval;

  useKeyboard((key) => {
    if (key.name === "c" && key.ctrl) {
      props.onExit();
      return;
    }
    if (pendingRef.current === null) return;
    const decision = decideApprovalKey(key.name);
    if (decision === "grant") settle(true);
    else if (decision === "deny") settle(false, "denied in the pane");
    // "ignore": no key other than y/n/escape can resolve the gate.
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
      {pendingApproval === null ? null : <ApprovalDialog request={pendingApproval} />}
      <PromptInput onSubmit={handleSend} disabled={streaming || pendingApproval !== null} />
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
