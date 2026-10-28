import { expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { dirname } from "node:path";
import type { BrokerSnapshot, OutputFrame } from "../../packages/broker/src/client";
import { startFixtureSession } from "./runtime-harness";

async function nextFrame(output: AsyncIterator<OutputFrame>): Promise<OutputFrame> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const frame = await Promise.race([
      output.next(),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error("Timed out waiting for fixture output frame")), 2_000);
      }),
    ]);
    expect(frame.done).toBe(false);
    return frame.value!;
  } finally { clearTimeout(timer); }
}

async function ready(output: AsyncIterator<OutputFrame>): Promise<void> {
  let text = "";
  while (!text.includes("FIXTURE_READY\r\n")) text += new TextDecoder().decode((await nextFrame(output)).bytes);
  expect(text).toBe("FIXTURE_READY\r\n");
}

function alive(pid: number): boolean {
  try { process.kill(pid, 0); return true; }
  catch (error) { if ((error as NodeJS.ErrnoException).code === "ESRCH") return false; throw error; }
}

function expectReaped(snapshot: BrokerSnapshot): void {
  expect(snapshot.executions).toHaveLength(2);
  for (const execution of snapshot.executions!) {
    for (const pid of [execution.hostPid, execution.childPid, execution.processGroupId]) {
      expect(pid).not.toBeNull();
      expect(alive(pid!)).toBe(false);
    }
    expect(alive(-execution.processGroupId!)).toBe(false);
  }
}

test("a fixture session reaches active with a valid token and two ready executions", async () => {
  const session = await startFixtureSession();
  try {
    expect(Object.keys(session).sort()).toEqual(["client", "close", "interrupt", "storage"]);
    const snapshot = await session.client.getSnapshot();
    expect(snapshot.phase).toBe("active");
    expect(snapshot.tokenState).toBe("valid");
    expect(Number.isSafeInteger(snapshot.fencingToken)).toBe(true);
    expect(snapshot.fencingToken!).toBeGreaterThan(0);
    expect(snapshot.executions?.map(execution => [execution.identity.execution_id, execution.state]))
      .toEqual([["builder", "ready"], ["reviewer", "ready"]]);
    expect(snapshot.activeWriterExecutionId).toBe("builder");
  } finally { await session.close(); }
}, 15_000);

test("exact bytes written through pty_input are echoed on the output stream", async () => {
  const session = await startFixtureSession();
  const output = session.client.output("builder")[Symbol.asyncIterator]();
  try {
    await ready(output);
    const snapshot = await session.client.getSnapshot();
    const bytes = new Uint8Array([0x00, 0x1b, 0xff, 0x41, 0x7f, 0x80]);
    expect((await session.client.request({ kind: "pty_input", commandId: crypto.randomUUID(),
      sessionId: snapshot.sessionId, executionId: "builder", fencingToken: snapshot.fencingToken!, bytes })).ok).toBe(true);
    const received: number[] = [];
    let sequence = 0;
    while (received.length < bytes.length) {
      const frame = await nextFrame(output);
      expect(frame.sessionId).toBe(snapshot.sessionId);
      expect(frame.executionId).toBe("builder");
      expect(frame.outputSeq).toBeGreaterThan(sequence);
      sequence = frame.outputSeq;
      received.push(...frame.bytes);
    }
    expect(new Uint8Array(received)).toEqual(bytes);
  } finally { await output.return?.(); await session.close(); }
}, 15_000);

test("pty_resize propagates the exact cols and rows to the child", async () => {
  const session = await startFixtureSession();
  const output = session.client.output("builder")[Symbol.asyncIterator]();
  try {
    await ready(output);
    const snapshot = await session.client.getSnapshot();
    const cols = 113, rows = 37;
    expect((await session.client.request({ kind: "pty_resize", commandId: crypto.randomUUID(),
      sessionId: snapshot.sessionId, executionId: "builder", fencingToken: snapshot.fencingToken!, cols, rows })).ok).toBe(true);
    let report = "";
    while (!report.endsWith("\n")) report += new TextDecoder().decode((await nextFrame(output)).bytes);
    expect(report).toBe(`FIXTURE_RESIZE ${cols} ${rows}\r\n`);
  } finally { await output.return?.(); await session.close(); }
}, 15_000);

test("session_pause then session_resume returns to active without changing the token", async () => {
  const session = await startFixtureSession();
  try {
    const initial = await session.client.getSnapshot();
    expect((await session.client.request({ kind: "session_pause", commandId: crypto.randomUUID(),
      sessionId: initial.sessionId, reason: "fixture pause" })).ok).toBe(true);
    const paused = await session.client.getSnapshot();
    expect(paused.phase).toBe("paused");
    expect(paused.fencingToken).toBe(initial.fencingToken);
    expect(paused.tokenState).toBe("valid");
    expect((await session.client.request({ kind: "session_resume", commandId: crypto.randomUUID(),
      sessionId: initial.sessionId })).ok).toBe(true);
    const resumed = await session.client.getSnapshot();
    expect(resumed.phase).toBe("active");
    expect(resumed.fencingToken).toBe(initial.fencingToken);
    expect(resumed.tokenState).toBe("valid");
    expect(resumed.snapshotSeq!).toBeGreaterThan(paused.snapshotSeq!);
  } finally { await session.close(); }
}, 15_000);

test("Founder session_close produces closing, invalidation, then closed", async () => {
  const session = await startFixtureSession();
  try {
    const initial = await session.client.getSnapshot();
    expect(existsSync(session.storage.sessionDir)).toBe(true);
    expect((await session.client.request({ kind: "session_close", commandId: crypto.randomUUID(),
      sessionId: initial.sessionId, reason: "fixture close" })).ok).toBe(true);
    const closed = await session.client.getSnapshot();
    expect(closed.eventLog.slice(-3).map(event => event.type))
      .toEqual(["session_closing", "fencing_token_invalidated", "session_closed"]);
    expect(closed.phase).toBe("closed");
    expect(closed.tokenState).toBe("invalidated");
    expectReaped(initial);
    await session.close();
    expect(existsSync(dirname(session.storage.root))).toBe(false);
  } finally { await session.close(); }
}, 15_000);

test("a typed interruption ends the session and closes client streams", async () => {
  const session = await startFixtureSession();
  const output = session.client.output("builder")[Symbol.asyncIterator]();
  try {
    await ready(output);
    const initial = await session.client.getSnapshot();
    const pending = output.next();
    await session.interrupt("pty_host_failure");
    const snapshot = await session.client.getSnapshot();
    expect(snapshot.eventLog.slice(-4).map(event => event.type))
      .toEqual(["session_interrupted", "fencing_token_invalidated", "session_closing", "session_closed"]);
    expect(snapshot.phase).toBe("closed");
    expect(snapshot.tokenState).toBe("invalidated");
    expect(snapshot.connected).toBe(false);
    expect((await pending).done).toBe(true);
    expect((await output.next()).done).toBe(true);
    expectReaped(initial);
  } finally { await output.return?.(); await session.close(); }
  expect(existsSync(dirname(session.storage.root))).toBe(false);
}, 15_000);
