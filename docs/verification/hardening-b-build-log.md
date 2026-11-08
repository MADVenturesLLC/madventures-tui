# Hardening B build log

Build of `DEC-20261102-02` B1 item 2, items 5, 12, 13 and 17 of `DEC-20261102-01`, on
`build/hardening-b-r1` from the binding base `68959cf27ee2652d4f9c3287cec4a5ee03798a7a`, the merge
of pull request 210. Item 18 was not built, by the Founder ruling recorded below.

- Role-Id: builder. Actor-Id: `session:claude-code/hardening-b-r1`. Execution-Surface: claude-code.
- Harness Claude Code, model Opus 5.5 (`claude-opus-5-5`), started with `claude --strict-mcp-config`.
  No MCP server loaded. Sandbox not shown by the harness; approval mode shown as auto.
- Clone `/Users/michaeldaley/builds/madventures-tui-hardening-b-r1`, git identity `daley40-lab`
  with `293512385+daley40-lab@users.noreply.github.com`. Host `Darwin arm64`.
- Runtime, under `PATH="/Users/michaeldaley/.bun/bin:$PATH"`: `bun` and `bunx` from
  `/Users/michaeldaley/.bun/bin`, binary SHA-256
  `35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5`, version 1.4.2, revision
  `744846f844374847c902b5e7fd59b4342a51ef99`. Checked before the baseline and before each item's
  first test run, with no difference.
- Logs: `/Users/michaeldaley/builds/hardening-b-r1-pr/logs/`, one file per run, each named for its
  item, step and run. Every SHA-256 below is `shasum -a 256` of that file.

## Preconditions

1. `git fetch origin main`: `origin/main` is `68959cf27ee2652d4f9c3287cec4a5ee03798a7a`, so no path
   has changed since the base. HEAD is that commit on `build/hardening-b-r1`; the tree was clean, and
   this log did not exist.
2. On `origin/main` every file of the prompt's AUTHORITY list has the SHA-256 the prompt gives, and
   each act has Status ISSUED and the Founder signature.
3. What items 13, 12, 17 and 5 rely on was quoted at HEAD, in each item's section below. For item 18,
   no `manifest_hash` exists at HEAD; see the Founder ruling below.
4. `uname -sm` prints `Darwin arm64`.
5. Baseline, each once in the foreground, all exit 0 with 0 fail; `bun.lock` SHA-256
   `34224c0133c44d967c4a4da8b75bf11093c573c47e42bcaf502c6d6f61c3e7c0` before and after.

| Command | Load at start (1, 5, 15 min) | Result | Log | SHA-256 |
| --- | --- | --- | --- | --- |
| `bun install --frozen-lockfile` | 1.31 1.65 1.99 | exit 0, 51 packages | baseline-install-run1.log | b4443a52207852deb0263bd4fa31e3980598a7b989e45396c2fca850f7184a4b |
| `bunx tsc --noEmit` | 1.45 1.67 1.99 | exit 0, no output | baseline-tsc-run1.log | e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 |
| `bun test test/phase3a` | 1.41 1.66 1.99 | 137 pass, 0 fail | baseline-phase3a-run1.log | c0457a4dd7cb97fe86e7bd7977cf75f5bce3748184785ac5dfde31fae54af410 |
| `bun test apps/madbridge` | 2.63 1.95 2.06 | 518 pass, 0 fail | baseline-apps-madbridge-run1.log | d1483fec8fef0ada3421260ec2ae5f169896c0cd8838520ec4b8262594905692 |
| `bun test packages/artifact-store` | 2.31 1.90 2.05 | 6 pass, 0 fail | baseline-packages-artifact-store-run1.log | 187de88d61d3d63e7fb8bb8ba754d4abfc3d79473bd50e2e5484443060b1e25c |
| `bun test test/acceptance` | 2.31 1.90 2.05 | 87 pass, 0 fail | baseline-test-acceptance-run1.log | d8a27c7702c033f8924b898eea27a99f00bc946bd8ee6cea78496fb49a6f42f9 |
| `bun test` | 2.42 1.94 2.06 | 1871 pass, 0 fail | baseline-full-run1.log | dcc4a0e09bc7170f113d84733faa58d1a2a665dfbe95d672ad764ed3aaa74025 |

## Founder ruling on item 18

At the base, no code computes a `manifest_hash`. `createManifest` in
`packages/artifact-store/src/manifest.ts` lines 22 to 40 returns `version`, `generated_at`,
`artifact_count`, `artifacts`, `ledger_head_hash` and `repo_fingerprint`, with no hash.
`apps/madbridge/src/commands/export-evidence.ts` lines 181 to 185 add `redaction_rules_applied` to
a manifest that nothing hashes. `git log -S manifest_hash --all` finds the name only in documentation
commits. Meeting item 18 would mean creating a new evidence field. Asked before any edit, the Founder
ruled in the session:

