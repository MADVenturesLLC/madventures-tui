// apps/madv-agent/src/session.ts
// Session lifecycle: opening a session writes the session_start event (with
// the environment-scrub event recorded beside it) and nothing else. All state
// lives in events.jsonl.
//
// Containment rule (N1, F1): the session store must resolve INSIDE the project
// directory. A symlinked `.madv-agent` or `.madv-agent/sessions` that points
// outside the project is refused — a session stream that lives outside the
// project is indistinguishable from no session stream, and the tool allow-list
// added in N3 assumes the store sits under the project root. A symlink that
// stays inside the project root is accepted.

import {
  EventWriter,
  isValidSessionId,
  newSessionId,
  readEvents,
  sessionFile,
  sessionsDir,
  verifyChain,
  type SessionEvent,
} from "./events";
import type { ScrubResult } from "./scrub";
import { realpathSync } from "node:fs";
import { basename, dirname, join, sep } from "node:path";

const REFUSED = "refused:";

export interface OpenedSession {
  id: string;
  writer: EventWriter;
  /** Events that already existed (resume) — empty for a new session. */
  preexisting: SessionEvent[];
}

/** `child` is `parent` itself or lives underneath it (separator-aware). */
function isInside(child: string, parent: string): boolean {
  const root = parent.endsWith(sep) ? parent : parent + sep;
  return child === parent || child.startsWith(root);
}

/**
 * Resolve a path whose tail may not exist yet, by resolving its longest
 * existing prefix and re-appending the missing segments. This is what lets a
 * not-yet-created sessions directory still be checked against the project root.
 */
function resolveAllowingMissing(target: string): string {
  let probe = target;
  const trailing: string[] = [];
  for (;;) {
    try {
      const base = realpathSync(probe);
      return trailing.length === 0 ? base : join(base, ...trailing.slice().reverse());
    } catch (err) {
      const code = (err as NodeJS.ErrnoException).code;
      if (code !== "ENOENT") throw err;
      const parent = dirname(probe);
      if (parent === probe) throw err;
      trailing.push(basename(probe));
      probe = parent;
    }
  }
}

/**
 * Resolve the project root and the session store, and refuse a store that
 * leaves the project. Exported so callers can check without opening anything.
 */
export function resolveProjectSessionPaths(projectDir: string): {
  project: string;
  sessions: string;
} {
  const project = realpathSync(projectDir);
  const sessions = resolveAllowingMissing(sessionsDir(projectDir));
  if (!isInside(sessions, project)) {
    throw new Error(
      `${REFUSED} the session store resolves outside the project ` +
        `(sessions → ${sessions}, project → ${project}) — a session stream that lives ` +
        `outside the project is not evidence about this project`,
    );
  }
  return { project, sessions };
}

/** Open a brand-new session: session_start + env_scrub, then nothing. */
export function openNewSession(
  projectDir: string,
  scrub: ScrubResult,
  opts: { pid: number; argv: string[] },
): OpenedSession {
  // Refuse a store that escapes the project before anything is written.
  resolveProjectSessionPaths(projectDir);
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
      `${REFUSED} "${sessionId}" is not a session id (expected s-<timestamp>-<hex>)`,
    );
  }

  // F1(a): the store itself must resolve inside the project.
  const { sessions } = resolveProjectSessionPaths(projectDir);

  // F1(b): the session must resolve to ITS OWN event file — exactly that path.
  // A symlinked session directory, or a symlinked events.jsonl, resolves
  // somewhere else and is refused rather than followed.
  const expected = join(sessions, sessionId, "events.jsonl");
  let resolved: string;
  try {
    resolved = realpathSync(expected);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "EACCES" || code === "EPERM") {
      throw new Error(
        `${REFUSED} session ${sessionId} is not readable (${code}) at ${expected} — ` +
          `check permissions on the session store`,
      );
    }
    if (code === "ENOENT") {
      throw new Error(`no such session in this project: ${sessionId}`);
    }
    throw err;
  }
  if (resolved !== expected) {
    throw new Error(
      `${REFUSED} session ${sessionId} does not resolve to its own event file ` +
        `(resolved to ${resolved}, expected ${expected}) — a symlink cannot point a ` +
        `session at another file`,
    );
  }

  const writer = new EventWriter(expected);
  writer.loadExisting();

  let events: SessionEvent[];
  try {
    events = readEvents(expected);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "EACCES" || code === "EPERM") {
      throw new Error(
        `${REFUSED} session ${sessionId} is not readable (${code}) at ${expected} — ` +
          `check permissions on the session store`,
      );
    }
    throw err;
  }

  // D1: an empty or truncated file is not a session — refuse explicitly,
  // naming the session and the file.
  if (events.length === 0) {
    throw new Error(
      `${REFUSED} session ${sessionId} has an empty event stream (${expected}) — ` +
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
