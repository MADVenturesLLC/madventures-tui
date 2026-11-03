# Hardening C build log

Authority: DEC-20261102-04 B5, DEC-20261102-02 B3-B5, and
DEC-20261023-01 Part B. Builder: session:codex/hardening-c-r1.
Execution surface: codex. No GitHub operation, MCP call, other agent,
memory lookup or host installation was performed.

## Item 1: acknowledgement deadline

Built on commit `93e7d1c4c16d7951dd3fde23b6516e8b1e5e738b`.

Files changed:
- `packages/broker/src/pty-host-supervisor.ts`, only the acknowledgement window.
- `packages/broker/test/acknowledgement-deadline.test.ts` (new).
- `docs/verification/hardening-c-build-log.md` (new).

### Preconditions

Directory and branch match the assignment. HEAD and fetched origin/main
are `93e7d1c4c16d7951dd3fde23b6516e8b1e5e738b`; there are no changed paths
between them. Initial tree clean; this log did not exist. Host: Darwin arm64.
Git identity: daley40-lab, 293512385+daley40-lab@users.noreply.github.com.
All seven supplied origin/main authority hashes match; all four acts are
ISSUED and carry Michael Daley's Founder signature. The requested sections
11.3 and 9.8, the full acts and AGENTS.md were read before the first edit.

Initial, pre-baseline, pre-baseline-bare-test and pre-item-1 runtime checks
all returned /Users/michaeldaley/.bun/bin/bun and
/Users/michaeldaley/.bun/bin/bunx, Bun 1.4.2, revision
744846f844374847c902b5e7fd59b4342a51ef99, binary SHA-256
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5.
The check commands were command -v bun, command -v bunx,
shasum -a 256 of the resolved bun, bun --version and
bun -e 'process.stdout.write(Bun.revision)', each Bun command under the
assigned per-command PATH. Each check exited 0.

bun.lock before and after install: SHA-256
34224c0133c44d967c4a4da8b75bf11093c573c47e42bcaf502c6d6f61c3e7c0.
Install set the founder-act executable bit; git checkout restored it once,
as instructed. Initial sandboxed git fetch failed opening .git/FETCH_HEAD;
the approved escalated fetch exited 0. Other identity, hash, status, source
read and diff checks exited 0. Sandbox approvals did not change settings.

### Reliance at the binding base

DEC-20261102-04 A4 and B5 items 2-3 govern the change and test. Spec section
9.8 fixes acknowledgement at 250 ms and requires a monotonic clock.
The complete source span at packages/broker/src/pty-host-supervisor.ts,
lines 1015-1076, is:

```ts
  const tAttempt = performance.now();
  if (!bypass) {
    handle.send({ kind: "terminate" });
    observedMs.terminateSentMs = performance.now() - tAttempt;
  } else {
    observedMs.bypassStartedMs = 0;
  }

  // ---- Acknowledgement window (C7.3 step 2) ----
  // C7 ordering correction (Founder-ruled, Kimi-confirmed against §9.8):
  // the prior implementation called `closeStdin()` BEFORE this wait, per
  // packet v2.2 C3 and the plan's Interfaces line. That is superseded.
  // §9.8 is explicit: "If the 250 ms acknowledgement deadline expires, the
  // supervisor closes host stdin and starts the host-bypassing escalation
  // ladder" — the close is conditional on expiry and is the ladder's FIRST
  // act, not a precondition of the wait.
  //
  // Why it matters (probe evidence, Bun 1.3.14): `closeStdin()` is the
  // deliberate lifeline-EOF kill switch from Task 43. A healthy host honours
  // terminate + EOF and exits in ~26 ms — well inside this 250 ms window —
  // so closing first made S1 UNREACHABLE: every healthy host presented as
  // S0 by classification time.
  const ackDeadline = tAttempt + HOST_DEADLINES_MS.ack;
  let acked = false;
  let earlyExit = false;
  if (bypass) {
    // Requirement 4: delegated re-entry waits for NO acknowledgement. The
    // acknowledged ladder already failed its governing completion bound;
    // waiting again would re-open the exact stale-ack window this phase
    // machine exists to close. Classification uses the live exit state only.
    earlyExit = lifecycle?.exitedResolved === true;
  } else if (lifecycle?.exitedResolved === true) {
    // The host was already gone before escalation began.
    earlyExit = true;
  } else {
    // Event-driven race, deliberately NOT a polling loop. On the real
    // responsive path the host emits `ack` and then exits ~2-3 ms later
    // (measured, Bun 1.3.14), so a coarse poll can observe the exit while
    // missing the acknowledgement that causally preceded it. Racing the
    // promises observes whichever genuinely happened FIRST — the faithful
    // reading of C7.3 step 2, whose two bullets describe a race.
    let timer: ReturnType<typeof setTimeout> | undefined;
    const ackWon: Promise<"ack"> = new Promise<"ack">((resolve) => {
      void ackPromise.then((v) => {
        if (v) resolve("ack");
      }, () => {
        // A rejected acknowledgement is not an acknowledgement; let the
        // deadline or the exit watch decide.
      });
    });
    const exitWon: Promise<"exit"> = lifecycle === undefined
      ? await_never<"exit">()
      : lifecycle.exited.then<"exit">(() => "exit");
    const deadlineWon = new Promise<"deadline">((resolve) => {
      timer = setTimeout(() => resolve("deadline"), Math.max(0, ackDeadline - performance.now()));
    });
    const winner = await Promise.race([ackWon, exitWon, deadlineWon]);
    if (timer !== undefined) clearTimeout(timer);
    if (winner === "ack") acked = true;
    else if (winner === "exit") earlyExit = true;
  }
  observedMs.ackWindowEndedMs = performance.now() - tAttempt;
```

