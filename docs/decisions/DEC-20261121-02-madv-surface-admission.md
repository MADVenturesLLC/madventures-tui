FOUNDER-ACT-20261121-MADV-SURFACE-ADMISSION: madv-surface's admission on its 0.1.2 release: the registration, the tool-free identity probe, the build, the investigation on both certification hosts and the capability records

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `403a9f536539b96115aa44ab82436fe55d95b739` (the merge of pull request 250)
> **Governs:** `DEC-20261115-02` Addendum 7 B4; the items `DEC-20261119-01` B3 and B4 and `DEC-20261121-01` B3 carry to this act; `DEC-20261108-04` B4 item 3
> **Read with:** `DEC-20261115-02` and its Addenda 1 to 8; `DEC-20261119-01`; `DEC-20261119-03` B1 and B10; `DEC-20261121-01` A9, B3, B8 and B9; `DEC-20261108-04` B4, B6 and B7; `DEC-20261108-01` B5, B8, B9 and B12; `DEC-20261108-02`; `DEC-20261108-03` Addenda 2 to 6, 10 and 11; `DEC-20261112-02` B2 and B5; `DEC-20261115-01` B9; `DEC-20261102-02` B4; `DEC-20261023-01` Part B; `PLAN-OPEN-2`; `PLAN-OPEN-3`; Phase 3A design §2.2, §2.3 and §5.4; Phase 3B design §2.6; Phase 3B plan §2B, §2C and §3 M0

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What leaves this to this act.** `DEC-20261115-02` Addendum 7 B4 admits madv-surface only after a release whose probe offers its model no tools, released under its own act, and then has a later act of mine change the madv-surface registration to that release and its probe, run B8 of `DEC-20261115-02` on both hosts once more and write its records under its B10, with its B9 and B10 applying to those runs. `DEC-20261119-03` released madv-surface 0.1.2, and `DEC-20261121-01` records it; its B9 names the release builds this act names, and its B12 says this act cites it. `DEC-20261119-03` B10 leaves to this act the registration's supported version, the use of `--no-tools` in the identity probe, the investigation on both hosts and the records. `DEC-20261119-01` B3 and B4 carry to it the three ADVISORY findings of M0's review and the question of a non-empty `response_id`, and `DEC-20261121-01` B3 carries to it the NUL bytes of my Ubuntu run's help log. `DEC-20261108-04` B4 item 3 holds M1 to M6 until M0 is merged with an admitted madv-surface registration and its capability records filed. This is that act.

A2. **The release.** madv-surface 0.1.2 is release commit `05f2b35b813a322e60f4a5154cc5671e8319aada` of `MADVenturesLLC/madventures-surface`, tagged `v0.1.2`. Its release builds are `/Users/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface` on my MacBook, SHA-256 `c9a9d800386a7c418f90d3597701c903914b93d152e9a09bae6f640e993f6725`, and `/home/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface` on my Ubuntu PC, SHA-256 `94537feb12c0d3918d25297ea34f6a55dc58e11ccfd7857856770b751bf263b7` (`DEC-20261121-01` B9). At the release commit, as `DEC-20261119-03` B1 rules and `DEC-20261121-01` A3 records:
1. the flag `--no-tools`, valid with either role, makes every provider request of the run offer no tools, and `system/init` then names an empty list of tools;
2. a tool call in a response to a request that offered no tools runs no tool and ends the run with `system/provider_error`, code `unexpected_tool_call`, an error `result` and exit 1;
3. a model id that contains `claude`, in any case, or `anthropic`, is refused as `anthropic_model` on every profile;
4. a release build refuses `MADV_SURFACE_TEST_ENDPOINT` and `MADV_SURFACE_TEST_CA`, and every profile host is a DNS name (`DEC-20261121-01` A9).