> Founder ruling: skip item 18. At base 68959cf27ee2652d4f9c3287cec4a5ee03798a7a no code computes a
> manifest_hash, so DEC-20261102-01 item 18 rests on a premise that is not true, and there is no
> existing hash for redaction_rules_applied to be covered by. Creating a new evidence field is outside
> DEC-20261102-02. Make no change for item 18, and change neither
> packages/artifact-store/src/manifest.ts nor the manifest code of export-evidence.ts for it. Build
> items 13, 12, 17 and 5 as the prompt orders them. Record this ruling, with the evidence you quoted,
> in the build log under deviations and in the pull request description under not-run items and
> deviations. This ruling is recorded in my next act.

The build therefore has four commits, for items 13, 12, 17 and 5 in that order.

## Deviations recorded before item 13

1. Item 18 not built, under the Founder ruling above.
2. The baseline left `packages/founder-act/src/main.ts` with mode 755 in the working tree, against
   mode 644 in the index; its content was unchanged. Its ctime, 08:34:39, matches the baseline
   `bun install --frozen-lockfile`, which most likely marked the workspace `bin` target executable.
   The tracked mode was restored with `chmod 644` before any edit, and the tree was clean again.
   Nothing about that file is committed.

## Item 13: export evidence into a fresh package

- **Built on:** `68959cf27ee2652d4f9c3287cec4a5ee03798a7a`.
- **Relies on, at the base:** `apps/madbridge/src/commands/export-evidence.ts` line 188,
  `mkdirSync(outputDir, { recursive: true, mode: 0o700 });`, then lines 191 to 210, three
  `writeFileSync(join(outputDir, ...))` calls for `ledger-sanitized.json`, `manifest.json` and
  `README.txt`. The output directory is neither cleared nor checked, so a file already there stays in
  the package. With `--session`, `outputDir` is the session's pre-created `sanitized-evidence`
  directory (`verify-ledger.ts` line 46).
- **Change:** the package is written into a fresh `mkdtemp` directory beside the output directory and
  published only when complete: any earlier output is renamed aside, the complete package is renamed
  into place, and the earlier output is removed. A failure before publication removes the staging
  directory and leaves the earlier output in place. The session's own `sanitized-evidence` directory
  is always replaced. An explicit `--output` that already exists is replaced only when it holds
  nothing but the package's own three files; otherwise the command returns `output_not_empty` with
  exit 1 and writes nothing. That guard keeps the change from deleting a directory the user named,
  and it keeps the existing re-export into the same explicit output working.
- **Files changed:** `apps/madbridge/src/commands/export-evidence.ts`,
  `test/phase3a/evidence-pipeline.test.ts`, `docs/verification/hardening-b-build-log.md`.
- **Tests added** to `test/phase3a/evidence-pipeline.test.ts`, which then holds 18 passing tests:
  - `export-evidence publishes a fresh package that holds no file it did not write`: plants a
    synthetic file in the session's `sanitized-evidence`, exports with `--session`, and asserts that
    the package holds exactly the three package files and that the session directory gains no entry;
    twice, so the replaced directory also passes the storage validation of the second export.
  - `export-evidence refuses an explicit output directory that holds a file it did not write`.
- **Failing runs,** against the code before the change:
  - The first test: `expect(received).toEqual(expected)` at line 669, the received listing holding
    `"planted-before-export-1.txt"`. Load 1.80 1.73 1.90. Exit 1. `item13-red-run1.log`,
    `ee55548cee1f6fc85ca453ec63d9cca82aaf483cc69868cd109e13bcf093e812`.
  - The second test: `Expected: 1` `Received: 0` at line 683, the export accepted. Load 11.60 4.00
    2.70. Exit 1. `item13-red-run2.log`,
    `cc4a87e46d9a2e99b8ca154fdb2513865ac8921fe76324132889ca370be10301`.
- **Runs after the change,** each exit 0 with 0 fail:

