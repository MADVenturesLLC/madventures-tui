// packages/protocol/src/ids.ts
// ID generation for events and sessions.

export function newEventId(): string {
  return crypto.randomUUID();
}

export function newSessionId(): string {
  return crypto.randomUUID();
}