FOUNDER-ACT-20261004-M14-C2-ACCEPTANCE: M14 re-review verdict PASS accepted, advisories ruled, M14 review checkpoint closed

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Head reviewed:** `f6cecd671810e4f68e2760abfc3d3a8758e5e8eb`
> **Re-review request act:** `docs/decisions/DEC-20261004-01-m14-c2-rereview-request.md`, transfer commit `a18a9aa389d10a92119dc56e63db7268b9dcc203`, file SHA-256 `a764418d6680cad979ed432cd6691bbe9529548b10fdce306caf0b26ecd7b138`
> **Correction act:** `docs/decisions/DEC-20261003-02-m14-verdict-fail-correction-c2.md` (v2), file SHA-256 `7766e994cf96524f1f22a4448c642b71eb1080b486484e2b5271d5562b744d96`
> **Task 34 acceptance act:** `docs/decisions/DEC-20261002-01-m14-task34-acceptance.md`, file SHA-256 `c4b49be73c7ee42dd2c3f6743443966faddf6f4fce0711f9db7773baa171ed6b`
> **Verdict text of record:** `transfer/m14-c2-rereview-gemini-antigravity.txt`, transfer commit `349fe0347b5324ef6fbf0c738053ed5924acdf3e`, SHA-256 `68c8e1fbb73f2d6595e8eccb0c91022ee1b2258914a020771fde6f5f15f2a21c`, 109 lines, 7,791 bytes
> **Addendum text of record:** `transfer/m14-c2-rereview-gemini-antigravity-addendum.txt`, transfer commit `ba6d16ad9ccd31c419e2b68dd3a3301b12d43ab4`, SHA-256 `76c908807ecc729f90edb3723c1317ff3771b237cd1f16d6117d528453ff3e26`, 92 lines, 7,927 bytes

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The verdict.** The non-authoring re-review requested by the re-review request act returned `Final Verdict: PASS`, with `Tier2-Reviewer-Id: gemini-antigravity`, `Tier2-Head-Sha: f6cecd671810e4f68e2760abfc3d3a8758e5e8eb`, `Tier2-Verdict: PASS` and `Tier2-Reviewer-Model: unavailable-from-current-harness`. It reports no findings and lists advisories. It also reports that the reviewer ran `bun` itself, on the Founder's Mac with Bun 1.4.2. When the Founder asked the session which model it was, it answered that it was running Gemini 3.1 Pro (High) in the Antigravity CLI. The verdict's model line does not repeat that, and nothing verifies it.

A2. **Form, as the drafter read it.** The five final lines are in the order act B5 requires, the label is exactly `PASS`, the head and the reviewer id are the ones the act names, and `Final Verdict: PASS` appears once. The drafter read this itself. It is not an independent review.

A3. **Where the texts of record come from.** The Founder could not export the session's text byte for byte. The texts named in the header are the drafter's transcriptions of what the Founder pasted. They differ from that paste in these ways only: two lines that belong to neither document were dropped, namely a preamble before the report and a progress line between the report and the addendum; the terminal's two-space left indent and its trailing padding were stripped from every line; and one final newline was added. The bullets, the hard line wraps at about 165 columns, the `...` line in the addendum and every word were kept. The line structure of the addendum matches the Founder's raw copy of it, which has 91 newlines and no final newline. The report has no raw copy to compare against. The Founder keeps the raw terminal copy of the addendum under a different name. It is not cited.

A4. **What the review reports.** The reviewer states that it ran items 1, 3 and 4 before reading any builder report or any analysis by the drafter. It reports `bun install --frozen-lockfile` and `bunx tsc --noEmit` at exit 0, the architecture file at 49 pass, 0 fail and 474 expect calls, and the full suite at 1559 pass, 0 fail, 7726 expect calls over 95 files. The first review saw 7,724 expect calls at the old head, and 7,726 is that plus the 2 that correction C2 added to the architecture file. The reviewer states that it reproduced the first verdict's probes against the merged code, that its four breaks of the fix each failed the intended test, that the three `bun.lock` mutations fail and the real lockfile passes, and that the negative control behaves at depth 6, at depth 7 and with `MADV_RUNTIME_DIR` set. These are the reviewer's statements.

A5. **What the drafter corroborated.** On the merged head in a disposable Linux checkout, the drafter ran the architecture file at 49 pass, 0 fail and 474 expect calls, and broke the fix in seven ways, each failing the intended test. They were: counting UTF-16 units for the cap, swallowing lstat errors, asserting the outcome before the sockets, resolving on exit and not on stream close, dropping the readiness socket reading, dropping the timeout and late-readiness checks together, and ignoring exit before readiness. The reviewer's four breaks agree with these. The drafter read this itself and is the drafter of the correction act.

A6. **Two errors in the addendum.** Section B of the addendum names the PR #116 commit as `8b8d7890b5e43a9f02a6be1bdc1db0bc9165b4c1`. That object does not exist. The commit is `8b8d789527e2ca67ddfeb98beaa20707b15973d1`. The same line says the commit was squashed into `f6cecd671810e4f68e2760abfc3d3a8758e5e8eb`. It was not squashed. PR #116 merged as a merge commit with two parents, `b965a8ef737ca840a2661bb8dd9ab49f764ff95f` and `8b8d789527e2ca67ddfeb98beaa20707b15973d1`. The drafter checked both against the repository. The reviewer was asked to restate abbreviated identifiers in full, and it supplied a wrong one.

A7. **Weaknesses the drafter noted.** The reviewer's judgment in the addendum that the builder's seam-based RED method is acceptable for V1, V2 and V3 restates the builder's own account and is labelled reasoned. The reviewer did not reproduce RED against the old logic itself. Items 2, 6 and 7 are labelled read or reasoned. The first report writes `515eba9` and `8b8d789` where the prompt asked for full identifiers. The V3 probe is described with a readiness checkpoint for a child that exits 1.

