MERGE AUTHORIZATION: MADVenturesLLC/madventures-tui#113

Authorized head: b451885897107c30711689fc388314eab57b04d5
Base: main at b5ea492e529483102103744a2ede46f3be429e9f

I, Michael Daley, Founder of MAD Ventures, authorize the merge of this pull request at the exact head SHA above and at no other. Any push after this comment voids this authorization.

Verified before issuing (2026-10-03, after the last check below completed at 11:11:21Z):
1. Required checks green on this head: Verify (completed 2026-10-02T23:11:01Z), Verify (macOS) (23:12:14Z) and code-review (success at 2026-10-02T23:10:48Z, run 37076159468, "typecheck and tests passed; review threads resolved"). Marking this pull request ready started no new run of these three. attribution-shape, CodeQL, both tui-chaos runs and validate-code-review also succeeded. After it was marked ready, copilot-pull-request-reviewer (completed 2026-10-03T11:09:47Z) and Cursor Security Agent (completed 11:11:21Z) succeeded.
2. Review threads: none exists. The Copilot review of this head (review 5400456303) reports no findings.
3. Ready-for-review: this pull request left draft under my ready-for-review authorization, posted once as comment 5968570342. Marking it ready came after that comment.
4. Authority and scope: act C1 of FOUNDER-ACT-20261002-M14-TASK34 (docs/decisions/DEC-20261002-01-m14-task34-acceptance.md, merged as b5ea492e529483102103744a2ede46f3be429e9f) authorizes exactly this correction of finding F2. The pull request is one commit and changes exactly one path against the base, test/phase3a/architecture-phase3a.test.ts (82 additions, 20 deletions). bun.lock, package.json, every package manifest and README.md are unchanged. main is still at the base SHA.
5. Proof: the builder's mutation results and the drafting assistant's own reproduction are recorded in the pull request description and in my ready-for-review authorization. The real bun.lock passes, and the test fails when node-pty is planted in the packages/broker block, when it is planted in another workspace block, and when the packages/broker block cannot be found.
6. Reviews and rounds: no non-authoring review has been done on this head. Act D1 requires one of the exact merged head, covering Task 33, Task 34 and this correction, after this pull request merges. This correction is not a new correction round, and rubric milestone 9 is not changed. The M14 review checkpoint stays open. This merge is not an acceptance of the M14 review.
7. Not authorized by this comment: Task 35, M15, any later task, any push to build/m14-task34-c1, any change to a path other than the one above, and any documentation pull request. The record of this merge is made with the act that requests the review under D1.
8. Body: zero bare three-hyphen lines, checked immediately before issuing.

Merge method: merge commit, head SHA pinned, no caller-supplied message. Verify the merge commit on main immediately after: trailers present and parseable, attribution-shape-check.sh main <merge-sha> passing, and the push-run of attribution-shape green. If that fails, stop; do not rewrite main.
