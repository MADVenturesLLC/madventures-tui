STEP: Tier-2 review of the madv-surface 0.1.2 build, pull request 3 of MADVenturesLLC/madventures-surface. Paste this as the first message of a new Antigravity session running a Gemini model on the Founder's MacBook, opened on the folder /Users/michaeldaley/builds/review-surface-0.1.2-r1 only. That folder holds the clone you review, the evidence, read-only copies of this prompt and the texts it names, your log and scratch folders, and nothing else you may read.

You are the independent Tier-2 reviewer of the madv-surface 0.1.2 build, under DEC-20261119-03 B5: the changes its B1 allows, with item 9 that its Addendum 2 adds; the gates of its B3; the deliberate breaks of B1 item 5, those the builder made and those the Founder made; and the evidence against the logs of the build, of the Founder's runs on both certification hosts under its B4, of the Founder's breaks, and of the Founder's check of the builder's session record. Under B5 only a posted PASS at the exact head lets the pull request be marked ready; a FAIL, or any SUBSTANTIVE finding, returns to the Founder for a ruling. This review is not a Phase 3B slice verdict: it counts under no rubric milestone and adds no round.

ASSIGNED ROLE
Role-Id: reviewer
Reviewer-Id: antigravity

FIRST, before you read any file: report exactly as your harness shows them the harness name, the model, and every active workspace. Begin every command with cd /Users/michaeldaley/builds/review-surface-0.1.2-r1 && and run it from there. Run pwd and git -C repo rev-parse HEAD that way; they are part of this report. If a field is not shown, say "not shown"; that alone is not a stop. Stop and report only if the harness is not Antigravity, the model is not a Gemini model, pwd does not print /Users/michaeldaley/builds/review-surface-0.1.2-r1, or the HEAD of repo/ is not 341eb058f537c887aa599f5051e0437f57bcc6bf.
Your harness may attach /Users/michaeldaley or other folders. Read nothing outside /Users/michaeldaley/builds/review-surface-0.1.2-r1, and follow no AGENTS.md or rules file outside it.
You did not write, plan or direct any part of this work, and this session has seen no material of it before this message. If either is untrue, stop and say so. Do not invent a session id, an actor id or a model id.
Read nothing under ~/.secrets, ~/.ssh, ~/.config, ~/.claude, ~/.claude-madventures-v5, ~/.codex, ~/.codex-governed, ~/.gemini, ~/.hermes or ~/.madmik3-quarantine, no other clone or build folder, no earlier review, and no memory, transcript or notes of any tool. Use no MCP server, start no other agent, make no GitHub call and no network call other than the downloads of bun install, make no real provider call and use no provider key, and run no command that prints an environment variable, a token or a key, or lists processes.

WHAT IS IN THE FOLDER
- repo/: the clone of MADVenturesLLC/madventures-surface, detached at the head 341eb058f537c887aa599f5051e0437f57bcc6bf, with no remote.
- prompt/: this prompt; the pull request's description as posted, with line endings normalized (pr-3-description.md); the signed texts named in AUTHORITY; and SHA256.txt with the SHA-256 of each, and of the manifests of E1 to E5. Check them first and log the result.
- E1/: the builder's files from /Users/michaeldaley/builds/surface-0.1.2-r1: logs/, its numbered logs, with its cumulative manifest, log 420; pr/, the pull request's title and description and the builder's final report; and builder-files.sha256, which the Founder's setup wrote, with the SHA-256 of each. Check builder-files.sha256 against prompt/SHA256.txt, run shasum -a 256 -c on it from E1/, and confirm every file under logs/ and pr/ is listed.
- E2/: the Founder's run at this head on the MacBook under DEC-20261119-03 B4: logs/ and MANIFEST.sha256. Check MANIFEST.sha256 against prompt/SHA256.txt, run shasum -a 256 -c on it from E2/logs, and confirm every file in logs/ that ends in .log is listed.
- E3/: the Founder's run at this head on the Ubuntu PC under B4, copied by the Founder's setup from that PC: logs/ and MANIFEST.sha256. On Linux it was hashed with sha256sum, whose output shasum -a 256 -c reads. Check it as E2.
- E4/: the Founder's check of the builder's session record, run before the push, as its command saved it: h2-record-check.mjs, selftest.txt, check.txt, b4-count.mjs, b4.txt, the synthetic records of the self-test under selftest-records/, and MANIFEST.sha256; and pr-comment-record.md and pr-comment-breaks.md, what the Founder posted on the pull request, written after the manifest. You may not read the session record itself. Check MANIFEST.sha256 against prompt/SHA256.txt, run shasum -a 256 -c on it from E4/, and confirm every other file in E4/ except the two pr-comment files is listed.
- E5/: the Founder's breaks at this head, made before the push in the working tree of a fresh clone: logs/, which holds 00-install.log, a .log and a .xml for each of the six breaks, and MANIFEST.sha256. Check MANIFEST.sha256 against prompt/SHA256.txt, run shasum -a 256 -c on it from E5/logs, and confirm every other file in logs/ is listed.
- logs/ and scratch/: yours, empty.
If any check fails, stop and report. The Founder's setup confirmed that the posted description equals E1/pr/pr-body.md with line endings normalized. madventures-surface has no CI; there are no GitHub checks to rely on.

