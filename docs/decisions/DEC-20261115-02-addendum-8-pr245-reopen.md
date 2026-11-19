DEC-20261115-02 ADDENDUM 8: new runs of pull request 245 after DEC-20261117-01

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** `DEC-20261115-02` B12, for the runs of pull request 245
> **Read with:** `DEC-20261115-02` and its Addenda 1 to 7; `DEC-20261117-01` B2 and B6, and its Addendum 1 B4

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The failed runs.** My guarded command opened pull request 245, M0's draft pull request, as `decivantiq` at 22:51 UTC on 2026-11-17, at head `6da70bc5892f6d2ab27475afdc348b32835b3f7e` of `build/3b-m0-r1`. Its jobs `Verify`, `Verify (macOS)`, both `tui-chaos` jobs, `validate-code-review` and `code-review` failed within a minute in the expiry guard of `.github/actions/setup-qualified-bun`, with "EXPIRED: PR 40304 closed unmerged". `DEC-20261117-01` B6 rules that those failures are not the work of any pull request.

A2. **The fix on main.** Pull request 246 merged at 01:59 UTC on 2026-11-18 as `be78eea1db2d2f103ba70627298a1be94fd9f758`. It put `DEC-20261117-01`, its Addendum 1, the patched action and the repinned workflows on `main`, and the three runs on `main` at that commit succeeded.

A3. **Why a new event.** Under B4 of Addendum 1 of `DEC-20261117-01`, the jobs of pull request 245 pass only in a run started by a new event of that pull request, because a re-run keeps the merge commit, and so the old pin, of the run it repeats; how that event comes about is a decision under this act. A push to `build/3b-m0-r1`, a merge of `main` into it included, would move the head that the builder's Phase 2 record, its final report and the runs of B12 name. Closing and reopening the pull request starts new runs without changing its branch.

A4. **The branch and main.** Since their merge base, the binding base `0825a1e349ca5ea6427eea5f2de79dff234dc8f7`, `main` has changed 16 paths, all under `.github/`, `docs/decisions/` or `docs/verification/`, or `README.md`, and the branch has changed none of them; git finds no conflict between them. The new runs test the head merged with `main`, as every run of a pull request does.

A5. **The drafting assistant.** It drafted B6 of `DEC-20261117-01`, which had these jobs simply run again, without checking the pin or how a re-run works, and it drafted this addendum. That is not an independent review.

## Part B: Founder rulings

B1. **The reopen.** My guarded command, as `decivantiq`, closes pull request 245 and reopens it at once. It changes nothing else: the branch, its head `6da70bc5892f6d2ab27475afdc348b32835b3f7e`, the title, the body and the draft state stay as they are, and it requests no review, posts no comment and re-runs no job. If the pull request cannot be reopened, or reopens at any other head or not as a draft, the command stops and it returns to me.

B2. **The runs that count.** The `Verify` and `Verify (macOS)` that B12 requires to pass on the pull request are those of the runs the reopen starts at that head, or of a later run at the same head started by an event I authorize. The failed runs of A1 count for nothing, for or against M0. If a job of the new runs fails, it returns to me with its first error, and nothing re-runs it without my ruling.

B3. **What does not change.** The builder's commits, its Phase 2 record, the runs of B12 on both hosts from fresh clones at that head, the review of B13 and my merge authorization are unchanged. Under B2 of `DEC-20261117-01`, the runs of B12 on my Ubuntu PC use the custodied build.

B4. **Filing and counting.** This addendum takes effect when I sign it, and is filed unchanged with the act that records M0's merge, with Addenda 1 to 7. These are new Founder rulings, which Phase 3A plan §11.3 does not count. Nothing else in `DEC-20261115-02` or its Addenda 1 to 7 changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-18

Actor-Id: founder
