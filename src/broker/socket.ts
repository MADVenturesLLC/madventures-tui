// broker/socket.ts
// Unix-domain socket server with secure runtime (F4).
// Socket is 0600 in a 0700 Founder-owned directory.

import type { SocketMessage } from "../shared/protocol";
import { SOCKET_PATH } from "../shared/protocol";
import { Runtime } from "./runtime";

type MessageHandler = (msg: SocketMessage) => void;
type ClientSocket = { write: (data: string) => void; close: () => void };

export class BrokerSocket {
  private clients = new Set<ClientSocket>();
  private handlers: MessageHandler[] = [];
  private listening = false;

  async start(): Promise<void> {
    // F4: secure runtime setup
    Runtime.init();
    Runtime.cleanStaleSocket();

    const server = Bun.listen({
      unix: SOCKET_PATH,
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

    // F4: secure the socket file to 0600
    Runtime.secureSocket();

    this.listening = true;
    void server;
  }

  broadcast(msg: SocketMessage): void {
    const text = JSON.stringify(msg) + "\n";
    for (const client of Array.from(this.clients)) {
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
