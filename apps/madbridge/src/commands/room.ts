// apps/madbridge/src/commands/room.ts
// madv-tui room create — the production room-create front-end.
//
// FOUNDER-RULED ADDITION (2026-09-20, Act GLM-20260920-FIRST-LIVE-ROOM-JOIN,
// Option A): the r3 §9 frozen attach family (join/leave/follow/rooms) gains
// one operator verb for the amended IPC v2 CreateRoom control op. The verb
// REQUESTS; the Gateway MINTS the room_id and decides. Creating a room is
// construction, not occupancy — the honesty labels below say so, and the
// fixture surface is never involved.

import { randomUUID } from "node:crypto";
import type { CommandFlags, CommandContext, CommandResult } from "./types";
import { RoomAttachClient, RoomAttachError } from "../tui/room/client";
import { clientOptionsFrom } from "../tui/room/flags";

function fail(ctx: CommandContext, code: string, message: string, exitCode: number): CommandResult {
  if (ctx.json) {
    return { exitCode, stdout: JSON.stringify({ ok: false, error: code, detail: message }), stderr: "" };
  }
  return { exitCode, stdout: "", stderr: `room refused (${code}): ${message}\n` };
}

const USAGE = "usage: madv-tui room create [--json] — the Gateway mints the room_id";

export async function roomCommand(
  flags: CommandFlags,
  positional: readonly string[],
  ctx: CommandContext,
): Promise<CommandResult> {
  const sub = positional[0];
  if (sub !== "create") {
    const detail = sub === undefined ? USAGE : `unknown subcommand '${sub}'; ${USAGE}`;
    return fail(ctx, "unknown_subcommand", detail, 2);
  }

  const client = new RoomAttachClient({}, clientOptionsFrom(flags));
  try {
    await client.connect();
    const created = await client.create(randomUUID());
    const body = {
      ok: true,
      room_id: created.roomId,
      occupancy: created.snapshot.occupancy,
      block_reason: created.snapshot.block_reason,
      executions: created.snapshot.executions.length,
      fixture: false,
      // Honesty: minting a room is construction, never occupancy evidence.
      not_evidence_of: ["occupancy proof", "phase 0 evidence", "activation"],
    };
    if (ctx.json) {
      return { exitCode: 0, stdout: JSON.stringify(body), stderr: "" };
    }
    return {
      exitCode: 0,
      stdout: `created room ${created.roomId} occupancy=${created.snapshot.occupancy} executions=${String(created.snapshot.executions.length)} fixture=false\n`,
      stderr: "",
    };
  } catch (err) {
    if (err instanceof RoomAttachError) {
      return fail(ctx, err.code, err.message, err.code === "gateway_not_running" ? 3 : 1);
    }
    return fail(ctx, "internal_error", err instanceof Error ? err.message : String(err), 1);
  } finally {
    client.destroy();
  }
}
