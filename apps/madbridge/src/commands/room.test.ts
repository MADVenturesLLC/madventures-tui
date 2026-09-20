// apps/madbridge/src/commands/room.test.ts
// `madv-tui room create` — wire-level proof against a fake Gateway speaking
// the frozen IPC v2 mux on a temp unix socket (no real daemon involved; the
// production client only ever CONNECTS, and so does this test's client half).

import { describe, expect, test, beforeAll, afterAll } from "bun:test";
import { createServer, type Socket } from "node:net";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { encodeControlFrame, decodeFrames } from "../tui/room/client";
import { roomCommand } from "./room";

const MINTED = "room-test-0001";
let dir: string;
let socketPath: string;
const seenCreates: Record<string, unknown>[] = [];

const server = createServer((socket: Socket) => {
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
        socket.write(encodeControlFrame({
          op: "CreateRoom", ok: true, room_id: MINTED, fixture: false, created_via: "CreateRoom",
          snapshot: {
            room_id: MINTED, occupancy: "PREPARED", block_reason: "NONE",
            input_authority: { kind: "UNOWNED" }, executions: [], viewers: [], room_seq: 1,
          },
        }));
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

const ctx = { stdin: "", cwd: process.cwd(), json: true };

describe("madv-tui room create (2026-09-20 Founder amendment)", () => {
  test("prints the Gateway-minted room_id with fixture=false and zero executions", async () => {
    const result = await roomCommand({ socket: socketPath }, ["create"], ctx);
    expect(result.exitCode).toBe(0);
    const body = JSON.parse(result.stdout) as Record<string, unknown>;
    expect(body["ok"]).toBe(true);
    expect(body["room_id"]).toBe(MINTED);
    expect(body["occupancy"]).toBe("PREPARED");
    expect(body["executions"]).toBe(0);
    expect(body["fixture"]).toBe(false);
    expect(seenCreates.length).toBe(1);
    expect(typeof seenCreates[0]!["idempotency_key"]).toBe("string");
  });

  test("unknown or missing subcommand is a usage error (exit 2)", async () => {
    expect((await roomCommand({}, ["destroy"], ctx)).exitCode).toBe(2);
    expect((await roomCommand({}, [], ctx)).exitCode).toBe(2);
  });

  test("no Gateway listening fails closed as gateway_not_running (exit 3)", async () => {
    const result = await roomCommand({ socket: join(dir, "absent.sock") }, ["create"], ctx);
    expect(result.exitCode).toBe(3);
    const body = JSON.parse(result.stdout) as Record<string, unknown>;
    expect(body["error"]).toBe("gateway_not_running");
  });
});
