FOUNDER-ACT-20261121-MADV-SURFACE-0.1.2-RECORDS: madv-surface 0.1.2 recorded: its build, my runs, its review, its release commit and its release builds, with the two addenda of its act filed

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`, recording work in `MADVenturesLLC/madventures-surface`
> **`origin/main` when drafted:** `9f05d56292253e36f0759cd25763b28e40befa08` (the merge of pull request 243)
> **Governs:** `DEC-20261119-03` B9; the filing of Addenda 1 and 2 of `DEC-20261119-03`; `docs/verification/2026-11-21-madv-surface-0.1.2-release.md`; `docs/verification/phase-3a-correction-rounds.md`
> **Read with:** `DEC-20261119-03` and its Addenda 1 and 2; `DEC-20261115-01` B4, B5, B7 and B9; `DEC-20261115-02` Addendum 7 B4; `DEC-20261119-01` B9 and B11; `DEC-20261112-02` B2; `DEC-20261108-02` B4; `DEC-20261108-03` Addenda 2 to 6, 10 and 11; `DEC-20261102-02` B4; `DEC-20261023-01` Part B; `DEC-20261031-01`; Phase 3A plan §11.3; Phase 3B plan, provenance, and §2C

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What earlier texts leave to this act.** `DEC-20261119-03` B9 has an act of mine, after the release builds, record the build, my runs, the review, the release commit and the two release builds with their SHA-256 values, file that act's evidence in `docs/verification/` as a sanitized packet, and enter the review in the correction-round log under no rubric milestone; the act of `DEC-20261115-02` Addendum 7 B4 cites that act. Its Addendum 1 B4 and Addendum 2 B7 say that each is filed unchanged with that act, and its Addendum 2 B5 carries the IPv6 loopback endpoint to the next act that changes madv-surface. Item 3 of my merge authorization of pull request 3 leaves to that act the review's two findings, its attempts, the disagreement of its section 9 and the IPv6 endpoint. This is that act. The packet of B10 sets out the values of A3 to A10 in full.

A2. **The texts filed.** Each is at the transfer branch `claude/awesome-cray-vqrzbt` of `MADVenturesLLC/madventures-tui`, as I signed it on 2026-11-20:
1. `DEC-20261119-03-addendum-1-load-wait.md`, SHA-256 `82340832ae8b482000536a40549f9ba84cc13e9b4434798188590092faaaf962`, 36 lines, 3,912 bytes, transfer commit `d19ed3b3a3fc4f41c338d1c43baf7656deebab97`;
2. `DEC-20261119-03-addendum-2-ip-servername.md`, SHA-256 `32b83de9c7bc3a8a515b3fc4b22082ff8f042937a13e9ce404500d7027d07bbe`, 45 lines, 6,502 bytes, transfer commit `ce5cd1bfa6fa9534de3ec53194b752e92ec3f372`.

A3. **The build.** Governed Codex 0.167.0 on my MacBook built madv-surface 0.1.2 as `DEC-20261119-03` B2 names it: Actor-Id `session:codex/surface-0.1.2-r1`, in `/Users/michaeldaley/builds/surface-0.1.2-r1`, on the branch `build/v0.1.2` from `91bfb38549bcab37740d2c4564c371ee390a63e7`, with the git identity `daley40-lab` and no GitHub call, under the builder prompt I signed, SHA-256 `d8dfe09baa4b51f189d519a0e2814413e6693c84a603f300ef39859c8b90ad0a` (transfer commit `8c46e1a8b6942a5dbfb63fa6c252e1e8da78583b`), five resume messages and the two addenda of A2.
1. **Halts and asks.** The session halted four times and twice asked me to quiet the MacBook:
   - before its baseline, on how far the stop rule for a failing test at the baseline reaches; resume message 1, SHA-256 `5da9c2bf456145e42704ef1acaf2e07149a99843c8d034747cc967de8a0da938` (transfer commit `d9ed03ef124124cc5532fd1b1d31f230e3cd9954`), ruled that any failure at the baseline is a stop (halt manifest, log 025, SHA-256 `790398737a0e79f66dfe90d7acedaab4ef474859f87f541645b9437afcea4a5d`);
   - after its baseline passed, because it declined to make the deliberate breaks that let a fragment of a key reach the local view (breaks 1 and 2) or let a tool run after a request that offered none (break 7), saying that working reproductions of those bypasses exceed what it can provide; resume message 2, SHA-256 `70568ec5bb19d1196971a71d45cc8513f8d4a37ceb4c2e32e6e4873b04d6709c` (transfer commit `62b249675c32fdf669e3cbfe854bfc77ac613c18`), had it record each declined break in one line and left them to me before the push (log 095, SHA-256 `995d16486d53bce7bcef9e32b41a8ef0b15481c82e98c1a72d20d532eeec3c0a`);
   - on the log inventory of resume message 2, which left out logs 001 to 025 and 096; resume message 3, SHA-256 `418936c016ef1e55da3369601f0ecd688a80a1f5a662246ab093a7d4812a9bff` (transfer commit `78e64ccb8c02eafe312e3c9afc30256dc3d8c3fd`), accepted its cumulative manifest, log 114, SHA-256 `2e8367e7471f320c8f6e501956de0591743d01297da3dd45193002f4bc5fa092`;
   - its waits before the tests of S2 (log 162) and of S3 (log 213) each ended after 20 minutes without a reading below 2.0, and each time it asked me to quiet the MacBook; after the second, Addendum 1 set the wait at 3.0, delivered by resume message 4, SHA-256 `d2d1b442ee23b7ed45b37881e3da9a3054674cfd6750e8ea2400273e0d09c0d8` (transfer commit `d19ed3b3a3fc4f41c338d1c43baf7656deebab97`), and applied from wait 236;
   - at S3, because a test endpoint at `127.0.0.1` could not be verified without a change to `src/http.ts`, which set the TLS server name to the endpoint's host even when it was an IP address; Addendum 2 authorized that change, delivered by resume message 5, SHA-256 `ef566fa3b5a5d87df80702984e75a11908c2702eb2bba65db2c97016c16f6d99` (transfer commit `ce5cd1bfa6fa9534de3ec53194b752e92ec3f372`); its halt manifest is log 268, SHA-256 `d836de2c7e5012203c29c4cc2bf8d53deec52108a85fdd65a68e956d61275e57`. A run of the same test at the IPv6 loopback address `::1` ended with `system/provider_error`, code `network_error`, and no HTTP request, for a cause it did not establish (log 263, SHA-256 `d0d113d142a52ac2b616914ed3cad9b6b21dc2757583e5e35c1a8022778bdbac`).
2. **Baseline.** At the base, after a wait whose qualifying reading was 1.81, in a run that began at a load of 2.52: 126 pass and 0 fail across 23 files, 2153 `expect()` calls (log 091, SHA-256 `3847f3545775f9313b1f1df7b88bc3a150c656ca0d7cab2a1a66e403ec7cf7aa`).
3. **The commits.** Seven, from `4c08c622b30b6b82350f306b93ee8e9f50e38fc5` to `341eb058f537c887aa599f5051e0437f57bcc6bf`, changing exactly sixteen paths, those of `DEC-20261119-03` B1 with its item 9, with `bun.lock` unchanged, SHA-256 `122a9146ccb18f973766d9492e20140837931b65fccb76a504888cc9070357cc`. They added:
   - the run flag `--no-tools` and the first-message field `no_tools` of B1 items 1 and 2, in `src/cli.ts` and `src/agent.ts`, and the failure `unexpected_tool_call` of item 3;
   - the Anthropic rule of item 4, `/claude|anthropic/i` at line 19 of `src/domain.ts`;
   - for item 9, a TLS server name only when `isIP` of `node:net` reports that the endpoint's `URL.hostname` is not an IP address, at line 239 of `src/http.ts`;
   - sixteen tests: ten in `test/no-tools.test.ts`; two in `test/embedded-claude-ids.test.ts`, under which `minimax-claude-x`, `qwen-claude`, `vendor_CLAUDE`, `vendor+ClAuDe` and `preclaudepost` are refused as `anthropic_model` on all seven profiles (at the base, 6 of those 35 pairs were accepted under another maker and 29 refused as `unknown_family`); two in `test/local-redaction-order.test.ts`, whose keys run 272 and 275 characters past the cap; and two in `test/tls.test.ts`, a reviewer turn verified at `127.0.0.1` and a refusal there of a certificate that names only `localhost`;
   - the version of item 6, the documents of item 7 and the build log of item 8.
   `docs/samples/README.md`, which item 7 names, is unchanged: it already says that the sample streams were recorded with 0.1.0.
4. **Its breaks.** It made breaks 3 to 6, each failing its target tests while the others passed, and restored each file to its SHA-256. It declined breaks 1, 2, 7 and 8, recording each in one line; I made them (A5).
5. **Its gates.** Every gate of `DEC-20261119-03` B3 passed once at the head, under Bun 1.4.2: after a wait whose qualifying reading was 2.88, 142 pass and 0 fail across 25 files, 2285 `expect()` calls, with all 126 tests of the base present under their files and names and none skipped; and a binary that prints `madv-surface 0.1.2` and lists `--no-tools` in its help, SHA-256 `c9a9d800386a7c418f90d3597701c903914b93d152e9a09bae6f640e993f6725`.
6. **Its files and report.** Its build log, `docs/build-log-0.1.2.md`, has SHA-256 `ca9f9120efb470de1e7dd475328cba8244cda2190865f9c872eed92e6597e018`; its description, 30,158 bytes, `04df97ccdb96c2ada0615fd7d38d756743ad7a169e8c6d088faed7b720210e61`; its title `d1945ffd1e4b7e493636f36a9857fcb3523ef951aa3b8c4e667a0d701bb3bc6c`; its final report `d328abe9ecb73d038f803a6782fc2cae2e4b26fff02efbf8465ada769b8da901`; and its cumulative log manifest, log 420, `0f755c4526e2781fa53a2569c13e1f91f4eca51651c1e62f4dede0f95b74e051`. It reported its harness as Codex and its model as GPT-6 by OpenAI, with the exact model identifier and the reasoning effort not shown. The deviations its description lists, besides the halts and asks of item 1:
   - its first run of the baseline began at a load of 2.52 after a wait that passed at 1.81;
   - it reported `functions.send_message_to_user_async` among its tools and never called it;
   - the sandbox refused a second copy of a log to `/dev/stderr`, and the first was kept and verified;
   - the MacBook's `openssl` has no `-ext` option, and the certificates' names were read from `-text`;
   - one `exec` input had a syntax error before any command in it ran;
   - the tests of S2 moved to a new file, `test/embedded-claude-ids.test.ts`, and `test/claude-ids.test.ts` was restored byte for byte;
   - a commit message line of 259 characters, found by its check at log 143 and corrected before the commit at log 145;
   - an edit of S2 that matched no text at log 159 and was applied at log 160;
   - a typecheck of S4 at log 341 before its commit;
   - working copies prepared in a disposable folder.

A4. **The session record.** My check, `h2-record-check.mjs`, SHA-256 `c1834dcc689e94cf57fb123a09a0600225d8e97b428c648f14276136e3dd383f` (transfer commit `730df3014bf31d2dc0770cb4d30a4a4a79e30afe`), passed its self-test of 66 cases and ended `CHECK_OK` before the push, and my count of code from a string, `b4-count.mjs`, SHA-256 `2dcff5987b35e4a1e7c60e1b9229f32f7ebca58376ea0af0d39ba2b6ef647689`, ended `B4_OK`.
1. It found one record whose starting folder is the build folder: `rollout-2026-11-20T06-51-03-01a1f8cb-ba49-75f0-8eef-97ecc7166f8d.jsonl`, naming `cli_version` `0.167.0`, started at 2026-11-20T11:51:03.508Z.
2. The record has seven turns, from 11:56:09.574Z to 22:48:00.283Z that day. Each names the model `gpt-6.2-astra`, the effort `xhigh`, approval `on-request`, the approvals reviewer `user`, sandbox `workspace-write` with network access off, and the build folder.
3. It holds 144 calls of `exec`, 78 of `wait`, 2 of `clock.sleep` and 1 of `request_user_input_async`, and no name of `DEC-20261108-03` Addendum 2 B4 as text. All 144 `exec` inputs parse, and none holds one of the six names or calls `eval`, `Function`, `load` or `store`, or a computed callee.
4. I posted it on pull request 3 as comment 7054067231. Its evidence folder `/Users/michaeldaley/builds/surface-0.1.2-record-check/final-20261121T002412Z` has a `MANIFEST.sha256` with SHA-256 `f043d41acae8f31e2066949acd00ee91bef1fd6cdf7044aa127549c95564dd15`.

A5. **My breaks.** Before the push, in a fresh clone at the head on my MacBook under Bun 1.4.2, I made each break the builder declined in the working tree only, ran its test file alone, and restored the file, with its SHA-256 equal to the committed one and `git status` clean:
- breaks 1 and 2, cutting the text before redaction at the cap plus 25 and plus 255 characters, for `read_file` and for `list_dir` in `src/tools.ts`: in each of the four runs the long-key test of that tool failed, 3 pass and 1 fail;
- break 7, letting a tool call run after a request that offered no tools, in `src/agent.ts`: both tests of a tool call under no tools failed, 8 pass and 2 fail;
- break 8, skipping the identity check of an IP-address host, in `src/http.ts`: the refusal at `127.0.0.1` of a certificate naming only `localhost` failed, 7 pass and 1 fail.
I posted them as comment 7054067610. Their logs are in `/Users/michaeldaley/builds/surface-0.1.2-founder-breaks/logs`, whose `MANIFEST.sha256` has SHA-256 `116396e0f84a81be8616a950fbb8afafed517616b9b1a9df1994c081e57f54f8`.

A6. **My runs of B4.** On 2026-11-21 my guarded command pushed `build/v0.1.2` at the head and opened pull request 3 of `MADVenturesLLC/madventures-surface` as a draft at 00:24:19Z; madv-surface has no CI. I then ran the head on both certification hosts, from fresh clones in plain terminals, each test run after a load wait that passed:
1. on my MacBook, under Bun 1.4.2, after a wait that passed at 00:43:17Z at 2.93: 142 pass and 0 fail across 25 files, 2285 `expect()` calls; a binary of SHA-256 `c9a9d800386a7c418f90d3597701c903914b93d152e9a09bae6f640e993f6725` and 62,292,978 bytes, the builder's gate binary; log manifest SHA-256 `1c13b9008ace0796cd83eb940f1bb224b036de171a01b430658eb27b9027972b`;
2. on my Ubuntu PC, under the custodied Bun 1.4.1, after a wait that passed at 00:49:04Z at 0.86: 142 pass and 0 fail across 25 files, 2278 `expect()` calls; a binary of SHA-256 `94537feb12c0d3918d25297ea34f6a55dc58e11ccfd7857856770b751bf263b7` and 80,573,976 bytes; log manifest SHA-256 `4dee92355fea747de241c6d58eaaede769b490cf838c0a246af4c7a2dd506700`.

On each host the typecheck printed only its command, the binary printed `madv-surface 0.1.2` and listed `--no-tools` in its help, and the TLS test printed that its three requests came over one client port and that its assertion on the reused responses ran. The help log of my Ubuntu run, `006-help.log`, holds 3,169 NUL bytes from offset 135, before the full help text and an exit status of 0, as section 8 of the review records from its log 023; their cause is not established.

A7. **The review.** The reviewer was a fresh session in Antigravity on my MacBook, with a Gemini model I selected, reviewer id `antigravity`; the report records its harness as Antigravity and its model as not shown. It reviewed `341eb058f537c887aa599f5051e0437f57bcc6bf` under the review prompt with SHA-256 `cae856afcfb294f2dcde2b257fe5105054a2f7e810349d369bdec3532ca54315` (transfer commit `f8d5bd7debe25915f6ced1c80914adc711865fcf`). Its report has SHA-256 `0c24ddd8ff4f072b7e07430b5de31fba5b3b6f907b7d749d1da5b4c3c37c5f72`, 614 lines and 59,073 bytes. It gives PASS, with items 1 to 13 PASS, no SUBSTANTIVE and no ADVISORY finding, and two findings it classes NOT COUNTING. Each of its nine mutations of the head failed a test.
1. **My check.** My check of Phase 3B plan §2C passed on the report: each of its 25 quoted blocks is in the source it names; each of the 52 files of its log and scratch folders is listed with a matching SHA-256; its one re-read after compaction, log 049, shows the prompt's SHA-256; the clone was at the head and clean; and the prompt, the description and the five evidence folders were unchanged. I posted the report on pull request 3 as comments 7056131487 and 7056131738, at 02:44:30Z and 02:44:31Z; the two parts, joined in order, are the report byte for byte.
2. **The findings.**
   - Finding 1 (item 6): `README.md` describes the 0.1.2 rule and `unexpected_tool_call` under its changes in 0.1.2, but its lines 114 to 116 still state the 0.1.1 rule, and its row of `system/provider_error` at line 216 does not list `unexpected_tool_call`.
   - Finding 2 (item 5): no test sends a later `no_tools` `true` after a first message without it. Every test that sends a later one also sends `no_tools` `true` on the first message.
   The reviewer classes each NOT COUNTING under Phase 3A plan §11.3: the first as editorial, the second as a supplementary test of behaviour that is correct and covered.
3. **The disagreement.** Section 9 of the report records that the review prompt set a wait below 3.0, where `DEC-20261115-01` B9 gives a review prompt for my MacBook the load rule of `DEC-20261102-02` B4, to record the load and not wait. The reviewer recorded the load before every command that starts Bun and also ran the prompt's waits, logs 021, 030 and 038. Two of its runs began at 3.0 or more: mutation 9 at 3.09, which failed on a fixed assertion of the system prompt's text, and attempt 1 at 3.56, which passed. I accepted the verdict as given in comment 7056131487.
4. **The attempts.** Section 5 records five attempts that keep every test it ran passing, each restored afterwards:
   - attempt 1 (item 2), in `src/tools.ts`, cutting the text at the cap plus 280 characters before redaction, which passes because the test keys run 272 and 275 characters past the cap;
   - attempt 2 (item 3), in `src/domain.ts`, a rule that matches `claude` only at the start of an id or after the prefixes of the tested ids, under which `glm-5claude` resolves to `zhipu`;
   - attempt 3 (item 4), in `src/http.ts`, reporting `127.0.0.1` for any IP-address endpoint and `localhost` for any other in place of the verified host, which passes because the tests use only those two names;
   - attempt 4a (item 5), in `src/agent.ts`, offering the role's tools from the second turn of a message under `--no-tools`, which no test can catch because no message without tools reaches a second turn;
   - attempt 4b (item 5), in `src/agent.ts`, counting a message as the first only when it carries `no_tools` `true`, the path of finding 2.

A8. **Ready, Copilot and the merge.**
1. After the posted PASS, my guarded command marked pull request 3 ready at the head at 2026-11-21T03:03:37Z. At 03:03:39Z GitHub requested a review by Copilot in the name of `decivantiq`; my command made no such request.
2. Copilot's review 6002455016 at the head came at 03:06:27Z, `COMMENTED`, headed "Changes recommended", with one comment, 4650214135, on line 239 of `src/http.ts`. It says that `URL.hostname` keeps the brackets of an IPv6 address, so that `isIP` returns 0 for the address `::1` written with them and the request still sends that bracketed text as the server name, and proposes removing the brackets before `isIP`.
3. I signed my merge authorization, SHA-256 `bf3b457187cfc11abfa8218ed83d4dc1d289f11f5aed06eaab7ef68a478e8546` (transfer commit `7664882035a3e03500ba69fe8f7d8771043dbda3`), after that review. It does not name the review, and no one brought the review to me before the merge: my merge command does not read reviews. It posted the authorization at 03:35:05Z as comment 7056702446, equal to the signed text.
4. The pull request merged at 03:35:10Z by merge commit `05f2b35b813a322e60f4a5154cc5671e8319aada`. Its parents are `91bfb38549bcab37740d2c4564c371ee390a63e7` and, second, `341eb058f537c887aa599f5051e0437f57bcc6bf`, and its tree is the head's tree, `3612903896a8f2c1fd1c2c4a57e3bee82139152d`. Against its first parent it changes exactly the sixteen paths. My command then created the lightweight tag `v0.1.2` on it; the repository's tags are `v0.1.1` on `91bfb38549bcab37740d2c4564c371ee390a63e7` and `v0.1.2` on the merge commit.

A9. **What Copilot's comment means for the release.** At the release commit:
1. Line 239 of `src/http.ts` sets the server name only when `isIP(url.hostname)` is 0, and for an endpoint at `::1`, written in brackets in its URL, `url.hostname` keeps the brackets. So an IPv6 endpoint still has its address sent as the server name, as Copilot says. That is the change Addendum 2 B1 authorized, applied to `URL.hostname` as written, and its B5 left IPv6 as it was. The result of log 263 is consistent with this cause; nothing has shown that it is the cause.
2. A release build is made by `bun run build`, which defines `MADV_SURFACE_TEST_BUILD` as `"0"` (line 11 of `package.json`). In such a build `resolveEndpoint` refuses `MADV_SURFACE_TEST_ENDPOINT` and `MADV_SURFACE_TEST_CA` (lines 69 and 70 of `src/http.ts`), and every host of the seven profiles of `src/profiles.ts` is a DNS name. So a release binary sends no request to an IP-address host, and the comment concerns test runs only.

A10. **The release builds.** Under `DEC-20261119-03` B7, I built from a fresh clone detached at `v0.1.2` on each host, with that host's Bun of its A5. `bun install --frozen-lockfile` and `bun run build` each exited 0, and each binary prints `madv-surface 0.1.2`:
1. on my MacBook, `/Users/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface`, SHA-256 `c9a9d800386a7c418f90d3597701c903914b93d152e9a09bae6f640e993f6725`, 62,292,978 bytes, built by Bun 1.4.2 at 2026-11-21T03:56:06Z, its record's `MANIFEST.sha256` with SHA-256 `183cf1a1365e1653a828a3e15cb200e0214952959dd768535cd504da834de00d`;
2. on my Ubuntu PC, `/home/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface`, SHA-256 `94537feb12c0d3918d25297ea34f6a55dc58e11ccfd7857856770b751bf263b7`, 80,573,976 bytes, built by the custodied Bun 1.4.1 at 2026-11-21T03:54:16Z, its record's `MANIFEST.sha256` with SHA-256 `09d2a8948f7b0cb41f22108fdba3d078428d45e9b16a17e28e9fad51ecffe9b1`.

Each binary has the SHA-256 and size of the binary that my run of B4 on that host built from the reviewed head, whose tree is the release commit's. On my MacBook it also equals the builder's gate binary.

A11. **The evidence kept.** On my MacBook:
- the builder's folder of A3;
- the check folder of A4;
- `/Users/michaeldaley/builds/surface-0.1.2-founder-breaks`;
- `/Users/michaeldaley/builds/surface-0.1.2-b4-macbook`;
- the review folder `/Users/michaeldaley/builds/review-surface-0.1.2-r1` and its report `/Users/michaeldaley/builds/review-surface-0.1.2-r1.md`;
- `/Users/michaeldaley/builds/madv-surface-0.1.2` and its record `/Users/michaeldaley/builds/madv-surface-0.1.2-record`.

On my Ubuntu PC:
- `/home/michaeldaley/builds/surface-0.1.2-b4-ubuntu`;
- `/home/michaeldaley/builds/madv-surface-0.1.2` and its record `/home/michaeldaley/builds/madv-surface-0.1.2-record`.

A12. **The drafting assistant.** A Claude Code session drafted `DEC-20261119-03`, its two addenda, the builder prompt, the five resume messages, the review prompt, my commands and checks, the merge authorization, this act and its packet.
1. It read the facts of A3 to A10 from those texts, the outputs of my commands as I gave them, the builder's reports, the posted comments and reviews, and both repositories.
2. It rebuilt from those sources the report, the two release records and their manifests that the packet quotes, and found the SHA-256 values they record. For the Ubuntu release record I gave it only the lines from the manifest on; it rebuilt the rest, whose only unknown was the time of the build, and found the single time whose text has the recorded SHA-256.
3. For A9 it read `src/http.ts`, `src/profiles.ts` and `package.json` at the release commit, and, in its own container, under a Bun that is not a certification host's, parsed a URL whose host is `::1` in brackets: its `hostname` kept the brackets, and `isIP` of it gave 0.
4. Its errors in this build: S3 of the builder prompt (Addendum 2 A3); the log inventory of resume message 2; the load rule of the review prompt (A7 item 3); and it did not bring Copilot's review to me before the merge.

None of that is an independent review.

## Part B: Founder rulings

B1. **The build.** It stands as A3 records it, within `DEC-20261119-03` B1 to B3 and its Addenda 1 and 2.
1. The halts and the asks are not verdicts and add no round.
2. The deviations of A3 item 6 stand as my resume messages, the addenda and item 13 of the review take them.
3. `docs/samples/README.md` meets B1 item 7 without an edit, as item 6 of the review finds.
4. B1 item 5 is met by the builder's breaks and mine together.

B2. **Model, effort and harness.** Under `DEC-20261112-02` B2, the record names the model `gpt-6.2-astra` and the effort `xhigh` in every turn, beside the session's report of GPT-6 by OpenAI with its identifier and effort not shown. That meets `DEC-20261108-02` B4 as `DEC-20261112-02` B2 reads it. The records of 0.1.1 and M0 named `gpt-6.1-sol`; the change is recorded, and is neither a stop nor a deviation. The session ran under Codex 0.167.0, the governed build of `DEC-20261108-03` Addendum 11.

B3. **My runs.** They meet `DEC-20261119-03` B4 on both hosts. The NUL bytes of A6 do not change that: the command exited 0 and printed the full help, and nothing in the binary's identity or the tests turns on them. They are carried to the act of `DEC-20261115-02` Addendum 7 B4, whose investigation runs the release binary on my Ubuntu PC; that act records whether its output, written to a file there, begins with NUL bytes, and rules whether that matters for its records.

B4. **The review.** It is the review I accept under `DEC-20261119-03` B5: a posted PASS at the exact head, after my check of Phase 3B plan §2C passed.
1. The wait of the review prompt is the drafting error that section 9 of the report names. `DEC-20261115-01` B9 stands and governs my later review prompts.
2. The runs of A7 item 3 that began at 3.0 or more are recorded. The result of each does not depend on load, and no item turns on them. The items stand.
3. The review counts under no rubric milestone and adds no round. C1 enters it.

B5. **The two findings.** Each is NOT COUNTING, as the reviewer classes it. Neither is a defect in what the release does: the first is in the text of `README.md`, and the second is a missing test of behaviour that is correct at the head, as item 5 of the review finds. Each is carried to the act of any later build of madv-surface, which has its build correct lines 114 to 116 and 216 of `README.md` and add a test of a later `no_tools` `true` after a first message without it, or rules the item closed.

B6. **The attempts.** None of the five attempts of A7 item 4 is a defect of madv-surface 0.1.2. At the head, the code each replaced is right, as items 2 to 5 of the review find.
1. Attempts 1 and 2 are limits that any test with a finite key or a finite list of ids leaves; the head redacts before it caps and uses the rule of B1 item 4 as written. They are closed. The items of `DEC-20261115-01` B4 that `DEC-20261119-03` A4 carried are answered.
2. Attempt 3 is carried with the IPv6 endpoint (B7): a reviewer turn verified at `::1` gives the tests a third name.
3. Attempt 4a changes code that no message without tools reaches. It is closed.
4. Attempt 4b is the path of finding 2 (B5).

B7. **Copilot's review and the IPv6 endpoint.**
1. Copilot's review of A8 item 2 is not the review of `DEC-20261119-03` B5, it is not a countable verdict under Phase 3A plan §11.3, and it is not a gate, as `DEC-20261115-01` B7 ruled for 0.1.1. My merge authorization and the merge stand.
2. Its comment is right about IPv6 test endpoints, and as A9 records, it touches no release binary.
3. The IPv6 endpoint that Addendum 2 B5 carries is carried with that comment and with attempt 3 to the act of any later build of madv-surface. That act rules whether its build removes the brackets of an IPv6 address before the test of item 9 and adds a reviewer turn verified at `::1`.

B8. **Reviews before a merge in madv-surface.** From this act on, my merge authorization for a pull request in `MADVenturesLLC/madventures-surface` names every review and review comment on it when I sign it, and my guarded merge command stops if the pull request carries a review or review comment that the authorization does not name.

B9. **The release.** `05f2b35b813a322e60f4a5154cc5671e8319aada`, tagged `v0.1.2`, is the release commit of madv-surface 0.1.2. Under `DEC-20261119-03` B7, its release builds are, at the paths of A10:
- the binary with SHA-256 `c9a9d800386a7c418f90d3597701c903914b93d152e9a09bae6f640e993f6725` on my MacBook;
- the binary with SHA-256 `94537feb12c0d3918d25297ea34f6a55dc58e11ccfd7857856770b751bf263b7` on my Ubuntu PC.

They are the release builds that the act of `DEC-20261115-02` Addendum 7 B4 names. A binary built otherwise is not the release. The release builds of 0.1.1 stay where `DEC-20261115-01` B5 puts them.

B10. **The packet.** `docs/verification/2026-11-21-madv-surface-0.1.2-release.md`, SHA-256 `c8f71ec9579ca9cbe4ae283d33561bc8fc8c0513dfac84f835c99b9a59e162e9`, 311 lines, 33,570 bytes, which I sign with this act, is the sanitized packet of `DEC-20261119-03` B9. It holds the values of A3 to A10, read from the sources that A12 names, and no key, token or secret. The raw evidence stays where A11 lists it.

B11. **The evidence of A11.** It stays unchanged until the act that records Phase 3B's merge. The facts of A3 to A10 rest on it.

B12. **What comes next.** This act is the act of `DEC-20261119-03` B9 that the act of `DEC-20261115-02` Addendum 7 B4 cites. madv-surface is admitted only by that act, and M1 to M6 wait as `DEC-20261119-01` B9 and B11 say. This act starts no slice.

B13. **One filing.** One docs-only pull request, made by a Claude Code filing session under a filing prompt I sign, does four things and changes nothing else:
1. adds the two addenda of A2 under `docs/decisions/` with their file names, each unchanged;
2. adds this act as `docs/decisions/DEC-20261121-01-madv-surface-0.1.2-records.md`, unchanged;
3. adds the packet of B10 as `docs/verification/2026-11-21-madv-surface-0.1.2-release.md`, unchanged;
4. appends the entry of C1 to the end of the correction-round log.

B14. **Counting.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. This act takes effect when I sign it.

B15. **What this does not open.** This act authorizes no build, no live provider call, no real key, no change in `MADVenturesLLC/madventures-surface` and no change to the `start` gate. It admits no surface and starts no slice. It changes no earlier ruling, except that B6 closes attempts 1, 2 and 4a and the items of `DEC-20261115-01` B4, and B8 adds a requirement to my merge authorizations and merge commands in madv-surface.

## Part C: Filing and recording

C1. The pull request of B13 appends one entry in the form of the log's latest entries: the review verdict of madv-surface 0.1.2, PASS, under no rubric milestone and with no round, and the release. The entry records:
- the head, the builder session, its prompt, its resume messages and the two addenda;
- the reviewer;
- the report's SHA-256, size and comments;
- the result, with B4 to B6;
- my breaks of A5 and my runs of A6;
- the merge and the tag of A8, with Copilot's review and B7;
- the release builds of A10;
- the harness, model and effort of B2;
- the items carried by B3, B5 and B7.

The pull request touches `docs/decisions/`, so under `AGENTS.md`, as `DEC-20261031-01` amended it, it merges only by an act of mine naming its exact head.

## Part D: Not authorized

- Any change to code, tests, `bun.lock`, a manifest, the plan, the spec, `AGENTS.md` or an earlier decision record, except the filing of B13 and C1.
- Any edit of an existing entry of the correction-round log, or of an addendum's text.
- Any change in `MADVenturesLLC/madventures-surface`, any further tag there, and naming any binary as the release other than those of B9.
- Any slice, build, release or live call, any admission of a surface, and any change to the `start` gate.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-21

Actor-Id: founder
