// packages/pty-host/test/frames.test.ts
// Private framed command/fact codec — fail-closed decode, exact byte round-trip.

import { expect, test } from "bun:test";
import { encodeCommand, decodeCommand, MalformedFrameError } from "../src/frames";
import type { HostCommandFrame } from "../src/frames";

test("an unknown command tag fails closed with MalformedFrameError", () => {
  // Length=1 (tag only), tag=0xfe (never assigned to a command kind).
  const buf = new Uint8Array([0x00, 0x00, 0x00, 0x01, 0xfe]);
  expect(() => decodeCommand(buf)).toThrow(MalformedFrameError);
});

test("a truncated length prefix returns null rather than a partial frame", () => {
  const buf = new Uint8Array([0x00, 0x00, 0x01]);
  expect(decodeCommand(buf)).toBeNull();
});

test("input bytes round-trip exactly, including 0x00 and 0xFF", () => {
  const frame: HostCommandFrame = { kind: "input", bytes: new Uint8Array([0x00, 0xff, 0x01, 0x7f, 0x80, 0xff, 0x00]) };
  const encoded = encodeCommand(frame);
  const decoded = decodeCommand(encoded);
  expect(decoded).not.toBeNull();
  expect(decoded!.consumed).toBe(encoded.byteLength);
  expect(decoded!.frame).toEqual(frame);
});

test("a raw unframed byte stream is rejected", () => {
  // Arbitrary bytes with no framing structure. The leading 4 bytes read as a
  // big-endian length far larger than MAX_FRAME_BYTES, so this must be
  // rejected rather than silently accepted as a valid frame.
  const raw = new TextEncoder().encode("this is not a framed protocol stream at all");
  expect(() => decodeCommand(raw)).toThrow(MalformedFrameError);
});

test("an oversized frame is rejected", () => {
  const buf = new Uint8Array(4);
  new DataView(buf.buffer).setUint32(0, 2 * 1024 * 1024, false); // 2 MiB > 1 MiB cap
  expect(() => decodeCommand(buf)).toThrow(MalformedFrameError);
});

test("resize dimensions must be safe integers greater than zero", () => {
  // isNumber alone accepts 0, negatives, and fractions; the decoder must
  // reject all of them so an invalid dimension never reaches
  // session.terminal.resize.
  for (const bad of [
    { cols: 0, rows: 40 },
    { cols: -1, rows: 40 },
    { cols: 120, rows: 0 },
    { cols: 120, rows: -1 },
    { cols: 0.5, rows: 40 },
    { cols: 120, rows: 0.5 },
    { cols: Number.NaN, rows: 40 },
    { cols: Number.POSITIVE_INFINITY, rows: 40 },
  ]) {
    const frame: HostCommandFrame = { kind: "resize", ...bad };
    expect(() => decodeCommand(encodeCommand(frame))).toThrow(MalformedFrameError);
  }
  // Valid dimensions still round-trip.
  const good: HostCommandFrame = { kind: "resize", cols: 120, rows: 40 };
  const decoded = decodeCommand(encodeCommand(good));
  expect(decoded?.frame).toEqual(good);
});
