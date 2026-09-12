// apps/projector-mc/src/lib/render-model.ts
// Pure render model — no DOM, no React. The projector may display:
//   - memory statuses COMPUTED here via evaluateMemoryStatus (never stored
//     display values), and
//   - verdict records that passed assertDisplayable (never invented).
// Anything the gates would refuse is surfaced as GATE_BREACH, never hidden.

import {
  evaluateMemoryStatus,
  isValidHeadSha,
  FixtureMemoryStore,
  type MemoryStatusResult,
  type StoredEntry,
} from "@mad/build-memory";
import {
  POSITIVE_VERDICTS,
  type Verdict,
  type VerdictRecord,
  type VerdictTone,
} from "@mad/single-verdict";

/** Memory status → tone. Separate vocabulary from verdicts: a memory status is not a verdict. */
export const MEMORY_TONE: Readonly<Record<MemoryStatusResult["status"], VerdictTone>> = {
  VALID: "emerald",
  STALE: "amber",
  UNKNOWN: "zinc",
  INVALIDATED: "rose",
};

export type DemoRoom = { id: string; label: string; subjects: string[] };

export type ProjectorDemoFixture = {
  schema: string;
  generated_at: string;
  note: string;
  rooms: DemoRoom[];
  current: Record<string, { head_sha: string; index_tree?: string }>;
  memory_fixture: unknown;
  verdicts: Record<string, unknown>;
};

export type SubjectView = {
  subject: string;
  roomId: string;
  memory: MemoryStatusResult;
  verdict: VerdictRecord | null;
  /** true only if a positive verdict is being displayed while memory is not VALID */
  gateBreach: boolean;
};

export type RoomView = { id: string; label: string; subjects: SubjectView[] };

export type ProjectorModel = {
  rooms: RoomView[];
  subjects: SubjectView[];
  seal: string;
  generatedAt: string;
  note: string;
  counts: Record<MemoryStatusResult["status"], number>;
};

/** The defense-in-depth check: a positive verdict may not ride on stale memory. */
export function gateBreachFor(verdict: VerdictRecord | null, memory: MemoryStatusResult): boolean {
  if (verdict === null) return false;
  return POSITIVE_VERDICTS.includes(verdict.verdict) && memory.status !== "VALID";
}

export function shortSha(sha: string, head = 10): string {
  return sha.slice(0, head);
}

/**
 * Assemble subject views from validated parts. Sealed-fixture loading and
 * verdict validation happen in loadProjectorDemo; this function is the pure,
 * testable core.
 */
export function buildSubjectViews(
  store: FixtureMemoryStore,
  current: Record<string, { head_sha: string; index_tree?: string }>,
  verdicts: Record<string, unknown>,
  rooms: DemoRoom[],
): { subjects: SubjectView[]; rooms: RoomView[] } {
  const byRoom = new Map<string, SubjectView[]>();
  const subjects: SubjectView[] = [];

  const seen = new Set<string>();
  for (const room of rooms) {
    const list: SubjectView[] = [];
    for (const subject of room.subjects) {
      if (seen.has(subject)) continue;
      seen.add(subject);
      const cur = current[subject];
      if (cur === undefined || !isValidHeadSha(cur.head_sha)) {
        throw new Error(`fixture has no valid current head_sha for subject ${subject}`);
      }
      const entry: StoredEntry | null = store.lookup(subject);
      const memory = evaluateMemoryStatus(entry, subject, cur.index_tree !== undefined ? { head_sha: cur.head_sha, index_tree: cur.index_tree } : { head_sha: cur.head_sha });
      const rawVerdict = verdicts[subject];
      const verdict: VerdictRecord | null = rawVerdict === undefined ? null : (rawVerdict as VerdictRecord);
      const view: SubjectView = { subject, roomId: room.id, memory, verdict, gateBreach: gateBreachFor(verdict, memory) };
      list.push(view);
      subjects.push(view);
    }
    byRoom.set(room.id, list);
  }
  return {
    subjects,
    rooms: rooms.map((room) => ({ id: room.id, label: room.label, subjects: byRoom.get(room.id) ?? [] })),
  };
}

export type VerdictFilter = "ALL" | Verdict;

export function filterSubjects(subjects: SubjectView[], filter: VerdictFilter): SubjectView[] {
  if (filter === "ALL") return subjects;
  return subjects.filter((s) => s.verdict?.verdict === filter);
}

export const FILTER_CYCLE: readonly VerdictFilter[] = ["ALL", "SHIP", "HOLD", "VERIFY_PASS", "VERIFY_PASS_WITH_FINDINGS", "VERIFY_FAIL", "BLOCKED", "STALE_EVIDENCE", "SPEC_ONLY"];

export function nextFilter(filter: VerdictFilter): VerdictFilter {
  const idx = FILTER_CYCLE.indexOf(filter);
  return FILTER_CYCLE[(idx + 1) % FILTER_CYCLE.length] ?? "ALL";
}