TARGET
Pull request 3 of MADVenturesLLC/madventures-surface, draft, branch build/v0.1.2. Head 341eb058f537c887aa599f5051e0437f57bcc6bf. The base is 91bfb38549bcab37740d2c4564c371ee390a63e7, main of that repository, the release commit of madv-surface 0.1.1, tagged v0.1.1 (DEC-20261119-03 A2 and B1). Verify that git -C repo rev-list --reverse 91bfb38549bcab37740d2c4564c371ee390a63e7..HEAD lists exactly seven commits, that none is a merge, that the first has the parent 91bfb38549bcab37740d2c4564c371ee390a63e7, and that git -C repo status is empty, before you read anything else.

AUTHORITY (all in prompt/; confirm each SHA-256 and stop if one differs)
1. DEC-20261119-03-madv-surface-0.1.2-release.md, 6823c07f50567a62abee020de693e192cc43ff47a75871e5bfad5bd16e671d9b: all of it, above all A2 to A5, B1 to B5, B8, B10 and Part D. With it, its two addenda, which the Founder signed during the build and which take effect on signature and are filed with the act of its B9: DEC-20261119-03-addendum-1-load-wait.md, 82340832ae8b482000536a40549f9ba84cc13e9b4434798188590092faaaf962, the wait at 3.0; and DEC-20261119-03-addendum-2-ip-servername.md, 32b83de9c7bc3a8a515b3fc4b22082ff8f042937a13e9ce404500d7027d07bbe, which adds B1 item 9, one change to src/http.ts, and its tests and breaks. And pr249-merge-authorization.md, 0f3b53bcbd0a578de7c8400f9d573c8ce7b6cdf48ed403ae435a41388c2086c1, whose item 3 rules how the last sentence of B1 reads.
2. The Founder's signed builder prompt and five resume messages, which set how the builder worked and what it reported: builder-prompt-surface-0.1.2-codex-macbook.md, d8dfe09baa4b51f189d519a0e2814413e6693c84a603f300ef39859c8b90ad0a; resume-surface-0.1.2-1-baseline-rule.md, 5da9c2bf456145e42704ef1acaf2e07149a99843c8d034747cc967de8a0da938; resume-surface-0.1.2-2-breaks.md, 70568ec5bb19d1196971a71d45cc8513f8d4a37ceb4c2e32e6e4873b04d6709c; resume-surface-0.1.2-3-log-inventory.md, 418936c016ef1e55da3369601f0ecd688a80a1f5a662246ab093a7d4812a9bff; resume-surface-0.1.2-4-load-wait.md, d2d1b442ee23b7ed45b37881e3da9a3054674cfd6750e8ea2400273e0d09c0d8; and resume-surface-0.1.2-5-ip-servername.md, ef566fa3b5a5d87df80702984e75a11908c2702eb2bba65db2c97016c16f6d99.
3. DEC-20261115-01-madv-surface-0.1.1-records.md, 5bf1d2353fa44fd4c346ce0207286eaba0726e42fb4314af4c2fb2aa5fe5ccd6: A6 item 3, the three attempts that kept every test of 0.1.1 passing; A7; and B4, the three items it carries to this release.
4. DEC-20261114-01-madv-surface-release.md, 6bffc2c18927b90f4b5042f312947e5d39853ca53404a58a51b4602eb45652b8: B2, which DEC-20261119-03 B2 applies to the builder.
5. DEC-20261112-02-model-record.md, 3151cb9e178e918f0c07f5a4eb9931fa9d529debedf0ad4d91f5999844883da7, and these addenda to DEC-20261108-03, which DEC-20261119-03 B2 applies: DEC-20261108-03-addendum-2-codex-harness.md, e04b54065b0f0bb465b2d14e14a39f3b31f9cb34a874f6f8210a7d7e74a8c1c1; DEC-20261108-03-addendum-3-image-tool.md, f2a0ef1063379902935760d9517b68d532cabf6e24699cdebb789681f78ce15e; DEC-20261108-03-addendum-4-sandbox-halt.md, e817470aea6be2c176d4ae75856fd793ef982bd28c9eb793df9c9038a5c1dfbc; DEC-20261108-03-addendum-5-own-work.md, e86e94a62c7067e4656114afe1713c1478814ffe446d1ffcc8b788accfc3ff3d; DEC-20261108-03-addendum-6-names-in-text.md, 24cef0ed5c968aa80ada586e473526d0f4f0b1de1331eba1d5a35051b1254ac9; DEC-20261108-03-addendum-10-second-verdict.md, d90d48718bc4ea6056af6f011f797a78eddcfd14e7111f15f823085c4388bca0; and DEC-20261108-03-addendum-11-governed-build.md, e2d28cbd12485e9025c928403eb7beead9552ee378b023ddf5bc9e18febe00df. And DEC-20261115-02-addendum-3-phase-1-record-check.md, 24f76dbb631d6058e81ccff93d3c9fecb11521b5a876c687ec0da1ee0f9e0a23: B4, the rule against running code from a string, which the builder prompt applied.
6. DEC-20261112-03-addendum-2-gate-repeat.md, 829248f1e2557ddbcfd33d6456f7056bfce73a008791cb88caa9660a5d979d29: B3, the logged wait.
7. DEC-20261113-01-h2-records-and-merge.md, 41e27eafc24a2eef238c080d1374b90fbe22d609f4ef5cbb66e07cccb5b347a5: B10, the marking of gaps in quoted blocks.
8. DEC-20261108-02-phase-3b-builder-qualification.md, 38ec4066f5c9487547befc81e00b80b69126d9140f1e66c0a8dcb35e5fe815ef: B2, B4 and B6.
9. DEC-20261102-02-hardening-builds.md, 04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550: B4.
10. DEC-20261023-01-standing-build-rules.md, bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5: Part B.
11. The runtimes of both hosts: DEC-20261013-03-tests-4-6-ruling.md, 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7, B2 and B4; DEC-20261104-02-hardening-f-and-task58.md, 011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5, B7 item 1; and DEC-20261117-01-linux-runtime-after-pr40304.md, 252afc6bf85fb92a43e9b33cbbf718103a3c6060bdd04ffab9e2885b43d8c721, B2.
12. As DEC-20261119-03 cites them: the Phase 3B design, 2026-09-19-phase-3b-live-tui-integration-design.md, da8f4c8c35f617898368b340d710188686c9dc9faf2b23c4a6b284c1bb4d93fc, sections 1.2 and 2.6 item 3; the Phase 3B plan, 2026-09-19-phase-3b-live-tui-integration.md, a48bf5457bf17cf5d554e541c5bb3609efacf6ad170ad6e56950b829a4269ccc, sections 2C, 3 M1 and 6; and the Phase 3A plan, 2026-08-12-phase-3a-runtime-foundation.md, 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2, section 11.3.
Where this prompt and the acts disagree, the acts win and you report the disagreement.

