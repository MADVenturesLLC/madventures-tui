FOUNDER-ACT-20261105-PHASE-3A-HARDENING-F-RECORDS: Hardening F's verdict entered, Addenda 1 to 3 to DEC-20261104-02 filed, the token of DEC-20261104-01 A10 recorded as revoked, and Task 58's candidate commit recorded

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `ffcecaf9dbb6b2de3b406e475825137ddfe726b7` (the merge of pull request 224)
> **Governs:** `docs/verification/phase-3a-correction-rounds.md`; the filing of Addenda 1, 2 and 3 to `DEC-20261104-02`; the records of `DEC-20261104-01` B9 and `DEC-20261104-02` B5 and B13
> **Read with:** `DEC-20261104-02` and its Addenda 1 to 3; `DEC-20261104-01` A10 and B9; `DEC-20261102-02` B5 and B7; `DEC-20261015-05` B1 and B5; `DEC-20261023-01` Part B; plan §11.3

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What earlier acts leave to this act.** `DEC-20261104-02` B13 says the first act I sign after Hardening F's verdict is posted enters that verdict in the correction-round log. Addenda 1, 2 and 3 to that act each say they are filed unchanged with my next act. `DEC-20261104-01` B9 requires the token of its A10 to be revoked before the next build of this repository on the Ubuntu PC. This is that act.

A2. **Pull request 223.** It filed `DEC-20261104-02` and merged by merge commit at `03e9efec79eaeacb0ff185e2d84cf94a14aa46e6` on 2026-11-05, with parents `27d8e83ceca252be753d7994872a3dca50494782` and, second, `13016aeebafde7170e4265757627372d46807751`, under my authorization posted as comment 6648167161.
1. Copilot's review 5778382955 opened one thread, comment 4475411465, on B3 item 2 of `DEC-20261104-02`. I answered it with Addendum 1, which I signed before the merge, and my merge command resolved the thread.
2. The run of my merge command that posted the authorization made the merge. Three later runs of the same command stopped at their checks and changed nothing.
3. Push run 41957256609 of the attribution-shape check at the merge succeeded.

A3. **The addenda.** I signed Addendum 1 to `DEC-20261104-02`, SHA-256 `eb5bee7bf4c0c6564b0653ab89029fa32a1c7adc2566137ccf8a92835c965723`, Addendum 2, SHA-256 `74ef54bc717567793eaee09bfddd059d1eca27db04e387cd325f67df93ae86e0`, and Addendum 3, SHA-256 `c5b10f2e170b39b6eab8b55bd87208e34ab7dd47480eefdb4292546d84757f48`, on 2026-11-05. Each took effect when I signed it.

A4. **Hardening F, pull request 224.**
1. **The build.** Built on `build/hardening-f-r1` from the binding base `03e9efec79eaeacb0ff185e2d84cf94a14aa46e6` by `session:claude-code/hardening-f-r1`, a Claude Code session on the Ubuntu PC. It made `9b9ca51ed17b407cc676ac099694c6c0d9537a63` under `DEC-20261104-02` B3 and Addendum 1, and then `d8c91a25978fe8c3b748dd06ac3f87b01e835817` under Addendum 2, and reported no halt. It changed `packages/pty-host/test/signals.test.ts` and `docs/verification/hardening-f-build-log.md`.
2. **The checks.** At the head, Verify, Verify (macOS), code-review and attribution-shape succeeded; run 42020248744, which ran Verify and Verify (macOS), succeeded on its first attempt.
3. **The review.** Reviewer `antigravity`, a fresh session on Antigravity on my MacBook, with Gemini 4 Argon (High) as the harness showed it, under the review prompt with SHA-256 `7b12296cf7a46de3dbedd5cac87b62fa001de4a253ca22d6dc42f374c77bb301`. Its verdict at `d8c91a25978fe8c3b748dd06ac3f87b01e835817` was PASS with no findings.
   - Report SHA-256 `9427abda1f715fa62f7ec185e3c1441cde89a5c86392b826a40839d182254cb2`, 52,041 bytes, 812 lines, saved at `/Users/michaeldaley/builds/review-pr224-r1.md`, posted as comment 6658119243.
   - Before posting, my command checked every listed log against its SHA-256 in the report, and sixteen quoted results of the gates, breaks and probes against their logs.
   - The smallest `grace_ms` in an unmodified run was 2004.90. In a probe outside the repository, a 50 ms block of the test's event loop after the terminate command printed 1956.79, the limitation the build log records.
