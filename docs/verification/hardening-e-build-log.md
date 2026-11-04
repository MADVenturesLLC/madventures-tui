# Hardening E build log

Authority: DEC-20261103-03 A4 and B2, DEC-20261103-01 B4,
DEC-20261102-02 B3 and B4, DEC-20261102-01 B1 and B4, DEC-20261013-03
B2 item 2 and B4, and DEC-20261023-01 Part B. Builder:
session:claude-code/hardening-e-r1, role builder, execution surface
claude-code, on the Founder's Ubuntu PC. No GitHub operation, MCP server,
other agent, subagent, skill, plugin, memory lookup or host installation
was used. The only network commands were `git fetch origin main` and
`bun install --frozen-lockfile`.

Logs are under `/home/michaeldaley/builds/hardening-e-r1-pr/logs/` on the
Ubuntu PC, one file per run. The `uptime` reading taken immediately before
each run is in `uptime-record.log` in the same folder (SHA-256
`9164f80734a5fdb1495404444ecd7a33b87601c2d1a703f9fc8051c74f2c1801`) and was
printed in the session before the run. Exit statuses are those of the
command itself.

## The item

DEC-20261103-03 B2 item 2, in `test/phase3a/runtime-harness.ts`:

- The fixture writes the descendant record to a temporary name in the
  same directory and renames it into place, so no reader can see it
  partly written.
- The harness accepts the record only once it parses and names a safe
  integer greater than 1, retrying within its existing deadline of
  `HOST_DEADLINES_MS.outerBound`, and throws
  `FixtureDescendantIdentityMissing` when the deadline passes.
- A new test under `test/phase3a/` shows that the wait succeeds when the
  record first appears empty and is written 50 ms later, and fails
  against the code at the base.

Built on commit `e53ef3dc5fa0f2eebb5fecb8fe2761bb334cd5a8`, the merge of
pull request 220.

Files changed:

- `test/phase3a/runtime-harness.ts`
- `test/phase3a/descendant-record-wait.test.ts` (new)
- `docs/verification/hardening-e-build-log.md` (new, this file)

## Preconditions

Working directory `/home/michaeldaley/builds/madventures-tui-hardening-e-r1`,
branch `build/hardening-e-r1`, HEAD and fetched `origin/main` both
`e53ef3dc5fa0f2eebb5fecb8fe2761bb334cd5a8`, so no path changed between
them. The tree was clean and this log did not exist. Git identity
`daley40-lab`, `293512385+daley40-lab@users.noreply.github.com`.
`uname -sm` prints `Linux x86_64`.

On `origin/main` every authority file has the SHA-256 the builder prompt
gives: DEC-20261103-03 `44a7c8edc466b7186749f92f78b8b979152e2db2fc00036791d04891e955e794`,
DEC-20261103-01 `43dc423e060b0e7ae04a0e7a0c302a5e38497cc212d704a5a37421d78aa1dd3a`,
DEC-20261102-02 `04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550`,
DEC-20261102-01 `572f0d4ad9d901994f39884c456c67b3449504da192b06b6f6ba975ef1169866`,
DEC-20261013-03 `249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7`,
DEC-20261023-01 `bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5`,
the plan `400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2`
and `AGENTS.md` `0879ede2d3b07e137d1f3d5f75c131285277b44e61f1305d3d0d59da64f1dbca`.
Each act has Status ISSUED and the Founder's signature.

At the base, in `test/phase3a/runtime-harness.ts`:

- line 22 imports `HOST_DEADLINES_MS` from
  `../../packages/pty-host/src/signals` (`outerBound` is 5000 ms);
- lines 389 to 398 inject the descendant spawn into the fixture source for
  the `grandchild`, `setsid` and `lifeline-eof` scenarios, ending with
  `writeFileSync(join(dirname(dirname(process.argv[1])), "descendant.json"), JSON.stringify({ pid: descendant.pid }));`
  at line 398;
- lines 487 to 491 wait on the record: the `existsSync` loop at line 489,
  `JSON.parse(readFileSync(record, "utf8")).pid` at line 490, and the pid
  check that throws `FixtureDescendantIdentityMissing` at line 491.

