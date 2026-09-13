// apps/projector-mc/test/ui.test.tsx
// UI smoke tests with react-test-renderer (DOM components, no browser).
//
// Pins the Slice-A polish contract where it is testable without a pixel:
//   - the rail renders the FULL subject name (no ellipsis/truncation),
//   - the live empty state says what is true and what to do next,
//   - the live hook goes 404 → empty, valid snapshot → ready, broken
//     snapshot → error.

import { describe, expect, test } from "bun:test";
import { create, act } from "react-test-renderer";

import { makeVerdict } from "@mad/single-verdict";
import { makeClaimBoundary } from "@mad/claim-boundary";

import { buildLiveModel, LIVE_STATE_SCHEMA, parseLiveState } from "../src/lib/live";
import { LiveEmptyState, useLiveState } from "../src/components/LiveView";
import { RoomRail } from "../src/components/RoomRail";

const HEAD = "a1".repeat(20);
const MOVED = "b2".repeat(20);
const REF_SHA = "c3".repeat(32);
const LONG_SUBJECT = "packages/some-very-long-subject-name-that-once-was-hostilely-truncated";

function snapshot(subjects: unknown[]): unknown {
  return {
    schema: LIVE_STATE_SCHEMA,
    generated_at: "2026-09-13T12:00:00.000Z",
    store_path: ".mad/build-memory.json",
    store_present: true,
    head_sha: HEAD,
    subjects,
    verdicts: {},
  };
}

// React 19 act() environment (silences the "not configured" warning).
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function textOf(renderer: { root: { children: unknown[] } }): string {
  let out = "";
  const walk = (node: unknown): void => {
    if (node === null || node === undefined || typeof node === "boolean") return;
    if (typeof node === "string" || typeof node === "number") {
      out += String(node);
      return;
    }
    if (Array.isArray(node)) {
      for (const child of node) walk(child);
      return;
    }
    if (typeof node === "object") {
      const children = (node as { children?: unknown[] }).children;
      if (Array.isArray(children)) {
        for (const child of children) walk(child);
      }
    }
  };
  walk(renderer.root.children);
  return out;
}

describe("RoomRail polish contract", () => {
  test("selected subject shows its FULL name — no truncation, no ellipsis", () => {
    const snap = parseLiveState(
      snapshot([
        { subject: LONG_SUBJECT, status: "VALID", reason_code: "SHA_MATCH", current_head_sha: HEAD },
        { subject: "@mad/build-memory", status: "STALE", reason_code: "SHA_MISMATCH", recorded_head_sha: MOVED, current_head_sha: HEAD },
      ]),
    );
    const model = buildLiveModel(snap);
    let renderer!: ReturnType<typeof create>;
    act(() => {
      renderer = create(
        <RoomRail
          rooms={model.rooms}
          visibleSubjects={new Set(model.subjects.map((s) => s.subject))}
          selectedSubject={LONG_SUBJECT}
          onSelect={() => undefined}
        />,
      );
    });
    const text = textOf(renderer);
    expect(text).toContain(LONG_SUBJECT);
    expect(text).not.toContain("…");
    expect(text).toContain("STALE");
    renderer.unmount();
  });
});

describe("live empty state", () => {
  test("says what is true and what to do next — no fake ledger rows", () => {
    let renderer!: ReturnType<typeof create>;
    act(() => {
      renderer = create(<LiveEmptyState />);
    });
    const text = textOf(renderer);
    expect(text).toContain("No bound memory");
    expect(text).toContain("run bind or use fixture");
    expect(text).toContain("projector:bind-demo");
    renderer.unmount();
  });
});

describe("useLiveState phases", () => {
  function Probe() {
    const live = useLiveState("live");
    const names = live.phase === "ready" ? live.model.subjects.map((s) => s.subject).join("|") : "";
    return <div data-phase={live.phase}>{names}</div>;
  }

  function withFetch<T>(impl: () => Promise<Response>, run: () => Promise<T>): Promise<T> {
    const original = globalThis.fetch;
    globalThis.fetch = (async () => impl()) as unknown as typeof fetch;
    return run().finally(() => {
      globalThis.fetch = original;
    });
  }

  test("404 → honest empty phase", async () => {
    await withFetch(
      async () => new Response("not found", { status: 404 }),
      async () => {
        let renderer!: ReturnType<typeof create>;
        await act(async () => {
          renderer = create(<Probe />);
        });
        expect(renderer.root.findByProps({ "data-phase": "empty" })).toBeDefined();
        renderer.unmount();
      },
    );
  });

  test("SPA fallback (200 + HTML instead of the snapshot) → honest empty phase, not an error", async () => {
    await withFetch(
      async () => new Response("<!doctype html><html><body>app</body></html>", { status: 200, headers: { "content-type": "text/html" } }),
      async () => {
        let renderer!: ReturnType<typeof create>;
        await act(async () => {
          renderer = create(<Probe />);
        });
        expect(renderer.root.findByProps({ "data-phase": "empty" })).toBeDefined();
        renderer.unmount();
      },
    );
  });

  test("valid snapshot → ready with subject names", async () => {
    const snap = snapshot([
      { subject: "@mad/build-memory", status: "VALID", reason_code: "SHA_MATCH", current_head_sha: HEAD },
    ]);
    await withFetch(
      async () => new Response(JSON.stringify(snap), { status: 200, headers: { "content-type": "application/json" } }),
      async () => {
        let renderer!: ReturnType<typeof create>;
        await act(async () => {
          renderer = create(<Probe />);
        });
        expect(renderer.root.findByProps({ "data-phase": "ready" })).toBeDefined();
        renderer.unmount();
      },
    );
  });

  test("a broken snapshot → error phase, never a guess", async () => {
    await withFetch(
      async () => new Response(JSON.stringify({ schema: "lies/v1" }), { status: 200, headers: { "content-type": "application/json" } }),
      async () => {
        let renderer!: ReturnType<typeof create>;
        await act(async () => {
          renderer = create(<Probe />);
        });
        expect(renderer.root.findByProps({ "data-phase": "error" })).toBeDefined();
        renderer.unmount();
      },
    );
  });

  test("smoke: a ready live model carries a makeVerdict-produced record through the rail", async () => {
    const ship = makeVerdict({
      verdict: "VERIFY_PASS",
      subject: { name: "@mad/build-memory", sha: HEAD },
      reason_code: "EVIDENCE_FRESH",
      produced_by: "argus:bind-demo",
      evidence_refs: [{ ref: { path: "docs/verification/argus-packet.md", sha256: REF_SHA, kind: "argus_packet" }, boundary: makeClaimBoundary("verified") }],
      memory: { subject: "@mad/build-memory", status: "VALID" },
    });
    const snap = snapshot([
      { subject: "@mad/build-memory", status: "VALID", reason_code: "SHA_MATCH", current_head_sha: HEAD },
    ]);
    (snap as { verdicts: Record<string, unknown> }).verdicts = { "@mad/build-memory": ship };
    const model = buildLiveModel(parseLiveState(snap));
    let renderer!: ReturnType<typeof create>;
    act(() => {
      renderer = create(
        <RoomRail
          rooms={model.rooms}
          visibleSubjects={new Set(model.subjects.map((s) => s.subject))}
          selectedSubject="@mad/build-memory"
          onSelect={() => undefined}
        />,
      );
    });
    const text = textOf(renderer);
    expect(text).toContain("VERIFY_PASS");
    expect(text).toContain("VALID");
    expect(text).not.toContain("GATE_BREACH");
    renderer.unmount();
  });
});
