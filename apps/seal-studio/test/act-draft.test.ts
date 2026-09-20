// apps/seal-studio/test/act-draft.test.ts
// The core promise of the studio: the hash the Founder watches settle in the
// browser IS the hash the seal writes to disk. Fixed identity + same fields
// → identical act_sha256, proven against the real @mad/founder-act core.

import { describe, expect, test } from "bun:test";

import { sealAct } from "@mad/founder-act";

import {
  actHashes,
  buildBody,
  draftErrors,
  draftFromSearchParams,
  equivalentCommand,
  newIdentity,
  EMPTY_DRAFT,
  type DraftState,
} from "../src/lib/act-draft";

const IDENTITY = { id: "3f2504e0-4f89-41d3-9a0c-0305e82c3301", issuedAt: "2026-09-13T00:00:00Z" };

function commissionDraft(over: Partial<DraftState> = {}): DraftState {
  return { ...EMPTY_DRAFT, subject: "madventures-tui/build/seal-studio-v0", scope: ["apps/seal-studio/**"], reasonCode: "SEAL_STUDIO_V0", ...over };
}

describe("preview hash === seal-core hash", () => {
  test("same fields + same id → identical act_sha256 with the real core", async () => {
    const draft = commissionDraft();
    const mine = await actHashes(draft, IDENTITY);
    const core = sealAct({
      kind: draft.kind,
      subject: draft.subject,
      scope: draft.scope,
      actor: draft.actor,
      reason_code: draft.reasonCode,
      evidence_refs: [],
      id: IDENTITY.id,
      issued_at: IDENTITY.issuedAt,
    });
    expect(core.ok).toBe(true);
    if (core.ok) {
      expect(mine.actSha256).toBe(core.act.act_sha256);
      expect(mine.bodySha256).toBe(core.act.body_sha256);
    }
  });

  test("changing the subject moves the hash (preview updates as you type)", async () => {
    const before = await actHashes(commissionDraft(), IDENTITY);
    const after = await actHashes(commissionDraft({ subject: "madventures-tui/build/seal-studio-v0!" }), IDENTITY);
    expect(after.actSha256).not.toBe(before.actSha256);
  });

  test("changing scope chips moves the hash", async () => {
    const before = await actHashes(commissionDraft(), IDENTITY);
    const after = await actHashes(commissionDraft({ scope: ["apps/seal-studio/**", "packages/founder-act"] }), IDENTITY);
    expect(after.actSha256).not.toBe(before.actSha256);
  });

  test("merge without head_sha is refused; with head_sha it seals", async () => {
    const bad = await actHashes(commissionDraft({ kind: "merge", headSha: "" }), IDENTITY);
    const good = await actHashes(commissionDraft({ kind: "merge", headSha: "a1".repeat(20) }), IDENTITY);
    expect(good.actSha256).toMatch(/^[0-9a-f]{64}$/);
    expect(bad.actSha256).toMatch(/^[0-9a-f]{64}$/);
    expect(draftErrors(commissionDraft({ kind: "merge", headSha: "" }))).toContain('kind "merge" requires head_sha');
    expect(draftErrors(commissionDraft({ kind: "merge", headSha: "a1".repeat(20) }))).toEqual([]);
  });

  test("leading/trailing whitespace never changes the sealed hash (Bugbot a84ad9e9)", async () => {
    const clean = await actHashes(commissionDraft(), IDENTITY);
    const padded = await actHashes(
      commissionDraft({ subject: "  madventures-tui/build/seal-studio-v0  ", reasonCode: "  SEAL_STUDIO_V0  " }),
      IDENTITY,
    );
    // The preview must hash exactly what the seal writes: trimmed fields.
    expect(padded.actSha256).toBe(clean.actSha256);
    expect(padded.bodySha256).toBe(clean.bodySha256);
    // The command preview must show the same trimmed fields the CLI receives.
    const cmd = equivalentCommand(commissionDraft({ subject: "  x  ", reasonCode: "  y  " }), IDENTITY, true);
    expect(cmd).toContain('"x"');
    expect(cmd).toContain('"y"');
    expect(cmd).not.toContain('"  x  "');
    expect(cmd).not.toContain('"  y  "');
  });
});

describe("draft validation mirrors the core rules", () => {
  test("empty subject / reason are refused", () => {
    const errs = draftErrors({ ...EMPTY_DRAFT });
    expect(errs).toContain("subject is required");
    expect(errs).toContain("reason_code is required");
  });

  test("bad head_sha and bad scope shapes are refused", () => {
    expect(draftErrors(commissionDraft({ headSha: "xyz" }))).toContain("head_sha must be 40 lowercase hex characters");
    expect(draftErrors(commissionDraft({ scope: [] }))).toContain('kind "commission" requires a non-empty scope');
    expect(draftErrors(commissionDraft({ scope: ["*"] }))).toContain('scope ["*"] is allowed only for hold/freeze');
    expect(draftErrors({ ...commissionDraft(), expiresAt: "soon" })).toContain("expires_at must be ISO-8601");
  });

  test("a complete founder commission drafts clean", () => {
    expect(draftErrors(commissionDraft({ headSha: "a1".repeat(20) }))).toEqual([]);
  });
});

describe("identity + deep link", () => {
  test("newIdentity mints a UUIDv4 and an ISO issued_at", () => {
    const id = newIdentity();
    expect(id.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    expect(id.issuedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });

  test("deep link params seed the draft", () => {
    const seeded = draftFromSearchParams(
      new URLSearchParams("kind=merge&subject=repo/branch&scope=a,b&head_sha=a1".padEnd(0)),
    );
    expect(seeded.kind).toBe("merge");
    expect(seeded.subject).toBe("repo/branch");
    expect(seeded.scope).toEqual(["a", "b"]);
    expect(draftFromSearchParams(new URLSearchParams("kind=PHASE_0")).kind).toBeUndefined();
  });

  test("body omits empty optionals — absent, not empty strings", () => {
    const body = buildBody(commissionDraft(), IDENTITY);
    expect(Object.hasOwn(body, "head_sha")).toBe(false);
    expect(Object.hasOwn(body, "expires_at")).toBe(false);
  });
});

describe("the command preview hides nothing", () => {
  test("gating flag follows the actor and appears only with confirm", () => {
    const draft = commissionDraft({ actor: "founder" });
    expect(equivalentCommand(draft, IDENTITY, false)).toContain("#  (blocked");
    expect(equivalentCommand(draft, IDENTITY, true)).toContain("--founder-confirm");
    expect(equivalentCommand({ ...draft, actor: "demo" }, IDENTITY, true)).toContain("--demo-fixture");
    expect(equivalentCommand({ ...draft, actor: "demo" }, IDENTITY, true)).not.toContain("--founder-confirm");
  });
});
