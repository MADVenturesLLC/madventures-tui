// packages/founder-act/test/founder-act.test.ts
// Tests for @mad/founder-act v0.
//
// Golden fixtures under ../fixtures were generated with
// `mad-founder-act seal --actor demo --demo-fixture` (synthetic values only).

import { describe, expect, test } from "bun:test";
import { mkdtemp, readFile, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  ACT_KINDS,
  hashBody,
  isFounderAct,
  sealAct,
  validateActBody,
  type ActBodyV0,
  type SealedActV0,
} from "../src/act";
import { canonicalJson, sha256Hex } from "../src/canonical";
import { checkToken, parseArgs, runCli } from "../src/cli";
import { renderShow } from "../src/show";
import {
  resolveActToken,
  verifyAct,
  verifyActFileWithRevocation,
} from "../src/verify";

const FIXTURES_DIR = join(import.meta.dir, "..", "fixtures");
const HEAD = "a".repeat(40);
const BASE = "b".repeat(40);
const PAST = "2026-01-01T00:00:00Z";
const FAR_FUTURE = "2099-01-01T00:00:00Z";
const NOW = new Date("2026-09-13T12:00:00Z");
const VERIFY_OPTS = { now: NOW };

function baseInput(overrides: Record<string, unknown> = {}) {
  return {
    kind: "commission",
    subject: "demo/repo:build/demo-branch",
    scope: ["packages/demo"],
    actor: "founder",
    reason_code: "TEST_FIXTURE",
    evidence_refs: [{ kind: "test", ref: "synthetic" }],
    issued_at: "2026-09-13T00:00:00Z",
    ...overrides,
  } as Parameters<typeof sealAct>[0];
}

async function makeTmpDir(): Promise<string> {
  return mkdtemp(join(tmpdir(), "founder-act-test-"));
}

async function writeAct(dir: string, act: SealedActV0): Promise<string> {
  const path = join(dir, `${act.act_sha256}.json`);
  await writeFile(path, `${JSON.stringify(act, null, 2)}\n`);
  return path;
}

function sealedBody(act: SealedActV0): ActBodyV0 {
  const { body_sha256: _b, act_sha256: _a, ...body } = act;
  return body as ActBodyV0;
}

describe("canonicalization", () => {
  test("key order does not change the canonical form (mutation guard)", () => {
    const a = { z: 1, a: { y: 2, b: 3 } };
    const b = { a: { b: 3, y: 2 }, z: 1 };
    expect(canonicalJson(a)).toBe(canonicalJson(b));
    expect(sha256Hex(canonicalJson(a))).toBe(sha256Hex(canonicalJson(b)));
  });

  test("any canonicalization change must change the hash (mutation note)", () => {
    const body: ActBodyV0 = {
      schema: "founder_act_v0",
      id: "01234567-89ab-4cde-8f01-23456789abcd",
      kind: "hold",
      subject: "demo/repo",
      scope: ["*"],
      actor: "founder",
      issued_at: PAST,
      reason_code: "TEST",
      evidence_refs: [],
    };
    const h1 = hashBody(body);
    const h2 = hashBody({ ...body, reason_code: "OTHER" });
    expect(h1.body_sha256).not.toBe(h2.body_sha256);
    expect(h1.act_sha256).not.toBe(h2.act_sha256);
  });
});

describe("seal + verify roundtrip", () => {
  test("seal then verify is VALID for each kind", () => {
    for (const kind of ACT_KINDS) {
      if (kind === "other_named") continue;
      const input = baseInput({
        kind,
        scope: kind === "merge" ? [] : ["packages/demo"],
        head_sha: kind === "merge" ? HEAD : undefined,
      });
      const sealed = sealAct(input);
      if (!sealed.ok) throw new Error(`seal failed for ${kind}: ${sealed.errors.join("; ")}`);
      const result = verifyAct(sealed.act, VERIFY_OPTS);
      expect(result.status).toBe("VALID");
      expect(result.founderAuthored).toBe(true);
    }
  });

  test("hash identity: act_sha256 = sha256(canonical(payload minus act_sha256))", () => {
    const sealed = sealAct(baseInput());
    if (!sealed.ok) throw new Error("seal failed");
    const act = sealed.act;
    const { act_sha256: _drop, ...withoutIdentity } = act;
    expect(act.act_sha256).toBe(sha256Hex(canonicalJson(withoutIdentity)));
    expect(act.body_sha256).toBe(sha256Hex(canonicalJson(sealedBody(act))));
  });

  test("deterministic identity: same fields, same sha (id/issued_at pinned)", () => {
    const input = baseInput({ id: "01234567-89ab-4cde-8f01-23456789abcd" });
    const a = sealAct(input);
    const b = sealAct(input);
    expect(a.ok && b.ok && a.act.act_sha256 === b.act.act_sha256).toBe(true);
  });

  test("file roundtrip: write, read, verify VALID", async () => {
    const dir = await makeTmpDir();
    const sealed = sealAct(baseInput());
    if (!sealed.ok) throw new Error("seal failed");
    const path = await writeAct(dir, sealed.act);
    const result = await verifyActFileWithRevocation(path, VERIFY_OPTS);
    expect(result.status).toBe("VALID");
    expect(result.path).toBe(path);
  });
});

