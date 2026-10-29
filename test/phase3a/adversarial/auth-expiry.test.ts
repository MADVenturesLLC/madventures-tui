import { expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { join } from "node:path";
import * as harness from "../runtime-harness";

function events(session: harness.HarnessSession): Record<string, any>[] {
  const db = new Database(join(session.storage.ledgerDir, "ledger.sqlite3"), { readonly: true });
  try { return (db.query("SELECT event_json FROM events ORDER BY sequence").all() as { event_json: string }[]).map(row => JSON.parse(row.event_json)); }
  finally { db.close(); }
}
async function expired(session: harness.HarnessSession): Promise<void> {
  const started = performance.now();
  while (((await session.client.getSnapshot()).phase !== "closed" || harness.fixtureFaultReport(session).deathMs === 0)
    && performance.now() - started < 5000) await Bun.sleep(5);
  expect((await session.client.getSnapshot()).phase).toBe("closed");
  expect((await session.client.getSnapshot()).tokenState).toBe("invalidated");
  expect(events(session).find(event => event.event_type === "session_interrupted")?.reason_code).toBe("authentication_expired");
  const data = harness.fixtureFaultReport(session);
  console.log(`auth_expiry ${JSON.stringify(data)}`);
  expect(data.authExpired).toBe(true);
  expect(data.deathMs).toBeLessThanOrEqual(5000);
}
test("mid-session authentication expiry interrupts with authentication_expired", async () => {
  const session = await harness.startFixtureSession({ expireAuthAfter: 150 });
  try { expect((await session.client.getSnapshot()).phase).toBe("active"); await expired(session); }
  finally { await session.close(); }
}, 15000);
test("recovery requires a new envelope and a new session, not a resume", async () => {
  const session = await harness.startFixtureSession({ expireAuthAfter: 150 });
  let replacement: harness.HarnessSession | undefined;
  try {
    const initial = await session.client.getSnapshot();
    await expired(session);
    expect(await session.client.request({ kind: "session_resume", commandId: crypto.randomUUID(), sessionId: initial.sessionId }))
      .toMatchObject({ ok: false, error: "session_not_writable" });
    replacement = await harness.startFixtureSession();
    const fresh = await replacement.client.getSnapshot();
    expect(fresh.phase).toBe("active");
    expect(fresh.sessionId).not.toBe(initial.sessionId);
    expect(events(replacement)[0]!.task_envelope_hash).not.toBe(events(session)[0]!.task_envelope_hash);
  } finally { await replacement?.close(); await session.close(); }
}, 15000);
