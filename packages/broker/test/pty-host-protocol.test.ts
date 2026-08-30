// packages/broker/test/pty-host-protocol.test.ts
// Cross-checks the broker's independent mirror of the private pty-host wire
// format against the host's own codec — the two hand-maintained
// implementations must agree on every command and fact kind.

import { expect, test } from "bun:test";
import * as host from "@madventures/pty-host";
import * as broker from "../src/pty-host-protocol";
import type { HostCommandFrame, HostFactFrame } from "@madventures/pty-host";

const commandFrames: readonly HostCommandFrame[] = [
  {
    kind: "launch",
    path: "/usr/bin/env",
    sha256: "a".repeat(64),
    argv: ["env", "-i"],
    env: { PATH: "/usr/bin", TERM: "xterm-256color" },
    executionId: "exec-001",
  },
  { kind: "input", bytes: new Uint8Array([0x00, 0x01, 0xfe, 0xff]) },
  { kind: "resize", cols: 120, rows: 40 },
  { kind: "terminate" },
];

const factFrames: readonly HostFactFrame[] = [
  { kind: "launched", hostPid: 111, childPid: 222, pgid: 222, executionId: "exec-001" },
  { kind: "ready" },
  { kind: "ack", ofKind: "resize" },
  { kind: "output", bytes: new Uint8Array([0xff, 0x00, 0x7f, 0x80]) },
  { kind: "termination_started" },
  { kind: "drained" },
  { kind: "exited", code: 0, signal: null },
];

test("broker and host codecs agree on every frame kind", () => {
  expect(commandFrames.length + factFrames.length).toBe(11);

  for (const frame of commandFrames) {
    const fromHost = host.decodeCommand(host.encodeCommand(frame));
    const fromBroker = broker.decodeCommand(broker.encodeCommand(frame));
    expect(fromHost?.frame).toEqual(frame);
    expect(fromBroker?.frame).toEqual(frame);

    // Cross-decode: a frame encoded by one module decodes identically on the other.
    expect(broker.decodeCommand(host.encodeCommand(frame))?.frame).toEqual(frame);
    expect(host.decodeCommand(broker.encodeCommand(frame))?.frame).toEqual(frame);

    // The two mirrors must produce byte-identical frames, not just equivalent decodes.
    expect(host.encodeCommand(frame)).toEqual(broker.encodeCommand(frame));
  }

  for (const frame of factFrames) {
    const fromHost = host.decodeFact(host.encodeFact(frame));
    const fromBroker = broker.decodeFact(broker.encodeFact(frame));
    expect(fromHost?.frame).toEqual(frame);
    expect(fromBroker?.frame).toEqual(frame);

    expect(broker.decodeFact(host.encodeFact(frame))?.frame).toEqual(frame);
    expect(host.decodeFact(broker.encodeFact(frame))?.frame).toEqual(frame);

    expect(host.encodeFact(frame)).toEqual(broker.encodeFact(frame));
  }
});

test("broker and host codecs reject a non-absolute launch path (B2 regression)", () => {
  // Architecture review B2: the launch artifact path must be absolute —
  // a bare name would hash one file (cwd-resolved) and execute another
  // (PATH-resolved). Both codec mirrors reject it at decode.
  for (const path of ["probecmd", "bin/probecmd", "../probecmd"]) {
    const frame: HostCommandFrame = {
      kind: "launch",
      path,
      sha256: "a".repeat(64),
      argv: [],
      env: {},
      executionId: "exec-b2",
    };
    expect(() => host.decodeCommand(host.encodeCommand(frame))).toThrow();
    expect(() => broker.decodeCommand(broker.encodeCommand(frame))).toThrow();
  }
  // Absolute paths still decode in both mirrors.
  const good: HostCommandFrame = {
    kind: "launch",
    path: "/bin/sh",
    sha256: "a".repeat(64),
    argv: [],
    env: {},
    executionId: "exec-b2",
  };
  expect(host.decodeCommand(host.encodeCommand(good))?.frame).toEqual(good);
  expect(broker.decodeCommand(broker.encodeCommand(good))?.frame).toEqual(good);
});

test("broker and host codecs reject the same malformed resize dimensions", () => {
  // Both mirrors must fail closed on identical payloads: 0, negatives,
  // fractions, NaN, and infinities are all invalid terminal dimensions.
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
    expect(() => host.decodeCommand(host.encodeCommand(frame))).toThrow();
    expect(() => broker.decodeCommand(broker.encodeCommand(frame))).toThrow();
  }
  // Valid dimensions still round-trip identically on both mirrors.
  const good: HostCommandFrame = { kind: "resize", cols: 120, rows: 40 };
  expect(host.decodeCommand(host.encodeCommand(good))?.frame).toEqual(good);
  expect(broker.decodeCommand(broker.encodeCommand(good))?.frame).toEqual(good);
});
