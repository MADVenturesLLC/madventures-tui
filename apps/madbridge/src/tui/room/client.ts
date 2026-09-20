// apps/madbridge/src/tui/room/client.ts
// Room Runtime Phase 1 — the TUI-side IPC v2 attach client (CONSUMER ONLY).
//
// The TUI is a strict projection and operator-interaction surface (r3 §7):
// it attaches, detaches, displays, projects canonical state, requests
// authorized input ownership, and invokes the frozen operator verbs. It
// NEVER mints room authority, occupancy, viewer identity, execution
// identity, or provider credentials, creates no daemon, and binds no
// listener — this module CONNECTS to the Gateway's existing documented IPC
// path and speaks the mux the Gateway owns.
//
// Canonical protocol owner: founder-os-build-room
// `packages/gateway-protocol/src/ipc-v2.ts` (r3 §10). This client is a
// boundary consumer; its frame encode/decode mirrors the frozen framing
// `[u32be length][u8 type][payload]` (r4 §7.7) and validates inbound facts
// through packages/protocol's consumer types. Raw PTY bytes never arrive
// here (r4.1 §3 — the projector wire is VT patches).
//
// Socket location: the Gateway's fixed documented path
// `~/Library/Application Support/founder-os/gateway/ipc.sock` (Build Room
// paths.ts). NO environment variable is consulted — `MADV_SOCKET_PATH` stays
// retired (r3 stop 5). Tests inject the path explicitly.
//
// Deadlines: a silent Gateway must fail the verb CLOSED, never hang it. The
// deadline mechanism is the stdlib `AbortSignal.timeout()` request deadline —
// a network-boundary deadline, not a UI timer/animation/timeline (the landed
// writers-stage invariants 12/43 forbid timer identifiers under src/tui/**
// and are left untouched). This choice is disclosed in the Phase 1 handoff.

import { connect, type Socket } from "node:net";
import { homedir } from "node:os";
import { join } from "node:path";
import {
  ROOM_FRAME_CONTROL,
  ROOM_FRAME_VT_PATCH,
  ROOM_IPC_VERSION,
  validateRoomSnapshotBody,
  validateRoomVtPatch,
  type RoomControlBody,
  type RoomDisconnectReason,
  type RoomGap,
  type RoomReceiptRef,
  type RoomRecoveryKind,
  type RoomSnapshotBody,
  type RoomVtPatch,
} from "@madventures/protocol";

/** The Gateway's fixed documented IPC path (Build Room paths.ts). */
export function defaultGatewaySocketPath(): string {
  return join(homedir(), "Library", "Application Support", "founder-os", "gateway", "ipc.sock");
}

// ---------------------------------------------------------------------------
// Framing — mirror of the frozen mux (consumer side)
// ---------------------------------------------------------------------------

export function encodeControlFrame(body: unknown): Buffer {
  const payload = Buffer.from(JSON.stringify(body), "utf8");
  const out = Buffer.alloc(5 + payload.byteLength);
  out.writeUInt32BE(payload.byteLength, 0);
  out.writeUInt8(ROOM_FRAME_CONTROL, 4);
  payload.copy(out, 5);
  return out;
}

export interface DecodedFrame {
  readonly type: number;
  readonly payload: Buffer;
}

export interface DecodeStep {
  readonly frames: readonly DecodedFrame[];
  readonly rest: Buffer;
}

export function decodeFrames(buffer: Buffer): DecodeStep {
  const frames: DecodedFrame[] = [];
  let rest = buffer;
  for (;;) {
    if (rest.byteLength < 5) return { frames, rest };
    const length = rest.readUInt32BE(0);
    if (rest.byteLength < 5 + length) return { frames, rest };
    frames.push({ type: rest.readUInt8(4), payload: Buffer.from(rest.subarray(5, 5 + length)) });
    rest = Buffer.from(rest.subarray(5 + length));
  }
}

// ---------------------------------------------------------------------------
// Attach session
// ---------------------------------------------------------------------------

