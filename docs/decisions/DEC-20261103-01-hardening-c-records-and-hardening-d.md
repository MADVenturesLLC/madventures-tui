FOUNDER-ACT-20261103-PHASE-3A-HARDENING-D: the Hardening C verdict entered, the governed Codex launch fixed, the known-failure set closed, and Hardening D authorized on the Ubuntu PC

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `b0722bf0bf6ae81c78ea14443a01add32880554a` (the merge of pull request 215)
> **Governs:** `docs/verification/phase-3a-correction-rounds.md`; the hardening builds of `DEC-20261102-01` B1 and B4; governed Codex sessions; the known-failure set on the Ubuntu PC; spec section 1.5 row 4
> **Read with:** `DEC-20261102-04`; `DEC-20261102-02` B3 to B7; `DEC-20261102-01` B4; `DEC-20261101-01` B6; `DEC-20261027-01` B5; `DEC-20261023-01`; `DEC-20261013-03` B2, B4, B6 and B7; plan §4 and §11.3; spec §1.5 and §9.8

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What `DEC-20261102-04` B7 leaves to this act.** It rules that the next act I sign enters the verdicts of Hardening C in the correction-round log. This is that act.

A2. **Hardening C, pull request 215.** Built on `build/hardening-c-r1` from the binding base `93e7d1c4c16d7951dd3fde23b6516e8b1e5e738b` by `session:codex/hardening-c-r1`, two commits ending at `038b995de6deee7c67df90276c36d9a8fbb3526e`: the acknowledgement deadline of `escalateWedgedHost`, and the calibration of the temporary-path recorder.
1. Reviewer `antigravity`, a fresh session on Antigravity on my MacBook, started with Gemini 4; the harness did not show the model. Verdict at `038b995de6deee7c67df90276c36d9a8fbb3526e`: PASS, four advisory findings: the lifeline-EOF timer at `packages/pty-host/src/main.ts:662` can end its wait early in the way `DEC-20261102-04` A4 describes; no test fails when the re-armed acknowledgement timer is left uncleared; no test fails when the re-arm happens only once; and sabotaging the test's own recorder together with preflight lets a created path go unseen. Report SHA-256 `4c1c8ed99751da227932846338388f8f28b988120665235c2f2f18043e67121f`, 62,094 bytes, 800 lines, saved at `/Users/michaeldaley/builds/review-pr215-r1.md`, comments 6595656310 and 6595656646.
2. The report is not wholly accurate. Its description of the deadline test names a delay range and an elapsed-time assertion that the test file does not contain, and its Findings 1 and 4 quote words that are not in `DEC-20261102-04`. Its conclusions rest on the runs its logs record: the deadline test failed against the base, a window ended 1 ms early was caught, every one of twenty probe readings was 250 ms or more, and each break of preflight was caught. I accepted the PASS with these errors stated in the header of the posted verdict.
3. Copilot's review 5747403656 opened no comment. Its overview suggested that the deadline test measure elapsed time itself rather than read production's own measurement. Cursor's Security Reviewer passed.
4. At that head, the first attempt of Verify (macOS) in run 41569931179 failed one test outside pull request 215, "a refused pty_input or pty_resize never reaches the child" in `test/phase3a/harness-lifecycle.test.ts`, which Hardening B added: it stops reading output at the resize report, and the echo of the accepted input had not yet arrived. One re-run of the failed job passed.
5. Merged by merge commit at `b0722bf0bf6ae81c78ea14443a01add32880554a` on 2026-11-03 under `DEC-20261102-02` B7 as `DEC-20261102-04` B5 item 9 applies it.

A3. **The governed Codex launch.** Three Codex sessions for Hardening C stopped at their identity checks, having done nothing, because MCP servers were loaded: thirteen namespaces with only the Hermes server disabled; then one, `cua_repl`, after overriding the server and plugin tables; then eight in a third launch. Overriding those tables proved unreliable: under the same overrides, `codex mcp list` still listed every configured server. My Codex configuration defines eleven MCP servers and many plugins, and has the features `computer_use`, `apps`, `plugins`, `remote_plugin`, `hooks`, `memories` and `chronicle` on. `memories` on most likely explains how memory context reached the Codex builders of the M23 and M24 build, as `DEC-20261101-01` A5 item 3 records, and the memory lookup of the Hardening A builder. The fourth session ran from a separate configuration at `/Users/michaeldaley/.codex-governed`, launched by `/Users/michaeldaley/builds/codex-governed`, whose `config.toml` was written to define no MCP server and no plugin and to turn those features off, and it completed the build. Its report gives its MCP inventory as not shown and states that it used none. On 2026-11-03, `/Users/michaeldaley/builds/codex-governed mcp list` printed "No MCP servers configured yet."

