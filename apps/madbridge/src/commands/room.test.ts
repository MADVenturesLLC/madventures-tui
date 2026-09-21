// apps/madbridge/src/commands/room.test.ts
// `madv-tui room create` — wire-level proof against a fake Gateway speaking
// the frozen IPC v2 mux on a temp unix socket (no real daemon involved; the
// production client only ever CONNECTS, and so does this test's client half).
//
// MT-20260920-ROOM-CREATE-90 corrections covered here:
//   1. the CreateRoom acknowledgement is validated end to end (malformed
//      successes fail closed as protocol_defect; refusals keep their reason);
//   2. usage errors are decided before any connection (the fake counts
//      connections and CreateRoom requests);
//   3. JSON and human-readable output both carry the not_evidence_of labels.

import { describe, expect, test, beforeAll, afterAll, beforeEach } from "bun:test";
import { createServer, type Socket } from "node:net";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { encodeControlFrame, decodeFrames } from "../tui/room/client";
import { roomCommand, roomUsageError } from "./room";
import { runCli } from "../cli";

const MINTED = "room-test-0001";
let dir: string;
let socketPath: string;
const seenCreates: Record<string, unknown>[] = [];
let connections = 0;

function snapshot(roomId: string = MINTED): Record<string, unknown> {
  return { room_id: roomId, occupancy: "PREPARED", block_reason: "NONE", input_authority: { kind: "UNOWNED" }, executions: [], viewers: [], room_seq: 1 };
}

function validAck(): Record<string, unknown> {
  return { op: "CreateRoom", ok: true, room_id: MINTED, fixture: false, created_via: "CreateRoom", snapshot: snapshot() };
}

/** The fake's answer to CreateRoom; tests override it per scenario. */
let createAnswer: () => Record<string, unknown> = validAck;

const server = createServer((socket: Socket) => {
  connections += 1;
  // Explicit `Buffer` (not the Buffer<ArrayBuffer> inferred from alloc) so
  // concat-derived rests assign cleanly under the repo's TS typings.
  let buffered: Buffer = Buffer.alloc(0);
  socket.on("data", (chunk: Buffer) => {
    buffered = Buffer.concat([buffered, chunk]);
    const step = decodeFrames(buffered);
    buffered = step.rest;
    for (const frame of step.frames) {
      const body = JSON.parse(frame.payload.toString("utf8")) as Record<string, unknown>;
      if (body["op"] === "Hello") {
        socket.write(encodeControlFrame({
          op: "Hello", ok: true, ipc_version: 2, supported: [1, 2],
          limits: { max_frame_bytes: 262144, viewer_queue_frames: 256 },
        }));
        continue;
      }
      if (body["op"] === "CreateRoom") {
        seenCreates.push(body);
        socket.write(encodeControlFrame(createAnswer()));
      }
    }
  });
});

beforeAll(async () => {
  dir = mkdtempSync(join(tmpdir(), "madv-room-create-"));
  socketPath = join(dir, "ipc.sock");
  await new Promise<void>((resolve) => server.listen(socketPath, resolve));
});

afterAll(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
  rmSync(dir, { recursive: true, force: true });
});

beforeEach(() => {
  createAnswer = validAck;
  seenCreates.length = 0;
  connections = 0;
});

const ctx = { stdin: "", cwd: process.cwd(), json: true };
const textCtx = { stdin: "", cwd: process.cwd(), json: false };

async function createWith(answer: Record<string, unknown>): Promise<{ exitCode: number; body: Record<string, unknown> }> {
  createAnswer = () => answer;
  const result = await roomCommand({ socket: socketPath }, ["create"], ctx);
  return { exitCode: result.exitCode, body: JSON.parse(result.stdout) as Record<string, unknown> };
}

function withoutKey(ack: Record<string, unknown>, key: string): Record<string, unknown> {
  const copy = { ...ack };
  delete copy[key];
  return copy;
}

describe("madv-tui room create (2026-09-20 Founder amendment)", () => {
  test("prints the Gateway-minted room_id with the validated fixture=false and zero executions", async () => {
    const result = await roomCommand({ socket: socketPath }, ["create"], ctx);
    expect(result.exitCode).toBe(0);
    const body = JSON.parse(result.stdout) as Record<string, unknown>;
    expect(body["ok"]).toBe(true);
    expect(body["room_id"]).toBe(MINTED);
    expect(body["occupancy"]).toBe("PREPARED");
    expect(body["executions"]).toBe(0);
    expect(body["fixture"]).toBe(false);
    expect(body["not_evidence_of"]).toEqual(["occupancy proof", "phase 0 evidence", "activation"]);
    expect(seenCreates.length).toBe(1);
    expect(typeof seenCreates[0]!["idempotency_key"]).toBe("string");
    expect(connections).toBe(1);
  });

  test("human-readable output names the room and every not_evidence_of meaning", async () => {
    const result = await roomCommand({ socket: socketPath }, ["create"], textCtx);
    expect(result.exitCode).toBe(0);
    expect(result.stderr).toBe("");
    expect(result.stdout).toBe(
      `created room ${MINTED} occupancy=PREPARED executions=0 fixture=false\n` +
        "not evidence of: occupancy proof, phase 0 evidence, activation\n",
    );
  });

  test("no Gateway listening fails closed as gateway_not_running (exit 3)", async () => {
    const result = await roomCommand({ socket: join(dir, "absent.sock") }, ["create"], ctx);
    expect(result.exitCode).toBe(3);
    const body = JSON.parse(result.stdout) as Record<string, unknown>;
    expect(body["error"]).toBe("gateway_not_running");
  });
});

