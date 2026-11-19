DEC-20261115-02 ADDENDUM 3: the check of M0's session record at the Phase 1 head

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Rules:** the stop of my check of M0's builder session record at the Phase 1 head, under `DEC-20261108-03` Addendum 6 B3; how the builder works in Phase 2; the push of the Phase 1 head
> **Read with:** `DEC-20261115-02` B1 item 2, B10, B13 and B15 item 3, and its Addenda 1 and 2; `DEC-20261108-03` Addenda 2, 6 and 10; `DEC-20261112-02` B2 and B5

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **Phase 1.** M0's builder session, `session:codex/3b-m0-r1`, reported Phase 1 complete on `build/3b-m0-r1` at `7f94c272a4fd7fc3b4ab1d18920b80ac95c677d3`, in five commits on `0825a1e349ca5ea6427eea5f2de79dff234dc8f7`, with its final report `pr/m0-phase1-report.md`, SHA-256 `d7149838cd7efc497c5010ca9bd2edbe020faeb6ade2f2e3bc25c9c1bd28fa84`, the record script `record/m0-record.ts`, SHA-256 `de3ea7cc7ded52c5ab14eed40280d420ce375e9c56b12cfd838cf2010a5550dd`, and the build log at that head, SHA-256 `5a3d38c0df555f26f969f79b8029b9750af5449ea9163be7ec8486d793f460b3`. My check command on my MacBook found the five commits authored by `daley40-lab` with the session's trailer, every changed path within `DEC-20261115-02` B7 item 3 and Addendum 1 B1, every changed line of an existing test within Addenda 1 and 2, those three hashes, the prompt folder unchanged and no key-like string in the reports, the script or the diff. It then ran my check of the session record, `h2-record-check.mjs`, SHA-256 `c1834dcc689e94cf57fb123a09a0600225d8e97b428c648f14276136e3dd383f`, from transfer commit `730df3014bf31d2dc0770cb4d30a4a4a79e30afe`, after its self-test passed. Its evidence is `/Users/michaeldaley/builds/m0-record-check/phase1-20261116T204310Z`, `MANIFEST.sha256` SHA-256 `4034ec7d52fbda32712ff324a5a7c03953b24ed53639fd98aab72b44ab154c4d`. It pushed nothing.

A2. **The check.** It found one record, `rollout-2026-11-15T23-45-25-01a1e2ac-9dcc-7432-a9bb-30415a36c620.jsonl`, with `cli_version` 0.167.0 and three turns, each with model `gpt-6.1-sol`, effort `xhigh`, approval `on-request`, approvals reviewer `user`, sandbox `workspace-write`, network access false and the folder `/Users/michaeldaley/builds/m0-r1`; top-level calls of 228 `exec`, 26 `wait` and 8 `clock.sleep` and no other; no event of a barred type; and no name of Addendum 2 B4 placed as text inside an `exec` input it could read. It stopped on one `exec` input, at `2026-11-16T05:47:20.985Z`, that does not parse.

A3. **The diagnostic.** My read-only diagnostic of that record, evidence `/Users/michaeldaley/builds/m0-record-check/phase1-diag-20261116T213101Z`, `MANIFEST.sha256` SHA-256 `0bb24f8f5946c4cb9f63d1b68815b2384747f13d3ebca247121d455cf2c8d8e0`, found:
1. Across all 228 `exec` inputs, that one included, no name of Addendum 2 B4 occurs, as any substring.
2. That input is 10,298 characters in 158 lines. It writes three test files through shell heredocs inside one `String.raw` template, and the template literals of two of those files end that template early, at its lines 86 and 115. Its recorded output is "Script failed", a wall time of 0.0 seconds and "SyntaxError: missing ) after argument list": it did not run.
3. The next `exec` call, at `2026-11-16T05:48:20.110Z`, is 10,308 characters and parses.
4. The builder stored helper code with `store` and ran it with `eval(load(...))`: 79 times `eval(load("runLogged"))` and 40 times `eval(load("runBun"))`. My check parses the code of an `exec` input; code run from a string it reads only as that string's text, so for such code it cannot tell a call from text. Nothing here turns on that, because no name occurs at all. The builder prompt did not bar it.

A4. **The drafting assistant.** A Claude Code session wrote my check command and the diagnostic, read their output and drafted this addendum. That is not an independent review.

## Part B: Founder rulings

B1. **The stop.** The input of A3 item 2 holds no name of Addendum 2 B4 and did not run, so it holds no occurrence that Addendum 6 B3 makes a halt. Phase 1's session record passes my check of Addendum 2 B4, as Addendum 6 B1 reads it, with the stop of A2 and the facts of A3 recorded.

B2. **My command.** My push command accepts that stop and no other: in that one record, the `exec` input at `2026-11-16T05:47:20.985Z`, of 10,298 characters, whose recorded output holds that SyntaxError, and only while no `exec` input of the record holds any name of Addendum 2 B4 and every other line of the check passes. Any other stop halts M0 for my ruling.

B3. **The push of the Phase 1 head.** After that check, my command pushes `build/3b-m0-r1` at the Phase 1 head as `decivantiq`, without a pull request, so that the record runs of `DEC-20261115-02` B10 and B15 item 3 on both hosts start from a fresh clone of it. The draft pull request of B13 follows Phase 2.

B4. **Phase 2.** From the resume message that starts Phase 2, the builder runs no code from a string inside `exec`: no `eval`, no `Function` constructor, no code loaded from a store, and no `store` of code. Every call it makes inside `exec` is written out in that `exec` input. My check at the end of Phase 2 counts these forms in the `exec` inputs after that message, and any of them halts M0 for my ruling.

B5. **The record.** M0's build log, in its Phase 2 part, and its pull request description record A2 and A3 in short and name this addendum by its SHA-256.

B6. **Filing and counting.** This addendum takes effect when I sign it, and is filed unchanged with the act that records M0's merge, with Addenda 1 and 2. A stop of my check is not a verdict and adds no round. These are new Founder rulings, which Phase 3A plan §11.3 does not count. Nothing else in `DEC-20261115-02` or its Addenda 1 and 2 changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-16

Actor-Id: founder
