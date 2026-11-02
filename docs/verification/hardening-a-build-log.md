# Hardening A build log

Authority: DEC-20261102-02 B1-B4 and B9; DEC-20261102-01 A3/B1;
DEC-20261023-01 Part B; plan section 11.3. Builder assignment:
`builder`, actor `session:codex/hardening-a-r1`, surface `codex`.

Binding base and fetched origin/main: `68959cf27ee2652d4f9c3287cec4a5ee03798a7a`.
Branch: `build/hardening-a-r1`. Initial tree clean; host `Darwin arm64`.
All seven authority hashes matched the prompt; acts ISSUED and signed.
Bun: `/Users/michaeldaley/.bun/bin/bun`, 1.4.2,
revision `744846f844374847c902b5e7fd59b4342a51ef99`, SHA-256
`35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5`.
The initial and pre-baseline runtime checks matched. Each later runtime check
is logged below. bun.lock remained byte-identical, SHA-256
`34224c0133c44d967c4a4da8b75bf11093c573c47e42bcaf502c6d6f61c3e7c0`.

## Baseline

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun install --frozen-lockfile`

Exit: 0. Summary: exit 0

Uptime: 8:23  up 8 days, 32 mins, 17 users, load averages: 2.83 2.64 2.47

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/baseline-01-install-run1.log`

SHA-256: `2a6a47df473f18c672dd8f3fcd9dd34b89c2e9fb4c8dbe1cdc847785c543644f`


Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bunx tsc --noEmit`

Exit: 0. Summary: exit 0

Uptime: 8:23  up 8 days, 32 mins, 17 users, load averages: 2.28 2.53 2.44

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/baseline-02-typecheck-run1.log`

SHA-256: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`


Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/broker`

Exit: 0. Summary: 300 pass / 0 fail / 2681 expect() calls / Ran 300 tests across 16 files. [12.89s]

Uptime: 8:23  up 8 days, 32 mins, 17 users, load averages: 2.26 2.52 2.43

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/baseline-03-broker-run1.log`

SHA-256: `211d3a3405c9a190589a13fb4a6168f5bcee19b952555503c131b8340d8f1a2d`


Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/pty-host`

Exit: 0. Summary: 48 pass / 0 fail / 770 expect() calls / Ran 48 tests across 5 files. [26.07s]

Uptime: 8:23  up 8 days, 32 mins, 17 users, load averages: 2.34 2.53 2.44

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/baseline-04-pty-host-run1.log`

SHA-256: `783f66d25ea85a0952f9380be5d1281d7e2e57f891057ab305fd640041ec7001`


Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/supervisor`

Exit: 0. Summary: 78 pass / 0 fail / 5822 expect() calls / Ran 78 tests across 5 files. [54.08s]

Uptime: 8:24  up 8 days, 33 mins, 17 users, load averages: 1.68 2.35 2.38

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/baseline-05-supervisor-run1.log`

SHA-256: `27690f7d3c615cce0f78e534223d3d5eefff1228ca27f5a91dabc2b4dd5b22e0`


Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test apps/madbridge/test/doctor.test.ts`

Exit: 0. Summary: 12 pass / 0 fail / 47 expect() calls / Ran 12 tests across 1 file. [2.65s]

Uptime: 8:25  up 8 days, 34 mins, 17 users, load averages: 1.66 2.24 2.33

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/baseline-06-doctor-run1.log`

SHA-256: `da6684fd36419b13233f55907b2b3456a57d1ea02f69113317ab7b84c582a7c2`


Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test`

Exit: 0. Summary: 1871 pass / 0 fail / 18201 expect() calls / Ran 1871 tests across 135 files. [180.82s]

Uptime: 8:25  up 8 days, 34 mins, 17 users, load averages: 1.66 2.24 2.33

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/baseline-07-full-run1.log`

SHA-256: `0f106f56c3f2b3add4ace1218c687c97632c1386f5e57f436e4b7b4a45734bc9`

## Deviations and resolved halt

- The required frozen install set the executable bit of
  `packages/founder-act/src/main.ts` through its package bin entry, as the
  Founder confirmed. Post-baseline status showed mode 100644 to 100755,
  with identical content SHA-256
  `ae9b43ecc6523bc31603510affb632ff60b59c940bb457b36a37c5f9478dd705`.
  This triggered B9's outside-B2 halt before item 1. The Founder explicitly
  authorized `git checkout -- packages/founder-act/src/main.ts`, which was
  run once; `git status --porcelain` then printed nothing. The Founder also
  authorized the same restoration after any later install, with each instance
  recorded. No later install has occurred.
- A session-required memory-registry lookup for the task identifiers returned
  no matches. This violated the prompt's no-memory workflow. No earlier
  transcript or note was opened. No further memory lookup will be run.
- The runtime was checked before the baseline block, but was not rechecked
  immediately before its bare `bun test`, missing DEC-20261023-01 B8's
  cadence. The final bare suite will have its immediate runtime check.

## Item 1: PTY-host dotenv isolation

Built on: `68959cf27ee2652d4f9c3287cec4a5ee03798a7a`.

Files changed:
`packages/broker/src/pty-host-supervisor.ts`,
`packages/broker/test/pty-host-dotenv.test.ts`, and this log.

Relies on HEAD `packages/broker/src/pty-host-supervisor.ts:51-53`:

```ts
const REPO_ROOT = join(MODULE_DIR, "..", "..", "..");
const HOST_ENTRY = "packages/pty-host/src/main.ts";
```

And HEAD lines 363-370:

```ts
  const proc = Bun.spawn([BUN_EXECUTABLE, HOST_ENTRY], {
    cwd: REPO_ROOT,
    stdin: "pipe",
    stdout: "pipe",
    stderr: "pipe",
    // Allowlisted environment ONLY — ambient inheritance is prohibited.
    env: { ...descriptor.env },
  });