describe("finding 1 — malformed success acknowledgements fail closed as protocol_defect", () => {
  const cases: ReadonlyArray<readonly [string, Record<string, unknown>, string]> = [
    ["missing room_id", withoutKey(validAck(), "room_id"), "room_id is not a string"],
    ["empty room_id", { ...validAck(), room_id: "" }, "room_id is empty"],
    ["non-string room_id", { ...validAck(), room_id: 7 }, "room_id is not a string"],
    ["snapshot room mismatch", { ...validAck(), room_id: "room-other" }, "does not match room_id"],
    ["missing fixture", withoutKey(validAck(), "fixture"), "fixture is null, expected false"],
    ["fixture true", { ...validAck(), fixture: true }, "fixture is true, expected false"],
    ["missing created_via", withoutKey(validAck(), "created_via"), 'created_via is null, expected "CreateRoom"'],
    ["wrong created_via", { ...validAck(), created_via: "JoinRoom" }, 'created_via is "JoinRoom", expected "CreateRoom"'],
    ["wrong acknowledgement op (successful JoinRoom)", { op: "JoinRoom", ok: true, room_id: MINTED, viewer_id: "viewer-1", viewer_capability: "vcap-1", occupancy_epoch: 1, recovery_kind: "LIVE_REATTACH", snapshot: snapshot(), input: "unchanged" }, 'op is "JoinRoom", expected "CreateRoom"'],
    ["unrelated non-success answer", { op: "JoinRoom", ok: false, reason: "join_refused" }, 'op is "JoinRoom", expected "CreateRoom"'],
    ["invalid snapshot", { ...validAck(), snapshot: { room_id: MINTED } }, "snapshot: "],
  ];
  for (const [name, answer, expectedDefect] of cases) {
    test(name, async () => {
      const { exitCode, body } = await createWith(answer);
      expect(exitCode).toBe(1);
      expect(body["ok"]).toBe(false);
      expect(body["error"]).toBe("protocol_defect");
      expect(String(body["detail"])).toContain(expectedDefect);
      expect(body["room_id"]).toBeUndefined();
      expect(JSON.stringify(body)).not.toContain('"room_id":"undefined"');
    });
  }
});

describe("finding 1 — valid Gateway refusals keep their reason", () => {
  test("a CreateRoom refusal surfaces the Gateway's reason code (exit 1)", async () => {
    const { exitCode, body } = await createWith({ op: "CreateRoom", ok: false, reason: "create_refused_by_policy", detail: "room budget exhausted" });
    expect(exitCode).toBe(1);
    expect(body["error"]).toBe("create_refused_by_policy");
    expect(String(body["detail"])).toContain("CreateRoom refused");
  });

  test("a Nack surfaces its reason code (exit 1)", async () => {
    const { exitCode, body } = await createWith({ op: "Nack", reason: "unknown_op" });
    expect(exitCode).toBe(1);
    expect(body["error"]).toBe("unknown_op");
  });
});

describe("finding 2 — usage errors are decided before any connection", () => {
  test("roomUsageError accepts exactly one positional, create", () => {
    expect(roomUsageError(["create"])).toBeNull();
    expect(roomUsageError([])?.code).toBe("unknown_subcommand");
    expect(roomUsageError(["destroy"])?.code).toBe("unknown_subcommand");
    expect(roomUsageError(["create", "extra"])?.code).toBe("unexpected_argument");
    expect(roomUsageError(["create", "destroy"])?.detail).toContain("unexpected argument 'destroy'");
  });

  test("missing, unknown, and extra positionals through runCli exit 2 with no connection and no CreateRoom", async () => {
    const invocations: string[][] = [
      ["room"],
      ["room", "destroy"],
      ["room", "create", "extra"],
      ["room", "create", "destroy"],
      ["room", "create", "create"],
    ];
    for (const args of invocations) {
      const result = await runCli([...args, "--socket", socketPath, "--json"], { stdin: "", cwd: process.cwd() });
      expect(result.exitCode).toBe(2);
      const body = JSON.parse(result.stdout) as Record<string, unknown>;
      expect(body["ok"]).toBe(false);
      expect(["unknown_subcommand", "unexpected_argument"]).toContain(String(body["error"]));
      expect(String(body["detail"])).toContain("usage: madv-tui room create");
    }
    expect(connections).toBe(0);
    expect(seenCreates.length).toBe(0);
  });

  test("human-readable usage errors go to stderr with exit 2 and no connection", async () => {
    const result = await runCli(["room", "create", "extra", "--socket", socketPath], { stdin: "", cwd: process.cwd() });
    expect(result.exitCode).toBe(2);
    expect(result.stdout).toBe("");
    expect(result.stderr).toContain("unexpected_argument");
    expect(connections).toBe(0);
  });

  test("valid usage through runCli connects exactly once and sends exactly one CreateRoom", async () => {
    const result = await runCli(["room", "create", "--socket", socketPath, "--json"], { stdin: "", cwd: process.cwd() });
    expect(result.exitCode).toBe(0);
    expect((JSON.parse(result.stdout) as Record<string, unknown>)["room_id"]).toBe(MINTED);
    expect(connections).toBe(1);
    expect(seenCreates.length).toBe(1);
  });
});
