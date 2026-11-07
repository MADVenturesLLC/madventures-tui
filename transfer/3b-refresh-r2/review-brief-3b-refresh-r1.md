STEP: independent review of the Phase 3B design spec and implementation plan, revision 2 drafts, for MADVenturesLLC/madventures-tui. Paste this as the first message of a new session on the Founder's MacBook, in a harness running a model not made by Anthropic, opened on the folder /Users/michaeldaley/builds/3b-refresh-review-r1. That folder holds everything you review; a read-only copy of this brief is in its drafts/ subfolder.

FIRST, before you read any file: report exactly as your harness shows them the harness name, the model, and every active workspace. If a field is not shown, say "not shown"; that alone is not a stop. Begin every command with cd /Users/michaeldaley/builds/3b-refresh-review-r1 && and run it from there. Run pwd, git -C tui rev-parse HEAD and git -C surface rev-parse HEAD that way; they are part of this report. Stop and report only if the model is made by Anthropic, pwd does not print that path, tui/ is not at 5be1a586b4a4bb7cc09dfc6239b66b518cf9a23c, or surface/ is not at 270981400324c684abc1a5c0e837c8d8a3b20cf7.

YOUR ROLE
You are an independent reviewer of two planning documents. You did not write, plan or direct them, and this session has seen no material of them before this message; if either is untrue, stop and say so. A Claude Code session drafted them, so this review must come from a harness and model outside Anthropic. You review; you do not edit. This is a review of documents before approval. It authorizes nothing and builds nothing.

WHAT YOU MAY READ AND RUN
Read only inside /Users/michaeldaley/builds/3b-refresh-review-r1. Your harness may also attach /Users/michaeldaley or other folders; read nothing there. Read nothing under ~/.secrets, ~/.ssh, ~/.config, ~/.claude, ~/.codex, ~/.gemini or ~/.hermes, no other build folder, no earlier review, and no memory, transcript or notes of any tool. Use no MCP server, start no other agent, and make no network call: no git fetch, no web page. The clones have no remote. You may run only read-only commands: cat, sed -n, grep, git show, git log, git grep, git diff, wc, shasum. Run no test, no Bun, and nothing that prints an environment variable or lists processes. Write only your log folder and your report.

WHAT IS IN THE FOLDER
- drafts/2026-09-19-phase-3b-live-tui-integration-design.md: the spec under review (revision 2).
- drafts/2026-09-19-phase-3b-live-tui-integration.md: the plan under review (revision 2).
- drafts/SHA256.txt: the SHA-256 of each file in drafts/. Check it first and log the result.
- tui/: MADVenturesLLC/madventures-tui at 5be1a586b4a4bb7cc09dfc6239b66b518cf9a23c. Revision 1 of both documents is at the same paths under tui/docs/superpowers/. The Phase 3A design is tui/docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md, the Phase 3A plan is tui/docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, and the Founder's acts are under tui/docs/decisions/.
- surface/: MADVenturesLLC/madventures-surface at 270981400324c684abc1a5c0e837c8d8a3b20cf7, the madv-surface 0.1.0 tree merged on its main.

CONTEXT YOU TAKE AS GIVEN
The Founder chose the live pair: Claude Code plus madv-surface. Do not argue for another pair. You may report a risk or a gap in how the drafts admit madv-surface. Phase 3A merged at a7dbc7def0cd67568b2765c894ff91894707801c under docs/decisions/DEC-20261106-02-phase-3a-final-merge-review.md, and docs/decisions/DEC-20261107-01-task59-records-and-phase-3a-merge.md records that merge and closes M26; both are in tui/. Phase 3A is merged, not certified: the start gate stays closed until Phase 3B.

