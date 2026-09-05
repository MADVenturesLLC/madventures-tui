// packages/room-runtime-worker/src/worker.ts
//
// BOUNDED PREREQUISITE-C REMEDIATION WORKER (FDR-C C2).
//
// This file is the bounded C2 Worker entrypoint authorized by the
// Founder-confirmed R4 changed-path manifest (2026-09-04) under the
// Prerequisite C remediation commission. It is a NEW bounded C2 surface;
// it is NOT referenced by any production entrypoint (no broker,
// madbridge, or CLI wiring), and it authorizes no Phase 1 functionality.
//
// Architecture (FDR-C C2 — COHESIVE SOCKETLESS SUPERVISED BUN
// BROKER/LEDGER WORKER):
//
//   - Direct subordinate Bun child of the Node 22 Gateway.
//   - NOT a daemon; cannot restart itself; owns no Founder, occupancy,
//     policy, dispatch, PTY/session, or restart authority.
//   - Socketless, per the Founder transport clarification (SHA
//     6a5dd5aeee056deb18c4ea49912565b9fd5d5063402f166dce2e2adbf8ed0f43):
//     "socketless" means NO ADDRESSABLE, LISTENING, PERSISTENT, OR
//     INDEPENDENTLY CONNECTABLE BROKER ENDPOINT. Transport is the
//     Gateway's child_process.spawn stdio channels, whose Unix/macOS
//     implementation is unnamed AF_UNIX / SOCK_STREAM socketpair
//     descriptors created internally by Node/libuv (the endpoints are
//     created connected to each other; they are unnamed — no filesystem
//     path, no bind(), no listen()/accept(), no TCP, not independently
//     addressable by pathname/host/port). This file never calls
//     socketpair(), never binds anything, and never creates a listener.
//     No broker.sock, no filesystem Unix socket, no Node 'ipc' channel.
//   - WORKER CREDENTIAL ACCESS: NONE. This process reads no provider
//     credential or Founder secret from argv (there are no argv
//     payloads), environment (only PREREQC_WORKER_* variables below),
//     IPC frames, logs, or persistence.
//   - Parent-death discipline: the Gateway is the SOLE owner of the
//     parent-side descriptors of the control/request channel (child
//     fd 3). When the Gateway dies those descriptors close; this worker
//     observes read() == 0 (EOF) on fd 3 and exits immediately. This is
//     an OS descriptor property, not a convention; there is no heartbeat
//     substitute.
//   - The Gateway-minted `generation` value carried in the handshake is
//     an OPAQUE CORRELATION VALUE only. This worker echoes it in every
//     response; it never uses it to determine occupancy, lease
//     eligibility, Founder authority, or which generation is
//     governance-authoritative. All fencing/authority decisions belong
//     to the Gateway.
//
// Capability (bounded broker/ledger execution, NOT governance ownership):
//
//   - Real durable ledger persistence through the EXISTING
//     packages/ledger `Ledger` class, unmodified, on the current
//     bun:sqlite implementation (FDR-C §10: CURRENT IMPLEMENTATION, not
//     permanent doctrine; commission §5.4).
//   - Real broker interrupt semantics through the EXISTING
//     packages/broker/src/reconciliation.ts::interruptSession seam and
//     its packages/broker/src/session-machine.ts::transitionSession
//     dependency, unmodified. The wider broker entry graph
//     (packages/broker/src/index.ts) is deliberately NOT imported: it
//     pulls credentials, PTY, and socket surfaces that the C2 boundary
//     prohibits.
//
// Channel contract (see packages/worker-supervisor/src/ipc-contract.md
// in founder-os-build-room for the Gateway-side half):
//
//   fd 3  Gateway -> Worker  control + request frames (sole writer: Gateway)
//   fd 4  Worker -> Gateway  response frames
//   fd 5  Worker -> Gateway  diagnostic lines (JSON, scrubbed; never payloads)
//
// Framing: 4-byte big-endian unsigned length prefix + UTF-8 JSON payload.
// A decode failure is unrecoverable: the worker emits a transport error
// frame (best-effort) and exits fail-closed (exit code 2).

