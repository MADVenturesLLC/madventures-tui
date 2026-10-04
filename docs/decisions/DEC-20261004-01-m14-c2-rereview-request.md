FOUNDER-ACT-20261004-M14-C2-REREVIEW-REQUEST: non-authoring re-review of correction C2 and the M14 chain requested at one exact head

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Head to be reviewed:** `f6cecd671810e4f68e2760abfc3d3a8758e5e8eb`
> **Correction act:** `docs/decisions/DEC-20261003-02-m14-verdict-fail-correction-c2.md` (v2), SHA-256 `7766e994cf96524f1f22a4448c642b71eb1080b486484e2b5271d5562b744d96`, on `main` since merge commit `b965a8ef737ca840a2661bb8dd9ab49f764ff95f` (PR #114)
> **First review request act:** `docs/decisions/DEC-20261003-01-m14-review-request.md`, SHA-256 `1a7acd2e1d2a78116685d37594373ec1161b831eb33e6a6b9a3991da45d09b16`
> **First verdict:** FAIL at `515eba9ff573eab3820b12900d4f734468395d84`, file SHA-256 `323a58be2e0580291832f36d955ad8177a1126ba485aaa82008f2d2fcf77da3f`, posted verbatim on PR #113 as comment `5975650599`
> **Correction C2 merge:** PR #116, merge commit `f6cecd671810e4f68e2760abfc3d3a8758e5e8eb`, parents `b965a8ef737ca840a2661bb8dd9ab49f764ff95f` and `8b8d789527e2ca67ddfeb98beaa20707b15973d1`, 2026-10-04

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What the correction act requires.** Part E1 of the correction act requires a non-authoring review of the exact merged head after correction C2 merges. It covers findings V1 to V4 as corrected, any regression in Task 33 and Task 34, and the rounds log entries made under its Part D. Part E3 closes the M14 review checkpoint only by a Founder act that accepts a PASS or PASS-WITH-ADVISORIES verdict. Until then Task 35 and everything after it in M15 stay unauthorized.

A2. **The correction as merged.** PR #116 is one commit, `8b8d789527e2ca67ddfeb98beaa20707b15973d1`, on base `b965a8ef737ca840a2661bb8dd9ab49f764ff95f`. Against that base it changes exactly two paths: `test/phase3a/architecture-phase3a.test.ts`, SHA-256 `95318f3fb5fa283f736a0f7f2e519e8e50233b2d28b60076a9dc5fe4f08a6595`, and `test/phase3a/negative-control.ts`, SHA-256 `dcd79d6f7df1a80be30ff399b1a35f14a696966f4655337ad8f03adb893e0a58`, with 467 additions and 120 deletions. Between `515eba9ff573eab3820b12900d4f734468395d84` and the head the only other changes are `AGENTS.md`, from PR #115 at `f81e2a03efd9f7bc1546b10edb589f14950c8e01`, and the three docs paths filed by PR #114. The `attribution-shape-check.sh main` check on the merge commit passed. The drafter read this itself. It is not an independent review.

A3. **Points the drafter found and the reviewer must examine.** They are facts, not rulings.

- The builder proved RED by running the new test bodies against the literal base runner and the base assertions moved behind three seams, `runEntryPath`, `assertCliOutcome` and `tuiPathFailures`. The new tests call those seams, so they cannot run against the old inline code directly. Seven V-labelled tests failed that way and 49 of 49 passed with the fix. The drafter separately broke the fix in seven ways on a disposable copy, and each break failed the intended test.
- The first V2 probe of the builder passed against the old code without reaching its claim. The builder disclosed it and corrected the probe.
- A Copilot review of PR #116 raised one finding, labelled high severity: the runner waits for stdout and stderr to close after the child exits, so a descendant that keeps a pipe open hangs it. It is the first residual risk the builder disclosed. The drafter probed it: the test times out and fails, and the runtime directory is left behind. The Founder did not change the code, because act C1 requires the runner to resolve only after the streams close. The review summary also mentions buffering after overflow, without a thread.
- The builder's second disclosed residual risk is that `socketAbsent` is still `existsSync`, as at `515eba9ff573eab3820b12900d4f734468395d84`.
- The first verdict listed advisories that no act has ruled: the scanner's gaps for dynamic imports, `require` and extension-suffixed specifiers; no committed negative mutation test for the C1 lockfile scan; doubled quotes in the C1 root-label message; mid-file imports and repeated architecture-test runs on PR #93; and the Task 33 launch evidence accepted by exception.
- In the drafter's Linux sandbox as uid 0 with Bun 1.3.11, the full suite shows 8 failures and 1 error on both the old and the new head, the same set. The first reviewer saw none on its macOS host. The reviewer reports its own host and Bun version.

## Part B: Founder rulings

B1. **The review.** A non-authoring review of the tree at exactly `f6cecd671810e4f68e2760abfc3d3a8758e5e8eb` is requested. It covers correction C2 (PR #116), findings V1 to V4 as corrected, any regression in Task 33 and Task 34, and the filing record of PR #114. The reviewer states its surface and states that it authored none of the reviewed work. The review is bound to that head. A later commit on `main` does not change what is reviewed.

B2. **Reviewer id.** The verdict must be signed `Tier2-Reviewer-Id: gemini-antigravity`. Plan section 11.3 names Gemini Antigravity Tier-2 review as a countable verdict source, and the rounds log records earlier Tier-2 verdicts by `gemini-3.1-pro-high`, so this review needs no registry mapping exception. The reviewer reports the model id its session actually used on the `Tier2-Reviewer-Model` line. The `agy` CLI cannot machine-verify that identity, which the plan records as a residual, and the Founder accepts the reviewer's own statement of it as unverified. This is not precedent for another head, task or reviewer id, and it does not carry over from the first review.

B3. **Evidence base.** The review is a live, read-only reading of the repository at the exact head, plus checks the reviewer executes in a disposable checkout detached at the head. It restores or discards every mutation and commits and pushes nothing. No assembled packet is provided or required. The reviewer states what it executed, what it only read, its host, its Bun version, and that CI selects a qualified custodied Bun revision and not a version pin. It states whether its session had seen any authoring session's report, or the drafter's analysis, for this head, and whether it or the same service had any part in the Gemini advisory reviews on PR #93. The Founder rules on those statements. The reviewer must be able to run commands in the disposable checkout. A review that can only read the repository cannot execute the checks in items 1, 3 and 4.

B4. **The review items.** The verdict is PASS only if all seven pass. The reviewer reports each as PASS or FAIL with evidence.

1. Findings V1 to V4 are corrected at the head. For each, the reviewer states in its own words what the requirement is in Task 34 Step 1 and in act C1 of the correction act, reads the code, and executes its own reproduction of the first verdict's probe against the merged code: 32,769 repetitions of a two-byte character for V1; a SIGTERM-ignoring child that prints the readiness token after the deadline, and a child that exits 0 without readiness, for V2; a child that leaves `broker.sock` or fails its outcome, and a descendant that writes after the child exits, for V3; an injected `lstatSync` error other than ENOENT for V4. It also breaks the fix at least once per finding on a disposable copy and reports which test failed. A finding the reviewer cannot reproduce as corrected makes this item FAIL.
2. Correction C2 conforms to the correction act. It is one commit and two paths against `b965a8ef737ca840a2661bb8dd9ab49f764ff95f`. Each clause of acts C1, C2, C3 and C5 is met, and each of V1 to V4 has a committed test that is RED against the old logic and GREEN after the fix. The reviewer judges whether the builder's seam-based RED method meets act C2, or needs a Founder ruling, and says why. A test that passes vacuously on any user id makes this item FAIL.
3. Task 33 and Task 34 invariants still hold. The broker index exports none of the eight named symbols, only `packages/broker/test/socket.test.ts` imports `socket.ts`, no production source constructs a `unix://` URL, the preserved modules and `createFakeByteRouter` exist, the root scripts `broker` and `mcp` are absent and the four `test:*` and `verify:phase3a` scripts are present, `packages/broker/package.json` declares no `node-pty`, and the README lacks the two broker-daemon lines. The negative control detects a seeded `broker.sock`, respects its depth bound and never reads `MADV_RUNTIME_DIR`. The `tui-chaos` carve-out is enforced and nothing wider: on a disposable copy of `bun.lock`, the real file passes, and `node-pty` in the `packages/broker` block, `node-pty` in another workspace block, and the `packages/broker` block missing each fail.
4. Executed checks at the head: `bun install --frozen-lockfile`, `bunx tsc --noEmit`, `bun test test/phase3a/architecture-phase3a.test.ts`, and the full bare `bun test`, with the four counts Bun prints. A check that could not be run is reported as not run and does not count as passed. A failure the reviewer attributes to its host is shown to occur identically at `b965a8ef737ca840a2661bb8dd9ab49f764ff95f`, or it counts as a failure.
5. The filing record is accurate. The two acts on `main` have the SHA-256 values in the header of this act. The path set from `515eba9ff573eab3820b12900d4f734468395d84` to the head is exactly `AGENTS.md`, the three docs paths and the two test files. The rounds log entry for rubric milestone 9 matches Part D1 of the correction act: the review request and head, the verdict result and its SHA-256 and not its text, findings V1 to V5, round 1 of 2, the V5 disposition, the reassignment sentence, and that the checkpoint stays open. The body of comment `5975650599` on PR #113 is its four header lines, a blank line and the verbatim verdict, and the verdict part has SHA-256 `323a58be2e0580291832f36d955ad8177a1126ba485aaa82008f2d2fcf77da3f`.
6. Open points are classified. For the Copilot finding on PR #116 and the overflow-buffering remark, the builder's two residual risks, and each advisory the first verdict listed, the reviewer reports whether it is a defect, which makes this item FAIL, or an advisory. A defect is a point that leaves a requirement of V1 to V4 unmet or leaves a Task 33 or Task 34 invariant unproven. It says which points need a Founder ruling.
7. Each deviation the builder disclosed in PR #116 and in PR #114 is classified as acceptable, or as needing a Founder ruling. A deviation that breaks an invariant makes this item FAIL.

B5. **Verdict form.** The verdict ends with these lines in this order. The label is exactly one of `PASS`, `FAIL` or `INCONCLUSIVE`. Any other label, including a label with a suffix, is not a verdict under this act.

- `Final Verdict: <PASS|FAIL|INCONCLUSIVE>`
- `Tier2-Reviewer-Id: gemini-antigravity`
- `Tier2-Head-Sha: f6cecd671810e4f68e2760abfc3d3a8758e5e8eb`
- `Tier2-Verdict: <PASS|FAIL|INCONCLUSIVE>`
- `Tier2-Reviewer-Model: <the served model id, or unavailable-from-current-harness>`

Advisories are listed under their own heading before the final lines and never change the label. A PASS that lists advisories is a PASS-WITH-ADVISORIES result for act E3 of the correction act. The label itself stays PASS.

B6. **Counting.** A finding that a deliverable of correction C2, Task 33 or Task 34 does not meet the plan or an act is a substantive finding. A FAIL on a substantive finding is round 2 of 2 under rubric milestone 9, as the rounds log counts rounds, and one verdict adds at most one round. A third counted round requires reassignment under plan section 11.3. A point this act or the correction act already ruled, including the V5 disposition and the unruled advisories noted in act B7 of the correction act, is not a substantive finding when the reviewer reports it as it is ruled. An advisory is not a round. An INCONCLUSIVE verdict is not a round. A reviewer that cannot execute the checks in items 1, 3 and 4 returns INCONCLUSIVE and names the checks it could not run. It does not return FAIL for that reason. The Founder rules on what follows.

B7. **After the verdict.** The Founder saves the verdict text unedited at `~/verdicts/m14-c2-rereview-gemini-antigravity.txt` and computes its SHA-256. The verdict is posted verbatim as one comment on PR #116 by a session or person the Founder directs, with a header that names the head, the file SHA-256 and this act. The rounds log records the verdict's SHA-256 and result and never the text. This act and the act that rules on the verdict are filed on `main` together by one docs-only pull request.

## Part C: Not authorized

- Task 35, M15 and every later task.
- Any change to code, tests, `bun.lock`, a manifest, a decision record or the plan. The review is read-only. The reviewer's local mutations are never committed or pushed.
- Treating B2 as precedent for another head, task or reviewer id.
- Accepting the verdict or closing the M14 review checkpoint. That needs a separate Founder act under act E3 of the correction act.
- A bounded stream drain or any other change to the runner. It needs its own Founder act.

## Part D: Verification

D1. The Founder, or a session the Founder directs, confirms before the review starts that `f6cecd671810e4f68e2760abfc3d3a8758e5e8eb` is on `main` and that this act's text is the signed text.

D2. The reviewer re-reads the head it was given. If the head named in B1 is not an ancestor of `main`, the reviewer stops and reports.

D3. The filing session checks that the identifier `DEC-20261004-01` is free in this repository and reports what it could and could not check in FounderOS. It makes no claim about FounderOS that it did not observe.

## Part E: What this act does not decide

E1. The drafter ruled nothing on the merits of any finding. If the verdict is FAIL, the Founder decides in a later act whether a further correction is authorized, who builds it, and whether reassignment under section 11.3 applies.

## Part F: Signature

Signed:

— Michael Daley

Date: 2026-10-04

Actor-Id: founder
