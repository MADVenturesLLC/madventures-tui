// apps/madv-agent/src/bootstrap.ts
// The TUI's wiring contract and the transcript line type, defined OUTSIDE
// src/tui/ so the CLI can import them without a "./tui/..." module path (the
// architecture gate refuses literal imports of the deleted prototype trees,
// including "./tui/"). Presentation modules under src/tui/ re-export these.

import type { TurnResult } from "./turn";
import type { ApprovalDecision, ApprovalRequest } from "./approval";

export interface TranscriptLine {
  kind: "user" | "assistant" | "system";
  text: string;
}

export interface TuiBootstrap {
  projectDirName: string;
  sessionId: string;
  initialLines: TranscriptLine[];
  initialTailHash: string;
  scrubCount: number;
  /** One turn: streams via onDelta and appends both events. */
  runTurn: (userText: string, onDelta: (delta: string) => void) => Promise<TurnResult>;
  /**
   * N4: the pane's approval gate.
   *
   * The TUI registers a handler on mount; the CLI routes every approval
   * through it. If nothing is registered the call is REFUSED — the pane never
   * auto-approves, and a renderer that dies mid-question leaves a denied
   * request behind rather than a granted one.
   */
  registerApprovalHandler: (
    handler: (req: ApprovalRequest) => Promise<ApprovalDecision>,
  ) => () => void;
  onExit: () => void;
}
