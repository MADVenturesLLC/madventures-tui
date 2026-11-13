STEP: Tier-2 review of Phase 3B slice H2, pull request 238. Paste this as the first message of a new Antigravity session running a Gemini model on the Founder's MacBook, opened on the folder /Users/michaeldaley/builds/review-h2-r1 only. That folder holds the clone you review, the evidence, read-only copies of this prompt and the texts it names, your log and scratch folders, and nothing else you may read.

You are the independent Tier-2 reviewer of Phase 3B slice H2 in MADVenturesLLC/madventures-tui, under DEC-20261108-04 B3 item 3, DEC-20261108-02 B6 and DEC-20261108-01 B8: the Linux capability record of DEC-20261108-04 B5 and C1, the paths of DEC-20261112-03 B3, the builder's breaks, and the evidence against the logs of the build, of the Founder's runs on both certification hosts, and of the Founder's check of the builder's session record. Your verdict at the exact head is H2's Tier-2 verdict, and under DEC-20261108-04 B3 item 4 it counts under rubric milestone 4.

ASSIGNED ROLE
Role-Id: reviewer
Reviewer-Id: antigravity

FIRST, before you read any file: report exactly as your harness shows them the harness name, the model, and every active workspace. Begin every command with cd /Users/michaeldaley/builds/review-h2-r1 && and run it from there. Run pwd and git -C repo rev-parse HEAD that way; they are part of this report. If a field is not shown, say "not shown"; that alone is not a stop. Stop and report only if the harness is not Antigravity, the model is not a Gemini model, pwd does not print /Users/michaeldaley/builds/review-h2-r1, or the HEAD of repo/ is not ea39a3a069191f848dc9f7937985f706a8e91146.
Your harness may attach /Users/michaeldaley or other folders. Read nothing outside /Users/michaeldaley/builds/review-h2-r1. Their AGENTS.md files do not apply; repo/AGENTS.md is part of what you review.
You did not write, plan or direct any part of this work, and this session has seen no material of it before this message. If either is untrue, stop and say so. Do not invent a session id, an actor id or a model id.
Read nothing under ~/.secrets, ~/.ssh, ~/.config, ~/.claude, ~/.claude-madventures-v5, ~/.codex, ~/.codex-governed, ~/.gemini, ~/.hermes or ~/.madmik3-quarantine, no other clone or build folder, no earlier review, and no memory, transcript or notes of any tool. Use no MCP server, start no other agent, make no GitHub call and no network call other than the downloads of bun install, and run no command that prints an environment variable, a token or a key, or lists processes.

WHAT IS IN THE FOLDER
- repo/: the clone, detached at the head ea39a3a069191f848dc9f7937985f706a8e91146, with no remote.
- prompt/: this prompt; the pull request's description as posted, with line endings normalized (pr-238-description.md); the signed texts named in AUTHORITY that are not in repo/ at the head; and SHA256.txt with the SHA-256 of each, and of the manifests of E1 to E4. Check them first and log the result.
- E1/: the builder's files from /Users/michaeldaley/builds/h2-r1: logs/, its numbered logs; pr/, the reports and log manifests of its two halts and its final report, pr-title.txt and pr-body.md; and builder-files.sha256, which the Founder's setup wrote, with the SHA-256 of each. Check builder-files.sha256 against prompt/SHA256.txt, run shasum -a 256 -c on it from E1/, and confirm every file under logs/ and pr/ is listed.
- E2/: the Founder's run at this head on the MacBook under DEC-20261108-04 B9: logs/ and MANIFEST.sha256. Check MANIFEST.sha256 against prompt/SHA256.txt, run shasum -a 256 -c on it from E2/logs, and confirm every file in logs/ is listed.
- E3/: the Founder's run at this head on the Ubuntu PC under DEC-20261108-04 B9, copied by the Founder's setup from that PC: logs/ and MANIFEST.sha256. On Linux it was hashed with sha256sum, whose output shasum -a 256 -c reads. Check it as E2.
- E4/: the Founder's check of the builder's session record, run before the push, as its command saved it: h2-record-check.mjs, selftest.txt, check.txt, the synthetic records of its self-test under selftest-records/, and MANIFEST.sha256. The comment the Founder posted on the pull request quotes check.txt and is not in E4/. You may not read the session records themselves. Check MANIFEST.sha256 against prompt/SHA256.txt, run shasum -a 256 -c on it from E4/, and confirm every other file in E4/ is listed.
- logs/ and scratch/: yours, empty.
If any check fails, stop and report. The Founder's setup confirmed that Verify, Verify (macOS) and code-review succeeded at this head, and that the posted description equals E1/pr/pr-body.md with line endings normalized. That is the Founder's evidence, which you cannot reproduce.

