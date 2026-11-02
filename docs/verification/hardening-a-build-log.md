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

## Item 4: child environment equals the launch frame

Built on: `dcf5fb874c116ce2f075e8f067fc611cef702cd4`.

Files changed: `packages/pty-host/test/environment.test.ts` and this log.

Relies on spec section 3.2: "The host passes only that environment to the
child." Production packages/pty-host/src/terminal.ts:79-83:

```ts
  const child = Bun.spawn([path, ...argv], {
    terminal,
    detached: true,
    env: { ...env },
  });
```

Test added: `the governed child receives exactly the launch frame environment
despite a host-only variable` (one passing test in environment.test.ts).
The real host receives only a synthetic host-only variable. Its real governed
Bun child receives the launch frame's two synthetic variables, reports its
entire environment, then is terminated through the host protocol. Both
runtimes disable dotenv loading. No ambient values can enter the report.

Deliberate break: a test-only host preload made the real governed spawn merge
the host environment into the launch environment. git diff showed the break.
The valid RED run reported the extra MADV_HOST_ONLY entry at the exact
environment-equality assertion. This intended RED began at load 2.02; under
the Founder's clarified B9 ruling it is evidence, not a halt.

The break was restored, cmp matched the pre-break copy, and restored SHA-256 is
`561fa2866a8a98a1a257721ae58f73b02615ba5eec217f95240e116e525710f0`.

Deviation/self-fix: the first one-shot /usr/bin/env fixture returned host exit
code 1 before reaching the environment assertion. This is not accepted RED
evidence. Its first load was 1.40, so B4 allowed a fixture correction. The
controlled-lifetime Bun fixture preserves exact environment equality and
allows protocol-driven termination after the report arrives. Verification
restarted with typecheck after that correction. No production change.

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; command -v bun; command -v bunx; shasum -a 256 "$(command -v bun)"; bun --version; bun -e 'process.stdout.write(Bun.revision)'`

Exit: 0. Summary: runtime match or silent success

Uptime: runtime check, not a test

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-04-runtime-run1.log`

SHA-256: `2b1d8a5ab9bebb7a1de8417a1458f7d8ff03fd90e03fe98190496a94b162ab1f`

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/pty-host/test/environment.test.ts`

Exit: 1. Summary: 0 pass / 1 fail / 1 expect() calls / Ran 1 test across 1 file. [3.08s]

Uptime: 8:51  up 8 days, 59 mins, 17 users, load averages: 1.40 2.04 2.23

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-04-red-run1.log`

SHA-256: `40158001f93711cf044db39e7f3a64462ba810a82133b6cc0c8b60297e2e3d2d`

Failing run, verbatim:

```text
bun test v1.4.2 (744846f84)

packages/pty-host/test/environment.test.ts:
26 |     host.stdin.flush();
27 |     const code = await Promise.race([
28 |       host.exited,
29 |       new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error("host did not exit")), 4000); }),
30 |     ]);
31 |     expect(code).toBe(0);
                      ^
error: expect(received).toBe(expected)

Expected: 0
Received: 1

      at <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/packages/pty-host/test/environment.test.ts:31:18)
(fail) the governed child receives exactly the launch frame environment despite a host-only variable [3068.38ms]

 0 pass
 1 fail
 1 expect() calls
Ran 1 test across 1 file. [3.08s]
```

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/pty-host/test/environment.test.ts`

Exit: 1. Summary: 0 pass / 1 fail / 4 expect() calls / Ran 1 test across 1 file. [170.00ms]

Uptime: 8:53  up 8 days,  1:02, 17 users, load averages: 2.02 2.00 2.18

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-04-red-run2.log`

SHA-256: `2522952ba4adf19f21583582c721f42a1e1b76cc123ffa044bc07f98ad6ac18d`

Failing run, verbatim:

```text
bun test v1.4.2 (744846f84)

packages/pty-host/test/environment.test.ts:
53 |       new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error("host did not exit")), 4000); }),
54 |     ]);
55 |     await pumped;
56 |     expect({ code, stderr: await stderr }).toEqual({ code: 0, stderr: "" });
57 |     expect(launched).toBe(true);
58 |     expect(JSON.parse(Buffer.concat(output).toString().trim())).toEqual(launchEnvironment);
                                                                     ^
error: expect(received).toEqual(expected)

  {
    "MADV_CHILD_ONE": "synthetic-child-one",
    "MADV_CHILD_TWO": "synthetic-child-two",
+   "MADV_HOST_ONLY": "synthetic-host-only",
  }

- Expected  - 0
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/packages/pty-host/test/environment.test.ts:58:65)
(fail) the governed child receives exactly the launch frame environment despite a host-only variable [159.45ms]

 0 pass
 1 fail
 4 expect() calls
Ran 1 test across 1 file. [170.00ms]
```

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bunx tsc --noEmit`

Exit: 0. Summary: runtime match or silent success

Uptime: 8:53  up 8 days,  1:02, 17 users, load averages: 1.86 1.97 2.17

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-04-typecheck-run1.log`

SHA-256: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/pty-host/test/environment.test.ts`

Exit: 0. Summary: 1 pass / 0 fail / 4 expect() calls / Ran 1 test across 1 file. [150.00ms]

Uptime: 8:53  up 8 days,  1:02, 17 users, load averages: 2.11 2.02 2.19

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-04-green-run1.log`

SHA-256: `ded7634f98600fe093908eff344397936e7ff2d79feda28552762a6d09201f6a`

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/pty-host`

Exit: 0. Summary: 49 pass / 0 fail / 773 expect() calls / Ran 49 tests across 6 files. [26.39s]

Uptime: 8:53  up 8 days,  1:02, 17 users, load averages: 2.11 2.02 2.19

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-04-pty-host-run1.log`

SHA-256: `aba8bf44f1386501373bdce8b8490c462397d9b8e4526952c722cf21acf3331c`

`git diff --check`: exit 0. PTY-host suite: 49 pass, 0 fail. No active halt.

## Item 7: indented value imports

Built on: `cf91f0d0e9db1bff93cc21000ea3c40442db6a99`.

Files changed: packages/broker/test/fencing.test.ts and this log.

Relies on both checks at parent fencing.test.ts:331 and :1498, verbatim:

```ts
    const valueImports = source.split("\n").filter((l) => /^import\s+(?!type\b)/.test(l));
```

Both now use VALUE_IMPORT, `/^\s*import(?!\s+type\b)\s+/`, so indentation
is caught while type-only imports remain excluded even with multiple spaces.
The existing expected value-import inventories are unchanged. Test added:
`both value-import checks catch imports at any indentation`. It exercises
column zero, spaces and tabs, plus type-only negative controls.

