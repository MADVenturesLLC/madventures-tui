FOUNDER-ACT-20261012-UBUNTU-TESTS-4-6-INVESTIGATION: tests 1 to 3 closed, and the investigation of tests 4 to 6 and the certification runtime authorized

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `8f9e1faef2ba5c358d2b78416074bf5d5793a933`
> **Governs:** `DEC-20261011-02` B7 and the open tests of its A2; `DEC-20261012-01` B4 and B6 items 1 and 2
> **Read with:** `DEC-20261011-02` (SHA-256 `0d163c6aa931d0d52a94bd3f5ad4df3cdf3925caef6d80f2429415d03328fafd`), `DEC-20261012-01` (SHA-256 `ed3443e7c88af827dfc2d9792a1ef994568f8a8e6184b4aa76569bfefd584d83`), the Ubuntu spike report `docs/verification/2026-10-11-bun-terminal-spike-ubuntu.md` (SHA-256 `670653fd50a6107f40503a9942d59b5574f83101d3a345708d97cbfa208b8e88`), spec §1.5

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What is owed.** `DEC-20261011-02` B7 sends the root cause and fix of tests 4 to 6 to a separate act, and requires the fix on `main` before Task 46 is authorized. `DEC-20261012-01` B4 makes Bun 1.4.2 the certification runtime only provisionally, until this line of work settles it. Its B6 item 2 leaves tests 1 to 3 in the known-failure set until a later act closes them.

A2. **What has been observed.** The open tests have behaved as follows:

| Where | Bun | Test 4 | Tests 5 and 6 |
| --- | --- | --- | --- |
| CI Verify, `ubuntu-24.04` | custodied revision `69cb78c9097cebd3bdb832d9fff8b7d23abce09e` | pass | pass |
| The drafting assistant's own Linux container (Ubuntu 24.04, kernel 6.18), 2026-10-11 | 1.3.11 | pass | fail, timed out at 4,000 ms |
| My Ubuntu PC (Ubuntu 26.04.1, kernel 7.0.0-38-generic), 2026-10-11 run of `DEC-20261011-02` B4 | 1.4.2 (revision `744846f844374847c902b5e7fd59b4342a51ef99`) | fail, `MADV_FIXTURE_MARKER` missing in the child | fail, timed out at 4,000 ms |

The container is not a certification host, and its row is an observation only. On my PC the test 4 fixture's awk program printed both variable names when run directly, so the variable is lost between the supervisor, the PTY host and the child, not in awk. Tests 5 and 6 wait for a child that exits on its own, and that path depends on the child-liveness probe of spec §1.5 row 1.

A3. **Why the Bun build is the lead.** CI installs the custodied revision through `.github/actions/setup-qualified-bun`. That action carries an expiry guard that fails the job if any official Bun release published on or after 2026-08-23 contains the fix the custodied revision was built for, upstream pull request 40304. Verify passed on PR #138 on 2026-10-12. On the drafting assistant's reading of the action, no official release published since that date contains the fix. Whether Bun 1.4.2 contains it, and what the fix changes, have not been established. The pattern in A2 fits a cause in the Bun build. A cause in the host is not ruled out.

A4. **Tests 1 to 3.** They failed in my terminal and in the Task 37 builder's session during the Task 37 build (`DEC-20261010-04` A2 item 4), and passed in the review session and in the run of `DEC-20261011-02` B4, with Node.js v22.22.1 on `PATH`. The cause of the earlier failures was not established. Spec §1.5 now makes Node.js 20 or later a prerequisite on every certification host.

A5. **The drafting assistant.** It drafted this act and read the action and the tests. It ran nothing on my PC. None of that is an independent review.

## Part B: Founder rulings

B1. **Tests 1 to 3 are closed.** They leave the known-failure set of `DEC-20261011-02` B2. From this act on, a failure of any of them on any host is a stop like any other failure.

B2. **The investigation run is authorized.** I run it on the Ubuntu PC myself, from a run script that the drafting assistant drafts after this act is on `main`. I read the script before I run it, and the report records its SHA-256. The run:

1. creates a fresh detached clone at the then-current `origin/main` commit and records that commit; no existing checkout is touched;
2. runs `bun install --frozen-lockfile` with Bun 1.4.2, with the tree, lockfile and mode-restore rules of `DEC-20261011-02` B4 item 2;
3. fetches the custodied runtime read-only from `MADVenturesLLC/os-governed-artifacts`, at tag `refs/tags/intake/bun-pr40304-69cb78c9097cebd3bdb832d9fff8b7d23abce09e/v1`, into its own directory outside the clone, using my own GitHub sign-in without printing or storing any token. The run then confirms four things: the tag resolves to commit `3b5775a57da95ad6446e68036746b6308a0d5904`; `MANIFEST.sha256` verifies; `bun-linux-x64.zip` is extracted inside that directory; and the extracted binary reports `Bun.revision` `69cb78c9097cebd3bdb832d9fff8b7d23abce09e`. That binary is called by its full path only. It is not put on `PATH`, does not replace `~/.bun` and is used for nothing outside this run;
4. records, from the public GitHub API read-only, the title, state and merge status of `oven-sh/bun` pull request 40304, the publication date of the Bun 1.4.2 release, and whether its tag contains the commit the custodied revision was built from;
5. runs each of tests 4, 5 and 6 alone, three times with Bun 1.4.2 and then three times with the custodied binary;
6. runs `bun test test/phase3a` once and the full suite once, both with the custodied binary; and
7. confirms `git status --porcelain` is empty at the end.

Test results in items 5 and 6 are recorded, not judged. A failure in items 1 to 4 or 7 stops the run, with its evidence kept. Nothing in either repository is changed, and nothing is pushed.

B3. **The report.** The run script writes a report only from the run's retained evidence, to `/home/michaeldaley/ubuntu-b7-evidence/report/`, outside the clone, with the SHA-256 of each evidence file and a final `Report SHA-256:` line. It is not filed by this act.

B4. **What follows.** After the report, a separate act rules on four things:

1. the cause of tests 4 to 6;
2. the certification runtime of `DEC-20261012-01` B4;
3. the fix and who builds it; and
4. the filing of the report.

`DEC-20261011-02` B7 still requires the fix on `main` before Task 46 is authorized.

B5. **Task 45.** Task 45 does not wait for this act or the run. It may be authorized by its own act.

B6. **Counting.** This is a new Founder ruling, which plan §11.3 does not count. Rubric milestone 1 stays at **5** and rubric milestone 4 at **3**.

## Part C: Filing

C1. One docs-only pull request files this act and changes nothing else. The run of B2 starts only after it merges.

## Part D: Not authorized

- Any change to code, tests, `bun.lock`, a manifest, a workflow, the plan, a spec or `PLAN-OPEN-2`.
- Any change to `MADVenturesLLC/os-governed-artifacts`.
- Using the custodied binary as a default runtime, in any builder or reviewer session, or for any certification run.
- The ruling of B4, Task 46 and every later task.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-12

Actor-Id: founder
