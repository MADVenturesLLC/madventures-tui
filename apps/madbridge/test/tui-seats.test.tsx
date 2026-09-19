// apps/madbridge/test/tui-seats.test.tsx
// Founder seat surface — GLM-20260918-FOUNDER-TUI-SEATS.
//
// Proves the seat contract is honest and LOCAL:
//   - The seat table's modes and pane mappings are the fixed contract.
//   - SeatBar marks the active seat with a textual `*` (never color alone).
//   - The StatusBar carries seat + mode as facts and DROPS them (never
//     fabricates) when no seat is provided.
//   - Seat keyboard actions focus the seat's pane and select the seat —
//     and never touch approval resolution (validateApprovalResolution is
//     untouched and still fail-closed).
//   - Seat actions are LOCAL UI state: no broker snapshot field changes.

import { test, expect, describe } from "bun:test";
import { SEATS } from "../src/tui/types";
import type { BrokerSnapshot, SeatId } from "../src/tui/types";
import { seatMode, seatDefaultFocus, seatLabel } from "../src/tui/components/agent-identity";
import { buildSeatRow, seatCell } from "../src/tui/components/SeatBar";
import { buildStatusLine } from "../src/tui/components/StatusBar";
import { buildModelLine, catalogNote, UNPINNED_WORD } from "../src/tui/components/ModelBar";
import { buildPickerRows } from "../src/tui/components/ModelPicker";
import type { ModelPickerProps } from "../src/tui/components/ModelPicker";
import {
  parseOmpModelsJson,
  loadOmpCatalog,
  sanitizeReason,
  resolveOmpBin,
} from "../src/tui/omp-catalog";
import { emptyProfiles, clampPickerIndex } from "../src/tui/hooks/useSeatState";
import { routeKeyEvent } from "../src/tui/keyboard-router";
import type { KeyboardRouterCallbacks, KeyboardRouterState } from "../src/tui/keyboard-router";

// ─── Seat contract ───

describe("Seat contract (types.ts SEATS)", () => {
  test("three seats with fixed modes", () => {
    expect(SEATS.map((s) => s.id)).toEqual(["builder", "architect", "operator"]);
    expect(seatMode("builder")).toBe("APPLY");
    expect(seatMode("architect")).toBe("PLAN");
    expect(seatMode("operator")).toBe("READ");
  });

  test("seat → pane mapping: builder/architect → claude, operator → governance", () => {
    expect(seatDefaultFocus("builder")).toBe("claude");
    expect(seatDefaultFocus("architect")).toBe("claude");
    expect(seatDefaultFocus("operator")).toBe("governance");
  });

  test("labels are uppercase display words", () => {
    expect(seatLabel("builder")).toBe("BUILDER");
    expect(seatLabel("architect")).toBe("ARCHITECT");
    expect(seatLabel("operator")).toBe("OPERATOR");
  });
});

// ─── SeatBar ───

describe("SeatBar", () => {
  test("active seat carries the textual * marker", () => {
    expect(buildSeatRow("builder")).toBe("[ BUILDER* ][ ARCHITECT ][ OPERATOR ]");
    expect(buildSeatRow("architect")).toBe("[ BUILDER ][ ARCHITECT* ][ OPERATOR ]");
    expect(buildSeatRow("operator")).toBe("[ BUILDER ][ ARCHITECT ][ OPERATOR* ]");
  });

  test("seatCell marks only the matching seat", () => {
    const builder = SEATS.find((s) => s.id === "builder")!;
    expect(seatCell(builder, "builder")).toBe("[ BUILDER* ]");
    expect(seatCell(builder, "operator")).toBe("[ BUILDER ]");
  });
});

// ─── StatusBar seat + mode facts ───

function statusInput(extra: Partial<Parameters<typeof buildStatusLine>[0]> = {}) {
  return {
    connected: true,
    sessionWord: "active",
    ownerWord: "free",
    pendingCount: 0,
    ledgerSeq: 3,
    focusWord: "CLAUDE",
    width: 120,
    ...extra,
  };
}

