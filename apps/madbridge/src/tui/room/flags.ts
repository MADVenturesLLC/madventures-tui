// apps/madbridge/src/tui/room/flags.ts
// Room Runtime Phase 1 — shared flag → option mapping for the four frozen
// verbs (join / leave / follow / rooms).
//
// Two explicit, test-facing overrides:
//   --socket <path>   the Gateway IPC path to connect to (default: the
//                     Gateway's fixed documented ipc.sock). An explicit
//                     argument, never an environment variable —
//                     MADV_SOCKET_PATH stays retired (r3 stop 5).
//   --session <path>  the client-local session token file (default:
//                     ~/.madbridge/room-session.json).
//
// Neither override creates a listener, daemon, or named runtime endpoint;
// both are consumer-side connection/storage locations only.

import type { CommandFlags } from "../../commands/types";
import type { RoomClientOptions } from "./client";
import { sessionStorePath } from "./session-store";

export function clientOptionsFrom(flags: CommandFlags): RoomClientOptions {
  const socket = flags["socket"];
  return typeof socket === "string" && socket.length > 0 ? { socketPath: socket } : {};
}

export function sessionPathFrom(flags: CommandFlags): string {
  const session = flags["session"];
  return typeof session === "string" && session.length > 0 ? session : sessionStorePath();
}
