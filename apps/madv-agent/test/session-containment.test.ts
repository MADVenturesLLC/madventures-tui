// apps/madv-agent/test/session-containment.test.ts
// BITE PROOF (F1): a session store that resolves OUTSIDE the project is
// refused, and a session that does not resolve to its own event file is
// refused. Each assertion below fails when the containment check is removed.

import { describe, expect, test } from "bun:test";
import {
  chmodSync,
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  realpathSync,
  renameSync,
  symlinkSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { openNewSession, openSessionForResume, resolveProjectSessionPaths } from "../src/session";

const scrub = { kept: {}, dropped: ["GH_TOKEN", "OPENAI_API_KEY"] };
const opts = { pid: process.pid, argv: ["madv-agent"] };

function tempDir(prefix: string): string {
  return mkdtempSync(join(tmpdir(), prefix));
}

describe("session-store containment (F1)", () => {
  test("BITE: a .madv-agent/sessions symlink pointing outside the project is refused", () => {
    const project = tempDir("madv-proj-");
    const outside = tempDir("madv-outside-");
    mkdirSync(join(project, ".madv-agent"), { recursive: true });
    symlinkSync(outside, join(project, ".madv-agent", "sessions"));

    expect(() => openNewSession(project, scrub, opts)).toThrow(/resolves outside the project/);
    expect(() => resolveProjectSessionPaths(project)).toThrow(/resolves outside the project/);
  });

  test("a .madv-agent symlink pointing outside the project is refused", () => {
    const project = tempDir("madv-proj-");
    const outside = tempDir("madv-outside-");
    symlinkSync(outside, join(project, ".madv-agent"));

    expect(() => openNewSession(project, scrub, opts)).toThrow(/resolves outside the project/);
  });

  test("a store symlinked to a directory INSIDE the project is accepted", () => {
    const project = tempDir("madv-proj-");
    const inside = join(project, "store");
    mkdirSync(inside, { recursive: true });
    mkdirSync(join(project, ".madv-agent"), { recursive: true });
    symlinkSync(inside, join(project, ".madv-agent", "sessions"));

    const session = openNewSession(project, scrub, opts);
    expect(session.id).toMatch(/^s-\d{8}T\d{6}-[0-9a-f]{6}$/);
    // macOS reports /var as /private/var through realpath, so compare resolved.
    expect(resolveProjectSessionPaths(project).sessions).toBe(realpathSync(inside));
  });

  test("BITE: a session directory that symlinks elsewhere is refused on resume", () => {
    const project = tempDir("madv-proj-");
    const other = tempDir("madv-other-");
    const session = openNewSession(project, scrub, opts);
    const sessionDir = join(project, ".madv-agent", "sessions", session.id);

    // Move the real session aside and point the id at a directory outside.
    mkdirSync(join(other, "elsewhere"), { recursive: true });
    writeFileSync(join(other, "elsewhere", "events.jsonl"), "");
    renameSync(sessionDir, join(other, "moved"));
    symlinkSync(join(other, "elsewhere"), sessionDir);

    expect(() => openSessionForResume(project, session.id)).toThrow(
      /does not resolve to its own event file/,
    );
  });

  test("BITE: a symlinked events.jsonl is refused on resume", () => {
    const project = tempDir("madv-proj-");
    const other = tempDir("madv-other-");
    const session = openNewSession(project, scrub, opts);
    const eventsPath = join(project, ".madv-agent", "sessions", session.id, "events.jsonl");
    const copy = join(other, "events.jsonl");
    copyFileSync(eventsPath, copy);
    unlinkSync(eventsPath);
    symlinkSync(copy, eventsPath);

    expect(() => openSessionForResume(project, session.id)).toThrow(
      /does not resolve to its own event file/,
    );
  });

  test("a genuinely missing session says so, and is not reported as a containment breach", () => {
    const project = tempDir("madv-proj-");
    expect(() => openSessionForResume(project, "s-20260101T000000-abcdef")).toThrow(
      /no such session in this project/,
    );
  });

  test("an unreadable session file is reported as unreadable, not as missing", () => {
    if (typeof process.getuid === "function" && process.getuid() === 0) {
      // root can read anything; the permission case cannot be constructed.
      return;
    }
    const project = tempDir("madv-proj-");
    const session = openNewSession(project, scrub, opts);
    const sessionDir = join(project, ".madv-agent", "sessions", session.id);
    chmodSync(sessionDir, 0o000);
    try {
      expect(() => openSessionForResume(project, session.id)).toThrow(/is not readable \(EACCES\)/);
    } finally {
      chmodSync(sessionDir, 0o755);
    }
  });

  test("traversal-shaped and malformed ids are refused before any path is built", () => {
    const project = tempDir("madv-proj-");
    for (const bad of ["../../etc/passwd", ".", "..", "s-20260101T000000-abcdef/../x", ""]) {
      expect(() => openSessionForResume(project, bad)).toThrow(/is not a session id/);
    }
  });
});
