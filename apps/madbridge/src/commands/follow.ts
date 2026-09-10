// apps/madbridge/src/commands/follow.ts
// madv-tui follow --json — Room Runtime Phase 1 frozen observe verb.
//
// r4 §7.15: follow "observes projection streams without input authority".
// The viewer joins READ-ONLY (never requests the input lease), then streams
// Gateway-pushed facts — RoomDelta, VT patches, Gap, ReceiptRef, Disconnect —
// as newline-delimited JSON. The TUI projects; it never mints, never infers
// authoritative state from raw bytes (the wire is VT patches, not raw PTY —
// r4.1 §3), and never treats a fixture fact as live occupancy.
//
// Termination is bounded and honest: the stream ends on a Gateway Disconnect,
// after `--frames <n>` pushed frames, or after `--seconds <n>`. It does NOT
// hang forever, and reaching a bound is reported as such (not as a clean
// occupancy end).

import { randomUUID } from "node:crypto";
import type { CommandFlags, CommandContext, CommandResult } from "./types";
import { RoomAttachClient, RoomAttachError, type RoomClientEvents } from "../tui/room/client";
import { readRoomSession } from "../tui/room/session-store";
import { clientOptionsFrom, sessionPathFrom } from "../tui/room/flags";

function asNumber(flag: string | boolean | undefined, fallback: number): number {
  return typeof flag === "string" && flag.length > 0 && Number.isFinite(Number(flag)) ? Number(flag) : fallback;
}

export async function followCommand(flags: CommandFlags, ctx: CommandContext): Promise<CommandResult> {
  const roomFlag = typeof flags["room"] === "string" ? (flags["room"] as string) : undefined;
  const stored = readRoomSession(sessionPathFrom(flags));
  const roomId = roomFlag ?? stored?.room_id;
  if (roomId === undefined) {
    const msg = "follow requires --room <room_id> or a prior `madv-tui join`";
    return ctx.json
      ? { exitCode: 2, stdout: JSON.stringify({ ok: false, error: "missing_room", detail: msg }), stderr: "" }
      : { exitCode: 2, stdout: "", stderr: `${msg}\n` };
  }
  const maxFrames = asNumber(flags["frames"], 64);
  const maxSeconds = asNumber(flags["seconds"], 10);

  const lines: string[] = [];
  let disconnectReason: string | null = null;
  let frameCount = 0;
  let done: (() => void) | null = null;
  const finished = new Promise<void>((resolve) => {
    done = resolve;
  });

  const events: RoomClientEvents = {
    onControl: (body) => {
      lines.push(JSON.stringify(body));
      if (++frameCount >= maxFrames) done?.();
    },
    onPatch: (patch) => {
      lines.push(JSON.stringify({ op: "VtPatch", ...patch }));
      if (++frameCount >= maxFrames) done?.();
    },
    onGap: (gap) => {
      lines.push(JSON.stringify(gap));
      if (++frameCount >= maxFrames) done?.();
    },
    onReceipt: (receipt) => {
      lines.push(JSON.stringify(receipt));
      if (++frameCount >= maxFrames) done?.();
    },
    onDisconnect: (reason) => {
      disconnectReason = reason;
      lines.push(JSON.stringify({ op: "Disconnect", reason }));
      done?.();
    },
    onProtocolError: (detail) => {
      lines.push(JSON.stringify({ op: "ProtocolError", detail }));
    },
  };

  const client = new RoomAttachClient(events, clientOptionsFrom(flags));
  const timer = setTimeout(() => done?.(), maxSeconds * 1000);
  try {
    await client.connect();
    // Read-only observe join; never requests the input lease.
    await client.join(roomId, { idempotencyKey: randomUUID(), requestInput: false });
    await finished;
  } catch (err) {
    clearTimeout(timer);
    if (err instanceof RoomAttachError) {
      const exitCode = err.code === "gateway_not_running" ? 3 : 1;
      return ctx.json
        ? { exitCode, stdout: JSON.stringify({ ok: false, error: err.code, detail: err.message, frames: lines }), stderr: "" }
        : { exitCode, stdout: "", stderr: `follow refused (${err.code}): ${err.message}\n` };
    }
    return ctx.json
      ? { exitCode: 1, stdout: JSON.stringify({ ok: false, error: "internal_error", detail: err instanceof Error ? err.message : String(err) }), stderr: "" }
      : { exitCode: 1, stdout: "", stderr: `follow error: ${err instanceof Error ? err.message : String(err)}\n` };
  } finally {
    clearTimeout(timer);
    client.destroy();
  }

  const terminated = disconnectReason !== null ? `disconnect:${disconnectReason}` : frameCount >= maxFrames ? "frame-bound" : "time-bound";
  if (ctx.json) {
    // Each line is already JSON; emit as an NDJSON stream preceded by a
    // one-line status object so the bound that ended it is stated honestly.
    return { exitCode: 0, stdout: `${JSON.stringify({ ok: true, room_id: roomId, terminated_by: terminated, frames: frameCount })}\n${lines.join("\n")}${lines.length > 0 ? "\n" : ""}`, stderr: "" };
  }
  return { exitCode: 0, stdout: `${lines.join("\n")}${lines.length > 0 ? "\n" : ""}`, stderr: `follow ended (${terminated})\n` };
}
