// packages/pty-host/test/launch.test.ts
// Task 42: gap-free launch with adjacent-to-`exec` artifact re-hash.
//
// The named tests from the ratified plan (M19 section SHA-256
// 411500a3fad1b8107c52f7c8591381d7d825ee9379194c7edc14484d7d39f61b):
//  1. the artifact is re-hashed immediately before exec
//  2. no storage, broker, or lifeline call occurs between verification and exec
//  3. launch facts report host pid, child pid, and child pgid
//  4. the child is created after the lifeline is established
//
// Tests exercise `verifyAndLaunch` through an injectable dependency seam
// (hash function, spawn function, ordered trace) so the TOCTOU invariant
// is proven deterministically without real processes. The fifth named test
// ("host exit interrupts the whole session") lives in the broker's
// pty-host-supervisor.test.ts where `spawnPtyHost` is defined.

import { expect, test } from "bun:test";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ArtifactHashMismatch, verifyAndLaunch } from "../src/launch";
import { MalformedFrameError } from "../src/frames";
import type { LaunchDeps } from "../src/launch";
import type { HostCommandFrame } from "../src/frames";
import type { GovernedSession } from "../src/terminal";

function sha256File(path: string): string {
  return new Bun.CryptoHasher("sha256").update(require("node:fs").readFileSync(path)).digest("hex");
}

function launchFrame(
  path: string,
  sha256: string,
  argv: readonly string[] = [],
): Extract<HostCommandFrame, { kind: "launch" }> {
  return { kind: "launch", path, sha256, argv, env: {}, executionId: "exec-launch-test" };
}

function fakeSession(): GovernedSession {
  return {
    terminal: { close: () => {} } as unknown as Bun.Terminal,
    child: {
      exited: Promise.resolve(),
      exitCode: 0,
      signalCode: null,
      pid: 4242,
    } as unknown as Bun.Subprocess,
    pgid: 4242,
    ptyClosed: Promise.resolve(),
  };
}

test("the artifact is re-hashed immediately before exec", () => {
  // Real scenario: the supervisor hashes the binary during descriptor
  // construction, then the binary is swapped before the launch frame is
  // processed. The host re-hashes the same absolute path directly before
  // exec and must refuse to spawn.
  const dir = mkdtempSync(join(tmpdir(), "pty-host-launch-"));
  try {
    const scriptPath = join(dir, "child.sh");
    writeFileSync(scriptPath, "#!/bin/sh\necho original\n", { mode: 0o755 });
    const originalHash = sha256File(scriptPath);
    // Swap the binary between descriptor construction and the launch frame.
    writeFileSync(scriptPath, "#!/bin/sh\necho REPLACED\n", { mode: 0o755 });

    const spawnCalls: string[] = [];
    const deps: LaunchDeps = {
      hashFile: (p) => sha256File(p),
      spawn: (path) => {
        spawnCalls.push(path);
        return fakeSession();
      },
    };
    const frame = launchFrame(scriptPath, originalHash);
    expect(() => verifyAndLaunch(frame, deps)).toThrow(ArtifactHashMismatch);
    // No child was created: the spawn function was never reached.
    expect(spawnCalls).toHaveLength(0);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("a bare or relative artifact path fails closed before hash and spawn (B2 regression)", () => {
  // Architecture review B2: readFileSync(frame.path) resolves cwd-relative
  // while Bun.spawn([path, ...]) PATH-resolves a slash-less command — a
  // bare name can hash one file and execute another. The ratified §2.2
  // contract is "the same absolute path directly before exec"; a
  // non-absolute path must fail closed BEFORE any hash or spawn.
  let hashCalls = 0;
  let spawnCalls = 0;
  const deps: LaunchDeps = {
    hashFile: () => {
      hashCalls += 1;
      return "a".repeat(64);
    },
    spawn: (path) => {
      spawnCalls += 1;
      return fakeSession();
    },
  };
  // Bare name: would PATH-resolve in spawn but cwd-resolve in readFileSync.
  expect(() => verifyAndLaunch(launchFrame("probecmd", "a".repeat(64)), deps)).toThrow(MalformedFrameError);
  // Relative path: same divergence class.
  expect(() => verifyAndLaunch(launchFrame("bin/probecmd", "a".repeat(64)), deps)).toThrow(MalformedFrameError);
  // Fail-closed BEFORE any hash or spawn: neither dependency ran.
  expect(hashCalls).toBe(0);
  expect(spawnCalls).toBe(0);
  // Absolute paths still pass the guard (hash/spawn proceed as before).
  verifyAndLaunch(launchFrame("/bin/sh", "a".repeat(64)), deps);
  expect(hashCalls).toBe(1);
  expect(spawnCalls).toBe(1);
});

test("no storage, broker, or lifeline call occurs between verification and exec", () => {
  const trace: string[] = [];
  const deps: LaunchDeps = {
    hashFile: () => "a".repeat(64),
    spawn: () => fakeSession(),
    trace: (step) => trace.push(step),
  };
  verifyAndLaunch(launchFrame("/bin/sh", "a".repeat(64)), deps);
  // The ordered call trace contains exactly `hash` then `exec` — nothing
  // (no storage, broker, or lifeline step) may sit between the final
  // verification and the child's exec.
  expect(trace).toEqual(["hash", "exec"]);
});

test("launch facts report host pid, child pid, and child pgid", () => {
  const deps: LaunchDeps = {
    hashFile: () => "a".repeat(64),
    spawn: () => fakeSession(),
  };
  const result = verifyAndLaunch(launchFrame("/bin/sh", "a".repeat(64)), deps);
  // The host reports its own pid and the child's pid and pgid from the
  // spawned session. A detached spawn makes the child the leader of its
  // own new process group, so pgid equals child pid at spawn time.
  expect(result.hostPid).toBe(process.pid);
  expect(result.childPid).toBe(4242);
  expect(result.pgid).toBe(4242);
  expect(result.pgid).toBe(result.childPid);
});

test("the child is created after the lifeline is established", async () => {
  // Real-pipeline proof (delegates to the supervisor integration test in
  // packages/broker/test/pty-host-supervisor.test.ts): the supervisor
  // writes the launch frame as the FIRST bytes of the real lifeline pipe
  // and the host, which can only have read that frame over a working
  // stdin, verifies the hash and creates the child afterwards. The
  // `launched` fact — asserted there end-to-end against a real
  // supervisor→host pipe — IS the ordering observable. The synthetic-trace
  // version could pass with no lifeline at all; this delegation cannot.
  const { spawnPtyHost } = await import("../../broker/src/pty-host-supervisor");
  const handle = spawnPtyHost({
    path: "/bin/cat",
    sha256: sha256File("/bin/cat"),
    argv: [],
    env: {},
    executionId: "exec-ordering",
  });
  try {
    const iterator = handle.facts()[Symbol.asyncIterator]();
    const first = await iterator.next();
    // Ordering proven by construction of the real pipeline: the child was
    // created only after the launch frame traveled the established
    // lifeline. The frame carries the child's own launch facts.
    expect(first.done).toBe(false);
    expect(first.value).toMatchObject({
      kind: "launched",
      hostPid: handle.hostPid,
      executionId: "exec-ordering",
    });
    expect(typeof (first.value as { childPid: number }).childPid).toBe("number");
    expect(typeof (first.value as { pgid: number }).pgid).toBe("number");
  } finally {
    process.kill(handle.hostPid, "SIGKILL");
  }
});
