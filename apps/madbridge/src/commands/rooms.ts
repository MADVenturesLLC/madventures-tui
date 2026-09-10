// apps/madbridge/src/commands/rooms.ts
// madv-tui rooms --json — Room Runtime Phase 1 frozen read verb.
//
// Reads Gateway-provided room facts (r4 §7.15: rooms "reads Gateway-provided
// facts"). One-shot: connect, Hello, FollowRoom{target:"rooms"}, print, done.
// The TUI projects canonical state exactly as the Gateway stated it — no
// derived-label upgrades, no occupancy inference, no fixture-to-live
// promotion. When no Gateway answers, the verb says so and fabricates no
// room list.

import type { CommandFlags, CommandContext, CommandResult } from "./types";
import { RoomAttachClient, RoomAttachError } from "../tui/room/client";
import { readRoomSession } from "../tui/room/session-store";
import { clientOptionsFrom, sessionPathFrom } from "../tui/room/flags";

export async function roomsCommand(flags: CommandFlags, ctx: CommandContext): Promise<CommandResult> {
  const client = new RoomAttachClient({}, clientOptionsFrom(flags));
  try {
    await client.connect();
    const stored = readRoomSession(sessionPathFrom(flags));
    const ack = await client.follow("rooms", stored?.viewer_capability);
    const rooms = Array.isArray(ack["rooms"]) ? (ack["rooms"] as unknown[]) : [];
    const body = {
      ok: true,
      // Gateway-provided facts only; the TUI adds no derived authority.
      rooms,
      count: rooms.length,
      fixture_occupancy_only: true,
      not_evidence_of: ["occupancy proof", "phase 0 evidence", "activation"],
    };
    if (ctx.json) {
      return { exitCode: 0, stdout: JSON.stringify(body), stderr: "" };
    }
    if (rooms.length === 0) {
      return { exitCode: 0, stdout: "no rooms known to the Gateway\n", stderr: "" };
    }
    const lines = rooms.map((room) => {
      const rec = room as Record<string, unknown>;
      return `${String(rec["room_id"])} occupancy=${String(rec["occupancy"])} block=${String(rec["block_reason"])} seq=${String(rec["room_seq"])}`;
    });
    return { exitCode: 0, stdout: `${lines.join("\n")}\n`, stderr: "" };
  } catch (err) {
    if (err instanceof RoomAttachError) {
      const exitCode = err.code === "gateway_not_running" ? 3 : 1;
      return ctx.json
        ? { exitCode, stdout: JSON.stringify({ ok: false, error: err.code, detail: err.message }), stderr: "" }
        : { exitCode, stdout: "", stderr: `rooms refused (${err.code}): ${err.message}\n` };
    }
    return ctx.json
      ? { exitCode: 1, stdout: JSON.stringify({ ok: false, error: "internal_error", detail: err instanceof Error ? err.message : String(err) }), stderr: "" }
      : { exitCode: 1, stdout: "", stderr: `rooms error: ${err instanceof Error ? err.message : String(err)}\n` };
  } finally {
    client.destroy();
  }
}
