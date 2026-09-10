// apps/madbridge/src/commands/join.ts
// madv-tui join --room <room_id> — Room Runtime Phase 1 frozen attach verb.
//
// Requests attachment to a Gateway room over IPC v2. The verb REQUESTS; the
// Gateway DECIDES: viewer_id and viewer_capability are Gateway-minted
// (r4.1 §5) and merely stored locally. Joining yields no occupancy, no
// runtime authority, and no input authority unless the Gateway grants the
// exclusive lease (r4 §7.6 ExclusiveInput). The TUI never parents a process,
// binds a socket, or fabricates a room when no Gateway answers.

import { randomUUID } from "node:crypto";
import type { CommandFlags, CommandContext, CommandResult } from "./types";
import { RoomAttachClient, RoomAttachError } from "../tui/room/client";
import { readRoomSession, writeRoomSession } from "../tui/room/session-store";
import { clientOptionsFrom, sessionPathFrom } from "../tui/room/flags";

function fail(ctx: CommandContext, code: string, message: string, exitCode: number): CommandResult {
  if (ctx.json) {
    return { exitCode, stdout: JSON.stringify({ ok: false, error: code, detail: message }), stderr: "" };
  }
  return { exitCode, stdout: "", stderr: `join refused (${code}): ${message}\n` };
}

export async function joinCommand(flags: CommandFlags, ctx: CommandContext): Promise<CommandResult> {
  const roomFlag = flags["room"];
  if (typeof roomFlag !== "string" || roomFlag.length === 0) {
    return fail(ctx, "missing_room", "join requires --room <room_id>", 2);
  }
  const requestInput = flags["input"] === true;

  // Surviving join: present the stored Gateway-minted capability for the SAME
  // room (r4.1 §5). A different room always starts Fresh.
  const sessionPath = sessionPathFrom(flags);
  const stored = readRoomSession(sessionPath);
  const capability = stored !== null && stored.room_id === roomFlag ? stored.viewer_capability : undefined;

  const client = new RoomAttachClient({}, clientOptionsFrom(flags));
  try {
    await client.connect();
    const join = await client.join(roomFlag, {
      idempotencyKey: randomUUID(),
      ...(capability !== undefined ? { capability } : {}),
      requestInput,
    });
    writeRoomSession(
      {
        room_id: join.roomId,
        viewer_id: join.viewerId,
        viewer_capability: join.viewerCapability,
        joined_at: new Date().toISOString(),
      },
      sessionPath,
    );
    const body = {
      ok: true,
      room_id: join.roomId,
      viewer_id: join.viewerId,
      occupancy_epoch: join.occupancyEpoch,
      recovery_kind: join.recoveryKind,
      occupancy: join.snapshot.occupancy,
      block_reason: join.snapshot.block_reason,
      input: join.input,
      executions: join.snapshot.executions.map((e) => ({
        execution_id: e.execution_id,
        state: e.state,
        history_truncated: e.history_truncated,
      })),
      // Honesty: this is a projection attachment, never an occupancy proof.
      not_evidence_of: ["occupancy proof", "phase 0 evidence", "activation"],
    };
    if (ctx.json) {
      return { exitCode: 0, stdout: JSON.stringify(body), stderr: "" };
    }
    const lines = [
      `joined room ${join.roomId} as viewer ${join.viewerId}`,
      `occupancy=${join.snapshot.occupancy} block=${join.snapshot.block_reason} recovery=${join.recoveryKind} input=${join.input}`,
    ];
    return { exitCode: 0, stdout: `${lines.join("\n")}\n`, stderr: "" };
  } catch (err) {
    if (err instanceof RoomAttachError) {
      return fail(ctx, err.code, err.message, err.code === "gateway_not_running" ? 3 : 1);
    }
    return fail(ctx, "internal_error", err instanceof Error ? err.message : String(err), 1);
  } finally {
    client.destroy();
  }
}