In `test/phase3a/fixture-adapters.ts`, read and not changed, the fixture
source imports `writeFileSync` from `node:fs` (line 26) and `basename`,
`dirname` and `join` from `node:path` (line 27).

Runtime check (command -v bun, sha256sum of it, bun --version and
Bun.revision, under the per-command PATH of DEC-20261013-03 B4): every
check returned `/home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun`,
SHA-256 `0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb`,
version `1.4.1`, revision `69cb78c9097cebd3bdb832d9fff8b7d23abce09e`. It
ran before the baseline, before the baseline bare `bun test`, before the
item's first test run, at the start of the final gates, and before each
final bare `bun test`. Every runtime-check log has SHA-256
`3afd8fb57beaaa10ea8568e05732d7e017eadb74972c71bdc1eeeba350325d85`.

`bun.lock` SHA-256 before install, after install and after every later
run: `34224c0133c44d967c4a4da8b75bf11093c573c47e42bcaf502c6d6f61c3e7c0`.
Install set the executable bit on `packages/founder-act/src/main.ts`;
`git checkout` restored it once. That is not a finding.

## Baseline

Each once, in the foreground:

| Log | Command | Load (1 min) | Exit | Result | Log SHA-256 |
| --- | --- | --- | --- | --- | --- |
| 01 | `bun install --frozen-lockfile` | 0.01 | 0 | 53 packages | `17effc11784fa74f287f471b3b3b95bca79a8935380cf0287339461c80f1307f` |
| 02 | `bun x tsc --noEmit` | 0.01 | 0 | clean | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| 03 | `bun test test/phase3a` | 0.00 | 0 | 155 pass, 0 fail, 17 files | `b64eed7eb7ad27266c17ce8cece849577531ffeb4e16462445ae4ae8612ef6a5` |
| 05 | bare `bun test` | 0.09 | 0 | 1901 pass, 0 fail, 139 files | `de2da990daa503353af93b6a0e5876a822a347120668296cca1f9bc9d5088c77` |

No baseline run failed. The race of DEC-20261103-03 A4 did not occur in
either baseline run that includes it.

## The other reads (DEC-20261103-03 B2 item 3)

Every place in `test/phase3a/` that reads a file another process writes
after only checking that the file exists. None of them changed. Line
numbers are at the base.

1. `test/phase3a/runtime-harness.ts` lines 209 to 212,
   `recordDurableState`: `existsSync` of the session's `ledger.sqlite3`,
   then a read-only `Database` query of its `events` table.
   - Writer: for sessions started by `startFixtureSession`, the ledger is
     written by the harness's own process, not another one. For sessions
     started by `startFixtureSessionInChildProcess`, it is written by the
     child supervisor process running
     `test/phase3a/adversarial/supervisor-entry.ts`.
   - Ordering: that child creates the ledger and commits the session's
     opening events inside `startFixtureSession` before it prints its
     storage report (`supervisor-entry.ts` lines 3 and 12). The parent
     records the storage only after reading that report
     (`runtime-harness.ts` line 787), so the file and its first committed
     rows exist before any read. In `dispose` the read follows
     `proc.exited`, the wait until no recorded pid or group is alive, and
     the parent's own append and close (lines 811 to 828). Every read goes
     through SQLite, whose locking shows a reader only committed
     transactions, never a partly written row.
2. `test/phase3a/adversarial/supervisor-death.test.ts` lines 66 to 70:
   `existsSync(ledgerPath)`, then `new Ledger(ledgerPath)` and
   `readAfter(0)`.
   - Writer: the child supervisor process of
     `startFixtureSessionInChildProcess`.
   - Ordering: `child.exit(mode)` resolves only after `proc.exited`
     (`runtime-harness.ts` line 802), and the test then waits until every
     recorded host and child pid is dead and asserts every process group
     gone (lines 58 to 63), so no writer remains when it reads. The read
     goes through SQLite as in item 1.
