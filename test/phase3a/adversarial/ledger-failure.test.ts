import { expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { Ledger } from "@madventures/ledger";
import { planPrefixCompletion, replayDurablePrefix } from "../../../packages/broker/src/next-start-reconciliation";
import * as harness from "../runtime-harness";

function events(session: harness.HarnessSession): Record<string, any>[] {
  const db = new Database(join(session.storage.ledgerDir, "ledger.sqlite3"), { readonly: true });
  try { return (db.query("SELECT event_json FROM events ORDER BY sequence").all() as { event_json: string }[]).map(row => JSON.parse(row.event_json)); }
  finally { db.close(); }
}

test("a mid-session append failure interrupts with ledger_write_failed", async () => {
  let session: harness.HarnessSession;
  try { session = await harness.startFixtureSession({ failLedgerAppendAfter: 1 }); }
  catch (error) {
    if (!(error instanceof Error) || error.message !== "InvalidHarnessOptions") throw error;
    // RED still exercises successful real appends when the switch is absent.
    session = await harness.startFixtureSession();
  }
  try {
    const initial = await session.client.getSnapshot();
    expect(initial.phase).toBe("active");
    expect((await session.client.request({ kind: "session_pause", commandId: crypto.randomUUID(), sessionId: initial.sessionId, reason: "fixture append check" })).ok).toBe(true);
    expect((await session.client.request({ kind: "session_resume", commandId: crypto.randomUUID(), sessionId: initial.sessionId })).ok).toBe(true);
    expect(events(session).some(event => event.event_type === "session_resumed")).toBe(true);
    const started = performance.now();
    while ((await session.client.getSnapshot()).phase !== "closed" && performance.now() - started < 5000) await Bun.sleep(5);
    const snapshot = await session.client.getSnapshot();
    expect(snapshot.phase).toBe("closed");
    expect(snapshot.tokenState).toBe("invalidated");
    expect(events(session).find(event => event.event_type === "session_interrupted")?.reason_code).toBe("ledger_write_failed");
    const data = harness.fixtureFaultReport(session);
    console.log(`ledger_failure ${JSON.stringify(data)}`);
    expect(data.publicationError).toBe("ledger_write_failed");
    expect(data.sqliteCode).toBe("SQLITE_READONLY");
    expect(data.deathMs).toBeLessThanOrEqual(5000);
  } finally { await session.close(); }
}, 15000);

test("an unrecordable interruption is completed by next-start reconciliation", async () => {
  const session = await harness.startFixtureSession({ failLedgerAppendAfter: "persistent", retainStorage: true });
  try {
    const started = performance.now();
    while (harness.fixtureFaultReport(session).deathMs === 0 && performance.now() - started < 5000) await Bun.sleep(5);
    console.log(`unrecordable_ledger ${JSON.stringify(harness.fixtureFaultReport(session))}`);
    expect(harness.fixtureFaultReport(session).publicationError).toBe("ledger_write_failed");
    expect(harness.fixtureResidualReport().livePids).toEqual([]);
    expect(events(session).some(event => event.event_type === "session_interrupted")).toBe(false);
    await session.close();
    const ledger = new Ledger(join(session.storage.ledgerDir, "ledger.sqlite3"));
    try {
      const rows = ledger.readAfter(0), first = JSON.parse(rows[0]!.event_json), last = rows.at(-1)!;
      expect(replayDurablePrefix(rows).phase).toBe("active");
      const completion = planPrefixCompletion(replayDurablePrefix(rows), {
        taskEnvelopeHash: first.task_envelope_hash, repositoryFingerprint: first.repository_fingerprint,
        previousEventHash: last.event_hash, lastDurableEventId: last.event_id,
        createdAt: new Date().toISOString(), eventIds: Array.from({ length: 4 }, () => crypto.randomUUID()),
        governedProcessesGone: true, founderCommandId: null,
      });
      expect(completion.map(event => event.event_type)).toEqual(["session_unclean_closure", "fencing_token_invalidated"]);
      ledger.appendMany(completion);
      expect(replayDurablePrefix(ledger.readAfter(0)).phase).toBe("closed");
      expect(replayDurablePrefix(ledger.readAfter(0)).tokenState).toBe("invalidated");
      expect(ledger.verify().valid).toBe(true);
    } finally { ledger.close(); }
    expect(harness.fixtureResidualReport().liveTokens).toBe(0);
  } finally { await session.close(); rmSync(dirname(session.storage.root), { recursive: true }); }
}, 15000);
