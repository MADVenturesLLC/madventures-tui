FOUNDER-ACT-20261007-TASK35-BUILDER-AMENDMENT: Task 35 second correction, change of builder and external transmission

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Pull request:** #119, branch `build/m15-task35-r1`, a draft
> **Correction base (PR head):** `0528f788142e107a436266cf42005a1bf50f9bc7`
> **`origin/main` when drafted:** `80a8b34f99cdc783e6d946337d4fff6d26091036`
> **Amends:** `DEC-20261007-01` (`FOUNDER-ACT-20261007-TASK35-SECOND-CORRECTION`, SHA-256 `2f51def55ee9313afb12aa9768efc62ef3a76c969784ccb42ad4f7f41690232b`)
> **Read with:** `DEC-20261006-01`, `DEC-20261005-01`, `DEC-20261004-03`, `AGENTS.md`, plan sections 11.3 and 11.4, spec sections 6.7 and 7.7

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The assigned builder halted.** The session started under `DEC-20261007-01` B2 as `session:hermes/m15-task35-r3` reported that its harness showed the model `deepseek-v4.1-flash`, provider `ollama-cloud`, not `deepseek-v4-flash`. It stopped at the model check before running any command, and reported `FOUNDER_DECISION_REQUIRED`. It made no edit, commit, push or post. PR #119's head is still `0528f788142e107a436266cf42005a1bf50f9bc7`.

A2. **The assignment cannot run as written.** `deepseek-v4-flash` is no longer a working model on the Founder's Hermes installation. The provider the harness showed, `ollama-cloud`, is a cloud service, so running the correction there would have sent repository content off the Founder's host, which `DEC-20261007-01` E5 does not allow.

A3. **A conflict with `AGENTS.md`.** `AGENTS.md` on `main` says Hermes is a neutral orchestrator only, never Architect and never Builder. `DEC-20261007-01` B2 assigned a Hermes session as builder without addressing that rule. This act withdraws that assignment, so the conflict ends without an exception to `AGENTS.md`.

A4. **GLM in this programme.** Spec section 6.7 names GLM-5.2 as the bounded correction implementer, "only when separately authorized". This correction is bounded, and this act is that separate authorization, for `glm-5.3`. A GLM build drafted the Phase 3B plan, whose section 2C carries a pending qualification record for GLM as builder, with the model reported as `account:zai-start-plan/GLM-5.3-Flash` on the ZCode CLI. GLM has done no work on Task 35. `glm-5.3` is not in the FounderOS model registry, which lists GLM-5.2. `AGENTS.md` states that this repository governs itself, and the assignment below rests on this act.

## Part B: Founder rulings

B1. **The Hermes assignment is withdrawn.** `session:hermes/m15-task35-r3` did no work and does none. Hermes has no builder role in this correction. Its role stays as `AGENTS.md` states it.

B2. **The new builder.** `DEC-20261007-01` B2 is amended: the second correction is made by a new session with Actor-Id `session:claude-code/m15-task35-r3`, running the model `glm-5.3` in the Claude Code harness, launched on the Founder's Mac by `~/.local/bin/madbridge-claude-v5-glm`, on the execution surface `claude-code`. That launcher sets `ANTHROPIC_BASE_URL` to `https://api.z.ai/api/anthropic` and maps the harness's Sonnet and Opus model slots to `glm-5.3`. Its model family is neither of the two earlier implementers' nor the reviewer's. The reassignment of `session:claude-code/m15-task35-r2`, on the grounds `DEC-20261007-01` B2 gives, stands. The session has done no work on Task 35. It reports its harness and its model exactly as the harness shows them. If the harness is not Claude Code, or the model identifier it shows is not `glm-5.3`, including when it shows a Claude model, it stops before any other command and reports. The strings it reports are the record of what ran.

B3. **Rounds and qualification.** Plan section 11.4 applies the section 7 rubric in full to the new builder from the moment of this assignment. `DEC-20261007-01` B10 stands: a substantive finding in the Part F re-review is round 5 under rubric milestone 1 and round 3 under rubric milestone 4. The four rounds under rubric milestone 1 and the two under rubric milestone 4 were found against other builders' commits and are not attributed to GLM in its Phase 3B qualification record. Any finding against the new builder's commit is entered there.

B4. **External transmission.** `DEC-20261007-01` E5 is replaced. For this correction only, the builder may send to Z.ai, at the endpoint `https://api.z.ai/api/anthropic` that `~/.local/bin/madbridge-claude-v5-glm` sets, for inference, what the harness sends while it works: this prompt, the files it reads in its worktree, the Founder's saved verdict file `/Users/michaeldaley/verdicts/m15-task35-codex-r2.md`, and the output of the commands it runs. Beyond that, only the fetches D1 requires, the one push in C1 and the one description edit in D6 leave the Founder's host. The builder reads no file outside its worktree other than that verdict file and the probe files it creates. It reads nothing under `~/.secrets`, `~/.ssh` or `~/.madmik3-quarantine`, does not read the launcher, and runs no command that prints an environment variable, a token or a key. It uses no web search, web fetch, or other model or service. It posts no comment or review and changes no thread. The launcher maps the harness's Haiku slot to `glm-4.7`, which the harness may use on the same endpoint for its own background tasks; the builder starts no subagent and does no work on any model other than `glm-5.3`. I authorize this knowing that Z.ai's data-retention terms are not verified in this repository. The builder cannot attest to what the harness sends on its own account, and says so in its report.

B5. **Attribution.** `DEC-20261007-01` E1 is amended to:

```text
Role-Id: builder
Actor-Id: session:claude-code/m15-task35-r3
Execution-Surface: claude-code
```

B6. **Worktree.** `DEC-20261007-01` E2 stands. The builder works in `/Users/michaeldaley/madventures-tui-m15-task35-r3`, a clean, detached worktree of this repository at `0528f788142e107a436266cf42005a1bf50f9bc7` created for this act, and reuses no worktree prepared for an earlier assignment of this correction.

B7. **Preconditions.** `DEC-20261007-01` D1 stands, read with these additions: under (c), this act is also on `origin/main`, with its status line reading ISSUED, a signed Part E and no blank signature line; under (e), `DEC-20261007-01` on `origin/main` has SHA-256 `2f51def55ee9313afb12aa9768efc62ef3a76c969784ccb42ad4f7f41690232b`.

B8. **Technical assessment.** `DEC-20261007-01` B4 covers this builder as well.

B9. **Re-review.** `DEC-20261007-01` Part F stands. Its packet also contains this act. The reviewer confirms that the commit and the PR description carry the B5 trailers.

B10. **This act's own count.** This act is a Founder ruling, not a review verdict, and plan section 11.3 does not count it. It adds no round. Rubric milestone 1 stays at 4 and rubric milestone 4 at 2. The rounds-log entry for the re-review verdict names the builder that actually ran and cites this act.

B11. Every clause of `DEC-20261007-01` not changed here stands, including B3 to B10 and Parts C, D, G and H.

## Part C: Filing

C1. This act lands in one docs-only pull request that changes only this file.

## Part D: Not authorized

- Any builder work by a Hermes session on Task 35.
- Any transmission beyond B4, and any use of that provider outside this correction.
- Any ruling on GLM's Phase 3B qualification beyond B3, and any edit to the Phase 3B plan.
- Registering `glm-5.3` in any FounderOS registry; this act has no effect there.
- Leaving draft and merging PR #119: each needs a separate Founder act naming the exact head.
- Running the re-review.
- Task 36, M15 closure, and every later task.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-07

Actor-Id: founder
