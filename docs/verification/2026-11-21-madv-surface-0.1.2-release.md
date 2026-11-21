# madv-surface 0.1.2: build, Founder runs, review, release commit and release builds

This is the sanitized evidence packet of `DEC-20261119-03` B9, filed with `DEC-20261121-01`, which records it. Its values come from the outputs of the Founder's commands, the reports of the builder and the reviewer, the comments and reviews on pull request 3 of `MADVenturesLLC/madventures-surface`, and that repository. The raw logs, the session record, the reports and the binaries stay on the Founder's hosts, in the folders of section 10, and are cited here by SHA-256. This packet holds no key, token or secret.

## 1. The release

| Item | Value |
|---|---|
| Repository | `MADVenturesLLC/madventures-surface`, private, no CI |
| Version | 0.1.2 |
| Release commit | `05f2b35b813a322e60f4a5154cc5671e8319aada`, the merge of pull request 3, 2026-11-21 03:35:10Z |
| Tag | `v0.1.2`, a lightweight tag on the release commit; the repository's other tag is `v0.1.1`, on `91bfb38549bcab37740d2c4564c371ee390a63e7` |
| Tree | `3612903896a8f2c1fd1c2c4a57e3bee82139152d`, the tree of the reviewed head |
| First parent | `91bfb38549bcab37740d2c4564c371ee390a63e7`, `main` at version 0.1.1 |
| Second parent | `341eb058f537c887aa599f5051e0437f57bcc6bf`, the reviewed head |
| Paths changed against the first parent | the sixteen of `DEC-20261119-03` B1 with its item 9. Added: `docs/build-log-0.1.2.md`, `test/embedded-claude-ids.test.ts`, `test/fixtures/tls/loopback-ip.key`, `test/fixtures/tls/loopback-ip.pem`, `test/no-tools.test.ts`. Modified: `README.md`, `docs/registration-proposal.md`, `package.json`, `src/agent.ts`, `src/cli.ts`, `src/domain.ts`, `src/http.ts`, `test/fixtures/tls/README.md`, `test/local-redaction-order.test.ts`, `test/new-profiles.test.ts`, `test/tls.test.ts` |
| `bun.lock` | unchanged, SHA-256 `122a9146ccb18f973766d9492e20140837931b65fccb76a504888cc9070357cc` |

## 2. The release builds (`DEC-20261119-03` B7)

Each was built from a fresh clone detached at `v0.1.2`, by `bun install --frozen-lockfile` and `bun run build`, each exiting 0, and each binary printed `madv-surface 0.1.2`.

| Host | Binary | SHA-256 | Bytes | Built by | Built at |
|---|---|---|---|---|---|
| MacBook | `/Users/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface` | `c9a9d800386a7c418f90d3597701c903914b93d152e9a09bae6f640e993f6725` | 62,292,978 | Bun 1.4.2, revision `744846f844374847c902b5e7fd59b4342a51ef99` | 2026-11-21T03:56:06Z |
| Ubuntu PC | `/home/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface` | `94537feb12c0d3918d25297ea34f6a55dc58e11ccfd7857856770b751bf263b7` | 80,573,976 | the custodied Bun 1.4.1, revision `69cb78c9097cebd3bdb832d9fff8b7d23abce09e` | 2026-11-21T03:54:16Z |

Each binary has the SHA-256 and size of the binary that the Founder's run of B4 built on the same host at the reviewed head (section 6), whose tree is the release tree. On the MacBook it also equals the builder's gate binary.

MacBook, `/Users/michaeldaley/builds/madv-surface-0.1.2-record/RELEASE-BUILD.txt`, SHA-256 `2912c4bf154a7f2740b10024bbb0afd026d2746fb5d43433eba55d7c848fd44b`:

```
release build of madv-surface 0.1.2 under DEC-20261119-03 B7
host: macbook
binary: /Users/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
sha256: c9a9d800386a7c418f90d3597701c903914b93d152e9a09bae6f640e993f6725
bytes: 62292978
version: madv-surface 0.1.2
tag: v0.1.2; release commit: 05f2b35b813a322e60f4a5154cc5671e8319aada; tree: 3612903896a8f2c1fd1c2c4a57e3bee82139152d
built by bun: /Users/michaeldaley/.bun/bin/bun 1.4.2 revision 744846f844374847c902b5e7fd59b4342a51ef99 sha256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5
built at: 2026-11-21T03:56:06Z
```

Its `MANIFEST.sha256`, SHA-256 `183cf1a1365e1653a828a3e15cb200e0214952959dd768535cd504da834de00d`:

```
9b241b20b39fc0ad234eb207c7ecc7297e36fca501508f7710a8e65fece9b436  001-install.log
5245b310f17e861380e91e124f3ef66a9292ce911cd0aa3b99f4de322da413e7  002-build.log
119e5158131340e08529feb4d12a46f11708ec9af1c5ee4c6e2ae6ff5bda13d5  003-version.log
```

Ubuntu PC, `/home/michaeldaley/builds/madv-surface-0.1.2-record/RELEASE-BUILD.txt`, SHA-256 `4e6d89e79260e8d1cd939ff5d1f40b9692ac3a36c0433b84841a8b30e6d59f3c`:

```
release build of madv-surface 0.1.2 under DEC-20261119-03 B7
host: ubuntu
binary: /home/michaeldaley/builds/madv-surface-0.1.2/dist/madv-surface
sha256: 94537feb12c0d3918d25297ea34f6a55dc58e11ccfd7857856770b751bf263b7
bytes: 80573976
version: madv-surface 0.1.2
tag: v0.1.2; release commit: 05f2b35b813a322e60f4a5154cc5671e8319aada; tree: 3612903896a8f2c1fd1c2c4a57e3bee82139152d
built by bun: /home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun 1.4.1 revision 69cb78c9097cebd3bdb832d9fff8b7d23abce09e sha256 0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb
built at: 2026-11-21T03:54:16Z
```

The Founder's output of this run began at its manifest. The text above is rebuilt from the values of the run, and it is the only text with the recorded SHA-256 for any time of build from the merge on.

Its `MANIFEST.sha256`, SHA-256 `09d2a8948f7b0cb41f22108fdba3d078428d45e9b16a17e28e9fad51ecffe9b1`:

```
037c6137f559b0b536788b1583dd5720f8fac7b641aaba2a3b324df0fbd1cc83  001-install.log
d2685b3ee30d328f04176a96ba6864e3c3f8eb140b8fe9adc579bd5b53158fb9  002-build.log
90cfa057701ef9cd6fa675328db25eab6f534f195faa34fa1dfb2c3a6c664940  003-version.log
```

## 3. The build (`DEC-20261119-03` B1 to B3, Addenda 1 and 2)

- **Builder:** governed Codex 0.167.0 on the MacBook, Actor-Id `session:codex/surface-0.1.2-r1`, in `/Users/michaeldaley/builds/surface-0.1.2-r1`, on the branch `build/v0.1.2` from `91bfb38549bcab37740d2c4564c371ee390a63e7`, with the git identity `daley40-lab` and no GitHub call. It reported its harness as Codex and its model as GPT-6 by OpenAI, with the exact model identifier and the reasoning effort not shown.
- **Builder prompt:** SHA-256 `d8dfe09baa4b51f189d519a0e2814413e6693c84a603f300ef39859c8b90ad0a`, transfer commit `8c46e1a8b6942a5dbfb63fa6c252e1e8da78583b` of `MADVenturesLLC/madventures-tui`.
- **Baseline at the base:** after a wait whose qualifying reading was 1.81, in a run that began at a load of 2.52, 126 pass and 0 fail across 23 files, 2153 `expect()` calls, in 11.66 seconds (log 091, SHA-256 `3847f3545775f9313b1f1df7b88bc3a150c656ca0d7cab2a1a66e403ec7cf7aa`).

The halts, the asks and the Founder's texts that answered them, each from the transfer branch of `MADVenturesLLC/madventures-tui`:

| When | What the session reported | The Founder's text | SHA-256 | Transfer commit |
|---|---|---|---|---|
| Halt 1, before the baseline | how far the stop rule for a failing test at the baseline reaches (halt manifest, log 025, `790398737a0e79f66dfe90d7acedaab4ef474859f87f541645b9437afcea4a5d`) | resume message 1: any failure at the baseline is a stop | `5da9c2bf456145e42704ef1acaf2e07149a99843c8d034747cc967de8a0da938` | `d9ed03ef124124cc5532fd1b1d31f230e3cd9954` |
| Halt 2, after the baseline passed | it declined breaks 1, 2 and 7, which let a fragment of a key reach the local view or a tool run after a request that offered none (log 095, `995d16486d53bce7bcef9e32b41a8ef0b15481c82e98c1a72d20d532eeec3c0a`) | resume message 2: each declined break recorded in one line, and made by the Founder before the push | `70568ec5bb19d1196971a71d45cc8513f8d4a37ceb4c2e32e6e4873b04d6709c` | `62b249675c32fdf669e3cbfe854bfc77ac613c18` |
| Halt 3 | the log inventory of resume message 2 left out logs 001 to 025 and 096 | resume message 3: the cumulative manifest, log 114, `2e8367e7471f320c8f6e501956de0591743d01297da3dd45193002f4bc5fa092`, accepted | `418936c016ef1e55da3369601f0ecd688a80a1f5a662246ab093a7d4812a9bff` | `78e64ccb8c02eafe312e3c9afc30256dc3d8c3fd` |
| Asks 1 and 2 | the waits before S2 (log 162) and S3 (log 213) each ended after 20 minutes without a reading below 2.0 | `DEC-20261119-03` Addendum 1, the wait at 3.0 | `82340832ae8b482000536a40549f9ba84cc13e9b4434798188590092faaaf962` | `d19ed3b3a3fc4f41c338d1c43baf7656deebab97` |
| | | resume message 4, applying Addendum 1 from wait 236 | `d2d1b442ee23b7ed45b37881e3da9a3054674cfd6750e8ea2400273e0d09c0d8` | `d19ed3b3a3fc4f41c338d1c43baf7656deebab97` |
| Halt 4, at S3 | a test endpoint at `127.0.0.1` could not be verified without a change to `src/http.ts` (halt manifest, log 268, `d836de2c7e5012203c29c4cc2bf8d53deec52108a85fdd65a68e956d61275e57`) | `DEC-20261119-03` Addendum 2, B1 item 9: the TLS server name only for a host that is not an IP address | `32b83de9c7bc3a8a515b3fc4b22082ff8f042937a13e9ce404500d7027d07bbe` | `ce5cd1bfa6fa9534de3ec53194b752e92ec3f372` |
| | | resume message 5, applying Addendum 2 | `ef566fa3b5a5d87df80702984e75a11908c2702eb2bba65db2c97016c16f6d99` | `ce5cd1bfa6fa9534de3ec53194b752e92ec3f372` |

At S3, the run at `127.0.0.1` against the unchanged transport emitted `system/internal_error`, naming the address as a TLS server name that is not permitted (log 248, SHA-256 `27ba2bc3276d9788b2dbc1b91621c178159d27d92dadad8fdf4339ed06f0a28a`). A run of the same test at the IPv6 loopback address `::1` emitted `system/provider_error` with code `network_error`, exit 1 and no HTTP request, for a cause it did not establish (log 263, SHA-256 `d0d113d142a52ac2b616914ed3cad9b6b21dc2757583e5e35c1a8022778bdbac`).

| Commit | Subject | Paths |
|---|---|---|
| `4c08c622b30b6b82350f306b93ee8e9f50e38fc5` | docs: open the 0.1.2 build log with its task detail | `docs/build-log-0.1.2.md` |
| `2f8346814c445adbb0db2ee2f31eeed7e2b8344f` | test: catch a cut before redaction past the cap | `test/local-redaction-order.test.ts` |
| `14adb2bb55721cccbbc4f3f71e2e6bd6fddd3d51` | fix(domain): refuse every model id that contains claude | `src/domain.ts`, `test/embedded-claude-ids.test.ts` |
| `199b52c9ed86577764e1ae42681b4a5525bad5fa` | test(tls): verify a second host name, so a fixed name fails | `src/http.ts`, `test/fixtures/tls/README.md`, `test/fixtures/tls/loopback-ip.key`, `test/fixtures/tls/loopback-ip.pem`, `test/tls.test.ts` |
| `502a39b9e22d3f966d98fc419fc0d095d0678f0d` | feat: offer the model no tools with --no-tools or a first no_tools | `src/agent.ts`, `src/cli.ts`, `test/no-tools.test.ts` |
| `9f26d3b46efd8e9ea9792f12eaac47c792208bc5` | chore(release): version 0.1.2 | `README.md`, `docs/registration-proposal.md`, `package.json`, `test/new-profiles.test.ts` |
| `341eb058f537c887aa599f5051e0437f57bcc6bf` | docs: complete the 0.1.2 build log | `docs/build-log-0.1.2.md` |

