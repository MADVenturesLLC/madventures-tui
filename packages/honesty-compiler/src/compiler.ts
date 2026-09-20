// packages/honesty-compiler/src/compiler.ts
// Orchestrates the four passes:
//   P0 parse → P1 rung typecheck → P2 evidence bind → P3 emit → P4 report.
// Deterministic exits: 0 = every declared claim is rung-legal AND
// evidence-bound (verdict is not FAIL); 1 = the verdict is FAIL; 2 is a
// tooling error (the compiler could not run honestly) and is returned as
// { ok: false } here — no verdict is invented for a broken tooling world.

import { FixtureMemoryStore, MEMORY_STORE_FORMAT, sha256Hex, validateBuildMemoryRecord, type MemoryStore } from "@mad/build-memory";
// bun cannot resolve the "@mad/build-memory/node" subpath export through the
// workspace symlink, so the fs-backed store is imported by path — same
// module, same semantics, read-only reuse.
import { JsonFileMemoryStore } from "../../build-memory/src/node-store";
import type { VerdictRecord } from "@mad/single-verdict";
import { relative, resolve } from "node:path";

import { bindEvidence, type BindContext, type BoundClaim, type SkipNote } from "./bind";
import { emitVerdict } from "./emit";
import { COMPILER_NOT_EVIDENCE_OF, type Issue } from "./ir";
import { parseClaimsDocument } from "./parse";
import { confineToRoot, gitHeadSha, readTextFile } from "./node-io";
import { rungCheck } from "./rung";

export type CompileMode = "fixture" | "live";

export type CompileOptions = {
  mode: CompileMode;
  /** confinement root — the repo/working directory */
  rootDir: string;
  /** display label and markdown detector for the claims input */
  sourceLabel: string;
  /** directory of the claims input; argus_packet paths resolve against it */
  inputDir: string;
  claimsText: string;
  /** live mode store override; default .mad/build-memory.json under rootDir */
  storePath?: string;
  /** fixture mode store override; default the package's sealed fixture */
  fixtureStorePath?: string;
  /** ISO-8601 timestamp pin for deterministic goldens; real time if omitted */
  now?: string;
};

export type ClaimOutcome = {
  id: string;
  kind: string;
  status: "OK" | "FAIL";
  issues: Issue[];
};

export type CompileResult = {
  mode: CompileMode;
  input: string;
  exit_code: 0 | 1;
  verdict: VerdictRecord;
  claims: ClaimOutcome[];
  failures: Issue[];
  skips: SkipNote[];
  subject: string | null;
  head_sha: string | null;
  not_evidence_of: readonly string[];
};

export type CompileOutcome = { ok: true; result: CompileResult } | { ok: false; issue: Issue };

const DEFAULT_LIVE_STORE = ".mad/build-memory.json";
const FIXTURE_STORE_RELATIVE = "../fixtures/build-memory/fixture-store.json";

function confineStorePath(rootDir: string, rawPath: string): { path: string; display: string } | { issue: Issue } {
  const confined = confineToRoot(rootDir, rawPath, "store path");
  if ("issue" in confined) return confined;
  // Emitted verdict refs and reports carry the root-relative path so
  // records stay portable across machines; absolute when outside root.
  const rel = relative(resolve(rootDir), confined.path);
  const display = rel.length > 0 && !rel.startsWith("..") ? rel : confined.path;
  return { path: confined.path, display };
}

function loadFixtureStore(options: CompileOptions): { store: MemoryStore; path: string; sha256: string } | { issue: Issue } {
  const raw = options.fixtureStorePath ?? `${import.meta.dir}/${FIXTURE_STORE_RELATIVE}`;
  const confined = confineStorePath(options.rootDir, raw);
  if ("issue" in confined) return confined;
  const path = confined.path;
  const file = readTextFile(path, "sealed build-memory fixture");
  if ("issue" in file) return file;
  let parsed: unknown;
  try {
    parsed = JSON.parse(file.text) as unknown;
  } catch (err) {
    return { issue: { code: "FIXTURE_UNPARSEABLE", message: `sealed fixture ${confined.display} is not JSON: ${err instanceof Error ? err.message : String(err)}` } };
  }
  try {
    return { store: FixtureMemoryStore.load(parsed), path: confined.display, sha256: sha256Hex(file.text) };
  } catch (err) {
    return { issue: { code: "FIXTURE_SEAL_BROKEN", message: `sealed fixture ${confined.display} failed verification: ${err instanceof Error ? err.message : String(err)}` } };
  }
}

