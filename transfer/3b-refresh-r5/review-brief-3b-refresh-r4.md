STEP: independent fix-verification review of the Phase 3B design spec and implementation plan, revision 5 drafts, for MADVenturesLLC/madventures-tui. Paste this as the first message of a new session on the Founder's MacBook, in a harness running a model not made by Anthropic, opened on the folder /Users/michaeldaley/builds/3b-refresh-review-r4. That folder holds everything you review; a read-only copy of this brief is in its drafts/ subfolder.

FIRST, before you read any file: report exactly as your harness shows them the harness name, the model, and every active workspace. If a field is not shown, say "not shown"; that alone is not a stop. Begin every command with cd /Users/michaeldaley/builds/3b-refresh-review-r4 && and run it from there. Run pwd, git -C tui rev-parse HEAD and git -C surface rev-parse HEAD that way; they are part of this report. Stop and report only if the model is made by Anthropic, pwd does not print that path, tui/ is not at 5be1a586b4a4bb7cc09dfc6239b66b518cf9a23c, or surface/ is not at 270981400324c684abc1a5c0e837c8d8a3b20cf7.

YOUR ROLE
You are an independent reviewer. You did not write, plan or direct these documents or the review in prior/, and this session has seen no material of them before this message; if either is untrue, stop and say so. A Claude Code session drafted the documents, so this review must come from a harness and model outside Anthropic. You review; you do not edit. This review authorizes nothing and builds nothing.

WHAT THIS REVIEW IS
A full review of revision 4 (prior/review-3b-refresh-r3.md) found two BLOCKING and three ADVISORY findings, F1 to F5, and found the rest of revision 4 sound. Revision 5 is meant to answer exactly those five findings and to change nothing else. Your task is narrower than a full review:
1. For each of F1 to F5, decide whether revision 5 resolves it: RESOLVED, PARTLY RESOLVED or NOT RESOLVED, with the reason.
2. Check every line that differs between revision 4 and revision 5, in both documents, against the files and acts it relies on: does a changed line contradict the Phase 3A design or a Founder act, state something false about tui/ or surface/, or contradict another part of either document?
3. Report any change in revision 5 that goes beyond answering F1 to F5.
Do not re-review unchanged text, except to the extent a changed line depends on it. Do not treat the prior review's findings as proven: check each against the files yourself.

WHAT YOU MAY READ AND RUN
Read only inside /Users/michaeldaley/builds/3b-refresh-review-r4. Your harness may also attach /Users/michaeldaley or other folders; read nothing there. Read nothing under ~/.secrets, ~/.ssh, ~/.config, ~/.claude, ~/.codex, ~/.codex-governed, ~/.gemini or ~/.hermes, no other build folder (including the folders 3b-refresh-review-r1, -r2 and -r3 under /Users/michaeldaley/builds and their reports), and no memory, transcript or notes of any tool. The one earlier review you read is the copy in prior/. Use no MCP server, start no other agent, and make no network call: no git fetch, no web page. The clones have no remote. You may run only read-only commands: cat, sed -n, grep, git show, git log, git grep, git diff (including git diff --no-index between two files of the folder), wc, shasum. Run no test, no Bun, and nothing that prints an environment variable or lists processes. Write only your log folder and your report.

WHAT IS IN THE FOLDER
- drafts/2026-09-19-phase-3b-live-tui-integration-design.md and drafts/2026-09-19-phase-3b-live-tui-integration.md: revision 5, under review.
- prior/r4-design.md and prior/r4-plan.md: revision 4 of the same two documents.
- prior/review-3b-refresh-r3.md: the full review of revision 4, with findings F1 to F5.
- drafts/SHA256.txt and prior/SHA256.txt: the SHA-256 of each file in those folders, by bare file name. Check both, each from inside its own folder, first, and log the results.
- tui/: MADVenturesLLC/madventures-tui at 5be1a586b4a4bb7cc09dfc6239b66b518cf9a23c, with the Phase 3A design, the Phase 3A plan and the Founder's acts under tui/docs/.
- surface/: MADVenturesLLC/madventures-surface at 270981400324c684abc1a5c0e837c8d8a3b20cf7.

