// packages/protocol/test/room-ipc-v2.test.ts
// Room Runtime Phase 1 — the TUI boundary consumer representation validates
// inbound Gateway facts against the SAME closed sets the canonical owner
// (Build Room packages/gateway-protocol) defines; it re-interprets nothing.

import { test, expect, describe } from "bun:test";
import {
  ROOM_BLOCK_REASONS,
  ROOM_DISCONNECT_REASONS,
  ROOM_EXECUTION_STATES,
  ROOM_FRAME_CONTROL,
  ROOM_FRAME_VT_PATCH,
  ROOM_IPC_VERSION,
  ROOM_OCCUPANCY_STATES,
  ROOM_RECOVERY_KINDS,
  ROOM_VIEWER_STATES,
  validateRoomSnapshotBody,
  validateRoomVtPatch,
} from "../src/room-ipc-v2";

describe("consumer mirrors of the canonical closed sets (r4 Table 9 / §7.15)", () => {
  test("versions and frame types match the frozen mux", () => {
    expect(ROOM_IPC_VERSION).toBe(2);
    expect(ROOM_FRAME_CONTROL).toBe(0x01);
    expect(ROOM_FRAME_VT_PATCH).toBe(0x02);
  });

  test("state axes are exactly the canonical closed values", () => {
    expect([...ROOM_OCCUPANCY_STATES]).toEqual(["ABSENT", "PREPARED", "OCCUPIED", "INTERRUPTED", "CLOSED"]);
    expect([...ROOM_VIEWER_STATES]).toEqual(["NONE", "HELLO", "JOINING", "REPLAYING", "ATTACHED", "DETACHED", "STALE", "DISCONNECTED_BACKPRESSURE"]);
    expect([...ROOM_EXECUTION_STATES]).toEqual(["EMPTY", "LAUNCHING", "RUNNING", "EXITED", "FAILED_CLOSED"]);
    expect([...ROOM_RECOVERY_KINDS]).toEqual(["LIVE_REATTACH", "HISTORY_REPLAY", "NATIVE_RESUME", "RECONSTRUCTION"]);
    expect([...ROOM_BLOCK_REASONS]).toEqual(["NONE", "WAITING_FOUNDER", "CLOCK_UNRELIABLE", "DISK", "DUPLICATE", "PGID_REUSE", "CUSTODY", "CRASH_LOOP", "ADAPTER_HUNG"]);
    expect([...ROOM_DISCONNECT_REASONS]).toEqual(["leave", "viewer_quit", "viewer_backpressure", "frame_too_large", "ipc_version_unsupported", "stale_viewer", "occupancy_closed", "internal_error"]);
  });
});

describe("inbound validation fails closed on drift", () => {
  const good = {
    room_id: "r",
    occupancy: "OCCUPIED",
    block_reason: "NONE",
    input_authority: { kind: "UNOWNED" },
    executions: [{ execution_id: "slot-a", state: "RUNNING", cursors: { ptyOutputSeq: 1, ptyCheckpointSeq: 0, resizeEpoch: 0, durableCommittedSeq: 1 }, history_truncated: false }],
    viewers: [],
    room_seq: 1,
  };

  test("a canonical snapshot validates cleanly", () => {
    expect(validateRoomSnapshotBody(good)).toEqual([]);
  });

  test("a value outside a closed axis is a named defect, not a silently accepted label", () => {
    expect(validateRoomSnapshotBody({ ...good, occupancy: "LIVE" })[0]).toContain("occupancy");
    expect(validateRoomSnapshotBody({ ...good, executions: [{ ...good.executions[0], state: "ATTESTED" }] })[0]).toContain("ATTESTED");
    expect(validateRoomSnapshotBody({ ...good, input_authority: { kind: "OWNED" } })[0]).toContain("input_authority");
  });

  test("VT patch validation requires the canonical shape; raw bytes are not a projector frame", () => {
    expect(validateRoomVtPatch({ execution_id: "slot-a", pty_output_seq: 1, resize_epoch: 0, vt_codec_version: "fixture-vt/1", checkpoint_or_patch: { kind: "patch", text: "x" } })).toEqual([]);
    expect(validateRoomVtPatch({ execution_id: "slot-a", pty_output_seq: 1, bytes: "raw" }).length).toBeGreaterThan(0);
  });
});
