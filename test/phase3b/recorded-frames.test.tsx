import { expect, test } from "bun:test";
import { mkdtempSync, readFileSync, realpathSync, rmSync } from "node:fs";
import { userInfo } from "node:os";
import { join } from "node:path";
import { recordOfflineFrames } from "../../scripts/phase3b/recorded-frames";

test("the healthy offline client's recorded stream renders activation through Founder close", async () => {
  const directory = realpathSync(mkdtempSync(join(realpathSync(userInfo().homedir), ".madbridge-m2-frames-")));
  try {
    const stream = await recordOfflineFrames(directory);
    const persisted = JSON.parse(readFileSync(join(directory, "healthy-stream.json"), "utf8"));
    expect(persisted).toEqual(stream);
    const first = stream.snapshots[0]!;
    expect(first.phase).toBe("active");
    expect(first.executions?.every(execution => execution.state === "ready")).toBe(true);
    expect(first.eventLog.some(row => row.type === "session_activated")).toBe(true);
    const frames = readFileSync(join(directory, "healthy-frames.txt"), "utf8");
    expect(frames).toContain("session active");
    expect(frames).toContain("session_activated");
    expect(frames).toContain("GOVERNANCE");
    expect(frames).toContain("session_open");
    expect(frames).toContain("tok:—");
    let previous = 0;
    for (const snapshot of stream.snapshots) {
      expect(snapshot.snapshotSeq).toBeGreaterThan(previous);
      previous = snapshot.snapshotSeq!;
      for (const view of ["builder", "governance", "events"]) expect(frames).toContain("Offline | snapshot " + previous + " | " + view);
      expect(frames).toContain("session " + snapshot.phase);
    }
    expect(stream.founderClose).toBe("completed");
    for (const closed of stream.snapshots.filter(s => s.phase === "closed")) {
      expect(closed.eventLog.some(row => row.type === "session_closed")).toBe(true);
    }
    expect(stream.ending).toMatch(/read rejected|returned connected false|final post-close read returned a snapshot/);
  } finally { rmSync(directory, { recursive: true, force: true }); }
}, 20_000);