describe("StatusBar seat + mode facts", () => {
  test("wide format includes seat + mode when a seat is provided", () => {
    const line = buildStatusLine(statusInput({ seatWord: "BUILDER", modeWord: "APPLY" }));
    expect(line).toContain("seat BUILDER (APPLY)");
    // Facts stay ordered: focus before seat before ledger.
    const focusIdx = line.indexOf("focus CLAUDE");
    const seatIdx = line.indexOf("seat BUILDER");
    const ledgerIdx = line.indexOf("ledger #3");
    expect(focusIdx).toBeLessThan(seatIdx);
    expect(seatIdx).toBeLessThan(ledgerIdx);
  });

  test("narrow format carries the combined SEAT token", () => {
    const line = buildStatusLine(statusInput({ width: 60, seatWord: "OPERATOR", modeWord: "READ" }));
    expect(line).toContain("SEAT:OPERATOR·READ");
  });

  test("no seat provided → no SEAT token is fabricated", () => {
    const wide = buildStatusLine(statusInput());
    expect(wide).not.toContain("seat ");
    const narrow = buildStatusLine(statusInput({ width: 60 }));
    expect(narrow).not.toContain("SEAT:");
  });

  test("seat fact drops before focus and connection at narrow widths", () => {
    // Shrink until the seat token no longer fits — connection and focus
    // must survive longer than the seat fact.
    let sawLineWithoutSeatButWithFocus = false;
    for (let w = 60; w >= 20; w--) {
      const line = buildStatusLine(statusInput({ width: w, seatWord: "BUILDER", modeWord: "APPLY" }));
      if (!line.includes("SEAT:") && line.includes("F:")) {
        sawLineWithoutSeatButWithFocus = true;
        expect(line).toContain("CONN"); // connection outlives seat
        break;
      }
    }
    expect(sawLineWithoutSeatButWithFocus).toBe(true);
  });
});

// ─── Keyboard routing ───

function makeRouterState(seat?: SeatId): KeyboardRouterState {
  return {
    focus: "claude",
    showApprovalDialog: false,
    displayedApprovalId: null,
    resolvedApprovalIds: new Set<string>(),
    ...(seat !== undefined ? { seat } : {}),
  };
}

function makeCallbacks(): KeyboardRouterCallbacks & {
  focusChanges: FocusRecord[];
  seatSelections: SeatId[];
  ptyWrites: string[];
  approvals: unknown[];
  pickerOpens: number[];
  pickerNavs: number[];
  pickerConfirms: number[];
  pickerCloses: number[];
} {
  const focusChanges: FocusRecord[] = [];
  const seatSelections: SeatId[] = [];
  const ptyWrites: string[] = [];
  const approvals: unknown[] = [];
  const pickerOpens: number[] = [];
  const pickerNavs: number[] = [];
  const pickerConfirms: number[] = [];
  const pickerCloses: number[] = [];
  return {
    focusChanges,
    seatSelections,
    ptyWrites,
    approvals,
    pickerOpens,
    pickerNavs,
    pickerConfirms,
    pickerCloses,
    onFocusChange: (t) => focusChanges.push(t),
    onSeatSelect: (s) => seatSelections.push(s),
    onPtyWrite: (d) => ptyWrites.push(d),
    onQuit: () => {},
    onShowApprovalDialog: () => {},
    onApprovalResolve: (e) => approvals.push(e),
    onModelPickerOpen: () => pickerOpens.push(1),
    onModelPickerNav: (delta) => pickerNavs.push(delta),
    onModelPickerConfirm: () => pickerConfirms.push(1),
    onModelPickerClose: () => pickerCloses.push(1),
  };
}

type FocusRecord = string;

