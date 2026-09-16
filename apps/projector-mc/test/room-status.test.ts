// apps/projector-mc/test/room-status.test.ts
// Lane 3 pins: the vendored RoomStatus vocabulary matches its drift pin, the
// parser rejects non-members, the render model never paints success on an
// illegal completed, and the replay fixture covers the honest state spectrum
// (including one deliberately illegal record that must downgrade + fault).

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, test } from "bun:test";

import {
  AGENT_PHASES,
  EVIDENCE_REF_KINDS,
  PHASE_TONE,
  ROOM_BLOCK_REASONS,
  ROOM_OCCUPANCY,
  ROOM_STATUS_IR_VERSIONS,
  parseRoomStatus,
  renderRoomStatus,
  shortEvidenceRef,
  type EvidenceRef,
  type RoomStatus,
} from "../src/lib/room-status";
import { loadRoomStatusFixture } from "../src/lib/room-status-fixture";

const PIN = JSON.parse(
  readFileSync(join(import.meta.dir, "../fixtures/room-status-vocabulary.pin.json"), "utf8"),
) as Record<string, unknown>;
const FIXTURE = JSON.parse(
  readFileSync(join(import.meta.dir, "../fixtures/room-status-fixture.json"), "utf8"),
) as unknown;

const SHA_REF: EvidenceRef = { kind: "sha", ref: "0123456789abcdef0123456789abcdef01234567" };

function baseStatus(overrides?: Partial<RoomStatus>): RoomStatus {
  return parseRoomStatus({
    irVersion: 1,
    roomId: "fixture-room-test",
    occupancy: "occupied",
    agentPhase: "idle",
    evidenceRefs: [],
    observedSeq: 1,
    ...overrides,
  });
}

describe("vendored vocabulary matches the Lane 1 drift pin", () => {
  test("closed sets are byte-equal to the pin captured at Lane 1 head", () => {
    expect(ROOM_STATUS_IR_VERSIONS).toEqual(PIN["ROOM_STATUS_IR_VERSIONS"] as typeof ROOM_STATUS_IR_VERSIONS);
    expect(ROOM_OCCUPANCY).toEqual(PIN["ROOM_OCCUPANCY"] as typeof ROOM_OCCUPANCY);
    expect(AGENT_PHASES).toEqual(PIN["AGENT_PHASES"] as typeof AGENT_PHASES);
    expect(ROOM_BLOCK_REASONS).toEqual(PIN["ROOM_BLOCK_REASONS"] as typeof ROOM_BLOCK_REASONS);
    expect(EVIDENCE_REF_KINDS).toEqual(PIN["EVIDENCE_REF_KINDS"] as typeof EVIDENCE_REF_KINDS);
  });

  test("the pin names its provenance and fixture-only mode", () => {
    const provenance = PIN["provenance"] as Record<string, string>;
    expect(provenance["source_branch"]).toBe("build/room-status-ir-v0");
    expect(provenance["source_head"]).toMatch(/^[0-9a-f]{40}$/);
    expect(provenance["mode"]).toBe("fixture-only vendored mirror; live IR bind is FOUNDER_DECISION_REQUIRED");
  });
});

describe("parseRoomStatus rejects what the IR does not know", () => {
  test("unknown enum members are refused, never coerced", () => {
    expect(() => parseRoomStatus({ irVersion: 1, roomId: "r", occupancy: "haunted", agentPhase: "idle", evidenceRefs: [], observedSeq: 0 })).toThrow(/occupancy_enum/);
    expect(() => parseRoomStatus({ irVersion: 1, roomId: "r", occupancy: "occupied", agentPhase: "dreaming", evidenceRefs: [], observedSeq: 0 })).toThrow(/agent_phase_enum/);
    expect(() => parseRoomStatus({ irVersion: 2, roomId: "r", occupancy: "occupied", agentPhase: "idle", evidenceRefs: [], observedSeq: 0 })).toThrow(/ir_version/);
    expect(() =>
      parseRoomStatus({ irVersion: 1, roomId: "r", occupancy: "occupied", agentPhase: "idle", evidenceRefs: [{ kind: "rumor", ref: "x" }], observedSeq: 0 }),
    ).toThrow(/evidence_ref_kind/);
  });

  test("block_reason only rides on blocked (room and slot level)", () => {
    expect(() => parseRoomStatus({ ...JSON.parse(JSON.stringify(baseStatus())), agentPhase: "failed", blockReason: "human_hold" })).toThrow(/block_reason_requires_blocked/);
    expect(() =>
      parseRoomStatus({
        irVersion: 1,
        roomId: "r",
        occupancy: "occupied",
        agentPhase: "running",
        slotPhases: [{ slotId: "s", phase: "running", blockReason: "policy_deny" }],
        evidenceRefs: [],
        observedSeq: 0,
      }),
    ).toThrow(/block_reason_requires_blocked/);
  });

  test("a closed room cannot claim an active phase", () => {
    expect(() => parseRoomStatus({ ...JSON.parse(JSON.stringify(baseStatus())), occupancy: "closed", agentPhase: "running" })).toThrow(/closed_not_active/);
  });
});