CONTEXT YOU TAKE AS GIVEN
The Founder chose the live pair (Claude Code plus madv-surface), the minimax profile, a separate early slice that amends the capability record for Linux, and no approval workflow in Phase 3B. Do not argue for other choices. Phase 3A is merged, not certified, as tui/docs/decisions/DEC-20261107-01-task59-records-and-phase-3a-merge.md records.

FINDINGS
Classify each new finding:
- BLOCKING: a changed line that contradicts the Phase 3A design or an act, states something false about the code, leaves F1 or F2 unresolved, or lets a slice certify something the Phase 3A design forbids.
- ADVISORY: an improvement that approval does not require, including an advisory finding of the prior review left partly resolved.
Head each finding with a line of the form "### F<n> — BLOCKING: <title>" or "### F<n> — ADVISORY: <title>", numbering your own findings from N1. For each give the draft, section and line, and the fix.

EVIDENCE RULES (the Founder checks these by script; a report that breaks them is void unless the Founder rules otherwise)
- Your log folder is /Users/michaeldaley/builds/3b-refresh-review-r4/logs/. Pipe every command through tee into its own log file there, named with a three-digit number, a hyphen and a short name ending in .log. When you run several commands in one invocation, group them so the whole group reaches the log, for example { cmd1; cmd2; } 2>&1 | tee logs/012-name.log. If a command's output ever escapes its log, say so in section 4 with the command, run it again with its log, and rely only on the logged output; the Founder decides whether that voids the report.
- Every statement about a file names the file path relative to the folder and its line numbers, and quotes the text you rely on in a fenced block, copied byte for byte from those lines of the file. Put the attribution on its own line directly above the fenced block, in exactly this form: the path, a comma, a space, the word lines, a space, the line range, and a colon, for example tui/packages/protocol/src/adapter-registry.ts, lines 41–49: (a single line is written lines 33:). The same form applies to a quote from one of your logs, for example logs/001-pwd.log, lines 1:. The Founder's script checks that each fenced block equals the stated lines of the file. Quote only text you read with a command whose log you list.
- Never write code, diffs or output that you did not read or run. If you did not check something, say INCONCLUSIVE and why.
- Quote no secret. The folder holds none.
- Before you write the report, freeze the manifest: compute the SHA-256 of every file in logs/ and list them in report section 5 as a table with one row per log, of the form | 001-pwd.log | <sha-256> |. After the freeze, create or change no log. Then write the report in one pass and run only shasum -a 256 /Users/michaeldaley/builds/3b-refresh-review-r4.md, without tee and without a log, and print its output after the report as your last message. That one command is exempt from logging. If you need another command after the freeze, run it with its log, recompute the manifest and write the report again.

IF YOUR CONTEXT IS COMPACTED
Before your next step, run shasum -a 256 drafts/review-brief-3b-refresh-r4.md, log it, check it against drafts/SHA256.txt, read this brief in full again, and continue from the step your logs show you last completed. If the value differs, stop and report. Record each re-read in report section 4.

FINAL REPORT (in this order)
Write the complete report to /Users/michaeldaley/builds/3b-refresh-review-r4.md, then print the same text as your last message, followed by that file's SHA-256 from shasum -a 256.
1. Identity: the harness and model as shown, every active workspace as shown, pwd and both HEADs, both SHA256.txt checks, and that you did not author or direct the work.
2. Verdict: APPROVE, CHANGES REQUIRED or INCONCLUSIVE, then one line for each of F1 to F5 (RESOLVED, PARTLY RESOLVED or NOT RESOLVED, with the reason) and one line on the changed lines as a whole. Any BLOCKING finding means CHANGES REQUIRED.
3. New findings, each classified, with draft, section, line, quoted evidence and the fix, or the word none.
4. What you read and ran, any re-read of this brief after a compaction, and the unlogged final hash command.
5. Every log in your log folder, by file name and SHA-256.
6. Anything you could not check, and why.