What the items of `DEC-20261119-03` B1 became:
1. **A tool-free run (item 1):** the flag `--no-tools`, valid with either role. Every request of the run offers no tools, `system/init` names an empty list, and the system prompt says "No tools are available. Answer in text." With `--allow-shell`, in either order, it is a usage error, exit 2. The help lists it: `--no-tools                Offer no tools and answer in text. Valid with either role.`
2. **A tool-free first message (item 2):** a top-level `no_tools` `true` on the first accepted user message makes that message's requests offer no tools. A later `true` is not run and emits `system/input_ignored` with reason `no_tools_not_first`; a value other than `true` or `false` is not run and emits `system/input_ignored` with reason `invalid_no_tools`, and the next message can still be the first.
3. **No tool without tools (item 3):** a tool call in a response to a request that offered no tools ends the run before any tool runs, with `system/provider_error` code `unexpected_tool_call`, an error `result` and exit 1.
4. **The Anthropic rule (item 4):** at line 19 of `src/domain.ts`, from `/(?:^|[/:.])claude|anthropic/i` to `/claude|anthropic/i`. Of the 35 pairs of the five ids `minimax-claude-x`, `qwen-claude`, `vendor_CLAUDE`, `vendor+ClAuDe` and `preclaudepost` on the seven profiles, the base accepted 6 under another maker and refused 29 as `unknown_family`; the head refuses all 35 as `anthropic_model`. A MiniMax mock response naming `minimax-claude-x` exited 0 at the base and exits 7 at the head.
5. **The server name (item 9, Addendum 2):** at line 239 of `src/http.ts`, `...(isIP(url.hostname) === 0 ? { servername: url.hostname } : {}),`, with the import of `isIP` from `node:net`. The fixture `test/fixtures/tls/loopback-ip.pem`, signed by the folder's test certificate authority, names `127.0.0.1` and `::1`, is valid from 2026-11-20 to 2076-03-02, and has SHA-256 `092c5c2fd1b331279fbc4121adc2bb7cff09981c3a6492e7618d221d4e808a22`. Both new TLS tests failed against the unchanged transport (log 287, SHA-256 `8dbf2064a3a855abaaad1417eadbb981fa91eaa0d8c7676523b429e754aee6e7`) and passed after the change (log 292, SHA-256 `352f4e71c4b921c2ff9c699ee22fb0b465a5aa2b627aed1d0f8ffc586ec64878`).
6. **The tests (item 5):** sixteen new tests. Ten in `test/no-tools.test.ts`. Two in `test/embedded-claude-ids.test.ts`, for item 4. Two in `test/local-redaction-order.test.ts`, whose keys span the 200,000-character cap of `read_file` and of `list_dir` and run 272 and 275 characters past it. Two in `test/tls.test.ts`: a reviewer turn at `127.0.0.1` that reports `127.0.0.1` as `tls_verified_host` on every `model_response`, and a refusal at `127.0.0.1` of a trusted certificate that names only `localhost`, before any HTTP request.
7. **The version and the documents (items 6 and 7):** version 0.1.2 in `package.json`, `README.md`, `docs/registration-proposal.md` and the User-Agent expected by `test/new-profiles.test.ts`. `README.md` and `docs/registration-proposal.md` describe items 1 to 4. `docs/samples/README.md` is unchanged: it already says that the sample streams were recorded with 0.1.0.

The builder's breaks, each in the working tree only, each failing its target tests while the others passed, and each restored to the file's SHA-256:

| Break | File | Result | Restored file SHA-256 |
|---|---|---|---|
| 3, the limited Anthropic rule of the base | `src/domain.ts` | both tests of `test/embedded-claude-ids.test.ts` fail; the ten-id test of 0.1.1 still passes | `a9f3d813f9aeb3b31f2376b6f8ad104199cf73034d07ad160be54435b4b45703` |
| 4, `localhost` for a recorded host | `src/http.ts` | the reviewer turn at `127.0.0.1` fails; the other seven TLS tests pass | `9faf910315374d98c747ad3e5392aef3be810ab3204e4ec1e14e0d9ea9a9937f` |
| 5, the role's tools kept under the flag | `src/cli.ts` | six tests fail; the four tests of the field pass | `77a9229529ef8fa4c4d200957c8e128e8002a52cc215e8befbe51ffe85acda58` |
| 6, the role's tools kept on a first flagged message | `src/agent.ts` | four tests fail; the six tests of the flag pass | `56bce10909484a2d480face6c4bd06a04d5b8efce6ce15c6c16ba553809627ef` |

It declined breaks 1, 2, 7 and 8, recording each in one line; the Founder made them (section 5).

The gates of B3, each once at the head, under Bun 1.4.2: the frozen install with `bun.lock` unchanged; `bun run typecheck` printing only its command; after a wait whose qualifying reading was 2.88, `bun test --timeout 20000`:

```
 142 pass
 0 fail
 2285 expect() calls
Ran 142 tests across 25 files. [10.60s]
```

The comparison of the head's test list with the base's: all 126 base tests present under their files and names, and 16 tests and 2 files added, none skipped or marked todo. `bun run build` gave a binary that prints `madv-surface 0.1.2` and lists `--no-tools` in its help, SHA-256 `c9a9d800386a7c418f90d3597701c903914b93d152e9a09bae6f640e993f6725`, 62,292,978 bytes. `bun run build:test` passed, `git diff --check` was clean, and the changed paths are exactly the sixteen.

