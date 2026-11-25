## Correction round 1

The new head is `2fb92148c361ab7434d1e62e87cdeb9e59842b3f`. The test commit `d8818704410a72e277fc05a3a40535528b5da710` follows the reviewed head `4630152f763baca0259d84c0d5817d0cea501145`. The second commit appends the correction record. All 2,089 tests pass across the same 160 files. All 11 new tests failed on their prescribed breaks, and all six breaks were restored. Production changes in the correction diff: zero.

Addendum 3 SHA-256 `b7ff8171407289c4b4db9be9c76dfa049fdd8b0fe4f80076613f9aa6b48e43f7`. Resume message SHA-256 `3a05d0983a06b908afcae236f0e57a0816d0a31c99b4f935319dab11e41961fa`. First review report SHA-256 `882bb886a52bdfc6064af8fba96c7e986f6eaa4f778e266c076613bca2fecfae`. The Founder counted the two substantive missing-test findings as M1’s first correction round.

1. The original Claude Code tests exercised the detector separately. They did not supply either registered api_retry error to the attester during attestation or after handover. The new tests cover both errors at both stages.
2. The original madv-surface attester tests supplied neither the system/auth_failed event during attestation nor a nonzero exited fact. The new tests require the returned cause and parserReason for the event, registered exit codes 5 and 9, and provider exit code 1 before model_response.
3. The first build log omitted an account of six unused log numbers. The receipt account below records the gaps.
4. The previous B19 test could pass if skillOverrides accepted on. The new preflight test requires auth_not_ready for on, OFF and an empty string.
5. The previous cancellation test used the caller's abort signal. The new scenario holds back the offline child's reply in cancel mode and exercises SIGINT and SIGTERM independently. It checks sole listener ownership, cancellation, both process groups ending, and restoration of both signal listener counts.

The pre-commit typecheck in log 942 found that the expected madv-surface causes had widened to string. Log 945 records the type-only as const change to the new test table. The file passed again in log 948 and log 951 records the silent passing typecheck.

| Finding | File | Test |
| --- | --- | --- |
| 1 | packages/adapter-claude-code/test/live.test.ts | Claude attestation reports auth_failed for authentication_failed |
| 1 | packages/adapter-claude-code/test/live.test.ts | Claude attestation reports auth_failed for oauth_org_not_allowed |
| 1 | packages/adapter-claude-code/test/live.test.ts | Claude monitor reports auth_failed for authentication_failed after handover |
| 1 | packages/adapter-claude-code/test/live.test.ts | Claude monitor reports auth_failed for oauth_org_not_allowed after handover |
| 2 | packages/adapter-madv-surface/test/live.test.ts | madv attestation reports auth_failed for exit code 5 before model_response |
| 2 | packages/adapter-madv-surface/test/live.test.ts | madv attestation reports auth_failed for exit code 9 before model_response |
| 2 | packages/adapter-madv-surface/test/live.test.ts | madv attestation reports auth_failed from the surface's system/auth_failed event |
| 2 | packages/adapter-madv-surface/test/live.test.ts | madv attestation reports provider_error for exit code 1 before model_response |
| 4 | packages/supervisor/test/preflight.test.ts | preflight refuses skillOverrides strings other than off as auth_not_ready |
| 5 | test/phase3b/composition.test.ts | composition cancels startup on SIGINT and restores both signal listener counts |
| 5 | test/phase3b/composition.test.ts | composition cancels startup on SIGTERM and restores both signal listener counts |

### Correction verification

The full run at `d8818704410a72e277fc05a3a40535528b5da710` passed. The final frozen install preserved bun.lock, SHA-256 a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830. The final typecheck exited zero with empty output. The bare test at `2fb92148c361ab7434d1e62e87cdeb9e59842b3f` matched the full run file for file and test for test.

Bare bun test. 985-round-gate-suite.log, SHA-256 7fe851ef1423488d79c9066d59b5b1bc57362a334ee26ca59b9e7a8c9cb97436.

```text
 2089 pass
 0 fail
 27982 expect() calls
Ran 2089 tests across 160 files. [253.42s]
```

987-round-gate-compare.log, SHA-256 dd1dde86c9ddb3ee704ea055f4a840b490221d2acb9f78479ab5a39da2690d73
Every one of the 2048 baseline and 2078 first-head file/name pairs is present and passing.
2078 + 11 = 2089 tests. 151 + 9 + 0 = 160 files. Zero failures, skips or todos.
Every added test failed a targeted break and passed in its file and in the whole suite.
075-base-list.log 501aae2c5064e2f3e0b761685485ede9a89d75c35db6946dc94ff95d6c243a63
788-full-test-list.log 4bfd4435ff6f71ca87be0fd8cd124903c2702f0f396d1c1678196207f3ed57a8
985-round-gate-suite.log 7fe851ef1423488d79c9066d59b5b1bc57362a334ee26ca59b9e7a8c9cb97436
packages/adapter-claude-code/test/live.test.ts | Claude attestation reports auth_failed for authentication_failed | pass
packages/adapter-claude-code/test/live.test.ts | Claude attestation reports auth_failed for oauth_org_not_allowed | pass
packages/adapter-claude-code/test/live.test.ts | Claude monitor reports auth_failed for authentication_failed after handover | pass
packages/adapter-claude-code/test/live.test.ts | Claude monitor reports auth_failed for oauth_org_not_allowed after handover | pass
packages/adapter-madv-surface/test/live.test.ts | madv attestation reports auth_failed for exit code 5 before model_response | pass
packages/adapter-madv-surface/test/live.test.ts | madv attestation reports auth_failed for exit code 9 before model_response | pass
packages/adapter-madv-surface/test/live.test.ts | madv attestation reports auth_failed from the surface's system/auth_failed event | pass
packages/adapter-madv-surface/test/live.test.ts | madv attestation reports provider_error for exit code 1 before model_response | pass
packages/supervisor/test/preflight.test.ts | preflight refuses skillOverrides strings other than off as auth_not_ready | pass
test/phase3b/composition.test.ts | composition cancels startup on SIGINT and restores both signal listener counts | pass
test/phase3b/composition.test.ts | composition cancels startup on SIGTERM and restores both signal listener counts | pass