A3. **The code at `main`.** Since M0's merge at `453229b168ef60735973074aaadd100e435455df`, `main` has changed only under `docs/` and in `.github/workflows/advisory-reviewers.yml`, so the code is M0's. At `403a9f536539b96115aa44ab82436fe55d95b739`:
1. In `packages/protocol/src/adapter-registry.ts`, the madv-surface registration (lines 78 to 103) has `supported_versions` `0.1.1` alone (line 82), and its identity probe's argument vector (line 84) is its `non_interactive_flags` (line 88) followed by `--max-turns` and `1`.
2. In `packages/adapter-madv-surface/src/index.ts`, the first-init predicates (lines 138 to 143) do not read the `tools` of `system/init`; a `model_response` must name a non-empty `response_model` (line 149) but nothing checks its `response_id`; and the adapter's own refusal of an Anthropic model (line 150) uses the rule of 0.1.1, which matches `claude` only at the start of an id or after `/`, `:` or `.`, and so passes an id such as `minimax-claude-x` on to the MiniMax family check.
3. In `packages/supervisor/src/attestation.ts`, every probe has a cleanup interval of 1,000 ms and a grace interval of 500 ms (lines 48 and 49), and madv-surface's probes an execution limit of 30 s (line 91).
4. The recorded streams of M0's investigation are test fixtures under `packages/adapter-madv-surface/test/fixtures/recorded/`, each listed with its SHA-256 in `manifest.tsv` there, and `recorded.test.ts` passes them to the parser with the version `0.1.1` written in the test.
5. `madv-surface-v1` in `packages/supervisor/src/environment.ts` holds the variables of `DEC-20261115-02` B6.

A4. **What M0 left.**
1. No madv-surface capability record is stored on either host (`DEC-20261115-02` Addendum 7 B2; `DEC-20261119-01` A5), and preflight refuses madv-surface.
2. The Claude Code records of `DEC-20261119-01` A5 have `overall` `pass` for `2.1.325`. The record on my MacBook, SHA-256 `2b3314bfcb3a8714966d7f07da5b8290320e2a2dfb634d13899b1e8cb7f6edd3`, expires at 2026-12-17T03:29:14.594Z, and the record on my Ubuntu PC, SHA-256 `eecac7b942288ecec1ebb6069a76f62e66ad726940615d0da9638f5a75112207`, at 2026-12-17T11:53:33.949Z (`PLAN-OPEN-3`).
3. M0's review found three ADVISORY limits of its tests (`DEC-20261119-01` A7): probes of madv-surface given shorter cleanup and grace intervals, a variable outside `DEC-20261115-02` B6 added to `madv-surface-v1`, and the status file of my Ubuntu PC's capture 05 changed from exit 1 to exit 0, each leaving every test of its item passing.
4. M0's record script is `transfer/m0-r1/m0-record-r3.ts` of the transfer branch, SHA-256 `b9ba9bdadf0ca0b5e792ad78fc46f9212d763ad7455fb122343756be2e6fb593`, the script I accepted under `DEC-20261115-02` Addendum 5 B6. It reads the registration from its clone and the parser from its adapter, and writes the 0.1.1 binary paths, their SHA-256 values and the version `0.1.1` into its own text. For capture 07 it also accepts a run that ends at the one-turn limit after read-only tool calls, as Addendum 5 B1 read 0.1.1.

A5. **The drafting assistant.** A Claude Code session read the acts named in the header, the code at `403a9f536539b96115aa44ab82436fe55d95b739` and the record script for A2 to A4, put the choices of B3 and B10 to me, and drafted this act. That is not an independent review.

## Part B: Founder rulings

