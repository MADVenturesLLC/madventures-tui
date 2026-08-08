// shared/protocol.ts
// Socket message protocol + MCP tool contract.
// Both CLIs call MCP tools; TUI subscribes to state over socket.

import type {
  BrokerState,
  CliId,
  Message,
  TransferRequest,
  Attestation,
  ApprovalEvent,
  Artifact,
  VerificationRecord,
  ReviewRecord,
  ActorIdentity,
  TaskEnvelope,
} from "./types";

// ─── Socket protocol (broker ↔ TUI / adapters) ───

export type SocketMessage =
  | { kind: "subscribe"; client: "tui" | CliId; identity: ActorIdentity }
  | { kind: "state"; state: BrokerState }
  | { kind: "state-update"; patch: Partial<BrokerState> }
  | { kind: "message"; message: Message }
  | { kind: "ledger-entry"; entry: BrokerState["eventLog"][number] }
  | { kind: "transfer-requested"; request: TransferRequest }
  | { kind: "approval-needed"; request: ApprovalEvent }
  | { kind: "artifact-published"; artifact: Artifact }
  | { kind: "session-event"; cli: CliId; event: string; detail: string }
  | { kind: "error"; code: string; detail: string };

// ─── MCP tool contract (F5: expanded) ───

export interface McpToolDef {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export const MCP_TOOLS: McpToolDef[] = [
  // ── Typed action request/response ──
  {
    name: "submit_action",
    description:
      "Submit a typed action request (read, write, build, test, git, shell, network). " +
      "Broker validates against task scope, permissions, and ownership before authorizing. " +
      "Returns a typed response: authorized/denied with reason.",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["read", "write", "build", "test", "git", "shell", "network"] },
        target: { type: "string", description: "File path, command, or URL" },
        taskId: { type: "string", description: "Task envelope ID this action belongs to" },
        detail: { type: "string" },
      },
      required: ["action", "target", "taskId"],
    },
  },

  // ── Messaging ──
  {
    name: "send_message",
    description: "Send a typed message to the other CLI's inbox via the broker.",
    inputSchema: {
      type: "object",
      properties: {
        to: { type: "string", enum: ["claude", "antigravity"] },
        content: { type: "string" },
        taskId: { type: "string" },
      },
      required: ["to", "content", "taskId"],
    },
  },
  {
    name: "get_inbox",
    description: "Get messages in the caller's inbox.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "acknowledge_message",
    description: "Acknowledge receipt of a specific message. Required before broker marks it delivered.",
    inputSchema: {
      type: "object",
      properties: { messageId: { type: "string" } },
      required: ["messageId"],
    },
  },

  // ── Ownership: transfer ──
  {
    name: "request_transfer",
    description:
      "Request ownership transfer. Broker records last verified code state, pauses writing, " +
      "and requires the receiving CLI to accept and attest before the lease completes.",
    inputSchema: {
      type: "object",
      properties: {
        to: { type: "string", enum: ["claude", "antigravity"] },
        reason: { type: "string" },
        taskId: { type: "string" },
      },
      required: ["to", "reason", "taskId"],
    },
  },
  {
    name: "accept_transfer",
      description:
      "Accept an incoming ownership transfer. Caller must provide attestation of the last verified code state.",
    inputSchema: {
      type: "object",
      properties: {
        transferId: { type: "string" },
        attestation: { type: "object" },
      },
      required: ["transferId", "attestation"],
    },
  },
  {
    name: "reject_transfer",
    description:
      "Reject an incoming ownership transfer. Ownership returns to sender (who must re-attest) or goes free.",
    inputSchema: {
      type: "object",
      properties: {
        transferId: { type: "string" },
        reason: { type: "string" },
      },
      required: ["transferId", "reason"],
    },
  },

  // ── Ownership: sender release ──
  {
    name: "release_ownership",
    description:
      "Sender voluntarily releases ownership back to free state. " +
      "Must include attestation of final code state. Fencing token required.",
    inputSchema: {
      type: "object",
      properties: {
        fencingToken: { type: "number" },
        attestation: { type: "object" },
      },
      required: ["fencingToken", "attestation"],
    },
  },

  // ── Attestation ──
  {
    name: "attest",
    description:
      "Attest to the current code state. Required after a pause/interrupt before writing can resume. " +
      "Includes code hash, repo fingerprint, and fencing token.",
    inputSchema: {
      type: "object",
      properties: {
        codeHash: { type: "string" },
        repoFingerprint: { type: "string" },
        fencingToken: { type: "number" },
      },
      required: ["codeHash", "repoFingerprint", "fencingToken"],
    },
  },

  // ── State ──
  {
    name: "get_state",
    description: "Get the full broker state: ownership, sessions, inboxes, queue, pending approvals/transfers, artifacts.",
    inputSchema: { type: "object", properties: {} },
  },

  // ── Artifacts ──
  {
    name: "publish_artifact",
    description:
      "Publish an artifact (code, diff, document, report, test result) to the broker. " +
      "Broker records content hash, repo fingerprint, and task binding. " +
      "Artifact is inspectable by the other CLI.",
    inputSchema: {
      type: "object",
      properties: {
        type: { type: "string", enum: ["code", "diff", "document", "report", "test-result"] },
        path: { type: "string" },
        hash: { type: "string" },
        taskId: { type: "string" },
      },
      required: ["type", "path", "hash", "taskId"],
    },
  },
  {
    name: "inspect_artifact",
    description:
      "Inspect a published artifact. Returns metadata and content hash for verification.",
    inputSchema: {
      type: "object",
      properties: {
        artifactId: { type: "string" },
        inspectionResult: { type: "string", description: "Your inspection notes" },
      },
      required: ["artifactId"],
    },
  },

  // ── Verification and review ──
  {
    name: "submit_verification",
    description:
      "Submit a verification record. Records what was verified, by whom, pass/fail result, and fencing token.",
    inputSchema: {
      type: "object",
      properties: {
        taskId: { type: "string" },
        what: { type: "string" },
        result: { type: "string", enum: ["pass", "fail", "warning"] },
        detail: { type: "string" },
      },
      required: ["taskId", "what", "result", "detail"],
    },
  },
  {
    name: "submit_review",
    description:
      "Submit a review record for a published artifact. Decision: approved, changes-requested, or rejected.",
    inputSchema: {
      type: "object",
      properties: {
        artifactId: { type: "string" },
        decision: { type: "string", enum: ["approved", "changes-requested", "rejected"] },
        comments: { type: "string" },
        taskId: { type: "string" },
      },
      required: ["artifactId", "decision", "comments", "taskId"],
    },
  },

  // ── Pause ──
  {
    name: "request_pause",
    description:
      "Request a governed pause of the current session. Broker records last verified code state, " +
      "pauses writing, and requires re-attestation before resuming.",
    inputSchema: {
      type: "object",
      properties: {
        taskId: { type: "string" },
        reason: { type: "string" },
      },
      required: ["taskId", "reason"],
    },
  },

  // ── Governed closure ──
  {
    name: "request_closure",
    description:
      "Request governed closure of a session. Broker verifies all artifacts are reviewed, " +
      "ledger is consistent, and ownership is released before allowing close.",
    inputSchema: {
      type: "object",
      properties: {
        taskId: { type: "string" },
        summary: { type: "string" },
      },
      required: ["taskId", "summary"],
    },
  },
];

// ─── Runtime paths (Design Section 7) ───
// Local app data under Founder-owned MADVentures directory in macOS Application Support.
// Runtime sockets use a protected runtime subdirectory.
// Config, ledgers and artifacts are separated.

import { homedir } from "os";
import { join } from "path";

// macOS Application Support: ~/Library/Application Support/MADVentures/madventures-tui
export const APP_DATA_DIR =
  process.env.MADV_TUI_DATA_DIR ??
  join(homedir(), "Library", "Application Support", "MADVentures", "madventures-tui");

export const RUNTIME_DIR = join(APP_DATA_DIR, "runtime");        // 0700, socket lives here
export const CONFIG_DIR = join(APP_DATA_DIR, "config");
export const LEDGER_DIR = join(APP_DATA_DIR, "ledger");
export const ARTIFACT_DIR = join(APP_DATA_DIR, "artifacts");

export const SOCKET_PATH = join(RUNTIME_DIR, "broker.sock");

// Protocol version
export const PROTOCOL_VERSION = "madbridge-protocol/v1";

// Legacy compat — do not use in new code
export const BROKER_SOCKET_PATH = SOCKET_PATH;
