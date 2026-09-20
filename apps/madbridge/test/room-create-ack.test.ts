// apps/madbridge/test/room-create-ack.test.ts
// MT-20260920-ROOM-CREATE-90 finding 1 — pure consumer validation of the
// CreateRoom success acknowledgement. No sockets, no Gateway: each required
// fact is checked in isolation so a malformed success can never become a
// fabricated room_id.

import { describe, expect, test } from "bun:test";
import { validateCreateRoomAck, isCreateRoomRefusal } from "../src/tui/room/client";

const MINTED = "room-ack-0001";

function snapshot(roomId: string = MINTED): Record<string, unknown> {
  return {
    room_id: roomId,
    occupancy: "PREPARED",
    block_reason: "NONE",
    input_authority: { kind: "UNOWNED" },
    executions: [],
    viewers: [],
    room_seq: 1,
  };
}

function validAck(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return { op: "CreateRoom", ok: true, room_id: MINTED, fixture: false, created_via: "CreateRoom", snapshot: snapshot(), ...overrides };
}

function without(ack: Record<string, unknown>, key: string): Record<string, unknown> {
  const copy = { ...ack };
  delete copy[key];
  return copy;
}

describe("validateCreateRoomAck", () => {
  test("a complete, consistent acknowledgement has no defects", () => {
    expect(validateCreateRoomAck(validAck())).toEqual([]);
  });

  test("missing, empty, and non-string room_id are each a defect (never coerced)", () => {
    expect(validateCreateRoomAck(without(validAck(), "room_id"))).toEqual(["room_id is not a string"]);
    expect(validateCreateRoomAck(validAck({ room_id: "" }))).toEqual(["room_id is empty"]);
    expect(validateCreateRoomAck(validAck({ room_id: 42 }))).toEqual(["room_id is not a string"]);
    expect(validateCreateRoomAck(validAck({ room_id: null }))).toEqual(["room_id is not a string"]);
  });

  test("snapshot naming a different room is a defect", () => {
    expect(validateCreateRoomAck(validAck({ room_id: "room-other" }))).toEqual([
      'snapshot.room_id "room-ack-0001" does not match room_id "room-other"',
    ]);
  });

  test("missing or incorrect fixture label is a defect", () => {
    expect(validateCreateRoomAck(without(validAck(), "fixture"))).toEqual(["fixture is null, expected false"]);
    expect(validateCreateRoomAck(validAck({ fixture: true }))).toEqual(["fixture is true, expected false"]);
    expect(validateCreateRoomAck(validAck({ fixture: "false" }))).toEqual(['fixture is "false", expected false']);
  });

  test("missing or incorrect created_via is a defect", () => {
    expect(validateCreateRoomAck(without(validAck(), "created_via"))).toEqual(['created_via is null, expected "CreateRoom"']);
    expect(validateCreateRoomAck(validAck({ created_via: "JoinRoom" }))).toEqual(['created_via is "JoinRoom", expected "CreateRoom"']);
  });

  test("an unrelated successful acknowledgement is a defect, not a success", () => {
    const joinAck = { op: "JoinRoom", ok: true, room_id: MINTED, viewer_id: "viewer-1", viewer_capability: "vcap-1", occupancy_epoch: 1, recovery_kind: "LIVE_REATTACH", snapshot: snapshot(), input: "unchanged" };
    const defects = validateCreateRoomAck(joinAck);
    expect(defects).toContain('op is "JoinRoom", expected "CreateRoom"');
    expect(defects).toContain("fixture is null, expected false");
    expect(defects).toContain('created_via is null, expected "CreateRoom"');
  });

  test("ok !== true is a defect even when every other field is present", () => {
    expect(validateCreateRoomAck(validAck({ ok: false }))).toEqual(["ok is not true"]);
    expect(validateCreateRoomAck(without(validAck(), "ok"))).toEqual(["ok is not true"]);
  });

  test("an invalid snapshot is reported through the existing consumer validation", () => {
    const defects = validateCreateRoomAck(validAck({ snapshot: { room_id: MINTED } }));
    expect(defects.length).toBeGreaterThan(0);
    expect(defects.every((d) => d.startsWith("snapshot: "))).toBe(true);
    expect(validateCreateRoomAck(without(validAck(), "snapshot"))[0]).toStartWith("snapshot: ");
  });

  test("defects accumulate: a fully malformed success lists every problem", () => {
    const defects = validateCreateRoomAck({ op: "CreateRoom", ok: true });
    expect(defects).toContain("room_id is not a string");
    expect(defects).toContain("fixture is null, expected false");
    expect(defects).toContain('created_via is null, expected "CreateRoom"');
    expect(defects.some((d) => d.startsWith("snapshot: "))).toBe(true);
  });
});

describe("isCreateRoomRefusal", () => {
  test("a CreateRoom refusal or a Nack is a refusal; a success or an unrelated answer is not", () => {
    expect(isCreateRoomRefusal({ op: "CreateRoom", ok: false, reason: "create_refused_by_policy" })).toBe(true);
    expect(isCreateRoomRefusal({ op: "Nack", reason: "unknown_op" })).toBe(true);
    expect(isCreateRoomRefusal(validAck())).toBe(false);
    expect(isCreateRoomRefusal({ op: "JoinRoom", ok: false, reason: "join_refused" })).toBe(false);
    expect(isCreateRoomRefusal({ op: "JoinRoom", ok: true })).toBe(false);
  });
});
