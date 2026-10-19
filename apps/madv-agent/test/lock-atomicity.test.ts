// apps/madv-agent/test/lock-atomicity.test.ts
// BITE PROOF (D5 / F3): the lock can never be observed without its holder pid,
// because the pid is written to a temp file and link(2)'d onto the lock path.
//
// This test pins the ORDER deterministically through an injected fs seam
// rather than sampling a race window: sampling catches a non-atomic
// implementation only sometimes, which is not a proof. With the atomic order
// restored (create-then-write), the first assertion fails every run.

import { describe, expect, test } from "bun:test";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import * as realfs from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { acquireProjectLock, type LockFs } from "../src/lock";

interface FsEvent {
  op: "write" | "link" | "rm" | "unlink" | "mkdir";
  target: string;
  content?: string;
}

function recordingFs(sink: FsEvent[]): LockFs {
  return {
    mkdirSync: ((p: any, o: any) => {
      sink.push({ op: "mkdir", target: String(p) });
      return realfs.mkdirSync(p, o);
    }) as typeof realfs.mkdirSync,
    unlinkSync: ((p: any) => {
      sink.push({ op: "unlink", target: String(p) });
      return realfs.unlinkSync(p);
    }) as typeof realfs.unlinkSync,
    rmSync: ((p: any, o: any) => {
      sink.push({ op: "rm", target: String(p) });
      return realfs.rmSync(p, o);
    }) as typeof realfs.rmSync,
    existsSync: realfs.existsSync,
    readFileSync: realfs.readFileSync,
    writeFileSync: ((p: any, data: any, o: any) => {
      // Reading the SOURCE of a link goes through readFileSync, so any write
      // recorded here is a real write to that path — exactly what the mutant
      // does to the lock path itself.
      sink.push({ op: "write", target: String(p), content: String(data) });
      return realfs.writeFileSync(p, data, o);
    }) as typeof realfs.writeFileSync,
    linkSync: ((src: any, dst: any) => {
      sink.push({
        op: "link",
        target: String(dst),
        content: readFileSync(String(src), "utf8"),
      });
      return realfs.linkSync(src, dst);
    }) as typeof realfs.linkSync,
  };
}

describe("lock atomicity (D5)", () => {
  test("BITE: the lock path is created ONLY by linking a temp file that already holds the pid", () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-lock-atomic-"));
    const events: FsEvent[] = [];
    const lock = acquireProjectLock(dir, recordingFs(events));

    // 1. Nothing is ever WRITTEN to the lock path. A create-then-write
    //    implementation writes "" there first and fails exactly here.
    const writesToLock = events.filter((e) => e.op === "write" && e.target === lock.path);
    expect(writesToLock).toEqual([]);

    // 2. The lock appears exactly once, by link, and the linked source already
    //    contained a complete holder pid at that moment.
    const links = events.filter((e) => e.op === "link" && e.target === lock.path);
    expect(links.length).toBe(1);
    const linkedContent = links[0]?.content ?? "";
    expect(linkedContent).toMatch(/^\d+\n$/);
    expect(Number.parseInt(linkedContent.trim(), 10)).toBe(process.pid);

    // 3. The lock file on disk carries that same pid.
    expect(readFileSync(lock.path, "utf8").trim()).toBe(String(process.pid));

    lock.release();
  });

  test("the temp file is gone after acquisition (no litter beside the lock)", () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-lock-temp-"));
    const lock = acquireProjectLock(dir);
    const parent = join(dir, ".madv-agent");
    const leftovers = realfs
      .readdirSync(parent)
      .filter((name) => name.startsWith(".lock."));
    expect(leftovers).toEqual([]);
    lock.release();
  });

  test("a pre-existing empty lock file is treated as corruption, not as a creation window", () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-lock-empty-"));
    realfs.mkdirSync(join(dir, ".madv-agent"), { recursive: true });
    writeFileSync(join(dir, ".madv-agent", "lock"), "");
    // An empty lock has no parseable holder, so it is reclaimed rather than
    // trusted — the process starts.
    const lock = acquireProjectLock(dir);
    expect(readFileSync(lock.path, "utf8").trim()).toBe(String(process.pid));
    lock.release();
  });
});
