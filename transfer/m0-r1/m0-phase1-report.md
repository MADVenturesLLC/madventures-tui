M0 Phase 1 final report


1. Harness and identity


Harness Codex; model label GPT-6, made by OpenAI. Exact snapshot, effort, session identifier, session-metadata CLI version and approvals reviewer: not shown. Agent task /root; collaboration mode Default; shell zsh; America/New_York. Opening records initial date 2026-11-15; resumed environment date 2026-11-16. Sandbox workspace-write; approval on-request; network restricted. No loaded MCP server was shown, and the Founder confirmed none. No barred tool was called, and no exec input contained one of the six names of Addendum 2 B4.

Visible functions tools: wait, request_user_input, request_user_input_async, exec. Inside exec: apply_patch, exec_command, write_stdin, clock__curr_time, and the six names of Addendum 2 B4 where applicable. Clock: sleep. Collaboration: followup_task, interrupt_agent, list_agents, send_message, wait_agent, and the six names of Addendum 2 B4 where applicable. Deferred namespace: the six names of Addendum 2 B4; individual deferred tools not shown. The actual six names are named in the session's identity/final messages, not this file.

Governed build output, verbatim:
WARNING: proceeding, even though we could not create PATH aliases: Operation not permitted (os error 1)
codex-cli 0.167.0
logs/001-governed-version.log; SHA-256 5b6201f03599ae5d6e1c01fd8a2202ea36ad1a844ed58e03d8bb92dbe90214ee
logs/066-resume-governed-version.log; SHA-256 56b4e0f0f4777f1ad35654a415741f68368e9a97607e9fa85b88906c689cefcb

Git identity daley40-lab; 293512385+daley40-lab@users.noreply.github.com. No host, PATH profile, sandbox or approval setting was changed.

All runtime checks passed. bun /Users/michaeldaley/.bun/bin/bun; bunx /Users/michaeldaley/.bun/bin/bunx; version 1.4.2; revision 744846f844374847c902b5e7fd59b4342a51ef99; executable SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5.
logs/007-runtime-check.log; SHA-256 832fa84af43b8b1998ae233448b637a2094ae4d69652c5eeb2f965850741bc72
logs/068-resume-runtime.log; SHA-256 8b00ad088075f3ccc036d87b29870386eca12747843e6f2b7aeef757b6392cd8
logs/085-baseline-suite-runtime.log; SHA-256 4243661b85e8566276fa784efe5807438c2e4a00083967bb0721fdf24d318e30
logs/100-r3-runtime.log; SHA-256 34f5460b1560020f5e97f951ac6fed21f8759125dd91b9696ba0c2047ca91c8a
logs/110-break-5-runtime.log; SHA-256 11ba93708c8b5111fa34d20387a364e4fb7864ca5825d51a6f6a2b37ea3ecfde
logs/122-r4-runtime.log; SHA-256 00d430161216f80c967efcaa0281142b8d73467a47539ddf1503ce93d4bc5539
logs/130-break-1-runtime.log; SHA-256 de5671ba5ba537912bcd4d2c0bc0fa195af3bf09f462c629b5f3d61c9bac2899
logs/148-r5-runtime.log; SHA-256 eb155ac1922ba5ec9b220072f4a1cfd2e963f8814e67614684c024c01c6b4d1a
logs/160-break-2-runtime.log; SHA-256 47d8bf82ad712c8bea4c8b4d2b4f9d4dd2bf02ab1f6a07fd77a6fed4bbdafc59
logs/168-break-3-runtime.log; SHA-256 ec87da7ff01098bc2adfab819ef7a0942ff3016cfbd8c18683b0a6d5ec4ae74c
logs/176-break-4-runtime.log; SHA-256 19a6b22cd2ca7458984b0f4e2e3960e3150e9b2119bca52907319eec9ce6a592
logs/188-full-runtime-before-install.log; SHA-256 a75e088406776ed2f4a09f96621c7d8feb3f82037df0356ea76fb6b370747010
logs/194-full-runtime-before-suite.log; SHA-256 27d8d3d27509b1660849639fe9def6e1def885e0b850dea4043c78a56793c7a9
logs/215-r6-runtime.log; SHA-256 6a21b426c41a630ff63c2b06381eec10793a3d97940298c486a8b2a7028f9d59


2. Workspace and preconditions


Working directory /Users/michaeldaley/builds/m0-r1
Branch build/3b-m0-r1
Phase 1 HEAD 7f94c272a4fd7fc3b4ab1d18920b80ac95c677d3
Binding base 0825a1e349ca5ea6427eea5f2de79dff234dc8f7
Main when work began c0c0c31f1489de0378f8ce0726238b4e9603a84c; base ancestry passed; all nine changed paths were under docs/decisions or docs/verification. Initial branch, HEAD, identity, clean tree, no stash, absent new package/build log and empty pr/record passed; initial logs emptiness was not independently measured before the first log. logs/008-repository-preconditions.log; SHA-256 171428209dfb6a358388f22d5b91fb48605e7f26c8fb051430a049ab57d3debc

Precondition 2 passed: every authority hash matched; acts/addenda ISSUED and signed; reference and prompt manifests matched. Full authority hashes:
docs/decisions/DEC-20261115-02-phase-3b-m0.md 5d8bd4a446d8b3120bddbc34dc11a5fdf83e3a07d9efcd04fbd7b8efdad8d22b
docs/decisions/DEC-20261108-04-phase-3b-standing-commission.md d373235e424bd7fbe4c1c5b1c5f4954eb1b02165db4e1365d9cfa1533aa93b29
docs/decisions/DEC-20261108-04-addendum-1-corrections.md 90e2f541fd0a232390ca0554067a2de8b37f15c933016eafe40ebde2cd2eff17
docs/decisions/DEC-20261108-01-phase-3b-approval.md 319ba65b340696d66a655e21f648fed742a9c38bcbb1d876776abc27a27a9738
docs/decisions/DEC-20261115-01-madv-surface-0.1.1-records.md 5bf1d2353fa44fd4c346ce0207286eaba0726e42fb4314af4c2fb2aa5fe5ccd6
docs/decisions/DEC-20261114-02-minimax-plan-terms.md 909a90e764059d913a4a32a518e276a58e22ca461f763fe09e66ec40b4aa77f9
docs/decisions/DEC-20261114-01-madv-surface-release.md 6bffc2c18927b90f4b5042f312947e5d39853ca53404a58a51b4602eb45652b8
docs/decisions/DEC-20261113-01-h2-records-and-merge.md 41e27eafc24a2eef238c080d1374b90fbe22d609f4ef5cbb66e07cccb5b347a5
docs/decisions/DEC-20261015-03-m20-checkpoint-closure.md e4148fde243d15508513fbf22b58584c519d1d842ca7fefb016d266bf6f08f61
docs/decisions/DEC-20261020-01-phase-3a-order-and-records.md e5299202a83ad37e11fd619231422b41fc43779308531b62ae6a5cf06ee3c6b7
docs/decisions/DEC-20261027-01-m22-execution-authorization.md 86f1374492a833ce87ebdf81293c59e8805c547d8bc29e1aa682b17a769bcd8b
docs/decisions/DEC-20261112-02-model-record.md 3151cb9e178e918f0c07f5a4eb9931fa9d529debedf0ad4d91f5999844883da7
docs/decisions/DEC-20261108-03-addendum-2-codex-harness.md e04b54065b0f0bb465b2d14e14a39f3b31f9cb34a874f6f8210a7d7e74a8c1c1
docs/decisions/DEC-20261108-03-addendum-3-image-tool.md f2a0ef1063379902935760d9517b68d532cabf6e24699cdebb789681f78ce15e
docs/decisions/DEC-20261108-03-addendum-4-sandbox-halt.md e817470aea6be2c176d4ae75856fd793ef982bd28c9eb793df9c9038a5c1dfbc
docs/decisions/DEC-20261108-03-addendum-5-own-work.md e86e94a62c7067e4656114afe1713c1478814ffe446d1ffcc8b788accfc3ff3d
docs/decisions/DEC-20261108-03-addendum-6-names-in-text.md 24cef0ed5c968aa80ada586e473526d0f4f0b1de1331eba1d5a35051b1254ac9
docs/decisions/DEC-20261108-03-addendum-10-second-verdict.md d90d48718bc4ea6056af6f011f797a78eddcfd14e7111f15f823085c4388bca0
docs/decisions/DEC-20261108-03-addendum-11-governed-build.md e2d28cbd12485e9025c928403eb7beead9552ee378b023ddf5bc9e18febe00df
docs/decisions/DEC-20261112-03-addendum-2-gate-repeat.md 829248f1e2557ddbcfd33d6456f7056bfce73a008791cb88caa9660a5d979d29
docs/decisions/DEC-20261108-02-phase-3b-builder-qualification.md 38ec4066f5c9487547befc81e00b80b69126d9140f1e66c0a8dcb35e5fe815ef
docs/decisions/DEC-20261102-02-hardening-builds.md 04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550
docs/decisions/DEC-20261023-01-standing-build-rules.md bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5
docs/decisions/DEC-20261013-03-tests-4-6-ruling.md 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7
docs/decisions/DEC-20261104-02-hardening-f-and-task58.md 011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5
docs/decisions/DEC-20261103-02-task57-claude-code-investigation.md 387a6604ecba3b84d06d40586875f8d005876a89eb6a6f7a03beb4fccc3d1442
docs/decisions/DEC-20261103-02-addendum-1-task57-halt.md 4655511c35d25e9c60c10ca8e5aea312e88a08659706a90f05da88c954f7d91d
docs/decisions/DEC-20261104-01-m25-records-and-hardening-e-records.md db58159e4802a1839e126a0fbffbbc1a53c1db73faddcb3e1efb982bc23e0240
docs/decisions/DEC-20261010-02-linux-host-scope.md cae5ac6b59618507f6ff3ef0f4d2cd5bca1909f328023248db8d234c4098b5a1
docs/decisions/PLAN-OPEN-3-capability-horizon.md cca3061b91ffc9eb231003f5e5d7c20230f47cf8c2378f6f1241d57309618562
docs/decisions/PLAN-OPEN-2-environment-allowlists.md b60676aa47b216c36d9080c884650943cdac93dd12109d2864ebcf0eb6887d8c
docs/superpowers/plans/2026-09-19-phase-3b-live-tui-integration.md a48bf5457bf17cf5d554e541c5bb3609efacf6ad170ad6e56950b829a4269ccc
docs/superpowers/specs/2026-09-19-phase-3b-live-tui-integration-design.md da8f4c8c35f617898368b340d710188686c9dc9faf2b23c4a6b284c1bb4d93fc
docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md a6af30015f743740794d89e12cfc2af07433ead70433b739725c2728a89fc69d
AGENTS.md 0879ede2d3b07e137d1f3d5f75c131285277b44e61f1305d3d0d59da64f1dbca

Addendum 1 31576960c18a4c9607fca2785e54146df5f740af45b4437dc7f13890abaeca42
Addendum 2 a6512b4ad4cadb10f014256922bd09efd4d1eb9d65d0a8e4c91102f4f4ca60a0
Resume 41ea2ae2e3d45842c77d8594040d866050ddd2334f1f9a38c47ff7a74bd11536
Builder prompt 286664ccb06fc164d7c939dba2f3fa3498793bdb84e0ee9ea51f986855f88824
logs/009-manifests-and-instructions.log; SHA-256 6c2d65a4a55fe4e6d921132d350757c64e53c279ffd502f50136b366b3db82cc
logs/013-authority-hashes.log; SHA-256 710a7e088c02a9d473d3993748b7a86ba0d4068b2c502c3736aa6588167118c3
logs/063-resume-prompt-manifest.log; SHA-256 765571e5897331ba21c278830b81992d02623461e53a9561d92555829f4965e3
logs/064-resume-prompt-files.log; SHA-256 9459178d749d8183afa72ddf5bf9a01ad3f281ac56c5b3f80b63891c2449fd72
logs/065-resume-addendum-2.log; SHA-256 32add55c83cb5dcfd2cad7ea5341f19f4692e6a125f40dc23892f9e77500e88b
logs/067-resume-repository-and-report.log; SHA-256 4406b0cd0074ae4736f322900ce3481f6cd1f33d8f41fe2c6148f1d50c32d718

Preconditions 3-5 passed. Full numbered source quotations, package/workspace/path declarations, Addendum 1 cited lines and the exhaustive attestation caller/name listing are retained in these logs. They contain square brackets and are therefore cited in full by log and SHA-256 under the report-format rule:
logs/054-base-registry-environment-manifests.log; SHA-256 000f46b2234c2b83e6d658978df708c71e56d0ebfcb8b015ecd88c22955c510d
logs/055-base-attestation.log; SHA-256 14e86dd35c3d58e84d2e4ac23ac19a75ba1e7a0e1583de5039f4e6a147b25622
logs/056-base-preflight.log; SHA-256 254987ba02f2ce0c050b30636ab585269e7b8b62e73a349851c836b029ccfe41
logs/057-base-blobs-importers-and-addendum-lines.log; SHA-256 67c31d8c3831fe6c79da8efadea7da9ff45246f6760aa08679c72fefc299562d
logs/069-complete-source-preconditions.log; SHA-256 7be113725a85ddd961a62b6644e880d93f0a9afe44a0769bc17efce5492c6cf1

Base blobs preflight/test/harness: ced2364d85c0117563533e6dc419575f06a09161; 182285abde26fae13f9403dba676349608a61265; 8e63d73f723c3fa7eea2e300c3e378e107957b0b.
Head blobs: 43619191f47e3f9cdaefd8aa45cd436770690160; f8f117aaf90d8b3218fbec4f0331563b036eae05; 8e63d73f723c3fa7eea2e300c3e378e107957b0b.
Protected preflight base/head lines 143/143, 192/195 and 193/196 retain bytes and effect; test 298 and harness 14 retain bytes and line numbers. Exact quoted lines at both points are in logs/057-base-blobs-importers-and-addendum-lines.log; SHA-256 67c31d8c3831fe6c79da8efadea7da9ff45246f6760aa08679c72fefc299562d and logs/226-head-preservation-and-redaction.log; SHA-256 a05d0ea31af1decc2ff0b3464f7698e29d1ab4eba70a95bde915e13f12e94f4a.

Precondition 5 files: packages/supervisor/src/attestation.ts; packages/supervisor/src/preflight.ts; packages/supervisor/test/attestation.test.ts; packages/supervisor/test/preflight.test.ts; test/phase3a/evidence-pipeline.test.ts. Every matching line is in logs/069-complete-source-preconditions.log; SHA-256 7be113725a85ddd961a62b6644e880d93f0a9afe44a0769bc17efce5492c6cf1.

Precondition 6 passed: Darwin arm64. Precondition 7 baseline passed as recorded next. First halt upheld before baseline; report pr/m0-phase1-halt-1-report.md SHA-256 4fef47b6a4f9c26e142347967f4e01b80758162e4fd0f6e6f2e3f79a36f44be4; resumed under the signed Addendum 2 corrections.


3. Baseline


Frozen install, typecheck and bare suite each ran once in order. Lock SHA-256 before/after 34224c0133c44d967c4a4da8b75bf11093c573c47e42bcaf502c6d6f61c3e7c0. The authorized executable-bit restore left the clone clean. All summaries containing square-bracket timings are cited verbatim by their full logs.
logs/078-baseline-install.log; SHA-256 b0c1a9c58db30d352c4a0690fb2cf1a11da4bb8e07be4da4b62ccd6ddca4ce97
 0:28  up 58 mins, 1 user, load averages: 3.12 2.59 3.09; exit 0
logs/079-baseline-install-state.log; SHA-256 0a772a67f61cc81cc68e5ee1bb9ac1b374b269051df09675937f5f3df3a61e4b
 0:28  1 user, load averages: 2.87 2.55 3.08; exit 0
logs/080-baseline-typecheck-load.log; SHA-256 7c0cd322645b824d330742eace963717f3518487440fbde8b07b4a0c27c28248
 0:28  1 user, load averages: 2.87 2.55 3.08; exit 0
logs/081-baseline-restore-install-mode.log; SHA-256 0f877433fc75fa99bea1ffb17edd8f1296e468a49d1d4634d729c1cb8ad52e2e
 0:28  1 user, load averages: 2.72 2.52 3.06; exit 0
logs/084-baseline-typecheck.log; SHA-256 c4e3846cdb6a01135bc05117c1169a59a0f3114f6697df311be9e84b56061cc4
 0:34  up  1:05, 1 user, load averages: 2.14 2.11 2.69; exit 0
logs/085-baseline-suite-runtime.log; SHA-256 4243661b85e8566276fa784efe5807438c2e4a00083967bb0721fdf24d318e30
 0:36  up  1:07, 1 user, load averages: 2.81 2.39 2.72; exit 0
logs/086-baseline-suite-load.log; SHA-256 0e7dc26a25b0a1fede45ead15254dffce729180b10a80a6378f49a233c7500ed
 0:36  1 user, load averages: 2.75 2.39 2.71; exit 0
logs/088-baseline-suite.log; SHA-256 e58ac63a1953d83dc919a58d48f1e85d0efe916164f3f4c2d143a5b8124e5166
 0:38  up  1:09, 1 user, load averages: 1.66 2.15 2.57; exit 0
logs/089-baseline-test-list.log; SHA-256 21382c8716769763b4f076f899e47ef3a09704ebb05f1f9949ef027918f4ded5
 0:42  1 user, load averages: 2.85 2.39 2.56; exit 0
logs/090-baseline-final-state.log; SHA-256 f2cafe1aa372c7e858f87d0a1e4cd8102124a3086f53312d2a6b6807b11f8983
 0:42  1 user, load averages: 2.85 2.39 2.56; exit 0

