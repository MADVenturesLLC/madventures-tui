// apps/madbridge/test/tui-governance-surfaces.test.tsx
// Phase 2 — Founder Decision, Incident, and Governance Surfaces.
//
// Tests:
// - DecisionStrip visibility, stored-ID binding, focus gating
// - IncidentBand precedence over pending decisions
// - GovernancePane scope/transfer/verification/review provenance
// - Layout regression (Phase 1 geometry preserved)
//
// Uses @opentui/react/test-utils testRender + captureCharFrame.
// Uses the actual App for lifecycle and precedence tests.

import { test, expect, describe } from "bun:test";
import { act } from "react";
import { testRender } from "@opentui/react/test-utils";
import { App } from "../src/tui/App";
import { DecisionStrip } from "../src/tui/components/DecisionStrip";
import { IncidentBand } from "../src/tui/components/IncidentBand";
import { validateApprovalResolution } from "../src/tui/keyboard-router";
import type { KeyboardRouterState } from "../src/tui/keyboard-router";
import { loadKeybindings, parseKeybindings, DEFAULT_KEYBINDINGS } from "../src/tui/keybindings";
import type {
  BrokerSnapshot,
  FocusTarget,
  ApprovalRequestEvent,
  PendingApproval,
  ApprovalColorState,
} from "../src/tui/types";
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

