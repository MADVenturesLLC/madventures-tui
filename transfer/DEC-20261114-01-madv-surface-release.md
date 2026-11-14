FOUNDER-ACT-20261114-MADV-SURFACE-RELEASE: the madv-surface 0.1.1 follow-up build, the review I accept for it, its release commit and its builds on both certification hosts

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`, for work in `MADVenturesLLC/madventures-surface`
> **`origin/main` when drafted:** `cde513b79db1b236cce7e0f5cffecbe772e7b653` (the merge of pull request 239)
> **Governs:** Phase 3B plan §5 item 3; the follow-up build, review, release commit and release builds of madv-surface 0.1.1
> **Read with:** `DEC-20261108-01` B4, B5, B9 and B13 item 1; `DEC-20261108-02`; `DEC-20261108-03` Addenda 2 to 6, 10 and 11; `DEC-20261112-02` B2 and B5; `DEC-20261112-03` Addendum 2 B3; `DEC-20261113-01` B6 and B10; `DEC-20261013-03` B2 and B4; `DEC-20261102-02` B4; `DEC-20261023-01` Part B; `DEC-20261104-01` B10 item 3; `DEC-20261015-05` B3; Phase 3B design §1.2 and §2.6 item 3; Phase 3B plan §2A, §2C, §3 M0, §5 item 3 and §6

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What the plan requires.** M0 depends on a reviewed madv-surface release (Phase 3B plan §2A and §3 M0). Plan §5 item 3 leaves to an act its follow-up build, the review I accept for it, the release commit, and how its binary is built and hashed on each certification host, and `DEC-20261108-01` B13 item 1 has that act issue before M0's act. Under Phase 3B design §1.2, madv-surface is built and reviewed in its own repository, and under its §2.6 item 3 the registration's supported version and the capability record's binary hash name one release build of madv-surface, built from one commit of its repository that has passed a review I accept. Plan §6 authorizes no change to madv-surface's repository from this one. This is that act.

A2. **madv-surface now.** `MADVenturesLLC/madventures-surface` is a private repository with the branches `main` and `build/v0.1` and no tag. Its `main` is `d259cb5f9797101868391a0e4e81fc3a40ad3ea4`, the merge of its pull request 1 on 2026-11-05, whose tree is that of `270981400324c684abc1a5c0e837c8d8a3b20cf7`. It is version 0.1.0, read from `package.json` by `src/version.ts`; it has made no real provider call; its `minimax` profile names one family, of model ids that begin with `minimax` and then a hyphen or an underscore, in any case, and the default verification model `MiniMax-M3.1-Flash`, the model of `DEC-20261108-01` B5. It has no CI. Its tests run against a loopback mock; its scripts are `typecheck` (`bun x tsc --noEmit`), `test` (`bun test --timeout 20000`), `build` (a compiled release build with `MADV_SURFACE_TEST_BUILD` "0") and `build:test`. At `d259cb5f9797101868391a0e4e81fc3a40ad3ea4` its 21 test files hold 123 tests. Its second independent review is void (plan, provenance).

A3. **The three items of plan §5 item 3.**
1. Redaction order. `src/tools.ts` redacts the local view of tool output before it caps it, and `test/redaction-caps.test.ts` tests some caps, but no test fails on a change that truncates `read_file` or `list_dir` output before redaction (plan, provenance).
2. The Anthropic rule. `src/domain.ts` line 19 recognizes as Anthropic, on every profile and in any case, a model id that begins with `claude` and then a hyphen, an underscore or a colon, or that contains `anthropic`, and refuses it with reason `anthropic_model`. Some Claude ids are refused only by the unknown-family rule, with reason `unknown_family`, not by that rule (plan, provenance).
3. The TLS test. The test "two turns over one kept-alive TLS connection: the mock sees one connection and every model_response carries the verified host", at `test/tls.test.ts` line 67, asserts at line 89 that every request arrived from one client port. Under Bun 1.4.4 Bun opened three connections and that assertion failed, while the assertion of line 92, that every `model_response` carries the verified host `localhost`, held. Under Bun 1.4.2 the builder of 0.1.0 saw one reused connection. It has not been run under the custodied Bun of my Ubuntu PC.

A4. **The runtimes.** On my MacBook, Bun 1.4.2 at `/Users/michaeldaley/.bun/bin/bun`, SHA-256 `35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5`, revision `744846f844374847c902b5e7fd59b4342a51ef99`. On my Ubuntu PC, the custodied Bun 1.4.1 of `DEC-20261013-03` B2 and B4 at `/home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun`, SHA-256 `0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb`, revision `69cb78c9097cebd3bdb832d9fff8b7d23abce09e`. A compiled release build embeds the Bun that compiles it, so each host's binary has its own SHA-256.

A5. **The builder harness.** H2 was built by governed Codex on my MacBook under the governed build of `DEC-20261108-03` Addendum 11, with `DEC-20261108-03` Addenda 2 to 6 and 10 and `DEC-20261112-02`, my check of its session record and the logged load waits of `DEC-20261112-03` Addendum 2 B3; `DEC-20261113-01` records it.

A6. **The drafting assistant.** A Claude Code session read the plan, the acts and madv-surface's repository at `d259cb5f9797101868391a0e4e81fc3a40ad3ea4` for A2 to A4, and drafted this act. That is not an independent review.

## Part B: Founder rulings

B1. **The follow-up build.** One governed builder session builds madv-surface 0.1.1 in `MADVenturesLLC/madventures-surface`, on the branch `build/v0.1.1` from `d259cb5f9797101868391a0e4e81fc3a40ad3ea4`, and changes only:
1. for A3 item 1: tests, in `test/redaction-caps.test.ts` or a new test file under `test/`, that fail when `read_file` or `list_dir` output is truncated before redaction, each shown to fail on a deliberate break that truncates first and restored;
2. for A3 item 2: `src/domain.ts` and tests under `test/`, so that every Claude id the builder shows reaching the unknown-family rule is refused by the Anthropic rule with reason `anthropic_model`, on every profile; the builder first shows each such id refused as `unknown_family` at the base;
3. for A3 item 3: `test/tls.test.ts`, so that the test passes under the Bun of each certification host without weakening what it proves: every `model_response` carries the host its connection's handshake verified, including any response on a reused connection. It does not assert that a given Bun reuses a connection; where it relies on reuse, it shows in that run that reuse happened;
4. the version: `package.json` version `0.1.1`, the version strings of `README.md` and `docs/registration-proposal.md`, and the User-Agent expected by `test/new-profiles.test.ts`;
5. `README.md`, to describe the three items, and `docs/samples/README.md`, to say that the sample streams, which stay unchanged, were recorded with 0.1.0;
6. its build log, `docs/build-log-0.1.1.md`.
No other path changes. No dependency, `bun.lock`, profile, family table, model id, endpoint, exit code or event field changes.

B2. **The builder.** Governed Codex on my MacBook, the only Phase 3B builder `DEC-20261108-02` qualifies, Actor-Id `session:codex/surface-0.1.1-r1`, in `/Users/michaeldaley/builds/surface-0.1.1-r1`, with the git identity `daley40-lab` and no GitHub call, under a builder prompt I sign. Everything A5 names applies to it as it applied to H2: the governed build of Addendum 11, Addenda 2 to 4 (harness, namespaces, tools and my check of every session record started in its folder) and 5, 6 and 10 of `DEC-20261108-03`, `DEC-20261112-02` B2 and B5, `DEC-20261023-01` Part B, and the load rule of `DEC-20261102-02` B4 with a logged wait, as `DEC-20261112-03` Addendum 2 B3 rules it, before each command that runs tests. It runs Bun 1.4.2 of A4 and nothing else. My guarded commands push its branch and open its draft pull request as decivantiq.

B3. **The builder's gates.** At its last commit, each once and logged: `bun install --frozen-lockfile`; `bun run typecheck` with no output; `bun test --timeout 20000` with 0 fail, every test of `d259cb5f9797101868391a0e4e81fc3a40ad3ea4` still present and none skipped, and the new tests counted; `bun run build`, after which `dist/madv-surface --version` prints exactly `madv-surface 0.1.1`; `bun run build:test`; and `git diff --name-only d259cb5f9797101868391a0e4e81fc3a40ad3ea4 HEAD` within B1.

B4. **My runs on both certification hosts.** At the pull request's head, before the review, I run on each host from a fresh clone, with that host's Bun of A4: `bun install --frozen-lockfile`, `bun run typecheck`, `bun test --timeout 20000` and `bun run build`, and record the summary lines, `dist/madv-surface --version`, and the binary's SHA-256 and size, with a log manifest. Each run must end with 0 fail. The run on my Ubuntu PC is the proof of A3 item 3 under Bun 1.4.1.

B5. **The review I accept.** A Tier-2 review at the exact head by a fresh Gemini session in Antigravity, reviewer id `antigravity`, under a review prompt I sign, with my checks of Phase 3B plan §2C before its report is posted on the pull request. Only a posted PASS at the exact head lets the pull request be marked ready. A FAIL, or any SUBSTANTIVE finding, returns to me for a ruling. The review is not a Phase 3B slice verdict: it counts under no rubric milestone and adds no round.

B6. **The release commit.** The pull request merges into madventures-surface's `main` only by my merge authorization naming its exact head, by merge commit through my guarded command. My guarded command then tags that merge commit `v0.1.1`. That commit is the release commit of madv-surface 0.1.1.

B7. **The release builds.** On each certification host, from a fresh clone at `v0.1.1`, with that host's Bun of A4, I run `bun install --frozen-lockfile` and `bun run build`, and keep `dist/madv-surface` at `/Users/michaeldaley/builds/madv-surface-0.1.1/dist/madv-surface` on my MacBook and at `/home/michaeldaley/builds/madv-surface-0.1.1/dist/madv-surface` on my Ubuntu PC. I record each binary's SHA-256 and size, its `--version`, the Bun that built it and a manifest. Those two binaries, by those SHA-256 values, are the release builds M0's registration, investigation and capability records name. A binary built otherwise is not the release.

B8. **Halts.** The build halts for my ruling, with what passed, what failed and the single next decision, when: a path outside B1 would change; a dependency or `bun.lock` would change; any request other than the downloads of `bun install --frozen-lockfile` would leave the host, or a real provider key would be used; a test of the base would have to be removed, skipped or weakened beyond the one assertion of A3 item 3; the deliberate break of B1 item 1 shows the base itself truncating before redaction; any gate fails at any load; or anything `DEC-20261023-01` Part B, `DEC-20261108-03` Addenda 2 to 6 and 10, `DEC-20261112-02` or the builder prompt names as a stop occurs. A halt is not a verdict.

B9. **Records.** After the release builds, an act of mine records the build, my runs, the review, the release commit and the two release builds with their SHA-256 values, files this act's evidence in `docs/verification/` as a sanitized packet, and enters the review in the correction-round log under no rubric milestone. M0's act cites that act.

B10. **What this does not open.** This act authorizes no live provider call, no real key and no change to madventures-tui's code. It does not start M0, and it is not the ruling of `DEC-20261108-01` B6 on the plan terms, which issues by its own act before M0's act. It changes no earlier ruling, except that it authorizes the changes of B1 in madv-surface's repository, which plan §6 leaves to an act.

B11. **Filing.** One docs-only pull request, made by a Claude Code filing session under a filing prompt I sign, adds this act as `docs/decisions/DEC-20261114-01-madv-surface-release.md`, unchanged, alone or with the act of B10 on the plan terms, before the builder session of B2 starts, and changes nothing else. It touches `docs/decisions/`, so under `AGENTS.md`, as `DEC-20261031-01` amended it, it merges only by an act of mine naming its exact head.

B12. **Counting.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. This act takes effect when I sign it.

## Part D: Not authorized

- Any change in madv-surface's repository beyond B1, any merge there other than by B6, and any tag other than `v0.1.1` on the release commit.
- Any live provider call, any real key, and any request that leaves the host other than the downloads of `bun install --frozen-lockfile`.
- Any change to madventures-tui's code, tests, `bun.lock`, a manifest, the plan, the spec, `AGENTS.md` or an earlier decision record, except the filing of B11.
- Any slice, and any change to the `start` gate.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-14

Actor-Id: founder