Deliberate break: return the shared pattern to the original column-zero
pattern. git diff showed the break. The first RED reached the multiple-space
type-only assertion first; the assertion order was then changed so the second
RED reaches the required indented-value-import assertion, expected true but
received false. No assertion was removed or weakened. No production change.
The final test file was restored and cmp matched its saved pre-break copy.
Restored SHA-256: `eb58a523928693060b78bdda0176031bd84f31bdc7b52d2c097487c117c8adae`.

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; command -v bun; command -v bunx; shasum -a 256 "$(command -v bun)"; bun --version; bun -e 'process.stdout.write(Bun.revision)'`

Exit: 0. Summary: runtime match or silent success

Uptime: runtime check, not a test

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-07-runtime-run1.log`

SHA-256: `2b1d8a5ab9bebb7a1de8417a1458f7d8ff03fd90e03fe98190496a94b162ab1f`

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/broker/test/fencing.test.ts`

Exit: 1. Summary: 69 pass / 1 fail / 666 expect() calls / Ran 70 tests across 1 file. [166.00ms]

Uptime: 8:56  up 8 days,  1:05, 17 users, load averages: 1.29 1.71 2.02

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-07-red-run1.log`

SHA-256: `e80bf6e33808e6d12109cac90cf4897c5949fbc38b8b7b091d04a4437c162813`

Failing run, verbatim:

```text
bun test v1.4.2 (744846f84)

packages/broker/test/fencing.test.ts:
38 |
39 | test("both value-import checks catch imports at any indentation", () => {
40 |   for (const indent of ["", "  ", "\t"]) {
41 |     expect(VALUE_IMPORT.test(`${indent}import { forbidden } from "unexpected-module";`)).toBe(true);
42 |     expect(VALUE_IMPORT.test(`${indent}import type { Allowed } from "types-only";`)).toBe(false);
43 |     expect(VALUE_IMPORT.test(`${indent}import   type { Allowed } from "types-only";`)).toBe(false);
                                                                                            ^
error: expect(received).toBe(expected)

Expected: false
Received: true

      at <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/packages/broker/test/fencing.test.ts:43:88)
(fail) both value-import checks catch imports at any indentation [0.42ms]
(pass) Task 18 named tests > the initial token is exactly 1 [0.06ms]
(pass) Task 18 named tests > pause neither invalidates nor increments the token [0.43ms]
(pass) Task 18 named tests > an ownership transfer increments the token and appends fencing_token_issued [0.09ms]
(pass) Task 18 named tests > no token can be re-issued after interruption [0.07ms]
(pass) Task 18 named tests > a successor session begins again at 1 [0.03ms]
(pass) initial issuance > initial issuance is deterministic and returns a protocol-valid record [0.18ms]
(pass) initial issuance > initial issuance is legal only before activation in the canonical reducer [0.08ms]
(pass) initial issuance > no token exists during preflight or initial starting until issuance [0.04ms]
(pass) initial issuance > the initial token value is independent of session, writer, and context values [0.03ms]
(pass) FencingRecordContext is copied exactly and never generated > every carried value in an issued record equals the caller-supplied context [0.03ms]
(pass) FencingRecordContext is copied exactly and never generated > every carried value in transfer and invalidation records equals the caller-supplied context [0.06ms]
(pass) FencingRecordContext is copied exactly and never generated > no ambient timestamp or event id: identical inputs always yield identical records [0.03ms]
(pass) FencingRecordContext is copied exactly and never generated > the production module performs no clock, random, filesystem, environment, or ledger discovery [0.41ms]
(pass) ownership transfer > a transfer preserves the session identity and records the new writer [0.03ms]
(pass) ownership transfer > a transfer increments by exactly one, never more, across a long chain [0.07ms]
(pass) ownership transfer > a transfer is legal while the issued session is still starting and does not change phase [0.02ms]
(pass) ownership transfer > a transfer never issues token 1 while a current token exists [0.02ms]
(pass) ownership transfer > transfer with a null session fails closed with missing_session_id and substitutes nothing [0.04ms]
(pass) ownership transfer > transfer fails closed on every phase outside starting and active [0.05ms]
(pass) ownership transfer > transfer fails closed when no current token has been issued [0.02ms]
(pass) ownership transfer > transfer fails closed on an invalidated, unusable, or malformed token state [0.09ms]
(pass) invalidation > interruption invalidates the current token and carries the incident id [0.08ms]
(pass) invalidation > Founder close invalidates the current token at closing with a null incident [0.03ms]
(pass) invalidation > rollback invalidates the current token at closed with a null incident [0.02ms]
(pass) invalidation > invalidation never mints a replacement token [0.04ms]
(pass) invalidation > the incident id is preserved exactly, including a caller-supplied null [0.02ms]
(pass) invalidation > invalidation with a null session fails closed with missing_session_id [0.03ms]
(pass) invalidation > invalidation fails closed in starting, active, and paused [0.03ms]
(pass) invalidation > invalidation fails closed when no token was issued or the token is already invalidated [0.04ms]
(pass) invalidation > after interruption and invalidation the canonical reducer forbids any further issuance in-session [0.08ms]
(pass) FencingError > is an Error with a stable name and one of the four approved kinds [0.03ms]
(pass) FencingError > a null session is reported before any phase or token defect [0.03ms]
(pass) tokenKey > joins session id and token with exactly one real NUL byte [0.07ms]
(pass) tokenKey > distinct (session_id, token) pairs produce distinct keys at digit boundaries [0.03ms]
(pass) tokenKey > the key matches the identity carried by issued records [0.02ms]
(pass) Task49 prerequisite pause and resume persist canonical events without changing the token [8.84ms]
(pass) Task49 prerequisite pause and resume refuse invalid phases without adding ledger rows [7.46ms]
(pass) Task49 prerequisite activation retains isolated execution snapshots and omission preserves null [6.72ms]
(pass) Task49 prerequisite reconstruction retains isolated execution facts without permitting reactivation [3.54ms]
(pass) Task 19 named tests > startup appends fencing_token_issued then session_activated in that order [3.39ms]
(pass) Task 19 named tests > no active snapshot is exposed until both startup records are durable [3.41ms]
(pass) Task 19 named tests > interruption appends the four records in the specified order [5.51ms]
(pass) Task 19 named tests > Founder close appends closing, invalidation, then closed [4.86ms]
(pass) Task 19 named tests > a failed activation append compensates atomically with session_abort then fencing_token_invalidated and never publishes active [3.60ms]
(pass) Task 19 construction derives everything from the durable ledger > construction fails closed when replay yields no session identity and substitutes nothing [3.96ms]
(pass) Task 19 construction derives everything from the durable ledger > construction propagates an impossible durable order instead of normalizing it [2.61ms]
(pass) Task 19 construction derives everything from the durable ledger > the projection and the durable head are derived from existing rows: the first append chains from the last durable row [4.64ms]
(pass) Task 19 construction derives everything from the durable ledger > session identity is derived from the durable session_open, never from provenance or a generated value [4.62ms]
(pass) Task 19 construction derives everything from the durable ledger > the head advances only from returned rows: every record chains from the preceding durable row across a full lifecycle [5.14ms]
(pass) Task 19 activation preconditions > activate fails closed before any write on an empty or duplicated readiness set [4.49ms]
(pass) Task 19 activation preconditions > activate is refused after activation and after a durable issuance that never activated [5.80ms]
(pass) Task 19 activation preconditions > interrupt and Founder close are refused before activation and write nothing [2.38ms]
(pass) Task 19 activation preconditions > a terminal session refuses every further transition and writes nothing [4.95ms]
(pass) Task 19 observation and snapshotSeq > snapshotSeq starts at 0, increments by exactly one per published observation, and equals the last published value [5.28ms]
(pass) Task 19 observation and snapshotSeq > every observation is published only after its row is durable and folded: the phase equals the canonical replay through that row [6.05ms]
(pass) Task 19 observation and snapshotSeq > observation order equals durable order [4.80ms]
(pass) Task 19 observation and snapshotSeq > the activation record's readiness_snapshot_seq is the broker-owned local sequence current at construction [3.32ms]
(pass) Task 19 fencing context ownership > issued and invalidated records carry the injected provenance and the deterministic sources in call order [4.38ms]
(pass) Task 19 fencing context ownership > no projection, session identity, durable head, or pre-built fencing context can be injected [2.03ms]
(pass) Task 19 durable prefixes are separate transactions > interruption prefixes are durable separately: a rejected session_closing leaves session_interrupted and fencing_token_invalidated durable [4.04ms]
(pass) Task 19 durable prefixes are separate transactions > a rejected fencing_token_invalidated leaves session_interrupted alone durable [3.41ms]
(pass) Task 19 durable prefixes are separate transactions > Founder-close prefixes are durable separately: a rejected invalidation leaves session_closing durable and terminates nothing [3.55ms]
(pass) Task 19 durable prefixes are separate transactions > compensation is all-or-nothing: a rejected invalidation record leaves no session_abort behind [3.17ms]
(pass) Task 19 governed-process termination > a rejecting terminator leaves an interruption at durable closing with no session_closed and no closed observation [4.44ms]
(pass) Task 19 governed-process termination > a rejecting terminator leaves a Founder close at durable closing with the token invalidated and no session_closed [3.97ms]
(pass) Task 19 governed-process termination > session_closed is appended only after the terminator resolves [4.48ms]
(pass) Task 19 governed-process termination > the terminator is never invoked by activation, by a failed activation, or by a refused transition [6.61ms]
(pass) Task 19 module discipline > the runtime broker performs no ambient discovery, holds no process authority, and batches only the compensation [0.81ms]
(pass) Task 19 module discipline > the broker index does not export RuntimeBroker; this test imports it directly [0.07ms]

1 tests failed:
(fail) both value-import checks catch imports at any indentation [0.42ms]

 69 pass
 1 fail
 666 expect() calls
Ran 70 tests across 1 file. [166.00ms]
```

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/broker/test/fencing.test.ts`

Exit: 1. Summary: 69 pass / 1 fail / 665 expect() calls / Ran 70 tests across 1 file. [164.00ms]

Uptime: 8:56  up 8 days,  1:05, 17 users, load averages: 1.27 1.67 2.00

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-07-red-run2.log`

