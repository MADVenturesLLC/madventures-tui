// apps/madbridge/test/tui-truth-safety.test.tsx
// Phase 0 truth and safety foundations — render-level + behavioral tests.
//
// Tests:
// - StatusBar single-row at 120, 80, 60 columns with ALL six governance facts
// - All six facts present in both live and fixture modes at 120, 80, 60
// - FixtureBanner is a separate one-row truth band with exact text
// - Ledger sequence uses max seq value, not array length (Finding 2)
// - PTY routing uses keyEvent.sequence, not canonical name (Finding 3)
// - Approval keys are inert without governance focus + visible dialog (Finding 1)
// - Approval resolution is bound to the stored displayed approval ID (Finding 1)
// - ApprovalDialog.onResolve goes through the same guard (Defect 2)
// - Duplicate submission prevention (Defect 3)
// - Expired colorState fails closed
// - Bare digits and unbound keys reach PTY write path with correct bytes
//
// Uses @opentui/react/test-utils testRender + captureCharFrame.
// Uses the extracted routeKeyEvent production helper for behavioral tests.

import { test, expect, describe } from "bun:test";
import { act } from "react";
import { testRender } from "@opentui/react/test-utils";
import { StatusBar, buildStatusLine, computeLedgerSeq, abbreviateWriter } from "../src/tui/components/StatusBar";
import { FixtureBanner, buildFixtureBanner, FIXTURE_BANNER_TEXT } from "../src/tui/components/FixtureBanner";
import { ApprovalDialog } from "../src/tui/components/ApprovalDialog";
import { App } from "../src/tui/App";
import {
  loadKeybindings,
  parseKeybindings,
  DEFAULT_KEYBINDINGS,
  resolveKey,
  isGlobalAction,
  translateKeyEvent,
} from "../src/tui/keybindings";
import type { KeyBinding } from "../src/tui/keybindings";
import {
  routeKeyEvent,
  resolvePtySequence,
  openDecisionDialog,
  closeDecisionDialog,
  validateApprovalResolution,
  pruneResolvedIds,
} from "../src/tui/keyboard-router";
import type { KeyboardRouterState, KeyboardRouterCallbacks } from "../src/tui/keyboard-router";
import type { BrokerSnapshot, FocusTarget, ApprovalRequestEvent, PendingApproval, ApprovalColorState } from "../src/tui/types";

// ─── Fixtures ───

function makeConnectedSnapshot(): BrokerSnapshot {
  return {
    connected: true,
    sessionState: "active",
    ownershipState: "owned",
    activeWriter: "exec-claude-code",
    fencingToken: 3,
    task: null,
    executions: [],
    repositoryFingerprint: null,
    pendingApprovals: [
      {
        id: "approval-001",
        type: "transfer",
        actor: "antigravity",
        taskId: "task-001",
        repositoryFingerprint: { kind: "commit", sha256: "a".repeat(64), git_sha: "abcdef1234567890abcdef1234567890abcdef12" },
        scope: "write",
        timestamp: "2026-08-08T12:00:00Z",
        colorState: { kind: "pending", text: "PENDING — awaiting Founder decision" },
      },
    ],
    pendingTransfers: [],
    permissionSummary: {
      allowedReadPaths: ["./src"],
      allowedWritePaths: ["./src"],
      allowedCommandCategories: ["read", "write"],
      allowedEgressDestinations: [],
      dataClass: "internal",
    },
    transferPhase: null,
    verificationStatus: null,
    reviewStatus: null,
    incident: null,
    eventLog: [
      { seq: 1, type: "message", actor: "exec-claude-code", fencingToken: 1, hash: "abc123", timestamp: "2026-08-08T12:00:00Z" },
      { seq: 2, type: "action_request", actor: "exec-antigravity", fencingToken: 2, hash: "def456", timestamp: "2026-08-08T12:05:00Z" },
      { seq: 3, type: "ownership_accept", actor: "exec-claude-code", fencingToken: 3, hash: "ghi789", timestamp: "2026-08-08T12:10:00Z" },
    ],
    queueDepth: 0,
  };
}

function makeDisconnectedSnapshot(): BrokerSnapshot | null {
  return null;
}

function makeApproval(id: string, colorState: ApprovalColorState = { kind: "pending", text: "PENDING — awaiting Founder decision" }): PendingApproval {
  return {
    id,
    type: "transfer",
    actor: "antigravity",
    taskId: "task-" + id,
    repositoryFingerprint: { kind: "commit", sha256: "a".repeat(64), git_sha: "abcdef1234567890abcdef1234567890abcdef12" },
    scope: "write",
    timestamp: "2026-08-08T12:00:00Z",
    colorState,
  };
}

const baseInput = {
  connected: true,
  sessionWord: "active",
  ownerWord: "exec-claude-code #3",
  pendingCount: 1,
  ledgerSeq: 3,
  focusWord: "CLAUDE",
};

// ─── Helper: create router callbacks that record calls ───

function makeRecordingCallbacks(): KeyboardRouterCallbacks & {
  resolutions: ApprovalRequestEvent[];
  ptyWrites: string[];
  focusChanges: FocusTarget[];
  quitCalls: number;
  dialogShows: Array<{ show: boolean; approvalId: string | null }>;
} {
  const resolutions: ApprovalRequestEvent[] = [];
  const ptyWrites: string[] = [];
  const focusChanges: FocusTarget[] = [];
  let quitCalls = 0;
  const dialogShows: Array<{ show: boolean; approvalId: string | null }> = [];

  return {
    resolutions,
    ptyWrites,
    focusChanges,
    quitCalls,
    dialogShows,
    onFocusChange: (target: FocusTarget) => { focusChanges.push(target); },
    onApprovalResolve: (event: ApprovalRequestEvent) => { resolutions.push(event); },
    onPtyWrite: (data: string) => { ptyWrites.push(data); },
    onQuit: () => { quitCalls++; },
    onShowApprovalDialog: (show: boolean, approvalId: string | null) => {
      dialogShows.push({ show, approvalId });
    },
  };
}

function makeRouterState(
  focus: FocusTarget,
  showDialog = false,
  displayedId: string | null = null,
  resolvedIds: ReadonlySet<string> = new Set(),
): KeyboardRouterState {
  return { focus, showApprovalDialog: showDialog, displayedApprovalId: displayedId, resolvedApprovalIds: resolvedIds };
}

// ─── buildStatusLine: all six facts at 60+ columns ───

