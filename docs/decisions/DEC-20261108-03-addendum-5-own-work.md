FOUNDER-ACT-20261108-PHASE-3B-H1 ADDENDUM 5: the builder's own work in progress and the load rule, and the halt of H1's fifth session

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** `DEC-20261108-03` B9 items 3 and 5 and Part D, as read below
> **Read with:** `DEC-20261108-03` B5, B8, B9 and Part D; its Addenda 1 to 4; `DEC-20261102-02` B4; `DEC-20261023-01` B4 and B5; `DEC-20261108-04` Addendum 1 B4

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The fifth session.** H1's builder session under the fifth-session builder prompt, SHA-256 `d4f26d624f223b4ada08741397ec31b061e0ca7093a0c377ede42aa84fc7c7de`, ran on `codex-cli 0.167.0` and reported no barred tool call. Its preconditions passed, including the 96 logs of the fourth session and the 94 entries of its manifest. Its resume check passed: the install, the typecheck, the architecture file with 55 pass and 0 fail, and the evidence file with 36 pass and 0 fail. It applied `pr/unfinished-item8.patch` and committed it unchanged as `56775934aa653daefa9bb40f8c42a26e9f8e732a`, with parent `8e5b471aed5330dd1b620f2a040540871b6fd047`, after the architecture file passed with it; under Addendum 4 B2, logs 088, 090 and 091 are item 8's break, failing run and restore.

A2. **The halt.** Before it edited the architecture test for item 9, the builder ran a walker it had written in its disposable directory over the source at the binding base, log 144, in a run whose first load average was 4.90. The walker reached 19 files, reported nine workspace specifiers as unresolved, among them `@madventures/protocol` and `@madventures/ledger`, and exited 1. The builder reports that its resolver appears not to have applied the repository's TypeScript path mappings, and that the run establishes no forbidden file or load. It did not correct or rerun the walker, and halted under `DEC-20261108-03` B9 item 5 with the tree clean at `56775934aa653daefa9bb40f8c42a26e9f8e732a`. Its halt report is `pr/h1-session5-halt-report.md`, SHA-256 `bf5329c34f292a1cfa48e0fb1f5100ef37496b04eb018217700588ac2441b0b7`, and its log manifest `pr/h1-session5-halt-log-manifest.sha256`, SHA-256 `d5f5a37c2d3364d51e6694bb76546abdc1ed0bb06dfad7d3bb775710da6d5849`.

A3. **The rules.** `DEC-20261023-01` B4 lets a builder fix its own change when it fails in a file the task may change, and its B5 bars rerunning a failed run unchanged to obtain a pass. `DEC-20261102-02` B4 bars rerunning a test that fails in a run whose first load average was 2.0 or more, and `DEC-20261108-03` B9 item 5 and Part D make that a halt for H1. Read as written, every failure of code the builder is still writing halts H1 whenever the load is 2.0 or more. On my MacBook the first load average was 2.0 or more at the baseline, at item 7's breaks, at item 8's first break run and at log 144.

A4. **The drafting assistant.** A Claude Code session drafted `DEC-20261108-03` B9 item 5 without saying how it meets `DEC-20261023-01` B4, read an excerpt of the halt report that I copied to it, and drafted this addendum. That is not an independent review.

## Part B: Founder rulings

B1. **The builder's own work in progress.** A failure of code the builder wrote for the current item and has not yet committed, at any load, is handled under `DEC-20261023-01` B4: the builder corrects its code and runs it again, and records every run. That covers a test it added or changed for that item in a file of `DEC-20261108-03` B7, and a script it wrote in its disposable directory. It is not a rerun under `DEC-20261102-02` B4 or Part D of `DEC-20261108-03`, and not a halt under its B9 item 5. The builder never reruns a failed run unchanged, and never removes or weakens a test or assertion the act requires.

B2. **What the load rule still halts.** In a run whose first load average was 2.0 or more, the builder halts, and does not rerun, on: a timeout; a failure of any test or assertion it did not add or change for the current item; and any failure in the gates of `DEC-20261108-03` B8 item 4. A failure in my run of its B12 still halts H1.

B3. **Log 144.** It is a failure under B1: the builder corrects its walker and runs it again. `DEC-20261108-03` B9 item 3 concerns a walk that resolves relative specifiers and workspace package names to files, as its A4 item 4 describes. A specifier that stays unresolved once the walk applies the repository's own path mappings and workspace package names is a halt under B9 item 3; one the builder's resolver failed to resolve is a defect of the walker.

B4. **Resumption.** H1 resumes in the same session, from `56775934aa653daefa9bb40f8c42a26e9f8e732a`, under a resume message I sign that names this addendum: items 9 to 11 with their breaks and commit, the gates in the order of Addendum 1, the build log, the pull request files and the attribution checks, as the fifth-session builder prompt says. The build log records A1, A2 and this addendum. The two halt files of A2 stay in `pr/` unchanged and are not deliverables. If that session cannot continue, a new session resumes the same way under a builder prompt I sign.

B5. **Other slices.** B1 and B2 are how the load rule of `DEC-20261102-02` B4 is read for every Phase 3B slice, including those `DEC-20261108-04` commissions, whose Addendum 1 B4 is read with them.

B6. **Counting and filing.** A halt is not a verdict and adds no round. These are new Founder rulings, which Phase 3A plan §11.3 does not count. This addendum takes effect when I sign it and is filed unchanged with the act that records H1's merge, with Addenda 1 to 4. Nothing else in `DEC-20261108-03` or its Addenda 1 to 4 changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-10

Actor-Id: founder
