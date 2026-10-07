FOUNDER-ACT-20261007-TASK35-SECOND-CORRECTION: Task 35 second correction, reassignment, technical assessment and re-review

> **Status:** ISSUED
> **Version:** v3. It replaces v2 (SHA-256 `9a6269f69fce98cade21d16bc7bac54243634ff977ed15d3c07622cd1264eaf6`), filed in PR #122 at head `73b729d5f39ffd4acb6294d5a2f6fbdcfaaf36eb` and never on `main`, which replaced v1 (SHA-256 `fe50679a7cfe6edb7ea494dea2a4826278e742c3fc4d792081b2f352c83de5d1`), never on `main`. Changed in v2: B2 discloses Hermes's Task 60 work. Changed in v3: B2 names the M19 remediation commit by its full SHA, as AGENTS.md requires.
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Pull request:** #119, branch `build/m15-task35-r1`, a draft
> **Correction base (PR head):** `0528f788142e107a436266cf42005a1bf50f9bc7`
> **Task 35 binding base (unchanged):** `1f07d4db5fbac1a8854d967f2bd0bc610450bc11`
> **`origin/main` when drafted:** `afcb082871bba1f331a8966cf55f1492651da93d`
> **Read with:** `DEC-20261006-01` (SHA-256 `3c379d2779539ac410d32d4dcc05a2467d6cbb79b66a4a55d214e9a493707be7`), `DEC-20261005-01` (SHA-256 `c08975c9b8c9fe834a98eb5baadb99aa761dd82c8a9e55fe0b3a3626f34c379a`), `DEC-20261004-03` (SHA-256 `a891f892e13a4fec8ef8bab7968ec9ba1b8aacfbe74150d0a768df21059f7cbe`), `PLAN-OPEN-3`, plan sections 4, 11.3 and 11.4, spec sections 7.1, 7.6 and 7.7

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The re-review failed.** The re-review required by `DEC-20261005-01` Part F inspected the exact head `0528f788142e107a436266cf42005a1bf50f9bc7` under reviewer id `codex` and returned FAIL. The reviewer reports its model as the GPT-6 family with the exact variant unproven, and states that it did not author, plan or direct the work. It executed on macOS 27.0.1, build 26A434, arm64, with Bun 1.4.2: `tsc` exit 0, the focused file 12 pass with 604 assertions, the protocol suite 146 pass in 11 files, the full suite 1,571 pass and 0 fail in 96 files, the architecture tests 49 pass, `git diff --check` clean, exactly the two correction paths against `16e2f1f9ab3a8984576a934823eb88dbde8522a2`, and exactly the three Task 35 paths against `origin/main`. Each break of `DEC-20261005-01` D3 failed test 7 alone, as did removing the containment of the closed-object key listing, and each deliberate break of tests 1 to 4 failed exactly that test.

- Items 1, 3, 4, 5, 6 and 7 returned PASS.
- Items 2 and 8 returned FAIL on finding 1.
- The reviewer reported no disagreement between its prompt and the acts.
- The reviewer first gave this verdict before it had read the first verdict's text of record, which `DEC-20261005-01` F1 put in its packet, and stated that the reproduced containment defect already establishes FAIL. It then read that text from the Founder's saved copy and confirmed its SHA-256, size and line count, final newline included, against the rounds log. It repeated the first verdict's two original probes with that verdict's own sentinel, and both are now contained, and it reconfirmed finding 1 for all three arrays. The Codex application withheld one of its messages under a safety filter, and at the Founder's request the reviewer restated the complete verdict, with step 7 done and without code. That restatement is the verdict of record.

A2. **Finding 1, substantive.** `parseCapabilityRecord` still lets an exception other than `CapabilityRecordError` escape while it inspects its input, against `DEC-20261005-01` B3 as `DEC-20261006-01` B1 reads it. In `readStringList` and `readRoles` (`packages/protocol/src/capability-record.ts`, lines 195 and 205 at the correction base) the parser reads an array's `length` inside its containment, then compares the value it got with `<` outside it. A `Proxy` whose `length` returns an object whose `Symbol.toPrimitive` or `valueOf` throws makes that comparison throw outside containment, and the caller receives the thrown value unchanged: in the reviewer's probe, an `Error` carrying `identity_attestation.sanitized_facts`. This reaches `role_eligibility`, `limitations` and `redaction_rules_applied`. A `length` that returns a revoked `Proxy` escapes as a plain `TypeError`. Of the reviewer's 282 probes, 144 were contained rejections, 105 were accepted with the trap never invoked, and 33 escaped, all from this one cause. All twelve tests pass at the correction base with this behavior.

