// apps/madbridge/test/room-verbs.test.ts
// Room Runtime Phase 1 — the four frozen CLI verbs (capability J) and the
// consumer attach client (capabilities A/I boundary), proven against a
// test-local Gateway FAKE that speaks the frozen IPC v2 mux exactly as the
// canonical owner (Build Room packages/gateway-protocol) defines it.
//
// The fake is a TEST FIXTURE, not a daemon: it listens on a temp-dir socket
// created by the test and destroyed after; it exists only to observe what
// the TUI sends and to reply with canonical-shaped facts. The TUI under test
// creates NO listener, NO daemon, NO broker.sock, reads NO MADV_SOCKET_PATH,
// and parents NO process (r3 stops 4-9).
//
// Frozen verbs (r3 §9): join --room <room_id> / leave / follow --json /
// rooms --json. No aliases exist (asserted).
//
// FIXTURE OCCUPANCY ONLY: the fake's room facts are fixture facts; the verbs
// print them as Gateway-provided, never as occupancy proof (asserted via the
// not_evidence_of qualifier on join/rooms output).

import { test, expect, describe, beforeAll, afterAll } from "bun:test";
import { createServer, type Server, type Socket } from "node:net";
import { mkdtempSync, rmSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runCli } from "../src/cli";
import { ROOM_FRAME_CONTROL, ROOM_FRAME_VT_PATCH } from "@madventures/protocol";

// ─── Gateway fake (frozen mux; canonical-shaped answers) ────────────────────

function frame(type: number, body: unknown): Buffer {
  const payload = Buffer.from(JSON.stringify(body), "utf8");
  const out = Buffer.alloc(5 + payload.byteLength);
  out.writeUInt32BE(payload.byteLength, 0);
  out.writeUInt8(type, 4);
  payload.copy(out, 5);
  return out;
}

interface FakeState {
  readonly received: Record<string, unknown>[];
  minted: number;
}

const SNAPSHOT = {
  room_id: "fixture-room",
  occupancy: "OCCUPIED",
  block_reason: "NONE",
  input_authority: { kind: "UNOWNED" },
  executions: [
    { execution_id: "slot-a", state: "RUNNING", cursors: { ptyOutputSeq: 3, ptyCheckpointSeq: 2, resizeEpoch: 0, durableCommittedSeq: 3 }, history_truncated: false },
    { execution_id: "slot-b", state: "RUNNING", cursors: { ptyOutputSeq: 1, ptyCheckpointSeq: 0, resizeEpoch: 0, durableCommittedSeq: 1 }, history_truncated: false },
  ],
  viewers: [],
  room_seq: 7,
};

