FOUNDER-ACT-20261014-RECORDS-CLEANUP: the approval record brought current, the attribution failure on main ruled, and two records of pull requests 147 and 148 kept

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `cc8d286eb07da598dcb4b10855b395183f61173e`
> **Ratifies:** the patch with SHA-256 `5ee0eae877a6a83f078f3ea745a091ed1e7b5ad3a9b93ba2c7d4f986d43da662` (3,784 bytes) against `docs/decisions/PLAN-OPEN-approval-record.md`, which changes its SHA-256 from `14e79fd47697fb2251b2e04008cd0245801a486fbb745728ce7fb8819fd216eb` to `33600a809828000efb2b40ecce1dcb49a0b4d65a42032809aef7b2b1b33f0c3e`
> **Replaces:** the earlier signed text of this act, SHA-256 `4fa904cc1632b5658433986c050da2e385e9c8973a3a6e85eab6dac895291704`, and its patch, SHA-256 `c9bf5ccc8450974c6f3db8a0f414f80018bae5afdb3ca36dbddc55960b4eba3f`, which were filed in pull request 149 and not merged
> **Read with:** `DEC-20261013-05`; the merge authorizations of pull requests 146, 147 and 148; `.github/scripts/attribution-shape-check.sh`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The approval record is stale.** `DEC-20261013-05` changed `PLAN-OPEN-1` to SHA-256 `d40682beb5a5c3f617638b1775f3777e25c66e12787b9269141164dcc3d9bc42` and `PLAN-OPEN-2` to `b60676aa47b216c36d9080c884650943cdac93dd12109d2864ebcf0eb6887d8c`. `docs/decisions/PLAN-OPEN-approval-record.md` still lists `196b91b8c9ffbda3d4319c4a8abc96c20ffe16950ba23864eb8780de356f5aee` and `7ceb367c48adb1954e107ed7cdfd5578277f88c1acadb21561e043d24a95417f`. Item 3 of my merge authorization of pull request 146 ruled that the new values are read there until a later documentation change records them. This act is that change.

A2. **The attribution failure on main.** Pull request 147 merged as `b5662096d0f03929602c90a0d8c2c5cfaa8ad24d`. Its pull request body became the merge commit message, and in that body a wrapped line of prose began with `Actor-Id: founder);`. The Attribution Shape Check run on the push to main failed for that commit, because the checker in main mode treats any line outside the final trailer block that begins with an attribution key as a violation. The check in prbody mode had passed on the pull request. The drafting assistant reproduced the failure with the repository's own checker in main mode. The final trailer block of that commit, `Role-Id: builder`, `Actor-Id: session:claude-code/tui-imac-scope-filing` and `Execution-Surface: claude-code`, is correct. Main is not rewritten.

A3. **The prevention used since.** The filing prompt of `DEC-20261014-02` required the session to check its commit message and pull request body for lines that begin with an attribution key outside the final trailers, and the drafting assistant ran the main-mode check on a local merge whose message was the body of pull request 148 before it merged. Pull request 148 merged as `cc8d286eb07da598dcb4b10855b395183f61173e`, and its push runs on main were green.

A4. **Pull request 148 left draft without a posted ready authorization.** I marked it ready myself at 2026-10-14T11:39:44Z. Item 4 of my merge authorization of that pull request records it in place of one.

A5. **What this text changes.** Copilot's review 5523945276 of pull request 149, on 2026-10-14, found that the earlier patch added Revision 6.3 to the record's sentence on externally recorded revisions but not to the record's Approval lineage table, which carries one row for every revision. The patch in the header adds that row, in the form of the rows for Revisions 5.8 to 6.2, and is otherwise the earlier patch.

A6. **The drafting assistant.** It drafted this act and both patches, missed the lineage row in the first, checked the hashes in A1 at the commit in the header, and checked that the patch applies cleanly and that `git diff --check` passes. None of that is an independent review.

## Part B: Founder rulings

B1. **The approval record.** I ratify the patch in the header as Revision 6.3 of the approval record. It records the contents of `PLAN-OPEN-1` and `PLAN-OPEN-2` that `DEC-20261013-05` ratified, keeps the earlier values as previous ones, adds a Revision 6.3 row to the record's Approval lineage table, and adds Revision 6.3 to the record's list of revisions recorded externally. It changes nothing else in the record. It takes effect when it is on `main` together with this act.

B2. **The external entry.** After the merge, I post on Founder authorization artifact 18, as for Revision 6.2, the patch SHA-256 and byte count, the baseline, the resulting commit, the merge commit and the resulting approval-record SHA-256 of Revision 6.3. The drafting assistant drafts that entry, and no agent posts it.

B3. **The commit `b5662096d0f03929602c90a0d8c2c5cfaa8ad24d`.** The failed Attribution Shape Check on its push run is a false positive from a wrapped line of prose. The attribution of that commit is its final trailer block as stated in A2. The run stays red and is not re-run, and main is not rewritten.

B4. **Prevention until the checker changes.** Every filing prompt and every builder prompt I sign requires the session to check its commit message and its pull request description for any line, other than the final trailers and the Co-Authored-By line, that begins with `Role-Id:`, `Role-Id-Secondary:`, `Actor-Id:` or `Execution-Surface:`, and to rewrap any such line before it commits or opens the pull request. Before I merge a pull request, the drafting assistant runs the main-mode check on a local merge whose message is that pull request's body. Changing the checker so that prbody mode catches such a line needs its own act.

B5. **Pull request 148.** The record of A4 stands as the ready-for-review record of that pull request, and no further record is made.

B6. **Counting.** These are new Founder rulings, which plan §11.3 does not count. They add no round. Rubric milestone 1 stays at **5**, rubric milestone 4 at **3**, and rubric milestone 6 as the log records it when this act is filed.

## Part C: Filing

C1. One docs-only pull request files this act and applies the patch, and changes nothing else. It merges only when every required check succeeds, under my separate merge authorization.

## Part D: Not authorized

- Any change to `.github/scripts/attribution-shape-check.sh`, a workflow, or any other part of the approval record.
- Rewriting main, re-running the push runs of `b5662096d0f03929602c90a0d8c2c5cfaa8ad24d`, or editing a merged pull request.
- Any post on Founder authorization artifact 18 by an agent.
- Any change to code, a test, the plan, a spec or another decision record.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-14

Actor-Id: founder