| Builder file | SHA-256 |
|---|---|
| `docs/build-log-0.1.2.md` at the head | `ca9f9120efb470de1e7dd475328cba8244cda2190865f9c872eed92e6597e018` |
| `pr/pr-body.md`, the pull request description, 30,158 bytes | `04df97ccdb96c2ada0615fd7d38d756743ad7a169e8c6d088faed7b720210e61` |
| `pr/pr-title.txt` | `d1945ffd1e4b7e493636f36a9857fcb3523ef951aa3b8c4e667a0d701bb3bc6c` |
| `pr/final-report.md` | `d328abe9ecb73d038f803a6782fc2cae2e4b26fff02efbf8465ada769b8da901` |
| `logs/420-cumulative-final-manifest.log` | `0f755c4526e2781fa53a2569c13e1f91f4eca51651c1e62f4dede0f95b74e051` |

The deviations the description lists, besides the halts and asks above: the first run of the baseline began at a load of 2.52 after a wait that passed at 1.81; it reported `functions.send_message_to_user_async` among its tools and never called it; the sandbox refused a second copy of a log to `/dev/stderr`, and the first was kept and verified; the MacBook's `openssl` has no `-ext` option, and the certificates' names were read from `-text`; one `exec` input had a syntax error before any command in it ran; the tests of S2 moved to `test/embedded-claude-ids.test.ts`, and `test/claude-ids.test.ts` was restored byte for byte; a commit message line of 259 characters, found at log 143 and corrected before the commit at log 145; an edit of S2 that matched no text at log 159 and was applied at log 160; a typecheck of S4 at log 341 before its commit; and working copies prepared in a disposable folder.

## 4. The Founder's check of the session record

Posted on pull request 3 as comment 7054067231, before the push. The check is `h2-record-check.mjs`, SHA-256 `c1834dcc689e94cf57fb123a09a0600225d8e97b428c648f14276136e3dd383f`, from transfer commit `730df3014bf31d2dc0770cb4d30a4a4a79e30afe`. Its self-test gave `self-test cases: 66; not as expected: 0` and `SELFTEST_OK`. Its evidence folder is `/Users/michaeldaley/builds/surface-0.1.2-record-check/final-20261121T002412Z`, whose `MANIFEST.sha256` has SHA-256 `f043d41acae8f31e2066949acd00ee91bef1fd6cdf7044aa127549c95564dd15`. Its output:

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

The count of code from a string, `b4-count.mjs`, SHA-256 `2dcff5987b35e4a1e7c60e1b9229f32f7ebca58376ea0af0d39ba2b6ef647689`:

```
records: 1
record: rollout-2026-11-20T06-51-03-01a1f8cb-ba49-75f0-8eef-97ecc7166f8d.jsonl
exec inputs: 144; not parsed: 0; occurrences of the six names, as any substring, in all of them: 0; calls of eval 0, Function 0, load 0, store 0; calls through a computed callee 0
B4_OK
```

## 5. The Founder's breaks

Posted on pull request 3 as comment 7054067610, before the push. Each was made in the working tree of a fresh clone at `341eb058f537c887aa599f5051e0437f57bcc6bf` on the MacBook under Bun 1.4.2, run alone against the file that holds its test, and restored, with the file's SHA-256 equal to the committed one and `git status` clean. Logs: `/Users/michaeldaley/builds/surface-0.1.2-founder-breaks/logs`, `MANIFEST.sha256` SHA-256 `116396e0f84a81be8616a950fbb8afafed517616b9b1a9df1994c081e57f54f8`.

