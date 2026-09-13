#!/usr/bin/env bun
// packages/founder-act/src/cli.ts
// `mad-founder-act` command implementation: seal, verify, show.
//
// Pure argument parsing and orchestration (no module-scope process access).
// The bin bootstrap lives in src/main.ts. All act reads go through
// resolveActToken (sha-or-clean-.json-path, resolved inside allowed roots);
// all writes are <out>/<act_sha256>.json with the "wx" exclusive flag.
//
// Actor gating:
//   actor "founder" requires --founder-confirm (the human Founder is at the
//   keyboard and authorizing THIS act). Agent-authored seals must use
//   --actor demo --demo-fixture instead; agents must never set
//   --founder-confirm on the Founder's behalf.
//
// No network access of any kind — every operation is local file + hash.
// Exit codes: 0 = seal/verify/show succeeded, 1 = verify returned a
// non-VALID status, 2 = usage or tooling error.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import {
  ACT_KINDS,
  sealAct,
  type ActKind,
  type EvidenceRef,
  type SealInput,
} from "./act";
import { renderShow } from "./show";
import { resolveActToken, verifyActFileWithRevocation } from "./verify";

export const ALLOWLIST_PATH = join(import.meta.dir, "..", "kind-name-allowlist.json");
export const DEFAULT_ACTS_DIR = join(process.cwd(), ".mad", "founder-acts");

export const USAGE = `mad-founder-act — sealed FounderAct authorization objects (v0)

usage:
  mad-founder-act seal   --kind <kind> --subject <s> [fields...] [gating...]
  mad-founder-act verify <path|64-hex-sha> [--dir <path>] [--json]
  mad-founder-act show   <path|64-hex-sha> [--dir <path>]

seal fields:
  --kind <k>            merge | commission | hold | freeze | reopen |
                        authorize_review | other_named (closed enum)
  --subject <s>         repo/branch/head or package (max 512 chars)
  --scope <a,b,c>       comma-separated paths or package names
                        ("*" only for hold/freeze; commission requires non-empty)
  --reason-code <s>     short machine-ish reason (required)
  --head-sha <40hex>    REQUIRED for kind=merge; 40-hex when binding a commit
  --base-sha <40hex>    optional, 40-hex
  --expires-at <iso>    optional ISO-8601
  --evidence <k:ref>    repeatable; kind:ref pair (first colon splits)
  --kind-name <s>       only with --kind other_named; must be allowlisted
  --actor <a>           founder (default) | demo
  --founder-confirm     asserts the human Founder authorized THIS act now.
                        Agents must NOT pass this flag. Refused together
                        with --demo-fixture.
  --demo-fixture        test-fixture mode; permits --actor demo
  --issued-at <iso>     override issuance time (tests / regeneration)
  --id <uuid|ulid>      override the generated act id (regeneration only;
                        same fields + same id = same act_sha256)
  --out <dir>           output dir (default: <cwd>/.mad/founder-acts)
  --stdout              print the act JSON instead of writing a file

notes:
  acts are written as <out>/<act_sha256>.json — content-addressed.
  verify recomputes both hashes; any mismatch is INVALID (exit 1).
  revocation: create a sibling marker file — touch <sha>.json.revoked
  path tokens: .json only, no ".." segments, inside the acts dir or cwd.
  status: VALID | INVALID | EXPIRED | REVOKED_REF (exit 0 only on VALID)

claim: FOUNDER_ACT_V0 / SEALED_AUTH_V0 — integrity seal (hash), NOT a
cryptographic signature; not non-repudiable. Ed25519/Keychain signing is a
later wave. NOT Gateway attestation, NOT Phase 0, NOT OCCUPANCY_PROOF,
NOT GATEWAY_HONESTY, NOT ROOM_RUNTIME, NOT a merge itself: a merge act
names a head SHA and the human Founder still performs the merge.
Chat messages are not authorization.`;

type SealArgs = {
  command: "seal";
  input: SealInput;
  founderConfirm: boolean;
  demoFixture: boolean;
  out: string;
  stdout: boolean;
};
type VerifyArgs = { command: "verify"; token: string; dir: string; json: boolean };
type ShowArgs = { command: "show"; token: string; dir: string };
export type CliArgs = SealArgs | VerifyArgs | ShowArgs | { command: "help" };

const ACTOR_VALUES = ["founder", "demo"] as const;
const SHA1_RE = /^[0-9a-f]{40}$/;
const SHA256_RE = /^[0-9a-f]{64}$/;
const ISO_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/;

/** Parse-time token check mirroring resolveActToken's containment rules. */
export function checkToken(token: string): string | undefined {
  if (SHA256_RE.test(token)) return undefined;
  if (token.includes("\0")) return "act path contains a NUL byte";
  if (token.split("/").includes("..")) return 'act path must not contain ".." segments';
  if (!token.endsWith(".json")) return "act path must end in .json (or pass a 64-hex sha)";
  return undefined;
}

