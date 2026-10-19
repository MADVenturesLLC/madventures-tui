// apps/madv-agent/src/session.ts
// Session lifecycle: opening a session writes the session_start event (with
// the environment-scrub event recorded beside it) and nothing else. All state
// lives in events.jsonl.

import {
  EventWriter,
  isValidSessionId,
  newSessionId,
  readEvents,
  sessionFile,
  sessionExists,
  sessionsDir,
  verifyChain,
  type SessionEvent,
} from "./events";
import type { ScrubResult } from "./scrub";
import { realpathSync } from "node:fs";
import { join, dirname } from "node:path";

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
  // D2: the id comes from the command line. Refuse anything that is not a
  // session id BEFORE it is ever joined onto a path.
  if (!isValidSessionId(sessionId)) {
    throw new Error(
      `refused: "${sessionId}" is not a session id (expected s-<timestamp>-<hex>)`,
    );
  }
  const dir = sessionsDir(projectDir);
  const file = sessionFile(projectDir, sessionId);
  // D2, belt and braces: the resolved session file must still live under the
  // resolved sessions directory — a symlink cannot walk the id out.
  try {
    const resolvedFile = realpathSync(file);
    const resolvedDir = realpathSync(dir);
    if (!resolvedFile.startsWith(resolvedDir + "/")) {
      throw new Error(
        `refused: session ${sessionId} resolves outside this project's sessions directory (resolved to ${resolvedFile}, expected under ${resolvedDir})`,
      );
    }
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("refused:")) throw err;
    throw new Error(`no such session in this project: ${sessionId}`);
  }
  if (!sessionExists(projectDir, sessionId)) {
    throw new Error(`no such session in this project: ${sessionId}`);
  }
  const writer = new EventWriter(file);
  writer.loadExisting();
  const events = readEvents(file);
  // D1: an empty or truncated file is not a session — refuse explicitly,
  // naming the session and the file.
  if (events.length === 0) {
    throw new Error(
      `refused: session ${sessionId} has an empty event stream (${file}) — ` +
        `a chain of zero events is not a resumable session`,
    );
  }
  const verdict = verifyFn(events);
  if (!verdict.ok) {
    throw new Error(
      `session ${sessionId} failed hash-chain verification: ${verdict.errors.join("; ")}`,
    );
  }
  return { id: sessionId, writer, preexisting: events };
}
