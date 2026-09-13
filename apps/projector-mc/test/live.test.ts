// apps/projector-mc/test/live.test.ts
// Pins the live-bind honesty contract: statuses are displayed verbatim from
// the build-memory-computed snapshot; verdicts must be displayable and bound
// to the current head; a positive verdict on non-VALID memory can only ever
// render as GATE_BREACH; an empty snapshot is an honest empty state.

import { describe, expect, test } from "bun:test";

import { makeVerdict, VerdictRefusal, type VerdictRecord } from "@mad/single-verdict";
import { makeClaimBoundary } from "@mad/claim-boundary";

import { buildLiveModel, liveStateIsEmpty, LIVE_STATE_SCHEMA, parseLiveState } from "../src/lib/live";

const HEAD = "a1".repeat(20);
const MOVED = "b2".repeat(20);
const REF_SHA = "c3".repeat(32);

function snapshot(overrides?: Record<string, unknown>): Record<string, unknown> {
  return {
    schema: LIVE_STATE_SCHEMA,
    generated_at: "2026-09-13T12:00:00.000Z",
    store_path: ".mad/build-memory.json",
    store_present: true,
    head_sha: HEAD,
    subjects: [
      { subject: "@mad/build-memory", status: "VALID", reason_code: "SHA_MATCH", current_head_sha: HEAD },
      { subject: "@mad/single-verdict", status: "STALE", reason_code: "SHA_MISMATCH", recorded_head_sha: MOVED, current_head_sha: HEAD },
      { subject: "apps/projector-mc", status: "UNKNOWN", reason_code: "RECORD_MISSING", current_head_sha: HEAD },
    ],
    verdicts: {},
    ...overrides,
  };
}

function shipAtHead(subject: string): VerdictRecord {
  return makeVerdict({
    verdict: "SHIP",
    subject: { name: subject, sha: HEAD },
    reason_code: "EVIDENCE_FRESH",
    produced_by: "argus:bind-demo",
    evidence_refs: [{ ref: { path: "docs/verification/argus-packet.md", sha256: REF_SHA, kind: "argus_packet" }, boundary: makeClaimBoundary("merged") }],
    memory: { subject, status: "VALID" },
  });
}

describe("parseLiveState", () => {
  test("accepts a valid snapshot", () => {
    const snap = parseLiveState(snapshot());
    expect(snap.head_sha).toBe(HEAD);
    expect(snap.subjects.length).toBe(3);
  });

  test("rejects a foreign schema, bad statuses, and a missing head — fail closed", () => {
    expect(() => parseLiveState({ ...snapshot(), schema: "something.else/v9" })).toThrow(/schema/);
    const badStatus = snapshot() as { subjects: Array<Record<string, unknown>> };
    badStatus.subjects[1]!["status"] = "GREEN";
    expect(() => parseLiveState(badStatus)).toThrow(/closed set/);
    expect(() => parseLiveState({ ...snapshot(), head_sha: "nope" })).toThrow(/40-hex/);
  });
});

describe("buildLiveModel", () => {
  test("statuses are verbatim from the snapshot; counts computed", () => {
    const model = buildLiveModel(parseLiveState(snapshot()));
    expect(model.rooms.length).toBe(1);
    expect(model.rooms[0]?.label).toBe("Projector Spine");
    const status = Object.fromEntries(model.subjects.map((s) => [s.subject, s.memory.status]));
    expect(status["@mad/build-memory"]).toBe("VALID");
    expect(status["@mad/single-verdict"]).toBe("STALE");
    expect(status["apps/projector-mc"]).toBe("UNKNOWN");
    expect(model.counts).toEqual({ VALID: 1, STALE: 1, UNKNOWN: 1, INVALIDATED: 0 });
  });

  test("verdicts bound to the current head display; verdicts bound to an older head do not", () => {
    const ship = JSON.parse(JSON.stringify(shipAtHead("@mad/build-memory"))) as unknown;
    const staleHeadShip = JSON.parse(JSON.stringify(shipAtHead("@mad/single-verdict")), (key, value) =>
      key === "sha" && value === HEAD ? MOVED : value,
    ) as unknown;
    const model = buildLiveModel(parseLiveState(snapshot({ verdicts: { "@mad/build-memory": ship, "@mad/single-verdict": staleHeadShip } })));
    const byName = new Map(model.subjects.map((s) => [s.subject, s]));
    expect(byName.get("@mad/build-memory")?.verdict?.verdict).toBe("SHIP");
    expect(byName.get("@mad/single-verdict")?.verdict).toBeNull();
  });

  test("REGRESSION: a SHIP record on STALE memory renders as GATE_BREACH, never clean SHIP", () => {
    // Contrived store state: the verdicts file carries a SHIP bound to the
    // current head while the memory row is STALE. The model must flag the
    // breach; the UI renders the GATE_BREACH chip instead of a clean SHIP.
    const ship = JSON.parse(JSON.stringify(shipAtHead("@mad/single-verdict"))) as unknown;
    const model = buildLiveModel(parseLiveState(snapshot({ verdicts: { "@mad/single-verdict": ship } })));
    const view = model.subjects.find((s) => s.subject === "@mad/single-verdict");
    expect(view?.verdict?.verdict).toBe("SHIP");
    expect(view?.gateBreach).toBe(true);
  });

  test("REGRESSION (factory gate): makeVerdict refuses positive verdicts on STALE memory", () => {
    expect(() =>
      makeVerdict({
        verdict: "SHIP",
        subject: { name: "@mad/single-verdict", sha: HEAD },
        reason_code: "EVIDENCE_FRESH",
        produced_by: "argus:bind-demo",
        evidence_refs: [{ ref: { path: "docs/verification/argus-packet.md", sha256: REF_SHA, kind: "argus_packet" }, boundary: makeClaimBoundary("merged") }],
        memory: { subject: "@mad/single-verdict", status: "STALE" },
      }),
    ).toThrow(VerdictRefusal);
  });

  test("a non-displayable verdict fails the load — error state, not a guess", () => {
    const bad = snapshot({ verdicts: { "@mad/build-memory": { verdict: "SHIP", subject: { name: "@mad/build-memory", sha: HEAD } } } });
    expect(() => buildLiveModel(parseLiveState(bad))).toThrow();
  });
});

describe("liveStateIsEmpty", () => {
  test("an absent store or an empty subject list is empty", () => {
    expect(liveStateIsEmpty(parseLiveState(snapshot({ store_present: false, subjects: [] })))).toBe(true);
    expect(liveStateIsEmpty(parseLiveState(snapshot({ subjects: [] })))).toBe(true);
    expect(liveStateIsEmpty(parseLiveState(snapshot()))).toBe(false);
  });
});