describe("tamper detection", () => {
  test("changing one field after sealing is INVALID", async () => {
    const dir = await makeTmpDir();
    const sealed = sealAct(baseInput());
    if (!sealed.ok) throw new Error("seal failed");
    const tampered: SealedActV0 = { ...sealed.act, subject: "demo/repo:build/tampered" };
    const path = await writeAct(dir, tampered);
    const result = await verifyActFileWithRevocation(path, VERIFY_OPTS);
    expect(result.status).toBe("INVALID");
    expect(result.reasons.join(" ")).toContain("body_sha256 mismatch");
  });

  test("swapping act_sha256 for another hash is INVALID", async () => {
    const sealed = sealAct(baseInput());
    if (!sealed.ok) throw new Error("seal failed");
    const tampered = { ...sealed.act, act_sha256: "f".repeat(64) };
    const result = verifyAct(tampered, VERIFY_OPTS);
    expect(result.status).toBe("INVALID");
    expect(result.reasons.join(" ")).toContain("act_sha256 mismatch");
  });

  test("wrong schema string is INVALID", () => {
    const result = verifyAct({ schema: "PHASE_0", everything: "else" }, VERIFY_OPTS);
    expect(result.status).toBe("INVALID");
  });

  test("unknown extra field is INVALID (closed field set)", () => {
    const sealed = sealAct(baseInput());
    if (!sealed.ok) throw new Error("seal failed");
    const withExtra = { ...sealed.act, gateway_power: "auto_merge_everything" };
    expect(verifyAct(withExtra, VERIFY_OPTS).status).toBe("INVALID");
  });
});

describe("kind rules", () => {
  test("merge without head_sha is refused by seal", () => {
    const sealed = sealAct(baseInput({ kind: "merge", scope: [] }));
    expect(sealed.ok).toBe(false);
    if (!sealed.ok) {
      expect(sealed.errors.join(" ")).toContain("merge");
    }
  });

  test("commission with empty scope is refused", () => {
    const sealed = sealAct(baseInput({ scope: [] }));
    expect(sealed.ok).toBe(false);
  });

  test('scope ["*"] allowed only for hold/freeze', () => {
    expect(sealAct(baseInput({ kind: "hold", scope: ["*"] })).ok).toBe(true);
    expect(sealAct(baseInput({ kind: "freeze", scope: ["*"] })).ok).toBe(true);
    expect(sealAct(baseInput({ kind: "merge", scope: ["*"], head_sha: HEAD })).ok).toBe(false);
    expect(sealAct(baseInput({ scope: ["*"] })).ok).toBe(false);
  });

  test("head_sha must be 40 hex when present", () => {
    expect(sealAct(baseInput({ head_sha: "XYZ" })).ok).toBe(false);
    expect(sealAct(baseInput({ head_sha: "A".repeat(40) })).ok).toBe(false);
    expect(sealAct(baseInput({ head_sha: HEAD })).ok).toBe(true);
  });

  test("bad enum value is INVALID", () => {
    const bad = { ...baseRaw(), kind: "spend_ceiling_change" };
    const checked = validateActBody(bad);
    expect(checked.ok).toBe(false);
    if (!checked.ok) {
      expect(checked.errors.join(" ")).toContain("closed enum");
    }
  });
});

