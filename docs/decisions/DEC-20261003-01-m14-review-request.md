FOUNDER-ACT-20261003-M14-REVIEW-REQUEST: non-authoring review of Tasks 33 and 34 and correction C1 requested at one exact head

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Head to be reviewed:** `515eba9ff573eab3820b12900d4f734468395d84`
> **Acceptance act:** `docs/decisions/DEC-20261002-01-m14-task34-acceptance.md`, merged as `b5ea492e529483102103744a2ede46f3be429e9f`, file SHA-256 `c4b49be73c7ee42dd2c3f6743443966faddf6f4fce0711f9db7773baa171ed6b`
> **Task 34 merge:** PR #93, `a2a55bfa31390194904f71c6931e6bc8801df897`, 2026-09-22
> **Task 33 merge:** PR #94, `4477bf824892f2e3311843e33f163bc52ac9e5fe`, 2026-09-23
> **Correction C1 merge:** PR #113, `515eba9ff573eab3820b12900d4f734468395d84`, 2026-10-03

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What act D1 requires.** After the correction C1 merged, the acceptance act requires a non-authoring review of the exact merged head, covering Task 33, Task 34 and the correction. It requires a verdict of PASS, FAIL or INCONCLUSIVE with the head SHA. It leaves the reviewer id and the evidence rules to this act. Act D2 closes the M14 review checkpoint only by a Founder act that accepts the verdict. Until then Task 35 and everything after it in M15 stay unauthorized.

A2. **The correction as merged.** PR #113 merged as `515eba9ff573eab3820b12900d4f734468395d84`. Its parents are `b5ea492e529483102103744a2ede46f3be429e9f` and `b451885897107c30711689fc388314eab57b04d5`. Against the first parent it changes exactly one path, `test/phase3a/architecture-phase3a.test.ts`, whose SHA-256 on `main` is `3df3c919886e801ccbfc07a39eac6ba25238e1ceb50cdeb83ac37ace131a1d53`. The `attribution-shape-check.sh main` check on the merge commit passed, and the three push workflows on it succeeded. The drafter read this itself. It is not an independent review.

A3. **Points the drafter found and the reviewer must examine.** They are facts, not rulings.

- Task 34 merged on 2026-09-22 and Task 33 on 2026-09-23. The Task 33 commit `57015dfc64e2e25674988658a588b33f8ad58936` is not an ancestor of `a2a55bfa31390194904f71c6931e6bc8801df897`. Plan Task 34 lists "Task 33 committed" as a precondition.
- The acceptance act left the Copilot and advisory findings on PR #93 and PR #94 unruled (its B4).
- Correction C1 proved the new lockfile scan only by local mutations that were not committed. No committed test shows that the scan can fail.
- When the new scan finds a violation in the root workspace block, its message prints the label with doubled quotes. This is cosmetic.

## Part B: Founder rulings

