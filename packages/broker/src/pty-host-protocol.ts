// packages/broker/src/pty-host-protocol.ts
// The broker's independent mirror of the private pty-host framed
// command/fact codec (packages/pty-host/src/frames.ts). Private
// infrastructure — not exported from packages/broker/src/index.ts.
//
// Wire format: 4-byte big-endian length, 1-byte kind tag, payload.
// The length counts everything after the length prefix itself: the one-byte
// kind tag plus the payload. `input`/`output` payloads are the raw bytes
// unmodified; every other kind is a deterministic JSON payload.

export type HostCommandFrame =
  | {
      readonly kind: "launch";
      readonly path: string;
      readonly sha256: string;
      readonly argv: readonly string[];
      readonly env: Readonly<Record<string, string>>;
      readonly executionId: string;
    }
  | { readonly kind: "input"; readonly bytes: Uint8Array }
  | { readonly kind: "resize"; readonly cols: number; readonly rows: number }
  | { readonly kind: "terminate" };

export type HostFactFrame =
  | { readonly kind: "launched"; readonly hostPid: number; readonly childPid: number; readonly pgid: number; readonly executionId: string }
  | { readonly kind: "ready" }
  | { readonly kind: "ack"; readonly ofKind: HostCommandFrame["kind"] }
  | { readonly kind: "output"; readonly bytes: Uint8Array }
  | { readonly kind: "termination_started" }
  | { readonly kind: "drained" }
  | { readonly kind: "exited"; readonly code: number | null; readonly signal: string | null };

export class MalformedFrameError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MalformedFrameError";
  }
}

const MAX_FRAME_BYTES = 1024 * 1024;

const COMMAND_TAGS: Record<HostCommandFrame["kind"], number> = {
  launch: 0,
  input: 1,
  resize: 2,
  terminate: 3,
};

const FACT_TAGS: Record<HostFactFrame["kind"], number> = {
  launched: 0,
  ready: 1,
  ack: 2,
  output: 3,
  termination_started: 4,
  drained: 5,
  exited: 6,
};

function tagToKind<K extends string>(tags: Record<K, number>, tag: number): K | null {
  for (const kind in tags) {
    if (tags[kind] === tag) return kind;
  }
  return null;
}

function isString(v: unknown): v is string {
  return typeof v === "string";
}

function isNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every(isString);
}

function isStringRecord(v: unknown): v is Record<string, string> {
  return typeof v === "object" && v !== null && !Array.isArray(v) && Object.values(v).every(isString);
}

function parseJson(payload: Uint8Array): unknown {
  let text: string;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(payload);
  } catch {
    throw new MalformedFrameError("payload is not valid UTF-8");
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new MalformedFrameError("payload is not valid JSON");
  }
}

function encodeJson(value: unknown): Uint8Array {
  return new TextEncoder().encode(JSON.stringify(value));
}

function encodeCommandPayload(f: HostCommandFrame): Uint8Array {
  switch (f.kind) {
    case "launch":
      return encodeJson({ path: f.path, sha256: f.sha256, argv: f.argv, env: f.env, executionId: f.executionId });
    case "input":
      return f.bytes;
    case "resize":
      return encodeJson({ cols: f.cols, rows: f.rows });
    case "terminate":
      return new Uint8Array(0);
  }
}

function decodeCommandPayload(kind: HostCommandFrame["kind"], payload: Uint8Array): HostCommandFrame {
  switch (kind) {
    case "launch": {
      const v = parseJson(payload) as Record<string, unknown>;
      if (
        typeof v !== "object" ||
        v === null ||
        !isString(v.path) ||
        !isString(v.sha256) ||
        !isStringArray(v.argv) ||
        !isStringRecord(v.env) ||
        !isString(v.executionId)
      ) {
        throw new MalformedFrameError("malformed launch payload");
      }
      return { kind: "launch", path: v.path, sha256: v.sha256, argv: v.argv, env: v.env, executionId: v.executionId };
    }
    case "input":
      return { kind: "input", bytes: payload.slice() };
    case "resize": {
      const v = parseJson(payload) as Record<string, unknown>;
      if (typeof v !== "object" || v === null || !isNumber(v.cols) || !isNumber(v.rows)) {
        throw new MalformedFrameError("malformed resize payload");
      }
      return { kind: "resize", cols: v.cols, rows: v.rows };
    }
    case "terminate":
      if (payload.byteLength !== 0) throw new MalformedFrameError("terminate carries no payload");
      return { kind: "terminate" };
  }
}

