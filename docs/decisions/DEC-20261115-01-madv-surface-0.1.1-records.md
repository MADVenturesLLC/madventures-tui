FOUNDER-ACT-20261115-MADV-SURFACE-0.1.1-RECORDS: madv-surface 0.1.1 recorded: its build, my runs, its review, its release commit and its release builds

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`, recording work in `MADVenturesLLC/madventures-surface`
> **`origin/main` when drafted:** `8e078562d81b098cba012135cd4b9606f497cc99` (the merge of pull request 240)
> **Governs:** `DEC-20261114-01` B9; `docs/verification/2026-11-15-madv-surface-0.1.1-release.md`; `docs/verification/phase-3a-correction-rounds.md`
> **Read with:** `DEC-20261114-01`; `DEC-20261114-02` B3 and B5; `DEC-20261113-01` B5, B6 and B12; `DEC-20261112-02` B2; `DEC-20261108-02` B4; `DEC-20261108-03` Addenda 2 to 6, 10 and 11; `DEC-20261108-01` B13 item 1; `DEC-20261102-02` B4; `DEC-20261013-03` B2 and B4; `DEC-20261015-05` B3; `DEC-20261031-01`; Phase 3A plan §11.3; Phase 3B plan, provenance, and §2C and §3 M0

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What earlier texts leave to this act.** `DEC-20261114-01` B9 has an act of mine, after the release builds, record the build, my runs, the review, the release commit and the two release builds with their SHA-256 values, file that act's evidence in `docs/verification/` as a sanitized packet, and enter the review in the correction-round log under no rubric milestone; M0's act cites that act. Phase 3B plan, provenance, puts new Phase 3B evidence in `docs/verification/` as sanitized, human-readable packets, and keeps raw run artifacts outside the repository, cited by run identifier and SHA-256. This is that act. The packet of B10 sets out the values of A2 to A9 in full.

A2. **The build.** Governed Codex 0.167.0 on my MacBook built madv-surface 0.1.1 as `DEC-20261114-01` B2 names it: Actor-Id `session:codex/surface-0.1.1-r1`, in `/Users/michaeldaley/builds/surface-0.1.1-r1`, on the branch `build/v0.1.1` from `d259cb5f9797101868391a0e4e81fc3a40ad3ea4`, with the git identity `daley40-lab` and no GitHub call, under the builder prompt I signed, SHA-256 `084f7a3a7af6692a03fdb5d653ba8bdb3de4e27b7dd4ff25a045ce8899a7c77f` (transfer commit `a1387df9989a595e7433751d0f6cd05f1e513df2`), and one resume message.
1. The session halted after its first commit, `2ff0e007da08767c6aaf3e243af0c75da4c1bf94`: line 4 of that commit's body has 73 characters, and the commit ran after its message check failed (log 042, SHA-256 `820c32b4e14b6f20209b8b8352dbf12199141815270d59b2fc992b4d7dc008f1`). My resume message, SHA-256 `15da73708241a0c78f77ee13e7d68264e647c6958e3175fe17c51d9f2c8468f9` (transfer commit `f942e464b351e238f52e9bbae8a4cf87121da07e`), upheld the halt, accepted that line for that commit alone, and made each check gate the step that depends on it.
2. Its baseline at the base passed with 123 pass and 0 fail across 21 files. It made six commits, from `2ff0e007da08767c6aaf3e243af0c75da4c1bf94` to `a249da6dbeab879b2d68b97975e8a9a42db07437`, changing exactly the ten paths of `DEC-20261114-01` B1, with `bun.lock` unchanged.
3. For the three items of `DEC-20261114-01` A3, it added the following. First, two tests that fail when `read_file` or `list_dir` output is cut before redaction, each shown failing on a deliberate break, after which the file was restored. Second, a wider Anthropic rule at `src/domain.ts` line 19: it now recognizes, in any case, a model id in which `claude` begins the id or follows a slash, a colon or a dot, or which contains `anthropic`. Ten Claude ids that the base refused as `unknown_family` on all seven profiles are now refused as `anthropic_model`. Third, a TLS test that no longer asserts one connection but still asserts the verified host on every response. When a connection is reused, it runs that assertion on the response that came over it and prints that it ran.
4. Every gate of `DEC-20261114-01` B3 passed once at the head, under Bun 1.4.2: 126 pass and 0 fail across 23 files, every test of the base present and none skipped, and a binary that prints `madv-surface 0.1.1`, SHA-256 `daf7ffe5922a3b538d69e6408d4c14c96978b17d16aca2cdeb57e7b6f1852024`.
5. Its build log, `docs/build-log-0.1.1.md`, has SHA-256 `b8c58a094eb6292994d40092dd7eea027a4f84487ca77e4ad5df96776ae56e07`. Its description has SHA-256 `7f2a01e1a9d10edeb9840cd58c7d26af31c2007c471bb59a9351ddb4e6750fe0`, and the manifest of its logs 001 to 158 has `68877ce7671fcc3142b9fa4d0637dd9ab213cde326929e06128a46636dac0b86`. It reported its harness as Codex and its model as GPT-6 by OpenAI, with the exact model identifier and the reasoning effort not shown. The deviations its description lists:
   - the halt of item 1;
   - log 059, which ends without its exit-status footer, with no test run;
   - a first test of S1 that started at load 4.76, after an approval delay that followed a wait that passed at 1.78;
   - a warning that the governed build printed before its version line, that it could not create PATH aliases.

A3. **Before the session.**
1. On 2026-11-14 a Codex session whose banner read v0.169.0 started on my MacBook. The governed launcher prints `codex-cli 0.167.0`, so that session was not started by it. At 04:21Z my read-only check found:
   - the launcher with SHA-256 `294fcf1521abf45990535ce49f26023d7357a84fdfb3411974fc29c11ed2d85a`;
   - the Codex on my PATH printing `codex-cli 0.167.2`;
   - the build folder not yet made, and no session record in it under either sessions folder.
2. My setup command checks each process's working folder as well as its command line, as `DEC-20261113-01` B6 requires. It stopped three times on processes working in my `madv-harness` folders, counting 10, then 2, then 1. I stopped the 5 of them left orphaned. My read-only listing then showed two others: a shell in a herdr pane and a Bun process under an Antigravity session. The next run of the check counted one. My revised setup, SHA-256 `7b3393618ac0faa8ee636c8b36edf081aaa9c5776e608e858f793c31631c47a1`, does not count a process whose short name is that of a shell (`zsh`, `bash`, `sh`, `fish` or `login`). It still counts every other process working there and every process whose command line names those folders. It then passed and made the build folder, and the session started there at 2026-11-14T04:58:14.512Z.

A4. **The session record.** My check, `h2-record-check.mjs`, SHA-256 `c1834dcc689e94cf57fb123a09a0600225d8e97b428c648f14276136e3dd383f` (transfer commit `730df3014bf31d2dc0770cb4d30a4a4a79e30afe`), passed its self-test of 66 cases and ended `CHECK_OK` before the push.
1. It found one record whose starting folder is the build folder: `rollout-2026-11-13T23-58-14-01a1d86b-a064-7da3-90ac-3d93acbaf401.jsonl`, naming `cli_version` `0.167.0`, started at 2026-11-14T04:58:14.512Z.
2. The record has two turns, at 04:59:34.694Z and 13:54:50.832Z. Each names the model `gpt-6.1-sol`, the effort `xhigh`, approval `on-request`, the approvals reviewer `user`, sandbox `workspace-write` with network access off, and the build folder.
3. It holds 154 calls of `exec`, 17 of `wait` and 41 of `clock.sleep`, and no name of `DEC-20261108-03` Addendum 2 B4 as text.
4. I posted it on pull request 2 as comment 6885297945. Its evidence folder `/Users/michaeldaley/builds/surface-0.1.1-record-check/final-20261114T223729Z` has a `MANIFEST.sha256` with SHA-256 `e564ddf319462988ff793921627448daa67fb5da7511d35dcf32d459fc047cea`.

A5. **My runs of B4.** On 2026-11-14 my guarded command pushed `build/v0.1.1` at the head and opened pull request 2 of `MADVenturesLLC/madventures-surface` as a draft; madv-surface has no CI. On 2026-11-15 I ran the head on both certification hosts, from fresh clones in plain terminals, each test run after a load wait that passed:
1. on my MacBook, under Bun 1.4.2: 126 pass and 0 fail across 23 files; a binary of SHA-256 `daf7ffe5922a3b538d69e6408d4c14c96978b17d16aca2cdeb57e7b6f1852024` and 62,292,978 bytes; log manifest SHA-256 `33cc769fabdb694bf13fb656db918662ac0cffe6427c2c66a9c6d60a4431fcce`;
2. on my Ubuntu PC, under the custodied Bun 1.4.1: 126 pass and 0 fail across 23 files; a binary of SHA-256 `8dcced0bbc3b6ff3e7372977cae2d48036fa8dabae03e6aa5485efc1bc766a63` and 80,573,976 bytes; log manifest SHA-256 `815105bd412e871af5bc99a9f7064013c895b1aed29bf17e5b6591a94a2a6563`.

On each host:
- the typecheck printed only its command;
- the binary printed `madv-surface 0.1.1`;
- the TLS test printed that its three requests came over one client port, that reuse was observed, and that its assertion on the reused responses ran.

A6. **The review.** The reviewer was a fresh session in Antigravity on my MacBook, with a Gemini model I selected, reviewer id `antigravity`; the report records its harness as Antigravity and its model as not shown. It reviewed `a249da6dbeab879b2d68b97975e8a9a42db07437` under the review prompt with SHA-256 `f739865f8bf6e0d1db60f862bab0f929836ad1f39bb095948fcad620da4e331f` (transfer commit `f05506f073e22ac0b618fb01da09caf10d5ee549`). Its report has SHA-256 `fee768e75b957363ba2eb12465039f7599bb57ba912b7242c3fe0eef274f23ce`, 654 lines and 61,230 bytes. It gives PASS, with items 1 to 12 PASS, no finding, and no disagreement between the prompt and the acts.
1. **The load.** The reviewer's wait at log 032 ended after 20 minutes without a reading below 2.0, while only the review ran. It then ran its test of log 033, a deliberate break of `list_dir`, which failed as a break should. Its next wait, log 036, saw only readings above 2.0. My message to it, SHA-256 `29fc9757f324c87afadf6f7f288e61b67bd7fba1d0ad285859bcaa8a1a7d324b` (transfer commit `2193ad323e84aed8b8a69ac6d3c090658bdeafa2`), replaced the review prompt's load rule with that of `DEC-20261102-02` B4: record the one-minute load before each command that starts Bun, and start that command without waiting.
2. **My check.** My check of Phase 3B plan §2C passed on the report:
   - each of its 27 quoted blocks is in the source it names;
   - each of the 74 files of its log and scratch folders is listed with a matching SHA-256;
   - each of its six re-reads after compaction shows the prompt's SHA-256, and the five after my message also show the message's;
   - the clone was at the head and clean, and the prompt, the description, my message and the four evidence folders were unchanged.
   I posted the report on pull request 2 as comments 6888455782 and 6888455972; the two parts, joined in order, are the report byte for byte.
3. **The three attempts.** Section 5 of the report records three attempts that keep every test it ran passing, each restored afterwards:
   - in `src/tools.ts`, cutting the text at the cap plus 25 characters before redaction, which passes because each test key starts 16 characters before the cap;
   - in `src/domain.ts`, a rule written to the ten listed ids, which leaves other Claude ids refused only as `unknown_family`;
   - in `src/http.ts`, reporting `localhost` for any socket with a recorded host in place of the recorded host, which passes because the mock serves only `localhost`.
   Under its item 3 the report also notes Claude ids that the head's rule does not match: those in which `claude` follows a hyphen, an underscore, a plus sign or other text.

A7. **What the release does with those ids.** At the release commit, `resolveFamily` in `src/domain.ts` tests the Anthropic rule first (line 28) and then the profile's own families (line 31). An id that neither the rule nor any family matches is refused as `unknown_family` (line 54). An id that another family's rule matches is accepted as that family. For example, `minimax-claude-x` is accepted under the `minimax` family of `src/profiles.ts` line 72, which matches any id that begins with `minimax` and then a hyphen or an underscore, and `qwen-claude` under the `alibaba` family of line 73. The base's rule treated those ids the same way.

A8. **Ready and the merge.**
1. After the posted PASS, my guarded command marked pull request 2 ready at the head at 2026-11-15T03:31:07Z. At 03:31:09Z GitHub requested a review by Copilot in the name of `decivantiq`; my command made no such request.
2. I signed my merge authorization, SHA-256 `72e149a30e1888eafbe8f007bbac3f5e65773eb492b988b058d607fa7d0548e4` (transfer commit `738a4a3765c5c9789cdaef50c3cf2223ddfae3d1`), before my ready command ran. Its item 4 states that the pull request was marked ready at the head and that there had been no push since. My merge command posts it only after checking that the pull request is ready at the head. It posted it at 03:31:32Z as comment 6888592205, equal to the signed text, when item 4 was true.
3. The pull request merged at 03:31:36Z by merge commit `91bfb38549bcab37740d2c4564c371ee390a63e7`. Its parents are `d259cb5f9797101868391a0e4e81fc3a40ad3ea4` and, second, `a249da6dbeab879b2d68b97975e8a9a42db07437`, and its tree is the head's tree, `edb3bcd26bae4f95fe9db39c234200921534f18e`. Against its first parent it changes exactly the ten paths. My command then created the lightweight tag `v0.1.1` on it, the repository's only tag.
4. Copilot's review 5908857167 at the head came at 03:33:45Z, after the merge. It opened no thread and says "No open issues". It notes that release approval depends on the certification-host runs and the release builds, which are not in the pull request.

A9. **The release builds.** Under `DEC-20261114-01` B7, I built from a fresh clone detached at `v0.1.1` on each host, with that host's Bun of its A4. `bun install --frozen-lockfile` and `bun run build` each exited 0, and each binary prints `madv-surface 0.1.1`:
1. on my MacBook, `/Users/michaeldaley/builds/madv-surface-0.1.1/dist/madv-surface`, SHA-256 `daf7ffe5922a3b538d69e6408d4c14c96978b17d16aca2cdeb57e7b6f1852024`, 62,292,978 bytes, built by Bun 1.4.2 at 2026-11-15T11:55:27Z, its record's `MANIFEST.sha256` with SHA-256 `7ae87dd0379c09381445bcc7dff3b6cb61d42b89d78f6eb37a396c35bb5272a9`;
2. on my Ubuntu PC, `/home/michaeldaley/builds/madv-surface-0.1.1/dist/madv-surface`, SHA-256 `8dcced0bbc3b6ff3e7372977cae2d48036fa8dabae03e6aa5485efc1bc766a63`, 80,573,976 bytes, built by the custodied Bun 1.4.1 at 2026-11-15T12:46:44Z, its record's `MANIFEST.sha256` with SHA-256 `369042519a866dfef3836668333677ff79685c037e7a0c5665f9c5b9a9b76e5d`.

Each binary has the SHA-256 and size of the binary that my run of B4 on that host built from the reviewed head, whose tree is the release commit's. On my MacBook it also equals the builder's gate binary.

A10. **The evidence kept.** On my MacBook:
- the builder's folder of A2;
- the check folder of A4;
- `/Users/michaeldaley/builds/surface-0.1.1-b4-macbook`;
- the review folder `/Users/michaeldaley/builds/review-surface-0.1.1-r1` and its report `/Users/michaeldaley/builds/review-surface-0.1.1-r1.md`;
- `/Users/michaeldaley/builds/madv-surface-0.1.1` and its record `/Users/michaeldaley/builds/madv-surface-0.1.1-record`.

On my Ubuntu PC:
- `/home/michaeldaley/builds/surface-0.1.1-b4-ubuntu`;
- `/home/michaeldaley/builds/madv-surface-0.1.1` and its record `/home/michaeldaley/builds/madv-surface-0.1.1-record`.

A11. **The drafting assistant.** A Claude Code session drafted the builder prompt, the resume message, the review prompt, my message to the reviewer, my commands and checks, the merge authorization, this act and its packet.
1. It read the facts of A2 to A9 from those texts, the outputs of my commands as I gave them, the posted comments and both repositories.
2. It rebuilt from those outputs the report, the four log manifests and the two release records that the packet quotes, and found the SHA-256 values they record.
3. For A7 it read `src/domain.ts` and `src/profiles.ts` at the release commit and ran `resolveFamily` on the ids A7 names, in its own container, under a Bun that is not a certification host's.

None of that is an independent review.

## Part B: Founder rulings

B1. **The build.** It stands as A2 records it, within `DEC-20261114-01` B1 to B3.
1. The halt is not a verdict and adds no round.
2. The deviations of A2 item 5 stand as the resume message and item 12 of the review take them.
3. Under `DEC-20261112-02` B2, the record names `gpt-6.1-sol` and `xhigh` in both turns, beside the session's report of GPT-6 by OpenAI. That meets `DEC-20261108-02` B4 as `DEC-20261113-01` B5 reads it.
4. The v0.169.0 session of A3 item 1 is not part of the build.

B2. **My runs.** They meet `DEC-20261114-01` B4 on both hosts. The run on my Ubuntu PC is the proof of its A3 item 3 under Bun 1.4.1: the connection was reused there too, and the test's assertion on the reused responses ran.

B3. **The review.** It is the review I accept under `DEC-20261114-01` B5: a posted PASS at the exact head, after my check of Phase 3B plan §2C passed. My message of A6 item 1 is part of it.
1. The run of the reviewer's log 033 started after its wait of log 032 ended without a reading below 2.0. The review prompt, as it then stood, did not allow that.
2. The run is recorded, and its result is the expected failure of a deliberate break, which does not depend on load. The rule my message then set would have allowed it. Item 2 of the review stands.
3. The review counts under no rubric milestone and adds no round. C1 enters it.

B4. **The attempts and the ids of A7.** Neither the three attempts of A6 item 3 nor the ids of A7 is a defect of madv-surface 0.1.1. At the head, the code each attempt replaced is right, as items 2 to 4 of the review find. `DEC-20261114-01` B1 item 2 required only the ids the builder showed reaching the unknown-family rule. They are limits of what the tests prove, and none is a condition of M0. Each is carried to the act of any later build of madv-surface, which rules whether that build adds:
1. a redaction-order test whose key runs further past the cap, so that a cut before redaction with a margin shorter than the key fails;
2. tests of Claude ids beyond the ten, and a rule on whether an id in which `claude` follows another family's prefix is refused;
3. a TLS test with a second verified host name, so that a fixed name fails.

B5. **The release.** `91bfb38549bcab37740d2c4564c371ee390a63e7`, tagged `v0.1.1`, is the release commit of madv-surface 0.1.1. Under `DEC-20261114-01` B7, its release builds are, at the paths of A9:
- the binary with SHA-256 `daf7ffe5922a3b538d69e6408d4c14c96978b17d16aca2cdeb57e7b6f1852024` on my MacBook;
- the binary with SHA-256 `8dcced0bbc3b6ff3e7372977cae2d48036fa8dabae03e6aa5485efc1bc766a63` on my Ubuntu PC.

M0's registration, investigation and capability records name those values. A binary built otherwise is not the release.

B6. **The order of my authorization.** My merge authorization stands. Its item 4 states a fact as of its posting, and that fact was true then, as A8 item 2 records.

B7. **Copilot's review.** Copilot's review of A8 item 4 changes nothing. It is not the review of `DEC-20261114-01` B5, it is not a countable verdict under Phase 3A plan §11.3, and it is not a gate. It came after the merge.

B8. **The process check.** `DEC-20261113-01` B6 is read so that a process whose short name is that of a shell does not, by itself, count as a process of another project. Any program such a shell starts is its own process, with its own working folder, and counts. My revised setup of A3 item 2 meets B6 as so read.

B9. **The load rule for reviews.** From this act on, a review prompt of mine for a session on my MacBook carries the load rule of `DEC-20261102-02` B4 as my message of A6 item 1 states it, not a wait. A builder's waits are unchanged.

B10. **The packet.** `docs/verification/2026-11-15-madv-surface-0.1.1-release.md`, SHA-256 `c59d0fccc68a4b850aaed9498c320ff8f50ad537e6e1c5193d29028772db4ae0`, 254 lines, 20,779 bytes, which I sign with this act, is the sanitized packet of `DEC-20261114-01` B9. It holds the values of A2 to A9, read from the sources that A11 names, and no key, token or secret. The raw evidence stays where A10 lists it.

B11. **The evidence of A10.** It stays unchanged until the act that records Phase 3B's merge. The facts of A2 to A9 rest on it.

B12. **M0.** This act is the act of `DEC-20261114-01` B9 that M0's act cites. M0 starts only on its own act. Under `DEC-20261114-02` B3 that act records my reading of MiniMax's Terms of Service, and under its B5 it rules the probes. This act starts no slice.

B13. **One filing.** One docs-only pull request, made by a Claude Code filing session under a filing prompt I sign, does three things and changes nothing else:
1. adds this act as `docs/decisions/DEC-20261115-01-madv-surface-0.1.1-records.md`, unchanged;
2. adds the packet of B10 as `docs/verification/2026-11-15-madv-surface-0.1.1-release.md`, unchanged;
3. appends the entry of C1 to the end of the correction-round log.

B14. **Counting.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. This act takes effect when I sign it.

B15. **What this does not open.** This act authorizes no build, no live provider call, no real key, no change in `MADVenturesLLC/madventures-surface` and no change to the `start` gate. It starts no slice. It changes no earlier ruling, except that B8 reads `DEC-20261113-01` B6 and B9 sets the load rule of my later review prompts.

## Part C: Filing and recording

C1. The pull request of B13 appends one entry in the form of the log's latest entries: the review verdict of madv-surface 0.1.1, PASS, under no rubric milestone and with no round, and the release. The entry records:
- the head, the builder session, its prompt and its resume message;
- the reviewer and my message to it;
- the report's SHA-256, size and comments;
- the result, with B3 and B4;
- my runs of A5;
- the merge and the tag of A8;
- the release builds of A9;
- the harness, model and effort of B1.

The pull request touches `docs/decisions/`, so under `AGENTS.md`, as `DEC-20261031-01` amended it, it merges only by an act of mine naming its exact head.

## Part D: Not authorized

- Any change to code, tests, `bun.lock`, a manifest, the plan, the spec, `AGENTS.md` or an earlier decision record, except the filing of B13 and C1.
- Any edit of an existing entry of the correction-round log.
- Any change in `MADVenturesLLC/madventures-surface`, any further tag there, and naming any binary as the release other than those of B5.
- Any slice, build or live call, and any change to the `start` gate.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-15

Actor-Id: founder
