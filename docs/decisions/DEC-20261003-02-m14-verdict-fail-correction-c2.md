FOUNDER-ACT-20261003-M14-CORRECTION-C2: M14 review verdict FAIL accepted, correction round counted, one correction authorized, Task 33 coverage disposition ruled

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Head reviewed:** `515eba9ff573eab3820b12900d4f734468395d84`
> **Review request act:** `docs/decisions/DEC-20261003-01-m14-review-request.md`, transfer commit `e38f52b2de7df5a848ec464b8f356e4d846fa1b3`, file SHA-256 `1a7acd2e1d2a78116685d37594373ec1161b831eb33e6a6b9a3991da45d09b16`
> **Acceptance act:** `docs/decisions/DEC-20261002-01-m14-task34-acceptance.md`, merged as `b5ea492e529483102103744a2ede46f3be429e9f`, file SHA-256 `c4b49be73c7ee42dd2c3f6743443966faddf6f4fce0711f9db7773baa171ed6b`
> **Verdict file:** `~/verdicts/m14-515eba9-codex-review.txt`, SHA-256 `323a58be2e0580291832f36d955ad8177a1126ba485aaa82008f2d2fcf77da3f`, 24,831 bytes, 391 lines
> **Plan:** `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md`, Task 34 Step 1, section 11.3 and section 12.3

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The verdict.** The non-authoring review requested by the review request act returned `Final Verdict: FAIL`, with `Tier2-Reviewer-Id: codex` and `Tier2-Head-Sha: 515eba9ff573eab3820b12900d4f734468395d84`, in the form that act B5 requires. It reports five findings, called F1 to F5 in the verdict. This act calls them V1 to V5, so they are not confused with findings F1 and F2 of the acceptance act.

A2. **The findings, in one line each.**

- V1. In `test/phase3a/architecture-phase3a.test.ts`, the child runner counts decoded string length against the 65,536 cap. That counts UTF-16 code units, not bytes. The reviewer's executed probe wrote 65,538 bytes, the runner saw 32,769 units, and `overflowed` stayed false.
- V2. The TUI path never rejects `timedOut`, and its acceptance predicate allows exit code 0 without readiness before exit. The reviewer's executed probe printed the readiness token after 5,050 ms, and the current assertions accepted that outcome.
- V3. The required socket-absence checkpoints are missing at readiness, and the checks that exist run after outcome assertions that can throw, then the directory is removed. The runner also resolves on `exit` or `error`, not on stream close.
- V4. In `test/phase3a/negative-control.ts`, both `lstatSync` calls swallow every error. The reviewer's executed fault injection with `EACCES` returned no match and no diagnostic.
- V5. Task 33 removed or weakened PTY coverage in `apps/madbridge/test/pty-focus.test.tsx`, and plan section 12.3 requires a Founder-visible disposition recorded in `docs/verification/phase-3a-correction-rounds.md`. None is recorded.

A3. **What the drafter checked itself.** The drafter is an assistant. This is its own reading and is not an independent review. It read the code at `515eba9ff573eab3820b12900d4f734468395d84`, the Task 34 Step 1 text, plan sections 11.3 and 12.3, and the rounds log. It found V1 to V4 in the code as the reviewer describes them and found no PTY-coverage disposition in the log. It did not re-run the reviewer's probes.

A4. **Facts the drafter found that bear on V5.** Item 10 of `docs/decisions/DEC-20260902-01-task33-phase1-annex-r5.md` authorizes retargeting "the five `PtyManager` cases" in `apps/madbridge/test/pty-focus.test.tsx` to `createFakeByteRouter`. It does not mention removing any case or dropping any assertion. The header of the file at the reviewed head says four original cases instantiated `PtyManager`, two were retargeted, two were removed and deferred to the PTY-host milestone, and the original `getFocused()` and `terminateAll()` assertions were removed. The drafter did not reconcile five against four.

