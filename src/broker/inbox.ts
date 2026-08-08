// src/broker/inbox.ts
// Per-CLI message inboxes. Event-driven: notify subscribers on new messages.

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

  send(from: CliId, to: CliId, content: string): Message {
    const message: Message = {
      id: crypto.randomUUID(),
      from,
      to,
      content,
      timestamp: Date.now(),
      delivered: false,
    };
    this.inboxes[to].push(message);
    this.listeners[to].forEach((fn) => fn(message));
    return message;
  }

  get(cli: CliId): Message[] {
    return [...this.inboxes[cli]];
  }

  markDelivered(cli: CliId, messageId: string): void {
    const msg = this.inboxes[cli].find((m) => m.id === messageId);
    if (msg) msg.delivered = true;
  }

  subscribe(cli: CliId, fn: InboxListener): () => void {
    this.listeners[cli].push(fn);
    return () => {
      this.listeners[cli] = this.listeners[cli].filter((l) => l !== fn);
    };
  }

  queueDepth(): number {
    return this.inboxes.claude.length + this.inboxes.antigravity.length;
  }
}
