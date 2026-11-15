STEP: Tier-2 review of the madv-surface 0.1.1 follow-up build, pull request 2 of MADVenturesLLC/madventures-surface. Paste this as the first message of a new Antigravity session running a Gemini model on the Founder's MacBook, opened on the folder /Users/michaeldaley/builds/review-surface-0.1.1-r1 only. That folder holds the clone you review, the evidence, read-only copies of this prompt and the texts it names, your log and scratch folders, and nothing else you may read.

You are the independent Tier-2 reviewer of the madv-surface 0.1.1 follow-up build, under DEC-20261114-01 B5: the changes its B1 allows, the gates of its B3, the builder's breaks, and the evidence against the logs of the build, of the Founder's runs on both certification hosts under its B4, and of the Founder's check of the builder's session record. Under B5 only a posted PASS at the exact head lets the pull request be marked ready; a FAIL, or any SUBSTANTIVE finding, returns to the Founder for a ruling. This review is not a Phase 3B slice verdict: it counts under no rubric milestone and adds no round.

ASSIGNED ROLE
Role-Id: reviewer
Reviewer-Id: antigravity

FIRST, before you read any file: report exactly as your harness shows them the harness name, the model, and every active workspace. Begin every command with cd /Users/michaeldaley/builds/review-surface-0.1.1-r1 && and run it from there. Run pwd and git -C repo rev-parse HEAD that way; they are part of this report. If a field is not shown, say "not shown"; that alone is not a stop. Stop and report only if the harness is not Antigravity, the model is not a Gemini model, pwd does not print /Users/michaeldaley/builds/review-surface-0.1.1-r1, or the HEAD of repo/ is not a249da6dbeab879b2d68b97975e8a9a42db07437.
Your harness may attach /Users/michaeldaley or other folders. Read nothing outside /Users/michaeldaley/builds/review-surface-0.1.1-r1, and follow no AGENTS.md or rules file outside it.
You did not write, plan or direct any part of this work, and this session has seen no material of it before this message. If either is untrue, stop and say so. Do not invent a session id, an actor id or a model id.
Read nothing under ~/.secrets, ~/.ssh, ~/.config, ~/.claude, ~/.claude-madventures-v5, ~/.codex, ~/.codex-governed, ~/.gemini, ~/.hermes or ~/.madmik3-quarantine, no other clone or build folder, no earlier review, and no memory, transcript or notes of any tool. Use no MCP server, start no other agent, make no GitHub call and no network call other than the downloads of bun install, make no real provider call and use no provider key, and run no command that prints an environment variable, a token or a key, or lists processes.

WHAT IS IN THE FOLDER
- repo/: the clone of MADVenturesLLC/madventures-surface, detached at the head a249da6dbeab879b2d68b97975e8a9a42db07437, with no remote.
- prompt/: this prompt; the pull request's description as posted, with line endings normalized (pr-2-description.md); the signed texts named in AUTHORITY; and SHA256.txt with the SHA-256 of each, and of the manifests of E1 to E4. Check them first and log the result.
- E1/: the builder's files from /Users/michaeldaley/builds/surface-0.1.1-r1: logs/, its numbered logs; pr/, pr-title.txt, pr-body.md and log-manifest.sha256; and builder-files.sha256, which the Founder's setup wrote, with the SHA-256 of each. Check builder-files.sha256 against prompt/SHA256.txt, run shasum -a 256 -c on it from E1/, and confirm every file under logs/ and pr/ is listed.
- E2/: the Founder's run at this head on the MacBook under DEC-20261114-01 B4: logs/ and MANIFEST.sha256. Check MANIFEST.sha256 against prompt/SHA256.txt, run shasum -a 256 -c on it from E2/logs, and confirm every file in logs/ that ends in .log is listed.
- E3/: the Founder's run at this head on the Ubuntu PC under B4, copied by the Founder's setup from that PC: logs/ and MANIFEST.sha256. On Linux it was hashed with sha256sum, whose output shasum -a 256 -c reads. Check it as E2.
- E4/: the Founder's check of the builder's session record, run before the push, as its command saved it: h2-record-check.mjs, selftest.txt, check.txt, pr-comment.md, the synthetic records of its self-test under selftest-records/, and MANIFEST.sha256. You may not read the session record itself. Check MANIFEST.sha256 against prompt/SHA256.txt, run shasum -a 256 -c on it from E4/, and confirm every other file in E4/ except pr-comment.md is listed; pr-comment.md is what the Founder posted on the pull request, written after the manifest.
- logs/ and scratch/: yours, empty.
If any check fails, stop and report. The Founder's setup confirmed that the posted description equals E1/pr/pr-body.md with line endings normalized. madventures-surface has no CI; there are no GitHub checks to rely on.