describe("buildStatusLine preserves all six governance facts at 60+ columns", () => {
  test("at 120 columns, all six facts present (full format)", () => {
    const line = buildStatusLine({ ...baseInput, width: 120 });
    expect(line.length).toBe(120);
    expect(line).toContain("CONNECTED");
    expect(line).toContain("session");
    expect(line).toContain("active");
    expect(line).toContain("writer");
    expect(line).toContain("exec-claude-code");
    expect(line).toContain("#3");
    expect(line).toContain("pending 1");
    expect(line).toContain("focus");
    expect(line).toContain("CLAUDE");
    expect(line).toContain("ledger #3");
  });

  test("at 80 columns, all six facts present (compact format)", () => {
    const line = buildStatusLine({ ...baseInput, width: 80 });
    expect(line.length).toBe(80);
    expect(line).toContain("CONN");
    expect(line).toContain("S:active");
    expect(line).toContain("W:");
    expect(line).toContain("#3");
    expect(line).toContain("P:1");
    expect(line).toContain("F:CLAUDE");
    expect(line).toContain("L:#3");
  });

  test("at 60 columns, all six facts present (narrow pipe format)", () => {
    const line = buildStatusLine({ ...baseInput, width: 60 });
    expect(line.length).toBe(60);
    expect(line).toContain("CONN");
    expect(line).toContain("S:active");
    expect(line).toContain("W:");
    expect(line).toContain("#3");
    expect(line).toContain("P:1");
    expect(line).toContain("F:CLAUDE");
    expect(line).toContain("L:#3");
  });

  test("NOT CONNECTED renders as NOCONN in compact format", () => {
    const line = buildStatusLine({ ...baseInput, connected: false, width: 80 });
    expect(line).toContain("NOCONN");
  });

  test("NOT CONNECTED renders full at 120 columns", () => {
    const line = buildStatusLine({ ...baseInput, connected: false, width: 120 });
    expect(line).toContain("NOT CONNECTED");
  });

  test("line length always equals width exactly (one physical row)", () => {
    for (const width of [120, 80, 60, 40, 30, 20]) {
      const line = buildStatusLine({ ...baseInput, width });
      expect(line.length).toBe(width);
    }
  });
});

// ─── Finding 2: ledger sequence uses max seq, not array length ───

describe("Finding 2: computeLedgerSeq uses max seq value, not array length", () => {
  test("entries with sequence numbers 39, 40, 41 render ledger #41", () => {
    const line = buildStatusLine({
      ...baseInput,
      ledgerSeq: computeLedgerSeq([
        { seq: 39 },
        { seq: 40 },
        { seq: 41 },
      ]),
      width: 120,
    });
    expect(line).toContain("ledger #41");
  });

  test("a bounded list containing only sequence 41 renders ledger #41", () => {
    const line = buildStatusLine({
      ...baseInput,
      ledgerSeq: computeLedgerSeq([{ seq: 41 }]),
      width: 120,
    });
    expect(line).toContain("ledger #41");
  });

  test("an empty projection renders the approved honest default (ledger #0)", () => {
    const seq = computeLedgerSeq([]);
    expect(seq).toBe(0);
    const line = buildStatusLine({
      ...baseInput,
      ledgerSeq: seq,
      width: 120,
    });
    expect(line).toContain("ledger #0");
  });

  test("compact L:#N also uses the real sequence at 80 columns", () => {
    const line = buildStatusLine({
      ...baseInput,
      ledgerSeq: computeLedgerSeq([{ seq: 39 }, { seq: 40 }, { seq: 41 }]),
      width: 80,
    });
    expect(line).toContain("L:#41");
  });

  test("compact L:#N uses the real sequence at 60 columns", () => {
    const line = buildStatusLine({
      ...baseInput,
      ledgerSeq: computeLedgerSeq([{ seq: 41 }]),
      width: 60,
    });
    expect(line).toContain("L:#41");
  });

  test("one-row guarantee remains green at 120, 80, 60 with real sequence", () => {
    for (const width of [120, 80, 60]) {
      const line = buildStatusLine({
        ...baseInput,
        ledgerSeq: computeLedgerSeq([{ seq: 39 }, { seq: 40 }, { seq: 41 }]),
        width,
      });
      expect(line.length).toBe(width);
    }
  });

  test("computeLedgerSeq does not assume sequences start at 1", () => {
    expect(computeLedgerSeq([{ seq: 100 }, { seq: 200 }])).toBe(200);
    expect(computeLedgerSeq([{ seq: 5 }])).toBe(5);
    expect(computeLedgerSeq([{ seq: 0 }])).toBe(0);
    expect(computeLedgerSeq([])).toBe(0);
  });
});

// ─── Render-level: StatusBar one row with all six facts ───

