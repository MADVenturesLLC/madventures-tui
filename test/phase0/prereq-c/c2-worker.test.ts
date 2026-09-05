// test/phase0/prereq-c/c2-worker.test.ts
//
// Prerequisite C remediation (FDR-C C2) — WORKER-SIDE proofs only.
//
// Authorized by the Founder-confirmed R4 changed-path manifest
// (2026-09-04) under the Prerequisite C remediation commission. This
// file exercises the bounded C2 Worker
// (packages/room-runtime-worker/src/worker.ts) over its private framed
// stdio transport, against the REAL existing implementations:
//
//   - packages/ledger `Ledger` (bun:sqlite, unmodified) — real durable
//     append/hash-chain/verify;
//   - packages/broker/src/reconciliation.ts::interruptSession (+ its
//     session-machine.ts dependency) — real broker interrupt semantics,
//     unmodified.
//
// TRANSPORT (truthful characterization per the Founder clarification SHA
// 6a5dd5aeee056deb18c4ea49912565b9fd5d5063402f166dce2e2adbf8ed0f43):
// Bun.spawn stdio 'pipe' channels are unnamed AF_UNIX / SOCK_STREAM
// socketpair descriptors created internally by the runtime (the two
// endpoints are created connected to each other). They carry no
// filesystem path, are never bound or listened on, and are reachable
// only through inherited private descriptors. This test never creates a
// broker.sock, a filesystem Unix socket, a TCP endpoint, or any
// discoverable endpoint. The parent side exposes the extended stdio
// channels as raw parent file descriptors; this test drives them with
// plain node:fs primitives (writeSync/closeSync/Bun.file(fd).stream()).
//
// DETERMINISM POLICY (Founder R3 correction 2): the existing broker seam
// legitimately generates `event_id` via crypto.randomUUID, and the ledger
// hashes those identifiers. Tests therefore assert deterministic
// SEMANTICS/INVARIANTS (transitions, token invalidation, chaining to the
// actual last durable hash, duplicate semantics, fail-closed errors,
// injected-`now` temporal behavior, durable-append-before-ack, real
// verify pass) and never require byte-identical values for legitimately
// generated identifiers or hashes derived from them.
//
// Gateway-owned proofs (spawn under Node 22, SIGKILL parent death, FD
// custody, duplicate/stale fencing, socket/credential audits) belong to
// the founder-os-build-room suite
// test/worker-supervisor.prereq-c.storage.test.ts, NOT here.
//
// Credential boundary: the worker is spawned with an environment
// containing ONLY PREREQC_WORKER_DB_PATH. No provider credential or
// Founder secret enters argv, environment, IPC, logs, or persistence.

