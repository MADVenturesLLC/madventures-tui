// apps/projector-mc/src/lib/room-status-fixture.ts
// Loader for the RoomStatus replay fixture — the only RoomStatus data path
// into the projector in v0. Every scenario is validated through
// parseRoomStatus and pre-rendered through renderRoomStatus, so a record the
// IR would reject produces an intentional load error, never a rendered guess.
// This is a FIXTURE player: it never claims a live Gateway connection.

import {
  parseRoomStatus,
  renderRoomStatus,
  type RoomStatus,
  type RoomStatusView,
} from "./room-status";

export const ROOM_STATUS_FIXTURE_SCHEMA = "mad.roomstatus-fixture/v0";

export interface RoomStatusScenario {
  readonly name: string;
  readonly status: RoomStatus;
  readonly view: RoomStatusView;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Parse + validate the replay fixture, or throw with an operator-actionable message. */
export function loadRoomStatusFixture(raw: unknown): { scenarios: RoomStatusScenario[]; mode: string } {
  if (!isRecord(raw)) throw new Error("room-status fixture is not an object");
  if (raw["schema"] !== ROOM_STATUS_FIXTURE_SCHEMA) {
    throw new Error(`room-status fixture schema is ${JSON.stringify(raw["schema"])} — expected ${ROOM_STATUS_FIXTURE_SCHEMA}`);
  }
  const provenance = raw["provenance"];
  if (!isRecord(provenance) || provenance["mode"] !== "fixture-only") {
    throw new Error("room-status fixture must declare provenance.mode === 'fixture-only' (v0 never claims live)");
  }
  const scenariosRaw = raw["scenarios"];
  if (!Array.isArray(scenariosRaw) || scenariosRaw.length === 0) {
    throw new Error("room-status fixture has no scenarios array");
  }
  const scenarios: RoomStatusScenario[] = scenariosRaw.map((entry, idx) => {
    if (!isRecord(entry) || typeof entry["name"] !== "string") {
      throw new Error(`room-status fixture scenario ${String(idx)} must be { name, status }`);
    }
    const status = parseRoomStatus(entry["status"]);
    if (!status.roomId.startsWith("fixture-")) {
      throw new Error(`room-status fixture scenario ${entry["name"]} has a non-fixture roomId — the replay never claims production rooms`);
    }
    return { name: entry["name"], status, view: renderRoomStatus(status) };
  });
  return { scenarios, mode: "fixture-only" };
}