A5. **Findings that the verdict ties to open threads.** The verdict reports that the PR #93 threads for the byte cap (V1) and the swallowed `lstatSync` errors (V4) were marked resolved with no remediation reply, and that the code at the reviewed head still has both defects.

## Part B: Founder rulings

B1. **Verdict accepted as a FAIL.** The verdict is accepted as a FAIL at `515eba9ff573eab3820b12900d4f734468395d84`. This act does not accept it as closing the M14 review checkpoint. The checkpoint stays open.

B2. **Freshness disclosure.** The reviewer disclosed that its session had seen the builder's report for correction C1 and the PR #93 and PR #94 descriptions. The Founder accepts the review as valid despite that. V1 to V4 stand on the code at the exact head and on the reviewer's executed probes, and the drafter confirmed each by reading the code. This is not precedent for another review.

B3. **CI version statement.** Part B3 of the review request act says CI pins Bun 1.3.14. The reviewer found that `.github/workflows/verify.yml` selects a qualified custodied Bun revision. The statement is withdrawn. It had no effect on any result. Reports in this correction state the Bun version actually used and make no claim of parity with CI.

B4. **Counting.** The FAIL is a substantive finding against deliverables of Task 33 and Task 34, and under act D1 of the acceptance act and act B6 of the review request act it is one correction round. Under plan section 11.3 one verdict adds at most one round per rubric milestone, however many findings it holds. It is counted under rubric milestone 9, which covers M1, M12, M13 and M14. At the reviewed head the rounds log has no rubric milestone 9 entry, so this is round 1 of 2. A second counted round ends the builder assignment under section 11.3 and requires reassignment. Correction C2 is the remedy for round 1 and adds no round of its own.

B5. **V1 to V4 are defects in the deliverables.** Task 34 Step 1 requires byte caps that apply throughout the child lifetime, a 5,000 ms deadline, rejection of early exit and of missing readiness by the deadline, and socket-absence checks at every assertion point with directory cleanup only after the final checks. The proof as merged does not meet these. Correction C2 is required.

B6. **V5 disposition.** Task 33 was authorized by the annex to retarget PTY cases to the fixture byte router. It was not authorized to remove cases or drop assertions, and the weakening was disclosed in PR #94 but never recorded in the rounds log. The Founder rules as follows.

- The weakened coverage in `apps/madbridge/test/pty-focus.test.tsx` is accepted as merged. `PtyManager` is quarantined from production reach by Task 33 and dormant, and the architecture test proves that quarantine.
- The assertions on focus state and on `terminateAll()` cleanup, and the snapshot read-only case, are not restored by this act. They are owed to the PTY-host milestone and must be restored or explicitly re-ruled there.
- The disposition is recorded in the rounds log under this act. This act is not a general waiver of plan section 12.3. It covers this file and these removed assertions only.
- The difference between five cases in the annex and four in the file header is recorded as an open fact. The Founder does not rule on it here.
- This ruling adds no round and requires no code change.

B7. **Unruled advisories.** The reviewer's advisories are noted and not ruled here: the scanner's gaps for dynamic imports, `require` and extension-suffixed specifiers; the absence of a committed negative mutation test for the C1 lockfile scan, which this correction does not change; the doubled quotes in the C1 root-label message, which are cosmetic; the unruled convention and performance advisories on PR #93; and the Task 33 launch evidence accepted by exception. None is a finding of this act.

## Part C: Authorized scope

C1. One correction pull request from a new branch cut at `origin/main`, with one commit changing exactly two paths: `test/phase3a/architecture-phase3a.test.ts` and `test/phase3a/negative-control.ts`. The commit corrects V1 to V4 as follows.