3. `test/phase3a/environment-equality.test.ts` line 43, in `captures`:
   `existsSync(path) ? JSON.parse(readFileSync(path, "utf8"))` for the four
   `*.environment.json` files of each execution.
   - `identity` and `auth`: written by the fixture executable in its probe
     processes with a synchronous `writeFileSync` at the top of the script
     (`fixture-adapters.ts` lines 29 and 30), before it writes its JSON line
     to standard output (lines 49 and 51). The preflight's
     `runBoundedProbe` (`packages/supervisor/src/attestation.ts` line 83)
     reads that line, and `startFixtureSession` awaits the preflight
     (`runtime-harness.ts` line 417) before it returns. The test reads only
     after `startFixtureSession` resolves.
   - `host`: written by the harness's own process with a synchronous
     `writeFileSync` in `spawnHost` (`runtime-harness.ts` line 440), before
     it starts the host, within the `startFixtureSession` call the test
     awaits. It is not another process.
   - `child`: written by the governed child (`--fixture-run`) with the
     same synchronous `writeFileSync` (`fixture-adapters.ts` lines 29 and
     30), before it writes `FIXTURE_READY` (line 47). The test reads only
     after `ready` has seen `FIXTURE_READY` in that execution's output
     (`environment-equality.test.ts` lines 18 and 38).
4. `test/phase3a/environment-equality.test.ts` lines 140 to 144: a
   directory listing of the fixture root (`filesUnder`), which counts the
   `*.environment.json` files and reads every listed file. A listing
   establishes only that a file exists, so it is recorded here.
   - Writers: those of item 3.
   - Ordering: the reads follow `ready` on both executions (line 110), the
     close request, the drain of both output streams to their end, and a
     snapshot whose phase is `closed` (lines 115 to 127), on top of the
     ordering of item 3.

Examined and not listed:

- the wait of this item at `runtime-harness.ts` lines 487 to 491, which
  this build changes;
- `runtime-harness.ts` line 686, and the existence or absence assertions
  at `evidence-pipeline.test.ts` lines 506 and 649,
  `cleanup-residuals.test.ts` lines 14 and 36, `harness-lifecycle.test.ts`
  lines 122, 132 and 154, `attestation-drift.test.ts` line 41,
  `harness-rollback.test.ts` line 75, `environment-equality.test.ts` line
  148 and `harness-separation.test.ts` lines 453 to 525: they check
  existence and read nothing after it;
- `negative-control.ts` lines 103 and 133: a directory walk and an
  existence check, with no file read;
- `architecture-phase3a.test.ts` lines 107, 143, 262, 263, 586, 1175, 1499
  and 1827, and `harness-separation.test.ts` line 263: checked-in
  repository paths, which no process writes during the tests;
- reads of export output in `evidence-pipeline.test.ts`: `runCli` runs in
  the test's own process (`apps/madbridge/src/cli.ts` line 115), and no
  existence check precedes those reads.

## The new test, first

To let the test call the wait, the wait was first moved, with its
behavior unchanged, into one exported function,
`waitForDescendantRecord(record: string): Promise<number>`, which the
harness calls where the wait was. That intermediate diff is saved as
`07a-intermediate-move-only.diff`, SHA-256
`fd2fd4f0c8c26aab95528cbcb6abba729a7f34fe1e0b2b29a0ba5989d537d417`; with
it, `test/phase3a/runtime-harness.ts` had SHA-256
`838dd0603c4fe6fc5a83d61edfd654865094cb2ae31f016da7e364e6a274e6e8`.

New file `test/phase3a/descendant-record-wait.test.ts`, one test:
"the descendant-record wait returns the pid when the record first appears
empty and is written 50 ms later". It creates `descendant.json` empty in
a private `mkdtemp` directory, writes `{"pid":424242}` to it 50 ms later,
and asserts that `waitForDescendantRecord` returns `424242`.

Against the base behavior, log 07 (load 0.00, exit 1, SHA-256
`57725a68fd47834ae960831445619c1e4064fc4df248d43a8a4c089dd03195bf`):

```text
SyntaxError: JSON Parse error: Unexpected EOF
      at waitForDescendantRecord (/home/michaeldaley/builds/madventures-tui-hardening-e-r1/test/phase3a/runtime-harness.ts:286:29)
      at <anonymous> (/home/michaeldaley/builds/madventures-tui-hardening-e-r1/test/phase3a/descendant-record-wait.test.ts:18:18)
(fail) the descendant-record wait returns the pid when the record first appears empty and is written 50 ms later [0.51ms]

 0 pass
 1 fail
```