File, name and result list: 986-round-gate-list.log, SHA-256 2b4d7d6b9b2e0000f1442c1f8cb8292a0ada47fb61a77b192cfb0c152f620770.

| Log | Command | Uptime and load | UTC start / end | Exit | SHA-256 |
| --- | --- | --- | --- | --- | --- |
| 978-round-gate-runtime.log | runtime_check | 9:19  up 4 days, 47 mins, 1 user, load averages: 1.40 2.12 2.76 | Wed Nov 25 14:19:53 UTC 2026 / Wed Nov 25 14:19:53 UTC 2026 | 0 | ad8ecb72cc35ee85f0713b31670cdac2f51961450b2392b3e904cbe24fe880a7 |
| 979-round-gate-lock-before.log | check_lock | 9:19  1 user, load averages: 1.40 2.12 2.76 | — | 0 | bfbef23d940f6fdf106f46d8e3abe00c7c037c0ce603b6d685c1aee65ddedbbd |
| 980-round-gate-install.log | checked bun install --frozen-lockfile | 9:19  up 4 days, 47 mins, 1 user, load averages: 1.40 2.12 2.76 | Wed Nov 25 14:19:55 UTC 2026 / Wed Nov 25 14:19:55 UTC 2026 | 0 | 61cc5700a5a8d48489f09fbba8bbe31ab94d89ca82be43504777940c2fc58d7c |
| 981-round-gate-lock-and-state.log | check_install | 9:19  1 user, load averages: 1.40 2.12 2.76 | — | 0 | 8daa267a8eeaa8d6c13adc3544c153c53baee3a0dd6dc886c2965a837876a501 |
| 982-round-gate-types.log | checked bunx tsc --noEmit | 9:19  up 4 days, 47 mins, 1 user, load averages: 1.37 2.10 2.75 | Wed Nov 25 14:19:57 UTC 2026 / Wed Nov 25 14:20:00 UTC 2026 | 0 | ffcfdf2af20ae0b32d5367dc35cab334de0b33e4c1f3f0e9b40d2f9b257301a8 |
| 983-round-gate-suite-runtime.log | runtime_check | 9:20  up 4 days, 47 mins, 1 user, load averages: 1.24 2.04 2.72 | Wed Nov 25 14:20:10 UTC 2026 / Wed Nov 25 14:20:10 UTC 2026 | 0 | 130895df9730be73deda1643fbd32e0574c57f5f814c5681a1f8d62b31f6c4b7 |
| 984-round-gate-wait.log | wait_for_load | 9:20  up 4 days, 47 mins, 1 user, load averages: 1.54 2.09 2.74 to 9:20  up 4 days, 47 mins, 1 user, load averages: 1.54 2.09 2.74 | — | 0 | 861cca03931be765b38b5594885e39c43d662287b9a1883c90ff697278f4c320 |
| 985-round-gate-suite.log | checked bun test | 9:20  up 4 days, 47 mins, 1 user, load averages: 1.54 2.09 2.74 | Wed Nov 25 14:20:12 UTC 2026 / Wed Nov 25 14:24:26 UTC 2026 | 0 | 7fe851ef1423488d79c9066d59b5b1bc57362a334ee26ca59b9e7a8c9cb97436 |

Finding 1: ignore registered Claude authentication failures. Failed: Claude attestation reports auth_failed for authentication_failed, Claude monitor reports auth_failed for authentication_failed after handover, Claude attestation reports auth_failed for oauth_org_not_allowed, Claude monitor reports auth_failed for oauth_org_not_allowed after handover. 894-claude-break-test.log, SHA-256 088a9445a65f7e1e8b1edc08502e05b23e93f00f89ef26d90295e5d9518c93c7. Restore: 895-claude-restored.log, SHA-256 949c2b341cdad522005533055db297f3fb5f05f1447ade17bd13b1e44dbabd37.

Finding 2: remove handling of child exit. Failed: madv attestation reports auth_failed for exit code 5 before model_response, madv attestation reports auth_failed for exit code 9 before model_response, madv attestation reports provider_error for exit code 1 before model_response. 903-exits-test.log, SHA-256 4139c60ac41c378555086ce3f6b92a3e97722283f052c4287914e75beaf33a8e. Restore: 904-exits-restored.log, SHA-256 c593f2e168186e71609ace8b4acd0eb94c2112eaa77f21d637f086ecb7bae7ee.

Finding 2: ignore the alternate registered exit code. Failed: madv attestation reports auth_failed for exit code 9 before model_response. 908-registered-test.log, SHA-256 5d24f86b10ded823cc7cd51f68978596e8e4ffcdb1da4cecde5df769da16a0d6. Restore: 909-registered-restored.log, SHA-256 f797a5eb265940450e6effec933d8f81e179c89c77c11a0cb8d7d44536c45a2b.

Finding 2: ignore the parsed authentication failure. Failed: madv attestation reports auth_failed from the surface's system/auth_failed event. 913-event-test.log, SHA-256 bb1451b9318bcd46481fce4627f57b725c03fe248934b57ae13623f7b7e09e15. Restore: 914-event-restored.log, SHA-256 c266d02f44ac99bbb3d41ad28e2cf783e5032ce5866ac29ae51369dad216aa79.

Finding 4: admit on as a skill override. Failed: preflight refuses skillOverrides strings other than off as auth_not_ready, preflight refuses skillOverrides strings other than off as auth_not_ready. 922-override-test.log, SHA-256 1da22f1c58c5d5e677260b86dffa392b8c955a5ee29da4c4b47ff62dd2f18357. Restore: 923-override-restored.log, SHA-256 10aee7589c3c8fdea058c812888fa61dface7d7f64cf6bc67abaeee2e9fd50ea.