import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { closeSync, mkdtempSync, realpathSync, rmSync, writeSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { BridgeEventV1, RepositoryFingerprint } from "@madventures/protocol";
import { newEventId } from "@madventures/protocol";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = realpathSync(join(HERE, "..", "..", ".."));
const WORKER_ENTRYPOINT = join(
  REPO_ROOT,
  "packages",
  "room-runtime-worker",
  "src",
  "worker.ts",
);

const GENESIS = "0".repeat(64);
const ZERO_FINGERPRINT: RepositoryFingerprint = {
  kind: "commit",
  sha256: GENESIS,
  git_sha: "0".repeat(40),
};

function makeEvent(over: Partial<BridgeEventV1> = {}): BridgeEventV1 {
  return {
    protocol_version: "madbridge-protocol/v1",
    event_id: over.event_id ?? newEventId(),
    session_id: over.session_id ?? "session-prereq-c-proof",
    parent_event_id: over.parent_event_id ?? null,
    sender_execution_id: "exec-proof-gateway",
    receiver_execution_id: "exec-proof-worker",
    sender_role: "builder",
    sender_surface: "gateway-proof",
    sender_model: "none",
    sender_provider: "none",
    task_envelope_hash: GENESIS,
    repository_fingerprint: ZERO_FINGERPRINT,
    event_type: over.event_type ?? "message",
    payload_hash: "",
    payload: over.payload ?? { note: "prereq-c-c2-proof" },
    created_at: over.created_at ?? new Date().toISOString(),
    previous_event_hash: over.previous_event_hash ?? GENESIS,
  };
}

// ---------------------------------------------------------------------------
// Framed private-transport client for the bounded worker.
//
// Channels (unnamed AF_UNIX SOCK_STREAM socketpair descriptors created by
// Bun.spawn, exposed to this parent as raw FDs):
//   fdControl  parent write end  -> child fd 3 (control + requests)
//   fdResponse parent read end   <- child fd 4 (responses)
//   fdDiag     parent read end   <- child fd 5 (scrubbed diagnostics)
// ---------------------------------------------------------------------------

interface WorkerResponse {
  ok: boolean;
  id: number | null;
  generation: string | null;
  result?: unknown;
  error?: { code: string; message: string };
}

class WorkerHandle {
  readonly child: ReturnType<typeof Bun.spawn>;
  /** Parent-side write end of the control/request channel (child fd 3). */
  readonly fdControl: number;
  /** Parent-side read end of the response channel (child fd 4). */
  readonly fdResponse: number;
  /** Parent-side read end of the diagnostic channel (child fd 5). */
  readonly fdDiag: number;
  private respBuffer: Buffer = Buffer.alloc(0);
  private readonly respWaiters: Array<(buf: Buffer) => void> = [];
  private diagChunks: Buffer[] = [];
  private nextId = 1;
  private closedForEof = false;

  constructor(dbPath: string) {
    this.child = Bun.spawn([process.execPath, WORKER_ENTRYPOINT], {
      // fd 0/1/2 not inherited (private channels only): fd 3 control+request
      // (this test is sole writer), fd 4 responses, fd 5 diagnostics.
      stdio: ["ignore", "ignore", "ignore", "pipe", "pipe", "pipe"],
      env: { PREREQC_WORKER_DB_PATH: dbPath }, // credential access: NONE
    });
    const stdio = this.child.stdio;
    const fd3 = stdio[3];
    const fd4 = stdio[4];
    const fd5 = stdio[5];
    if (typeof fd3 !== "number" || typeof fd4 !== "number" || typeof fd5 !== "number") {
      throw new Error("worker stdio channels 3/4/5 not established as parent FDs");
    }
    this.fdControl = fd3;
    this.fdResponse = fd4;
    this.fdDiag = fd5;
    this.pumpFd(fd4, (chunk) => this.onRespChunk(chunk));
    this.pumpFd(fd5, (chunk) => this.diagChunks.push(chunk));
  }

  /** Async read pump over a raw parent FD (Bun.file(fd).stream()). */
  private pumpFd(fd: number, onChunk: (chunk: Buffer) => void): void {
    const reader = Bun.file(fd).stream().getReader();
    void (async () => {
      for (;;) {
        const { done, value } = await reader.read();
        if (done || value === undefined) return;
        onChunk(Buffer.from(value));
      }
    })();
  }

  private onRespChunk(chunk: Buffer): void {
    this.respBuffer = Buffer.concat([this.respBuffer, chunk]);
    for (;;) {
      if (this.respBuffer.byteLength < 4) return;
      const length = this.respBuffer.readUInt32BE(0);
      if (this.respBuffer.byteLength < 4 + length) return;
      const frame = Buffer.from(this.respBuffer.subarray(4, 4 + length));
      this.respBuffer = Buffer.from(this.respBuffer.subarray(4 + length));
      const waiter = this.respWaiters.shift();
      if (waiter) waiter(frame);
    }
  }

  private nextFrame(timeoutMs = 10_000): Promise<Buffer> {
    const existing = this.respBuffer;
    if (existing.byteLength >= 4) {
      const length = existing.readUInt32BE(0);
      if (existing.byteLength >= 4 + length) {
        const frame = Buffer.from(existing.subarray(4, 4 + length));
        this.respBuffer = Buffer.from(existing.subarray(4 + length));
        return Promise.resolve(frame);
      }
    }
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("frame timeout")), timeoutMs);
      this.respWaiters.push((buf) => {
        clearTimeout(timer);
        resolve(buf);
      });
    });
  }

  async sendRaw(bytes: Buffer): Promise<void> {
    // Raw write on the parent's write end of the control channel. The
    // stream preserves order; writes are synchronous kernel writes.
    let offset = 0;
    while (offset < bytes.byteLength) {
      offset += writeSync(this.fdControl, bytes.subarray(offset));
    }
  }

  /** Read exactly one framed response (ordered; framing preserves order). */
  async readOneResponse(timeoutMs = 10_000): Promise<WorkerResponse> {
    const raw = await this.nextFrame(timeoutMs);
    return JSON.parse(raw.toString("utf8")) as WorkerResponse;
  }

  async request(op: string, params: Record<string, unknown>): Promise<WorkerResponse> {
    const id = this.nextId++;
    const body = JSON.stringify({ id, op, params });
    const payload = Buffer.from(body, "utf8");
    const frame = Buffer.alloc(4 + payload.byteLength);
    frame.writeUInt32BE(payload.byteLength, 0);
    payload.copy(frame, 4);
    // The channel preserves order; request N's response always precedes
    // request N+1's. Reading after sending is therefore race-free for
    // sequential requests.
    await this.sendRaw(frame);
    return this.readOneResponse();
  }

  diagnostics(): string {
    return Buffer.concat(this.diagChunks).toString("utf8");
  }

  /** Close the sole-writer parent-side descriptor (EOF / parent-death). */
  async endControl(): Promise<void> {
    if (!this.closedForEof) {
      this.closedForEof = true;
      closeSync(this.fdControl);
    }
  }

  async exitCode(): Promise<number> {
    return await this.child.exited;
  }

  async kill(signal: number): Promise<void> {
    this.child.kill(signal);
    await this.child.exited;
  }
}

