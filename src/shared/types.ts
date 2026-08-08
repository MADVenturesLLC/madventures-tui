// shared/types.ts
// Core domain types — used by broker, MCP server, adapters, and TUI.
// Framework-independent: no React, no OpenTUI imports.

export type CliId = "claude" | "antigravity";

export type OwnerState =
  | "idle"          // No active writer
  | "writing"       // A CLI holds the lease and is producing
  | "paused"        // Disconnected mid-write, awaiting re-attestation
  | "transferring"; // Transfer requested, awaiting acceptance

export type LeaseState =
  | { status: "free" }
  | { status: "held"; holder: CliId; since: number; attested: boolean }
  | { status: "paused"; holder: CliId; lastVerifiedCode: string; interrupted: number }
  | { status: "transferring"; from: CliId; to: CliId; requested: number };

export interface BrokerState {
  owner: LeaseState;
  inboxes: Record<CliId, Message[]>;
  eventLog: LedgerEntry[];
  pendingApproval: ApprovalRequest | null;
  pendingTransfer: TransferRequest | null;
  queueDepth: number;
}

export interface Message {
  id: string;
  from: CliId;
  to: CliId;
  content: string;
  timestamp: number;
  delivered: boolean;
}

export interface LedgerEntry {
  seq: number;
  type: "write" | "transfer" | "attest" | "interrupt" | "message";
  actor: CliId;
  payload: Record<string, unknown>;
  prevHash: string;
  hash: string;
  timestamp: number;
}

export interface Attestation {
  actor: CliId;
  codeHash: string;
  timestamp: number;
  signature: string;
}

export interface TransferRequest {
  id: string;
  from: CliId;
  to: CliId;
  reason: string;
  timestamp: number;
  lastVerifiedCode: string;
}

export interface ApprovalRequest {
  id: string;
  type: "transfer" | "attestation" | "resume";
  requestedBy: CliId;
  detail: string;
  timestamp: number;
}