SHA-256: `f6a8930b4fbcbba762421d5c0ef065e2c4f64a831e057bd2c7f12e9da0b51ef1`

Failing run, verbatim:

```text
bun test v1.4.2 (744846f84)

packages/broker/test/fencing.test.ts:
36 |
37 | const VALUE_IMPORT = /^import\s+(?!type\b)/;
38 |
39 | test("both value-import checks catch imports at any indentation", () => {
40 |   for (const indent of ["", "  ", "\t"]) {
41 |     expect(VALUE_IMPORT.test(`${indent}import { forbidden } from "unexpected-module";`)).toBe(true);
                                                                                              ^
error: expect(received).toBe(expected)

Expected: true
Received: false

      at <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/packages/broker/test/fencing.test.ts:41:90)
(fail) both value-import checks catch imports at any indentation [0.48ms]
(pass) Task 18 named tests > the initial token is exactly 1 [0.08ms]
(pass) Task 18 named tests > pause neither invalidates nor increments the token [0.49ms]
(pass) Task 18 named tests > an ownership transfer increments the token and appends fencing_token_issued [0.10ms]
(pass) Task 18 named tests > no token can be re-issued after interruption [0.07ms]
(pass) Task 18 named tests > a successor session begins again at 1 [0.03ms]
(pass) initial issuance > initial issuance is deterministic and returns a protocol-valid record [0.17ms]
(pass) initial issuance > initial issuance is legal only before activation in the canonical reducer [0.08ms]
(pass) initial issuance > no token exists during preflight or initial starting until issuance [0.04ms]
(pass) initial issuance > the initial token value is independent of session, writer, and context values [0.03ms]
(pass) FencingRecordContext is copied exactly and never generated > every carried value in an issued record equals the caller-supplied context [0.02ms]
(pass) FencingRecordContext is copied exactly and never generated > every carried value in transfer and invalidation records equals the caller-supplied context [0.06ms]
(pass) FencingRecordContext is copied exactly and never generated > no ambient timestamp or event id: identical inputs always yield identical records [0.03ms]
(pass) FencingRecordContext is copied exactly and never generated > the production module performs no clock, random, filesystem, environment, or ledger discovery [0.41ms]
(pass) ownership transfer > a transfer preserves the session identity and records the new writer [0.03ms]
(pass) ownership transfer > a transfer increments by exactly one, never more, across a long chain [0.07ms]
(pass) ownership transfer > a transfer is legal while the issued session is still starting and does not change phase [0.02ms]
(pass) ownership transfer > a transfer never issues token 1 while a current token exists [0.02ms]
(pass) ownership transfer > transfer with a null session fails closed with missing_session_id and substitutes nothing [0.04ms]
(pass) ownership transfer > transfer fails closed on every phase outside starting and active [0.05ms]
(pass) ownership transfer > transfer fails closed when no current token has been issued [0.02ms]
(pass) ownership transfer > transfer fails closed on an invalidated, unusable, or malformed token state [0.08ms]
(pass) invalidation > interruption invalidates the current token and carries the incident id [0.05ms]
(pass) invalidation > Founder close invalidates the current token at closing with a null incident [0.03ms]
(pass) invalidation > rollback invalidates the current token at closed with a null incident [0.02ms]
(pass) invalidation > invalidation never mints a replacement token [0.03ms]
(pass) invalidation > the incident id is preserved exactly, including a caller-supplied null [0.02ms]
(pass) invalidation > invalidation with a null session fails closed with missing_session_id [0.03ms]
(pass) invalidation > invalidation fails closed in starting, active, and paused [0.03ms]
(pass) invalidation > invalidation fails closed when no token was issued or the token is already invalidated [0.04ms]
(pass) invalidation > after interruption and invalidation the canonical reducer forbids any further issuance in-session [0.09ms]
(pass) FencingError > is an Error with a stable name and one of the four approved kinds [0.03ms]
(pass) FencingError > a null session is reported before any phase or token defect [0.03ms]
(pass) tokenKey > joins session id and token with exactly one real NUL byte [0.06ms]
(pass) tokenKey > distinct (session_id, token) pairs produce distinct keys at digit boundaries [0.02ms]
(pass) tokenKey > the key matches the identity carried by issued records [0.01ms]
(pass) Task49 prerequisite pause and resume persist canonical events without changing the token [8.37ms]
(pass) Task49 prerequisite pause and resume refuse invalid phases without adding ledger rows [7.31ms]
(pass) Task49 prerequisite activation retains isolated execution snapshots and omission preserves null [6.68ms]
(pass) Task49 prerequisite reconstruction retains isolated execution facts without permitting reactivation [3.51ms]
(pass) Task 19 named tests > startup appends fencing_token_issued then session_activated in that order [3.42ms]
(pass) Task 19 named tests > no active snapshot is exposed until both startup records are durable [3.40ms]
(pass) Task 19 named tests > interruption appends the four records in the specified order [5.64ms]
(pass) Task 19 named tests > Founder close appends closing, invalidation, then closed [4.72ms]
(pass) Task 19 named tests > a failed activation append compensates atomically with session_abort then fencing_token_invalidated and never publishes active [3.63ms]
(pass) Task 19 construction derives everything from the durable ledger > construction fails closed when replay yields no session identity and substitutes nothing [3.99ms]
(pass) Task 19 construction derives everything from the durable ledger > construction propagates an impossible durable order instead of normalizing it [2.70ms]
(pass) Task 19 construction derives everything from the durable ledger > the projection and the durable head are derived from existing rows: the first append chains from the last durable row [4.73ms]
(pass) Task 19 construction derives everything from the durable ledger > session identity is derived from the durable session_open, never from provenance or a generated value [4.52ms]
(pass) Task 19 construction derives everything from the durable ledger > the head advances only from returned rows: every record chains from the preceding durable row across a full lifecycle [4.81ms]
(pass) Task 19 activation preconditions > activate fails closed before any write on an empty or duplicated readiness set [4.58ms]
(pass) Task 19 activation preconditions > activate is refused after activation and after a durable issuance that never activated [6.39ms]
(pass) Task 19 activation preconditions > interrupt and Founder close are refused before activation and write nothing [2.27ms]
(pass) Task 19 activation preconditions > a terminal session refuses every further transition and writes nothing [4.47ms]
(pass) Task 19 observation and snapshotSeq > snapshotSeq starts at 0, increments by exactly one per published observation, and equals the last published value [5.33ms]
(pass) Task 19 observation and snapshotSeq > every observation is published only after its row is durable and folded: the phase equals the canonical replay through that row [5.74ms]
(pass) Task 19 observation and snapshotSeq > observation order equals durable order [4.36ms]
(pass) Task 19 observation and snapshotSeq > the activation record's readiness_snapshot_seq is the broker-owned local sequence current at construction [3.10ms]
(pass) Task 19 fencing context ownership > issued and invalidated records carry the injected provenance and the deterministic sources in call order [4.46ms]
(pass) Task 19 fencing context ownership > no projection, session identity, durable head, or pre-built fencing context can be injected [2.10ms]
(pass) Task 19 durable prefixes are separate transactions > interruption prefixes are durable separately: a rejected session_closing leaves session_interrupted and fencing_token_invalidated durable [4.09ms]
(pass) Task 19 durable prefixes are separate transactions > a rejected fencing_token_invalidated leaves session_interrupted alone durable [3.46ms]
(pass) Task 19 durable prefixes are separate transactions > Founder-close prefixes are durable separately: a rejected invalidation leaves session_closing durable and terminates nothing [3.46ms]
(pass) Task 19 durable prefixes are separate transactions > compensation is all-or-nothing: a rejected invalidation record leaves no session_abort behind [3.21ms]
(pass) Task 19 governed-process termination > a rejecting terminator leaves an interruption at durable closing with no session_closed and no closed observation [4.52ms]
(pass) Task 19 governed-process termination > a rejecting terminator leaves a Founder close at durable closing with the token invalidated and no session_closed [4.00ms]
(pass) Task 19 governed-process termination > session_closed is appended only after the terminator resolves [4.78ms]
(pass) Task 19 governed-process termination > the terminator is never invoked by activation, by a failed activation, or by a refused transition [6.49ms]
(pass) Task 19 module discipline > the runtime broker performs no ambient discovery, holds no process authority, and batches only the compensation [0.81ms]
(pass) Task 19 module discipline > the broker index does not export RuntimeBroker; this test imports it directly [0.07ms]

1 tests failed:
(fail) both value-import checks catch imports at any indentation [0.48ms]

 69 pass
 1 fail
 665 expect() calls
Ran 70 tests across 1 file. [164.00ms]
```

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bunx tsc --noEmit`

Exit: 0. Summary: runtime match or silent success

Uptime: 8:56  up 8 days,  1:05, 17 users, load averages: 1.65 1.75 2.02

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-07-typecheck-run1.log`

