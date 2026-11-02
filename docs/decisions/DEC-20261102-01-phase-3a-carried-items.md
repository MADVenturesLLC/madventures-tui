FOUNDER-ACT-20261102-PHASE-3A-CARRIED-ITEMS: a ruling on every carried item before Task 59, and the place of the work they need in the rest of Phase 3A

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `0df8cf115279e6d79b415aaa39350e3379ebb49f` (the merge of pull request 207)
> **Governs:** the items carried forward by `DEC-20261027-01` B9, `DEC-20261028-01` B4 and item 7 of my authorization of pull request 205; plan `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md`, Tasks 57 to 59
> **Read with:** `DEC-20261028-02` B14 and B15; `DEC-20261013-04`; `DEC-20261101-01` B1, B2, B5 and B6; `DEC-20261031-01`; plan sections 4, 8 and 11.3 and Tasks 58 and 59; spec sections 1.5, 4.2, 6.8 and 6.9

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What B14 requires.** `DEC-20261028-02` B14 rules that the act which authorizes Task 59 rules on every carried item before Task 59 begins. Task 59 is not near: plan Task 57 needs my list of surfaces, M25 needs its review, and Task 58 needs both certification hosts at one candidate commit. I rule on the items now, so that the work they need is done before that commit is fixed, and the act that authorizes Task 59 relies on these rulings rather than making them.

A2. **Why now.** Plan Task 58 runs the full suite at one candidate commit on each certification host, which spec section 1.5 and `DEC-20261013-04` make the MacBook and the Ubuntu PC; the plan's text still names the iMac as well, which that act removed. Task 59 asserts the merge gate on top of that commit. A change to code or tests after Task 58 voids its reports. Every item that needs a change must therefore land before Task 58's candidate commit is fixed.

A3. **The items.** Each item has a number used below.
- From `DEC-20261028-01` B4:
  1. `spawnPtyHost` starts the PTY host with the repository root as its working directory, and Bun 1.4.2 loads a `.env` file found there into the host's environment despite the explicit environment.
  2. Production does not route `pty_input` or `pty_resize` to the PTY host; Task 49 does so only through the harness.
  3. No test of a failing duplicate lookup in `publish` and in `publishIncident`, and none that a refused duplicate builds no record and consumes no event id.
  4. No `packages/pty-host` test that the governed child's environment holds only the launch frame's environment when the host's own environment holds more.
  5. In `test/phase3a`: no test that a refused `pty_input` or `pty_resize` never reaches the child; none that the fixture exits cleanly on SIGINT; no check of the returned session by `Reflect.ownKeys`; and no refused command in the third environment test.
  6. Stated limitations: the PTY host environment capture is the environment the build hands the host, not one it reports; no session path exercises the redaction of a secret-marked allowlisted value, because no allowlist marks one; the Task 49 fixture detects a resize through Bun's undocumented `_refreshSize`.
- From `DEC-20261027-01` B9, which `DEC-20261028-01` B4 item 7 carries:
  7. The fencing test's value-import check passes an indented import.
  8. The doctor tests check only the working directory and accept any check status.
  9. "preflight creates nothing" cannot see a file created and removed within the call.
  10. No test of a worktree named through a symbolic link.
  11. Production routing of `pty_input` and `pty_resize`, the same as item 2.
- From item 7 of my authorization of pull request 205:
  12. No test fails when the checks of the session's ledger and output subdirectories are deleted from `verify-ledger` and `export-evidence`.
  13. `export-evidence` with `--session` writes into the pre-created `sanitized-evidence` directory and neither clears nor checks what is already there.
  14. No end-to-end malformed-frame scenario through a production receive path; none exists in Phase 3A.
  15. The authentication-expiry and attestation scenarios are interrupted by the harness, not by a production detector; none exists in Phase 3A.
  16. `export-evidence.ts` imports `packages/supervisor/src` by a relative path without a declared package dependency.
  17. The tests that a host which never acknowledges a command is treated as host failure at 250 ms stop the host with `SIGSTOP`; no test exercises a host that keeps running but drops command acknowledgements, as the first review of pull request 205 noted in its Finding 4.
  18. `manifest_hash` does not cover `redaction_rules_applied`.
  19. A lost exit code in the M23 and M24 build log.
- From the Task 23 merge entry of the correction-round log:
  20. O1: on the test-only output path, `outputSeqs.set` runs before the byte copy, so a failed copy leaves the last accepted `outputSeq` advanced.

A4. **Budgets.** Plan §11.3 counts rounds per rubric milestone. The correction-round log shows rubric milestone 10 at 2 for the Codex builder sessions of the M23 and M24 build, rubric milestone 6 at 2 and rubric milestone 7 at 3, both reassigned. The items of B1 touch paths that map to several rubric milestones, so the builder and the split of that work are rulings for the act that authorizes it.