Reason: the record already existed, so the `existsSync` loop ended at
once, and `JSON.parse` read it before it was written. Line 286 there is
the base's line 490. This is the error of DEC-20261103-03 A2 item 3.

## The change

In `test/phase3a/runtime-harness.ts` only:

- `waitForDescendantRecord` reads and parses the record on each attempt,
  treating a missing, empty, partial or unparsable record, or one whose
  `pid` is not a safe integer greater than 1, as not yet accepted. It
  retries every 10 ms until the record is accepted or the deadline of
  `HOST_DEADLINES_MS.outerBound` from its start passes, then throws
  `FixtureDescendantIdentityMissing`.
- The injected fixture code writes the record to
  `descendant.json.<pid>.tmp` in the same directory, where `<pid>` is the
  governed child's own pid, and renames it to `descendant.json`. The
  fixture source imports only `writeFileSync` from `node:fs`, so for the
  three scenarios the harness replaces that import line in the source it
  writes with one that also imports `renameSync`. It throws the existing
  `FixtureSourceMarkerMissing` if that import line is absent, as it does
  for the injection marker.
- Nothing else in the harness changes.

After the change, log 08 (load 0.04, exit 0, SHA-256
`e57cbe285b8b85c9845c7d1ab907b86f8faa3eb73df938a57940219737bfb5ef`): the
new test file shows 1 pass, 0 fail.

## Final gates (DEC-20261103-03 B2 item 5)

Each once, in order, in the foreground, after the change. The two code
files were staged first so that `git diff` against the base includes the
new test file.

| Log | Command | Load (1 min) | Exit | Result | Log SHA-256 |
| --- | --- | --- | --- | --- | --- |
| 20 | runtime check | n/a | 0 | matches | `3afd8fb57beaaa10ea8568e05732d7e017eadb74972c71bdc1eeeba350325d85` |
| 21 | `bun x tsc --noEmit` | 0.01 | 0 | clean | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| 22-01 to 22-20 | new test file, twenty times in a row | 0.08 | 0 each | 1 pass, 0 fail each | below |
| 23-1 | `bun test test/phase3a/adversarial` | 0.07 | 0 | 34 pass, 0 fail, 9 files | `1020dfe6e197cd5a2b30fc1773141ed0432bdbabe1db604de5402dcaa5a9541c` |
| 23-2 | `bun test test/phase3a/adversarial` | 0.21 | 0 | 34 pass, 0 fail, 9 files | `f70575816f12735a30d8dc2d19e2a6efcde85dbdabca6a57adc1e0de4f449c7e` |
| 23-3 | `bun test test/phase3a/adversarial` | 0.26 | 0 | 34 pass, 0 fail, 9 files | `2c13066de8a522bc227a1832e720f393bc5622d67356a0e8d6ebafe9df8c1533` |
| 24 | `bun test test/phase3a` | 0.20 | 0 | 156 pass, 0 fail, 18 files | `cab30387e7fb555594fe5f7036a53a70a130fb4ba9102a4a81b28b6e4c509640` |
| 25 | runtime check | n/a | 0 | matches | `3afd8fb57beaaa10ea8568e05732d7e017eadb74972c71bdc1eeeba350325d85` |
| 26 | bare `bun test` | 0.09 | 0 | 1902 pass, 0 fail, 140 files | `0c4fd470a1b200d6a354775170e40ae677ee56e001f27fa0ee6309aad337c86c` |
| 27 | runtime check | n/a | 0 | matches | `3afd8fb57beaaa10ea8568e05732d7e017eadb74972c71bdc1eeeba350325d85` |
| 28 | bare `bun test` | 0.17 | 0 | 1902 pass, 0 fail, 140 files | `3ae73a12f95c3bef743455b111fd99902385d6cf3cf35a07e4f5043816f53df7` |
| 29 | runtime check | n/a | 0 | matches | `3afd8fb57beaaa10ea8568e05732d7e017eadb74972c71bdc1eeeba350325d85` |
| 30 | bare `bun test` | 0.10 | 0 | 1902 pass, 0 fail, 140 files | `c571b50be81f3ede7068760fde9541b72a2c1ac3d1fe350267897bcc84a6e13b` |
| 31 | `git diff --check e53ef3dc5fa0f2eebb5fecb8fe2761bb334cd5a8` | n/a | 0 | no output | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| 32 | `git diff --name-only e53ef3dc5fa0f2eebb5fecb8fe2761bb334cd5a8` | n/a | 0 | the two code files | `30fed1b5a57333d2419290400f615766105ae24b1ec2c8b3f7a50bdbc96507f7` |