describe("other_named + allowlist", () => {
  test("kind_name outside the allowlist is INVALID", () => {
    const sealed = sealAct(
      baseInput({ kind: "other_named", kind_name: "launch_nukes" }),
      { kindNameAllowlist: ["spend_ceiling_change"] },
    );
    expect(sealed.ok).toBe(false);
  });

  test("kind_name inside the allowlist verifies VALID", () => {
    const sealed = sealAct(
      baseInput({ kind: "other_named", kind_name: "spend_ceiling_change" }),
      { kindNameAllowlist: ["spend_ceiling_change"] },
    );
    expect(sealed.ok).toBe(true);
    if (sealed.ok) {
      expect(verifyAct(sealed.act, { ...VERIFY_OPTS, kindNameAllowlist: ["spend_ceiling_change"] }).status).toBe("VALID");
      expect(verifyAct(sealed.act, { ...VERIFY_OPTS, kindNameAllowlist: [] }).status).toBe("INVALID");
    }
  });

  test("other_named without kind_name is refused", () => {
    expect(sealAct(baseInput({ kind: "other_named" })).ok).toBe(false);
  });

  test("kind_name on a non-other_named kind is refused", () => {
    expect(sealAct(baseInput({ kind_name: "spend_ceiling_change" })).ok).toBe(false);
  });
});

describe("expiry", () => {
  test("expires_at in the past is EXPIRED, future is VALID", async () => {
    const dir = await makeTmpDir();
    const expired = sealAct(baseInput({ expires_at: PAST }));
    const active = sealAct(baseInput({ expires_at: FAR_FUTURE }));
    expect(expired.ok && active.ok).toBe(true);
    if (expired.ok && active.ok) {
      const p1 = await writeAct(dir, expired.act);
      const p2 = await writeAct(dir, active.act);
      expect((await verifyActFileWithRevocation(p1, VERIFY_OPTS)).status).toBe("EXPIRED");
      expect((await verifyActFileWithRevocation(p2, VERIFY_OPTS)).status).toBe("VALID");
    }
  });

  test("malformed expires_at is INVALID", () => {
    expect(sealAct(baseInput({ expires_at: "next tuesday" })).ok).toBe(false);
    expect(sealAct(baseInput({ expires_at: "2026-09-13" })).ok).toBe(false);
  });
});

describe("revocation", () => {
  test("sibling .revoked marker flips VALID to REVOKED_REF", async () => {
    const dir = await makeTmpDir();
    const sealed = sealAct(baseInput());
    if (!sealed.ok) throw new Error("seal failed");
    const path = await writeAct(dir, sealed.act);
    await writeFile(`${path}.revoked`, "revoked by hand\n");
    const result = await verifyActFileWithRevocation(path, VERIFY_OPTS);
    expect(result.status).toBe("REVOKED_REF");
    expect(result.revokedMarker).toBe(`${path}.revoked`);
  });
});

describe("actor gating", () => {
  test("demo acts verify VALID but are not founder-authored", () => {
    const sealed = sealAct(baseInput({ actor: "demo" }));
    expect(sealed.ok).toBe(true);
    if (sealed.ok) {
      const result = verifyAct(sealed.act, VERIFY_OPTS);
      expect(result.status).toBe("VALID");
      expect(result.founderAuthored).toBe(false);
      expect(isFounderAct(sealed.act)).toBe(false);
    }
  });

  test("unknown actor values are refused", () => {
    expect(sealAct(baseInput({ actor: "agent" as never })).ok).toBe(false);
  });

  test("show labels demo acts as non-authority", () => {
    const sealed = sealAct(baseInput({ actor: "demo" }));
    if (!sealed.ok) throw new Error("seal failed");
    const text = renderShow(verifyAct(sealed.act, VERIFY_OPTS), sealed.act);
    expect(text).toContain("NOT a Founder authorization");
  });
});