export function parseArgs(argv: readonly string[]): { args: CliArgs; error?: string } {
  if (argv.length === 0) return { args: { command: "help" }, error: "no subcommand given" };
  const sub = argv[0];
  if (sub === undefined) return { args: { command: "help" }, error: "no subcommand given" };
  const rest = argv.slice(1);
  if (sub === "help" || sub === "--help" || sub === "-h") return { args: { command: "help" } };
  if (sub !== "seal" && sub !== "verify" && sub !== "show") {
    return { args: { command: "help" }, error: `unknown subcommand "${sub}" (known: seal, verify, show)` };
  }

  const BOOLEAN_FLAGS = new Set(["--founder-confirm", "--demo-fixture", "--stdout", "--json", "--help"]);
  const flags = new Map<string, string[]>();
  let token: string | undefined;
  for (let i = 0; i < rest.length; i++) {
    const item = rest[i];
    if (item === undefined) break;
    if (!item.startsWith("--")) {
      if ((sub === "verify" || sub === "show") && token === undefined) {
        token = item;
        continue;
      }
      return { args: { command: "help" }, error: `unexpected positional argument "${item}"` };
    }
    if (BOOLEAN_FLAGS.has(item)) {
      const existing = flags.get(item);
      if (existing === undefined) flags.set(item, ["true"]);
      continue;
    }
    const value = rest[++i];
    if (value === undefined || value.startsWith("--")) {
      return { args: { command: "help" }, error: `${item} requires a value` };
    }
    const existing = flags.get(item);
    if (existing === undefined) flags.set(item, [value]);
    else existing.push(value);
  }
  const one = (name: string): string | undefined => flags.get(name)?.[0];

  if (sub === "verify" || sub === "show") {
    if (token === undefined) return { args: { command: "help" }, error: `${sub} needs <path|sha>` };
    const tokenError = checkToken(token);
    if (tokenError !== undefined) return { args: { command: "help" }, error: tokenError };
    const dir = one("--dir") ?? DEFAULT_ACTS_DIR;
    if (sub === "verify") {
      return { args: { command: "verify", token, dir, json: flags.has("--json") } };
    }
    return { args: { command: "show", token, dir } };
  }

  // seal
  const kindStr = one("--kind");
  const subject = one("--subject");
  const reason = one("--reason-code");
  if (kindStr === undefined) return { args: { command: "help" }, error: "seal requires --kind" };
  if (subject === undefined) return { args: { command: "help" }, error: "seal requires --subject" };
  if (reason === undefined) return { args: { command: "help" }, error: "seal requires --reason-code" };
  if (!(ACT_KINDS as readonly string[]).includes(kindStr)) {
    return { args: { command: "help" }, error: `--kind must be one of: ${ACT_KINDS.join(", ")}` };
  }

  const scopeRaw = flags.get("--scope") ?? [];
  const scope = scopeRaw
    .flatMap((chunk) => chunk.split(","))
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);

  const evidence: EvidenceRef[] = [];
  for (const chunk of flags.get("--evidence") ?? []) {
    const colon = chunk.indexOf(":");
    if (colon <= 0) {
      return { args: { command: "help" }, error: `--evidence must be kind:ref (got "${chunk}")` };
    }
    evidence.push({ kind: chunk.slice(0, colon), ref: chunk.slice(colon + 1) });
  }

  for (const [flag, pattern, label] of [
    ["--head-sha", SHA1_RE, "40 lowercase hex"],
    ["--base-sha", SHA1_RE, "40 lowercase hex"],
  ] as const) {
    const v = one(flag);
    if (v !== undefined && !pattern.test(v)) {
      return { args: { command: "help" }, error: `${flag} must be ${label}` };
    }
  }
  for (const flag of ["--expires-at", "--issued-at"] as const) {
    const v = one(flag);
    if (v !== undefined && !ISO_RE.test(v)) {
      return { args: { command: "help" }, error: `${flag} must be ISO-8601 (e.g. 2026-09-13T00:00:00Z)` };
    }
  }

  const actorStr = one("--actor") ?? "founder";
  if (!(ACTOR_VALUES as readonly string[]).includes(actorStr)) {
    return { args: { command: "help" }, error: `--actor must be one of: ${ACTOR_VALUES.join(", ")}` };
  }
  const founderConfirm = flags.has("--founder-confirm");
  const demoFixture = flags.has("--demo-fixture");
  if (founderConfirm && demoFixture) {
    return { args: { command: "help" }, error: "--founder-confirm and --demo-fixture are mutually exclusive" };
  }

  const kindName = one("--kind-name");
  if (kindName !== undefined && kindStr !== "other_named") {
    return { args: { command: "help" }, error: "--kind-name is only valid with --kind other_named" };
  }

  const headSha = one("--head-sha");
  if (kindStr === "merge" && headSha === undefined) {
    return { args: { command: "help" }, error: 'kind "merge" requires --head-sha (40 hex)' };
  }

  return {
    args: {
      command: "seal",
      founderConfirm,
      demoFixture,
      out: one("--out") ?? DEFAULT_ACTS_DIR,
      stdout: flags.has("--stdout"),
      input: {
        kind: kindStr as ActKind,
        subject,
        scope,
        actor: actorStr as "founder" | "demo",
        reason_code: reason,
        evidence_refs: evidence,
        head_sha: headSha,
        base_sha: one("--base-sha"),
        issued_at: one("--issued-at"),
        expires_at: one("--expires-at"),
        kind_name: kindName,
        id: one("--id"),
      },
    },
  };
}