A3. **The same defect after a claimed correction.** The first verdict, at `16e2f1f9ab3a8984576a934823eb88dbde8522a2`, found that an exception raised while the parser inspects its input reaches the caller, with content the input chose. The correction at `0528f788142e107a436266cf42005a1bf50f9bc7` was made to close that defect under `DEC-20261005-01` B3. The re-review finds the same thing, by the description both verdicts give, at a site the correction left open. Spec section 7.6 requires reassignment when the same substantive defect recurs after a claimed correction, apart from the round count.

A4. **What the drafter checked itself.** The drafter is an assistant session on the `claude-code` surface. It is not the reviewer and wrote none of the Task 35 code. This is its own reading and not an independent review. At the correction base, with `capability-record.ts` at SHA-256 `13c2b2bf2acbef71a613c311537f2d2783d291fe08c95e2a04948229b704ff60`, on Linux with Bun 1.3.11, it reproduced the escape for each of the three arrays with a throwing `Symbol.toPrimitive` and with a throwing `valueOf`: in all six cases the caller received the original `Error`, message included. The focused file printed 12 pass, 0 fail, 604 assertions, and `tsc` exited 0.

A5. **Findings 2 and 3, advisory.** Finding 2 is the filename defect that `DEC-20261006-01` A3 describes and B2 disposes of. It is unchanged. Finding 3: an implementation that drops the type check on `host.arch` accepts `host.arch: 17` and still passes all twelve tests. The correction base rejects that input correctly, and no act requires that assertion.

A6. **The builders.** The first implementer, `session:claude-code/m15-task35-r1`, reported running on Claude Opus 5.5. The correction implementer, `session:claude-code/m15-task35-r2`, reported running on Claude Opus 5. Each report is the session's own. Both rounds failed on the same class of defect.

A7. **Rounds.** Under `DEC-20261005-01` F4, this verdict is round 4 under rubric milestone 1 and round 2 under rubric milestone 4. Plan section 11.3 requires reassignment at more than two rounds on one rubric milestone. Spec section 7.7 qualifies a builder for Phase 3B only if no milestone exceeds two correction rounds.

A8. **Technical assessment.** Spec section 7.1 requires that, when a builder is reassigned, existing code receives a separate Founder-approved technical assessment. `DEC-20261005-01` reassigned the implementer and does not record one. B4 is that assessment, for both reassignments.

A9. This act governs the second correction where its terms conflict with `DEC-20261006-01`, `DEC-20261005-01` or `DEC-20261004-03`. Every clause of those acts not changed here stands. This act does not authorize Task 36 or any later task.

## Part B: Founder rulings

B1. **Round count.** The FAIL in A1 is a substantive finding on a conforming re-review. One verdict adds at most one round to each rubric milestone it affects. It is round 4 under rubric milestone 1 and round 2 under rubric milestone 4. Items 2 and 8 are part of one verdict and count once. Findings 2 and 3 are advisory and are not a round. Rubric milestone 1 stands at 4. Rubric milestone 4 stands at 2.

B2. **Reassignment.** The correction implementer, `session:claude-code/m15-task35-r2`, is reassigned, on two grounds: the round count in A7, and the recurrence in A3, which I rule is the same substantive defect recurring after a claimed correction under spec section 7.6. The second correction is made by a new Hermes session with Actor-Id `session:hermes/m15-task35-r3`, running on the local model `deepseek-v4-flash`, on the execution surface `hermes-local-code`, which the FounderOS execution-surface registry permits for `builder` only. `deepseek-v4-flash` is the model the FounderOS model registry binds to `builder` on that surface (`DEC-20260807-01`). Its model family is neither of the two earlier implementers'. The Founder makes this choice knowing that Hermes, as `session:hermes/m19-tasks42-44`, built M19 Tasks 42 to 44, and that its first remediation there, `df19365b4eb1cb3189a032ef2417b9fdd0555198`, inverted an exception filter so that it swallowed errors it should have passed on, and failed a Tier-2 review before a Founder-authorized correction. The Founder also knows that Hermes, on `deepseek-v4-flash`, implemented the Task 60 correction round 2 under rubric milestone 1. Plan section 11.4 applies the section 7 rubric in full to it. The new session has done no work on Task 35 or Task 60 and does not reuse the worktree of any earlier session. It reports the model its harness shows. If that is not `deepseek-v4-flash`, it stops before its first edit and reports.

