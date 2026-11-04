FOUNDER-ACT-20261103-PHASE-3A-HARDENING-E: the Hardening D verdict entered, the first half of the hunt recorded, the hunt moved to the merge of Hardening E, and Hardening E authorized on the Ubuntu PC

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `fe471b844bdfbfd43aff89841ac1f34c3201f63d` (the merge of pull request 217)
> **Governs:** `docs/verification/phase-3a-correction-rounds.md`; the hardening builds of `DEC-20261102-01` B1 and B4; the hunt of `DEC-20261103-01` B5; `test/phase3a/runtime-harness.ts`
> **Read with:** `DEC-20261103-01` A4, B4, B5 and B6; `DEC-20261103-02` B13 and B14; `DEC-20261102-02` B3 to B9; `DEC-20261102-01` B1 and B4; `DEC-20261101-01` B6; `DEC-20261023-01` Part B; `DEC-20261013-03` B2 and B4; plan §4 and §11.3

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What earlier acts leave to this act.** Under `DEC-20261103-01` B8, as `DEC-20261103-02` B14 item 2 amended it, the first act I sign after the Tier-2 verdict of Hardening D is posted enters that verdict in the correction-round log. This is that act.

A2. **Hardening D, pull request 217.**
1. **The build.** Built on `build/hardening-d-r1` from the binding base `6010de734d82ddebfc68ba0d75c8d4b65ec0e095` by `session:claude-code/hardening-d-r1`, a Claude Code session on the Ubuntu PC. It made four commits ending at `de72c2e18a437301a081253376c6ad36d55ce87f`, one for each item of `DEC-20261103-01` B6, and changed the seven paths of its item 6. My guarded command pushed the branch from my MacBook and opened the draft pull request.
2. **My hunt.** On the Ubuntu PC at that head, under the custodied runtime, the full suite and `test:phase3a` passed five times each, ten of ten runs, at load averages up to 0.55. The review prompt quoted that run.
3. **The first Verify run.** In run 41661373059 at that head, the first attempt of Verify on ubuntu-24.04 failed one test outside the pull request: "closing host A's stdin does not affect host B" in `test/phase3a/adversarial/descriptor-hygiene.test.ts`, at `test/phase3a/runtime-harness.ts` line 490, with "JSON Parse error: Unexpected EOF". Its one re-run passed. Verify (macOS) and code-review passed.
4. **The review.** Reviewer `antigravity`, a fresh session on Antigravity on my MacBook, started with Gemini 4. Its verdict at `de72c2e18a437301a081253376c6ad36d55ce87f` was PASS with no findings.
   - Report SHA-256 `bc250015e197c65c348cd4df318f72820e38d8472acf5514e2c3d31690551023`, 62,255 bytes, 946 lines, saved at `/Users/michaeldaley/builds/review-pr217-r1.md`.
   - It was posted as comments 6616468245 and 6616468694, from the review prompt with SHA-256 `78b572cdb4ab6cf8c610cd0a6417d5ab7438ac6b4c8e7c31c9f3d24986963179`.
   - Before posting, my command checked the hashes of all 63 logs against the report and confirmed that its one compaction re-read showed the signed prompt.
5. **What the posted header records.**
   - Item 2 of the review prompt, in the drafting assistant's own wording, asked whether the ordering test fails when output arrives in the order that broke it at the base. `DEC-20261103-01` B6 item 3 requires that it fail at the base and pass at the head. The reviewer applied the act and recorded the difference.
   - The build log's section for item 1 says "Deviations: none", while the builder's description lists three: a 74-character subject, one baseline log written through a process substitution, and one probe run twice.
6. **Copilot and the merge.** Copilot's review 5760156193 opened no comment. Merged by merge commit at `fe471b844bdfbfd43aff89841ac1f34c3201f63d` on 2026-11-03, under `DEC-20261102-02` B7, on top of the merge of pull request 218.

A3. **The hunt at the merge of Hardening D.** On 2026-11-03, on the Ubuntu PC at `fe471b844bdfbfd43aff89841ac1f34c3201f63d`, under the custodied runtime of `DEC-20261013-03` B2 item 2, the full suite and `test:phase3a` passed ten times each, twenty of twenty runs. Load averages were at most 0.66. The output's SHA-256, as the drafting assistant saved it, is `09c65b3db48c5d1a13efd8dfe6d5bddf43f1c8e56e63927f76995ce0fbff4af6`. The MacBook half of `DEC-20261103-01` B5 has not run: the MacBook is held for Task 57 under `DEC-20261103-02` B13.

A4. **The race in the descendant record.** In `test/phase3a/runtime-harness.ts` at `fe471b844bdfbfd43aff89841ac1f34c3201f63d`:
1. **The writer and the reader.** For the `grandchild`, `setsid` and `lifeline-eof` scenarios, the fixture adapter writes `descendant.json` with one plain `writeFileSync` (line 398). The harness waits only until the file exists (line 489) and then parses it at once (line 490).
2. **The failure.** A read between the file's creation and the write of its content fails as A2 item 3 shows. It failed once in CI and in none of the thirty runs on the Ubuntu PC of A2 item 2 and A3.
3. **Why it matters.** It is a defect in the test harness, not in production. `DEC-20261103-01` B4 allows no known-failure set, and plan Task 58 needs the full suite with zero failures on each certification host at one commit.

A5. **Not ruled here.** Hooks in governed Claude Code sessions: `--strict-mcp-config` turns off MCP servers but not hooks, as item 5 of my merge authorization of pull request 218 records.

A6. **The drafting assistant.** It drafted this act and proposed each ruling. It also wrote Hardening D's review prompt, including the wording error of A2 item 5. None of that is an independent review.