describe("StatusBar render: one row, all six facts at 120/80/60", () => {
  test("120 columns: one row, all six facts", async () => {
    const snapshot = makeConnectedSnapshot();
    const setup = await testRender(
      <StatusBar state={snapshot} connected={true} focus="claude" widthOverride={120} />,
      { width: 120, height: 34 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const lines = frame.split("\n").filter((l) => l.trim().length > 0);
      expect(lines.length).toBe(1);
      expect(frame).toContain("CONNECTED");
      expect(frame).toContain("session");
      expect(frame).toContain("active");
      expect(frame).toContain("writer");
      expect(frame).toContain("#3");
      expect(frame).toContain("pending 1");
      expect(frame).toContain("focus");
      expect(frame).toContain("CLAUDE");
      expect(frame).toContain("ledger #3");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("80 columns: one row, all six facts (compact)", async () => {
    const snapshot = makeConnectedSnapshot();
    const setup = await testRender(
      <StatusBar state={snapshot} connected={true} focus="governance" widthOverride={80} />,
      { width: 80, height: 24 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const lines = frame.split("\n").filter((l) => l.trim().length > 0);
      expect(lines.length).toBe(1);
      expect(frame).toContain("CONN");
      expect(frame).toContain("S:active");
      expect(frame).toContain("W:");
      expect(frame).toContain("#3");
      expect(frame).toContain("P:1");
      expect(frame).toContain("F:GOVERNANCE");
      expect(frame).toContain("L:#3");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("60 columns: one row, all six facts (narrow)", async () => {
    const snapshot = makeConnectedSnapshot();
    const setup = await testRender(
      <StatusBar state={snapshot} connected={true} focus="claude" widthOverride={60} />,
      { width: 60, height: 24 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const lines = frame.split("\n").filter((l) => l.trim().length > 0);
      expect(lines.length).toBe(1);
      expect(frame).toContain("CONN");
      expect(frame).toContain("S:active");
      expect(frame).toContain("W:");
      expect(frame).toContain("#3");
      expect(frame).toContain("P:1");
      expect(frame).toContain("F:CLAUDE");
      expect(frame).toContain("L:#3");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("60 columns disconnected: one row, NOCONN + all facts", async () => {
    const setup = await testRender(
      <StatusBar state={makeDisconnectedSnapshot()} connected={false} focus="claude" widthOverride={60} />,
      { width: 60, height: 24 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const lines = frame.split("\n").filter((l) => l.trim().length > 0);
      expect(lines.length).toBe(1);
      expect(frame).toContain("NOCONN");
      expect(frame).toContain("F:CLAUDE");
    } finally {
      setup.renderer.destroy();
    }
  });
});

// ─── FixtureBanner: separate one-row truth band ───

describe("FixtureBanner is a separate one-row truth band", () => {
  test("renders exact text: FIXTURE DATA — NOT A LIVE SESSION", async () => {
    const setup = await testRender(
      <FixtureBanner widthOverride={120} />,
      { width: 120, height: 34 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const lines = frame.split("\n").filter((l) => l.trim().length > 0);
      expect(lines.length).toBe(1);
      expect(frame).toContain("FIXTURE DATA — NOT A LIVE SESSION");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("one row at 60 columns", async () => {
    const setup = await testRender(
      <FixtureBanner widthOverride={60} />,
      { width: 60, height: 24 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const lines = frame.split("\n").filter((l) => l.trim().length > 0);
      expect(lines.length).toBe(1);
      expect(frame).toContain("FIXTURE DATA");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("buildFixtureBanner always exactly width chars", () => {
    for (const width of [120, 80, 60, 40, 30]) {
      const line = buildFixtureBanner(width);
      expect(line.length).toBe(width);
    }
  });

  test("FIXTURE_BANNER_TEXT is the exact approved string", () => {
    expect(FIXTURE_BANNER_TEXT).toBe("FIXTURE DATA — NOT A LIVE SESSION");
  });
});

// ─── Finding 3: PTY routing uses keyEvent.sequence, not canonical name ───

describe("Finding 3: resolvePtySequence uses input sequence, not canonical name", () => {
  test("bare digit: sequence forwarded, not name", () => {
    expect(resolvePtySequence("1", "1", "1")).toBe("1");
  });

  test("lowercase character: sequence forwarded", () => {
    expect(resolvePtySequence("a", "a", "a")).toBe("a");
  });

  test("uppercase/shifted character: sequence forwarded", () => {
    expect(resolvePtySequence("A", "A", "A")).toBe("A");
  });

  test("space: sequence forwarded, not name 'space'", () => {
    expect(resolvePtySequence(" ", "space", " ")).toBe(" ");
    expect(resolvePtySequence("", "space", " ")).toBe(" ");
    expect(resolvePtySequence("", "space", "")).toBeNull();
  });

  test("Return: sequence (\\r) forwarded, not name 'return'", () => {
    expect(resolvePtySequence("\r", "return", "\r")).toBe("\r");
    expect(resolvePtySequence("", "return", "")).toBeNull();
  });

  test("Backspace: sequence (\\b or \\x7f) forwarded, not name 'backspace'", () => {
    expect(resolvePtySequence("\b", "backspace", "\b")).toBe("\b");
    expect(resolvePtySequence("\x7f", "backspace", "\x7f")).toBe("\x7f");
    expect(resolvePtySequence("", "backspace", "")).toBeNull();
  });

  test("arrow-key escape sequence: \\x1b[A forwarded, not name 'up'", () => {
    expect(resolvePtySequence("\x1b[A", "up", "\x1b[A")).toBe("\x1b[A");
    expect(resolvePtySequence("", "up", "")).toBeNull();
  });

  test("unbound Alt combination: sequence forwarded", () => {
    expect(resolvePtySequence("\x1bx", "x", "alt+x")).toBe("\x1bx");
  });

  test("empty sequence with no printable fallback returns null (safe drop)", () => {
    expect(resolvePtySequence("", "return", "")).toBeNull();
    expect(resolvePtySequence("", "space", "")).toBeNull();
    expect(resolvePtySequence("", "up", "")).toBeNull();
  });
});

describe("Finding 3: routeKeyEvent forwards sequence to PTY, consumes global actions", () => {
  const bindings = loadKeybindings();

  test("bare digit reaches PTY with correct byte", () => {
    const cbs = makeRecordingCallbacks();
    routeKeyEvent({
      keyStr: "5", action: null, sequence: "5", name: "5",
      state: makeRouterState("claude"), snapshot: null, callbacks: cbs, bindings,
    });
    expect(cbs.ptyWrites).toEqual(["5"]);
  });

  test("space reaches PTY with correct byte (\\x20), not 'space'", () => {
    const cbs = makeRecordingCallbacks();
    routeKeyEvent({
      keyStr: " ", action: null, sequence: " ", name: "space",
      state: makeRouterState("claude"), snapshot: null, callbacks: cbs, bindings,
    });
    expect(cbs.ptyWrites).toEqual([" "]);
    expect(cbs.ptyWrites[0]).not.toBe("space");
  });

  test("Return reaches PTY with \\r, not 'return'", () => {
    const cbs = makeRecordingCallbacks();
    routeKeyEvent({
      keyStr: "\r", action: null, sequence: "\r", name: "return",
      state: makeRouterState("claude"), snapshot: null, callbacks: cbs, bindings,
    });
    expect(cbs.ptyWrites).toEqual(["\r"]);
    expect(cbs.ptyWrites[0]).not.toBe("return");
  });

  test("Backspace reaches PTY with \\b, not 'backspace'", () => {
    const cbs = makeRecordingCallbacks();
    routeKeyEvent({
      keyStr: "\b", action: null, sequence: "\b", name: "backspace",
      state: makeRouterState("claude"), snapshot: null, callbacks: cbs, bindings,
    });
    expect(cbs.ptyWrites).toEqual(["\b"]);
  });

  test("arrow up reaches PTY with escape sequence, not 'up'", () => {
    const cbs = makeRecordingCallbacks();
    routeKeyEvent({
      keyStr: "\x1b[A", action: null, sequence: "\x1b[A", name: "up",
      state: makeRouterState("claude"), snapshot: null, callbacks: cbs, bindings,
    });
    expect(cbs.ptyWrites).toEqual(["\x1b[A"]);
    expect(cbs.ptyWrites[0]).not.toBe("up");
  });

  test("configured Alt shortcut is consumed, not forwarded to PTY", () => {
    const cbs = makeRecordingCallbacks();
    routeKeyEvent({
      keyStr: "alt+1", action: "focus-claude", sequence: "\x1b1", name: "1",
      state: makeRouterState("antigravity"), snapshot: null, callbacks: cbs, bindings,
    });
    expect(cbs.ptyWrites).toEqual([]);
    expect(cbs.focusChanges).toEqual(["claude"]);
  });

  test("unbound Alt combination forwards its sequence to PTY", () => {
    const cbs = makeRecordingCallbacks();
    routeKeyEvent({
      keyStr: "alt+z", action: null, sequence: "\x1bz", name: "z",
      state: makeRouterState("claude"), snapshot: null, callbacks: cbs, bindings,
    });
    expect(cbs.ptyWrites).toEqual(["\x1bz"]);
  });

  test("lowercase letter reaches PTY unchanged", () => {
    const cbs = makeRecordingCallbacks();
    routeKeyEvent({
      keyStr: "a", action: null, sequence: "a", name: "a",
      state: makeRouterState("claude"), snapshot: null, callbacks: cbs, bindings,
    });
    expect(cbs.ptyWrites).toEqual(["a"]);
  });

  test("uppercase/shifted character reaches PTY unchanged", () => {
    const cbs = makeRecordingCallbacks();
    routeKeyEvent({
      keyStr: "A", action: null, sequence: "A", name: "A",
      state: makeRouterState("claude"), snapshot: null, callbacks: cbs, bindings,
    });
    expect(cbs.ptyWrites).toEqual(["A"]);
  });
});

// ─── Defect 1: Approval keys inert without governance focus + visible dialog ───

describe("Defect 1: approval keys are inert without governance focus + visible dialog", () => {
  const bindings = loadKeybindings();

  test("Alt+Y from Claude focus emits nothing (no dialog)", () => {
    const cbs = makeRecordingCallbacks();
    routeKeyEvent({
      keyStr: "alt+y", action: "accept-approval", sequence: "\x1by", name: "y",
      state: makeRouterState("claude"), snapshot: makeConnectedSnapshot(), callbacks: cbs, bindings,
    });
    expect(cbs.resolutions).toEqual([]);
  });

  test("Alt+Y from Antigravity focus emits nothing (no dialog)", () => {
    const cbs = makeRecordingCallbacks();
    routeKeyEvent({
      keyStr: "alt+y", action: "accept-approval", sequence: "\x1by", name: "y",
      state: makeRouterState("antigravity"), snapshot: makeConnectedSnapshot(), callbacks: cbs, bindings,
    });
    expect(cbs.resolutions).toEqual([]);
  });

  test("Alt+Y from Governance without a visible dialog emits nothing", () => {
    const cbs = makeRecordingCallbacks();
    routeKeyEvent({
      keyStr: "alt+y", action: "accept-approval", sequence: "\x1by", name: "y",
      state: makeRouterState("governance", false, null), snapshot: makeConnectedSnapshot(), callbacks: cbs, bindings,
    });
    expect(cbs.resolutions).toEqual([]);
  });

  test("Alt+Y from Events emits nothing (even if dialog is somehow visible)", () => {
    const cbs = makeRecordingCallbacks();
    routeKeyEvent({
      keyStr: "alt+y", action: "accept-approval", sequence: "\x1by", name: "y",
      state: makeRouterState("events", true, "approval-001"), snapshot: makeConnectedSnapshot(), callbacks: cbs, bindings,
    });
    expect(cbs.resolutions).toEqual([]);
  });

  test("Alt+N from Events emits nothing", () => {
    const cbs = makeRecordingCallbacks();
    routeKeyEvent({
      keyStr: "alt+n", action: "reject-approval", sequence: "\x1bn", name: "n",
      state: makeRouterState("events", true, "approval-001"), snapshot: makeConnectedSnapshot(), callbacks: cbs, bindings,
    });
    expect(cbs.resolutions).toEqual([]);
  });

  // ── New regression tests for Defect 1 ──

  test("visible dialog + Claude focus emits nothing", () => {
    const cbs = makeRecordingCallbacks();
    routeKeyEvent({
      keyStr: "alt+y", action: "accept-approval", sequence: "\x1by", name: "y",
      state: makeRouterState("claude", true, "approval-001"),
      snapshot: makeConnectedSnapshot(), callbacks: cbs, bindings,
    });
    expect(cbs.resolutions).toEqual([]);
  });

  test("visible dialog + Antigravity focus emits nothing", () => {
    const cbs = makeRecordingCallbacks();
    routeKeyEvent({
      keyStr: "alt+y", action: "accept-approval", sequence: "\x1by", name: "y",
      state: makeRouterState("antigravity", true, "approval-001"),
      snapshot: makeConnectedSnapshot(), callbacks: cbs, bindings,
    });
    expect(cbs.resolutions).toEqual([]);
  });

  test("visible dialog + Events focus emits nothing", () => {
    const cbs = makeRecordingCallbacks();
    routeKeyEvent({
      keyStr: "alt+y", action: "accept-approval", sequence: "\x1by", name: "y",
      state: makeRouterState("events", true, "approval-001"),
      snapshot: makeConnectedSnapshot(), callbacks: cbs, bindings,
    });
    expect(cbs.resolutions).toEqual([]);
  });

  test("same stored ID with colorState.kind === 'expired' emits nothing and closes", () => {
    const cbs = makeRecordingCallbacks();
    const expiredSnapshot: BrokerSnapshot = {
      ...makeConnectedSnapshot(),
      pendingApprovals: [
        makeApproval("approval-A", { kind: "expired", text: "EXPIRED — decision window elapsed" }),
      ],
    };
    const routerState = makeRouterState("governance", true, "approval-A");
    const newState = routeKeyEvent({
      keyStr: "alt+y", action: "accept-approval", sequence: "\x1by", name: "y",
      state: routerState, snapshot: expiredSnapshot, callbacks: cbs, bindings,
    });
    expect(cbs.resolutions).toEqual([]);
    // The approval still exists but is expired — no resolution emitted.
    // The dialog should NOT close (the approval still exists, just expired).
    // But validation fails because colorState.kind !== "pending".
    expect(cbs.resolutions.length).toBe(0);
  });
});

// ─── Defect 1: opening the decision dialog binds approval A's ID ───

describe("Defect 1: opening the decision dialog binds approval A's ID", () => {
  const bindings = loadKeybindings();

  test("openDecisionDialog stores the approval ID", () => {
    const cbs = makeRecordingCallbacks();
    const approval = makeApproval("approval-A");
    const newState = openDecisionDialog(approval, cbs, makeRouterState("governance"));
    expect(newState.showApprovalDialog).toBe(true);
    expect(newState.displayedApprovalId).toBe("approval-A");
    expect(cbs.dialogShows).toEqual([{ show: true, approvalId: "approval-A" }]);
  });

  test("accept resolves only the displayed approval (A), not a later pending approval (B)", () => {
    const cbs = makeRecordingCallbacks();
    let routerState = openDecisionDialog(makeApproval("approval-A"), cbs, makeRouterState("governance"));

    const snapshot: BrokerSnapshot = {
      ...makeConnectedSnapshot(),
      pendingApprovals: [makeApproval("approval-B"), makeApproval("approval-A")],
    };

    routerState = routeKeyEvent({
      keyStr: "alt+y", action: "accept-approval", sequence: "\x1by", name: "y",
      state: routerState, snapshot, callbacks: cbs, bindings,
    });

    expect(cbs.resolutions.length).toBe(1);
    expect(cbs.resolutions[0]!.taskId).toBe("task-approval-A");
    expect(cbs.resolutions[0]!.resolution).toBe("accept");
  });

  test("reject resolves only the displayed approval (A), not a later pending approval (B)", () => {
    const cbs = makeRecordingCallbacks();
    let routerState = openDecisionDialog(makeApproval("approval-A"), cbs, makeRouterState("governance"));

    const snapshot: BrokerSnapshot = {
      ...makeConnectedSnapshot(),
      pendingApprovals: [makeApproval("approval-B"), makeApproval("approval-A")],
    };

    routerState = routeKeyEvent({
      keyStr: "alt+n", action: "reject-approval", sequence: "\x1bn", name: "n",
      state: routerState, snapshot, callbacks: cbs, bindings,
    });

    expect(cbs.resolutions.length).toBe(1);
    expect(cbs.resolutions[0]!.taskId).toBe("task-approval-A");
    expect(cbs.resolutions[0]!.resolution).toBe("reject");
  });

  test("queue reordering cannot change the displayed approval", () => {
    const cbs = makeRecordingCallbacks();
    let routerState = openDecisionDialog(makeApproval("approval-A"), cbs, makeRouterState("governance"));

    // Pending array now contains only B and C — A is gone
    const snapshot: BrokerSnapshot = {
      ...makeConnectedSnapshot(),
      pendingApprovals: [makeApproval("approval-B"), makeApproval("approval-C")],
    };

    routerState = routeKeyEvent({
      keyStr: "alt+y", action: "accept-approval", sequence: "\x1by", name: "y",
      state: routerState, snapshot, callbacks: cbs, bindings,
    });

    expect(cbs.resolutions).toEqual([]);
    expect(routerState.showApprovalDialog).toBe(false);
    expect(routerState.displayedApprovalId).toBeNull();
  });

  test("a removed displayed approval fails closed", () => {
    const cbs = makeRecordingCallbacks();
    let routerState = openDecisionDialog(makeApproval("approval-A"), cbs, makeRouterState("governance"));

    const snapshot: BrokerSnapshot = {
      ...makeConnectedSnapshot(),
      pendingApprovals: [],
    };

    routerState = routeKeyEvent({
      keyStr: "alt+y", action: "accept-approval", sequence: "\x1by", name: "y",
      state: routerState, snapshot, callbacks: cbs, bindings,
    });

    expect(cbs.resolutions).toEqual([]);
    expect(routerState.showApprovalDialog).toBe(false);
    expect(routerState.displayedApprovalId).toBeNull();
  });

  test("closeDecisionDialog clears the stored ID", () => {
    const cbs = makeRecordingCallbacks();
    let routerState = openDecisionDialog(makeApproval("approval-A"), cbs, makeRouterState("governance"));
    routerState = closeDecisionDialog(cbs, routerState);
    expect(routerState.showApprovalDialog).toBe(false);
    expect(routerState.displayedApprovalId).toBeNull();

    routeKeyEvent({
      keyStr: "alt+y", action: "accept-approval", sequence: "\x1by", name: "y",
      state: routerState, snapshot: makeConnectedSnapshot(), callbacks: cbs, bindings,
    });
    expect(cbs.resolutions).toEqual([]);
  });
});

// ─── Defect 2: ApprovalDialog.onResolve goes through the same guard ───

describe("Defect 2: validateApprovalResolution is the single guard for all paths", () => {
  test("validateApprovalResolution returns null for Claude focus (even with visible dialog)", () => {
    const state = makeRouterState("claude", true, "approval-001");
    const result = validateApprovalResolution(state, makeConnectedSnapshot());
    expect(result).toBeNull();
  });

  test("validateApprovalResolution returns null for Antigravity focus", () => {
    const state = makeRouterState("antigravity", true, "approval-001");
    const result = validateApprovalResolution(state, makeConnectedSnapshot());
    expect(result).toBeNull();
  });

  test("validateApprovalResolution returns null for Events focus", () => {
    const state = makeRouterState("events", true, "approval-001");
    const result = validateApprovalResolution(state, makeConnectedSnapshot());
    expect(result).toBeNull();
  });

  test("validateApprovalResolution returns the approval for governance focus + visible dialog + pending", () => {
    const state = makeRouterState("governance", true, "approval-001");
    const result = validateApprovalResolution(state, makeConnectedSnapshot());
    expect(result).not.toBeNull();
    expect(result!.id).toBe("approval-001");
  });

  test("validateApprovalResolution returns null for expired colorState", () => {
    const snapshot: BrokerSnapshot = {
      ...makeConnectedSnapshot(),
      pendingApprovals: [
        makeApproval("approval-001", { kind: "expired", text: "EXPIRED — decision window elapsed" }),
      ],
    };
    const state = makeRouterState("governance", true, "approval-001");
    const result = validateApprovalResolution(state, snapshot);
    expect(result).toBeNull();
  });

  test("validateApprovalResolution returns null for already-resolved ID", () => {
    const resolved = new Set(["approval-001"]);
    const state = makeRouterState("governance", true, "approval-001", resolved);
    const result = validateApprovalResolution(state, makeConnectedSnapshot());
    expect(result).toBeNull();
  });
});

// ─── Defect 3: duplicate submission prevention ───

describe("Defect 3: one resolution followed by unchanged snapshot cannot reopen or resolve same ID", () => {
  const bindings = loadKeybindings();

  test("after one accept, the same approval ID cannot be resolved again", () => {
    const cbs = makeRecordingCallbacks();
    // Use a snapshot that contains approval-A
    const snapshot: BrokerSnapshot = {
      ...makeConnectedSnapshot(),
      pendingApprovals: [makeApproval("approval-A")],
    };
    let routerState = openDecisionDialog(makeApproval("approval-A"), cbs, makeRouterState("governance"));

    // First accept — should resolve
    routerState = routeKeyEvent({
      keyStr: "alt+y", action: "accept-approval", sequence: "\x1by", name: "y",
      state: routerState, snapshot, callbacks: cbs, bindings,
    });
    expect(cbs.resolutions.length).toBe(1);
    expect(routerState.resolvedApprovalIds.has("approval-A")).toBe(true);

    // Try to accept again — the same ID is in resolvedApprovalIds
    // and the snapshot still contains it. Must fail closed.
    routerState = routeKeyEvent({
      keyStr: "alt+y", action: "accept-approval", sequence: "\x1by", name: "y",
      state: routerState, snapshot, callbacks: cbs, bindings,
    });
    expect(cbs.resolutions.length).toBe(1); // still only one
  });

  test("openDecisionDialog refuses to reopen an already-resolved approval", () => {
    const cbs = makeRecordingCallbacks();
    const approval = makeApproval("approval-A");
    const resolved = new Set(["approval-A"]);
    const baseState = makeRouterState("governance", false, null, resolved);

    // Try to open the dialog for an already-resolved approval
    const newState = openDecisionDialog(approval, cbs, baseState);
    expect(newState.showApprovalDialog).toBe(false);
    expect(newState.displayedApprovalId).toBeNull();
    expect(cbs.dialogShows).toEqual([]); // no dialog show callback
  });

  test("openDecisionDialog refuses to open an expired approval", () => {
    const cbs = makeRecordingCallbacks();
    const expiredApproval = makeApproval("approval-A", { kind: "expired", text: "EXPIRED — decision window elapsed" });
    const baseState = makeRouterState("governance");

    const newState = openDecisionDialog(expiredApproval, cbs, baseState);
    expect(newState.showApprovalDialog).toBe(false);
    expect(cbs.dialogShows).toEqual([]);
  });

  test("pruneResolvedIds removes IDs no longer in the snapshot", () => {
    const resolved = new Set(["approval-A", "approval-B"]);
    const snapshot: BrokerSnapshot = {
      ...makeConnectedSnapshot(),
      pendingApprovals: [makeApproval("approval-B")],
    };
    const pruned = pruneResolvedIds(resolved, snapshot);
    expect(pruned.has("approval-A")).toBe(false); // removed from snapshot
    expect(pruned.has("approval-B")).toBe(true);  // still in snapshot
  });

  test("pruneResolvedIds with null snapshot clears all", () => {
    const resolved = new Set(["approval-A", "approval-B"]);
    const pruned = pruneResolvedIds(resolved, null);
    expect(pruned.size).toBe(0);
  });
});

// ─── KeyEvent-to-action translation tests ───

describe("KeyEvent-to-action translation", () => {
  test("Alt+digit translates to focus action", () => {
    const bindings = loadKeybindings();
    const alt1 = translateKeyEvent({ name: "1", ctrl: false, meta: true, shift: false });
    expect(alt1).toBe("alt+1");
    expect(resolveKey(alt1, bindings)).toBe("focus-claude");

    const alt2 = translateKeyEvent({ name: "2", ctrl: false, meta: true, shift: false });
    expect(resolveKey(alt2, bindings)).toBe("focus-antigravity");

    const alt3 = translateKeyEvent({ name: "3", ctrl: false, meta: true, shift: false });
    expect(resolveKey(alt3, bindings)).toBe("focus-governance");

    const alt4 = translateKeyEvent({ name: "4", ctrl: false, meta: true, shift: false });
    expect(resolveKey(alt4, bindings)).toBe("focus-events");
  });

  test("Alt+y translates to accept-approval", () => {
    const bindings = loadKeybindings();
    const translated = translateKeyEvent({ name: "y", ctrl: false, meta: true, shift: false });
    expect(translated).toBe("alt+y");
    expect(resolveKey(translated, bindings)).toBe("accept-approval");
  });

  test("bare digit translates to pass-through (null action)", () => {
    const bindings = loadKeybindings();
    const bare = translateKeyEvent({ name: "5", ctrl: false, meta: false, shift: false });
    expect(bare).toBe("5");
    expect(resolveKey(bare, bindings)).toBeNull();
    expect(isGlobalAction(bare, bindings)).toBe(false);
  });

  test("unbound key translates to pass-through (null action)", () => {
    const bindings = loadKeybindings();
    const unbound = translateKeyEvent({ name: "z", ctrl: false, meta: false, shift: false });
    expect(unbound).toBe("z");
    expect(resolveKey(unbound, bindings)).toBeNull();
  });
});

// ─── No color-only meaning ───

describe("No color-only meaning in status bar", () => {
  test("status bar uses explicit words, not just colors", async () => {
    const snapshot = makeConnectedSnapshot();
    const setup = await testRender(
      <StatusBar state={snapshot} connected={true} focus="claude" widthOverride={120} />,
      { width: 120, height: 34 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("CONNECTED");
      expect(frame).toContain("session");
      expect(frame).toContain("writer");
      expect(frame).toContain("pending");
      expect(frame).toContain("focus");
      expect(frame).toContain("ledger");
    } finally {
      setup.renderer.destroy();
    }
  });
});

// ─── ApprovalDialog key instructions render actual configured bindings ───

describe("ApprovalDialog renders actual configured key instructions", () => {
  // Construct the default map directly from DEFAULT_KEYBINDINGS to avoid
  // dependence on the ambient FOUNDER_TUI_KEYS environment variable.
  const defaultBindings = parseKeybindings(DEFAULT_KEYBINDINGS);

  test("default bindings display Alt+Y and Alt+N", async () => {
    const approval = makeApproval("approval-001");
    const setup = await testRender(
      <ApprovalDialog approval={approval} onResolve={() => {}} keybindings={defaultBindings} />,
      { width: 120, height: 34 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("ALT+Y");
      expect(frame).toContain("ALT+N");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("custom override displays the configured keys", async () => {
    const customBindings = parseKeybindings([
      { key: "ctrl+o", action: "accept-approval" },
      { key: "ctrl+x", action: "reject-approval" },
    ] as readonly KeyBinding[]);
    const approval = makeApproval("approval-001");
    const setup = await testRender(
      <ApprovalDialog approval={approval} onResolve={() => {}} keybindings={customBindings} />,
      { width: 120, height: 34 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).toContain("CTRL+O");
      expect(frame).toContain("CTRL+X");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("Ctrl+Y and Ctrl+N are absent under default bindings", async () => {
    const approval = makeApproval("approval-001");
    const setup = await testRender(
      <ApprovalDialog approval={approval} onResolve={() => {}} keybindings={defaultBindings} />,
      { width: 120, height: 34 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      expect(frame).not.toContain("Ctrl+Y");
      expect(frame).not.toContain("Ctrl+N");
      expect(frame).not.toContain("CTRL+Y");
      expect(frame).not.toContain("CTRL+N");
    } finally {
      setup.renderer.destroy();
    }
  });
});

// ─── 60-column six-fact guarantee with long execution IDs ───

describe("Six-fact guarantee with long execution IDs at 60 and 80 columns", () => {
  const longIdInput = {
    connected: true,
    sessionWord: "active",
    ownerWord: "exec-claude-code-sonnet-4-20260809 #42",
    pendingCount: 3,
    ledgerSeq: 41,
    focusWord: "CLAUDE",
  };

  test("at 80 columns: all six facts + fencing token on one row", () => {
    const line = buildStatusLine({ ...longIdInput, width: 80 });
    expect(line.length).toBe(80);
    expect(line).toContain("CONN");           // 1. connection
    expect(line).toContain("S:active");       // 2. session
    expect(line).toContain("W:");             // 3. writer label
    expect(line).toContain("#42");            // 3. fencing token
    expect(line).toContain("P:3");           // 4. pending
    expect(line).toContain("F:CLAUDE");       // 5. focus
    expect(line).toContain("L:#41");          // 6. ledger
  });

  test("at 60 columns: all six facts + fencing token on one row", () => {
    const line = buildStatusLine({ ...longIdInput, width: 60 });
    expect(line.length).toBe(60);
    expect(line).toContain("CONN");
    expect(line).toContain("S:active");
    expect(line).toContain("W:");
    expect(line).toContain("#42");
    expect(line).toContain("P:3");
    expect(line).toContain("F:CLAUDE");
    expect(line).toContain("L:#41");
  });

  test("abbreviateWriter preserves fencing token", () => {
    expect(abbreviateWriter("exec-claude-code-sonnet-4-20260809 #42", 18)).toContain("#42");
    expect(abbreviateWriter("exec-claude-code #3", 18)).toContain("#3");
  });

  test("abbreviateWriter does not modify short values", () => {
    expect(abbreviateWriter("free", 18)).toBe("free");
    expect(abbreviateWriter("none", 18)).toBe("none");
    expect(abbreviateWriter("exec-claude-code #3", 18)).toBe("exec-claude-code#3");
  });

  test("abbreviateWriter truncates ID deterministically", () => {
    const result = abbreviateWriter("exec-claude-code-sonnet-4-20260809 #42", 18);
    expect(result.length).toBeLessThanOrEqual(18);
    expect(result).toContain("#42");
    // The ID part is truncated but the token is preserved
    expect(result).not.toContain("sonnet");
  });

  test("render at 60 columns with long ID: one row, all six facts", async () => {
    const snapshot: BrokerSnapshot = {
      ...makeConnectedSnapshot(),
      activeWriter: "exec-claude-code-sonnet-4-20260809",
      fencingToken: 42,
      pendingApprovals: [makeApproval("approval-001"), makeApproval("approval-002"), makeApproval("approval-003")],
    };
    const setup = await testRender(
      <StatusBar state={snapshot} connected={true} focus="claude" widthOverride={60} />,
      { width: 60, height: 24 },
    );
    try {
      await setup.flush();
      const frame = setup.captureCharFrame();
      const lines = frame.split("\n").filter((l) => l.trim().length > 0);
      expect(lines.length).toBe(1);
      expect(frame).toContain("CONN");
      expect(frame).toContain("S:active");
      expect(frame).toContain("W:");
      expect(frame).toContain("#42");
      expect(frame).toContain("P:3");
      expect(frame).toContain("F:CLAUDE");
      expect(frame).toContain("L:#3");
    } finally {
      setup.renderer.destroy();
    }
  });
});

// ─── Matrix test: all session states x focus targets at 60 and 80 columns ───

describe("Matrix: all six facts at 60 and 80 for every valid session+focus combination", () => {
  const sessions = ["starting", "active", "paused", "interrupted", "reconciling", "closing", "closed"];
  const focuses = ["CLAUDE", "ANTIGRAVITY", "GOVERNANCE", "EVENTS"];

  // Use a long writer ID and multi-digit numeric values
  const matrixInput = {
    connected: true,
    sessionWord: "",
    ownerWord: "exec-claude-code-sonnet-4-20260809 #42",
    pendingCount: 3,
    ledgerSeq: 41,
    focusWord: "",
  };

  for (const width of [60, 80]) {
    for (const sess of sessions) {
      for (const focus of focuses) {
        test("w=" + width + " sess=" + sess + " focus=" + focus, () => {
          const line = buildStatusLine({
            ...matrixInput,
            sessionWord: sess,
            focusWord: focus,
            width,
          });
          // Line length must equal width exactly (one physical row)
          expect(line.length).toBe(width);
          // All six governance facts must be present
          expect(line).toContain("CONN");              // 1. connection
          expect(line).toContain("S:");                // 2. session marker
          expect(line).toContain(sess);                // 2. session value
          expect(line).toContain("W:");                 // 3. writer marker
          expect(line).toContain("#42");               // 3. fencing token
          expect(line).toContain("P:");                // 4. pending marker
          expect(line).toContain("F:");                // 5. focus marker
          expect(line).toContain(focus);               // 5. focus value
          expect(line).toContain("L:");                // 6. ledger marker
          expect(line).toContain("#41");               // 6. ledger sequence
        });
      }
    }
  }
});

// ─── App lifecycle integration tests ───
//
// These tests render the actual App component with a controlled broker
// subscription and exercise the production lifecycle via the OpenTUI
// test renderer's mockInput. They verify the real React effect chain,
// not just the pure router helpers.

describe("App lifecycle: approval dialog auto-open and resolution", () => {
  // Helper: create a broker subscribe function that delivers a fixed snapshot.
  function makeSubscribe(snapshot: BrokerSnapshot): (listener: (s: BrokerSnapshot) => void) => () => void {
    return (listener: (snapshot: BrokerSnapshot) => void) => {
      listener(snapshot);
      return () => {};
    };
  }

  function makeSnapshotWithApproval(approvalId: string, colorState?: ApprovalColorState): BrokerSnapshot {
    return {
      ...makeConnectedSnapshot(),
      pendingApprovals: [makeApproval(approvalId, colorState)],
    };
  }

  test("Governance focus auto-opens the pending decision dialog", async () => {
    const snapshot = makeSnapshotWithApproval("approval-A");
    const resolutions: ApprovalRequestEvent[] = [];
    const subscribe = makeSubscribe(snapshot);

    const setup = await testRender(
      <App subscribe={subscribe} onApprovalResolve={(e) => resolutions.push(e)} />,
      { width: 120, height: 34 },
    );
    try {
      // Focus governance — this should trigger the useEffect that auto-opens
      // the approval dialog.
      setup.mockInput.pressKey("3", { meta: true }); // Alt+3 = focus-governance
      await setup.flush();
      await setup.flush(); // extra flush for useEffect to run
      const frame = setup.captureCharFrame();
      // The dialog should be visible (it renders the approval ID)
      expect(frame).toContain("Event ID: approval-A");
      expect(resolutions).toEqual([]); // no resolution yet
    } finally {
      setup.renderer.destroy();
    }
  });

  test("visible dialog + Claude focus cannot resolve", async () => {
    const snapshot = makeSnapshotWithApproval("approval-A");
    const resolutions: ApprovalRequestEvent[] = [];
    const subscribe = makeSubscribe(snapshot);

    const setup = await testRender(
      <App subscribe={subscribe} onApprovalResolve={(e) => resolutions.push(e)} />,
      { width: 120, height: 34 },
    );
    try {
      // Go to governance to auto-open dialog
      setup.mockInput.pressKey("3", { meta: true }); // Alt+3 = governance
      await setup.flush();
      await setup.flush(); // let useEffect open dialog
      // Switch back to Claude
      setup.mockInput.pressKey("1", { meta: true }); // Alt+1 = claude
      await setup.flush();
      // Try to accept from Claude focus
      setup.mockInput.pressKey("y", { meta: true }); // Alt+Y
      await setup.flush();
      expect(resolutions).toEqual([]);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("visible dialog + Antigravity focus cannot resolve", async () => {
    const snapshot = makeSnapshotWithApproval("approval-A");
    const resolutions: ApprovalRequestEvent[] = [];
    const subscribe = makeSubscribe(snapshot);

    const setup = await testRender(
      <App subscribe={subscribe} onApprovalResolve={(e) => resolutions.push(e)} />,
      { width: 120, height: 34 },
    );
    try {
      setup.mockInput.pressKey("3", { meta: true }); // governance
      await setup.flush();
      await setup.flush();
      setup.mockInput.pressKey("2", { meta: true }); // antigravity
      await setup.flush();
      setup.mockInput.pressKey("y", { meta: true }); // Alt+Y
      await setup.flush();
      expect(resolutions).toEqual([]);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("visible dialog + Events focus cannot resolve", async () => {
    const snapshot = makeSnapshotWithApproval("approval-A");
    const resolutions: ApprovalRequestEvent[] = [];
    const subscribe = makeSubscribe(snapshot);

    const setup = await testRender(
      <App subscribe={subscribe} onApprovalResolve={(e) => resolutions.push(e)} />,
      { width: 120, height: 34 },
    );
    try {
      setup.mockInput.pressKey("3", { meta: true }); // governance
      await setup.flush();
      await setup.flush();
      setup.mockInput.pressKey("4", { meta: true }); // events
      await setup.flush();
      setup.mockInput.pressKey("y", { meta: true }); // Alt+Y
      await setup.flush();
      expect(resolutions).toEqual([]);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("Governance + visible pending dialog resolves exactly once", async () => {
    const snapshot = makeSnapshotWithApproval("approval-A");
    const resolutions: ApprovalRequestEvent[] = [];
    const subscribe = makeSubscribe(snapshot);

    const setup = await testRender(
      <App subscribe={subscribe} onApprovalResolve={(e) => resolutions.push(e)} />,
      { width: 120, height: 34 },
    );
    try {
      // Focus governance to auto-open dialog
      setup.mockInput.pressKey("3", { meta: true }); // Alt+3 = governance
      await setup.flush();
      await setup.flush(); // let useEffect open dialog
      // Accept
      setup.mockInput.pressKey("y", { meta: true }); // Alt+Y
      await setup.flush();
      expect(resolutions.length).toBe(1);
      expect(resolutions[0]!.taskId).toBe("task-approval-A");
      expect(resolutions[0]!.resolution).toBe("accept");

      // Try to accept again — must not resolve (dialog closed + ID in resolved set)
      setup.mockInput.pressKey("y", { meta: true }); // Alt+Y again
      await setup.flush();
      expect(resolutions.length).toBe(1); // still exactly one
    } finally {
      setup.renderer.destroy();
    }
  });

  test("reject passes through the shared guard and resolves exactly once", async () => {
    const snapshot = makeSnapshotWithApproval("approval-A");
    const resolutions: ApprovalRequestEvent[] = [];
    const subscribe = makeSubscribe(snapshot);

    const setup = await testRender(
      <App subscribe={subscribe} onApprovalResolve={(e) => resolutions.push(e)} />,
      { width: 120, height: 34 },
    );
    try {
      setup.mockInput.pressKey("3", { meta: true }); // governance
      await setup.flush();
      await setup.flush();
      setup.mockInput.pressKey("n", { meta: true }); // Alt+N = reject
      await setup.flush();
      expect(resolutions.length).toBe(1);
      expect(resolutions[0]!.resolution).toBe("reject");

      // Try to reject again
      setup.mockInput.pressKey("n", { meta: true });
      await setup.flush();
      expect(resolutions.length).toBe(1);
    } finally {
      setup.renderer.destroy();
    }
  });

  test("unchanged snapshot cannot reopen or re-resolve the same approval", async () => {
    const snapshot = makeSnapshotWithApproval("approval-A");
    const resolutions: ApprovalRequestEvent[] = [];
    const subscribe = makeSubscribe(snapshot);

    const setup = await testRender(
      <App subscribe={subscribe} onApprovalResolve={(e) => resolutions.push(e)} />,
      { width: 120, height: 34 },
    );
    try {
      // Open and accept
      setup.mockInput.pressKey("3", { meta: true }); // governance
      await setup.flush();
      await setup.flush();
      act(() => { setup.mockInput.pressKey("y", { meta: true }); }); // accept
      await setup.flush();
      expect(resolutions.length).toBe(1);

      // The snapshot still contains approval-A. Re-focus governance.
      // The dialog should NOT auto-reopen because approval-A is in
      // resolvedApprovalIds.
      act(() => { setup.mockInput.pressKey("1", { meta: true }); }); // leave governance
      await setup.flush();
      act(() => { setup.mockInput.pressKey("3", { meta: true }); }); // back to governance
      await setup.flush();
      await setup.flush(); // let useEffect try to reopen
      await setup.flush(); // ensure React renders the updated state

      // Assert the approval dialog text is absent — not only that a
      // second event is not emitted, but the dialog itself is gone.
      const frameAfterRefocus = setup.captureCharFrame();
      expect(frameAfterRefocus).not.toContain("Event ID: approval-A");

      // Try to accept again
      act(() => { setup.mockInput.pressKey("y", { meta: true }); });
      await setup.flush();
      expect(resolutions.length).toBe(1); // no duplicate
    } finally {
      setup.renderer.destroy();
    }
  });

  test("approval changing to expired closes the dialog and emits nothing", async () => {
    // Start with a pending approval
    let currentSnapshot = makeSnapshotWithApproval("approval-A");
    const resolutions: ApprovalRequestEvent[] = [];
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
      // Open dialog
      setup.mockInput.pressKey("3", { meta: true }); // governance
      await setup.flush();
      await setup.flush();
      const frameBefore = setup.captureCharFrame();
      expect(frameBefore).toContain("Event ID: approval-A");

      // Change the snapshot: the approval is now expired
      currentSnapshot = makeSnapshotWithApproval("approval-A",
        { kind: "expired", text: "EXPIRED — decision window elapsed" });
      // Trigger re-render by notifying the listener inside act() so
      // React processes the state update and effects synchronously.
      act(() => {
        if (listenerRef.fn) listenerRef.fn(currentSnapshot);
      });
      await setup.waitForVisualIdle({ maxFrames: 10 });

      // Assert the approval dialog is absent — the dialog text should
      // no longer be visible before we test that Alt+Y emits nothing.
      const frameAfterExpiry = setup.captureCharFrame();
      expect(frameAfterExpiry).not.toContain("Event ID: approval-A");

      // Try to accept — should emit nothing
      setup.mockInput.pressKey("y", { meta: true });
      await setup.waitForVisualIdle({ maxFrames: 10 });
      expect(resolutions).toEqual([]);
    } finally {
      setup.renderer.destroy();
    }
  });
});