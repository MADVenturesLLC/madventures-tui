Phase 3A merge-gate evidence: plan Task 59

Binding base: 9b377bb365c6ba416c5b5fd9b504a6f9a194a74e

Builder: session:claude-code/m26-task59-r1, on the Ubuntu PC

This is the Task 59 evidence that `DEC-20261106-01` B6 requires. It is written only from the builder's logs, kept in `/home/michaeldaley/builds/m26-task59-r1-pr/logs/` on the Ubuntu PC, and from files at the binding base. For items 3, 4, 5, 10, 11 and 17 of spec section 6.8 it names the report, review or act that decides the item and gives no verdict of its own.

## 1. Base and runtime

- Binding base: `9b377bb365c6ba416c5b5fd9b504a6f9a194a74e`, "docs: file DEC-20261106-01, the Task 59 act (#227)". Its parent commits are `a2f0b7e4afc36100205ea571d1c0a91b7c319480` and, second, `e7baad6398fdb2bf354b1c418138786074b69729` (`02-precond1-fetch.log`).
- After `git fetch origin main`, `origin/main` was the binding base itself, and `git diff --name-only` from the binding base to it listed no path (`02-precond1-fetch.log`).
- The Task 59 commit has one parent, the binding base. A commit cannot name its own SHA, so this file does not.
- Branch `build/m26-task59-r1`, working directory `/home/michaeldaley/builds/madventures-tui-m26-task59-r1`, git identity `daley40-lab` with `293512385+daley40-lab@users.noreply.github.com` (`00-identity-git.log`). `uname -sm` printed `Linux x86_64` (`05-precond4-uname.log`).
- At the binding base the tree was clean, `docs/verification/2026-08-12-phase-3a-merge-gate.md` did not exist, `test/phase3a/architecture-phase3a.test.ts` had SHA-256 `95318f3fb5fa283f736a0f7f2e519e8e50233b2d28b60076a9dc5fe4f08a6595` and `bun.lock` had SHA-256 `34224c0133c44d967c4a4da8b75bf11093c573c47e42bcaf502c6d6f61c3e7c0` (`03-precond2-tree.log`). The thirteen authority files of the builder prompt had the SHA-256 values the prompt names (`04-precond3-authority-sha.log`).

Runtime. Every Bun process of the build was the custodied build of `DEC-20261013-03` B2 item 2, used as its B4 requires: each command that started Bun began with `export PATH="/home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64:$PATH";` in that command alone, and `bun x` stood in for `bunx`. Each runtime check printed these lines, the path, the SHA-256 of the binary, `bun --version` and `Bun.revision`:

```text
/home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun
0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb  /home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun
1.4.1
69cb78c9097cebd3bdb832d9fff8b7d23abce09e
```

The runtime check ran at the start (`01-runtime-check-initial.log`), before the baseline (`06-baseline-runtime-check.log`), before Step 2 (`12-step2-runtime-check.log`), and as the first and fifth final gates, the fifth immediately before the final bare `bun test` (`38-gate01-runtime-check.log`, `42-gate05-runtime-check.log`). Every `bun install` and `bun test` printed `v1.4.1-canary.1 (69cb78c90)` in its first line.

## 2. The seventeen items of spec section 6.8

The text of each item is spec section 6.8's, with its line breaks joined. "The final gates" are the runs of `DEC-20261106-01` B5 item 6 on the Ubuntu PC, in section 4.4. "The run of B8" is the Founder's run of `DEC-20261106-01` B8 on the MacBook, whose logs are not part of this file.

| Item | Spec section 6.8 text | How it is checked | Where its result is |
| --- | --- | --- | --- |
| 1 | The full automated suite passes without regression below the Phase 2 baseline of 714 tests, 2606 `expect()` calls, and 35 files; Phase 3A-required coverage increases the suite rather than replacing it. No required or existing test is skipped, disabled, filtered, quarantined, marked `.only`, or otherwise excluded without an explicit Founder-visible disposition. | The test "merge gate item 1: the suite has not regressed below the Phase 2 floor" in `test/phase3a/architecture-phase3a.test.ts`, which reads both certification reports against `PHASE_2_FLOOR`; the bare `bun test` of the final gates; and the existing tests "no required test file uses test.skip or describe.skip without a disposition marker" and "no source file marks a test .only" in `test/phase3a/architecture-phase3a.test.ts`. | `40-gate03-arch-test.log` and `43-gate06-bun-test.log`; section 4.4. |
| 2 | Pure, architecture, fixture, adversarial, and two-host layers pass. | The final gates `bun test test/phase3a/architecture-phase3a.test.ts`, `bun test test/phase3a` and bare `bun test` on the Ubuntu PC; the same test file and bare `bun test` on the MacBook in the run of B8; the two host certification reports for the two-host layer. | `40-gate03-arch-test.log`, `41-gate04-bun-test-phase3a.log` and `43-gate06-bun-test.log`; the logs of the run of B8. |
| 3 | The MacBook report passes and is checksummed. | Decided by `docs/verification/2026-08-12-phase-3a-host-certification-macbook.md`, by the Tier-2 review of pull request 225 at `b40223570e9483559068fd6d2739e83203ccb4be` that Addendum 4 A1 to `DEC-20261104-02` records, and by the final merge review of `DEC-20261106-01` B11 item 2. No verdict is given here. | Those documents. |
| 4 | The Ubuntu PC report passes and is checksummed. | Decided by `docs/verification/2026-08-12-phase-3a-host-certification-ubuntu.md`, by the Tier-2 review of pull request 225 at `b40223570e9483559068fd6d2739e83203ccb4be` that Addendum 4 A1 to `DEC-20261104-02` records, and by the final merge review of `DEC-20261106-01` B11 item 2. No verdict is given here. | Those documents. |
| 5 | Both reports identify the same candidate commit. | Decided by the two host certification reports, by the Tier-2 review of pull request 225 that Addendum 4 A1 to `DEC-20261104-02` records, and by the final merge review of `DEC-20261106-01` B11 item 2. No verdict is given here. | Those documents. |
| 6 | TypeScript is clean. | `bun x tsc --noEmit` in the final gates; `bunx tsc --noEmit` on the MacBook in the run of B8. | `39-gate02-tsc.log`; the logs of the run of B8. |
| 7 | `git diff --check` is clean. | Read as `DEC-20261106-01` B4 item 7: "Step 5's `git diff --check` counts as clean when it exits 2 and prints the 33 lines of A5 item 1, byte for byte, as Addendum 3 B1 to `DEC-20261104-02` ruled for Task 58." The final gate `git diff --check aa16032c56fdf6c7105e99b1765ed9365d605bf4` records its exit status, line count and output SHA-256 for comparison with A5 item 1. | `45-gate08-git-diff-check.log`; section 4.4. |
| 8 | Fixture-generated ledgers pass production `verify-ledger`. | The existing test "production verify-ledger validates a fixture-produced ledger" in `test/phase3a/evidence-pipeline.test.ts`, run by `bun test test/phase3a` and bare `bun test` in the final gates. | `41-gate04-bun-test-phase3a.log` and `43-gate06-bun-test.log`. |
| 9 | Fixture-generated evidence passes production `export-evidence` and sanitization checks. | The existing tests "production export-evidence consumes a fixture-produced session", "exported evidence contains no allowlisted secret value", `exported evidence redacts a ${kind} in nested property keys`, "the manifest records which redaction rules ran", "token-prefixed allowlisted secrets leave no suffix in exported keys or values" and "colliding redacted keys retain every value deterministically" in `test/phase3a/evidence-pipeline.test.ts`, run by `bun test test/phase3a` and bare `bun test` in the final gates. | `41-gate04-bun-test-phase3a.log` and `43-gate06-bun-test.log`. |
| 10 | Every warning and review finding has an explicit disposition. | Decided by the final merge review of `DEC-20261106-01` B11 item 2. Sections 5 and 6 of this file quote the stated limitations and carried items the acts name. No verdict is given here. | That act. |
| 11 | The Tier-2 reviewer of §6.7 issues an approving Tier-2 verdict for the exact candidate SHA. | Decided by the Tier-2 review of `DEC-20261106-01` B9 item 1 at Task 59's head, which B11 item 1 makes the candidate SHA of items 11 and 17. No verdict is given here. | That review. |
| 12 | Production `start` still returns `live_runtime_not_certified`. | The test "merge gate item 12: production start still returns live_runtime_not_certified"; also the existing tests "start exits 78 with the exact human line" and "start --json emits the exact object and key order" in `apps/madbridge/test/cli-gate.test.ts`. | `40-gate03-arch-test.log`, `41-gate04-bun-test-phase3a.log` and `43-gate06-bun-test.log`. |
| 13 | Production `start` is structurally unable to reach the runtime or harness. | The test "merge gate item 13: production start is structurally unable to reach the runtime or harness"; also the existing test "start.ts imports no runtime module" in `apps/madbridge/test/cli-gate.test.ts` and the tests of `test/phase3a/harness-separation.test.ts`. | `40-gate03-arch-test.log`, `41-gate04-bun-test-phase3a.log` and `43-gate06-bun-test.log`. |
| 14 | External-control placeholders return their stable typed errors and inspect no runtime state. | The test "merge gate item 14: external-control placeholders return their stable typed errors and inspect no runtime state"; also the existing tests of `apps/madbridge/test/cli-placeholders.test.ts`. | `40-gate03-arch-test.log`, `41-gate04-bun-test-phase3a.log` and `43-gate06-bun-test.log`. |
| 15 | No production or harness path creates `broker.sock`. | The test "merge gate item 15: no production or harness path creates broker.sock"; the negative control `bun test/phase3a/negative-control.ts`, plan section 8.3 step 6, in the final gates and in the run of B8; also the existing tests "launching every production entry point in bounded isolated processes creates no broker.sock" in `test/phase3a/architecture-phase3a.test.ts` and "running the fixture harness in an isolated process creates no broker.sock" in `test/phase3a/harness-separation.test.ts`. | `40-gate03-arch-test.log`, `41-gate04-bun-test-phase3a.log`, `43-gate06-bun-test.log` and `44-gate07-negative-control.log`. |
| 16 | No residual child, descendant, PTY host, descriptor, open session record, or valid fencing token remains after tests. | The test "merge gate item 16: no residual child, descendant, PTY host, descriptor, open session record, or valid token remains after tests", within the limit of `DEC-20261106-01` B4 item 5 stated in section 5; the existing test "no child, descendant, host, descriptor, open ledger session, or live fencing token remains after the adversarial suite" in `test/phase3a/adversarial/cleanup-residuals.test.ts`; the negative control in the final gates; and the process count of plan section 8.3 step 7 on the MacBook in the run of B8. | `40-gate03-arch-test.log`, `41-gate04-bun-test-phase3a.log`, `43-gate06-bun-test.log` and `44-gate07-negative-control.log`; the logs of the run of B8. |
| 17 | Founder Mike approves the exact candidate SHA and authorizes merge. | Decided by the final merge review of `DEC-20261106-01` B11 item 2. No verdict is given here. | That act. |