A5. **The drafting assistant.** It drafted this act and proposed each disposition. None of that is an independent review.

## Part B: Founder rulings

B1. **Taken up before Task 58.** Items 1, 3, 4, 5, 7, 8, 9, 10, 12, 13, 17 and 18 are taken up by one or more hardening builds, each authorized by its own act, and each merged before Task 58's candidate commit is fixed. Each change is the smallest that closes its item, with a test that fails without it:
1. Item 1: production starts the PTY host so that no `.env` file in its working directory reaches its environment, with a test that seeds a synthetic file and finds none of its values in the host's environment.
2. Item 13: `export-evidence` writes a fresh package and publishes it only when complete, so that no file it did not write is in the package, with a test that plants a synthetic file first.
3. Item 18: `manifest_hash` covers `redaction_rules_applied`, with a test that changing the rule list changes the hash.
4. Items 3, 4, 5, 7, 8, 9, 10 and 12: the tests the items name. For item 9, the test records every path created inside the preflight's temporary location during the call, including paths removed before it returns; if that cannot be done without a production change, the build halts for my ruling.
5. Item 17: a test in which a host keeps running but drops its acknowledgement of a command, and production treats it as host failure within the bounds of spec section 9.8, with the same assertions as the `SIGSTOP` test. If that needs a production change, or production does not detect it, the build halts for my ruling.
A hardening build may change only the production files items 1, 13 and 18 need and the test files the items of B1 need, and no `bun.lock` or manifest.

B2. **Phase 3B, not Phase 3A.** Items 2, 11, 14 and 15 concern the production path from a live PTY host and a live surface into the broker, which spec section 4.2 keeps closed in Phase 3A behind the `start` gate and which Phase 3B connects. They are not Phase 3A work. The acknowledgement deadline of spec section 9.8 applies to `pty_input` and `pty_resize` once production routes them, as part of items 2 and 11. Each is a stated limitation of Phase 3A, recorded in the Task 59 evidence and in the final merge review, and carried to the first Phase 3B act.

B3. **Closed as stated limitations, with no change.**
1. Item 6, all three parts, stays a stated limitation, recorded in the Task 59 evidence.
2. Item 16 stays as it is in Phase 3A. Declaring the dependency changes a manifest and `bun.lock`, and the import is permitted under plan Task 55 Step 6. It is carried to the first Phase 3B act.
3. Item 19 is history. The build log records what ran, and nothing is changed.
4. Item 20 affects only the test-only output path. It stays a stated limitation of that path, recorded in the Task 59 evidence.

B4. **The order of the rest of Phase 3A.**
1. Task 57, under an act that names my list of surfaces, and the M25 review.
2. The hardening builds of B1, in either order relative to step 1.
3. Task 58, at one candidate commit that contains every merge of steps 1 and 2.
4. Task 59, under its own act, on top of Task 58, with its Step 5 run on both certification hosts.
Between the fixing of Task 58's candidate commit and the final merge review, no code or test change merges other than Task 59's own commit, except under an act that also rules how Task 58 is repeated.

B5. **Task 59's act.** The act that authorizes Task 59 relies on these rulings and does not repeat them. It confirms that every build of B1 has merged and records the limitations of B2 and B3 in the Task 59 evidence.

B6. **A reading of plan Task 59.** Task 59 lists `docs/verification/phase-3a-correction-rounds.md` under Create, and its Step 3 says to create that log. The log exists and is kept under plan §11.3. Task 59 creates no new log, and changes the existing one only by the entries its act requires.

B7. **Counting.** These are new Founder rulings, which plan §11.3 does not count. They add no round. Each hardening build's verdicts count as plan §11.3 says, under the rubric milestone of each path they touch.

B8. **What this does not open.** This act authorizes no build. It does not authorize Task 57, Task 58 or Task 59, does not name my list of surfaces, does not close M10, M25 or M26, and changes no earlier ruling except as B3 and B6 state.

## Part C: Filing

C1. One docs-only pull request files this act under `DEC-20261015-05` B3 and changes nothing else. It touches `docs/decisions/`, so under `AGENTS.md` as `DEC-20261031-01` amended it, it merges only by a Founder act naming its exact head.

## Part D: Not authorized

- Any change to code, tests, `bun.lock`, a manifest, the plan, the spec, `AGENTS.md` or any decision record other than this filing.
- Any hardening build, Task 57, Task 58, Task 59, and every other build.
- Any edit of the correction-round log.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-02

Actor-Id: founder
