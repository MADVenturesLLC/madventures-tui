// apps/madv-agent/test/chain-verifiability.test.ts
// Acceptance (d), outside-verifier form: the hash chain of a WRITTEN
// events.jsonl must be recomputable from disk by the DOCUMENTED scheme —
// with an independent implementation in this test, not by importing the
// writer's own hash function and not by comparing a stored tail to itself.
//
// BITE: mutate one byte of one stored event, or re-order two events, and the
// verifier below must fail.

import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { openNewSession } from "../src/session";
import { EventWriter } from "../src/events";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// ── Independent re-implementation of the documented scheme ────────────────
//
// docs/madv-agent/n1-credential-path.md, "The hash chain":
//   hash(line) = sha256-hex( JSON.stringify({payload, prev_hash, seq, ts, type}) )
//   — keys inserted in alphabetical order (payload, prev_hash, seq, ts,
//   type), JSON.stringify's compact separators, no whitespace — and
//   prev_hash of seq 1 is 64 "0" characters.
// This is deliberately NOT the writer's canonicalJson(): it is spelled out
// here so a defect in the writer's serialisation cannot verify itself.

interface StoredEvent {
  seq: number;
  ts: string;
  type: string;
  payload: unknown;
  prev_hash: string;
  hash: string;
}

const GENESIS = "0".repeat(64);

function independentHash(e: {
  seq: number;
  ts: string;
  type: string;
  payload: unknown;
  prev_hash: string;
}): string {
  return createHash("sha256")
    .update(
      JSON.stringify({
        payload: e.payload,
        prev_hash: e.prev_hash,
        seq: e.seq,
        ts: e.ts,
        type: e.type,
      }),
    )
    .digest("hex");
}

function readFromDisk(path: string): StoredEvent[] {
  return readFileSync(path, "utf8")
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => JSON.parse(line) as StoredEvent);
}

/** Verify the chain purely from the stored records. Returns failure reasons. */
function verifyFromDisk(events: StoredEvent[]): string[] {
  const failures: string[] = [];
  let prev = GENESIS;
  for (const [index, e] of events.entries()) {
    if (e.seq !== index + 1) {
      failures.push(`line ${index + 1}: expected seq ${index + 1}, found ${e.seq}`);
    }
    if (e.prev_hash !== prev) {
      failures.push(
        `seq ${e.seq}: prev_hash does not match the previous event's hash`,
      );
    }
    const recomputed = independentHash(e);
    if (recomputed !== e.hash) {
      failures.push(
        `seq ${e.seq}: stored hash does not match the recomputed hash ` +
          `(recomputed ${recomputed.slice(0, 12)}…, stored ${e.hash.slice(0, 12)}…)`,
      );
    }
    prev = e.hash;
  }
  return failures;
}

// ── Tests ─────────────────────────────────────────────────────────────────

function writeFourEventSession(): string {
  const dir = mkdtempSync(join(tmpdir(), "madv-agent-chain-"));
  const opened = openNewSession(dir, { kept: { PATH: "/usr/bin" }, dropped: ["GH_TOKEN"] }, {
    pid: process.pid,
    argv: ["madv-agent"],
  });
  const writer = new EventWriter(opened.writer.filePath);
  // opened.writer already wrote session_start + env_scrub; continue the SAME
  // file via a fresh writer to mirror what the app does across a resume.
  writer.append("user_message", { content: "hello world" });
  writer.append("assistant_message", {
    content: "Hi! streamed reply",
    model: "glm-5.3-flash:cloud",
  });
  return opened.writer.filePath;
}

describe("the hash chain is verifiable from outside (documented scheme)", () => {
  test("a written events.jsonl verifies when every link is recomputed from disk", () => {
    const file = writeFourEventSession();
    const events = readFromDisk(file);
    expect(events.map((e) => e.type)).toEqual([
      "session_start",
      "env_scrub",
      "user_message",
      "assistant_message",
    ]);
    // Independent recomputation of every link — not a stored tail field.
    expect(verifyFromDisk(events)).toEqual([]);
    expect(events[0]!.prev_hash).toBe(GENESIS);
  });

  test("BITE: mutating one byte of one stored event breaks the verifier", () => {
    const file = writeFourEventSession();
    const raw = readFileSync(file, "utf8").split("\n");
    const tampered = JSON.parse(raw[2]!) as { payload: { content: string } };
    // One byte: "hello world" → "hello worle"
    const before = JSON.stringify(tampered.payload);
    tampered.payload.content = tampered.payload.content.replace(/d$/, "e");
    expect(JSON.stringify(tampered.payload)).not.toBe(before);
    raw[2] = JSON.stringify(tampered);
    // Keep the stored hash unchanged — exactly what an edit-after-the-fact
    // looks like to an outside verifier.
    const broken = readFromDiskJoin(raw);
    const failures = verifyFromDisk(broken);
    expect(failures.length).toBeGreaterThan(0);
    expect(failures.some((f) => f.includes("recomputed hash"))).toBe(true);
  });

  test("BITE: re-ordering two stored events breaks the verifier", () => {
    const file = writeFourEventSession();
    const raw = readFileSync(file, "utf8").split("\n");
    // Swap the user and assistant events (lines 3 and 4).
    [raw[2], raw[3]] = [raw[3]!, raw[2]!];
    const reordered = readFromDiskJoin(raw);
    const failures = verifyFromDisk(reordered);
    expect(failures.length).toBeGreaterThan(0);
    // The order violation is caught twice over: seq no longer matches line
    // position, and the prev links no longer chain.
    expect(failures.some((f) => f.includes("expected seq"))).toBe(true);
    expect(failures.some((f) => f.includes("prev_hash does not match"))).toBe(true);
  });
});

/** Reassemble split lines back into the file form and parse them again. */
function readFromDiskJoin(lines: string[]): StoredEvent[] {
  return lines
    .filter((line) => line.trim() !== "")
    .map((line) => JSON.parse(line) as StoredEvent);
}