Baseline: 1945 pass; 0 fail; 24066 expect() calls; Ran 1945 tests across 142 files. Its complete timing-bearing summary is logs/088-baseline-suite.log; SHA-256 e58ac63a1953d83dc919a58d48f1e85d0efe916164f3f4c2d143a5b8124e5166. Base result list logs/089-baseline-test-list.log; SHA-256 21382c8716769763b4f076f899e47ef3a09704ebb05f1f9949ef027918f4ded5. One result line per test was present; no JUnit listing run was needed.


4. Requirements, tests and breaks


R1: CLAUDE_CODE_REGISTRATION.supported_versions is exactly 2.1.325. Only the expressly authorized expected-version and shared-fixture values change.

R2: MADV_SURFACE_REGISTRATION and its ENTRIES line add the single static B2 registration after Antigravity. Field-for-field testing checks every value; no argument vector adds shell permission.

R3: environment.ts adds madv-surface-v1, preserving construction, redaction and preflight installation/TMPDIR validation. New environment and preflight tests cover exact names, missing required variables, excluded state/override variables, canary redaction and one environment shared by both probes and the launch plan's host/child consumers. Actual M1 launch wiring remains deferred.

R4: the private ESM adapter has no dependencies or subprocess/shell/state behavior. encodeUserInput, MadvSurfaceParser, beginRequest, checkDeadline, finish, parseMadvIdentity and parseMadvAuthReadiness provide bound events, ordering, every-response checks, typed failure precedence, whole-session interruption with retry false and a 30-second missing-evidence deadline. It follows the Claude package layout, identity binding and typed failure contracts, while leaving legacy launch/configuration/MCP notification contracts behind as the opening task detail explains.

R5: supervisor dependency, tsconfig path and lockfile line connect the adapter. ProbeRequest carries registration; runBoundedProbe selects the madv parser, 30-second limit and natural exit from that registration. Claude parser/input/five-second constants and existing attestation tests remain unchanged. preflight keeps probe order, protected repository/provider/domain checks and launch arguments, and rejects unsupported madv roles before any probe using pair_ineligible.

R6: record/m0-record.ts is outside the clone and uncommitted. It validates manifest-covered captures, CLI/host/runtime/binary/version pins, allowlisted captured environment names, auth and actual response evidence; builds schema-accepted records; prints required Claude init facts/tool counts and passwd-home storage resolution; and gates its sole store call behind --write. Only synthetic no-write runs occurred, against fourth-commit code that the fifth documentation commit does not change. No Linux run occurred.

Each added test by file/full name:
packages/adapter-madv-surface/test/parser.test.ts | a fail-closed event after valid evidence still interrupts | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | a new request starts its own evidence deadline without a second parser | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | auth accepts exactly the passing predicate and ignores additive metadata | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | auth rejects authMethod | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | auth rejects endpointHost | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | auth rejects loggedIn | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | auth rejects malformed shape, nonzero exit and signal | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | auth rejects profile | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | auth rejects provider | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | auth rejects verified | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | auth rejects verifyMethod | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | event order rejects assistant before response | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | event order rejects duplicate init | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | event order rejects duplicate tool id | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | event order rejects missing init | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | event order rejects out-of-session event | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | event order rejects response before pending tool result | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | event order rejects result before response | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | event order rejects tool before response | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | event order rejects unmatched tool result | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | every later response is checked before its tools | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | exit precedence fails closed without relying on an emitted event | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | exit without evidence for a later request fails closed | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | failure precedence: absent model | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | failure precedence: Anthropic model | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | failure precedence: domain mismatch | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | failure precedence: HTTP 401 | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | failure precedence: HTTP 403 | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | failure precedence: HTTP error | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | failure precedence: invalid body | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | failure precedence: model mismatch | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | failure precedence: redirect | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | failure precedence: unnamed family | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | identity rejects init endpoint_host | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | identity rejects init profile | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | identity rejects init provider | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | identity rejects init requested_model | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | identity rejects init surface | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | identity rejects init surface_version | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | identity rejects response endpoint_host | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | identity rejects response profile | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | identity rejects response provider | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | identity rejects response response_independence_domain | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | identity rejects response response_model | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | identity rejects response tls_verified_host | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | identity requires a model response and clean zero exit | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | input encoder preserves one text in one newline-terminated user message | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | missing evidence fails at the 30-second deadline | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | stream chunks preserve UTF-8 and malformed JSON fails closed | R4; B3-B4 and B7 item 1
packages/adapter-madv-surface/test/parser.test.ts | valid identity evidence binds execution and session | R4; B3-B4 and B7 item 1
packages/protocol/test/adapter-registry.test.ts | madv-surface registration matches DEC-20261115-02 field for field | R2; B2
packages/supervisor/test/madv-environment.test.ts | madv-surface redacts its synthetic canary | R3; B6
packages/supervisor/test/madv-environment.test.ts | madv-surface-v1 drops state, overrides and unlisted variables | R3; B6
packages/supervisor/test/madv-environment.test.ts | madv-surface-v1 has exactly the approved variables | R3; B6
packages/supervisor/test/madv-environment.test.ts | madv-surface-v1 requires exactly the six required variables | R3; B6
packages/supervisor/test/madv-preflight.test.ts | madv-surface hash and version changes refuse the capability record | R5; B3-B5 and B7 item 1
packages/supervisor/test/madv-preflight.test.ts | madv-surface probes run exactly once with pinned arguments and input | R5; B3-B5 and B7 item 1
packages/supervisor/test/madv-preflight.test.ts | madv-surface reuses one allowlisted environment for four consumers | R3; B6
packages/supervisor/test/madv-preflight.test.ts | missing MINIMAX_API_KEY maps to auth_not_ready before probes | R3; B6
packages/supervisor/test/madv-preflight.test.ts | real registry admits Claude with madv-surface and refuses shared review control | R5; B3-B5 and B7 item 1
packages/supervisor/test/madv-preflight.test.ts | real-registry Antigravity is refused before its probes | R5; B3-B5 and B7 item 1
packages/supervisor/test/madv-preflight.test.ts | unsupported madv-surface roles fail before any probe | R5; B3-B5 and B7 item 1
packages/supervisor/test/madv-probes.test.ts | dispatch keeps Claude probes and input unchanged | R5; B3-B5 and B7 item 1
packages/supervisor/test/madv-probes.test.ts | madv-surface auth failures map to auth_not_ready | R5; B3-B5 and B7 item 1
packages/supervisor/test/madv-probes.test.ts | madv-surface cancellation retains bounded cleanup and reaping | R5; B3-B5 and B7 item 1
packages/supervisor/test/madv-probes.test.ts | madv-surface identity continues beyond init to natural exit | R5; B3-B5 and B7 item 1
packages/supervisor/test/madv-probes.test.ts | madv-surface identity failures map to identity_mismatch | R5; B3-B5 and B7 item 1
packages/supervisor/test/madv-probes.test.ts | madv-surface keeps both raw stream limits and metadata-only diagnostics | R5; B3-B5 and B7 item 1
packages/supervisor/test/madv-probes.test.ts | madv-surface pre-spawn cancellation and spawn failure fail closed | R5; B3-B5 and B7 item 1
packages/supervisor/test/madv-probes.test.ts | registration chooses 30 seconds beside Claude's 5 seconds | R5; B3-B5 and B7 item 1

Break 5: Adding XDG_STATE_HOME leaks an excluded ambient variable.
Runtime: logs/110-break-5-runtime.log; SHA-256 11ba93708c8b5111fa34d20387a364e4fb7864ca5825d51a6f6a2b37ea3ecfde
Wait: logs/111-break-5-load.log; SHA-256 669848e89bdbc93b38876a3fe93c790b65c1735930efba013ba61e6fbc622af8
Run: logs/112-break-5-test.log; SHA-256 49d07f655835a4d4e756745473273acee63afe27b1b1f0593c214ec502283b3d
 6:27  up  6:58, 1 user, load averages: 1.46 1.42 1.50
The failing run is cited in full by its log because its output contains square brackets.
Every test result in that file, without timings, derived from the cited run:
(pass) madv-surface-v1 has exactly the approved variables
(pass) madv-surface-v1 requires exactly the six required variables
(fail) madv-surface-v1 drops state, overrides and unlisted variables
(pass) madv-surface redacts its synthetic canary
Restore: logs/113-break-5-restore.log; SHA-256 20f2841df6a572b5e22a26c07700bf39031c001aa6bc854f989ae1248d9c55f4
Committed empty-status and equal-hash proof: logs/119-break-5-committed-restore-proof.log; SHA-256 5f0e4d73054062342b32ad3b5b63eeaf191fcc70c4ff53f0850625951e6ef1de
Restored and committed SHA-256: 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb


Break 1: Removing response-model equality admits a different valid MiniMax model, including a later response.
Runtime: logs/130-break-1-runtime.log; SHA-256 de5671ba5ba537912bcd4d2c0bc0fa195af3bf09f462c629b5f3d61c9bac2899
Wait: logs/131-break-1-load.log; SHA-256 cdf9db8bf1366ad4dc67f43b5ba70e221d1142ec4b40d25ad9993fd18da68e08
Run: logs/132-break-1-test.log; SHA-256 8baaf66accae12f4199c30de40c90b2d323d15613ea76dae66e78a8be3dd8e2b
 8:24  up  8:55, 1 user, load averages: 1.38 2.59 2.46
The failing run is cited in full by its log because its output contains square brackets.
Every test result in that file, without timings, derived from the cited run:
(pass) input encoder preserves one text in one newline-terminated user message
(pass) valid identity evidence binds execution and session
(pass) failure precedence: HTTP 401
(pass) failure precedence: HTTP 403
(pass) failure precedence: redirect
(pass) failure precedence: HTTP error
(pass) failure precedence: invalid body
(pass) failure precedence: absent model
(pass) failure precedence: Anthropic model
(pass) failure precedence: unnamed family
(pass) failure precedence: model mismatch
(pass) failure precedence: domain mismatch
(pass) identity rejects init surface
(pass) identity rejects init surface_version
(pass) identity rejects init profile
(pass) identity rejects init provider
(pass) identity rejects init endpoint_host
(pass) identity rejects init requested_model
(fail) identity rejects response response_model
(pass) identity rejects response response_independence_domain
(pass) identity rejects response tls_verified_host
(pass) identity rejects response provider
(pass) identity rejects response profile
(pass) identity rejects response endpoint_host
(pass) auth rejects loggedIn
(pass) auth rejects authMethod
(pass) auth rejects profile
(pass) auth rejects provider
(pass) auth rejects endpointHost
(pass) auth rejects verified
(pass) auth rejects verifyMethod
(pass) auth accepts exactly the passing predicate and ignores additive metadata
(pass) auth rejects malformed shape, nonzero exit and signal
(pass) identity requires a model response and clean zero exit
(pass) missing evidence fails at the 30-second deadline
(pass) a new request starts its own evidence deadline without a second parser
(pass) exit without evidence for a later request fails closed
(pass) event order rejects missing init
(pass) event order rejects duplicate init
(pass) event order rejects out-of-session event
(pass) event order rejects assistant before response
(pass) event order rejects tool before response
(pass) event order rejects unmatched tool result
(pass) event order rejects response before pending tool result
(pass) event order rejects duplicate tool id
(pass) event order rejects result before response
(pass) a fail-closed event after valid evidence still interrupts
(fail) every later response is checked before its tools
(pass) stream chunks preserve UTF-8 and malformed JSON fails closed
(pass) exit precedence fails closed without relying on an emitted event
(fail) identity rejects response response_model
(fail) every later response is checked before its tools
Restore: logs/133-break-1-restore.log; SHA-256 7ed1f12af4f9b514bb7124ec3561daded263ce69794f45e1884b0f8c91c6bbe6
Committed empty-status and equal-hash proof: logs/141-break-1-committed-restore-proof.log; SHA-256 45db76bf3f8769f32f3bc1e4cc7c43f6c76b1d2b2e53b0883c11b2e77b773440
Restored and committed SHA-256: 3893b14275b823e82e5d6d43c486ef9b746d854d3e9de1fedbbfab813f2ceec6


Break 2: Waking at init prevents madv identity from reaching its own response and exit; it also wrongly accepts the injected over-budget identity case.
Runtime: logs/160-break-2-runtime.log; SHA-256 47d8bf82ad712c8bea4c8b4d2b4f9d4dd2bf02ab1f6a07fd77a6fed4bbdafc59
Wait: logs/161-break-2-wait.log; SHA-256 7bd33b9947c9ac9fa295a873f0ea6ea725b332cae496c9ad7a9babd6ed080d02
Run: logs/165-break-2-test.log; SHA-256 35b1586f66e569a8e5ff780b62a8c29225defe39af9db4b99c7767a365ee150f
10:32  up 11:03, 1 user, load averages: 4.67 2.16 1.67
The failing run is cited in full by its log because its output contains square brackets.
Every test result in that file, without timings, derived from the cited run:
(pass) dispatch keeps Claude probes and input unchanged
(fail) madv-surface identity continues beyond init to natural exit
(fail) registration chooses 30 seconds beside Claude's 5 seconds
(pass) madv-surface identity failures map to identity_mismatch
(pass) madv-surface auth failures map to auth_not_ready
(pass) madv-surface keeps both raw stream limits and metadata-only diagnostics
(pass) madv-surface pre-spawn cancellation and spawn failure fail closed
(pass) madv-surface cancellation retains bounded cleanup and reaping
Restore: logs/166-break-2-restore.log; SHA-256 16dc9d631ef26abc45ad8b67fa67fbefd2fdc7b40b43a732eae9f682914fc153
Committed empty-status and equal-hash proof: logs/187-commit-4-restore-proof.log; SHA-256 d163c0a07106286b2ee7396ae0908330f1244bc51287f32359918ef344dfc2ae
Restored and committed SHA-256: d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e


Break 3: A five-second madv limit rejects valid evidence at six seconds.
Runtime: logs/168-break-3-runtime.log; SHA-256 ec87da7ff01098bc2adfab819ef7a0942ff3016cfbd8c18683b0a6d5ec4ae74c
Wait: logs/169-break-3-wait.log; SHA-256 9df69887fc3f25d2b74b8f0d59ca1cd6e3cd2b38d4dddc8b953d0f8c5f990b1c
Run: logs/173-break-3-test.log; SHA-256 4832382d5366e6ffec88c3aec93d8898530391c2e3843f9e5b3ac22d3b5038c8
10:43  up 11:14, 1 user, load averages: 1.55 1.56 1.58
The failing run is cited in full by its log because its output contains square brackets.
Every test result in that file, without timings, derived from the cited run:
(pass) dispatch keeps Claude probes and input unchanged
(pass) madv-surface identity continues beyond init to natural exit
(fail) registration chooses 30 seconds beside Claude's 5 seconds
(pass) madv-surface identity failures map to identity_mismatch
(pass) madv-surface auth failures map to auth_not_ready
(pass) madv-surface keeps both raw stream limits and metadata-only diagnostics
(pass) madv-surface pre-spawn cancellation and spawn failure fail closed
(pass) madv-surface cancellation retains bounded cleanup and reaping
Restore: logs/174-break-3-restore.log; SHA-256 df695ee8009f2280cd42337b60da0975d5b3c5257b097c57b84ebbb8477c0df2
Committed empty-status and equal-hash proof: logs/187-commit-4-restore-proof.log; SHA-256 d163c0a07106286b2ee7396ae0908330f1244bc51287f32359918ef344dfc2ae
Restored and committed SHA-256: d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e


Break 4: Removing the role guard returns an admitted plan for an unsupported madv role.
Runtime: logs/176-break-4-runtime.log; SHA-256 19a6b22cd2ca7458984b0f4e2e3960e3150e9b2119bca52907319eec9ce6a592
Wait: logs/177-break-4-wait.log; SHA-256 4996ceeb4b424b8db08a12cc0d78b08b03dbfe6dcf95c679b0d959858e83c942
Run: logs/178-break-4-test.log; SHA-256 1a0fc4216cc51d8f8be9c66b5348035b32e000cd494b598cc21223cf377cf46e
10:44  up 11:14, 1 user, load averages: 1.65 1.58 1.59
The failing run is cited in full by its log because its output contains square brackets.
Every test result in that file, without timings, derived from the cited run:
(pass) missing MINIMAX_API_KEY maps to auth_not_ready before probes
(pass) madv-surface reuses one allowlisted environment for four consumers
(pass) madv-surface probes run exactly once with pinned arguments and input
(fail) unsupported madv-surface roles fail before any probe
(pass) madv-surface hash and version changes refuse the capability record
(pass) real registry admits Claude with madv-surface and refuses shared review control
(pass) real-registry Antigravity is refused before its probes
Restore: logs/179-break-4-restore.log; SHA-256 d09e1336b0863116ad2afe90aec047cbbf4440b0208124f9cc6b6df261c5ca3b
Committed empty-status and equal-hash proof: logs/187-commit-4-restore-proof.log; SHA-256 d163c0a07106286b2ee7396ae0908330f1244bc51287f32359918ef344dfc2ae
Restored and committed SHA-256: 18756ff1120edee8a1fb04d057ec78334577d5a3dd816fb813da7b75d6c96a51



5. Existing tests changed