describe("Seat keyboard routing", () => {
  test("seat-builder action selects builder and focuses claude", () => {
    const cb = makeCallbacks();
    const state = routeKeyEvent({
      keyStr: "alt+1",
      action: "seat-builder",
      sequence: "\x1b1",
      name: "1",
      state: makeRouterState("operator"),
      snapshot: null,
      callbacks: cb,
      bindings: new Map(),
    });
    expect(cb.seatSelections).toEqual(["builder"]);
    expect(cb.focusChanges).toEqual(["claude"]);
    expect(state.seat).toBe("builder");
    expect(state.focus).toBe("claude");
  });

  test("seat-architect action selects architect and focuses claude", () => {
    const cb = makeCallbacks();
    const state = routeKeyEvent({
      keyStr: "alt+2",
      action: "seat-architect",
      sequence: "\x1b2",
      name: "2",
      state: makeRouterState(),
      snapshot: null,
      callbacks: cb,
      bindings: new Map(),
    });
    expect(cb.seatSelections).toEqual(["architect"]);
    expect(cb.focusChanges).toEqual(["claude"]);
    expect(state.seat).toBe("architect");
    expect(state.focus).toBe("claude");
  });

  test("seat-operator action selects operator and focuses governance", () => {
    const cb = makeCallbacks();
    const state = routeKeyEvent({
      keyStr: "alt+3",
      action: "seat-operator",
      sequence: "\x1b3",
      name: "3",
      state: makeRouterState(),
      snapshot: null,
      callbacks: cb,
      bindings: new Map(),
    });
    expect(cb.seatSelections).toEqual(["operator"]);
    expect(cb.focusChanges).toEqual(["governance"]);
    expect(state.seat).toBe("operator");
    expect(state.focus).toBe("governance");
  });

  test("seat actions are inert on approvals — no resolution emitted", () => {
    const cb = makeCallbacks();
    routeKeyEvent({
      keyStr: "alt+3",
      action: "seat-operator",
      sequence: "\x1b3",
      name: "3",
      state: makeRouterState(),
      snapshot: null,
      callbacks: cb,
      bindings: new Map(),
    });
    expect(cb.approvals).toEqual([]);
    expect(cb.ptyWrites).toEqual([]);
  });

  test("callbacks are optional — pre-seat callers keep working", () => {
    const state = routeKeyEvent({
      keyStr: "alt+1",
      action: "seat-builder",
      sequence: "\x1b1",
      name: "1",
      state: makeRouterState(),
      snapshot: null,
      callbacks: {
        onFocusChange: () => {},
        onApprovalResolve: () => {},
        onPtyWrite: () => {},
        onQuit: () => {},
        onShowApprovalDialog: () => {},
      },
      bindings: new Map(),
    });
    expect(state.seat).toBe("builder");
  });
});

// ─── Seat actions never mutate broker state ───

describe("Seat actions are LOCAL UI state", () => {
  test("routing a seat action returns only seat/focus changes", () => {
    const before = makeRouterState("builder");
    const cb = makeCallbacks();
    const after = routeKeyEvent({
      keyStr: "alt+3",
      action: "seat-operator",
      sequence: "\x1b3",
      name: "3",
      state: before,
      snapshot: null,
      callbacks: cb,
      bindings: new Map(),
    });
    // Only seat + focus changed; approval fields untouched.
    expect(after.showApprovalDialog).toBe(before.showApprovalDialog);
    expect(after.displayedApprovalId).toBe(before.displayedApprovalId);
    expect(after.resolvedApprovalIds).toBe(before.resolvedApprovalIds);
  });
});

// ─── Slice 2: ModelBar + OMP catalog ───

const CATALOG_FIXTURE = JSON.stringify({
  models: [
    {
      provider: "test-provider",
      id: "model-a",
      selector: "test-provider/model-a",
      name: "Model A",
      contextWindow: 1000000,
      maxTokens: 65536,
      reasoning: true,
      thinking: ["high"],
      input: ["text"],
      cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    },
    { provider: "test-provider", id: "model-b", selector: "test-provider/model-b", name: "Model B" },
  ],
});