Finding 5: remove the composition's two signal listeners. Failed: composition cancels startup on SIGINT and restores both signal listener counts, composition cancels startup on SIGTERM and restores both signal listener counts. 935-signals-break-test.log, SHA-256 185c10072e7a2fdc036d95f6abc2e9f36b69ab44dc5d2ee714d81e5a06b38f7e. Restore: 936-signals-restored.log, SHA-256 b4cc361417b02c07e6cb54618c9ca7ab12e1d083f8a9523e0f5cffff4a2a9963.

245: no receipt occupies this number between 244 and 246. The logs establish no reason for leaving it unused.
436, 437, 438 and 439: the wait in 435 reached 20 minutes and exited 75 before the test could start. The next existing receipt is 440. No log assigns a separate operation or reason to each of the four numbers.
466: the wait in 465 reached 20 minutes and exited 75 before the test could start. The next receipt is 467. No log independently assigns an operation to 466.
124: the Founder deleted the diagnostic log under Addendum 1 B3 after verifying SHA-256 7294cb12c91044601c50df986f5566f930178b53dc3fd46dcef26300f8a34044.

tui/docs/verification/phase-3b-m1-build-log.md  SHA-256 6875e61781cba21806929e72ef1431c633003c466d01099cbf4530f5a1acdee9

tui/docs/verification/phase-3b-m1-evidence.md  SHA-256 3dc677145aabdfb10446d3b505575d6690ca3b08fa07057dd108c4343b7f5d28

The Founder identified the previous model and effort as gpt-6.2-astra at xhigh. The current harness displayed neither a more specific GPT-6 model identifier nor a reasoning effort. All correction tests used synthetic streams or disposable stand-ins.

The Founder checks the entire session record, including the resumed turns. No builder break was declined. The Founder then decides whether to push the two correction commits without force and replace the description on draft PR 254. Verify and Verify (macOS), the Founder's B24 runs from fresh clones on both hosts, and the second Tier-2 review under Addendum 3 B8 follow at the new head.

## First reviewed head

## Offline composition and attestation

At `4630152f763baca0259d84c0d5817d0cea501145`, both governed stand-ins completed their identity and authentication probes and the required attestation before the health barrier called `present`. The failure evidence records a refused storage barrier, a wrong model and a fallback after activation. The base is `75aec139d503cbe1d34d0c6f3ac5bd514339570e`.

- **B16** wires the existing foreground build, barrier and callback. The supervisor exports a production port for the two attesters. Registration-backed detectors report the affected surface. The TUI entry and CLI retain their existing paths.
- **B17** sends the governed prompt in one frame and monitors the same subscription and partial-line parser after activation. Each adapter enforces the deadline through the result, cancellation and the round-trip bound. Claude Code validates first-party usage evidence. The madv-surface attestation frame alone carries `no_tools`. A pre-activation failure produces a closed cause. Continuous failures interrupt the active session.
- **B18** resolves the supplied platform's managed-settings folder and enforces the three managed-settings stops before launch.
- **B19** validates the governed key/value allowlist and the envelope's Claude Code model in production preflight across user, managed, project and local settings sources.
- **B20** checks the three-call budget before a child write. All runs use offline stand-ins and disposable records.
- **B21** covers the twelve verification items, including response-id precedence, all required and secret allowlist attributes and application separation. Addendum 2 adds an unread-input PTY echo test and updates two Phase 3A expectations.

## Gates at the first reviewed head

Frozen install passed. The lockfile SHA-256 before and after was `a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830`. The install changed the founder-act entry's executable bit. The authorized checkout restored it and the working tree was clean. TypeScript exited zero with no output. The two runtime checks verified Bun 1.4.2 at revision 744846f844374847c902b5e7fd59b4342a51ef99. The suite, result list and comparison are recorded below.

```text
 2078 pass
 0 fail
 27981 expect() calls
Ran 2078 tests across 160 files. [259.69s]
```

All 2,048 baseline results passed under the same file and name. M1 added 30 tests across nine new test files: 2,048 + 30 = 2,078 tests and 151 + 9 = 160 files. No test was skipped or marked todo. The full run at `bbaa5e4149c8067bff81e77ad467671c170ee56b` and the final gate have identical file, name and outcome counts.