SHA-256: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/broker/test/fencing.test.ts`

Exit: 0. Summary: 70 pass / 0 fail / 672 expect() calls / Ran 70 tests across 1 file. [159.00ms]

Uptime: 8:56  up 8 days,  1:05, 17 users, load averages: 1.76 1.77 2.03

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-07-green-run1.log`

SHA-256: `071fe34db4ca7bbb4a8feed0f2c561b022d6e5a4180ab78be7e564d51244b72d`

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/broker`

Exit: 0. Summary: 306 pass / 0 fail / 2720 expect() calls / Ran 306 tests across 17 files. [13.00s]

Uptime: 8:56  up 8 days,  1:05, 17 users, load averages: 1.76 1.77 2.03

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-07-broker-run1.log`

SHA-256: `b8fac878a40104b205e5c200e82a1bfb77c7329351d572e423517096c4455c56`

fencing.test.ts 70 pass, 0 fail; broker 306 pass, 0 fail.
`git diff --check` before this commit reported three trailing spaces in
copied diagnostic blank lines; the shell mistakenly continued to commit.
The raw external logs retain those bytes; the log rendering is corrected in
the next item commit. Deviation: assertion ordering and this gate-reporting
error. No B9 halt applies to the formatting correction.

### Correction carried into the next log commit

Item 7 diff-check evidence: item-07-diffcheck-run1.log, exit 2, SHA-256
`b0f121a8c99b5e4a9d4e9c9ad8a8ed6aa656292c3c6da85df6689f88711e0d01`. Three copied source-context blank lines are whitespace-
normalized in this Markdown rendering. The original logs remain full and
byte-identical; their quoted rendering is not a byte-for-byte log copy.
Subsequent commit commands fail immediately on diff-check errors.

## Item 8: doctor statuses and both directories

Built on: `f527c00aaf5a9cfe0d98fd17276613911803781c`.

Files changed: apps/madbridge/test/doctor.test.ts and this log.

