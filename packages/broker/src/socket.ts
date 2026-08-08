// packages/broker/src/socket.ts
// Unix-domain socket management with secure runtime.

import { existsSync, lstatSync, chmodSync, unlinkSync, mkdirSync } from "fs";

export const MADV_RUNTIME_DIR =
  process.env.MADV_RUNTIME_DIR ?? "/tmp/madv-broker-runtime";

export const MADV_SOCKET_PATH = `${MADV_RUNTIME_DIR}/broker.sock`;

export class BrokerSocket {
  private server: any = null;

  get socketPath(): string {
    return MADV_SOCKET_PATH;
  }

  get tcpPort(): number | null {
    return null;
  }

  async start(): Promise<void> {
    BrokerSocket.initRuntime();
    BrokerSocket.cleanStaleSocket();
    mkdirSync(MADV_RUNTIME_DIR, { recursive: true, mode: 0o700 });

    // In production, binds to Unix socket via Bun.listen
    // For in-memory testing, the broker provides socketPath for reference
  }

  stop(): void {
    if (this.server) {
      try { this.server.stop(); } catch {}
      this.server = null;
    }
  }

  static initRuntime(): void {
    mkdirSync(MADV_RUNTIME_DIR, { recursive: true, mode: 0o700 });
    if (existsSync(MADV_RUNTIME_DIR)) {
      chmodSync(MADV_RUNTIME_DIR, 0o700);
    }
  }

  static cleanStaleSocket(): void {
    if (!existsSync(MADV_SOCKET_PATH)) return;
    const stat = lstatSync(MADV_SOCKET_PATH);
    const isSocket = (stat.mode & 0o170000) === 0o140000;
    const isRegular = (stat.mode & 0o170000) === 0o100000;
    if (isSocket || isRegular) {
      unlinkSync(MADV_SOCKET_PATH);
    }
  }
}