| Command | Load at start | Result | Log | SHA-256 |
| --- | --- | --- | --- | --- |
| `bunx tsc --noEmit` | 6.54 3.71 2.66 | no output | item13-tsc-run1.log | e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 |
| `bun test test/phase3a/evidence-pipeline.test.ts` | 6.54 3.71 2.66 | 18 pass | item13-green-evidence-pipeline-run1.log | a23271b41deaa57621b86970732aca43635aaaf10dbe2e5a02627f450aa3f4fd |
| `bun test apps/madbridge` | 4.82 3.51 2.61 | 518 pass | item13-suite-apps-madbridge-run1.log | 97bcaa05937aa689a722eae68563bd9c24893da7254c35e7b002613b01c4b428 |
| `bun test test/acceptance` | 4.39 3.46 2.60 | 87 pass | item13-suite-test-acceptance-run1.log | 1e9cc4dfba951c68a659c1df6faf2a3b122880caf6abc164d72a5c4e5db9885e |
| `bun test test/phase3a` | 4.39 3.46 2.60 | 139 pass | item13-suite-test-phase3a-run1.log | 304f0b1d2edbf2a445ecb59a80e987341ef99ea3f0df2674a1fbcd6b449bebf2 |

- **Deviations:** the second failing run began at a load of 11.60. Its failure is the intended RED
  failure that proves the test fails without the change, caused by the missing behavior and not by
  timing, so it was not treated as a halt under `DEC-20261102-02` B9 and was not rerun. Every RED or
  break run in this build is treated the same way, and its load is recorded.
- **Halts:** none.

## Founder ruling on the load rule for RED and break runs

Given in the session during item 12, quoted verbatim:

> Founder ruling: resume. The B9 load halt applies only when a test fails unexpectedly in a run whose
> first load average was 2.0 or more. The failures of a deliberate-break or RED run are the intended
> failures that show the tests catch the break, so such a run is working as designed, not a B9 halt,
> at any load. Restore the break, confirm the restored file's SHA-256, run the item's tests in a
> normal run, and continue. If a test fails unexpectedly in a run whose first load average was 2.0 or
> more, halt as B9 says; otherwise handle any failure under DEC-20261023-01 Part B. Record this ruling
> in the build log, and apply it to every later deliberate-break or RED run without stopping.

It covers the second RED run of item 13 (load 11.60) and every later RED or break run.

## Item 12: reject invalid session subdirectories in the evidence commands

- **Built on:** `8c4d3d87ce8a937a4a3f1bedab281603e147442f`.
- **Relies on, at the item's base:**
  - The existing rejection tests, `test/phase3a/evidence-pipeline.test.ts` lines 632 to 658 at
    `68959cf27ee2652d4f9c3287cec4a5ee03798a7a`, `${command} rejects an ${invalid} without
    exporting`, which run each command with `--session` together with explicit `--ledger` and
    `--output` paths, so neither subdirectory check is reached.
  - The ledger subdirectory check, `apps/madbridge/src/commands/verify-ledger.ts` lines 38 to 41,
    `validateStorageRoot(dirname(ledgerPath), ...)` when `--session` is given without `--ledger`;
    `resolveEvidencePaths` is shared by both commands.
  - The output subdirectory check, `apps/madbridge/src/commands/export-evidence.ts` lines 73 to 77
    after item 13 (lines 69 to 73 at the base), `validateStorageRoot(outputDir, ...)` when `--session`
    is given without `--output`.
- **Change:** tests only; no production change.
- **Files changed:** `test/phase3a/evidence-pipeline.test.ts`, `docs/verification/hardening-b-build-log.md`.
- **Tests added** to `test/phase3a/evidence-pipeline.test.ts`, which then holds 24 passing tests.
  Each runs the command with `--session` only, against a closed fixture session whose subdirectory was
  made group-accessible (mode 750) or replaced by a symbolic link to a sibling directory, and asserts
  exit 1, the exact `storage_root_invalid:group_or_other_accessible` or
  `storage_root_invalid:symlink_component` error, and an unchanged storage tree:
  - `verify-ledger --session rejects a group-accessible ledger subdirectory`
  - `verify-ledger --session rejects a symbolic link ledger subdirectory`
  - `export-evidence --session rejects a group-accessible ledger subdirectory`
  - `export-evidence --session rejects a symbolic link ledger subdirectory`
  - `export-evidence --session rejects a group-accessible output subdirectory`
  - `export-evidence --session rejects a symbolic link output subdirectory`
- **Before the break:** the six tests pass at the item's base. Load 1.76 2.81 2.51. Exit 0, 6 pass.
  `item12-new-tests-run1.log`, `1316d80dfaa3692977ea0184b981cd3a85c3f1a0ee3f4ef751f97f2ac54f2eea`.