Relies on these parent doctor.test.ts:53-69 tests, verbatim:

```ts
  test("no files created in cwd", async () => {
    const before = readdirSync(tempDir);
    const result = await runDoctor([], { cwd: tempDir });
    expect(result.exitCode).toBe(0);
    const after = readdirSync(tempDir);
    expect(after).toEqual(before);
  });

  test("no files created in home .madv-runtime", async () => {
    // Use a temp runtime dir to verify doctor doesn't write to it
    const runtimeDir = join(tempDir, "runtime");
    const before = existsSync(runtimeDir);
    const result = await runDoctor([], { cwd: tempDir });
    expect(result.exitCode).toBe(0);
    const after = existsSync(runtimeDir);
    expect(after).toBe(before);
  });
```

And the parent output-format assertion at lines 132-141, verbatim:

```ts
  test("each check has name, status, and detail", async () => {
    const result = await runDoctor(["--json"]);
    expect(result.exitCode).toBe(0);
    const json = JSON.parse(result.stdout);
    for (const check of json.checks) {
      expect(check).toHaveProperty("name");
      expect(check).toHaveProperty("status");
      expect(check).toHaveProperty("detail");
      expect(["ok", "warn", "fail"]).toContain(check.status);
    }
```

The shared fixture runner now compares recursive path listings for the actual
fixture HOME and cwd before cleanup on every doctor invocation. The eight
check-coverage tests require their fixture statuses: all ok except absent
exact-model configuration, which must warn. The output-format test also
requires the expected status per name. Every pre-existing assertion remains.
The same twelve tests are strengthened; their names remain unchanged.

Three deliberate breaks, each shown by git diff and restored by cmp:
1. The synthetic claude executable exits 1: claude status is warn, causing
   its named coverage test and the output-format test to fail (10 pass/2 fail).
2. A synthetic file is written in fixture HOME after the command: all twelve
   calls fail at the home listing assertion (0 pass/12 fail).
3. A synthetic file is written in fixture cwd: all twelve calls fail at the
   cwd listing assertion (0 pass/12 fail).

Each restoration matched SHA-256
`42c676202aabc5f9c8c23076f644d971c8ead72f8efa5dd43354335bf3300ec6`.
PATH and HOME are restored by the existing finally block after every call,
including each intended failure. No real provider executable is started.
No production change and no new dependency.

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; command -v bun; command -v bunx; shasum -a 256 "$(command -v bun)"; bun --version; bun -e 'process.stdout.write(Bun.revision)'`

Exit: 0. Summary: runtime match or silent success

Uptime: runtime check, not a test

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-08-runtime-run1.log`

SHA-256: `2b1d8a5ab9bebb7a1de8417a1458f7d8ff03fd90e03fe98190496a94b162ab1f`

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test apps/madbridge/test/doctor.test.ts`

Exit: 1. Summary: 10 pass / 2 fail / 62 expect() calls / Ran 12 tests across 1 file. [4.53s]

Uptime: 8:59  up 8 days,  1:08, 17 users, load averages: 0.95 1.50 1.88

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-08-red-status-run1.log`

SHA-256: `7da00f30bfa810f3f7fe93ba0fe5d2e019f82f3e58302c94d7bcc708046bfe51`

Failing run (raw log remains verbatim; Markdown whitespace normalized):

```text
bun test v1.4.2 (744846f84)

apps/madbridge/test/doctor.test.ts:
(pass) doctor: read-only invariant > no files created in cwd [524.07ms]
(pass) doctor: read-only invariant > no files created in home .madv-runtime [369.97ms]
(pass) doctor: check coverage > doctor includes platform/architecture check [314.63ms]
(pass) doctor: check coverage > doctor includes bun check [363.56ms]
 96 |   test("doctor includes claude-code check", async () => {
 97 |     const result = await runDoctor(["--json"]);
 98 |     const json = JSON.parse(result.stdout);
 99 |     const names = json.checks.map((c: any) => c.name);
100 |     expect(names).toContain("claude-code");
101 |     expect(json.checks.find((check: any) => check.name === "claude-code")?.status).toBe("ok");
                                                                                         ^
error: expect(received).toBe(expected)

Expected: "ok"
Received: "warn"

      at <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:101:84)
(fail) doctor: check coverage > doctor includes claude-code check [392.49ms]
(pass) doctor: check coverage > doctor includes agy check [351.76ms]
(pass) doctor: check coverage > doctor includes opentui check [357.26ms]
(pass) doctor: check coverage > doctor includes directory-permissions check [393.71ms]
(pass) doctor: check coverage > doctor includes adapter-protocol check [346.41ms]
(pass) doctor: check coverage > doctor includes exact-model-visibility check [356.37ms]
155 |     for (const check of json.checks) {
156 |       expect(check).toHaveProperty("name");
157 |       expect(check).toHaveProperty("status");
158 |       expect(check).toHaveProperty("detail");
159 |       expect(["ok", "warn", "fail"]).toContain(check.status);
160 |       expect(check.status).toBe(EXPECTED_STATUSES[check.name]);
                                 ^
error: expect(received).toBe(expected)

Expected: "ok"
Received: "warn"

      at <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:160:28)
(fail) doctor: output format > each check has name, status, and detail [362.61ms]
(pass) doctor: output format > ok field reflects aggregate check status [369.95ms]

 10 pass
 2 fail
 62 expect() calls
Ran 12 tests across 1 file. [4.53s]
```

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test apps/madbridge/test/doctor.test.ts`

Exit: 1. Summary: 0 pass / 12 fail / 24 expect() calls / Ran 12 tests across 1 file. [4.50s]

Uptime: 8:59  up 8 days,  1:08, 17 users, load averages: 0.88 1.46 1.86

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-08-red-home-run1.log`

SHA-256: `73f2cb6fb97aa8ec37528effa408ac8767ffb08e6031ea41a72834ce1b784be0`

Failing run (raw log remains verbatim; Markdown whitespace normalized):

