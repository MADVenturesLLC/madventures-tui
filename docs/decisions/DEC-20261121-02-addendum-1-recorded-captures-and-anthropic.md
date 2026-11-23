DEC-20261121-02 ADDENDUM 1: M0's recorded captures under the tool-free probe, and a test of the anthropic rule

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** `DEC-20261121-02` B4 item 4 and B5 item 3
> **Read with:** `DEC-20261121-02` A3, B3, B4, B5, B10 and B12; `DEC-20261115-02` B3 item 4

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The review.** Copilot's review 6006096854 of pull request 251, at its head `147da4b574c3dadd68fbc62d44eaafa2e7cab985`, which files `DEC-20261121-02`, opened two threads:
1. Thread 4653222367, on line 69 of the act, its B5 item 3: B3 item 1 makes the identity probe's parser refuse a `system/init` that lists tools, while M0's recorded probe captures list tools and `recorded.test.ts`, which B5 item 3 keeps byte-identical, expects them to pass.
2. Thread 4653222382, on line 60 of the act, its B4 item 4: each of the five ids there contains `claude`, so no required test catches a rule that drops `anthropic`.

A2. **The facts.** At `403a9f536539b96115aa44ab82436fe55d95b739`:
1. The first `system/init` of each of M0's eight identity captures, `04` to `07` on each host under `packages/adapter-madv-surface/test/fixtures/recorded/`, names version `0.1.1` and the tools `read_file`, `list_dir` and `search`.
2. Lines 32 to 40 of `packages/adapter-madv-surface/test/recorded.test.ts` expect five of them, MacBook `04`, `05` and `06` and Ubuntu `04` and `06`, to pass `parseMadvIdentity`. Under B3 item 1 each would fail it, and under B5 item 3 the test could not change, so the gates of B10 could not pass and B12 would halt the build.
3. The adapter's only test of an Anthropic model, line 37 of `packages/adapter-madv-surface/test/parser.test.ts`, names `claude-fable-5-2`. No test names an id that contains `anthropic` and not `claude`.
Both are right. The errors are in the drafting of `DEC-20261121-02`.

A3. **The drafting assistant.** A Claude Code session drafted `DEC-20261121-02` and this addendum, and checked A2 against the repository. That is not an independent review.

## Part B: Founder rulings

B1. **M0's recorded captures.** `DEC-20261121-02` B5 item 3 is amended for `recorded.test.ts` alone. M0's fixtures and their `manifest.tsv` stay byte-identical. `recorded.test.ts` changes only so that:
1. each of the five captures of A2 item 2 is expected to fail the identity probe's parser with `identity_mismatch`, because its `system/init` lists tools, and to pass the parser of a governed launch with the version `0.1.1` the test names;
2. the tests of Ubuntu `05` and of the two captures `07` keep their expected causes where the probe's parser still gives them, and otherwise state the cause it now gives, with one comment line saying why;
3. no other line of it changes.
The captures of item 1 also serve as recorded evidence for `DEC-20261121-02` B4 item 2.

B2. **The anthropic test.** `DEC-20261121-02` B4 item 4 gains the id `minimax-anthropic-x`, which must also fail `model_refused`, before the family check. That item is shown failing on two deliberate breaks, each restored: one that puts back the rule of A3 item 2 of the act, which the five `claude` ids catch, and one that drops `anthropic` from the rule, which `minimax-anthropic-x` catches.

B3. **The filing.** Pull request 251 merges with `DEC-20261121-02` unchanged. My merge authorization names Copilot's review, both threads and this addendum, and my merge command resolves the two threads. Copilot's review is not a countable verdict under Phase 3A plan §11.3 and adds no round.

B4. **Delivery and record.** The builder prompt names `DEC-20261121-02` and this addendum by their SHA-256. The build log and the pull request description of the admission build record this addendum by its SHA-256, and the changes to `recorded.test.ts` that B1 allows.

B5. **Counting and filing.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. This addendum takes effect when I sign it and is filed unchanged with the act that records the admission build's merge. Nothing else in `DEC-20261121-02` changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-21

Actor-Id: founder
