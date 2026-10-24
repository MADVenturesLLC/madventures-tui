FOUNDER-ACT-20261023-STANDING-BUILD-RULES: standing rules for builders and reviewers, the Task 24 correction, and the stabilization build

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `942c225bb3d4c772ad68c9cac2a7d494655758b9`
> **Binding base:** for the Task 24 correction of Part C, the head `c201cde18077b789b8aefe7c5f88db61d44649e5` of pull request 188 on the binding base `942c225bb3d4c772ad68c9cac2a7d494655758b9`, with this act on `main`; for the stabilization build of Part D, the `origin/main` commit its builder prompt names, which must contain this act and the merge of Task 25
> **Read with:** `AGENTS.md`; plan §11.3; `DEC-20261013-03` B2; `DEC-20261015-05` B1 to B7; `DEC-20261021-01` B3; `DEC-20261022-01` B2 to B10, C1, C2, D1 to D3 and E1 to E3; `DEC-20261022-02` B5

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What was checked.** The drafting assistant read, at the commit in the header and at `c201cde18077b789b8aefe7c5f88db61d44649e5`: `AGENTS.md` under "GitHub credentials and identity (agent sessions)"; `DEC-20261022-01` Parts B to E; plan Task 25; `packages/broker/src/runtime-broker.ts`, `packages/broker/src/in-process-client.ts`, `packages/broker/src/publish-legality.ts` and `packages/broker/src/client.ts` lines 75 to 104; `packages/ledger/src/ledger.ts` and `packages/ledger/src/schema.ts`; `packages/supervisor/src/build.ts` lines 739 to 800 and 980 to 995; `packages/supervisor/test/build.test.ts` lines 1 to 100; `apps/madbridge/test/doctor.test.ts` lines 1 to 45 and `apps/madbridge/src/commands/doctor.ts` lines 38 to 70; `packages/supervisor/test/preflight.test.ts` lines 223 to 232; and `packages/supervisor/test/build-rollback.test.ts` lines 798 to 800 and 857 to 870. It read the Task 24 builder's stop reports and final report, the Task 24 Tier-2 report, and the reviews of pull request 188. It ran no test of this repository for this act.

A2. **Why standing rules.** The Task 24 build needed six addenda to its builder prompt. Four answered questions that recur on every task: existing tests that start executables (addendum 1), unrelated baseline failures (addendum 2), a session without `GH_TOKEN` that makes no GitHub call (addendum 5), and a changed Bun runtime (addendum 6). One stopped for a typecheck error in the builder's own new test (addendum 3). One moved the base after a fragile test failed (addendum 4). Each cost a full round.

A3. **The Task 24 Tier-2 review.** The verdict on pull request 188 at `c201cde18077b789b8aefe7c5f88db61d44649e5` is PASS with no findings: comment 6375320541, report SHA-256 `4db3d56c28eccf1aa6c224b3b58f378c53469a5642a0cb126eedb565e3351c1f`. Its section 5 records two mutations that all nineteen tests of `publish-legality.test.ts` let pass: moving the reference checks of B2 step 5 ahead of the readiness check of step 4, and checking `session_mismatch` before the principal check of step 2. The head decides in the correct order.

A4. **The other reviews of pull request 188.**

1. Copilot review 5634847864, comment 4364542180, rated high: the broker handle `packages/supervisor/src/build.ts` gives every client it builds, including each adapter's execution-bound client, is a delegate made with `Object.create(RuntimeBroker.prototype)` that forwards `snapshotProjectionInput`, `activate`, `pause`, `resume`, `interrupt` and `founderClose` but not `publish`. Through that delegate, the inherited `publish` reads `this.deps` of an object that has none and rejects. The drafting assistant confirmed this at lines 744 to 796 and 987 to 990. The finding is correct: the only path `DEC-20261022-01` B6 permits does not work in production.
2. Cursor Security Reviewer, comment 4364562230, rated medium: `events.event_id` is `UNIQUE` in `packages/ledger/src/schema.ts`, and `RuntimeBroker.publish` treats every append failure as `ledger_write_failed` and interrupts with high severity. A ready execution can therefore end the session for every peer by publishing a schema-valid event whose `event_id` is already durable, although command legality withholds pause, close and interruption from executions. The finding is correct. `DEC-20261022-01` B3 ruled that every failed append interrupts, so the build followed the act, and the act was incomplete.