### Test and change

Added "an early acknowledgement timer waits until 250 ms before classifying
a silent host as failed". It stops a real host with SIGSTOP, captures the
acknowledgement timer using a test-only global timer spy, restores that spy,
and manually fires the callback before 250 ms. It checks S3, host failure,
escalation and required interruption, and ackWindowEndedMs >= 250.
No production seam was added. The test file passes 1 test, 0 fail.
The broker suite passes 307 tests across 18 files, 0 fail.

Against unchanged production, the intended RED was 0 pass, 1 fail:
Expected >= 250; received 0.1297089999999983. Failure was the observed-window
assertion, after the failure-classification assertions passed. No deliberate
production break was needed. Initial first load 2.54 was not a halt because
this failure was intended under DEC-20261102-04 A2 item 1 and B5 item 10.
The change checks the monotonic remainder on timer delivery and rearms only
for a positive remainder, retaining the original acknowledgement/exit race.

### Other section 9.8 timers: report only

- `packages/pty-host/src/signals.ts:68`: shared setTimeout sleep, used by
  `terminateChildGroup` at lines 154-157 for the 2,000 ms responsive grace
  and lines 164-165 for the 5,000 ms outer bound; `onLifelineEof` at lines
  200-202 for the 2,000 ms grace.
- `packages/pty-host/src/main.ts:662`: lifeline-EOF child-exit timer,
  bounded by HOST_DEADLINES_MS.outerBound at line 670 (5,000 ms).
- `packages/supervisor/src/build.ts:323`: rollback containment polls with
  Bun.sleep(10) until the 5,000 ms outer bound; lines 330-331 poll the
  final cleanup budget, reusing the 500 ms terminationStarted constant.
  The latter is a rollback cleanup budget, not the broker command clock.

No other timer enforces a section 9.8 bound. The broker subscription hang
net, host PTY-close safety net, zero-delay settlement turn, supervisor
child-launch timeout, attestation deadlines and preflight command timeout
have separate purposes. All these other timers remain unchanged.

### Deviations and self-fix record

The first typecheck of the new timer mock failed with the following output:

```text
packages/broker/test/acknowledgement-deadline.test.ts(26,74): error TS2345: Argument of type '(callback: any, delay: any, ...args: any[]) => Timeout' is not assignable to parameter of type 'typeof setTimeout'.
  Property '__promisify__' is missing in type '(callback: any, delay: any, ...args: any[]) => Timeout' but required in type 'typeof setTimeout'.
packages/broker/test/acknowledgement-deadline.test.ts(26,75): error TS7006: Parameter 'callback' implicitly has an 'any' type.
packages/broker/test/acknowledgement-deadline.test.ts(26,85): error TS7006: Parameter 'delay' implicitly has an 'any' type.
packages/broker/test/acknowledgement-deadline.test.ts(26,92): error TS7019: Rest parameter 'args' implicitly has an 'any[]' type.
```

The mock callback gained explicit argument types and a typeof setTimeout
assertion for the overloaded function. Restarting typecheck then failed:

```text
packages/broker/test/acknowledgement-deadline.test.ts(30,7): error TS2412: Type 'number | undefined' is not assignable to type 'number' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the type of the target.
  Type 'undefined' is not assignable to type 'number'.
```

The captured delay assignment became delay ?? 0. Assertions and test behavior
were unchanged. Under DEC-20261023-01 B4, checks restarted with typecheck,
then the focused test and broker suite, all passing. No failed run was
rerun unchanged. The broker suite had been launched before inspecting the
first typecheck result; that passing run is recorded separately and was
repeated after the correction as part of the required restart.
The patch tool added an EOF newline to production; it was removed before
commit so the production diff is entirely inside the acknowledgement window.
No halt occurred.

### Baseline command evidence

### baseline-install-01

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun install --frozen-lockfile`

Uptime: 20:46  up 8 days, 12:55, 19 users, load averages: 1.50 1.47 1.64

Exit: 0; tee exit: 0. Log: `/Users/michaeldaley/builds/hardening-c-r1-pr/logs/baseline-install-01.log`.

SHA-256: `31603932f0b5dca9f8c2193d96e103edc25af66c306d3ca11b2ac04e48f99c6f`.

```text
+ @types/react@19.3.0
+ @types/react-test-renderer@19.3.0
+ react-test-renderer@19.3.0
+ @opentui/core@0.5.11
+ @opentui/react@0.5.11
+ react@19.3.0
+ typescript@5.9.3

51 packages installed [168.00ms]
```

### baseline-typecheck-01

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bunx tsc --noEmit`

Uptime: 20:47  up 8 days, 12:56, 19 users, load averages: 1.67 1.50 1.65

Exit: 0; tee exit: 0. Log: `/Users/michaeldaley/builds/hardening-c-r1-pr/logs/baseline-typecheck-01.log`.

SHA-256: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.

```text

```

### baseline-broker-01

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/broker`

Uptime: 20:50  up 8 days, 12:59, 19 users, load averages: 1.23 1.38 1.55

Exit: 0; tee exit: 0. Log: `/Users/michaeldaley/builds/hardening-c-r1-pr/logs/baseline-broker-01.log`.

SHA-256: `fac57383405316532ffe426870e39500a83d3c073f90135a9a088dc178594d0a`.

```text
(pass) Task 19 governed-process termination > session_closed is appended only after the terminator resolves [4.47ms]
(pass) Task 19 governed-process termination > the terminator is never invoked by activation, by a failed activation, or by a refused transition [6.25ms]
(pass) Task 19 module discipline > the runtime broker performs no ambient discovery, holds no process authority, and batches only the compensation [0.79ms]
(pass) Task 19 module discipline > the broker index does not export RuntimeBroker; this test imports it directly [0.06ms]

 306 pass
 0 fail
 2720 expect() calls
Ran 306 tests across 17 files. [13.13s]
```

### baseline-supervisor-01

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/supervisor`

Uptime: 20:51  up 8 days, 13 hrs, 19 users, load averages: 1.38 1.39 1.55

Exit: 0; tee exit: 0. Log: `/Users/michaeldaley/builds/hardening-c-r1-pr/logs/baseline-supervisor-01.log`.

SHA-256: `7e30da79105495db75db9d73410c77340e7fb163502fe367c5070d1c2748fae4`.

```text
(pass) rollback after step activate leaves no partial session [586.58ms]
(pass) rollback before session_open removes the session directory [14.32ms]
(pass) rollback never deletes a capability record [3.80ms]
(pass) rollback uses the same containment path as live interruption [4351.31ms]

 80 pass
 0 fail
 5842 expect() calls
Ran 80 tests across 5 files. [54.28s]
```

### baseline-adversarial-01

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test test/phase3a/adversarial`

Uptime: 20:52  up 8 days, 13:01, 19 users, load averages: 1.80 1.49 1.57

Exit: 0; tee exit: 0. Log: `/Users/michaeldaley/builds/hardening-c-r1-pr/logs/baseline-adversarial-01.log`.

SHA-256: `054bdc06f1f5d9769bb9bd494e1815f6456a2c60496a8e35911ea36628ba023e`.

```text
ledger_failure {"detectedMs":2.127667000000656,"deathMs":25.14483300000211,"escalation":null,"terminateAcks":1,"terminationStarted":true,"resizeAcks":0,"errorName":null,"sequenceKind":null,"publicationError":"ledger_write_failed","sqliteCode":"SQLITE_READONLY","authExpired":false,"reportedModel":null}
(pass) a mid-session append failure interrupts with ledger_write_failed [339.95ms]
unrecordable_ledger {"detectedMs":0,"deathMs":22.35791700000118,"escalation":null,"terminateAcks":1,"terminationStarted":true,"resizeAcks":0,"errorName":null,"sequenceKind":null,"publicationError":"ledger_write_failed","sqliteCode":"SQLITE_READONLY","authExpired":false,"reportedModel":null}
(pass) an unrecordable interruption is completed by next-start reconciliation [343.84ms]

 34 pass
 0 fail
 658 expect() calls