packages/protocol/test/adapter-registry.test.ts | claude-code registration matches the PLAN-OPEN-1 ruling field for field | 18, shared expected registration | R1; EXISTING TESTS item 1; B15 item 1
packages/protocol/test/adapter-registry.test.ts | the registry contains exactly the three Founder-ratified surfaces | 64-67; authorized rename | R2; Addendum 1 B3 item 1
packages/protocol/test/adapter-registry.test.ts | registry membership cannot be mutated at runtime | 124-126 | R2; Addendum 1 B3 item 1
packages/supervisor/test/environment.test.ts | no ambient variable outside the allowlist survives | 23-24 helper; 46 | R3/R2; Addendum 1 B3 item 2
packages/supervisor/test/environment.test.ts | a missing required allowlisted variable is a typed failure | 23-24 helper | R3; Addendum 1 B3 item 2
packages/supervisor/test/environment.test.ts | secret-marked values are redacted from diagnostics while their names are retained | 23-24 helper; existing assertions unchanged | R3; Addendum 1 B3 item 2
packages/supervisor/test/environment.test.ts | redaction reports which rules ran | 23-24 helper; 138 | R3; Addendum 1 B3 item 2, extended by Addendum 2 B1
packages/supervisor/test/environment.test.ts | the same registration produces byte-identical environments on repeated calls | 23-24 helper | R3; Addendum 1 B3 item 2
test/phase3a/harness-separation.test.ts | no file under apps/ or packages/*/src statically imports, command-dispatches to, or argument-gates runtime-harness | 24; registry hash alone | R2; Addendum 1 B3 item 3
test/phase3a/evidence-pipeline.test.ts | every investigated surface has both a capability record and a committed report | 840 and 842; historical 2.1.296 literal | R1/R2; Addendum 1 B3 item 4
packages/supervisor/test/preflight.test.ts | preflight fails with envelope_invalid | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | preflight fails with cardinality | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | preflight fails with repository_fingerprint | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | preflight canonicalizes a symlink-named worktree and preserves the same-repository check | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | preflight fails with repository_fingerprint when the envelope names another checkout or commit | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | preflight fails with repository_fingerprint when the repository root and the worktree belong to different repositories | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | preflight fails with executable_unresolved | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | preflight fails with identity_mismatch | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | preflight fails with identity_mismatch when the independence domain differs from the registration | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | preflight fails with auth_not_ready | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | preflight fails with pair_ineligible | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | preflight threads its fixture registration resolver through pair eligibility | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | public preflight rejects fixture dependencies before and after a test-seam call | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | fixture preflight keeps pair policy and registration overrides local to each call | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | preflight fails with storage_root_invalid | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | preflight fails with host_capability_missing | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | preflight fails with capability_record_stale | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | preflight fails with home_mismatch | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | temporary path recording sees files a child creates and removes before returning | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | the returned plan's repository fingerprint is frozen | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | preflight creates nothing | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | probe environment equals launch environment | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | a cached attestation is not reused across sessions | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | a surface without an actual-session identity primitive is ineligible | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | missing TERM fails preflight as auth_not_ready | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | missing TMPDIR fails preflight as auth_not_ready | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | a caught MissingRequiredVariableError maps to auth_not_ready | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | the auth probe enforces the 5,000 ms execution deadline | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | the auth probe escalates SIGTERM to SIGKILL within the forced-cleanup budget | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | the auth probe reaps the child successfully | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone
packages/supervisor/test/preflight.test.ts | cleanup-budget exhaustion fails closed as auth_not_ready | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone

The full diff, including each exact changed line, is logs/229-existing-test-final-diffs.log; SHA-256 593de0b5b8efa97541039f39c7ca5d3c19f9d0ccff989358719b23d9ceb82414. It contains square brackets, so it is cited by log/SHA-256 rather than copied. No other base test was removed, skipped, weakened or edited. Existing attestation tests and all protected fixtures retain their bytes.


6. Commits, parents and message checks


408f73851204d4a5f540cb8ebded8cd5d76fe3d4
0825a1e349ca5ea6427eea5f2de79dff234dc8f7
docs(verification): open the M0 build log with its task detail.
ba8bb4a8a798767abcb8bed9a02eed38a1f0d531
408f73851204d4a5f540cb8ebded8cd5d76fe3d4
feat(supervisor): add the madv-surface-v1 environment allowlist.
f28d7a9c082253178dd823401a1c8256f332832c
ba8bb4a8a798767abcb8bed9a02eed38a1f0d531
feat(adapter-madv-surface): parse madv-surface events and encode input.
6b456f468fc3a72894a8f39b8a07c86b9cf077b4
f28d7a9c082253178dd823401a1c8256f332832c
feat(supervisor): register madv-surface and dispatch its probes.
7f94c272a4fd7fc3b4ab1d18920b80ac95c677d3
6b456f468fc3a72894a8f39b8a07c86b9cf077b4
docs(verification): record Phase 1 of M0 in the build log.


Message gates, one per commit, checked all lines at most 72 characters and exactly the three final trailers Role-Id: builder; Actor-Id: session:codex/3b-m0-r1; Execution-Surface: codex. No Co-authored-by or trailing paragraph. Gate logs:
logs/095-check-commit-1-message.log; SHA-256 a4377e9bcc9abaf4008adfd86af1a12ab7f32ec0b65fd1e50266050146ab6a98
logs/116-check-commit-2-message.log; SHA-256 663e332b82dc8932aa87d49142f905b8b7760daac2b947bffb8da0e8492f1a83
logs/138-check-commit-3-message.log; SHA-256 eaac6d127a07b5e49ca0199001bec7c6ed1b79f2f7965993ea353303c6ec8b9f
logs/182-commit-4-message-check.log; SHA-256 23900afb4a156689e8e56f9bef0b583f14940a3d74d0077a718537f3b460e705
logs/253-commit-5-message-check.log; SHA-256 991e6e60174be9b024eca65eaf159662bdf6462dd5b52a8e9f61963628024648


7. Full Phase 1 run and comparison


Code head 6b456f468fc3a72894a8f39b8a07c86b9cf077b4. Each gate ran once in the specified order. Frozen lock SHA-256 before/after/commit a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830. Typecheck exited zero with no compiler output. Bare suite 2015 pass, 0 fail, 27280 expect() calls, 2015 tests across 146 files; no skipped or todo result. The full timing-bearing summaries are cited by log because they contain square brackets.
logs/188-full-runtime-before-install.log; SHA-256 a75e088406776ed2f4a09f96621c7d8feb3f82037df0356ea76fb6b370747010
11:49  up 12:19, 1 user, load averages: 1.68 1.79 1.89; exit 0
logs/189-full-frozen-install.log; SHA-256 89095224bd3bfe088bbeed0535547086e5a8d2ecc0514038fcb03bb54591085a
11:54  up 12:25, 1 user, load averages: 1.92 1.66 1.78; exit 0
logs/190-full-install-state.log; SHA-256 27e4231d605f900107262ba756bfd1ffd0c1fa6efb2a3559fbec3cbb4eeaecb1
11:54  1 user, load averages: 1.92 1.67 1.78; exit 0
logs/191-full-install-mode-restore.log; SHA-256 49a87de42739d373a657c6a94b70422a6066ad5a4b632954df37f7443eca50f1
11:54  1 user, load averages: 1.93 1.67 1.78; exit 0
logs/192-full-typecheck-wait.log; SHA-256 2f95073f73a831ed8f623e2bedf0c6bffc9d40f3a8fbda664441bf38676f58ac
11:54  1 user, load averages: 1.93 1.67 1.78; exit 0
logs/193-full-typecheck.log; SHA-256 803f95cd5b1ec54627c40f400bb5ca54a17e8de12fa4dd41f3d0b6e251faceaf
12:27  up 12:58, 1 user, load averages: 2.81 1.68 1.61; exit 0
logs/194-full-runtime-before-suite.log; SHA-256 27d8d3d27509b1660849639fe9def6e1def885e0b850dea4043c78a56793c7a9
12:28  up 12:58, 1 user, load averages: 3.17 1.85 1.67; exit 0
logs/195-full-suite-wait.log; SHA-256 d2d2eeb802adec4ef44d2c28e4af3e6d6461ac10a7df6f1d3237fe8062ede4c6
12:28  1 user, load averages: 3.17 1.85 1.67; exit 0
logs/199-full-suite.log; SHA-256 ecb4ef94bf74b7d4f59865c72d8668cd2c813073d0f0207c920bbfb2fe19aeb1
12:29  up 13 hrs, 1 user, load averages: 1.71 1.70 1.63; exit 0
logs/200-head-test-list.log; SHA-256 fad5e4ec9862cecca1d88acb7efdc7e70a1ea4d0e89896aa0d89ea5c4d5eb036
12:32  1 user, load averages: 1.17 1.53 1.57; exit 0
logs/201-full-test-comparison.log; SHA-256 c33675929fffb7f04935bcbf81f0b6f6977198c4538598b8a3f38dd8b7cb50be
12:32  1 user, load averages: 1.36 1.53 1.57; exit 0
logs/202-full-diff-check.log; SHA-256 e7ce0b8d659a475c1387b6fc30abff85ad9bc94ee6a051ed243671ba45a938f3
12:33  1 user, load averages: 1.65 1.59 1.59; exit 0
logs/203-full-changed-paths.log; SHA-256 60422b69101a787275272032550c108a9fcd64a5aed0e22a89e50cbbcac600e2
12:33  1 user, load averages: 1.65 1.59 1.59; exit 0
logs/204-full-registry-diff.log; SHA-256 38a59444c7de7125cbd25e1750fbbf36eb0856d272472f4daf35b67d87d90c6b
12:33  1 user, load averages: 1.65 1.59 1.59; exit 0
logs/205-full-status.log; SHA-256 04649fd7f4fcf46a35bb160b3447546dddec9950b2e796128d190226f50a7016
12:33  1 user, load averages: 1.65 1.59 1.59; exit 0
logs/206-full-untracked.log; SHA-256 1685cc849c0c24a4883a688a708e1e5855a4996ea6c3790c5ed1cf7f8b3e9cd0
12:33  1 user, load averages: 1.65 1.59 1.59; exit 0

Every base name and pass is retained, with only the authorized registry-name mapping. Arithmetic: 1945 + 70 = 2015 tests; 142 + 4 = 146 files. Added tests: four environment + seven preflight + eight probe + fifty parser + one registry = seventy. The two lockfile diffs, in full with their original output, are logs/124-r4-lockfile-diff.log; SHA-256 89d0ab15b75c0c9082293b3635204f1b0a706d7f4093eee89b9a9bc4995f1d59 and logs/150-r5-lockfile-diff.log; SHA-256 11d384e89c51ca6e7db4a12cf4a4a1e95d59de297ce6aa998ee72737beb6be00. Changed-path list logs/203-full-changed-paths.log; SHA-256 60422b69101a787275272032550c108a9fcd64a5aed0e22a89e50cbbcac600e2. All changed paths are authorized.


8. Diff stat and complete code diff


 bun.lock                                           |    7 +
 docs/verification/phase-3b-m0-build-log.md         | 2870 ++++++++++++++++++++
 packages/adapter-madv-surface/package.json         |    6 +
 packages/adapter-madv-surface/src/index.ts         |  216 ++
 packages/adapter-madv-surface/test/parser.test.ts  |  137 +
 packages/protocol/src/adapter-registry.ts          |   30 +-
 packages/protocol/test/adapter-registry.test.ts    |   32 +-
 packages/supervisor/package.json                   |    1 +
 packages/supervisor/src/attestation.ts             |   29 +-
 packages/supervisor/src/environment.ts             |   15 +
 packages/supervisor/src/preflight.ts               |    9 +-
 packages/supervisor/test/environment.test.ts       |    7 +-
 packages/supervisor/test/madv-environment.test.ts  |   40 +
 packages/supervisor/test/madv-preflight-support.ts |   77 +
 packages/supervisor/test/madv-preflight.test.ts    |   97 +
 packages/supervisor/test/madv-probes.test.ts       |  121 +
 packages/supervisor/test/preflight.test.ts         |    8 +-
 test/phase3a/evidence-pipeline.test.ts             |    4 +-
 test/phase3a/harness-separation.test.ts            |    2 +-
 tsconfig.json                                      |    1 +
 20 files changed, 3680 insertions(+), 29 deletions(-)


Complete diff of every changed file other than the build log: logs/230-complete-phase1-code-diff.log; SHA-256 1b6823c2ebfc89e7197595223d8f137b9f936339279260b52250cb34d721a262. Its output contains square brackets, so it is cited in full under the report-format rule. The fifth commit changes the build log alone, leaving that code diff byte-identical.


9. Record script and runs


record/m0-record.ts SHA-256 de3ea7cc7ded52c5ab14eed40280d420ce375e9c56b12cfd838cf2010a5550dd. Full final source is also logs/244-record-script-final-source.log; SHA-256 e2717fc9c0841dfd9d573393e7138fdf4fa8aefac6d6e88b938b1e44728d70c3. Uncommitted, outside tui. Full source follows:


// DEC-20261115-02 B10 and B15 item 3. Founder-run capture reader.
// No surface is executed. Only --write can call the capability store.
import { readFileSync, realpathSync, lstatSync } from "node:fs";
import { isAbsolute, join, relative, basename } from "node:path";
import { arch, platform, release, userInfo } from "node:os";
import { pathToFileURL } from "node:url";

type Json = Record<string, any>;
type Capture = { argv: Array<string>; stdin: string; stdout: string; stderr: string; exit: number; signal: string | null; timedOut: boolean };
const checks = new Array<{ check: string; pass: boolean }>();
const initFacts = new Array<Json>();
const toolCounts = new Array<Json>();
const hash = (bytes: string | Uint8Array) => new Bun.CryptoHasher("sha256").update(bytes).digest("hex");
const markers = new Array("sk-cp-", "sk-ant-");
function reject(reason: string): never { throw new Error(reason); }
function safe(bytes: string | Uint8Array, label: string): void {
  const text = typeof bytes === "string" ? bytes : new TextDecoder().decode(bytes);
  if (markers.some(marker => text.includes(marker))) reject("forbidden marker: " + label);
}
function check(name: string, pass: boolean): boolean { checks.push({ check: name, pass }); return pass; }
function requireCheck(name: string, pass: boolean): void { if (!check(name, pass)) reject(name); }
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const lines = (text: string) => text.replace(/\n$/, "").split("\n");
const object = (value: unknown): value is Json => value !== null && typeof value === "object" && !Array.isArray(value);

async function main(): Promise<void> {
  if (process.env.MINIMAX_API_KEY !== undefined) reject("MINIMAX_API_KEY is set");
  if (process.env.MADV_STORAGE_DIR !== undefined) reject("MADV_STORAGE_DIR is set");
  const options = new Map<string, string>();
  const args = process.argv.slice(2);
  let write = false;
  for (let i = 0; i < args.length; i++) {
    const name = args.at(i)!;
    if (name === "--write" && !write) { write = true; continue; }
    if (!new Array("--clone", "--surface", "--host", "--investigation").includes(name)
      || options.has(name) || args.at(i + 1) === undefined) reject("invalid arguments");
    options.set(name, args.at(++i)!);
  }
  if (options.size !== 4) reject("missing arguments");
  const root = options.get("--clone")!;
  const surface = options.get("--surface")!;
  const hostName = options.get("--host")!;
  const directory = options.get("--investigation")!;
  if (!isAbsolute(root) || !isAbsolute(directory)) reject("paths must be absolute");
  if (!new Array("madv-surface", "claude-code").includes(surface)) reject("invalid surface");
  if (!new Array("macbook", "ubuntu").includes(hostName)) reject("invalid host");
  const git = Bun.spawnSync(new Array("git", "-C", root, "rev-parse", "--is-inside-work-tree"), { stdout: "pipe", stderr: "pipe" });
  if (git.exitCode !== 0 || git.stdout.toString().trim() !== "true") reject("ROOT is not a git work tree");
  const moduleAt = (path: string) => import(pathToFileURL(join(root, path)).href);
  const protocol = await moduleAt("packages/protocol/src/index.ts");
  const adapter = await moduleAt("packages/adapter-madv-surface/src/index.ts");
  const probes = await moduleAt("packages/supervisor/src/attestation.ts");
  const environment = await moduleAt("packages/supervisor/src/environment.ts");
  const storage = await moduleAt("packages/storage/src/index.ts");
  const registration = protocol.ADAPTER_REGISTRY.get(protocol.parseSurfaceId(surface));
  if (!registration) reject("surface is not registered at ROOT");

  // MANIFEST.sha256 is the integrity index; it covers every capture read.
  // It is not itself a self-referential manifest entry.
  let manifestBytes: Buffer;
  try { manifestBytes = readFileSync(join(directory, "MANIFEST.sha256")); }
  catch { reject("missing MANIFEST.sha256"); }
  safe(manifestBytes, "manifest");
  const manifest = new Map<string, string>();
  for (const line of lines(manifestBytes.toString())) {
    const digest = line.slice(0, 64), name = line.slice(66);
    if (digest.length !== 64 || !Array.from(digest).every(char => "0123456789abcdef".includes(char))
      || line.slice(64, 66) !== "  " || !name || isAbsolute(name)
      || name.includes("\\") || name.split("/").some(part => part === ".." || part === "." || part === "")
      || manifest.has(name)) reject("invalid manifest entry");
    manifest.set(name, digest);
  }
  const realDirectory = realpathSync(directory);
  function read(name: string): string {
    const expected = manifest.get(name);
    if (!expected) reject("file not covered by manifest: " + name);
    const file = join(directory, name);
    let bytes: Buffer;
    try {
      if (!lstatSync(file).isFile() || relative(realDirectory, realpathSync(file)).startsWith("..")) reject("unsafe capture path");
      bytes = readFileSync(file);
    } catch { reject("missing or unsafe file: " + name); }
    safe(bytes, name);
    if (hash(bytes) !== expected) reject("manifest hash mismatch: " + name);
    return bytes.toString("utf8");
  }
  const captures = new Map<number, Capture>();
  const count = surface === "madv-surface" ? 9 : 18;
  for (let n = 1; n <= count; n++) {
    const stem = surface + "/" + String(n).padStart(2, "0");
    const argv = lines(read(stem + ".argv"));
    const stdin = read(stem + ".stdin"), stdout = read(stem + ".stdout"), stderr = read(stem + ".stderr");
    const status = lines(read(stem + ".status"));
    const exit = Number(status.at(0)?.slice(5));
    const signalText = status.at(1)?.slice(7);
    const timeoutText = status.at(2)?.slice(10);
    if (status.length !== 3 || !status.at(0)?.startsWith("exit=") || !Number.isInteger(exit) || exit < 0 || exit > 255
      || !status.at(1)?.startsWith("signal=") || !signalText
      || !(signalText === "none" || (signalText.startsWith("SIG") && Array.from(signalText).every(char => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".includes(char))))
      || !status.at(2)?.startsWith("timed_out=") || !new Array("yes", "no").includes(timeoutText!)) reject("invalid status: " + stem);
    if (!argv.at(0) || !isAbsolute(argv.at(0)!)) reject("invalid executable path in argv: " + stem);
    captures.set(n, { argv, stdin, stdout, stderr, exit, signal: signalText === "none" ? null : signalText, timedOut: timeoutText === "yes" });
  }
  const get = (n: number) => captures.get(n)!;
  const clean = (n: number) => get(n).exit === 0 && get(n).signal === null && !get(n).timedOut;
  const capturedEnvironment = new Map<string, string | null>();
  const secretName = surface === "madv-surface" ? "MINIMAX_API_KEY" : null;
  for (const line of lines(read(surface + "/environment.txt"))) {
    const equals = line.indexOf("="), name = equals < 0 ? line : line.slice(0, equals);
    const value = equals < 0 ? null : line.slice(equals + 1);
    if (capturedEnvironment.has(name) || (name === secretName ? value !== null : value === null)) reject("invalid captured environment names or secret form");
    capturedEnvironment.set(name, value);
  }
  const presence = Object.fromEntries(Array.from(capturedEnvironment, entry => new Array(entry.at(0), entry.at(1) === null ? "SYNTHETIC-SECRET-PRESENCE-ONLY" : entry.at(1))));
  let selected: Json;
  try { selected = environment.buildAllowlistedEnvironment(registration, presence); }
  catch { reject("missing required captured environment variable"); }
  requireCheck("captured environment equals ROOT allowlist selection", same(Object.keys(selected).sort(), Array.from(capturedEnvironment.keys()).sort()));
  const term = capturedEnvironment.get("TERM"), shell = capturedEnvironment.get("SHELL");
  requireCheck("captured TERM and SHELL are present", typeof term === "string" && term.length > 0 && typeof shell === "string" && shell.length > 0);
  requireCheck("captured HOME equals passwd home", capturedEnvironment.get("HOME") === userInfo().homedir);
  const mac = hostName === "macbook";
  requireCheck("host operating system and architecture", mac ? platform() === "darwin" && arch() === "arm64" : platform() === "linux" && arch() === "x64");
  const runtimePath = mac ? "/Users/michaeldaley/.bun/bin/bun" : "/home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun";
  const runtimeHash = mac ? "35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5" : "0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb";
  const runtimeRevision = mac ? "744846f844374847c902b5e7fd59b4342a51ef99" : "69cb78c9097cebd3bdb832d9fff8b7d23abce09e";
  requireCheck("host runtime matches DEC-20261114-01 A4", realpathSync(process.execPath) === realpathSync(runtimePath)
    && hash(readFileSync(runtimePath)) === runtimeHash && Bun.version === (mac ? "1.4.2" : "1.4.1") && Bun.revision === runtimeRevision);
  const prefix = mac ? "/Users/michaeldaley" : "/home/michaeldaley";
  const madv = surface === "madv-surface";
  const binaryPath = madv ? prefix + "/builds/madv-surface-0.1.1/dist/madv-surface" : prefix + "/.local/bin/madbridge-claude-v5";
  const binaryHash = madv
    ? mac ? "daf7ffe5922a3b538d69e6408d4c14c96978b17d16aca2cdeb57e7b6f1852024" : "8dcced0bbc3b6ff3e7372977cae2d48036fa8dabae03e6aa5485efc1bc766a63"
    : mac ? "591bad397af64e89b14a52759cb628a6a1c9b0eabfbd21ae3388fe6a6103ab19" : "bd6c236585c5ba7eb7c3ee5a59a1e134ce4fc676374d97d89ff11c8de103c363";
  const model = madv ? "MiniMax-M3.1-Flash" : "claude-fable-5-2";
  const version = madv ? "0.1.1" : "2.1.325";
  function argv(n: number, expected: Array<string>): void { requireCheck("capture " + n + " argv", same(get(n).argv, expected)); }
  function command(n: number, executable: string, tail: Array<string>): void {
    requireCheck("capture " + n + " command", basename(get(n).argv.at(0)!) === executable && same(get(n).argv.slice(1), tail));
  }
  function hashCapture(n: number): void {
    command(n, mac ? "shasum" : "sha256sum", mac ? new Array("-a", "256", binaryPath) : new Array(binaryPath));
    requireCheck("capture " + n + " binary path and SHA-256 pin", clean(n) && get(n).stdout.trim() === binaryHash + "  " + binaryPath);
  }
  function versionCapture(n: number): void {
    argv(n, new Array(binaryPath, "--version"));
    requireCheck("capture " + n + " version pin", clean(n) && (madv ? get(n).stdout.trim() === "madv-surface 0.1.1" : get(n).stdout.trim().split(/\s+/).at(0) === version));
  }
  function events(n: number): Array<Json> {
    const output = get(n).stdout.trim();
    try {
      const value = JSON.parse(output);
      if (object(value)) return new Array(value);
    } catch { /* A stream has one JSON object per nonblank line. */ }
    try {
      const values = output.split("\n").filter(line => line.trim()).map(line => JSON.parse(line));
      if (values.every(object)) return values;
    } catch { /* Invalid evidence cannot pass a response check. */ }
    check("capture " + n + " structured JSON evidence", false);
    return new Array<Json>();
  }
  let identity = false, auth = false, facts = "", reportedModel = "unavailable";
  const limitations = new Array<string>("No governed session of the real binary ran because production start remains closed; PTY, process-group, termination and timing results are not established.");
  if (madv) {
    hashCapture(1); hashCapture(8); versionCapture(2); versionCapture(9);
    argv(3, new Array(binaryPath, ...registration.auth_readiness_probe.argv));
    auth = check("capture 03 auth parser", clean(3) && adapter.parseMadvAuthReadiness(get(3).stdout, get(3).exit, get(3).signal).ok);
    const input = adapter.encodeUserInput("Reply with your model identifier and nothing else.");
    let repeated = true;
    for (const n of new Array(4, 5, 6)) {
      argv(n, new Array(binaryPath, ...registration.identity_probe.argv, "--model", model));
      requireCheck("capture " + n + " identity stdin", get(n).stdin === input);
      const accepted = check("capture " + n + " identity parser", clean(n) && adapter.parseMadvIdentity(get(n).stdout, model, registration.supported_versions, get(n).exit, get(n).signal).ok);
      repeated = accepted && repeated;
    }
    argv(7, new Array(binaryPath, ...registration.identity_probe.argv.filter((flag: string) => flag !== "--require-model"), "--model", "MiniMax-M3.1-Flash-Preview"));
    requireCheck("capture 07 identity stdin", get(7).stdin === input);
    const retired = events(7), first = retired.at(0), responses = retired.filter(event => event.type === "model_response");
    const resolved = check("capture 07 retired id resolves to current served model", clean(7)
      && first?.type === "system" && first.subtype === "init" && first.surface === surface && first.surface_version === version
      && first.requested_model === "MiniMax-M3.1-Flash-Preview" && first.profile === "minimax" && first.provider === registration.provider && first.endpoint_host === "api.minimax.io"
      && responses.length > 0 && responses.every(event => event.response_model === model && event.response_independence_domain === registration.independence_domain && event.provider === registration.provider && event.profile === "minimax" && event.tls_verified_host === "api.minimax.io" && event.endpoint_host === "api.minimax.io")
      && retired.every(event => event.session_id === first.session_id && !(event.type === "system" && event.subtype !== "init")));
    identity = repeated && resolved;
    const observed = events(4).find(event => event.type === "model_response");
    if (typeof observed?.response_model === "string" && observed.response_model) reportedModel = observed.response_model;
    facts = "Phase 3A design 2.2 clause 1, a documented CLI or API primitive returning the resolved provider and exact model for the actual session: " + (identity ? "met" : "not met")
      + ". Captures 04-06: system/init.surface, surface_version, profile, provider, endpoint_host and requested_model; model_response.response_model, response_independence_domain and tls_verified_host; clean exit. Capture 07 compares actual response_model with MiniMax-M3.1-Flash to distinguish resolution from a retired-id echo; this condition is " + (resolved ? "met" : "not met") + ". "
      + "Clause 2, structured per-session or per-response metadata naming the provider and exact model actually used: " + (identity ? "met" : "not met")
      + ". The same captures' model_response.response_model, provider, response_independence_domain and tls_verified_host support this result. Configuration, requested intent, auth and banners are not passing identity evidence.";
    limitations.push(...registration.limitations);
  } else {
    for (const n of new Array(1, 14)) command(n, "ls", new Array("-l", binaryPath));
    for (const n of new Array(2, 15)) {
      command(n, "realpath", new Array(binaryPath));
      requireCheck("capture " + n + " launcher realpath pin", clean(n) && get(n).stdout.trim() === binaryPath);
    }
    for (const n of new Array(3, 16)) command(n, "file", new Array(binaryPath));
    hashCapture(4); hashCapture(17); versionCapture(5); versionCapture(18);
    argv(6, new Array(binaryPath, "--help")); argv(7, new Array(binaryPath, "auth", "--help"));
    argv(8, new Array(binaryPath, ...registration.auth_readiness_probe.argv));
    auth = check("capture 08 auth parser", clean(8) && probes.parseAuthReadiness(get(8).stdout));
    argv(9, new Array(binaryPath, ...registration.identity_probe.argv));
    argv(10, new Array(binaryPath, ...registration.identity_probe.argv, "--model", model));
    argv(11, new Array(binaryPath, ...registration.identity_probe.argv, "--model", "fable"));
    const print = new Array(binaryPath, "--print", "--output-format", "json", "--no-session-persistence");
    argv(12, new Array(...print, "Reply with the single word ok."));
    argv(13, new Array(...print, "--model", model, "Reply with the single word ok."));
    let safeSession = true;
    const parsed = new Map<number, Array<Json>>();
    for (const n of new Array(9, 10, 11, 12, 13)) {
      const values = events(n); parsed.set(n, values);
      let calls = 0;
      function visit(value: unknown): void {
        if (Array.isArray(value)) { value.forEach(visit); return; }
        if (!object(value)) return;
        if (value.type === "tool_use") calls++;
        Object.values(value).forEach(visit);
      }
      values.forEach(visit); toolCounts.push({ capture: n, tool_calls: calls });
      safeSession = check("capture " + n + " no tool call", calls === 0 && values.length > 0 && clean(n)) && safeSession;
      if (n <= 11) {
        requireCheck("capture " + n + " fixed identity stdin", get(n).stdin === probes.IDENTITY_PROBE_INPUT);
        const inits = values.filter(event => event.type === "system" && event.subtype === "init");
        let allSafe = inits.length > 0;
        for (const event of inits) {
          initFacts.push({ capture: n, permissionMode: event.permissionMode, mcp_servers: event.mcp_servers, plugins: event.plugins, tools: event.tools });
          allSafe = allSafe && event.permissionMode === "dontAsk" && new Array(event.mcp_servers, event.plugins, event.tools).every(value => Array.isArray(value) && value.length === 0);
          requireCheck("capture " + n + " init version pin", event.claude_code_version === version);
        }
        safeSession = check("capture " + n + " init safety fields", allSafe) && safeSession;
      }
    }
    requireCheck("Claude investigation safety conditions", safeSession);
    const observed = parsed.get(10)!.find(event => event.type === "assistant");
    if (typeof observed?.message?.model === "string" && observed.message.model) reportedModel = observed.message.model;
    function served(n: number): boolean {
      const values = parsed.get(n)!;
      const assistants = values.filter(event => event.type === "assistant");
      const results = values.filter(event => event.type === "result");
      return check("capture " + n + " actual canonical response model", clean(n) && assistants.length > 0
        && assistants.every(event => event.message?.model === model)
        && results.length > 0 && results.every(event => {
          const usage = object(event.modelUsage) ? Reflect.get(event.modelUsage, model) : undefined;
          return event.is_error === false && object(usage) && usage.canonicalModel === model && usage.provider === "firstParty" && typeof usage.outputTokens === "number" && usage.outputTokens > 0;
        }));
    }
    const canonical = served(10), alias = served(11);
    identity = canonical && alias && safeSession;
    facts = "Phase 3A design 2.2 clause 1, a documented CLI or API primitive returning the resolved provider and exact model for the actual session: not established. Captures 06-07 document formats and auth, not a same-session resolved-identity query. "
      + "Clause 2, structured per-session or per-response metadata naming the provider and exact model actually used: " + (identity ? "met" : "not met")
      + ". Captures 10 and 11: assistant.message.model; result.modelUsage for claude-fable-5-2, canonicalModel, provider firstParty and positive outputTokens. Capture 11 requests alias fable while those response fields must name claude-fable-5-2. Captures 09-11 init permissionMode, mcp_servers, plugins and tools and captures 09-13 structured tool-call counts must satisfy the safety conditions. No init.model, configured model, registration, flag echo, auth field or prose supplies passing identity evidence.";
    if (!get(3).stdout.includes("Mach-O")) limitations.push("binary_sha256 pins the shell launcher, not the program it starts; capture 03 does not identify R as a Mach-O executable.");
    const governedHash = mac ? "84590fefe6338be9087f5814b61f9a54c5f21524163a4c127cb5a808e31009f2" : "0dc4f4a9a165fc60746d7ae8489712e5fc352f1e7ad4eb22e7141bd0812eb0cf";
    limitations.push("DEC-20261115-02 A8 item 4 pins the governed copy " + prefix + "/builds/claude-code-governed-2.1.325/claude with SHA-256 " + governedHash + ", checked there against A8 item " + (mac ? "1" : "2") + ". Captures pin the launcher; this script does not read or execute either binary.");
    limitations.push("Emitted provider firstParty is response evidence; registration metadata anthropic is separately copied and supplies no identity proof. This dated record authorizes no live execution and does not replace M1 re-attestation.");
  }
  for (let n = 1; n <= count; n++) {
    if (!(madv ? new Array(4, 5, 6, 7) : new Array(9, 10, 11)).includes(n)) requireCheck("capture " + n + " empty stdin", get(n).stdin === "");
    if (!(madv ? new Array(3, 4, 5, 6, 7) : new Array(8, 9, 10, 11, 12, 13)).includes(n)) requireCheck("capture " + n + " successful local primitive", clean(n));
  }
  requireCheck("registered version pin", same(registration.supported_versions, new Array(version)));
  function local(command: string, tail: Array<string>): string {
    const result = Bun.spawnSync(new Array(command, ...tail), { stdout: "pipe", stderr: "pipe" });
    if (result.exitCode !== 0) reject("host fact command failed");
    return result.stdout.toString().trim();
  }
  let host: Json;
  if (mac) host = { arch: arch(), macos_version: local("/usr/bin/sw_vers", new Array("-productVersion")), macos_build: local("/usr/bin/sw_vers", new Array("-buildVersion")), bun_version: Bun.version, bun_path: runtimePath, bun_sha256: runtimeHash, term, shell };
  else {
    const osRelease = readFileSync("/etc/os-release", "utf8");
    const osFields = new Map<string, string>();
    for (const line of osRelease.split("\n").filter(line => line.includes("="))) {
      const equals = line.indexOf("=");
      osFields.set(line.slice(0, equals), line.slice(equals + 1).replace(/^"|"$/g, ""));
    }
    host = { os_name: osFields.get("NAME"), os_version: osFields.get("VERSION_ID"), kernel_release: release(), reported_model: reportedModel, adapter_registration: surface };
  }
  const overall = identity && auth;
  const evaluated = new Date();
  const record = protocol.parseCapabilityRecord({
    surface: registration.surface, provider: registration.provider, independence_domain: registration.independence_domain, organization_id: registration.organization_id,
    requested_model: model, cli_version: version, binary_path: binaryPath, binary_sha256: binaryHash,
    evaluated_at: evaluated.toISOString(), expires_at: new Date(evaluated.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(), host,
    identity_attestation: { primitive: new Array(binaryPath, ...registration.identity_probe.argv, "--model", model).join(" "), result: identity ? "pass" : "fail", sanitized_facts: facts },
    auth_readiness: { primitive: new Array(binaryPath, ...registration.auth_readiness_probe.argv).join(" "), result: auth ? "pass" : "fail" },
    pty: { result: "fail", observed_ms: {} }, overall: overall ? "pass" : "fail",
    role_eligibility: overall ? madv ? new Array("independent-reviewer") : new Array("builder", "independent-reviewer") : new Array(),
    independent_review_eligible: overall, limitations,
    redaction_rules_applied: new Array("email-addresses", "json-account-identifiers", "token-patterns"),
  });
  safe(JSON.stringify(record), "record");
  const storageRoot = storage.proposeStorageRoot({}, root, root);
  const filename = protocol.capabilityRecordFilename(record);
  for (const item of checks) console.log(JSON.stringify(item));
  for (const item of initFacts) console.log("system/init " + JSON.stringify(item));
  for (const item of toolCounts) console.log("tool calls " + JSON.stringify(item));
  console.log("record " + JSON.stringify(record));
  console.log("default storage root " + storageRoot);
  console.log("record filename " + filename);
  if (write) {
    const file = storage.writeCapabilityRecord(storageRoot, root, root, record);
    console.log("stored path " + file);
    console.log("stored SHA-256 " + hash(readFileSync(file)));
  }
}
main().catch(error => {
  console.error("REFUSED " + (error instanceof Error ? error.message : "validation failure"));
  process.exitCode = 1;
});