A4. **The flaky-test hunt.** At `b0722bf0bf6ae81c78ea14443a01add32880554a` I ran the full suite and `test:phase3a` ten times each on each certification host, as measurement only.
1. On the MacBook, under Bun 1.4.2 of `DEC-20261013-03` B2 item 1: twenty of twenty runs passed, at load averages up to 6.82.
2. On the Ubuntu PC, the drafting assistant's first command ran stock Bun 1.4.2, which `DEC-20261013-03` B2 item 2 rules is not a Linux certification runtime; two tests that depend on the fix A4 of that act describes failed in every run there, and both passed in every run under the custodied build. Under the custodied build of B2 item 2, used as its B4 requires: "governed-child environment forwarding: exact key-set equality with the launch-frame env, ambient canary absent (C7 evidence 7)" in `packages/broker/test/pty-host-supervisor.test.ts` failed in ten of ten full-suite runs; "a refused pty_input or pty_resize never reaches the child" failed in three of twenty runs; nothing else failed.
3. The environment-forwarding test is test 4 of `DEC-20261013-03`. On Linux it reads `/proc/self/environ` with `/usr/bin/awk`; the Ubuntu PC's `mawk` 1.3.4 20260129, when its output is a terminal, reads only the first entry. The runner image of Verify on ubuntu-24.04 does not show this.

A5. **The known-failure set.** `DEC-20261013-03` B6 keeps test 4 in the known-failure set on the Ubuntu PC. `DEC-20261027-01` B5 item 2 says no timing exception and no known-failure set applies on any host, and `DEC-20261023-01` does not authorize one. Plan Task 58 requires the full suite with zero failures on each certification host at one commit.

A6. **The drafting assistant.** It drafted this act, proposed each ruling and gave the first Ubuntu PC hunt command, which named the wrong runtime. None of that is an independent review.

## Part B: Founder rulings

B1. **The entry.** The verdict of A2 item 1 is entered under no plan milestone and no rubric milestone, as a hardening build, and adds no round. Rubric milestone 10's total stays at **2**.

B2. **The findings of pull request 215.** Findings 1 to 3 and Copilot's suggestion of A2 item 3 are taken into Hardening D under B6. Finding 4 is closed with no change: it needs the test's own helper altered.

B3. **Governed Codex sessions.** Every governed Codex session in this repository is launched with `CODEX_HOME` set to `/Users/michaeldaley/.codex-governed`, through `/Users/michaeldaley/builds/codex-governed`. That configuration defines no MCP server and no plugin and keeps `plugins`, `remote_plugin`, `plugin_discovery_prefetch`, `plugin_sharing`, `apps`, `computer_use`, `hooks`, `memories` and `chronicle` off. Before a prompt is pasted, I confirm in the session that no MCP server is listed. This replaces the Codex launch of `DEC-20261102-02` B5 item 1.

B4. **The known-failure set is closed.** No known-failure set and no timing exception applies on any host. The last sentence of `DEC-20261013-03` B6 no longer applies: test 4 must pass on the Ubuntu PC like every other test, and Hardening D makes it pass.

B5. **The ordering race and the hunt.** The test of A2 item 4 is a defect in the test, not a timing exception, and Hardening D fixes it. Before Task 58's candidate commit is fixed, the hunt of A4 is repeated on both certification hosts at the merge of Hardening D, under each host's certification runtime, and every run passes.