describe("OMP catalog parsing (omp models ls --json)", () => {
  test("parses a real-shaped catalog into selector/name/provider entries", () => {
    const models = parseOmpModelsJson(CATALOG_FIXTURE);
    expect(models).toHaveLength(2);
    expect(models[0]).toEqual({
      selector: "test-provider/model-a",
      name: "Model A",
      provider: "test-provider",
    });
    expect(models[1]!.selector).toBe("test-provider/model-b");
  });

  test("invalid JSON throws — the caller must report it, not guess", () => {
    expect(() => parseOmpModelsJson("not json at all")).toThrow();
  });

  test("missing models array throws", () => {
    expect(() => parseOmpModelsJson("{}")).toThrow(/models/);
  });

  test("entry missing a selector throws", () => {
    expect(() => parseOmpModelsJson(JSON.stringify({ models: [{ name: "x", provider: "y" }] }))).toThrow(/selector/);
  });

  test("loadOmpCatalog reports an honest reason for a missing binary", async () => {
    const result = await loadOmpCatalog({
      bin: "definitely-not-a-real-binary-glm-20260918",
      timeoutMs: 500,
    });
    expect(result.status).toBe("unavailable");
    if (result.status === "unavailable") {
      expect(result.reason).toContain("not found");
    }
  });

  test("failure reasons collapse to ONE line (execFile stderr has newlines)", () => {
    const messy = "Command failed: omp models ls --json\n1 | ◆◆◆◆\n    ^\nerror: Unexpected ◆\n    at /Users/michaeldaley/node_modules/...";
    const clean = sanitizeReason(messy);
    expect(clean).not.toContain("\n");
    expect(clean).not.toContain("\t");
    expect(clean.startsWith("Command failed: omp models ls --json 1 |")).toBe(true);
  });

  test("long reasons cap at 160 with an ellipsis", () => {
    const clean = sanitizeReason("x".repeat(300));
    expect(clean.length).toBeLessThanOrEqual(160);
    expect(clean.endsWith("…")).toBe(true);
  });

  test("resolveOmpBin honors the MAD_OMP_BIN override", () => {
    const orig = process.env.MAD_OMP_BIN;
    try {
      process.env.MAD_OMP_BIN = "/opt/custom/omp";
      expect(resolveOmpBin()).toBe("/opt/custom/omp");
    } finally {
      if (orig === undefined) delete process.env.MAD_OMP_BIN;
      else process.env.MAD_OMP_BIN = orig;
    }
  });

  test("MAD_TUI_CATALOG=off disables the probe with an explicit reason", async () => {
    const orig = process.env.MAD_TUI_CATALOG;
    try {
      process.env.MAD_TUI_CATALOG = "off";
      const result = await loadOmpCatalog();
      expect(result.status).toBe("unavailable");
      if (result.status === "unavailable") {
        expect(result.reason).toBe("catalog disabled (MAD_TUI_CATALOG=off)");
      }
    } finally {
      if (orig === undefined) delete process.env.MAD_TUI_CATALOG;
      else process.env.MAD_TUI_CATALOG = orig;
    }
  });
});

describe("ModelBar line", () => {
  test("unpinned seat shows the explicit unpinned word", () => {
    const line = buildModelLine({
      seatWord: "BUILDER",
      modeWord: "APPLY",
      profileWord: UNPINNED_WORD,
      catalogNote: "",
      width: 120,
    });
    expect(line).toBe("MODEL unpinned | PROFILE BUILDER | MODE APPLY");
  });

  test("pinned profile is rendered as the pinned selector", () => {
    const line = buildModelLine({
      seatWord: "OPERATOR",
      modeWord: "READ",
      profileWord: "test-provider/model-a",
      catalogNote: "",
      width: 120,
    });
    expect(line).toBe("MODEL test-provider/model-a | PROFILE OPERATOR | MODE READ");
  });

  test("unavailable catalog carries the explicit reason", () => {
    const note = catalogNote({ status: "unavailable", reason: "omp not found on PATH" });
    expect(note).toBe(" | catalog unavailable (omp not found on PATH)");
    const line = buildModelLine({
      seatWord: "BUILDER",
      modeWord: "APPLY",
      profileWord: UNPINNED_WORD,
      catalogNote: note,
      width: 120,
    });
    expect(line).toContain("catalog unavailable (omp not found on PATH)");
  });

  test("loading catalog states loading; ok states nothing", () => {
    expect(catalogNote({ status: "loading" })).toBe(" | catalog loading");
    expect(catalogNote({ status: "ok", models: [] })).toBe("");
  });

  test("long catalog reasons truncate with a marker, never wrap", () => {
    const line = buildModelLine({
      seatWord: "BUILDER",
      modeWord: "APPLY",
      profileWord: UNPINNED_WORD,
      catalogNote: " | catalog unavailable (" + "x".repeat(300) + ")",
      width: 60,
    });
    expect(line.length).toBeLessThanOrEqual(61); // width + one marker cell
    expect(line.endsWith("…")).toBe(true);
  });
});

describe("Seat model profiles (LOCAL state)", () => {
  test("every seat starts unpinned", () => {
    expect(emptyProfiles()).toEqual({ builder: null, architect: null, operator: null });
  });

  test("picker index clamps to the catalog bounds", () => {
    expect(clampPickerIndex(0, 2)).toBe(0);
    expect(clampPickerIndex(1, 2)).toBe(1);
    expect(clampPickerIndex(5, 2)).toBe(1);
    expect(clampPickerIndex(-3, 2)).toBe(0);
    expect(clampPickerIndex(0, 0)).toBe(0);
    expect(clampPickerIndex(3, -1)).toBe(0);
  });
});