| Log | Break | File | Test that failed | Run | Restored file SHA-256 |
|---|---|---|---|---|---|
| `01-read-file-cap-25` | 1, redaction after a cut at the cap plus 25 characters | `src/tools.ts` | read_file redacts a key extending at least 256 characters past the cap | 3 pass, 1 fail | `d9096341b5577997ddf17f0ff7ab0c058fba891bd6ceb9938d943a6ded88be28` |
| `02-list-dir-cap-25` | 1, the same for `list_dir` | `src/tools.ts` | list_dir redacts a key extending at least 256 characters past the cap | 3 pass, 1 fail | `d9096341b5577997ddf17f0ff7ab0c058fba891bd6ceb9938d943a6ded88be28` |
| `03-read-file-cap-255` | 2, redaction after a cut at the cap plus 255 characters | `src/tools.ts` | read_file redacts a key extending at least 256 characters past the cap | 3 pass, 1 fail | `d9096341b5577997ddf17f0ff7ab0c058fba891bd6ceb9938d943a6ded88be28` |
| `04-list-dir-cap-255` | 2, the same for `list_dir` | `src/tools.ts` | list_dir redacts a key extending at least 256 characters past the cap | 3 pass, 1 fail | `d9096341b5577997ddf17f0ff7ab0c058fba891bd6ceb9938d943a6ded88be28` |
| `05-break-7-tool-call-runs` | 7, the check of a tool call under no tools removed | `src/agent.ts` | both tests of a tool call under `--no-tools` and under a first-message `no_tools` | 8 pass, 2 fail | `56bce10909484a2d480face6c4bd06a04d5b8efce6ce15c6c16ba553809627ef` |
| `06-break-8-ip-identity-skipped` | 8, no identity check for an IP-address host | `src/http.ts` | an IPv4 reviewer connection refuses a trusted localhost-only certificate before any HTTP request | 7 pass, 1 fail | `9faf910315374d98c747ad3e5392aef3be810ab3204e4ec1e14e0d9ea9a9937f` |

## 6. The Founder's runs at the head (`DEC-20261119-03` B4)

Each ran from a fresh clone detached at `341eb058f537c887aa599f5051e0437f57bcc6bf`, in a plain terminal, on 2026-11-21: `bun install --frozen-lockfile`, `bun run typecheck`, `bun test --timeout 20000` after a load wait, `bun run build`, `./dist/madv-surface --version` and `./dist/madv-surface --help`. Each command exited 0, the typecheck printed only `$ bun x tsc --noEmit`, the binary printed `madv-surface 0.1.2`, and its help listed `--no-tools`.

| Host | Bun | Load wait before the tests | Binary SHA-256 | Bytes | Log manifest SHA-256 |
|---|---|---|---|---|---|
| MacBook | 1.4.2, `/Users/michaeldaley/.bun/bin/bun` | passed at 00:43:17Z at 2.93 | `c9a9d800386a7c418f90d3597701c903914b93d152e9a09bae6f640e993f6725` | 62,292,978 | `1c13b9008ace0796cd83eb940f1bb224b036de171a01b430658eb27b9027972b` |
| Ubuntu PC | the custodied 1.4.1 | passed at 00:49:04Z at 0.86 | `94537feb12c0d3918d25297ea34f6a55dc58e11ccfd7857856770b751bf263b7` | 80,573,976 | `4dee92355fea747de241c6d58eaaede769b490cf838c0a246af4c7a2dd506700` |

MacBook, `003-test.log`:

```
 142 pass
 0 fail
 2285 expect() calls
Ran 142 tests across 25 files. [12.69s]
```

Ubuntu PC, `003-test.log`:

```
 142 pass
 0 fail
 2278 expect() calls
Ran 142 tests across 25 files. [8.31s]
```

On both hosts the TLS test printed:

```
tls requests=3 distinct_client_ports=1 reuse_observed=true reused_response_assertion=ran
```

On the Ubuntu PC, `006-help.log` holds 3,169 NUL bytes from offset 135, before the full help text and `command_exit=0`, as section 8 of the review records from its log 023. Their cause is not established.

MacBook, `MANIFEST.sha256`:

```
e0d2fc812ee51748266aefbb793651d021acc01bb3e82a5d498016cabbc138da  001-install.log
408f34fc6e6e1504c3e02425ac06a102a9c90e16e3b2e1b7fb26d30aac7586dd  002-typecheck.log
58d953ee33d15acfedbf64ac00a040ab15b39c9f36aa8e0ff9ccd9acf57f4ada  003-test.log
c2171badbf236068efb08f521131658fa88feef2324a97cc1e91d60fdb894b12  004-build.log
7de3f0fa3e5cb2c3478c2c90d07e15b53d953794ab7082e895452a18b2d8169a  005-version.log
c3dc8980f56837bda91e3dd15ccea2ac141f8af3a6b221b85c56a10e689e88e6  006-help.log
```

Ubuntu PC, `MANIFEST.sha256`:

```
5d6d5d5d33ad7fab2951d4a17f1fd41f3f956029d1a1e15619f0805fc8133d32  001-install.log
205aaebc63b77512bee8fbc21bfef381b1291191143b6c5966f7808618265c1a  002-typecheck.log
e87e9c841e222159f6d85e85342c892e374ba5ededbd1b1d8807e26e481b772b  003-test.log
58c2e497064bc4c430234d3860f0aa5366798107c9678aae87784d28fbc4ee6c  004-build.log
871738b7a20fe3ff1fee0a9ba73190c1a1a50b276672f3015869658dcc0d7aa7  005-version.log
5aae0a088ff1c1de295af18a4e003cc9d09a3c1347f40ce7afb66bab86dcdea8  006-help.log
```

