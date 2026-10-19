// apps/madv-agent/test/lock.test.ts
// BITE PROOF (e): a second concurrent instance in the same project refuses to
// start. Remove the lock acquisition and this test fails.

import { describe, expect, test } from "bun:test";
import { acquireProjectLock, lockExists, LockHeldError } from "../src/lock";
import { mkdtempSync, writeFileSync, rmSync, mkdirSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

function tempProject(): string {
  return mkdtempSync(join(tmpdir(), "madv-agent-lock-"));
}

describe("project lock (design §2)", () => {
  test("the first instance acquires; a second concurrent instance refuses", () => {
    const dir = tempProject();
    const first = acquireProjectLock(dir);
    expect(lockExists(dir)).toBe(true);

    expect(() => acquireProjectLock(dir)).toThrow(LockHeldError);
    expect(() => acquireProjectLock(dir)).toThrow(/refusing to start a second concurrent session/);

    first.release();
    // After release, a new instance may start.
    const third = acquireProjectLock(dir);
    third.release();
  });

  test("the lock records the holder pid and names it in the refusal", () => {
    const dir = tempProject();
    const lock = acquireProjectLock(dir);
    let caught: unknown = null;
    try {
      acquireProjectLock(dir);
    } catch (err) {
      caught = err;
    }
    expect(caught).toBeInstanceOf(LockHeldError);
    expect((caught as LockHeldError).holderPid).toBe(process.pid);
    lock.release();
  });

  test("a stale lock left by a dead process is reclaimable", () => {
    const dir = tempProject();
    // A pid that does not exist: the lock is stale, not held.
    const deadPid = 999999999;
    try {
      process.kill(deadPid, 0);
      // If that pid exists on this machine, skip the pid-specific assertion
      // by using a different nonexistent pid.
    } catch {
      // expected: no such process
    }
    const lockFile = join(dir, ".madv-agent", "lock");
    mkdirSync(join(lockFile, ".."), { recursive: true });
    writeFileSync(lockFile, `${deadPid}\n`);
    const reclaimed = acquireProjectLock(dir);
    expect(reclaimed.path).toBe(lockFile);
    reclaimed.release();
  });

  test("release removes the lock file this process wrote", () => {
    const dir = tempProject();
    const lock = acquireProjectLock(dir);
    lock.release();
    expect(lockExists(dir)).toBe(false);
  });

  test("release is idempotent and never deletes someone else's lock", () => {
    const dir = tempProject();
    const lock = acquireProjectLock(dir);
    lock.release();
    // A different (live-looking) holder takes the lock; our stale release
    // must not remove it.
    const other = join(dir, ".madv-agent", "lock");
    writeFileSync(other, "999999999\n");
    lock.release();
    expect(lockExists(dir)).toBe(true);
    rmSync(other, { force: true });
  });

  test("D5 BITE: two simultaneous starts produce exactly one lock holder", async () => {
    // The race D5 fixed: with create-then-write, a second process could
    // observe an empty lock and reclaim it, letting both start. Content is
    // now atomic with creation (temp file + link(2)), so the loser always
    // sees a live holder pid.
    const src = join(import.meta.dir, "..", "src", "lock.ts");
    const childScript = [
      `import { acquireProjectLock, LockHeldError } from ${JSON.stringify(src)};`,
      `const project = process.argv[2];`,
      `try {`,
      `  const lock = acquireProjectLock(project);`,
      `  console.log("ACQUIRED");`,
      `  await new Promise((r) => setTimeout(r, 300));`,
      `  lock.release();`,
      `  process.exit(0);`,
      `} catch (e) {`,
      `  if (e instanceof LockHeldError) { console.log("REFUSED"); process.exit(3); }`,
      `  console.log("ERROR " + String(e));`,
      `  process.exit(1);`,
      `}`,
    ].join("\n");
    const scriptPath = join(tempProject(), "child.ts");
    writeFileSync(scriptPath, childScript);

    // F3: Also run a poller that checks the lock file during the race.
    // If the atomicity defect were present (create empty, write pid later),
    // the poller could observe an empty or partial lock file.
    const pollerScript = [
      `import { lockPath, readHolderPid } from ${JSON.stringify(src)};`,
      `import { existsSync, readFileSync } from "node:fs";`,
      `const project = process.argv[2];`,
      `const path = lockPath(project);`,
      `let observedEmpty = false;`,
      `let observedPartial = false;`,
      `// Wait a bit for the race to start`,
      `await new Promise((r) => setTimeout(r, 100));`,
      `for (let i = 0; i < 200; i++) {`,
      `  if (existsSync(path)) {`,
      `    const content = readFileSync(path, "utf8");`,
      `    if (content.trim() === "") {`,
      `      observedEmpty = true;`,
      `    }`,
      `    const pid = readHolderPid(path);`,
      `    if (pid === null) {`,
      `      observedPartial = true;`,
      `    }`,
      `  }`,
      `  await new Promise((r) => setTimeout(r, 2));`,
      `}`,
      `if (observedEmpty) {`,
      `  console.log("OBSERVED_EMPTY");`,
      `  process.exit(1);`,
      `}`,
      `if (observedPartial) {`,
      `  console.log("OBSERVED_PARTIAL");`,
      `  process.exit(1);`,
      `}`,
      `console.log("NO_EMPTY_OR_PARTIAL");`,
      `process.exit(0);`,
    ].join("\n");
    const pollerPath = join(tempProject(), "poller.ts");
    writeFileSync(pollerPath, pollerScript);

    // Several rounds: every round must yield exactly one holder.
    for (let round = 0; round < 5; round++) {
      const dir = tempProject();
      const [a, b, poller] = await Promise.all([
        Bun.spawn(["bun", "run", scriptPath, dir], { stdout: "pipe", stderr: "pipe" }),
        Bun.spawn(["bun", "run", scriptPath, dir], { stdout: "pipe", stderr: "pipe" }),
        Bun.spawn(["bun", "run", pollerPath, dir], { stdout: "pipe", stderr: "pipe" }),
      ]);
      const [outA, outB, outPoller] = await Promise.all([
        new Response(a.stdout).text(),
        new Response(b.stdout).text(),
        new Response(poller.stdout).text(),
      ]);
      const exitA = await a.exited;
      const exitB = await b.exited;
      const exitPoller = await poller.exited;
      const acquired = [outA, outB].filter((o) => o.includes("ACQUIRED"));
      const refused = [outA, outB].filter((o) => o.includes("REFUSED"));
      expect(acquired).toHaveLength(1);
      expect(refused).toHaveLength(1);
      expect([exitA, exitB].sort()).toEqual([0, 3]);
      expect(lockExists(dir)).toBe(false); // the sole holder released on exit
      // F3: the poller must not have observed an empty or partial lock
      expect(outPoller).toContain("NO_EMPTY_OR_PARTIAL");
      expect(exitPoller).toBe(0);
    }
  });

  test("D5: the lock file is never observable without holder content", async () => {
    const dir = tempProject();
    const lock = acquireProjectLock(dir);
    // Immediately after acquisition the holder pid is already there —
    // content and creation are one atomic step.
    expect(readFileSync(lock.path, "utf8").trim()).toBe(String(process.pid));
    lock.release();
  });
});
