// apps/projector-mc/src/lib/fixture.ts
// Fixture loading — the only data path into the projector. The sealed memory
// fixture is verified (any edit after sealing fails the load) and every
// verdict is passed through assertDisplayable. A fixture that cannot prove
// itself produces an intentional error state, never a rendered guess.

import { FixtureMemoryStore } from "@mad/build-memory";
import { assertDisplayable, type VerdictRecord } from "@mad/single-verdict";

import {
  buildSubjectViews,
  type DemoRoom,
  type ProjectorDemoFixture,
  type ProjectorModel,
} from "./render-model";

export const DEMO_SCHEMA = "mad.projector-demo/v0";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Parse + verify a demo fixture, or throw with an operator-actionable message. */
export function loadProjectorDemo(raw: unknown): ProjectorModel {
  if (!isRecord(raw)) throw new Error("demo fixture is not an object");
  if (raw["schema"] !== DEMO_SCHEMA) {
    throw new Error(`demo fixture schema is ${JSON.stringify(raw["schema"])} — expected ${DEMO_SCHEMA}`);
  }
  if (typeof raw["generated_at"] !== "string" || typeof raw["note"] !== "string") {
    throw new Error("demo fixture is missing generated_at or note");
  }

  const store = FixtureMemoryStore.load(raw["memory_fixture"]);

  const verdictsRaw = raw["verdicts"];
  if (!isRecord(verdictsRaw)) throw new Error("demo fixture has no verdicts object");
  const verdicts: Record<string, VerdictRecord> = {};
  for (const [subject, value] of Object.entries(verdictsRaw)) {
    verdicts[subject] = assertDisplayable(value);
  }

  const roomsRaw = raw["rooms"];
  if (!Array.isArray(roomsRaw)) throw new Error("demo fixture has no rooms array");
  const rooms: DemoRoom[] = roomsRaw.map((r) => {
    if (!isRecord(r) || typeof r["id"] !== "string" || typeof r["label"] !== "string" || !Array.isArray(r["subjects"])) {
      throw new Error("demo fixture room must be { id, label, subjects[] }");
    }
    return { id: r["id"], label: r["label"], subjects: r["subjects"].filter((s): s is string => typeof s === "string") };
  });

  const currentRaw = raw["current"];
  if (!isRecord(currentRaw)) throw new Error("demo fixture has no current object");
  const current: Record<string, { head_sha: string; index_tree?: string }> = {};
  for (const [subject, value] of Object.entries(currentRaw)) {
    if (!isRecord(value) || typeof value["head_sha"] !== "string") throw new Error(`demo fixture current state for ${subject} is invalid`);
    const tree = value["index_tree"];
    current[subject] = typeof tree === "string" ? { head_sha: value["head_sha"], index_tree: tree } : { head_sha: value["head_sha"] };
  }

  const { subjects: views, rooms: roomViews } = buildSubjectViews(store, current, verdicts, rooms);

  const counts = { VALID: 0, STALE: 0, UNKNOWN: 0, INVALIDATED: 0 };
  for (const v of views) counts[v.memory.status] += 1;

  return {
    rooms: roomViews,
    subjects: views,
    seal: store.seal,
    generatedAt: raw["generated_at"],
    note: raw["note"],
    counts,
  };
}