// ---------------------------------------------------------------------------
// Suite
// ---------------------------------------------------------------------------

let workDir: string;
let dbPath: string;

beforeEach(() => {
  workDir = mkdtempSync(join(tmpdir(), "prereq-c-c2-worker-"));
  dbPath = join(workDir, "prereq-c.sqlite");
});

afterEach(() => {
  rmSync(workDir, { recursive: true, force: true });
});

describe("prereq-c C2 worker — handshake and real durable append", () => {
  test("hello handshake accepts the Gateway-minted opaque generation", async () => {
    const w = new WorkerHandle(dbPath);
    try {
      const res = await w.request("hello", { generation: "gen-proof-1" });
      expect(res.ok).toBe(true);
      expect(res.generation).toBe("gen-proof-1");
      const ping = await w.request("ping", {});
      expect(ping.ok).toBe(true);
      expect(ping.generation).toBe("gen-proof-1");
    } finally {
      await w.endControl();
      expect(await w.exitCode()).toBe(0);
    }
  });

  test("request before hello fails closed", async () => {
    const w = new WorkerHandle(dbPath);
    try {
      const res = await w.request("ping", {});
      expect(res.ok).toBe(false);
      expect(res.error?.code).toBe("handshake_required");
    } finally {
      await w.endControl();
      await w.exitCode();
    }
  });

  test("real durable append: ack only after COMMIT, chain from genesis", async () => {
    const w = new WorkerHandle(dbPath);
    try {
      await w.request("hello", { generation: "gen-append" });
      const event = makeEvent();
      const res = await w.request("appendEvent", { event });
      expect(res.ok).toBe(true);
      const row = (res.result as { row: Record<string, unknown> }).row;
      expect(row["sequence"]).toBe(1);
      expect(row["previous_hash"]).toBe(GENESIS);
      expect(row["event_id"]).toBe(event.event_id);
      expect(typeof row["event_hash"]).toBe("string");
      expect((row["event_hash"] as string).length).toBe(64);

      // Ack-after-commit: the row is already durably readable through the
      // real ledger at the moment the response arrives.
      const rows = await w.request("rowsSince", { since: 0 });
      expect(rows.ok).toBe(true);
      const list = (rows.result as { rows: Array<Record<string, unknown>> }).rows;
      expect(list.length).toBe(1);
      expect(list[0]?.["event_hash"]).toBe(row["event_hash"]);

      const verify = await w.request("verify", {});
      expect(verify.ok).toBe(true);
      expect(verify.result).toMatchObject({ valid: true, count: 1 });
      expect((verify.result as { head: string }).head).toBe(row["event_hash"] as string);
    } finally {
      await w.endControl();
      expect(await w.exitCode()).toBe(0);
    }
  });

  test("invalid event fails closed (never reported as success)", async () => {
    const w = new WorkerHandle(dbPath);
    try {
      await w.request("hello", { generation: "gen-invalid" });
      const bad = { ...makeEvent(), protocol_version: "wrong-version" };
      const res = await w.request("appendEvent", { event: bad });
      expect(res.ok).toBe(false);
      expect(res.error?.code).toBe("append_failed");
      const verify = await w.request("verify", {});
      expect((verify.result as { valid: boolean; count: number }).count).toBe(0);
    } finally {
      await w.endControl();
      await w.exitCode();
    }
  });
});