PACKET (read every item)
1. The texts above.
2. The seven commits from 91bfb38549bcab37740d2c4564c371ee390a63e7 to the head, each with its diff and its message.
3. At the head, with line numbers: the build log, docs/build-log-0.1.2.md, in full; src/agent.ts, src/cli.ts, src/domain.ts, src/http.ts, src/tools.ts and src/redact.ts in full; the two new test files in full; test/tls.test.ts and test/local-redaction-order.test.ts in full; the three wire adapters under src/wire/; and every other file that the diff changes.
4. prompt/pr-3-description.md. It, the commit messages and what the build log says about the work are claims. Review items 1 to 10 from the code, the acts and the logs before you read the description, and state when you read it.

THE FOUNDER'S CHECK OF THE SESSION RECORD
Under DEC-20261108-03 Addenda 2 B4 and 6 B4, as DEC-20261119-03 B2 applies them, this prompt quotes the output of the Founder's check as the Founder's command ran it before the push. The Founder's setup confirmed that E4/check.txt and E4/b4.txt are these texts:

Source: E4/check.txt
```
records whose starting folder is /Users/michaeldaley/builds/surface-0.1.2-r1: 1
rollout-2026-11-20T06-51-03-01a1f8cb-ba49-75f0-8eef-97ecc7166f8d.jsonl: started 2026-11-20T11:51:03.508Z, cli_version 0.167.0, folder /Users/michaeldaley/builds/surface-0.1.2-r1
  user messages: 0
  event types: 233 token_count; 444 item_completed; 7 task_complete; 7 task_started; 7 thread_settings_applied
  turn 2026-11-20T11:56:09.574Z | model gpt-6.2-astra | effort xhigh | approval on-request | approvals reviewer user | sandbox workspace-write | network access false | folder /Users/michaeldaley/builds/surface-0.1.2-r1
  turn 2026-11-20T12:21:24.577Z | model gpt-6.2-astra | effort xhigh | approval on-request | approvals reviewer user | sandbox workspace-write | network access false | folder /Users/michaeldaley/builds/surface-0.1.2-r1
  turn 2026-11-20T12:50:59.327Z | model gpt-6.2-astra | effort xhigh | approval on-request | approvals reviewer user | sandbox workspace-write | network access false | folder /Users/michaeldaley/builds/surface-0.1.2-r1
  turn 2026-11-20T13:09:08.233Z | model gpt-6.2-astra | effort xhigh | approval on-request | approvals reviewer user | sandbox workspace-write | network access false | folder /Users/michaeldaley/builds/surface-0.1.2-r1
  turn 2026-11-20T20:23:13.777Z | model gpt-6.2-astra | effort xhigh | approval on-request | approvals reviewer user | sandbox workspace-write | network access false | folder /Users/michaeldaley/builds/surface-0.1.2-r1
  turn 2026-11-20T22:30:34.081Z | model gpt-6.2-astra | effort xhigh | approval on-request | approvals reviewer user | sandbox workspace-write | network access false | folder /Users/michaeldaley/builds/surface-0.1.2-r1
  turn 2026-11-20T22:48:00.283Z | model gpt-6.2-astra | effort xhigh | approval on-request | approvals reviewer user | sandbox workspace-write | network access false | folder /Users/michaeldaley/builds/surface-0.1.2-r1
  top-level calls: 1 function_call request_user_input_async; 144 custom_tool_call exec; 2 function_call clock.sleep; 78 function_call wait
  exec calls: 144; names of Addendum 2 B4 placed as text inside exec: 0
  calls inside exec, by called name: 1 endsWith; 1 every; 1 replace; 10 startsWith; 11 slice; 12 filter; 174 exec_command; 18 join; 18 shell; 19 split; 2 runtime; 2 tls; 2 wt; 210 text; 3 entries; 30 write_stdin; 4 noToolsRun; 4 runFile; 4 some; 46 includes; 5 test; 53 exit; 6 allSettled; 7 map; 7 tlsRun
CHECK_OK
```