WHAT YOU REVIEW (a PASS, FAIL or INCONCLUSIVE line for each, with the reason)
1. Fidelity to the Phase 3A design. Does any statement of either draft contradict the Phase 3A design, in particular its sections 1.5, 2.2, 2.3, 4.2, 4.3, 6.9, 9.1, 9.2, 9.8 and 9.13? Does the admission of madv-surface stay inside the rules of section 9.1 (one registration keyed by surface id, with single static provider, independence domain and organization), section 9.2 (pair eligibility) and section 9.13 (live attestation)?
2. Facts about the code. Check every factual statement the drafts make about tui/ or surface/ against the files: the adapter registry entries, the pair constraints, the start gate, the BrokerClient boundary, the TUI files the plan lists as naming the second pane (and any such file it misses), the madv-surface command line, events, exit codes, profiles, providers, model families, auth status verification method and default role. Report each statement the files do not support.
3. Items carried from Phase 3A. Search tui/docs/decisions/ for every ruling that carries an item to Phase 3B or to "the first Phase 3B act". Report any such item that plan section 2D omits, quotes inaccurately, or places in a slice that cannot do it.
4. The admission design (spec section 1.1 item 1 and section 2.6, plan slice M0). Is madv-surface's per-response model_response metadata passing evidence under Phase 3A design section 2.2? Is the attestation the spec describes enough for section 9.13? Is the binary-hash and version rule enough for section 9.1? What does M0 leave unspecified that a builder would need?
5. Process and order. Do the slice order, binding bases, suite-count floor and execution semantics of plan sections 0A, 2A, 2B and 2C agree with the acts they cite (including DEC-20261104-01 B10, DEC-20261102-02 B5, DEC-20261106-01, DEC-20261106-02 and DEC-20261107-01)? Is any dependency between slices missing?
6. Open items. Is every decision the Founder must make listed in plan section 5? Is any listed item already decided by an act?
7. Exposure. Are the live-call, billing, plan-terms and secret rules of spec section 1.3 and plan sections 0A item 6 and 1 complete for what the slices do?
8. Consistency. Do the spec and the plan agree with each other, and with what revision 1 kept that revision 2 still relies on?

FINDINGS
Classify each finding:
- BLOCKING: must change before the Founder approves: a contradiction of the Phase 3A design or an act, a false statement about the code, an omitted carried item, or a design gap that would let a slice certify something the Phase 3A design forbids.
- ADVISORY: an improvement that approval does not require.
Do not inflate an advisory, and do not downgrade a real defect. For each finding give the draft, section and line, and what would fix it.

EVIDENCE RULES (the Founder checks these by script; a report that breaks them is void)
- Your log folder is /Users/michaeldaley/builds/3b-refresh-review-r1/logs/. Pipe every command through tee into its own log file there, and list each log with its SHA-256 at the end of your report.
- Every statement about a file names the file path relative to the folder (for example tui/packages/protocol/src/adapter-registry.ts) and its line numbers, and quotes the text you rely on in a fenced block, copied byte for byte from the file. The Founder's script checks that every fenced quote attributed to a file appears in that file at the stated commit. Quote only text you read with a command whose log you list.
- Never write code, diffs or output that you did not read or run. If you did not check something, say INCONCLUSIVE and why.
- Quote no secret. The folder holds none.

IF YOUR CONTEXT IS COMPACTED
Before your next step, run shasum -a 256 drafts/review-brief-3b-refresh-r1.md, log it, check it against drafts/SHA256.txt, read this brief in full again, and continue from the step your logs show you last completed. If the value differs, stop and report. Record each re-read in report section 4.

FINAL REPORT (in this order)
Write the complete report to /Users/michaeldaley/builds/3b-refresh-review-r1.md in one pass, then print the same text as your last message, followed by that file's SHA-256 from shasum -a 256.
1. Identity: the harness and model as shown, every active workspace as shown, pwd and both HEADs, the drafts/SHA256.txt check, and that you did not author or direct the work.
2. Verdict: APPROVE, CHANGES REQUIRED or INCONCLUSIVE, then one line for each of items 1 to 8 with its reason. Any BLOCKING finding means CHANGES REQUIRED.
3. Findings, each classified, with draft, section, line, quoted evidence and the fix, or the word none.
4. What you read and ran, and any re-read of this brief after a compaction.
5. Every log in your log folder, by file name and SHA-256.
6. Anything you could not check, and why.