## 7. The review (`DEC-20261119-03` B5)

| Item | Value |
|---|---|
| Reviewer | `antigravity`, a fresh session in Antigravity on the MacBook; the report records the model as not shown |
| Head reviewed | `341eb058f537c887aa599f5051e0437f57bcc6bf` |
| Review prompt | SHA-256 `cae856afcfb294f2dcde2b257fe5105054a2f7e810349d369bdec3532ca54315`, transfer commit `f8d5bd7debe25915f6ced1c80914adc711865fcf` |
| Report | `/Users/michaeldaley/builds/review-surface-0.1.2-r1.md`, SHA-256 `0c24ddd8ff4f072b7e07430b5de31fba5b3b6f907b7d749d1da5b4c3c37c5f72`, 614 lines, 59,073 bytes |
| Verdict | PASS, items 1 to 13 PASS, no SUBSTANTIVE and no ADVISORY finding, two findings NOT COUNTING, one disagreement between the prompt and the acts |
| Posted | comments 7056131487 and 7056131738 on pull request 3, by `decivantiq`, 2026-11-21 02:44:30Z and 02:44:31Z; the two parts joined in order are the report byte for byte |
| Counting | under no rubric milestone, no round (`DEC-20261119-03` B5) |

The items: 1 scope and attribution; 2 the redaction-order margin; 3 the Anthropic rule; 4 the second verified host name; 5 the tool-free run and first message; 6 the version and the documents; 7 the breaks; 8 the gates and the load; 9 no live call and no key; 10 the evidence against the logs; 11 the Founder's runs; 12 the Founder's check; 13 the halts and deviations the description lists.

The Founder's check of Phase 3B plan §2C passed on the report before it was posted. It found each of the report's 25 quoted blocks in the source it names; each of the 52 files of the reviewer's log and scratch folders, 49 logs and 3 scripts, listed in section 7 with a matching SHA-256; the one re-read after compaction, log 049, showing the prompt's SHA-256; the clone at the head and clean; the prompt, the description and the five evidence folders unchanged; and no token-shaped line in the report.

The reviewer's nine mutations of the head, M1 to M9, each failed a test. Its findings:
1. **Finding 1, NOT COUNTING (item 6):** `README.md` describes the 0.1.2 rule and `unexpected_tool_call` under its changes in 0.1.2, but its lines 114 to 116 still state the 0.1.1 rule, and the row of `system/provider_error` in its table of events, line 216, does not list `unexpected_tool_call`. Classed as an editorial clarification that does not change behaviour or required evidence.
2. **Finding 2, NOT COUNTING (item 5):** every test that sends a later `no_tools` `true` also sends `no_tools` `true` on the first message, so no test sends a later one after a first message without it. Classed as a supplementary test of behaviour that is correct and covered.

Section 9 records one disagreement: the review prompt set a wait below 3.0, where `DEC-20261115-01` B9 gives a review prompt for the MacBook the load rule of `DEC-20261102-02` B4, to record the load and not wait. The reviewer recorded the load before every command that starts Bun and also ran the prompt's waits, logs 021, 030 and 038. Two runs began at 3.0 or more: mutation 9 at 3.09, which failed on a fixed assertion of the system prompt's text, and attempt 1 at 3.56, which passed. The Founder accepted the verdict as given in comment 7056131487.

Section 5 records five attempts that keep every test the reviewer ran passing, each restored afterwards:
1. **Attempt 1, item 2** (log 037): in `capBoth` of `src/tools.ts`, cutting the text at the cap plus 280 characters before redaction. 4 pass, 0 fail, because the test keys run 272 and 275 characters past the cap.
2. **Attempt 2, item 3** (log 042): the rule `/(?:^|[/:._+-]|pre)claude|anthropic/i`, written to the prefixes of the tested ids. 9 pass, 0 fail, while `glm-5claude` on `zai` resolves to `zhipu`.
3. **Attempt 3, item 4** (log 043): reporting `127.0.0.1` for any IP-address endpoint and `localhost` for any other, in place of the verified host. 8 pass, 0 fail, because the tests use only those two names.
4. **Attempt 4a, item 5** (log 044): offering the role's tools from the second turn of a message under `--no-tools`. 10 pass, 0 fail; no message without tools reaches a second turn, since the first either fails on a tool call or ends.
5. **Attempt 4b, item 5** (log 045): counting a message as the first only when it carries `no_tools` `true`. 10 pass, 0 fail; the path of finding 2.

## 8. Ready, Copilot and merge

