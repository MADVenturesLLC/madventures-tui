// apps/madbridge/test/room-projection.test.tsx
// Room Runtime Phase 1 — projection and receipt honesty (capabilities F, K, L).
//
//   F  derived banners from canonical axes (r4 §7.6 Table 9 formulas);
//      hard gates precede any LIVE reading; slot failure ≠ Room death;
//      dead PTY never LIVE; RECONSTRUCTION never LIVE.
//   K  RoomStatusBand renders canonical facts + derived label + fixture
//      qualifier; the standing FixtureBanner text is unchanged.
//   L  @mad/claim-boundary READ-ONLY-CONSUME: receipts bind the FORCED
//      boundary; unknown rungs / rungs above the fixture ceiling / legacy
//      receipts without a boundary fail closed.

import { test, expect, describe } from "bun:test";
import { deriveRoomProjection, renderRoomBannerLine, type ViewerProjectionFacts } from "../src/tui/room/projection";
import { renderExecutionLine } from "../src/tui/components/RoomStatusBand";
import { FIXTURE_BANNER_TEXT, buildFixtureBanner } from "../src/tui/components/FixtureBanner";
import { bindRoomReceipt, validateStoredRoomReceipt, RoomReceiptError, FIXTURE_RUNG_CEILING } from "../src/tui/room/receipts";
import { forcedNotEvidenceOf, EXIT_CODE_0_MUST_NOT_PROVE } from "@mad/claim-boundary";
import type { RoomSnapshotBody, RoomReceiptRef } from "@madventures/protocol";

function snapshot(over: Partial<RoomSnapshotBody> = {}): RoomSnapshotBody {
  return {
    room_id: "r",
    occupancy: "OCCUPIED",
    block_reason: "NONE",
    input_authority: { kind: "HELD", viewerId: "viewer-1", inputEpoch: 1 },
    executions: [
      { execution_id: "slot-a", state: "RUNNING", cursors: { ptyOutputSeq: 5, ptyCheckpointSeq: 2, resizeEpoch: 0, durableCommittedSeq: 5 }, history_truncated: false },
      { execution_id: "slot-b", state: "RUNNING", cursors: { ptyOutputSeq: 1, ptyCheckpointSeq: 0, resizeEpoch: 0, durableCommittedSeq: 1 }, history_truncated: false },
    ],
    viewers: [{ viewer_id: "viewer-1", attachment: "ATTACHED", caps: "read+input" }],
    room_seq: 9,
    ...over,
  };
}

const attached: ViewerProjectionFacts = { attachment: "ATTACHED", caps: "read+input", hasGapOrTruncation: false, atLiveSeq: true };

describe("F — derived banners are functions of canonical facts (Table 9)", () => {
  test("LIVE only when occupied ∧ attached ∧ at live seq ∧ not reconstruction ∧ holds input", () => {
    expect(deriveRoomProjection(snapshot(), attached, "LIVE_REATTACH").banner).toBe("LIVE");
  });

  test("READ_ONLY when the viewer holds no input lease", () => {
    expect(deriveRoomProjection(snapshot(), { ...attached, caps: "read" }, "LIVE_REATTACH").banner).toBe("READ_ONLY");
  });

  test("LIVE_UNATTENDED when occupancy is running and input is UNOWNED", () => {
    expect(deriveRoomProjection(snapshot({ input_authority: { kind: "UNOWNED" } }), attached, "LIVE_REATTACH").banner).toBe("LIVE_UNATTENDED");
  });

  test("LIVE_WITH_HISTORY_GAP when a Gap or history_truncated is held — never painted complete", () => {
    expect(deriveRoomProjection(snapshot(), { ...attached, hasGapOrTruncation: true }, "LIVE_REATTACH").banner).toBe("LIVE_WITH_HISTORY_GAP");
  });

  test("DETACHED means THIS viewer is detached while occupancy stays OCCUPIED (occupancy is not down)", () => {
    const p = deriveRoomProjection(snapshot(), { ...attached, attachment: "DETACHED" }, null);
    expect(p.banner).toBe("DETACHED");
    expect(p.occupancy).toBe("OCCUPIED");
  });

  test("RECONSTRUCTED for RecoveryKind=RECONSTRUCTION even when everything else looks live — never LIVE for a dead PTY", () => {
    expect(deriveRoomProjection(snapshot(), attached, "RECONSTRUCTION").banner).toBe("RECONSTRUCTED");
  });

  test("a dead PTY (EXITED/FAILED_CLOSED slot) can never derive LIVE", () => {
    const dead = snapshot({
      executions: [
        { execution_id: "slot-a", state: "FAILED_CLOSED", cursors: { ptyOutputSeq: 5, ptyCheckpointSeq: 2, resizeEpoch: 0, durableCommittedSeq: 5 }, history_truncated: false },
        { execution_id: "slot-b", state: "RUNNING", cursors: { ptyOutputSeq: 1, ptyCheckpointSeq: 0, resizeEpoch: 0, durableCommittedSeq: 1 }, history_truncated: false },
      ],
    });
    const p = deriveRoomProjection(dead, attached, "LIVE_REATTACH");
    expect(p.banner).not.toBe("LIVE");
    // Slot-local failure is NOT Room death: occupancy axis is untouched.
    expect(p.occupancy).toBe("OCCUPIED");
    expect(p.executions.find((e) => e.execution_id === "slot-a")!.state).toBe("FAILED_CLOSED");
  });

  test("hard gates take precedence: WAITING_FOUNDER / BLOCKED / INTERRUPTED / CLOSED / ABSENT", () => {
    expect(deriveRoomProjection(snapshot({ block_reason: "WAITING_FOUNDER" }), attached, "LIVE_REATTACH").banner).toBe("WAITING_FOUNDER");
    expect(deriveRoomProjection(snapshot({ block_reason: "DISK" }), attached, "LIVE_REATTACH").banner).toBe("BLOCKED");
    expect(deriveRoomProjection(snapshot({ occupancy: "INTERRUPTED" }), attached, "LIVE_REATTACH").banner).toBe("INTERRUPTED");
    expect(deriveRoomProjection(snapshot({ occupancy: "CLOSED" }), attached, "LIVE_REATTACH").banner).toBe("CLOSED");
    expect(deriveRoomProjection(snapshot({ occupancy: "ABSENT" }), attached, null).banner).toBe("ABSENT");
  });

  test("REPLAYING while the viewer is catching up (not at live seq)", () => {
    expect(deriveRoomProjection(snapshot(), { ...attached, atLiveSeq: false }, "HISTORY_REPLAY").banner).toBe("REPLAYING");
  });

  test("the projection restates canonical axes unchanged and carries the fixture qualifier", () => {
    const p = deriveRoomProjection(snapshot(), attached, "LIVE_REATTACH");
    expect(p.inputAuthority).toEqual({ kind: "HELD", viewerId: "viewer-1", inputEpoch: 1 });
    expect(p.fixtureOccupancyOnly).toBe(true);
  });
});

