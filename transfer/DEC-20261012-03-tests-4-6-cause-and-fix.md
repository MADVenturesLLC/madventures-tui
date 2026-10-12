FOUNDER-ACT-20261012-TESTS-4-6-CAUSE-AND-FIX: the findings on tests 4 to 6 recorded, the certification runtime held open, a root-cause build and a MacBook check authorized, and the investigation report filed

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `95783dade386d3042f1209b051e8eea1504516dc`
> **Governs:** `DEC-20261012-02` B4; `DEC-20261011-02` B7; `DEC-20261012-01` B4 and B6 item 1
> **Read with:** `DEC-20261012-02` (SHA-256 `c1383d518b54b9cb7e885dd649df39ac82740d973196ba8c89fce834fffa3660`) read with item 3 of my merge authorization for PR #139, comment 6121676180; `DEC-20261011-02` (SHA-256 `0d163c6aa931d0d52a94bd3f5ad4df3cdf3925caef6d80f2429415d03328fafd`); `DEC-20261012-01` (SHA-256 `ed3443e7c88af827dfc2d9792a1ef994568f8a8e6184b4aa76569bfefd584d83`); the investigation report of A2 (SHA-256 `ec6c39229959f4d3dd0c55ff948caa7d8a98cda1b915ddb2ddc3bf81a68de79b`); spec §1.5

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What is owed.** `DEC-20261012-02` B4 requires an act, after the investigation report, that rules on four things: the cause of tests 4 to 6, the certification runtime of `DEC-20261012-01` B4, the fix and who builds it, and the filing of the report. `DEC-20261011-02` B7 still requires the fix on `main` before Task 46 is authorized. This is that act.

A2. **The investigation run.** Under `DEC-20261012-02` B2, I ran the run script (SHA-256 `ab868ad7c35dc5af03e0f9e09ba0d0626b60cec847c7a3b5c0e69f15ca21d86f`) on the Ubuntu PC. It completed on 2026-10-12 at `main` commit `95783dade386d3042f1209b051e8eea1504516dc` with a clean tree at the end, after the mode restore that `DEC-20261011-02` B4 item 2 allows. It wrote its report to `/home/michaeldaley/ubuntu-b7-evidence/report/2026-10-12-tests-4-6-investigation-ubuntu.md`: file SHA-256 `ec6c39229959f4d3dd0c55ff948caa7d8a98cda1b915ddb2ddc3bf81a68de79b`, 120 lines, internal `Report SHA-256` `3c3c5b89d4a180787aff6f41783931aa3e1dc1acd14d9fd3e85e65a21653e449`. The report records:

| Field | Stock | Custodied |
| --- | --- | --- |
| Path | `/home/michaeldaley/.bun/bin/bun` | `/home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun` |
| `--version` | 1.4.2 | 1.4.1 |
| `Bun.revision` | `744846f844374847c902b5e7fd59b4342a51ef99` | `69cb78c9097cebd3bdb832d9fff8b7d23abce09e` |
| SHA-256 | `a83d263767d839e4d2649ca8e35d07159c7afc99afdc96d731ced29e056dda0c` | `0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb` |

The custodied binary came from tag `intake/bun-pr40304-69cb78c9097cebd3bdb832d9fff8b7d23abce09e/v1` at commit `3b5775a57da95ad6446e68036746b6308a0d5904`, with `MANIFEST.sha256` verified, 5 of 5 entries. Upstream pull request 40304 of `oven-sh/bun`, "spawn: fire the Terminal exit callback when a detached child of an existing terminal exits", is open and not merged. The Bun 1.4.2 release was published on 2026-09-05T05:55:48Z at commit `744846f844374847c902b5e7fd59b4342a51ef99`. Neither that release's tag nor the stock revision contains commit `69cb78c9097cebd3bdb832d9fff8b7d23abce09e`.

Results:

1. Test 4 failed in each of three runs with each runtime, after about 20 ms.
2. Tests 5 and 6 failed in each of three runs with each runtime, timing out after about 4.01 s.
3. With the custodied binary, `bun test test/phase3a` passed at 60 pass and 0 fail, with all thirteen spike criteria passing.
4. With the custodied binary, the full suite showed 1,580 pass and 3 fail, the three being tests 4, 5 and 6.

A3. **What is established.** On the Ubuntu PC, tests 4 to 6 fail with the same custodied revision under which CI Verify on `ubuntu-24.04` passes them. The Bun build alone therefore does not explain the failures on the PC. A factor of the PC, its operating system, its kernel or the session the tests ran in contributes to all three. That factor has not been identified.

A4. **What is not established.**

1. Whether tests 5 and 6 also need the fix of pull request 40304. Its title describes the path tests 5 and 6 exercise: a child that exits on its own inside an existing terminal. Those tests pass in CI only with the custodied build. They failed with Bun 1.3.11 in the drafting assistant's own Linux container, and in a builder's earlier sandboxed macOS run. If they need that fix, no official Bun release can pass them today, and Bun 1.4.2 cannot be the certification runtime.
2. Whether test 4 shares a cause with tests 5 and 6. It passed with Bun 1.3.11 in the drafting assistant's container, so it may not depend on pull request 40304.
3. Whether Bun 1.4.2 passes tests 4 to 6 on either Mac.