function startFake(socketPath: string, state: FakeState): Promise<Server> {
  return new Promise((resolve) => {
    const server = createServer((socket: Socket) => {
      let buffered: Buffer = Buffer.alloc(0);
      let hello = false;
      socket.on("data", (chunk: Buffer) => {
        buffered = Buffer.concat([buffered, chunk]);
        for (;;) {
          if (buffered.byteLength < 5) return;
          const length = buffered.readUInt32BE(0);
          if (buffered.byteLength < 5 + length) return;
          const type = buffered.readUInt8(4);
          const body = JSON.parse(buffered.subarray(5, 5 + length).toString("utf8")) as Record<string, unknown>;
          buffered = Buffer.from(buffered.subarray(5 + length));
          state.received.push(body);
          if (type !== ROOM_FRAME_CONTROL) {
            socket.write(frame(ROOM_FRAME_CONTROL, { op: "Nack", reason: "unknown_frame_type" }));
            socket.destroy();
            return;
          }
          const op = body["op"];
          if (!hello) {
            if (op !== "Hello" || body["ipc_version"] !== 2) {
              socket.write(`${JSON.stringify({ error: "ipc_version_unsupported", supported: [1, 2] })}\n`);
              socket.destroy();
              return;
            }
            hello = true;
            socket.write(frame(ROOM_FRAME_CONTROL, { op: "Hello", ok: true, ipc_version: 2, supported: [1, 2], limits: { max_frame_bytes: 262144, viewer_queue_frames: 256 } }));
            continue;
          }
          if (op === "JoinRoom") {
            const surviving = typeof body["viewer_capability"] === "string" && String(body["viewer_capability"]).startsWith("vcap-fake-");
            const n = surviving ? Number(String(body["viewer_capability"]).slice("vcap-fake-".length)) : ++state.minted;
            socket.write(frame(ROOM_FRAME_CONTROL, {
              op: "JoinRoom", ok: true, room_id: body["room_id"],
              viewer_id: `viewer-fake-${n}`, viewer_capability: `vcap-fake-${n}`,
              occupancy_epoch: 1, recovery_kind: "LIVE_REATTACH", snapshot: SNAPSHOT,
              input: body["viewer_caps"] === "read+input" ? "granted" : "unchanged",
            }));
            // Pushed facts after a join: a delta, a VT patch, a Gap, a receipt.
            socket.write(frame(ROOM_FRAME_CONTROL, { op: "RoomDelta", room_seq: 8, facts: { viewers: [{ viewer_id: `viewer-fake-${n}`, attachment: "ATTACHED", caps: "read" }] } }));
            socket.write(frame(ROOM_FRAME_VT_PATCH, { execution_id: "slot-a", pty_output_seq: 4, resize_epoch: 0, vt_codec_version: "fixture-vt/1", checkpoint_or_patch: { kind: "patch", text: "hi" } }));
            socket.write(frame(ROOM_FRAME_CONTROL, { op: "Gap", execution_id: "slot-b", from_seq: 2, to_seq: 3, fillable: false, history_truncated: true }));
            socket.write(frame(ROOM_FRAME_CONTROL, { op: "ReceiptRef", receipt_id: "receipt-1", kind: "occupancy-prepared", rung: "prepared", room_seq: 8, facts: { fixture: true } }));
            continue;
          }
          if (op === "LeaveRoom") {
            socket.write(frame(ROOM_FRAME_CONTROL, { op: "LeaveRoom", ok: true, room_id: body["room_id"], viewer_id: "viewer-fake-1", disconnect: "leave" }));
            socket.write(frame(ROOM_FRAME_CONTROL, { op: "Disconnect", reason: "leave" }));
            socket.destroy();
            continue;
          }
          if (op === "FollowRoom") {
            if (body["target"] === "rooms") {
              socket.write(frame(ROOM_FRAME_CONTROL, { op: "FollowRoom", ok: true, target: "rooms", rooms: [SNAPSHOT] }));
            } else {
              socket.write(frame(ROOM_FRAME_CONTROL, { op: "FollowRoom", ok: true, target: body["target"], viewer_id: null, snapshot: SNAPSHOT }));
            }
            continue;
          }
          socket.write(frame(ROOM_FRAME_CONTROL, { op: "Nack", reason: "unknown_op" }));
        }
      });
      socket.on("error", () => socket.destroy());
    });
    server.listen(socketPath, () => resolve(server));
  });
}

// ─── Harness ────────────────────────────────────────────────────────────────

let dir: string;
let socketPath: string;
let sessionPath: string;
let server: Server;
const state: FakeState = { received: [], minted: 0 };

beforeAll(async () => {
  dir = mkdtempSync(join(tmpdir(), "room-verbs-"));
  socketPath = join(dir, "ipc.sock");
  sessionPath = join(dir, "room-session.json");
  server = await startFake(socketPath, state);
});

afterAll(async () => {
  await new Promise<void>((r) => server.close(() => r()));
  rmSync(dir, { recursive: true, force: true });
});

function cli(args: string[]) {
  return runCli([...args, "--socket", socketPath, "--session", sessionPath], { stdin: "", cwd: process.cwd() });
}

// ─── Proofs ─────────────────────────────────────────────────────────────────