```

DEC-20261102-01 B1 item 1 requires no cwd dotenv values in the host.
The installed Bun help documents `--no-env-file`; the behavior test below
proved the pre-change leak in the real host.

Test added: `a stray repository .env contributes no synthetic values to the
real PTY host` (one passing test in pty-host-dotenv.test.ts). A test-only
preload reports the actual host PID and only names of matching synthetic
canaries. No ambient environment values are enumerated or reported.
The .env is created exclusively, removed in finally, and never committed.
The test does not alter the production cwd or spawn environment.

Pre-change failing run, verbatim:

```text
bun test v1.4.2 (744846f84)

packages/broker/test/pty-host-dotenv.test.ts:
46 |       new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error("host did not launch")), 4000); }),
47 |     ]);
48 |     expect(first.value).toMatchObject({ kind: "launched", hostPid: handle.hostPid });
49 |     const observed = JSON.parse(readFileSync(report, "utf8"));
50 |     expect(observed.pid).toBe(handle.hostPid);
51 |     expect(observed.leaked).toEqual([]);
                                 ^
error: expect(received).toEqual(expected)

- []
+ [
+   "MADV_HARDENING_DOTENV_ONE",
+   "MADV_HARDENING_DOTENV_TWO",
+ ]

- Expected  - 1
+ Received  + 4

      at <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/packages/broker/test/pty-host-dotenv.test.ts:51:29)
(fail) a stray repository .env contributes no synthetic values to the real PTY host [60.53ms]

 0 pass
 1 fail
 4 expect() calls
Ran 1 test across 1 file. [71.00ms]
```

No deliberate break was needed: the production defect itself produced red.
The first load average was 1.34. Change: add `--no-env-file` to the Bun
host arguments; all other arguments, cwd, framing and environment stay as-is.

Verification:

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; command -v bun; command -v bunx; shasum -a 256 "$(command -v bun)"; bun --version; bun -e 'process.stdout.write(Bun.revision)'`

Exit: 0. Summary: exit 0

Uptime: runtime check, not a test run

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-01-runtime-run1.log`

SHA-256: `2b1d8a5ab9bebb7a1de8417a1458f7d8ff03fd90e03fe98190496a94b162ab1f`


Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/broker/test/pty-host-dotenv.test.ts`

Exit: 1. Summary: 0 pass / 1 fail / 4 expect() calls / Ran 1 test across 1 file. [71.00ms]

Uptime: 8:34  up 8 days, 43 mins, 17 users, load averages: 1.34 1.66 1.99

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-01-red-run1.log`

SHA-256: `56dfcc0c12788b1d08861706104129126a8e89980d728f60035fc7886bf93392`


Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bunx tsc --noEmit`

Exit: 0. Summary: exit 0

Uptime: 8:34  up 8 days, 43 mins, 17 users, load averages: 1.41 1.66 1.99

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-01-typecheck-run1.log`

SHA-256: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`


Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/broker/test/pty-host-dotenv.test.ts`

Exit: 0. Summary: 1 pass / 0 fail / 4 expect() calls / Ran 1 test across 1 file. [72.00ms]

Uptime: 8:34  up 8 days, 43 mins, 17 users, load averages: 1.41 1.66 1.99

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-01-green-run1.log`

SHA-256: `b997dc0f7380400ae14d2cefd1fc7bc6130187ba5c5780322d4fa7ba00fd3d7b`


Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/broker`

Exit: 0. Summary: 301 pass / 0 fail / 2685 expect() calls / Ran 301 tests across 17 files. [12.69s]

Uptime: 8:34  up 8 days, 43 mins, 17 users, load averages: 1.41 1.66 1.99

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-01-broker-run1.log`

SHA-256: `031dbce9df4fb65c7bc1b9f3aa0b1a81741a088bdfd110794ceaf455a09663a0`


Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/pty-host`

Exit: 0. Summary: 48 pass / 0 fail / 770 expect() calls / Ran 48 tests across 5 files. [26.30s]

Uptime: 8:35  up 8 days, 44 mins, 17 users, load averages: 1.76 1.73 2.00

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-01-pty-host-run1.log`