```text
bun test v1.4.2 (744846f84)

apps/madbridge/test/doctor.test.ts:
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(root, "unexpected-doctor-home"), "synthetic"); // deliberate home write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
32 |     expect(readdirSync(root, { recursive: true }).sort()).toEqual(homeBefore);
                                                               ^
error: expect(received).toEqual(expected)

  [
    "bin",
    "bin/agy",
    "bin/bun",
    "bin/claude",
    "cwd",
+   "unexpected-doctor-home",
  ]

- Expected  - 0
+ Received  + 1

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:32:59)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:61:26)
(fail) doctor: read-only invariant > no files created in cwd [368.67ms]
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(root, "unexpected-doctor-home"), "synthetic"); // deliberate home write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
32 |     expect(readdirSync(root, { recursive: true }).sort()).toEqual(homeBefore);
                                                               ^
error: expect(received).toEqual(expected)

  [
    "bin",
    "bin/agy",
    "bin/bun",
    "bin/claude",
    "cwd",
+   "unexpected-doctor-home",
  ]

- Expected  - 0
+ Received  + 1

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:32:59)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:71:26)
(fail) doctor: read-only invariant > no files created in home .madv-runtime [359.19ms]
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(root, "unexpected-doctor-home"), "synthetic"); // deliberate home write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
32 |     expect(readdirSync(root, { recursive: true }).sort()).toEqual(homeBefore);
                                                               ^
error: expect(received).toEqual(expected)

  [
    "bin",
    "bin/agy",
    "bin/bun",
    "bin/claude",
    "cwd",
+   "unexpected-doctor-home",
  ]

- Expected  - 0
+ Received  + 1

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:32:59)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:80:26)
(fail) doctor: check coverage > doctor includes platform/architecture check [350.63ms]
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(root, "unexpected-doctor-home"), "synthetic"); // deliberate home write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
32 |     expect(readdirSync(root, { recursive: true }).sort()).toEqual(homeBefore);
                                                               ^
error: expect(received).toEqual(expected)

  [
    "bin",
    "bin/agy",
    "bin/bun",
    "bin/claude",
    "cwd",
+   "unexpected-doctor-home",
  ]

- Expected  - 0
+ Received  + 1

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:32:59)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:89:26)
(fail) doctor: check coverage > doctor includes bun check [348.93ms]
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(root, "unexpected-doctor-home"), "synthetic"); // deliberate home write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
32 |     expect(readdirSync(root, { recursive: true }).sort()).toEqual(homeBefore);
                                                               ^
error: expect(received).toEqual(expected)

  [
    "bin",
    "bin/agy",
    "bin/bun",
    "bin/claude",
    "cwd",
+   "unexpected-doctor-home",
  ]

- Expected  - 0
+ Received  + 1

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:32:59)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:97:26)
(fail) doctor: check coverage > doctor includes claude-code check [339.99ms]
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(root, "unexpected-doctor-home"), "synthetic"); // deliberate home write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
32 |     expect(readdirSync(root, { recursive: true }).sort()).toEqual(homeBefore);
                                                               ^
error: expect(received).toEqual(expected)

  [
    "bin",
    "bin/agy",
    "bin/bun",
    "bin/claude",
    "cwd",
+   "unexpected-doctor-home",
  ]

- Expected  - 0
+ Received  + 1

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:32:59)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:105:26)
(fail) doctor: check coverage > doctor includes agy check [408.66ms]
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(root, "unexpected-doctor-home"), "synthetic"); // deliberate home write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
32 |     expect(readdirSync(root, { recursive: true }).sort()).toEqual(homeBefore);
                                                               ^
error: expect(received).toEqual(expected)

  [
    "bin",
    "bin/agy",
    "bin/bun",
    "bin/claude",
    "cwd",
+   "unexpected-doctor-home",
  ]

- Expected  - 0
+ Received  + 1

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:32:59)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:113:26)
(fail) doctor: check coverage > doctor includes opentui check [379.38ms]
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(root, "unexpected-doctor-home"), "synthetic"); // deliberate home write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
32 |     expect(readdirSync(root, { recursive: true }).sort()).toEqual(homeBefore);
                                                               ^
error: expect(received).toEqual(expected)

  [
    "bin",
    "bin/agy",
    "bin/bun",
    "bin/claude",
    "cwd",
+   "unexpected-doctor-home",
  ]

- Expected  - 0
+ Received  + 1

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:32:59)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:121:26)
(fail) doctor: check coverage > doctor includes directory-permissions check [359.64ms]
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(root, "unexpected-doctor-home"), "synthetic"); // deliberate home write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
32 |     expect(readdirSync(root, { recursive: true }).sort()).toEqual(homeBefore);
                                                               ^
error: expect(received).toEqual(expected)

  [
    "bin",
    "bin/agy",
    "bin/bun",
    "bin/claude",
    "cwd",
+   "unexpected-doctor-home",
  ]

- Expected  - 0
+ Received  + 1

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:32:59)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:129:26)
(fail) doctor: check coverage > doctor includes adapter-protocol check [386.40ms]
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(root, "unexpected-doctor-home"), "synthetic"); // deliberate home write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
32 |     expect(readdirSync(root, { recursive: true }).sort()).toEqual(homeBefore);
                                                               ^
error: expect(received).toEqual(expected)

  [
    "bin",
    "bin/agy",
    "bin/bun",
    "bin/claude",
    "cwd",
+   "unexpected-doctor-home",
  ]

- Expected  - 0
+ Received  + 1

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:32:59)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:137:26)
(fail) doctor: check coverage > doctor includes exact-model-visibility check [338.83ms]
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(root, "unexpected-doctor-home"), "synthetic"); // deliberate home write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
32 |     expect(readdirSync(root, { recursive: true }).sort()).toEqual(homeBefore);
                                                               ^
error: expect(received).toEqual(expected)

  [
    "bin",
    "bin/agy",
    "bin/bun",
    "bin/claude",
    "cwd",
+   "unexpected-doctor-home",
  ]

- Expected  - 0
+ Received  + 1

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:32:59)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:152:26)
(fail) doctor: output format > each check has name, status, and detail [473.62ms]
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(root, "unexpected-doctor-home"), "synthetic"); // deliberate home write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
32 |     expect(readdirSync(root, { recursive: true }).sort()).toEqual(homeBefore);
                                                               ^
error: expect(received).toEqual(expected)

  [
    "bin",
    "bin/agy",
    "bin/bun",
    "bin/claude",
    "cwd",
+   "unexpected-doctor-home",
  ]

- Expected  - 0
+ Received  + 1

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:32:59)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:165:26)
(fail) doctor: output format > ok field reflects aggregate check status [361.74ms]

 0 pass
 12 fail
 24 expect() calls
Ran 12 tests across 1 file. [4.50s]
```

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test apps/madbridge/test/doctor.test.ts`

Exit: 1. Summary: 0 pass / 12 fail / 12 expect() calls / Ran 12 tests across 1 file. [4.51s]

Uptime: 9:00  up 8 days,  1:09, 17 users, load averages: 0.98 1.47 1.85

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-08-red-cwd-run1.log`

SHA-256: `be63d877a04f89730f27d71e6c1b55a47e507af00bd2e22065c02bc21ff49f70`

Failing run (raw log remains verbatim; Markdown whitespace normalized):