| Gate log | Command | Uptime and load | UTC start and end | Status | SHA-256 |
| --- | --- | --- | --- | --- | --- |
| 815-gate-runtime.log | runtime_check | 8:05  up 2 days, 23:33, 2 users, load averages: 1.70 1.96 2.03 | Tue Nov 24 13:05:29 UTC 2026 / Tue Nov 24 13:05:30 UTC 2026 | 0 | 5bc637da979f077e19ef1cb7eb9571eb8d537c41a9e80e851e8694cd356c6fb2 |
| 816-gate-lock-before.log | check_lock | 8:05  2 users, load averages: 1.68 1.95 2.02 | — | 0 | f93acb1a2d0baa2a77821f7a5d2fb7c4913cc425c9e47a6ebf641f2c1cffc282 |
| 817-gate-install.log | gate_install | 8:05  up 2 days, 23:33, 2 users, load averages: 1.73 1.95 2.02 | Tue Nov 24 13:05:48 UTC 2026 / Tue Nov 24 13:05:48 UTC 2026 | 0 | 6b8f942b5a4e89cb37d0a368e3e369aa03da11f5e5cbb679f27a0f863f184429 |
| 818-gate-lock-after.log | check_lock | 8:05  2 users, load averages: 1.59 1.92 2.01 | — | 0 | fecdb8ddaa7527a907da1e5966f7edfbf7bff7d8d73dff700d0c8828dc7f6394 |
| 819-gate-install-status.log | check_install | 8:05  2 users, load averages: 1.59 1.92 2.01 | — | 0 | 7e1c2d67969af3965f723dec7614e496e930dc4a02149e6734ab77e6111e73d8 |
| 820-gate-install-restore.log | git checkout -- packages/founder-act/src/main.ts | 8:06  2 users, load averages: 1.46 1.88 1.99 | — | 0 | c37318739afd31367b89f3bf43976fd89cbd1c7868a2d2b0928589699738a563 |
| 821-gate-install-clean.log | git -C tui status --porcelain --untracked-files=all | 8:06  2 users, load averages: 1.46 1.88 1.99 | — | 0 | e10bd4b4d3e49e9048b9653f56c221ea928eb87f1af04b3fbe6e5ace61d9dcd7 |
| 822-gate-typecheck.log | gate_typecheck | 8:06  up 2 days, 23:33, 2 users, load averages: 1.42 1.84 1.98 | Tue Nov 24 13:06:17 UTC 2026 / Tue Nov 24 13:06:20 UTC 2026 | 0 | 5cf83ff1b38de47423e189eb58771a7e1a65c3b7b9f0903c14ba608011c28214 |
| 823-gate-suite-runtime.log | runtime_check | 8:08  up 2 days, 23:35, 2 users, load averages: 2.00 1.87 1.96 | Tue Nov 24 13:08:24 UTC 2026 / Tue Nov 24 13:08:24 UTC 2026 | 0 | eff00bae7e5718387d3b2d41f19eb75251955ca0a10e7e18f786abf5a8f96b6b |
| 824-gate-suite-wait.log | wait_for_load | 8:08  up 2 days, 23:36, 2 users, load averages: 1.77 1.82 1.94 to 8:08  up 2 days, 23:36, 2 users, load averages: 1.77 1.82 1.94 | — | 0 | 7ed5c30d3cc75c0874b85c8bf80a48b57f3b1786ac6e3260fb9f35d902bdd4e7 |
| 825-gate-suite.log | gate_suite | 8:08  up 2 days, 23:36, 2 users, load averages: 1.77 1.82 1.94 | Tue Nov 24 13:08:36 UTC 2026 / Tue Nov 24 13:12:56 UTC 2026 | 0 | 5e1777b4b26f74320cdb3acf3309b64f348c092fb68661bbae09937c832bcd75 |

Result list: 846-gate-list.log, SHA-256 6dd6730ef62e30e66fcb6981998c92cb8f808880beeb96df85a01f67b4af6ef2. Comparison: 847-gate-compare.log, SHA-256 a48ea34da9ebd94de50d1da25d0ce444fd4ddcb9305588b58acbbae6d6956092. Full-run parity: 848-gate-parity.log, SHA-256 36622e73f22715a18e76d6a9952f272ed2946e57a77da23e5e2caf5629508628.

## Paths and offline evidence

```text
apps/madbridge/src/tui/live/composition.ts
apps/madbridge/src/tui/live/managed-settings.ts
apps/madbridge/src/tui/live/settings-sources.ts
docs/verification/phase-3b-m1-build-log.md
docs/verification/phase-3b-m1-evidence.md
packages/adapter-claude-code/src/detectors.ts
packages/adapter-claude-code/src/index.ts
packages/adapter-claude-code/src/live.ts
packages/adapter-claude-code/test/live.test.ts
packages/adapter-madv-surface/src/detectors.ts
packages/adapter-madv-surface/src/index.ts
packages/adapter-madv-surface/src/live.ts
packages/adapter-madv-surface/test/live.test.ts
packages/adapter-madv-surface/test/response-precedence.test.ts
packages/pty-host/src/terminal.ts
packages/pty-host/test/main-guard.test.ts
packages/supervisor/src/build.ts
packages/supervisor/src/index.ts
packages/supervisor/src/preflight.ts
packages/supervisor/test/live-port.test.ts
packages/supervisor/test/madv-allowlist.test.ts
packages/supervisor/test/preflight.test.ts
scripts/phase3b/failures.ts
scripts/phase3b/healthy-starts.ts
scripts/phase3b/transcript.ts
test/phase3a/harness-separation.test.ts
test/phase3b/composition.test.ts
test/phase3b/detectors.test.ts
test/phase3b/offline.ts
test/phase3b/preflight-input.ts
test/phase3b/pty-input-echo.test.ts
test/phase3b/scenarios.ts
test/phase3b/separation.test.ts
test/phase3b/settings-sources.test.ts
test/phase3b/stand-in.ts
test/phase3b/wire-facts.ts
```

tui/docs/verification/phase-3b-m1-build-log.md  SHA-256 63370c5aecc9f4396ab30be0f4f7dd1a03d9930fa519921c347c6b712097b839

tui/docs/verification/phase-3b-m1-evidence.md  SHA-256 3dc677145aabdfb10446d3b505575d6690ca3b08fa07057dd108c4343b7f5d28

evidence/SHA256.txt  SHA-256 b074b13998eca4c583d8e59ac4303c643ea6f652da1066364bb30a81919b2587

## Tests added through the first reviewed head

