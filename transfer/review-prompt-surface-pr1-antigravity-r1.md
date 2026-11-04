STEP: independent review of madv-surface, pull request 1 of MADVenturesLLC/madventures-surface. Paste this as the first message of a new Antigravity session running a Gemini 4 model on the Founder's MacBook, opened from the fresh clone /Users/michaeldaley/builds/madventures-surface-review-r1, detached at 71f3fdde5ddd1f55c2ece5de1d569f79cc970b48. A read-only copy of this prompt, and of the pull request's description, is in /Users/michaeldaley/builds/surface-review-r1-prompt/.

FIRST, before you read any file: report exactly as your harness shows them the harness name, the model, and every active workspace. This harness may also attach /Users/michaeldaley and /Users/michaeldaley/MADVenturesOPs and start its commands in /Users/michaeldaley; that is expected. Begin every command with cd /Users/michaeldaley/builds/madventures-surface-review-r1 && and run it from there. Run pwd and git rev-parse HEAD that way; they are part of this report. If a field is not shown, say "not shown"; that alone is not a stop. Stop and report only if the harness is not Antigravity, the model is not a Gemini 4 model, /Users/michaeldaley/builds/madventures-surface-review-r1 is not an active workspace, pwd does not print that path, or HEAD is not 71f3fdde5ddd1f55c2ece5de1d569f79cc970b48.

YOUR ROLE
You are an independent reviewer. You did not write, plan or direct this work. Claude Code sessions built it, so this review must come from a harness and model outside Anthropic. You review; you do not fix. Leave the clone as you found it: every deliberate break is restored, and the tree is clean when you finish.

WHAT YOU MAY NOT TOUCH
Do not read any other clone or build folder under /Users/michaeldaley/builds other than this clone, the prompt folder named above, your log folder and your report; anything under /private/tmp or /tmp that you did not create; any harness transcript; or any memory or notes of any tool. Read nothing under ~/.secrets, ~/.ssh, ~/.config, ~/.claude, ~/.claude-madventures-v5, ~/.codex, ~/.codex-governed, ~/.gemini or ~/.hermes, other than the prompt folder. Use no MCP server and start no other agent. Make no GitHub call and no git network command: the clone has no remote. Run no command that prints an environment variable, a token or a key, or lists processes.

THE ENVIRONMENT OF EVERY PROGRAM YOU RUN
The Founder's shell may hold real provider keys. Run every command that starts Bun, the compiled program or a test under env -i, passing only HOME, TMPDIR, TERM, USER and PATH=/Users/michaeldaley/.bun/bin:/usr/bin:/bin, plus any synthetic key you invent for a probe. No variable from the Founder's environment whose name ends in _API_KEY may reach any process. Make no request to a real provider host and use no real key. If any output shows what looks like a real key, or a request that reached a real provider host, stop at once: do not quote, hash or copy that log, and report only its path and the command.

The runtime is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. Report command -v bun under that PATH, its SHA-256, bun --version and its revision. Any difference is a stop. Install nothing outside the clone; bun install --frozen-lockfile of the clone's own development dependencies is allowed.

IF YOUR CONTEXT IS COMPACTED
Before your next step: run shasum -a 256 on /Users/michaeldaley/builds/surface-review-r1-prompt/review-prompt-surface-pr1-antigravity-r1.md and log the output; it must equal the value in SHA256.txt in that folder; read that file in full; and continue from the step your logs show you last completed. If the value differs or the file is missing, stop and report. Record each re-read in report section 4.

WHAT YOU REVIEW
- The pull request's description, pr-description.md in the prompt folder.
- The diff from 86659484f0b5d7bd0546c3630214e587107cdecc, the empty first commit on main, to the head: every file.
- At the head: README.md, docs/provider-fields.md, docs/registration-proposal.md, docs/samples/, package.json, bun.lock, every file under src/ and every file under test/.
Verify that git rev-list --reverse 86659484f0b5d7bd0546c3630214e587107cdecc..HEAD lists exactly these eight commits, in this order, and that git status is empty, before you read anything else: cdfe41d9affad9c807492c3965f29e3495074525, ed28f14a93cbcec32f2ffc00afa3de910026d851, 08e59965049f717fe71f00e4c96faaa06e4fb343, 835bab453a0ee95088f28eb85582bd3c20b0eb73, 97bf5afcf6f5306d3e657eb8fd3e81427275d386 (a merge that joins the branch to main and changes no file), 1c270352a4c1711a73a647bc3f19eb349ba0770d, a8986812dc5c2bbd93088d6def76f026856b1245 and 71f3fdde5ddd1f55c2ece5de1d569f79cc970b48. If either differs, stop and report.