SHA-256: `898e468d950407b1fdc8cdf5f1c01792176ba69039b3e4aa3110f8a78c1c610e`


Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/supervisor`

Exit: 0. Summary: 78 pass / 0 fail / 5822 expect() calls / Ran 78 tests across 5 files. [53.59s]

Uptime: 8:35  up 8 days, 44 mins, 17 users, load averages: 1.78 1.73 2.00

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-01-supervisor-run1.log`

SHA-256: `0a7d22a70bc260c8a3b2c8a16e638afe50a55379e2a5c46dfca2ee05402d7539`

`git diff --check`: exit 0. Synthetic .env removed after both runs.
No item-specific deviation or self-fix. No unresolved halt.

## Item 3: duplicate lookup failures and refusal side effects — HALTED

Built on: `5ae6c3d0305b5d6ef97901f085311b94c6e7e38c`.

Files changed: `packages/broker/test/publish-legality.test.ts`,
`packages/broker/test/incident-atomicity.test.ts`, and this log.
No production file changed for item 3. No item 3 commit was made.

Relies on the following verbatim parent snippets:

packages/broker/test/publish-legality.test.ts:408-430:

```ts
test("a duplicate event_id is refused without appending or interrupting the session", async () => {
  const f = await fixture();
  const client = createInProcessBrokerClient(f.broker, PRINCIPAL);
  const candidate = event();
  expect(await client.publish(candidate)).toMatchObject({ ok: true, commandId: candidate.event_id });
  const rows = f.ledger.readAfter(0);
  const head = f.ledger.verify().head;
  const before = await client.getSnapshot();
  const brokerSeq = f.broker.snapshotSeq;
  expect(f.ledger.calls).toHaveLength(1);
  expect(f.observations).toHaveLength(1);
  expect(await client.publish(candidate)).toEqual({
    ok: false, commandId: candidate.event_id, error: "invalid_command", detail: "publish: duplicate event_id",
  });
  expect(f.ledger.readAfter(0)).toEqual(rows);
  expect(f.ledger.readAfter(0).filter(row => row.event_id === candidate.event_id)).toHaveLength(1);
  expect(f.ledger.verify().head).toBe(head);
  expect(f.ledger.calls).toHaveLength(1);
  expect(f.observations).toHaveLength(1);
  expect(f.broker.snapshotSeq).toBe(brokerSeq);
  expect((await client.getSnapshot()).phase).toBe(before.phase);
  expect(before.phase).toBe("active");
  expect(f.terminations()).toBe(0);
```

packages/broker/test/incident-atomicity.test.ts:106-122:

```ts
test("a duplicate incident event_id is refused without appending or interrupting the session", async () => {
  const f = await fixture();
  const client = createInProcessBrokerClient(f.broker, { kind: "execution", executionId: EXECUTION });
  const candidate = { ...incident(f.ledger), event_id: "open-task25" };
  const rows = f.ledger.readAfter(0);
  const seq = f.broker.snapshotSeq;
  expect(rows.filter(row => JSON.parse(row.event_json).event_id === candidate.event_id)).toHaveLength(1);
  expect(await client.publish(candidate)).toEqual({
    ok: false, commandId: candidate.event_id, error: "invalid_command", detail: "publish: duplicate event_id",
  });
  expect(f.ledger.readAfter(0)).toEqual(rows);
  expect(f.ledger.appends).toEqual([]);
  expect(f.ledger.batches).toEqual([]);
  expect(f.observations).toEqual([]);
  expect(f.broker.snapshotSeq).toBe(seq);
  expect(f.broker.snapshotProjectionInput().lifecycle.phase).toBe("active");
  expect(f.terminations()).toBe(0);
```

The duplicate lookups they reach are
`packages/broker/src/runtime-broker.ts:234-269`:

```ts
  async publish(event: import("@madventures/protocol").BridgeEventV1) {
    let row: LedgerRow;
    try {
      if (this.deps.ledger.hasEventId(event.event_id)) {
        return { ok: false as const, commandId: event.event_id, error: "invalid_command" as const, detail: "publish: duplicate event_id" };
      }
      row = this.deps.ledger.append(event);
```

```ts
  async publishIncident(event: import("@madventures/protocol").BridgeEventV1) {
    try {
      if (this.deps.ledger.hasEventId(event.event_id)) {
        return { ok: false as const, commandId: event.event_id, error: "invalid_command" as const, detail: "publish: duplicate event_id" };
      }
```

Both catch lookup errors, attempt a ledger_write_failed interruption and return
a ledger_write_failed refusal. `packages/ledger/src/ledger.ts:114-116`:

```ts
  hasEventId(eventId: string): boolean {
    return this.db.query("SELECT 1 FROM events WHERE event_id = ?").get(eventId) !== null;
  }
```

Tests added, not yet accepted as a fully passing file pair:

- `publish refuses a failing duplicate lookup and appends nothing to the unavailable ledger`
- `a refused publish duplicate builds no record and consumes no event id`
- `publishIncident refuses a failing duplicate lookup and appends nothing to the unavailable ledger`
- `a refused incident duplicate builds no record and consumes no event id`

The lookup tests close a test-owned SQLite ledger after capturing durable rows,
observe the real lookup throwing, require refusal, prohibit candidate append
attempts, require no observation and require teardown. They reopen the ledger
and compare every durable row. This exercises an unavailable ledger; it does
not claim a lookup-only failure with writes still available creates no
fail-closed interruption records.
The refused duplicate tests spy on record construction and count injected event
IDs. No source record or ID may be built/consumed on either refusal path.

First deliberate break: test-owned lookups returned false after ledger close
and for already-durable IDs. This bypassed query failure and duplicate refusal.
It was shown with git diff and restored byte-for-byte. Initial restored hashes:

- publish-legality.test.ts: `dc333ab707939292aa5975e62f3dc14a3e155981042b80f632fd47f41b3546ae`
- incident-atomicity.test.ts: `464953f100623d71164a8ae6ab4ac82d1446acb69a6160fc4f2c06b4ad486009`

The first restored run had 32 pass, 1 fail. Its new assertion wrongly required
zero attempted batches; the existing fail-closed path attempts a one-record
session_interrupted batch. No production defect was inferred. Under
DEC-20261023-01 B4, the assertion was corrected to prohibit the candidate in
any attempted batch while retaining the unchanged-durable-rows assertion.
The duplicate side-effect assertions were also ordered to display record and
ID counts before testing the returned refusal. No existing assertion changed.

A changed deliberate break was then applied to the corrected tests and shown
with git diff. Red run 2 observed publish creating 3 records/consuming 5 IDs,
and publishIncident creating 4 records/consuming 6 IDs, where both require 0.
The first load average was exactly 2.00. DEC-20261102-02 B4/B9 therefore halted
this build immediately; the failed run was not rerun.

Both deliberate breaks were removed as mandatory cleanup. cmp verified each
restored file against its pre-break corrected copy, with matching SHA-256:

- publish-legality.test.ts: `b13d63e809ae56d87693d1d6342630574cd611f21dbbbba3624999b4c5118505`
- incident-atomicity.test.ts: `2a8949a2ebe3aba9a3d70dc7947083869f93c4d500c4071a3602dd5ded2bb1fd`

No corrected green run, broker suite, or item 3 commit followed the halt.
The partial passing run contained all 24 publish tests passing and 8 of the 9
incident tests passing; the corrected pair has not been verified together.

Commands and evidence:

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; command -v bun; command -v bunx; shasum -a 256 "$(command -v bun)"; bun --version; bun -e 'process.stdout.write(Bun.revision)'`

Exit: 0. Summary: no output

Uptime: runtime check, not a test

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-03-runtime-run1.log`

SHA-256: `2b1d8a5ab9bebb7a1de8417a1458f7d8ff03fd90e03fe98190496a94b162ab1f`

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/broker/test/publish-legality.test.ts packages/broker/test/incident-atomicity.test.ts`

Exit: 1. Summary: 29 pass / 4 fail / 666 expect() calls / Ran 33 tests across 2 files. [180.00ms]

Uptime: 8:40  up 8 days, 49 mins, 17 users, load averages: 1.65 1.68 1.91

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-03-red-run1.log`

SHA-256: `d1a4bf2261365f5557c93cf6422bad9226d4278a1f0172346db0cb7c5ca26d46`

Failing run, verbatim:

```text
bun test v1.4.2 (744846f84)

packages/broker/test/publish-legality.test.ts:
(pass) publish row: normal collaboration set above in any non-active phase yields session_not_writable [2.89ms]
(pass) publish row: normal collaboration set above in active + incident yields incident_active [0.18ms]
(pass) publish row: incident in starting/interrupted/closing/closed yields session_not_writable [0.27ms]
(pass) publish row: incident in active/paused + existing incident yields incident_active [0.06ms]
(pass) publish row: legacy pause/resume/session_close in every phase yields unauthorized [0.23ms]
(pass) publish row: unknown or malformed event in every phase yields invalid_command [0.55ms]
(pass) a legacy execution-authored pause is rejected with unauthorized in every phase [0.17ms]
(pass) a malformed incident in a closed session is invalid_command, not session_not_writable [0.18ms]
(pass) a valid incident in a closed session is session_not_writable [0.04ms]
(pass) an execution principal publishing another execution's sender id is unauthorized [9.00ms]
(pass) an ordinary collaboration event does not require a pending approval [0.72ms]
(pass) an action_accept referencing a resolved approval fails with approval_not_pending [8.18ms]
(pass) BrokerResult.commandId equals event.event_id for publish [4.89ms]
(pass) an accepted ordinary event is appended once and published in exactly one snapshot [9.63ms]
(pass) an ownership_accept fails closed while pendingTransfers is not produced [7.14ms]
(pass) a legal published incident takes the atomic incident path [12.27ms]
(pass) a founder principal publishing any event is unauthorized [4.41ms]
(pass) a publish missing a required BridgeEventV1 field is invalid_command [1.45ms]
(pass) a failed append interrupts the session with ledger_write_failed [9.50ms]
(pass) a sender that is not ready fails at step 4 before any reference check [0.31ms]
(pass) a principal mismatch is unauthorized before any session check [0.05ms]
(pass) a duplicate event_id is refused without appending or interrupting the session [4.20ms]
442 |     expect(await f.broker.publish(candidate)).toEqual({
443 |       ok: false, commandId: candidate.event_id, error: "ledger_write_failed", detail: "publish: ledger_write_failed",
444 |     });
445 |     expect(lookup).toHaveBeenCalledTimes(1);
446 |     expect(lookup).toHaveBeenCalledWith(candidate.event_id);
447 |     expect(lookup.mock.results[0]?.type).toBe("throw");
                                               ^
error: expect(received).toBe(expected)

Expected: "throw"
Received: "return"

      at <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/packages/broker/test/publish-legality.test.ts:447:42)
(fail) publish refuses a failing duplicate lookup and appends nothing to the unavailable ledger [4.05ms]
460 |   const candidate = event({ event_id: "open-task24" });
461 |   const generated = f.generated();
462 |   const record = spyOn(f.broker as any, "record");
463 |   f.ledger.hasEventId = () => false; // deliberate break: bypass duplicate refusal
464 |   try {
465 |     expect(await f.broker.publish(candidate)).toEqual({
                                                    ^
error: expect(received).toEqual(expected)

  {
    "commandId": "open-task24",
-   "detail": "publish: duplicate event_id",
-   "error": "invalid_command",
+   "detail": "publish: ledger_write_failed",
+   "error": "ledger_write_failed",
    "ok": false,
  }

- Expected  - 2
+ Received  + 2

      at <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/packages/broker/test/publish-legality.test.ts:465:47)
(fail) a refused publish duplicate builds no record and consumes no event id [5.71ms]

packages/broker/test/incident-atomicity.test.ts:
(pass) a duplicate incident event_id is refused without appending or interrupting the session [3.95ms]
135 |     expect(await f.broker.publishIncident(candidate)).toEqual({
136 |       ok: false, commandId: candidate.event_id, error: "ledger_write_failed", detail: "publishIncident: ledger_write_failed",
137 |     });
138 |     expect(lookup).toHaveBeenCalledTimes(1);
139 |     expect(lookup).toHaveBeenCalledWith(candidate.event_id);
140 |     expect(lookup.mock.results[0]?.type).toBe("throw");
                                               ^
error: expect(received).toBe(expected)

Expected: "throw"
Received: "return"

      at <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/packages/broker/test/incident-atomicity.test.ts:140:42)
(fail) publishIncident refuses a failing duplicate lookup and appends nothing to the unavailable ledger [4.56ms]
154 |   const candidate = { ...incident(f.ledger), event_id: "open-task25" };
155 |   const generated = f.generated();
156 |   const record = spyOn(f.broker as any, "record");
157 |   f.ledger.hasEventId = () => false; // deliberate break: bypass duplicate refusal
158 |   try {
159 |     expect(await f.broker.publishIncident(candidate)).toEqual({
                                                            ^
error: expect(received).toEqual(expected)

  {
    "commandId": "open-task25",
-   "detail": "publish: duplicate event_id",
-   "error": "invalid_command",
+   "detail": "publishIncident: ledger_write_failed",
+   "error": "ledger_write_failed",
    "ok": false,
  }

- Expected  - 2
+ Received  + 2

      at <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/packages/broker/test/incident-atomicity.test.ts:159:55)
(fail) a refused incident duplicate builds no record and consumes no event id [6.77ms]
(pass) no snapshot is emitted between the source incident and the derived lifecycle record [12.43ms]
(pass) the derived record copies source_event_id and reported_by_execution_id from the originating event [16.45ms]
(pass) a supervisor-originated interruption sets both source fields to null [5.20ms]
(pass) the accepted result is returned only after the phase is interrupted [10.65ms]
(pass) the mandatory invalidation, closing, and closed records follow the incident pair [5.66ms]
(pass) a failed incident append interrupts the session with ledger_write_failed [9.33ms]

4 tests failed:
(fail) publish refuses a failing duplicate lookup and appends nothing to the unavailable ledger [4.05ms]
(fail) a refused publish duplicate builds no record and consumes no event id [5.71ms]
(fail) publishIncident refuses a failing duplicate lookup and appends nothing to the unavailable ledger [4.56ms]
(fail) a refused incident duplicate builds no record and consumes no event id [6.77ms]

 29 pass
 4 fail
 666 expect() calls
Ran 33 tests across 2 files. [180.00ms]
```

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bunx tsc --noEmit`

Exit: 0. Summary: no output

Uptime: 8:40  up 8 days, 49 mins, 17 users, load averages: 1.63 1.68 1.91

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-03-typecheck-run1.log`