## 3. The six tests and their breaks

Step 1 appended to `test/phase3a/architecture-phase3a.test.ts` one `describe("Phase 3A merge gate")` block holding these six tests, with a comment and two import statements directly above it. Step 3 declared `PHASE_2_FLOOR = { tests: 714, expects: 2606, files: 35 } as const` inside the block. No existing line of the file changed. The tests reuse the file's existing helpers: `runBoundedChild`, `assertCliOutcome`, `runEntryPath`, `tuiPathFailures`, `listenUnix`, `CHILD_ENV`, `TUI_READY`, `START_JSON_BODY` and `LEGACY_SOCKET` of Task 34 (M14), `findModuleSpecifierImporters` and `resolveRelativeSpecifier` of Task 33 (M14), `enumerateProductionFiles` of Task 6, the `sweep` that `test/phase3a/negative-control.ts` exports (M14), and the residual census of `test/phase3a/runtime-harness.ts` (M22).

Each break was made only for its run, shown by `git diff`, run with its test alone through `-t` and the test's exact name, and restored with `git checkout`. After each restore, `git status --porcelain` listed only ` M test/phase3a/architecture-phase3a.test.ts`. The diffs are in `/home/michaeldaley/builds/m26-task59-r1-pr/breaks/`. Each failing run filtered out the other 54 tests of the file.

### Item 12: "merge gate item 12: production start still returns live_runtime_not_certified"

- Asserts: `runCli(["start"])` returns exit 78, empty stdout and the exact human line of spec section 4.2 on stderr; `runCli(["start", "--json"])` returns exit 78 and the exact JSON body, which parses to `ok` false, `error` `live_runtime_not_certified` and the exact hint; and the shipped entry point `apps/madbridge/src/cli.ts`, run in a bounded isolated process, exits 78 with the exact JSON body in JSON mode and the exact human line in text mode.
- Through: production `runCli` and `startCommand`, and the Task 34 bounded child runner.
- Break: `apps/madbridge/src/commands/start.ts` returns `"error":"live_runtime_ready"` in its JSON body. Diff `break-item12-start-error-code.diff`, SHA-256 `312c9115d9396ff160fe702dde056e5942b816914b26cea7c6468694251c57e2` (`16-break-item12-apply.log`).
- Failing run: `17-break-item12-run.log`, SHA-256 `5116dc328bf24778bba23fca0ce8a8f95c466657a47b12ba05eb7f7213976511`, exit 1. The JSON assertion received the body with `live_runtime_ready`:

```text
(fail) Phase 3A merge gate > merge gate item 12: production start still returns live_runtime_not_certified [0.48ms]

 0 pass
 54 filtered out
 1 fail
 2 expect() calls
Ran 1 test across 1 file. [99.00ms]
```

- Restored: `18-break-item12-restore.log`; `apps/madbridge/src/commands/start.ts` SHA-256 `768083737e6890a3335ada367577e191d0e330386f06a9ed1a63a19afc79fa49`.

### Item 13: "merge gate item 13: production start is structurally unable to reach the runtime or harness"

- Asserts: the CLI's only `case "start"` calls `startCommand` and nothing else, and `cli.ts` imports `./commands/start`; everything `start.ts` can reach, following every import and re-export, is exactly `start.ts` and `types.ts`, with no package or unresolved specifier, no import loaded at run time, no specifier naming a runtime package or the test tree, no dynamic `import()` or `require()`, and no host global such as `process` or `Bun`; no production file names the test-only harness tree, by the separation marker of M22, in an import, re-export or dynamic load; and the shipped entry point, given bypass-style flags and environment variables, still exits 78 with the exact JSON body and writes nothing into the directory it is pointed at.
- Through: the TypeScript AST of the production sources, `resolveRelativeSpecifier` (Task 33), `enumerateProductionFiles` (Task 6), the M22 marker `runtime-harness|phase3a`, and the Task 34 bounded child runner.
- Break: `apps/madbridge/src/commands/start.ts` dynamically imports `test/phase3a/runtime-harness` when `MADV_FIXTURE` is `1`. Diff `break-item13-start-dynamic-harness-import.diff`, SHA-256 `7a788ada5ec38c95d742c5bbe27c576020b3ab0d68d7a51f47ddd846aac742ec` (`19-break-item13-diff.log`).
- Failing run: `20-break-item13-run.log`, SHA-256 `b079dca19c2d77e2eb8b7f43393e8ffca7fc455d9112b60282dc73dc2df5c050`, exit 1. The reach assertion received the dynamic import and the host global `process`:

```text
(fail) Phase 3A merge gate > merge gate item 13: production start is structurally unable to reach the runtime or harness [11.38ms]

 0 pass
 54 filtered out
 1 fail
 3 expect() calls
Ran 1 test across 1 file. [110.00ms]
```

- Restored: `21-break-item13-restore.log`; `apps/madbridge/src/commands/start.ts` SHA-256 `768083737e6890a3335ada367577e191d0e330386f06a9ed1a63a19afc79fa49`.

### Item 14: "merge gate item 14: external-control placeholders return their stable typed errors and inspect no runtime state"

- Asserts: for each of `status`, `pause`, `resume` and `close`, `runCli` returns exit 69 with the exact human line of spec section 4.3 in text mode and the exact JSON body, with `error` `external_control_unavailable`, in JSON mode; the command's module imports only types from `./types`, loads nothing dynamically and names no host global, so it has no means to probe a socket, PID, file, ledger or variable; and, with a listening `broker.sock` in `MADV_RUNTIME_DIR`, where the Phase 2 `status` looked for one, the shipped entry point returns each exact placeholder with exit 69, no connection reaches the socket, and nothing is written beside it.
- Through: production `runCli` and the four placeholder commands, the TypeScript AST of their modules, and the Task 34 bounded child runner and `listenUnix`.
- Break: `apps/madbridge/src/commands/status.ts` imports `existsSync` from `node:fs` and, when `MADV_RUNTIME_DIR/broker.sock` exists, returns exit 0 and a connected body, as the Phase 2 `status` did. Diff `break-item14-status-socket-probe.diff`, SHA-256 `a39a7eca3038309f94ec46b58c35a12a3f3eca7a16451a908a232ed2f12d1aed` (`22-break-item14-diff.log`).
- Failing run: `23-break-item14-run.log`, SHA-256 `d5454f47084242a52dcbffef44a7c931e21c65acb21710165f2b187c656c1cae`, exit 1. The module assertion for `status` received the value import of `node:fs` and two uses of `process`:

```text
(fail) Phase 3A merge gate > merge gate item 14: external-control placeholders return their stable typed errors and inspect no runtime state [5.88ms]

 0 pass
 54 filtered out
 1 fail
 4 expect() calls
Ran 1 test across 1 file. [104.00ms]
```

- Restored: `24-break-item14-restore.log`; `apps/madbridge/src/commands/status.ts` SHA-256 `c6406d2edb9791b4e40ee7bbb76fe84a0b885babec9e29077bf135c7234b3f76`.

### Item 15: "merge gate item 15: no production or harness path creates broker.sock"

- Asserts: the dormant socket module has exactly one importer, `packages/broker/test/socket.test.ts`, so no production or harness file can reach it; both production entry points, `apps/madbridge/src/cli.ts start --json` and `apps/madbridge/src/tui/main.tsx`, run in bounded isolated processes, create no `broker.sock` at the legacy path or under `MADV_RUNTIME_DIR`; and a fixture session through the test-only harness leaves no `broker.sock` under its own fixture root, the legacy root `/tmp/madv-broker-runtime` or the worktree, while active and after close, and its fixture root is gone after close.
- Through: `findModuleSpecifierImporters` (Task 33), `runEntryPath` (Task 34), the negative-control `sweep` (Task 34), and the harness of M22.
- Break: `test/phase3a/runtime-harness.ts` writes a file named `broker.sock` into the session's storage root once the session starts. Diff `break-item15-harness-creates-broker-sock.diff`, SHA-256 `c41944d20d4d10126095313742c40bbccea3b47b577e226cff33046e09e5f2b4` (`25-break-item15-diff.log`).
- Failing run: `26-break-item15-run.log`, SHA-256 `14ec89fc20ef1504ce83f3a373cfd7e50c9d0b77848b37920a82921e2a5ebbbc`, exit 1. The sweep while the session was active found the file under the fixture's storage root:

```text
(fail) Phase 3A merge gate > merge gate item 15: no production or harness path creates broker.sock [432.49ms]

 0 pass
 54 filtered out
 1 fail
 9 expect() calls
Ran 1 test across 1 file. [529.00ms]
```

- Restored: `27-break-item15-restore.log`; `test/phase3a/runtime-harness.ts` SHA-256 `ba0d8663f4a974c637ba0d6209b734bd244a7d56be11fb9a6f92d7e4f9e1c6ab`. No fixture directory was left in the home directory.

### Item 16: "merge gate item 16: no residual child, descendant, PTY host, descriptor, open session record, or valid token remains after tests"

- Asserts: the test runs two fixture sessions of its own through the test-only harness, one whose governed child starts a descendant and one plain, sees each active with a valid token, and closes both. After waiting at most 1 s for descriptors to close, as the adversarial census does, the harness's residual report shows that it recorded exactly 2 more runs, 4 more hosts and 4 more children than before the test, and more descriptors, and that the test observed 10 processes: the hosts and children of both sessions, and the descendant and fixture adapter of the first. It then shows no live process, no live process group, no open descriptor, no open ledger, no open session and no valid token, none of the test's own processes alive, and both of the test's sessions durably closed with their tokens invalidated.
- Through: the residual census `fixtureResidualReport` and `fixtureProcessReport` of `test/phase3a/runtime-harness.ts` (M22). The limit of `DEC-20261106-01` B4 item 5 is stated in section 5.
- Break: the harness's `close` skips the Founder close command, so the session record stays open with its token valid. Diff `break-item16-harness-close-skips-founder-close.diff`, SHA-256 `d16df91f615027efb32f43fa1f5fb20faab8da8a50320cbed229a9d9d3f57b71` (`28-break-item16-diff.log`).
- Failing run: `29-break-item16-run.log`, SHA-256 `9b8eaf5f711ea948e646198ec0333d698b02e1be2686ca4f82a3019eb37ef8cf`, exit 1. The residual report showed 2 open sessions and 2 valid tokens, and neither session closed with its token invalidated, while no process remained:

```text
(fail) Phase 3A merge gate > merge gate item 16: no residual child, descendant, PTY host, descriptor, open session record, or valid token remains after tests [164.27ms]

 0 pass
 54 filtered out
 1 fail
 5 expect() calls
Ran 1 test across 1 file. [265.00ms]
```

- Restored: `30-break-item16-restore.log`; `test/phase3a/runtime-harness.ts` SHA-256 `ba0d8663f4a974c637ba0d6209b734bd244a7d56be11fb9a6f92d7e4f9e1c6ab`. No fixture directory was left in the home directory.

### Item 1: "merge gate item 1: the suite has not regressed below the Phase 2 floor"

- Asserts: for each certification report, the verbatim summary of its bare `bun test` is four lines, which match its command-table row for the same log and the unfiltered command `bun test` with exit 0; the counts are at least `PHASE_2_FLOOR`, 714 tests, 2606 `expect()` calls and 35 files; the failure count is 0; and no test neither passed nor failed.
- Through: the two certification reports, as `DEC-20261106-01` B4 item 4 reads the item.
- Break: `docs/verification/2026-08-12-phase-3a-host-certification-ubuntu.md` records 1901 pass and 1 fail, in both its command-table row and its verbatim summary. Diff `break-item1-ubuntu-report-records-a-failure.diff`, SHA-256 `0fa4eeb64a75f842eb968f269f4486ef9b90e4d29742065c1a36bdbbed9cc190` (`31-break-item1-diff.log`).
- Failing run: `32-break-item1-run.log`, SHA-256 `28123097010d74396b7478fd5f010ab24932dd7ecb4dd4c62d1b7dcf1591f930`, exit 1. The failure assertion received `fail` 1 for the Ubuntu PC report:

```text
(fail) Phase 3A merge gate > merge gate item 1: the suite has not regressed below the Phase 2 floor [0.89ms]

 0 pass
 54 filtered out
 1 fail
 10 expect() calls
Ran 1 test across 1 file. [101.00ms]
```

- Restored: `33-break-item1-restore.log`; the report's SHA-256 `b1fc956eb45aef28d4939e12841223c5c4610842c0729509f782863e8c4a1dcf`.

### Step 2: the item 1 test before `PHASE_2_FLOOR` was declared

`bun test test/phase3a/architecture-phase3a.test.ts -t "merge gate item 1: the suite has not regressed below the Phase 2 floor"`, run after Step 1 and before Step 3: `13-step2-item1-red.log`, SHA-256 `c84fe97f0262875f0db55b1e37fefd689d8cda6a696579f777ac0167c3a4e119`, exit 1. It failed because the floor was not declared. Its whole output:

```text
bun test v1.4.1-canary.1 (69cb78c90)

test/phase3a/architecture-phase3a.test.ts:
2600 |   }, 30_000);
2601 |
2602 |   test("merge gate item 1: the suite has not regressed below the Phase 2 floor", () => {
2603 |     for (const host of ["macbook", "ubuntu"] as const) {
2604 |       const counts = bareSuiteCounts(host);
2605 |       expect(counts.tests, `${host} report: tests`).toBeGreaterThanOrEqual(PHASE_2_FLOOR.tests);
                                                                                  ^
ReferenceError: PHASE_2_FLOOR is not defined
      at <anonymous> (/home/michaeldaley/builds/madventures-tui-m26-task59-r1/test/phase3a/architecture-phase3a.test.ts:2605:76)
(fail) Phase 3A merge gate > merge gate item 1: the suite has not regressed below the Phase 2 floor [0.63ms]

 0 pass
 54 filtered out
 1 fail
 1 expect() calls
Ran 1 test across 1 file. [105.00ms]
```

Lines of this quote that end in whitespace in the log are quoted with that whitespace removed.

## 4. Commands and results

Every command below ran once, in the foreground, through the wrapper `runlog.sh`, a copy of which is kept as `/home/michaeldaley/builds/m26-task59-r1-pr/scripts/runlog.sh`. It writes each log with the command, the output of `uptime` before it, the combined output through `tee`, and the exit status. The load column gives the three load averages of that `uptime` line. The command column omits the `export PATH=...;` prefix of section 1 that began every command starting Bun; each log records the full command. No test failed unexpectedly, and no failed run was rerun.

### 4.1 Identity and preconditions

| Log | Command | Load | Exit | SHA-256 |
| --- | --- | --- | --- | --- |
| `00-identity-git.log` | `pwd; git branch --show-current; git rev-parse HEAD; git config user.name; git config user.email` | 0.18, 0.06, 0.02 | 0 | `f1e9adcfe5eeb59c836ff056ff6c37705aee5d747003d9c4b4849bb336d581f3` |
| `01-runtime-check-initial.log` | `command -v bun; sha256sum "$(command -v bun)"; bun --version; bun -e 'process.stdout.write(Bun.revision)'; echo` | 0.18, 0.06, 0.02 | 0 | `89eb1df0b172ee127704a514e3b8072ba84e8c9826f199bf5856e9c6be847387` |
| `02-precond1-fetch.log` | `git fetch origin main; git rev-parse origin/main; git log --format="%H %P %s" -3 origin/main; echo "--- changed paths 9b377bb..origin/main:"; git diff --name-only 9b377bb365c6ba416c5b5fd9b504a6f9a194a74e origin/main; echo "--- merge-base:"; git merge-base --is-ancestor 9b377bb365c6ba416c5b5fd9b504a6f9a194a74e origin/main && echo "base is ancestor of origin/main"` | 0.15, 0.05, 0.01 | 0 | `b52ba164c6b711bc5fe5e4b6ad7acb32f9bf681fe5c1a62d044870aacbc22538` |
| `03-precond2-tree.log` | `git rev-parse HEAD; git branch --show-current; echo "--- status:"; git status --porcelain=v1 --untracked-files=all; echo "--- end status"; ls -la docs/verification/2026-08-12-phase-3a-merge-gate.md; sha256sum test/phase3a/architecture-phase3a.test.ts bun.lock` | 0.21, 0.07, 0.02 | 0 | `1aa3b32ab665c7d26d2a16eae1f1320eef7f11b82841a7c7326ccf43fb0b03fa` |
| `04-precond3-authority-sha.log` | `sha256sum docs/decisions/DEC-20261106-01-task59-merge-gate.md docs/decisions/DEC-20261102-01-phase-3a-carried-items.md docs/decisions/DEC-20261102-04-hardening-records-and-hardening-c.md docs/decisions/DEC-20261104-02-hardening-f-and-task58.md docs/decisions/DEC-20261104-02-addendum-3-certification-runs.md docs/decisions/DEC-20261104-02-addendum-4-pr225-reviews.md docs/decisions/DEC-20261102-02-hardening-builds.md docs/decisions/DEC-20261013-04-imac-out-of-scope.md docs/decisions/DEC-20261013-03-tests-4-6-ruling.md docs/decisions/DEC-20261023-01-standing-build-rules.md docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md AGENTS.md` | 0.21, 0.07, 0.02 | 0 | `9cc294909086fb7d7618fd4389067f0e3447ba3c5073d862607f5716131f84cb` |
| `05-precond4-uname.log` | `uname -sm` | 0.21, 0.07, 0.02 | 0 | `dd023f9fd364e84f51a49d7c88433f56480fd6f469a18661213508658ac60cb2` |

