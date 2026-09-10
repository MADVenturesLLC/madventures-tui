// apps/madbridge/src/fixture/harness.ts
// Harness seams for the tui-chaos acceptance/chaos explorer (PILLAR-1).
//
// Both exports are DEAD unless the explicitly named env gate is set to "1".
// They add fixture data only: a mock approval queue for the governed
// decision-surface acceptance scenario, and an in-process colorized event
// stream for the ansi_flood chaos scenario. No broker, socket, daemon, or
// Gateway traffic is involved in either seam.
//
// This module intentionally lives OUTSIDE src/tui/ — the TUI source tree is
// under a standing no-timer governance scan, and the stream seam is the only
// holder of a timer in the fixture path.

import type { BrokerSnapshot, LedgerEntryProjection, PendingApproval } from "../tui/types";
import type { RepositoryFingerprint } from "@madventures/protocol";

export function isHarnessFixtureEnabled(): boolean {
  return process.env.MADV_TUI_FIXTURE === "1";
}

export function isHarnessStreamEnabled(): boolean {
  return process.env.MADV_TUI_FIXTURE_STREAM === "1";
}

function harnessApprovalQueue(fp: RepositoryFingerprint): PendingApproval[] {
  const mk = (id: string): PendingApproval => ({
    id,
    type: "command_approval",
    actor: "exec-claude-code",
    taskId: "task-fixture-001",
    repositoryFingerprint: fp,
    scope: "./src",
    timestamp: "2026-08-08T12:20:00Z",
    colorState: { kind: "pending", text: "PENDING — awaiting Founder decision" },
  });
  return [mk("fixture-approval-001"), mk("fixture-approval-002")];
}

/** Seam 1: mock approval queue behind MADV_TUI_FIXTURE=1. */
export function withHarnessApprovalQueue(snapshot: BrokerSnapshot): BrokerSnapshot {
  if (!isHarnessFixtureEnabled() || !snapshot.repositoryFingerprint) {
    return snapshot;
  }
  return {
    ...snapshot,
    pendingApprovals: harnessApprovalQueue(snapshot.repositoryFingerprint),
  };
}

/**
 * Seam 2: colorized in-process fixture stream behind
 * MADV_TUI_FIXTURE_STREAM=1. In-process data only — NOT a Gateway feed.
 *
 * C1 (bounded-memory): the retained streamed-entry window is capped at
 * RETAINED_STREAM_WINDOW — consistent with the visible event-log window —
 * so retained memory is O(1) with respect to run duration. A separate
 * monotonic emitted-count preserves the synthetic queueDepth semantics
 * (total stream progression, exactly as the unbounded array length did
 * before), so no external fixture behavior changes.
 */
export function makeStreamingFixtureSubscribe(
  base: BrokerSnapshot,
): (listener: (snapshot: BrokerSnapshot) => void) => (() => void) {
  const STREAM_TYPES = [
    "message",
    "message",
    "ownership_accept",
    "transfer-request",
    "interrupt",
  ] as const;
  const RETAINED_STREAM_WINDOW = 60;
  return (listener: (snapshot: BrokerSnapshot) => void): (() => void) => {
    listener(base);
    let seq = base.eventLog.length > 0 ? Math.max(...base.eventLog.map((e) => e.seq)) : 0;
    const streamed: LedgerEntryProjection[] = [];
    let streamedCount = 0;
    const timer = setInterval(() => {
      seq += 1;
      streamedCount += 1;
      streamed.push({
        seq,
        type: STREAM_TYPES[seq % STREAM_TYPES.length]!,
        actor: seq % 2 === 0 ? "exec-claude-code" : "exec-antigravity",
        fencingToken: 3,
        hash: `h${seq.toString(16).padStart(12, "0")}`,
        timestamp: "2026-08-08T12:00:00Z",
      });
      if (streamed.length > RETAINED_STREAM_WINDOW) {
        streamed.shift(); // discard the oldest retained entry — window stays bounded
      }
      listener({
        ...base,
        eventLog: [...base.eventLog, ...streamed].slice(-60),
        queueDepth: streamedCount,
      });
    }, 40);
    // Never keep the process alive just for the stream.
    timer.unref?.();
    return () => clearInterval(timer);
  };
}
