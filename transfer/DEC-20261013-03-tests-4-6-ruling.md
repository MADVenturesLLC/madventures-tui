FOUNDER-ACT-20261013-TESTS-4-6-RULING: the causes of tests 4 to 6 recorded, the certification runtime fixed for each operating system, a host-runtime test change and a spec correction ratified, and an oracle build for test 4 authorized

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `3f9b414c0ffcaf6955873f757cb55b97b2de77a1`
> **Governs:** `DEC-20261012-03` B6; `DEC-20261011-02` B7; `DEC-20261012-01` B4 and B6 item 1
> **Ratifies:** the patch with SHA-256 `dca529fac018306026164aca23fa49a35c13045666ac78494e2373d2646a2fe9` (1,013 bytes) against `packages/pty-host/test/main-guard.test.ts`, and the patch with SHA-256 `d9f6ed529ce0982aecf13be11e72ac3f497d80e2286d989c81bb06b1f52140f1` (3,048 bytes) against spec §1.5 and `packages/tui-chaos/README.md`
> **Read with:** `DEC-20261012-03` (SHA-256 `e91b25f4fbb0f23101f96793afe3a85951372efbc83148602e38ccb2a873c4f1`); `DEC-20261011-02` (SHA-256 `0d163c6aa931d0d52a94bd3f5ad4df3cdf3925caef6d80f2429415d03328fafd`); `DEC-20261012-01` (SHA-256 `ed3443e7c88af827dfc2d9792a1ef994568f8a8e6184b4aa76569bfefd584d83`); `DEC-20261012-04`; spec §1.5

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What is owed.** `DEC-20261012-03` B6 requires an act, after the reports of its B3 and B4, that rules on the cause of tests 4 to 6, any fix, the certification runtime, and whether the tests leave the known-failure set of `DEC-20261011-02` B2. This is that act.

A2. **The root-cause build.** Under `DEC-20261012-03` B3, a builder session started with `claude-agent` on the Ubuntu PC worked in a fresh clone detached at `03dda124e9d6faa59abda6a3817410bcdf1765f8`, with `origin/main` at `3f9b414c0ffcaf6955873f757cb55b97b2de77a1` under its Addendum 2 (SHA-256 `d51b3bba8cf25e471cca77bbc910db5d76ccda10a0850f06a1502e298a66a13a`). It ended in STOP AND REPORT, with no branch, commit or pull request and a clean tree. Its report is the file `/home/michaeldaley/b3-root-cause-report/b3-final-report.md` on the Ubuntu PC, SHA-256 `f9949b42f66450794d8a258704c6434ea572124d61ea06452e7c97a6f62868e0`, 134 lines, 11,305 bytes. All eighteen reproduction runs failed as the investigation report of `DEC-20261012-03` A2 records.

A3. **Test 4.** On the Ubuntu PC, `/usr/bin/awk` is mawk 1.3.4 20260129. When its standard output is a terminal, as it is under the test's PTY, mawk reads every file as lines whatever `RS` is set to, and each read stops at the first NUL. The Linux oracle of spec §1.5 row 4 therefore sees only the first entry of `/proc/self/environ`, `PATH`. No program change inside awk avoided it. With the macOS `ENVIRON` oracle swapped in as a temporary diagnostic, the test passed, so the forwarding chain is correct. The test's own comment records why Linux reads `/proc/self/environ`: `ENVIRON` gains keys under gawk, and a shell adds keys of its own.

A4. **Tests 5 and 6.** The test file starts the PTY host as `bun` from `PATH`, which on the Ubuntu PC is stock Bun 1.4.2, so the earlier custodied runs still ran the host under stock Bun. Under stock 1.4.2 on Linux, the exit callback of `Bun.Terminal` does not fire when a detached child exits on its own. The host's natural-exit path then fails closed after 3,000 ms: it exits 1 and emits neither drained nor exited. With the host started on the custodied build, tests 5 and 6 passed three of three, and a direct run of the host finished in 14 ms with drained and exited(7). Upstream pull request 40304 of `oven-sh/bun` is the fix; it is open and not merged, and its head has moved to `7f7156bf8ca03e8343f24f1e815af0701a0364db`. The production natural-exit path depends on that fix on Linux, not only the tests.

A5. **How production starts the host.** `packages/broker/src/pty-host-supervisor.ts` starts the PTY host with `process.execPath`, the Bun that runs the broker. `packages/pty-host/test/eof-timer.test.ts` and `signals.test.ts` do the same. Only `main-guard.test.ts` takes `bun` from `PATH`.

A6. **The MacBook check.** Under `DEC-20261012-03` B4, I ran the check on 2026-10-12 at `03dda124e9d6faa59abda6a3817410bcdf1765f8` with stock Bun 1.4.2, revision `744846f844374847c902b5e7fd59b4342a51ef99`. Its report has file SHA-256 `81ce3600135ed0ecc2db5ea02ca11952c1ae37d63948db1b57e795026fcd5768` and internal `Report SHA-256` `b398bb8caccbb9f869e96c188bfee92790cd54cf0e042c8a7405799a8ed80b45`. All nine runs of tests 4 to 6 passed.

A7. **What is not established.**

1. Whether tests 4 to 6 pass on the iMac, which is macOS on `x86_64`. No run has been made there. `.github/actions/setup-qualified-bun` holds custodied archives only for `Linux-x86_64` and `Darwin-arm64`.
2. A Linux oracle for test 4 that keeps the guarantees of A3 and works when awk's output is a terminal.
3. Whether pull request 40304 will merge, and when an official Bun release will contain it.