SHA-256: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/broker/test/publish-legality.test.ts packages/broker/test/incident-atomicity.test.ts`

Exit: 1. Summary: 32 pass / 1 fail / 681 expect() calls / Ran 33 tests across 2 files. [172.00ms]

Uptime: 8:40  up 8 days, 49 mins, 17 users, load averages: 1.66 1.68 1.91

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-03-green-run1.log`

SHA-256: `0e5cdffe6b0afc7477c50bd3f3e14f913e92e63e1950a2e7e6da9b0635164345`

Failing run, verbatim:

```text
bun test v1.4.2 (744846f84)

packages/broker/test/publish-legality.test.ts:
(pass) publish row: normal collaboration set above in any non-active phase yields session_not_writable [2.81ms]
(pass) publish row: normal collaboration set above in active + incident yields incident_active [0.16ms]
(pass) publish row: incident in starting/interrupted/closing/closed yields session_not_writable [0.23ms]
(pass) publish row: incident in active/paused + existing incident yields incident_active [0.05ms]
(pass) publish row: legacy pause/resume/session_close in every phase yields unauthorized [0.24ms]
(pass) publish row: unknown or malformed event in every phase yields invalid_command [0.41ms]
(pass) a legacy execution-authored pause is rejected with unauthorized in every phase [0.09ms]
(pass) a malformed incident in a closed session is invalid_command, not session_not_writable [0.13ms]
(pass) a valid incident in a closed session is session_not_writable [0.03ms]
(pass) an execution principal publishing another execution's sender id is unauthorized [8.03ms]
(pass) an ordinary collaboration event does not require a pending approval [0.70ms]
(pass) an action_accept referencing a resolved approval fails with approval_not_pending [8.05ms]
(pass) BrokerResult.commandId equals event.event_id for publish [5.27ms]
(pass) an accepted ordinary event is appended once and published in exactly one snapshot [10.16ms]
(pass) an ownership_accept fails closed while pendingTransfers is not produced [7.21ms]
(pass) a legal published incident takes the atomic incident path [12.02ms]
(pass) a founder principal publishing any event is unauthorized [4.27ms]
(pass) a publish missing a required BridgeEventV1 field is invalid_command [1.41ms]
(pass) a failed append interrupts the session with ledger_write_failed [9.28ms]
(pass) a sender that is not ready fails at step 4 before any reference check [0.32ms]
(pass) a principal mismatch is unauthorized before any session check [0.05ms]
(pass) a duplicate event_id is refused without appending or interrupting the session [4.57ms]
(pass) publish refuses a failing duplicate lookup and appends nothing to the unavailable ledger [3.80ms]
(pass) a refused publish duplicate builds no record and consumes no event id [3.27ms]

packages/broker/test/incident-atomicity.test.ts:
(pass) a duplicate incident event_id is refused without appending or interrupting the session [4.07ms]
136 |     });
137 |     expect(lookup).toHaveBeenCalledTimes(1);
138 |     expect(lookup).toHaveBeenCalledWith(candidate.event_id);
139 |     expect(lookup.mock.results[0]?.type).toBe("throw");
140 |     expect(f.ledger.appends.some(value => value.event_id === candidate.event_id)).toBe(false);
141 |     expect(f.ledger.batches).toEqual([]);
                                   ^
error: expect(received).toEqual(expected)

- []
+ [
+   [
+     {
+       "actor": "madbridge",
+       "created_at": "2026-10-25T00:00:00Z",
+       "event_id": "lifecycle-task25-4",
+       "event_type": "session_interrupted",
+       "fencing_token": 1,
+       "payload": {
+         "incident_id": "lifecycle-task25-3",
+         "reason": "publishIncident: ledger_write_failed",
+         "reported_by_execution_id": null,
+         "severity": "high",
+         "source_event_id": null,
+       },
+       "previous_event_hash": "db8ff1c099be430b8462008e5883393162f4a4b4e5d98898ba809844cef8010d",
+       "protocol_version": "madbridge-protocol/v1",
+       "reason_code": "ledger_write_failed",
+       "repository_fingerprint": {
+         "git_sha": "cccccccccccccccccccccccccccccccccccccccc",
+         "kind": "commit",
+         "sha256": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
+       },
+       "session_id": "session-task25",
+       "task_envelope_hash": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
+     },
+   ],
+ ]

- Expected  - 1
+ Received  + 28

      at <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/packages/broker/test/incident-atomicity.test.ts:141:30)
(fail) publishIncident refuses a failing duplicate lookup and appends nothing to the unavailable ledger [4.21ms]
(pass) a refused incident duplicate builds no record and consumes no event id [3.53ms]
(pass) no snapshot is emitted between the source incident and the derived lifecycle record [12.14ms]
(pass) the derived record copies source_event_id and reported_by_execution_id from the originating event [17.30ms]
(pass) a supervisor-originated interruption sets both source fields to null [5.40ms]
(pass) the accepted result is returned only after the phase is interrupted [10.97ms]
(pass) the mandatory invalidation, closing, and closed records follow the incident pair [5.53ms]
(pass) a failed incident append interrupts the session with ledger_write_failed [9.87ms]

1 tests failed:
(fail) publishIncident refuses a failing duplicate lookup and appends nothing to the unavailable ledger [4.21ms]

 32 pass
 1 fail
 681 expect() calls
Ran 33 tests across 2 files. [172.00ms]
```

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/broker/test/publish-legality.test.ts packages/broker/test/incident-atomicity.test.ts`

Exit: 1. Summary: 29 pass / 4 fail / 666 expect() calls / Ran 33 tests across 2 files. [178.00ms]

Uptime: 8:41  up 8 days, 50 mins, 17 users, load averages: 2.00 1.76 1.92

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-03-red-run2.log`

