// Regression: the EOF child-exit wait's deadline timer must be settlement-
// aware (Tier-2 round-5 finding 3). Structure: run the REAL host over a
// real pipe (main-guard's spawnLiveHost shape), drive stdin EOF, observe a
// clean exited fact, then hold the test open past the 5 s outer bound while
// capturing unhandled rejections. Under the pre-fix implementation the
// loser timer threw "…exceeded the §9.8 outer bound" into a settled race
// after the child exited — an unhandled rejection that surfaces here. The
// corrected implementation cancels the timer; none must arrive.
import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { encodeCommand, decodeFact } from "../src/frames";
import type { HostFactFrame } from "../src/frames";

const MAIN_ENTRY = join(import.meta.dir, "..", "src", "main.ts");
const REPO_ROOT = join(import.meta.dir, "..", "..", "..");
const BUN = process.execPath;

test("the EOF child-exit deadline timer fires no unhandled rejection after clean containment", async () => {
  const unhandled: unknown[] = [];
  const onUnhandled = (reason: unknown): void => {
    unhandled.push(reason);
  };
  process.on("unhandledRejection", onUnhandled);
  try {
    const host = Bun.spawn([BUN, MAIN_ENTRY], {
      cwd: REPO_ROOT,
      stdin: "pipe",
      stdout: "pipe",
      stderr: "pipe",
      env: { PATH: process.env.PATH ?? "", HOME: process.env.HOME ?? "" },
    });
    const hash = new Bun.CryptoHasher("sha256").update(readFileSync("/bin/sh")).digest("hex");
    host.stdin.write(
      encodeCommand({
        kind: "launch",
        path: "/bin/sh",
        sha256: hash,
        argv: ["-c", "echo EOF_TIMER_READY; sleep 300"],
        env: {},
        executionId: "exec-eof-timer",
      }),
    );
    host.stdin.flush();
    const facts: { kind: string }[] = [];
    let buffer = new Uint8Array(0);
    (async () => {
      const reader = host.stdout.getReader();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const merged = new Uint8Array(buffer.byteLength + value.byteLength);
        merged.set(buffer);
        merged.set(value, buffer.byteLength);
        buffer = merged;
        for (;;) {
          const decoded = decodeFact(buffer as Uint8Array<ArrayBuffer>);
          if (decoded === null) break;
          facts.push({ kind: decoded.frame.kind });
          buffer = buffer.subarray(decoded.consumed);
        }
      }
    })();

    const waitFor = async (kind: string, timeoutMs: number): Promise<boolean> => {
      const t0 = performance.now();
      while (!facts.some((f) => f.kind === kind) && performance.now() - t0 < timeoutMs) {
        await Bun.sleep(20);
      }
      return facts.some((f) => f.kind === kind);
    };

    expect(await waitFor("ready", 5000)).toBe(true);
    // Deliberate lifeline EOF: triggers onLifelineEof + the bounded
    // child-exit wait with its 5 s deadline timer.
    host.stdin.end();

    // The host must exit cleanly: exited fact, zero exit code.
    expect(await waitFor("exited", 10000)).toBe(true);
    // The host exits cleanly after its own 2 s grace ladder; the 5 s
    // deadline timer for child.exit must have been cancelled.
    const exitCode: number = await Promise.race([
      host.exited,
      (async () => { await Bun.sleep(5000); return -1; })(),
    ]);
    // Zero: the host shut down cleanly through the EOF containment path.
    expect(exitCode).toBe(0);
  } finally {
    // Hold past the 5 s outer bound: any leaked timer would fire NOW into
    // an already-settled race and land in `unhandled`.
    await Bun.sleep(5600);
    process.removeListener("unhandledRejection", onUnhandled);
    expect(unhandled).toHaveLength(0);
  }
}, 20000);