A8. **Stale runner names.** Spec §1.5 and `packages/tui-chaos/README.md` line 132 still name `macos-14`, which `DEC-20261012-04` replaced with `macos-15`.

A9. **The drafting assistant.** It read the reports, the tests and the CI action, and built both patches. In its own Linux container under Bun 1.3.11, `main-guard.test.ts` with the patch ran 26 pass and 2 fail, the two being tests 5 and 6, which that Bun cannot pass. Its container is not a certification host, and none of that is an independent review.

## Part B: Founder rulings

B1. **The causes.** I record A3 and A4 as established. Test 4 fails because of its Linux oracle under mawk with terminal output. Tests 5 and 6 fail because stock Bun 1.4.2 lacks the fix of pull request 40304 on Linux, and the production natural-exit path depends on it.

B2. **The certification runtime.** It is fixed for each operating system, and this supersedes `DEC-20261012-01` B4 and `DEC-20261012-03` B2.

1. On macOS, every Bun process of a certification run is Bun 1.4.2, revision `744846f844374847c902b5e7fd59b4342a51ef99`.
2. On Linux, every Bun process of a certification run is the custodied build of revision `69cb78c9097cebd3bdb832d9fff8b7d23abce09e`, the `bun-linux-x64` binary with SHA-256 `0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb`, from tag `intake/bun-pr40304-69cb78c9097cebd3bdb832d9fff8b7d23abce09e/v1` at commit `3b5775a57da95ad6446e68036746b6308a0d5904`. Stock Bun 1.4.2 is not a certification runtime on Linux.

B3. **Replacement rule.** When the expiry guard of `.github/actions/setup-qualified-bun` reports EXPIRED, because pull request 40304 closed unmerged or an official Bun release contains the fix, the custodied build stops being the Linux certification runtime that day, and no Linux certification gate passes until a later act fixes its replacement. A later act may move Linux to an official release sooner.

B4. **Using the custodied binary on the Ubuntu PC.** It may be used from its existing custody path, `/home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun`, for certification runs, for the build of B7 and for the check of C2. Each use first confirms its SHA-256 and `Bun.revision` match B2 item 2. It is run by its full path, or placed first on `PATH` only in that run's own process environment. The PC's installed Bun, shell profile and system `PATH` do not change.

B5. **Ratification.** I ratify both patches in the header. The first starts the PTY host in `main-guard.test.ts` with `process.execPath`, as production and the other host tests do, and changes no assertion or timeout. The second restates the gate runtime of spec §1.5 under B2 and names `macos-15` in spec §1.5 and the README. They take effect when they are on `main` together with this act.

B6. **The known-failure set.** When this act and its patches are on `main`, tests 5 and 6 leave the known-failure set of `DEC-20261011-02` B2. From then on, a full-suite check on the Ubuntu PC counts only if it runs under the Linux runtime of B2, and tests 5 and 6 must pass in it. Test 4 stays in the known-failure set. Tests 1 to 3 are not affected.

B7. **The test 4 oracle build is authorized.** A builder session started with `claude-agent` on the Ubuntu PC works in a fresh clone at the then-current `origin/main`, from a prompt the drafting assistant drafts after this act is on `main`, which I read before I paste it. It proposes a Linux oracle for test 4 and the exact replacement text of spec §1.5 row 4. The oracle starts no shell, emits keys only and never a value, and gives the correct key set when its standard output is a terminal. The session reports which `/usr/bin/awk` variants its evidence covers and what it could not verify without installing software. It keeps every assertion and timeout of test 4, may add temporary diagnostics in its clone and reverts them, and makes no commit, push or pull request. A later act amends row 4 and ratifies the change.

B8. **Task 46.** `DEC-20261011-02` B7 still requires the fix of test 4 on `main` before Task 46 is authorized.

B9. **Counting.** This is a new Founder ruling, which plan §11.3 does not count. The builds of `DEC-20261012-03` B3 and of B7 are not plan tasks and add no round. Rubric milestone 1 stays at **5**, rubric milestone 4 at **3**, and rubric milestone 6 at **0**.

## Part C: Filing

C1. One pull request files this act, the report of A2 at `docs/verification/2026-10-13-tests-4-6-root-cause-ubuntu.md` and the report of A6 at `docs/verification/2026-10-12-tests-4-6-check-macbook.md`, copied from `/home/michaeldaley/macbook-b4-evidence/report/2026-10-12-tests-4-6-check-macbook.md` on the Ubuntu PC, each byte-identical to the file whose SHA-256 this act names, applies both patches, and changes nothing else.

C2. Before the pull request opens, the filing session runs `packages/pty-host/test/main-guard.test.ts` once on the Ubuntu PC with the custodied binary by its full path under B4, and all of its tests pass. The pull request merges only when every required check succeeds, under my separate merge authorization.

## Part D: Not authorized

- Any change to production code, `bun.lock`, a manifest, a workflow, `.github/actions/setup-qualified-bun`, the plan or `PLAN-OPEN-2`, or to spec text beyond the ratified patch.
- Any change to `packages/broker/test/pty-host-supervisor.test.ts`, to spec §1.5 row 4, or to an assertion or a timeout of tests 4 to 6, and skipping, retrying or quarantining any test.
- Installing, upgrading or removing Bun, awk or any other package on any host, or changing a host's system `PATH` or shell profile.
- Any change to `MADVenturesLLC/os-governed-artifacts`, any new fetch of the custodied runtime, and any use of the custodied build as a macOS certification runtime.
- The ruling on test 4's oracle, Task 46 and every later task.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-13

Actor-Id: founder