- **Break:** both subdirectory checks deleted: the four lines above in `verify-ledger.ts` and the
  five lines above in `export-evidence.ts`. The diff is saved as
  `/Users/michaeldaley/builds/hardening-b-r1-pr/item12-break.diff`, SHA-256
  `bea7d09ecb71a6b86c81ae8071c27ee0be65d6502ab5fed13385ea5055e73358`. Original SHA-256:
  `verify-ledger.ts` `5c9e3e9eb008fbc7f7e11510c95c9487127136a3a633a652ed3fb157d27b7731`,
  `export-evidence.ts` `b877121499a19d988b983b7077c608ea832b18fb9e2ba52a34fc5ce2a5cd9bfe`.
- **Failing run under the break:** all six tests fail, each with `Expected: 1` `Received: 0`, the
  command accepting the invalid subdirectory. Load 2.47 1.67 1.83, an intended failure under the ruling
  above. Exit 1, 0 pass, 6 fail. `item12-break-run1.log`,
  `6ef77fa7bd6ce24df1c2aa20c58e3413852c5ef0317d78607971b870e1db68f7`.
- **Restored** with `git checkout --` on both files; `shasum -a 256 -c` reports both SHA-256 values
  above as OK.
- **Runs after the restore,** each exit 0 with 0 fail:

| Command | Load at start | Result | Log | SHA-256 |
| --- | --- | --- | --- | --- |
| `bunx tsc --noEmit` | 1.62 1.54 1.77 | no output | item12-tsc-run1.log | e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 |
| `bun test test/phase3a/evidence-pipeline.test.ts` | 1.62 1.54 1.77 | 24 pass | item12-green-evidence-pipeline-run1.log | ffd27e845b36f9d9bc4a205f19890372e582cd681006c9bcc5cd317896e5d618 |
| `bun test test/phase3a` | 1.83 1.58 1.79 | 145 pass | item12-suite-test-phase3a-run1.log | 425ff542c1da1057b502537edbdb666bc4255bf2399bf489d6f5e2a3718cc0f5 |

- **Deviations:** the first attempt to apply the break, by line-number `sed`, was blocked by a local
  pre-tool hook before it ran; both files were confirmed unchanged by SHA-256. After the Founder's
  ruling to resume, the break was applied by exact-text edits instead.
- **Deviation, commit subject:** the subject the prompt gives for this item,
  `test(phase3a): reject invalid session subdirectories in the evidence commands`, is 77 characters,
  against the prompt's rule that every commit message line is 72 characters or shorter. The exact
  subject is used verbatim; every other line of the message is 72 characters or shorter.
- **Halts:** none.

## Item 17: cover a running host that drops acknowledgements

- **Built on:** `a366872b6e770fd1d77ddcd6bacc2824c9ba22b5`.
- **Relies on, at the item's base:**
  - `escalateWedgedHost`, `packages/broker/src/pty-host-supervisor.ts` lines 887 to 913, which runs
    `runOwnedEscalation`: it registers the pending acknowledgement, sends `terminate`, and races the
    acknowledgement, the host's exit and the 250 ms deadline (lines 1043 to 1073). On expiry it closes
    host stdin, kills the reported process group, then kills the host while it is alive (state S3),
    and asks the caller to interrupt the session (lines 1104 to 1179).
  - The acknowledgement is settled inside the supervisor from the decoded fact stream (lines 743 to
    749), so a test cannot drop it after the host sends it.
  - `test/phase3a/adversarial/wedged-host.test.ts` lines 79 to 104: `a SIGSTOPped host is cleared
    through the direct PGID path`, `a host that never acknowledges a command is treated as host
    failure at 250 ms` and `a wedged host receives no responsive-host grace`, each through
    `scenario({ wedgeHostAfter: 50, ... })`, whose assertions at lines 36 to 67 cover the governed
    descendant, the closed session and invalidated token, the `pty_host_failure` interruption, every
    host, child and group gone, death within 5,000 ms, state S3, `killOrder` `pgid` then `host`, no
    terminate acknowledgement or `termination_started`, and the deadline bounds. The harness fault
    sends the host `SIGSTOP` (`test/phase3a/runtime-harness.ts`, then line 602).
- **Change:** tests and harness only; no production change.
  - `test/phase3a/runtime-harness.ts` gains the fault switch `dropHostAckAfter`, validated like
    `wedgeHostAfter`. When it fires, the harness replaces `send` on the same host handle object, so the
    production supervisor's records for that handle still apply, and sends no signal. The running host
    never receives `terminate`, so it never acknowledges it. The harness sends a `resize` in its place.
    The fault report gains `resizeAcks`, the count of the builder host's `resize` acknowledgements
    during the fault, which shows the host is unstopped and still acknowledging other commands. The
    harness still returns to tests only `client`, `storage`, `close` and `interrupt`; it returns no
    broker, broker delegate, ledger or publishing function (`DEC-20261027-01` B5 item 3).
  - `test/phase3a/adversarial/wedged-host.test.ts`: the escalation assertions of `scenario` now also
    apply under `dropHostAckAfter`, and one test is added.
