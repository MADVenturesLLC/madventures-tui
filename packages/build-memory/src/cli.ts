#!/usr/bin/env bun
// packages/build-memory/src/cli.ts
// `mad-build-memory` — status | record | invalidate | list | seal
//
// Pure argument parsing and orchestration: NO direct fs or git access lives
// here. Every operator-supplied path and the git HEAD lookup go through
// src/node-store.ts, which confines paths to the working directory before
// touching them. This tool makes no network requests of any kind.
//
// status exits 1 on anything that is not VALID, so a shell pipeline can gate
// on it. list is factual only (recorded state), never a computed pass/fail —
// computing statuses requires a current head per subject.

import {
  BuildMemoryError,
  evaluateMemoryStatus,
  isValidContentSha,
  isValidHeadSha,
  MEMORY_FIXTURE_FORMAT,
  sealFixture,
  type BuildMemoryRecord,
  type EvidenceRef,
  type EvidenceRefKind,
  type FixtureFile,
} from "./index";
import {
  confineToCwd,
  currentGitHeadSha,
  JsonFileMemoryStore,
  readRecordsFileForSeal,
  writeSealedFixtureFile,
} from "./node-store";

const USAGE = `mad-build-memory — Verified Build Memory v0

usage:
  mad-build-memory status     <subject> [--head <sha40>] [--tree <sha64>] [--store <path>]
  mad-build-memory record     <subject> --head <sha40> [--tree <sha64>] [--verified-at <iso>]
                              [--evidence <kind>:<path>:<sha64>]... [--verdict-ref <id>] [--store <path>]
  mad-build-memory invalidate <subject> --reason <text> [--store <path>]
  mad-build-memory list       [--store <path>]
  mad-build-memory seal       --records-in <store.json> --out <fixture.json>

status exit codes: 0 = VALID, 1 = STALE | UNKNOWN | INVALIDATED, 2 = usage or contract error.

store defaults to .mad/build-memory.json. When --head is omitted for status,
the current git HEAD of the working directory is used. All paths must stay
inside the current working directory.
`;

function fail(message: string): never {
  process.stderr.write(`error: ${message}\n`);
  process.exit(2);
}

type ParsedArgs = { positional: string[]; flags: Map<string, string | boolean> };

export function parseArgs(argv: string[]): ParsedArgs {
  const args: ParsedArgs = { positional: [], flags: new Map() };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === undefined) break;
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith("--")) {
        args.flags.set(key, next);
        i++;
      } else {
        args.flags.set(key, true);
      }
    } else {
      args.positional.push(a);
    }
  }
  return args;
}

function flag(args: ParsedArgs, key: string): string | undefined {
  const v = args.flags.get(key);
  return typeof v === "string" ? v : undefined;
}

function parseEvidenceRefs(values: string[]): EvidenceRef[] {
  return values.map((raw) => {
    const parts = raw.split(":");
    if (parts.length !== 3) fail(`--evidence must be <kind>:<path>:<sha64>, got ${JSON.stringify(raw)}`);
    const kind = parts[0];
    const path = parts[1];
    const sha = parts[2];
    if (kind === undefined || path === undefined || sha === undefined || kind.length === 0 || path.length === 0) {
      fail(`--evidence must be <kind>:<path>:<sha64>, got ${JSON.stringify(raw)}`);
    }
    if (!isValidContentSha(sha)) fail(`--evidence sha256 must be 64 lowercase hex chars, got ${sha}`);
    return { kind: kind as EvidenceRefKind, path, sha256: sha };
  });
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));
  const command = args.positional[0];
  const storePath = confineToCwd(flag(args, "store") ?? ".mad/build-memory.json", "--store");

  if (command === "status") {
    const subject = args.positional[1];
    if (subject === undefined) fail("status requires a <subject>");
    const store = new JsonFileMemoryStore(storePath);
    const entry = store.lookup(subject);
    const head = flag(args, "head") ?? currentGitHeadSha();
    if (!isValidHeadSha(head)) fail("--head must be 40 lowercase hex chars");
    const tree = flag(args, "tree");
    if (tree !== undefined && !isValidContentSha(tree)) fail("--tree must be 64 lowercase hex chars");
    const result = evaluateMemoryStatus(entry, subject, tree !== undefined ? { head_sha: head, index_tree: tree } : { head_sha: head });
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    process.exit(result.status === "VALID" ? 0 : 1);
  }

  if (command === "record") {
    const subject = args.positional[1];
    if (subject === undefined) fail("record requires a <subject>");
    const head = flag(args, "head") ?? currentGitHeadSha();
    if (!isValidHeadSha(head)) fail("--head must be 40 lowercase hex chars");
    const evidenceValues: string[] = [];
    for (const [key, value] of args.flags) {
      if (key === "evidence" && typeof value === "string") evidenceValues.push(value);
    }
    if (evidenceValues.length === 0) fail("record requires at least one --evidence <kind>:<path>:<sha64>");
    const record: BuildMemoryRecord = {
      subject,
      head_sha: head,
      verified_at: flag(args, "verified-at") ?? new Date().toISOString(),
      evidence_refs: parseEvidenceRefs(evidenceValues),
    };
    const tree = flag(args, "tree");
    if (tree !== undefined) {
      if (!isValidContentSha(tree)) fail("--tree must be 64 lowercase hex chars");
      record.index_tree = tree;
    }
    const verdictRef = flag(args, "verdict-ref");
    if (verdictRef !== undefined) record.verdict_ref = verdictRef;
    const store = new JsonFileMemoryStore(storePath);
    store.write(record);
    process.stdout.write(`recorded ${subject} @ ${head} (store: ${storePath})\n`);
    return;
  }

  if (command === "invalidate") {
    const subject = args.positional[1];
    if (subject === undefined) fail("invalidate requires a <subject>");
    const reason = flag(args, "reason") ?? "operator invalidation";
    const store = new JsonFileMemoryStore(storePath);
    store.invalidate(subject, reason);
    process.stdout.write(`invalidated ${subject} (store: ${storePath})\n`);
    return;
  }

  if (command === "list") {
    const store = new JsonFileMemoryStore(storePath);
    const entries = store.list();
    process.stdout.write(`format: mad.build-memory/v0  store: ${storePath}  subjects: ${String(entries.length)}\n`);
    for (const entry of entries) {
      const r = entry.record;
      const inv = entry.invalidated !== undefined ? `INVALIDATED (${entry.invalidated.reason} @ ${entry.invalidated.at})` : "-";
      process.stdout.write(`${r.subject}  head=${r.head_sha}  verified_at=${r.verified_at}  evidence=${String(r.evidence_refs.length)}  ${inv}\n`);
    }
    return;
  }

  if (command === "seal") {
    const input = flag(args, "records-in");
    const out = flag(args, "out");
    if (input === undefined || out === undefined) fail("seal requires --records-in <path> --out <path>");
    const rows = readRecordsFileForSeal(input);
    if (Object.keys(rows).length === 0) fail("refusing to seal an empty fixture");
    const fixture: FixtureFile = sealFixture(rows);
    writeSealedFixtureFile(out, fixture);
    process.stdout.write(`sealed ${String(Object.keys(rows).length)} rows → ${out} (format ${MEMORY_FIXTURE_FORMAT}, seal ${fixture.sealed_sha256})\n`);
    return;
  }

  process.stderr.write(USAGE);
  process.exit(2);
}

if (import.meta.main) {
  try {
    main();
  } catch (err) {
    if (err instanceof BuildMemoryError) {
      process.stderr.write(`error: ${err.message}\n`);
      process.exit(2);
    }
    throw err;
  }
}