describe("renderRoomStatus — the no-fake-green contract", () => {
  test("legal completed (evidence present) is the ONLY emerald and raises no fault", () => {
    const view = renderRoomStatus(baseStatus({ agentPhase: "completed", evidenceRefs: [SHA_REF] }));
    expect(view.displayedPhase).toBe("completed");
    expect(view.tone).toBe("emerald");
    expect(view.fault).toBeNull();
  });

  test("REGRESSION: illegal completed downgrades to verifying + fault — never success", () => {
    const view = renderRoomStatus(baseStatus({ agentPhase: "completed" }));
    expect(view.displayedPhase).toBe("verifying");
    expect(view.tone).toBe("amber");
    expect(view.fault?.code).toBe("completed_without_evidence");
    expect(view.tone).not.toBe("emerald");
  });

  test("a slot-level completed without room evidence also faults", () => {
    const view = renderRoomStatus(
      baseStatus({ agentPhase: "running", slotPhases: [{ slotId: "slot-a", phase: "completed" }] }),
    );
    expect(view.fault?.code).toBe("slot_completed_without_evidence");
    expect(view.displayedPhase).toBe("verifying");
  });

  test("every phase maps to a tone and only completed maps emerald", () => {
    const emeraldPhases = AGENT_PHASES.filter((phase) => PHASE_TONE[phase] === "emerald");
    expect(emeraldPhases).toEqual(["completed"]);
  });

  test("unknown, verifying, and blocked read distinctly from completed", () => {
    expect(PHASE_TONE["unknown"]).toBe("zinc");
    expect(PHASE_TONE["verifying"]).toBe("amber");
    expect(PHASE_TONE["blocked"]).toBe("rose");
    expect(PHASE_TONE["completed"]).toBe("emerald");
  });

  test("block_reason is surfaced only when the phase is blocked", () => {
    const blocked = renderRoomStatus(baseStatus({ agentPhase: "blocked", blockReason: "completion_gap" }));
    expect(blocked.blockReason).toBe("completion_gap");
    const failed = renderRoomStatus(baseStatus({ agentPhase: "failed" }));
    expect(failed.blockReason).toBeNull();
  });

  test("shortEvidenceRef truncates SHAs and keeps paths whole", () => {
    expect(shortEvidenceRef(SHA_REF)).toBe("0123456789");
    expect(shortEvidenceRef({ kind: "path", ref: "docs/x.md" })).toBe("docs/x.md");
  });
});

describe("replay fixture (mad.roomstatus-fixture/v0)", () => {
  const { scenarios, mode } = loadRoomStatusFixture(FIXTURE);

  test("loads fixture-only and covers the honest state spectrum", () => {
    expect(mode).toBe("fixture-only");
    const names = scenarios.map((s) => s.name);
    expect(names).toContain("running");
    expect(names).toContain("blocked-completion-gap");
    expect(names).toContain("verifying-exited");
    expect(names).toContain("completed-evidenced");
    expect(names).toContain("completed-no-evidence-FAULT");
    expect(names.length).toBeGreaterThanOrEqual(8);
  });

  test("every scenario stays synthetic — fixture-prefixed rooms only", () => {
    for (const scenario of scenarios) {
      expect(scenario.status.roomId.startsWith("fixture-")).toBe(true);
    }
  });

  test("the blocked scenario shows its code and evidence chips", () => {
    const blocked = scenarios.find((s) => s.name === "blocked-completion-gap");
    expect(blocked?.view.blockReason).toBe("completion_gap");
    expect(blocked?.view.evidenceRefs.length).toBeGreaterThanOrEqual(2);
  });

  test("REGRESSION: the illegal scenario downgrades to verifying + fault, never emerald", () => {
    const illegal = scenarios.find((s) => s.name === "completed-no-evidence-FAULT");
    expect(illegal).toBeDefined();
    expect(illegal?.view.displayedPhase).toBe("verifying");
    expect(illegal?.view.fault?.code).toBe("completed_without_evidence");
    expect(illegal?.view.tone).not.toBe("emerald");
  });

  test("the legal completed scenario is the only emerald in the deck", () => {
    const emerald = scenarios.filter((s) => s.view.tone === "emerald");
    expect(emerald.map((s) => s.name)).toEqual(["completed-evidenced"]);
  });

  test("tampering the schema fails the load", () => {
    const tampered = JSON.parse(JSON.stringify(FIXTURE)) as Record<string, unknown>;
    tampered["schema"] = "mad.roomstatus-fixture/v9";
    expect(() => loadRoomStatusFixture(tampered)).toThrow(/expected mad.roomstatus-fixture\/v0/);
  });

  test("a production-looking roomId is refused at load", () => {
    const tampered = JSON.parse(JSON.stringify(FIXTURE)) as { scenarios: Array<{ status: { roomId: string } }> };
    tampered.scenarios[0]!.status.roomId = "room-alpha";
    expect(() => loadRoomStatusFixture(tampered)).toThrow(/non-fixture roomId/);
  });
});