Source: E4/b4.txt
```
records: 1
record: rollout-2026-11-20T06-51-03-01a1f8cb-ba49-75f0-8eef-97ecc7166f8d.jsonl
exec inputs: 144; not parsed: 0; occurrences of the six names, as any substring, in all of them: 0; calls of eval 0, Function 0, load 0, store 0; calls through a computed callee 0
B4_OK
```

The check parses the input of each exec call as JavaScript, passes a name of Addendum 2 B4 only where it lies wholly inside a string, template or regular-expression literal or a comment, and stops on every other occurrence. Before it ran, its self-test of 66 synthetic cases, whose outcomes are in E4/selftest.txt, ended with SELFTEST_OK. It is the check the Founder signed for H2 and used for 0.1.1; its one case specific to H2, a read-only turn in another record, does not apply to this folder. The count of b4-count.mjs parses each exec input in the same way and counts the calls of eval, Function, load and store and the occurrences of the six names of Addendum 2 B4 as any substring, for DEC-20261115-02 Addendum 3 B4.

REVIEW ITEMS (PASS only if all pass)
1. Scope and attribution (DEC-20261119-03 B1, with item 9 of Addendum 2 B1, and Part D; pr249-merge-authorization.md item 3; the builder prompt's ATTRIBUTION AND COMMITS and HALTS, with Addendum 2 B4): whether exactly these sixteen paths change, and no other: docs/build-log-0.1.2.md, test/embedded-claude-ids.test.ts, test/fixtures/tls/loopback-ip.key, test/fixtures/tls/loopback-ip.pem and test/no-tools.test.ts, added; README.md, docs/registration-proposal.md, package.json, src/agent.ts, src/cli.ts, src/domain.ts, src/http.ts, test/fixtures/tls/README.md, test/local-redaction-order.test.ts, test/new-profiles.test.ts and test/tls.test.ts, modified. Whether bun.lock, src/tools.ts and every other file under src/, test/helpers.ts, test/mock-server.ts, every other existing file under test/fixtures/, and every file under docs/samples/ are unchanged, and in package.json only the version changes. Whether no dependency, profile, family table, model id, endpoint or exit code changes, and no event type is added and no field is added to any event, the input field no_tools being authorized by B1 item 2 as item 3 of the merge authorization reads it. Whether src/http.ts changes only as Addendum 2 B1 allows. Seven commits, in this order and with these subjects: docs: open the 0.1.2 build log with its task detail; test: catch a cut before redaction past the cap; fix(domain): refuse every model id that contains claude; test(tls): verify a second host name, so a fixed name fails; feat: offer the model no tools with --no-tools or a first no_tools; chore(release): version 0.1.2; docs: complete the 0.1.2 build log; each touching only the paths the builder prompt names for it, with src/http.ts in the fourth as Addendum 2 B4 rules. Each has the author daley40-lab with its no-reply address; each message ends with Role-Id: builder, Actor-Id: session:codex/surface-0.1.2-r1 and Execution-Surface: codex as its final paragraph, with no line after them and no other line that begins with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:; and every line of each message is 72 characters or shorter.
2. The redaction-order margin (B1 item 5; A4; DEC-20261115-01 A6 item 3 and B4 item 1): whether each new test places a fresh key across its tool's cap so that the key runs past the cap by at least 256 characters; whether it asserts that no substring of 8 or more characters of the key appears in the local view, at a point no later cap can hide from it what it checks; whether each fails when that tool's local view is cut before redaction at the cap plus 25 and at the cap plus 255 characters while the tests of 0.1.1 still pass, as E5 shows; and whether production code is unchanged by this item.
3. The Anthropic rule (B1 item 4; A4; DEC-20261115-01 A7 and B4 item 2): whether every model id that contains claude anywhere, in any case, is recognized as Anthropic on every profile and refused with reason anthropic_model wherever the rule applies; whether every id the base's rule matches is still matched; whether the new rule matches any id that an existing test, a family table or a profile's default model expects a profile to accept; whether the showing of how the base treated each chosen id is in its log; and whether break 3 in E1 fails the new tests while the tests of test/claude-ids.test.ts still pass.
4. The second verified host name (B1 items 5 and 9; Addendum 2 B1 to B3 and B5; DEC-20261115-01 B4 item 3): whether src/http.ts sets servername only when the endpoint's host is not an IP address and changes nothing else; whether a request to a DNS name is made exactly as at the base; whether the test of Addendum 2 B2 item 1 completes a reviewer turn at 127.0.0.1 with every model_response carrying 127.0.0.1 as tls_verified_host, and the test of its item 2 is refused as its refusal tests are; whether each fails at the base, as E1 records; whether break 4 in E1 and break 8 in E5 each fail their test; whether test/fixtures/tls/loopback-ip.pem is signed by the test certificate authority of that folder and names the addresses the build log states; and whether the IPv6 result of log 263 is recorded as Addendum 2 B5 requires.
5. The tool-free run and first message (B1 items 1 to 3; A3; item 3 of the merge authorization): whether under --no-tools every provider request of the run, on each of the three wire adapters, offers no tools, system/init names an empty list, and the system prompt says that no tools are available and the model answers in text; whether it is valid with either role, a usage error with exit 2 alongside --allow-shell, and listed by --help; whether a first accepted user message with no_tools true is sent with no tools and the system prompt of item 1, and later messages as the run's flags make them; whether a later no_tools true and a no_tools that is neither true nor false are not run and emit system/input_ignored with reasons no_tools_not_first and invalid_no_tools; whether a tool call answered to a request that offered no tools runs no tool and ends with provider_error, code unexpected_tool_call, a result with is_error true and exit 1; whether the wire adapters are unchanged; and whether breaks 5 and 6 in E1 and break 7 in E5 each fail the tests of their behavior.
6. The version and the documents (B1 items 6 and 7): whether package.json, README.md, docs/registration-proposal.md and the User-Agent test name 0.1.2 and nothing else of those lines changed; whether README.md describes items 1 to 4 as the code and tests now behave; whether docs/registration-proposal.md describes --no-tools and the field no_tools and proposes nothing more about the registration; and whether docs/samples/README.md says the unchanged sample streams were recorded with 0.1.0.
7. The breaks (B1 item 5; B8; the builder prompt's THE WORK; resume message 2 item 4; Addendum 2 B3): for each of breaks 3 to 6 in E1/logs/ and each of the six Founder breaks in E5/logs/, whether its log shows the break by diff, a run of the file that holds its test, alone, that fails for the reason its test names, the results of the other tests in that file, and the restore with a SHA-256 equal to the committed file's and an empty git status; and whether each break is the one the act, the builder prompt or Addendum 2 B3 describes.
8. The gates and the load (B3; B2 with DEC-20261112-03 Addendum 2 B3 as Addendum 1 B1 sets it, and DEC-20261102-02 B4 as DEC-20261108-03 Addendum 5 reads it; the builder prompt's THE GATES and THE LOAD): whether the logs show each gate of B3 once, in order, at the seventh commit; a logged wait before each command that runs tests, below 2.0 before the fourth resume message and below 3.0 from it, with the reading at which it ended; the comparison of the head's test list with the base's, with 0 fail and no test skipped or marked todo; whether any failed run was run again unchanged; and whether any stop went unreported.
9. No live call and no key (B8; Part D): whether any test or command of the build or of the Founder's runs and breaks made a real provider call, used a real key, or sent a request off the host other than the downloads of bun install --frozen-lockfile.
10. The evidence against the logs (B1 item 8; the builder prompt's THE BUILD LOG and TEST OUTPUT; DEC-20261113-01 B10): whether the build log's opening was committed before any change of code or tests; whether every command, load reading, exit status, count, time and log SHA-256 the build log and the description state is in the E1 log they name; whether every quoted block appears byte for byte in its source, and marks each gap where it joins lines from different parts of a log; and whether every signed text the build log names carries the SHA-256 of prompt/SHA256.txt.
11. The Founder's runs (B4): whether E2's and E3's logs each show bun install --frozen-lockfile, bun run typecheck with no output other than the line Bun echoes, bun test --timeout 20000 and bun run build, each once, with the host's Bun of A5; whether each test run ends with 0 fail; whether dist/madv-surface --version prints exactly madv-surface 0.1.2 and --help lists --no-tools; and the binary's SHA-256 and size each records. This prompt quotes their summary lines:

Source: E2/logs/003-test.log
```
 142 pass
 0 fail
 2285 expect() calls
Ran 142 tests across 25 files. [12.69s]
```

Source: E3/logs/003-test.log
```
 142 pass
 0 fail
 2278 expect() calls
Ran 142 tests across 25 files. [8.31s]
```

12. The Founder's check (DEC-20261108-03 Addendum 2 B3 and B4, Addendum 6 B1 and B3, Addendum 10 B6; DEC-20261112-02 B2 and B5; DEC-20261115-02 Addendum 3 B4): what E4/check.txt and E4/b4.txt show against those rulings; whether E4/selftest.txt shows the check passing text that names each name of Addendum 2 B4 and stopping on a call of each; whether E4/h2-record-check.mjs and E4/b4-count.mjs do what this prompt says they do; and whether the identity report and the account of tools called in the build log and the description agree with E4/check.txt.
13. The halts and deviations the description lists: assess each against the acts, the two addenda and the resume messages.

THE TEST RUNTIME
/Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. Begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun or /Users/michaeldaley/bun-displaced-1.4.4. Report command -v bun, its SHA-256, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. Install nothing outside repo/.

WHAT YOU MUST EXECUTE (do not substitute reading for these)
- The folder checks above.
- bun install --frozen-lockfile in repo/. Any tracked change it makes is a finding.
- The gates of B3 at the head, each once, in the foreground and in this order: the runtime check; bun run typecheck; bun test --timeout 20000; bun run build, then ./dist/madv-surface --version and ./dist/madv-surface --help; bun run build:test; GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git diff --check 91bfb38549bcab37740d2c4564c371ee390a63e7 HEAD; git diff --name-only 91bfb38549bcab37740d2c4564c371ee390a63e7 HEAD. Record uptime before each run that starts Bun. Do not rerun a failed gate.
- Deliberate mutations, each in the working tree only and each different from the breaks of E1 and E5: one that cuts text before redaction inside the shared helper that both read_file and list_dir use, rather than at a call site; one that puts back the base's Anthropic rule; one that makes the new rule match claude only in lower case; one that sets servername to the endpoint's host again for every host; one that accepts any certificate for an IP-address host by ignoring the error of tls.checkServerIdentity, rather than by not calling it; one that removes the lookup in src/http.ts that gives a response on a reused connection the host its socket's handshake verified; one that runs a later user message with no_tools true instead of ignoring it; one that treats a no_tools that is neither true nor false as false; and one that drops the sentence of the system prompt that says no tools are available. Show each by git diff before the run, run the test file that should catch it with no -t filter, report which tests fail and why, then restore it and confirm an empty git status.
- For each of items 2 to 5, one attempt to break what it checks while every test of the files it names still passes, run and restored as above. For item 5, one such attempt is to offer the role's tools on every request after the first of a message under --no-tools.
- Your checks of items 10 and 12 as scripts in scratch/, each run through tee into its own log.
A mutation or attempt that does not fail as you expected is a result to report, not a failed command: you may make a new one and run it, and record every run.
Leave repo/ as you found it.

THE LOAD
Before each command that starts Bun, read and log the one-minute load. If it is 3.0 or more, first run a wait as its own logged command: a loop that prints the time and the one-minute load every 30 seconds and ends at the first reading below 3.0, or after 20 minutes. Start the run only after a reading below 3.0. If 20 minutes pass without one, ask the Founder in one line to quiet the MacBook, and wait again when the Founder answers. If a test fails unexpectedly in a run whose first load average was 2.0 or more, do not rerun it: report it verbatim with that reading and mark the item INCONCLUSIVE, unless you can show the failure does not depend on load.

KNOWN ITEMS ALREADY RULED OR STATED (assess, do not relitigate)
- The build halted three times before its first commit, on the stop rule of the baseline, on the breaks, and on a log inventory, and twice asked the Founder to quiet the MacBook; at S3 it halted because the second name could not be verified without a change to src/http.ts. Each halt is not a verdict and adds no round; the resume messages and the addenda rule on each.
- Under resume message 1, any failure at the baseline was a stop. Under resume message 2 item 5 the baseline stands, though its test run began at a load of 2.52 after its wait read 1.81. Under Addendum 1, from the fourth resume message the builder's waits ended below 3.0.
- The builder declined breaks 1 and 2, at the cap plus 25 and plus 255 characters, break 7, and break 8. Under resume message 2 item 4 and Addendum 2 B3 the Founder made them at this head before the push; E5 is their evidence and the second comment on the pull request quotes it.
- The tool functions.send_message_to_user_async that the builder's harness showed was reported and never called (resume message 1 item 4). The warning the governed build's --version printed under the sandbox, that it could not create PATH aliases, is recorded and is not a stop.
- The host's /usr/bin/openssl does not accept -ext; the builder's reading of subject alternative names with -text is accepted (resume message 2 item 5). The exec input that the builder reported as failing with a syntax error is recorded and is not a stop; the Founder's count found no exec input that does not parse.
- The reasoning effort of a builder session is recorded, not fixed, and a difference between the model the session reports and the model its record names is recorded and is not a deviation (DEC-20261112-02 B2 item 4 and B4). The record names gpt-6.2-astra; the 0.1.1 record named gpt-6.1-sol.
- Addendum 2 B5 carries the IPv6 loopback endpoint, written in brackets in a URL, to the next act that changes madv-surface; this build adds no test of it.
- The dist/madv-surface binaries of the builder's gates and of E2 and E3 are not the release builds; under B7 those are built from the tag after the merge. B4 sets no load rule for the Founder's runs; the Founder's command waited for a reading below 3.0. The difference of seven expect() calls between E2 and E3 was also there in 0.1.1, at 2153 and 2146.
- E2, E3 and E5 were run in plain terminals that are not agent sessions. That is the Founder's evidence, which you cannot reproduce.

HOW TO QUOTE (the Founder's script checks every quote; a report that breaks these rules is not posted and is not a verdict)
- Put every quoted text in a fenced block, and put on the line directly above the opening fence exactly one source line, in one of these forms:
  Source: logs/<file>              for your own log
  Source: scratch/<file>           for your own script
  Source: E1/<path>                for a builder file
  Source: E2/logs/<file>           for a log of the Founder's MacBook run
  Source: E3/logs/<file>           for a log of the Founder's Ubuntu run
  Source: E4/<file>                for a file of the Founder's check
  Source: E5/logs/<file>           for a log of the Founder's breaks
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
Before your next step, run shasum -a 256 prompt/review-prompt-surface-0.1.2-antigravity-r1.md, log it, check it against prompt/SHA256.txt, read this prompt in full again, and continue from the step your logs show you last completed. If the value differs, stop and report. Record each re-read in report section 4.

HOW TO DELIVER
Work through to the end without waiting for guidance. The Founder answers only permission prompts and the question of THE LOAD. Write the complete final report to /Users/michaeldaley/builds/review-surface-0.1.2-r1.md in one pass, then print the same text as your last message, followed by that file's SHA-256 from shasum -a 256.

FINAL REPORT (in this order)
1. Identity and head: reviewer id antigravity, the SHA you reviewed, the SHA in your checkout, harness and model as shown, every active workspace as shown, the host, the folder checks, that you did not author or direct the work, and when you read the commit messages and the description.
2. Verdict: PASS, FAIL or INCONCLUSIVE, then a PASS, FAIL or INCONCLUSIVE line for each of items 1 to 13 with the reason.
3. Findings, each classified as above, or the word none.
4. What you executed, with counts, exit codes, the uptime before each run that starts Bun and each wait, and any re-read of this prompt after a compaction.
5. The mutations and attempts, each with its result.
6. The checks of items 10 and 12: what each script checked, how many values, and every value it could not find.
7. Every log in logs/ and every script in scratch/, by file name and SHA-256.
8. Anything you could not run or verify, and why.
9. Disagreements between this prompt and the acts, or the word none.