import { read as fsRead, writeSync } from "node:fs";
import { Ledger } from "@madventures/ledger";
import { parseBridgeEvent } from "@madventures/protocol";
import type { BridgeEventV1 } from "@madventures/protocol";
import { interruptSession } from "../../broker/src/reconciliation";
import type {
  InterruptInput,
  InterruptReason,
} from "../../broker/src/reconciliation";
import type { SessionState } from "../../broker/src/session-machine";

// ---------------------------------------------------------------------------
// Bounded environment contract (no credentials, by construction)
// ---------------------------------------------------------------------------

const FD_CONTROL = 3; // Gateway -> Worker: control + request frames
const FD_RESPONSE = 4; // Worker -> Gateway: response frames
const FD_DIAG = 5; // Worker -> Gateway: scrubbed diagnostic lines

const MAX_FRAME_BYTES = 1024 * 1024; // 1 MiB frame guard (fail closed beyond)

const WORKER_EXIT_CODES = {
  controlEof: 0, // sole writer of fd 3 is gone (parent death) or graceful exit
  transportBroken: 2, // unrecoverable framing/decode failure
  startupInvalid: 3, // missing/invalid bounded environment contract
  controlReadError: 4, // OS error reading the control channel
} as const;

const dbPath = process.env["PREREQC_WORKER_DB_PATH"];
if (typeof dbPath !== "string" || dbPath.length === 0) {
  // Fail closed at startup; nothing to log through — argv/env carry no
  // secrets and this message contains none.
  process.exit(WORKER_EXIT_CODES.startupInvalid);
}

// ---------------------------------------------------------------------------
// Diagnostics (fd 5) — scrubbed by construction: operation name and error
// identity only. Never environment values, never argv, never frame payloads.
// ---------------------------------------------------------------------------

function diag(message: string): void {
  try {
    writeSync(FD_DIAG, `${JSON.stringify({ worker: "prereq-c-c2", message })}\n`);
  } catch {
    // Diagnostic loss is not a ledger event; fail silently here. The
    // Gateway observes the real outcome through response/exit channels.
  }
}

// ---------------------------------------------------------------------------
// Framing
// ---------------------------------------------------------------------------

function frame(payload: unknown): Buffer {
  const body = Buffer.from(JSON.stringify(payload), "utf8");
  const out = Buffer.alloc(4 + body.byteLength);
  out.writeUInt32BE(body.byteLength, 0);
  body.copy(out, 4);
  return out;
}

function respond(payload: Record<string, unknown>): void {
  // Copilot T4 correction: a response-channel (fd 4) write failure must
  // never escape as an uncontrolled exception/crash. Response-channel loss
  // is fail-closed: when the response cannot be delivered, no success can
  // be inferred by anyone, so the worker emits a scrubbed diagnostic and
  // exits deterministically under the EXISTING transport-broken
  // classification (exit code 2). No retry/restart authority is created
  // here — termination is the only deterministic outcome, and the Gateway
  // remains the sole observer/reaper.
  try {
    writeSync(FD_RESPONSE, frame(payload));
  } catch {
    diag("transport_broken: response channel write failed; exiting fail-closed");
    try {
      ledger.close();
    } catch {
      // best effort on the fail-closed exit path
    }
    process.exit(WORKER_EXIT_CODES.transportBroken);
  }
}

type RequestFrame = {
  readonly id: number;
  readonly op: string;
  readonly generation?: string;
  readonly params?: Record<string, unknown>;
};

// ---------------------------------------------------------------------------
// Real capability bindings (existing implementations, unmodified)
// ---------------------------------------------------------------------------

// Real durable ledger on the current bun:sqlite implementation.
const ledger = new Ledger(dbPath);

// Gateway-minted opaque correlation value; set by the `hello` handshake.
let generation: string | null = null;

const INTERRUPT_REASONS: ReadonlySet<string> = new Set([
  "cli_exit",
  "adapter_disconnect",
  "broker_restart",
  "broken_chain",
]);

const SESSION_KINDS: ReadonlySet<string> = new Set([
  "starting",
  "active",
  "paused",
  "interrupted",
  "reconciling",
  "closing",
  "closed",
]);

function failClosed(id: number | null, code: string, message: string): void {
  respond({
    ok: false,
    id,
    generation,
    error: { code, message },
  });
}