describe("J — frozen verb surface", () => {
  test("exactly the four frozen verbs are dispatchable; no alias exists", async () => {
    for (const verb of ["join", "leave", "follow", "rooms"]) {
      const result = await runCli([verb, "--json", "--socket", join(dir, "nope.sock"), "--session", sessionPath], { stdin: "", cwd: process.cwd() });
      expect(result.stderr).not.toContain("unknown command");
      expect(JSON.stringify(result)).not.toContain("unknown command");
    }
    for (const alias of ["attach", "detach", "watch", "list-rooms", "invite"]) {
      const result = await runCli([alias], { stdin: "", cwd: process.cwd() });
      expect(result.exitCode).toBe(2);
      expect(result.stderr).toContain("unknown command");
    }
  });

  test("join requires --room; without it the verb refuses with exit 2", async () => {
    const result = await cli(["join", "--json"]);
    expect(result.exitCode).toBe(2);
    expect(JSON.parse(result.stdout).error).toBe("missing_room");
  });
});

describe("A/I — versioned attach; no Gateway → honest refusal, no fabricated room", () => {
  test("every verb fails closed (exit 3) when no Gateway is listening, and fabricates nothing", async () => {
    const dead = join(dir, "absent.sock");
    for (const args of [["join", "--room", "x"], ["rooms"], ["follow", "--room", "x"]]) {
      const result = await runCli([...args, "--json", "--socket", dead, "--session", sessionPath], { stdin: "", cwd: process.cwd() });
      expect(result.exitCode).toBe(3);
      const body = JSON.parse(result.stdout);
      expect(body.ok).toBe(false);
      expect(body.error).toBe("gateway_not_running");
      expect(body.rooms).toBeUndefined();
      expect(body.viewer_id).toBeUndefined();
    }
    expect(existsSync(sessionPath)).toBe(false);
  });

  test("the first frame on the wire is Hello{ipc_version:2}; JoinRoom carries an idempotency_key and read caps by default", async () => {
    state.received.length = 0;
    const result = await cli(["join", "--room", "fixture-room", "--json"]);
    expect(result.exitCode).toBe(0);
    expect(state.received[0]).toEqual({ op: "Hello", ipc_version: 2 });
    const joinReq = state.received.find((r) => r["op"] === "JoinRoom")!;
    expect(joinReq["room_id"]).toBe("fixture-room");
    expect(typeof joinReq["idempotency_key"]).toBe("string");
    expect(joinReq["viewer_caps"]).toBe("read");
    expect(joinReq["viewer_capability"]).toBeUndefined();
  });
});

