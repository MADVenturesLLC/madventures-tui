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
