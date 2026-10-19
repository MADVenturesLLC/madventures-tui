// apps/madv-agent/src/events.ts
// The session event stream (design §3): .madv-agent/sessions/<id>/events.jsonl
// is THE append-only, hash-chained record. There is no second store: resume
// reconstructs the transcript from these events alone.

import { createHash, randomBytes } from "node:crypto";
import { existsSync, mkdirSync, appendFileSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

export const GENESIS_HASH = "0".repeat(64);

export type SessionEventType =
  | "session_start"
  | "env_scrub"
  | "user_message"
  | "assistant_message"
  | "stream_error";

export interface SessionEvent {
  seq: number;
  ts: string;
  type: SessionEventType;
  payload: unknown;
  prev_hash: string;
  hash: string;
}

/** Deterministic JSON: object keys sorted recursively, no whitespace. */
export function canonicalJson(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) {
    return `[${value.map(canonicalJson).join(",")}]`;
  }
  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([, v]) => v !== undefined)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${canonicalJson(v)}`).join(",")}}`;
}

/** The hash input: exactly the five chain fields, never the hash itself. */
export interface EventHashFields {
  seq: number;
  ts: string;
  type: SessionEventType;
  payload: unknown;
  prev_hash: string;
}

export function eventHash(fields: EventHashFields): string {
  return createHash("sha256")
    .update(
      canonicalJson({
        seq: fields.seq,
        ts: fields.ts,
        type: fields.type,
        payload: fields.payload,
        prev_hash: fields.prev_hash,
      }),
    )
    .digest("hex");
}

export function sessionsDir(projectDir: string): string {
  return join(projectDir, ".madv-agent", "sessions");
}

export function sessionFile(projectDir: string, sessionId: string): string {
  return join(sessionsDir(projectDir), sessionId, "events.jsonl");
}

/**
 * Session ids are generated here and accepted ONLY here: the strict pattern
 * is also the resume-side validation (path traversal refused — see
 * openSessionForResume in session.ts). Cryptographically sound source: the
 * id names a file on disk (CodeQL: no Math.random for names).
 */
export const SESSION_ID_PATTERN = /^s-\d{8}T\d{6}-[0-9a-f]{6}$/;

export function isValidSessionId(id: string): boolean {
  return SESSION_ID_PATTERN.test(id);
}

export function newSessionId(now: Date = new Date()): string {
  const stamp = now.toISOString().replace(/[-:]/g, "").replace(/\..+$/, "");
  // 6 hex chars, cryptographically sourced (D6) — same length/format as the
  // ids already on disk so existing sessions stay resumable.
  const rand = randomBytes(3).toString("hex");
  return `s-${stamp}-${rand}`;
}

/**
 * One writer per session file (the project lock guarantees process-level
 * exclusivity). Each append extends the hash chain.
 */
export class EventWriter {
  readonly filePath: string;
  private lastHash: string = GENESIS_HASH;
  private lastSeq = 0;
  private loaded = false;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  /** Load any existing chain so appends continue it (resume path). */
  loadExisting(): number {
    if (this.loaded) return this.lastSeq;
    if (existsSync(this.filePath)) {
      const events = readEvents(this.filePath);
      const last = events.at(-1);
      if (last) {
        this.lastHash = last.hash;
        this.lastSeq = last.seq;
      }
    }
    this.loaded = true;
    return this.lastSeq;
  }

  append(type: SessionEventType, payload: unknown, now: Date = new Date()): SessionEvent {
    this.loadExisting();
    const fields = {
      seq: this.lastSeq + 1,
      ts: now.toISOString(),
      type,
      payload,
      prev_hash: this.lastHash,
    };
    const event: SessionEvent = { ...fields, hash: eventHash(fields) };
    const parent = join(this.filePath, "..");
    mkdirSync(parent, { recursive: true });
    appendFileSync(this.filePath, `${canonicalJson(event)}\n`, "utf8");
    this.lastHash = event.hash;
    this.lastSeq = event.seq;
    return event;
  }

  tailHash(): string {
    this.loadExisting();
    return this.lastHash;
  }
}

/** Parse a session file into events; throws on malformed JSON lines. */
export function readEvents(filePath: string): SessionEvent[] {
  if (!existsSync(filePath)) return [];
  const text = readFileSync(filePath, "utf8");
  const events: SessionEvent[] = [];
  for (const [i, line] of text.split("\n").entries()) {
    if (line.trim() === "") continue;
    const parsed = JSON.parse(line) as SessionEvent;
    if (typeof parsed.seq !== "number" || typeof parsed.hash !== "string") {
      throw new Error(`${filePath}:${i + 1}: malformed event record`);
    }
    events.push(parsed);
  }
  return events;
}

export interface ChainVerification {
  ok: boolean;
  errors: string[];
}

/** Verify the file's own hash chain: every record recomputed and linked. */
export function verifyChain(events: SessionEvent[]): ChainVerification {
  const errors: string[] = [];
  if (events.length === 0) {
    // A chain of zero events must not verify — an empty or truncated file is
    // not a session (D1).
    errors.push("the chain is empty: zero events is not a verifiable session");
    return { ok: false, errors };
  }
  let prev = GENESIS_HASH;
  for (const event of events) {
    const expected = eventHash(event);
    if (event.prev_hash !== prev) {
      errors.push(`seq ${event.seq}: prev_hash does not match predecessor`);
    }
    if (event.hash !== expected) {
      errors.push(`seq ${event.seq}: hash mismatch (record does not match its own fields)`);
    }
    prev = event.hash;
  }
  return { ok: errors.length === 0, errors };
}

export interface TranscriptMessage {
  role: "user" | "assistant";
  content: string;
  model: string | null;
  seq: number;
}

/** Reconstruct the transcript from events ALONE (design §3). */
export function reconstructTranscript(events: SessionEvent[]): TranscriptMessage[] {
  const transcript: TranscriptMessage[] = [];
  for (const event of events) {
    if (event.type === "user_message") {
      const payload = event.payload as { content?: unknown };
      transcript.push({
        role: "user",
        content: typeof payload.content === "string" ? payload.content : "",
        model: null,
        seq: event.seq,
      });
    } else if (event.type === "assistant_message") {
      const payload = event.payload as { content?: unknown; model?: unknown };
      transcript.push({
        role: "assistant",
        content: typeof payload.content === "string" ? payload.content : "",
        model: typeof payload.model === "string" ? payload.model : null,
        seq: event.seq,
      });
    }
  }
  return transcript;
}

export interface SessionSummary {
  id: string;
  eventCount: number;
  lastHash: string;
  lastTs: string | null;
  chainOk: boolean;
}

/** List this project's sessions (the `--resume`-alone listing). */
export function listSessions(projectDir: string): SessionSummary[] {
  const dir = sessionsDir(projectDir);
  if (!existsSync(dir)) return [];
  const summaries: SessionSummary[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const file = join(dir, entry.name, "events.jsonl");
    if (!existsSync(file)) continue;
    const events = readEvents(file);
    const last = events.at(-1);
    summaries.push({
      id: entry.name,
      eventCount: events.length,
      lastHash: last ? last.hash : GENESIS_HASH,
      lastTs: last ? last.ts : null,
      chainOk: verifyChain(events).ok,
    });
  }
  return summaries.sort((a, b) => (a.id < b.id ? -1 : 1));
}

/** True when the session directory exists in this project. */
export function sessionExists(projectDir: string, sessionId: string): boolean {
  try {
    return statSync(sessionFile(projectDir, sessionId)).isFile();
  } catch {
    return false;
  }
}
