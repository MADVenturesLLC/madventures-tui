FOUNDER-ACT-20261027-M22-EXECUTION-AUTHORIZATION: the M22 corrections, Task 49 and Task 50

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `23ce34bce1e74c9f462e4e4f3c96695e2aa78f72`
> **Binding base:** for each build, the `origin/main` commit its builder prompt names, which must contain this act and the merge of every build before it in B1
> **Read with:** `AGENTS.md`; plan §5 Tasks 49 and 50 and §11.3; spec §§5.4, 6.3, 9.3, 9.6 and 9.11; `DEC-20261015-03` B5 items 2 and 3; `DEC-20261018-03`; `DEC-20261020-01` B1 and B2; `DEC-20261022-01` Parts B to E; `DEC-20261023-01` Part B; `DEC-20261024-02` B7; my merge authorizations of pull requests 183, item 4a, 188, item 4, and 193, item 4

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What was checked.** The drafting assistant read, at the commit in the header, plan §5 Tasks 48 to 50, `DEC-20261018-03`, `DEC-20261020-01`, item 4 of my merge authorizations of pull requests 183, 188 and 193, `test/phase3a/runtime-harness.ts`, `test/phase3a/fixture-adapters.ts`, `packages/supervisor/src/preflight.ts` lines 130 to 145, `packages/broker/src/runtime-broker.ts` lines 230 to 295 and `packages/broker/src/in-process-client.ts` lines 340 to 365. It ran no test.

A2. **The order so far.** `DEC-20261020-01` B1 ordered the build of `DEC-20261016-01`, then Tasks 24 and 25, then Task 49, and suspended `DEC-20261018-03`. The first merged as pull request 183, Task 24 as pull request 188, Task 25 as pull request 193, and the stabilization build of `DEC-20261023-01` Part D as pull request 195, at the commit in the header.

A3. **Preflight callers.** `test/phase3a/runtime-harness.ts` calls `runPurePreflightWithDependencies`. Item 4a of my merge authorization of pull request 183 requires that, before any act authorizes a caller of preflight, a change make preflight fail with `repository_fingerprint` when the git common directory of the examined repository root differs from that of the examined worktree, with a test that fails without it. At the commit in the header, preflight compares the envelope's `repository` with the common directory of the repository root only. Tasks 49 and 50 run preflight through the harness, so this act authorizes callers of it, and cites `DEC-20261015-03` B5 items 2 and 3, `DEC-20261020-01` B2 and that item 4a.

A4. **The incident duplicate.** Item 4 of my merge authorization of pull request 193 requires of the act that authorizes M22 that `RuntimeBroker.publishIncident` refuse an already-durable `event_id` as `publish` does, with a test. At the commit in the header, `publish` checks `hasEventId` before its append and `publishIncident` does not.

A5. **The broker handle.** Item 4 of my merge authorization of pull request 188, with `DEC-20261024-02` B7, carries an advisory: when the build result reaches more code, expose a supervisor handle without `publish` or `publishIncident`. The harness holds the build's broker delegate internally and returns to tests only a bound client, the session storage and `close`.

A6. **Task 49 as suspended.** `DEC-20261018-03` authorized Task 49 at a binding base before Tasks 24 and 25, with four paths, harness wiring of `pty_input` and `pty_resize` to the writer's PTY host, and a timing exception in its B5. At the commit in the header, `InProcessBrokerClient.request` accepts `pty_input` and `pty_resize` as legal and routes neither to a host, so the lifecycle tests of Task 49 exercise that routing through the harness, not through production code.

A7. **The reviewer's quotes.** In the Tier-2 reports of pull requests 193 and 195, the reviewer quoted SHA-256 values, names and lines that are in neither the repository nor its own logs, while its runs, logs and conclusions held. Both merge authorizations rested on independent checks, not on those quotes.

A8. **The drafting assistant.** It drafted this act and the acts it amends. None of that is an independent review.

## Part B: Founder rulings

B1. **One act, three builds, in order.** This act authorizes, in this order, the M22 corrections of B2 and B3, Task 49 under B5, and Task 50 under B6. Each starts only from a builder prompt I sign that names a binding base containing this act and the merge of the build before it, and lands as its own pull request with its own Tier-2 review and merge authorization. This act replaces `DEC-20261018-03`.

B2. **The same-repository check.** In `packages/supervisor/src/preflight.ts`, preflight fails with `repository_fingerprint` when the real path of the git common directory of the examined repository root differs from that of the examined worktree. `packages/supervisor/test/preflight.test.ts` gains one test, `preflight fails with repository_fingerprint when the repository root and the worktree belong to different repositories`, which fails without the check; the file then holds twenty-nine tests. With this check on `main`, Tasks 49 and 50 may run preflight, and only through the harness.