TARGET
Pull request 2 of MADVenturesLLC/madventures-surface, draft, branch build/v0.1.1. Head a249da6dbeab879b2d68b97975e8a9a42db07437. The base is d259cb5f9797101868391a0e4e81fc3a40ad3ea4, main of that repository and the merge of its pull request 1, madv-surface 0.1.0 (DEC-20261114-01 A2 and B1). Verify that git -C repo rev-list --reverse d259cb5f9797101868391a0e4e81fc3a40ad3ea4..HEAD lists exactly six commits, that none is a merge, that the first has the parent d259cb5f9797101868391a0e4e81fc3a40ad3ea4, and that git -C repo status is empty, before you read anything else.

AUTHORITY (all in prompt/; confirm each SHA-256 and stop if one differs)
1. DEC-20261114-01-madv-surface-release.md, 6bffc2c18927b90f4b5042f312947e5d39853ca53404a58a51b4602eb45652b8: all of it, above all A2 to A4, B1 to B5, B8 and Part D.
2. The Founder's signed builder prompt and resume message, which set how the builder worked and what it reported: builder-prompt-surface-0.1.1-codex-macbook.md, 084f7a3a7af6692a03fdb5d653ba8bdb3de4e27b7dd4ff25a045ce8899a7c77f, and resume-surface-0.1.1-1-commit-width.md, 15da73708241a0c78f77ee13e7d68264e647c6958e3175fe17c51d9f2c8468f9.
3. DEC-20261112-02-model-record.md, 3151cb9e178e918f0c07f5a4eb9931fa9d529debedf0ad4d91f5999844883da7, and these addenda to DEC-20261108-03, which DEC-20261114-01 B2 applies: DEC-20261108-03-addendum-2-codex-harness.md, e04b54065b0f0bb465b2d14e14a39f3b31f9cb34a874f6f8210a7d7e74a8c1c1; DEC-20261108-03-addendum-3-image-tool.md, f2a0ef1063379902935760d9517b68d532cabf6e24699cdebb789681f78ce15e; DEC-20261108-03-addendum-4-sandbox-halt.md, e817470aea6be2c176d4ae75856fd793ef982bd28c9eb793df9c9038a5c1dfbc; DEC-20261108-03-addendum-5-own-work.md, e86e94a62c7067e4656114afe1713c1478814ffe446d1ffcc8b788accfc3ff3d; DEC-20261108-03-addendum-6-names-in-text.md, 24cef0ed5c968aa80ada586e473526d0f4f0b1de1331eba1d5a35051b1254ac9; DEC-20261108-03-addendum-10-second-verdict.md, d90d48718bc4ea6056af6f011f797a78eddcfd14e7111f15f823085c4388bca0; and DEC-20261108-03-addendum-11-governed-build.md, e2d28cbd12485e9025c928403eb7beead9552ee378b023ddf5bc9e18febe00df.
4. DEC-20261112-03-addendum-2-gate-repeat.md, 829248f1e2557ddbcfd33d6456f7056bfce73a008791cb88caa9660a5d979d29: B3, the logged wait.
5. DEC-20261113-01-h2-records-and-merge.md, 41e27eafc24a2eef238c080d1374b90fbe22d609f4ef5cbb66e07cccb5b347a5: B10, the marking of gaps in quoted blocks.
6. DEC-20261108-02-phase-3b-builder-qualification.md, 38ec4066f5c9487547befc81e00b80b69126d9140f1e66c0a8dcb35e5fe815ef: B2, B4 and B6.
7. DEC-20261102-02-hardening-builds.md, 04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550: B4.
8. DEC-20261023-01-standing-build-rules.md, bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5: Part B.
9. DEC-20261013-03-tests-4-6-ruling.md, 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7: B2 and B4, the runtimes of both hosts; and DEC-20261104-02-hardening-f-and-task58.md, 011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5: B7 item 1.
10. The Phase 3B plan, 2026-09-19-phase-3b-live-tui-integration.md, a48bf5457bf17cf5d554e541c5bb3609efacf6ad170ad6e56950b829a4269ccc: sections 2A, 2C, 3 M0, 5 item 3 and 6, and the provenance bullet that begins "madv-surface 0.1.0 is merged"; and the Phase 3A plan, 2026-08-12-phase-3a-runtime-foundation.md, 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2: section 11.3.
Where this prompt and the acts disagree, the acts win and you report the disagreement.

