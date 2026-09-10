// packages/tui-chaos/test/fixture-stream.test.ts
// C1 focused regression: the fixture stream seam
// (apps/madbridge/src/fixture/harness.ts, makeStreamingFixtureSubscribe)
// must retain only a BOUNDED window of streamed entries while the synthetic
// queueDepth keeps representing total stream progression.
//
// Deterministic by construction: Bun fake timers drive the 40ms stream
// interval tick-by-tick — no real-time sleep. Retained-window bounding is
// observed externally (no production internals exported): once the retained
// window passes its cap, every further tick must discard exactly one oldest
// entry, observed via a scoped Array.prototype.shift spy that records the
// discarded entries' seqs. The previous unbounded implementation never
// discards, so this proof fails there and passes on the corrected one.
//
// TUI_ACCEPTANCE — NOT PHASE_0 — NOT OCCUPANCY_PROOF.

import { describe, expect, test, jest } from "bun:test";

import { makeStreamingFixtureSubscribe } from "../../../apps/madbridge/src/fixture/harness";
import type { BrokerSnapshot, LedgerEntryProjection } from "../../../apps/madbridge/src/tui/types";

const TICK_MS = 40; // the seam's stream interval

function emptyBase(): BrokerSnapshot {
  return {
    connected: true,
    sessionState: "active",
    ownershipState: "free",
    activeWriter: null,
    fencingToken: 3,
    task: null,
    executions: [],
    repositoryFingerprint: null,
    pendingApprovals: [],
    pendingTransfers: [],
    permissionSummary: {
      allowedReadPaths: [],
      allowedWritePaths: [],
      allowedCommandCategories: [],
      allowedEgressDestinations: [],
      dataClass: "fixture",
    },
    transferPhase: null,
    verificationStatus: null,
    reviewStatus: null,
    incident: null,
    eventLog: [],
    queueDepth: 0,
  };
}

/**
 * Run `ticks` stream ticks under fake timers while recording every
 * Array.prototype.shift call whose receiver looks like the retained streamed
 * window (entries carry a numeric `seq`). Scoped and restored in finally.
 */
function runTicksWithShiftSpy(
  subscribe: (listener: (s: BrokerSnapshot) => void) => () => void,
  ticks: number,
): { snapshots: BrokerSnapshot[]; discardedSeqs: number[]; unsub: () => void } {
  jest.useFakeTimers();
  const snapshots: BrokerSnapshot[] = [];
  const discardedSeqs: number[] = [];
  let unsub: () => void = () => {};
  const origShift = Array.prototype.shift;
  try {
    Array.prototype.shift = function (this: unknown[]) {
      const first = this[0] as { seq?: unknown } | undefined;
      if (first !== undefined && typeof first.seq === "number") {
        discardedSeqs.push(first.seq);
      }
      return origShift.call(this);
    };
    unsub = subscribe((s) => snapshots.push(s));
    jest.advanceTimersByTime(TICK_MS * ticks);
  } finally {
    Array.prototype.shift = origShift;
    jest.useRealTimers();
  }
  return { snapshots, discardedSeqs, unsub };
}

