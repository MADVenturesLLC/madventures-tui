# madv-surface 0.1.1: build, Founder runs, review, release commit and release builds

This is the sanitized evidence packet of `DEC-20261114-01` B9, filed with `DEC-20261115-01`, which records it. Its values come from the outputs of the Founder's commands, the reports of the builder and the reviewer, the comments on pull request 2 of `MADVenturesLLC/madventures-surface`, and that repository. The raw logs, the session record, the reports and the binaries stay on the Founder's hosts, in the folders of section 8, and are cited here by SHA-256. This packet holds no key, token or secret.

## 1. The release

| Item | Value |
|---|---|
| Repository | `MADVenturesLLC/madventures-surface`, private, no CI |
| Version | 0.1.1 |
| Release commit | `91bfb38549bcab37740d2c4564c371ee390a63e7`, the merge of pull request 2, 2026-11-15 03:31:36Z |
| Tag | `v0.1.1`, a lightweight tag on the release commit and the repository's only tag |
| Tree | `edb3bcd26bae4f95fe9db39c234200921534f18e`, the tree of the reviewed head |
| First parent | `d259cb5f9797101868391a0e4e81fc3a40ad3ea4`, `main` at version 0.1.0 |
| Second parent | `a249da6dbeab879b2d68b97975e8a9a42db07437`, the reviewed head |
| Paths changed against the first parent | the ten of `DEC-20261114-01` B1: `README.md`, `docs/build-log-0.1.1.md`, `docs/registration-proposal.md`, `docs/samples/README.md`, `package.json`, `src/domain.ts`, `test/claude-ids.test.ts`, `test/local-redaction-order.test.ts`, `test/new-profiles.test.ts`, `test/tls.test.ts` |
| `bun.lock` | unchanged, SHA-256 `122a9146ccb18f973766d9492e20140837931b65fccb76a504888cc9070357cc` |

## 2. The release builds (`DEC-20261114-01` B7)

Each was built from a fresh clone detached at `v0.1.1`, by `bun install --frozen-lockfile` and `bun run build`, each exiting 0, and each binary printed `madv-surface 0.1.1`.

| Host | Binary | SHA-256 | Bytes | Built by | Built at |
|---|---|---|---|---|---|
| MacBook | `/Users/michaeldaley/builds/madv-surface-0.1.1/dist/madv-surface` | `daf7ffe5922a3b538d69e6408d4c14c96978b17d16aca2cdeb57e7b6f1852024` | 62,292,978 | Bun 1.4.2, revision `744846f844374847c902b5e7fd59b4342a51ef99` | 2026-11-15T11:55:27Z |
| Ubuntu PC | `/home/michaeldaley/builds/madv-surface-0.1.1/dist/madv-surface` | `8dcced0bbc3b6ff3e7372977cae2d48036fa8dabae03e6aa5485efc1bc766a63` | 80,573,976 | the custodied Bun 1.4.1, revision `69cb78c9097cebd3bdb832d9fff8b7d23abce09e` | 2026-11-15T12:46:44Z |

Each binary has the SHA-256 and size of the binary that the Founder's run of B4 built on the same host at the reviewed head (section 5), whose tree is the release tree. On the MacBook it also equals the builder's gate binary.

MacBook, `/Users/michaeldaley/builds/madv-surface-0.1.1-record/RELEASE-BUILD.txt`, SHA-256 `b69a069eb4a8f66829d7564e7768db1ec009e5302c0bce78136b6aff7d37b55f`:

```
release build of madv-surface 0.1.1 under DEC-20261114-01 B7
host: macbook
binary: /Users/michaeldaley/builds/madv-surface-0.1.1/dist/madv-surface
sha256: daf7ffe5922a3b538d69e6408d4c14c96978b17d16aca2cdeb57e7b6f1852024
bytes: 62292978
version: madv-surface 0.1.1
tag: v0.1.1; release commit: 91bfb38549bcab37740d2c4564c371ee390a63e7; tree: edb3bcd26bae4f95fe9db39c234200921534f18e
built by bun: /Users/michaeldaley/.bun/bin/bun 1.4.2 revision 744846f844374847c902b5e7fd59b4342a51ef99 sha256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5
built at: 2026-11-15T11:55:27Z
```

