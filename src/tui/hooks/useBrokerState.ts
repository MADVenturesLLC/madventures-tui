// src/tui/hooks/useBrokerState.ts
// Subscribes to the broker daemon over the Unix socket.
// Returns the live broker state for React to render declaratively.

import { useEffect, useState, useRef } from "react";
import type { BrokerState } from "../../shared/types";
import type { SocketMessage } from "../../shared/protocol";
import { BROKER_SOCKET_PATH } from "../../shared/protocol";

export function useBrokerState() {
  const [state, setState] = useState<BrokerState | null>(null);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Bun supports Unix sockets via Bun.connect or node:net.
    // For now we use a polling fallback that reads state via HTTP
    // from the broker. When the broker socket layer is built, this
    // will upgrade to a persistent Unix socket connection.
    //
    // TODO: replace with Unix socket subscriber when broker/socket.ts is live.

    let cancelled = false;
    const interval = setInterval(async () => {
      try {
        // Placeholder: broker will expose a state endpoint
        // For now just mark as disconnected so the UI renders the shell
        if (!cancelled) setConnected(false);
      } catch {
        if (!cancelled) setConnected(false);
      }
    }, 2000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { state, connected };
}
