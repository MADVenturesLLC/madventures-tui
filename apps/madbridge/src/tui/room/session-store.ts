// apps/madbridge/src/tui/room/session-store.ts
// Client-local attach session store for the frozen Phase 1 verbs.
//
// Holds ONLY what the Gateway minted for this operator machine: room_id,
// viewer_id, viewer_capability (r4.1 §5 — the projector STORES the
// capability as a local session token; it never picks the identity).
//
// This is client-local state, not a runtime endpoint: no daemon, no socket,
// no named runtime path, no MADV_SOCKET_PATH (r3 §16 stops 4-7). The file
// lives under the operator's home and carries no provider credential, no
// secret, and no occupancy authority — losing it costs a Fresh join, never
// a spoofed Surviving one (a stolen/forged capability is refused Gateway-side
// per AT-R4-35).

import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

export interface RoomSessionRecord {
  readonly room_id: string;
  readonly viewer_id: string;
  readonly viewer_capability: string;
  readonly joined_at: string;
}

export function sessionStorePath(): string {
  return join(homedir(), ".madbridge", "room-session.json");
}

export function readRoomSession(path = sessionStorePath()): RoomSessionRecord | null {
  if (!existsSync(path)) return null;
  try {
    const parsed: unknown = JSON.parse(readFileSync(path, "utf8"));
    if (typeof parsed !== "object" || parsed === null) return null;
    const rec = parsed as Record<string, unknown>;
    if (
      typeof rec["room_id"] !== "string" ||
      typeof rec["viewer_id"] !== "string" ||
      typeof rec["viewer_capability"] !== "string"
    ) {
      return null;
    }
    return {
      room_id: rec["room_id"],
      viewer_id: rec["viewer_id"],
      viewer_capability: rec["viewer_capability"],
      joined_at: typeof rec["joined_at"] === "string" ? rec["joined_at"] : "",
    };
  } catch {
    return null;
  }
}

export function writeRoomSession(record: RoomSessionRecord, path = sessionStorePath()): void {
  mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
  writeFileSync(path, `${JSON.stringify(record, null, 2)}\n`, { mode: 0o600 });
}

export function clearRoomSession(path = sessionStorePath()): void {
  rmSync(path, { force: true });
}