Its `MANIFEST.sha256`, SHA-256 `7ae87dd0379c09381445bcc7dff3b6cb61d42b89d78f6eb37a396c35bb5272a9`:

```
3f8cbbfd1dedd7b41eae515aef95a964608b0faff7f41dc472c44450b50a9f4b  001-install.log
59f829a020febbaf1e1aeeed0b5c353578cc655a51f1bda1494f97eb818aea92  002-build.log
5e756db1902f0d7c90d1577c1c7a4dfa42733dcf862c29b023f4e351ef750503  003-version.log
```

Ubuntu PC, `/home/michaeldaley/builds/madv-surface-0.1.1-record/RELEASE-BUILD.txt`, SHA-256 `d0ec50e71217264e11e400ce94d3383eac66be8bdb45c20daf786f81b7bd5fb4`:

```
release build of madv-surface 0.1.1 under DEC-20261114-01 B7
host: ubuntu
binary: /home/michaeldaley/builds/madv-surface-0.1.1/dist/madv-surface
sha256: 8dcced0bbc3b6ff3e7372977cae2d48036fa8dabae03e6aa5485efc1bc766a63
bytes: 80573976
version: madv-surface 0.1.1
tag: v0.1.1; release commit: 91bfb38549bcab37740d2c4564c371ee390a63e7; tree: edb3bcd26bae4f95fe9db39c234200921534f18e
built by bun: /home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun 1.4.1 revision 69cb78c9097cebd3bdb832d9fff8b7d23abce09e sha256 0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb
built at: 2026-11-15T12:46:44Z
```

Its `MANIFEST.sha256`, SHA-256 `369042519a866dfef3836668333677ff79685c037e7a0c5665f9c5b9a9b76e5d`:

```
ab2e82e6b6d1ce3706af28cf6117ce21b35bb969ecb94f13805c510a491fcdea  001-install.log
9506667cf1faab42d2e987ee70086a4639a08685ac08d6a91f83941d68a87f36  002-build.log
d143d1f6bcaf0ad8a6406ee05f4708236b7444164974ce37508db75a08a3ab72  003-version.log
```

## 3. The build (`DEC-20261114-01` B1 to B3)

- **Builder:** governed Codex 0.167.0 on the MacBook, Actor-Id `session:codex/surface-0.1.1-r1`, in `/Users/michaeldaley/builds/surface-0.1.1-r1`, on the branch `build/v0.1.1` from `d259cb5f9797101868391a0e4e81fc3a40ad3ea4`, with the git identity `daley40-lab` and no GitHub call. It reported its harness as Codex and its model as GPT-6 by OpenAI, with the exact model identifier and the reasoning effort not shown.
- **Builder prompt:** SHA-256 `084f7a3a7af6692a03fdb5d653ba8bdb3de4e27b7dd4ff25a045ce8899a7c77f`, transfer commit `a1387df9989a595e7433751d0f6cd05f1e513df2` of `MADVenturesLLC/madventures-tui`.
- **The one halt:** after its first commit. Line 4 of that commit's body has 73 characters, and the commit ran after its message check failed (log 042, SHA-256 `820c32b4e14b6f20209b8b8352dbf12199141815270d59b2fc992b4d7dc008f1`; build log then `03e5ad3246803cd0d61577a9d2742e736d762bd7daa7e3bf10dea031c32cd2a1`). The Founder's resume message, SHA-256 `15da73708241a0c78f77ee13e7d68264e647c6958e3175fe17c51d9f2c8468f9`, transfer commit `f942e464b351e238f52e9bbae8a4cf87121da07e`, upheld the halt, accepted that line for that commit alone, and made each check gate its step.
- **Baseline at the base:** after a load wait that passed at 1.86, 123 pass and 0 fail across 21 files, 2138 `expect()` calls (log 037, SHA-256 `17787e339120f3a01c4025b2f7911f24d29daebc90da6a749db7e68eb218f822`).

