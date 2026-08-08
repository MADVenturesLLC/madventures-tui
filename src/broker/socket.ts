// src/broker/socket.ts
// Unix-domain socket server. Subscribers connect and receive state updates.
// Uses Bun's built net listen API.

import type { SocketMessage } from "../shared/protocol";
import { BROKER_SOCKET_PATH } from "../shared/protocol";

type MessageHandler = (msg: SocketMessage) => void;
type ClientSocket = { write: (data: string) => void; close: () => void };

export class BrokerSocket {
  private clients = new Set<ClientSocket>();
  private handlers: MessageHandler[] = [];
  private listening = false;

  async start(): Promise<void> {
    // Clean up stale socket file
    try {
      await Bun.file(BROKER_SOCKET_PATH).exists() &&
        (await import("fs/promises")).unlink(BROKER_SOCKET_PATH);
    } catch {
      // ignore
    }

    const server = Bun.listen({
      unix: BROKER_SOCKET_PATH,
      socket: {
        data: (socket: ClientSocket, data: Buffer) => {
          const text = new TextDecoder().decode(data);
          for (const line of text.split("\n")) {
            if (!line.trim()) continue;
            try {
              const msg = JSON.parse(line) as SocketMessage;
              this.handlers.forEach((h) => h(msg));
            } catch {
              // ignore malformed input
            }
          }
        },
        open: (socket: ClientSocket) => {
          this.clients.add(socket);
        },
        close: (socket: ClientSocket) => {
          this.clients.delete(socket);
        },
      },
    });

    this.listening = true;
    void server; // keep reference alive
  }

  broadcast(msg: SocketMessage): void {
    const text = JSON.stringify(msg) + "\n";
    for (const client of this.clients) {
      client.write(text);
    }
  }

  onMessage(handler: MessageHandler): () => void {
    this.handlers.push(handler);
    return () => {
      this.handlers = this.handlers.filter((h) => h !== handler);
    };
  }

  get isListening(): boolean {
    return this.listening;
  }
}