SHA-256: `3d565b1c1ddffa29f4017b5a904a4effce6de8fa7c7f491ab2c76a0b38c17602`

Failing run, verbatim:

```text
bun test v1.4.2 (744846f84)

packages/broker/test/publish-legality.test.ts:
(pass) publish row: normal collaboration set above in any non-active phase yields session_not_writable [2.79ms]
(pass) publish row: normal collaboration set above in active + incident yields incident_active [0.17ms]
(pass) publish row: incident in starting/interrupted/closing/closed yields session_not_writable [0.25ms]
(pass) publish row: incident in active/paused + existing incident yields incident_active [0.05ms]
(pass) publish row: legacy pause/resume/session_close in every phase yields unauthorized [0.23ms]
(pass) publish row: unknown or malformed event in every phase yields invalid_command [0.42ms]
(pass) a legacy execution-authored pause is rejected with unauthorized in every phase [0.09ms]
(pass) a malformed incident in a closed session is invalid_command, not session_not_writable [0.13ms]
(pass) a valid incident in a closed session is session_not_writable [0.03ms]
(pass) an execution principal publishing another execution's sender id is unauthorized [9.13ms]
(pass) an ordinary collaboration event does not require a pending approval [0.73ms]
(pass) an action_accept referencing a resolved approval fails with approval_not_pending [8.07ms]
(pass) BrokerResult.commandId equals event.event_id for publish [4.97ms]
(pass) an accepted ordinary event is appended once and published in exactly one snapshot [10.19ms]
(pass) an ownership_accept fails closed while pendingTransfers is not produced [7.20ms]
(pass) a legal published incident takes the atomic incident path [11.96ms]
(pass) a founder principal publishing any event is unauthorized [4.24ms]
(pass) a publish missing a required BridgeEventV1 field is invalid_command [1.39ms]
(pass) a failed append interrupts the session with ledger_write_failed [9.45ms]
(pass) a sender that is not ready fails at step 4 before any reference check [0.32ms]
(pass) a principal mismatch is unauthorized before any session check [0.06ms]
(pass) a duplicate event_id is refused without appending or interrupting the session [4.19ms]
442 |     expect(await f.broker.publish(candidate)).toEqual({
443 |       ok: false, commandId: candidate.event_id, error: "ledger_write_failed", detail: "publish: ledger_write_failed",
444 |     });
445 |     expect(lookup).toHaveBeenCalledTimes(1);
446 |     expect(lookup).toHaveBeenCalledWith(candidate.event_id);
447 |     expect(lookup.mock.results[0]?.type).toBe("throw");
                                               ^
error: expect(received).toBe(expected)

Expected: "throw"
Received: "return"

      at <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/packages/broker/test/publish-legality.test.ts:447:42)
(fail) publish refuses a failing duplicate lookup and appends nothing to the unavailable ledger [3.94ms]
461 |   const generated = f.generated();
462 |   const record = spyOn(f.broker as any, "record");
463 |   f.ledger.hasEventId = () => false; // deliberate break: bypass duplicate refusal
464 |   try {
465 |     const result = await f.broker.publish(candidate);
466 |     expect({ records: record.mock.calls.length, ids: f.generated() - generated }).toEqual({ records: 0, ids: 0 });
                                                                                        ^
error: expect(received).toEqual(expected)

  {
-   "ids": 0,
-   "records": 0,
+   "ids": 5,
+   "records": 3,
  }

- Expected  - 2
+ Received  + 2

      at <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/packages/broker/test/publish-legality.test.ts:466:83)
(fail) a refused publish duplicate builds no record and consumes no event id [5.95ms]

packages/broker/test/incident-atomicity.test.ts:
(pass) a duplicate incident event_id is refused without appending or interrupting the session [4.15ms]
135 |     expect(await f.broker.publishIncident(candidate)).toEqual({
136 |       ok: false, commandId: candidate.event_id, error: "ledger_write_failed", detail: "publishIncident: ledger_write_failed",
137 |     });
138 |     expect(lookup).toHaveBeenCalledTimes(1);
139 |     expect(lookup).toHaveBeenCalledWith(candidate.event_id);
140 |     expect(lookup.mock.results[0]?.type).toBe("throw");
                                               ^
error: expect(received).toBe(expected)

Expected: "throw"
Received: "return"

      at <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/packages/broker/test/incident-atomicity.test.ts:140:42)
(fail) publishIncident refuses a failing duplicate lookup and appends nothing to the unavailable ledger [3.98ms]
155 |   const generated = f.generated();
156 |   const record = spyOn(f.broker as any, "record");
157 |   f.ledger.hasEventId = () => false; // deliberate break: bypass duplicate refusal
158 |   try {
159 |     const result = await f.broker.publishIncident(candidate);
160 |     expect({ records: record.mock.calls.length, ids: f.generated() - generated }).toEqual({ records: 0, ids: 0 });
                                                                                        ^
error: expect(received).toEqual(expected)

  {
-   "ids": 0,
-   "records": 0,
+   "ids": 6,
+   "records": 4,
  }

- Expected  - 2
+ Received  + 2

      at <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/packages/broker/test/incident-atomicity.test.ts:160:83)
(fail) a refused incident duplicate builds no record and consumes no event id [5.98ms]
(pass) no snapshot is emitted between the source incident and the derived lifecycle record [11.67ms]
(pass) the derived record copies source_event_id and reported_by_execution_id from the originating event [17.57ms]
(pass) a supervisor-originated interruption sets both source fields to null [5.17ms]
(pass) the accepted result is returned only after the phase is interrupted [10.54ms]
(pass) the mandatory invalidation, closing, and closed records follow the incident pair [5.55ms]
(pass) a failed incident append interrupts the session with ledger_write_failed [9.31ms]

4 tests failed:
(fail) publish refuses a failing duplicate lookup and appends nothing to the unavailable ledger [3.94ms]
(fail) a refused publish duplicate builds no record and consumes no event id [5.95ms]
(fail) publishIncident refuses a failing duplicate lookup and appends nothing to the unavailable ledger [3.98ms]
(fail) a refused incident duplicate builds no record and consumes no event id [5.98ms]

 29 pass
 4 fail
 666 expect() calls
Ran 33 tests across 2 files. [178.00ms]
```