| File | Test | Ruling |
| --- | --- | --- |
| packages/adapter-claude-code/test/live.test.ts | Claude encodes one stream-json user line | B21.5 |
| packages/adapter-claude-code/test/live.test.ts | Claude hands a partial line to its monitor and interrupts on fallback or model drift | B21.4 |
| packages/adapter-claude-code/test/live.test.ts | Claude keeps the result deadline and closes on cancellation | B21.3 |
| packages/adapter-claude-code/test/live.test.ts | Claude rejects a tool call or a third round-trip | B21.3 |
| packages/adapter-claude-code/test/live.test.ts | Claude rejects malformed, missing, duplicate and echoed events | B21.3 |
| packages/adapter-claude-code/test/live.test.ts | Claude subscribes first and accepts only complete firstParty identity evidence | B21.1,3 |
| packages/adapter-madv-surface/test/live.test.ts | madv encodes no_tools only on the attestation message | B21.4,5 |
| packages/adapter-madv-surface/test/live.test.ts | madv preserves a later partial event and checks later responses | B21.4 |
| packages/adapter-madv-surface/test/live.test.ts | madv rejects attestation tools and extra round-trips by their typed cause | B21.3 |
| packages/adapter-madv-surface/test/live.test.ts | madv requires init, model response, assistant and success in order | B21.1,3 |
| packages/adapter-madv-surface/test/live.test.ts | madv waits for result through its deadline and closes on cancellation | B21.3 |
| packages/adapter-madv-surface/test/response-precedence.test.ts | refused and unknown model families precede a missing response id | B21.10 |
| packages/supervisor/test/live-port.test.ts | a continuous failure before activation fails reattestation for its surface | B21.4 |
| packages/supervisor/test/live-port.test.ts | the live port passes the session and signal and rejects untrusted failure detail | B21.3 |
| packages/supervisor/test/madv-allowlist.test.ts | madv allowlist pins the required and secret attribute of every variable | B21.11 |
| packages/supervisor/test/preflight.test.ts | preflight accepts the governed settings and each allowed setting value | B21.9 |
| packages/supervisor/test/preflight.test.ts | preflight rejects every unlisted settings control and invalid value shape | B21.9 |
| test/phase3b/composition.test.ts | a failed health barrier exits nonzero naming the component | B21.2 |
| test/phase3b/composition.test.ts | a second attester invocation refuses the fourth call before the child receives it | B21.3 |
| test/phase3b/composition.test.ts | both stand-ins pass probes and attestation before present | B21.1 |
| test/phase3b/composition.test.ts | composition refuses disallowed user, managed, project and local settings before launch | B21.7 |
| test/phase3b/composition.test.ts | monitor failures after activation durably interrupt with the registered reason | B21.3,4 |
| test/phase3b/composition.test.ts | startup cancellation closes the subscription and ends the stand-in group | B21.3 |
| test/phase3b/detectors.test.ts | registration detectors identify auth expiry and attestation failures by surface | B21.6 |
| test/phase3b/pty-input-echo.test.ts | the PTY host does not echo a line written before the child reads it | Addendum 2 B3.1 |
| test/phase3b/separation.test.ts | application code imports neither internal supervisor seam | B21.12 |
| test/phase3b/separation.test.ts | the original public build still fails closed without an attester | B21.12 |
| test/phase3b/settings-sources.test.ts | managed settings refuses unvalidated files and the governed remote copy | B21.8 |
| test/phase3b/settings-sources.test.ts | managed settings selects the platform folder and refuses an unsupported platform | B21.8 |
| test/phase3b/settings-sources.test.ts | settings sources include the supplied user, managed, project and local directories | B21.7 |

## Deliberate breaks through the first reviewed head

All 31 deliberate changes were restored. They produced 32 file-level failure receipts. No break was declined.

