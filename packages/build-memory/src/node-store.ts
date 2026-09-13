// packages/build-memory/src/node-store.ts
// Node/bun-only I/O module for @mad/build-memory: the fs-backed store, the
// CLI's file and git access, and cwd confinement. The browser entry never
// imports this file; src/cli.ts contains NO direct fs or git access — every
// operator-supplied path is resolved and confined to the working directory
// here, before any read or write.
//
// Atomic single-file durability for v0: one JSON file, human-readable,
// diffable. NOT a ledger and NOT append-only.

import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";

import {
  BuildMemoryError,
  MEMORY_STORE_FORMAT,
  parseBuildMemoryRecord,
  validateBuildMemoryRecord,
  type BuildMemoryRecord,
  type FixtureFile,
  type MemoryStore,
  type StoredEntry,
} from "./index";

export const MEMORY_STORE_FORMAT_V0 = MEMORY_STORE_FORMAT;

type StoreFile = {
  format: typeof MEMORY_STORE_FORMAT;
  records: Record<string, StoredEntry>;
};

/** Resolve an operator-supplied path and refuse anything outside cwd. */
export function confineToCwd(rawPath: string, label: string): string {
  const resolved = resolve(rawPath);
  const cwd = process.cwd();
  if (resolved !== cwd && !resolved.startsWith(cwd + sep)) {
    throw new BuildMemoryError([{ code: "NOT_AN_OBJECT", message: `${label} must stay inside the working directory (${cwd}) — refused: ${rawPath}` }]);
  }
  return resolved;
}

/** Current git HEAD of the working directory, or a typed failure. */
export function currentGitHeadSha(): string {
  const proc = Bun.spawnSync(["git", "rev-parse", "HEAD"], { stdout: "pipe", stderr: "pipe" });
  const out = proc.stdout.toString().trim();
  if (proc.exitCode !== 0 || !/^[0-9a-f]{40}$/.test(out)) {
    throw new BuildMemoryError([{ code: "BAD_HEAD_SHA", message: "could not read git HEAD in the current working directory" }]);
  }
  return out;
}

function parseStoredEntry(value: unknown): StoredEntry {
  if (typeof value !== "object" || value === null) {
    throw new BuildMemoryError([{ code: "NOT_AN_OBJECT", message: "stored entry must be an object" }]);
  }
  const e = value as Record<string, unknown>;
  const stored: StoredEntry = { record: parseBuildMemoryRecord(e["record"]) };
  const inv = e["invalidated"];
  if (typeof inv === "object" && inv !== null) {
    const r = inv as Record<string, unknown>;
    if (typeof r["reason"] === "string" && typeof r["at"] === "string") stored.invalidated = { reason: r["reason"], at: r["at"] };
  }
  return stored;
}

/**
 * Read a records JSON file ({ format, records: { subject: { record } } }) for
 * `seal`. Path is confined to cwd. Returns parsed rows, validated.
 */
export function readRecordsFileForSeal(rawPath: string): Record<string, StoredEntry> {
  const path = confineToCwd(rawPath, "records file");
  let text: string;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    throw new BuildMemoryError([{ code: "NOT_AN_OBJECT", message: `cannot read records file ${path}` }]);
  }
  const parsed: unknown = JSON.parse(text);
  if (typeof parsed !== "object" || parsed === null) {
    throw new BuildMemoryError([{ code: "NOT_AN_OBJECT", message: `${path} is not an object` }]);
  }
  const file = parsed as Record<string, unknown>;
  const recordsRaw = file["records"];
  if (typeof recordsRaw !== "object" || recordsRaw === null) {
    throw new BuildMemoryError([{ code: "NOT_AN_OBJECT", message: `${path} has no records object` }]);
  }
  const rows: Record<string, StoredEntry> = {};
  for (const [subject, entry] of Object.entries(recordsRaw as Record<string, unknown>)) {
    rows[subject] = parseStoredEntry(entry);
  }
  return rows;
}

/** Write a sealed fixture JSON. Path is confined to cwd. */
export function writeSealedFixtureFile(rawPath: string, fixture: FixtureFile): void {
  const path = confineToCwd(rawPath, "fixture output");
  writeFileSync(path, `${JSON.stringify(fixture, null, 2)}\n`, "utf8");
}

export class JsonFileMemoryStore implements MemoryStore {
  readonly #filePath: string;
  #cache: StoreFile | null = null;

  /**
   * @param rawFilePath absolute or cwd-relative path. The CLI confines
   * operator-supplied paths with `confineToCwd` before constructing a store;
   * this class trusts its caller the way any fs wrapper does.
   */
  constructor(rawFilePath: string) {
    this.#filePath = resolve(rawFilePath);
  }

  #load(): StoreFile {
    if (this.#cache !== null) return this.#cache;
    let raw: string;
    try {
      raw = readFileSync(this.#filePath, "utf8");
    } catch {
      this.#cache = { format: MEMORY_STORE_FORMAT, records: {} };
      return this.#cache;
    }
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) {
      throw new BuildMemoryError([{ code: "NOT_AN_OBJECT", message: `store file ${this.#filePath} is not an object` }]);
    }
    const file = parsed as Record<string, unknown>;
    if (file["format"] !== MEMORY_STORE_FORMAT) {
      throw new BuildMemoryError([
        { code: "NOT_AN_OBJECT", message: `store file ${this.#filePath} has format ${JSON.stringify(file["format"])} — expected ${MEMORY_STORE_FORMAT}` },
      ]);
    }
    const recordsRaw = file["records"];
    if (typeof recordsRaw !== "object" || recordsRaw === null) {
      throw new BuildMemoryError([{ code: "NOT_AN_OBJECT", message: `store file ${this.#filePath} has no records object` }]);
    }
    const records: Record<string, StoredEntry> = {};
    for (const [subject, entry] of Object.entries(recordsRaw as Record<string, unknown>)) {
      records[subject] = parseStoredEntry(entry);
    }
    this.#cache = { format: MEMORY_STORE_FORMAT, records };
    return this.#cache;
  }

  #save(): void {
    // First-run bootstrap: a fresh store's parent directory (e.g. .mad/)
    // may not exist yet — create it so the very first record succeeds.
    mkdirSync(dirname(this.#filePath), { recursive: true });
    const tmp = `${this.#filePath}.tmp-${String(process.pid)}`;
    writeFileSync(tmp, `${JSON.stringify(this.#load(), null, 2)}\n`, "utf8");
    renameSync(tmp, this.#filePath);
  }

  lookup(subject: string): StoredEntry | null {
    return this.#load().records[subject] ?? null;
  }

  write(record: BuildMemoryRecord): void {
    const issues = validateBuildMemoryRecord(record);
    if (issues.length > 0) throw new BuildMemoryError(issues);
    const file = this.#load();
    file.records[record.subject] = { record };
    this.#save();
  }

  invalidate(subject: string, reason: string): void {
    const file = this.#load();
    const entry = file.records[subject];
    if (entry === undefined) {
      throw new BuildMemoryError([{ code: "MISSING_SUBJECT", message: `cannot invalidate unknown subject ${JSON.stringify(subject)}`, path: "subject" }]);
    }
    entry.invalidated = { reason, at: new Date().toISOString() };
    this.#save();
  }

  list(): StoredEntry[] {
    return Object.values(this.#load().records);
  }
}
