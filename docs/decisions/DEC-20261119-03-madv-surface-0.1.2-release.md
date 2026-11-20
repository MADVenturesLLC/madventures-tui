FOUNDER-ACT-20261119-MADV-SURFACE-0.1.2-RELEASE: madv-surface 0.1.2, a release whose probe and first message can offer the model no tools, the review I accept for it, its release commit and its builds on both certification hosts

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`, for work in `MADVenturesLLC/madventures-surface`
> **`origin/main` when drafted:** `9df025f74c7cdd51228748d14b0e349dc3c4f967` (the merge of pull request 248)
> **Governs:** the release of madv-surface that `DEC-20261115-02` Addendum 7 B4 requires before madv-surface is admitted; its build, review, release commit and release builds
> **Read with:** `DEC-20261115-02` B2, B3 and B5, and its Addendum 7 A4, A5 and B4; `DEC-20261119-01` B9 and B11; `DEC-20261114-01`; `DEC-20261115-01` A7 and B4; `DEC-20261108-04` B6 and B7; `DEC-20261108-02`; `DEC-20261108-03` Addenda 2 to 6, 10 and 11; `DEC-20261112-02` B2 and B5; `DEC-20261112-03` Addendum 2 B3; `DEC-20261013-03` B2 and B4; `DEC-20261117-01` B2; `DEC-20261102-02` B4; `DEC-20261023-01` Part B; Phase 3B design §1.2 and §2.6 item 3; Phase 3B plan §2C, §3 M1 and §6

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What requires this release.** Under `DEC-20261115-02` Addendum 7 B4, madv-surface is admitted only after a release of madv-surface in which the probe offers its model no tools, released under its own act in the way `DEC-20261114-01` released 0.1.1; `DEC-20261119-01` B9 and B11 hold M1 to M6 until then. Version 0.1.1 is not that release (A3). `DEC-20261108-04` B7 makes the identity probe one request, and its B6 lets the attestation prompt cause at most two provider round-trips and no tool call. Phase 3B plan §3 M1 has the live attester send that prompt to the governed child through its input. Under Phase 3B design §1.2 madv-surface is built and reviewed in its own repository, and under its §2.6 item 3 the registration and the capability records name one release build of it, from one commit that has passed a review I accept. Plan §6 leaves any change to madv-surface's repository to an act. This is that act, for madv-surface 0.1.2.

A2. **madv-surface now.** `MADVenturesLLC/madventures-surface` has the branches `main`, `build/v0.1` and `build/v0.1.1`, and one tag, `v0.1.1`. Its `main` is `91bfb38549bcab37740d2c4564c371ee390a63e7`, the release commit of 0.1.1 (`DEC-20261115-01` B5), tagged `v0.1.1`. It has no CI. Its scripts are those `DEC-20261114-01` A2 lists. At that commit its 23 test files hold 126 tests, as `DEC-20261115-01` records.

A3. **Why 0.1.1 offers its model tools.** At `91bfb38549bcab37740d2c4564c371ee390a63e7`:
1. `toolsForRole` (line 184 of `src/tools.ts`) gives every role `read_file`, `list_dir` and `search`, and no flag of `src/cli.ts` removes them.
2. `runAgent` takes that list for the whole run (line 125 of `src/agent.ts`), names it in `system/init` (line 162) and sends it with every provider request (line 221).
3. Each wire adapter sends tools only when the list is not empty: line 59 of `src/wire/anthropic.ts`, line 55 of `src/wire/openai.ts` and line 57 of `src/wire/ollama.ts`.
So the identity probe of `DEC-20261115-02` B3 offers the model tools, and across both hosts 2 of 8 MiniMax calls turned to tools first and ended at the one-turn limit (Addendum 7 A4). The governed session runs with the same role, so the attestation prompt that M1's attester sends through its input is offered the same tools, which `DEC-20261108-04` B6 allows no call of.

A4. **Items carried to this act.** `DEC-20261115-01` B4 carries to the act of any later build of madv-surface three limits of what the 0.1.1 tests prove: a redaction-order test whose key runs further past the cap; tests of Claude ids beyond the ten, with a rule on an id in which `claude` follows another family's prefix; and a TLS test with a second verified host name. Its A7 records that the Anthropic rule, line 19 of `src/domain.ts`, matches `claude` only at the start of an id or after `/`, `:` or `.`, so that `minimax-claude-x` is accepted under the `minimax` family.

A5. **The runtimes.** They are those of `DEC-20261114-01` A4: on my MacBook, Bun 1.4.2, revision `744846f844374847c902b5e7fd59b4342a51ef99`; on my Ubuntu PC, the custodied Bun 1.4.1, revision `69cb78c9097cebd3bdb832d9fff8b7d23abce09e`, the Linux certification runtime again under `DEC-20261117-01` B2. Each release build embeds the Bun that compiles it, so each host's binary has its own SHA-256.

A6. **The builder harness.** madv-surface 0.1.1 and M0 were built by governed Codex on my MacBook under the governed build of `DEC-20261108-03` Addendum 11, as `DEC-20261115-01` and `DEC-20261119-01` A3 record.

A7. **The drafting assistant.** A Claude Code session read madv-surface's repository at `91bfb38549bcab37740d2c4564c371ee390a63e7` for A2 to A4, recommended the rulings of B1, and drafted this act. That is not an independent review.

## Part B: Founder rulings

B1. **The build.** One governed builder session builds madv-surface 0.1.2 in `MADVenturesLLC/madventures-surface`, on the branch `build/v0.1.2` from `91bfb38549bcab37740d2c4564c371ee390a63e7`, and changes only:
1. **A tool-free run.** A run flag `--no-tools`. With it, every provider request of the run offers the model no tools; `system/init` names an empty list of tools; the system prompt says that no tools are available and that the model answers in text. It is valid with either role and removes every tool of that role. With `--allow-shell` it is a usage error, exit 2. The help text lists it.
2. **A tool-free first message.** A stream-json user input line may carry the top-level field `no_tools` with the value `true`. On the first user message the run accepts, it makes every provider request for that message offer no tools and carry the system prompt of item 1; later messages are as the run's flags make them. On any later user message, a line carrying `no_tools` `true` is not run, and the run emits `system/input_ignored` with reason `no_tools_not_first`. A line whose `no_tools` is present and is neither `true` nor `false` is not run, and the run emits `system/input_ignored` with reason `invalid_no_tools`.
3. **No tool without tools.** When a response to a request that offered no tools names a tool call, no tool runs: the run fails with the existing kind `provider_error` and the code `unexpected_tool_call`, emits its `result` with `is_error` true, and exits 1.
4. **The Anthropic rule.** A model id that contains `claude` anywhere, in any case, is recognized as Anthropic, on every profile and wherever the rule applies, in addition to what the rule recognizes now, and is refused with reason `anthropic_model`.
5. **Tests.** Tests under `test/` for items 1 to 4: that a request under item 1 or item 2 carries no tools while a request without them carries the role's tools; the two input reasons of item 2; the failure of item 3, with no tool run; and the refusal under item 4 of `minimax-claude-x`, `qwen-claude` and every Claude id the builder adds. Each is shown to fail on a deliberate break of the change it tests, and the break is restored. For the items of A4, it adds: a redaction-order test whose key runs past the cap by more than any margin a cut before redaction could leave, so that such a cut fails; tests of Claude ids beyond the ten of 0.1.1; and a TLS test with a second verified host name, so that a fixed name fails. Each of these is shown to fail on the attempt of `DEC-20261115-01` A6 item 3 that it answers, restored.
6. **The version.** `package.json` version `0.1.2`, the version strings of `README.md` and `docs/registration-proposal.md`, and the User-Agent expected by `test/new-profiles.test.ts`.
7. **The documents.** `README.md`, to describe items 1 to 4; `docs/registration-proposal.md`, to describe `--no-tools` and the field `no_tools`; and `docs/samples/README.md`, to say that the sample streams, which stay unchanged, were recorded with 0.1.0.
8. Its build log, `docs/build-log-0.1.2.md`.
No other path changes. No dependency, `bun.lock`, profile, family table, model id, endpoint or exit code changes, and no event type or field is added: the only new values are the two reasons of item 2 and the code of item 3.

B2. **The builder.** Governed Codex on my MacBook, the only Phase 3B builder `DEC-20261108-02` qualifies, Actor-Id `session:codex/surface-0.1.2-r1`, in `/Users/michaeldaley/builds/surface-0.1.2-r1`, with the git identity `daley40-lab` and no GitHub call, under a builder prompt I sign. Everything `DEC-20261114-01` B2 applied to the 0.1.1 builder applies to it: the governed build of `DEC-20261108-03` Addendum 11, its Addenda 2 to 4 (harness, namespaces, tools and my check of every session record started in its folder) and 5, 6 and 10, `DEC-20261112-02` B2 and B5, `DEC-20261023-01` Part B, and the load rule of `DEC-20261102-02` B4 with a logged wait, as `DEC-20261112-03` Addendum 2 B3 rules it, before each command that runs tests. It runs Bun 1.4.2 of A5 and nothing else. My guarded commands push its branch and open its draft pull request as decivantiq.

B3. **The builder's gates.** At its last commit, each once and logged: `bun install --frozen-lockfile`; `bun run typecheck` with no output; `bun test --timeout 20000` with 0 fail, every test of `91bfb38549bcab37740d2c4564c371ee390a63e7` still present and none skipped, and the new tests counted; `bun run build`, after which `dist/madv-surface --version` prints exactly `madv-surface 0.1.2` and `dist/madv-surface --help` lists `--no-tools`; `bun run build:test`; and `git diff --name-only 91bfb38549bcab37740d2c4564c371ee390a63e7 HEAD` within B1.

B4. **My runs on both certification hosts.** At the pull request's head, before the review, I run on each host from a fresh clone, with that host's Bun of A5: `bun install --frozen-lockfile`, `bun run typecheck`, `bun test --timeout 20000` and `bun run build`, and record the summary lines, `dist/madv-surface --version`, and the binary's SHA-256 and size, with a log manifest. Each run must end with 0 fail.

B5. **The review I accept.** A Tier-2 review at the exact head by a fresh Gemini session in Antigravity, reviewer id `antigravity`, under a review prompt I sign, which cites the sections of the design and the plan as this act cites them (`DEC-20261119-01` B5), with my checks of Phase 3B plan §2C before its report is posted on the pull request. Only a posted PASS at the exact head lets the pull request be marked ready. A FAIL, or any SUBSTANTIVE finding, returns to me for a ruling. The review is not a Phase 3B slice verdict: it counts under no rubric milestone and adds no round.

B6. **The release commit.** The pull request merges into madventures-surface's `main` only by my merge authorization naming its exact head, by merge commit through my guarded command. My guarded command then tags that merge commit `v0.1.2`. That commit is the release commit of madv-surface 0.1.2.

B7. **The release builds.** On each certification host, from a fresh clone at `v0.1.2`, with that host's Bun of A5, I run `bun install --frozen-lockfile` and `bun run build`, and keep `dist/madv-surface` at `/Users/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface` on my MacBook and at `/home/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface` on my Ubuntu PC. I record each binary's SHA-256 and size, its `--version`, the Bun that built it and a manifest. Those two binaries, by those SHA-256 values, are the release builds that the act of Addendum 7 B4 names. A binary built otherwise is not the release. The release builds of 0.1.1 stay where `DEC-20261115-01` B5 puts them.

B8. **Halts.** The build halts for my ruling, with what passed, what failed and the single next decision, when: a path outside B1 would change; a dependency or `bun.lock` would change; any request other than the downloads of `bun install --frozen-lockfile` would leave the host, or a real provider key would be used; a test of the base would have to be removed, skipped or weakened; a wire adapter cannot send a request without tools; a deliberate break of B1 item 5 does not fail its test; any gate fails at any load; or anything `DEC-20261023-01` Part B, `DEC-20261108-03` Addenda 2 to 6 and 10, `DEC-20261112-02` or the builder prompt names as a stop occurs. A halt is not a verdict.

B9. **Records.** After the release builds, an act of mine records the build, my runs, the review, the release commit and the two release builds with their SHA-256 values, files this act's evidence in `docs/verification/` as a sanitized packet, and enters the review in the correction-round log under no rubric milestone. The act of Addendum 7 B4 cites that act.

B10. **What this does not open.** This act authorizes no live provider call, no real key and no change to madventures-tui. It admits no surface. The act of Addendum 7 B4 rules the registration's supported version, the use of `--no-tools` in the identity probe, the investigation on both hosts and the records, and takes the carried items of `DEC-20261119-01` B3 and B4, which concern madventures-tui; M1's act rules whether its attester uses the field `no_tools`. This act rules none of them. It changes no earlier ruling, except that it authorizes the changes of B1 in madv-surface's repository, which plan §6 leaves to an act, and answers the items `DEC-20261115-01` B4 carries to it.

B11. **Filing.** One docs-only pull request, made by a Claude Code filing session under a filing prompt I sign, adds this act as `docs/decisions/DEC-20261119-03-madv-surface-0.1.2-release.md`, unchanged, before the builder session of B2 starts, and changes nothing else. It touches `docs/decisions/`, so under `AGENTS.md`, as `DEC-20261031-01` amended it, it merges only by an act of mine naming its exact head.

B12. **Counting.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. This act takes effect when I sign it.

## Part D: Not authorized

- Any change in madv-surface's repository beyond B1, any merge there other than by B6, and any tag other than `v0.1.2` on the release commit.
- Any live provider call, any real key, and any request that leaves the host other than the downloads of `bun install --frozen-lockfile`.
- Any change to madventures-tui's code, tests, `bun.lock`, a manifest, the plan, the design, `AGENTS.md` or an earlier decision record, except the filing of B11.
- Any admission of a surface, any slice, and any change to the `start` gate.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-19

Actor-Id: founder
