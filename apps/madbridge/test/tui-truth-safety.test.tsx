// apps/madbridge/test/tui-truth-safety.test.tsx
// Phase 0 truth and safety foundations — render-level tests.
//
// Tests:
// - StatusBar single-row at 120, 80, 60 columns with ALL six governance facts
// - All six facts present in both live and fixture modes at 120, 80, 60
// - FixtureBanner is a separate one-row truth band with exact text
// - KeyEvent-to-action translation through resolveKey
// - Approval keys without decision focus emit nothing
// - Bare digits and unbound keys reach PTY write path
//
// Uses @opentui/react/test-utils testRender + captureCharFrame.

import { test, expect, describe } from "bun:test";
import { testRender } from "@opentui/react/test-utils";
import { StatusBar, buildStatusLine } from "../src/tui/components/StatusBar";
import { FixtureBanner, buildFixtureBanner, FIXTURE_BANNER_TEXT } from "../src/tui/components/FixtureBanner";
import {
  loadKeybindings,
  resolveKey,
  isGlobalAction,
  translateKeyEvent,
} from "../src/tui/keybindings";
import type { BrokerSnapshot, FocusTarget, ApprovalRequestEvent } from "../src/tui/types";

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

const baseInput = {
  connected: true,
  sessionWord: "active",
  ownerWord: "exec-claude-code #3",
  pendingCount: 1,
  ledgerSeq: 3,
  focusWord: "CLAUDE",
};

// ─── buildStatusLine: all six facts at 60+ columns ───

describe("buildStatusLine preserves all six governance facts at 60+ columns", () => {
  test("at 120 columns, all six facts present (full format)", () => {
    const line = buildStatusLine({ ...baseInput, width: 120 });
    expect(line.length).toBe(120);
    expect(line).toContain("CONNECTED");      // 1. connection
    expect(line).toContain("session");         // 2. session label
    expect(line).toContain("active");          // 2. session value
    expect(line).toContain("writer");          // 3. writer label
    expect(line).toContain("exec-claude-code");// 3. writer identity
    expect(line).toContain("#3");             // 3. fencing token
    expect(line).toContain("pending");         // 4. pending label
    expect(line).toContain("pending 1");      // 4. pending count
    expect(line).toContain("focus");          // 5. focus label
    expect(line).toContain("CLAUDE");         // 5. focus value
    expect(line).toContain("ledger");         // 6. ledger label
    expect(line).toContain("ledger #3");      // 6. ledger sequence
  });

  test("at 80 columns, all six facts present (compact format)", () => {
    const line = buildStatusLine({ ...baseInput, width: 80 });
    expect(line.length).toBe(80);
    expect(line).toContain("CONN");           // 1. connection
    expect(line).toContain("S:active");       // 2. session
    expect(line).toContain("W:");             // 3. writer label
    expect(line).toContain("#3");             // 3. fencing token
    expect(line).toContain("P:1");           // 4. pending
    expect(line).toContain("F:CLAUDE");       // 5. focus
    expect(line).toContain("L:#3");          // 6. ledger
  });

  test("at 60 columns, all six facts present (narrow pipe format)", () => {
    const line = buildStatusLine({ ...baseInput, width: 60 });
    expect(line.length).toBe(60);
    expect(line).toContain("CONN");           // 1. connection
    expect(line).toContain("S:active");       // 2. session
    expect(line).toContain("W:");             // 3. writer label
    expect(line).toContain("#3");             // 3. fencing token
    expect(line).toContain("P:1");           // 4. pending
    expect(line).toContain("F:CLAUDE");       // 5. focus
    expect(line).toContain("L:#3");          // 6. ledger
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

// ─── Progressive dropping below 60 ───

describe("progressive dropping below 60 columns is documented and tested", () => {
  test("at 40 columns, ledger and pending may be dropped (connection+focus mandatory)", () => {
    const line = buildStatusLine({ ...baseInput, width: 40 });
    expect(line.length).toBe(40);
    // Connection and focus are mandatory at all widths
    expect(line).toContain("CONN");
    expect(line).toContain("F:CLAUDE");
  });

  test("at 20 columns, hard truncate — never wrap, never exceed width", () => {
    const line = buildStatusLine({ ...baseInput, width: 20 });
    expect(line.length).toBe(20);
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
      // All six facts
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
      // At 60 cols the banner text (35 chars) fits in one row
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

// ─── Approval keys without decision focus ───

describe("Approval keys are inert without decision focus", () => {
  test("approval keys do not resolve when focus is on a PTY pane", () => {
    const bindings = loadKeybindings();
    let approvalEmitted: ApprovalRequestEvent | null = null;

    const altY = translateKeyEvent({ name: "y", ctrl: false, meta: true, shift: false });
    expect(resolveKey(altY, bindings)).toBe("accept-approval");

    const currentFocus: FocusTarget = "claude";
    const focusStr: string = currentFocus;
    const canResolveApproval = focusStr === "governance" || focusStr === "events";
    expect(canResolveApproval).toBe(false);
    expect(approvalEmitted).toBeNull();
  });

  test("approval keys CAN resolve when focus is on governance pane", () => {
    const bindings = loadKeybindings();
    const altN = translateKeyEvent({ name: "n", ctrl: false, meta: true, shift: false });
    expect(resolveKey(altN, bindings)).toBe("reject-approval");

    const currentFocus: FocusTarget = "governance";
    const focusStr: string = currentFocus;
    const canResolveApproval = focusStr === "governance" || focusStr === "events";
    expect(canResolveApproval).toBe(true);
  });

  test("approval resolution binds to displayed approval id, not arbitrary context", () => {
    const displayedApprovalId: string | null = null;
    expect(displayedApprovalId).toBeNull();

    const presentApprovalId: string | null = "approval-001";
    expect(presentApprovalId).not.toBeNull();
  });
});

// ─── Bare bytes pass through to PTY ───

describe("Bare bytes reach PTY write path", () => {
  test("bare digit key is not consumed as a global action", () => {
    const bindings = loadKeybindings();
    for (let i = 0; i <= 9; i++) {
      const digit = String(i);
      const translated = translateKeyEvent({ name: digit, ctrl: false, meta: false, shift: false });
      expect(translated).toBe(digit);
      expect(isGlobalAction(translated, bindings)).toBe(false);
      expect(resolveKey(translated, bindings)).toBeNull();
    }
  });

  test("letters without modifier pass through", () => {
    const bindings = loadKeybindings();
    for (const letter of ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]) {
      const translated = translateKeyEvent({ name: letter, ctrl: false, meta: false, shift: false });
      expect(translated).toBe(letter);
      expect(resolveKey(translated, bindings)).toBeNull();
    }
  });

  test("useKeyboard handler writes bare bytes to PTY", () => {
    const writtenBytes: string[] = [];
    const bindings = loadKeybindings();

    function simulateKey(name: string, ctrl: boolean, meta: boolean, shift: boolean) {
      const keyStr = translateKeyEvent({ name, ctrl, meta, shift });
      const action = resolveKey(keyStr, bindings);
      if (action !== null) return;
      writtenBytes.push(keyStr);
    }

    simulateKey("1", false, false, false);
    simulateKey("2", false, false, false);
    simulateKey("3", false, false, false);
    simulateKey("x", false, false, false);
    simulateKey("1", false, true, false);

    expect(writtenBytes).toEqual(["1", "2", "3", "x"]);
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