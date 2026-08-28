// packages/pty-host/src/index.ts
// Deliberate public entry point for the @madventures/pty-host package
// specifier. Exposes only the wire codec (frames) — the private PTY host
// executable (main.ts) and its terminal wrapper (terminal.ts) are NOT part
// of the public surface: they are invoked only by the supervisor process
// through the inherited control channel, never imported as a library.
export type { HostCommandFrame, HostFactFrame } from "./frames";
export { MalformedFrameError, encodeCommand, decodeCommand, encodeFact, decodeFact } from "./frames";