- **Files changed:** `test/phase3a/runtime-harness.ts`, `test/phase3a/adversarial/wedged-host.test.ts`,
  `docs/verification/hardening-b-build-log.md`.
- **Test added** to `test/phase3a/adversarial/wedged-host.test.ts`, which then holds 7 passing tests:
  `a running host that drops its acknowledgement of a command is treated as host failure at 250 ms`,
  `scenario({ dropHostAckAfter: 50, processScenario: "grandchild" })`, the same scenario and assertions
  as the `SIGSTOP` test, plus `resizeAcks` equal to 1 and `escalatedMs` at most 500.
- **Before the break:** the test passes at the item's base, so production detects the dropped
  acknowledgement with no production change. Load 3.18 3.05 2.41. Exit 0, 1 pass.
  `item17-new-test-run1.log`, `6ed5ff8255827c766b30149badb9196c3390266cded3a3c9a581f40b549c9138`.
  Observed: state S3, acknowledgement window ended at 249.34 ms, stdin closed at 249.58 ms, process
  group kill at 249.82 ms, host kill at 249.83 ms, `terminateAcks` 0, `terminationStarted` false,
  `resizeAcks` 1. A typecheck before it: load 3.11 3.03 2.40, exit 0, `item17-tsc-pre-run1.log`,
  `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.
- **Break:** in `packages/broker/src/pty-host-supervisor.ts` line 1072,
  `if (winner === "ack") acked = true;` became `if (winner === "ack" || winner === "deadline") acked = true;`,
  so an expired deadline counts as an acknowledgement. The diff is saved as
  `/Users/michaeldaley/builds/hardening-b-r1-pr/item17-break.diff`, SHA-256
  `c59afbacb2ab654bc6e93f5f2f824b27277dcac6481ad2c686ae57246fba0811`. Original SHA-256
  `9ba986edb28133e2f7a177f95280b2088b8bd5051e80ba58794dc0555a5a8bb7`.
- **Failing run under the break:** `error: the recorded governed descendant must be gone within the
  outer bound`, `Expected: false` `Received: true`; production never escalated. Load 3.10 3.03 2.42,
  an intended failure under the Founder ruling above. Exit 1, 0 pass, 1 fail.
  `item17-break-run1.log`, `5efacae8fd8f204b378ed82601226fe9e7e95e604e9b31554f811cda77323410`.
- **Restored** with `git checkout --`; `shasum -a 256 -c` reports the original SHA-256 as OK.
- **Runs after the restore,** each exit 0 with 0 fail:

| Command | Load at start | Result | Log | SHA-256 |
| --- | --- | --- | --- | --- |
| `bunx tsc --noEmit` | 2.28 2.84 2.37 | no output | item17-tsc-run1.log | e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 |
| `bun test test/phase3a/adversarial/wedged-host.test.ts` | 2.28 2.84 2.37 | 7 pass | item17-green-wedged-host-run1.log | 0a96c4d351bb453b3de39df6dde8330f34ce0066a3dda8cb9a701be56a412d2a |
| `bun test test/phase3a` | 2.10 2.79 2.35 | 146 pass | item17-suite-test-phase3a-run1.log | 9ded05f6b6ce72e100583cb58cab269ef56a6c83f1c5cf9c18a297f76767281a |

- **Limitation:** the `terminate` frame is withheld at the supervisor's write boundary of the host
  handle, in the harness, rather than discarded inside the host process; reaching inside the host
  process would need a production change or a change to the host's environment. To the supervisor the
  fault is the one the item names: a host that keeps running, keeps acknowledging other commands, and
  never acknowledges this one.
- **Deviations:** none.
- **Halts:** none. No production change was needed, and production detects the fault.

## Item 5: cover refused input, SIGINT exit and the returned session

- **Built on:** `51fc50daafd87b94487bb870d07f5629eaeebace`.
- **Relies on, at the item's base:**
  - The harness `request` wrapper, `test/phase3a/runtime-harness.ts` line 564,
    `if (!accepted.ok) return accepted;`, before it sends `pty_input` or `pty_resize` to the writer's
    host (lines 565 to 570); the broker refuses a stale fencing token with `stale_fencing_token`
    (`packages/broker/src/command-legality.ts`, predicate 7).
  - The fixture's handlers, `test/phase3a/fixture-adapters.ts` lines 31 to 33:
    `const finish = () => process.stdout.write("", () => process.exit(0));`,
    `process.on("SIGTERM", finish);`, `process.on("SIGINT", finish);`.
  - The returned session, `test/phase3a/runtime-harness.ts` line 578,
    `Object.freeze({ client, storage: state.storage, close, interrupt })`; the existing check,
    `test/phase3a/harness-lifecycle.test.ts` line 46, uses `Object.keys`, which sees no symbol or
    non-enumerable key.
  - The third test of `test/phase3a/environment-equality.test.ts`, lines 97 to 150, `a secret-marked
    value never appears in any diagnostic, error, or evidence artifact produced by the session`, which
    issued no refused command, so no error payload was checked against the marker.
- **Change:** tests only; no production, harness or fixture change.
- **Files changed:** `test/phase3a/harness-lifecycle.test.ts`, `test/phase3a/environment-equality.test.ts`,
  `docs/verification/hardening-b-build-log.md`.
- **Tests added or changed:**
  - `test/phase3a/harness-lifecycle.test.ts`, which then holds 9 passing tests, gains:
    - `the returned session holds only its client, storage, close and interrupt`: `Reflect.ownKeys`
      equals exactly those four keys in order, and the session is frozen.
    - `a refused pty_input or pty_resize never reaches the child`: a `pty_input` and a `pty_resize`
      with a stale fencing token are refused with `stale_fencing_token`; after 100 ms, ten periods of
      the fixture's size check, an accepted input and an accepted resize follow; the output up to the
      accepted resize report holds the accepted input and neither the refused bytes nor a report of the
      refused size.
    - `the fixture child exits cleanly on SIGINT`: the fixture executable runs with `--fixture-run`
      under a `Bun.Terminal` with a synthetic two-variable environment, prints `FIXTURE_READY`, receives
      `SIGINT`, and exits with code 0 and no signal.
  - `test/phase3a/environment-equality.test.ts`, which still holds 3 passing tests: its third test now
    issues a refused `pty_input` with a stale fencing token, asserts it is refused, and includes its
    result in the serialized payload checked against the marker.
- **Before the breaks:** the two files pass at the item's base. Load 1.81 2.32 2.25. Exit 0, 12 pass.
  `item5-new-tests-run1.log`, `dc8f4232d8ab196c0d6026612b615f17d9b8e75c5cc47e727c0565113beca618`. A
  typecheck before it: exit 0, `item5-tsc-pre-run1.log`,
  `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.