A5. **The fragile tests.**

1. `doctor: read-only invariant > no files created in cwd` runs `runCli` with the argument `doctor`, which calls `execSync` on the real `claude --version` and `agy --version` found on `PATH`, each with a 5,000 ms limit, inside a test whose own limit is 5,000 ms. It timed out at the Task 24 D1 baseline under load. `apps/madbridge/test/cli.test.ts` also runs `doctor` through `runCli` in several tests, and so also starts those executables.
2. `preflight creates nothing` compares a listing of the whole shared `tmpdir()` before and after preflight, so any other writer to that directory can fail it.
3. Rollback tests in `build-rollback.test.ts` compare the count of `/dev/fd` entries with a baseline taken earlier in the same test, so descriptors the runtime opens or closes for other reasons can fail them.

A6. **The drafting assistant.** It drafted this act, the acts it amends and the Task 24 prompts. None of that is an independent review.

## Part B: Standing rules for builders and reviewers

B1. **Scope.** Part B applies to every builder prompt and every review prompt I sign after this act is on `main`, for the rest of Phase 3A, including the correction of Part C. Each such prompt cites this act. Where a prompt and this act disagree, this act wins and the session stops and reports. Nothing in Part B relaxes D3 of any act, any Tier-2 review, the ready step, any merge authorization or the merge-commit method.

B2. **Existing tests.** A builder or reviewer runs the repository's existing test suites as they are, including whatever those tests start or run. Limits on executables and process listing govern the commands a session runs itself and the tests a builder writes. A session changes, skips or filters no existing test to avoid them. If a test's output would print the value of an environment variable, a token, a credential or a key, the session stops and reports without repeating the value.

B3. **The D1 baseline.** A failure at D1 of a test whose file is outside the task's authorized paths is recorded verbatim, with its failure output, as baseline state, and is not a stop. A failure at D1 in a file the task is authorized to change, and any error that stops a suite from running, is a stop.

B4. **Builder self-fix.** When the builder's own change fails `tsc` or a test in a file the task is authorized to change, the builder may fix it within those files and restart D3 from its first item. It may correct an assertion of a test it wrote in this task only so that the test states the behavior the act requires; it never removes or weakens a test or assertion the act names or requires, and never changes an existing test except as the act allows. It stops, without fixing, when a fix would touch any other path, when a failure is in a file outside its paths, or when it cannot tell whether a fix would weaken a required test. Under Deviations it lists every self-fix: the failure verbatim, the change, and the D3 restart.

B5. **No reruns to pass.** A failed run is never rerun unchanged to obtain a pass. D3 of every act stays fail-closed: any failure or error in it, outside B4, is a stop.

B6. **Logs.** Every test run of a builder or reviewer pipes its full output through `tee` into a log file under the folder its prompt names, one file per run, and reports each log's SHA-256. Logs are not truncated, compressed or encoded. A report quotes each run's summary and failure lines with its log's SHA-256. B2 governs logs too: if a run's output contains, or the session sees it would contain, the value of an environment variable, a token, a credential or a key, the session stops at once, does not open, quote, hash or copy that log, and reports only its path and the test that produced it; I delete the log before any further run.

B7. **GitHub.** Builder and reviewer sessions make no GitHub call: they run no `gh` command, including `gh auth status`, and load, request or check no `GH_TOKEN`. `git fetch` and `bun install` are their only network commands. A missing `GH_TOKEN` is not a stop for them. Sessions whose prompt assigns them GitHub operations, such as filing and correction sessions, keep the rules of `AGENTS.md` for `daley40-lab`. Part E amends `AGENTS.md` to say so.

B8. **The runtime.** No session and no person runs `bun upgrade`, or installs another Bun over a certification runtime of `DEC-20261013-03` B2, on any of my three hosts until Phase 3A closes. Every builder and reviewer runs the full runtime check of its prompt before D1 and again immediately before its bare `bun test`, and stops if either differs. Before I launch a builder or reviewer, I run a host check of the Bun runtime's SHA-256 and the load; that check is mine and is not part of any act.

