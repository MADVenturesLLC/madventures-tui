// apps/seal-studio/test/seal-bridge.test.ts
// The fail-closed contract of the only door from UI to disk:
//   - confirmed !== exactly true → refused, mock fs never touched;
//   - confirmed + valid → sealed through the real @mad/founder-act core,
//     written once, exclusively, under <repoRoot>/.mad/founder-acts/<sha>.json;
//   - re-seal of identical content → already_sealed, no clobber;
//   - core refusals surface verbatim as 422.

import { describe, expect, test } from "bun:test";
import { join } from "node:path";

import { sealAct, type SealedActV0 } from "@mad/founder-act";

import { sealToDisk, validateSealRequest, type FsLike } from "../src/lib/seal-bridge";

const REPO_ROOT = "/repo";
const IDENTITY = { id: "3f2504e0-4f89-41d3-9a0c-0305e82c3301", issued_at: "2026-09-13T00:00:00Z" };

const VALID = {
  mode: "founder",
  confirmed: true,
  ...IDENTITY,
  kind: "commission",
  subject: "madventures-tui/build/seal-studio-v0",
  scope: ["apps/seal-studio/**"],
  reason_code: "SEAL_STUDIO_V0",
};

function mockFs() {
  const writes: { path: string; data: string; flag: string }[] = [];
  const dirs: string[] = [];
  const fs: FsLike = {
    mkdir: async (path) => {
      dirs.push(path);
      return undefined;
    },
    writeFile: async (path, data, opts) => {
      writes.push({ path, data, flag: opts.flag });
      return undefined;
    },
  };
  return { fs, writes, dirs };
}

describe("validateSealRequest — the gate before any write", () => {
  test("confirmed must be exactly true", () => {
    const result = validateSealRequest({ ...VALID, confirmed: false });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.join(" ")).toContain("Founder confirm gate");
    expect(validateSealRequest({ ...VALID, confirmed: "yes" }).ok).toBe(false);
    expect(validateSealRequest({ ...VALID }).ok).toBe(true);
  });

  test("closed enum, field shapes, and merge's head_sha requirement", () => {
    expect(validateSealRequest({ ...VALID, kind: "other_named" }).ok).toBe(false);
    expect(validateSealRequest({ ...VALID, kind: "PHASE_0" }).ok).toBe(false);
    expect(validateSealRequest({ ...VALID, subject: "" }).ok).toBe(false);
    expect(validateSealRequest({ ...VALID, id: "not-a-uuid" }).ok).toBe(false);
    expect(validateSealRequest({ ...VALID, head_sha: "ZZ" }).ok).toBe(false);
    const mergeNoHead = validateSealRequest({ ...VALID, kind: "merge" });
    expect(mergeNoHead.ok).toBe(false);
    expect(validateSealRequest({ ...VALID, kind: "merge", head_sha: "a1".repeat(20) }).ok).toBe(true);
    expect(validateSealRequest({ ...VALID, scope: ["bad\0"] }).ok).toBe(false);
  });
});

describe("sealToDisk — write happens only through the gate", () => {
  test("without confirm: refused, no directory created, no file written", async () => {
    const { fs, writes, dirs } = mockFs();
    const result = await sealToDisk({ ...VALID, confirmed: false }, { repoRoot: REPO_ROOT, fs });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.status).toBe(400);
    expect(writes).toEqual([]);
    expect(dirs).toEqual([]);
  });

  test("with confirm: sealed by the real core, written wx under the acts dir", async () => {
    const { fs, writes, dirs } = mockFs();
    const result = await sealToDisk(VALID, { repoRoot: REPO_ROOT, fs });
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const core = sealAct({
      kind: "commission",
      subject: VALID.subject,
      scope: VALID.scope,
      actor: "founder",
      reason_code: VALID.reason_code,
      evidence_refs: [],
      id: IDENTITY.id,
      issued_at: IDENTITY.issued_at,
    });
    expect(core.ok).toBe(true);
    if (!core.ok) return;
    const act: SealedActV0 = core.act;

    expect(result.act_sha256).toBe(act.act_sha256);
    expect(result.demo).toBe(false);
    expect(result.already_sealed).toBe(false);
    expect(dirs).toEqual([join(REPO_ROOT, ".mad", "founder-acts")]);
    expect(writes.length).toBe(1);
    expect(writes[0]?.flag).toBe("wx");
    expect(writes[0]?.path).toBe(join(REPO_ROOT, ".mad", "founder-acts", `${act.act_sha256}.json`));

    const onDisk: unknown = JSON.parse(writes[0]?.data ?? "");
    expect(onDisk).toEqual(act);
  });

  test("identical content re-seals idempotently (EEXIST → already_sealed)", async () => {
    const existing = new Map<string, string>();
    const fs: FsLike = {
      mkdir: async () => undefined,
      writeFile: async (path, data) => {
        if (existing.has(path)) {
          throw new Error("EEXIST: file already exists");
        }
        existing.set(path, data);
        return undefined;
      },
    };
    const first = await sealToDisk(VALID, { repoRoot: REPO_ROOT, fs });
    expect(first.ok).toBe(true);
    const second = await sealToDisk(VALID, { repoRoot: REPO_ROOT, fs });
    expect(second.ok).toBe(true);
    if (second.ok) {
      expect(second.already_sealed).toBe(true);
      if (first.ok) expect(second.act_sha256).toBe(first.act_sha256);
    }
  });

  test("core refusal surfaces as 422 with the refusal reasons (scope * is core-only)", async () => {
    const { fs, writes } = mockFs();
    const result = await sealToDisk({ ...VALID, scope: ["*"] }, { repoRoot: REPO_ROOT, fs });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(422);
      expect(result.errors.join(" ")).toContain("hold/freeze");
    }
    expect(writes).toEqual([]);
  });

  test("demo mode seals an actor-demo fixture", async () => {
    const { fs, writes } = mockFs();
    const result = await sealToDisk({ ...VALID, mode: "demo" }, { repoRoot: REPO_ROOT, fs });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.demo).toBe(true);
      const act: unknown = JSON.parse(writes[0]?.data ?? "{}") as Record<string, unknown>;
      expect((act as Record<string, unknown>)["actor"]).toBe("demo");
    }
  });
});
