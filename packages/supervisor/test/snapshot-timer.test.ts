import { expect, test } from "bun:test";
import { getEventListeners } from "node:events";
import { waitForSnapshotTick } from "../src/index";
import { SNAPSHOT_INTERVAL_MS } from "../src/snapshot-timer";

test("the snapshot wait paces reads and settles promptly on cancellation", async () => {
  const controller = new AbortController();
  const { signal } = controller;
  const start = performance.now();
  const stream = ["first"];
  const tick = waitForSnapshotTick(signal).then(() => { stream.push("next"); });
  expect(SNAPSHOT_INTERVAL_MS).toBe(100);
  expect(getEventListeners(signal, "abort")).toHaveLength(1);
  await Promise.resolve();
  expect(stream).toEqual(["first"]);
  await tick;
  expect(performance.now() - start).toBeGreaterThanOrEqual(95);
  expect(stream).toEqual(["first", "next"]);
  expect(getEventListeners(signal, "abort")).toHaveLength(0);

  let cancelled = false;
  const pending = waitForSnapshotTick(signal).then(() => { cancelled = true; });
  controller.abort();
  await Promise.resolve();
  expect(cancelled).toBe(true);
  await pending;
  await waitForSnapshotTick(signal);
  expect(getEventListeners(signal, "abort")).toHaveLength(0);
});