export async function loadAllowlist(path: string = ALLOWLIST_PATH): Promise<string[]> {
  try {
    const text = await readFile(path, "utf8");
    const parsed: unknown = JSON.parse(text);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry): entry is string => typeof entry === "string");
  } catch {
    return [];
  }
}

async function runSeal(args: SealArgs, allowlist: string[]): Promise<number> {
  if (args.input.actor === "founder" && !args.founderConfirm) {
    console.error(
      'refusing to seal with actor "founder" without --founder-confirm.\n' +
      "This flag asserts the human Founder is authorizing THIS act right now.\n" +
      "Agents must not pass it on the Founder's behalf — use --actor demo --demo-fixture for fixtures.",
    );
    return 2;
  }
  if (args.input.actor === "demo" && !args.demoFixture) {
    console.error('refusing to seal with actor "demo" without --demo-fixture (tests only).');
    return 2;
  }

  const sealed = sealAct(args.input, { kindNameAllowlist: allowlist });
  if (!sealed.ok) {
    for (const error of sealed.errors) console.error(`seal refused: ${error}`);
    return 2;
  }
  const act = sealed.act;

  if (args.stdout) {
    console.log(JSON.stringify(act, null, 2));
    return 0;
  }

  const path = join(args.out, `${act.act_sha256}.json`);
  await mkdir(dirname(path), { recursive: true });
  try {
    await writeFile(path, `${JSON.stringify(act, null, 2)}\n`, { flag: "wx" });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("EEXIST")) {
      console.log(`already sealed: ${path}`);
      console.log(`act_sha256=${act.act_sha256}`);
      return 0;
    }
    console.error(`failed to write act file: ${message}`);
    return 2;
  }
  console.log(`sealed act_sha256=${act.act_sha256}`);
  console.log(`body_sha256=${act.body_sha256}`);
  console.log(`file=${path}`);
  console.log(`actor=${act.actor}${act.actor === "demo" ? " (DEMO fixture — not Founder authority)" : ""}`);
  console.log("chat is not authorization; this file is the act.");
  return 0;
}

export async function runCli(argv: readonly string[]): Promise<number> {
  const parsed = parseArgs(argv);
  if (parsed.args.command === "help") {
    if (parsed.error !== undefined) console.error(`error: ${parsed.error}\n`);
    console.log(USAGE);
    return parsed.error !== undefined ? 2 : 0;
  }

  if (parsed.args.command === "seal") {
    return runSeal(parsed.args, await loadAllowlist());
  }

  const resolved = await resolveActToken(parsed.args.token, parsed.args.dir);
  if ("error" in resolved) {
    console.error(resolved.error);
    return parsed.args.command === "verify" ? 1 : 2;
  }
  const result = await verifyActFileWithRevocation(resolved.path, {
    kindNameAllowlist: await loadAllowlist(),
  });

  if (parsed.args.command === "show") {
    if (result.act === undefined) {
      for (const reason of result.reasons) console.error(`reason: ${reason}`);
      return 2;
    }
    console.log(renderShow(result, result.act));
    return 0;
  }

  // verify
  if (parsed.args.json) {
    console.log(JSON.stringify({
      status: result.status,
      act_sha256: result.act?.act_sha256 ?? null,
      actor: result.act?.actor ?? null,
      kind: result.act?.kind ?? null,
      subject: result.act?.subject ?? null,
      founder_authored: result.founderAuthored,
      path: result.path ?? null,
      reasons: result.reasons,
    }, null, 2));
  } else {
    const act = result.act;
    console.log(
      `status=${result.status} ` +
      `act_sha256=${act?.act_sha256 ?? "unknown"} ` +
      `actor=${act?.actor ?? "unknown"} ` +
      `kind=${act?.kind ?? "unknown"} ` +
      `subject="${act?.subject ?? "unknown"}"`,
    );
    if (act !== undefined && act.actor === "demo") {
      console.log('NOTE: actor "demo" — test fixture, NOT Founder authority.');
    }
    for (const reason of result.reasons) console.log(`reason: ${reason}`);
  }
  return result.status === "VALID" ? 0 : 1;
}