B3. **Containment by construction.** `DEC-20261005-01` B3, as `DEC-20261006-01` B1 reads it, is unchanged. The correction makes it hold by construction, not by guarding each operation a builder lists. All of the parser's inspection of its input runs inside one containment boundary: every read, test, key enumeration, comparison and conversion of the input or of any value obtained from it, until the frozen result is built. Anything thrown inside that boundary that is not a rejection the parser raised itself is replaced as B3 rules: kind `schema`, naming the container being inspected when it was thrown, with no part of the original attached or quoted. The parser recognizes its own rejections by identity, never by class, `kind`, `field`, message or shape, so an error the input's code throws is replaced even when it is a `CapabilityRecordError` that code constructed, or an object or `Proxy` posing as one. Nothing else changes: every input the correction base accepts is still accepted with an identical result, and every input it rejects with a rejection the parser raised itself is still rejected with the same kind and field.

B4. **Technical assessment (spec section 7.1).** The Task 35 code at the correction base is sound apart from finding 1. The re-review passed items 1 and 3 to 7, and finding 1 is confined to how the parser contains the inspection of its input. That code is preserved. The correction builds on it and replaces no more of it than B3 needs. This assessment covers the reassignment in `DEC-20261005-01` B2 as well as the one in B2 here.

B5. **How containment is pinned.** `DEC-20261004-03` C2 stands: exactly twelve tests with the same names, and no other test. The correction is pinned by assertions added inside test 7, `a passing record is not a live authorization`, and nowhere else:

- for each of `role_eligibility`, `limitations` and `redaction_rules_applied`, a record whose value there is a `Proxy` over a valid array, whose `length` read returns an object with a throwing `Symbol.toPrimitive`, and separately one with a throwing `valueOf`, each throwing in turn an `Error` whose message is a value of the record, a revoked `Proxy`, a `CapabilityRecordError` the test constructs with a kind and field other than `schema` and that array's name, a plain object posing as one, and a `Proxy` posing as one: each is rejected as kind `schema`, field that array's name, the error is not the thrown value, and the record value appears in neither the error's message, its stack nor any own property;
- for each of the same three arrays, a `length` read that returns a revoked `Proxy` is rejected as kind `schema`, field that array's name;
- every assertion that `DEC-20261005-01` B4 and B5 added stays.

B6. **Coverage for finding 3.** Assertions are also added inside test 7: for each of the eight `host` fields, a record whose value there is the number `17` is rejected as kind `schema`, field `host.` followed by that field's name. The correction base already enforces this. Finding 3 stays advisory and adds no round, because plan section 11.3 does not count a supplementary test that confirms behavior already correct.

B7. The twelve tests keep their names and every existing assertion. `evaluateCapabilityFreshness`, `capabilityRecordFilename` and `packages/protocol/src/index.ts` do not change. The filename defect stays as `DEC-20261006-01` B2 disposed of it.

B8. `DEC-20261005-01` B7, the reading of `DEC-20261004-03` D4 against `origin/main`, stands. For this correction the checks are the two in D4 below.

B9. Any other defect found while correcting is reported, not fixed.

B10. **The next finding.** If the re-review in Part F returns any substantive finding, that verdict is round 5 under rubric milestone 1 and round 3 under rubric milestone 4. Reassignment is required under both, and the Founder rules before anything else is done.

## Part C: Authorized scope

C1. One new commit on top of `0528f788142e107a436266cf42005a1bf50f9bc7`, on `build/m15-task35-r1`, pushed as a fast-forward. No amend, rebase, force-push, empty commit or merge of `main`. It changes exactly these two paths and no others:

- `packages/protocol/src/capability-record.ts`
- `packages/protocol/test/capability-record.test.ts`

C2. `DEC-20261004-03` C3 and C4 stand. `packages/protocol/src/index.ts` and every other path stay byte-identical to the correction base. No new dependency, export, registry, storage, I/O, clock read or second authority.

## Part D: Verification

D1. **Before the first edit,** re-fetch and stop and report unless all of these hold:

- (a) PR #119's head is `0528f788142e107a436266cf42005a1bf50f9bc7`, and the branch has exactly two commits after `3a576dcd8b377668f6eb926397fb9a6cd88c1411`;
- (b) every path changed between `1f07d4db5fbac1a8854d967f2bd0bc610450bc11` and `origin/main` is under `docs/decisions/`, is `docs/verification/phase-3a-correction-rounds.md`, or is `AGENTS.md`;
- (c) this act is on `origin/main` with its status line reading ISSUED, a signed Part I, and no bracketed marker or blank signature line left in it;
- (d) the PR is still a draft, and the verdict in A1 is posted on it as G2 requires;
- (e) on `origin/main`, `DEC-20261004-03` has SHA-256 `a891f892e13a4fec8ef8bab7968ec9ba1b8aacfbe74150d0a768df21059f7cbe`, `DEC-20261005-01` has SHA-256 `c08975c9b8c9fe834a98eb5baadb99aa761dd82c8a9e55fe0b3a3626f34c379a` and `DEC-20261006-01` has SHA-256 `3c379d2779539ac410d32d4dcc05a2467d6cbb79b66a4a55d214e9a493707be7`;
- (f) at the correction base, `packages/protocol/src/capability-record.ts` has SHA-256 `13c2b2bf2acbef71a613c311537f2d2783d291fe08c95e2a04948229b704ff60` and `packages/protocol/test/capability-record.test.ts` has SHA-256 `e6820233a72377b5dc81159d56d51bc7426b896d1b9c768448c208d7094b8ce7`.

D2. **Baseline at the correction base,** recorded verbatim: `bunx tsc --noEmit`, `bun test packages/protocol/test/capability-record.test.ts`, `bun test packages/protocol` and bare `bun test`. Expected: `tsc` exits 0, 12 passing in the focused file, `146 pass`, `0 fail`, 11 files in the protocol suite, and on macOS `0 fail` in the full suite. The builder reports its host, Bun version and any difference.

D3. **RED proof.** Write the B5 and B6 assertions first. Run the focused file against the unmodified source at the correction base and record the output verbatim. Each B5 assertion must fail there. The B6 assertions are expected to pass there, because the behavior is already correct; for each, the builder says so. Then, after the correction passes, the builder records these deliberate breaks of the implementation, each restored afterwards with the file's SHA-256 checked, and none committed:

- remove the containment boundary of B3: test 7 fails;
- make the boundary recognize the parser's own rejections by class instead of by identity: test 7 fails;
- remove the type check on `host.arch`, and separately on one other `host` field: test 7 fails each time;
- each break of `DEC-20261005-01` D3 again: test 7 fails each time.

D4. **After implementation:**

```bash
bunx tsc --noEmit
bun test packages/protocol/test/capability-record.test.ts
bun test packages/protocol
bun test
git diff --check
git diff --name-only 0528f788142e107a436266cf42005a1bf50f9bc7
git diff --name-only origin/main...HEAD
```

`tsc` exits 0. The focused file shows exactly 12 passing. The protocol suite shows `146 pass`, `0 fail`, 11 files. The full suite shows `0 fail`, including the architecture tests. `git diff --check` is clean. The first changed-path list is exactly the two C1 paths. The second is exactly the three paths of `DEC-20261004-03` C1.

D5. **Probe matrix.** The builder runs probes covering every row of the matrix and every additional case in sections 3 and 5 of the verdict in A1, at the correction base and at its own head, and reports both. Every case that the correction base contains or accepts has the same result at the new head. Each of the 33 escapes is a `schema` rejection naming its container, with no part of the thrown value in the error.

D6. The PR description is edited once, after the push. It keeps all existing content. It gains one section, "Correction round 4", with a table that maps finding 1 and each of B3, B5 and B6 to the assertion or check that pins it and to the new commit SHA. Each edit or comment on the PR re-triggers the code-review check, so the builder makes this one edit, posts no comment, changes no thread, and reports the check states without re-running anything.

D7. Before committing, the builder re-reads its own diff: whether any operation on the input, or on any value obtained from it, still runs outside the boundary; whether the parser recognizes its own rejections only by identity; whether any input's result changed other than by B3; whether the new error carries any part of the original exception; and whether the twelve tests keep their names and existing assertions.

## Part E: Builder binding and delivery

E1. Assign:

```text
Role-Id: builder
Actor-Id: session:hermes/m15-task35-r3
Execution-Surface: hermes-local-code
```

E2. Work in a clean, isolated worktree created for this act at `0528f788142e107a436266cf42005a1bf50f9bc7`. Do not reuse `/Users/michaeldaley/madventures-tui-m15-task35`, the worktree of `session:claude-code/m15-task35-r2`, or any other earlier worktree.

E3. Commit subject:

```text
fix(protocol): contain capability input inspection by construction
```

The commit and the PR description end with the E1 trailers, each line 72 characters or shorter.

E4. The builder reports its model as its harness shows it, the commit SHA, the D2 baseline, the D3 RED proof and breaks, the D4 results, the D5 probe results, the D6 table, the D7 findings, the required-check state, and that the re-review is pending the Founder. It stops there.

E5. **Surface rules.** The registry denies external transmission from `hermes-local-code` by default. This act authorizes only the fetches D1 requires, the one push in C1 and the one description edit in D6. Nothing else leaves the Founder's host, and the builder posts no comment or review and changes no thread. The registry's other rules for the surface stand: the actual model is recorded, and the builder does not review its own work, merge or deploy.

## Part F: Re-review

F1. Before PR #119 leaves draft, a non-authoring review under reviewer id `codex` inspects the exact head after the correction commit. It runs in a session that has not been given a prior packet for Task 35. The packet contains this act, `DEC-20261006-01`, `DEC-20261005-01`, `DEC-20261004-03`, `PLAN-OPEN-3` and `docs/decisions/PLAN-OPEN-approval-record.md`, all read from `main`, the plan's Task 35 section and sections 4, 11.3 and 11.4, spec sections 2.3, 5.1, 5.5, 7.1, 7.6 and 9.1, and:

- the full diff from `1f07d4db5fbac1a8854d967f2bd0bc610450bc11` to that head, and from `3a576dcd8b377668f6eb926397fb9a6cd88c1411` to that head;
- the diff of the correction commit alone, from `0528f788142e107a436266cf42005a1bf50f9bc7` to that head;
- the three files of `DEC-20261004-03` C1 at that head, with line numbers;
- `adapter-registry.ts`, `normalization.ts`, `surface-id.ts` and the `KNOWN_ROLES` definition in `task-envelope.ts` at that head;
- the admission-list scan in `test/phase3a/architecture-phase3a.test.ts`;
- the first verdict and the verdict in A1, each verbatim, each as a file whose SHA-256 the person assembling the packet has checked against `docs/verification/phase-3a-correction-rounds.md` on `main`.

The person assembling the packet confirms every governing act above is on `main` first.

F2. The eight items of `DEC-20261005-01` F2 stand, with items 6 and 7 read as `DEC-20261005-01` B7 rules and items 2 and 8 read with `DEC-20261006-01` B1, and a ninth: **containment holds by construction as B3 rules, B5 and B6 are pinned inside test 7, and the reviewer reruns the probes of finding 1 and the matrix of the verdict in A1, and the `host.arch` variant of finding 3, each of which must now be contained or fail a test.** The verdict is PASS only if all nine pass.

F3. The reviewer states what it executed and what it only read. The verdict is recorded on PR #119 with the reviewer id and the exact head SHA, and entered in `docs/verification/phase-3a-correction-rounds.md` under plan milestone M15 and rubric milestones 4 and 1.

## Part G: Filing and recording

G1. This act lands in one docs-only pull request that changes only this file and `docs/verification/phase-3a-correction-rounds.md`. The round-log entry records the verdict: the reviewer id and its self-reported model, the target head, the SHA-256 of the verdict's text from the Founder's saved copy, the finding, that it counts as round 4 under rubric milestone 1 and round 2 under rubric milestone 4 under B1, the recurrence in A3, the reassignment in B2, the technical assessment in B4, and that findings 2 and 3 are advisory and not a round.

G2. The verdict in A1 is posted verbatim on PR #119 as one comment, with the head SHA and the SHA-256 of its text, by a session the Founder directs, once G1's pull request is merged and before the correction builder starts. It is posted alone, and nothing else is posted or edited on PR #119 around it.

## Part H: Not authorized

- Leaving draft and merging PR #119: each needs a separate Founder act naming the exact head.
- Any correction by `session:claude-code/m15-task35-r1` or `session:claude-code/m15-task35-r2`.
- Any change beyond B3, B5 and B6, and any change to `evaluateCapabilityFreshness`, `capabilityRecordFilename` or `index.ts`.
- Any test beyond the twelve in `DEC-20261004-03` C2.
- Any ruling on Phase 3B qualification.
- Task 36, M15 closure, and every later task.
- Any edit to a spec, the plan, `PLAN-OPEN-3` or any decision record other than filing this act.
- Running the re-review.

## Part I: Signature

Signed:

— Michael Daley

Date: 2026-10-07

Actor-Id: founder