export interface JoinResult {
  readonly roomId: string;
  /** Gateway-MINTED identity (r4.1 §5). The client stores it; it never picks it. */
  readonly viewerId: string;
  /** Local session token presented on rejoin for a Surviving join. */
  readonly viewerCapability: string;
  readonly occupancyEpoch: number;
  readonly recoveryKind: RoomRecoveryKind;
  readonly snapshot: RoomSnapshotBody;
  readonly input: "granted" | "input_held" | "unchanged";
}

/** CreateRoom result: the Gateway-minted live room (zero slots at birth). */
export interface CreateResult {
  /** Validated nonempty Gateway-minted room_id (never coerced from a missing field). */
  readonly roomId: string;
  /** Honesty label VALIDATED from the Gateway ack (`fixture === false`), never assumed. */
  readonly fixture: false;
  /** Provenance VALIDATED from the Gateway ack (`created_via === "CreateRoom"`). */
  readonly createdVia: "CreateRoom";
  readonly snapshot: RoomSnapshotBody;
}

/**
 * Consumer-side validation of a CreateRoom SUCCESS acknowledgement
 * (MT-20260920-ROOM-CREATE-90 finding 1). Returns the list of defects; an
 * empty list means every required fact is present and consistent:
 *   op === "CreateRoom", ok === true, room_id nonempty string,
 *   fixture === false, created_via === "CreateRoom", snapshot passes the
 *   existing consumer validation, snapshot.room_id === room_id.
 * Pure: no I/O, no coercion, no manufactured provenance.
 */
export function validateCreateRoomAck(ack: Record<string, unknown>): string[] {
  const defects: string[] = [];
  if (ack["op"] !== "CreateRoom") defects.push(`op is ${JSON.stringify(ack["op"] ?? null)}, expected "CreateRoom"`);
  if (ack["ok"] !== true) defects.push("ok is not true");
  const roomId = ack["room_id"];
  if (typeof roomId !== "string") defects.push("room_id is not a string");
  else if (roomId.length === 0) defects.push("room_id is empty");
  if (ack["fixture"] !== false) defects.push(`fixture is ${JSON.stringify(ack["fixture"] ?? null)}, expected false`);
  if (ack["created_via"] !== "CreateRoom") defects.push(`created_via is ${JSON.stringify(ack["created_via"] ?? null)}, expected "CreateRoom"`);
  const snapshot = ack["snapshot"];
  const snapshotDefects = validateRoomSnapshotBody(snapshot);
  if (snapshotDefects.length > 0) {
    defects.push(...snapshotDefects.map((d) => `snapshot: ${d}`));
  } else if (typeof roomId === "string" && roomId.length > 0) {
    const snapshotRoomId = (snapshot as RoomSnapshotBody).room_id;
    if (snapshotRoomId !== roomId) defects.push(`snapshot.room_id ${JSON.stringify(snapshotRoomId)} does not match room_id ${JSON.stringify(roomId)}`);
  }
  return defects;
}

/** A refusal addressed to CreateRoom (or a Nack) — never a success. */
export function isCreateRoomRefusal(ack: Record<string, unknown>): boolean {
  return ack["ok"] !== true && (ack["op"] === "CreateRoom" || ack["op"] === "Nack");
}

export interface RoomClientEvents {
  /** Inbound VT patch frames (checkpoint or patch) per execution. */
  onPatch?: (patch: RoomVtPatch) => void;
  /** Inbound snapshot/delta control bodies. */
  onControl?: (body: RoomControlBody) => void;
  /** Per-viewer Gap facts (r4 §7.8). */
  onGap?: (gap: RoomGap) => void;
  /** Evidence receipt references — rung semantics validated by claim-boundary. */
  onReceipt?: (receipt: RoomReceiptRef) => void;
  /** Gateway-ordered disconnect (closed reason set). */
  onDisconnect?: (reason: RoomDisconnectReason) => void;
  /** Protocol defect observed on the consumer side (fail closed, never guess). */
  onProtocolError?: (detail: string) => void;
}