| Commit | Subject | Paths |
|---|---|---|
| `2ff0e007da08767c6aaf3e243af0c75da4c1bf94` | docs: open the 0.1.1 build log with its task detail | `docs/build-log-0.1.1.md` |
| `4f999089bc6661bf7a96a61ff4b0411bd4d70bb1` | test: fail when read_file or list_dir output is cut before redaction | `test/local-redaction-order.test.ts` |
| `b2af319b2852118edc3e864806e53f9420173f01` | fix(domain): refuse more Claude ids as anthropic_model | `src/domain.ts`, `test/claude-ids.test.ts` |
| `edc50e9163c688e9b696f9c9bb16e4e5b159f66b` | test(tls): stop asserting one connection, keep the verified host | `test/tls.test.ts` |
| `88d39fced21b0c7e580153d83c3f6d750c6a6939` | chore(release): version 0.1.1 | `README.md`, `docs/registration-proposal.md`, `docs/samples/README.md`, `package.json`, `test/new-profiles.test.ts` |
| `a249da6dbeab879b2d68b97975e8a9a42db07437` | docs: complete the 0.1.1 build log | `docs/build-log-0.1.1.md` |

What the three items of `DEC-20261114-01` A3 became:
1. **Redaction order:** two tests in `test/local-redaction-order.test.ts` place a fresh test key that starts 16 characters before the 200,000-character cap of `read_file` and of `list_dir`, and fail if any 8-character slice of it is in the local view. Each failed on the builder's deliberate break of its own tool, which truncates before redaction, and `src/tools.ts` was then restored to its SHA-256; at the head it is unchanged.
2. **The Anthropic rule:** in `src/domain.ts` line 19, from `/^claude[-_:]|anthropic/i` to `/(?:^|[/:.])claude|anthropic/i`. The ten ids of `test/claude-ids.test.ts` are `claude`, `CLAUDE`, `claudeSonnet4`, `claude4`, `claude.sonnet-4`, `claude/sonnet-4`, `claude+sonnet-4`, `bedrock/claude-sonnet-4`, `us.claude-sonnet-4` and `eu:claude-sonnet-4`. On all seven profiles, all 70 pairs were refused as `unknown_family` at the base and are refused as `anthropic_model` at the head.
3. **The TLS test:** `test/tls.test.ts` no longer asserts one client port. It still asserts the verified host `localhost` on every `model_response`; when the ports show a reused connection, it runs an assertion on the response that came over it and prints whether reuse happened.

The gates of B3, each once at the head, under Bun 1.4.2: the frozen install with `bun.lock` unchanged; `bun run typecheck` printing only `$ bun x tsc --noEmit`; after a wait that passed at 1.93, `bun test --timeout 20000`:

```
 126 pass
 0 fail
 2153 expect() calls
Ran 126 tests across 23 files. [11.99s]
```

The comparison of the head's test list with the base's: every one of the 123 base tests present and passing, one of them renamed as the builder prompt allows, and three tests and two files added. `bun run build` gave a binary that prints `madv-surface 0.1.1`, SHA-256 `daf7ffe5922a3b538d69e6408d4c14c96978b17d16aca2cdeb57e7b6f1852024`, 62,292,978 bytes. `bun run build:test` passed, and the changed paths are exactly the ten.

| Builder file | SHA-256 |
|---|---|
| `docs/build-log-0.1.1.md` at the head | `b8c58a094eb6292994d40092dd7eea027a4f84487ca77e4ad5df96776ae56e07` |
| `pr/pr-body.md`, the pull request description, 35,197 bytes | `7f2a01e1a9d10edeb9840cd58c7d26af31c2007c471bb59a9351ddb4e6750fe0` |
| `pr/pr-title.txt` | `5d4591635f3e508a429856f25b515ebca740cbe2d3b743adc2d9fe5f9e66eb8c` |
| `pr/log-manifest.sha256`, logs 001 to 158 | `68877ce7671fcc3142b9fa4d0637dd9ab213cde326929e06128a46636dac0b86` |

