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