describe("K — RoomStatusBand rendering and the standing FixtureBanner", () => {
  test("the banner line names the derived label, the canonical axes, and FIXTURE OCCUPANCY ONLY", () => {
    const line = renderRoomBannerLine(deriveRoomProjection(snapshot(), attached, "LIVE_REATTACH"), 120);
    expect(line).toContain("ROOM LIVE");
    expect(line).toContain("occupancy=OCCUPIED");
    expect(line).toContain("input=HELD");
    expect(line).toContain("FIXTURE OCCUPANCY ONLY");
    expect(line.length).toBe(120);
  });

  test("execution rows render slot-local truth; owner-ring truncation is labeled as owner-ring", () => {
    expect(renderExecutionLine("slot-a", "FAILED_CLOSED", false, 80)).toContain("slot-a: FAILED_CLOSED");
    expect(renderExecutionLine("slot-b", "RUNNING", true, 80)).toContain("history=TRUNCATED(owner-ring)");
  });

  test("the existing FixtureBanner truth text is unchanged", () => {
    expect(FIXTURE_BANNER_TEXT).toBe("FIXTURE DATA — NOT A LIVE SESSION");
    expect(buildFixtureBanner(40)).toBe("FIXTURE DATA — NOT A LIVE SESSION".padEnd(40));
  });
});

describe("L — receipts consume @mad/claim-boundary read-only and fail closed", () => {
  const ref = (rung: string, kind = "occupancy-prepared"): RoomReceiptRef => ({
    op: "ReceiptRef",
    receipt_id: "receipt-1",
    kind,
    rung: rung as RoomReceiptRef["rung"],
    room_seq: 3,
    facts: { fixture: true },
  });

  test("the boundary is FORCED by the rung from the library, never hand-written", () => {
    const bound = bindRoomReceipt(ref("prepared"));
    expect(bound.claim_boundary.rung).toBe("prepared");
    expect(bound.claim_boundary.not_evidence_of).toEqual(forcedNotEvidenceOf("prepared"));
    expect(bound.fixture_occupancy_only).toBe(true);
  });

  test("an executed fixture receipt still declares it is not evidence of verification/review/ci/merge", () => {
    const bound = bindRoomReceipt(ref("executed", "execution-exited"));
    for (const claim of EXIT_CODE_0_MUST_NOT_PROVE) {
      expect(bound.claim_boundary.not_evidence_of).toContain(claim);
    }
  });

  test("a rung above the fixture ceiling is refused — no evidence promotion", () => {
    expect(FIXTURE_RUNG_CEILING).toBe("executed");
    for (const rung of ["attested", "verified", "reviewed", "ci", "merged"]) {
      expect(() => bindRoomReceipt(ref(rung))).toThrow(RoomReceiptError);
      try {
        bindRoomReceipt(ref(rung));
      } catch (err) {
        expect((err as RoomReceiptError).code).toBe("RUNG_ABOVE_FIXTURE_CEILING");
      }
    }
  });

  test("an unknown rung is refused; the TUI invents no boundary", () => {
    expect(() => bindRoomReceipt(ref("done"))).toThrow(RoomReceiptError);
  });

  test("legacy/stored receipts without a boundary fail closed; a valid stored receipt passes", () => {
    expect(validateStoredRoomReceipt({ rung: "prepared", receipt_id: "x" })).toContain("claim_boundary missing — legacy receipt without a boundary fails closed");
    const good = bindRoomReceipt(ref("prepared"));
    expect(validateStoredRoomReceipt(good)).toEqual([]);
    const tampered = { ...good, claim_boundary: { rung: "prepared", not_evidence_of: ["merge"] } };
    expect(validateStoredRoomReceipt(tampered).some((p) => p.startsWith("INCOMPLETE_NOT_EVIDENCE_OF"))).toBe(true);
  });
});
