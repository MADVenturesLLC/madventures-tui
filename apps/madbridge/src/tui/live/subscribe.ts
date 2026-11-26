import type { BrokerClient } from "@madventures/broker";
import { isDeepStrictEqual } from "node:util";
import { waitForSnapshotTick } from "../../../../../packages/supervisor/src/index";
import type { BrokerSnapshot } from "../types";
import { clientSnapshotToProjection } from "./projection";

export function subscribeToClient(client: BrokerClient) {
  return (listener: (projection: BrokerSnapshot) => void): (() => void) => {
    const controller = new AbortController();
    const { signal } = controller;
    let last: BrokerSnapshot | undefined;

    async function read(): Promise<void> {
      while (!signal.aborted) {
        let next: BrokerSnapshot;
        try {
          const snapshot = await client.getSnapshot();
          if (signal.aborted) return;
          next = clientSnapshotToProjection(snapshot);
        } catch {
          if (last && !signal.aborted) listener({ ...last, connected: false });
          return;
        }

        const closed = next.connected === false;
        if (closed || !isDeepStrictEqual(last, next)) {
          last = next;
          listener(next);
        }
        if (closed || signal.aborted) return;
        await waitForSnapshotTick(signal);
      }
    }

    // A listener that throws also ends its own subscription.
    void read().catch(() => controller.abort());
    return () => controller.abort();
  };
}