- V1: the cap counts bytes, using the byte length of each received chunk, for stdout and for stderr separately, from spawn until the child's streams close. Output the child writes after readiness or after SIGTERM still counts.
- V2: the TUI path rejects `timedOut`. It requires readiness to have been observed before the deadline and before exit. It rejects exit code 0 without prior readiness, and it rejects any signal termination before readiness. SIGTERM and SIGKILL after readiness stay accepted as the expected cleanup outcomes.
- V3: both socket paths are checked at readiness, before the test terminates the child, and after the child is reaped. The runner resolves only after the child has exited and its streams have closed, or after spawn failure. The socket-absence assertions in both the CLI and the TUI path run before any outcome assertion that can throw. The disposable runtime directory is removed only after the final socket-absence assertions, including on failure paths.
- V4: a `lstatSync` error that is not a vanished-path race is recorded in the sweep's `errors` list, and the script prints it as it prints `readdirSync` failures. A vanished path is still ignored. The exit rule stays as it is: matches and the runtime-directory check decide exit 1, and an unreadable entry stays an observation.
- Keep the 5,000 ms deadline, the 500 ms grace, the 65,536 cap, the `NOCONN` readiness token and its disclosed deviation, and every other behavior of the two files that these findings do not touch.

C2. The commit adds committed tests that prove each fix can fail. For each of V1 to V4 there is a committed test that is RED against the runner or sweep as it stands at `515eba9ff573eab3820b12900d4f734468395d84` and GREEN after the fix. A test must not pass vacuously on any user id. If a test depends on file permissions and cannot run as uid 0, the builder uses another injection and says so.

C3. Prove RED before GREEN. The builder runs the new tests against the unfixed code and records the failures, then fixes the code and records the passes. It also runs the full bare `bun test`, `bunx tsc --noEmit` and `bun install --frozen-lockfile`, and reports each count that Bun prints. It states the Bun version used and that CI uses a qualified revision.

C4. The correction pull request is opened as a draft. Marking it ready and merging it each need a separate Founder act naming the exact head.

C5. The commit message and the pull request body end with the three attribution trailers as their final paragraph, with no bare three-hyphen line. Commits and artifacts are named by full 40-character SHA and full 64-character SHA-256.

## Part D: Recording

D1. One docs-only pull request files this act, the review request act `DEC-20261003-01`, and a rounds log entry that records: the review request and the head reviewed; the verdict result and its SHA-256, never its text; findings V1 to V5 in one line each; round 1 of 2 under rubric milestone 9; the V5 disposition of B6; and that C2 is authorized and the M14 review checkpoint stays open. The filing pull request is a draft, merges by merge commit with the head pinned, and changes exactly the two act files and `docs/verification/phase-3a-correction-rounds.md`.

D2. The verdict is posted verbatim as one comment on PR #113 by a session or person the Founder directs, with a header that names the head, the file SHA-256 and this act. The drafter has not posted it.

## Part E: After the correction merges

E1. A non-authoring review of the exact merged head follows, requested by a later act that names the reviewer id and the evidence rules. It covers V1 to V4 as corrected, any regression in Task 33 and Task 34, and the rounds log entries made under Part D.

E2. A second FAIL on substantive findings is round 2 under rubric milestone 9. A third counted round requires reassignment under section 11.3.

E3. The M14 review checkpoint closes only by a Founder act that accepts a PASS or PASS-WITH-ADVISORIES verdict. Until then Task 35 and everything after it in M15 stay unauthorized.

## Part F: Not authorized

- Task 35, M15 and every later task.
- Any change to a path other than the two in C1, including `bun.lock`, every `package.json`, `README.md`, `apps/madbridge/test/pty-focus.test.tsx`, a decision record other than the filing under Part D, the plan, and the rounds log in the correction pull request.
- Restoring the removed PTY assertions, changing the C1 lockfile scan, and ruling on any advisory in B7.
- Marking the correction pull request ready, merging it, resolving a review thread, or posting any Founder authorization from a session.
- Treating B2 or B6 as precedent.

## Part G: Signature

Signed:

— Michael Daley

Date: 2026-10-03

Actor-Id: founder
