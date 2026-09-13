// apps/projector-mc/src/lib/live.ts
// Live-bind data path. The browser cannot read the fs-backed memory store
// (@mad/build-memory/node is node-only), so a local script
// (scripts/bind-live.ts) computes statuses with the REAL build-memory CLI
// and writes a snapshot into public/live-state.json. This module loads that
// snapshot fail-closed:
//   - statuses are displayed VERBATIM (computed by build-memory at
//     generation time; the snapshot is stamped generated_at — it is a view
//     of the store at bind time, never a live recompute),
//   - every verdict passes assertDisplayable again here,
//   - a verdict is displayed only when its subject.sha equals the snapshot's
//     head_sha (a verdict bound to an older head is stale evidence and does
//     not render as current),
//   - gateBreachFor still runs: a positive verdict on non-VALID memory
//     renders as GATE_BREACH, never as a clean SHIP.
// An absent or empty snapshot is an honest empty state, not a fake row.

import {
  isValidHeadSha,
  MEMORY_REASON_CODES,
  MEMORY_STATUSES,
  type MemoryReasonCode,
  type MemoryStatus,
} from "@mad/build-memory";
import { assertDisplayable, type VerdictRecord } from "@mad/single-verdict";

import {
  gateBreachFor,
  type ProjectorModel,
  type SubjectView,
} from "./render-model";

export const LIVE_STATE_SCHEMA = "mad.projector-live-state/v0";

export type LiveSubjectStatus = {
  subject: string;
  status: MemoryStatus;
  reason_code: MemoryReasonCode;
  recorded_head_sha?: string;
  current_head_sha?: string;
};

export type LiveStateSnapshot = {
  schema: string;
  generated_at: string;
  store_path: string;
  store_present: boolean;
  head_sha: string;
  subjects: LiveSubjectStatus[];
  verdicts: Record<string, unknown>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Parse + validate the snapshot. Throws with an operator-actionable message. */
export function parseLiveState(raw: unknown): LiveStateSnapshot {
  if (!isRecord(raw)) throw new Error("live state is not an object");
  if (raw["schema"] !== LIVE_STATE_SCHEMA) {
    throw new Error(`live state schema is ${JSON.stringify(raw["schema"])} — expected ${LIVE_STATE_SCHEMA}`);
  }
  if (typeof raw["generated_at"] !== "string" || raw["generated_at"].length === 0) {
    throw new Error("live state is missing generated_at");
  }
  if (typeof raw["store_path"] !== "string" || raw["store_path"].length === 0) {
    throw new Error("live state is missing store_path");
  }
  if (typeof raw["store_present"] !== "boolean") {
    throw new Error("live state is missing store_present");
  }
  const head = raw["head_sha"];
  if (typeof head !== "string" || !isValidHeadSha(head)) {
    throw new Error("live state head_sha is not a 40-hex sha");
  }
  const subjectsRaw = raw["subjects"];
  if (!Array.isArray(subjectsRaw)) throw new Error("live state has no subjects array");
  const subjects: LiveSubjectStatus[] = subjectsRaw.map((entry) => {
    if (!isRecord(entry) || typeof entry["subject"] !== "string" || entry["subject"].length === 0) {
      throw new Error("live state subject row must be an object with a subject name");
    }
    const status = entry["status"];
    if (typeof status !== "string" || !(MEMORY_STATUSES as readonly string[]).includes(status)) {
      throw new Error(`live state subject ${String(entry["subject"])} has status outside the closed set`);
    }
    const reason = entry["reason_code"];
    if (typeof reason !== "string" || !(MEMORY_REASON_CODES as readonly string[]).includes(reason)) {
      throw new Error(`live state subject ${String(entry["subject"])} has a reason_code outside the closed set`);
    }
    const row: LiveSubjectStatus = {
      subject: entry["subject"],
      status: status as LiveSubjectStatus["status"],
      reason_code: reason as LiveSubjectStatus["reason_code"],
    };
    if (typeof entry["recorded_head_sha"] === "string") row.recorded_head_sha = entry["recorded_head_sha"];
    if (typeof entry["current_head_sha"] === "string") row.current_head_sha = entry["current_head_sha"];
    return row;
  });
  const verdictsRaw = raw["verdicts"];
  if (!isRecord(verdictsRaw)) throw new Error("live state has no verdicts object");
  return {
    schema: LIVE_STATE_SCHEMA,
    generated_at: raw["generated_at"],
    store_path: raw["store_path"],
    store_present: raw["store_present"],
    head_sha: head,
    subjects,
    verdicts: verdictsRaw,
  };
}

/** True when the snapshot carries nothing bindable — the UI must show the empty state. */
export function liveStateIsEmpty(snap: LiveStateSnapshot): boolean {
  return !snap.store_present || snap.subjects.length === 0;
}

/**
 * Build the render model from a validated snapshot. Verdicts are re-checked
 * through assertDisplayable (defense in depth) and bound to the snapshot's
 * head; anything else renders as NO VERDICT with the memory row telling the
 * truth about staleness.
 */
export function buildLiveModel(snap: LiveStateSnapshot): ProjectorModel {
  const verdicts: Record<string, VerdictRecord> = {};
  for (const [subject, value] of Object.entries(snap.verdicts)) {
    verdicts[subject] = assertDisplayable(value);
  }

  const views: SubjectView[] = snap.subjects.map((row) => {
    const memory = {
      subject: row.subject,
      status: row.status,
      reason_code: row.reason_code,
      ...(row.recorded_head_sha !== undefined ? { recorded_head_sha: row.recorded_head_sha } : {}),
      current_head_sha: row.current_head_sha ?? snap.head_sha,
    };
    const bound = verdicts[row.subject];
    const verdict = bound !== undefined && bound.subject.sha === snap.head_sha ? bound : null;
    return { subject: row.subject, roomId: "spine:projector", memory, verdict, gateBreach: gateBreachFor(verdict, memory) };
  });

  const counts = { VALID: 0, STALE: 0, UNKNOWN: 0, INVALIDATED: 0 };
  for (const v of views) counts[v.memory.status] += 1;

  return {
    rooms: [{ id: "spine:projector", label: "Projector Spine", subjects: views }],
    subjects: views,
    seal: snap.head_sha,
    generatedAt: snap.generated_at,
    note: `live bind from ${snap.store_path}`,
    counts,
  };
}