THE PROGRAM'S STATED PURPOSE
madv-surface is a command-line agent meant to become the non-Anthropic member of a governed pair of coding surfaces. It may call only the subscription plan endpoint each profile pins. It reports, for every provider response, the model the server says it used, and the maker and independence domain resolved from that model. It must refuse every Anthropic model and key. These are the properties you test; README.md states its own contract in detail.

ITEMS (a PASS, FAIL or INCONCLUSIVE line for each, with the reason)
1. Host pinning: every request goes only to the profile's pinned host and base path, over HTTPS, with the TLS host checked; every redirect is refused; the test endpoint override works only in a test build and only to a loopback host, and the production binary refuses it; no other network path exists in src/, including through proxy environment variables.
2. Keys: the key is read only from the profile's own variable; keys beginning sk-ant- and keys without a profile's documented prefix are refused; no key, nor any part of one, reaches stdout, stderr, the transcript or any written file; run_command's environment carries no key.
3. Identity: response_model is copied only from the server's response, never from the request; a model_response event is written for every provider response before any tool runs; each fail-closed path exits with the code README.md states and runs no tool; the maker and independence domain of a response are resolved from that response alone.
4. Anthropic models: refused on every profile, both when requested, before any request, and when returned, before any tool runs. Try model ids such a model could carry on these hosts, with prefixes, slashes, separators and changes of case, and report for each whether the Anthropic rule refuses it, only the unknown-family rule refuses it, or nothing refuses it.
5. Tools: path traversal and symbolic-link escapes are refused; the reviewer role cannot write; run_command exists only with --allow-shell and runs argv-only, confined to the working directory, with its time limit.
6. Side effects: no telemetry, auto-update, MCP or plugin in the program; no third-party runtime dependency in package.json or bun.lock; what the program writes outside its working directory by default, and that it writes nothing there with --no-session-persistence.
7. Documentation: for each of the seven profiles, check the host, base path, wire format, response model field and key variable recorded in docs/provider-fields.md against the provider documentation page it cites. You may fetch only those cited documentation pages. Report every value its cited page does not support, and quote every clause on those pages about which clients may use a plan.
8. Gates and tests: run bun install --frozen-lockfile, bun x tsc --noEmit, bun test with a per-test timeout, and bun run build, each once, and report counts, exit codes, and the built binary's SHA-256 and --version. Then make at least five deliberate breaks, each shown with git diff before the run, run over the whole test suite, reported with which tests fail or that none does, then restored and confirmed by an empty git status:
   - response_model taken from the request instead of the server;
   - a redirect followed instead of refused;
   - the Anthropic family rule removed;
   - the reviewer role given write_file;
   - the key left out of redaction;
   - any others you choose.
   Then try to defeat the tests: find a change to src/ that breaks one of items 1 to 6 while every test still passes. Report each attempt and its result.

FINDINGS
Classify each finding:
- SUBSTANTIVE: a property of items 1 to 6 that is broken, a required behavior with no test or only a vacuous one, a documented value its cited page contradicts in a way that changes what the program does, or a successful attempt to defeat the tests that breaks a property of items 1 to 6.
- ADVISORY: an improvement the purpose above does not require.
A SUBSTANTIVE finding means FAIL. Do not inflate an advisory, and do not downgrade a real defect.

LOGS AND QUOTES
Your log folder is /Users/michaeldaley/builds/surface-review-r1-logs/. Create it and write every log there and nowhere else. Pipe every command, test run and probe through tee into its own log file, and report each log's SHA-256. Do not truncate, compress or encode a log. Quote output only from its log, naming the log, and copy every quote byte for byte: the Founder checks each quoted excerpt against its log. Do not state a hash, name, line number or value you did not copy from a log or from a file you read in this clone. Make probes in a scratch copy you create outside the clone, with synthetic values only.

HOW TO WORK AND DELIVER
- Work through to the end without waiting for guidance. The Founder answers only permission prompts and will not send corrections. If you cannot complete an item, its line is INCONCLUSIVE and you say why.
- Write the complete final report, every section below in order, to /Users/michaeldaley/builds/surface-review-r1.md in one pass, then print the same text as your last message, followed by that file's SHA-256 from shasum -a 256.

FINAL REPORT (in this order)
1. Identity and head: the reviewer as your harness shows it, the SHA you reviewed, the SHA in your checkout, harness and model as shown, every active workspace as shown, the host, and that you did not author or direct the work.
2. Verdict: PASS, FAIL or INCONCLUSIVE, then a line for each of items 1 to 8 with the reason.
3. Findings, each classified, with file and line, or the word none.
4. What you executed, with counts and exit codes, any re-read of this prompt after a compaction, and what you only read.
5. The breaks, the probes, the attempts to defeat the tests and the Anthropic model ids you tried, each with its result.
6. Every log in your log folder, by file name and SHA-256.
7. Anything you could not run or verify, and why.