PACKET (read every item)
1. The texts above.
2. The six commits from d259cb5f9797101868391a0e4e81fc3a40ad3ea4 to the head, each with its diff and its message.
3. At the head, with line numbers: the build log, docs/build-log-0.1.1.md, in full; src/domain.ts, src/tools.ts, src/agent.ts, src/http.ts and src/redact.ts in full; both new test files in full; test/tls.test.ts and test/redaction-caps.test.ts in full; and every other file that the diff changes.
4. prompt/pr-2-description.md. It, the commit messages and what the build log says about the work are claims. Review items 1 to 9 from the code, the acts and the logs before you read the description, and state when you read it.

THE FOUNDER'S CHECK OF THE SESSION RECORD
Under DEC-20261108-03 Addenda 2 B4 and 6 B4, as DEC-20261114-01 B2 applies them, this prompt quotes the output of the Founder's check as the Founder's command ran it before the push. The Founder's setup confirmed that E4/check.txt is this text:

Source: E4/check.txt
```
records whose starting folder is /Users/michaeldaley/builds/surface-0.1.1-r1: 1
rollout-2026-11-13T23-58-14-01a1d86b-a064-7da3-90ac-3d93acbaf401.jsonl: started 2026-11-14T04:58:14.512Z, cli_version 0.167.0, folder /Users/michaeldaley/builds/surface-0.1.1-r1
  user messages: 0
  event types: 2 task_complete; 2 task_started; 2 thread_settings_applied; 215 token_count; 520 item_completed
  turn 2026-11-14T04:59:34.694Z | model gpt-6.1-sol | effort xhigh | approval on-request | approvals reviewer user | sandbox workspace-write | network access false | folder /Users/michaeldaley/builds/surface-0.1.1-r1
  turn 2026-11-14T13:54:50.832Z | model gpt-6.1-sol | effort xhigh | approval on-request | approvals reviewer user | sandbox workspace-write | network access false | folder /Users/michaeldaley/builds/surface-0.1.1-r1
  top-level calls: 154 custom_tool_call exec; 17 function_call wait; 41 function_call clock.sleep
  exec calls: 154; names of Addendum 2 B4 placed as text inside exec: 0
  calls inside exec, by called name: 104 exec_command; 15 replace; 172 text; 2 allSettled; 2 join; 2 map; 20 quote; 22 apply_patch; 3 q; 47 write_stdin
CHECK_OK
```

The check parses the input of each exec call as JavaScript, passes a name of Addendum 2 B4 only where it lies wholly inside a string, template or regular-expression literal or a comment, and stops on every other occurrence. Before it ran, its self-test of 66 synthetic cases, whose outcomes are in E4/selftest.txt, ended with SELFTEST_OK. The check is the one the Founder signed for H2; its one case specific to H2, a read-only turn in another record, does not apply to this folder.