TARGET
Pull request 238, draft, branch build/3b-h2-r1. Head ea39a3a069191f848dc9f7937985f706a8e91146. The binding base is a7251235f94dcc4a3149b638a1acdac69236a26d, the merge of H1 (DEC-20261108-04 B2 and C1). Verify that git -C repo rev-list --reverse a7251235f94dcc4a3149b638a1acdac69236a26d..HEAD lists exactly four commits, that none is a merge, that the first has the parent a7251235f94dcc4a3149b638a1acdac69236a26d, and that git -C repo status is empty, before you read anything else.

AUTHORITY (confirm each SHA-256 and stop if one differs; in repo/ at the head unless named in prompt/)
1. docs/decisions/DEC-20261108-04-phase-3b-standing-commission.md, d373235e424bd7fbe4c1c5b1c5f4954eb1b02165db4e1365d9cfa1533aa93b29: all of it, above all B2, B3, B5, B8, B9, C1 and Part D.
2. docs/decisions/DEC-20261108-04-addendum-1-corrections.md, 90e2f541fd0a232390ca0554067a2de8b37f15c933016eafe40ebde2cd2eff17: all of it.
3. In prompt/, filed on main after the binding base: DEC-20261112-03-h2-record.md, e5198f697c3c5484d778160fc3a38dfa1366e58d9403d792b25a4100e46756b8, H2's act of record and its paths; DEC-20261112-02-model-record.md, 3151cb9e178e918f0c07f5a4eb9931fa9d529debedf0ad4d91f5999844883da7; and these addenda to DEC-20261108-03, which DEC-20261108-04 Addendum 1 B5 and their own texts apply to H2: DEC-20261108-03-addendum-2-codex-harness.md, e04b54065b0f0bb465b2d14e14a39f3b31f9cb34a874f6f8210a7d7e74a8c1c1; DEC-20261108-03-addendum-3-image-tool.md, f2a0ef1063379902935760d9517b68d532cabf6e24699cdebb789681f78ce15e; DEC-20261108-03-addendum-4-sandbox-halt.md, e817470aea6be2c176d4ae75856fd793ef982bd28c9eb793df9c9038a5c1dfbc; DEC-20261108-03-addendum-5-own-work.md, e86e94a62c7067e4656114afe1713c1478814ffe446d1ffcc8b788accfc3ff3d; DEC-20261108-03-addendum-6-names-in-text.md, 24cef0ed5c968aa80ada586e473526d0f4f0b1de1331eba1d5a35051b1254ac9; DEC-20261108-03-addendum-10-second-verdict.md, d90d48718bc4ea6056af6f011f797a78eddcfd14e7111f15f823085c4388bca0; and DEC-20261108-03-addendum-11-governed-build.md, e2d28cbd12485e9025c928403eb7beead9552ee378b023ddf5bc9e18febe00df.
4. In prompt/, signed and not yet filed: DEC-20261112-03-addendum-1-resumed-session.md, 830e3508dcdd8536f11f6549b81ab06224686374b0b785262cccdaad59c96b50, and DEC-20261112-03-addendum-2-gate-repeat.md, 829248f1e2557ddbcfd33d6456f7056bfce73a008791cb88caa9660a5d979d29.
5. In prompt/, the Founder's signed builder prompt and resume messages, which set how the builder worked and what it reported: builder-prompt-h2-codex-macbook.md, ebcbfe9c313d5778721e3c90fe66f78f3faeac1e321419dd7e558969ae4b58be; resume-h2-1-break-restore.md, 4c5e03d21b743769334af175f4e400c9ee2d93bc7ebb2c0a368a5bc73b08b4ed; resume-h2-2-checksum-folder.md, 88c0afdeb42dfb522e7e874c2eb4fc44504ceac5e7da522596d40b2b4b0b3863; resume-h2-3-sandbox.md, b0c536196cc9b2fa47b461de2528f32f60f5e0c46d7674fc95a9f6bc263ed499; and resume-h2-4-gate-repeat.md, 3dc07de560ced2b71bbfbc9c2c1f37ea57e29ab9353dd0a808093001bf073b74.
6. docs/decisions/DEC-20261108-02-phase-3b-builder-qualification.md, 38ec4066f5c9487547befc81e00b80b69126d9140f1e66c0a8dcb35e5fe815ef: B2, B4 and B6.
7. docs/decisions/DEC-20261108-01-phase-3b-approval.md, 319ba65b340696d66a655e21f648fed742a9c38bcbb1d876776abc27a27a9738: B3, B4, B8, B9 and B12.
8. docs/decisions/DEC-20261102-02-hardening-builds.md, 04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550: B4.
9. docs/decisions/DEC-20261023-01-standing-build-rules.md, bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5: Part B.
10. docs/decisions/DEC-20261010-02-linux-host-scope.md, cae5ac6b59618507f6ff3ef0f4d2cd5bca1909f328023248db8d234c4098b5a1: B5; and docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7: B2 and B4, the runtimes of both hosts.
11. The Phase 3B plan, docs/superpowers/plans/2026-09-19-phase-3b-live-tui-integration.md, a48bf5457bf17cf5d554e541c5bb3609efacf6ad170ad6e56950b829a4269ccc: sections 0A, 1, 2, 2A to 2C and 3 H2.
12. The Phase 3A spec, docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md, a6af30015f743740794d89e12cfc2af07433ead70433b739725c2728a89fc69d: sections 1.5 and 2.3, and each section the comments of the record and the store cite; and the Phase 3A plan, docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2: section 11.3.
13. AGENTS.md, 0879ede2d3b07e137d1f3d5f75c131285277b44e61f1305d3d0d59da64f1dbca.
Where this prompt and the acts disagree, the acts win and you report the disagreement.

