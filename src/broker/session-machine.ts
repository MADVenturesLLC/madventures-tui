// broker/session-machine.ts
// Session lifecycle state machine (F3: separated from ownership).
//
// starting → active → paused/interrupted → reconciling → active → closed
//
// Session tracks the CLI process and code state. Ownership is separate.

import type { CliId, SessionState, SessionStatus } from "../shared/types";

export class SessionMachine {
  private sessions: Record<CliId, SessionState> = {
    claude: {
      cli: "claude",
      status: "starting",
      startedAt: 0,
      lastActive: 0,
      pid: null,
      ptyFd: null,
      lastVerifiedCode: null,
      interruptedAt: null,
    },
    antigravity: {
      cli: "antigravity",
      status: "starting",
      startedAt: 0,
      lastActive: 0,
      pid: null,
      ptyFd: null,
      lastVerifiedCode: null,
      interruptedAt: null,
    },
  };

  private listeners: Array<(cli: CliId, state: SessionState) => void> = [];

  get(cli: CliId): SessionState {
    return { ...this.sessions[cli] };
  }

  getAll(): Record<CliId, SessionState> {
    return {
      claude: this.get("claude"),
      antigravity: this.get("antigravity"),
    };
  }

  onChange(fn: (cli: CliId, state: SessionState) => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private transition(cli: CliId, next: Partial<SessionState>): void {
    this.sessions[cli] = { ...this.sessions[cli], ...next };
    for (const fn of this.listeners) fn(cli, this.get(cli));
  }

  start(cli: CliId, pid: number, ptyFd: number): void {
    const now = Date.now();
    this.transition(cli, {
      status: "active",
      startedAt: now,
      lastActive: now,
      pid,
      ptyFd,
      interruptedAt: null,
    });
  }

  pause(cli: CliId, lastVerifiedCode: string): void {
    this.transition(cli, {
      status: "paused",
      lastVerifiedCode,
      interruptedAt: Date.now(),
    });
  }

  reconcile(cli: CliId): void {
    this.transition(cli, { status: "reconciling" });
  }

  resume(cli: CliId): void {
    this.transition(cli, {
      status: "active",
      lastActive: Date.now(),
      interruptedAt: null,
    });
  }

  close(cli: CliId): void {
    this.transition(cli, {
      status: "closed",
      pid: null,
      ptyFd: null,
    });
  }

  touch(cli: CliId): void {
    if (this.sessions[cli].status === "active") {
      this.transition(cli, { lastActive: Date.now() });
    }
  }

  setVerifiedCode(cli: CliId, codeHash: string): void {
    this.transition(cli, { lastVerifiedCode: codeHash });
  }

  isAlive(cli: CliId): boolean {
    const status = this.sessions[cli].status;
    return status === "active" || status === "reconciling";
  }
}
