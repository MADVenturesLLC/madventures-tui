FOUNDER-ACT-20261028-M23-M24-SINGLE-BUILD: M23 and M24 as one build with one review, and pull request 200 withdrawn

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `6a2d16506be3efa179d97be82df7f9d3036c911b` (the merge of pull request 203)
> **Binding base:** the `origin/main` commit the builder prompt names, which must contain this act
> **Read with:** `AGENTS.md`; plan §4, §5 Tasks 51 to 55, §10 and §11.3; `DEC-20261010-04` A2 item 3; `DEC-20261015-05` B3 to B5; `DEC-20261020-01` B8; `DEC-20261023-01` Part B; `DEC-20261027-01` B7 to B9; `DEC-20261028-01` B4 and B5; pull request 200 at `bc615df755c1fbf5fd06ed9e4f057193f4aecf28`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **Pull request 200.** It was opened by `daley40-lab` on 2026-10-27 at head `bc615df755c1fbf5fd06ed9e4f057193f4aecf28`, one commit authored as decivantiq, adding `docs/decisions/ISSUED-FOUNDER-ACT-20261027-M23-M26-ONE-SHOT-BUILD.md`. That file authorizes M23 to M26 as one unattended build with one review. Its signature section was written by a Hermes agent as recorder of an instruction I gave in a Hermes session. Comment 6451963146, posted as decivantiq, authorizes its merge at that head. It is open and unmerged.

A2. **Why it cannot be filed as written.**
1. Its name follows no identifier of this repository. It cites this repository's `DEC-20261027-01` only by its act identifier, and FounderOS `DEC-20261027-01` beside it, so one number names two acts.
2. It authorizes M25 and M26 as a builder's run. Task 56 already merged as pull request 157. Task 57 investigates only surfaces I name, on my host. Task 58 needs one commit run on three hosts. No builder session can do either alone.
3. Its B3 lets the builder push, which `DEC-20261023-01` B7 forbids, while saying B7 stands unchanged.
4. It predates `DEC-20261028-01`, so it rules on none of the items that act's B4 leaves to the next act touching their paths.
5. M24's precondition "M23 reviewed" and plan §5 Step 8 conflict with one review at the end, and it does not resolve them.
6. Task 52 lists a process's open descriptors. The bar on process listing in `DEC-20261010-04` A2 item 3, carried by `DEC-20261023-01` B2, reaches that test unless an act permits it.
7. Its Part E still says the draft carries no authority. The text I approved had 81 lines; the file filed has 103.

A3. **What I keep from it.** One continuous build, one pull request, one Tier-2 review at the final head, machine gates inside the loop, a closed list of halts, one correction round, and a build log as the resume point.

A4. **The scope that can run that way.** M23, Tasks 51 to 54, and M24, Task 55, depend only on M22, which `DEC-20261028-01` closed. Both map to rubric milestone 10, at 0 correction rounds, and both are built and tested on one host.

A5. **Two things the plan leaves open for Task 55.**
1. Task 55 changes the default path of `verify-ledger` and `export-evidence`. `test/acceptance/evidence-manifest.test.ts` reaches the ledger through the old `.madv-runtime` default, and the plan does not list that file.
2. No environment allowlist in `packages/supervisor/src/environment.ts` marks a variable secret, so an exact-value redaction pass has no production source of values.

A6. **What was checked.** At the commit in the header, the drafting assistant read:
- plan §4, §5 Tasks 51 to 59, §10 and §11.3;
- `DEC-20261010-04` A2 item 3, `DEC-20261020-01` A5 and B8, `DEC-20261023-01` Part B, `DEC-20261027-01` and `DEC-20261028-01`;
- `AGENTS.md`;
- pull request 200: its file, its comments and the message of pull request 199;
- `apps/madbridge/src/commands/export-evidence.ts` lines 44 to 57, `packages/broker/src/pty-host-supervisor.ts` line 364, and the tests that call `verify-ledger` or `export-evidence`.

It ran no test.

A7. **The drafting assistant.** It drafted this act. That is not an independent review.

## Part B: Founder rulings