export class RoomAttachError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(message);
    this.name = "RoomAttachError";
    this.code = code;
  }
}

export interface RoomClientOptions {
  readonly socketPath?: string;
  readonly timeoutMs?: number;
}

/**
 * One viewer session per connection (the Gateway enforces the same rule).
 * Request/response ops resolve on the matching control answer; pushed facts
 * (patches, deltas, gaps, receipts, disconnect) flow to the event callbacks.
 */
export class RoomAttachClient {
  private readonly socketPath: string;
  private readonly timeoutMs: number;
  private socket: Socket | null = null;
  private buffered: Buffer = Buffer.alloc(0);
  private readonly waiters: ((body: Record<string, unknown>) => void)[] = [];
  private closed = false;

  constructor(
    private readonly events: RoomClientEvents = {},
    options: RoomClientOptions = {},
  ) {
    this.socketPath = options.socketPath ?? defaultGatewaySocketPath();
    this.timeoutMs = options.timeoutMs ?? 5_000;
  }

  /** Connect + Hello. Refuses fail-closed when no Gateway is listening. */
  async connect(): Promise<void> {
    if (this.socket !== null) throw new RoomAttachError("already_connected", "connect() called twice");
    const socket = await new Promise<Socket>((resolve, reject) => {
      const pending = connect(this.socketPath);
      const deadline = AbortSignal.timeout(this.timeoutMs);
      let settled = false;
      const onDeadline = (): void => {
        if (settled) return;
        settled = true;
        pending.destroy();
        reject(new RoomAttachError("gateway_not_running", `no Gateway answered at ${this.socketPath} within ${String(this.timeoutMs)}ms — the TUI fabricates no occupancy`));
      };
      deadline.addEventListener("abort", onDeadline, { once: true });
      pending.once("connect", () => {
        if (settled) return;
        settled = true;
        deadline.removeEventListener("abort", onDeadline);
        resolve(pending);
      });
      pending.once("error", (err: Error) => {
        if (settled) return;
        settled = true;
        deadline.removeEventListener("abort", onDeadline);
        reject(new RoomAttachError("gateway_not_running", `cannot reach the Gateway at ${this.socketPath}: ${err.message} — the TUI fabricates no occupancy`));
      });
    });
    this.socket = socket;
    socket.on("data", (chunk: Buffer) => this.onData(chunk));
    socket.on("close", () => {
      this.closed = true;
    });
    socket.on("error", () => {
      this.closed = true;
    });
    // First frame MUST be the v2 Hello (r4 §7.7 version negotiation).
    const ack = await this.request({ op: "Hello", ipc_version: ROOM_IPC_VERSION });
    if (ack["ok"] !== true) {
      throw new RoomAttachError("hello_refused", `Gateway refused the v2 Hello: ${JSON.stringify(ack)}`);
    }
  }

  /** JoinRoom — yields the Gateway-minted identity; never picks one. */
  async join(roomId: string, options: { idempotencyKey: string; capability?: string; requestInput?: boolean } ): Promise<JoinResult> {
    const body: Record<string, unknown> = {
      op: "JoinRoom",
      room_id: roomId,
      idempotency_key: options.idempotencyKey,
      viewer_caps: options.requestInput === true ? "read+input" : "read",
    };
    if (options.capability !== undefined) body["viewer_capability"] = options.capability;
    const ack = await this.request(body);
    if (ack["ok"] !== true) {
      throw new RoomAttachError(String(ack["reason"] ?? "join_refused"), `JoinRoom refused: ${JSON.stringify(ack)}`);
    }
    const snapshot = ack["snapshot"];
    const defects = validateRoomSnapshotBody(snapshot);
    if (defects.length > 0) {
      throw new RoomAttachError("protocol_defect", `Gateway snapshot failed consumer validation: ${defects.join("; ")}`);
    }
    return {
      roomId: String(ack["room_id"]),
      viewerId: String(ack["viewer_id"]),
      viewerCapability: String(ack["viewer_capability"]),
      occupancyEpoch: Number(ack["occupancy_epoch"]),
      recoveryKind: String(ack["recovery_kind"]) as RoomRecoveryKind,
      snapshot: snapshot as RoomSnapshotBody,
      input: String(ack["input"]) as JoinResult["input"],
    };
  }