Ran 34 tests across 9 files. [21.05s]
```

### baseline-full-01

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test`

Uptime: 20:52  up 8 days, 13:01, 20 users, load averages: 1.52 1.46 1.56

Exit: 0; tee exit: 0. Log: `/Users/michaeldaley/builds/hardening-c-r1-pr/logs/baseline-full-01.log`.

SHA-256: `187acf80f8c923ad20683c2999e38e41577ef26db1ffb98eedd8d5fc12fed78d`.

```text
(pass) finding 2 — usage errors are decided before any connection > roomUsageError accepts exactly one positional, create [0.03ms]
(pass) finding 2 — usage errors are decided before any connection > missing, unknown, and extra positionals through runCli exit 2 with no connection and no CreateRoom [0.18ms]
(pass) finding 2 — usage errors are decided before any connection > human-readable usage errors go to stderr with exit 2 and no connection [0.06ms]
(pass) finding 2 — usage errors are decided before any connection > valid usage through runCli connects exactly once and sends exactly one CreateRoom [0.24ms]

 1895 pass
 0 fail
 18403 expect() calls
Ran 1895 tests across 137 files. [180.66s]
```

### Item 1 command evidence

### item1-red-01

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/broker/test/acknowledgement-deadline.test.ts`

Uptime: 20:56  up 8 days, 13:04, 20 users, load averages: 2.54 2.33 1.94

Exit: 1; tee exit: 0. Log: `/Users/michaeldaley/builds/hardening-c-r1-pr/logs/item1-red-01.log`.

SHA-256: `19a736083545d576c068299fd29d60699fe83f75082e639bd9816301e4abda6e`.

```text
Received: 0.1297089999999983

      at <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-c-r1/packages/broker/test/acknowledgement-deadline.test.ts:52:49)
(fail) an early acknowledgement timer waits until 250 ms before classifying a silent host as failed [24.29ms]

 0 pass
 1 fail
 10 expect() calls
Ran 1 test across 1 file. [34.00ms]
```

### item1-green-01

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/broker/test/acknowledgement-deadline.test.ts`

Uptime: 20:56  up 8 days, 13:05, 20 users, load averages: 2.42 2.31 1.93

Exit: 0; tee exit: 0. Log: `/Users/michaeldaley/builds/hardening-c-r1-pr/logs/item1-green-01.log`.

SHA-256: `dad30fdabfb92c18b46707fa429d96e8ebab62365ce6a8d9395c2190e28297f6`.

```text
bun test v1.4.2 (744846f84)

packages/broker/test/acknowledgement-deadline.test.ts:
(pass) an early acknowledgement timer waits until 250 ms before classifying a silent host as failed [273.88ms]

 1 pass
 0 fail
 10 expect() calls
Ran 1 test across 1 file. [285.00ms]
```

### item1-typecheck-01

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bunx tsc --noEmit`

Uptime: 20:56  up 8 days, 13:05, 20 users, load averages: 2.42 2.31 1.93

Exit: 2; tee exit: 0. Log: `/Users/michaeldaley/builds/hardening-c-r1-pr/logs/item1-typecheck-01.log`.

SHA-256: `1b7d47a6306ecb0dd60b28741df0d58420c5c136f91e2602fc925c08abdc3a89`.

```text
packages/broker/test/acknowledgement-deadline.test.ts(26,74): error TS2345: Argument of type '(callback: any, delay: any, ...args: any[]) => Timeout' is not assignable to parameter of type 'typeof setTimeout'.
  Property '__promisify__' is missing in type '(callback: any, delay: any, ...args: any[]) => Timeout' but required in type 'typeof setTimeout'.