B3. **The incident duplicate.** Before its `appendMany`, `RuntimeBroker.publishIncident` refuses an event whose `event_id` is already durable, with `invalid_command` and detail `publish: duplicate event_id`; it appends nothing, publishes no observation, interrupts nothing, and the client returns that result. `packages/broker/test/incident-atomicity.test.ts` gains one test, `a duplicate incident event_id is refused without appending or interrupting the session`, so that it holds seven; `DEC-20261022-01` B9 is amended accordingly. `appendMany(` still occurs exactly twice in `runtime-broker.ts`.

B4. **The corrections build.** One commit that changes exactly `packages/supervisor/src/preflight.ts`, `packages/supervisor/test/preflight.test.ts`, `packages/broker/src/runtime-broker.ts` and `packages/broker/test/incident-atomicity.test.ts`, each only as B2 and B3 rule, with the subject `fix: bind preflight to one repository and refuse duplicate incidents`. D1 to D3 of `DEC-20261022-01` apply under `DEC-20261023-01` Part B, with these RED runs and breaks: each new test fails before its change, and fails again when that change is removed; D3 runs both test files five times in a row, then `bun test packages/supervisor` and `bun test packages/broker` with 0 fail, then the bare suite.

B5. **Task 49.** `DEC-20261018-03` B1 to B4, C1 and C2, D1 to D4 and E1 to E3 bind Task 49, with these changes:
1. The binding base is the one B1 names, and every path not in its C1 stays byte-identical to it.
2. Its B5 is revoked. No timing exception and no known-failure set applies on any host, and `DEC-20261023-01` Part B governs every failure.
3. The harness returns to tests only what the lifecycle needs, such as bound clients, the session storage, `close` and a function that interrupts the session with a typed reason. It never returns the broker, the build's broker delegate, the ledger, or any function that publishes, appends or calls `publish` or `publishIncident`. This settles the advisory of A5 for M22 without a production change.
4. The pull request description states, as a limitation, that `pty_input` and `pty_resize` reach the PTY host through the harness, not through `InProcessBrokerClient`, and the act for M23 or a later act rules whether production routes them.
5. Its D4 reads "full suite passes with 0 fail".

B6. **Task 50.** Plan Task 50 is authorized as written, with one commit that changes exactly `test/phase3a/environment-equality.test.ts` (new, the three tests the plan names) and `test/phase3a/fixture-adapters.ts`, and `test/phase3a/runtime-harness.ts` only if a capture the plan requires cannot be made otherwise, which the builder records under Deviations. No production file changes. The plan's RED run and Step 5 bind, D2 adds one break that lets an ambient variable outside the allowlist reach one of the four consumers, and D3 runs `bun test test/phase3a` and `bun test packages/supervisor` with 0 fail, then the bare suite.

B7. **Builders and reviewers.** Each build's builder is a fresh Codex CLI session on my MacBook, with Actor-Id `session:codex/m22-corrections-r1`, `session:codex/m22-task49-r1` or `session:codex/m22-task50-r1`, in its own clone under `/Users/michaeldaley/builds`, under `DEC-20261023-01` Part B. Each reviewer is a fresh Gemini 4 session on Antigravity on my MacBook, reviewer id `antigravity`, which has seen no material of that build. Each commit ends with the three trailers `Role-Id: builder`, that Actor-Id and `Execution-Surface: codex`.

B8. **Quotes in review reports.** For the rest of Phase 3A, `DEC-20261023-01` Part B gains this rule. Every review prompt names a log folder. A reviewer quotes a command's output only by copying it from its log, and names that log beside the quote; every SHA-256 it gives of a repository file is the output of a command in a log. Before I post a verdict, I run a check that every log in the folder appears in the report by its SHA-256 and that each SHA-256 the report gives of a repository file matches the file in the review clone. A quoted value found in no log and not in the repository is recorded in the merge authorization, and the verdict rests only on what is verified.

B9. **Deferred.** These stay for a later act and are not M22 work: the fencing test's value-import check that an indented import passes; the doctor tests' checks of the working directory only and of any check status; the blindness of "preflight creates nothing" to a file created and removed within the call; the test of a worktree named through a symbolic link; and production routing of `pty_input` and `pty_resize`.

B10. **Checkpoints and counting.** This act closes no checkpoint. M22 closes by a later act after Task 50 merges. This is a new Founder ruling, which plan §11.3 does not count, and it adds no round; each build's substantive findings count as plan §11.3 says.

## Part C: Filing

C1. One docs-only pull request files this act under `DEC-20261015-05` B3. The corrections build starts only after it merges.

## Part D: Not authorized

- Any build out of the order of B1, or any path beyond those B4, B5 and B6 name.
- Any production change in Task 49 or Task 50, any change to the production `start` gate, any real provider executable or live attester for a real surface, and any caller of preflight other than the harness.
- M23 and any later milestone or task, and any change to the plan, the spec or any decision record other than this filing.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-27

Actor-Id: founder