describe("prereq-c C2 worker — real broker interrupt semantics over committed state", () => {
  async function seedOneEvent(w: WorkerHandle): Promise<Record<string, unknown>> {
    const res = await w.request("appendEvent", { event: makeEvent() });
    expect(res.ok).toBe(true);
    return (res.result as { row: Record<string, unknown> }).row;
  }

  test("active → interrupted: token invalidation, chaining to the actual last durable hash, injected now", async () => {
    const w = new WorkerHandle(dbPath);
    try {
      await w.request("hello", { generation: "gen-interrupt" });
      const row = await seedOneEvent(w);
      const injectedNow = "2026-09-04T12:00:00.000Z";

      const res = await w.request("interrupt", {
        reason: "cli_exit",
        currentWriterToken: 7,
        sessionState: { kind: "active" },
        now: injectedNow,
      });
      expect(res.ok).toBe(true);
      const result = res.result as {
        state: { kind: string };
        incidentEvent: BridgeEventV1;
        tokenInvalidated: number;
        autoResumed: boolean;
        duplicate: boolean;
      };
      // Deterministic semantics (not byte-identical identifiers):
      expect(result.state.kind).toBe("interrupted");
      expect(result.tokenInvalidated).toBe(7);
      expect(result.autoResumed).toBe(false);
      expect(result.duplicate).toBe(false);
      // Incident chains to the ACTUAL last durable ledger hash:
      expect(result.incidentEvent.previous_event_hash).toBe(row["event_hash"] as string);
      // Incident inherits session identity from the committed row:
      expect(result.incidentEvent.session_id).toBe("session-prereq-c-proof");
      expect(result.incidentEvent.event_type).toBe("incident");
      expect(result.incidentEvent.sender_surface).toBe("broker");
      // Injected `now` produces the expected temporal behavior:
      expect(result.incidentEvent.created_at).toBe(injectedNow);
      expect(result.incidentEvent.payload["interrupted_at"]).toBe(injectedNow);
      expect(result.incidentEvent.payload["reason"]).toBe("cli_exit");
      expect(result.incidentEvent.payload["invalidated_token"]).toBe(7);
      // Generated opaque identifier may legitimately vary — assert shape only:
      expect(typeof result.incidentEvent.event_id).toBe("string");
      expect(result.incidentEvent.event_id.length).toBeGreaterThan(0);
    } finally {
      await w.endControl();
      expect(await w.exitCode()).toBe(0);
    }
  });

  test("interrupt over empty ledger chains from genesis (recovery path)", async () => {
    const w = new WorkerHandle(dbPath);
    try {
      await w.request("hello", { generation: "gen-empty" });
      const res = await w.request("interrupt", {
        reason: "broker_restart",
        currentWriterToken: 1,
        sessionState: { kind: "starting" },
      });
      expect(res.ok).toBe(true);
      const result = res.result as {
        state: { kind: string };
        incidentEvent: BridgeEventV1;
        duplicate: boolean;
      };
      expect(result.state.kind).toBe("interrupted");
      expect(result.duplicate).toBe(false);
      expect(result.incidentEvent.previous_event_hash).toBe(GENESIS);
      expect(result.incidentEvent.session_id).toBe("session-recovery");
    } finally {
      await w.endControl();
      await w.exitCode();
    }
  });

  test("duplicate interrupt: duplicate semantics without token reissue", async () => {
    const w = new WorkerHandle(dbPath);
    try {
      await w.request("hello", { generation: "gen-dup" });
      await seedOneEvent(w);
      const first = await w.request("interrupt", {
        reason: "adapter_disconnect",
        currentWriterToken: 9,
        sessionState: { kind: "active" },
      });
      expect((first.result as { duplicate: boolean }).duplicate).toBe(false);

      const second = await w.request("interrupt", {
        reason: "adapter_disconnect",
        currentWriterToken: 9,
        sessionState: { kind: "interrupted" },
      });
      expect(second.ok).toBe(true);
      const result = second.result as {
        state: { kind: string };
        tokenInvalidated: number;
        duplicate: boolean;
      };
      expect(result.duplicate).toBe(true);
      expect(result.state.kind).toBe("interrupted"); // state untouched
      expect(result.tokenInvalidated).toBe(9); // same token, no reissue
    } finally {
      await w.endControl();
      await w.exitCode();
    }
  });

  test("invalid transition fails closed (closed → interrupt)", async () => {
    const w = new WorkerHandle(dbPath);
    try {
      await w.request("hello", { generation: "gen-invalid-transition" });
      const res = await w.request("interrupt", {
        reason: "cli_exit",
        currentWriterToken: 3,
        sessionState: { kind: "closed" },
      });
      expect(res.ok).toBe(false);
      expect(res.error?.code).toBe("invalid_transition");
      expect(res.error?.message).toContain("invalid transition");
    } finally {
      await w.endControl();
      await w.exitCode();
    }
  });

  test("end-to-end: durable append → real interrupt → durable incident append → real verify", async () => {
    const w = new WorkerHandle(dbPath);
    try {
      await w.request("hello", { generation: "gen-e2e" });
      const row1 = await seedOneEvent(w);

      const interrupt = await w.request("interrupt", {
        reason: "broken_chain",
        currentWriterToken: 11,
        sessionState: { kind: "active" },
        now: "2026-09-04T13:00:00.000Z",
      });
      expect(interrupt.ok).toBe(true);
      const incident = (interrupt.result as { incidentEvent: BridgeEventV1 }).incidentEvent;

      // Durable append of the returned incident BEFORE success is
      // acknowledged to the caller (the response is the ack):
      const appended = await w.request("appendIncident", { event: incident });
      expect(appended.ok).toBe(true);
      const row2 = (appended.result as { row: Record<string, unknown> }).row;
      expect(row2["sequence"]).toBe(2);
      expect(row2["previous_hash"]).toBe(row1["event_hash"]);

      // Final real Ledger verification passes over the resulting chain:
      const verify = await w.request("verify", {});
      expect(verify.result).toMatchObject({ valid: true, count: 2 });
      expect((verify.result as { head: string }).head).toBe(row2["event_hash"] as string);
    } finally {
      await w.endControl();
      expect(await w.exitCode()).toBe(0);
    }
  });

  test("deterministic semantics across independent runs (identifiers may vary)", async () => {
    const collected: Array<{
      stateKind: string;
      duplicate: boolean;
      tokenInvalidated: number;
      createdAt: string;
      chainedToGenesis: boolean;
      verifyValid: boolean;
    }> = [];
    for (let i = 0; i < 2; i++) {
      const isolatedDb = join(workDir, `run-${i}.sqlite`);
      const w = new WorkerHandle(isolatedDb);
      try {
        await w.request("hello", { generation: `gen-det-${i}` });
        const res = await w.request("interrupt", {
          reason: "cli_exit",
          currentWriterToken: 4,
          sessionState: { kind: "active" },
          now: "2026-09-04T14:00:00.000Z",
        });
        const result = res.result as {
          state: { kind: string };
          incidentEvent: BridgeEventV1;
          tokenInvalidated: number;
          duplicate: boolean;
        };
        await w.request("appendIncident", { event: result.incidentEvent });
        const verify = await w.request("verify", {});
        collected.push({
          stateKind: result.state.kind,
          duplicate: result.duplicate,
          tokenInvalidated: result.tokenInvalidated,
          createdAt: result.incidentEvent.created_at,
          chainedToGenesis: result.incidentEvent.previous_event_hash === GENESIS,
          verifyValid: (verify.result as { valid: boolean }).valid,
        });
      } finally {
        await w.endControl();
        await w.exitCode();
      }
    }
    const [a, b] = collected as [typeof collected[number], typeof collected[number]];
    expect(a).toEqual(b); // semantics identical; identifiers were NOT compared
  });
});