```text
bun test v1.4.2 (744846f84)

apps/madbridge/test/doctor.test.ts:
26 |     process.chdir(ctx.cwd === cwd ? join(root, "cwd") : ctx.cwd);
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(process.cwd(), "unexpected-doctor-cwd"), "synthetic"); // deliberate cwd write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
                                                                        ^
error: expect(received).toEqual(expected)

- []
+ [
+   "unexpected-doctor-cwd",
+ ]

- Expected  - 1
+ Received  + 3

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:31:68)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:61:26)
(fail) doctor: read-only invariant > no files created in cwd [364.96ms]
26 |     process.chdir(ctx.cwd === cwd ? join(root, "cwd") : ctx.cwd);
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(process.cwd(), "unexpected-doctor-cwd"), "synthetic"); // deliberate cwd write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
                                                                        ^
error: expect(received).toEqual(expected)

- []
+ [
+   "unexpected-doctor-cwd",
+ ]

- Expected  - 1
+ Received  + 3

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:31:68)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:71:26)
(fail) doctor: read-only invariant > no files created in home .madv-runtime [363.08ms]
26 |     process.chdir(ctx.cwd === cwd ? join(root, "cwd") : ctx.cwd);
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(process.cwd(), "unexpected-doctor-cwd"), "synthetic"); // deliberate cwd write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
                                                                        ^
error: expect(received).toEqual(expected)

- []
+ [
+   "unexpected-doctor-cwd",
+ ]

- Expected  - 1
+ Received  + 3

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:31:68)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:80:26)
(fail) doctor: check coverage > doctor includes platform/architecture check [353.98ms]
26 |     process.chdir(ctx.cwd === cwd ? join(root, "cwd") : ctx.cwd);
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(process.cwd(), "unexpected-doctor-cwd"), "synthetic"); // deliberate cwd write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
                                                                        ^
error: expect(received).toEqual(expected)

- []
+ [
+   "unexpected-doctor-cwd",
+ ]

- Expected  - 1
+ Received  + 3

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:31:68)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:89:26)
(fail) doctor: check coverage > doctor includes bun check [351.72ms]
26 |     process.chdir(ctx.cwd === cwd ? join(root, "cwd") : ctx.cwd);
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(process.cwd(), "unexpected-doctor-cwd"), "synthetic"); // deliberate cwd write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
                                                                        ^
error: expect(received).toEqual(expected)

- []
+ [
+   "unexpected-doctor-cwd",
+ ]

- Expected  - 1
+ Received  + 3

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:31:68)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:97:26)
(fail) doctor: check coverage > doctor includes claude-code check [482.93ms]
26 |     process.chdir(ctx.cwd === cwd ? join(root, "cwd") : ctx.cwd);
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(process.cwd(), "unexpected-doctor-cwd"), "synthetic"); // deliberate cwd write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
                                                                        ^
error: expect(received).toEqual(expected)

- []
+ [
+   "unexpected-doctor-cwd",
+ ]

- Expected  - 1
+ Received  + 3

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:31:68)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:105:26)
(fail) doctor: check coverage > doctor includes agy check [364.46ms]
26 |     process.chdir(ctx.cwd === cwd ? join(root, "cwd") : ctx.cwd);
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(process.cwd(), "unexpected-doctor-cwd"), "synthetic"); // deliberate cwd write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
                                                                        ^
error: expect(received).toEqual(expected)

- []
+ [
+   "unexpected-doctor-cwd",
+ ]

- Expected  - 1
+ Received  + 3

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:31:68)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:113:26)
(fail) doctor: check coverage > doctor includes opentui check [513.88ms]
26 |     process.chdir(ctx.cwd === cwd ? join(root, "cwd") : ctx.cwd);
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(process.cwd(), "unexpected-doctor-cwd"), "synthetic"); // deliberate cwd write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
                                                                        ^
error: expect(received).toEqual(expected)

- []
+ [
+   "unexpected-doctor-cwd",
+ ]

- Expected  - 1
+ Received  + 3

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:31:68)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:121:26)
(fail) doctor: check coverage > doctor includes directory-permissions check [323.60ms]
26 |     process.chdir(ctx.cwd === cwd ? join(root, "cwd") : ctx.cwd);
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(process.cwd(), "unexpected-doctor-cwd"), "synthetic"); // deliberate cwd write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
                                                                        ^
error: expect(received).toEqual(expected)

- []
+ [
+   "unexpected-doctor-cwd",
+ ]

- Expected  - 1
+ Received  + 3

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:31:68)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:129:26)
(fail) doctor: check coverage > doctor includes adapter-protocol check [311.58ms]
26 |     process.chdir(ctx.cwd === cwd ? join(root, "cwd") : ctx.cwd);
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(process.cwd(), "unexpected-doctor-cwd"), "synthetic"); // deliberate cwd write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
                                                                        ^
error: expect(received).toEqual(expected)

- []
+ [
+   "unexpected-doctor-cwd",
+ ]

- Expected  - 1
+ Received  + 3

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:31:68)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:137:26)
(fail) doctor: check coverage > doctor includes exact-model-visibility check [364.21ms]
26 |     process.chdir(ctx.cwd === cwd ? join(root, "cwd") : ctx.cwd);
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(process.cwd(), "unexpected-doctor-cwd"), "synthetic"); // deliberate cwd write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
                                                                        ^
error: expect(received).toEqual(expected)

- []
+ [
+   "unexpected-doctor-cwd",
+ ]

- Expected  - 1
+ Received  + 3

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:31:68)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:152:26)
(fail) doctor: output format > each check has name, status, and detail [362.50ms]
26 |     process.chdir(ctx.cwd === cwd ? join(root, "cwd") : ctx.cwd);
27 |     const cwdBefore = readdirSync(process.cwd(), { recursive: true }).sort();
28 |     const homeBefore = readdirSync(root, { recursive: true }).sort();
29 |     const result = await runHostCli(args, { ...ctx, cwd: process.cwd() });
30 |     writeFileSync(join(process.cwd(), "unexpected-doctor-cwd"), "synthetic"); // deliberate cwd write
31 |     expect(readdirSync(process.cwd(), { recursive: true }).sort()).toEqual(cwdBefore);
                                                                        ^
error: expect(received).toEqual(expected)

- []
+ [
+   "unexpected-doctor-cwd",
+ ]

- Expected  - 1
+ Received  + 3

      at runCli (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:31:68)
      at async <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/apps/madbridge/test/doctor.test.ts:165:26)
(fail) doctor: output format > ok field reflects aggregate check status [331.06ms]

 0 pass
 12 fail
 12 expect() calls
Ran 12 tests across 1 file. [4.51s]
```

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bunx tsc --noEmit`

Exit: 0. Summary: runtime match or silent success

Uptime: 9:00  up 8 days,  1:09, 17 users, load averages: 1.06 1.46 1.84

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-08-typecheck-run1.log`

SHA-256: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test apps/madbridge/test/doctor.test.ts`

Exit: 0. Summary: 12 pass / 0 fail / 87 expect() calls / Ran 12 tests across 1 file. [4.31s]

Uptime: 9:00  up 8 days,  1:09, 17 users, load averages: 1.13 1.47 1.84

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-08-green-run1.log`

SHA-256: `164949c9a41a462832e9db9728ccb525e39c08cf65e572f84d4bad37e838854d`

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test apps/madbridge`

Exit: 0. Summary: 518 pass / 0 fail / 2339 expect() calls / Ran 518 tests across 15 files. [11.82s]

Uptime: 9:00  up 8 days,  1:09, 17 users, load averages: 1.04 1.44 1.83

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-08-madbridge-run1.log`