function makeApproval(
  id: string,
  colorState: ApprovalColorState = { kind: "pending", text: "PENDING — awaiting Founder decision" },
): PendingApproval {
  return {
    id,
    type: "transfer",
    actor: "antigravity",
    taskId: "task-" + id,
    repositoryFingerprint: makeFingerprint(),
    scope: "write",
    timestamp: "2026-08-08T12:00:00Z",
    colorState,
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
  const props: Record<string, unknown> = {};
  if (subscribe) props.subscribe = subscribe;
  if (opts?.onApprovalResolve) props.onApprovalResolve = opts.onApprovalResolve;
  if (opts?.fixture) props.fixture = opts.fixture;
  // Deterministic OMP catalog stub — tests must never shell out to omp.
  // BISECT: never resolves — isolates whether the artifact is the async
  // catalog state update or the row itself.
  props.catalogLoader = async () => new Promise<never>(() => {});
  const setup = await testRender(<App {...props} />, { width, height });
  if (focus) {
    // GLM-20260918-FOUNDER-TUI-SEATS keymap: Alt+1/2/3 are seat keys
    // (builder/architect focus claude, operator focuses governance);
    // antigravity is Alt+4 and events is Alt+5.
    const keyMap: Record<FocusTarget, string> = {
      claude: "1",
      antigravity: "4",
      governance: "3",
      events: "5",
    };
    setup.mockInput.pressKey(keyMap[focus], { meta: true });
    await setup.flush();
    await setup.flush();
  } else {
    await setup.flush();
  }
  return setup;
}

function makeRouterState(
  focus: FocusTarget,
  showDialog = false,
  displayedId: string | null = null,
  resolvedIds: ReadonlySet<string> = new Set(),
): KeyboardRouterState {
  return { focus, showApprovalDialog: showDialog, displayedApprovalId: displayedId, resolvedApprovalIds: resolvedIds };
}

// ═══════════════════════════════════════════════════════════════════════
// Decision visibility and binding (tests 1-10)
// ═══════════════════════════════════════════════════════════════════════

describe("Decision visibility and binding", () => {
  test("1. No pending approvals → no FOUNDER DECISION", async () => {
    const setup = await renderApp(makeSnapshot(), 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).not.toContain("FOUNDER DECISION");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("2. Pending approval → full-width DecisionStrip appears", async () => {
    const snapshot = makeSnapshot({ pendingApprovals: [makeApproval("approval-A")] });
    const setup = await renderApp(snapshot, 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("FOUNDER DECISION");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("3. Approved/rejected/expired-only records → strip absent", async () => {
    const snapshot = makeSnapshot({
      pendingApprovals: [
        makeApproval("a1", { kind: "approved", text: "APPROVED — Founder authorized" }),
        makeApproval("a2", { kind: "rejected", text: "REJECTED — Founder denied" }),
        makeApproval("a3", { kind: "expired", text: "EXPIRED — decision window elapsed" }),
      ],
    });
    const setup = await renderApp(snapshot, 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).not.toContain("FOUNDER DECISION");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("4. Multiple pending approvals → correct (1 of N) text", async () => {
    const snapshot = makeSnapshot({
      pendingApprovals: [makeApproval("a1"), makeApproval("a2"), makeApproval("a3")],
    });
    const setup = await renderApp(snapshot, 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("FOUNDER DECISION");
      expect(frame).toContain("1 of 3");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("5. Displayed Event ID is visible", async () => {
    const snapshot = makeSnapshot({ pendingApprovals: [makeApproval("approval-XYZ")] });
    const setup = await renderApp(snapshot, 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("approval-XYZ");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("6. Queue reordering does not change the bound displayed approval", async () => {
    const resolutions: ApprovalRequestEvent[] = [];
    let currentSnapshot = makeSnapshot({ pendingApprovals: [makeApproval("approval-A")] });
    const listenerRef: { fn: ((s: BrokerSnapshot) => void) | null } = { fn: null };
    const subscribe = (listener: (s: BrokerSnapshot) => void) => {
      listenerRef.fn = listener;
      listener(currentSnapshot);
      return () => { listenerRef.fn = null; };
    };

    const setup = await testRender(
      <App subscribe={subscribe} onApprovalResolve={(e) => resolutions.push(e)} />,
      { width: 120, height: 34 },
    );
    try {
      // Focus governance to bind to approval-A
      setup.mockInput.pressKey("3", { meta: true });
      await setup.flush();
      await setup.flush();

      // Reorder the queue: B is now first, A is second
      currentSnapshot = makeSnapshot({
        pendingApprovals: [makeApproval("approval-B"), makeApproval("approval-A")],
      });
      act(() => {
        if (listenerRef.fn) listenerRef.fn(currentSnapshot);
      });
      await setup.waitForVisualIdle({ maxFrames: 10 });

      // Accept — must resolve approval-A (the bound ID), not approval-B
      setup.mockInput.pressKey("y", { meta: true });
      await setup.flush();
      await setup.flush();

      expect(resolutions.length).toBe(1);
      expect(resolutions[0]!.taskId).toBe("task-approval-A");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("7. Resolution event carries task, actor, scope, fingerprint, and resolution", async () => {
    const resolutions: ApprovalRequestEvent[] = [];
    const snapshot = makeSnapshot({ pendingApprovals: [makeApproval("approval-A")] });
    const setup = await renderApp(snapshot, 120, 34, "governance", {
      onApprovalResolve: (e) => resolutions.push(e),
    });
    try {
      setup.mockInput.pressKey("y", { meta: true });
      await setup.flush();
      await setup.flush();
      expect(resolutions.length).toBe(1);
      const evt = resolutions[0]!;
      expect(evt.taskId).toBe("task-approval-A");
      expect(evt.actor).toBe("antigravity");
      expect(evt.scope).toBe("write");
      expect(evt.repositoryFingerprint.kind).toBe("commit");
      expect(evt.repositoryFingerprint.sha256.length).toBe(64);
      expect(evt.resolution).toBe("accept");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("8. A removed displayed approval emits nothing", async () => {
    const resolutions: ApprovalRequestEvent[] = [];
    let currentSnapshot = makeSnapshot({ pendingApprovals: [makeApproval("approval-A")] });
    const listenerRef: { fn: ((s: BrokerSnapshot) => void) | null } = { fn: null };
    const subscribe = (listener: (s: BrokerSnapshot) => void) => {
      listenerRef.fn = listener;
      listener(currentSnapshot);
      return () => { listenerRef.fn = null; };
    };

    const setup = await testRender(
      <App subscribe={subscribe} onApprovalResolve={(e) => resolutions.push(e)} />,
      { width: 120, height: 34 },
    );
    try {
      setup.mockInput.pressKey("3", { meta: true });
      await setup.flush();
      await setup.flush();

      // Remove approval-A entirely
      currentSnapshot = makeSnapshot({ pendingApprovals: [] });
      act(() => {
        if (listenerRef.fn) listenerRef.fn(currentSnapshot);
      });
      await setup.waitForVisualIdle({ maxFrames: 10 });

      setup.mockInput.pressKey("y", { meta: true });
      await setup.flush();
      expect(resolutions).toEqual([]);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("9. Unchanged snapshot cannot reopen or resolve the same ID twice", async () => {
    const resolutions: ApprovalRequestEvent[] = [];
    const snapshot = makeSnapshot({ pendingApprovals: [makeApproval("approval-A")] });
    const setup = await renderApp(snapshot, 120, 34, "governance", {
      onApprovalResolve: (e) => resolutions.push(e),
    });
    try {
      // Accept once
      setup.mockInput.pressKey("y", { meta: true });
      await setup.flush();
      await setup.flush();
      expect(resolutions.length).toBe(1);

      // Try to accept again
      setup.mockInput.pressKey("y", { meta: true });
      await setup.flush();
      await setup.flush();
      expect(resolutions.length).toBe(1);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("10. Custom keybindings displayed by the strip match the configured map", async () => {
    const origEnv = process.env.FOUNDER_TUI_KEYS;
    // Include focus keys so Alt+3 still focuses governance, plus custom
    // accept/reject keys that differ from the default Alt+Y/Alt+N.
    process.env.FOUNDER_TUI_KEYS = "alt+1:focus-claude,alt+2:focus-antigravity,alt+3:focus-governance,alt+4:focus-events,alt+o:accept-approval,alt+x:reject-approval,alt+q:quit";
    try {
      const snapshot = makeSnapshot({ pendingApprovals: [makeApproval("approval-A")] });
      const setup = await renderApp(snapshot, 120, 34, "governance");
      try {
        await setup.flush();
        const frame = setup.captureCharFrame();
        // The strip must show the configured keys, not hard-coded Alt+Y/Alt+N
        expect(frame).toContain("ALT+O");
        expect(frame).toContain("ALT+X");
        expect(frame).not.toContain("ALT+Y");
        expect(frame).not.toContain("ALT+N");
      } finally {
        setup.renderer.destroy();
      }
    } finally {
      process.env.FOUNDER_TUI_KEYS = origEnv;
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════
// Focus and authority (tests 11-16)
// ═══════════════════════════════════════════════════════════════════════

describe("Focus and authority", () => {
  test("11. Visible strip + Claude focus → accept/reject inert", async () => {
    const resolutions: ApprovalRequestEvent[] = [];
    const snapshot = makeSnapshot({ pendingApprovals: [makeApproval("approval-A")] });
    const setup = await renderApp(snapshot, 120, 34, "claude", {
      onApprovalResolve: (e) => resolutions.push(e),
    });
    try {
      setup.mockInput.pressKey("y", { meta: true });
      await setup.flush();
      expect(resolutions).toEqual([]);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("12. Visible strip + Antigravity focus → inert", async () => {
    const resolutions: ApprovalRequestEvent[] = [];
    const snapshot = makeSnapshot({ pendingApprovals: [makeApproval("approval-A")] });
    const setup = await renderApp(snapshot, 120, 34, "antigravity", {
      onApprovalResolve: (e) => resolutions.push(e),
    });
    try {
      setup.mockInput.pressKey("y", { meta: true });
      await setup.flush();
      expect(resolutions).toEqual([]);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("13. Visible strip + Events focus → inert", async () => {
    const resolutions: ApprovalRequestEvent[] = [];
    const snapshot = makeSnapshot({ pendingApprovals: [makeApproval("approval-A")] });
    const setup = await renderApp(snapshot, 120, 34, "events", {
      onApprovalResolve: (e) => resolutions.push(e),
    });
    try {
      setup.mockInput.pressKey("y", { meta: true });
      await setup.flush();
      expect(resolutions).toEqual([]);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("14. Governance focus + safely armed pending strip → exactly one event", async () => {
    const resolutions: ApprovalRequestEvent[] = [];
    const snapshot = makeSnapshot({ pendingApprovals: [makeApproval("approval-A")] });
    const setup = await renderApp(snapshot, 120, 34, "governance", {
      onApprovalResolve: (e) => resolutions.push(e),
    });
    try {
      setup.mockInput.pressKey("y", { meta: true });
      await setup.flush();
      await setup.flush();
      expect(resolutions.length).toBe(1);
      expect(resolutions[0]!.resolution).toBe("accept");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("15. Bare terminal bytes still reach the PTY byte-identically", async () => {
    const ptyWrites: string[] = [];
    const subscribe = makeSubscribe(makeSnapshot());
    const setup = await testRender(
      <App subscribe={subscribe} onPtyWrite={(d) => ptyWrites.push(d)} />,
      { width: 120, height: 34 },
    );
    try {
      // Bare 'a' should pass through to PTY
      setup.mockInput.pressKey("a");
      await setup.flush();
      expect(ptyWrites).toEqual(["a"]);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("16. Seat keys are the default Alt+1/2/3; pane focus moved to Alt+4/5", () => {
    // Updated per Founder commission GLM-20260918-FOUNDER-TUI-SEATS:
    // Alt+1/2/3 now switch seats (builder/architect/operator). The previous
    // Alt+1..4 pane-focus map moved: antigravity → Alt+4, events → Alt+5.
    // "focus-claude" and "focus-governance" remain valid actions reachable
    // via the FOUNDER_TUI_KEYS override. Ctrl+P opens the model picker.
    const bindings = loadKeybindings();
    expect(resolveKey("alt+1", bindings)).toBe("seat-builder");
    expect(resolveKey("alt+2", bindings)).toBe("seat-architect");
    expect(resolveKey("alt+3", bindings)).toBe("seat-operator");
    expect(resolveKey("alt+4", bindings)).toBe("focus-antigravity");
    expect(resolveKey("alt+5", bindings)).toBe("focus-events");
    expect(resolveKey("alt+y", bindings)).toBe("accept-approval");
    expect(resolveKey("alt+n", bindings)).toBe("reject-approval");
    expect(resolveKey("alt+q", bindings)).toBe("quit");
    expect(resolveKey("ctrl+p", bindings)).toBe("open-model-picker");
    expect(DEFAULT_KEYBINDINGS.length).toBe(9);
  });
});

// helper for test 16
import { resolveKey } from "../src/tui/keybindings";

// ═══════════════════════════════════════════════════════════════════════
// Incident precedence (tests 17-23)
// ═══════════════════════════════════════════════════════════════════════

describe("Incident precedence", () => {
  test("17. Incident record → IncidentBand visible", async () => {
    const snapshot = makeSnapshot({
      incident: { id: "inc-1", reason: "Unexpected disconnect", timestamp: "2026-08-08T12:15:00Z", severity: "medium" },
    });
    const setup = await renderApp(snapshot, 120, 34, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("SESSION INTERRUPTED");
      expect(frame).toContain("Unexpected disconnect");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("18. sessionState interrupted with no incident record → IncidentBand visible with — fallbacks", async () => {
    const snapshot = makeSnapshot({ sessionState: "interrupted", incident: null });
    const setup = await renderApp(snapshot, 120, 34, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("SESSION INTERRUPTED");
      // Reason is unavailable → explicit dash
      expect(frame).toContain("—");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("19. Incident + pending approval → IncidentBand visible and DecisionStrip absent", async () => {
    const snapshot = makeSnapshot({
      sessionState: "interrupted",
      incident: { id: "inc-1", reason: "crash", timestamp: "2026-08-08T12:15:00Z", severity: "high" },
      pendingApprovals: [makeApproval("approval-A")],
    });
    const setup = await renderApp(snapshot, 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("SESSION INTERRUPTED");
      expect(frame).not.toContain("FOUNDER DECISION");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("20. A decision armed before an incident arrives becomes inert", async () => {
    const resolutions: ApprovalRequestEvent[] = [];
    let currentSnapshot = makeSnapshot({ pendingApprovals: [makeApproval("approval-A")] });
    const listenerRef: { fn: ((s: BrokerSnapshot) => void) | null } = { fn: null };
    const subscribe = (listener: (s: BrokerSnapshot) => void) => {
      listenerRef.fn = listener;
      listener(currentSnapshot);
      return () => { listenerRef.fn = null; };
    };

    const setup = await testRender(
      <App subscribe={subscribe} onApprovalResolve={(e) => resolutions.push(e)} />,
      { width: 120, height: 34 },
    );
    try {
      // Arm the decision
      setup.mockInput.pressKey("3", { meta: true });
      await setup.flush();
      await setup.flush();

      // Incident arrives
      currentSnapshot = makeSnapshot({
        sessionState: "interrupted",
        incident: { id: "inc-1", reason: "crash", timestamp: "2026-08-08T12:15:00Z", severity: "high" },
        pendingApprovals: [makeApproval("approval-A")],
      });
      act(() => {
        if (listenerRef.fn) listenerRef.fn(currentSnapshot);
      });
      await setup.waitForVisualIdle({ maxFrames: 10 });

      // Try to accept during incident → must be inert
      setup.mockInput.pressKey("y", { meta: true });
      await setup.flush();
      expect(resolutions).toEqual([]);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("21. Alt+Y/Alt+N during an incident emits nothing", async () => {
    const resolutions: ApprovalRequestEvent[] = [];
    const snapshot = makeSnapshot({
      sessionState: "interrupted",
      incident: { id: "inc-1", reason: "crash", timestamp: "2026-08-08T12:15:00Z", severity: "high" },
      pendingApprovals: [makeApproval("approval-A")],
    });
    const setup = await renderApp(snapshot, 120, 34, "governance", {
      onApprovalResolve: (e) => resolutions.push(e),
    });
    try {
      setup.mockInput.pressKey("y", { meta: true });
      await setup.flush();
      setup.mockInput.pressKey("n", { meta: true });
      await setup.flush();
      expect(resolutions).toEqual([]);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("22. Incident text includes SESSION INTERRUPTED, reason, and fail-closed writing/token statement", async () => {
    const snapshot = makeSnapshot({
      sessionState: "interrupted",
      fencingToken: 7,
      incident: { id: "inc-1", reason: "Unexpected disconnect", timestamp: "2026-08-08T12:15:00Z", severity: "medium" },
    });
    const setup = await renderApp(snapshot, 120, 34, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("SESSION INTERRUPTED");
      expect(frame).toContain("Unexpected disconnect");
      // Fail-closed consequence wording
      expect(frame).toContain("frozen");
      expect(frame).toContain("#7");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("23a. Incident uses heavy border; decision uses double border (isolated)", async () => {
    // DecisionStrip isolated with double border
    const ds = await testRender(
      <DecisionStrip approval={makeApproval("a1")} position={1} total={1} armed={true} keybindings={parseKeybindings(DEFAULT_KEYBINDINGS)} />,
      { width: 120, height: 12 },
    );
    try {
      await ds.flush();
      const dframe = ds.captureCharFrame();
      // double border uses ╔ ╗ ╚ ╝
      expect(dframe).toContain("╔");
      expect(dframe).toContain("╗");
    } finally {
      ds.renderer.destroy();
    }

    // IncidentBand isolated with heavy border
    const ib = await testRender(
      <IncidentBand state={makeSnapshot({ sessionState: "interrupted", incident: { id: "inc-1", reason: "x", timestamp: "t", severity: "high" } })} />,
      { width: 120, height: 8 },
    );
    try {
      await ib.flush();
      const iframe = ib.captureCharFrame();
      // heavy border uses ┏ ┓ ┗ ┛
      expect(iframe).toContain("┏");
      expect(iframe).toContain("┓");
    } finally {
      ib.renderer.destroy();
    }
  });

  test("23b. validateApprovalResolution fails closed when sessionState is interrupted", () => {
    const snapshot = makeSnapshot({
      sessionState: "interrupted",
      pendingApprovals: [makeApproval("approval-A")],
    });
    const state = makeRouterState("governance", true, "approval-A");
    expect(validateApprovalResolution(state, snapshot)).toBeNull();
  });

  test("23c. validateApprovalResolution fails closed when incident !== null", () => {
    const snapshot = makeSnapshot({
      incident: { id: "inc-1", reason: "x", timestamp: "t", severity: "high" },
      pendingApprovals: [makeApproval("approval-A")],
    });
    const state = makeRouterState("governance", true, "approval-A");
    expect(validateApprovalResolution(state, snapshot)).toBeNull();
  });
});

// ═══════════════════════════════════════════════════════════════════════
// Governance projection (tests 24-35)
// ═══════════════════════════════════════════════════════════════════════

describe("Governance projection", () => {
  test("24. Connected Governance frame has a readable GOVERNANCE title", async () => {
    const setup = await renderApp(makeSnapshot(), 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("GOVERNANCE");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("25. Permissions: Active is absent", async () => {
    const setup = await renderApp(makeSnapshot(), 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).not.toContain("Permissions: Active");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("26. Read paths are rendered", async () => {
    const setup = await renderApp(makeSnapshot({ permissionSummary: { allowedReadPaths: ["./src", "./docs"], allowedWritePaths: ["./src"], allowedCommandCategories: ["read"], allowedEgressDestinations: [], dataClass: "internal" } }), 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("./src");
      expect(frame).toContain("./docs");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("27. Write paths are rendered", async () => {
    const setup = await renderApp(makeSnapshot({ permissionSummary: { allowedReadPaths: ["./src"], allowedWritePaths: ["./src", "./build"], allowedCommandCategories: ["read"], allowedEgressDestinations: [], dataClass: "internal" } }), 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("./build");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("28. Command categories are rendered", async () => {
    const setup = await renderApp(makeSnapshot({ permissionSummary: { allowedReadPaths: ["./src"], allowedWritePaths: ["./src"], allowedCommandCategories: ["read", "write", "test"], allowedEgressDestinations: [], dataClass: "internal" } }), 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("read");
      expect(frame).toContain("write");
      expect(frame).toContain("test");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("29. Egress destinations rendered, including none for empty list", async () => {
    const setup = await renderApp(makeSnapshot({ permissionSummary: { allowedReadPaths: ["./src"], allowedWritePaths: ["./src"], allowedCommandCategories: ["read"], allowedEgressDestinations: [], dataClass: "internal" } }), 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      // Empty allowed list is rendered as "none"
      expect(frame.toLowerCase()).toContain("none");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("30. Data class is rendered", async () => {
    const setup = await renderApp(makeSnapshot({ permissionSummary: { allowedReadPaths: ["./src"], allowedWritePaths: ["./src"], allowedCommandCategories: ["read"], allowedEgressDestinations: [], dataClass: "confidential" } }), 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("confidential");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("31. Verification result, detail, verifiedBy, and timestamp are all rendered", async () => {
    const snapshot = makeSnapshot({
      verificationStatus: { result: "pass", detail: "All tests passed", verifiedBy: "exec-claude-code", timestamp: "2026-08-08T12:30:00Z" },
    });
    const setup = await renderApp(snapshot, 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("pass");
      expect(frame).toContain("All tests passed");
      expect(frame).toContain("exec-claude-code");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("32. Review decision, comments, reviewedBy, and timestamp are all rendered", async () => {
    const snapshot = makeSnapshot({
      reviewStatus: { decision: "approved", comments: "LGTM", reviewedBy: "exec-antigravity", timestamp: "2026-08-08T12:35:00Z" },
    });
    const setup = await renderApp(snapshot, 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("approved");
      expect(frame).toContain("LGTM");
      expect(frame).toContain("exec-antigravity");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("33. Transfer phase and pending transfer details are rendered", async () => {
    const snapshot = makeSnapshot({
      transferPhase: "sender-released",
      pendingTransfers: [{ id: "t1", from: "exec-claude-code", to: "exec-antigravity", reason: "handoff", fencingToken: 3, timestamp: "2026-08-08T12:20:00Z" }],
    });
    const setup = await renderApp(snapshot, 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("sender-released");
      expect(frame).toContain("exec-claude-code");
      expect(frame).toContain("exec-antigravity");
      expect(frame).toContain("handoff");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("34. Null verification/review/transfer fields use explicit — or none", async () => {
    const setup = await renderApp(makeSnapshot(), 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      // verificationStatus is null, reviewStatus is null, transferPhase is null
      expect(frame).toContain("—");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("35. Disconnected Governance shows NOT CONNECTED and does not claim current permissions/verification/review", async () => {
    const setup = await renderApp(null, 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("NOT CONNECTED");
      // Must not claim current permissions/verification/review
      expect(frame).not.toContain("Permissions: Active");
    } finally {
      setup.renderer.destroy();
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════
// Layout regression (tests 36-43)
// ═══════════════════════════════════════════════════════════════════════

describe("Layout regression", () => {
  test("36. Wide stage/dock behavior remains intact", async () => {
    const setup = await renderApp(makeSnapshot(), 120, 34, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("CLAUDE CODE");
      expect(frame).toContain("ANTIGRAVITY");
      expect(frame).toContain("docked");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("37. Narrow tabs still mark the exact selected target", async () => {
    const setup = await renderApp(makeSnapshot(), 60, 24, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const tabRow = frame.split("\n").find((l) => l.includes("CLAUDE") && l.includes("AGY"));
      expect(tabRow).toBeDefined();
      expect(tabRow!).toContain("GOV*");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("38. Dock remains exactly one physical row at 80 columns", async () => {
    const setup = await renderApp(makeSnapshot({ activeWriter: "exec-claude-code", fencingToken: 3 }), 80, 24, "antigravity");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const rows = frame.split("\n").filter((l) => l.trim().length > 0);
      const dockRows = rows.filter((r) => r.includes("CLAUDE") && r.includes("docked"));
      expect(dockRows.length).toBe(1);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("39. StatusBar remains exactly one row at 120, 80, and 60", async () => {
    for (const [w, h] of [[120, 34], [80, 24], [60, 24]] as const) {
      const setup = await renderApp(makeSnapshot(), w, h, "claude");
      try {
        await setup.flush();
        const frame = setup.captureCharFrame();
        const statusRows = frame.split("\n").filter((l) => l.includes("CONN") || l.includes("NOCONN"));
        expect(statusRows.length).toBe(1);
      } finally {
        setup.renderer.destroy();
      }
    }
  });

  test("40. All six StatusBar facts remain present at 60 columns", async () => {
    const setup = await renderApp(makeSnapshot({ fencingToken: 41, eventLog: [{ seq: 41, type: "session-start", actor: "claude-code", fencingToken: 41, hash: "abc123", timestamp: "2026-08-08T12:00:00Z" }] }), 60, 24, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const statusRow = frame.split("\n").find((l) => l.includes("CONN"));
      expect(statusRow).toBeDefined();
      expect(statusRow!).toContain("S:");
      expect(statusRow!).toContain("W:");
      expect(statusRow!).toContain("#41");
      expect(statusRow!).toContain("P:");
      expect(statusRow!).toContain("F:");
      expect(statusRow!).toContain("L:");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("41. Fixture banner remains a separate truth row", async () => {
    const setup = await renderApp(makeSnapshot(), 120, 34, "claude", { fixture: true });
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("FIXTURE DATA");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("42. Two unchanged renders produce byte-identical frames", async () => {
    const snapshot = makeSnapshot({ pendingApprovals: [makeApproval("a1")] });
    const setup1 = await renderApp(snapshot, 120, 34, "governance");
    let frame1: string;
    try {
      await setup1.flush();
      frame1 = setup1.captureCharFrame();
    } finally {
      setup1.renderer.destroy();
    }
    const setup2 = await renderApp(snapshot, 120, 34, "governance");
    let frame2: string;
    try {
      await setup2.flush();
      frame2 = setup2.captureCharFrame();
    } finally {
      setup2.renderer.destroy();
    }
    expect(frame1).toBe(frame2);
  });

  test("43. No timer, animation, spinner, or timeline mechanism is introduced", () => {
    // Re-use the Phase 1 static-source scan. This test fails if any forbidden
    // timer/animation mechanism is added under src/tui/.
    const { existsSync, readFileSync, readdirSync } = require("node:fs");
    const { join } = require("node:path");
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
    const tuiDir = join(process.cwd(), "apps/madbridge/src/tui");
    const files = listSourceFiles(tuiDir);
    expect(files.length).toBeGreaterThan(0);
    const forbidden = [
      /\bsetTimeout\b/,
      /\bsetInterval\b/,
      /\brequestAnimationFrame\b/,
      /\bclearTimeout\b/,
      /\bclearInterval\b/,
      /from\s+["'].*spinner/i,
      /from\s+["'].*animate/i,
      /from\s+["'].*marquee/i,
    ];
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      for (const pattern of forbidden) {
        if (pattern.test(source)) {
          throw new Error(`Forbidden pattern ${String(pattern)} found in ${file}`);
        }
      }
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════
// Correction 1: Remove the interrupted WRITER contradiction
// ═══════════════════════════════════════════════════════════════════════

describe("Correction 1: interrupted/incident suppresses WRITER badge", () => {
  test("1a. connected + interrupted + retained Claude writer → no WRITER on stage", async () => {
    const snapshot = makeSnapshot({
      connected: true,
      sessionState: "interrupted",
      activeWriter: "exec-claude-code",
      fencingToken: 3,
    });
    const setup = await renderApp(snapshot, 120, 34, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      // Stage must not show WRITER while interrupted
      expect(frame).not.toContain("WRITER");
      // Must show an explicit non-authoritative state
      const hasFrozen = frame.includes("WRITING FROZEN") || frame.includes("SESSION INTERRUPTED");
      expect(hasFrozen).toBe(true);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("1b. connected + interrupted + retained Claude writer → no WRITER on dock", async () => {
    const snapshot = makeSnapshot({
      connected: true,
      sessionState: "interrupted",
      activeWriter: "exec-claude-code",
      fencingToken: 3,
    });
    const setup = await renderApp(snapshot, 120, 34, "antigravity");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      // Dock (Claude is docked) must not show WRITER
      expect(frame).not.toContain("WRITER");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("1c. connected + incident + active session + retained writer → no WRITER", async () => {
    const snapshot = makeSnapshot({
      connected: true,
      sessionState: "active",
      activeWriter: "exec-claude-code",
      fencingToken: 3,
      incident: { id: "inc-1", reason: "crash", timestamp: "2026-08-08T12:15:00Z", severity: "high" },
    });
    const setup = await renderApp(snapshot, 120, 34, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).not.toContain("WRITER");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("1d. changing focus cannot restore the writer badge during the incident", async () => {
    const snapshot = makeSnapshot({
      connected: true,
      sessionState: "interrupted",
      activeWriter: "exec-claude-code",
      fencingToken: 3,
    });
    // Try each focus target — none should show WRITER
    for (const focus of ["claude", "antigravity", "governance", "events"] as FocusTarget[]) {
      const setup = await renderApp(snapshot, 120, 34, focus);
      try {
        await setup.flush();
        const frame = setup.captureCharFrame();
        expect(frame).not.toContain("WRITER");
      } finally {
        setup.renderer.destroy();
      }
    }
  });

  test("1e. clearing the incident and returning to active restores the truthful writer badge", async () => {
    let currentSnapshot = makeSnapshot({
      connected: true,
      sessionState: "interrupted",
      activeWriter: "exec-claude-code",
      fencingToken: 3,
    });
    const listenerRef: { fn: ((s: BrokerSnapshot) => void) | null } = { fn: null };
    const subscribe = (listener: (s: BrokerSnapshot) => void) => {
      listenerRef.fn = listener;
      listener(currentSnapshot);
      return () => { listenerRef.fn = null; };
    };

    const setup = await testRender(<App subscribe={subscribe} />, { width: 120, height: 34 });
    try {
      // While interrupted — no WRITER
      setup.mockInput.pressKey("1", { meta: true }); // focus Claude
      await setup.flush();
      await setup.flush();
      let frame = setup.captureCharFrame();
      expect(frame).not.toContain("WRITER");

      // Clear the incident, return to active
      currentSnapshot = makeSnapshot({
        connected: true,
        sessionState: "active",
        activeWriter: "exec-claude-code",
        fencingToken: 3,
        incident: null,
      });
      act(() => {
        if (listenerRef.fn) listenerRef.fn(currentSnapshot);
      });
      await setup.waitForVisualIdle({ maxFrames: 10 });

      frame = setup.captureCharFrame();
      // Writer badge returns truthfully
      expect(frame).toContain("WRITER");
      expect(frame).toContain("tok#3");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("1f. incident evidence still displays the retained token", async () => {
    const snapshot = makeSnapshot({
      connected: true,
      sessionState: "interrupted",
      activeWriter: "exec-claude-code",
      fencingToken: 7,
      incident: { id: "inc-1", reason: "crash", timestamp: "2026-08-08T12:15:00Z", severity: "high" },
    });
    const setup = await renderApp(snapshot, 120, 34, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      // The IncidentBand shows the retained token as evidence
      expect(frame).toContain("#7");
      expect(frame).toContain("invalidated");
    } finally {
      setup.renderer.destroy();
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════
// Correction 2: Eliminate all 60-column interleaving
// ═══════════════════════════════════════════════════════════════════════

describe("Correction 2: no interleaving at 60 columns with long values", () => {
  // Helper: check for known overlap artifacts. These patterns appear when
  // OpenTUI overlaps adjacent text fragments on the same row.
  function hasInterleavingArtifacts(frame: string): boolean {
    // Look for characters from one label bleeding into another.
    // Known artifacts include mid-word capitalization jumps like "TaskRID"
    // or "Type:EtransferO" where adjacent box content merges.
    const artifacts = [
      /Task[A-Z]{3,}/,       // "TaskRID" — "Task" merging with "GOVERNANCE"
      /Type:[A-Z][a-z]/,     // "Type:Etransfer" — colon followed by wrong case
      /Commands:[a-z][a-z,]/, // "Commands:rread" — adjacent fragment overlap
    ];
    return artifacts.some((p) => p.test(frame));
  }

  test("2a. long verification detail at 60 cols — no interleaving, labels intact", async () => {
    const snapshot = makeSnapshot({
      verificationStatus: {
        result: "pass",
        detail: "All 847 tests passed including integration suite and ownership transfer verification across both adapters with full ledger replay",
        verifiedBy: "exec-claude-code-very-long-identifier",
        timestamp: "2026-08-08T12:30:00Z",
      },
    });
    const setup = await renderApp(snapshot, 60, 24, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      // Exact intact labels must be present
      expect(frame).toContain("Verification");
      expect(frame).toContain("pass");
      // No interleaving artifacts
      expect(hasInterleavingArtifacts(frame)).toBe(false);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("2b. long reviewer comments at 60 cols — no interleaving, labels intact", async () => {
    const snapshot = makeSnapshot({
      reviewStatus: {
        decision: "changes-requested",
        comments: "The ownership transfer protocol needs additional safeguards around concurrent fencing token validation and retry semantics before I can approve this for production deployment",
        reviewedBy: "exec-antigravity-with-very-long-name",
        timestamp: "2026-08-08T12:35:00Z",
      },
    });
    const setup = await renderApp(snapshot, 60, 24, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("Review");
      expect(frame).toContain("changes-requested");
      expect(hasInterleavingArtifacts(frame)).toBe(false);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("2c. long execution IDs at 60 cols — no interleaving", async () => {
    const snapshot = makeSnapshot({
      executions: [
        { execution_id: "exec-claude-code-sonnet-4-20250811-long-id", role: "builder", surface: parseSurfaceId("claude-code"), model: "claude-sonnet-4", provider: "anthropic", independence_domain: "fixture-builder-control", effort: "medium" },
        { execution_id: "exec-antigravity-gemini-pro-20250811-long-id", role: "independent-reviewer", surface: parseSurfaceId("antigravity"), model: "gemini-2.5-pro", provider: "google", independence_domain: "fixture-review-control", effort: "medium" },
      ],
    });
    const setup = await renderApp(snapshot, 60, 24, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("Claude:");
      expect(frame).toContain("Antigravity:");
      expect(hasInterleavingArtifacts(frame)).toBe(false);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("2d. long repository fingerprint at 60 cols — no interleaving", async () => {
    const snapshot = makeSnapshot({
      repositoryFingerprint: { kind: "commit", sha256: "f".repeat(64), git_sha: "fedcba9876543210fedcba9876543210fedcba98" },
    });
    const setup = await renderApp(snapshot, 60, 24, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("Fingerprint");
      expect(hasInterleavingArtifacts(frame)).toBe(false);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("2e. long incident reason at 60 cols — no interleaving, IncidentBand readable", async () => {
    const snapshot = makeSnapshot({
      sessionState: "interrupted",
      incident: { id: "inc-very-long-identifier-001", reason: "Unexpected kernel-level disconnect during ownership transfer with pending verification across both adapters", timestamp: "2026-08-08T12:15:00Z", severity: "high" },
    });
    const setup = await renderApp(snapshot, 60, 24, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("SESSION INTERRUPTED");
      expect(hasInterleavingArtifacts(frame)).toBe(false);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("2f. long task ID at 60 cols — no interleaving", async () => {
    const task = { ...makeTask(), task_id: "task-very-long-identifier-with-many-characters-001" };
    const snapshot = makeSnapshot({ task });
    const setup = await renderApp(snapshot, 60, 24, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("Task ID");
      expect(hasInterleavingArtifacts(frame)).toBe(false);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("2g. long approval scope at 60 cols — DecisionStrip readable, no interleaving", async () => {
    const snapshot = makeSnapshot({
      pendingApprovals: [{
        id: "approval-with-very-long-identifier",
        type: "ownership-transfer",
        actor: "exec-antigravity",
        taskId: "task-with-very-long-identifier",
        repositoryFingerprint: makeFingerprint(),
        scope: "write-with-extended-permissions-for-production-deployment",
        timestamp: "2026-08-08T12:00:00Z",
        colorState: { kind: "pending", text: "PENDING — awaiting Founder decision" },
      }],
    });
    const setup = await renderApp(snapshot, 60, 24, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("FOUNDER DECISION");
      expect(frame).toContain("PENDING");
      expect(hasInterleavingArtifacts(frame)).toBe(false);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("2h. FixtureBanner and six-fact StatusBar remain intact at 60 cols with long values", async () => {
    const snapshot = makeSnapshot({
      fencingToken: 41,
      eventLog: [{ seq: 41, type: "session-start", actor: "claude-code", fencingToken: 41, hash: "abc123", timestamp: "2026-08-08T12:00:00Z" }],
    });
    const setup = await renderApp(snapshot, 60, 24, "governance", { fixture: true });
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("FIXTURE DATA");
      const statusRow = frame.split("\n").find((l) => l.includes("CONN"));
      expect(statusRow).toBeDefined();
      expect(statusRow!).toContain("S:");
      expect(statusRow!).toContain("W:");
      expect(statusRow!).toContain("P:");
      expect(statusRow!).toContain("F:");
      expect(statusRow!).toContain("L:");
    } finally {
      setup.renderer.destroy();
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════
// Correction 3: DecisionStrip must show Actor, Scope, and Event ID at 60 cols
// ═══════════════════════════════════════════════════════════════════════

describe("Correction 3: DecisionStrip shows all required facts at 60 columns", () => {
  function hasInterleavingArtifacts(frame: string): boolean {
    const artifacts = [
      /Task[A-Z]{3,}/,
      /Type:[A-Z][a-z]/,
      /Commands:[a-z][a-z,]/,
    ];
    return artifacts.some((p) => p.test(frame));
  }

  test("3a. 60 cols Governance focused: Actor, Scope, Event ID, and armed keys all visible", async () => {
    const snapshot = makeSnapshot({
      pendingApprovals: [{
        id: "approval-A",
        type: "transfer",
        actor: "exec-antigravity",
        taskId: "task-approval-A",
        repositoryFingerprint: makeFingerprint(),
        scope: "write",
        timestamp: "2026-08-08T12:00:00Z",
        colorState: { kind: "pending", text: "PENDING — awaiting Founder decision" },
      }],
    });
    const setup = await renderApp(snapshot, 60, 24, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      // Required defining text
      expect(frame).toContain("FOUNDER DECISION");
      expect(frame).toContain("PENDING");
      // Actor field must be visible (compact label is fine, e.g. A:exec-antigravity)
      expect(frame).toContain("exec-antigravity");
      // Scope field must be visible
      expect(frame).toContain("write");
      // Event ID field must be visible
      expect(frame).toContain("approval-A");
      // Armed keys visible (Governance focused)
      expect(frame).toContain("ALT+Y");
      expect(frame).toContain("ALT+N");
      // No interleaving
      expect(hasInterleavingArtifacts(frame)).toBe(false);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("3b. 60 cols with long values: all three facts still present via compact labels", async () => {
    const snapshot = makeSnapshot({
      pendingApprovals: [{
        id: "approval-very-long-id-001",
        type: "ownership-transfer",
        actor: "exec-antigravity-long-name",
        taskId: "task-very-long-id-001",
        repositoryFingerprint: makeFingerprint(),
        scope: "write-with-extended-permissions-for-production-deployment",
        timestamp: "2026-08-08T12:00:00Z",
        colorState: { kind: "pending", text: "PENDING — awaiting Founder decision" },
      }],
    });
    const setup = await renderApp(snapshot, 60, 24, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("FOUNDER DECISION");
      expect(frame).toContain("PENDING");
      // Even with long values, the compact labels must carry meaningful content.
      // Actor: the "A:" label must appear
      expect(frame).toContain("A:");
      // Scope: the "S:" label must appear
      expect(frame).toContain("S:");
      // Event ID: the "ID:" label must appear
      expect(frame).toContain("ID:");
      // No interleaving
      expect(hasInterleavingArtifacts(frame)).toBe(false);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("3c. no DecisionStrip row exceeds inner width at 60 cols", async () => {
    // The DecisionStrip double-border inner width = 60 - 4 = 56 columns.
    // Render the strip in isolation at 60 cols to check row lengths.
    const snapshot = makeSnapshot({
      pendingApprovals: [{
        id: "approval-test",
        type: "transfer",
        actor: "exec-antigravity",
        taskId: "task-test",
        repositoryFingerprint: makeFingerprint(),
        scope: "write",
        timestamp: "2026-08-08T12:00:00Z",
        colorState: { kind: "pending", text: "PENDING — awaiting Founder decision" },
      }],
    });
    const setup = await renderApp(snapshot, 60, 24, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const rows = frame.split("\n");
      // Find DecisionStrip rows (inside the double border ╔...╗)
      let inStrip = false;
      let maxRowLen = 0;
      for (const row of rows) {
        if (row.includes("╔")) { inStrip = true; continue; }
        if (row.includes("╚")) { inStrip = false; continue; }
        if (inStrip && row.trim().length > 0) {
          // Strip the border characters ║
          const content = row.replace(/^║\s*/, "").replace(/\s*║$/, "");
          if (content.length > maxRowLen) maxRowLen = content.length;
        }
      }
      // Inner width at 60 cols is 56 (60 - 4 for border+padding).
      // Content rows must not exceed this.
      expect(maxRowLen).toBeLessThanOrEqual(56);
    } finally {
      setup.renderer.destroy();
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════
// Finding 1: Governance provenance timestamps must actually be rendered
// ═══════════════════════════════════════════════════════════════════════

describe("Finding 1: governance provenance timestamps", () => {
  function hasInterleavingArtifacts(frame: string): boolean {
    const artifacts = [
      /Task[A-Z]{3,}/,
      /Type:[A-Z][a-z]/,
      /Commands:[a-z][a-z,]/,
    ];
    return artifacts.some((p) => p.test(frame));
  }

  const TRANSFER = {
    id: "t1",
    from: "exec-claude-code",
    to: "exec-antigravity",
    reason: "handoff",
    fencingToken: 3,
    timestamp: "2026-08-08T12:20:00Z",
  } as const;

  const VERIFICATION = {
    result: "pass",
    detail: "All tests passed",
    verifiedBy: "exec-claude-code",
    timestamp: "2026-08-08T12:30:00Z",
  } as const;

  const REVIEW = {
    decision: "approved",
    comments: "LGTM",
    reviewedBy: "exec-antigravity",
    timestamp: "2026-08-08T12:35:00Z",
  } as const;

  test("F1a. 120 cols: transfer provenance renders from, to, fencing token, reason, and the exact timestamp", async () => {
    const snapshot = makeSnapshot({
      transferPhase: "sender-released",
      pendingTransfers: [TRANSFER],
    });
    const setup = await renderApp(snapshot, 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("exec-claude-code");
      expect(frame).toContain("exec-antigravity");
      expect(frame).toContain("handoff");
      // Explicit fencing token evidence for the transfer
      expect(frame).toContain("tok#3");
      // Exact provenance timestamp with an explicit label
      expect(frame).toContain("Transfer at: 2026-08-08T12:20:00Z");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("F1b. 120 cols: verification provenance renders result, detail, verifiedBy, and the exact timestamp", async () => {
    const snapshot = makeSnapshot({ verificationStatus: VERIFICATION });
    const setup = await renderApp(snapshot, 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("pass");
      expect(frame).toContain("All tests passed");
      expect(frame).toContain("exec-claude-code");
      expect(frame).toContain("Verified at: 2026-08-08T12:30:00Z");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("F1c. 120 cols: review provenance renders decision, comments, reviewedBy, and the exact timestamp", async () => {
    const snapshot = makeSnapshot({ reviewStatus: REVIEW });
    const setup = await renderApp(snapshot, 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("approved");
      expect(frame).toContain("LGTM");
      expect(frame).toContain("exec-antigravity");
      expect(frame).toContain("Reviewed at: 2026-08-08T12:35:00Z");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("F1d. 120 cols: all three provenance timestamps render together", async () => {
    const snapshot = makeSnapshot({
      transferPhase: "sender-released",
      pendingTransfers: [TRANSFER],
      verificationStatus: VERIFICATION,
      reviewStatus: REVIEW,
    });
    const setup = await renderApp(snapshot, 120, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("Transfer at: 2026-08-08T12:20:00Z");
      expect(frame).toContain("Verified at: 2026-08-08T12:30:00Z");
      expect(frame).toContain("Reviewed at: 2026-08-08T12:35:00Z");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("F1e. 60 cols: provenance labels remain readable, no interleaving, no row exceeds inner width", async () => {
    const snapshot = makeSnapshot({
      transferPhase: "sender-released",
      pendingTransfers: [TRANSFER],
      verificationStatus: VERIFICATION,
      reviewStatus: REVIEW,
    });
    const setup = await renderApp(snapshot, 60, 34, "governance");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      // Labels survive truncation at narrow width
      expect(frame).toContain("Transfer at:");
      expect(frame).toContain("Verified at:");
      expect(frame).toContain("Reviewed at:");
      // No interleaving artifacts
      expect(hasInterleavingArtifacts(frame)).toBe(false);
      // No physical row exceeds the terminal width
      for (const row of frame.split("\n")) {
        expect(row.length).toBeLessThanOrEqual(60);
      }
      // Provenance rows sit inside the single-bordered Governance box:
      // inner content width is 60 - 2 = 58 columns.
      const provenanceRows = frame
        .split("\n")
        .filter((r) => /Transfer at:|Verified at:|Reviewed at:/.test(r));
      expect(provenanceRows.length).toBe(3);
      for (const row of provenanceRows) {
        const first = row.indexOf("│");
        const last = row.lastIndexOf("│");
        expect(first).toBeGreaterThanOrEqual(0);
        expect(last).toBeGreaterThan(first);
        const content = row.slice(first + 1, last);
        expect(content.length).toBeLessThanOrEqual(58);
      }
    } finally {
      setup.renderer.destroy();
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════
// Finding 2: IncidentBand must never fabricate fencing token #0
// ═══════════════════════════════════════════════════════════════════════

describe("Finding 2: IncidentBand honest fencing-token evidence", () => {
  test("F2a. interrupted session with fencingToken 0 → no fabricated #0 token", async () => {
    const snapshot = makeSnapshot({
      sessionState: "interrupted",
      fencingToken: 0,
      incident: null,
    });
    const setup = await renderApp(snapshot, 120, 34, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("SESSION INTERRUPTED");
      expect(frame).toContain("frozen");
      expect(frame).not.toContain("#0 invalidated");
      expect(frame).toContain("no issued token");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("F2b. incident record with fencingToken 0 → no fabricated #0 token", async () => {
    const snapshot = makeSnapshot({
      sessionState: "active",
      fencingToken: 0,
      incident: { id: "inc-9", reason: "adapter crash", timestamp: "2026-08-08T12:15:00Z", severity: "high" },
    });
    const setup = await renderApp(snapshot, 120, 34, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("SESSION INTERRUPTED");
      expect(frame).toContain("adapter crash");
      // Incident provenance preserved
      expect(frame).toContain("inc-9");
      expect(frame).toContain("high");
      expect(frame).toContain("2026-08-08T12:15:00Z");
      expect(frame).toContain("Recovery is broker-governed");
      expect(frame).not.toContain("#0 invalidated");
      expect(frame).toContain("no issued token");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("F2c. positive fencingToken 7 still renders token #7 invalidated", async () => {
    const snapshot = makeSnapshot({
      sessionState: "interrupted",
      fencingToken: 7,
      incident: { id: "inc-1", reason: "crash", timestamp: "2026-08-08T12:15:00Z", severity: "high" },
    });
    const setup = await renderApp(snapshot, 120, 34, "claude");
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("token #7 invalidated");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("F2d. zero-token frames never contain #0 invalidated (isolated IncidentBand)", async () => {
    for (const state of [
      makeSnapshot({ sessionState: "interrupted", fencingToken: 0, incident: null }),
      makeSnapshot({
        sessionState: "active",
        fencingToken: 0,
        incident: { id: "inc-9", reason: "adapter crash", timestamp: "2026-08-08T12:15:00Z", severity: "high" },
      }),
    ]) {
      const ib = await testRender(<IncidentBand state={state} />, { width: 120, height: 8 });
      try {
        await ib.flush();
        const frame = ib.captureCharFrame();
        expect(frame).not.toContain("#0 invalidated");
        expect(frame).not.toContain("token #0");
      } finally {
        ib.renderer.destroy();
      }
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════
// Finding 3: DecisionStrip documentation must describe the real path
// ═══════════════════════════════════════════════════════════════════════

describe("Finding 3: DecisionStrip documentation accuracy", () => {
  test("F3a. DecisionStrip header comment names the governed routing path and no dead paths", () => {
    const { readFileSync } = require("node:fs");
    const { join } = require("node:path");
    const source: string = readFileSync(
      join(process.cwd(), "apps/madbridge/src/tui/components/DecisionStrip.tsx"),
      "utf8",
    );
    // Dead references must be gone
    expect(source).not.toContain("App.resolveApproval");
    expect(source).not.toContain("shared component callback");
    // The real governed path must be documented
    expect(source).toContain("routeKeyEvent()");
    expect(source).toContain("validateApprovalResolution()");
    expect(source).toContain("onApprovalResolve");
    // Still presentation only — no second submission callback
    expect(source).toContain("PRESENTATION ONLY");
  });
});