B1. **The admission build.** It completes plan §3 M0 for madv-surface, under the rulings below.
1. Its binding base is `403a9f536539b96115aa44ab82436fe55d95b739`, or a descendant of it whose changes touch only `docs/decisions/` and `docs/verification/`, and its branch is `build/3b-m0-admission-r1`.
2. The builder is governed Codex on my MacBook, Actor-Id `session:codex/3b-m0-admission-r1`, in `/Users/michaeldaley/builds/m0-admission-r1`, with the git identity `daley40-lab` and no GitHub call, under a builder prompt and any resume message I sign. Everything `DEC-20261115-02` B1 item 2 applies to M0's builder applies to it, including my check of every session record started in its folder. It makes no live call: every live call of this act is made by my own commands (B7).
3. The Tier-2 reviewer is a fresh Gemini session in Antigravity, reviewer id `antigravity`, under a review prompt I sign, which cites the sections of the design and the plan as this act cites them, with the load rule of `DEC-20261115-01` B9 and my checks of plan §2C before its report is posted.
4. Its verdicts count under rubric milestones 1 and 3 (`DEC-20261108-01` B9 item 2), with a count of its own that starts at zero. M0's count, which `DEC-20261119-01` B2 closed at zero, stays closed.
5. As `DEC-20261108-01` B12 requires, this act cites `DEC-20261015-03` B5 items 2 and 3; item 3a of my merge authorization of pull request 151, comment 6202101854; `DEC-20261020-01` B2; and item 4a of my merge authorization of pull request 183, as `DEC-20261027-01` A3 states it. The changes they require are in the binding base, as `DEC-20261119-01` A9 records at M0's merge and A3 of this act carries forward.

B2. **The registration.** The madv-surface registration changes in two values and no other:
1. `supported_versions` becomes `0.1.2` alone;
2. the identity probe's argument vector becomes its `non_interactive_flags` followed by `--no-tools`, `--max-turns` and `1`.
Its `non_interactive_flags` do not change and never carry `--no-tools`: whether a governed launch offers its model tools, and whether M1's attester uses the field `no_tools`, are M1's act's (`DEC-20261119-03` B10). The provider, domain, organization, auth-readiness probe, allowlist, auth-failure detection and limitations stay as `DEC-20261115-02` B2 set them. The registration stays provisional on the investigation of B7 and B8 (`DEC-20261108-01` B5).

B3. **The parser.** In `packages/adapter-madv-surface/src/index.ts`, and nowhere else:
1. **No tools in the probe.** The identity probe's parser also requires the first `system/init` to carry `tools` as an empty array, evaluated after the predicates of `DEC-20261115-02` B3 item 4; otherwise `identity_mismatch`. The parser of a governed launch does not apply this predicate.
2. **The response id.** Every `model_response` must carry `response_id` as a non-empty string; otherwise `identity_mismatch`. This answers `DEC-20261119-01` B4.
3. **The Anthropic rule.** The adapter's refusal of an Anthropic model uses `/claude|anthropic/i`, the rule of `DEC-20261119-03` B1 item 4, in place of the rule of A3 item 2, still before the family check and still as `model_refused`.
The probe input of `DEC-20261115-02` B3 item 2, its execution limit, the cleanup and grace intervals and the output limit of every probe stay as they are, and Claude Code's and Antigravity's parsers do not change.

B4. **The tests.** Each is named for what it proves, uses synthetic streams unless it reads a recorded fixture, and is shown failing on a deliberate break of the code or value it guards, after which the break is restored:
1. the registration's `supported_versions` and identity-probe argument vector of B2, exactly, and `non_interactive_flags` unchanged and without `--no-tools`;
2. a probe stream whose `system/init` lists a tool fails `identity_mismatch`, and the same stream with an empty list passes; a launch stream with tools still passes the parser of a launch;
3. a `model_response` without `response_id`, or with an empty one, fails `identity_mismatch`, in the probe and in a launch;
4. a `model_response` naming each of `minimax-claude-x`, `qwen-claude`, `vendor_CLAUDE`, `vendor+ClAuDe` and `preclaudepost` fails `model_refused`;
5. for the first ADVISORY finding: the identity and auth-readiness probes of madv-surface keep the cleanup interval of 1,000 ms and the grace interval of 500 ms, through the probe runner's own clock and signals, so that a shorter interval fails;
6. for the second: `madv-surface-v1` holds exactly the variables of `DEC-20261115-02` B6, as a set, so that an added or a removed variable fails;
7. for the third: every recorded fixture file, of M0 and of B7, has the SHA-256 that its `manifest.tsv` lists, so that a changed status, standard output or standard error fails.
If the builder declines a break, it records that in one line and goes on, and I make the break at its last commit before the push, as `DEC-20261119-03` did.