4. **Copilot and the merge.** Copilot's review 5785226434 opened no comment and recommended approval. Merged by merge commit at `ffcecaf9dbb6b2de3b406e475825137ddfe726b7` on 2026-11-05, with parents `03e9efec79eaeacb0ff185e2d84cf94a14aa46e6` and, second, `d8c91a25978fe8c3b748dd06ac3f87b01e835817`, under `DEC-20261104-02` B3 item 6. Push run 42031042009 of the attribution-shape check at the merge succeeded.

A5. **My GitHub logins.** On 2026-11-04 I replaced the token of my MacBook's `gh` login, after my guarded ready command for pull request 222 failed with "Resource not accessible by personal access token". On 2026-11-04 I revoked the token of `DEC-20261104-01` A10. Before Hardening F's setup, its command found `gh` on the Ubuntu PC logged in as `daley40-lab` only.

A6. **Hermes on the Ubuntu PC.** Hermes also runs on the Ubuntu PC, as the user service `hermes-gateway.service`. The first start of the script of Addendum 3 there stopped before any command because Hermes processes were running.

A7. **The drafting assistant.** It drafted this act, `DEC-20261104-02` and its three addenda, Hardening F's builder prompt and review prompt, the note in the header of the posted verdict, and the commands of A2 and A4. None of that is an independent review.

## Part B: Founder rulings

B1. **Hardening F's entry.** The verdict of A4 item 3 is entered with no rubric milestone and no round, as the verdicts of Hardening C, D and E were. The facts of A4 are recorded with it.

B2. **The candidate commit.** Under `DEC-20261104-02` B5, Task 58's candidate commit is `ffcecaf9dbb6b2de3b406e475825137ddfe726b7`, fixed on 2026-11-05 when push run 42031042009 succeeded. The freeze of `DEC-20261102-01` B4, as `DEC-20261104-02` B6 amends it, runs from then.

B3. **The token.** The revocation of A5 meets `DEC-20261104-01` B9. My GitHub login stays off the Ubuntu PC.

B4. **Hermes.** `DEC-20261104-02` B12 applies on both certification hosts: Hermes is stopped on each host while that host's runs of B7 and B10 run.

B5. **Counting and records.** These are new Founder rulings, which plan §11.3 does not count. No checkpoint closes.

B6. **What this does not open.** This act authorizes no build and changes no earlier ruling. It does not authorize Task 59 or any Phase 3B work, and Task 58's pull request still merges only by my merge authorization under `DEC-20261104-01` B10 item 3.

## Part C: Filing and recording

C1. One docs-only pull request files this act and Addenda 1, 2 and 3 to `DEC-20261104-02` unchanged, and changes nothing else except one entry appended to the end of `docs/verification/phase-3a-correction-rounds.md`, in the form of the log's latest entries, that records the verdict of A4 item 3. The pull request touches `docs/decisions/`, so under `AGENTS.md`, as `DEC-20261031-01` amended it, it merges only by a Founder act naming its exact head. As a docs-only change it is not a code or test change under `DEC-20261104-02` B6.

## Part D: Not authorized

- Any change to code, tests, `bun.lock`, a manifest, the plan, the spec, `AGENTS.md` or another decision record, except the filings of C1.
- Any edit of an existing entry of the correction-round log.
- Task 59, any Phase 3B work, and any build.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-05

Actor-Id: founder