- **Breaks,** one per check, each applied alone, run, and restored with `git checkout --`; after each,
  `shasum -a 256 -c` reports the originals OK: `test/phase3a/runtime-harness.ts`
  `d60464eca2b29575a717ef468e793e8a140f153437854795ecf0353e156610d8` and
  `test/phase3a/fixture-adapters.ts` `45cb50f6be3b3755a917f6fe6c0ada2716d950f465a7078015328ce171648d50`.
  Each failure is an intended failure under the Founder ruling above.

| Break | Diff SHA-256 | Load at start | Failing run | Log | SHA-256 |
| --- | --- | --- | --- | --- | --- |
| A: the harness forwards a refused `pty_input` or `pty_resize` to the host | 9de659d02f26d3293032ad42ad0a4cece2fe53ca61b857319977177c423cbe34 | 2.07 2.30 2.25 | `expect(received).not.toContain(expected)`, `Expected to not contain: "REFUSED_INPUT"`; the output held the refused bytes and `FIXTURE_RESIZE 77 23`. 1 fail | item5-break-a-run1.log | b723c0bf7be6940a0a3a0706285bcb84e57d7ecc2598ebd63d6625163763af99 |
| B: the session gains a non-enumerable symbol key holding the broker | 14dda792d905ed249719d2539a0d40b66eeab40151c8e962344616d24d116181 | 1.96 2.26 2.24 | `expect(received).toEqual(expected)`, received adds `Symbol(fixture.broker)`; the existing `Object.keys` test passed under the same break. 1 pass, 1 fail | item5-break-b-run1.log | 225131d112df6ed13afe0527308ce6c580056a23d0b7a0711562fbba99fb695f |
| C: the fixture's `SIGINT` handler is removed | 38bf715a6be249b0ffa2b3830e4dd4e22cf0cda85aea05f7ac94eda22993748c | 1.96 2.25 2.23 | `Expected: 0`, `Received: 130`. 1 fail | item5-break-c-run1.log | a0f8f488b9e0441659a403b89c43f6007fa92a1da952493ea585691e2c36a05e |
| D: a refusal's `detail` carries the seeded synthetic marker | a351ff5bc5f756869f1eff72b034c91fab4db921dbfca68954773107ea5253d5 | 2.12 2.27 2.24 | at line 128, `Expected to not contain: "task50-synthetic-secret-marker"`, the `refused` payload's `detail` holding it. 1 fail | item5-break-d-run1.log | 9d4764de0e06841605631af962b200a8d2483b3e1adfa854468cc2f5d08d510d |

  The diffs are saved under `/Users/michaeldaley/builds/hardening-b-r1-pr/` as `item5-break-a.diff`
  to `item5-break-d.diff`. Break D reads only the seeded synthetic `MADV_SECRET_MARKER`.