### 4.2 Baseline at the binding base

| Log | Command | Load | Exit | SHA-256 |
| --- | --- | --- | --- | --- |
| `06-baseline-runtime-check.log` | `command -v bun; sha256sum "$(command -v bun)"; bun --version; bun -e 'process.stdout.write(Bun.revision)'; echo` | 0.13, 0.07, 0.02 | 0 | `ea82102370b5fcd0e12331d1818d57425c319ea240b7f8c6cadfbd5ff7717c68` |
| `07-baseline-install.log` | `echo "--- mode before:"; stat -c "%a %n" packages/founder-act/src/main.ts; git ls-files -s packages/founder-act/src/main.ts; bun install --frozen-lockfile; st=$?; echo "bun install exit=$st"; echo "--- mode after:"; stat -c "%a %n" packages/founder-act/src/main.ts; echo "--- git status after:"; git status --porcelain=v1; echo "--- end git status"; sha256sum bun.lock; exit $st` | 0.13, 0.07, 0.02 | 0 | `31dd42d86d115978a03fb8d24c37d84ce5dde26e4645e79c5e5623dafc47eee1` |
| `08-baseline-mode-restore.log` | `echo "--- before:"; stat -c "%a %n" packages/founder-act/src/main.ts; git status --porcelain=v1; git checkout -- packages/founder-act/src/main.ts; echo "checkout exit=$?"; echo "--- after:"; stat -c "%a %n" packages/founder-act/src/main.ts; git status --porcelain=v1; echo "--- end status"; sha256sum bun.lock` | 0.19, 0.08, 0.02 | 0 | `e24dc6c26a3c14dde70c50651913aa67d699ec1bf3d5e8af30fad56bd47c41cf` |
| `09-baseline-tsc.log` | `bun x tsc --noEmit` | 0.17, 0.08, 0.02 | 0 | `caf30c33ba113145bf6854f5c7df606342d6a16c04d9ba8677926b50e66c6cdf` |
| `10-baseline-arch-test.log` | `bun test test/phase3a/architecture-phase3a.test.ts` | 0.17, 0.08, 0.02 | 0 | `b72413c6fb4cf5556d1ed3a4920721bdf1f98d2f45d4c14ae57bc90644e757a5` |
| `11-baseline-bun-test.log` | `bun test` | 0.17, 0.09, 0.03 | 0 | `48bcb0bb2379bfacb16612cb61753c8f19d9cc408872e66683e52d2a476ca70d` |

`bun install --frozen-lockfile` set the mode of `packages/founder-act/src/main.ts` from 664 to 777, and `git checkout` restored it to 664 (`07-baseline-install.log`, `08-baseline-mode-restore.log`); `bun.lock` kept SHA-256 `34224c0133c44d967c4a4da8b75bf11093c573c47e42bcaf502c6d6f61c3e7c0`. The typecheck exited 0. The architecture test file ran 49 tests with 0 failures and 518 `expect()` calls (`10-baseline-arch-test.log`). The baseline recorded no failure in any file. The summary lines of the baseline bare `bun test`, from `11-baseline-bun-test.log`:

```text
 1908 pass
 0 fail
 23810 expect() calls
Ran 1908 tests across 140 files. [128.43s]
```

### 4.3 The build

| Log | Command | Load | Exit | SHA-256 |
| --- | --- | --- | --- | --- |
| `12-step2-runtime-check.log` | `command -v bun; sha256sum "$(command -v bun)"; bun --version; bun -e 'process.stdout.write(Bun.revision)'; echo` | 0.11, 0.10, 0.08 | 0 | `29050096d4adf0549805c71845c310aace301e9f561010d596c68c649a6b6fb0` |
| `13-step2-item1-red.log` | `bun test test/phase3a/architecture-phase3a.test.ts -t "merge gate item 1: the suite has not regressed below the Phase 2 floor"` | 0.09, 0.10, 0.08 | 1 | `c84fe97f0262875f0db55b1e37fefd689d8cda6a696579f777ac0167c3a4e119` |
| `14-step3-tsc.log` | `bun x tsc --noEmit` | 0.06, 0.09, 0.08 | 0 | `ed996813be465e1b1f0606da6222f7fa5fdff2f251dc4a1f43c0774b24e60d08` |
| `15-step3-arch-test.log` | `bun test test/phase3a/architecture-phase3a.test.ts` | 0.06, 0.09, 0.08 | 0 | `d0de057e31c31d10946b581f1521a84783d47bc3b87dc1a8f982267803377404` |
| `16-break-item12-apply.log` | `sed -i '18s/"error":"live_runtime_not_certified"/"error":"live_runtime_ready"/' apps/madbridge/src/commands/start.ts && git diff -- apps/madbridge/src/commands/start.ts \| tee /home/michaeldaley/builds/m26-task59-r1-pr/breaks/break-item12-start-error-code.diff; sha256sum /home/michaeldaley/builds/m26-task59-r1-pr/breaks/break-item12-start-error-code.diff` | 0.16, 0.11, 0.09 | 0 | `b972be3b35306966871945db32caaf27c33e1cfd7e30d36f658915c2d18bbef4` |
| `17-break-item12-run.log` | `bun test test/phase3a/architecture-phase3a.test.ts -t "merge gate item 12: production start still returns live_runtime_not_certified"` | 0.16, 0.11, 0.09 | 1 | `5116dc328bf24778bba23fca0ce8a8f95c466657a47b12ba05eb7f7213976511` |
| `18-break-item12-restore.log` | `git checkout -- apps/madbridge/src/commands/start.ts; echo "checkout exit=$?"; sha256sum apps/madbridge/src/commands/start.ts; git status --porcelain` | 0.16, 0.11, 0.09 | 0 | `08c260df89575e85a3048e5a8c713261484d8f3a5d1d6ece57790aca211a6772` |
| `19-break-item13-diff.log` | `git diff -- apps/madbridge/src/commands/start.ts \| tee /home/michaeldaley/builds/m26-task59-r1-pr/breaks/break-item13-start-dynamic-harness-import.diff; sha256sum /home/michaeldaley/builds/m26-task59-r1-pr/breaks/break-item13-start-dynamic-harness-import.diff` | 0.18, 0.12, 0.09 | 0 | `9cb5f5f7355da9f86eb84d7ea7fb482930007139a681bb1b83a3fc408b8575ce` |
| `20-break-item13-run.log` | `bun test test/phase3a/architecture-phase3a.test.ts -t "merge gate item 13: production start is structurally unable to reach the runtime or harness"` | 0.18, 0.12, 0.09 | 1 | `b079dca19c2d77e2eb8b7f43393e8ffca7fc455d9112b60282dc73dc2df5c050` |
| `21-break-item13-restore.log` | `git checkout -- apps/madbridge/src/commands/start.ts; echo "checkout exit=$?"; sha256sum apps/madbridge/src/commands/start.ts; git status --porcelain` | 0.18, 0.12, 0.09 | 0 | `3d9b046d555df375d04fa2a8f72e5a00596339d854a91dc756a301fc74682ffc` |
| `22-break-item14-diff.log` | `git diff -- apps/madbridge/src/commands/status.ts \| tee /home/michaeldaley/builds/m26-task59-r1-pr/breaks/break-item14-status-socket-probe.diff; sha256sum /home/michaeldaley/builds/m26-task59-r1-pr/breaks/break-item14-status-socket-probe.diff` | 0.13, 0.11, 0.09 | 0 | `5d5ff92c4252e3e2c2280daeaaf8dd716ecda41c2344d888d5409696b1b5f80f` |
| `23-break-item14-run.log` | `bun test test/phase3a/architecture-phase3a.test.ts -t "merge gate item 14: external-control placeholders return their stable typed errors and inspect no runtime state"` | 0.13, 0.11, 0.09 | 1 | `d5454f47084242a52dcbffef44a7c931e21c65acb21710165f2b187c656c1cae` |
| `24-break-item14-restore.log` | `git checkout -- apps/madbridge/src/commands/status.ts; echo "checkout exit=$?"; sha256sum apps/madbridge/src/commands/status.ts; git status --porcelain` | 0.13, 0.11, 0.09 | 0 | `04c4d3c11a5c17d367ae9cbc4a1a479d7713023a7d1c76d78af27e3bdae96ab0` |
| `25-break-item15-diff.log` | `git diff -- test/phase3a/runtime-harness.ts \| tee /home/michaeldaley/builds/m26-task59-r1-pr/breaks/break-item15-harness-creates-broker-sock.diff; sha256sum /home/michaeldaley/builds/m26-task59-r1-pr/breaks/break-item15-harness-creates-broker-sock.diff` | 0.17, 0.12, 0.09 | 0 | `e13f5379396f14b3c70fa6746a98e0b8ef5e727fcd2e8d26c9350511868931a3` |
| `26-break-item15-run.log` | `bun test test/phase3a/architecture-phase3a.test.ts -t "merge gate item 15: no production or harness path creates broker.sock"` | 0.17, 0.12, 0.09 | 1 | `14ec89fc20ef1504ce83f3a373cfd7e50c9d0b77848b37920a82921e2a5ebbbc` |
| `27-break-item15-restore.log` | `git checkout -- test/phase3a/runtime-harness.ts; echo "checkout exit=$?"; sha256sum test/phase3a/runtime-harness.ts; git status --porcelain; ls -d "$(getent passwd "$(id -u)" \| cut -d: -f6)"/.madbridge-task48-* 2>/dev/null \| wc -l` | 0.17, 0.12, 0.09 | 0 | `1829abbbd9169c009802bb555f7e4520bddb535efd1f1cb6ad846a6fc5c152ff` |
| `28-break-item16-diff.log` | `git diff -- test/phase3a/runtime-harness.ts \| tee /home/michaeldaley/builds/m26-task59-r1-pr/breaks/break-item16-harness-close-skips-founder-close.diff; sha256sum /home/michaeldaley/builds/m26-task59-r1-pr/breaks/break-item16-harness-close-skips-founder-close.diff` | 0.13, 0.12, 0.09 | 0 | `2c3b0bf13b82c50dbde1b703e3ce5dacf9f6bcc3d0dde3964f0459f9719c29ac` |
| `29-break-item16-run.log` | `bun test test/phase3a/architecture-phase3a.test.ts -t "merge gate item 16: no residual child, descendant, PTY host, descriptor, open session record, or valid token remains after tests"` | 0.13, 0.12, 0.09 | 1 | `9b8eaf5f711ea948e646198ec0333d698b02e1be2686ca4f82a3019eb37ef8cf` |
| `30-break-item16-restore.log` | `git checkout -- test/phase3a/runtime-harness.ts; echo "checkout exit=$?"; sha256sum test/phase3a/runtime-harness.ts; git status --porcelain; ls -d "$(getent passwd "$(id -u)" \| cut -d: -f6)"/.madbridge-task48-* 2>/dev/null \| wc -l` | 0.13, 0.12, 0.09 | 0 | `09363ea655b77cd0bc9e18bbfc24e7d6af5c029943f3a56baf533831041ecd65` |
| `31-break-item1-diff.log` | `git diff -- docs/verification/2026-08-12-phase-3a-host-certification-ubuntu.md \| tee /home/michaeldaley/builds/m26-task59-r1-pr/breaks/break-item1-ubuntu-report-records-a-failure.diff; sha256sum /home/michaeldaley/builds/m26-task59-r1-pr/breaks/break-item1-ubuntu-report-records-a-failure.diff` | 0.10, 0.11, 0.09 | 0 | `b1e70ec438c789dce71e099f4c9cab8f2ca932e677208cdda9dda381126c6c87` |
| `32-break-item1-run.log` | `bun test test/phase3a/architecture-phase3a.test.ts -t "merge gate item 1: the suite has not regressed below the Phase 2 floor"` | 0.10, 0.11, 0.09 | 1 | `28123097010d74396b7478fd5f010ab24932dd7ecb4dd4c62d1b7dcf1591f930` |
| `33-break-item1-restore.log` | `git checkout -- docs/verification/2026-08-12-phase-3a-host-certification-ubuntu.md; echo "checkout exit=$?"; sha256sum docs/verification/2026-08-12-phase-3a-host-certification-ubuntu.md; git status --porcelain` | 0.10, 0.11, 0.09 | 0 | `976861425a655c064d16ca7a6599eb2c1c95a3f45c7f181c7d927a926dc2ed4b` |
| `34-step4-arch-test.log` | `bun test test/phase3a/architecture-phase3a.test.ts` | 0.11, 0.10, 0.09 | 0 | `5d2b8e04a73a47bff5843eaa09a73a10ee3ff875a861f5d9b3e0b7e5b9af157c` |
| `35-step6-paths-not-named-in-plan-section3.log` | `python3 -I /tmp/claude-1000/-home-michaeldaley-builds-madventures-tui-m26-task59-r1/192b229f-de99-48d1-aeaf-f1aedf752a9f/scratchpad/section3_unnamed.py /home/michaeldaley/builds/madventures-tui-m26-task59-r1 docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md aa16032c56fdf6c7105e99b1765ed9365d605bf4` | 0.17, 0.14, 0.10 | 0 | `69ad76c10672f648913d8723cd50dbac3b3a5d4384d27adb3d0e76a4fd90b43c` |
| `36-scripts-sha.log` | `sha256sum /home/michaeldaley/builds/m26-task59-r1-pr/scripts/runlog.sh /home/michaeldaley/builds/m26-task59-r1-pr/scripts/section3_unnamed.py /home/michaeldaley/builds/m26-task59-r1-pr/scripts/logtable.py /home/michaeldaley/builds/m26-task59-r1-pr/scripts/build_evidence.py /home/michaeldaley/builds/m26-task59-r1-pr/scripts/evidence-template.md; cmp /tmp/claude-1000/-home-michaeldaley-builds-madventures-tui-m26-task59-r1/192b229f-de99-48d1-aeaf-f1aedf752a9f/scratchpad/runlog.sh /home/michaeldaley/builds/m26-task59-r1-pr/scripts/runlog.sh && echo runlog-copy-identical` | 0.00, 0.05, 0.07 | 0 | `3961603a6928a023534b7a6680d32829cfa8e77cf5c9a1d1328b5aa76546860f` |
| `37-stage-paths.log` | `git add test/phase3a/architecture-phase3a.test.ts docs/verification/2026-08-12-phase-3a-merge-gate.md; echo "git add exit=$?"; git status --porcelain=v1 --untracked-files=all` | 0.00, 0.05, 0.07 | 0 | `1cf36250bb070c8c4e8e86ed840a4bee588d9a9c765828358396c5e378fab493` |