The deviations the description lists: the 73-character line of the first commit and the halt; log 059, which ends without its exit-status footer because the logging helper stopped on the expected status 1 of `git diff --no-index`, with no test run, corrected at log 060; the first test of S1, which started at load 4.76 after an approval delay that followed a wait that passed at 1.78; the warning that the governed build printed before its version line, that it could not create PATH aliases; and the model label of the session's own report beside the session record.

## 4. The Founder's check of the session record

Posted on pull request 2 as comment 6885297945, before the push. The check is `h2-record-check.mjs`, SHA-256 `c1834dcc689e94cf57fb123a09a0600225d8e97b428c648f14276136e3dd383f`, from transfer commit `730df3014bf31d2dc0770cb4d30a4a4a79e30afe`. Its self-test gave `self-test cases: 66; not as expected: 0` and `SELFTEST_OK`. Its evidence folder is `/Users/michaeldaley/builds/surface-0.1.1-record-check/final-20261114T223729Z`, whose `MANIFEST.sha256` has SHA-256 `e564ddf319462988ff793921627448daa67fb5da7511d35dcf32d459fc047cea`. Its output:

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

## 5. The Founder's runs at the head (`DEC-20261114-01` B4)

Each ran from a fresh clone detached at `a249da6dbeab879b2d68b97975e8a9a42db07437`, in a plain terminal, on 2026-11-15: `bun install --frozen-lockfile`, `bun run typecheck`, `bun test --timeout 20000` after a load wait, `bun run build` and `./dist/madv-surface --version`. Each command exited 0, the typecheck printed only `$ bun x tsc --noEmit`, and the binary printed `madv-surface 0.1.1`.

| Host | Bun | Load wait before the tests | Binary SHA-256 | Bytes | Log manifest SHA-256 |
|---|---|---|---|---|---|
| MacBook | 1.4.2, `/Users/michaeldaley/.bun/bin/bun` | passed at 00:33:56Z at 1.93 | `daf7ffe5922a3b538d69e6408d4c14c96978b17d16aca2cdeb57e7b6f1852024` | 62,292,978 | `33cc769fabdb694bf13fb656db918662ac0cffe6427c2c66a9c6d60a4431fcce` |
| Ubuntu PC | the custodied 1.4.1 of `DEC-20261013-03` | passed at 00:28:54Z at 0.85 | `8dcced0bbc3b6ff3e7372977cae2d48036fa8dabae03e6aa5485efc1bc766a63` | 80,573,976 | `815105bd412e871af5bc99a9f7064013c895b1aed29bf17e5b6591a94a2a6563` |

MacBook, `003-test.log`:

```
 126 pass
 0 fail
 2153 expect() calls
Ran 126 tests across 23 files. [13.86s]
```

Ubuntu PC, `003-test.log`:

```
 126 pass
 0 fail
 2146 expect() calls
Ran 126 tests across 23 files. [7.65s]
```

On both hosts the TLS test printed:

```
tls requests=3 distinct_client_ports=1 reuse_observed=true reused_response_assertion=ran
```

MacBook, `MANIFEST.sha256`:

```
8c381d1aa9874b39c46bed14d1435b3cba53e8abacb8e53f52fa95a440d89f5b  001-install.log
107932057313d72efee86df4f5bd4c0b457ce59c0e78cee42600e0a4645ca20a  002-typecheck.log
a460c045df9f1b78fe6a67c3feed1be345d9bb8ba330b461176bdb7985a1245c  003-test.log
317d10cde9d402c561bfa15db1e132425420f23117924086bfe17f6fd4ff3aca  004-build.log
19d82e696134693533a790ddfa6e2a252bb8c85b6ea263ed813ff3f8ab714c76  005-version.log
```

Ubuntu PC, `MANIFEST.sha256`:

```
8b6fcbc7aac60e6cf3ebc9e11a4c7219e593683b9b862a0ea1e785d23302911c  001-install.log
8c04c5f1d668b656b02b6de98b2f27579745a5db61a3848fdaf7fa81a7b6e385  002-typecheck.log
abdf8689ac1154fd62a6848e37e9feac66063f0be1c9c645b9f73a3977a473d4  003-test.log
5257d88a685623250518f0a54613a19bb7f327eafea356425643730409608ea0  004-build.log
26b482e3d2dc6f5dd2248031c8e009dd76713a8d791a2813b5fa9f50011a7012  005-version.log
```

## 6. The review (`DEC-20261114-01` B5)

| Item | Value |
|---|---|
| Reviewer | `antigravity`, a fresh session in Antigravity on the MacBook; the report records the model as not shown |
| Head reviewed | `a249da6dbeab879b2d68b97975e8a9a42db07437` |
| Review prompt | SHA-256 `f739865f8bf6e0d1db60f862bab0f929836ad1f39bb095948fcad620da4e331f`, transfer commit `f05506f073e22ac0b618fb01da09caf10d5ee549` |
| Founder message 1 | SHA-256 `29fc9757f324c87afadf6f7f288e61b67bd7fba1d0ad285859bcaa8a1a7d324b`, transfer commit `2193ad323e84aed8b8a69ac6d3c090658bdeafa2`; it replaced the review prompt's load rule with that of `DEC-20261102-02` B4 after the reviewer's wait at log 032 ended without a reading below 2.0 |
| Report | `/Users/michaeldaley/builds/review-surface-0.1.1-r1.md`, SHA-256 `fee768e75b957363ba2eb12465039f7599bb57ba912b7242c3fe0eef274f23ce`, 654 lines, 61,230 bytes |
| Verdict | PASS, items 1 to 12 PASS, findings none, no disagreement between the prompt and the acts |
| Posted | comments 6888455782 and 6888455972 on pull request 2, by `decivantiq`, 2026-11-15 03:17:59Z and 03:18:01Z; the two parts joined in order are the report byte for byte |
| Counting | under no rubric milestone, no round (`DEC-20261114-01` B5) |

The items: 1 scope and attribution; 2 redaction order; 3 the Anthropic rule; 4 the TLS test; 5 the version and the documents; 6 the builder's breaks; 7 the gates and the load; 8 no live call and no key; 9 the evidence against the logs; 10 the Founder's runs; 11 the Founder's check; 12 the deviations the description lists.

The Founder's check of Phase 3B plan §2C before posting printed:

```
REPORT fee768e75b957363ba2eb12465039f7599bb57ba912b7242c3fe0eef274f23ce lines=654 bytes=61230
REPO AT HEAD
REPO CLEAN
PROMPT, DESCRIPTION, TEXTS AND E1 TO E4 MANIFESTS UNCHANGED
FOUNDER MESSAGE UNCHANGED
E1 FILES UNCHANGED
E2 LOGS UNCHANGED
E3 LOGS UNCHANGED
E4 FILES UNCHANGED
quote check: 27 blocks found in their sources, 0 not found, 0 without a Source line
files listed in section 7: 74; in logs/: 72; in scratch/: 2
re-read log 007-compaction-reread-1.log shows the prompt hash
re-read log 064-compaction-reread-2.log shows the prompt hash and the founder message hash
re-read log 067-compaction-reread-3.log shows the prompt hash and the founder message hash
re-read log 070-compaction-reread-4.log shows the prompt hash and the founder message hash
re-read log 071-compaction-reread-5.log shows the prompt hash and the founder message hash
re-read log 072-compaction-reread-6.log shows the prompt hash and the founder message hash
token-shaped lines in the report: 0
```

