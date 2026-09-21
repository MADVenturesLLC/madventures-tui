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

/** Honesty labels: minting a room is construction, never occupancy evidence. */
const NOT_EVIDENCE_OF = ["occupancy proof", "phase 0 evidence", "activation"] as const;

/**
 * Exactly one positional argument, `create`, is accepted. Missing, unknown,
 * or additional positionals are usage errors (exit 2) decided BEFORE any
 * Gateway connection or CreateRoom request (MT-20260920-ROOM-CREATE-90
 * finding 2). Returns null when usage is valid.
 */
export function roomUsageError(positional: readonly string[]): { code: string; detail: string } | null {
  const sub = positional[0];
  if (sub === undefined) return { code: "unknown_subcommand", detail: USAGE };
  if (sub !== "create") return { code: "unknown_subcommand", detail: `unknown subcommand '${sub}'; ${USAGE}` };
  if (positional.length > 1) {
    return { code: "unexpected_argument", detail: `unexpected argument '${positional[1] ?? ""}' after create; ${USAGE}` };
  }
  return null;
}

export async function roomCommand(
  flags: CommandFlags,
  positional: readonly string[],
  ctx: CommandContext,
): Promise<CommandResult> {
  const usage = roomUsageError(positional);
  if (usage !== null) {
    return fail(ctx, usage.code, usage.detail, 2);
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
      // From the VALIDATED acknowledgement, never hardcoded.
      fixture: created.fixture,
      // Honesty: minting a room is construction, never occupancy evidence.
      not_evidence_of: [...NOT_EVIDENCE_OF],
    };
    if (ctx.json) {
      return { exitCode: 0, stdout: JSON.stringify(body), stderr: "" };
    }
    const lines = [
      `created room ${created.roomId} occupancy=${created.snapshot.occupancy} executions=${String(created.snapshot.executions.length)} fixture=${String(created.fixture)}`,
      `not evidence of: ${NOT_EVIDENCE_OF.join(", ")}`,
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