Each synthetic no-write run, its wait, result, uptime and full output citation:


logs/218-r6-madv-pass.log; SHA-256 1b488f7eb826fba7747352f81240a405824b47145203e476af7c4a18ba79556b
schema accepted; identity pass, auth pass, overall pass; exit 0
12:47  up 13:18, 1 user, load averages: 1.41 1.68 1.78
Wait logs/217-r6-madv-pass-wait.log; SHA-256 22bfd04e0814aea13aacca736c544750ad74535e40a8ee4699d6a24158202907
Full output is cited above because it contains square brackets.

logs/220-r6-madv-echo.log; SHA-256 6555fccd64369fd3dd34ba7f384dc043313f16dae93453ed4723c70617ab6bcd
schema accepted; identity fail, auth pass, overall fail; exit 0
12:48  up 13:18, 1 user, load averages: 1.26 1.60 1.75
Wait logs/219-r6-madv-echo-wait.log; SHA-256 322aca90b0f354b792038a691f55215324ebdd85612101a67c4fb17b675cc7cc
Full output is cited above because it contains square brackets.

logs/222-r6-claude-pass.log; SHA-256 86979ad16e927995a6f92fff3b4378eb504f0f1e8eb35307b9d177bc833189c1
schema accepted; identity pass, auth pass, overall pass; exit 0
12:48  up 13:19, 1 user, load averages: 1.24 1.59 1.74
Wait logs/221-r6-claude-pass-wait.log; SHA-256 be8406297313409b8da7a8ea45ca7e2666542533c56f501ec2ca137de0a96e8a
Full output is cited above because it contains square brackets.