The exit status 1 of each break run and of Step 2 is the intended failure. `14-step3-tsc.log` and `15-step3-arch-test.log` are the typecheck and the test file after Step 3, before the breaks. Step 4, `34-step4-arch-test.log`, is the architecture test file after the breaks were restored, against the baseline of `10-baseline-arch-test.log`:

```text
 55 pass
 0 fail
 583 expect() calls
Ran 55 tests across 1 file. [8.40s]
```

That is 6 more tests and 65 more `expect()` calls than the baseline's 49 and 518, with 0 failures. `37-stage-paths.log` staged the two paths with `git add`, so that the final gates' `git diff --check` and `git diff --name-only` read the new evidence file.

### 4.4 The final gates

| Log | Command | Load | Exit | SHA-256 |
| --- | --- | --- | --- | --- |
| `38-gate01-runtime-check.log` | `command -v bun; sha256sum "$(command -v bun)"; bun --version; bun -e 'process.stdout.write(Bun.revision)'; echo` | 0.00, 0.04, 0.07 | 0 | `5f6c3e3c6ffc2f681c7e76ddf3c8bd47db0deb8a6b54a5a17c9b3be6c2da9c49` |
| `39-gate02-tsc.log` | `bun x tsc --noEmit` | 0.00, 0.04, 0.07 | 0 | `bd7a18f4feffc94511250919d0e9046bdced3ca27e2be4951f30cba16e046e15` |
| `40-gate03-arch-test.log` | `bun test test/phase3a/architecture-phase3a.test.ts` | 0.24, 0.09, 0.09 | 0 | `5c24209862740b0abf6479aea7776700a9fbaa45362ae65c62edd435765c5c0e` |
| `41-gate04-bun-test-phase3a.log` | `bun test test/phase3a` | 0.22, 0.09, 0.09 | 0 | `073d4e8f35f2ca6957cd699e048bc944185a2560b9e71a4fa443896b20a748ec` |
| `42-gate05-runtime-check.log` | `command -v bun; sha256sum "$(command -v bun)"; bun --version; bun -e 'process.stdout.write(Bun.revision)'; echo` | 0.15, 0.09, 0.09 | 0 | `151dd9a543960d24608e80de9b5c14f01284e5b113c0a0fa0cb7e58c17bdc493` |
| `43-gate06-bun-test.log` | `bun test` | 0.15, 0.09, 0.09 | 0 | `8d2fc2e5bd7a84c641ee5cda60f37d8e3343afe3b1c2b0e92f0b4fb5d6e7f296` |
| `44-gate07-negative-control.log` | `bun test/phase3a/negative-control.ts` | 0.07, 0.11, 0.09 | 0 | `cec23b1f637f25b513e47c231449d66e1dbd64492966036ce5b220ec1941ed89` |
| `45-gate08-git-diff-check.log` | `git diff --check aa16032c56fdf6c7105e99b1765ed9365d605bf4 > /home/michaeldaley/builds/m26-task59-r1-pr/logs/45-gate08-git-diff-check.out; st=$?; cat /home/michaeldaley/builds/m26-task59-r1-pr/logs/45-gate08-git-diff-check.out; echo "output lines: $(wc -l < /home/michaeldaley/builds/m26-task59-r1-pr/logs/45-gate08-git-diff-check.out)"; echo "output bytes: $(wc -c < /home/michaeldaley/builds/m26-task59-r1-pr/logs/45-gate08-git-diff-check.out)"; echo "output sha256: $(sha256sum < /home/michaeldaley/builds/m26-task59-r1-pr/logs/45-gate08-git-diff-check.out \| cut -d' ' -f1)"; exit $st` | 0.06, 0.10, 0.09 | 2 | `0fbc5b925940692ff08f2d4c83e55323cd0f3730aaffe793e8773fb92f836947` |
| `46-gate09-git-diff-name-only.log` | `git diff --name-only 9b377bb365c6ba416c5b5fd9b504a6f9a194a74e` | 0.06, 0.10, 0.09 | 0 | `3cc61d5ae1d693f73d2493adcf86c70a7c2beaa121d4056f2302a846cdc4e7f6` |
| `47-gate10-git-status-sb.log` | `git status -sb` | 0.06, 0.10, 0.09 | 0 | `2d080d500511ff555e50207e92f63ff24bfdf117bb34b4d30773e0537e20ba42` |
| `48-gate11-git-ls-files-others.log` | `git ls-files --others --exclude-standard` | 0.06, 0.10, 0.09 | 0 | `d2666e1f6d03dc0482efc789f7833d6fc7b42c84f2198a5a3268cb3a2ef8bbd7` |