describe("prereq-c C2 worker — durable ordering", () => {
  test("sequential appends: strictly monotone sequence, order preserved, chain valid", async () => {
    const w = new WorkerHandle(dbPath);
    try {
      await w.request("hello", { generation: "gen-order" });
      const eventIds: string[] = [];
      for (let i = 0; i < 3; i++) {
        const event = makeEvent({ payload: { order: i } });
        eventIds.push(event.event_id);
        const res = await w.request("appendEvent", { event });
        expect(res.ok).toBe(true);
        expect((res.result as { row: { sequence: number } }).row.sequence).toBe(i + 1);
      }
      const rows = await w.request("rowsSince", { since: 0 });
      const list = (rows.result as { rows: Array<{ event_id: string; sequence: number }> }).rows;
      expect(list.map((r) => r.event_id)).toEqual(eventIds);
      expect(list.map((r) => r.sequence)).toEqual([1, 2, 3]);
      const verify = await w.request("verify", {});
      expect(verify.result).toMatchObject({ valid: true, count: 3 });
    } finally {
      await w.endControl();
      await w.exitCode();
    }
  });
});

describe("prereq-c C2 worker — storage failure fails closed", () => {
  test("duplicate event_id: real SQLite constraint failure, never success", async () => {
    const w = new WorkerHandle(dbPath);
    try {
      await w.request("hello", { generation: "gen-fault" });
      const event = makeEvent();
      const first = await w.request("appendEvent", { event });
      expect(first.ok).toBe(true);

      // Re-append the SAME event_id through the real ledger path:
      const probe = await w.request("storageFaultProbe", {
        kind: "duplicate_event_id",
        event,
      });
      expect(probe.ok).toBe(true);
      const result = probe.result as { faulted: boolean; error: string };
      expect(result.faulted).toBe(true);
      expect(result.error.toUpperCase()).toContain("UNIQUE");

      // The failed transaction left the durable state untouched:
      const verify = await w.request("verify", {});
      expect(verify.result).toMatchObject({ valid: true, count: 1 });

      // A plain appendEvent with the same id also fails closed:
      const dup = await w.request("appendEvent", { event });
      expect(dup.ok).toBe(false);
      expect(dup.error?.code).toBe("append_failed");
    } finally {
      await w.endControl();
      await w.exitCode();
    }
  });

  test("unknown probe kind fails closed", async () => {
    const w = new WorkerHandle(dbPath);
    try {
      await w.request("hello", { generation: "gen-probe-kind" });
      const res = await w.request("storageFaultProbe", { kind: "bogus", event: makeEvent() });
      expect(res.ok).toBe(false);
      expect(res.error?.code).toBe("request_invalid");
    } finally {
      await w.endControl();
      await w.exitCode();
    }
  });
});

