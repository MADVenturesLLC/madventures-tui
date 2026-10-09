import { closeSync, constants, fstatSync, mkdirSync, openSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import {
  capabilityRecordFilename,
  evaluateCapabilityFreshness,
  parseCapabilityRecord,
  parseSurfaceId,
  type CapabilityRecordV1,
  type ObservedSurfaceFacts,
  type SurfaceId,
} from "@madventures/protocol";
import { validateStorageRoot } from "./storage-root";

export class CapabilityStoreError extends Error {
  constructor(
    public readonly kind: "invalid_root" | "exists" | "unsafe_entry" | "malformed_record" | "surface_mismatch" | "filename_mismatch",
    public readonly entry: string,
  ) {
    super(`capability store rejected: ${kind} (${entry})`);
    this.name = "CapabilityStoreError";
  }
}

function validatePath(path: string, repositoryRoot: string, worktree: string): void {
  try {
    if (validateStorageRoot(path, repositoryRoot, worktree).ok) return;
  } catch {
    // Filesystem failures have the same content-free invalid-root boundary.
  }
  throw new CapabilityStoreError("invalid_root", basename(path));
}

export function writeCapabilityRecord(
  root: string,
  repositoryRoot: string,
  worktree: string,
  record: CapabilityRecordV1,
): string {
  const parsed = parseCapabilityRecord(record as unknown as Record<string, unknown>);
  const directory = join(root, "capability", parsed.surface);
  validatePath(root, repositoryRoot, worktree);
  validatePath(directory, repositoryRoot, worktree);
  try {
    mkdirSync(directory, { recursive: true, mode: 0o700 });
  } catch {
    throw new CapabilityStoreError("invalid_root", basename(directory));
  }
  validatePath(root, repositoryRoot, worktree);
  validatePath(directory, repositoryRoot, worktree);
  const entry = capabilityRecordFilename(parsed);
  const file = join(directory, entry);
  try {
    writeFileSync(file, `${JSON.stringify(parsed)}\n`, { flag: "wx", mode: 0o600 });
  } catch (error) {
    throw new CapabilityStoreError((error as NodeJS.ErrnoException).code === "EEXIST" ? "exists" : "invalid_root", entry);
  }
  return file;
}

export function readCapabilityRecords(
  root: string,
  repositoryRoot: string,
  worktree: string,
  surface: SurfaceId,
): ReadonlyArray<CapabilityRecordV1> {
  const parsedSurface = parseSurfaceId(surface);
  const directory = join(root, "capability", parsedSurface);
  validatePath(root, repositoryRoot, worktree);
  validatePath(directory, repositoryRoot, worktree);
  let entries: string[];
  try {
    entries = readdirSync(directory);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw new CapabilityStoreError("invalid_root", basename(directory));
  }
  const records: { entry: string; record: CapabilityRecordV1 }[] = [];
  for (const entry of entries) {
    const match = /^((?:\d{4}|[+-]\d{6})-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)-[0-9a-f]{12}\.json$/.exec(entry);
    const timestamp = match?.[1];
    const ms = timestamp === undefined ? NaN : Date.parse(timestamp);
    if (!Number.isFinite(ms) || new Date(ms).toISOString() !== timestamp) {
      throw new CapabilityStoreError("unsafe_entry", entry);
    }
    let fd: number;
    try {
      // No symlink following or FIFO blocking between enumeration and inspection.
      fd = openSync(join(directory, entry), constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
    } catch {
      throw new CapabilityStoreError("unsafe_entry", entry);
    }
    let content: string;
    try {
      if (!fstatSync(fd).isFile()) throw new CapabilityStoreError("unsafe_entry", entry);
      content = readFileSync(fd, "utf8");
    } catch {
      throw new CapabilityStoreError("unsafe_entry", entry);
    } finally {
      closeSync(fd);
    }
    let record: CapabilityRecordV1;
    try {
      record = parseCapabilityRecord(JSON.parse(content));
    } catch {
      throw new CapabilityStoreError("malformed_record", entry);
    }
    if (record.surface !== parsedSurface) throw new CapabilityStoreError("surface_mismatch", entry);
    if (capabilityRecordFilename(record) !== entry) throw new CapabilityStoreError("filename_mismatch", entry);
    records.push({ entry, record });
  }
  records.sort((a, b) => Date.parse(b.record.evaluated_at) - Date.parse(a.record.evaluated_at)
    || (a.entry < b.entry ? 1 : a.entry > b.entry ? -1 : 0));
  return records.map(({ record }) => record);
}

export function latestFreshRecord(
  root: string,
  repositoryRoot: string,
  worktree: string,
  surface: SurfaceId,
  now: string,
  observed: ObservedSurfaceFacts,
): CapabilityRecordV1 | null {
  const latest = readCapabilityRecords(root, repositoryRoot, worktree, surface)[0];
  if (latest === undefined) return null;
  return evaluateCapabilityFreshness(latest, now, observed).fresh ? latest : null;
}
