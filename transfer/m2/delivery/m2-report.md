1. Harness, identity, tool use and runtime

Local origin/main, branch base and initial HEAD were c383353885abb526a5471ef764be3cffc558a6ff. Its first parent was b091b668af7db6142c5afeff16a628080885f63b. The branch is build/3b-m2-r1. DEC-20261125-01 B13 binds this build to the merge of pull request 255. The commission has SHA-256 3a6259589ad33fd82f207560ca81b138516b4ce967e38523ec592b35c4cce3ac.

The harness is Codex, model OpenAI GPT-6. The exact model identifier, effort, session ID and approvals reviewer were not shown. The assigned role is builder, actor session:codex/3b-m2-r1, execution surface codex. The harness showed /root in Default collaboration mode, workspace-write and restricted network access. The Founder reported on-request approval and no loaded MCP server. The supplied working directory was /Users/michaeldaley/builds/m2-r1, shell zsh, date 2026-11-25 and time zone America/New_York. Git identity was daley40-lab with 293512385+daley40-lab@users.noreply.github.com.

The inventory included functions.wait, request_user_input, request_user_input_async, send_message_to_user_async and exec. Inside exec it included apply_patch, exec_command, write_stdin and clock__curr_time. It also showed clock.sleep, collaboration.followup_task, interrupt_agent, list_agents, send_message and wait_agent, and the six names of Addendum 2 B4. Individual members of the deferred namespace were not initially displayed.

001-governed-version.log · 70de60425ca2312fb1a68e0ce2f9736235bec3b4b8f350a07e48c16fe4cd40f4

```text
WARNING: proceeding, even though we could not create PATH aliases: Operation not permitted (os error 1)
codex-cli 0.167.0
```

The recorded resume date is 2026-11-26. No barred tool was called. No command contained one of the six names of Addendum 2 B4 or ran code from a string inside exec. Runtime checks verified /Users/michaeldaley/.bun/bin/bun and /Users/michaeldaley/.bun/bin/bunx, binary SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5, Bun 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99.

007-runtime.log · 41a8d908b63d68298ae92171a43c21f718e2625c92234db7aac6d750a9bf51fb · Thu Nov 26 03:49:54 UTC 2026 to Thu Nov 26 03:49:54 UTC 2026 · 22:49  up 4 days, 14:17, 1 user, load averages: 2.10 4.69 6.19 · exit 0
079-baseline-runtime.log · fd3e50fb92bc6e959e792f4d30d6f381eb6e60885c96fc1ecbe41d6724f214bd · Thu Nov 26 04:30:17 UTC 2026 to Thu Nov 26 04:30:17 UTC 2026 · 23:30  up 4 days, 14:57, 1 user, load averages: 2.42 3.05 3.20 · exit 0
083-baseline-suite-runtime.log · f19afc9afa8084b72b01fe555f241fc5f2fe827c1409adafd79e1f1e335df7f8 · Thu Nov 26 04:36:03 UTC 2026 to Thu Nov 26 04:36:03 UTC 2026 · 23:36  up 4 days, 15:03, 1 user, load averages: 3.24 3.82 3.56 · exit 0
119-r1-runtime.log · d62534e339b78c799fb88129836eccff703ffc229b09b9c3bdf20dfeca8b9383 · Thu Nov 26 04:50:20 UTC 2026 to Thu Nov 26 04:50:20 UTC 2026 · 23:50  up 4 days, 15:17, 1 user, load averages: 1.93 2.16 2.66 · exit 0
132-transfers-runtime.log · 3b88f2f843a590c926dc54a60f8a9d0320e23ea6962cb05942e8a292bda1add0 · Thu Nov 26 04:52:40 UTC 2026 to Thu Nov 26 04:52:41 UTC 2026 · 23:52  up 4 days, 15:20, 1 user, load averages: 2.38 2.18 2.59 · exit 0
137-permissions-runtime.log · e9b1ce5dc9e2a9bb7c018a19e0867963a3c123343ff6963ce873421e206c73db · Thu Nov 26 04:54:44 UTC 2026 to Thu Nov 26 04:54:44 UTC 2026 · 23:54  up 4 days, 15:22, 1 user, load averages: 2.77 2.33 2.59 · exit 0
143-connection-runtime.log · 802c976d3f35d38b8f3836d5c8df144fab6cc6c2146db6a8a41c9ac603f1ee13 · Thu Nov 26 13:57:03 UTC 2026 to Thu Nov 26 13:57:03 UTC 2026 · 8:57  up 5 days, 24 mins, 1 user, load averages: 1.74 1.84 1.96 · exit 0
148-ownership-runtime.log · 2305e7a1f5f5c16ccfda58f4693404efe59322e0e7f9cb80cc0346310e0749b7 · Thu Nov 26 13:58:00 UTC 2026 to Thu Nov 26 13:58:00 UTC 2026 · 8:58  up 5 days, 25 mins, 1 user, load averages: 2.16 1.94 1.99 · exit 0
153-row-token-runtime.log · 4c4ab297137975091ce9c791309cbc01446b44132793de9efdc9e14a49ca0883 · Thu Nov 26 13:59:34 UTC 2026 to Thu Nov 26 13:59:35 UTC 2026 · 8:59  up 5 days, 27 mins, 1 user, load averages: 1.86 1.94 1.99 · exit 0
162-r2-runtime.log · b9f69738262adfb0c58a445d5a623f010a2451888095885e5b6f1b8dab37244a · Thu Nov 26 14:05:26 UTC 2026 to Thu Nov 26 14:05:26 UTC 2026 · 9:05  up 5 days, 33 mins, 1 user, load averages: 1.56 1.97 2.02 · exit 0
173-sender-runtime.log · 08ca3c3f6091c2c9f7a8e37816c7640a999a2e92bbfd49add1bf0c0898181ec4 · Thu Nov 26 14:11:05 UTC 2026 to Thu Nov 26 14:11:06 UTC 2026 · 9:11  up 5 days, 38 mins, 1 user, load averages: 1.69 1.93 2.00 · exit 0
178-kind-runtime.log · 8248e42cf9918a13259901ce76af907523e7b5c8d6ebd13ac44cd8caf83130e0 · Thu Nov 26 14:11:09 UTC 2026 to Thu Nov 26 14:11:09 UTC 2026 · 9:11  up 5 days, 38 mins, 1 user, load averages: 1.71 1.93 2.00 · exit 0
186-r3-runtime.log · 25a91ebc2267335cac9b2672ab95499edf1675b390133ea68b795e6eb769cd11 · Thu Nov 26 14:21:10 UTC 2026 to Thu Nov 26 14:21:10 UTC 2026 · 9:21  up 5 days, 48 mins, 1 user, load averages: 1.93 2.14 2.06 · exit 0
197-interval-runtime.log · 43fb271c8e6ccafd5152e218c90918644b23338547ff7b8be1bc5deeb9097033 · Thu Nov 26 14:37:05 UTC 2026 to Thu Nov 26 14:37:05 UTC 2026 · 9:37  up 5 days,  1:04, 1 user, load averages: 1.78 1.80 2.04 · exit 0
203-r4-runtime.log · b24ca85d45d7f26f999747aee813bc05691e7261c4bded2f63fe0424686eb183 · Thu Nov 26 14:38:27 UTC 2026 to Thu Nov 26 14:38:28 UTC 2026 · 9:38  up 5 days,  1:06, 1 user, load averages: 1.84 1.84 2.03 · exit 0
214-duplicate-runtime.log · 17d300ccd62363d576bd4bd2d4ca3805f54a3c6087eea64df71725650ce71294 · Thu Nov 26 14:40:24 UTC 2026 to Thu Nov 26 14:40:24 UTC 2026 · 9:40  up 5 days,  1:07, 1 user, load averages: 1.80 1.81 1.99 · exit 0
219-closed-runtime.log · 65195a1d260a132e9a90fe000ede1e70eff7958552f2912811754a64da82b868 · Thu Nov 26 14:43:15 UTC 2026 to Thu Nov 26 14:43:15 UTC 2026 · 9:43  up 5 days,  1:10, 1 user, load averages: 2.70 2.09 2.07 · exit 0
224-after-failure-runtime.log · 804f9df41ab08b71040929bd1ad93e3d91f13a2ddec420cba8397e63d2edeba2 · Thu Nov 26 14:47:39 UTC 2026 to Thu Nov 26 14:47:39 UTC 2026 · 9:47  up 5 days,  1:15, 1 user, load averages: 1.85 2.01 2.04 · exit 0
229-first-failure-runtime.log · be79c7e7e14cb01bcabf82947bf91b16408b0b78fbce8aa77cf0a53d1eeb2c24 · Thu Nov 26 14:52:43 UTC 2026 to Thu Nov 26 14:52:43 UTC 2026 · 9:52  up 5 days,  1:20, 1 user, load averages: 1.71 2.21 2.13 · exit 0
234-unsubscribe-runtime.log · 85f819fc3c9c25f75e7d2cd88317f6504fc0d13db84ad17d25ac4a488561c932 · Thu Nov 26 14:53:27 UTC 2026 to Thu Nov 26 14:53:27 UTC 2026 · 9:53  up 5 days,  1:21, 1 user, load averages: 1.52 2.09 2.08 · exit 0
279-r5-runtime.log · 21e75fe620a2b2ae06efd977b7d3a0bfe856917a9dd48305a94f920758cb5fab · Thu Nov 26 15:01:18 UTC 2026 to Thu Nov 26 15:01:18 UTC 2026 · 10:01  up 5 days,  1:28, 1 user, load averages: 1.30 1.77 1.96 · exit 0
300-diagnostic-runtime.log · 061f23fc451ecb2ff39d273a63d6298c5a96deb079166d855e95da638ab2dbf0 · Thu Nov 26 15:06:15 UTC 2026 to Thu Nov 26 15:06:16 UTC 2026 · 10:06  up 5 days,  1:33, 1 user, load averages: 1.51 1.74 1.90 · exit 0
322-child-map-runtime.log · 952491b410f001f25dc4e80bf148b1ca18c4c9dea66a77832797e41b136c4a97 · Thu Nov 26 15:13:43 UTC 2026 to Thu Nov 26 15:13:43 UTC 2026 · 10:13  up 5 days,  1:41, 1 user, load averages: 1.70 1.87 1.89 · exit 0
327-claude-eof-runtime.log · 90a461f333543c818a4567f1c13eb1df147594e7ed7ce69c466e86ce7d889b3c · Thu Nov 26 15:19:20 UTC 2026 to Thu Nov 26 15:19:20 UTC 2026 · 10:19  up 5 days,  1:46, 1 user, load averages: 1.59 1.78 1.83 · exit 0
332-madv-eof-runtime.log · 02dc3e770e00cda4ca0b1d5465ff2e59fbda09be07f119de980ce6779814b52d · Thu Nov 26 15:20:40 UTC 2026 to Thu Nov 26 15:20:40 UTC 2026 · 10:20  up 5 days,  1:48, 1 user, load averages: 2.95 2.17 1.97 · exit 0
337-claude-drain-runtime.log · b22e12d14d655fd0d4e824a05312b57247a1ee73f85cbcd50688f77bbb987824 · Thu Nov 26 15:22:57 UTC 2026 to Thu Nov 26 15:22:57 UTC 2026 · 10:22  up 5 days,  1:50, 1 user, load averages: 1.75 1.97 1.92 · exit 0
342-madv-drain-runtime.log · a3c3a97eb8e457dfdbee229b424a3a944eba3f6890213876fdc01c044cd89414 · Thu Nov 26 15:23:08 UTC 2026 to Thu Nov 26 15:23:09 UTC 2026 · 10:23  up 5 days,  1:50, 1 user, load averages: 2.26 2.07 1.96 · exit 0
347-claude-finish-runtime.log · e31e46d274d2df28d8253ef9e291769b9c861a1c81499b127205f5d93f11274c · Thu Nov 26 15:31:26 UTC 2026 to Thu Nov 26 15:31:27 UTC 2026 · 10:31  up 5 days,  1:59, 1 user, load averages: 1.81 2.34 2.18 · exit 0
352-madv-finish-runtime.log · 602a949efef13e79225ca1e1166208376ba6f791dddf9aeaeb3f2109397e4008 · Thu Nov 26 15:33:58 UTC 2026 to Thu Nov 26 15:33:58 UTC 2026 · 10:33  up 5 days,  2:01, 1 user, load averages: 1.76 2.08 2.10 · exit 0
357-early-cause-runtime.log · 6335601690f921208a4bcfcf149328d3e8e0124a82f1c341175b0782135e191b · Thu Nov 26 15:36:18 UTC 2026 to Thu Nov 26 15:36:18 UTC 2026 · 10:36  up 5 days,  2:03, 1 user, load averages: 2.63 2.30 2.17 · exit 0
362-founder-close-runtime.log · 7df97a14bbda250aa7b43280d1440ba998a5a4ff0c8a7758347a81e1716bb7fd · Thu Nov 26 15:40:04 UTC 2026 to Thu Nov 26 15:40:05 UTC 2026 · 10:40  up 5 days,  2:07, 1 user, load averages: 2.16 2.29 2.20 · exit 0
369-r6-runtime.log · 00f24f70e6f64c92768b247a87b77d4fe40cbf60f78da875ad6593f7fca26359 · Thu Nov 26 15:42:44 UTC 2026 to Thu Nov 26 15:42:45 UTC 2026 · 10:42  up 5 days,  2:10, 1 user, load averages: 1.89 2.25 2.20 · exit 0
379-retry-match-runtime.log · 96e21c7f9f4c709623c365c7d35a8108451d1e6287b63e4170b049a43bdeafae · Thu Nov 26 15:45:13 UTC 2026 to Thu Nov 26 15:45:13 UTC 2026 · 10:45  up 5 days,  2:12, 1 user, load averages: 1.54 1.95 2.08 · exit 0
384-exit-six-runtime.log · 128323f442742c521722a0d1c35b90911f785f41b95bfb42b6604e33fcad0803 · Thu Nov 26 15:46:47 UTC 2026 to Thu Nov 26 15:46:48 UTC 2026 · 10:46  up 5 days,  2:14, 1 user, load averages: 1.63 1.83 2.01 · exit 0
389-exit-dispatch-runtime.log · 3792b53a1e6932754287b5d7eb74d46ef2e6e5b3cbfa00ed7d5887dae711bad6 · Thu Nov 26 15:46:57 UTC 2026 to Thu Nov 26 15:46:58 UTC 2026 · 10:46  up 5 days,  2:14, 1 user, load averages: 1.91 1.88 2.03 · exit 0
405-r7-runtime.log · a70d7dc282d100814714693ecc2e4e22cfcbee580e21c2e823a6d3583a8831ee · Thu Nov 26 15:56:24 UTC 2026 to Thu Nov 26 15:56:24 UTC 2026 · 10:56  up 5 days,  2:23, 1 user, load averages: 1.46 1.73 1.91 · exit 0
413-record-frames-runtime.log · a991d1158349d0ca15ddd0a05a870f65af4f2dc21c95535be8c9d480e1dc5a2e · Thu Nov 26 16:09:04 UTC 2026 to Thu Nov 26 16:09:04 UTC 2026 · 11:09  up 5 days,  2:36, 1 user, load averages: 2.37 2.01 1.96 · exit 0
416-record-ends-runtime.log · ffc62473c411a76916929a0aacfa680d53b0570ce7053624ef50cb397a737f9a · Thu Nov 26 16:10:26 UTC 2026 to Thu Nov 26 16:10:26 UTC 2026 · 11:10  up 5 days,  2:38, 1 user, load averages: 1.93 2.00 1.96 · exit 0
436-frame-break-runtime.log · 3084f47926e39c983d6e2641359ce70fcd97e000b6b26c133961493e5dd845a9 · Thu Nov 26 16:20:15 UTC 2026 to Thu Nov 26 16:20:15 UTC 2026 · 11:20  up 5 days,  2:47, 1 user, load averages: 1.27 1.89 1.97 · exit 0
443-full-runtime.log · 9cbb3c3706da9c6fb9567e7511c73ec067c86a76f6089cdb3b0c43c1de2058ac · Thu Nov 26 16:22:53 UTC 2026 to Thu Nov 26 16:22:53 UTC 2026 · 11:22  up 5 days,  2:50, 1 user, load averages: 2.69 2.77 2.36 · exit 0
457-restart-runtime.log · 398a138ed1ea7baf34d62e2b5da69f114322f3fb04d54659a5e4279d752a5b35 · Thu Nov 26 16:27:50 UTC 2026 to Thu Nov 26 16:27:51 UTC 2026 · 11:27  up 5 days,  2:55, 1 user, load averages: 1.61 2.09 2.16 · exit 0
462-suite-runtime.log · ece95570594630a17eaacfe87f6adf1128f4150e3d2050c29a795c11d1e394aa · Thu Nov 26 16:29:42 UTC 2026 to Thu Nov 26 16:29:42 UTC 2026 · 11:29  up 5 days,  2:57, 1 user, load averages: 1.31 1.82 2.04 · exit 0
507-gate-runtime.log · da06d955a4ecf05eb1ea40996d0fcf0499a170a224c56ce9cd77457dffddec1c · Thu Nov 26 16:39:33 UTC 2026 to Thu Nov 26 16:39:33 UTC 2026 · 11:39  up 5 days,  3:07, 1 user, load averages: 1.80 2.26 2.23 · exit 0
513-gate-suite-runtime.log · e7c4df79454407f5e9fcd0241e0b6f785b31c5c3d94230ea0e6d3aeb47fbefb1 · Thu Nov 26 16:43:31 UTC 2026 to Thu Nov 26 16:43:31 UTC 2026 · 11:43  up 5 days,  3:11, 1 user, load averages: 1.01 1.73 2.01 · exit 0

Plain-text convention. Where a source uses square brackets, the cited original log is authoritative. The full-diff transcription uses {U+005B} and {U+005D} for the two bracket characters. The transcription removes trailing whitespace from quoted diffs. Every quoted gap is marked.

2. Working directory, branch, HEAD and preconditions

/Users/michaeldaley/builds/m2-r1 · build/3b-m2-r1 · HEAD 6b3a38365854ed39a4bd291be1d48d5045cd109e · base c383353885abb526a5471ef764be3cffc558a6ff.

1. Log 010 verified the clean binding base, ancestor, first parent, five documentation-only changes, remote branches, directory inventories and initial absence of the M2 documents. The only numbered logs in the inventory had just been written by this session. Logs 071 and 072 reconfirmed HEAD, branch, clean index, worktree and empty stash on resume.

010-seat.log · c581ae69339ae82de6e1c4834b55609d983f8d09d232a4529c3886b1e0236977

```text
c383353885abb526a5471ef764be3cffc558a6ff
b091b668af7db6142c5afeff16a628080885f63b
docs/decisions/DEC-20261123-01-addendum-1-environment-values-in-logs.md
docs/decisions/DEC-20261123-01-addendum-2-pty-echo.md
docs/decisions/DEC-20261123-01-addendum-3-first-verdict.md
docs/decisions/DEC-20261125-01-m1-records-and-m2.md
docs/verification/phase-3a-correction-rounds.md
```

2. All authority blobs were read from HEAD and verified. Each governing decision and addendum was issued and signed by Michael Daley. The following table gives blob SHA-256 and source path.

SHA-256 | Source
:-- | :--
3a6259589ad33fd82f207560ca81b138516b4ce967e38523ec592b35c4cce3ac | docs/decisions/DEC-20261125-01-m1-records-and-m2.md
e0f08199567641f47eba567ac0653bfc8f1ed9315b3ddfca8074d535b294cb8e | docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md
5cd930a3f2dbb8f3a85c63cfba5ed95f8088418ee132e89872d57e63fad75666 | docs/decisions/DEC-20261123-01-addendum-1-environment-values-in-logs.md
f524cb055c363c57dbcaf25dc037645989d453a942f3ce120c7083735e6cc52c | docs/decisions/DEC-20261123-01-addendum-2-pty-echo.md
b7ff8171407289c4b4db9be9c76dfa049fdd8b0fe4f80076613f9aa6b48e43f7 | docs/decisions/DEC-20261123-01-addendum-3-first-verdict.md
d373235e424bd7fbe4c1c5b1c5f4954eb1b02165db4e1365d9cfa1533aa93b29 | docs/decisions/DEC-20261108-04-phase-3b-standing-commission.md
90e2f541fd0a232390ca0554067a2de8b37f15c933016eafe40ebde2cd2eff17 | docs/decisions/DEC-20261108-04-addendum-1-corrections.md
319ba65b340696d66a655e21f648fed742a9c38bcbb1d876776abc27a27a9738 | docs/decisions/DEC-20261108-01-phase-3b-approval.md
863f0b7bff5e7cc662bfc43084120d6fff39af07daa3117521bc85f887b8d3c9 | docs/decisions/DEC-20261016-02-task46-correction.md
fa0d114dbe3a37db38a7538e9a5c33da42755a47250d7ae4069233043c6ac85e | docs/decisions/DEC-20261024-01-separation-pin-rule.md
3151cb9e178e918f0c07f5a4eb9931fa9d529debedf0ad4d91f5999844883da7 | docs/decisions/DEC-20261112-02-model-record.md
38ec4066f5c9487547befc81e00b80b69126d9140f1e66c0a8dcb35e5fe815ef | docs/decisions/DEC-20261108-02-phase-3b-builder-qualification.md
e04b54065b0f0bb465b2d14e14a39f3b31f9cb34a874f6f8210a7d7e74a8c1c1 | docs/decisions/DEC-20261108-03-addendum-2-codex-harness.md
f2a0ef1063379902935760d9517b68d532cabf6e24699cdebb789681f78ce15e | docs/decisions/DEC-20261108-03-addendum-3-image-tool.md
e817470aea6be2c176d4ae75856fd793ef982bd28c9eb793df9c9038a5c1dfbc | docs/decisions/DEC-20261108-03-addendum-4-sandbox-halt.md
e86e94a62c7067e4656114afe1713c1478814ffe446d1ffcc8b788accfc3ff3d | docs/decisions/DEC-20261108-03-addendum-5-own-work.md
24cef0ed5c968aa80ada586e473526d0f4f0b1de1331eba1d5a35051b1254ac9 | docs/decisions/DEC-20261108-03-addendum-6-names-in-text.md
d90d48718bc4ea6056af6f011f797a78eddcfd14e7111f15f823085c4388bca0 | docs/decisions/DEC-20261108-03-addendum-10-second-verdict.md
e2d28cbd12485e9025c928403eb7beead9552ee378b023ddf5bc9e18febe00df | docs/decisions/DEC-20261108-03-addendum-11-governed-build.md
829248f1e2557ddbcfd33d6456f7056bfce73a008791cb88caa9660a5d979d29 | docs/decisions/DEC-20261112-03-addendum-2-gate-repeat.md
10cdc674ce746568c963aa2c5c34c95a69d9960ea469438b044bfb5fe4b9e9de | docs/decisions/DEC-20261108-03-phase-3b-h1.md
41e27eafc24a2eef238c080d1374b90fbe22d609f4ef5cbb66e07cccb5b347a5 | docs/decisions/DEC-20261113-01-h2-records-and-merge.md
04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550 | docs/decisions/DEC-20261102-02-hardening-builds.md
bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5 | docs/decisions/DEC-20261023-01-standing-build-rules.md
249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7 | docs/decisions/DEC-20261013-03-tests-4-6-ruling.md
011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5 | docs/decisions/DEC-20261104-02-hardening-f-and-task58.md
6bffc2c18927b90f4b5042f312947e5d39853ca53404a58a51b4602eb45652b8 | docs/decisions/DEC-20261114-01-madv-surface-release.md
5d8bd4a446d8b3120bddbc34dc11a5fdf83e3a07d9efcd04fbd7b8efdad8d22b | docs/decisions/DEC-20261115-02-phase-3b-m0.md
24f76dbb631d6058e81ccff93d3c9fecb11521b5a876c687ec0da1ee0f9e0a23 | docs/decisions/DEC-20261115-02-addendum-3-phase-1-record-check.md
a48bf5457bf17cf5d554e541c5bb3609efacf6ad170ad6e56950b829a4269ccc | docs/superpowers/plans/2026-09-19-phase-3b-live-tui-integration.md
da8f4c8c35f617898368b340d710188686c9dc9faf2b23c4a6b284c1bb4d93fc | docs/superpowers/specs/2026-09-19-phase-3b-live-tui-integration-design.md
472f3179c20f7f41c0e3feb5a65842bf3774cf6df01e8684a3ea86dcd811bce0 | docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md
0879ede2d3b07e137d1f3d5f75c131285277b44e61f1305d3d0d59da64f1dbca | AGENTS.md

The original builder prompt has SHA-256 92540f1a8ff60f3a2bc68e9c4b9cdbcc121f967c2273791e61eddb8e7b8e4945. Both prompt-manifest entries verified on resume.

3. The numbered source excerpts below establish the broker, TUI, monitor and separation contracts at the binding base. The source fingerprint is required. The first resume ruling resolves B16 item 3 and the B19 table in favor of validating that required source shape. Logs 048 through 055 and 064 contain the source reads. The A10 blob checks are in log 076. Repeated fields of the independent room projection and fixture initializers in log 064 do not read the client projection. Source line numbers are at the base.

048-broker-interface.log · ed106e7ff5388e18bee719e7dd8ee809842e6a25790ae2479c406359e16050ff

```text
packages/broker/src/client.ts
   106	/** The client-facing broker session projection (spec section 9.4). */
   107	export interface BrokerSnapshot {
   108	  readonly sessionId: string;
   109	  readonly snapshotSeq: number | null;
   110	  readonly connected: boolean | null;
   111	  readonly phase:
   112	    | "starting"
   113	    | "active"
   114	    | "paused"
   115	    | "interrupted"
   116	    | "closing"
   117	    | "closed";
   118	  readonly taskEnvelopeHash: string;
   119	  readonly task: TaskEnvelopeV1 | null;
   120	  readonly repositoryFingerprint: RepositoryFingerprint;
   121	  readonly executions: readonly ExecutionSnapshot{U+005B}{U+005D} | null;
   122	  readonly activeWriterExecutionId: string | null;
   123	  readonly fencingToken: number | null;
   124	  readonly tokenState: "not_issued" | "valid" | "invalidated";
   125	  readonly pendingApprovals: readonly PendingApprovalSnapshot{U+005B}{U+005D};
   126	  readonly pendingTransfers: readonly PendingTransferSnapshot{U+005B}{U+005D} | null;
   127	  readonly permissionSummary: PermissionSummarySnapshot | null;
   128	  // Existing Phase 2 broker ownership-state type, declared in
   129	  // packages/broker/src/ownership-machine.ts. Consumed, never redeclared.
   130	  readonly ownershipState: OwnershipState | null;
   131	  readonly verification: VerificationSnapshot | null;
   132	  readonly review: ReviewSnapshot | null;
   133	  readonly incident: IncidentSnapshot | null;
   134	  readonly eventLog: readonly LedgerEntrySnapshot{U+005B}{U+005D};
   135	  readonly queueDepth: number | null;
   136	  readonly ledgerSeq: number;
   137	}
   138
   139	/** Launch facts for one execution of the session (spec section 9.4). */
   140	export interface ExecutionSnapshot {
   141	  readonly identity: ExecutionIdentity;
   142	  readonly state:
   143	    | "declared"
   144	    | "host-starting"
   145	    | "launching"
   146	    | "attesting"
   147	    | "ready"
   148	    | "exited"
   149	    | "failed";
   150	  readonly hostPid: number | null;
   151	  readonly childPid: number | null;
   152	  readonly processGroupId: number | null;
   153	  readonly executablePath: string;
   154	  readonly executableSha256: string;
   155	  readonly exitCode: number | null;
   156	  readonly exitSignal: string | null;
   157	}
(lines omitted)
   167	/** A pending approval as projected to the client (spec section 9.4). */
   168	export interface PendingApprovalSnapshot {
   169	  readonly id: string;
   170	  readonly type: string;
   171	  readonly actor: string;
   172	  readonly taskId: string;
   173	  readonly repositoryFingerprint: RepositoryFingerprint;
   174	  readonly scope: string;
   175	  readonly timestamp: string;
   176	  readonly state: "pending" | "approved" | "rejected" | "expired";
   177	}
(lines omitted)
   227	export interface LedgerEntrySnapshot {
   228	  readonly seq: number;
   229	  readonly type: string;
   230	  readonly actor: string;
   231	  readonly fencingToken: number | null;
   232	  readonly hash: string;
   233	  readonly timestamp: string;
   234	}
   235
   236	/** The in-process client boundary (spec section 9.3). close() releases only this client's subscriptions. */
   237	export interface BrokerClient {
   238	  getSnapshot(): Promise<BrokerSnapshot>;
   239	  snapshots(): AsyncIterable<BrokerSnapshot>;
   240	  output(executionId: string): AsyncIterable<OutputFrame>;
   241	  request(command: BrokerCommand): Promise<BrokerResult>;
   242	  publish(event: BridgeEventV1): Promise<BrokerResult>;
   243	  close(): Promise<void>;
   244	}
packages/broker/src/ownership-machine.ts
     9	export type OwnershipState =
    10	  | { kind: "free" }
    11	  | { kind: "owned"; executionId: string; worktreeId: string; fencingToken: number; repositoryFingerprint: RepositoryFingerprint }
    12	  | { kind: "transfer-requested"; executionId: string; worktreeId: string; fencingToken: number; transferTo: string; repositoryFingerprint: RepositoryFingerprint }
    13	  | { kind: "sender-released"; executionId: string; worktreeId: string; fencingToken: number; transferTo: string; repositoryFingerprint: RepositoryFingerprint }
    14	  | { kind: "rejected"; executionId: string; worktreeId: string; fencingToken: number; reason: string };
packages/broker/src/in-process-client.ts
   249	  function nextStampedSnapshot(): StampedBrokerSnapshot | Promise<never> {
   250	    const projected = projectSnapshot(broker.snapshotProjectionInput());
   251	    const violation = admitSnapshotSeq(deliveredSeq + 1);
   252	    if (violation !== null) {
   253	      return raise(violation);
   254	    }
   255	    return { ...projected, snapshotSeq: deliveredSeq, connected: !closed };
   256	  }
(lines omitted)
   292	  async function getSnapshot(): Promise<StampedBrokerSnapshot> {
   293	    return nextStampedSnapshot();
   294	  }
   295
   296	  async function* snapshots(): AsyncGenerator<StampedBrokerSnapshot> {
   297	    while (!closed) {
   298	      yield nextStampedSnapshot();
   299	    }
   300	  }
(lines omitted)
   390	  async function close(): Promise<void> {
   391	    // Releases only this client's own iterators and buffers. The bound
   392	    // RuntimeBroker, its ledger, and its session are never touched here.
   393	    closed = true;
   394	    outputQueues.clear();
   395	    outputSeqs.clear();
   396	    for (const waiter of {U+005B}...outputWaiters{U+005D}) {
   397	      waiter.settle(iterationDone());
   398	    }
   399	  }
```

049-tui-entry.log · 6c87b4c851c63cbd35764ce2f1d8bcb7b5c5d3ea28979b9a38d94fc040223204

```text
apps/madbridge/src/tui/types.ts
    71	/** Color states for approval — explicit text for every color state. */
    72	export type ApprovalColorState =
    73	  | { kind: "pending"; text: "PENDING — awaiting Founder decision" }
    74	  | { kind: "approved"; text: "APPROVED — Founder authorized" }
    75	  | { kind: "rejected"; text: "REJECTED — Founder denied" }
    76	  | { kind: "expired"; text: "EXPIRED — decision window elapsed" };
(lines omitted)
    92	/** Immutable broker snapshot for TUI consumption. */
    93	export interface BrokerSnapshot {
    94	  readonly connected: boolean;
    95	  readonly sessionState:
    96	    | "starting"
    97	    | "active"
    98	    | "paused"
    99	    | "interrupted"
   100	    | "reconciling"
   101	    | "closing"
   102	    | "closed";
   103	  readonly ownershipState:
   104	    | "free"
   105	    | "owned"
   106	    | "transfer-requested"
   107	    | "sender-released"
   108	    | "receiver-validating"
   109	    | "rejected";
   110	  readonly activeWriter: string | null;
   111	  readonly fencingToken: number;
   112	  readonly task: TaskEnvelopeV1 | null;
   113	  readonly executions: readonly ExecutionIdentity{U+005B}{U+005D};
   114	  readonly repositoryFingerprint: RepositoryFingerprint | null;
   115	  readonly pendingApprovals: readonly PendingApproval{U+005B}{U+005D};
   116	  readonly pendingTransfers: readonly PendingTransfer{U+005B}{U+005D};
   117	  readonly permissionSummary: PermissionSummary;
   118	  readonly transferPhase: string | null;
   119	  readonly verificationStatus: VerificationStatus | null;
   120	  readonly reviewStatus: ReviewStatus | null;
   121	  readonly incident: IncidentRecord | null;
   122	  readonly eventLog: readonly LedgerEntryProjection{U+005B}{U+005D};
   123	  readonly queueDepth: number;
   124	}
   125
   126	export interface PendingApproval {
   127	  readonly id: string;
   128	  readonly type: string;
   129	  readonly actor: string;
   130	  readonly taskId: string;
   131	  readonly repositoryFingerprint: RepositoryFingerprint;
   132	  readonly scope: string;
   133	  readonly timestamp: string;
   134	  readonly colorState: ApprovalColorState;
   135	}
(lines omitted)
   175	export interface LedgerEntryProjection {
   176	  readonly seq: number;
   177	  readonly type: string;
   178	  readonly actor: string;
   179	  readonly fencingToken: number;
   180	  readonly hash: string;
   181	  readonly timestamp: string;
   182	}
apps/madbridge/src/tui/App.tsx
   116	  subscribe?: (listener: (snapshot: BrokerSnapshot) => void) => () => void;
apps/madbridge/src/tui/hooks/useBrokerState.ts
    10	export interface BrokerStateHook {
    11	  readonly state: BrokerSnapshot | null;
    12	  readonly connected: boolean;
    13	  readonly subscribe: (listener: (snapshot: BrokerSnapshot) => void) => () => void;
    14	}
    15
    16	/**
    17	 * useBrokerState subscribes to immutable broker snapshots.
    18	 * The broker owns all authority — this hook only reads state for rendering.
    19	 */
    20	export function useBrokerState(
    21	  externalSubscribe?: (listener: (snapshot: BrokerSnapshot) => void) => () => void,
    22	): BrokerStateHook {
    23	  const {U+005B}state, setState{U+005D} = useState<BrokerSnapshot | null>(null);
    24	  const {U+005B}connected, setConnected{U+005D} = useState(false);
    25	  const unsubscribeRef = useRef<(() => void) | null>(null);
    26
    27	  useEffect(() => {
    28	    if (!externalSubscribe) {
    29	      // No broker connection configured — render shell only
    30	      return;
    31	    }
    32
    33	    const unsubscribe = externalSubscribe((snapshot: BrokerSnapshot) => {
    34	      setState(snapshot);
    35	      setConnected(snapshot.connected);
    36	    });
    37	    unsubscribeRef.current = unsubscribe;
    38
    39	    return () => {
    40	      if (unsubscribeRef.current) {
    41	        unsubscribeRef.current();
    42	        unsubscribeRef.current = null;
    43	      }
    44	    };
    45	  }, {U+005B}externalSubscribe{U+005D});
apps/madbridge/src/tui/main.tsx
   143	async function main(): Promise<void> {
   144	  const isFixture = process.argv.includes("--fixture");
   145
   146	  const renderer = await createCliRenderer();
   147	  const root = createRoot(renderer);
   148
   149	  if (isFixture) {
   150	    // Fixture mode — render with demo data, no live broker connection.
   151	    // The fixture banner is permanently visible inside App via the fixture prop.
   152	    const base = makeFixtureSnapshot();
   153	    const fixtureSnapshot = withHarnessApprovalQueue(base);
   154	    const fixtureSubscribe = isHarnessStreamEnabled()
   155	      ? makeStreamingFixtureSubscribe(fixtureSnapshot)
   156	      : (listener: (snapshot: BrokerSnapshot) => void): (() => void) => {
   157	          listener(fixtureSnapshot);
   158	          return () => {};
   159	        };
   160
   161	    root.render(
   162	      <App
   163	        subscribe={fixtureSubscribe}
   164	        fixture={true}
   165	      /> as ReactNode,
   166	    );
   167	  } else {
   168	    // Live mode — no broker wiring in Phase 0.
   169	    // App renders with no subscription (shows NOT CONNECTED).
   170	    root.render(<App /> as ReactNode);
   171	  }
   172	}
   173
   174	main().catch((err) => {
   175	  console.error("Fatal:", err);
   176	  process.exit(1);
   177	});
```

050-tui-readers.log · 706e894edc328a1a2bb67336122d7d2a974a3fc8ee21e6ca53cde5dd884121de

```text
apps/madbridge/src/tui/components/StatusBar.tsx
    30	  connected: boolean;
(lines omitted)
    44	    connected,
(lines omitted)
    71	  connected: boolean;
(lines omitted)
   106	  const connToken = input.connected ? "CONNECTED" : "NOT CONNECTED";
(lines omitted)
   132	  const connCompact = input.connected ? "CONN" : "NOCONN";
(lines omitted)
   273	const NO_TOKEN_MARKER = " T:none";
   274
   275	export function abbreviateWriter(ownerWord: string, maxLen: number): string {
   276	  // maxLen is a display-width budget, not a UTF-16 length.
   277	  // Explicit no-token state: keep the marker attached to the writer ID with a
   278	  // single space, and preserve the marker the same way an issued "#N" token is
   279	  // preserved — the ID yields budget first.
   280	  const noTokenMatch = /^(.*?)\s*\(token\s+none\)\s*$/i.exec(ownerWord);
   281	  if (noTokenMatch) {
   282	    const id = (noTokenMatch{U+005B}1{U+005D} ?? "").replace(/\s+/g, "");
   283	    if (displayWidth(id) + displayWidth(NO_TOKEN_MARKER) <= maxLen) return id + NO_TOKEN_MARKER;
   284	    const idBudget = maxLen - displayWidth(NO_TOKEN_MARKER);
   285	    // Marker alone exceeds the budget — keep the marker, drop the ID.
   286	    if (idBudget <= 0) return NO_TOKEN_MARKER.trimStart().slice(0, maxLen);
   287	    return sliceByDisplayWidth(id, idBudget) + NO_TOKEN_MARKER;
   288	  }
(lines omitted)
   346	function describeOwner(state: BrokerSnapshot | null): string {
   347	  if (!state) return "none";
   348	  const o = state.ownershipState;
   349	  const w = state.activeWriter;
   350	  const tok = state.fencingToken;
   351	  const hasToken = tok > 0;
   352	  switch (o) {
   353	    case "free":
   354	      return "free";
   355	    case "owned":
   356	      if (hasToken) return (w ?? "unknown") + " #" + String(tok);
   357	      return (w ?? "unknown") + " (token none)";
   358	    case "transfer-requested":
   359	      if (hasToken) return "transfer-req #" + String(tok);
   360	      return "transfer-req (token none)";
   361	    case "sender-released":
   362	      if (hasToken) return "released #" + String(tok);
   363	      return "released (token none)";
   364	    case "receiver-validating":
   365	      return "validating";
   366	    case "rejected":
   367	      return "rejected";
   368	  }
   369	}
apps/madbridge/src/tui/panes/GovernancePane.tsx
    51	  if (!state || !state.connected) {
    52	    return (
    53	      <box flexGrow={1} flexDirection="column" borderStyle="single" borderColor={active ? POSEIDON.accent : POSEIDON.uiBorder} overflow="hidden">
    54	        <text>{fit("GOVERNANCE | NOT CONNECTED")}</text>
    55	        <text>{fit("No current permissions, verification, or review.")}</text>
    56	      </box>
    57	    );
    58	  }
    59
    60	  // Safe accessors — resolve identities by surface.
    61	  const cl = state.executions?.find((e) => e.surface === "claude-code");
    62	  const agy = state.executions?.find((e) => e.surface === "antigravity");
    63	  const perms = state.permissionSummary;
    64	  const verification = state.verificationStatus;
    65	  const review = state.reviewStatus;
    66	  const transfer = state.pendingTransfers?.{U+005B}0{U+005D} ?? null;
    67
    68	  // Render empty allowed lists as "none", not healthy/active/unknown.
    69	  const readPaths = perms?.allowedReadPaths?.length ? perms.allowedReadPaths.join(", ") : "none";
    70	  const writePaths = perms?.allowedWritePaths?.length ? perms.allowedWritePaths.join(", ") : "none";
    71	  const cmdCats = perms?.allowedCommandCategories?.length ? perms.allowedCommandCategories.join(", ") : "none";
    72	  const egress = perms?.allowedEgressDestinations?.length ? perms.allowedEgressDestinations.join(", ") : "none";
    73	  const dataClass = perms?.dataClass ?? "—";
    74
    75	  // Build all rows as plain strings — each will be truncated to fit.
    76	  const rows: string{U+005B}{U+005D} = {U+005B}{U+005D};
    77	  rows.push("GOVERNANCE");
    78	  rows.push("Task ID: " + (state.task?.task_id ?? "—") + " | Repo: " + (state.task?.repository ?? "—"));
    79	  rows.push("Fingerprint: " + (state.repositoryFingerprint ? state.repositoryFingerprint.git_sha.slice(0, 12) : "—"));
    80	  rows.push("Claude: " + (cl?.execution_id ?? "—"));
    81	  rows.push("Antigravity: " + (agy?.execution_id ?? "—"));
    82	  rows.push("Writer: " + (state.activeWriter ?? "—") + " | Token: " + String(state.fencingToken) + " | Ownership: " + state.ownershipState);
    83	  rows.push("Read: " + readPaths + " | Write: " + writePaths);
    84	  rows.push("Commands: " + cmdCats + " | Egress: " + egress + " | Data class: " + dataClass);
    85	  rows.push("Transfer phase: " + (state.transferPhase ?? "none") + " | Pending transfers: " + String(state.pendingTransfers?.length ?? 0));
    86	  if (transfer) {
    87	    rows.push("Transfer: " + transfer.from + " → " + transfer.to + " | tok#" + String(transfer.fencingToken) + " | " + transfer.reason);
    88	    // Provenance timestamp on its own row so the label survives narrow-width
    89	    // truncation instead of being cut off behind a long reason.
    90	    rows.push("Transfer at: " + stamp(transfer.timestamp));
    91	  }
apps/madbridge/src/tui/components/agent-identity.ts
    53	  const found = state.executions?.find((e) => e.surface === surface);
(lines omitted)
    99	  if (!state.connected) return false;
(lines omitted)
   111	export function writerToken(state: BrokerSnapshot | null, surface: AgentSurface): number | null {
   112	  if (!isActiveWriter(state, surface)) return null;
   113	  return state!.fencingToken;
   114	}
(lines omitted)
   131	  if (!state.connected) return "STREAM ENDED";
apps/madbridge/src/tui/components/IncidentBand.tsx
    49	  const token = state?.fencingToken ?? 0;
    50
    51	  // Truth boundary: a fencing token is only real evidence when one was
    52	  // actually issued (tokens are 1-based). A missing/zero token must never be
    53	  // presented as an issued token that was invalidated — that would fabricate
    54	  // authority history. Render an honest fallback instead.
    55	  const tokenClause = token > 0
    56	    ? "token #" + String(token) + " invalidated"
    57	    : "no issued token to invalidate";
apps/madbridge/src/tui/panes/ClaudePane.tsx
    36	  const tok = writerToken(state, surface);
    37	  const live = livenessWord(state);
    38
    39	  // Build the header line truthfully.
    40	  const headerParts: string{U+005B}{U+005D} = {U+005B}"CLAUDE CODE"{U+005D};
    41	  if (active) headerParts.push("FOCUSED");
    42	  if (writer && tok !== null) {
    43	    headerParts.push("WRITER tok#" + String(tok));
apps/madbridge/src/tui/panes/AntigravityPane.tsx
    38	  const tok = writerToken(state, surface);
    39	  const live = livenessWord(state);
    40
    41	  const headerParts: string{U+005B}{U+005D} = {U+005B}"ANTIGRAVITY"{U+005D};
    42	  if (active) headerParts.push("FOCUSED");
    43	  if (writer && tok !== null) {
    44	    headerParts.push("WRITER tok#" + String(tok));
apps/madbridge/src/tui/components/DockStrip.tsx
    84	  } else if (isActiveWriter(state, surface)) {
    85	    const tok = writerToken(state, surface);
    86	    fields.push("WRITER tok#" + String(tok));
apps/madbridge/src/tui/components/EventLog.tsx
    37	          <text fg={POSEIDON.cobalt}>tok:{entry.fencingToken}</text>
```

051-supervisor.log · e166bae6a7e0942df07a930dcc657491710fd2e7e0c4946c253a3d610b1f93f6

```text
packages/supervisor/src/index.ts
     1	export type { EnvironmentAllowlistV1 } from "./environment";
     2	export {
     3	  buildAllowlistedEnvironment,
     4	  redact,
     5	  MissingRequiredVariableError,
     6	  UnknownEnvironmentAllowlistError,
     7	} from "./environment";
     8
     9	export { runPurePreflight } from "./preflight";
    10	export type { PreflightInput, PreflightFailure, PreflightOk, PreflightResult, LaunchPlan, LaunchExecution } from "./preflight";
    11
    12	export { BUILD_STEPS, runTransactionalBuild, runLiveTransactionalBuild, rollbackBuild } from "./build";
    13	export type {
    14	  BuildAdapterHandle,
    15	  BuildChildResource,
    16	  BuildFailureCode,
    17	  BuildHostResource,
    18	  BuildInput,
    19	  BuildLifelineResource,
    20	  BuildResult,
    21	  BuildStep,
    22	  CreatedBuildResource,
    23	  LiveBuildInput,
    24	  LiveReattestationInput,
    25	  LiveSurfaceAttester,
    26	  LiveReattestationRecord,
    27	  LiveReattestationResult,
    28	  PartialBuildState,
    29	  RollbackOutcome,
    30	} from "./build";
packages/supervisor/src/build.ts
   146	// Use only build-owned literals in ledger and caller-visible detail.
   147	function liveFailureCause(surface: SurfaceId, reported: unknown): string {
   148	  const shared = {U+005B}"auth_failed", "identity_mismatch", "attestation_deadline", "attestation_cancelled",
   149	    "attestation_tool_call", "attestation_round_trips", "attestation_budget_exhausted"{U+005D};
   150	  const specific = surface === "madv-surface"
   151	    ? {U+005B}"endpoint_refused", "provider_error", "identity_unavailable", "model_refused", "domain_unresolved"{U+005D}
   152	    : {U+005B}"attestation_missing", "attestation_malformed", "attestation_duplicate"{U+005D};
   153	  return shared.find(item => item === reported) ?? specific.find(item => item === reported)
   154	    ?? (surface === "madv-surface" ? "identity_mismatch" : "attestation_malformed");
   155	}
(lines omitted)
   317	      for await (const fact of host.handle.facts()) {
(lines omitted)
   460	  const iterator = host.handle.facts(){U+005B}Symbol.asyncIterator{U+005D}();
(lines omitted)
   553	export async function runTransactionalBuild(input: BuildInput): Promise<BuildResult> {
   554	  return executeBuild(publicBuildInput(input), {});
   555	}
   556
   557	export function runLiveTransactionalBuild(input: LiveBuildInput): Promise<BuildResult> {
   558	  return executeBuild(publicBuildInput(input), {}, { signal: input.signal, attesterFor: input.attesterFor });
   559	}
   560
   561	function publicBuildInput(input: BuildInput): BuildInput {
   562	  return input !== null && typeof input === "object"
   563	      ? {
   564	          sessionId: input.sessionId,
   565	          envelope: input.envelope,
   566	          plan: input.plan,
   567	          ...(input.injectFailureAt !== undefined ? { injectFailureAt: input.injectFailureAt } : {}),
   568	        }
   569	      : ({} as BuildInput);
   570	}
(lines omitted)
   638	  const reportFailure = (executionId: string, surface: SurfaceId, reported: unknown) => {
   639	    if (!live || firstFailure) return;
   640	    const cause = liveFailureCause(surface, reported);
   641	    firstFailure = { executionId, surface, cause };
   642	    if (sessionActivatedRow !== null && currentBroker !== null) {
   643	      const reason = cause === "auth_failed" ? "authentication_expired"
   644	        : cause === "provider_error" || cause === "endpoint_refused" ? "adapter_failure" : "identity_mismatch";
   645	      const phase = currentBroker.snapshotProjectionInput().lifecycle.phase;
   646	      if (phase === "active" || phase === "paused") {
   647	        void currentBroker.interrupt(reason, surface + ": " + cause, "high", sources.nextEventId(), null, executionId)
   648	          .catch(() => { for (const host of hosts) host.handle.closeStdin(); });
   649	      }
   650	    }
   651	    if (attesting && sessionActivatedRow === null) {
   652	      // A silent host's fact reader can be parked in next(). Start the normal
   653	      // rollback now so it can settle while the attester closes its reader.
   654	      unwindState = snapshotPartialState();
   655	      void rollbackBuild(unwindState).catch(() => { /* The caller joins this same rollback. */ });
   656	    }
   657	    stopAttesters.abort();
   658	  };
(lines omitted)
   706	  const failAt = (
   707	    step: BuildStep,
   708	    failure: BuildFailureCode,
   709	    executionIds: readonly string{U+005B}{U+005D} = {U+005B}{U+005D},
   710	  ): BuildResult => {
   711	    // Freeze the primary failure before cancelling any other observer.
   712	    const first = firstFailure;
   713	    const detail = first
   714	      ? formatFailureDetail("reattest", "reattestation_failed", {U+005B}first.executionId{U+005D}) +
   715	        " surface=" + first.surface + " cause=" + first.cause
   716	      : formatFailureDetail(step, failure, executionIds);
   717	    if (live) stopAttesters.abort();
   718	    return Object.freeze({
   719	      ok: false as const, failedStep: first ? "reattest" : step,
   720	      failure: first ? "reattestation_failed" : failure, detail, partialState: unwindState ?? snapshotPartialState(),
   721	    });
   722	  };
(lines omitted)
   730	    if (firstFailure) return failAt("reattest", "reattestation_failed");
(lines omitted)
  1032	            if (firstFailure) return failAt(step, "reattestation_failed", currentExecutionIds);
(lines omitted)
  1122	          const { state: beforeState, head: beforeHead } = replayLedgerState(ledger);
  1123	          const beforeSnapshot = await client.getSnapshot();
  1124	          // No await separates this last monitor check from durable activation.
  1125	          if (firstFailure) return failAt("reattest", "reattestation_failed");
```

052-monitors.log · 0951dbd36a595fe1d5c59349536a9f507a4dd5a33dce3142cbdd3329de26d152

```text
packages/adapter-claude-code/src/live.ts
    65	  finish(): Cause | undefined {
    66	    try {
    67	      this.tail += this.decoder.decode();
    68	      if (this.tail.length) return this.event(JSON.parse(this.tail));
    69	    } catch { return "attestation_malformed"; }
    70	  }
(lines omitted)
   154	  async function consume(): Promise<void> {
   155	    try {
   156	      for await (const fact of input.host.handle.facts()) {
   157	        if (failed) break;
   158	        if (!reader.complete && performance.now() >= deadline) { stop("attestation_deadline"); break; }
   159	        if (fact.kind === "output" && fact.bytes) {
   160	          const cause = reader.push(fact.bytes);
   161	          if (cause) stop(cause);
   162	        } else if (fact.kind === "exited" || fact.kind === "drained") {
   163	          stop(reader.finish() ?? "attestation_missing");
   164	        }
   165	        if (failed) break;
   166	      }
   167	      if (!failed) stop(reader.finish() ?? "attestation_missing");
   168	    } catch { stop("attestation_malformed"); }
   169	    finally {
   170	      clearTimeout(timer);
   171	      input.signal.removeEventListener("abort", abort);
   172	      const cause = failed ?? "attestation_missing";
   173	      resolve({ ok: false, surface: "claude-code", cause, reason: cause });
   174	    }
   175	  }
   176	  input.signal.addEventListener("abort", abort, { once: true });
   177	  void consume();
packages/adapter-madv-surface/src/live.ts
    44	    onAttested(version) {
    45	      if (performance.now() >= deadline) { stop("attestation_deadline"); return; }
    46	      clearTimeout(timer);
    47	      ready = true;
    48	      resolve({ ok: true, evidenceKind: "actual_session", provider: input.registration.provider,
    49	        model: input.model, cliVersion: version, sendUserInput });
    50	    },
(lines omitted)
    68	  async function consume(): Promise<void> {
    69	    try {
    70	      for await (const fact of input.host.handle.facts()) {
    71	        if (failure) break;
    72	        if (!ready && performance.now() >= deadline) { stop("attestation_deadline"); break; }
    73	        if (fact.kind === "output" && fact.bytes) inspect(parser.push(fact.bytes));
    74	        if (fact.kind === "exited") {
    75	          const exitCode = fact.code ?? 1;
    76	          const result = parser.finish(exitCode, fact.signal ?? null);
    77	          const detection = detectMadvFailure(input.registration.auth_failure_detection, { kind: "child_exit", exitCode });
    78	          if (detection && !parser.attestationFailure) stop(detection.cause, detection.reason);
    79	          else inspect(result);
    80	          break;
    81	        }
    82	        if (failure) break;
    83	      }
    84	      if (!failure) inspect(parser.finish(0));
    85	    } catch { stop("identity_mismatch", "malformed_stream"); }
    86	    finally {
    87	      closed = true;
    88	      clearTimeout(timer);
    89	      input.signal.removeEventListener("abort", abort);
    90	      if (failure) resolve(failure);
    91	      else if (!ready) resolve({ ok: false, surface: "madv-surface", cause: "identity_unavailable",
    92	        reason: "identity_unavailable", parserReason: "result_missing" });
    93	    }
    94	  }
    95	  input.signal.addEventListener("abort", abort, { once: true });
    96	  void consume();
packages/adapter-madv-surface/src/index.ts
   217	  finish(exitCode: number, signal: string | number | null = null): MadvResult {
   218	    if (!this.finished) {
   219	      try { this.buffer += this.decoder.decode(); } catch { this.fail("identity_mismatch", "malformed_stream"); }
   220	      if (this.buffer.trim()) this.line(this.buffer);
   221	      this.buffer = ""; this.checkDeadline(); this.finished = true;
   222	      if (signal !== null) this.fail("provider_error", "signal");
   223	      switch (exitCode) {
   224	        case 0: break;
   225	        case 5: this.fail("auth_failed", "exit"); break;
   226	        case 6: this.fail("endpoint_refused", "exit"); break;
   227	        case 1: this.fail("provider_error", "exit"); break;
   228	        case 3: this.fail("identity_unavailable", "exit"); break;
   229	        case 7: if (this.failed?.cause !== "domain_unresolved") this.fail("model_refused", "exit"); break;
   230	        case 4: this.fail("identity_mismatch", "exit"); break;
   231	        default: this.fail("provider_error", "unknown_exit");
   232	      }
   233	      if (!this.failed && (this.responses === 0 || this.waitingForEvidence)) this.fail("identity_unavailable", "model_response_missing");
   234	      if (!this.failed && this.context.onAttested && !this.attested) this.fail("identity_unavailable", "result_missing");
   235	      if (!this.failed && this.tools.size !== 0) this.fail("identity_mismatch", "event_order");
   236	    }
   237	    return this.snapshot();
   238	  }
packages/protocol/src/lifecycle-events.ts
    35	/** The twelve interruption reason codes, in specification order. */
    36	export const INTERRUPTION_REASON_CODES = {U+005B}
    37	  "child_failure",
    38	  "adapter_failure",
    39	  "pty_host_failure",
    40	  "host_command_deadline_expired",
    41	  "authentication_expired",
    42	  "identity_mismatch",
    43	  "output_sequence_invariant_failed",
    44	  "snapshot_sequence_invariant_failed",
    45	  "ledger_write_failed",
    46	  "broker_invariant_failed",
    47	  "containment_failed",
    48	  "execution_reported_incident",
    49	{U+005D} as const;
    50
    51	export type InterruptionReasonCodeV1 = typeof INTERRUPTION_REASON_CODES{U+005B}number{U+005D};
packages/broker/src/runtime-broker.ts
   330	  async interrupt(
   331	    reason: InterruptionReasonCodeV1,
   332	    detail: string,
   333	    severity: InterruptionSeverity,
   334	    incidentId: string,
   335	    sourceEventId: string | null,
   336	    reportedBy: string | null,
   337	  ): Promise<void> {
   338	    this.persist(
   339	      this.record(
   340	        "session_interrupted",
   341	        {
   342	          incident_id: incidentId,
   343	          reason: detail,
   344	          severity,
   345	          source_event_id: sourceEventId,
   346	          reported_by_execution_id: reportedBy,
   347	        },
   348	        reason,
   349	      ),
   350	    );
   351	    this.persist(invalidateToken(this.state, "interruption", incidentId, this.fencingContext()));
   352	    const terminal = { closure_kind: "interruption", incident_id: incidentId, reason_code: reason } as const;
   353	    this.persist(this.record("session_closing", terminal, reason));
   354	    await this.deps.terminateGovernedProcesses();
   355	    this.persist(this.record("session_closed", terminal, reason));
   356	  }
(lines omitted)
   364	  async founderClose(commandId: string): Promise<void> {
   365	    const terminal = {
   366	      command_id: commandId,
   367	      authorized_by: "founder",
   368	      closure_kind: "founder",
   369	      incident_id: null,
   370	    } as const;
   371	    this.persist(this.record("session_closing", terminal, null));
   372	    this.persist(invalidateToken(this.state, "founder_close", null, this.fencingContext()));
   373	    await this.deps.terminateGovernedProcesses();
   374	    this.persist(this.record("session_closed", terminal, null));
   375	  }
```

053-composition.log · 874a35195f2d0fc6f9baa379152bba7aef3f441c1acd13be8f2f1c2e8e471599

```text
apps/madbridge/src/tui/live/composition.ts
     1	import type { BrokerClient } from "@madventures/broker";
     2	import { parseTaskEnvelope, type TaskEnvelopeV1 } from "@madventures/protocol";
     3	import { attestClaudeSession } from "@madventures/adapter-claude-code";
     4	import { attestMadvSession } from "../../../../../packages/adapter-madv-surface/src/index";
     5	import { rollbackBuild, runLiveTransactionalBuild, runPurePreflight, type LiveBuildInput,
     6	  type PartialBuildState, type PreflightInput } from "../../../../../packages/supervisor/src/index";
     7	import { settingsSources } from "./settings-sources";
     8
     9	interface Start {
    10	  envelope: TaskEnvelopeV1;
    11	  preflight: Omit<PreflightInput, "envelope" | "settingsSources">;
    12	  workingDirectory: string;
    13	  configFolder: string;
    14	  managedFolder?: string;
    15	  present(client: BrokerClient): void | Promise<void>;
    16	}
    17	type Result = { exitCode: 0; close(): Promise<void> } | { exitCode: 1; component: string; detail: string };
    18
    19	function failed(component: string, detail: string = component): Result {
    20	  return { exitCode: 1, component, detail };
    21	}
    22
    23	// The registered identity and auth probes have both passed when the build
    24	// asks for an attester. Count each subsequent write before sending its frame.
    25	function writeBudget(): () => boolean {
    26	  let calls = 2;
    27	  return () => {
    28	    if (calls >= 3) return false;
    29	    calls++;
    30	    return true;
    31	  };
    32	}
    33
    34	export function createStartAttesters(): LiveBuildInput{U+005B}"attesterFor"{U+005D} {
    35	  const claudeBudget = writeBudget(), madvBudget = writeBudget();
    36	  return surface => {
    37	    if (surface === "claude-code") return input => attestClaudeSession(input, claudeBudget);
    38	    if (surface === "madv-surface") return input => attestMadvSession(input, madvBudget);
    39	    return undefined;
    40	  };
    41	}
    42
    43	async function closeActive(state: PartialBuildState): Promise<void> {
    44	  const phase = (await state.client!.getSnapshot()).phase;
    45	  if (phase === "active" || phase === "paused") await state.broker!.founderClose(crypto.randomUUID());
    46	  for (const host of state.hosts) {
    47	    for await (const _ of host.handle.facts()) { /* Wait for host exit before releasing the ledger. */ }
    48	  }
    49	  for (const adapter of state.adapters) await adapter.disconnect();
    50	  await state.client!.close();
    51	  state.ledger!.close();
    52	}
    53
    54	export async function composeLiveSession(start: Start): Promise<Result> {
    55	  const sources = settingsSources(start.workingDirectory, start.configFolder, start.managedFolder, process.platform);
    56	  if (!sources.ok) return failed(sources.cause);
    57	  let envelope: TaskEnvelopeV1;
    58	  try { envelope = parseTaskEnvelope(structuredClone({ ...start.envelope })); }
    59	  catch { return failed("preflight", "envelope_invalid"); }
    60	  const controller = new AbortController();
    61	  const abort = () => controller.abort();
    62	  const caller = start.preflight.signal;
    63	  caller.addEventListener("abort", abort, { once: true });
    64	  process.once("SIGINT", abort);
    65	  process.once("SIGTERM", abort);
    66	  if (caller.aborted) abort();
    67
    68	  try {
    69	    const preflight = await runPurePreflight({ ...start.preflight, envelope: { ...envelope },
    70	      settingsSources: sources.paths, signal: controller.signal });
    71	    if (!preflight.ok) return failed("preflight", preflight.failure);
    72	    const built = await runLiveTransactionalBuild({ sessionId: crypto.randomUUID(), envelope, plan: preflight.plan,
    73	      signal: controller.signal, attesterFor: createStartAttesters() });
    74	    if (!built.ok) {
    75	      await rollbackBuild(built.partialState);
    76	      return failed(built.failedStep, built.detail);
    77	    }
    78	    let closing: Promise<void> | undefined;
    79	    const close = () => closing ??= closeActive(built.state);
    80	    if (!built.state.client || built.snapshot.phase !== "active") {
    81	      await close();
    82	      return failed("activate");
    83	    }
    84	    try { await start.present(built.state.client); }
    85	    catch { await close(); return failed("present"); }
    86	    return { exitCode: 0, close };
    87	  } finally {
    88	    caller.removeEventListener("abort", abort);
    89	    process.removeListener("SIGINT", abort);
    90	    process.removeListener("SIGTERM", abort);
    91	  }
    92	}
```

054-separation-scans.log · 1a6ae3751ea9b30dddae74181d52f902e32dc813ddef02f24830531c3fc6f0f9

```text
test/phase3a/harness-separation.test.ts
    16	const ROUTER_IMPORTER = "apps/madbridge/test/pty-focus.test.tsx";
(lines omitted)
    20	// Drift requires review; these are expression exceptions, never file exclusions.
    21	const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> = {
    22	  {U+005B}ROUTER_IMPORTER{U+005D}: { sha256: "2faefe54d7c9be2051bce621629203072515263d58bc69b31bd2fe927faedb01" },
    23	  "packages/protocol/src/adapter-registry.ts": {
    24	    sha256: "6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4", call: "source{U+005B}Symbol.iterator{U+005D}()",
    25	  },
    26	  "packages/protocol/src/lifecycle-events.ts": {
    27	    sha256: "9210012a505848a7379ab7b9cf9d840f33197de58f85b23c359653760479c603", call: "PAYLOAD_SHAPE{U+005B}knownType{U+005D}(payload)",
    28	  },
    29	  "packages/supervisor/src/build.ts": {
    30	    sha256: "50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d", call: "host.handle.facts(){U+005B}Symbol.asyncIterator{U+005D}()",
    31	  },
    32	};
apps/madbridge/test/tui-writers-stage.test.tsx
   968	describe("12. No new timer, animation, or timeline imports exist under src/tui/", () => {
   969	  function listSourceFiles(dir: string): string{U+005B}{U+005D} {
   970	    if (!existsSync(dir)) return {U+005B}{U+005D};
   971	    const results: string{U+005B}{U+005D} = {U+005B}{U+005D};
   972	    for (const entry of readdirSync(dir, { withFileTypes: true })) {
   973	      const fullPath = join(dir, entry.name);
   974	      if (entry.isDirectory()) {
   975	        results.push(...listSourceFiles(fullPath));
   976	      } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
   977	        results.push(fullPath);
   978	      }
   979	    }
   980	    return results;
   981	  }
   982
   983	  test("no setTimeout/setInterval/requestAnimationFrame/spinner imports", () => {
   984	    const tuiDir = join(process.cwd(), "apps/madbridge/src/tui");
   985	    const files = listSourceFiles(tuiDir);
   986	    expect(files.length).toBeGreaterThan(0);
   987
   988	    const forbidden = {U+005B}
   989	      /\bsetTimeout\b/,
   990	      /\bsetInterval\b/,
   991	      /\brequestAnimationFrame\b/,
   992	      /\bclearTimeout\b/,
   993	      /\bclearInterval\b/,
   994	      // Animation/spinner libraries
   995	      /from\s+{U+005B}"'{U+005D}.*spinner/i,
   996	      /from\s+{U+005B}"'{U+005D}.*animate/i,
   997	      /from\s+{U+005B}"'{U+005D}.*marquee/i,
   998	    {U+005D};
   999
  1000	    for (const file of files) {
  1001	      const source = readFileSync(file, "utf8");
  1002	      for (const pattern of forbidden) {
  1003	        if (pattern.test(source)) {
  1004	          // tslint:disable-next-line: no-console
  1005	          throw new Error(`Forbidden pattern ${String(pattern)} found in ${file}`);
  1006	        }
  1007	      }
  1008	    }
  1009	  });
  1010	});
apps/madbridge/test/tui-governance-surfaces.test.tsx
   974	  test("43. No timer, animation, spinner, or timeline mechanism is introduced", () => {
   975	    // Re-use the Phase 1 static-source scan. This test fails if any forbidden
   976	    // timer/animation mechanism is added under src/tui/.
   977	    const { existsSync, readFileSync, readdirSync } = require("node:fs");
   978	    const { join } = require("node:path");
   979	    function listSourceFiles(dir: string): string{U+005B}{U+005D} {
   980	      if (!existsSync(dir)) return {U+005B}{U+005D};
   981	      const results: string{U+005B}{U+005D} = {U+005B}{U+005D};
   982	      for (const entry of readdirSync(dir, { withFileTypes: true })) {
   983	        const fullPath = join(dir, entry.name);
   984	        if (entry.isDirectory()) {
   985	          results.push(...listSourceFiles(fullPath));
   986	        } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
   987	          results.push(fullPath);
   988	        }
   989	      }
   990	      return results;
   991	    }
   992	    const tuiDir = join(process.cwd(), "apps/madbridge/src/tui");
   993	    const files = listSourceFiles(tuiDir);
   994	    expect(files.length).toBeGreaterThan(0);
   995	    const forbidden = {U+005B}
   996	      /\bsetTimeout\b/,
   997	      /\bsetInterval\b/,
   998	      /\brequestAnimationFrame\b/,
   999	      /\bclearTimeout\b/,
  1000	      /\bclearInterval\b/,
  1001	      /from\s+{U+005B}"'{U+005D}.*spinner/i,
  1002	      /from\s+{U+005B}"'{U+005D}.*animate/i,
  1003	      /from\s+{U+005B}"'{U+005D}.*marquee/i,
  1004	    {U+005D};
  1005	    for (const file of files) {
  1006	      const source = readFileSync(file, "utf8");
  1007	      for (const pattern of forbidden) {
  1008	        if (pattern.test(source)) {
  1009	          throw new Error(`Forbidden pattern ${String(pattern)} found in ${file}`);
  1010	        }
  1011	      }
  1012	    }
  1013	  });
test/phase3a/architecture-phase3a.test.ts
   541	function findRegisteredSurfaceCollectionsInSource(sourceText: string, fileName: string): number{U+005B}{U+005D} {
   542	  const sourceFile = ts.createSourceFile(
   543	    fileName,
   544	    sourceText,
   545	    ts.ScriptTarget.Latest,
   546	    /* setParentNodes */ true,
   547	    scriptKindFor(fileName),
   548	  );
   549	  const lineNumbers: number{U+005B}{U+005D} = {U+005B}{U+005D};
   550
   551	  const visit = (node: ts.Node): void => {
   552	    const elements =
   553	      mapInitializerKeyElements(node) ??
   554	      collectionInitializerElements(node) ??
   555	      mutableCollectionWriteArguments(node);
   556	    if (elements) {
   557	      const carriesRegisteredSurface = elements.some((el) => {
   558	        const unwrapped = unwrapTransparentExpression(el);
   559	        return (
   560	          ts.isStringLiteralLike(unwrapped) &&
   561	          REGISTERED_SURFACE_IDS.has((unwrapped as ts.StringLiteralLike).text)
   562	        );
   563	      });
   564	      if (carriesRegisteredSurface) {
   565	        const start = node.getStart(sourceFile);
   566	        lineNumbers.push(sourceFile.getLineAndCharacterOfPosition(start).line + 1);
   567	      }
   568	    }
   569	    node.forEachChild(visit);
   570	  };
   571	  visit(sourceFile);
   572	  return lineNumbers;
   573	}
   574
   575	/**
   576	 * Scan production source under a repository root for surface-admission
   577	 * collections outside the sanctioned adapter registry, excluding the
   578	 * untouched packages/policy/ package. Detection is the union of two
   579	 * strategies: the legacy identifier-name pattern (KNOWN_SURFACES,
   580	 * allowedSurfaces, SUPPORTED_SURFACES) and syntax-aware detection of any
   581	 * collection carrying a registered SurfaceId value — by initializer or by
   582	 * mutable write — whatever its name. Fails closed if packages/ or apps/ is
   583	 * absent.
   584	 */
   585	function scanAdmissionSources(root: string): AdmissionViolation{U+005B}{U+005D} {
   586	  if (!existsSync(join(root, "packages")) || !existsSync(join(root, "apps"))) {
   587	    throw new Error(
   588	      `Phase 3A admission-source scan: required packages/ and apps/ roots not found under ${root}`,
   589	    );
   590	  }
   591	  const violations: AdmissionViolation{U+005B}{U+005D} = {U+005B}{U+005D};
   592	  for (const file of enumerateProductionFiles(root)) {
   593	    const rel = toPortablePath(relative(root, file));
   594	    if (rel === ADAPTER_REGISTRY_PATH) continue;
   595	    if (rel.startsWith("packages/policy/")) continue;
   596
   597	    const sourceText = readFileSync(file, "utf8");
   598	    const lines = sourceText.split(/\r?\n/);
   599	    const flaggedLines = new Set<number>();
   600	    lines.forEach((lineText, idx) => {
   601	      if (ADMISSION_LIST_PATTERN.test(lineText)) {
   602	        flaggedLines.add(idx + 1);
   603	      }
   604	    });
   605	    for (const lineNumber of findRegisteredSurfaceCollectionsInSource(sourceText, rel)) {
   606	      flaggedLines.add(lineNumber);
   607	    }
   608
   609	    for (const lineNumber of {U+005B}...flaggedLines{U+005D}.sort((a, b) => a - b)) {
   610	      violations.push({ file: rel, line: lineNumber, text: lines{U+005B}lineNumber - 1{U+005D}!.trim() });
   611	    }
   612	  }
   613	  return violations.sort((a, b) =>
   614	    a.file === b.file ? a.line - b.line : a.file < b.file ? -1 : 1,
   615	  );
   616	}
   617
   618	describe("Phase 3A admission authority", () => {
   619	  test("adapter-registry.ts is the only production admission source", () => {
   620	    const violations = scanAdmissionSources(REPO_ROOT);
   621	    expect(violations.map(reportAdmission)).toEqual({U+005B}{U+005D});
   622	  });
(lines omitted)
  1780	describe("Task 34: no broker.sock path is reachable", () => {
  1781	  // 15s test budget: the plan's 5,000 ms deadline belongs to EACH child,
  1782	  // and this test launches two children in sequence (CLI + TUI).
  1783	  test("launching every production entry point in bounded isolated processes creates no broker.sock", async () => {
  1784	    // ── CLI path: `start --json` must fail closed with the exact gate body.
  1785	    await runEntryPath({
  1786	      args: {U+005B}"apps/madbridge/src/cli.ts", "start", "--json"{U+005D},
  1787	      assertOutcome: assertCliOutcome,
  1788	    });
  1789
  1790	    // ── TUI path (default production form, no --fixture): readiness is the
  1791	    // StatusBar's honest disconnected word. DEVIATION FROM PLAN LITERAL
  1792	    // (disclosed): Step 1 names wide-form "NOT CONNECTED"; at this base the
  1793	    // piped renderer emits the medium-format token "NOCONN" (same fact,
  1794	    // same buildStatusLine path), empirically probed at the task base.
  1795	    // The TUI is terminated by the runner (SIGTERM/SIGKILL discipline);
  1796	    // those are expected cleanup outcomes, not unexpected signals.
  1797	    await runEntryPath({
  1798	      args: {U+005B}"apps/madbridge/src/tui/main.tsx"{U+005D},
  1799	      readiness: (out) => out.includes("NOCONN"),
  1800	      assertOutcome: (r) => expect(tuiPathFailures(r)).toEqual({U+005B}{U+005D}),
  1801	    });
  1802	  }, 15_000);
(lines omitted)
  2562	  test("merge gate item 15: no production or harness path creates broker.sock", async () => {
  2563	    // The dormant socket module, the only code that binds broker.sock, has
  2564	    // no production or harness importer.
  2565	    expect(findModuleSpecifierImporters(REPO_ROOT, "socket")).toEqual({U+005B}"packages/broker/test/socket.test.ts"{U+005D});
  2566
  2567	    // Both production entry points, in bounded isolated processes, create no
  2568	    // broker.sock at the legacy path or under MADV_RUNTIME_DIR.
  2569	    await runEntryPath({ args: {U+005B}CLI_ENTRY, "start", "--json"{U+005D}, assertOutcome: assertCliOutcome });
  2570	    await runEntryPath({
  2571	      args: {U+005B}"apps/madbridge/src/tui/main.tsx"{U+005D},
  2572	      readiness: TUI_READY,
  2573	      assertOutcome: (r) => expect(tuiPathFailures(r)).toEqual({U+005B}{U+005D}),
  2574	    });
  2575
  2576	    // A fixture session through the test-only harness creates none under its
  2577	    // own storage, the legacy root or the worktree, while active or after close.
  2578	    const sockets = (fixtureRoot: string): string{U+005B}{U+005D} =>
  2579	      {U+005B}fixtureRoot, dirname(LEGACY_SOCKET), REPO_ROOT{U+005D}.flatMap((root) => {
  2580	        const result = sweep(root);
  2581	        expect(result.errors, "broker.sock sweep errors under " + root).toEqual({U+005B}{U+005D});
  2582	        return result.matches;
  2583	      });
  2584	    const session = await mergeGateHarness.startFixtureSession();
  2585	    const fixtureRoot = dirname(session.storage.root);
  2586	    let whileActive: string{U+005B}{U+005D} = {U+005B}{U+005D};
  2587	    try {
  2588	      expect((await session.client.getSnapshot()).phase).toBe("active");
  2589	      whileActive = sockets(fixtureRoot);
  2590	    } finally {
  2591	      await session.close();
  2592	    }
  2593	    expect({ whileActive, afterClose: sockets(fixtureRoot), fixtureRootRemoved: !existsSync(fixtureRoot) }).toEqual({
  2594	      whileActive: {U+005B}{U+005D},
  2595	      afterClose: {U+005B}{U+005D},
  2596	      fixtureRootRemoved: true,
  2597	    });
  2598	  }, 30_000);
test/phase3b/separation.test.ts
     1	import { expect, test } from "bun:test";
     2	import { readdirSync, readFileSync } from "node:fs";
     3	import { join } from "node:path";
     4	import ts from "typescript";
     5	import { runTransactionalBuild } from "../../packages/supervisor/src/index";
     6	import { closeOfflineBuild, offlineStart } from "./offline";
     7
     8	const apps = join(import.meta.dir, "../../apps");
     9	const seams = new Set({U+005B}"runTransactionalBuildWithDependencies", "runPurePreflightWithDependencies"{U+005D});
    10	const internalModule = /(?:^|\/)supervisor\/src\/(?:build|preflight)(?:\.{U+005B}cm{U+005D}?{U+005B}jt{U+005D}s)?$/;
    11
    12	function* appSources(directory: string): Generator<string> {
    13	  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    14	    const path = join(directory, entry.name);
    15	    if (entry.isDirectory() && entry.name !== "node_modules") yield* appSources(path);
    16	    if (entry.isFile() && /\.{U+005B}cm{U+005D}?{U+005B}jt{U+005D}sx?$/.test(entry.name)) yield path;
    17	  }
    18	}
    19
    20	function usesSeam(node: ts.Node): boolean {
    21	  if (ts.isImportSpecifier(node) || ts.isExportSpecifier(node)) {
    22	    return seams.has((node.propertyName ?? node.name).text);
    23	  }
    24	  if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)
    25	      && internalModule.test(node.moduleSpecifier.text) && node.importClause?.namedBindings
    26	      && ts.isNamespaceImport(node.importClause.namedBindings)) return true;
    27	  if (ts.isExportDeclaration(node) && !node.exportClause && node.moduleSpecifier
    28	      && ts.isStringLiteral(node.moduleSpecifier) && internalModule.test(node.moduleSpecifier.text)) return true;
    29	  if (ts.isPropertyAccessExpression(node) && seams.has(node.name.text)) return true;
    30	  if (ts.isElementAccessExpression(node) && ts.isStringLiteral(node.argumentExpression)
    31	      && seams.has(node.argumentExpression.text)) return true;
    32	  if (ts.isBindingElement(node)) {
    33	    const key = node.propertyName ?? node.name;
    34	    if ((ts.isIdentifier(key) || ts.isStringLiteral(key)) && seams.has(key.text)) return true;
    35	  }
    36	  return ts.forEachChild(node, child => usesSeam(child) || undefined) === true;
    37	}
    38
    39	test("application code imports neither internal supervisor seam", () => {
    40	  const imports: string{U+005B}{U+005D} = {U+005B}{U+005D};
    41	  for (const path of appSources(apps)) {
    42	    const text = readFileSync(path, "utf8");
    43	    if (!text.includes("WithDependencies") && !text.includes("supervisor/src/")) continue;
    44	    if (usesSeam(ts.createSourceFile(path, text, ts.ScriptTarget.Latest))) imports.push(path);
    45	  }
    46	  expect(imports).toEqual({U+005B}{U+005D});
    47	});
    48
    49	test("the original public build still fails closed without an attester", async () => {
    50	  const fixture = offlineStart();
    51	  try {
    52	    const result = await runTransactionalBuild({
    53	      sessionId: "offline-no-attester", envelope: fixture.envelope, plan: fixture.plan,
    54	    });
    55	    try {
    56	      expect(result.ok).toBe(false);
    57	      if (!result.ok) {
    58	        expect(result.failedStep).toBe("reattest");
    59	        expect(result.failure).toBe("reattestation_failed");
    60	        expect(result.detail).toBe("step=reattest execution=builder failure=reattestation_failed");
    61	        expect(result.partialState.completedSteps).not.toContain("activate");
    62	      }
    63	    } finally { await closeOfflineBuild(result); }
    64	  } finally { fixture.dispose(); }
    65	}, 15000);
```

055-existing-tests.log · 050ffde93f8aef58155d3ab9023a42063bf92106c2b4b8c23f2d05ca377ee5da

```text
packages/supervisor/test/build-rollback.test.ts
   593	  // B3 & D3: Package index exports BUILD_STEPS and runTransactionalBuild(input) with only
   594	  // { sessionId, envelope, plan, injectFailureAt? }, and exports no dependency-injection function.
   595	  const indexKeys = Object.keys(supervisorIndex);
   596	  expect(indexKeys).toContain("BUILD_STEPS");
   597	  expect(indexKeys).toContain("runTransactionalBuild");
   598	  expect(indexKeys).not.toContain("runTransactionalBuildWithDependencies");
   599	  expect(indexKeys).not.toContain("runPurePreflightWithDependencies");
   600	  for (const key of indexKeys) {
   601	    expect(key).not.toMatch(/WithDependencies/);
   602	  }
packages/adapter-madv-surface/test/live.test.ts
    37	test("madv encodes no_tools only on the attestation message", async () => {
    38	  const message = "synthetic";
    39	  expect(encodeUserInput(message)).toBe('{"type":"user","message":{"role":"user","content":"synthetic"}}\n');
    40	  expect(encodeAttestationInput(message)).toBe('{"type":"user","message":{"role":"user","content":"synthetic"},"no_tools":true}\n');
    41	  const { wire, verdict } = start();
    42	  expect(wire.opened).toBe(1);
    43	  expect(wire.writes).toEqual({U+005B}'{"type":"user","message":{"role":"user","content":"Reply with your model identifier and nothing else."},"no_tools":true}\n'{U+005D});
    44	  wire.events(...approved);
    45	  const answer = await verdict;
    46	  expect(answer.ok).toBe(true);
    47	  if (answer.ok) expect(answer.sendUserInput(message)).toBe(true);
    48	  expect(wire.writes{U+005B}1{U+005D}).toBe(encodeUserInput(message));
    49	  wire.events(response, assistant, result);
    50	  wire.end();
    51	  while (!wire.closed) await Bun.sleep(1);
    52	  expect(wire.failures).toEqual({U+005B}{U+005D});
    53	});
test/phase3a/runtime-harness.ts
   318	  // A private disposable home child also satisfies the shared-/tmp exclusion on Linux.
   319	  const root = mkdtempSync(join(realpathSync(user.homedir), ".madbridge-task48-"));
(lines omitted)
   682	      if (options.processScenario === "lifeline-eof" || options.processScenario === "host-exit") {
   683	        if (options.processScenario === "host-exit") {
   684	          faultWork = (async () => {
   685	            for await (const _ of state!.hosts{U+005B}0{U+005D}!.handle.facts()) { /* observe the actual host stream ending */ }
   686	            clearTimeout(faultTimer);
   687	            if (closing === undefined) await interrupt("pty_host_failure");
   688	          })();
   689	          void faultWork.catch(() => {}); // close propagates monitoring failures after cleanup.
   690	        }
```

064-reader-lines.log · d2e7f11912de76a45d6f564c49540a0a41e9595cbbc347f865e4ad6c82ae7f0a

```text
HEAD:apps/madbridge/src/tui/App.tsx:132:  const { state, connected } = useBrokerState(subscribe);
HEAD:apps/madbridge/src/tui/App.tsx:488:      <StatusBar state={state} connected={connected} focus={ui.focus} seat={ui.seat} />
HEAD:apps/madbridge/src/tui/components/DockStrip.tsx:57:// disconnected) and is rendered at priority 3 so the user always sees the
HEAD:apps/madbridge/src/tui/components/DockStrip.tsx:58:// disconnected word before role/model.
HEAD:apps/madbridge/src/tui/components/DockStrip.tsx:80:    // No current-writer claim while not live (disconnected, interrupted,
HEAD:apps/madbridge/src/tui/components/EventLog.tsx:37:          <text fg={POSEIDON.cobalt}>tok:{entry.fencingToken}</text>
HEAD:apps/madbridge/src/tui/components/IncidentBand.tsx:49:  const token = state?.fencingToken ?? 0;
HEAD:apps/madbridge/src/tui/components/ModelBar.tsx:7://   - It is NOT a claim about what any broker-connected agent is running —
HEAD:apps/madbridge/src/tui/components/RoomStatusBand.tsx:40:      {projection.executions.map((execution) => (
HEAD:apps/madbridge/src/tui/components/StatusBar.tsx:30:  connected: boolean;
HEAD:apps/madbridge/src/tui/components/StatusBar.tsx:39:export function StatusBar({ state, connected, focus, seat, widthOverride }: Props) {
HEAD:apps/madbridge/src/tui/components/StatusBar.tsx:44:    connected,
HEAD:apps/madbridge/src/tui/components/StatusBar.tsx:71:  connected: boolean;
HEAD:apps/madbridge/src/tui/components/StatusBar.tsx:106:  const connToken = input.connected ? "CONNECTED" : "NOT CONNECTED";
HEAD:apps/madbridge/src/tui/components/StatusBar.tsx:132:  const connCompact = input.connected ? "CONN" : "NOCONN";
HEAD:apps/madbridge/src/tui/components/StatusBar.tsx:338: * Fencing tokens are 1-based. When fencingToken <= 0, no token has been
HEAD:apps/madbridge/src/tui/components/StatusBar.tsx:348:  const o = state.ownershipState;
HEAD:apps/madbridge/src/tui/components/StatusBar.tsx:350:  const tok = state.fencingToken;
HEAD:apps/madbridge/src/tui/components/agent-identity.ts:53:  const found = state.executions?.find((e) => e.surface === surface);
HEAD:apps/madbridge/src/tui/components/agent-identity.ts:83: * Truthfulness: a writer claim is only valid while the session is connected
HEAD:apps/madbridge/src/tui/components/agent-identity.ts:85: *   - `connected === false` → no current writer (retained data is historical)
HEAD:apps/madbridge/src/tui/components/agent-identity.ts:99:  if (!state.connected) return false;
HEAD:apps/madbridge/src/tui/components/agent-identity.ts:113:  return state!.fencingToken;
HEAD:apps/madbridge/src/tui/components/agent-identity.ts:119: * - connected AND active AND no incident → "LIVE"
HEAD:apps/madbridge/src/tui/components/agent-identity.ts:122: * - connected === false                  → "STREAM ENDED"
HEAD:apps/madbridge/src/tui/components/agent-identity.ts:131:  if (!state.connected) return "STREAM ENDED";
HEAD:apps/madbridge/src/tui/hooks/useBrokerState.ts:12:  readonly connected: boolean;
HEAD:apps/madbridge/src/tui/hooks/useBrokerState.ts:24:  const {U+005B}connected, setConnected{U+005D} = useState(false);
HEAD:apps/madbridge/src/tui/hooks/useBrokerState.ts:35:      setConnected(snapshot.connected);
HEAD:apps/madbridge/src/tui/hooks/useBrokerState.ts:55:  return { state, connected, subscribe };
HEAD:apps/madbridge/src/tui/hooks/useSeatState.ts:12://     is NOT a claim about what any broker-connected agent is running (the
HEAD:apps/madbridge/src/tui/main.tsx:59:    executions: {U+005B}claude, antigravity{U+005D},
HEAD:apps/madbridge/src/tui/main.tsx:82:    connected: true,
HEAD:apps/madbridge/src/tui/main.tsx:84:    ownershipState: "owned",
HEAD:apps/madbridge/src/tui/main.tsx:86:    fencingToken: 3,
HEAD:apps/madbridge/src/tui/main.tsx:88:    executions: {U+005B}claude, antigravity{U+005D},
HEAD:apps/madbridge/src/tui/main.tsx:91:    pendingTransfers: {U+005B}{U+005D},
HEAD:apps/madbridge/src/tui/main.tsx:92:    permissionSummary: {
HEAD:apps/madbridge/src/tui/main.tsx:113:        fencingToken: 1,
HEAD:apps/madbridge/src/tui/main.tsx:121:        fencingToken: 1,
HEAD:apps/madbridge/src/tui/main.tsx:129:        fencingToken: 3,
HEAD:apps/madbridge/src/tui/main.tsx:134:    queueDepth: 0,
HEAD:apps/madbridge/src/tui/panes/AntigravityPane.tsx:46:    // No current-writer claim while not live (disconnected, interrupted,
HEAD:apps/madbridge/src/tui/panes/ClaudePane.tsx:45:    // No current-writer claim while not live (disconnected, interrupted,
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:7://   - Disconnected shows "GOVERNANCE | NOT CONNECTED" and does not project
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:51:  if (!state || !state.connected) {
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:61:  const cl = state.executions?.find((e) => e.surface === "claude-code");
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:62:  const agy = state.executions?.find((e) => e.surface === "antigravity");
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:63:  const perms = state.permissionSummary;
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:66:  const transfer = state.pendingTransfers?.{U+005B}0{U+005D} ?? null;
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:82:  rows.push("Writer: " + (state.activeWriter ?? "—") + " | Token: " + String(state.fencingToken) + " | Ownership: " + state.ownershipState);
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:85:  rows.push("Transfer phase: " + (state.transferPhase ?? "none") + " | Pending transfers: " + String(state.pendingTransfers?.length ?? 0));
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:87:    rows.push("Transfer: " + transfer.from + " → " + transfer.to + " | tok#" + String(transfer.fencingToken) + " | " + transfer.reason);
HEAD:apps/madbridge/src/tui/room/client.ts:201:    if (this.socket !== null) throw new RoomAttachError("already_connected", "connect() called twice");
HEAD:apps/madbridge/src/tui/room/client.ts:372:      return Promise.reject(new RoomAttachError("not_connected", "connect() before requesting"));
HEAD:apps/madbridge/src/tui/room/projection.ts:77:  readonly executions: readonly RoomExecutionFact{U+005B}{U+005D};
HEAD:apps/madbridge/src/tui/room/projection.ts:100:    executions: snapshot.executions,
HEAD:apps/madbridge/src/tui/room/projection.ts:106:  return snapshot.executions.some((execution) => execution.state === "RUNNING");
HEAD:apps/madbridge/src/tui/room/projection.ts:110:  return snapshot.executions.some((execution) => execution.state === "EXITED" || execution.state === "FAILED_CLOSED");
HEAD:apps/madbridge/src/tui/types.ts:94:  readonly connected: boolean;
HEAD:apps/madbridge/src/tui/types.ts:103:  readonly ownershipState:
HEAD:apps/madbridge/src/tui/types.ts:111:  readonly fencingToken: number;
HEAD:apps/madbridge/src/tui/types.ts:113:  readonly executions: readonly ExecutionIdentity{U+005B}{U+005D};
HEAD:apps/madbridge/src/tui/types.ts:116:  readonly pendingTransfers: readonly PendingTransfer{U+005B}{U+005D};
HEAD:apps/madbridge/src/tui/types.ts:117:  readonly permissionSummary: PermissionSummary;
HEAD:apps/madbridge/src/tui/types.ts:123:  readonly queueDepth: number;
HEAD:apps/madbridge/src/tui/types.ts:142:  readonly fencingToken: number;
HEAD:apps/madbridge/src/tui/types.ts:179:  readonly fencingToken: number;
```

4. The following import inventory includes relative imports resolved from their source directories. No application code outside the live directory imports the supervisor or calls the composition. The final two hashes verify the build.ts and pty-focus.test.tsx pins.

077-imports-at-base.log · 825f0aef19473118e44934a836df3381e0f0532c47031252032ddf62f0af5b0f

```text
apps/madbridge/src/tui/live/composition.ts:6: type PartialBuildState, type PreflightInput } from "../../../../../packages/supervisor/src/index";
apps/madbridge/src/tui/live/composition.ts:7: import { settingsSources } from "./settings-sources";
apps/madbridge/src/tui/live/settings-sources.ts:3: import { managedSettingsDirectory } from "./managed-settings";
packages/supervisor/test/build-rollback.test.ts:34: import * as supervisorIndex from "../src/index";
packages/supervisor/test/live-port.test.ts:2: import { runLiveTransactionalBuild, type LiveReattestationInput } from "../src/index";
test/phase3b/offline.ts:5: import { rollbackBuild, type BuildResult, type LaunchPlan } from "../../packages/supervisor/src/index";
test/phase3b/preflight-input.ts:5: import type { PreflightInput } from "../../packages/supervisor/src/index";
test/phase3b/scenarios.ts:4: import { composeLiveSession, createStartAttesters } from "../../apps/madbridge/src/tui/live/composition";
test/phase3b/scenarios.ts:5: import { runPurePreflight, runLiveTransactionalBuild } from "../../packages/supervisor/src/index";
test/phase3b/separation.test.ts:5: import { runTransactionalBuild } from "../../packages/supervisor/src/index";
test/phase3b/settings-sources.test.ts:4: import { managedSettingsDirectory } from "../../apps/madbridge/src/tui/live/managed-settings";
test/phase3b/settings-sources.test.ts:5: import { settingsSources } from "../../apps/madbridge/src/tui/live/settings-sources";
HEAD:apps/madbridge/src/tui/live/composition.ts:54:export async function composeLiveSession(start: Start): Promise<Result> {
HEAD:test/phase3b/scenarios.ts:4:import { composeLiveSession, createStartAttesters } from "../../apps/madbridge/src/tui/live/composition";
HEAD:test/phase3b/scenarios.ts:58:      outcome = await composeLiveSession({ envelope: f.envelope, preflight: { ...f.input, signal: controller.signal },
HEAD:test/phase3b/scenarios.ts:124:    const starting = composeLiveSession({
50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d  -
2faefe54d7c9be2051bce621629203072515263d58bc69b31bd2fe927faedb01  -
Darwin arm64
a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock
```

5. The host reported Darwin arm64. The Bun runtime checks follow.

007-runtime.log · 41a8d908b63d68298ae92171a43c21f718e2625c92234db7aac6d750a9bf51fb

```text
Thu Nov 26 03:49:54 UTC 2026
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
Thu Nov 26 03:49:54 UTC 2026
```

079-baseline-runtime.log · fd3e50fb92bc6e959e792f4d30d6f381eb6e60885c96fc1ecbe41d6724f214bd

```text
Thu Nov 26 04:30:17 UTC 2026
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
Thu Nov 26 04:30:17 UTC 2026
```

083-baseline-suite-runtime.log · f19afc9afa8084b72b01fe555f241fc5f2fe827c1409adafd79e1f1e335df7f8

```text
Thu Nov 26 04:36:03 UTC 2026
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
Thu Nov 26 04:36:03 UTC 2026
```

6. Baseline measurements follow. The frozen install restored dependencies. Its sole tracked mode change was restored after a blob-identity check in log 081. The lockfile had SHA-256 a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830 both before and after install. The worktree was clean and the compiler emitted no diagnostics.

080-baseline-install.log · dfff58d8e669af6ddb43bb7585517432ec325ac4b2b558ce8e850d296eb4652f

```text
Thu Nov 26 04:31:56 UTC 2026
bun install v1.4.2 (744846f84)

+ @types/bun@1.4.2
+ @types/react@19.3.0
+ @types/react-test-renderer@19.3.0
+ react-test-renderer@19.3.0
+ @opentui/core@0.5.11
+ @opentui/react@0.5.11
+ react@19.3.0
+ typescript@5.9.3

51 packages installed {U+005B}155.00ms{U+005D}
Thu Nov 26 04:31:56 UTC 2026
```

082-baseline-tsc.log · 98de6eca7f8645dc86596d7107a79a973a2301fc903fa5116d1f1bb63ba3ae5a

```text
Thu Nov 26 04:34:01 UTC 2026
Thu Nov 26 04:34:04 UTC 2026
```

084-baseline-load.log · 7c4a9a92625a22a6ea7d89505faf4b48f26452bb3df3002191a151e707778a98

```text
23:36  1 user, load averages: 2.98 3.75 3.54
23:36  1 user, load averages: 2.46 3.57 3.48
23:37  1 user, load averages: 2.46 3.45 3.44
23:37  1 user, load averages: 2.03 3.25 3.37
23:38  1 user, load averages: 1.81 3.08 3.30
```

094-baseline-suite.log · 192ad8a8e6e530f6da923a659d6c35709f0249fb262bb9e4d607c44dd08d03be

```text
Thu Nov 26 04:40:54 UTC 2026
(lines omitted)
 2089 pass
 0 fail
 28015 expect() calls
Ran 2089 tests across 160 files. {U+005B}253.87s{U+005D}
Thu Nov 26 04:45:08 UTC 2026
```

Base test list, file, full Bun name and result, with timings omitted: 099-base-list.log · 2a81b900ac0c3c678c6a7beb4b064e95e6794400e7b28aa92ee24359a8d88a3b.

3. Baseline

Frozen install, type check and bare suite all passed. Log 084 is the suite’s release wait and log 099 is its individual verdict list. The lock was byte-identical before and after install. The executable mode restoration appears in log 081.

079-baseline-runtime.log · fd3e50fb92bc6e959e792f4d30d6f381eb6e60885c96fc1ecbe41d6724f214bd · Thu Nov 26 04:30:17 UTC 2026 to Thu Nov 26 04:30:17 UTC 2026 · 23:30  up 4 days, 14:57, 1 user, load averages: 2.42 3.05 3.20 · exit 0

080-baseline-install.log · dfff58d8e669af6ddb43bb7585517432ec325ac4b2b558ce8e850d296eb4652f · Thu Nov 26 04:31:56 UTC 2026 to Thu Nov 26 04:31:56 UTC 2026 · 23:31  up 4 days, 14:59, 1 user, load averages: 2.97 3.30 3.30 · exit 0

081-baseline-worktree.log · d164eb9d12124a70b3004928ae36457d7cfcefe8b922f454d8d2b5201831c84c · see uptime to see uptime · 23:32  1 user, load averages: 2.68 3.22 3.27 · exit 0

082-baseline-tsc.log · 98de6eca7f8645dc86596d7107a79a973a2301fc903fa5116d1f1bb63ba3ae5a · Thu Nov 26 04:34:01 UTC 2026 to Thu Nov 26 04:34:04 UTC 2026 · 23:34  up 4 days, 15:01, 1 user, load averages: 6.78 4.29 3.66 · exit 0

083-baseline-suite-runtime.log · f19afc9afa8084b72b01fe555f241fc5f2fe827c1409adafd79e1f1e335df7f8 · Thu Nov 26 04:36:03 UTC 2026 to Thu Nov 26 04:36:03 UTC 2026 · 23:36  up 4 days, 15:03, 1 user, load averages: 3.24 3.82 3.56 · exit 0

084-baseline-load.log · 7c4a9a92625a22a6ea7d89505faf4b48f26452bb3df3002191a151e707778a98 · see uptime to see uptime · 23:36  1 user, load averages: 2.98 3.75 3.54 · exit 0

094-baseline-suite.log · 192ad8a8e6e530f6da923a659d6c35709f0249fb262bb9e4d607c44dd08d03be · Thu Nov 26 04:40:54 UTC 2026 to Thu Nov 26 04:45:08 UTC 2026 · 23:40  up 4 days, 15:08, 1 user, load averages: 3.17 2.97 3.20 · exit 0

099-base-list.log · 2a81b900ac0c3c678c6a7beb4b064e95e6794400e7b28aa92ee24359a8d88a3b · Thu Nov 26 04:45:15 UTC 2026 to Thu Nov 26 04:45:15 UTC 2026 · 23:45  1 user, load averages: 2.56 2.77 3.06 · exit 0

094-baseline-suite.log · 192ad8a8e6e530f6da923a659d6c35709f0249fb262bb9e4d607c44dd08d03be
 2089 pass
 0 fail
 28015 expect() calls
Ran 2089 tests across 160 files. {U+005B}253.87s{U+005D}

4. Implementation, tests and deliberate breaks

R1 · B16 and B19 items 3–4. BrokerSnapshot and LedgerEntryProjection in types.ts retain absence. useBrokerState carries the connection through and starts disconnected. StatusBar, buildStatusLine and the writer helpers distinguish unknown connection, ownership and token values. GovernancePane distinguishes absent collections from present empty collections. The identity, ClaudePane, AntigravityPane, DockStrip, IncidentBand and EventLog readers show the applicable UNKNOWN or em dash. The full suite exercised present-value rendering and the original NOCONN entry point.

R2 · B15–B16 and B19 items 1–2. clientSnapshotToProjection checks the complete client shape, including nested rows, enum values and the discriminated ownership variant. approvalColor maps approval state. Errors name the member and fault. The pinned table includes sender-released. The signed resume governs repositoryFingerprint and the type-specific empty cases.

R3 · B17 and B19 item 5. waitForSnapshotTick uses the named 100 ms interval and settles on cancellation. This caps continuous pulls at roughly ten per second while preserving prompt updates. The package index exports the wait beside the live port.

R4 · B17 and B19 item 5. subscribeToClient reads immediately, then waits between pulls. It compares mapped projections, delivers the closed projection and ends delivery on failure or unsubscribe. App’s existing subscribe prop was sufficient. The separate B4 correction narrows an indexed first frame in its new test after the test checks the length and connection.

R5 · B8, B18 and B19 item 7. liveFailureCause accepts child_exited and host_exited. reportFailure maps them to child_failure and pty_host_failure after activation and preserves reattestation_failed detail before activation. Both consume loops distinguish a drained fact, a child exit and fact-stream EOF after handover. Exited facts retain parser, reader or registration causes. The shared test harness observes actual build failures and durable interruption or Founder-close rows.

R6 · B5 and B19 items 8–9. Two Claude wire tests exercise an unregistered retry error against the installed rules. Eighteen madv cases exercise every mapped status, an unknown status and a signal on both sides of real build activation. The target attester consumes synthetic wire facts through the public live port. Tests observe its reported cause and the build result.

R7 · B19 items 6–7 and B21. recordOfflineFrames takes every sample from the presented client, persists it, reloads it and renders builder, governance and event views. child-ends.ts records the build cases. The evidence packet cites the 18 source files and the source manifest. No test fabricates a pre-activation or disconnected snapshot.

Each item below is one implementation commit, in order. All inputs are synthetic or come from the disposable stand-ins. The App subscription type already supplies an unsubscribe function and accepts the TUI projection. App.tsx needs no change.

### R1 — B16 and B19 items 3 and 4

Widen only the eight specified fields in types.ts. Carry a three-valued connected through useBrokerState and StatusBar. Initial connected stays false. Use UNKNOWN for null connection in full and compact status, pane headers, governance and dock. Use UNKNOWN for unknown ownership, role and model. Governance uses — for absent execution IDs, token, permission lists, data class and pending-transfer count. A present empty list retains its existing wording or count. Display — for a null token in EventLog, writer tokens and IncidentBand. StatusBar preserves the null token marker at compact widths and retains its existing zero-token behavior. Keep queueDepth unrendered.

The renderer files are components/StatusBar.tsx, agent-identity.ts, DockStrip.tsx, IncidentBand.tsx, EventLog.tsx, panes/GovernancePane.tsx, ClaudePane.tsx and AntigravityPane.tsx under apps/madbridge/src/tui/. Only narrow existing tests where the compiler identifies a nullable read. Use test/phase3b/absence.test.tsx with actual character frames. Its tests are “governance distinguishes unknown transfers and permissions from empty collections”, “a null connection is unknown in bars, panes and docks”, “absent execution and ownership facts stay absent and queue depth stays hidden” and “a null token stays absent in writer, incident and session_open frames”. Break the null transfer count to 0 and null permissions to none, null connection to the connected word, null ownership to owned, and the ledger token to a bare tok:. The tests also cover both surfaces' writer headers and dock strips.

### R2 — B15, B16 and B19 items 1 and 2

Add clientSnapshotToProjection in live/projection.ts. Validate shape with fixed member paths and fixed fault descriptions. Check required and optional nested fields, discriminants and arrays without imposing envelope authorization or hash validity. Read sequence, token state, session ID, ledger sequence and task hash only for shape. Copy execution identities in order, translate approval states to their exact text, project ownership by kind and preserve the remaining governed data. Use no clock or I/O.

The first resume ruling governs the table. Null is valid only where the source type admits it. Exercise empty non-null arrays and strings, all phases, ownership kinds, token states and approval states, and read-only members independently of the projection. Fingerprints need kind, sha256 and git_sha, plus a string base_git_sha when present. Tests in test/phase3b/projection.test.ts are “the pinned table maps every broker member and declared phase and ownership kind” and “the mapper rejects unknown shapes without disclosing supplied values”. The latter includes null and missing phase, repositoryFingerprint, tokenState and ledgerSeq, and each invalid fingerprint case from the ruling. Break sender-released to owned and remove a declared-set check.

### R3 — B17

Add packages/supervisor/src/snapshot-timer.ts and named exports in src/index.ts. A cancellable wait uses a named interval of 100 ms. This bounds polling to ten reads per second per subscription while keeping interaction latency short. Clear the pending timer and detach the abort listener on settlement. The focused test in packages/supervisor/test/snapshot-timer.test.ts is “the snapshot wait paces reads and settles promptly on cancellation”. Break its interval or cancellation. R4 exercises the same timer through the subscription.

### R4 — B17 and B19 item 5

Add live/subscribe.ts. Fetch the first snapshot immediately with getSnapshot, compare projected data structurally, then wait before each further read. A closed client supplies its final snapshot through getSnapshot. A failed read or mapping supplies one disconnected copy of the last projection if one exists. Unsubscription cancels pacing and suppresses any in-flight delivery. Never close the shared client from an unsubscribe. No timer in the TUI and no wiring into an app entry point.

Use test/phase3b/subscribe.test.ts with controlled clients. Test “subscription gives the first, changed and closed projections exactly once”, “mapping and read failures end delivery from the last projection”, “a first failure gives no projection” and “unsubscribe cancels pacing and suppresses in-flight delivery”. Break duplicate suppression, delivery of the final closed snapshot, stopping on mapper failure, first-failure delivery and the unsubscribe guard.

### R5 — B8, B18 and B19 item 7

Extend the live build cause allowlist and interrupt mapping in supervisor/src/build.ts. Keep the phase guard and non-live behavior. Change only supervised post-handover outcomes in the two adapters' live.ts. On exit, retain any parser, reader or registered cause, otherwise report child_exited. Bare end after handover reports host_exited. Ignore a drained fact alone after handover. Preserve pre-handover behavior. Repin only line 30 of harness-separation in the same commit. Update the existing madv encoding test's expected end cause at line 52.

Use new stand-in and scenario helpers under test/phase3b/ for real offline preflight, build, monitor and ledger observations. Use an explicit verdict barrier when necessary and the real post-activation sendUserInput for an unanswered request. Use a synthetic stream only for drained alone because the production host emits it immediately before exit. For Founder close invoke the composition's own close on an active session and inspect the durable ledger. Test each surface before activation for child and host exit and after activation for clean child exit, host EOF and its parser-specific cases. Include clean and malformed partial Claude exits, nonzero or signal without a partial Claude line, madv clean exit, pending response, nonzero code, partial line and open tool. Name parameterized build tests by surface, timing, event and expected cause or reason in test/phase3b/child-end.test.ts. Name the drain test for each monitor and the close test for the absence of an interruption. Share offline observations with R7, writing any test transcripts only to disposable directories.

Break the child_failure mapping, both EOF reports, each drain guard, exit-cause retention, pre-activation failure propagation and the Founder-close phase guard. Compare actual failure detail or durable interruption rows, including the absence of the row after Founder close. Capture all results and restore each change separately.

### R6 — B5 and B19 items 8 and 9

Use new tests in packages/adapter-claude-code/test/retry.test.ts and packages/adapter-madv-surface/test/exit-causes.test.ts with the real registered rules and synthetic wire facts. Test “an unregistered api_retry error preserves attestation and the active monitor” and “the madv attester preserves exit causes before and after handover”. Exercise every mapped nonzero exit code, an unlisted code and a signal, with code zero's healthy exit covered in R5 and attestation behavior checked here. Break the Claude detector to classify any retry as auth_failed and suppress one madv code at parser handoff.

### R7 — B19 item 6 and B21

Add recorded-stream and child-end evidence entry points under scripts/phase3b/. For the healthy composition take actual client snapshots from present through Founder close, record how the stream ends, then replay them through the mapper and subscription contract for scripted character frames. Keep the raw observations outside the repository. Test “the healthy offline client's recorded stream renders activation through Founder close” in test/phase3b/recorded-frames.test.tsx. Break the frame projection of activation. Reuse R5's build cases for the child-end transcripts. Put labelled, sanitized excerpts and source hashes in docs/verification/phase-3b-m2-evidence.md.

The evidence starts at activation because present is the first client handoff. A final ledger read can fail after close. No pre-activation or disconnected snapshot will be fabricated. The packet will record the real-surface limitation, execution-exit limitation and the adapter's relative supervisor import. These scripts have no route from the CLI.

The R5 parameterized test names use “SURFACE before activation reports CAUSE” for each surface and child_exited or host_exited. After activation they use “SURFACE CASE records REASON”. The cases are clean exit and host end on both surfaces, Claude nonzero exit, signalled exit and malformed partial line, and madv nonzero exit, pending request, open tool and malformed partial line. Their reasons are respectively child_failure, pty_host_failure, child_failure, child_failure, identity_mismatch, adapter_failure for a provider-error nonzero exit, identity_mismatch for missing response evidence, and identity_mismatch for the last two parser failures. The remaining names are “SURFACE drained alone leaves the monitor active” for both surfaces and “Founder close on the active composition records no interruption”. The child mapping break serves both clean exits and the Claude unclassified exits. Each EOF break serves that surface's host-end tests. Drain breaks serve the two drain tests. Exit-cause breaks serve the retained-cause cases. The phase guard break serves Founder close. Each test observes its own expected outcome at the build unless the required fact is drained alone.

| B19 item | New file | Passing test |
|---:|---|---|
| 8 | packages/adapter-claude-code/test/retry.test.ts | an unregistered api_retry error preserves the active monitor |
| 8 | packages/adapter-claude-code/test/retry.test.ts | an unregistered api_retry error preserves the attestation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 0 gives child_exited after activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 0 gives identity_unavailable before activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 1 gives provider_error after activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 1 gives provider_error before activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 3 gives identity_unavailable after activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 3 gives identity_unavailable before activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 4 gives identity_mismatch after activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 4 gives identity_mismatch before activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 42 gives provider_error after activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 42 gives provider_error before activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 5 gives auth_failed after activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 5 gives auth_failed before activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 6 gives endpoint_refused after activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 6 gives endpoint_refused before activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 7 gives model_refused after activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 7 gives model_refused before activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv signal gives provider_error after activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv signal gives provider_error before activation |
| 5 | packages/supervisor/test/snapshot-timer.test.ts | the snapshot wait paces reads and settles promptly on cancellation |
| 3 | test/phase3b/absence.test.tsx | a null connection is unknown in bars, panes and docks |
| 4 | test/phase3b/absence.test.tsx | a null token stays absent in writer, incident and session_open frames |
| 3 | test/phase3b/absence.test.tsx | absent execution and ownership facts stay absent and queue depth stays hidden |
| 3 | test/phase3b/absence.test.tsx | governance distinguishes unknown transfers and permissions from empty collections |
| 7 | test/phase3b/child-end.test.ts | Founder close on the active composition records no interruption |
| 7 | test/phase3b/child-end.test.ts | claude-code before activation reports child_exited |
| 7 | test/phase3b/child-end.test.ts | claude-code before activation reports host_exited |
| 7 | test/phase3b/child-end.test.ts | claude-code clean exit records child_failure |
| 7 | test/phase3b/child-end.test.ts | claude-code drained alone leaves the monitor active |
| 7 | test/phase3b/child-end.test.ts | claude-code host end records pty_host_failure |
| 7 | test/phase3b/child-end.test.ts | claude-code malformed partial line records identity_mismatch |
| 7 | test/phase3b/child-end.test.ts | claude-code nonzero exit records child_failure |
| 7 | test/phase3b/child-end.test.ts | claude-code signalled exit records child_failure |
| 7 | test/phase3b/child-end.test.ts | madv-surface before activation reports child_exited |
| 7 | test/phase3b/child-end.test.ts | madv-surface before activation reports host_exited |
| 7 | test/phase3b/child-end.test.ts | madv-surface clean exit records child_failure |
| 7 | test/phase3b/child-end.test.ts | madv-surface drained alone leaves the monitor active |
| 7 | test/phase3b/child-end.test.ts | madv-surface host end records pty_host_failure |
| 7 | test/phase3b/child-end.test.ts | madv-surface malformed partial line records identity_mismatch |
| 7 | test/phase3b/child-end.test.ts | madv-surface nonzero exit records adapter_failure |
| 7 | test/phase3b/child-end.test.ts | madv-surface open tool records identity_mismatch |
| 7 | test/phase3b/child-end.test.ts | madv-surface pending request records identity_mismatch |
| 2 | test/phase3b/projection.test.ts | the mapper rejects unknown shapes without disclosing supplied values |
| 1 | test/phase3b/projection.test.ts | the pinned table maps every broker member and declared phase and ownership kind |
| 6 | test/phase3b/recorded-frames.test.tsx | the healthy offline client's recorded stream renders activation through Founder close |
| 5 | test/phase3b/subscribe.test.ts | a first failure gives no projection |
| 5 | test/phase3b/subscribe.test.ts | mapping and read failures end delivery from the last projection |
| 5 | test/phase3b/subscribe.test.ts | subscription gives the first, changed and closed projections exactly once |
| 5 | test/phase3b/subscribe.test.ts | unsubscribe cancels pacing and suppresses in-flight delivery |

### 131-transfers-diff

131-transfers-diff.log · 9c7fc7ce1dd6bb122f31f9ec94d8f12f0b67e0916ee4f6cbfe57a7c38d724f5a

~~~text
diff --git a/apps/madbridge/src/tui/panes/GovernancePane.tsx b/apps/madbridge/src/tui/panes/GovernancePane.tsx
index 8e72ec6..73e2ef6 100644
--- a/apps/madbridge/src/tui/panes/GovernancePane.tsx
+++ b/apps/madbridge/src/tui/panes/GovernancePane.tsx
@@ -82,7 +82,7 @@ export function GovernancePane({ active, state }: GovernancePaneProps) {
   rows.push("Writer: " + (state.activeWriter ?? "—") + " | Token: " + (state.fencingToken ?? "—") + " | Ownership: " + (state.ownershipState ?? "UNKNOWN"));
   rows.push("Read: " + readPaths + " | Write: " + writePaths);
   rows.push("Commands: " + cmdCats + " | Egress: " + egress + " | Data class: " + dataClass);
-  rows.push("Transfer phase: " + (state.transferPhase ?? "none") + " | Pending transfers: " + String(state.pendingTransfers?.length ?? "—"));
+  rows.push("Transfer phase: " + (state.transferPhase ?? "none") + " | Pending transfers: " + String(state.pendingTransfers?.length ?? 0));
   if (transfer) {
     rows.push("Transfer: " + transfer.from + " → " + transfer.to + " | tok#" + String(transfer.fencingToken) + " | " + transfer.reason);
     // Provenance timestamp on its own row so the label survives narrow-width
~~~

134-transfers-test.log · e21f4f80b244fe4c75fe1eb624ccc7f0b76111b37dda83e5088f79b5123afe3d

~~~text
error: expect(received).toContain(expected)
(lines omitted)
Expected to contain: "Pending transfers: —"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/absence.test.tsx:34:19)
(fail) governance distinguishes unknown transfers and permissions from empty collections {U+005B}33.23ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 135-transfers-restore.log · 6697d46cd696ab7a8d6825162890d57184646502242b4ac9d34521b9030d945f

~~~text
(fail) governance distinguishes unknown transfers and permissions from empty collections {U+005B}33.23ms{U+005D}
(pass) a null connection is unknown in bars, panes and docks {U+005B}136.16ms{U+005D}
(pass) absent execution and ownership facts stay absent and queue depth stays hidden {U+005B}143.16ms{U+005D}
(pass) a null token stays absent in writer, incident and session_open frames {U+005B}198.68ms{U+005D}
git status --porcelain -- apps/madbridge/src/tui/panes/GovernancePane.tsx
HEAD 899f87756e9c59257728b950e591df73712e099c1d884054c790a71cc0abf85e apps/madbridge/src/tui/panes/GovernancePane.tsx
restored 899f87756e9c59257728b950e591df73712e099c1d884054c790a71cc0abf85e apps/madbridge/src/tui/panes/GovernancePane.tsx
~~~

### 136-permissions-diff

136-permissions-diff.log · 016c6e3d1c058d59d591bb79f17769103031b33e606d84a3a1409c7c855e2210

~~~text
diff --git a/apps/madbridge/src/tui/panes/GovernancePane.tsx b/apps/madbridge/src/tui/panes/GovernancePane.tsx
index 8e72ec6..15c4b80 100644
--- a/apps/madbridge/src/tui/panes/GovernancePane.tsx
+++ b/apps/madbridge/src/tui/panes/GovernancePane.tsx
@@ -66,7 +66,7 @@ export function GovernancePane({ active, state }: GovernancePaneProps) {
   const transfer = state.pendingTransfers?.{U+005B}0{U+005D} ?? null;

   // Render empty allowed lists as "none", not healthy/active/unknown.
-  const readPaths = perms === null ? "—" : perms?.allowedReadPaths?.length ? perms.allowedReadPaths.join(", ") : "none";
+  const readPaths = perms === null ? "none" : perms?.allowedReadPaths?.length ? perms.allowedReadPaths.join(", ") : "none";
   const writePaths = perms === null ? "—" : perms?.allowedWritePaths?.length ? perms.allowedWritePaths.join(", ") : "none";
   const cmdCats = perms === null ? "—" : perms?.allowedCommandCategories?.length ? perms.allowedCommandCategories.join(", ") : "none";
   const egress = perms === null ? "—" : perms?.allowedEgressDestinations?.length ? perms.allowedEgressDestinations.join(", ") : "none";
~~~

140-permissions-test.log · 8e89777c4b2d8743db1a12a0225d076d036d48bc11b8b92d81547bd451b97214

~~~text
error: expect(received).toContain(expected)
(lines omitted)
Expected to contain: "Read: — | Write: —"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/absence.test.tsx:35:19)
(fail) governance distinguishes unknown transfers and permissions from empty collections {U+005B}36.82ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 141-permissions-restore.log · 2e2b3b5d74737959c2df9196f0dd01a6e146f0b0c994c6e9ac33cd44988186b4

~~~text
(fail) governance distinguishes unknown transfers and permissions from empty collections {U+005B}36.82ms{U+005D}
(pass) a null connection is unknown in bars, panes and docks {U+005B}134.90ms{U+005D}
(pass) absent execution and ownership facts stay absent and queue depth stays hidden {U+005B}141.87ms{U+005D}
(pass) a null token stays absent in writer, incident and session_open frames {U+005B}198.11ms{U+005D}
git status --porcelain -- apps/madbridge/src/tui/panes/GovernancePane.tsx
HEAD 899f87756e9c59257728b950e591df73712e099c1d884054c790a71cc0abf85e apps/madbridge/src/tui/panes/GovernancePane.tsx
restored 899f87756e9c59257728b950e591df73712e099c1d884054c790a71cc0abf85e apps/madbridge/src/tui/panes/GovernancePane.tsx
~~~

### 142-connection-diff

142-connection-diff.log · 0ed3ae1690b0d155d1affcf388ee2e59cf2e7ffd791ed1225f7e06299b413a23

~~~text
diff --git a/apps/madbridge/src/tui/components/StatusBar.tsx b/apps/madbridge/src/tui/components/StatusBar.tsx
index b5187d9..bc9bf70 100644
--- a/apps/madbridge/src/tui/components/StatusBar.tsx
+++ b/apps/madbridge/src/tui/components/StatusBar.tsx
@@ -103,7 +103,7 @@ export function buildStatusLine(input: StatusLineInput): string {
   const hasSeat = input.seatWord !== undefined && input.modeWord !== undefined;

   // Build the fact tokens.
-  const connToken = input.connected === null ? "UNKNOWN" : input.connected ? "CONNECTED" : "NOT CONNECTED";
+  const connToken = input.connected === null ? "CONNECTED" : input.connected ? "CONNECTED" : "NOT CONNECTED";
   const sessToken = "session " + input.sessionWord;
   const writerToken = "writer " + input.ownerWord;
   const pendToken = "pending " + String(input.pendingCount);
~~~

145-connection-test.log · df156512019bdd7d83227874022504551ba88c0ec076b65f46201ac12c6a5dcc

~~~text
error: expect(received).toMatch(expected)
(lines omitted)
Expected substring or pattern: /UNKNOWN\s*\|\s*(session active|S:active)/
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/absence.test.tsx:51:20)
(fail) a null connection is unknown in bars, panes and docks {U+005B}50.26ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 146-connection-restore.log · 637bbaf0fb7b21131ba816b2cb5e07be08c54e0c5f7670f330547da8e088cf41

~~~text
(pass) governance distinguishes unknown transfers and permissions from empty collections {U+005B}55.00ms{U+005D}
(fail) a null connection is unknown in bars, panes and docks {U+005B}50.26ms{U+005D}
(pass) absent execution and ownership facts stay absent and queue depth stays hidden {U+005B}142.67ms{U+005D}
(pass) a null token stays absent in writer, incident and session_open frames {U+005B}193.40ms{U+005D}
git status --porcelain -- apps/madbridge/src/tui/components/StatusBar.tsx
HEAD 3415b3910ebab3c4f0ba60f1de2cd6f14bf3ce7bec7db3e52ba4b83c7040ba58 apps/madbridge/src/tui/components/StatusBar.tsx
restored 3415b3910ebab3c4f0ba60f1de2cd6f14bf3ce7bec7db3e52ba4b83c7040ba58 apps/madbridge/src/tui/components/StatusBar.tsx
~~~

### 147-ownership-diff

147-ownership-diff.log · 663affa7aaea280e0b81796b8abf3f0105b8fec707ab3e170a0fb8fe01723108

~~~text
diff --git a/apps/madbridge/src/tui/components/StatusBar.tsx b/apps/madbridge/src/tui/components/StatusBar.tsx
index b5187d9..f1010fa 100644
--- a/apps/madbridge/src/tui/components/StatusBar.tsx
+++ b/apps/madbridge/src/tui/components/StatusBar.tsx
@@ -352,7 +352,7 @@ function describeOwner(state: BrokerSnapshot | null): string {
   const suffix = tok === null ? " (token —)" : tok > 0 ? " #" + String(tok) : " (token none)";
   switch (o) {
     case null:
-      return "UNKNOWN";
+      return "owned";
     case "free":
       return "free";
     case "owned":
~~~

150-ownership-test.log · 478c4c878bd2fc7b0fc1a3fe17ee48e683dd8648ea4605fc28fe834a951b724e

~~~text
error: expect(received).toContain(expected)
(lines omitted)
Expected to contain: "writer UNKNOWN"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/absence.test.tsx:71:18)
(fail) absent execution and ownership facts stay absent and queue depth stays hidden {U+005B}35.47ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 151-ownership-restore.log · 5175958f07c47ea4ef7fb45c73fc8ef533a4a2fd2136bb96fc17d1f18f2a2330

~~~text
(pass) governance distinguishes unknown transfers and permissions from empty collections {U+005B}52.97ms{U+005D}
(pass) a null connection is unknown in bars, panes and docks {U+005B}135.46ms{U+005D}
(fail) absent execution and ownership facts stay absent and queue depth stays hidden {U+005B}35.47ms{U+005D}
(pass) a null token stays absent in writer, incident and session_open frames {U+005B}190.10ms{U+005D}
git status --porcelain -- apps/madbridge/src/tui/components/StatusBar.tsx
HEAD 3415b3910ebab3c4f0ba60f1de2cd6f14bf3ce7bec7db3e52ba4b83c7040ba58 apps/madbridge/src/tui/components/StatusBar.tsx
restored 3415b3910ebab3c4f0ba60f1de2cd6f14bf3ce7bec7db3e52ba4b83c7040ba58 apps/madbridge/src/tui/components/StatusBar.tsx
~~~

### 152-row-token-diff

152-row-token-diff.log · 9acd5fefd7f91d60494c86bb0c64b3ac6d234ada23d2dd42e6bd70980c6b3e60

~~~text
diff --git a/apps/madbridge/src/tui/components/EventLog.tsx b/apps/madbridge/src/tui/components/EventLog.tsx
index 802f80c..42f55c1 100644
--- a/apps/madbridge/src/tui/components/EventLog.tsx
+++ b/apps/madbridge/src/tui/components/EventLog.tsx
@@ -34,7 +34,7 @@ export function EventLog({ entries }: Props) {
           <text> </text>
           <text fg={POSEIDON.lightText}>{entry.actor}</text>
           <text> </text>
-          <text fg={POSEIDON.cobalt}>{entry.fencingToken === null ? "tok:—" : "tok:" + String(entry.fencingToken)}</text>
+          <text fg={POSEIDON.cobalt}>{entry.fencingToken === null ? "tok:" : "tok:" + String(entry.fencingToken)}</text>
           <text> </text>
           <text attributes={TextAttributes.DIM}>
             {entry.hash.slice(0, 12)}
~~~

155-row-token-test.log · 9e08ab3eff742ad1851cadceef31039c73259dc935d97437fe673a849592b608

~~~text
error: expect(received).toContain(expected)
(lines omitted)
Expected to contain: "tok:—"
Received: "│ #1 session_open offline tok: synthetic                                                                                                                       │"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/absence.test.tsx:101:18)
(fail) a null token stays absent in writer, incident and session_open frames {U+005B}190.41ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 156-row-token-restore.log · 99180d8b87bc81de5dc9f5a80a97c8db7b6f5ae375568068992069c35c792839

~~~text
(pass) governance distinguishes unknown transfers and permissions from empty collections {U+005B}52.83ms{U+005D}
(pass) a null connection is unknown in bars, panes and docks {U+005B}135.58ms{U+005D}
(pass) absent execution and ownership facts stay absent and queue depth stays hidden {U+005B}141.04ms{U+005D}
(fail) a null token stays absent in writer, incident and session_open frames {U+005B}190.41ms{U+005D}
git status --porcelain -- apps/madbridge/src/tui/components/EventLog.tsx
HEAD 7b0c4aabad0f4386e655ac0565328fc9279da975cc264eb2e6ec7b7a2a241917 apps/madbridge/src/tui/components/EventLog.tsx
restored 7b0c4aabad0f4386e655ac0565328fc9279da975cc264eb2e6ec7b7a2a241917 apps/madbridge/src/tui/components/EventLog.tsx
~~~

### 172-sender-diff

172-sender-diff.log · f120da5f504cb53a703ed6c40e715655d111fdfa859c810cc175332906c05ff4

~~~text
diff --git a/apps/madbridge/src/tui/live/projection.ts b/apps/madbridge/src/tui/live/projection.ts
index a6e4f4c..1a9d354 100644
--- a/apps/madbridge/src/tui/live/projection.ts
+++ b/apps/madbridge/src/tui/live/projection.ts
@@ -151,7 +151,7 @@ function approvalColor(kind: PendingApprovalSnapshot{U+005B}"state"{U+005D}): ApprovalColorSta
 export function clientSnapshotToProjection(snapshot: ClientSnapshot): BrokerSnapshot {
   snapshotShape(snapshot, "snapshot");
   return {
-    connected: snapshot.connected, sessionState: snapshot.phase, ownershipState: snapshot.ownershipState?.kind ?? null,
+    connected: snapshot.connected, sessionState: snapshot.phase, ownershipState: snapshot.ownershipState?.kind === "sender-released" ? "owned" : snapshot.ownershipState?.kind ?? null,
     activeWriter: snapshot.activeWriterExecutionId, fencingToken: snapshot.fencingToken, task: snapshot.task,
     executions: snapshot.executions?.map(execution => execution.identity) ?? null,
     repositoryFingerprint: snapshot.repositoryFingerprint,
~~~

175-sender-test.log · 1408b61063aaed3802bf2bc3179060a6aeeec44011a87249f84494b61ce3be78

~~~text
error: expect(received).toEqual(expected)
(lines omitted)
-   "ownershipState": "sender-released",
+   "ownershipState": "owned",
(lines omitted)
- Expected  - 1
+ Received  + 1
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/projection.test.ts:76:31)
(fail) the pinned table maps every broker member and declared phase and ownership kind {U+005B}2.73ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 176-sender-restore.log · 6babc8aea2f8ba9144d6e7d1025f530e8f21fbe3784069d9ddcb56cb76082dcb

~~~text
(fail) the pinned table maps every broker member and declared phase and ownership kind {U+005B}2.73ms{U+005D}
(pass) the mapper rejects unknown shapes without disclosing supplied values {U+005B}1.35ms{U+005D}
git status --porcelain -- apps/madbridge/src/tui/live/projection.ts
HEAD 9a9a39d8c2b32bfd6327e49a461480ce3bbcecd811313b3ce7fd517a7c5ba799 apps/madbridge/src/tui/live/projection.ts
restored 9a9a39d8c2b32bfd6327e49a461480ce3bbcecd811313b3ce7fd517a7c5ba799 apps/madbridge/src/tui/live/projection.ts
~~~

### 177-kind-diff

177-kind-diff.log · c418b882253216bce064ec001399cf5123c8b7acbfcaad25c3a4074f15d4ffe7

~~~text
diff --git a/apps/madbridge/src/tui/live/projection.ts b/apps/madbridge/src/tui/live/projection.ts
index a6e4f4c..bfce177 100644
--- a/apps/madbridge/src/tui/live/projection.ts
+++ b/apps/madbridge/src/tui/live/projection.ts
@@ -65,7 +65,7 @@ const surface: Check = (value, member) => {
   try { parseSurfaceId(value); } catch { fault(member, "invalid surface identifier"); }
 };
 const fingerprint = record({
-  kind: oneOf("commit", "working_tree"), sha256: string, git_sha: string,
+  kind: string, sha256: string, git_sha: string,
 }, { base_git_sha: string });
 const identity = record({
   execution_id: string, role: oneOf(...KNOWN_ROLES), surface, model: string,
~~~

180-kind-test.log · b9d4370cf8bebf72e34e40d836439fe901b88f30835eb4dacfa906f46b8de042

~~~text
error: expect(received).toContain(expected)
(lines omitted)
Expected to contain: "snapshot.repositoryFingerprint.kind: "
Received: ""
(lines omitted)
      at rejects (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/projection.test.ts:85:21)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/projection.test.ts:101:15)
(fail) the mapper rejects unknown shapes without disclosing supplied values {U+005B}1.31ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 181-kind-restore.log · 9576e5dc614f629b0450dafb576cf144068ccb82963d9f74621b98287389d417

~~~text
(pass) the pinned table maps every broker member and declared phase and ownership kind {U+005B}2.22ms{U+005D}
(fail) the mapper rejects unknown shapes without disclosing supplied values {U+005B}1.31ms{U+005D}
git status --porcelain -- apps/madbridge/src/tui/live/projection.ts
HEAD 9a9a39d8c2b32bfd6327e49a461480ce3bbcecd811313b3ce7fd517a7c5ba799 apps/madbridge/src/tui/live/projection.ts
restored 9a9a39d8c2b32bfd6327e49a461480ce3bbcecd811313b3ce7fd517a7c5ba799 apps/madbridge/src/tui/live/projection.ts
~~~

### 196-interval-diff

196-interval-diff.log · ccdb3b6f7a6d6ddc83e5b6971e4d49134efb907c812a3c8da50533fba10a2618

~~~text
diff --git a/packages/supervisor/src/snapshot-timer.ts b/packages/supervisor/src/snapshot-timer.ts
index 1691dab..830ea72 100644
--- a/packages/supervisor/src/snapshot-timer.ts
+++ b/packages/supervisor/src/snapshot-timer.ts
@@ -1,5 +1,5 @@
 // Bound the rate of projection reads for each live TUI subscription.
-export const SNAPSHOT_INTERVAL_MS = 100;
+export const SNAPSHOT_INTERVAL_MS = 0;

 export function waitForSnapshotTick(signal: AbortSignal): Promise<void> {
   if (signal.aborted) return Promise.resolve();
~~~

199-interval-test.log · d37e491790da91257d85037e8e0297341cb307677837d60b67e087fa19d1778d

~~~text
error: expect(received).toBe(expected)
(lines omitted)
Expected: 100
Received: 0
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/supervisor/test/snapshot-timer.test.ts:12:32)
(fail) the snapshot wait paces reads and settles promptly on cancellation {U+005B}0.48ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 200-interval-restore.log · 8488a9fba38ae54617b445dd4b588c27fec41bea22e92fb1cc76e809bf82a8ab

~~~text
(fail) the snapshot wait paces reads and settles promptly on cancellation {U+005B}0.48ms{U+005D}
git status --porcelain -- packages/supervisor/src/snapshot-timer.ts
HEAD 52059e8911a5a9738fb4a290cfba279b85d39239387c60ad2b6fe26e1d0347ea packages/supervisor/src/snapshot-timer.ts
restored 52059e8911a5a9738fb4a290cfba279b85d39239387c60ad2b6fe26e1d0347ea packages/supervisor/src/snapshot-timer.ts
~~~

### 213-duplicate-diff

213-duplicate-diff.log · 5733ab6edc2b5ee8781d4fea8069941e900b7639f8f9e902ae035307be3b6e0e

~~~text
diff --git a/apps/madbridge/src/tui/live/subscribe.ts b/apps/madbridge/src/tui/live/subscribe.ts
index b968153..0508830 100644
--- a/apps/madbridge/src/tui/live/subscribe.ts
+++ b/apps/madbridge/src/tui/live/subscribe.ts
@@ -23,7 +23,7 @@ export function subscribeToClient(client: BrokerClient) {
         }

         const closed = next.connected === false;
-        if (closed || !isDeepStrictEqual(last, next)) {
+        if (true) {
           last = next;
           listener(next);
         }
~~~

216-duplicate-test.log · 5e27c8cf8e16fe52af3df201cf500a679eba3f7f6045315963938910a7176cb9

~~~text
error: expect(received).toEqual(expected)
(lines omitted)
+     "active",
+     true,
+     null,
+   {U+005D},
+   {U+005B}
(lines omitted)
- Expected  - 0
+ Received  + 5
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/subscribe.test.ts:51:72)
(fail) subscription gives the first, changed and closed projections exactly once {U+005B}435.71ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 217-duplicate-restore.log · a4912a61462058a71c178017456a43030429d1b80a73447c547341c18a044860

~~~text
(fail) subscription gives the first, changed and closed projections exactly once {U+005B}435.71ms{U+005D}
(pass) mapping and read failures end delivery from the last projection {U+005B}465.95ms{U+005D}
(pass) a first failure gives no projection {U+005B}267.55ms{U+005D}
(pass) unsubscribe cancels pacing and suppresses in-flight delivery {U+005B}269.74ms{U+005D}
git status --porcelain -- apps/madbridge/src/tui/live/subscribe.ts
HEAD e3220af6bbaf622800f3b598acdf297475c72b194cd4c9bf93add57075b47bd1 apps/madbridge/src/tui/live/subscribe.ts
restored e3220af6bbaf622800f3b598acdf297475c72b194cd4c9bf93add57075b47bd1 apps/madbridge/src/tui/live/subscribe.ts
~~~

### 218-closed-diff

218-closed-diff.log · 3c08fc45d35f2061814e0022b472164dd874b3720e84db8ffc3c64b36d3f2f90

~~~text
diff --git a/apps/madbridge/src/tui/live/subscribe.ts b/apps/madbridge/src/tui/live/subscribe.ts
index b968153..a6459cd 100644
--- a/apps/madbridge/src/tui/live/subscribe.ts
+++ b/apps/madbridge/src/tui/live/subscribe.ts
@@ -23,6 +23,7 @@ export function subscribeToClient(client: BrokerClient) {
         }

         const closed = next.connected === false;
+        if (closed) return;
         if (closed || !isDeepStrictEqual(last, next)) {
           last = next;
           listener(next);
~~~

221-closed-test.log · c184c0fdbc621ca45e1d074fefe426d7666c62b4c90344dce7d71c9f7d7e48ee

~~~text
error: expect(received).toEqual(expected)
(lines omitted)
-   {U+005B}
-     "closed",
-     false,
-     null,
-   {U+005D},
(lines omitted)
- Expected  - 5
+ Received  + 0
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/subscribe.test.ts:51:72)
(fail) subscription gives the first, changed and closed projections exactly once {U+005B}437.20ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 222-closed-restore.log · b86c520438a7e2e157ccb84f2743ceac30c3bc9e94b9ddb6917c219d25db61ff

~~~text
(fail) subscription gives the first, changed and closed projections exactly once {U+005B}437.20ms{U+005D}
(pass) mapping and read failures end delivery from the last projection {U+005B}472.02ms{U+005D}
(pass) a first failure gives no projection {U+005B}265.94ms{U+005D}
(pass) unsubscribe cancels pacing and suppresses in-flight delivery {U+005B}269.76ms{U+005D}
git status --porcelain -- apps/madbridge/src/tui/live/subscribe.ts
HEAD e3220af6bbaf622800f3b598acdf297475c72b194cd4c9bf93add57075b47bd1 apps/madbridge/src/tui/live/subscribe.ts
restored e3220af6bbaf622800f3b598acdf297475c72b194cd4c9bf93add57075b47bd1 apps/madbridge/src/tui/live/subscribe.ts
~~~

### 223-after-failure-diff

223-after-failure-diff.log · 98a896742e6710c999a56a48cd9d59e9f2f83e8342c05326142b5305ef368aff

~~~text
diff --git a/apps/madbridge/src/tui/live/subscribe.ts b/apps/madbridge/src/tui/live/subscribe.ts
index b968153..335c6d1 100644
--- a/apps/madbridge/src/tui/live/subscribe.ts
+++ b/apps/madbridge/src/tui/live/subscribe.ts
@@ -19,6 +19,7 @@ export function subscribeToClient(client: BrokerClient) {
           next = clientSnapshotToProjection(snapshot);
         } catch {
           if (last && !signal.aborted) listener({ ...last, connected: false });
+          if (last && !signal.aborted) continue;
           return;
         }

~~~

226-after-failure-test.log · 463131728e2df36e51eb9af893f790c4aeb615cc7232d219e9b7f200ef7f658b

~~~text
error: expect(received).toHaveLength(expected)
(lines omitted)
Expected length: 2
Received length: 3
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/subscribe.test.ts:66:20)
(fail) mapping and read failures end delivery from the last projection {U+005B}235.50ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 227-after-failure-restore.log · aadde1d639b3a587b85cb0b20bd4ed6078e74c9074b7a89a3b0c883c5a9686c6

~~~text
(pass) subscription gives the first, changed and closed projections exactly once {U+005B}437.42ms{U+005D}
(fail) mapping and read failures end delivery from the last projection {U+005B}235.50ms{U+005D}
(pass) a first failure gives no projection {U+005B}263.50ms{U+005D}
(pass) unsubscribe cancels pacing and suppresses in-flight delivery {U+005B}273.62ms{U+005D}
git status --porcelain -- apps/madbridge/src/tui/live/subscribe.ts
HEAD e3220af6bbaf622800f3b598acdf297475c72b194cd4c9bf93add57075b47bd1 apps/madbridge/src/tui/live/subscribe.ts
restored e3220af6bbaf622800f3b598acdf297475c72b194cd4c9bf93add57075b47bd1 apps/madbridge/src/tui/live/subscribe.ts
~~~

### 228-first-failure-diff

228-first-failure-diff.log · 68e64fa66af231114522f7271b4d25e888500ea6de41b302cc80802b92d2dfd6

~~~text
diff --git a/apps/madbridge/src/tui/live/subscribe.ts b/apps/madbridge/src/tui/live/subscribe.ts
index b968153..d289b00 100644
--- a/apps/madbridge/src/tui/live/subscribe.ts
+++ b/apps/madbridge/src/tui/live/subscribe.ts
@@ -19,6 +19,7 @@ export function subscribeToClient(client: BrokerClient) {
           next = clientSnapshotToProjection(snapshot);
         } catch {
           if (last && !signal.aborted) listener({ ...last, connected: false });
+          if (!last && !signal.aborted) continue;
           return;
         }

~~~

231-first-failure-test.log · f7fcc6b20b41c0ba9f88ef03dd49fbc9d5a353b56b010dd5a04c7f0927a5abf6

~~~text
error: expect(received).toEqual(expected)
(lines omitted)
- {U+005B}{U+005D}
+ {U+005B}
+   {
+     "activeWriter": null,
+     "connected": false,
+     "eventLog": {U+005B}{U+005D},
+     "executions": null,
+     "fencingToken": null,
+     "incident": null,
+     "ownershipState": null,
+     "pendingApprovals": {U+005B}{U+005D},
+     "pendingTransfers": null,
+     "permissionSummary": null,
+     "queueDepth": null,
+     "repositoryFingerprint": {
+       "git_sha": "synthetic-revision",
+       "kind": "commit",
+       "sha256": "synthetic-digest",
+     },
+     "reviewStatus": null,
+     "sessionState": "closed",
+     "task": null,
+     "transferPhase": null,
+     "verificationStatus": null,
+   },
+ {U+005D}
(lines omitted)
- Expected  - 1
+ Received  + 25
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/subscribe.test.ts:81:20)
(fail) a first failure gives no projection {U+005B}138.22ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 232-first-failure-restore.log · 201e1e24ef575bb2f4eda8586fe79ae4d838e0f4d1ad2748f26ae195157b1fff

~~~text
(pass) subscription gives the first, changed and closed projections exactly once {U+005B}434.05ms{U+005D}
(pass) mapping and read failures end delivery from the last projection {U+005B}466.36ms{U+005D}
(fail) a first failure gives no projection {U+005B}138.22ms{U+005D}
(pass) unsubscribe cancels pacing and suppresses in-flight delivery {U+005B}269.47ms{U+005D}
git status --porcelain -- apps/madbridge/src/tui/live/subscribe.ts
HEAD e3220af6bbaf622800f3b598acdf297475c72b194cd4c9bf93add57075b47bd1 apps/madbridge/src/tui/live/subscribe.ts
restored e3220af6bbaf622800f3b598acdf297475c72b194cd4c9bf93add57075b47bd1 apps/madbridge/src/tui/live/subscribe.ts
~~~

### 233-unsubscribe-diff

233-unsubscribe-diff.log · 0f1bd36ba988638e4e71c0585af890fea1dfa6f371e892b7a670adfa356fdb6c

~~~text
diff --git a/apps/madbridge/src/tui/live/subscribe.ts b/apps/madbridge/src/tui/live/subscribe.ts
index b968153..f99ca03 100644
--- a/apps/madbridge/src/tui/live/subscribe.ts
+++ b/apps/madbridge/src/tui/live/subscribe.ts
@@ -15,7 +15,6 @@ export function subscribeToClient(client: BrokerClient) {
         let next: BrokerSnapshot;
         try {
           const snapshot = await client.getSnapshot();
-          if (signal.aborted) return;
           next = clientSnapshotToProjection(snapshot);
         } catch {
           if (last && !signal.aborted) listener({ ...last, connected: false });
~~~

236-unsubscribe-test.log · 44d301e8fa1b2ed45a8dc2f60825908fcb6b381ddaae8eb40593b214beea9e71

~~~text
error: expect(received).toEqual(expected)
(lines omitted)
- {U+005B}{U+005D}
+ {U+005B}
+   {
+     "activeWriter": null,
+     "connected": true,
+     "eventLog": {U+005B}{U+005D},
+     "executions": null,
+     "fencingToken": null,
+     "incident": null,
+     "ownershipState": null,
+     "pendingApprovals": {U+005B}{U+005D},
+     "pendingTransfers": null,
+     "permissionSummary": null,
+     "queueDepth": null,
+     "repositoryFingerprint": {
+       "git_sha": "synthetic-revision",
+       "kind": "commit",
+       "sha256": "synthetic-digest",
+     },
+     "reviewStatus": null,
+     "sessionState": "active",
+     "task": null,
+     "transferPhase": null,
+     "verificationStatus": null,
+   },
+ {U+005D}
(lines omitted)
- Expected  - 1
+ Received  + 25
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/subscribe.test.ts:105:16)
(fail) unsubscribe cancels pacing and suppresses in-flight delivery {U+005B}270.88ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 237-unsubscribe-restore.log · 4c8a60396a728feb32f1d04d2110b3110f7609d82e244295f147ae50a900ffd6

~~~text
(pass) subscription gives the first, changed and closed projections exactly once {U+005B}435.40ms{U+005D}
(pass) mapping and read failures end delivery from the last projection {U+005B}471.00ms{U+005D}
(pass) a first failure gives no projection {U+005B}266.51ms{U+005D}
(fail) unsubscribe cancels pacing and suppresses in-flight delivery {U+005B}270.88ms{U+005D}
git status --porcelain -- apps/madbridge/src/tui/live/subscribe.ts
HEAD e3220af6bbaf622800f3b598acdf297475c72b194cd4c9bf93add57075b47bd1 apps/madbridge/src/tui/live/subscribe.ts
restored e3220af6bbaf622800f3b598acdf297475c72b194cd4c9bf93add57075b47bd1 apps/madbridge/src/tui/live/subscribe.ts
~~~

### 321-child-map-diff

321-child-map-diff.log · 41c10419e732eb1ed126d2f4ba9e2eec71615db5831756df1cddfb442757a992

~~~text
diff --git a/packages/supervisor/src/build.ts b/packages/supervisor/src/build.ts
index e216d06..5fb8447 100644
--- a/packages/supervisor/src/build.ts
+++ b/packages/supervisor/src/build.ts
@@ -641,7 +641,7 @@ async function executeBuild(
     firstFailure = { executionId, surface, cause };
     if (sessionActivatedRow !== null && currentBroker !== null) {
       const reason = cause === "auth_failed" ? "authentication_expired"
-        : cause === "child_exited" ? "child_failure"
+        : cause === "child_exited" ? "adapter_failure"
         : cause === "host_exited" ? "pty_host_failure"
         : cause === "provider_error" || cause === "endpoint_refused" ? "adapter_failure" : "identity_mismatch";
       const phase = currentBroker.snapshotProjectionInput().lifecycle.phase;
~~~

324-child-map-red.log · 5c09ad5d398a09533893e8676a87061695cafb5a450db640d121dc47f09f8878

~~~text
error: expect(received).toEqual(expected)
(lines omitted)
-     "reason": "child_failure",
+     "reason": "adapter_failure",
(lines omitted)
- Expected  - 1
+ Received  + 1
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) claude-code clean exit records child_failure {U+005B}377.17ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-     "reason": "child_failure",
+     "reason": "adapter_failure",
(lines omitted)
- Expected  - 1
+ Received  + 1
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) claude-code nonzero exit records child_failure {U+005B}569.58ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-     "reason": "child_failure",
+     "reason": "adapter_failure",
(lines omitted)
- Expected  - 1
+ Received  + 1
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) claude-code signalled exit records child_failure {U+005B}386.76ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-     "reason": "child_failure",
+     "reason": "adapter_failure",
(lines omitted)
- Expected  - 1
+ Received  + 1
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) madv-surface clean exit records child_failure {U+005B}543.41ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 325-child-map-restore.log · aff3dd4a362b5f865e1fb44e90449c20354f66522a140a774d35cf8543e225cf

~~~text
(pass) claude-code before activation reports child_exited {U+005B}1025.28ms{U+005D}
(pass) claude-code before activation reports host_exited {U+005B}588.03ms{U+005D}
(pass) claude-code drained alone leaves the monitor active {U+005B}3.30ms{U+005D}
(pass) madv-surface before activation reports child_exited {U+005B}429.83ms{U+005D}
(pass) madv-surface before activation reports host_exited {U+005B}416.78ms{U+005D}
(pass) madv-surface drained alone leaves the monitor active {U+005B}2.43ms{U+005D}
(fail) claude-code clean exit records child_failure {U+005B}377.17ms{U+005D}
(pass) claude-code host end records pty_host_failure {U+005B}330.21ms{U+005D}
(fail) claude-code nonzero exit records child_failure {U+005B}569.58ms{U+005D}
(fail) claude-code signalled exit records child_failure {U+005B}386.76ms{U+005D}
(pass) claude-code malformed partial line records identity_mismatch {U+005B}377.06ms{U+005D}
(fail) madv-surface clean exit records child_failure {U+005B}543.41ms{U+005D}
(pass) madv-surface host end records pty_host_failure {U+005B}446.27ms{U+005D}
(pass) madv-surface nonzero exit records adapter_failure {U+005B}399.18ms{U+005D}
(pass) madv-surface malformed partial line records identity_mismatch {U+005B}682.27ms{U+005D}
(pass) madv-surface pending request records identity_mismatch {U+005B}626.22ms{U+005D}
(pass) madv-surface open tool records identity_mismatch {U+005B}635.12ms{U+005D}
(pass) Founder close on the active composition records no interruption {U+005B}306.00ms{U+005D}
git status --porcelain -- packages/supervisor/src/build.ts
HEAD 0b329d97e88a13bd58902fe7dd1afe971d52c61bbf310862230465fd1fdd3553 packages/supervisor/src/build.ts
restored 0b329d97e88a13bd58902fe7dd1afe971d52c61bbf310862230465fd1fdd3553 packages/supervisor/src/build.ts
~~~

### 326-claude-eof-diff

326-claude-eof-diff.log · 002fe600e765463fd4a4e28161f1e75f4cb1fe0aa53ad2e5c4c1bc913af0cefd

~~~text
diff --git a/packages/adapter-claude-code/src/live.ts b/packages/adapter-claude-code/src/live.ts
index 9166b9d..80433b0 100644
--- a/packages/adapter-claude-code/src/live.ts
+++ b/packages/adapter-claude-code/src/live.ts
@@ -166,7 +166,7 @@ export function attestClaudeSession(input: Input, reserveWrite: () => boolean =
         }
         if (failed) break;
       }
-      if (!failed) stop(reader.complete ? "host_exited" : reader.finish() ?? "attestation_missing");
+      if (!failed) stop(reader.complete ? "child_exited" : reader.finish() ?? "attestation_missing");
     } catch { stop("attestation_malformed"); }
     finally {
       clearTimeout(timer);
~~~

329-claude-eof-red.log · 14c885a40a64500d6999a83dc33b7ea7ce26e554c50c93cf78bae4e7185f0544

~~~text
error: expect(received).toBe(expected)
(lines omitted)
Expected: "step=reattest execution=builder failure=reattestation_failed surface=claude-code cause=host_exited"
Received: "step=reattest execution=builder failure=reattestation_failed surface=claude-code cause=child_exited"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:16:27)
(fail) claude-code before activation reports host_exited {U+005B}393.83ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-     "detail": "claude-code: host_exited",
-     "reason": "pty_host_failure",
+     "detail": "claude-code: child_exited",
+     "reason": "child_failure",
(lines omitted)
- Expected  - 2
+ Received  + 2
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) claude-code host end records pty_host_failure {U+005B}315.95ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 330-claude-eof-restore.log · 9f538b447dd44284d3d47ecd29ac812741fae8bb9b0addd1d64d4e27c9510303

~~~text
(pass) claude-code before activation reports child_exited {U+005B}811.53ms{U+005D}
(fail) claude-code before activation reports host_exited {U+005B}393.83ms{U+005D}
(pass) claude-code drained alone leaves the monitor active {U+005B}2.75ms{U+005D}
(pass) madv-surface before activation reports child_exited {U+005B}575.75ms{U+005D}
(pass) madv-surface before activation reports host_exited {U+005B}566.75ms{U+005D}
(pass) madv-surface drained alone leaves the monitor active {U+005B}2.52ms{U+005D}
(pass) claude-code clean exit records child_failure {U+005B}634.16ms{U+005D}
(fail) claude-code host end records pty_host_failure {U+005B}315.95ms{U+005D}
(pass) claude-code nonzero exit records child_failure {U+005B}562.71ms{U+005D}
(pass) claude-code signalled exit records child_failure {U+005B}581.36ms{U+005D}
(pass) claude-code malformed partial line records identity_mismatch {U+005B}467.70ms{U+005D}
(pass) madv-surface clean exit records child_failure {U+005B}414.40ms{U+005D}
(pass) madv-surface host end records pty_host_failure {U+005B}584.93ms{U+005D}
(pass) madv-surface nonzero exit records adapter_failure {U+005B}714.61ms{U+005D}
(pass) madv-surface malformed partial line records identity_mismatch {U+005B}470.15ms{U+005D}
(pass) madv-surface pending request records identity_mismatch {U+005B}381.08ms{U+005D}
(pass) madv-surface open tool records identity_mismatch {U+005B}705.76ms{U+005D}
(pass) Founder close on the active composition records no interruption {U+005B}476.01ms{U+005D}
git status --porcelain -- packages/adapter-claude-code/src/live.ts
HEAD abf43fe5176d268d3300b9427024eedaee14398c3c7d98b143e3221bd7b9c4f5 packages/adapter-claude-code/src/live.ts
restored abf43fe5176d268d3300b9427024eedaee14398c3c7d98b143e3221bd7b9c4f5 packages/adapter-claude-code/src/live.ts
~~~

### 331-madv-eof-diff

331-madv-eof-diff.log · c81778bcde33bfd59182a32b1f43325641cc834db9a8239ad6cb1ed4eb69a470

~~~text
diff --git a/packages/adapter-madv-surface/src/live.ts b/packages/adapter-madv-surface/src/live.ts
index ca58ec8..b816944 100644
--- a/packages/adapter-madv-surface/src/live.ts
+++ b/packages/adapter-madv-surface/src/live.ts
@@ -84,7 +84,7 @@ export function attestMadvSession(input: Input, reserveWrite: () => boolean = ()
         if (failure) break;
       }
       if (!failure) {
-        if (ready) stop("host_exited");
+        if (ready) stop("child_exited");
         else inspect(parser.finish(0));
       }
     } catch { stop("identity_mismatch", "malformed_stream"); }
~~~

334-madv-eof-red.log · f4b28cbae38700c43baf5e988f0465704f51b933cd89785ff965d8f31b575705

~~~text
error: expect(received).toBe(expected)
(lines omitted)
Expected: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=host_exited"
Received: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=child_exited"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:16:27)
(fail) madv-surface before activation reports host_exited {U+005B}394.43ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-     "detail": "madv-surface: host_exited",
-     "reason": "pty_host_failure",
+     "detail": "madv-surface: child_exited",
+     "reason": "child_failure",
(lines omitted)
- Expected  - 2
+ Received  + 2
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) madv-surface host end records pty_host_failure {U+005B}323.84ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 335-madv-eof-restore.log · 8ff8644a28c69c530ba3cf6db3c2aa786fde647d4e77415b3f882991afba50b2

~~~text
(pass) claude-code before activation reports child_exited {U+005B}530.83ms{U+005D}
(pass) claude-code before activation reports host_exited {U+005B}401.96ms{U+005D}
(pass) claude-code drained alone leaves the monitor active {U+005B}2.75ms{U+005D}
(pass) madv-surface before activation reports child_exited {U+005B}426.29ms{U+005D}
(fail) madv-surface before activation reports host_exited {U+005B}394.43ms{U+005D}
(pass) madv-surface drained alone leaves the monitor active {U+005B}2.43ms{U+005D}
(pass) claude-code clean exit records child_failure {U+005B}388.22ms{U+005D}
(pass) claude-code host end records pty_host_failure {U+005B}316.30ms{U+005D}
(pass) claude-code nonzero exit records child_failure {U+005B}372.14ms{U+005D}
(pass) claude-code signalled exit records child_failure {U+005B}376.81ms{U+005D}
(pass) claude-code malformed partial line records identity_mismatch {U+005B}385.72ms{U+005D}
(pass) madv-surface clean exit records child_failure {U+005B}379.38ms{U+005D}
(fail) madv-surface host end records pty_host_failure {U+005B}323.84ms{U+005D}
(pass) madv-surface nonzero exit records adapter_failure {U+005B}371.74ms{U+005D}
(pass) madv-surface malformed partial line records identity_mismatch {U+005B}388.04ms{U+005D}
(pass) madv-surface pending request records identity_mismatch {U+005B}416.51ms{U+005D}
(pass) madv-surface open tool records identity_mismatch {U+005B}385.37ms{U+005D}
(pass) Founder close on the active composition records no interruption {U+005B}311.13ms{U+005D}
git status --porcelain -- packages/adapter-madv-surface/src/live.ts
HEAD dcc046c3b6182eba21444022dc0ced6630061d2bf64bfd1fc2a2ae04f511cb05 packages/adapter-madv-surface/src/live.ts
restored dcc046c3b6182eba21444022dc0ced6630061d2bf64bfd1fc2a2ae04f511cb05 packages/adapter-madv-surface/src/live.ts
~~~

### 336-claude-drain-diff

336-claude-drain-diff.log · 0d1b7ba78c3be3bb47fee29d7be93e25e30ee37c2f15d1940e030b56d8230008

~~~text
diff --git a/packages/adapter-claude-code/src/live.ts b/packages/adapter-claude-code/src/live.ts
index 9166b9d..734a66a 100644
--- a/packages/adapter-claude-code/src/live.ts
+++ b/packages/adapter-claude-code/src/live.ts
@@ -161,7 +161,7 @@ export function attestClaudeSession(input: Input, reserveWrite: () => boolean =
           if (cause) stop(cause);
         } else if (reader.complete && fact.kind === "exited") {
           stop(reader.finish() ?? "child_exited");
-        } else if (!reader.complete && (fact.kind === "exited" || fact.kind === "drained")) {
+        } else if ((!reader.complete && fact.kind === "exited") || fact.kind === "drained") {
           stop(reader.finish() ?? "attestation_missing");
         }
         if (failed) break;
~~~

339-claude-drain-red.log · 2fb11e72c4215c2d7ae0029979824142e61acf2705042c02c956bc72bb90cc9a

~~~text
error: expect(received).toBe(expected)
(lines omitted)
Expected: "step=reattest execution=builder failure=reattestation_failed surface=claude-code cause=child_exited"
Received: "step=reattest execution=builder failure=reattestation_failed surface=claude-code cause=attestation_missing"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:16:27)
(fail) claude-code before activation reports child_exited {U+005B}473.77ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
- {U+005B}{U+005D}
+ {U+005B}
+   "attestation_missing",
+ {U+005D}
(lines omitted)
- Expected  - 1
+ Received  + 3
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:31:27)
(fail) claude-code drained alone leaves the monitor active {U+005B}1.81ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-     "detail": "claude-code: child_exited",
-     "reason": "child_failure",
+     "detail": "claude-code: attestation_missing",
+     "reason": "identity_mismatch",
(lines omitted)
- Expected  - 2
+ Received  + 2
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) claude-code clean exit records child_failure {U+005B}369.76ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-     "detail": "claude-code: child_exited",
-     "reason": "child_failure",
+     "detail": "claude-code: attestation_missing",
+     "reason": "identity_mismatch",
(lines omitted)
- Expected  - 2
+ Received  + 2
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) claude-code nonzero exit records child_failure {U+005B}402.63ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-     "detail": "claude-code: child_exited",
-     "reason": "child_failure",
+     "detail": "claude-code: attestation_missing",
+     "reason": "identity_mismatch",
(lines omitted)
- Expected  - 2
+ Received  + 2
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) claude-code signalled exit records child_failure {U+005B}400.56ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 340-claude-drain-restore.log · 6de3e4d9c61d50fb62556be6eaf6233ff49b51e88cbc722027302ba9f0199893

~~~text
(fail) claude-code before activation reports child_exited {U+005B}473.77ms{U+005D}
(pass) claude-code before activation reports host_exited {U+005B}412.38ms{U+005D}
(fail) claude-code drained alone leaves the monitor active {U+005B}1.81ms{U+005D}
(pass) madv-surface before activation reports child_exited {U+005B}435.10ms{U+005D}
(pass) madv-surface before activation reports host_exited {U+005B}368.39ms{U+005D}
(pass) madv-surface drained alone leaves the monitor active {U+005B}2.47ms{U+005D}
(fail) claude-code clean exit records child_failure {U+005B}369.76ms{U+005D}
(pass) claude-code host end records pty_host_failure {U+005B}371.02ms{U+005D}
(fail) claude-code nonzero exit records child_failure {U+005B}402.63ms{U+005D}
(fail) claude-code signalled exit records child_failure {U+005B}400.56ms{U+005D}
(pass) claude-code malformed partial line records identity_mismatch {U+005B}399.84ms{U+005D}
(pass) madv-surface clean exit records child_failure {U+005B}388.46ms{U+005D}
(pass) madv-surface host end records pty_host_failure {U+005B}309.01ms{U+005D}
(pass) madv-surface nonzero exit records adapter_failure {U+005B}380.98ms{U+005D}
(pass) madv-surface malformed partial line records identity_mismatch {U+005B}396.92ms{U+005D}
(pass) madv-surface pending request records identity_mismatch {U+005B}378.88ms{U+005D}
(pass) madv-surface open tool records identity_mismatch {U+005B}383.37ms{U+005D}
(pass) Founder close on the active composition records no interruption {U+005B}334.66ms{U+005D}
git status --porcelain -- packages/adapter-claude-code/src/live.ts
HEAD abf43fe5176d268d3300b9427024eedaee14398c3c7d98b143e3221bd7b9c4f5 packages/adapter-claude-code/src/live.ts
restored abf43fe5176d268d3300b9427024eedaee14398c3c7d98b143e3221bd7b9c4f5 packages/adapter-claude-code/src/live.ts
~~~

### 341-madv-drain-diff

341-madv-drain-diff.log · 6351aac600818ad44e852900909d394d35b3200a1558940670e6a8b74c22d1f7

~~~text
diff --git a/packages/adapter-madv-surface/src/live.ts b/packages/adapter-madv-surface/src/live.ts
index ca58ec8..32a991a 100644
--- a/packages/adapter-madv-surface/src/live.ts
+++ b/packages/adapter-madv-surface/src/live.ts
@@ -71,6 +71,7 @@ export function attestMadvSession(input: Input, reserveWrite: () => boolean = ()
         if (failure) break;
         if (!ready && performance.now() >= deadline) { stop("attestation_deadline"); break; }
         if (fact.kind === "output" && fact.bytes) inspect(parser.push(fact.bytes));
+        if (ready && fact.kind === "drained") stop("child_exited");
         if (fact.kind === "exited") {
           const handedOver = ready;
           const exitCode = fact.code ?? 1;
~~~

344-madv-drain-red.log · 3dbc315e54c8064b79f60a156716a7e7a64f4951ce6ab89ba0dc7135e79f625b

~~~text
error: expect(received).toEqual(expected)
(lines omitted)
- {U+005B}{U+005D}
+ {U+005B}
+   "child_exited",
+ {U+005D}
(lines omitted)
- Expected  - 1
+ Received  + 3
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:31:27)
(fail) madv-surface drained alone leaves the monitor active {U+005B}1.48ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-     "detail": "madv-surface: provider_error",
-     "reason": "adapter_failure",
+     "detail": "madv-surface: child_exited",
+     "reason": "child_failure",
(lines omitted)
- Expected  - 2
+ Received  + 2
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) madv-surface nonzero exit records adapter_failure {U+005B}385.28ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-     "detail": "madv-surface: identity_mismatch",
-     "reason": "identity_mismatch",
+     "detail": "madv-surface: child_exited",
+     "reason": "child_failure",
(lines omitted)
- Expected  - 2
+ Received  + 2
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) madv-surface malformed partial line records identity_mismatch {U+005B}396.49ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-     "detail": "madv-surface: identity_unavailable",
-     "reason": "identity_mismatch",
+     "detail": "madv-surface: child_exited",
+     "reason": "child_failure",
(lines omitted)
- Expected  - 2
+ Received  + 2
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) madv-surface pending request records identity_mismatch {U+005B}372.52ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-     "detail": "madv-surface: identity_mismatch",
-     "reason": "identity_mismatch",
+     "detail": "madv-surface: child_exited",
+     "reason": "child_failure",
(lines omitted)
- Expected  - 2
+ Received  + 2
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) madv-surface open tool records identity_mismatch {U+005B}398.74ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 345-madv-drain-restore.log · b36dd28968829abf21237bb6f9de487d98cac2ac10bf71c891101cf2836de04d

~~~text
(pass) claude-code before activation reports child_exited {U+005B}566.74ms{U+005D}
(pass) claude-code before activation reports host_exited {U+005B}392.48ms{U+005D}
(pass) claude-code drained alone leaves the monitor active {U+005B}2.73ms{U+005D}
(pass) madv-surface before activation reports child_exited {U+005B}419.86ms{U+005D}
(pass) madv-surface before activation reports host_exited {U+005B}401.60ms{U+005D}
(fail) madv-surface drained alone leaves the monitor active {U+005B}1.48ms{U+005D}
(pass) claude-code clean exit records child_failure {U+005B}383.06ms{U+005D}
(pass) claude-code host end records pty_host_failure {U+005B}323.49ms{U+005D}
(pass) claude-code nonzero exit records child_failure {U+005B}368.47ms{U+005D}
(pass) claude-code signalled exit records child_failure {U+005B}406.96ms{U+005D}
(pass) claude-code malformed partial line records identity_mismatch {U+005B}389.71ms{U+005D}
(pass) madv-surface clean exit records child_failure {U+005B}387.42ms{U+005D}
(pass) madv-surface host end records pty_host_failure {U+005B}331.04ms{U+005D}
(fail) madv-surface nonzero exit records adapter_failure {U+005B}385.28ms{U+005D}
(fail) madv-surface malformed partial line records identity_mismatch {U+005B}396.49ms{U+005D}
(fail) madv-surface pending request records identity_mismatch {U+005B}372.52ms{U+005D}
(fail) madv-surface open tool records identity_mismatch {U+005B}398.74ms{U+005D}
(pass) Founder close on the active composition records no interruption {U+005B}301.46ms{U+005D}
git status --porcelain -- packages/adapter-madv-surface/src/live.ts
HEAD dcc046c3b6182eba21444022dc0ced6630061d2bf64bfd1fc2a2ae04f511cb05 packages/adapter-madv-surface/src/live.ts
restored dcc046c3b6182eba21444022dc0ced6630061d2bf64bfd1fc2a2ae04f511cb05 packages/adapter-madv-surface/src/live.ts
~~~

### 346-claude-finish-diff

346-claude-finish-diff.log · ff24e394b4a3794e7220e866f627244b71d0f2580be78858f9a0eee86d6352a4

~~~text
diff --git a/packages/adapter-claude-code/src/live.ts b/packages/adapter-claude-code/src/live.ts
index 9166b9d..393c6a7 100644
--- a/packages/adapter-claude-code/src/live.ts
+++ b/packages/adapter-claude-code/src/live.ts
@@ -160,7 +160,7 @@ export function attestClaudeSession(input: Input, reserveWrite: () => boolean =
           const cause = reader.push(fact.bytes);
           if (cause) stop(cause);
         } else if (reader.complete && fact.kind === "exited") {
-          stop(reader.finish() ?? "child_exited");
+          stop("child_exited");
         } else if (!reader.complete && (fact.kind === "exited" || fact.kind === "drained")) {
           stop(reader.finish() ?? "attestation_missing");
         }
~~~

349-claude-finish-red.log · d9c95d26278f13f8627e9a9ac1bf1698c9526c15f15681bf9e40d542b2376127

~~~text
error: expect(received).toEqual(expected)
(lines omitted)
-     "detail": "claude-code: attestation_malformed",
-     "reason": "identity_mismatch",
+     "detail": "claude-code: child_exited",
+     "reason": "child_failure",
(lines omitted)
- Expected  - 2
+ Received  + 2
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) claude-code malformed partial line records identity_mismatch {U+005B}387.18ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 350-claude-finish-restore.log · 25da19a08fd8a1558c7a6924ca9d897547b59bc6bd8055c6e3bca0fdbd997d1a

~~~text
(pass) claude-code before activation reports child_exited {U+005B}443.48ms{U+005D}
(pass) claude-code before activation reports host_exited {U+005B}400.95ms{U+005D}
(pass) claude-code drained alone leaves the monitor active {U+005B}2.78ms{U+005D}
(pass) madv-surface before activation reports child_exited {U+005B}432.98ms{U+005D}
(pass) madv-surface before activation reports host_exited {U+005B}387.85ms{U+005D}
(pass) madv-surface drained alone leaves the monitor active {U+005B}2.41ms{U+005D}
(pass) claude-code clean exit records child_failure {U+005B}386.59ms{U+005D}
(pass) claude-code host end records pty_host_failure {U+005B}317.74ms{U+005D}
(pass) claude-code nonzero exit records child_failure {U+005B}373.00ms{U+005D}
(pass) claude-code signalled exit records child_failure {U+005B}377.52ms{U+005D}
(fail) claude-code malformed partial line records identity_mismatch {U+005B}387.18ms{U+005D}
(pass) madv-surface clean exit records child_failure {U+005B}385.83ms{U+005D}
(pass) madv-surface host end records pty_host_failure {U+005B}324.87ms{U+005D}
(pass) madv-surface nonzero exit records adapter_failure {U+005B}368.93ms{U+005D}
(pass) madv-surface malformed partial line records identity_mismatch {U+005B}384.66ms{U+005D}
(pass) madv-surface pending request records identity_mismatch {U+005B}380.90ms{U+005D}
(pass) madv-surface open tool records identity_mismatch {U+005B}368.70ms{U+005D}
(pass) Founder close on the active composition records no interruption {U+005B}319.41ms{U+005D}
git status --porcelain -- packages/adapter-claude-code/src/live.ts
HEAD abf43fe5176d268d3300b9427024eedaee14398c3c7d98b143e3221bd7b9c4f5 packages/adapter-claude-code/src/live.ts
restored abf43fe5176d268d3300b9427024eedaee14398c3c7d98b143e3221bd7b9c4f5 packages/adapter-claude-code/src/live.ts
~~~

### 351-madv-finish-diff

351-madv-finish-diff.log · ffa6ef6a10bd65f3910812a45e99f0c3f43062056b246b66149252c15f586550

~~~text
diff --git a/packages/adapter-madv-surface/src/live.ts b/packages/adapter-madv-surface/src/live.ts
index ca58ec8..2d0c1f1 100644
--- a/packages/adapter-madv-surface/src/live.ts
+++ b/packages/adapter-madv-surface/src/live.ts
@@ -73,6 +73,7 @@ export function attestMadvSession(input: Input, reserveWrite: () => boolean = ()
         if (fact.kind === "output" && fact.bytes) inspect(parser.push(fact.bytes));
         if (fact.kind === "exited") {
           const handedOver = ready;
+          if (handedOver) { stop("child_exited"); return; }
           const exitCode = fact.code ?? 1;
           const result = parser.finish(exitCode, fact.signal ?? null);
           const detection = detectMadvFailure(input.registration.auth_failure_detection, { kind: "child_exit", exitCode });
~~~

354-madv-finish-red.log · 89bd47cd2e66d70a4893a8bdfadd65426e368bb4ff172508557139867f686a22

~~~text
error: expect(received).toEqual(expected)
(lines omitted)
-     "detail": "madv-surface: provider_error",
-     "reason": "adapter_failure",
+     "detail": "madv-surface: child_exited",
+     "reason": "child_failure",
(lines omitted)
- Expected  - 2
+ Received  + 2
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) madv-surface nonzero exit records adapter_failure {U+005B}381.94ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-     "detail": "madv-surface: identity_mismatch",
-     "reason": "identity_mismatch",
+     "detail": "madv-surface: child_exited",
+     "reason": "child_failure",
(lines omitted)
- Expected  - 2
+ Received  + 2
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) madv-surface malformed partial line records identity_mismatch {U+005B}386.28ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-     "detail": "madv-surface: identity_unavailable",
-     "reason": "identity_mismatch",
+     "detail": "madv-surface: child_exited",
+     "reason": "child_failure",
(lines omitted)
- Expected  - 2
+ Received  + 2
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) madv-surface pending request records identity_mismatch {U+005B}388.26ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-     "detail": "madv-surface: identity_mismatch",
-     "reason": "identity_mismatch",
+     "detail": "madv-surface: child_exited",
+     "reason": "child_failure",
(lines omitted)
- Expected  - 2
+ Received  + 2
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) madv-surface open tool records identity_mismatch {U+005B}371.65ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 355-madv-finish-restore.log · dab49ce2b9814f71cfbfc2ab2a84e529afba9d91a68786108a6917af959d0454

~~~text
(pass) claude-code before activation reports child_exited {U+005B}527.84ms{U+005D}
(pass) claude-code before activation reports host_exited {U+005B}432.06ms{U+005D}
(pass) claude-code drained alone leaves the monitor active {U+005B}2.77ms{U+005D}
(pass) madv-surface before activation reports child_exited {U+005B}416.71ms{U+005D}
(pass) madv-surface before activation reports host_exited {U+005B}384.11ms{U+005D}
(pass) madv-surface drained alone leaves the monitor active {U+005B}2.45ms{U+005D}
(pass) claude-code clean exit records child_failure {U+005B}385.22ms{U+005D}
(pass) claude-code host end records pty_host_failure {U+005B}295.62ms{U+005D}
(pass) claude-code nonzero exit records child_failure {U+005B}359.81ms{U+005D}
(pass) claude-code signalled exit records child_failure {U+005B}370.35ms{U+005D}
(pass) claude-code malformed partial line records identity_mismatch {U+005B}374.79ms{U+005D}
(pass) madv-surface clean exit records child_failure {U+005B}410.94ms{U+005D}
(pass) madv-surface host end records pty_host_failure {U+005B}326.07ms{U+005D}
(fail) madv-surface nonzero exit records adapter_failure {U+005B}381.94ms{U+005D}
(fail) madv-surface malformed partial line records identity_mismatch {U+005B}386.28ms{U+005D}
(fail) madv-surface pending request records identity_mismatch {U+005B}388.26ms{U+005D}
(fail) madv-surface open tool records identity_mismatch {U+005B}371.65ms{U+005D}
(pass) Founder close on the active composition records no interruption {U+005B}311.19ms{U+005D}
git status --porcelain -- packages/adapter-madv-surface/src/live.ts
HEAD dcc046c3b6182eba21444022dc0ced6630061d2bf64bfd1fc2a2ae04f511cb05 packages/adapter-madv-surface/src/live.ts
restored dcc046c3b6182eba21444022dc0ced6630061d2bf64bfd1fc2a2ae04f511cb05 packages/adapter-madv-surface/src/live.ts
~~~

### 356-early-cause-diff

356-early-cause-diff.log · f501d3778c790fce889d2a9a306087fe9c3532103525de215e6aa88301332090

~~~text
diff --git a/packages/supervisor/src/build.ts b/packages/supervisor/src/build.ts
index e216d06..c3b7936 100644
--- a/packages/supervisor/src/build.ts
+++ b/packages/supervisor/src/build.ts
@@ -145,7 +145,7 @@ export interface LiveBuildInput extends BuildInput {

 // Use only build-owned literals in ledger and caller-visible detail.
 function liveFailureCause(surface: SurfaceId, reported: unknown): string {
-  const shared = {U+005B}"child_exited", "host_exited", "auth_failed", "identity_mismatch", "attestation_deadline", "attestation_cancelled",
+  const shared = {U+005B}"host_exited", "auth_failed", "identity_mismatch", "attestation_deadline", "attestation_cancelled",
     "attestation_tool_call", "attestation_round_trips", "attestation_budget_exhausted"{U+005D};
   const specific = surface === "madv-surface"
     ? {U+005B}"endpoint_refused", "provider_error", "identity_unavailable", "model_refused", "domain_unresolved"{U+005D}
~~~

359-early-cause-red.log · 1c36b661cde48f026cd95b03d06af456ad69e8b09fcbbcc28f1262bdefac920a

~~~text
error: expect(received).toBe(expected)
(lines omitted)
Expected: "step=reattest execution=builder failure=reattestation_failed surface=claude-code cause=child_exited"
Received: "step=reattest execution=builder failure=reattestation_failed surface=claude-code cause=attestation_malformed"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:16:27)
(fail) claude-code before activation reports child_exited {U+005B}572.74ms{U+005D}
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
Expected: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=child_exited"
Received: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=identity_mismatch"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:16:27)
(fail) madv-surface before activation reports child_exited {U+005B}416.73ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-     "detail": "claude-code: child_exited",
-     "reason": "child_failure",
+     "detail": "claude-code: attestation_malformed",
+     "reason": "identity_mismatch",
(lines omitted)
- Expected  - 2
+ Received  + 2
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) claude-code clean exit records child_failure {U+005B}384.84ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-     "detail": "claude-code: child_exited",
-     "reason": "child_failure",
+     "detail": "claude-code: attestation_malformed",
+     "reason": "identity_mismatch",
(lines omitted)
- Expected  - 2
+ Received  + 2
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) claude-code nonzero exit records child_failure {U+005B}399.35ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-     "detail": "claude-code: child_exited",
-     "reason": "child_failure",
+     "detail": "claude-code: attestation_malformed",
+     "reason": "identity_mismatch",
(lines omitted)
- Expected  - 2
+ Received  + 2
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) claude-code signalled exit records child_failure {U+005B}386.97ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-     "detail": "madv-surface: child_exited",
-     "reason": "child_failure",
+     "detail": "madv-surface: identity_mismatch",
+     "reason": "identity_mismatch",
(lines omitted)
- Expected  - 2
+ Received  + 2
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:45:30)
(fail) madv-surface clean exit records child_failure {U+005B}384.62ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 360-early-cause-restore.log · 8e5513e30c9c0d0644adb198bdc0136a857323cefc768cceda9eabdb497ea4e5

~~~text
(fail) claude-code before activation reports child_exited {U+005B}572.74ms{U+005D}
(pass) claude-code before activation reports host_exited {U+005B}398.58ms{U+005D}
(pass) claude-code drained alone leaves the monitor active {U+005B}2.87ms{U+005D}
(fail) madv-surface before activation reports child_exited {U+005B}416.73ms{U+005D}
(pass) madv-surface before activation reports host_exited {U+005B}413.86ms{U+005D}
(pass) madv-surface drained alone leaves the monitor active {U+005B}2.42ms{U+005D}
(fail) claude-code clean exit records child_failure {U+005B}384.84ms{U+005D}
(pass) claude-code host end records pty_host_failure {U+005B}312.52ms{U+005D}
(fail) claude-code nonzero exit records child_failure {U+005B}399.35ms{U+005D}
(fail) claude-code signalled exit records child_failure {U+005B}386.97ms{U+005D}
(pass) claude-code malformed partial line records identity_mismatch {U+005B}373.61ms{U+005D}
(fail) madv-surface clean exit records child_failure {U+005B}384.62ms{U+005D}
(pass) madv-surface host end records pty_host_failure {U+005B}335.15ms{U+005D}
(pass) madv-surface nonzero exit records adapter_failure {U+005B}404.99ms{U+005D}
(pass) madv-surface malformed partial line records identity_mismatch {U+005B}388.28ms{U+005D}
(pass) madv-surface pending request records identity_mismatch {U+005B}405.01ms{U+005D}
(pass) madv-surface open tool records identity_mismatch {U+005B}395.09ms{U+005D}
(pass) Founder close on the active composition records no interruption {U+005B}320.83ms{U+005D}
git status --porcelain -- packages/supervisor/src/build.ts
HEAD 0b329d97e88a13bd58902fe7dd1afe971d52c61bbf310862230465fd1fdd3553 packages/supervisor/src/build.ts
restored 0b329d97e88a13bd58902fe7dd1afe971d52c61bbf310862230465fd1fdd3553 packages/supervisor/src/build.ts
~~~

### 361-founder-close-diff

361-founder-close-diff.log · 0e8675b0fad244979fc33ed5da8b0d83cf08718506cb569ca95118586b71ff49

~~~text
diff --git a/apps/madbridge/src/tui/live/composition.ts b/apps/madbridge/src/tui/live/composition.ts
index 49a5092..bf52942 100644
--- a/apps/madbridge/src/tui/live/composition.ts
+++ b/apps/madbridge/src/tui/live/composition.ts
@@ -42,7 +42,7 @@ export function createStartAttesters(): LiveBuildInput{U+005B}"attesterFor"{U+005D} {

 async function closeActive(state: PartialBuildState): Promise<void> {
   const phase = (await state.client!.getSnapshot()).phase;
-  if (phase === "active" || phase === "paused") await state.broker!.founderClose(crypto.randomUUID());
+  if (phase === "active" || phase === "paused") await state.broker!.interrupt("child_failure", "synthetic interruption", "high", crypto.randomUUID(), null, null);
   for (const host of state.hosts) {
     for await (const _ of host.handle.facts()) { /* Wait for host exit before releasing the ledger. */ }
   }
~~~

364-founder-close-red.log · f2175b3e0ed576452a5806acde6f7dee97f68a44266f42b70094fdaeea7d32cd

~~~text
error: expect(received).toBe(expected)
(lines omitted)
Expected: "founder"
Received: "interruption"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/child-end.test.ts:54:23)
(fail) Founder close on the active composition records no interruption {U+005B}320.48ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 365-founder-close-restore.log · e4e5f8a0a373b4c850ede4be2241d3e641ee30dc0c5813e38c09e848cd66084b

~~~text
(pass) claude-code before activation reports child_exited {U+005B}495.28ms{U+005D}
(pass) claude-code before activation reports host_exited {U+005B}396.63ms{U+005D}
(pass) claude-code drained alone leaves the monitor active {U+005B}2.81ms{U+005D}
(pass) madv-surface before activation reports child_exited {U+005B}413.68ms{U+005D}
(pass) madv-surface before activation reports host_exited {U+005B}384.42ms{U+005D}
(pass) madv-surface drained alone leaves the monitor active {U+005B}2.47ms{U+005D}
(pass) claude-code clean exit records child_failure {U+005B}403.14ms{U+005D}
(pass) claude-code host end records pty_host_failure {U+005B}353.33ms{U+005D}
(pass) claude-code nonzero exit records child_failure {U+005B}374.15ms{U+005D}
(pass) claude-code signalled exit records child_failure {U+005B}460.28ms{U+005D}
(pass) claude-code malformed partial line records identity_mismatch {U+005B}379.28ms{U+005D}
(pass) madv-surface clean exit records child_failure {U+005B}387.42ms{U+005D}
(pass) madv-surface host end records pty_host_failure {U+005B}349.12ms{U+005D}
(pass) madv-surface nonzero exit records adapter_failure {U+005B}385.04ms{U+005D}
(pass) madv-surface malformed partial line records identity_mismatch {U+005B}386.88ms{U+005D}
(pass) madv-surface pending request records identity_mismatch {U+005B}379.62ms{U+005D}
(pass) madv-surface open tool records identity_mismatch {U+005B}376.37ms{U+005D}
(fail) Founder close on the active composition records no interruption {U+005B}320.48ms{U+005D}
git status --porcelain -- apps/madbridge/src/tui/live/composition.ts
HEAD e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
restored e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
~~~

### 378-retry-match-diff

378-retry-match-diff.log · 83e727389ba6c2dff612f9789ecc8a8366a9ea14760935c7f396c20f39d576a3

~~~text
diff --git a/packages/adapter-claude-code/src/detectors.ts b/packages/adapter-claude-code/src/detectors.ts
index 040efda..dcb3cd7 100644
--- a/packages/adapter-claude-code/src/detectors.ts
+++ b/packages/adapter-claude-code/src/detectors.ts
@@ -12,6 +12,6 @@ export function detectClaudeFailure(rules: readonly string{U+005B}{U+005D}, observation: Obser
       return { surface: "claude-code", cause: "identity_mismatch" };
     }
     if (event.type === "system" && event.subtype === "api_retry" && typeof event.error === "string" &&
-      rules.includes("system/api_retry.error:" + event.error)) return { surface: "claude-code", cause: "auth_failed" };
+      true) return { surface: "claude-code", cause: "auth_failed" };
   }
 }
~~~

381-retry-match-red.log · 8894cfc11b817c3e9deaeb704b0a7cfeb74f1fd622fd20a38ff3d2f28c13985d

~~~text
error: expect(received).toBe(expected)
(lines omitted)
Expected: true
Received: false
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-claude-code/test/retry.test.ts:20:33)
(fail) an unregistered api_retry error preserves the attestation {U+005B}1.31ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-   "identity_mismatch",
+   "auth_failed",
(lines omitted)
- Expected  - 1
+ Received  + 1
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-claude-code/test/retry.test.ts:27:29)
(fail) an unregistered api_retry error preserves the active monitor {U+005B}1.52ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 382-retry-match-restore.log · b801b5b8f50ca68af908577604d5b56036d00271ef79b99fffe63ee6e30fe526

~~~text
(fail) an unregistered api_retry error preserves the attestation {U+005B}1.31ms{U+005D}
(fail) an unregistered api_retry error preserves the active monitor {U+005B}1.52ms{U+005D}
git status --porcelain -- packages/adapter-claude-code/src/detectors.ts
HEAD 392e5916ec42785dc516af01234875e623c2537762fc998218869c53f92619b0 packages/adapter-claude-code/src/detectors.ts
restored 392e5916ec42785dc516af01234875e623c2537762fc998218869c53f92619b0 packages/adapter-claude-code/src/detectors.ts
~~~

### 383-exit-six-diff

383-exit-six-diff.log · 4b56bd225e9fce4b0ded15312e91aa03e83db5145608510288cbd4b602698346

~~~text
diff --git a/packages/adapter-madv-surface/src/index.ts b/packages/adapter-madv-surface/src/index.ts
index c75e0db..9924ee6 100644
--- a/packages/adapter-madv-surface/src/index.ts
+++ b/packages/adapter-madv-surface/src/index.ts
@@ -223,7 +223,6 @@ export class MadvSurfaceParser {
       switch (exitCode) {
         case 0: break;
         case 5: this.fail("auth_failed", "exit"); break;
-        case 6: this.fail("endpoint_refused", "exit"); break;
         case 1: this.fail("provider_error", "exit"); break;
         case 3: this.fail("identity_unavailable", "exit"); break;
         case 7: if (this.failed?.cause !== "domain_unresolved") this.fail("model_refused", "exit"); break;
~~~

386-exit-six-red.log · 54a0b4e23d27b209efaba9546a4b44034a70433cea90b4cdef2f051526ccb14c

~~~text
error: expect(received).toBe(expected)
(lines omitted)
Expected: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=endpoint_refused"
Received: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=provider_error"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-madv-surface/test/exit-causes.test.ts:67:34)
(fail) madv code 6 gives endpoint_refused before activation {U+005B}418.24ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-   "endpoint_refused",
+   "provider_error",
(lines omitted)
- Expected  - 1
+ Received  + 1
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-madv-surface/test/exit-causes.test.ts:69:28)
(fail) madv code 6 gives endpoint_refused after activation {U+005B}336.94ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 387-exit-six-restore.log · 9bb3bee0621d77d2f17c746f450ba8126915591572dbb62f36373a8d5ecb77a3

~~~text
(pass) madv code 0 gives identity_unavailable before activation {U+005B}515.63ms{U+005D}
(pass) madv code 0 gives child_exited after activation {U+005B}309.98ms{U+005D}
(pass) madv code 1 gives provider_error before activation {U+005B}390.98ms{U+005D}
(pass) madv code 1 gives provider_error after activation {U+005B}301.27ms{U+005D}
(pass) madv code 3 gives identity_unavailable before activation {U+005B}372.01ms{U+005D}
(pass) madv code 3 gives identity_unavailable after activation {U+005B}311.85ms{U+005D}
(pass) madv code 4 gives identity_mismatch before activation {U+005B}390.50ms{U+005D}
(pass) madv code 4 gives identity_mismatch after activation {U+005B}303.49ms{U+005D}
(pass) madv code 5 gives auth_failed before activation {U+005B}411.18ms{U+005D}
(pass) madv code 5 gives auth_failed after activation {U+005B}307.01ms{U+005D}
(fail) madv code 6 gives endpoint_refused before activation {U+005B}418.24ms{U+005D}
(fail) madv code 6 gives endpoint_refused after activation {U+005B}336.94ms{U+005D}
(pass) madv code 7 gives model_refused before activation {U+005B}388.73ms{U+005D}
(pass) madv code 7 gives model_refused after activation {U+005B}305.74ms{U+005D}
(pass) madv code 42 gives provider_error before activation {U+005B}379.03ms{U+005D}
(pass) madv code 42 gives provider_error after activation {U+005B}311.22ms{U+005D}
(pass) madv signal gives provider_error before activation {U+005B}380.02ms{U+005D}
(pass) madv signal gives provider_error after activation {U+005B}335.41ms{U+005D}
git status --porcelain -- packages/adapter-madv-surface/src/index.ts
HEAD c3a4fcf9370dc3b6408d665d4b5006b311433c85e1adced552f6b1926e40082c packages/adapter-madv-surface/src/index.ts
restored c3a4fcf9370dc3b6408d665d4b5006b311433c85e1adced552f6b1926e40082c packages/adapter-madv-surface/src/index.ts
~~~

### 388-exit-dispatch-diff

388-exit-dispatch-diff.log · 7137f0ba1c2f25dd8284c27e5db8f248ad2845b6d016a116a688ce61563d9452

~~~text
diff --git a/packages/adapter-madv-surface/src/live.ts b/packages/adapter-madv-surface/src/live.ts
index ca58ec8..1ee525e 100644
--- a/packages/adapter-madv-surface/src/live.ts
+++ b/packages/adapter-madv-surface/src/live.ts
@@ -72,6 +72,7 @@ export function attestMadvSession(input: Input, reserveWrite: () => boolean = ()
         if (!ready && performance.now() >= deadline) { stop("attestation_deadline"); break; }
         if (fact.kind === "output" && fact.bytes) inspect(parser.push(fact.bytes));
         if (fact.kind === "exited") {
+          stop("attestation_cancelled"); return;
           const handedOver = ready;
           const exitCode = fact.code ?? 1;
           const result = parser.finish(exitCode, fact.signal ?? null);
~~~

391-exit-dispatch-red.log · 22946e98114b4b758a266c95d8c4a3731a7f5e89c48001103665a8ac8dab8779

~~~text
error: expect(received).toBe(expected)
(lines omitted)
Expected: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=identity_unavailable"
Received: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=attestation_cancelled"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-madv-surface/test/exit-causes.test.ts:67:34)
(fail) madv code 0 gives identity_unavailable before activation {U+005B}413.53ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-   "child_exited",
+   "attestation_cancelled",
(lines omitted)
- Expected  - 1
+ Received  + 1
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-madv-surface/test/exit-causes.test.ts:69:28)
(fail) madv code 0 gives child_exited after activation {U+005B}312.78ms{U+005D}
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
Expected: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=provider_error"
Received: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=attestation_cancelled"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-madv-surface/test/exit-causes.test.ts:67:34)
(fail) madv code 1 gives provider_error before activation {U+005B}382.41ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-   "provider_error",
+   "attestation_cancelled",
(lines omitted)
- Expected  - 1
+ Received  + 1
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-madv-surface/test/exit-causes.test.ts:69:28)
(fail) madv code 1 gives provider_error after activation {U+005B}310.07ms{U+005D}
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
Expected: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=identity_unavailable"
Received: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=attestation_cancelled"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-madv-surface/test/exit-causes.test.ts:67:34)
(fail) madv code 3 gives identity_unavailable before activation {U+005B}391.09ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-   "identity_unavailable",
+   "attestation_cancelled",
(lines omitted)
- Expected  - 1
+ Received  + 1
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-madv-surface/test/exit-causes.test.ts:69:28)
(fail) madv code 3 gives identity_unavailable after activation {U+005B}324.90ms{U+005D}
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
Expected: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=identity_mismatch"
Received: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=attestation_cancelled"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-madv-surface/test/exit-causes.test.ts:67:34)
(fail) madv code 4 gives identity_mismatch before activation {U+005B}390.41ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-   "identity_mismatch",
+   "attestation_cancelled",
(lines omitted)
- Expected  - 1
+ Received  + 1
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-madv-surface/test/exit-causes.test.ts:69:28)
(fail) madv code 4 gives identity_mismatch after activation {U+005B}307.47ms{U+005D}
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
Expected: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=auth_failed"
Received: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=attestation_cancelled"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-madv-surface/test/exit-causes.test.ts:67:34)
(fail) madv code 5 gives auth_failed before activation {U+005B}389.69ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-   "auth_failed",
+   "attestation_cancelled",
(lines omitted)
- Expected  - 1
+ Received  + 1
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-madv-surface/test/exit-causes.test.ts:69:28)
(fail) madv code 5 gives auth_failed after activation {U+005B}314.46ms{U+005D}
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
Expected: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=endpoint_refused"
Received: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=attestation_cancelled"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-madv-surface/test/exit-causes.test.ts:67:34)
(fail) madv code 6 gives endpoint_refused before activation {U+005B}387.61ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-   "endpoint_refused",
+   "attestation_cancelled",
(lines omitted)
- Expected  - 1
+ Received  + 1
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-madv-surface/test/exit-causes.test.ts:69:28)
(fail) madv code 6 gives endpoint_refused after activation {U+005B}295.44ms{U+005D}
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
Expected: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=model_refused"
Received: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=attestation_cancelled"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-madv-surface/test/exit-causes.test.ts:67:34)
(fail) madv code 7 gives model_refused before activation {U+005B}384.09ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-   "model_refused",
+   "attestation_cancelled",
(lines omitted)
- Expected  - 1
+ Received  + 1
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-madv-surface/test/exit-causes.test.ts:69:28)
(fail) madv code 7 gives model_refused after activation {U+005B}306.98ms{U+005D}
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
Expected: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=provider_error"
Received: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=attestation_cancelled"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-madv-surface/test/exit-causes.test.ts:67:34)
(fail) madv code 42 gives provider_error before activation {U+005B}412.90ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-   "provider_error",
+   "attestation_cancelled",
(lines omitted)
- Expected  - 1
+ Received  + 1
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-madv-surface/test/exit-causes.test.ts:69:28)
(fail) madv code 42 gives provider_error after activation {U+005B}310.97ms{U+005D}
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
Expected: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=provider_error"
Received: "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=attestation_cancelled"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-madv-surface/test/exit-causes.test.ts:67:34)
(fail) madv signal gives provider_error before activation {U+005B}391.98ms{U+005D}
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
-   "provider_error",
+   "attestation_cancelled",
(lines omitted)
- Expected  - 1
+ Received  + 1
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/packages/adapter-madv-surface/test/exit-causes.test.ts:69:28)
(fail) madv signal gives provider_error after activation {U+005B}307.92ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 392-exit-dispatch-restore.log · a6eed0242f3416587c3c855d72ebdaa1a308b24e1fb3eb3659022d9d10c11d36

~~~text
(fail) madv code 0 gives identity_unavailable before activation {U+005B}413.53ms{U+005D}
(fail) madv code 0 gives child_exited after activation {U+005B}312.78ms{U+005D}
(fail) madv code 1 gives provider_error before activation {U+005B}382.41ms{U+005D}
(fail) madv code 1 gives provider_error after activation {U+005B}310.07ms{U+005D}
(fail) madv code 3 gives identity_unavailable before activation {U+005B}391.09ms{U+005D}
(fail) madv code 3 gives identity_unavailable after activation {U+005B}324.90ms{U+005D}
(fail) madv code 4 gives identity_mismatch before activation {U+005B}390.41ms{U+005D}
(fail) madv code 4 gives identity_mismatch after activation {U+005B}307.47ms{U+005D}
(fail) madv code 5 gives auth_failed before activation {U+005B}389.69ms{U+005D}
(fail) madv code 5 gives auth_failed after activation {U+005B}314.46ms{U+005D}
(fail) madv code 6 gives endpoint_refused before activation {U+005B}387.61ms{U+005D}
(fail) madv code 6 gives endpoint_refused after activation {U+005B}295.44ms{U+005D}
(fail) madv code 7 gives model_refused before activation {U+005B}384.09ms{U+005D}
(fail) madv code 7 gives model_refused after activation {U+005B}306.98ms{U+005D}
(fail) madv code 42 gives provider_error before activation {U+005B}412.90ms{U+005D}
(fail) madv code 42 gives provider_error after activation {U+005B}310.97ms{U+005D}
(fail) madv signal gives provider_error before activation {U+005B}391.98ms{U+005D}
(fail) madv signal gives provider_error after activation {U+005B}307.92ms{U+005D}
git status --porcelain -- packages/adapter-madv-surface/src/live.ts
HEAD dcc046c3b6182eba21444022dc0ced6630061d2bf64bfd1fc2a2ae04f511cb05 packages/adapter-madv-surface/src/live.ts
restored dcc046c3b6182eba21444022dc0ced6630061d2bf64bfd1fc2a2ae04f511cb05 packages/adapter-madv-surface/src/live.ts
~~~

### 435-frame-break-diff

435-frame-break-diff.log · 23f30cf5fba8fee957bb01f5e26e30bbdbd2709e6535f5e9deeb4940b82470e0

~~~text
diff --git a/apps/madbridge/src/tui/live/projection.ts b/apps/madbridge/src/tui/live/projection.ts
index a6e4f4c..00188bd 100644
--- a/apps/madbridge/src/tui/live/projection.ts
+++ b/apps/madbridge/src/tui/live/projection.ts
@@ -151,7 +151,7 @@ function approvalColor(kind: PendingApprovalSnapshot{U+005B}"state"{U+005D}): ApprovalColorSta
 export function clientSnapshotToProjection(snapshot: ClientSnapshot): BrokerSnapshot {
   snapshotShape(snapshot, "snapshot");
   return {
-    connected: snapshot.connected, sessionState: snapshot.phase, ownershipState: snapshot.ownershipState?.kind ?? null,
+    connected: snapshot.connected, sessionState: snapshot.phase === "active" ? "paused" : snapshot.phase, ownershipState: snapshot.ownershipState?.kind ?? null,
     activeWriter: snapshot.activeWriterExecutionId, fencingToken: snapshot.fencingToken, task: snapshot.task,
     executions: snapshot.executions?.map(execution => execution.identity) ?? null,
     repositoryFingerprint: snapshot.repositoryFingerprint,
~~~

438-frame-break-red.log · 438d00d7cf7fcf3dc93eb592026871f7ec033c427e0ed01f7687ce7c0d520775

~~~text
error: expect(received).toContain(expected)
(lines omitted)
Expected to contain: "session active"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m2-r1/tui/test/phase3b/recorded-frames.test.tsx:18:20)
(fail) the healthy offline client's recorded stream renders activation through Founder close {U+005B}889.72ms{U+005D}
~~~

Verdicts for every test in the file and the restoration · 439-frame-break-restore.log · aabd1f2d9c529384e1e3077c8c3dd30cf74725190e39b306b4a15a97dcec5c62

~~~text
(fail) the healthy offline client's recorded stream renders activation through Founder close {U+005B}889.72ms{U+005D}
git status --porcelain -- apps/madbridge/src/tui/live/projection.ts
HEAD 9a9a39d8c2b32bfd6327e49a461480ce3bbcecd811313b3ce7fd517a7c5ba799 apps/madbridge/src/tui/live/projection.ts
restored 9a9a39d8c2b32bfd6327e49a461480ce3bbcecd811313b3ce7fd517a7c5ba799 apps/madbridge/src/tui/live/projection.ts
~~~

The complete verbatim failing run for each break is its red log identified above. All 26 restores returned zero. The coverage audit in 499-closing-audit.log · 63c0c5d08d0c06231fe7a234b09703f00b7c056ee3b6340e0cd728e7f5dcae4b verified each of the 50 added file/name pairs failed its intended break.

5. Existing test files

B20 and EXISTING TESTS item 2 permitted only the compiler-reported non-null assertions in apps/madbridge/test/tui-projection.test.tsx at lines 152, 154–155, 173–179, 209–211 and 377. Item 3 changed only line 52 of packages/adapter-madv-surface/test/live.test.ts to expect host_exited at EOF after handover. Item 1 changed only line 30 of test/phase3a/harness-separation.test.ts. No assertion or expected value was otherwise removed or weakened. The baseline and head name comparison includes all three files.

481-diff-existing-tests.log · 3a58465a508b645b8b5cd8a6dfbbf00dbc55a63abfcb595f4efc32d5b17ed715
diff --git a/apps/madbridge/test/tui-projection.test.tsx b/apps/madbridge/test/tui-projection.test.tsx
index c066104..33c41fa 100644
--- a/apps/madbridge/test/tui-projection.test.tsx
+++ b/apps/madbridge/test/tui-projection.test.tsx
@@ -149,10 +149,10 @@ describe("Governance pane projection", () => {

   test("snapshot contains both execution identities", () => {
     const snapshot = makeFullSnapshot();
-    expect(snapshot.executions.length).toBe(2);
+    expect(snapshot.executions!.length).toBe(2);

-    const claude = snapshot.executions.find((e) => e.surface === "claude-code");
-    const antigravity = snapshot.executions.find((e) => e.surface === "antigravity");
+    const claude = snapshot.executions!.find((e) => e.surface === "claude-code");
+    const antigravity = snapshot.executions!.find((e) => e.surface === "antigravity");
     expect(claude).toBeDefined();
     expect(antigravity).toBeDefined();
     expect(claude!.model).toBe("claude-sonnet-4");
@@ -170,13 +170,13 @@ describe("Governance pane projection", () => {

   test("snapshot contains permission summaries", () => {
     const snapshot = makeFullSnapshot();
-    expect(snapshot.permissionSummary.allowedReadPaths).toContain("./src");
-    expect(snapshot.permissionSummary.allowedWritePaths).toContain("./src");
-    expect(snapshot.permissionSummary.allowedCommandCategories).toContain("read");
-    expect(snapshot.permissionSummary.allowedCommandCategories).toContain("write");
-    expect(snapshot.permissionSummary.allowedCommandCategories).toContain("test");
-    expect(snapshot.permissionSummary.dataClass).toBe("internal");
-    expect(snapshot.permissionSummary.allowedEgressDestinations.length).toBe(0);
+    expect(snapshot.permissionSummary!.allowedReadPaths).toContain("./src");
+    expect(snapshot.permissionSummary!.allowedWritePaths).toContain("./src");
+    expect(snapshot.permissionSummary!.allowedCommandCategories).toContain("read");
+    expect(snapshot.permissionSummary!.allowedCommandCategories).toContain("write");
+    expect(snapshot.permissionSummary!.allowedCommandCategories).toContain("test");
+    expect(snapshot.permissionSummary!.dataClass).toBe("internal");
+    expect(snapshot.permissionSummary!.allowedEgressDestinations.length).toBe(0);
   });

   test("snapshot contains pending actions", () => {
@@ -206,9 +206,9 @@ describe("Governance pane projection", () => {
       {U+005D},
     };
     expect(withTransfer.transferPhase).toBe("sender-released");
-    expect(withTransfer.pendingTransfers.length).toBe(1);
-    expect(withTransfer.pendingTransfers{U+005B}0{U+005D}!.from).toBe("exec-claude-code");
-    expect(withTransfer.pendingTransfers{U+005B}0{U+005D}!.to).toBe("exec-antigravity");
+    expect(withTransfer.pendingTransfers!.length).toBe(1);
+    expect(withTransfer.pendingTransfers!{U+005B}0{U+005D}!.from).toBe("exec-claude-code");
+    expect(withTransfer.pendingTransfers!{U+005B}0{U+005D}!.to).toBe("exec-antigravity");
   });

   test("snapshot contains verification status", () => {
@@ -374,7 +374,7 @@ describe("useBrokerState subscribes to immutable snapshots", () => {
     // Fields are readonly in the type definition.
     expect(snapshot.connected).toBe(true);
     expect(snapshot.task).not.toBeNull();
-    expect(snapshot.executions.length).toBe(2);
+    expect(snapshot.executions!.length).toBe(2);

     // The subscribe function returns an unsubscribe callback
     const unsubscribe = (snapshot: BrokerSnapshot) => {};
diff --git a/packages/adapter-madv-surface/test/live.test.ts b/packages/adapter-madv-surface/test/live.test.ts
index dd3093d..50f31be 100644
--- a/packages/adapter-madv-surface/test/live.test.ts
+++ b/packages/adapter-madv-surface/test/live.test.ts
@@ -49,7 +49,7 @@ test("madv encodes no_tools only on the attestation message", async () => {
   wire.events(response, assistant, result);
   wire.end();
   while (!wire.closed) await Bun.sleep(1);
-  expect(wire.failures).toEqual({U+005B}{U+005D});
+  expect(wire.failures).toEqual({U+005B}"host_exited"{U+005D});
 });

 test("madv requires init, model response, assistant and success in order", async () => {
diff --git a/test/phase3a/harness-separation.test.ts b/test/phase3a/harness-separation.test.ts
index 326687a..6079ae7 100644
--- a/test/phase3a/harness-separation.test.ts
+++ b/test/phase3a/harness-separation.test.ts
@@ -27,7 +27,7 @@ const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> =
     sha256: "9210012a505848a7379ab7b9cf9d840f33197de58f85b23c359653760479c603", call: "PAYLOAD_SHAPE{U+005B}knownType{U+005D}(payload)",
   },
   "packages/supervisor/src/build.ts": {
-    sha256: "50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d", call: "host.handle.facts(){U+005B}Symbol.asyncIterator{U+005D}()",
+    sha256: "0b329d97e88a13bd58902fe7dd1afe971d52c61bbf310862230465fd1fdd3553", call: "host.handle.facts(){U+005B}Symbol.asyncIterator{U+005D}()",
   },
 };


6. Commit history and attribution

abc5f9a6ceb30d127ae2796f601033031d9a5ca2 c383353885abb526a5471ef764be3cffc558a6ff docs(verification): open the M2 build log with its task detail
Line width and three final trailers passed · 104-open-message-check.log · d37cfd953e0109035a76aee8102160fdba9f2a046a4a42941bd69f8564bb5bda
3a5c735ec40f8c31fea720ba26d18d9ec010d358 abc5f9a6ceb30d127ae2796f601033031d9a5ca2 feat(tui): render absent broker facts without inventing values
Line width and three final trailers passed · 123-r1-message-check.log · eada124d36bdd1c57c5deb60848577bc4dee86d3a937906dd54b669ceb0e0d0f
6f9b063889417ea8c7e5472c0d537065d17d977c 3a5c735ec40f8c31fea720ba26d18d9ec010d358 feat(tui): validate and project broker snapshots
Line width and three final trailers passed · 166-r2-message-check.log · 656d3fc457b864b99ff06bf94b413deb006cc8beab4ff99a8a0101e685012839
dc311c617b9c6eb21195b2cddbc0ca9606e18d72 6f9b063889417ea8c7e5472c0d537065d17d977c feat(supervisor): pace snapshot reads with a cancellable timer
Line width and three final trailers passed · 190-r3-message-check.log · b6f376b2f959bd927482020153e756de27864de6a8658cd4a6d44e046b20b4a1
381b702c314c56b840cf49fb713634cf7b4154d3 dc311c617b9c6eb21195b2cddbc0ca9606e18d72 feat(tui): subscribe to paced broker projections
Line width and three final trailers passed · 207-r4-message-check.log · 993431f7dbb7da8cae60e272555aba3da6f9456a67b001d4e993f21bcfe04bf9
cbf123a6e2285b5ff4a470cb4da449d5ce10ea0b 381b702c314c56b840cf49fb713634cf7b4154d3 fix(supervisor): interrupt live sessions when a child or host ends
Line width and three final trailers passed · 315-r5-message-check.log · 632f2d19fbec3b6d265f0a3ae2ee05741af317348c897321dc357cabdb8322d7
80db319d15e36e7ff5241d300d73facb093a617d cbf123a6e2285b5ff4a470cb4da449d5ce10ea0b test(adapters): verify retry and exit causes across handover
Line width and three final trailers passed · 373-r6-message-check.log · a250c0e868e812ddedfbdeea0bdf347ed8600990f8c17917d619b19ed2e894e3
716f34b642db9090964bfcb4b789d2ecb623c2ae 80db319d15e36e7ff5241d300d73facb093a617d docs(verification): record offline M2 frames and child endings
Line width and three final trailers passed · 430-r7-message-check.log · f806c420a9a0d0084c59a4f95e851fff4952f0a53742e61aaf6d38c114b85079
53c80aad02ac89131d7a0bcd8188ae1c66653902 716f34b642db9090964bfcb4b789d2ecb623c2ae test(tui): narrow the first frame in the disconnect assertion
Line width and three final trailers passed · 451-self-fix-message-check.log · f150a898c09aa83a1d727d778d1d4571aa9143c6cde8734bb831729d10c07742
6b3a38365854ed39a4bd291be1d48d5045cd109e 53c80aad02ac89131d7a0bcd8188ae1c66653902 docs(verification): record M2
Line width and three final trailers passed · 497-closing-message-check.log · 67d17eaf8a689afdc277b5483b46bbad777981829be8db97490061f5bae03bbb

7. Offline evidence

413-record-frames-runtime.log · a991d1158349d0ca15ddd0a05a870f65af4f2dc21c95535be8c9d480e1dc5a2e · Thu Nov 26 16:09:04 UTC 2026 to Thu Nov 26 16:09:04 UTC 2026 · 11:09  up 5 days,  2:36, 1 user, load averages: 2.37 2.01 1.96 · exit 0

414-record-frames-load.log · 43e0f4b1564e109b943087662c4ea6ea95692b2b97164e5302171d5a3e53bbbf · Thu Nov 26 16:09:23 UTC 2026 to Thu Nov 26 16:10:23 UTC 2026 · 11:09  up 5 days,  2:36, 1 user, load averages: 2.75 2.12 2.00 · exit 0

415-record-frames.log · fc517f03fd3847821f6c4d10ea7d8538814cf2c3111a0c808c609902e9b617bc · Thu Nov 26 16:10:23 UTC 2026 to Thu Nov 26 16:10:24 UTC 2026 · 11:10  up 5 days,  2:37, 1 user, load averages: 1.92 2.00 1.96 · exit 0

416-record-ends-runtime.log · ffc62473c411a76916929a0aacfa680d53b0570ce7053624ef50cb397a737f9a · Thu Nov 26 16:10:26 UTC 2026 to Thu Nov 26 16:10:26 UTC 2026 · 11:10  up 5 days,  2:38, 1 user, load averages: 1.93 2.00 1.96 · exit 0

417-record-ends-load.log · f72ed1305f78abb719ef907f59bdaef8fc94ba5b129bec86ea287472e2ea5c17 · Thu Nov 26 16:10:28 UTC 2026 to Thu Nov 26 16:10:28 UTC 2026 · 11:10  up 5 days,  2:38, 1 user, load averages: 1.93 2.00 1.96 · exit 0

418-record-ends.log · dc71c64e2577c4c7cb2d28b94038dac22a920a899f25781fd6003212f387f510 · Thu Nov 26 16:10:28 UTC 2026 to Thu Nov 26 16:10:34 UTC 2026 · 11:10  up 5 days,  2:38, 1 user, load averages: 1.93 2.00 1.96 · exit 0

scripts/phase3b/recorded-frames.tsx SHA-256 4301d19bde8cfe6bacbef86b5eea06dbc1117aefce96a7a736c56cf01832e7c4. scripts/phase3b/child-ends.ts SHA-256 59625f68a04135bdba7302ee7bf3fdd9ba0e9bc98e28caa945e758e7e35ee768.

85ea52c0f9a029bc59f8788d78f94a540ed5747ef7e8a485b92d74312c90eb3e  claude-code-active-clean-exit.txt
b5453b27d1dc0c64f9b454f4ccfa5dcfeb59aa22be2110093a5213dff21b05ef  claude-code-active-host-end.txt
f8ba6ad96e1e00e809a4e991089d55a474b590316d4cc5f3bafdfd5885bc776c  claude-code-active-malformed-partial-line.txt
f412edfecc374149721accd5cbc3b32a4b97dcf932251770e74b377f6b1b2fea  claude-code-active-nonzero-exit.txt
f8a19a0dc5acbd4e34e46b977eea5ab2f72facf6ea793d88282cdb5aa9d67035  claude-code-active-signalled-exit.txt
5c0119604c5221993935dbaccef510524a7a34553b742ff3e86ca77d37ffb9ba  claude-code-before-child_exited.txt
dee92b5960e1d59ea5e1dc93402c94138d395125d83c2a8c45e4d2876ee4c532  claude-code-before-host_exited.txt
1edc68b62e292530c88502e07e8dd3fa2e71c315b5fda009a6e9639c8da8cceb  founder-close.txt
2a513fad65db1a3c2c2ee5ba1632c7fa90abad2c443a83cbb5dba0432ee65ced  healthy-frames.txt
8e55858042910e820e5e0c96755ee8af7086fe68c7b0d946c16ec9250f280106  healthy-stream.json
af7501471fd2909beb4e086458eea1104d0ea4da758383d4c0032555c8dec5a3  madv-surface-active-clean-exit.txt
36c23c4f218e0d713e702193a0fad7c9b86140165479edd3fffba21c41307b28  madv-surface-active-host-end.txt
25a05e6b553e2324eee4df383778fbc85edfcf6268500682184e4291d8c875c6  madv-surface-active-malformed-partial-line.txt
b13f8b5206ba664af4b2c2c3917eff9c9ff5de4a08e68e317f4d4061873dd076  madv-surface-active-nonzero-exit.txt
82a316a09e19419d0a354830b663ff1a10174d89c1bbafdd1d828b1e514a9bbf  madv-surface-active-open-tool.txt
b702d4a796109f47e625bb1be8ba5b5e2370fc2bbdd1593d113e1b147415575b  madv-surface-active-pending-request.txt
cfd7422ce5dd89774124ac5e5af151fa1f16eeaee5bd4e9a15f86113a862554c  madv-surface-before-child_exited.txt
07255e98b19e63fe8743510b2e5a82788fce872b5a1d3d595292a094a761514a  madv-surface-before-host_exited.txt
Manifest SHA-256 5b262e643fee404f1ca88f922bec3e8e308d44bc287ab5104266aa6833e24e31
Evidence packet SHA-256 0fff814b75bd1c105542772dd407572a256dd6e4d966559033cbb4799c2bc973

420-client-samples.log · 064a6add24c9007d3b49e095933a9b370795ebcda02a470bae57a00b9d67539b
3 active 3 True
5 active 3 True
6 closing 5 True
7 closed 6 True
post-close snapshot read rejected completed

The evidence packet contains labelled excerpts for the four snapshots, three scripted views and all sixteen build observations.

8. Full run

R4’s new comparison spread an indexed projection that TypeScript considered optional. The same diagnostic appeared in log 308. The command’s initial one-minute load was 1.41. Commit 53c80aad02ac89131d7a0bcd8188ae1c66653902 added a non-null assertion at line 68 after the existing length and connection assertions. The D3 restart began at log 457. Frozen install, type check and bare suite passed.

447-full-types.log · 51ac4af7dc1c0cb763b6a0616ab2f67fcc67b292126372742ff481e567fe351f
test/phase3b/subscribe.test.ts(68,31): error TS2769: No overload matches this call.
  Overload 1 of 2, '(expected: BrokerSnapshot | undefined): void', gave the following error.
    Argument of type '{ connected: false; sessionState?: "starting" | "active" | "paused" | "interrupted" | "reconciling" | "closing" | "closed"; ownershipState?: "free" | "owned" | "transfer-requested" | "sender-released" | "receiver-validating" | "rejected" | null; ... 13 more ...; queueDepth?: number | null; }' is not assignable to parameter of type 'BrokerSnapshot'.
      Property 'sessionState' is optional in type '{ connected: false; sessionState?: "starting" | "active" | "paused" | "interrupted" | "closing" | "closed" | "reconciling"; ownershipState?: "rejected" | "free" | "owned" | "transfer-requested" | "sender-released" | "receiver-validating" | null; ... 13 more ...; queueDepth?: number | null; }' but required in type 'BrokerSnapshot'.
  Overload 2 of 2, '(expected: NoInfer<BrokerSnapshot | undefined>): void', gave the following error.
    Argument of type '{ connected: false; sessionState?: "starting" | "active" | "paused" | "interrupted" | "reconciling" | "closing" | "closed"; ownershipState?: "free" | "owned" | "transfer-requested" | "sender-released" | "receiver-validating" | "rejected" | null; ... 13 more ...; queueDepth?: number | null; }' is not assignable to parameter of type 'BrokerSnapshot'.
      Property 'sessionState' is optional in type '{ connected: false; sessionState?: "starting" | "active" | "paused" | "interrupted" | "closing" | "closed" | "reconciling"; ownershipState?: "rejected" | "free" | "owned" | "transfer-requested" | "sender-released" | "receiver-validating" | null; ... 13 more ...; queueDepth?: number | null; }' but required in type 'BrokerSnapshot'.

| Log and command | UTC start / end | Uptime at command start | Exit | SHA-256 |
|---|---|---|---:|---|
| 441-install-original.log · shasum -a 256 tui/bun.lock | Thu Nov 26 16:20:33 UTC 2026 / Thu Nov 26 16:20:33 UTC 2026 | 11:20  1 user, load averages: 1.47 1.90 1.97 | exit 0 | bed91f14eb5c49215dc8860b1564de91a4735fc5893dee7c4c3414912a8d7c6c |
| 442-full-start.log · git -C tui status -sb | Thu Nov 26 16:20:33 UTC 2026 / Thu Nov 26 16:20:33 UTC 2026 | 11:20  1 user, load averages: 1.47 1.90 1.97 | exit 0 | 24f2e9d25267ed201436e3d4e4c47dd14834b1bea3fe853fe61f8ce553ae93e8 |
| 443-full-runtime.log · Bun runtime identity check | Thu Nov 26 16:22:53 UTC 2026 / Thu Nov 26 16:22:53 UTC 2026 | 11:22  up 5 days,  2:50, 1 user, load averages: 2.69 2.77 2.36 | exit 0 | 9cbb3c3706da9c6fb9567e7511c73ec067c86a76f6089cdb3b0c43c1de2058ac |
| 444-full-install.log · bun install --frozen-lockfile | Thu Nov 26 16:22:54 UTC 2026 / Thu Nov 26 16:22:55 UTC 2026 | 11:22  up 5 days,  2:50, 1 user, load averages: 2.69 2.77 2.36 | exit 0 | 4414639034c86c6de20d2018d8b41778e8130a67a48b4f22ed5d7438678077db |
| 445-install-check.log · git -C tui status --porcelain | Thu Nov 26 16:22:55 UTC 2026 / Thu Nov 26 16:22:55 UTC 2026 | 11:22  1 user, load averages: 2.69 2.77 2.36 | exit 0 | a3c380b9d7d2bc9cf79feb32e2a77b2a3290f7b755fadf2ca047a67ff9c9ff70 |
| 446-types-load.log · wait_for_load | Thu Nov 26 16:22:56 UTC 2026 / Thu Nov 26 16:25:26 UTC 2026 | 11:22  up 5 days,  2:50, 1 user, load averages: 2.69 2.77 2.36 | exit 0 | a8d31358cdfec33f940f4b696a4801bd9df31328fb64f541925ab2695531b31a |
| 447-full-types.log · bunx tsc --noEmit | Thu Nov 26 16:25:26 UTC 2026 / Thu Nov 26 16:25:29 UTC 2026 | 11:25  up 5 days,  2:53, 1 user, load averages: 1.41 2.32 2.24 | exit 2 | 51ac4af7dc1c0cb763b6a0616ab2f67fcc67b292126372742ff481e567fe351f |
| 448-self-fix-eligibility.log · python3 - | Thu Nov 26 16:25:43 UTC 2026 / Thu Nov 26 16:25:43 UTC 2026 | 11:25  1 user, load averages: 1.45 2.28 2.23 | exit 0 | 547603d141a1ffa443953a16fbc610b2a27318ecd4577bd674458855ebdd4ac8 |
| 449-narrow-first-projection.log · python3 - | Thu Nov 26 16:25:43 UTC 2026 / Thu Nov 26 16:25:43 UTC 2026 | 11:25  1 user, load averages: 1.45 2.28 2.23 | exit 0 | eddbeb1f869cb4db08571a65c424e1af564fbc5137955b08067d625c48922341 |
| 450-self-fix-message.log · tee /private/tmp/m2-r1.lW9tqKL8/r4-type-fix.msg | Thu Nov 26 16:25:43 UTC 2026 / Thu Nov 26 16:25:43 UTC 2026 | 11:25  1 user, load averages: 1.45 2.28 2.23 | exit 0 | bfd518051662a99f969cc75bb9a01b4b935f1cc0056248b8e35821012c92fbb3 |
| 451-self-fix-message-check.log · python3 /private/tmp/m2-r1.lW9tqKL8/check-message.py /private/tmp/m2-r1.lW9tqKL8/r4-type-fix.msg | Thu Nov 26 16:25:43 UTC 2026 / Thu Nov 26 16:25:43 UTC 2026 | 11:25  1 user, load averages: 1.45 2.28 2.23 | exit 0 | f150a898c09aa83a1d727d778d1d4571aa9143c6cde8734bb831729d10c07742 |
| 452-self-fix-stage.log · git -C tui add -- test/phase3b/subscribe.test.ts | Thu Nov 26 16:25:50 UTC 2026 / Thu Nov 26 16:25:50 UTC 2026 | 11:25  1 user, load averages: 1.41 2.25 2.22 | exit 0 | d0f1d6b1c8afc2d723301593f4a15f9a72a4c8c50bcdc3d0f1102806ba58fe38 |
| 453-self-fix-check.log · git -C tui diff --cached --check | Thu Nov 26 16:25:50 UTC 2026 / Thu Nov 26 16:25:50 UTC 2026 | 11:25  1 user, load averages: 1.41 2.25 2.22 | exit 0 | b992f667398735c284d9d0fb7794b52dd07b00b6cdfa4c9805b5d737e152f3be |
| 454-self-fix-commit.log · git -C tui commit -F /private/tmp/m2-r1.lW9tqKL8/r4-type-fix.msg | Thu Nov 26 16:25:50 UTC 2026 / Thu Nov 26 16:25:50 UTC 2026 | 11:25  1 user, load averages: 1.41 2.25 2.22 | exit 0 | a08433275c46df279aca65f9f54054868d392bb7670934cf459d9f8615168206 |
| 455-self-fix-head.log · git -C tui log -1 --format=%H\ %P\ %s | Thu Nov 26 16:25:50 UTC 2026 / Thu Nov 26 16:25:50 UTC 2026 | 11:25  1 user, load averages: 1.41 2.25 2.22 | exit 0 | 383751a040a9ac2342eb8ae2617f0abae899123afad6eec7a8f59328f5f9e3a9 |
| 456-restart-lock.log · shasum -a 256 tui/bun.lock | Thu Nov 26 16:25:50 UTC 2026 / Thu Nov 26 16:25:50 UTC 2026 | 11:25  1 user, load averages: 1.41 2.25 2.22 | exit 0 | d6d790ad8c4d82341734fae16503b2c6bc86a7ef7b5dbc9f3a1d7922bfbae977 |
| 457-restart-runtime.log · Bun runtime identity check | Thu Nov 26 16:27:50 UTC 2026 / Thu Nov 26 16:27:51 UTC 2026 | 11:27  up 5 days,  2:55, 1 user, load averages: 1.61 2.09 2.16 | exit 0 | 398a138ed1ea7baf34d62e2b5da69f114322f3fb04d54659a5e4279d752a5b35 |
| 458-restart-install.log · bun install --frozen-lockfile | Thu Nov 26 16:29:35 UTC 2026 / Thu Nov 26 16:29:35 UTC 2026 | 11:29  up 5 days,  2:57, 1 user, load averages: 1.34 1.84 2.05 | exit 0 | fbae0a5dd681fbbafd0683cc7230f5761344ec128fefe76f261a9b815e418f11 |
| 459-restart-lock-check.log · git -C tui status --porcelain | Thu Nov 26 16:29:35 UTC 2026 / Thu Nov 26 16:29:35 UTC 2026 | 11:29  1 user, load averages: 1.34 1.84 2.05 | exit 0 | 1ce033a19b613dbb22762f688c2fe45b52f0587c09162d2623b1a37c83432b9b |
| 460-restart-types-load.log · wait_for_load | Thu Nov 26 16:29:37 UTC 2026 / Thu Nov 26 16:29:37 UTC 2026 | 11:29  up 5 days,  2:57, 1 user, load averages: 1.34 1.84 2.05 | exit 0 | 806b9ce7447accb8d6af1fdfd468a86453ed6f0e5bbf544fc6de46292d6fc4a2 |
| 461-restart-types.log · bunx tsc --noEmit | Thu Nov 26 16:29:37 UTC 2026 / Thu Nov 26 16:29:41 UTC 2026 | 11:29  up 5 days,  2:57, 1 user, load averages: 1.34 1.84 2.05 | exit 0 | c26d4acab34c75be09672780e6ff44438eb8d12d7e8a89b061e3322414630ece |
| 462-suite-runtime.log · Bun runtime identity check | Thu Nov 26 16:29:42 UTC 2026 / Thu Nov 26 16:29:42 UTC 2026 | 11:29  up 5 days,  2:57, 1 user, load averages: 1.31 1.82 2.04 | exit 0 | ece95570594630a17eaacfe87f6adf1128f4150e3d2050c29a795c11d1e394aa |
| 463-full-suite-load.log · wait_for_load | Thu Nov 26 16:29:44 UTC 2026 / Thu Nov 26 16:29:44 UTC 2026 | 11:29  up 5 days,  2:57, 1 user, load averages: 1.45 1.84 2.05 | exit 0 | 9e05d9a7f817e51d27c96f813e2e402340c2b0745e4164d2f0f0387ed6955a43 |
| 464-full-suite.log · bun test | Thu Nov 26 16:29:44 UTC 2026 / Thu Nov 26 16:34:11 UTC 2026 | 11:29  up 5 days,  2:57, 1 user, load averages: 1.45 1.84 2.05 | exit 0 | 0eca6963342ac1fecba1ff7a8eea89779cd3275fad3f535c44d2d16b6b83750c |

458-restart-install.log · fbae0a5dd681fbbafd0683cc7230f5761344ec128fefe76f261a9b815e418f11
Checked 87 installs across 131 packages (no changes) {U+005B}7.00ms{U+005D}

464-full-suite.log · 0eca6963342ac1fecba1ff7a8eea89779cd3275fad3f535c44d2d16b6b83750c
 2139 pass
 0 fail
 28426 expect() calls
Ran 2139 tests across 168 files. {U+005B}267.17s{U+005D}

467-full-list.log · 46bb825761e8adaff97df6cc8ddf2c363069f1064af4c42e6cf42c7930822d66

468-full-compare.log · 067a7b29f093058aed92394da13b0ed9805935425a865aa4480a4ef0dc7cd5d2
packages/adapter-claude-code/test/retry.test.ts	an unregistered api_retry error preserves the active monitor
packages/adapter-claude-code/test/retry.test.ts	an unregistered api_retry error preserves the attestation
packages/adapter-madv-surface/test/exit-causes.test.ts	madv code 0 gives child_exited after activation
packages/adapter-madv-surface/test/exit-causes.test.ts	madv code 0 gives identity_unavailable before activation
packages/adapter-madv-surface/test/exit-causes.test.ts	madv code 1 gives provider_error after activation
packages/adapter-madv-surface/test/exit-causes.test.ts	madv code 1 gives provider_error before activation
packages/adapter-madv-surface/test/exit-causes.test.ts	madv code 3 gives identity_unavailable after activation
packages/adapter-madv-surface/test/exit-causes.test.ts	madv code 3 gives identity_unavailable before activation
packages/adapter-madv-surface/test/exit-causes.test.ts	madv code 4 gives identity_mismatch after activation
packages/adapter-madv-surface/test/exit-causes.test.ts	madv code 4 gives identity_mismatch before activation
packages/adapter-madv-surface/test/exit-causes.test.ts	madv code 42 gives provider_error after activation
packages/adapter-madv-surface/test/exit-causes.test.ts	madv code 42 gives provider_error before activation
packages/adapter-madv-surface/test/exit-causes.test.ts	madv code 5 gives auth_failed after activation
packages/adapter-madv-surface/test/exit-causes.test.ts	madv code 5 gives auth_failed before activation
packages/adapter-madv-surface/test/exit-causes.test.ts	madv code 6 gives endpoint_refused after activation
packages/adapter-madv-surface/test/exit-causes.test.ts	madv code 6 gives endpoint_refused before activation
packages/adapter-madv-surface/test/exit-causes.test.ts	madv code 7 gives model_refused after activation
packages/adapter-madv-surface/test/exit-causes.test.ts	madv code 7 gives model_refused before activation
packages/adapter-madv-surface/test/exit-causes.test.ts	madv signal gives provider_error after activation
packages/adapter-madv-surface/test/exit-causes.test.ts	madv signal gives provider_error before activation
packages/supervisor/test/snapshot-timer.test.ts	the snapshot wait paces reads and settles promptly on cancellation
test/phase3b/absence.test.tsx	a null connection is unknown in bars, panes and docks
test/phase3b/absence.test.tsx	a null token stays absent in writer, incident and session_open frames
test/phase3b/absence.test.tsx	absent execution and ownership facts stay absent and queue depth stays hidden
test/phase3b/absence.test.tsx	governance distinguishes unknown transfers and permissions from empty collections
test/phase3b/child-end.test.ts	Founder close on the active composition records no interruption
test/phase3b/child-end.test.ts	claude-code before activation reports child_exited
test/phase3b/child-end.test.ts	claude-code before activation reports host_exited
test/phase3b/child-end.test.ts	claude-code clean exit records child_failure
test/phase3b/child-end.test.ts	claude-code drained alone leaves the monitor active
test/phase3b/child-end.test.ts	claude-code host end records pty_host_failure
test/phase3b/child-end.test.ts	claude-code malformed partial line records identity_mismatch
test/phase3b/child-end.test.ts	claude-code nonzero exit records child_failure
test/phase3b/child-end.test.ts	claude-code signalled exit records child_failure
test/phase3b/child-end.test.ts	madv-surface before activation reports child_exited
test/phase3b/child-end.test.ts	madv-surface before activation reports host_exited
test/phase3b/child-end.test.ts	madv-surface clean exit records child_failure
test/phase3b/child-end.test.ts	madv-surface drained alone leaves the monitor active
test/phase3b/child-end.test.ts	madv-surface host end records pty_host_failure
test/phase3b/child-end.test.ts	madv-surface malformed partial line records identity_mismatch
test/phase3b/child-end.test.ts	madv-surface nonzero exit records adapter_failure
test/phase3b/child-end.test.ts	madv-surface open tool records identity_mismatch
test/phase3b/child-end.test.ts	madv-surface pending request records identity_mismatch
test/phase3b/projection.test.ts	the mapper rejects unknown shapes without disclosing supplied values
test/phase3b/projection.test.ts	the pinned table maps every broker member and declared phase and ownership kind
test/phase3b/recorded-frames.test.tsx	the healthy offline client's recorded stream renders activation through Founder close
test/phase3b/subscribe.test.ts	a first failure gives no projection
test/phase3b/subscribe.test.ts	mapping and read failures end delivery from the last projection
test/phase3b/subscribe.test.ts	subscription gives the first, changed and closed projections exactly once
test/phase3b/subscribe.test.ts	unsubscribe cancels pacing and suppresses in-flight delivery
Every one of 2089 baseline tests passed under its original file and name.
Tests: 2089 + 50 = 2139.
Files: 160 + 8 = 168.
Failed 0, skipped 0, todo 0.

470-full-diff-check.log · 4f6ffd301ebac586337302773eb8d2f6b177a40fed389f70fc197775f057b3cd


471-full-paths.log · 88da6f1835157ca2dde2fd87048fb9dafcb496432d9674fb74d6f11275192286
apps/madbridge/src/tui/components/DockStrip.tsx
apps/madbridge/src/tui/components/EventLog.tsx
apps/madbridge/src/tui/components/IncidentBand.tsx
apps/madbridge/src/tui/components/StatusBar.tsx
apps/madbridge/src/tui/components/agent-identity.ts
apps/madbridge/src/tui/hooks/useBrokerState.ts
apps/madbridge/src/tui/live/projection.ts
apps/madbridge/src/tui/live/subscribe.ts
apps/madbridge/src/tui/panes/AntigravityPane.tsx
apps/madbridge/src/tui/panes/ClaudePane.tsx
apps/madbridge/src/tui/panes/GovernancePane.tsx
apps/madbridge/src/tui/types.ts
apps/madbridge/test/tui-projection.test.tsx
docs/verification/phase-3b-m2-build-log.md
docs/verification/phase-3b-m2-evidence.md
packages/adapter-claude-code/src/live.ts
packages/adapter-claude-code/test/retry.test.ts
packages/adapter-madv-surface/src/live.ts
packages/adapter-madv-surface/test/exit-causes.test.ts
packages/adapter-madv-surface/test/live.test.ts
packages/supervisor/src/build.ts
packages/supervisor/src/index.ts
packages/supervisor/src/snapshot-timer.ts
packages/supervisor/test/snapshot-timer.test.ts
scripts/phase3b/child-ends.ts
scripts/phase3b/recorded-frames.tsx
test/phase3a/harness-separation.test.ts
test/phase3b/absence.test.tsx
test/phase3b/child-end.test.ts
test/phase3b/child-end.ts
test/phase3b/end-stand-in.ts
test/phase3b/m2-offline.ts
test/phase3b/projection.test.ts
test/phase3b/recorded-frames.test.tsx
test/phase3b/snapshot-input.ts
test/phase3b/subscribe.test.ts

472-full-pin.log · 1dd0467fe7fd5c300beaeb064b8f55344a07bf433a1514ce4611bafea3eed869
diff --git a/test/phase3a/harness-separation.test.ts b/test/phase3a/harness-separation.test.ts
index 326687a..6079ae7 100644
--- a/test/phase3a/harness-separation.test.ts
+++ b/test/phase3a/harness-separation.test.ts
@@ -27,7 +27,7 @@ const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> =
     sha256: "9210012a505848a7379ab7b9cf9d840f33197de58f85b23c359653760479c603", call: "PAYLOAD_SHAPE{U+005B}knownType{U+005D}(payload)",
   },
   "packages/supervisor/src/build.ts": {
-    sha256: "50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d", call: "host.handle.facts(){U+005B}Symbol.asyncIterator{U+005D}()",
+    sha256: "0b329d97e88a13bd58902fe7dd1afe971d52c61bbf310862230465fd1fdd3553", call: "host.handle.facts(){U+005B}Symbol.asyncIterator{U+005D}()",
   },
 };


473-full-index.log · be7cda73247bb64760705ebfd8381481fc805eb180b424cb88d404b56c6a2329
diff --git a/packages/supervisor/src/index.ts b/packages/supervisor/src/index.ts
index 1e7f27c..ff8ef92 100644
--- a/packages/supervisor/src/index.ts
+++ b/packages/supervisor/src/index.ts
@@ -28,3 +28,5 @@ export type {
   PartialBuildState,
   RollbackOutcome,
 } from "./build";
+
+export { waitForSnapshotTick } from "./snapshot-timer";

474-protected-paths.log · eb61082dc926955825ba3c08db25ae1902c4312d794192d55892dc9840ae5423


475-protected-config.log · 3f41caf663c39caf6e4503bc5ce39be8b0277f008e544b7fbaa6d76386d84dae


477-importers.log · 5d494d661af1ac683bb6c558f08d596d82b36b3a2bfc979dfdd03ceaa9a25ecc
apps/madbridge/src/tui/live/composition.ts:6 type PartialBuildState, type PreflightInput } from "../../../../../packages/supervisor/src/index";
apps/madbridge/src/tui/live/composition.ts:7 import { settingsSources } from "./settings-sources";
apps/madbridge/src/tui/live/settings-sources.ts:3 import { managedSettingsDirectory } from "./managed-settings";
apps/madbridge/src/tui/live/subscribe.ts:3 import { waitForSnapshotTick } from "../../../../../packages/supervisor/src/index";
apps/madbridge/src/tui/live/subscribe.ts:5 import { clientSnapshotToProjection } from "./projection";
packages/adapter-madv-surface/test/exit-causes.test.ts:7 import { runLiveTransactionalBuild, runPurePreflight } from "../../supervisor/src/index";
packages/supervisor/test/build-rollback.test.ts:34 import * as supervisorIndex from "../src/index";
packages/supervisor/test/live-port.test.ts:2 import { runLiveTransactionalBuild, type LiveReattestationInput } from "../src/index";
packages/supervisor/test/snapshot-timer.test.ts:3 import { waitForSnapshotTick } from "../src/index";
scripts/phase3b/recorded-frames.tsx:8 import { composeLiveSession } from "../../apps/madbridge/src/tui/live/composition";
scripts/phase3b/recorded-frames.tsx:9 import { clientSnapshotToProjection } from "../../apps/madbridge/src/tui/live/projection";
test/phase3b/child-end.ts:5 import { createStartAttesters, composeLiveSession } from "../../apps/madbridge/src/tui/live/composition";
test/phase3b/child-end.ts:6 import { runLiveTransactionalBuild, runPurePreflight } from "../../packages/supervisor/src/index";
test/phase3b/offline.ts:5 import { rollbackBuild, type BuildResult, type LaunchPlan } from "../../packages/supervisor/src/index";
test/phase3b/preflight-input.ts:5 import type { PreflightInput } from "../../packages/supervisor/src/index";
test/phase3b/projection.test.ts:4 import { clientSnapshotToProjection as project } from "../../apps/madbridge/src/tui/live/projection";
test/phase3b/scenarios.ts:4 import { composeLiveSession, createStartAttesters } from "../../apps/madbridge/src/tui/live/composition";
test/phase3b/scenarios.ts:5 import { runPurePreflight, runLiveTransactionalBuild } from "../../packages/supervisor/src/index";
test/phase3b/separation.test.ts:5 import { runTransactionalBuild } from "../../packages/supervisor/src/index";
test/phase3b/settings-sources.test.ts:4 import { managedSettingsDirectory } from "../../apps/madbridge/src/tui/live/managed-settings";
test/phase3b/settings-sources.test.ts:5 import { settingsSources } from "../../apps/madbridge/src/tui/live/settings-sources";
test/phase3b/subscribe.test.ts:3 import { subscribeToClient } from "../../apps/madbridge/src/tui/live/subscribe";

478-app-callers.log · c516a37139ae1b022b4abe2868e98e9f03482b6862654527c222561717cbbaaf
HEAD:apps/madbridge/src/tui/live/composition.ts:54:export async function composeLiveSession(start: Start): Promise<Result> {
HEAD:apps/madbridge/src/tui/live/projection.ts:151:export function clientSnapshotToProjection(snapshot: ClientSnapshot): BrokerSnapshot {
HEAD:apps/madbridge/src/tui/live/subscribe.ts:5:import { clientSnapshotToProjection } from "./projection";
HEAD:apps/madbridge/src/tui/live/subscribe.ts:7:export function subscribeToClient(client: BrokerClient) {
HEAD:apps/madbridge/src/tui/live/subscribe.ts:19:          next = clientSnapshotToProjection(snapshot);

479-full-status.log · 12eadc3ff418167d9e948a65fd687976419149cd10df1d11d3d52e2e57f35c9c
## build/3b-m2-r1

480-full-untracked.log · 176de537c0166a7c1dcee48dadb7fa4ae402f1a0e78dae39d59ed8330f012f38


491-cli-reachability.log · ab51f7c190c2bb8e8584349eec226abc764b590ff2773ee56678a44beeb1aa6a
Static local TypeScript modules reached from cli.ts 47
M2 additions reached {U+005B}{U+005D}

9. B22 gates at the closing commit

507-gate-runtime.log · da06d955a4ecf05eb1ea40996d0fcf0499a170a224c56ce9cd77457dffddec1c · Thu Nov 26 16:39:33 UTC 2026 to Thu Nov 26 16:39:33 UTC 2026 · 11:39  up 5 days,  3:07, 1 user, load averages: 1.80 2.26 2.23 · exit 0

509-gate-install.log · 052d93e4012cf61b45f994a292b6261447a133825378e797231369c980498685 · Thu Nov 26 16:42:10 UTC 2026 to Thu Nov 26 16:42:10 UTC 2026 · 11:42  up 5 days,  3:09, 1 user, load averages: 1.54 2.02 2.13 · exit 0

~~~text
Checked 87 installs across 131 packages (no changes) {U+005B}9.00ms{U+005D}
~~~

510-gate-lock-check.log · 0b1edadd95fa4ca70ee9da551355764f21b9886125b7144cd3d02a361c5fc236 · Thu Nov 26 16:42:10 UTC 2026 to Thu Nov 26 16:42:10 UTC 2026 · 11:42  1 user, load averages: 1.54 2.02 2.13 · exit 0

TypeScript completed without diagnostics. 512-gate-types.log · 18496df67aae75b33fa001963d440c2f8058c54dd010dfb298b9117ef62cce97 · Thu Nov 26 16:43:25 UTC 2026 to Thu Nov 26 16:43:29 UTC 2026 · 11:43  up 5 days,  3:11, 1 user, load averages: 0.84 1.71 2.00 · exit 0

513-gate-suite-runtime.log · e7c4df79454407f5e9fcd0241e0b6f785b31c5c3d94230ea0e6d3aeb47fbefb1 · Thu Nov 26 16:43:31 UTC 2026 to Thu Nov 26 16:43:31 UTC 2026 · 11:43  up 5 days,  3:11, 1 user, load averages: 1.01 1.73 2.01 · exit 0

515-gate-suite.log · 41116afdf1ff5faa85f10438b1ae5aae87b5196f046f32f673449bbd5c470131 · Thu Nov 26 16:53:09 UTC 2026 to Thu Nov 26 16:57:39 UTC 2026 · 11:53  up 5 days,  3:20, 1 user, load averages: 1.32 1.61 1.78 · exit 0

~~~text
 2139 pass
 0 fail
 28426 expect() calls
Ran 2139 tests across 168 files. {U+005B}269.82s{U+005D}
~~~

Logged waits · 506-gate-runtime-load.log · b0f15aed3bf14934263529e80320ccaffac29ed9ee5500d41b08a17f6fc093c6 · 508-gate-install-load.log · 1ceb17b82dc042d25b1e909658d93d372c4bbeff4629a3d7e78e085dfc618b6f · 511-gate-types-load.log · b8a923db49a1a300322ee7abdeb346d7c87ad336b00a352568a9cef2a7a272d8 · 514-gate-suite-load.log · 73b378b16158e058bf544ec546b7858c952391d7d9b71ae3aa8e7bff3b747b6b

The baseline and head verdict lists compare by file, full name and multiplicity. 518-gate-compare.log · e948c0f2edbac11361dcd2f8266c5347f0480a49cbe4fe9dcc2bdb1c715b0a41.

~~~text
Every one of 2089 baseline tests passed under its original file and name.
Tests: 2089 + 50 = 2139.
Files: 160 + 8 = 168.
Failed 0, skipped 0, todo 0.
~~~

| Log and command | UTC start / end | Uptime at command start | Exit | SHA-256 |
|---|---|---|---:|---|
| 505-gate-lock.log · shasum -a 256 tui/bun.lock | Thu Nov 26 16:38:35 UTC 2026 / Thu Nov 26 16:38:35 UTC 2026 | 11:38  1 user, load averages: 2.78 2.47 2.30 | exit 0 | 93e1653b7480a2e77069ca4c62d5c11a0898232fad45948d8c5ba3be2395ca54 |
| 506-gate-runtime-load.log · wait_for_load | Thu Nov 26 16:39:02 UTC 2026 / Thu Nov 26 16:39:32 UTC 2026 | 11:39  up 5 days,  3:06, 1 user, load averages: 2.30 2.38 2.27 | exit 0 | b0f15aed3bf14934263529e80320ccaffac29ed9ee5500d41b08a17f6fc093c6 |
| 507-gate-runtime.log · Bun runtime identity check | Thu Nov 26 16:39:33 UTC 2026 / Thu Nov 26 16:39:33 UTC 2026 | 11:39  up 5 days,  3:07, 1 user, load averages: 1.80 2.26 2.23 | exit 0 | da06d955a4ecf05eb1ea40996d0fcf0499a170a224c56ce9cd77457dffddec1c |
| 508-gate-install-load.log · wait_for_load | Thu Nov 26 16:41:10 UTC 2026 / Thu Nov 26 16:42:10 UTC 2026 | 11:41  up 5 days,  3:08, 1 user, load averages: 2.39 2.21 2.20 | exit 0 | 1ceb17b82dc042d25b1e909658d93d372c4bbeff4629a3d7e78e085dfc618b6f |
| 509-gate-install.log · bun install --frozen-lockfile | Thu Nov 26 16:42:10 UTC 2026 / Thu Nov 26 16:42:10 UTC 2026 | 11:42  up 5 days,  3:09, 1 user, load averages: 1.54 2.02 2.13 | exit 0 | 052d93e4012cf61b45f994a292b6261447a133825378e797231369c980498685 |
| 510-gate-lock-check.log · git -C tui status --porcelain | Thu Nov 26 16:42:10 UTC 2026 / Thu Nov 26 16:42:10 UTC 2026 | 11:42  1 user, load averages: 1.54 2.02 2.13 | exit 0 | 0b1edadd95fa4ca70ee9da551355764f21b9886125b7144cd3d02a361c5fc236 |
| 511-gate-types-load.log · wait_for_load | Thu Nov 26 16:43:25 UTC 2026 / Thu Nov 26 16:43:25 UTC 2026 | 11:43  up 5 days,  3:11, 1 user, load averages: 0.84 1.71 2.00 | exit 0 | b8a923db49a1a300322ee7abdeb346d7c87ad336b00a352568a9cef2a7a272d8 |
| 512-gate-types.log · bunx tsc --noEmit | Thu Nov 26 16:43:25 UTC 2026 / Thu Nov 26 16:43:29 UTC 2026 | 11:43  up 5 days,  3:11, 1 user, load averages: 0.84 1.71 2.00 | exit 0 | 18496df67aae75b33fa001963d440c2f8058c54dd010dfb298b9117ef62cce97 |
| 513-gate-suite-runtime.log · Bun runtime identity check | Thu Nov 26 16:43:31 UTC 2026 / Thu Nov 26 16:43:31 UTC 2026 | 11:43  up 5 days,  3:11, 1 user, load averages: 1.01 1.73 2.01 | exit 0 | e7c4df79454407f5e9fcd0241e0b6f785b31c5c3d94230ea0e6d3aeb47fbefb1 |
| 514-gate-suite-load.log · wait_for_load | Thu Nov 26 16:53:09 UTC 2026 / Thu Nov 26 16:53:09 UTC 2026 | 11:53  up 5 days,  3:20, 1 user, load averages: 1.32 1.61 1.78 | exit 0 | 73b378b16158e058bf544ec546b7858c952391d7d9b71ae3aa8e7bff3b747b6b |
| 515-gate-suite.log · bun test | Thu Nov 26 16:53:09 UTC 2026 / Thu Nov 26 16:57:39 UTC 2026 | 11:53  up 5 days,  3:20, 1 user, load averages: 1.32 1.61 1.78 | exit 0 | 41116afdf1ff5faa85f10438b1ae5aae87b5196f046f32f673449bbd5c470131 |

517-gate-list.log · 940b015ebfd9cfc5c8fc1d870c3b2434411a6c69e81e696f1c05dc7601368424

519-gate-identity.log · 0fe44c4a2143f7cca7fe39904e4185d8f6295d604311c94b1c1e9f5fa8ed8e7b

10. Diff against c383353885abb526a5471ef764be3cffc558a6ff

520-head-stat.log · 22f1bcc9669aa78aca20dc8b16b563cfcd84f252ec50f9da8f895972501c3728
 apps/madbridge/src/tui/components/DockStrip.tsx    |    2 +-
 apps/madbridge/src/tui/components/EventLog.tsx     |    2 +-
 apps/madbridge/src/tui/components/IncidentBand.tsx |    4 +-
 apps/madbridge/src/tui/components/StatusBar.tsx    |   32 +-
 .../madbridge/src/tui/components/agent-identity.ts |    1 +
 apps/madbridge/src/tui/hooks/useBrokerState.ts     |    4 +-
 apps/madbridge/src/tui/live/projection.ts          |  163 +
 apps/madbridge/src/tui/live/subscribe.ts           |   39 +
 apps/madbridge/src/tui/panes/AntigravityPane.tsx   |    4 +-
 apps/madbridge/src/tui/panes/ClaudePane.tsx        |    4 +-
 apps/madbridge/src/tui/panes/GovernancePane.tsx    |   14 +-
 apps/madbridge/src/tui/types.ts                    |   17 +-
 apps/madbridge/test/tui-projection.test.tsx        |   28 +-
 docs/verification/phase-3b-m2-build-log.md         | 4410 ++++++++++++++++++++
 docs/verification/phase-3b-m2-evidence.md          |  260 ++
 packages/adapter-claude-code/src/live.ts           |    8 +-
 packages/adapter-claude-code/test/retry.test.ts    |   30 +
 packages/adapter-madv-surface/src/live.ts          |   11 +-
 .../adapter-madv-surface/test/exit-causes.test.ts  |   74 +
 packages/adapter-madv-surface/test/live.test.ts    |    2 +-
 packages/supervisor/src/build.ts                   |    4 +-
 packages/supervisor/src/index.ts                   |    2 +
 packages/supervisor/src/snapshot-timer.ts          |   15 +
 packages/supervisor/test/snapshot-timer.test.ts    |   29 +
 scripts/phase3b/child-ends.ts                      |   33 +
 scripts/phase3b/recorded-frames.tsx                |  101 +
 test/phase3a/harness-separation.test.ts            |    2 +-
 test/phase3b/absence.test.tsx                      |  104 +
 test/phase3b/child-end.test.ts                     |   56 +
 test/phase3b/child-end.ts                          |   98 +
 test/phase3b/end-stand-in.ts                       |  115 +
 test/phase3b/m2-offline.ts                         |   31 +
 test/phase3b/projection.test.ts                    |  111 +
 test/phase3b/recorded-frames.test.tsx              |   36 +
 test/phase3b/snapshot-input.ts                     |   10 +
 test/phase3b/subscribe.test.ts                     |  106 +
 36 files changed, 5898 insertions(+), 64 deletions(-)

521-head-diff.log · db331df6910e1a5de4fde11b03447833dc92b32e56dd0a6e41b147d4cba83927
diff --git a/apps/madbridge/src/tui/components/DockStrip.tsx b/apps/madbridge/src/tui/components/DockStrip.tsx
index 85c0d0f..d271778 100644
--- a/apps/madbridge/src/tui/components/DockStrip.tsx
+++ b/apps/madbridge/src/tui/components/DockStrip.tsx
@@ -83,7 +83,7 @@ export function buildDockLine(
     fields.push(live);
   } else if (isActiveWriter(state, surface)) {
     const tok = writerToken(state, surface);
-    fields.push("WRITER tok#" + String(tok));
+    fields.push(tok === null ? "WRITER token —" : "WRITER tok#" + String(tok));
   }

   fields.push(role);
diff --git a/apps/madbridge/src/tui/components/EventLog.tsx b/apps/madbridge/src/tui/components/EventLog.tsx
index afb7f0d..802f80c 100644
--- a/apps/madbridge/src/tui/components/EventLog.tsx
+++ b/apps/madbridge/src/tui/components/EventLog.tsx
@@ -34,7 +34,7 @@ export function EventLog({ entries }: Props) {
           <text> </text>
           <text fg={POSEIDON.lightText}>{entry.actor}</text>
           <text> </text>
-          <text fg={POSEIDON.cobalt}>tok:{entry.fencingToken}</text>
+          <text fg={POSEIDON.cobalt}>{entry.fencingToken === null ? "tok:—" : "tok:" + String(entry.fencingToken)}</text>
           <text> </text>
           <text attributes={TextAttributes.DIM}>
             {entry.hash.slice(0, 12)}
diff --git a/apps/madbridge/src/tui/components/IncidentBand.tsx b/apps/madbridge/src/tui/components/IncidentBand.tsx
index d7b2d38..e980375 100644
--- a/apps/madbridge/src/tui/components/IncidentBand.tsx
+++ b/apps/madbridge/src/tui/components/IncidentBand.tsx
@@ -46,13 +46,13 @@ export function IncidentBand({ state }: IncidentBandProps) {
   const incidentId = incident?.id ?? "—";
   const timestamp = incident?.timestamp ?? "—";
   // The retained fencing token is historical, NOT live authority.
-  const token = state?.fencingToken ?? 0;
+  const token = state?.fencingToken;

   // Truth boundary: a fencing token is only real evidence when one was
   // actually issued (tokens are 1-based). A missing/zero token must never be
   // presented as an issued token that was invalidated — that would fabricate
   // authority history. Render an honest fallback instead.
-  const tokenClause = token > 0
+  const tokenClause = token === null ? "token —" : token !== undefined && token > 0
     ? "token #" + String(token) + " invalidated"
     : "no issued token to invalidate";

diff --git a/apps/madbridge/src/tui/components/StatusBar.tsx b/apps/madbridge/src/tui/components/StatusBar.tsx
index c00df18..b5187d9 100644
--- a/apps/madbridge/src/tui/components/StatusBar.tsx
+++ b/apps/madbridge/src/tui/components/StatusBar.tsx
@@ -27,7 +27,7 @@ import { displayWidth, sliceByDisplayWidth, seatMode, seatLabel } from "./agent-

 interface Props {
   state: BrokerSnapshot | null;
-  connected: boolean;
+  connected: boolean | null;
   focus: FocusTarget;
   /** The active Founder seat (LOCAL UI posture). When omitted, the seat
    * fact is omitted from the line — never fabricated. */
@@ -68,7 +68,7 @@ export function StatusBar({ state, connected, focus, seat, widthOverride }: Prop
 // ─── Pure truncation logic (unit-testable without rendering) ───

 export interface StatusLineInput {
-  connected: boolean;
+  connected: boolean | null;
   sessionWord: string;
   ownerWord: string;
   pendingCount: number;
@@ -103,7 +103,7 @@ export function buildStatusLine(input: StatusLineInput): string {
   const hasSeat = input.seatWord !== undefined && input.modeWord !== undefined;

   // Build the fact tokens.
-  const connToken = input.connected ? "CONNECTED" : "NOT CONNECTED";
+  const connToken = input.connected === null ? "UNKNOWN" : input.connected ? "CONNECTED" : "NOT CONNECTED";
   const sessToken = "session " + input.sessionWord;
   const writerToken = "writer " + input.ownerWord;
   const pendToken = "pending " + String(input.pendingCount);
@@ -129,7 +129,7 @@ export function buildStatusLine(input: StatusLineInput): string {
   }

   // ── Compact tokens ──
-  const connCompact = input.connected ? "CONN" : "NOCONN";
+  const connCompact = input.connected === null ? "UNKNOWN" : input.connected ? "CONN" : "NOCONN";
   const sessCompact = "S:" + input.sessionWord;
   const pendCompact = "P:" + String(input.pendingCount);
   const focusCompact = "F:" + input.focusWord;
@@ -277,14 +277,15 @@ export function abbreviateWriter(ownerWord: string, maxLen: number): string {
   // Explicit no-token state: keep the marker attached to the writer ID with a
   // single space, and preserve the marker the same way an issued "#N" token is
   // preserved — the ID yields budget first.
-  const noTokenMatch = /^(.*?)\s*\(token\s+none\)\s*$/i.exec(ownerWord);
+  const noTokenMatch = /^(.*?)\s*\(token\s+(none|—)\)\s*$/i.exec(ownerWord);
   if (noTokenMatch) {
     const id = (noTokenMatch{U+005B}1{U+005D} ?? "").replace(/\s+/g, "");
-    if (displayWidth(id) + displayWidth(NO_TOKEN_MARKER) <= maxLen) return id + NO_TOKEN_MARKER;
-    const idBudget = maxLen - displayWidth(NO_TOKEN_MARKER);
+    const marker = noTokenMatch{U+005B}2{U+005D} === "—" ? " T:—" : NO_TOKEN_MARKER;
+    if (displayWidth(id) + displayWidth(marker) <= maxLen) return id + marker;
+    const idBudget = maxLen - displayWidth(marker);
     // Marker alone exceeds the budget — keep the marker, drop the ID.
-    if (idBudget <= 0) return NO_TOKEN_MARKER.trimStart().slice(0, maxLen);
-    return sliceByDisplayWidth(id, idBudget) + NO_TOKEN_MARKER;
+    if (idBudget <= 0) return marker.trimStart().slice(0, maxLen);
+    return sliceByDisplayWidth(id, idBudget) + marker;
   }

   // Remove spaces (the compact format has no spaces)
@@ -348,19 +349,18 @@ function describeOwner(state: BrokerSnapshot | null): string {
   const o = state.ownershipState;
   const w = state.activeWriter;
   const tok = state.fencingToken;
-  const hasToken = tok > 0;
+  const suffix = tok === null ? " (token —)" : tok > 0 ? " #" + String(tok) : " (token none)";
   switch (o) {
+    case null:
+      return "UNKNOWN";
     case "free":
       return "free";
     case "owned":
-      if (hasToken) return (w ?? "unknown") + " #" + String(tok);
-      return (w ?? "unknown") + " (token none)";
+      return (w ?? "unknown") + suffix;
     case "transfer-requested":
-      if (hasToken) return "transfer-req #" + String(tok);
-      return "transfer-req (token none)";
+      return "transfer-req" + suffix;
     case "sender-released":
-      if (hasToken) return "released #" + String(tok);
-      return "released (token none)";
+      return "released" + suffix;
     case "receiver-validating":
       return "validating";
     case "rejected":
diff --git a/apps/madbridge/src/tui/components/agent-identity.ts b/apps/madbridge/src/tui/components/agent-identity.ts
index bb50f39..6729036 100644
--- a/apps/madbridge/src/tui/components/agent-identity.ts
+++ b/apps/madbridge/src/tui/components/agent-identity.ts
@@ -128,6 +128,7 @@ export function writerToken(state: BrokerSnapshot | null, surface: AgentSurface)
  */
 export function livenessWord(state: BrokerSnapshot | null): string {
   if (!state) return "STREAM ENDED";
+  if (state.connected === null) return "UNKNOWN";
   if (!state.connected) return "STREAM ENDED";
   if (state.sessionState === "interrupted") return "WRITING FROZEN";
   if (state.incident !== null) return "WRITING FROZEN";
diff --git a/apps/madbridge/src/tui/hooks/useBrokerState.ts b/apps/madbridge/src/tui/hooks/useBrokerState.ts
index c6e6c02..b7dff76 100644
--- a/apps/madbridge/src/tui/hooks/useBrokerState.ts
+++ b/apps/madbridge/src/tui/hooks/useBrokerState.ts
@@ -9,7 +9,7 @@ import type { BrokerSnapshot } from "../types";

 export interface BrokerStateHook {
   readonly state: BrokerSnapshot | null;
-  readonly connected: boolean;
+  readonly connected: boolean | null;
   readonly subscribe: (listener: (snapshot: BrokerSnapshot) => void) => () => void;
 }

@@ -21,7 +21,7 @@ export function useBrokerState(
   externalSubscribe?: (listener: (snapshot: BrokerSnapshot) => void) => () => void,
 ): BrokerStateHook {
   const {U+005B}state, setState{U+005D} = useState<BrokerSnapshot | null>(null);
-  const {U+005B}connected, setConnected{U+005D} = useState(false);
+  const {U+005B}connected, setConnected{U+005D} = useState<boolean | null>(false);
   const unsubscribeRef = useRef<(() => void) | null>(null);

   useEffect(() => {
diff --git a/apps/madbridge/src/tui/live/projection.ts b/apps/madbridge/src/tui/live/projection.ts
new file mode 100644
index 0000000..a6e4f4c
--- /dev/null
+++ b/apps/madbridge/src/tui/live/projection.ts
@@ -0,0 +1,163 @@
+import type { BrokerSnapshot as ClientSnapshot, PendingApprovalSnapshot } from "@madventures/broker";
+import { KNOWN_COMMAND_CATEGORIES, KNOWN_DATA_CLASSES, KNOWN_ROLES, parseSurfaceId } from "@madventures/protocol";
+import type { ApprovalColorState, BrokerSnapshot } from "../types";
+
+type Check = (value: unknown, member: string) => void;
+type Fields = Readonly<Record<string, Check>>;
+
+function fault(member: string, problem: string): never {
+  throw new TypeError(member + ": " + problem);
+}
+
+function primitive(type: "string" | "number" | "boolean"): Check {
+  return (value, member) => {
+    if (typeof value !== type) fault(member, "expected " + type);
+  };
+}
+const string = primitive("string");
+const number = primitive("number");
+const boolean = primitive("boolean");
+
+function oneOf(...allowed: readonly (string | boolean){U+005B}{U+005D}): Check {
+  return (value, member) => {
+    if (!allowed.some(item => item === value)) fault(member, "outside the declared set");
+  };
+}
+
+function nullable(check: Check): Check {
+  return (value, member) => { if (value !== null) check(value, member); };
+}
+
+function list(check: Check): Check {
+  return (value, member) => {
+    if (!Array.isArray(value)) fault(member, "expected array");
+    for (const element of value) check(element, member + "{U+005B}{U+005D}");
+  };
+}
+
+function tuple(...elements: readonly Check{U+005B}{U+005D}): Check {
+  return (value, member) => {
+    if (!Array.isArray(value) || value.length !== elements.length) fault(member, "expected tuple");
+    elements.forEach((check, index) => check(value{U+005B}index{U+005D}, member + "{U+005B}{U+005D}"));
+  };
+}
+
+function isRecord(value: unknown): value is Record<string, unknown> {
+  return value !== null && typeof value === "object" && !Array.isArray(value);
+}
+
+function record(required: Fields, optional: Fields = {}): Check {
+  return (value, member) => {
+    if (!isRecord(value)) fault(member, "expected object");
+    for (const {U+005B}key, check{U+005D} of Object.entries(required)) {
+      const path = member + "." + key;
+      if (!Object.hasOwn(value, key)) fault(path, "missing");
+      check(value{U+005B}key{U+005D}, path);
+    }
+    for (const {U+005B}key, check{U+005D} of Object.entries(optional)) {
+      if (Object.hasOwn(value, key)) check(value{U+005B}key{U+005D}, member + "." + key);
+    }
+  };
+}
+
+const surface: Check = (value, member) => {
+  if (typeof value !== "string") fault(member, "expected surface identifier");
+  try { parseSurfaceId(value); } catch { fault(member, "invalid surface identifier"); }
+};
+const fingerprint = record({
+  kind: oneOf("commit", "working_tree"), sha256: string, git_sha: string,
+}, { base_git_sha: string });
+const identity = record({
+  execution_id: string, role: oneOf(...KNOWN_ROLES), surface, model: string,
+  provider: string, independence_domain: string, effort: oneOf("low", "medium", "high"),
+});
+const task = record({
+  protocol_version: oneOf("madbridge-protocol/v1"), task_id: string, authorization_reference: string,
+  repository: string, branch: string, worktree: string, repository_fingerprint: fingerprint,
+  executions: list(identity), initial_writer: string,
+  scope: record({
+    allowedReadPaths: list(string), allowedWritePaths: list(string),
+    allowedCommandCategories: list(oneOf(...KNOWN_COMMAND_CATEGORIES)),
+    allowedArtifactCategories: list(oneOf("code", "diff", "document", "report", "test-result")),
+    maxArtifactSizeBytes: number, dataClass: oneOf(...KNOWN_DATA_CLASSES), allowedEgressDestinations: list(string),
+  }),
+  pair_constraints: record({
+    required_roles: tuple(oneOf("builder"), oneOf("independent-reviewer")),
+    require_distinct_providers: oneOf(true), require_distinct_independence_domains: oneOf(true),
+    prohibit_self_review: oneOf(true),
+  }, { allowed_surface_pairs: list(tuple(surface, surface)) }),
+  expires_at: string, created_at: string, envelope_hash: string,
+});
+const execution = record({
+  identity, state: oneOf("declared", "host-starting", "launching", "attesting", "ready", "exited", "failed"),
+  hostPid: nullable(number), childPid: nullable(number), processGroupId: nullable(number),
+  executablePath: string, executableSha256: string, exitCode: nullable(number), exitSignal: nullable(string),
+});
+
+const ownerFields = { executionId: string, worktreeId: string, fencingToken: number };
+const ownerKind = record({ kind: oneOf("free", "owned", "transfer-requested", "sender-released", "rejected") });
+const owned = record({ ...ownerFields, repositoryFingerprint: fingerprint });
+const transferring = record({ ...ownerFields, repositoryFingerprint: fingerprint, transferTo: string });
+const rejected = record({ ...ownerFields, reason: string });
+
+const ownership: Check = (value, member) => {
+  if (!isRecord(value)) fault(member, "expected ownership object");
+  ownerKind(value, member);
+  switch (value.kind) {
+    case "owned": owned(value, member); break;
+    case "transfer-requested":
+    case "sender-released": transferring(value, member); break;
+    case "rejected": rejected(value, member); break;
+  }
+};
+
+const snapshotShape = record({
+  sessionId: string, snapshotSeq: nullable(number), connected: nullable(boolean),
+  phase: oneOf("starting", "active", "paused", "interrupted", "closing", "closed"),
+  taskEnvelopeHash: string, task: nullable(task), repositoryFingerprint: fingerprint,
+  executions: nullable(list(execution)), activeWriterExecutionId: nullable(string), fencingToken: nullable(number),
+  tokenState: oneOf("not_issued", "valid", "invalidated"), ownershipState: nullable(ownership),
+  pendingApprovals: list(record({
+    id: string, type: string, actor: string, taskId: string, repositoryFingerprint: fingerprint,
+    scope: string, timestamp: string, state: oneOf("pending", "approved", "rejected", "expired"),
+  })),
+  pendingTransfers: nullable(list(record({
+    id: string, from: string, to: string, reason: string, fencingToken: number, timestamp: string,
+  }))),
+  permissionSummary: nullable(record({
+    allowedReadPaths: list(string), allowedWritePaths: list(string), allowedCommandCategories: list(string),
+    allowedEgressDestinations: list(string), dataClass: string,
+  })),
+  verification: nullable(record({
+    result: oneOf("pass", "fail", "warning", "pending"), detail: string, verifiedBy: string, timestamp: string,
+  })),
+  review: nullable(record({
+    decision: oneOf("approved", "changes-requested", "rejected", "pending"), comments: string, reviewedBy: string, timestamp: string,
+  })),
+  incident: nullable(record({ id: string, reason: string, timestamp: string, severity: oneOf("low", "medium", "high") })),
+  eventLog: list(record({ seq: number, type: string, actor: string, fencingToken: nullable(number), hash: string, timestamp: string })),
+  queueDepth: nullable(number), ledgerSeq: number,
+});
+
+function approvalColor(kind: PendingApprovalSnapshot{U+005B}"state"{U+005D}): ApprovalColorState {
+  switch (kind) {
+    case "pending": return { kind, text: "PENDING — awaiting Founder decision" };
+    case "approved": return { kind, text: "APPROVED — Founder authorized" };
+    case "rejected": return { kind, text: "REJECTED — Founder denied" };
+    case "expired": return { kind, text: "EXPIRED — decision window elapsed" };
+  }
+}
+
+export function clientSnapshotToProjection(snapshot: ClientSnapshot): BrokerSnapshot {
+  snapshotShape(snapshot, "snapshot");
+  return {
+    connected: snapshot.connected, sessionState: snapshot.phase, ownershipState: snapshot.ownershipState?.kind ?? null,
+    activeWriter: snapshot.activeWriterExecutionId, fencingToken: snapshot.fencingToken, task: snapshot.task,
+    executions: snapshot.executions?.map(execution => execution.identity) ?? null,
+    repositoryFingerprint: snapshot.repositoryFingerprint,
+    pendingApprovals: snapshot.pendingApprovals.map(({ state, ...approval }) => ({ ...approval, colorState: approvalColor(state) })),
+    pendingTransfers: snapshot.pendingTransfers, permissionSummary: snapshot.permissionSummary, transferPhase: null,
+    verificationStatus: snapshot.verification, reviewStatus: snapshot.review, incident: snapshot.incident,
+    eventLog: snapshot.eventLog, queueDepth: snapshot.queueDepth,
+  };
+}
diff --git a/apps/madbridge/src/tui/live/subscribe.ts b/apps/madbridge/src/tui/live/subscribe.ts
new file mode 100644
index 0000000..b968153
--- /dev/null
+++ b/apps/madbridge/src/tui/live/subscribe.ts
@@ -0,0 +1,39 @@
+import type { BrokerClient } from "@madventures/broker";
+import { isDeepStrictEqual } from "node:util";
+import { waitForSnapshotTick } from "../../../../../packages/supervisor/src/index";
+import type { BrokerSnapshot } from "../types";
+import { clientSnapshotToProjection } from "./projection";
+
+export function subscribeToClient(client: BrokerClient) {
+  return (listener: (projection: BrokerSnapshot) => void): (() => void) => {
+    const controller = new AbortController();
+    const { signal } = controller;
+    let last: BrokerSnapshot | undefined;
+
+    async function read(): Promise<void> {
+      while (!signal.aborted) {
+        let next: BrokerSnapshot;
+        try {
+          const snapshot = await client.getSnapshot();
+          if (signal.aborted) return;
+          next = clientSnapshotToProjection(snapshot);
+        } catch {
+          if (last && !signal.aborted) listener({ ...last, connected: false });
+          return;
+        }
+
+        const closed = next.connected === false;
+        if (closed || !isDeepStrictEqual(last, next)) {
+          last = next;
+          listener(next);
+        }
+        if (closed || signal.aborted) return;
+        await waitForSnapshotTick(signal);
+      }
+    }
+
+    // A listener that throws also ends its own subscription.
+    void read().catch(() => controller.abort());
+    return () => controller.abort();
+  };
+}
diff --git a/apps/madbridge/src/tui/panes/AntigravityPane.tsx b/apps/madbridge/src/tui/panes/AntigravityPane.tsx
index 0350341..5ab2cd4 100644
--- a/apps/madbridge/src/tui/panes/AntigravityPane.tsx
+++ b/apps/madbridge/src/tui/panes/AntigravityPane.tsx
@@ -40,8 +40,8 @@ export function AntigravityPane({ active, state, ptyOutput }: AntigravityPanePro

   const headerParts: string{U+005B}{U+005D} = {U+005B}"ANTIGRAVITY"{U+005D};
   if (active) headerParts.push("FOCUSED");
-  if (writer && tok !== null) {
-    headerParts.push("WRITER tok#" + String(tok));
+  if (writer) {
+    headerParts.push(tok === null ? "WRITER token —" : "WRITER tok#" + String(tok));
   } else if (live !== "LIVE") {
     // No current-writer claim while not live (disconnected, interrupted,
     // or incident). Show the truthful liveness word instead.
diff --git a/apps/madbridge/src/tui/panes/ClaudePane.tsx b/apps/madbridge/src/tui/panes/ClaudePane.tsx
index 44ab0b4..d35a5c5 100644
--- a/apps/madbridge/src/tui/panes/ClaudePane.tsx
+++ b/apps/madbridge/src/tui/panes/ClaudePane.tsx
@@ -39,8 +39,8 @@ export function ClaudePane({ active, state, ptyOutput }: ClaudePaneProps) {
   // Build the header line truthfully.
   const headerParts: string{U+005B}{U+005D} = {U+005B}"CLAUDE CODE"{U+005D};
   if (active) headerParts.push("FOCUSED");
-  if (writer && tok !== null) {
-    headerParts.push("WRITER tok#" + String(tok));
+  if (writer) {
+    headerParts.push(tok === null ? "WRITER token —" : "WRITER tok#" + String(tok));
   } else if (live !== "LIVE") {
     // No current-writer claim while not live (disconnected, interrupted,
     // or incident). Show the truthful liveness word instead. Real buffered
diff --git a/apps/madbridge/src/tui/panes/GovernancePane.tsx b/apps/madbridge/src/tui/panes/GovernancePane.tsx
index 8bd7d80..8e72ec6 100644
--- a/apps/madbridge/src/tui/panes/GovernancePane.tsx
+++ b/apps/madbridge/src/tui/panes/GovernancePane.tsx
@@ -51,7 +51,7 @@ export function GovernancePane({ active, state }: GovernancePaneProps) {
   if (!state || !state.connected) {
     return (
       <box flexGrow={1} flexDirection="column" borderStyle="single" borderColor={active ? POSEIDON.accent : POSEIDON.uiBorder} overflow="hidden">
-        <text>{fit("GOVERNANCE | NOT CONNECTED")}</text>
+        <text>{fit(state?.connected === null ? "GOVERNANCE | UNKNOWN" : "GOVERNANCE | NOT CONNECTED")}</text>
         <text>{fit("No current permissions, verification, or review.")}</text>
       </box>
     );
@@ -66,10 +66,10 @@ export function GovernancePane({ active, state }: GovernancePaneProps) {
   const transfer = state.pendingTransfers?.{U+005B}0{U+005D} ?? null;

   // Render empty allowed lists as "none", not healthy/active/unknown.
-  const readPaths = perms?.allowedReadPaths?.length ? perms.allowedReadPaths.join(", ") : "none";
-  const writePaths = perms?.allowedWritePaths?.length ? perms.allowedWritePaths.join(", ") : "none";
-  const cmdCats = perms?.allowedCommandCategories?.length ? perms.allowedCommandCategories.join(", ") : "none";
-  const egress = perms?.allowedEgressDestinations?.length ? perms.allowedEgressDestinations.join(", ") : "none";
+  const readPaths = perms === null ? "—" : perms?.allowedReadPaths?.length ? perms.allowedReadPaths.join(", ") : "none";
+  const writePaths = perms === null ? "—" : perms?.allowedWritePaths?.length ? perms.allowedWritePaths.join(", ") : "none";
+  const cmdCats = perms === null ? "—" : perms?.allowedCommandCategories?.length ? perms.allowedCommandCategories.join(", ") : "none";
+  const egress = perms === null ? "—" : perms?.allowedEgressDestinations?.length ? perms.allowedEgressDestinations.join(", ") : "none";
   const dataClass = perms?.dataClass ?? "—";

   // Build all rows as plain strings — each will be truncated to fit.
@@ -79,10 +79,10 @@ export function GovernancePane({ active, state }: GovernancePaneProps) {
   rows.push("Fingerprint: " + (state.repositoryFingerprint ? state.repositoryFingerprint.git_sha.slice(0, 12) : "—"));
   rows.push("Claude: " + (cl?.execution_id ?? "—"));
   rows.push("Antigravity: " + (agy?.execution_id ?? "—"));
-  rows.push("Writer: " + (state.activeWriter ?? "—") + " | Token: " + String(state.fencingToken) + " | Ownership: " + state.ownershipState);
+  rows.push("Writer: " + (state.activeWriter ?? "—") + " | Token: " + (state.fencingToken ?? "—") + " | Ownership: " + (state.ownershipState ?? "UNKNOWN"));
   rows.push("Read: " + readPaths + " | Write: " + writePaths);
   rows.push("Commands: " + cmdCats + " | Egress: " + egress + " | Data class: " + dataClass);
-  rows.push("Transfer phase: " + (state.transferPhase ?? "none") + " | Pending transfers: " + String(state.pendingTransfers?.length ?? 0));
+  rows.push("Transfer phase: " + (state.transferPhase ?? "none") + " | Pending transfers: " + String(state.pendingTransfers?.length ?? "—"));
   if (transfer) {
     rows.push("Transfer: " + transfer.from + " → " + transfer.to + " | tok#" + String(transfer.fencingToken) + " | " + transfer.reason);
     // Provenance timestamp on its own row so the label survives narrow-width
diff --git a/apps/madbridge/src/tui/types.ts b/apps/madbridge/src/tui/types.ts
index 81b4299..cd5c464 100644
--- a/apps/madbridge/src/tui/types.ts
+++ b/apps/madbridge/src/tui/types.ts
@@ -91,7 +91,7 @@ export interface ApprovalRequestEvent {

 /** Immutable broker snapshot for TUI consumption. */
 export interface BrokerSnapshot {
-  readonly connected: boolean;
+  readonly connected: boolean | null;
   readonly sessionState:
     | "starting"
     | "active"
@@ -106,21 +106,22 @@ export interface BrokerSnapshot {
     | "transfer-requested"
     | "sender-released"
     | "receiver-validating"
-    | "rejected";
+    | "rejected"
+    | null;
   readonly activeWriter: string | null;
-  readonly fencingToken: number;
+  readonly fencingToken: number | null;
   readonly task: TaskEnvelopeV1 | null;
-  readonly executions: readonly ExecutionIdentity{U+005B}{U+005D};
+  readonly executions: readonly ExecutionIdentity{U+005B}{U+005D} | null;
   readonly repositoryFingerprint: RepositoryFingerprint | null;
   readonly pendingApprovals: readonly PendingApproval{U+005B}{U+005D};
-  readonly pendingTransfers: readonly PendingTransfer{U+005B}{U+005D};
-  readonly permissionSummary: PermissionSummary;
+  readonly pendingTransfers: readonly PendingTransfer{U+005B}{U+005D} | null;
+  readonly permissionSummary: PermissionSummary | null;
   readonly transferPhase: string | null;
   readonly verificationStatus: VerificationStatus | null;
   readonly reviewStatus: ReviewStatus | null;
   readonly incident: IncidentRecord | null;
   readonly eventLog: readonly LedgerEntryProjection{U+005B}{U+005D};
-  readonly queueDepth: number;
+  readonly queueDepth: number | null;
 }

 export interface PendingApproval {
@@ -176,7 +177,7 @@ export interface LedgerEntryProjection {
   readonly seq: number;
   readonly type: string;
   readonly actor: string;
-  readonly fencingToken: number;
+  readonly fencingToken: number | null;
   readonly hash: string;
   readonly timestamp: string;
 }
diff --git a/apps/madbridge/test/tui-projection.test.tsx b/apps/madbridge/test/tui-projection.test.tsx
index c066104..33c41fa 100644
--- a/apps/madbridge/test/tui-projection.test.tsx
+++ b/apps/madbridge/test/tui-projection.test.tsx
@@ -149,10 +149,10 @@ describe("Governance pane projection", () => {

   test("snapshot contains both execution identities", () => {
     const snapshot = makeFullSnapshot();
-    expect(snapshot.executions.length).toBe(2);
+    expect(snapshot.executions!.length).toBe(2);

-    const claude = snapshot.executions.find((e) => e.surface === "claude-code");
-    const antigravity = snapshot.executions.find((e) => e.surface === "antigravity");
+    const claude = snapshot.executions!.find((e) => e.surface === "claude-code");
+    const antigravity = snapshot.executions!.find((e) => e.surface === "antigravity");
     expect(claude).toBeDefined();
     expect(antigravity).toBeDefined();
     expect(claude!.model).toBe("claude-sonnet-4");
@@ -170,13 +170,13 @@ describe("Governance pane projection", () => {

   test("snapshot contains permission summaries", () => {
     const snapshot = makeFullSnapshot();
-    expect(snapshot.permissionSummary.allowedReadPaths).toContain("./src");
-    expect(snapshot.permissionSummary.allowedWritePaths).toContain("./src");
-    expect(snapshot.permissionSummary.allowedCommandCategories).toContain("read");
-    expect(snapshot.permissionSummary.allowedCommandCategories).toContain("write");
-    expect(snapshot.permissionSummary.allowedCommandCategories).toContain("test");
-    expect(snapshot.permissionSummary.dataClass).toBe("internal");
-    expect(snapshot.permissionSummary.allowedEgressDestinations.length).toBe(0);
+    expect(snapshot.permissionSummary!.allowedReadPaths).toContain("./src");
+    expect(snapshot.permissionSummary!.allowedWritePaths).toContain("./src");
+    expect(snapshot.permissionSummary!.allowedCommandCategories).toContain("read");
+    expect(snapshot.permissionSummary!.allowedCommandCategories).toContain("write");
+    expect(snapshot.permissionSummary!.allowedCommandCategories).toContain("test");
+    expect(snapshot.permissionSummary!.dataClass).toBe("internal");
+    expect(snapshot.permissionSummary!.allowedEgressDestinations.length).toBe(0);
   });

   test("snapshot contains pending actions", () => {
@@ -206,9 +206,9 @@ describe("Governance pane projection", () => {
       {U+005D},
     };
     expect(withTransfer.transferPhase).toBe("sender-released");
-    expect(withTransfer.pendingTransfers.length).toBe(1);
-    expect(withTransfer.pendingTransfers{U+005B}0{U+005D}!.from).toBe("exec-claude-code");
-    expect(withTransfer.pendingTransfers{U+005B}0{U+005D}!.to).toBe("exec-antigravity");
+    expect(withTransfer.pendingTransfers!.length).toBe(1);
+    expect(withTransfer.pendingTransfers!{U+005B}0{U+005D}!.from).toBe("exec-claude-code");
+    expect(withTransfer.pendingTransfers!{U+005B}0{U+005D}!.to).toBe("exec-antigravity");
   });

   test("snapshot contains verification status", () => {
@@ -374,7 +374,7 @@ describe("useBrokerState subscribes to immutable snapshots", () => {
     // Fields are readonly in the type definition.
     expect(snapshot.connected).toBe(true);
     expect(snapshot.task).not.toBeNull();
-    expect(snapshot.executions.length).toBe(2);
+    expect(snapshot.executions!.length).toBe(2);

     // The subscribe function returns an unsubscribe callback
     const unsubscribe = (snapshot: BrokerSnapshot) => {};
diff --git a/packages/adapter-claude-code/src/live.ts b/packages/adapter-claude-code/src/live.ts
index 84782f6..9166b9d 100644
--- a/packages/adapter-claude-code/src/live.ts
+++ b/packages/adapter-claude-code/src/live.ts
@@ -7,7 +7,7 @@ export function encodeUserInput(text: string): string {
   return JSON.stringify({ type: "user", message: { role: "user", content: text } }) + "\n";
 }

-type Cause = "attestation_missing" | "attestation_malformed" | "attestation_duplicate" |
+type Cause = "child_exited" | "host_exited" | "attestation_missing" | "attestation_malformed" | "attestation_duplicate" |
   "identity_mismatch" | "auth_failed" | "attestation_deadline" | "attestation_cancelled" |
   "attestation_tool_call" | "attestation_round_trips" | "attestation_budget_exhausted";
 type Verdict =
@@ -159,12 +159,14 @@ export function attestClaudeSession(input: Input, reserveWrite: () => boolean =
         if (fact.kind === "output" && fact.bytes) {
           const cause = reader.push(fact.bytes);
           if (cause) stop(cause);
-        } else if (fact.kind === "exited" || fact.kind === "drained") {
+        } else if (reader.complete && fact.kind === "exited") {
+          stop(reader.finish() ?? "child_exited");
+        } else if (!reader.complete && (fact.kind === "exited" || fact.kind === "drained")) {
           stop(reader.finish() ?? "attestation_missing");
         }
         if (failed) break;
       }
-      if (!failed) stop(reader.finish() ?? "attestation_missing");
+      if (!failed) stop(reader.complete ? "host_exited" : reader.finish() ?? "attestation_missing");
     } catch { stop("attestation_malformed"); }
     finally {
       clearTimeout(timer);
diff --git a/packages/adapter-claude-code/test/retry.test.ts b/packages/adapter-claude-code/test/retry.test.ts
new file mode 100644
index 0000000..8ed6dc1
--- /dev/null
+++ b/packages/adapter-claude-code/test/retry.test.ts
@@ -0,0 +1,30 @@
+import { expect, test } from "bun:test";
+import { ADAPTER_REGISTRY, parseSurfaceId } from "@madventures/protocol";
+import { attestClaudeSession } from "../src/live";
+import { attestationEvents } from "../../../test/phase3b/end-stand-in";
+import { wireFacts } from "../../../test/phase3b/wire-facts";
+
+for (const stage of {U+005B}"attestation", "active monitor"{U+005D} as const) {
+  test("an unregistered api_retry error preserves the " + stage, async () => {
+    const registration = ADAPTER_REGISTRY.get(parseSurfaceId("claude-code"))!;
+    const wire = wireFacts();
+    const model = "claude-fable-5-2";
+    const {U+005B}init, ...rest{U+005D} = attestationEvents("claude-code", model);
+    const retry = { type: "system", subtype: "api_retry", session_id: "offline-wire", error: "synthetic_unregistered_retry" };
+    expect(registration.auth_failure_detection).not.toContain("system/api_retry.error:" + retry.error);
+    const result = attestClaudeSession({ ...wire, registration, model });
+    try {
+      wire.events(init);
+      if (stage === "attestation") wire.events(retry);
+      wire.events(...rest);
+      expect((await result).ok).toBe(true);
+      if (stage === "active monitor") wire.events(retry);
+      // A subsequent registered failure proves the monitor consumed the retry
+      // and remained active long enough to classify the next event.
+      wire.events({ type: "system", subtype: "model_refusal_fallback", session_id: "offline-wire" });
+      wire.end();
+      while (!wire.closed) await Bun.sleep(1);
+      expect(wire.failures).toEqual({U+005B}"identity_mismatch"{U+005D});
+    } finally { wire.end(); }
+  });
+}
diff --git a/packages/adapter-madv-surface/src/live.ts b/packages/adapter-madv-surface/src/live.ts
index 4e5fc69..ca58ec8 100644
--- a/packages/adapter-madv-surface/src/live.ts
+++ b/packages/adapter-madv-surface/src/live.ts
@@ -3,7 +3,7 @@ import { EVIDENCE_DEADLINE_MS, MadvSurfaceParser, encodeAttestationInput, encode
   type MadvFailureCause, type MadvResult } from "./index";

 const PROMPT = "Reply with your model identifier and nothing else.";
-type Cause = MadvFailureCause | "attestation_deadline" | "attestation_cancelled" |
+type Cause = MadvFailureCause | "child_exited" | "host_exited" | "attestation_deadline" | "attestation_cancelled" |
   "attestation_tool_call" | "attestation_round_trips" | "attestation_budget_exhausted";
 interface Input {
   executionId: string;
@@ -72,16 +72,21 @@ export function attestMadvSession(input: Input, reserveWrite: () => boolean = ()
         if (!ready && performance.now() >= deadline) { stop("attestation_deadline"); break; }
         if (fact.kind === "output" && fact.bytes) inspect(parser.push(fact.bytes));
         if (fact.kind === "exited") {
+          const handedOver = ready;
           const exitCode = fact.code ?? 1;
           const result = parser.finish(exitCode, fact.signal ?? null);
           const detection = detectMadvFailure(input.registration.auth_failure_detection, { kind: "child_exit", exitCode });
           if (detection && !parser.attestationFailure) stop(detection.cause, detection.reason);
           else inspect(result);
-          break;
+          if (handedOver && !failure) stop("child_exited");
+          return;
         }
         if (failure) break;
       }
-      if (!failure) inspect(parser.finish(0));
+      if (!failure) {
+        if (ready) stop("host_exited");
+        else inspect(parser.finish(0));
+      }
     } catch { stop("identity_mismatch", "malformed_stream"); }
     finally {
       closed = true;
diff --git a/packages/adapter-madv-surface/test/exit-causes.test.ts b/packages/adapter-madv-surface/test/exit-causes.test.ts
new file mode 100644
index 0000000..91f4ab2
--- /dev/null
+++ b/packages/adapter-madv-surface/test/exit-causes.test.ts
@@ -0,0 +1,74 @@
+import { expect, test } from "bun:test";
+import { attestClaudeSession } from "../../adapter-claude-code/src/live";
+import { closeOfflineBuild } from "../../../test/phase3b/offline";
+import { prepareM2 } from "../../../test/phase3b/m2-offline";
+import { attestationEvents } from "../../../test/phase3b/end-stand-in";
+import { wireFacts } from "../../../test/phase3b/wire-facts";
+import { runLiveTransactionalBuild, runPurePreflight } from "../../supervisor/src/index";
+import { attestMadvSession } from "../src/live";
+
+const exits = {U+005B}
+  { code: 0, reason: "child_exited" },
+  { code: 1, reason: "provider_error" },
+  { code: 3, reason: "identity_unavailable" },
+  { code: 4, reason: "identity_mismatch" },
+  { code: 5, reason: "auth_failed" },
+  { code: 6, reason: "endpoint_refused" },
+  { code: 7, reason: "model_refused" },
+  { code: 42, reason: "provider_error" },
+  { code: null, reason: "provider_error" },
+{U+005D} as const;
+
+for (const { code, reason } of exits) {
+  for (const stage of {U+005B}"before", "after"{U+005D} as const) {
+    const cause = code === 0 && stage === "before" ? "identity_unavailable" : reason;
+    const name = code === null ? "signal" : "code " + code;
+    test("madv " + name + " gives " + cause + " " + stage + " activation", async () => {
+      const f = prepareM2("madv-surface", false, "Founder close");
+      const wire = wireFacts();
+      const exit = { kind: "exited", code, signal: code === null ? "SIGTERM" : null };
+      const reported: string{U+005B}{U+005D} = {U+005B}{U+005D};
+      try {
+        const preflight = await runPurePreflight(f.input);
+        if (!preflight.ok) throw new Error("offline preflight failed");
+        const build = await runLiveTransactionalBuild({ sessionId: "offline-exit-cause", envelope: f.envelope,
+          plan: preflight.plan, signal: f.input.signal, attesterFor: surface => {
+            if (surface === "claude-code") return input => attestClaudeSession(input);
+            if (surface !== "madv-surface") return undefined;
+            return input => {
+              const verdict = attestMadvSession({ ...input, host: wire.host, reportFailure(actual) {
+                reported.push(actual);
+                input.reportFailure(actual);
+                wire.end();
+              } });
+              const events = attestationEvents("madv-surface", input.model);
+              if (stage === "after") wire.events(...events);
+              else { wire.events(events{U+005B}0{U+005D}); wire.push(exit); }
+              return verdict;
+            };
+          } });
+        try {
+          if (stage === "after") {
+            expect(build.ok).toBe(true);
+            if (!build.ok) throw new Error("active build required");
+            const client = build.state.client!;
+            expect((await client.getSnapshot()).phase).toBe("active");
+            expect(reported).toEqual({U+005B}{U+005D});
+            wire.push(exit);
+            const deadline = performance.now() + 5000;
+            while ((await client.getSnapshot()).phase !== "closed") {
+              if (performance.now() >= deadline) throw new Error("offline close deadline");
+              await Bun.sleep(5);
+            }
+          } else {
+            expect(build.ok).toBe(false);
+            if (build.ok) throw new Error("failed build required");
+            expect(build.failure).toBe("reattestation_failed");
+            expect(build.detail).toBe("step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=" + cause);
+          }
+          expect(reported).toEqual({U+005B}cause{U+005D});
+        } finally { wire.end(); await closeOfflineBuild(build); }
+      } finally { wire.end(); f.dispose(); }
+    }, 20_000);
+  }
+}
diff --git a/packages/adapter-madv-surface/test/live.test.ts b/packages/adapter-madv-surface/test/live.test.ts
index dd3093d..50f31be 100644
--- a/packages/adapter-madv-surface/test/live.test.ts
+++ b/packages/adapter-madv-surface/test/live.test.ts
@@ -49,7 +49,7 @@ test("madv encodes no_tools only on the attestation message", async () => {
   wire.events(response, assistant, result);
   wire.end();
   while (!wire.closed) await Bun.sleep(1);
-  expect(wire.failures).toEqual({U+005B}{U+005D});
+  expect(wire.failures).toEqual({U+005B}"host_exited"{U+005D});
 });

 test("madv requires init, model response, assistant and success in order", async () => {
diff --git a/packages/supervisor/src/build.ts b/packages/supervisor/src/build.ts
index 94f7887..e216d06 100644
--- a/packages/supervisor/src/build.ts
+++ b/packages/supervisor/src/build.ts
@@ -145,7 +145,7 @@ export interface LiveBuildInput extends BuildInput {

 // Use only build-owned literals in ledger and caller-visible detail.
 function liveFailureCause(surface: SurfaceId, reported: unknown): string {
-  const shared = {U+005B}"auth_failed", "identity_mismatch", "attestation_deadline", "attestation_cancelled",
+  const shared = {U+005B}"child_exited", "host_exited", "auth_failed", "identity_mismatch", "attestation_deadline", "attestation_cancelled",
     "attestation_tool_call", "attestation_round_trips", "attestation_budget_exhausted"{U+005D};
   const specific = surface === "madv-surface"
     ? {U+005B}"endpoint_refused", "provider_error", "identity_unavailable", "model_refused", "domain_unresolved"{U+005D}
@@ -641,6 +641,8 @@ async function executeBuild(
     firstFailure = { executionId, surface, cause };
     if (sessionActivatedRow !== null && currentBroker !== null) {
       const reason = cause === "auth_failed" ? "authentication_expired"
+        : cause === "child_exited" ? "child_failure"
+        : cause === "host_exited" ? "pty_host_failure"
         : cause === "provider_error" || cause === "endpoint_refused" ? "adapter_failure" : "identity_mismatch";
       const phase = currentBroker.snapshotProjectionInput().lifecycle.phase;
       if (phase === "active" || phase === "paused") {
diff --git a/packages/supervisor/src/index.ts b/packages/supervisor/src/index.ts
index 1e7f27c..ff8ef92 100644
--- a/packages/supervisor/src/index.ts
+++ b/packages/supervisor/src/index.ts
@@ -28,3 +28,5 @@ export type {
   PartialBuildState,
   RollbackOutcome,
 } from "./build";
+
+export { waitForSnapshotTick } from "./snapshot-timer";
diff --git a/packages/supervisor/src/snapshot-timer.ts b/packages/supervisor/src/snapshot-timer.ts
new file mode 100644
index 0000000..1691dab
--- /dev/null
+++ b/packages/supervisor/src/snapshot-timer.ts
@@ -0,0 +1,15 @@
+// Bound the rate of projection reads for each live TUI subscription.
+export const SNAPSHOT_INTERVAL_MS = 100;
+
+export function waitForSnapshotTick(signal: AbortSignal): Promise<void> {
+  if (signal.aborted) return Promise.resolve();
+  return new Promise(resolve => {
+    function finish(): void {
+      clearTimeout(timer);
+      signal.removeEventListener("abort", finish);
+      resolve();
+    }
+    const timer = setTimeout(finish, SNAPSHOT_INTERVAL_MS);
+    signal.addEventListener("abort", finish, { once: true });
+  });
+}
diff --git a/packages/supervisor/test/snapshot-timer.test.ts b/packages/supervisor/test/snapshot-timer.test.ts
new file mode 100644
index 0000000..24e5060
--- /dev/null
+++ b/packages/supervisor/test/snapshot-timer.test.ts
@@ -0,0 +1,29 @@
+import { expect, test } from "bun:test";
+import { getEventListeners } from "node:events";
+import { waitForSnapshotTick } from "../src/index";
+import { SNAPSHOT_INTERVAL_MS } from "../src/snapshot-timer";
+
+test("the snapshot wait paces reads and settles promptly on cancellation", async () => {
+  const controller = new AbortController();
+  const { signal } = controller;
+  const start = performance.now();
+  const stream = {U+005B}"first"{U+005D};
+  const tick = waitForSnapshotTick(signal).then(() => { stream.push("next"); });
+  expect(SNAPSHOT_INTERVAL_MS).toBe(100);
+  expect(getEventListeners(signal, "abort")).toHaveLength(1);
+  await Promise.resolve();
+  expect(stream).toEqual({U+005B}"first"{U+005D});
+  await tick;
+  expect(performance.now() - start).toBeGreaterThanOrEqual(95);
+  expect(stream).toEqual({U+005B}"first", "next"{U+005D});
+  expect(getEventListeners(signal, "abort")).toHaveLength(0);
+
+  let cancelled = false;
+  const pending = waitForSnapshotTick(signal).then(() => { cancelled = true; });
+  controller.abort();
+  await Promise.resolve();
+  expect(cancelled).toBe(true);
+  await pending;
+  await waitForSnapshotTick(signal);
+  expect(getEventListeners(signal, "abort")).toHaveLength(0);
+});
diff --git a/scripts/phase3b/child-ends.ts b/scripts/phase3b/child-ends.ts
new file mode 100644
index 0000000..7a39bf4
--- /dev/null
+++ b/scripts/phase3b/child-ends.ts
@@ -0,0 +1,33 @@
+import { writeFileSync } from "node:fs";
+import { join } from "node:path";
+import { activeCases, observeChildEnd, surfaces } from "../../test/phase3b/child-end";
+
+if (import.meta.main) {
+  const directory = process.argv{U+005B}2{U+005D};
+  if (!directory) throw new Error("An evidence directory is required.");
+  const write = (name: string, observation: Awaited<ReturnType<typeof observeChildEnd>>) => {
+    writeFileSync(join(directory, name), "Offline M2 | end-stand-in.ts\n" + JSON.stringify(observation, null, 2) + "\n",
+      { mode: 0o600, flag: "wx" });
+    console.log(name);
+  };
+  for (const surface of surfaces) {
+    for (const {U+005B}end, cause{U+005D} of {U+005B}{U+005B}"clean exit", "child_exited"{U+005D}, {U+005B}"host end", "host_exited"{U+005D}{U+005D} as const) {
+      const seen = await observeChildEnd(surface, true, end);
+      if (seen.phase || seen.component !== "reattest" || !seen.detail.endsWith("failure=reattestation_failed surface=" + surface + " cause=" + cause)) {
+        throw new Error("offline pre-activation observation differs");
+      }
+      write(surface + "-before-" + cause + ".txt", seen);
+    }
+  }
+  for (const {U+005B}surface, end, cause, reason{U+005D} of activeCases) {
+    const seen = await observeChildEnd(surface, false, end);
+    if (seen.phase !== "active" || seen.closed !== "interruption" || seen.interrupted.length !== 1 ||
+      seen.interrupted{U+005B}0{U+005D}?.reason !== reason || seen.interrupted{U+005B}0{U+005D}?.detail !== surface + ": " + cause) {
+      throw new Error("offline interruption observation differs");
+    }
+    write(surface + "-active-" + end.replaceAll(" ", "-") + ".txt", seen);
+  }
+  const seen = await observeChildEnd("claude-code", false, "Founder close");
+  if (seen.phase !== "active" || seen.closed !== "founder" || seen.interrupted.length) throw new Error("offline Founder close differs");
+  write("founder-close.txt", seen);
+}
diff --git a/scripts/phase3b/recorded-frames.tsx b/scripts/phase3b/recorded-frames.tsx
new file mode 100644
index 0000000..1062bf8
--- /dev/null
+++ b/scripts/phase3b/recorded-frames.tsx
@@ -0,0 +1,101 @@
+import { linkSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
+import { join } from "node:path";
+import { act } from "react";
+import { testRender } from "@opentui/react/test-utils";
+import type { BrokerClient, BrokerSnapshot } from "@madventures/broker";
+import { App } from "../../apps/madbridge/src/tui/App";
+import type { BrokerSnapshot as Projection } from "../../apps/madbridge/src/tui/types";
+import { composeLiveSession } from "../../apps/madbridge/src/tui/live/composition";
+import { clientSnapshotToProjection } from "../../apps/madbridge/src/tui/live/projection";
+import { prepareM2 } from "../../test/phase3b/m2-offline";
+
+async function recordStream() {
+  const f = prepareM2("claude-code", false, "Founder close");
+  const snapshots: BrokerSnapshot{U+005B}{U+005D} = {U+005B}{U+005D};
+  let client: BrokerClient | undefined;
+  try {
+    const outcome = await composeLiveSession({ ...f.start, async present(presented) {
+      client = presented;
+      snapshots.push(await presented.getSnapshot());
+    } });
+    if (outcome.exitCode !== 0) throw new Error("offline composition failed at " + outcome.component);
+    let settled = false;
+    const closing = outcome.close().finally(() => { settled = true; });
+    try {
+      if (!client) throw new Error("offline client was not presented");
+      const deadline = performance.now() + 8000;
+      let ending = "";
+      while (!ending) {
+        const afterClose = settled;
+        try {
+          const snapshot = await client.getSnapshot();
+          snapshots.push(snapshot);
+          if (snapshot.connected === false) ending = "client returned connected false";
+          else if (afterClose) ending = "final post-close read returned a snapshot";
+        } catch {
+          ending = afterClose ? "post-close snapshot read rejected" : "snapshot read rejected during close";
+        }
+        if (!ending && snapshots.length > 2) {
+          if (performance.now() >= deadline) throw new Error("offline snapshot deadline");
+          await Bun.sleep(2);
+        }
+      }
+      await closing;
+      return { snapshots, ending, founderClose: "completed" as const };
+    } finally { await closing; }
+  } finally { f.dispose(); }
+}
+
+async function render(snapshots: readonly BrokerSnapshot{U+005B}{U+005D}) {
+  let deliver: ((snapshot: Projection) => void) | undefined;
+  const screen = await testRender(<App subscribe={listener => {
+    deliver = listener;
+    return () => { deliver = undefined; };
+  }} catalogLoader={async () => ({ status: "ok", models: {U+005B}{U+005D} })} />, { width: 160, height: 38 });
+  const frames: string{U+005B}{U+005D} = {U+005B}{U+005D};
+  try {
+    await act(async () => { await screen.flush(); });
+    if (!deliver) throw new Error("offline frame subscription missing");
+    const notify = deliver;
+    for (const snapshot of snapshots) {
+      await act(async () => { notify(clientSnapshotToProjection(snapshot)); });
+      for (const {U+005B}key, view{U+005D} of {U+005B}{U+005B}"1", "builder"{U+005D}, {U+005B}"3", "governance"{U+005D}, {U+005B}"5", "events"{U+005D}{U+005D} as const) {
+        await act(async () => { screen.mockInput.pressKey(key, { meta: true }); });
+        await screen.flush();
+        await screen.flush();
+        const frame = screen.captureCharFrame().split("\n").map(line => line.trimEnd()).join("\n").trimEnd();
+        frames.push("Offline | snapshot " + snapshot.snapshotSeq + " | " + view + "\n" + frame);
+      }
+    }
+  } finally { await act(async () => { screen.renderer.destroy(); }); }
+  return frames.join("\n\n") + "\n";
+}
+
+export async function recordOfflineFrames(directory: string) {
+  const stream = await recordStream();
+  if (stream.snapshots{U+005B}0{U+005D}?.phase !== "active" ||
+      !stream.snapshots{U+005B}0{U+005D}.eventLog.some(row => row.type === "session_activated")) {
+    throw new Error("offline activation evidence missing");
+  }
+  const options = { mode: 0o600, flag: "wx" } as const;
+  const staging = mkdtempSync(join(directory, ".frames-"));
+  try {
+    const raw = join(staging, "healthy-stream.json"), rendered = join(staging, "healthy-frames.txt");
+    writeFileSync(raw, JSON.stringify(stream, null, 2) + "\n", options);
+    const recorded: typeof stream = JSON.parse(readFileSync(raw, "utf8"));
+    writeFileSync(rendered, await render(recorded.snapshots), options);
+    const target = join(directory, "healthy-stream.json");
+    linkSync(raw, target);
+    try { linkSync(rendered, join(directory, "healthy-frames.txt")); }
+    catch (error) { rmSync(target); throw error; }
+    return recorded;
+  } finally { rmSync(staging, { recursive: true, force: true }); }
+}
+
+if (import.meta.main) {
+  const directory = process.argv{U+005B}2{U+005D};
+  if (!directory) throw new Error("An evidence directory is required.");
+  const stream = await recordOfflineFrames(directory);
+  console.log("Offline healthy-stream.json and healthy-frames.txt");
+  console.log("Snapshots", stream.snapshots.length, "ending", stream.ending);
+}
diff --git a/test/phase3a/harness-separation.test.ts b/test/phase3a/harness-separation.test.ts
index 326687a..6079ae7 100644
--- a/test/phase3a/harness-separation.test.ts
+++ b/test/phase3a/harness-separation.test.ts
@@ -27,7 +27,7 @@ const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> =
     sha256: "9210012a505848a7379ab7b9cf9d840f33197de58f85b23c359653760479c603", call: "PAYLOAD_SHAPE{U+005B}knownType{U+005D}(payload)",
   },
   "packages/supervisor/src/build.ts": {
-    sha256: "50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d", call: "host.handle.facts(){U+005B}Symbol.asyncIterator{U+005D}()",
+    sha256: "0b329d97e88a13bd58902fe7dd1afe971d52c61bbf310862230465fd1fdd3553", call: "host.handle.facts(){U+005B}Symbol.asyncIterator{U+005D}()",
   },
 };

diff --git a/test/phase3b/absence.test.tsx b/test/phase3b/absence.test.tsx
new file mode 100644
index 0000000..0e99a5a
--- /dev/null
+++ b/test/phase3b/absence.test.tsx
@@ -0,0 +1,104 @@
+import { expect, test } from "bun:test";
+import { testRender } from "@opentui/react/test-utils";
+import type { ReactNode } from "react";
+import { parseSurfaceId } from "@madventures/protocol";
+import { App } from "../../apps/madbridge/src/tui/App";
+import { DockStrip } from "../../apps/madbridge/src/tui/components/DockStrip";
+import { EventLog } from "../../apps/madbridge/src/tui/components/EventLog";
+import { IncidentBand } from "../../apps/madbridge/src/tui/components/IncidentBand";
+import { StatusBar } from "../../apps/madbridge/src/tui/components/StatusBar";
+import { AntigravityPane } from "../../apps/madbridge/src/tui/panes/AntigravityPane";
+import { ClaudePane } from "../../apps/madbridge/src/tui/panes/ClaudePane";
+import { GovernancePane } from "../../apps/madbridge/src/tui/panes/GovernancePane";
+import type { BrokerSnapshot } from "../../apps/madbridge/src/tui/types";
+
+const absent: BrokerSnapshot = {
+  connected: true, sessionState: "active", ownershipState: null, activeWriter: null,
+  fencingToken: null, task: null, executions: null, repositoryFingerprint: null, pendingApprovals: {U+005B}{U+005D},
+  pendingTransfers: null, permissionSummary: null, transferPhase: null, verificationStatus: null,
+  reviewStatus: null, incident: null, eventLog: {U+005B}{U+005D}, queueDepth: null,
+};
+
+async function frame(node: ReactNode, width = 160): Promise<string> {
+  const screen = await testRender(node, { width, height: 38 });
+  try {
+    await screen.flush();
+    return screen.captureCharFrame();
+  } finally {
+    screen.renderer.destroy();
+  }
+}
+
+test("governance distinguishes unknown transfers and permissions from empty collections", async () => {
+  const unknown = await frame(<GovernancePane active state={absent} />);
+  expect(unknown).toContain("Pending transfers: —");
+  expect(unknown).toContain("Read: — | Write: —");
+  expect(unknown).toContain("Commands: — | Egress: — | Data class: —");
+  expect(unknown).not.toMatch(/Pending transfers: 0|Read: none|Write: none|Commands: none|Egress: none/);
+  const empty = await frame(<GovernancePane active state={{ ...absent, pendingTransfers: {U+005B}{U+005D}, permissionSummary: {
+    allowedReadPaths: {U+005B}{U+005D}, allowedWritePaths: {U+005B}{U+005D}, allowedCommandCategories: {U+005B}{U+005D}, allowedEgressDestinations: {U+005B}{U+005D}, dataClass: "internal",
+  } }} />);
+  expect(empty).toContain("Pending transfers: 0");
+  expect(empty).toContain("Read: none | Write: none");
+  expect(empty).toContain("Commands: none | Egress: none | Data class: internal");
+});
+
+test("a null connection is unknown in bars, panes and docks", async () => {
+  const state = { ...absent, connected: null };
+  for (const width of {U+005B}60, 160{U+005D}) {
+    const screen = await frame(<App subscribe={listen => { listen(state); return () => {}; }}
+      catalogLoader={async () => ({ status: "ok", models: {U+005B}{U+005D} })} />, width);
+    expect(screen).toMatch(/UNKNOWN\s*\|\s*(session active|S:active)/);
+    expect(screen).not.toMatch(/\b(CONNECTED|CONN|NOCONN)\b/);
+  }
+  expect(await frame(<GovernancePane active state={state} />)).toContain("GOVERNANCE | UNKNOWN");
+  for (const surface of {U+005B}"claude-code", "antigravity"{U+005D} as const) {
+    const Pane = surface === "claude-code" ? ClaudePane : AntigravityPane;
+    const pane = await frame(<Pane active state={state} ptyOutput="" />);
+    const dock = await frame(<DockStrip surface={surface} state={state} ptyOutput="" />);
+    expect(pane).toContain("FOCUSED | UNKNOWN");
+    expect(dock).toContain("docked | UNKNOWN");
+    expect(pane + dock).not.toMatch(/STREAM ENDED|\bLIVE\b|WRITER/);
+  }
+});
+
+test("absent execution and ownership facts stay absent and queue depth stays hidden", async () => {
+  const governance = await frame(<GovernancePane active state={absent} />);
+  expect(governance).toContain("Claude: —");
+  expect(governance).toContain("Antigravity: —");
+  expect(governance).toContain("Ownership: UNKNOWN");
+  const status = await frame(<StatusBar state={absent} connected focus="claude" />);
+  expect(status).toContain("writer UNKNOWN");
+  const app = (state: BrokerSnapshot) => <App subscribe={listen => { listen(state); return () => {}; }}
+    catalogLoader={async () => ({ status: "ok", models: {U+005B}{U+005D} })} />;
+  expect(await frame(app(absent))).toBe(await frame(app({ ...absent, queueDepth: 81937 })));
+  for (const surface of {U+005B}"claude-code", "antigravity"{U+005D} as const) {
+    const Pane = surface === "claude-code" ? ClaudePane : AntigravityPane;
+    expect(await frame(<Pane active state={absent} ptyOutput="" />)).toContain("UNKNOWN | UNKNOWN");
+    expect(await frame(<DockStrip surface={surface} state={absent} ptyOutput="" />)).toContain("UNKNOWN | UNKNOWN");
+  }
+});
+
+test("a null token stays absent in writer, incident and session_open frames", async () => {
+  for (const surface of {U+005B}"claude-code", "antigravity"{U+005D} as const) {
+    const state: BrokerSnapshot = { ...absent, ownershipState: "owned", activeWriter: "writer",
+      executions: {U+005B}{ execution_id: "writer", surface: parseSurfaceId(surface), role: "builder",
+        model: "synthetic", provider: "synthetic", independence_domain: "synthetic", effort: "low" }{U+005D} };
+    const Pane = surface === "claude-code" ? ClaudePane : AntigravityPane;
+    expect(await frame(<Pane active state={state} ptyOutput="" />)).toContain("WRITER token —");
+    expect(await frame(<DockStrip surface={surface} state={state} ptyOutput="" />)).toContain("WRITER token —");
+    expect(await frame(<StatusBar state={state} connected focus="claude" />)).toContain("writer (token —)");
+    expect(await frame(<StatusBar state={state} connected focus="claude" />, 60)).toContain("T:—");
+  }
+  expect(await frame(<GovernancePane active state={absent} />)).toContain("Token: —");
+  expect(await frame(<IncidentBand state={{ ...absent, sessionState: "interrupted" }} />)).toContain("token —");
+  const entries = {U+005B}"session_open", "bridge_event"{U+005D}.map((type, i) => ({
+    seq: i + 1, type, actor: "offline", fencingToken: null, hash: "synthetic", timestamp: "synthetic",
+  }));
+  const rows = await frame(<EventLog entries={entries} />);
+  for (const entry of entries) {
+    const line = rows.split("\n").find(row => row.includes(entry.type));
+    expect(line).toContain("tok:—");
+    expect(line).not.toMatch(/tok:(?:\s|\d)|tok#null|#0|\bnull\b/);
+  }
+});
diff --git a/test/phase3b/child-end.test.ts b/test/phase3b/child-end.test.ts
new file mode 100644
index 0000000..6fede35
--- /dev/null
+++ b/test/phase3b/child-end.test.ts
@@ -0,0 +1,56 @@
+import { expect, test } from "bun:test";
+import { ADAPTER_REGISTRY, parseSurfaceId } from "@madventures/protocol";
+import { attestClaudeSession } from "../../packages/adapter-claude-code/src/live";
+import { attestMadvSession } from "../../packages/adapter-madv-surface/src/index";
+import { activeCases, observeChildEnd, surfaces } from "./child-end";
+import { attestationEvents } from "./end-stand-in";
+import { wireFacts } from "./wire-facts";
+
+for (const surface of surfaces) {
+  for (const {U+005B}end, cause{U+005D} of {U+005B}{U+005B}"clean exit", "child_exited"{U+005D}, {U+005B}"host end", "host_exited"{U+005D}{U+005D} as const) {
+    test(surface + " before activation reports " + cause, async () => {
+      const seen = await observeChildEnd(surface, true, end);
+      const execution = surface === "claude-code" ? "builder" : "reviewer";
+      expect(seen.phase).toBe("");
+      expect(seen.component).toBe("reattest");
+      expect(seen.detail).toBe("step=reattest execution=" + execution +
+        " failure=reattestation_failed surface=" + surface + " cause=" + cause);
+    }, 20_000);
+  }
+  test(surface + " drained alone leaves the monitor active", async () => {
+    const wire = wireFacts();
+    const model = surface === "claude-code" ? "claude-fable-5-2" : "MiniMax-M3.1-Flash";
+    const registration = ADAPTER_REGISTRY.get(parseSurfaceId(surface))!;
+    const input = { ...wire, model, registration, executionId: "offline-execution", sessionId: "offline-session" };
+    const result = surface === "claude-code" ? attestClaudeSession(input) : attestMadvSession(input);
+    wire.events(...attestationEvents(surface, model));
+    expect((await result).ok).toBe(true);
+    wire.push({ kind: "drained" });
+    // Yield across a full turn so the already-parked monitor consumes the fact.
+    await Bun.sleep(1);
+    expect(wire.failures).toEqual({U+005B}{U+005D});
+    expect(wire.closed).toBe(0);
+    wire.push({ kind: "exited", code: 0 });
+    wire.end();
+    while (!wire.closed) await Bun.sleep(1);
+    expect(wire.failures).toEqual({U+005B}"child_exited"{U+005D});
+  });
+}
+
+for (const {U+005B}surface, end, cause, reason{U+005D} of activeCases) {
+  test(surface + " " + end + " records " + reason, async () => {
+    const seen = await observeChildEnd(surface, false, end);
+    expect(seen.component).toBe("");
+    expect(seen.phase).toBe("active");
+    expect(seen.interrupted).toEqual({U+005B}{ reason, detail: surface + ": " + cause }{U+005D});
+    expect(seen.closed).toBe("interruption");
+  }, 20_000);
+}
+
+test("Founder close on the active composition records no interruption", async () => {
+  const seen = await observeChildEnd("claude-code", false, "Founder close");
+  expect(seen.component).toBe("");
+  expect(seen.phase).toBe("active");
+  expect(seen.closed).toBe("founder");
+  expect(seen.interrupted).toEqual({U+005B}{U+005D});
+}, 20_000);
diff --git a/test/phase3b/child-end.ts b/test/phase3b/child-end.ts
new file mode 100644
index 0000000..96d9a45
--- /dev/null
+++ b/test/phase3b/child-end.ts
@@ -0,0 +1,98 @@
+import { join } from "node:path";
+import type { BrokerClient } from "@madventures/broker";
+import { Ledger } from "@madventures/ledger";
+import { attestMadvSession } from "../../packages/adapter-madv-surface/src/index";
+import { createStartAttesters, composeLiveSession } from "../../apps/madbridge/src/tui/live/composition";
+import { runLiveTransactionalBuild, runPurePreflight } from "../../packages/supervisor/src/index";
+import { closeOfflineBuild } from "./offline";
+import { prepareM2 } from "./m2-offline";
+import type { End, Surface } from "./end-stand-in";
+
+export const surfaces = {U+005B}"claude-code", "madv-surface"{U+005D} as const;
+export const activeCases = {U+005B}
+  {U+005B}"claude-code", "clean exit", "child_exited", "child_failure"{U+005D},
+  {U+005B}"claude-code", "host end", "host_exited", "pty_host_failure"{U+005D},
+  {U+005B}"claude-code", "nonzero exit", "child_exited", "child_failure"{U+005D},
+  {U+005B}"claude-code", "signalled exit", "child_exited", "child_failure"{U+005D},
+  {U+005B}"claude-code", "malformed partial line", "attestation_malformed", "identity_mismatch"{U+005D},
+  {U+005B}"madv-surface", "clean exit", "child_exited", "child_failure"{U+005D},
+  {U+005B}"madv-surface", "host end", "host_exited", "pty_host_failure"{U+005D},
+  {U+005B}"madv-surface", "nonzero exit", "provider_error", "adapter_failure"{U+005D},
+  {U+005B}"madv-surface", "malformed partial line", "identity_mismatch", "identity_mismatch"{U+005D},
+  {U+005B}"madv-surface", "pending request", "identity_unavailable", "identity_mismatch"{U+005D},
+  {U+005B}"madv-surface", "open tool", "identity_mismatch", "identity_mismatch"{U+005D},
+{U+005D} as const;
+
+async function until(finished: () => boolean | Promise<boolean>) {
+  const deadline = performance.now() + 5000;
+  while (!await finished()) {
+    if (performance.now() >= deadline) throw new Error("offline observation deadline");
+    await Bun.sleep(10);
+  }
+}
+
+function readClosure(root: string, id: string) {
+  const ledger = new Ledger(join(root, "sessions", id, "ledger", "ledger.sqlite3"));
+  try {
+    const rows = ledger.readAfter(0).map(row => JSON.parse(row.event_json));
+    return {
+      interrupted: rows.filter(row => row.event_type === "session_interrupted")
+        .map(row => ({ reason: String(row.reason_code), detail: String(row.payload.reason) })),
+      closed: rows.find(row => row.event_type === "session_closed")?.payload.closure_kind ?? null,
+    };
+  } finally { ledger.close(); }
+}
+
+export async function observeChildEnd(surface: Surface, before: boolean, end: End) {
+  const f = prepareM2(surface, before, end);
+  let phase = "", id = "", component = "", detail = "";
+  try {
+    async function observeActive(client: BrokerClient, send?: (text: string) => boolean) {
+      const active = await client.getSnapshot();
+      phase = active.phase;
+      id = active.sessionId;
+      if (before || end === "Founder close") return;
+      if (end === "pending request" || end === "open tool") {
+        if (!send?.("synthetic request")) throw new Error("offline request refused");
+      }
+      f.release();
+      await until(async () => (await client.getSnapshot()).phase === "closed");
+    }
+
+    if ((surface === "madv-surface" && before) || end === "pending request" || end === "open tool") {
+      const preflight = await runPurePreflight(f.input);
+      if (!preflight.ok) throw new Error("offline preflight failed");
+      const installed = createStartAttesters();
+      let send: ((text: string) => boolean) | undefined;
+      const build = await runLiveTransactionalBuild({ sessionId: "offline-child-end", envelope: f.envelope,
+        plan: preflight.plan, signal: f.input.signal, attesterFor: name => {
+          if (name !== "madv-surface") return installed(name);
+          return async input => {
+            let reported = false;
+            const verdict = await attestMadvSession({ ...input, reportFailure(cause) {
+              input.reportFailure(cause);
+              reported = true;
+            } });
+            if (verdict.ok) {
+              send = verdict.sendUserInput;
+              if (before) {
+                f.release();
+                await until(() => reported);
+              }
+            }
+            return verdict;
+          };
+        } });
+      try {
+        if (build.ok) await observeActive(build.state.client!, send);
+        else { component = build.failedStep; detail = build.detail; }
+      } finally { await closeOfflineBuild(build); }
+    } else {
+      const built = await composeLiveSession({ ...f.start, present: client => observeActive(client) });
+      if (built.exitCode === 0) await built.close();
+      else { component = built.component; detail = built.detail; }
+    }
+    const closure = id ? readClosure(f.storageRootOverride, id) : { interrupted: {U+005B}{U+005D}, closed: null };
+    return { surface, before, end, phase, component, detail, ...closure };
+  } finally { f.dispose(); }
+}
diff --git a/test/phase3b/end-stand-in.ts b/test/phase3b/end-stand-in.ts
new file mode 100644
index 0000000..9d40e5f
--- /dev/null
+++ b/test/phase3b/end-stand-in.ts
@@ -0,0 +1,115 @@
+import { existsSync, readFileSync, writeFileSync } from "node:fs";
+import { basename, dirname, join } from "node:path";
+import { createInterface } from "node:readline";
+
+export type Surface = "claude-code" | "madv-surface";
+export type End = "clean exit" | "host end" | "nonzero exit" | "signalled exit" |
+  "malformed partial line" | "pending request" | "open tool" | "Founder close";
+
+export function attestationEvents(surface: Surface, model: string) {
+  const stamp = { session_id: "offline-wire", ts: "2026-11-23T00:00:00.000Z" };
+  const result = { ...stamp, type: "result", subtype: "success", is_error: false };
+  if (surface === "claude-code") return {U+005B}
+    { ...stamp, type: "system", subtype: "init", model, claude_code_version: "2.1.325" },
+    { ...stamp, type: "assistant", message: { id: "offline-message", model, content: {U+005B}{ type: "text", text: model }{U+005D} } },
+    { ...result, num_turns: 1, modelUsage: { {U+005B}model{U+005D}: { canonicalModel: model, provider: "firstParty" } } },
+  {U+005D};
+  const identity = { provider: "minimax", profile: "minimax", endpoint_host: "api.minimax.io" };
+  return {U+005B}
+    { ...stamp, ...identity, type: "system", subtype: "init", surface, surface_version: "0.1.2", requested_model: model },
+    { ...stamp, ...identity, type: "model_response", response_model: model, response_id: "offline-response",
+      response_independence_domain: "minimax", tls_verified_host: "api.minimax.io" },
+    { ...stamp, type: "assistant", response_model: model }, result,
+  {U+005D};
+}
+
+async function run() {
+  const executable = process.argv{U+005B}1{U+005D}!.replace(/\.launch\.ts$/, "");
+  const root = dirname(dirname(executable));
+  // Only the private TTY launch takes a fault. All probes use the M1 stand-in.
+  if (!process.stdin.isTTY || process.cwd() !== join(root, "work") || !existsSync(join(root, "m2-case.json"))) {
+    throw new Error("expected private offline launch");
+  }
+  const surface: Surface = basename(executable) === "madbridge-claude-v5" ? "claude-code" : "madv-surface";
+  const scenario: { surface: Surface; before: boolean; end: End } =
+    JSON.parse(readFileSync(join(root, "m2-case.json"), "utf8"));
+  const model = process.argv{U+005B}process.argv.indexOf("--model") + 1{U+005D}!;
+  const events = attestationEvents(surface, model);
+  const emit = (...items: unknown{U+005B}{U+005D}) => writeFileSync(1, items.map(e => JSON.stringify(e) + "\n").join(""));
+  const release = join(root, "release-end");
+  const parent = process.ppid;
+  process.on("SIGTERM", () => process.exit(0));
+
+  let attested = false;
+  for await (const line of createInterface({ input: process.stdin })) {
+    const frame = JSON.parse(line);
+    if (attested) continue;
+    if (frame.message.content !== "Reply with your model identifier and nothing else." ||
+      (surface === "madv-surface" ? frame.no_tools !== true : frame.no_tools !== undefined)) process.exit(2);
+    if (scenario.before && scenario.surface === "claude-code" && surface === "madv-surface") {
+      // The second attestation supplies a window after the first handover.
+      writeFileSync(release, "");
+      await Bun.sleep(1200);
+    }
+    emit(...events);
+    attested = true;
+    if (surface !== scenario.surface || scenario.end === "Founder close") continue;
+    while (!existsSync(release)) await Bun.sleep(5);
+    if (scenario.end !== "host end") {
+      // The macOS host queries the state of its one child through PATH.
+      // Establish a kernel-parentage witness before taking the fault.
+      Bun.spawn({U+005B}process.execPath, "--no-env-file", process.argv{U+005B}1{U+005D}!, "--witness", String(process.pid){U+005D}, {
+        cwd: join(root, "work"), detached: true, stdin: "ignore", stdout: "ignore", stderr: "ignore",
+        env: { HOME: root, TMPDIR: join(root, "temp"), PATH: join(root, "bin") },
+      }).unref();
+      const deadline = performance.now() + 2000;
+      while (!existsSync(join(root, "watching-" + process.pid))) {
+        if (performance.now() >= deadline) throw new Error("offline exit witness unavailable");
+        await Bun.sleep(5);
+      }
+    }
+    switch (scenario.end) {
+      case "host end":
+        // This stand-in is the exec'd child of its private PTY host. Never
+        // signal an adopted parent or a parent that changed since launch.
+        if (parent <= 1 || process.ppid !== parent) throw new Error("offline host identity changed");
+        process.kill(parent, "SIGKILL");
+        break;
+      case "nonzero exit": process.exit(1);
+      case "signalled exit": process.kill(process.pid, "SIGKILL"); break;
+      case "malformed partial line": writeFileSync(1, '{"type":'); break;
+      case "open tool":
+        emit(events{U+005B}1{U+005D}, { session_id: "offline-wire", ts: "2026-11-23T00:00:00.000Z",
+          type: "tool_use", tool_use_id: "offline-tool", name: "synthetic" });
+        break;
+    }
+    process.exit(0);
+  }
+}
+
+if (import.meta.main) {
+  const root = dirname(dirname(process.argv{U+005B}1{U+005D}!));
+  if (process.argv{U+005B}2{U+005D} === "--witness") {
+    const owner = Number(process.argv{U+005B}3{U+005D});
+    if (!Number.isSafeInteger(owner) || owner <= 1 || process.ppid !== owner) process.exit(1);
+    writeFileSync(join(root, "watching-" + owner), "");
+    const deadline = performance.now() + 3000;
+    while (process.ppid === owner) {
+      if (performance.now() >= deadline) process.exit(1);
+      await Bun.sleep(5);
+    }
+    writeFileSync(join(root, "ended-" + owner), "");
+  } else if (basename(process.argv{U+005B}1{U+005D}!) === "ps.ts") {
+    // A reparented witness proves its original parent is no longer running.
+    // Report only that property for a known child. Never enumerate processes.
+    const {U+005B}format, field, selector, pid, ...rest{U+005D} = process.argv.slice(2);
+    if (format !== "-o" || field !== "state=" || selector !== "-p" || rest.length ||
+      !pid || !/^{U+005B}1-9{U+005D}{U+005B}0-9{U+005D}*$/.test(pid) || !existsSync(join(root, "watching-" + pid))) process.exit(1);
+    const deadline = performance.now() + 1500;
+    while (!existsSync(join(root, "ended-" + pid))) {
+      if (performance.now() >= deadline) process.exit(1);
+      await Bun.sleep(5);
+    }
+    writeFileSync(1, "Z\n");
+  } else await run();
+}
diff --git a/test/phase3b/m2-offline.ts b/test/phase3b/m2-offline.ts
new file mode 100644
index 0000000..cf35148
--- /dev/null
+++ b/test/phase3b/m2-offline.ts
@@ -0,0 +1,31 @@
+import { readFileSync, writeFileSync } from "node:fs";
+import { join } from "node:path";
+import { offlineStart } from "./offline";
+import { offlinePreflight } from "./preflight-input";
+import type { End, Surface } from "./end-stand-in";
+
+export function prepareM2(surface: Surface, before: boolean, end: End) {
+  const f = offlineStart();
+  try {
+    const probe = readFileSync(new URL("./stand-in.ts", import.meta.url));
+    const launch = readFileSync(new URL("./end-stand-in.ts", import.meta.url));
+    const bun = "'" + process.execPath.replaceAll("'", "'\\''") + "'";
+    const bootstrap = {U+005B}"#!/bin/sh", 'cd "${0%/*}/../work" || exit 2',
+      'if {U+005B} -t 0 {U+005D}; then exec ' + bun + ' --no-env-file "$0.launch.ts" "$@"; fi',
+      'exec ' + bun + ' --no-env-file "$0.ts" "$@"', ""{U+005D}.join("\n");
+    for (const child of f.plan.executions) {
+      writeFileSync(child.executablePath, bootstrap);
+      writeFileSync(child.executablePath + ".ts", probe);
+      writeFileSync(child.executablePath + ".launch.ts", launch);
+    }
+    const stateProbe = join(f.bin, "ps");
+    writeFileSync(stateProbe + ".ts", launch);
+    writeFileSync(stateProbe, '#!/bin/sh\ncd "${0%/*}/../work" || exit 2\nexec ' + bun + ' --no-env-file "$0.ts" "$@"\n', { mode: 0o700 });
+    writeFileSync(join(f.root, "m2-case.json"), JSON.stringify({ surface, before, end }));
+    writeFileSync(join(f.root, "scenario"), "healthy");
+    writeFileSync(join(f.root, "trace"), "");
+    const input = offlinePreflight(f);
+    return { ...f, input, release: () => writeFileSync(join(f.root, "release-end"), ""),
+      start: { envelope: f.envelope, preflight: input, workingDirectory: f.work, configFolder: f.config, managedFolder: f.managed } };
+  } catch (error) { f.dispose(); throw error; }
+}
diff --git a/test/phase3b/projection.test.ts b/test/phase3b/projection.test.ts
new file mode 100644
index 0000000..e729282
--- /dev/null
+++ b/test/phase3b/projection.test.ts
@@ -0,0 +1,111 @@
+import { expect, test } from "bun:test";
+import type { BrokerSnapshot as Source } from "@madventures/broker";
+import { parseSurfaceId, type ExecutionIdentity, type TaskEnvelopeV1 } from "@madventures/protocol";
+import { clientSnapshotToProjection as project } from "../../apps/madbridge/src/tui/live/projection";
+import type { BrokerSnapshot as Projection } from "../../apps/madbridge/src/tui/types";
+import { fingerprint, sparseSnapshot } from "./snapshot-input";
+
+const empty: Projection = {
+  connected: null, sessionState: "starting", ownershipState: null, activeWriter: null, fencingToken: null, task: null,
+  executions: null, repositoryFingerprint: fingerprint, pendingApprovals: {U+005B}{U+005D}, pendingTransfers: null,
+  permissionSummary: null, transferPhase: null, verificationStatus: null, reviewStatus: null,
+  incident: null, eventLog: {U+005B}{U+005D}, queueDepth: null,
+};
+const identity: ExecutionIdentity = { execution_id: "second", role: "observer", surface: parseSurfaceId("sample"),
+  model: "scripted", provider: "offline", independence_domain: "sample", effort: "low" };
+const first: ExecutionIdentity = { ...identity, execution_id: "first", role: "builder", effort: "high" };
+const identities = {U+005B}first, identity{U+005D};
+const working = { ...fingerprint, kind: "working_tree", base_git_sha: "synthetic-base" } as const;
+const task: TaskEnvelopeV1 = { protocol_version: "madbridge-protocol/v1", task_id: "task", authorization_reference: "",
+  repository: "", branch: "", worktree: "", repository_fingerprint: working, executions: identities, initial_writer: "first",
+  scope: { allowedReadPaths: {U+005B}{U+005D}, allowedWritePaths: {U+005B}{U+005D}, allowedCommandCategories: {U+005B}"read"{U+005D}, allowedArtifactCategories: {U+005B}"report"{U+005D},
+    maxArtifactSizeBytes: 1, dataClass: "confidential", allowedEgressDestinations: {U+005B}{U+005D} },
+  pair_constraints: { required_roles: {U+005B}"builder", "independent-reviewer"{U+005D}, require_distinct_providers: true,
+    require_distinct_independence_domains: true, prohibit_self_review: true, allowed_surface_pairs: {U+005B}{U+005B}first.surface, identity.surface{U+005D}{U+005D} },
+  expires_at: "", created_at: "", envelope_hash: "" };
+const owner = { executionId: "first", worktreeId: "tree", fencingToken: 37, repositoryFingerprint: working };
+const approval = { id: "approval", type: "transfer", actor: "offline", taskId: "task", repositoryFingerprint: working,
+  scope: "read", timestamp: "stamp" };
+const approvalStates = {U+005B}"pending", "approved", "rejected", "expired"{U+005D} as const;
+const transfers = {U+005B}{ id: "transfer", from: "first", to: "second", reason: "synthetic", fencingToken: 37, timestamp: "stamp" }{U+005D};
+const permissions = { allowedReadPaths: {U+005B}"source"{U+005D}, allowedWritePaths: {U+005B}{U+005D}, allowedCommandCategories: {U+005B}"test"{U+005D},
+  allowedEgressDestinations: {U+005B}{U+005D}, dataClass: "internal" };
+const verification = { result: "warning", detail: "synthetic", verifiedBy: "second", timestamp: "stamp" } as const;
+const review = { decision: "changes-requested", comments: "synthetic", reviewedBy: "second", timestamp: "stamp" } as const;
+const incident = { id: "incident", reason: "synthetic", timestamp: "stamp", severity: "medium" } as const;
+const rows = {U+005B}
+  { seq: 1, type: "session_open", actor: "offline", fencingToken: null, hash: "one", timestamp: "early" },
+  { seq: 9, type: "synthetic", actor: "first", fencingToken: 37, hash: "nine", timestamp: "late" },
+{U+005D};
+const full: Source = {
+  sessionId: "session", snapshotSeq: 74, connected: true, phase: "active", taskEnvelopeHash: "envelope", task,
+  repositoryFingerprint: working, executions: identities.map(id => ({ identity: id, state: "ready", hostPid: 1,
+    childPid: 2, processGroupId: 3, executablePath: "stand-in", executableSha256: "digest", exitCode: null, exitSignal: null })),
+  activeWriterExecutionId: "first", fencingToken: 37, tokenState: "valid",
+  pendingApprovals: approvalStates.map(state => ({ ...approval, state })), pendingTransfers: transfers,
+  permissionSummary: permissions, ownershipState: { kind: "owned", ...owner }, verification, review, incident,
+  eventLog: rows, queueDepth: 12, ledgerSeq: 9,
+};
+const expected: Projection = { connected: true, sessionState: "active", ownershipState: "owned", activeWriter: "first",
+  fencingToken: 37, task, executions: identities, repositoryFingerprint: working,
+  pendingApprovals: {U+005B}
+    { ...approval, colorState: { kind: "pending", text: "PENDING — awaiting Founder decision" } },
+    { ...approval, colorState: { kind: "approved", text: "APPROVED — Founder authorized" } },
+    { ...approval, colorState: { kind: "rejected", text: "REJECTED — Founder denied" } },
+    { ...approval, colorState: { kind: "expired", text: "EXPIRED — decision window elapsed" } },
+  {U+005D}, pendingTransfers: transfers, permissionSummary: permissions, transferPhase: null, verificationStatus: verification,
+  reviewStatus: review, incident, eventLog: rows, queueDepth: 12 };
+
+test("the pinned table maps every broker member and declared phase and ownership kind", () => {
+  const table: Array<{U+005B}Source, Projection{U+005D}> = {U+005B}{U+005B}sparseSnapshot, empty{U+005D}, {U+005B}full, expected{U+005D}{U+005D};
+  for (const phase of {U+005B}"starting", "active", "paused", "interrupted", "closing", "closed"{U+005D} as const) {
+    table.push({U+005B}{ ...full, phase }, { ...expected, sessionState: phase }{U+005D});
+  }
+  const ownership: Array<{U+005B}Source{U+005B}"ownershipState"{U+005D}, Projection{U+005B}"ownershipState"{U+005D}{U+005D}> = {U+005B}
+    {U+005B}null, null{U+005D}, {U+005B}{ kind: "free" }, "free"{U+005D}, {U+005B}{ kind: "owned", ...owner }, "owned"{U+005D},
+    {U+005B}{ kind: "transfer-requested", ...owner, transferTo: "second" }, "transfer-requested"{U+005D},
+    {U+005B}{ kind: "sender-released", ...owner, transferTo: "second" }, "sender-released"{U+005D},
+    {U+005B}{ kind: "rejected", ...owner, reason: "synthetic" }, "rejected"{U+005D},
+  {U+005D};
+  for (const {U+005B}input, output{U+005D} of ownership) table.push({U+005B}{ ...full, ownershipState: input }, { ...expected, ownershipState: output }{U+005D});
+  table.push({U+005B}{ ...full, connected: false, snapshotSeq: 0, tokenState: "invalidated", ledgerSeq: 1000,
+    sessionId: "", taskEnvelopeHash: "", executions: {U+005B}{U+005D}, pendingTransfers: {U+005B}{U+005D}, fencingToken: 0, queueDepth: 0 },
+    { ...expected, connected: false, executions: {U+005B}{U+005D}, pendingTransfers: {U+005B}{U+005D}, fencingToken: 0, queueDepth: 0 }{U+005D});
+  for (const {U+005B}input, output{U+005D} of table) {
+    const original = structuredClone(input);
+    expect(project(original)).toEqual(output);
+    expect(original).toEqual(input);
+  }
+});
+
+test("the mapper rejects unknown shapes without disclosing supplied values", () => {
+  function rejects(input: unknown, member: string) {
+    let message = "";
+    try { project(input as Source); } catch (error) { if (error instanceof TypeError) message = error.message; }
+    expect(message).toContain(member + ": ");
+    expect(message).toMatch(/missing|expected|outside the declared set|invalid surface identifier/);
+    expect(message).not.toContain("synthetic-invalid-value");
+  }
+  for (const key of Object.keys(full)) {
+    const missing: Record<string, unknown> = { ...full };
+    delete missing{U+005B}key{U+005D};
+    rejects(missing, "snapshot." + key);
+  }
+  for (const key of {U+005B}"phase", "repositoryFingerprint", "tokenState", "ledgerSeq", "sessionId", "taskEnvelopeHash", "pendingApprovals", "eventLog"{U+005D}) {
+    rejects({ ...full, {U+005B}key{U+005D}: null }, "snapshot." + key);
+  }
+  const invalid = "synthetic-invalid-value";
+  for (const {U+005B}value, member{U+005D} of {U+005B}
+    {U+005B}{}, "kind"{U+005D}, {U+005B}{ ...fingerprint, kind: invalid }, "kind"{U+005D}, {U+005B}{ ...fingerprint, sha256: false }, "sha256"{U+005D},
+    {U+005B}{ ...fingerprint, git_sha: 4 }, "git_sha"{U+005D}, {U+005B}{ ...fingerprint, base_git_sha: undefined }, "base_git_sha"{U+005D},
+  {U+005D} as const) rejects({ ...full, repositoryFingerprint: value }, "snapshot.repositoryFingerprint." + member);
+  rejects({ ...full, phase: invalid }, "snapshot.phase");
+  rejects({ ...full, connected: invalid }, "snapshot.connected");
+  rejects({ ...full, ownershipState: { kind: invalid } }, "snapshot.ownershipState.kind");
+  rejects({ ...full, ownershipState: { ...owner, kind: "sender-released" } }, "snapshot.ownershipState.transferTo");
+  rejects({ ...full, pendingApprovals: {U+005B}{ ...approval, state: invalid }{U+005D} }, "snapshot.pendingApprovals{U+005B}{U+005D}.state");
+  rejects({ ...full, executions: {U+005B}{ ...full.executions!{U+005B}0{U+005D}, identity: { ...first, role: invalid } }{U+005D} }, "snapshot.executions{U+005B}{U+005D}.identity.role");
+  rejects({ ...full, task: { ...task, scope: { ...task.scope, dataClass: invalid } } }, "snapshot.task.scope.dataClass");
+  rejects({ ...full, permissionSummary: { ...permissions, allowedReadPaths: {U+005B}false{U+005D} } }, "snapshot.permissionSummary.allowedReadPaths{U+005B}{U+005D}");
+  rejects({ ...full, eventLog: {U+005B}{ ...rows{U+005B}0{U+005D}, fencingToken: invalid }{U+005D} }, "snapshot.eventLog{U+005B}{U+005D}.fencingToken");
+});
diff --git a/test/phase3b/recorded-frames.test.tsx b/test/phase3b/recorded-frames.test.tsx
new file mode 100644
index 0000000..8e16fcd
--- /dev/null
+++ b/test/phase3b/recorded-frames.test.tsx
@@ -0,0 +1,36 @@
+import { expect, test } from "bun:test";
+import { mkdtempSync, readFileSync, realpathSync, rmSync } from "node:fs";
+import { userInfo } from "node:os";
+import { join } from "node:path";
+import { recordOfflineFrames } from "../../scripts/phase3b/recorded-frames";
+
+test("the healthy offline client's recorded stream renders activation through Founder close", async () => {
+  const directory = realpathSync(mkdtempSync(join(realpathSync(userInfo().homedir), ".madbridge-m2-frames-")));
+  try {
+    const stream = await recordOfflineFrames(directory);
+    const persisted = JSON.parse(readFileSync(join(directory, "healthy-stream.json"), "utf8"));
+    expect(persisted).toEqual(stream);
+    const first = stream.snapshots{U+005B}0{U+005D}!;
+    expect(first.phase).toBe("active");
+    expect(first.executions?.every(execution => execution.state === "ready")).toBe(true);
+    expect(first.eventLog.some(row => row.type === "session_activated")).toBe(true);
+    const frames = readFileSync(join(directory, "healthy-frames.txt"), "utf8");
+    expect(frames).toContain("session active");
+    expect(frames).toContain("session_activated");
+    expect(frames).toContain("GOVERNANCE");
+    expect(frames).toContain("session_open");
+    expect(frames).toContain("tok:—");
+    let previous = 0;
+    for (const snapshot of stream.snapshots) {
+      expect(snapshot.snapshotSeq).toBeGreaterThan(previous);
+      previous = snapshot.snapshotSeq!;
+      for (const view of {U+005B}"builder", "governance", "events"{U+005D}) expect(frames).toContain("Offline | snapshot " + previous + " | " + view);
+      expect(frames).toContain("session " + snapshot.phase);
+    }
+    expect(stream.founderClose).toBe("completed");
+    for (const closed of stream.snapshots.filter(s => s.phase === "closed")) {
+      expect(closed.eventLog.some(row => row.type === "session_closed")).toBe(true);
+    }
+    expect(stream.ending).toMatch(/read rejected|returned connected false|final post-close read returned a snapshot/);
+  } finally { rmSync(directory, { recursive: true, force: true }); }
+}, 20_000);
diff --git a/test/phase3b/snapshot-input.ts b/test/phase3b/snapshot-input.ts
new file mode 100644
index 0000000..b5817d4
--- /dev/null
+++ b/test/phase3b/snapshot-input.ts
@@ -0,0 +1,10 @@
+import type { BrokerSnapshot } from "@madventures/broker";
+
+export const fingerprint = { kind: "commit", sha256: "synthetic-digest", git_sha: "synthetic-revision" } as const;
+
+export const sparseSnapshot: BrokerSnapshot = {
+  sessionId: "", snapshotSeq: null, connected: null, phase: "starting", taskEnvelopeHash: "", task: null,
+  repositoryFingerprint: fingerprint, executions: null, activeWriterExecutionId: null, fencingToken: null,
+  tokenState: "not_issued", pendingApprovals: {U+005B}{U+005D}, pendingTransfers: null, permissionSummary: null,
+  ownershipState: null, verification: null, review: null, incident: null, eventLog: {U+005B}{U+005D}, queueDepth: null, ledgerSeq: 0,
+};
diff --git a/test/phase3b/subscribe.test.ts b/test/phase3b/subscribe.test.ts
new file mode 100644
index 0000000..a300738
--- /dev/null
+++ b/test/phase3b/subscribe.test.ts
@@ -0,0 +1,106 @@
+import { expect, test } from "bun:test";
+import type { BrokerClient, BrokerSnapshot as Source } from "@madventures/broker";
+import { subscribeToClient } from "../../apps/madbridge/src/tui/live/subscribe";
+import type { BrokerSnapshot } from "../../apps/madbridge/src/tui/types";
+import { SNAPSHOT_INTERVAL_MS } from "../../packages/supervisor/src/snapshot-timer";
+import { sparseSnapshot } from "./snapshot-input";
+
+const active: Source = { ...sparseSnapshot, connected: true, phase: "active" };
+const closed: Source = { ...sparseSnapshot, connected: false, phase: "closed" };
+const invalid = { ...active, phase: "invalid" } as unknown as Source;
+const readFailure = () => { throw new Error("synthetic refusal"); };
+
+function stream(read: (index: number) => Source | Promise<Source>) {
+  let count = 0;
+  const getSnapshot = async () => read(count++);
+  const client: BrokerClient = {
+    getSnapshot,
+    async *snapshots() {
+      for (;;) {
+        const snapshot = await getSnapshot();
+        if (snapshot.connected === false) return;
+        yield snapshot;
+      }
+    },
+    async *output() {}, request: readFailure, publish: readFailure, close: readFailure,
+  };
+  return { client, reads: () => count };
+}
+
+async function until(predicate: () => boolean) {
+  const deadline = performance.now() + 3000;
+  while (!predicate()) {
+    if (performance.now() >= deadline) throw new Error("synthetic stream deadline");
+    await Bun.sleep(5);
+  }
+  await Promise.resolve();
+}
+
+test("subscription gives the first, changed and closed projections exactly once", async () => {
+  const frames = {U+005B}active, { ...active, snapshotSeq: 2, ledgerSeq: 7 },
+    { ...active, phase: "paused" as const, queueDepth: 3 }, closed{U+005D};
+  const source = stream(i => frames{U+005B}i{U+005D} ?? closed);
+  const seen: BrokerSnapshot{U+005B}{U+005D} = {U+005B}{U+005D};
+  const off = subscribeToClient(source.client)(frame => { seen.push(frame); });
+  try {
+    expect(source.reads()).toBe(1);
+    await until(() => seen.length > 0);
+    expect(source.reads()).toBe(1);
+    await until(() => source.reads() >= 4);
+    await Bun.sleep(SNAPSHOT_INTERVAL_MS + 30);
+    expect(seen.map(s => {U+005B}s.sessionState, s.connected, s.queueDepth{U+005D})).toEqual({U+005B}
+      {U+005B}"active", true, null{U+005D}, {U+005B}"paused", true, 3{U+005D}, {U+005B}"closed", false, null{U+005D},
+    {U+005D});
+    expect(source.reads()).toBe(4);
+  } finally { off(); }
+});
+
+test("mapping and read failures end delivery from the last projection", async () => {
+  for (const fail of {U+005B}() => invalid, readFailure{U+005D}) {
+    const source = stream(i => i === 0 ? active : i === 1 ? fail() : closed);
+    const seen: BrokerSnapshot{U+005B}{U+005D} = {U+005B}{U+005D};
+    const off = subscribeToClient(source.client)(frame => { seen.push(frame); });
+    try {
+      await until(() => source.reads() >= 2);
+      await Bun.sleep(SNAPSHOT_INTERVAL_MS + 30);
+      expect(seen).toHaveLength(2);
+      expect(seen{U+005B}0{U+005D}?.connected).toBe(true);
+      expect(seen{U+005B}1{U+005D}).toEqual({ ...seen{U+005B}0{U+005D}!, connected: false });
+      expect(source.reads()).toBe(2);
+    } finally { off(); }
+  }
+});
+
+test("a first failure gives no projection", async () => {
+  for (const fail of {U+005B}() => invalid, readFailure{U+005D}) {
+    const source = stream(i => i === 0 ? fail() : closed);
+    const seen: BrokerSnapshot{U+005B}{U+005D} = {U+005B}{U+005D};
+    const off = subscribeToClient(source.client)(frame => { seen.push(frame); });
+    try {
+      await Bun.sleep(SNAPSHOT_INTERVAL_MS + 30);
+      expect(seen).toEqual({U+005B}{U+005D});
+      expect(source.reads()).toBe(1);
+    } finally { off(); }
+  }
+});
+
+test("unsubscribe cancels pacing and suppresses in-flight delivery", async () => {
+  const source = stream(() => active);
+  const seen: BrokerSnapshot{U+005B}{U+005D} = {U+005B}{U+005D};
+  const off = subscribeToClient(source.client)(frame => { seen.push(frame); });
+  try { await until(() => seen.length > 0); } finally { off(); }
+  await Bun.sleep(SNAPSHOT_INTERVAL_MS + 30);
+  expect(source.reads()).toBe(1);
+  expect(seen).toHaveLength(1);
+
+  const held = Promise.withResolvers<Source>();
+  const parked = stream(() => held.promise);
+  const late: BrokerSnapshot{U+005B}{U+005D} = {U+005B}{U+005D};
+  const stop = subscribeToClient(parked.client)(frame => { late.push(frame); });
+  expect(parked.reads()).toBe(1);
+  stop();
+  held.resolve(active);
+  await Bun.sleep(SNAPSHOT_INTERVAL_MS + 30);
+  expect(parked.reads()).toBe(1);
+  expect(late).toEqual({U+005B}{U+005D});
+});

11. Delivery digests and shape checks

Build log 5daf3959fe98858d6a9dcb2c2b033f462011318ec2ca5ab7dacb3cf3ae56c727
Evidence packet 0fff814b75bd1c105542772dd407572a256dd6e4d966559033cbb4799c2bc973
pr/pr-title.txt 7082cd88c8156b7476e69d09f34eb0a9c5a4eacacc3cfc6767ca46f84aea29ae
pr/pr-body.md 64d2a7e06d732ee2d110165308a0a36290b903b3b830b5ac3c3061b6a7dea237

525-prbody-check.log · 38ba437ea88d7feb8455f3ea9ef948f77e27312d1c872042281c6c783bbe6f95
attribution-shape-check: PASS — attribution shape valid (shape-only; attested values are not verified)

526-branch-check.log · a59317f490c2e8cb598ae7b2e27928c286a9d10210ca71c09316e15021b71c83
attribution-shape-check: PASS — attribution shape valid (shape-only; attested values are not verified)

The SHA-256 of the exact final bytes of pr/m2-report.md is reported in log 529 and in the Founder-facing message. An internal copy of that digest would change those bytes.

12. Command receipts and deviations

The first halt preceded all edits. The Founder upheld it and issued the repositoryFingerprint interpretation in the signed resume. Halt report m2-halt-1-report.md SHA-256 f142dce9b2aa8e0ffe5702ede8deebbbcdf63a1ef2022d230d82172e82c541bb. Log 067 SHA-256 eadbcf61ed99cd20ec86b1eb049a972ec3847aa96f84a11e038de0aa1e1373b3. Resume SHA-256 f9f431738c29b2fea9b485d779fb9f4540c70d4553e55e3ee999dd6425eda3d0. This added no review round.

B19 item 6 begins with the first snapshot from the presented client. The composition supplies that client only after activation and closes the ledger after closing the client. All four recorded samples were connected. Founder close completed and the post-close read rejected. The evidence gives the observed ending without inventing a disconnected frame.

The permission-rendering break exhausted its first 20-minute load wait in log 138. The Founder reported two quiet readings. Log 139 released the run at 1.93. All 26 deliberate breaks were performed.

The R5 fixture gained an exit witness for the macOS single-child state probe. The witness first establishes its original parent under the disposable root and then observes kernel reparenting. The private executable answers only for that exact PID and fails closed otherwise. It enumerates no processes. Log 302 shows ENOENT for the absent utility in the original approved PATH. No production host, private configuration or registration changed.

The Founder-close break routes the active composition through a real interruption, producing a durable counterexample. Removing only a phase check could leave the broker’s closing-state transition guard in effect. The two exit-cause tests became per-stage and per-status cases. R6 also broke the whole exit dispatch to demonstrate all eighteen cases individually. R7 additionally uses React act for delivering replayed samples, publishes the rendered files together, and records completion of Founder close independently of the availability of a post-close snapshot.

The install set the executable bit on packages/founder-act/src/main.ts. Each restoration first compared its blob with HEAD. bun.lock retained SHA-256 a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830. The test output included a React act warning during frame setup. The rendered snapshots and their assertions passed.

DEC-20261024-01 B2 · packages/supervisor/src/build.ts changed from 50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d to 0b329d97e88a13bd58902fe7dd1afe971d52c61bbf310862230465fd1fdd3553 in cbf123a6e2285b5ff4a470cb4da449d5ce10ea0b. Only line 30 of the separation test changed. Its single allowed call, host.handle.facts(){U+005B}Symbol.asyncIterator{U+005D}(), is unchanged. No exception was added.

472-full-pin.log · 1dd0467fe7fd5c300beaeb064b8f55344a07bf433a1514ce4611bafea3eed869
diff --git a/test/phase3a/harness-separation.test.ts b/test/phase3a/harness-separation.test.ts
index 326687a..6079ae7 100644
--- a/test/phase3a/harness-separation.test.ts
+++ b/test/phase3a/harness-separation.test.ts
@@ -27,7 +27,7 @@ const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> =
     sha256: "9210012a505848a7379ab7b9cf9d840f33197de58f85b23c359653760479c603", call: "PAYLOAD_SHAPE{U+005B}knownType{U+005D}(payload)",
   },
   "packages/supervisor/src/build.ts": {
-    sha256: "50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d", call: "host.handle.facts(){U+005B}Symbol.asyncIterator{U+005D}()",
+    sha256: "0b329d97e88a13bd58902fe7dd1afe971d52c61bbf310862230465fd1fdd3553", call: "host.handle.facts(){U+005B}Symbol.asyncIterator{U+005D}()",
   },
 };


No live call was made. No real surface was run. No real key was used. No Founder configuration folder was read. No capability record was written or renewed outside a disposable storage root created by a test or evidence script. No request left the host other than any package downloads of the frozen install. The builder made no GitHub call.

The Founder’s check of this session record, the guarded draft push, the Founder’s B22 runs on both certification hosts, PR verification and independent review are pending. There are no declined breaks. Every live run remains outside this slice.

Every numbered receipt through preparation of this report appears below. Log 528 writes the final report. Log 529 verifies its exact bytes, the final working tree and the complete number sequence. Their final hashes accompany the delivered report.

| Log and command | UTC start / end | Uptime at command start | Exit | SHA-256 |
|---|---|---|---:|---|
| 001-governed-version.log · /Users/michaeldaley/builds/codex-governed-0.167.0/node_modules/.bin/codex --version | see uptime / see uptime | 22:49  1 user, load averages: 3.09 5.14 6.40 | exit 0 | 70de60425ca2312fb1a68e0ce2f9736235bec3b4b8f350a07e48c16fe4cd40f4 |
| 002-directory.log · pwd | see uptime / see uptime | 22:49  1 user, load averages: 2.62 4.97 6.32 | exit 0 | 304f3cf57e29d1abbffa56766418e0aeb6d653e32475b79df0e1e583574fe7d9 |
| 003-branch.log · git -C tui branch --show-current | see uptime / see uptime | 22:49  1 user, load averages: 2.62 4.97 6.32 | exit 0 | c450b39b42e8a14c4b87f1ebabaffdbfbf2622bd03d902d9acdb74fdf89bb388 |
| 004-head.log · git -C tui rev-parse HEAD | see uptime / see uptime | 22:49  1 user, load averages: 2.62 4.97 6.32 | exit 0 | 93411a1e2ea410d854f3626a7e43788dd81b53aa106a491c2643b48595151ead |
| 005-git-name.log · git -C tui config user.name | see uptime / see uptime | 22:49  1 user, load averages: 2.62 4.97 6.32 | exit 0 | 0afec6c17de7dda3d14fb34b6fe6f247a4d77a6dc99a011ff1ecff706de5f4e2 |
| 006-git-email.log · git -C tui config user.email | see uptime / see uptime | 22:49  1 user, load averages: 2.62 4.97 6.32 | exit 0 | 1175a4dadf8496624d772a01c29b87c85e96fa6f386d50f753c67cefbf6424a3 |
| 007-runtime.log · Bun runtime identity check | Thu Nov 26 03:49:54 UTC 2026 / Thu Nov 26 03:49:54 UTC 2026 | 22:49  up 4 days, 14:17, 1 user, load averages: 2.10 4.69 6.19 | exit 0 | 41a8d908b63d68298ae92171a43c21f718e2625c92234db7aac6d750a9bf51fb |
| 008-commission.log · git -C tui show HEAD:docs/decisions/DEC-20261125-01-m1-records-and-m2.md | see uptime / see uptime | 22:50  1 user, load averages: 2.29 4.57 6.11 | exit 0 | b2bc267958c99751e7d02e2e090fd430486aea2f62e550e37c56fe01ecba9ddc |
| 009-commission-hash.log · git -C tui show HEAD:docs/decisions/DEC-20261125-01-m1-records-and-m2.md &#124; shasum -a 256 | see uptime / see uptime | 22:50  1 user, load averages: 2.29 4.57 6.11 | exit 0 | 641f8ad9f34bd085d523e5f7dc09bca0cfd453f204fe2573245bb72022f3308f |
| 010-seat.log · git -C tui rev-parse origin/main HEAD^1 && git -C tui merge-base --is-ancestor b091b668af7db6142c5afeff16a628080885f63b origin/main && git -C tui diff --name-only b091b668af7db6142c5afeff16a628080885f63b origin/main && git -C tui status --porcelain=v1 && git -C tui stash list && git -C tui branch -r && git -C tui ls-tree --name-only HEAD:apps/madbridge/src/tui/live && git -C tui ls-tree --name-only HEAD:packages/supervisor/src && test ! -e tui/docs/verification/phase-3b-m2-build-log.md && test ! -e tui/docs/verification/phase-3b-m2-evidence.md && rg --files --hidden --no-ignore prompt logs pr evidence &#124; sort && uname -sm | see uptime / see uptime | 22:50  1 user, load averages: 2.29 4.57 6.11 | exit 0 | c581ae69339ae82de6e1c4834b55609d983f8d09d232a4529c3886b1e0236977 |
| 011-prompt-manifest.log · cat prompt/SHA256.txt && cd prompt && shasum -a 256 -c SHA256.txt | see uptime / see uptime | 22:50  1 user, load averages: 2.29 4.57 6.11 | exit 0 | 58219d291809501883bf915289dd3d304fd2943e65fd97947d65bf50b7c2fd86 |
| 012-commission-requirements.log · git -C tui show HEAD:docs/decisions/DEC-20261125-01-m1-records-and-m2.md &#124; sed -n '/^A10\./,/^B20\./p' | see uptime / see uptime | 22:50  1 user, load averages: 2.18 4.51 6.08 | exit 0 | fa3cbbf00a45d4dfb2cbc331d89d0ea5a80045b40b6855272c7eca2152ea95db |
| 013-broker-types.log · git -C tui show HEAD:packages/broker/src/client.ts &#124; nl -ba &#124; sed -n '1,245p' | see uptime / see uptime | 22:50  1 user, load averages: 2.18 4.51 6.08 | exit 0 | 3887b09d5754f05cb9dbedef3741ce10d9ac68815e9a0dfe937c5c4de7d5aa79 |
| 014-projection-types.log · git -C tui show HEAD:apps/madbridge/src/tui/types.ts &#124; nl -ba &#124; sed -n '1,235p' | see uptime / see uptime | 22:50  1 user, load averages: 2.18 4.51 6.08 | exit 0 | b2cd26d12c44f394d541fa1aff62a0a58d697128c4615efc412b6c750d6d4e5e |
| 015-repository-instructions.log · git -C tui show HEAD:AGENTS.md | see uptime / see uptime | 22:50  1 user, load averages: 2.18 4.51 6.08 | exit 0 | 298e38a31e0e43f0e622c8c69bc3085f4988050ef793d6c992996a70ae9f9c9f |
| 016-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 517dc63b3b2d38156a61b293c5e36206b017b43f8d571ec958f095cf83360f73 |
| 017-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261123-01-addendum-1-environment-values-in-logs.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | b30be4711e159e4382537c601731690f76123bd656bb98542974ecaeb7eed7e7 |
| 018-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261123-01-addendum-2-pty-echo.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 90a51f66c14713588ee5275d77c1be73dd8ae17b58183da6b7829969097a6bcb |
| 019-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261123-01-addendum-3-first-verdict.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 61134462ed91f0bd2bc8317accb61f5d07e8061772cbae7107c4127050798d7d |
| 020-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261108-04-phase-3b-standing-commission.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | b679f9a13935eb9002639c2e8d463253baff5b7af5e46645f21414534da88067 |
| 021-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261108-04-addendum-1-corrections.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | a647114d1c89630b20ebe55dc1e2b254820b69ac0a0e055faefb99c57b39c518 |
| 022-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261108-01-phase-3b-approval.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 44bfbd384056ae8e3bd709d81788abe7b5aa2a9c3888c9cabcf928ab0f718ee1 |
| 023-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261016-02-task46-correction.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 615314d6b67ed8c7ee0d3ec6ab3197b1e4affae28e776ca1a2eb89b772f2c0a5 |
| 024-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261024-01-separation-pin-rule.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 577c72814de419ca362be0840eca34a867902465472d7f76c249a4a0fa0efe5b |
| 025-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261112-02-model-record.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 40827bc170dcbf6143b6c86a514110310456d3886ad0e7c7e33cfb86bbd72fd7 |
| 026-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261108-02-phase-3b-builder-qualification.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | cffe894b49edfe02356972da933f46dfa930d8e9e6cc2635766eb7690860039b |
| 027-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261108-03-addendum-2-codex-harness.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 94b0495cd6a3685323a3360e6310bda8171cc3832b426b228ab31a582394db0d |
| 028-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261108-03-addendum-3-image-tool.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 00f0d0c6a3a62dfec852972884f48190dc56e47a78b3d9e71d37b60846d7364c |
| 029-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261108-03-addendum-4-sandbox-halt.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | e796c2a196517deb768c37474b51b750d252478ae0b2958b384cd971965e2781 |
| 030-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261108-03-addendum-5-own-work.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 66a0bb14d7b0142075279db82c841b4c3ef7d9fe7c9f3a4b0d6f8d156ea478a3 |
| 031-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261108-03-addendum-6-names-in-text.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | b5c5c582bc4568e24096c0cb050b5c71f6b02ac9de8777e947cba677399d683e |
| 032-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261108-03-addendum-10-second-verdict.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 3c1d613ae50e5f8c23f89b13d57df58d2299fd5853463f8556c50a52737db884 |
| 033-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261108-03-addendum-11-governed-build.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 91ea0ef1558ebc4a4895e7183a0e3833427149786bcaf66d845ac8f9386f38eb |
| 034-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261112-03-addendum-2-gate-repeat.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 6dc13d35b5076f46a803cc2a6022e68f5ee45240809e135b1ca8d420455a86ce |
| 035-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261108-03-phase-3b-h1.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 7d97304dedf1f60186cce88637480b7803485e236788059c9bc2655f100c20ef |
| 036-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261113-01-h2-records-and-merge.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 4739288048882b91c34b07d5b3446ecaae82ac9047eb5235e650a20843581948 |
| 037-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261102-02-hardening-builds.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 8809daeae61ce22b463d91f7a8fa61c231917ad2d86eeb24b34b514b5e6f8638 |
| 038-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261023-01-standing-build-rules.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 255be9bb29bfbf4cfe7b472ace4f2dc3208dd0ccda26a115e753adc098d30216 |
| 039-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261013-03-tests-4-6-ruling.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 9efcdecbd9c57b100e6e1eb3356c1fa45af5563c146ed9406ab566ec47ed9722 |
| 040-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261104-02-hardening-f-and-task58.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 65d8efb74ec1eb9474dd68107b2bbc1f82c5d5b6b65081dd11d2d751e9db21c0 |
| 041-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261114-01-madv-surface-release.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | fd48d7baabf8da3353bc4d7d95a43ad5a08401b68f36680b5683779cf4ac2cb7 |
| 042-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261115-02-phase-3b-m0.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 8712cc4137dbc45e190eec61bc8dac11222c5fcbd7f2f00cea3edffb23b7311e |
| 043-authority.log · git -C tui show HEAD:docs/decisions/DEC-20261115-02-addendum-3-phase-1-record-check.md and verify SHA-256, issued status and signature | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | e05587f152296c8067eb718c43fb357caa680b563ba1a70132064a3864e884ca |
| 044-authority.log · git -C tui show HEAD:docs/superpowers/plans/2026-09-19-phase-3b-live-tui-integration.md and verify SHA-256 | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 125d45cd38fa570ddd33cb5c7c2ae98bb09b5672643c98d26e6d07272737aee4 |
| 045-authority.log · git -C tui show HEAD:docs/superpowers/specs/2026-09-19-phase-3b-live-tui-integration-design.md and verify SHA-256 | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | d7590e6e9ce074800cab52f55354adf673b91dc48193feee60d659b6f43f191b |
| 046-authority.log · git -C tui show HEAD:docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md and verify SHA-256 | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 4bebd5f01c1730151c36f22e376888ce70e38d614d1617faccb2d7186dc84b43 |
| 047-authority.log · git -C tui show HEAD:AGENTS.md and verify SHA-256 | see uptime / see uptime | 22:51  1 user, load averages: 1.73 4.04 5.82 | exit 0 | 1c7f2d50127ca5ddf3f45c89df1e0875d8b4eda84f635c5ab716ce3b0cc5b2ac |
| 048-broker-interface.log · print -r -- 'packages/broker/src/client.ts' | see uptime / see uptime | 22:51  1 user, load averages: 1.94 3.83 5.67 | exit 0 | ed106e7ff5388e18bee719e7dd8ee809842e6a25790ae2479c406359e16050ff |
| 049-tui-entry.log · print -r -- 'apps/madbridge/src/tui/types.ts' | see uptime / see uptime | 22:51  1 user, load averages: 1.94 3.83 5.67 | exit 0 | 6c87b4c851c63cbd35764ce2f1d8bcb7b5c5d3ea28979b9a38d94fc040223204 |
| 050-tui-readers.log · print -r -- 'apps/madbridge/src/tui/components/StatusBar.tsx' | see uptime / see uptime | 22:51  1 user, load averages: 1.94 3.83 5.67 | exit 0 | 706e894edc328a1a2bb67336122d7d2a974a3fc8ee21e6ca53cde5dd884121de |
| 051-supervisor.log · print -r -- 'packages/supervisor/src/index.ts' | see uptime / see uptime | 22:51  1 user, load averages: 1.94 3.83 5.67 | exit 0 | e166bae6a7e0942df07a930dcc657491710fd2e7e0c4946c253a3d610b1f93f6 |
| 052-monitors.log · print -r -- 'packages/adapter-claude-code/src/live.ts' | see uptime / see uptime | 22:51  1 user, load averages: 1.94 3.83 5.67 | exit 0 | 0951dbd36a595fe1d5c59349536a9f507a4dd5a33dce3142cbdd3329de26d152 |
| 053-composition.log · print -r -- 'apps/madbridge/src/tui/live/composition.ts' | see uptime / see uptime | 22:51  1 user, load averages: 1.94 3.83 5.67 | exit 0 | 874a35195f2d0fc6f9baa379152bba7aef3f441c1acd13be8f2f1c2e8e471599 |
| 054-separation-scans.log · print -r -- 'test/phase3a/harness-separation.test.ts' | see uptime / see uptime | 22:51  1 user, load averages: 1.94 3.83 5.67 | exit 0 | 1a6ae3751ea9b30dddae74181d52f902e32dc813ddef02f24830531c3fc6f0f9 |
| 055-existing-tests.log · print -r -- 'packages/supervisor/test/build-rollback.test.ts' | see uptime / see uptime | 22:51  1 user, load averages: 1.94 3.83 5.67 | exit 0 | 050ffde93f8aef58155d3ab9023a42063bf92106c2b4b8c23f2d05ca377ee5da |
| 056-reader-search.log · git -C tui grep -nE '\b(connected&#124;ownershipState&#124;fencingToken&#124;executions&#124;pendingTransfers&#124;permissionSummary&#124;queueDepth)\b' HEAD -- apps/madbridge/src/tui | see uptime / see uptime | 22:51  1 user, load averages: 1.94 3.83 5.67 | exit 1 | c931b3d175c9bf6017b30074e5c9cf297611825f39d165e777eeb0e6c5f3b92d |
| 057-imports.log · git -C tui grep -nE '@madventures/supervisor&#124;supervisor/src(/index)?{U+005B}"\x27{U+005D}&#124;tui/live/&#124;\./live/&#124;composition{U+005B}"\x27{U+005D}&#124;managed-settings{U+005B}"\x27{U+005D}&#124;settings-sources{U+005B}"\x27{U+005D}&#124;composeLiveSession' HEAD -- '*.ts' '*.tsx' | see uptime / see uptime | 22:51  1 user, load averages: 1.94 3.83 5.67 | exit 0 | 2953cd6fb7901908833ebc54df1dabcfdf2a2d21547c6e3e2e48951b02b03560 |
| 058-base-behavior.log · rg -n '^6\. the&#124;^7\. for each&#124;^B4\.&#124;^B10\.' logs/012-commission-requirements.log logs/035-authority.log logs/038-authority.log logs/043-authority.log | see uptime / see uptime | 22:51  1 user, load averages: 1.94 3.83 5.67 | exit 0 | e61f1dbbcc0fe0de4d5799d6b0056b4b74695ff137c4000de0352e24259c4c93 |
| 059-fingerprint-shape.log · git -C tui grep -nE '(interface&#124;type) RepositoryFingerprint\b&#124;repositoryFingerprint: (input&#124;envelope&#124;state&#124;lifecycle)&#124;"strict"(NullChecks)?:' HEAD -- packages/protocol/src packages/broker/src tsconfig.json | see uptime / see uptime | 22:52  1 user, load averages: 1.88 3.69 5.58 | exit 1 | 2e14dd5d0abd6e5b6f063fc3ee5acab93467cd8099d8f6a103eb064a256f4a73 |
| 060-commission-mapping.log · git -C tui show HEAD:docs/decisions/DEC-20261125-01-m1-records-and-m2.md &#124; nl -ba &#124; sed -n '/B15\. \*\*The deliverable/,/B20\. \*\*Paths/p' | see uptime / see uptime | 22:52  1 user, load averages: 1.88 3.69 5.58 | exit 1 | 5a1593f5069d16007118336fef80d8de6448dbd1527e55d4644a2d724e6ab27f |
| 061-fingerprint-contract.log · git -C tui grep -n -I -e RepositoryFingerprint -e repositoryFingerprintSchema HEAD -- packages/protocol/src &#124; head -100 | see uptime / see uptime | 22:52  1 user, load averages: 1.74 3.60 5.52 | exit 0 | cdc7cc5733c05a99873df07d0c910aaae295af3e5bbfbaa888c9c54e688c7f1a |
| 062-pacenote.log · sed -n '1,180p' logs/050-tui-readers.log | see uptime / see uptime | 22:52  1 user, load averages: 1.74 3.60 5.52 | exit 0 | bbfaf016bc6a55b330186b2c559efe49fd202340b02f8af9c01e2e23f3a8a9c5 |
| 063-fingerprint-evidence.log · git -C tui show HEAD:packages/protocol/src/task-envelope.ts &#124; nl -ba &#124; sed -n '36,54p' | see uptime / see uptime | 22:52  1 user, load averages: 1.65 3.49 5.45 | exit 0 | 86ed8790c471c7cd0f33f0f3c81d04648eb19d182bddfa47fac2e350f01b9d3b |
| 064-reader-lines.log · git -C tui grep -nE '(connected&#124;ownershipState&#124;fencingToken&#124;executions&#124;pendingTransfers&#124;permissionSummary&#124;queueDepth)' HEAD -- apps/madbridge/src/tui | see uptime / see uptime | 22:52  1 user, load averages: 1.65 3.49 5.45 | exit 0 | d2e7f11912de76a45d6f564c49540a0a41e9595cbbc347f865e4ad6c82ae7f0a |
| 065-separation-details.log · git -C tui show HEAD:test/phase3b/separation.test.ts &#124; nl -ba | see uptime / see uptime | 22:52  1 user, load averages: 1.65 3.49 5.45 | exit 0 | 3228c361bc7d3b51b0c21143d8f06687bc281a0ae4d335806093961381177e76 |
| 066-halt-state.log · git -C tui status -sb | see uptime / see uptime | 22:53  1 user, load averages: 1.81 3.35 5.33 | exit 0 | c771e879b57679be270cbdc2c708b1b71c25039cdcfa7a6b0d95d8898abaac43 |
| 067-halt-report.log · Write pr/m2-report.md from the precondition logs, validate its format and print its SHA-256 | see uptime / see uptime | 22:54  1 user, load averages: 2.08 3.16 5.12 | exit 0 | eadbcf61ed99cd20ec86b1eb049a972ec3847aa96f84a11e038de0aa1e1373b3 |
| 068-resume-manifest.log · (cd prompt && shasum -a 256 -c SHA256.txt) && cat prompt/SHA256.txt | see uptime / see uptime | 23:29  1 user, load averages: 3.14 3.26 3.28 | exit 0 | cd51988afad6178adf39c54c0e3a08da208c1db6ca440676f33eb605ee559b2f |
| 069-resume-prompt.log · ls prompt && test "$(ls -A prompt)" = "$(printf '%s\n' SHA256.txt builder-prompt-m2-codex-macbook.md resume-m2-1-fingerprint.md)" | see uptime / see uptime | 23:29  1 user, load averages: 3.14 3.26 3.28 | exit 0 | 0584232884a94bdb090bd869fa9b285635d5059e8fbf285b79ab12dd85eb5d7b |
| 070-resume-version.log · /Users/michaeldaley/builds/codex-governed-0.167.0/node_modules/.bin/codex --version | see uptime / see uptime | 23:29  1 user, load averages: 3.14 3.26 3.28 | exit 0 | 4d4d3a1c52695c931d922ff6b0c8e48e75897f1a524c1c734e6bdf2eb8e751b7 |
| 071-resume-head.log · git -C tui rev-parse HEAD && git -C tui branch --show-current | see uptime / see uptime | 23:29  1 user, load averages: 3.14 3.26 3.28 | exit 0 | 05c11b8eb551d602c0f2bee289fe1facc29350b0e4447a71d33db378d73f7056 |
| 072-resume-clean.log · git -C tui status --porcelain --untracked-files=all && git -C tui stash list | see uptime / see uptime | 23:29  1 user, load averages: 3.14 3.26 3.28 | exit 0 | 29402313532c2d30ad8bfa0d6cfba92384009e3674ea6261775790034fcb101f |
| 073-resume-report.log · ls -A pr && shasum -a 256 pr/m2-halt-1-report.md | see uptime / see uptime | 23:29  1 user, load averages: 3.14 3.26 3.28 | exit 0 | a718a02bc827daef48e01f9b12d737f56cfc6a78c1f0559a3f09e009167237de |
| 074-resume-receipt.log · shasum -a 256 logs/067-halt-report.log | see uptime / see uptime | 23:29  1 user, load averages: 3.14 3.26 3.28 | exit 0 | 7c1f32eeb79103b33ba7d441c02b04503f018b9680e673bc7828ec91dbf08e04 |
| 075-resume-evidence.log · ls -A evidence | see uptime / see uptime | 23:29  1 user, load averages: 3.14 3.26 3.28 | exit 0 | 99a40295abbc8fdd04c5494dece74700709018693882c890ec8d82325d533d55 |
| 076-precondition-three.log · git -C tui rev-parse HEAD:test/phase3a/runtime-harness.ts HEAD:packages/supervisor/src/preflight.ts HEAD:packages/supervisor/test/preflight.test.ts | see uptime / see uptime | 23:29  1 user, load averages: 2.61 3.13 3.23 | exit 0 | 725bd7fbc44b0fcdfa3d4da62ef50e54351633cc0249c620ef6c7f4a43faf0a3 |
| 077-imports-at-base.log · python3 - <<'PY' | see uptime / see uptime | 23:29  1 user, load averages: 2.61 3.13 3.23 | exit 0 | 825f0aef19473118e44934a836df3381e0f0532c47031252032ddf62f0af5b0f |
| 078-baseline-rules.log · sed -n '/^## Part B/,/^## Part C/p' logs/038-authority.log | see uptime / see uptime | 23:29  1 user, load averages: 2.61 3.13 3.23 | exit 0 | dc5d9f0bcdf06217bb90f50197bf58929dc1dc5c4295c895b90e57cfb48e9c95 |
| 079-baseline-runtime.log · Bun runtime identity check | Thu Nov 26 04:30:17 UTC 2026 / Thu Nov 26 04:30:17 UTC 2026 | 23:30  up 4 days, 14:57, 1 user, load averages: 2.42 3.05 3.20 | exit 0 | fd3e50fb92bc6e959e792f4d30d6f381eb6e60885c96fc1ecbe41d6724f214bd |
| 080-baseline-install.log · bun install --frozen-lockfile | Thu Nov 26 04:31:56 UTC 2026 / Thu Nov 26 04:31:56 UTC 2026 | 23:31  up 4 days, 14:59, 1 user, load averages: 2.97 3.30 3.30 | exit 0 | dfff58d8e669af6ddb43bb7585517432ec325ac4b2b558ce8e850d296eb4652f |
| 081-baseline-worktree.log · shasum -a 256 logs/080-baseline-install.log tui/bun.lock | see uptime / see uptime | 23:32  1 user, load averages: 2.68 3.22 3.27 | exit 0 | d164eb9d12124a70b3004928ae36457d7cfcefe8b922f454d8d2b5201831c84c |
| 082-baseline-tsc.log · bunx tsc --noEmit | Thu Nov 26 04:34:01 UTC 2026 / Thu Nov 26 04:34:04 UTC 2026 | 23:34  up 4 days, 15:01, 1 user, load averages: 6.78 4.29 3.66 | exit 0 | 98de6eca7f8645dc86596d7107a79a973a2301fc903fa5116d1f1bb63ba3ae5a |
| 083-baseline-suite-runtime.log · Bun runtime identity check | Thu Nov 26 04:36:03 UTC 2026 / Thu Nov 26 04:36:03 UTC 2026 | 23:36  up 4 days, 15:03, 1 user, load averages: 3.24 3.82 3.56 | exit 0 | f19afc9afa8084b72b01fe555f241fc5f2fe827c1409adafd79e1f1e335df7f8 |
| 084-baseline-load.log · for ((n=0;n<=40;n++)); do | see uptime / see uptime | 23:36  1 user, load averages: 2.98 3.75 3.54 | exit 0 | 7c4a9a92625a22a6ea7d89505faf4b48f26452bb3df3002191a151e707778a98 |
| 085-render-design.log · cat tui/apps/madbridge/src/tui/components/agent-identity.ts tui/apps/madbridge/src/tui/components/DockStrip.tsx tui/apps/madbridge/src/tui/panes/ClaudePane.tsx tui/apps/madbridge/src/tui/panes/AntigravityPane.tsx | see uptime / see uptime | 23:36  1 user, load averages: 2.96 3.72 3.53 | exit 0 | 82bbe6ae8b65073e9c9fe66077f2a52d470dab0cd5bff4b95f3a96471c31c5f5 |
| 086-mapper-design.log · cat tui/packages/protocol/src/task-envelope.ts | see uptime / see uptime | 23:36  1 user, load averages: 2.96 3.72 3.53 | exit 0 | 6b145a9f513384b45b73f9386819b1b9d786dc7bc9a4f445a27860f4ca5436a9 |
| 087-offline-design.log · cat tui/test/phase3b/stand-in.ts tui/test/phase3b/scenarios.ts tui/test/phase3b/wire-facts.ts | see uptime / see uptime | 23:36  1 user, load averages: 2.96 3.72 3.53 | exit 0 | 0737271a47c885bbee14f08fd125cb2618944f2295ad5b2cae7bc8214f730487 |
| 088-render-harness.log · rg -n 'testRender&#124;captureCharFrame&#124;renderOnce&#124;<App&#124;<ClaudePane&#124;<DockStrip' tui/apps/madbridge/test/tui-writers-stage.test.tsx &#124; head -75 | see uptime / see uptime | 23:36  1 user, load averages: 2.21 3.46 3.44 | exit 0 | 47d4b85c660d732994c1d75a3ef8ba9f1c5ff57c2f306023d990c31ba5d24ec8 |
| 089-host-facts.log · cat tui/test/phase3b/stand-in.ts | see uptime / see uptime | 23:36  1 user, load averages: 2.21 3.46 3.44 | exit 0 | ff3556d3df52746054b074a931f03da46541871963c121d976619cd0fd60ce47 |
| 090-temp.log · mktemp -d /private/tmp/m2-r1.XXXXXXXX | see uptime / see uptime | 23:36  1 user, load averages: 2.21 3.46 3.44 | exit 0 | ee4c4bae0cdfa3f6211c30d29db9daf3cebb47f6abd82c0c737fda3fda298f59 |
| 091-test-design.log · sed -n '1,100p' tui/packages/protocol/src/pair-constraints.ts | see uptime / see uptime | 23:37  1 user, load averages: 2.24 3.37 3.41 | exit 0 | 74fad2f2ffb21fdd5bdeec7e828d7d6403b0d99f0b8b3985902c8b59a9d62898 |
| 092-log-helper.log · Create the numbered command recorder in the disposable directory | see uptime / see uptime | 23:37  1 user, load averages: 2.11 3.24 3.36 | exit 0 | 8615a19a8bd1dbf1de764959d2c0e9324cc6813a44503ade544f1eaf03f7dfad |
| 093-task-detail-draft.log · tee /private/tmp/m2-r1.lW9tqKL8/task-detail.md | Thu Nov 26 04:38:40 UTC 2026 / Thu Nov 26 04:38:40 UTC 2026 | 23:38  1 user, load averages: 1.82 2.94 3.24 | exit 0 | e5f50fca127cacda77d9fd263c5a7007a64fc4510c174896fe74d0d3add046c0 |
| 094-baseline-suite.log · bun test | Thu Nov 26 04:40:54 UTC 2026 / Thu Nov 26 04:45:08 UTC 2026 | 23:40  up 4 days, 15:08, 1 user, load averages: 3.17 2.97 3.20 | exit 0 | 192ad8a8e6e530f6da923a659d6c35709f0249fb262bb9e4d607c44dd08d03be |
| 095-listing-tool.log · tee /private/tmp/m2-r1.lW9tqKL8/list-tests.py | Thu Nov 26 04:41:27 UTC 2026 / Thu Nov 26 04:41:27 UTC 2026 | 23:41  1 user, load averages: 3.90 3.17 3.26 | exit 0 | e21cba88abc72d5b158a84b3915b22d76847e50db15165c2e80bd783dec14ff4 |
| 096-commit-check-tool.log · tee /private/tmp/m2-r1.lW9tqKL8/check-message.py | Thu Nov 26 04:41:40 UTC 2026 / Thu Nov 26 04:41:40 UTC 2026 | 23:41  1 user, load averages: 3.73 3.16 3.25 | exit 0 | d555bd95ea7a6e6e0445e4b5ce62b5d0cff4da1918e0f915de34d9add2f4e069 |
| 097-opening-tool.log · tee /private/tmp/m2-r1.lW9tqKL8/opening.py | Thu Nov 26 04:42:27 UTC 2026 / Thu Nov 26 04:42:27 UTC 2026 | 23:42  1 user, load averages: 3.00 3.07 3.22 | exit 0 | 556989972e46853974e5b1c33592449077d945138a8213f017913394558424c9 |
| 098-opening-message.log · tee /private/tmp/m2-r1.lW9tqKL8/open.msg | Thu Nov 26 04:42:58 UTC 2026 / Thu Nov 26 04:42:58 UTC 2026 | 23:42  1 user, load averages: 2.46 2.94 3.17 | exit 0 | d391ab92eba987ea958ec4fbaa325ee17c1998fc0fe55aa15aff914e7c53cb78 |
| 099-base-list.log · python3 /private/tmp/m2-r1.lW9tqKL8/list-tests.py logs/094-baseline-suite.log | Thu Nov 26 04:45:15 UTC 2026 / Thu Nov 26 04:45:15 UTC 2026 | 23:45  1 user, load averages: 2.56 2.77 3.06 | exit 0 | 2a81b900ac0c3c678c6a7beb4b064e95e6794400e7b28aa92ee24359a8d88a3b |
| 100-base-final.log · git -C tui status --porcelain --untracked-files=all | Thu Nov 26 04:45:15 UTC 2026 / Thu Nov 26 04:45:15 UTC 2026 | 23:45  1 user, load averages: 2.56 2.77 3.06 | exit 0 | d07b7aeeb73e9768b2050eec197f97873eca973ab2bbbdadc5b514fef979760f |
| 101-base-hashes.log · shasum -a 256 logs/082-baseline-tsc.log logs/083-baseline-suite-runtime.log logs/084-baseline-load.log logs/094-baseline-suite.log tui/bun.lock | Thu Nov 26 04:45:15 UTC 2026 / Thu Nov 26 04:45:15 UTC 2026 | 23:45  1 user, load averages: 2.56 2.77 3.06 | exit 0 | ef98f89a30e9889b1e71d1f7af883932e2ddb10f042cb68bb6a6a1fdbad59e4e |
| 102-case-names.log · tee -a /private/tmp/m2-r1.lW9tqKL8/task-detail.md | Thu Nov 26 04:45:29 UTC 2026 / Thu Nov 26 04:45:29 UTC 2026 | 23:45  1 user, load averages: 2.14 2.67 3.01 | exit 0 | bb650502da55356c2976574ed667ccbe464f4727e9bf2d86153a0a6fb0df06b9 |
| 103-open-log.log · python3 /private/tmp/m2-r1.lW9tqKL8/opening.py 99 | Thu Nov 26 04:45:29 UTC 2026 / Thu Nov 26 04:45:29 UTC 2026 | 23:45  1 user, load averages: 2.14 2.67 3.01 | exit 0 | a79f7fcdccd1bf81f87f6a8a5e78fdf697aafe9be688d5a5181152b22f108a83 |
| 104-open-message-check.log · python3 /private/tmp/m2-r1.lW9tqKL8/check-message.py /private/tmp/m2-r1.lW9tqKL8/open.msg | Thu Nov 26 04:45:34 UTC 2026 / Thu Nov 26 04:45:34 UTC 2026 | 23:45  1 user, load averages: 1.97 2.62 3.00 | exit 0 | d37cfd953e0109035a76aee8102160fdba9f2a046a4a42941bd69f8564bb5bda |
| 105-stage-opening.log · git -C tui add docs/verification/phase-3b-m2-build-log.md | Thu Nov 26 04:45:38 UTC 2026 / Thu Nov 26 04:45:38 UTC 2026 | 23:45  1 user, load averages: 1.97 2.62 3.00 | exit 0 | 951dec72949c463b0fb1eea7a22f38d74cb39041b72700ab2d2070807fee3e6b |
| 106-check-opening.log · git -C tui diff --cached --check | Thu Nov 26 04:45:38 UTC 2026 / Thu Nov 26 04:45:38 UTC 2026 | 23:45  1 user, load averages: 1.97 2.62 3.00 | exit 0 | 22838789ba0643a06bfd5089d48b4fb5f3b0b677971f6831663b802052a2d7b0 |
| 107-opening-paths.log · git -C tui diff --cached --stat | Thu Nov 26 04:45:38 UTC 2026 / Thu Nov 26 04:45:38 UTC 2026 | 23:45  1 user, load averages: 1.97 2.62 3.00 | exit 0 | 9b4163131ff58305b8a4847abb7d9977ff4d7b409bb67090c7db78a03119c4eb |
| 108-commit-opening.log · git -C tui commit -F /private/tmp/m2-r1.lW9tqKL8/open.msg | Thu Nov 26 04:45:43 UTC 2026 / Thu Nov 26 04:45:43 UTC 2026 | 23:45  1 user, load averages: 1.97 2.61 2.99 | exit 0 | 0088c85369280dec3ec1b29fd19e6588bb5ffd445a5dd552336ea652cfb9a755 |
| 109-opening-head.log · git -C tui log -1 --format=%H\ %P\ %s | Thu Nov 26 04:45:43 UTC 2026 / Thu Nov 26 04:45:43 UTC 2026 | 23:45  1 user, load averages: 1.97 2.61 2.99 | exit 0 | d07fd7ae5ab0985146a6158dc15f94eda12c9af8c3bfc8fd9031c1e1614a4d1d |
| 110-r1-status-inputs.log · sed -n 175,370p tui/apps/madbridge/src/tui/components/StatusBar.tsx | Thu Nov 26 04:45:48 UTC 2026 / Thu Nov 26 04:45:48 UTC 2026 | 23:45  1 user, load averages: 2.05 2.62 2.99 | exit 0 | 8f9f91b0c288ab72a68aa33f3a1c6140433d4502ec8c368395b530e824c08d31 |
| 111-r1-incident-event.log · cat tui/apps/madbridge/src/tui/components/IncidentBand.tsx tui/apps/madbridge/src/tui/components/EventLog.tsx | Thu Nov 26 04:45:48 UTC 2026 / Thu Nov 26 04:45:48 UTC 2026 | 23:45  1 user, load averages: 2.05 2.62 2.99 | exit 0 | dcc1b27f4840f4c9d747e95ef57e7cafba442d24375c02e423f1a10aaa091b54 |
| 112-r1-render-options.log · sed -n 120,195p tui/apps/madbridge/test/tui-writers-stage.test.tsx | Thu Nov 26 04:45:48 UTC 2026 / Thu Nov 26 04:45:48 UTC 2026 | 23:45  1 user, load averages: 2.05 2.62 2.99 | exit 0 | 41453a099bb8be2622cb457f029eccdcb4d21a2d07a9f409eb43fd775478628b |
| 113-r1-edit.log · python3 - | Thu Nov 26 04:46:19 UTC 2026 / Thu Nov 26 04:46:19 UTC 2026 | 23:46  1 user, load averages: 2.02 2.55 2.95 | exit 0 | d7f9c255524718fffe23262a079d6154f213380f7ee1d34ec37f8ea7d3850398 |
| 114-r1-type-diff.log · git -C tui diff -- apps/madbridge/src/tui/types.ts | Thu Nov 26 04:46:19 UTC 2026 / Thu Nov 26 04:46:19 UTC 2026 | 23:46  1 user, load averages: 2.02 2.55 2.95 | exit 0 | 3092e3c4d14336fd8bd3e9f0482a7b44731bb06902c5115b20e5823bd498fb09 |
| 115-r1-nullability.log · bunx tsc --noEmit | Thu Nov 26 04:47:32 UTC 2026 / Thu Nov 26 04:47:35 UTC 2026 | 23:47  up 4 days, 15:15, 1 user, load averages: 1.63 2.32 2.83 | exit 2 | 4261dfd0ff229d20980902fc9e732c9ee73127ea079bbf1affe04bf684e38136 |
| 116-r1-narrow.log · python3 - | Thu Nov 26 04:48:24 UTC 2026 / Thu Nov 26 04:48:24 UTC 2026 | 23:48  1 user, load averages: 1.82 2.28 2.78 | exit 0 | a0ce3f8992c689f19b9ac134f979ccc43973cfbcf09b4dea9dd71618f00af6ea |
| 117-r1-tests.log · tee tui/test/phase3b/absence.test.tsx | Thu Nov 26 04:48:24 UTC 2026 / Thu Nov 26 04:48:24 UTC 2026 | 23:48  1 user, load averages: 1.82 2.28 2.78 | exit 0 | d208aac07793c811c9428339ac3cbb239f4a37241c1da661b579d475a5b08c4c |
| 118-r1-tsc.log · bunx tsc --noEmit | Thu Nov 26 04:49:51 UTC 2026 / Thu Nov 26 04:49:54 UTC 2026 | 23:49  up 4 days, 15:17, 1 user, load averages: 1.94 2.18 2.69 | exit 0 | 070595424186cededf777c1f2cdc10deac8164c1c3b5041270905903455f5211 |
| 119-r1-runtime.log · Bun runtime identity check | Thu Nov 26 04:50:20 UTC 2026 / Thu Nov 26 04:50:20 UTC 2026 | 23:50  up 4 days, 15:17, 1 user, load averages: 1.93 2.16 2.66 | exit 0 | d62534e339b78c799fb88129836eccff703ffc229b09b9c3bdf20dfeca8b9383 |
| 120-r1-load.log · for ((n=0;n<=40;n++)); do | see uptime / see uptime | 23:50  up 4 days, 15:18, 1 user, load averages: 1.65 2.08 2.63 | exit 0 | 04aca8926562a7ffa0e70659526b932265b559744fc875c43ef8665cd7dc6ecc |
| 121-r1-frames.log · bun test test/phase3b/absence.test.tsx | Thu Nov 26 04:50:38 UTC 2026 / Thu Nov 26 04:50:39 UTC 2026 | 23:50  up 4 days, 15:18, 1 user, load averages: 1.65 2.08 2.63 | exit 0 | 6c3e555d22c851eb57bf631756fe84ec0cf73ebba49e48ffef77611a5cb8083c |
| 122-r1-message.log · tee /private/tmp/m2-r1.lW9tqKL8/r1.msg | Thu Nov 26 04:51:00 UTC 2026 / Thu Nov 26 04:51:00 UTC 2026 | 23:51  1 user, load averages: 1.73 2.08 2.61 | exit 0 | e0ea1f88623204917a731dfc1039c8786f980b4a75dca3eda9dce5c925e06ec9 |
| 123-r1-message-check.log · python3 /private/tmp/m2-r1.lW9tqKL8/check-message.py /private/tmp/m2-r1.lW9tqKL8/r1.msg | Thu Nov 26 04:51:00 UTC 2026 / Thu Nov 26 04:51:00 UTC 2026 | 23:51  1 user, load averages: 1.73 2.08 2.61 | exit 0 | eada124d36bdd1c57c5deb60848577bc4dee86d3a937906dd54b669ceb0e0d0f |
| 124-stage-r1.log · git -C tui add -u apps/madbridge/src/tui apps/madbridge/test/tui-projection.test.tsx | Thu Nov 26 04:51:06 UTC 2026 / Thu Nov 26 04:51:06 UTC 2026 | 23:51  1 user, load averages: 1.83 2.09 2.61 | exit 0 | 5d3430ae51183832d36b81a015eee057107cea4f1d07271e0821e6b60c1390fc |
| 125-stage-r1-tests.log · git -C tui add test/phase3b/absence.test.tsx | Thu Nov 26 04:51:06 UTC 2026 / Thu Nov 26 04:51:06 UTC 2026 | 23:51  1 user, load averages: 1.83 2.09 2.61 | exit 0 | 7db5f0f04bb680963bad25b31dabac5f45ac791e598e190900457b0ceb2e2c5a |
| 126-r1-review.log · git -C tui diff --cached | Thu Nov 26 04:51:06 UTC 2026 / Thu Nov 26 04:51:06 UTC 2026 | 23:51  1 user, load averages: 1.83 2.09 2.61 | exit 0 | f730d180903360a82e5020fe7ea6980acb3074195cb2079d9dad82f024c4a2c4 |
| 127-r1-check.log · git -C tui diff --cached --check | Thu Nov 26 04:51:06 UTC 2026 / Thu Nov 26 04:51:06 UTC 2026 | 23:51  1 user, load averages: 1.83 2.09 2.61 | exit 0 | 8340f0270a5e0224917d58cac936c5d918fd8098f59625bad390a54e1a91848b |
| 128-commit-r1.log · git -C tui commit -F /private/tmp/m2-r1.lW9tqKL8/r1.msg | Thu Nov 26 04:51:06 UTC 2026 / Thu Nov 26 04:51:06 UTC 2026 | 23:51  1 user, load averages: 1.83 2.09 2.61 | exit 0 | 35686cea864fddcbba4305b689d05181f561e3f9a7b4a5cb088bf1a9ab1c9745 |
| 129-r1-head.log · git -C tui log -1 --format=%H\ %P\ %s | Thu Nov 26 04:51:06 UTC 2026 / Thu Nov 26 04:51:06 UTC 2026 | 23:51  1 user, load averages: 1.83 2.09 2.61 | exit 0 | 09798e1bf77f0a886567078b274da1cd9a3a9979f0568867da0610d068df3c27 |
| 130-break-tools.log · tee /private/tmp/m2-r1.lW9tqKL8/break.py | Thu Nov 26 04:51:28 UTC 2026 / Thu Nov 26 04:51:28 UTC 2026 | 23:51  1 user, load averages: 2.24 2.16 2.62 | exit 0 | c3ba742d94780db531db0697156c679349a8146d3b5627f46dd02bf9836fac42 |
| 131-transfers-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make apps/madbridge/src/tui/panes/GovernancePane.tsx state.pendingTransfers\?.length\ \?\?\ \"—\" state.pendingTransfers\?.length\ \?\?\ 0 | Thu Nov 26 04:52:02 UTC 2026 / Thu Nov 26 04:52:02 UTC 2026 | 23:52  1 user, load averages: 1.94 2.11 2.58 | exit 0 | 9c7fc7ce1dd6bb122f31f9ec94d8f12f0b67e0916ee4f6cbfe57a7c38d724f5a |
| 132-transfers-runtime.log · Bun runtime identity check | Thu Nov 26 04:52:40 UTC 2026 / Thu Nov 26 04:52:41 UTC 2026 | 23:52  up 4 days, 15:20, 1 user, load averages: 2.38 2.18 2.59 | exit 0 | 3b88f2f843a590c926dc54a60f8a9d0320e23ea6962cb05942e8a292bda1add0 |
| 133-transfers-load.log · for ((n=0;n<=40;n++)); do | see uptime / see uptime | 23:52  up 4 days, 15:20, 1 user, load averages: 2.38 2.18 2.59 | exit 0 | da7e84fd7c9a8d67bb78f7c61cb6042439cec1fd7329b4f35652335a11263c9e |
| 134-transfers-test.log · bun test test/phase3b/absence.test.tsx | Thu Nov 26 04:53:43 UTC 2026 / Thu Nov 26 04:53:43 UTC 2026 | 23:53  up 4 days, 15:21, 1 user, load averages: 1.67 2.05 2.51 | exit 1 | e21f4f80b244fe4c75fe1eb624ccc7f0b76111b37dda83e5088f79b5123afe3d |
| 135-transfers-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore apps/madbridge/src/tui/panes/GovernancePane.tsx logs/134-transfers-test.log governance\ distinguishes\ unknown\ transfers\ and\ permissions\ from\ empty\ collections | Thu Nov 26 04:53:44 UTC 2026 / Thu Nov 26 04:53:44 UTC 2026 | 23:53  1 user, load averages: 1.67 2.05 2.51 | exit 0 | 6697d46cd696ab7a8d6825162890d57184646502242b4ac9d34521b9030d945f |
| 136-permissions-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make apps/madbridge/src/tui/panes/GovernancePane.tsx const\ readPaths\ =\ perms\ ===\ null\ \?\ \"—\" const\ readPaths\ =\ perms\ ===\ null\ \?\ \"none\" | Thu Nov 26 04:53:44 UTC 2026 / Thu Nov 26 04:53:44 UTC 2026 | 23:53  1 user, load averages: 1.67 2.05 2.51 | exit 0 | 016c6e3d1c058d59d591bb79f17769103031b33e606d84a3a1409c7c855e2210 |
| 137-permissions-runtime.log · Bun runtime identity check | Thu Nov 26 04:54:44 UTC 2026 / Thu Nov 26 04:54:44 UTC 2026 | 23:54  up 4 days, 15:22, 1 user, load averages: 2.77 2.33 2.59 | exit 0 | e9b1ce5dc9e2a9bb7c018a19e0867963a3c123343ff6963ce873421e206c73db |
| 138-permissions-load.log · for ((n=0;n<=40;n++)); do | see uptime / see uptime | 23:54  up 4 days, 15:22, 1 user, load averages: 2.77 2.33 2.59 | exit 3 | 22f92e025eb9b897ec2c4624c3bebaf237dfcabf65e9bf1b3efd7b27b96e9bfe |
| 139-permissions-quiet-load.log · for ((n=0;n<=40;n++)); do | Thu Nov 26 13:55:17 UTC 2026 / Thu Nov 26 13:56:17 UTC 2026 | 8:55  up 5 days, 22 mins, 1 user, load averages: 2.09 1.90 2.00 | exit 0 | 2f33ea6cb95ae340f4f02cec141b97f618e14aef0f9310c0fbdb9e015c290cde |
| 140-permissions-test.log · bun test test/phase3b/absence.test.tsx | Thu Nov 26 13:56:17 UTC 2026 / Thu Nov 26 13:56:18 UTC 2026 | 8:56  up 5 days, 23 mins, 1 user, load averages: 1.93 1.89 1.98 | exit 1 | 8e89777c4b2d8743db1a12a0225d076d036d48bc11b8b92d81547bd451b97214 |
| 141-permissions-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore apps/madbridge/src/tui/panes/GovernancePane.tsx logs/140-permissions-test.log governance\ distinguishes\ unknown\ transfers\ and\ permissions\ from\ empty\ collections | Thu Nov 26 13:56:24 UTC 2026 / Thu Nov 26 13:56:24 UTC 2026 | 8:56  1 user, load averages: 1.93 1.89 1.98 | exit 0 | 2e2b3b5d74737959c2df9196f0dd01a6e146f0b0c994c6e9ac33cd44988186b4 |
| 142-connection-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make apps/madbridge/src/tui/components/StatusBar.tsx const\ connToken\ =\ input.connected\ ===\ null\ \?\ \"UNKNOWN\" const\ connToken\ =\ input.connected\ ===\ null\ \?\ \"CONNECTED\" | Thu Nov 26 13:56:54 UTC 2026 / Thu Nov 26 13:56:54 UTC 2026 | 8:56  1 user, load averages: 1.68 1.83 1.96 | exit 0 | 0ed3ae1690b0d155d1affcf388ee2e59cf2e7ffd791ed1225f7e06299b413a23 |
| 143-connection-runtime.log · Bun runtime identity check | Thu Nov 26 13:57:03 UTC 2026 / Thu Nov 26 13:57:03 UTC 2026 | 8:57  up 5 days, 24 mins, 1 user, load averages: 1.74 1.84 1.96 | exit 0 | 802c976d3f35d38b8f3836d5c8df144fab6cc6c2146db6a8a41c9ac603f1ee13 |
| 144-connection-load.log · for ((n=0;n<=40;n++)); do | Thu Nov 26 13:57:05 UTC 2026 / Thu Nov 26 13:57:05 UTC 2026 | 8:57  up 5 days, 24 mins, 1 user, load averages: 1.74 1.84 1.96 | exit 0 | dedaf274d1de8f75fcfdb6c5ff590368eb5560964142d53a9a97732f434e4658 |
| 145-connection-test.log · bun test test/phase3b/absence.test.tsx | Thu Nov 26 13:57:05 UTC 2026 / Thu Nov 26 13:57:06 UTC 2026 | 8:57  up 5 days, 24 mins, 1 user, load averages: 1.74 1.84 1.96 | exit 1 | df156512019bdd7d83227874022504551ba88c0ec076b65f46201ac12c6a5dcc |
| 146-connection-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore apps/madbridge/src/tui/components/StatusBar.tsx logs/145-connection-test.log a\ null\ connection\ is\ unknown\ in\ bars,\ panes\ and\ docks | Thu Nov 26 13:57:06 UTC 2026 / Thu Nov 26 13:57:06 UTC 2026 | 8:57  1 user, load averages: 1.74 1.84 1.96 | exit 0 | 637bbaf0fb7b21131ba816b2cb5e07be08c54e0c5f7670f330547da8e088cf41 |
| 147-ownership-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make apps/madbridge/src/tui/components/StatusBar.tsx case\ null:$'\n'\ \ \ \ \ \ return\ \"UNKNOWN\"\; case\ null:$'\n'\ \ \ \ \ \ return\ \"owned\"\; | Thu Nov 26 13:57:06 UTC 2026 / Thu Nov 26 13:57:06 UTC 2026 | 8:57  1 user, load averages: 1.74 1.84 1.96 | exit 0 | 663affa7aaea280e0b81796b8abf3f0105b8fec707ab3e170a0fb8fe01723108 |
| 148-ownership-runtime.log · Bun runtime identity check | Thu Nov 26 13:58:00 UTC 2026 / Thu Nov 26 13:58:00 UTC 2026 | 8:58  up 5 days, 25 mins, 1 user, load averages: 2.16 1.94 1.99 | exit 0 | 2305e7a1f5f5c16ccfda58f4693404efe59322e0e7f9cb80cc0346310e0749b7 |
| 149-ownership-load.log · for ((n=0;n<=40;n++)); do | Thu Nov 26 13:58:01 UTC 2026 / Thu Nov 26 13:59:31 UTC 2026 | 8:58  up 5 days, 25 mins, 1 user, load averages: 2.16 1.94 1.99 | exit 0 | d0410499f7823eb1b60365ab0062ead5c7dad2e9ac87ad6f5f39593266e87da3 |
| 150-ownership-test.log · bun test test/phase3b/absence.test.tsx | Thu Nov 26 13:59:31 UTC 2026 / Thu Nov 26 13:59:31 UTC 2026 | 8:59  up 5 days, 27 mins, 1 user, load averages: 1.94 1.95 1.99 | exit 1 | 478c4c878bd2fc7b0fc1a3fe17ee48e683dd8648ea4605fc28fe834a951b724e |
| 151-ownership-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore apps/madbridge/src/tui/components/StatusBar.tsx logs/150-ownership-test.log absent\ execution\ and\ ownership\ facts\ stay\ absent\ and\ queue\ depth\ stays\ hidden | Thu Nov 26 13:59:31 UTC 2026 / Thu Nov 26 13:59:32 UTC 2026 | 8:59  1 user, load averages: 1.94 1.95 1.99 | exit 0 | 5175958f07c47ea4ef7fb45c73fc8ef533a4a2fd2136bb96fc17d1f18f2a2330 |
| 152-row-token-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make apps/madbridge/src/tui/components/EventLog.tsx entry.fencingToken\ ===\ null\ \?\ \"tok:—\" entry.fencingToken\ ===\ null\ \?\ \"tok:\" | Thu Nov 26 13:59:32 UTC 2026 / Thu Nov 26 13:59:32 UTC 2026 | 8:59  1 user, load averages: 1.94 1.95 1.99 | exit 0 | 9acd5fefd7f91d60494c86bb0c64b3ac6d234ada23d2dd42e6bd70980c6b3e60 |
| 153-row-token-runtime.log · Bun runtime identity check | Thu Nov 26 13:59:34 UTC 2026 / Thu Nov 26 13:59:35 UTC 2026 | 8:59  up 5 days, 27 mins, 1 user, load averages: 1.86 1.94 1.99 | exit 0 | 4c4ab297137975091ce9c791309cbc01446b44132793de9efdc9e14a49ca0883 |
| 154-row-token-load.log · for ((n=0;n<=40;n++)); do | Thu Nov 26 13:59:37 UTC 2026 / Thu Nov 26 13:59:37 UTC 2026 | 8:59  up 5 days, 27 mins, 1 user, load averages: 1.79 1.92 1.98 | exit 0 | c69887fb8a3f83d743ee1e51caf101674b5801e5243f3ad6cc34f2e7ca756c2a |
| 155-row-token-test.log · bun test test/phase3b/absence.test.tsx | Thu Nov 26 13:59:37 UTC 2026 / Thu Nov 26 13:59:38 UTC 2026 | 8:59  up 5 days, 27 mins, 1 user, load averages: 1.79 1.92 1.98 | exit 1 | 9e08ab3eff742ad1851cadceef31039c73259dc935d97437fe673a849592b608 |
| 156-row-token-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore apps/madbridge/src/tui/components/EventLog.tsx logs/155-row-token-test.log a\ null\ token\ stays\ absent\ in\ writer,\ incident\ and\ session_open\ frames | Thu Nov 26 13:59:38 UTC 2026 / Thu Nov 26 13:59:38 UTC 2026 | 8:59  1 user, load averages: 1.79 1.92 1.98 | exit 0 | 99180d8b87bc81de5dc9f5a80a97c8db7b6f5ae375568068992069c35c792839 |
| 157-types-export.log · rg -n BrokerSnapshot\&#124;ExecutionSnapshot\&#124;PendingApprovalSnapshot\&#124;OwnershipState\&#124;canonicalJson\&#124;parseSurfaceId tui/packages/broker/src/index.ts tui/packages/protocol/src/index.ts | Thu Nov 26 13:59:50 UTC 2026 / Thu Nov 26 13:59:50 UTC 2026 | 8:59  1 user, load averages: 2.06 1.97 2.00 | exit 0 | 454ac5bd9afcf9cb586da79fc97815c3aea18145b4a8398f0b6c92c21abff963 |
| 158-scan-rules.log · rg -n computed\&#124;Computed\&#124;ElementAccess\&#124;CallExpression tui/test/phase3a/harness-separation.test.ts | Thu Nov 26 13:59:50 UTC 2026 / Thu Nov 26 13:59:50 UTC 2026 | 8:59  1 user, load averages: 2.06 1.97 2.00 | exit 0 | e6944d80a9da28dfa2bde256a28e21e68fce4820d12d972c577afec3bd7235f9 |
| 159-r2-mapper.log · tee tui/apps/madbridge/src/tui/live/projection.ts | Thu Nov 26 14:00:35 UTC 2026 / Thu Nov 26 14:00:35 UTC 2026 | 9:00  1 user, load averages: 2.17 2.02 2.01 | exit 0 | d6d77ac0cb4361a93fb4090f68795fd2c836487484ae05e81ddf9f9b82a88869 |
| 160-r2-fixture.log · tee tui/test/phase3b/snapshot-input.ts | Thu Nov 26 14:01:28 UTC 2026 / Thu Nov 26 14:01:28 UTC 2026 | 9:01  1 user, load averages: 2.76 2.19 2.07 | exit 0 | 9320ad7ba8177b3f6435c2b53573213e53a8c324f35e76f2f0b05337cf74eb57 |
| 161-r2-table.log · tee tui/test/phase3b/projection.test.ts | Thu Nov 26 14:01:28 UTC 2026 / Thu Nov 26 14:01:28 UTC 2026 | 9:01  1 user, load averages: 5.02 2.67 2.24 | exit 0 | 1f07fb308c6a2700134834665c74fd798d35e10b4f44b4583713f06f9ed38cae |
| 162-r2-runtime.log · Bun runtime identity check | Thu Nov 26 14:05:26 UTC 2026 / Thu Nov 26 14:05:26 UTC 2026 | 9:05  up 5 days, 33 mins, 1 user, load averages: 1.56 1.97 2.02 | exit 0 | b9f69738262adfb0c58a445d5a623f010a2451888095885e5b6f1b8dab37244a |
| 163-r2-load.log · for ((n=0;n<=40;n++)); do | Thu Nov 26 14:05:27 UTC 2026 / Thu Nov 26 14:05:27 UTC 2026 | 9:05  up 5 days, 33 mins, 1 user, load averages: 1.56 1.97 2.02 | exit 0 | 914bf83277d4b5c2fc030f639a045f51f206d42311e2b6a8fb1aae11e4de5d36 |
| 164-r2-table.log · bun test test/phase3b/projection.test.ts | Thu Nov 26 14:05:27 UTC 2026 / Thu Nov 26 14:05:27 UTC 2026 | 9:05  up 5 days, 33 mins, 1 user, load averages: 1.56 1.97 2.02 | exit 0 | 9cb4ab1734d04b60b41d1054f25206e58c3f92c2f893564bd34b1fb33d3ff621 |
| 165-r2-message.log · tee /private/tmp/m2-r1.lW9tqKL8/r2.msg | Thu Nov 26 14:05:45 UTC 2026 / Thu Nov 26 14:05:45 UTC 2026 | 9:05  1 user, load averages: 2.40 2.14 2.08 | exit 0 | 2fd62d65a3cbaa89ce87980f2de97680aa471ce06a4e53330b3b228cec689e55 |
| 166-r2-message-check.log · python3 /private/tmp/m2-r1.lW9tqKL8/check-message.py /private/tmp/m2-r1.lW9tqKL8/r2.msg | Thu Nov 26 14:05:45 UTC 2026 / Thu Nov 26 14:05:46 UTC 2026 | 9:05  1 user, load averages: 2.40 2.14 2.08 | exit 0 | 656d3fc457b864b99ff06bf94b413deb006cc8beab4ff99a8a0101e685012839 |
| 167-stage-r2.log · git -C tui add apps/madbridge/src/tui/live/projection.ts test/phase3b/snapshot-input.ts test/phase3b/projection.test.ts | Thu Nov 26 14:05:46 UTC 2026 / Thu Nov 26 14:05:46 UTC 2026 | 9:05  1 user, load averages: 2.40 2.14 2.08 | exit 0 | 5694a65a2e253a3fa30be4b52f26d0a71be98fd95b468a240515ff0e3938e67e |
| 168-r2-review.log · git -C tui diff --cached | Thu Nov 26 14:05:46 UTC 2026 / Thu Nov 26 14:05:46 UTC 2026 | 9:05  1 user, load averages: 2.40 2.14 2.08 | exit 0 | d679c640cdf3e9398ae307be39538a22cf3dd104803e4c2e9e4a754ea49797e7 |
| 169-r2-check.log · git -C tui diff --cached --check | Thu Nov 26 14:05:46 UTC 2026 / Thu Nov 26 14:05:46 UTC 2026 | 9:05  1 user, load averages: 2.40 2.14 2.08 | exit 0 | eb3522b5aa3a3f843282d93023bc171d284b1d8de44095359f504093b6de7c54 |
| 170-commit-r2.log · git -C tui commit -F /private/tmp/m2-r1.lW9tqKL8/r2.msg | Thu Nov 26 14:05:51 UTC 2026 / Thu Nov 26 14:05:51 UTC 2026 | 9:05  1 user, load averages: 2.28 2.12 2.08 | exit 0 | 90ccb6e995df5f48161ead2215b983e511a6d4e4a02b81632a77908284fe041a |
| 171-r2-head.log · git -C tui log -1 --format=%H\ %P\ %s | Thu Nov 26 14:05:51 UTC 2026 / Thu Nov 26 14:05:51 UTC 2026 | 9:05  1 user, load averages: 2.28 2.12 2.08 | exit 0 | b290aa7fbb3d2001284923dd34b95467c98546cf3fddfe1054611c7cff339673 |
| 172-sender-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make apps/madbridge/src/tui/live/projection.ts snapshot.ownershipState\?.kind\ \?\?\ null snapshot.ownershipState\?.kind\ ===\ \"sender-released\"\ \?\ \"owned\"\ :\ snapshot.ownershipState\?.kind\ \?\?\ null | Thu Nov 26 14:06:24 UTC 2026 / Thu Nov 26 14:06:24 UTC 2026 | 9:06  1 user, load averages: 2.23 2.12 2.08 | exit 0 | f120da5f504cb53a703ed6c40e715655d111fdfa859c810cc175332906c05ff4 |
| 173-sender-runtime.log · Bun runtime identity check | Thu Nov 26 14:11:05 UTC 2026 / Thu Nov 26 14:11:06 UTC 2026 | 9:11  up 5 days, 38 mins, 1 user, load averages: 1.69 1.93 2.00 | exit 0 | 08ca3c3f6091c2c9f7a8e37816c7640a999a2e92bbfd49add1bf0c0898181ec4 |
| 174-sender-load.log · for ((n=0;n<=40;n++)); do | Thu Nov 26 14:11:07 UTC 2026 / Thu Nov 26 14:11:07 UTC 2026 | 9:11  up 5 days, 38 mins, 1 user, load averages: 1.69 1.93 2.00 | exit 0 | ce5667e4df8fd2b68f4d7ffe3b2b907756a87daeb49bf9627f6a4dc50caa73b2 |
| 175-sender-test.log · bun test test/phase3b/projection.test.ts | Thu Nov 26 14:11:07 UTC 2026 / Thu Nov 26 14:11:07 UTC 2026 | 9:11  up 5 days, 38 mins, 1 user, load averages: 1.69 1.93 2.00 | exit 1 | 1408b61063aaed3802bf2bc3179060a6aeeec44011a87249f84494b61ce3be78 |
| 176-sender-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore apps/madbridge/src/tui/live/projection.ts logs/175-sender-test.log the\ pinned\ table\ maps\ every\ broker\ member\ and\ declared\ phase\ and\ ownership\ kind | Thu Nov 26 14:11:07 UTC 2026 / Thu Nov 26 14:11:07 UTC 2026 | 9:11  1 user, load averages: 1.71 1.93 2.00 | exit 0 | 6babc8aea2f8ba9144d6e7d1025f530e8f21fbe3784069d9ddcb56cb76082dcb |
| 177-kind-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make apps/madbridge/src/tui/live/projection.ts kind:\ oneOf\(\"commit\",\ \"working_tree\"\) kind:\ string | Thu Nov 26 14:11:07 UTC 2026 / Thu Nov 26 14:11:08 UTC 2026 | 9:11  1 user, load averages: 1.71 1.93 2.00 | exit 0 | c418b882253216bce064ec001399cf5123c8b7acbfcaad25c3a4074f15d4ffe7 |
| 178-kind-runtime.log · Bun runtime identity check | Thu Nov 26 14:11:09 UTC 2026 / Thu Nov 26 14:11:09 UTC 2026 | 9:11  up 5 days, 38 mins, 1 user, load averages: 1.71 1.93 2.00 | exit 0 | 8248e42cf9918a13259901ce76af907523e7b5c8d6ebd13ac44cd8caf83130e0 |
| 179-kind-load.log · for ((n=0;n<=40;n++)); do | Thu Nov 26 14:11:10 UTC 2026 / Thu Nov 26 14:11:10 UTC 2026 | 9:11  up 5 days, 38 mins, 1 user, load averages: 1.71 1.93 2.00 | exit 0 | c9a4e4973d30236d8202c28bbd7f832619e0a3792559b6a670fe5eb9f836e956 |
| 180-kind-test.log · bun test test/phase3b/projection.test.ts | Thu Nov 26 14:11:10 UTC 2026 / Thu Nov 26 14:11:11 UTC 2026 | 9:11  up 5 days, 38 mins, 1 user, load averages: 1.71 1.93 2.00 | exit 1 | b9d4370cf8bebf72e34e40d836439fe901b88f30835eb4dacfa906f46b8de042 |
| 181-kind-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore apps/madbridge/src/tui/live/projection.ts logs/180-kind-test.log the\ mapper\ rejects\ unknown\ shapes\ without\ disclosing\ supplied\ values | Thu Nov 26 14:11:11 UTC 2026 / Thu Nov 26 14:11:11 UTC 2026 | 9:11  1 user, load averages: 1.71 1.93 2.00 | exit 0 | 9576e5dc614f629b0450dafb576cf144068ccb82963d9f74621b98287389d417 |
| 182-r3-timer.log · tee tui/packages/supervisor/src/snapshot-timer.ts | Thu Nov 26 14:11:54 UTC 2026 / Thu Nov 26 14:11:54 UTC 2026 | 9:11  1 user, load averages: 1.35 1.80 1.95 | exit 0 | 77a95c6f7ea08b99de922c59a89d5e4542afafa45f4edb13dac2310041ac5e58 |
| 183-r3-export.log · tee -a tui/packages/supervisor/src/index.ts | Thu Nov 26 14:11:54 UTC 2026 / Thu Nov 26 14:11:54 UTC 2026 | 9:11  1 user, load averages: 1.35 1.80 1.95 | exit 0 | 18341e84df9a2b727176e1a5f31d254f7c9ac793650d2ed7d45024c574555f80 |
| 184-r3-test.log · tee tui/packages/supervisor/test/snapshot-timer.test.ts | Thu Nov 26 14:11:54 UTC 2026 / Thu Nov 26 14:11:54 UTC 2026 | 9:11  1 user, load averages: 1.35 1.80 1.95 | exit 0 | bd29461b43204d216b857b5fdac50ee376cb0d61b4b2122f50a81627c6279dbf |
| 185-load-helper.log · tee /private/tmp/m2-r1.lW9tqKL8/load.zsh | Thu Nov 26 14:11:54 UTC 2026 / Thu Nov 26 14:11:54 UTC 2026 | 9:11  1 user, load averages: 1.35 1.80 1.95 | exit 0 | 79c25c458188a49424f95db8c8d4fd6cf6e1ed4d46d90654a83df2e440664873 |
| 186-r3-runtime.log · Bun runtime identity check | Thu Nov 26 14:21:10 UTC 2026 / Thu Nov 26 14:21:10 UTC 2026 | 9:21  up 5 days, 48 mins, 1 user, load averages: 1.93 2.14 2.06 | exit 0 | 25a91ebc2267335cac9b2672ab95499edf1675b390133ea68b795e6eb769cd11 |
| 187-r3-load.log · wait_for_load | Thu Nov 26 14:21:12 UTC 2026 / Thu Nov 26 14:21:12 UTC 2026 | 9:21  up 5 days, 48 mins, 1 user, load averages: 1.93 2.14 2.06 | exit 0 | 879519ad8487aefa3aa5f13d6c00a965dd158128cf55ead3b0f0758c95800e42 |
| 188-r3-test.log · bun test packages/supervisor/test/snapshot-timer.test.ts | Thu Nov 26 14:21:12 UTC 2026 / Thu Nov 26 14:21:12 UTC 2026 | 9:21  up 5 days, 48 mins, 1 user, load averages: 1.93 2.14 2.06 | exit 0 | 18aeedaf8f193c8c6b6f4c87b70b7e758d55c4a04eeefe26e88edf331b18cbf0 |
| 189-r3-message.log · tee /private/tmp/m2-r1.lW9tqKL8/r3.msg | Thu Nov 26 14:21:25 UTC 2026 / Thu Nov 26 14:21:25 UTC 2026 | 9:21  1 user, load averages: 2.35 2.22 2.08 | exit 0 | dfcff49f83ad8a4cd297af81bc9eea0414c88dc66bf103b1809f5bd7b0fb6e1b |
| 190-r3-message-check.log · python3 /private/tmp/m2-r1.lW9tqKL8/check-message.py /private/tmp/m2-r1.lW9tqKL8/r3.msg | Thu Nov 26 14:21:25 UTC 2026 / Thu Nov 26 14:21:25 UTC 2026 | 9:21  1 user, load averages: 2.35 2.22 2.08 | exit 0 | b6f376b2f959bd927482020153e756de27864de6a8658cd4a6d44e046b20b4a1 |
| 191-stage-r3.log · git -C tui add packages/supervisor/src/index.ts packages/supervisor/src/snapshot-timer.ts packages/supervisor/test/snapshot-timer.test.ts | Thu Nov 26 14:21:25 UTC 2026 / Thu Nov 26 14:21:25 UTC 2026 | 9:21  1 user, load averages: 2.35 2.22 2.08 | exit 0 | 1ae8e378a26fdf9d82660b388766602d873d7230f2f530b8f561e3832c3d5582 |
| 192-r3-review.log · git -C tui diff --cached | Thu Nov 26 14:21:25 UTC 2026 / Thu Nov 26 14:21:25 UTC 2026 | 9:21  1 user, load averages: 2.35 2.22 2.08 | exit 0 | 7c57521f70b67faf048f892b211ab4c323deaa42e4663ee2068b1a4d6bbb8e6c |
| 193-r3-check.log · git -C tui diff --cached --check | Thu Nov 26 14:21:25 UTC 2026 / Thu Nov 26 14:21:25 UTC 2026 | 9:21  1 user, load averages: 2.35 2.22 2.08 | exit 0 | d94cb32b6e1fc2080c1c82796515cff7d59c3d1577c8502c525c42f0138ebc97 |
| 194-commit-r3.log · git -C tui commit -F /private/tmp/m2-r1.lW9tqKL8/r3.msg | Thu Nov 26 14:21:34 UTC 2026 / Thu Nov 26 14:21:34 UTC 2026 | 9:21  1 user, load averages: 2.60 2.28 2.11 | exit 0 | a30ce40c7db4b41569c09d8e8cd8b6f5ac9c4f826af23c2d3d195be4b55174aa |
| 195-r3-head.log · git -C tui log -1 --format=%H\ %P\ %s | Thu Nov 26 14:21:34 UTC 2026 / Thu Nov 26 14:21:34 UTC 2026 | 9:21  1 user, load averages: 2.60 2.28 2.11 | exit 0 | 2b770b0755691a00eaf4ed7e087a3c5d5fa43a533e764d45f7421e32590e10fd |
| 196-interval-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make packages/supervisor/src/snapshot-timer.ts SNAPSHOT_INTERVAL_MS\ =\ 100 SNAPSHOT_INTERVAL_MS\ =\ 0 | Thu Nov 26 14:21:34 UTC 2026 / Thu Nov 26 14:21:34 UTC 2026 | 9:21  1 user, load averages: 2.60 2.28 2.11 | exit 0 | ccdb3b6f7a6d6ddc83e5b6971e4d49134efb907c812a3c8da50533fba10a2618 |
| 197-interval-runtime.log · Bun runtime identity check | Thu Nov 26 14:37:05 UTC 2026 / Thu Nov 26 14:37:05 UTC 2026 | 9:37  up 5 days,  1:04, 1 user, load averages: 1.78 1.80 2.04 | exit 0 | 43fb271c8e6ccafd5152e218c90918644b23338547ff7b8be1bc5deeb9097033 |
| 198-interval-load.log · wait_for_load | Thu Nov 26 14:37:06 UTC 2026 / Thu Nov 26 14:37:06 UTC 2026 | 9:37  up 5 days,  1:04, 1 user, load averages: 1.80 1.81 2.04 | exit 0 | c715d1c4a11da741a30633d0e1dda2fa402674ce2bcc8b125abe052059cb1903 |
| 199-interval-test.log · bun test packages/supervisor/test/snapshot-timer.test.ts | Thu Nov 26 14:37:06 UTC 2026 / Thu Nov 26 14:37:07 UTC 2026 | 9:37  up 5 days,  1:04, 1 user, load averages: 1.80 1.81 2.04 | exit 1 | d37e491790da91257d85037e8e0297341cb307677837d60b67e087fa19d1778d |
| 200-interval-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore packages/supervisor/src/snapshot-timer.ts logs/199-interval-test.log the\ snapshot\ wait\ paces\ reads\ and\ settles\ promptly\ on\ cancellation | Thu Nov 26 14:37:07 UTC 2026 / Thu Nov 26 14:37:07 UTC 2026 | 9:37  1 user, load averages: 1.80 1.81 2.04 | exit 0 | 8488a9fba38ae54617b445dd4b588c27fec41bea22e92fb1cc76e809bf82a8ab |
| 201-r4-adapter.log · tee tui/apps/madbridge/src/tui/live/subscribe.ts | Thu Nov 26 14:38:05 UTC 2026 / Thu Nov 26 14:38:05 UTC 2026 | 9:38  1 user, load averages: 2.19 1.90 2.06 | exit 0 | f8b90804ba83e1d57feb70b81a1dbdd2d0297d152dd1cb62f875b2bc41b4f2ec |
| 202-r4-tests.log · tee tui/test/phase3b/subscribe.test.ts | Thu Nov 26 14:38:05 UTC 2026 / Thu Nov 26 14:38:05 UTC 2026 | 9:38  1 user, load averages: 2.19 1.90 2.06 | exit 0 | e3744e95f796dc57bc5a80d4f62801fc6cdc0f23b80327b72080851a2acb29a1 |
| 203-r4-runtime.log · Bun runtime identity check | Thu Nov 26 14:38:27 UTC 2026 / Thu Nov 26 14:38:28 UTC 2026 | 9:38  up 5 days,  1:06, 1 user, load averages: 1.84 1.84 2.03 | exit 0 | b24ca85d45d7f26f999747aee813bc05691e7261c4bded2f63fe0424686eb183 |
| 204-r4-load.log · wait_for_load | Thu Nov 26 14:38:51 UTC 2026 / Thu Nov 26 14:38:51 UTC 2026 | 9:38  up 5 days,  1:06, 1 user, load averages: 1.61 1.79 2.01 | exit 0 | 313ffe2ba7e30881aaeea556da203473edda889d22948e59f621d0ba33992810 |
| 205-r4-test.log · bun test test/phase3b/subscribe.test.ts | Thu Nov 26 14:38:51 UTC 2026 / Thu Nov 26 14:38:53 UTC 2026 | 9:38  up 5 days,  1:06, 1 user, load averages: 1.61 1.79 2.01 | exit 0 | fc044df1705b3d064d9763cfa50a89f6f83544e7378ed49f2de61e40540f9c70 |
| 206-r4-message.log · tee /private/tmp/m2-r1.lW9tqKL8/r4.msg | Thu Nov 26 14:39:47 UTC 2026 / Thu Nov 26 14:39:47 UTC 2026 | 9:39  1 user, load averages: 1.98 1.86 2.02 | exit 0 | ad53478b80659374297a98d083c379ac050aa1f6deed5e30796e0367f4d92042 |
| 207-r4-message-check.log · python3 /private/tmp/m2-r1.lW9tqKL8/check-message.py /private/tmp/m2-r1.lW9tqKL8/r4.msg | Thu Nov 26 14:39:47 UTC 2026 / Thu Nov 26 14:39:47 UTC 2026 | 9:39  1 user, load averages: 1.98 1.86 2.02 | exit 0 | 993431f7dbb7da8cae60e272555aba3da6f9456a67b001d4e993f21bcfe04bf9 |
| 208-stage-r4.log · git -C tui add apps/madbridge/src/tui/live/subscribe.ts test/phase3b/subscribe.test.ts | Thu Nov 26 14:39:47 UTC 2026 / Thu Nov 26 14:39:47 UTC 2026 | 9:39  1 user, load averages: 1.98 1.86 2.02 | exit 0 | 40f892d12dd75732f8f15113adf91aa9e4221dc0d4e5b62cae7e85c6a3f45542 |
| 209-r4-review.log · git -C tui diff --cached | Thu Nov 26 14:39:47 UTC 2026 / Thu Nov 26 14:39:47 UTC 2026 | 9:39  1 user, load averages: 1.98 1.86 2.02 | exit 0 | 61db39a16a2b34d1384013ca0cb464db9cc442cfb920159d5254fb4829fdbcdb |
| 210-r4-check.log · git -C tui diff --cached --check | Thu Nov 26 14:39:48 UTC 2026 / Thu Nov 26 14:39:48 UTC 2026 | 9:39  1 user, load averages: 1.98 1.86 2.02 | exit 0 | 0154d2ded4c90f880295f81f9570d943c08a681282067138b802cb6d647bc3fe |
| 211-commit-r4.log · git -C tui commit -F /private/tmp/m2-r1.lW9tqKL8/r4.msg | Thu Nov 26 14:39:53 UTC 2026 / Thu Nov 26 14:39:53 UTC 2026 | 9:39  1 user, load averages: 1.98 1.86 2.02 | exit 0 | 60e5b3ca20e8aebefdfd87c4889fa28c06b633adac6434ff1e01ff4c3f6d43bb |
| 212-r4-head.log · git -C tui log -1 --format=%H\ %P\ %s | Thu Nov 26 14:39:53 UTC 2026 / Thu Nov 26 14:39:53 UTC 2026 | 9:39  1 user, load averages: 1.98 1.86 2.02 | exit 0 | b44b6e577275744e0f552ac3e0031f33fd8bdd8ae20d2fa3c2bf8ee762fc2cf3 |
| 213-duplicate-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make apps/madbridge/src/tui/live/subscribe.ts if\ \(closed\ \&#124;\&#124;\ !isDeepStrictEqual\(last,\ next\)\) if\ \(true\) | Thu Nov 26 14:40:22 UTC 2026 / Thu Nov 26 14:40:22 UTC 2026 | 9:40  1 user, load averages: 1.80 1.81 1.99 | exit 0 | 5733ab6edc2b5ee8781d4fea8069941e900b7639f8f9e902ae035307be3b6e0e |
| 214-duplicate-runtime.log · Bun runtime identity check | Thu Nov 26 14:40:24 UTC 2026 / Thu Nov 26 14:40:24 UTC 2026 | 9:40  up 5 days,  1:07, 1 user, load averages: 1.80 1.81 1.99 | exit 0 | 17d300ccd62363d576bd4bd2d4ca3805f54a3c6087eea64df71725650ce71294 |
| 215-duplicate-load.log · wait_for_load | Thu Nov 26 14:41:17 UTC 2026 / Thu Nov 26 14:42:47 UTC 2026 | 9:41  up 5 days,  1:08, 1 user, load averages: 2.30 1.94 2.03 | exit 0 | ada11285fd3856332f820ce05272d46566d6884c192e9231a9b1f1c2be3f5009 |
| 216-duplicate-test.log · bun test test/phase3b/subscribe.test.ts | Thu Nov 26 14:42:47 UTC 2026 / Thu Nov 26 14:42:49 UTC 2026 | 9:42  up 5 days,  1:10, 1 user, load averages: 1.83 1.92 2.01 | exit 1 | 5e27c8cf8e16fe52af3df201cf500a679eba3f7f6045315963938910a7176cb9 |
| 217-duplicate-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore apps/madbridge/src/tui/live/subscribe.ts logs/216-duplicate-test.log subscription\ gives\ the\ first,\ changed\ and\ closed\ projections\ exactly\ once | Thu Nov 26 14:42:49 UTC 2026 / Thu Nov 26 14:42:49 UTC 2026 | 9:42  1 user, load averages: 1.77 1.90 2.00 | exit 0 | a4912a61462058a71c178017456a43030429d1b80a73447c547341c18a044860 |
| 218-closed-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make apps/madbridge/src/tui/live/subscribe.ts const\ closed\ =\ next.connected\ ===\ false\; const\ closed\ =\ next.connected\ ===\ false\;$'\n'\ \ \ \ \ \ \ \ if\ \(closed\)\ return\; | Thu Nov 26 14:42:49 UTC 2026 / Thu Nov 26 14:42:49 UTC 2026 | 9:42  1 user, load averages: 1.77 1.90 2.00 | exit 0 | 3c08fc45d35f2061814e0022b472164dd874b3720e84db8ffc3c64b36d3f2f90 |
| 219-closed-runtime.log · Bun runtime identity check | Thu Nov 26 14:43:15 UTC 2026 / Thu Nov 26 14:43:15 UTC 2026 | 9:43  up 5 days,  1:10, 1 user, load averages: 2.70 2.09 2.07 | exit 0 | 65195a1d260a132e9a90fe000ede1e70eff7958552f2912811754a64da82b868 |
| 220-closed-load.log · wait_for_load | Thu Nov 26 14:43:19 UTC 2026 / Thu Nov 26 14:46:49 UTC 2026 | 9:43  up 5 days,  1:10, 1 user, load averages: 2.88 2.14 2.08 | exit 0 | f0783db468a6c38653622129941a93e6717bbfe1e8ff9c914df751de18720050 |
| 221-closed-test.log · bun test test/phase3b/subscribe.test.ts | Thu Nov 26 14:46:49 UTC 2026 / Thu Nov 26 14:46:51 UTC 2026 | 9:46  up 5 days,  1:14, 1 user, load averages: 1.73 2.01 2.04 | exit 1 | c184c0fdbc621ca45e1d074fefe426d7666c62b4c90344dce7d71c9f7d7e48ee |
| 222-closed-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore apps/madbridge/src/tui/live/subscribe.ts logs/221-closed-test.log subscription\ gives\ the\ first,\ changed\ and\ closed\ projections\ exactly\ once | Thu Nov 26 14:46:51 UTC 2026 / Thu Nov 26 14:46:51 UTC 2026 | 9:46  1 user, load averages: 1.73 2.01 2.04 | exit 0 | b86c520438a7e2e157ccb84f2743ceac30c3bc9e94b9ddb6917c219d25db61ff |
| 223-after-failure-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make apps/madbridge/src/tui/live/subscribe.ts if\ \(last\ \&\&\ !signal.aborted\)\ listener\(\{\ ...last,\ connected:\ false\ \}\)\;$'\n'\ \ \ \ \ \ \ \ \ \ return\; if\ \(last\ \&\&\ !signal.aborted\)\ listener\(\{\ ...last,\ connected:\ false\ \}\)\;$'\n'\ \ \ \ \ \ \ \ \ \ if\ \(last\ \&\&\ !signal.aborted\)\ continue\;$'\n'\ \ \ \ \ \ \ \ \ \ return\; | Thu Nov 26 14:46:51 UTC 2026 / Thu Nov 26 14:46:52 UTC 2026 | 9:46  1 user, load averages: 1.73 2.01 2.04 | exit 0 | 98a896742e6710c999a56a48cd9d59e9f2f83e8342c05326142b5305ef368aff |
| 224-after-failure-runtime.log · Bun runtime identity check | Thu Nov 26 14:47:39 UTC 2026 / Thu Nov 26 14:47:39 UTC 2026 | 9:47  up 5 days,  1:15, 1 user, load averages: 1.85 2.01 2.04 | exit 0 | 804f9df41ab08b71040929bd1ad93e3d91f13a2ddec420cba8397e63d2edeba2 |
| 225-after-failure-load.log · wait_for_load | Thu Nov 26 14:50:09 UTC 2026 / Thu Nov 26 14:52:40 UTC 2026 | 9:50  up 5 days,  1:17, 1 user, load averages: 2.06 2.00 2.02 | exit 0 | ad780bd4f44f792be450322ebc7245f6be858aeb66bbc85e161ffd6c0a9af8dd |
| 226-after-failure-test.log · bun test test/phase3b/subscribe.test.ts | Thu Nov 26 14:52:40 UTC 2026 / Thu Nov 26 14:52:41 UTC 2026 | 9:52  up 5 days,  1:20, 1 user, load averages: 1.77 2.23 2.13 | exit 1 | 463131728e2df36e51eb9af893f790c4aeb615cc7232d219e9b7f200ef7f658b |
| 227-after-failure-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore apps/madbridge/src/tui/live/subscribe.ts logs/226-after-failure-test.log mapping\ and\ read\ failures\ end\ delivery\ from\ the\ last\ projection | Thu Nov 26 14:52:41 UTC 2026 / Thu Nov 26 14:52:41 UTC 2026 | 9:52  1 user, load averages: 1.77 2.23 2.13 | exit 0 | aadde1d639b3a587b85cb0b20bd4ed6078e74c9074b7a89a3b0c883c5a9686c6 |
| 228-first-failure-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make apps/madbridge/src/tui/live/subscribe.ts if\ \(last\ \&\&\ !signal.aborted\)\ listener\(\{\ ...last,\ connected:\ false\ \}\)\;$'\n'\ \ \ \ \ \ \ \ \ \ return\; if\ \(last\ \&\&\ !signal.aborted\)\ listener\(\{\ ...last,\ connected:\ false\ \}\)\;$'\n'\ \ \ \ \ \ \ \ \ \ if\ \(!last\ \&\&\ !signal.aborted\)\ continue\;$'\n'\ \ \ \ \ \ \ \ \ \ return\; | Thu Nov 26 14:52:41 UTC 2026 / Thu Nov 26 14:52:41 UTC 2026 | 9:52  1 user, load averages: 1.77 2.23 2.13 | exit 0 | 68e64fa66af231114522f7271b4d25e888500ea6de41b302cc80802b92d2dfd6 |
| 229-first-failure-runtime.log · Bun runtime identity check | Thu Nov 26 14:52:43 UTC 2026 / Thu Nov 26 14:52:43 UTC 2026 | 9:52  up 5 days,  1:20, 1 user, load averages: 1.71 2.21 2.13 | exit 0 | be79c7e7e14cb01bcabf82947bf91b16408b0b78fbce8aa77cf0a53d1eeb2c24 |
| 230-first-failure-load.log · wait_for_load | Thu Nov 26 14:52:44 UTC 2026 / Thu Nov 26 14:52:44 UTC 2026 | 9:52  up 5 days,  1:20, 1 user, load averages: 1.71 2.21 2.13 | exit 0 | 6a69e5b8c06b1168a50964c17d507e7f6151a5bcf600ddb4e11170b947f77543 |
| 231-first-failure-test.log · bun test test/phase3b/subscribe.test.ts | Thu Nov 26 14:52:44 UTC 2026 / Thu Nov 26 14:52:46 UTC 2026 | 9:52  up 5 days,  1:20, 1 user, load averages: 1.71 2.21 2.13 | exit 1 | f7fcc6b20b41c0ba9f88ef03dd49fbc9d5a353b56b010dd5a04c7f0927a5abf6 |
| 232-first-failure-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore apps/madbridge/src/tui/live/subscribe.ts logs/231-first-failure-test.log a\ first\ failure\ gives\ no\ projection | Thu Nov 26 14:52:46 UTC 2026 / Thu Nov 26 14:52:46 UTC 2026 | 9:52  1 user, load averages: 1.71 2.21 2.13 | exit 0 | 201e1e24ef575bb2f4eda8586fe79ae4d838e0f4d1ad2748f26ae195157b1fff |
| 233-unsubscribe-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make apps/madbridge/src/tui/live/subscribe.ts \ \ \ \ \ \ \ \ \ \ if\ \(signal.aborted\)\ return\;$'\n' '' | Thu Nov 26 14:52:46 UTC 2026 / Thu Nov 26 14:52:46 UTC 2026 | 9:52  1 user, load averages: 1.71 2.21 2.13 | exit 0 | 0f1bd36ba988638e4e71c0585af890fea1dfa6f371e892b7a670adfa356fdb6c |
| 234-unsubscribe-runtime.log · Bun runtime identity check | Thu Nov 26 14:53:27 UTC 2026 / Thu Nov 26 14:53:27 UTC 2026 | 9:53  up 5 days,  1:21, 1 user, load averages: 1.52 2.09 2.08 | exit 0 | 85f819fc3c9c25f75e7d2cd88317f6504fc0d13db84ad17d25ac4a488561c932 |
| 235-unsubscribe-load.log · wait_for_load | Thu Nov 26 14:53:40 UTC 2026 / Thu Nov 26 14:53:40 UTC 2026 | 9:53  up 5 days,  1:21, 1 user, load averages: 1.68 2.10 2.09 | exit 0 | 4279146d4e17d73ebc75629d93cd05fc93e5221abceca9ad2af39e89758c6732 |
| 236-unsubscribe-test.log · bun test test/phase3b/subscribe.test.ts | Thu Nov 26 14:53:40 UTC 2026 / Thu Nov 26 14:53:42 UTC 2026 | 9:53  up 5 days,  1:21, 1 user, load averages: 1.68 2.10 2.09 | exit 1 | 44d301e8fa1b2ed45a8dc2f60825908fcb6b381ddaae8eb40593b214beea9e71 |
| 237-unsubscribe-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore apps/madbridge/src/tui/live/subscribe.ts logs/236-unsubscribe-test.log unsubscribe\ cancels\ pacing\ and\ suppresses\ in-flight\ delivery | Thu Nov 26 14:53:42 UTC 2026 / Thu Nov 26 14:53:42 UTC 2026 | 9:53  1 user, load averages: 1.68 2.10 2.09 | exit 0 | 4c8a60396a728feb32f1d04d2110b3110f7609d82e244295f147ae50a900ffd6 |
| 238-build-ports.log · sed -n 85,181p\;313,358p\;975,1050p\;1056,1164p tui/packages/supervisor/src/build.ts | Thu Nov 26 14:53:56 UTC 2026 / Thu Nov 26 14:53:56 UTC 2026 | 9:53  1 user, load averages: 1.95 2.14 2.10 | exit 0 | 4902e3c130fca89a61df1b1188035eaf0a35472b759f1e049233b836e60bd981 |
| 239-closure-and-parser.log · sed -n 320,390p tui/packages/broker/src/runtime-broker.ts | Thu Nov 26 14:53:56 UTC 2026 / Thu Nov 26 14:53:56 UTC 2026 | 9:53  1 user, load averages: 1.95 2.14 2.10 | exit 0 | 30cfcd389778ca0741fa3f8833a9f042c8267d78b90c8c7851ca86c46df54c40 |
| 240-event-shapes.log · sed -n 50,217p tui/packages/adapter-madv-surface/src/index.ts | Thu Nov 26 14:53:56 UTC 2026 / Thu Nov 26 14:53:56 UTC 2026 | 9:53  1 user, load averages: 1.95 2.14 2.10 | exit 0 | 90202bc490ee50911594d2a61d2d6fb66a515f27216dcf011de442c1ca6cb409 |
| 241-wire-tests.log · sed -n 1,160p tui/packages/adapter-claude-code/test/live.test.ts | Thu Nov 26 14:53:56 UTC 2026 / Thu Nov 26 14:53:56 UTC 2026 | 9:53  1 user, load averages: 1.95 2.14 2.10 | exit 0 | 642d961bd182c36e0dba97c266e956dd9e31c2339aade5442c564d20cded1e5a |
| 242-madv-wire.log · sed -n 1,145p tui/packages/adapter-madv-surface/test/live.test.ts | Thu Nov 26 14:53:56 UTC 2026 / Thu Nov 26 14:53:56 UTC 2026 | 9:53  1 user, load averages: 1.95 2.14 2.10 | exit 0 | 2edc6c4ee61f3a7469eb85fbef61a4daf94688421d045dd9e3cc9d34a2897d6e |
| 243-test-tree.log · rg --files tui/test/phase3b | Thu Nov 26 14:53:56 UTC 2026 / Thu Nov 26 14:53:56 UTC 2026 | 9:53  1 user, load averages: 1.95 2.14 2.10 | exit 0 | 3ef543888edc5b3e9ea52f5f61af6cab9595aa0925e10edd0a4e31005a5d59f0 |
| 244-resume-state.log · git -C tui status -sb | Thu Nov 26 14:57:08 UTC 2026 / Thu Nov 26 14:57:08 UTC 2026 | 9:57  1 user, load averages: 1.88 2.19 2.14 | exit 0 | c216fb53fc09a8e01c108be5ad7d547b34ad27876622539b24b5b2cd3eda8721 |
| 245-current-commit.log · git -C tui log -1 --format=%H\ %P\ %s | Thu Nov 26 14:57:08 UTC 2026 / Thu Nov 26 14:57:08 UTC 2026 | 9:57  1 user, load averages: 1.88 2.19 2.14 | exit 0 | 83128ad21a9f755dc2c512bb56a0741330bbab867cfcb43046a478864c92bdcf |
| 246-r5-source.log · cat tui/packages/adapter-claude-code/src/live.ts tui/packages/adapter-madv-surface/src/live.ts | Thu Nov 26 14:57:16 UTC 2026 / Thu Nov 26 14:57:16 UTC 2026 | 9:57  1 user, load averages: 1.59 2.12 2.11 | exit 0 | 8e3d203749126b4a538e45fd04361dd66de1cd7fca8118b9847df12d172db075 |
| 247-offline-source.log · cat tui/test/phase3b/offline.ts tui/test/phase3b/scenarios.ts tui/test/phase3b/preflight-input.ts | Thu Nov 26 14:57:16 UTC 2026 / Thu Nov 26 14:57:16 UTC 2026 | 9:57  1 user, load averages: 1.59 2.12 2.11 | exit 0 | f0b1cbcdd7a973f6b8ea8359d97e823834328507f090be8732bb995856754fc4 |
| 248-r5-design.log · rg -n child-end\&#124;R5\&#124;B19\ item\ 7\&#124;R6\&#124;R7 tui/docs/verification/phase-3b-m2-build-log.md | Thu Nov 26 14:57:16 UTC 2026 / Thu Nov 26 14:57:16 UTC 2026 | 9:57  1 user, load averages: 1.59 2.12 2.11 | exit 0 | a2ced422bb99a8ca849d854aaf782f6691c32f87f120d4e9f2dc363148889d07 |
| 249-b8-reading.log · rg -n -A 30 \^\\\*\\\*B8\\.\&#124;\^B8\\.\&#124;\^\#\#\#\ B8\&#124;\^\\\*\\\*B19\\.\&#124;\^B19\\.\&#124;\^\#\#\#\ B19 tui/docs/decisions/DEC-20261125-01-m1-records-and-m2.md | Thu Nov 26 14:57:25 UTC 2026 / Thu Nov 26 14:57:25 UTC 2026 | 9:57  1 user, load averages: 2.05 2.20 2.14 | exit 0 | 54b7d50c85541c9671edc129fdbdcab56a940f118cc739513accfb4bdc5838fd |
| 250-build-reasons.log · sed -n 135,159p\;631,672p\;702,728p\;1025,1038p\;1112,1132p tui/packages/supervisor/src/build.ts | Thu Nov 26 14:57:25 UTC 2026 / Thu Nov 26 14:57:25 UTC 2026 | 9:57  1 user, load averages: 2.05 2.20 2.14 | exit 0 | 87b3e47b844975c3721282aca245f7bbad9e47f8b8948b9b7b37d09d2079bbf6 |
| 251-wire-shapes.log · cat tui/test/phase3b/stand-in.ts tui/test/phase3b/wire-facts.ts tui/apps/madbridge/src/tui/live/composition.ts | Thu Nov 26 14:57:25 UTC 2026 / Thu Nov 26 14:57:25 UTC 2026 | 9:57  1 user, load averages: 2.05 2.20 2.14 | exit 0 | 39f708ee97b5fff5fb8dace5e9f967ce8017c83ad35a658680dc70d7cefcfa65 |
| 252-parser-and-row.log · rg -n -A 20 finish\\\(exit\&#124;session_interrupted\&#124;export\ type\ SurfaceAttester\&#124;supported_versions tui/packages/adapter-madv-surface/src/index.ts tui/packages/broker/src/runtime-broker.ts tui/packages/supervisor/src/build.ts | Thu Nov 26 14:57:25 UTC 2026 / Thu Nov 26 14:57:25 UTC 2026 | 9:57  1 user, load averages: 2.05 2.20 2.14 | exit 0 | 057341531c2e674320bcdcbc6c6c970cd2c29d7de47984e4a94555aa8b11b62d |
| 253-end-interface.log · sed -n 96,138p\;701,735p\;1040,1128p tui/packages/supervisor/src/build.ts | Thu Nov 26 14:57:40 UTC 2026 / Thu Nov 26 14:57:40 UTC 2026 | 9:57  1 user, load averages: 1.74 2.12 2.12 | exit 0 | 9dbf31ce30e2859f47465ff8b2b3da39e42b5f36baa974a0a6e917c3da8cdbb8 |
| 254-tty-ancestry.log · rg -n spawn\&#124;ppid\&#124;forkpty\&#124;setsid\&#124;process\\.pid tui/packages/pty-host/src/main.ts tui/packages/pty-host/src/client.ts | Thu Nov 26 14:57:40 UTC 2026 / Thu Nov 26 14:57:40 UTC 2026 | 9:57  1 user, load averages: 1.74 2.12 2.12 | exit 2 | 167d6fa16230668e763a98930dc61a3bbe5a57d105ac6044267f3aa3abe91d77 |
| 255-existing-cases.log · cat tui/packages/adapter-madv-surface/test/live.test.ts | Thu Nov 26 14:57:40 UTC 2026 / Thu Nov 26 14:57:40 UTC 2026 | 9:57  1 user, load averages: 1.74 2.12 2.12 | exit 0 | 7dc8853171adc37e12ac3b69e39de42036a9e48ed712cdb349d7a8b46234930e |
| 256-stand-in-details.log · sed -n 1,47p tui/test/phase3b/stand-in.ts | Thu Nov 26 14:57:40 UTC 2026 / Thu Nov 26 14:57:40 UTC 2026 | 9:57  1 user, load averages: 1.74 2.12 2.12 | exit 0 | 6c5339798a9466ab992a04e3d4b031ced6bdb418b2ff10dddce927b811dbbaca |
| 257-scoped-items.log · sed -n 165,171p tui/docs/decisions/DEC-20261125-01-m1-records-and-m2.md | Thu Nov 26 14:57:40 UTC 2026 / Thu Nov 26 14:57:40 UTC 2026 | 9:57  1 user, load averages: 1.74 2.12 2.12 | exit 0 | 1f5a6505d4b62f50fbc8be02fc3111445cafc587447715b44a6183f3bfde492e |
| 258-tool-shape.log · rg -n -C 3 tool_use\&#124;tool_result tui/packages/adapter-madv-surface/src/index.ts | Thu Nov 26 14:57:40 UTC 2026 / Thu Nov 26 14:57:40 UTC 2026 | 9:57  1 user, load averages: 1.74 2.12 2.12 | exit 0 | 0193306afc4fa56369b8c221b77f4c492345144393e9e93d5163d164f74df23b |
| 259-host-runtime.log · rg -n spawnGoverned\&#124;forkpty\&#124;Bun\\.spawn\&#124;hostPid\&#124;host_exited tui/packages/pty-host/src tui/packages/supervisor/src/build.ts | Thu Nov 26 14:57:52 UTC 2026 / Thu Nov 26 14:57:52 UTC 2026 | 9:57  1 user, load averages: 1.69 2.10 2.11 | exit 0 | 9db5ee10d7c401916a95d03de86df4bbfc5d3a62fb4d73fc6e0630c8d70c4da0 |
| 260-host-pump.log · rg -n facts\\\(\\\)\&#124;AsyncIterable\&#124;stdout\\.getReader\&#124;for\ await\&#124;class\ .\*Host tui/packages/pty-host/src | Thu Nov 26 14:57:52 UTC 2026 / Thu Nov 26 14:57:52 UTC 2026 | 9:57  1 user, load averages: 1.69 2.10 2.11 | exit 0 | a100c381452bc7ca66182dd9a37e03bfb82cdbe4d5fdb9e0ea5b4b5908ee8c56 |
| 261-shape-refs.log · rg -n -A 12 function\ formatFailureDetail\&#124;class\ Ledger\&#124;interface\ BuildHostResource\&#124;beginRequest\\\( tui/packages/supervisor/src/build.ts tui/packages/adapter-madv-surface/src/index.ts | Thu Nov 26 14:57:52 UTC 2026 / Thu Nov 26 14:57:52 UTC 2026 | 9:57  1 user, load averages: 1.69 2.10 2.11 | exit 0 | c117331152b51a9a7245b458fcbdfd1618c62401c46fd46b39cab593cf3ef8ea |
| 262-close-runtime.log · sed -n 294,354p\;590,631p\;1130,1159p tui/packages/supervisor/src/build.ts | Thu Nov 26 14:58:09 UTC 2026 / Thu Nov 26 14:58:09 UTC 2026 | 9:58  1 user, load averages: 1.67 2.08 2.10 | exit 0 | 8320499627483fae519babcad9a6f8067c5a2686c2436af28ead7381e1dbfc5d |
| 263-parser-state.log · sed -n 148,214p tui/packages/adapter-madv-surface/src/index.ts | Thu Nov 26 14:58:09 UTC 2026 / Thu Nov 26 14:58:09 UTC 2026 | 9:58  1 user, load averages: 1.67 2.08 2.10 | exit 0 | 2f61dbd527105cd252ff4b58002b20a7eedb358332f16e23d2274c92ea08c3cc |
| 264-tty-tools.log · cat tui/packages/adapter-claude-code/src/detectors.ts tui/packages/adapter-madv-surface/src/detectors.ts | Thu Nov 26 14:58:09 UTC 2026 / Thu Nov 26 14:58:09 UTC 2026 | 9:58  1 user, load averages: 1.67 2.08 2.10 | exit 0 | c120badd9d2aefe9934c3026049846768c8652cbaf9e4ac9ee035abcb31b06ed |
| 265-end-monitor-edit.log · python3 - | Thu Nov 26 14:58:26 UTC 2026 / Thu Nov 26 14:58:26 UTC 2026 | 9:58  1 user, load averages: 1.69 2.05 2.09 | exit 0 | 10a7daecb67675dc421169fcfa6a5f2313ee422ecb297dc37bc25ec73adef59b |
| 266-build-hash.log · shasum -a 256 tui/packages/supervisor/src/build.ts | Thu Nov 26 14:58:26 UTC 2026 / Thu Nov 26 14:58:26 UTC 2026 | 9:58  1 user, load averages: 1.69 2.05 2.09 | exit 0 | c0abd1f2c3f0ab62bba8142a9572ed0972c02d06e4524a36ef3394c43e63a01d |
| 267-update-build-pin.log · python3 - | Thu Nov 26 14:58:35 UTC 2026 / Thu Nov 26 14:58:35 UTC 2026 | 9:58  1 user, load averages: 1.73 2.05 2.09 | exit 1 | 222f61cd344d0d48f04e73d0898b297bf9ef768f68e525df53de34cf0a13522d |
| 268-pin-diff.log · git -C tui diff -- test/phase3a/harness-separation.test.ts | Thu Nov 26 14:58:35 UTC 2026 / Thu Nov 26 14:58:35 UTC 2026 | 9:58  1 user, load averages: 1.73 2.05 2.09 | exit 0 | 323b0323769b30969ba413d0a3d3c150511830bba90a694c0c61909147ea1f12 |
| 269-pin-layout.log · sed -n 25,33p tui/test/phase3a/harness-separation.test.ts | Thu Nov 26 14:58:39 UTC 2026 / Thu Nov 26 14:58:40 UTC 2026 | 9:58  1 user, load averages: 1.92 2.08 2.10 | exit 0 | 897cd06baa60b578d5ab81bfb29b97baa5391751b329eb50c215053bebc88ce7 |
| 270-update-pin.log · python3 - | Thu Nov 26 14:58:50 UTC 2026 / Thu Nov 26 14:58:50 UTC 2026 | 9:58  1 user, load averages: 1.85 2.06 2.09 | exit 0 | b888110f246ce89d653121e86733e722bfcdeb79f0ddf45aa628dabc3bef056e |
| 271-pin-diff.log · git -C tui diff -- test/phase3a/harness-separation.test.ts | Thu Nov 26 14:58:50 UTC 2026 / Thu Nov 26 14:58:50 UTC 2026 | 9:58  1 user, load averages: 1.85 2.06 2.09 | exit 0 | b5aa5b0957dccc1fb68de7852b99d7528a03e981b1a120540beec6d8b774e5f4 |
| 272-monitor-termination.log · rg -n -A 19 const\ makeBrokerDeps\&#124;terminateGovernedProcesses:\&#124;function\ terminateBuild tui/packages/supervisor/src/build.ts | Thu Nov 26 14:59:17 UTC 2026 / Thu Nov 26 14:59:17 UTC 2026 | 9:59  1 user, load averages: 1.81 2.03 2.08 | exit 0 | d129ae69a69c0ef774dca0babc8b4d0598f7352c63a353e70b39dec60dea631d |
| 273-end-stand-in.log · tee tui/test/phase3b/end-stand-in.ts | Thu Nov 26 15:00:02 UTC 2026 / Thu Nov 26 15:00:02 UTC 2026 | 10:00  1 user, load averages: 1.49 1.91 2.03 | exit 0 | fc7ad9ba914777755113bfb32d5d96e2ee1dd2010e390491c9fe1949f9f84dfc |
| 274-end-fixture.log · tee tui/test/phase3b/m2-offline.ts | Thu Nov 26 15:00:02 UTC 2026 / Thu Nov 26 15:00:02 UTC 2026 | 10:00  1 user, load averages: 1.49 1.91 2.03 | exit 0 | 14667ca3c5f967924abf6d285b4543940b27c76a4b3baf11dfb0980f5eff85dc |
| 275-child-end-runner.log · tee tui/test/phase3b/child-end.ts | Thu Nov 26 15:00:51 UTC 2026 / Thu Nov 26 15:00:51 UTC 2026 | 10:00  1 user, load averages: 1.57 1.85 2.00 | exit 0 | f1f9362f535e87d11d6d277c5473610ed054c78a35787d3a4744fcd9f4afeaa5 |
| 276-child-end-tests.log · tee tui/test/phase3b/child-end.test.ts | Thu Nov 26 15:00:51 UTC 2026 / Thu Nov 26 15:00:51 UTC 2026 | 10:00  1 user, load averages: 1.57 1.85 2.00 | exit 0 | e8fc38ae3a1f8f9240809c1ef9067895ff72997df0b8eb0e6b55234997278a6b |
| 277-founder-close-kind.log · sed -n 364,380p tui/packages/broker/src/runtime-broker.ts | Thu Nov 26 15:00:51 UTC 2026 / Thu Nov 26 15:00:51 UTC 2026 | 10:00  1 user, load averages: 1.57 1.85 2.00 | exit 0 | d4f7e1edd36fa4f3689223f8096a6933b4b27de25532995a3946b8ece40bcc8b |
| 278-founder-expectation.log · sed -i '' s/expect\(seen.closed\).toBe\(\"founder_close\"\)/expect\(seen.closed\).toBe\(\"founder\"\)/ tui/test/phase3b/child-end.test.ts | Thu Nov 26 15:00:59 UTC 2026 / Thu Nov 26 15:00:59 UTC 2026 | 10:00  1 user, load averages: 1.52 1.84 1.99 | exit 0 | 767a8b69447fee3d164522b31134c9c3d1e95cb5c20b7e500e19b6d1b39b952f |
| 279-r5-runtime.log · Bun runtime identity check | Thu Nov 26 15:01:18 UTC 2026 / Thu Nov 26 15:01:18 UTC 2026 | 10:01  up 5 days,  1:28, 1 user, load averages: 1.30 1.77 1.96 | exit 0 | 21e75fe620a2b2ae06efd977b7d3a0bfe856917a9dd48305a94f920758cb5fab |
| 280-load.log · wait_for_load | Thu Nov 26 15:01:19 UTC 2026 / Thu Nov 26 15:01:19 UTC 2026 | 10:01  up 5 days,  1:28, 1 user, load averages: 1.30 1.77 1.96 | exit 0 | 20c2874ede3fdc80453cfc7c808a820d1bca282a0f882e1934c06f76dd7c7c60 |
| 281-child-end.log · bun test test/phase3b/child-end.test.ts | Thu Nov 26 15:01:19 UTC 2026 / Thu Nov 26 15:01:25 UTC 2026 | 10:01  up 5 days,  1:28, 1 user, load averages: 1.30 1.77 1.96 | exit 1 | cff0f19eb3449f1e145d5aeedddb436b8538206bc06793e1a1f3e9dd63ff3576 |
| 282-pty-final-facts.log · sed -n 285,510p tui/packages/pty-host/src/main.ts | Thu Nov 26 15:01:36 UTC 2026 / Thu Nov 26 15:01:36 UTC 2026 | 10:01  1 user, load averages: 1.34 1.75 1.95 | exit 0 | d40f0a9ee84feb40fe9035cf15d16b62b6bf6c21421dc44c5dd6f6803556f2f5 |
| 283-pty-loop.log · sed -n 518,750p tui/packages/pty-host/src/main.ts | Thu Nov 26 15:01:36 UTC 2026 / Thu Nov 26 15:01:36 UTC 2026 | 10:01  1 user, load averages: 1.34 1.75 1.95 | exit 0 | 154417c115a2508aa3e113e3bd1548bacb71058908a01b330fe883903fabb1a2 |
| 284-transport-source.log · rg -n function\ spawnPtyHost\&#124;class\ .\*PtyHost\&#124;function\\\*\ facts\&#124;async\ \\\*facts\&#124;function\ .\*FactPump\&#124;child\\.exited tui/packages | Thu Nov 26 15:01:36 UTC 2026 / Thu Nov 26 15:01:37 UTC 2026 | 10:01  1 user, load averages: 1.34 1.75 1.95 | exit 0 | 266a7f51502c6ef3d8b003d01cf1a59e166a49c8ddbbd3c6ac810f32e0a2d0e5 |
| 285-end-runtime.log · sed -n 760,930p tui/packages/pty-host/src/main.ts | Thu Nov 26 15:01:36 UTC 2026 / Thu Nov 26 15:01:36 UTC 2026 | 10:01  1 user, load averages: 1.34 1.75 1.95 | exit 0 | 4ff796cc233a210dc100483a44761263d2b7c5a7eb48de52e83fe37708002b6e |
| 286-terminal-source.log · cat tui/packages/pty-host/src/terminal.ts | Thu Nov 26 15:01:36 UTC 2026 / Thu Nov 26 15:01:36 UTC 2026 | 10:01  1 user, load averages: 1.34 1.75 1.95 | exit 0 | 5395198ef1c74c2bf5675908fc79673ba5e5b83127c588ad4e724a1eb03d6246 |
| 287-fact-subscriber.log · sed -n 135,355p tui/packages/broker/src/pty-host-supervisor.ts | Thu Nov 26 15:01:44 UTC 2026 / Thu Nov 26 15:01:44 UTC 2026 | 10:01  1 user, load averages: 1.31 1.73 1.94 | exit 0 | 888d41ce36c929f76d3347af76ceb3648fd0732696340572b02585cd077a733d |
| 288-fact-stream.log · sed -n 354,560p tui/packages/broker/src/pty-host-supervisor.ts | Thu Nov 26 15:01:44 UTC 2026 / Thu Nov 26 15:01:44 UTC 2026 | 10:01  1 user, load averages: 1.31 1.73 1.94 | exit 0 | c35967401133cbe2e460e169281a9e74658ef6e5fb76f2e8120cd2339d0370b5 |
| 289-running-probe.log · sed -n 194,284p tui/packages/pty-host/src/main.ts | Thu Nov 26 15:01:44 UTC 2026 / Thu Nov 26 15:01:44 UTC 2026 | 10:01  1 user, load averages: 1.31 1.73 1.94 | exit 0 | ad2683707610a10a097ebe21690d1a3594b3eefc093ff3111572469ad75f00c6 |
| 290-pipeline-facts.log · sed -n 26,160p tui/packages/pty-host/src/main.ts | Thu Nov 26 15:01:44 UTC 2026 / Thu Nov 26 15:01:44 UTC 2026 | 10:01  1 user, load averages: 1.31 1.73 1.94 | exit 0 | 3ce0e1d65a5787dd9aea853eee672b978961cc6c1ba1fa4e7b25f349d5cf3758 |
| 291-subscriber-end.log · sed -n 555,760p tui/packages/broker/src/pty-host-supervisor.ts | Thu Nov 26 15:01:57 UTC 2026 / Thu Nov 26 15:01:57 UTC 2026 | 10:01  1 user, load averages: 1.24 1.70 1.93 | exit 0 | 6b4fdffc72efc08134feda50774e88012cd67fe34795944ccecca894e06a3dc1 |
| 292-voluntary-ends.log · rg -n voluntary\&#124;natural\ exit\&#124;natural\ child\&#124;exits\ naturally\&#124;trailing\ output\&#124;exit\ spontaneously tui/packages/pty-host/test tui/packages/broker/test tui/test/phase3a | Thu Nov 26 15:02:03 UTC 2026 / Thu Nov 26 15:02:03 UTC 2026 | 10:02  1 user, load averages: 1.22 1.68 1.92 | exit 0 | ff59abb7106c6226d834ec4a466993ca8508d9b9961957bd6ad9037321e59225 |
| 293-exit-report.log · rg -n stderr\&#124;closure_kind\&#124;ps.\*state tui/packages/supervisor/test/live-port.test.ts tui/test/phase3b tui/test/phase3a/runtime-harness.ts | Thu Nov 26 15:02:03 UTC 2026 / Thu Nov 26 15:02:03 UTC 2026 | 10:02  1 user, load averages: 1.22 1.68 1.92 | exit 0 | d32c65766ab164afe2cd98778f50ff2527aa0c70277dd87c73517f4b5bf9a162 |
| 294-base-stand-in.log · sed -n 26,104p\;338,395p tui/packages/pty-host/test/main-guard.test.ts | Thu Nov 26 15:02:10 UTC 2026 / Thu Nov 26 15:02:11 UTC 2026 | 10:02  1 user, load averages: 1.36 1.71 1.93 | exit 0 | 095a3c863e66d040a9a59fb5eafe860f19fb548c228e2b75711732d07f75daf6 |
| 295-sequence-stand-in-exit.log · python3 - | Thu Nov 26 15:02:27 UTC 2026 / Thu Nov 26 15:02:27 UTC 2026 | 10:02  1 user, load averages: 1.59 1.74 1.93 | exit 0 | ba5127a3f1b97c67c021f7c9ef8750bfbd5b1adf38aff89f69d2980d4cb7276d |
| 296-load.log · wait_for_load | Thu Nov 26 15:03:15 UTC 2026 / Thu Nov 26 15:05:15 UTC 2026 | 10:03  up 5 days,  1:30, 1 user, load averages: 2.39 1.95 2.00 | exit 0 | 7eb8ef3245b6ec58d8f48607c7e98cbfe30ff9218ca70159caa1b5b53b241ade |
| 297-child-join.log · bun test test/phase3b/child-end.test.ts | Thu Nov 26 15:05:15 UTC 2026 / Thu Nov 26 15:05:21 UTC 2026 | 10:05  up 5 days,  1:32, 1 user, load averages: 1.69 1.85 1.95 | exit 1 | ff868226ca9304d60a4dcb103dcb950b2f6b19e643f5f265976fc1c6a76b967d |
| 298-commit-check-format.log · cat /private/tmp/m2-r1.lW9tqKL8/check-message.py /private/tmp/m2-r1.lW9tqKL8/r4.msg /private/tmp/m2-r1.lW9tqKL8/break.py | Thu Nov 26 15:03:59 UTC 2026 / Thu Nov 26 15:03:59 UTC 2026 | 10:03  1 user, load averages: 2.13 1.93 1.99 | exit 0 | 179d525a77bc68882860ac93152c4a507023dd9d5d2b9e2a296b45c55b2020c9 |
| 299-host-diagnostic.log · tee /private/tmp/m2-r1.lW9tqKL8/host-probe.ts | Thu Nov 26 15:05:49 UTC 2026 / Thu Nov 26 15:05:49 UTC 2026 | 10:05  1 user, load averages: 1.28 1.74 1.91 | exit 0 | 8a45261e764782c1c03eee572948f67a24ea5bb073798491af0c0f86a7d38be2 |
| 300-diagnostic-runtime.log · Bun runtime identity check | Thu Nov 26 15:06:15 UTC 2026 / Thu Nov 26 15:06:16 UTC 2026 | 10:06  up 5 days,  1:33, 1 user, load averages: 1.51 1.74 1.90 | exit 0 | 061f23fc451ecb2ff39d273a63d6298c5a96deb079166d855e95da638ab2dbf0 |
| 301-load.log · wait_for_load | Thu Nov 26 15:06:17 UTC 2026 / Thu Nov 26 15:06:17 UTC 2026 | 10:06  up 5 days,  1:33, 1 user, load averages: 1.51 1.74 1.90 | exit 0 | 7b623991b7ba489d996d29ab17ae7d0de36bce81a515018c03d6363d5ffa990d |
| 302-host-diagnostic.log · bun /private/tmp/m2-r1.lW9tqKL8/host-probe.ts | Thu Nov 26 15:06:17 UTC 2026 / Thu Nov 26 15:06:18 UTC 2026 | 10:06  up 5 days,  1:33, 1 user, load averages: 1.51 1.74 1.90 | exit 0 | c7ddce6108c9527d9975fd8a7007183e7afa470f3784a54ef520ebccf2796470 |
| 303-witness-stand-in.log · python3 - | Thu Nov 26 15:07:10 UTC 2026 / Thu Nov 26 15:07:10 UTC 2026 | 10:07  1 user, load averages: 2.08 1.80 1.91 | exit 0 | 26d93d674f4ec560615c2352491cf6fc298df16f0dffb35e0c4d8bab86752bad |
| 304-load.log · wait_for_load | Thu Nov 26 15:08:41 UTC 2026 / Thu Nov 26 15:09:11 UTC 2026 | 10:08  up 5 days,  1:36, 1 user, load averages: 2.00 1.89 1.93 | exit 0 | fad7b2600cf872c2100881be730e430b0186e9639d52086e58950735646a26d1 |
| 305-witness-cases.log · bun test test/phase3b/child-end.test.ts | Thu Nov 26 15:09:11 UTC 2026 / Thu Nov 26 15:09:18 UTC 2026 | 10:09  up 5 days,  1:36, 1 user, load averages: 1.67 1.82 1.91 | exit 0 | d655f8e98f8616164642dd00bcfb14e2947ec5ab1293b20d5af0e246432b4301 |
| 306-private-state-directory.log · python3 - | Thu Nov 26 15:09:29 UTC 2026 / Thu Nov 26 15:09:29 UTC 2026 | 10:09  1 user, load averages: 1.65 1.81 1.90 | exit 0 | d84eea1aa8ba098732d32d279c1fdf8d22f48c88bcae2b78d207ef8505de5a6b |
| 307-r5-working-diff.log · git -C tui diff --check | Thu Nov 26 15:09:29 UTC 2026 / Thu Nov 26 15:09:29 UTC 2026 | 10:09  1 user, load averages: 1.65 1.81 1.90 | exit 0 | 161e6810b198a80d75f5c84325707b989444b9798110c26f6f6ff94f164471ab |
| 308-r5-types.log · bunx tsc --noEmit | Thu Nov 26 15:09:42 UTC 2026 / Thu Nov 26 15:09:46 UTC 2026 | 10:09  up 5 days,  1:37, 1 user, load averages: 1.36 1.74 1.87 | exit 2 | e351e73bf3564fc523e5bed4cafe64245aefb153b1b2436aaa7cc9d8438fd73a |
| 309-self-fix-scope.log · rg -n -A 3 \^B\{U+005B}2345\{U+005D}\\. tui/docs/decisions/DEC-20261023-01-standing-build-rules.md | Thu Nov 26 15:09:57 UTC 2026 / Thu Nov 26 15:09:57 UTC 2026 | 10:09  1 user, load averages: 1.33 1.72 1.86 | exit 0 | 4581164ead3be19948b28cba54b55e24d55d0b276f70bd64ba9dc23e61098af1 |
| 310-adapter-type-line.log · sed -n 56,77p tui/test/phase3b/subscribe.test.ts | Thu Nov 26 15:09:57 UTC 2026 / Thu Nov 26 15:09:57 UTC 2026 | 10:09  1 user, load averages: 1.33 1.72 1.86 | exit 0 | 9d146410dd88e7f4dbd6c6f3ece954057356db28755f8c8a4b1a34783ba6c4ab |
| 311-r5-status.log · git -C tui status --porcelain --untracked-files=all | Thu Nov 26 15:09:57 UTC 2026 / Thu Nov 26 15:09:57 UTC 2026 | 10:09  1 user, load averages: 1.33 1.72 1.86 | exit 0 | f2084b4c55de428eaa1dc8d235d1242900e056a95c47465760236fc3857463f8 |
| 312-load.log · wait_for_load | Thu Nov 26 15:10:21 UTC 2026 / Thu Nov 26 15:10:21 UTC 2026 | 10:10  up 5 days,  1:37, 1 user, load averages: 1.46 1.71 1.85 | exit 0 | a4a686fcefe90b1d3456504c6ee2b95bc42efe7c04afd5275de2626c3e7f0aaa |
| 313-r5-regression.log · bun test test/phase3b/child-end.test.ts packages/adapter-madv-surface/test/live.test.ts test/phase3a/harness-separation.test.ts | Thu Nov 26 15:10:21 UTC 2026 / Thu Nov 26 15:10:59 UTC 2026 | 10:10  up 5 days,  1:37, 1 user, load averages: 1.46 1.71 1.85 | exit 0 | 7909e4afb0a49d500baae7a6958770d4833625ead9ae701446ade207afe56501 |
| 314-r5-message.log · tee /private/tmp/m2-r1.lW9tqKL8/r5.msg | Thu Nov 26 15:10:37 UTC 2026 / Thu Nov 26 15:10:37 UTC 2026 | 10:10  1 user, load averages: 1.58 1.72 1.86 | exit 0 | 72e44ea85058b04643bd10dd0675619636928ad98f9abe56005cdb84d7f96f19 |
| 315-r5-message-check.log · python3 /private/tmp/m2-r1.lW9tqKL8/check-message.py /private/tmp/m2-r1.lW9tqKL8/r5.msg | Thu Nov 26 15:10:37 UTC 2026 / Thu Nov 26 15:10:37 UTC 2026 | 10:10  1 user, load averages: 1.58 1.72 1.86 | exit 0 | 632f2d19fbec3b6d265f0a3ae2ee05741af317348c897321dc357cabdb8322d7 |
| 316-planned-breaks.log · sed -n 1446,1458p tui/docs/verification/phase-3b-m2-build-log.md | Thu Nov 26 15:10:51 UTC 2026 / Thu Nov 26 15:10:51 UTC 2026 | 10:10  1 user, load averages: 1.47 1.69 1.84 | exit 0 | 1d7352e574c779878bbeec1481c3c18e7adf8ebf22c0ac8d707a50695b05305d |
| 317-r5-stage.log · git -C tui add -- packages/supervisor/src/build.ts packages/adapter-claude-code/src/live.ts packages/adapter-madv-surface/src/live.ts packages/adapter-madv-surface/test/live.test.ts test/phase3a/harness-separation.test.ts test/phase3b/child-end.test.ts test/phase3b/child-end.ts test/phase3b/end-stand-in.ts test/phase3b/m2-offline.ts | Thu Nov 26 15:11:10 UTC 2026 / Thu Nov 26 15:11:10 UTC 2026 | 10:11  1 user, load averages: 1.64 1.71 1.84 | exit 0 | b1123fa2df06768141162d5bdc6a20484eb4356b795702eadbff763eadde2b67 |
| 318-r5-staged-check.log · git -C tui diff --cached --check | Thu Nov 26 15:11:10 UTC 2026 / Thu Nov 26 15:11:10 UTC 2026 | 10:11  1 user, load averages: 1.64 1.71 1.84 | exit 0 | 4edfb3795aad731c1208d8ede28d4605599cbd8a8c7dad76a9e66e0b3d3adb42 |
| 319-r5-commit.log · git -C tui commit -F /private/tmp/m2-r1.lW9tqKL8/r5.msg | Thu Nov 26 15:11:10 UTC 2026 / Thu Nov 26 15:11:10 UTC 2026 | 10:11  1 user, load averages: 1.64 1.71 1.84 | exit 0 | 87523296b676715b3b71b8bddb642954484d63f52379b8b5b3d35f95f3094c4d |
| 320-r5-head.log · git -C tui log -1 --format=%H\ %P\ %s | Thu Nov 26 15:11:10 UTC 2026 / Thu Nov 26 15:11:10 UTC 2026 | 10:11  1 user, load averages: 1.64 1.71 1.84 | exit 0 | 2ebdb50d6fd532ae886c23c0955b3048e493e008cc5b241dbac086b552c973e2 |
| 321-child-map-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make packages/supervisor/src/build.ts cause\ ===\ \"child_exited\"\ \?\ \"child_failure\" cause\ ===\ \"child_exited\"\ \?\ \"adapter_failure\" | Thu Nov 26 15:11:48 UTC 2026 / Thu Nov 26 15:11:49 UTC 2026 | 10:11  1 user, load averages: 2.31 1.85 1.89 | exit 0 | 41c10419e732eb1ed126d2f4ba9e2eec71615db5831756df1cddfb442757a992 |
| 322-child-map-runtime.log · Bun runtime identity check | Thu Nov 26 15:13:43 UTC 2026 / Thu Nov 26 15:13:43 UTC 2026 | 10:13  up 5 days,  1:41, 1 user, load averages: 1.70 1.87 1.89 | exit 0 | 952491b410f001f25dc4e80bf148b1ca18c4c9dea66a77832797e41b136c4a97 |
| 323-child-map-load.log · wait_for_load | Thu Nov 26 15:18:09 UTC 2026 / Thu Nov 26 15:19:09 UTC 2026 | 10:18  up 5 days,  1:45, 1 user, load averages: 2.09 1.86 1.87 | exit 0 | d27c95d460e4600446f2a667e810564d568be2ef01702ffa53a6c541d08a6746 |
| 324-child-map-red.log · bun test test/phase3b/child-end.test.ts | Thu Nov 26 15:19:09 UTC 2026 / Thu Nov 26 15:19:18 UTC 2026 | 10:19  up 5 days,  1:46, 1 user, load averages: 1.62 1.79 1.84 | exit 1 | 5c09ad5d398a09533893e8676a87061695cafb5a450db640d121dc47f09f8878 |
| 325-child-map-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore packages/supervisor/src/build.ts logs/324-child-map-red.log claude-code\ clean\ exit\ records\ child_failure claude-code\ nonzero\ exit\ records\ child_failure claude-code\ signalled\ exit\ records\ child_failure madv-surface\ clean\ exit\ records\ child_failure | Thu Nov 26 15:19:18 UTC 2026 / Thu Nov 26 15:19:18 UTC 2026 | 10:19  1 user, load averages: 1.73 1.81 1.84 | exit 0 | aff3dd4a362b5f865e1fb44e90449c20354f66522a140a774d35cf8543e225cf |
| 326-claude-eof-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make packages/adapter-claude-code/src/live.ts reader.complete\ \?\ \"host_exited\" reader.complete\ \?\ \"child_exited\" | Thu Nov 26 15:19:18 UTC 2026 / Thu Nov 26 15:19:18 UTC 2026 | 10:19  1 user, load averages: 1.73 1.81 1.84 | exit 0 | 002fe600e765463fd4a4e28161f1e75f4cb1fe0aa53ad2e5c4c1bc913af0cefd |
| 327-claude-eof-runtime.log · Bun runtime identity check | Thu Nov 26 15:19:20 UTC 2026 / Thu Nov 26 15:19:20 UTC 2026 | 10:19  up 5 days,  1:46, 1 user, load averages: 1.59 1.78 1.83 | exit 0 | 90a461f333543c818a4567f1c13eb1df147594e7ed7ce69c466e86ce7d889b3c |
| 328-claude-eof-load.log · wait_for_load | Thu Nov 26 15:19:22 UTC 2026 / Thu Nov 26 15:19:22 UTC 2026 | 10:19  up 5 days,  1:46, 1 user, load averages: 1.59 1.78 1.83 | exit 0 | 27fece51a8ac100b5a33110c54a841ea37fccd03502fb3ebd0d72472cbc4891e |
| 329-claude-eof-red.log · bun test test/phase3b/child-end.test.ts | Thu Nov 26 15:19:22 UTC 2026 / Thu Nov 26 15:19:31 UTC 2026 | 10:19  up 5 days,  1:46, 1 user, load averages: 1.59 1.78 1.83 | exit 1 | 14c885a40a64500d6999a83dc33b7ea7ce26e554c50c93cf78bae4e7185f0544 |
| 330-claude-eof-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore packages/adapter-claude-code/src/live.ts logs/329-claude-eof-red.log claude-code\ before\ activation\ reports\ host_exited claude-code\ host\ end\ records\ pty_host_failure | Thu Nov 26 15:19:31 UTC 2026 / Thu Nov 26 15:19:31 UTC 2026 | 10:19  1 user, load averages: 2.22 1.90 1.88 | exit 0 | 9f538b447dd44284d3d47ecd29ac812741fae8bb9b0addd1d64d4e27c9510303 |
| 331-madv-eof-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make packages/adapter-madv-surface/src/live.ts if\ \(ready\)\ stop\(\"host_exited\"\)\; if\ \(ready\)\ stop\(\"child_exited\"\)\; | Thu Nov 26 15:19:31 UTC 2026 / Thu Nov 26 15:19:31 UTC 2026 | 10:19  1 user, load averages: 2.22 1.90 1.88 | exit 0 | c81778bcde33bfd59182a32b1f43325641cc834db9a8239ad6cb1ed4eb69a470 |
| 332-madv-eof-runtime.log · Bun runtime identity check | Thu Nov 26 15:20:40 UTC 2026 / Thu Nov 26 15:20:40 UTC 2026 | 10:20  up 5 days,  1:48, 1 user, load averages: 2.95 2.17 1.97 | exit 0 | 02dc3e770e00cda4ca0b1d5465ff2e59fbda09be07f119de980ce6779814b52d |
| 333-madv-eof-load.log · wait_for_load | Thu Nov 26 15:21:08 UTC 2026 / Thu Nov 26 15:22:38 UTC 2026 | 10:21  up 5 days,  1:48, 1 user, load averages: 2.57 2.14 1.97 | exit 0 | ad64509e7d8288abb7f26559cf98ee89f910844fde01ea5d4faa4558e4382884 |
| 334-madv-eof-red.log · bun test test/phase3b/child-end.test.ts | Thu Nov 26 15:22:38 UTC 2026 / Thu Nov 26 15:22:45 UTC 2026 | 10:22  up 5 days,  1:50, 1 user, load averages: 1.52 1.94 1.91 | exit 1 | f4b28cbae38700c43baf5e988f0465704f51b933cd89785ff965d8f31b575705 |
| 335-madv-eof-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore packages/adapter-madv-surface/src/live.ts logs/334-madv-eof-red.log madv-surface\ before\ activation\ reports\ host_exited madv-surface\ host\ end\ records\ pty_host_failure | Thu Nov 26 15:22:45 UTC 2026 / Thu Nov 26 15:22:45 UTC 2026 | 10:22  1 user, load averages: 1.80 1.99 1.93 | exit 0 | 8ff8644a28c69c530ba3cf6db3c2aa786fde647d4e77415b3f882991afba50b2 |
| 336-claude-drain-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make packages/adapter-claude-code/src/live.ts !reader.complete\ \&\&\ \(fact.kind\ ===\ \"exited\"\ \&#124;\&#124;\ fact.kind\ ===\ \"drained\"\) \(!reader.complete\ \&\&\ fact.kind\ ===\ \"exited\"\)\ \&#124;\&#124;\ fact.kind\ ===\ \"drained\" | Thu Nov 26 15:22:45 UTC 2026 / Thu Nov 26 15:22:45 UTC 2026 | 10:22  1 user, load averages: 1.80 1.99 1.93 | exit 0 | 0d1b7ba78c3be3bb47fee29d7be93e25e30ee37c2f15d1940e030b56d8230008 |
| 337-claude-drain-runtime.log · Bun runtime identity check | Thu Nov 26 15:22:57 UTC 2026 / Thu Nov 26 15:22:57 UTC 2026 | 10:22  up 5 days,  1:50, 1 user, load averages: 1.75 1.97 1.92 | exit 0 | b22e12d14d655fd0d4e824a05312b57247a1ee73f85cbcd50688f77bbb987824 |
| 338-claude-drain-load.log · wait_for_load | Thu Nov 26 15:22:58 UTC 2026 / Thu Nov 26 15:22:58 UTC 2026 | 10:22  up 5 days,  1:50, 1 user, load averages: 1.75 1.97 1.92 | exit 0 | ec1d449ac4ae4900b29fc12dd06514b8761f5d04b86e46df27759f6882b4a37c |
| 339-claude-drain-red.log · bun test test/phase3b/child-end.test.ts | Thu Nov 26 15:22:58 UTC 2026 / Thu Nov 26 15:23:05 UTC 2026 | 10:22  up 5 days,  1:50, 1 user, load averages: 1.75 1.97 1.92 | exit 1 | 2fb11e72c4215c2d7ae0029979824142e61acf2705042c02c956bc72bb90cc9a |
| 340-claude-drain-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore packages/adapter-claude-code/src/live.ts logs/339-claude-drain-red.log claude-code\ drained\ alone\ leaves\ the\ monitor\ active | Thu Nov 26 15:23:05 UTC 2026 / Thu Nov 26 15:23:05 UTC 2026 | 10:23  1 user, load averages: 1.93 2.01 1.93 | exit 0 | 6de3e4d9c61d50fb62556be6eaf6233ff49b51e88cbc722027302ba9f0199893 |
| 341-madv-drain-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make packages/adapter-madv-surface/src/live.ts \ \ \ \ \ \ \ \ if\ \(fact.kind\ ===\ \"exited\"\)\ \{ \ \ \ \ \ \ \ \ if\ \(ready\ \&\&\ fact.kind\ ===\ \"drained\"\)\ stop\(\"child_exited\"\)\;$'\n'\ \ \ \ \ \ \ \ if\ \(fact.kind\ ===\ \"exited\"\)\ \{ | Thu Nov 26 15:23:05 UTC 2026 / Thu Nov 26 15:23:05 UTC 2026 | 10:23  1 user, load averages: 1.93 2.01 1.93 | exit 0 | 6351aac600818ad44e852900909d394d35b3200a1558940670e6a8b74c22d1f7 |
| 342-madv-drain-runtime.log · Bun runtime identity check | Thu Nov 26 15:23:08 UTC 2026 / Thu Nov 26 15:23:09 UTC 2026 | 10:23  up 5 days,  1:50, 1 user, load averages: 2.26 2.07 1.96 | exit 0 | a3c3a97eb8e457dfdbee229b424a3a944eba3f6890213876fdc01c044cd89414 |
| 343-madv-drain-load.log · wait_for_load | Thu Nov 26 15:23:10 UTC 2026 / Thu Nov 26 15:31:11 UTC 2026 | 10:23  up 5 days,  1:50, 1 user, load averages: 2.26 2.07 1.96 | exit 0 | 605eff12fe21fa2f43d2675a1833ca7a98a0878cda0c1c41bbea4db7f8de2f6c |
| 344-madv-drain-red.log · bun test test/phase3b/child-end.test.ts | Thu Nov 26 15:31:11 UTC 2026 / Thu Nov 26 15:31:17 UTC 2026 | 10:31  up 5 days,  1:58, 1 user, load averages: 1.69 2.34 2.18 | exit 1 | 3dbc315e54c8064b79f60a156716a7e7a64f4951ce6ab89ba0dc7135e79f625b |
| 345-madv-drain-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore packages/adapter-madv-surface/src/live.ts logs/344-madv-drain-red.log madv-surface\ drained\ alone\ leaves\ the\ monitor\ active | Thu Nov 26 15:31:17 UTC 2026 / Thu Nov 26 15:31:17 UTC 2026 | 10:31  1 user, load averages: 1.95 2.39 2.20 | exit 0 | b36dd28968829abf21237bb6f9de487d98cac2ac10bf71c891101cf2836de04d |
| 346-claude-finish-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make packages/adapter-claude-code/src/live.ts stop\(reader.finish\(\)\ \?\?\ \"child_exited\"\)\; stop\(\"child_exited\"\)\; | Thu Nov 26 15:31:17 UTC 2026 / Thu Nov 26 15:31:17 UTC 2026 | 10:31  1 user, load averages: 1.95 2.39 2.20 | exit 0 | ff24e394b4a3794e7220e866f627244b71d0f2580be78858f9a0eee86d6352a4 |
| 347-claude-finish-runtime.log · Bun runtime identity check | Thu Nov 26 15:31:26 UTC 2026 / Thu Nov 26 15:31:27 UTC 2026 | 10:31  up 5 days,  1:59, 1 user, load averages: 1.81 2.34 2.18 | exit 0 | e31e46d274d2df28d8253ef9e291769b9c861a1c81499b127205f5d93f11274c |
| 348-claude-finish-load.log · wait_for_load | Thu Nov 26 15:31:29 UTC 2026 / Thu Nov 26 15:31:29 UTC 2026 | 10:31  up 5 days,  1:59, 1 user, load averages: 1.74 2.32 2.18 | exit 0 | 57f364f0d40efd0ae2639ff517647061cd96b9a2c84a9b7f0482b2473e69a86d |
| 349-claude-finish-red.log · bun test test/phase3b/child-end.test.ts | Thu Nov 26 15:31:29 UTC 2026 / Thu Nov 26 15:31:36 UTC 2026 | 10:31  up 5 days,  1:59, 1 user, load averages: 1.74 2.32 2.18 | exit 1 | d9c95d26278f13f8627e9a9ac1bf1698c9526c15f15681bf9e40d542b2376127 |
| 350-claude-finish-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore packages/adapter-claude-code/src/live.ts logs/349-claude-finish-red.log claude-code\ malformed\ partial\ line\ records\ identity_mismatch | Thu Nov 26 15:31:36 UTC 2026 / Thu Nov 26 15:31:36 UTC 2026 | 10:31  1 user, load averages: 1.76 2.31 2.17 | exit 0 | 25da19a08fd8a1558c7a6924ca9d897547b59bc6bd8055c6e3bca0fdbd997d1a |
| 351-madv-finish-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make packages/adapter-madv-surface/src/live.ts \ \ \ \ \ \ \ \ \ \ const\ exitCode\ =\ fact.code\ \?\?\ 1\; \ \ \ \ \ \ \ \ \ \ if\ \(handedOver\)\ \{\ stop\(\"child_exited\"\)\;\ return\;\ \}$'\n'\ \ \ \ \ \ \ \ \ \ const\ exitCode\ =\ fact.code\ \?\?\ 1\; | Thu Nov 26 15:31:36 UTC 2026 / Thu Nov 26 15:31:36 UTC 2026 | 10:31  1 user, load averages: 1.76 2.31 2.17 | exit 0 | ffa6ef6a10bd65f3910812a45e99f0c3f43062056b246b66149252c15f586550 |
| 352-madv-finish-runtime.log · Bun runtime identity check | Thu Nov 26 15:33:58 UTC 2026 / Thu Nov 26 15:33:58 UTC 2026 | 10:33  up 5 days,  2:01, 1 user, load averages: 1.76 2.08 2.10 | exit 0 | 602a949efef13e79225ca1e1166208376ba6f791dddf9aeaeb3f2109397e4008 |
| 353-madv-finish-load.log · wait_for_load | Thu Nov 26 15:34:05 UTC 2026 / Thu Nov 26 15:35:05 UTC 2026 | 10:34  up 5 days,  2:01, 1 user, load averages: 2.02 2.13 2.11 | exit 0 | e8350d7f16e9e29c153323942b505635ef5f1cd60a32cfe69a059f8bd7edc357 |
| 354-madv-finish-red.log · bun test test/phase3b/child-end.test.ts | Thu Nov 26 15:35:05 UTC 2026 / Thu Nov 26 15:35:11 UTC 2026 | 10:35  up 5 days,  2:02, 1 user, load averages: 1.80 2.07 2.09 | exit 1 | 89bd47cd2e66d70a4893a8bdfadd65426e368bb4ff172508557139867f686a22 |
| 355-madv-finish-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore packages/adapter-madv-surface/src/live.ts logs/354-madv-finish-red.log madv-surface\ nonzero\ exit\ records\ adapter_failure madv-surface\ malformed\ partial\ line\ records\ identity_mismatch madv-surface\ pending\ request\ records\ identity_mismatch madv-surface\ open\ tool\ records\ identity_mismatch | Thu Nov 26 15:35:11 UTC 2026 / Thu Nov 26 15:35:11 UTC 2026 | 10:35  1 user, load averages: 1.73 2.05 2.08 | exit 0 | dab49ce2b9814f71cfbfc2ab2a84e529afba9d91a68786108a6917af959d0454 |
| 356-early-cause-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make packages/supervisor/src/build.ts const\ shared\ =\ \{U+005B}\"child_exited\",\ \"host_exited\", const\ shared\ =\ \{U+005B}\"host_exited\", | Thu Nov 26 15:35:12 UTC 2026 / Thu Nov 26 15:35:12 UTC 2026 | 10:35  1 user, load averages: 1.73 2.05 2.08 | exit 0 | f501d3778c790fce889d2a9a306087fe9c3532103525de215e6aa88301332090 |
| 357-early-cause-runtime.log · Bun runtime identity check | Thu Nov 26 15:36:18 UTC 2026 / Thu Nov 26 15:36:18 UTC 2026 | 10:36  up 5 days,  2:03, 1 user, load averages: 2.63 2.30 2.17 | exit 0 | 6335601690f921208a4bcfcf149328d3e8e0124a82f1c341175b0782135e191b |
| 358-early-cause-load.log · wait_for_load | Thu Nov 26 15:36:41 UTC 2026 / Thu Nov 26 15:38:41 UTC 2026 | 10:36  up 5 days,  2:04, 1 user, load averages: 2.24 2.22 2.15 | exit 0 | 71b5a3efd3b61cdd24223f507039ca49d53b3870e2d52664d6567a29bbabd626 |
| 359-early-cause-red.log · bun test test/phase3b/child-end.test.ts | Thu Nov 26 15:38:41 UTC 2026 / Thu Nov 26 15:38:47 UTC 2026 | 10:38  up 5 days,  2:06, 1 user, load averages: 1.91 2.27 2.19 | exit 1 | 1c36b661cde48f026cd95b03d06af456ad69e8b09fcbbcc28f1262bdefac920a |
| 360-early-cause-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore packages/supervisor/src/build.ts logs/359-early-cause-red.log claude-code\ before\ activation\ reports\ child_exited madv-surface\ before\ activation\ reports\ child_exited | Thu Nov 26 15:38:47 UTC 2026 / Thu Nov 26 15:38:48 UTC 2026 | 10:38  1 user, load averages: 1.91 2.27 2.19 | exit 0 | 8e5513e30c9c0d0644adb198bdc0136a857323cefc768cceda9eabdb497ea4e5 |
| 361-founder-close-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make apps/madbridge/src/tui/live/composition.ts await\ state.broker!.founderClose\(crypto.randomUUID\(\)\)\; await\ state.broker!.interrupt\(\"child_failure\",\ \"synthetic\ interruption\",\ \"high\",\ crypto.randomUUID\(\),\ null,\ null\)\; | Thu Nov 26 15:38:48 UTC 2026 / Thu Nov 26 15:38:48 UTC 2026 | 10:38  1 user, load averages: 1.91 2.27 2.19 | exit 0 | 0e8675b0fad244979fc33ed5da8b0d83cf08718506cb569ca95118586b71ff49 |
| 362-founder-close-runtime.log · Bun runtime identity check | Thu Nov 26 15:40:04 UTC 2026 / Thu Nov 26 15:40:05 UTC 2026 | 10:40  up 5 days,  2:07, 1 user, load averages: 2.16 2.29 2.20 | exit 0 | 7df97a14bbda250aa7b43280d1440ba998a5a4ff0c8a7758347a81e1716bb7fd |
| 363-founder-close-load.log · wait_for_load | Thu Nov 26 15:40:07 UTC 2026 / Thu Nov 26 15:40:07 UTC 2026 | 10:40  up 5 days,  2:07, 1 user, load averages: 1.99 2.25 2.19 | exit 0 | c5db85327a2a0f2c00f76580ac030ef12efcdaf91fef3d0940b8bc406c764126 |
| 364-founder-close-red.log · bun test test/phase3b/child-end.test.ts | Thu Nov 26 15:40:07 UTC 2026 / Thu Nov 26 15:40:14 UTC 2026 | 10:40  up 5 days,  2:07, 1 user, load averages: 1.99 2.25 2.19 | exit 1 | f2175b3e0ed576452a5806acde6f7dee97f68a44266f42b70094fdaeea7d32cd |
| 365-founder-close-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore apps/madbridge/src/tui/live/composition.ts logs/364-founder-close-red.log Founder\ close\ on\ the\ active\ composition\ records\ no\ interruption | Thu Nov 26 15:40:14 UTC 2026 / Thu Nov 26 15:40:14 UTC 2026 | 10:40  1 user, load averages: 1.99 2.25 2.19 | exit 0 | e4e5f8a0a373b4c850ede4be2241d3e641ee30dc0c5813e38c09e848cd66084b |
| 366-retry-tests.log · tee tui/packages/adapter-claude-code/test/retry.test.ts | Thu Nov 26 15:40:52 UTC 2026 / Thu Nov 26 15:40:52 UTC 2026 | 10:40  1 user, load averages: 2.06 2.23 2.18 | exit 0 | 0e459fd1a3b9a7a87d10f62df851864bee3eff92a55354cc30aec0e3b87ad572 |
| 367-madv-cause-tests.log · tee tui/packages/adapter-madv-surface/test/exit-causes.test.ts | Thu Nov 26 15:40:52 UTC 2026 / Thu Nov 26 15:40:52 UTC 2026 | 10:40  1 user, load averages: 2.06 2.23 2.18 | exit 0 | 806ef973eb3537064c23b2f13b650608064f8a8e2df4a7af9ecfb87a5275e69a |
| 368-r6-import-boundary.log · python3 - | Thu Nov 26 15:41:02 UTC 2026 / Thu Nov 26 15:41:02 UTC 2026 | 10:41  1 user, load averages: 2.13 2.24 2.19 | exit 0 | 11d751bc70ed73c58a36a4961a281576e54755c5772fa41569e9362e979888e0 |
| 369-r6-runtime.log · Bun runtime identity check | Thu Nov 26 15:42:44 UTC 2026 / Thu Nov 26 15:42:45 UTC 2026 | 10:42  up 5 days,  2:10, 1 user, load averages: 1.89 2.25 2.20 | exit 0 | 00f24f70e6f64c92768b247a87b77d4fe40cbf60f78da875ad6593f7fca26359 |
| 370-load.log · wait_for_load | Thu Nov 26 15:42:47 UTC 2026 / Thu Nov 26 15:42:47 UTC 2026 | 10:42  up 5 days,  2:10, 1 user, load averages: 1.74 2.21 2.19 | exit 0 | 01278c31dbf8dbb17c67014519326c84ca869db5fb698a9d7fd1d872e86822ba |
| 371-r6-cases.log · bun test packages/adapter-claude-code/test/retry.test.ts packages/adapter-madv-surface/test/exit-causes.test.ts | Thu Nov 26 15:42:47 UTC 2026 / Thu Nov 26 15:42:54 UTC 2026 | 10:42  up 5 days,  2:10, 1 user, load averages: 1.74 2.21 2.19 | exit 0 | f7393a47f760c7018f39b83449c934b48d9da2d531770643fd4db41d2354bbc6 |
| 372-r6-message.log · tee /private/tmp/m2-r1.lW9tqKL8/r6.msg | Thu Nov 26 15:43:18 UTC 2026 / Thu Nov 26 15:43:18 UTC 2026 | 10:43  1 user, load averages: 1.52 2.11 2.15 | exit 0 | 78f1f97a74914502ebff6e487dbd3e6dcb20c83c20702b04162ba6a874f4dd51 |
| 373-r6-message-check.log · python3 /private/tmp/m2-r1.lW9tqKL8/check-message.py /private/tmp/m2-r1.lW9tqKL8/r6.msg | Thu Nov 26 15:43:18 UTC 2026 / Thu Nov 26 15:43:18 UTC 2026 | 10:43  1 user, load averages: 1.52 2.11 2.15 | exit 0 | a250c0e868e812ddedfbdeea0bdf347ed8600990f8c17917d619b19ed2e894e3 |
| 374-r6-stage.log · git -C tui add -- packages/adapter-claude-code/test/retry.test.ts packages/adapter-madv-surface/test/exit-causes.test.ts | Thu Nov 26 15:43:24 UTC 2026 / Thu Nov 26 15:43:24 UTC 2026 | 10:43  1 user, load averages: 1.48 2.09 2.14 | exit 0 | aff603deedfbeb66e1baa65e27c80a6d35172fc94d01a043fcfd7f984ae41860 |
| 375-r6-staged-check.log · git -C tui diff --cached --check | Thu Nov 26 15:43:24 UTC 2026 / Thu Nov 26 15:43:24 UTC 2026 | 10:43  1 user, load averages: 1.48 2.09 2.14 | exit 0 | df2abc2b9409130aef7e72f0d3d78f27cb517be1003a1bd1f1f667bb56c9ac85 |
| 376-r6-commit.log · git -C tui commit -F /private/tmp/m2-r1.lW9tqKL8/r6.msg | Thu Nov 26 15:43:24 UTC 2026 / Thu Nov 26 15:43:24 UTC 2026 | 10:43  1 user, load averages: 1.48 2.09 2.14 | exit 0 | 5ef151fd0d836465f8eaf1ccf4763b27decb7a74fea2203f14b31ce6d66c69b1 |
| 377-r6-head.log · git -C tui log -1 --format=%H\ %P\ %s | Thu Nov 26 15:43:24 UTC 2026 / Thu Nov 26 15:43:24 UTC 2026 | 10:43  1 user, load averages: 1.48 2.09 2.14 | exit 0 | f85c58e718e296a43d97394f3f691bf9a87f46c0adcac0667abb337da3c229a7 |
| 378-retry-match-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make packages/adapter-claude-code/src/detectors.ts rules.includes\(\"system/api_retry.error:\"\ +\ event.error\) true | Thu Nov 26 15:43:52 UTC 2026 / Thu Nov 26 15:43:52 UTC 2026 | 10:43  1 user, load averages: 1.76 2.08 2.14 | exit 0 | 83e727389ba6c2dff612f9789ecc8a8366a9ea14760935c7f396c20f39d576a3 |
| 379-retry-match-runtime.log · Bun runtime identity check | Thu Nov 26 15:45:13 UTC 2026 / Thu Nov 26 15:45:13 UTC 2026 | 10:45  up 5 days,  2:12, 1 user, load averages: 1.54 1.95 2.08 | exit 0 | 96e21c7f9f4c709623c365c7d35a8108451d1e6287b63e4170b049a43bdeafae |
| 380-retry-match-load.log · wait_for_load | Thu Nov 26 15:45:14 UTC 2026 / Thu Nov 26 15:45:14 UTC 2026 | 10:45  up 5 days,  2:12, 1 user, load averages: 1.54 1.95 2.08 | exit 0 | 60b9496af1a1d8097dd8cd841e4e750a8afa46bd7d98fa40a9f84d1bfe5c05ad |
| 381-retry-match-red.log · bun test packages/adapter-claude-code/test/retry.test.ts | Thu Nov 26 15:45:14 UTC 2026 / Thu Nov 26 15:45:15 UTC 2026 | 10:45  up 5 days,  2:12, 1 user, load averages: 1.54 1.95 2.08 | exit 1 | 8894cfc11b817c3e9deaeb704b0a7cfeb74f1fd622fd20a38ff3d2f28c13985d |
| 382-retry-match-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore packages/adapter-claude-code/src/detectors.ts logs/381-retry-match-red.log an\ unregistered\ api_retry\ error\ preserves\ the\ attestation an\ unregistered\ api_retry\ error\ preserves\ the\ active\ monitor | Thu Nov 26 15:45:15 UTC 2026 / Thu Nov 26 15:45:15 UTC 2026 | 10:45  1 user, load averages: 1.54 1.95 2.08 | exit 0 | b801b5b8f50ca68af908577604d5b56036d00271ef79b99fffe63ee6e30fe526 |
| 383-exit-six-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make packages/adapter-madv-surface/src/index.ts \ \ \ \ \ \ \ \ case\ 6:\ this.fail\(\"endpoint_refused\",\ \"exit\"\)\;\ break\;$'\n' '' | Thu Nov 26 15:45:15 UTC 2026 / Thu Nov 26 15:45:15 UTC 2026 | 10:45  1 user, load averages: 1.54 1.95 2.08 | exit 0 | 4b56bd225e9fce4b0ded15312e91aa03e83db5145608510288cbd4b602698346 |
| 384-exit-six-runtime.log · Bun runtime identity check | Thu Nov 26 15:46:47 UTC 2026 / Thu Nov 26 15:46:48 UTC 2026 | 10:46  up 5 days,  2:14, 1 user, load averages: 1.63 1.83 2.01 | exit 0 | 128323f442742c521722a0d1c35b90911f785f41b95bfb42b6604e33fcad0803 |
| 385-exit-six-load.log · wait_for_load | Thu Nov 26 15:46:49 UTC 2026 / Thu Nov 26 15:46:49 UTC 2026 | 10:46  up 5 days,  2:14, 1 user, load averages: 1.63 1.83 2.01 | exit 0 | ba076f5911d6af856dbdd7f6bce7602b684bb35083efbc580bd2ab909864b7e7 |
| 386-exit-six-red.log · bun test packages/adapter-madv-surface/test/exit-causes.test.ts | Thu Nov 26 15:46:49 UTC 2026 / Thu Nov 26 15:46:55 UTC 2026 | 10:46  up 5 days,  2:14, 1 user, load averages: 1.63 1.83 2.01 | exit 1 | 54a0b4e23d27b209efaba9546a4b44034a70433cea90b4cdef2f051526ccb14c |
| 387-exit-six-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore packages/adapter-madv-surface/src/index.ts logs/386-exit-six-red.log madv\ code\ 6\ gives\ endpoint_refused\ before\ activation madv\ code\ 6\ gives\ endpoint_refused\ after\ activation | Thu Nov 26 15:46:56 UTC 2026 / Thu Nov 26 15:46:56 UTC 2026 | 10:46  1 user, load averages: 1.82 1.86 2.03 | exit 0 | 9bb3bee0621d77d2f17c746f450ba8126915591572dbb62f36373a8d5ecb77a3 |
| 388-exit-dispatch-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make packages/adapter-madv-surface/src/live.ts \ \ \ \ \ \ \ \ \ \ const\ handedOver\ =\ ready\; \ \ \ \ \ \ \ \ \ \ stop\(\"attestation_cancelled\"\)\;\ return\;$'\n'\ \ \ \ \ \ \ \ \ \ const\ handedOver\ =\ ready\; | Thu Nov 26 15:46:56 UTC 2026 / Thu Nov 26 15:46:56 UTC 2026 | 10:46  1 user, load averages: 1.82 1.86 2.03 | exit 0 | 7137f0ba1c2f25dd8284c27e5db8f248ad2845b6d016a116a688ce61563d9452 |
| 389-exit-dispatch-runtime.log · Bun runtime identity check | Thu Nov 26 15:46:57 UTC 2026 / Thu Nov 26 15:46:58 UTC 2026 | 10:46  up 5 days,  2:14, 1 user, load averages: 1.91 1.88 2.03 | exit 0 | 3792b53a1e6932754287b5d7eb74d46ef2e6e5b3cbfa00ed7d5887dae711bad6 |
| 390-exit-dispatch-load.log · wait_for_load | Thu Nov 26 15:46:59 UTC 2026 / Thu Nov 26 15:46:59 UTC 2026 | 10:46  up 5 days,  2:14, 1 user, load averages: 1.91 1.88 2.03 | exit 0 | 9918f41995822b7fedaa011d5c1d76bd225bd95729255de3f64521bbcb7c1841 |
| 391-exit-dispatch-red.log · bun test packages/adapter-madv-surface/test/exit-causes.test.ts | Thu Nov 26 15:46:59 UTC 2026 / Thu Nov 26 15:47:06 UTC 2026 | 10:46  up 5 days,  2:14, 1 user, load averages: 1.91 1.88 2.03 | exit 1 | 22946e98114b4b758a266c95d8c4a3731a7f5e89c48001103665a8ac8dab8779 |
| 392-exit-dispatch-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore packages/adapter-madv-surface/src/live.ts logs/391-exit-dispatch-red.log madv\ code\ 0\ gives\ identity_unavailable\ before\ activation madv\ code\ 0\ gives\ child_exited\ after\ activation madv\ code\ 1\ gives\ provider_error\ before\ activation madv\ code\ 1\ gives\ provider_error\ after\ activation madv\ code\ 3\ gives\ identity_unavailable\ before\ activation madv\ code\ 3\ gives\ identity_unavailable\ after\ activation madv\ code\ 4\ gives\ identity_mismatch\ before\ activation madv\ code\ 4\ gives\ identity_mismatch\ after\ activation madv\ code\ 5\ gives\ auth_failed\ before\ activation madv\ code\ 5\ gives\ auth_failed\ after\ activation madv\ code\ 6\ gives\ endpoint_refused\ before\ activation madv\ code\ 6\ gives\ endpoint_refused\ after\ activation madv\ code\ 7\ gives\ model_refused\ before\ activation madv\ code\ 7\ gives\ model_refused\ after\ activation madv\ code\ 42\ gives\ provider_error\ before\ activation madv\ code\ 42\ gives\ provider_error\ after\ activation madv\ signal\ gives\ provider_error\ before\ activation madv\ signal\ gives\ provider_error\ after\ activation | Thu Nov 26 15:47:06 UTC 2026 / Thu Nov 26 15:47:06 UTC 2026 | 10:47  1 user, load averages: 2.00 1.90 2.04 | exit 0 | a6eed0242f3416587c3c855d72ebdaa1a308b24e1fb3eb3659022d9d10c11d36 |
| 393-frame-test.log · cat tui/test/phase3b/absence.test.tsx | Thu Nov 26 15:47:21 UTC 2026 / Thu Nov 26 15:47:21 UTC 2026 | 10:47  1 user, load averages: 2.27 1.97 2.06 | exit 0 | 20292b8811686f68e1315c444a3af688536ead54a2dfa343d8aecbad9e2964e5 |
| 394-evidence-conventions.log · cat tui/scripts/phase3b/healthy-starts.ts tui/scripts/phase3b/failures.ts tui/scripts/phase3b/transcript.ts | Thu Nov 26 15:47:21 UTC 2026 / Thu Nov 26 15:47:21 UTC 2026 | 10:47  1 user, load averages: 2.27 1.97 2.06 | exit 0 | b0b4804ae83a0e9d14393b173ed158c8bc90e5be35be1f3db12577e367ab7291 |
| 395-snapshot-frame.log · sed -n 96,160p\;228,250p tui/packages/broker/src/client.ts | Thu Nov 26 15:47:21 UTC 2026 / Thu Nov 26 15:47:21 UTC 2026 | 10:47  1 user, load averages: 2.27 1.97 2.06 | exit 0 | 855b002d85616ae76ab716e1d0014aab3b0144ea6402f7cf2b977d1177a18be7 |
| 396-render-ports.log · rg -n catalogLoader\&#124;governance\&#124;StatusBar\&#124;sessionState\&#124;captureCharFrame tui/apps/madbridge/src/tui/App.tsx tui/apps/madbridge/src/tui/components/StatusBar.tsx tui/apps/madbridge/test/tui-projection.test.tsx | Thu Nov 26 15:47:21 UTC 2026 / Thu Nov 26 15:47:21 UTC 2026 | 10:47  1 user, load averages: 2.27 1.97 2.06 | exit 0 | 9ce152bc6b0d28719b89ad8e8e7b444f204d9c727cb32f8542eeca3f36c4c773 |
| 397-frame-script-keys.log · rg -n mockInput\\.\&#124;captureCharFrame\&#124;testRender tui/apps/madbridge/test/tui-writers-stage.test.tsx | Thu Nov 26 15:47:47 UTC 2026 / Thu Nov 26 15:47:47 UTC 2026 | 10:47  1 user, load averages: 2.70 2.11 2.11 | exit 0 | 9a05c7cbf8d7b55870630bb94d304488a84ebcd1e4c597512a1d9175256f12ae |
| 398-frame-replay.log · cat tui/apps/madbridge/src/tui/hooks/useBrokerState.ts tui/apps/madbridge/src/tui/live/subscribe.ts | Thu Nov 26 15:47:47 UTC 2026 / Thu Nov 26 15:47:47 UTC 2026 | 10:47  1 user, load averages: 2.70 2.11 2.11 | exit 0 | 703a51114fc1f60fedca84b985dc708e3c7600b6c3c6785cddf49ec3b345e516 |
| 399-founder-stream.log · sed -n 244,270p\;286,308p\;386,407p tui/packages/broker/src/in-process-client.ts | Thu Nov 26 15:47:47 UTC 2026 / Thu Nov 26 15:47:47 UTC 2026 | 10:47  1 user, load averages: 2.70 2.11 2.11 | exit 0 | 4971def056ca959d407f3a5a08beb049efad9448701471eb5c1319974c12df0b |
| 400-frame-sources.log · rg -n -C 2 loadLayout\&#124;layoutPersistence\&#124;useState\\\(\&#124;useUIState\\\( tui/apps/madbridge/src/tui/App.tsx | Thu Nov 26 15:47:47 UTC 2026 / Thu Nov 26 15:47:47 UTC 2026 | 10:47  1 user, load averages: 2.70 2.11 2.11 | exit 1 | 79ab0bef09dd6e1d5583c2d8b0d80a16194c5a257a1173934152868da3fbb4ff |
| 401-frame-focus-keys.log · sed -n 141,169p tui/apps/madbridge/test/tui-writers-stage.test.tsx | Thu Nov 26 15:47:53 UTC 2026 / Thu Nov 26 15:47:53 UTC 2026 | 10:47  1 user, load averages: 2.65 2.11 2.10 | exit 0 | 6e82ea8a1783db076fe2ecc422a29a6372403da07c5a2f8a8de604f5232c6fb7 |
| 402-recorded-frames-script.log · tee tui/scripts/phase3b/recorded-frames.tsx | Thu Nov 26 15:48:39 UTC 2026 / Thu Nov 26 15:48:39 UTC 2026 | 10:48  1 user, load averages: 2.08 2.03 2.07 | exit 0 | 38c88e0d4ce10f73e72f9686dbc742fb4b482790cb18b94c051c97d718d56a1a |
| 403-end-evidence-script.log · tee tui/scripts/phase3b/child-ends.ts | Thu Nov 26 15:48:39 UTC 2026 / Thu Nov 26 15:48:39 UTC 2026 | 10:48  1 user, load averages: 2.08 2.03 2.07 | exit 0 | 1daa0b14f93192e5535be3e8b821e159761b4f8ff78915845ee189d37e1d2892 |
| 404-frames-test.log · tee tui/test/phase3b/recorded-frames.test.tsx | Thu Nov 26 15:48:39 UTC 2026 / Thu Nov 26 15:48:39 UTC 2026 | 10:48  1 user, load averages: 2.08 2.03 2.07 | exit 0 | f57400d884c013741d51987bdcc6b200d0cda14f82c615acb328072591341149 |
| 405-r7-runtime.log · Bun runtime identity check | Thu Nov 26 15:56:24 UTC 2026 / Thu Nov 26 15:56:24 UTC 2026 | 10:56  up 5 days,  2:23, 1 user, load averages: 1.46 1.73 1.91 | exit 0 | a70d7dc282d100814714693ecc2e4e22cfcbee580e21c2e823a6d3583a8831ee |
| 406-load.log · wait_for_load | Thu Nov 26 15:56:25 UTC 2026 / Thu Nov 26 15:56:25 UTC 2026 | 10:56  up 5 days,  2:24, 1 user, load averages: 1.46 1.73 1.91 | exit 0 | 9fae1dbafad8e42157b5237076d1f77ac53601eb8b7798bab109685e26891ba9 |
| 407-frames-test.log · bun test test/phase3b/recorded-frames.test.tsx | Thu Nov 26 15:56:25 UTC 2026 / Thu Nov 26 15:56:26 UTC 2026 | 10:56  up 5 days,  2:24, 1 user, load averages: 1.46 1.73 1.91 | exit 1 | a54c604faa51d673fe2a2ffe7581d8f248a825545f50b9204b27ca7dc721d139 |
| 408-frame-fault.log · python3 - | Thu Nov 26 15:56:36 UTC 2026 / Thu Nov 26 15:56:36 UTC 2026 | 10:56  1 user, load averages: 1.23 1.67 1.89 | exit 0 | 20da54f17483f3b3369cda83617f0421f5ce59125e059809bafbbf314f6b2b06 |
| 409-frame-act.log · python3 - | Thu Nov 26 15:56:45 UTC 2026 / Thu Nov 26 15:56:45 UTC 2026 | 10:56  1 user, load averages: 1.28 1.66 1.88 | exit 0 | f997878c59647980087d8627edf72fded8da4c236d5311f6c87e0edb5db15357 |
| 410-load.log · wait_for_load | Thu Nov 26 16:07:34 UTC 2026 / Thu Nov 26 16:07:34 UTC 2026 | 11:07  up 5 days,  2:35, 1 user, load averages: 1.68 1.76 1.87 | exit 0 | 9192f44d347156970ffa2170db6e84d5796c28c71ebfb01c468e6def1223f376 |
| 411-frames-rendered.log · bun test test/phase3b/recorded-frames.test.tsx | Thu Nov 26 16:07:34 UTC 2026 / Thu Nov 26 16:07:35 UTC 2026 | 11:07  up 5 days,  2:35, 1 user, load averages: 1.68 1.76 1.87 | exit 0 | 03ecd8a0f3765b06aac70f55a9f86c670c11dd64bb7da4f9b244e66c2e951ea9 |
| 412-recording-closure.log · python3 - | Thu Nov 26 16:08:14 UTC 2026 / Thu Nov 26 16:08:15 UTC 2026 | 11:08  1 user, load averages: 2.46 1.95 1.94 | exit 0 | 0315ca4d09368782bf97b4b1ede2776cf65e7b6f2b804fb2afec834a7b0b062b |
| 413-record-frames-runtime.log · Bun runtime identity check | Thu Nov 26 16:09:04 UTC 2026 / Thu Nov 26 16:09:04 UTC 2026 | 11:09  up 5 days,  2:36, 1 user, load averages: 2.37 2.01 1.96 | exit 0 | a991d1158349d0ca15ddd0a05a870f65af4f2dc21c95535be8c9d480e1dc5a2e |
| 414-record-frames-load.log · wait_for_load | Thu Nov 26 16:09:23 UTC 2026 / Thu Nov 26 16:10:23 UTC 2026 | 11:09  up 5 days,  2:36, 1 user, load averages: 2.75 2.12 2.00 | exit 0 | 43e0f4b1564e109b943087662c4ea6ea95692b2b97164e5302171d5a3e53bbbf |
| 415-record-frames.log · bun scripts/phase3b/recorded-frames.tsx /Users/michaeldaley/builds/m2-r1/evidence | Thu Nov 26 16:10:23 UTC 2026 / Thu Nov 26 16:10:24 UTC 2026 | 11:10  up 5 days,  2:37, 1 user, load averages: 1.92 2.00 1.96 | exit 0 | fc517f03fd3847821f6c4d10ea7d8538814cf2c3111a0c808c609902e9b617bc |
| 416-record-ends-runtime.log · Bun runtime identity check | Thu Nov 26 16:10:26 UTC 2026 / Thu Nov 26 16:10:26 UTC 2026 | 11:10  up 5 days,  2:38, 1 user, load averages: 1.93 2.00 1.96 | exit 0 | ffc62473c411a76916929a0aacfa680d53b0570ce7053624ef50cb397a737f9a |
| 417-record-ends-load.log · wait_for_load | Thu Nov 26 16:10:28 UTC 2026 / Thu Nov 26 16:10:28 UTC 2026 | 11:10  up 5 days,  2:38, 1 user, load averages: 1.93 2.00 1.96 | exit 0 | f72ed1305f78abb719ef907f59bdaef8fc94ba5b129bec86ea287472e2ea5c17 |
| 418-record-ends.log · bun scripts/phase3b/child-ends.ts /Users/michaeldaley/builds/m2-r1/evidence | Thu Nov 26 16:10:28 UTC 2026 / Thu Nov 26 16:10:34 UTC 2026 | 11:10  up 5 days,  2:38, 1 user, load averages: 1.93 2.00 1.96 | exit 0 | dc71c64e2577c4c7cb2d28b94038dac22a920a899f25781fd6003212f387f510 |
| 419-evidence-inventory.log · ls evidence | Thu Nov 26 16:10:48 UTC 2026 / Thu Nov 26 16:10:48 UTC 2026 | 11:10  1 user, load averages: 1.79 1.96 1.95 | exit 0 | 755c9f77cac1958fa286e195bd5402ea203ca5351e6dcf7f7c8057ab1c39a5b2 |
| 420-client-samples.log · python3 - | Thu Nov 26 16:10:48 UTC 2026 / Thu Nov 26 16:10:48 UTC 2026 | 11:10  1 user, load averages: 1.79 1.96 1.95 | exit 0 | 064a6add24c9007d3b49e095933a9b370795ebcda02a470bae57a00b9d67539b |
| 421-frame-excerpts.log · python3 - | Thu Nov 26 16:10:48 UTC 2026 / Thu Nov 26 16:10:48 UTC 2026 | 11:10  1 user, load averages: 1.79 1.96 1.95 | exit 0 | 472162813c4a22ee0e1fbe5d3df765bb7e95868cfa8e958bf9aa3fb3b26a860b |
| 422-child-examples.log · cat evidence/claude-code-before-child_exited.txt evidence/madv-surface-active-pending-request.txt evidence/founder-close.txt | Thu Nov 26 16:10:48 UTC 2026 / Thu Nov 26 16:10:48 UTC 2026 | 11:10  1 user, load averages: 1.79 1.96 1.95 | exit 0 | f3e37809f45514a9341196abec68ba3ba2a09e264ac4c3adc758e7497e0300c0 |
| 423-evidence-manifest.log · python3 - | Thu Nov 26 16:11:19 UTC 2026 / Thu Nov 26 16:11:19 UTC 2026 | 11:11  1 user, load averages: 1.80 1.95 1.94 | exit 0 | 5dae6e5609258d70336574ab43d1e19c877fbe3c76f065356289a6523a65e595 |
| 424-check-manifest.log · python3 - | Thu Nov 26 16:11:19 UTC 2026 / Thu Nov 26 16:11:19 UTC 2026 | 11:11  1 user, load averages: 1.80 1.95 1.94 | exit 0 | be008c193c3096e75f9d83615fd6117dd359804161576a5ca36880945be017e0 |
| 425-evidence-packet.log · python3 - | Thu Nov 26 16:11:19 UTC 2026 / Thu Nov 26 16:11:20 UTC 2026 | 11:11  1 user, load averages: 1.80 1.95 1.94 | exit 0 | 11588acc7c0c6972fd9ff898c5a84c18abebb75274fe04604ae39e72177a67a9 |
| 426-load.log · wait_for_load | Thu Nov 26 16:11:33 UTC 2026 / Thu Nov 26 16:11:33 UTC 2026 | 11:11  up 5 days,  2:39, 1 user, load averages: 1.55 1.88 1.92 | exit 0 | 0438e59ac57ea86a3a0f1e80c0b9285e0c372c476856dd9b9568620987e70fba |
| 427-frames-final.log · bun test test/phase3b/recorded-frames.test.tsx | Thu Nov 26 16:11:33 UTC 2026 / Thu Nov 26 16:11:34 UTC 2026 | 11:11  up 5 days,  2:39, 1 user, load averages: 1.55 1.88 1.92 | exit 0 | ac85959e1922e2978757bf3a9c3b150b12d19bc5cf36bd90da01cec355586da8 |
| 428-activation-mapping.log · rg -n sessionState\&#124;phase\ = tui/apps/madbridge/src/tui/live/projection.ts | Thu Nov 26 16:11:58 UTC 2026 / Thu Nov 26 16:11:58 UTC 2026 | 11:11  1 user, load averages: 1.92 1.94 1.94 | exit 0 | e72b2db6b34acbfd0eda0de51eebb710ec663fee3d100eb9557291f3711bfdd4 |
| 429-r7-message.log · tee /private/tmp/m2-r1.lW9tqKL8/r7.msg | Thu Nov 26 16:11:58 UTC 2026 / Thu Nov 26 16:11:58 UTC 2026 | 11:11  1 user, load averages: 1.92 1.94 1.94 | exit 0 | 05517e4fac98ff30fc99d0328e8612e97693fe4fb002725bcd30c2a48b19820a |
| 430-r7-message-check.log · python3 /private/tmp/m2-r1.lW9tqKL8/check-message.py /private/tmp/m2-r1.lW9tqKL8/r7.msg | Thu Nov 26 16:11:58 UTC 2026 / Thu Nov 26 16:11:58 UTC 2026 | 11:11  1 user, load averages: 1.92 1.94 1.94 | exit 0 | f806c420a9a0d0084c59a4f95e851fff4952f0a53742e61aaf6d38c114b85079 |
| 431-r7-stage.log · git -C tui add -- scripts/phase3b/recorded-frames.tsx scripts/phase3b/child-ends.ts test/phase3b/recorded-frames.test.tsx docs/verification/phase-3b-m2-evidence.md | Thu Nov 26 16:12:05 UTC 2026 / Thu Nov 26 16:12:05 UTC 2026 | 11:12  1 user, load averages: 1.77 1.91 1.92 | exit 0 | 81439e121a096cb32283651a15c10970c0363dd62b8e413035f6456435b3d0aa |
| 432-r7-staged-check.log · git -C tui diff --cached --check | Thu Nov 26 16:12:05 UTC 2026 / Thu Nov 26 16:12:05 UTC 2026 | 11:12  1 user, load averages: 1.77 1.91 1.92 | exit 0 | 8a90ba34ba9368f5957064d8d51ab5c8c8c9cd65255108027bdd14398f21c666 |
| 433-r7-commit.log · git -C tui commit -F /private/tmp/m2-r1.lW9tqKL8/r7.msg | Thu Nov 26 16:12:05 UTC 2026 / Thu Nov 26 16:12:05 UTC 2026 | 11:12  1 user, load averages: 1.77 1.91 1.92 | exit 0 | 8995c81b165bc32170f40aff7ad9ed4d5e5a91e07e522ce861779d4190f9426a |
| 434-r7-head.log · git -C tui log -1 --format=%H\ %P\ %s | Thu Nov 26 16:12:05 UTC 2026 / Thu Nov 26 16:12:05 UTC 2026 | 11:12  1 user, load averages: 1.77 1.91 1.92 | exit 0 | 6fa6ba297c6006148963d45dba3f76b84322ff556fb492646bd938b6ed40aaf4 |
| 435-frame-break-diff.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py make apps/madbridge/src/tui/live/projection.ts sessionState:\ snapshot.phase, sessionState:\ snapshot.phase\ ===\ \"active\"\ \?\ \"paused\"\ :\ snapshot.phase, | Thu Nov 26 16:12:05 UTC 2026 / Thu Nov 26 16:12:05 UTC 2026 | 11:12  1 user, load averages: 1.87 1.93 1.93 | exit 0 | 23f30cf5fba8fee957bb01f5e26e30bbdbd2709e6535f5e9deeb4940b82470e0 |
| 436-frame-break-runtime.log · Bun runtime identity check | Thu Nov 26 16:20:15 UTC 2026 / Thu Nov 26 16:20:15 UTC 2026 | 11:20  up 5 days,  2:47, 1 user, load averages: 1.27 1.89 1.97 | exit 0 | 3084f47926e39c983d6e2641359ce70fcd97e000b6b26c133961493e5dd845a9 |
| 437-frame-break-load.log · wait_for_load | Thu Nov 26 16:20:25 UTC 2026 / Thu Nov 26 16:20:25 UTC 2026 | 11:20  up 5 days,  2:48, 1 user, load averages: 1.31 1.88 1.97 | exit 0 | 5c5bc5bb8ca00d1ecb1cf0f1bbb23fbea45466e3498f3ae3bef3f702049d6a2e |
| 438-frame-break-red.log · bun test test/phase3b/recorded-frames.test.tsx | Thu Nov 26 16:20:25 UTC 2026 / Thu Nov 26 16:20:27 UTC 2026 | 11:20  up 5 days,  2:48, 1 user, load averages: 1.31 1.88 1.97 | exit 1 | 438d00d7cf7fcf3dc93eb592026871f7ec033c427e0ed01f7687ce7c0d520775 |
| 439-frame-break-restore.log · python3 /private/tmp/m2-r1.lW9tqKL8/break.py restore apps/madbridge/src/tui/live/projection.ts logs/438-frame-break-red.log the\ healthy\ offline\ client\'s\ recorded\ stream\ renders\ activation\ through\ Founder\ close | Thu Nov 26 16:20:27 UTC 2026 / Thu Nov 26 16:20:27 UTC 2026 | 11:20  1 user, load averages: 1.60 1.93 1.98 | exit 0 | aabd1f2d9c529384e1e3077c8c3dd30cf74725190e39b306b4a15a97dcec5c62 |
| 440-full-prereq.log · cat logs/081-baseline-worktree.log /private/tmp/m2-r1.lW9tqKL8/list-tests.py | Thu Nov 26 16:20:33 UTC 2026 / Thu Nov 26 16:20:33 UTC 2026 | 11:20  1 user, load averages: 1.47 1.90 1.97 | exit 0 | b14bd1f062109a69e88f00cb5dc0a3388f8e022fed970a126d2a8e25fc2e3dfb |
| 441-install-original.log · shasum -a 256 tui/bun.lock | Thu Nov 26 16:20:33 UTC 2026 / Thu Nov 26 16:20:33 UTC 2026 | 11:20  1 user, load averages: 1.47 1.90 1.97 | exit 0 | bed91f14eb5c49215dc8860b1564de91a4735fc5893dee7c4c3414912a8d7c6c |
| 442-full-start.log · git -C tui status -sb | Thu Nov 26 16:20:33 UTC 2026 / Thu Nov 26 16:20:33 UTC 2026 | 11:20  1 user, load averages: 1.47 1.90 1.97 | exit 0 | 24f2e9d25267ed201436e3d4e4c47dd14834b1bea3fe853fe61f8ce553ae93e8 |
| 443-full-runtime.log · Bun runtime identity check | Thu Nov 26 16:22:53 UTC 2026 / Thu Nov 26 16:22:53 UTC 2026 | 11:22  up 5 days,  2:50, 1 user, load averages: 2.69 2.77 2.36 | exit 0 | 9cbb3c3706da9c6fb9567e7511c73ec067c86a76f6089cdb3b0c43c1de2058ac |
| 444-full-install.log · bun install --frozen-lockfile | Thu Nov 26 16:22:54 UTC 2026 / Thu Nov 26 16:22:55 UTC 2026 | 11:22  up 5 days,  2:50, 1 user, load averages: 2.69 2.77 2.36 | exit 0 | 4414639034c86c6de20d2018d8b41778e8130a67a48b4f22ed5d7438678077db |
| 445-install-check.log · git -C tui status --porcelain | Thu Nov 26 16:22:55 UTC 2026 / Thu Nov 26 16:22:55 UTC 2026 | 11:22  1 user, load averages: 2.69 2.77 2.36 | exit 0 | a3c380b9d7d2bc9cf79feb32e2a77b2a3290f7b755fadf2ca047a67ff9c9ff70 |
| 446-types-load.log · wait_for_load | Thu Nov 26 16:22:56 UTC 2026 / Thu Nov 26 16:25:26 UTC 2026 | 11:22  up 5 days,  2:50, 1 user, load averages: 2.69 2.77 2.36 | exit 0 | a8d31358cdfec33f940f4b696a4801bd9df31328fb64f541925ab2695531b31a |
| 447-full-types.log · bunx tsc --noEmit | Thu Nov 26 16:25:26 UTC 2026 / Thu Nov 26 16:25:29 UTC 2026 | 11:25  up 5 days,  2:53, 1 user, load averages: 1.41 2.32 2.24 | exit 2 | 51ac4af7dc1c0cb763b6a0616ab2f67fcc67b292126372742ff481e567fe351f |
| 448-self-fix-eligibility.log · python3 - | Thu Nov 26 16:25:43 UTC 2026 / Thu Nov 26 16:25:43 UTC 2026 | 11:25  1 user, load averages: 1.45 2.28 2.23 | exit 0 | 547603d141a1ffa443953a16fbc610b2a27318ecd4577bd674458855ebdd4ac8 |
| 449-narrow-first-projection.log · python3 - | Thu Nov 26 16:25:43 UTC 2026 / Thu Nov 26 16:25:43 UTC 2026 | 11:25  1 user, load averages: 1.45 2.28 2.23 | exit 0 | eddbeb1f869cb4db08571a65c424e1af564fbc5137955b08067d625c48922341 |
| 450-self-fix-message.log · tee /private/tmp/m2-r1.lW9tqKL8/r4-type-fix.msg | Thu Nov 26 16:25:43 UTC 2026 / Thu Nov 26 16:25:43 UTC 2026 | 11:25  1 user, load averages: 1.45 2.28 2.23 | exit 0 | bfd518051662a99f969cc75bb9a01b4b935f1cc0056248b8e35821012c92fbb3 |
| 451-self-fix-message-check.log · python3 /private/tmp/m2-r1.lW9tqKL8/check-message.py /private/tmp/m2-r1.lW9tqKL8/r4-type-fix.msg | Thu Nov 26 16:25:43 UTC 2026 / Thu Nov 26 16:25:43 UTC 2026 | 11:25  1 user, load averages: 1.45 2.28 2.23 | exit 0 | f150a898c09aa83a1d727d778d1d4571aa9143c6cde8734bb831729d10c07742 |
| 452-self-fix-stage.log · git -C tui add -- test/phase3b/subscribe.test.ts | Thu Nov 26 16:25:50 UTC 2026 / Thu Nov 26 16:25:50 UTC 2026 | 11:25  1 user, load averages: 1.41 2.25 2.22 | exit 0 | d0f1d6b1c8afc2d723301593f4a15f9a72a4c8c50bcdc3d0f1102806ba58fe38 |
| 453-self-fix-check.log · git -C tui diff --cached --check | Thu Nov 26 16:25:50 UTC 2026 / Thu Nov 26 16:25:50 UTC 2026 | 11:25  1 user, load averages: 1.41 2.25 2.22 | exit 0 | b992f667398735c284d9d0fb7794b52dd07b00b6cdfa4c9805b5d737e152f3be |
| 454-self-fix-commit.log · git -C tui commit -F /private/tmp/m2-r1.lW9tqKL8/r4-type-fix.msg | Thu Nov 26 16:25:50 UTC 2026 / Thu Nov 26 16:25:50 UTC 2026 | 11:25  1 user, load averages: 1.41 2.25 2.22 | exit 0 | a08433275c46df279aca65f9f54054868d392bb7670934cf459d9f8615168206 |
| 455-self-fix-head.log · git -C tui log -1 --format=%H\ %P\ %s | Thu Nov 26 16:25:50 UTC 2026 / Thu Nov 26 16:25:50 UTC 2026 | 11:25  1 user, load averages: 1.41 2.25 2.22 | exit 0 | 383751a040a9ac2342eb8ae2617f0abae899123afad6eec7a8f59328f5f9e3a9 |
| 456-restart-lock.log · shasum -a 256 tui/bun.lock | Thu Nov 26 16:25:50 UTC 2026 / Thu Nov 26 16:25:50 UTC 2026 | 11:25  1 user, load averages: 1.41 2.25 2.22 | exit 0 | d6d790ad8c4d82341734fae16503b2c6bc86a7ef7b5dbc9f3a1d7922bfbae977 |
| 457-restart-runtime.log · Bun runtime identity check | Thu Nov 26 16:27:50 UTC 2026 / Thu Nov 26 16:27:51 UTC 2026 | 11:27  up 5 days,  2:55, 1 user, load averages: 1.61 2.09 2.16 | exit 0 | 398a138ed1ea7baf34d62e2b5da69f114322f3fb04d54659a5e4279d752a5b35 |
| 458-restart-install.log · bun install --frozen-lockfile | Thu Nov 26 16:29:35 UTC 2026 / Thu Nov 26 16:29:35 UTC 2026 | 11:29  up 5 days,  2:57, 1 user, load averages: 1.34 1.84 2.05 | exit 0 | fbae0a5dd681fbbafd0683cc7230f5761344ec128fefe76f261a9b815e418f11 |
| 459-restart-lock-check.log · git -C tui status --porcelain | Thu Nov 26 16:29:35 UTC 2026 / Thu Nov 26 16:29:35 UTC 2026 | 11:29  1 user, load averages: 1.34 1.84 2.05 | exit 0 | 1ce033a19b613dbb22762f688c2fe45b52f0587c09162d2623b1a37c83432b9b |
| 460-restart-types-load.log · wait_for_load | Thu Nov 26 16:29:37 UTC 2026 / Thu Nov 26 16:29:37 UTC 2026 | 11:29  up 5 days,  2:57, 1 user, load averages: 1.34 1.84 2.05 | exit 0 | 806b9ce7447accb8d6af1fdfd468a86453ed6f0e5bbf544fc6de46292d6fc4a2 |
| 461-restart-types.log · bunx tsc --noEmit | Thu Nov 26 16:29:37 UTC 2026 / Thu Nov 26 16:29:41 UTC 2026 | 11:29  up 5 days,  2:57, 1 user, load averages: 1.34 1.84 2.05 | exit 0 | c26d4acab34c75be09672780e6ff44438eb8d12d7e8a89b061e3322414630ece |
| 462-suite-runtime.log · Bun runtime identity check | Thu Nov 26 16:29:42 UTC 2026 / Thu Nov 26 16:29:42 UTC 2026 | 11:29  up 5 days,  2:57, 1 user, load averages: 1.31 1.82 2.04 | exit 0 | ece95570594630a17eaacfe87f6adf1128f4150e3d2050c29a795c11d1e394aa |
| 463-full-suite-load.log · wait_for_load | Thu Nov 26 16:29:44 UTC 2026 / Thu Nov 26 16:29:44 UTC 2026 | 11:29  up 5 days,  2:57, 1 user, load averages: 1.45 1.84 2.05 | exit 0 | 9e05d9a7f817e51d27c96f813e2e402340c2b0745e4164d2f0f0387ed6955a43 |
| 464-full-suite.log · bun test | Thu Nov 26 16:29:44 UTC 2026 / Thu Nov 26 16:34:11 UTC 2026 | 11:29  up 5 days,  2:57, 1 user, load averages: 1.45 1.84 2.05 | exit 0 | 0eca6963342ac1fecba1ff7a8eea89779cd3275fad3f535c44d2d16b6b83750c |
| 465-prepare-comparison.log · tee /private/tmp/m2-r1.lW9tqKL8/compare.py | Thu Nov 26 16:32:46 UTC 2026 / Thu Nov 26 16:32:46 UTC 2026 | 11:32  1 user, load averages: 1.64 1.73 1.96 | exit 0 | f1533ffa69eb65876bf8897f76396449cf9bd3b3f67784da33cf0d5a0e964f93 |
| 466-review-receipts.log · python3 - | Thu Nov 26 16:32:46 UTC 2026 / Thu Nov 26 16:32:46 UTC 2026 | 11:32  1 user, load averages: 1.64 1.73 1.96 | exit 0 | 9fe4edd68250f4a6cc443cd7ce44ea82a807603238fedc68e6986f7743c7213b |
| 467-full-list.log · python3 /private/tmp/m2-r1.lW9tqKL8/list-tests.py logs/464-full-suite.log | Thu Nov 26 16:34:25 UTC 2026 / Thu Nov 26 16:34:25 UTC 2026 | 11:34  1 user, load averages: 5.98 3.00 2.41 | exit 0 | 46bb825761e8adaff97df6cc8ddf2c363069f1064af4c42e6cf42c7930822d66 |
| 468-full-compare.log · python3 /private/tmp/m2-r1.lW9tqKL8/compare.py logs/099-base-list.log logs/467-full-list.log | Thu Nov 26 16:34:25 UTC 2026 / Thu Nov 26 16:34:25 UTC 2026 | 11:34  1 user, load averages: 5.98 3.00 2.41 | exit 0 | 067a7b29f093058aed92394da13b0ed9805935425a865aa4480a4ef0dc7cd5d2 |
| 469-previous-importer-command.log · python3 - | Thu Nov 26 16:34:25 UTC 2026 / Thu Nov 26 16:34:25 UTC 2026 | 11:34  1 user, load averages: 5.98 3.00 2.41 | exit 0 | aa4d96ad9711cd4dd60e5099c43192d1ff57f8b7090a23b4506bd6da4bbc256d |
| 470-full-diff-check.log · env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff --check c383353885abb526a5471ef764be3cffc558a6ff HEAD | Thu Nov 26 16:34:40 UTC 2026 / Thu Nov 26 16:34:40 UTC 2026 | 11:34  1 user, load averages: 5.41 3.02 2.43 | exit 0 | 4f6ffd301ebac586337302773eb8d2f6b177a40fed389f70fc197775f057b3cd |
| 471-full-paths.log · env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff --name-only c383353885abb526a5471ef764be3cffc558a6ff HEAD | Thu Nov 26 16:34:40 UTC 2026 / Thu Nov 26 16:34:40 UTC 2026 | 11:34  1 user, load averages: 5.41 3.02 2.43 | exit 0 | 88da6f1835157ca2dde2fd87048fb9dafcb496432d9674fb74d6f11275192286 |
| 472-full-pin.log · env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff c383353885abb526a5471ef764be3cffc558a6ff HEAD -- test/phase3a/harness-separation.test.ts | Thu Nov 26 16:34:40 UTC 2026 / Thu Nov 26 16:34:40 UTC 2026 | 11:34  1 user, load averages: 5.41 3.02 2.43 | exit 0 | 1dd0467fe7fd5c300beaeb064b8f55344a07bf433a1514ce4611bafea3eed869 |
| 473-full-index.log · env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff c383353885abb526a5471ef764be3cffc558a6ff HEAD -- packages/supervisor/src/index.ts | Thu Nov 26 16:34:40 UTC 2026 / Thu Nov 26 16:34:40 UTC 2026 | 11:34  1 user, load averages: 5.41 3.02 2.43 | exit 0 | be7cda73247bb64760705ebfd8381481fc805eb180b424cb88d404b56c6a2329 |
| 474-protected-paths.log · env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff --stat c383353885abb526a5471ef764be3cffc558a6ff HEAD -- package.json bun.lock apps/madbridge/package.json apps/madbridge/src/tui/main.tsx apps/madbridge/src/fixture apps/madbridge/src/commands/start.ts apps/madbridge/src/cli.ts packages/broker packages/protocol packages/pty-host packages/supervisor/src/attestation.ts packages/supervisor/src/environment.ts packages/supervisor/src/preflight.ts packages/supervisor/test/build-rollback.test.ts apps/madbridge/src/tui/live/composition.ts apps/madbridge/src/tui/live/managed-settings.ts apps/madbridge/src/tui/live/settings-sources.ts packages/adapter-claude-code/src/adapter.ts packages/adapter-claude-code/src/attestation.ts packages/adapter-claude-code/src/detectors.ts packages/adapter-claude-code/src/index.ts packages/adapter-claude-code/src/mcp-config.ts packages/adapter-claude-code/src/shell.ts packages/adapter-madv-surface/src/detectors.ts packages/adapter-madv-surface/src/index.ts apps/madbridge/test/pty-focus.test.tsx test/phase3a/runtime-harness.ts test/phase3a/fixture-adapters.ts test/phase3b/stand-in.ts test/phase3b/scenarios.ts test/phase3b/offline.ts test/phase3b/wire-facts.ts test/phase3b/preflight-input.ts scripts/phase3b/failures.ts scripts/phase3b/healthy-starts.ts scripts/phase3b/transcript.ts packages/adapter-madv-surface/test/fixtures | Thu Nov 26 16:34:40 UTC 2026 / Thu Nov 26 16:34:40 UTC 2026 | 11:34  1 user, load averages: 5.41 3.02 2.43 | exit 0 | eb61082dc926955825ba3c08db25ae1902c4312d794192d55892dc9840ae5423 |
| 475-protected-config.log · env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff --stat c383353885abb526a5471ef764be3cffc558a6ff HEAD -- \*package.json \*tsconfig\* bun.lock | Thu Nov 26 16:34:40 UTC 2026 / Thu Nov 26 16:34:40 UTC 2026 | 11:34  1 user, load averages: 5.41 3.02 2.43 | exit 0 | 3f41caf663c39caf6e4503bc5ce39be8b0277f008e544b7fbaa6d76386d84dae |
| 476-import-baseline-script.log · sed -n 1,58p logs/077-imports-at-base.log | Thu Nov 26 16:34:40 UTC 2026 / Thu Nov 26 16:34:40 UTC 2026 | 11:34  1 user, load averages: 5.41 3.02 2.43 | exit 0 | 8ca744dbeb3126d95209e05f61b22c7153ffe552c453b6770085a1efa673a75d |
| 477-importers.log · env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 python3 - | Thu Nov 26 16:34:58 UTC 2026 / Thu Nov 26 16:34:59 UTC 2026 | 11:34  1 user, load averages: 4.41 2.95 2.41 | exit 0 | 5d494d661af1ac683bb6c558f08d596d82b36b3a2bfc979dfdd03ceaa9a25ecc |
| 478-app-callers.log · env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui grep -nE composeLiveSession\&#124;subscribeToClient\&#124;clientSnapshotToProjection HEAD -- apps/\*\*/\*.ts apps/\*\*/\*.tsx | Thu Nov 26 16:34:58 UTC 2026 / Thu Nov 26 16:34:58 UTC 2026 | 11:34  1 user, load averages: 4.41 2.95 2.41 | exit 0 | c516a37139ae1b022b4abe2868e98e9f03482b6862654527c222561717cbbaaf |
| 479-full-status.log · env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui status -sb | Thu Nov 26 16:34:58 UTC 2026 / Thu Nov 26 16:34:58 UTC 2026 | 11:34  1 user, load averages: 4.41 2.95 2.41 | exit 0 | 12eadc3ff418167d9e948a65fd687976419149cd10df1d11d3d52e2e57f35c9c |
| 480-full-untracked.log · env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui ls-files --others --exclude-standard | Thu Nov 26 16:34:58 UTC 2026 / Thu Nov 26 16:34:58 UTC 2026 | 11:34  1 user, load averages: 4.41 2.95 2.41 | exit 0 | 176de537c0166a7c1dcee48dadb7fa4ae402f1a0e78dae39d59ed8330f012f38 |
| 481-diff-existing-tests.log · env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff c383353885abb526a5471ef764be3cffc558a6ff HEAD -- apps/madbridge/test/tui-projection.test.tsx packages/adapter-madv-surface/test/live.test.ts test/phase3a/harness-separation.test.ts | Thu Nov 26 16:34:58 UTC 2026 / Thu Nov 26 16:34:58 UTC 2026 | 11:34  1 user, load averages: 4.41 2.95 2.41 | exit 0 | 3a58465a508b645b8b5cd8a6dfbbf00dbc55a63abfcb595f4efc32d5b17ed715 |
| 482-working-report-tools.log · cat tui/tsconfig.json tui/.github/scripts/attribution-shape-check.sh | Thu Nov 26 16:34:58 UTC 2026 / Thu Nov 26 16:34:58 UTC 2026 | 11:34  1 user, load averages: 4.41 2.95 2.41 | exit 0 | f27c7187b681d6705afbe8347d69afac146c1cd328e2d34a63d511dd956dbe3d |
| 483-audit-heads.log · rg -n \^\#\{1,3\}\  tui/docs/verification/phase-3b-m2-build-log.md | Thu Nov 26 16:35:18 UTC 2026 / Thu Nov 26 16:35:18 UTC 2026 | 11:35  1 user, load averages: 3.57 2.84 2.38 | exit 0 | 6e2dfb98400c76c4ced6e888a96968ef59bd2447fb970c5f9c3bf983a9907e39 |
| 484-identity-receipts.log · sed -n 1,60p tui/docs/verification/phase-3b-m2-build-log.md | Thu Nov 26 16:35:18 UTC 2026 / Thu Nov 26 16:35:18 UTC 2026 | 11:35  1 user, load averages: 3.57 2.84 2.38 | exit 0 | 963ffeb55c73381e4d76294c14c7a82fda42f1aac4521720a5620d07e4aa0080 |
| 485-report-check-mode.log · rg -n -A 28 \^\ \ prbody\\\)\&#124;\^\ \ pr\\\) tui/.github/scripts/attribution-shape-check.sh | Thu Nov 26 16:35:18 UTC 2026 / Thu Nov 26 16:35:18 UTC 2026 | 11:35  1 user, load averages: 3.57 2.84 2.38 | exit 0 | d65c5cd1c33f4958ec2df060051a7834dac3d1972a8be6a7ebf8af45a28e9c39 |
| 486-delta-by-file.log · env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff --function-context --stat c383353885abb526a5471ef764be3cffc558a6ff HEAD | Thu Nov 26 16:35:18 UTC 2026 / Thu Nov 26 16:35:18 UTC 2026 | 11:35  1 user, load averages: 3.57 2.84 2.38 | exit 0 | ae5afaba2de7d7563af9744f8244974bb626816b75cf07cbdd592287fe34a7f8 |
| 487-commit-history.log · git -C tui log --reverse --format=%H\ %P\ %s c383353885abb526a5471ef764be3cffc558a6ff..HEAD | Thu Nov 26 16:35:18 UTC 2026 / Thu Nov 26 16:35:18 UTC 2026 | 11:35  1 user, load averages: 3.57 2.84 2.38 | exit 0 | 2af5478bff7b582c256a72649de970ea90d4d43bd7e981eeb4b0adf7108dcd44 |
| 488-early-log-ledger.log · python3 - | Thu Nov 26 16:35:18 UTC 2026 / Thu Nov 26 16:35:18 UTC 2026 | 11:35  1 user, load averages: 3.57 2.84 2.38 | exit 0 | e7b61a76b9c542d6f4a83b513935a5acbcfce681810c184790760523e80d22d5 |
| 489-closure-tools.log · tee /private/tmp/m2-r1.lW9tqKL8/records.py | Thu Nov 26 16:36:05 UTC 2026 / Thu Nov 26 16:36:05 UTC 2026 | 11:36  1 user, load averages: 2.91 2.77 2.38 | exit 0 | bed9a5bcc50ef5330a759bd7043de3c65d4adf89e95a5fc4e3067a78fa95b8d2 |
| 490-log-structure.log · python3 - | Thu Nov 26 16:36:05 UTC 2026 / Thu Nov 26 16:36:05 UTC 2026 | 11:36  1 user, load averages: 2.91 2.77 2.38 | exit 0 | 5237fb983aae17c326f128cfb1b647ca5e6cb17dfa5d9c76a14524ef1a1e361c |
| 491-cli-reachability.log · env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 python3 - | Thu Nov 26 16:36:21 UTC 2026 / Thu Nov 26 16:36:21 UTC 2026 | 11:36  1 user, load averages: 2.34 2.65 2.35 | exit 0 | ab51f7c190c2bb8e8584349eec226abc764b590ff2773ee56678a44beeb1aa6a |
| 492-source-diff.log · env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff c383353885abb526a5471ef764be3cffc558a6ff HEAD -- . :\(exclude\)docs/verification/phase-3b-m2-build-log.md :\(exclude\)docs/verification/phase-3b-m2-evidence.md | Thu Nov 26 16:36:21 UTC 2026 / Thu Nov 26 16:36:21 UTC 2026 | 11:36  1 user, load averages: 2.34 2.65 2.35 | exit 0 | f33d3021851fc8ba56b2fb021c80aa36eeeaed4be29b9d12881a6f080be2ec14 |
| 493-function-catalog.log · rg -n \^\(export\ \)\?\(async\ \)\?\(function\ \&#124;class\ \&#124;const\ \{U+005B}A-Za-z_\{U+005D}+\ =\ \\\(\) tui/apps/madbridge/src/tui/live/projection.ts tui/apps/madbridge/src/tui/live/subscribe.ts tui/packages/supervisor/src/snapshot-timer.ts tui/apps/madbridge/src/tui/components/StatusBar.tsx tui/apps/madbridge/src/tui/components/agent-identity.ts | Thu Nov 26 16:36:35 UTC 2026 / Thu Nov 26 16:36:35 UTC 2026 | 11:36  1 user, load averages: 1.96 2.55 2.32 | exit 0 | 629febe653252f3ea5abe459549b52b558f144920969d4ac61ccaa873121aadf |
| 494-case-index.log · python3 - | Thu Nov 26 16:36:35 UTC 2026 / Thu Nov 26 16:36:35 UTC 2026 | 11:36  1 user, load averages: 1.96 2.55 2.32 | exit 0 | 0c66a5eb14b989d5f2f92b86a54f5909aec5773a00ba5e4f7d698cdfba301038 |
| 495-close-writer.log · tee /private/tmp/m2-r1.lW9tqKL8/closing.py | Thu Nov 26 16:37:52 UTC 2026 / Thu Nov 26 16:37:52 UTC 2026 | 11:37  1 user, load averages: 1.35 2.22 2.21 | exit 0 | 496c35124ed374cca67f0849a9526ec578014cc3a75311cf96221b20d5f51191 |
| 496-closing-message.log · tee /private/tmp/m2-r1.lW9tqKL8/closing.msg | Thu Nov 26 16:38:05 UTC 2026 / Thu Nov 26 16:38:05 UTC 2026 | 11:38  1 user, load averages: 1.95 2.31 2.24 | exit 0 | 1786928f0b1a1aa90d92db773c969cfaca96c35c51e23f059bfbe8864fef5f39 |
| 497-closing-message-check.log · python3 /private/tmp/m2-r1.lW9tqKL8/check-message.py /private/tmp/m2-r1.lW9tqKL8/closing.msg | Thu Nov 26 16:38:05 UTC 2026 / Thu Nov 26 16:38:06 UTC 2026 | 11:38  1 user, load averages: 1.95 2.31 2.24 | exit 0 | 67d17eaf8a689afdc277b5483b46bbad777981829be8db97490061f5bae03bbb |
| 498-close-log.log · python3 /private/tmp/m2-r1.lW9tqKL8/closing.py 497 | Thu Nov 26 16:38:06 UTC 2026 / Thu Nov 26 16:38:08 UTC 2026 | 11:38  1 user, load averages: 1.95 2.31 2.24 | exit 0 | 96bcf343e42f999e8e0ada3e30715838fa487d153f7d6af37ba20b33216d547d |
| 499-closing-audit.log · python3 - | Thu Nov 26 16:38:26 UTC 2026 / Thu Nov 26 16:38:26 UTC 2026 | 11:38  1 user, load averages: 2.32 2.37 2.26 | exit 0 | 63c0c5d08d0c06231fe7a234b09703f00b7c056ee3b6340e0cd728e7f5dcae4b |
| 500-closing-stage.log · git -C tui add -- docs/verification/phase-3b-m2-build-log.md | Thu Nov 26 16:38:26 UTC 2026 / Thu Nov 26 16:38:26 UTC 2026 | 11:38  1 user, load averages: 2.32 2.37 2.26 | exit 0 | 9a3cef3b75ca6e6b88a93b3893b552a32b8521f8ebbf5b2223ab6318f9da1620 |
| 501-closing-diff-check.log · git -C tui diff --cached --check | Thu Nov 26 16:38:26 UTC 2026 / Thu Nov 26 16:38:26 UTC 2026 | 11:38  1 user, load averages: 2.32 2.37 2.26 | exit 0 | a937b85949f9a721432da2d00665c3f44ce2ad86c6d1b8937dc385c1ceb320d8 |
| 502-closing-paths.log · git -C tui diff --cached --name-only | Thu Nov 26 16:38:26 UTC 2026 / Thu Nov 26 16:38:26 UTC 2026 | 11:38  1 user, load averages: 2.32 2.37 2.26 | exit 0 | b5577f54af6120b11f8e36165365f4f8674b609b907809ae1ceeb7bc2149f5b9 |
| 503-closing-commit.log · git -C tui commit -F /private/tmp/m2-r1.lW9tqKL8/closing.msg | Thu Nov 26 16:38:26 UTC 2026 / Thu Nov 26 16:38:26 UTC 2026 | 11:38  1 user, load averages: 2.32 2.37 2.26 | exit 0 | eb148048cef98af872a59d2b68c5cdddf00e3b9b16ec8bb70a638f6c3cb43957 |
| 504-closing-head.log · git -C tui log -1 --format=%H\ %P\ %s | Thu Nov 26 16:38:26 UTC 2026 / Thu Nov 26 16:38:26 UTC 2026 | 11:38  1 user, load averages: 2.32 2.37 2.26 | exit 0 | 425fa71e2688dfc06e2e9f7562b2f2552e6bf69b84909d0d9382e226463d4630 |
| 505-gate-lock.log · shasum -a 256 tui/bun.lock | Thu Nov 26 16:38:35 UTC 2026 / Thu Nov 26 16:38:35 UTC 2026 | 11:38  1 user, load averages: 2.78 2.47 2.30 | exit 0 | 93e1653b7480a2e77069ca4c62d5c11a0898232fad45948d8c5ba3be2395ca54 |
| 506-gate-runtime-load.log · wait_for_load | Thu Nov 26 16:39:02 UTC 2026 / Thu Nov 26 16:39:32 UTC 2026 | 11:39  up 5 days,  3:06, 1 user, load averages: 2.30 2.38 2.27 | exit 0 | b0f15aed3bf14934263529e80320ccaffac29ed9ee5500d41b08a17f6fc093c6 |
| 507-gate-runtime.log · Bun runtime identity check | Thu Nov 26 16:39:33 UTC 2026 / Thu Nov 26 16:39:33 UTC 2026 | 11:39  up 5 days,  3:07, 1 user, load averages: 1.80 2.26 2.23 | exit 0 | da06d955a4ecf05eb1ea40996d0fcf0499a170a224c56ce9cd77457dffddec1c |
| 508-gate-install-load.log · wait_for_load | Thu Nov 26 16:41:10 UTC 2026 / Thu Nov 26 16:42:10 UTC 2026 | 11:41  up 5 days,  3:08, 1 user, load averages: 2.39 2.21 2.20 | exit 0 | 1ceb17b82dc042d25b1e909658d93d372c4bbeff4629a3d7e78e085dfc618b6f |
| 509-gate-install.log · bun install --frozen-lockfile | Thu Nov 26 16:42:10 UTC 2026 / Thu Nov 26 16:42:10 UTC 2026 | 11:42  up 5 days,  3:09, 1 user, load averages: 1.54 2.02 2.13 | exit 0 | 052d93e4012cf61b45f994a292b6261447a133825378e797231369c980498685 |
| 510-gate-lock-check.log · git -C tui status --porcelain | Thu Nov 26 16:42:10 UTC 2026 / Thu Nov 26 16:42:10 UTC 2026 | 11:42  1 user, load averages: 1.54 2.02 2.13 | exit 0 | 0b1edadd95fa4ca70ee9da551355764f21b9886125b7144cd3d02a361c5fc236 |
| 511-gate-types-load.log · wait_for_load | Thu Nov 26 16:43:25 UTC 2026 / Thu Nov 26 16:43:25 UTC 2026 | 11:43  up 5 days,  3:11, 1 user, load averages: 0.84 1.71 2.00 | exit 0 | b8a923db49a1a300322ee7abdeb346d7c87ad336b00a352568a9cef2a7a272d8 |
| 512-gate-types.log · bunx tsc --noEmit | Thu Nov 26 16:43:25 UTC 2026 / Thu Nov 26 16:43:29 UTC 2026 | 11:43  up 5 days,  3:11, 1 user, load averages: 0.84 1.71 2.00 | exit 0 | 18496df67aae75b33fa001963d440c2f8058c54dd010dfb298b9117ef62cce97 |
| 513-gate-suite-runtime.log · Bun runtime identity check | Thu Nov 26 16:43:31 UTC 2026 / Thu Nov 26 16:43:31 UTC 2026 | 11:43  up 5 days,  3:11, 1 user, load averages: 1.01 1.73 2.01 | exit 0 | e7c4df79454407f5e9fcd0241e0b6f785b31c5c3d94230ea0e6d3aeb47fbefb1 |
| 514-gate-suite-load.log · wait_for_load | Thu Nov 26 16:53:09 UTC 2026 / Thu Nov 26 16:53:09 UTC 2026 | 11:53  up 5 days,  3:20, 1 user, load averages: 1.32 1.61 1.78 | exit 0 | 73b378b16158e058bf544ec546b7858c952391d7d9b71ae3aa8e7bff3b747b6b |
| 515-gate-suite.log · bun test | Thu Nov 26 16:53:09 UTC 2026 / Thu Nov 26 16:57:39 UTC 2026 | 11:53  up 5 days,  3:20, 1 user, load averages: 1.32 1.61 1.78 | exit 0 | 41116afdf1ff5faa85f10438b1ae5aae87b5196f046f32f673449bbd5c470131 |
| 516-delivery-writer.log · tee /private/tmp/m2-r1.lW9tqKL8/delivery.py | Thu Nov 26 16:44:34 UTC 2026 / Thu Nov 26 16:44:34 UTC 2026 | 11:44  1 user, load averages: 1.13 1.61 1.94 | exit 0 | a032308fce472a88af14e0a63815145e45f392556c517b42d8e3d5925c0c27a5 |
| 517-gate-list.log · python3 /private/tmp/m2-r1.lW9tqKL8/list-tests.py logs/515-gate-suite.log | Thu Nov 26 16:57:51 UTC 2026 / Thu Nov 26 16:57:51 UTC 2026 | 11:57  1 user, load averages: 3.38 2.63 2.22 | exit 0 | 940b015ebfd9cfc5c8fc1d870c3b2434411a6c69e81e696f1c05dc7601368424 |
| 518-gate-compare.log · python3 /private/tmp/m2-r1.lW9tqKL8/compare.py logs/099-base-list.log logs/517-gate-list.log | Thu Nov 26 16:57:51 UTC 2026 / Thu Nov 26 16:57:51 UTC 2026 | 11:57  1 user, load averages: 3.38 2.63 2.22 | exit 0 | e948c0f2edbac11361dcd2f8266c5347f0480a49cbe4fe9dcc2bdb1c715b0a41 |
| 519-gate-identity.log · python3 - | Thu Nov 26 16:57:51 UTC 2026 / Thu Nov 26 16:57:51 UTC 2026 | 11:57  1 user, load averages: 3.38 2.63 2.22 | exit 0 | 0fe44c4a2143f7cca7fe39904e4185d8f6295d604311c94b1c1e9f5fa8ed8e7b |
| 520-head-stat.log · env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff --stat c383353885abb526a5471ef764be3cffc558a6ff HEAD | Thu Nov 26 16:58:05 UTC 2026 / Thu Nov 26 16:58:05 UTC 2026 | 11:58  1 user, load averages: 2.91 2.56 2.20 | exit 0 | 22f1bcc9669aa78aca20dc8b16b563cfcd84f252ec50f9da8f895972501c3728 |
| 521-head-diff.log · env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff c383353885abb526a5471ef764be3cffc558a6ff HEAD -- . :\(exclude\)docs/verification/phase-3b-m2-build-log.md :\(exclude\)docs/verification/phase-3b-m2-evidence.md | Thu Nov 26 16:58:05 UTC 2026 / Thu Nov 26 16:58:05 UTC 2026 | 11:58  1 user, load averages: 2.91 2.56 2.20 | exit 0 | db331df6910e1a5de4fde11b03447833dc92b32e56dd0a6e41b147d4cba83927 |
| 522-all-commits.log · env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui log --reverse --format=%H\ %P\ %s c383353885abb526a5471ef764be3cffc558a6ff..HEAD | Thu Nov 26 16:58:05 UTC 2026 / Thu Nov 26 16:58:05 UTC 2026 | 11:58  1 user, load averages: 2.91 2.56 2.20 | exit 0 | 2c375e3488c47ef9c503ccfc6e10d0eb504115e4cea6d7d9db29533b4d021a04 |
| 523-verify-boundaries.log · env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 python3 - | Thu Nov 26 16:58:05 UTC 2026 / Thu Nov 26 16:58:05 UTC 2026 | 11:58  1 user, load averages: 2.91 2.56 2.20 | exit 0 | e99457c42f7a70dae71fb6f69742c6fe4d0e973544ecb0c0156f96fa9aa69b9b |
| 524-pr-draft.log · python3 /private/tmp/m2-r1.lW9tqKL8/delivery.py pr | Thu Nov 26 16:58:14 UTC 2026 / Thu Nov 26 16:58:14 UTC 2026 | 11:58  1 user, load averages: 2.78 2.54 2.20 | exit 0 | 0577960022d5aceed32b752e68b53788c35c1c15d90e69d80edacc9357bfba84 |
| 525-prbody-check.log · .github/scripts/attribution-shape-check.sh prbody | Thu Nov 26 16:58:14 UTC 2026 / Thu Nov 26 16:58:15 UTC 2026 | 11:58  1 user, load averages: 2.78 2.54 2.20 | exit 0 | 38ba437ea88d7feb8455f3ea9ef948f77e27312d1c872042281c6c783bbe6f95 |
| 526-branch-check.log · .github/scripts/attribution-shape-check.sh pr c383353885abb526a5471ef764be3cffc558a6ff 6b3a38365854ed39a4bd291be1d48d5045cd109e build/3b-m2-r1 | Thu Nov 26 16:58:15 UTC 2026 / Thu Nov 26 16:58:16 UTC 2026 | 11:58  1 user, load averages: 2.78 2.54 2.20 | exit 0 | a59317f490c2e8cb598ae7b2e27928c286a9d10210ca71c09316e15021b71c83 |
| 527-delivery-audit.log · python3 - | Thu Nov 26 16:58:33 UTC 2026 / Thu Nov 26 16:58:34 UTC 2026 | 11:58  1 user, load averages: 2.95 2.60 2.23 | exit 0 | f3f94efb10d5d25d64fdfcbea10dbfe64057170648ca6a4235adebcef3bc9907 |

13. Single next decision for the Founder

Check this builder session’s record. All deliberate breaks were performed. On acceptance, use the guarded B23 command to push this branch and open the draft pull request, then run B22 at 6b3a38365854ed39a4bd291be1d48d5045cd109e on both certification hosts.