function encodeFactPayload(f: HostFactFrame): Uint8Array {
  switch (f.kind) {
    case "launched":
      return encodeJson({ hostPid: f.hostPid, childPid: f.childPid, pgid: f.pgid, executionId: f.executionId });
    case "ready":
      return new Uint8Array(0);
    case "ack":
      return encodeJson({ ofKind: f.ofKind });
    case "output":
      return f.bytes;
    case "termination_started":
      return new Uint8Array(0);
    case "drained":
      return new Uint8Array(0);
    case "exited":
      return encodeJson({ code: f.code, signal: f.signal });
  }
}

function decodeFactPayload(kind: HostFactFrame["kind"], payload: Uint8Array): HostFactFrame {
  switch (kind) {
    case "launched": {
      const v = parseJson(payload) as Record<string, unknown>;
      if (typeof v !== "object" || v === null || !isNumber(v.hostPid) || !isNumber(v.childPid) || !isNumber(v.pgid) || !isString(v.executionId)) {
        throw new MalformedFrameError("malformed launched payload");
      }
      return { kind: "launched", hostPid: v.hostPid, childPid: v.childPid, pgid: v.pgid, executionId: v.executionId };
    }
    case "ready":
      if (payload.byteLength !== 0) throw new MalformedFrameError("ready carries no payload");
      return { kind: "ready" };
    case "ack": {
      const v = parseJson(payload) as Record<string, unknown>;
      if (typeof v !== "object" || v === null || !isString(v.ofKind) || !(v.ofKind in COMMAND_TAGS)) {
        throw new MalformedFrameError("malformed ack payload");
      }
      return { kind: "ack", ofKind: v.ofKind as HostCommandFrame["kind"] };
    }
    case "output":
      return { kind: "output", bytes: payload.slice() };
    case "termination_started":
      if (payload.byteLength !== 0) throw new MalformedFrameError("termination_started carries no payload");
      return { kind: "termination_started" };
    case "drained":
      if (payload.byteLength !== 0) throw new MalformedFrameError("drained carries no payload");
      return { kind: "drained" };
    case "exited": {
      const v = parseJson(payload) as Record<string, unknown>;
      if (typeof v !== "object" || v === null || !(isNumber(v.code) || v.code === null) || !(isString(v.signal) || v.signal === null)) {
        throw new MalformedFrameError("malformed exited payload");
      }
      return { kind: "exited", code: v.code as number | null, signal: v.signal as string | null };
    }
  }
}

function encodeFrame(tag: number, payload: Uint8Array): Uint8Array {
  const length = 1 + payload.byteLength;
  if (length > MAX_FRAME_BYTES) throw new MalformedFrameError(`frame exceeds MAX_FRAME_BYTES (${MAX_FRAME_BYTES})`);
  const out = new Uint8Array(4 + length);
  new DataView(out.buffer).setUint32(0, length, false);
  out[4] = tag;
  out.set(payload, 5);
  return out;
}

function decodeFrame(buf: Uint8Array): { readonly tag: number; readonly payload: Uint8Array; readonly consumed: number } | null {
  if (buf.byteLength < 4) return null;
  const length = new DataView(buf.buffer, buf.byteOffset, buf.byteLength).getUint32(0, false);
  if (length < 1) throw new MalformedFrameError("frame length must include at least the kind tag");
  if (length > MAX_FRAME_BYTES) throw new MalformedFrameError(`frame exceeds MAX_FRAME_BYTES (${MAX_FRAME_BYTES})`);
  const totalBytes = 4 + length;
  if (buf.byteLength < totalBytes) return null;
  const tag = buf[4]!;
  const payload = buf.subarray(5, totalBytes);
  return { tag, payload, consumed: totalBytes };
}

export function encodeCommand(f: HostCommandFrame): Uint8Array {
  return encodeFrame(COMMAND_TAGS[f.kind], encodeCommandPayload(f));
}

export function decodeCommand(buf: Uint8Array): { readonly frame: HostCommandFrame; readonly consumed: number } | null {
  const decoded = decodeFrame(buf);
  if (decoded === null) return null;
  const kind = tagToKind(COMMAND_TAGS, decoded.tag);
  if (kind === null) throw new MalformedFrameError(`unknown command tag ${decoded.tag}`);
  return { frame: decodeCommandPayload(kind, decoded.payload), consumed: decoded.consumed };
}

export function encodeFact(f: HostFactFrame): Uint8Array {
  return encodeFrame(FACT_TAGS[f.kind], encodeFactPayload(f));
}

export function decodeFact(buf: Uint8Array): { readonly frame: HostFactFrame; readonly consumed: number } | null {
  const decoded = decodeFrame(buf);
  if (decoded === null) return null;
  const kind = tagToKind(FACT_TAGS, decoded.tag);
  if (kind === null) throw new MalformedFrameError(`unknown fact tag ${decoded.tag}`);
  return { frame: decodeFactPayload(kind, decoded.payload), consumed: decoded.consumed };
}
