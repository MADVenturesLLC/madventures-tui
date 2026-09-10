// apps/madbridge/src/commands/leave.ts
// madv-tui leave — Room Runtime Phase 1 frozen detach verb.
//
// Detaches THIS viewer only. r4 §7.15 distinctions: `leave` ≠
// `occupancy_closed` — the room stays occupied, executions keep running,
// receipts keep appending. The local session token is cleared; the
// Gateway-minted viewer becomes DETACHED server-side.

import { randomUUID } from "node:crypto";
import type { CommandFlags, CommandContext, CommandResult } from "./types";
import { RoomAttachClient, RoomAttachError } from "../tui/room/client";
import { clearRoomSession, readRoomSession } from "../tui/room/session-store";
import { clientOptionsFrom, sessionPathFrom } from "../tui/room/flags";

function fail(ctx: CommandContext, code: string, message: string, exitCode: number): CommandResult {
  if (ctx.json) {
    return { exitCode, stdout: JSON.stringify({ ok: false, error: code, detail: message }), stderr: "" };
  }
  return { exitCode, stdout: "", stderr: `leave refused (${code}): ${message}\n` };
}

export async function leaveCommand(flags: CommandFlags, ctx: CommandContext): Promise<CommandResult> {
  const sessionPath = sessionPathFrom(flags);
  const stored = readRoomSession(sessionPath);
  if (stored === null) {
    // Nothing to detach: honest no-op, never a fabricated success story.
    if (ctx.json) {
      return { exitCode: 0, stdout: JSON.stringify({ ok: true, left: false, reason: "no local session" }), stderr: "" };
    }
    return { exitCode: 0, stdout: "no local room session to leave\n", stderr: "" };
  }
  const client = new RoomAttachClient({}, clientOptionsFrom(flags));
  try {
    await client.connect();
    await client.leave(stored.room_id, randomUUID(), stored.viewer_capability);
    clearRoomSession(sessionPath);
    if (ctx.json) {
      return {
        exitCode: 0,
        stdout: JSON.stringify({ ok: true, left: true, room_id: stored.room_id, viewer_id: stored.viewer_id, occupancy: "untouched — leave detaches the viewer only" }),
        stderr: "",
      };
    }
    return { exitCode: 0, stdout: `left room ${stored.room_id} as viewer ${stored.viewer_id} (occupancy untouched)\n`, stderr: "" };
  } catch (err) {
    if (err instanceof RoomAttachError && err.code === "gateway_not_running") {
      // The Gateway is gone; the local token is useless. Clear it and report
      // honestly — this is NOT a leave acknowledgement from the Gateway.
      clearRoomSession(sessionPath);
      if (ctx.json) {
        return { exitCode: 3, stdout: JSON.stringify({ ok: false, error: "gateway_not_running", local_session_cleared: true }), stderr: "" };
      }
      return { exitCode: 3, stdout: "", stderr: "Gateway not running — local session cleared; the Gateway never saw this leave\n" };
    }
    if (err instanceof RoomAttachError) {
      return fail(ctx, err.code, err.message, 1);
    }
    return fail(ctx, "internal_error", err instanceof Error ? err.message : String(err), 1);
  } finally {
    client.destroy();
  }
}