- **Runs after the restores,** each exit 0 with 0 fail:

| Command | Load at start | Result | Log | SHA-256 |
| --- | --- | --- | --- | --- |
| `bunx tsc --noEmit` | 2.08 2.25 2.23 | no output | item5-tsc-run1.log | e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 |
| `bun test test/phase3a/harness-lifecycle.test.ts` | 2.08 2.25 2.23 | 9 pass | item5-green-harness-lifecycle-run1.log | 05d176fb5acf053d5f177c4cb62a56b4102e132b71f8284f6746252c000983d8 |
| `bun test test/phase3a/environment-equality.test.ts` | 2.00 2.23 2.23 | 3 pass | item5-green-environment-equality-run1.log | aae22b26393a975d5478ae82b507a5e7096b844c38fe6a1b56b01ab41dff73f9 |
| `bun test test/phase3a` | 2.08 2.25 2.23 | 149 pass | item5-suite-test-phase3a-run1.log | f941ce20838b2511698d7eb8f1dceb2add236f94005f78c989bac9e0a1c3e7ab |

- **Deviations:** none.
- **Halts:** none.

## Correction 1: entry types in the explicit output guard

- **Authority:** Addendum 1 to the Hardening B builder prompt, signed by the Founder, part of item 13
  of `DEC-20261102-01` and within `DEC-20261102-02` B2 item 2.
- **Built on:** `0a80144047b64fffdc684d437b49adbe5f0fac9f`.
- **Defect, at the item's base:** `apps/madbridge/src/commands/export-evidence.ts` lines 195 and 196,
  `if (!sessionOutput && existsSync(outputDir)` and
  `&& readdirSync(outputDir).some((name) => !PACKAGE_FILES.includes(name))) {`, check only the names
  of the entries of an explicit `--output`. A directory or a symbolic link named `README.txt`,
  `manifest.json` or `ledger-sanitized.json` passes the guard; the whole output directory is then
  renamed aside and removed at line 250,
  `if (replaced) rmSync(previous, { recursive: true, force: true });`, so that entry and everything in
  it is deleted.
- **Change:** the guard reads the directory with `readdirSync(outputDir, { withFileTypes: true })` and
  refuses with the same `output_not_empty` result, in the JSON and the text form, when any entry is not
  a regular file or has a name outside `PACKAGE_FILES`. A symbolic link is not a regular file, because
  the entry type is read without following it. Nothing else in the file changed; the `--session`
  path, the staging, the renames and the restore are as they were.
- **Files changed:** `apps/madbridge/src/commands/export-evidence.ts`,
  `test/phase3a/evidence-pipeline.test.ts`, `docs/verification/hardening-b-build-log.md`.
- **Tests added** to `test/phase3a/evidence-pipeline.test.ts`, next to the existing explicit-output
  test, which then holds 27 passing tests:
  - `export-evidence refuses an explicit output directory whose README.txt is a directory` and
    `export-evidence refuses an explicit output directory whose manifest.json is a symbolic link`,
    each in its own closed fixture. The directory holds one synthetic file; the link points to a
    synthetic file in the session directory, outside the output directory. Each asserts exit 1, the
    `output_not_empty` JSON result, the same output listing as before, the entry's kind by
    `lstatSync`, the synthetic content unchanged, and the same parent listing as before.
  - `export-evidence replaces an explicit output directory that holds only an earlier package`: two
    exports to the same explicit `--output`, created empty first, each exit 0; the directory then
    lists exactly `README.txt`, `ledger-sanitized.json` and `manifest.json`, and its parent lists the
    same entries as before the first export.
- **Failing run,** against `export-evidence.ts` before the change: both refusal tests fail at line 708,
  `expect(received).toEqual(expected)`, with `exitCode` 0 against 1, the output listing grown to the
  three package files, and the planted entry now a `regular file` instead of a `directory` or a
  `symbolic link`: the export succeeded and the planted directory or link is gone. The replacement test
  passes. Load 1.70 1.56 1.80. Exit 1, 25 pass, 2 fail. `c1-red-evidence-pipeline-run1.log`,
  `190649c6288ed00d7585051f50b1a629cdf4fc8a4833d5f8384f65772ef92a20`.