## Part C: The Task 24 correction

C1. **Correction 1: the build delegate.** In `packages/supervisor/src/build.ts`, the broker delegate forwards `publish` to the open broker exactly as it forwards `pause`. Nothing else in that file changes.

C2. **Correction 2: a duplicate `event_id`.** `Ledger` in `packages/ledger/src/ledger.ts` gains `hasEventId(eventId: string): boolean`, a read-only query of the durable `events` table. Before its append, `RuntimeBroker.publish` refuses an event whose `event_id` is already durable with `invalid_command` and detail `publish: duplicate event_id`; it appends nothing, publishes no observation, interrupts nothing, and the in-process client returns that result. `DEC-20261022-01` B3 is amended so: only an append that fails for another reason interrupts with `ledger_write_failed`.

C3. **Correction 3: the ordering tests.** `packages/broker/test/publish-legality.test.ts` gains:

- `a sender that is not ready fails at step 4 before any reference check`, which publishes each of `action_accept`, `action_reject`, `ownership_accept` and `ownership_reject` from a sender that is not `ready`, in phase `active` with no incident, and asserts `invariant_failure` with detail `step 4: invariant_failure`;
- `a principal mismatch is unauthorized before any session check`, which publishes from a principal bound to another execution, and from a `founder_tui` principal, each with a `session_id` that also differs from the snapshot's, and asserts `unauthorized` with detail `step 2: unauthorized`;
- `a duplicate event_id is refused without appending or interrupting the session`, which publishes an accepted event, publishes it again, and asserts the refusal of C2, one ledger row for that `event_id`, no further observation and an unchanged phase.

The file then holds twenty-two tests. `packages/supervisor/test/build.test.ts` gains `an adapter client from the build publishes an accepted event through its broker delegate`, which publishes an accepted ordinary event through an adapter's client from a fixture build and asserts `ok: true` and one new durable row. Nothing else in either file changes.

C4. **Paths.** The correction is one new commit on top of `c201cde18077b789b8aefe7c5f88db61d44649e5` on `build/m10-task24-r1`. Against `942c225bb3d4c772ad68c9cac2a7d494655758b9`, the branch then changes exactly the four paths of `DEC-20261022-01` C1 and `packages/supervisor/src/build.ts`, `packages/supervisor/test/build.test.ts` and `packages/ledger/src/ledger.ts`. Every other path stays byte-identical.

C5. **Verification.** D1 runs at `c201cde18077b789b8aefe7c5f88db61d44649e5`. D2 adds four breaks, each failing a named test of C3: the delegate without `publish`; the duplicate check removed; the checks of B2 step 5 moved ahead of the readiness check of step 4; and the `session_mismatch` check moved ahead of the principal check of step 2. D3: `tsc` exits 0; `publish-legality.test.ts` shows exactly twenty-two passing; `bun test packages/broker`, `bun test packages/ledger` and `bun test packages/supervisor` show 0 fail; bare `bun test` shows 0 fail; `git diff --check` is clean; and the changed paths are exactly those of C4.

C6. **Builder, review, binding.** The builder is a fresh Codex CLI session on my MacBook with Actor-Id `session:codex/m10-task24-r2`, in its own clone of the branch at `c201cde18077b789b8aefe7c5f88db61d44649e5`, under Part B. Its commit subject is `fix(broker): route publish through the build delegate and refuse duplicate event ids`, ending with the three trailers `Role-Id: builder`, that Actor-Id and `Execution-Surface: codex`. It saves a new pull request description covering both commits as a file and makes no GitHub call. I push the commit without force and replace the description. A fresh Gemini 4 session on Antigravity on my MacBook, reviewer id `antigravity`, reviews the new head under `DEC-20261022-01` E3 as this Part amends it; the verdict at `c201cde18077b789b8aefe7c5f88db61d44649e5` does not cover the new head.

C7. **Task 25.** `DEC-20261022-01` B9 stands: Task 25 replaces one test in `publish-legality.test.ts`, which then still holds twenty-two, and D3 for Task 25 reads "twenty-two".