describe("prereq-c C2 worker — transport failure fails closed", () => {
  test("undecodable frame payload: worker exits fail-closed (exit 2)", async () => {
    const w = new WorkerHandle(dbPath);
    const payload = Buffer.from("{not-json", "utf8");
    const frame = Buffer.alloc(4 + payload.byteLength);
    frame.writeUInt32BE(payload.byteLength, 0);
    payload.copy(frame, 4);
    await w.sendRaw(frame);
    expect(await w.exitCode()).toBe(2);
  });

  test("out-of-bounds frame length: worker exits fail-closed (exit 2)", async () => {
    const w = new WorkerHandle(dbPath);
    const frame = Buffer.alloc(4);
    frame.writeUInt32BE(0xffffffff, 0); // > 1 MiB guard
    await w.sendRaw(frame);
    expect(await w.exitCode()).toBe(2);
  });

  test("frame split across channel reads still decodes (deterministic framing)", async () => {
    const w = new WorkerHandle(dbPath);
    try {
      const hello = JSON.stringify({ id: 1, op: "hello", params: { generation: "gen-split" } });
      const payload = Buffer.from(hello, "utf8");
      const frame = Buffer.alloc(4 + payload.byteLength);
      frame.writeUInt32BE(payload.byteLength, 0);
      payload.copy(frame, 4);
      // Deliberately split the frame across two writes:
      const cut = Math.floor(frame.byteLength / 2);
      await w.sendRaw(Buffer.from(frame.subarray(0, cut)));
      await new Promise((r) => setTimeout(r, 50));
      await w.sendRaw(Buffer.from(frame.subarray(cut)));
      // The hello response can only arrive after BOTH halves were read:
      const helloResp = await w.readOneResponse();
      expect(helloResp.id).toBe(1);
      expect(helloResp.ok).toBe(true);
      expect(helloResp.generation).toBe("gen-split");
    } finally {
      await w.endControl();
      await w.exitCode();
    }
  });
});

