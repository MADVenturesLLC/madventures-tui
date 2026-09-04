// apps/madbridge/test/tui-writers-stage.test.tsx
// Phase 1 Writer's Stage — render-level tests proving Direction B.
//
// Focus and writership are SEPARATE:
//   - Focus determines which surface occupies the stage.
//   - activeWriter determines which agent displays WRITER tok#N.
//   - Focusing an agent must never imply that agent is the writer.
//   - Every meaningful status appears as text, never color alone.
//
// Uses @opentui/react/test-utils testRender + captureCharFrame.

import { test, expect, describe } from "bun:test";
import { act } from "react";
import { testRender } from "@opentui/react/test-utils";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { App } from "../src/tui/App";
import { DockStrip, countBufferedLines, buildDockLine } from "../src/tui/components/DockStrip";
import { displayWidth } from "../src/tui/components/agent-identity";
import { PaneTabs } from "../src/tui/components/PaneTabs";
import type { BrokerSnapshot, FocusTarget, ApprovalRequestEvent } from "../src/tui/types";
import { parseSurfaceId, type TaskEnvelopeV1, type ExecutionIdentity, type RepositoryFingerprint } from "@madventures/protocol";

// ─── Fixtures ───

function makeFingerprint(): RepositoryFingerprint {
  return {
    kind: "commit",
    sha256: "a".repeat(64),
    git_sha: "abcdef1234567890abcdef1234567890abcdef12",
  };
}

function makeExecution(
  surface: "claude-code" | "antigravity",
  overrides?: Partial<ExecutionIdentity>,
): ExecutionIdentity {
  const isBuilder = surface === "claude-code";
  const base: ExecutionIdentity = {
    execution_id: `exec-${surface}`,
    role: isBuilder ? "builder" : "independent-reviewer",
    surface: parseSurfaceId(surface),
    model: isBuilder ? "claude-sonnet-4" : "gemini-2.5-pro",
    provider: isBuilder ? "anthropic" : "google",
    independence_domain: isBuilder ? "fixture-builder-control" : "fixture-review-control",
    effort: "medium",
  };
  return overrides ? { ...base, ...overrides } : base;
}

function makeTask(): TaskEnvelopeV1 {
  return {
    protocol_version: "madbridge-protocol/v1",
    task_id: "task-001",
    authorization_reference: "auth-ref-001",
    repository: "https://github.com/example/repo",
    branch: "feature-branch",
    worktree: "/tmp/worktree",
    repository_fingerprint: makeFingerprint(),
    executions: [makeExecution("claude-code"), makeExecution("antigravity")],
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
    pair_constraints: {
      required_roles: ["builder", "independent-reviewer"],
      require_distinct_providers: true,
      require_distinct_independence_domains: true,
      prohibit_self_review: true,
    },
    expires_at: "2026-12-31T23:59:59Z",
    created_at: "2026-08-08T12:00:00Z",
    envelope_hash: "hash123",
  };
}

function makeSnapshot(overrides?: Partial<BrokerSnapshot>): BrokerSnapshot {
  return {
    connected: true,
    sessionState: "active",
    ownershipState: "owned",
    activeWriter: "exec-claude-code",
    fencingToken: 3,
    task: makeTask(),
    executions: [makeExecution("claude-code"), makeExecution("antigravity")],
    repositoryFingerprint: makeFingerprint(),
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
    verificationStatus: null,
    reviewStatus: null,
    incident: null,
    eventLog: [
      { seq: 1, type: "session-start", actor: "claude-code", fencingToken: 1, hash: "abc123", timestamp: "2026-08-08T12:00:00Z" },
      { seq: 2, type: "action_request", actor: "exec-antigravity", fencingToken: 2, hash: "def456", timestamp: "2026-08-08T12:05:00Z" },
      { seq: 3, type: "ownership_accept", actor: "exec-claude-code", fencingToken: 3, hash: "ghi789", timestamp: "2026-08-08T12:10:00Z" },
    ],
    queueDepth: 0,
    ...overrides,
  };
}

type SubscribeFn = (listener: (s: BrokerSnapshot) => void) => () => void;

function makeSubscribe(snapshot: BrokerSnapshot): SubscribeFn {
  const sub: SubscribeFn = (listener: (snapshot: BrokerSnapshot) => void) => {
    listener(snapshot);
    return () => {};
  };
  return sub;
}

// Helper: render App at given dimensions with a controlled snapshot.
async function renderApp(
  snapshot: BrokerSnapshot | null,
  width: number,
  height: number,
  focus?: FocusTarget,
  opts?: { fixture?: boolean; onApprovalResolve?: (e: ApprovalRequestEvent) => void },
) {
  const subscribe = snapshot ? makeSubscribe(snapshot) : undefined;
  // Build props object respecting exactOptionalPropertyTypes — only include
  // optional props when they have a defined value.
  const props: Record<string, unknown> = {};
  if (subscribe) props.subscribe = subscribe;
  if (opts?.onApprovalResolve) props.onApprovalResolve = opts.onApprovalResolve;
  if (opts?.fixture) props.fixture = opts.fixture;
  const setup = await testRender(
    <App {...props} />,
    { width, height },
  );
  // If a specific focus is requested, press the corresponding Alt+digit key.
  if (focus) {
    const keyMap: Record<FocusTarget, string> = {
      claude: "1",
      antigravity: "2",
      governance: "3",
      events: "4",
    };
    setup.mockInput.pressKey(keyMap[focus], { meta: true });
    await setup.flush();
    await setup.flush();
  } else {
    await setup.flush();
  }
  return setup;
}