describe("C1: fixture stream retains a bounded window; queueDepth stays total", () => {
  test("after more than 60 emitted entries the projection stays <= 60, oldest roll out, newest present", () => {
    const { snapshots, discardedSeqs } = runTicksWithShiftSpy(
      makeStreamingFixtureSubscribe(emptyBase()),
      65,
    );
    // First emission is the synchronous base snapshot; then one per tick.
    expect(snapshots.length).toBe(66);
    expect(snapshots[0]!.eventLog.length).toBe(0);

    const last = snapshots[65]!;
    // Projected visible window never exceeds the intended 60.
    expect(last.eventLog.length).toBeLessThanOrEqual(60);
    expect(last.eventLog.length).toBe(60);
    // Newest expected sequence is present; oldest streamed entries rolled out.
    expect(last.eventLog[last.eventLog.length - 1]!.seq).toBe(65);
    expect(last.eventLog[0]!.seq).toBe(6);
    const seqs = last.eventLog.map((e) => e.seq);
    expect(seqs.includes(1)).toBe(false);
    expect(seqs.includes(5)).toBe(false);
    // Sequence remains strictly monotonic.
    for (let i = 1; i < seqs.length; i++) {
      expect(seqs[i]!).toBe(seqs[i - 1]! + 1);
    }
    // Retained window is bounded: ticks 61..65 each discarded exactly the
    // oldest retained entry (seq 1..5). The unbounded implementation never
    // discards — zero shift calls — so this assertion fails there.
    expect(discardedSeqs).toEqual([1, 2, 3, 4, 5]);
  });

  test("retained state does not grow with total emitted count; queueDepth keeps counting past the cap", () => {
    const { snapshots, discardedSeqs } = runTicksWithShiftSpy(
      makeStreamingFixtureSubscribe(emptyBase()),
      200,
    );
    const last = snapshots[200]!;
    // 200 entries emitted; window stayed at 60; exactly 140 oldest discarded.
    expect(last.eventLog.length).toBe(60);
    expect(discardedSeqs.length).toBe(140);
    expect(discardedSeqs[0]).toBe(1);
    expect(discardedSeqs[139]).toBe(140);
    // queueDepth continues to represent TOTAL stream progression (would be
    // capped at 60 if derived from the bounded array length — forbidden).
    expect(last.queueDepth).toBe(200);
    // queueDepth advanced monotonically 1:1 with ticks across the run.
    for (let i = 2; i <= 200; i++) {
      expect(snapshots[i]!.queueDepth).toBe(i);
    }
    // Window content at tick 200: exactly the newest 60 seqs.
    expect(last.eventLog[0]!.seq).toBe(141);
    expect(last.eventLog[59]!.seq).toBe(200);
  });

  test("stream types, actors, fencing, and hash generation are unchanged", () => {
    const { snapshots } = runTicksWithShiftSpy(
      makeStreamingFixtureSubscribe(emptyBase()),
      10,
    );
    const types = ["message", "message", "ownership_accept", "transfer-request", "interrupt"];
    const log = snapshots[10]!.eventLog as readonly LedgerEntryProjection[];
    expect(log.length).toBe(10);
    for (let i = 0; i < 10; i++) {
      const e = log[i]!;
      const seq = i + 1;
      expect(e.seq).toBe(seq);
      expect(e.type).toBe(types[seq % types.length]!);
      expect(e.actor).toBe(seq % 2 === 0 ? "exec-claude-code" : "exec-antigravity");
      expect(e.fencingToken).toBe(3);
      expect(e.hash).toBe(`h${seq.toString(16).padStart(12, "0")}`);
      expect(e.timestamp).toBe("2026-08-08T12:00:00Z");
    }
  });

  test("unsubscribe still clears the interval: no emissions afterwards", () => {
    jest.useFakeTimers();
    const snapshots: BrokerSnapshot[] = [];
    try {
      const unsub = makeStreamingFixtureSubscribe(emptyBase())((s) => snapshots.push(s));
      jest.advanceTimersByTime(TICK_MS * 5);
      expect(snapshots.length).toBe(6); // base + 5 ticks
      unsub();
      jest.advanceTimersByTime(TICK_MS * 50);
      // Interval cleared: no further emissions.
      expect(snapshots.length).toBe(6);
    } finally {
      jest.useRealTimers();
    }
  });

  test("seq continues from an existing base eventLog maximum", () => {
    const base = emptyBase();
    const withLog: BrokerSnapshot = {
      ...base,
      eventLog: [
        { seq: 7, type: "message", actor: "exec-claude-code", fencingToken: 3, hash: "h7", timestamp: "2026-08-08T12:00:00Z" },
      ],
      queueDepth: 7,
    };
    const { snapshots } = runTicksWithShiftSpy(makeStreamingFixtureSubscribe(withLog), 3);
    const last = snapshots[3]!;
    // Stream seq picks up after the base maximum (8, 9, 10), monotonic.
    expect(last.eventLog.map((e) => e.seq)).toEqual([7, 8, 9, 10]);
    expect(last.queueDepth).toBe(3); // synthetic emitted count for THIS subscription
  });
});

export {};
