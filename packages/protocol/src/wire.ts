// packages/protocol/src/wire.ts
// Wire protocol for socket communication between broker and clients.
// Messages are newline-delimited JSON.

import type { BridgeEventV1 } from "./events";
import type { TaskEnvelopeV1 } from "./task-envelope";

export type WireMessage =
  | { kind: "subscribe"; executionId: string; credentialPath: string }
  | { kind: "event"; event: BridgeEventV1 }
  | { kind: "snapshot"; task: TaskEnvelopeV1; events: BridgeEventV1[] }
  | { kind: "error"; code: string; detail: string };

export function encodeWire(msg: WireMessage): string {
  return JSON.stringify(msg) + "\n";
}

export function decodeWire(data: string): WireMessage | null {
  const trimmed = data.trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed) as WireMessage;
  } catch {
    return null;
  }
}