// ─── Slice 3: ModelPicker + Ctrl+P modal routing ───

const OK_CATALOG = {
  status: "ok" as const,
  models: [
    { selector: "test-provider/model-a", name: "Model A", provider: "test-provider" },
    { selector: "test-provider/model-b", name: "Model B", provider: "test-provider" },
  ],
};

describe("ModelPicker rows", () => {
  test("loading renders the explicit loading word", () => {
    expect(buildPickerRows({ status: "loading" }, 0, 80)).toEqual(["catalog loading…"]);
  });

  test("unavailable renders the explicit reason", () => {
    const rows = buildPickerRows({ status: "unavailable", reason: "omp not found on PATH" }, 0, 80);
    expect(rows[0]).toContain("catalog unavailable (omp not found on PATH)");
  });

  test("empty ok catalog states no models reported", () => {
    expect(buildPickerRows({ status: "ok", models: [] }, 0, 80)).toEqual(["no models reported by omp"]);
  });

  test("ok catalog marks the cursor row with ▸ (never color alone)", () => {
    const rows = buildPickerRows(OK_CATALOG, 1, 80);
    expect(rows[0]).toBe("  test-provider/model-a — Model A");
    expect(rows[1]).toBe("▸ test-provider/model-b — Model B");
  });
});

describe("Model picker routing (Ctrl+P modal)", () => {
  test("open-model-picker opens the picker", () => {
    const cb = makeCallbacks();
    const state = routeKeyEvent({
      keyStr: "ctrl+p",
      action: "open-model-picker",
      sequence: "\x10",
      name: "p",
      state: makeRouterState(),
      snapshot: null,
      callbacks: cb,
      bindings: new Map(),
    });
    expect(cb.pickerOpens).toHaveLength(1);
    expect(state.showModelPicker).toBe(true);
  });

  test("while open: up/down navigate and NEVER reach the PTY", () => {
    const cb = makeCallbacks();
    let state = makeRouterState();
    state = { ...state, showModelPicker: true };
    for (const [key, name] of [["\x1b[A", "up"], ["\x1b[B", "down"], ["\x1b[B", "down"]] as const) {
      state = routeKeyEvent({
        keyStr: key,
        action: null,
        sequence: key,
        name,
        state,
        snapshot: null,
        callbacks: cb,
        bindings: new Map(),
      });
    }
    expect(cb.pickerNavs).toEqual([-1, 1, 1]);
    expect(cb.ptyWrites).toEqual([]);
    expect(state.showModelPicker).toBe(true); // still open
  });

  test("return confirms and closes; nothing reaches the PTY", () => {
    const cb = makeCallbacks();
    const state = routeKeyEvent({
      keyStr: "return",
      action: null,
      sequence: "\r",
      name: "return",
      state: { ...makeRouterState(), showModelPicker: true },
      snapshot: null,
      callbacks: cb,
      bindings: new Map(),
    });
    expect(cb.pickerConfirms).toHaveLength(1);
    expect(cb.ptyWrites).toEqual([]);
    expect(state.showModelPicker).toBe(false);
  });

  test("escape closes without confirming", () => {
    const cb = makeCallbacks();
    const state = routeKeyEvent({
      keyStr: "escape",
      action: null,
      sequence: "\x1b",
      name: "escape",
      state: { ...makeRouterState(), showModelPicker: true },
      snapshot: null,
      callbacks: cb,
      bindings: new Map(),
    });
    expect(cb.pickerConfirms).toHaveLength(0);
    expect(cb.pickerCloses).toHaveLength(1);
    expect(state.showModelPicker).toBe(false);
  });

  test("unbound keys are swallowed while the modal is open (no PTY leak)", () => {
    const cb = makeCallbacks();
    routeKeyEvent({
      keyStr: "x",
      action: null,
      sequence: "x",
      name: "x",
      state: { ...makeRouterState(), showModelPicker: true },
      snapshot: null,
      callbacks: cb,
      bindings: new Map(),
    });
    expect(cb.ptyWrites).toEqual([]);
  });
});