describe("prereq-c C2 worker — control-channel EOF (worker-side parent death)", () => {
  test("closing the sole control-write end: worker observes EOF and exits 0", async () => {
    const w = new WorkerHandle(dbPath);
    await w.request("hello", { generation: "gen-eof" });
    await w.endControl();
    const code = await w.exitCode();
    expect(code).toBe(0);
    // No orphan: the process object is fully reaped by Bun.spawn.
  });

  test("diagnostics carry no credentials (scrubbed by construction)", async () => {
    const secretSentinel = "PREREQC-SECRET-DO-NOT-LEAK-8f3a";
    const w = new WorkerHandle(dbPath);
    try {
      await w.request("hello", { generation: "gen-scrub" });
      await w.request("appendEvent", { event: makeEvent() });
      // The worker never saw the sentinel (env carried only the db path);
      // assert the diagnostic stream cannot contain it anyway:
      expect(w.diagnostics()).not.toContain(secretSentinel);
      expect(w.diagnostics()).not.toContain("PREREQC_WORKER_DB_PATH=");
      // Diagnostics contain only operation markers and the startup marker:
      const lines = w.diagnostics().trim().split("\n");
      expect(lines.length).toBeGreaterThan(0);
      for (const line of lines) {
        const parsed = JSON.parse(line) as { worker: string; message: string };
        expect(parsed.worker).toBe("prereq-c-c2");
        expect(parsed.message.startsWith("op:") || parsed.message === "worker started").toBe(true);
      }
    } finally {
      await w.endControl();
      await w.exitCode();
    }
  });
});