  /**
   * CreateRoom (2026-09-20 Founder amendment) — the Gateway MINTS the room;
   * the client only requests. The minted room is born PREPARED with zero
   * execution slots; `fixture: false` and `created_via: "CreateRoom"` are the
   * Gateway's own labels and are VALIDATED here, never assumed.
   *
   * Fail-closed contract (MT-20260920-ROOM-CREATE-90):
   *   - a refusal addressed to CreateRoom (or a Nack) surfaces its reason;
   *   - any other non-conforming answer — an unrelated successful ack, a
   *     missing/empty/non-string room_id, a wrong or missing fixture or
   *     created_via label, an invalid snapshot, or a snapshot naming a
   *     different room — is a `protocol_defect`. No field is coerced.
   * The shared request dispatcher is unchanged; this method is where an
   * unrelated `ok` frame is rejected for this operation.
   */
  async create(idempotencyKey: string): Promise<CreateResult> {
    const ack = await this.request({ op: "CreateRoom", idempotency_key: idempotencyKey });
    if (isCreateRoomRefusal(ack)) {
      throw new RoomAttachError(String(ack["reason"] ?? "create_refused"), `CreateRoom refused: ${JSON.stringify(ack)}`);
    }
    const defects = validateCreateRoomAck(ack);
    if (defects.length > 0) {
      throw new RoomAttachError("protocol_defect", `CreateRoom acknowledgement failed consumer validation: ${defects.join("; ")}`);
    }
    return {
      roomId: ack["room_id"] as string,
      fixture: false,
      createdVia: "CreateRoom",
      snapshot: ack["snapshot"] as RoomSnapshotBody,
    };
  }

  /** LeaveRoom — viewer detaches; occupancy is untouched (r4 §7.15). */
  async leave(roomId: string, idempotencyKey: string, capability: string): Promise<void> {
    const ack = await this.request({
      op: "LeaveRoom",
      room_id: roomId,
      idempotency_key: idempotencyKey,
      viewer_capability: capability,
    });
    if (ack["ok"] !== true) {
      throw new RoomAttachError(String(ack["reason"] ?? "leave_refused"), `LeaveRoom refused: ${JSON.stringify(ack)}`);
    }
  }

  /** FollowRoom — `rooms` lists snapshots; a room_id returns one snapshot. */
  async follow(target: string, capability?: string): Promise<Record<string, unknown>> {
    const body: Record<string, unknown> = { op: "FollowRoom", target };
    if (capability !== undefined) body["viewer_capability"] = capability;
    const ack = await this.request(body);
    if (ack["ok"] !== true) {
      throw new RoomAttachError(String(ack["reason"] ?? "follow_refused"), `FollowRoom refused: ${JSON.stringify(ack)}`);
    }
    return ack;
  }

  /** TakeoverInput — REQUESTS authority; the Gateway grants or refuses. */
  async takeoverInput(roomId: string, capability: string): Promise<Record<string, unknown>> {
    return await this.request({ op: "TakeoverInput", room_id: roomId, viewer_capability: capability });
  }

  /** InputFrame — only meaningful for the lease holder; refusal is a Nack. */
  async sendInput(roomId: string, capability: string, inputEpoch: number, text: string): Promise<Record<string, unknown>> {
    return await this.request({
      op: "InputFrame",
      room_id: roomId,
      viewer_capability: capability,
      input_epoch: inputEpoch,
      data_b64: Buffer.from(text, "utf8").toString("base64"),
    });
  }

  /** ResizeFrame — controller-only (the input-lease holder). */
  async sendResize(roomId: string, capability: string, inputEpoch: number, cols: number, rows: number): Promise<Record<string, unknown>> {
    return await this.request({
      op: "ResizeFrame",
      room_id: roomId,
      viewer_capability: capability,
      input_epoch: inputEpoch,
      cols,
      rows,
    });
  }