The twenty runs of the new test file, logs 22-01 to 22-20, each at load
0.08: runs 01, 03, 15 and 18 have SHA-256
`e57cbe285b8b85c9845c7d1ab907b86f8faa3eb73df938a57940219737bfb5ef`, and runs
02, 04 to 14, 16, 17, 19 and 20 have SHA-256
`48cd79090f4ba4e61e389611998655bbc20cac7cddbabf65ca42534f4241675b`. The two
outputs differ only in the elapsed time printed.

Log 32 lists `test/phase3a/descendant-record-wait.test.ts` and
`test/phase3a/runtime-harness.ts`. This log was written after the gates
and is the third path of DEC-20261103-03 B2 item 4.

Every test run ended with zero failures. The first load average of every
run was below 2.0. No log contains a credential-shaped string.

## Deviations

1. Baseline log 03 was written through a process substitution. The
   command was `bun test test/phase3a > >(cat) 2>&1 | tee <log> >/dev/null`,
   with `> >(cat)` added in error. The output reached `tee` through `cat`.
   The log holds the full run, 83 lines ending with the summary. It was not
   rerun, since each baseline command runs once.
2. The final gates were started once before the sequence above and then
   restarted from their first item. In that first sequence the twenty runs
   of the new test file were written to their logs by redirection
   (`> <log> 2>&1`) rather than through `tee`, contrary to DEC-20261023-01
   B6. All of them passed. The sequence was restarted so that every
   recorded gate run goes through `tee`. That first sequence's logs are
   kept:
   - log 10, runtime check, `3afd8fb57beaaa10ea8568e05732d7e017eadb74972c71bdc1eeeba350325d85`;
   - log 11, `bun x tsc --noEmit`, load 0.02, exit 0,
     `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`;
   - logs 12-01 to 12-20, the new test file, load 0.02, exit 0 and 1 pass,
     0 fail each: runs 01, 02 and 18
     `e57cbe285b8b85c9845c7d1ab907b86f8faa3eb73df938a57940219737bfb5ef`, runs
     03 to 17, 19 and 20
     `48cd79090f4ba4e61e389611998655bbc20cac7cddbabf65ca42534f4241675b`.
3. The prompt orders a runtime check before each final bare `bun test`,
   and its gate list orders "the runtime check again" before the three
   bare runs. Both were met: logs 25, 27 and 29, with no test run between
   the three bare runs. A runtime check also ran before the baseline bare
   `bun test` (log 04), under DEC-20261023-01 B8.
4. `git diff --check` and `git diff --name-only` against the base were run
   again after this log was staged and after the commit, so that they also
   cover this file. The gate runs are logs 31 and 32.

## Limitations

- At the base, a record that never appeared made `readFileSync` throw
  `ENOENT` after the deadline. Now the wait throws
  `FixtureDescendantIdentityMissing` in that case too, as DEC-20261103-03
  B2 item 2 states.
- During the retry, the wait treats every read or parse error as "not yet
  written". A record that can never be read, for example for lack of
  permission, ends as `FixtureDescendantIdentityMissing` after 5 s, not as
  its own error.
- The new test exercises the wait. The atomic write is exercised by the
  `grandchild`, `setsid` and `lifeline-eof` scenarios in
  `test/phase3a/adversarial/`, which passed in every run above. No test
  forces a reader to look between the temporary write and the rename. That
  the rename is atomic within one directory is a property of `rename(2)`,
  not something these runs show.
- The race failed once in CI and in none of the thirty runs on this host
  that DEC-20261103-03 A4 records. These gates show the change passes;
  they cannot show the CI failure will not recur.
- If the fixture died between its write and its rename, the temporary
  file would remain in the fixture root until that root is removed.

## Not run

- This host does not run the macOS branch of any test; Verify (macOS)
  does.
- Verify, Verify (macOS) and code-review on GitHub, and the Tier-2 review
  of DEC-20261103-03 B2 item 6.

## Halts

None.