REVIEW ITEMS (PASS only if all pass)
1. Scope and attribution (DEC-20261114-01 B1 and Part D; the builder prompt's ATTRIBUTION AND COMMITS and the resume message): whether exactly the paths B1 allows change, and no other: bun.lock, every file under src/ other than src/domain.ts, test/helpers.ts, test/mock-server.ts, test/fixtures/ and every file under docs/samples/ other than its README.md are unchanged, and in package.json only the version changes. Whether no dependency, profile, family table, model id, endpoint, exit code or event field changes. Six commits, in this order and with these subjects: docs: open the 0.1.1 build log with its task detail; test: fail when read_file or list_dir output is cut before redaction; fix(domain): refuse more Claude ids as anthropic_model; test(tls): stop asserting one connection, keep the verified host; chore(release): version 0.1.1; docs: complete the 0.1.1 build log; each touching only the paths the builder prompt names for it. Each has the author daley40-lab with its no-reply address; each message ends with Role-Id: builder, Actor-Id: session:codex/surface-0.1.1-r1 and Execution-Surface: codex as its final paragraph, with no line after them and no other line that begins with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:; and every line of each message is 72 characters or shorter, except line 4 of the first commit's body, which the resume message accepts.
2. Redaction order (B1 item 1; A3 item 1): whether the new tests fail when the local view of read_file output, or of list_dir output, is truncated before it is redacted; whether each observes the local view at a point no later cap can hide from it what it checks; whether each places its key across that tool's cap; whether the base itself redacts before it truncates; and whether production code is unchanged by this item.
3. The Anthropic rule (B1 item 2; A3 item 2): whether every id the builder chose reaches the unknown-family rule at the base on every profile and is refused with reason anthropic_model at the head on every profile; whether every id the base's rule matches is still matched; whether the new rule matches any id that an existing test, a family table or a profile's default model expects a profile to accept; and which Claude id forms, if any, the new rule still does not match, and whether B1 item 2 and A3 item 2 required the build to cover them.
4. The TLS test (B1 item 3; A3 item 3): whether the test of the base's line 67 passes without asserting that a given Bun reuses a connection or opens a given number of connections; whether it still proves that every model_response carries the host its connection's handshake verified, including any response on a reused connection; whether, where it relies on reuse, it shows in that run that reuse happened; whether any assertion of the base other than that of line 89 was weakened or removed; and what the printed line shows in the builder's runs and in each of the Founder's runs.
5. The version and the documents (B1 items 4 and 5): whether package.json, README.md, docs/registration-proposal.md and the User-Agent test name 0.1.1 and nothing else of those lines changed; whether README.md describes the three items of A3 as the code and tests now behave; and whether docs/samples/README.md says the unchanged sample streams were recorded with 0.1.0.
6. The builder's breaks (the builder prompt's S1 b, S2 e and S3 f): for each of the four breaks, whether E1/logs/ shows the break by diff, a run of the test file that fails for the reason its test names, the results of the other tests in that file, and the restore with an equal SHA-256 and an empty git status for that path; and whether the showing of S2 c is in its log.
7. The gates and the load (B3; B2 with DEC-20261112-03 Addendum 2 B3 and DEC-20261102-02 B4 as Addendum 5 reads it; the builder prompt's THE GATES and THE LOAD): whether the logs show each gate of B3 once, in order, at the sixth commit; a logged wait before each command that runs tests, with the reading at which it ended; the comparison of the head's test list with the base's, with 0 fail and no test skipped or marked todo; whether any failed run was run again unchanged; and whether any stop went unreported.
8. No live call and no key (B8; Part D): whether any test or command of the build made a real provider call, used a real key, or sent a request off the host other than the downloads of bun install --frozen-lockfile.
9. The evidence against the logs (B1 item 6; the builder prompt's THE BUILD LOG and TEST OUTPUT; DEC-20261113-01 B10): whether the build log's opening was committed before any change of code or tests; whether every command, load reading, exit status, count, time and log SHA-256 the build log and the description state is in the E1 log they name; whether every quoted block appears byte for byte in its source, and marks each gap where it joins lines from different parts of a log; and whether every signed text the build log names carries the SHA-256 of prompt/SHA256.txt.
10. The Founder's runs (B4): whether E2's and E3's logs each show bun install --frozen-lockfile, bun run typecheck with no output other than the line Bun echoes, bun test --timeout 20000 and bun run build, each once, with the host's Bun of A4; whether each test run ends with 0 fail; whether dist/madv-surface --version prints exactly madv-surface 0.1.1; and the binary's SHA-256 and size each records. This prompt quotes their summary lines:

Source: E2/logs/003-test.log
```
 126 pass
 0 fail
 2153 expect() calls
Ran 126 tests across 23 files. [13.86s]
```

Source: E3/logs/003-test.log
```
 126 pass
 0 fail
 2146 expect() calls
Ran 126 tests across 23 files. [7.65s]
```

11. The Founder's check (DEC-20261108-03 Addendum 2 B3 and B4, Addendum 6 B1 and B3, Addendum 10 B6; DEC-20261112-02 B2 and B5): what E4/check.txt shows against those rulings; whether E4/selftest.txt shows the check passing text that names each name of Addendum 2 B4 and stopping on a call of each; whether E4/h2-record-check.mjs does what this prompt says it does; and whether the identity report and the account of tools called in the build log and the description agree with E4/check.txt.
12. The deviations the description lists: assess each against the acts.

THE TEST RUNTIME
/Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. Begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun or /Users/michaeldaley/bun-displaced-1.4.4. Report command -v bun, its SHA-256, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. Install nothing outside repo/.

WHAT YOU MUST EXECUTE (do not substitute reading for these)
- The folder checks above.
- bun install --frozen-lockfile in repo/. Any tracked change it makes is a finding.
- The gates of B3 at the head, each once, in the foreground and in this order: the runtime check; bun run typecheck; bun test --timeout 20000; bun run build, then ./dist/madv-surface --version; bun run build:test; GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git diff --check d259cb5f9797101868391a0e4e81fc3a40ad3ea4 HEAD; git diff --name-only d259cb5f9797101868391a0e4e81fc3a40ad3ea4 HEAD. Record uptime before each run that starts Bun. Do not rerun a failed gate.
- Deliberate mutations, each in the working tree only: one that truncates the local view of read_file before redaction, and one that does so for list_dir, each made differently from the builder's breaks where you can, for example inside the shared helper rather than at the call site; one that puts back the base's Anthropic rule; one that drops the anthropic alternative from the new rule; one that removes the lookup in src/http.ts that gives a response on a reused connection the host its socket's handshake verified; and one that stops checkServerIdentity from recording the verified host. Show each by git diff before the run, run the test file that should catch it with no -t filter, report which tests fail and why, then restore it and confirm an empty git status.
- For each of items 2 to 4, one attempt to break what it checks while every test of the files it names still passes, run and restored as above.
- Your checks of items 9 and 11 as scripts in scratch/, each run through tee into its own log.
A mutation or attempt that does not fail as you expected is a result to report, not a failed command: you may make a new one and run it, and record every run.
Leave repo/ as you found it.

THE LOAD
Before each command that starts Bun, read the one-minute load. If it is 2.0 or more, first run a wait as its own logged command: a loop that prints the time and the one-minute load every 30 seconds and ends at the first reading below 2.0, or after 20 minutes. Start the run only after a reading below 2.0. If 20 minutes pass without one, ask the Founder in one line to quiet the MacBook, and wait again when the Founder answers. If a test fails unexpectedly in a run whose first load average was 2.0 or more, do not rerun it: report it verbatim with that reading and mark the item INCONCLUSIVE, unless you can show the failure does not depend on load.

KNOWN ITEMS ALREADY RULED OR STATED (assess, do not relitigate)
- The builder's halt after its first commit, on the width of line 4 of that commit's body, is not a verdict and adds no round. The resume message upholds it, accepts that line for that commit alone, and corrects how a check gates the step that depends on it.
- The warning that the governed build's --version printed under the sandbox, that it could not create PATH aliases, is recorded and is not a stop (resume message item 2).
- The reasoning effort of a builder session is recorded, not fixed, and a difference between the model the session reports and the model its record names is recorded and is not a deviation (DEC-20261112-02 B2 item 4 and B4).
- B1 item 4 requires the change of the User-Agent that test/new-profiles.test.ts expects; B1 item 3 allows the change of the test of the base's line 67 in test/tls.test.ts, and the builder prompt allows that test's rename.
- The dist/madv-surface binaries of the builder's gates and of E2 and E3 are not the release builds; under B7 those are built from the tag after the merge.
- E2 and E3 were run in plain terminals that are not agent sessions. Before the builder session started, the Founder stopped orphaned processes of another project that worked in /Users/michaeldaley/madv-harness. That is the Founder's evidence, which you cannot reproduce.

HOW TO QUOTE (the Founder's script checks every quote; a report that breaks these rules is not posted and is not a verdict)
- Put every quoted text in a fenced block, and put on the line directly above the opening fence exactly one source line, in one of these forms:
  Source: logs/<file>              for your own log
  Source: scratch/<file>           for your own script
  Source: E1/<path>                for a builder file
  Source: E2/logs/<file>           for a log of the Founder's MacBook run
  Source: E3/logs/<file>           for a log of the Founder's Ubuntu run
  Source: E4/<file>                for a file of the Founder's check
  Source: prompt/<file>            for a text in prompt/
  Source: repo/<path>:<first>-<last>   for lines of a file at the head
- The fenced block must appear byte for byte, as contiguous lines, in its source; for repo/ it must equal those lines exactly. Do not shorten, reflow, or mark omissions inside a block; quote fewer lines instead.
- Every mutation and attempt is quoted from the log of its git diff, not retyped.
- Never write code, diffs, output, hashes, names or line numbers you did not copy from a log or a file you read. If you did not check something, say INCONCLUSIVE and why.

HOW TO CLASSIFY EVERY FINDING
Number each finding. Give file and line, the ruling it breaches, a concrete failing input or scenario, the item it belongs to, and one of:
- SUBSTANTIVE: a breach of a ruling, a path outside scope, a value not in its evidence, a required test that cannot fail, or behavior you can show is wrong.
- ADVISORY: an improvement the acts do not require.
- NOT COUNTING: a point Phase 3A plan section 11.3 lists as not counting. Quote the line.
A SUBSTANTIVE finding means FAIL; the Founder rules how it counts. Do not inflate an advisory, and do not downgrade a real defect.

IF THE HARNESS COMPACTS THIS SESSION
Before your next step, run shasum -a 256 prompt/review-prompt-surface-0.1.1-antigravity-r1.md, log it, check it against prompt/SHA256.txt, read this prompt in full again, and continue from the step your logs show you last completed. If the value differs, stop and report. Record each re-read in report section 4.

HOW TO DELIVER
Work through to the end without waiting for guidance. The Founder answers only permission prompts and the question of THE LOAD. Write the complete final report to /Users/michaeldaley/builds/review-surface-0.1.1-r1.md in one pass, then print the same text as your last message, followed by that file's SHA-256 from shasum -a 256.

FINAL REPORT (in this order)
1. Identity and head: reviewer id antigravity, the SHA you reviewed, the SHA in your checkout, harness and model as shown, every active workspace as shown, the host, the folder checks, that you did not author or direct the work, and when you read the commit messages and the description.
2. Verdict: PASS, FAIL or INCONCLUSIVE, then a PASS, FAIL or INCONCLUSIVE line for each of items 1 to 12 with the reason.
3. Findings, each classified as above, or the word none.
4. What you executed, with counts, exit codes, the uptime before each run that starts Bun and each wait, and any re-read of this prompt after a compaction.
5. The mutations and attempts, each with its result.
6. The checks of items 9 and 11: what each script checked, how many values, and every value it could not find.
7. Every log in logs/ and every script in scratch/, by file name and SHA-256.
8. Anything you could not run or verify, and why.
9. Disagreements between this prompt and the acts, or the word none.
