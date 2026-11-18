DEC-20261117-01 Addendum 1: the workflows' pin of the patched action

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `cec21d0f98688b71bef43b3f350fbd14d6606030`
> **Amends:** `DEC-20261117-01` B4, B6 and B7
> **Pull request:** 246, head `07f9620159b44a62669aa191d572adc21501672b` when drafted

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The pin.** The jobs of `.github/workflows/verify.yml`, `.github/workflows/tui-chaos.yml` and `.github/workflows/code-review.yml` do not run the action from their own checkout. Their five Setup Bun steps name it as `MADVenturesLLC/madventures-tui/.github/actions/setup-qualified-bun@d057994a6663a7b56f5603f109b33d79bef333ef`. At that commit the action is blob `45270a27f5f4d2fad64befff3ff91653a6515f4f`, the same blob as on `main` `cec21d0f98688b71bef43b3f350fbd14d6606030`. A change to the action file alone reaches no job.

A2. **Pull request 246.** The filing session of `DEC-20261117-01` B7 committed the act and the patch as `07f9620159b44a62669aa191d572adc21501672b` and opened draft pull request 246. There the action has SHA-256 `37cb25ba17eca50633bd08d54359921ddc0363b2e612c9d6d4da5b716eabd4c8`, blob `83b9303dc6966aca29a54b04337d7d3ee7d500ce`. Its jobs `Verify`, `Verify (macOS)`, both `tui-chaos` jobs and `validate-code-review` failed at 00:06 UTC on 2026-11-18 with "EXPIRED: PR 40304 closed unmerged", from the pinned action, and `code-review` failed after them. The session reported the pin and changed nothing outside its two paths.

A3. **What does not hold.** `DEC-20261117-01` B7 says the pull request's own `Verify` jobs run with the patched action, and its B4 says the patch takes effect when it is on `main` with the act. Neither holds while the pin names `d057994a6663a7b56f5603f109b33d79bef333ef`. Its B6 has the failed jobs of pull request 245 run again. A re-run uses the merge commit of the run it repeats, and that commit's workflows keep the old pin, so a re-run fails again even after the fix is on `main`.

A4. **Merges on main.** `main` merges pull requests with merge commits; `cec21d0f98688b71bef43b3f350fbd14d6606030` has two parents. Once pull request 246 merges, `07f9620159b44a62669aa191d572adc21501672b` is an ancestor of `main`. The present pin `d057994a6663a7b56f5603f109b33d79bef333ef` is not.

A5. **The drafting assistant.** It drafted `DEC-20261117-01`, its filing prompt and this addendum. It wrote B4, B6 and B7 of the act without reading the workflows' pin. It has not run the repinned workflows. That is not an independent review.

## Part B: Founder rulings

B1. **The repin.** Pull request 246 gets one further commit on its branch, whose parent is `07f9620159b44a62669aa191d572adc21501672b`. In the three workflows of A1 it changes the five lines that name `setup-qualified-bun@d057994a6663a7b56f5603f109b33d79bef333ef` so that they name `setup-qualified-bun@07f9620159b44a62669aa191d572adc21501672b`, and changes nothing else in those files. The same commit adds this addendum unchanged as `docs/decisions/DEC-20261117-01-addendum-1-workflow-pin.md`. It changes no other path. A Claude Code filing session makes it under a message I sign.

B2. **B4 of the act.** The patch takes effect when it is on `main` with the act, this addendum and the repin of B1.

B3. **B7 of the act.** The pull request holds the commit of B7 and the commit of B1. Its own jobs run the patched action through the repin. It merges only when `Verify`, `Verify (macOS)`, both `tui-chaos` jobs, `validate-code-review` and `code-review` pass on the head that the commit of B1 makes, and the `Verify` log shows the notice "PR 40304 closed unmerged; custody continues under DEC-20261117-01". It touches `docs/decisions/` and `.github/`, so under `AGENTS.md`, as `DEC-20261031-01` amended it, it merges only by an act of mine naming that head.

B4. **B6 of the act.** The guard failures of pull request 245 are still not its work. Its jobs pass only in a run started by a new event of pull request 245 after this addendum, the act, the patch and the repin are on `main`, not by re-running a failed run. How that event comes about for M0 is a decision under `DEC-20261115-02`, not this addendum. M0's runs of its B12 on my Ubuntu PC use the custodied build under B2 of the act.

B5. **Counting and scope.** These are new Founder rulings, which Phase 3A plan section 11.3 does not count. Nothing else in `DEC-20261117-01` changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-18

Actor-Id: founder