- R1 closed failure detail. Failed: the live port passes the session and signal and rejects untrusted failure detail. 152-break-test.log, SHA-256 7d9d45506b5712682a1511ecc707c7ea15c1965afef67797f2f80bbbb86125af. Restore: 155-verify-repeat.log, SHA-256 4d8e9f7063a6e6b05aa86776edf3754f16f82db932974f2760b0931c0a64ae1d.
- R1 monitor failure before activation. Failed: a continuous failure before activation fails reattestation for its surface. 164-monitor-test.log, SHA-256 f7704054d61a75fb801b59618fa584664ef6730554932cf0514199c06c654a12. Restore: 167-monitor-verified.log, SHA-256 03d25b7c4a606aa8338ca27dce3e667ec53005143b23bdbf5a88ce9e4d18050d.
- R2 input encoder. Failed: Claude encodes one stream-json user line. 185-encoder-test.log, SHA-256 7c2146f45e5e90b02be40a3693815f871cbee87f2e1a8d14e2cac8f7b7d9603f. Restore: 188-encoder-verified.log, SHA-256 25238bac7f38ed50210db27723267046817f99f21ea0e1208f35fcb36fe158d7.
- R2 first-party evidence. Failed: Claude subscribes first and accepts only complete firstParty identity evidence, Claude hands a partial line to its monitor and interrupts on fallback or model drift. 193-provider-test.log, SHA-256 8fd80090fd1520948978c07407cb4920d19d776f936249c9b529f13b6ed82343. Restore: 196-provider-verified.log, SHA-256 2dbaf61ce8c78a775bb9e1eea8c768eaae7be96834e5b8c0025a1000807ea617.
- R2 echoed input. Failed: Claude rejects malformed, missing, duplicate and echoed events. 201-echo-test.log, SHA-256 c5abb6b1ca639cf363ebdecc1f9efbb304c58a378fb2d36b59bfc974b596582a. Restore: 204-echo-verified.log, SHA-256 ea66052a07c581ba59eaec2b09bd5061a5a16ef7a9c6850752b181cc592960d4.
- R2 round-trip bound. Failed: Claude rejects a tool call or a third round-trip. 209-rounds-test.log, SHA-256 e7331d3f4d7da841240cf28d1f53f91db79977fbeeb18d61d444edf22a9ba075. Restore: 212-rounds-verified.log, SHA-256 6ba4e39424b49d6816d7a4dc474bb2657637da53e07f1114d0dc815014310b82.
- R2 deadline through result. Failed: Claude keeps the result deadline and closes on cancellation. 217-result-time-test.log, SHA-256 bc7e6a4f917a689fa6c20614fa295568c06f75083b426fcfd346322ca5f48bea. Restore: 220-result-time-verified.log, SHA-256 3eae840a274efed4086003e34b54c78e706ab223fc6b70f17660fff44f100fe1.
- R2 partial line. Failed: Claude rejects malformed, missing, duplicate and echoed events, Claude hands a partial line to its monitor and interrupts on fallback or model drift. 225-partial-test.log, SHA-256 7d2af7e4295b95302369441e51b731bfe4f2052a86a43893bd4c6b4cbb2758e5. Restore: 228-partial-verified.log, SHA-256 ce961864bd663ffcdf85465a06c2497e9bd0c07c48988e17393c5c394edca06a.
- R2 fallback. Failed: Claude rejects malformed, missing, duplicate and echoed events, Claude hands a partial line to its monitor and interrupts on fallback or model drift. 233-fallback-test.log, SHA-256 d3f22ef7035acdfbc4e79ff2ad2853faf9ec1bd924902697efe6bbd2677657d7. Restore: 236-fallback-verified.log, SHA-256 5f7fd02465cca2f219e2eb1ff2590540d7ec554f5e0e6815239a30c287f49948.
- R3 attestation write. Failed: madv encodes no_tools only on the attestation message. 271-first-write-test.log, SHA-256 1f1865b602f2af451c318d0784d4fc749c9168839cbb489690009b367adc2e57. Restore: 274-first-write-verified.log, SHA-256 d8d21e3d46ac052065fbf2cb941c008871fc5ba25a8c61c7f961f51b5ab70863.
- R3 required assistant. Failed: madv requires init, model response, assistant and success in order. 279-assistant-test.log, SHA-256 f5a849cb736a45a89be896c534521b965864d9f0436000bf064223795f1d0961. Restore: 282-assistant-verified.log, SHA-256 03a4b224117daadb72bfbe7cb38b2a16c696e20a62ed1b163b5658217b37003e.
- R3 extra response. Failed: madv rejects attestation tools and extra round-trips by their typed cause. 287-extra-test.log, SHA-256 d357cb89491f8903f834c0438f827c9d0cbdc09723b99d6b9a7406ed9bcd29e3. Restore: 290-extra-verified.log, SHA-256 c2e8677d04778ec82a22b99dda1ff8ba74f09136978da991931afb9ba5224047.
- R3 deadline through result. Failed: madv waits for result through its deadline and closes on cancellation. 295-result-time-test.log, SHA-256 9d2724a8e4e18488afb6cfd89a728670f964b9248e28cd9762ad9146f930382b. Restore: 298-result-time-verified.log, SHA-256 c3337b943a640d45d04918c01218c0ce49863195eeba921c28bd760bcf5f2e54.
- R3 partial line. Failed: madv preserves a later partial event and checks later responses. 303-later-line-test.log, SHA-256 b7fd5b1a2f67810450c2658259082dcd1b31cec6166dd829499b0839f37f25a6. Restore: 306-later-line-verified.log, SHA-256 627761fa2797e6f39567f27931ac1e6857279ebfdf39760e4725d6cba0ca8fbf.
- R4 registered authentication error. Failed: registration detectors identify auth expiry and attestation failures by surface. 360-detector-test.log, SHA-256 4df44e1c40002c9c379178bad59ed2b8648707c5a1b17c3e46d8f230a7e75e47. Restore: 363-detector-verified.log, SHA-256 3d54384c4227845cea75b463e9457344f3d81cad286b3d32b6f89a932f8ed671.
- R5 Darwin managed folder. Failed: managed settings selects the platform folder and refuses an unsupported platform. 392-darwin-map-test.log, SHA-256 644be97f0b079dac742330fdeb5711f43dea5d668c756343334af6ee7258b842. Restore: 395-darwin-map-verified.log, SHA-256 9becc6c3916be0d6d17ea73526c49e7e087a6f4a2a030e6cd77b5e800eee4c5f.
- R5 remote copy. Failed: managed settings refuses unvalidated files and the governed remote copy. 400-remote-copy-test.log, SHA-256 4a23b853a81522ce6c48903ba2c079a03ad7f48ad31c27fcffbe27d8faed9d17. Restore: 403-remote-copy-verified.log, SHA-256 368c6e2fe56955af8bba44c2ed13e61a39399edf45c983fac6f3deeff5a60070.
- R5 local settings path. Failed: settings sources include the supplied user, managed, project and local directories. 408-local-path-test.log, SHA-256 06ffc04ae63ced672a51942b8b6eb69384fb5df2211a7a486fdf62a445698eb7. Restore: 411-local-path-verified.log, SHA-256 2fbdb093582e1298565bd30c3a65ac9d54cc2216914181f32deb19a56d4de868.
- R6 admitted updater value. Failed: preflight accepts the governed settings and each allowed setting value, preflight rejects every unlisted settings control and invalid value shape, preflight accepts the governed settings and each allowed setting value, preflight rejects every unlisted settings control and invalid value shape. 428-updater-test.log, SHA-256 319f0ef2586eee93ae4470af18f7e9b3725f1f8c64da882f704fca97f8b757d9. Restore: 431-updater-verified.log, SHA-256 59f88a6926c23fbf8e51b5ce16ff94662aefdba20be11dcacee1ea3469a9b43a.
- R6 unlisted settings key. Failed: preflight rejects every unlisted settings control and invalid value shape, preflight rejects every unlisted settings control and invalid value shape. 455-extra-setting-test.log, SHA-256 62c746dd2aaed6ddc04de196f18568ddbef66f2fb82b4fe37d6d0f735e69f2df. Restore: 458-extra-setting-verified.log, SHA-256 4b9ce236c8b96ee6e35b9ce5c96bd649db9f3e41199705134f15fd8d9e562387.
- Addendum 2 unread input. Failed: the PTY host does not echo a line written before the child reads it. 596-break-unread-test.log, SHA-256 a8c09d6fcb4d2bcf50a4a5dab607dd071278b7042dcb3e79a10ec3617ad3fae6. Restore: 603-verify-host-restore.log, SHA-256 92154a009171bc6b9883b8a78aff1e3937c9328047227ee4fa8b112aef7ac7e4.
- Addendum 2 lifecycle output. Failed: a valid session lifecycle emits every fact in order exactly once, with no truncation, a valid session lifecycle emits every fact in order exactly once, with no truncation. 598-break-lifecycle-test.log, SHA-256 f6b0343ad407b5b91467f653197b7e64b339d5ab0679f1bcebbaebbf09d7328b. Restore: 603-verify-host-restore.log, SHA-256 92154a009171bc6b9883b8a78aff1e3937c9328047227ee4fa8b112aef7ac7e4.
- R7 present. Failed: both stand-ins pass probes and attestation before present, monitor failures after activation durably interrupt with the registered reason. 644-break-present-test.log, SHA-256 e22b162aeb89eacccd8e473de4c183b00a243c139240f8b34c9e5ac89a92a25f. Restore: 646-verify-present.log, SHA-256 fd7cd45cd86700f3921d72cd713fdd99dee400f38cc837f9484bf0ab877f3d50.
- R7 component failure status. Failed: a failed health barrier exits nonzero naming the component. 651-break-barrier-test.log, SHA-256 4a7e1f348349e3c385c999c32542cbb9ff9c24ba9b50ce7e84233a3de252b7dd. Restore: 653-verify-barrier.log, SHA-256 dad090b09fccbd790bb554354fce199086836bbc94310a7abb45e7d4c0972832.
- R7 fourth call. Failed: a second attester invocation refuses the fourth call before the child receives it. 658-break-budget-test.log, SHA-256 0249aa02ed6103f6d0649a00b44b1d1296a76f36132ddcddce380793e07898b6. Restore: 660-verify-budget.log, SHA-256 79131a7c844dc310f454aa24ea277a3073aa10639b95db387cc94d3079d26c99.
- R7 missing local settings source. Failed: composition refuses disallowed user, managed, project and local settings before launch. 665-break-settings-test.log, SHA-256 2f218b65355bf500f0f4ce2ba76dda9025b81e25cde4ad99ec6cdb936c6056dc. Restore: 667-verify-settings.log, SHA-256 3da20117b9aa67b58d7298509ba1d8f81cdc90f140d29fccb9f5f5dd45382b13.
- R7 foreground cancellation. Failed: startup cancellation closes the subscription and ends the stand-in group. 672-break-cancel-test.log, SHA-256 d18cb55c49646d8f1ea4cbfdb65f03f297350140cec45e4fddb8bb02cda5d0cb. Restore: 674-verify-cancel.log, SHA-256 f063fe590fcc4d83b4aacf1497e82f6df77676e1d7c19b7ee74c6f3007522ba9.
- R7 active monitor interruption. Failed: monitor failures after activation durably interrupt with the registered reason. 679-break-monitor-test.log, SHA-256 6c60e6e220c55e29cbe0f168852baae2e3cfa47b4c14b4e2925bb645ab94c2e5. Restore: 681-verify-monitor.log, SHA-256 5aa598c6cbe0a9f2da2a99c904eac121fe377566431f623bffa00ffbb166ff38.
- R8 response id precedence. Failed: refused and unknown model families precede a missing response id. 712-break-precedence-test.log, SHA-256 a579f1a0b6f73ae454e4ec543fe3fb7e4d62ec7ea9a1e1a9718348c953a5cd30. Restore: 714-verify-precedence.log, SHA-256 39db7a25077b2ac401db8768e7551d9edb9cb43d610cef2337debdcae6d361b1.
- R8 required authentication variable. Failed: madv allowlist pins the required and secret attribute of every variable. 719-break-required-test.log, SHA-256 a973b5a341a1a166ca9e9fc70782ef794e90053627321a398743ea9eda461e12. Restore: 721-verify-required.log, SHA-256 52894c23f7729a2162e225822baef7ac378c4b0488d29a917d3c6350be3d1057.
- R8 application seam import. Failed: application code imports neither internal supervisor seam. 726-break-import-test.log, SHA-256 f7349f99c50011559e841972b9664cf7d4db505d01a35fcfd88545c6566b54fe. Restore: 728-verify-import.log, SHA-256 90ea6bbf8566d11ad2b3c4357433304b8300abcf4b4cf09f4790a074fd87e08e.
- R8 missing legacy attester. Failed: the original public build still fails closed without an attester. 733-break-legacy-test.log, SHA-256 2a14ee25365b5264be8ca2ad784c2d8ddb8d1d912930bec9661c842b94aef4df. Restore: 735-verify-legacy.log, SHA-256 5d4bf1493b463da20284154ddc898234ad2bd109360118da036b5c6a987c6114.

