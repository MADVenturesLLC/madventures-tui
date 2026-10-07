FOUNDER-ACT-20261007-TASK35-BUILDER-AMENDMENT-2: Task 35 second correction, second change of builder

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Pull request:** #119, branch `build/m15-task35-r1`, a draft
> **Correction base (PR head):** `0528f788142e107a436266cf42005a1bf50f9bc7`
> **`origin/main` when drafted:** `1d711b310b5870034518d4a3da4b536c4a86d66a`
> **Amends:** `DEC-20261007-02` (`FOUNDER-ACT-20261007-TASK35-BUILDER-AMENDMENT`, SHA-256 `73681d3111c65753927547cd7e5af6c68985beb8faa99d55190db773d6d7b046`) and, through it, `DEC-20261007-01` (SHA-256 `2f51def55ee9313afb12aa9768efc62ef3a76c969784ccb42ad4f7f41690232b`)
> **Read with:** `DEC-20261006-01`, `DEC-20261005-01`, `DEC-20261004-03`, `AGENTS.md`, plan sections 11.3 and 11.4, spec sections 7.6 and 7.7

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The GLM builder did not run the correction.** I launched the session `DEC-20261007-02` B2 assigns, `session:claude-code/m15-task35-r3` on `glm-5.3`, and it did not work in my environment. It made no commit, push, description edit or post: PR #119's head is still `0528f788142e107a436266cf42005a1bf50f9bc7` with two commits, and nothing on the pull request has changed since the verdict comment `6041610310`.

A2. **The model this act assigns has worked on Task 35 before.** The first implementer, `session:claude-code/m15-task35-r1`, reported running on Claude Opus 5.5. Its commit `16e2f1f9ab3a8984576a934823eb88dbde8522a2` let a Proxy trap's error escape the parser, finding 1 of the first verdict, and `DEC-20261005-01` reassigned it. The correction implementer, on Claude Opus 5, left the same defect open at another site, and `DEC-20261007-01` reassigned it on the round count and on the recurrence under spec section 7.6. Both earlier implementers are Claude models.

A3. **What changes and what does not.** A new session is a new implementer, and `DEC-20261007-01` Part H still bars any correction by `session:claude-code/m15-task35-r1` or `session:claude-code/m15-task35-r2`. Returning the correction to Claude Opus 5.5 gives up the different model family that `DEC-20261007-01` B2 and `DEC-20261007-02` B2 cite. The re-review stays independent: its reviewer, `codex`, is of another family. The containment design B3 of `DEC-20261007-01` requires is now set out in full, which neither earlier builder had. Claude Opus 5.5 is not in the FounderOS model registry, and `AGENTS.md` states that this repository governs itself.

## Part B: Founder rulings

B1. **The GLM assignment is withdrawn.** The session assigned by `DEC-20261007-02` B2 does no further work on Task 35. Anything it left in `/Users/michaeldaley/madventures-tui-m15-task35-r3` is not used.

B2. **The new builder.** `DEC-20261007-02` B2 is amended: the second correction is made by a new session with Actor-Id `session:claude-code/m15-task35-r3-opus`, running Claude Opus 5.5 in the Claude Code harness, launched on the Founder's Mac by `~/.local/bin/madbridge-claude-v5`, on the execution surface `claude-code`. I return the correction to the model of the first implementer knowingly, for the reasons in A3. The session reports its harness and its model exactly as the harness shows them. If the harness is not Claude Code, or the model identifier is not `claude-opus-5-5`, with or without a context-window suffix, it stops before any other command and reports.

B3. **Rounds and qualification.** Plan section 11.4 applies the section 7 rubric in full to the new builder. `DEC-20261007-01` B10 stands: a substantive finding in the Part F re-review is round 5 under rubric milestone 1 and round 3 under rubric milestone 4. Any such finding is entered against Claude Opus 5.5 in any qualification record for it. `DEC-20261007-02` B3 no longer applies, because GLM did no work on Task 35.

B4. **External transmission.** `DEC-20261007-02` B4 is replaced. For this correction, the builder's inference runs on Anthropic, the model provider of the `claude-code` surface. Beyond that, only the fetches D1 requires, the one push in C1 and the one description edit in D6 leave the Founder's host. The builder reads no file outside its worktree other than the Founder's saved verdict file `/Users/michaeldaley/verdicts/m15-task35-codex-r2.md` and the probe files it creates. It reads nothing under `~/.secrets`, `~/.ssh` or `~/.madmik3-quarantine`, does not read its launcher, and runs no command that prints an environment variable, a token or a key. It starts no subagent, and uses no web search, web fetch, or other model or service. It posts no comment or review and changes no thread.

B5. **Attribution.** `DEC-20261007-01` E1, as `DEC-20261007-02` B5 amended it, is amended to:

```text
Role-Id: builder
Actor-Id: session:claude-code/m15-task35-r3-opus
Execution-Surface: claude-code
```

B6. **Worktree.** The builder works in `/Users/michaeldaley/madventures-tui-m15-task35-r3-opus`, a clean, detached worktree of this repository at `0528f788142e107a436266cf42005a1bf50f9bc7` created for this act, and reuses no worktree prepared for an earlier assignment of this correction.

B7. **Preconditions.** `DEC-20261007-01` D1, as `DEC-20261007-02` B7 reads it, stands, with these additions: under (c), this act is also on `origin/main`, with its status line reading ISSUED, a signed Part E and no blank signature line; under (e), `DEC-20261007-02` on `origin/main` has SHA-256 `73681d3111c65753927547cd7e5af6c68985beb8faa99d55190db773d6d7b046`.

B8. **Technical assessment.** `DEC-20261007-01` B4 covers this builder as well.

B9. **Re-review.** `DEC-20261007-01` Part F stands. Its packet also contains `DEC-20261007-02` and this act. The reviewer confirms that the commit and the PR description carry the B5 trailers.

B10. **This act's own count.** This act is a Founder ruling, not a review verdict, and plan section 11.3 does not count it. It adds no round. Rubric milestone 1 stays at 4 and rubric milestone 4 at 2. The rounds-log entry for the re-review verdict names the builder that actually ran and cites this act.

B11. Every clause of `DEC-20261007-01` and `DEC-20261007-02` not changed here stands.

## Part C: Filing

C1. This act lands in one docs-only pull request that changes only this file.

## Part D: Not authorized

- Any further work on Task 35 by the session `DEC-20261007-02` B2 assigned, or by any Hermes session.
- Any correction by `session:claude-code/m15-task35-r1` or `session:claude-code/m15-task35-r2`.
- Leaving draft and merging PR #119: each needs a separate Founder act naming the exact head.
- Running the re-review.
- Task 36, M15 closure, and every later task.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-07

Actor-Id: founder
