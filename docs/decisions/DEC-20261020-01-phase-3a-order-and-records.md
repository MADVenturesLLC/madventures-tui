FOUNDER-ACT-20261020-PHASE-3A-ORDER-AND-RECORDS: Tasks 24 and 25 before Task 49, the preflight advisories, retention, and the records of 2026-10-16 to 2026-10-20

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `1bd41aeb58a12acfc0aae583ffecab80cd7eb0ea`
> **Read with:** `AGENTS.md`, its approval gates; `DEC-20260924-03` B3; `DEC-20261015-03` B4 and B5; `DEC-20261015-05` B4 and B5; `DEC-20261016-01`; `DEC-20261017-02` B5 and B7; `DEC-20261017-03` B5 and B7; `DEC-20261018-02`; `DEC-20261018-03`; plan section 4 and Tasks 24, 25, 48 and 49; spec §9.1

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What was checked.** The drafting assistant read `main` at the commit in the header, the acts filed since `DEC-20261016-01`, and the comments and events of pull requests 155 to 179 on GitHub. It ran no test and reviewed no code for correctness.

A2. **The independence-domain advisory.** `DEC-20261015-03` B5 item 2 requires that, before any act authorizes a caller of `runPurePreflight`, preflight fail with `identity_mismatch` when an execution's `independence_domain` differs from its registration, and that the authorizing act cite that item. `DEC-20261018-02` B1 authorizes the Task 48 harness to consume `runPurePreflight` and cites neither item. `test/phase3a/runtime-harness.ts` on `main` calls `runPurePreflightWithDependencies`, and `packages/supervisor/src/preflight.ts` compares the provider only. The build of `DEC-20261016-01`, which adds that check, has not run. Item 3 of the same B5, envelope repository binding, has not been ruled.

A3. **Tasks 24 and 25.** `DEC-20260924-03` B3 places Tasks 24 and 25 after M21 and before M22. Neither `packages/broker/src/publish-legality.ts` nor `packages/broker/test/incident-atomicity.test.ts` exists on `main`, while Task 48 of M22 has merged and Task 49 is authorized.

A4. **Retention.** `DEC-20261015-03` B4 left plan question (iii) open for a later act before any task projects the snapshot's `executions` member. Pull request 177, merged as `93ad94842967`, projects execution launch facts into snapshots under a Founder-approved prerequisite document with SHA-256 `f205e72b0d465ba372f74be5fb63e86f285a7adce9715a18db6c5dd2d6465b32` and supplement `738c667c6bb25f343992d27695a527221c55e28043d935905fa0140fafcfcc39`, not under a filed act.

A5. **Records.** From pull request 162 through pull request 179 no merge authorization comment is posted on any merged pull request, including pull requests 155, 157, 167, 171, 172, 174, 176, 177, 178 and 179, which change code or tests. Pull request 155 merged at head `75f46426a05e7f0f9d02399093969872814691f3` and pull request 157 at head `d4a1d679f64464523b24a54deae3baa1bd7b0500` with only a round 1 FAIL report posted on each; the final verdicts are neither posted nor in the rounds log. The PASS verdicts of pull requests 167, 174 and 177 are posted by `daley40-lab` and are not in the rounds log. Pull request 167 left draft by `daley40-lab`, not by the guarded command of `DEC-20261015-05` B4. `DEC-20261018-02` A1 states that M21 closed, as basis only; no act rules the M21 or M25 checkpoint closed.

A6. **The drafting assistant.** It drafted `DEC-20261016-01` and this act. It did not draft the acts filed from `DEC-20261016-03` on, and it has not reviewed the code merged since `be996b1fd7ccbc1f5fdee914b1e9de31020b8461`. None of this is an independent review.

## Part B: Founder rulings

B1. **Order.** The next work in Phase 3A runs in this order:

1. the build of `DEC-20261016-01`, as B3 and B4 amend it;
2. Task 24, then Task 25, under an act or acts I sign for them;
3. Task 49.

`DEC-20261018-03` is suspended. No Task 49 build starts until Tasks 24 and 25 have merged, and its builder prompt then names a binding base containing them.

