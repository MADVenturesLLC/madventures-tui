// apps/madbridge/src/tui/main.tsx
// Real OpenTUI entry point.
// In --fixture mode, renders the TUI with demo data for visual inspection.
// The fixture banner permanently shows: FIXTURE DATA — NOT A LIVE SESSION.
// No live broker snapshot wiring in this phase.

import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import type { ReactNode } from "react";
import { App } from "./App";
import type { BrokerSnapshot } from "./types";
import type { ExecutionIdentity, RepositoryFingerprint, TaskEnvelopeV1 } from "@madventures/protocol";

/**
 * Fixture snapshot for demo mode.
 * This is explicitly labeled data — it does NOT represent a live session.
 * No live broker wiring connects this data in Phase 0.
 */
export function makeFixtureSnapshot(): BrokerSnapshot {
  const fp: RepositoryFingerprint = {
    kind: "commit",
    sha256: "a".repeat(64),
    git_sha: "abcdef1234567890abcdef1234567890abcdef12",
  };

  const claude: ExecutionIdentity = {
    execution_id: "exec-claude-code",
    role: "builder",
    surface: "claude-code",
    model: "claude-sonnet-4",
    provider: "anthropic",
    effort: "medium",
  };

  const antigravity: ExecutionIdentity = {
    execution_id: "exec-antigravity",
    role: "reviewer",
    surface: "antigravity",
    model: "gemini-2.5-pro",
    provider: "google",
    effort: "medium",
  };

  const task: TaskEnvelopeV1 = {
    protocol_version: "madbridge-protocol/v1",
    task_id: "task-fixture-001",
    authorization_reference: "fixture-auth-ref",
    repository: "https://github.com/MADVenturesLLC/example",
    branch: "main",
    worktree: "/tmp/fixture-worktree",
    repository_fingerprint: fp,
    executions: [claude, antigravity],
    initial_writer: "exec-claude-code",
    scope: {
      allowedReadPaths: ["./src"],
      allowedWritePaths: ["./src"],
      allowedCommandCategories: ["read", "write", "test"],
      allowedArtifactCategories: ["code", "diff"],
      maxArtifactSizeBytes: 1048576,
      dataClass: "internal",
      allowedEgressDestinations: [],
    },
    expires_at: "2026-12-31T23:59:59Z",
    created_at: "2026-08-08T12:00:00Z",
    envelope_hash: "fixture-hash-001",
  };

  return {
    connected: true,
    sessionState: "active",
    ownershipState: "owned",
    activeWriter: "exec-claude-code",
    fencingToken: 3,
    task,
    executions: [claude, antigravity],
    repositoryFingerprint: fp,
    pendingApprovals: [],
    pendingTransfers: [],
    permissionSummary: {
      allowedReadPaths: ["./src"],
      allowedWritePaths: ["./src"],
      allowedCommandCategories: ["read", "write", "test"],
      allowedEgressDestinations: [],
      dataClass: "internal",
    },
    transferPhase: null,
    verificationStatus: {
      result: "pass",
      detail: "Fixture verification result",
      verifiedBy: "exec-claude-code",
      timestamp: "2026-08-08T12:30:00Z",
    },
    reviewStatus: null,
    incident: null,
    eventLog: [
      {
        seq: 1,
        type: "session-start",
        actor: "claude-code",
        fencingToken: 1,
        hash: "abc123def456",
        timestamp: "2026-08-08T12:00:00Z",
      },
      {
        seq: 2,
        type: "message",
        actor: "exec-claude-code",
        fencingToken: 1,
        hash: "def789abc012",
        timestamp: "2026-08-08T12:05:00Z",
      },
      {
        seq: 3,
        type: "ownership_accept",
        actor: "exec-claude-code",
        fencingToken: 3,
        hash: "ghi345def678",
        timestamp: "2026-08-08T12:10:00Z",
      },
    ],
    queueDepth: 0,
  };
}

async function main(): Promise<void> {
  const isFixture = process.argv.includes("--fixture");

  const renderer = await createCliRenderer();
  const root = createRoot(renderer);

  if (isFixture) {
    // Fixture mode — render with demo data, no live broker connection.
    // The fixture banner is permanently visible inside App via the fixture prop.
    const fixtureSnapshot = makeFixtureSnapshot();
    const fixtureSubscribe = (listener: (snapshot: BrokerSnapshot) => void): (() => void) => {
      listener(fixtureSnapshot);
      return () => {};
    };

    root.render(
      <App
        subscribe={fixtureSubscribe}
        fixture={true}
      /> as ReactNode,
    );
  } else {
    // Live mode — no broker wiring in Phase 0.
    // App renders with no subscription (shows NOT CONNECTED).
    root.render(<App /> as ReactNode);
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