## Part B: Founder rulings

B1. **The entry.** The verdict of A2 item 4 is entered under no plan milestone and no rubric milestone, as a hardening build, and adds no round. Rubric milestone 10's total stays at **2**. The facts of A2 item 5 are recorded with it. The build log is not corrected.

B2. **Hardening E.** I authorize one hardening build under `DEC-20261102-01` B1 and B4:
1. **Builder and branch.** A fresh Claude Code session on the Ubuntu PC, started with `claude --strict-mcp-config --no-chrome` and loading no MCP server.
   - Actor-Id `session:claude-code/hardening-e-r1`, on `build/hardening-e-r1`.
   - It builds from a binding base on `main` that contains the merge of this act's filing, named in its builder prompt I sign.
   - Every Bun process of the build is the custodied build of `DEC-20261013-03` B2 item 2, used as its B4 requires.
   - The clone's git identity is `daley40-lab` and its no-reply address. The builder makes no GitHub call.
2. **The item.** In `test/phase3a/runtime-harness.ts`:
   - The fixture writes the descendant record so that no reader can see it partly written. It writes the record to a temporary name in the same directory and renames it into place.
   - The harness accepts the record only once it parses and names a safe integer greater than 1, retrying within its existing deadline of `HOST_DEADLINES_MS.outerBound`. It throws `FixtureDescendantIdentityMissing` as before when the deadline passes.
   - A test under `test/phase3a/` shows that the harness's wait succeeds when the record first appears empty and is written 50 ms later. The test fails against the code at the base.
   - Nothing else in the harness changes.
3. **The other reads.** The build log lists every place in `test/phase3a/` that reads a file another process writes after only checking that it exists. For each, it says what orders the write before the read. None of them changes.
4. **Paths.** Only `test/phase3a/runtime-harness.ts`, one new test file under `test/phase3a/`, and `docs/verification/hardening-e-build-log.md`. No production file, `bun.lock`, manifest, `AGENTS.md` or decision record changes.
5. **Gates.** As `DEC-20261102-02` B4, with its load rule, on the Ubuntu PC. Each run below ends with zero failures:
   - `bun x tsc --noEmit`;
   - the new test twenty times in a row;
   - `bun test test/phase3a/adversarial` three times in a row;
   - `bun test test/phase3a`;
   - bare `bun test` three times in a row.

   The build is reviewed only after Verify, Verify (macOS) and code-review pass at its head on GitHub.
6. **Review and counting.**
   - **Reviewer:** a fresh Gemini 4 session on Antigravity on my MacBook, reviewer id `antigravity`, under a review prompt I sign.
   - **Timing:** the review runs on my MacBook only when no Task 57 session runs there, under `DEC-20261103-02` B13.
   - **Counting:** its verdicts count under plan §11.3, under the rubric milestone of each path their substantive findings touch.
   - **A FAIL** with a substantive finding halts for my ruling before any correction.
7. **Pull request and merge.** As `DEC-20261102-02` B7. My guarded commands:
   - push the branch, open the draft pull request, and mark it ready after a posted Tier-2 PASS at its exact head;
   - merge it by merge commit, without a per-pull-request act, re-running held code-review runs one at a time under `DEC-20261101-01` B6.
8. **Halts, closed.** The build halts and reports to me only when:
   - a path outside item 4 would change;
   - the item cannot be met without a production change or an installed package;
   - a test fails unexpectedly in a run whose first load average was 2.0 or more, which it does not rerun;
   - the session loads any MCP server;
   - the runtime is not the custodied build;
   - the binding base differs from its prompt.

   Every other failure is handled under `DEC-20261023-01` Part B, and anything Part B makes a stop stays a stop.

B3. **The hunt moves to the merge of Hardening E.** `DEC-20261103-01` B5 is amended:
- The hunt of its A4, ten rounds of the full suite and ten of `test:phase3a`, runs on both certification hosts at the merge of Hardening E rather than of Hardening D, under each host's certification runtime.
- Every run passes before Task 58's candidate commit is fixed.
- The run of A3 stands as evidence for Hardening D and does not replace that hunt.

B4. **Hermes.** `DEC-20261102-02` B5 applies to Hardening E, with the Claude Code launch of B2 item 1.

B5. **Counting and records.** These are new Founder rulings, which plan §11.3 does not count. No checkpoint closes. The next act I sign after Hardening E's verdict is posted enters that verdict in the correction-round log.

B6. **What this does not open.** This act authorizes Hardening E and nothing else. It does not enter Task 57's verdict or authorize Task 58, Task 59 or any Phase 3B work. It does not close M10, M25 or M26. It changes no earlier ruling except as B3 states.

## Part C: Filing and recording

C1. One docs-only pull request files this act and changes nothing else except one entry appended to the end of `docs/verification/phase-3a-correction-rounds.md`. That entry takes the form of the log's latest entries and records the verdict of A2 item 4:
- the head, the builder session and the reviewer id;
- the report's SHA-256, size and path, and the comments;
- the result and the facts of A2 item 5;
- the count and the merge.

The pull request touches `docs/decisions/`, so under `AGENTS.md`, as `DEC-20261031-01` amended it, it merges only by a Founder act naming its exact head.

## Part D: Not authorized

- Any path beyond B2 item 4 for Hardening E, and any change to `bun.lock`, a manifest, the plan, the spec, `AGENTS.md` or another decision record.
- Any edit of an existing entry of the correction-round log.
- Any change to the Ubuntu PC's installed Bun, shell profile or system `PATH`.
- Task 58, Task 59, any Phase 3B work, and every build other than Hardening E and Task 57.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-03

Actor-Id: founder