function handleRequest(req: RequestFrame): void {
  const id = req.id;
  const params = req.params ?? {};

  switch (req.op) {
    case "hello": {
      // Handshake: accept the Gateway-minted opaque generation value.
      // Correlation only — no authority semantics (see header).
      const gen = params["generation"];
      if (typeof gen !== "string" || gen.length === 0) {
        failClosed(id, "handshake_invalid", "hello requires a non-empty generation");
        return;
      }
      generation = gen;
      respond({ ok: true, id, generation, result: { ready: true } });
      return;
    }

    case "ping": {
      respond({ ok: true, id, generation, result: { pong: true } });
      return;
    }

    case "appendEvent":
    case "appendIncident": {
      // Real durable append through the existing Ledger (bun:sqlite,
      // BEGIN IMMEDIATE ... COMMIT). The response is written only AFTER
      // the commit returns; the Gateway never sees success before the
      // durable state exists.
      const raw = params["event"];
      if (raw === undefined || raw === null || typeof raw !== "object") {
        failClosed(id, "request_invalid", "append requires an event object");
        return;
      }
      try {
        const event: BridgeEventV1 = parseBridgeEvent(raw as Record<string, unknown>);
        const row = ledger.append(event);
        respond({ ok: true, id, generation, result: { row } });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        // appendEvent and appendIncident share the real durable path; a
        // storage constraint violation (e.g. duplicate event_id) surfaces
        // here as an error — never as success.
        failClosed(id, "append_failed", message);
      }
      return;
    }

    case "interrupt": {
      // Real broker interrupt semantics over the real committed ledger
      // state, through the existing interruptSession seam (unmodified).
      const reason = params["reason"];
      const token = params["currentWriterToken"];
      const sessionStateRaw = params["sessionState"];
      if (typeof reason !== "string" || !INTERRUPT_REASONS.has(reason)) {
        failClosed(id, "request_invalid", "interrupt requires a known reason");
        return;
      }
      if (typeof token !== "number" || !Number.isInteger(token)) {
        failClosed(id, "request_invalid", "interrupt requires an integer currentWriterToken");
        return;
      }
      if (
        sessionStateRaw === null ||
        typeof sessionStateRaw !== "object" ||
        typeof (sessionStateRaw as { kind?: unknown }).kind !== "string" ||
        !SESSION_KINDS.has((sessionStateRaw as { kind: string }).kind)
      ) {
        failClosed(id, "request_invalid", "interrupt requires a known sessionState.kind");
        return;
      }
      const now = params["now"];
      if (now !== undefined && typeof now !== "string") {
        failClosed(id, "request_invalid", "interrupt now must be a string when provided");
        return;
      }
      try {
        const input: InterruptInput = (() => {
          const base = {
            reason: reason as InterruptReason,
            sessionState: sessionStateRaw as SessionState,
            currentWriterToken: token,
            // All durably committed rows — the real ledger state.
            ledgerRows: ledger.readAfter(0),
          };
          const withDetail =
            typeof params["detail"] === "string"
              ? { ...base, detail: params["detail"] as string }
              : base;
          return typeof now === "string" ? { ...withDetail, now } : withDetail;
        })();
        const result = interruptSession(input);
        respond({ ok: true, id, generation, result });
      } catch (err) {
        // Invalid transitions (and the reconciliation_required sentinel)
        // throw in the existing seam; surface fail-closed, never silently.
        const name = err instanceof Error ? err.name : "Error";
        const message = err instanceof Error ? err.message : String(err);
        failClosed(
          id,
          name === "InvalidTransitionError" ? "invalid_transition" : "interrupt_failed",
          message,
        );
      }
      return;
    }

    case "rowsSince": {
      const since = params["since"];
      if (typeof since !== "number" || !Number.isInteger(since) || since < 0) {
        failClosed(id, "request_invalid", "rowsSince requires a non-negative integer since");
        return;
      }
      respond({ ok: true, id, generation, result: { rows: ledger.readAfter(since) } });
      return;
    }

    case "verify": {
      respond({ ok: true, id, generation, result: ledger.verify() });
      return;
    }

    case "storageFaultProbe": {
      // Deterministic real-storage failure: re-append an already-committed
      // event_id. The existing Ledger's INSERT hits the events.event_id
      // UNIQUE constraint inside the real BEGIN IMMEDIATE transaction;
      // the ledger rolls back and throws. The probe proves a storage
      // failure is NEVER reported as successful broker/ledger completion.
      const kind = params["kind"];
      if (kind !== "duplicate_event_id") {
        failClosed(id, "request_invalid", "unknown storageFaultProbe kind");
        return;
      }
      const raw = params["event"];
      if (raw === undefined || raw === null || typeof raw !== "object") {
        failClosed(id, "request_invalid", "storageFaultProbe requires an event object");
        return;
      }
      try {
        const event = parseBridgeEvent(raw as Record<string, unknown>);
        ledger.append(event);
        // If the append unexpectedly succeeded, the probe itself failed.
        failClosed(id, "probe_not_faulted", "expected storage fault did not occur");
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        respond({
          ok: true,
          id,
          generation,
          result: { faulted: true, error: message },
        });
      }
      return;
    }

    case "shutdown": {
      // Gateway-controlled graceful shutdown. Acknowledge, then close the
      // ledger and exit; the Gateway reaps.
      respond({ ok: true, id, generation, result: { exiting: true } });
      try {
        ledger.close();
      } catch {
        // Already closed is not an error for shutdown purposes.
      }
      process.exit(WORKER_EXIT_CODES.controlEof);
    }

    default: {
      failClosed(id, "unknown_op", `unknown op: ${req.op}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Control/request pump on fd 3 (Gateway is sole writer of the parent-side
// descriptor; this worker holds only the child-side read end)
// ---------------------------------------------------------------------------

let pending: Buffer = Buffer.alloc(0);

function ingest(chunk: Buffer): void {
  pending = pending.byteLength === 0 ? Buffer.from(chunk) : Buffer.concat([pending, chunk]);

  for (;;) {
    if (pending.byteLength < 4) return;
    const length = pending.readUInt32BE(0);
    if (length === 0 || length > MAX_FRAME_BYTES) {
      // Broken framing: fail closed. Best-effort error frame, then exit.
      try {
        respond({
          ok: false,
          id: null,
          generation,
          error: { code: "transport_broken", message: `frame length ${length} out of bounds` },
        });
      } catch {
        // Response channel may already be gone; exit fail-closed anyway.
      }
      diag("transport_broken: frame length out of bounds; exiting fail-closed");
      process.exit(WORKER_EXIT_CODES.transportBroken);
    }
    if (pending.byteLength < 4 + length) return;

    const body = pending.subarray(4, 4 + length);
    pending = pending.subarray(4 + length);

    let parsed: unknown;
    try {
      parsed = JSON.parse(body.toString("utf8"));
    } catch {
      try {
        respond({
          ok: false,
          id: null,
          generation,
          error: { code: "transport_broken", message: "frame payload is not valid JSON" },
        });
      } catch {
        // see above
      }
      diag("transport_broken: undecodable frame payload; exiting fail-closed");
      process.exit(WORKER_EXIT_CODES.transportBroken);
    }

    const req = parsed as Partial<RequestFrame>;
    if (typeof req.id !== "number" || typeof req.op !== "string") {
      failClosed(null, "request_invalid", "frame requires numeric id and string op");
      continue;
    }
    if (req.op !== "hello" && generation === null) {
      failClosed(req.id, "handshake_required", "no hello handshake completed");
      continue;
    }
    diag(`op:${req.op} id:${req.id}`);
    const frameReq: RequestFrame = (() => {
      const base = { id: req.id, op: req.op };
      const withGen =
        typeof req.generation === "string" ? { ...base, generation: req.generation } : base;
      return req.params !== undefined ? { ...withGen, params: req.params } : withGen;
    })();
    handleRequest(frameReq);
  }
}

function pump(): void {
  const buf = Buffer.alloc(65536);
  fsRead(FD_CONTROL, buf, 0, buf.byteLength, null, (err, bytesRead) => {
    if (err) {
      diag("control channel read error; exiting fail-closed");
      process.exit(WORKER_EXIT_CODES.controlReadError);
    }
    if (bytesRead === 0) {
      // EOF: the sole writer of the control channel is gone. This is the
      // parent-death observation — an OS descriptor property. Exit now;
      // no independent continuation is permitted.
      try {
        ledger.close();
      } catch {
        // best effort on the exit path
      }
      process.exit(WORKER_EXIT_CODES.controlEof);
    }
    ingest(buf.subarray(0, bytesRead));
    pump();
  });
}

diag("worker started");
pump();