PACKET (read every item)
1. The texts above.
2. The four commits from a7251235f94dcc4a3149b638a1acdac69236a26d to the head, each with its diff and its message.
3. At the head, with line numbers: the build log, docs/verification/phase-3b-h2-build-log.md, in full; packages/protocol/src/capability-record.ts and packages/storage/src/capability-store.ts in full; both new test files in full; and every file outside DEC-20261112-03 B3 that imports or calls the record or the store, at the binding base and at the head.
4. prompt/pr-238-description.md. It, the commit messages and what the build log says about the work are claims. Review items 1 to 9 from the code, the acts and the logs before you read the description, and state when you read it.

THE FOUNDER'S CHECK OF THE SESSION RECORD
Under DEC-20261108-03 Addenda 2 B4 and 6 B4, as DEC-20261108-04 Addendum 1 B5 applies them to H2, this prompt quotes the output of the Founder's check as the Founder's command ran it before the push. The Founder's setup confirmed that E4/check.txt is this text:

Source: E4/check.txt
```
records whose starting folder is /Users/michaeldaley/builds/h2-r1: 1
rollout-2026-11-12T11-37-48-01a1d09f-6162-7dd1-ad17-ac8ce4e01efe.jsonl: started 2026-11-12T16:37:48.520Z, cli_version 0.167.0, folder /Users/michaeldaley/builds/h2-r1
  user messages: 0
  event types: 10 thread_settings_applied; 285 token_count; 529 item_completed; 6 task_complete; 7 task_started
  turn 2026-11-12T16:38:05.162Z | model gpt-6.1-sol | effort xhigh | approval on-request | approvals reviewer user | sandbox workspace-write | network access false | folder /Users/michaeldaley/builds/h2-r1
  turn 2026-11-12T18:38:06.511Z | model gpt-6.1-sol | effort xhigh | approval on-request | approvals reviewer user | sandbox workspace-write | network access false | folder /Users/michaeldaley/builds/h2-r1
  turn 2026-11-12T19:05:33.065Z | model gpt-6.1-sol | effort xhigh | approval on-request | approvals reviewer user | sandbox workspace-write | network access false | folder /Users/michaeldaley/builds/h2-r1
  turn 2026-11-12T21:56:35.893Z | model gpt-6.1-sol | effort xhigh | approval on-request | approvals reviewer user | sandbox read-only | network access undefined | folder /Users/michaeldaley/builds/h2-r1
    the read-only turn of DEC-20261112-03 Addendum 1 A2; calls in it: 0
  turn 2026-11-12T22:18:32.291Z | model gpt-6.1-sol | effort xhigh | approval on-request | approvals reviewer user | sandbox workspace-write | network access false | folder /Users/michaeldaley/builds/h2-r1
  turn 2026-11-12T23:05:38.552Z | model gpt-6.1-sol | effort xhigh | approval on-request | approvals reviewer user | sandbox workspace-write | network access false | folder /Users/michaeldaley/builds/h2-r1
  turn 2026-11-12T23:40:29.720Z | model gpt-6.1-sol | effort xhigh | approval on-request | approvals reviewer user | sandbox workspace-write | network access false | folder /Users/michaeldaley/builds/h2-r1
  turn 2026-11-13T00:19:58.999Z | model gpt-6.1-sol | effort xhigh | approval on-request | approvals reviewer user | sandbox workspace-write | network access false | folder /Users/michaeldaley/builds/h2-r1
  top-level calls: 2 function_call request_user_input_async; 241 custom_tool_call exec; 3 function_call clock.sleep; 30 function_call wait
  exec calls: 241; names of Addendum 2 B4 placed as text inside exec: 0
  calls inside exec, by called name: 1 q; 1 quote; 137 exec_command; 16 apply_patch; 2 replaceAll; 241 text; 4 allSettled; 92 write_stdin
CHECK_OK
```

