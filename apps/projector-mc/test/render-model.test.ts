// apps/projector-mc/test/render-model.test.ts
// Pins the projector's honesty contract. The named regression: the render
// model must flag (and the UI must never silently render) a positive verdict
// riding on non-VALID memory.

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, test } from "bun:test";

import { FixtureMemoryStore, sealFixture, type StoredEntry } from "@mad/build-memory";
import { assertDisplayable, makeVerdict, type EvidenceLink, type VerdictRecord } from "@mad/single-verdict";

import { loadProjectorDemo } from "../src/lib/fixture";
import {
  buildSubjectViews,
  filterSubjects,
  gateBreachFor,
  nextFilter,
  type DemoRoom,
} from "../src/lib/render-model";

const AT = "2026-09-12T12:00:00.000Z";
const HEAD = "a1".repeat(20);
const MOVED = "b2".repeat(20);
const REF_SHA = "c3".repeat(32);

const demoRaw: unknown = JSON.parse(readFileSync(join(import.meta.dir, "../fixtures/demo.json"), "utf8"));

describe("committed demo fixture", () => {
  const model = loadProjectorDemo(demoRaw);

  test("loads through the seal and assertDisplayable", () => {
    expect(model.subjects.length).toBe(6);
    expect(model.seal).toMatch(/^[0-9a-f]{64}$/);
  });

  test("covers the status spectrum: VALID, STALE, UNKNOWN, INVALIDATED", () => {
    const status = Object.fromEntries(model.subjects.map((s) => [s.subject, s.memory.status]));
    expect(status["@madventures/ledger"]).toBe("VALID");
    expect(status["@madventures/broker"]).toBe("STALE");
    expect(status["@mad/claim-boundary"]).toBe("VALID");
    expect(status["@mad/build-memory"]).toBe("INVALIDATED");
    expect(status["@mad/single-verdict"]).toBe("UNKNOWN");
    expect(status["apps/projector-mc"]).toBe("VALID");
  });

  test("renders the expected verdict classes", () => {
    const verdicts = Object.fromEntries(model.subjects.map((s) => [s.subject, s.verdict?.verdict ?? null]));
    expect(verdicts["@madventures/ledger"]).toBe("VERIFY_PASS");
    expect(verdicts["@madventures/broker"]).toBe("STALE_EVIDENCE");
    expect(verdicts["@mad/claim-boundary"]).toBe("SHIP");
    expect(verdicts["@mad/build-memory"]).toBe("HOLD");
    expect(verdicts["@mad/single-verdict"]).toBe("SPEC_ONLY");
    expect(verdicts["apps/projector-mc"]).toBe("VERIFY_FAIL");
  });

  test("REGRESSION: no positive verdict rides on non-VALID memory", () => {
    for (const view of model.subjects) {
      expect({ subject: view.subject, gateBreach: view.gateBreach }).toEqual({ subject: view.subject, gateBreach: false });
    }
  });

  test("filtering works and the filter cycle is closed", () => {
    expect(filterSubjects(model.subjects, "SHIP").map((s) => s.subject)).toEqual(["@mad/claim-boundary"]);
    expect(filterSubjects(model.subjects, "ALL").length).toBe(6);
    expect(filterSubjects(model.subjects, "BLOCKED")).toEqual([]);
    expect(nextFilter("SPEC_ONLY")).toBe("ALL");
  });

  test("tampering with the fixture fails the seal at load", () => {
    const tampered = JSON.parse(JSON.stringify(demoRaw)) as Record<string, unknown>;
    const fixture = tampered["memory_fixture"] as { records: Record<string, { record: { head_sha: string } }> };
    fixture.records["@mad/claim-boundary"]!.record.head_sha = MOVED; // hand-edit to "still green"
    expect(() => loadProjectorDemo(tampered)).toThrow(/seal mismatch/);
  });
});

// ─── gateBreachFor: the defense-in-depth check ──────────────────────────────

function shipVerdict(): VerdictRecord {
  const link: EvidenceLink = { ref: { path: "docs/verification/demo.json", sha256: REF_SHA, kind: "argus_packet" } };
  return makeVerdict({
    verdict: "SHIP",
    subject: { name: "demo/subject", sha: HEAD },
    reason_code: "EVIDENCE_FRESH",
    produced_by: "builder:test",
    produced_at: AT,
    evidence_refs: [link],
    memory: { subject: "demo/subject", status: "VALID" },
  });
}

describe("gateBreachFor", () => {
  const ship = shipVerdict();
  const stale = { subject: "demo/subject", status: "STALE", reason_code: "SHA_MISMATCH" } as const;
  const valid = { subject: "demo/subject", status: "VALID", reason_code: "SHA_MATCH" } as const;

  test("fires when a SHIP verdict would show on STALE memory", () => {
    expect(gateBreachFor(ship, stale)).toBe(true);
  });

  test("stays quiet when memory is VALID", () => {
    expect(gateBreachFor(ship, valid)).toBe(false);
  });

  test("negative verdicts never breach, even on STALE memory", () => {
    const hold = makeVerdict({
      verdict: "HOLD",
      subject: { name: "demo/subject", sha: HEAD },
      reason_code: "FOUNDER_HOLD",
      produced_by: "builder:test",
      produced_at: AT,
      evidence_refs: [{ ref: { path: "docs/verification/demo.json", sha256: REF_SHA, kind: "log" } }],
    });
    expect(gateBreachFor(hold, stale)).toBe(false);
  });

  test("buildSubjectViews marks the breach — the UI cannot hide it", () => {
    const store = FixtureMemoryStore.load(
      sealFixture({
        "demo/subject": {
          record: {
            subject: "demo/subject",
            head_sha: HEAD,
            verified_at: AT,
            evidence_refs: [{ path: "docs/verification/demo.json", sha256: REF_SHA, kind: "log" }],
          },
        } satisfies StoredEntry,
      }),
    );
    const rooms: DemoRoom[] = [{ id: "r", label: "Room", subjects: ["demo/subject"] }];
    const { subjects } = buildSubjectViews(store, { "demo/subject": { head_sha: MOVED } }, { "demo/subject": ship }, rooms);
    expect(subjects[0]?.gateBreach).toBe(true);
    expect(subjects[0]?.memory.status).toBe("STALE");
  });
});

describe("fixture hygiene", () => {
  test("every verdict in the demo parses through assertDisplayable", () => {
    const raw = demoRaw as { verdicts: Record<string, unknown> };
    for (const [subject, value] of Object.entries(raw.verdicts)) {
      expect(() => assertDisplayable(value)).not.toThrow();
      expect(assertDisplayable(value).subject.name).toBe(subject);
    }
  });

  test("claim-boundary gates are present where verdicts assert claims", () => {
    const raw = demoRaw as { verdicts: Record<string, { evidence_refs: Array<{ boundary?: { rung: string } }> }> };
    expect(raw.verdicts["@mad/claim-boundary"]!.evidence_refs[0]!.boundary?.rung).toBe("merged");
    expect(raw.verdicts["@madventures/ledger"]!.evidence_refs[0]!.boundary?.rung).toBe("verified");
  });
});