B6. **Hardening D.** I authorize one hardening build under `DEC-20261102-01` B1 and B4:
1. **Builder and branch.** A fresh Claude Code session on the Ubuntu PC, started with `claude --strict-mcp-config --no-chrome` and loading no MCP server, Actor-Id `session:claude-code/hardening-d-r1`, on `build/hardening-d-r1`, from a binding base on `main` that contains the merge of this act's filing, named in its builder prompt I sign. Every Bun process of the build is the custodied build of `DEC-20261013-03` B2 item 2, used as its B4 requires. The clone's git identity is `daley40-lab` and its no-reply address. The builder makes no GitHub call.
2. **Item 1, test 4.** In `packages/broker/test/pty-host-supervisor.test.ts`, the Linux branch of the environment-forwarding test gives the correct key set when the fixture's standard output is a terminal, under the Ubuntu PC's `mawk` and under the awk of the ubuntu-24.04 runner image. Its fixture starts no shell, and its oracle emits variable names only, never a value. Every assertion and timeout of the test and its macOS branch stay as they are. It fails on the Ubuntu PC before the change and passes after it. Spec §1.5 row 4 is amended in the same commit to name the new Linux oracle exactly, and no other part of the spec changes.
3. **Item 2, the ordering race.** In `test/phase3a/harness-lifecycle.test.ts`, "a refused pty_input or pty_resize never reaches the child" reads output until both the echo of the accepted input and the accepted resize report have arrived, within its existing timeout, and keeps every assertion that nothing refused reaches the child. A deliberate break that makes the resize report arrive before the echo fails the test before the change and passes after it. The test file then passes twenty times in a row.
4. **Item 3, the deadline test.** In `packages/broker/test/acknowledgement-deadline.test.ts`, the test forces at least two consecutive early firings of the acknowledgement timer, measures elapsed time from just before the call to the classification itself, and a further test shows that when the host acknowledges after an early firing no acknowledgement timer remains live. The tests fail under a re-arm that happens only once and under a re-armed timer left uncleared. No production file changes for this item.
5. **Item 4, the lifeline-EOF timer.** In `packages/pty-host/src/main.ts`, the timer at line 662 ends its wait only once the monotonic clock has reached `HOST_DEADLINES_MS.outerBound` after it was armed; a timer that fires earlier waits out the remainder. Nothing else in the file changes. A test under `packages/pty-host/test/` forces the timer to fire early and fails before the change. If it needs a production seam, the build halts for my ruling.
6. **Paths.** Only: `packages/broker/test/pty-host-supervisor.test.ts`, for item 1; `docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md`, only section 1.5 row 4; `test/phase3a/harness-lifecycle.test.ts`, for item 2; `packages/broker/test/acknowledgement-deadline.test.ts`, for item 3; `packages/pty-host/src/main.ts`, only the timer of item 4; test files under `packages/pty-host/test/`, for item 4; and `docs/verification/hardening-d-build-log.md`. No `bun.lock`, manifest, `AGENTS.md`, decision record or other production file.
7. **Gates.** As `DEC-20261102-02` B4, with its load rule, on the Ubuntu PC: `bunx tsc --noEmit`; `bun test packages/broker`; `bun test packages/pty-host`; `test/phase3a/harness-lifecycle.test.ts` twenty times in a row; `bun test test/phase3a`; and bare `bun test` three times in a row, each with zero failures. The build is reviewed only after Verify, Verify (macOS) and code-review pass at its head on GitHub, and after my run of the hunt of A4 on the Ubuntu PC at that head, five rounds under the custodied build, passes every run; the review prompt quotes that run's summary.
8. **Review and counting.** A fresh Gemini 4 session on Antigravity on my MacBook, reviewer id `antigravity`, under a review prompt I sign. Its verdicts count under plan §11.3 under the rubric milestone of each path their substantive findings touch: `packages/broker/test/` and `packages/pty-host/` belong to M18 and M19, rubric milestone 5, and `test/phase3a/harness-lifecycle.test.ts` to M22, rubric milestone 10, whose total stands at 2. A FAIL with a substantive finding halts for my ruling before any correction.
9. **Pull request and merge.** As `DEC-20261102-02` B7: my guarded commands push the branch, open the draft pull request and mark it ready after a posted Tier-2 PASS at its exact head; it merges by merge commit through my guarded command without a per-pull-request act, re-running held code-review runs one at a time under `DEC-20261101-01` B6.
10. **Halts, closed.** The build halts and reports to me only when: a path outside item 6 would change; item 1 cannot meet its rules without a production change or an installed package; item 4's test needs a production seam; a test fails unexpectedly in a run whose first load average was 2.0 or more, which it does not rerun; the session loads any MCP server; the runtime is not the custodied build; or the binding base differs from its prompt. Every other failure is handled under `DEC-20261023-01` Part B, and anything Part B makes a stop stays a stop.

B7. **Hermes.** `DEC-20261102-02` B5 applies to Hardening D, with the Claude Code launch of B6 item 1.

B8. **Counting and records.** These are new Founder rulings, which plan §11.3 does not count. No checkpoint closes. The next act I sign enters the verdicts of Hardening D in the correction-round log.

B9. **What this does not open.** This act authorizes Hardening D and nothing else. It does not authorize Task 57, Task 58, Task 59 or any Phase 3B work, does not name my list of surfaces, does not close M10, M25 or M26, and changes no earlier ruling except as B3 and B4 state.

## Part C: Filing and recording

C1. One docs-only pull request files this act and appends one entry to the end of `docs/verification/phase-3a-correction-rounds.md`, in the form of its latest entries, for the verdict of A2 item 1, with the head, the builder session, the reviewer id, the report's SHA-256, size and path, the comments, the result, the errors of A2 item 2, the count and the merge, and changes nothing else. It touches `docs/decisions/`, so under `AGENTS.md` as `DEC-20261031-01` amended it, it merges only by a Founder act naming its exact head.

## Part D: Not authorized

- Any path beyond B6 item 6 for Hardening D, and any change to `bun.lock`, a manifest, the plan, any part of the spec other than section 1.5 row 4, `AGENTS.md` or another decision record.
- Any edit of an existing entry of the correction-round log.
- Any change to the Ubuntu PC's installed Bun, `awk`, shell profile or system `PATH`.
- Task 57, Task 58, Task 59, any Phase 3B work, and every build other than Hardening D.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-03

Actor-Id: founder
