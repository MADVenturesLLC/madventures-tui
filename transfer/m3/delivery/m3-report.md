Phase 3B M3 · Final offline builder report · DEC-20261127-01

Closing commit 67dce10bb771092743664dbdafa873e38748b5d4. Both the corrected full run and the final B21 run passed all 2,159 tests in 178 files. The branch is ready for the Founder’s session check and outstanding break.

1. Session identity, settings and runtime

Codex, based on OpenAI GPT-6. Exact model identifier and reasoning effort were
not shown. The assigned role is builder, actor session:codex/3b-m3-r1, execution
surface codex. The agent path is /root, mode Default. The harness reports
workspace-write and restricted network. The Founder reports on-request, in-person
review and no loaded MCP servers. A separate reviewer field was not shown.
The working directory is /Users/michaeldaley/builds/m3-r1. Git identity is
daley40-lab with 293512385+daley40-lab@users.noreply.github.com.

The visible functions were wait, request_user_input, request_user_input_async,
send_message_to_user_async and exec. Nested tools included apply_patch,
exec_command, write_stdin, clock__curr_time and the six names of Addendum 2 B4
across the nested inventory, deferred namespace and collaboration. Clock showed
sleep. Collaboration also showed followup_task, interrupt_agent, list_agents,
send_message and wait_agent. No other namespace was shown.

Governed CLI output in log 001

(lines omitted)
WARNING: proceeding, even though we could not create PATH aliases: Operation not permitted (os error 1)
codex-cli 0.167.0
(lines omitted)

Runtime output from log 007, verified again in log 026

(lines omitted)
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
(lines omitted)

The six names of Addendum 2 B4 stand for the resource, local image, deferred namespace and agent tools in the original identity message. The exact names were reported there before the first command. No barred tool was called. No command input contained one of the six names or dynamically evaluated tool code. The fixed Bun revision expression was part of the prescribed runtime check.
Every full runtime check printed the prescribed paths, digest, version and revision and exited 0. All starts of Bun used the checked executable search path. The initial governed CLI warning and version are preserved verbatim in log 001.
Third resume settings. The harness showed workspace-write and restricted network. A separate approval setting was not shown. The Founder identified on-request. No barred tool was called. The prescribed fixed revision expression was used for Bun. All escalations were for one command.

007-runtime.log · SHA-256 f322ede4f380200c8c74ceb3085a8de85c6ed56240ac1b817dc1177f29010997 — Command reproduced in the cited log — 13:31  up 6 days,  4:59, 1 user, load averages: 2.48 3.21 2.99 — Fri Nov 27 18:31:39 UTC 2026 to Fri Nov 27 18:31:39 UTC 2026 — exit status 0.
026-suite-runtime.log · SHA-256 88c66db5be8d852be8bf7dd41a6aa1a0eb8eed75e830effee7d6ee5cfbf3c404 — Command reproduced in the cited log — 13:39  up 6 days,  5:07, 1 user, load averages: 2.48 2.53 2.67 — Fri Nov 27 18:39:28 UTC 2026 to Fri Nov 27 18:39:29 UTC 2026 — exit status 0.
065-r1-runtime.log · SHA-256 472dc749d3378d0b26e3dc96af7ed9ee719548be27af68946a99c146019fe938 — Command reproduced in the cited log — 13:51  up 6 days,  5:19, 1 user, load averages: 1.66 2.05 2.37 — Fri Nov 27 18:51:46 UTC 2026 to Fri Nov 27 18:51:47 UTC 2026 — exit status 0.
078-zero-runtime.log · SHA-256 91b8ec451a99b8d44fedb5fd662532b0f5d04489ab1f772261dde5833a58018a — Command reproduced in the cited log — 13:53  up 6 days,  5:21, 1 user, load averages: 1.59 1.87 2.26 — Fri Nov 27 18:53:30 UTC 2026 to Fri Nov 27 18:53:31 UTC 2026 — exit status 0.
085-zero-runtime.log · SHA-256 0d99150533c8cea8e841472380e9c55340843623be5853220ff942b68dab44dc — Command reproduced in the cited log — 13:54  up 6 days,  5:22, 1 user, load averages: 2.30 1.99 2.26 — Fri Nov 27 18:54:55 UTC 2026 to Fri Nov 27 18:54:56 UTC 2026 — exit status 0.
091-pre-runtime.log · SHA-256 cafc77525fec8b61133bfd0ef847f05172d5f0e1207663b0bed3324ff48f51f2 — Command reproduced in the cited log — 13:55  up 6 days,  5:23, 1 user, load averages: 1.65 1.87 2.20 — Fri Nov 27 18:55:47 UTC 2026 to Fri Nov 27 18:55:48 UTC 2026 — exit status 0.
097-gap-runtime.log · SHA-256 5040fa0f51a478e28ad0e26d3999f78ffd294094883dc575a82013b99772d187 — Command reproduced in the cited log — 13:57  up 6 days,  5:25, 1 user, load averages: 1.24 1.66 2.07 — Fri Nov 27 18:57:38 UTC 2026 to Fri Nov 27 18:57:39 UTC 2026 — exit status 0.
103-seam-runtime.log · SHA-256 ac2534689a0e7469e28dba45d0e2c635801853ae40a000a8bb2ea538a204c5be — Command reproduced in the cited log — 14:00  up 6 days,  5:28, 1 user, load averages: 2.35 2.21 2.24 — Fri Nov 27 19:00:47 UTC 2026 to Fri Nov 27 19:00:47 UTC 2026 — exit status 0.
122-r2-runtime.log · SHA-256 ed5a95f2ca183438049e9262231a831d986c0b01ad89c2e0be7cba037a8996b6 — Command reproduced in the cited log — 14:06  up 6 days,  5:33, 1 user, load averages: 1.42 1.62 1.95 — Fri Nov 27 19:06:20 UTC 2026 to Fri Nov 27 19:06:21 UTC 2026 — exit status 0.
137-wrong-pane-runtime.log · SHA-256 a5189f3471bf16d3e6dbde6d333d30dd77d335a259507715c4a47a2c1a1c9905 — Command reproduced in the cited log — 14:09  up 6 days,  5:37, 1 user, load averages: 2.09 2.18 2.13 — Fri Nov 27 19:09:51 UTC 2026 to Fri Nov 27 19:09:51 UTC 2026 — exit status 0.
143-order-runtime.log · SHA-256 6ec8c0e6cfa2d1a7a9d8698ee32dd8b24f7eb04d2c26c1fca5d538d48500c699 — Command reproduced in the cited log — 14:12  up 6 days,  5:39, 1 user, load averages: 2.30 2.22 2.15 — Fri Nov 27 19:12:13 UTC 2026 to Fri Nov 27 19:12:13 UTC 2026 — exit status 0.
149-line-limit-runtime.log · SHA-256 21dcd0f378629fb5a0d01b1f6d11ba01ee80bfe672254930d224ea65b512bc55 — Command reproduced in the cited log — 14:13  up 6 days,  5:41, 1 user, load averages: 2.22 2.20 2.15 — Fri Nov 27 19:13:33 UTC 2026 to Fri Nov 27 19:13:33 UTC 2026 — exit status 0.
155-newest-runtime.log · SHA-256 d762d032b0eac112424c42312e726731407af348b694121fe71dd328eacf1cfd — Command reproduced in the cited log — 14:14  up 6 days,  5:41, 1 user, load averages: 1.81 2.10 2.11 — Fri Nov 27 19:14:11 UTC 2026 to Fri Nov 27 19:14:11 UTC 2026 — exit status 0.
161-byte-limit-runtime.log · SHA-256 11c434179aae0c91c71f5df62b8c91f6bca8b4266d1f2ccb6a4b127ff140f518 — Command reproduced in the cited log — 14:14  up 6 days,  5:41, 1 user, load averages: 1.66 2.06 2.10 — Fri Nov 27 19:14:15 UTC 2026 to Fri Nov 27 19:14:15 UTC 2026 — exit status 0.
167-count-runtime.log · SHA-256 08f4bd9fd9f40f20dc490304d2135de92f9b5751445eb159355daec36c23fd1e — Command reproduced in the cited log — 14:14  up 6 days,  5:41, 1 user, load averages: 1.61 2.04 2.09 — Fri Nov 27 19:14:18 UTC 2026 to Fri Nov 27 19:14:18 UTC 2026 — exit status 0.
191-r3-runtime.log · SHA-256 a3ddf17817f2117e321c373c3303e38dc25fa4ad3b8b72e485b68f7d47f82f25 — Command reproduced in the cited log — 14:20  up 6 days,  5:48, 1 user, load averages: 2.41 2.13 2.09 — Fri Nov 27 19:20:30 UTC 2026 to Fri Nov 27 19:20:30 UTC 2026 — exit status 0.
207-before-ack-runtime.log · SHA-256 c24c5ab396297a9111784a5af19ad74a8bf1bbb67c876bf9701f0d5e8cd6c3a3 — Command reproduced in the cited log — 15:08  up 6 days,  6:36, 1 user, load averages: 1.90 1.98 2.05 — Fri Nov 27 20:08:34 UTC 2026 to Fri Nov 27 20:08:34 UTC 2026 — exit status 0.
213-no-escalation-runtime.log · SHA-256 80afe51123dd759dbd32b2137b53b45bb7ec09e4fe576a9b20e138b521737704 — Command reproduced in the cited log — 15:08  up 6 days,  6:36, 1 user, load averages: 1.99 2.00 2.06 — Fri Nov 27 20:08:40 UTC 2026 to Fri Nov 27 20:08:41 UTC 2026 — exit status 0.
219-execution-bridge-runtime.log · SHA-256 9ffb50973e0aae3c78cd889830e214394b03297fc41e733f3be1194f61c5f628 — Command reproduced in the cited log — 15:08  up 6 days,  6:36, 1 user, load averages: 1.79 1.95 2.04 — Fri Nov 27 20:08:55 UTC 2026 to Fri Nov 27 20:08:56 UTC 2026 — exit status 0.
225-original-write-runtime.log · SHA-256 1f0ed335c56fdd57b79f9404d32b0222fecd18335e78a91295cd870f46c39e56 — Command reproduced in the cited log — 15:09  up 6 days,  6:36, 1 user, load averages: 1.72 1.94 2.03 — Fri Nov 27 20:09:02 UTC 2026 to Fri Nov 27 20:09:03 UTC 2026 — exit status 0.
231-no-request-runtime.log · SHA-256 d8ff72676df6fc99edaa906d6f55266be32f528529273258194a3104b4113bc4 — Command reproduced in the cited log — 15:09  up 6 days,  6:36, 1 user, load averages: 1.69 1.92 2.02 — Fri Nov 27 20:09:11 UTC 2026 to Fri Nov 27 20:09:11 UTC 2026 — exit status 0.
237-closed-accepts-runtime.log · SHA-256 1ca42a8d09cdcec00408509ab6cba4ab394b73ec48c36caf074b6d35c4d9b8c6 — Command reproduced in the cited log — 15:09  up 6 days,  6:37, 1 user, load averages: 1.82 1.94 2.03 — Fri Nov 27 20:09:24 UTC 2026 to Fri Nov 27 20:09:25 UTC 2026 — exit status 0.
289-r4-runtime.log · SHA-256 87ead59c8a6a11ef11fc6b0ceb5ec8d1c6165d4c21d04794a8308d32725cb162 — Command reproduced in the cited log — 17:12  up 6 days,  8:39, 2 users, load averages: 2.02 2.57 2.30 — Fri Nov 27 22:12:23 UTC 2026 to Fri Nov 27 22:12:23 UTC 2026 — exit status 0.
315-r4-resume-runtime.log · SHA-256 af0b3a27b8a8da24274d98e7e60593ae83615d6b8d742a5d028fd9c05949f6f0 — Command reproduced in the cited log — 18:01  up 6 days,  9:29, 6 users, load averages: 1.93 2.21 2.16 — Fri Nov 27 23:01:42 UTC 2026 to Fri Nov 27 23:01:42 UTC 2026 — exit status 0.
326-before-enter-runtime.log · SHA-256 efdc8ce1002abc291ef1654ff4f0962382093648bc478b5f2dc4b2350b1592fc — Command reproduced in the cited log — 18:02  up 6 days,  9:30, 6 users, load averages: 3.62 2.68 2.34 — Fri Nov 27 23:02:51 UTC 2026 to Fri Nov 27 23:02:52 UTC 2026 — exit status 0.
333-empty-line-runtime.log · SHA-256 5ca8e4bfa0a23ddf581fa8e5c9cceb2873d076262850d4912a1772ddeca4e651 — Command reproduced in the cited log — 18:14  up 6 days,  9:41, 6 users, load averages: 1.61 1.83 2.04 — Fri Nov 27 23:14:11 UTC 2026 to Fri Nov 27 23:14:11 UTC 2026 — exit status 0.
340-wrong-resize-runtime.log · SHA-256 e59ab07e344b4aed9802bec68551e5f186e2adef9293f35ee88573ba94643332 — Command reproduced in the cited log — 18:14  up 6 days,  9:41, 6 users, load averages: 1.88 1.89 2.06 — Fri Nov 27 23:14:16 UTC 2026 to Fri Nov 27 23:14:16 UTC 2026 — exit status 0.
347-raw-line-runtime.log · SHA-256 9cfb31080e879af96df8a87a628b74be45fda428187cb05b8c82ec7cdf070488 — Command reproduced in the cited log — 18:14  up 6 days,  9:41, 6 users, load averages: 1.97 1.90 2.07 — Fri Nov 27 23:14:20 UTC 2026 to Fri Nov 27 23:14:20 UTC 2026 — exit status 0.
354-refusal-retry-runtime.log · SHA-256 657aaa7ce37ad42f0e5dcece6ee6a6e2b93cbdd69d66fd2abd6c1fa3a5dc30fb — Command reproduced in the cited log — 18:14  up 6 days,  9:42, 6 users, load averages: 1.96 1.91 2.06 — Fri Nov 27 23:14:28 UTC 2026 to Fri Nov 27 23:14:28 UTC 2026 — exit status 0.
361-false-success-runtime.log · SHA-256 13ba106a91e24d2fa41387418c5b67cff3b450bc2b3098f94374914cac95fef2 — Command reproduced in the cited log — 18:14  up 6 days,  9:42, 6 users, load averages: 1.88 1.89 2.06 — Fri Nov 27 23:14:35 UTC 2026 to Fri Nov 27 23:14:35 UTC 2026 — exit status 0.
368-unauthorized-word-runtime.log · SHA-256 09928895980fd214017d1b6108163231d36709db416f328d572104906ad99177 — Command reproduced in the cited log — 18:14  up 6 days,  9:42, 6 users, load averages: 1.97 1.91 2.06 — Fri Nov 27 23:14:39 UTC 2026 to Fri Nov 27 23:14:39 UTC 2026 — exit status 0.
381-r5-runtime.log · SHA-256 ea5e99137cf202dd269ab1087f5d62846f39f876b562fd7657ca711d5a09f607 — Command reproduced in the cited log — 18:21  up 6 days,  9:48, 6 users, load averages: 2.32 1.98 2.02 — Fri Nov 27 23:21:19 UTC 2026 to Fri Nov 27 23:21:19 UTC 2026 — exit status 0.
393-alt4-runtime.log · SHA-256 dbda58fd2e003ad9b78636044674eb22376debc6604fb535ff333bcaa67f6bcc — Command reproduced in the cited log — 18:24  up 6 days,  9:52, 6 users, load averages: 2.01 1.81 1.93 — Fri Nov 27 23:24:27 UTC 2026 to Fri Nov 27 23:24:27 UTC 2026 — exit status 0.
403-r6-runtime.log · SHA-256 f6807cdbdbc0f1d74f9d2adca77c1683fd299dfdd384dbf6a8f6e3ae3b5f2820 — Command reproduced in the cited log — 18:27  up 6 days,  9:54, 6 users, load averages: 2.08 1.85 1.91 — Fri Nov 27 23:27:24 UTC 2026 to Fri Nov 27 23:27:24 UTC 2026 — exit status 0.
414-ended-writer-runtime.log · SHA-256 4cd1f397c6f05ad8b595b15adb9dc9bb1a59e6ac8ea262ecd6655fe1221a3a5f — Command reproduced in the cited log — 18:31  up 6 days,  9:59, 1 user, load averages: 2.52 2.23 2.07 — Fri Nov 27 23:31:36 UTC 2026 to Fri Nov 27 23:31:36 UTC 2026 — exit status 0.
421-null-transfer-runtime.log · SHA-256 d8c3791186219b9fa8ee8a08008097b4daebeb54179a6ce13e64ec223bcf8d12 — Command reproduced in the cited log — 18:34  up 6 days, 10:02, 1 user, load averages: 1.50 1.96 1.99 — Fri Nov 27 23:34:32 UTC 2026 to Fri Nov 27 23:34:32 UTC 2026 — exit status 0.
428-pending-pace-runtime.log · SHA-256 c22ced9a0aeac320b5a8bea6685586528856222f34e38556e8ea8fc44133ba21 — Command reproduced in the cited log — 18:34  up 6 days, 10:02, 1 user, load averages: 1.78 2.01 2.01 — Fri Nov 27 23:34:37 UTC 2026 to Fri Nov 27 23:34:37 UTC 2026 — exit status 0.
439-r7-runtime.log · SHA-256 4e526e5766a0196a5f48dccf3bced44765f35d0fd67cc3e9692c2218de2194c8 — Command reproduced in the cited log — 18:37  up 6 days, 10:04, 1 user, load averages: 1.63 1.81 1.92 — Fri Nov 27 23:37:03 UTC 2026 to Fri Nov 27 23:37:03 UTC 2026 — exit status 0.
452-seam-import-runtime.log · SHA-256 3ce8d1c8bc62d6d8dd9045cbb84d1edbca553af404c56349837d86cee87a7f3c — Command reproduced in the cited log — 18:40  up 6 days, 10:08, 1 user, load averages: 2.54 1.93 1.91 — Fri Nov 27 23:40:59 UTC 2026 to Fri Nov 27 23:40:59 UTC 2026 — exit status 0.
459-discard-fault-runtime.log · SHA-256 d9bf7414a86806763088528d02dfda8ac0a4490d9b7e408645943f91e9bffa0d — Command reproduced in the cited log — 18:44  up 6 days, 10:11, 1 user, load averages: 2.91 2.21 2.02 — Fri Nov 27 23:44:06 UTC 2026 to Fri Nov 27 23:44:07 UTC 2026 — exit status 0.
466-expose-fault-runtime.log · SHA-256 8ae7c963a2ba9fbc4ae2da39c2f3528548bfac0f21354329c8a6440d14407510 — Command reproduced in the cited log — 18:49  up 6 days, 10:16, 1 user, load averages: 1.82 2.24 2.10 — Fri Nov 27 23:49:07 UTC 2026 to Fri Nov 27 23:49:07 UTC 2026 — exit status 0.
473-r8-runtime.log · SHA-256 e2b68a2a35e1395eaddb37b2d45efc58bbe9bbeea2b1a3c2de8211d1cc45ecbb — Command reproduced in the cited log — 18:50  up 6 days, 10:17, 1 user, load averages: 1.80 2.19 2.09 — Fri Nov 27 23:50:03 UTC 2026 to Fri Nov 27 23:50:03 UTC 2026 — exit status 0.
484-full-runtime.log · SHA-256 e2417c7baae8e02828bc9e8e83d32d4418408d115fe9720bb7153309d987a8a5 — Command reproduced in the cited log — 18:51  up 6 days, 10:19, 1 user, load averages: 1.58 1.93 2.00 — Fri Nov 27 23:51:54 UTC 2026 to Fri Nov 27 23:51:55 UTC 2026 — exit status 0.
488-full-suite-runtime.log · SHA-256 be71873d9fe96de9fe50e865945f446181834d08793dafc1b5d98516aabfc81f — Command reproduced in the cited log — 18:53  up 6 days, 10:20, 1 user, load averages: 1.69 1.88 1.97 — Fri Nov 27 23:53:19 UTC 2026 to Fri Nov 27 23:53:20 UTC 2026 — exit status 0.

Fourth resume. The harness showed workspace-write and network restrictions. A separate approval-setting field was not shown. The Founder reported on-request. No barred tool was called and no command contained one of the six names of Addendum 2 B4. No command dynamically evaluated stored code. The pinned Bun revision check used the prescribed expression.

535-grid-runtime.log · SHA-256 607bdaac7eeda469c27524effd9692cc4113c6e47c50225f497da06c2e1a3332 — Pinned Bun runtime check — 19:38  up 6 days, 11:06, 1 user, load averages: 2.32 2.38 2.64 — Sat Nov 28 00:38:41 UTC 2026 to Sat Nov 28 00:38:41 UTC 2026 — exit status 0.

538-grid-update-runtime.log · SHA-256 00b4686e1812b3c070841c3a1ee71d399a5d19e3c9dcfbda09e22032c55eff21 — Pinned Bun runtime check — 19:41  up 6 days, 11:09, 1 user, load averages: 2.29 2.28 2.53 — Sat Nov 28 00:41:40 UTC 2026 to Sat Nov 28 00:41:40 UTC 2026 — exit status 0.

550-repeat-runtime.log · SHA-256 68b44fea3246b90df9e5e0170b1f549db73398b172a11a6429841240b4ff9afa — Pinned Bun runtime check — 20:08  up 6 days, 11:36, 1 user, load averages: 1.21 1.91 2.37 — Sat Nov 28 01:08:28 UTC 2026 to Sat Nov 28 01:08:28 UTC 2026 — exit status 0.

554-repeat-suite-runtime.log · SHA-256 7761decbe9f497838f3652a306fa95eb4fe928c6d0f18f3f49e2b020ef7995d5 — Pinned Bun runtime check — 20:09  up 6 days, 11:36, 1 user, load averages: 3.73 2.60 2.61 — Sat Nov 28 01:09:12 UTC 2026 to Sat Nov 28 01:09:12 UTC 2026 — exit status 0.

600-gate-runtime.log · SHA-256 9b8f048b92cad05e4958dc80513646ceb275858123fda18c286e156eb6568d7c — Pinned Bun runtime check — 20:21  up 6 days, 11:48, 1 user, load averages: 1.41 1.76 2.12 — Sat Nov 28 01:21:21 UTC 2026 to Sat Nov 28 01:21:21 UTC 2026 — exit status 0.

604-gate-suite-runtime.log · SHA-256 e3a577189992c7a74e48f526e33dff8d49d56556b92d73af8cc1d7601d36324a — Pinned Bun runtime check — 20:22  up 6 days, 11:50, 1 user, load averages: 1.07 1.56 2.00 — Sat Nov 28 01:22:56 UTC 2026 to Sat Nov 28 01:22:56 UTC 2026 — exit status 0.

2. Workspace and preconditions at the binding base

Current checkout /Users/michaeldaley/builds/m3-r1/tui on build/3b-m3-r1. Closing head 67dce10bb771092743664dbdafa873e38748b5d4. The following base observations and line citations come from this session's first halt report.
Working directory /Users/michaeldaley/builds/m3-r1. Branch build/3b-m3-r1. Binding base a7ceccbe96950b63646edc1dc6cc8590c957bf28. The first halt head was 790eba2b5a3ea1beb37aa07311165c0fa9b8109f. The worktree and index are clean, including untracked-file checks.
The opening commit records the source preconditions at the base. Its verification file has SHA-256 e6ff4b9745e52df8a4db3b464603611df8a55a3653fdc13d9c85b30908ce1d4c.
The local branch is `build/3b-m3-r1`. HEAD and the fetched origin/main both name
a7ceccbe96950b63646edc1dc6cc8590c957bf28, the binding base under B11.
Its first parent and ancestor is 2026cfd96ff34b6ebc44161479f23f105febc102.
Only docs/decisions/DEC-20261127-01-m2-records-and-m3.md and
docs/verification/phase-3a-correction-rounds.md differ. Log 008 records the clean
worktree, empty stash, and absence of the remote build branch. Log 009 records
the exact source inventories and the absence of both verification documents.
The Founder reported the three delivery directories empty at setup. Log 009 saw
only this session's numbered files in logs and empty evidence and pr directories.

The commission DEC-20261127-01 has SHA-256
78e2bed03efd2e466a224f4186971d06c51e7fb85e0b22f0db0e639cd99a4d97.
The prompt checksum verified at
ed699228da7e9924d7d175c89b0ca3d3accd1f1385b36e6cc41de9b0d8fbb1ca.
Log 011 verifies the 35 authority hashes, issued status and signatures. Log 012
reads the committed texts. The host reports Darwin arm64.

Source citations and line numbers follow as filed at the binding base. Where a quote contains square brackets, its complete text is available in the opening and the full source logs. File and line lists are in the following receipts.
008-base.log SHA-256 c0b56cd9002ebac41d7ba30ed9b917b35572368dd91de82703f222eae5ec4c4a
009-inventories.log SHA-256 5054526cb937e3c1ef2dfc74ec714607d592b89edee4fdbed590dbedbe9a8c60
010-m3-act.log SHA-256 3f9f45cf6ccb7f474c224b8695826c89218330db3f55161d71eb375f962154a9
011-authority-hashes.log SHA-256 84b061d32f6a2cb0bdb60143de6324b0ea3b24de0068666d89c372f77bda9f33
012-authority-texts.log SHA-256 8ff0df231dc0fecb5e9f713b94f1b20564963706f2f999556c90295315b16bea
013-commission-lines.log SHA-256 1e722c491543a8f709f9254cf885c74be15e6843549ac081d74067c3d37f8df2
014-base-lines.log SHA-256 71dd2c5314bf3476003a2f6fc0c4a980af1706c63bf0e20d65b6404f84ed26e9
016-imports.log SHA-256 0e69bb82833903b724c7be8bc277c3de3f1832ca5e5af2dad6a56edb352bc164
017-base-implementation.log SHA-256 1bfad3bdf759b6d341a0a6051bd8688901bff047ea92ea783aa7c214e5f2e6d7
018-anchors.log SHA-256 8b0be6eb20d5626a7ab5506c9007faa188ee6d8b4246ff4d883ad292bdb0eae8
020-preflight-review.log SHA-256 357f32b88660f0a9f30dfd1dff1ea1aa7145815d3c9f93243f396f59990924c2
021-snapshot-base.log SHA-256 f5fbd5c7abba90513e032255f00707e34e31c9cbd49a3582a04395066ed685e4
042-admission-rules.log SHA-256 94493b8879a7f0ac19ced7784e6b968876b1bdd4e4b7022c56ead1c53eccb21d
043-relative-imports.log SHA-256 669eb2b3f49cd89fd07bc5d85be779d2895f728398829155170a3ea341aae424
047-base-test-sites.log SHA-256 7ce6f643439ab6e108f649fb20f7b66bc765661697e6ec1edd7024f089cb2988
The following quotes use base file line numbers. Gaps are marked. Log 014 also records the complete precondition selection.

apps/madbridge/src/tui/keyboard-router.ts

(lines omitted)
258    const ptyData = resolvePtySequence(sequence, name, keyStr);
259    if (ptyData !== null) {
260      callbacks.onPtyWrite(ptyData);
(lines omitted)

packages/broker/src/command-legality.ts

(lines omitted)
164    // Predicate 5 — active-writer identity. pty_input and pty_resize ONLY.
165    // pty_terminate is never gated here (mechanical fail-closed teardown must
166    // not be blockable by a non-writer). A current positive fencing token is
167    // necessary but not sufficient: an execution that exists but is not the
168    // active writer is refused here, whatever token it presents. A null
169    // activeWriterExecutionId fails this predicate for writer-only commands.
170    if (WRITER_ONLY_COMMAND_KINDS.has(kind)) {
171      const executionId = (command as { readonly executionId: string }).executionId;
172      if (snapshot.activeWriterExecutionId === null || executionId !== snapshot.activeWriterExecutionId) {
173        return { ok: false, error: "unauthorized", detail: "execution is not the active writer" };
174      }
(lines omitted)

packages/supervisor/src/build.ts

(lines omitted)
23  import { invalidateToken, issueInitialToken } from "../../broker/src/fencing";
24  import { HOST_DEADLINES_MS, terminateChildGroup } from "../../pty-host/src/signals";
25  import {
26    createInProcessBrokerClient,
27    type InProcessBrokerClient,
28    type StampedBrokerSnapshot,
29  } from "../../broker/src/in-process-client";
30  import {
31    spawnPtyHost,
32    escalateWedgedHost,
33    type HostLaunchDescriptor,
34    type PtyHostHandle,
35  } from "../../broker/src/pty-host-supervisor";
36  import {
37    RuntimeBroker,
38    type GovernedProcessTerminator,
39    type LifecycleObservation,
40    type RuntimeBrokerDeps,
41    type RuntimeBrokerSources,
42  } from "../../broker/src/runtime-broker";
43  import { projectSnapshot } from "../../broker/src/snapshot";
44  import type { ExecutionSnapshot } from "../../broker/src/client";
(lines omitted)
(lines omitted)
(lines omitted)
643        const reason = cause === "auth_failed" ? "authentication_expired"
644          : cause === "child_exited" ? "child_failure"
645          : cause === "host_exited" ? "pty_host_failure"
646          : cause === "provider_error" || cause === "endpoint_refused" ? "adapter_failure" : "identity_mismatch";
(lines omitted)
870            client = createInProcessBrokerClient(brokerHandle, { kind: "founder_tui" });
(lines omitted)
1067              const adapterClient = createInProcessBrokerClient(brokerHandle, {
1068                kind: "execution",
1069                executionId: envelopeExecution.execution_id,
1070              });
(lines omitted)
1092            const issuedEvent = issueInitialToken(sessionId, envelope.initial_writer, {
1093              taskEnvelopeHash: envelope.envelope_hash,
1094              repositoryFingerprint: envelope.repository_fingerprint,
1095              previousEventHash: beforeHead,
1096              eventId: sources.nextEventId(),
1097              createdAt: sources.now(),
1098            });
(lines omitted)

packages/broker/src/in-process-client.ts

(lines omitted)
268    function ingestOutputFrame(frame: OutputFrame): SequenceViolation | null {
269      const { sessionId, executionId, outputSeq, bytes } = frame;
270      const lastAccepted = outputSeqs.get(executionId) ?? 0;
271      const kind =
272        sessionId === broker.snapshotProjectionInput().lifecycle.sessionId
273          ? sequenceViolation(lastAccepted, outputSeq)
274          : "session_mismatch";
275      if (kind !== null) {
276        return { kind, stream: "output", lastAccepted, offered: outputSeq };
277      }
278      outputSeqs.set(executionId, outputSeq);
(lines omitted)
280      outputQueues.set(executionId, queue);
281      // Copied on ingest: the delivered frame's bytes is never the caller's array.
282      queue.push({ sessionId, executionId, outputSeq, bytes: new Uint8Array(bytes) });
(lines omitted)
284        const delivered = waiter.executionId === executionId ? queue.shift() : undefined;
285        if (delivered !== undefined) {
286          waiter.settle({ done: false, value: delivered });
287        }
288      }
289      return null;
(lines omitted)
302    // output(executionId) does not end when its buffer is empty: it waits for the
303    // next frame and ends only when this client closes (DEC-20260929-01 B3).
304    function output(executionId: string): AsyncIterable<OutputFrame> {
305      return {
(lines omitted)
307          const own = new Set<OutputWaiter>();
308          let finished = false;
309          return {
310            next(): Promise<IteratorResult<OutputFrame>> {
311              if (finished || closed) {
312                return Promise.resolve(iterationDone());
313              }
314              const queued = outputQueues.get(executionId)?.shift();
315              if (queued !== undefined) {
316                return Promise.resolve({ done: false, value: queued });
317              }
318              return new Promise((resolve) => {
319                const waiter: OutputWaiter = {
320                  executionId,
321                  settle: (result) => {
322                    outputWaiters.delete(waiter);
323                    own.delete(waiter);
324                    resolve(result);
325                  },
326                };
327                outputWaiters.add(waiter);
328                own.add(waiter);
329              });
330            },
331            return(): Promise<IteratorResult<OutputFrame>> {
332              finished = true;
(lines omitted)
334                waiter.settle(iterationDone());
335              }
336              return Promise.resolve(iterationDone());
337            },
338          };
339        },
340      };
(lines omitted)
343    async function request(command: BrokerCommand): Promise<BrokerResult> {
344      // Evaluate and dispatch the same values even when the caller supplies getters.
345      const captured = { ...command };
346      const commandId = captured.commandId;
347      const snapshot = projectSnapshot(broker.snapshotProjectionInput());
348      const legality = evaluateCommandLegality(captured, snapshot, evaluatedPrincipal);
349      if (!legality.ok) {
350        return { ok: false, commandId, error: legality.error, detail: legality.detail };
351      }
352      switch (captured.kind) {
353        case "session_pause":
354          await broker.pause(commandId);
355          break;
356        case "session_resume":
357          await broker.resume(commandId);
358          break;
359        case "session_close":
360          await broker.founderClose(commandId);
361          break;
362      }
363      return { ok: true, commandId, acceptedSnapshotSeq: deliveredSeq };
364    }
(lines omitted)
479  export function unsafeTestOnlyIngestOutputFrame(
480    client: InProcessBrokerClient,
481    executionId: string,
482    bytes: Uint8Array,
483  ): void {
484    seamsOf(client).ingestStamped(executionId, bytes);
485  }
(lines omitted)
496  export async function unsafeTestOnlyIngestRawOutputFrame(
497    client: InProcessBrokerClient,
498    frame: OutputFrame,
499  ): Promise<void> {
500    return seamsOf(client).ingestRaw(frame);
501  }
(lines omitted)
511  export async function unsafeTestOnlyOfferSnapshotSeq(
512    client: InProcessBrokerClient,
513    candidate: number,
514  ): Promise<void> {
515    return seamsOf(client).offerSnapshotSeq(candidate);
516  }
(lines omitted)

packages/broker/src/pty-host-supervisor.ts

(lines omitted)
53  const HOST_ENTRY = "packages/pty-host/src/main.ts";
(lines omitted)
89  const subscriberCounts = new WeakMap<PtyHostHandle, () => number>();
90
91  export function subscriberCountForTest(handle: PtyHostHandle): number {
92    return subscriberCounts.get(handle)?.() ?? 0;
93  }
94
(lines omitted)
102  const waiterCounts = new WeakMap<PtyHostHandle, () => number>();
103
104  export function waiterCountForTest(handle: PtyHostHandle): number {
105    return waiterCounts.get(handle)?.() ?? 0;
106  }
107
(lines omitted)
119   */
120  const closeStdinCounts = new WeakMap<PtyHostHandle, () => number>();
121
122  export function closeStdinCallCountForTest(handle: PtyHostHandle): number {
123    return closeStdinCounts.get(handle)?.() ?? 0;
124  }
125
(lines omitted)
134   */
135  const terminateSendCounts = new WeakMap<PtyHostHandle, () => number>();
136
137  export function terminateSendCountForTest(handle: PtyHostHandle): number {
138    return terminateSendCounts.get(handle)?.() ?? 0;
139  }
140
(lines omitted)
201  }
202
203  /** Test-only observation of the phase. Module-private; not on the barrel. */
204  export function escalationPhaseForTest(handle: PtyHostHandle): EscalationPhase {
205    return escalationRecords.get(handle)?.phase ?? "none";
206  }
207
(lines omitted)
225  interface PendingAck {
226    /** The command whose acknowledgement is awaited. */
(lines omitted)
228    /** Settled with true on a matching ack, false on any terminal path. */
229    readonly settle: (acked: boolean) => void;
230    /** Resolves once, on the first settle. */
231    readonly promise: Promise<boolean>;
232    settled: boolean;
233  }
234
235  /** Registers/looks up the pending acknowledgement owned by a handle. */
236  const pendingAcks = new WeakMap<PtyHostHandle, PendingAck>();
237
238  /** Registers/looks up the supervisor-internal ack notifier for a handle. */
239  const ackNotifiers = new WeakMap<PtyHostHandle, (frame: HostFactFrame) => void>();
240
241  /**
242   * Test-only observability: whether a pending acknowledgement record is
243   * currently registered for a handle. Off the public contract and off the
244   * barrel. Proves requirement 3/4 — that no stale acknowledgement state
245   * survives a terminal path and can satisfy a later escalation.
246   */
247  const pendingAckProbes = new WeakMap<PtyHostHandle, () => boolean>();
248
249  export function pendingAckRegisteredForTest(handle: PtyHostHandle): boolean {
250    return pendingAckProbes.get(handle)?.() ?? false;
(lines omitted)
316  async function* factStream(proc: Bun.Subprocess): AsyncGenerator<HostFactFrame> {
317    const stdout = proc.stdout;
318    if (stdout === undefined || typeof stdout === "number") {
319      // stdout was not piped — the host cannot produce facts. This is a
320      // supervisor construction error, not a runtime condition.
321      throw new Error("pty-host supervisor: host stdout is not a stream");
322    }
323    const reader = stdout.getReader();
324    let buffer: Uint8Array<ArrayBuffer> = new Uint8Array(0);
325    try {
326      for (;;) {
327        const { done, value } = await reader.read();
328        if (done) break;
329        buffer = concatBytes(buffer, new Uint8Array(value));
330        for (;;) {
331          const decoded = decodeFact(buffer);
332          if (decoded === null) break;
333          yield decoded.frame;
334          buffer = buffer.subarray(decoded.consumed);
335        }
336      }
337    } finally {
338      reader.releaseLock();
339    }
340  }
(lines omitted)
(lines omitted)
365      cwd: REPO_ROOT,
366      stdin: "pipe",
367      stdout: "pipe",
368      stderr: "pipe",
369      // Allowlisted environment ONLY — ambient inheritance is prohibited.
370      env: { ...descriptor.env },
371    });
(lines omitted)
519      // Production acknowledgement path (Greptile P1 remediation): every
520      // decoded host fact flows through this single pump, so settling the
521      // pending acknowledgement here means `escalateWedgedHost` observes the
522      // REAL host response — not an injected test signal. The notifier is
523      // registered at handle construction below.
524      ackNotify?.(frame);
(lines omitted)
657        if (queue.closed) {
658          if (pumpError !== null) throw pumpError;
659          return;
(lines omitted)
690        if (wake && queue.items.length === 0) {
691          if (pumpError !== null) throw pumpError;
692          return;
693        }
(lines omitted)
744    ackNotify = (frame: HostFactFrame): void => {
745      const pending = pendingAcks.get(handle);
746      if (pending === undefined || pending.settled) return;
747      const isMatchingAck = frame.kind === "ack" && frame.ofKind === pending.ofKind;
748      const isTerminationFirstFact = pending.ofKind === "terminate" && frame.kind === "termination_started";
749      if (isMatchingAck || isTerminationFirstFact) pending.settle(true);
750    };
751    pendingAckProbes.set(handle, () => {
752      const p = pendingAcks.get(handle);
(lines omitted)
883   * Timing (packet C3): `t_command` — the moment the terminate command is
884   * issued — is the SOLE anchor. The 250 ms acknowledgement period consumes
885   * the same absolute 500 ms hard-kill budget; there is no second grace
886   * window. Both kill attempts begin no later than `t_command + 500 ms`.
(lines omitted)

packages/broker/src/pty-host-protocol.ts

(lines omitted)
33  export class MalformedFrameError extends Error {
(lines omitted)
36      this.name = "MalformedFrameError";
(lines omitted)
109      throw new MalformedFrameError("payload is not valid UTF-8");
(lines omitted)
114      throw new MalformedFrameError("payload is not valid JSON");
(lines omitted)
148          throw new MalformedFrameError("malformed launch payload");
(lines omitted)
157          throw new MalformedFrameError("malformed resize payload");
(lines omitted)
162        if (payload.byteLength !== 0) throw new MalformedFrameError("terminate carries no payload");
(lines omitted)
(lines omitted)
(lines omitted)
191          throw new MalformedFrameError("malformed launched payload");
(lines omitted)
196        if (payload.byteLength !== 0) throw new MalformedFrameError("ready carries no payload");
(lines omitted)
201          throw new MalformedFrameError("malformed ack payload");
(lines omitted)
208        if (payload.byteLength !== 0) throw new MalformedFrameError("termination_started carries no payload");
(lines omitted)
211        if (payload.byteLength !== 0) throw new MalformedFrameError("drained carries no payload");
(lines omitted)
216          throw new MalformedFrameError("malformed exited payload");
(lines omitted)
225    if (length > MAX_FRAME_BYTES) throw new MalformedFrameError(`frame exceeds MAX_FRAME_BYTES (${MAX_FRAME_BYTES})`);
(lines omitted)
236    if (length < 1) throw new MalformedFrameError("frame length must include at least the kind tag");
237    if (length > MAX_FRAME_BYTES) throw new MalformedFrameError(`frame exceeds MAX_FRAME_BYTES (${MAX_FRAME_BYTES})`);
(lines omitted)
253    if (kind === null) throw new MalformedFrameError(`unknown command tag ${decoded.tag}`);
(lines omitted)
261  export function decodeFact(buf: Uint8Array): { readonly frame: HostFactFrame; readonly consumed: number } | null {
(lines omitted)
265    if (kind === null) throw new MalformedFrameError(`unknown fact tag ${decoded.tag}`);
266    return { frame: decodeFactPayload(kind, decoded.payload), consumed: decoded.consumed };
(lines omitted)

packages/pty-host/src/main.ts

(lines omitted)
739      } else if (frame.kind === "input" || frame.kind === "resize") {
740        // A terminal write/resize failure must not escape the steady-state
741        // loop: an unguarded throw would propagate out of runSteadyState and
742        // out of main, skipping close() — no drained, no exited, and no
743        // containment SIGTERM, so the child process group could survive.
744        // Fail closed instead: diagnose, mark the exit code, contain the
745        // child, and complete the session shutdown exactly once.
746        try {
747          if (frame.kind === "input") session.terminal.write(frame.bytes);
748          else session.terminal.resize(frame.cols, frame.rows);
749        } catch (err) {
750          const detail = err instanceof Error ? err.message : String(err);
751          process.stderr.write(`pty-host: terminal ${frame.kind} failed: ${detail}; containing the child\n`);
752          process.exitCode = 1;
753          await close({ announce: false, signal: true });
754          return;
755        }
756        emit({ kind: "ack", ofKind: frame.kind });
757      } else if (frame.kind === "terminate") {
(lines omitted)

packages/adapter-claude-code/src/live.ts

(lines omitted)
6  export function encodeUserInput(text: string): string {
7    return JSON.stringify({ type: "user", message: { role: "user", content: text } }) + "\n";
8  }
(lines omitted)
122        if (!this.complete) {
123          this.complete = true;
124          this.passed();
125        }
(lines omitted)
149    const reader = new ClaudeReader(input, () => {
150      if (performance.now() >= deadline) { stop("attestation_deadline"); return; }
151      clearTimeout(timer);
152      resolve({ ok: true, evidenceKind: "actual_session", provider: "anthropic", model: input.model, cliVersion: reader.version });
153    });
154    async function consume(): Promise<void> {
155      try {
156        for await (const fact of input.host.handle.facts()) {
157          if (failed) break;
158          if (!reader.complete && performance.now() >= deadline) { stop("attestation_deadline"); break; }
159          if (fact.kind === "output" && fact.bytes) {
160            const cause = reader.push(fact.bytes);
161            if (cause) stop(cause);
162          } else if (reader.complete && fact.kind === "exited") {
163            stop(reader.finish() ?? "child_exited");
164          } else if (!reader.complete && (fact.kind === "exited" || fact.kind === "drained")) {
165            stop(reader.finish() ?? "attestation_missing");
166          }
167          if (failed) break;
168        }
169        if (!failed) stop(reader.complete ? "host_exited" : reader.finish() ?? "attestation_missing");
170      } catch { stop("attestation_malformed"); }
171      finally {
(lines omitted)

packages/adapter-madv-surface/src/index.ts

(lines omitted)
55  export function encodeUserInput(text: string): string {
56    return JSON.stringify({ type: "user", message: { role: "user", content: text } }) + "\n";
57  }
(lines omitted)

packages/adapter-madv-surface/src/live.ts

(lines omitted)
44      onAttested(version) {
45        if (performance.now() >= deadline) { stop("attestation_deadline"); return; }
46        clearTimeout(timer);
47        ready = true;
48        resolve({ ok: true, evidenceKind: "actual_session", provider: input.registration.provider,
49          model: input.model, cliVersion: version, sendUserInput });
50      },
(lines omitted)
59    function sendUserInput(text: string): boolean {
60      if (closed || !ready || failure) return false;
61      inspect(parser.beginRequest());
62      if (failure) return false;
63      clearTimeout(timer);
64      timer = setTimeout(() => inspect(parser.checkDeadline()), EVIDENCE_DEADLINE_MS);
65      try { write(encodeUserInput(text)); } catch { stop("provider_error"); }
66      return !failure;
67    }
68    async function consume(): Promise<void> {
69      try {
70        for await (const fact of input.host.handle.facts()) {
71          if (failure) break;
72          if (!ready && performance.now() >= deadline) { stop("attestation_deadline"); break; }
73          if (fact.kind === "output" && fact.bytes) inspect(parser.push(fact.bytes));
74          if (fact.kind === "exited") {
75            const handedOver = ready;
76            const exitCode = fact.code ?? 1;
77            const result = parser.finish(exitCode, fact.signal ?? null);
78            const detection = detectMadvFailure(input.registration.auth_failure_detection, { kind: "child_exit", exitCode });
79            if (detection && !parser.attestationFailure) stop(detection.cause, detection.reason);
80            else inspect(result);
81            if (handedOver && !failure) stop("child_exited");
82            return;
83          }
84          if (failure) break;
85        }
86        if (!failure) {
87          if (ready) stop("host_exited");
88          else inspect(parser.finish(0));
89        }
90      } catch { stop("identity_mismatch", "malformed_stream"); }
91      finally {
(lines omitted)

test/phase3b/child-end.ts

(lines omitted)
72              const verdict = await attestMadvSession({ ...input, reportFailure(cause) {
73                input.reportFailure(cause);
74                reported = true;
75              } });
76              if (verdict.ok) {
77                send = verdict.sendUserInput;
78                if (before) {
(lines omitted)

packages/supervisor/test/build.test.ts

(lines omitted)
58      };
59      expect((await session.client.request(write)).ok).toBe(true);
60      expect((await session.client.request({
61        kind: "session_pause", commandId: "prereq-pause", sessionId: active.sessionId, reason: "test",
62      })).ok).toBe(true);
63      const paused = await session.client.getSnapshot();
64      expect(paused.phase).toBe("paused");
65      expect(paused.fencingToken).toBe(active.fencingToken);
66      expect((await session.client.request(write)).ok).toBe(false);
67      expect((await session.client.request({
(lines omitted)

test/phase3a/runtime-harness.ts

(lines omitted)
318    // A private disposable home child also satisfies the shared-/tmp exclusion on Linux.
319    const root = mkdtempSync(join(realpathSync(user.homedir), ".madbridge-task48-"));
(lines omitted)
580      Object.defineProperty(client, "request", {
(lines omitted)
582          const captured = { ...command };
583          if (captured.kind === "pty_input" && captured.bytes instanceof Uint8Array) captured.bytes = captured.bytes.slice();
584          const accepted = await underlying.request(captured);
585          if (!accepted.ok) return accepted;
586          if (captured.kind === "pty_input" || captured.kind === "pty_resize") {
587            const host = state!.hosts.find(host => host.executionId === captured.executionId);
588            if (host === undefined) throw new Error("FixtureWriterHostMissing");
589            host.handle.send(captured.kind === "pty_input" ? { kind: "input", bytes: captured.bytes }
590              : { kind: "resize", cols: captured.cols, rows: captured.rows });
(lines omitted)
623            } else if (options.wedgeHostAfter !== undefined) {
(lines omitted)
625              process.kill(host.hostPid, "SIGSTOP");
626              const outcome = await escalateWedgedHost(host.handle, child.pgid!, host.hostPid);
(lines omitted)
639            } else if (options.emitMalformedFrame !== undefined) {
640              // Inject raw fact bytes at the harness receive boundary through the production codec.
641              const bytes = options.emitMalformedFrame === "unknown"
(lines omitted)
643              try { decodeFact(bytes); }
644              catch (error) {
645                if (!(error instanceof MalformedFrameError)) throw error;
646                faultReport.errorName = error.name;
647                faultReport.detectedMs = performance.now() - faultStarted;
648                await interrupt("pty_host_failure");
649              }
(lines omitted)

apps/madbridge/src/tui/components/agent-identity.ts

(lines omitted)
83   * Truthfulness: a writer claim is only valid while the session is connected
84   * AND not interrupted AND no incident is active.
85   *   - `connected === false` → no current writer (retained data is historical)
86   *   - `sessionState === "interrupted"` → writing is frozen; the retained
87   *     token is incident evidence, not live authority
88   *   - `incident !== null` → an incident takes precedence; no writer claim
89   *
90   * The caller should render a `STREAM ENDED` / `WRITING FROZEN` /
91   * `SESSION INTERRUPTED` word instead. The retained token may still be
92   * displayed as incident evidence — just not as an active writer badge.
(lines omitted)
99    if (!state.connected) return false;
(lines omitted)
129  export function livenessWord(state: BrokerSnapshot | null): string {
130    if (!state) return "STREAM ENDED";
131    if (state.connected === null) return "UNKNOWN";
132    if (!state.connected) return "STREAM ENDED";
133    if (state.sessionState === "interrupted") return "WRITING FROZEN";
134    if (state.incident !== null) return "WRITING FROZEN";
135    return "LIVE";
(lines omitted)

apps/madbridge/src/tui/components/StatusBar.tsx

(lines omitted)
43    const line = buildStatusLine({
44      connected,
45      sessionWord: state?.sessionState ?? "—",
46      ownerWord: describeOwner(state),
47      pendingCount: state?.pendingApprovals?.length ?? 0,
48      // Finding 2 fix: use the actual latest projected ledger sequence (max
(lines omitted)
106    const connToken = input.connected === null ? "UNKNOWN" : input.connected ? "CONNECTED" : "NOT CONNECTED";
(lines omitted)
347  function describeOwner(state: BrokerSnapshot | null): string {
348    if (!state) return "none";
349    const o = state.ownershipState;
350    const w = state.activeWriter;
351    const tok = state.fencingToken;
352    const suffix = tok === null ? " (token —)" : tok > 0 ? " #" + String(tok) : " (token none)";
353    switch (o) {
354      case null:
355        return "UNKNOWN";
356      case "free":
357        return "free";
358      case "owned":
359        return (w ?? "unknown") + suffix;
360      case "transfer-requested":
361        return "transfer-req" + suffix;
362      case "sender-released":
363        return "released" + suffix;
364      case "receiver-validating":
365        return "validating";
366      case "rejected":
367        return "rejected";
368    }
369  }
(lines omitted)

apps/madbridge/src/tui/live/subscribe.ts

(lines omitted)
17            const snapshot = await client.getSnapshot();
18            if (signal.aborted) return;
19            next = clientSnapshotToProjection(snapshot);
20          } catch {
21            if (last && !signal.aborted) listener({ ...last, connected: false });
22            return;
23          }
24
25          const closed = next.connected === false;
26          if (closed || !isDeepStrictEqual(last, next)) {
27            last = next;
28            listener(next);
29          }
30          if (closed || signal.aborted) return;
31          await waitForSnapshotTick(signal);
32        }
33      }
34
35      // A listener that throws also ends its own subscription.
36      void read().catch(() => controller.abort());
37      return () => controller.abort();
(lines omitted)

apps/madbridge/src/tui/App.tsx

(lines omitted)
114  interface AppProps {
115    /** External subscribe function to receive immutable broker snapshots. */
116    subscribe?: (listener: (snapshot: BrokerSnapshot) => void) => () => void;
117    /** PTY write callback — bytes go to the focused PTY. */
118    onPtyWrite?: (data: string) => void;
119    /** Approval resolution callback — sends typed event to broker. */
120    onApprovalResolve?: (event: ApprovalRequestEvent) => void;
121    /** Quit callback. */
122    onQuit?: () => void;
123    /** Fixture mode — permanently labels the view as fixture data. */
124    fixture?: boolean;
125    /** OMP catalog loader override (tests inject a deterministic stub; the
126     * production default shells out to the public `omp models ls --json`
127     * CLI once at mount). LOCAL UI data only. */
128    catalogLoader?: typeof loadOmpCatalog;
129  }
130
131  export function App({ subscribe, onPtyWrite, onApprovalResolve, onQuit, fixture = false, catalogLoader }: AppProps) {
(lines omitted)
163    const handlePtyWrite = useCallback((data: string) => {
164      onPtyWrite?.(data);
(lines omitted)
(lines omitted)
313          onPtyWrite: handlePtyWrite,
(lines omitted)

apps/madbridge/test/tui-governance-surfaces.test.tsx

(lines omitted)
481    test("15. Bare terminal bytes still reach the PTY byte-identically", async () => {
(lines omitted)
483      const subscribe = makeSubscribe(makeSnapshot());
484      const setup = await testRender(
485        <App subscribe={subscribe} onPtyWrite={(d) => ptyWrites.push(d)} />,
486        { width: 120, height: 34 },
487      );
488      try {
489        // Bare 'a' should pass through to PTY
490        setup.mockInput.pressKey("a");
491        await setup.flush();
(lines omitted)
493      } finally {
494        setup.renderer.destroy();
495      }
496    });
497
498    test("16. Seat keys are the default Alt+1/2/3; pane focus moved to Alt+4/5", () => {
(lines omitted)
974    test("43. No timer, animation, spinner, or timeline mechanism is introduced", () => {
975      // Re-use the Phase 1 static-source scan. This test fails if any forbidden
976      // timer/animation mechanism is added under src/tui/.
977      const { existsSync, readFileSync, readdirSync } = require("node:fs");
978      const { join } = require("node:path");
(lines omitted)
982        for (const entry of readdirSync(dir, { withFileTypes: true })) {
983          const fullPath = join(dir, entry.name);
984          if (entry.isDirectory()) {
985            results.push(...listSourceFiles(fullPath));
986          } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
987            results.push(fullPath);
988          }
989        }
990        return results;
991      }
992      const tuiDir = join(process.cwd(), "apps/madbridge/src/tui");
993      const files = listSourceFiles(tuiDir);
994      expect(files.length).toBeGreaterThan(0);
(lines omitted)
996        /\bsetTimeout\b/,
997        /\bsetInterval\b/,
998        /\brequestAnimationFrame\b/,
999        /\bclearTimeout\b/,
1000        /\bclearInterval\b/,
(lines omitted)
1005      for (const file of files) {
1006        const source = readFileSync(file, "utf8");
1007        for (const pattern of forbidden) {
1008          if (pattern.test(source)) {
1009            throw new Error(`Forbidden pattern ${String(pattern)} found in ${file}`);
1010          }
1011        }
1012      }
1013    });
(lines omitted)

apps/madbridge/test/pty-focus.test.tsx

(lines omitted)
61      // Updated per Founder commission GLM-20260918-FOUNDER-TUI-SEATS:
62      // Alt+1/2/3 are seat keys; antigravity moved to Alt+4, events to Alt+5.
63      // alt+1 IS a global action (terminal-deliverable Alt+digit)
64      expect(isGlobalAction("alt+1", bindings)).toBe(true);
65      expect(isGlobalAction("alt+2", bindings)).toBe(true);
66      expect(isGlobalAction("alt+3", bindings)).toBe(true);
67      expect(isGlobalAction("alt+4", bindings)).toBe(true);
68      expect(isGlobalAction("alt+5", bindings)).toBe(true);
(lines omitted)
73      // resolveKey returns the action for alt+ prefixed keys
74      expect(resolveKey("alt+1", bindings)).toBe("seat-builder");
75      expect(resolveKey("alt+2", bindings)).toBe("seat-architect");
76      expect(resolveKey("alt+3", bindings)).toBe("seat-operator");
77      expect(resolveKey("alt+4", bindings)).toBe("focus-antigravity");
78      expect(resolveKey("alt+5", bindings)).toBe("focus-events");
(lines omitted)

test/phase3a/harness-separation.test.ts

(lines omitted)
16  const ROUTER_IMPORTER = "apps/madbridge/test/pty-focus.test.tsx";
(lines omitted)
20  // Drift requires review; these are expression exceptions, never file exclusions.
21  const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> = {
(lines omitted)
23    "packages/protocol/src/adapter-registry.ts": {
(lines omitted)
25    },
26    "packages/protocol/src/lifecycle-events.ts": {
(lines omitted)
28    },
29    "packages/supervisor/src/build.ts": {
(lines omitted)
31    },
32  };
(lines omitted)

apps/madbridge/test/tui-writers-stage.test.tsx

(lines omitted)
968  describe("12. No new timer, animation, or timeline imports exist under src/tui/", () => {
(lines omitted)
972      for (const entry of readdirSync(dir, { withFileTypes: true })) {
973        const fullPath = join(dir, entry.name);
974        if (entry.isDirectory()) {
975          results.push(...listSourceFiles(fullPath));
976        } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
977          results.push(fullPath);
978        }
979      }
980      return results;
981    }
982
983    test("no setTimeout/setInterval/requestAnimationFrame/spinner imports", () => {
984      const tuiDir = join(process.cwd(), "apps/madbridge/src/tui");
985      const files = listSourceFiles(tuiDir);
986      expect(files.length).toBeGreaterThan(0);
987
(lines omitted)
989        /\bsetTimeout\b/,
990        /\bsetInterval\b/,
991        /\brequestAnimationFrame\b/,
992        /\bclearTimeout\b/,
993        /\bclearInterval\b/,
994        // Animation/spinner libraries
(lines omitted)
999
1000      for (const file of files) {
1001        const source = readFileSync(file, "utf8");
1002        for (const pattern of forbidden) {
1003          if (pattern.test(source)) {
1004            // tslint:disable-next-line: no-console
1005            throw new Error(`Forbidden pattern ${String(pattern)} found in ${file}`);
1006          }
1007        }
1008      }
1009    });
1010  });
(lines omitted)

test/phase3a/architecture-phase3a.test.ts

(lines omitted)
542    const sourceFile = ts.createSourceFile(
543      fileName,
544      sourceText,
545      ts.ScriptTarget.Latest,
546      /* setParentNodes */ true,
547      scriptKindFor(fileName),
548    );
(lines omitted)
550
551    const visit = (node: ts.Node): void => {
552      const elements =
553        mapInitializerKeyElements(node) ??
554        collectionInitializerElements(node) ??
555        mutableCollectionWriteArguments(node);
556      if (elements) {
557        const carriesRegisteredSurface = elements.some((el) => {
558          const unwrapped = unwrapTransparentExpression(el);
559          return (
560            ts.isStringLiteralLike(unwrapped) &&
561            REGISTERED_SURFACE_IDS.has((unwrapped as ts.StringLiteralLike).text)
562          );
563        });
564        if (carriesRegisteredSurface) {
565          const start = node.getStart(sourceFile);
566          lineNumbers.push(sourceFile.getLineAndCharacterOfPosition(start).line + 1);
567        }
568      }
569      node.forEachChild(visit);
570    };
571    visit(sourceFile);
572    return lineNumbers;
573  }
574
575  /**
576   * Scan production source under a repository root for surface-admission
577   * collections outside the sanctioned adapter registry, excluding the
578   * untouched packages/policy/ package. Detection is the union of two
579   * strategies: the legacy identifier-name pattern (KNOWN_SURFACES,
580   * allowedSurfaces, SUPPORTED_SURFACES) and syntax-aware detection of any
581   * collection carrying a registered SurfaceId value — by initializer or by
582   * mutable write — whatever its name. Fails closed if packages/ or apps/ is
583   * absent.
584   */
(lines omitted)
586    if (!existsSync(join(root, "packages")) || !existsSync(join(root, "apps"))) {
587      throw new Error(
588        `Phase 3A admission-source scan: required packages/ and apps/ roots not found under ${root}`,
589      );
590    }
(lines omitted)
592    for (const file of enumerateProductionFiles(root)) {
593      const rel = toPortablePath(relative(root, file));
594      if (rel === ADAPTER_REGISTRY_PATH) continue;
595      if (rel.startsWith("packages/policy/")) continue;
596
597      const sourceText = readFileSync(file, "utf8");
598      const lines = sourceText.split(/\r?\n/);
599      const flaggedLines = new Set<number>();
600      lines.forEach((lineText, idx) => {
601        if (ADMISSION_LIST_PATTERN.test(lineText)) {
602          flaggedLines.add(idx + 1);
603        }
604      });
605      for (const lineNumber of findRegisteredSurfaceCollectionsInSource(sourceText, rel)) {
606        flaggedLines.add(lineNumber);
607      }
608
(lines omitted)
611      }
612    }
613    return violations.sort((a, b) =>
614      a.file === b.file ? a.line - b.line : a.file < b.file ? -1 : 1,
615    );
616  }
617
618  describe("Phase 3A admission authority", () => {
619    test("adapter-registry.ts is the only production admission source", () => {
620      const violations = scanAdmissionSources(REPO_ROOT);
(lines omitted)
622    });
(lines omitted)
1780  describe("Task 34: no broker.sock path is reachable", () => {
1781    // 15s test budget: the plan's 5,000 ms deadline belongs to EACH child,
1782    // and this test launches two children in sequence (CLI + TUI).
1783    test("launching every production entry point in bounded isolated processes creates no broker.sock", async () => {
1784      // ── CLI path: `start --json` must fail closed with the exact gate body.
1785      await runEntryPath({
(lines omitted)
1787        assertOutcome: assertCliOutcome,
1788      });
1789
1790      // ── TUI path (default production form, no --fixture): readiness is the
1791      // StatusBar's honest disconnected word. DEVIATION FROM PLAN LITERAL
1792      // (disclosed): Step 1 names wide-form "NOT CONNECTED"; at this base the
1793      // piped renderer emits the medium-format token "NOCONN" (same fact,
1794      // same buildStatusLine path), empirically probed at the task base.
1795      // The TUI is terminated by the runner (SIGTERM/SIGKILL discipline);
1796      // those are expected cleanup outcomes, not unexpected signals.
1797      await runEntryPath({
(lines omitted)
1799        readiness: (out) => out.includes("NOCONN"),
(lines omitted)
1801      });
1802    }, 15_000);
(lines omitted)
1994  const CHILD_ENV = { PATH: process.env.PATH ?? "" };
1995  const TUI_READY = (out: Buffer): boolean => out.includes("NOCONN");
(lines omitted)

test/phase3b/separation.test.ts

(lines omitted)
1  import { expect, test } from "bun:test";
2  import { readdirSync, readFileSync } from "node:fs";
3  import { join } from "node:path";
4  import ts from "typescript";
5  import { runTransactionalBuild } from "../../packages/supervisor/src/index";
6  import { closeOfflineBuild, offlineStart } from "./offline";
7
8  const apps = join(import.meta.dir, "../../apps");
(lines omitted)
11
12  function* appSources(directory: string): Generator<string> {
13    for (const entry of readdirSync(directory, { withFileTypes: true })) {
14      const path = join(directory, entry.name);
15      if (entry.isDirectory() && entry.name !== "node_modules") yield* appSources(path);
(lines omitted)
17    }
18  }
19
20  function usesSeam(node: ts.Node): boolean {
21    if (ts.isImportSpecifier(node) || ts.isExportSpecifier(node)) {
22      return seams.has((node.propertyName ?? node.name).text);
23    }
24    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)
25        && internalModule.test(node.moduleSpecifier.text) && node.importClause?.namedBindings
26        && ts.isNamespaceImport(node.importClause.namedBindings)) return true;
27    if (ts.isExportDeclaration(node) && !node.exportClause && node.moduleSpecifier
28        && ts.isStringLiteral(node.moduleSpecifier) && internalModule.test(node.moduleSpecifier.text)) return true;
29    if (ts.isPropertyAccessExpression(node) && seams.has(node.name.text)) return true;
30    if (ts.isElementAccessExpression(node) && ts.isStringLiteral(node.argumentExpression)
31        && seams.has(node.argumentExpression.text)) return true;
32    if (ts.isBindingElement(node)) {
33      const key = node.propertyName ?? node.name;
34      if ((ts.isIdentifier(key) || ts.isStringLiteral(key)) && seams.has(key.text)) return true;
35    }
36    return ts.forEachChild(node, child => usesSeam(child) || undefined) === true;
37  }
38
39  test("application code imports neither internal supervisor seam", () => {
(lines omitted)
41    for (const path of appSources(apps)) {
42      const text = readFileSync(path, "utf8");
43      if (!text.includes("WithDependencies") && !text.includes("supervisor/src/")) continue;
44      if (usesSeam(ts.createSourceFile(path, text, ts.ScriptTarget.Latest))) imports.push(path);
45    }
(lines omitted)
47  });
48
49  test("the original public build still fails closed without an attester", async () => {
50    const fixture = offlineStart();
51    try {
52      const result = await runTransactionalBuild({
53        sessionId: "offline-no-attester", envelope: fixture.envelope, plan: fixture.plan,
54      });
55      try {
56        expect(result.ok).toBe(false);
57        if (!result.ok) {
58          expect(result.failedStep).toBe("reattest");
59          expect(result.failure).toBe("reattestation_failed");
60          expect(result.detail).toBe("step=reattest execution=builder failure=reattestation_failed");
61          expect(result.partialState.completedSteps).not.toContain("activate");
62        }
63      } finally { await closeOfflineBuild(result); }
64    } finally { fixture.dispose(); }
65  }, 15000);
(lines omitted)

Second-pane references at the base, including the stable action

(lines omitted)
HEAD:apps/madbridge/src/tui/App.tsx:19:// Claude, Antigravity, and Events focus are ALL inert.
HEAD:apps/madbridge/src/tui/App.tsx:28:import { AntigravityPane } from "./panes/AntigravityPane";
HEAD:apps/madbridge/src/tui/App.tsx:76:  antigravityOutput: string;
HEAD:apps/madbridge/src/tui/App.tsx:86:  | { type: "pty-output"; pane: "claude" | "antigravity"; data: string };
HEAD:apps/madbridge/src/tui/App.tsx:109:      return { ...state, antigravityOutput: state.antigravityOutput + action.data };
HEAD:apps/madbridge/src/tui/App.tsx:145:    antigravityOutput: "",
HEAD:apps/madbridge/src/tui/App.tsx:341:  // The docked agent is whichever of Claude/Antigravity is NOT focused.
HEAD:apps/madbridge/src/tui/App.tsx:345:  const antigravityFocused = ui.focus === "antigravity";
HEAD:apps/madbridge/src/tui/App.tsx:411:            {antigravityFocused && (
HEAD:apps/madbridge/src/tui/App.tsx:412:              <AntigravityPane active={true} state={state} ptyOutput={ui.antigravityOutput} />
HEAD:apps/madbridge/src/tui/App.tsx:423:              // Antigravity is focused → Claude is docked.
HEAD:apps/madbridge/src/tui/App.tsx:426:            {!antigravityFocused && !governanceFocused && !eventsFocused && (
HEAD:apps/madbridge/src/tui/App.tsx:427:              // Claude is focused → Antigravity is docked.
HEAD:apps/madbridge/src/tui/App.tsx:428:              <DockStrip surface="antigravity" state={state} ptyOutput={ui.antigravityOutput} />
HEAD:apps/madbridge/src/tui/App.tsx:434:                <DockStrip surface="antigravity" state={state} ptyOutput={ui.antigravityOutput} />
HEAD:apps/madbridge/src/tui/App.tsx:441:                <DockStrip surface="antigravity" state={state} ptyOutput={ui.antigravityOutput} />
HEAD:apps/madbridge/src/tui/App.tsx:452:            {antigravityFocused && (
HEAD:apps/madbridge/src/tui/App.tsx:453:              <AntigravityPane active={true} state={state} ptyOutput={ui.antigravityOutput} />
HEAD:apps/madbridge/src/tui/components/DockStrip.tsx:48://   1. agent identity            (ANTIGRAVITY / CLAUDE CODE)
HEAD:apps/madbridge/src/tui/components/PaneTabs.tsx:26:  { target: "antigravity", label: "AGY" },
HEAD:apps/madbridge/src/tui/components/agent-identity.ts:14:export type AgentSurface = CliSurface; // "claude-code" | "antigravity"
HEAD:apps/madbridge/src/tui/components/agent-identity.ts:40:  return surface === "claude-code" ? "CLAUDE CODE" : "ANTIGRAVITY";
HEAD:apps/madbridge/src/tui/hooks/useKeyboard.ts:38:        case "focus-antigravity":
HEAD:apps/madbridge/src/tui/hooks/useKeyboard.ts:39:          opts.onFocusChange("antigravity");
HEAD:apps/madbridge/src/tui/keybindings.ts:4:// Override via FOUNDER_TUI_KEYS env var: "alt+1:focus-claude,alt+2:focus-antigravity,..."
HEAD:apps/madbridge/src/tui/keybindings.ts:13:// Alt+4 (antigravity) and Alt+5 (events); "focus-claude" and
HEAD:apps/madbridge/src/tui/keybindings.ts:23:  | "focus-antigravity"
HEAD:apps/madbridge/src/tui/keybindings.ts:40:  { key: "alt+4", action: "focus-antigravity" },
HEAD:apps/madbridge/src/tui/keyboard-router.ts:84: * 3. focus === "governance" (Claude, Antigravity, Events are ALL inert)
HEAD:apps/madbridge/src/tui/keyboard-router.ts:101:  // 3. Only governance focus authorizes — Claude, Antigravity, Events
HEAD:apps/madbridge/src/tui/keyboard-router.ts:165:      case "focus-antigravity":
HEAD:apps/madbridge/src/tui/keyboard-router.ts:166:        callbacks.onFocusChange("antigravity");
HEAD:apps/madbridge/src/tui/keyboard-router.ts:167:        return { ...state, focus: "antigravity" };
HEAD:apps/madbridge/src/tui/main.tsx:41:  const antigravity: ExecutionIdentity = {
HEAD:apps/madbridge/src/tui/main.tsx:42:    execution_id: "exec-antigravity",
HEAD:apps/madbridge/src/tui/main.tsx:44:    surface: parseSurfaceId("antigravity"),
(lines omitted)
HEAD:apps/madbridge/src/tui/panes/AntigravityPane.tsx:1:// apps/madbridge/src/tui/panes/AntigravityPane.tsx
HEAD:apps/madbridge/src/tui/panes/AntigravityPane.tsx:2:// Antigravity stage pane — projects the Antigravity execution surface.
HEAD:apps/madbridge/src/tui/panes/AntigravityPane.tsx:5://   - "ANTIGRAVITY" label
HEAD:apps/madbridge/src/tui/panes/AntigravityPane.tsx:7://   - "WRITER tok#N" only when Antigravity's execution_id === state.activeWriter
HEAD:apps/madbridge/src/tui/panes/AntigravityPane.tsx:14:// Antigravity used border={true}).
HEAD:apps/madbridge/src/tui/panes/AntigravityPane.tsx:27:export interface AntigravityPaneProps {
HEAD:apps/madbridge/src/tui/panes/AntigravityPane.tsx:33:export function AntigravityPane({ active, state, ptyOutput }: AntigravityPaneProps) {
HEAD:apps/madbridge/src/tui/panes/AntigravityPane.tsx:34:  const surface = "antigravity" as const;
(lines omitted)
HEAD:apps/madbridge/src/tui/panes/ClaudePane.tsx:12:// Border: borderStyle="single" consistently (matches AntigravityPane).
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:62:  const agy = state.executions?.find((e) => e.surface === "antigravity");
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:81:  rows.push("Antigravity: " + (agy?.execution_id ?? "—"));
HEAD:apps/madbridge/src/tui/types.ts:13:export type FocusTarget = "claude" | "antigravity" | "governance" | "events";
HEAD:apps/madbridge/src/tui/keybindings.ts:4:// Override via FOUNDER_TUI_KEYS env var: "alt+1:focus-claude,alt+2:focus-antigravity,..."
HEAD:apps/madbridge/src/tui/keybindings.ts:13:// Alt+4 (antigravity) and Alt+5 (events); "focus-claude" and
HEAD:apps/madbridge/src/tui/keybindings.ts:23:  | "focus-antigravity"
HEAD:apps/madbridge/src/tui/keybindings.ts:40:  { key: "alt+4", action: "focus-antigravity" },
HEAD:apps/madbridge/test/pty-focus.test.tsx:62:    // Alt+1/2/3 are seat keys; antigravity moved to Alt+4, events to Alt+5.
HEAD:apps/madbridge/test/pty-focus.test.tsx:67:    expect(isGlobalAction("alt+4", bindings)).toBe(true);
HEAD:apps/madbridge/test/pty-focus.test.tsx:77:    expect(resolveKey("alt+4", bindings)).toBe("focus-antigravity");
HEAD:apps/madbridge/test/pty-focus.test.tsx:86:    process.env.FOUNDER_TUI_KEYS = "alt+a:focus-claude,alt+s:focus-antigravity";
HEAD:apps/madbridge/test/pty-focus.test.tsx:90:    expect(resolveKey("alt+s", bindings)).toBe("focus-antigravity");
(lines omitted)

The two source pins match line 30 and line 22 respectively

(lines omitted)
0b329d97e88a13bd58902fe7dd1afe971d52c61bbf310862230465fd1fdd3553  packages/supervisor/src/build.ts
2faefe54d7c9be2051bce621629203072515263d58bc69b31bd2fe927faedb01  apps/madbridge/test/pty-focus.test.tsx
(lines omitted)

The A10 blobs for runtime-harness.ts, preflight.ts and preflight.test.ts are respectively 8e63d73f723c3fa7eea2e300c3e378e107957b0b, 2edb02c049dea7b65e5d546bdac35b0933eeb95b and 67f95abdcf8fa75f8c296bc8cbf4fb5e378ce214.

Precondition 4. Logs 016, 035 and 043 show the supervisor imports, live-module imports, callers and test seam names. Application imports of the supervisor entry point occur in live/composition.ts and live/subscribe.ts. Application call matches for the composer and subscriber are their definitions. Production has no importer of either broker module's test seams.

(lines omitted)
HEAD:apps/madbridge/src/tui/live/composition.ts:6:  type PartialBuildState, type PreflightInput } from "../../../../../packages/supervisor/src/index";
HEAD:apps/madbridge/src/tui/live/subscribe.ts:3:import { waitForSnapshotTick } from "../../../../../packages/supervisor/src/index";
HEAD:packages/adapter-madv-surface/test/exit-causes.test.ts:7:import { runLiveTransactionalBuild, runPurePreflight } from "../../supervisor/src/index";
HEAD:test/phase3b/child-end.ts:6:import { runLiveTransactionalBuild, runPurePreflight } from "../../packages/supervisor/src/index";
HEAD:test/phase3b/offline.ts:5:import { rollbackBuild, type BuildResult, type LaunchPlan } from "../../packages/supervisor/src/index";
HEAD:test/phase3b/preflight-input.ts:5:import type { PreflightInput } from "../../packages/supervisor/src/index";
HEAD:test/phase3b/scenarios.ts:5:import { runPurePreflight, runLiveTransactionalBuild } from "../../packages/supervisor/src/index";
HEAD:test/phase3b/separation.test.ts:5:import { runTransactionalBuild } from "../../packages/supervisor/src/index";
HEAD:apps/madbridge/src/tui/live/composition.ts:7:import { settingsSources } from "./settings-sources";
HEAD:apps/madbridge/src/tui/live/settings-sources.ts:3:import { managedSettingsDirectory } from "./managed-settings";
HEAD:apps/madbridge/src/tui/live/subscribe.ts:5:import { clientSnapshotToProjection } from "./projection";
HEAD:scripts/phase3b/recorded-frames.tsx:8:import { composeLiveSession } from "../../apps/madbridge/src/tui/live/composition";
HEAD:scripts/phase3b/recorded-frames.tsx:9:import { clientSnapshotToProjection } from "../../apps/madbridge/src/tui/live/projection";
HEAD:test/phase3b/child-end.ts:5:import { createStartAttesters, composeLiveSession } from "../../apps/madbridge/src/tui/live/composition";
HEAD:test/phase3b/projection.test.ts:4:import { clientSnapshotToProjection as project } from "../../apps/madbridge/src/tui/live/projection";
HEAD:test/phase3b/scenarios.ts:4:import { composeLiveSession, createStartAttesters } from "../../apps/madbridge/src/tui/live/composition";
HEAD:test/phase3b/settings-sources.test.ts:4:import { managedSettingsDirectory } from "../../apps/madbridge/src/tui/live/managed-settings";
HEAD:test/phase3b/settings-sources.test.ts:5:import { settingsSources } from "../../apps/madbridge/src/tui/live/settings-sources";
HEAD:test/phase3b/subscribe.test.ts:3:import { subscribeToClient } from "../../apps/madbridge/src/tui/live/subscribe";
HEAD:apps/madbridge/src/tui/live/composition.ts:54:export async function composeLiveSession(start: Start): Promise<Result> {
HEAD:apps/madbridge/src/tui/live/subscribe.ts:7:export function subscribeToClient(client: BrokerClient) {
HEAD:scripts/phase3b/recorded-frames.tsx:17:    const outcome = await composeLiveSession({ ...f.start, async present(presented) {
HEAD:test/phase3b/child-end.ts:91:      const built = await composeLiveSession({ ...f.start, present: client => observeActive(client) });
HEAD:test/phase3b/scenarios.ts:58:      outcome = await composeLiveSession({ envelope: f.envelope, preflight: { ...f.input, signal: controller.signal },
HEAD:test/phase3b/scenarios.ts:124:    const starting = composeLiveSession({
HEAD:test/phase3b/subscribe.test.ts:44:  const off = subscribeToClient(source.client)(frame => { seen.push(frame); });
HEAD:test/phase3b/subscribe.test.ts:62:    const off = subscribeToClient(source.client)(frame => { seen.push(frame); });
HEAD:test/phase3b/subscribe.test.ts:78:    const off = subscribeToClient(source.client)(frame => { seen.push(frame); });
HEAD:test/phase3b/subscribe.test.ts:90:  const off = subscribeToClient(source.client)(frame => { seen.push(frame); });
HEAD:test/phase3b/subscribe.test.ts:99:  const stop = subscribeToClient(parked.client)(frame => { late.push(frame); });
(lines omitted)

(lines omitted)
HEAD:packages/supervisor/test/build-rollback.test.ts:34:import * as supervisorIndex from "../src/index";
HEAD:packages/supervisor/test/live-port.test.ts:2:import { runLiveTransactionalBuild, type LiveReattestationInput } from "../src/index";
HEAD:packages/supervisor/test/snapshot-timer.test.ts:3:import { waitForSnapshotTick } from "../src/index";
(lines omitted)
(lines omitted)

The checks prescribed by the third resume passed in logs 299–313. The record includes all four matching prompt files, the governed CLI, R3 head, branch, worktree hashes, prior halt reports, the numbered logs and the empty evidence directory before R4 resumed.
Prompt and resume hashes
ed699228da7e9924d7d175c89b0ca3d3accd1f1385b36e6cc41de9b0d8fbb1ca  builder-prompt-m3-codex-macbook.md
e7d8676a52790218b18997d9808f9c93731a2b2d2851762e73f58c3e7cc47d92  resume-m3-1-principal-break.md
5774d3f07e3c3475d539f027cdaef9ce76154403cd76b5a47d40f3ae33b6c6eb  resume-m3-2-declined-break.md
bddce6b1e9ea86017dbcace9cec2d76388468204cf60e78fd2b682332b3d29da  resume-m3-3-own-work.md

Fourth-resume checks passed in 521–533. Their source receipts and hashes are in section 12. Prompt manifest as verified at resume

ed699228da7e9924d7d175c89b0ca3d3accd1f1385b36e6cc41de9b0d8fbb1ca  builder-prompt-m3-codex-macbook.md
e7d8676a52790218b18997d9808f9c93731a2b2d2851762e73f58c3e7cc47d92  resume-m3-1-principal-break.md
5774d3f07e3c3475d539f027cdaef9ce76154403cd76b5a47d40f3ae33b6c6eb  resume-m3-2-declined-break.md
bddce6b1e9ea86017dbcace9cec2d76388468204cf60e78fd2b682332b3d29da  resume-m3-3-own-work.md
ba7d3036565ad4beaab34b551c6ce453a3913374d057fb8c209a0ca6ca8ecda3  resume-m3-4-golden-grids-r2.md

3. Baseline

Log 023 installed 51 packages. Log 024 verified the lockfile at
a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830
before and after installation and restored the executable bit on
packages/founder-act/src/main.ts. The tree was clean. Log 025 completed
the no-emit type check with no diagnostic. Log 027 released the suite
at load 1.93. Log 031 began with load 1.67. Log 045 lists each test,
its full name and its result. All 2139 tests across 168 files passed.

(lines omitted)
 2139 pass
 0 fail
 28427 expect() calls
(lines omitted)
The final Bun line, including its bracketed duration, is in the original log. Ran 2139 tests across 168 files in 279.25 seconds.
023-baseline-install.log SHA-256 8aca2e29a721f36542ff9b3d51000b93d29b8747e1fa291bb5cc7161323b647d | UTC 18:37:28 to 18:37:28 | 13:37  up 6 days,  5:05, 1 user, load averages: 2.48 2.54 2.70 | exit 0
024-install-tree.log SHA-256 fa9c679c98c6e0c377d96077d60349392a22ab6cecb78e81cbfad5eb19727655 | times in source | 13:37  1 user, load averages: 2.48 2.54 2.70 | exit 0
025-baseline-typecheck.log SHA-256 ac89afc7e81ff3b6947156cb6e15ee3eb46b946b175395017cc04ad3a8011da1 | UTC 18:37:54 to 18:37:58 | 13:37  up 6 days,  5:05, 1 user, load averages: 2.76 2.59 2.71 | exit 0
026-suite-runtime.log SHA-256 88c66db5be8d852be8bf7dd41a6aa1a0eb8eed75e830effee7d6ee5cfbf3c404 | UTC 18:39:28 to 18:39:29 | 13:39  up 6 days,  5:07, 1 user, load averages: 2.48 2.53 2.67 | exit 0
027-baseline-wait.log SHA-256 4dffd18ee7885f28dcc502066dae49de78db9a8bd163dfe8628bde46139b47da | UTC 18:39:37 to 18:40:07 | 13:39  1 user, load averages: 2.39 2.51 2.66 | exit 0
031-baseline-test.log SHA-256 77576fb28d74bc68227619d41f2f69ce3deb4565fc7b7f4633ea5df75c229431 | UTC 18:40:56 to 18:45:35 | 13:40  up 6 days,  5:08, 1 user, load averages: 1.67 2.26 2.55 | exit 0
045-base-list.log SHA-256 97b0a672be6ef2657f92aa750eb8075bcf76167e0c7d562bd08763b211172a1a | times in source | 13:45  1 user, load averages: 2.63 2.64 2.65 | exit 0

4. R1 through R8, tests and deliberate breaks

R1. Both attesters retain their single fact loop. After the parser reads an output fact past handover, the live build supplies its bytes, session and per-execution sequence to the founder client's existing sequence check. A whole fact read during attestation stays with attestation, including a trailing partial line. Only the live build retains the production delivery function.

R2. PaneRetention stores owned bytes in arrival order for each execution. CR and LF terminate lines, CRLF counts once across frames and an unterminated nonempty final line counts once. At 10,000 lines or 2,097,152 bytes the oldest content drops first. Surviving bytes of a partial frame and a retained empty-frame marker each count as one frame. App and DockStrip subscribe to and render independent retained streams when given a client.

R3. The live founder client checks legality and serializes input and resize per execution. sendAcknowledgedCommand registers the real acknowledgement wait before writing. Its 250 ms monotonic deadline carries the original command start into direct containment and the existing 5-second outer bound. The build interrupts with pty_host_failure on host failure. The madv-surface byte sender begins the parser request and evidence deadline before sending. The execution principals and the original build keep the base request path. The build retains ownership of the private callbacks.

R4. PaneLine edits the focused surface's text, encodes one nonempty submission, and uses the snapshot read at submit. The UI sends changes in the active writer's measured pane size and displays refusal codes in uppercase with spaces. It displays NO TOKEN for a missing fencing token. The client-free prop path preserves byte pass-through. The recording pane client covers editing and resize, scripted refusals cover status words, and both real-host stand-ins cover end-to-end submission and nonwriter refusal.

R5. App, main, types, keybindings, keyboard-router, useKeyboard, both panes, GovernancePane, DockStrip, PaneTabs and agent-identity now resolve or name the madv-surface pane. MadvSurfacePane retains its original filename. Alt+4 and focus-antigravity are preserved. Existing synthetic execution identifiers and every base test name remain stable. The new focus test checks the dock, focused header, model and writer token.

R6. StatusBar.describeOwner and its compact formatting show STREAM ENDED for ended projections. GovernancePane uses the same liveness word for its authority row. The two stages and DockStrip already use livenessWord and isActiveWriter. IncidentBand retains historical evidence and EventLog renders historical entries. Separate scripted reads exercise a reader failure and a closed client. Both transfer kinds and both writers exercise the null-token readers. The pacing test observes the actual production promise and its settlement in the first microtask after unsubscribe.

R7. unsafeTestOnlyInjectHostOutput admits a copy of either complete invalid Phase 3A fixture on a known host, one at a time, at a clean read boundary. A controlled output wakes the existing stdout read. The decoder, broadcast, monitor and broker produce their normal verdicts. The two surfaces and two faults each produced the appropriate MalformedFrameError, surface failure and identity_mismatch interruption, and only the positive control reached the client. The madv-surface cause comes from reportFailure. Its private parser reason is established from the actual executed catch site. The test helper drains the expected decoder error and observes exit of its spawned host.

R8. scripts/phase3b/m3-evidence.tsx records ordered frames, child receipt and acknowledgement timing, rendered replies and nonwriter refusals, retention counts, ended projections and malformed-frame outcomes. It writes six source files outside the repository. The packet identifies each producer and transcript hash.

Each B18 test and its intended change follows. Test names match the result list in 515-halt-test-comparison.log · SHA-256 c4efb5496aaa9bdc09f1ea44f8c44e0677580fb8f70169a25f8c97bea3f2a250.
R1 — 3 — producer.test.ts — the live producer delivers contiguous monitor facts for each execution and excludes attestation — Start outputSeq at zero. Deliver attestation output.
R1 — 3 — producer.test.ts — a refused output sequence interrupts the live session — Bypass the shared sequence check for a gap.
R1 and R7 — 4 — m3-separation.test.ts — production imports no private broker test seam — Plant a production import of the test frame producer, then of the host injection seam.
R2 — 1 — retention.test.tsx — interleaved output reaches each pane and dock in host order — Swap execution streams. Reverse two same-execution frames.
R2 — 2 — retention.test.tsx — the line cap drops oldest content and counts received and retained frames and bytes — Raise the line cap. Drop newest content.
R2 — 2 — retention.test.tsx — the byte cap retains the newest bytes including a partial frame — Raise the byte cap. Omit a retained count update.
R3 — 6 — dispatch.test.ts — both host commands reach the child and wait for the matching ack — Return success before the acknowledgement.
R3 — 6 — dispatch.test.ts — a missed acknowledgement contains the stopped host and interrupts the session — Suppress deadline escalation.
R3 — 6 — dispatch.test.ts — execution clients and the original build have no host bridge — Install a bridge on an execution client. Make an unbridged request write.
R3 — 7 — dispatch.test.ts — the madv byte sender begins a checked request and refuses a closed monitor — Skip beginRequest. Accept a closed sender.
R4 — 5 — line-input.test.tsx — only Enter submits one encoded focused line and other focus sends nothing — Send before Enter. Send an empty line.
R4 — 5 — line-input.test.tsx — only the active focused writer resizes at a changed pane size — Resize the nonwriter.
R4 — 6, 8 — usable-input.test.tsx — each submitted stream-json line produces a checked stand-in response in its pane — Send raw text.
R4 — 6 — usable-input.test.tsx — a nonwriter submission is unauthorized in its pane and never reaches the child — Display acceptance for the refusal.
R4 — 9 — line-input.test.tsx — each refusal is shown once without retry and no token sends nothing — Retry a refusal. Render a refusal as success.
R5 — 10 — madv-pane.test.tsx — Alt+4 focuses the madv-surface execution — Focus Claude or display its execution in the second pane.
R6 — 11 — ended-stream.test.tsx — failed and closed streams replace current authority in every reader — Present the retained writer as current.
R6 — 13 — ended-stream.test.tsx — transfer-requested and sender-released show a null token as absence — Render null as #0 during transfer.
R6 — 14 — pacing-settlement.test.ts — unsubscribe settles the pending pacing wait before its deadline — Leave the pacing wait pending.
R7 — 12 — malformed-host.test.ts — malformed payloads and unknown tags interrupt each live monitor without client bytes — Discard the injected input before decodeFact. Deliver malformed bytes to the client.

All listed completed break runs were restored to the committed per-file SHA-256. The run citations contain the full output, including literal timings and every assertion value. Excerpts with square brackets are cited by their source. Diff quotations omit trailing whitespace.

R1 zero-based output sequence
087-zero-diff.log · SHA-256 14db4f0b7f83ab55531a3e91d1836a7f4352f486c3f43808977eeaefb4f8322e
089-zero-test.log · SHA-256 b8334aae815412937e6ca5e0630e7bfbf31895effb62738ea1ac7864c7b51135
090-zero-restore.log · SHA-256 3a6579b3981e8b7895f085e3cba12ffc94d40a96658c06b812583f179889025f
(lines omitted)
error: offline observation deadline
      at observed (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/transport.ts:15:47)
      at async orderedTranscript (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/transport.ts:78:11)
      at async <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/producer.test.ts:8:18)
(lines omitted)
(fail) the live producer delivers contiguous monitor facts for each execution and excludes attestation
(pass) a refused output sequence interrupts the live session
Committed and restored SHA-256
1c1a766135f45c7bd1c07799f532fefd6ffdd2fadbe2c587821b233b45aa78bc  tui/packages/supervisor/src/build.ts

R1 delivered attestation output
093-pre-diff.log · SHA-256 c891dec1203d950633db90d3a1013029d36edc358232b9d58e114159db958f8e
095-pre-test.log · SHA-256 ce4beec7fac1eb89eafdec212624c402628871b1215068102ec547870c0fb7bd
096-pre-restore.log · SHA-256 9ab7b605a320e6849dcbfeeae581033ab76effe4572a17cd5271c146966c7d15
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/producer.test.ts:8:46)
(lines omitted)
error: expect(received).rejects.toThrow(expected)
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/producer.test.ts:20:81)
(lines omitted)
(fail) the live producer delivers contiguous monitor facts for each execution and excludes attestation
(fail) a refused output sequence interrupts the live session
Committed and restored SHA-256
ecbcf8c1a2e08134dddf60eec6df0526eb000dec53b013752f0fc8807d5204b4  tui/packages/adapter-claude-code/src/live.ts

R1 accepted a sequence gap
099-gap-diff.log · SHA-256 25b70a115b68c84f08f9a3037cd6a56d311c7325eacb64c1cb4072a0d9d700e0
101-gap-test.log · SHA-256 7ab11023025d338b77c4a06987716f522b6404460f540bc0aabc4bfac14f9032
102-gap-restore.log · SHA-256 aa771ddd6bac7f511cc75f16e025837c911fc5271eefd4d1f1e45c1ec6f4a58a
(lines omitted)
error: expect(received).rejects.toThrow(expected)
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/producer.test.ts:20:81)
(lines omitted)
(pass) the live producer delivers contiguous monitor facts for each execution and excludes attestation
(fail) a refused output sequence interrupts the live session
Committed and restored SHA-256
ca03df707bb74af99205c716c230ab997e2e7cb1d38703bfd9d61f737b6da219  tui/packages/broker/src/in-process-client.ts

R1 production seam import
105-seam-diff.log · SHA-256 4c2946e5edc0a304e586b998214374633285495e44a5f9b93278bd5584163724
107-seam-test.log · SHA-256 7e09fc99b494afa88b42b1c2bf59b95a975736bd0996fc9fe2d16cb9baf9bbf2
108-seam-restore.log · SHA-256 625998d27015b949e21f3772aa0cf9c5cf6b980eb66b354b0e90c7ce3b5a0bc1
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/m3-separation.test.ts:36:21)
(lines omitted)
(fail) production imports no private broker test seam
Committed and restored SHA-256
1c1a766135f45c7bd1c07799f532fefd6ffdd2fadbe2c587821b233b45aa78bc  tui/packages/supervisor/src/build.ts

R2 crossed pane streams
136-wrong-pane-diff.log · SHA-256 0157132a70d18a90af683f6f4fc7b158ea3b0b51152fecd9cb0f34dab9e1ca19
139-wrong-pane-test.log · SHA-256 40c53bc91f05d47a5ce5478ffb8f614bb12d31c7a724bcd7a4247ffc318340fc
140-wrong-pane-restore.log · SHA-256 3532d8aaab41066754c6f6cf88484b1e5f00322c6c144bdf83063e48d4070d67
(lines omitted)
error: expect(received).toContain(expected)
(lines omitted)
Expected to contain: "alpha bravo"
(lines omitted)
      at check (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/retention.test.tsx:22:73)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/retention.test.tsx:25:5)
(lines omitted)
(fail) interleaved output reaches each pane and dock in host order
(pass) the line cap drops oldest content and counts received and retained frames and bytes
(pass) the byte cap retains the newest bytes including a partial frame
Committed and restored SHA-256
8c98e2d14c8128f13741f47625bd2ce8e2b642aea457c1bd0fb5a4072a8381d1  tui/apps/madbridge/src/tui/App.tsx

R2 reordered same-execution frames
142-order-diff.log · SHA-256 42c16426a66f10c507f90c933632a623c496ef94f7ed428a728c5120109f72da
145-order-test.log · SHA-256 2d36c97230c06e1bcb7d8563c7a2fcf0db732092a07ca4d6f554bebaeb4b1b3b
146-order-restore.log · SHA-256 e59befa0e6ba0cdddc8babf5429596aa62769a6407201697a4f71efbd41c0362
(lines omitted)
error: expect(received).toContain(expected)
(lines omitted)
Expected to contain: "alpha bravo"
(lines omitted)
      at check (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/retention.test.tsx:22:73)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/retention.test.tsx:25:5)
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/retention.test.tsx:42:25)
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
Expected: 2
Received: 3
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/retention.test.tsx:62:33)
(lines omitted)
(fail) interleaved output reaches each pane and dock in host order
(fail) the line cap drops oldest content and counts received and retained frames and bytes
(fail) the byte cap retains the newest bytes including a partial frame
Committed and restored SHA-256
367581629e87b3bf0e12c2362148b858f86b3346bc6c80478bb1a4704b06c0c2  tui/apps/madbridge/src/tui/live/retention.ts

R2 raised line cap
148-line-limit-diff.log · SHA-256 d7395ec85d0c9f0d6948993336bf8af37be3e94855358016c046ac7b2cc27dd1
151-line-limit-test.log · SHA-256 9418080af308950e334451c2d6f9c09d1573d644de6e71e23b282b9bacfd996b
152-line-limit-restore.log · SHA-256 07c6693d1fcbce049619e1f7e9d4c93dc470479ac244a7520c4cb63d1c38e022
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
Expected: 10000
Received: 10002
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/retention.test.tsx:46:33)
(lines omitted)
(pass) interleaved output reaches each pane and dock in host order
(fail) the line cap drops oldest content and counts received and retained frames and bytes
(pass) the byte cap retains the newest bytes including a partial frame
Committed and restored SHA-256
367581629e87b3bf0e12c2362148b858f86b3346bc6c80478bb1a4704b06c0c2  tui/apps/madbridge/src/tui/live/retention.ts

R2 newest dropped first
154-newest-diff.log · SHA-256 799c9baf1d861dcba566ea5c4d02b8bbcd44a61642f1499d8919a7ab5cdfe83d
157-newest-test.log · SHA-256 28b5b1e94bff24a259b7fdd3f9b1e33d1e00236d144595dceffde0b6313e15ec
158-newest-restore.log · SHA-256 08caa0b10ba58aae66e0676269e42decb6338520d38f2a943f3d673a83545384
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
Expected: 10002
Received: 10001
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/retention.test.tsx:44:33)
(lines omitted)
(pass) interleaved output reaches each pane and dock in host order
(fail) the line cap drops oldest content and counts received and retained frames and bytes
(pass) the byte cap retains the newest bytes including a partial frame
Committed and restored SHA-256
367581629e87b3bf0e12c2362148b858f86b3346bc6c80478bb1a4704b06c0c2  tui/apps/madbridge/src/tui/live/retention.ts

R2 raised byte cap
160-byte-limit-diff.log · SHA-256 d821faae2b2546e0e7c0cd8e9a50747304b61c65c7d258c841b447b026a0e7b3
163-byte-limit-test.log · SHA-256 644c27e6782eae28169a629a39e443ce09a6823eb272bf9e9e60c5ff15821908
164-byte-limit-restore.log · SHA-256 8ebe2488e78fef2a192234a22049e28aa5977a565ba20ddc6194a140631ea286
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
Expected: 2097152
Received: 2097153
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/retention.test.tsx:63:32)
(lines omitted)
(pass) interleaved output reaches each pane and dock in host order
(pass) the line cap drops oldest content and counts received and retained frames and bytes
(fail) the byte cap retains the newest bytes including a partial frame
Committed and restored SHA-256
367581629e87b3bf0e12c2362148b858f86b3346bc6c80478bb1a4704b06c0c2  tui/apps/madbridge/src/tui/live/retention.ts

R2 count omitted
166-count-diff.log · SHA-256 ffac3d1ae6768cb18dd723c69d744ceb7d087d8a9d54348bab9d87c71f35bf79
169-count-test.log · SHA-256 f964c4da6503950ffd2ed0d414e579a487c5bb42e278676a9459cdc34f7da246
170-count-restore.log · SHA-256 94d856e315f36ddb24471af722f19219abd3e6d744984cef8b166da9cb901d8f
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
Expected: 20002
Received: 20007
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/retention.test.tsx:47:32)
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
Expected: 2097152
Received: 2097156
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/retention.test.tsx:63:32)
(lines omitted)
(pass) interleaved output reaches each pane and dock in host order
(fail) the line cap drops oldest content and counts received and retained frames and bytes
(fail) the byte cap retains the newest bytes including a partial frame
Committed and restored SHA-256
367581629e87b3bf0e12c2362148b858f86b3346bc6c80478bb1a4704b06c0c2  tui/apps/madbridge/src/tui/live/retention.ts

R3 early acknowledgement
206-before-ack-diff.log · SHA-256 1e0c83a2d8f3e8a51021924eaa68d08a19c614c70d7b729aefd29ed8fcdb95db
209-before-ack-test.log · SHA-256 eb87b6accbd9d9d8772a2f1692d8a203d2e6c179ca3910b1184ac50c263f6311
210-before-ack-restore.log · SHA-256 3f433258a3e5a014412c4afc36ea806b7a44a2fbe112aab169b102fec0be482a
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/dispatch.test.ts:15:29)
(lines omitted)
error: expect(received).toMatchObject(expected)
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/dispatch.test.ts:48:24)
(lines omitted)
error: FixturePreflightFailed:identity_mismatch
(lines omitted)
      at async originalBuildInput (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/unbridged.ts:32:37)
      at async <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/dispatch.test.ts:94:26)
(lines omitted)
(fail) both host commands reach the child and wait for the matching ack
(fail) a missed acknowledgement contains the stopped host and interrupts the session
(fail) execution clients and the original build have no host bridge
(pass) the madv byte sender begins a checked request and refuses a closed monitor
Committed and restored SHA-256
1280fad9b047286cee911116da583340a60e239ddd9f66a206aec52807aff75e  tui/packages/broker/src/pty-host-supervisor.ts

R3 deadline without escalation
212-no-escalation-diff.log · SHA-256 2ac6257d189e7efb6ba8d2b9c0a5ea7e4070b7c201bf16b0cb75a2a6a289c9c3
215-no-escalation-test.log · SHA-256 9d29c6b752387a10143814086818e9d98d1770a16e201076e112489b9131f0fa
216-no-escalation-restore.log · SHA-256 8b837ba77d2f15883933ef6d8f63ad3c8b5b34aad185204f337af8967aca9bda
(lines omitted)
error: expect(received).toBeDefined()
(lines omitted)
Received: undefined
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/dispatch.test.ts:52:24)
(lines omitted)
(pass) both host commands reach the child and wait for the matching ack
(fail) a missed acknowledgement contains the stopped host and interrupts the session
(pass) execution clients and the original build have no host bridge
(pass) the madv byte sender begins a checked request and refuses a closed monitor
Committed and restored SHA-256
1280fad9b047286cee911116da583340a60e239ddd9f66a206aec52807aff75e  tui/packages/broker/src/pty-host-supervisor.ts

R3 write on the original build
224-original-write-diff.log · SHA-256 6b70f26df5e7610b00b68f4fc9bc0af35e06daa922cca9586bbc50baf5a9d17e
227-original-write-test.log · SHA-256 6c43a5c7a39f65a3c0610b471a7bb861762db2583b0e5187dae417aa3059e245
228-original-write-restore.log · SHA-256 c55ac68724d6b92699cf957bd312f498d1153d66045ac368c0faa676617d16cc
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
Expected: 0
Received: 1
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/dispatch.test.ts:96:27)
(lines omitted)
(pass) both host commands reach the child and wait for the matching ack
(pass) a missed acknowledgement contains the stopped host and interrupts the session
(fail) execution clients and the original build have no host bridge
(pass) the madv byte sender begins a checked request and refuses a closed monitor
Committed and restored SHA-256
f728e1e37b0e9907f21875b2396eb2e1025718295d9bcfed7b61216ba1271854  tui/packages/supervisor/src/build.ts

R3 parser request omitted
230-no-request-diff.log · SHA-256 52f96957388b816d453112e19b5d075221995a3e03c877e791594a1d99fa098e
233-no-request-test.log · SHA-256 e727fa5cd0cb68007a0fde25ef9aabb68b47417ab4686109cb1b8c6348b1ce96
234-no-request-restore.log · SHA-256 dbd2d2e8cafbfcf397ddf9ecccfe9762f7c9d19d648a0f7921ed06370497f38b
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/dispatch.test.ts:116:24)
(lines omitted)
(pass) both host commands reach the child and wait for the matching ack
(pass) a missed acknowledgement contains the stopped host and interrupts the session
(pass) execution clients and the original build have no host bridge
(fail) the madv byte sender begins a checked request and refuses a closed monitor
Committed and restored SHA-256
1435fffa1445694cb28a458c496fa2679224e4d367b2cf7c8d21e0e8b9ac6b5f  tui/packages/adapter-madv-surface/src/live.ts

R3 closed sender accepted
236-closed-accepts-diff.log · SHA-256 f9e12feed0389146d312bf84cf855c018ddad34dda1272aa85a771daaac03175
239-closed-accepts-test.log · SHA-256 f93b0494d6269cd25e5f29cc199ac08d4965247035ec3d369d5bab4612f88d81
240-closed-accepts-restore.log · SHA-256 5cbf0314398404b9d55cf3647585eb673bde0881cbf7641473b991ef912a4c79
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
Expected: false
Received: true
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/dispatch.test.ts:123:34)
(lines omitted)
(pass) both host commands reach the child and wait for the matching ack
(pass) a missed acknowledgement contains the stopped host and interrupts the session
(pass) execution clients and the original build have no host bridge
(fail) the madv byte sender begins a checked request and refuses a closed monitor
Committed and restored SHA-256
1435fffa1445694cb28a458c496fa2679224e4d367b2cf7c8d21e0e8b9ac6b5f  tui/packages/adapter-madv-surface/src/live.ts

R4 send before Enter
325-before-enter-diff.log · SHA-256 99286fb9cf233bf3c008faa44712349a540b3e6545de46fbfad790d8b2ed7a85
328-before-enter-test.log · SHA-256 e5ec9733e3635fd7847b687d89242d7e8596340b412c28ed5e18eadf758a0ad9
329-before-enter-restore.log · SHA-256 f45a155a7a74b057cee1467ca47bffd368356d94d54e63b106e39357a5cacef8
(lines omitted)
error: expect(received).toHaveLength(expected)
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/line-input.test.tsx:16:22)
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
Expected: 2
Received: 3
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/line-input.test.tsx:95:33)
(lines omitted)
(fail) only Enter submits one encoded focused line and other focus sends nothing
(pass) only the active focused writer resizes at a changed pane size
(fail) each refusal is shown once without retry and no token sends nothing
Committed and restored SHA-256
6f3298c8afb384390f9b8cf3b7f757d6dee5937f20a1dc98705f596af2e291fb  tui/apps/madbridge/src/tui/live/line-buffer.ts

R4 empty line sent
332-empty-line-diff.log · SHA-256 cde082103c351fb9c903c8a3ca43b398212dff4c4ae8754a31e04a6b32b3c0a4
335-empty-line-test.log · SHA-256 51ade4b3bb7d18e3396a683615ae1218a59b8f92f289c5b2438fa92a97fef0c4
336-empty-line-restore.log · SHA-256 d5ee04ff0f32c8558495355d9426261047ae0b0827aeadb0f89e919ad629e5e7
(lines omitted)
error: expect(received).toHaveLength(expected)
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/line-input.test.tsx:31:22)
(lines omitted)
(fail) only Enter submits one encoded focused line and other focus sends nothing
(pass) only the active focused writer resizes at a changed pane size
(pass) each refusal is shown once without retry and no token sends nothing
Committed and restored SHA-256
6f3298c8afb384390f9b8cf3b7f757d6dee5937f20a1dc98705f596af2e291fb  tui/apps/madbridge/src/tui/live/line-buffer.ts

R4 nonwriter resize
339-wrong-resize-diff.log · SHA-256 553f5cf5fa9dc3cda1067f44953d491a8feded55c8c2db9b482633f70e7ab6a6
342-wrong-resize-test.log · SHA-256 a368b193b34e0092cb2d07c6e20a31d5f2a487b9fd3ec9a5173dd236295e7a42
343-wrong-resize-restore.log · SHA-256 d935ccfc76e5d592b9111a938da4ed1a43819a5704da792e806307a82a32aaf5
(lines omitted)
error: expect(received).toHaveLength(expected)
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/line-input.test.tsx:68:26)
(lines omitted)
(pass) only Enter submits one encoded focused line and other focus sends nothing
(fail) only the active focused writer resizes at a changed pane size
(pass) each refusal is shown once without retry and no token sends nothing
Committed and restored SHA-256
6f3298c8afb384390f9b8cf3b7f757d6dee5937f20a1dc98705f596af2e291fb  tui/apps/madbridge/src/tui/live/line-buffer.ts

R4 unencoded line
346-raw-line-diff.log · SHA-256 7c600e5652ffa3313010a87b9033f61a715054c23282f7f3345ea3e3dac1ebab
349-raw-line-test.log · SHA-256 0416c2d94635deac36e71ac6e4b8403473f70ac2610d19f0cc80c5e6c57d6c1e
350-raw-line-restore.log · SHA-256 7cabf6d3f4759c3453fb4446d0086704712a6123f7e15b593c5b7802828030d3
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/usable-input.test.tsx:11:22)
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/usable-input.test.tsx:25:22)
(lines omitted)
(fail) each submitted stream-json line produces a checked stand-in response in its pane
(fail) a nonwriter submission is unauthorized in its pane and never reaches the child
Committed and restored SHA-256
6f3298c8afb384390f9b8cf3b7f757d6dee5937f20a1dc98705f596af2e291fb  tui/apps/madbridge/src/tui/live/line-buffer.ts

R4 refusal retried
353-refusal-retry-diff.log · SHA-256 a9c3b283d771dd61e50cb36f26558cf7e1be0df9db8cd92f3cd5ee03184206ac
356-refusal-retry-test.log · SHA-256 4e94628e7a1f6e4fb707375133761764b7f67adb2fc162af3d4f3a927a59f95c
357-refusal-retry-restore.log · SHA-256 3521a88c37312b8d56c223c905c420a5ddb36c99ff47df3401fda7c52e1b4ab3
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
Expected: 2
Received: 3
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/line-input.test.tsx:95:33)
(lines omitted)
(pass) only Enter submits one encoded focused line and other focus sends nothing
(pass) only the active focused writer resizes at a changed pane size
(fail) each refusal is shown once without retry and no token sends nothing
Committed and restored SHA-256
6f3298c8afb384390f9b8cf3b7f757d6dee5937f20a1dc98705f596af2e291fb  tui/apps/madbridge/src/tui/live/line-buffer.ts

R4 refusal rendered as success
360-false-success-diff.log · SHA-256 03ea91c403a97ce6879b8b1c8ba9709d65948a15ba7ec28ab4b498ae0a26356a
363-false-success-test.log · SHA-256 ce70af880a17bdd5981f8273f142ad03869f7891d0a6fb3b7b4805cbcdf89902
364-false-success-restore.log · SHA-256 afd591ecd68ae1a860fb13c0d0e4c06e30f5c9d41c57671382f7ceb218a757f8
(lines omitted)
error: expect(received).toContain(expected)
(lines omitted)
Expected to contain: "INVALID COMMAND"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/line-input.test.tsx:94:36)
(lines omitted)
(pass) only Enter submits one encoded focused line and other focus sends nothing
(pass) only the active focused writer resizes at a changed pane size
(fail) each refusal is shown once without retry and no token sends nothing
Committed and restored SHA-256
6f3298c8afb384390f9b8cf3b7f757d6dee5937f20a1dc98705f596af2e291fb  tui/apps/madbridge/src/tui/live/line-buffer.ts

R4 unauthorized shown as acceptance
367-unauthorized-word-diff.log · SHA-256 05024b0ff034325b39814b7bb9aeb51ce9e59beed30ec9a035e33ab8fe4c8046
370-unauthorized-word-test.log · SHA-256 7debac0a9176cb5a4e363cd648f5b1ec69aee8e1a4d77a162b812ae1aaa83e7c
371-unauthorized-word-restore.log · SHA-256 8cc0a0d8d76fc68b2061114cadf2396ddc7d8240e187ea12aad24005e93f7109
(lines omitted)
error: expect(received).toContain(expected)
(lines omitted)
Expected to contain: "UNAUTHORIZED"
Received: ""
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/usable-input.test.tsx:28:22)
(lines omitted)
(pass) each submitted stream-json line produces a checked stand-in response in its pane
(fail) a nonwriter submission is unauthorized in its pane and never reaches the child
Committed and restored SHA-256
6f3298c8afb384390f9b8cf3b7f757d6dee5937f20a1dc98705f596af2e291fb  tui/apps/madbridge/src/tui/live/line-buffer.ts

R5 Alt+4 selected Claude
392-alt4-diff.log · SHA-256 e777a39e1694956a087c5d035e5c463db524024c27ceafd56df6a41211106a7d
395-alt4-test.log · SHA-256 83131c404b51adada2462ae927b6c1e4c00526bc28a09b228543d0c931c7b957
396-alt4-restore.log · SHA-256 b750a612bd493a90e98f335c6d0d7b156b103a196de852b624447c86fc20db2f
(lines omitted)
error: expect(received).toContain(expected)
(lines omitted)
Expected to contain: "MADV-SURFACE"
Received: "│CLAUDE CODE | FOCUSED | builder | builder-model                                                                                                                                       │"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/madv-pane.test.tsx:15:21)
(lines omitted)
(fail) Alt+4 focuses the madv-surface execution
Committed and restored SHA-256
5b920b8626818fe54618be0ae02275511f1e0504d2ae8c297d5ef6b5fa01a15e  tui/apps/madbridge/src/tui/keyboard-router.ts

R6 retained writer shown
413-ended-writer-diff.log · SHA-256 63c7fb4fbc9603de6fdcbf778bfdec33974cb67f8f007d3b4d073e9d08473e8e
416-ended-writer-test.log · SHA-256 d8d00edda291feff01133ed2dcf9c81aceffd7745e752a8d3322cf659a1dec84
417-ended-writer-restore.log · SHA-256 14d3654032d7bec02affbbb213eb9c4f1c7a0fbfdcb5d8e48c0d1b5d08b8a664
(lines omitted)
error: expect(received).toContain(expected)
(lines omitted)
Expected to contain: "writer STREAM ENDED"
Received: "NOT CONNECTED | session active | writer builder #17 | pending 0 | focus CLAUDE | ledger #0"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/ended-stream.test.tsx:13:25)
(lines omitted)
(fail) failed and closed streams replace current authority in every reader
(pass) transfer-requested and sender-released show a null token as absence
Committed and restored SHA-256
21c3fe348cf589493da00c9eca9ee48a7ac35102aeb8c5f4e8b4d754d3f462e5  tui/apps/madbridge/src/tui/components/StatusBar.tsx

R6 null token shown as zero
420-null-transfer-diff.log · SHA-256 baa9cba6689a66d0bd376bff826f5d3710e68152c253a23c848d68dd86e7155d
423-null-transfer-test.log · SHA-256 bf7514c5e8011d63850146edfd9f4cde272cc5507472cfcec4dc5f939b537deb
424-null-transfer-restore.log · SHA-256 63490beece694cac7d0b4d22203a5227f0d6884bcb8470ae603c26fef8a8f782
(lines omitted)
error: expect(received).toContain(expected)
(lines omitted)
Expected to contain: "writer transfer-req (token —)"
Received: "CONNECTED | session active | writer transfer-req #0 | pending 0 | focus CLAUDE | ledger #0"
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/ended-stream.test.tsx:43:27)
(lines omitted)
(pass) failed and closed streams replace current authority in every reader
(fail) transfer-requested and sender-released show a null token as absence
Committed and restored SHA-256
21c3fe348cf589493da00c9eca9ee48a7ac35102aeb8c5f4e8b4d754d3f462e5  tui/apps/madbridge/src/tui/components/StatusBar.tsx

R6 pending pacing promise
427-pending-pace-diff.log · SHA-256 282cbd31febd34eccee22575750fc2d9036be706b7910949f4a91c7355815ad3
430-pending-pace-test.log · SHA-256 422187ebb5b85c476dec14799dc490f0cc11629552f11e2c5890bd1a6c7f71df
431-pending-pace-restore.log · SHA-256 85fc86db533be2f5887e8e0e560d04fc0390e3b16cb248b0d4d0fb46a791257d
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
Expected: true
Received: false
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/pacing-settlement.test.ts:22:21)
(lines omitted)
(fail) unsubscribe settles the pending pacing wait before its deadline
Committed and restored SHA-256
e3220af6bbaf622800f3b598acdf297475c72b194cd4c9bf93add57075b47bd1  tui/apps/madbridge/src/tui/live/subscribe.ts

R7 production importer
451-seam-import-diff.log · SHA-256 3ef58f3e0f98eef4daa16f89cdd5d7c91212cf8ca9bac761b4307c380aebe7b4
454-seam-import-test.log · SHA-256 05b121260f2809d0c293a3b3c989d89a108a9f598825b86040e4ca1d634b8808
455-seam-import-restore.log · SHA-256 8c632bccf605433d5dad78e8674aa015d94e1cf312996453f62fb2227f661745
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/m3-separation.test.ts:36:21)
(lines omitted)
(fail) production imports no private broker test seam
Committed and restored SHA-256
fbe101f2e3580763c403180407f6b775c764cde60380ed8c05c04b619229c982  tui/packages/broker/src/in-process-client.ts

R7 fixture discarded
458-discard-fault-diff.log · SHA-256 163917fda66632b419c29a8ef8c2264384f07a1bf5ca6630d77560c96c557382
461-discard-fault-test.log · SHA-256 d0ac1350bc273b61a92252b634ff87248a8540736946a3ddf644f48526eed4fe
462-discard-fault-restore.log · SHA-256 b594e6fdf9a9fb9b2fdb264e8a9dbd423c8dfd541224b6c41fbfa124602ff253
(lines omitted)
error: expect(received).toBe(expected)
(lines omitted)
Expected: "MalformedFrameError: ready carries no payload"
Received: null
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/malformed-host.test.ts:10:34)
(lines omitted)
(fail) malformed payloads and unknown tags interrupt each live monitor without client bytes
Committed and restored SHA-256
53e326aca9d90d8cb8ffe625554fda88095c4237e583c656816be899c431d71f  tui/packages/broker/src/pty-host-supervisor.ts

R7 invalid bytes visible to the client
465-expose-fault-diff.log · SHA-256 16987dbde1db588d2d883324bf76deed19afebcf11add0e7738c2399741d131e
468-expose-fault-test.log · SHA-256 4b47a0e41d7d3314fb279470b494d3be74773e57139e32021a1517c7897d0b9b
469-expose-fault-restore.log · SHA-256 6a5df68f40469e54b4eaf988d04d2b46b145c67f7355cc09076f8f945f3c1f6d
(lines omitted)
error: expect(received).toEqual(expected)
(lines omitted)
      at <anonymous> (/Users/michaeldaley/builds/m3-r1/tui/test/phase3b/malformed-host.test.ts:16:29)
(lines omitted)
(fail) malformed payloads and unknown tags interrupt each live monitor without client bytes
Committed and restored SHA-256
53e326aca9d90d8cb8ffe625554fda88095c4237e583c656816be899c431d71f  tui/packages/broker/src/pty-host-supervisor.ts

First principal-bridge attempt inconclusive, logs 217–222 and 241. The Founder ruled against repeating that attempt. The separate declined break is recorded under Deviations.

The early first zero-sequence attempt used 080-zero-diff.log · SHA-256 c8b45b103f672e1379b33ab7edef60eb2812f4704df13d6f8540a9e3a721e197, 082-zero-test.log · SHA-256 b3c49eeec18626a1cb588ff6237744d56f90e9b9faa64b5badcb653d49b630fc and 083-zero-restore.log · SHA-256 a67dd77acb55bce28b6e2a43418547bc4b90331c0d2bae12191883e8c6c92f3f. Its restore preceded suite exit. The completed repeat follows the required order. The executed assertion context for every completed break is recorded in the build log. The Founder retains the declined R3 execution-principal break.

5. Existing tests changed by file and line

EXISTING TESTS item 1 permits the separation digest at line 30. Item 2 covers the second surface in the four presentation tests, and in the two grids under the fourth resume. The zero-context diff supplies each old and new line number. 578-corrected-existing-diffs.log · SHA-256 a4156b747abfd99ae609922cc67adb6153ca385bbda62d7480b925f0439168b8.

apps/madbridge/test/tui-governance-surfaces.test.tsx

@@ -42 +42 @@

@@ -47 +47 @@

@@ -67 +67 @@

@@ -114 +114 @@

@@ -173 +173 @@

@@ -437 +437 @@

@@ -877 +877 @@

@@ -889 +889 @@

@@ -898 +898 @@

@@ -1049 +1049 @@

@@ -1086 +1086 @@

@@ -1231 +1231 @@

@@ -1239 +1239 @@

apps/madbridge/test/tui-truth-safety.test.tsx

@@ -540 +540 @@

@@ -592 +592 @@

@@ -640 +640 @@

@@ -793 +793 @@

@@ -1139,0 +1140 @@

@@ -1143 +1144 @@

@@ -1156 +1157 @@

apps/madbridge/test/tui-writers-stage.test.tsx

@@ -35 +35 @@

@@ -40 +40 @@

@@ -60 +60 @@

@@ -91 +91 @@

@@ -160 +160 @@

@@ -184 +184 @@

@@ -197 +197 @@

@@ -202 +202 @@

@@ -219 +219 @@

@@ -300 +300 @@

@@ -413 +413 @@

@@ -429 +429 @@

@@ -445 +445 @@

@@ -451 +451 @@

@@ -464 +464 @@

@@ -481 +481 @@

@@ -509 +509 @@

@@ -519 +519 @@

@@ -538 +538 @@

@@ -564 +564 @@

@@ -684 +684 @@

@@ -692 +692 @@

@@ -702 +702 @@

@@ -714 +714 @@

@@ -718 +718 @@

@@ -725 +725 @@

@@ -743 +743 @@

@@ -755,2 +755,2 @@

@@ -772 +772 @@

@@ -783 +783 @@

@@ -788 +788 @@

@@ -798 +798 @@

@@ -807 +807 @@

@@ -833 +833 @@

@@ -837 +837 @@

@@ -944 +944 @@

@@ -953 +953 @@

@@ -1038 +1038 @@

@@ -1056 +1056 @@

@@ -1079 +1079 @@

@@ -1091 +1091 @@

@@ -1098 +1098 @@

@@ -1128 +1128 @@

@@ -1145 +1145 @@

@@ -1148 +1148 @@

@@ -1157 +1157 @@

@@ -1161 +1161 @@

@@ -1163 +1163 @@

@@ -1177 +1177 @@

@@ -1181 +1181 @@

@@ -1193 +1193 @@

@@ -1197 +1197 @@

@@ -1292 +1292 @@

test/phase3a/harness-separation.test.ts

@@ -30 +30 @@

test/phase3b/absence.test.tsx

@@ -10 +10 @@

@@ -55,2 +55,2 @@

@@ -68 +68 @@

@@ -75,2 +75,2 @@

@@ -83 +83 @@

@@ -87 +87 @@

testdata/tui-chaos/goldens/governance_focus.grid.txt

@@ -1 +1 @@

@@ -39 +39 @@

testdata/tui-chaos/goldens/layout_resize.grid.txt

@@ -1 +1 @@

@@ -31 +31 @@

578-corrected-existing-diffs.log · SHA-256 a4156b747abfd99ae609922cc67adb6153ca385bbda62d7480b925f0439168b8. All quoted diff lines have trailing whitespace removed.

diff --git a/apps/madbridge/test/tui-governance-surfaces.test.tsx b/apps/madbridge/test/tui-governance-surfaces.test.tsx

The complete diff of this file contains square brackets. 578-corrected-existing-diffs.log · SHA-256 a4156b747abfd99ae609922cc67adb6153ca385bbda62d7480b925f0439168b8.

diff --git a/apps/madbridge/test/tui-truth-safety.test.tsx b/apps/madbridge/test/tui-truth-safety.test.tsx

diff --git a/apps/madbridge/test/tui-truth-safety.test.tsx b/apps/madbridge/test/tui-truth-safety.test.tsx
index 96ccd1b..2833e4d 100644
--- a/apps/madbridge/test/tui-truth-safety.test.tsx
+++ b/apps/madbridge/test/tui-truth-safety.test.tsx
@@ -540 +540 @@ describe("Finding 3: routeKeyEvent forwards sequence to PTY, consumes global act
-      state: makeRouterState("antigravity"), snapshot: null, callbacks: cbs, bindings,
+      state: makeRouterState("madv-surface"), snapshot: null, callbacks: cbs, bindings,
@@ -592 +592 @@ describe("Defect 1: approval keys are inert without governance focus + visible d
-      state: makeRouterState("antigravity"), snapshot: makeConnectedSnapshot(), callbacks: cbs, bindings,
+      state: makeRouterState("madv-surface"), snapshot: makeConnectedSnapshot(), callbacks: cbs, bindings,
@@ -640 +640 @@ describe("Defect 1: approval keys are inert without governance focus + visible d
-      state: makeRouterState("antigravity", true, "approval-001"),
+      state: makeRouterState("madv-surface", true, "approval-001"),
@@ -793 +793 @@ describe("Defect 2: validateApprovalResolution is the single guard for all paths
-    const state = makeRouterState("antigravity", true, "approval-001");
+    const state = makeRouterState("madv-surface", true, "approval-001");
@@ -1139,0 +1140 @@ describe("Matrix: all six facts at 60 and 80 for every valid session+focus combi
+          const focusWord = focus === "ANTIGRAVITY" ? "MADV-SURFACE" : focus;
@@ -1143 +1144 @@ describe("Matrix: all six facts at 60 and 80 for every valid session+focus combi
-            focusWord: focus,
+            focusWord,
@@ -1156 +1157 @@ describe("Matrix: all six facts at 60 and 80 for every valid session+focus combi
-          expect(line).toContain(focus);               // 5. focus value
+          expect(line).toContain(focusWord);            // 5. focus value

diff --git a/apps/madbridge/test/tui-writers-stage.test.tsx b/apps/madbridge/test/tui-writers-stage.test.tsx

The complete diff of this file contains square brackets. 578-corrected-existing-diffs.log · SHA-256 a4156b747abfd99ae609922cc67adb6153ca385bbda62d7480b925f0439168b8.

diff --git a/test/phase3a/harness-separation.test.ts b/test/phase3a/harness-separation.test.ts

The complete diff of this file contains square brackets. 578-corrected-existing-diffs.log · SHA-256 a4156b747abfd99ae609922cc67adb6153ca385bbda62d7480b925f0439168b8.

diff --git a/test/phase3b/absence.test.tsx b/test/phase3b/absence.test.tsx

The complete diff of this file contains square brackets. 578-corrected-existing-diffs.log · SHA-256 a4156b747abfd99ae609922cc67adb6153ca385bbda62d7480b925f0439168b8.

diff --git a/testdata/tui-chaos/goldens/governance_focus.grid.txt b/testdata/tui-chaos/goldens/governance_focus.grid.txt

diff --git a/testdata/tui-chaos/goldens/governance_focus.grid.txt b/testdata/tui-chaos/goldens/governance_focus.grid.txt
index 382e445..556ee52 100644
--- a/testdata/tui-chaos/goldens/governance_focus.grid.txt
+++ b/testdata/tui-chaos/goldens/governance_focus.grid.txt
@@ -1 +1 @@
-# golden grid for tui-chaos — sha256:991bf9d04993ae105b37c7e356520f5f3c0498b58888ae29366c968fde1e6d14
+# golden grid for tui-chaos — sha256:abe2624ace26f240ccf4fc640525f2c938836b72cca363cab4a9d22a62c95efe
@@ -39 +39 @@ CLAUDE CODE | docked | WRITER tok#3 | builder | claude-sonnet-4 | 0 buffered
-ANTIGRAVITY | docked | independent-reviewer | gemini-2.5-pro | 0 buffered
+MADV-SURFACE | docked | independent-reviewer | MiniMax-M3.1-Flash | 0 buffered

diff --git a/testdata/tui-chaos/goldens/layout_resize.grid.txt b/testdata/tui-chaos/goldens/layout_resize.grid.txt

diff --git a/testdata/tui-chaos/goldens/layout_resize.grid.txt b/testdata/tui-chaos/goldens/layout_resize.grid.txt
index 933873f..a815548 100644
--- a/testdata/tui-chaos/goldens/layout_resize.grid.txt
+++ b/testdata/tui-chaos/goldens/layout_resize.grid.txt
@@ -1 +1 @@
-# golden grid for tui-chaos — sha256:69a4cb0547ba4f12844248093a69fd09afbe3170e4253922d44d7576f8fbf713
+# golden grid for tui-chaos — sha256:c73fc7a32fa1def74b70b353c148423a38cedc3c52070359a6ed3357d27fc1b6
@@ -31 +31 @@ CLAUDE CODE | docked | WRITER tok#3 | builder | claude-sonnet-4 | 0 buffered
-ANTIGRAVITY | docked | independent-reviewer | gemini-2.5-pro | 0 buffered
+MADV-SURFACE | docked | independent-reviewer | MiniMax-M3.1-Flash | 0 buffered

6. Commits, parents, messages and attribution

66ebd2081cbba90a31a116960984154780d020da · parent a7ceccbe96950b63646edc1dc6cc8590c957bf28
docs(verification): open the M3 build log with its task detail
Maximum line width 62. Three final trailers verified. 051-opening-check.log · SHA-256 69666a5741e0e0ba95e88fc838573252aaf2f7a766336b3d3986c5d2d3aab151.

8a95854cda8ffc21ea35aac56a2c9e4b95a789bc · parent 66ebd2081cbba90a31a116960984154780d020da
feat(supervisor): deliver monitored PTY output to the Founder client
Maximum line width 68. Three final trailers verified. 070-r1-width.log · SHA-256 753ceb54338bc5bde03e331d83856744f7f65e4910584455d16a1366e2f3b397.

ee21c4439c59f83686fd9bdb11217d2798accfa8 · parent 8a95854cda8ffc21ea35aac56a2c9e4b95a789bc
feat(tui): retain ordered output for each surface pane and dock
Maximum line width 68. Three final trailers verified. 130-r2-message-check.log · SHA-256 647b4111e2e38c7c66f0bc54f9437eb4aee07fe5d7aa5cfb77d36abd35fc053a.

790eba2b5a3ea1beb37aa07311165c0fa9b8109f · parent ee21c4439c59f83686fd9bdb11217d2798accfa8
feat(broker): await host acknowledgements for live writer commands
Maximum line width 70. Three final trailers verified. 201-r3-message-check.log · SHA-256 f8cda33a583d8797086da890db1eec3b0eccd4156024bdeba10c9a15a7f37397.

4f44a80bf323b36c80a83c194591e2a9838e0fa0 · parent 790eba2b5a3ea1beb37aa07311165c0fa9b8109f
feat(tui): submit encoded lines and resize the focused writer
Maximum line width 69. Three final trailers verified. 319-r4-message-check.log · SHA-256 60559420fcadd645f00faad5f2cf1676dd2b0024477f4777b3c67213970e78c1.

0ca50afec2867a337cfb37bd476c09ae8e6604b8 · parent 4f44a80bf323b36c80a83c194591e2a9838e0fa0
feat(tui): show madv-surface in the second pane and dock
Maximum line width 70. Three final trailers verified. 386-r5-message-check.log · SHA-256 a0728255e1b9bec3b297fe7b1cf207450e56844490e142175d9c386c4a3d0a93.

fcbadbe14340a5a24908fae920fce4ab8ccb3b0c · parent 0ca50afec2867a337cfb37bd476c09ae8e6604b8
fix(tui): show stream end in place of current authority
Maximum line width 71. Three final trailers verified. 408-r6-message-check.log · SHA-256 8162b4a3f5e469343b20894501b1357b6cff9f340f7216c5bdb33550da9172cc.

9a6ed3f38329543e3f9e00e575139efceb773ef6 · parent fcbadbe14340a5a24908fae920fce4ab8ccb3b0c
test(broker): observe malformed host facts after activation
Maximum line width 70. Three final trailers verified. 446-r7-message-check.log · SHA-256 3cfce2f428af579d3b84f1bce054ce883a7f09f647bdf1233ab3180905233887.

ed8685a7f1a7cc4e5e0ea22020eb8c1907c62f1e · parent 9a6ed3f38329543e3f9e00e575139efceb773ef6
docs(verification): capture offline M3 transport and pane evidence
Maximum line width 70. Three final trailers verified. 480-r8-message-check.log · SHA-256 3d25ccd0a654d4a859dfd5033434fbf726356598c4e60b1298ec26e91da6a031.

a78e2d589a7d1740da86177af277472b98e9be1e · parent ed8685a7f1a7cc4e5e0ea22020eb8c1907c62f1e
test(tui-chaos): update the two madv-surface dock grids

Maximum line width 61. Three final trailers verified. 546-golden-message-check.log · SHA-256 7754c8316ed2d95f2a7e2491d79de80ce15cceca5b03567a05dca61fe536da14.

67dce10bb771092743664dbdafa873e38748b5d4 · parent a78e2d589a7d1740da86177af277472b98e9be1e
docs(verification): record M3

Maximum line width 59. Three final trailers verified. 587-closing-width.log · SHA-256 1259c6fe6ceb724656e6ae455195e31cd74a50384abe2553d4109d710a592e0b.

7. Offline evidence

Evidence script scripts/phase3b/m3-evidence.tsx · SHA-256 caa2f176190f15777296c51052574113c15c4652e727246087e1f5093dcb14e8.
473-r8-runtime.log · SHA-256 e2b68a2a35e1395eaddb37b2d45efc58bbe9bbeea2b1a3c2de8211d1cc45ecbb — Command reproduced in the cited log — 18:50  up 6 days, 10:17, 1 user, load averages: 1.80 2.19 2.09 — Fri Nov 27 23:50:03 UTC 2026 to Fri Nov 27 23:50:03 UTC 2026 — exit status 0.
474-r8-wait.log · SHA-256 4689e3507aafabdc5a748faad00312c67c69c3aeb5b9b2943c22257212ffcebb — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:50  up 6 days, 10:17, 1 user, load averages: 1.60 2.13 2.07 — Fri Nov 27 23:50:17 UTC 2026 to Fri Nov 27 23:50:17 UTC 2026 — exit status 0.
475-r8-evidence.log · SHA-256 fa193b8eb8ae72e11ee73fc932591acce6d8f16647a4c16115ab202c9805bc84 — Command reproduced in the cited log — 18:50  up 6 days, 10:17, 1 user, load averages: 1.60 2.13 2.07 — Fri Nov 27 23:50:17 UTC 2026 to Fri Nov 27 23:50:23 UTC 2026 — exit status 0.
All six sources verified in 476-evidence-hashes.log · SHA-256 76d19c1adb49346610eada2737ae0c83ba6fb3cb31bc61b5a9b95b7425315f0c.

e77adb00dfc5f961aed1bbe6a43e9fbabaae2f9dc45f870592b919b9cb280eba  ended-streams.jsonl
bf16c337ee4dfd0f4ba085d0ebe81b5442093b6f689d7fec300de9e9f78c732f  malformed-frames.jsonl
95fc7b003e4c0f7f37d49cfe4059912c29da8f65d743f34711e5b3090b173e08  ordered-frames.jsonl
5a7071c7cae02b652bb9eb055666f19a443c53b7d2a32bc1d89753d5d4647ad6  retention.jsonl
88074b94589e5a8e4f02315dee6b39415b47b67453dff34700f094df08261a32  transport.jsonl
0652a2392cd280b7a9cad4f7a25a250bec24442cb1c2ae9aa0da32f03a30a0fb  usable-input.jsonl
Manifest SHA-256 7ac98c8586885f90346b8f6f57b0dae3bd7150e21a64c9bf8d2b419fd533aa8d.
Evidence packet SHA-256 6bdc7fa2a766a2f6788cccbc092cfdfcd8fda359c7a114fc4af4c5799020e91b.
No frame of a real surface has yet been delivered. No real surface has yet received a line. The packet lists the undeclared relative package-source imports and identifies how each stand-in observation was obtained.

Relative imports and offline limitations

No frame of a real surface has yet been delivered. No real surface has yet received a line. All host exchanges above used disposable stand-ins. The byte injector accepts only the two complete invalid Phase 3A records and queues one at a clean decoder boundary.

The application package does not declare the source dependencies imported by relative path. The base includes supervisor source imports in apps/madbridge/src/tui/live/composition.ts, apps/madbridge/src/tui/live/subscribe.ts and apps/madbridge/src/commands/export-evidence.ts. Composition also imports packages/adapter-madv-surface/src. The M3 files below reference package sources by relative path.

- apps/madbridge/src/tui/live/line-buffer.ts — packages/adapter-claude-code/src/live, packages/adapter-madv-surface/src/index.
- test/phase3b/dispatch-observation.ts — packages/adapter-claude-code/src/live, packages/adapter-madv-surface/src/index, packages/broker/src/pty-host-supervisor.
- test/phase3b/dispatch.test.ts — packages/broker/src/pty-host-supervisor.
- test/phase3b/line-input.test.tsx — packages/broker/src/client.
- test/phase3b/malformed-observation.ts — packages/adapter-madv-surface/src/live.ts, packages/broker/src/pty-host-protocol, packages/broker/src/pty-host-supervisor, packages/supervisor/src/index.
- test/phase3b/pacing-settlement.test.ts — packages/supervisor/src/index, packages/supervisor/src/snapshot-timer.
- test/phase3b/producer.test.ts — packages/broker/src/in-process-client.
- test/phase3b/transport.ts — packages/supervisor/src/index.
- test/phase3b/unbridged.ts — packages/supervisor/src/build.

8. Full runs, changed paths, protected diffs and importer lists

The first full run at ed8685a7f1a7cc4e5e0ea22020eb8c1907c62f1e produced 2157 pass, 2 fail, 28739 expect() calls. Its full summary and times are in 490-full-test.log · SHA-256 751253a76038c354e65bd57d5973bb324bf673ad21354d7cae7a7e16fe902f8c. 515-halt-test-comparison.log · SHA-256 c4efb5496aaa9bdc09f1ea44f8c44e0677580fb8f70169a25f8c97bea3f2a250 verifies both failed base tests and all 20 new passes. The fourth ruling authorized the stamp and dock row alone. The first replay identified only rows 38 and 30. The update and exact per-file diffs are in 541–544. Commit a78e2d589a7d1740da86177af277472b98e9be1e contains only these two grid updates.

483-full-start.log · SHA-256 739e0e26af1ca1fbb907fcde4b3aa936bb7dbf2c9ce0cd4b9226b2be0833d3fc — before_full — 18:51  1 user, load averages: 1.21 1.90 1.99 — Fri Nov 27 23:51:27 UTC 2026 to Fri Nov 27 23:51:27 UTC 2026 — exit status 0.

484-full-runtime.log · SHA-256 e2417c7baae8e02828bc9e8e83d32d4418408d115fe9720bb7153309d987a8a5 — Full command in cited source — 18:51  up 6 days, 10:19, 1 user, load averages: 1.58 1.93 2.00 — Fri Nov 27 23:51:54 UTC 2026 to Fri Nov 27 23:51:55 UTC 2026 — exit status 0.

485-full-install.log · SHA-256 ad1217668b20b6b8c4bf0eeaff33c58ceb8796456910089d2ba6ff08f83d5894 — Full command in cited source — 18:51  up 6 days, 10:19, 1 user, load averages: 1.58 1.93 2.00 — Fri Nov 27 23:51:56 UTC 2026 to Fri Nov 27 23:51:56 UTC 2026 — exit status 0.

486-full-install-state.log · SHA-256 4ca3f763747361e7a9cee602fabe293a01c78895974f3db81a2f7f8010425cb3 — check_install — 18:51  1 user, load averages: 1.58 1.93 2.00 — Fri Nov 27 23:51:56 UTC 2026 to Fri Nov 27 23:51:56 UTC 2026 — exit status 0.

487-full-typecheck.log · SHA-256 f805a0df3784caba65dafd975fc4c815a1fe400854527468422e27891e3d01dc — Full command in cited source — 18:53  up 6 days, 10:20, 1 user, load averages: 1.57 1.86 1.96 — Fri Nov 27 23:53:15 UTC 2026 to Fri Nov 27 23:53:18 UTC 2026 — exit status 0.

488-full-suite-runtime.log · SHA-256 be71873d9fe96de9fe50e865945f446181834d08793dafc1b5d98516aabfc81f — Full command in cited source — 18:53  up 6 days, 10:20, 1 user, load averages: 1.69 1.88 1.97 — Fri Nov 27 23:53:19 UTC 2026 to Fri Nov 27 23:53:20 UTC 2026 — exit status 0.

489-full-wait.log · SHA-256 4728948643c3ac861c185339cc0a7f2a562d076dc265b80a3845cc184b9dd7b9 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:53  up 6 days, 10:20, 1 user, load averages: 1.69 1.88 1.97 — Fri Nov 27 23:53:21 UTC 2026 to Fri Nov 27 23:53:21 UTC 2026 — exit status 0.

490-full-test.log · SHA-256 751253a76038c354e65bd57d5973bb324bf673ad21354d7cae7a7e16fe902f8c — Full command in cited source — 18:53  up 6 days, 10:20, 1 user, load averages: 1.69 1.88 1.97 — Fri Nov 27 23:53:21 UTC 2026 to Fri Nov 27 23:58:01 UTC 2026 — exit status 1.

535-grid-runtime.log · SHA-256 607bdaac7eeda469c27524effd9692cc4113c6e47c50225f497da06c2e1a3332 — Full command in cited source — 19:38  up 6 days, 11:06, 1 user, load averages: 2.32 2.38 2.64 — Sat Nov 28 00:38:41 UTC 2026 to Sat Nov 28 00:38:41 UTC 2026 — exit status 0.

536-grid-baseline-wait.log · SHA-256 0849c44634aceec45f038d0459c0b8e0a295c4b653af0a41bbce9d46d453c390 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 19:38  up 6 days, 11:06, 1 user, load averages: 2.32 2.38 2.64 — Sat Nov 28 00:38:43 UTC 2026 to Sat Nov 28 00:39:43 UTC 2026 — exit status 0.

537-grid-baseline.log · SHA-256 efcb506c128ea5cb0d022ba6ae023072d9b287568ef4737b6e0db793ba5ca015 — Full command in cited source — 19:39  up 6 days, 11:07, 1 user, load averages: 1.58 2.17 2.54 — Sat Nov 28 00:39:43 UTC 2026 to Sat Nov 28 00:39:45 UTC 2026 — exit status 1.

538-grid-update-runtime.log · SHA-256 00b4686e1812b3c070841c3a1ee71d399a5d19e3c9dcfbda09e22032c55eff21 — Full command in cited source — 19:41  up 6 days, 11:09, 1 user, load averages: 2.29 2.28 2.53 — Sat Nov 28 00:41:40 UTC 2026 to Sat Nov 28 00:41:40 UTC 2026 — exit status 0.

539-grid-update-wait.log · SHA-256 1bc23f029d90fc207d1f924a7cd58ed647b0f31d48cf4bbfe60accf1bd17982d — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 19:41  up 6 days, 11:09, 1 user, load averages: 2.51 2.32 2.54 — Sat Nov 28 00:41:41 UTC 2026 to Sat Nov 28 01:01:43 UTC 2026 — exit status 2.

540-grid-update-wait.log · SHA-256 08b05c02dbfa524b4ee5077a8fc443125e6d1013d554542dc5fddf1c3039b20c — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 20:07  up 6 days, 11:35, 1 user, load averages: 1.90 2.15 2.48 — Sat Nov 28 01:07:32 UTC 2026 to Sat Nov 28 01:07:32 UTC 2026 — exit status 0.

541-grid-update.log · SHA-256 f5f1788804ce744f388472a47606326eae321c1236fc3c44cbc5eb515495138d — Full command in cited source — 20:07  up 6 days, 11:35, 1 user, load averages: 1.90 2.15 2.48 — Sat Nov 28 01:07:32 UTC 2026 to Sat Nov 28 01:07:35 UTC 2026 — exit status 0.

542-governance-grid-diff.log · SHA-256 05e05afae41e4624144b0fc4b30201874924ac5e59cc27bd4d63663360608920 — git -C tui diff -- testdata/tui-chaos/goldens/governance_focus.grid.txt — 20:07  1 user, load averages: 1.46 2.02 2.43 — Sat Nov 28 01:07:58 UTC 2026 to Sat Nov 28 01:07:58 UTC 2026 — exit status 0.

543-layout-grid-diff.log · SHA-256 20a139bf47393a280d619aa8ca2785c4c31b095a332fa1bb76612ee20dee47f6 — git -C tui diff -- testdata/tui-chaos/goldens/layout_resize.grid.txt — 20:07  1 user, load averages: 1.46 2.02 2.43 — Sat Nov 28 01:07:58 UTC 2026 to Sat Nov 28 01:07:58 UTC 2026 — exit status 0.

544-grid-scope.log · SHA-256 20e0bd3ea8351e83e66fa8fcae1dc25654e221363282fe738cae72d30a2c786b — verify_grids — 20:07  1 user, load averages: 1.46 2.02 2.43 — Sat Nov 28 01:07:58 UTC 2026 to Sat Nov 28 01:07:58 UTC 2026 — exit status 0.

549-repeat-full-start.log · SHA-256 3c69644c3419d85870ce82c65f186ed878905536a53974fd6e8920c766428092 — full_start — 20:08  1 user, load averages: 1.42 2.01 2.42 — Sat Nov 28 01:08:04 UTC 2026 to Sat Nov 28 01:08:04 UTC 2026 — exit status 0.

550-repeat-runtime.log · SHA-256 68b44fea3246b90df9e5e0170b1f549db73398b172a11a6429841240b4ff9afa — Full command in cited source — 20:08  up 6 days, 11:36, 1 user, load averages: 1.21 1.91 2.37 — Sat Nov 28 01:08:28 UTC 2026 to Sat Nov 28 01:08:28 UTC 2026 — exit status 0.

551-repeat-install.log · SHA-256 9a7596b4cd04ecbd9135777d4fae15debea7a7526436a588bcd8fab6a1c03967 — Full command in cited source — 20:08  up 6 days, 11:36, 1 user, load averages: 1.21 1.91 2.37 — Sat Nov 28 01:08:29 UTC 2026 to Sat Nov 28 01:08:30 UTC 2026 — exit status 0.

552-repeat-install-state.log · SHA-256 1243017ae884946badd3ed809501adce52eb5f8ebbce433ad15fb6e87897064d — check_install — 20:08  1 user, load averages: 1.21 1.91 2.37 — Sat Nov 28 01:08:30 UTC 2026 to Sat Nov 28 01:08:30 UTC 2026 — exit status 0.

553-repeat-typecheck.log · SHA-256 148c427586e504b1cecd21ff99752d775ffd4d5530b0892c66529b3d3a027740 — Full command in cited source — 20:08  up 6 days, 11:36, 1 user, load averages: 1.21 1.91 2.37 — Sat Nov 28 01:08:31 UTC 2026 to Sat Nov 28 01:08:34 UTC 2026 — exit status 0.

554-repeat-suite-runtime.log · SHA-256 7761decbe9f497838f3652a306fa95eb4fe928c6d0f18f3f49e2b020ef7995d5 — Full command in cited source — 20:09  up 6 days, 11:36, 1 user, load averages: 3.73 2.60 2.61 — Sat Nov 28 01:09:12 UTC 2026 to Sat Nov 28 01:09:12 UTC 2026 — exit status 0.

555-repeat-full-wait.log · SHA-256 e41e7e2d4de156313aebd54b55e1ca5e29e51f0ef574b6e8f1278935e2edfd9a — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 20:09  up 6 days, 11:36, 1 user, load averages: 3.47 2.58 2.60 — Sat Nov 28 01:09:24 UTC 2026 to Sat Nov 28 01:11:54 UTC 2026 — exit status 0.

556-repeat-full-test.log · SHA-256 48bdddc7f99479007ad42d1ca05f97af63ffcba85f4dde7b6195ab6a3ebb9cf1 — Full command in cited source — 20:11  up 6 days, 11:39, 1 user, load averages: 1.62 2.29 2.49 — Sat Nov 28 01:11:54 UTC 2026 to Sat Nov 28 01:16:34 UTC 2026 — exit status 0.

 2159 pass
 0 fail
 28720 expect() calls
Ran 2159 tests across 178 files. The original timing line is in 556-repeat-full-test.log · SHA-256 48bdddc7f99479007ad42d1ca05f97af63ffcba85f4dde7b6195ab6a3ebb9cf1.

Every baseline name passed. 2139 + 20 = 2159 tests. 168 + 10 = 178 files. 563-corrected-comparison.log · SHA-256 9b46579dc0bd813963235d3400254efb43c9749fc010326d99d817db7b1b503a.

Added  test/phase3b/dispatch.test.ts  (pass)  a missed acknowledgement contains the stopped host and interrupts the session  1
Added  test/phase3b/dispatch.test.ts  (pass)  both host commands reach the child and wait for the matching ack  1
Added  test/phase3b/dispatch.test.ts  (pass)  execution clients and the original build have no host bridge  1
Added  test/phase3b/dispatch.test.ts  (pass)  the madv byte sender begins a checked request and refuses a closed monitor  1
Added  test/phase3b/ended-stream.test.tsx  (pass)  failed and closed streams replace current authority in every reader  1
Added  test/phase3b/ended-stream.test.tsx  (pass)  transfer-requested and sender-released show a null token as absence  1
Added  test/phase3b/line-input.test.tsx  (pass)  each refusal is shown once without retry and no token sends nothing  1
Added  test/phase3b/line-input.test.tsx  (pass)  only Enter submits one encoded focused line and other focus sends nothing  1
Added  test/phase3b/line-input.test.tsx  (pass)  only the active focused writer resizes at a changed pane size  1
Added  test/phase3b/m3-separation.test.ts  (pass)  production imports no private broker test seam  1
Added  test/phase3b/madv-pane.test.tsx  (pass)  Alt+4 focuses the madv-surface execution  1
Added  test/phase3b/malformed-host.test.ts  (pass)  malformed payloads and unknown tags interrupt each live monitor without client bytes  1
Added  test/phase3b/pacing-settlement.test.ts  (pass)  unsubscribe settles the pending pacing wait before its deadline  1
Added  test/phase3b/producer.test.ts  (pass)  a refused output sequence interrupts the live session  1
Added  test/phase3b/producer.test.ts  (pass)  the live producer delivers contiguous monitor facts for each execution and excludes attestation  1
Added  test/phase3b/retention.test.tsx  (pass)  interleaved output reaches each pane and dock in host order  1
Added  test/phase3b/retention.test.tsx  (pass)  the byte cap retains the newest bytes including a partial frame  1
Added  test/phase3b/retention.test.tsx  (pass)  the line cap drops oldest content and counts received and retained frames and bytes  1
Added  test/phase3b/usable-input.test.tsx  (pass)  a nonwriter submission is unauthorized in its pane and never reaches the child  1
Added  test/phase3b/usable-input.test.tsx  (pass)  each submitted stream-json line produces a checked stand-in response in its pane  1
Baseline tests 2139 files 168
Baseline occurrences missing or changed 0
Head tests 2159 files 178
Tests: 2139 + 20 = 2159
Files: 168 + 10 = 178
Every baseline file and full test name passed; zero skips and zero todos.

562-corrected-list.log · SHA-256 1abd04435436d66030109c54b4bf361755026341ccb63e7d009f481a2e33b275

M	apps/madbridge/src/tui/App.tsx
M	apps/madbridge/src/tui/components/DockStrip.tsx
M	apps/madbridge/src/tui/components/PaneTabs.tsx
M	apps/madbridge/src/tui/components/StatusBar.tsx
M	apps/madbridge/src/tui/components/agent-identity.ts
M	apps/madbridge/src/tui/hooks/useKeyboard.ts
M	apps/madbridge/src/tui/keybindings.ts
M	apps/madbridge/src/tui/keyboard-router.ts
A	apps/madbridge/src/tui/live/line-buffer.ts
A	apps/madbridge/src/tui/live/retention.ts
M	apps/madbridge/src/tui/main.tsx
M	apps/madbridge/src/tui/panes/AntigravityPane.tsx
M	apps/madbridge/src/tui/panes/ClaudePane.tsx
M	apps/madbridge/src/tui/panes/GovernancePane.tsx
M	apps/madbridge/src/tui/types.ts
M	apps/madbridge/test/tui-governance-surfaces.test.tsx
M	apps/madbridge/test/tui-truth-safety.test.tsx
M	apps/madbridge/test/tui-writers-stage.test.tsx
A	docs/verification/phase-3b-m3-build-log.md
A	docs/verification/phase-3b-m3-evidence.md
M	packages/adapter-claude-code/src/live.ts
M	packages/adapter-madv-surface/src/live.ts
M	packages/broker/src/in-process-client.ts
M	packages/broker/src/pty-host-supervisor.ts
M	packages/supervisor/src/build.ts
A	scripts/phase3b/m3-evidence.tsx
M	test/phase3a/harness-separation.test.ts
M	test/phase3b/absence.test.tsx
A	test/phase3b/dispatch-observation.ts
A	test/phase3b/dispatch.test.ts
A	test/phase3b/ended-observation.tsx
A	test/phase3b/ended-stream.test.tsx
A	test/phase3b/input-view.tsx
A	test/phase3b/line-input.test.tsx
A	test/phase3b/m3-separation.test.ts
A	test/phase3b/madv-pane.test.tsx
A	test/phase3b/malformed-host.test.ts
A	test/phase3b/malformed-observation.ts
A	test/phase3b/pacing-settlement.test.ts
A	test/phase3b/pane-client.ts
A	test/phase3b/producer.test.ts
A	test/phase3b/retention.test.tsx
A	test/phase3b/transport-stand-in.ts
A	test/phase3b/transport.ts
A	test/phase3b/unbridged-stand-in.ts
A	test/phase3b/unbridged.ts
A	test/phase3b/usable-input.test.tsx
A	test/phase3b/usable-input.tsx
M	testdata/tui-chaos/goldens/governance_focus.grid.txt
M	testdata/tui-chaos/goldens/layout_resize.grid.txt

564-corrected-whitespace.log · SHA-256 f25a77e6e0a325309d1a163de28a8005723eecc4c194eced4fe8344279900212
565-corrected-paths.log · SHA-256 05e605262c02d9c3c3ac8da4c2014218f9f2ca7acca5d18da5a20ad177e9bbc9
566-corrected-pin.log · SHA-256 04f03f75fc347266b1a86f89d08c2180af3cb46f43557ef4f3761691ae51ccb7
567-corrected-protected.log · SHA-256 dc5393cd7708efd498d17827d4e8db96d71402de4fa09bc6226111199b2f9afc
568-corrected-packages.log · SHA-256 587f4563726f6e33d9201d83571366d6a3273868097f4081251a06fb49e82b67
569-corrected-existing.log · SHA-256 196fefe821d4dac228da382b47730b9cd2ff1a50db87c50e6771d7238ec9f165
575-corrected-importers.log · SHA-256 045f4f192a82fddd534ab15ffd6ae6f9ca3023654dfc98acb107e3298bc58ae2
576-corrected-status.log · SHA-256 d37644a8dcd0007ffe40a6aa11810b4a534dd3154bf6692ee7378909eaa52a42
577-corrected-untracked.log · SHA-256 656a68b79789f0622310d727e3ab3fb666cc9bc3e926acd5758c60d4958f939d
578-corrected-existing-diffs.log · SHA-256 a4156b747abfd99ae609922cc67adb6153ca385bbda62d7480b925f0439168b8
584-scope-confirmation.log · SHA-256 e0cc9ae015d088847f8cb3fe35af61e4f7b92d805a7e1df7e3540fa30e52865e

The full importer lists, including the lines containing literal brackets, are in 575-corrected-importers.log · SHA-256 045f4f192a82fddd534ab15ffd6ae6f9ca3023654dfc98acb107e3298bc58ae2. The CLI reached 47 source files. Newly reachable files and production private-seam importers both numbered zero. Both protected diffstats and the whitespace check produced no output.

packages/broker/test/in-process-client.test.ts:16: import { createInProcessBrokerClient, unsafeTestOnlyIngestOutputFrame } from "../src/in-process-client";

test/phase3a/runtime-harness.ts:18: import { SequenceInvariantError, unsafeTestOnlyIngestOutputFrame, unsafeTestOnlyIngestRawOutputFrame, unsafeTestOnlyOfferSnapshotSeq } from "../../packages/broker/src/in-process-client";

test/phase3b/producer.test.ts:2: import { unsafeTestOnlyIngestRawOutputFrame } from "../../packages/broker/src/in-process-client";

packages/broker/test/acknowledgement-deadline.test.ts:3: import { escalateWedgedHost, pendingAckRegisteredForTest, spawnPtyHost } from "../src/pty-host-supervisor";

packages/broker/test/pty-host-supervisor.test.ts:13: import { closeStdinCallCountForTest, escalateWedgedHost, escalationPhaseForTest, pendingAckRegisteredForTest, spawnPtyHost, subscriberCountForTest, terminateSendCountForTest, waiterCountForTest } from "../src/pty-host-supervisor";

test/phase3b/dispatch-observation.ts:4: import { pendingAckRegisteredForTest } from "../../packages/broker/src/pty-host-supervisor";

test/phase3b/dispatch.test.ts:2: import { closeStdinCallCountForTest } from "../../packages/broker/src/pty-host-supervisor";

test/phase3b/malformed-observation.ts:4: import { unsafeTestOnlyInjectHostOutput } from "../../packages/broker/src/pty-host-supervisor";

scripts/phase3b/recorded-frames.tsx:8: import { composeLiveSession } from "../../apps/madbridge/src/tui/live/composition";

test/phase3b/child-end.ts:5: import { createStartAttesters, composeLiveSession } from "../../apps/madbridge/src/tui/live/composition";

test/phase3b/scenarios.ts:4: import { composeLiveSession, createStartAttesters } from "../../apps/madbridge/src/tui/live/composition";

test/phase3b/transport.ts:5: import { createStartAttesters } from "../../apps/madbridge/src/tui/live/composition";

apps/madbridge/src/tui/App.tsx:41: import { PaneLine } from "./live/line-buffer";

apps/madbridge/src/tui/live/settings-sources.ts:3: import { managedSettingsDirectory } from "./managed-settings";

test/phase3b/settings-sources.test.ts:4: import { managedSettingsDirectory } from "../../apps/madbridge/src/tui/live/managed-settings";

apps/madbridge/src/tui/live/subscribe.ts:5: import { clientSnapshotToProjection } from "./projection";

scripts/phase3b/recorded-frames.tsx:9: import { clientSnapshotToProjection } from "../../apps/madbridge/src/tui/live/projection";

test/phase3b/ended-stream.test.tsx:4: import { clientSnapshotToProjection } from "../../apps/madbridge/src/tui/live/projection";

test/phase3b/pane-client.ts:4: import { clientSnapshotToProjection } from "../../apps/madbridge/src/tui/live/projection";

test/phase3b/projection.test.ts:4: import { clientSnapshotToProjection as project } from "../../apps/madbridge/src/tui/live/projection";

apps/madbridge/src/tui/App.tsx:42: import { usePaneOutput } from "./live/retention";

scripts/phase3b/m3-evidence.tsx:3: import { PaneRetention } from "../../apps/madbridge/src/tui/live/retention";

test/phase3b/retention.test.tsx:5: import { PaneRetention } from "../../apps/madbridge/src/tui/live/retention";

apps/madbridge/src/tui/live/composition.ts:7: import { settingsSources } from "./settings-sources";

test/phase3b/settings-sources.test.ts:5: import { settingsSources } from "../../apps/madbridge/src/tui/live/settings-sources";

test/phase3b/ended-observation.tsx:4: import { subscribeToClient } from "../../apps/madbridge/src/tui/live/subscribe";

test/phase3b/pacing-settlement.test.ts:4: import { subscribeToClient } from "../../apps/madbridge/src/tui/live/subscribe";

test/phase3b/subscribe.test.ts:3: import { subscribeToClient } from "../../apps/madbridge/src/tui/live/subscribe";

test/phase3b/usable-input.tsx:3: import { subscribeToClient } from "../../apps/madbridge/src/tui/live/subscribe";

apps/madbridge/src/tui/live/subscribe.ts:3: import { waitForSnapshotTick } from "../../../../../packages/supervisor/src/index";

packages/adapter-madv-surface/test/exit-causes.test.ts:7: import { runLiveTransactionalBuild, runPurePreflight } from "../../supervisor/src/index";

packages/supervisor/test/build-rollback.test.ts:34: import * as supervisorIndex from "../src/index";

packages/supervisor/test/live-port.test.ts:2: import { runLiveTransactionalBuild, type LiveReattestationInput } from "../src/index";

packages/supervisor/test/snapshot-timer.test.ts:3: import { waitForSnapshotTick } from "../src/index";

test/phase3b/child-end.ts:6: import { runLiveTransactionalBuild, runPurePreflight } from "../../packages/supervisor/src/index";

test/phase3b/malformed-observation.ts:2: import type { BuildResult } from "../../packages/supervisor/src/index";

test/phase3b/offline.ts:5: import { rollbackBuild, type BuildResult, type LaunchPlan } from "../../packages/supervisor/src/index";

test/phase3b/pacing-settlement.test.ts:2: import * as supervisor from "../../packages/supervisor/src/index";

test/phase3b/preflight-input.ts:5: import type { PreflightInput } from "../../packages/supervisor/src/index";

test/phase3b/scenarios.ts:5: import { runPurePreflight, runLiveTransactionalBuild } from "../../packages/supervisor/src/index";

test/phase3b/separation.test.ts:5: import { runTransactionalBuild } from "../../packages/supervisor/src/index";

test/phase3b/transport.ts:6: import { runLiveTransactionalBuild, runPurePreflight } from "../../packages/supervisor/src/index";

HEAD:apps/madbridge/src/tui/live/composition.ts:54:export async function composeLiveSession(start: Start): Promise<Result> {

HEAD:apps/madbridge/src/tui/live/subscribe.ts:7:export function subscribeToClient(client: BrokerClient) {

HEAD:scripts/phase3b/recorded-frames.tsx:17:    const outcome = await composeLiveSession({ ...f.start, async present(presented) {

HEAD:test/phase3b/child-end.ts:91:      const built = await composeLiveSession({ ...f.start, present: client => observeActive(client) });

HEAD:test/phase3b/ended-observation.tsx:54:  const off = subscribeToClient(source)(state => { if (state.connected === false) ended.resolve(state); });

HEAD:test/phase3b/pacing-settlement.test.ts:10:  const off = subscribeToClient(snapshotReader(async () => ownedSource()))(() => first.resolve());

HEAD:test/phase3b/scenarios.ts:58:      outcome = await composeLiveSession({ envelope: f.envelope, preflight: { ...f.input, signal: controller.signal },

HEAD:test/phase3b/scenarios.ts:124:    const starting = composeLiveSession({

HEAD:test/phase3b/subscribe.test.ts:44:  const off = subscribeToClient(source.client)(frame => { seen.push(frame); });

HEAD:test/phase3b/subscribe.test.ts:62:    const off = subscribeToClient(source.client)(frame => { seen.push(frame); });

HEAD:test/phase3b/subscribe.test.ts:78:    const off = subscribeToClient(source.client)(frame => { seen.push(frame); });

HEAD:test/phase3b/subscribe.test.ts:90:  const off = subscribeToClient(source.client)(frame => { seen.push(frame); });

HEAD:test/phase3b/subscribe.test.ts:99:  const stop = subscribeToClient(parked.client)(frame => { late.push(frame); });

HEAD:test/phase3b/usable-input.tsx:14:      getSnapshot: t.client.getSnapshot, subscribe: subscribeToClient(t.client),

9. B21 gates at the closing commit

67dce10bb771092743664dbdafa873e38748b5d4

600-gate-runtime.log · SHA-256 9b8f048b92cad05e4958dc80513646ceb275858123fda18c286e156eb6568d7c — Bun runtime check — 20:21  up 6 days, 11:48, 1 user, load averages: 1.41 1.76 2.12 — Sat Nov 28 01:21:21 UTC 2026 to Sat Nov 28 01:21:21 UTC 2026 — exit status 0.

601-gate-install.log · SHA-256 83770c88fd7ffacf504d9aa32dc951256c8f6c66a91589ce2b95c731981c4c00 — bun install --frozen-lockfile — 20:21  up 6 days, 11:49, 1 user, load averages: 1.35 1.74 2.10 — Sat Nov 28 01:21:33 UTC 2026 to Sat Nov 28 01:21:33 UTC 2026 — exit status 0.

602-gate-install-state.log · SHA-256 011b426e0407f0c8b80824d8b0bfda6181b38737c99325276de30d66ee0949a4 — Post-install mode restoration, tree and lock check — 20:21  1 user, load averages: 1.21 1.70 2.08 — Sat Nov 28 01:21:41 UTC 2026 to Sat Nov 28 01:21:42 UTC 2026 — exit status 0.

603-gate-typecheck.log · SHA-256 802b2f79aabcf45453d1fdd68cef2ae0310bc9ebbb32d4c450feff304bf7dbfc — bunx tsc --noEmit — 20:21  up 6 days, 11:49, 1 user, load averages: 1.23 1.68 2.07 — Sat Nov 28 01:21:54 UTC 2026 to Sat Nov 28 01:21:57 UTC 2026 — exit status 0.

604-gate-suite-runtime.log · SHA-256 e3a577189992c7a74e48f526e33dff8d49d56556b92d73af8cc1d7601d36324a — Pre-suite Bun runtime check — 20:22  up 6 days, 11:50, 1 user, load averages: 1.07 1.56 2.00 — Sat Nov 28 01:22:56 UTC 2026 to Sat Nov 28 01:22:56 UTC 2026 — exit status 0.

608-gate-suite-wait.log · SHA-256 32e73689a5447081ec919e460fbfe1117265945eef4e8b5693b0dcabc6d1b934 — Logged load wait — 20:28  up 6 days, 11:56, 1 user, load averages: 2.70 2.29 2.17 — Sat Nov 28 01:28:39 UTC 2026 to Sat Nov 28 01:29:39 UTC 2026 — exit status 0.

609-gate-suite.log · SHA-256 04c01e982688429dfeb9fdedfe2b09b09419f938f559edab94d9857471c301a8 — bun test — 20:29  up 6 days, 11:57, 1 user, load averages: 1.91 2.14 2.12 — Sat Nov 28 01:29:39 UTC 2026 to Sat Nov 28 01:34:19 UTC 2026 — exit status 0.

The installed Bun was 1.4.2. Frozen install verified 87 installs across 131 packages with no dependency changes. The install timing line is in 601-gate-install.log · SHA-256 83770c88fd7ffacf504d9aa32dc951256c8f6c66a91589ce2b95c731981c4c00. bun.lock stayed a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830. TypeScript produced no diagnostics.

 2159 pass
 0 fail
 28751 expect() calls
Ran 2159 tests across 178 files. The original timing line is in 609-gate-suite.log · SHA-256 04c01e982688429dfeb9fdedfe2b09b09419f938f559edab94d9857471c301a8.

625-gate-list.log · SHA-256 e84854546da0b83dfa9f0bb50d5094594e9d0f382dda89b5fd14c612669e37eb

626-gate-comparison.log · SHA-256 1281f195e04beef896ce22cc2a482ba73779ff74d7efd068d3171ab95b479684

Same 2,159 tests and 178 files as the corrected full run. Every baseline occurrence passed with no skips or todos.

10. Diff against a7ceccbe96950b63646edc1dc6cc8590c957bf28

613-final-diff-stat.log · SHA-256 5336302a563e2e4a1bf0430e24c8e0a43aea562f526febf21331bc467012dd4f

 apps/madbridge/src/tui/App.tsx                     |   85 +-
 apps/madbridge/src/tui/components/DockStrip.tsx    |   16 +-
 apps/madbridge/src/tui/components/PaneTabs.tsx     |    6 +-
 apps/madbridge/src/tui/components/StatusBar.tsx    |   12 +-
 .../madbridge/src/tui/components/agent-identity.ts |    5 +-
 apps/madbridge/src/tui/hooks/useKeyboard.ts        |    2 +-
 apps/madbridge/src/tui/keybindings.ts              |    2 +-
 apps/madbridge/src/tui/keyboard-router.ts          |    8 +-
 apps/madbridge/src/tui/live/line-buffer.ts         |   85 +
 apps/madbridge/src/tui/live/retention.ts           |  127 +
 apps/madbridge/src/tui/main.tsx                    |   14 +-
 apps/madbridge/src/tui/panes/AntigravityPane.tsx   |   23 +-
 apps/madbridge/src/tui/panes/ClaudePane.tsx        |   11 +-
 apps/madbridge/src/tui/panes/GovernancePane.tsx    |    7 +-
 apps/madbridge/src/tui/types.ts                    |    2 +-
 .../test/tui-governance-surfaces.test.tsx          |   26 +-
 apps/madbridge/test/tui-truth-safety.test.tsx      |   13 +-
 apps/madbridge/test/tui-writers-stage.test.tsx     |  108 +-
 docs/verification/phase-3b-m3-build-log.md         | 5463 ++++++++++++++++++++
 docs/verification/phase-3b-m3-evidence.md          |   95 +
 packages/adapter-claude-code/src/live.ts           |    3 +
 packages/adapter-madv-surface/src/live.ts          |   20 +-
 packages/broker/src/in-process-client.ts           |   44 +-
 packages/broker/src/pty-host-supervisor.ts         |   97 +-
 packages/supervisor/src/build.ts                   |   35 +-
 scripts/phase3b/m3-evidence.tsx                    |   76 +
 test/phase3a/harness-separation.test.ts            |    2 +-
 test/phase3b/absence.test.tsx                      |   16 +-
 test/phase3b/dispatch-observation.ts               |   51 +
 test/phase3b/dispatch.test.ts                      |  127 +
 test/phase3b/ended-observation.tsx                 |   59 +
 test/phase3b/ended-stream.test.tsx                 |   58 +
 test/phase3b/input-view.tsx                        |   19 +
 test/phase3b/line-input.test.tsx                   |  103 +
 test/phase3b/m3-separation.test.ts                 |   37 +
 test/phase3b/madv-pane.test.tsx                    |   20 +
 test/phase3b/malformed-host.test.ts                |   19 +
 test/phase3b/malformed-observation.ts              |   81 +
 test/phase3b/pacing-settlement.test.ts             |   25 +
 test/phase3b/pane-client.ts                        |   65 +
 test/phase3b/producer.test.ts                      |   26 +
 test/phase3b/retention.test.tsx                    |   68 +
 test/phase3b/transport-stand-in.ts                 |   59 +
 test/phase3b/transport.ts                          |   91 +
 test/phase3b/unbridged-stand-in.ts                 |   16 +
 test/phase3b/unbridged.ts                          |   47 +
 test/phase3b/usable-input.test.tsx                 |   31 +
 test/phase3b/usable-input.tsx                      |   39 +
 .../tui-chaos/goldens/governance_focus.grid.txt    |    4 +-
 testdata/tui-chaos/goldens/layout_resize.grid.txt  |    4 +-
 50 files changed, 7279 insertions(+), 173 deletions(-)

614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d. All quoted diff lines have trailing whitespace removed.

diff --git a/apps/madbridge/src/tui/App.tsx b/apps/madbridge/src/tui/App.tsx

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/apps/madbridge/src/tui/components/DockStrip.tsx b/apps/madbridge/src/tui/components/DockStrip.tsx

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/apps/madbridge/src/tui/components/PaneTabs.tsx b/apps/madbridge/src/tui/components/PaneTabs.tsx

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/apps/madbridge/src/tui/components/StatusBar.tsx b/apps/madbridge/src/tui/components/StatusBar.tsx

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/apps/madbridge/src/tui/components/agent-identity.ts b/apps/madbridge/src/tui/components/agent-identity.ts

diff --git a/apps/madbridge/src/tui/components/agent-identity.ts b/apps/madbridge/src/tui/components/agent-identity.ts
index 6729036..53698c6 100644
--- a/apps/madbridge/src/tui/components/agent-identity.ts
+++ b/apps/madbridge/src/tui/components/agent-identity.ts
@@ -7,11 +7,10 @@
 //
 // Presentation only — no authority decisions, no broker imports.

-import type { CliSurface } from "@madventures/protocol";
 import type { BrokerSnapshot, SeatId, SeatMode, FocusTarget } from "../types";
 import { SEATS } from "../types";

-export type AgentSurface = CliSurface; // "claude-code" | "antigravity"
+export type AgentSurface = "claude-code" | "madv-surface";

 // ─── Seat resolution (LOCAL UI posture — no authority semantics) ───
 //
@@ -37,7 +36,7 @@ export function seatLabel(seat: SeatId): string {

 /** Header label shown at the top of an agent pane or dock strip. */
 export function agentHeaderLabel(surface: AgentSurface): string {
-  return surface === "claude-code" ? "CLAUDE CODE" : "ANTIGRAVITY";
+  return surface === "claude-code" ? "CLAUDE CODE" : "MADV-SURFACE";
 }

 /**

diff --git a/apps/madbridge/src/tui/hooks/useKeyboard.ts b/apps/madbridge/src/tui/hooks/useKeyboard.ts

diff --git a/apps/madbridge/src/tui/hooks/useKeyboard.ts b/apps/madbridge/src/tui/hooks/useKeyboard.ts
index 24dbf1b..b487ce0 100644
--- a/apps/madbridge/src/tui/hooks/useKeyboard.ts
+++ b/apps/madbridge/src/tui/hooks/useKeyboard.ts
@@ -36,7 +36,7 @@ export function useKeyboard(opts: UseKeyboardOptions): KeyboardHandler {
           opts.onFocusChange("claude");
           break;
         case "focus-antigravity":
-          opts.onFocusChange("antigravity");
+          opts.onFocusChange("madv-surface");
           break;
         case "focus-governance":
           opts.onFocusChange("governance");

diff --git a/apps/madbridge/src/tui/keybindings.ts b/apps/madbridge/src/tui/keybindings.ts

diff --git a/apps/madbridge/src/tui/keybindings.ts b/apps/madbridge/src/tui/keybindings.ts
index 983e91f..071d045 100644
--- a/apps/madbridge/src/tui/keybindings.ts
+++ b/apps/madbridge/src/tui/keybindings.ts
@@ -10,7 +10,7 @@
 // GLM-20260918-FOUNDER-TUI-SEATS: a seat is a named posture that focuses the
 // seat's pane (builder/architect → Claude, operator → Governance) and sets
 // the mode label on the bars. The previous Alt+1..4 pane-focus map moved to
-// Alt+4 (antigravity) and Alt+5 (events); "focus-claude" and
+// Alt+4 (madv-surface) and Alt+5 (events); "focus-claude" and
 // "focus-governance" remain valid actions reachable via the FOUNDER_TUI_KEYS
 // override. Ctrl+P opens the model picker — a modal whose keys are captured
 // while open, which intentionally withholds Ctrl+P from the PTYs.

diff --git a/apps/madbridge/src/tui/keyboard-router.ts b/apps/madbridge/src/tui/keyboard-router.ts

diff --git a/apps/madbridge/src/tui/keyboard-router.ts b/apps/madbridge/src/tui/keyboard-router.ts
index a2b4560..c48f32e 100644
--- a/apps/madbridge/src/tui/keyboard-router.ts
+++ b/apps/madbridge/src/tui/keyboard-router.ts
@@ -81,7 +81,7 @@ export interface RouteKeyInput {
  * ALL of these conditions must hold:
  * 1. showApprovalDialog === true
  * 2. displayedApprovalId !== null
- * 3. focus === "governance" (Claude, Antigravity, Events are ALL inert)
+ * 3. focus === "governance" (Claude, madv-surface, Events are ALL inert)
  * 4. No incident/interruption has precedence (fail closed when
  *    snapshot.sessionState === "interrupted" or snapshot.incident !== null)
  * 5. The stored approval ID still exists in the snapshot's pendingApprovals
@@ -98,7 +98,7 @@ export function validateApprovalResolution(
   // 2. Must be bound to a stored approval ID
   if (state.displayedApprovalId === null) return null;

-  // 3. Only governance focus authorizes — Claude, Antigravity, Events
+  // 3. Only governance focus authorizes — Claude, madv-surface, Events
   // are ALL inert even if the dialog is somehow visible.
   if (state.focus !== "governance") return null;

@@ -163,8 +163,8 @@ export function routeKeyEvent(input: RouteKeyInput): KeyboardRouterState {
         return { ...state, focus: "claude" };

       case "focus-antigravity":
-        callbacks.onFocusChange("antigravity");
-        return { ...state, focus: "antigravity" };
+        callbacks.onFocusChange("madv-surface");
+        return { ...state, focus: "madv-surface" };

       case "focus-governance":
         callbacks.onFocusChange("governance");

diff --git a/apps/madbridge/src/tui/live/line-buffer.ts b/apps/madbridge/src/tui/live/line-buffer.ts

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/apps/madbridge/src/tui/live/retention.ts b/apps/madbridge/src/tui/live/retention.ts

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/apps/madbridge/src/tui/main.tsx b/apps/madbridge/src/tui/main.tsx

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/apps/madbridge/src/tui/panes/AntigravityPane.tsx b/apps/madbridge/src/tui/panes/AntigravityPane.tsx

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/apps/madbridge/src/tui/panes/ClaudePane.tsx b/apps/madbridge/src/tui/panes/ClaudePane.tsx

diff --git a/apps/madbridge/src/tui/panes/ClaudePane.tsx b/apps/madbridge/src/tui/panes/ClaudePane.tsx
index d35a5c5..80b295b 100644
--- a/apps/madbridge/src/tui/panes/ClaudePane.tsx
+++ b/apps/madbridge/src/tui/panes/ClaudePane.tsx
@@ -9,7 +9,7 @@
 // If an identity, role, model, writer, or token is unavailable, an explicit
 // honest word is rendered. Never invented.
 //
-// Border: borderStyle="single" consistently (matches AntigravityPane).
+// Border: borderStyle="single" consistently (matches MadvSurfacePane).
 // Presentation only — no authority decisions.

 import type { BrokerSnapshot } from "../types";
@@ -26,9 +26,11 @@ export interface ClaudePaneProps {
   active: boolean;
   state: BrokerSnapshot | null;
   ptyOutput: string;
+  commandWord?: string;
+  onPaneSize?: (cols: number, rows: number) => void;
 }

-export function ClaudePane({ active, state, ptyOutput }: ClaudePaneProps) {
+export function ClaudePane({ active, state, ptyOutput, commandWord, onPaneSize }: ClaudePaneProps) {
   const surface = "claude-code" as const;
   const role = resolveRole(state, surface);
   const model = resolveModel(state, surface);
@@ -49,6 +51,7 @@ export function ClaudePane({ active, state, ptyOutput }: ClaudePaneProps) {
   }
   headerParts.push(role);
   headerParts.push(model);
+  if (commandWord) headerParts.push(commandWord);
   const header = headerParts.join(" | ");

   return (
@@ -56,7 +59,9 @@ export function ClaudePane({ active, state, ptyOutput }: ClaudePaneProps) {
       <box>
         <text><strong>{header}</strong></text>
       </box>
-      <box flexGrow={1} overflow="hidden">
+      <box id="claude-output" flexGrow={1} overflow="hidden" onSizeChange={function () {
+        onPaneSize?.(this.width, this.height);
+      }}>
         <text>{ptyOutput || "Waiting for launch..."}</text>
       </box>
     </box>

diff --git a/apps/madbridge/src/tui/panes/GovernancePane.tsx b/apps/madbridge/src/tui/panes/GovernancePane.tsx

diff --git a/apps/madbridge/src/tui/panes/GovernancePane.tsx b/apps/madbridge/src/tui/panes/GovernancePane.tsx
index 8e72ec6..cadc6fa 100644
--- a/apps/madbridge/src/tui/panes/GovernancePane.tsx
+++ b/apps/madbridge/src/tui/panes/GovernancePane.tsx
@@ -21,7 +21,7 @@

 import { useTerminalDimensions } from "@opentui/react";
 import type { BrokerSnapshot } from "../types";
-import { truncateToWidth } from "../components/agent-identity";
+import { livenessWord, truncateToWidth } from "../components/agent-identity";
 import { POSEIDON } from "../theme";

 export interface GovernancePaneProps {
@@ -52,6 +52,7 @@ export function GovernancePane({ active, state }: GovernancePaneProps) {
     return (
       <box flexGrow={1} flexDirection="column" borderStyle="single" borderColor={active ? POSEIDON.accent : POSEIDON.uiBorder} overflow="hidden">
         <text>{fit(state?.connected === null ? "GOVERNANCE | UNKNOWN" : "GOVERNANCE | NOT CONNECTED")}</text>
+        {state?.connected === false && <text>{fit("Writer / Token / Ownership: " + livenessWord(state))}</text>}
         <text>{fit("No current permissions, verification, or review.")}</text>
       </box>
     );
@@ -59,7 +60,7 @@ export function GovernancePane({ active, state }: GovernancePaneProps) {

   // Safe accessors — resolve identities by surface.
   const cl = state.executions?.find((e) => e.surface === "claude-code");
-  const agy = state.executions?.find((e) => e.surface === "antigravity");
+  const madv = state.executions?.find((e) => e.surface === "madv-surface");
   const perms = state.permissionSummary;
   const verification = state.verificationStatus;
   const review = state.reviewStatus;
@@ -78,7 +79,7 @@ export function GovernancePane({ active, state }: GovernancePaneProps) {
   rows.push("Task ID: " + (state.task?.task_id ?? "—") + " | Repo: " + (state.task?.repository ?? "—"));
   rows.push("Fingerprint: " + (state.repositoryFingerprint ? state.repositoryFingerprint.git_sha.slice(0, 12) : "—"));
   rows.push("Claude: " + (cl?.execution_id ?? "—"));
-  rows.push("Antigravity: " + (agy?.execution_id ?? "—"));
+  rows.push("madv-surface: " + (madv?.execution_id ?? "—"));
   rows.push("Writer: " + (state.activeWriter ?? "—") + " | Token: " + (state.fencingToken ?? "—") + " | Ownership: " + (state.ownershipState ?? "UNKNOWN"));
   rows.push("Read: " + readPaths + " | Write: " + writePaths);
   rows.push("Commands: " + cmdCats + " | Egress: " + egress + " | Data class: " + dataClass);

diff --git a/apps/madbridge/src/tui/types.ts b/apps/madbridge/src/tui/types.ts

diff --git a/apps/madbridge/src/tui/types.ts b/apps/madbridge/src/tui/types.ts
index cd5c464..511ff63 100644
--- a/apps/madbridge/src/tui/types.ts
+++ b/apps/madbridge/src/tui/types.ts
@@ -10,7 +10,7 @@ import type {
   RepositoryFingerprint,
 } from "@madventures/protocol";

-export type FocusTarget = "claude" | "antigravity" | "governance" | "events";
+export type FocusTarget = "claude" | "madv-surface" | "governance" | "events";

 /**
  * Founder seat — a named LOCAL posture. A seat chooses which pane gets focus

diff --git a/apps/madbridge/test/tui-governance-surfaces.test.tsx b/apps/madbridge/test/tui-governance-surfaces.test.tsx

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/apps/madbridge/test/tui-truth-safety.test.tsx b/apps/madbridge/test/tui-truth-safety.test.tsx

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/apps/madbridge/test/tui-writers-stage.test.tsx b/apps/madbridge/test/tui-writers-stage.test.tsx

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/packages/adapter-claude-code/src/live.ts b/packages/adapter-claude-code/src/live.ts

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/packages/adapter-madv-surface/src/live.ts b/packages/adapter-madv-surface/src/live.ts

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/packages/broker/src/in-process-client.ts b/packages/broker/src/in-process-client.ts

diff --git a/packages/broker/src/in-process-client.ts b/packages/broker/src/in-process-client.ts
index 4ef8cd5..d13d425 100644
--- a/packages/broker/src/in-process-client.ts
+++ b/packages/broker/src/in-process-client.ts
@@ -200,6 +200,19 @@ export function createInProcessBrokerClient(
   broker: RuntimeBroker,
   principal: ClientPrincipal,
 ): InProcessBrokerClient {
+  return bindClient(broker, principal).client;
+}
+
+/** The live build keeps the delivery function separate from the client it presents. */
+export function createLiveFounderClient(broker: RuntimeBroker, bridges: ReadonlyMap<string, HostBridge>) {
+  return bindClient(broker, { kind: "founder_tui" }, bridges);
+}
+
+type PtyCommand = Extract<BrokerCommand, { kind: "pty_input" | "pty_resize" }>;
+export type HostBridge = (command: PtyCommand) => Promise<boolean>;
+
+function bindClient(broker: RuntimeBroker, principal: ClientPrincipal, bridges?: ReadonlyMap<string, HostBridge>) {
+  const inFlight = new Map<string, Promise<BrokerResult>>();
   // The principal request() evaluates under never leaves this closure; the
   // one callers can read is a separate frozen copy.
   const evaluatedPrincipal = bindPrincipal(principal);
@@ -349,6 +362,25 @@ export function createInProcessBrokerClient(
     if (!legality.ok) {
       return { ok: false, commandId, error: legality.error, detail: legality.detail };
     }
+    if (bridges && (captured.kind === "pty_input" || captured.kind === "pty_resize")) {
+      const executionId = captured.executionId;
+      const wire = captured.kind === "pty_input" ? { ...captured, bytes: new Uint8Array(captured.bytes) } : captured;
+      const dispatch = async (): Promise<BrokerResult> => {
+        // A command can wait behind one for the same host. Check authority at the write.
+        const current = evaluateCommandLegality(wire, projectSnapshot(broker.snapshotProjectionInput()), evaluatedPrincipal);
+        if (!current.ok) return { ok: false, commandId, error: current.error, detail: current.detail };
+        const send = bridges.get(executionId);
+        if (closed || !send || !await send(wire)) {
+          return { ok: false, commandId, error: "host_unavailable", detail: "host unavailable" };
+        }
+        return { ok: true, commandId, acceptedSnapshotSeq: deliveredSeq };
+      };
+      const previous = inFlight.get(executionId);
+      const next = previous ? previous.then(dispatch, dispatch) : dispatch();
+      inFlight.set(executionId, next);
+      try { return await next; }
+      finally { if (inFlight.get(executionId) === next) inFlight.delete(executionId); }
+    }
     switch (captured.kind) {
       case "session_pause":
         await broker.pause(commandId);
@@ -408,6 +440,11 @@ export function createInProcessBrokerClient(
     close,
   });

+  async function deliver(frame: OutputFrame): Promise<void> {
+    const violation = ingestOutputFrame(frame);
+    if (violation !== null) await raise(violation);
+  }
+
   testSeams.set(client, {
     ingestStamped(executionId, bytes) {
       if (closed) {
@@ -441,10 +478,7 @@ export function createInProcessBrokerClient(
       }
       // B5: the check and the delivery are synchronous; a refused frame
       // interrupts the session, awaited, and only then rejects.
-      const violation = ingestOutputFrame(frame);
-      if (violation !== null) {
-        return raise(violation);
-      }
+      await deliver(frame);
     },
     async offerSnapshotSeq(candidate) {
       const violation = admitSnapshotSeq(candidate);
@@ -454,7 +488,7 @@ export function createInProcessBrokerClient(
     },
   });

-  return client;
+  return { client, deliver: (frame: OutputFrame) => closed ? Promise.resolve() : deliver(frame) };
 }

 function seamsOf(client: InProcessBrokerClient): TestSeams {

diff --git a/packages/broker/src/pty-host-supervisor.ts b/packages/broker/src/pty-host-supervisor.ts

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/packages/supervisor/src/build.ts b/packages/supervisor/src/build.ts

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/scripts/phase3b/m3-evidence.tsx b/scripts/phase3b/m3-evidence.tsx

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/test/phase3a/harness-separation.test.ts b/test/phase3a/harness-separation.test.ts

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/test/phase3b/absence.test.tsx b/test/phase3b/absence.test.tsx

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/test/phase3b/dispatch-observation.ts b/test/phase3b/dispatch-observation.ts

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/test/phase3b/dispatch.test.ts b/test/phase3b/dispatch.test.ts

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/test/phase3b/ended-observation.tsx b/test/phase3b/ended-observation.tsx

diff --git a/test/phase3b/ended-observation.tsx b/test/phase3b/ended-observation.tsx
new file mode 100644
index 0000000..ebd6c2d
--- /dev/null
+++ b/test/phase3b/ended-observation.tsx
@@ -0,0 +1,59 @@
+import { testRender } from "@opentui/react/test-utils";
+import { act, type ReactNode } from "react";
+import type { BrokerClient, BrokerSnapshot as Source } from "@madventures/broker";
+import { subscribeToClient } from "../../apps/madbridge/src/tui/live/subscribe";
+import { StatusBar } from "../../apps/madbridge/src/tui/components/StatusBar";
+import { DockStrip } from "../../apps/madbridge/src/tui/components/DockStrip";
+import { ClaudePane } from "../../apps/madbridge/src/tui/panes/ClaudePane";
+import { MadvSurfacePane } from "../../apps/madbridge/src/tui/panes/AntigravityPane";
+import { GovernancePane } from "../../apps/madbridge/src/tui/panes/GovernancePane";
+import type { BrokerSnapshot } from "../../apps/madbridge/src/tui/types";
+import { paneSnapshot } from "./pane-client";
+import { fingerprint } from "./snapshot-input";
+
+export function ownedSource(): Source {
+  return paneSnapshot({ ownershipState: { kind: "owned", executionId: "builder",
+    worktreeId: "offline", fencingToken: 17, repositoryFingerprint: fingerprint } });
+}
+
+export function snapshotReader(read: () => Promise<Source>): BrokerClient {
+  function unused(): never { throw new Error("unused synthetic operation"); }
+  return { getSnapshot: read, async *output() {}, async *snapshots() {},
+    close: unused, publish: unused, request: unused };
+}
+
+export async function rendered(node: ReactNode, width = 180): Promise<string> {
+  const view = await testRender(node, { width, height: 40 });
+  try {
+    await view.flush();
+    return view.captureCharFrame().split("\n").map(row => row.trimEnd()).filter(Boolean).join("\n");
+  } finally { await act(async () => { view.renderer.destroy(); }); }
+}
+
+export async function authorityRows(state: BrokerSnapshot) {
+  const status = (width: number) => rendered(<StatusBar state={state} connected={state.connected} focus="claude" />, width);
+  return {
+    status: await status(180), compact: await status(60),
+    governance: await rendered(<GovernancePane active state={state} />),
+    claude: await rendered(<ClaudePane active state={state} ptyOutput="" />),
+    madv: await rendered(<MadvSurfacePane active state={state} ptyOutput="" />),
+    claudeDock: await rendered(<DockStrip surface="claude-code" state={state} ptyOutput="" />),
+    madvDock: await rendered(<DockStrip surface="madv-surface" state={state} ptyOutput="" />),
+  };
+}
+
+export async function endedObservation(end: "failed read" | "closed client") {
+  const first = ownedSource();
+  let reads = 0;
+  const source = snapshotReader(async () => {
+    if (++reads === 1) return first;
+    if (end === "failed read") throw new Error("synthetic refusal");
+    return { ...first, connected: false, phase: "closed" };
+  });
+  const ended = Promise.withResolvers<BrokerSnapshot>();
+  const off = subscribeToClient(source)(state => { if (state.connected === false) ended.resolve(state); });
+  try {
+    const projection = await ended.promise;
+    return { end, reads, projection, rows: await authorityRows(projection) };
+  } finally { off(); }
+}

diff --git a/test/phase3b/ended-stream.test.tsx b/test/phase3b/ended-stream.test.tsx

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/test/phase3b/input-view.tsx b/test/phase3b/input-view.tsx

diff --git a/test/phase3b/input-view.tsx b/test/phase3b/input-view.tsx
new file mode 100644
index 0000000..e72a39d
--- /dev/null
+++ b/test/phase3b/input-view.tsx
@@ -0,0 +1,19 @@
+import { act } from "react";
+import { testRender } from "@opentui/react/test-utils";
+import { App, type PaneClient } from "../../apps/madbridge/src/tui/App";
+import { offlineCatalog } from "./pane-client";
+
+export async function inputView(client: PaneClient) {
+  const view = await testRender(<App client={client} catalogLoader={offlineCatalog} />, { width: 184, height: 60 });
+  async function key(name: string, meta = false) {
+    await act(async () => { view.mockInput.pressKey(name, { meta }); });
+    await view.flush();
+  }
+  async function line(text: string) {
+    for (const letter of text) await key(letter);
+    await key("RETURN");
+  }
+  async function close() { await act(async () => { view.renderer.destroy(); }); }
+  await view.flush();
+  return { ...view, key, line, close };
+}

diff --git a/test/phase3b/line-input.test.tsx b/test/phase3b/line-input.test.tsx

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/test/phase3b/m3-separation.test.ts b/test/phase3b/m3-separation.test.ts

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/test/phase3b/madv-pane.test.tsx b/test/phase3b/madv-pane.test.tsx

diff --git a/test/phase3b/madv-pane.test.tsx b/test/phase3b/madv-pane.test.tsx
new file mode 100644
index 0000000..d99f3cb
--- /dev/null
+++ b/test/phase3b/madv-pane.test.tsx
@@ -0,0 +1,20 @@
+import { expect, test } from "bun:test";
+import { inputView } from "./input-view";
+import { paneClient, paneSnapshot } from "./pane-client";
+
+test("Alt+4 focuses the madv-surface execution", async () => {
+  const f = paneClient(paneSnapshot({ activeWriterExecutionId: "reviewer", fencingToken: 37 }));
+  const v = await inputView(f.client);
+  try {
+    const dock = v.captureCharFrame().split("\n").find(row => row.includes("docked"));
+    expect(dock).toContain("MADV-SURFACE");
+    expect(dock).toContain("reviewer-model");
+    expect(dock).toContain("WRITER tok#37");
+    await v.key("4", true);
+    const focused = v.captureCharFrame().split("\n").find(row => row.includes("FOCUSED"));
+    expect(focused).toContain("MADV-SURFACE");
+    expect(focused).toContain("reviewer-model");
+    expect(focused).toContain("WRITER tok#37");
+    expect(v.captureCharFrame().split("\n").find(row => row.includes("docked"))).toContain("CLAUDE CODE");
+  } finally { await v.close(); f.close(); }
+});

diff --git a/test/phase3b/malformed-host.test.ts b/test/phase3b/malformed-host.test.ts

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/test/phase3b/malformed-observation.ts b/test/phase3b/malformed-observation.ts

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/test/phase3b/pacing-settlement.test.ts b/test/phase3b/pacing-settlement.test.ts

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/test/phase3b/pane-client.ts b/test/phase3b/pane-client.ts

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/test/phase3b/producer.test.ts b/test/phase3b/producer.test.ts

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/test/phase3b/retention.test.tsx b/test/phase3b/retention.test.tsx

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/test/phase3b/transport-stand-in.ts b/test/phase3b/transport-stand-in.ts

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/test/phase3b/transport.ts b/test/phase3b/transport.ts

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/test/phase3b/unbridged-stand-in.ts b/test/phase3b/unbridged-stand-in.ts

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/test/phase3b/unbridged.ts b/test/phase3b/unbridged.ts

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/test/phase3b/usable-input.test.tsx b/test/phase3b/usable-input.test.tsx

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/test/phase3b/usable-input.tsx b/test/phase3b/usable-input.tsx

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/testdata/tui-chaos/goldens/governance_focus.grid.txt b/testdata/tui-chaos/goldens/governance_focus.grid.txt

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

diff --git a/testdata/tui-chaos/goldens/layout_resize.grid.txt b/testdata/tui-chaos/goldens/layout_resize.grid.txt

The complete diff of this file contains square brackets. 614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d.

11. Artifacts and attribution checks

tui/docs/verification/phase-3b-m3-build-log.md · SHA-256 9f6df429036f43e09aefb32c550734c2473e38d99cb8accb5b5f87f1489609ed

tui/docs/verification/phase-3b-m3-evidence.md · SHA-256 6bdc7fa2a766a2f6788cccbc092cfdfcd8fda359c7a114fc4af4c5799020e91b

pr/pr-title.txt · SHA-256 4f755fa41df3e98229b7a8c14e1b8039d92387ee7492a4d57b060f5152784596

pr/pr-body.md · SHA-256 f2957a3cd086dbb21ae3e7931a76cfcac73eb6b7b9a3480337deb2b53cea7701

628-prbody-attribution.log · SHA-256 3dc1a73a017a42313c06515a432d63d31b326325a103ceeadff08e712f95f9e6

629-branch-attribution.log · SHA-256 dae9b885acc01d480938006db7c3db3dc3700e80fbeecfc0f7af46332a20afb2

Both attribution-shape checks passed. The pr mode range includes all eleven file-changing commits from the binding base. The report’s own SHA-256 is supplied by the independent write receipt and final delivery message.

12. Numbered logs and deviations

Halt 1. The principal-bridge break failed at adapter construction in log 221 before the no-write assertion. Logs 217–222 and the cause review in 241 are inconclusive. The break was restored. Three further breaks ran in logs 223–240 before the cause review found the missed assertion. Their targeted failures and restores stand. Every subsequent break required confirmation of the preceding targeted assertion. The first halt added no round.

Halt 2. The first resume required the principal-bridge break before R4. The second resume transferred it to the Founder, declined a recording-only substitute and let the conditional test-strengthening instruction lapse. R3 code and its tests stood at the ruled commit. This halt added no round.

Declined R3 execution-principal bridge break because it requires implementing and exercising a working cross-principal write to a real PTY host. The Founder owns the break at the last commit.

Halt 3. Run 292 began at load 2.16 after wait 291 had released at 1.96. Four new R4 tests failed. The observation helper reached its 3500 ms deadline twice. The Founder ruled that lowercase mock return and backspace produced no control bytes, placing all four failures under the own-work rule at any load. Run 292 stays failed. The two helper-deadline failures were not Addendum 5 B2 timeouts. The third resume authorized a combined wait and test as one approved command, with separate logs and separate first uptime readings. The corrected run and subsequent waits for tests or evidence used it. The full B2 load rule applied again from the corrected run. This halt added no round.

The early-ack break also produced FixturePreflightFailed:identity_mismatch in log 209. Its own target failed at the acknowledgement assertion. The unbridged test passed on the committed code in 193 and 199 and under the breaks in 215, 233 and 239. In 227 the original build ran and failed at the intended no-write assertion. Log 244 identified several preflight paths that report identity_mismatch. The record does not identify which produced the observation. No additional run was made to investigate it.

The opening remains byte-identical. In its line 1568 a line number, tab and closing brace precede the status for log 028. The entry should read as follows.

028-task-design.log — 13:39  1 user, load averages: 2.34 2.50 2.65 — exit status 0. SHA-256 c3b188d41ff8ccddf0664b934df5d219a9173d4a4cc6761ff99843dc259ff080.

The first R1 zero-sequence break was restored before Bun exited. Logs 085–090 repeated it through test exit and verified restoration. The R2 render test initially checked the focus change too early in log 124. After the test awaited the update, 127 passed. The R3 type check in 195 diagnosed a widened command kind and an envelope input type. Both were fixed in 196 and passed in 197. R4 mock-key and observation corrections in 314 led to five passing tests in 317. R7's incremental type check in 440 found overly narrow inferred types on values assigned by callbacks. The typed observation record in 441 passed compilation in 442 and both tests in 444.

The R5 tests retained historical test titles and opaque fixture execution IDs while updating the rendered surface. R6 uses the existing liveness presentation in both docks and stages. In R7 the seam accepts only the two recorded invalid facts. A real stand-in output wakes the read. The post-handover private madv-surface reason is identified at the executed catch site, alongside the directly observed public cause. R8 uses one evidence entry point and six source files.

Source-inspection log 433 included an incorrect filename for the producer test. Logs 434 and 436 identified the file and read it. Inspection 491 ended with SIGPIPE from a limited display of the attribution script. Its relevant arguments were read in 492 and 494. In 498 the zsh variable path shadowed the shell command search path inside the logging subshell. That inspection exited 127 and lacks an end timestamp. Corrected inspection 499 used a separate variable and exited 0. The host search path was unaffected.

Halt 4. The R8 suite in log 490 passed 2,157 tests. Both failures came from base tests in packages/tui-chaos/test/review-corrections.test.ts. The mixed test at line 174 and layout-only test at line 225 expected the scenario command to exit 0. Its actual exit was 1. The exact grid comparison retained the former dock in two files. The Founder ruled that the files are part of the existing tests under B19. The ruling permits the stamp and the second dock row alone. This halt added no round.

The fourth resume replaced the signed, undelivered resume-m3-4-golden-grids.md, SHA-256 999f8ad1eb43319136f6ee60411da911393aa3f553c304d62c677f3e410f4160, transfer commit 8d350a4d47cab6059ee91a9fcb0caac9b3e27bab. The delivered revision includes the R8 evidence manifest in the resume checks. Logs 521 through 533 verify the prompts, workspace, prior reports, evidence and receipts.

Log 539 exhausted the twenty-minute load wait before the golden update. After the Founder supplied a 1.24 reading, log 540 measured 1.90 and log 541 started at 1.90. The wait did not start Bun. Logs 537 and 541 preserve the expected pre-update failure and the successful update. This load wait added no halt.

An early source search ended unsuccessfully in log 186. The opening records source-read exceptions in 015, 019, 036 and 041. Report check 517 rejected a bracketed excerpt and 518 corrected the excerpt before the fourth halt report was written. The corrected full-run importer inventory in 570 encountered a source Git classified as binary, and 573 encountered a word-boundary expression the Mac grep did not match. The inventory was corrected to request text records and a POSIX call pattern. Log 575 completed the inventory and CLI traversal. Log 588 rejected a draft quotation containing a configuration path literal before appending any text. The quotation omits that source line. These were reporting corrections. No repository source changed during them.

m3-halt-1-report.md · SHA-256 3a6407778d508fea8e62d165a5b84f42ab25c21222a157ee96625162da214302
m3-halt-2-report.md · SHA-256 72d3047839cf01c3339fab1eace2d04498db0143f33208ebbaffd723f87af7ee
m3-halt-3-report.md · SHA-256 2b3b927859e936617abd01c8f302b43344de058e80a36f386e58c9cbf4805d16
m3-halt-4-report.md · SHA-256 8c799d8bfb6f308b15b2cfc7be62b4ce2da0b03565d02365fba843705ce113df

The only computed call in build.ts still opens the iterator on host.handle.facts(). Line 30 of the separation test changed at R1 and R3. Quoted diff lines have trailing whitespace removed.
073-r1-pin.log · SHA-256 81ecc9959c732120b97926cbccb07298f020e64c8247148fddfbf4e507c31210
diff --git a/test/phase3a/harness-separation.test.ts b/test/phase3a/harness-separation.test.ts
index 6079ae7..e3c7e5b 100644
--- a/test/phase3a/harness-separation.test.ts
+++ b/test/phase3a/harness-separation.test.ts
(lines omitted)
Old build.ts SHA-256 0b329d97e88a13bd58902fe7dd1afe971d52c61bbf310862230465fd1fdd3553
New build.ts SHA-256 1c1a766135f45c7bd1c07799f532fefd6ffdd2fadbe2c587821b233b45aa78bc
The exact changed lines include bracketed computed-call syntax. The complete unified diff is in the cited source.
190-r3-pin.log · SHA-256 ded6a5258f3100767510fac7df389ccf13018661160bdd61039eee5f013c5228
diff --git a/test/phase3a/harness-separation.test.ts b/test/phase3a/harness-separation.test.ts
index e3c7e5b..5468f39 100644
--- a/test/phase3a/harness-separation.test.ts
+++ b/test/phase3a/harness-separation.test.ts
(lines omitted)
Old build.ts SHA-256 1c1a766135f45c7bd1c07799f532fefd6ffdd2fadbe2c587821b233b45aa78bc
New build.ts SHA-256 f728e1e37b0e9907f21875b2396eb2e1025718295d9bcfed7b61216ba1271854
The exact changed lines include bracketed computed-call syntax. The complete unified diff is in the cited source.

Command 570 and closing validation 593 each exited 1 before their logging wrappers wrote the end time and exit footer. Sources 571–575 and 594–596 document the corrections. Log numbers 605 and 606 were reserved for the final wait and test, but a read of the attribution checker took 607 first. The wait and test then took 608 and 609 so numbering advanced. No command or file used 605 or 606. A delivery precheck in 617 counted the coverage table in both the opening and closing sections. Logs 618–619 restricted the extraction to the opening and verified twenty rows. In the baseline, React reported 283 App updates outside act. The corrected full suite reported 301 across ten test files, including the new focus, retained-output and line-input tests. All of those tests passed. The captured warnings are accounted for in log 623.

No live call was made, no real surface was run, no real key was used and no Founder configuration folder was read. Only the frozen install could download packages. Tests and evidence used disposable capability storage. Builder test signals targeted only a host created for that case. Containment and rollback signals came from the code under test.

Each occupied log number appears once in the inventory. The report write and its independent receipt follow this inventory. Their digests are in the delivery message or its cited final receipt.

001-governed-version.log · SHA-256 fa773e41c5b0fd2c3dd07e474c25f88a69f90769ac1ddc8fc21ab5ccb72b8379 — /Users/michaeldaley/builds/codex-governed-0.167.0/node_modules/.bin/codex --version — 13:30  1 user, load averages: 3.76 3.51 3.07 — UTC date not logged to UTC date not logged — exit status 0.

002-pwd.log · SHA-256 2714029ba79c6530b471fe4a2be29eaef8e42722d04940ef324e0c8cfb9c6944 — pwd — 13:30  1 user, load averages: 3.58 3.48 3.06 — UTC date not logged to UTC date not logged — exit status 0.

003-branch.log · SHA-256 5b55a9203fe88e1de7fbd94c26c744100a3acb16d7568901661396d0b675db8e — git -C tui branch --show-current — 13:30  1 user, load averages: 3.58 3.48 3.06 — UTC date not logged to UTC date not logged — exit status 0.

004-head.log · SHA-256 56617146925cadce7cc36f869bf3c2d6af3c5f071c83b0a6c5ee65779e2187b3 — git -C tui rev-parse HEAD — 13:30  1 user, load averages: 3.58 3.48 3.06 — UTC date not logged to UTC date not logged — exit status 0.

005-name.log · SHA-256 6692310e65f01cb414f166dbf467b8fda9971a4ceb32dbe62c7be1c3ac1a9f53 — git -C tui config user.name — 13:30  1 user, load averages: 3.58 3.48 3.06 — UTC date not logged to UTC date not logged — exit status 0.

006-email.log · SHA-256 075301411f66237af294cc7b4545ccc04b7ec95f69a062301a55bf021f1c0fe8 — git -C tui config user.email — 13:30  1 user, load averages: 3.58 3.48 3.06 — UTC date not logged to UTC date not logged — exit status 0.

007-runtime.log · SHA-256 f322ede4f380200c8c74ceb3085a8de85c6ed56240ac1b817dc1177f29010997 — Full command in cited source — 13:31  up 6 days,  4:59, 1 user, load averages: 2.48 3.21 2.99 — Fri Nov 27 18:31:39 UTC 2026 to Fri Nov 27 18:31:39 UTC 2026 — exit status 0.

008-base.log · SHA-256 c0b56cd9002ebac41d7ba30ed9b917b35572368dd91de82703f222eae5ec4c4a — git -C tui rev-parse origin/main origin/main^1 git -C tui merge-base --is-ancestor 2026cfd96ff34b6ebc44161479f23f105febc102 origin/main git -C tui diff --name-only 2026cfd96ff34b6ebc44161479f23f105febc102 origin/main git -C tui status --short --branch git -C tui stash list git -C tui branch -r — 13:31  1 user, load averages: 2.25 3.10 2.96 — UTC date not logged to UTC date not logged — exit status 0.

009-inventories.log · SHA-256 5054526cb937e3c1ef2dfc74ec714607d592b89edee4fdbed590dbedbe9a8c60 — Full command in cited source — 13:31  1 user, load averages: 2.25 3.10 2.96 — UTC date not logged to UTC date not logged — exit status 0.

010-m3-act.log · SHA-256 3f9f45cf6ccb7f474c224b8695826c89218330db3f55161d71eb375f962154a9 — git -C tui show HEAD:docs/decisions/DEC-20261127-01-m2-records-and-m3.md — 13:32  1 user, load averages: 2.23 3.08 2.95 — UTC date not logged to UTC date not logged — exit status 0.

011-authority-hashes.log · SHA-256 84b061d32f6a2cb0bdb60143de6324b0ea3b24de0068666d89c372f77bda9f33 — Full command in cited source — 13:33  1 user, load averages: 1.65 2.77 2.84 — UTC date not logged to UTC date not logged — exit status 0.

012-authority-texts.log · SHA-256 8ff0df231dc0fecb5e9f713b94f1b20564963706f2f999556c90295315b16bea — Full command in cited source — 13:33  1 user, load averages: 1.76 2.76 2.84 — UTC date not logged to UTC date not logged — exit status 0.

013-commission-lines.log · SHA-256 1e722c491543a8f709f9254cf885c74be15e6843549ac081d74067c3d37f8df2 — Full command in cited source — 13:33  1 user, load averages: 1.64 2.71 2.82 — UTC date not logged to UTC date not logged — exit status 0.

014-base-lines.log · SHA-256 71dd2c5314bf3476003a2f6fc0c4a980af1706c63bf0e20d65b6404f84ed26e9 — Full command in cited source — 13:33  1 user, load averages: 1.72 2.66 2.80 — UTC date not logged to UTC date not logged — exit status 0.

015-imports.log · SHA-256 6e4bf333254618dc0f8b3f772c4963819db1af6e6d733d5fdec653a7254391a4 — Full command in cited source — 13:33  1 user, load averages: 1.23 2.48 2.73 — UTC date not logged to UTC date not logged — exit status 1.

016-imports.log · SHA-256 0e69bb82833903b724c7be8bc277c3de3f1832ca5e5af2dad6a56edb352bc164 — Full command in cited source — 13:34  1 user, load averages: 1.27 2.45 2.72 — UTC date not logged to UTC date not logged — exit status 0.

017-base-implementation.log · SHA-256 1bfad3bdf759b6d341a0a6051bd8688901bff047ea92ea783aa7c214e5f2e6d7 — Full command in cited source — 13:34  1 user, load averages: 1.93 2.50 2.72 — UTC date not logged to UTC date not logged — exit status 0.

018-anchors.log · SHA-256 8b0be6eb20d5626a7ab5506c9007faa188ee6d8b4246ff4d883ad292bdb0eae8 — Full command in cited source — 13:34  1 user, load averages: 1.95 2.48 2.71 — UTC date not logged to UTC date not logged — exit status 0.

019-dispatch-base.log · SHA-256 6fa640ccc89e660ec91ff588e6a560539c7b0b03d9e28121340403f3c27e3652 — Full command in cited source — 13:34  1 user, load averages: 2.11 2.50 2.72 — UTC date not logged to UTC date not logged — exit status 1.

020-preflight-review.log · SHA-256 357f32b88660f0a9f30dfd1dff1ea1aa7145815d3c9f93243f396f59990924c2 — Full command in cited source — 13:35  1 user, load averages: 2.02 2.47 2.71 — UTC date not logged to UTC date not logged — exit status 0.

021-snapshot-base.log · SHA-256 f5fbd5c7abba90513e032255f00707e34e31c9cbd49a3582a04395066ed685e4 — Full command in cited source — 13:35  1 user, load averages: 2.50 2.56 2.73 — UTC date not logged to UTC date not logged — exit status 0.

022-writer-fixtures.log · SHA-256 7f93c1e415c519b9fd39f0c3031ac2a7e8249f00efc56c4d6770fd4634f940d5 — Full command in cited source — 13:35  1 user, load averages: 2.35 2.52 2.72 — UTC date not logged to UTC date not logged — exit status 0.

023-baseline-install.log · SHA-256 8aca2e29a721f36542ff9b3d51000b93d29b8747e1fa291bb5cc7161323b647d — Full command in cited source — 13:37  up 6 days,  5:05, 1 user, load averages: 2.48 2.54 2.70 — Fri Nov 27 18:37:28 UTC 2026 to Fri Nov 27 18:37:28 UTC 2026 — exit status 0.

024-install-tree.log · SHA-256 fa9c679c98c6e0c377d96077d60349392a22ab6cecb78e81cbfad5eb19727655 — Full command in cited source — 13:37  1 user, load averages: 2.48 2.54 2.70 — UTC date not logged to UTC date not logged — exit status 0.

025-baseline-typecheck.log · SHA-256 ac89afc7e81ff3b6947156cb6e15ee3eb46b946b175395017cc04ad3a8011da1 — Full command in cited source — 13:37  up 6 days,  5:05, 1 user, load averages: 2.76 2.59 2.71 — Fri Nov 27 18:37:54 UTC 2026 to Fri Nov 27 18:37:58 UTC 2026 — exit status 0.

026-suite-runtime.log · SHA-256 88c66db5be8d852be8bf7dd41a6aa1a0eb8eed75e830effee7d6ee5cfbf3c404 — Full command in cited source — 13:39  up 6 days,  5:07, 1 user, load averages: 2.48 2.53 2.67 — Fri Nov 27 18:39:28 UTC 2026 to Fri Nov 27 18:39:29 UTC 2026 — exit status 0.

027-baseline-wait.log · SHA-256 4dffd18ee7885f28dcc502066dae49de78db9a8bd163dfe8628bde46139b47da — Full command in cited source — 13:39  1 user, load averages: 2.39 2.51 2.66 — Fri Nov 27 18:39:37 UTC 2026 to Fri Nov 27 18:40:07 UTC 2026 — exit status 0.

028-task-design.log · SHA-256 c3b188d41ff8ccddf0664b934df5d219a9173d4a4cc6761ff99843dc259ff080 — Full command in cited source — 13:39  1 user, load averages: 2.34 2.50 2.65 — UTC date not logged to UTC date not logged — exit status 0.

029-handover.log · SHA-256 6814278faa2342610f6986b87439dd5364749aac41fc2bbe8f90602a973c5261 — Full command in cited source — 13:40  1 user, load averages: 2.28 2.48 2.64 — UTC date not logged to UTC date not logged — exit status 0.

030-reader-base.log · SHA-256 a8c7a828b861daa1e7c1f7d11649e12c288a1aca6dd90355bfb5111264dcc28b — Full command in cited source — 13:40  1 user, load averages: 1.93 2.40 2.61 — UTC date not logged to UTC date not logged — exit status 0.

031-baseline-test.log · SHA-256 77576fb28d74bc68227619d41f2f69ce3deb4565fc7b7f4633ea5df75c229431 — Full command in cited source — 13:40  up 6 days,  5:08, 1 user, load averages: 1.67 2.26 2.55 — Fri Nov 27 18:40:56 UTC 2026 to Fri Nov 27 18:45:35 UTC 2026 — exit status 0.

032-pane-design.log · SHA-256 aaba5060e42a3f21891120fc18dc576f9b1170fa971a138e0c93d2169215c294 — Full command in cited source — 13:41  1 user, load averages: 1.82 2.26 2.54 — UTC date not logged to UTC date not logged — exit status 0.

033-reader-coverage.log · SHA-256 efc3cb7645187de30408f28388f4509d4b43b99be9f5234eaf8951362f4d9368 — Full command in cited source — 13:41  1 user, load averages: 1.78 2.23 2.53 — UTC date not logged to UTC date not logged — exit status 0.

034-broker-design.log · SHA-256 83d9a36fbeb201d2e89ba33515ff92ca95d3eabbfe410fba81f5704cd208a0ae — Full command in cited source — 13:41  1 user, load averages: 1.97 2.26 2.54 — UTC date not logged to UTC date not logged — exit status 0.

035-separation-review.log · SHA-256 0ee7e4807ba7e128fc1131467db449b1eb3353c6eff8d3314f1150c6f201f05d — Full command in cited source — 13:41  1 user, load averages: 2.20 2.30 2.54 — UTC date not logged to UTC date not logged — exit status 0.

036-existing-readers.log · SHA-256 27ef1c010d9c2b3a9641a57ddc3b86ba76272d2b588e92f0fa5ad242818689a4 — Full command in cited source — 13:42  1 user, load averages: 2.58 2.43 2.58 — UTC date not logged to UTC date not logged — exit status 1.

037-fixture-design.log · SHA-256 5e971d5c5604c27ad2ba4997518bd899f4d70b3886fc75a517fe85bccb428b7f — Full command in cited source — 13:42  1 user, load averages: 2.56 2.43 2.58 — UTC date not logged to UTC date not logged — exit status 0.

038-work-folder.log · SHA-256 826fdf850f1a6a0abf24ca19644823a2859cb5612f9e34cf7ff9fc30f9412824 — mktemp -d /private/tmp/m3-build.XXXXXXXX — 13:43  1 user, load averages: 3.21 2.59 2.63 — UTC date not logged to UTC date not logged — exit status 0.

039-teardown-sizing.log · SHA-256 e2c29422b6d82639dd3bab0ed3b4bbaef9d40891841c745ee39177739aeee9fb — Full command in cited source — 13:43  1 user, load averages: 3.55 2.72 2.68 — UTC date not logged to UTC date not logged — exit status 0.

040-focus-expectations.log · SHA-256 a1b9446ceb1c1e7d049f537ce97eae5bb58aa8f414e3f5bab6712e8be761240f — git -C tui grep -inE '"antigravity"|ANTIGRAVITY|\bAGY\b' HEAD -- 'apps/madbridge/test/*.ts' 'apps/madbridge/test/*.tsx' | rg -i 'focus|statusbar|expect.*(agy|antigravity)|pane' | cut -c1-245 — 13:43  1 user, load averages: 3.72 2.80 2.70 — UTC date not logged to UTC date not logged — exit status 0.

041-plan-clauses.log · SHA-256 37501c75a8793cb80fea8ce90b859c1eea7ec2692d3c64186992ccfd5941f6e0 — Full command in cited source — 13:44  1 user, load averages: 3.11 2.72 2.67 — UTC date not logged to UTC date not logged — exit status 1.

042-admission-rules.log · SHA-256 94493b8879a7f0ac19ced7784e6b968876b1bdd4e4b7022c56ead1c53eccb21d — Full command in cited source — 13:44  1 user, load averages: 3.01 2.71 2.67 — UTC date not logged to UTC date not logged — exit status 0.

043-relative-imports.log · SHA-256 669eb2b3f49cd89fd07bc5d85be779d2895f728398829155170a3ea341aae424 — Full command in cited source — 13:45  1 user, load averages: 2.30 2.58 2.63 — UTC date not logged to UTC date not logged — exit status 0.

044-presentation-rules.log · SHA-256 33b4905fd7af2d942404a1d9b7353a39d8ce98e973374d8b46527859ea6cb3d0 — Full command in cited source — 13:45  1 user, load averages: 2.41 2.59 2.63 — UTC date not logged to UTC date not logged — exit status 0.

045-base-list.log · SHA-256 97b0a672be6ef2657f92aa750eb8075bcf76167e0c7d562bd08763b211172a1a — Full command in cited source — 13:45  1 user, load averages: 2.63 2.64 2.65 — UTC date not logged to UTC date not logged — exit status 0.

046-log-helper.log · SHA-256 656045d7bbed052b842ba0e8103ac980c0087b9b63fe78314bf133a578e9fa8d — Full command in cited source — 13:46  1 user, load averages: 1.95 2.45 2.58 — UTC date not logged to UTC date not logged — exit status 0.

047-base-test-sites.log · SHA-256 7ce6f643439ab6e108f649fb20f7b66bc765661697e6ec1edd7024f089cb2988 — Full command in cited source — 13:46  1 user, load averages: 2.09 2.42 2.56 — UTC date not logged to UTC date not logged — exit status 0.

048-opening-writer.log · SHA-256 d288ac0423d32f0e39c46ea10ac40fa358ba42ac644b19a8f973c3116fafd448 — Create the opening build-log writer at /private/tmp/m3-build.U6WP3RU0/open-log.py — 13:48  1 user, load averages: 3.11 2.67 2.64 — UTC date not logged to UTC date not logged — exit status 0.

049-opening.log · SHA-256 2afd246416347aad78dcd48e3f14c4c4dd51ec4ba3df1cfae10d508624caba12 — python3 /private/tmp/m3-build.U6WP3RU0/open-log.py — 13:48  1 user, load averages: 2.94 2.65 2.63 — Fri Nov 27 18:48:51 UTC 2026 to Fri Nov 27 18:48:52 UTC 2026 — exit status 0.

050-message-files.log · SHA-256 95ccce011ef363ca32b2e73f8dddbf3e62459aef0607c9e168d8d4b848fe20ff — Write the commit-message checker and opening message — 13:49  1 user, load averages: 2.43 2.55 2.59 — UTC date not logged to UTC date not logged — exit status 0.

051-opening-check.log · SHA-256 69666a5741e0e0ba95e88fc838573252aaf2f7a766336b3d3986c5d2d3aab151 — zsh /private/tmp/m3-build.U6WP3RU0/check-message.zsh /private/tmp/m3-build.U6WP3RU0/message-1 — 13:49  1 user, load averages: 2.24 2.51 2.58 — Fri Nov 27 18:49:10 UTC 2026 to Fri Nov 27 18:49:11 UTC 2026 — exit status 0.

052-opening-stage.log · SHA-256 4c41ff34f9c3987e5b3b1ff1bc5022c110ea24609b7b49409671c0b2c331544f — git -C tui add docs/verification/phase-3b-m3-build-log.md — 13:49  1 user, load averages: 2.06 2.46 2.56 — Fri Nov 27 18:49:14 UTC 2026 to Fri Nov 27 18:49:14 UTC 2026 — exit status 0.

053-opening-staged.log · SHA-256 a262f7dee597363be7e45b874e85d118fbb572732f0a02fe7fd4d67e5f4be9e9 — git -C tui diff --cached --check — 13:49  1 user, load averages: 2.06 2.46 2.56 — Fri Nov 27 18:49:14 UTC 2026 to Fri Nov 27 18:49:14 UTC 2026 — exit status 0.

054-opening-content.log · SHA-256 c4d7f94e2c3d3c844bd2cd332a2110cdb91c07b17921cbea0b4f1f299b4915a1 — check_opening — 13:49  1 user, load averages: 2.06 2.45 2.55 — Fri Nov 27 18:49:24 UTC 2026 to Fri Nov 27 18:49:24 UTC 2026 — exit status 0.

055-opening-commit.log · SHA-256 427ab5ccd93eb72b6afc1969b19ea4154a38998a2975d093ff8efc644502a9d6 — git -C tui commit -F /private/tmp/m3-build.U6WP3RU0/message-1 — 13:49  1 user, load averages: 2.06 2.45 2.55 — Fri Nov 27 18:49:24 UTC 2026 to Fri Nov 27 18:49:24 UTC 2026 — exit status 0.

056-opening-head.log · SHA-256 13fc06947cd02abe012e7a236b08b2f8b2fc4cccd6f0518b077b184667b71598 — git -C tui log -1 '--format=%H %P %s' — 13:49  1 user, load averages: 2.06 2.45 2.55 — Fri Nov 27 18:49:24 UTC 2026 to Fri Nov 27 18:49:24 UTC 2026 — exit status 0.

057-broker-index.log · SHA-256 de0a146af2696dde2c9e581b29301f2dce9ffa470ca276956978f231b1bc650f — git -C tui show HEAD:packages/broker/src/index.ts — 13:49  1 user, load averages: 2.06 2.44 2.55 — Fri Nov 27 18:49:30 UTC 2026 to Fri Nov 27 18:49:30 UTC 2026 — exit status 0.

058-producer-imports.log · SHA-256 e9063578139a32dce6975425a40e89b0c4df54894aaade03cc7f036c119f17ca — git -C tui grep -nE 'in-process-client|InProcessBrokerClient|OutputFrame|createInProcessBrokerClient' HEAD -- packages/supervisor/src/build.ts — 13:49  1 user, load averages: 2.06 2.44 2.55 — Fri Nov 27 18:49:30 UTC 2026 to Fri Nov 27 18:49:30 UTC 2026 — exit status 0.

059-stand-in-installer.log · SHA-256 fa23df29c222d4f342fd7dfc88ce2ff87e3111ebafebbcc6cc4c13455c7833a9 — git -C tui show HEAD:test/phase3b/scenarios.ts — 13:49  1 user, load averages: 2.06 2.44 2.55 — Fri Nov 27 18:49:30 UTC 2026 to Fri Nov 27 18:49:30 UTC 2026 — exit status 0.

060-client-export-tests.log · SHA-256 987350ad39aefeaaec1cf11742860982d2375b91aa6eba7c2e6b7ebea15b5a35 — git -C tui grep -nE 'Object.keys\(.*(Module|module|inProcess|client|Client)|in-process-client.*export|export.*in-process-client|createInProcessBrokerClient.length' HEAD -- 'packages/broker/test/*.ts' 'test/**/*.ts' — 13:49  1 user, load averages: 1.97 2.42 2.54 — Fri Nov 27 18:49:36 UTC 2026 to Fri Nov 27 18:49:36 UTC 2026 — exit status 0.

061-output-producer.log · SHA-256 8a8eb5b90bbe50d3033a8d127dcf5863eaeffc734a40fea73ce8ec4df074319d — python3 /private/tmp/m3-build.U6WP3RU0/r1.py — 13:50  1 user, load averages: 1.67 2.27 2.48 — Fri Nov 27 18:50:21 UTC 2026 to Fri Nov 27 18:50:21 UTC 2026 — exit status 0.

062-madv-events.log · SHA-256 bd42b37cb38593ea835339aacfae4341e523de7204c5d0d3a0aace67788f9119 — sed -n 134,184p tui/packages/adapter-madv-surface/src/index.ts — 13:50  1 user, load averages: 1.49 2.21 2.45 — Fri Nov 27 18:50:33 UTC 2026 to Fri Nov 27 18:50:33 UTC 2026 — exit status 0.

063-pair-admission.log · SHA-256 0ccae8e5a80a7c3cb4ab39b76877fc09b73efeab9538349c72841744fc37f603 — git -C tui grep -n -E 'initial.writer|writer.*builder' HEAD -- packages/policy/src packages/supervisor/src/preflight.ts packages/protocol/src — 13:50  1 user, load averages: 1.49 2.21 2.45 — Fri Nov 27 18:50:33 UTC 2026 to Fri Nov 27 18:50:33 UTC 2026 — exit status 0.

064-producer-tests.log · SHA-256 698a2b68bbef4ce48b54521cbbe3a9a0b5aba62ba823203c9b458c2f67dcb839 — Write the R1 transport stand-in, fixture, producer and separation tests — 13:51  1 user, load averages: 1.34 2.00 2.36 — Fri Nov 27 18:51:30 UTC 2026 to Fri Nov 27 18:51:30 UTC 2026 — exit status 0.

065-r1-runtime.log · SHA-256 472dc749d3378d0b26e3dc96af7ed9ee719548be27af68946a99c146019fe938 — Full command in cited source — 13:51  up 6 days,  5:19, 1 user, load averages: 1.66 2.05 2.37 — Fri Nov 27 18:51:46 UTC 2026 to Fri Nov 27 18:51:47 UTC 2026 — exit status 0.

066-wait-script.log · SHA-256 66e65297fb31ac571a36c605b58e4aed39b138f9aec04a52367bd3c50e5dde6d — write_quiet — 13:51  1 user, load averages: 1.62 2.03 2.36 — Fri Nov 27 18:51:56 UTC 2026 to Fri Nov 27 18:51:56 UTC 2026 — exit status 0.

067-r1-wait.log · SHA-256 932cefa0809b80cb5ea2544c2070e221b629131280c89f4a1fe34338fc1bb997 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 13:51  1 user, load averages: 1.62 2.03 2.36 — Fri Nov 27 18:51:56 UTC 2026 to Fri Nov 27 18:51:56 UTC 2026 — exit status 0.

068-r1-tests.log · SHA-256 c27563568e767105275168e137455b1671f51b67d606bcac6b9e3e95883d23c4 — Full command in cited source — 13:52  up 6 days,  5:19, 1 user, load averages: 1.37 1.96 2.33 — Fri Nov 27 18:52:07 UTC 2026 to Fri Nov 27 18:52:09 UTC 2026 — exit status 0.

069-r1-message.log · SHA-256 0229f65233f618b87469bac81151364368aad6936799819c17abdb2430bdfcaa — r1_message — 13:52  1 user, load averages: 1.31 1.90 2.30 — Fri Nov 27 18:52:30 UTC 2026 to Fri Nov 27 18:52:30 UTC 2026 — exit status 0.

070-r1-width.log · SHA-256 753ceb54338bc5bde03e331d83856744f7f65e4910584455d16a1366e2f3b397 — zsh /private/tmp/m3-build.U6WP3RU0/check-message.zsh /private/tmp/m3-build.U6WP3RU0/message-2 — 13:52  1 user, load averages: 1.31 1.90 2.30 — Fri Nov 27 18:52:30 UTC 2026 to Fri Nov 27 18:52:30 UTC 2026 — exit status 0.

071-r1-stage.log · SHA-256 94fba758ea867c0e149372a6db233eb9781352d0c4dd808639273478f689fc1e — Full command in cited source — 13:52  1 user, load averages: 1.31 1.90 2.30 — Fri Nov 27 18:52:30 UTC 2026 to Fri Nov 27 18:52:30 UTC 2026 — exit status 0.

072-r1-check.log · SHA-256 aad655ed6ce6c46b6c979ecc5afffe5f221de6751d2ba8190645c5463881efaa — git -C tui diff --cached --check — 13:52  1 user, load averages: 1.31 1.90 2.30 — Fri Nov 27 18:52:30 UTC 2026 to Fri Nov 27 18:52:30 UTC 2026 — exit status 0.

073-r1-pin.log · SHA-256 81ecc9959c732120b97926cbccb07298f020e64c8247148fddfbf4e507c31210 — git -C tui diff --cached -- test/phase3a/harness-separation.test.ts — 13:52  1 user, load averages: 1.31 1.90 2.30 — Fri Nov 27 18:52:30 UTC 2026 to Fri Nov 27 18:52:30 UTC 2026 — exit status 0.

074-r1-content.log · SHA-256 25f740d91fdf6d2cb7814b3b74dd3f27d64ea4b7c5de164ce2dba3c438a9ab27 — staged_check — 13:52  1 user, load averages: 1.67 1.95 2.31 — Fri Nov 27 18:52:44 UTC 2026 to Fri Nov 27 18:52:44 UTC 2026 — exit status 0.

075-r1-commit.log · SHA-256 28f904c66be168f63387751fab9e2e05fb30e6cfba8a2449c9b429d26a3556d6 — git -C tui commit -F /private/tmp/m3-build.U6WP3RU0/message-2 — 13:52  1 user, load averages: 1.67 1.95 2.31 — Fri Nov 27 18:52:44 UTC 2026 to Fri Nov 27 18:52:45 UTC 2026 — exit status 0.

076-r1-head.log · SHA-256 567d0dbe95b68ae8cc9492fc7a69158c28092d9c7b954140bda5ee84e8cc8436 — git -C tui log -1 '--format=%H %P %s' — 13:52  1 user, load averages: 1.67 1.95 2.31 — Fri Nov 27 18:52:45 UTC 2026 to Fri Nov 27 18:52:45 UTC 2026 — exit status 0.

077-break-tools.log · SHA-256 8232094102d2015439911c8ea40dc3f6869f481fda2e9c39cfe4dd3e08289b57 — create_mutation_helpers — 13:52  1 user, load averages: 1.49 1.91 2.29 — Fri Nov 27 18:52:57 UTC 2026 to Fri Nov 27 18:52:57 UTC 2026 — exit status 0.

078-zero-runtime.log · SHA-256 91b8ec451a99b8d44fedb5fd662532b0f5d04489ab1f772261dde5833a58018a — Full command in cited source — 13:53  up 6 days,  5:21, 1 user, load averages: 1.59 1.87 2.26 — Fri Nov 27 18:53:30 UTC 2026 to Fri Nov 27 18:53:31 UTC 2026 — exit status 0.

079-zero-edit.log · SHA-256 c0bc1cdf90ed679d2f65b3ff1b5d422172cca7637fe4af695eb998c677573015 — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py packages/supervisor/src/build.ts 'let nextOutputSeq = 1;' 'let nextOutputSeq = 0;' — 13:53  1 user, load averages: 1.59 1.87 2.26 — Fri Nov 27 18:53:31 UTC 2026 to Fri Nov 27 18:53:31 UTC 2026 — exit status 0.

080-zero-diff.log · SHA-256 c8b45b103f672e1379b33ab7edef60eb2812f4704df13d6f8540a9e3a721e197 — git -C tui diff -- packages/supervisor/src/build.ts — 13:53  1 user, load averages: 1.59 1.87 2.26 — Fri Nov 27 18:53:31 UTC 2026 to Fri Nov 27 18:53:31 UTC 2026 — exit status 0.

081-zero-wait.log · SHA-256 ee709c360dfdefef377c120176e215c0ff218ab5bda8a2d0f52db8320f73a59c — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 13:53  1 user, load averages: 1.59 1.87 2.26 — Fri Nov 27 18:53:31 UTC 2026 to Fri Nov 27 18:53:31 UTC 2026 — exit status 0.

082-zero-test.log · SHA-256 b3c49eeec18626a1cb588ff6237744d56f90e9b9faa64b5badcb653d49b630fc — Full command in cited source — 13:53  up 6 days,  5:21, 1 user, load averages: 1.59 1.87 2.26 — Fri Nov 27 18:53:33 UTC 2026 to Fri Nov 27 18:53:38 UTC 2026 — exit status 1.

083-zero-restore.log · SHA-256 a67dd77acb55bce28b6e2a43418547bc4b90331c0d2bae12191883e8c6c92f3f — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh packages/supervisor/src/build.ts — 13:53  1 user, load averages: 1.70 1.89 2.26 — Fri Nov 27 18:53:34 UTC 2026 to Fri Nov 27 18:53:34 UTC 2026 — exit status 0.

084-zero-review.log · SHA-256 80328590a75db8c6b536f64f7c90681c19d70ba6c05fb862a0e942133316c0a7 — cat logs/082-zero-test.log — 13:54  1 user, load averages: 1.70 1.87 2.23 — Fri Nov 27 18:54:23 UTC 2026 to Fri Nov 27 18:54:23 UTC 2026 — exit status 0.

085-zero-runtime.log · SHA-256 0d99150533c8cea8e841472380e9c55340843623be5853220ff942b68dab44dc — Full command in cited source — 13:54  up 6 days,  5:22, 1 user, load averages: 2.30 1.99 2.26 — Fri Nov 27 18:54:55 UTC 2026 to Fri Nov 27 18:54:56 UTC 2026 — exit status 0.

086-zero-edit.log · SHA-256 d7d7320571455fff89acc5ea93642335d14ce074bc96b14089694b02caf0a433 — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py packages/supervisor/src/build.ts 'let nextOutputSeq = 1;' 'let nextOutputSeq = 0;' — 13:54  1 user, load averages: 2.30 1.99 2.26 — Fri Nov 27 18:54:56 UTC 2026 to Fri Nov 27 18:54:56 UTC 2026 — exit status 0.

087-zero-diff.log · SHA-256 14db4f0b7f83ab55531a3e91d1836a7f4352f486c3f43808977eeaefb4f8322e — git -C tui diff -- packages/supervisor/src/build.ts — 13:54  1 user, load averages: 2.30 1.99 2.26 — Fri Nov 27 18:54:56 UTC 2026 to Fri Nov 27 18:54:56 UTC 2026 — exit status 0.

088-zero-wait.log · SHA-256 181023fb8ad8c5476a28c5a32f35f2c8f43e7b77ddc7b651601a07af9d1350e7 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 13:54  1 user, load averages: 2.30 1.99 2.26 — Fri Nov 27 18:54:56 UTC 2026 to Fri Nov 27 18:55:26 UTC 2026 — exit status 0.

089-zero-test.log · SHA-256 b8334aae815412937e6ca5e0630e7bfbf31895effb62738ea1ac7864c7b51135 — Full command in cited source — 13:55  up 6 days,  5:23, 1 user, load averages: 1.71 1.88 2.21 — Fri Nov 27 18:55:40 UTC 2026 to Fri Nov 27 18:55:45 UTC 2026 — exit status 1.

090-zero-restore.log · SHA-256 3a6579b3981e8b7895f085e3cba12ffc94d40a96658c06b812583f179889025f — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh packages/supervisor/src/build.ts — 13:55  1 user, load averages: 1.65 1.87 2.20 — Fri Nov 27 18:55:46 UTC 2026 to Fri Nov 27 18:55:46 UTC 2026 — exit status 0.

091-pre-runtime.log · SHA-256 cafc77525fec8b61133bfd0ef847f05172d5f0e1207663b0bed3324ff48f51f2 — Full command in cited source — 13:55  up 6 days,  5:23, 1 user, load averages: 1.65 1.87 2.20 — Fri Nov 27 18:55:47 UTC 2026 to Fri Nov 27 18:55:48 UTC 2026 — exit status 0.

092-pre-edit.log · SHA-256 8876d1dcc7290e267b6b2aa53a5dc7f0553e3a7fea5a6df82012216e8d27411b — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py packages/adapter-claude-code/src/live.ts 'const monitored = reader.complete;' 'const monitored = true;' — 13:55  1 user, load averages: 1.65 1.87 2.20 — Fri Nov 27 18:55:48 UTC 2026 to Fri Nov 27 18:55:48 UTC 2026 — exit status 0.

093-pre-diff.log · SHA-256 c891dec1203d950633db90d3a1013029d36edc358232b9d58e114159db958f8e — git -C tui diff -- packages/adapter-claude-code/src/live.ts — 13:55  1 user, load averages: 1.65 1.87 2.20 — Fri Nov 27 18:55:48 UTC 2026 to Fri Nov 27 18:55:48 UTC 2026 — exit status 0.

094-pre-wait.log · SHA-256 391605c521dfacb5f845b0575fac1d296a13931b2d5da7219206230ed14b95cc — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 13:55  1 user, load averages: 1.65 1.87 2.20 — Fri Nov 27 18:55:48 UTC 2026 to Fri Nov 27 18:55:48 UTC 2026 — exit status 0.

095-pre-test.log · SHA-256 ce4beec7fac1eb89eafdec212624c402628871b1215068102ec547870c0fb7bd — Full command in cited source — 13:57  up 6 days,  5:25, 1 user, load averages: 1.24 1.66 2.07 — Fri Nov 27 18:57:35 UTC 2026 to Fri Nov 27 18:57:37 UTC 2026 — exit status 1.

096-pre-restore.log · SHA-256 9ab7b605a320e6849dcbfeeae581033ab76effe4572a17cd5271c146966c7d15 — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh packages/adapter-claude-code/src/live.ts — 13:57  1 user, load averages: 1.24 1.66 2.07 — Fri Nov 27 18:57:37 UTC 2026 to Fri Nov 27 18:57:37 UTC 2026 — exit status 0.

097-gap-runtime.log · SHA-256 5040fa0f51a478e28ad0e26d3999f78ffd294094883dc575a82013b99772d187 — Full command in cited source — 13:57  up 6 days,  5:25, 1 user, load averages: 1.24 1.66 2.07 — Fri Nov 27 18:57:38 UTC 2026 to Fri Nov 27 18:57:39 UTC 2026 — exit status 0.

098-gap-edit.log · SHA-256 6b8267c0a272afd6ba1629b0d637f28be2a7954fe3fc7ef2f2254dea8c5d49dc — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py packages/broker/src/in-process-client.ts 'if (violation !== null) await raise(violation);' 'if (violation !== null) return;' — 13:57  1 user, load averages: 1.24 1.66 2.07 — Fri Nov 27 18:57:39 UTC 2026 to Fri Nov 27 18:57:39 UTC 2026 — exit status 0.

099-gap-diff.log · SHA-256 25b70a115b68c84f08f9a3037cd6a56d311c7325eacb64c1cb4072a0d9d700e0 — git -C tui diff -- packages/broker/src/in-process-client.ts — 13:57  1 user, load averages: 1.24 1.66 2.07 — Fri Nov 27 18:57:39 UTC 2026 to Fri Nov 27 18:57:39 UTC 2026 — exit status 0.

100-gap-wait.log · SHA-256 289c2d084d66caf6066671cc7b3a3994a714cab44260c0c4ed1275996d1a12f8 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 13:57  1 user, load averages: 1.62 1.73 2.10 — Fri Nov 27 18:57:39 UTC 2026 to Fri Nov 27 18:57:39 UTC 2026 — exit status 0.

101-gap-test.log · SHA-256 7ab11023025d338b77c4a06987716f522b6404460f540bc0aabc4bfac14f9032 — Full command in cited source — 13:58  up 6 days,  5:25, 1 user, load averages: 2.79 1.99 2.17 — Fri Nov 27 18:58:20 UTC 2026 to Fri Nov 27 18:58:21 UTC 2026 — exit status 1.

102-gap-restore.log · SHA-256 aa771ddd6bac7f511cc75f16e025837c911fc5271eefd4d1f1e45c1ec6f4a58a — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh packages/broker/src/in-process-client.ts — 13:58  1 user, load averages: 2.79 1.99 2.17 — Fri Nov 27 18:58:21 UTC 2026 to Fri Nov 27 18:58:21 UTC 2026 — exit status 0.

103-seam-runtime.log · SHA-256 ac2534689a0e7469e28dba45d0e2c635801853ae40a000a8bb2ea538a204c5be — Full command in cited source — 14:00  up 6 days,  5:28, 1 user, load averages: 2.35 2.21 2.24 — Fri Nov 27 19:00:47 UTC 2026 to Fri Nov 27 19:00:47 UTC 2026 — exit status 0.

104-seam-edit.log · SHA-256 7384d3b9f3b1cf141be249968c667f2e4c6909b0351bffcab0c6e450c1eb40bc — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py packages/supervisor/src/build.ts '  createInProcessBrokerClient,' '  unsafeTestOnlyIngestOutputFrame, createInProcessBrokerClient,' — 14:00  1 user, load averages: 2.35 2.21 2.24 — Fri Nov 27 19:00:47 UTC 2026 to Fri Nov 27 19:00:47 UTC 2026 — exit status 0.

105-seam-diff.log · SHA-256 4c2946e5edc0a304e586b998214374633285495e44a5f9b93278bd5584163724 — git -C tui diff -- packages/supervisor/src/build.ts — 14:00  1 user, load averages: 2.35 2.21 2.24 — Fri Nov 27 19:00:47 UTC 2026 to Fri Nov 27 19:00:47 UTC 2026 — exit status 0.

106-seam-wait.log · SHA-256 4941528c18fb59d2319c709f67b24037af683c6f86e8245cda831adcacd23229 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 14:00  1 user, load averages: 2.35 2.21 2.24 — Fri Nov 27 19:00:47 UTC 2026 to Fri Nov 27 19:01:47 UTC 2026 — exit status 0.

107-seam-test.log · SHA-256 7e09fc99b494afa88b42b1c2bf59b95a975736bd0996fc9fe2d16cb9baf9bbf2 — Full command in cited source — 14:01  up 6 days,  5:29, 1 user, load averages: 1.91 2.12 2.20 — Fri Nov 27 19:01:59 UTC 2026 to Fri Nov 27 19:01:59 UTC 2026 — exit status 1.

108-seam-restore.log · SHA-256 625998d27015b949e21f3772aa0cf9c5cf6b980eb66b354b0e90c7ce3b5a0bc1 — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh packages/supervisor/src/build.ts — 14:01  1 user, load averages: 1.91 2.12 2.20 — Fri Nov 27 19:01:59 UTC 2026 to Fri Nov 27 19:01:59 UTC 2026 — exit status 0.

109-dock-base.log · SHA-256 c4efff7d0f02850c76cf180be15293c1779f93e3a61779581531751c1db85c29 — sed -n 18,150p tui/apps/madbridge/src/tui/components/DockStrip.tsx — 14:02  1 user, load averages: 1.93 2.11 2.19 — Fri Nov 27 19:02:08 UTC 2026 to Fri Nov 27 19:02:08 UTC 2026 — exit status 0.

110-app-integration.log · SHA-256 9eee6e62358039a1687d58f92b1aa1bd7b8db6695fc68c46fb613a9678bceee8 — sed -n 23,165p tui/apps/madbridge/src/tui/App.tsx — 14:02  1 user, load averages: 1.93 2.11 2.19 — Fri Nov 27 19:02:08 UTC 2026 to Fri Nov 27 19:02:08 UTC 2026 — exit status 0.

111-key-test-base.log · SHA-256 4be9717e8e7210f8870408ca17b44dbd919bbc4bc9e8a4dd674f5c2630180e1e — sed -n 110,176p tui/apps/madbridge/test/tui-writers-stage.test.tsx — 14:02  1 user, load averages: 1.93 2.11 2.19 — Fri Nov 27 19:02:08 UTC 2026 to Fri Nov 27 19:02:08 UTC 2026 — exit status 0.

112-retention.log · SHA-256 cfa4b8001cd9d3c5be2103f51d2ab2d366e3047fc931931101c2fce461f3500e — write_retention — 14:02  1 user, load averages: 2.04 2.11 2.19 — Fri Nov 27 19:02:45 UTC 2026 to Fri Nov 27 19:02:45 UTC 2026 — exit status 0.

113-r2-state.log · SHA-256 83944a36a891da3c495c504c3f0f52267ec5200b2eef49f1c4ba051642f1d5d5 — inspect_r2 — 14:04  1 user, load averages: 1.15 1.79 2.05 — Fri Nov 27 19:04:44 UTC 2026 to Fri Nov 27 19:04:44 UTC 2026 — exit status 0.

114-cli-reachability.log · SHA-256 216763ea2495f951e9cbe6c644446029ebd661a3dc0a4f5e38b02f8657551dbe — reachability — 14:04  1 user, load averages: 1.12 1.76 2.04 — Fri Nov 27 19:04:52 UTC 2026 to Fri Nov 27 19:04:52 UTC 2026 — exit status 0.

115-fixtures.log · SHA-256 5988fc5bf0024c6a1aac416becaab22c62707e1e951053048d13218b01e97074 — inspect_paths — 14:04  1 user, load averages: 1.11 1.75 2.03 — Fri Nov 27 19:04:58 UTC 2026 to Fri Nov 27 19:04:58 UTC 2026 — exit status 0.

116-render-contract.log · SHA-256 b33b2764cadd49fb6361a28db2740e49562665757f0ccdbb6d37dca910372a6a — inspect_render — 14:05  1 user, load averages: 1.09 1.72 2.02 — Fri Nov 27 19:05:05 UTC 2026 to Fri Nov 27 19:05:05 UTC 2026 — exit status 0.

117-r2-types.log · SHA-256 3e488f8a7890e95b849178ed99385893d81a6e49aa4941ca89b6b0f59bed40c7 — r2_needs — 14:05  1 user, load averages: 1.00 1.69 2.00 — Fri Nov 27 19:05:11 UTC 2026 to Fri Nov 27 19:05:11 UTC 2026 — exit status 0.

118-separation-contract.log · SHA-256 6d546b1fa640da7bb928dab21479b5cc8f7a707475598b9ccdf8cea76cc78a33 — r2_shapes — 14:05  1 user, load averages: 0.92 1.67 1.99 — Fri Nov 27 19:05:18 UTC 2026 to Fri Nov 27 19:05:18 UTC 2026 — exit status 0.

119-task-detail.log · SHA-256 c6a7afa79c0987f6b26b05231504bea58003f415f09595fecdb4cabba10fce9e — r2_result_type — 14:05  1 user, load averages: 0.93 1.66 1.99 — Fri Nov 27 19:05:23 UTC 2026 to Fri Nov 27 19:05:23 UTC 2026 — exit status 0.

120-scope-tail.log · SHA-256 9e0543d0370f971bc250a0b18ecf205fa87bcf0d867887528f443022a018c69c — cut -c 1980- tui/docs/decisions/DEC-20261127-01-m2-records-and-m3.md — 14:05  1 user, load averages: 0.85 1.63 1.97 — Fri Nov 27 19:05:29 UTC 2026 to Fri Nov 27 19:05:29 UTC 2026 — exit status 0.

121-r2-tests.log · SHA-256 b98ccceaa1435cbd14b18477e66d37326fc2f3b7e7081d9787e826a3a2203b3b — make_r2_tests — 14:06  1 user, load averages: 0.79 1.52 1.92 — Fri Nov 27 19:06:04 UTC 2026 to Fri Nov 27 19:06:04 UTC 2026 — exit status 0.

122-r2-runtime.log · SHA-256 ed5a95f2ca183438049e9262231a831d986c0b01ad89c2e0be7cba037a8996b6 — Full command in cited source — 14:06  up 6 days,  5:33, 1 user, load averages: 1.42 1.62 1.95 — Fri Nov 27 19:06:20 UTC 2026 to Fri Nov 27 19:06:21 UTC 2026 — exit status 0.

123-r2-wait.log · SHA-256 d73f510396287af5e251b6377fdbc00f37bc2ce2ce2f75f931f89e3525ae702c — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 14:06  1 user, load averages: 1.42 1.62 1.95 — Fri Nov 27 19:06:21 UTC 2026 to Fri Nov 27 19:06:21 UTC 2026 — exit status 0.

124-r2-test.log · SHA-256 e094a6d8ffc0382865963ebb6ef18d68ed643bbe5c649f829cb91a7c3918939b — Full command in cited source — 14:07  up 6 days,  5:34, 1 user, load averages: 1.72 1.66 1.94 — Fri Nov 27 19:07:11 UTC 2026 to Fri Nov 27 19:07:11 UTC 2026 — exit status 1.

125-r2-render-timing.log · SHA-256 d4bb4142313c20b8540fe4d1c4fb92e6f85bf55b069ea6f2154056aba42c4f72 — fix_render_test — 14:07  1 user, load averages: 1.91 1.71 1.95 — Fri Nov 27 19:07:21 UTC 2026 to Fri Nov 27 19:07:22 UTC 2026 — exit status 0.

126-r2-repeat-wait.log · SHA-256 8a186805eb9615a4346ab3f1ab37f701bd8f713ce26047572c0e314ccfa34d5e — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 14:07  1 user, load averages: 1.91 1.71 1.95 — Fri Nov 27 19:07:22 UTC 2026 to Fri Nov 27 19:07:22 UTC 2026 — exit status 0.

127-r2-retention-test.log · SHA-256 7b6179a6df2d1233fa8d2b6ff7d3c6b51ff7e0bfcefa4ec1580342df249faa8a — Full command in cited source — 14:08  up 6 days,  5:36, 1 user, load averages: 3.44 2.29 2.16 — Fri Nov 27 19:08:33 UTC 2026 to Fri Nov 27 19:08:33 UTC 2026 — exit status 0.

128-bridge-plumbing.log · SHA-256 01b165212ce6a32307cac9ad5d1ef05904339d219cda7e33259ab03ce6b3fb0f — dispatch_scope — 14:08  1 user, load averages: 3.29 2.30 2.16 — Fri Nov 27 19:08:42 UTC 2026 to Fri Nov 27 19:08:42 UTC 2026 — exit status 0.

129-r2-message.log · SHA-256 0d54c3ceef992661de5c55822e0aa8a44f9b650d3289517a09757e90adba9139 — r2_message — 14:08  1 user, load averages: 3.15 2.30 2.16 — Fri Nov 27 19:08:55 UTC 2026 to Fri Nov 27 19:08:55 UTC 2026 — exit status 0.

130-r2-message-check.log · SHA-256 647b4111e2e38c7c66f0bc54f9437eb4aee07fe5d7aa5cfb77d36abd35fc053a — zsh /private/tmp/m3-build.U6WP3RU0/check-message.zsh /private/tmp/m3-build.U6WP3RU0/message-3 — 14:08  1 user, load averages: 3.15 2.30 2.16 — Fri Nov 27 19:08:55 UTC 2026 to Fri Nov 27 19:08:55 UTC 2026 — exit status 0.

131-r2-stage.log · SHA-256 6ed56a4d2e010278db31e93ffb1982b3067ad9ade1b375ac6760c806b3a625f6 — git -C tui add apps/madbridge/src/tui/App.tsx apps/madbridge/src/tui/live/retention.ts apps/madbridge/src/tui/components/DockStrip.tsx test/phase3b/pane-client.ts test/phase3b/retention.test.tsx — 14:08  1 user, load averages: 3.15 2.30 2.16 — Fri Nov 27 19:08:55 UTC 2026 to Fri Nov 27 19:08:55 UTC 2026 — exit status 0.

132-commit-r2.log · SHA-256 f41b491d0b0258156e9ec800eb3d23e0a545c798f62b4474ded1804069121a35 — git -C tui commit -F /private/tmp/m3-build.U6WP3RU0/message-3 — 14:09  1 user, load averages: 3.12 2.33 2.17 — Fri Nov 27 19:09:02 UTC 2026 to Fri Nov 27 19:09:02 UTC 2026 — exit status 0.

133-r2-head.log · SHA-256 59b92abc1c2db92f5cf5b5a2fe5039df97569d9e5ddb3940d777b718593f0860 — git -C tui rev-parse HEAD — 14:09  1 user, load averages: 3.12 2.33 2.17 — Fri Nov 27 19:09:02 UTC 2026 to Fri Nov 27 19:09:02 UTC 2026 — exit status 0.

134-mutation-targets.log · SHA-256 7ecfdcc46265a99cea329c9b2ef7e1acf3bfd8bc3f5428b616c92041593c6d9e — prepare_breaks — 14:09  1 user, load averages: 2.86 2.30 2.17 — Fri Nov 27 19:09:12 UTC 2026 to Fri Nov 27 19:09:12 UTC 2026 — exit status 0.

135-wrong-pane-edit.log · SHA-256 b249a379079ae328885fb82c2cc535fbfbe52f452d038aae5fee79402865b974 — Full command in cited source — 14:09  1 user, load averages: 2.27 2.21 2.14 — Fri Nov 27 19:09:46 UTC 2026 to Fri Nov 27 19:09:46 UTC 2026 — exit status 0.

136-wrong-pane-diff.log · SHA-256 0157132a70d18a90af683f6f4fc7b158ea3b0b51152fecd9cb0f34dab9e1ca19 — git -C tui diff -- apps/madbridge/src/tui/App.tsx — 14:09  1 user, load averages: 2.27 2.21 2.14 — Fri Nov 27 19:09:46 UTC 2026 to Fri Nov 27 19:09:46 UTC 2026 — exit status 0.

137-wrong-pane-runtime.log · SHA-256 a5189f3471bf16d3e6dbde6d333d30dd77d335a259507715c4a47a2c1a1c9905 — Full command in cited source — 14:09  up 6 days,  5:37, 1 user, load averages: 2.09 2.18 2.13 — Fri Nov 27 19:09:51 UTC 2026 to Fri Nov 27 19:09:51 UTC 2026 — exit status 0.

138-wrong-pane-wait.log · SHA-256 8c0390550e1cf46230890f8d270892df939a583b33ad25c152bd19c0890cce25 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 14:09  1 user, load averages: 2.09 2.18 2.13 — Fri Nov 27 19:09:51 UTC 2026 to Fri Nov 27 19:11:21 UTC 2026 — exit status 0.

139-wrong-pane-test.log · SHA-256 40c53bc91f05d47a5ce5478ffb8f614bb12d31c7a724bcd7a4247ffc318340fc — Full command in cited source — 14:11  up 6 days,  5:39, 1 user, load averages: 1.83 2.11 2.11 — Fri Nov 27 19:11:27 UTC 2026 to Fri Nov 27 19:11:28 UTC 2026 — exit status 1.

140-wrong-pane-restore.log · SHA-256 3532d8aaab41066754c6f6cf88484b1e5f00322c6c144bdf83063e48d4070d67 — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh apps/madbridge/src/tui/App.tsx — 14:11  1 user, load averages: 1.83 2.11 2.11 — Fri Nov 27 19:11:28 UTC 2026 to Fri Nov 27 19:11:28 UTC 2026 — exit status 0.

141-order-edit.log · SHA-256 c0b01d0fe87b745b28974eda605477eb4a15848323bff37144e0025661b2b4c2 — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py apps/madbridge/src/tui/live/retention.ts 'this.chunks.set(this.receivedFrames, this.last);' 'this.chunks.set(this.receivedFrames, this.last); if (this.receivedFrames === 2) { const first = this.chunks.get(1)!; this.chunks.delete(1); this.chunks.set(1, first); }' — 14:11  1 user, load averages: 1.83 2.11 2.11 — Fri Nov 27 19:11:28 UTC 2026 to Fri Nov 27 19:11:28 UTC 2026 — exit status 0.

142-order-diff.log · SHA-256 42c16426a66f10c507f90c933632a623c496ef94f7ed428a728c5120109f72da — git -C tui diff -- apps/madbridge/src/tui/live/retention.ts — 14:11  1 user, load averages: 1.83 2.11 2.11 — Fri Nov 27 19:11:28 UTC 2026 to Fri Nov 27 19:11:28 UTC 2026 — exit status 0.

143-order-runtime.log · SHA-256 6ec8c0e6cfa2d1a7a9d8698ee32dd8b24f7eb04d2c26c1fca5d538d48500c699 — Full command in cited source — 14:12  up 6 days,  5:39, 1 user, load averages: 2.30 2.22 2.15 — Fri Nov 27 19:12:13 UTC 2026 to Fri Nov 27 19:12:13 UTC 2026 — exit status 0.

144-order-wait.log · SHA-256 6385b2ccc3cc3054fd70328fed67136734a7f0459a56bb8ae2f4ba23524c8761 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 14:12  1 user, load averages: 2.30 2.22 2.15 — Fri Nov 27 19:12:13 UTC 2026 to Fri Nov 27 19:13:13 UTC 2026 — exit status 0.

145-order-test.log · SHA-256 2d36c97230c06e1bcb7d8563c7a2fcf0db732092a07ca4d6f554bebaeb4b1b3b — Full command in cited source — 14:13  up 6 days,  5:41, 1 user, load averages: 2.06 2.17 2.14 — Fri Nov 27 19:13:30 UTC 2026 to Fri Nov 27 19:13:30 UTC 2026 — exit status 1.

146-order-restore.log · SHA-256 e59befa0e6ba0cdddc8babf5429596aa62769a6407201697a4f71efbd41c0362 — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh apps/madbridge/src/tui/live/retention.ts — 14:13  1 user, load averages: 2.06 2.17 2.14 — Fri Nov 27 19:13:30 UTC 2026 to Fri Nov 27 19:13:31 UTC 2026 — exit status 0.

147-line-limit-edit.log · SHA-256 8c564001e3c347ceb38f4b3e7d44a10e8dd4110baa450379cabd756079e9c7a7 — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py apps/madbridge/src/tui/live/retention.ts 'MAX_PANE_LINES = 10_000' 'MAX_PANE_LINES = 10_001' — 14:13  1 user, load averages: 2.06 2.17 2.14 — Fri Nov 27 19:13:31 UTC 2026 to Fri Nov 27 19:13:31 UTC 2026 — exit status 0.

148-line-limit-diff.log · SHA-256 d7395ec85d0c9f0d6948993336bf8af37be3e94855358016c046ac7b2cc27dd1 — git -C tui diff -- apps/madbridge/src/tui/live/retention.ts — 14:13  1 user, load averages: 2.06 2.17 2.14 — Fri Nov 27 19:13:31 UTC 2026 to Fri Nov 27 19:13:31 UTC 2026 — exit status 0.

149-line-limit-runtime.log · SHA-256 21dcd0f378629fb5a0d01b1f6d11ba01ee80bfe672254930d224ea65b512bc55 — Full command in cited source — 14:13  up 6 days,  5:41, 1 user, load averages: 2.22 2.20 2.15 — Fri Nov 27 19:13:33 UTC 2026 to Fri Nov 27 19:13:33 UTC 2026 — exit status 0.

150-line-limit-wait.log · SHA-256 759fe38d88233ecf044755702326fb290b1bf243b6725f9c67da42b2719f6257 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 14:13  1 user, load averages: 2.22 2.20 2.15 — Fri Nov 27 19:13:33 UTC 2026 to Fri Nov 27 19:14:03 UTC 2026 — exit status 0.

151-line-limit-test.log · SHA-256 9418080af308950e334451c2d6f9c09d1573d644de6e71e23b282b9bacfd996b — Full command in cited source — 14:14  up 6 days,  5:41, 1 user, load averages: 1.88 2.12 2.12 — Fri Nov 27 19:14:06 UTC 2026 to Fri Nov 27 19:14:06 UTC 2026 — exit status 1.

152-line-limit-restore.log · SHA-256 07c6693d1fcbce049619e1f7e9d4c93dc470479ac244a7520c4cb63d1c38e022 — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh apps/madbridge/src/tui/live/retention.ts — 14:14  1 user, load averages: 1.88 2.12 2.12 — Fri Nov 27 19:14:06 UTC 2026 to Fri Nov 27 19:14:06 UTC 2026 — exit status 0.

153-newest-edit.log · SHA-256 c42c275612caa64c7fb4d5ef08778e7fb504f6639896ab2a3871da24956c5de8 — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py apps/madbridge/src/tui/live/retention.ts 'const start = this.receivedBytes;' 'if (this.lineCount >= MAX_PANE_LINES) return; const start = this.receivedBytes;' — 14:14  1 user, load averages: 1.81 2.10 2.11 — Fri Nov 27 19:14:06 UTC 2026 to Fri Nov 27 19:14:06 UTC 2026 — exit status 0.

154-newest-diff.log · SHA-256 799c9baf1d861dcba566ea5c4d02b8bbcd44a61642f1499d8919a7ab5cdfe83d — git -C tui diff -- apps/madbridge/src/tui/live/retention.ts — 14:14  1 user, load averages: 1.81 2.10 2.11 — Fri Nov 27 19:14:07 UTC 2026 to Fri Nov 27 19:14:07 UTC 2026 — exit status 0.

155-newest-runtime.log · SHA-256 d762d032b0eac112424c42312e726731407af348b694121fe71dd328eacf1cfd — Full command in cited source — 14:14  up 6 days,  5:41, 1 user, load averages: 1.81 2.10 2.11 — Fri Nov 27 19:14:11 UTC 2026 to Fri Nov 27 19:14:11 UTC 2026 — exit status 0.

156-newest-wait.log · SHA-256 0abed5b771d384248a4fcd2794ed08fbfefffcd7d2e809f500918dd75d1ad798 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 14:14  1 user, load averages: 1.81 2.10 2.11 — Fri Nov 27 19:14:11 UTC 2026 to Fri Nov 27 19:14:11 UTC 2026 — exit status 0.

157-newest-test.log · SHA-256 28b5b1e94bff24a259b7fdd3f9b1e33d1e00236d144595dceffde0b6313e15ec — Full command in cited source — 14:14  up 6 days,  5:41, 1 user, load averages: 1.66 2.06 2.10 — Fri Nov 27 19:14:13 UTC 2026 to Fri Nov 27 19:14:13 UTC 2026 — exit status 1.

158-newest-restore.log · SHA-256 08caa0b10ba58aae66e0676269e42decb6338520d38f2a943f3d673a83545384 — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh apps/madbridge/src/tui/live/retention.ts — 14:14  1 user, load averages: 1.66 2.06 2.10 — Fri Nov 27 19:14:13 UTC 2026 to Fri Nov 27 19:14:13 UTC 2026 — exit status 0.

159-byte-limit-edit.log · SHA-256 ce6c87dadee017da71a7aaf71699d599e55d6715d3748d5a7c554a8d985e18fc — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py apps/madbridge/src/tui/live/retention.ts 'MAX_PANE_BYTES = 2_097_152' 'MAX_PANE_BYTES = 2_097_153' — 14:14  1 user, load averages: 1.66 2.06 2.10 — Fri Nov 27 19:14:13 UTC 2026 to Fri Nov 27 19:14:13 UTC 2026 — exit status 0.

160-byte-limit-diff.log · SHA-256 d821faae2b2546e0e7c0cd8e9a50747304b61c65c7d258c841b447b026a0e7b3 — git -C tui diff -- apps/madbridge/src/tui/live/retention.ts — 14:14  1 user, load averages: 1.66 2.06 2.10 — Fri Nov 27 19:14:13 UTC 2026 to Fri Nov 27 19:14:13 UTC 2026 — exit status 0.

161-byte-limit-runtime.log · SHA-256 11c434179aae0c91c71f5df62b8c91f6bca8b4266d1f2ccb6a4b127ff140f518 — Full command in cited source — 14:14  up 6 days,  5:41, 1 user, load averages: 1.66 2.06 2.10 — Fri Nov 27 19:14:15 UTC 2026 to Fri Nov 27 19:14:15 UTC 2026 — exit status 0.

162-byte-limit-wait.log · SHA-256 8715462539ef1e56ca02cbb0136bfb1180e0ae2818e38868ecb67f7ac564a604 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 14:14  1 user, load averages: 1.66 2.06 2.10 — Fri Nov 27 19:14:15 UTC 2026 to Fri Nov 27 19:14:15 UTC 2026 — exit status 0.

163-byte-limit-test.log · SHA-256 644c27e6782eae28169a629a39e443ce09a6823eb272bf9e9e60c5ff15821908 — Full command in cited source — 14:14  up 6 days,  5:41, 1 user, load averages: 1.66 2.06 2.10 — Fri Nov 27 19:14:16 UTC 2026 to Fri Nov 27 19:14:17 UTC 2026 — exit status 1.

164-byte-limit-restore.log · SHA-256 8ebe2488e78fef2a192234a22049e28aa5977a565ba20ddc6194a140631ea286 — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh apps/madbridge/src/tui/live/retention.ts — 14:14  1 user, load averages: 1.61 2.04 2.09 — Fri Nov 27 19:14:17 UTC 2026 to Fri Nov 27 19:14:17 UTC 2026 — exit status 0.

165-count-edit.log · SHA-256 175bb73dfee5a276dc0b7a073a7ede62c1f730e1ba52c7db2def1decc75750d9 — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py apps/madbridge/src/tui/live/retention.ts 'this.retainedBytes = this.receivedBytes - floor;' 'this.retainedBytes = this.receivedBytes;' — 14:14  1 user, load averages: 1.61 2.04 2.09 — Fri Nov 27 19:14:17 UTC 2026 to Fri Nov 27 19:14:17 UTC 2026 — exit status 0.

166-count-diff.log · SHA-256 ffac3d1ae6768cb18dd723c69d744ceb7d087d8a9d54348bab9d87c71f35bf79 — git -C tui diff -- apps/madbridge/src/tui/live/retention.ts — 14:14  1 user, load averages: 1.61 2.04 2.09 — Fri Nov 27 19:14:17 UTC 2026 to Fri Nov 27 19:14:17 UTC 2026 — exit status 0.

167-count-runtime.log · SHA-256 08f4bd9fd9f40f20dc490304d2135de92f9b5751445eb159355daec36c23fd1e — Full command in cited source — 14:14  up 6 days,  5:41, 1 user, load averages: 1.61 2.04 2.09 — Fri Nov 27 19:14:18 UTC 2026 to Fri Nov 27 19:14:18 UTC 2026 — exit status 0.

168-count-wait.log · SHA-256 570f65916fe0a5b91db3333e64039446f7481bd01c57b1909ecd2a40fe632f24 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 14:14  1 user, load averages: 1.61 2.04 2.09 — Fri Nov 27 19:14:18 UTC 2026 to Fri Nov 27 19:14:18 UTC 2026 — exit status 0.

169-count-test.log · SHA-256 f964c4da6503950ffd2ed0d414e579a487c5bb42e278676a9459cdc34f7da246 — Full command in cited source — 14:14  up 6 days,  5:41, 1 user, load averages: 1.61 2.04 2.09 — Fri Nov 27 19:14:19 UTC 2026 to Fri Nov 27 19:14:19 UTC 2026 — exit status 1.

170-count-restore.log · SHA-256 94d856e315f36ddb24471af722f19219abd3e6d744984cef8b166da9cb901d8f — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh apps/madbridge/src/tui/live/retention.ts — 14:14  1 user, load averages: 1.61 2.04 2.09 — Fri Nov 27 19:14:19 UTC 2026 to Fri Nov 27 19:14:20 UTC 2026 — exit status 0.

171-r3-contracts.log · SHA-256 89e1fa9e63e83159b9d9ad9f7afd2e415985011b2b1f098bb1f73d78ed20fb4e — bridge_sources — 14:14  1 user, load averages: 1.72 2.06 2.10 — Fri Nov 27 19:14:26 UTC 2026 to Fri Nov 27 19:14:26 UTC 2026 — exit status 0.

172-r3-handle-types.log · SHA-256 a2d401783ac12138015895308a47d57fdc3739bc707f033ea359c274dadb3ee2 — r3_source_keys — 14:14  1 user, load averages: 1.76 2.06 2.10 — Fri Nov 27 19:14:33 UTC 2026 to Fri Nov 27 19:14:33 UTC 2026 — exit status 0.

173-unbridged-client.log · SHA-256 0ca2eb504fd59cab045e968b247c66ccc4db3897b461b8045d35dae11fb62890 — r3_investigate — 14:14  1 user, load averages: 1.71 2.04 2.09 — Fri Nov 27 19:14:46 UTC 2026 to Fri Nov 27 19:14:46 UTC 2026 — exit status 0.

174-r3-offline-domains.log · SHA-256 046ddf5e1576d6b6a5ee68ce323cb521b62ee5dcc8f731da0c1a1466da008b1e — r3_setup — 14:14  1 user, load averages: 1.44 1.97 2.06 — Fri Nov 27 19:14:56 UTC 2026 to Fri Nov 27 19:14:56 UTC 2026 — exit status 0.

175-public-original-build.log · SHA-256 d88f12962fb49e0e29ebb0fd5f2d8c621be43863e0a13b281781a1ec1e7bb975 — r3_boundaries — 14:15  1 user, load averages: 1.38 1.94 2.05 — Fri Nov 27 19:15:02 UTC 2026 to Fri Nov 27 19:15:02 UTC 2026 — exit status 0.

176-harness-isolation.log · SHA-256 37a28889a4ed8a2f14a6147563a325cfc32e4dadafed421dc79b31dc650be714 — r3_probe — 14:15  1 user, load averages: 1.24 1.89 2.03 — Fri Nov 27 19:15:12 UTC 2026 to Fri Nov 27 19:15:12 UTC 2026 — exit status 0.

177-fixture-output.log · SHA-256 d46b09df322671d494909875338ccd4ffdc3d375420eb869d3654901f3b67ba5 — r3_fixture_tools — 14:15  1 user, load averages: 1.22 1.85 2.01 — Fri Nov 27 19:15:32 UTC 2026 to Fri Nov 27 19:15:32 UTC 2026 — exit status 0.

178-r3-deadline-details.log · SHA-256 09188f2c72e2644842b82d703370f01735f70f2c6cfe0bdec217aa0551f3ac82 — r3_exact_scope — 14:16  1 user, load averages: 1.59 1.88 2.02 — Fri Nov 27 19:16:01 UTC 2026 to Fri Nov 27 19:16:01 UTC 2026 — exit status 0.

179-ack-setup.log · SHA-256 cfa0afeb1626502ffb3a0fd0de8988aa93e90d8757699f94d59952fcfe05ccb8 — key_blocks — 14:16  1 user, load averages: 1.57 1.86 2.01 — Fri Nov 27 19:16:10 UTC 2026 to Fri Nov 27 19:16:10 UTC 2026 — exit status 0.

180-r3-scanner.log · SHA-256 67f04e6c4082bae16953646e3748094c315bae192e5dbf4e9d8046278c773f0b — r3_handoff — 14:16  1 user, load averages: 1.57 1.85 2.00 — Fri Nov 27 19:16:18 UTC 2026 to Fri Nov 27 19:16:18 UTC 2026 — exit status 0.

181-r3-bridge.log · SHA-256 fd029d62524c13432746126fe7413ee02a05c6bef7eb38ee1974ed0fd55f81bf — write_bridge — 14:17  1 user, load averages: 1.87 1.91 2.02 — Fri Nov 27 19:17:08 UTC 2026 to Fri Nov 27 19:17:08 UTC 2026 — exit status 0.

182-r3-test-apis.log · SHA-256 a2aef17ca0d4a6304c50f456ddda4b0c40d2b9f422a65ede25b5dda1ced4479a — r3_test_apis — 14:17  1 user, load averages: 2.10 1.96 2.03 — Fri Nov 27 19:17:29 UTC 2026 to Fri Nov 27 19:17:29 UTC 2026 — exit status 0.

183-dispatch-observations.log · SHA-256 c6e46a1a218b61329a5ec66f2910e52d6367899c7a2f028bf0c8d20744ff220f — r3_tests_read — 14:18  1 user, load averages: 2.79 2.15 2.10 — Fri Nov 27 19:18:01 UTC 2026 to Fri Nov 27 19:18:01 UTC 2026 — exit status 0.

184-phase3a-cleanup.log · SHA-256 20def356b6eaff4961cf0aacd38faece586301902b9a0411de803432f85e566d — examine_fixture_cleanup — 14:18  1 user, load averages: 2.39 2.10 2.08 — Fri Nov 27 19:18:12 UTC 2026 to Fri Nov 27 19:18:12 UTC 2026 — exit status 0.

185-dispatch-helper.log · SHA-256 49a60e29bd60600c090954c2291c647e427e3216d4ed8c3817810e66c202a98f — dispatch_helpers — 14:18  1 user, load averages: 2.34 2.11 2.08 — Fri Nov 27 19:18:36 UTC 2026 to Fri Nov 27 19:18:36 UTC 2026 — exit status 0.

186-nonlive-fixture.log · SHA-256 df8e123f920d5b63db9f63ec57aa330fe423068dadcb999afb7e874af6bfcf8d — r3_no_bridge_shape — 14:18  1 user, load averages: 2.04 2.05 2.06 — Fri Nov 27 19:18:49 UTC 2026 to Fri Nov 27 19:18:49 UTC 2026 — exit status 1.

187-phase3a-imports.log · SHA-256 56d3c347d2ede8c4ac6b677f633967355e2a9a80d0d624e126d6cf4a981c7be4 — sed -n 9,25p tui/test/phase3a/runtime-harness.ts — 14:18  1 user, load averages: 2.03 2.05 2.06 — Fri Nov 27 19:18:54 UTC 2026 to Fri Nov 27 19:18:54 UTC 2026 — exit status 0.

188-nonlive-observation.log · SHA-256 089b54f7a4a4f199cfe4488d580e698a78982a5a8bc20d140ffb1877a01c23f8 — nonlive_fixture — 14:19  1 user, load averages: 2.16 2.08 2.07 — Fri Nov 27 19:19:24 UTC 2026 to Fri Nov 27 19:19:24 UTC 2026 — exit status 0.

189-r3-tests.log · SHA-256 6a9cdbb94eba056ae3bc70e57a7088975ccc6d247ec9ca6b7afbe607bfb18b85 — add_dispatch_tests — 14:20  1 user, load averages: 1.79 1.99 2.04 — Fri Nov 27 19:20:01 UTC 2026 to Fri Nov 27 19:20:01 UTC 2026 — exit status 0.

190-r3-pin.log · SHA-256 ded6a5258f3100767510fac7df389ccf13018661160bdd61039eee5f013c5228 — update_pin — 14:20  1 user, load averages: 1.79 1.99 2.04 — Fri Nov 27 19:20:01 UTC 2026 to Fri Nov 27 19:20:01 UTC 2026 — exit status 0.

191-r3-runtime.log · SHA-256 a3ddf17817f2117e321c373c3303e38dc25fa4ad3b8b72e485b68f7d47f82f25 — Full command in cited source — 14:20  up 6 days,  5:48, 1 user, load averages: 2.41 2.13 2.09 — Fri Nov 27 19:20:30 UTC 2026 to Fri Nov 27 19:20:30 UTC 2026 — exit status 0.

192-r3-wait.log · SHA-256 bc3ed04b49e75f8baeaf16f0b46e57dd2d3556ccf7aa40031e7a88b2a110bc65 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 14:20  1 user, load averages: 2.41 2.13 2.09 — Fri Nov 27 19:20:30 UTC 2026 to Fri Nov 27 19:24:00 UTC 2026 — exit status 0.

193-r3-test.log · SHA-256 3022301bfd53425dd7b50dbd402decfbd0c66faec3a1bddf023dbbcc5e3f9fbc — Full command in cited source — 14:31  up 6 days,  5:58, 1 user, load averages: 1.15 1.56 1.82 — Fri Nov 27 19:31:13 UTC 2026 to Fri Nov 27 19:31:18 UTC 2026 — exit status 0.

194-sender-review.log · SHA-256 0195dc0e27707f3ebc612e79240cd7f56e2fd163bb8c603701af01cafb802bd7 — madv_request_rules — 14:31  1 user, load averages: 1.39 1.60 1.83 — Fri Nov 27 19:31:28 UTC 2026 to Fri Nov 27 19:31:28 UTC 2026 — exit status 0.

195-r3-types.log · SHA-256 2c6b8d7a2593078eda42a8939f2db34c1c22d90ebe9d66499211c91590eeb0b4 — Full command in cited source — 14:32  up 6 days,  5:59, 1 user, load averages: 2.04 1.74 1.87 — Fri Nov 27 19:32:17 UTC 2026 to Fri Nov 27 19:32:21 UTC 2026 — exit status 2.

196-dispatch-checks.log · SHA-256 34eb518864a4c870e6ca4fcfe3a88171ecfc362d9314eb9c0545b04663094b95 — fix_dispatch — 14:32  1 user, load averages: 2.36 1.88 1.92 — Fri Nov 27 19:32:52 UTC 2026 to Fri Nov 27 19:32:52 UTC 2026 — exit status 0.

197-r3-types.log · SHA-256 4b38421eda729f94eb62e59be8b8bdeb3f9d0aa9c643c757438308f42104e6c2 — Full command in cited source — 14:33  up 6 days, 6 hrs, 1 user, load averages: 2.55 1.94 1.94 — Fri Nov 27 19:33:07 UTC 2026 to Fri Nov 27 19:33:10 UTC 2026 — exit status 0.

198-r3-repeat-wait.log · SHA-256 c0bc0461d9a4e731935f8b8a7dde1ca2279223f6ecc9cebcf1bd1714685b97ef — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 14:33  1 user, load averages: 2.51 1.94 1.94 — Fri Nov 27 19:33:10 UTC 2026 to Fri Nov 27 19:38:11 UTC 2026 — exit status 0.

199-r3-repeat.log · SHA-256 7ebe6f1129e0880bf7a8105c0d35bfb89666d6fd91b6114d3451048d2639b60d — Full command in cited source — 15:06  up 6 days,  6:34, 1 user, load averages: 2.23 2.05 2.08 — Fri Nov 27 20:06:48 UTC 2026 to Fri Nov 27 20:06:54 UTC 2026 — exit status 0.

200-r3-message.log · SHA-256 2f24af772a2ec06db31127d9f56189983b76ab717d248b313de7e4a41d4d6618 — r3_msg — 15:07  1 user, load averages: 2.21 2.06 2.08 — Fri Nov 27 20:07:05 UTC 2026 to Fri Nov 27 20:07:05 UTC 2026 — exit status 0.

201-r3-message-check.log · SHA-256 f8cda33a583d8797086da890db1eec3b0eccd4156024bdeba10c9a15a7f37397 — zsh /private/tmp/m3-build.U6WP3RU0/check-message.zsh /private/tmp/m3-build.U6WP3RU0/message-4 — 15:07  1 user, load averages: 2.21 2.06 2.08 — Fri Nov 27 20:07:05 UTC 2026 to Fri Nov 27 20:07:05 UTC 2026 — exit status 0.

202-r3-stage.log · SHA-256 bc356ebe45cac3a92e030f95e3e7e0cbf04ee12e97a80b1459202c507c8cbb2d — Full command in cited source — 15:07  1 user, load averages: 2.21 2.06 2.08 — Fri Nov 27 20:07:05 UTC 2026 to Fri Nov 27 20:07:05 UTC 2026 — exit status 0.

203-commit-r3.log · SHA-256 e8329c13405fed1b86175003f1a4dc658c2e3cb4b849bed2e5e7a6fc7715bc7e — git -C tui commit -F /private/tmp/m3-build.U6WP3RU0/message-4 — 15:07  1 user, load averages: 2.21 2.06 2.08 — Fri Nov 27 20:07:09 UTC 2026 to Fri Nov 27 20:07:09 UTC 2026 — exit status 0.

204-r3-head.log · SHA-256 b190517a0e35b4b057fd06c293ecc895a500eb6afe03b9d2c13fddec9e3154f6 — git -C tui rev-parse HEAD — 15:07  1 user, load averages: 2.21 2.06 2.08 — Fri Nov 27 20:07:09 UTC 2026 to Fri Nov 27 20:07:09 UTC 2026 — exit status 0.

205-before-ack-edit.log · SHA-256 2edb1b094e9886dd5d95800aa642726ebd4b7946d8d8402d904ab7199407169e — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py packages/broker/src/pty-host-supervisor.ts '    if (await promise) return true;' '    if (kind === "resize") return true; if (await promise) return true;' — 15:07  1 user, load averages: 2.03 2.03 2.07 — Fri Nov 27 20:07:51 UTC 2026 to Fri Nov 27 20:07:51 UTC 2026 — exit status 0.

206-before-ack-diff.log · SHA-256 1e0c83a2d8f3e8a51021924eaa68d08a19c614c70d7b729aefd29ed8fcdb95db — git -C tui diff -- packages/broker/src/pty-host-supervisor.ts — 15:07  1 user, load averages: 2.03 2.03 2.07 — Fri Nov 27 20:07:51 UTC 2026 to Fri Nov 27 20:07:51 UTC 2026 — exit status 0.

207-before-ack-runtime.log · SHA-256 c24c5ab396297a9111784a5af19ad74a8bf1bbb67c876bf9701f0d5e8cd6c3a3 — Full command in cited source — 15:08  up 6 days,  6:36, 1 user, load averages: 1.90 1.98 2.05 — Fri Nov 27 20:08:34 UTC 2026 to Fri Nov 27 20:08:34 UTC 2026 — exit status 0.

208-before-ack-wait.log · SHA-256 70d06a12bd57b5444939987d76f64dcb88acb0dc8271db3935275f8ade3d5426 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 15:08  1 user, load averages: 1.90 1.98 2.05 — Fri Nov 27 20:08:34 UTC 2026 to Fri Nov 27 20:08:34 UTC 2026 — exit status 0.

209-before-ack-test.log · SHA-256 eb87b6accbd9d9d8772a2f1692d8a203d2e6c179ca3910b1184ac50c263f6311 — Full command in cited source — 15:08  up 6 days,  6:36, 1 user, load averages: 1.91 1.98 2.05 — Fri Nov 27 20:08:36 UTC 2026 to Fri Nov 27 20:08:38 UTC 2026 — exit status 1.

210-before-ack-restore.log · SHA-256 3f433258a3e5a014412c4afc36ea806b7a44a2fbe112aab169b102fec0be482a — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh packages/broker/src/pty-host-supervisor.ts — 15:08  1 user, load averages: 1.91 1.98 2.05 — Fri Nov 27 20:08:39 UTC 2026 to Fri Nov 27 20:08:39 UTC 2026 — exit status 0.

211-no-escalation-edit.log · SHA-256 170506dd9d5d6fb4bdf36148904685114483e4690cf1afa03a8b7c00f7d11131 — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py packages/broker/src/pty-host-supervisor.ts 'const containing = startEscalation(handle, pgid, handle.hostPid, started);' 'const containing = Promise.resolve();' — 15:08  1 user, load averages: 1.91 1.98 2.05 — Fri Nov 27 20:08:39 UTC 2026 to Fri Nov 27 20:08:39 UTC 2026 — exit status 0.

212-no-escalation-diff.log · SHA-256 2ac6257d189e7efb6ba8d2b9c0a5ea7e4070b7c201bf16b0cb75a2a6a289c9c3 — git -C tui diff -- packages/broker/src/pty-host-supervisor.ts — 15:08  1 user, load averages: 1.91 1.98 2.05 — Fri Nov 27 20:08:39 UTC 2026 to Fri Nov 27 20:08:39 UTC 2026 — exit status 0.

213-no-escalation-runtime.log · SHA-256 80afe51123dd759dbd32b2137b53b45bb7ec09e4fe576a9b20e138b521737704 — Full command in cited source — 15:08  up 6 days,  6:36, 1 user, load averages: 1.99 2.00 2.06 — Fri Nov 27 20:08:40 UTC 2026 to Fri Nov 27 20:08:41 UTC 2026 — exit status 0.

214-no-escalation-wait.log · SHA-256 e47aaf1020fd515c154eb41bd2803320300e4759ac6fdf3ffef95db8fd0498cd — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 15:08  1 user, load averages: 1.99 2.00 2.06 — Fri Nov 27 20:08:41 UTC 2026 to Fri Nov 27 20:08:41 UTC 2026 — exit status 0.

215-no-escalation-test.log · SHA-256 9d29c6b752387a10143814086818e9d98d1770a16e201076e112489b9131f0fa — Full command in cited source — 15:08  up 6 days,  6:36, 1 user, load averages: 1.99 2.00 2.06 — Fri Nov 27 20:08:42 UTC 2026 to Fri Nov 27 20:08:45 UTC 2026 — exit status 1.

216-no-escalation-restore.log · SHA-256 8b837ba77d2f15883933ef6d8f63ad3c8b5b34aad185204f337af8967aca9bda — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh packages/broker/src/pty-host-supervisor.ts — 15:08  1 user, load averages: 1.83 1.97 2.04 — Fri Nov 27 20:08:45 UTC 2026 to Fri Nov 27 20:08:46 UTC 2026 — exit status 0.

217-execution-bridge-edit.log · SHA-256 e1483f95f06da6fd32c4dbc6e96272d5ae64a19d8e0db6e3f8fad078ab7f10e0 — Full command in cited source — 15:08  1 user, load averages: 1.83 1.97 2.04 — Fri Nov 27 20:08:46 UTC 2026 to Fri Nov 27 20:08:46 UTC 2026 — exit status 0.

218-execution-bridge-diff.log · SHA-256 b0974020fa87cc2837110071242f115ca3f7d8fb35291f28c5a1247547ca4888 — git -C tui diff -- packages/supervisor/src/build.ts — 15:08  1 user, load averages: 1.83 1.97 2.04 — Fri Nov 27 20:08:46 UTC 2026 to Fri Nov 27 20:08:46 UTC 2026 — exit status 0.

219-execution-bridge-runtime.log · SHA-256 9ffb50973e0aae3c78cd889830e214394b03297fc41e733f3be1194f61c5f628 — Full command in cited source — 15:08  up 6 days,  6:36, 1 user, load averages: 1.79 1.95 2.04 — Fri Nov 27 20:08:55 UTC 2026 to Fri Nov 27 20:08:56 UTC 2026 — exit status 0.

220-execution-bridge-wait.log · SHA-256 948f23b5a82104990c61e545f7e888af181c217aa6c78702c41211f981eb45a2 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 15:08  1 user, load averages: 1.79 1.95 2.04 — Fri Nov 27 20:08:56 UTC 2026 to Fri Nov 27 20:08:56 UTC 2026 — exit status 0.

221-execution-bridge-test.log · SHA-256 b16afedd84ec3bc6e22b2eb70c340ba8f46538ba4218a6c225f0e895b7915463 — Full command in cited source — 15:08  up 6 days,  6:36, 1 user, load averages: 1.79 1.95 2.04 — Fri Nov 27 20:08:58 UTC 2026 to Fri Nov 27 20:09:00 UTC 2026 — exit status 1.

222-execution-bridge-restore.log · SHA-256 0f8d1290864814cd237582c13fa7ff39bb141367279b01feb0cac87f41b74075 — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh packages/supervisor/src/build.ts — 15:09  1 user, load averages: 1.79 1.95 2.04 — Fri Nov 27 20:09:00 UTC 2026 to Fri Nov 27 20:09:00 UTC 2026 — exit status 0.

223-original-write-edit.log · SHA-256 5f76259546a6606d0c2de91edfed306b1bc7c429ed8cd178579f25cdc180ce78 — Full command in cited source — 15:09  1 user, load averages: 1.72 1.94 2.03 — Fri Nov 27 20:09:00 UTC 2026 to Fri Nov 27 20:09:00 UTC 2026 — exit status 0.

224-original-write-diff.log · SHA-256 6b70f26df5e7610b00b68f4fc9bc0af35e06daa922cca9586bbc50baf5a9d17e — git -C tui diff -- packages/supervisor/src/build.ts — 15:09  1 user, load averages: 1.72 1.94 2.03 — Fri Nov 27 20:09:00 UTC 2026 to Fri Nov 27 20:09:00 UTC 2026 — exit status 0.

225-original-write-runtime.log · SHA-256 1f0ed335c56fdd57b79f9404d32b0222fecd18335e78a91295cd870f46c39e56 — Full command in cited source — 15:09  up 6 days,  6:36, 1 user, load averages: 1.72 1.94 2.03 — Fri Nov 27 20:09:02 UTC 2026 to Fri Nov 27 20:09:03 UTC 2026 — exit status 0.

226-original-write-wait.log · SHA-256 6b605bd520200a8db4af19d7f8972ed9fe0a4f08f1cde521d83a9ee7d59a8dbe — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 15:09  1 user, load averages: 1.72 1.94 2.03 — Fri Nov 27 20:09:03 UTC 2026 to Fri Nov 27 20:09:03 UTC 2026 — exit status 0.

227-original-write-test.log · SHA-256 6c43a5c7a39f65a3c0610b471a7bb861762db2583b0e5187dae417aa3059e245 — Full command in cited source — 15:09  up 6 days,  6:36, 1 user, load averages: 1.72 1.94 2.03 — Fri Nov 27 20:09:03 UTC 2026 to Fri Nov 27 20:09:09 UTC 2026 — exit status 1.

228-original-write-restore.log · SHA-256 c55ac68724d6b92699cf957bd312f498d1153d66045ac368c0faa676617d16cc — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh packages/supervisor/src/build.ts — 15:09  1 user, load averages: 1.66 1.92 2.02 — Fri Nov 27 20:09:09 UTC 2026 to Fri Nov 27 20:09:09 UTC 2026 — exit status 0.

229-no-request-edit.log · SHA-256 23fbe9cff6323ffb4c2c7520fecc3774edd4fe3f4b57ed2e3385a60d28d85090 — Full command in cited source — 15:09  1 user, load averages: 1.66 1.92 2.02 — Fri Nov 27 20:09:09 UTC 2026 to Fri Nov 27 20:09:09 UTC 2026 — exit status 0.

230-no-request-diff.log · SHA-256 52f96957388b816d453112e19b5d075221995a3e03c877e791594a1d99fa098e — git -C tui diff -- packages/adapter-madv-surface/src/live.ts — 15:09  1 user, load averages: 1.66 1.92 2.02 — Fri Nov 27 20:09:09 UTC 2026 to Fri Nov 27 20:09:09 UTC 2026 — exit status 0.

231-no-request-runtime.log · SHA-256 d8ff72676df6fc99edaa906d6f55266be32f528529273258194a3104b4113bc4 — Full command in cited source — 15:09  up 6 days,  6:36, 1 user, load averages: 1.69 1.92 2.02 — Fri Nov 27 20:09:11 UTC 2026 to Fri Nov 27 20:09:11 UTC 2026 — exit status 0.

232-no-request-wait.log · SHA-256 fad654faa0d15e9bad94bae68c527cf182cb992636959386f132cce37c0f9083 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 15:09  1 user, load averages: 1.69 1.92 2.02 — Fri Nov 27 20:09:11 UTC 2026 to Fri Nov 27 20:09:11 UTC 2026 — exit status 0.

233-no-request-test.log · SHA-256 e727fa5cd0cb68007a0fde25ef9aabb68b47417ab4686109cb1b8c6348b1ce96 — Full command in cited source — 15:09  up 6 days,  6:36, 1 user, load averages: 1.72 1.92 2.02 — Fri Nov 27 20:09:17 UTC 2026 to Fri Nov 27 20:09:22 UTC 2026 — exit status 1.

234-no-request-restore.log · SHA-256 dbd2d2e8cafbfcf397ddf9ecccfe9762f7c9d19d648a0f7921ed06370497f38b — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh packages/adapter-madv-surface/src/live.ts — 15:09  1 user, load averages: 1.82 1.94 2.03 — Fri Nov 27 20:09:22 UTC 2026 to Fri Nov 27 20:09:22 UTC 2026 — exit status 0.

235-closed-accepts-edit.log · SHA-256 d9b66082a6848ca97b9a516fe2c90b74399c0e782a3319feea837d8e8017c8e2 — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py packages/adapter-madv-surface/src/live.ts '  function sendEncodedInput(bytes: Uint8Array): boolean { if (closed || !ready || failure) return false;' '  function sendEncodedInput(bytes: Uint8Array): boolean { if (closed || !ready || failure) return true;' — 15:09  1 user, load averages: 1.82 1.94 2.03 — Fri Nov 27 20:09:23 UTC 2026 to Fri Nov 27 20:09:23 UTC 2026 — exit status 0.

236-closed-accepts-diff.log · SHA-256 f9e12feed0389146d312bf84cf855c018ddad34dda1272aa85a771daaac03175 — git -C tui diff -- packages/adapter-madv-surface/src/live.ts — 15:09  1 user, load averages: 1.82 1.94 2.03 — Fri Nov 27 20:09:23 UTC 2026 to Fri Nov 27 20:09:23 UTC 2026 — exit status 0.

237-closed-accepts-runtime.log · SHA-256 1ca42a8d09cdcec00408509ab6cba4ab394b73ec48c36caf074b6d35c4d9b8c6 — Full command in cited source — 15:09  up 6 days,  6:37, 1 user, load averages: 1.82 1.94 2.03 — Fri Nov 27 20:09:24 UTC 2026 to Fri Nov 27 20:09:25 UTC 2026 — exit status 0.

238-closed-accepts-wait.log · SHA-256 f2d7f65ebd15b846edb62dee43adc2accb5cfbdf08b96f92e312e07734ca6ff9 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 15:09  1 user, load averages: 1.82 1.94 2.03 — Fri Nov 27 20:09:25 UTC 2026 to Fri Nov 27 20:09:25 UTC 2026 — exit status 0.

239-closed-accepts-test.log · SHA-256 f93b0494d6269cd25e5f29cc199ac08d4965247035ec3d369d5bab4612f88d81 — Full command in cited source — 15:09  up 6 days,  6:37, 1 user, load averages: 2.07 1.99 2.05 — Fri Nov 27 20:09:26 UTC 2026 to Fri Nov 27 20:09:32 UTC 2026 — exit status 1.

240-closed-accepts-restore.log · SHA-256 5cbf0314398404b9d55cf3647585eb673bde0881cbf7641473b991ef912a4c79 — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh packages/adapter-madv-surface/src/live.ts — 15:09  1 user, load averages: 2.15 2.01 2.05 — Fri Nov 27 20:09:32 UTC 2026 to Fri Nov 27 20:09:32 UTC 2026 — exit status 0.

241-break-causes.log · SHA-256 9efb334827786d2d4c8d6dd66782dbb02dfadfc3d92ac6061f6833440de1a1f1 — verify_r3_failures — 15:09  1 user, load averages: 2.29 2.04 2.06 — Fri Nov 27 20:09:38 UTC 2026 to Fri Nov 27 20:09:38 UTC 2026 — exit status 0.

242-break-ruling.log · SHA-256 52d087b76cc947eb40c2d71af2e87bf6681ec7e888bb08c692b21f1091dba6cf — ruling_on_break — 15:09  1 user, load averages: 2.35 2.06 2.07 — Fri Nov 27 20:09:45 UTC 2026 to Fri Nov 27 20:09:45 UTC 2026 — exit status 0.

243-standing-b4.log · SHA-256 05b4837926b6730363aba49d87f13b0337e32f54096040ce0f87ab658a74c560 — sed -n 31,56p tui/docs/decisions/DEC-20261023-01-standing-build-rules.md — 15:09  1 user, load averages: 2.06 2.00 2.05 — Fri Nov 27 20:09:53 UTC 2026 to Fri Nov 27 20:09:53 UTC 2026 — exit status 0.

244-preflight-diagnosis.log · SHA-256 7a45edbdfd90689e663ac6585d6d9e3e71e0ff1de26c4819a6a3bfe4ccef2798 — incident_sites — 15:10  1 user, load averages: 1.93 1.98 2.04 — Fri Nov 27 20:10:21 UTC 2026 to Fri Nov 27 20:10:21 UTC 2026 — exit status 0.

245-probe-contract.log · SHA-256 4ddd2a9dc807bd9e1caf21148effae6860f5767c2b70491a772dc58806d13d7e — read_probe — 15:10  1 user, load averages: 2.17 2.03 2.06 — Fri Nov 27 20:10:31 UTC 2026 to Fri Nov 27 20:10:31 UTC 2026 — exit status 0.

246-halt-inventory.log · SHA-256 f43b7defd4f9f42bf46c551972e11123b6432dc2141cb77b9c5feca4a7fdb666 — halt_inventory — 15:11  1 user, load averages: 5.17 2.84 2.35 — Fri Nov 27 20:11:34 UTC 2026 to Fri Nov 27 20:11:34 UTC 2026 — exit status 0.

247-halt-sources.log · SHA-256 00f6dc0f0e4afc6e7b632b86c3cae6803cbcfd7b900242c531b95161d6b17ed0 — halt_source_receipts — 15:11  1 user, load averages: 9.80 3.87 2.72 — Fri Nov 27 20:11:44 UTC 2026 to Fri Nov 27 20:11:44 UTC 2026 — exit status 0.

248-halt-diff.log · SHA-256 56a7dde3db6126c43376c1e29f8a471bc68a77bb84e832adf5eb196aa19a2b57 — git -C tui diff a7ceccbe96950b63646edc1dc6cc8590c957bf28 HEAD -- . :!docs/verification/phase-3b-m3-build-log.md :!docs/verification/phase-3b-m3-evidence.md — 15:11  1 user, load averages: 9.80 3.87 2.72 — Fri Nov 27 20:11:44 UTC 2026 to Fri Nov 27 20:11:44 UTC 2026 — exit status 0.

249-halt-hashes.log · SHA-256 cf043cec260e5c65722e4a1cbbd16fb054a9ccd678164b653c84be3cdcfd5508 — halt_hashes — 15:11  1 user, load averages: 7.85 3.73 2.69 — Fri Nov 27 20:11:58 UTC 2026 to Fri Nov 27 20:11:58 UTC 2026 — exit status 0.

250-write-halt-report.log · SHA-256 d9080127b945921ba8535bb50cbcb395bd1e1bba050d3782df2007272bb6215d — make_halt_report — 15:13  1 user, load averages: 3.71 3.36 2.63 — Fri Nov 27 20:13:06 UTC 2026 to Fri Nov 27 20:13:13 UTC 2026 — exit status 0.

251-check-halt-report.log · SHA-256 8210f8a32dc328135e388140c00bb2d6aa96c5980d1065c73f1fa2fddc76bf43 — check_halt_report — 15:13  1 user, load averages: 3.52 3.33 2.63 — Fri Nov 27 20:13:18 UTC 2026 to Fri Nov 27 20:13:18 UTC 2026 — exit status 0.

252-resume-checksums.log · SHA-256 37f633c9ec6d0e742fdf81b27b8749f17252129797ba98b2b7c62eed8e2644cc — (cd prompt && shasum -a 256 -c SHA256.txt) — 16:05  1 user, load averages: 1.85 2.12 2.72 — Fri Nov 27 21:05:57 UTC 2026 to Fri Nov 27 21:05:57 UTC 2026 — exit status 0.

253-resume-prompt.log · SHA-256 02aa55737b0d33cfb70da774faf4d886ad98d09e3b44f9ffa2443fbc9581bc7f — ls prompt — 16:05  1 user, load averages: 1.85 2.12 2.72 — Fri Nov 27 21:05:57 UTC 2026 to Fri Nov 27 21:05:57 UTC 2026 — exit status 0.

254-resume-version.log · SHA-256 34983ebe2fb1acc8800ddc48508faf13411d0707f274fe98caaed71c1df5d06d — /Users/michaeldaley/builds/codex-governed-0.167.0/node_modules/.bin/codex --version — 16:05  1 user, load averages: 1.85 2.12 2.72 — Fri Nov 27 21:05:57 UTC 2026 to Fri Nov 27 21:05:57 UTC 2026 — exit status 0.

255-resume-head.log · SHA-256 639a6509db46452bfb0e91d2da2239336c8f914341b6bc6836f256fb642aefeb — git -C tui rev-parse HEAD — 16:05  1 user, load averages: 1.85 2.12 2.72 — Fri Nov 27 21:05:57 UTC 2026 to Fri Nov 27 21:05:57 UTC 2026 — exit status 0.

256-resume-branch.log · SHA-256 dbd2e68c21368292ad3d5d95fd6a21b282872cccac4c7c1182818c79aaa8e788 — git -C tui branch --show-current — 16:05  1 user, load averages: 1.85 2.12 2.72 — Fri Nov 27 21:05:57 UTC 2026 to Fri Nov 27 21:05:57 UTC 2026 — exit status 0.

257-resume-tree.log · SHA-256 996d039b6495c803484ab5a9ed430acfb42a09ee2beb0580dc64eae1a34de481 — git -C tui status --porcelain --untracked-files=all — 16:05  1 user, load averages: 1.85 2.12 2.72 — Fri Nov 27 21:05:57 UTC 2026 to Fri Nov 27 21:05:57 UTC 2026 — exit status 0.

258-resume-stash.log · SHA-256 a716a8e1464f9fa357b733f0b39dc1f2e2d2b36ab4f23112c2afebbcbe0e52ad — git -C tui stash list — 16:05  1 user, load averages: 1.85 2.12 2.72 — Fri Nov 27 21:05:57 UTC 2026 to Fri Nov 27 21:05:57 UTC 2026 — exit status 0.

259-resume-pr.log · SHA-256 f1e30391d01a5f0cad5d853d7f87738586c6e88be791d6385458f86c52e14fba — ls -A pr — 16:05  1 user, load averages: 1.85 2.12 2.72 — Fri Nov 27 21:05:57 UTC 2026 to Fri Nov 27 21:05:57 UTC 2026 — exit status 0.

260-resume-halt-hash.log · SHA-256 2071298c79095b2c3ba5aa1c07b3270c519b8c8e3a0ccbf8fff908e7bbd4001c — shasum -a 256 pr/m3-halt-1-report.md — 16:05  1 user, load averages: 1.85 2.12 2.72 — Fri Nov 27 21:05:58 UTC 2026 to Fri Nov 27 21:05:58 UTC 2026 — exit status 0.

261-resume-logs.log · SHA-256 e6b561649cd0f49e060c35d268f7fe89ae7c07ca86e563273d7863d5362c8a98 — Full command in cited source — 16:05  1 user, load averages: 1.85 2.12 2.72 — Fri Nov 27 21:05:58 UTC 2026 to Fri Nov 27 21:05:58 UTC 2026 — exit status 0.

262-resume-last-log.log · SHA-256 2c1d79295b48863dc5e037e4e66b3774b269e9c583f438958c9b4972cfd6adeb — shasum -a 256 logs/251-check-halt-report.log — 16:05  1 user, load averages: 1.85 2.12 2.72 — Fri Nov 27 21:05:58 UTC 2026 to Fri Nov 27 21:05:58 UTC 2026 — exit status 0.

263-resume-evidence.log · SHA-256 098b3cb7c76bc2c1adeb89c5d2c6ce85d8c29f780f58041b02418445a9dc434b — ls -A evidence — 16:05  1 user, load averages: 1.85 2.12 2.72 — Fri Nov 27 21:05:58 UTC 2026 to Fri Nov 27 21:05:58 UTC 2026 — exit status 0.

264-resume-prompt-hashes.log · SHA-256 e56f905e599d62620458bee897b6ff5b1fa23cb1d043e452025bfb89987a35ef — cat prompt/SHA256.txt — 16:05  1 user, load averages: 1.85 2.12 2.72 — Fri Nov 27 21:05:58 UTC 2026 to Fri Nov 27 21:05:58 UTC 2026 — exit status 0.

265-resume-record.log · SHA-256 6b80588611465ef9878696cc31a43850705ee1f34ae655cd748f4357c3466ad1 — resume_record — 16:06  1 user, load averages: 1.93 2.13 2.71 — Fri Nov 27 21:06:12 UTC 2026 to Fri Nov 27 21:06:13 UTC 2026 — exit status 0.

266-resume-halt-report.log · SHA-256 cb67459efd90740f4c2c7cee029853f5ef685fb82dbc6e6981aaa21e7f565648 — save_resume_halt — 16:06  1 user, load averages: 2.20 2.15 2.69 — Fri Nov 27 21:06:47 UTC 2026 to Fri Nov 27 21:06:47 UTC 2026 — exit status 0.

267-resume-report-check.log · SHA-256 14348fc2009d0e0a9d26030c9ca77ace88552d642d1b449d514de31855e130f7 — Full command in cited source — 16:06  1 user, load averages: 2.20 2.15 2.69 — Fri Nov 27 21:06:47 UTC 2026 to Fri Nov 27 21:06:47 UTC 2026 — exit status 0.

268-resume-report-receipt.log · SHA-256 6bc85dcbfa61282ac074b979d30da0fbb4af2efc05ca87ed3ceb6f23e94c2a52 — shasum -a 256 pr/m3-report.md logs/266-resume-halt-report.log logs/267-resume-report-check.log — 16:06  1 user, load averages: 2.20 2.15 2.69 — Fri Nov 27 21:06:47 UTC 2026 to Fri Nov 27 21:06:47 UTC 2026 — exit status 0.

269-resume2-checksums.log · SHA-256 f497fcfa36a21009846ddf65ffcbaae21c00b21b2ec8afb0a14fd7b36a4e5bd6 — (cd prompt && shasum -a 256 -c SHA256.txt) — 17:09  1 user, load averages: 2.46 2.07 2.04 — Fri Nov 27 22:09:28 UTC 2026 to Fri Nov 27 22:09:28 UTC 2026 — exit status 0.

270-resume2-prompt.log · SHA-256 17ce233d2f1f5c459fad8b3fea23711d5c25d75b8cf83835830d39853e45f889 — ls -A prompt — 17:09  1 user, load averages: 2.46 2.07 2.04 — Fri Nov 27 22:09:28 UTC 2026 to Fri Nov 27 22:09:28 UTC 2026 — exit status 0.

271-resume2-version.log · SHA-256 14cbb4e7133598667f6bc8a7898145634f17d89b994ccbad8d54e0ac117e0f14 — /Users/michaeldaley/builds/codex-governed-0.167.0/node_modules/.bin/codex --version — 17:09  1 user, load averages: 2.46 2.07 2.04 — Fri Nov 27 22:09:28 UTC 2026 to Fri Nov 27 22:09:28 UTC 2026 — exit status 0.

272-resume2-head.log · SHA-256 3f84837a2bd903c593ec263cfd60ffe16953a3c6032348f119a15f4a14ec4378 — git -C tui rev-parse HEAD — 17:09  1 user, load averages: 2.46 2.07 2.04 — Fri Nov 27 22:09:28 UTC 2026 to Fri Nov 27 22:09:28 UTC 2026 — exit status 0.

273-resume2-branch.log · SHA-256 46fe74af82e07b9af88098ca899f6948172fd372fed60e37c991e9e8f8d49cf5 — git -C tui branch --show-current — 17:09  1 user, load averages: 2.46 2.07 2.04 — Fri Nov 27 22:09:28 UTC 2026 to Fri Nov 27 22:09:28 UTC 2026 — exit status 0.

274-resume2-tree.log · SHA-256 b0030493b30cbdeedf8e3cf2835741628dacb53fa42d066271987fa16242c435 — git -C tui status --porcelain --untracked-files=all — 17:09  1 user, load averages: 2.46 2.07 2.04 — Fri Nov 27 22:09:28 UTC 2026 to Fri Nov 27 22:09:28 UTC 2026 — exit status 0.

275-resume2-stash.log · SHA-256 a2d4eaab20243edf27874ea9fbd69d7548d1bfecd6789ee9bd32e824b071bd5d — git -C tui stash list — 17:09  1 user, load averages: 2.46 2.07 2.04 — Fri Nov 27 22:09:28 UTC 2026 to Fri Nov 27 22:09:28 UTC 2026 — exit status 0.

276-resume2-pr.log · SHA-256 896d5bb31f18982cc7d95430882cb062a731ebbf1de597e736cceceb28ea9a60 — ls -A pr — 17:09  1 user, load averages: 2.46 2.07 2.04 — Fri Nov 27 22:09:28 UTC 2026 to Fri Nov 27 22:09:28 UTC 2026 — exit status 0.

277-resume2-reports.log · SHA-256 ec50cf3e8c9d0626016ee964425aae5eca6f74142807fe8573a95caf4801bf1e — shasum -a 256 pr/m3-halt-1-report.md pr/m3-halt-2-report.md — 17:09  1 user, load averages: 2.46 2.07 2.04 — Fri Nov 27 22:09:28 UTC 2026 to Fri Nov 27 22:09:29 UTC 2026 — exit status 0.

278-resume2-logs.log · SHA-256 40f6403e58791857c6a62329d67c95d6dcd1d5e5afb2ae7ef69fbdabecd4096b — Full command in cited source — 17:09  1 user, load averages: 2.46 2.07 2.04 — Fri Nov 27 22:09:29 UTC 2026 to Fri Nov 27 22:09:29 UTC 2026 — exit status 0.

279-resume2-receipt.log · SHA-256 e26b9e1280a6b229ce28cff3db4b8dcffc65e0b2def93d5c3b97c17c58c96161 — shasum -a 256 logs/268-resume-report-receipt.log — 17:09  1 user, load averages: 2.46 2.07 2.04 — Fri Nov 27 22:09:29 UTC 2026 to Fri Nov 27 22:09:29 UTC 2026 — exit status 0.

280-resume2-evidence.log · SHA-256 59eec4261d2a9a538bbc401d879d235c6e65467cebd7db7240f014dd80c5cf63 — ls -A evidence — 17:09  1 user, load averages: 2.46 2.07 2.04 — Fri Nov 27 22:09:29 UTC 2026 to Fri Nov 27 22:09:29 UTC 2026 — exit status 0.

281-resume2-prompt-hashes.log · SHA-256 03159f28ad1289eab4c90e66bfcdd47a61f3c08df69b55f427b5c9eef388e67f — cat prompt/SHA256.txt — 17:09  1 user, load averages: 2.46 2.07 2.04 — Fri Nov 27 22:09:29 UTC 2026 to Fri Nov 27 22:09:29 UTC 2026 — exit status 0.

282-r4-entry.log · SHA-256 16d1b4571d9d0d2985e849d76dcffb6198d8107b08902c85b9cbd19f3fc2786b — read_r4 — 17:09  1 user, load averages: 3.07 2.20 2.08 — Fri Nov 27 22:09:34 UTC 2026 to Fri Nov 27 22:09:34 UTC 2026 — exit status 0.

283-r4-layout.log · SHA-256 069b3fe23b77565f0260f3adf48ec36ab3b877afb2f45223135902941354f08c — read_sizes — 17:09  1 user, load averages: 4.58 2.54 2.20 — Fri Nov 27 22:09:45 UTC 2026 to Fri Nov 27 22:09:45 UTC 2026 — exit status 0.

284-r4-client-contract.log · SHA-256 3041f44d516ef1ebcdea12829f6ebf5e8f21d4124016f3167789b8ebd105e973 — r4_contract — 17:09  1 user, load averages: 5.64 2.90 2.34 — Fri Nov 27 22:09:56 UTC 2026 to Fri Nov 27 22:09:56 UTC 2026 — exit status 0.

285-layout-api.log · SHA-256 43d2757229137bcad902bbd944bac1d6e67d77542964e04eeec8b47792e39109 — layout_api — 17:10  1 user, load averages: 5.35 2.89 2.34 — Fri Nov 27 22:10:04 UTC 2026 to Fri Nov 27 22:10:04 UTC 2026 — exit status 0.

286-r4-edit.log · SHA-256 9596bfc38e2e5296634e41b1feef94f91b476887f784a8b8f8484a1644555192 — write_r4 — 17:10  1 user, load averages: 4.28 2.95 2.39 — Fri Nov 27 22:10:53 UTC 2026 to Fri Nov 27 22:10:53 UTC 2026 — exit status 0.

287-r4-test-api.log · SHA-256 ddb174b539ee4eb4cee0a5088860b0b2742b89c8a6253ef878efd136dbb89544 — input_test_apis — 17:11  2 users, load averages: 3.94 2.90 2.38 — Fri Nov 27 22:11:00 UTC 2026 to Fri Nov 27 22:11:00 UTC 2026 — exit status 0.

288-r4-tests.log · SHA-256 ccca545736587242d5d1b1ecfe17b8ad584aad72f9f609c9b68312f23e2625d4 — r4_tests — 17:11  2 users, load averages: 2.65 2.72 2.34 — Fri Nov 27 22:11:53 UTC 2026 to Fri Nov 27 22:11:53 UTC 2026 — exit status 0.

289-r4-runtime.log · SHA-256 87ead59c8a6a11ef11fc6b0ceb5ec8d1c6165d4c21d04794a8308d32725cb162 — Full command in cited source — 17:12  up 6 days,  8:39, 2 users, load averages: 2.02 2.57 2.30 — Fri Nov 27 22:12:23 UTC 2026 to Fri Nov 27 22:12:23 UTC 2026 — exit status 0.

290-r4-types.log · SHA-256 4ea66d951de0067b77a63844bdf596825ba947304bef330d7721206461208419 — Full command in cited source — 17:12  up 6 days,  8:39, 2 users, load averages: 2.02 2.57 2.30 — Fri Nov 27 22:12:24 UTC 2026 to Fri Nov 27 22:12:27 UTC 2026 — exit status 0.

291-r4-wait.log · SHA-256 8050cf5d50385b459fc429570aefd5bdbcfe47cef91f4fbe4c32837210fe2a34 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 17:12  2 users, load averages: 2.18 2.59 2.31 — Fri Nov 27 22:12:27 UTC 2026 to Fri Nov 27 22:12:57 UTC 2026 — exit status 0.

292-r4-tests.log · SHA-256 7d4667358c7a82b44b6f7d5b496fea6094db08fc714dc1327e995782b83a69a1 — Full command in cited source — 17:13  up 6 days,  8:40, 3 users, load averages: 2.16 2.50 2.29 — Fri Nov 27 22:13:21 UTC 2026 to Fri Nov 27 22:13:30 UTC 2026 — exit status 1.

293-r4-load-review.log · SHA-256 a4a0d1111dd59fd4ffadbecdd7d90ad4071b73117ec78a4fdc2b74ead187c6c1 — r4_run_ruling — 17:13  3 users, load averages: 2.41 2.53 2.30 — Fri Nov 27 22:13:41 UTC 2026 to Fri Nov 27 22:13:41 UTC 2026 — exit status 0.

294-r4-halt-state.log · SHA-256 d4ae438073b709c86f613a475898ec660cf8a4d1849c193196ef12927bf0f552 — halt_r4_inputs — 17:13  4 users, load averages: 2.28 2.50 2.30 — Fri Nov 27 22:13:52 UTC 2026 to Fri Nov 27 22:13:52 UTC 2026 — exit status 0.

295-r4-halt-input.log · SHA-256 fcfe81587d1c63b4c1ad5bdeb045ca065f24d289faa8ec04dbd15db59fcc7e17 — report_mock_keys — 17:13  3 users, load averages: 2.42 2.53 2.31 — Fri Nov 27 22:13:59 UTC 2026 to Fri Nov 27 22:13:59 UTC 2026 — exit status 0.

296-r4-halt-report.log · SHA-256 1403f7b655fbb11c4fd6d07b530918fffd4350e136e186acf38f123b41c58abf — write_r4_halt — 17:14  4 users, load averages: 1.99 2.42 2.28 — Fri Nov 27 22:14:45 UTC 2026 to Fri Nov 27 22:14:45 UTC 2026 — exit status 0.

297-r4-report-format.log · SHA-256 ff32b36cf8052b31850f76e282e5532e4b5258eda89a521cd32b37ccad1144c9 — Full command in cited source — 17:14  4 users, load averages: 1.99 2.42 2.28 — Fri Nov 27 22:14:45 UTC 2026 to Fri Nov 27 22:14:45 UTC 2026 — exit status 0.

298-r4-report-receipt.log · SHA-256 51b17dd376b91d337a27ade7353829199594804cff1da5a7ac78c324d99a6f9e — shasum -a 256 pr/m3-report.md logs/296-r4-halt-report.log logs/297-r4-report-format.log — 17:14  4 users, load averages: 1.99 2.42 2.28 — Fri Nov 27 22:14:45 UTC 2026 to Fri Nov 27 22:14:45 UTC 2026 — exit status 0.

299-resume3-checksums.log · SHA-256 806285d6ce8977bbcfa4f0a2790131f66f482898fc0abc492628308c9ae0281f — (cd prompt && shasum -a 256 -c SHA256.txt) — 17:58  6 users, load averages: 2.23 2.63 2.28 — Fri Nov 27 22:58:25 UTC 2026 to Fri Nov 27 22:58:25 UTC 2026 — exit status 0.

300-resume3-prompt.log · SHA-256 3503f432e3357e32747aa048659a2a9192ba4b66346e036b84e6716cb59153a5 — ls -A prompt — 17:58  6 users, load averages: 2.23 2.63 2.28 — Fri Nov 27 22:58:25 UTC 2026 to Fri Nov 27 22:58:25 UTC 2026 — exit status 0.

301-resume3-version.log · SHA-256 e96f02b7d7302d70737ceaca1f40f310152d29d7b2a45fcd4bdf0681fb4d79ec — /Users/michaeldaley/builds/codex-governed-0.167.0/node_modules/.bin/codex --version — 17:58  6 users, load averages: 2.23 2.63 2.28 — Fri Nov 27 22:58:25 UTC 2026 to Fri Nov 27 22:58:25 UTC 2026 — exit status 0.

302-resume3-head.log · SHA-256 f0fa2bc7128df11c12ad22014539fb36e294e51351f36e7385ffb98ca3817fb2 — git -C tui rev-parse HEAD — 17:58  6 users, load averages: 2.23 2.63 2.28 — Fri Nov 27 22:58:25 UTC 2026 to Fri Nov 27 22:58:25 UTC 2026 — exit status 0.

303-resume3-branch.log · SHA-256 7f776e74a3bd3d9e797653fc298b96eaaf1fd8d925a2d32240e92aa3830fe4a8 — git -C tui branch --show-current — 17:58  6 users, load averages: 2.23 2.63 2.28 — Fri Nov 27 22:58:25 UTC 2026 to Fri Nov 27 22:58:25 UTC 2026 — exit status 0.

304-resume3-index.log · SHA-256 ee0ba26eb48f5bc4763d24a7dfa1f123d65a57c36da7b4f6d1dd78eba42e876b — git -C tui diff --cached --name-status — 17:58  6 users, load averages: 2.23 2.63 2.28 — Fri Nov 27 22:58:25 UTC 2026 to Fri Nov 27 22:58:25 UTC 2026 — exit status 0.

305-resume3-stash.log · SHA-256 964c9c2ef28ee81064036b9e6ceb60667e8ad9dce597c301e5d527076785b632 — git -C tui stash list — 17:58  6 users, load averages: 2.23 2.63 2.28 — Fri Nov 27 22:58:25 UTC 2026 to Fri Nov 27 22:58:25 UTC 2026 — exit status 0.

306-resume3-tree.log · SHA-256 422c38f38e970cb0fb540b47c88296fec3f19e39cf47edff622c234366f83d89 — git -C tui status --porcelain --untracked-files=all — 17:58  6 users, load averages: 2.23 2.63 2.28 — Fri Nov 27 22:58:26 UTC 2026 to Fri Nov 27 22:58:26 UTC 2026 — exit status 0.

307-resume3-files.log · SHA-256 dfa258107f97c2928c1d91d4e58e37921a9df83f5876eab30bf4a425a3d538b5 — Full command in cited source — 17:58  6 users, load averages: 2.23 2.63 2.28 — Fri Nov 27 22:58:26 UTC 2026 to Fri Nov 27 22:58:26 UTC 2026 — exit status 0.

308-resume3-pr.log · SHA-256 4552d9e6ed79bc2fe29bda42930adae726d9a36fd134f56fbce21ecbdf5266d4 — ls -A pr — 17:58  6 users, load averages: 2.23 2.63 2.28 — Fri Nov 27 22:58:26 UTC 2026 to Fri Nov 27 22:58:26 UTC 2026 — exit status 0.

309-resume3-reports.log · SHA-256 1c7f564a6231f47f87e18b47152b05238f04f11ef22698e72d04fba48e463a1b — shasum -a 256 pr/m3-halt-1-report.md pr/m3-halt-2-report.md pr/m3-halt-3-report.md — 17:58  6 users, load averages: 2.23 2.63 2.28 — Fri Nov 27 22:58:26 UTC 2026 to Fri Nov 27 22:58:26 UTC 2026 — exit status 0.

310-resume3-logs.log · SHA-256 a50d69497b811eb093a29f3984ac0c3a2436944bb88e014f9b93c7376827d5f7 — Full command in cited source — 17:58  6 users, load averages: 2.23 2.63 2.28 — Fri Nov 27 22:58:26 UTC 2026 to Fri Nov 27 22:58:26 UTC 2026 — exit status 0.

311-resume3-receipt.log · SHA-256 776762f10e4add224372b5715c4ea3b4d89add07a294438abeb222d42407bd79 — shasum -a 256 logs/298-r4-report-receipt.log — 17:58  6 users, load averages: 2.23 2.63 2.28 — Fri Nov 27 22:58:26 UTC 2026 to Fri Nov 27 22:58:26 UTC 2026 — exit status 0.

312-resume3-evidence.log · SHA-256 ab62cd5fcc1f9002d53de94812c1f8202e889ceb973e79fca678b0c0eee84b72 — ls -A evidence — 17:58  6 users, load averages: 2.05 2.59 2.27 — Fri Nov 27 22:58:26 UTC 2026 to Fri Nov 27 22:58:26 UTC 2026 — exit status 0.

313-resume3-prompt-hashes.log · SHA-256 f7e0240decdf0bfe8c03ef5ef40464e350960f120b59d40d944073eed65752cf — cat prompt/SHA256.txt — 17:58  6 users, load averages: 2.05 2.59 2.27 — Fri Nov 27 22:58:26 UTC 2026 to Fri Nov 27 22:58:26 UTC 2026 — exit status 0.

314-correct-r4.log · SHA-256 1184a018527745d2821b71fe374825768e3db55559faced006caee522db9df05 — correct_r4 — 17:58  6 users, load averages: 1.89 2.53 2.25 — Fri Nov 27 22:58:41 UTC 2026 to Fri Nov 27 22:58:41 UTC 2026 — exit status 0.

315-r4-resume-runtime.log · SHA-256 af0b3a27b8a8da24274d98e7e60593ae83615d6b8d742a5d028fd9c05949f6f0 — Full command in cited source — 18:01  up 6 days,  9:29, 6 users, load averages: 1.93 2.21 2.16 — Fri Nov 27 23:01:42 UTC 2026 to Fri Nov 27 23:01:42 UTC 2026 — exit status 0.

316-r4-corrected-wait.log · SHA-256 3b14dee2c83a9e550ebdde7a75d1944e3f57605bd58e14fa1c8af1a53ef10e38 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:01  up 6 days,  9:29, 6 users, load averages: 1.93 2.21 2.16 — Fri Nov 27 23:01:43 UTC 2026 to Fri Nov 27 23:01:43 UTC 2026 — exit status 0.

317-r4-corrected.log · SHA-256 e3c933dd2e1efe029367765e8d840b587234e6a3d4bcaa1cb99cfb2764c67d3e — Full command in cited source — 18:01  up 6 days,  9:29, 6 users, load averages: 1.93 2.21 2.16 — Fri Nov 27 23:01:43 UTC 2026 to Fri Nov 27 23:01:47 UTC 2026 — exit status 0.

318-r4-message.log · SHA-256 fed1ca91985221cee44c6c3697f2058a2a5f705897a73f636d4bd949dc131186 — r4_message — 18:02  6 users, load averages: 2.93 2.41 2.23 — Fri Nov 27 23:02:00 UTC 2026 to Fri Nov 27 23:02:00 UTC 2026 — exit status 0.

319-r4-message-check.log · SHA-256 60559420fcadd645f00faad5f2cf1676dd2b0024477f4777b3c67213970e78c1 — zsh /private/tmp/m3-build.U6WP3RU0/check-message.zsh /private/tmp/m3-build.U6WP3RU0/message-5 — 18:02  6 users, load averages: 2.93 2.41 2.23 — Fri Nov 27 23:02:00 UTC 2026 to Fri Nov 27 23:02:00 UTC 2026 — exit status 0.

320-r4-stage.log · SHA-256 45b48544fff516f7f7f206d7133bff072d6a205ce91f97e52544d2116682aa9b — Full command in cited source — 18:02  6 users, load averages: 2.93 2.41 2.23 — Fri Nov 27 23:02:00 UTC 2026 to Fri Nov 27 23:02:00 UTC 2026 — exit status 0.

321-r4-commit.log · SHA-256 400ed1755cc6f43779e7543708850dfc283b0f82215b1706be6e1e0f8ebc4d05 — git -C tui commit -F /private/tmp/m3-build.U6WP3RU0/message-5 — 18:02  6 users, load averages: 3.18 2.47 2.25 — Fri Nov 27 23:02:06 UTC 2026 to Fri Nov 27 23:02:06 UTC 2026 — exit status 0.

322-r4-oracles.log · SHA-256 2e1da13195171ef09dbabc81355392e0399369125c3b79003be4f99a2f56a55b — r4_oracles — 18:02  6 users, load averages: 3.18 2.47 2.25 — Fri Nov 27 23:02:06 UTC 2026 to Fri Nov 27 23:02:06 UTC 2026 — exit status 0.

323-assertion-checker.log · SHA-256 3ea3460d28a01aefe635f7ca3c53390010baebcb3f556ae07b9b8e2dfe330d43 — review_script — 18:02  6 users, load averages: 3.51 2.58 2.29 — Fri Nov 27 23:02:19 UTC 2026 to Fri Nov 27 23:02:19 UTC 2026 — exit status 0.

324-before-enter-edit.log · SHA-256 bf9b61fbeb23c1706a2ea1a22a0cca59ca1dce154fc1fb6ecbd6e45a1409792f — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py apps/madbridge/src/tui/live/line-buffer.ts 'for (const ch of key) this.before.push(ch);' 'for (const ch of key) this.before.push(ch); void this.command({ line: key });' — 18:02  6 users, load averages: 3.24 2.59 2.31 — Fri Nov 27 23:02:47 UTC 2026 to Fri Nov 27 23:02:47 UTC 2026 — exit status 0.

325-before-enter-diff.log · SHA-256 99286fb9cf233bf3c008faa44712349a540b3e6545de46fbfad790d8b2ed7a85 — git -C tui diff -- apps/madbridge/src/tui/live/line-buffer.ts — 18:02  6 users, load averages: 3.62 2.68 2.34 — Fri Nov 27 23:02:47 UTC 2026 to Fri Nov 27 23:02:47 UTC 2026 — exit status 0.

326-before-enter-runtime.log · SHA-256 efdc8ce1002abc291ef1654ff4f0962382093648bc478b5f2dc4b2350b1592fc — Full command in cited source — 18:02  up 6 days,  9:30, 6 users, load averages: 3.62 2.68 2.34 — Fri Nov 27 23:02:51 UTC 2026 to Fri Nov 27 23:02:52 UTC 2026 — exit status 0.

327-before-enter-wait.log · SHA-256 d4769d8bd7b925e10ae74eed76a61659d65ab4b37850c596e85d719a14d9622e — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:02  up 6 days,  9:30, 6 users, load averages: 3.33 2.64 2.33 — Fri Nov 27 23:02:53 UTC 2026 to Fri Nov 27 23:06:54 UTC 2026 — exit status 0.

328-before-enter-test.log · SHA-256 e5ec9733e3635fd7847b687d89242d7e8596340b412c28ed5e18eadf758a0ad9 — Full command in cited source — 18:06  up 6 days,  9:34, 6 users, load averages: 1.88 2.35 2.28 — Fri Nov 27 23:06:54 UTC 2026 to Fri Nov 27 23:06:55 UTC 2026 — exit status 1.

329-before-enter-restore.log · SHA-256 f45a155a7a74b057cee1467ca47bffd368356d94d54e63b106e39357a5cacef8 — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh apps/madbridge/src/tui/live/line-buffer.ts — 18:06  6 users, load averages: 1.88 2.35 2.28 — Fri Nov 27 23:06:55 UTC 2026 to Fri Nov 27 23:06:55 UTC 2026 — exit status 0.

330-before-enter-proof.log · SHA-256 b296d67249d5f41cc7d9c052c0ffe14fe9df8274dafde692002b4e34f530d4de — python3 /private/tmp/m3-build.U6WP3RU0/assertion.py logs/328-before-enter-test.log test/phase3b/line-input.test.tsx 'only Enter submits one encoded focused line and other focus sends nothing' 16 — 18:06  6 users, load averages: 1.88 2.35 2.28 — Fri Nov 27 23:06:55 UTC 2026 to Fri Nov 27 23:06:55 UTC 2026 — exit status 0.

331-empty-line-edit.log · SHA-256 064d8fbb1cb8dcf98ac669333c5a71b4da64b411fc641f7f2a89a60b5738245f — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py apps/madbridge/src/tui/live/line-buffer.ts 'if (line.length > 0) void this.command({ line });' 'void this.command({ line });' — 18:06  6 users, load averages: 1.88 2.35 2.28 — Fri Nov 27 23:06:55 UTC 2026 to Fri Nov 27 23:06:55 UTC 2026 — exit status 0.

332-empty-line-diff.log · SHA-256 cde082103c351fb9c903c8a3ca43b398212dff4c4ae8754a31e04a6b32b3c0a4 — git -C tui diff -- apps/madbridge/src/tui/live/line-buffer.ts — 18:06  6 users, load averages: 1.88 2.35 2.28 — Fri Nov 27 23:06:56 UTC 2026 to Fri Nov 27 23:06:56 UTC 2026 — exit status 0.

333-empty-line-runtime.log · SHA-256 5ca8e4bfa0a23ddf581fa8e5c9cceb2873d076262850d4912a1772ddeca4e651 — Full command in cited source — 18:14  up 6 days,  9:41, 6 users, load averages: 1.61 1.83 2.04 — Fri Nov 27 23:14:11 UTC 2026 to Fri Nov 27 23:14:11 UTC 2026 — exit status 0.

334-empty-line-wait.log · SHA-256 3d471f0f6b3d692a0209532563517ac453feb83ac27972be2fe984e535b9e7df — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:14  up 6 days,  9:41, 6 users, load averages: 1.88 1.89 2.06 — Fri Nov 27 23:14:12 UTC 2026 to Fri Nov 27 23:14:12 UTC 2026 — exit status 0.

335-empty-line-test.log · SHA-256 51ade4b3bb7d18e3396a683615ae1218a59b8f92f289c5b2438fa92a97fef0c4 — Full command in cited source — 18:14  up 6 days,  9:41, 6 users, load averages: 1.88 1.89 2.06 — Fri Nov 27 23:14:12 UTC 2026 to Fri Nov 27 23:14:14 UTC 2026 — exit status 1.

336-empty-line-restore.log · SHA-256 d5ee04ff0f32c8558495355d9426261047ae0b0827aeadb0f89e919ad629e5e7 — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh apps/madbridge/src/tui/live/line-buffer.ts — 18:14  6 users, load averages: 1.88 1.89 2.06 — Fri Nov 27 23:14:14 UTC 2026 to Fri Nov 27 23:14:14 UTC 2026 — exit status 0.

337-empty-line-proof.log · SHA-256 e087ea1725639cf94643e0ac07ae7f7724843772b7d03e464779cf268fa9d7d9 — python3 /private/tmp/m3-build.U6WP3RU0/assertion.py logs/335-empty-line-test.log test/phase3b/line-input.test.tsx 'only Enter submits one encoded focused line and other focus sends nothing' 31 — 18:14  6 users, load averages: 1.88 1.89 2.06 — Fri Nov 27 23:14:14 UTC 2026 to Fri Nov 27 23:14:14 UTC 2026 — exit status 0.

338-wrong-resize-edit.log · SHA-256 93d3b14dd31fb4c7cb5bb1c78cef70cb1d8147ba1028b20b667b4f2f91d33283 — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py apps/madbridge/src/tui/live/line-buffer.ts 'if ("size" in action && snapshot.activeWriterExecutionId !== id) return;' '' — 18:14  6 users, load averages: 1.88 1.89 2.06 — Fri Nov 27 23:14:14 UTC 2026 to Fri Nov 27 23:14:14 UTC 2026 — exit status 0.

339-wrong-resize-diff.log · SHA-256 553f5cf5fa9dc3cda1067f44953d491a8feded55c8c2db9b482633f70e7ab6a6 — git -C tui diff -- apps/madbridge/src/tui/live/line-buffer.ts — 18:14  6 users, load averages: 1.88 1.89 2.06 — Fri Nov 27 23:14:15 UTC 2026 to Fri Nov 27 23:14:15 UTC 2026 — exit status 0.

340-wrong-resize-runtime.log · SHA-256 e59ab07e344b4aed9802bec68551e5f186e2adef9293f35ee88573ba94643332 — Full command in cited source — 18:14  up 6 days,  9:41, 6 users, load averages: 1.88 1.89 2.06 — Fri Nov 27 23:14:16 UTC 2026 to Fri Nov 27 23:14:16 UTC 2026 — exit status 0.

341-wrong-resize-wait.log · SHA-256 59d0882b5e3a33a1bad858f6bf2497ad8dd613278892d925a8bdd9a48b0e0f81 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:14  up 6 days,  9:41, 6 users, load averages: 1.97 1.90 2.07 — Fri Nov 27 23:14:17 UTC 2026 to Fri Nov 27 23:14:17 UTC 2026 — exit status 0.

342-wrong-resize-test.log · SHA-256 a368b193b34e0092cb2d07c6e20a31d5f2a487b9fd3ec9a5173dd236295e7a42 — Full command in cited source — 18:14  up 6 days,  9:41, 6 users, load averages: 1.97 1.90 2.07 — Fri Nov 27 23:14:17 UTC 2026 to Fri Nov 27 23:14:18 UTC 2026 — exit status 1.

343-wrong-resize-restore.log · SHA-256 d935ccfc76e5d592b9111a938da4ed1a43819a5704da792e806307a82a32aaf5 — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh apps/madbridge/src/tui/live/line-buffer.ts — 18:14  6 users, load averages: 1.97 1.90 2.07 — Fri Nov 27 23:14:19 UTC 2026 to Fri Nov 27 23:14:19 UTC 2026 — exit status 0.

344-wrong-resize-proof.log · SHA-256 cda5bc25c62a33cebb738e1d39ae87183653a7926ee079bbfe11a7449512fc99 — python3 /private/tmp/m3-build.U6WP3RU0/assertion.py logs/342-wrong-resize-test.log test/phase3b/line-input.test.tsx 'only the active focused writer resizes at a changed pane size' 55,68 — 18:14  6 users, load averages: 1.97 1.90 2.07 — Fri Nov 27 23:14:19 UTC 2026 to Fri Nov 27 23:14:19 UTC 2026 — exit status 0.

345-raw-line-edit.log · SHA-256 d56c49d2beaff40fe6b9bc6d68ba7ef62c0310d6bdb7612469ebfc4fbbb672b0 — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py apps/madbridge/src/tui/live/line-buffer.ts 'new TextEncoder().encode(encoded)' 'new TextEncoder().encode(action.line)' — 18:14  6 users, load averages: 1.97 1.90 2.07 — Fri Nov 27 23:14:19 UTC 2026 to Fri Nov 27 23:14:19 UTC 2026 — exit status 0.

346-raw-line-diff.log · SHA-256 7c600e5652ffa3313010a87b9033f61a715054c23282f7f3345ea3e3dac1ebab — git -C tui diff -- apps/madbridge/src/tui/live/line-buffer.ts — 18:14  6 users, load averages: 1.97 1.90 2.07 — Fri Nov 27 23:14:19 UTC 2026 to Fri Nov 27 23:14:19 UTC 2026 — exit status 0.

347-raw-line-runtime.log · SHA-256 9cfb31080e879af96df8a87a628b74be45fda428187cb05b8c82ec7cdf070488 — Full command in cited source — 18:14  up 6 days,  9:41, 6 users, load averages: 1.97 1.90 2.07 — Fri Nov 27 23:14:20 UTC 2026 to Fri Nov 27 23:14:20 UTC 2026 — exit status 0.

348-raw-line-wait.log · SHA-256 1b83ef7b63cd26b1905d9b66b4ab15dc2dc2dbfbcf0adf6c93db3a5094b4e58f — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:14  up 6 days,  9:41, 6 users, load averages: 1.97 1.90 2.07 — Fri Nov 27 23:14:21 UTC 2026 to Fri Nov 27 23:14:21 UTC 2026 — exit status 0.

349-raw-line-test.log · SHA-256 0416c2d94635deac36e71ac6e4b8403473f70ac2610d19f0cc80c5e6c57d6c1e — Full command in cited source — 18:14  up 6 days,  9:41, 6 users, load averages: 1.97 1.90 2.07 — Fri Nov 27 23:14:22 UTC 2026 to Fri Nov 27 23:14:26 UTC 2026 — exit status 1.

350-raw-line-restore.log · SHA-256 7cabf6d3f4759c3453fb4446d0086704712a6123f7e15b593c5b7802828030d3 — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh apps/madbridge/src/tui/live/line-buffer.ts — 18:14  6 users, load averages: 2.13 1.94 2.08 — Fri Nov 27 23:14:26 UTC 2026 to Fri Nov 27 23:14:26 UTC 2026 — exit status 0.

351-raw-line-proof.log · SHA-256 2a7cf589f972cbe626546854ae0e459eb6d8f64c28ac92e139da11901f808e8f — python3 /private/tmp/m3-build.U6WP3RU0/assertion.py logs/349-raw-line-test.log test/phase3b/usable-input.test.tsx 'each submitted stream-json line produces a checked stand-in response in its pane' 11 — 18:14  6 users, load averages: 2.13 1.94 2.08 — Fri Nov 27 23:14:27 UTC 2026 to Fri Nov 27 23:14:27 UTC 2026 — exit status 0.

352-refusal-retry-edit.log · SHA-256 50edc6ad97e02e11706ce5616ca0ca5c0497deabc1a8ab2477683fa1cc4553f4 — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py apps/madbridge/src/tui/live/line-buffer.ts 'const result = await this.client.request(command);' 'const result = await this.client.request(command); if (!result.ok) await this.client.request(command);' — 18:14  6 users, load averages: 2.13 1.94 2.08 — Fri Nov 27 23:14:27 UTC 2026 to Fri Nov 27 23:14:27 UTC 2026 — exit status 0.

353-refusal-retry-diff.log · SHA-256 a9c3b283d771dd61e50cb36f26558cf7e1be0df9db8cd92f3cd5ee03184206ac — git -C tui diff -- apps/madbridge/src/tui/live/line-buffer.ts — 18:14  6 users, load averages: 1.96 1.91 2.06 — Fri Nov 27 23:14:27 UTC 2026 to Fri Nov 27 23:14:27 UTC 2026 — exit status 0.

354-refusal-retry-runtime.log · SHA-256 657aaa7ce37ad42f0e5dcece6ee6a6e2b93cbdd69d66fd2abd6c1fa3a5dc30fb — Full command in cited source — 18:14  up 6 days,  9:42, 6 users, load averages: 1.96 1.91 2.06 — Fri Nov 27 23:14:28 UTC 2026 to Fri Nov 27 23:14:28 UTC 2026 — exit status 0.

355-refusal-retry-wait.log · SHA-256 b53e9b775912146e228fad2505316c76d8f28007dc7acd484c5cf67bc6eea0bd — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:14  up 6 days,  9:42, 6 users, load averages: 1.96 1.91 2.06 — Fri Nov 27 23:14:30 UTC 2026 to Fri Nov 27 23:14:30 UTC 2026 — exit status 0.

356-refusal-retry-test.log · SHA-256 4e94628e7a1f6e4fb707375133761764b7f67adb2fc162af3d4f3a927a59f95c — Full command in cited source — 18:14  up 6 days,  9:42, 6 users, load averages: 1.96 1.91 2.06 — Fri Nov 27 23:14:30 UTC 2026 to Fri Nov 27 23:14:31 UTC 2026 — exit status 1.

357-refusal-retry-restore.log · SHA-256 3521a88c37312b8d56c223c905c420a5ddb36c99ff47df3401fda7c52e1b4ab3 — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh apps/madbridge/src/tui/live/line-buffer.ts — 18:14  6 users, load averages: 1.96 1.91 2.06 — Fri Nov 27 23:14:31 UTC 2026 to Fri Nov 27 23:14:32 UTC 2026 — exit status 0.

358-refusal-retry-proof.log · SHA-256 8516802365257feb3116331a2f54e2be2d2a10fe7ebdce77ec0c0ef265091f10 — python3 /private/tmp/m3-build.U6WP3RU0/assertion.py logs/356-refusal-retry-test.log test/phase3b/line-input.test.tsx 'each refusal is shown once without retry and no token sends nothing' 95 — 18:14  6 users, load averages: 1.96 1.91 2.06 — Fri Nov 27 23:14:32 UTC 2026 to Fri Nov 27 23:14:32 UTC 2026 — exit status 0.

359-false-success-edit.log · SHA-256 63125754b1c6eca9825bbb449ba44799b6706200d94a0559d383f03b2f73d63b — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py apps/madbridge/src/tui/live/line-buffer.ts 'result.ok ? "" : result.error.replaceAll("_", " ").toUpperCase()' 'result.ok ? "" : "ACCEPTED"' — 18:14  6 users, load averages: 1.96 1.91 2.06 — Fri Nov 27 23:14:32 UTC 2026 to Fri Nov 27 23:14:32 UTC 2026 — exit status 0.

360-false-success-diff.log · SHA-256 03ea91c403a97ce6879b8b1c8ba9709d65948a15ba7ec28ab4b498ae0a26356a — git -C tui diff -- apps/madbridge/src/tui/live/line-buffer.ts — 18:14  6 users, load averages: 1.88 1.89 2.06 — Fri Nov 27 23:14:32 UTC 2026 to Fri Nov 27 23:14:32 UTC 2026 — exit status 0.

361-false-success-runtime.log · SHA-256 13ba106a91e24d2fa41387418c5b67cff3b450bc2b3098f94374914cac95fef2 — Full command in cited source — 18:14  up 6 days,  9:42, 6 users, load averages: 1.88 1.89 2.06 — Fri Nov 27 23:14:35 UTC 2026 to Fri Nov 27 23:14:35 UTC 2026 — exit status 0.

362-false-success-wait.log · SHA-256 ff6268dfb1684fd3a9ae2de5ad042907fc99a0475658d541ad09488f1a55f07c — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:14  up 6 days,  9:42, 6 users, load averages: 1.88 1.89 2.06 — Fri Nov 27 23:14:36 UTC 2026 to Fri Nov 27 23:14:36 UTC 2026 — exit status 0.

363-false-success-test.log · SHA-256 ce70af880a17bdd5981f8273f142ad03869f7891d0a6fb3b7b4805cbcdf89902 — Full command in cited source — 18:14  up 6 days,  9:42, 6 users, load averages: 1.88 1.89 2.06 — Fri Nov 27 23:14:36 UTC 2026 to Fri Nov 27 23:14:37 UTC 2026 — exit status 1.

364-false-success-restore.log · SHA-256 afd591ecd68ae1a860fb13c0d0e4c06e30f5c9d41c57671382f7ceb218a757f8 — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh apps/madbridge/src/tui/live/line-buffer.ts — 18:14  6 users, load averages: 1.97 1.91 2.06 — Fri Nov 27 23:14:37 UTC 2026 to Fri Nov 27 23:14:37 UTC 2026 — exit status 0.

365-false-success-proof.log · SHA-256 8abf58015a2364a32b785c49c424753057213e02304405758266318640c2c666 — python3 /private/tmp/m3-build.U6WP3RU0/assertion.py logs/363-false-success-test.log test/phase3b/line-input.test.tsx 'each refusal is shown once without retry and no token sends nothing' 94 — 18:14  6 users, load averages: 1.97 1.91 2.06 — Fri Nov 27 23:14:37 UTC 2026 to Fri Nov 27 23:14:37 UTC 2026 — exit status 0.

366-unauthorized-word-edit.log · SHA-256 32ad44c62e9b17ef716768b80d446984a4805b3394bc424e64067139051941cc — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py apps/madbridge/src/tui/live/line-buffer.ts 'result.ok ? "" : result.error.replaceAll("_", " ").toUpperCase()' 'result.ok ? "" : result.error === "unauthorized" ? "ACCEPTED" : result.error.replaceAll("_", " ").toUpperCase()' — 18:14  6 users, load averages: 1.97 1.91 2.06 — Fri Nov 27 23:14:38 UTC 2026 to Fri Nov 27 23:14:38 UTC 2026 — exit status 0.

367-unauthorized-word-diff.log · SHA-256 05024b0ff034325b39814b7bb9aeb51ce9e59beed30ec9a035e33ab8fe4c8046 — git -C tui diff -- apps/madbridge/src/tui/live/line-buffer.ts — 18:14  6 users, load averages: 1.97 1.91 2.06 — Fri Nov 27 23:14:38 UTC 2026 to Fri Nov 27 23:14:38 UTC 2026 — exit status 0.

368-unauthorized-word-runtime.log · SHA-256 09928895980fd214017d1b6108163231d36709db416f328d572104906ad99177 — Full command in cited source — 18:14  up 6 days,  9:42, 6 users, load averages: 1.97 1.91 2.06 — Fri Nov 27 23:14:39 UTC 2026 to Fri Nov 27 23:14:39 UTC 2026 — exit status 0.

369-unauthorized-word-wait.log · SHA-256 0e6e2a3cf0fefecd456515516a6a405e692abb1dd18229d8077a8c0b43fc8041 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:14  up 6 days,  9:42, 6 users, load averages: 1.97 1.91 2.06 — Fri Nov 27 23:14:41 UTC 2026 to Fri Nov 27 23:14:41 UTC 2026 — exit status 0.

370-unauthorized-word-test.log · SHA-256 7debac0a9176cb5a4e363cd648f5b1ec69aee8e1a4d77a162b812ae1aaa83e7c — Full command in cited source — 18:14  up 6 days,  9:42, 6 users, load averages: 1.97 1.91 2.06 — Fri Nov 27 23:14:41 UTC 2026 to Fri Nov 27 23:14:46 UTC 2026 — exit status 1.

371-unauthorized-word-restore.log · SHA-256 8cc0a0d8d76fc68b2061114cadf2396ddc7d8240e187ea12aad24005e93f7109 — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh apps/madbridge/src/tui/live/line-buffer.ts — 18:14  6 users, load averages: 1.90 1.89 2.06 — Fri Nov 27 23:14:46 UTC 2026 to Fri Nov 27 23:14:46 UTC 2026 — exit status 0.

372-unauthorized-word-proof.log · SHA-256 80b990b7015684b6f98ee4019f6d27cad73475b87face007643189a482b7562d — python3 /private/tmp/m3-build.U6WP3RU0/assertion.py logs/370-unauthorized-word-test.log test/phase3b/usable-input.test.tsx 'a nonwriter submission is unauthorized in its pane and never reaches the child' 28 — 18:14  6 users, load averages: 1.90 1.89 2.06 — Fri Nov 27 23:14:46 UTC 2026 to Fri Nov 27 23:14:46 UTC 2026 — exit status 0.

373-r5-paths.log · SHA-256 88f9d23a0b655e74f97d51cbe70e6bac1db32db124417a5dbf3bfcc0b4b90a53 — r5_targets — 18:14  6 users, load averages: 2.14 1.94 2.07 — Fri Nov 27 23:14:52 UTC 2026 to Fri Nov 27 23:14:52 UTC 2026 — exit status 0.

374-r5-values.log · SHA-256 82a2434a7fbda6da9a0e972bcfb94d8ab12434154a461c5f761a2e1cef501aa0 — r5_values — 18:14  6 users, load averages: 2.19 1.96 2.08 — Fri Nov 27 23:14:59 UTC 2026 to Fri Nov 27 23:14:59 UTC 2026 — exit status 0.

375-r5-types.log · SHA-256 f8d78353db533303bfc41ed6fa89869a8b75bc6974c9acc55586d66d73bb59b0 — r5_types — 18:15  6 users, load averages: 2.01 1.93 2.07 — Fri Nov 27 23:15:13 UTC 2026 to Fri Nov 27 23:15:13 UTC 2026 — exit status 0.

376-r5-focus-types.log · SHA-256 6a00989b7a2f28c1aab2bea22f31f0acd9c3c813cb0747a2288b78c9a9531e98 — r5_inventory — 18:15  6 users, load averages: 2.14 1.97 2.08 — Fri Nov 27 23:15:25 UTC 2026 to Fri Nov 27 23:15:25 UTC 2026 — exit status 0.

377-r5-fixtures.log · SHA-256 ebced48a1f848f83744ee6ecd5d96866a34e6a3277cd5d834ca092d0d5269d0e — r5_fixtures — 18:15  6 users, load averages: 1.89 1.92 2.06 — Fri Nov 27 23:15:34 UTC 2026 to Fri Nov 27 23:15:34 UTC 2026 — exit status 0.

378-r5-compatibility.log · SHA-256 5e88e5a760f18e422ae34c0438b731c9ce72a0000123c4c9e2acac5fb50cfbaf — r5_display — 18:15  6 users, load averages: 1.69 1.87 2.04 — Fri Nov 27 23:15:51 UTC 2026 to Fri Nov 27 23:15:51 UTC 2026 — exit status 0.

379-r5-edits.log · SHA-256 c50959183609094d52c18ec5bccf7c5df4cb3e06fb4856d773457c223bfc21a5 — write_r5 — 18:16  6 users, load averages: 1.51 1.81 2.01 — Fri Nov 27 23:16:24 UTC 2026 to Fri Nov 27 23:16:24 UTC 2026 — exit status 0.

380-r5-review.log · SHA-256 3178e2bcefb073e93945bcca036e175297de3f04dc07c27583ad54fb3a68c3f5 — resume_r5_review — 18:18  6 users, load averages: 2.43 2.04 2.07 — Fri Nov 27 23:18:26 UTC 2026 to Fri Nov 27 23:18:26 UTC 2026 — exit status 0.

381-r5-runtime.log · SHA-256 ea5e99137cf202dd269ab1087f5d62846f39f876b562fd7657ca711d5a09f607 — Full command in cited source — 18:21  up 6 days,  9:48, 6 users, load averages: 2.32 1.98 2.02 — Fri Nov 27 23:21:19 UTC 2026 to Fri Nov 27 23:21:19 UTC 2026 — exit status 0.

382-r5-typecheck.log · SHA-256 b09b19068c6e3a4c94f8f0b7506b9aadf5ed277a1f738ee9ec13f2ec60af9da4 — Full command in cited source — 18:21  up 6 days,  9:48, 6 users, load averages: 2.32 1.98 2.02 — Fri Nov 27 23:21:20 UTC 2026 to Fri Nov 27 23:21:24 UTC 2026 — exit status 0.

383-r5-wait.log · SHA-256 d98e5fbba0aa4aca32bbe79228a73d83d335d0b3f82503e40c0b04509d07ec64 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:23  up 6 days,  9:51, 6 users, load averages: 1.25 1.66 1.88 — Fri Nov 27 23:23:44 UTC 2026 to Fri Nov 27 23:23:44 UTC 2026 — exit status 0.

384-r5-tests.log · SHA-256 51d5ba231b63a8cbc6925389651c6b00a47e429ac8f82bc08f958cb47563e7d5 — Full command in cited source — 18:23  up 6 days,  9:51, 6 users, load averages: 1.25 1.66 1.88 — Fri Nov 27 23:23:44 UTC 2026 to Fri Nov 27 23:23:50 UTC 2026 — exit status 0.

385-r5-message.log · SHA-256 ab3f4f492cb2269e9b6fc2d260d59d37dfdd628cd0527f4b90ed7c3d54edfb65 — prepare_r5 — 18:23  6 users, load averages: 1.37 1.67 1.88 — Fri Nov 27 23:23:58 UTC 2026 to Fri Nov 27 23:23:58 UTC 2026 — exit status 0.

386-r5-message-check.log · SHA-256 a0728255e1b9bec3b297fe7b1cf207450e56844490e142175d9c386c4a3d0a93 — zsh /private/tmp/m3-build.U6WP3RU0/check-message.zsh /private/tmp/m3-build.U6WP3RU0/message-5 — 18:23  6 users, load averages: 1.37 1.67 1.88 — Fri Nov 27 23:23:58 UTC 2026 to Fri Nov 27 23:23:58 UTC 2026 — exit status 0.

387-r5-stage.log · SHA-256 d6e16ca78411db5641d42752299f86d5e7a0e7e351475a91dd73b919d5816ed7 — git -C tui add -u — 18:23  6 users, load averages: 1.37 1.67 1.88 — Fri Nov 27 23:23:58 UTC 2026 to Fri Nov 27 23:23:58 UTC 2026 — exit status 0.

388-r5-stage-test.log · SHA-256 a43b96a3576e99e3623487d0ba82191c407db201c0a4e799dc3f771b8b5881d3 — git -C tui add test/phase3b/madv-pane.test.tsx — 18:23  6 users, load averages: 1.90 1.78 1.92 — Fri Nov 27 23:23:58 UTC 2026 to Fri Nov 27 23:23:58 UTC 2026 — exit status 0.

389-r5-commit.log · SHA-256 f84cef0506f115764041206630197fbfcb52310cc3c8f49807a18b2338a1ea63 — git -C tui commit -F /private/tmp/m3-build.U6WP3RU0/message-5 — 18:24  6 users, load averages: 1.99 1.80 1.93 — Fri Nov 27 23:24:04 UTC 2026 to Fri Nov 27 23:24:04 UTC 2026 — exit status 0.

390-r5-break-target.log · SHA-256 3db7c43ce37bf22abe378fcaf4e313ece7f1ee59462c5527aab391a1474ff14b — review_target — 18:24  6 users, load averages: 1.99 1.80 1.93 — Fri Nov 27 23:24:04 UTC 2026 to Fri Nov 27 23:24:04 UTC 2026 — exit status 0.

391-alt4-edit.log · SHA-256 9a018df299e167901698c581e098eef8d8aa1a534b7797c1a5c0dd2c7f43b83b — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py apps/madbridge/src/tui/keyboard-router.ts 'callbacks.onFocusChange("madv-surface");' 'callbacks.onFocusChange("claude");' — 18:24  6 users, load averages: 1.99 1.80 1.93 — Fri Nov 27 23:24:08 UTC 2026 to Fri Nov 27 23:24:08 UTC 2026 — exit status 0.

392-alt4-diff.log · SHA-256 e777a39e1694956a087c5d035e5c463db524024c27ceafd56df6a41211106a7d — git -C tui diff -- apps/madbridge/src/tui/keyboard-router.ts — 18:24  6 users, load averages: 1.91 1.78 1.92 — Fri Nov 27 23:24:08 UTC 2026 to Fri Nov 27 23:24:08 UTC 2026 — exit status 0.

393-alt4-runtime.log · SHA-256 dbda58fd2e003ad9b78636044674eb22376debc6604fb535ff333bcaa67f6bcc — Full command in cited source — 18:24  up 6 days,  9:52, 6 users, load averages: 2.01 1.81 1.93 — Fri Nov 27 23:24:27 UTC 2026 to Fri Nov 27 23:24:27 UTC 2026 — exit status 0.

394-alt4-wait.log · SHA-256 17920c46588e5d22373a6edd55dee9c8e5e718c1533ea8489ee319ed9af27fda — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:24  up 6 days,  9:52, 6 users, load averages: 1.63 1.74 1.90 — Fri Nov 27 23:24:56 UTC 2026 to Fri Nov 27 23:24:56 UTC 2026 — exit status 0.

395-alt4-test.log · SHA-256 83131c404b51adada2462ae927b6c1e4c00526bc28a09b228543d0c931c7b957 — Full command in cited source — 18:24  up 6 days,  9:52, 6 users, load averages: 1.63 1.74 1.90 — Fri Nov 27 23:24:56 UTC 2026 to Fri Nov 27 23:24:56 UTC 2026 — exit status 1.

396-alt4-restore.log · SHA-256 b750a612bd493a90e98f335c6d0d7b156b103a196de852b624447c86fc20db2f — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh apps/madbridge/src/tui/keyboard-router.ts — 18:25  6 users, load averages: 1.46 1.70 1.88 — Fri Nov 27 23:25:03 UTC 2026 to Fri Nov 27 23:25:04 UTC 2026 — exit status 0.

397-alt4-proof.log · SHA-256 e3a5073f71a506b1509f803b1e4eba024e384bfa0fc1ec0f55c26f3d223b1102 — python3 /private/tmp/m3-build.U6WP3RU0/assertion.py logs/395-alt4-test.log test/phase3b/madv-pane.test.tsx 'Alt+4 focuses the madv-surface execution' 15 — 18:25  6 users, load averages: 1.46 1.70 1.88 — Fri Nov 27 23:25:04 UTC 2026 to Fri Nov 27 23:25:04 UTC 2026 — exit status 0.

398-r6-authority.log · SHA-256 25426190779bbc38520dd16cad30dc9bc8942305ae90824bf416d568cd5ac7e7 — rg -n -C3 'Finding 2|Finding 3|B16\.|13\. A|14\. A|11\. A|pacing-settlement|ended-stream' tui/docs/decisions/DEC-20261127-01-m2-records-and-m3.md tui/docs/verification/phase-3b-m3-build-log.md — 18:25  6 users, load averages: 1.46 1.70 1.88 — Fri Nov 27 23:25:04 UTC 2026 to Fri Nov 27 23:25:04 UTC 2026 — exit status 0.

399-r6-readers.log · SHA-256 1761612d971e601282b997bd5646b63dd39a24e83a8e6e99d0102a7fb058e0cf — r6_sources — 18:25  6 users, load averages: 1.46 1.70 1.88 — Fri Nov 27 23:25:08 UTC 2026 to Fri Nov 27 23:25:08 UTC 2026 — exit status 0.

400-r6-projection.log · SHA-256 529e7cf8dae693de2f532d63737a9a56a3c7dde9b81a5133c49be2789e6fdb80 — r6_context — 18:25  6 users, load averages: 1.63 1.73 1.89 — Fri Nov 27 23:25:14 UTC 2026 to Fri Nov 27 23:25:14 UTC 2026 — exit status 0.

401-r6-base-expectations.log · SHA-256 b6979cbb2036f59775b2f7e4460c0deb179bc23307c8aaa9df89a4240543d42e — read_criteria — 18:25  6 users, load averages: 1.45 1.69 1.87 — Fri Nov 27 23:25:26 UTC 2026 to Fri Nov 27 23:25:26 UTC 2026 — exit status 0.

402-r6-edits.log · SHA-256 4b01bad622ae4f5e3be1716101350fb6d758dcefc792a311cc2d29a42a624b42 — r6_write — 18:26  6 users, load averages: 1.30 1.63 1.84 — Fri Nov 27 23:26:25 UTC 2026 to Fri Nov 27 23:26:25 UTC 2026 — exit status 0.

403-r6-runtime.log · SHA-256 f6807cdbdbc0f1d74f9d2adca77c1683fd299dfdd384dbf6a8f6e3ae3b5f2820 — Full command in cited source — 18:27  up 6 days,  9:54, 6 users, load averages: 2.08 1.85 1.91 — Fri Nov 27 23:27:24 UTC 2026 to Fri Nov 27 23:27:24 UTC 2026 — exit status 0.

404-r6-typecheck.log · SHA-256 75a3b6e70c50a0d1287b9c7a7f5248dfcaed0201b1e727b51a2b02461b131909 — Full command in cited source — 18:27  up 6 days,  9:55, 6 users, load averages: 2.71 1.99 1.96 — Fri Nov 27 23:27:25 UTC 2026 to Fri Nov 27 23:27:28 UTC 2026 — exit status 0.

405-r6-wait.log · SHA-256 e8710f756db84293a53b8886916bafa8a6692da870d9b046bb6f319fdc74c727 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:27  up 6 days,  9:55, 6 users, load averages: 2.57 1.97 1.95 — Fri Nov 27 23:27:30 UTC 2026 to Fri Nov 27 23:29:30 UTC 2026 — exit status 0.

406-r6-tests.log · SHA-256 b3554a067fca466b28c1d16e7dde70323a3836ef2da73022febf5e4e8e87493a — Full command in cited source — 18:29  up 6 days,  9:57, 6 users, load averages: 1.95 2.04 1.99 — Fri Nov 27 23:29:30 UTC 2026 to Fri Nov 27 23:29:32 UTC 2026 — exit status 0.

407-r6-message.log · SHA-256 841d5f22424aea32b7ccdf7e4ed16162c38d88d5d389d5e1072ece294edfee1f — r6msg — 18:29  6 users, load averages: 2.10 2.07 2.00 — Fri Nov 27 23:29:40 UTC 2026 to Fri Nov 27 23:29:40 UTC 2026 — exit status 0.

408-r6-message-check.log · SHA-256 8162b4a3f5e469343b20894501b1357b6cff9f340f7216c5bdb33550da9172cc — zsh /private/tmp/m3-build.U6WP3RU0/check-message.zsh /private/tmp/m3-build.U6WP3RU0/message-6 — 18:29  6 users, load averages: 2.10 2.07 2.00 — Fri Nov 27 23:29:40 UTC 2026 to Fri Nov 27 23:29:40 UTC 2026 — exit status 0.

409-r6-stage.log · SHA-256 6c8fd37a57e71d54c0dfa97b9cd664e79af7ae8402b1e096ce6ca6353a5fdfb0 — git -C tui add apps/madbridge/src/tui/components/StatusBar.tsx apps/madbridge/src/tui/panes/GovernancePane.tsx test/phase3b/ended-observation.tsx test/phase3b/ended-stream.test.tsx test/phase3b/pacing-settlement.test.ts — 18:29  6 users, load averages: 2.10 2.07 2.00 — Fri Nov 27 23:29:40 UTC 2026 to Fri Nov 27 23:29:40 UTC 2026 — exit status 0.

410-r6-commit.log · SHA-256 8abf939d7aa5212193100c1730c32d2a300c6939276917473c6aa271cc723517 — git -C tui commit -F /private/tmp/m3-build.U6WP3RU0/message-6 — 18:29  6 users, load averages: 2.33 2.12 2.02 — Fri Nov 27 23:29:45 UTC 2026 to Fri Nov 27 23:29:45 UTC 2026 — exit status 0.

411-r6-break-sites.log · SHA-256 c9c51f2d04cd944d160db120b227c75c20340949c7bc8db71504ae41a95f811e — r6_sites — 18:29  6 users, load averages: 2.33 2.12 2.02 — Fri Nov 27 23:29:45 UTC 2026 to Fri Nov 27 23:29:45 UTC 2026 — exit status 0.

412-ended-writer-edit.log · SHA-256 afd598b3782b488427576466f114138914e464f07d63b474a610accbf3438863 — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py apps/madbridge/src/tui/components/StatusBar.tsx 'if (state.connected === false) return livenessWord(state);' '' — 18:30  6 users, load averages: 2.48 2.17 2.04 — Fri Nov 27 23:30:10 UTC 2026 to Fri Nov 27 23:30:10 UTC 2026 — exit status 0.

413-ended-writer-diff.log · SHA-256 63c7fb4fbc9603de6fdcbf778bfdec33974cb67f8f007d3b4d073e9d08473e8e — git -C tui diff -- apps/madbridge/src/tui/components/StatusBar.tsx — 18:30  6 users, load averages: 2.48 2.17 2.04 — Fri Nov 27 23:30:10 UTC 2026 to Fri Nov 27 23:30:10 UTC 2026 — exit status 0.

414-ended-writer-runtime.log · SHA-256 4cd1f397c6f05ad8b595b15adb9dc9bb1a59e6ac8ea262ecd6655fe1221a3a5f — Full command in cited source — 18:31  up 6 days,  9:59, 1 user, load averages: 2.52 2.23 2.07 — Fri Nov 27 23:31:36 UTC 2026 to Fri Nov 27 23:31:36 UTC 2026 — exit status 0.

415-ended-writer-wait.log · SHA-256 4b1bb02f9c5d5877cb19f3a1f447c32095be101340953e0956a3a186635f6747 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:31  up 6 days,  9:59, 1 user, load averages: 2.52 2.23 2.07 — Fri Nov 27 23:31:37 UTC 2026 to Fri Nov 27 23:34:07 UTC 2026 — exit status 0.

416-ended-writer-test.log · SHA-256 d8d00edda291feff01133ed2dcf9c81aceffd7745e752a8d3322cf659a1dec84 — Full command in cited source — 18:34  up 6 days, 10:01, 1 user, load averages: 1.42 1.99 2.00 — Fri Nov 27 23:34:07 UTC 2026 to Fri Nov 27 23:34:09 UTC 2026 — exit status 1.

417-ended-writer-restore.log · SHA-256 14d3654032d7bec02affbbb213eb9c4f1c7a0fbfdcb5d8e48c0d1b5d08b8a664 — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh apps/madbridge/src/tui/components/StatusBar.tsx — 18:34  1 user, load averages: 1.42 1.99 2.00 — Fri Nov 27 23:34:09 UTC 2026 to Fri Nov 27 23:34:09 UTC 2026 — exit status 0.

418-ended-writer-proof.log · SHA-256 479eaa64566ffe623b19818f931a3483ee695f3dfa23280985a9e9550b27018a — python3 /private/tmp/m3-build.U6WP3RU0/assertion.py logs/416-ended-writer-test.log test/phase3b/ended-stream.test.tsx 'failed and closed streams replace current authority in every reader' 13 — 18:34  1 user, load averages: 1.42 1.99 2.00 — Fri Nov 27 23:34:09 UTC 2026 to Fri Nov 27 23:34:09 UTC 2026 — exit status 0.

419-null-transfer-edit.log · SHA-256 0cc2142d09acafd538d53742c9f3464312999ca19734224f7740ff7e9dabd462 — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py apps/madbridge/src/tui/components/StatusBar.tsx 'return "transfer-req" + suffix;' 'return "transfer-req" + (tok === null ? " #0" : suffix);' — 18:34  1 user, load averages: 1.42 1.99 2.00 — Fri Nov 27 23:34:09 UTC 2026 to Fri Nov 27 23:34:09 UTC 2026 — exit status 0.

420-null-transfer-diff.log · SHA-256 baa9cba6689a66d0bd376bff826f5d3710e68152c253a23c848d68dd86e7155d — git -C tui diff -- apps/madbridge/src/tui/components/StatusBar.tsx — 18:34  1 user, load averages: 1.42 1.99 2.00 — Fri Nov 27 23:34:09 UTC 2026 to Fri Nov 27 23:34:09 UTC 2026 — exit status 0.

421-null-transfer-runtime.log · SHA-256 d8c3791186219b9fa8ee8a08008097b4daebeb54179a6ce13e64ec223bcf8d12 — Full command in cited source — 18:34  up 6 days, 10:02, 1 user, load averages: 1.50 1.96 1.99 — Fri Nov 27 23:34:32 UTC 2026 to Fri Nov 27 23:34:32 UTC 2026 — exit status 0.

422-null-transfer-wait.log · SHA-256 43a48815c53f0ede2f302dd2e87dabcd41fe40cc3f4cd4021fb8c42859d7eb5f — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:34  up 6 days, 10:02, 1 user, load averages: 1.50 1.96 1.99 — Fri Nov 27 23:34:34 UTC 2026 to Fri Nov 27 23:34:34 UTC 2026 — exit status 0.

423-null-transfer-test.log · SHA-256 bf7514c5e8011d63850146edfd9f4cde272cc5507472cfcec4dc5f939b537deb — Full command in cited source — 18:34  up 6 days, 10:02, 1 user, load averages: 1.50 1.96 1.99 — Fri Nov 27 23:34:34 UTC 2026 to Fri Nov 27 23:34:35 UTC 2026 — exit status 1.

424-null-transfer-restore.log · SHA-256 63490beece694cac7d0b4d22203a5227f0d6884bcb8470ae603c26fef8a8f782 — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh apps/madbridge/src/tui/components/StatusBar.tsx — 18:34  1 user, load averages: 1.78 2.01 2.01 — Fri Nov 27 23:34:35 UTC 2026 to Fri Nov 27 23:34:35 UTC 2026 — exit status 0.

425-null-transfer-proof.log · SHA-256 d9526e0a1872703a62fa5dc1c2ae7d6b4584da8b8282177cd3c75c3ba46ab783 — python3 /private/tmp/m3-build.U6WP3RU0/assertion.py logs/423-null-transfer-test.log test/phase3b/ended-stream.test.tsx 'transfer-requested and sender-released show a null token as absence' 43 — 18:34  1 user, load averages: 1.78 2.01 2.01 — Fri Nov 27 23:34:35 UTC 2026 to Fri Nov 27 23:34:35 UTC 2026 — exit status 0.

426-pending-pace-edit.log · SHA-256 5ff87cdb022016b7fe9bf3d7280921be1bfe64516625abeee27396e3b965f4e8 — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py apps/madbridge/src/tui/live/subscribe.ts 'await waitForSnapshotTick(signal);' 'await waitForSnapshotTick(new AbortController().signal);' — 18:34  1 user, load averages: 1.78 2.01 2.01 — Fri Nov 27 23:34:35 UTC 2026 to Fri Nov 27 23:34:35 UTC 2026 — exit status 0.

427-pending-pace-diff.log · SHA-256 282cbd31febd34eccee22575750fc2d9036be706b7910949f4a91c7355815ad3 — git -C tui diff -- apps/madbridge/src/tui/live/subscribe.ts — 18:34  1 user, load averages: 1.78 2.01 2.01 — Fri Nov 27 23:34:35 UTC 2026 to Fri Nov 27 23:34:35 UTC 2026 — exit status 0.

428-pending-pace-runtime.log · SHA-256 c22ced9a0aeac320b5a8bea6685586528856222f34e38556e8ea8fc44133ba21 — Full command in cited source — 18:34  up 6 days, 10:02, 1 user, load averages: 1.78 2.01 2.01 — Fri Nov 27 23:34:37 UTC 2026 to Fri Nov 27 23:34:37 UTC 2026 — exit status 0.

429-pending-pace-wait.log · SHA-256 765ad253659e566add31897ea6a29804e2eaac711d08c6c1de54e25474ebd728 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:34  up 6 days, 10:02, 1 user, load averages: 1.78 2.01 2.01 — Fri Nov 27 23:34:38 UTC 2026 to Fri Nov 27 23:34:38 UTC 2026 — exit status 0.

430-pending-pace-test.log · SHA-256 422187ebb5b85c476dec14799dc490f0cc11629552f11e2c5890bd1a6c7f71df — Full command in cited source — 18:34  up 6 days, 10:02, 1 user, load averages: 1.78 2.01 2.01 — Fri Nov 27 23:34:38 UTC 2026 to Fri Nov 27 23:34:38 UTC 2026 — exit status 1.

431-pending-pace-restore.log · SHA-256 85fc86db533be2f5887e8e0e560d04fc0390e3b16cb248b0d4d0fb46a791257d — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh apps/madbridge/src/tui/live/subscribe.ts — 18:34  1 user, load averages: 1.78 2.01 2.01 — Fri Nov 27 23:34:38 UTC 2026 to Fri Nov 27 23:34:38 UTC 2026 — exit status 0.

432-pending-pace-proof.log · SHA-256 c540f361c3e9cb3365a0e60f9bd1124da992f9044b524cf845e69c840142a48f — python3 /private/tmp/m3-build.U6WP3RU0/assertion.py logs/430-pending-pace-test.log test/phase3b/pacing-settlement.test.ts 'unsubscribe settles the pending pacing wait before its deadline' 22 — 18:34  1 user, load averages: 1.78 2.01 2.01 — Fri Nov 27 23:34:38 UTC 2026 to Fri Nov 27 23:34:38 UTC 2026 — exit status 0.

433-r7-receive-path.log · SHA-256 13a77fb0e9881f3a015175941aefee6a241106072483cd15a2860cab22a548cd — r7_read — 18:34  1 user, load averages: 1.51 1.94 1.98 — Fri Nov 27 23:34:45 UTC 2026 to Fri Nov 27 23:34:45 UTC 2026 — exit status 1.

434-r7-host-and-fixtures.log · SHA-256 4a8fa5a767a94a729b4dbcf98e682f5a4ef8d56dfd4525bf3960b4ef6942b0bc — r7_refs — 18:34  1 user, load averages: 1.63 1.96 1.99 — Fri Nov 27 23:34:51 UTC 2026 to Fri Nov 27 23:34:51 UTC 2026 — exit status 0.

435-r7-verdict.log · SHA-256 0fc8799daf674ef04c9f0bf8de8bc765978833cc538fe19537ce57f16fd5fd2a — r7_interfaces — 18:35  1 user, load averages: 1.75 1.98 1.99 — Fri Nov 27 23:35:09 UTC 2026 to Fri Nov 27 23:35:09 UTC 2026 — exit status 0.

436-r7-shutdown.log · SHA-256 b366bd9bd895c5c2d573db1f4192009653656a14cb36c78ec09cdaf81b649b4a — r7_lifecycle — 18:35  1 user, load averages: 1.32 1.86 1.95 — Fri Nov 27 23:35:30 UTC 2026 to Fri Nov 27 23:35:30 UTC 2026 — exit status 0.

437-r7-containment.log · SHA-256 a1390db192a74eccc0b568a5e266644b4e43a3fcf851329a79ef610dca3f90a9 — r7_close — 18:35  1 user, load averages: 1.24 1.82 1.93 — Fri Nov 27 23:35:42 UTC 2026 to Fri Nov 27 23:35:42 UTC 2026 — exit status 0.

438-r7-edits.log · SHA-256 36890dbcc8d66751ac1d306cc35e323396619c43f655bcedd8f3909320e40a97 — r7_edits — 18:36  1 user, load averages: 1.77 1.85 1.94 — Fri Nov 27 23:36:44 UTC 2026 to Fri Nov 27 23:36:44 UTC 2026 — exit status 0.

439-r7-runtime.log · SHA-256 4e526e5766a0196a5f48dccf3bced44765f35d0fd67cc3e9692c2218de2194c8 — Full command in cited source — 18:37  up 6 days, 10:04, 1 user, load averages: 1.63 1.81 1.92 — Fri Nov 27 23:37:03 UTC 2026 to Fri Nov 27 23:37:03 UTC 2026 — exit status 0.

440-r7-typecheck.log · SHA-256 7a9ebb6f83b0c874a48e2448d3e90977dcfec49da72839fe55d9901aed304ea8 — Full command in cited source — 18:37  up 6 days, 10:04, 1 user, load averages: 1.50 1.78 1.91 — Fri Nov 27 23:37:06 UTC 2026 to Fri Nov 27 23:37:09 UTC 2026 — exit status 2.

441-r7-observation-types.log · SHA-256 bab6be5442c085acfd7bac23b17336a121667c9e85509ca4d96264bec2e023ff — r7_observation_types — 18:37  1 user, load averages: 1.43 1.76 1.90 — Fri Nov 27 23:37:15 UTC 2026 to Fri Nov 27 23:37:15 UTC 2026 — exit status 0.

442-r7-typecheck.log · SHA-256 f00b07f7e2226c5964f4c88727fe012a92e8dbedfbecb7a9629f70408a096a94 — Full command in cited source — 18:39  up 6 days, 10:07, 1 user, load averages: 1.48 1.66 1.83 — Fri Nov 27 23:39:37 UTC 2026 to Fri Nov 27 23:39:40 UTC 2026 — exit status 0.

443-r7-wait.log · SHA-256 4917f82eee5885f3eca1f8d353e8a8dcadf84f8fede6328ae242ba3889cbab66 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:39  up 6 days, 10:07, 1 user, load averages: 2.00 1.76 1.86 — Fri Nov 27 23:39:41 UTC 2026 to Fri Nov 27 23:40:12 UTC 2026 — exit status 0.

444-r7-tests.log · SHA-256 674c186a60c0a4e9a0fd9efe534aa3074911669361fa81909d881fe1346f0caf — Full command in cited source — 18:40  up 6 days, 10:07, 1 user, load averages: 1.88 1.75 1.86 — Fri Nov 27 23:40:12 UTC 2026 to Fri Nov 27 23:40:13 UTC 2026 — exit status 0.

445-r7-message.log · SHA-256 b668fc4bfe36e1aaa4e7bb1f98ba884f8c08f77d8fc0911f4915e4507e095d4f — r7msg — 18:40  1 user, load averages: 1.81 1.74 1.85 — Fri Nov 27 23:40:24 UTC 2026 to Fri Nov 27 23:40:24 UTC 2026 — exit status 0.

446-r7-message-check.log · SHA-256 3cfce2f428af579d3b84f1bce054ce883a7f09f647bdf1233ab3180905233887 — zsh /private/tmp/m3-build.U6WP3RU0/check-message.zsh /private/tmp/m3-build.U6WP3RU0/message-7 — 18:40  1 user, load averages: 1.81 1.74 1.85 — Fri Nov 27 23:40:24 UTC 2026 to Fri Nov 27 23:40:24 UTC 2026 — exit status 0.

447-r7-stage.log · SHA-256 6607429c6c473bc28b7adf5bb0f1f10acbbbe80a197b0c932040951554f1ff72 — git -C tui add packages/broker/src/pty-host-supervisor.ts test/phase3b/transport.ts test/phase3b/malformed-observation.ts test/phase3b/malformed-host.test.ts — 18:40  1 user, load averages: 1.81 1.74 1.85 — Fri Nov 27 23:40:24 UTC 2026 to Fri Nov 27 23:40:24 UTC 2026 — exit status 0.

448-r7-commit.log · SHA-256 674439ab1bec4ff08ade1c80c466d97105444ab4f45d52817fd3ad9ed3563562 — git -C tui commit -F /private/tmp/m3-build.U6WP3RU0/message-7 — 18:40  1 user, load averages: 1.98 1.78 1.86 — Fri Nov 27 23:40:29 UTC 2026 to Fri Nov 27 23:40:29 UTC 2026 — exit status 0.

449-r7-break-sites.log · SHA-256 00e672a3f16dd2d1609f4a9dbe140db4e7ca8cd4a95ded11e24725c03787d560 — r7_sites — 18:40  1 user, load averages: 1.98 1.78 1.86 — Fri Nov 27 23:40:29 UTC 2026 to Fri Nov 27 23:40:29 UTC 2026 — exit status 0.

450-seam-import-edit.log · SHA-256 f203e62f65395496573bd05337b5b5d8427064a2b109517d28e7641f89a6849d — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py packages/broker/src/in-process-client.ts '// packages/broker/src/in-process-client.ts' '// packages/broker/src/in-process-client.ts import { unsafeTestOnlyInjectHostOutput } from "./pty-host-supervisor";' — 18:40  1 user, load averages: 2.41 1.89 1.90 — Fri Nov 27 23:40:53 UTC 2026 to Fri Nov 27 23:40:53 UTC 2026 — exit status 0.

451-seam-import-diff.log · SHA-256 3ef58f3e0f98eef4daa16f89cdd5d7c91212cf8ca9bac761b4307c380aebe7b4 — git -C tui diff -- packages/broker/src/in-process-client.ts — 18:40  1 user, load averages: 2.41 1.89 1.90 — Fri Nov 27 23:40:53 UTC 2026 to Fri Nov 27 23:40:53 UTC 2026 — exit status 0.

452-seam-import-runtime.log · SHA-256 3ce8d1c8bc62d6d8dd9045cbb84d1edbca553af404c56349837d86cee87a7f3c — Full command in cited source — 18:40  up 6 days, 10:08, 1 user, load averages: 2.54 1.93 1.91 — Fri Nov 27 23:40:59 UTC 2026 to Fri Nov 27 23:40:59 UTC 2026 — exit status 0.

453-seam-import-wait.log · SHA-256 f64c1498fb173bed99595c584ca5579ef89c10cfc2663340e99dc0e5a9ce7db9 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:41  up 6 days, 10:08, 1 user, load averages: 2.54 1.93 1.91 — Fri Nov 27 23:41:00 UTC 2026 to Fri Nov 27 23:42:30 UTC 2026 — exit status 0.

454-seam-import-test.log · SHA-256 05b121260f2809d0c293a3b3c989d89a108a9f598825b86040e4ca1d634b8808 — Full command in cited source — 18:42  up 6 days, 10:10, 1 user, load averages: 1.75 1.87 1.89 — Fri Nov 27 23:42:30 UTC 2026 to Fri Nov 27 23:42:31 UTC 2026 — exit status 1.

455-seam-import-restore.log · SHA-256 8c632bccf605433d5dad78e8674aa015d94e1cf312996453f62fb2227f661745 — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh packages/broker/src/in-process-client.ts — 18:42  1 user, load averages: 1.75 1.87 1.89 — Fri Nov 27 23:42:31 UTC 2026 to Fri Nov 27 23:42:31 UTC 2026 — exit status 0.

456-seam-import-proof.log · SHA-256 2524ecbada555def9132de8060de3e49c6a566319a9a72eb44006b518e001393 — python3 /private/tmp/m3-build.U6WP3RU0/assertion.py logs/454-seam-import-test.log test/phase3b/m3-separation.test.ts 'production imports no private broker test seam' 36 — 18:42  1 user, load averages: 1.75 1.87 1.89 — Fri Nov 27 23:42:31 UTC 2026 to Fri Nov 27 23:42:31 UTC 2026 — exit status 0.

457-discard-fault-edit.log · SHA-256 806f448aa18687ad84b169f28514987c8478c40687b8cf2c0d1831b9a33e7fac — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py packages/broker/src/pty-host-supervisor.ts '        buffer = read.pending;' '        buffer = new Uint8Array(0);' — 18:42  1 user, load averages: 1.75 1.87 1.89 — Fri Nov 27 23:42:31 UTC 2026 to Fri Nov 27 23:42:31 UTC 2026 — exit status 0.

458-discard-fault-diff.log · SHA-256 163917fda66632b419c29a8ef8c2264384f07a1bf5ca6630d77560c96c557382 — git -C tui diff -- packages/broker/src/pty-host-supervisor.ts — 18:42  1 user, load averages: 1.75 1.87 1.89 — Fri Nov 27 23:42:31 UTC 2026 to Fri Nov 27 23:42:31 UTC 2026 — exit status 0.

459-discard-fault-runtime.log · SHA-256 d9bf7414a86806763088528d02dfda8ac0a4490d9b7e408645943f91e9bffa0d — Full command in cited source — 18:44  up 6 days, 10:11, 1 user, load averages: 2.91 2.21 2.02 — Fri Nov 27 23:44:06 UTC 2026 to Fri Nov 27 23:44:07 UTC 2026 — exit status 0.

460-discard-fault-wait.log · SHA-256 578ff3415a56e6b15f250b20c2e9ae797c96c77ff6cb9b54324321e62dc5b736 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:44  up 6 days, 10:12, 1 user, load averages: 2.94 2.28 2.05 — Fri Nov 27 23:44:28 UTC 2026 to Fri Nov 27 23:48:58 UTC 2026 — exit status 0.

461-discard-fault-test.log · SHA-256 d0ac1350bc273b61a92252b634ff87248a8540736946a3ddf644f48526eed4fe — Full command in cited source — 18:48  up 6 days, 10:16, 1 user, load averages: 1.97 2.28 2.12 — Fri Nov 27 23:48:58 UTC 2026 to Fri Nov 27 23:49:01 UTC 2026 — exit status 1.

462-discard-fault-restore.log · SHA-256 b594e6fdf9a9fb9b2fdb264e8a9dbd423c8dfd541224b6c41fbfa124602ff253 — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh packages/broker/src/pty-host-supervisor.ts — 18:49  1 user, load averages: 1.97 2.28 2.12 — Fri Nov 27 23:49:01 UTC 2026 to Fri Nov 27 23:49:01 UTC 2026 — exit status 0.

463-discard-fault-proof.log · SHA-256 ae160dd03dc727f8770bdb9ee03cb982fdcbcea0b86d81a2019b40997f1f1cdb — python3 /private/tmp/m3-build.U6WP3RU0/assertion.py logs/461-discard-fault-test.log test/phase3b/malformed-host.test.ts 'malformed payloads and unknown tags interrupt each live monitor without client bytes' 10 — 18:49  1 user, load averages: 1.97 2.28 2.12 — Fri Nov 27 23:49:01 UTC 2026 to Fri Nov 27 23:49:01 UTC 2026 — exit status 0.

464-expose-fault-edit.log · SHA-256 36fd9f076d39694506222e82c5a26b80043889aad94d40dacd1ec3fbf720587f — python3 /private/tmp/m3-build.U6WP3RU0/mutation.py packages/broker/src/pty-host-supervisor.ts '        buffer = read.pending;' '        yield { kind: "output", bytes: read.pending }; buffer = read.pending;' — 18:49  1 user, load averages: 1.97 2.28 2.12 — Fri Nov 27 23:49:01 UTC 2026 to Fri Nov 27 23:49:01 UTC 2026 — exit status 0.

465-expose-fault-diff.log · SHA-256 16987dbde1db588d2d883324bf76deed19afebcf11add0e7738c2399741d131e — git -C tui diff -- packages/broker/src/pty-host-supervisor.ts — 18:49  1 user, load averages: 1.97 2.28 2.12 — Fri Nov 27 23:49:01 UTC 2026 to Fri Nov 27 23:49:01 UTC 2026 — exit status 0.

466-expose-fault-runtime.log · SHA-256 8ae7c963a2ba9fbc4ae2da39c2f3528548bfac0f21354329c8a6440d14407510 — Full command in cited source — 18:49  up 6 days, 10:16, 1 user, load averages: 1.82 2.24 2.10 — Fri Nov 27 23:49:07 UTC 2026 to Fri Nov 27 23:49:07 UTC 2026 — exit status 0.

467-expose-fault-wait.log · SHA-256 70d4677e0a9281d0b256035fbd5e20ceb2c517eccafb38c6af4ee6581405e042 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:49  up 6 days, 10:16, 1 user, load averages: 1.75 2.22 2.10 — Fri Nov 27 23:49:12 UTC 2026 to Fri Nov 27 23:49:12 UTC 2026 — exit status 0.

468-expose-fault-test.log · SHA-256 4b47a0e41d7d3314fb279470b494d3be74773e57139e32021a1517c7897d0b9b — Full command in cited source — 18:49  up 6 days, 10:16, 1 user, load averages: 1.75 2.22 2.10 — Fri Nov 27 23:49:12 UTC 2026 to Fri Nov 27 23:49:13 UTC 2026 — exit status 1.

469-expose-fault-restore.log · SHA-256 6a5df68f40469e54b4eaf988d04d2b46b145c67f7355cc09076f8f945f3c1f6d — zsh /private/tmp/m3-build.U6WP3RU0/restore.zsh packages/broker/src/pty-host-supervisor.ts — 18:49  1 user, load averages: 1.77 2.21 2.10 — Fri Nov 27 23:49:13 UTC 2026 to Fri Nov 27 23:49:13 UTC 2026 — exit status 0.

470-expose-fault-proof.log · SHA-256 ed311512c5c16799e50c469029e85e64816f2a615e56179329ee96ac5c4a2cad — python3 /private/tmp/m3-build.U6WP3RU0/assertion.py logs/468-expose-fault-test.log test/phase3b/malformed-host.test.ts 'malformed payloads and unknown tags interrupt each live monitor without client bytes' 16 — 18:49  1 user, load averages: 1.77 2.21 2.10 — Fri Nov 27 23:49:13 UTC 2026 to Fri Nov 27 23:49:13 UTC 2026 — exit status 0.

471-r8-transcript-sources.log · SHA-256 e494c69ac740cd65c748ca0f677cd62a1986d67bca5be82971abaaf4c9d03208 — r8_inputs — 18:49  1 user, load averages: 2.19 2.29 2.12 — Fri Nov 27 23:49:19 UTC 2026 to Fri Nov 27 23:49:19 UTC 2026 — exit status 0.

472-r8-script.log · SHA-256 863e9b73e2436ce49b9817a928b58eedd527e3f299ad501788b60a286fcd3934 — r8_write — 18:49  1 user, load averages: 2.08 2.25 2.11 — Fri Nov 27 23:49:46 UTC 2026 to Fri Nov 27 23:49:46 UTC 2026 — exit status 0.

473-r8-runtime.log · SHA-256 e2b68a2a35e1395eaddb37b2d45efc58bbe9bbeea2b1a3c2de8211d1cc45ecbb — Full command in cited source — 18:50  up 6 days, 10:17, 1 user, load averages: 1.80 2.19 2.09 — Fri Nov 27 23:50:03 UTC 2026 to Fri Nov 27 23:50:03 UTC 2026 — exit status 0.

474-r8-wait.log · SHA-256 4689e3507aafabdc5a748faad00312c67c69c3aeb5b9b2943c22257212ffcebb — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:50  up 6 days, 10:17, 1 user, load averages: 1.60 2.13 2.07 — Fri Nov 27 23:50:17 UTC 2026 to Fri Nov 27 23:50:17 UTC 2026 — exit status 0.

475-r8-evidence.log · SHA-256 fa193b8eb8ae72e11ee73fc932591acce6d8f16647a4c16115ab202c9805bc84 — Full command in cited source — 18:50  up 6 days, 10:17, 1 user, load averages: 1.60 2.13 2.07 — Fri Nov 27 23:50:17 UTC 2026 to Fri Nov 27 23:50:23 UTC 2026 — exit status 0.

476-evidence-hashes.log · SHA-256 76d19c1adb49346610eada2737ae0c83ba6fb3cb31bc61b5a9b95b7425315f0c — hash_sources — 18:50  1 user, load averages: 1.40 2.05 2.05 — Fri Nov 27 23:50:36 UTC 2026 to Fri Nov 27 23:50:36 UTC 2026 — exit status 0.

477-evidence-observations.log · SHA-256 857a71149533439c86e7228c8ffe8c4317d1fdfe766068f1c6c54dff3ff41ac8 — samples — 18:50  1 user, load averages: 1.40 2.05 2.05 — Fri Nov 27 23:50:36 UTC 2026 to Fri Nov 27 23:50:36 UTC 2026 — exit status 0.

478-r8-packet.log · SHA-256 1af7f93f0eb20a0fbb1af00a1d5d8f604b4be6c7ee2d27ccb51aa9527226ff8e — r8_packet — 18:51  1 user, load averages: 1.45 1.98 2.02 — Fri Nov 27 23:51:09 UTC 2026 to Fri Nov 27 23:51:09 UTC 2026 — exit status 0.

479-r8-message.log · SHA-256 5e6f39990297456a3820fcc24f6b51fbc0ffd4d2943b22f20acd3d0045bcd8b8 — r8msg — 18:51  1 user, load averages: 1.23 1.92 2.00 — Fri Nov 27 23:51:19 UTC 2026 to Fri Nov 27 23:51:19 UTC 2026 — exit status 0.

480-r8-message-check.log · SHA-256 3d25ccd0a654d4a859dfd5033434fbf726356598c4e60b1298ec26e91da6a031 — zsh /private/tmp/m3-build.U6WP3RU0/check-message.zsh /private/tmp/m3-build.U6WP3RU0/message-8 — 18:51  1 user, load averages: 1.23 1.92 2.00 — Fri Nov 27 23:51:19 UTC 2026 to Fri Nov 27 23:51:19 UTC 2026 — exit status 0.

481-r8-stage.log · SHA-256 0f185c6550ea3e7303d98172e52d7b9b3e02d62eb20a26338cc27e8cc00e246e — git -C tui add scripts/phase3b/m3-evidence.tsx docs/verification/phase-3b-m3-evidence.md — 18:51  1 user, load averages: 1.23 1.92 2.00 — Fri Nov 27 23:51:19 UTC 2026 to Fri Nov 27 23:51:19 UTC 2026 — exit status 0.

482-r8-commit.log · SHA-256 c17436e7369de3d1c36f4a24e5e516e60ff3da0ea9faaadc73ecbd2dbf40e6d4 — git -C tui commit -F /private/tmp/m3-build.U6WP3RU0/message-8 — 18:51  1 user, load averages: 1.21 1.90 1.99 — Fri Nov 27 23:51:27 UTC 2026 to Fri Nov 27 23:51:27 UTC 2026 — exit status 0.

483-full-start.log · SHA-256 739e0e26af1ca1fbb907fcde4b3aa936bb7dbf2c9ce0cd4b9226b2be0833d3fc — before_full — 18:51  1 user, load averages: 1.21 1.90 1.99 — Fri Nov 27 23:51:27 UTC 2026 to Fri Nov 27 23:51:27 UTC 2026 — exit status 0.

484-full-runtime.log · SHA-256 e2417c7baae8e02828bc9e8e83d32d4418408d115fe9720bb7153309d987a8a5 — Full command in cited source — 18:51  up 6 days, 10:19, 1 user, load averages: 1.58 1.93 2.00 — Fri Nov 27 23:51:54 UTC 2026 to Fri Nov 27 23:51:55 UTC 2026 — exit status 0.

485-full-install.log · SHA-256 ad1217668b20b6b8c4bf0eeaff33c58ceb8796456910089d2ba6ff08f83d5894 — Full command in cited source — 18:51  up 6 days, 10:19, 1 user, load averages: 1.58 1.93 2.00 — Fri Nov 27 23:51:56 UTC 2026 to Fri Nov 27 23:51:56 UTC 2026 — exit status 0.

486-full-install-state.log · SHA-256 4ca3f763747361e7a9cee602fabe293a01c78895974f3db81a2f7f8010425cb3 — check_install — 18:51  1 user, load averages: 1.58 1.93 2.00 — Fri Nov 27 23:51:56 UTC 2026 to Fri Nov 27 23:51:56 UTC 2026 — exit status 0.

487-full-typecheck.log · SHA-256 f805a0df3784caba65dafd975fc4c815a1fe400854527468422e27891e3d01dc — Full command in cited source — 18:53  up 6 days, 10:20, 1 user, load averages: 1.57 1.86 1.96 — Fri Nov 27 23:53:15 UTC 2026 to Fri Nov 27 23:53:18 UTC 2026 — exit status 0.

488-full-suite-runtime.log · SHA-256 be71873d9fe96de9fe50e865945f446181834d08793dafc1b5d98516aabfc81f — Full command in cited source — 18:53  up 6 days, 10:20, 1 user, load averages: 1.69 1.88 1.97 — Fri Nov 27 23:53:19 UTC 2026 to Fri Nov 27 23:53:20 UTC 2026 — exit status 0.

489-full-wait.log · SHA-256 4728948643c3ac861c185339cc0a7f2a562d076dc265b80a3845cc184b9dd7b9 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 18:53  up 6 days, 10:20, 1 user, load averages: 1.69 1.88 1.97 — Fri Nov 27 23:53:21 UTC 2026 to Fri Nov 27 23:53:21 UTC 2026 — exit status 0.

490-full-test.log · SHA-256 751253a76038c354e65bd57d5973bb324bf673ad21354d7cae7a7e16fe902f8c — Full command in cited source — 18:53  up 6 days, 10:20, 1 user, load averages: 1.69 1.88 1.97 — Fri Nov 27 23:53:21 UTC 2026 to Fri Nov 27 23:58:01 UTC 2026 — exit status 1.

491-closure-record-index.log · SHA-256 052282577d4f0df54a2829ea2b5706ba0dc2e1c143c07b63ff390c637ed27982 — records_for_closure — 18:53  1 user, load averages: 1.89 1.92 1.98 — Fri Nov 27 23:53:30 UTC 2026 to Fri Nov 27 23:53:30 UTC 2026 — exit status 141.

492-close-earlier-evidence.log · SHA-256 6f06d4574b3f54e332686e57b2a1c9c2625b9930f05279e87ecac75b9ecc9224 — earlier_evidence — 18:53  1 user, load averages: 1.82 1.90 1.98 — Fri Nov 27 23:53:36 UTC 2026 to Fri Nov 27 23:53:36 UTC 2026 — exit status 0.

493-list-compare-script.log · SHA-256 3311a3d07bc0282c5862cb66a5d37d66dbcea9169cc657128f2ef795acb2ccf9 — make_compare — 18:53  1 user, load averages: 2.10 1.96 1.99 — Fri Nov 27 23:53:59 UTC 2026 to Fri Nov 27 23:53:59 UTC 2026 — exit status 0.

494-document-sources.log · SHA-256 65132c207305129deebd64b2c7820986ded4893eb7ac2937d3a3b2a2b5fd9836 — doc_sources — 18:54  1 user, load averages: 2.00 1.94 1.99 — Fri Nov 27 23:54:15 UTC 2026 to Fri Nov 27 23:54:15 UTC 2026 — exit status 0.

495-path-check-inputs.log · SHA-256 315715cfc03f53f6c4877c3dbfbd43956ff2d060654b80cd012c464265d9e4af — gate_sources — 18:54  1 user, load averages: 1.63 1.86 1.96 — Fri Nov 27 23:54:32 UTC 2026 to Fri Nov 27 23:54:32 UTC 2026 — exit status 0.

496-full-progress.log · SHA-256 deeab44d7edf464a0bc3c092056d4738bbf674d9fc028571d31b24f0e8f0d2bb — full_progress — 18:54  1 user, load averages: 1.97 1.93 1.98 — Fri Nov 27 23:54:46 UTC 2026 to Fri Nov 27 23:54:46 UTC 2026 — exit status 0.

497-import-check-script.log · SHA-256 bf2ff188ba00e911644a2e330f6e2c7160b30c23a23521d69190d20f9a940f9a — write_import_audit — 18:55  1 user, load averages: 1.45 1.81 1.94 — Fri Nov 27 23:55:09 UTC 2026 to Fri Nov 27 23:55:09 UTC 2026 — exit status 0.

498-break-formats.log · SHA-256 f5f547e0b53f58e53328fb762074ce64285ee63811f0a22870134a7f2dad9fdc — break_samples — 18:55  1 user, load averages: 1.55 1.81 1.93 — Fri Nov 27 23:55:38 UTC 2026 to end UTC unavailable — exit status 127.

499-break-formats-corrected.log · SHA-256 ddc024d5f9fc653411bdd7db462942cd2a5effcd376dad5345a6854497a22323 — break_samples — 18:55  1 user, load averages: 1.39 1.76 1.91 — Fri Nov 27 23:55:45 UTC 2026 to Fri Nov 27 23:55:45 UTC 2026 — exit status 0.

500-report-helper.log · SHA-256 5886738e0c4003ac18c10aa888ca6d9e8a091d73dba908ebe17c754c57d22f1e — make_record_helpers — 18:56  1 user, load averages: 1.69 1.79 1.92 — Fri Nov 27 23:56:23 UTC 2026 to Fri Nov 27 23:56:23 UTC 2026 — exit status 0.

501-protected-path-list.log · SHA-256 416519e25f02fa655fb61af892e63885e728a65e5e9358ccc9c1f7c74c6569b9 — plan_protected — 18:56  1 user, load averages: 1.67 1.78 1.91 — Fri Nov 27 23:56:35 UTC 2026 to Fri Nov 27 23:56:35 UTC 2026 — exit status 0.

502-change-inventory.log · SHA-256 726807aeba4e9b929cafd7238f88e60b8186181d1ca55fd01735260d98d34f45 — inspect_diffs_for_report — 18:57  1 user, load averages: 1.62 1.77 1.90 — Fri Nov 27 23:57:04 UTC 2026 to Fri Nov 27 23:57:04 UTC 2026 — exit status 0.

503-requirement-account.log · SHA-256 b24eb4bc9df3f64c5f7243f95f838ce0f00cf7df2cbbd9ca271e2a1ba4041ccd — make_account — 18:57  1 user, load averages: 1.97 1.85 1.92 — Fri Nov 27 23:57:32 UTC 2026 to Fri Nov 27 23:57:32 UTC 2026 — exit status 0.

504-deviation-record.log · SHA-256 d24f9b32dde2217e60bdb6ef750b0bcd8ca4f90f34138f401f009ac95b31a159 — make_deviation_record — 18:58  1 user, load averages: 1.81 1.86 1.92 — Fri Nov 27 23:58:15 UTC 2026 to Fri Nov 27 23:58:15 UTC 2026 — exit status 0.

505-full-failure-cause.log · SHA-256 b30acf4e31e50a3bc578434657003b2295cb99418085d083ed1fd72ae865f59d — full_failure — 18:58  1 user, load averages: 1.74 1.84 1.92 — Fri Nov 27 23:58:23 UTC 2026 to Fri Nov 27 23:58:23 UTC 2026 — exit status 0.

506-chaos-scenario-contracts.log · SHA-256 564a2cf3f030ec303be62a80e8defc874a23378245516f6f46d8e874d3a8e4ff — scenario_cause — 18:58  1 user, load averages: 1.55 1.80 1.90 — Fri Nov 27 23:58:32 UTC 2026 to Fri Nov 27 23:58:32 UTC 2026 — exit status 0.

507-golden-and-r5-words.log · SHA-256 b943edf175b8635452e68ab82de883f5818c55f073335e2b8c88f67e6cd46143 — golden_evidence — 18:58  1 user, load averages: 1.74 1.83 1.91 — Fri Nov 27 23:58:38 UTC 2026 to Fri Nov 27 23:58:38 UTC 2026 — exit status 0.

508-exact-fixture-conflict.log · SHA-256 f646e99fd3d4fead9eb45ed5f8574e01720aaa4bfc8fd472b9d201754bf60a0e — exact_conflict — 18:59  1 user, load averages: 1.32 1.72 1.87 — Fri Nov 27 23:59:07 UTC 2026 to Fri Nov 27 23:59:07 UTC 2026 — exit status 0.

509-full-halt-state.log · SHA-256 24b1c88dce62e0ec6475beb9b38f73b1ea2fb19c7164d04f7064f8d3a70644d0 — halt_state — 18:59  1 user, load averages: 1.39 1.71 1.86 — Fri Nov 27 23:59:25 UTC 2026 to Fri Nov 27 23:59:25 UTC 2026 — exit status 0.

510-halt-stat.log · SHA-256 c202582cc30713c419927598daa75dd127c348b2b5e8515f2bf6909c69c35aca — git -C tui diff --stat a7ceccbe96950b63646edc1dc6cc8590c957bf28 HEAD — 18:59  1 user, load averages: 1.39 1.71 1.86 — Fri Nov 27 23:59:25 UTC 2026 to Fri Nov 27 23:59:25 UTC 2026 — exit status 0.

511-halt-diff.log · SHA-256 935d6f89ad4a280452aeaeb91e42b76e61434635ecee7a6c04e326b0d9de1ace — git -C tui diff a7ceccbe96950b63646edc1dc6cc8590c957bf28 HEAD -- . ':(exclude)docs/verification/phase-3b-m3-build-log.md' ':(exclude)docs/verification/phase-3b-m3-evidence.md' — 18:59  1 user, load averages: 1.39 1.71 1.86 — Fri Nov 27 23:59:25 UTC 2026 to Fri Nov 27 23:59:25 UTC 2026 — exit status 0.

512-halt-existing-tests.log · SHA-256 8a7b8ec8fc196dd0af9056ad4c0efe09c7b1bf85b0e9a16e8119455c9b298288 — git -C tui diff --unified=0 a7ceccbe96950b63646edc1dc6cc8590c957bf28 HEAD -- apps/madbridge/test/tui-writers-stage.test.tsx apps/madbridge/test/tui-governance-surfaces.test.tsx apps/madbridge/test/tui-truth-safety.test.tsx test/phase3b/absence.test.tsx test/phase3a/harness-separation.test.ts — 18:59  1 user, load averages: 1.39 1.71 1.86 — Fri Nov 27 23:59:25 UTC 2026 to Fri Nov 27 23:59:25 UTC 2026 — exit status 0.

513-halt-listing-format.log · SHA-256 a2e98512ed65f1759ef5a53b16f6e784f20019e104ca190d0b9e210583c26bb3 — prepare_failed_list — 18:59  1 user, load averages: 3.17 2.09 1.99 — Fri Nov 27 23:59:39 UTC 2026 to Fri Nov 27 23:59:39 UTC 2026 — exit status 0.

514-halt-test-list.log · SHA-256 1ee65ab39a32a4faa48cf9bb9aea3f8e935638be0c160bf079dcd1148b6d2c0b — python3 /private/tmp/m3-build.U6WP3RU0/compare.py list logs/490-full-test.log — 18:59  1 user, load averages: 3.17 2.09 1.99 — Fri Nov 27 23:59:39 UTC 2026 to Fri Nov 27 23:59:39 UTC 2026 — exit status 0.

515-halt-test-comparison.log · SHA-256 c4efb5496aaa9bdc09f1ea44f8c44e0677580fb8f70169a25f8c97bea3f2a250 — python3 /private/tmp/m3-build.U6WP3RU0/compare.py halt logs/490-full-test.log — 18:59  1 user, load averages: 3.17 2.09 1.99 — Fri Nov 27 23:59:39 UTC 2026 to Fri Nov 27 23:59:39 UTC 2026 — exit status 0.

516-halt-report-writer.log · SHA-256 5c2efd7cdbeded7020f86e4d68cc0d960c4fe44081ccf97b41cf1735ad450f1b — prepare_halt — 19:00  1 user, load averages: 2.66 2.24 2.06 — Sat Nov 28 00:00:55 UTC 2026 to Sat Nov 28 00:00:55 UTC 2026 — exit status 0.

517-write-halt-report.log · SHA-256 bf64fbca0dae70be355a5bc73494d929a9b07f63ed314ae0d07327d188559175 — python3 /private/tmp/m3-build.U6WP3RU0/halt-four.py — 19:01  1 user, load averages: 2.45 2.20 2.05 — Sat Nov 28 00:01:02 UTC 2026 to Sat Nov 28 00:01:12 UTC 2026 — exit status 1.

518-correct-report-excerpt.log · SHA-256 461ce3b334a37dd3e6a7b00ab18f7b7dab96ec53c337b1bbc0f8aacdd1ab5656 — fix_halt_shape — 19:01  1 user, load averages: 2.39 2.21 2.05 — Sat Nov 28 00:01:24 UTC 2026 to Sat Nov 28 00:01:24 UTC 2026 — exit status 0.

519-write-halt-report.log · SHA-256 1942e402f6519b32368e6262cd4417e2d4488d6b861833af10103e3932ac1bf8 — python3 /private/tmp/m3-build.U6WP3RU0/halt-four.py — 19:01  1 user, load averages: 2.39 2.21 2.05 — Sat Nov 28 00:01:24 UTC 2026 to Sat Nov 28 00:01:34 UTC 2026 — exit status 0.

520-halt-report-receipt.log · SHA-256 1ecec098e58df58d9f8fffa982be1224fcb6403f5999e21c477090b9b6f666b9 — verify_halt_report — 19:01  1 user, load averages: 2.09 2.16 2.04 — Sat Nov 28 00:01:47 UTC 2026 to Sat Nov 28 00:01:47 UTC 2026 — exit status 0.

521-resume-prompt-hashes.log · SHA-256 4c8d49253595d7c2803cb2aa133a5b7e0ac08c3dab81a4d89ba00af47a6767d2 — check_prompt_hashes — 19:35  1 user, load averages: 2.33 2.38 2.71 — Sat Nov 28 00:35:10 UTC 2026 to Sat Nov 28 00:35:10 UTC 2026 — exit status 0.

522-resume-prompt-files.log · SHA-256 26224e9b1b8e618c88c2e99e09ca3ed3cbf8e04f8892c26daa02fdad8427d300 — ls -A prompt — 19:35  1 user, load averages: 2.91 2.50 2.74 — Sat Nov 28 00:35:38 UTC 2026 to Sat Nov 28 00:35:38 UTC 2026 — exit status 0.

523-resume-prompt-list.log · SHA-256 861d99cdab5ea2b7ac5dd9a7a7f7978a83a4d76582c6b8cddbe3468496d34aa7 — cat prompt/SHA256.txt — 19:35  1 user, load averages: 2.91 2.50 2.74 — Sat Nov 28 00:35:38 UTC 2026 to Sat Nov 28 00:35:38 UTC 2026 — exit status 0.

524-resume-governed-version.log · SHA-256 eb43324dccfb19867d03f1310c70b924fe0ff3100c66dd4e7cabba2274947ac4 — /Users/michaeldaley/builds/codex-governed-0.167.0/node_modules/.bin/codex --version — 19:35  1 user, load averages: 2.91 2.50 2.74 — Sat Nov 28 00:35:38 UTC 2026 to Sat Nov 28 00:35:38 UTC 2026 — exit status 0.

525-resume-head.log · SHA-256 1d7625325782e586b5458812e9c436fb62db72ec3cf2f535ea7b2df57453489d — git -C tui rev-parse HEAD — 19:35  1 user, load averages: 2.91 2.50 2.74 — Sat Nov 28 00:35:38 UTC 2026 to Sat Nov 28 00:35:38 UTC 2026 — exit status 0.

526-resume-branch.log · SHA-256 b7866e0372924c3450dad4ad7b296d2911ce4ab2ef0fd252aa72cc92a92ad1a0 — git -C tui branch --show-current — 19:35  1 user, load averages: 2.91 2.50 2.74 — Sat Nov 28 00:35:38 UTC 2026 to Sat Nov 28 00:35:38 UTC 2026 — exit status 0.

527-resume-worktree.log · SHA-256 5089f6297fae100b2120e2c0df40be30c37dd7e4994bbc6fd95555154d266abc — git -C tui status --porcelain --untracked-files=all — 19:35  1 user, load averages: 2.91 2.50 2.74 — Sat Nov 28 00:35:38 UTC 2026 to Sat Nov 28 00:35:38 UTC 2026 — exit status 0.

528-resume-stash.log · SHA-256 ecd43ca03b90b171b81453c50c3bbd9557f77672e295b0ce1a3a1ff46d170d71 — git -C tui stash list — 19:35  1 user, load averages: 2.91 2.50 2.74 — Sat Nov 28 00:35:38 UTC 2026 to Sat Nov 28 00:35:38 UTC 2026 — exit status 0.

529-resume-pr-files.log · SHA-256 026c9a98ef3162c9f80557915e7a52c9f0788a8a6b22ae5caf5fe934f70fcf47 — ls -A pr — 19:35  1 user, load averages: 2.91 2.50 2.74 — Sat Nov 28 00:35:38 UTC 2026 to Sat Nov 28 00:35:38 UTC 2026 — exit status 0.

530-resume-report-hashes.log · SHA-256 5743ee17676000dee591968a520c511ffa4b13e6c3f7dd561403bc65bf7140cf — pr_hashes — 19:35  1 user, load averages: 2.91 2.50 2.74 — Sat Nov 28 00:35:38 UTC 2026 to Sat Nov 28 00:35:38 UTC 2026 — exit status 0.

531-resume-log-inventory.log · SHA-256 4656f74778a60ee9f76e81cd15f56837b500425962adff5d0c66470ec62202cf — check_logs — 19:35  1 user, load averages: 2.91 2.50 2.74 — Sat Nov 28 00:35:38 UTC 2026 to Sat Nov 28 00:35:38 UTC 2026 — exit status 0.

532-resume-evidence-files.log · SHA-256 42f5717d028c694259591290e2a30f09a255f7bb93c98f349625d9a2c0a2cdf4 — ls -A evidence — 19:35  1 user, load averages: 2.91 2.50 2.74 — Sat Nov 28 00:35:38 UTC 2026 to Sat Nov 28 00:35:38 UTC 2026 — exit status 0.

533-resume-evidence-hashes.log · SHA-256 0b58ace7bdbe789cdeca3749a577e90f0db3c31865e8b8b149ab64e6510b9952 — check_evidence — 19:35  1 user, load averages: 2.91 2.50 2.74 — Sat Nov 28 00:35:38 UTC 2026 to Sat Nov 28 00:35:38 UTC 2026 — exit status 0.

534-resume-golden-detail.log · SHA-256 5fe60404e6b93d064f37f4be315a6491c510c5da25f175acc57f4a467ca6274b — resume_plan — 19:35  1 user, load averages: 3.16 2.57 2.76 — Sat Nov 28 00:35:48 UTC 2026 to Sat Nov 28 00:35:48 UTC 2026 — exit status 0.

535-grid-runtime.log · SHA-256 607bdaac7eeda469c27524effd9692cc4113c6e47c50225f497da06c2e1a3332 — Full command in cited source — 19:38  up 6 days, 11:06, 1 user, load averages: 2.32 2.38 2.64 — Sat Nov 28 00:38:41 UTC 2026 to Sat Nov 28 00:38:41 UTC 2026 — exit status 0.

536-grid-baseline-wait.log · SHA-256 0849c44634aceec45f038d0459c0b8e0a295c4b653af0a41bbce9d46d453c390 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 19:38  up 6 days, 11:06, 1 user, load averages: 2.32 2.38 2.64 — Sat Nov 28 00:38:43 UTC 2026 to Sat Nov 28 00:39:43 UTC 2026 — exit status 0.

537-grid-baseline.log · SHA-256 efcb506c128ea5cb0d022ba6ae023072d9b287568ef4737b6e0db793ba5ca015 — Full command in cited source — 19:39  up 6 days, 11:07, 1 user, load averages: 1.58 2.17 2.54 — Sat Nov 28 00:39:43 UTC 2026 to Sat Nov 28 00:39:45 UTC 2026 — exit status 1.

538-grid-update-runtime.log · SHA-256 00b4686e1812b3c070841c3a1ee71d399a5d19e3c9dcfbda09e22032c55eff21 — Full command in cited source — 19:41  up 6 days, 11:09, 1 user, load averages: 2.29 2.28 2.53 — Sat Nov 28 00:41:40 UTC 2026 to Sat Nov 28 00:41:40 UTC 2026 — exit status 0.

539-grid-update-wait.log · SHA-256 1bc23f029d90fc207d1f924a7cd58ed647b0f31d48cf4bbfe60accf1bd17982d — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 19:41  up 6 days, 11:09, 1 user, load averages: 2.51 2.32 2.54 — Sat Nov 28 00:41:41 UTC 2026 to Sat Nov 28 01:01:43 UTC 2026 — exit status 2.

540-grid-update-wait.log · SHA-256 08b05c02dbfa524b4ee5077a8fc443125e6d1013d554542dc5fddf1c3039b20c — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 20:07  up 6 days, 11:35, 1 user, load averages: 1.90 2.15 2.48 — Sat Nov 28 01:07:32 UTC 2026 to Sat Nov 28 01:07:32 UTC 2026 — exit status 0.

541-grid-update.log · SHA-256 f5f1788804ce744f388472a47606326eae321c1236fc3c44cbc5eb515495138d — Full command in cited source — 20:07  up 6 days, 11:35, 1 user, load averages: 1.90 2.15 2.48 — Sat Nov 28 01:07:32 UTC 2026 to Sat Nov 28 01:07:35 UTC 2026 — exit status 0.

542-governance-grid-diff.log · SHA-256 05e05afae41e4624144b0fc4b30201874924ac5e59cc27bd4d63663360608920 — git -C tui diff -- testdata/tui-chaos/goldens/governance_focus.grid.txt — 20:07  1 user, load averages: 1.46 2.02 2.43 — Sat Nov 28 01:07:58 UTC 2026 to Sat Nov 28 01:07:58 UTC 2026 — exit status 0.

543-layout-grid-diff.log · SHA-256 20a139bf47393a280d619aa8ca2785c4c31b095a332fa1bb76612ee20dee47f6 — git -C tui diff -- testdata/tui-chaos/goldens/layout_resize.grid.txt — 20:07  1 user, load averages: 1.46 2.02 2.43 — Sat Nov 28 01:07:58 UTC 2026 to Sat Nov 28 01:07:58 UTC 2026 — exit status 0.

544-grid-scope.log · SHA-256 20e0bd3ea8351e83e66fa8fcae1dc25654e221363282fe738cae72d30a2c786b — verify_grids — 20:07  1 user, load averages: 1.46 2.02 2.43 — Sat Nov 28 01:07:58 UTC 2026 to Sat Nov 28 01:07:58 UTC 2026 — exit status 0.

545-golden-message.log · SHA-256 b83006b12ee2747062460fce26edb369ac158b7736e88bb531a3bbc315896801 — gridmsg — 20:07  1 user, load averages: 1.46 2.02 2.43 — Sat Nov 28 01:07:58 UTC 2026 to Sat Nov 28 01:07:58 UTC 2026 — exit status 0.

546-golden-message-check.log · SHA-256 7754c8316ed2d95f2a7e2491d79de80ce15cceca5b03567a05dca61fe536da14 — zsh /private/tmp/m3-build.U6WP3RU0/check-message.zsh /private/tmp/m3-build.U6WP3RU0/message-goldens — 20:07  1 user, load averages: 1.46 2.02 2.43 — Sat Nov 28 01:07:58 UTC 2026 to Sat Nov 28 01:07:58 UTC 2026 — exit status 0.

547-golden-stage.log · SHA-256 f1496d4b7589292732db57cb603141226b61983b1f02ed0b49eb4f953b42d623 — git -C tui add testdata/tui-chaos/goldens/governance_focus.grid.txt testdata/tui-chaos/goldens/layout_resize.grid.txt — 20:07  1 user, load averages: 1.46 2.02 2.43 — Sat Nov 28 01:07:58 UTC 2026 to Sat Nov 28 01:07:58 UTC 2026 — exit status 0.

548-golden-commit.log · SHA-256 7a86a7d5a5dec3e0f3127152ac9bd681818cbd16bc5a93afb13e5199a2a871d3 — git -C tui commit -F /private/tmp/m3-build.U6WP3RU0/message-goldens — 20:08  1 user, load averages: 1.42 2.01 2.42 — Sat Nov 28 01:08:04 UTC 2026 to Sat Nov 28 01:08:04 UTC 2026 — exit status 0.

549-repeat-full-start.log · SHA-256 3c69644c3419d85870ce82c65f186ed878905536a53974fd6e8920c766428092 — full_start — 20:08  1 user, load averages: 1.42 2.01 2.42 — Sat Nov 28 01:08:04 UTC 2026 to Sat Nov 28 01:08:04 UTC 2026 — exit status 0.

550-repeat-runtime.log · SHA-256 68b44fea3246b90df9e5e0170b1f549db73398b172a11a6429841240b4ff9afa — Full command in cited source — 20:08  up 6 days, 11:36, 1 user, load averages: 1.21 1.91 2.37 — Sat Nov 28 01:08:28 UTC 2026 to Sat Nov 28 01:08:28 UTC 2026 — exit status 0.

551-repeat-install.log · SHA-256 9a7596b4cd04ecbd9135777d4fae15debea7a7526436a588bcd8fab6a1c03967 — Full command in cited source — 20:08  up 6 days, 11:36, 1 user, load averages: 1.21 1.91 2.37 — Sat Nov 28 01:08:29 UTC 2026 to Sat Nov 28 01:08:30 UTC 2026 — exit status 0.

552-repeat-install-state.log · SHA-256 1243017ae884946badd3ed809501adce52eb5f8ebbce433ad15fb6e87897064d — check_install — 20:08  1 user, load averages: 1.21 1.91 2.37 — Sat Nov 28 01:08:30 UTC 2026 to Sat Nov 28 01:08:30 UTC 2026 — exit status 0.

553-repeat-typecheck.log · SHA-256 148c427586e504b1cecd21ff99752d775ffd4d5530b0892c66529b3d3a027740 — Full command in cited source — 20:08  up 6 days, 11:36, 1 user, load averages: 1.21 1.91 2.37 — Sat Nov 28 01:08:31 UTC 2026 to Sat Nov 28 01:08:34 UTC 2026 — exit status 0.

554-repeat-suite-runtime.log · SHA-256 7761decbe9f497838f3652a306fa95eb4fe928c6d0f18f3f49e2b020ef7995d5 — Full command in cited source — 20:09  up 6 days, 11:36, 1 user, load averages: 3.73 2.60 2.61 — Sat Nov 28 01:09:12 UTC 2026 to Sat Nov 28 01:09:12 UTC 2026 — exit status 0.

555-repeat-full-wait.log · SHA-256 e41e7e2d4de156313aebd54b55e1ca5e29e51f0ef574b6e8f1278935e2edfd9a — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 20:09  up 6 days, 11:36, 1 user, load averages: 3.47 2.58 2.60 — Sat Nov 28 01:09:24 UTC 2026 to Sat Nov 28 01:11:54 UTC 2026 — exit status 0.

556-repeat-full-test.log · SHA-256 48bdddc7f99479007ad42d1ca05f97af63ffcba85f4dde7b6195ab6a3ebb9cf1 — Full command in cited source — 20:11  up 6 days, 11:39, 1 user, load averages: 1.62 2.29 2.49 — Sat Nov 28 01:11:54 UTC 2026 to Sat Nov 28 01:16:34 UTC 2026 — exit status 0.

557-closure-paths.log · SHA-256 a1aa68db7a4657aff9caef0ffa441aae8c838b3f7b7e4e713ae56ffa6e85e10d — closure_inputs — 20:12  1 user, load averages: 1.96 2.30 2.48 — Sat Nov 28 01:12:49 UTC 2026 to Sat Nov 28 01:12:49 UTC 2026 — exit status 0.

558-closure-functions.log · SHA-256 7daf2ec4a476fcb411eee5adf72ae7cff7315efd9db8fbff774e66f458ddf8c3 — symbol_sources — 20:12  1 user, load averages: 2.05 2.31 2.48 — Sat Nov 28 01:12:57 UTC 2026 to Sat Nov 28 01:12:57 UTC 2026 — exit status 0.

559-review-writing-inputs.log · SHA-256 1897d5ed02603498de6528e6bf1a8c48c781e54703d986a2aa18e56237798f2f — ls -1 /private/tmp/m3-build.U6WP3RU0 — 20:16  1 user, load averages: 2.21 2.12 2.35 — Sat Nov 28 01:16:37 UTC 2026 to Sat Nov 28 01:16:37 UTC 2026 — exit status 0.

560-review-record-writers.log · SHA-256 6eac452394e70eb340bb6b4207389d0f247e0cef78c18beb4b59e91c51d5c8a8 — cat /private/tmp/m3-build.U6WP3RU0/records.py /private/tmp/m3-build.U6WP3RU0/halt-four.py — 20:16  1 user, load averages: 2.04 2.09 2.34 — Sat Nov 28 01:16:40 UTC 2026 to Sat Nov 28 01:16:40 UTC 2026 — exit status 0.

561-review-comparison.log · SHA-256 6df3167eb40df1eb95f791bdfcda6e8f0ccc95330de3b09e54aba3e9e08ad037 — cat /private/tmp/m3-build.U6WP3RU0/compare.py /private/tmp/m3-build.U6WP3RU0/imports.py /private/tmp/m3-build.U6WP3RU0/log.zsh /private/tmp/m3-build.U6WP3RU0/check-message.zsh — 20:16  1 user, load averages: 2.03 2.08 2.34 — Sat Nov 28 01:16:47 UTC 2026 to Sat Nov 28 01:16:47 UTC 2026 — exit status 0.

562-corrected-list.log · SHA-256 1abd04435436d66030109c54b4bf361755026341ccb63e7d009f481a2e33b275 — python3 /private/tmp/m3-build.U6WP3RU0/compare.py list logs/556-repeat-full-test.log — 20:16  1 user, load averages: 1.94 2.06 2.33 — Sat Nov 28 01:16:57 UTC 2026 to Sat Nov 28 01:16:57 UTC 2026 — exit status 0.

563-corrected-comparison.log · SHA-256 9b46579dc0bd813963235d3400254efb43c9749fc010326d99d817db7b1b503a — python3 /private/tmp/m3-build.U6WP3RU0/compare.py compare logs/556-repeat-full-test.log — 20:16  1 user, load averages: 1.94 2.06 2.33 — Sat Nov 28 01:16:57 UTC 2026 to Sat Nov 28 01:16:57 UTC 2026 — exit status 0.

564-corrected-whitespace.log · SHA-256 f25a77e6e0a325309d1a163de28a8005723eecc4c194eced4fe8344279900212 — git -C tui diff --check a7ceccbe96950b63646edc1dc6cc8590c957bf28 HEAD — 20:16  1 user, load averages: 1.94 2.06 2.33 — Sat Nov 28 01:16:57 UTC 2026 to Sat Nov 28 01:16:57 UTC 2026 — exit status 0.

565-corrected-paths.log · SHA-256 05e605262c02d9c3c3ac8da4c2014218f9f2ca7acca5d18da5a20ad177e9bbc9 — git -C tui diff --name-status a7ceccbe96950b63646edc1dc6cc8590c957bf28 HEAD — 20:16  1 user, load averages: 1.94 2.06 2.33 — Sat Nov 28 01:16:57 UTC 2026 to Sat Nov 28 01:16:57 UTC 2026 — exit status 0.

566-corrected-pin.log · SHA-256 04f03f75fc347266b1a86f89d08c2180af3cb46f43557ef4f3761691ae51ccb7 — git -C tui diff a7ceccbe96950b63646edc1dc6cc8590c957bf28 HEAD -- test/phase3a/harness-separation.test.ts — 20:16  1 user, load averages: 1.94 2.06 2.33 — Sat Nov 28 01:16:58 UTC 2026 to Sat Nov 28 01:16:58 UTC 2026 — exit status 0.

567-corrected-protected.log · SHA-256 dc5393cd7708efd498d17827d4e8db96d71402de4fa09bc6226111199b2f9afc — Full command in cited source — 20:16  1 user, load averages: 1.94 2.06 2.33 — Sat Nov 28 01:16:58 UTC 2026 to Sat Nov 28 01:16:58 UTC 2026 — exit status 0.

568-corrected-packages.log · SHA-256 587f4563726f6e33d9201d83571366d6a3273868097f4081251a06fb49e82b67 — git -C tui diff --stat a7ceccbe96950b63646edc1dc6cc8590c957bf28 HEAD -- '*package.json' '*tsconfig*' bun.lock — 20:16  1 user, load averages: 1.95 2.06 2.32 — Sat Nov 28 01:16:58 UTC 2026 to Sat Nov 28 01:16:58 UTC 2026 — exit status 0.

569-corrected-existing.log · SHA-256 196fefe821d4dac228da382b47730b9cd2ff1a50db87c50e6771d7238ec9f165 — git -C tui diff --name-only --diff-filter=M a7ceccbe96950b63646edc1dc6cc8590c957bf28 HEAD -- '*.test.ts' '*.test.tsx' — 20:16  1 user, load averages: 1.95 2.06 2.32 — Sat Nov 28 01:16:58 UTC 2026 to Sat Nov 28 01:16:58 UTC 2026 — exit status 0.

570-corrected-importers.log · SHA-256 4cab012900b125466c0c867f99235bd87de6d019fc0735c39711597a91b9fb68 — python3 /private/tmp/m3-build.U6WP3RU0/imports.py — 20:16  1 user, load averages: 1.95 2.06 2.32 — Sat Nov 28 01:16:58 UTC 2026 to end UTC unavailable — exit status 1 observed at the command, absent from the file.

571-grep-output-format.log · SHA-256 50bf3249eec844040d59c66543e646f1255266d4e4f1dc2a9b043c1c6168394c — python3 - /private/tmp/m3-build.U6WP3RU0/imports.py — 20:17  1 user, load averages: 1.87 2.04 2.32 — Sat Nov 28 01:17:05 UTC 2026 to Sat Nov 28 01:17:05 UTC 2026 — exit status 0.

572-grep-text-mode.log · SHA-256 e13ce6cd6fb7ee80a0925b8b0055f9b6563d14cbe4568268628b3b67803d97b4 — python3 - /private/tmp/m3-build.U6WP3RU0/imports.py — 20:17  1 user, load averages: 1.58 1.98 2.29 — Sat Nov 28 01:17:14 UTC 2026 to Sat Nov 28 01:17:14 UTC 2026 — exit status 0.

573-corrected-importers.log · SHA-256 e61c7d77be7827c50f740372dba5f342ebd5232541fef399e193e5475ec06511 — python3 /private/tmp/m3-build.U6WP3RU0/imports.py — 20:17  1 user, load averages: 1.58 1.98 2.29 — Sat Nov 28 01:17:14 UTC 2026 to Sat Nov 28 01:17:14 UTC 2026 — exit status unrecorded.

574-call-pattern.log · SHA-256 7dc212e0f98a129975960e6569e2139ee77f2ea7a8e7afa05daf87b4c86797d3 — python3 - /private/tmp/m3-build.U6WP3RU0/imports.py — 20:17  1 user, load averages: 1.49 1.94 2.27 — Sat Nov 28 01:17:24 UTC 2026 to Sat Nov 28 01:17:24 UTC 2026 — exit status 0.

575-corrected-importers.log · SHA-256 045f4f192a82fddd534ab15ffd6ae6f9ca3023654dfc98acb107e3298bc58ae2 — python3 /private/tmp/m3-build.U6WP3RU0/imports.py — 20:17  1 user, load averages: 1.49 1.94 2.27 — Sat Nov 28 01:17:24 UTC 2026 to Sat Nov 28 01:17:24 UTC 2026 — exit status 0.

576-corrected-status.log · SHA-256 d37644a8dcd0007ffe40a6aa11810b4a534dd3154bf6692ee7378909eaa52a42 — git -C tui status -sb — 20:17  1 user, load averages: 1.49 1.94 2.27 — Sat Nov 28 01:17:24 UTC 2026 to Sat Nov 28 01:17:24 UTC 2026 — exit status 0.

577-corrected-untracked.log · SHA-256 656a68b79789f0622310d727e3ab3fb666cc9bc3e926acd5758c60d4958f939d — git -C tui ls-files --others --exclude-standard — 20:17  1 user, load averages: 1.49 1.94 2.27 — Sat Nov 28 01:17:24 UTC 2026 to Sat Nov 28 01:17:24 UTC 2026 — exit status 0.

578-corrected-existing-diffs.log · SHA-256 a4156b747abfd99ae609922cc67adb6153ca385bbda62d7480b925f0439168b8 — Full command in cited source — 20:17  1 user, load averages: 1.49 1.94 2.27 — Sat Nov 28 01:17:24 UTC 2026 to Sat Nov 28 01:17:24 UTC 2026 — exit status 0.

579-review-narratives.log · SHA-256 fe0bc11eb02c747820831b221205eb4666b21fbc13e3faaa26726129f4ee7e09 — cat /private/tmp/m3-build.U6WP3RU0/account.txt /private/tmp/m3-build.U6WP3RU0/deviations.txt — 20:17  1 user, load averages: 1.37 1.91 2.26 — Sat Nov 28 01:17:30 UTC 2026 to Sat Nov 28 01:17:30 UTC 2026 — exit status 0.

580-review-scope.log · SHA-256 ab804d0b973b288240e800b0a4fbc5c92b11999e7a3b34ff784dce013e008c92 — sed -n 1,190p logs/557-closure-paths.log — 20:17  1 user, load averages: 1.37 1.91 2.26 — Sat Nov 28 01:17:30 UTC 2026 to Sat Nov 28 01:17:30 UTC 2026 — exit status 0.

581-review-coverage.log · SHA-256 337ff0f844a48f4f3af9c1858feb801c8c177c69166390879e11eb7bf569d78d — Full command in cited source — 20:17  1 user, load averages: 1.37 1.91 2.26 — Sat Nov 28 01:17:30 UTC 2026 to Sat Nov 28 01:17:30 UTC 2026 — exit status 0.

582-source-samples.log · SHA-256 c28b4f59bc8850c43c1016324c9c401c32757d7cd0d25694ea0373f81e700a9c — python3 - — 20:17  1 user, load averages: 1.46 1.91 2.26 — Sat Nov 28 01:17:42 UTC 2026 to Sat Nov 28 01:17:42 UTC 2026 — exit status 0.

583-closure-facts.log · SHA-256 ad1332a5b2c9617028a8400352b98571a907f8bf3ac253e4686fd36965893ced — python3 - — 20:17  1 user, load averages: 1.89 1.98 2.27 — Sat Nov 28 01:17:54 UTC 2026 to Sat Nov 28 01:17:54 UTC 2026 — exit status 0.

584-scope-confirmation.log · SHA-256 e0cc9ae015d088847f8cb3fe35af61e4f7b92d805a7e1df7e3540fa30e52865e — python3 - — 20:18  1 user, load averages: 2.00 2.00 2.28 — Sat Nov 28 01:18:06 UTC 2026 to Sat Nov 28 01:18:06 UTC 2026 — exit status 0.

585-prepare-closing-writer.log · SHA-256 340f423e19eab40b820b5dcbeb6ff29fd21692edea42ece467899dd188c78957 — write_new /private/tmp/m3-build.U6WP3RU0/closing.py — 20:19  1 user, load averages: 1.67 1.93 2.23 — Sat Nov 28 01:19:12 UTC 2026 to Sat Nov 28 01:19:12 UTC 2026 — exit status 0.

586-closing-message.log · SHA-256 a8ad13f90259fcf2153f4fd843f2594e233c252babb710d43fa91d0aacca4fc4 — write_new /private/tmp/m3-build.U6WP3RU0/message-close — 20:19  1 user, load averages: 1.67 1.93 2.23 — Sat Nov 28 01:19:12 UTC 2026 to Sat Nov 28 01:19:12 UTC 2026 — exit status 0.

587-closing-width.log · SHA-256 1259c6fe6ceb724656e6ae455195e31cd74a50384abe2553d4109d710a592e0b — zsh /private/tmp/m3-build.U6WP3RU0/check-message.zsh /private/tmp/m3-build.U6WP3RU0/message-close — 20:19  1 user, load averages: 1.67 1.93 2.23 — Sat Nov 28 01:19:12 UTC 2026 to Sat Nov 28 01:19:12 UTC 2026 — exit status 0.

588-append-closing.log · SHA-256 dbdc5674e1040b1a7e649df8650fc71908f6caebd39846cde38e596246972460 — python3 /private/tmp/m3-build.U6WP3RU0/closing.py 587 — 20:19  1 user, load averages: 1.61 1.91 2.22 — Sat Nov 28 01:19:17 UTC 2026 to Sat Nov 28 01:19:28 UTC 2026 — exit status 1.

589-gate-format.log · SHA-256 1b5712e960af4a4ecd988a3bd2fa4c4f446f36ce4d2513790754213427c291a9 — python3 - — 20:19  1 user, load averages: 1.79 1.94 2.22 — Sat Nov 28 01:19:32 UTC 2026 to Sat Nov 28 01:19:32 UTC 2026 — exit status 0.

590-review-draft-redactions.log · SHA-256 a7175067760fd1ebbbcec50ef16b9cb66b29561f98a4c39117cf77ea2ab71bcb — python3 - — 20:19  1 user, load averages: 1.39 1.84 2.18 — Sat Nov 28 01:19:45 UTC 2026 to Sat Nov 28 01:19:47 UTC 2026 — exit status 0.

591-draft-quotation-gap.log · SHA-256 8ccd74038b04960f04906dd4825b4ffcf9bbbac85a75c6b2c9daf80b3122fe0a — python3 - /private/tmp/m3-build.U6WP3RU0/closing.py — 20:19  1 user, load averages: 1.62 1.88 2.19 — Sat Nov 28 01:19:55 UTC 2026 to Sat Nov 28 01:19:56 UTC 2026 — exit status 0.

592-append-closing.log · SHA-256 b91911504599a21d4b31e89c408e0da90eba9900f23d428bb808a1d736cbc3ce — python3 /private/tmp/m3-build.U6WP3RU0/closing.py 591 — 20:19  1 user, load averages: 1.62 1.88 2.19 — Sat Nov 28 01:19:56 UTC 2026 to Sat Nov 28 01:20:07 UTC 2026 — exit status 0.

593-closing-validation.log · SHA-256 81ee167215af76a4e45cf8404869f5f205f15c762444933974a472e7b8393006 — verify_close — 20:20  1 user, load averages: 1.88 1.92 2.20 — Sat Nov 28 01:20:19 UTC 2026 to end UTC unavailable — exit status 1 observed at the command, absent from the file.

594-verify-prefix-facts.log · SHA-256 13f726a05eb8165f1e13ac058b575bbd179e71a76e131acdf6a145641e4762bc — python3 - — 20:20  1 user, load averages: 1.73 1.89 2.18 — Sat Nov 28 01:20:27 UTC 2026 to Sat Nov 28 01:20:27 UTC 2026 — exit status 0.

595-closing-receipt-addition.log · SHA-256 69b6076f242381c7860a804dcd053b58597df1eb9e38e6965483ca901c1cdca2 — append_receipts — 20:20  1 user, load averages: 1.57 1.84 2.16 — Sat Nov 28 01:20:40 UTC 2026 to Sat Nov 28 01:20:40 UTC 2026 — exit status 0.

596-validate-closing.log · SHA-256 66907d17d6671b38743d82f462a51dfde4c7e69f2d88656e3cbcb6bb8ba9b5d7 — verify_close — 20:20  1 user, load averages: 1.72 1.86 2.17 — Sat Nov 28 01:20:53 UTC 2026 to Sat Nov 28 01:20:53 UTC 2026 — exit status 0.

597-stage-closing.log · SHA-256 b426cbc98ed6b829e841cb57d4c11d813bf4975b9bd7dac522d0b72a731317d0 — git -C tui add docs/verification/phase-3b-m3-build-log.md — 20:20  1 user, load averages: 1.72 1.86 2.17 — Sat Nov 28 01:20:53 UTC 2026 to Sat Nov 28 01:20:53 UTC 2026 — exit status 0.

598-commit-closing.log · SHA-256 edfb3b73c562190b79372ff325c8bf7cf78a2bb4e6cfc50f2600ffd146d2c408 — git -C tui commit -F /private/tmp/m3-build.U6WP3RU0/message-close — 20:20  1 user, load averages: 1.72 1.86 2.17 — Sat Nov 28 01:20:53 UTC 2026 to Sat Nov 28 01:20:53 UTC 2026 — exit status 0.

599-closing-head.log · SHA-256 dafd7424ef50402a505a9974424dcd55c1b3e0b0fbd63dfe3b36be381109bc64 — closing_head — 20:20  1 user, load averages: 1.72 1.86 2.17 — Sat Nov 28 01:20:53 UTC 2026 to Sat Nov 28 01:20:53 UTC 2026 — exit status 0.

600-gate-runtime.log · SHA-256 9b8f048b92cad05e4958dc80513646ceb275858123fda18c286e156eb6568d7c — Full command in cited source — 20:21  up 6 days, 11:48, 1 user, load averages: 1.41 1.76 2.12 — Sat Nov 28 01:21:21 UTC 2026 to Sat Nov 28 01:21:21 UTC 2026 — exit status 0.

601-gate-install.log · SHA-256 83770c88fd7ffacf504d9aa32dc951256c8f6c66a91589ce2b95c731981c4c00 — Full command in cited source — 20:21  up 6 days, 11:49, 1 user, load averages: 1.35 1.74 2.10 — Sat Nov 28 01:21:33 UTC 2026 to Sat Nov 28 01:21:33 UTC 2026 — exit status 0.

602-gate-install-state.log · SHA-256 011b426e0407f0c8b80824d8b0bfda6181b38737c99325276de30d66ee0949a4 — install_state — 20:21  1 user, load averages: 1.21 1.70 2.08 — Sat Nov 28 01:21:41 UTC 2026 to Sat Nov 28 01:21:42 UTC 2026 — exit status 0.

603-gate-typecheck.log · SHA-256 802b2f79aabcf45453d1fdd68cef2ae0310bc9ebbb32d4c450feff304bf7dbfc — Full command in cited source — 20:21  up 6 days, 11:49, 1 user, load averages: 1.23 1.68 2.07 — Sat Nov 28 01:21:54 UTC 2026 to Sat Nov 28 01:21:57 UTC 2026 — exit status 0.

604-gate-suite-runtime.log · SHA-256 e3a577189992c7a74e48f526e33dff8d49d56556b92d73af8cc1d7601d36324a — Full command in cited source — 20:22  up 6 days, 11:50, 1 user, load averages: 1.07 1.56 2.00 — Sat Nov 28 01:22:56 UTC 2026 to Sat Nov 28 01:22:56 UTC 2026 — exit status 0.

607-delivery-format.log · SHA-256 6e5a7d29ab6c4d6881546b22508f0fbb5b702825b386c1af75bccbbf61cc9624 — sed -n 1,260p tui/.github/scripts/attribution-shape-check.sh — 20:23  1 user, load averages: 1.06 1.55 1.99 — Sat Nov 28 01:23:00 UTC 2026 to Sat Nov 28 01:23:00 UTC 2026 — exit status 0.

608-gate-suite-wait.log · SHA-256 32e73689a5447081ec919e460fbfe1117265945eef4e8b5693b0dcabc6d1b934 — zsh /private/tmp/m3-build.U6WP3RU0/quiet.zsh — 20:28  up 6 days, 11:56, 1 user, load averages: 2.70 2.29 2.17 — Sat Nov 28 01:28:39 UTC 2026 to Sat Nov 28 01:29:39 UTC 2026 — exit status 0.

609-gate-suite.log · SHA-256 04c01e982688429dfeb9fdedfe2b09b09419f938f559edab94d9857471c301a8 — Full command in cited source — 20:29  up 6 days, 11:57, 1 user, load averages: 1.91 2.14 2.12 — Sat Nov 28 01:29:39 UTC 2026 to Sat Nov 28 01:34:19 UTC 2026 — exit status 0.

610-final-input-format.log · SHA-256 648cdce05b60b67e6c8e1e98fd8cec1a5088d2659b17fa09379c6260100cf7ed — python3 - — 20:28  1 user, load averages: 2.83 2.33 2.19 — Sat Nov 28 01:28:45 UTC 2026 to Sat Nov 28 01:28:45 UTC 2026 — exit status 0.

611-review-source-labels.log · SHA-256 74d5f05ac440de7bebc0f11865f10fc021a95a1cbd301125784db5866c1ad01d — python3 - — 20:28  1 user, load averages: 2.55 2.28 2.17 — Sat Nov 28 01:28:56 UTC 2026 to Sat Nov 28 01:28:56 UTC 2026 — exit status 0.

612-prepare-delivery-writer.log · SHA-256 43ef3d8f5a46674d3547803fe3253e72e5fd18d6d544fb93f90bc685e2aa4383 — write_new /private/tmp/m3-build.U6WP3RU0/delivery.py — 20:30  1 user, load averages: 2.17 2.17 2.13 — Sat Nov 28 01:30:09 UTC 2026 to Sat Nov 28 01:30:09 UTC 2026 — exit status 0.

613-final-diff-stat.log · SHA-256 5336302a563e2e4a1bf0430e24c8e0a43aea562f526febf21331bc467012dd4f — git -C tui diff --stat a7ceccbe96950b63646edc1dc6cc8590c957bf28 HEAD — 20:30  1 user, load averages: 2.55 2.26 2.16 — Sat Nov 28 01:30:25 UTC 2026 to Sat Nov 28 01:30:25 UTC 2026 — exit status 0.

614-final-code-diff.log · SHA-256 3719ee3fa3ab91402e676d90fb24e2ff42d7e4072cdbc9320343906f0308611d — git -C tui diff a7ceccbe96950b63646edc1dc6cc8590c957bf28 HEAD -- . ':(exclude)docs/verification/phase-3b-m3-build-log.md' ':(exclude)docs/verification/phase-3b-m3-evidence.md' — 20:30  1 user, load averages: 2.55 2.26 2.16 — Sat Nov 28 01:30:25 UTC 2026 to Sat Nov 28 01:30:25 UTC 2026 — exit status 0.

615-final-whitespace.log · SHA-256 65e3051c9354b648587b3303cfd5907d41d06e45cdf4159885a5ecac951f5aa0 — git -C tui diff --check a7ceccbe96950b63646edc1dc6cc8590c957bf28 HEAD — 20:30  1 user, load averages: 2.55 2.26 2.16 — Sat Nov 28 01:30:25 UTC 2026 to Sat Nov 28 01:30:25 UTC 2026 — exit status 0.

616-review-gate-terms.log · SHA-256 db0a53db1529557947707a95d3c2598f873de3c847082b9a2454d9601de964d9 — scope_text — 20:30  1 user, load averages: 2.67 2.29 2.17 — Sat Nov 28 01:30:32 UTC 2026 to Sat Nov 28 01:30:32 UTC 2026 — exit status 0.

617-check-delivery-inputs.log · SHA-256 a63793c84ef38e48c9bf6a28ca153570c2a970288d744b3f83afb8b653b8180b — python3 - — 20:30  1 user, load averages: 2.56 2.28 2.17 — Sat Nov 28 01:30:41 UTC 2026 to Sat Nov 28 01:30:41 UTC 2026 — exit status 1.

618-select-opening-test-table.log · SHA-256 3bccd3375726be1a740a0ad51917000be263bba6c0abc675c0486bb2a4a524e4 — python3 - — 20:30  1 user, load averages: 2.85 2.35 2.20 — Sat Nov 28 01:30:50 UTC 2026 to Sat Nov 28 01:30:50 UTC 2026 — exit status 0.

619-verify-delivery-inputs.log · SHA-256 33299f0cea5cbf89cb1e88750ef301fd622b166baadfae0052400b54a5cde7a3 — python3 - — 20:30  1 user, load averages: 2.85 2.35 2.20 — Sat Nov 28 01:30:50 UTC 2026 to Sat Nov 28 01:30:50 UTC 2026 — exit status 0.

620-final-pin-citations.log · SHA-256 b0a5497bf90b6f34ae8443b5dd04dcaecc6c2a6ef2df76cba1e1001d4f3e994b — python3 - — 20:31  1 user, load averages: 2.94 2.39 2.21 — Sat Nov 28 01:31:01 UTC 2026 to Sat Nov 28 01:31:01 UTC 2026 — exit status 0.

621-prepare-receipt-check.log · SHA-256 9480b31a248301f88cfd58889074d280137eadfdfa8a838dfa4a086ac1670d4a — write_new /private/tmp/m3-build.U6WP3RU0/delivery-check.py — 20:31  1 user, load averages: 2.60 2.34 2.20 — Sat Nov 28 01:31:26 UTC 2026 to Sat Nov 28 01:31:26 UTC 2026 — exit status 0.

622-final-evidence-receipts.log · SHA-256 fc2323f7cc46be4c9dd9dbe0b77ee462aeb010ca9fa78587a361bef45f683117 — audit — 20:31  1 user, load averages: 2.51 2.33 2.20 — Sat Nov 28 01:31:38 UTC 2026 to Sat Nov 28 01:31:38 UTC 2026 — exit status 0.

623-mock-renderer-output.log · SHA-256 2ff63200b0f3db77355656af25680be543aa2bcf1ab33655632eb4cfb5944d3c — python3 - — 20:32  1 user, load averages: 1.86 2.20 2.15 — Sat Nov 28 01:32:25 UTC 2026 to Sat Nov 28 01:32:25 UTC 2026 — exit status 0.

624-final-renderer-note.log · SHA-256 d0cd2ad15b33b5a7de0ad4dda62f150f6b6412db4a2bfe98a0bfd72cc6451d27 — python3 - — 20:32  1 user, load averages: 1.87 2.19 2.15 — Sat Nov 28 01:32:32 UTC 2026 to Sat Nov 28 01:32:32 UTC 2026 — exit status 0.

625-gate-list.log · SHA-256 e84854546da0b83dfa9f0bb50d5094594e9d0f382dda89b5fd14c612669e37eb — python3 /private/tmp/m3-build.U6WP3RU0/compare.py list logs/609-gate-suite.log — 20:34  1 user, load averages: 1.34 1.91 2.05 — Sat Nov 28 01:34:23 UTC 2026 to Sat Nov 28 01:34:23 UTC 2026 — exit status 0.

626-gate-comparison.log · SHA-256 1281f195e04beef896ce22cc2a482ba73779ff74d7efd068d3171ab95b479684 — python3 /private/tmp/m3-build.U6WP3RU0/compare.py compare logs/609-gate-suite.log — 20:34  1 user, load averages: 1.34 1.91 2.05 — Sat Nov 28 01:34:23 UTC 2026 to Sat Nov 28 01:34:23 UTC 2026 — exit status 0.

627-write-pr-files.log · SHA-256 c4a538520d4d3ae34b22c1e1a95c045d3638a117a1b147de1577c5eddfe617e7 — python3 /private/tmp/m3-build.U6WP3RU0/delivery.py pr — 20:34  1 user, load averages: 1.34 1.91 2.05 — Sat Nov 28 01:34:24 UTC 2026 to Sat Nov 28 01:34:24 UTC 2026 — exit status 0.

628-prbody-attribution.log · SHA-256 3dc1a73a017a42313c06515a432d63d31b326325a103ceeadff08e712f95f9e6 — check_prbody — 20:34  1 user, load averages: 1.24 1.88 2.03 — Sat Nov 28 01:34:30 UTC 2026 to Sat Nov 28 01:34:30 UTC 2026 — exit status 0.

629-branch-attribution.log · SHA-256 dae9b885acc01d480938006db7c3db3dc3700e80fbeecfc0f7af46332a20afb2 — check_branch — 20:34  1 user, load averages: 1.24 1.88 2.03 — Sat Nov 28 01:34:30 UTC 2026 to Sat Nov 28 01:34:31 UTC 2026 — exit status 0.

13. Single next Founder decision

The Founder retains the session-record check and the declined R3 execution-principal bridge break at this head before the guarded B22 command pushes the branch and opens a draft. The Founder runs B21 on both certification hosts. Formal review and every real-surface run remain outstanding.
