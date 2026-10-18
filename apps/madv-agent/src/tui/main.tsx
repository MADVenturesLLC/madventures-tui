// apps/madv-agent/src/tui/main.tsx
// Real OpenTUI entry point for the madv-agent shell, mirroring the
// apps/madbridge conventions (createCliRenderer + createRoot).
// The caller (cli.ts) has already scrubbed the environment, acquired the
// project lock, and opened/resumed the session before this runs.

import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import type { ReactNode } from "react";
import { App } from "./App";
import type { TranscriptLine } from "./components/Transcript";
import type { TurnResult } from "../turn";

export interface TuiBootstrap {
  projectDirName: string;
  sessionId: string;
  initialLines: TranscriptLine[];
  initialTailHash: string;
  scrubCount: number;
  runTurn: (userText: string, onDelta: (delta: string) => void) => Promise<TurnResult>;
  onExit: () => void;
}

export async function runTui(bootstrap: TuiBootstrap): Promise<void> {
  const renderer = await createCliRenderer();
  const root = createRoot(renderer);
  root.render(<App {...bootstrap} /> as ReactNode);
}