The check parses the input of each exec call as JavaScript, passes a name of Addendum 2 B4 only where it lies wholly inside a string, template or regular-expression literal or a comment, and stops on every other occurrence. Before it ran, its self-test of 66 synthetic cases, whose outcomes are in E4/selftest.txt, ended with SELFTEST_OK.

REVIEW ITEMS (PASS only if all pass)
1. Scope and attribution (DEC-20261112-03 B3; the builder prompt's ATTRIBUTION AND COMMITS): exactly the paths that B3 allows change, and no other: preflight, every other caller of the record or the store, the Phase 3A test corpus, bun.lock and every manifest are unchanged; in the two index.ts files only export lines change; four commits, in this order and with these subjects: docs(verification): open the H2 build log with its task detail; feat(protocol): add the Linux capability record; feat(storage): select capability records by host, surface and binary; docs(verification): complete the H2 build log; the first and fourth touch only the build log, the second only the record, its tests and the protocol index.ts, and the third only the store, its tests and the storage index.ts. Each has the author daley40-lab with its no-reply address; each message ends with Role-Id: builder, Actor-Id: session:codex/3b-h2-r1 and Execution-Surface: codex as its final paragraph, with no line after them and no other line that begins with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:; and every line of each message is 72 characters or shorter.
2. The Linux record (DEC-20261108-04 B5; the builder prompt's R1 and R2): whether a Linux record carries, as its host fields, those of B5 and no other, and how each is held; whether any macOS field is filled with a Linux placeholder or any Linux field is required of a macOS record; whether a macOS record keeps exactly the keys, parse and file name it had at the binding base; and whether a mixed record, and a Linux record carrying a macOS host field, are rejected.
3. Freshness (B5; R3; Phase 3A spec section 2.3): whether a Linux record is stale when its operating-system name, operating-system version, kernel release or executable SHA-256 differs; whether the builder prompt's reading, that B5 removes nothing from section 2.3, so that a Linux record is also stale when the executable's version differs or its 30-day horizon has passed, agrees with B5 and the spec or contradicts either; whether a record of one operating system is stale against the observed facts of the other; and whether macOS freshness is unchanged.
4. The store (B5; R4): whether it selects a record per host, surface and executable SHA-256; whether every superseded record is kept and no write overwrites, renames or removes a file; whether a store of macOS records written before H2 reads back the same records, in the same order, under the same file names; and whether any change in what latestFreshRecord returns for a macOS store is stated and tested.
5. The tests B5 requires (B5, its last sentence; R7): that a stale record is refused, that a superseded record is retained, and that a macOS record written before DEC-20261108-04 still validates, the last with a record taken byte for byte from a report at the head that the test names; whether each exists, is named for what it proves, and can fail.
6. No host reading and no branch on the operating system (C1; Phase 3A spec section 1.5; R6): whether either file reads the running host or branches on the running operating system, and whether capability-record.ts stays free of I/O, clock and environment.
7. The act of record (DEC-20261112-03 B1): whether packages/supervisor/src/preflight.ts and packages/supervisor/test/preflight.test.ts are unchanged, and whether the harness's call of preflight is unchanged.
8. The builder's breaks (R7 and its breaks as the first resume message reads them): for each of the four values of R7 a, for R7 b and for R7 c, whether E1/logs/ shows the copy of the file, the break by git diff --no-index, a run of the test file that fails for the reason its test names, and the restore with an equal SHA-256, a silent cmp and an unchanged git status for that path.
9. No live call and no capability record outside a test's temporary directory (C1; DEC-20261010-02 B5; R8): whether any test writes a record anywhere but a temporary directory it creates and removes, or a record that is not synthetic.
10. The evidence against the logs (DEC-20261108-04 B2, B3 item 2, B8 and C1; THE BUILD LOG of the builder prompt): whether the build log's opening was committed before any code change and records main when work began, the branch and the task detail; whether every command, load reading, exit status, count, time and log SHA-256 the build log states is in the E1 log it names; whether every quoted block appears byte for byte in its source; whether every signed text the build log names carries the SHA-256 of prompt/SHA256.txt; and whether the description's results of the last gates match their logs.
11. The gates and the stops (the builder prompt's THE GATES and THE LOAD; DEC-20261112-03 Addenda 1 and 2; the four resume messages): whether the logs show the gates in order, each once, with the first load reading of each test run; the failed run of Addendum 2 A1 and its halt; the logged wait of Addendum 2 B3 before each repeated run, including the waits that ended after 20 minutes; whether any failed run was run again unchanged or any stop went unreported; and whether each halt report in E1/pr/ matches the logs it cites and its manifest.
12. The Founder's runs (DEC-20261108-04 B9; Phase 3B plan section 2B): whether E2's and E3's logs each show the install with any mode restore, bare bun test, and bunx tsc --noEmit with no output, each once, and whether each bare run ends with 0 fail and at least 1945 pass across at least 142 files, the floor of B9 as H2's own tests raise it. This prompt quotes their summary lines, the local full-suite summary lines of Phase 3B plan section 2B:

Source: E2/logs/002-bare-bun-test.log
```
 1945 pass
 0 fail
 24066 expect() calls
Ran 1945 tests across 142 files. [196.61s]
```

Source: E3/logs/002-bare-bun-test.log
```
 1945 pass
 0 fail
 24083 expect() calls
Ran 1945 tests across 142 files. [130.83s]
```

13. The Founder's check (DEC-20261108-03 Addendum 2 B3 and B4, Addendum 6 B1 and B3, Addendum 10 B6; DEC-20261112-02 B2 and B5; DEC-20261112-03 Addendum 1 B2): what E4/check.txt shows against those rulings; whether E4/selftest.txt shows the check passing text that names each name of Addendum 2 B4 and stopping on a call of each, including a top-level call in mcp__codex_tui and a call of a tool of mcp__codex_tui inside exec; whether E4/h2-record-check.mjs does what this prompt says it does; and whether the identity report and the account of tools called in the build log and the description agree with E4/check.txt.
14. The deviations the description lists: assess each against the acts.

THE TEST RUNTIME
/Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. Begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun. Report command -v bun, its SHA-256, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. Install nothing outside repo/.

WHAT YOU MUST EXECUTE (do not substitute reading for these)
- The folder checks above.
- bun install --frozen-lockfile in repo/. Restoring the mode of packages/founder-act/src/main.ts with git checkout is not a finding; any other tracked change is.
- The gates at the head, each once, in the foreground and in this order: the runtime check; bunx tsc --noEmit; bun test packages/protocol; bun test packages/storage; bun test test/phase3a/evidence-pipeline.test.ts; bare bun test; GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git diff --check a7251235f94dcc4a3149b638a1acdac69236a26d HEAD; git diff --name-only a7251235f94dcc4a3149b638a1acdac69236a26d HEAD. Record uptime before each run that starts Bun. Do not rerun a failed gate.
- Deliberate mutations, each in the working tree only: one for each of the four values of item 3's first question; one for the horizon of the reading in item 3; one for the cross-system rule of item 3; one that lets a Linux record carry a macOS host field; one that overwrites or removes a superseded record; and one that rejects a macOS record written before DEC-20261108-04. Where you can, make each differ from the builder's break. Show each by git diff before the run, run the test file that should catch it with no -t filter, report which tests fail and why, then restore it and confirm an empty git status.
- For each of items 2 to 4, one attempt to break what it checks while every test of the two test folders still passes, run and restored as above.
- Your checks of items 10, 11 and 13 as scripts in scratch/, each run through tee into its own log.
A mutation or attempt that does not fail as you expected is a result to report, not a failed command: you may make a new one and run it, and record every run.
Leave repo/ as you found it.

THE LOAD
Before each command that starts Bun, read the one-minute load. If it is 2.0 or more, first run a wait as its own logged command: a loop that prints the time and the one-minute load every 30 seconds and ends at the first reading below 2.0, or after 20 minutes. Start the run only after a reading below 2.0. If 20 minutes pass without one, ask the Founder in one line to quiet the MacBook, and wait again when the Founder answers. If a test fails unexpectedly in a run whose first load average was 2.0 or more, do not rerun it: report it verbatim with that reading and mark the item INCONCLUSIVE, unless you can show the failure does not depend on load.

KNOWN ITEMS ALREADY RULED OR STATED (assess, do not relitigate)
- The builder's stops and halts, at logs 086 and 087, on the read-only sandbox, and at the failed run of Addendum 2 A1, are not verdicts and add no round (DEC-20261112-03 Addendum 1 B5 and Addendum 2 B8).
- The two corrections of the builder prompt by the first and second resume messages, of the break-restore proof and of the folder of the checksum checks, are the Founder's signed messages.
- The read-only turn at 2026-11-12T21:56:35.893Z is accepted for that turn alone, and the check passes it only with no call in it (Addendum 1 B1 and B2).
- The failed run of Addendum 2 A1 is recorded as it is and is not a known failure, and its test is carried to a hardening act (Addendum 2 B1 and B6).
- The reasoning effort of a builder session is recorded, not fixed, and a difference between the model the session reports and the model its record names is recorded and is not a deviation (DEC-20261112-02 B2 item 4 and B4).
- Addendum 1 A1 gives 2026-11-12T16:38:04.887Z as the time the record started, the time its session_meta line was written; the check prints the session's own start, 2026-11-12T16:37:48.520Z. Both are in the record.
- The Founder states that after the fourth resume message was sent, 31 orphaned shells of other projects were found working in /Users/michaeldaley/madv-harness and /Users/michaeldaley/madv-harness-kimi, which the host check of the Founder's command had not found because it matched command lines; that the Founder stopped them after log 212 and before any gate of Addendum 2 B2 ran; and that the act that records H2's merge records that the precondition of Addendum 2 B4 was not met when the message was sent. That is the Founder's evidence, which you cannot reproduce.
- bun install sets the executable bit on packages/founder-act/src/main.ts.
- E2 and E3 were run in plain terminals that are not agent sessions.

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
Before your next step, run shasum -a 256 prompt/review-prompt-h2-antigravity-r1.md, log it, check it against prompt/SHA256.txt, read this prompt in full again, and continue from the step your logs show you last completed. If the value differs, stop and report. Record each re-read in report section 4.

HOW TO DELIVER
Work through to the end without waiting for guidance. The Founder answers only permission prompts and the question of THE LOAD. Write the complete final report to /Users/michaeldaley/builds/review-h2-r1.md in one pass, then print the same text as your last message, followed by that file's SHA-256 from shasum -a 256.

FINAL REPORT (in this order)
1. Identity and head: reviewer id antigravity, the SHA you reviewed, the SHA in your checkout, harness and model as shown, every active workspace as shown, the host, the folder checks, that you did not author or direct the work, and when you read the commit messages and the description.
2. Verdict: PASS, FAIL or INCONCLUSIVE, then a PASS, FAIL or INCONCLUSIVE line for each of items 1 to 14 with the reason.
3. Findings, each classified as above, or the word none.
4. What you executed, with counts, exit codes, the uptime before each run that starts Bun and each wait, and any re-read of this prompt after a compaction.
5. The mutations and attempts, each with its result.
6. The checks of items 10, 11 and 13: what each script checked, how many values, and every value it could not find.
7. Every log in logs/ and every script in scratch/, by file name and SHA-256.
8. Anything you could not run or verify, and why.
9. Disagreements between this prompt and the acts, or the word none.
