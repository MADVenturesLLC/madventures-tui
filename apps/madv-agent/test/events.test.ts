// apps/madv-agent/test/events.test.ts
// BITE PROOF (d): events.jsonl verifies as a hash chain, and --resume
// reproduces the transcript from those events alone.

import { describe, expect, test } from "bun:test";
import {
  EventWriter,
  canonicalJson,
  eventHash,
  isValidSessionId,
  readEvents,
  reconstructTranscript,
  verifyChain,
  GENESIS_HASH,
  listSessions,
  SESSION_ID_PATTERN,
  newSessionId,
} from "../src/events";
import { openNewSession, openSessionForResume } from "../src/session";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

function tempProject(): string {
  return mkdtempSync(join(tmpdir(), "madv-agent-events-"));
}

describe("hash-chained events (design §3)", () => {
  test("each event links to its predecessor and its hash covers its own fields", () => {
    const dir = tempProject();
    const writer = new EventWriter(join(dir, "events.jsonl"));
    writer.append("session_start", { project: dir });
    writer.append("env_scrub", { dropped: ["GH_TOKEN", "OPENAI_API_KEY"] });
    writer.append("user_message", { content: "hello" });
    writer.append("assistant_message", { content: "hi", model: "glm-5.3-flash:cloud" });

    const events = readEvents(writer.filePath);
    expect(events).toHaveLength(4);
    expect(events[0]!.prev_hash).toBe(GENESIS_HASH);
    for (let i = 1; i < events.length; i++) {
      expect(events[i]!.prev_hash).toBe(events[i - 1]!.hash);
    }
    for (const event of events) {
      expect(event.hash).toBe(eventHash(event));
    }
  });

  test("verifyChain accepts an intact chain and rejects a tampered record", () => {
    const dir = tempProject();
    const writer = new EventWriter(join(dir, "events.jsonl"));
    writer.append("session_start", { project: dir });
    writer.append("user_message", { content: "untampered" });

    // Intact: ok.
    expect(verifyChain(readEvents(writer.filePath)).ok).toBe(true);

    // Tamper with a payload byte and rewrite the file: the chain must break.
    const file = writer.filePath;
    const lines = readFileSync(file, "utf8").trimEnd().split("\n");
    const tampered = JSON.parse(lines[1]!) as { payload: { content: string } };
    tampered.payload.content = "tampered";
    lines[1] = canonicalJson(tampered);
    writeFileSync(file, lines.join("\n") + "\n");

    const verdict = verifyChain(readEvents(file));
    expect(verdict.ok).toBe(false);
    expect(verdict.errors.length).toBeGreaterThan(0);
    expect(verdict.errors.some((e) => e.includes("hash mismatch"))).toBe(true);
  });

  test("the transcript is reconstructed from events ALONE", () => {
    const dir = tempProject();
    const writer = new EventWriter(join(dir, "events.jsonl"));
    writer.append("user_message", { content: "first question" });
    writer.append("assistant_message", { content: "first answer", model: "m" });
    writer.append("user_message", { content: "second question" });
    writer.append("assistant_message", { content: "second answer", model: null });

    const transcript = reconstructTranscript(readEvents(writer.filePath));
    expect(transcript.map((m) => [m.role, m.content])).toEqual([
      ["user", "first question"],
      ["assistant", "first answer"],
      ["user", "second question"],
      ["assistant", "second answer"],
    ]);
  });

  test("resume continues the chain and reproduces the same transcript", async () => {
    const dir = tempProject();
    const scrub = { kept: { PATH: "/usr/bin" }, dropped: ["GH_TOKEN"] };
    const opened = openNewSession(dir, scrub, { pid: process.pid, argv: ["madv-agent"] });
    opened.writer.append("user_message", { content: "q1" });
    opened.writer.append("assistant_message", { content: "a1", model: "m" });
    const before = readEvents(opened.writer.filePath);

    // A second EventWriter instance (what --resume does) continues the chain.
    const resumed = openSessionForResume(dir, opened.id);
    expect(resumed.id).toBe(opened.id);
    expect(resumed.preexisting.map((e) => e.seq)).toEqual(before.map((e) => e.seq));
    resumed.writer.append("user_message", { content: "q2" });
    resumed.writer.append("assistant_message", { content: "a2", model: "m" });

    const all = readEvents(opened.writer.filePath);
    expect(all).toHaveLength(6);
    expect(verifyChain(all).ok).toBe(true);
    expect(
      reconstructTranscript(all).map((m) => [m.role, m.content]),
    ).toEqual([
      ["user", "q1"],
      ["assistant", "a1"],
      ["user", "q2"],
      ["assistant", "a2"],
    ]);
  });

  test("resume refuses a session whose chain is broken", () => {
    const dir = tempProject();
    const opened = openNewSession(dir, { kept: {}, dropped: [] }, {
      pid: process.pid,
      argv: ["madv-agent"],
    });
    opened.writer.append("user_message", { content: "q" });
    const lines = readFileSync(opened.writer.filePath, "utf8").trimEnd().split("\n");
    const broken = JSON.parse(lines[1]!) as { payload: { content: string } };
    broken.payload.content = "edited after the fact";
    lines[1] = canonicalJson(broken);
    writeFileSync(opened.writer.filePath, lines.join("\n") + "\n");

    expect(() => openSessionForResume(dir, opened.id)).toThrow(/hash-chain verification/);
  });

  test("listSessions reports each session's event count, tail hash and integrity", () => {
    const dir = tempProject();
    const a = openNewSession(dir, { kept: {}, dropped: [] }, { pid: 1, argv: [] });
    a.writer.append("user_message", { content: "hi" });
    const b = openNewSession(dir, { kept: {}, dropped: [] }, { pid: 1, argv: [] });

    const sessions = listSessions(dir);
    expect(sessions.map((s) => s.id)).toEqual([a.id, b.id].sort());
    const summaryA = sessions.find((s) => s.id === a.id)!;
    expect(summaryA.eventCount).toBe(3); // session_start, env_scrub, user
    expect(summaryA.chainOk).toBe(true);
    const summaryB = sessions.find((s) => s.id === b.id)!;
    expect(summaryB.eventCount).toBe(2);
    expect(summaryB.lastHash).toBe(b.writer.tailHash());
  });

  test("D1 BITE: an empty or truncated events file fails verification and resume", () => {
    const dir = tempProject();
    const opened = openNewSession(dir, { kept: {}, dropped: [] }, { pid: process.pid, argv: [] });
    const file = opened.writer.filePath;

    // Truncate to zero bytes — exactly the state D1 forbade accepting.
    writeFileSync(file, "");
    expect(readEvents(file)).toHaveLength(0);
    const verdict = verifyChain(readEvents(file));
    expect(verdict.ok).toBe(false);
    expect(verdict.errors.some((e) => e.includes("chain is empty"))).toBe(true);

    // Resume must refuse, naming the session AND the file.
    try {
      openSessionForResume(dir, opened.id);
      throw new Error("expected openSessionForResume to throw");
    } catch (err) {
      expect((err as Error).message).toContain(opened.id);
      expect((err as Error).message).toContain(file);
      expect((err as Error).message).toContain("empty event stream");
    }
  });

  test("D6 BITE: session ids come from a crypto source — identical Math.random still yields distinct ids", () => {
    const originalRandom = Math.random;
    Math.random = () => 0.5; // pin the legacy source: a Math.random id would repeat
    try {
      const a = newSessionId();
      const b = newSessionId();
      expect(a).not.toBe(b);
    } finally {
      Math.random = originalRandom;
    }
    expect(SESSION_ID_PATTERN.test(newSessionId())).toBe(true);
  });

  test("D2: session ids that are not session ids are rejected by the pattern", () => {
    for (const bad of [
      "../../etc/passwd",
      "../..",
      "s-20261018T223857-ZZ00aa", // non-hex tail
      "s-20261018T223857-070ca0/extra",
      "",
      ".",
      "s-short",
    ]) {
      expect(isValidSessionId(bad)).toBe(false);
    }
    expect(isValidSessionId("s-20261018T223857-070ca0")).toBe(true);
  });
});