A5. **Why the runtime cannot be fixed now.** Plan §8.8 and M26 require zero failures on every certification host. Bun 1.4.2 has not been shown to pass tests 5 and 6 anywhere. The custodied build is a temporary runtime built from an unmerged upstream pull request, and the CI action that installs it carries an expiry guard. Neither can be fixed as the certification runtime on this evidence.

A6. **The drafting assistant.** It drafted this act and the run script, and read the report, the tests and the CI action. It ran nothing on my PC. None of that is an independent review.

## Part B: Founder rulings

B1. **The findings.** I record A3 as established and A4 as open. The cause of tests 4 to 6 is not yet established. The build of B3 and the check of B4 are to establish it.

B2. **The certification runtime stays open.** Bun 1.4.2 stays the certification runtime provisionally, as `DEC-20261012-01` B4 and spec §1.5 state. The custodied build is not adopted as a certification runtime. A later act fixes the runtime after the reports of B3 and B4.

B3. **The root-cause build is authorized.** A builder session started with `claude-agent` on the Ubuntu PC, signed in as the agent identity, works from a prompt that the drafting assistant drafts after this act is on `main`. I read the prompt before I paste it. The session:

1. works in a fresh clone at the then-current `origin/main` commit and records that commit; no existing checkout is touched;
2. runs `bun install --frozen-lockfile` with the stock Bun 1.4.2;
3. may run the custodied binary of A2 by its full path, read-only, after confirming its SHA-256 and `Bun.revision` match A2. It does not fetch the custodied runtime, put it on `PATH` or copy it;
4. reproduces tests 4, 5 and 6 with both runtimes, and then finds the root cause of each. It may add temporary diagnostics in its clone, and may vary the conditions the tests run under, such as environment variables, the working directory and whether a terminal is attached. It reverts every diagnostic before any commit;
5. reads the public diff of pull request 40304 and the code of the natural-exit path, and answers whether tests 5 and 6 depend on that fix; and
6. if the cause and the fix lie wholly in `packages/broker/test/pty-host-supervisor.test.ts` or `packages/pty-host/test/main-guard.test.ts`, fixes them test-first on its own branch and opens one draft pull request. The fix keeps every assertion and every timeout of tests 4 to 6 unchanged, and must pass in CI Verify and on the PC with the custodied binary.

The session stops and reports, without a fix, if the cause or the fix lies anywhere else: in production code, a dependency, `bun.lock`, a workflow, the CI action, the spec, the plan, Bun, the kernel, or the PC's configuration. It also stops and reports if the fix would change an assertion or a timeout, or if the cause stays unknown. It reports its findings for each test with the evidence for each.

B4. **The MacBook check is authorized.** I run it on the MacBook myself, from a run script that the drafting assistant drafts after this act is on `main`. I read the script before I run it. The run:

1. creates a fresh detached clone at the then-current `origin/main` commit and records that commit; no existing checkout is touched;
2. records the path, `--version`, `Bun.revision` and SHA-256 of the Bun it uses, and the `node` path and version, before any test. If Bun does not report 1.4.2, or `node` is missing, the run stops;
3. runs `bun install --frozen-lockfile`, under the tree, lockfile and mode-restore rules of `DEC-20261011-02` B4 item 2;
4. runs each of tests 4, 5 and 6 alone, three times; and
5. confirms `git status --porcelain` is empty at the end.

Test results are recorded, not judged. The run writes a report only from its retained evidence, to `/Users/michaeldaley/macbook-b4-evidence/report/`, outside the clone, with the SHA-256 of each evidence file and a final `Report SHA-256:` line. The report is not filed by this act.

B5. **The investigation report.** The report of A2 is accepted as the report of `DEC-20261012-02` B3. It is filed byte-identically at `docs/verification/2026-10-12-tests-4-6-investigation-ubuntu.md`.

B6. **What follows.** Tests 4 to 6 stay in the known-failure set of `DEC-20261011-02` B2. After the reports of B3 and B4, a later act rules on the cause, any fix the build produces, the certification runtime, and whether tests 4 to 6 leave the known-failure set. `DEC-20261011-02` B7 still requires the fix on `main` before Task 46 is authorized.

B7. **Task 45.** Task 45 does not wait for this act, the build or the check. It may be authorized by its own act.

B8. **Counting.** This is a new Founder ruling, which plan §11.3 does not count. The build of B3 is not a plan task and adds no round. Rubric milestone 1 stays at **5** and rubric milestone 4 at **3**.

## Part C: Filing

C1. One docs-only pull request files this act and the report of B5, and changes nothing else. The build of B3 and the check of B4 start only after it merges.

## Part D: Not authorized

- Any change to production code, `bun.lock`, a manifest, a workflow, `.github/actions/setup-qualified-bun`, the plan, a spec or `PLAN-OPEN-2`, and any change to a test file other than the two that B3 item 6 names.
- Any change to an assertion or a timeout of tests 4 to 6, or skipping, retrying or quarantining any test.
- Any change to `MADVenturesLLC/os-governed-artifacts`, and any fetch of the custodied runtime in the build of B3.
- Using the custodied binary as a default runtime, on `PATH`, outside the build of B3, or for any certification run.
- Any change to the configuration of the Ubuntu PC or the MacBook, their kernel, their packages or their installed Bun.
- Marking ready or merging any pull request the build opens.
- The ruling of B6, Task 46 and every later task.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-12

Actor-Id: founder