describe("CLI", () => {
  test("parseArgs enforces merge head_sha, token containment, and flag conflicts", () => {
    const merge = parseArgs(["seal", "--kind", "merge", "--subject", "s", "--reason-code", "r"]);
    expect(merge.error).toContain("head-sha");
    const ok = parseArgs(["seal", "--kind", "merge", "--subject", "s", "--reason-code", "r", "--head-sha", HEAD, "--founder-confirm"]);
    expect(ok.error).toBeUndefined();
    const both = parseArgs(["seal", "--kind", "hold", "--subject", "s", "--reason-code", "r", "--scope", "*", "--founder-confirm", "--demo-fixture"]);
    expect(both.error).toContain("mutually exclusive");
    expect(checkToken("../etc/passwd.json")).toContain("..");
    expect(checkToken("/tmp/thing.txt")).toContain(".json");
    expect(checkToken("x".repeat(64))).toContain("64-hex");
    expect(checkToken("a".repeat(64))).toBeUndefined();
  });

  test("runCli refuses founder seal without --founder-confirm (exit 2)", async () => {
    const dir = await makeTmpDir();
    const code = await runCli([
      "seal", "--kind", "commission", "--subject", "demo/repo", "--reason-code", "TEST",
      "--scope", "packages/demo", "--out", dir,
    ]);
    expect(code).toBe(2);
  });

  test("runCli seal -> file written -> verify by sha -> exit 0; bad sha -> exit 1", async () => {
    const dir = await makeTmpDir();
    const sealCode = await runCli([
      "seal", "--kind", "commission", "--subject", "demo/repo:build/demo", "--reason-code", "TEST",
      "--scope", "packages/demo", "--actor", "demo", "--demo-fixture",
      "--issued-at", "2026-09-13T00:00:00Z", "--out", dir,
    ]);
    expect(sealCode).toBe(0);
    const files = (await import("node:fs/promises")).readdir;
    const names = await files(dir);
    expect(names.length).toBe(1);
    const sha = (names[0] ?? "").replace(/\.json$/, "");
    expect(sha).toMatch(/^[0-9a-f]{64}$/);
    expect(await runCli(["verify", sha, "--dir", dir])).toBe(0);
    expect(await runCli(["verify", "f".repeat(64), "--dir", dir])).toBe(1);
  });

  test("runCli show prints a human summary and demo warning", async () => {
    const dir = await makeTmpDir();
    await runCli([
      "seal", "--kind", "hold", "--subject", "demo/repo", "--reason-code", "TEST",
      "--scope", "*", "--actor", "demo", "--demo-fixture", "--out", dir,
    ]);
    const names = await (await import("node:fs/promises")).readdir(dir);
    const sha = (names[0] ?? "").replace(/\.json$/, "");
    const code = await runCli(["show", sha, "--dir", dir]);
    expect(code).toBe(0);
  });

  test("resolveActToken refuses paths outside allowed roots", async () => {
    const dir = await makeTmpDir();
    const outside = await makeTmpDir();
    const sealed = sealAct(baseInput({ actor: "demo" }));
    if (!sealed.ok) throw new Error("seal failed");
    const outsidePath = await writeAct(outside, sealed.act);
    const denied = await resolveActToken(outsidePath, dir, [process.cwd()]);
    expect("error" in denied).toBe(true);
    const allowed = await resolveActToken(outsidePath, dir, [outside]);
    expect("path" in allowed).toBe(true);
  });
});

describe("golden fixtures", () => {
  const fixtureFiles = [
    "d1f23f457335506846581ca037397006d7f5269788cb0364178902487b7b449e.json", // demo merge
    "572f5ee1a11eae6bdba5398ce695bd72316071ce50acc09d8bbcc386bed24a0c.json", // demo commission
  ];

  test("both demo fixtures verify VALID with actor demo", async () => {
    for (const name of fixtureFiles) {
      const path = join(FIXTURES_DIR, name);
      await stat(path); // throws (and fails the test) if a fixture is missing
      const text = await readFile(path, "utf8");
      const result = verifyAct(JSON.parse(text), VERIFY_OPTS);
      expect(result.status).toBe("VALID");
      expect(result.founderAuthored).toBe(false);
    }
  });

  test("fixture filename matches its act_sha256 identity", async () => {
    for (const name of fixtureFiles) {
      const text = await readFile(join(FIXTURES_DIR, name), "utf8");
      const parsed = JSON.parse(text) as SealedActV0;
      expect(name).toBe(`${parsed.act_sha256}.json`);
    }
  });

  test("verify by sha finds fixtures inside the fixtures dir", async () => {
    const text = await readFile(join(FIXTURES_DIR, fixtureFiles[0]!), "utf8");
    const parsed = JSON.parse(text) as SealedActV0;
    const resolved = await resolveActToken(parsed.act_sha256, FIXTURES_DIR, [FIXTURES_DIR]);
    expect("path" in resolved).toBe(true);
  });
});

function baseRaw(): Record<string, unknown> {
  return {
    schema: "founder_act_v0",
    id: "01234567-89ab-4cde-8f01-23456789abcd",
    kind: "commission",
    subject: "demo/repo",
    scope: ["packages/demo"],
    actor: "founder",
    issued_at: PAST,
    reason_code: "TEST",
    evidence_refs: [],
  };
}