B5. **The build.** The builder works in two phases, as `DEC-20261115-02` B7 did.
1. **Phase 1, offline.** It makes the changes of B2 to B4. It also writes, as a scratch file outside the clone that it shows in full with its diff, the record script of B8: M0's script of A4 item 4, changed only to name the release builds of A2 by path and SHA-256 and the version `0.1.2`, and to drop the reading of a capture 07 that ends at the one-turn limit after tool calls, so that under the probe of B2 capture 07 passes only when it exits 0 cleanly. It runs the script on synthetic captures, including one with a tool call in capture 07, which it refuses, and halts with its report. Its last commit is the Phase 1 head.
2. **Phase 2, after my investigation.** Under a resume message I sign, which hands it the sanitized outputs of B7 and the records of B8, it adds those recorded streams as test fixtures under `packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/`, with a `manifest.tsv` in the form of M0's, tests the adapter against them with the registration's supported version, writes the packet of B9, completes its build log, runs the gates of B10 and halts with its report.
3. **Paths.** It changes only `packages/protocol/src/adapter-registry.ts` and its tests; `packages/adapter-madv-surface/src/index.ts`, its tests and its new fixture folder; tests under `packages/supervisor/test/`; the build log `docs/verification/phase-3b-m0-admission-build-log.md`; and the packet `docs/verification/phase-3b-m0-admission-investigation.md`. Any other path, including every other file under `packages/supervisor/src/`, `package.json` and `bun.lock`, is a halt. An existing test changes only where it pins the madv-surface supported version `0.1.1` or the identity-probe argument vector of A3 item 1, and then for that value alone. M0's fixtures and `recorded.test.ts` stay byte-identical. No test-only seam is the production mechanism.

B6. **Delivery.** The builder learns of every change to its commission through a resume message I sign. Its builder prompt names this act by its SHA-256 once it is on `main`.

B7. **The investigation.** My own guarded commands run `DEC-20261115-02` B8 once more on each host, outside any agent session, my MacBook first and my Ubuntu PC within 7 days of it, with its key rules as its Addendum 4 B1 reads them, and with these values:
1. `S` is the host's release build of A2, and item 1 compares its SHA-256 with A2's value;
2. item 2, and item 7 after the live calls, must print `madv-surface 0.1.2`;
3. `F` is the identity probe's argument vector of B2, so that items 4, 5 and 6 run with `--no-tools`;
4. after item 7, `S --help` is run once more, its standard output kept in a file, as a local primitive;
5. each command counts the NUL bytes of every output it keeps, and records the counts;
6. the folders are `/Users/michaeldaley/builds/m0-admission-investigation-macbook` and `/home/michaeldaley/builds/m0-admission-investigation-ubuntu`.
That is five live calls on each host and ten in all; none is repeated. B9 of `DEC-20261115-02` applies, except that its item 3 is met only by a capture that exits 0 cleanly: the reading of `DEC-20261115-02` Addendum 5 B1 was for 0.1.1 and does not apply. A NUL byte in the standard output of item 3, 4, 5 or 6 fails that item. If B9 is not met on a host, no madv-surface record is written there, and the build halts for my ruling.

B8. **The records.** On each host where B9 is met, after its primitives, my guarded command runs the record script of B5 item 1, after my check of it, from a fresh clone at the Phase 1 head with that host's runtime of `DEC-20261114-01` A4 and no key in its environment, as `DEC-20261115-02` B10 says, with the CLI version `0.1.2` and the host's binary path and SHA-256 from A2. My command prints the SHA-256 of each stored record file. The Claude Code records of A4 item 2 stay as they are.