// ─── 1-2. Wide mode: stage + dock composition ───

describe("1. Wide mode (120×34) Claude focus: one stage + one dock, not three columns", () => {
  test("Claude focused produces a full-width Claude stage and an Antigravity dock", async () => {
    const setup = await renderApp(makeSnapshot(), 120, 34, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      // Claude stage is visible
      expect(frame).toContain("CLAUDE CODE");
      // Antigravity appears as a dock strip
      expect(frame).toContain("ANTIGRAVITY");
      expect(frame).toContain("docked");
      // Governance pane content is NOT visible (not three columns)
      expect(frame).not.toContain("Permissions:");
      expect(frame).not.toContain("Verification:");
    } finally {
      setup.renderer.destroy();
    }
  });
});

describe("2. Wide mode (120×34) Antigravity focus: reversed stage and dock", () => {
  test("Antigravity focused produces a full-width Antigravity stage and a Claude dock", async () => {
    const setup = await renderApp(makeSnapshot(), 120, 34, "antigravity");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      // Antigravity stage is visible
      expect(frame).toContain("ANTIGRAVITY");
      // Claude appears as a dock strip
      expect(frame).toContain("CLAUDE CODE");
      expect(frame).toContain("docked");
      // Governance pane content is NOT visible
      expect(frame).not.toContain("Permissions:");
    } finally {
      setup.renderer.destroy();
    }
  });
});

// ─── 3. Focus and writer remain distinct ───