C8. **Counting.** Plan §11.3 counts verdicts from Plato/Codex pre-commit review and from Gemini Tier-2 review. The findings of A4 come from neither, and the Tier-2 verdict of A3 found nothing substantive, so this correction adds no round. The mutations of A3 are not a substantive finding against Task 24: `DEC-20261022-01` required the nineteen tests it named.

## Part D: The stabilization build

D1. **Authorization.** After Task 25 merges, one build hardens the three tests of A5, under a builder prompt I sign that names a binding base containing that merge. It changes exactly these paths, each only as D2 rules:

- `apps/madbridge/test/doctor.test.ts`;
- `apps/madbridge/test/cli.test.ts`, only for its tests that run `doctor`;
- `apps/madbridge/src/commands/doctor.ts`, only if D2 item 1 requires it;
- `packages/supervisor/test/preflight.test.ts`;
- `packages/supervisor/test/build-rollback.test.ts`.

D2. **The rulings.**

1. **Doctor.** No test in `doctor.test.ts` or `cli.test.ts` starts a real provider executable. Every test that runs `doctor` supplies fixture executables, under a disposable `mkdtemp` root, for every executable `doctor` probes, and every assertion of both files stays. If that cannot be done from the test files alone, `doctor.ts` may gain one injection seam for the probed executables whose default leaves production behavior unchanged. No timeout is raised to hide a slow real executable.
2. **Preflight.** `preflight creates nothing` checks a temporary directory that only the test owns and that preflight's temporary location resolves to during the test, instead of the shared `tmpdir()`. Every other assertion of the test stays.
3. **Descriptors.** Each descriptor assertion of `build-rollback.test.ts` checks the specific resource it is about, such as the ledger's database being open or closed, instead of the total count of `/dev/fd` entries. Every other assertion stays.

D3. **Verification.** D1 and D3 of `DEC-20261022-01`, as Part B reads them, with `bun test apps/madbridge/test/doctor.test.ts`, `bun test apps/madbridge/test/cli.test.ts`, `bun test packages/supervisor/test/preflight.test.ts` and `bun test packages/supervisor/test/build-rollback.test.ts` each passing five times in a row, each run separately in the foreground, before bare `bun test`. D2 adds one break per ruling, each failing the hardened test: `doctor` writing a file into its working directory; preflight writing a file into its temporary location; and the ledger left open, or closed, where the assertion requires the other.

D4. **Builder, reviewer, binding.** The builder is a fresh Codex CLI session on my MacBook with Actor-Id `session:codex/stabilization-r1`; the reviewer is a fresh Gemini 4 session on Antigravity on my MacBook, reviewer id `antigravity`; both under Part B. Its commit subject is `test: isolate the doctor, preflight and descriptor tests from the host`, ending with the three trailers `Role-Id: builder`, that Actor-Id and `Execution-Surface: codex`. It lands by its own pull request, Tier-2 review and merge authorization, by merge commit only.

## Part E: Filing and the `AGENTS.md` amendment

E1. **Filing.** One docs-only pull request files this act and makes the change of E2, under `DEC-20261015-05` B3. The correction of Part C starts only after it merges.

E2. **`AGENTS.md`.** In "GitHub credentials and identity (agent sessions)", the last bullet is replaced by exactly these two bullets:

```text
- **A session relaunched after a stop must have a valid `GH_TOKEN` before it runs any GitHub operation** — check `gh auth status` first; if the token is invalid, stop and report rather than pushing with the wrong identity.
- **Builder and reviewer sessions run no GitHub operation** (`DEC-20261023-01` B7): they run no `gh` command, including `gh auth status`, load or check no `GH_TOKEN`, and treat its absence as normal. The Founder pushes their branches, opens their pull requests and posts their verdicts.
```

Nothing else in `AGENTS.md` changes.

## Part F: Not authorized

- Any change to a path outside Parts C, D and E, or to a path within them beyond what they rule.
- Any timing exception or known-failure set on any host.
- Any relaxation of D3, of a Tier-2 review, of the ready step or of a merge authorization.
- Any merge of pull request 188 before the correction of Part C has its own Tier-2 verdict and merge authorization.
- Any change to the plan, the spec or any decision record other than this filing and E2.

## Part G: Signature

Signed:

— Michael Daley

Date: 2026-10-23

Actor-Id: founder
