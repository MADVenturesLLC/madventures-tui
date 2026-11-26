import { linkSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { act } from "react";
import { testRender } from "@opentui/react/test-utils";
import type { BrokerClient, BrokerSnapshot } from "@madventures/broker";
import { App } from "../../apps/madbridge/src/tui/App";
import type { BrokerSnapshot as Projection } from "../../apps/madbridge/src/tui/types";
import { composeLiveSession } from "../../apps/madbridge/src/tui/live/composition";
import { clientSnapshotToProjection } from "../../apps/madbridge/src/tui/live/projection";
import { prepareM2 } from "../../test/phase3b/m2-offline";

async function recordStream() {
  const f = prepareM2("claude-code", false, "Founder close");
  const snapshots: BrokerSnapshot[] = [];
  let client: BrokerClient | undefined;
  try {
    const outcome = await composeLiveSession({ ...f.start, async present(presented) {
      client = presented;
      snapshots.push(await presented.getSnapshot());
    } });
    if (outcome.exitCode !== 0) throw new Error("offline composition failed at " + outcome.component);
    let settled = false;
    const closing = outcome.close().finally(() => { settled = true; });
    try {
      if (!client) throw new Error("offline client was not presented");
      const deadline = performance.now() + 8000;
      let ending = "";
      while (!ending) {
        const afterClose = settled;
        try {
          const snapshot = await client.getSnapshot();
          snapshots.push(snapshot);
          if (snapshot.connected === false) ending = "client returned connected false";
          else if (afterClose) ending = "final post-close read returned a snapshot";
        } catch {
          ending = afterClose ? "post-close snapshot read rejected" : "snapshot read rejected during close";
        }
        if (!ending && snapshots.length > 2) {
          if (performance.now() >= deadline) throw new Error("offline snapshot deadline");
          await Bun.sleep(2);
        }
      }
      await closing;
      return { snapshots, ending, founderClose: "completed" as const };
    } finally { await closing; }
  } finally { f.dispose(); }
}

async function render(snapshots: readonly BrokerSnapshot[]) {
  let deliver: ((snapshot: Projection) => void) | undefined;
  const screen = await testRender(<App subscribe={listener => {
    deliver = listener;
    return () => { deliver = undefined; };
  }} catalogLoader={async () => ({ status: "ok", models: [] })} />, { width: 160, height: 38 });
  const frames: string[] = [];
  try {
    await act(async () => { await screen.flush(); });
    if (!deliver) throw new Error("offline frame subscription missing");
    const notify = deliver;
    for (const snapshot of snapshots) {
      await act(async () => { notify(clientSnapshotToProjection(snapshot)); });
      for (const [key, view] of [["1", "builder"], ["3", "governance"], ["5", "events"]] as const) {
        await act(async () => { screen.mockInput.pressKey(key, { meta: true }); });
        await screen.flush();
        await screen.flush();
        const frame = screen.captureCharFrame().split("\n").map(line => line.trimEnd()).join("\n").trimEnd();
        frames.push("Offline | snapshot " + snapshot.snapshotSeq + " | " + view + "\n" + frame);
      }
    }
  } finally { await act(async () => { screen.renderer.destroy(); }); }
  return frames.join("\n\n") + "\n";
}

export async function recordOfflineFrames(directory: string) {
  const stream = await recordStream();
  if (stream.snapshots[0]?.phase !== "active" ||
      !stream.snapshots[0].eventLog.some(row => row.type === "session_activated")) {
    throw new Error("offline activation evidence missing");
  }
  const options = { mode: 0o600, flag: "wx" } as const;
  const staging = mkdtempSync(join(directory, ".frames-"));
  try {
    const raw = join(staging, "healthy-stream.json"), rendered = join(staging, "healthy-frames.txt");
    writeFileSync(raw, JSON.stringify(stream, null, 2) + "\n", options);
    const recorded: typeof stream = JSON.parse(readFileSync(raw, "utf8"));
    writeFileSync(rendered, await render(recorded.snapshots), options);
    const target = join(directory, "healthy-stream.json");
    linkSync(raw, target);
    try { linkSync(rendered, join(directory, "healthy-frames.txt")); }
    catch (error) { rmSync(target); throw error; }
    return recorded;
  } finally { rmSync(staging, { recursive: true, force: true }); }
}

if (import.meta.main) {
  const directory = process.argv[2];
  if (!directory) throw new Error("An evidence directory is required.");
  const stream = await recordOfflineFrames(directory);
  console.log("Offline healthy-stream.json and healthy-frames.txt");
  console.log("Snapshots", stream.snapshots.length, "ending", stream.ending);
}