logs/224-r6-claude-wrong-model.log; SHA-256 13e9df088bc1083d2f653e27b3f08d989dcdbd500e6376b210a46c7697726434
schema accepted; identity fail, auth pass, overall fail; exit 0
14:10  up 14:41, 1 user, load averages: 1.77 1.60 1.57
Wait logs/223-r6-claude-wrong-model-wait.log; SHA-256 629d9dbea76959559c3d1bbfacdf2e081d2c6be49f072c8fe33182e66ff785f9
Full output is cited above because it contains square brackets.

logs/227-r6-key-set.log; SHA-256 f80696ca28780d12babbe4e6d9b0399bf35e30a0156f8d47c0c05fb91def6076
REFUSED MINIMAX_API_KEY is set; exit 1
14:34  up 15:05, 1 user, load averages: 2.24 1.77 1.60
Wait logs/225-r6-key-set-wait.log; SHA-256 f426946582efafe8920dfb4150fdf8c6f0a4e20e1bbde304290dc65580e0db60
REFUSED MINIMAX_API_KEY is set

logs/231-r6-storage-set.log; SHA-256 952500574e8d61e96bcdac04d911f421cb94588b8f6ebf0730955146ab90c4ca
REFUSED MADV_STORAGE_DIR is set; exit 1
14:38  up 15:09, 1 user, load averages: 1.75 1.84 1.67
Wait logs/228-r6-storage-set-wait.log; SHA-256 db523f84861ec26503cfc1a45801669640465b405f803ef79d50bf1982b6d871
REFUSED MADV_STORAGE_DIR is set

logs/233-r6-missing-file.log; SHA-256 84ab06d7ff474bd4628ddbea0850c1b59489bf6612771974bd3d8ed371d11bd5
REFUSED missing or unsafe file: madv-surface/04.stdout; exit 1
14:39  up 15:09, 1 user, load averages: 3.11 2.13 1.78
Wait logs/232-r6-missing-file-wait.log; SHA-256 511e54d6b4d2065a8d0f424a3949164853a148d830fdc7050d1bbbf8e9871097
REFUSED missing or unsafe file: madv-surface/04.stdout

logs/235-r6-uncovered-file.log; SHA-256 68fd21abdc6d503d4efccd7e48587628edb780d3fda451e4d46570d58b3a274c
REFUSED file not covered by manifest: madv-surface/04.stdout; exit 1
14:40  up 15:11, 1 user, load averages: 1.69 1.98 1.76
Wait logs/234-r6-uncovered-file-wait.log; SHA-256 79c51440b5ad23d881a9c14c8bd2c7c921e31c70a4b1aa2e9dada5690da09e1a
REFUSED file not covered by manifest: madv-surface/04.stdout

logs/237-r6-changed-file.log; SHA-256 35eeff90822091aa9fb78039bb3912d97e57c38e4333b0f54f76dfbd4835072e
REFUSED manifest hash mismatch: madv-surface/04.stdout; exit 1
14:52  up 15:22, 1 user, load averages: 1.13 1.33 1.48
Wait logs/236-r6-changed-file-wait.log; SHA-256 f33505b0e80737c2adf191689b45314e6f6ae2ff649d2790e8b56f81df95e2ae
REFUSED manifest hash mismatch: madv-surface/04.stdout

logs/239-r6-marker-file.log; SHA-256 f2bea18d6a0d919af4888d860bee83840ba6b11628fdfdc0079f2781e1e26b0e
REFUSED forbidden marker: madv-surface/03.stderr; exit 1
14:52  up 15:23, 1 user, load averages: 1.09 1.31 1.47
Wait logs/238-r6-marker-file-wait.log; SHA-256 c30f51e3f260d7bc1adbcd8ef70fc2b98019b3e9087f3d7f3ed6e46a156b9da8
REFUSED forbidden marker: madv-surface/03.stderr

logs/241-r6-non-work-tree.log; SHA-256 b26fb669a2005eb9cd4229daca472e8cd0c79c1b7ad18cc3b4495f6668fa1234
REFUSED ROOT is not a git work tree; exit 1
14:56  up 15:26, 1 user, load averages: 1.28 1.14 1.34
Wait logs/240-r6-non-work-tree-wait.log; SHA-256 aebdeb0a14cdc5a0f00fe69f485a278d41e27564a62a3b2b33824cfce6dcccf7
REFUSED ROOT is not a git work tree

logs/243-r6-missing-manifest.log; SHA-256 74f15bee521491c76fc5826790fefad27d869c8b6af35b951e986292993e46de
REFUSED missing MANIFEST.sha256; exit 1
15:14  up 15:45, 1 user, load averages: 0.93 1.08 1.16
Wait logs/242-r6-missing-manifest-wait.log; SHA-256 240497e018141598d1929582391c1177ff67767d9340bcd5d1e2a6ae3412fdab
REFUSED missing MANIFEST.sha256

No Linux run occurred. No actual binary was read or executed; release/governed pins were compared with synthetic captures and the governing constants. No --write call occurred.


10. Artifact hashes and attribution shape


Build log SHA-256 5a3d38c0df555f26f969f79b8029b9750af5449ea9163be7ec8486d793f460b3
Saved report path /Users/michaeldaley/builds/m0-r1/pr/m0-phase1-report.md. Its own SHA-256 is emitted after writing and is reported in the final session message; no self-referential hash is embedded.

logs/257-final-attribution-shape.log; SHA-256 66c78c64fa878dc54376e2a8bc2b080a5c051ee36cf05dbfede4d1860ce8e33c
attribution-shape-check: PASS — attribution shape valid (shape-only; attested values are not verified)


11. Deviations and operational limitations


The first halt before baseline was upheld by the Founder and resolved by Addendum 2 and the signed first resume. Halt report SHA-256 4fef47b6a4f9c26e142347967f4e01b80758162e4fd0f6e6f2e3f79a36f44be4; it remains pr/m0-phase1-halt-1-report.md.

Initial logs-directory emptiness was not independently measured before creating the first required command log; the opening records this limitation.

Incidental read/formatting errors were corrected: a wrong relative adapter path in log 057, wc given a directory in log 070, and the first head-list filename in log 196. Some read-only shell invocations group checks, so their final footer is the aggregate shell exit status; earlier component errors remain visible. No required test failure was hidden.

One orchestration evaluation had a syntax error before executing a command. It changed no file and was corrected before continuing.

The first opening whitespace check found trailing tabs on quoted blank source lines. They were removed before commit 1; log 093's compound invocation ended zero, but no commit followed that failed internal check.

R3's first RED also exposed an own synthetic envelope error: repository and worktree were equal. The new helper was corrected to use a separate worktree before the green run. No base assertion changed.

R5's first targeted run failed one own clock assertion because its Claude identity fixture woke at init. The new test was corrected to compare the clean-exit auth budget at 4,999 and 6,000 ms. Production Claude semantics were preserved.

Approval delays sometimes raised actual run load above the preceding successful wait. Both readings are retained. Every such non-deliberate run passed except the already described own uncommitted failures; all other tests in deliberate-break files passed.

Known frozen/non-frozen install executable-bit changes on founder-act main.ts were restored and logged each time, as expressly authorized.

All break restores were compared with saved pre-break bytes first; empty Git status and equality with committed bytes were then shown after the corresponding implementation commit, following the commissioned break-before-commit order.

The first appendix draft separated table rows with blank lines. Packaging review caught this and the rows were joined before commit 5, preserving the opening byte-for-byte.

This appendix's command ledger closes at log 246. Documentation packaging, commit 5 and final attribution/report checks occur afterward and are indexed in the saved final report.

No live call was made. No surface was run. No real key was used. No capability record was written to storage; synthetic records were printed into command logs only. No request left the host other than the package downloads of bun install. No MCP server, agent, memory lookup, GitHub call, push or other network call was used.


Command/log index for the full session through report packaging


Each log contains its command verbatim. Uptime, aggregate invocation exit and full SHA-256 follow; the index does not reproduce capture or environment values.

