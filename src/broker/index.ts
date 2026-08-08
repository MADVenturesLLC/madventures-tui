// src/broker/index.ts
// Broker daemon entry point. Starts socket server, wires up state machine,
// ledger, inboxes, and transfer manager. Broadcasts state updates to TUI.

import { StateMachine } from "./state-machine";
import { Ledger } from "./ledger";
import { InboxManager } from "./inbox";
import { TransferManager } from "./transfer";
import { BrokerSocket } from "./socket";
import type { BrokerState, CliId } from "../shared/types";
import type { SocketMessage } from "../shared/protocol";

export class Broker {
  readonly state = new StateMachine();
  readonly ledger = new Ledger();
  readonly inboxes = new InboxManager();
  readonly transfers = new TransferManager();
  readonly socket = new BrokerSocket();

  async start(): Promise<void> {
    await this.socket.start();
    console.log(`[broker] listening on ${process.env.FOUNDER_TUI_SOCKET ?? "/tmp/founder-tui-broker.sock"}`);

    // Wire state machine changes to broadcast
    this.state.onChange(() => this.broadcastState());

    // Wire inbox changes to broadcast
    for (const cli of ["claude", "antigravity"] as CliId[]) {
      this.inboxes.subscribe(cli, () => this.broadcastState());
    }

    // Handle incoming socket messages (from TUI or adapters)
    this.socket.onMessage((msg: SocketMessage) => {
      switch (msg.kind) {
        case "subscribe":
          // Send full state on subscribe
          this.broadcastState();
          break;
        // Tool calls come through MCP, not socket — socket is for state sync
      }
    });

    // Append genesis entry
    await this.ledger.append("attest", "claude", { event: "broker-started" });
    this.broadcastState();
  }

  private broadcastState(): void {
    const state: BrokerState = {
      owner: this.state.current,
      inboxes: {
        claude: this.inboxes.get("claude"),
        antigravity: this.inboxes.get("antigravity"),
      },
      eventLog: this.ledger.recent(50),
      pendingApproval: null,
      pendingTransfer: this.transfers.current,
      queueDepth: this.inboxes.queueDepth(),
    };
    this.socket.broadcast({ kind: "state", state });
  }
}

// Entry point when run directly
if (import.meta.main) {
  const broker = new Broker();
  broker.start().catch((err) => {
    console.error("[broker] fatal:", err);
    process.exit(1);
  });
}
