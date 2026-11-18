DEC-20261117-01: the Linux certification runtime after Bun pull request 40304 closed as stale

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `cec21d0f98688b71bef43b3f350fbd14d6606030`
> **Amends:** `DEC-20261013-03` B3, for the closure of pull request 40304 as stale
> **Ratifies:** the patch with SHA-256 `86c16c8c7d0f9e2868aca441b82815a33303eb8a03c0cf134105f0e59a7457cc` (908 bytes) against `.github/actions/setup-qualified-bun/action.yml`
> **Read with:** `DEC-20261013-03` B2, B3, B4 and B6; `DEC-20261114-01` A4; `DEC-20261115-02` B12 and B15 item 3, and its Addendum 7

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The rule.** `DEC-20261013-03` B2 item 2 makes the custodied build of revision `69cb78c9097cebd3bdb832d9fff8b7d23abce09e`, the `bun-linux-x64` binary with SHA-256 `0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb`, the Linux certification runtime. Its B3 ends that the day the expiry guard of `.github/actions/setup-qualified-bun` reports EXPIRED because pull request 40304 of `oven-sh/bun` closed unmerged, and no Linux certification gate passes until a later act fixes the replacement. That guard reports EXPIRED in that case, at lines 112 to 118 of the action at `main` `cec21d0f98688b71bef43b3f350fbd14d6606030`.

A2. **The closure.** My read-only command on my MacBook read pull request 40304 on 2026-11-17: state `closed`, `merged` false, `closed_at` `2026-11-17T07:49:13Z`. Bun's bot closed it with the comment "Closing as stale: this PR conflicts with main, and its last commit is from 2026-08-25. The branch stays, so the work is not lost. To pick it up again, rebase the branch on main and reopen this PR." It was not rejected and not replaced by another merged change that the comment names.

A3. **The guard's report.** On pull request 245, the draft pull request of M0 at `6da70bc5892f6d2ab27475afdc348b32835b3f7e`, the jobs `Verify`, `Verify (macOS)`, both `tui-chaos` jobs and `code-review` failed at 22:51 UTC on 2026-11-17 in that guard: the `Verify` log ends it with "EXPIRED: PR 40304 closed unmerged", and the other jobs fail at the same step of the action, with the next step skipped. Each run of those jobs now fails there. The last green run of those jobs, on another pull request, was at 05:08 UTC the same day.

A4. **The newest official Bun.** My read-only command on my Ubuntu PC found the newest official release, Bun 1.4.4, tag `bun-v1.4.4`, published 2026-10-22, revision `38afee6c84fcf48c0edb2466aa4b27d287a59c30`. Its `bun-linux-x64.zip` matched the release's `SHASUMS256.txt`, SHA-256 `bf8ccbfb2b0b80159e0f9a6d15c55317add8077534dbc6130a3edb52fccb395c`; the binary has SHA-256 `10702245766b225e70bbf6235fd6b47214fd94b4760d00ffaed8ab0df57ac235`. It ran only from its own folder, `/home/michaeldaley/builds/bun-official-1.4.4-check`, against a fresh clone at `cec21d0f98688b71bef43b3f350fbd14d6606030`; the logs there are indexed by `LOGS.sha256`, SHA-256 `30e55f5d105fe59f13b9a32b968f154c7e84ae1b78ed607860ba727f1410172c`. The frozen install and `bunx tsc --noEmit` passed. `packages/pty-host/test/main-guard.test.ts` ran three times with 26 pass and 2 fail each time, the two failures being tests 5 and 6 of `DEC-20261013-03`: "natural child exit without a terminate command publishes an exact marker, drained, and exited exactly once" and "early child output cannot precede launched and ready, and is required, not merely allowed". Bare `bun test` ran 1945 tests across 142 files with 1940 pass and 5 fail: those two, "governed-child environment forwarding: exact key-set equality with the launch-frame env, ambient canary absent (C7 evidence 7)", "supervisor crash terminates every governed child" and "no governed process survives any supervisor-death scenario". The custodied build and the Bun the PC has installed were unchanged before and after.

A5. **What follows.** No official Bun release carries the fix of pull request 40304, and the newest fails tests 5 and 6 as Bun 1.4.2 did, with three further failures. Moving Linux to an official release is not open now. The custodied build itself is unchanged: its artifact is immutable in custody, hash-pinned, and checked by revision before every use. Only its upstream status changed, and only for staleness.

A6. **M0 on my Ubuntu PC.** My record run of `DEC-20261115-02` B15 item 3 on my Ubuntu PC built the Claude Code record of its Addendum 7 A3, SHA-256 `eecac7b942288ecec1ebb6069a76f62e66ad726940615d0da9638f5a75112207`, at `2026-11-17T11:53:33.949Z`, about four hours after the closure, under the custodied build at its pinned path, SHA-256 and version. That run builds a record from captures already taken; it does not exercise the PTY host's natural-exit path that pull request 40304 fixes. No other Linux certification run or gate ran between the closure and this act.

A7. **The drafting assistant.** It wrote both read-only commands, drafted this act and the patch, and checked that the patched guard step parses as YAML and as shell. It did not run the patched action in CI. That is not an independent review.

## Part B: Founder rulings

B1. **The expiry.** The guard's EXPIRED of A3 was correct under `DEC-20261013-03` B3, and under it the custodied build stopped being the Linux certification runtime on 2026-11-17.

B2. **The runtime restored.** From my signature, the custodied build of `DEC-20261013-03` B2 item 2 is again the Linux certification runtime, and its B4 again governs its use on my Ubuntu PC. The closure of pull request 40304 as stale and unmerged does not end it. It ends, and no Linux certification gate passes until a later act fixes its replacement, the day any of these occurs:
1. an official Bun release contains its revision, as the guard's containment scan establishes;
2. the guard cannot establish that scan, for example because the upstream revision is no longer reachable, and fails closed;
3. the artifact fails the custody checks of the action or of `DEC-20261013-03` B4.

B3. **Official releases.** When a new official Bun release appears, I may run the check of A4 with it. If tests 5 and 6 pass in three of three runs, and the whole suite fails only tests of the known-failure set of `DEC-20261013-03` B6, a later act may move Linux to that release. I review this act no later than 2027-02-17.

B4. **The patch.** I ratify the patch of the header. In the guard's closed-unmerged case it records a notice and continues, with the custodied revision as the anchor of its containment scan, in place of EXPIRED. Nothing else in the action changes. It takes effect when it is on `main` together with this act.

B5. **M0's Ubuntu record.** The record of A6 stands. The binary that built it matched its pins, and the run does not depend on the fix that the closure concerned. `DEC-20261115-02` Addendum 7 B3 is unchanged.

B6. **Pull requests already open.** The guard failures of A3 are not the work of any pull request. After this act and its patch are on `main`, the failed jobs of pull request 245 run again without any change to its branch, and M0's runs of `DEC-20261115-02` B12 on my Ubuntu PC use the custodied build under B2.

B7. **Filing.** One pull request, made by a Claude Code filing session under a filing prompt I sign, adds this act unchanged as `docs/decisions/DEC-20261117-01-linux-runtime-after-pr40304.md`, applies the patch of the header, and changes nothing else. It touches `docs/decisions/` and `.github/`, so under `AGENTS.md`, as `DEC-20261031-01` amended it, it merges only by an act of mine naming its exact head. Its own `Verify` jobs run with the patched action.

B8. **Counting and scope.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. Nothing else in `DEC-20261013-03` changes: the macOS runtime of its B2 item 1, its B4 and its B6 stand.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-17

Actor-Id: founder