B9. **Evidence.** The build log follows `DEC-20261108-03` B10, and the packet is the sanitized packet of plan §3 M0 for this build, as `DEC-20261115-02` B11 describes, with the NUL counts of B7 item 5. Neither holds a key, token or secret. The raw outputs stay in the folders of B7 item 6.

B10. **Gates and my runs.** At the builder's last commit, each once and logged, under the load rule of `DEC-20261115-02` B12: the frozen install with `bun.lock` unchanged; `bunx tsc --noEmit` with no output; and bare `bun test` with 0 fail, every test of the binding base present and none skipped, and a count at or above the baseline the builder records at the binding base, which must be at least 2027 pass across 147 files (`DEC-20261119-01` A6). Then, under plan §2B, I run the same on both certification hosts from fresh clones at the head, in a terminal that is not an agent session, and Verify and Verify (macOS) must pass on the pull request.

B11. **Review and merge.** My guarded command pushes the branch and opens the pull request as a draft as `decivantiq`, after my check of the session records and my breaks of B4. Only a posted PASS at the exact head, after my checks of plan §2C, lets it be marked ready. A FAIL, or any SUBSTANTIVE finding, returns to me. It merges only by my merge authorization naming its exact head and every review and review comment on it, by merge commit. The act that records its merge rules whether `DEC-20261108-04` B4 item 3 is met.

B12. **Halts.** The build halts for my ruling, with what passed, what failed and the single next decision, when: a path outside B5 item 3 would change; an external dependency would be added; any live call would be made other than by my commands of B7; a test of the binding base would have to be removed, skipped or weakened, or changed beyond B5 item 3; the floor of B10 is not met; any gate fails at any load; the code cannot carry B3 within those paths; B7 halts; or anything `DEC-20261023-01` Part B, `DEC-20261108-03` Addenda 2 to 6 and 10, `DEC-20261112-02` or the builder prompt names as a stop occurs. A halt is not a verdict.

B13. **The carried items.** The three ADVISORY findings of `DEC-20261119-01` B3 are answered by B4 items 5 to 7, and the question of its B4 by B3 item 2. The NUL bytes of `DEC-20261121-01` B3 are answered by B7 items 4 and 5: the packet states the counts, and B7 says what a NUL byte in a probe's output does. The items `DEC-20261119-03` B10 leaves to this act are answered by B2, B7 and B8. Each is closed when the act that records this build's merge finds it so.

B14. **Timing.** The Claude Code records of A4 item 2 expire on 2026-12-17. This act does not renew them. M1's act, or M7's for its runs, rules any renewal.

B15. **Filing.** One docs-only pull request, made by a Claude Code filing session under a filing prompt I sign, adds this act as `docs/decisions/DEC-20261121-02-madv-surface-admission.md`, unchanged, and changes nothing else. It touches `docs/decisions/`, so under `AGENTS.md`, as `DEC-20261031-01` amended it, it merges only by an act of mine naming its exact head. The builder session of B1 starts only after that merge.

B16. **Counting.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. This act takes effect when I sign it.

B17. **What this does not open.** This act authorizes no live call other than the ten of B7, no change in `MADVenturesLLC/madventures-surface`, no start of a governed session and no change to the `start` gate. It changes no registration other than madv-surface's, as B2 says. It changes no earlier ruling, except that B2 changes the values `DEC-20261115-02` B2 item 1 and B3 item 1 set, B3 adds to the parser of its B3 item 4, and B7 sets aside, for this investigation, the reading of its Addendum 5 B1.

## Part D: Not authorized

- Any live provider call other than the ten of B7, any live call by an agent session, and any use of my M Plan key outside the madv-surface process of B7.
- Any change to a path outside B5 item 3, to a gate, or to a path plan §2 preserves, except the registry values of B2.
- Any change to the `claude-code` or `antigravity` registration, or to the records of A4 item 2.
- Any merge other than by B11, any slice other than this build, and any start of a governed session.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-21

Actor-Id: founder