describe("3. Focus and writer remain distinct", () => {
  test("Antigravity focused while Claude remains WRITER tok#3", async () => {
    // activeWriter is exec-claude-code, focus is antigravity
    const setup = await renderApp(makeSnapshot(), 120, 34, "antigravity");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      // Antigravity is FOCUSED (stage)
      expect(frame).toContain("FOCUSED");
      // Claude is the WRITER — badge appears on Claude's area (dock)
      expect(frame).toContain("WRITER");
      expect(frame).toContain("tok#3");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("writer badge moves only when activeWriter changes", async () => {
    // Start with Claude as writer, Antigravity focused
    const snapshotClaudeWriter = makeSnapshot({
      activeWriter: "exec-claude-code",
      fencingToken: 3,
    });

    let currentSnapshot = snapshotClaudeWriter;
    const listenerRef: { fn: ((s: BrokerSnapshot) => void) | null } = { fn: null };
    const subscribe = (listener: (s: BrokerSnapshot) => void) => {
      listenerRef.fn = listener;
      listener(currentSnapshot);
      return () => { listenerRef.fn = null; };
    };

    const setup = await testRender(
      <App subscribe={subscribe} />,
      { width: 120, height: 34 },
    );
    try {
      // Focus Antigravity
      setup.mockInput.pressKey("2", { meta: true });
      await setup.flush();
      await setup.flush();
      const frame1 = setup.captureCharFrame();
      // Claude dock has WRITER, Antigravity stage does not have WRITER badge
      // Both FOCUSED and WRITER are present, but WRITER belongs to Claude (dock)
      expect(frame1).toContain("WRITER");
      expect(frame1).toContain("tok#3");

      // Now change activeWriter to exec-antigravity
      currentSnapshot = makeSnapshot({
        activeWriter: "exec-antigravity",
        fencingToken: 4,
      });
      act(() => {
        if (listenerRef.fn) listenerRef.fn(currentSnapshot);
      });
      await setup.waitForVisualIdle({ maxFrames: 10 });
      const frame2 = setup.captureCharFrame();
      // WRITER badge now shows tok#4 (the new token)
      expect(frame2).toContain("WRITER");
      expect(frame2).toContain("tok#4");
      // The old token is gone
      expect(frame2).not.toContain("tok#3");
    } finally {
      setup.renderer.destroy();
    }
  });
});

// ─── 4. Headers display exact role and model ───

describe("4. Headers display the exact role and model from the matching execution identity", () => {
  test("Claude header shows builder role and claude-sonnet-4 model", async () => {
    const setup = await renderApp(makeSnapshot(), 120, 34, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("builder");
      expect(frame).toContain("claude-sonnet-4");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("Antigravity header shows reviewer role and gemini-2.5-pro model", async () => {
    const setup = await renderApp(makeSnapshot(), 120, 34, "antigravity");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("independent-reviewer");
      expect(frame).toContain("gemini-2.5-pro");
    } finally {
      setup.renderer.destroy();
    }
  });
});

// ─── 5. Missing identity renders an explicit unavailable word ───

describe("5. Missing identity/model/role renders an explicit unavailable word", () => {
  test("empty executions: headers show an honest unavailable marker", async () => {
    const snapshot = makeSnapshot({ executions: [] });
    const setup = await renderApp(snapshot, 120, 34, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      // Must contain an honest unavailable word — never invent a model or role
      const hasUnavailable =
        frame.includes("UNKNOWN") ||
        frame.includes("unknown") ||
        frame.includes("—") ||
        frame.includes("N/A") ||
        frame.includes("none") ||
        frame.includes("NONE");
      expect(hasUnavailable).toBe(true);
      // Must NOT invent a model that isn't in the snapshot
      expect(frame).not.toContain("claude-sonnet-4");
      expect(frame).not.toContain("gemini-2.5-pro");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("null state: renders honest fallback, never invents identity", async () => {
    const setup = await renderApp(null, 120, 34, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      // Must NOT invent a model, role, or writer
      expect(frame).not.toContain("claude-sonnet-4");
      expect(frame).not.toContain("WRITER");
    } finally {
      setup.renderer.destroy();
    }
  });
});

// ─── 6. Dock buffered-line count derived from real PTY output ───

describe("6. Dock buffered-line count derived from real PTY output", () => {
  test("countBufferedLines: empty string → 0", () => {
    expect(countBufferedLines("")).toBe(0);
  });

  test("countBufferedLines: \\n separated lines", () => {
    expect(countBufferedLines("line1\nline2\nline3\n")).toBe(3);
    expect(countBufferedLines("hello\nworld\n")).toBe(2);
  });

  test("countBufferedLines: \\r\\n separated lines", () => {
    expect(countBufferedLines("line1\r\nline2\r\n")).toBe(2);
    expect(countBufferedLines("a\r\nb\r\nc\r\n")).toBe(3);
  });

  test("countBufferedLines: \\r separated lines", () => {
    expect(countBufferedLines("line1\rline2\r")).toBe(2);
  });

  test("countBufferedLines: mixed line endings", () => {
    expect(countBufferedLines("a\nb\r\nc\r")).toBe(3);
  });

  test("countBufferedLines: unterminated non-empty tail → 1 (it is a real buffered line)", () => {
    expect(countBufferedLines("hello")).toBe(1);
    expect(countBufferedLines("partial output without newline")).toBe(1);
  });

  test("countBufferedLines: required spec examples", () => {
    expect(countBufferedLines("")).toBe(0);
    expect(countBufferedLines("hello")).toBe(1);
    expect(countBufferedLines("a\nb")).toBe(2);
    expect(countBufferedLines("a\nb\n")).toBe(2);
    expect(countBufferedLines("a\r\nb")).toBe(2);
    expect(countBufferedLines("a\rb")).toBe(2);
  });

  test("countBufferedLines: repeated terminators and blank lines are NOT collapsed", () => {
    // Consecutive \n terminators must remain separate — a blank buffered line
    // is a real line. Only CRLF should be normalized as a paired terminator.
    expect(countBufferedLines("a\n\nb")).toBe(3);   // line, blank, line
    expect(countBufferedLines("\n\n")).toBe(2);     // two blank lines
    expect(countBufferedLines("a\r\rb")).toBe(3);   // CR-terminated, blank, line
    expect(countBufferedLines("a\r\n\r\nb")).toBe(3); // line, blank, line (two CRLFs)
    // \n and standalone \r are distinct terminators — do not collapse them.
    expect(countBufferedLines("a\n\rb")).toBe(3);
  });

  test("countBufferedLines: mixed line endings do not double-count CRLF", () => {
    expect(countBufferedLines("a\nb\r\nc\r")).toBe(3);
    // Pure CRLF across multiple lines — each CRLF is one terminator
    expect(countBufferedLines("a\r\nb\r\nc\r\n")).toBe(3);
    // trailing partial after terminators is still a real buffered line
    expect(countBufferedLines("a\nb\r\nc")).toBe(3);
  });

  test("DockStrip renders the buffered-line count", async () => {
    const snapshot = makeSnapshot();
    const setup = await testRender(
      <DockStrip surface="antigravity" state={snapshot} ptyOutput={"line1\nline2\nline3\n"} />,
      { width: 120, height: 6 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("3");
      expect(frame).toContain("buffered");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("DockStrip with empty PTY shows 0 buffered lines", async () => {
    const snapshot = makeSnapshot();
    const setup = await testRender(
      <DockStrip surface="antigravity" state={snapshot} ptyOutput="" />,
      { width: 120, height: 6 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("0");
      expect(frame).toContain("buffered");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("DockStrip shows agent identity, docked, role, and model", async () => {
    const snapshot = makeSnapshot();
    const setup = await testRender(
      <DockStrip surface="antigravity" state={snapshot} ptyOutput="" />,
      { width: 120, height: 6 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("ANTIGRAVITY");
      expect(frame).toContain("docked");
      expect(frame).toContain("independent-reviewer");
      expect(frame).toContain("gemini-2.5-pro");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("DockStrip shows WRITER tok#N when the docked agent is the active writer", async () => {
    // Antigravity is docked AND is the active writer
    const snapshot = makeSnapshot({ activeWriter: "exec-antigravity", fencingToken: 7 });
    const setup = await testRender(
      <DockStrip surface="antigravity" state={snapshot} ptyOutput="" />,
      { width: 120, height: 6 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("WRITER");
      expect(frame).toContain("tok#7");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("DockStrip does NOT show WRITER when the docked agent is not the writer", async () => {
    // Claude is the writer, Antigravity is docked
    const snapshot = makeSnapshot({ activeWriter: "exec-claude-code", fencingToken: 3 });
    const setup = await testRender(
      <DockStrip surface="antigravity" state={snapshot} ptyOutput="" />,
      { width: 120, height: 6 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).not.toContain("WRITER");
    } finally {
      setup.renderer.destroy();
    }
  });
});

// ─── Finding 1: Disconnected-state truthfulness ───
//
// connected===false with retained executions, activeWriter, fencingToken,
// and real PTY output. The UI must NOT claim the docked/stage agent is the
// current writer while disconnected. Real buffered PTY output is preserved.

describe("Finding 1: connected===false with retained data stays truthful", () => {
  function makeDisconnectedWithRetainedData(overrides?: Partial<BrokerSnapshot>): BrokerSnapshot {
    return makeSnapshot({
      connected: false,
      // executions, activeWriter, fencingToken, and PTY output remain:
      activeWriter: "exec-claude-code",
      fencingToken: 3,
      executions: [
        { execution_id: "exec-claude-code", role: "builder", surface: parseSurfaceId("claude-code"), model: "claude-sonnet-4", provider: "anthropic", independence_domain: "fixture-builder-control", effort: "medium" },
        { execution_id: "exec-antigravity", role: "independent-reviewer", surface: parseSurfaceId("antigravity"), model: "gemini-2.5-pro", provider: "google", independence_domain: "fixture-review-control", effort: "medium" },
      ],
      ...overrides,
    });
  }

  test("DockStrip: docked agent with retained writer data does NOT show WRITER while disconnected", async () => {
    const snapshot = makeDisconnectedWithRetainedData();
    // Antigravity docked; Claude is still the retained activeWriter
    const setup = await testRender(
      <DockStrip surface="antigravity" state={snapshot} ptyOutput={"alpha\nbeta\n"} />,
      { width: 120, height: 6 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      // No current-writer claim while disconnected
      expect(frame).not.toContain("WRITER");
      // Real buffered PTY output is preserved (2 lines)
      expect(frame).toContain("2");
      expect(frame).toContain("buffered");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("DockStrip: docked agent shows an explicit disconnected/stream-ended word", async () => {
    const snapshot = makeDisconnectedWithRetainedData();
    const setup = await testRender(
      <DockStrip surface="antigravity" state={snapshot} ptyOutput={"alpha\nbeta\n"} />,
      { width: 120, height: 6 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const hasEnded =
        frame.includes("DISCONNECTED") ||
        frame.includes("disconnected") ||
        frame.includes("stream ended") ||
        frame.includes("STREAM ENDED") ||
        frame.includes("ended") ||
        frame.includes("offline");
      expect(hasEnded).toBe(true);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("DockStrip: docked agent that WAS the retained writer does NOT claim WRITER while disconnected", async () => {
    // Antigravity is docked AND is the retained activeWriter, but disconnected
    const snapshot = makeDisconnectedWithRetainedData({
      activeWriter: "exec-antigravity",
      fencingToken: 7,
    });
    const setup = await testRender(
      <DockStrip surface="antigravity" state={snapshot} ptyOutput={"one\ntwo\nthree\n"} />,
      { width: 120, height: 6 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).not.toContain("WRITER");
      // Real buffered PTY output preserved
      expect(frame).toContain("3");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("Stage pane: connected===false with retained writer data does NOT show WRITER", async () => {
    const snapshot = makeDisconnectedWithRetainedData();
    const setup = await renderApp(snapshot, 120, 34, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      // Stage must not claim current-writer status while disconnected
      expect(frame).not.toContain("WRITER");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("Disconnected stage shows an explicit ended word and preserves role/model", async () => {
    const snapshot = makeDisconnectedWithRetainedData();
    const setup = await renderApp(snapshot, 120, 34, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const hasEnded =
        frame.includes("DISCONNECTED") ||
        frame.includes("disconnected") ||
        frame.includes("stream ended") ||
        frame.includes("STREAM ENDED") ||
        frame.includes("ended") ||
        frame.includes("offline");
      expect(hasEnded).toBe(true);
      // Real identity preserved (not fabricated)
      expect(frame).toContain("builder");
      expect(frame).toContain("claude-sonnet-4");
    } finally {
      setup.renderer.destroy();
    }
  });
});

// ─── Finding 2: Dock strip at the 80-column boundary ───
//
// Wide mode begins at width 80, but ordinary docked-writer lines currently
// exceed 80 characters and wrap. DockStrip must remain exactly one physical
// row at widths 80 and above.

describe("Finding 2: DockStrip is one physical row at widths >= 80", () => {
  function nonEmptyRows(frame: string): string[] {
    return frame.split("\n").filter((l) => l.trim().length > 0);
  }

  test("80 cols: Antigravity focused while Claude remains writer → Claude dock shows WRITER on one row", async () => {
    // Scenario: Antigravity is the stage (focused), Claude is docked, and
    // Claude is the current writer. The DockStrip for Claude must show
    // WRITER tok#3 and fit exactly one row at 80 columns.
    const snapshot = makeSnapshot({
      activeWriter: "exec-claude-code",
      fencingToken: 3,
    });
    const setup = await testRender(
      <DockStrip surface="claude-code" state={snapshot} ptyOutput={"alpha\nbeta\n"} />,
      { width: 80, height: 6 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const rows = nonEmptyRows(frame);
      expect(rows.length).toBe(1);
      // The single row preserves, in priority order: identity, docked,
      // WRITER tok#3, role, model, count.
      expect(rows[0]).toContain("CLAUDE");
      expect(rows[0]).toContain("docked");
      expect(rows[0]).toContain("WRITER");
      expect(rows[0]).toContain("tok#3");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("80 cols: Claude docked while Antigravity is writer fits one row", async () => {
    const snapshot = makeSnapshot({
      activeWriter: "exec-antigravity",
      fencingToken: 5,
    });
    const setup = await testRender(
      <DockStrip surface="claude-code" state={snapshot} ptyOutput={"one\ntwo\nthree\n"} />,
      { width: 80, height: 6 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const rows = nonEmptyRows(frame);
      expect(rows.length).toBe(1);
      expect(rows[0]).toContain("CLAUDE");
      expect(rows[0]).toContain("docked");
      // Claude is docked but is NOT the writer here; no WRITER badge
      expect(rows[0]).not.toContain("WRITER");
      // Buffered-line count preserved
      expect(rows[0]).toContain("3");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("80 cols: Antigravity docked while Antigravity is writer fits one row", async () => {
    const snapshot = makeSnapshot({
      activeWriter: "exec-antigravity",
      fencingToken: 7,
    });
    const setup = await testRender(
      <DockStrip surface="antigravity" state={snapshot} ptyOutput={"one\ntwo\n"} />,
      { width: 80, height: 6 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const rows = nonEmptyRows(frame);
      expect(rows.length).toBe(1);
      expect(rows[0]).toContain("ANTIGRAVITY");
      expect(rows[0]).toContain("WRITER");
      expect(rows[0]).toContain("tok#7");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("buildDockLine never exceeds the provided width (display columns, not UTF-16 units)", () => {
    for (const w of [80, 81, 100, 120]) {
      const line = buildDockLine("antigravity", makeSnapshot({ activeWriter: "exec-claude-code", fencingToken: 3 }), "alpha\nbeta\n", w);
      expect(displayWidth(line)).toBeLessThanOrEqual(w);
    }
  });

  test("buildDockLine fits one 80-column row when the model is CJK (width-2 per char)", () => {
    // A CJK model name occupies 2 display columns per character; the old
    // `.length` budgeting would let this overflow the 80-column single-row
    // guarantee. The row must never exceed 80 display columns, the identity
    // must survive, and no grapheme cluster may be split.
    const cjkModel = "glm-4.6-中文深度思考模型-超长名称-实验版";
    const line = buildDockLine(
      "antigravity",
      makeSnapshot({
        executions: [
          { ...makeExecution("claude-code"), model: "claude-sonnet-4" },
          { ...makeExecution("antigravity"), model: cjkModel },
        ],
      }),
      "x\n",
      80,
    );
    expect(displayWidth(line)).toBeLessThanOrEqual(80);
    expect(line).toContain("ANTIGRAVITY");
    // Truncation must be grapheme-safe: the CJK model fragment is either
    // absent (dropped) or a clean prefix — never a split cluster.
    const modelIdx = line.indexOf(cjkModel);
    if (modelIdx !== -1) {
      expect(line.slice(modelIdx)).not.toMatch(/[\u4e00-\u9fff]$/); // no dangling half
    }
  });

  test("buildDockLine fits one 80-column row when the model carries emoji (width-2 per glyph)", () => {
    // The role field is a controlled union, but model names are free strings —
    // a provider model id can legitimately contain emoji/CJK. The row must
    // stay within 80 display columns.
    const line = buildDockLine(
      "claude-code",
      makeSnapshot({
        executions: [
          { ...makeExecution("claude-code"), model: "claude-🤖-sonnet-4-5" },
          { ...makeExecution("antigravity"), model: "gemini-2.5-pro" },
        ],
      }),
      "x\n",
      80,
    );
    expect(displayWidth(line)).toBeLessThanOrEqual(80);
    expect(line).toContain("CLAUDE CODE");
  });

  test("buildDockLine preserves identity and never fabricates a model when truncating", () => {
    // Even at exactly 80 chars, the identity and a real model fragment survive.
    const line = buildDockLine("antigravity", makeSnapshot(), "x\n", 80);
    expect(line).toContain("ANTIGRAVITY");
    // Must NOT invent a model not present in the snapshot
    expect(line).not.toContain("claude-sonnet-4");
    expect(line.length).toBeLessThanOrEqual(80);
  });
});

// ─── 7-9. Narrow mode: tab row + single surface ───

describe("7. Narrow mode (60×24) tab row contains all four surfaces with textual marker", () => {
  test("Claude focused: tab row has CLAUDE with * marker", async () => {
    const setup = await renderApp(makeSnapshot(), 60, 24, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("CLAUDE");
      expect(frame).toContain("AGY");
      expect(frame).toContain("GOV");
      expect(frame).toContain("LOG");
      // The selected tab carries a textual marker
      expect(frame).toContain("*");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("Antigravity focused: AGY carries the * marker", async () => {
    const setup = await renderApp(makeSnapshot(), 60, 24, "antigravity");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("CLAUDE");
      expect(frame).toContain("AGY");
      expect(frame).toContain("GOV");
      expect(frame).toContain("LOG");
      expect(frame).toContain("*");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("PaneTabs renders the textual marker on the selected tab", async () => {
    for (const focus of ["claude", "antigravity", "governance", "events"] as FocusTarget[]) {
      const setup = await testRender(
        <PaneTabs focus={focus} />,
        { width: 60, height: 3 },
      );
      try {
        await setup.flush();
        const frame = setup.captureCharFrame();
        expect(frame).toContain("CLAUDE");
        expect(frame).toContain("AGY");
        expect(frame).toContain("GOV");
        expect(frame).toContain("LOG");
        expect(frame).toContain("*");
      } finally {
        setup.renderer.destroy();
      }
    }
  });
});

describe("8. Narrow mode (60×24): only the selected surface renders", () => {
  test("Claude focused: Claude visible, Governance content absent", async () => {
    const setup = await renderApp(makeSnapshot(), 60, 24, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("CLAUDE");
      expect(frame).not.toContain("Permissions:");
      expect(frame).not.toContain("Verification:");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("Antigravity focused: Antigravity visible, Claude stage absent", async () => {
    const setup = await renderApp(makeSnapshot(), 60, 24, "antigravity");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("ANTIGRAVITY");
      // In narrow mode, only one surface renders — no dock strip
      expect(frame).not.toContain("Permissions:");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("Governance focused: Governance visible, Claude content absent", async () => {
    const setup = await renderApp(makeSnapshot(), 60, 24, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      // Governance content visible (Phase 2 redesigned pane shows GOVERNANCE title)
      expect(frame).toContain("GOVERNANCE");
      // Claude pane content not rendered (only governance surface)
      expect(frame).not.toContain("CLAUDE CODE");
    } finally {
      setup.renderer.destroy();
    }
  });
});

describe("9. Fixture banner and StatusBar remain present in narrow mode", () => {
  test("60×24: FIXTURE DATA banner present", async () => {
    const setup = await renderApp(makeSnapshot(), 60, 24, "claude", { fixture: true });
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("FIXTURE DATA");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("60×24: StatusBar six-fact tokens present", async () => {
    const setup = await renderApp(makeSnapshot(), 60, 24, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      // At least connection + focus must be present at 60 columns
      expect(frame).toContain("CONN");
      expect(frame).toContain("F:");
    } finally {
      setup.renderer.destroy();
    }
  });
});

// ─── 10. Governance and Events remain reachable, render full-width ───

describe("10. Governance and Events remain reachable and render full-width when focused", () => {
  test("120×34 Governance focused: full-width, governance content visible", async () => {
    const setup = await renderApp(makeSnapshot(), 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      // Phase 2 redesigned pane shows GOVERNANCE title and permission scope
      expect(frame).toContain("GOVERNANCE");
      expect(frame).toContain("Read:");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("120×34 Events focused: EventLog visible full-width", async () => {
    const snapshot = makeSnapshot();
    const setup = await renderApp(snapshot, 120, 34, "events");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      // EventLog renders hash-chained ledger entries
      expect(frame).toContain("Event Log");
    } finally {
      setup.renderer.destroy();
    }
  });
});

// ─── 11. Deterministic frames ───

describe("11. Two identical renders from an unchanged snapshot produce identical character frames", () => {
  test("wide Claude focused: identical frames", async () => {
    const snapshot = makeSnapshot();
    const setup1 = await renderApp(snapshot, 120, 34, "claude");
    let frame1: string;
    try {
      await setup1.flush();
      frame1 = setup1.captureCharFrame();
    } finally {
      setup1.renderer.destroy();
    }

    const setup2 = await renderApp(snapshot, 120, 34, "claude");
    let frame2: string;
    try {
      await setup2.flush();
      frame2 = setup2.captureCharFrame();
    } finally {
      setup2.renderer.destroy();
    }

    expect(frame1).toBe(frame2);
  });

  test("narrow Antigravity focused: identical frames", async () => {
    const snapshot = makeSnapshot();
    const setup1 = await renderApp(snapshot, 60, 24, "antigravity");
    let frame1: string;
    try {
      await setup1.flush();
      frame1 = setup1.captureCharFrame();
    } finally {
      setup1.renderer.destroy();
    }

    const setup2 = await renderApp(snapshot, 60, 24, "antigravity");
    let frame2: string;
    try {
      await setup2.flush();
      frame2 = setup2.captureCharFrame();
    } finally {
      setup2.renderer.destroy();
    }

    expect(frame1).toBe(frame2);
  });
});

// ─── 12. No new timer, animation, or timeline imports ───

describe("12. No new timer, animation, or timeline imports exist under src/tui/", () => {
  function listSourceFiles(dir: string): string[] {
    if (!existsSync(dir)) return [];
    const results: string[] = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...listSourceFiles(fullPath));
      } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
        results.push(fullPath);
      }
    }
    return results;
  }

  test("no setTimeout/setInterval/requestAnimationFrame/spinner imports", () => {
    const tuiDir = join(process.cwd(), "apps/madbridge/src/tui");
    const files = listSourceFiles(tuiDir);
    expect(files.length).toBeGreaterThan(0);

    const forbidden = [
      /\bsetTimeout\b/,
      /\bsetInterval\b/,
      /\brequestAnimationFrame\b/,
      /\bclearTimeout\b/,
      /\bclearInterval\b/,
      // Animation/spinner libraries
      /from\s+["'].*spinner/i,
      /from\s+["'].*animate/i,
      /from\s+["'].*marquee/i,
    ];

    for (const file of files) {
      const source = readFileSync(file, "utf8");
      for (const pattern of forbidden) {
        if (pattern.test(source)) {
          // tslint:disable-next-line: no-console
          throw new Error(`Forbidden pattern ${String(pattern)} found in ${file}`);
        }
      }
    }
  });
});

// ─── Strengthened acceptance tests (Finding 4) ───
//
// Adversarial assertions that would fail against the reviewed patch:
// stage border spans terminal width, dock single row at 80, line-by-line
// focus/writer attribution, exact selected-tab text, all six StatusBar
// facts at 60 columns, and retained-state-disconnected.

describe("Finding 4a: stage border spans the terminal width at 120 and 80", () => {
  test("120 cols: top border row is exactly 120 chars wide", async () => {
    const setup = await renderApp(makeSnapshot(), 120, 34, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const rows = frame.split("\n");
      // Find the first border row (starts with ┌)
      const borderRow = rows.find((r) => r.startsWith("┌"));
      expect(borderRow).toBeDefined();
      // A box-drawing border row at 120 width has ┌ ... ┐ and should be
      // 120 columns (each box char is 1 column). Assert exact width.
      expect(borderRow!.length).toBe(120);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("80 cols: top border row is exactly 80 chars wide", async () => {
    const setup = await renderApp(makeSnapshot(), 80, 24, "antigravity");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const rows = frame.split("\n");
      const borderRow = rows.find((r) => r.startsWith("┌"));
      expect(borderRow).toBeDefined();
      expect(borderRow!.length).toBe(80);
    } finally {
      setup.renderer.destroy();
    }
  });
});

describe("Finding 4b: at 80 columns, the dock identity/status appears on exactly one physical row", () => {
  test("Antigravity focused, Claude docked (writer): dock on one row", async () => {
    const setup = await renderApp(
      makeSnapshot({ activeWriter: "exec-claude-code", fencingToken: 3 }),
      80, 24, "antigravity",
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const rows = frame.split("\n").filter((l) => l.trim().length > 0);
      // Find the dock line (contains "CLAUDE" and "docked")
      const dockRows = rows.filter((r) => r.includes("CLAUDE") && r.includes("docked"));
      expect(dockRows.length).toBe(1);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("Claude focused, Antigravity docked (writer): dock on one row", async () => {
    const setup = await renderApp(
      makeSnapshot({ activeWriter: "exec-antigravity", fencingToken: 5 }),
      80, 24, "claude",
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const rows = frame.split("\n").filter((l) => l.trim().length > 0);
      const dockRows = rows.filter((r) => r.includes("ANTIGRAVITY") && r.includes("docked"));
      expect(dockRows.length).toBe(1);
    } finally {
      setup.renderer.destroy();
    }
  });
});

describe("Finding 4c: attribute focus and writership by line", () => {
  test("Antigravity focused while Claude is writer: AGY line has FOCUSED, Claude line has WRITER tok#3", async () => {
    const setup = await renderApp(
      makeSnapshot({ activeWriter: "exec-claude-code", fencingToken: 3 }),
      120, 34, "antigravity",
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const rows = frame.split("\n").filter((l) => l.trim().length > 0);
      // The Antigravity (stage) line contains FOCUSED
      const agyLine = rows.find((r) => r.includes("ANTIGRAVITY"));
      expect(agyLine).toBeDefined();
      expect(agyLine!).toContain("FOCUSED");
      expect(agyLine!).not.toContain("WRITER");
      // The Claude (dock) line contains WRITER tok#3
      const claudeLine = rows.find((r) => r.includes("CLAUDE") && r.includes("docked"));
      expect(claudeLine).toBeDefined();
      expect(claudeLine!).toContain("WRITER");
      expect(claudeLine!).toContain("tok#3");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("reversed: after activeWriter changes, Claude line has FOCUSED (no WRITER), Antigravity dock has WRITER tok#9", async () => {
    // Claude focused, Antigravity is the writer
    const setup = await renderApp(
      makeSnapshot({ activeWriter: "exec-antigravity", fencingToken: 9 }),
      120, 34, "claude",
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const rows = frame.split("\n").filter((l) => l.trim().length > 0);
      // Claude (stage) has FOCUSED but is NOT the writer (Antigravity is)
      const claudeStage = rows.find((r) => r.includes("CLAUDE CODE") && r.includes("FOCUSED"));
      expect(claudeStage).toBeDefined();
      expect(claudeStage!).toContain("FOCUSED");
      expect(claudeStage!).not.toContain("WRITER");
      // Antigravity (dock) has WRITER tok#9 but is NOT focused
      const agyDock = rows.find((r) => r.includes("ANTIGRAVITY") && r.includes("docked"));
      expect(agyDock).toBeDefined();
      expect(agyDock!).not.toContain("FOCUSED");
      expect(agyDock!).toContain("WRITER");
      expect(agyDock!).toContain("tok#9");
    } finally {
      setup.renderer.destroy();
    }
  });
});

describe("Finding 4d: exact selected tab text for every focus target", () => {
  test("Claude focused → CLAUDE* (exact)", async () => {
    const setup = await renderApp(makeSnapshot(), 60, 24, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const tabRow = frame.split("\n").find((l) => l.includes("CLAUDE") && l.includes("AGY"));
      expect(tabRow).toBeDefined();
      expect(tabRow!).toContain("CLAUDE*");
      expect(tabRow!).not.toContain("AGY*");
      expect(tabRow!).not.toContain("GOV*");
      expect(tabRow!).not.toContain("LOG*");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("Antigravity focused → AGY* (exact)", async () => {
    const setup = await renderApp(makeSnapshot(), 60, 24, "antigravity");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const tabRow = frame.split("\n").find((l) => l.includes("CLAUDE") && l.includes("AGY"));
      expect(tabRow).toBeDefined();
      expect(tabRow!).toContain("AGY*");
      expect(tabRow!).not.toContain("CLAUDE*");
      expect(tabRow!).not.toContain("GOV*");
      expect(tabRow!).not.toContain("LOG*");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("Governance focused → GOV* (exact)", async () => {
    const setup = await renderApp(makeSnapshot(), 60, 24, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const tabRow = frame.split("\n").find((l) => l.includes("CLAUDE") && l.includes("AGY"));
      expect(tabRow).toBeDefined();
      expect(tabRow!).toContain("GOV*");
      expect(tabRow!).not.toContain("CLAUDE*");
      expect(tabRow!).not.toContain("AGY*");
      expect(tabRow!).not.toContain("LOG*");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("Events focused → LOG* (exact)", async () => {
    const setup = await renderApp(makeSnapshot(), 60, 24, "events");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const tabRow = frame.split("\n").find((l) => l.includes("CLAUDE") && l.includes("AGY"));
      expect(tabRow).toBeDefined();
      expect(tabRow!).toContain("LOG*");
      expect(tabRow!).not.toContain("CLAUDE*");
      expect(tabRow!).not.toContain("AGY*");
      expect(tabRow!).not.toContain("GOV*");
    } finally {
      setup.renderer.destroy();
    }
  });
});

describe("Finding 4e: at 60 columns, all six StatusBar facts remain on its single row", () => {
  test("60 cols: connection, session, writer/token, pending, focus, ledger all present", async () => {
    // Construct the snapshot with a known max seq so the ledger fact is unambiguous.
    const snapshot = makeSnapshot({
      activeWriter: "exec-claude-code",
      fencingToken: 41,
      pendingApprovals: [],
      eventLog: [
        { seq: 41, type: "session-start", actor: "claude-code", fencingToken: 41, hash: "abc123", timestamp: "2026-08-08T12:00:00Z" },
      ],
    });
    const setup = await renderApp(snapshot, 60, 24, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      // The StatusBar row is the one containing CONN
      const statusRow = frame.split("\n").find((l) => l.includes("CONN") || l.includes("NOCONN"));
      expect(statusRow).toBeDefined();
      // 1. connection
      expect(statusRow!).toMatch(/CONN|NOCONN/);
      // 2. session
      expect(statusRow!).toContain("S:");
      expect(statusRow!).toContain("active");
      // 3. writer + fencing token
      expect(statusRow!).toContain("W:");
      expect(statusRow!).toContain("#41");
      // 4. pending count
      expect(statusRow!).toContain("P:");
      // 5. focus
      expect(statusRow!).toContain("F:");
      expect(statusRow!).toContain("CLAUDE");
      // 6. ledger sequence
      expect(statusRow!).toContain("L:");
      expect(statusRow!).toContain("#41");
    } finally {
      setup.renderer.destroy();
    }
  });
});

describe("Finding 4f: connected===false with retained identity/writer/output data", () => {
  test("disconnected stage preserves real buffered PTY output", async () => {
    // Render ClaudePane directly with disconnected state and PTY output.
    const { ClaudePane } = await import("../src/tui/panes/ClaudePane");
    const snapshot = makeSnapshot({
      connected: false,
      activeWriter: "exec-claude-code",
      fencingToken: 3,
    });
    const setup = await testRender(
      <ClaudePane active={true} state={snapshot} ptyOutput={"real output line one\nline two\n"} />,
      { width: 120, height: 12 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("real output line one");
      expect(frame).toContain("line two");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("disconnected stage does NOT claim WRITER while disconnected", async () => {
    const snapshot = makeSnapshot({
      connected: false,
      activeWriter: "exec-claude-code",
      fencingToken: 3,
    });
    const setup = await renderApp(snapshot, 120, 34, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).not.toContain("WRITER");
      expect(frame).toContain("STREAM ENDED");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("disconnected dock preserves buffered count and shows ended word", async () => {
    const snapshot = makeSnapshot({
      connected: false,
      activeWriter: "exec-antigravity",
      fencingToken: 7,
    });
    const setup = await testRender(
      <DockStrip surface="antigravity" state={snapshot} ptyOutput={"a\nb\nc\nd\n"} />,
      { width: 120, height: 6 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("4");
      expect(frame).toContain("buffered");
      expect(frame).toContain("STREAM ENDED");
      expect(frame).not.toContain("WRITER");
    } finally {
      setup.renderer.destroy();
    }
  });
});