Section 5 of the report records the reviewer's mutations of the head and four attempts to evade the checks of items 2 to 4 while keeping the tests green, each restored afterwards:
1. **Attempt 1, item 2** (logs 051 to 053): in `capBoth` of `src/tools.ts`, cutting the text at the cap plus 25 characters before redaction, then capping. 7 pass, 0 fail. The report: it passes because each test key starts only 16 characters before the cap.
2. **Attempt 2, item 3** (logs 054 to 056): the rule `/^(?:claude|anthropic)|(?:bedrock\/|us\.|eu:)claude-sonnet-4/i`. 7 pass, 0 fail. It leaves ids such as `gcp/claude-3-opus` and `apac.claude-haiku-4` refused only as `unknown_family`.
3. **Attempt 3, item 4** (logs 057 to 059): deleting a socket's verified host after its first read. A test caught it: 5 pass, 1 fail.
4. **Attempt 3b, item 4** (logs 060 to 062): reporting `localhost` for any socket with a recorded host, in place of the recorded host. 6 pass, 0 fail, with the reused-response assertion run. The report: it passes because the mock serves only `localhost`.

Under item 3 the report also notes the Claude forms the head rule does not match: `claude` after a separator other than `/`, `:` or `.`, or joined to other text, such as `provider-claude-4`, `my_claude`, `custom+claude` and `qwenclaude`.

## 7. Ready and merge

| Time, 2026-11-14 and 15 (UTC) | Event on pull request 2 |
|---|---|
| 11-14 22:37:38Z | Opened as a draft by the Founder's guarded command, as `decivantiq`, after it pushed `build/v0.1.1` at the head |
| 11-14 22:37:41Z | The check of section 4, comment 6885297945 |
| 11-15 03:17:59Z and 03:18:01Z | The verdict, comments 6888455782 and 6888455972 |
| 03:31:07Z | Marked ready by the Founder's guarded command, as `decivantiq` |
| 03:31:09Z | GitHub requests a review by Copilot in the name of `decivantiq`; the Founder's command made no such request |
| 03:31:32Z | The merge authorization, comment 6888592205, equal to the signed text with SHA-256 `72e149a30e1888eafbe8f007bbac3f5e65773eb492b988b058d607fa7d0548e4`, transfer commit `738a4a3765c5c9789cdaef50c3cf2223ddfae3d1` |
| 03:31:36Z | Merged by merge commit `91bfb38549bcab37740d2c4564c371ee390a63e7`, as `decivantiq`; the command then checked the parents, the tree and the ten paths, and created the tag `v0.1.1` |
| 03:33:45Z | Copilot's review 5908857167 at the head, `COMMENTED`, with no thread: "No open issues", and one note that release approval depends on the certification-host runs and release builds, which are not in the pull request |

## 8. The raw evidence kept

| Host | Folder | What it holds |
|---|---|---|
| MacBook | `/Users/michaeldaley/builds/surface-0.1.1-r1` | the builder's folder: prompt, logs 001 to 160, PR files, clone |
| MacBook | `/Users/michaeldaley/builds/surface-0.1.1-record-check/final-20261114T223729Z` | the check of section 4, `MANIFEST.sha256` `e564ddf319462988ff793921627448daa67fb5da7511d35dcf32d459fc047cea` |
| MacBook | `/Users/michaeldaley/builds/surface-0.1.1-b4-macbook` | the run of section 5, manifest `33cc769fabdb694bf13fb656db918662ac0cffe6427c2c66a9c6d60a4431fcce` |
| Ubuntu PC | `/home/michaeldaley/builds/surface-0.1.1-b4-ubuntu` | the run of section 5, manifest `815105bd412e871af5bc99a9f7064013c895b1aed29bf17e5b6591a94a2a6563` |
| MacBook | `/Users/michaeldaley/builds/review-surface-0.1.1-r1` and `/Users/michaeldaley/builds/review-surface-0.1.1-r1.md` | the review folder and the report of section 6 |
| MacBook | `/Users/michaeldaley/builds/madv-surface-0.1.1` and `/Users/michaeldaley/builds/madv-surface-0.1.1-record` | the release build of section 2 and its record |
| Ubuntu PC | `/home/michaeldaley/builds/madv-surface-0.1.1` and `/home/michaeldaley/builds/madv-surface-0.1.1-record` | the release build of section 2 and its record |
