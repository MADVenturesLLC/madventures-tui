import { expect, test } from "bun:test";
import { testRender } from "@opentui/react/test-utils";
import type { ReactNode } from "react";
import { parseSurfaceId } from "@madventures/protocol";
import { App } from "../../apps/madbridge/src/tui/App";
import { DockStrip } from "../../apps/madbridge/src/tui/components/DockStrip";
import { EventLog } from "../../apps/madbridge/src/tui/components/EventLog";
import { IncidentBand } from "../../apps/madbridge/src/tui/components/IncidentBand";
import { StatusBar } from "../../apps/madbridge/src/tui/components/StatusBar";
import { AntigravityPane } from "../../apps/madbridge/src/tui/panes/AntigravityPane";
import { ClaudePane } from "../../apps/madbridge/src/tui/panes/ClaudePane";
import { GovernancePane } from "../../apps/madbridge/src/tui/panes/GovernancePane";
import type { BrokerSnapshot } from "../../apps/madbridge/src/tui/types";

const absent: BrokerSnapshot = {
  connected: true, sessionState: "active", ownershipState: null, activeWriter: null,
  fencingToken: null, task: null, executions: null, repositoryFingerprint: null, pendingApprovals: [],
  pendingTransfers: null, permissionSummary: null, transferPhase: null, verificationStatus: null,
  reviewStatus: null, incident: null, eventLog: [], queueDepth: null,
};

async function frame(node: ReactNode, width = 160): Promise<string> {
  const screen = await testRender(node, { width, height: 38 });
  try {
    await screen.flush();
    return screen.captureCharFrame();
  } finally {
    screen.renderer.destroy();
  }
}

test("governance distinguishes unknown transfers and permissions from empty collections", async () => {
  const unknown = await frame(<GovernancePane active state={absent} />);
  expect(unknown).toContain("Pending transfers: —");
  expect(unknown).toContain("Read: — | Write: —");
  expect(unknown).toContain("Commands: — | Egress: — | Data class: —");
  expect(unknown).not.toMatch(/Pending transfers: 0|Read: none|Write: none|Commands: none|Egress: none/);
  const empty = await frame(<GovernancePane active state={{ ...absent, pendingTransfers: [], permissionSummary: {
    allowedReadPaths: [], allowedWritePaths: [], allowedCommandCategories: [], allowedEgressDestinations: [], dataClass: "internal",
  } }} />);
  expect(empty).toContain("Pending transfers: 0");
  expect(empty).toContain("Read: none | Write: none");
  expect(empty).toContain("Commands: none | Egress: none | Data class: internal");
});

test("a null connection is unknown in bars, panes and docks", async () => {
  const state = { ...absent, connected: null };
  for (const width of [60, 160]) {
    const screen = await frame(<App subscribe={listen => { listen(state); return () => {}; }}
      catalogLoader={async () => ({ status: "ok", models: [] })} />, width);
    expect(screen).toMatch(/UNKNOWN\s*\|\s*(session active|S:active)/);
    expect(screen).not.toMatch(/\b(CONNECTED|CONN|NOCONN)\b/);
  }
  expect(await frame(<GovernancePane active state={state} />)).toContain("GOVERNANCE | UNKNOWN");
  for (const surface of ["claude-code", "antigravity"] as const) {
    const Pane = surface === "claude-code" ? ClaudePane : AntigravityPane;
    const pane = await frame(<Pane active state={state} ptyOutput="" />);
    const dock = await frame(<DockStrip surface={surface} state={state} ptyOutput="" />);
    expect(pane).toContain("FOCUSED | UNKNOWN");
    expect(dock).toContain("docked | UNKNOWN");
    expect(pane + dock).not.toMatch(/STREAM ENDED|\bLIVE\b|WRITER/);
  }
});

test("absent execution and ownership facts stay absent and queue depth stays hidden", async () => {
  const governance = await frame(<GovernancePane active state={absent} />);
  expect(governance).toContain("Claude: —");
  expect(governance).toContain("Antigravity: —");
  expect(governance).toContain("Ownership: UNKNOWN");
  const status = await frame(<StatusBar state={absent} connected focus="claude" />);
  expect(status).toContain("writer UNKNOWN");
  const app = (state: BrokerSnapshot) => <App subscribe={listen => { listen(state); return () => {}; }}
    catalogLoader={async () => ({ status: "ok", models: [] })} />;
  expect(await frame(app(absent))).toBe(await frame(app({ ...absent, queueDepth: 81937 })));
  for (const surface of ["claude-code", "antigravity"] as const) {
    const Pane = surface === "claude-code" ? ClaudePane : AntigravityPane;
    expect(await frame(<Pane active state={absent} ptyOutput="" />)).toContain("UNKNOWN | UNKNOWN");
    expect(await frame(<DockStrip surface={surface} state={absent} ptyOutput="" />)).toContain("UNKNOWN | UNKNOWN");
  }
});

test("a null token stays absent in writer, incident and session_open frames", async () => {
  for (const surface of ["claude-code", "antigravity"] as const) {
    const state: BrokerSnapshot = { ...absent, ownershipState: "owned", activeWriter: "writer",
      executions: [{ execution_id: "writer", surface: parseSurfaceId(surface), role: "builder",
        model: "synthetic", provider: "synthetic", independence_domain: "synthetic", effort: "low" }] };
    const Pane = surface === "claude-code" ? ClaudePane : AntigravityPane;
    expect(await frame(<Pane active state={state} ptyOutput="" />)).toContain("WRITER token —");
    expect(await frame(<DockStrip surface={surface} state={state} ptyOutput="" />)).toContain("WRITER token —");
    expect(await frame(<StatusBar state={state} connected focus="claude" />)).toContain("writer (token —)");
    expect(await frame(<StatusBar state={state} connected focus="claude" />, 60)).toContain("T:—");
  }
  expect(await frame(<GovernancePane active state={absent} />)).toContain("Token: —");
  expect(await frame(<IncidentBand state={{ ...absent, sessionState: "interrupted" }} />)).toContain("token —");
  const entries = ["session_open", "bridge_event"].map((type, i) => ({
    seq: i + 1, type, actor: "offline", fencingToken: null, hash: "synthetic", timestamp: "synthetic",
  }));
  const rows = await frame(<EventLog entries={entries} />);
  for (const entry of entries) {
    const line = rows.split("\n").find(row => row.includes(entry.type));
    expect(line).toContain("tok:—");
    expect(line).not.toMatch(/tok:(?:\s|\d)|tok#null|#0|\bnull\b/);
  }
});