packages/broker/test/acknowledgement-deadline.test.ts(26,75): error TS7006: Parameter 'callback' implicitly has an 'any' type.
packages/broker/test/acknowledgement-deadline.test.ts(26,85): error TS7006: Parameter 'delay' implicitly has an 'any' type.
packages/broker/test/acknowledgement-deadline.test.ts(26,92): error TS7019: Rest parameter 'args' implicitly has an 'any[]' type.
```

### item1-broker-01

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/broker`

Uptime: 20:56  up 8 days, 13:05, 20 users, load averages: 2.27 2.28 1.92

Exit: 0; tee exit: 0. Log: `/Users/michaeldaley/builds/hardening-c-r1-pr/logs/item1-broker-01.log`.

SHA-256: `465bb41e1604b19bcd8a1645eebd77c37bddea75b3140cb727d664e0a75eae0d`.

```text
(pass) Task 19 governed-process termination > session_closed is appended only after the terminator resolves [4.25ms]
(pass) Task 19 governed-process termination > the terminator is never invoked by activation, by a failed activation, or by a refused transition [5.87ms]
(pass) Task 19 module discipline > the runtime broker performs no ambient discovery, holds no process authority, and batches only the compensation [0.80ms]
(pass) Task 19 module discipline > the broker index does not export RuntimeBroker; this test imports it directly [0.06ms]

 307 pass
 0 fail
 2730 expect() calls
Ran 307 tests across 18 files. [13.36s]
```

### item1-restart-typecheck-01

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bunx tsc --noEmit`

Uptime: 20:56  up 8 days, 13:05, 20 users, load averages: 2.28 2.28 1.93

Exit: 2; tee exit: 0. Log: `/Users/michaeldaley/builds/hardening-c-r1-pr/logs/item1-restart-typecheck-01.log`.

SHA-256: `95236850d9c771113c8de201b91fe6217f73ddb712430dd77fced0eddc997937`.

```text
packages/broker/test/acknowledgement-deadline.test.ts(30,7): error TS2412: Type 'number | undefined' is not assignable to type 'number' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the type of the target.
  Type 'undefined' is not assignable to type 'number'.
```

### item1-restart-typecheck-02

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bunx tsc --noEmit`

Uptime: 20:56  up 8 days, 13:05, 20 users, load averages: 2.15 2.25 1.92

Exit: 0; tee exit: 0. Log: `/Users/michaeldaley/builds/hardening-c-r1-pr/logs/item1-restart-typecheck-02.log`.

SHA-256: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.

```text

```

### item1-restart-green-01

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/broker/test/acknowledgement-deadline.test.ts`

Uptime: 20:57  up 8 days, 13:05, 20 users, load averages: 2.34 2.29 1.94

Exit: 0; tee exit: 0. Log: `/Users/michaeldaley/builds/hardening-c-r1-pr/logs/item1-restart-green-01.log`.

SHA-256: `7aa5dc81d849332d0d1d22be1c2352d45f5de447640119d5c61ca56c8d4f9886`.

```text
bun test v1.4.2 (744846f84)

packages/broker/test/acknowledgement-deadline.test.ts:
(pass) an early acknowledgement timer waits until 250 ms before classifying a silent host as failed [273.15ms]

 1 pass
 0 fail
 10 expect() calls
Ran 1 test across 1 file. [284.00ms]
```

### item1-restart-broker-01

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/broker`

Uptime: 20:57  up 8 days, 13:06, 20 users, load averages: 2.40 2.30 1.95

Exit: 0; tee exit: 0. Log: `/Users/michaeldaley/builds/hardening-c-r1-pr/logs/item1-restart-broker-01.log`.

SHA-256: `066dfbc082de96808f37c9b8793a9741d967bbe5cfb455dc9a20112af6373a70`.

```text
(pass) Task 19 governed-process termination > session_closed is appended only after the terminator resolves [4.26ms]
(pass) Task 19 governed-process termination > the terminator is never invoked by activation, by a failed activation, or by a refused transition [5.88ms]
(pass) Task 19 module discipline > the runtime broker performs no ambient discovery, holds no process authority, and batches only the compensation [0.79ms]
(pass) Task 19 module discipline > the broker index does not export RuntimeBroker; this test imports it directly [0.06ms]

 307 pass
 0 fail
 2730 expect() calls
Ran 307 tests across 18 files. [13.37s]
```

Local git diff --check exited 0 after the correction. All test output was
piped through tee to a unique unmodified log. No environment was seeded by
this item. Final gates will be run after item 2 and reported in the saved
pull-request description and final report.

