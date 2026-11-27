import { expect, test } from "bun:test";
import type { BrokerClient, BrokerSnapshot as Source } from "@madventures/broker";
import { subscribeToClient } from "../../apps/madbridge/src/tui/live/subscribe";
import type { BrokerSnapshot } from "../../apps/madbridge/src/tui/types";
import { SNAPSHOT_INTERVAL_MS } from "../../packages/supervisor/src/snapshot-timer";
import { sparseSnapshot } from "./snapshot-input";

const active: Source = { ...sparseSnapshot, connected: true, phase: "active" };
const closed: Source = { ...sparseSnapshot, connected: false, phase: "closed" };
const invalid = { ...active, phase: "invalid" } as unknown as Source;
const readFailure = () => { throw new Error("synthetic refusal"); };

function stream(read: (index: number) => Source | Promise<Source>) {
  let count = 0;
  const getSnapshot = async () => read(count++);
  const client: BrokerClient = {
    getSnapshot,
    async *snapshots() {
      for (;;) {
        const snapshot = await getSnapshot();
        if (snapshot.connected === false) return;
        yield snapshot;
      }
    },
    async *output() {}, request: readFailure, publish: readFailure, close: readFailure,
  };
  return { client, reads: () => count };
}

async function until(predicate: () => boolean) {
  const deadline = performance.now() + 3000;
  while (!predicate()) {
    if (performance.now() >= deadline) throw new Error("synthetic stream deadline");
    await Bun.sleep(5);
  }
  await Promise.resolve();
}

test("subscription gives the first, changed and closed projections exactly once", async () => {
  const frames = [active, { ...active, snapshotSeq: 2, ledgerSeq: 7 },
    { ...active, phase: "paused" as const, queueDepth: 3 }, closed];
  const source = stream(i => frames[i] ?? closed);
  const seen: BrokerSnapshot[] = [];
  const off = subscribeToClient(source.client)(frame => { seen.push(frame); });
  try {
    expect(source.reads()).toBe(1);
    await until(() => seen.length > 0);
    expect(source.reads()).toBe(1);
    await until(() => source.reads() >= 4);
    await Bun.sleep(SNAPSHOT_INTERVAL_MS + 30);
    expect(seen.map(s => [s.sessionState, s.connected, s.queueDepth])).toEqual([
      ["active", true, null], ["paused", true, 3], ["closed", false, null],
    ]);
    expect(source.reads()).toBe(4);
  } finally { off(); }
});

test("mapping and read failures end delivery from the last projection", async () => {
  for (const fail of [() => invalid, readFailure]) {
    const source = stream(i => i === 0 ? active : i === 1 ? fail() : closed);
    const seen: BrokerSnapshot[] = [];
    const off = subscribeToClient(source.client)(frame => { seen.push(frame); });
    try {
      await until(() => source.reads() >= 2);
      await Bun.sleep(SNAPSHOT_INTERVAL_MS + 30);
      expect(seen).toHaveLength(2);
      expect(seen[0]?.connected).toBe(true);
      expect(seen[1]).toEqual({ ...seen[0]!, connected: false });
      expect(source.reads()).toBe(2);
    } finally { off(); }
  }
});

test("a first failure gives no projection", async () => {
  for (const fail of [() => invalid, readFailure]) {
    const source = stream(i => i === 0 ? fail() : closed);
    const seen: BrokerSnapshot[] = [];
    const off = subscribeToClient(source.client)(frame => { seen.push(frame); });
    try {
      await Bun.sleep(SNAPSHOT_INTERVAL_MS + 30);
      expect(seen).toEqual([]);
      expect(source.reads()).toBe(1);
    } finally { off(); }
  }
});

test("unsubscribe cancels pacing and suppresses in-flight delivery", async () => {
  const source = stream(() => active);
  const seen: BrokerSnapshot[] = [];
  const off = subscribeToClient(source.client)(frame => { seen.push(frame); });
  try { await until(() => seen.length > 0); } finally { off(); }
  await Bun.sleep(SNAPSHOT_INTERVAL_MS + 30);
  expect(source.reads()).toBe(1);
  expect(seen).toHaveLength(1);

  const held = Promise.withResolvers<Source>();
  const parked = stream(() => held.promise);
  const late: BrokerSnapshot[] = [];
  const stop = subscribeToClient(parked.client)(frame => { late.push(frame); });
  expect(parked.reads()).toBe(1);
  stop();
  held.resolve(active);
  await Bun.sleep(SNAPSHOT_INTERVAL_MS + 30);
  expect(parked.reads()).toBe(1);
  expect(late).toEqual([]);
});