B2. **The advisory breach.** I record that `DEC-20261018-02` B1 authorized a caller of preflight contrary to `DEC-20261015-03` B5 item 2. The harness merged by pull request 174 stays on `main`. No act authorizes any further use of preflight, through the harness or otherwise, until the change of `DEC-20261016-01` B1 and the binding of B3 are on `main`. Every such later act cites `DEC-20261015-03` B5 items 2 and 3 and this B2.

B3. **Envelope repository binding.** `DEC-20261015-03` B5 item 3 is ruled. Preflight fails with `repository_fingerprint` when the `realpath` of the envelope's `repository` differs from the repository root it examines, when the envelope's `worktree` differs from the worktree it examines, or when the envelope's `repository_fingerprint.git_sha` differs from that worktree's `HEAD`. The envelope's `repository_fingerprint.sha256` is not compared, because its form differs from the fingerprint of `DEC-20261013-01` B4; a later act defines it. The build of `DEC-20261016-01` implements this binding, with one more test in `preflight.test.ts`, named `preflight fails with repository_fingerprint when the envelope names another checkout or commit`, which then holds twenty-five tests. If the binding makes any test outside the C1 paths of `DEC-20261016-01` fail, the builder stops for my ruling.

B4. **The builder and reviewer of `DEC-20261016-01`.** Its B6 and B8 are replaced: the builder is a fresh Codex CLI session on my MacBook, with Actor-Id `session:codex/m20-corrections-r1`, the macOS certification runtime of `DEC-20261013-03` B2 item 1 under the PATH rule that the Task 56 builder prompt applied, and the limits of item 3a of my merge authorization of pull request 153; its only workspace is its clone. The reviewer is a fresh Gemini 4 session on the Antigravity surface on my MacBook, under the cross-assignment of `DEC-20261017-02` B7 and `DEC-20261017-03` B7. Its B9 is replaced by B1 of this act. Its B4 extends to every test in `attestation.test.ts` that the exceptions of `DEC-20261017-02` B5 and `DEC-20261017-03` B5 name, and those exceptions end when its pull request merges. Its D3 run of `attestation.test.ts` five times in a row is made on the MacBook.

B5. **Retention.** Plan question (iii) is ruled: execution launch facts are retained and projected into the snapshot's `executions` member as merged by pull request 177. This act files the approval of A4 as the ruling `DEC-20261015-03` B4 requires. The act for Task 24 reads the `executions` member as pull request 177 leaves it.

B6. **Merges without a posted authorization.** I ratify each merge named in A5 at the merge commit `main` records for it. From this act on, every merge has a merge authorization posted before it and naming the exact head, as `AGENTS.md` and `DEC-20261015-05` B5 require, and every pull request leaves draft only by the guarded command of `DEC-20261015-05` B4.

B7. **Verdict records.** Before the docs pull request of C1 opens, I post on pull requests 155 and 157 the final verdict of each, with its reviewer id, the exact head and the SHA-256 of its saved report. That pull request appends to `docs/verification/phase-3a-correction-rounds.md` one entry each for the final verdicts of Tasks 46 and 56, the verdicts of Tasks 47 and 48, and the review of pull request 177, each with its reviewer id, head, report SHA-256, comment id and count, from the reports I name in its filing prompt.

B8. **Checkpoints.** This act closes no checkpoint. `DEC-20261018-02` A1 is read as basis, not as a closure. M21 closes by a ruling in a later act after the entries of B7 for Tasks 46 and 47 are on `main`. M25 closes after Task 57.

B9. **Counting.** This is a new Founder ruling, which plan §11.3 does not count. It adds no round, and every count stands as the rounds log records it.

## Part C: Filing

C1. One docs-only pull request files this act and the rounds-log entries of B7, and may file other acts I sign before its filing prompt is signed. It changes nothing else.

## Part D: Not authorized

- Any Task 49 build, and any further use of preflight, before B1 and B2 allow it.
- Any change to code already merged, other than by the build of `DEC-20261016-01` as amended here.
- Any revert of the pull requests named in A5.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-20

Actor-Id: founder