## Part B: Founder rulings

B1. **Verdict accepted.** The PASS at `f6cecd671810e4f68e2760abfc3d3a8758e5e8eb` is accepted. It lists advisories, so it is a PASS-WITH-ADVISORIES result for act E3 of the correction act, as act B5 of the re-review request act provides. It adds no correction round.

B2. **Provenance exception.** For this verdict and its addendum only, the Founder accepts the transcriptions named in the header, as described in A3, as the texts of record in place of the unedited file that act B7 of the re-review request act says the Founder saves. The hashes cited in this act and in the rounds log are the hashes of those transcriptions. The raw terminal copy of the addendum is not cited. This is not precedent for another verdict.

B3. **The reviewer's statements.** The Founder accepts, as statements and not as verified facts, the reviewer's identity as Gemini Antigravity under act B2 of the re-review request act, its statement that it authored none of the reviewed work and had no part in the Gemini advisory reviews on PR #93, and its statement of the order in which it read the reports. The model line stays `unavailable-from-current-harness`.

B4. **The addendum.** The addendum is supplementary evidence and not a second verdict. It changes no label and no item result. The Founder gives no weight to the two statements in A6. The correct commit is `8b8d789527e2ca67ddfeb98beaa20707b15973d1`, and PR #116 merged as a merge commit.

B5. **The seam-based RED method.** The Founder rules that the builder's method of running the new test bodies against the base runner and the base assertions behind three seams meets act C2 for V1 to V4. The ruling rests on the reviewer's judgment, on the drafter's seven independent breaks in A5, and on the reviewer's four breaks. The Founder notes that the reviewer's judgment restates the builder's account, as A7 records.

B6. **The advisories.** The Founder rules that each of these stays an advisory and that no code changes under this act.

- The runner waits for stdout and stderr to close after the child exits, so a descendant that keeps a pipe open hangs it until Bun's test timeout fails the test, and the runtime directory is left behind. It fails closed. Act C1 requires the runner to resolve only after the streams close. A bounded stream drain would need its own Founder act and is not authorized here.
- The runner keeps buffering output after the 65,536-byte cap is flagged, until the child dies. It still flags the overflow.
- `socketAbsent` uses `existsSync`, so an unreadable parent or a dangling symlink reads as absent, as at `515eba9ff573eab3820b12900d4f734468395d84`.
- The advisories listed in act B7 of the correction act stay as they are: the scanner's gaps for dynamic imports, `require` and extension-suffixed specifiers; no committed negative mutation test for the C1 lockfile scan; the doubled quotes in the C1 root-label message; the PR #93 convention and performance advisories; and the Task 33 launch evidence accepted by exception.

No milestone is bound to these advisories by this act. A later Founder act may rule on any of them.

B7. **The V5 disposition stands.** The assertions on focus state and on `terminateAll()` cleanup, and the snapshot read-only case, that Task 33 removed from `apps/madbridge/test/pty-focus.test.tsx` remain owed to the PTY-host milestone, as act B6 of the correction act rules.

B8. **Counting.** The PASS adds no round. Correction C2 was the remedy for round 1 and added none. Rubric milestone 9 stands at round 1 of 2. A second counted round on any milestone that shares it is within the budget, and a third requires reassignment under plan section 11.3.

B9. **The M14 review checkpoint is closed.** On the basis of the PASS above, the M14 review checkpoint that `DEC-20260924-03` A2 left open, and that act D2 of the Task 34 acceptance act and act E3 of the correction act hold open until a Founder act accepts a verdict, is closed at `f6cecd671810e4f68e2760abfc3d3a8758e5e8eb`. The M14 half of the precondition of Task 35, that M14 is reviewed, is met. This act does not authorize Task 35.

## Part C: Authorized scope

C1. One docs-only pull request files this act, the re-review request act `DEC-20261004-01`, and a rounds log entry. The entry records: the re-review request and the head reviewed; the verdict result PASS, its SHA-256 and the addendum's SHA-256, and never their text; the provenance in A3 and the exception in B2; the errors in A6; the three advisories and the other advisories under B6; round 1 of 2 unchanged under rubric milestone 9; and the closure of the M14 review checkpoint under B9. The filing pull request is a draft, merges by merge commit with the head pinned, and changes exactly the two act files and `docs/verification/phase-3a-correction-rounds.md`.

C2. The verdict text and the addendum text are each posted as one comment on PR #116 by a session or person the Founder directs. Each carries a header that names the head, the file SHA-256, this act and the provenance in A3, and each is placed inside a fenced block so that its layout is shown as saved. The drafter has not posted them.

## Part D: Not authorized

- Task 35, M15 and every later task. Each needs its own Founder act under the per-task rule.
- Any change to code, tests, `bun.lock`, a manifest, a decision record other than the filing under Part C, or the plan.
- A bounded stream drain or any other change to the runner.
- Treating B2 or B5 as precedent for another verdict, review or task.

## Part E: Verification

E1. The filing session checks, before it commits, that `origin/main` is `f6cecd671810e4f68e2760abfc3d3a8758e5e8eb` or a docs-only descendant of it; that the staged act files match their recorded SHA-256 values; that this act's text is the signed text with Status ISSUED and the signature in Part G; and that the identifier `DEC-20261004-02` is free in this repository, reporting what it could and could not check in FounderOS and making no claim about FounderOS that it did not observe.

## Part F: What this act does not decide

F1. This act does not rule on Task 35, on any M15 task, or on the horizon value of `PLAN-OPEN-3`. It does not decide whether a bounded drain is ever wanted.

## Part G: Signature

Signed:

— Michael Daley

Date: 2026-10-04

Actor-Id: founder
