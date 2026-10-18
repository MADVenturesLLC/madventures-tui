// apps/madv-agent/src/session.ts
// Session lifecycle: opening a session writes the session_start event (with
// the environment-scrub event recorded beside it) and nothing else. All state
// lives in events.jsonl.

import {
  EventWriter,
  newSessionId,
  readEvents,
  sessionFile,
  sessionExists,
  verifyChain,
  type SessionEvent,
} from "./events";
import type { ScrubResult } from "./scrub";

export interface OpenedSession {
  id: string;
  writer: EventWriter;
  /** Events that already existed (resume) — empty for a new session. */
  preexisting: SessionEvent[];
}

/** Open a brand-new session: session_start + env_scrub, then nothing. */
export function openNewSession(
  projectDir: string,
  scrub: ScrubResult,
  opts: { pid: number; argv: string[] },
): OpenedSession {
  const id = newSessionId();
  const writer = new EventWriter(sessionFile(projectDir, id));
  writer.append("session_start", {
    project: projectDir,
    pid: opts.pid,
    argv: opts.argv,
  });
  // Names only. Never values (design §6).
  writer.append("env_scrub", {
    dropped: scrub.dropped,
  });
  return { id, writer, preexisting: [] };
}

/** Resume an existing session: load the chain; refuse a broken one. */
export function openSessionForResume(
  projectDir: string,
  sessionId: string,
  verifyFn: (events: SessionEvent[]) => { ok: boolean; errors: string[] } = verifyChain,
): OpenedSession {
  if (!sessionExists(projectDir, sessionId)) {
    throw new Error(`no such session in this project: ${sessionId}`);
  }
  const writer = new EventWriter(sessionFile(projectDir, sessionId));
  writer.loadExisting();
  const events = readEvents(sessionFile(projectDir, sessionId));
  const verdict = verifyFn(events);
  if (!verdict.ok) {
    throw new Error(
      `session ${sessionId} failed hash-chain verification: ${verdict.errors.join("; ")}`,
    );
  }
  return { id: sessionId, writer, preexisting: events };
}