B1. **The review.** A non-authoring review of the tree at exactly `515eba9ff573eab3820b12900d4f734468395d84` is requested. It covers Task 33 (PR #94), Task 34 (PR #93) and correction C1 (PR #113). The reviewer states its surface and states that it authored none of the reviewed work. The review is bound to that head. A later commit on `main` does not change what is reviewed.

B2. **Reviewer id.** The verdict must be signed `Tier2-Reviewer-Id: codex`. The registry maps the attestation id `chatgpt-5.6-sol` to the `codex` surface, and the Founder accepts that mapping for this review and this head only. This is not precedent for another head or task.

B3. **Evidence base.** The review is a live, read-only reading of the repository at the exact head, plus checks the reviewer executes. No assembled packet is provided or required. The reviewer states what it executed, what it only read, the Bun version it used and whether CI's pinned version, 1.3.14, was used. It states whether its session had seen any authoring session's report for this head. The Founder rules on that statement.

B4. **The review items.** The verdict is PASS only if all eight pass. The reviewer reports each as PASS or FAIL with evidence.

1. Task 33 conforms to plan Task 33: the broker index exports none of the eight named symbols; only `packages/broker/test/socket.test.ts` imports `socket.ts`; no production source constructs a `unix://` URL; the preserved modules and both adapter `mcp-config.ts` files exist; `createFakeByteRouter` exists and spawns no process; no file was deleted.
2. Task 34 conforms to plan Task 34: the root scripts `broker` and `mcp` are absent and the four `test:*` and `verify:phase3a` scripts are present; `packages/broker/package.json` declares no `node-pty`; the README no longer carries the two broker-daemon lines; the negative control exists, detects a seeded `broker.sock`, respects its depth bound and never reads `MADV_RUNTIME_DIR`.
3. The `tui-chaos` carve-out of act B2 of the acceptance act is enforced, and nothing wider is allowed. The reviewer repeats at least these mutations on a disposable copy of `bun.lock`: `node-pty` in the `packages/broker` block, `node-pty` in another workspace block that is not `packages/tui-chaos`, and the `packages/broker` block missing. The real lockfile must pass and each mutation must fail.
4. Correction C1 changed one commit and one path only, as acts C1 and Part E of the acceptance act require, and it changed no other path.
5. The merge order in A3 left no defect, and at the reviewed head the invariants of both Task 33 and Task 34 hold. If the order left an invariant unproven, the reviewer says which.
6. Executed checks at the head: `bun install --frozen-lockfile`, `bunx tsc --noEmit`, `bun test test/phase3a/architecture-phase3a.test.ts`, and the full `bun test`, with counts. A check that could not be run is reported as not run, and it does not count as passed.
7. Each Copilot or advisory finding on PR #93 and PR #94 that no act ruled: the reviewer reports whether it is resolved in the code at the head or still open, and whether an open one is a defect, which makes this item FAIL, or an advisory.
8. Each deviation from plan text that a builder disclosed in PR #93, PR #94 or PR #113: the reviewer states whether it is acceptable or needs a Founder ruling. A deviation that breaks an invariant makes this item FAIL.

B5. **Verdict form.** The verdict ends with these lines in this order. The label is exactly one of `PASS`, `FAIL` or `INCONCLUSIVE`. Any other label, including a label with a suffix, is not a verdict under this act.

- `Final Verdict: <PASS|FAIL|INCONCLUSIVE>`
- `Tier2-Reviewer-Id: codex`
- `Tier2-Head-Sha: 515eba9ff573eab3820b12900d4f734468395d84`
- `Tier2-Verdict: <PASS|FAIL|INCONCLUSIVE>`
- `Tier2-Reviewer-Model: <the served model id, or unavailable-from-current-harness>`

Advisories are listed under their own heading before the final lines and never change the label.

B6. **Counting.** A finding that a deliverable of Task 33, Task 34 or correction C1 does not meet the plan or an act is a substantive finding, and under act D1 it is a correction round, counted as the rounds log counts rounds. Task 33 is in scope even though its checkpoint step was recorded earlier. An advisory is not a round. An INCONCLUSIVE verdict is not a round. The Founder rules on what follows.

B7. **After the verdict.** The Founder saves the verdict text unedited at `~/verdicts/m14-515eba9-codex-review.txt` and computes its SHA-256. The verdict is posted verbatim as one comment on PR #113 by a session or person the Founder directs. The rounds log records the verdict's SHA-256 and result and never the text. This act and the act that rules on the verdict are filed on `main` together by one docs-only pull request.

## Part C: Not authorized

- Task 35, M15 and every later task.
- Any change to code, tests, `bun.lock`, a manifest, a decision record or the plan. The review is read-only. The reviewer's local mutations are never committed or pushed.
- Treating B2 as precedent for another head, task or reviewer id.

## Part D: Verification

D1. The Founder, or a session the Founder directs, confirms before the review starts that `515eba9ff573eab3820b12900d4f734468395d84` is on `main` and that this act's text is the signed text.

D2. The reviewer re-reads the head it was given. If the head named in B1 is not an ancestor of `main`, the reviewer stops and reports.

D3. The filing session checks that the identifier `DEC-20261003-01` is free in this repository and reports what it could and could not check in FounderOS. It makes no claim about FounderOS that it did not observe.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-03

Actor-Id: founder