| Time, 2026-11-21 (UTC) | Event on pull request 3 |
|---|---|
| 00:24:19Z | Opened as a draft by the Founder's guarded command, as `decivantiq`, after it pushed `build/v0.1.2` at the head |
| 00:24:23Z and 00:24:24Z | The check of section 4, comment 7054067231, and the breaks of section 5, comment 7054067610 |
| 02:44:30Z and 02:44:31Z | The verdict, comments 7056131487 and 7056131738 |
| 03:03:37Z | Marked ready by the Founder's guarded command, as `decivantiq` |
| 03:03:39Z | GitHub requests a review by Copilot in the name of `decivantiq`; the Founder's command made no such request |
| 03:06:27Z | Copilot's review 6002455016 at the head, `COMMENTED`, "Changes recommended", with one comment, 4650214135, on line 239 of `src/http.ts` |
| 03:35:05Z | The merge authorization, comment 7056702446, equal to the signed text with SHA-256 `bf3b457187cfc11abfa8218ed83d4dc1d289f11f5aed06eaab7ef68a478e8546`, transfer commit `7664882035a3e03500ba69fe8f7d8771043dbda3`; it does not name Copilot's review |
| 03:35:10Z | Merged by merge commit `05f2b35b813a322e60f4a5154cc5671e8319aada`, as `decivantiq`; the command then checked the parents, the tree and the sixteen paths, and created the tag `v0.1.2` |

## 9. Copilot's comment and the release

Comment 4650214135 says that `URL.hostname` keeps the brackets of an IPv6 address, so that `isIP` returns 0 for `[::1]` and the request still sends the server name `[::1]`, and proposes removing the brackets before `isIP`. At the release commit:
- line 239 of `src/http.ts` sets the server name only when `isIP(url.hostname)` is 0, and line 45 admits `[::1]` and `::1` as loopback test endpoints;
- in the drafting assistant's container, under Bun 1.4.4, which is not a certification host's, `new URL("https://[::1]:1").hostname` is `[::1]` and `isIP` of it is 0;
- `bun run build` defines `MADV_SURFACE_TEST_BUILD` as `"0"` (line 11 of `package.json`), and in such a build `resolveEndpoint` refuses `MADV_SURFACE_TEST_ENDPOINT` and `MADV_SURFACE_TEST_CA` (lines 69 and 70 of `src/http.ts`);
- every host of the seven profiles of `src/profiles.ts` is a DNS name: `api.z.ai`, `api.kimi.ai`, `api.minimax.io`, `coding-intl.dashscope.aliyuncs.com`, `ollama.com`, `opencode.ai` and `api.mistral.ai`.

So an IPv6 test endpoint still has its address sent as the server name, and a release binary sends no request to an IP-address host. The result of the builder's log 263 is consistent with this cause; nothing has shown that it is the cause.

## 10. The raw evidence kept

| Host | Folder | What it holds |
|---|---|---|
| MacBook | `/Users/michaeldaley/builds/surface-0.1.2-r1` | the builder's folder: prompt, logs, PR files, clone |
| MacBook | `/Users/michaeldaley/builds/surface-0.1.2-record-check/final-20261121T002412Z` | the check of section 4, `MANIFEST.sha256` `f043d41acae8f31e2066949acd00ee91bef1fd6cdf7044aa127549c95564dd15` |
| MacBook | `/Users/michaeldaley/builds/surface-0.1.2-founder-breaks` | the breaks of section 5, `MANIFEST.sha256` `116396e0f84a81be8616a950fbb8afafed517616b9b1a9df1994c081e57f54f8` |
| MacBook | `/Users/michaeldaley/builds/surface-0.1.2-b4-macbook` | the run of section 6, manifest `1c13b9008ace0796cd83eb940f1bb224b036de171a01b430658eb27b9027972b` |
| Ubuntu PC | `/home/michaeldaley/builds/surface-0.1.2-b4-ubuntu` | the run of section 6, manifest `4dee92355fea747de241c6d58eaaede769b490cf838c0a246af4c7a2dd506700` |
| MacBook | `/Users/michaeldaley/builds/review-surface-0.1.2-r1` and `/Users/michaeldaley/builds/review-surface-0.1.2-r1.md` | the review folder and the report of section 7 |
| MacBook | `/Users/michaeldaley/builds/madv-surface-0.1.2` and `/Users/michaeldaley/builds/madv-surface-0.1.2-record` | the release build of section 2 and its record |
| Ubuntu PC | `/home/michaeldaley/builds/madv-surface-0.1.2` and `/home/michaeldaley/builds/madv-surface-0.1.2-record` | the release build of section 2 and its record |