The architecture test file, from `40-gate03-arch-test.log`:

```text
 55 pass
 0 fail
 583 expect() calls
Ran 55 tests across 1 file. [8.34s]
```

`bun test test/phase3a`, from `41-gate04-bun-test-phase3a.log`:

```text
 168 pass
 0 fail
 8039 expect() calls
Ran 168 tests across 18 files. [32.81s]
```

The summary lines of the final bare `bun test`, from `43-gate06-bun-test.log`:

```text
 1914 pass
 0 fail
 23875 expect() calls
Ran 1914 tests across 140 files. [128.99s]
```

The negative control, plan section 8.3 step 6, from `44-gate07-negative-control.log`:

```text
broker_sock_matches[storage-root]=0
broker_sock_matches[legacy-quarantine]=0
broker_sock_matches[repo-worktree]=0
negative-control: PASS (no broker.sock under any governed root)
```

`git diff --check aa16032c56fdf6c7105e99b1765ed9365d605bf4` exited 2. Its output, saved as `45-gate08-git-diff-check.out`, is 33 lines and 2,138 bytes, with SHA-256 `fe33892c34b87319d59b7f0562373aa2d188cc2a5565a0e0e2daed19f72d6438`. A5 item 1 of `DEC-20261106-01` gives exit 2, 33 lines and SHA-256 `fe33892c34b87319d59b7f0562373aa2d188cc2a5565a0e0e2daed19f72d6438`. Its lines are not quoted here; section 5 states the limitation.

`git diff --name-only 9b377bb365c6ba416c5b5fd9b504a6f9a194a74e`, from `46-gate09-git-diff-name-only.log`:

```text
docs/verification/2026-08-12-phase-3a-merge-gate.md
test/phase3a/architecture-phase3a.test.ts
```

`git status -sb`, from `47-gate10-git-status-sb.log`:

```text
## build/m26-task59-r1
A  docs/verification/2026-08-12-phase-3a-merge-gate.md
M  test/phase3a/architecture-phase3a.test.ts
```

`git ls-files --others --exclude-standard` printed nothing (`48-gate11-git-ls-files-others.log`).

## 5. Stated limitations

`DEC-20261102-01` B2:

> B2. **Phase 3B, not Phase 3A.** Items 2, 11, 14 and 15 concern the production path from a live PTY host and a live surface into the broker, which spec section 4.2 keeps closed in Phase 3A behind the `start` gate and which Phase 3B connects. They are not Phase 3A work. The acknowledgement deadline of spec section 9.8 applies to `pty_input` and `pty_resize` once production routes them, as part of items 2 and 11. Each is a stated limitation of Phase 3A, recorded in the Task 59 evidence and in the final merge review, and carried to the first Phase 3B act.

The items it names, from `DEC-20261102-01` A3:

> 2. Production does not route `pty_input` or `pty_resize` to the PTY host; Task 49 does so only through the harness.

> 11. Production routing of `pty_input` and `pty_resize`, the same as item 2.

> 14. No end-to-end malformed-frame scenario through a production receive path; none exists in Phase 3A.

> 15. The authentication-expiry and attestation scenarios are interrupted by the harness, not by a production detector; none exists in Phase 3A.

`DEC-20261102-01` B3 item 1:

> 1. Item 6, all three parts, stays a stated limitation, recorded in the Task 59 evidence.

The item it names, from `DEC-20261102-01` A3:

> 6. Stated limitations: the PTY host environment capture is the environment the build hands the host, not one it reports; no session path exercises the redaction of a secret-marked allowlisted value, because no allowlist marks one; the Task 49 fixture detects a resize through Bun's undocumented `_refreshSize`.

`DEC-20261102-01` B3 item 4:

> 4. Item 20 affects only the test-only output path. It stays a stated limitation of that path, recorded in the Task 59 evidence.

The item it names, from `DEC-20261102-01` A3:

> 20. O1: on the test-only output path, `outputSeqs.set` runs before the byte copy, so a failed copy leaves the last accepted `outputSeq` advanced.

`DEC-20261102-04` B2 item 1:

> 1. Pull request 211, comment 4445549038: carried to the first Phase 3B act, with the adapter launch work, and stated as a limitation of Phase 3A in the Task 59 evidence. What a governed child reads from its own working directory is not the environment the host gives it, which Hardening A's item 4 test proves exact.

Addendum 3 B5 to `DEC-20261104-02`:

> B5. **The limitation.** The 17 errors of A1 are a stated limitation, recorded in each report and in the Task 59 evidence. The blank line at the end of `apps/madv-agent/src/proxy.ts` is carried to the first Phase 3B act. The documents stay as signed.

The limit of `DEC-20261106-01` B4 item 5, which says "It does not rely on the order in which Bun runs files, and it does not see processes that other files start. The evidence states that limit.": the test for item 16 sees the processes, process groups, descriptors, ledgers, sessions and tokens that the harness of `test/phase3a/runtime-harness.ts` recorded in its own process. It does not see a process that another test file started outside that harness, and it does not run after the whole suite. The negative control of plan section 8.3 step 6 ran after the whole run in the final gates, and runs on the MacBook in the run of B8, where the process count of plan section 8.3 step 7 also runs.

The per-test output of this session: for each `bun test` run, Bun printed the files that wrote output, each failing test with its `(fail)` line and failure, and the summary lines. It printed no `(pass)` line for a passing test. The logs therefore show which tests failed and how many passed, not the name of each test that passed. This was recorded and not changed.

## 6. Carried to the first Phase 3B act

`DEC-20261102-01` B2:

> B2. **Phase 3B, not Phase 3A.** Items 2, 11, 14 and 15 concern the production path from a live PTY host and a live surface into the broker, which spec section 4.2 keeps closed in Phase 3A behind the `start` gate and which Phase 3B connects. They are not Phase 3A work. The acknowledgement deadline of spec section 9.8 applies to `pty_input` and `pty_resize` once production routes them, as part of items 2 and 11. Each is a stated limitation of Phase 3A, recorded in the Task 59 evidence and in the final merge review, and carried to the first Phase 3B act.

`DEC-20261102-01` B3 item 2:

> 2. Item 16 stays as it is in Phase 3A. Declaring the dependency changes a manifest and `bun.lock`, and the import is permitted under plan Task 55 Step 6. It is carried to the first Phase 3B act.

The item it names, from `DEC-20261102-01` A3:

> 16. `export-evidence.ts` imports `packages/supervisor/src` by a relative path without a declared package dependency.

`DEC-20261102-04` B2 item 1:

> 1. Pull request 211, comment 4445549038: carried to the first Phase 3B act, with the adapter launch work, and stated as a limitation of Phase 3A in the Task 59 evidence. What a governed child reads from its own working directory is not the environment the host gives it, which Hardening A's item 4 test proves exact.

Addendum 3 B5 to `DEC-20261104-02`:

> B5. **The limitation.** The 17 errors of A1 are a stated limitation, recorded in each report and in the Task 59 evidence. The blank line at the end of `apps/madv-agent/src/proxy.ts` is carried to the first Phase 3B act. The documents stay as signed.

Addendum 4 B3 to `DEC-20261104-02`:

> B3. **Carried.** Tightening the six tests is carried to the first Phase 3B act, as Addendum 3 B5 carries the blank line at the end of `apps/madv-agent/src/proxy.ts`: an operating-system version in the operating-system line; a failure count of zero and a complete-suite floor in the suite-count test; `grace_ms`, `termination_started_ms` and `exited_ms` in the grace row; and the same changed-file list in both reports at one candidate commit. No change is made under `DEC-20261104-02` B6 for it.

## 7. Paths not named in plan section 3

Step 6 has two parts under `DEC-20261106-01` B4 item 8.

The first part is checked: `git diff --name-only 9b377bb365c6ba416c5b5fd9b504a6f9a194a74e` in the final gates, quoted in section 4.4, lists the paths of the Task 59 commit against its base (`46-gate09-git-diff-name-only.log`).

The second part is listed, not checked. `35-step6-paths-not-named-in-plan-section3.log`, SHA-256 `69ad76c10672f648913d8723cd50dbac3b3a5d4384d27adb3d0e76a4fd90b43c`, holds the full list and the method. It read plan section 3, lines 168 to 292 of `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md`, took every backticked path or pattern in it, expanded each `{a,b}`, read `**` as any characters, `*` as any characters but `/`, and `<name>` as one or more characters but `/`, and counted a pattern as naming each path it matches. It read six bare filenames against the full path written beside them, and its log prints each reading: `export-evidence.ts` as `apps/madbridge/src/commands/export-evidence.ts`; `socket.ts`, `mcp-server.ts` and `pty-manager.ts` as the files of those names under `packages/broker/src/`; and both `mcp-config.ts` files as those under `packages/adapter-claude-code/src/` and `packages/adapter-antigravity/src/`. Of the 579 paths of `git diff --name-only aa16032c56fdf6c7105e99b1765ed9365d605bf4 HEAD` at the binding base, section 3 names 296 and does not name 283.

```text
by top-level directory:
  (repository root): 6
  .agents: 20
  .github: 9
  apps: 98
  docs: 21
  packages: 113
  test: 14
  testdata: 2
```

The 283 paths, by top-level directory:

(repository root), 6 paths:

- `AGENTS.md`
- `CONTRIBUTING.md`
- `HANDOFF-builder-to-operator-claim-boundary-20260906.md`
- `HANDOFF-projector-room-status-v0-20260915.md`
- `SECURITY.md`
- `greptile.json`

