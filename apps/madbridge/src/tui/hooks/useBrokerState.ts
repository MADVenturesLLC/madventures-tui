// apps/madbridge/src/tui/hooks/useBrokerState.ts
// Subscribes to immutable broker snapshots.
// The hook receives state from the broker — it never creates authority,
// permissions, ownership, evidence acceptance, hashing, or recovery.
// React is presentation only.

import { useState, useEffect, useCallback, useRef } from "react";
import type { BrokerSnapshot } from "../types";

export interface BrokerStateHook {
  readonly state: BrokerSnapshot | null;
  readonly connected: boolean;
  readonly subscribe: (listener: (snapshot: BrokerSnapshot) => void) => () => void;
}

/**
 * useBrokerState subscribes to immutable broker snapshots.
 * The broker owns all authority — this hook only reads state for rendering.
 */
export function useBrokerState(
  externalSubscribe?: (listener: (snapshot: BrokerSnapshot) => void) => () => void,
): BrokerStateHook {
  const [state, setState] = useState<BrokerSnapshot | null>(null);
  const [connected, setConnected] = useState(false);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!externalSubscribe) {
      // No broker connection configured — render shell only
      return;
    }

    const unsubscribe = externalSubscribe((snapshot: BrokerSnapshot) => {
      setState(snapshot);
      setConnected(snapshot.connected);
    });
    unsubscribeRef.current = unsubscribe;

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [externalSubscribe]);

  const subscribe = useCallback(
    (listener: (snapshot: BrokerSnapshot) => void) => {
      if (!externalSubscribe) return () => {};
      return externalSubscribe(listener);
    },
    [externalSubscribe],
  );

  return { state, connected, subscribe };
}
