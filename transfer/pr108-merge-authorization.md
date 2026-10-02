MERGE AUTHORIZATION: MADVenturesLLC/madventures-tui#108

Authorized head: f72e49e850eb38d882430c37b96bc834f19ab32d
Base: main at 1249491169d47e19afc6fe3a09a81b8b7c6ee270

I, Michael Daley, Founder of MAD Ventures, authorize the merge of this pull request at the exact head SHA above and at no other. Any push after this comment voids this authorization.

Verified before issuing (2026-10-02, after the last required check completed at 08:36:18Z):
1. Required checks green on this head: Verify (completed 2026-10-01T09:05:17Z), Verify (macOS) (09:06:19Z), and code-review (status success at 2026-10-02T08:36:16Z, run 36984422939 attempt 2, "typecheck and tests passed; review threads resolved"). attribution-shape, CodeQL, both tui-chaos runs, copilot-pull-request-reviewer and Cursor Security Agent also success. Earlier code-review runs on this head ended failure, cancelled or action_required before the threads were resolved. They are superseded by run 36984422939 attempt 2.
2. Independent reviews: the Part E review at 0e5a930d9ba02522030356264ec4dfa6d727bf77 returned FAIL (comment 5927922921), counted as round 3. The re-review at this head returned PASS-WITH-ADVISORIES, all eight F2 items PASS (comment 5944288206), accepted under FOUNDER-ACT-20261001-TASK23-REREVIEW-ACCEPTANCE (docs/decisions/DEC-20261001-02-task23-rereview-acceptance.md, merged in #110 as 1249491169d47e19afc6fe3a09a81b8b7c6ee270) and recorded in docs/verification/phase-3a-correction-rounds.md.
3. Correction rounds: the re-review identified no substantive defect, so it is not a round. Rubric milestone 7 stands at 3.
4. Review threads: both are resolved after a Founder reply in each. The github-code-quality thread on test line 715 is resolved under DEC-20261001-02 B6. The Copilot thread on in-process-client.ts line 281, labeled High, is the item recorded as O1 in DEC-20261001-02 B4: outputSeqs.set runs before the byte copy, the same order as the binding base. I carry O1 as not fixed. No change is authorized in Task 23, and I accept that on the test-only path a failed copy leaves the last accepted outputSeq advanced until a later act rules on it.
5. This pull request left draft under the ready-for-review authorization, posted twice with identical text (comments 5947977129 and 5948170077). Marking it ready came after both.
6. No pending push. Exactly two paths change against the Task 23 binding base ed853080a4bea377c2f5cf274c90f740ab1c9cac: packages/broker/src/in-process-client.ts and packages/broker/test/in-process-client.test.ts. client.ts, snapshot.ts, command-legality.ts, ownership-machine.ts, runtime-broker.ts, index.ts, packages/protocol and packages/ledger are unchanged. The three paths changed on main since this pull request's base 6327f397d95d697f2daca63e18d85fed53c20c3b are docs-only: the two Task 23 decision records and docs/verification/phase-3a-correction-rounds.md.
7. I accept Task 23 at its M10 review checkpoint at this head. The M10 milestone review stays open. This authorization does not authorize Task 24, Task 25 or any later task.
8. The merge is to be entered in docs/verification/phase-3a-correction-rounds.md by a docs-only pull request after this merge. This authorizes that path in that pull request, and nothing else.
9. Body: zero bare three-hyphen lines, checked immediately before issuing. The attribution check passes on this head.

Merge method: merge commit, head SHA pinned, no caller-supplied message. Verify the merge commit on main immediately after: trailers present and parseable, attribution-shape-check.sh main <merge-sha> passing, push-run of attribution-shape green. If that fails, stop; do not rewrite main.