.agents, 20 paths:

- `.agents/skills/build-gate/.gitignore`
- `.agents/skills/build-gate/SKILL.md`
- `.agents/skills/build-gate/assets/review-record.example.json`
- `.agents/skills/build-gate/profiles/madventures-tui.json`
- `.agents/skills/build-gate/scripts/assert_origin.py`
- `.agents/skills/build-gate/scripts/build_gate/__init__.py`
- `.agents/skills/build-gate/scripts/build_gate/engine.py`
- `.agents/skills/build-gate/scripts/build_gate/freeze.py`
- `.agents/skills/build-gate/scripts/build_gate/types.py`
- `.agents/skills/build-gate/scripts/build_gate/validate.py`
- `.agents/skills/build-gate/scripts/freeze_target.py`
- `.agents/skills/build-gate/scripts/run_gates.py`
- `.agents/skills/build-gate/scripts/validate_record.py`
- `.agents/skills/build-gate/tests/test_cli.py`
- `.agents/skills/build-gate/tests/test_engine.py`
- `.agents/skills/build-gate/tests/test_freeze.py`
- `.agents/skills/build-gate/tests/test_run_gates.py`
- `.agents/skills/build-gate/tests/test_types.py`
- `.agents/skills/build-gate/tests/test_validate.py`
- `.agents/skills/build-gate/validation/pressure-scenarios.md`

.github, 9 paths:

- `.github/CODEOWNERS`
- `.github/actions/setup-qualified-bun/action.yml`
- `.github/scripts/README.md`
- `.github/scripts/attribution-shape-check.sh`
- `.github/workflows/advisory-reviewers.yml`
- `.github/workflows/attribution-shape.yml`
- `.github/workflows/code-review.yml`
- `.github/workflows/tui-chaos.yml`
- `.github/workflows/verify.yml`

apps, 98 paths:

- `apps/madbridge/src/commands/follow.ts`
- `apps/madbridge/src/commands/join.ts`
- `apps/madbridge/src/commands/leave.ts`
- `apps/madbridge/src/commands/room.test.ts`
- `apps/madbridge/src/commands/room.ts`
- `apps/madbridge/src/commands/rooms.ts`
- `apps/madbridge/src/fixture/harness.ts`
- `apps/madbridge/test/doctor.test.ts`
- `apps/madbridge/test/room-create-ack.test.ts`
- `apps/madbridge/test/room-projection.test.tsx`
- `apps/madbridge/test/room-verbs.test.ts`
- `apps/madbridge/test/tui-seats.test.tsx`
- `apps/madv-agent/bin/madv`
- `apps/madv-agent/package.json`
- `apps/madv-agent/src/approval-keys.ts`
- `apps/madv-agent/src/approval.tsx`
- `apps/madv-agent/src/bootstrap.ts`
- `apps/madv-agent/src/cli.ts`
- `apps/madv-agent/src/events.ts`
- `apps/madv-agent/src/lock.ts`
- `apps/madv-agent/src/model-client.ts`
- `apps/madv-agent/src/policy.ts`
- `apps/madv-agent/src/proxy-error.ts`
- `apps/madv-agent/src/proxy.ts`
- `apps/madv-agent/src/scrub.ts`
- `apps/madv-agent/src/session.ts`
- `apps/madv-agent/src/tools/index.ts`
- `apps/madv-agent/src/tui/App.tsx`
- `apps/madv-agent/src/tui/components/ApprovalDialog.tsx`
- `apps/madv-agent/src/tui/components/PromptInput.tsx`
- `apps/madv-agent/src/tui/components/StatusBar.tsx`
- `apps/madv-agent/src/tui/components/Transcript.tsx`
- `apps/madv-agent/src/tui/main.tsx`
- `apps/madv-agent/src/turn.ts`
- `apps/madv-agent/test/approval-keys.test.ts`
- `apps/madv-agent/test/chain-verifiability.test.ts`
- `apps/madv-agent/test/cli.test.ts`
- `apps/madv-agent/test/events.test.ts`
- `apps/madv-agent/test/launcher-and-limits.test.ts`
- `apps/madv-agent/test/lock-atomicity.test.ts`
- `apps/madv-agent/test/lock.test.ts`
- `apps/madv-agent/test/model-client.test.ts`
- `apps/madv-agent/test/policy-boundary.test.ts`
- `apps/madv-agent/test/scrub.test.ts`
- `apps/madv-agent/test/session-containment.test.ts`
- `apps/madv-agent/test/shell-timeout-forwarding.test.ts`
- `apps/madv-agent/test/tools-approval-replay.test.ts`
- `apps/madv-agent/test/tools-bypass-regressions.test.ts`
- `apps/madv-agent/test/tools-shell-env.test.ts`
- `apps/madv-agent/test/tui-approval.test.ts`
- `apps/madv-agent/test/turn-loop-guards.test.ts`
- `apps/madv-agent/tsconfig.json`
- `apps/projector-mc/AGENTS.md`
- `apps/projector-mc/README.md`
- `apps/projector-mc/fixtures/demo.json`
- `apps/projector-mc/fixtures/generate-demo.ts`
- `apps/projector-mc/fixtures/room-status-fixture.json`
- `apps/projector-mc/fixtures/room-status-vocabulary.pin.json`
- `apps/projector-mc/index.html`
- `apps/projector-mc/package.json`
- `apps/projector-mc/src/App.tsx`
- `apps/projector-mc/src/components/EvidenceDrawer.tsx`
- `apps/projector-mc/src/components/HelpOverlay.tsx`
- `apps/projector-mc/src/components/HeroVerdict.tsx`
- `apps/projector-mc/src/components/RoomRail.tsx`
- `apps/projector-mc/src/components/RoomStatusPanel.tsx`
- `apps/projector-mc/src/components/StatusBar.tsx`
- `apps/projector-mc/src/lib/fixture.ts`
- `apps/projector-mc/src/lib/intent.ts`
- `apps/projector-mc/src/lib/render-model.ts`
- `apps/projector-mc/src/lib/room-status-fixture.ts`
- `apps/projector-mc/src/lib/room-status.ts`
- `apps/projector-mc/src/main.tsx`
- `apps/projector-mc/src/tokens.css`
- `apps/projector-mc/test/render-model.test.ts`
- `apps/projector-mc/test/room-status.test.ts`
- `apps/projector-mc/tsconfig.json`
- `apps/projector-mc/vite.config.ts`
- `apps/seal-studio/AGENTS.md`
- `apps/seal-studio/HANDOFF.md`
- `apps/seal-studio/README.md`
- `apps/seal-studio/index.html`
- `apps/seal-studio/package.json`
- `apps/seal-studio/src/App.tsx`
- `apps/seal-studio/src/components/SealBits.tsx`
- `apps/seal-studio/src/lib/act-draft.ts`
- `apps/seal-studio/src/lib/canonical.ts`
- `apps/seal-studio/src/lib/seal-bridge.ts`
- `apps/seal-studio/src/lib/seal-client.ts`
- `apps/seal-studio/src/main.tsx`
- `apps/seal-studio/src/tokens.css`
- `apps/seal-studio/test/act-draft.test.ts`
- `apps/seal-studio/test/canonical.test.ts`
- `apps/seal-studio/test/seal-bridge.test.ts`
- `apps/seal-studio/test/seal-client.test.ts`
- `apps/seal-studio/test/ui.test.tsx`
- `apps/seal-studio/tsconfig.json`
- `apps/seal-studio/vite.config.ts`

docs, 21 paths:

- `docs/design/madv-agent-v0-surface.md`
- `docs/madv-agent/n1-credential-path.md`
- `docs/madv-agent/n3-tools.md`
- `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md`
- `docs/superpowers/plans/2026-09-19-phase-3b-live-tui-integration.md`
- `docs/verification/2026-08-22-m17-step8-dualhost-imac.md`
- `docs/verification/2026-08-22-m17-step8-dualhost-macbook.md`
- `docs/verification/2026-08-28-wf17-ground-truth-security-controls.md`
- `docs/verification/2026-09-04-room-runtime-phase0.md`
- `docs/verification/2026-09-06-m5-task12-final-checkpoint.md`
- `docs/verification/2026-09-11-m6-final-checkpoint.md`
- `docs/verification/2026-10-12-tests-4-6-check-macbook.md`
- `docs/verification/2026-10-12-tests-4-6-investigation-ubuntu.md`
- `docs/verification/2026-10-13-tests-4-6-root-cause-ubuntu.md`
- `docs/verification/hardening-a-build-log.md`
- `docs/verification/hardening-b-build-log.md`
- `docs/verification/hardening-c-build-log.md`
- `docs/verification/hardening-d-build-log.md`
- `docs/verification/hardening-e-build-log.md`
- `docs/verification/hardening-f-build-log.md`
- `docs/verification/m23-m24-build-log.md`

packages, 113 paths:

- `packages/adapter-antigravity/test/integration.test.ts`
- `packages/adapter-claude-code/test/integration.test.ts`
- `packages/broker/test/acknowledgement-deadline.test.ts`
- `packages/broker/test/pty-host-dotenv.test.ts`
- `packages/build-memory/AGENTS.md`
- `packages/build-memory/README.md`
- `packages/build-memory/package.json`
- `packages/build-memory/src/cli.ts`
- `packages/build-memory/src/index.ts`
- `packages/build-memory/src/node-store.ts`
- `packages/build-memory/test/build-memory.test.ts`
- `packages/claim-boundary/README.md`
- `packages/claim-boundary/package.json`
- `packages/claim-boundary/src/index.ts`
- `packages/claim-boundary/test/claim-boundary.test.ts`
- `packages/founder-act/README.md`
- `packages/founder-act/fixtures/572f5ee1a11eae6bdba5398ce695bd72316071ce50acc09d8bbcc386bed24a0c.json`
- `packages/founder-act/fixtures/d1f23f457335506846581ca037397006d7f5269788cb0364178902487b7b449e.json`
- `packages/founder-act/kind-name-allowlist.json`
- `packages/founder-act/package.json`
- `packages/founder-act/src/act.ts`
- `packages/founder-act/src/canonical.ts`
- `packages/founder-act/src/cli.ts`
- `packages/founder-act/src/index.ts`
- `packages/founder-act/src/main.ts`
- `packages/founder-act/src/show.ts`
- `packages/founder-act/src/verify.ts`
- `packages/founder-act/test/founder-act.test.ts`
- `packages/honesty-compiler/README.md`
- `packages/honesty-compiler/fixtures/argus/packet-honest.json`
- `packages/honesty-compiler/fixtures/build-memory/fixture-store.json`
- `packages/honesty-compiler/fixtures/claims/honest-fixture-suite.json`
- `packages/honesty-compiler/fixtures/claims/honest-spec-only.json`
- `packages/honesty-compiler/fixtures/claims/honest-verify.json`
- `packages/honesty-compiler/fixtures/claims/lying-bad-argus-sha.json`
- `packages/honesty-compiler/fixtures/claims/lying-forbidden-token.json`
- `packages/honesty-compiler/fixtures/claims/lying-missing-evidence.json`
- `packages/honesty-compiler/fixtures/claims/lying-overclaim-rung.json`
- `packages/honesty-compiler/fixtures/claims/lying-stale-ship.json`
- `packages/honesty-compiler/fixtures/claims/lying-unknown-field.json`
- `packages/honesty-compiler/fixtures/claims/pass-proving-ground-skip.json`
- `packages/honesty-compiler/package.json`
- `packages/honesty-compiler/scripts/seal-fixtures.ts`
- `packages/honesty-compiler/src/bind.ts`
- `packages/honesty-compiler/src/cli.ts`
- `packages/honesty-compiler/src/compiler.ts`
- `packages/honesty-compiler/src/emit.ts`
- `packages/honesty-compiler/src/index.ts`
- `packages/honesty-compiler/src/ir.ts`
- `packages/honesty-compiler/src/node-io.ts`
- `packages/honesty-compiler/src/parse.ts`
- `packages/honesty-compiler/src/report.ts`
- `packages/honesty-compiler/src/rung.ts`
- `packages/honesty-compiler/test/generate-goldens.ts`
- `packages/honesty-compiler/test/goldens/fail-bad-argus-sha.golden.json`
- `packages/honesty-compiler/test/goldens/fail-forbidden-token.golden.json`
- `packages/honesty-compiler/test/goldens/fail-missing-evidence.golden.json`
- `packages/honesty-compiler/test/goldens/fail-overclaim-rung.golden.json`
- `packages/honesty-compiler/test/goldens/fail-stale-ship.golden.json`
- `packages/honesty-compiler/test/goldens/fail-unknown-field.golden.json`
- `packages/honesty-compiler/test/goldens/pass-fixture-suite.golden.json`
- `packages/honesty-compiler/test/goldens/pass-proving-ground-skip.golden.json`
- `packages/honesty-compiler/test/goldens/pass-spec-only.golden.json`
- `packages/honesty-compiler/test/goldens/pass-verify.golden.json`
- `packages/honesty-compiler/test/honesty-compiler.test.ts`
- `packages/preflight/README.md`
- `packages/preflight/checks.json`
- `packages/preflight/package.json`
- `packages/preflight/src/checks.ts`
- `packages/preflight/src/cli.ts`
- `packages/preflight/src/index.ts`
- `packages/preflight/src/runner.ts`
- `packages/preflight/src/spawn.ts`
- `packages/preflight/test/preflight.test.ts`
- `packages/protocol/src/room-ipc-v2.ts`
- `packages/protocol/test/room-ipc-v2.test.ts`
- `packages/pty-host/src/index.ts`
- `packages/pty-host/test/environment.test.ts`
- `packages/pty-host/test/eof-timer-early-fire.test.ts`
- `packages/pty-host/test/eof-timer.test.ts`
- `packages/room-runtime-worker/src/worker.ts`
- `packages/single-verdict/AGENTS.md`
- `packages/single-verdict/README.md`
- `packages/single-verdict/package.json`
- `packages/single-verdict/src/index.ts`
- `packages/single-verdict/test/generate-goldens.ts`
- `packages/single-verdict/test/goldens/ship.golden.json`
- `packages/single-verdict/test/goldens/spec-only.golden.json`
- `packages/single-verdict/test/goldens/stale-evidence.golden.json`
- `packages/single-verdict/test/goldens/verify-pass-with-findings.golden.json`
- `packages/single-verdict/test/single-verdict.test.ts`
- `packages/supervisor/test/build.test.ts`
- `packages/tui-chaos/README.md`
- `packages/tui-chaos/package.json`
- `packages/tui-chaos/src/asciinema.ts`
- `packages/tui-chaos/src/cli.ts`
- `packages/tui-chaos/src/evidence.ts`
- `packages/tui-chaos/src/goldens.ts`
- `packages/tui-chaos/src/pty/bridge.mjs`
- `packages/tui-chaos/src/pty/session.ts`
- `packages/tui-chaos/src/scenario/ansi-flood.ts`
- `packages/tui-chaos/src/scenario/chaos-keys.ts`
- `packages/tui-chaos/src/scenario/governance-focus.ts`
- `packages/tui-chaos/src/scenario/layout-resize.ts`
- `packages/tui-chaos/src/scenario/types.ts`
- `packages/tui-chaos/src/screen.ts`
- `packages/tui-chaos/src/tui-session.ts`
- `packages/tui-chaos/test/evidence.test.ts`
- `packages/tui-chaos/test/final-s1-s4.test.ts`
- `packages/tui-chaos/test/fixture-stream.test.ts`
- `packages/tui-chaos/test/goldens.test.ts`
- `packages/tui-chaos/test/review-corrections.test.ts`
- `packages/tui-chaos/test/screen.test.ts`

test, 14 paths:

- `test/acceptance/evidence-manifest.test.ts`
- `test/acceptance/two-way-collaboration.test.ts`
- `test/phase0/parent-death.test.ts`
- `test/phase0/prereq-c/c2-worker.test.ts`
- `test/phase0/pty-pressure.test.ts`
- `test/phase0/recovery-mode.test.ts`
- `test/phase0/spike/gateway-child.ts`
- `test/phase0/spike/phase0-lib.ts`
- `test/phase0/spike/prerequisite-c-load.mjs`
- `test/phase0/spike/pty-host-child.ts`
- `test/phase0/viewer-death.test.ts`
- `test/phase0/viewer-id.test.ts`
- `test/phase3a/adversarial/supervisor-entry.ts`
- `test/phase3a/descendant-record-wait.test.ts`

testdata, 2 paths:

- `testdata/tui-chaos/goldens/governance_focus.grid.txt`
- `testdata/tui-chaos/goldens/layout_resize.grid.txt`

`docs/verification/2026-08-12-phase-3a-merge-gate.md`, which the Task 59 commit adds, is not named in plan section 3 either; `DEC-20261106-01` B5 item 4 and B6 name it. It is not in the list above, which was taken at the binding base. The final merge review of `DEC-20261106-01` B11 item 2 rules on this list.

## 8. Not run, and deviations

Not run:

- The MacBook runs of plan Task 59 Steps 4 and 5: the Founder's, in the run of `DEC-20261106-01` B8.
- The process count of plan section 8.3 step 7: the Founder's, on the MacBook, in the run of `DEC-20261106-01` B8. This session ran no process-listing command.
- `bunx tsc --noEmit` as plan Task 59 Step 5 writes it: `bun x tsc --noEmit` ran in its place, as `DEC-20261106-01` B5 item 6 names it, because `bunx` on the Ubuntu PC is not the custodied build.
- Plan Task 59 Step 3's creation of the correction-round log: not done, under `DEC-20261102-01` B6 and `DEC-20261106-01` B4 item 2. `docs/verification/phase-3a-correction-rounds.md` is unchanged.
- Plan Task 59 Step 5 "on all three hosts": the iMac runs nothing, under `DEC-20261013-04` B2 and B4 and `DEC-20261106-01` B4 item 1.
- Plan Task 59 Step 8, the final Founder merge review: the Founder's act under `DEC-20261106-01` B11 item 2.
- Pushing the branch and opening the pull request: the Founder's, under `DEC-20261106-01` B10.
- The check of `DEC-20261106-01` B5 item 1 that `gh` on the Ubuntu PC is not logged in as `decivantiq`: part of the Founder's setup command. This session made no GitHub call.

Deviations:

- The break for item 1 touched `docs/verification/2026-08-12-phase-3a-host-certification-ubuntu.md`, a certification report, which is neither a production file nor the harness. The item 1 test reads only the two reports, as `DEC-20261106-01` B4 item 4 reads the item, so a break of that item is a break of a report. It was made only for its run, restored with `git checkout`, and is not in the commit.
- Besides the `describe("Phase 3A merge gate")` block and the `PHASE_2_FLOOR` declaration inside it, the commit adds to `test/phase3a/architecture-phase3a.test.ts`, directly above the block, a comment and two import statements: `runCli` from `apps/madbridge/src/cli` and the test-only harness `test/phase3a/runtime-harness.ts`, which the tests need. No existing line of the file changed.