  /** Close the viewer connection (viewer_quit on the Gateway side). */
  destroy(): void {
    this.socket?.destroy();
    this.socket = null;
    this.closed = true;
  }

  get isClosed(): boolean {
    return this.closed;
  }

  // -------------------------------------------------------------------------
  // Internals
  // -------------------------------------------------------------------------

  private request(body: Record<string, unknown>): Promise<Record<string, unknown>> {
    const socket = this.socket;
    if (socket === null) {
      return Promise.reject(new RoomAttachError("not_connected", "connect() before requesting"));
    }
    return new Promise<Record<string, unknown>>((resolve, reject) => {
      const deadline = AbortSignal.timeout(this.timeoutMs);
      let settled = false;
      const onDeadline = (): void => {
        if (settled) return;
        settled = true;
        reject(new RoomAttachError("gateway_silent", `Gateway did not answer ${String(body["op"])} within ${String(this.timeoutMs)}ms`));
      };
      deadline.addEventListener("abort", onDeadline, { once: true });
      this.waiters.push((answered) => {
        if (settled) return;
        settled = true;
        deadline.removeEventListener("abort", onDeadline);
        resolve(answered);
      });
      socket.write(encodeControlFrame(body), (err?: Error | null) => {
        if (err && !settled) {
          settled = true;
          deadline.removeEventListener("abort", onDeadline);
          reject(new RoomAttachError("write_failed", err.message));
        }
      });
    });
  }

  private onData(chunk: Buffer): void {
    this.buffered = Buffer.concat([this.buffered, chunk]);
    const step = decodeFrames(this.buffered);
    this.buffered = step.rest;
    for (const frame of step.frames) {
      if (frame.type === ROOM_FRAME_VT_PATCH) {
        let patch: unknown;
        try {
          patch = JSON.parse(frame.payload.toString("utf8"));
        } catch {
          this.events.onProtocolError?.("undecodable VT patch frame");
          continue;
        }
        const defects = validateRoomVtPatch(patch);
        if (defects.length > 0) {
          this.events.onProtocolError?.(`VT patch failed consumer validation: ${defects.join("; ")}`);
          continue;
        }
        this.events.onPatch?.(patch as RoomVtPatch);
        continue;
      }
      if (frame.type !== ROOM_FRAME_CONTROL) {
        this.events.onProtocolError?.(`unknown frame type 0x${frame.type.toString(16)}`);
        continue;
      }
      let body: Record<string, unknown>;
      try {
        const parsed: unknown = JSON.parse(frame.payload.toString("utf8"));
        if (typeof parsed !== "object" || parsed === null) {
          this.events.onProtocolError?.("control frame is not an object");
          continue;
        }
        body = parsed as Record<string, unknown>;
      } catch {
        this.events.onProtocolError?.("undecodable control frame");
        continue;
      }
      const op = body["op"];
      if (op === "Gap") {
        this.events.onGap?.(body as unknown as RoomGap);
        continue;
      }
      if (op === "ReceiptRef") {
        this.events.onReceipt?.(body as unknown as RoomReceiptRef);
        continue;
      }
      if (op === "Disconnect") {
        this.events.onDisconnect?.(String(body["reason"]) as RoomDisconnectReason);
        this.closed = true;
        continue;
      }
      // Pushed room facts vs. answers to outstanding requests: an answer
      // carries `ok`; RoomSnapshot/RoomDelta pushes do not.
      if ((op === "RoomSnapshot" || op === "RoomDelta" || op === "FixtureVerificationResult") && this.waiters.length === 0) {
        this.events.onControl?.(body as unknown as RoomControlBody);
        continue;
      }
      if (this.waiters.length > 0 && (op === "Nack" || body["ok"] !== undefined || op === "RoomSnapshot" || op === "RoomDelta")) {
        const waiter = this.waiters.shift();
        waiter?.(body);
        continue;
      }
      this.events.onControl?.(body as unknown as RoomControlBody);
    }
  }
}