## Item 2: watcher calibration

Built on commit `07e79be01bf8efcbde8cb16575bc0d93180495cd`.

Files changed:
- `packages/supervisor/test/preflight.test.ts`, only the calibration test.
- `docs/verification/hardening-c-build-log.md`, this appended section.

### Reliance at the item parent

DEC-20261102-04 A2 item 3 and B5 item 4 control this change. The complete
recordTemporaryPaths, calibration and purity-test source span at
packages/supervisor/test/preflight.test.ts:253-308 is:

```ts
function recordTemporaryPaths(root: string) {
  const paths = new Set<string>();
  const errors: string[] = [];
  const watcher = watch(root, { recursive: true }, (_event, name) => {
    if (name === null) errors.push("filesystem event without a path");
    else paths.add(name.toString());
  });
  watcher.on("error", error => errors.push(error.name));
  return {
    paths,
    stop: async () => {
      try { await new Promise(resolve => setTimeout(resolve, 250)); }
      finally { watcher.close(); }
      expect(errors).toEqual([]);
    },
  };
}

test("temporary path recording sees files a child creates and removes before returning", async () => {
  const root = realpathSync(mkdtempSync(join(tmpdir(), "hardening-a-path-recording-")));
  roots.push(root);
  const recorder = recordTemporaryPaths(root);
  try {
    const child = Bun.spawnSync([process.execPath, "--no-env-file", "-e", `
      const fs = require("node:fs"); const root = ${JSON.stringify(root)};
      fs.writeFileSync(root + "/ephemeral", "synthetic");
      fs.unlinkSync(root + "/ephemeral");
      fs.mkdirSync(root + "/nested");
      fs.writeFileSync(root + "/nested/ephemeral", "synthetic");
      fs.unlinkSync(root + "/nested/ephemeral");
      fs.rmdirSync(root + "/nested");
    `], { env: {}, stdout: "pipe", stderr: "pipe" });
    expect(child.exitCode).toBe(0);
  } finally {
    await recorder.stop();
  }
  expect([...recorder.paths].sort()).toEqual(["ephemeral", "nested", "nested/ephemeral"]);
});

test("the returned plan's repository fingerprint is frozen", async () => {
  const result = await fixture().run();
  expect(result.ok).toBe(true);
  if (result.ok) expect(Object.isFrozen(result.plan.repositoryFingerprint)).toBe(true);
});
test("preflight creates nothing", async () => {
  const f = fixture();
  writeFileSync(join(f.input.worktree,"dirty-fixture"),"fixture dirty status");
  const status=Bun.spawnSync(["git","--no-optional-locks","-C",f.input.worktree,"status","--porcelain=v1","-z"],{stdout:"pipe",stderr:"pipe"});
  expect(status.exitCode).toBe(0);
  const before = listing(f.root); const temporary = readdirSync(f.temp).sort();
  const recorder = recordTemporaryPaths(f.temp);
  const r = await f.run().finally(() => recorder.stop()); expect(r.ok).toBe(true);
  expect([...recorder.paths]).toEqual([]);
  expect(listing(f.root)).toEqual(before); expect(readdirSync(f.temp).sort()).toEqual(temporary);
  if (r.ok) { expect(r.plan.repositoryFingerprint.statusSha256).toBe(new Bun.CryptoHasher("sha256").update(status.stdout).digest("hex")); expect(Object.isFrozen(r.plan)).toBe(true); expect(Object.isFrozen(r.plan.executions)).toBe(true); for (const e of r.plan.executions) { expect(Object.isFrozen(e)).toBe(true); expect(Object.isFrozen(e.arguments)).toBe(true); expect(Object.isFrozen(e.environment)).toBe(true); expect(e.artifactSha256).toBe(new Bun.CryptoHasher("sha256").update(readFileSync(e.executablePath)).digest("hex")); } }
});
```

### Change, deliberate break and restoration

The calibration requires ephemeral and nested on every host and additionally
nested/ephemeral on macOS. Linux may attach its recursive watch too late to
observe a file created and removed inside a newly created directory. The
comment states what each host reports and why. It accepts an additional
nested-file report on Linux. recordTemporaryPaths and every assertion of
"preflight creates nothing" remain unchanged.

The deliberate break was a probe dependency injected only into the purity
test, running inside preflight. It created and removed a nested directory
and synthetic file in f.temp before the probe returned:

```ts
  const r = await f.run({ probe: async req => {
    const nested = join(f.temp, "nested");
    mkdirSync(nested);
    writeFileSync(join(nested, "ephemeral"), "synthetic");
    rmSync(nested, { recursive: true });
    return f.deps.probe!(req);
  } }).finally(() => recorder.stop()); expect(r.ok).toBe(true);
```

The break's full git diff was shown before its run. "preflight creates
nothing" failed at the empty recorded-path assertion, receiving both
nested/ephemeral and nested; preflight itself returned success. No production
file was edited. After restoring, the test file's SHA-256 exactly equalled
the pre-break calibrated file's SHA-256:
92e9e740208fb81322594b2e1edc963c65ba75add909ed4612a5b02f1d16fbe4.
The original binding-base file's SHA-256 was
0fc2471b45838c1d0474ca37f0b4be791862f5fcdf721361c9e903fa416820e6.

The pre-item-2 runtime check matched every pinned field and exited 0.
The changed test is "temporary path recording sees files a child creates
and removes before returning"; its file passes 31 tests, 0 fail. The existing
"preflight creates nothing" assertion caught the deliberate break and passes
after restoration. The supervisor suite passes 80 tests across 5 files,
0 fail. Typecheck and git diff --check exit 0.

This MacBook does not run the Linux branch of any test. Verify and
code-review on ubuntu-24.04 after the Founder pushes verify Linux behavior;
those checks and Verify (macOS) at the final head must pass before review.
No remote result is claimed here. No environment variable was seeded by this
item. Deviations: none for item 2. Halts: none.

### Item 2 command evidence

### item2-break-01

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/supervisor/test/preflight.test.ts --test-name-pattern "^preflight creates nothing$"`

Uptime: 21:37  up 8 days, 13:46, 21 users, load averages: 2.42 2.01 3.03

Exit: 1; tee exit: 0. Log: `/Users/michaeldaley/builds/hardening-c-r1-pr/logs/item2-break-01.log`.

SHA-256: `f817f65adfdc738bc5bf4a336d690112e5758e7efd794c907e869a32821cf784`.

```text

      at <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-c-r1/packages/supervisor/test/preflight.test.ts:317:31)
(fail) preflight creates nothing [824.55ms]

 0 pass
 30 filtered out
 1 fail
 8 expect() calls
Ran 1 test across 1 file. [840.00ms]
```

### item2-preflight-01

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/supervisor/test/preflight.test.ts`

Uptime: 21:38  up 8 days, 13:46, 21 users, load averages: 2.39 2.01 3.02

Exit: 0; tee exit: 0. Log: `/Users/michaeldaley/builds/hardening-c-r1-pr/logs/item2-preflight-01.log`.

SHA-256: `14787edbbdf1060820e5f4b9876e13c795f2d60a718a7d3d118872001bb21a70`.

```text
(pass) the auth probe enforces the 5,000 ms execution deadline [5735.99ms]
(pass) the auth probe escalates SIGTERM to SIGKILL within the forced-cleanup budget [5690.20ms]
(pass) the auth probe reaps the child successfully [322.79ms]
(pass) cleanup-budget exhaustion fails closed as auth_not_ready [6189.66ms]

 31 pass
 0 fail
 369 expect() calls
Ran 31 tests across 1 file. [27.96s]
```

### item2-typecheck-01

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bunx tsc --noEmit`

Uptime: 21:38  up 8 days, 13:47, 20 users, load averages: 2.90 2.19 3.03

Exit: 0; tee exit: 0. Log: `/Users/michaeldaley/builds/hardening-c-r1-pr/logs/item2-typecheck-01.log`.

SHA-256: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.

```text

```

### item2-supervisor-01

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/supervisor`

Uptime: 21:38  up 8 days, 13:47, 20 users, load averages: 2.61 2.15 3.01

Exit: 0; tee exit: 0. Log: `/Users/michaeldaley/builds/hardening-c-r1-pr/logs/item2-supervisor-01.log`.

SHA-256: `b5a0bad18b043cd1c43e18e21741adebee593a1a305a02d69e09078ced716846`.

```text
(pass) rollback after step activate leaves no partial session [610.90ms]
(pass) rollback before session_open removes the session directory [24.79ms]
(pass) rollback never deletes a capability record [4.46ms]
(pass) rollback uses the same containment path as live interruption [4345.08ms]

 80 pass
 0 fail
 5844 expect() calls
Ran 80 tests across 5 files. [55.67s]
```