SHA-256: `de72d8481aff5a996dc5609bbcc8633171de413850deb3413bfd75109bb0045d`

doctor.test.ts 12 pass, 0 fail; MadBridge 518 pass, 0 fail.
`git diff --check`: exit 0 after correcting the item 7 log rendering.
Deviation: item 7 log-formatting/gate-report correction above. No active halt.

## Item 9: observe temporary paths that disappear within preflight

Built on: `458fba01e63081009f5e02699588a409d684ca08`.

Files changed: packages/supervisor/test/preflight.test.ts and this log.

Relies on the parent preflight.test.ts:239-249 test, verbatim:

```ts
test("preflight creates nothing", async () => {
  const f = fixture();
  writeFileSync(join(f.input.worktree,"dirty-fixture"),"fixture dirty status");
  const status=Bun.spawnSync(["git","--no-optional-locks","-C",f.input.worktree,"status","--porcelain=v1","-z"],{stdout:"pipe",stderr:"pipe"});
  expect(status.exitCode).toBe(0);
  const before = listing(f.root); const temporary = readdirSync(f.temp).sort();
  const r = await f.run(); expect(r.ok).toBe(true);
  expect(listing(f.root)).toEqual(before); expect(readdirSync(f.temp).sort()).toEqual(temporary);
  if (r.ok) { expect(r.plan.repositoryFingerprint.statusSha256).toBe(new Bun.CryptoHasher("sha256").update(status.stdout).digest("hex")); expect(Object.isFrozen(r.plan)).toBe(true); expect(Object.isFrozen(r.plan.executions)).toBe(true); for (const e of r.plan.executions) { expect(Object.isFrozen(e)).toBe(true); expect(Object.isFrozen(e.arguments)).toBe(true); expect(Object.isFrozen(e.environment)).toBe(true); expect(e.artifactSha256).toBe(new Bun.CryptoHasher("sha256").update(readFileSync(e.executablePath)).digest("hex")); } }
});
test("probe environment equals launch environment", async () => {
```

It retains every previous root-listing, temporary-listing, fingerprint and
frozen-plan assertion. A recursive filesystem-event recorder now watches the
test-owned temporary location throughout the call, retaining path names even
when a file is already gone. Missing path names or watcher errors fail the
test. The observer drains for 250 ms before closing; it creates no file.

A new calibration test, `temporary path recording sees files a child creates
and removes before returning`, creates/deletes a root file, directory and
nested file inside a child process. It requires the complete three-path set.
The calibration ran before relying on the observer and passed; its focused
run filtered 29 other tests only for this supplemental capability check. The
normal preflight file and supervisor suite subsequently ran unfiltered.

Deliberate break: inject a preflight probe that writes and removes the
synthetic path created-and-removed-within-call before returning. git diff
showed the break. `preflight creates nothing` failed at the empty recorded-
path assertion, although the before/after listings would agree. The break was
restored; cmp matched its pre-break copy, SHA-256
`731baccdf2fb4e6d9de8b8ac32da2c94ac30ad84df6530e00a15aa78017d20b1`.
No production change was required.

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; command -v bun; command -v bunx; shasum -a 256 "$(command -v bun)"; bun --version; bun -e 'process.stdout.write(Bun.revision)'`

Exit: 0. Summary: runtime match or silent success

Uptime: runtime check, not a test

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-09-runtime-run1.log`

SHA-256: `2b1d8a5ab9bebb7a1de8417a1458f7d8ff03fd90e03fe98190496a94b162ab1f`

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/supervisor/test/preflight.test.ts -t 'temporary path recording sees files'`

Exit: 0. Summary: 1 pass / 29 filtered out / 0 fail / 3 expect() calls / Ran 1 test across 1 file. [285.00ms]

Uptime: 9:04  up 8 days,  1:13, 17 users, load averages: 1.42 1.43 1.73

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-09-recorder-calibration-run1.log`

SHA-256: `77ae2a8b2252728090f0c59f9a90dbd4ad84c0721b20fe978106319be94caa23`

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/supervisor/test/preflight.test.ts -t '^preflight creates nothing$'`

Exit: 1. Summary: 0 pass / 29 filtered out / 1 fail / 8 expect() calls / Ran 1 test across 1 file. [932.00ms]

Uptime: 9:05  up 8 days,  1:13, 17 users, load averages: 1.22 1.37 1.69

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-09-red-run1.log`

SHA-256: `2d7204063ab764148df3613b6a4eaedd5b67e305ec9f16b26d66250f824a45e7`

Failing diagnostic rendering; full raw run remains in the hashed log:

```text
bun test v1.4.2 (744846f84)

packages/supervisor/test/preflight.test.ts:
286 |   const r = await f.run({ probe: async req => {
287 |     const transient = join(f.temp, "created-and-removed-within-call");
288 |     writeFileSync(transient, "synthetic"); rmSync(transient);
289 |     return f.deps.probe!(req);
290 |   } }).finally(() => recorder.stop()); expect(r.ok).toBe(true);
291 |   expect([...recorder.paths]).toEqual([]);
                                    ^
error: expect(received).toEqual(expected)

- []
+ [
+   "created-and-removed-within-call",
+ ]

- Expected  - 1
+ Received  + 3

      at <anonymous> (/Users/michaeldaley/builds/madventures-tui-hardening-a-r1/packages/supervisor/test/preflight.test.ts:291:31)
(fail) preflight creates nothing [916.88ms]

 0 pass
 29 filtered out
 1 fail
 8 expect() calls
Ran 1 test across 1 file. [932.00ms]
```

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bunx tsc --noEmit`

Exit: 0. Summary: runtime match or silent success

Uptime: 9:05  up 8 days,  1:14, 17 users, load averages: 1.53 1.43 1.70

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-09-typecheck-run1.log`

SHA-256: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/supervisor/test/preflight.test.ts`

Exit: 0. Summary: 30 pass / 0 fail / 352 expect() calls / Ran 30 tests across 1 file. [28.53s]

Uptime: 9:05  up 8 days,  1:14, 17 users, load averages: 1.53 1.43 1.70

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-09-green-run1.log`

SHA-256: `27e95aea90b610e04c82aec6070401f9527177574c0c3086a74a5351c6746573`

Command: `export PATH="/Users/michaeldaley/.bun/bin:$PATH"; bun test packages/supervisor`

Exit: 0. Summary: 79 pass / 0 fail / 5827 expect() calls / Ran 79 tests across 5 files. [58.38s]

Uptime: 9:05  up 8 days,  1:14, 17 users, load averages: 1.63 1.46 1.70

Log: `/Users/michaeldaley/builds/hardening-a-r1-pr/logs/item-09-supervisor-run1.log`

SHA-256: `d9e066e80a4cdd7fbd515ed261ac34dbda16061d0d4e03871e527437a0bbc3e4`

preflight.test.ts 30 pass, 0 fail; supervisor 79 pass, 0 fail.
`git diff --check`: exit 0. Deviations: none. No active halt.