B1. **Pull request 200.** The act it carries is not issued in this repository and has no force here, and comment 6451963146 has no force. I close pull request 200 unmerged and keep its branch as history. This act replaces it for M23 and M24. Nothing in it carries over except what this act restates.

B2. **One build.** This act authorizes plan Tasks 51, 52, 53, 54 and 55, in that order, as one continuous build on branch `build/m23-m24-r1` from the binding base. The build is delivered as one pull request and reviewed once at its final head. Inside this build:
- plan §5 Step 8 does not halt;
- Task 55's precondition reads "Task 54 committed with its gates passing";
- each task begins when the task before it has committed with its gates passing.

Per-task authorization under plan §5 continues for every task outside this build.

B3. **Commits and paths.**
- One commit per task, with the plan's Step 7 message and the build log of B8, ending with three trailers: `Role-Id: builder`, the session's Actor-Id, and `Execution-Surface: codex`.
- Against the binding base, the branch changes exactly the paths below. Every other path stays byte-identical.
  - `test/phase3a/runtime-harness.ts`.
  - The nine files under `test/phase3a/adversarial/` that Tasks 51 to 54 name.
  - One more file under `test/phase3a/adversarial/`, only if Task 51's child supervisor process needs its own entry script.
  - `test/phase3a/fixture-adapters.ts`, only if a fault switch of Tasks 53 or 54 cannot be made in the harness alone.
  - `apps/madbridge/src/commands/verify-ledger.ts` and `apps/madbridge/src/commands/export-evidence.ts`.
  - `test/phase3a/evidence-pipeline.test.ts`.
  - `test/acceptance/evidence-manifest.test.ts`, only under B6.
  - `docs/verification/m23-m24-build-log.md`.
  - `packages/broker/src/pty-host-supervisor.ts`, only under B4.
- Each conditional path is recorded under Deviations with the reason.

B4. **Task 52's production fix.**
- If the descriptor test shows a real leak, the build may change `packages/broker/src/pty-host-supervisor.ts`, and only its close-on-exec handling of write ends, with a test that fails without the fix.
- It changes nothing else in that file, including the working directory of `spawnPtyHost` at line 364.

B5. **Listing descriptors.**
- The tests of Task 52 may list the open descriptors of process IDs the harness recorded: `lsof -p` on macOS, and `/proc/<pid>/fd` on Linux.
- They parse only descriptor numbers, types and device or inode identifiers, and on failure report only those.
- The builder and reviewer sessions themselves run no process-listing command. `DEC-20261010-04` A2 item 3 stands for them.

B6. **Task 55's readings.**
1. **The acceptance tests.** In `test/acceptance/evidence-manifest.test.ts`, each test that reaches the ledger or artifacts through the `.madv-runtime` default may be changed only to name the same ledger and artifacts by `--ledger` and `--artifacts`. Every assertion stays. A test that expects a nonzero exit for a missing ledger keeps expecting one. If that cannot be done, the build halts under B9 item 2.
2. **The exact-value redaction pass.**
   - In production, the pass takes its values from the variables that an allowlist marks secret and that are present in the exporting process's environment. At this base there are none.
   - The test seeds a synthetic marker value, never a real secret. The marker reaches the session's evidence through fixture output, and the pass receives it through a test-only parameter of the export function, never through a command-line argument.
   - The test asserts that the marker is in no exported file and that `manifest.json` lists the rule as run.
   - The pull request states as a limitation that production redacts no exact value until an allowlist marks one.

B7. **Gates inside the loop.** For each task:
- Steps 1 to 6 of the plan, with the RED run failing for the named reason.
- One deliberate break that makes a named test of that task fail again, then reverted.
- `bunx tsc --noEmit`.
- The task's Step 5 suites.

At the final head:
- `bun test test/phase3a/adversarial` three times in a row with 0 fail, then `bun test test/phase3a`, `bun test apps/madbridge` and `bun test test/acceptance` with 0 fail, then the bare `bun test` with 0 fail;
- `git diff --check` clean;
- the changed paths exactly those of B3.

`DEC-20261023-01` Part B governs every run, including its self-fix rule in B4 and its ban on rerunning a failed run to pass in B5.