// ─── Slice 3 render-level end-to-end: Ctrl+P → picker → pin ───

import { act } from "react";
import { testRender } from "@opentui/react/test-utils";
import { App } from "../src/tui/App";
import {
  parseSurfaceId,
  type TaskEnvelopeV1,
  type ExecutionIdentity,
  type RepositoryFingerprint,
} from "@madventures/protocol";

function seatFixtureSnapshot(): BrokerSnapshot {
  const makeFingerprint = (): RepositoryFingerprint => ({
    kind: "commit",
    sha256: "a".repeat(64),
    git_sha: "abcdef1234567890abcdef1234567890abcdef12",
  });
  const makeExecution = (surface: "claude-code" | "antigravity"): ExecutionIdentity => {
    const isBuilder = surface === "claude-code";
    return {
      execution_id: `exec-${surface}`,
      role: isBuilder ? "builder" : "independent-reviewer",
      surface: parseSurfaceId(surface),
      model: isBuilder ? "claude-sonnet-4" : "gemini-2.5-pro",
      provider: isBuilder ? "anthropic" : "google",
      independence_domain: isBuilder ? "fixture-builder-control" : "fixture-review-control",
      effort: "medium",
    };
  };
  const task: TaskEnvelopeV1 = {
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
  return {
    connected: true,
    sessionState: "active",
    ownershipState: "owned",
    activeWriter: "exec-claude-code",
    fencingToken: 3,
    task,
    executions: task.executions,
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
    eventLog: [{ seq: 3, type: "session-start", actor: "claude-code", fencingToken: 3, hash: "abc123", timestamp: "2026-08-08T12:00:00Z" }],
    queueDepth: 0,
  };
}

describe("Ctrl+P end-to-end (render level)", () => {
  test("open → navigate: picker opens over the stage and cursor moves", async () => {
    // SCOPE NOTE: the OpenTUI 0.5.1 mock input pipeline does not deliver
    // lone \r / \x1b bytes to useKeyboard in any tested configuration
    // (kitty and legacy, with and without real-time settle) — verified
    // empirically during this slice. The picker's confirm/escape behavior
    // is therefore proven at the router level (routeKeyEvent unit tests
    // above); open + navigation are proven end-to-end here.
    const snapshot = seatFixtureSnapshot();
    const setup = await testRender(
      <App
        subscribe={(listener) => {
          listener(snapshot);
          return () => {};
        }}
        catalogLoader={async () => OK_CATALOG}
      />,
      { width: 100, height: 30 },
    );
    try {
      await setup.flush();

      // Ctrl+P opens the picker over the stage. Keypresses are act-wrapped:
      // without act, React 19 defers the state update past captureCharFrame
      // (observed as a stale frame in the picker e2e).
      act(() => {
        setup.mockInput.pressKey("p", { ctrl: true });
      });
      await setup.flush();
      let frame = setup.captureCharFrame();
      expect(frame).toContain("MODEL PICKER");
      expect(frame).toContain("test-provider/model-a");
      expect(frame).toContain("▸ test-provider/model-a");

      // j moves the cursor to model-b (vim-style nav survives every input
      // path; up/down are accepted too).
      act(() => {
        setup.mockInput.pressKey("j");
      });
      await setup.flush();
      frame = setup.captureCharFrame();
      expect(frame).toContain("▸ test-provider/model-b");
      expect(frame).not.toContain("▸ test-provider/model-a");
    } finally {
      setup.renderer.destroy();
    }
  });

  test("picker overlays the stage and the ModelBar still reads unpinned while open", async () => {
    const snapshot = seatFixtureSnapshot();
    const setup = await testRender(
      <App
        subscribe={(listener) => {
          listener(snapshot);
          return () => {};
        }}
        catalogLoader={async () => OK_CATALOG}
      />,
      { width: 100, height: 30 },
    );
    try {
      await setup.flush();
      act(() => {
        setup.mockInput.pressKey("p", { ctrl: true });
      });
      await setup.flush();
      const frame = setup.captureCharFrame();
      // The picker is a modal overlay; the underlying ModelBar still shows
      // the honest unpinned word until a model is actually pinned.
      expect(frame).toContain("MODEL PICKER");
      expect(frame).toContain("MODEL unpinned");
    } finally {
      setup.renderer.destroy();
    }
  });
});
