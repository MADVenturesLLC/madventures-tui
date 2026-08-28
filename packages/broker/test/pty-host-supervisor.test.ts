// packages/broker/test/pty-host-supervisor.test.ts
// Task 42: the broker-side PTY-host supervisor. This file carries the
// fifth named Task 42 test ("host exit interrupts the whole session") and
// will carry the five Task 44 wedged-host escalation tests (expected
// GREEN: 10 pass once Task 44 lands).

import { expect, test } from "bun:test";
import { spawnPtyHost } from "../src/pty-host-supervisor";
import type { HostFactFrame } from "../src/pty-host-protocol";

function sha256File(path: string): string {
  return new Bun.CryptoHasher("sha256").update(require("node:fs").readFileSync(path)).digest("hex");
}

test("host exit interrupts the whole session", async () => {
  // Supervisor integration: a real PTY host is spawned with a launch frame
  // for /bin/cat. Once the launched fact is observed, the host is killed.
  // The fact stream must terminate — the observable the supervisor uses to
  // treat host exit as governed-child death and interrupt the session.
  const handle = spawnPtyHost({
    path: "/bin/cat",
    sha256: sha256File("/bin/cat"),
    argv: [],
    env: {},
    executionId: "exec-host-exit",
  });
  const iterator = handle.facts()[Symbol.asyncIterator]();
  const first = await iterator.next();
  expect(first.done).toBe(false);
  expect(first.value).toMatchObject({ kind: "launched" });

  process.kill(handle.hostPid, "SIGKILL");
  // Drain the fact stream: buffered facts (e.g. `ready`) may still be in
  // the pipe, but the stream must terminate — the observable the
  // supervisor uses to treat host exit as governed-child death.
  let terminated = false;
  for (;;) {
    const next = await iterator.next();
    if (next.done) {
      terminated = true;
      break;
    }
  }
  expect(terminated).toBe(true);
});