## Limitations and certification

The PTY host still chooses the child's working directory, and other readable files there are outside the environment allowlist. The TUI uses the relative supervisor and madv-surface adapter source imports required by B16. The host disables terminal echo before spawn. Whether a real surface enables it again remains unverified offline.

No live call was made, no real surface was run, no real key was used and no Founder configuration folder was read. No capability record was written or renewed outside a disposable storage root created by a test or evidence script. No request left the host other than the permitted package downloads of bun install --frozen-lockfile. The M1 entry is reachable only from offline tests and evidence scripts.

The Founder checked the first session record, opened draft PR 254 and passed B24 on both certification hosts at the first head. Verify and Verify (macOS) passed. The first Tier-2 review returned FAIL. Addendum 3 authorizes this correction round.

## Deviations

The Founder upheld three halts.

1. Runtime check 042 used the barred Homebrew Bun 1.4.5 after a nested shell changed resolution. The Founder invalidated the frozen install in 033, typecheck in 040 and check 042. After the install directories were removed the baseline was restarted under verified Bun 1.4.2. The first halt report has SHA-256 `eed8bc988d68dc9e1b601cba8ee3e0e3fecc80bd92fadfa45059027d5714f730`. 042-baseline-runtime.log, SHA-256 7c0650151550ee7d95b47cad5368cb780c9176dc58e7523d8a9c0b80ce0f232a.
2. The live-port break emitted an unsanitized diagnostic. The Founder deleted log 124, SHA-256 `7294cb12c91044601c50df986f5566f930178b53dc3fd46dcef26300f8a34044`. DEC-20261123-01 Addendum 1 has SHA-256 `5cd930a3f2dbb8f3a85c63cfba5ed95f8088418ee132e89872d57e63fad75666`; resume message 2 has SHA-256 `611e62f080409fe686392d45455622d509732bea2875e4a754cdb4c00f5263e5`. Commit dd19008a74a2ffbd85703f9dbb031a23e8571702 fed the port fixed synthetic diagnostic text. The repeated break failed its target on that text. 152-break-test.log, SHA-256 7d9d45506b5712682a1511ecc707c7ea15c1965afef67797f2f80bbbb86125af.
3. The host echoed the prompt before the stand-in could read it. The third halt report has SHA-256 `90bd5248ced3c56996588b44de5b0204efff1dbc059dae0e9b7d5d30d730479d`. DEC-20261123-01 Addendum 2, SHA-256 `f524cb055c363c57dbcaf25dc037645989d453a942f3ce120c7083735e6cc52c`, authorized the Phase 3A runtime change and two lines of its lifecycle test. Resume message 3 has SHA-256 `7176750c77c97b52bb9a0f0e16f5d6ea68f7be8ed27b5f209a0940e7bff9f1ea`. Commit f1fdd9e646ee1c4aa0ddad136a19da13db2600ec clears the echo bit before spawn. Both adapter tests still reject an input line returned as output. Their synthetic streams already supply that line. The composition stand-in no longer changes terminal mode, does a silent first read or saves the prompt in a file. Its small launcher changes to the disposable working directory, records the process-group leader and executes the stand-in implementation. Logs 607, 609 and 611 verify those decisions.