| Command log, containing the full command and output | Uptime before invocation | Exit | SHA-256 |
| --- | --- | --- | --- |
| logs/001-governed-version.log | 23:45  1 user, load averages: 1.74 9.70 14.17 | 0 | 5b6201f03599ae5d6e1c01fd8a2202ea36ad1a844ed58e03d8bb92dbe90214ee |
| logs/002-pwd.log | 23:46  1 user, load averages: 1.60 9.15 13.87 | 0 | c5e10cf848cc68a9a8d51cb9a29c216f3c6db0f3adde797f7baac9264dfd142d |
| logs/003-branch.log | 23:46  1 user, load averages: 1.60 9.15 13.87 | 0 | 40a2aaebec4852fd122a32a66d1ae5bd53413b298d14e512d56537d0172f9d3a |
| logs/004-head.log | 23:46  1 user, load averages: 1.60 9.15 13.87 | 0 | 20b6d11e9c14097bf43addcb6fce0724d1a9702dd33fab76bb03f750df145667 |
| logs/005-git-name.log | 23:46  1 user, load averages: 1.60 9.15 13.87 | 0 | 8b2073c22e0eea52c4dc7e5336e20ec83dcf4852830a97667833da2da4d04e37 |
| logs/006-git-email.log | 23:46  1 user, load averages: 1.60 9.15 13.87 | 0 | e7e67d5f1c8324c671c1bfed4528cdbd3cb2948bef60a28847e3b3b4644a086e |
| logs/007-runtime-check.log | 23:46  up 17 mins, 1 user, load averages: 1.92 8.85 13.68 | 0 | 832fa84af43b8b1998ae233448b637a2094ae4d69652c5eeb2f965850741bc72 |
| logs/008-repository-preconditions.log | 23:46  1 user, load averages: 2.03 8.32 13.34 | 0 | 171428209dfb6a358388f22d5b91fb48605e7f26c8fb051430a049ab57d3debc |
| logs/009-manifests-and-instructions.log | 23:46  1 user, load averages: 2.03 8.32 13.34 | 0 | 6c2d65a4a55fe4e6d921132d350757c64e53c279ffd502f50136b366b3db82cc |
| logs/010-authority-agents.log | 23:46  1 user, load averages: 2.03 8.32 13.34 | 0 | 0c6044380372327d1a8c0e7eec6f447606466940792a7b94a3f430cb1b280da6 |
| logs/011-authority-m0.log | 23:47  1 user, load averages: 2.11 8.23 13.28 | 0 | fdb6fce7ac628f0f41a88bf57964ae38f27f0a2fc23e3ab2d4f9a86f44be9264 |
| logs/012-authority-m0-addendum.log | 23:47  1 user, load averages: 2.11 8.23 13.28 | 0 | 6f848840ff5d6589b1192895235b9cfc5bdad008afc4858d59e052b1eebd9583 |
| logs/013-authority-hashes.log | 23:47  1 user, load averages: 2.99 7.48 12.69 | 0 | 710a7e088c02a9d473d3993748b7a86ba0d4068b2c502c3736aa6588167118c3 |
| logs/014-authority-12.log | 23:47  1 user, load averages: 2.99 7.48 12.69 | 0 | 4eb0fd41571f9f958560601954a469656ed78f8b7cbe1f18054e294149ff9640 |
| logs/015-authority-13.log | 23:47  1 user, load averages: 2.99 7.48 12.69 | 0 | b7d272c5d49db44de75cda07d8d3efc0c5a17383aa126a0c1153a4cbe55a5f05 |
| logs/016-authority-14.log | 23:47  1 user, load averages: 2.99 7.48 12.69 | 0 | 1d56307024f8ef96bc9996dc6e9e503be18a292e0ff4e2a5fddfbef812c929b3 |
| logs/017-authority-15.log | 23:47  1 user, load averages: 2.99 7.48 12.69 | 0 | 0f015a92084419a23cd206ffaae5067f4c6b07a5b598355454dbd3a8c1d5de5f |
| logs/018-authority-16.log | 23:47  1 user, load averages: 2.99 7.48 12.69 | 0 | 97acd4a2d359bc5cb932fb8df78bca837bd3ce8d54948fd6a6500d3b67824b73 |
| logs/019-authority-17.log | 23:47  1 user, load averages: 2.99 7.48 12.69 | 0 | 8ff6e90acc65e9d267c05ad5c4ccf1f043f4486aa5f39ff6768a30e7892a4faf |
| logs/020-authority-18.log | 23:47  1 user, load averages: 2.99 7.48 12.69 | 0 | 8bb17f609510abbd7ef33cf8a10cb78517a1d07172b447d20651b6a450601772 |
| logs/021-authority-22.log | 23:47  1 user, load averages: 2.99 7.48 12.69 | 0 | edcff6e5110b23e23dd6827c253b39a8daeedfed4486a4c1cb745c926a375e1b |
| logs/022-read-harness-authority.log | 23:48  1 user, load averages: 2.93 7.31 12.57 | 0 | 73303a4eb074915dcceb892624c40069fee44847a08fb52062a6a9b3c93098e6 |
| logs/023-read-governed-build-authority.log | 23:48  1 user, load averages: 3.41 7.27 12.49 | 0 | a76c56255bc78f5467079accd8960568c4faaa5e1026c3052e5d0d71a498439b |
| logs/024-authority-model.log | 23:48  1 user, load averages: 3.41 7.27 12.49 | 0 | 3b8850e6ee6017003ca9038c38a703ec7a30d796ee54237a9f042bd8671e2136 |
| logs/025-authority-1.log | 23:48  1 user, load averages: 3.45 7.22 12.44 | 0 | 04376cb2169ba554bfd80c7894c8888321f619d0d0b6a18605194b70014217fe |
| logs/026-authority-2.log | 23:48  1 user, load averages: 3.45 7.22 12.44 | 0 | 1cabfe8be7fd5e4f30433ca982e89660ef997621fdeb2ec60b9fe8a0bf892ef8 |
| logs/027-authority-3.log | 23:48  1 user, load averages: 3.45 7.22 12.44 | 0 | f1e521672a11889623b345fac3595a113f43f30a0b2406f7e5db8af04b9373f6 |
| logs/028-authority-4.log | 23:48  1 user, load averages: 3.34 7.13 12.38 | 0 | 8c9c762d4fb4782e727a35d6137445eb3d3b5a2d39f168fa279b565bb39dd1ef |
| logs/029-authority-5.log | 23:48  1 user, load averages: 3.34 7.13 12.38 | 0 | ac16692e00c5f7cb371406242c918f6d198435313bd53b636377a5a9d35fbb59 |
| logs/030-authority-6.log | 23:48  1 user, load averages: 3.34 7.13 12.38 | 0 | b55e1d093bf2c48f8f304e1db72700fe27969c1028b5e85df4f285a2964fe7fc |
| logs/031-authority-7.log | 23:48  1 user, load averages: 3.34 7.13 12.38 | 0 | 4b9c5f7c8555dfb3aa7068e72b82dc8db031906a754ccb8b904aaadcb3f4f092 |
| logs/032-read-h2-authority.log | 23:48  1 user, load averages: 3.06 6.94 12.25 | 0 | 8684c4d58a2df07659f03f73000446e877b88ebda7724456c74d77dc53105c04 |
| logs/033-authority-8.log | 23:48  1 user, load averages: 2.81 6.83 12.18 | 0 | 11b7f00332ad8af79341e9c65de631bb1659238c0fe0346d1372028d1131fcab |
| logs/034-authority-9.log | 23:48  1 user, load averages: 2.81 6.83 12.18 | 0 | 7a78c6930dcf0fb73a434fb61278374405eae4287e6398fff732ee9e60c9c9af |
| logs/035-authority-10.log | 23:48  1 user, load averages: 2.81 6.83 12.18 | 0 | def17d9797e316b98a5432aecb29afb8937d5a5e4461a14589d5eea537cba7c3 |
| logs/036-authority-19.log | 23:48  1 user, load averages: 2.81 6.83 12.18 | 0 | 01c7333e1dbeae140d7d115482e47dcd29cc978fd72586650eac8811aab21026 |
| logs/037-authority-20.log | 23:48  1 user, load averages: 2.81 6.83 12.18 | 0 | 79d0de69af6e62b999cc776ee1899a7f54bd931cc4fdb3b9fd1772f836c3d813 |
| logs/038-authority-21.log | 23:48  1 user, load averages: 2.81 6.83 12.18 | 0 | 7081e40bf1e2ee02a2ed3fda9dd8e07fb75737d1ae45ba63b54f9339100f4216 |
| logs/039-authority-23.log | 23:48  1 user, load averages: 2.76 6.68 12.07 | 0 | 668f5d3ca3686ce9375bc6f782a14e1dae090288675514fa84205c0a232712fc |
| logs/040-authority-24.log | 23:48  1 user, load averages: 2.76 6.68 12.07 | 0 | 0c886759fe17a6f3f19087a93c0d02237a82a143146ec3ceba5703b6eace3cef |
| logs/041-authority-25.log | 23:48  1 user, load averages: 2.76 6.68 12.07 | 0 | 4fd5c3471f470f32d2fb0af069bc59736289f462734ede2b3480280c7a6186e6 |
| logs/042-authority-26.log | 23:48  1 user, load averages: 2.70 6.61 12.01 | 0 | de7f677c5378630efcb5c34d5b9d225259f19fd20e887156f98f9d7b38c09e1e |
| logs/043-authority-27.log | 23:48  1 user, load averages: 2.70 6.61 12.01 | 0 | 9adf307333d46e2637eddf08d2908444a907022c8c3694534c3bf20892dec33a |
| logs/044-authority-28.log | 23:48  1 user, load averages: 2.70 6.61 12.01 | 0 | 51281767cce93517a24cc5f92383edd153f53deed73b4dd211a416c4088e3fc0 |
| logs/045-authority-29.log | 23:48  1 user, load averages: 2.70 6.61 12.01 | 0 | 69f251e3c6c711881f164efd9ed8e0e3f487afb3daa89de9e653ede5a4b528ad |
| logs/046-authority-30.log | 23:49  1 user, load averages: 2.89 6.52 11.91 | 0 | 463eb7b5d8f00dbfe38100d661ab04a95ec1f4ae08480170515ddf26d4fdec35 |
| logs/047-authority-32.log | 23:49  1 user, load averages: 2.89 6.52 11.91 | 0 | 3eb4e3c8eec2b4e61fc0eb78761ffd494fdbe74650b8e514ba4914c70cef1697 |
| logs/048-authority-31.log | 23:49  1 user, load averages: 2.90 6.46 11.86 | 0 | 00a55535dec92e8dda18796d14c486ec5dce4d33ec47ca0fea796b7fa8be8102 |
| logs/049-authority-3a-design-1.log | 23:49  1 user, load averages: 2.83 6.39 11.80 | 0 | cf60ebf067460ffa18f7bf169c3bffbafc9ea48d03b360a1f6ad146053920dce |
| logs/050-authority-3a-design-2.log | 23:49  1 user, load averages: 2.68 6.30 11.74 | 0 | c42559a304b81e5a710f8fc907506f462f8c1e7664175dd156d2f0e74fc0a98c |
| logs/051-authority-3a-design-3.log | 23:49  1 user, load averages: 2.47 6.19 11.67 | 0 | ff973c765f14e9edbf0ee07c9040a7f7d6a9065509cb65b9ea24ff148e18dd27 |
| logs/052-authority-3a-design-4.log | 23:49  1 user, load averages: 2.35 6.11 11.61 | 0 | 4888a18233283920a59d9bf894360231ee30196ef8daab9efa08fddd0ceb095a |
| logs/053-authority-read-gaps.log | 23:49  1 user, load averages: 2.35 6.11 11.61 | 0 | c17c550d98e0489a828dedfe8c73bfa0bbda2388ad91b2a0f3e365043c6a2aca |
| logs/054-base-registry-environment-manifests.log | 23:49  1 user, load averages: 2.30 5.97 11.49 | 0 | 000f46b2234c2b83e6d658978df708c71e56d0ebfcb8b015ecd88c22955c510d |
| logs/055-base-attestation.log | 23:49  1 user, load averages: 2.30 5.97 11.49 | 0 | 14e86dd35c3d58e84d2e4ac23ac19a75ba1e7a0e1583de5039f4e6a147b25622 |
| logs/056-base-preflight.log | 23:49  1 user, load averages: 2.11 5.81 11.37 | 0 | 254987ba02f2ce0c050b30636ab585269e7b8b62e73a349851c836b029ccfe41 |
| logs/057-base-blobs-importers-and-addendum-lines.log | 23:49  1 user, load averages: 2.11 5.81 11.37 | 2 | 67c31d8c3831fe6c79da8efadea7da9ff45246f6760aa08679c72fefc299562d |
| logs/058-halt-test-authorization-evidence.log | 23:51  1 user, load averages: 2.26 4.82 10.42 | 0 | 933ef925b56a492113aebbf0e633bd6d99bb62e28cc3bb70eb962901cb1e64b9 |
| logs/059-halt-evidence-hashes.log | 23:51  1 user, load averages: 2.26 4.82 10.42 | 0 | 84ca2e303f80b7c290bb57deaad9816f11ab2a542c786bb6e41b14602714545e |
| logs/060-halt-final-state.log | 23:51  1 user, load averages: 2.40 4.65 10.20 | 0 | fb00e32191b4f1b7353e088975977530f3b83f0e80a90c9db29a5af95b8cb54a |
| logs/061-halt-state-hash.log | 23:52  1 user, load averages: 2.00 4.41 9.99 | 0 | 2d0145f46e191bd39e8be70f72acfb7bcc129aab9382dc35a733a74f4ed8bebe |
| logs/062-write-halt-report.log | 23:53  1 user, load averages: 1.29 3.56 9.12 | 0 | 2acb4888b616fe4f10d3699442e9f25ccefe7667ef1165262bfd134b268e483f |
| logs/063-resume-prompt-manifest.log |  0:25  1 user, load averages: 2.02 1.83 2.92 | 0 | 765571e5897331ba21c278830b81992d02623461e53a9561d92555829f4965e3 |
| logs/064-resume-prompt-files.log |  0:25  1 user, load averages: 2.02 1.83 2.92 | 0 | 9459178d749d8183afa72ddf5bf9a01ad3f281ac56c5b3f80b63891c2449fd72 |
| logs/065-resume-addendum-2.log |  0:26  1 user, load averages: 2.42 1.91 2.94 | 0 | 32add55c83cb5dcfd2cad7ea5341f19f4692e6a125f40dc23892f9e77500e88b |
| logs/066-resume-governed-version.log |  0:26  1 user, load averages: 2.42 1.91 2.94 | 0 | 56b4e0f0f4777f1ad35654a415741f68368e9a97607e9fa85b88906c689cefcb |
| logs/067-resume-repository-and-report.log |  0:26  1 user, load averages: 2.42 1.91 2.94 | 0 | 4406b0cd0074ae4736f322900ce3481f6cd1f33d8f41fe2c6148f1d50c32d718 |
| logs/068-resume-runtime.log |  0:26  up 57 mins, 1 user, load averages: 5.01 2.54 3.13 | 0 | 8b00ad088075f3ccc036d87b29870386eca12747843e6f2b7aeef757b6392cd8 |
| logs/069-complete-source-preconditions.log |  0:26  1 user, load averages: 4.88 2.63 3.15 | 0 | 7be113725a85ddd961a62b6644e880d93f0a9afe44a0769bc17efce5492c6cf1 |
| logs/070-contract-file-inventory.log |  0:26  1 user, load averages: 4.88 2.63 3.15 | 1 | 55d807efa47004c5911fc7562190b6f8fa5ca7035b86f2f8656aaffb4541f36a |
| logs/071-claude-adapter-contracts.log |  0:27  1 user, load averages: 4.55 2.66 3.15 | 0 | 4fc79678e318456f1926ac9feb7156105130da77b53f602df11472845318d58d |
| logs/072-surface-event-input-exit-contracts.log |  0:27  1 user, load averages: 4.55 2.66 3.15 | 0 | caaabef95f34f6b44813b6cdd928f6c7b9da782d90f3dbb8d44f56dcbce33add |
| logs/073-surface-documentation.log |  0:27  1 user, load averages: 4.53 2.72 3.17 | 0 | c0e5e451cef1d7c9bbe3eef3268c4974d6f463173fba90fbb89f30ee5e2d0318 |
| logs/074-surface-flow-and-redaction.log |  0:27  1 user, load averages: 4.53 2.72 3.17 | 0 | 6b5893d46edd5f96e1d0a272bb008fb39d65f97e4f22c7053d338cbb6b386fd8 |
| logs/075-surface-agent-flow.log |  0:27  1 user, load averages: 3.92 2.65 3.14 | 0 | 1594909f5e02aae4a3b4bbe36d9b56f985a748908a41ac65e2149fc4afdc07ea |
| logs/076-scratch-root.log |  0:27  1 user, load averages: 3.54 2.63 3.12 | 0 | 2a131f1c557272e5e3418034cc34dca5a5b184c8ce72d14020c47be6be2b38cf |
| logs/077-remaining-reference-and-baseline-lock.log |  0:27  1 user, load averages: 3.54 2.63 3.12 | 0 | 7527d73129c66fd884602e4e6a2ffd41f98771507b435638ba4eab1c44d85310 |
| logs/078-baseline-install.log |  0:28  up 58 mins, 1 user, load averages: 3.12 2.59 3.09 | 0 | b0c1a9c58db30d352c4a0690fb2cf1a11da4bb8e07be4da4b62ccd6ddca4ce97 |
| logs/079-baseline-install-state.log |  0:28  1 user, load averages: 2.87 2.55 3.08 | 0 | 0a772a67f61cc81cc68e5ee1bb9ac1b374b269051df09675937f5f3df3a61e4b |
| logs/080-baseline-typecheck-load.log |  0:28  1 user, load averages: 2.87 2.55 3.08 | 0 | 7c0cd322645b824d330742eace963717f3518487440fbde8b07b4a0c27c28248 |
| logs/081-baseline-restore-install-mode.log |  0:28  1 user, load averages: 2.72 2.52 3.06 | 0 | 0f877433fc75fa99bea1ffb17edd8f1296e468a49d1d4634d729c1cb8ad52e2e |
| logs/082-record-and-attribution-contracts.log |  0:28  1 user, load averages: 2.72 2.52 3.06 | 0 | fc791a6a7f808a10792e61210ba6b6c56626b60d9ad289ecf8c3341fa9255aa5 |
| logs/083-dispatch-and-record-integration-contracts.log |  0:29  1 user, load averages: 2.79 2.69 3.08 | 0 | 9023c9591c24b09279770cc7f31d4c7d442640b517862c38686b27e6bd880ae2 |
| logs/084-baseline-typecheck.log |  0:34  up  1:05, 1 user, load averages: 2.14 2.11 2.69 | 0 | c4e3846cdb6a01135bc05117c1169a59a0f3114f6697df311be9e84b56061cc4 |
| logs/085-baseline-suite-runtime.log |  0:36  up  1:07, 1 user, load averages: 2.81 2.39 2.72 | 0 | 4243661b85e8566276fa784efe5807438c2e4a00083967bb0721fdf24d318e30 |
| logs/086-baseline-suite-load.log |  0:36  1 user, load averages: 2.75 2.39 2.71 | 0 | 0e7dc26a25b0a1fede45ead15254dffce729180b10a80a6378f49a233c7500ed |
| logs/087-record-observation-fields.log |  0:37  1 user, load averages: 2.82 2.45 2.72 | 0 | b8cb895726ed8ba7b59a54ebb2fd264652a49e4aa856aae72a8dc2fe960b3a0a |
| logs/088-baseline-suite.log |  0:38  up  1:09, 1 user, load averages: 1.66 2.15 2.57 | 0 | e58ac63a1953d83dc919a58d48f1e85d0efe916164f3f4c2d143a5b8124e5166 |
| logs/089-baseline-test-list.log |  0:42  1 user, load averages: 2.85 2.39 2.56 | 0 | 21382c8716769763b4f076f899e47ef3a09704ebb05f1f9949ef027918f4ded5 |
| logs/090-baseline-final-state.log |  0:42  1 user, load averages: 2.85 2.39 2.56 | 0 | f2cafe1aa372c7e858f87d0a1e4cd8102124a3086f53312d2a6b6807b11f8983 |
| logs/091-draft-task-detail.log |  0:43  1 user, load averages: 1.70 2.15 2.46 | 0 | 6d77732de5870111e9ff3b4e844bdc71d3315f8af6f2cfca8e284b56123d5813 |
| logs/092-opening-log-manifest.log |  0:45  1 user, load averages: 1.38 1.93 2.34 | 0 | bec4c935bb091617b6ffcf0e9762afd366190a64152d079adbdb5988d9bbc2d8 |
| logs/093-write-build-log-opening.log |  0:45  1 user, load averages: 1.38 1.93 2.34 | 0 | 17aeb66827395ba4326146eac8a4bd8ef0671586f8688fa0190be239b258a6e9 |
| logs/094-fix-opening-quote-whitespace.log |  0:45  1 user, load averages: 1.73 1.94 2.32 | 0 | dcc3db05d01b0ea4e490caa9a002c57411c62cc9eefbdca66258a169074d0c5a |
| logs/095-check-commit-1-message.log |  0:45  1 user, load averages: 1.73 1.94 2.32 | 0 | a4377e9bcc9abaf4008adfd86af1a12ab7f32ec0b65fd1e50266050146ab6a98 |
| logs/096-stage-commit-1.log |  0:45  1 user, load averages: 1.73 1.94 2.32 | 0 | 977bc3862afe7a50cbd2496c71f40927efc798eea3bdb7def0abf6511519eda2 |
| logs/097-review-commit-1-staged-diff.log |  0:46  1 user, load averages: 1.61 1.91 2.30 | 0 | bd55ceecb0a847bb2deb12dd64e2d1f2480f8b185da5771fe29a1c62afba806f |
| logs/098-commit-1.log |  0:46  1 user, load averages: 1.61 1.91 2.30 | 0 | 831b82b40c49f5f3ae10ce857e7aa2ac8aef42ef726031143ca095eabf5840f2 |
| logs/099-write-r3-tests.log |  0:48  1 user, load averages: 1.66 1.81 2.20 | 0 | 34021716f35a3e8a14267222ee5bf60b30746e28fd9f0bd3bd313a9e431f6987 |
| logs/100-r3-runtime.log |  0:48  up  1:19, 1 user, load averages: 1.74 1.82 2.20 | 0 | 34f5460b1560020f5e97f951ac6fed21f8759125dd91b9696ba0c2047ca91c8a |
| logs/101-r3-red-load.log |  0:48  1 user, load averages: 1.74 1.82 2.20 | 0 | 759ae3477e9314c293cffd87bccb38f98d6117ee0fc3d46e6b20d6defb14673f |
| logs/102-r3-red.log |  0:48  up  1:19, 1 user, load averages: 1.68 1.81 2.19 | 1 | 6ff64f8d90ec37af3bb7bfb2ee9a2ae67443c8f96c8a6c4fc7c99c6e49044484 |
| logs/103-inspect-own-r3-envelope-failure.log |  0:49  1 user, load averages: 1.53 1.77 2.17 | 0 | 189db6ed886e6f225df6ea848009c2c639f718e843c3a13365624ad92ad14e05 |
| logs/104-inspect-own-r3-parser-constraints.log |  0:49  1 user, load averages: 1.45 1.74 2.15 | 0 | da042854066f880d43c68e195357f6673d5a13b91dafa64a6fdaf7be12324fe1 |
| logs/105-r3-production-change.log |  0:49  1 user, load averages: 1.63 1.76 2.15 | 0 | 39293a4a573337e5b0fba0189d6218e4687284e7cefca3474cd2e3c7c90b9e79 |
| logs/106-r3-green-load.log |  0:49  1 user, load averages: 1.63 1.76 2.15 | 0 | 72f95dd0565e3838e9f823db27b62aea22a55c5ee71167f339cfe00673b6737a |
| logs/107-r3-green.log |  6:25  up  6:55, 1 user, load averages: 1.63 1.48 1.54 | 0 | 77c382310200966d6b3c068166db60169fd1bc7a06b590fafde5ebcb7f929c33 |
| logs/108-break-5-save.log |  6:25  1 user, load averages: 1.51 1.46 1.53 | 0 | d56758570270c1fabc2279c4e5a36181774551c6f5a9e82c68372347581272b7 |
| logs/109-break-5-diff.log |  6:25  1 user, load averages: 1.51 1.46 1.53 | 0 | c5db03871ccc06c5bf9b47c4387387fe4400fcda68ef583b6a1a2881d6633451 |
| logs/110-break-5-runtime.log |  6:25  up  6:56, 1 user, load averages: 1.51 1.46 1.53 | 0 | 11ba93708c8b5111fa34d20387a364e4fb7864ca5825d51a6f6a2b37ea3ecfde |
| logs/111-break-5-load.log |  6:25  1 user, load averages: 1.51 1.46 1.53 | 0 | 669848e89bdbc93b38876a3fe93c790b65c1735930efba013ba61e6fbc622af8 |
| logs/112-break-5-test.log |  6:27  up  6:58, 1 user, load averages: 1.46 1.42 1.50 | 1 | 49d07f655835a4d4e756745473273acee63afe27b1b1f0593c214ec502283b3d |
| logs/113-break-5-restore.log |  6:27  1 user, load averages: 1.51 1.43 1.50 | 0 | 20f2841df6a572b5e22a26c07700bf39031c001aa6bc854f989ae1248d9c55f4 |
| logs/114-r3-typecheck-load.log |  6:27  1 user, load averages: 1.51 1.43 1.50 | 0 | a1b6c7d0b42d1bcde3235b90d9e3f294d2b24b458e5b4609fa464d9ba2d52d45 |
| logs/115-r3-typecheck.log |  6:27  up  6:58, 1 user, load averages: 1.51 1.43 1.50 | 0 | 57463e4b4aae46913f6ceb24b932e485c5937eca7bcb9e9459cbb5a006086a3a |
| logs/116-check-commit-2-message.log |  6:28  1 user, load averages: 1.31 1.39 1.48 | 0 | 663e332b82dc8932aa87d49142f905b8b7760daac2b947bffb8da0e8492f1a83 |
| logs/117-stage-and-review-commit-2.log |  6:28  1 user, load averages: 1.31 1.39 1.48 | 0 | 354e1cc82968f38e6370468079feab2811cdb2f3af4002a68605412a74d364a9 |
| logs/118-commit-2.log |  6:28  1 user, load averages: 1.31 1.39 1.48 | 0 | e773812fb118ab8f020f4428c190c4d77479a013a5ef247e7f5a45300956e4a4 |
| logs/119-break-5-committed-restore-proof.log |  6:28  1 user, load averages: 1.31 1.39 1.48 | 0 | 5f0e4d73054062342b32ad3b5b63eeaf191fcc70c4ff53f0850625951e6ef1de |
| logs/120-write-r4-tests.log |  6:30  1 user, load averages: 1.20 1.32 1.44 | 0 | c36151762b9f6bf58c29ee461b1544daef1f637bf046b7d2cdad5f6d041b20f3 |
| logs/121-write-r4-parser.log |  6:31  1 user, load averages: 1.27 1.33 1.43 | 0 | f69391347df330f24430ffd25b7d698807baf8c943010fcf22ddc54e33a24d8b |
| logs/122-r4-runtime.log |  7:56  up  8:27, 1 user, load averages: 5.66 4.21 2.79 | 0 | 00d430161216f80c967efcaa0281142b8d73467a47539ddf1503ce93d4bc5539 |
| logs/123-r4-workspace-install.log |  7:56  up  8:27, 1 user, load averages: 5.66 4.21 2.79 | 0 | 634920e71e742b1c20622a08993a28b468514315cfca0498fa4f7117344a3c35 |
| logs/124-r4-lockfile-diff.log |  7:57  1 user, load averages: 5.25 4.18 2.81 | 0 | 89d0ab15b75c0c9082293b3635204f1b0a706d7f4093eee89b9a9bc4995f1d59 |
| logs/125-r4-tests-load.log |  7:57  1 user, load averages: 5.25 4.18 2.81 | 0 | f39409a044a58524aeeb61b395ed2c2ed917a3d3e6a7aee0be14c423bacf4176 |
| logs/126-r4-install-mode-restore.log |  7:57  1 user, load averages: 3.78 3.96 2.80 | 0 | 2fa727b782856b935ecac22ef56b0c832875e4ca49ef1dd44cdaa817ca2bdc3b |
| logs/127-r4-tests.log |  8:19  up  8:50, 1 user, load averages: 2.08 2.03 2.14 | 0 | 4ac52b7d5f4c3e83a1d9647ced3aebc020ce266d9209e9f42b1afd0572f3be44 |
| logs/128-break-1-save.log |  8:20  1 user, load averages: 1.71 1.95 2.10 | 0 | 0dbc95c6c6d379079a9ceda382679f81067a7c641b18dc312e7ff2f0b5d0f7a8 |
| logs/129-break-1-diff.log |  8:20  1 user, load averages: 1.71 1.95 2.10 | 1 | d200be4b9edc6718821f29f2615e6568251a9a1dfdc5fbde2e863ccb32ddf21a |
| logs/130-break-1-runtime.log |  8:23  up  8:54, 1 user, load averages: 2.56 3.00 2.59 | 0 | de5671ba5ba537912bcd4d2c0bc0fa195af3bf09f462c629b5f3d61c9bac2899 |
| logs/131-break-1-load.log |  8:23  1 user, load averages: 2.56 3.00 2.59 | 0 | cdf9db8bf1366ad4dc67f43b5ba70e221d1142ec4b40d25ad9993fd18da68e08 |
| logs/132-break-1-test.log |  8:24  up  8:55, 1 user, load averages: 1.38 2.59 2.46 | 1 | 8baaf66accae12f4199c30de40c90b2d323d15613ea76dae66e78a8be3dd8e2b |
| logs/133-break-1-restore.log |  8:24  1 user, load averages: 1.33 2.54 2.44 | 0 | 7ed1f12af4f9b514bb7124ec3561daded263ce69794f45e1884b0f8c91c6bbe6 |
| logs/134-r4-typecheck-load.log |  8:24  1 user, load averages: 1.33 2.54 2.44 | 0 | e65357ee64c53e2851bc502423d8fd2f6456173918fababde624b098af1e2c0c |
| logs/135-r4-typecheck.log |  8:25  up  8:55, 1 user, load averages: 1.33 2.54 2.44 | 0 | 4c46b3d6a926410c4b1ab5d547b2c17b6de8a75d4582347b48f051bb08b44873 |
| logs/136-r4-restored-tests-load.log |  8:25  1 user, load averages: 1.54 2.44 2.41 | 0 | 24a1d050d8335d45046b3635d248ec24424ff44c825b2fca1f2d0654b9216555 |
| logs/137-r4-restored-tests.log |  8:26  up  8:56, 1 user, load averages: 1.18 2.29 2.36 | 0 | faea4502c9a515fa9e0a8b3d752b28e89eb91ff232f3aad593965d8086e927b8 |
| logs/138-check-commit-3-message.log |  8:26  1 user, load averages: 1.36 2.28 2.35 | 0 | eaac6d127a07b5e49ca0199001bec7c6ed1b79f2f7965993ea353303c6ec8b9f |
| logs/139-stage-and-review-commit-3.log |  8:26  1 user, load averages: 1.36 2.28 2.35 | 0 | bf00263c7f26411db674b88c3a4611c9ae58dd8bf806bc363605d852f327d6f0 |
| logs/140-commit-3.log |  8:26  1 user, load averages: 1.36 2.28 2.35 | 0 | 4f8bf32c9ecb1809ab5c80df302ed1fc9c171fdd71d7cc05a7a77c315a82bc01 |
| logs/141-break-1-committed-restore-proof.log |  8:26  1 user, load averages: 1.36 2.28 2.35 | 0 | 45db76bf3f8769f32f3bc1e4cc7c43f6c76b1d2b2e53b0883c11b2e77b773440 |
| logs/142-r5-pair-and-freshness-test-contracts.log |  8:27  1 user, load averages: 1.60 2.11 2.27 | 0 | b978a670a4da13d9aeab1551d32a659c2289cfb022e2181c49bb329433c6f502 |
| logs/143-r5-pair-evaluator-contract.log |  8:28  1 user, load averages: 1.59 2.09 2.26 | 0 | 0a9a3c4287c140a90b8b8f8da8b30c9da90ce8a0a2573fc145fccd11d223a24e |
| logs/144-write-r5-probe-tests.log |  8:30  1 user, load averages: 2.00 2.08 2.24 | 0 | 9e58ab713cdb7532ff2d9319b0a14dccb86136205dedd1b92c1c3c58e78b38a5 |
| logs/145-write-r2-registration-test.log |  8:31  1 user, load averages: 1.82 2.07 2.22 | 0 | 78f6d5ef0ab90aab0061cf9585083dfc76fbe6f81c6a22d9007d2ac9bea72a1f |
| logs/146-r5-authorized-existing-test-updates.log |  8:31  1 user, load averages: 1.85 2.05 2.21 | 0 | fa9ceebcdd33d9f73c3d0aeb4c64162b4c206cc49bd38d39a1559d9292625b11 |
| logs/147-r5-production-diff.log |  8:32  1 user, load averages: 1.78 2.00 2.18 | 0 | ad21f11924d92e70e83d01dcc6e95a5407721fe740c69a2d6bbfebfda98bf890 |
| logs/148-r5-runtime.log |  8:40  up  9:11, 1 user, load averages: 2.06 1.92 2.02 | 0 | eb155ac1922ba5ec9b220072f4a1cfd2e963f8814e67614684c024c01c6b4d1a |
| logs/149-r5-dependency-install.log |  8:40  up  9:11, 1 user, load averages: 2.06 1.92 2.02 | 0 | 057ea2288ebfbe8fc7ae09e876ef3fb02f6b6cb5271249ba82214c94a2e9d1d8 |
| logs/150-r5-lockfile-diff.log |  8:40  1 user, load averages: 1.75 1.85 2.00 | 0 | 11d384e89c51ca6e7db4a12cf4a4a1e95d59de297ce6aa998ee72737beb6be00 |
| logs/151-r5-install-mode-restore.log |  8:40  1 user, load averages: 1.75 1.85 2.00 | 0 | 02586ac9c47415d10c6b646c3d20d3ef3cd91c0a16c893df6cbc64eba9ab4129 |
| logs/152-r5-tests-load.log |  8:40  1 user, load averages: 1.75 1.85 2.00 | 0 | a1670a3048c7463a03fcedfd2dc0989a9da922ad8db93b5a00aa3e12f3a2cdc9 |
| logs/153-r5-tests.log |  8:40  up  9:11, 1 user, load averages: 1.46 1.78 1.97 | 1 | 13648ab9f6532ca6df5bffc08eaf7d263d61b4c8f20e2152aa0948eaed61742a |
| logs/154-r5-test-result.log |  8:45  1 user, load averages: 1.17 1.62 1.85 | 0 | 852f29016a5c3a820e4971d1f818e1d696df11ec4447935bd81e53e6f99e68d8 |
| logs/155-r5-clock-review.log |  8:45  1 user, load averages: 1.29 1.63 1.85 | 0 | f4f330c8d95b39d68402ad05f8989900125dc178cafb4fd8fd6295ffe770e6a8 |
| logs/156-r5-fixed-clock-wait.log |  8:45  1 user, load averages: 1.49 1.66 1.86 | 0 | 931c4a768a6f030990e4835ac960ed6ea900cec98f39012a9a7e20bee07821d0 |
| logs/157-r5-targeted.log |  8:48  up  9:19, 1 user, load averages: 1.82 1.67 1.82 | 0 | cd25727242682fea70d1aa7c084f502ff08ad69847bd63f0a42438dce0bf0057 |
| logs/158-r5-break-baselines.log |  8:49  1 user, load averages: 2.30 1.89 1.89 | 0 | 1e0475cf56faf6ba2687fa0d12593221b22250208dae16e50d7b4aebeb662d57 |
| logs/159-break-2-diff.log |  8:50  1 user, load averages: 2.18 1.87 1.88 | 1 | d54e2b102ee1c9c8f3e941334b4394e31849f46ad4c8ce464813437074d4e8c3 |
| logs/160-break-2-runtime.log |  8:59  up  9:30, 1 user, load averages: 1.42 1.43 1.61 | 0 | 47d8bf82ad712c8bea4c8b4d2b4f9d4dd2bf02ab1f6a07fd77a6fed4bbdafc59 |
| logs/161-break-2-wait.log |  9:00  1 user, load averages: 2.70 1.74 1.71 | 0 | 7bd33b9947c9ac9fa295a873f0ea6ea725b332cae496c9ad7a9babd6ed080d02 |
| logs/162-record-schema-review.log |  9:00  1 user, load averages: 2.77 1.88 1.77 | 0 | 57609f6be4dac3397fb8f2a871480d491e9d4f639318eaa030c9e6ece10702dd |
| logs/163-record-rulings-review.log |  9:01  1 user, load averages: 2.23 1.83 1.75 | 0 | 761e521722d3043aa6589fbc10d109457c8bb4d11996a3738341af2a25b481bb |
| logs/164-record-pins-review.log |  9:01  1 user, load averages: 2.18 1.83 1.75 | 0 | 9300fac6bd63dd4d4e5c76308cff3357e417b95da187ac59e0ded706d85e2798 |
| logs/165-break-2-test.log | 10:32  up 11:03, 1 user, load averages: 4.67 2.16 1.67 | 1 | 35b1586f66e569a8e5ff780b62a8c29225defe39af9db4b99c7767a365ee150f |
| logs/166-break-2-restore.log | 10:32  1 user, load averages: 4.07 2.15 1.67 | 0 | 16dc9d631ef26abc45ad8b67fa67fbefd2fdc7b40b43a732eae9f682914fc153 |
| logs/167-break-3-diff.log | 10:32  1 user, load averages: 4.07 2.15 1.67 | 1 | 1936120b4b8b47027908052ae4542d846a8d7a77e4ab92785ef53bc540a55d2a |
| logs/168-break-3-runtime.log | 10:32  up 11:03, 1 user, load averages: 3.90 2.15 1.67 | 0 | ec87da7ff01098bc2adfab819ef7a0942ff3016cfbd8c18683b0a6d5ec4ae74c |
| logs/169-break-3-wait.log | 10:32  1 user, load averages: 3.90 2.15 1.67 | 0 | 9df69887fc3f25d2b74b8f0d59ca1cd6e3cd2b38d4dddc8b953d0f8c5f990b1c |
| logs/170-r5-preflight-review.log | 10:32  1 user, load averages: 3.59 2.11 1.66 | 0 | 848ec20c308d094b61b7af8f88e185a4a1ebf3563f70c2d21a12dd952a886de8 |
| logs/171-record-evidence-review.log | 10:35  1 user, load averages: 2.22 2.15 1.74 | 0 | e5d1cdb0bbab6a1745bdf3ff4941863b64563937950a7aa74eddf5e825d830c5 |
| logs/172-identity-clause-review.log | 10:35  1 user, load averages: 2.01 2.11 1.74 | 0 | 88cc71f2e208d0cd64ea6356f15f3b41a1c155501269651ae03a348d9832235c |
| logs/173-break-3-test.log | 10:43  up 11:14, 1 user, load averages: 1.55 1.56 1.58 | 1 | 4832382d5366e6ffec88c3aec93d8898530391c2e3843f9e5b3ac22d3b5038c8 |
| logs/174-break-3-restore.log | 10:43  1 user, load averages: 1.62 1.57 1.59 | 0 | df695ee8009f2280cd42337b60da0975d5b3c5257b097c57b84ebbb8477c0df2 |
| logs/175-break-4-diff.log | 10:43  1 user, load averages: 1.49 1.55 1.58 | 1 | b2f5ab5911d52dce0e2a9da58291e0fde96dad106cae747bf2cbad6d270a37d8 |
| logs/176-break-4-runtime.log | 10:43  up 11:14, 1 user, load averages: 1.61 1.57 1.58 | 0 | 19a6b22cd2ca7458984b0f4e2e3960e3150e9b2119bca52907319eec9ce6a592 |
| logs/177-break-4-wait.log | 10:44  1 user, load averages: 1.61 1.57 1.58 | 0 | 4996ceeb4b424b8db08a12cc0d78b08b03dbfe6dcf95c679b0d959858e83c942 |
| logs/178-break-4-test.log | 10:44  up 11:14, 1 user, load averages: 1.65 1.58 1.59 | 1 | 1a0fc4216cc51d8f8be9c66b5348035b32e000cd494b598cc21223cf377cf46e |
| logs/179-break-4-restore.log | 10:44  1 user, load averages: 2.01 1.66 1.62 | 0 | d09e1336b0863116ad2afe90aec047cbbf4440b0208124f9cc6b6df261c5ca3b |
| logs/180-r5-typecheck-wait.log | 10:44  1 user, load averages: 2.01 1.66 1.62 | 0 | 43efec1200ab2bb00eba561b6cbb6c816e0bc23d9cea204b1b14521a29219d75 |
| logs/181-r5-commit-review.log | 10:45  1 user, load averages: 1.96 1.69 1.63 | 0 | 86b6a111932721c2c377110d31161f68ab88000db979e5409003c5b84b92b6c6 |
| logs/182-commit-4-message-check.log | 10:45  1 user, load averages: 1.96 1.76 1.66 | 0 | 23900afb4a156689e8e56f9bef0b583f14940a3d74d0077a718537f3b460e705 |
| logs/183-r5-typecheck.log | 10:48  up 11:18, 1 user, load averages: 1.55 1.69 1.64 | 0 | 25ef2f8261618f97df16f23116c9f6904bcb63e189379c9efc951ed7118425e9 |
| logs/184-commit-4-stage.log | 10:48  1 user, load averages: 1.99 1.78 1.68 | 0 | d897a485eb5cc6b1a199d90efc008b8a375e4604eb7bd09025ffbb3b0f7e6ded |
| logs/185-commit-4-staged-review.log | 10:48  1 user, load averages: 1.99 1.78 1.68 | 0 | 2a0a55aa3f63269111cc81e144d035aa3c4d90e9cdfdc92e9feba44d6bf69c1a |
| logs/186-commit-4.log | 10:48  1 user, load averages: 1.99 1.79 1.68 | 0 | 22cf0b992654a13c6427864e8e983293003a028becf5b8520bf62c24f9cc7893 |
| logs/187-commit-4-restore-proof.log | 10:48  1 user, load averages: 1.99 1.79 1.68 | 0 | d163c0a07106286b2ee7396ae0908330f1244bc51287f32359918ef344dfc2ae |
| logs/188-full-runtime-before-install.log | 11:49  up 12:19, 1 user, load averages: 1.68 1.79 1.89 | 0 | a75e088406776ed2f4a09f96621c7d8feb3f82037df0356ea76fb6b370747010 |
| logs/189-full-frozen-install.log | 11:54  up 12:25, 1 user, load averages: 1.92 1.66 1.78 | 0 | 89095224bd3bfe088bbeed0535547086e5a8d2ecc0514038fcb03bb54591085a |
| logs/190-full-install-state.log | 11:54  1 user, load averages: 1.92 1.67 1.78 | 0 | 27e4231d605f900107262ba756bfd1ffd0c1fa6efb2a3559fbec3cbb4eeaecb1 |
| logs/191-full-install-mode-restore.log | 11:54  1 user, load averages: 1.93 1.67 1.78 | 0 | 49a87de42739d373a657c6a94b70422a6066ad5a4b632954df37f7443eca50f1 |
| logs/192-full-typecheck-wait.log | 11:54  1 user, load averages: 1.93 1.67 1.78 | 0 | 2f95073f73a831ed8f623e2bedf0c6bffc9d40f3a8fbda664441bf38676f58ac |
| logs/193-full-typecheck.log | 12:27  up 12:58, 1 user, load averages: 2.81 1.68 1.61 | 0 | 803f95cd5b1ec54627c40f400bb5ca54a17e8de12fa4dd41f3d0b6e251faceaf |
| logs/194-full-runtime-before-suite.log | 12:28  up 12:58, 1 user, load averages: 3.17 1.85 1.67 | 0 | 27d8d3d27509b1660849639fe9def6e1def885e0b850dea4043c78a56793c7a9 |
| logs/195-full-suite-wait.log | 12:28  1 user, load averages: 3.17 1.85 1.67 | 0 | d2d2eeb802adec4ef44d2c28e4af3e6d6461ac10a7df6f1d3237fe8062ede4c6 |
| logs/196-full-comparison-preparation.log | 12:28  1 user, load averages: 3.00 1.85 1.67 | 0 | b79f5d0a0297e294800737cc92617c6aa95bf33aec3fbec902a2b97092eb0b79 |
| logs/197-base-list-path.log | 12:28  1 user, load averages: 2.85 1.86 1.68 | 0 | ce6c5657a4b8f0ed3ed44482d2ad98d1a4821dc1d8955faffdb930daf05e8cea |
| logs/198-base-list-command.log | 12:28  1 user, load averages: 2.56 1.83 1.67 | 0 | 9bfb82a97407dff4c6dcbbe85c9544dc46fedce1e243941314bb8e9e4a476856 |
| logs/199-full-suite.log | 12:29  up 13 hrs, 1 user, load averages: 1.71 1.70 1.63 | 0 | ecb4ef94bf74b7d4f59865c72d8668cd2c813073d0f0207c920bbfb2fe19aeb1 |
| logs/200-head-test-list.log | 12:32  1 user, load averages: 1.17 1.53 1.57 | 0 | fad5e4ec9862cecca1d88acb7efdc7e70a1ea4d0e89896aa0d89ea5c4d5eb036 |
| logs/201-full-test-comparison.log | 12:32  1 user, load averages: 1.36 1.53 1.57 | 0 | c33675929fffb7f04935bcbf81f0b6f6977198c4538598b8a3f38dd8b7cb50be |
| logs/202-full-diff-check.log | 12:33  1 user, load averages: 1.65 1.59 1.59 | 0 | e7ce0b8d659a475c1387b6fc30abff85ad9bc94ee6a051ed243671ba45a938f3 |
| logs/203-full-changed-paths.log | 12:33  1 user, load averages: 1.65 1.59 1.59 | 0 | 60422b69101a787275272032550c108a9fcd64a5aed0e22a89e50cbbcac600e2 |
| logs/204-full-registry-diff.log | 12:33  1 user, load averages: 1.65 1.59 1.59 | 0 | 38a59444c7de7125cbd25e1750fbbf36eb0856d272472f4daf35b67d87d90c6b |
| logs/205-full-status.log | 12:33  1 user, load averages: 1.65 1.59 1.59 | 0 | 04649fd7f4fcf46a35bb160b3447546dddec9950b2e796128d190226f50a7016 |
| logs/206-full-untracked.log | 12:33  1 user, load averages: 1.65 1.59 1.59 | 0 | 1685cc849c0c24a4883a688a708e1e5855a4996ea6c3790c5ed1cf7f8b3e9cd0 |
| logs/207-record-runtime-and-parser.log | 12:33  1 user, load averages: 1.80 1.62 1.60 | 0 | e26fff1684ee23030b68c5935d651ea27f04c669f0099e50067e752e126bc891 |
| logs/208-record-event-shape-review.log | 12:33  1 user, load averages: 1.60 1.59 1.59 | 0 | ce5ade2ea7a5623b65ad39b8e96fee9bcd0f9a6dec19b0fa58a7656c485f818f |
| logs/209-record-script-static-review.log | 12:36  1 user, load averages: 3.47 2.42 1.91 | 0 | 9b1ef52e52b2f4a110e782742c0b539586cbf8b5fc5de4b7f38886d31afdd611 |
| logs/210-record-environment-contract.log | 12:36  1 user, load averages: 3.27 2.39 1.91 | 0 | 2082789234c7a12813fcd4386d2e574895051e298af551444d991db04997c86c |
| logs/211-record-script-source.log | 12:38  1 user, load averages: 3.07 2.54 2.01 | 0 | 479e7bef6e502ca089711ca6ae8ebbb37940f5ba5bc2df5c08675aa449dca4ea |
| logs/212-record-linux-host-rule.log | 12:39  1 user, load averages: 2.27 2.41 1.99 | 0 | ee9d7267fe6b3cc6fadc1c3d5edae25967c9d0c54ce19afbcbaa852e9a6b3ce4 |
| logs/213-record-linux-fields.log | 12:39  1 user, load averages: 2.27 2.41 1.99 | 0 | ae02dbb0e9dd8f231f4b9ace58fed2c876b7696290cab2c7cd2581d0a0650368 |
| logs/214-record-linux-host-definition.log | 12:39  1 user, load averages: 2.09 2.37 1.98 | 0 | bc4a93aa9378f261ea851d77979da493933b80bcd64b14c2f5df15f7e2e39397 |
| logs/215-r6-runtime.log | 12:41  up 13:12, 1 user, load averages: 2.36 2.30 1.99 | 0 | 6a21b426c41a630ff63c2b06381eec10793a3d97940298c486a8b2a7028f9d59 |
| logs/216-r6-make-synthetic-captures.log | 12:44  up 13:15, 1 user, load averages: 1.35 1.81 1.84 | 0 | 234d9cc179063db68e17e1f15bef844ebe465b3a492de9968c6e86430b28074c |
| logs/217-r6-madv-pass-wait.log | 12:45  1 user, load averages: 1.16 1.74 1.81 | 0 | 22bfd04e0814aea13aacca736c544750ad74535e40a8ee4699d6a24158202907 |
| logs/218-r6-madv-pass.log | 12:47  up 13:18, 1 user, load averages: 1.41 1.68 1.78 | 0 | 1b488f7eb826fba7747352f81240a405824b47145203e476af7c4a18ba79556b |
| logs/219-r6-madv-echo-wait.log | 12:47  1 user, load averages: 1.24 1.63 1.76 | 0 | 322aca90b0f354b792038a691f55215324ebdd85612101a67c4fb17b675cc7cc |
| logs/220-r6-madv-echo.log | 12:48  up 13:18, 1 user, load averages: 1.26 1.60 1.75 | 0 | 6555fccd64369fd3dd34ba7f384dc043313f16dae93453ed4723c70617ab6bcd |
| logs/221-r6-claude-pass-wait.log | 12:48  1 user, load averages: 1.24 1.59 1.74 | 0 | be8406297313409b8da7a8ea45ca7e2666542533c56f501ec2ca137de0a96e8a |
| logs/222-r6-claude-pass.log | 12:48  up 13:19, 1 user, load averages: 1.24 1.59 1.74 | 0 | 86979ad16e927995a6f92fff3b4378eb504f0f1e8eb35307b9d177bc833189c1 |
| logs/223-r6-claude-wrong-model-wait.log | 12:48  1 user, load averages: 1.46 1.63 1.75 | 0 | 629d9dbea76959559c3d1bbfacdf2e081d2c6be49f072c8fe33182e66ff785f9 |
| logs/224-r6-claude-wrong-model.log | 14:10  up 14:41, 1 user, load averages: 1.77 1.60 1.57 | 0 | 13e9df088bc1083d2f653e27b3f08d989dcdbd500e6376b210a46c7697726434 |
| logs/225-r6-key-set-wait.log | 14:10  1 user, load averages: 2.43 1.76 1.63 | 0 | f426946582efafe8920dfb4150fdf8c6f0a4e20e1bbde304290dc65580e0db60 |
| logs/226-head-preservation-and-redaction.log | 14:14  1 user, load averages: 1.99 2.01 1.77 | 0 | a05d0ea31af1decc2ff0b3464f7698e29d1ab4eba70a95bde915e13f12e94f4a |
| logs/227-r6-key-set.log | 14:34  up 15:05, 1 user, load averages: 2.24 1.77 1.60 | 1 | f80696ca28780d12babbe4e6d9b0399bf35e30a0156f8d47c0c05fb91def6076 |
| logs/228-r6-storage-set-wait.log | 14:34  1 user, load averages: 2.27 1.79 1.61 | 0 | db523f84861ec26503cfc1a45801669640465b405f803ef79d50bf1982b6d871 |
| logs/229-existing-test-final-diffs.log | 14:35  1 user, load averages: 2.04 1.81 1.63 | 0 | 593de0b5b8efa97541039f39c7ca5d3c19f9d0ccff989358719b23d9ceb82414 |
| logs/230-complete-phase1-code-diff.log | 14:36  1 user, load averages: 2.34 1.94 1.68 | 0 | 1b6823c2ebfc89e7197595223d8f137b9f936339279260b52250cb34d721a262 |
| logs/231-r6-storage-set.log | 14:38  up 15:09, 1 user, load averages: 1.75 1.84 1.67 | 1 | 952500574e8d61e96bcdac04d911f421cb94588b8f6ebf0730955146ab90c4ca |
| logs/232-r6-missing-file-wait.log | 14:38  1 user, load averages: 1.72 1.83 1.67 | 0 | 511e54d6b4d2065a8d0f424a3949164853a148d830fdc7050d1bbbf8e9871097 |
| logs/233-r6-missing-file.log | 14:39  up 15:09, 1 user, load averages: 3.11 2.13 1.78 | 1 | 84ab06d7ff474bd4628ddbea0850c1b59489bf6612771974bd3d8ed371d11bd5 |
| logs/234-r6-uncovered-file-wait.log | 14:39  1 user, load averages: 3.08 2.19 1.81 | 0 | 79c51440b5ad23d881a9c14c8bd2c7c921e31c70a4b1aa2e9dada5690da09e1a |
| logs/235-r6-uncovered-file.log | 14:40  up 15:11, 1 user, load averages: 1.69 1.98 1.76 | 1 | 68fd21abdc6d503d4efccd7e48587628edb780d3fda451e4d46570d58b3a274c |
| logs/236-r6-changed-file-wait.log | 14:40  1 user, load averages: 1.71 1.98 1.76 | 0 | f33505b0e80737c2adf191689b45314e6f6ae2ff649d2790e8b56f81df95e2ae |
| logs/237-r6-changed-file.log | 14:52  up 15:22, 1 user, load averages: 1.13 1.33 1.48 | 1 | 35eeff90822091aa9fb78039bb3912d97e57c38e4333b0f54f76dfbd4835072e |
| logs/238-r6-marker-file-wait.log | 14:52  1 user, load averages: 1.18 1.33 1.48 | 0 | c30f51e3f260d7bc1adbcd8ef70fc2b98019b3e9087f3d7f3ed6e46a156b9da8 |
| logs/239-r6-marker-file.log | 14:52  up 15:23, 1 user, load averages: 1.09 1.31 1.47 | 1 | f2bea18d6a0d919af4888d860bee83840ba6b11628fdfdc0079f2781e1e26b0e |
| logs/240-r6-non-work-tree-wait.log | 14:52  1 user, load averages: 1.08 1.31 1.46 | 0 | aebdeb0a14cdc5a0f00fe69f485a278d41e27564a62a3b2b33824cfce6dcccf7 |
| logs/241-r6-non-work-tree.log | 14:56  up 15:26, 1 user, load averages: 1.28 1.14 1.34 | 1 | b26fb669a2005eb9cd4229daca472e8cd0c79c1b7ad18cc3b4495f6668fa1234 |
| logs/242-r6-missing-manifest-wait.log | 14:56  1 user, load averages: 1.18 1.12 1.33 | 0 | 240497e018141598d1929582391c1177ff67767d9340bcd5d1e2a6ae3412fdab |
| logs/243-r6-missing-manifest.log | 15:14  up 15:45, 1 user, load averages: 0.93 1.08 1.16 | 1 | 74f15bee521491c76fc5826790fefad27d869c8b6af35b951e986292993e46de |
| logs/244-record-script-final-source.log | 15:15  1 user, load averages: 0.85 1.04 1.14 | 0 | e2717fc9c0841dfd9d573393e7138fdf4fa8aefac6d6e88b938b1e44728d70c3 |
| logs/245-closure-evidence-index.log | 15:17  1 user, load averages: 0.60 0.92 1.07 | 0 | 93134cb60958ffaefe28f0066809277b0be21f41562e58bb8a966ffe86aedf45 |
| logs/246-opening-limitations-review.log | 15:17  1 user, load averages: 0.47 0.87 1.05 | 0 | c7644ac48faff3988282dad0c8a3ac63e3fd3b0643af67e2d12c45bfd6feacb1 |
| logs/247-closure-log-hashes.log | 15:18  1 user, load averages: 1.85 1.14 1.13 | 0 | 7037919e918233834055e122c56b635b95f8d9781b024b3199dbc459e47558c0 |
| logs/248-closure-quotation-review.log | 15:23  1 user, load averages: 2.60 2.25 1.66 | 0 | bb4ff0dc0063da3cd2021b9bf58f1d86c2cb436b9513383e172a9b2f9eb70eef |
| logs/249-write-phase1-appendix.log | 15:28  up 15:58, 1 user, load averages: 1.68 2.21 1.83 | 0 | 9799ee4bf4fd1f867eda7e6b9c7579f6618aedf9b7ec771ad6c4879ed2cbce1b |
| logs/250-phase1-appendix-review.log | 15:28  1 user, load averages: 1.54 2.11 1.81 | 0 | 2f1509bf224b84ed7251913f2106a5a4e8a792fbdec4b9723894b1beac0d3b05 |
| logs/251-closure-log-hash-verification.log | 15:28  1 user, load averages: 1.54 2.11 1.81 | 0 | ccffb0d4d46a44d2a02aeb4a12399fd449d17f542933f70d71d256393df6f550 |
| logs/252-fix-appendix-table-format.log | 15:30  1 user, load averages: 2.34 2.18 1.86 | 0 | 410dd72a07ee158e7ab8b9d819412ff2fe4892a09f5e1a1699bd3b0daabeafb9 |
| logs/253-commit-5-message-check.log | 15:30  1 user, load averages: 1.89 2.08 1.83 | 0 | 991e6e60174be9b024eca65eaf159662bdf6462dd5b52a8e9f61963628024648 |
| logs/254-commit-5-stage-review.log | 15:30  1 user, load averages: 1.89 2.08 1.83 | 0 | 35abc05e5ba070033e8d0561e9137352004885067c1e6a63e281d7ca9d8199e8 |
| logs/255-commit-5.log | 15:30  1 user, load averages: 2.22 2.15 1.86 | 0 | 0d72a0b9807333a37ddee0f1c25c23848ad0619b97c8c92548ff1c685f2e7aeb |
| logs/256-phase1-final-head.log | 15:30  1 user, load averages: 2.22 2.15 1.86 | 0 | 6d0d9c249c0b3c71a305a93e9a9e7ac2be8de0fd961208c0f481602831561a8c |
| logs/257-final-attribution-shape.log | 15:30  1 user, load averages: 2.41 2.19 1.88 | 0 | 66c78c64fa878dc54376e2a8bc2b080a5c051ee36cf05dbfede4d1860ce8e33c |
| logs/258-final-documentation-verification.log | 15:30  1 user, load averages: 2.41 2.19 1.88 | 0 | 54e53b89cfb2fe140e620cc4f0249f1c85e0c3b82c2c1227c2d6bded821e8b0c |
| logs/259-attribution-range-proof.log | 15:31  1 user, load averages: 2.12 2.13 1.86 | 0 | 6b54f0f23393d3a1ffbf2e361502e6ff51f97b21614ac4b2842fbc390ab2d850 |


12. Single next Founder decision


Proceed with the investigation of DEC-20261115-02 B8 and B15 item 2 on the MacBook, then run the record script from fresh clones at Phase 1 HEAD under B10 and B15 item 3 on the required hosts. Phase 2 requires the Founder's separately signed resume after investigation. The Founder's host runs, review, session-record check, push and Phase 2 gates remain outstanding.