describe("J — join / rooms / follow / leave semantics", () => {
  test("join stores ONLY the Gateway-minted identity and prints canonical axes with the honesty qualifier", async () => {
    const result = await cli(["join", "--room", "fixture-room", "--json"]);
    expect(result.exitCode).toBe(0);
    const body = JSON.parse(result.stdout);
    expect(body.ok).toBe(true);
    expect(body.viewer_id).toMatch(/^viewer-fake-\d+$/);
    expect(body.occupancy).toBe("OCCUPIED");
    expect(body.recovery_kind).toBe("LIVE_REATTACH");
    expect(body.executions.map((e: { execution_id: string }) => e.execution_id)).toEqual(["slot-a", "slot-b"]);
    expect(body.not_evidence_of).toEqual(["occupancy proof", "phase 0 evidence", "activation"]);
    const stored = JSON.parse(readFileSync(sessionPath, "utf8"));
    expect(stored.viewer_id).toBe(body.viewer_id);
    expect(stored.viewer_capability).toMatch(/^vcap-fake-\d+$/);
    expect(Object.keys(stored).sort()).toEqual(["joined_at", "room_id", "viewer_capability", "viewer_id"]);
  });

  test("rejoin presents the stored capability → the Gateway returns the SAME viewer_id (Surviving join)", async () => {
    const first = JSON.parse((await cli(["join", "--room", "fixture-room", "--json"])).stdout);
    state.received.length = 0;
    const second = JSON.parse((await cli(["join", "--room", "fixture-room", "--json"])).stdout);
    const joinReq = state.received.find((r) => r["op"] === "JoinRoom")!;
    expect(typeof joinReq["viewer_capability"]).toBe("string");
    expect(second.viewer_id).toBe(first.viewer_id);
  });

  test("join --input requests the lease; the Gateway's grant is reported, never assumed", async () => {
    state.received.length = 0;
    const result = JSON.parse((await cli(["join", "--room", "fixture-room", "--input", "--json"])).stdout);
    expect(state.received.find((r) => r["op"] === "JoinRoom")!["viewer_caps"]).toBe("read+input");
    expect(result.input).toBe("granted");
  });

  test("rooms --json prints Gateway-provided facts with the fixture qualifier", async () => {
    const result = await cli(["rooms", "--json"]);
    expect(result.exitCode).toBe(0);
    const body = JSON.parse(result.stdout);
    expect(body.ok).toBe(true);
    expect(body.count).toBe(1);
    expect(body.rooms[0].room_id).toBe("fixture-room");
    expect(body.rooms[0].occupancy).toBe("OCCUPIED");
    expect(body.fixture_occupancy_only).toBe(true);
    expect(body.not_evidence_of).toContain("occupancy proof");
  });

  test("follow --json streams pushed facts (delta, VT patch, Gap, receipt) read-only and ends on a stated bound", async () => {
    state.received.length = 0;
    const result = await cli(["follow", "--room", "fixture-room", "--json", "--frames", "4", "--seconds", "3"]);
    expect(result.exitCode).toBe(0);
    const [status, ...rest] = result.stdout.trim().split("\n").map((l) => JSON.parse(l));
    expect(status.ok).toBe(true);
    expect(status.terminated_by).toBe("frame-bound");
    expect(status.frames).toBe(4);
    const ops = rest.map((r: { op: string }) => r.op);
    expect(ops).toEqual(["RoomDelta", "VtPatch", "Gap", "ReceiptRef"]);
    const gap = rest.find((r: { op: string }) => r.op === "Gap");
    expect(gap.history_truncated).toBe(true);
    expect(gap.fillable).toBe(false);
    // follow never asked for input authority.
    expect(state.received.find((r) => r["op"] === "JoinRoom")!["viewer_caps"]).toBe("read");
    expect(state.received.some((r) => r["op"] === "TakeoverInput" || r["op"] === "InputFrame")).toBe(false);
  });

  test("leave sends the stored capability, clears the local session, and reports occupancy untouched", async () => {
    await cli(["join", "--room", "fixture-room", "--json"]);
    state.received.length = 0;
    const result = await cli(["leave", "--json"]);
    expect(result.exitCode).toBe(0);
    const body = JSON.parse(result.stdout);
    expect(body.left).toBe(true);
    expect(body.occupancy).toContain("untouched");
    const leaveReq = state.received.find((r) => r["op"] === "LeaveRoom")!;
    expect(String(leaveReq["viewer_capability"])).toMatch(/^vcap-fake-/);
    expect(typeof leaveReq["viewer_capability"]).toBe("string");
    expect(existsSync(sessionPath)).toBe(false);
  });

  test("leave with no local session is an honest no-op", async () => {
    const result = await cli(["leave", "--json"]);
    expect(result.exitCode).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual({ ok: true, left: false, reason: "no local session" });
  });
});

describe("NEGATIVE CONTROLS — the TUI mints nothing and reads no retired endpoint", () => {
  test("no verb ever sends a viewer_id of its own choosing, an EvidencePromote, or a lease issue", async () => {
    state.received.length = 0;
    await cli(["join", "--room", "fixture-room", "--json"]);
    await cli(["rooms", "--json"]);
    await cli(["follow", "--room", "fixture-room", "--json", "--frames", "1", "--seconds", "2"]);
    await cli(["leave", "--json"]);
    for (const req of state.received) {
      expect(req["viewer_id"]).toBeUndefined();
      expect(["Hello", "JoinRoom", "LeaveRoom", "FollowRoom"]).toContain(String(req["op"]));
    }
  });

  test("MADV_SOCKET_PATH is never consulted", async () => {
    process.env["MADV_SOCKET_PATH"] = join(dir, "poisoned.sock");
    try {
      const result = await runCli(["rooms", "--json", "--socket", join(dir, "absent2.sock"), "--session", sessionPath], { stdin: "", cwd: process.cwd() });
      expect(JSON.parse(result.stdout).error).toBe("gateway_not_running");
      expect(existsSync(join(dir, "poisoned.sock"))).toBe(false);
    } finally {
      delete process.env["MADV_SOCKET_PATH"];
    }
  });
});
