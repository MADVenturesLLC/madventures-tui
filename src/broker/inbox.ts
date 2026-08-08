// broker/inbox.ts
// Per-CLI message inboxes with acknowledgment (F5).

import type { CliId, Message } from "../shared/types";

type InboxListener = (message: Message) => void;

export class InboxManager {
  private inboxes: Record<CliId, Message[]> = {
    claude: [],
    antigravity: [],
  };
  private listeners: Record<CliId, InboxListener[]> = {
    claude: [],
    antigravity: [],
  };

  send(from: CliId, to: CliId, content: string, taskId: string): Message {
    const message: Message = {
      id: crypto.randomUUID(),
      from,
      to,
      content,
      timestamp: Date.now(),
      acknowledged: false,
      acknowledgedAt: null,
    };
    this.inboxes[to].push(message);
    this.listeners[to].forEach((fn) => fn(message));
    return message;
  }

  get(cli: CliId): Message[] {
    return [...this.inboxes[cli]];
  }

  /**
   * F5: Acknowledge receipt of a message.
   * Broker marks it as delivered/acknowledged.
   */
  acknowledge(cli: CliId, messageId: string): boolean {
    const msg = this.inboxes[cli].find((m) => m.id === messageId);
    if (!msg || msg.acknowledged) return false;
    msg.acknowledged = true;
    msg.acknowledgedAt = Date.now();
    return true;
  }

  subscribe(cli: CliId, fn: InboxListener): () => void {
    this.listeners[cli].push(fn);
    return () => {
      this.listeners[cli] = this.listeners[cli].filter((l) => l !== fn);
    };
  }

  /**
   * Queue depth = unacknowledged messages across both inboxes.
   */
  queueDepth(): number {
    return (
      this.inboxes.claude.filter((m) => !m.acknowledged).length +
      this.inboxes.antigravity.filter((m) => !m.acknowledged).length
    );
  }
}