DEC-20261024-01 B2. In commit 9542eb4b27f0ce009a389feb50d8eff68e7f0878 the SHA-256 of packages/supervisor/src/build.ts changed from `6008c0bab23f1bde66af3744c4731203f509f2890015b853ea6e50d6c4f4c44a` to `50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d`. The one allowed computed call obtains the async iterator on host.handle.facts() and is unchanged. No exception was added. The quoted diff has trailing whitespace removed. 117-r1-pin.log, SHA-256 722a1e6b703c71e45bce26e6a89191eafd7790de43e3860b0bb15042d8c4d413.

    diff --git a/test/phase3a/harness-separation.test.ts b/test/phase3a/harness-separation.test.ts
    index d3221df..326687a 100644
    --- a/test/phase3a/harness-separation.test.ts
    +++ b/test/phase3a/harness-separation.test.ts
    @@ -27,7 +27,7 @@ const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> =
         sha256: "9210012a505848a7379ab7b9cf9d840f33197de58f85b23c359653760479c603", call: "PAYLOAD_SHAPE[knownType](payload)",
       },
       "packages/supervisor/src/build.ts": {
    -    sha256: "6008c0bab23f1bde66af3744c4731203f509f2890015b853ea6e50d6c4f4c44a", call: "host.handle.facts()[Symbol.asyncIterator]()",
    +    sha256: "50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d", call: "host.handle.facts()[Symbol.asyncIterator]()",
       },
     };

The Phase 3A runtime and test diffs below have trailing whitespace removed. 550-confirm-addendum-diff.log, SHA-256 ebc957d1b7eb5e0deac07553c4ce59db08ab885a927bca00b1ab2f6ec03b9593.

    diff --git a/packages/pty-host/src/terminal.ts b/packages/pty-host/src/terminal.ts
    index 786b29f..9009665 100644
    --- a/packages/pty-host/src/terminal.ts
    +++ b/packages/pty-host/src/terminal.ts
    @@ -76,6 +76,7 @@ export function spawnGoverned(
           }
         },
       });
    +  terminal.localFlags &= ~8; // ECHO on macOS and Linux.
       const child = Bun.spawn([path, ...argv], {
         terminal,
         detached: true,
    diff --git a/packages/pty-host/test/main-guard.test.ts b/packages/pty-host/test/main-guard.test.ts
    index 8e888bf..87f1dd5 100644
    --- a/packages/pty-host/test/main-guard.test.ts
    +++ b/packages/pty-host/test/main-guard.test.ts
    @@ -306,7 +306,7 @@ test("a valid session lifecycle emits every fact in order exactly once, with no

       host.write(encodeCommand({ kind: "input", bytes: new TextEncoder().encode("ping\n") }));
       await host.waitForFact((f) => f.kind === "ack" && f.ofKind === "input");
    -  await host.waitForOutputContaining("ping\r\nping\r\n"); // local echo + /bin/cat's own echo
    +  await host.waitForOutputContaining("ping\r\n"); // Output of /bin/cat.

       host.write(encodeCommand({ kind: "resize", cols: 90, rows: 30 }));
       await host.waitForFact((f) => f.kind === "ack" && f.ofKind === "resize");
    @@ -332,7 +332,7 @@ test("a valid session lifecycle emits every fact in order exactly once, with no

       const acks = facts.filter((f) => f.kind === "ack");
       expect(acks.map((f) => f.ofKind).sort()).toEqual(["input", "resize", "terminate"]);
    -  expect(outputText(facts)).toBe("ping\r\nping\r\n");
    +  expect(outputText(facts)).toBe("ping\r\n");

       const termStartedIdx = kinds.indexOf("termination_started");
       const terminateAckIdx = facts.findIndex((f) => f.kind === "ack" && f.ofKind === "terminate");

Role-Id: builder
Actor-Id: session:codex/3b-m1-r1
Execution-Surface: codex