Deviation/self-fix: the one overstrict new assertion and its correction above.
A changed red control ran after the correction; the load halt prevented the
required D3 restart from typecheck and green verification. Halt class: a failing test run whose first load average
was 2.0 or more. Items 4, 7, 8, 9 and 10 and final gates were not started.

### Item 3 resumed: Founder ruling and completion

Founder ruling, verbatim:

> Founder ruling: resume item 3. The B9 load halt applies only when a test fails unexpectedly in a run whose first load average was 2.0 or more. The four failures of your deliberate-break run were the intended failures that show the tests catch the break, so that run is a RED or break run working as designed, not a B9 halt, at any load. Both breaks are restored with matching hashes. Now run item 3's tests and the suites it touches in a normal run; if every test passes, append item 3's build-log section and commit, then continue with item 4. If a test fails unexpectedly in a run whose first load average was 2.0 or more, halt as B9 says; otherwise handle any failure under DEC-20261023-01 Part B. Record this ruling in the build log. Apply the same reading to every later deliberate-break or RED run without stopping.

The prior load halt is resolved by this ruling. For all later controls, only
unexpected failures at first load >= 2.0 trigger B9. Intended RED failures
remain evidence at any load. No earlier run was repeated unchanged to pass.

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bunx tsc --noEmit`

Exit: 0. Summary: exit 0, no output

Uptime: 8:48  up 8 days, 57 mins, 17 users, load averages: 1.51 2.43 2.39

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-03-typecheck-run2.log`

SHA-256: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/broker/test/publish-legality.test.ts packages/broker/test/incident-atomicity.test.ts`

Exit: 0. Summary: 33 pass / 0 fail / 682 expect() calls / Ran 33 tests across 2 files. [164.00ms]

Uptime: 8:48  up 8 days, 57 mins, 17 users, load averages: 1.51 2.43 2.39

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-03-green-run2.log`

SHA-256: `2e39a47bdeb818edcd20846a39d2bc2a9e958c7c04beb05ea88b57681792dece`

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/broker`

Exit: 0. Summary: 305 pass / 0 fail / 2711 expect() calls / Ran 305 tests across 17 files. [13.00s]

Uptime: 8:48  up 8 days, 57 mins, 17 users, load averages: 1.51 2.43 2.39

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-03-broker-run1.log`

SHA-256: `d75037c7ac696a111e8b8394364972556f29527fa3592a90e7c608c918186f41`

Passing file counts: publish-legality.test.ts 24; incident-atomicity.test.ts 9.
Broker suite 305 pass, 0 fail. `git diff --check`: exit 0. No active halt.