B8. **The build log.** After each task, the builder appends to `docs/verification/m23-m24-build-log.md` and commits it with that task:
- the task, the commit it built on, and its new head;
- each command with its exit status and its log's SHA-256;
- the tests added, with counts;
- the RED reason and the break;
- deviations;
- any halt with its class under B9.

A session that ends early is resumed by a fresh builder session under the same prompt from the last task the log records as committed. Its Actor-Id ends `-r2`, then `-r3`, and so on.

B9. **What halts.** This list is closed. The build halts and reports to me only when:
1. A plan §10 stop condition fires.
2. Work would need a path beyond B3, a new dependency, a change to the start gate, or any change under `docs/superpowers/specs/**` or `docs/decisions/**`.
3. Governing texts conflict and this act does not resolve the conflict.
4. A failure falls outside what `DEC-20261023-01` B4 lets the builder fix.
5. The runtime check of `DEC-20261023-01` B8 differs, or a required tool is unavailable.
6. Secret material would enter a log, a report or a commit.

An ambiguity that is not authority-bearing under plan §10 item 1 does not halt the build. The builder takes the narrower reading and records it under Deviations.

B10. **Builder.**
- A fresh Codex CLI session on my MacBook, with Actor-Id `session:codex/m23-m24-r1`, in its own clone under `/Users/michaeldaley/builds`.
- It makes no GitHub call, under `DEC-20261023-01` B7, and saves the pull request's title and description as files.
- My guarded command pushes the branch and opens the pull request as a draft, and marks it ready only after the verdict, under `DEC-20261015-05` B4.

B11. **Review.**
- A fresh Gemini 4 session on Antigravity on my MacBook, reviewer id `antigravity`, which has seen no material of this build, reviews the final head under `DEC-20261023-01` Part B and the log rule of `DEC-20261027-01` B8.
- It receives this act, the plan text of Tasks 51 to 55, the diff and the build log. It reruns what it relies on, and takes no result from the builder's report on trust.
- Its verdict counts once against rubric milestone 10 under plan §11.3.

B12. **One correction round.**
- A FAIL with substantive findings is answered by one correction commit under a builder addendum I sign, and a new review at the new head.
- A second FAIL halts for my ruling.

B13. **Merge and closure.**
- The build merges only by a merge authorization I sign that pins the head, base and body, by merge commit through my guarded command, with Hermes stopped as `DEC-20261028-01` B5 requires.
- When that authorization accepts a PASS verdict that adds no round, its merge closes the M23 and M24 review checkpoints, and its rulings on findings stand as those of a closure act.
- The entries for the verdict and the closure go into `docs/verification/phase-3a-correction-rounds.md` through the filing pull request of the next act I sign.

B14. **Carried items.** Under `DEC-20261028-01` B4:
- Item 1 is not taken up, though this act may touch its file under B4.
- Item 5 is not taken up, though this act touches `test/phase3a`.
- Items 2, 3, 4, 6 and 7, and the items of `DEC-20261027-01` B9, stay as they are.
- The act that authorizes Task 59 rules on every one of them before Task 59 begins.

B15. **What remains of Phase 3A.** This act does not authorize:
- Task 57, which needs my list of surfaces;
- M26, which needs M25 reviewed and three hosts;
- the closure of M21 or M25.

## Part C: Filing

C1. One docs-only pull request files this act under `DEC-20261015-05` B3, makes the change of C2, and changes nothing else.

C2. **`AGENTS.md`.** In its Approval gates section, after the one line that reads, without its two leading spaces, "milestone authorization under FounderOS `DEC-20261027-01` naming that head.", the filing inserts exactly these two lines, each with two leading spaces:

```
  That FounderOS act is not this repository's `DEC-20261027-01`; a milestone
  authorization here is a Founder act filed under `docs/decisions/`.
```

C3. The build starts only after the filing merges and pull request 200 is closed.

## Part D: Not authorized

- Any task other than Tasks 51 to 55, any path beyond B3, and any production change other than B4 and Task 55's two command files.
- Production routing of `pty_input` and `pty_resize`.
- Any change to the plan, the spec, or any decision record other than this filing.
- Any merge without a posted verdict and a merge authorization I sign.
- Any agent acting in this repository with my decivantiq credentials.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-28

Actor-Id: founder
