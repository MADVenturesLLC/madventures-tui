// src/broker/index.ts
// Broker daemon entry point. Wires ownership + session machines, ledger,
// approval manager, inboxes, transfers, and socket. Broadcasts state.

import { OwnershipMachine } from "./ownership-machine";
import { SessionMachine } from "./session-machine";
import { Ledger } from "./ledger";
import { InboxManager } from "./inbox";
import { TransferManager } from "./transfer";
import { ApprovalManager } from "./approval";
import { BrokerSocket } from "./socket";
import { Runtime } from "./runtime";
import type { BrokerState, CliId } from "../shared/types";
import type { SocketMessage } from "../shared/protocol";

export class Broker {
  readonly ownership = new OwnershipMachine();
  readonly sessions = new SessionMachine();
  readonly ledger = new Ledger();
  readonly inboxes = new InboxManager();
  readonly transfers = new TransferManager(this.ownership, this.sessions);
  readonly approvals = new ApprovalManager(this.ledger);
  readonly socket = new BrokerSocket();

  async start(): Promise<void> {
    // F4: secure runtime
    Runtime.init();
    Runtime.cleanStaleSocket();
    await this.socket.start();
    Runtime.secureSocket();

    console.log(`[broker] listening on ${Runtime.socket}`);

    // Wire state changes to broadcast
    this.ownership.onChange(() => this.broadcastState());
    this.sessions.onChange(() => this.broadcastState());
    this.approvals.onChange(() => this.broadcastState());

    for (const cli of ["claude", "antigravity"] as CliId[]) {
      this.inboxes.subscribe(cli, () => this.broadcastState());
    }

    // Handle incoming socket messages
    this.socket.onMessage((msg: SocketMessage) => {
      switch (msg.kind) {
        case "subscribe":
          this.broadcastState();
          break;
      }
    });

    // Genesis ledger entry
    await this.ledger.append("session-start", "claude", {
      event: "broker-started",
      runtimeDir: Runtime.dir,
    });
    this.broadcastState();
  }

  private broadcastState(): void {
    const state: BrokerState = {
      ownership: this.ownership.current,
      sessions: this.sessions.getAll(),
      inboxes: {
        claude: this.inboxes.get("claude"),
        antigravity: this.inboxes.get("antigravity"),
      },
      eventLog: this.ledger.recent(50),
      pendingApprovals: this.approvals.pendingList,
      pendingTransfers: this.transfers.isPending ? [this.transfers.current!] : [],
      artifacts: [],
      queueDepth: this.inboxes.queueDepth(),
      fencingToken: this.ownership.token,
    };
    this.socket.broadcast({ kind: "state", state });
  }
}

if (import.meta.main) {
  const broker = new Broker();
  broker.start().catch((err) => {
    console.error("[broker] fatal:", err);
    process.exit(1);
  });
}