function loadLiveStore(options: CompileOptions): { store: MemoryStore; path: string; sha256: string } | { issue: Issue } {
  const raw = options.storePath ?? `${options.rootDir}/${DEFAULT_LIVE_STORE}`;
  const confined = confineStorePath(options.rootDir, raw);
  if ("issue" in confined) return confined;
  const path = confined.path;
  const file = readTextFile(path, "build-memory store");
  if ("issue" in file && file.issue.code !== "FILE_UNREADABLE") return file;
  // A missing store is a legal state: every subject is UNKNOWN and claims
  // fail closed at bind. Only a present-but-malformed store is a tooling
  // failure — validated here so it never crashes later during bind.
  if ("issue" in file) {
    return { store: new JsonFileMemoryStore(path), path: confined.display, sha256: sha256Hex("{}") };
  }
  const text = file.text;
  let parsed: unknown;
  try {
    parsed = JSON.parse(text) as unknown;
  } catch (err) {
    return { issue: { code: "STORE_UNPARSEABLE", message: `build-memory store ${confined.display} is not JSON: ${err instanceof Error ? err.message : String(err)}` } };
  }
  if (typeof parsed !== "object" || parsed === null) {
    return { issue: { code: "STORE_MALFORMED", message: `build-memory store ${confined.display} is not an object` } };
  }
  const fileObj = parsed as Record<string, unknown>;
  if (fileObj["format"] !== MEMORY_STORE_FORMAT) {
    return {
      issue: {
        code: "STORE_MALFORMED",
        message: `build-memory store ${confined.display} has format ${JSON.stringify(fileObj["format"])} — expected ${MEMORY_STORE_FORMAT}`,
      },
    };
  }
  const recordsRaw = fileObj["records"];
  if (typeof recordsRaw !== "object" || recordsRaw === null) {
    return { issue: { code: "STORE_MALFORMED", message: `build-memory store ${confined.display} has no records object` } };
  }
  for (const [subject, entry] of Object.entries(recordsRaw as Record<string, unknown>)) {
    if (typeof entry !== "object" || entry === null) {
      return { issue: { code: "STORE_MALFORMED", message: `build-memory store ${confined.display} entry for ${JSON.stringify(subject)} is not an object` } };
    }
    const record = (entry as Record<string, unknown>)["record"];
    const issues = validateBuildMemoryRecord(record);
    if (issues.length > 0) {
      return {
        issue: {
          code: "STORE_MALFORMED",
          message: `build-memory store ${confined.display} record for ${JSON.stringify(subject)} is invalid: ${issues.map((i: { code: string; message: string; path?: string }) => `${i.code}${i.path ? `@${i.path}` : ""} (${i.message})`).join("; ")}`,
        },
      };
    }
  }
  return { store: new JsonFileMemoryStore(path), path: confined.display, sha256: sha256Hex(text) };
}

function claimOutcomes(bounds: readonly BoundClaim[], issues: readonly Issue[]): ClaimOutcome[] {
  const failByIndex = new Map<number, Issue[]>();
  for (const issue of issues) {
    const match = issue.path?.match(/^claims\[(\d+)\]/);
    if (match === null || match === undefined) continue;
    const index = Number(match[1]);
    const list = failByIndex.get(index) ?? [];
    list.push(issue);
    failByIndex.set(index, list);
  }
  return bounds.map((bound) => {
    const claimIssues = failByIndex.get(bound.index) ?? [];
    return {
      id: bound.claim.id,
      kind: bound.claim.kind,
      status: claimIssues.length > 0 ? ("FAIL" as const) : ("OK" as const),
      issues: claimIssues,
    };
  });
}

/** Run P0–P3 and hand back a compile result, or a tooling failure. */
export async function compileClaims(options: CompileOptions): Promise<CompileOutcome> {
  // Tooling world: head + store must exist before any claim is judged.
  let headSha: string | null = null;
  if (options.mode === "live") {
    const head = gitHeadSha(options.rootDir);
    if ("issue" in head) return { ok: false, issue: head.issue };
    headSha = head.sha;
  }
  const loaded = options.mode === "fixture" ? loadFixtureStore(options) : loadLiveStore(options);
  if ("issue" in loaded) return { ok: false, issue: loaded.issue };
  const ctx: BindContext = {
    mode: options.mode,
    store: loaded.store,
    storePath: loaded.path,
    storeSha256: loaded.sha256,
    headSha,
    rootDir: options.rootDir,
    inputDir: options.inputDir,
  };

  // P0 parse
  const parsed = parseClaimsDocument(options.claimsText, options.sourceLabel);
  if (parsed.claims === null) {
    const verdict = emitVerdict([], ctx, parsed.issues, options.now);
    return {
      ok: true,
      result: {
        mode: options.mode,
        input: options.sourceLabel,
        exit_code: 1,
        verdict,
        claims: [],
        failures: parsed.issues,
        skips: [],
        subject: null,
        head_sha: headSha,
        not_evidence_of: COMPILER_NOT_EVIDENCE_OF,
      },
    };
  }
  const claims = parsed.claims;

  // P1 rung typecheck
  const rungIssues = rungCheck(claims);
  if (rungIssues.length > 0) {
    const verdict = emitVerdict([], ctx, [...parsed.issues, ...rungIssues], options.now);
    return {
      ok: true,
      result: {
        mode: options.mode,
        input: options.sourceLabel,
        exit_code: 1,
        verdict,
        claims: claims.map((claim) => ({ id: claim.id, kind: claim.kind, status: "FAIL" as const, issues: [] })),
        failures: rungIssues,
        skips: [],
        subject: claims[0]?.subject ?? null,
        head_sha: headSha,
        not_evidence_of: COMPILER_NOT_EVIDENCE_OF,
      },
    };
  }

  // P2 evidence bind
  const bound = await bindEvidence(claims, ctx);
  if (bound.issues.length > 0) {
    const verdict = emitVerdict(bound.bounds, ctx, bound.issues, options.now);
    return {
      ok: true,
      result: {
        mode: options.mode,
        input: options.sourceLabel,
        exit_code: 1,
        verdict,
        claims: claimOutcomes(bound.bounds, bound.issues),
        failures: bound.issues,
        skips: bound.skips,
        subject: claims[0]?.subject ?? null,
        head_sha: headSha,
        not_evidence_of: COMPILER_NOT_EVIDENCE_OF,
      },
    };
  }

  // P3 emit (all claims legal and bound)
  const verdict = emitVerdict(bound.bounds, ctx, [], options.now);
  return {
    ok: true,
    result: {
      mode: options.mode,
      input: options.sourceLabel,
      exit_code: verdict.verdict === "VERIFY_FAIL" ? 1 : 0,
      verdict,
      claims: claimOutcomes(bound.bounds, []),
      failures: [],
      skips: bound.skips,
      subject: claims[0]?.subject ?? null,
      head_sha: headSha,
      not_evidence_of: COMPILER_NOT_EVIDENCE_OF,
    },
  };
}
