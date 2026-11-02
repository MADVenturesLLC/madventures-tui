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
