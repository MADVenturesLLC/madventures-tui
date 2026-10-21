FOUNDER-ACT-20261021-MERGE-RECORDS-AND-M20-RULINGS: the squash merges that fail attribution on main, pull requests 180 and 181, the merge method, and the rulings of the M20 corrections builder prompt

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `86604e95617d9a925220f7affce5b6cdad92c9da`
> **Read with:** `AGENTS.md`, its Attribution section and approval gates; `DEC-20261015-05` B4 and B5; `DEC-20261016-01`; `DEC-20261020-01` B3, B4 and B6; `DEC-20261013-01` B6

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What was checked.** The drafting assistant read `main` at the commit in the header and, on GitHub, the pull requests merged from 153 through 182, their merge commits, comments and check runs. It ran `.github/scripts/attribution-shape-check.sh main` on each merge commit. It ran no test and reviewed no code for correctness.

A2. **Squash merges that fail attribution on main.** Each pull request below merged as a single-parent commit, which is GitHub's squash method. In each, GitHub appended one or more `Co-authored-by` lines as a final paragraph after the attribution lines, and in pull request 171 also a line of hyphens, so `git interpret-trailers` reads none of the attribution lines as trailers. `attribution-shape-check.sh main` fails on each, and the `attribution-shape` run on `main` for each failed. For each: pull request, merge commit, account that merged it, and the `Actor-Id` and `Execution-Surface` lines its message carries.

| Pull request | Merge commit | Merged by | Actor-Id line | Execution-Surface line |
| --- | --- | --- | --- | --- |
| 167 | `0da8119820b2ad6d8111c725250dd20e840a7b82` | `decivantiq` | `session:codex/m21-task47-r1` | `codex` |
| 169 | `cb85362e4dfee043eb6b269e4ea9c507a2c0a1c1` | `daley40-lab` | `founder` | `hermes-desktop` |
| 170 | `fb230756cca73cd94b9a1fb52356955edee4acf4` | `daley40-lab` | `founder` | `hermes-desktop` |
| 171 | `9c7b240f23a3f7a7d4bd1576d385db9947759ad4` | `decivantiq` | `session:madv-builder/n1-client` | `hermes-cli` |
| 172 | `34db24dbdbdf1da5fcc8926214914e5416c0e133` | `decivantiq` | `session:codex/m22-task48-r1` | `codex` |
| 174 | `337f551a6b57a078d5aa2f958c31915b746dc9dc` | `decivantiq` | `session:codex/m22-task48-r1` | `codex` |
| 175 | `3a4e3a0b15c2da2fe2ca954cb4a759a385cbf7c4` | `decivantiq` | `session:antigravity/tui-dec-20261018-03-filing` | `antigravity` |
| 176 | `d604ae3d3fa7ffacbbc2004020cbe549bbb8c155` | `decivantiq` | `session:cos-orchestrator/n3-tools` | `hermes-desktop` |
| 177 | `93ad948429671b17b581f5a3887120bbcde8e379` | `decivantiq` | `session:codex/m22-task49-prereq-r1` | `codex` |
| 178 | `4d462ece5798ff72e73adff69d3a92055855064a` | `decivantiq` | `session:cos-orchestrator/n4-loop` | `hermes-desktop` |
| 179 | `1bd41aeb58a12acfc0aae583ffecab80cd7eb0ea` | `decivantiq` | `session:cos-orchestrator/n4-shell-env` | `hermes-desktop` |
| 180 | `ca07c7ef154c6b97c70bcfdaa48ee90174388d28` | `decivantiq` | `session:cos-orchestrator/n4a-first-run` | `hermes-desktop` |
| 181 | `1cd0781c7bcbe4a05dda401a734c628914e35b64` | `decivantiq` | `session:cos-orchestrator/n4-approval-pane` | `hermes-desktop` |

Every other pull request merged from 153 through 182 passes the check on `main`: those merged with the merge-commit method, and pull request 173, a single-parent merge whose message carries no `Co-authored-by` line.

A3. **Pull requests 180 and 181.** Both merged after I signed `DEC-20261020-01`, whose B6 requires a merge authorization posted before every merge and naming the exact head. My comment 6304280822 on pull request 180 names head `7d10bb314041625e0f5204c7f8a5cc52575b10fb`; the pull request merged at head `29467b717c1d315c5cd6406e7d2cc777c0b3cf9c`, a commit made after that comment. No merge authorization is posted on pull request 181, which merged at head `f71fbe022b0e54e9a210b21d6c6ac010ced9d6b8`. Both change only paths under `apps/madv-agent/`.

A4. **Merge methods.** The repository's `main` ruleset allows the merge, squash and rebase methods. Every guarded merge command issued under `DEC-20261015-05` uses the merge-commit method.

A5. **The M20 corrections builder prompt.** I signed it on 2026-10-21 with SHA-256 `d0049c80caf57250f230dc231ce368d91ed45e5392eb846965bcfc6f08f1eed6`, at transfer commit `6c4378555cdd955988d40bccd652c0889a89ef4d`, and its addendum 1 with SHA-256 `4b8e1db6f1ed90ba91c3cd02144f60eec873bbf2c496095fa39c339b12be0963`, at transfer commit `da6913df5f44774a71e760c8bd38752382323323`. They carry rulings on `DEC-20261016-01` and `DEC-20261020-01` that B5 files here. They were needed because:

1. Pull request 172 added three tests to `packages/supervisor/test/preflight.test.ts`, which holds twenty-five at `86604e95617d9a925220f7affce5b6cdad92c9da`, while `DEC-20261016-01` B5 and `DEC-20261020-01` B3 count from twenty-two.
2. `test/phase3a/runtime-harness.ts` gives the envelope's `repository` as the git common directory, while the fixture of `preflight.test.ts` gives the repository root, so `DEC-20261020-01` B3 as written fails the harness.
3. `DEC-20261016-01` B7 and E1 name the Antigravity surface after `DEC-20261020-01` B4 made the builder a Codex session.

A6. **The drafting assistant.** It drafted `DEC-20261020-01`, the builder prompt of A5 and this act. Its survey for `DEC-20261020-01` did not run the attribution check on `main`, so that act ratified merges without recording A2; and it drafted B3 and the test count of that act without reading `test/phase3a/runtime-harness.ts` or the tests pull request 172 added. None of its work is an independent review.

## Part B: Founder rulings

B1. **The record of A2.** The merge commits of A2 stay on `main` as they are. I do not rewrite, revert or amend them, and no later change re-merges their content to repair their messages. Each is recorded here as failing the attribution check on `main`; the `Actor-Id` and `Execution-Surface` lines of A2 are recorded as the lines each message carries, not as verified attribution. `DEC-20261020-01` B6 ratifies the merges it names as merges; it does not cure their attribution.

B2. **Pull requests 180 and 181.** I ratify each merge at the merge commit A2 records for it. This ratifies the merges only, as B1 reads ratification.

B3. **The merge method.** From this act on, every pull request in this repository merges with the merge-commit method, with its head SHA pinned and no caller-supplied message. Squash and rebase are not used. I will restrict the `main` ruleset's allowed merge methods to merge; until I do, every merge command checks the method it uses.

B4. **Who merges, and where B6 applies.** `DEC-20261020-01` B6 and `DEC-20261015-05` B4 apply to every pull request in this repository, including those that change only `apps/madv-agent/`. A merge is performed only from my account, after my merge authorization naming the exact head is posted. No agent account merges. Pull requests 169 and 170 were merged by `daley40-lab`; I record that and rule nothing further on it here.

B5. **The rulings of the builder prompt of A5.** Each is part of the act it names as if written there:

1. **Test count.** `DEC-20261016-01` B5 and `DEC-20261020-01` B3 add exactly three tests to the twenty-five `preflight.test.ts` holds at `86604e95617d9a925220f7affce5b6cdad92c9da`, so that it holds twenty-eight. The three tests pull request 172 added stay unchanged. `DEC-20261013-01` B6 is read accordingly.
2. **Envelope repository binding.** `DEC-20261020-01` B3 is read as follows. Preflight checks the binding at the `repository_fingerprint` step, immediately after it computes the fingerprint, and fails with `repository_fingerprint` when the `realpath` of the envelope's `repository` is neither the repository root it examines nor that root's git common directory as `git rev-parse --path-format=absolute --git-common-dir` prints it there; when the `realpath` of the envelope's `worktree` differs from the worktree it examines; or when the envelope's `repository_fingerprint.git_sha` differs from that worktree's `HEAD`, for either fingerprint kind. Neither `repository_fingerprint.sha256` nor `base_git_sha` is compared, and a path `realpath` cannot resolve fails with `repository_fingerprint`.
3. **The timing tests.** `DEC-20261020-01` B4 extends `DEC-20261016-01` B4 to `malformed JSON and every incorrect auth predicate fail closed`, which aborts no probe. For that test the only change allowed is an explicit per-test timeout of 10000 ms. Every test that aborts a probe whose fixture installs a SIGTERM handler follows `DEC-20261016-01` B4 as written.
4. **The surface.** `DEC-20261016-01` B7 and E1 are read with `DEC-20261020-01` B4: the builder may send to OpenAI, through the Codex surface, what the harness sends while it works, under the limits of item 3a of my merge authorization of pull request 153, and its trailers name `session:codex/m20-corrections-r1` and `codex`.
5. **The identity report.** For that build, the model is recorded as the Codex harness describes it, because `DEC-20261020-01` B4 names a surface, not a model; and the sandbox `danger-full-access`, with the network enabled, is accepted, every limit of the builder prompt still binding.

B6. **Counting.** This is a new Founder ruling, which plan §11.3 does not count. It adds no round, and every count stands as the rounds log records it.

## Part C: Filing

C1. One docs-only pull request files this act. It changes nothing else, and in particular none of the paths of `DEC-20261016-01` C1.

## Part D: Not authorized

- Any rewrite, revert, amendment or force-push of `main`, or any change made to repair the messages of A2.
- Any change to code, tests, workflows, the plan or the spec.
- Any change to the repository's settings or rulesets other than the restriction of B3, which I make myself.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-21

Actor-Id: founder