- **After the change:** load 1.31 1.48 1.76. Exit 0, 27 pass, 0 fail.
  `c1-green-evidence-pipeline-run1.log`,
  `860842f71976dd5f893da4916e8f9e69d26abbb9e56514e1d6e28a4f5c4ad802`. The file's SHA-256 is then
  `45577f7d783f01d46c4e50f84bc53ac569eb726efbc8321a6dfaddc369053520`; its diff is saved as
  `/Users/michaeldaley/builds/hardening-b-r1-pr/c1-production-diff-export-evidence.diff`, SHA-256
  `4d9d5a22b845fbe3bf144a6e052959d68a86bfd473cd844be7b7ebcde7ddbb0b`.
- **Break,** for the replacement test, which covers behavior production already had: the guard's
  predicate replaced by `.some(() => true)`, so it refuses every non-empty explicit output. The diff
  is saved as `/Users/michaeldaley/builds/hardening-b-r1-pr/c1-break.diff`, SHA-256
  `c80aa0355ec4f92d1e5274b0b78e454b33a6fa745b80e652f0274d87ab0b2f7a`.
- **Failing run under the break:** the replacement test fails at line 724 with `export 2`,
  `Expected: 0` `Received: 1`. The existing test `colliding redacted keys retain every value
  deterministically`, which also exports twice to one explicit output, fails at line 627 the same way.
  Load 1.13 1.41 1.73. Exit 1, 25 pass, 2 fail. `c1-break-evidence-pipeline-run1.log`,
  `b2734695d68eecbe84677a6f02ccde466e88b8863d7c4d5ad1390cc28d61ff03`.
- **Restored** by an exact-text edit; the file's SHA-256 is again
  `45577f7d783f01d46c4e50f84bc53ac569eb726efbc8321a6dfaddc369053520`, equal to the SHA-256 after the
  change, and its diff is byte-identical to the saved diff.
- **Gates,** each once, in the foreground, each test run exit 0 with 0 fail:

| Command | Load at start | Result | Log | SHA-256 |
| --- | --- | --- | --- | --- |
| runtime check | not recorded | unchanged | c1-gate-runtime-check.log | 2b1d8a5ab9bebb7a1de8417a1458f7d8ff03fd90e03fe98190496a94b162ab1f |
| `bunx tsc --noEmit` | 1.23 1.40 1.71 | no output | c1-gate-tsc-run1.log | e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 |
| `bun test test/phase3a` | 1.23 1.39 1.70 | 152 pass | c1-gate-test-phase3a-run1.log | 9dbe125f66dda3dc2a340dcd6cea2a2198af0f95c525cc9bf7fcb4da06be97f0 |
| `bun test apps/madbridge` | 1.12 1.35 1.66 | 518 pass | c1-gate-apps-madbridge-run1.log | 07aad096da67f9e55f339a208acf54abcd07b8c703d6d1fc257694e129022304 |
| runtime check | not recorded | unchanged | c1-gate-runtime-check-2.log | 2b1d8a5ab9bebb7a1de8417a1458f7d8ff03fd90e03fe98190496a94b162ab1f |
| bare `bun test` | 1.07 1.32 1.64 | 1886 pass | c1-gate-full-run1.log | f175164cb3d2a1f1dc79e502c6dd585e842cd5958f42d9ad4ab9504b8f9015bb |
| `git diff --check 68959cf27ee2652d4f9c3287cec4a5ee03798a7a` | not recorded | exit 0, no output | c1-gate-diff-check.log | e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 |
| `git diff --name-only 68959cf27ee2652d4f9c3287cec4a5ee03798a7a` | not recorded | exit 0, 7 paths, all of B2 item 2 | c1-gate-diff-name-only-base.log | 9eaf22e30ca002c84a1fcd37d7703be898881968eac75916e0b7e06eb9dfd471 |
| `git diff --name-only 0a80144047b64fffdc684d437b49adbe5f0fac9f` | not recorded | exit 0, exactly the 3 files above | c1-gate-diff-name-only-head.log | 89a66c2ad29b53f72eb3e2e0f723fa47132770f29b3cd618517298843205e901 |

- **Deviations:**
  - The diff gates ran after the rest of this section was written and before these last rows and
    lines; the added lines were checked by `grep` for trailing whitespace, and the changed paths do
    not depend on them.
  - The replacement test creates the explicit output directory empty before the first export, so
    that its parent lists the same entries before and after both exports.
  - A session hook asked for a debugging skill to be invoked; it was not, because the builder prompt
    starts no other agent.
- **Halts:** none.
