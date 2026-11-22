FOUNDER_DECISION_REQUIRED

Second halt report · madv-surface admission, offline Phase 1

The resumed bare Bun suite at f73b5649afff86b558978cb76d09132bc0a7396a finished with 2032 pass and 3 fail across 150 files. The three existing harness-separation tests reject the changed registry’s exact-byte digest. DEC-20261121-02 B5 item 3 and Addendum 1 do not authorize editing that digest in test/phase3a/harness-separation.test.ts. B12 and DEC-20261023-01 B4 require a Founder ruling. The working tree is clean.

1. Harness, identity and runtime

Governed Codex, OpenAI GPT-6. The exact model identifier, effort, service tier and session ID were not shown. The agent was /root in Default collaboration mode, role builder, actor session:codex/3b-m0-admission-r1, execution surface codex. The host context named zsh, 2026-11-21 and America/New_York. The filesystem was workspace-write with restricted network. The Founder identified approval as on-request and reported an empty MCP server list. A separate approval policy value and reviewer ID were not displayed.

The visible functions were wait, request_user_input, request_user_input_async, send_message_to_user_async and exec. The nested catalog included apply_patch, exec_command, write_stdin, clock__curr_time and the six names of Addendum 2 B4. The clock namespace exposed sleep. The collaboration namespace exposed followup_task, interrupt_agent, list_agents, send_message and wait_agent, in addition to its member among the six names of Addendum 2 B4. The deferred harness namespace exposed create_thread, create_worktree, fork_thread, get_worktree_creation_status, list_archived_threads, list_threads, list_worktrees, read_thread, send_message_to_thread, set_thread_archived, set_thread_title and wait_threads. The additional top-level function send_message_to_user_async was reported and unused. The model record of DEC-20261112-02 B2 awaits the Founder's check.

The Founder launched the governed session on-request and reported an empty MCP server list. At resumption the harness showed workspace-write, per-command approvals and no independent approval-mode or reviewer identifier. Only functions.exec, its exec_command and write_stdin, and functions.wait were called. No barred call was made. No exec input or command contained the six names of Addendum 2 B4 or evaluated stored or string-loaded code. The Founder’s session record remains the independent check.

logs/001-cli-version.log · SHA-256 4177ccbd71226a743f8d562eb04ac791599205ce83fb0fb082893afec986f2f0
14:31  8 users, load averages: 1.60 2.55 2.55  exit=0

WARNING: proceeding, even though we could not create PATH aliases: Operation not permitted (os error 1)
codex-cli 0.167.0

logs/270-resume-cli.log · SHA-256 7a120e5c25a2df263ab31eae480a4c74d74057c656bdf629fc11acca712a1144
22:08  8 users, load averages: 3.29 2.27 1.96  exit=0

WARNING: proceeding, even though we could not create PATH aliases: Operation not permitted (os error 1)
codex-cli 0.167.0

logs/005-user-name.log · SHA-256 c8236b701e2cd8fa2f88faf7997e82486acb0f9547d104f6e0b70b7b7e77ce62
14:31  8 users, load averages: 1.47 2.51 2.53  exit=0

daley40-lab

logs/006-user-email.log · SHA-256 4249d689e095e6781ce42f7c27ed6d2cfb1162ff72c3da3f379702664c737285
14:31  8 users, load averages: 1.47 2.51 2.53  exit=0

293512385+daley40-lab@users.noreply.github.com

logs/007-runtime.log · SHA-256 1f36c92027e3092358d7bc85c5322dbf1b0fab0bbfcdc3213e05ea438322c425
14:31  up  5:59, 8 users, load averages: 1.46 2.47 2.52  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/047-baseline-runtime.log · SHA-256 7e64125fca3d2b20f594b5a030934b58927d5cf304b05add00f69035816a27f8
14:38  up  6:05, 8 users, load averages: 1.41 1.75 2.14  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/055-baseline-suite-runtime.log · SHA-256 8a8698a19fad5f5ece629af1e0e9cbdbb59868e02dad42f46b2cb5bbcaa93520
14:40  up  6:08, 8 users, load averages: 1.36 1.55 1.99  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/085-r1-runtime.log · SHA-256 d9548863ffcec2cc41b4487b62439ba6957ecfa00628a467f1e6f4894e5b7234
17:07  up  8:34, 4 users, load averages: 6.44 2.67 1.95  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/110-break-1-runtime.log · SHA-256 74140c43ba313761c284effc9d6b1b69548bbc33c6cd68e7a8ac7e77816d8dd7
17:34  up  9:01, 4 users, load averages: 3.47 2.39 2.19  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/116-break-2-runtime.log · SHA-256 470c9a715951bc2cd49afc441e9568e9d2499391c1abb3edd44d45e91ce2a0de
18:30  up  9:58, 5 users, load averages: 2.59 2.58 2.65  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/131-r2-runtime.log · SHA-256 37a7266d8af5cd59e1c4b892869536bc2912e6ff6e81cfd7963e5efab29e4b7e
19:30  up 10:58, 5 users, load averages: 6.85 4.38 2.88  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/141-break-3-runtime.log · SHA-256 0ad35e2b3493ac82a40490baca1d4ed341c3531b1240e856b8ffaec4bf6fad03
20:02  up 11:30, 7 users, load averages: 1.74 1.60 1.80  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/147-break-4-runtime.log · SHA-256 f55dac7839cf59cd8183496ee8ae03be09ec9e9347c05650195bc0cb76d5e8d0
20:03  up 11:30, 7 users, load averages: 1.76 1.61 1.80  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/153-break-5-runtime.log · SHA-256 1d605e89a28f8ff471c6fb1a1241376c2d6c171a4392227f5fcf97294f8b9d46
20:03  up 11:30, 7 users, load averages: 1.86 1.63 1.81  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/159-break-6-runtime.log · SHA-256 1d605e89a28f8ff471c6fb1a1241376c2d6c171a4392227f5fcf97294f8b9d46
20:03  up 11:30, 7 users, load averages: 1.86 1.63 1.81  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/165-break-7-runtime.log · SHA-256 66c939f40129c1e86ff44498e903091b09c05b18f897881f8a8174d9b5241e26
20:03  up 11:30, 7 users, load averages: 1.71 1.60 1.80  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/177-r3-runtime.log · SHA-256 9174e6a2bfc15e679a1ccaf8b73fff0f35aa33e55c3affd18caaae8693fd4564
20:06  up 11:34, 8 users, load averages: 2.10 2.21 2.04  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/183-break-8-runtime.log · SHA-256 7c841ee430321137bdf3b0aa777dda83434d60eec621d157e309aa8595244fc3
20:09  up 11:37, 8 users, load averages: 1.41 1.91 1.94  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/193-break-9-runtime.log · SHA-256 0980a76c72c4fdad856bbb462889e412c2b04d3da9bfd154dbc80e09d3bef454
20:13  up 11:41, 8 users, load averages: 1.42 1.85 1.91  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/203-break-10-runtime.log · SHA-256 d05179b109195f64976d9be9f0fceb3d8e35fa1905f9ce344c25ec6647390eb1
20:14  up 11:41, 8 users, load averages: 1.30 1.79 1.89  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/225-full-runtime.log · SHA-256 cbe4a08738ed8f0b29dff8d8a54da933890f411247fbeddbd966478c051c06c5
20:15  up 11:42, 8 users, load averages: 1.16 1.66 1.83  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/244-repeat-runtime.log · SHA-256 7477bc0db407a1e1867a138ec101e200d5b384622ce47538ba06b57224ae9b86
20:20  up 11:48, 8 users, load averages: 1.88 1.77 1.82  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/253-repeat-suite-runtime.log · SHA-256 235cb6ddea4d8b0dc42cc82febe211aafc94cdc0d0e4af89f04ecf3135e8aba4
20:36  up 12:04, 8 users, load averages: 4.32 3.79 2.96  exit=1

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
e2984124f1514e1e6bbda20adedbf07a02c443c6a5828853a15c7c7abf78e19f  /Users/michaeldaley/.bun/bin/bun

logs/279-resume-runtime.log · SHA-256 a4422a0f0b9a491bdddf69fb386c398154457a3b3a924469851418520dccdc8c
22:08  up 13:35, 8 users, load averages: 2.93 2.23 1.95  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/282-break-11-runtime.log · SHA-256 d472a3f5c936470b481aae92f6f5ffa6f1cea010de631d9d56929651f8e74bcd
22:09  up 13:36, 8 users, load averages: 2.15 2.14 1.93  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/293-break-12-runtime.log · SHA-256 f6f54c357698ffcf7cda5e24733d1771a6e6a5d6601a95b152c518cb669b5c47
22:09  up 13:36, 8 users, load averages: 1.90 2.09 1.91  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/303-resumed-full-runtime.log · SHA-256 782189ca1e13644c2a8a456042bec98e23ee8bb91715d0ee10e090b9ccfa9459
22:12  up 13:40, 8 users, load averages: 7.40 3.56 2.48  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/311-resumed-suite-runtime.log · SHA-256 4628b3e8cb4842a119bcc753e2b2859e129171d9eb29b51ec651b486dc3b25ed
22:12  up 13:40, 8 users, load averages: 6.64 3.53 2.48  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

2. Workspace and preconditions

From /Users/michaeldaley/builds/m0-admission-r1 on build/3b-m0-admission-r1. Starting HEAD 0678bd4412d5aaed963ae20f101959bd92f79811. Binding base 403a9f536539b96115aa44ab82436fe55d95b739. Current HEAD f73b5649afff86b558978cb76d09132bc0a7396a.

Precondition 1 passed. The starting HEAD was cached origin/main, the binding base was its first parent and ancestor, and only the admission act differed. No stash, remote admission branch, untracked file, proposed repository artifact or pre-existing output was found. The Founder supplied empty logs, pr and record directories. The inventory after the first commands showed this session’s new logs and empty pr and record directories.

logs/015-ancestry.log · SHA-256 58b5c2f4eb1128b0f6f4a38c012d9512dd805adbc1af1ca6a62be543b498d740
14:32  8 users, load averages: 1.62 2.38 2.48  exit=0

0678bd4412d5aaed963ae20f101959bd92f79811
403a9f536539b96115aa44ab82436fe55d95b739
docs/decisions/DEC-20261121-02-madv-surface-admission.md

logs/016-checkout.log · SHA-256 7e77d470cddad0a1c5f2fa4ab319339fbf9bb66466c0bba2ccb3cd328c302c39

Precondition 2 passed. All 40 authority inputs matched. The acts and addendum showed issued status and the Founder’s signature. The prompt and entire release export matched their manifests.

logs/010-manifests.log · SHA-256 1dd031a2faea261714651de5e04a160fe3fbf70d574b5460006bd9f5355c28ca
14:32  8 users, load averages: 1.73 2.46 2.51  exit=0

abf0766764f3587d9dd3de096749c2aa6249fc55cd455c3563e22c4744f300d2  builder-prompt-m0-admission-codex-macbook.md
b6b9563ed1a2e154b4ef3b4d9ffe7666e6fd9870d82b87486f772d65f7f167aa  DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md
b9ba9bdadf0ca0b5e792ad78fc46f9212d763ad7455fb122343756be2e6fb593  m0-record-r3.ts
d5cf6f00475a1a0dde894937756ddfbe55c9d759bdbcc9da1a7603aa9139abfa  README.md
b8c58a094eb6292994d40092dd7eea027a4f84487ca77e4ad5df96776ae56e07  docs/build-log-0.1.1.md
ca9f9120efb470de1e7dd475328cba8244cda2190865f9c872eed92e6597e018  docs/build-log-0.1.2.md
211825cfc041f87c64550065fc0ab10246392135d38603c7359acfe5c22ffd61  docs/provider-fields.md
fb5f5476e658ce20b344b60e172b52ed0d7f0b3eb7e854392e7d5f03407ddd95  docs/registration-proposal.md
8abc98837cc00f26e570ab89abe01193643dca65baabeb57fb9f2ee333d13362  docs/samples/README.md
0f4d8e13c15e60db01d9ce3566440f206c875749c131e346539857fac285243e  docs/samples/anthropic-model-refused-opencode-go.jsonl
b668391edb778470ed02a6c02be0e6c73366defea992f48fd5a488ef0a61d9dc  docs/samples/domain-unresolved-ollama.jsonl
4f1639dd296efa40089cfcabe2225d804232f15b88f4bde42c5844e6d018219b  docs/samples/refused-host-non-plan-kimi.jsonl
6b11fd18c59524786a4b92eb0544d330108aa92257f67416b39e88648fee512a  docs/samples/refused-host-redirect-qwen.jsonl
ed3231cf455436e7496a079f47052536e2c2405f18fe64796799ed9804d9dac4  docs/samples/require-model-mismatch-minimax.jsonl
9f1a567e58fbd370f5fce4ea2e0439234aff3e00aff071d05846e1ee3ea73256  docs/samples/reviewer-turn-mistral.jsonl
e204b8f806300167531f60ec4944f03b8a0951ba50f8a63d813dabaa4b0fb4b6  docs/samples/reviewer-turn-ollama.jsonl
4f89d8c03a8bd672cbf855a042e0f6c79776926e7d55dac9add554706b4352cd  docs/samples/reviewer-turn-opencode-go.jsonl
a04bc1cba803b9fcac7396fe6fa35c1086f30436113186febc47a31edc2c1d49  docs/samples/reviewer-turn-zai.jsonl
56bce10909484a2d480face6c4bd06a04d5b8efce6ce15c6c16ba553809627ef  src/agent.ts
996021abbac3b6172417a9d0136ff663b37f03edea56b5906c5a3748a654d10b  src/auth.ts
b3bd823b5a89780c113ad5547eae36b80075ab505cfa6406d0eee41bc95a7113  src/authstatus.ts
42d87f844132cc780bc863394192af56f1c2ef235f3db3fd17f9a77de5e3057c  src/build.ts
77a9229529ef8fa4c4d200957c8e128e8002a52cc215e8befbe51ffe85acda58  src/cli.ts
a9f3d813f9aeb3b31f2376b6f8ad104199cf73034d07ad160be54435b4b45703  src/domain.ts
0dba33b51c34f9af03fc3fe3c8ce2da33c0b0312da07407cb0ed5fb5cdcb8e1d  src/errors.ts
898d1e5c3551fcd24204ad3c20af90357727eb1487c6c51c2bb65380c192af11  src/events.ts
9faf910315374d98c747ad3e5392aef3be810ab3204e4ec1e14e0d9ea9a9937f  src/http.ts
1b7be871df115cb7b9f93a3a14c272f2dbc9761e1c9d353fddb0884932bf144d  src/main.ts
9400373bbb3067c9a045702b821ebfbe8a57b7cabe2f873f536d2c54adfe333b  src/profiles.ts
0ffe508e75313ba7f67e8a3df128e86d5946eda6b14c8607586f7c4e95ec979b  src/redact.ts
d9096341b5577997ddf17f0ff7ab0c058fba891bd6ceb9938d943a6ded88be28  src/tools.ts
dd1fc28e5813348c8e6485da2c2767252b084e4995a62cd52f899bcceef53a43  src/version.ts
135a237ea2d33164df811e141763a7b28ae6d6d9b48a7a0f25ba19e536854650  src/wire/anthropic.ts
977ff99c21485e329b648661820b4de5c44556f08b365d54e5032b8372a96d64  src/wire/index.ts
b6e881ee6af0f55ea85500fce865e6642f6e7b5a3ff6974d0bbda3a7e7c17dc7  src/wire/ollama.ts
7a1f98fbc90334f6f86b36d7de3d076c8c7896dfc89b84ed4f2bc825f22c00f1  src/wire/openai.ts
1e96bbec0197976ca401c329ebad6bb0335dc76036ada0cd33e767e79cb0f16a  src/wire/types.ts

logs/013-prompt-digests.log · SHA-256 c1072cb93c48fbc96feeef0ebecaaa2d7a08ab4fc5d94f706a1cc4c6e57d45b6
14:32  8 users, load averages: 1.62 2.38 2.48  exit=0

builder-prompt-m0-admission-codex-macbook.md: OK
DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md: OK
m0-record-r3.ts: OK

logs/014-release-digests.log · SHA-256 6d2d9887291fe0fdaa51417d51153055f45a2c05a5279b240595ca7c4d73fba3
14:32  8 users, load averages: 1.62 2.38 2.48  exit=0

README.md: OK
docs/build-log-0.1.1.md: OK
docs/build-log-0.1.2.md: OK
docs/provider-fields.md: OK
docs/registration-proposal.md: OK
docs/samples/README.md: OK
docs/samples/anthropic-model-refused-opencode-go.jsonl: OK
docs/samples/domain-unresolved-ollama.jsonl: OK
docs/samples/refused-host-non-plan-kimi.jsonl: OK
docs/samples/refused-host-redirect-qwen.jsonl: OK
docs/samples/require-model-mismatch-minimax.jsonl: OK
docs/samples/reviewer-turn-mistral.jsonl: OK
docs/samples/reviewer-turn-ollama.jsonl: OK
docs/samples/reviewer-turn-opencode-go.jsonl: OK
docs/samples/reviewer-turn-zai.jsonl: OK
src/agent.ts: OK
src/auth.ts: OK
src/authstatus.ts: OK
src/build.ts: OK
src/cli.ts: OK
src/domain.ts: OK
src/errors.ts: OK
src/events.ts: OK
src/http.ts: OK
src/main.ts: OK
src/profiles.ts: OK
src/redact.ts: OK
src/tools.ts: OK
src/version.ts: OK
src/wire/anthropic.ts: OK
src/wire/index.ts: OK
src/wire/ollama.ts: OK
src/wire/openai.ts: OK
src/wire/types.ts: OK

logs/019-authority-check.log · SHA-256 a5986336fafb9c789b3816f2d64dc10663d22625027ac3104e9287f3926cd8e4
14:32  8 users, load averages: 1.56 2.33 2.46  exit=0

docs/decisions/DEC-20261121-02-madv-surface-admission.md 141ee53275999ba3f31a0b1f66bed93ffb7a80d6f3527cbff31b3885ead44dfe OK
  > **Status:** ISSUED
  — Michael Daley
prompt/DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md b6b9563ed1a2e154b4ef3b4d9ffe7666e6fd9870d82b87486f772d65f7f167aa OK
  > **Status:** ISSUED
  — Michael Daley
prompt/m0-record-r3.ts b9ba9bdadf0ca0b5e792ad78fc46f9212d763ad7455fb122343756be2e6fb593 OK
docs/decisions/DEC-20261115-02-phase-3b-m0.md 5d8bd4a446d8b3120bddbc34dc11a5fdf83e3a07d9efcd04fbd7b8efdad8d22b OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261115-02-addendum-1-m0-paths-and-tests.md 31576960c18a4c9607fca2785e54146df5f740af45b4437dc7f13890abaeca42 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261115-02-addendum-3-phase-1-record-check.md 24f76dbb631d6058e81ccff93d3c9fecb11521b5a876c687ec0da1ee0f9e0a23 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261115-02-addendum-5-retired-id-plugin-and-json.md 666a82b2229272111f4d01b79c6ffba401a53f5236ae50f7f7c6a4b3651cd9ac OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261115-02-addendum-7-ubuntu-identity-run-and-deferral.md f6ed06f7d4f98e8155dfedbcf190eff938caddfabd848c2ecb489f595c7591fb OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261119-01-m0-records-and-merge.md 7076137d68f013705d8872eaf573cb13ee17319b9074bc20248d02a2d6316df2 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261119-03-madv-surface-0.1.2-release.md 6823c07f50567a62abee020de693e192cc43ff47a75871e5bfad5bd16e671d9b OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261121-01-madv-surface-0.1.2-records.md b0b81b4eeb505ee3926fbfb85ff6272c52abf9d89934205bc5633c8fa7bdffbf OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-04-phase-3b-standing-commission.md d373235e424bd7fbe4c1c5b1c5f4954eb1b02165db4e1365d9cfa1533aa93b29 OK
  > **Status:** ISSUED
      — Michael Daley, Date: 2026-11-08
docs/decisions/DEC-20261108-04-addendum-1-corrections.md 90e2f541fd0a232390ca0554067a2de8b37f15c933016eafe40ebde2cd2eff17 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-01-phase-3b-approval.md 319ba65b340696d66a655e21f648fed742a9c38bcbb1d876776abc27a27a9738 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261114-01-madv-surface-release.md 6bffc2c18927b90f4b5042f312947e5d39853ca53404a58a51b4602eb45652b8 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261112-02-model-record.md 3151cb9e178e918f0c07f5a4eb9931fa9d529debedf0ad4d91f5999844883da7 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-03-addendum-2-codex-harness.md e04b54065b0f0bb465b2d14e14a39f3b31f9cb34a874f6f8210a7d7e74a8c1c1 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-03-addendum-3-image-tool.md f2a0ef1063379902935760d9517b68d532cabf6e24699cdebb789681f78ce15e OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-03-addendum-4-sandbox-halt.md e817470aea6be2c176d4ae75856fd793ef982bd28c9eb793df9c9038a5c1dfbc OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-03-addendum-5-own-work.md e86e94a62c7067e4656114afe1713c1478814ffe446d1ffcc8b788accfc3ff3d OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-03-addendum-6-names-in-text.md 24cef0ed5c968aa80ada586e473526d0f4f0b1de1331eba1d5a35051b1254ac9 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-03-addendum-10-second-verdict.md d90d48718bc4ea6056af6f011f797a78eddcfd14e7111f15f823085c4388bca0 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-03-addendum-11-governed-build.md e2d28cbd12485e9025c928403eb7beead9552ee378b023ddf5bc9e18febe00df OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261112-03-addendum-2-gate-repeat.md 829248f1e2557ddbcfd33d6456f7056bfce73a008791cb88caa9660a5d979d29 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-03-phase-3b-h1.md 10cdc674ce746568c963aa2c5c34c95a69d9960ea469438b044bfb5fe4b9e9de OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261113-01-h2-records-and-merge.md 41e27eafc24a2eef238c080d1374b90fbe22d609f4ef5cbb66e07cccb5b347a5 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-02-phase-3b-builder-qualification.md 38ec4066f5c9487547befc81e00b80b69126d9140f1e66c0a8dcb35e5fe815ef OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261102-02-hardening-builds.md 04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261023-01-standing-build-rules.md bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261013-03-tests-4-6-ruling.md 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261104-02-hardening-f-and-task58.md 011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261015-03-m20-checkpoint-closure.md e4148fde243d15508513fbf22b58584c519d1d842ca7fefb016d266bf6f08f61 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261020-01-phase-3a-order-and-records.md e5299202a83ad37e11fd619231422b41fc43779308531b62ae6a5cf06ee3c6b7 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261027-01-m22-execution-authorization.md 86f1374492a833ce87ebdf81293c59e8805c547d8bc29e1aa682b17a769bcd8b OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/PLAN-OPEN-2-environment-allowlists.md b60676aa47b216c36d9080c884650943cdac93dd12109d2864ebcf0eb6887d8c OK
docs/decisions/PLAN-OPEN-3-capability-horizon.md cca3061b91ffc9eb231003f5e5d7c20230f47cf8c2378f6f1241d57309618562 OK
docs/superpowers/plans/2026-09-19-phase-3b-live-tui-integration.md a48bf5457bf17cf5d554e541c5bb3609efacf6ad170ad6e56950b829a4269ccc OK
docs/superpowers/specs/2026-09-19-phase-3b-live-tui-integration-design.md da8f4c8c35f617898368b340d710188686c9dc9faf2b23c4a6b284c1bb4d93fc OK
docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md 472f3179c20f7f41c0e3feb5a65842bf3774cf6df01e8684a3ea86dcd811bce0 OK
AGENTS.md 0879ede2d3b07e137d1f3d5f75c131285277b44e61f1305d3d0d59da64f1dbca OK
items 40 hash mismatches 0

Precondition 3 passed. The original numbered evidence follows. Square-bracketed source lines remain in the complete named logs.

logs/023-registration.log · SHA-256 41d5e4bdc0e084c3bb88208f650370b6f9393796ef9ea3222758cb2472ec33d3
14:33  8 users, load averages: 1.25 2.21 2.41  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

    78	const MADV_SURFACE_REGISTRATION: AdapterRegistrationV1 = deepFreeze({
    79	  surface: parseSurfaceId("madv-surface"),
    80	  executable_name: "madv-surface",
    81	  provider: "minimax",
(lines omitted)
    83	  identity_probe: {
(lines omitted)
    85	    parse: "json",
    86	  },
(lines omitted)
    89	  environment_allowlist_ref: "madv-surface-v1",
    90	  independence_domain: "minimax",
    91	  organization_id: "minimax",
(lines omitted)
    93	    "auth_status_exit_code:1",
    94	    "auth_status.verified:false",
    95	    "system/auth_failed",
    96	    "exit_code:5",
(lines omitted)
    99	    "A provider that misreports its own model remains a limitation.",
   100	    "What the provider retains is the provider's.",
   101	    "Both probes are live calls on the M Plan at every start.",
(lines omitted)
   103	});

logs/021-implementation.log · SHA-256 d9a39819f960941ac7c8d6faf5c45d6781858b8a8160168c6fcd5eaf0992eaa3
14:32  8 users, load averages: 1.56 2.33 2.46  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

     6	export interface MadvContext {
     7	  readonly executionId: string;
     8	  readonly sessionId: string;
     9	  readonly model: string;
(lines omitted)
    11	  readonly provider: string;
    12	  readonly independenceDomain: string;
    13	}
(lines omitted)
    85	  constructor(context: MadvContext, private readonly now: () => number = () => performance.now()) {
(lines omitted)
    87	    this.sentAt = now();
    88	  }
(lines omitted)
   106	  push(chunk: string | Uint8Array): MadvResult {
   107	    if (this.finished) { this.fail("identity_mismatch", "event_after_exit"); return this.snapshot(); }
   108	    this.checkDeadline();
   109	    try {
   110	      this.buffer += typeof chunk === "string" ? chunk : this.decoder.decode(chunk, { stream: true });
   111	      let newline: number;
   112	      while ((newline = this.buffer.indexOf("\n")) >= 0) {
   113	        const line = this.buffer.slice(0, newline); this.buffer = this.buffer.slice(newline + 1);
   114	        if (line.trim()) this.line(line);
   115	      }
   116	      // The largest release tool-result event is capped at 100 KB.
   117	      if (this.buffer.length > 262_144) this.fail("identity_mismatch", "oversized_event");
   118	    } catch { this.fail("identity_mismatch", "malformed_stream"); }
   119	    return this.snapshot();
   120	  }
(lines omitted)
   137	    if (this.state === "init") {
   138	      // B3 item 4: evaluate the first-init predicates in their stated order.
   139	      if (value.type !== "system" || value.subtype !== "init"
   140	        || value.surface !== "madv-surface"
   141	        || typeof value.surface_version !== "string" || !this.context.supportedVersions.includes(value.surface_version)
   142	        || value.profile !== "minimax" || value.provider !== this.context.provider
   143	        || value.endpoint_host !== "api.minimax.io" || value.requested_model !== this.context.model) {
   144	        this.fail("identity_mismatch", "init_predicate"); return;
   145	      }
   146	      this.wireSession = value.session_id; this.state = "waiting";
   147	    } else if (value.type === "model_response") {
   148	      if (this.state !== "waiting" && !(this.state === "tools" && this.tools.size === 0)) { this.fail("identity_mismatch", "event_order"); return; }
   149	      if (typeof value.response_model !== "string" || value.response_model.length === 0) { this.fail("identity_unavailable", "model_field_absent"); return; }
(lines omitted)
   152	      if (value.response_model !== this.context.model
   153	        || value.response_independence_domain !== this.context.independenceDomain
   154	        || value.provider !== this.context.provider || value.profile !== "minimax"
   155	        || value.endpoint_host !== "api.minimax.io" || value.tls_verified_host !== "api.minimax.io") {
   156	        this.fail("identity_mismatch", "response_predicate"); return;
   157	      }
   158	      this.responses++; this.waitingForEvidence = false; this.state = "response"; this.assistantSeen = false;
(lines omitted)
   179	  finish(exitCode: number, signal: string | number | null = null): MadvResult {
   180	    if (!this.finished) {
   181	      try { this.buffer += this.decoder.decode(); } catch { this.fail("identity_mismatch", "malformed_stream"); }
   182	      if (this.buffer.trim()) this.line(this.buffer);
   183	      this.buffer = ""; this.checkDeadline(); this.finished = true;
   184	      if (signal !== null) this.fail("provider_error", "signal");
   185	      switch (exitCode) {
   186	        case 0: break;
   187	        case 5: this.fail("auth_failed", "exit"); break;
   188	        case 6: this.fail("endpoint_refused", "exit"); break;
   189	        case 1: this.fail("provider_error", "exit"); break;
   190	        case 3: this.fail("identity_unavailable", "exit"); break;
   191	        case 7: if (this.failed?.cause !== "domain_unresolved") this.fail("model_refused", "exit"); break;
   192	        case 4: this.fail("identity_mismatch", "exit"); break;
   193	        default: this.fail("provider_error", "unknown_exit");
   194	      }
   195	      if (!this.failed && (this.responses === 0 || this.waitingForEvidence)) this.fail("identity_unavailable", "model_response_missing");
   196	      if (!this.failed && this.tools.size !== 0) this.fail("identity_mismatch", "event_order");
   197	    }
   198	    return this.snapshot();
   199	  }
   200	}
(lines omitted)
   202	  const parser = new MadvSurfaceParser({ executionId: "identity-probe", sessionId: "preflight", model, supportedVersions, provider: "minimax", independenceDomain: "minimax" });
   203	  parser.push(output);
   204	  return parser.finish(exitCode, signal);
   205	}
   206	export function parseMadvAuthReadiness(output: string, exitCode = 0, signal: string | number | null = null): MadvResult {
   207	  const context = { executionId: "auth-probe", sessionId: "preflight" };
   208	  try {
   209	    const value: unknown = JSON.parse(output);
   210	    if (exitCode !== 0 || signal !== null || !object(value)
   211	      || value.loggedIn !== true || value.authMethod !== "plan_key" || value.profile !== "minimax"
   212	      || value.provider !== "minimax" || value.endpointHost !== "api.minimax.io"
   213	      || value.verified !== true || value.verifyMethod !== "read_only_endpoint") return failure(context, "auth_failed", "auth_predicate");
(lines omitted)
   215	  } catch { return failure(context, "auth_failed", "auth_predicate"); }
   216	}

logs/024-supervisor.log · SHA-256 30918564b96df34280772f4ec8ebdc39feb917c3ee30cdb4cd3d29c235f08222
14:33  8 users, load averages: 1.25 2.21 2.41  exit=0

    47	const EXECUTION_MS = 5_000;
    48	const CLEANUP_MS = 1_000;
    49	const GRACE_MS = 500;
    50	const STREAM_LIMIT = 65_536;
(lines omitted)
    90	  const madv = request.registration?.surface === "madv-surface";
    91	  const executionMs = madv ? 30_000 : EXECUTION_MS;
(lines omitted)
   155	      const cleanupStart = rt.now();
   156	      const end = Math.min(cleanupStart + CLEANUP_MS, started + executionMs + CLEANUP_MS);
   157	      if (!exitObserved) { try { process.kill("SIGTERM"); } catch { streamFailure = true; } }
   158	      let completion = await deadline(reaped, Math.min(cleanupStart + GRACE_MS, end));
   159	      if (completion !== "reaped") {
   160	        if (!exitObserved) { try { process.kill("SIGKILL"); } catch { streamFailure = true; } }
   161	        completion = await deadline(reaped, end);
   162	      }
   163	      clean = reason === "identity" && completion === "reaped" && rt.now() <= end;
   164	    }
   165	    if (!clean || request.signal.aborted || streamFailure || oversized || !exitObserved || exitCode !== 0 || signal !== null) return result(false);
(lines omitted)
   168	    const accepted = madv
   169	      ? request.kind === "identity"
   170	        ? parseMadvIdentity(output, request.model, request.supportedVersions).ok
   171	        : parseMadvAuthReadiness(output).ok
   172	      : request.kind === "identity"
   173	        ? parseIdentity(output, request.model, request.supportedVersions)

logs/025-env.log · SHA-256 c568c2fec014e2c5fdbaac2989ddbeb8edd2f77665f84af2bda2616139193023
14:33  8 users, load averages: 1.25 2.21 2.41  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

    15	  "madv-surface-v1": Object.freeze({
    16	    ref: "madv-surface-v1",
(lines omitted)
    18	      { name: "HOME", required: true, secret: false },
    19	      { name: "PATH", required: true, secret: false },
    20	      { name: "SHELL", required: true, secret: false },
    21	      { name: "TERM", required: true, secret: false },
    22	      { name: "TMPDIR", required: true, secret: false },
    23	      { name: "MINIMAX_API_KEY", required: true, secret: true },
    24	      { name: "LANG", required: false, secret: false },
    25	      { name: "LC_ALL", required: false, secret: false },
    26	      { name: "LC_CTYPE", required: false, secret: false },
    27	      { name: "USER", required: false, secret: false },
(lines omitted)
    29	  }),

logs/022-recorded-tests.log · SHA-256 9baa8e3f96d13323540edf913728b90382738a675dab7c9bf119028987bd3a42
14:32  8 users, load averages: 1.56 2.33 2.46  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

     1	import { expect, spyOn, test } from "bun:test";
     2	import { readFileSync } from "node:fs";
     3	import { parseMadvAuthReadiness, parseMadvIdentity } from "../src/index";
     4
     5	// These are the Founder's sanitized recorded bytes, not synthetic streams.
     6	// SANITIZE.txt replaced UUID-shaped session_id values only: MacBook stdout
     7	// 04/05/06/07 has 4/4/4/7 replacements; Ubuntu has 4/7/4/4.
     8	// Capture 03, every stderr and every status has zero replacements.
     9	// No replaced UUID is recovered, and no fixture is normalized for admission.
    10	const model = "MiniMax-M3.1-Flash";
    11	const retired = "MiniMax-M3.1-Flash-Preview";
    12	function fixture(host: string, capture: string) {
    13	  const root = new URL("./fixtures/recorded/" + host + "/", import.meta.url);
    14	  const read = (suffix: string) => readFileSync(new URL(capture + "." + suffix, root), "utf8");
    15	  const fields = new Map(read("status").trimEnd().split("\n").map(line => {
    16	    const equals = line.indexOf("=");
(lines omitted)
    18	  }));
    19	  expect(fields.get("timed_out")).toBe("no");
    20	  expect(read("stderr")).toBe("");
    21	  const exit = Number(fields.get("exit"));
    22	  const signal = fields.get("signal") === "none" ? null : fields.get("signal")!;
    23	  return { output: read("stdout"), exit, signal };
    24	}
    25
(lines omitted)
    27	  test(host + " 03 recorded auth-readiness passes", () => {
    28	    const f = fixture(host, "03");
    29	    expect(parseMadvAuthReadiness(f.output, f.exit, f.signal).ok).toBe(true);
    30	  });
    31	}
(lines omitted)
    36	  test(host + " " + capture + " recorded identity passes for MiniMax-M3.1-Flash", () => {
    37	    const f = fixture(host!, capture!);
(lines omitted)
    39	  });
    40	}
    41	test("ubuntu 05 recorded identity fails closed with provider_error", () => {
    42	  const f = fixture("ubuntu", "05");
(lines omitted)
    44	  expect(result.ok).toBe(false);
    45	  if (result.ok) throw new Error("failed identity was admitted");
    46	  expect(result.cause).toBe("provider_error");
    47	  expect(result.interrupt).toBe("whole_session");
    48	  expect(result.retry).toBe(false);
    49	});
    50
(lines omitted)
    53	    const cause = host === "macbook" ? "provider_error" : "identity_mismatch";
    54	    test(host + " 07 fails closed with " + cause + " for " + requested + " while reporting MiniMax-M3.1-Flash", () => {
    55	      const f = fixture(host, "07");
    56	      const observed = new Array<string>();
    57	      const originalParse = JSON.parse;
    58	      // Failure results intentionally expose no event payload. Observe the
    59	      // values decoded by the adapter without changing or accepting them.
    60	      // Restore this observation seam even when an assertion fails.
    61	      const observer = spyOn(JSON, "parse").mockImplementation((...args: Parameters<typeof JSON.parse>) => {
    62	        const event = originalParse(...args);
    63	        if (event?.type === "model_response") observed.push(event.response_model);
    64	        return event;
    65	      });
    66	      let result: ReturnType<typeof parseMadvIdentity>;
    67	      try {
(lines omitted)
    69	      } finally {
    70	        observer.mockRestore();
    71	      }
    72	      expect(result.ok).toBe(false);
    73	      if (result.ok) throw new Error("retired-id stream was admitted");
    74	      expect(result.cause).toBe(cause);
    75	      expect(result.interrupt).toBe("whole_session");
    76	      expect(result.retry).toBe(false);
(lines omitted)
    78	    });
    79	  }
    80	}

logs/026-base-tests.log · SHA-256 e6c6bef4bbd3384766c0185bca6a74468db03d25d6c397791f01b9935a9969b2
14:33  8 users, load averages: 1.25 2.21 2.41  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

(lines omitted)
HEAD:packages/protocol/test/adapter-registry.test.ts:84:    expect(Object.isFrozen(entry.identity_probe.argv)).toBe(true);
(lines omitted)
HEAD:packages/supervisor/test/madv-preflight.test.ts:65:    requested_model: MODEL, cli_version: "0.1.1", binary_path: join(f.bin, f.reg.executable_name), binary_sha256: digest,
(lines omitted)
HEAD:test/phase3a/evidence-pipeline.test.ts:827:      `madbridge-claude-v5 ${registration.identity_probe.argv.join(" ")} --model ${record.requested_model}`,
HEAD:test/phase3a/harness-separation.test.ts:431:    expect(Object.isFrozen(registration.identity_probe.argv)).toBe(true);
(lines omitted)

logs/029-release-behavior.log · SHA-256 3d71d78d017f91e732eee940d47d2a807322a324c5d0dc37862735c4a6baaa1a
14:33  8 users, load averages: 1.25 2.21 2.41  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

reference/madv-surface/src/agent.ts:166:    tools: tools.map((t) => t.name),
reference/madv-surface/src/agent.ts:224:      tools: messageTools,
reference/madv-surface/src/agent.ts:320:        throw new SurfaceError("provider_error", "unexpected_tool_call");
reference/madv-surface/README.md:13:- Pass `--no-tools` with either role for a text-only run. The initial tool list is empty and every request tells the model to answer in text. Combining it with `--allow-shell` is a usage error (exit 2).
reference/madv-surface/README.md:15:- A tool call in response to a request that offered no tools ends the run before dispatch. The surface emits `system/provider_error` with code `unexpected_tool_call`, writes an error result, and exits 1.
(lines omitted)
reference/madv-surface/README.md:149:| `--no-tools` | Offer no tools for any message. Valid with either role and incompatible with `--allow-shell`. |
(lines omitted)
reference/madv-surface/src/cli.ts:74:  --no-tools                Offer no tools and answer in text. Valid with either role.
reference/madv-surface/src/cli.ts:141:      case "--no-tools":
reference/madv-surface/src/cli.ts:174:  if (noTools && allowShell) throw new UsageError("--no-tools cannot be combined with --allow-shell");

logs/030-fixture-manifest.log · SHA-256 27921c929f74105c664835676c6353a40d0665e35682007ef8be6aacad875b70
14:33  8 users, load averages: 1.25 2.21 2.41  exit=0

fixture	sha256	evidence_path	json-account-identifiers	email-addresses	token-patterns	uuid

Precondition 4 passed. All 30 manifest rows verified. No extra or missing file.

logs/032-fixture-check.log · SHA-256 42f75db7be9474025ca77ff257c1f7c26aa5be690274502716c07daab40c7f45
14:33  8 users, load averages: 1.32 2.12 2.38  exit=0

macbook/03.stdout: OK
macbook/03.stderr: OK
macbook/03.status: OK
macbook/04.stdout: OK
macbook/04.stderr: OK
macbook/04.status: OK
macbook/05.stdout: OK
macbook/05.stderr: OK
macbook/05.status: OK
macbook/06.stdout: OK
macbook/06.stderr: OK
macbook/06.status: OK
macbook/07.stdout: OK
macbook/07.stderr: OK
macbook/07.status: OK
ubuntu/03.stdout: OK
ubuntu/03.stderr: OK
ubuntu/03.status: OK
ubuntu/04.stdout: OK
ubuntu/04.stderr: OK
ubuntu/04.status: OK
ubuntu/05.stdout: OK
ubuntu/05.stderr: OK
ubuntu/05.status: OK
ubuntu/06.stdout: OK
ubuntu/06.stderr: OK
ubuntu/06.status: OK
ubuntu/07.stdout: OK
ubuntu/07.stderr: OK
ubuntu/07.status: OK
30 manifest rows

Precondition 5 passed. Source imports and calls, including lines 168, 169 and 174 of the supplied reader, follow. The full repository-wide inventory is logs/044-all-callers.log · SHA-256 254f8fefd7b1f7cc5f421542e2b1b309c6fa0aca4132119d23f6620d09b497e5.

logs/033-consumers.log · SHA-256 cfa29d8391740c3d84b48b0b4fe96cfa73f635930a508e1594a2334f8435246c
14:33  8 users, load averages: 1.32 2.12 2.38  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

HEAD:bun.lock:105:    "packages/adapter-madv-surface": {
HEAD:bun.lock:106:      "name": "@madventures/adapter-madv-surface",
HEAD:bun.lock:207:        "@madventures/adapter-madv-surface": "workspace:*",
(lines omitted)
HEAD:packages/adapter-madv-surface/package.json:2:  "name": "@madventures/adapter-madv-surface",
HEAD:packages/adapter-madv-surface/src/index.ts:49:export function encodeUserInput(text: string): string {
HEAD:packages/adapter-madv-surface/src/index.ts:69:export class MadvSurfaceParser {
(lines omitted)
HEAD:packages/adapter-madv-surface/src/index.ts:202:  const parser = new MadvSurfaceParser({ executionId: "identity-probe", sessionId: "preflight", model, supportedVersions, provider: "minimax", independenceDomain: "minimax" });
HEAD:packages/adapter-madv-surface/src/index.ts:206:export function parseMadvAuthReadiness(output: string, exitCode = 0, signal: string | number | null = null): MadvResult {
HEAD:packages/adapter-madv-surface/test/parser.test.ts:2:import { encodeUserInput, MadvSurfaceParser, parseMadvIdentity, parseMadvAuthReadiness, type MadvFailureCause } from "../src/index";
HEAD:packages/adapter-madv-surface/test/parser.test.ts:15:    const encoded = encodeUserInput(text);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:21:  const parser = new MadvSurfaceParser(context);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:43:  const parser = new MadvSurfaceParser(context); parser.push(wire(init(), ...example.events));
(lines omitted)
HEAD:packages/adapter-madv-surface/test/parser.test.ts:65:  expect(parseMadvAuthReadiness(JSON.stringify({ ...auth, extra: "not-evidence" })).ok).toBe(true);
(lines omitted)
HEAD:packages/adapter-madv-surface/test/parser.test.ts:69:  expect(parseMadvAuthReadiness(JSON.stringify(auth), 1).ok).toBe(false);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:70:  expect(parseMadvAuthReadiness(JSON.stringify(auth), 0, "SIGTERM").ok).toBe(false);
(lines omitted)
HEAD:packages/adapter-madv-surface/test/parser.test.ts:79:  let now = 0; const parser = new MadvSurfaceParser(context, () => now);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:86:  let now = 0; const parser = new MadvSurfaceParser(context, () => now);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:92:  const parser = new MadvSurfaceParser(context);
(lines omitted)
HEAD:packages/adapter-madv-surface/test/parser.test.ts:114:  const parser = new MadvSurfaceParser(context);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:120:  const parser = new MadvSurfaceParser(context);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:126:  const parser = new MadvSurfaceParser(context);
(lines omitted)
HEAD:packages/adapter-madv-surface/test/recorded.test.ts:3:import { parseMadvAuthReadiness, parseMadvIdentity } from "../src/index";
HEAD:packages/adapter-madv-surface/test/recorded.test.ts:29:    expect(parseMadvAuthReadiness(f.output, f.exit, f.signal).ok).toBe(true);
(lines omitted)
HEAD:packages/adapter-madv-surface/test/recorded.test.ts:66:      let result: ReturnType<typeof parseMadvIdentity>;
(lines omitted)
HEAD:packages/supervisor/package.json:7:    "@madventures/adapter-madv-surface": "workspace:*",
HEAD:packages/supervisor/src/attestation.ts:2:import { encodeUserInput, parseMadvIdentity, parseMadvAuthReadiness } from "@madventures/adapter-madv-surface";
HEAD:packages/supervisor/src/attestation.ts:7:export const MADV_IDENTITY_PROBE_INPUT = encodeUserInput("Reply with your model identifier and nothing else.");
HEAD:packages/supervisor/src/attestation.ts:170:        ? parseMadvIdentity(output, request.model, request.supportedVersions).ok
HEAD:packages/supervisor/src/attestation.ts:171:        : parseMadvAuthReadiness(output).ok
HEAD:packages/supervisor/test/madv-preflight.test.ts:6:import { encodeUserInput } from "@madventures/adapter-madv-surface";
(lines omitted)
HEAD:packages/supervisor/test/madv-probes.test.ts:3:import { encodeUserInput } from "@madventures/adapter-madv-surface";
HEAD:packages/supervisor/test/madv-probes.test.ts:15:    environment: Object.freeze({}), stdin: kind === "auth" ? "" : surface === "madv-surface" ? encodeUserInput("Reply with your model identifier and nothing else.") : IDENTITY_PROBE_INPUT,
(lines omitted)
168:    auth = check("capture 03 auth parser", clean(3) && adapter.parseMadvAuthReadiness(get(3).stdout, get(3).exit, get(3).signal).ok);
169:    const input = adapter.encodeUserInput("Reply with your model identifier and nothing else.");
174:      const accepted = check("capture " + n + " identity parser", clean(n) && adapter.parseMadvIdentity(get(n).stdout, model, registration.supported_versions, get(n).exit, get(n).signal).ok);

Precondition 6 passed.

logs/017-host.log · SHA-256 3f21e453d4eb497d8e6419ad7e9553e77f06fbc3570b7d5551d921845383f9fb
14:32  8 users, load averages: 1.62 2.38 2.48  exit=0

Darwin arm64

Precondition 7 passed. The D1 results follow. The signed first resume verified the prompt files, the archived halt report, the original runtime-halt log, an empty record directory and the same clean HEAD.

logs/266-resume-manifest.log · SHA-256 10b1fc183549a602ae89eba21741a92a89c7f6fb00dab2c36b2c91a9af4a9ac8
22:07  8 users, load averages: 3.42 2.27 1.95  exit=0

builder-prompt-m0-admission-codex-macbook.md: OK
DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md: OK
m0-record-r3.ts: OK
resume-m0-admission-1-runtime.md: OK

logs/267-resume-prompt-files.log · SHA-256 be782ec2dcbeb3292cc02d70e95d0c694335d44f4f7f95f5b9326e818d283ac9
22:08  8 users, load averages: 3.23 2.25 1.95  exit=0

DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md
SHA256.txt
builder-prompt-m0-admission-codex-macbook.md
m0-record-r3.ts
resume-m0-admission-1-runtime.md

logs/268-resume-hidden-check.log · SHA-256 d3dd691a710677a02025bddaeb761139321999aa1fcd011bca7044fa9d9f31f2
22:08  8 users, load averages: 3.23 2.25 1.95  exit=0

DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md
SHA256.txt
builder-prompt-m0-admission-codex-macbook.md
m0-record-r3.ts
resume-m0-admission-1-runtime.md

logs/269-resume-input-pins.log · SHA-256 bdc8bfc6a980561f97c2fbfe2da4418381b905d5ae9dc60c58c67de2c98b489b
22:08  8 users, load averages: 3.23 2.25 1.95  exit=0

abf0766764f3587d9dd3de096749c2aa6249fc55cd455c3563e22c4744f300d2  builder-prompt-m0-admission-codex-macbook.md
b6b9563ed1a2e154b4ef3b4d9ffe7666e6fd9870d82b87486f772d65f7f167aa  DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md
b9ba9bdadf0ca0b5e792ad78fc46f9212d763ad7455fb122343756be2e6fb593  m0-record-r3.ts
be1771c3d03b5dfa225b808c21591d0bac519d08073cdc80b5d0dbe41ffd41e5  resume-m0-admission-1-runtime.md

logs/270-resume-cli.log · SHA-256 7a120e5c25a2df263ab31eae480a4c74d74057c656bdf629fc11acca712a1144
22:08  8 users, load averages: 3.29 2.27 1.96  exit=0

WARNING: proceeding, even though we could not create PATH aliases: Operation not permitted (os error 1)
codex-cli 0.167.0

logs/271-resume-head.log · SHA-256 f033bee7a569982b256403115c3ea1556a4c739ed4de3de9369b9d6460c02c80
22:08  8 users, load averages: 3.29 2.27 1.96  exit=0

f73b5649afff86b558978cb76d09132bc0a7396a

logs/272-resume-branch.log · SHA-256 9f614eecebfba81852d5ad64f0bff880849b48ea01974590f5392ce61f8538c7
22:08  8 users, load averages: 3.29 2.27 1.96  exit=0

build/3b-m0-admission-r1

logs/273-resume-tree.log · SHA-256 9003cb3e1e21d302d7e734c078b8b75742025efbe1b1ffd44a8c0a64c341066c
22:08  8 users, load averages: 3.29 2.27 1.96  exit=0

logs/274-resume-stash.log · SHA-256 f7f3f37b81ea2e60be0cd3219db3f03fe03acecba6ec3282e5f3abdd21e9585d
22:08  8 users, load averages: 3.29 2.27 1.96  exit=0

logs/275-resume-pr.log · SHA-256 6b03243989ace6d77183fc0b30fd48663a9c9a397b53288525c31eb7baa75891
22:08  8 users, load averages: 3.29 2.27 1.96  exit=0

m0-admission-phase1-halt-1-report.md

logs/276-resume-halt-report.log · SHA-256 84f6c27c22c3d3a2b098f3184c230f498ef5cb935982dcbb63ced00100b1c3b0
22:08  8 users, load averages: 3.29 2.27 1.96  exit=0

c8e9327cbba2a9cf716bc6661f8ac4279bca7a80322904f71df1b146acb62fe1  pr/m0-admission-phase1-halt-1-report.md

logs/277-resume-halt-log.log · SHA-256 fe9ff8810903263ff9829791db2fdb5897289978f540d079c3277c9118555ae3
22:08  8 users, load averages: 3.29 2.27 1.96  exit=0

235cb6ddea4d8b0dc42cc82febe211aafc94cdc0d0e4af89f04ecf3135e8aba4  logs/253-repeat-suite-runtime.log

logs/278-resume-record-dir.log · SHA-256 0c552a24ca0202ae71b005a4a8d75a65fa7a91c1c5529a9ab17c966a70ac26c0
22:08  8 users, load averages: 3.29 2.27 1.96  exit=0

logs/279-resume-runtime.log · SHA-256 a4422a0f0b9a491bdddf69fb386c398154457a3b3a924469851418520dccdc8c
22:08  up 13:35, 8 users, load averages: 2.93 2.23 1.95  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

3. Baseline

The lockfile SHA-256 was a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830 before and after install. The authorized checkout restored the executable bit. The typecheck exited 0 with no output.

logs/035-base-lock.log · SHA-256 338f056f0f3693e0f0e9776e5e3c06ed72c034ebbd27cd90fb7e82551026cd9a
14:33  8 users, load averages: 1.32 2.12 2.38  exit=0

a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock

logs/047-baseline-runtime.log · SHA-256 7e64125fca3d2b20f594b5a030934b58927d5cf304b05add00f69035816a27f8
14:38  up  6:05, 8 users, load averages: 1.41 1.75 2.14  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/048-baseline-install.log · SHA-256 4aa8521e67c060aeffba46a9333e7920deee70d2fe645badf918e03fb631a1f9
14:40  up  6:07, 8 users, load averages: 0.98 1.49 1.98  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun install v1.4.2 (744846f84)

+ @types/bun@1.4.2
+ @types/react@19.3.0
+ @types/react-test-renderer@19.3.0
+ react-test-renderer@19.3.0
+ @opentui/core@0.5.11
+ @opentui/react@0.5.11
+ react@19.3.0
+ typescript@5.9.3

(lines omitted)

logs/049-baseline-lock.log · SHA-256 75edbd4be13626f07c47ee8918de90a81baddc78fe2692b0cfdd9663f8eec390
14:40  8 users, load averages: 1.06 1.50 1.98  exit=0

a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock

logs/050-install-tree.log · SHA-256 048ee6a5d17fd305fe35bb75793dd9e35dc91da296510c4bf16fa021786ca7b6
14:40  8 users, load averages: 1.06 1.50 1.98  exit=0

 mode change 100644 => 100755 packages/founder-act/src/main.ts

logs/052-restore-install-mode.log · SHA-256 1e5f05198ff7991bbc4193848f57d7fac603eba2ba3b2decd3bf7d95449ab97e
14:40  8 users, load averages: 1.37 1.56 2.00  exit=0

logs/053-restored-install-status.log · SHA-256 f40927db56752d939f2edb5650adc0feced72d35e9391b045e2074613590da7f
14:40  8 users, load averages: 1.37 1.56 2.00  exit=0

logs/054-baseline-typecheck.log · SHA-256 c3e574a48e6317385c4073746305410ea654d419e684c518986f0932b2a7eb8f
14:40  up  6:08, 8 users, load averages: 1.34 1.55 1.99  exit=0

logs/055-baseline-suite-runtime.log · SHA-256 8a8698a19fad5f5ece629af1e0e9cbdbb59868e02dad42f46b2cb5bbcaa93520
14:40  up  6:08, 8 users, load averages: 1.36 1.55 1.99  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/056-baseline-wait.log · SHA-256 09d5641b26801da98f8e8b0757712ea01d71b746f894e7482e7b7589841bc82c
14:40  8 users, load averages: 1.36 1.55 1.99  exit=0

14:40  8 users, load averages: 1.36 1.55 1.99

logs/057-baseline-suite.log · SHA-256 4d249629ce62ce478b4d581332645acee24271f00fe97e104e8096e03c17b39d
14:40  up  6:08, 8 users, load averages: 1.50 1.57 1.99  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

 2027 pass
 0 fail
 27336 expect() calls
(lines omitted)

Bun reported 2027 tests across 147 files in 184.07 seconds. All tests passed. The individual timing-free list is logs/071-base-list.log · SHA-256 40c337b7b22cebbc7dff8783392e36a7e7670b3c805f0a7ab2081be52a2c4a52.

4. Work, tests and breaks

R1 changed MADV_SURFACE_REGISTRATION in packages/protocol/src/adapter-registry.ts. The version is 0.1.2 and the identity vector adds --no-tools immediately before --max-turns 1. Only the two required pins in packages/protocol/test/adapter-registry.test.ts and the init version at packages/supervisor/test/madv-probes.test.ts line 9 changed in existing registration coverage.

R2 changed MadvContext, MadvSurfaceParser.line and parseMadvIdentity in packages/adapter-madv-surface/src/index.ts. A module-private symbol selects the optional context predicate at the probe caller. The first init must then have an empty tools array. Both entry points apply the non-empty string response_id predicate after the model, Anthropic and family checks. The refusal expression is /claude|anthropic/i. The production parser signatures are preserved. New tests were appended to packages/adapter-madv-surface/test/parser.test.ts. In recorded.test.ts the import and five permitted cases now check both parser entry points. Ubuntu 05 and both 07 captures kept their original expected causes. Addendum 1 B1 and B4 govern those changes, SHA-256 b6b9563ed1a2e154b4ef3b4d9ffe7666e6fd9870d82b87486f772d65f7f167aa.

R3 added madv-intervals.test.ts and madv-allowlist.test.ts under packages/supervisor/test, and fixture-integrity.test.ts under packages/adapter-madv-surface/test. The interval tests observe SIGTERM, SIGKILL and stream cancellation against the injected clock. The environment test supplies a value for any requested variable and compares the selected key set. The manifest test compares both path inventories, rejects duplicate or malformed rows and hashes every fixture byte. The tests use the unchanged production runner and environment selector.

R4 remained pending after the second halt. No admission reader was created or run.

| File | Bun test name | Change | Ruling |
| --- | --- | --- | --- |
| packages/protocol/test/adapter-registry.test.ts | madv-surface registration matches DEC-20261115-02 field for field | Existing · changed version and probe argv | B2 and B4.1, B5.3 pin exception |
| packages/protocol/test/adapter-registry.test.ts | madv-surface 0.1.2 reserves --no-tools for the identity probe | Added | B2 and B4.1 |
| packages/supervisor/test/madv-probes.test.ts | madv-surface identity continues beyond init to natural exit | Existing · shared init pin at line 9 | B2 and B5.3 pin exception |
| packages/supervisor/test/madv-probes.test.ts | registration chooses 30 seconds beside Claude's 5 seconds | Existing · shared init pin at line 9 | B2 and B5.3 pin exception |
| packages/supervisor/test/madv-probes.test.ts | madv-surface identity failures map to identity_mismatch | Existing · shared init pin at line 9 | B2 and B5.3 pin exception |
| packages/supervisor/test/madv-probes.test.ts | madv-surface keeps both raw stream limits and metadata-only diagnostics | Existing · shared init pin at line 9 | B2 and B5.3 pin exception |
| packages/adapter-madv-surface/test/recorded.test.ts | macbook 04 recorded tools fail probe identity and pass a governed launch | Existing · renamed and checks both entry points | B4.2 and Addendum 1 B1 |
| packages/adapter-madv-surface/test/recorded.test.ts | macbook 05 recorded tools fail probe identity and pass a governed launch | Existing · renamed and checks both entry points | B4.2 and Addendum 1 B1 |
| packages/adapter-madv-surface/test/recorded.test.ts | macbook 06 recorded tools fail probe identity and pass a governed launch | Existing · renamed and checks both entry points | B4.2 and Addendum 1 B1 |
| packages/adapter-madv-surface/test/recorded.test.ts | ubuntu 04 recorded tools fail probe identity and pass a governed launch | Existing · renamed and checks both entry points | B4.2 and Addendum 1 B1 |
| packages/adapter-madv-surface/test/recorded.test.ts | ubuntu 06 recorded tools fail probe identity and pass a governed launch | Existing · renamed and checks both entry points | B4.2 and Addendum 1 B1 |
| packages/adapter-madv-surface/test/parser.test.ts | identity requires an empty tool array while a governed launch accepts tools | Added | B3, B4.2 |
| packages/adapter-madv-surface/test/parser.test.ts | probe and launch require a non-empty string response_id on every response | Added | B3, B4.3 |
| packages/adapter-madv-surface/test/parser.test.ts | Claude and Anthropic ids are refused before family resolution | Added | B3, B4.4 and Addendum 1 B2 |
| packages/supervisor/test/madv-intervals.test.ts | madv-surface identity keeps 500 ms grace and 1000 ms cleanup | Added | B4.5, DEC-20261119-01 A7.1 |
| packages/supervisor/test/madv-intervals.test.ts | madv-surface auth keeps 500 ms grace and 1000 ms cleanup | Added | B4.5, DEC-20261119-01 A7.1 |
| packages/supervisor/test/madv-allowlist.test.ts | madv-surface-v1 selects exactly the B6 variable set | Added | B4.6, DEC-20261119-01 A7.2 |
| packages/adapter-madv-surface/test/fixture-integrity.test.ts | recorded manifest covers every fixture and matches its SHA-256 | Added | B4.7, DEC-20261119-01 A7.3 |

logs/087-r1-pins.log · SHA-256 86e6e532b38fa6aa11770ba5356d2d2f179c13c4a86aa358c56ff586f54b8169
17:15  up  8:42, 4 users, load averages: 1.30 1.67 1.74  exit=1

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

 20 pass
 4 fail
 210 expect() calls
(lines omitted)

logs/092-r1-tests.log · SHA-256 6884c6ca9db2738141f6dee8b8d00cef49162b500078ba67f08b4a7e58253f36
17:20  up  8:48, 4 users, load averages: 1.55 2.47 2.18  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

 24 pass
 0 fail
 227 expect() calls
(lines omitted)

logs/133-r2-tests.log · SHA-256 e5fed9cd240ef34aa8e1291cc01533a9fc5f89f86a7e86998ebd08ccbb8dff52
19:35  up 11:03, 5 users, load averages: 1.75 3.19 2.80  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

 65 pass
 0 fail
 303 expect() calls
(lines omitted)

logs/179-r3-tests.log · SHA-256 0a4da030510c9e98f923ed29e600421db265d30643f7fffa468dfb2ca560d1ef
20:07  up 11:34, 8 users, load averages: 1.34 2.01 1.98  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

 4 pass
 0 fail
 71 expect() calls
(lines omitted)

Break 1

Removing --no-tools from the probe shortened its required argument vector.

logs/109-break-1-diff.log · SHA-256 1a9bfaae38b31ebd02a7ada50c4a360c947ab6851c8c5b50fe16bec90e8ff573
17:21  4 users, load averages: 1.35 2.38 2.15  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

diff --git a/packages/protocol/src/adapter-registry.ts b/packages/protocol/src/adapter-registry.ts
index 28effbc..3515d3f 100644
--- a/packages/protocol/src/adapter-registry.ts
+++ b/packages/protocol/src/adapter-registry.ts
@@ -81,7 +81,7 @@ const MADV_SURFACE_REGISTRATION: AdapterRegistrationV1 = deepFreeze({
   provider: "minimax",
(lines omitted)
   identity_probe: {
(lines omitted)
     parse: "json",
   },
(lines omitted)

logs/112-break-1-tests.log · SHA-256 f1b0fe1cd6de4c6661e3ddd87471772e79090f9d94a74c3d3cbcefbb7be93952
17:36  up  9:03, 4 users, load averages: 1.92 2.26 2.16  exit=1

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun test v1.4.2 (744846f84)

packages/protocol/test/adapter-registry.test.ts:
(lines omitted)
127 | });
128 |
129 | test("madv-surface registration matches DEC-20261115-02 field for field", () => {
130 |   expect(ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))).toEqual({
                                                                     ^
error: expect(received).toEqual(expected)

  {
(lines omitted)
      "auth_status_exit_code:1",
      "auth_status.verified:false",
      "system/auth_failed",
      "exit_code:5",
(lines omitted)
    "auth_readiness_probe": {
(lines omitted)
        "auth",
        "status",
        "--profile",
        "minimax",
(lines omitted)
      "parse": "json",
    },
    "environment_allowlist_ref": "madv-surface-v1",
    "executable_name": "madv-surface",
    "identity_probe": {
(lines omitted)
        "--print",
        "--input-format",
        "stream-json",
        "--output-format",
        "stream-json",
        "--profile",
        "minimax",
        "--require-model",
        "--role",
        "reviewer",
        "--no-session-persistence",
-       "--no-tools",
        "--max-turns",
        "1",
(lines omitted)
      "parse": "json",
    },
    "independence_domain": "minimax",
(lines omitted)
      "A provider that misreports its own model remains a limitation.",
      "What the provider retains is the provider's.",
      "Both probes are live calls on the M Plan at every start.",
(lines omitted)
      "--print",
      "--input-format",
      "stream-json",
      "--output-format",
      "stream-json",
      "--profile",
      "minimax",
      "--require-model",
      "--role",
      "reviewer",
      "--no-session-persistence",
(lines omitted)
    "organization_id": "minimax",
    "provider": "minimax",
(lines omitted)
      "0.1.2",
(lines omitted)
    "surface": "madv-surface",
  }

- Expected  - 1
+ Received  + 0

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/protocol/test/adapter-registry.test.ts:130:64)
(lines omitted)
153 |     "--profile", "minimax", "--require-model", "--role", "reviewer", "--no-session-persistence",
(lines omitted)
156 |   expect(entry.non_interactive_flags).toEqual(launch);
157 |   expect(entry.non_interactive_flags).not.toContain("--no-tools");
(lines omitted)
                                          ^
error: expect(received).toEqual(expected)

(lines omitted)
    "--print",
    "--input-format",
    "stream-json",
    "--output-format",
    "stream-json",
    "--profile",
    "minimax",
    "--require-model",
    "--role",
    "reviewer",
    "--no-session-persistence",
-   "--no-tools",
    "--max-turns",
    "1",
(lines omitted)

- Expected  - 1
+ Received  + 0

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/protocol/test/adapter-registry.test.ts:158:37)
(lines omitted)

 7 pass
 2 fail
 62 expect() calls
(lines omitted)

logs/114-break-1-restore.log · SHA-256 d16bcc0cf9fb1298e71e9f38024e81999e7fcafb5ae0896ca75508edd24a9d8f
17:36  4 users, load averages: 1.92 2.26 2.16  exit=0

6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4  tui/packages/protocol/src/adapter-registry.ts
6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4  -

logs/123-registration-proof.log · SHA-256 15308c2beb230f6f76900150cdd634d38c786c5492e020d00d740d7ecae2dfbc
18:32  5 users, load averages: 1.35 2.24 2.51  exit=0

git status --porcelain -- packages/protocol/src/adapter-registry.ts

HEAD 6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4  - 6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4  tui/packages/protocol/src/adapter-registry.ts

Individual test results in the target file with timings removed.

(pass) registry values are stored already normalized
(pass) the registry contains exactly the three Founder-ratified surfaces
(pass) claude-code registration matches the PLAN-OPEN-1 ruling field for field
(pass) antigravity registration matches the PLAN-OPEN-1 ruling field for field
(pass) registry entries and the registry are deeply frozen
(pass) lookupRegistration returns the ratified entry and undefined for a syntactically valid unregistered surface
(pass) registry membership cannot be mutated at runtime
(fail) madv-surface registration matches DEC-20261115-02 field for field
(fail) madv-surface 0.1.2 reserves --no-tools for the identity probe

Break 2

Adding --no-tools to launch changed the eleven fixed arguments.

logs/115-break-2-diff.log · SHA-256 5e7f3053b5a2e60da8dc97073f50b0fcc6af7ec70d5dc23a22216cb579bc423a
17:36  4 users, load averages: 1.92 2.26 2.16  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

diff --git a/packages/protocol/src/adapter-registry.ts b/packages/protocol/src/adapter-registry.ts
index 28effbc..5676f2d 100644
--- a/packages/protocol/src/adapter-registry.ts
+++ b/packages/protocol/src/adapter-registry.ts
@@ -85,7 +85,7 @@ const MADV_SURFACE_REGISTRATION: AdapterRegistrationV1 = deepFreeze({
     parse: "json",
   },
(lines omitted)
   environment_allowlist_ref: "madv-surface-v1",
   independence_domain: "minimax",
   organization_id: "minimax",

logs/118-break-2-tests.log · SHA-256 e09635e00f056a9bd028c79ea7d9e8ee9c37743b34e848b19a63deef722b3ff2
18:32  up 10 hrs, 5 users, load averages: 1.39 2.26 2.52  exit=1

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun test v1.4.2 (744846f84)

packages/protocol/test/adapter-registry.test.ts:
(lines omitted)
127 | });
128 |
129 | test("madv-surface registration matches DEC-20261115-02 field for field", () => {
130 |   expect(ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))).toEqual({
                                                                     ^
error: expect(received).toEqual(expected)

  {
(lines omitted)
      "auth_status_exit_code:1",
      "auth_status.verified:false",
      "system/auth_failed",
      "exit_code:5",
(lines omitted)
    "auth_readiness_probe": {
(lines omitted)
        "auth",
        "status",
        "--profile",
        "minimax",
(lines omitted)
      "parse": "json",
    },
    "environment_allowlist_ref": "madv-surface-v1",
    "executable_name": "madv-surface",
    "identity_probe": {
(lines omitted)
        "--print",
        "--input-format",
        "stream-json",
        "--output-format",
        "stream-json",
        "--profile",
        "minimax",
        "--require-model",
        "--role",
        "reviewer",
        "--no-session-persistence",
        "--no-tools",
        "--max-turns",
        "1",
(lines omitted)
      "parse": "json",
    },
    "independence_domain": "minimax",
(lines omitted)
      "A provider that misreports its own model remains a limitation.",
      "What the provider retains is the provider's.",
      "Both probes are live calls on the M Plan at every start.",
(lines omitted)
      "--print",
      "--input-format",
      "stream-json",
      "--output-format",
      "stream-json",
      "--profile",
      "minimax",
      "--require-model",
      "--role",
      "reviewer",
      "--no-session-persistence",
+     "--no-tools",
(lines omitted)
    "organization_id": "minimax",
    "provider": "minimax",
(lines omitted)
      "0.1.2",
(lines omitted)
    "surface": "madv-surface",
  }

- Expected  - 0
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/protocol/test/adapter-registry.test.ts:130:64)
(lines omitted)
152 |     "--print", "--input-format", "stream-json", "--output-format", "stream-json",
153 |     "--profile", "minimax", "--require-model", "--role", "reviewer", "--no-session-persistence",
(lines omitted)
156 |   expect(entry.non_interactive_flags).toEqual(launch);
                                            ^
error: expect(received).toEqual(expected)

(lines omitted)
    "--print",
    "--input-format",
    "stream-json",
    "--output-format",
    "stream-json",
    "--profile",
    "minimax",
    "--require-model",
    "--role",
    "reviewer",
    "--no-session-persistence",
+   "--no-tools",
(lines omitted)

- Expected  - 0
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/protocol/test/adapter-registry.test.ts:156:39)
(lines omitted)

 7 pass
 2 fail
 60 expect() calls
(lines omitted)

logs/120-break-2-restore.log · SHA-256 24890aa40811ec4cc17423cb045aa6783208485678a34b887b4cac9d8bcd1141
18:32  5 users, load averages: 1.39 2.26 2.52  exit=0

6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4  tui/packages/protocol/src/adapter-registry.ts
6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4  -

logs/123-registration-proof.log · SHA-256 15308c2beb230f6f76900150cdd634d38c786c5492e020d00d740d7ecae2dfbc
18:32  5 users, load averages: 1.35 2.24 2.51  exit=0

git status --porcelain -- packages/protocol/src/adapter-registry.ts

HEAD 6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4  - 6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4  tui/packages/protocol/src/adapter-registry.ts

Individual test results in the target file with timings removed.

(pass) registry values are stored already normalized
(pass) the registry contains exactly the three Founder-ratified surfaces
(pass) claude-code registration matches the PLAN-OPEN-1 ruling field for field
(pass) antigravity registration matches the PLAN-OPEN-1 ruling field for field
(pass) registry entries and the registry are deeply frozen
(pass) lookupRegistration returns the ratified entry and undefined for a syntactically valid unregistered surface
(pass) registry membership cannot be mutated at runtime
(fail) madv-surface registration matches DEC-20261115-02 field for field
(fail) madv-surface 0.1.2 reserves --no-tools for the identity probe

Break 3

Disabling the probe predicate let an init with tools pass.

logs/140-break-3-diff.log · SHA-256 45229ff474852fced53c4171036995986c19d36d1ed4b4a3df28becbc1fb38e7
19:35  5 users, load averages: 1.68 3.08 2.77  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

diff --git a/packages/adapter-madv-surface/src/index.ts b/packages/adapter-madv-surface/src/index.ts
index b825596..1066741 100644
--- a/packages/adapter-madv-surface/src/index.ts
+++ b/packages/adapter-madv-surface/src/index.ts
@@ -205,7 +205,7 @@ export class MadvSurfaceParser {
   }
 }
(lines omitted)
   parser.push(output);
   return parser.finish(exitCode, signal);
 }

logs/143-break-3-tests.log · SHA-256 2b385f5538064cbfc0e9b9491fc15fd843f910950a4a1baaab2c6f851502be1c
20:03  up 11:30, 7 users, load averages: 1.76 1.61 1.80  exit=1

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/parser.test.ts:
(lines omitted)
(pass) auth rejects authMethod
(pass) auth rejects profile
(pass) auth rejects provider
(pass) auth rejects endpointHost
(pass) auth rejects verified
(pass) auth rejects verifyMethod
(lines omitted)
(pass) event order rejects result before response
(lines omitted)
137 | });
138 |
139 | test("identity requires an empty tool array while a governed launch accepts tools", () => {
(lines omitted)
141 |     const output = wire(init({ tools }), response());
142 |     expect(parseMadvIdentity(output, model, context.supportedVersions)).toMatchObject({
                                                                              ^
error: expect(received).toMatchObject(expected)

  {
-   "cause": "identity_mismatch",
-   "ok": false,
-   "reason": "init_tools",
(lines omitted)
+     {
+       "event": {
+         "binary_sha256": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
+         "endpoint_host": "api.minimax.io",
+         "profile": "minimax",
+         "provider": "minimax",
+         "requested_model": "MiniMax-M3.1-Flash",
+         "role": "reviewer",
+         "session_id": "wire-session",
+         "subtype": "init",
+         "surface": "madv-surface",
+         "surface_version": "0.1.1",
(lines omitted)
+           "read_file",
(lines omitted)
+         "ts": "2026-11-15T00:00:00.000Z",
+         "type": "system",
+       },
+       "executionId": "identity-probe",
+       "sessionId": "preflight",
+     },
+     {
+       "event": {
+         "endpoint_host": "api.minimax.io",
+         "profile": "minimax",
+         "provider": "minimax",
+         "response_id": "response",
+         "response_independence_domain": "minimax",
+         "response_maker": "minimax",
+         "response_model": "MiniMax-M3.1-Flash",
+         "session_id": "wire-session",
+         "tls_verified_host": "api.minimax.io",
+         "ts": "2026-11-15T00:00:00.000Z",
+         "type": "model_response",
+       },
+       "executionId": "identity-probe",
+       "sessionId": "preflight",
+     },
(lines omitted)
+   "modelResponses": 1,
+   "ok": true,
  }

- Expected  - 3
+ Received  + 42

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/adapter-madv-surface/test/parser.test.ts:142:73)
(lines omitted)

1 tests failed:
(lines omitted)

 52 pass
 1 fail
 237 expect() calls
(lines omitted)

logs/145-break-3-restore.log · SHA-256 ae238cbd4b26788e19e9973698ecfcfd351c9fe672a250cccff344fcd65103a8
20:03  7 users, load averages: 1.76 1.61 1.80  exit=0

6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts
6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  -

logs/171-parser-proof.log · SHA-256 78272ad12db3b211dc818decfd8e5960dd2d94f78a2234ccbbca6c8aa45a1c5b
20:03  7 users, load averages: 1.66 1.59 1.79  exit=0

git status --porcelain -- packages/adapter-madv-surface/src/index.ts

HEAD 6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  - 6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts

Individual test results in the target file with timings removed.

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
(pass) identity rejects response response_model
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
(pass) every later response is checked before its tools
(pass) stream chunks preserve UTF-8 and malformed JSON fails closed
(pass) exit precedence fails closed without relying on an emitted event
(fail) identity requires an empty tool array while a governed launch accepts tools
(pass) probe and launch require a non-empty string response_id on every response
(pass) Claude and Anthropic ids are refused before family resolution
(fail) identity requires an empty tool array while a governed launch accepts tools

Break 4

Applying the predicate to all callers rejected a governed launch with tools.

logs/146-break-4-diff.log · SHA-256 161ccda8215a088607264736a40058b9d982a58dc9fac3392c6998432d38543a
20:03  7 users, load averages: 1.76 1.61 1.80  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

diff --git a/packages/adapter-madv-surface/src/index.ts b/packages/adapter-madv-surface/src/index.ts
index b825596..13e3510 100644
--- a/packages/adapter-madv-surface/src/index.ts
+++ b/packages/adapter-madv-surface/src/index.ts
@@ -145,7 +145,7 @@ export class MadvSurfaceParser {
         || value.endpoint_host !== "api.minimax.io" || value.requested_model !== this.context.model) {
         this.fail("identity_mismatch", "init_predicate"); return;
       }
(lines omitted)
+      if (true && (!Array.isArray(value.tools) || value.tools.length !== 0)) {
         this.fail("identity_mismatch", "init_tools"); return;
       }
       this.wireSession = value.session_id; this.state = "waiting";

logs/149-break-4-tests.log · SHA-256 bf8c0f0ffa462fa86add45e5a4e27800092b8c05ee9323c9b2c93435866cef56
20:03  up 11:30, 7 users, load averages: 1.76 1.61 1.80  exit=1

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/parser.test.ts:
(lines omitted)
(pass) auth rejects authMethod
(pass) auth rejects profile
(pass) auth rejects provider
(pass) auth rejects endpointHost
(pass) auth rejects verified
(lines omitted)
(pass) event order rejects out-of-session event
(pass) event order rejects assistant before response
(lines omitted)
(pass) event order rejects result before response
(lines omitted)
144 |     });
145 |   }
(lines omitted)
147 |   const launch = new MadvSurfaceParser(context);
(lines omitted)
149 |   expect(launch.finish(0).ok).toBe(true);
                                    ^
error: expect(received).toBe(expected)

Expected: true
Received: false

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/adapter-madv-surface/test/parser.test.ts:149:31)
(lines omitted)

1 tests failed:
(lines omitted)

 52 pass
 1 fail
 243 expect() calls
(lines omitted)

logs/151-break-4-restore.log · SHA-256 663654d86cd76b987b56faebe2801b9d071ec885083e53988e1f81bdda5dc587
20:03  7 users, load averages: 1.86 1.63 1.81  exit=0

6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts
6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  -

logs/171-parser-proof.log · SHA-256 78272ad12db3b211dc818decfd8e5960dd2d94f78a2234ccbbca6c8aa45a1c5b
20:03  7 users, load averages: 1.66 1.59 1.79  exit=0

git status --porcelain -- packages/adapter-madv-surface/src/index.ts

HEAD 6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  - 6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts

Individual test results in the target file with timings removed.

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
(pass) identity rejects response response_model
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
(pass) every later response is checked before its tools
(pass) stream chunks preserve UTF-8 and malformed JSON fails closed
(pass) exit precedence fails closed without relying on an emitted event
(fail) identity requires an empty tool array while a governed launch accepts tools
(pass) probe and launch require a non-empty string response_id on every response
(pass) Claude and Anthropic ids are refused before family resolution
(fail) identity requires an empty tool array while a governed launch accepts tools

Break 5

Accepting an absent response_id admitted a response without its required identifier.

logs/152-break-5-diff.log · SHA-256 822f21b4ec0cfdbe545a334229099967b6e387957ba1fb5f2ccfcfd3bc704e7b
20:03  7 users, load averages: 1.86 1.63 1.81  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

diff --git a/packages/adapter-madv-surface/src/index.ts b/packages/adapter-madv-surface/src/index.ts
index b825596..25304dd 100644
--- a/packages/adapter-madv-surface/src/index.ts
+++ b/packages/adapter-madv-surface/src/index.ts
@@ -155,7 +155,7 @@ export class MadvSurfaceParser {
       if (/claude|anthropic/i.test(value.response_model)) { this.fail("model_refused", "anthropic_model"); return; }
(lines omitted)
       if (value.response_model !== this.context.model
-        || typeof value.response_id !== "string" || value.response_id.length === 0
+        || (typeof value.response_id === "string" && value.response_id.length === 0)
         || value.response_independence_domain !== this.context.independenceDomain
         || value.provider !== this.context.provider || value.profile !== "minimax"
         || value.endpoint_host !== "api.minimax.io" || value.tls_verified_host !== "api.minimax.io") {

logs/155-break-5-tests.log · SHA-256 cf0b0ca60e61019b2b7551927694b4829651b701acc1ce58d61dd6751b9bec35
20:03  up 11:30, 7 users, load averages: 1.86 1.63 1.81  exit=1

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/parser.test.ts:
(lines omitted)
(pass) auth rejects authMethod
(pass) auth rejects profile
(pass) auth rejects provider
(pass) auth rejects endpointHost
(pass) auth rejects verified
(pass) auth rejects verifyMethod
(lines omitted)
(pass) event order rejects out-of-session event
(lines omitted)
(pass) event order rejects unmatched tool result
(lines omitted)
(pass) event order rejects result before response
(lines omitted)
152 | test("probe and launch require a non-empty string response_id on every response", () => {
(lines omitted)
154 |     const invalid = response({ response_id });
155 |     const output = wire(init(), invalid);
156 |     const mismatch = { ok: false, cause: "identity_mismatch", reason: "response_predicate" };
157 |     expect(parseMadvIdentity(output, model, context.supportedVersions)).toMatchObject(mismatch);
                                                                              ^
error: expect(received).toMatchObject(expected)

  {
-   "cause": "identity_mismatch",
-   "ok": false,
-   "reason": "response_predicate",
(lines omitted)
+     {
+       "event": {
+         "binary_sha256": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
+         "endpoint_host": "api.minimax.io",
+         "profile": "minimax",
+         "provider": "minimax",
+         "requested_model": "MiniMax-M3.1-Flash",
+         "role": "reviewer",
+         "session_id": "wire-session",
+         "subtype": "init",
+         "surface": "madv-surface",
+         "surface_version": "0.1.1",
(lines omitted)
+         "ts": "2026-11-15T00:00:00.000Z",
+         "type": "system",
+       },
+       "executionId": "identity-probe",
+       "sessionId": "preflight",
+     },
+     {
+       "event": {
+         "endpoint_host": "api.minimax.io",
+         "profile": "minimax",
+         "provider": "minimax",
+         "response_independence_domain": "minimax",
+         "response_maker": "minimax",
+         "response_model": "MiniMax-M3.1-Flash",
+         "session_id": "wire-session",
+         "tls_verified_host": "api.minimax.io",
+         "ts": "2026-11-15T00:00:00.000Z",
+         "type": "model_response",
+       },
+       "executionId": "identity-probe",
+       "sessionId": "preflight",
+     },
(lines omitted)
+   "modelResponses": 1,
+   "ok": true,
  }

- Expected  - 3
+ Received  + 39

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/adapter-madv-surface/test/parser.test.ts:157:73)
(lines omitted)

1 tests failed:
(lines omitted)

 52 pass
 1 fail
 228 expect() calls
(lines omitted)

logs/157-break-5-restore.log · SHA-256 697f9cec05d51d344bf3be1121f3d6876b3da874a2a6f21560d95eb0b13b4899
20:03  7 users, load averages: 1.86 1.63 1.81  exit=0

6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts
6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  -

logs/171-parser-proof.log · SHA-256 78272ad12db3b211dc818decfd8e5960dd2d94f78a2234ccbbca6c8aa45a1c5b
20:03  7 users, load averages: 1.66 1.59 1.79  exit=0

git status --porcelain -- packages/adapter-madv-surface/src/index.ts

HEAD 6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  - 6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts

Individual test results in the target file with timings removed.

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
(pass) identity rejects response response_model
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
(pass) every later response is checked before its tools
(pass) stream chunks preserve UTF-8 and malformed JSON fails closed
(pass) exit precedence fails closed without relying on an emitted event
(pass) identity requires an empty tool array while a governed launch accepts tools
(fail) probe and launch require a non-empty string response_id on every response
(pass) Claude and Anthropic ids are refused before family resolution
(fail) probe and launch require a non-empty string response_id on every response

Break 6

Restoring the old expression changed the cause for all five ids containing claude. The six-id comparison displays the changed entries together.

logs/158-break-6-diff.log · SHA-256 eea99e0674e0e0b9082ee1ace5d107017b4d4d0de0a153902782c607263547f5
20:03  7 users, load averages: 1.86 1.63 1.81  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

diff --git a/packages/adapter-madv-surface/src/index.ts b/packages/adapter-madv-surface/src/index.ts
index b825596..f242513 100644
--- a/packages/adapter-madv-surface/src/index.ts
+++ b/packages/adapter-madv-surface/src/index.ts
@@ -152,7 +152,7 @@ export class MadvSurfaceParser {
     } else if (value.type === "model_response") {
       if (this.state !== "waiting" && !(this.state === "tools" && this.tools.size === 0)) { this.fail("identity_mismatch", "event_order"); return; }
       if (typeof value.response_model !== "string" || value.response_model.length === 0) { this.fail("identity_unavailable", "model_field_absent"); return; }
-      if (/claude|anthropic/i.test(value.response_model)) { this.fail("model_refused", "anthropic_model"); return; }
(lines omitted)
       if (value.response_model !== this.context.model
         || typeof value.response_id !== "string" || value.response_id.length === 0

logs/161-break-6-tests.log · SHA-256 ce916395de21825e415368597c1c95a5b8366996db8a649ae1719a3865e8af82
20:03  up 11:30, 7 users, load averages: 1.86 1.63 1.81  exit=1

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/parser.test.ts:
(lines omitted)
(pass) auth rejects profile
(pass) auth rejects provider
(pass) auth rejects endpointHost
(pass) auth rejects verified
(pass) auth rejects verifyMethod
(lines omitted)
(pass) event order rejects unmatched tool result
(lines omitted)
(pass) event order rejects result before response
(lines omitted)
172 |   const causes = ids.map(id => {
173 |     const result = parseMadvIdentity(wire(init(), response({ response_model: id })), model, context.supportedVersions);
174 |     return { id, cause: result.ok ? "accepted" : result.cause };
175 |   });
176 |   expect(causes).toEqual(ids.map(id => ({ id, cause: "model_refused" })));
                       ^
error: expect(received).toEqual(expected)

(lines omitted)
    {
-     "cause": "model_refused",
+     "cause": "identity_mismatch",
      "id": "minimax-claude-x",
    },
    {
-     "cause": "model_refused",
+     "cause": "domain_unresolved",
      "id": "qwen-claude",
    },
    {
-     "cause": "model_refused",
+     "cause": "domain_unresolved",
      "id": "vendor_CLAUDE",
    },
    {
-     "cause": "model_refused",
+     "cause": "domain_unresolved",
      "id": "vendor+ClAuDe",
    },
    {
-     "cause": "model_refused",
+     "cause": "domain_unresolved",
      "id": "preclaudepost",
    },
    {
      "cause": "model_refused",
      "id": "minimax-anthropic-x",
    },
(lines omitted)

- Expected  - 5
+ Received  + 5

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/adapter-madv-surface/test/parser.test.ts:176:18)
(lines omitted)

1 tests failed:
(lines omitted)

 52 pass
 1 fail
 243 expect() calls
(lines omitted)

logs/163-break-6-restore.log · SHA-256 b1bcff7d9b9f2c071bd5efa5344ab312d02f864e5839294b63af28a8c5bdc0ee
20:03  7 users, load averages: 1.71 1.60 1.80  exit=0

6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts
6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  -

logs/171-parser-proof.log · SHA-256 78272ad12db3b211dc818decfd8e5960dd2d94f78a2234ccbbca6c8aa45a1c5b
20:03  7 users, load averages: 1.66 1.59 1.79  exit=0

git status --porcelain -- packages/adapter-madv-surface/src/index.ts

HEAD 6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  - 6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts

Individual test results in the target file with timings removed.

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
(pass) identity rejects response response_model
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
(pass) every later response is checked before its tools
(pass) stream chunks preserve UTF-8 and malformed JSON fails closed
(pass) exit precedence fails closed without relying on an emitted event
(pass) identity requires an empty tool array while a governed launch accepts tools
(pass) probe and launch require a non-empty string response_id on every response
(fail) Claude and Anthropic ids are refused before family resolution
(fail) Claude and Anthropic ids are refused before family resolution

Break 7

Removing anthropic changed the cause for minimax-anthropic-x.

logs/164-break-7-diff.log · SHA-256 d759d490e2a69849f732d3285dd00d5d1c6b6a5d26fa56937c63e8cc7b9f408e
20:03  7 users, load averages: 1.71 1.60 1.80  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

diff --git a/packages/adapter-madv-surface/src/index.ts b/packages/adapter-madv-surface/src/index.ts
index b825596..8b3f5e6 100644
--- a/packages/adapter-madv-surface/src/index.ts
+++ b/packages/adapter-madv-surface/src/index.ts
@@ -152,7 +152,7 @@ export class MadvSurfaceParser {
     } else if (value.type === "model_response") {
       if (this.state !== "waiting" && !(this.state === "tools" && this.tools.size === 0)) { this.fail("identity_mismatch", "event_order"); return; }
       if (typeof value.response_model !== "string" || value.response_model.length === 0) { this.fail("identity_unavailable", "model_field_absent"); return; }
-      if (/claude|anthropic/i.test(value.response_model)) { this.fail("model_refused", "anthropic_model"); return; }
+      if (/claude/i.test(value.response_model)) { this.fail("model_refused", "anthropic_model"); return; }
(lines omitted)
       if (value.response_model !== this.context.model
         || typeof value.response_id !== "string" || value.response_id.length === 0

logs/167-break-7-tests.log · SHA-256 1c54e0ce6b24402e05352454b9e55a3473b3a08367ebb453ed3154436071d657
20:03  up 11:30, 7 users, load averages: 1.71 1.60 1.80  exit=1

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/parser.test.ts:
(lines omitted)
(pass) auth rejects authMethod
(pass) auth rejects profile
(lines omitted)
(pass) auth rejects endpointHost
(lines omitted)
(pass) auth rejects verifyMethod
(lines omitted)
(pass) event order rejects result before response
(lines omitted)
172 |   const causes = ids.map(id => {
173 |     const result = parseMadvIdentity(wire(init(), response({ response_model: id })), model, context.supportedVersions);
174 |     return { id, cause: result.ok ? "accepted" : result.cause };
175 |   });
176 |   expect(causes).toEqual(ids.map(id => ({ id, cause: "model_refused" })));
                       ^
error: expect(received).toEqual(expected)

(lines omitted)
    {
      "cause": "model_refused",
      "id": "minimax-claude-x",
    },
    {
      "cause": "model_refused",
      "id": "qwen-claude",
    },
    {
      "cause": "model_refused",
      "id": "vendor_CLAUDE",
    },
    {
      "cause": "model_refused",
      "id": "vendor+ClAuDe",
    },
    {
      "cause": "model_refused",
      "id": "preclaudepost",
    },
    {
-     "cause": "model_refused",
+     "cause": "identity_mismatch",
      "id": "minimax-anthropic-x",
    },
(lines omitted)

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/adapter-madv-surface/test/parser.test.ts:176:18)
(lines omitted)

1 tests failed:
(lines omitted)

 52 pass
 1 fail
 243 expect() calls
(lines omitted)

logs/169-break-7-restore.log · SHA-256 1a172899a6196df44ed5f53603a471f02640b2fa471b99c2d19f1e9a0f277815
20:03  7 users, load averages: 1.71 1.60 1.80  exit=0

6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts
6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  -

logs/171-parser-proof.log · SHA-256 78272ad12db3b211dc818decfd8e5960dd2d94f78a2234ccbbca6c8aa45a1c5b
20:03  7 users, load averages: 1.66 1.59 1.79  exit=0

git status --porcelain -- packages/adapter-madv-surface/src/index.ts

HEAD 6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  - 6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts

Individual test results in the target file with timings removed.

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
(pass) identity rejects response response_model
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
(pass) every later response is checked before its tools
(pass) stream chunks preserve UTF-8 and malformed JSON fails closed
(pass) exit precedence fails closed without relying on an emitted event
(pass) identity requires an empty tool array while a governed launch accepts tools
(pass) probe and launch require a non-empty string response_id on every response
(fail) Claude and Anthropic ids are refused before family resolution
(fail) Claude and Anthropic ids are refused before family resolution

Break 8

At 999 ms both probes cancelled stream consumption one millisecond early. The earlier suites passed.

logs/182-break-8-diff.log · SHA-256 47351dce6fc8564dc803f75f4a4238abd108134d1a614c0076bc652f478654dd
20:07  8 users, load averages: 1.50 2.00 1.97  exit=0

diff --git a/packages/supervisor/src/attestation.ts b/packages/supervisor/src/attestation.ts
index 8397014..116dc79 100644
--- a/packages/supervisor/src/attestation.ts
+++ b/packages/supervisor/src/attestation.ts
@@ -153,7 +153,8 @@ export async function runBoundedProbe(request: ProbeRequest, overrides: Partial<
     let clean = reason === "reaped" && rt.now() - started <= executionMs;
     if (reason !== "reaped") {
       const cleanupStart = rt.now();
-      const end = Math.min(cleanupStart + CLEANUP_MS, started + executionMs + CLEANUP_MS);
+      const cleanupMs = madv ? 999 : CLEANUP_MS;
+      const end = Math.min(cleanupStart + cleanupMs, started + executionMs + cleanupMs);
       if (!exitObserved) { try { process.kill("SIGTERM"); } catch { streamFailure = true; } }
       let completion = await deadline(reaped, Math.min(cleanupStart + GRACE_MS, end));
       if (completion !== "reaped") {

logs/185-break-8-old.log · SHA-256 f0c76c1e2d15761fb7b0359e1aa819bbf0704740e756a201a5be4d5b60fce51e
20:09  up 11:37, 8 users, load averages: 1.30 1.88 1.93  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun test v1.4.2 (744846f84)

packages/supervisor/test/madv-probes.test.ts:
(lines omitted)

 8 pass
 0 fail
 124 expect() calls
(lines omitted)

logs/187-break-8-related.log · SHA-256 6669f04b5b96b5b8232b751f3164b234192f2db57d5e1d081f8f0bb31948cc49
20:09  up 11:37, 8 users, load averages: 1.30 1.88 1.93  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun test v1.4.2 (744846f84)

packages/supervisor/test/attestation.test.ts:
(lines omitted)

 21 pass
 0 fail
 224 expect() calls
(lines omitted)

logs/189-break-8-tests.log · SHA-256 a2ca45f3a9e590275784372db8c3f3b4b984be6859dcb3d5a2b3b865f54dc088
20:13  up 11:41, 8 users, load averages: 1.64 1.91 1.94  exit=1

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun test v1.4.2 (744846f84)

packages/supervisor/test/madv-intervals.test.ts:
(lines omitted)
41 |         jest.advanceTimersByTime(delta);
42 |         await Promise.resolve();
43 |       }
(lines omitted)
45 |       expect(cleanupAt).toBe(1000);
                             ^
error: expect(received).toBe(expected)

Expected: 1000
Received: 999

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/supervisor/test/madv-intervals.test.ts:45:25)
(lines omitted)
41 |         jest.advanceTimersByTime(delta);
42 |         await Promise.resolve();
43 |       }
(lines omitted)
45 |       expect(cleanupAt).toBe(1000);
                             ^
error: expect(received).toBe(expected)

Expected: 1000
Received: 999

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/supervisor/test/madv-intervals.test.ts:45:25)
(lines omitted)

 0 pass
 2 fail
 4 expect() calls
(lines omitted)

logs/191-break-8-restore.log · SHA-256 f06dddd9ca9b389aca0bc8683ea4413041ff124bd3679414318b6800677ff9ec
20:13  8 users, load averages: 1.64 1.91 1.94  exit=0

d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  tui/packages/supervisor/src/attestation.ts
d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  -

logs/222-interval-allowlist-proof.log · SHA-256 32c05c4b510e016729725add961b98654d393d91ef0ad35d5767ad81e49130cd
20:14  8 users, load averages: 1.08 1.72 1.87  exit=0

git status --porcelain -- packages/supervisor/src/attestation.ts

HEAD d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  - d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  tui/packages/supervisor/src/attestation.ts
git status --porcelain -- packages/supervisor/src/environment.ts

HEAD 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  - 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  tui/packages/supervisor/src/environment.ts

Individual test results in the target file with timings removed.

(fail) madv-surface identity keeps 500 ms grace and 1000 ms cleanup
(fail) madv-surface auth keeps 500 ms grace and 1000 ms cleanup

Break 9

At 499 ms both probes sent SIGKILL one millisecond early. The earlier suites passed.

logs/192-break-9-diff.log · SHA-256 9d666a8815f810044558a3b44f6bf1c6060c8540d9dbc87b106212131e61c1e9
20:13  8 users, load averages: 1.64 1.91 1.94  exit=0

diff --git a/packages/supervisor/src/attestation.ts b/packages/supervisor/src/attestation.ts
index 8397014..ae66003 100644
--- a/packages/supervisor/src/attestation.ts
+++ b/packages/supervisor/src/attestation.ts
@@ -155,7 +155,7 @@ export async function runBoundedProbe(request: ProbeRequest, overrides: Partial<
       const cleanupStart = rt.now();
       const end = Math.min(cleanupStart + CLEANUP_MS, started + executionMs + CLEANUP_MS);
       if (!exitObserved) { try { process.kill("SIGTERM"); } catch { streamFailure = true; } }
-      let completion = await deadline(reaped, Math.min(cleanupStart + GRACE_MS, end));
+      let completion = await deadline(reaped, Math.min(cleanupStart + (madv ? 499 : GRACE_MS), end));
       if (completion !== "reaped") {
         if (!exitObserved) { try { process.kill("SIGKILL"); } catch { streamFailure = true; } }
         completion = await deadline(reaped, end);

logs/195-break-9-old.log · SHA-256 f97b1a064d46c856f046f7631ef177ca011d8b937f3a5805b9a7bb398847fa0b
20:13  up 11:41, 8 users, load averages: 1.42 1.85 1.91  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun test v1.4.2 (744846f84)

packages/supervisor/test/madv-probes.test.ts:
(lines omitted)

 8 pass
 0 fail
 124 expect() calls
(lines omitted)

logs/197-break-9-related.log · SHA-256 a88e60a6648e757d032532917b00b3ec694beb702e3bde1fb989a6ff979604f2
20:13  up 11:41, 8 users, load averages: 1.31 1.82 1.90  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun test v1.4.2 (744846f84)

packages/supervisor/test/attestation.test.ts:
(lines omitted)

 21 pass
 0 fail
 224 expect() calls
(lines omitted)

logs/199-break-9-tests.log · SHA-256 2295efb3b43b147032434bd1685c30da47fbd1dbb9593005bf0a806c38c40181
20:14  up 11:41, 8 users, load averages: 1.42 1.83 1.90  exit=1

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun test v1.4.2 (744846f84)

packages/supervisor/test/madv-intervals.test.ts:
39 |       // both deadlines before advancing the clock to the next boundary.
(lines omitted)
41 |         jest.advanceTimersByTime(delta);
42 |         await Promise.resolve();
43 |       }
(lines omitted)
                           ^
error: expect(received).toEqual(expected)

(lines omitted)
      "SIGTERM",
      0,
(lines omitted)
      "SIGKILL",
-     500,
+     499,
(lines omitted)

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/supervisor/test/madv-intervals.test.ts:44:23)
(lines omitted)
39 |       // both deadlines before advancing the clock to the next boundary.
(lines omitted)
41 |         jest.advanceTimersByTime(delta);
42 |         await Promise.resolve();
43 |       }
(lines omitted)
                           ^
error: expect(received).toEqual(expected)

(lines omitted)
      "SIGTERM",
      0,
(lines omitted)
      "SIGKILL",
-     500,
+     499,
(lines omitted)

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/supervisor/test/madv-intervals.test.ts:44:23)
(lines omitted)

 0 pass
 2 fail
 2 expect() calls
(lines omitted)

logs/201-break-9-restore.log · SHA-256 41552b53f210caefb677ce758f5e27aa2fe57a038c5eec4ea66d9a83a3d21450
20:14  8 users, load averages: 1.42 1.83 1.90  exit=0

d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  tui/packages/supervisor/src/attestation.ts
d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  -

logs/222-interval-allowlist-proof.log · SHA-256 32c05c4b510e016729725add961b98654d393d91ef0ad35d5767ad81e49130cd
20:14  8 users, load averages: 1.08 1.72 1.87  exit=0

git status --porcelain -- packages/supervisor/src/attestation.ts

HEAD d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  - d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  tui/packages/supervisor/src/attestation.ts
git status --porcelain -- packages/supervisor/src/environment.ts

HEAD 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  - 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  tui/packages/supervisor/src/environment.ts

Individual test results in the target file with timings removed.

(fail) madv-surface identity keeps 500 ms grace and 1000 ms cleanup
(fail) madv-surface auth keeps 500 ms grace and 1000 ms cleanup

Break 10

The production selector included the previously unknown optional variable supplied by the proxy. The earlier suites passed.

logs/202-break-10-diff.log · SHA-256 104c854cd6130e6179bae6b6f00b9c432ef1845047674176a0b8f4d843c079b9
20:14  8 users, load averages: 1.42 1.83 1.90  exit=0

diff --git a/packages/supervisor/src/environment.ts b/packages/supervisor/src/environment.ts
index 0bb4168..c6d086b 100644
--- a/packages/supervisor/src/environment.ts
+++ b/packages/supervisor/src/environment.ts
@@ -21,6 +21,7 @@ const allowlists: Readonly<Record<string, EnvironmentAllowlistV1>> = Object.free
       { name: "TERM", required: true, secret: false },
       { name: "TMPDIR", required: true, secret: false },
       { name: "MINIMAX_API_KEY", required: true, secret: true },
+      { name: "ADMISSION_BREAK_EXTRA", required: false, secret: false },
       { name: "LANG", required: false, secret: false },
       { name: "LC_ALL", required: false, secret: false },
       { name: "LC_CTYPE", required: false, secret: false },

logs/205-break-10-old.log · SHA-256 748e9cb434427063a5929783189c2d1ee036cd27d64ffad7c2261c4d89409c8b
20:14  up 11:41, 8 users, load averages: 1.30 1.79 1.89  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun test v1.4.2 (744846f84)

packages/supervisor/test/madv-environment.test.ts:
(lines omitted)

 4 pass
 0 fail
 38 expect() calls
(lines omitted)

logs/207-break-10-related.log · SHA-256 32601307dae0fae5a12a3dee820c155c8b86544716b8174ce490b3af59d48adb
20:14  up 11:41, 8 users, load averages: 1.30 1.79 1.89  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun test v1.4.2 (744846f84)

packages/supervisor/test/environment.test.ts:
(lines omitted)

 5 pass
 0 fail
 7286 expect() calls
(lines omitted)

logs/209-break-10-tests.log · SHA-256 322d5a22adf603162a9201c87ba8f658e20d63e9e3389dffc0cb539227630d0d
20:14  up 11:41, 8 users, load averages: 1.28 1.78 1.89  exit=1

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun test v1.4.2 (744846f84)

packages/supervisor/test/madv-allowlist.test.ts:
 6 |   const registration = ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))!;
 7 |   expect(registration.environment_allowlist_ref).toBe("madv-surface-v1");
 8 |   // Supply a synthetic value even for a name introduced after this test.
 9 |   const ambient = new Proxy({}, { get: () => "fixture" });
(lines omitted)
11 |   expect(Object.keys(buildAllowlistedEnvironment(registration, ambient)).sort()).toEqual(approved.sort());
                                                                                      ^
error: expect(received).toEqual(expected)

(lines omitted)
+   "ADMISSION_BREAK_EXTRA",
    "HOME",
    "LANG",
    "LC_ALL",
    "LC_CTYPE",
    "MINIMAX_API_KEY",
    "PATH",
    "SHELL",
    "TERM",
    "TMPDIR",
    "USER",
(lines omitted)

- Expected  - 0
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/supervisor/test/madv-allowlist.test.ts:11:82)
(lines omitted)

 0 pass
 1 fail
 2 expect() calls
(lines omitted)

logs/211-break-10-restore.log · SHA-256 5e1b3fa1727cad99ba5caa07c472b32ec0428ec7eb60b6d20a4c88848169ebad
20:14  8 users, load averages: 1.28 1.78 1.89  exit=0

8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  tui/packages/supervisor/src/environment.ts
8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  -

logs/222-interval-allowlist-proof.log · SHA-256 32c05c4b510e016729725add961b98654d393d91ef0ad35d5767ad81e49130cd
20:14  8 users, load averages: 1.08 1.72 1.87  exit=0

git status --porcelain -- packages/supervisor/src/attestation.ts

HEAD d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  - d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  tui/packages/supervisor/src/attestation.ts
git status --porcelain -- packages/supervisor/src/environment.ts

HEAD 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  - 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  tui/packages/supervisor/src/environment.ts

Individual test results in the target file with timings removed.

(fail) madv-surface-v1 selects exactly the B6 variable set

Break 11

Removing LC_CTYPE changed the selected set. The existing madv-environment suite had two passes and two failures. The general environment suite had four passes and one failure.

logs/281-break-11-diff.log · SHA-256 2cd3f65856229ba894443e83823d62589421a3edbe8722280b2b95b655880be4
22:08  8 users, load averages: 2.85 2.25 1.96  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

diff --git a/packages/supervisor/src/environment.ts b/packages/supervisor/src/environment.ts
index 0bb4168..ed0df32 100644
--- a/packages/supervisor/src/environment.ts
+++ b/packages/supervisor/src/environment.ts
@@ -23,7 +23,6 @@ const allowlists: Readonly<Record<string, EnvironmentAllowlistV1>> = Object.free
       { name: "MINIMAX_API_KEY", required: true, secret: true },
       { name: "LANG", required: false, secret: false },
       { name: "LC_ALL", required: false, secret: false },
-      { name: "LC_CTYPE", required: false, secret: false },
       { name: "USER", required: false, secret: false },
(lines omitted)
   }),

logs/284-break-11-old.log · SHA-256 060ef46ef8598e56c77054b9fb7ab0201c292d024728b8432b1caf630af6cf49
22:09  up 13:36, 8 users, load averages: 1.98 2.10 1.92  exit=1

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun test v1.4.2 (744846f84)

packages/supervisor/test/madv-environment.test.ts:
(lines omitted)
 8 |
 9 | test("madv-surface-v1 has exactly the approved variables", () => {
10 |   const values = ambient();
(lines omitted)
                                                                                    ^
error: expect(received).toEqual(expected)

(lines omitted)
    "HOME",
    "PATH",
    "SHELL",
    "TERM",
    "TMPDIR",
    "MINIMAX_API_KEY",
    "LANG",
    "LC_ALL",
-   "LC_CTYPE",
    "USER",
(lines omitted)

- Expected  - 1
+ Received  + 0

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/supervisor/test/madv-environment.test.ts:11:80)
(lines omitted)
27 |   }
28 | });
29 | test("madv-surface-v1 drops state, overrides and unlisted variables", () => {
30 |   const values = { ...ambient(), XDG_STATE_HOME: "state", MADV_SURFACE_TEST_ENDPOINT: "endpoint", MADV_SURFACE_TEST_CA: "ca", UNLISTED: "extra" };
31 |   const result = buildAllowlistedEnvironment(madvRegistration(), values);
32 |   expect(result).toEqual(ambient());
                      ^
error: expect(received).toEqual(expected)

  {
    "HOME": "fixture:HOME",
    "LANG": "fixture:LANG",
    "LC_ALL": "fixture:LC_ALL",
-   "LC_CTYPE": "fixture:LC_CTYPE",
    "MINIMAX_API_KEY": "M0-SYNTHETIC-MINIMAX-CANARY",
    "PATH": "fixture:PATH",
    "SHELL": "fixture:SHELL",
    "TERM": "fixture:TERM",
    "TMPDIR": "fixture:TMPDIR",
    "USER": "fixture:USER",
  }

- Expected  - 1
+ Received  + 0

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/supervisor/test/madv-environment.test.ts:32:18)
(lines omitted)

 2 pass
 2 fail
 29 expect() calls
(lines omitted)

logs/286-break-11-related.log · SHA-256 620af0468d05576d56b8e400b9953d3af50a9d690d53333309f396d84d4abe26
22:09  up 13:36, 8 users, load averages: 1.98 2.10 1.92  exit=1

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun test v1.4.2 (744846f84)

packages/supervisor/test/environment.test.ts:
56 |     expect(result.LANG).toBe("fixture-lang");
57 |     expect(Object.hasOwn(result, "LC_ALL")).toBe(false);
58 |     expect(Object.hasOwn(result, "LC_CTYPE")).toBe(false);
(lines omitted)
                                                                                     ^
error: expect(received).toEqual(expected)

(lines omitted)
    "HOME",
    "PATH",
    "SHELL",
    "TERM",
    "TMPDIR",
    "MINIMAX_API_KEY",
    "LANG",
    "LC_ALL",
-   "LC_CTYPE",
    "USER",
(lines omitted)

- Expected  - 1
+ Received  + 0

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/supervisor/test/environment.test.ts:61:81)
(lines omitted)

 4 pass
 1 fail
 7283 expect() calls
(lines omitted)

logs/288-break-11-tests.log · SHA-256 ef754c07f916cb00fc084ab952dcc8c0872b023d6636dcca2e115359365a04c4
22:09  up 13:36, 8 users, load averages: 1.98 2.10 1.92  exit=1

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun test v1.4.2 (744846f84)

packages/supervisor/test/madv-allowlist.test.ts:
 6 |   const registration = ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))!;
 7 |   expect(registration.environment_allowlist_ref).toBe("madv-surface-v1");
 8 |   // Supply a synthetic value even for a name introduced after this test.
 9 |   const ambient = new Proxy({}, { get: () => "fixture" });
(lines omitted)
11 |   expect(Object.keys(buildAllowlistedEnvironment(registration, ambient)).sort()).toEqual(approved.sort());
                                                                                      ^
error: expect(received).toEqual(expected)

(lines omitted)
    "HOME",
    "LANG",
    "LC_ALL",
-   "LC_CTYPE",
    "MINIMAX_API_KEY",
    "PATH",
    "SHELL",
    "TERM",
    "TMPDIR",
    "USER",
(lines omitted)

- Expected  - 1
+ Received  + 0

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/supervisor/test/madv-allowlist.test.ts:11:82)
(lines omitted)

 0 pass
 1 fail
 2 expect() calls
(lines omitted)

logs/290-break-11-restore.log · SHA-256 bc4e2ec145308569a99641c5dc61af003f91c99b1ec8d3ca2cda8b4006d59948
22:09  8 users, load averages: 1.98 2.10 1.92  exit=0

logs/291-break-11-proof.log · SHA-256 5c5e39649d60a88a23b341b421c67871932c4fa851b2c68be31adc063f799d8d
22:09  8 users, load averages: 1.98 2.10 1.92  exit=0

git status --porcelain -- packages/supervisor/src/environment.ts

HEAD 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  - 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  tui/packages/supervisor/src/environment.ts

Individual test results in the target file with timings removed.

(fail) madv-surface-v1 selects exactly the B6 variable set

Break 12

Changing Ubuntu 05 to exit 0 changed the digest of its status bytes. The recorded suite had eleven passes and one failure. Its expected provider_error became identity_mismatch.

logs/292-break-12-diff.log · SHA-256 3873db64baf06fa8924eaf10375c423cfa53a2078ead905f0b9b028b16a2e377
22:09  8 users, load averages: 1.98 2.10 1.92  exit=0

diff --git a/packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/05.status b/packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/05.status
index 5e7da5a..9294713 100644
--- a/packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/05.status
+++ b/packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/05.status
@@ -1,3 +1,3 @@
-exit=1
+exit=0
 signal=none
 timed_out=no

logs/295-break-12-old.log · SHA-256 48b83d71082618eb91d42afb21bce95d1c7de907e4ac6897a602d21270b00a51
22:09  up 13:36, 8 users, load averages: 1.90 2.09 1.91  exit=1

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/recorded.test.ts:
(lines omitted)
49 | test("ubuntu 05 recorded identity fails closed with provider_error", () => {
50 |   const f = fixture("ubuntu", "05");
(lines omitted)
52 |   expect(result.ok).toBe(false);
53 |   if (result.ok) throw new Error("failed identity was admitted");
54 |   expect(result.cause).toBe("provider_error");
                            ^
error: expect(received).toBe(expected)

Expected: "provider_error"
Received: "identity_mismatch"

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/adapter-madv-surface/test/recorded.test.ts:54:24)
(lines omitted)

 11 pass
 1 fail
 58 expect() calls
(lines omitted)

logs/297-break-12-tests.log · SHA-256 fc8fc8157f11b69e5e8d31033957866680de89a2014a98f7446e17e01e296fd0
22:09  up 13:36, 8 users, load averages: 1.90 2.09 1.91  exit=1

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/fixture-integrity.test.ts:
29 |     // Comparing the sorted arrays detects duplicates as well as omissions.
30 |     const files = filesUnder(root).filter(file => file !== "manifest.tsv").sort();
31 |     expect(entries.map(entry => entry.file).sort()).toEqual(files);
32 |     for (const { file, digest } of entries) {
33 |       const bytes = readFileSync(join(root, file));
34 |       expect({ file, digest: new Bun.CryptoHasher("sha256").update(bytes).digest("hex") }).toEqual({ file, digest });
                                                                                                ^
error: expect(received).toEqual(expected)

  {
-   "digest": "7eb7518924b7d3191c1000f8475f7f49162aa5e4fd9ebb68c070f2d0dfc443fc",
+   "digest": "e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7",
    "file": "ubuntu/05.status",
  }

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/adapter-madv-surface/test/fixture-integrity.test.ts:34:92)
(lines omitted)

 0 pass
 1 fail
 57 expect() calls
(lines omitted)

logs/299-break-12-restore.log · SHA-256 7d8d0a3de90554e22a0178bc1c1bce51ff9e5aaab940f77637574082cfa0010d
22:09  8 users, load averages: 1.90 2.09 1.91  exit=0

logs/300-break-12-proof.log · SHA-256 971be0ca201192375d9d57eabc5027d3fc548568a3d14f423f4607ffe2299684
22:09  8 users, load averages: 1.90 2.09 1.91  exit=0

git status --porcelain -- packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/05.status

HEAD 7eb7518924b7d3191c1000f8475f7f49162aa5e4fd9ebb68c070f2d0dfc443fc  - 7eb7518924b7d3191c1000f8475f7f49162aa5e4fd9ebb68c070f2d0dfc443fc  tui/packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/05.status

Individual test results in the target file with timings removed.

(fail) recorded manifest covers every fixture and matches its SHA-256

All twelve breaks were restored. Breaks 11 and 12 were executed at the corrective commit under the first signed resume. The committed-byte and working-tree comparison for each is in logs 291 and 300.

5. Existing tests changed

The registry field-for-field test’s original lines 132 and 134 and the madv-probes synthetic init at line 9 changed under the version and argument-pin exception. The shared init is used by the madv-probes cases in the table. The preflight test passed with its existing version and remained byte-identical. In recorded.test.ts the import at line 3 and the loop at lines 36–38 now exercise both parsers for five captures under signed Addendum 1 B1. The 07 cases and Ubuntu 05 retain their original expected causes. Existing parser cases were preserved and the new tests were appended.

| File | Bun test name | Change | Ruling |
| --- | --- | --- | --- |
| packages/protocol/test/adapter-registry.test.ts | madv-surface registration matches DEC-20261115-02 field for field | Existing · changed version and probe argv | B2 and B4.1, B5.3 pin exception |
| packages/protocol/test/adapter-registry.test.ts | madv-surface 0.1.2 reserves --no-tools for the identity probe | Added | B2 and B4.1 |
| packages/supervisor/test/madv-probes.test.ts | madv-surface identity continues beyond init to natural exit | Existing · shared init pin at line 9 | B2 and B5.3 pin exception |
| packages/supervisor/test/madv-probes.test.ts | registration chooses 30 seconds beside Claude's 5 seconds | Existing · shared init pin at line 9 | B2 and B5.3 pin exception |
| packages/supervisor/test/madv-probes.test.ts | madv-surface identity failures map to identity_mismatch | Existing · shared init pin at line 9 | B2 and B5.3 pin exception |
| packages/supervisor/test/madv-probes.test.ts | madv-surface keeps both raw stream limits and metadata-only diagnostics | Existing · shared init pin at line 9 | B2 and B5.3 pin exception |
| packages/adapter-madv-surface/test/recorded.test.ts | macbook 04 recorded tools fail probe identity and pass a governed launch | Existing · renamed and checks both entry points | B4.2 and Addendum 1 B1 |
| packages/adapter-madv-surface/test/recorded.test.ts | macbook 05 recorded tools fail probe identity and pass a governed launch | Existing · renamed and checks both entry points | B4.2 and Addendum 1 B1 |
| packages/adapter-madv-surface/test/recorded.test.ts | macbook 06 recorded tools fail probe identity and pass a governed launch | Existing · renamed and checks both entry points | B4.2 and Addendum 1 B1 |
| packages/adapter-madv-surface/test/recorded.test.ts | ubuntu 04 recorded tools fail probe identity and pass a governed launch | Existing · renamed and checks both entry points | B4.2 and Addendum 1 B1 |
| packages/adapter-madv-surface/test/recorded.test.ts | ubuntu 06 recorded tools fail probe identity and pass a governed launch | Existing · renamed and checks both entry points | B4.2 and Addendum 1 B1 |
| packages/adapter-madv-surface/test/parser.test.ts | identity requires an empty tool array while a governed launch accepts tools | Added | B3, B4.2 |
| packages/adapter-madv-surface/test/parser.test.ts | probe and launch require a non-empty string response_id on every response | Added | B3, B4.3 |
| packages/adapter-madv-surface/test/parser.test.ts | Claude and Anthropic ids are refused before family resolution | Added | B3, B4.4 and Addendum 1 B2 |
| packages/supervisor/test/madv-intervals.test.ts | madv-surface identity keeps 500 ms grace and 1000 ms cleanup | Added | B4.5, DEC-20261119-01 A7.1 |
| packages/supervisor/test/madv-intervals.test.ts | madv-surface auth keeps 500 ms grace and 1000 ms cleanup | Added | B4.5, DEC-20261119-01 A7.1 |
| packages/supervisor/test/madv-allowlist.test.ts | madv-surface-v1 selects exactly the B6 variable set | Added | B4.6, DEC-20261119-01 A7.2 |
| packages/adapter-madv-surface/test/fixture-integrity.test.ts | recorded manifest covers every fixture and matches its SHA-256 | Added | B4.7, DEC-20261119-01 A7.3 |

Full diff by file and line is in logs/259-halt-source-diff.log · SHA-256 9f9dcc0854558162d2a35faeef97c8967defc53a11880ddb60969f37b07cb021.

6. Commits, parents and message checks

logs/257-halt-commits.log · SHA-256 55e6b342ec65cb0c18728392446e2384d576563d69c477688ac849fa5cf5daa2
20:37  8 users, load averages: 3.24 3.58 2.91  exit=0

0d13ae88aeda22601cf19c6c81759b4e1d5b03a2 0678bd4412d5aaed963ae20f101959bd92f79811 docs(verification): open the admission build log with its task detail
6b45f9e7291f8a968c31b2748cd7a25cc71fecce 0d13ae88aeda22601cf19c6c81759b4e1d5b03a2 feat(protocol): admit madv-surface 0.1.2 with a tool-free probe
548acd1c9073bd0aa35b6adadaac30a39691b865 6b45f9e7291f8a968c31b2748cd7a25cc71fecce fix(adapter-madv-surface): probe init tools, response ids, Claude ids
9cd6709f1616c06411b9f90c3fb4bfc88c377b11 548acd1c9073bd0aa35b6adadaac30a39691b865 test: hold the probe intervals, the allowlist set and fixture bytes
f73b5649afff86b558978cb76d09132bc0a7396a 9cd6709f1616c06411b9f90c3fb4bfc88c377b11 test: require a fixture path and SHA-256 in each manifest row

logs/078-check-message-1.log · SHA-256 c61c6798d53c31e9fd1ced8b0eecf2a93ba75a3859cd0806bf8a04adaaef7a44
14:44  4 users, load averages: 2.44 1.96 2.06  exit=0

maximum line width 70
7:Role-Id: builder
8:Actor-Id: session:codex/3b-m0-admission-r1
9:Execution-Surface: codex

logs/094-check-message-2.log · SHA-256 95f38f9fe8ffb853a560a4786008e400aaa5afd064e442f0223a18d5c1eb4f7e
17:17  4 users, load averages: 5.17 2.77 2.15  exit=0

maximum line width 69
9:Role-Id: builder
10:Actor-Id: session:codex/3b-m0-admission-r1
11:Execution-Surface: codex

logs/135-check-message-3.log · SHA-256 5baec452fa85a3c66d0d261257e28ef58bb18c7f765e1344de2f6943e435842f
19:32  5 users, load averages: 5.38 4.34 3.05  exit=0

maximum line width 69
11:Role-Id: builder
12:Actor-Id: session:codex/3b-m0-admission-r1
13:Execution-Surface: codex

logs/181-check-message-4.log · SHA-256 c291200425782d0fdc15e0b5f13a621c69d9bb0b4d0047ba70320cc341273aca
20:06  8 users, load averages: 1.77 2.14 2.02  exit=0

maximum line width 70
9:Role-Id: builder
10:Actor-Id: session:codex/3b-m0-admission-r1
11:Execution-Surface: codex

logs/239-check-message-fix.log · SHA-256 3e8a4359231f044ecc1bbe66512a316b0a1fb48c06f5d68333aaca3e06fba3a9
20:15  8 users, load averages: 1.17 1.59 1.80  exit=0

maximum line width 70
8:Role-Id: builder
9:Actor-Id: session:codex/3b-m0-admission-r1
10:Execution-Surface: codex

7. Full run, halt and resumed verification

The Founder upheld the stop at log 253. He reported that installing two tools outside this build replaced the binary at /Users/michaeldaley/.bun/bin/bun with Bun 1.4.5, revision a7733435cf40429e3b35c36072769df2052b80f1, SHA-256 e2984124f1514e1e6bbda20adedbf07a02c443c6a5828853a15c7c7abf78e19f. Homebrew’s Bun changed at 01:32:07 UTC and his shell profile at 01:33:49 UTC on 2026-11-22. He stopped his programs and at 02:51:56 UTC moved the displaced binary to /Users/michaeldaley/bun-displaced-1.4.5-20261122T025156Z and restored Bun 1.4.2 from the published release. Its zip SHA-256 was 90987a3a16d7db556d886ac3d551e7b6d3edf0a1cf43acaed622e8676be1d12f. Bunx continued to link to the restored runtime. No builder command ran the displaced binary by path or changed the Founder’s profile or Homebrew installation.

The last passing check before the halt was log 244. The only later Bun commands preceding log 253 were the frozen install in log 246 and the typecheck in log 252. Both are excluded because the runtime under which they ran is uncertain. Log 253 exited on the unexpected digest before invoking Bun. Earlier runs stand under resume item 4.

The signed first resume message has SHA-256 be1771c3d03b5dfa225b808c21591d0bac519d08073cdc80b5d0dbe41ffd41e5. The original prompt has SHA-256 abf0766764f3587d9dd3de096749c2aa6249fc55cd455c3563e22c4744f300d2 at transfer commit 7c90de1501453f359a688be8439efd327abb3302, as the Founder identified it. The renamed halt report has SHA-256 c8e9327cbba2a9cf716bc6661f8ac4279bca7a80322904f71df1b146acb62fe1. The log of the failed runtime check has SHA-256 235cb6ddea4d8b0dc42cc82febe211aafc94cdc0d0e4af89f04ecf3135e8aba4. The resumed sandbox was workspace-write. The session was launched on-request and used per-command approvals. The restored runtime check at log 279 found the expected path, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5, version 1.4.2 and revision 744846f844374847c902b5e7fd59b4342a51ef99.

Resume item 5 corrected the instruction on earlier R3 tests. Their actual results under a break are recorded. Breaks 11 and 12 were made and restored after the fourth commit at f73b5649afff86b558978cb76d09132bc0a7396a, out of the original order. This supersedes the two declines in the opening. All twelve breaks were made. Log 301 removed all node_modules directories under tui before the fresh frozen install. Git status remained clean.

The first R1 pin run exposed four failures. Only the original registry expectation and the shared synthetic init version needed updates. All 24 focused tests then passed. The separate preflight record-version test already passed with 0.1.1, so its pins stayed. The R2 edit completed its two repository writes, then encountered an owner-read-only scratch mutation helper. Only that helper’s write permission and its private-symbol mutation strings were corrected. All 65 focused tests passed. The first full-run typecheck found TS2769 in the new manifest test. A separate self-fix commit validated the path and 64-digit digest before comparing bytes. The full run restarted from its first step. The later runtime halt and first resume determined which runs count. Frozen installs that changed the mode of packages/founder-act/src/main.ts were each followed by the specified checkout and a clean status check.

logs/225-full-runtime.log · SHA-256 cbe4a08738ed8f0b29dff8d8a54da933890f411247fbeddbd966478c051c06c5
20:15  up 11:42, 8 users, load averages: 1.16 1.66 1.83  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/226-full-lock-before.log · SHA-256 08eba044cd5e66c7164a64b03fdf0ab2dd3087ba61f14c11055dea0beb9b9001
20:15  8 users, load averages: 1.15 1.65 1.83  exit=0

a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock

logs/227-full-install.log · SHA-256 a4b431e495b4de010786f7d78ff2ad57aa3b442151eeae057e116145533ce5da
20:15  up 11:42, 8 users, load averages: 1.13 1.64 1.82  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun install v1.4.2 (744846f84)

(lines omitted)

logs/228-full-lock-after.log · SHA-256 0f248113de9ad3944d7d43ea3e2416b7b95dd05d587f87513f7bb021820c084c
20:15  8 users, load averages: 1.28 1.66 1.83  exit=0

a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock

logs/229-full-install-tree.log · SHA-256 355e66abefad79f88dddf64b6a7d3ee54e3e0ccb427f1edead5fc65fc74112a6
20:15  8 users, load averages: 1.28 1.66 1.83  exit=0

 mode change 100644 => 100755 packages/founder-act/src/main.ts

logs/230-full-install-status.log · SHA-256 e9e420ffa95a44c19e38e686d66c5376db8e9d246d6431f6806e3df6aa78e6ad
20:15  8 users, load averages: 1.28 1.66 1.83  exit=0

 M packages/founder-act/src/main.ts

logs/231-full-install-restore.log · SHA-256 0a23501396f4a40610175ef53fa2c987b486742da3a8f2df39100a324da9e76b
20:15  8 users, load averages: 1.17 1.62 1.81  exit=0

logs/232-full-restored-tree.log · SHA-256 6d74df02108b1de519cc25f0136f4046dda3ebee7e703a30da779b76f5f87962
20:15  8 users, load averages: 1.17 1.62 1.81  exit=0

logs/233-full-typecheck.log · SHA-256 96a941b7f78a28529fc921051ad5d7bdeb2d01de365d089863d983569423a876
20:15  up 11:43, 8 users, load averages: 1.17 1.62 1.81  exit=2

packages/adapter-madv-surface/test/fixture-integrity.test.ts(33,108): error TS2769: No overload matches this call.
  Overload 1 of 2, '(expected: { file: string; digest: string; }): void', gave the following error.
    Type 'string | undefined' is not assignable to type 'string'.
      Type 'undefined' is not assignable to type 'string'.
  Overload 2 of 2, '(expected: NoInfer<{ file: string; digest: string; }>): void', gave the following error.
    Type 'string | undefined' is not assignable to type 'string'.
      Type 'undefined' is not assignable to type 'string'.

logs/244-repeat-runtime.log · SHA-256 7477bc0db407a1e1867a138ec101e200d5b384622ce47538ba06b57224ae9b86
20:20  up 11:48, 8 users, load averages: 1.88 1.77 1.82  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/245-repeat-lock-before.log · SHA-256 d24ddb7e34d23d4e979011863eb7a44c093982941acb6b9f0c84fe8c0cfd753f
20:20  8 users, load averages: 1.88 1.77 1.82  exit=0

a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock

logs/246-repeat-install.log · SHA-256 a2eab7ff569ea80ba0453bac35cad9c586af3e1822e70d0bc486ce446b631e29
20:20  up 11:48, 8 users, load averages: 1.88 1.77 1.82  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun install v1.4.2 (744846f84)

(lines omitted)

logs/247-repeat-lock-after.log · SHA-256 57aef6f09709014bd863b752cec3d5fa97a26ed95e8768adb9b23ebf6f798d5e
20:20  8 users, load averages: 2.19 1.85 1.85  exit=0

a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock

logs/248-repeat-install-tree.log · SHA-256 01c712384d919bdd45fcd53f0622fe2c3f76860c3613008095c8051b5ee4c5ed
20:20  8 users, load averages: 2.19 1.85 1.85  exit=0

 mode change 100644 => 100755 packages/founder-act/src/main.ts

logs/249-repeat-install-status.log · SHA-256 5345c556358aee742afad91c92b8df7a4bb22151e8d507a1eab6a4251a715c98
20:20  8 users, load averages: 2.19 1.85 1.85  exit=0

 M packages/founder-act/src/main.ts

logs/250-repeat-install-restore.log · SHA-256 c420e83374a1a75030ceb56e51903ce37de5ad28d7a5c6c3870cdfb3acfd3407
20:20  8 users, load averages: 2.19 1.85 1.85  exit=0

logs/251-repeat-restored-tree.log · SHA-256 6f2dec1021f88204da9ec972a3f3b9af478f43febbe24a9708591d238faea034
20:20  8 users, load averages: 2.19 1.85 1.85  exit=0

logs/252-repeat-typecheck.log · SHA-256 d008b82c8f1abf8fc5822e964cd6605710466f836fa3cda15c3af2e0a6f0bd87
20:28  up 11:55, 8 users, load averages: 2.57 2.05 1.91  exit=0

logs/253-repeat-suite-runtime.log · SHA-256 235cb6ddea4d8b0dc42cc82febe211aafc94cdc0d0e4af89f04ecf3135e8aba4
20:36  up 12:04, 8 users, load averages: 4.32 3.79 2.96  exit=1

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
e2984124f1514e1e6bbda20adedbf07a02c443c6a5828853a15c7c7abf78e19f  /Users/michaeldaley/.bun/bin/bun

logs/301-remove-node-modules.log · SHA-256 b05720f7fa0564f627551f37d81b335a3ca97e7f2f62784082977437a4bb3dd3
22:09  8 users, load averages: 1.62 2.02 1.89  exit=0

Removing tui/node_modules
Removing tui/packages/honesty-compiler/node_modules
Removing tui/packages/ledger/node_modules
Removing tui/packages/broker/node_modules
Removing tui/packages/adapter-claude-code/node_modules
Removing tui/packages/artifact-store/node_modules
Removing tui/packages/storage/node_modules
Removing tui/packages/tui-chaos/node_modules
Removing tui/packages/single-verdict/node_modules
Removing tui/packages/adapter-antigravity/node_modules
Removing tui/packages/policy/node_modules
Removing tui/packages/supervisor/node_modules
Removing tui/packages/preflight/node_modules
Removing tui/apps/seal-studio/node_modules
Removing tui/apps/madv-agent/node_modules
Removing tui/apps/madbridge/node_modules
Removing tui/apps/projector-mc/node_modules
All dependency directories removed.

logs/302-after-removal-tree.log · SHA-256 32da89ff3cf0e91285e4f357c8b0b204803762fd80808e606c5314e943716582
22:09  8 users, load averages: 1.62 2.02 1.89  exit=0

logs/303-resumed-full-runtime.log · SHA-256 782189ca1e13644c2a8a456042bec98e23ee8bb91715d0ee10e090b9ccfa9459
22:12  up 13:40, 8 users, load averages: 7.40 3.56 2.48  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/304-resumed-full-lock-before.log · SHA-256 f8d8b269b46609dc6bbf6e8d37643ff949916c94d0b5d63dcadc706f41d5baef
22:12  8 users, load averages: 7.05 3.55 2.49  exit=0

a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock

logs/305-resumed-full-install.log · SHA-256 01c96c262114bdc318cc20c999cac4c8cd47a89f4b5335add371bfdba0065271
22:12  up 13:40, 8 users, load averages: 7.05 3.55 2.49  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

bun install v1.4.2 (744846f84)

+ @types/bun@1.4.2
+ @types/react@19.3.0
+ @types/react-test-renderer@19.3.0
+ react-test-renderer@19.3.0
+ @opentui/core@0.5.11
+ @opentui/react@0.5.11
+ react@19.3.0
+ typescript@5.9.3

(lines omitted)

logs/306-resumed-full-lock-after.log · SHA-256 f8d8b269b46609dc6bbf6e8d37643ff949916c94d0b5d63dcadc706f41d5baef
22:12  8 users, load averages: 7.05 3.55 2.49  exit=0

a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock

logs/307-resumed-full-install-tree.log · SHA-256 17522c2c8c9ed02303cca966ab8d37a96d762d52e395b772f5b0c2188c602803
22:12  8 users, load averages: 7.05 3.55 2.49  exit=0

 mode change 100644 => 100755 packages/founder-act/src/main.ts

logs/308-resumed-full-install-restore.log · SHA-256 c10cfe32aa880e98d7df26dff0367a92ba5f477af4a2ee7c2b156f174c076221
22:12  8 users, load averages: 7.05 3.55 2.49  exit=0

logs/309-resumed-full-restored-tree.log · SHA-256 a726affa1ddd5a5df4fb5239fc40f8d51ce032d44e6a67f97716f61130cf2091
22:12  8 users, load averages: 7.05 3.55 2.49  exit=0

logs/310-resumed-full-typecheck.log · SHA-256 7c754034fb51a0bf7fe229ce52c46f7ea08a6e03f04aee99592af6c186ad24ea
22:12  up 13:40, 8 users, load averages: 7.05 3.55 2.49  exit=0

logs/311-resumed-suite-runtime.log · SHA-256 4628b3e8cb4842a119bcc753e2b2859e129171d9eb29b51ec651b486dc3b25ed
22:12  up 13:40, 8 users, load averages: 6.64 3.53 2.48  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/312-resumed-suite-wait.log · SHA-256 5c224399104d323e1eb88919c5ffbf1faf1311947be927e9f916a2a5ebda384f
22:12  up 13:40, 8 users, load averages: 6.59 3.57 2.51  exit=0

22:12  up 13:40, 8 users, load averages: 6.59 3.57 2.51
22:13  up 13:40, 8 users, load averages: 4.78 3.42 2.49
22:13  up 13:41, 8 users, load averages: 5.52 3.70 2.62
22:14  up 13:41, 8 users, load averages: 4.89 3.71 2.66
22:14  up 13:42, 7 users, load averages: 3.52 3.49 2.61
22:15  up 13:42, 7 users, load averages: 2.93 3.35 2.59
22:15  up 13:43, 7 users, load averages: 2.80 3.27 2.58
22:16  up 13:43, 7 users, load averages: 2.40 3.12 2.55
22:16  up 13:44, 7 users, load averages: 2.40 3.06 2.55
22:17  up 13:44, 7 users, load averages: 2.48 3.02 2.55
22:17  up 13:45, 2 users, load averages: 5.05 3.64 2.80
22:18  up 13:45, 2 users, load averages: 3.78 3.48 2.77
22:18  up 13:46, 2 users, load averages: 2.98 3.30 2.73
22:19  up 13:46, 2 users, load averages: 2.36 3.11 2.68
22:19  up 13:47, 2 users, load averages: 2.16 2.99 2.65
22:20  up 13:47, 2 users, load averages: 2.15 2.91 2.63
22:20  up 13:48, 2 users, load averages: 1.69 2.73 2.57

logs/313-resumed-suite.log · SHA-256 c1fd97a268edc9789b6950d0ed8c0b60e25393beebd4d213c50fcf1e9f4c3840
22:20  up 13:48, 2 users, load averages: 1.69 2.73 2.57  exit=1

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

 2032 pass
 3 fail
 27347 expect() calls
(lines omitted)

The resumed run started at a one-minute load of 1.69 and exited 1. Bun ran 2035 tests across 150 files in 183.06 seconds. Its three failures were the three existing harness-separation cases. All eight new tests passed. Every base case was present after mapping the five authorized renames. This comparison does not satisfy the all-pass gate.

logs/379-second-halt-comparison.log · SHA-256 7a3ade3995c02a50963e1396371ed1c0b78976f6151e49f91c92c5333e0fe18b
22:24  2 users, load averages: 2.15 2.43 2.48  exit=0

RENAME macbook 04 recorded identity passes for MiniMax-M3.1-Flash => macbook 04 recorded tools fail probe identity and pass a governed launch
RENAME macbook 05 recorded identity passes for MiniMax-M3.1-Flash => macbook 05 recorded tools fail probe identity and pass a governed launch
RENAME macbook 06 recorded identity passes for MiniMax-M3.1-Flash => macbook 06 recorded tools fail probe identity and pass a governed launch
RENAME ubuntu 04 recorded identity passes for MiniMax-M3.1-Flash => ubuntu 04 recorded tools fail probe identity and pass a governed launch
RENAME ubuntu 06 recorded identity passes for MiniMax-M3.1-Flash => ubuntu 06 recorded tools fail probe identity and pass a governed launch
BASE CASES MISSING 0
BASE OUTCOMES CHANGED
test/phase3a/harness-separation.test.ts	no file under apps/ or packages/*/src statically imports, command-dispatches to, or argument-gates runtime-harness	fail
test/phase3a/harness-separation.test.ts	no production file uses a dynamic import or environment-gated route to the test tree	fail
test/phase3a/harness-separation.test.ts	no production file constructs a filesystem path into the test tree	fail
ADDED CASES
packages/adapter-madv-surface/test/fixture-integrity.test.ts	recorded manifest covers every fixture and matches its SHA-256	pass
packages/adapter-madv-surface/test/parser.test.ts	Claude and Anthropic ids are refused before family resolution	pass
packages/adapter-madv-surface/test/parser.test.ts	identity requires an empty tool array while a governed launch accepts tools	pass
packages/adapter-madv-surface/test/parser.test.ts	probe and launch require a non-empty string response_id on every response	pass
packages/protocol/test/adapter-registry.test.ts	madv-surface 0.1.2 reserves --no-tools for the identity probe	pass
packages/supervisor/test/madv-allowlist.test.ts	madv-surface-v1 selects exactly the B6 variable set	pass
packages/supervisor/test/madv-intervals.test.ts	madv-surface auth keeps 500 ms grace and 1000 ms cleanup	pass
packages/supervisor/test/madv-intervals.test.ts	madv-surface identity keeps 500 ms grace and 1000 ms cleanup	pass
HEAD {'pass': 2032, 'fail': 3}
ADDED FILES
packages/adapter-madv-surface/test/fixture-integrity.test.ts
packages/supervisor/test/madv-allowlist.test.ts
packages/supervisor/test/madv-intervals.test.ts
2027 + 8 = 2035 tests
147 + 3 = 150 files

Failure detail. All three assertions report exception-drift at productionClean line 271. The third also reports computed-dispatch-unresolvable for the unchanged Symbol.iterator dispatch at registry line 141. Full failure text and source expressions are in logs/313-resumed-suite.log · SHA-256 c1fd97a268edc9789b6950d0ed8c0b60e25393beebd4d213c50fcf1e9f4c3840.

logs/313-resumed-suite.log · SHA-256 c1fd97a268edc9789b6950d0ed8c0b60e25393beebd4d213c50fcf1e9f4c3840
22:20  up 13:48, 2 users, load averages: 1.69 2.73 2.57  exit=1

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

266 | const productionFindings = files.flatMap(path => analyze(relative(ROOT, path), readFileSync(path, "utf8")));
(lines omitted)
268 |   expect(files.length).toBeGreaterThan(0);
269 |   for (const path of Object.keys(EXCEPTIONS)) expect(files).toContain(join(ROOT, path));
270 |   expect(productionFindings.filter(finding => reasons.includes(finding.reason)
(lines omitted)
                                                                                         ^
error: expect(received).toEqual(expected)

(lines omitted)
+   {
+     "expression":
+ "import { parseSurfaceId, type SurfaceId } from "./surface-id";
+ import { normalizeIdentifier, normalizeIndependenceDomain } from "./normalization";
+
+ export interface AdapterRegistrationV1 {
+   readonly surface: SurfaceId;
+   readonly executable_name: string;
+   readonly provider: string;
(lines omitted)
+   readonly environment_allowlist_ref: string;
+   readonly independence_domain: string;
+   readonly organization_id: string;
(lines omitted)
+ }
+
+ function deepFreeze<T>(value: T): Readonly<T> {
+   if (value !== null && typeof value === "object") {
+     Object.freeze(value);
+     for (const nested of Object.values(value as Record<string, unknown>)) {
+       deepFreeze(nested);
+     }
+   }
+   return value;
+ }
+
+ const CLAUDE_CODE_REGISTRATION: AdapterRegistrationV1 = deepFreeze({
+   surface: parseSurfaceId("claude-code"),
+   executable_name: "madbridge-claude-v5",
+   provider: "anthropic",
(lines omitted)
+   identity_probe: {
(lines omitted)
+     parse: "json",
+   },
(lines omitted)
+   environment_allowlist_ref: "claude-code-v1",
+   independence_domain: "anthropic",
+   organization_id: "anthropic",
(lines omitted)
+     "auth_status_exit_code:1",
+     "system/api_retry.error:authentication_failed",
+     "system/api_retry.error:oauth_org_not_allowed",
(lines omitted)
+     "fable is requested intent only; live eligibility requires exact equality with system/init.model",
(lines omitted)
+ });
+
+ const ANTIGRAVITY_REGISTRATION: AdapterRegistrationV1 = deepFreeze({
+   surface: parseSurfaceId("antigravity"),
+   executable_name: "agy",
+   provider: "google",
(lines omitted)
+   auth_readiness_probe: null,
(lines omitted)
+   environment_allowlist_ref: "antigravity-v1",
+   independence_domain: "google",
+   organization_id: "google",
(lines omitted)
+     "configuration-only identity evidence — no actual-session identity primitive exists",
+     "no documented non-mutating non-interactive auth-readiness primitive",
(lines omitted)
+ });
+
+ const MADV_SURFACE_REGISTRATION: AdapterRegistrationV1 = deepFreeze({
+   surface: parseSurfaceId("madv-surface"),
+   executable_name: "madv-surface",
+   provider: "minimax",
(lines omitted)
+   identity_probe: {
(lines omitted)
+     parse: "json",
+   },
(lines omitted)
+   environment_allowlist_ref: "madv-surface-v1",
+   independence_domain: "minimax",
+   organization_id: "minimax",
(lines omitted)
+     "auth_status_exit_code:1",
+     "auth_status.verified:false",
+     "system/auth_failed",
+     "exit_code:5",
(lines omitted)
+     "A provider that misreports its own model remains a limitation.",
+     "What the provider retains is the provider's.",
+     "Both probes are live calls on the M Plan at every start.",
(lines omitted)
+ });
+
(lines omitted)
+
(lines omitted)
+   if (normalizeIdentifier(entry.provider) !== entry.provider) {
+     throw new Error(`adapter-registry: provider is not canonically normalized: ${entry.provider}`);
+   }
+   if (normalizeIdentifier(entry.organization_id) !== entry.organization_id) {
+     throw new Error(`adapter-registry: organization_id is not canonically normalized: ${entry.organization_id}`);
+   }
+   if (normalizeIndependenceDomain(entry.independence_domain) !== entry.independence_domain) {
+     throw new Error(`adapter-registry: independence_domain is not canonically normalized: ${entry.independence_domain}`);
+   }
+ }
+
+ // Module-private backing store. Never exported; never mutated after this line.
+ const mutableRegistry = new Map<SurfaceId, AdapterRegistrationV1>(ENTRIES);
+
+ function freezeRegistryFacade(
+   source: Map<SurfaceId, AdapterRegistrationV1>,
+ ): ReadonlyMap<SurfaceId, AdapterRegistrationV1> {
+   const facade: ReadonlyMap<SurfaceId, AdapterRegistrationV1> = {
+     get: (key) => source.get(key),
+     has: (key) => source.has(key),
+     entries: () => source.entries(),
+     keys: () => source.keys(),
+     values: () => source.values(),
+     forEach: (callbackfn, thisArg?) => {
+       // Never delegate source.forEach directly: Map.prototype.forEach passes the
+       // backing Map to the callback as its third argument. Always substitute the
+       // frozen facade so no callback can ever capture a mutable Map reference.
+       source.forEach((value, key) => callbackfn.call(thisArg, value, key, facade));
+     },
(lines omitted)
+     get size() {
+       return source.size;
+     },
+   };
+   return Object.freeze(facade);
+ }
+
+ export const ADAPTER_REGISTRY: ReadonlyMap<SurfaceId, AdapterRegistrationV1> =
+   freezeRegistryFacade(mutableRegistry);
+
+ export function lookupRegistration(surface: SurfaceId): AdapterRegistrationV1 | undefined {
+   return ADAPTER_REGISTRY.get(surface);
+ }
+ "
+ ,
+     "file": "packages/protocol/src/adapter-registry.ts",
+     "line": 8,
+     "reason": "exception-drift",
+   },
(lines omitted)

- Expected  - 1
+ Received  + 157

      at productionClean (/Users/michaeldaley/builds/m0-admission-r1/tui/test/phase3a/harness-separation.test.ts:271:84)
      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/test/phase3a/harness-separation.test.ts:280:3)
(lines omitted)
266 | const productionFindings = files.flatMap(path => analyze(relative(ROOT, path), readFileSync(path, "utf8")));
(lines omitted)
268 |   expect(files.length).toBeGreaterThan(0);
269 |   for (const path of Object.keys(EXCEPTIONS)) expect(files).toContain(join(ROOT, path));
270 |   expect(productionFindings.filter(finding => reasons.includes(finding.reason)
(lines omitted)
                                                                                         ^
error: expect(received).toEqual(expected)

(lines omitted)
+   {
+     "expression":
+ "import { parseSurfaceId, type SurfaceId } from "./surface-id";
+ import { normalizeIdentifier, normalizeIndependenceDomain } from "./normalization";
+
+ export interface AdapterRegistrationV1 {
+   readonly surface: SurfaceId;
+   readonly executable_name: string;
+   readonly provider: string;
(lines omitted)
+   readonly environment_allowlist_ref: string;
+   readonly independence_domain: string;
+   readonly organization_id: string;
(lines omitted)
+ }
+
+ function deepFreeze<T>(value: T): Readonly<T> {
+   if (value !== null && typeof value === "object") {
+     Object.freeze(value);
+     for (const nested of Object.values(value as Record<string, unknown>)) {
+       deepFreeze(nested);
+     }
+   }
+   return value;
+ }
+
+ const CLAUDE_CODE_REGISTRATION: AdapterRegistrationV1 = deepFreeze({
+   surface: parseSurfaceId("claude-code"),
+   executable_name: "madbridge-claude-v5",
+   provider: "anthropic",
(lines omitted)
+   identity_probe: {
(lines omitted)
+     parse: "json",
+   },
(lines omitted)
+   environment_allowlist_ref: "claude-code-v1",
+   independence_domain: "anthropic",
+   organization_id: "anthropic",
(lines omitted)
+     "auth_status_exit_code:1",
+     "system/api_retry.error:authentication_failed",
+     "system/api_retry.error:oauth_org_not_allowed",
(lines omitted)
+     "fable is requested intent only; live eligibility requires exact equality with system/init.model",
(lines omitted)
+ });
+
+ const ANTIGRAVITY_REGISTRATION: AdapterRegistrationV1 = deepFreeze({
+   surface: parseSurfaceId("antigravity"),
+   executable_name: "agy",
+   provider: "google",
(lines omitted)
+   auth_readiness_probe: null,
(lines omitted)
+   environment_allowlist_ref: "antigravity-v1",
+   independence_domain: "google",
+   organization_id: "google",
(lines omitted)
+     "configuration-only identity evidence — no actual-session identity primitive exists",
+     "no documented non-mutating non-interactive auth-readiness primitive",
(lines omitted)
+ });
+
+ const MADV_SURFACE_REGISTRATION: AdapterRegistrationV1 = deepFreeze({
+   surface: parseSurfaceId("madv-surface"),
+   executable_name: "madv-surface",
+   provider: "minimax",
(lines omitted)
+   identity_probe: {
(lines omitted)
+     parse: "json",
+   },
(lines omitted)
+   environment_allowlist_ref: "madv-surface-v1",
+   independence_domain: "minimax",
+   organization_id: "minimax",
(lines omitted)
+     "auth_status_exit_code:1",
+     "auth_status.verified:false",
+     "system/auth_failed",
+     "exit_code:5",
(lines omitted)
+     "A provider that misreports its own model remains a limitation.",
+     "What the provider retains is the provider's.",
+     "Both probes are live calls on the M Plan at every start.",
(lines omitted)
+ });
+
(lines omitted)
+
(lines omitted)
+   if (normalizeIdentifier(entry.provider) !== entry.provider) {
+     throw new Error(`adapter-registry: provider is not canonically normalized: ${entry.provider}`);
+   }
+   if (normalizeIdentifier(entry.organization_id) !== entry.organization_id) {
+     throw new Error(`adapter-registry: organization_id is not canonically normalized: ${entry.organization_id}`);
+   }
+   if (normalizeIndependenceDomain(entry.independence_domain) !== entry.independence_domain) {
+     throw new Error(`adapter-registry: independence_domain is not canonically normalized: ${entry.independence_domain}`);
+   }
+ }
+
+ // Module-private backing store. Never exported; never mutated after this line.
+ const mutableRegistry = new Map<SurfaceId, AdapterRegistrationV1>(ENTRIES);
+
+ function freezeRegistryFacade(
+   source: Map<SurfaceId, AdapterRegistrationV1>,
+ ): ReadonlyMap<SurfaceId, AdapterRegistrationV1> {
+   const facade: ReadonlyMap<SurfaceId, AdapterRegistrationV1> = {
+     get: (key) => source.get(key),
+     has: (key) => source.has(key),
+     entries: () => source.entries(),
+     keys: () => source.keys(),
+     values: () => source.values(),
+     forEach: (callbackfn, thisArg?) => {
+       // Never delegate source.forEach directly: Map.prototype.forEach passes the
+       // backing Map to the callback as its third argument. Always substitute the
+       // frozen facade so no callback can ever capture a mutable Map reference.
+       source.forEach((value, key) => callbackfn.call(thisArg, value, key, facade));
+     },
(lines omitted)
+     get size() {
+       return source.size;
+     },
+   };
+   return Object.freeze(facade);
+ }
+
+ export const ADAPTER_REGISTRY: ReadonlyMap<SurfaceId, AdapterRegistrationV1> =
+   freezeRegistryFacade(mutableRegistry);
+
+ export function lookupRegistration(surface: SurfaceId): AdapterRegistrationV1 | undefined {
+   return ADAPTER_REGISTRY.get(surface);
+ }
+ "
+ ,
+     "file": "packages/protocol/src/adapter-registry.ts",
+     "line": 8,
+     "reason": "exception-drift",
+   },
(lines omitted)

- Expected  - 1
+ Received  + 157

      at productionClean (/Users/michaeldaley/builds/m0-admission-r1/tui/test/phase3a/harness-separation.test.ts:271:84)
      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/test/phase3a/harness-separation.test.ts:326:3)
(lines omitted)
266 | const productionFindings = files.flatMap(path => analyze(relative(ROOT, path), readFileSync(path, "utf8")));
(lines omitted)
268 |   expect(files.length).toBeGreaterThan(0);
269 |   for (const path of Object.keys(EXCEPTIONS)) expect(files).toContain(join(ROOT, path));
270 |   expect(productionFindings.filter(finding => reasons.includes(finding.reason)
(lines omitted)
                                                                                         ^
error: expect(received).toEqual(expected)

(lines omitted)
+   {
+     "expression":
+ "import { parseSurfaceId, type SurfaceId } from "./surface-id";
+ import { normalizeIdentifier, normalizeIndependenceDomain } from "./normalization";
+
+ export interface AdapterRegistrationV1 {
+   readonly surface: SurfaceId;
+   readonly executable_name: string;
+   readonly provider: string;
(lines omitted)
+   readonly environment_allowlist_ref: string;
+   readonly independence_domain: string;
+   readonly organization_id: string;
(lines omitted)
+ }
+
+ function deepFreeze<T>(value: T): Readonly<T> {
+   if (value !== null && typeof value === "object") {
+     Object.freeze(value);
+     for (const nested of Object.values(value as Record<string, unknown>)) {
+       deepFreeze(nested);
+     }
+   }
+   return value;
+ }
+
+ const CLAUDE_CODE_REGISTRATION: AdapterRegistrationV1 = deepFreeze({
+   surface: parseSurfaceId("claude-code"),
+   executable_name: "madbridge-claude-v5",
+   provider: "anthropic",
(lines omitted)
+   identity_probe: {
(lines omitted)
+     parse: "json",
+   },
(lines omitted)
+   environment_allowlist_ref: "claude-code-v1",
+   independence_domain: "anthropic",
+   organization_id: "anthropic",
(lines omitted)
+     "auth_status_exit_code:1",
+     "system/api_retry.error:authentication_failed",
+     "system/api_retry.error:oauth_org_not_allowed",
(lines omitted)
+     "fable is requested intent only; live eligibility requires exact equality with system/init.model",
(lines omitted)
+ });
+
+ const ANTIGRAVITY_REGISTRATION: AdapterRegistrationV1 = deepFreeze({
+   surface: parseSurfaceId("antigravity"),
+   executable_name: "agy",
+   provider: "google",
(lines omitted)
+   auth_readiness_probe: null,
(lines omitted)
+   environment_allowlist_ref: "antigravity-v1",
+   independence_domain: "google",
+   organization_id: "google",
(lines omitted)
+     "configuration-only identity evidence — no actual-session identity primitive exists",
+     "no documented non-mutating non-interactive auth-readiness primitive",
(lines omitted)
+ });
+
+ const MADV_SURFACE_REGISTRATION: AdapterRegistrationV1 = deepFreeze({
+   surface: parseSurfaceId("madv-surface"),
+   executable_name: "madv-surface",
+   provider: "minimax",
(lines omitted)
+   identity_probe: {
(lines omitted)
+     parse: "json",
+   },
(lines omitted)
+   environment_allowlist_ref: "madv-surface-v1",
+   independence_domain: "minimax",
+   organization_id: "minimax",
(lines omitted)
+     "auth_status_exit_code:1",
+     "auth_status.verified:false",
+     "system/auth_failed",
+     "exit_code:5",
(lines omitted)
+     "A provider that misreports its own model remains a limitation.",
+     "What the provider retains is the provider's.",
+     "Both probes are live calls on the M Plan at every start.",
(lines omitted)
+ });
+
(lines omitted)
+
(lines omitted)
+   if (normalizeIdentifier(entry.provider) !== entry.provider) {
+     throw new Error(`adapter-registry: provider is not canonically normalized: ${entry.provider}`);
+   }
+   if (normalizeIdentifier(entry.organization_id) !== entry.organization_id) {
+     throw new Error(`adapter-registry: organization_id is not canonically normalized: ${entry.organization_id}`);
+   }
+   if (normalizeIndependenceDomain(entry.independence_domain) !== entry.independence_domain) {
+     throw new Error(`adapter-registry: independence_domain is not canonically normalized: ${entry.independence_domain}`);
+   }
+ }
+
+ // Module-private backing store. Never exported; never mutated after this line.
+ const mutableRegistry = new Map<SurfaceId, AdapterRegistrationV1>(ENTRIES);
+
+ function freezeRegistryFacade(
+   source: Map<SurfaceId, AdapterRegistrationV1>,
+ ): ReadonlyMap<SurfaceId, AdapterRegistrationV1> {
+   const facade: ReadonlyMap<SurfaceId, AdapterRegistrationV1> = {
+     get: (key) => source.get(key),
+     has: (key) => source.has(key),
+     entries: () => source.entries(),
+     keys: () => source.keys(),
+     values: () => source.values(),
+     forEach: (callbackfn, thisArg?) => {
+       // Never delegate source.forEach directly: Map.prototype.forEach passes the
+       // backing Map to the callback as its third argument. Always substitute the
+       // frozen facade so no callback can ever capture a mutable Map reference.
+       source.forEach((value, key) => callbackfn.call(thisArg, value, key, facade));
+     },
(lines omitted)
+     get size() {
+       return source.size;
+     },
+   };
+   return Object.freeze(facade);
+ }
+
+ export const ADAPTER_REGISTRY: ReadonlyMap<SurfaceId, AdapterRegistrationV1> =
+   freezeRegistryFacade(mutableRegistry);
+
+ export function lookupRegistration(surface: SurfaceId): AdapterRegistrationV1 | undefined {
+   return ADAPTER_REGISTRY.get(surface);
+ }
+ "
+ ,
+     "file": "packages/protocol/src/adapter-registry.ts",
+     "line": 8,
+     "reason": "exception-drift",
+   },
+   {
(lines omitted)
+     "file": "packages/protocol/src/adapter-registry.ts",
+     "line": 141,
+     "reason": "computed-dispatch-unresolvable",
+   },
(lines omitted)

- Expected  - 1
+ Received  + 163

      at productionClean (/Users/michaeldaley/builds/m0-admission-r1/tui/test/phase3a/harness-separation.test.ts:271:84)
      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/test/phase3a/harness-separation.test.ts:350:3)
(lines omitted)

The exact bytes that line 24 of harness-separation.test.ts approves match the base registry. The head contains exactly B2’s supported version and argv changes. Replacing the stored SHA-256 is outside this commission. DEC-20261115-02 Addendum 1 B3 item 3 approved a specific update of the pointer for M0, subject to conditions on that earlier diff. It does not grant an ongoing permission for this admission diff.

logs/370-harness-exception-source.log · SHA-256 30195ad09e48c339e021bd0fc50767ed093163b3f6a356d566a08e57ca9bb8e5
22:23  2 users, load averages: 2.28 2.48 2.50  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

HEAD:test/phase3a/harness-separation.test.ts:15:const digest = (source: string): string => new Bun.CryptoHasher("sha256").update(source).digest("hex");
HEAD:test/phase3a/harness-separation.test.ts:21:const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> = {
(lines omitted)
HEAD:test/phase3a/harness-separation.test.ts:23:  "packages/protocol/src/adapter-registry.ts": {
(lines omitted)
HEAD:test/phase3a/harness-separation.test.ts:36:  | "computed-dispatch-unresolvable" | "exception-drift" | "syntax-error";
HEAD:test/phase3a/harness-separation.test.ts:60:  const pinned = exception !== undefined && digest(source) === exception.sha256;
HEAD:test/phase3a/harness-separation.test.ts:61:  if (exception !== undefined && !pinned) report("exception-drift");
(lines omitted)
HEAD:test/phase3a/harness-separation.test.ts:320:  detects("exception-drift", source + "\n// changed bytes\n", ROUTER_IMPORTER);
(lines omitted)
HEAD:test/phase3a/harness-separation.test.ts:375:    detects("exception-drift", source + "\n// changed bytes\n", file);

logs/371-registry-changes.log · SHA-256 b1e45d9c993980c2a807bc88150698b797fe2a92a9f27202fb82fe6cbccb004b
22:23  2 users, load averages: 2.28 2.48 2.50  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

diff --git a/packages/protocol/src/adapter-registry.ts b/packages/protocol/src/adapter-registry.ts
index 7a2f29876dcf5573d3289e794b31c620853957eb..28effbcccc52d4fe519833744f07ff9a4e488020 100644
--- a/packages/protocol/src/adapter-registry.ts
+++ b/packages/protocol/src/adapter-registry.ts
@@ -79,9 +79,9 @@ const MADV_SURFACE_REGISTRATION: AdapterRegistrationV1 = deepFreeze({
   surface: parseSurfaceId("madv-surface"),
   executable_name: "madv-surface",
   provider: "minimax",
(lines omitted)
   identity_probe: {
(lines omitted)
     parse: "json",
   },
(lines omitted)

logs/372-bound-files.log · SHA-256 5f47414003bb69cfb4be0c5994ab03a9a1fe2a529687eea422376d50c01234a7
22:23  2 users, load averages: 2.28 2.48 2.50  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

(lines omitted)
HEAD:test/phase3a/harness-separation.test.ts:36:  | "computed-dispatch-unresolvable" | "exception-drift" | "syntax-error";
HEAD:test/phase3a/harness-separation.test.ts:61:  if (exception !== undefined && !pinned) report("exception-drift");
(lines omitted)
HEAD:test/phase3a/harness-separation.test.ts:320:  detects("exception-drift", source + "\n// changed bytes\n", ROUTER_IMPORTER);
HEAD:test/phase3a/harness-separation.test.ts:375:    detects("exception-drift", source + "\n// changed bytes\n", file);

logs/373-base-registry-digest.log · SHA-256 dc9c30aaaf50e1261ab42384c3304053128786ce01401f1aaa7ffeeef889ea25
22:24  2 users, load averages: 2.35 2.48 2.50  exit=0

fe5fd51a559890adf9e1d87a7d0c73d62e9500dbc0cfcda0f1da9ac9aa938453  -

logs/374-head-registry-digest.log · SHA-256 d643e90cac8a65986c1daf296dedb686baab88685a9607558b4264ff167607bf
22:24  2 users, load averages: 2.35 2.48 2.50  exit=0

6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4  tui/packages/protocol/src/adapter-registry.ts

logs/380-prior-pin-authorization.log · SHA-256 bdcec8a697e62d52e43ef94d618423eb2ff7577d93e672f896594a896ba63c9a
22:24  2 users, load averages: 2.21 2.44 2.48  exit=0

The new package declares no dependency on `@madventures/supervisor`, and no external dependency is added.

B2. **The parser.** The parsers built for madv-surface alone under `DEC-20261115-02` B3 item 4 and B4, and the input encoder of plan §3 M0, live in `packages/adapter-madv-surface`. `attestation.ts` and `preflight.ts` dispatch madv-surface's probes to them by registration, and the one bounded runner of `attestation.ts` runs every probe, with the limits of B3 item 5 and B4. Claude Code's parsers, its probe input and its limits stay as they are.

B3. **Existing tests.** Beyond `DEC-20261115-02` B7 item 3, exactly these existing tests may change, each only as stated. Every other existing test stays byte-identical.
1. The two tests of A1 item 3, only so that they admit the `madv-surface` registration as they admit the other two. The first test's name may say three in place of two.
2. The two tests of A1 item 4, only so that they hold for `madv-surface-v1` as they hold for the other two allowlists: the count of line 46 admits the third registration, and the helpers at lines 22 to 28 give `madv-surface-v1`'s required `MINIMAX_API_KEY` a synthetic canary value, never a real key.
3. The SHA-256 at line 24 of `test/phase3a/harness-separation.test.ts` becomes that of `packages/protocol/src/adapter-registry.ts` at the head, and nothing else in that file changes. I approve the file's exact bytes at the head as the exception the Task 48 supplement approved, on two conditions: its diff against the binding base adds only the `madv-surface` registration and its line in `ENTRIES` and changes only the `claude-code` supported version; and the test's analysis of the file at the head finds the same expressions as at the base, apart from the drift itself.
4. In the test of A1 item 2, lines 840 to 843 compare the committed Task 57 record with the version the `claude-code` registration supported when that record was made, `2.1.296`, written as that value, in place of the registration's current versions. Nothing else in that test changes.

Full-run repository gates following the failed suite were not run. The suite was not retried. The status and current head were read solely to document the halt.

logs/375-second-halt-tree.log · SHA-256 82d281cb84493392ce4ea5d6ae74819d0374d7921db4ba2e088e04cc7f8abe6b
22:24  2 users, load averages: 2.35 2.48 2.50  exit=0

## build/3b-m0-admission-r1

logs/376-second-halt-head.log · SHA-256 b5a08f658015ec435587102d4c0c873f0e3b1fc48068356463e0c7de23d268bc
22:24  2 users, load averages: 2.35 2.48 2.50  exit=0

f73b5649afff86b558978cb76d09132bc0a7396a

8. Diff at halt

Both halts have the same HEAD. The full source diff in log 259 is against the stated base and covers every changed file except the opening build log. Diffs quoted here have trailing whitespace removed from each quoted line.

logs/258-halt-stat.log · SHA-256 e6c9121fcd47a268d3a1082029b31a66e0811bd66134a95abd63c35398eb9442
20:37  8 users, load averages: 3.24 3.58 2.91  exit=0

 .../phase-3b-m0-admission-build-log.md             | 935 +++++++++++++++++++++
 packages/adapter-madv-surface/src/index.ts         |  10 +-
 .../test/fixture-integrity.test.ts                 |  37 +
 packages/adapter-madv-surface/test/parser.test.ts  |  40 +
 .../adapter-madv-surface/test/recorded.test.ts     |  14 +-
 packages/protocol/src/adapter-registry.ts          |   4 +-
 packages/protocol/test/adapter-registry.test.ts    |  16 +-
 packages/supervisor/test/madv-allowlist.test.ts    |  12 +
 packages/supervisor/test/madv-intervals.test.ts    |  51 ++
 packages/supervisor/test/madv-probes.test.ts       |   2 +-
 10 files changed, 1111 insertions(+), 10 deletions(-)

logs/259-halt-source-diff.log · SHA-256 9f9dcc0854558162d2a35faeef97c8967defc53a11880ddb60969f37b07cb021
20:37  8 users, load averages: 3.24 3.58 2.91  exit=0

The named log contains the complete verbatim output. Lines requiring report-forbidden punctuation are cited there.

diff --git a/packages/adapter-madv-surface/src/index.ts b/packages/adapter-madv-surface/src/index.ts
index 37d289c62ede1e10c7555a824adb4f4727f832aa..b825596682e6b9aab5c74a2ba9f1c0a66e69d89c 100644
--- a/packages/adapter-madv-surface/src/index.ts
+++ b/packages/adapter-madv-surface/src/index.ts
@@ -3,7 +3,9 @@
 export type MadvFailureCause =
   | "auth_failed" | "endpoint_refused" | "provider_error"
   | "identity_unavailable" | "model_refused" | "domain_unresolved" | "identity_mismatch";
+const identityProbe = Symbol("identity probe");
 export interface MadvContext {
(lines omitted)
   readonly executionId: string;
   readonly sessionId: string;
   readonly model: string;
@@ -143,13 +145,17 @@ export class MadvSurfaceParser {
         || value.endpoint_host !== "api.minimax.io" || value.requested_model !== this.context.model) {
         this.fail("identity_mismatch", "init_predicate"); return;
       }
(lines omitted)
+        this.fail("identity_mismatch", "init_tools"); return;
+      }
       this.wireSession = value.session_id; this.state = "waiting";
     } else if (value.type === "model_response") {
       if (this.state !== "waiting" && !(this.state === "tools" && this.tools.size === 0)) { this.fail("identity_mismatch", "event_order"); return; }
       if (typeof value.response_model !== "string" || value.response_model.length === 0) { this.fail("identity_unavailable", "model_field_absent"); return; }
(lines omitted)
+      if (/claude|anthropic/i.test(value.response_model)) { this.fail("model_refused", "anthropic_model"); return; }
(lines omitted)
       if (value.response_model !== this.context.model
+        || typeof value.response_id !== "string" || value.response_id.length === 0
         || value.response_independence_domain !== this.context.independenceDomain
         || value.provider !== this.context.provider || value.profile !== "minimax"
         || value.endpoint_host !== "api.minimax.io" || value.tls_verified_host !== "api.minimax.io") {
@@ -199,7 +205,7 @@ export class MadvSurfaceParser {
   }
 }
(lines omitted)
-  const parser = new MadvSurfaceParser({ executionId: "identity-probe", sessionId: "preflight", model, supportedVersions, provider: "minimax", independenceDomain: "minimax" });
(lines omitted)
   parser.push(output);
   return parser.finish(exitCode, signal);
 }
diff --git a/packages/adapter-madv-surface/test/fixture-integrity.test.ts b/packages/adapter-madv-surface/test/fixture-integrity.test.ts
new file mode 100644
index 0000000000000000000000000000000000000000..9498fd391c9cafdccc44a9d7425a9203dd9723c9
--- /dev/null
+++ b/packages/adapter-madv-surface/test/fixture-integrity.test.ts
@@ -0,0 +1,37 @@
+import { expect, test } from "bun:test";
+import { readFileSync, readdirSync } from "node:fs";
+import { join } from "node:path";
+import { fileURLToPath } from "node:url";
+
(lines omitted)
+  for (const entry of readdirSync(join(root, prefix), { withFileTypes: true })) {
+    const relative = prefix + entry.name;
+    if (entry.isDirectory()) paths.push(...filesUnder(root, relative + "/"));
+    else {
+      expect(entry.isFile()).toBe(true);
+      paths.push(relative);
+    }
+  }
+  return paths;
+}
+
(lines omitted)
+  test(folder + " manifest covers every fixture and matches its SHA-256", () => {
+    const root = fileURLToPath(new URL("./fixtures/" + folder + "/", import.meta.url));
(lines omitted)
+    const entries = rows.map(row => {
(lines omitted)
+      return { file, digest };
+    });
+    // Comparing the sorted arrays detects duplicates as well as omissions.
+    const files = filesUnder(root).filter(file => file !== "manifest.tsv").sort();
+    expect(entries.map(entry => entry.file).sort()).toEqual(files);
+    for (const { file, digest } of entries) {
+      const bytes = readFileSync(join(root, file));
+      expect({ file, digest: new Bun.CryptoHasher("sha256").update(bytes).digest("hex") }).toEqual({ file, digest });
+    }
+  });
+}
diff --git a/packages/adapter-madv-surface/test/parser.test.ts b/packages/adapter-madv-surface/test/parser.test.ts
index b090d16dbf3bf477fc53936c97d7725ae268df46..26c561d0b69146d8e393ad5485ef1c085dbc474e 100644
--- a/packages/adapter-madv-surface/test/parser.test.ts
+++ b/packages/adapter-madv-surface/test/parser.test.ts
@@ -135,3 +135,43 @@ test("exit precedence fails closed without relying on an emitted event", () => {
     expect(result.ok).toBe(false); if (!result.ok) expect(result.cause).toBe(cause);
   }
 });
+
+test("identity requires an empty tool array while a governed launch accepts tools", () => {
(lines omitted)
+    const output = wire(init({ tools }), response());
+    expect(parseMadvIdentity(output, model, context.supportedVersions)).toMatchObject({
+      ok: false, cause: "identity_mismatch", reason: "init_tools",
+    });
+  }
(lines omitted)
+  const launch = new MadvSurfaceParser(context);
(lines omitted)
+  expect(launch.finish(0).ok).toBe(true);
+});
+
+test("probe and launch require a non-empty string response_id on every response", () => {
(lines omitted)
+    const invalid = response({ response_id });
+    const output = wire(init(), invalid);
+    const mismatch = { ok: false, cause: "identity_mismatch", reason: "response_predicate" };
+    expect(parseMadvIdentity(output, model, context.supportedVersions)).toMatchObject(mismatch);
+    const launch = new MadvSurfaceParser(context);
+    launch.push(output);
+    expect(launch.finish(0)).toMatchObject(mismatch);
+
+    const continued = new MadvSurfaceParser(context);
+    continued.push(wire(init(), response(), event("result", { subtype: "success", is_error: false })));
+    expect(continued.beginRequest().ok).toBe(true);
+    continued.push(wire(invalid));
+    expect(continued.finish(0)).toMatchObject(mismatch);
+  }
+});
+
+test("Claude and Anthropic ids are refused before family resolution", () => {
(lines omitted)
+  const causes = ids.map(id => {
+    const result = parseMadvIdentity(wire(init(), response({ response_model: id })), model, context.supportedVersions);
+    return { id, cause: result.ok ? "accepted" : result.cause };
+  });
+  expect(causes).toEqual(ids.map(id => ({ id, cause: "model_refused" })));
+});
diff --git a/packages/adapter-madv-surface/test/recorded.test.ts b/packages/adapter-madv-surface/test/recorded.test.ts
index 93bff687dba707ce2c653bd3710f2c03ddd36028..3cdaf8d05ea6cd151c3cd9aa603bce185a934758 100644
--- a/packages/adapter-madv-surface/test/recorded.test.ts
+++ b/packages/adapter-madv-surface/test/recorded.test.ts
@@ -1,6 +1,6 @@
 import { expect, spyOn, test } from "bun:test";
 import { readFileSync } from "node:fs";
-import { parseMadvAuthReadiness, parseMadvIdentity } from "../src/index";
+import { MadvSurfaceParser, parseMadvAuthReadiness, parseMadvIdentity } from "../src/index";

 // These are the Founder's sanitized recorded bytes, not synthetic streams.
 // SANITIZE.txt replaced UUID-shaped session_id values only: MacBook stdout
(lines omitted)
-  test(host + " " + capture + " recorded identity passes for MiniMax-M3.1-Flash", () => {
+  test(host + " " + capture + " recorded tools fail probe identity and pass a governed launch", () => {
     const f = fixture(host!, capture!);
(lines omitted)
+      ok: false, cause: "identity_mismatch", reason: "init_tools",
+    });
+    const launch = new MadvSurfaceParser({
+      executionId: "recorded-launch", sessionId: "recorded-session", model,
(lines omitted)
+    });
+    launch.push(f.output);
+    expect(launch.finish(f.exit, f.signal).ok).toBe(true);
   });
 }
 test("ubuntu 05 recorded identity fails closed with provider_error", () => {
diff --git a/packages/protocol/src/adapter-registry.ts b/packages/protocol/src/adapter-registry.ts
index 7a2f29876dcf5573d3289e794b31c620853957eb..28effbcccc52d4fe519833744f07ff9a4e488020 100644
--- a/packages/protocol/src/adapter-registry.ts
+++ b/packages/protocol/src/adapter-registry.ts
@@ -79,9 +79,9 @@ const MADV_SURFACE_REGISTRATION: AdapterRegistrationV1 = deepFreeze({
   surface: parseSurfaceId("madv-surface"),
   executable_name: "madv-surface",
   provider: "minimax",
(lines omitted)
   identity_probe: {
(lines omitted)
     parse: "json",
   },
(lines omitted)
diff --git a/packages/protocol/test/adapter-registry.test.ts b/packages/protocol/test/adapter-registry.test.ts
index a69be70393026a10c0a089214c90b7391dead59f..0f3d00ad7e429c61580c8b04254fe646769ba3a0 100644
--- a/packages/protocol/test/adapter-registry.test.ts
+++ b/packages/protocol/test/adapter-registry.test.ts
@@ -129,9 +129,9 @@ test("registry membership cannot be mutated at runtime", () => {
 test("madv-surface registration matches DEC-20261115-02 field for field", () => {
   expect(ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))).toEqual({
     surface: parseSurfaceId("madv-surface"), executable_name: "madv-surface",
(lines omitted)
     identity_probe: {
(lines omitted)
       parse: "json",
     },
(lines omitted)
@@ -145,3 +145,15 @@ test("madv-surface registration matches DEC-20261115-02 field for field", () =>
(lines omitted)
   });
 });
+
+test("madv-surface 0.1.2 reserves --no-tools for the identity probe", () => {
+  const entry = ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))!;
(lines omitted)
+    "--print", "--input-format", "stream-json", "--output-format", "stream-json",
+    "--profile", "minimax", "--require-model", "--role", "reviewer", "--no-session-persistence",
(lines omitted)
+  expect(entry.non_interactive_flags).toEqual(launch);
+  expect(entry.non_interactive_flags).not.toContain("--no-tools");
(lines omitted)
+});
diff --git a/packages/supervisor/test/madv-allowlist.test.ts b/packages/supervisor/test/madv-allowlist.test.ts
new file mode 100644
index 0000000000000000000000000000000000000000..b33990ef154bda2af8ca6a21a21479ac033223cd
--- /dev/null
+++ b/packages/supervisor/test/madv-allowlist.test.ts
@@ -0,0 +1,12 @@
+import { expect, test } from "bun:test";
+import { ADAPTER_REGISTRY, parseSurfaceId } from "@madventures/protocol";
+import { buildAllowlistedEnvironment } from "../src/environment";
+
+test("madv-surface-v1 selects exactly the B6 variable set", () => {
+  const registration = ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))!;
+  expect(registration.environment_allowlist_ref).toBe("madv-surface-v1");
+  // Supply a synthetic value even for a name introduced after this test.
+  const ambient = new Proxy({}, { get: () => "fixture" });
(lines omitted)
+  expect(Object.keys(buildAllowlistedEnvironment(registration, ambient)).sort()).toEqual(approved.sort());
+});
diff --git a/packages/supervisor/test/madv-intervals.test.ts b/packages/supervisor/test/madv-intervals.test.ts
new file mode 100644
index 0000000000000000000000000000000000000000..b98b1360881a307e99a6fb2d16d7d5f20b73d601
--- /dev/null
+++ b/packages/supervisor/test/madv-intervals.test.ts
@@ -0,0 +1,51 @@
+import { expect, jest, test } from "bun:test";
+import { ADAPTER_REGISTRY, parseSurfaceId } from "@madventures/protocol";
+import { runBoundedProbe } from "../src/attestation";
+
(lines omitted)
+  test("madv-surface " + kind + " keeps 500 ms grace and 1000 ms cleanup", async () => {
+    const registration = ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))!;
+    const abort = new AbortController();
(lines omitted)
+    let cleanupAt: number | undefined;
+    let onTerm!: () => void;
+    const terminated = new Promise<void>(resolve => { onTerm = resolve; });
+
+    jest.useFakeTimers();
+    try {
+      const started = Date.now();
+      const now = () => Date.now() - started;
+      const probe = runBoundedProbe({
+        kind, registration, signal: abort.signal, executablePath: "/synthetic/madv-surface",
(lines omitted)
+        supportedVersions: registration.supported_versions,
+      }, {
+        now,
+        spawn() {
+          abort.abort();
+          return {
+            stdout: new ReadableStream<Uint8Array>({ cancel() { cleanupAt = now(); } }),
+            stderr: new ReadableStream<Uint8Array>(),
+            exited: new Promise<number>(() => {}),
+            kill(signal) {
(lines omitted)
+              if (signal === "SIGTERM") onTerm();
+            },
+          };
+        },
+      });
+      await terminated;
+      // Allow the probe's promise continuation to observe each side of
+      // both deadlines before advancing the clock to the next boundary.
(lines omitted)
+        jest.advanceTimersByTime(delta);
+        await Promise.resolve();
+      }
(lines omitted)
+      expect(cleanupAt).toBe(1000);
+      expect((await probe).ok).toBe(false);
+    } finally {
+      jest.useRealTimers();
+    }
+  });
+}
diff --git a/packages/supervisor/test/madv-probes.test.ts b/packages/supervisor/test/madv-probes.test.ts
index 0379539472bd9939de5a393ff39ee3151a026a51..c87807309eb5bfae80777afcac697171b6cdf7f8 100644
--- a/packages/supervisor/test/madv-probes.test.ts
+++ b/packages/supervisor/test/madv-probes.test.ts
@@ -6,7 +6,7 @@ import { IDENTITY_PROBE_INPUT, runBoundedProbe, type ProbeRequest, type ProbeRun
 const model = "MiniMax-M3.1-Flash";
 const auth = { loggedIn: true, authMethod: "plan_key", profile: "minimax", provider: "minimax", endpointHost: "api.minimax.io", verified: true, verifyMethod: "read_only_endpoint" };
 const stamp = { session_id: "wire", ts: "2026-11-15T00:00:00.000Z" };
(lines omitted)
 const response = { ...stamp, type: "model_response", response_model: model, response_id: "synthetic-response", response_independence_domain: "minimax", tls_verified_host: "api.minimax.io", profile: "minimax", provider: "minimax", endpoint_host: "api.minimax.io" };
(lines omitted)
 function request(kind: "identity" | "auth" = "identity", surface = "madv-surface"): ProbeRequest {

9. Record script

The second halt occurred before R4. There is no admission reader, diff, script hash, synthetic script run or Linux run.

logs/377-second-halt-record.log · SHA-256 eedff898816739c10f171666fe0f518db568827ba220fcc3eee81037c4860b31
22:24  2 users, load averages: 2.35 2.48 2.50  exit=0

10. Artifact hashes and attribution

The committed opening build log has SHA-256 cad21988bd927d480f558c046d15f3b03b4f47a4fc1c9547a46b485b6aeb96aa. Its Phase 1 completion part and the documentation delivery commit are pending. The five existing commit-message checks are recorded in section 6. The final attribution-shape check was not reached. The second halt report’s own SHA-256 is detached and returned to the Founder after the file is closed.

Command evidence through the halt. Each entry gives the complete log name, uptime, status and SHA-256. Wait logs precede their corresponding tests numerically. For the resumed full run consult logs 312 and 313.

001-cli-version.log  14:31  8 users, load averages: 1.60 2.55 2.55  exit=0  4177ccbd71226a743f8d562eb04ac791599205ce83fb0fb082893afec986f2f0

002-pwd.log  14:31  8 users, load averages: 1.47 2.51 2.53  exit=0  3864d27a8fab651bcd096138b30ad1867954e5e304058c8da8b2734e7803152c

003-branch.log  14:31  8 users, load averages: 1.47 2.51 2.53  exit=0  77bdd0280762ef1210e7749764b23c132e2072c50f29429de5e86f15ca9241a8

004-head.log  14:31  8 users, load averages: 1.47 2.51 2.53  exit=0  c87499956ae798a0d175f72a2d70fd8fb66fac270ba10f155403c1fb15ffe815

005-user-name.log  14:31  8 users, load averages: 1.47 2.51 2.53  exit=0  c8236b701e2cd8fa2f88faf7997e82486acb0f9547d104f6e0b70b7b7e77ce62

006-user-email.log  14:31  8 users, load averages: 1.47 2.51 2.53  exit=0  4249d689e095e6781ce42f7c27ed6d2cfb1162ff72c3da3f379702664c737285

007-runtime.log  14:31  up  5:59, 8 users, load averages: 1.46 2.47 2.52  exit=0  1f36c92027e3092358d7bc85c5322dbf1b0fab0bbfcdc3213e05ea438322c425

008-commission.log  14:32  8 users, load averages: 1.73 2.46 2.51  exit=0  ead286517b3af6aea954c31ba44684e9f8cfcfd6ed88ba7f4bd449690945af67

009-addendum.log  14:32  8 users, load averages: 1.73 2.46 2.51  exit=0  a79427959011449823dd674ffa4fa24e7151068012892e2f0841061525aeaa10

010-manifests.log  14:32  8 users, load averages: 1.73 2.46 2.51  exit=0  1dd031a2faea261714651de5e04a160fe3fbf70d574b5460006bd9f5355c28ca

011-agents.log  14:32  8 users, load averages: 1.73 2.46 2.51  exit=0  7a4c448ac180653aef5aa2a8d12f85ad73183b08d7a24c5c22fa8832c221796c

012-authority-inventory.log  14:32  8 users, load averages: 1.62 2.38 2.48  exit=0  3abdc92a5640a821bd9b9827bcedbd7aadf2b3be967f1cf2e2b3c5d22843292d

013-prompt-digests.log  14:32  8 users, load averages: 1.62 2.38 2.48  exit=0  c1072cb93c48fbc96feeef0ebecaaa2d7a08ab4fc5d94f706a1cc4c6e57d45b6

014-release-digests.log  14:32  8 users, load averages: 1.62 2.38 2.48  exit=0  6d2d9887291fe0fdaa51417d51153055f45a2c05a5279b240595ca7c4d73fba3

015-ancestry.log  14:32  8 users, load averages: 1.62 2.38 2.48  exit=0  58b5c2f4eb1128b0f6f4a38c012d9512dd805adbc1af1ca6a62be543b498d740

016-checkout.log  14:32  8 users, load averages: 1.62 2.38 2.48  exit=0  7e77d470cddad0a1c5f2fa4ab319339fbf9bb66466c0bba2ccb3cd328c302c39

017-host.log  14:32  8 users, load averages: 1.62 2.38 2.48  exit=0  3f21e453d4eb497d8e6419ad7e9553e77f06fbc3570b7d5551d921845383f9fb

018-evidence-headers.log  14:32  8 users, load averages: 1.62 2.38 2.48  exit=0  91ba271a48aff05684acff8992b7014bfd739014f6c01f2d642597af9e27142c

019-authority-check.log  14:32  8 users, load averages: 1.56 2.33 2.46  exit=0  a5986336fafb9c789b3816f2d64dc10663d22625027ac3104e9287f3926cd8e4

020-record-source.log  14:32  8 users, load averages: 1.56 2.33 2.46  exit=0  5d69752e5a6ba6f287949b06cc832d88a2dea227e68b04b3c50c168a5a3b3c9c

021-implementation.log  14:32  8 users, load averages: 1.56 2.33 2.46  exit=0  d9a39819f960941ac7c8d6faf5c45d6781858b8a8160168c6fcd5eaf0992eaa3

022-recorded-tests.log  14:32  8 users, load averages: 1.56 2.33 2.46  exit=0  9baa8e3f96d13323540edf913728b90382738a675dab7c9bf119028987bd3a42

023-registration.log  14:33  8 users, load averages: 1.25 2.21 2.41  exit=0  41d5e4bdc0e084c3bb88208f650370b6f9393796ef9ea3222758cb2472ec33d3

024-supervisor.log  14:33  8 users, load averages: 1.25 2.21 2.41  exit=0  30918564b96df34280772f4ec8ebdc39feb917c3ee30cdb4cd3d29c235f08222

025-env.log  14:33  8 users, load averages: 1.25 2.21 2.41  exit=0  c568c2fec014e2c5fdbaac2989ddbeb8edd2f77665f84af2bda2616139193023

026-base-tests.log  14:33  8 users, load averages: 1.25 2.21 2.41  exit=0  e6c6bef4bbd3384766c0185bca6a74468db03d25d6c397791f01b9935a9969b2

027-existing-probes.log  14:33  8 users, load averages: 1.25 2.21 2.41  exit=0  23e0974e647106b113affeedc9d0409755cf3bccc5dba04a14a33209c2a83692

028-existing-parser.log  14:33  8 users, load averages: 1.25 2.21 2.41  exit=0  3351429bf0b964711581ac2d1799c11c62a7e5bac0f8433ce5988a850c9a0a6d

029-release-behavior.log  14:33  8 users, load averages: 1.25 2.21 2.41  exit=0  3d71d78d017f91e732eee940d47d2a807322a324c5d0dc37862735c4a6baaa1a

030-fixture-manifest.log  14:33  8 users, load averages: 1.25 2.21 2.41  exit=0  27921c929f74105c664835676c6353a40d0665e35682007ef8be6aacad875b70

031-record-logic.log  14:33  8 users, load averages: 1.25 2.21 2.41  exit=0  7053d13d21b9be4e0c4e9f6ef772589cb7f65bcab39933b3f4e2da0bd3258624

032-fixture-check.log  14:33  8 users, load averages: 1.32 2.12 2.38  exit=0  42f75db7be9474025ca77ff257c1f7c26aa5be690274502716c07daab40c7f45

033-consumers.log  14:33  8 users, load averages: 1.32 2.12 2.38  exit=0  cfa29d8391740c3d84b48b0b4fe96cfa73f635930a508e1594a2334f8435246c

034-standing-rules.log  14:33  8 users, load averages: 1.32 2.12 2.38  exit=0  b6a6bbfdfdae3392809dd74a2d4c167f3c411c523e4bfb6a74a09a8e926a5a55

035-base-lock.log  14:33  8 users, load averages: 1.32 2.12 2.38  exit=0  338f056f0f3693e0f0e9776e5e3c06ed72c034ebbd27cd90fb7e82551026cd9a

036-scratch.log  14:33  8 users, load averages: 1.32 2.12 2.38  exit=0  983584f7283f767c03c81d36c660d09d4f59a46b694324f607960b80d868f79e

037-governed-settings.log  14:33  8 users, load averages: 1.32 2.12 2.38  exit=0  9a8cb29e39bcf00069388615c0eb29aa7fbf6aa53b255d477631e2aeffe2f43b

038-probe-findings.log  14:33  8 users, load averages: 1.32 2.12 2.38  exit=0  0e4d4c080eb09ea28df65f059580e3a24c40d4039735e97376ee78d44fded106

039-review-inputs.log  14:33  8 users, load averages: 1.32 2.12 2.38  exit=0  ae2192e7e817201e93733082e92049044d0dc175183c38b83fc617affa5af029

040-allowlist-tests.log  14:34  8 users, load averages: 1.44 2.08 2.35  exit=0  5f1f4d75068d9eaa110d8d0799ca158247e9ac6e7a888878f465a7abd146daaa

041-other-allowlist-tests.log  14:34  8 users, load averages: 1.44 2.08 2.35  exit=0  f7aaf455001f2dc15d69b491d142785694f1a74fab783759d4cb9c0a66e5bc3d

042-review-behavior.log  14:34  8 users, load averages: 1.44 2.08 2.35  exit=0  e457fb0e805f04131c8d38c4799dcaa373ff0d2282656ec9dd16ab9d75aec671

043-command-helpers.log  14:34  8 users, load averages: 1.48 2.02 2.32  exit=0  098e2142f7a07f9dac8491414cd415eaf97e54d417bfc2d92bdc71934edd1b24

044-all-callers.log  14:34  8 users, load averages: 1.85 2.08 2.34  exit=0  254f8fefd7b1f7cc5f421542e2b1b309c6fa0aca4132119d23f6620d09b497e5

045-governing-detail.log  14:34  8 users, load averages: 1.85 2.08 2.34  exit=0  b427434222c96c90c81d9ef03f71a4595e9b3ff5da7ee8f2b31c58d5c94c33ed

046-reference-implementation.log  14:34  8 users, load averages: 1.85 2.08 2.34  exit=0  166d7e015e5140cdce8956a6e7815261f63fdf8d8fb43f3ae97ae495852cabd4

047-baseline-runtime.log  14:38  up  6:05, 8 users, load averages: 1.41 1.75 2.14  exit=0  7e64125fca3d2b20f594b5a030934b58927d5cf304b05add00f69035816a27f8

048-baseline-install.log  14:40  up  6:07, 8 users, load averages: 0.98 1.49 1.98  exit=0  4aa8521e67c060aeffba46a9333e7920deee70d2fe645badf918e03fb631a1f9

049-baseline-lock.log  14:40  8 users, load averages: 1.06 1.50 1.98  exit=0  75edbd4be13626f07c47ee8918de90a81baddc78fe2692b0cfdd9663f8eec390

050-install-tree.log  14:40  8 users, load averages: 1.06 1.50 1.98  exit=0  048ee6a5d17fd305fe35bb75793dd9e35dc91da296510c4bf16fa021786ca7b6

051-install-status.log  14:40  8 users, load averages: 1.06 1.50 1.98  exit=0  72215e080157497ad58049ef9297d7be98ec0593afef01630cbe19c9fe85d7cc

052-restore-install-mode.log  14:40  8 users, load averages: 1.37 1.56 2.00  exit=0  1e5f05198ff7991bbc4193848f57d7fac603eba2ba3b2decd3bf7d95449ab97e

053-restored-install-status.log  14:40  8 users, load averages: 1.37 1.56 2.00  exit=0  f40927db56752d939f2edb5650adc0feced72d35e9391b045e2074613590da7f

054-baseline-typecheck.log  14:40  up  6:08, 8 users, load averages: 1.34 1.55 1.99  exit=0  c3e574a48e6317385c4073746305410ea654d419e684c518986f0932b2a7eb8f

055-baseline-suite-runtime.log  14:40  up  6:08, 8 users, load averages: 1.36 1.55 1.99  exit=0  8a8698a19fad5f5ece629af1e0e9cbdbb59868e02dad42f46b2cb5bbcaa93520

056-baseline-wait.log  14:40  8 users, load averages: 1.36 1.55 1.99  exit=0  09d5641b26801da98f8e8b0757712ea01d71b746f894e7482e7b7589841bc82c

057-baseline-suite.log  14:40  up  6:08, 8 users, load averages: 1.50 1.57 1.99  exit=0  4d249629ce62ce478b4d581332645acee24271f00fe97e104e8096e03c17b39d

058-task-design-inputs.log  14:41  8 users, load averages: 1.73 1.62 2.00  exit=0  2dfe7a3f07984c8ce4c1123a63e53a2a9bedca04cfbaa1939bdb8987fc1d8d46

059-runtime-test-api.log  14:41  8 users, load averages: 1.73 1.62 2.00  exit=0  0acb6d5500d1218b5cc8ed3351ba0f60471e8245a57bd0e79341114585056ab1

060-fixture-selection.log  14:41  8 users, load averages: 1.73 1.62 2.00  exit=0  030a07d69ae6e8f12d5dfd5cf356ae1c4753f3a362829e94d5820afa8811a1c3

061-registered-test.log  14:41  8 users, load averages: 1.73 1.62 2.00  exit=0  3b279b30892160a9d3eb4dbfb542e3476a9265b9e1dde8b8cfdedc15425e305d

062-test-locations.log  14:41  8 users, load averages: 1.88 1.66 2.01  exit=0  b7a54337108fe5892f8ea960ff4278541be8d7fa2950af1b272fa2539ca71070

063-interval-base-test.log  14:41  8 users, load averages: 1.88 1.66 2.01  exit=0  e9ff6b6469eccdf98a4257c64b573c82a6fe18881b4e5dad68061cbff0ba2389

064-reference-scope.log  14:41  8 users, load averages: 1.88 1.66 2.01  exit=0  f31edcd1325006013cb22f882b86ab0837f441e9b1e88a5614e203bec08deef3

065-allowlist-implementation.log  14:41  5 users, load averages: 1.97 1.68 2.01  exit=0  b0a13e43659e1485384c59cb734ae1ed19745373b3df2b686754297e98aaa2cd

066-record-emission.log  14:41  5 users, load averages: 1.97 1.68 2.01  exit=0  d536e9031b92be592e8376efc1cdb13ea1849d974fb264f8361995b15c2d3d08

067-preflight-pin-test.log  14:41  5 users, load averages: 1.97 1.68 2.01  exit=0  400b3eaf6b82110a5e3c066bda4602d59968ad14c5d1a1a4a97e59ea42b76283

068-progress-count.log  14:41  4 users, load averages: 1.54 1.60 1.98  exit=1  3f2edb5aa246b0904f56eb09cb2867f8d094eb679baa7d2f5bf603fc966f608c

069-build-test-list.log  14:42  4 users, load averages: 2.28 1.75 2.02  exit=0  4df83c38ffd2ec4bbb4fd63b749b443670a5353093c0369102c3219f4f4a3c3f

070-evidence-writer.log  14:43  4 users, load averages: 2.22 1.78 2.01  exit=0  c6aee3fd97606e11a9ef5d9476bcf9667b0931cd8cccaee46f9d6647fd50f5d4

071-base-list.log  14:44  4 users, load averages: 2.61 1.96 2.06  exit=0  40c337b7b22cebbc7dff8783392e36a7e7670b3c805f0a7ab2081be52a2c4a52

072-commit-tools.log  14:43  4 users, load averages: 2.56 1.91 2.04  exit=0  c0313bbdd68d5c6cc1b9b6a9ccff7d838bd461ce83da1aa00e6df5843259c144

073-timer-types.log  14:43  4 users, load averages: 2.72 1.96 2.06  exit=2  1a01ecaf2926c2f096a3dd86b5822ad3944e094bfb58fe1153ed961ec5f2c148

074-record-fields.log  14:43  4 users, load averages: 2.72 1.96 2.06  exit=0  a876499729f293b2b8ab622a846c74d1c3723f573864d5cdc6e02ad47d30674f

075-baseline-tree.log  14:44  4 users, load averages: 2.80 2.01 2.07  exit=0  b61ed51c2ced17a033a88aacc9e4e6e14ce0b13b194083aba17568ce7d6fafa5

076-open-log.log  14:44  4 users, load averages: 2.80 2.01 2.07  exit=0  0701c7a1c93fe2578dc0b4aad9913b157b0143b7718ac1a3bb245705c3159f20

077-open-message.log  14:44  4 users, load averages: 2.44 1.96 2.06  exit=0  1ebf26370c334d5700bf12b78c8da3afd1505781b45ed6b9ad99f00acddba04f

078-check-message-1.log  14:44  4 users, load averages: 2.44 1.96 2.06  exit=0  c61c6798d53c31e9fd1ced8b0eecf2a93ba75a3859cd0806bf8a04adaaef7a44

079-stage-opening.log  14:44  4 users, load averages: 2.44 1.96 2.06  exit=0  118ceb9d6a546ff396e3cd1175834a0068dd4b303ad79daa10de7ef48ee296fe

080-opening-check.log  14:44  4 users, load averages: 2.44 1.96 2.06  exit=0  a596c13f7e37eccfab1e96844cb55a3d893dd108896f135910abbc2b1a4f8094

081-commit-opening.log  14:44  4 users, load averages: 2.32 1.94 2.05  exit=0  f5aff23958416b6e0800b90c65c32f050ab4c10cec69dfc6c90371ca203df0bf

082-opening-head.log  14:44  4 users, load averages: 2.32 1.94 2.05  exit=0  8d84c15c21bdec371064537e69e1abb5a89bcd58c9fcb8badd9c77130131c338

083-r1-change.log  14:44  4 users, load averages: 2.02 1.90 2.03  exit=0  9c24a3bed742c8fd209ebc630e4fa4154576d81760b66e1b324fc141eaeabc31

084-r1-test.log  14:44  4 users, load averages: 2.02 1.90 2.03  exit=0  67425cfa23ce9245354816d0d7f7321ac8b7c08700eb39e360a8007801a5c0db

085-r1-runtime.log  17:07  up  8:34, 4 users, load averages: 6.44 2.67 1.95  exit=0  d9548863ffcec2cc41b4487b62439ba6957ecfa00628a467f1e6f4894e5b7234

086-r1-pin-wait.log  17:15  up  8:42, 4 users, load averages: 1.30 1.67 1.74  exit=0  60d2e84e2d424f835b51b5c58e5a2f36d56432496ed750135c7f422b12a5b70a

087-r1-pins.log  17:15  up  8:42, 4 users, load averages: 1.30 1.67 1.74  exit=1  86e6e532b38fa6aa11770ba5356d2d2f179c13c4a86aa358c56ff586f54b8169

088-update-failed-pins.log  17:15  4 users, load averages: 1.31 1.65 1.73  exit=0  b61ad6fee88f314397784a8564c185c72f1b4b640928c6de3fda89139156e1e9

089-stage-registration.log  17:15  4 users, load averages: 1.31 1.65 1.73  exit=0  e587f7731afc0bf5fbb2e58461693162798624c697923ff775216fe106f3e0de

090-check-registration.log  17:15  4 users, load averages: 1.31 1.65 1.73  exit=0  3a9ff68d8772dd640ab70a23349f6c4eea7e05b173c7366f23b499aad2d4df77

091-r1-wait.log  17:16  up  8:44, 4 users, load averages: 5.38 2.64 2.09  exit=0  95d47e143e2db1e48176335c76d4ea34b3899119f0c16abd5413578e62e15ef3

092-r1-tests.log  17:20  up  8:48, 4 users, load averages: 1.55 2.47 2.18  exit=0  6884c6ca9db2738141f6dee8b8d00cef49162b500078ba67f08b4a7e58253f36

093-r1-message.log  17:17  4 users, load averages: 5.17 2.77 2.15  exit=0  5a649a6515674f058aa57296f5a4e03acbe9ba50b23c1a1e201cf1f3f17c3a0d

094-check-message-2.log  17:17  4 users, load averages: 5.17 2.77 2.15  exit=0  95f38f9fe8ffb853a560a4786008e400aaa5afd064e442f0223a18d5c1eb4f7e

095-mutation-helper.log  17:17  4 users, load averages: 5.17 2.77 2.15  exit=0  eb758594ef61ca7973ddfceb4c48276dafce051d1ca3b4511e2ea3136ea66d74

096-timer-api.log  17:17  4 users, load averages: 5.12 2.88 2.20  exit=1  108ddb37602c3f304900da2a0089c469291330da90aa8c9fe536f33ae0ab27d4

097-probe-teardown.log  17:17  4 users, load averages: 5.12 2.88 2.20  exit=0  09ad4d27a24609ff550e6d6ae566c826a2b38419f6c7ed018a07ef30a1a481a4

098-prepare-break-record.log  17:17  4 users, load averages: 3.99 2.77 2.17  exit=0  70669506b5aa7ae1c7444d21dda002853eb2c01a3e88cc1e7528b504d99ce44a

099-supplied-record-sections.log  17:17  4 users, load averages: 3.67 2.73 2.16  exit=0  5a2fdccb5b1b88699075d2e6338236f9092caafbede1aec2138dfb0ee082a2d4

100-reference-registration.log  17:17  4 users, load averages: 4.82 2.98 2.25  exit=0  5b7310a81e2f8988235a70ee9b40ad866569e85dab43ea800884313679865b58

101-input-events.log  17:17  4 users, load averages: 4.82 2.98 2.25  exit=0  53c5c57c8ea6ffa20bf4c88279550721a13e447ce65b804b8055e042f381753c

102-prepare-test-comparison.log  17:18  4 users, load averages: 3.71 2.89 2.24  exit=0  bf1daa3c3546bb93fb4195b510dfba0568f31fd3baae9695fbcec1c4fd6a5d44

103-break-evidence-reader.log  17:18  4 users, load averages: 3.89 2.95 2.27  exit=0  d92c7918827558babd6f151b22ee0e60963c723aa1725be30840389c7981e6f5

104-attribution-pr-mode.log  17:19  4 users, load averages: 2.90 2.80 2.24  exit=0  ddaec6fce49cbb48750ec4a0fd31e193e8ceffee2e7e89129fec8cd305fbb178

105-report-diff-format.log  17:19  4 users, load averages: 2.90 2.80 2.24  exit=0  21b20c7749052a90433eae35e98dce6ac776674cef43b9cfd21b9e8758ce0eba

106-source-format-check.log  17:19  4 users, load averages: 3.26 2.88 2.28  exit=0  276eb242f42d1e7de47acc59e1de7bc068c40fd058b0c0c68e5d95ce2e1e5ade

107-supplementary-rules.log  17:19  4 users, load averages: 3.26 2.88 2.28  exit=0  a57b97a14ada472b243b2d071a63424f1e71f2bc8390cf5ef7b4b9f42fd091d9

108-document-report-functions.log  17:20  4 users, load averages: 2.18 2.67 2.24  exit=0  7e70201d4d730b96e7e06f8079ef0c9a2de9512288e4c6dc8c5a3efc9c0819b2

109-break-1-diff.log  17:21  4 users, load averages: 1.35 2.38 2.15  exit=0  1a9bfaae38b31ebd02a7ada50c4a360c947ab6851c8c5b50fe16bec90e8ff573

110-break-1-runtime.log  17:34  up  9:01, 4 users, load averages: 3.47 2.39 2.19  exit=0  74140c43ba313761c284effc9d6b1b69548bbc33c6cd68e7a8ac7e77816d8dd7

111-break-1-wait.log  17:34  up  9:01, 4 users, load averages: 3.47 2.39 2.19  exit=0  1f3125670d9635dea5a4e8a791377275357ef04e5e21b1f138070561434f1e2e

112-break-1-tests.log  17:36  up  9:03, 4 users, load averages: 1.92 2.26 2.16  exit=1  f1b0fe1cd6de4c6661e3ddd87471772e79090f9d94a74c3d3cbcefbb7be93952

113-break-1-observed.log  17:36  4 users, load averages: 1.92 2.26 2.16  exit=0  059098022265189320114a36096404e19370e080a8fc1e86bc05156661a99652

114-break-1-restore.log  17:36  4 users, load averages: 1.92 2.26 2.16  exit=0  d16bcc0cf9fb1298e71e9f38024e81999e7fcafb5ae0896ca75508edd24a9d8f

115-break-2-diff.log  17:36  4 users, load averages: 1.92 2.26 2.16  exit=0  5e7f3053b5a2e60da8dc97073f50b0fcc6af7ec70d5dc23a22216cb579bc423a

116-break-2-runtime.log  18:30  up  9:58, 5 users, load averages: 2.59 2.58 2.65  exit=0  470c9a715951bc2cd49afc441e9568e9d2499391c1abb3edd44d45e91ce2a0de

117-break-2-wait.log  18:30  up  9:58, 5 users, load averages: 2.71 2.60 2.65  exit=0  e42d7ca8fb6eaa0d7886f2019a579b6d25d1f806c9d3ce6dd39ce2cdfc9d8103

118-break-2-tests.log  18:32  up 10 hrs, 5 users, load averages: 1.39 2.26 2.52  exit=1  e09635e00f056a9bd028c79ea7d9e8ee9c37743b34e848b19a63deef722b3ff2

119-break-2-observed.log  18:32  5 users, load averages: 1.39 2.26 2.52  exit=0  a9927edd29dcf8230c362b9e2c15ddc6551a33a0b346e3ddfb2943e194acf7af

120-break-2-restore.log  18:32  5 users, load averages: 1.39 2.26 2.52  exit=0  24890aa40811ec4cc17423cb045aa6783208485678a34b887b4cac9d8bcd1141

121-r1-break-wait-status.log  17:36  4 users, load averages: 1.92 2.26 2.16  exit=0  b5be2aeec47ea4ce20476562ab154f4d849ac1228bad280a47d0c3b1577a5b81

122-commit-registration.log  18:32  5 users, load averages: 1.35 2.24 2.51  exit=0  65225091c4c491e45dd993430ec1253f5ee856335ea93d168cc749f51cff3089

123-registration-proof.log  18:32  5 users, load averages: 1.35 2.24 2.51  exit=0  15308c2beb230f6f76900150cdd634d38c786c5492e020d00d740d7ecae2dfbc

124-registration-head.log  18:32  5 users, load averages: 1.35 2.24 2.51  exit=0  d7db802c844ede3393c47b70e5a66dd7e2e066fba700cf8e1499006f03c36ea4

125-r2-parser-and-recordings.log  18:33  5 users, load averages: 1.83 2.27 2.51  exit=1  539e102dfeb21ae089ddedb9afa50ea4faecb855e97f43c24b66097d6ec7e9f4

126-r2-test.log  18:33  5 users, load averages: 1.83 2.27 2.51  exit=0  cf7fddee4ac79377e587383aaa9594866c7d4128b83386c12b63a951f8b8fe40

127-r2-diff.log  18:33  5 users, load averages: 1.83 2.27 2.51  exit=0  8ef2cad7aeb1cfb1464ad5ac9d4fdbcbfd61e2f09be1d0db1e1aab3c31788521

128-mutation-helper-mode.log  18:33  5 users, load averages: 1.76 2.24 2.50  exit=0  c67ca2ff65a5a68197a8cc73797142f62f26a668718d14a1912d854ea5a0960e

129-enable-scratch-write.log  18:33  5 users, load averages: 1.62 2.21 2.48  exit=0  4779d0ec848fe42d99b6231b0f6345db0f2d2acf735847c29e3375c9b1def7f3

130-align-breaks.log  18:33  5 users, load averages: 1.62 2.21 2.48  exit=0  2896421c9d9e7a8570bd3fe8deb295a8b9d0b29e95084ec556a002db4b7b133e

131-r2-runtime.log  19:30  up 10:58, 5 users, load averages: 6.85 4.38 2.88  exit=0  37a7266d8af5cd59e1c4b892869536bc2912e6ff6e81cfd7963e5efab29e4b7e

132-r2-wait.log  19:32  up 11 hrs, 5 users, load averages: 5.29 4.28 3.01  exit=0  19228188ba36b3a749e4e0a26bc73910d959dbaed373148e707839e703b2d620

133-r2-tests.log  19:35  up 11:03, 5 users, load averages: 1.75 3.19 2.80  exit=0  e5fed9cd240ef34aa8e1291cc01533a9fc5f89f86a7e86998ebd08ccbb8dff52

134-r2-message.log  19:32  5 users, load averages: 5.38 4.34 3.05  exit=0  caa762dd2b56d4d60bcbe38dd70bd6435d91d74cfdefd7e4c93f07ce909c29dc

135-check-message-3.log  19:32  5 users, load averages: 5.38 4.34 3.05  exit=0  5baec452fa85a3c66d0d261257e28ef58bb18c7f765e1344de2f6943e435842f

136-r2-source-diff.log  19:32  5 users, load averages: 5.38 4.34 3.05  exit=0  6926ca91929f50bd1c2da398466be433170adc3f14112274305051153505635a

137-prepare-change-table.log  19:34  5 users, load averages: 3.10 3.77 2.95  exit=0  11e34f13157c1bb77474787917ba130598f4cab3713e5a68abf7e4ba61a88f62

138-stage-parser.log  19:35  5 users, load averages: 1.69 3.15 2.79  exit=0  b5c6cff8678df3feb8c54c352dfd7f0b7d5c663e937ecb383a1ddeddc5a95402

139-check-parser.log  19:35  5 users, load averages: 1.69 3.15 2.79  exit=0  b6f208b8c0d491151f76495e9dce4de0950686586ec47bb50505416ecf2ff6cf

140-break-3-diff.log  19:35  5 users, load averages: 1.68 3.08 2.77  exit=0  45229ff474852fced53c4171036995986c19d36d1ed4b4a3df28becbc1fb38e7

141-break-3-runtime.log  20:02  up 11:30, 7 users, load averages: 1.74 1.60 1.80  exit=0  0ad35e2b3493ac82a40490baca1d4ed341c3531b1240e856b8ffaec4bf6fad03

142-break-3-wait.log  20:03  up 11:30, 7 users, load averages: 1.76 1.61 1.80  exit=0  1e61a900221fc9e13b2668e991a943fba6f42b5a8bd3ceec336307c21bc030e6

143-break-3-tests.log  20:03  up 11:30, 7 users, load averages: 1.76 1.61 1.80  exit=1  2b385f5538064cbfc0e9b9491fc15fd843f910950a4a1baaab2c6f851502be1c

144-break-3-observed.log  20:03  7 users, load averages: 1.76 1.61 1.80  exit=0  0b026f1b6d641fe9c33ae04f8bb291b020c16d407d23e6fdef18d8629ab47774

145-break-3-restore.log  20:03  7 users, load averages: 1.76 1.61 1.80  exit=0  ae238cbd4b26788e19e9973698ecfcfd351c9fe672a250cccff344fcd65103a8

146-break-4-diff.log  20:03  7 users, load averages: 1.76 1.61 1.80  exit=0  161ccda8215a088607264736a40058b9d982a58dc9fac3392c6998432d38543a

147-break-4-runtime.log  20:03  up 11:30, 7 users, load averages: 1.76 1.61 1.80  exit=0  f55dac7839cf59cd8183496ee8ae03be09ec9e9347c05650195bc0cb76d5e8d0

148-break-4-wait.log  20:03  up 11:30, 7 users, load averages: 1.76 1.61 1.80  exit=0  1e61a900221fc9e13b2668e991a943fba6f42b5a8bd3ceec336307c21bc030e6

149-break-4-tests.log  20:03  up 11:30, 7 users, load averages: 1.76 1.61 1.80  exit=1  bf8c0f0ffa462fa86add45e5a4e27800092b8c05ee9323c9b2c93435866cef56

150-break-4-observed.log  20:03  7 users, load averages: 1.86 1.63 1.81  exit=0  258ed1a1f6e24426ce4d1fe5a70881315b043fb6ccf5226b78b2f59b669d5f88

151-break-4-restore.log  20:03  7 users, load averages: 1.86 1.63 1.81  exit=0  663654d86cd76b987b56faebe2801b9d071ec885083e53988e1f81bdda5dc587

152-break-5-diff.log  20:03  7 users, load averages: 1.86 1.63 1.81  exit=0  822f21b4ec0cfdbe545a334229099967b6e387957ba1fb5f2ccfcfd3bc704e7b

153-break-5-runtime.log  20:03  up 11:30, 7 users, load averages: 1.86 1.63 1.81  exit=0  1d605e89a28f8ff471c6fb1a1241376c2d6c171a4392227f5fcf97294f8b9d46

154-break-5-wait.log  20:03  up 11:30, 7 users, load averages: 1.86 1.63 1.81  exit=0  22ce5598b95ff41faa1745ae6936011d1b6cc65e6c0c8fb29866cacfc250dd9a

155-break-5-tests.log  20:03  up 11:30, 7 users, load averages: 1.86 1.63 1.81  exit=1  cf0b0ca60e61019b2b7551927694b4829651b701acc1ce58d61dd6751b9bec35

156-break-5-observed.log  20:03  7 users, load averages: 1.86 1.63 1.81  exit=0  d7b2dfd31f506a313a4cdd0727616a1fd83f1c9bd5ea7054d503eb2a07a8d866

157-break-5-restore.log  20:03  7 users, load averages: 1.86 1.63 1.81  exit=0  697f9cec05d51d344bf3be1121f3d6876b3da874a2a6f21560d95eb0b13b4899

158-break-6-diff.log  20:03  7 users, load averages: 1.86 1.63 1.81  exit=0  eea99e0674e0e0b9082ee1ace5d107017b4d4d0de0a153902782c607263547f5

159-break-6-runtime.log  20:03  up 11:30, 7 users, load averages: 1.86 1.63 1.81  exit=0  1d605e89a28f8ff471c6fb1a1241376c2d6c171a4392227f5fcf97294f8b9d46

160-break-6-wait.log  20:03  up 11:30, 7 users, load averages: 1.86 1.63 1.81  exit=0  22ce5598b95ff41faa1745ae6936011d1b6cc65e6c0c8fb29866cacfc250dd9a

161-break-6-tests.log  20:03  up 11:30, 7 users, load averages: 1.86 1.63 1.81  exit=1  ce916395de21825e415368597c1c95a5b8366996db8a649ae1719a3865e8af82

162-break-6-observed.log  20:03  7 users, load averages: 1.71 1.60 1.80  exit=0  15232e5f11d4c806ebeeb7390c428f67d42563f4f6b4a2fbd109c46dfb5bc8df

163-break-6-restore.log  20:03  7 users, load averages: 1.71 1.60 1.80  exit=0  b1bcff7d9b9f2c071bd5efa5344ab312d02f864e5839294b63af28a8c5bdc0ee

164-break-7-diff.log  20:03  7 users, load averages: 1.71 1.60 1.80  exit=0  d759d490e2a69849f732d3285dd00d5d1c6b6a5d26fa56937c63e8cc7b9f408e

165-break-7-runtime.log  20:03  up 11:30, 7 users, load averages: 1.71 1.60 1.80  exit=0  66c939f40129c1e86ff44498e903091b09c05b18f897881f8a8174d9b5241e26

166-break-7-wait.log  20:03  up 11:30, 7 users, load averages: 1.71 1.60 1.80  exit=0  54271a000a40035f3ba8597d6deb182ed42fbf4b1d7eec40b520ad3b427c52c9

167-break-7-tests.log  20:03  up 11:30, 7 users, load averages: 1.71 1.60 1.80  exit=1  1c54e0ce6b24402e05352454b9e55a3473b3a08367ebb453ed3154436071d657

168-break-7-observed.log  20:03  7 users, load averages: 1.71 1.60 1.80  exit=0  cf0dfebea61c0842a7871d8430af8fba6457b26d6a803dee4642b06dde96ea60

169-break-7-restore.log  20:03  7 users, load averages: 1.71 1.60 1.80  exit=0  1a172899a6196df44ed5f53603a471f02640b2fa471b99c2d19f1e9a0f277815

170-commit-parser.log  20:03  7 users, load averages: 1.66 1.59 1.79  exit=0  e1e3a7006f5dc34814c3ca385f7c89caf1cb31a474e9bb33cf8ab6e760700a8e

171-parser-proof.log  20:03  7 users, load averages: 1.66 1.59 1.79  exit=0  78272ad12db3b211dc818decfd8e5960dd2d94f78a2234ccbbca6c8aa45a1c5b

172-parser-head.log  20:03  7 users, load averages: 1.66 1.59 1.79  exit=0  2a586cde1e2b80e1aeb89e2dbd87228aa8df92793132669b1af6550846fc43b4

173-interval-tests.log  20:03  7 users, load averages: 1.96 1.70 1.82  exit=0  294b7ff0b7ab2070299124ea3c5aa791dd425da9a051ee7c225828facb76b1e0

174-allowlist-test.log  20:03  7 users, load averages: 1.96 1.70 1.82  exit=0  4d7dd1c4dfdf74d25ec5ac5a1a77d0469ed6a09456f905a751a06c4ebd2480d5

175-fixture-integrity-test.log  20:03  7 users, load averages: 1.96 1.70 1.82  exit=0  cc7840915e89b74d722b9501105cfa207396be82f38e2cb90bebe6ef1c80d295

176-r3-file-modes.log  20:03  7 users, load averages: 1.96 1.70 1.82  exit=0  bd7032f0ac1e8fb38dc51e1fb80f11fa69ac44788ea6410f22a07f952fa7188e

177-r3-runtime.log  20:06  up 11:34, 8 users, load averages: 2.10 2.21 2.04  exit=0  9174e6a2bfc15e679a1ccaf8b73fff0f35aa33e55c3affd18caaae8693fd4564

178-r3-wait.log  20:06  up 11:34, 8 users, load averages: 2.10 2.21 2.04  exit=0  4448084f992665fb0dbbe6e8ba34110d0663b9d83fffee9c5d9c078df660872b

179-r3-tests.log  20:07  up 11:34, 8 users, load averages: 1.34 2.01 1.98  exit=0  0a4da030510c9e98f923ed29e600421db265d30643f7fffa468dfb2ca560d1ef

180-r3-message.log  20:06  8 users, load averages: 1.77 2.14 2.02  exit=0  9b135e3e6891063c15f8a33d95fbd30a1cd6e4076338f57d70aef69ce1ce308d

181-check-message-4.log  20:06  8 users, load averages: 1.77 2.14 2.02  exit=0  c291200425782d0fdc15e0b5f13a621c69d9bb0b4d0047ba70320cc341273aca

182-break-8-diff.log  20:07  8 users, load averages: 1.50 2.00 1.97  exit=0  47351dce6fc8564dc803f75f4a4238abd108134d1a614c0076bc652f478654dd

183-break-8-runtime.log  20:09  up 11:37, 8 users, load averages: 1.41 1.91 1.94  exit=0  7c841ee430321137bdf3b0aa777dda83434d60eec621d157e309aa8595244fc3

184-break-8-old-wait.log  20:09  up 11:37, 8 users, load averages: 1.30 1.88 1.93  exit=0  4eaf8c50759979ff3a743e2b666824e53e62a0b2dc562e402cf8571a1e6946df

185-break-8-old.log  20:09  up 11:37, 8 users, load averages: 1.30 1.88 1.93  exit=0  f0c76c1e2d15761fb7b0359e1aa819bbf0704740e756a201a5be4d5b60fce51e

186-break-8-related-wait.log  20:09  up 11:37, 8 users, load averages: 1.30 1.88 1.93  exit=0  4eaf8c50759979ff3a743e2b666824e53e62a0b2dc562e402cf8571a1e6946df

187-break-8-related.log  20:09  up 11:37, 8 users, load averages: 1.30 1.88 1.93  exit=0  6669f04b5b96b5b8232b751f3164b234192f2db57d5e1d081f8f0bb31948cc49

188-break-8-tests-wait.log  20:11  up 11:39, 8 users, load averages: 2.14 2.00 1.97  exit=0  ad4d8d8e30e4748fe101518a76253a9f86f9d4ba041e05bb0139bc2137d25d79

189-break-8-tests.log  20:13  up 11:41, 8 users, load averages: 1.64 1.91 1.94  exit=1  a2ca45f3a9e590275784372db8c3f3b4b984be6859dcb3d5a2b3b865f54dc088

190-break-8-observed.log  20:13  8 users, load averages: 1.64 1.91 1.94  exit=0  c671808847fe8afb608b06fad0f07b350c623bb7f6cc8a6818ee49531b32e465

191-break-8-restore.log  20:13  8 users, load averages: 1.64 1.91 1.94  exit=0  f06dddd9ca9b389aca0bc8683ea4413041ff124bd3679414318b6800677ff9ec

192-break-9-diff.log  20:13  8 users, load averages: 1.64 1.91 1.94  exit=0  9d666a8815f810044558a3b44f6bf1c6060c8540d9dbc87b106212131e61c1e9

193-break-9-runtime.log  20:13  up 11:41, 8 users, load averages: 1.42 1.85 1.91  exit=0  0980a76c72c4fdad856bbb462889e412c2b04d3da9bfd154dbc80e09d3bef454

194-break-9-old-wait.log  20:13  up 11:41, 8 users, load averages: 1.42 1.85 1.91  exit=0  5f5d9edbfabc6ab53321acbfa3438fa3351c4b6a376875d6c45d0a5456b55920

195-break-9-old.log  20:13  up 11:41, 8 users, load averages: 1.42 1.85 1.91  exit=0  f97b1a064d46c856f046f7631ef177ca011d8b937f3a5805b9a7bb398847fa0b

196-break-9-related-wait.log  20:13  up 11:41, 8 users, load averages: 1.31 1.82 1.90  exit=0  ec006460cb279a96488c0bed8b894e163d402bbcd898fe00166ad5d0b79bf1b3

197-break-9-related.log  20:13  up 11:41, 8 users, load averages: 1.31 1.82 1.90  exit=0  a88e60a6648e757d032532917b00b3ec694beb702e3bde1fb989a6ff979604f2

198-break-9-tests-wait.log  20:14  up 11:41, 8 users, load averages: 1.42 1.83 1.90  exit=0  af4d17c438d22081dfbaf3df8a05d7187f85937e637a736e6251e77a30b02ca8

199-break-9-tests.log  20:14  up 11:41, 8 users, load averages: 1.42 1.83 1.90  exit=1  2295efb3b43b147032434bd1685c30da47fbd1dbb9593005bf0a806c38c40181

200-break-9-observed.log  20:14  8 users, load averages: 1.42 1.83 1.90  exit=0  ca93058561d09f7e6b174540781b88bcf9661cd142adf9613eace7e08cf53515

201-break-9-restore.log  20:14  8 users, load averages: 1.42 1.83 1.90  exit=0  41552b53f210caefb677ce758f5e27aa2fe57a038c5eec4ea66d9a83a3d21450

202-break-10-diff.log  20:14  8 users, load averages: 1.42 1.83 1.90  exit=0  104c854cd6130e6179bae6b6f00b9c432ef1845047674176a0b8f4d843c079b9

203-break-10-runtime.log  20:14  up 11:41, 8 users, load averages: 1.30 1.79 1.89  exit=0  d05179b109195f64976d9be9f0fceb3d8e35fa1905f9ce344c25ec6647390eb1

204-break-10-old-wait.log  20:14  up 11:41, 8 users, load averages: 1.30 1.79 1.89  exit=0  6089cb153333ba7fcf2302ebf2de6b8f26e455a7638a86081568d06ec8dce652

205-break-10-old.log  20:14  up 11:41, 8 users, load averages: 1.30 1.79 1.89  exit=0  748e9cb434427063a5929783189c2d1ee036cd27d64ffad7c2261c4d89409c8b

206-break-10-related-wait.log  20:14  up 11:41, 8 users, load averages: 1.30 1.79 1.89  exit=0  6089cb153333ba7fcf2302ebf2de6b8f26e455a7638a86081568d06ec8dce652

207-break-10-related.log  20:14  up 11:41, 8 users, load averages: 1.30 1.79 1.89  exit=0  32601307dae0fae5a12a3dee820c155c8b86544716b8174ce490b3af59d48adb

208-break-10-tests-wait.log  20:14  up 11:41, 8 users, load averages: 1.28 1.78 1.89  exit=0  cd1be2628503188099d7534eb251b3587d82fd42b0fb942bfa7379d00cc86196

209-break-10-tests.log  20:14  up 11:41, 8 users, load averages: 1.28 1.78 1.89  exit=1  322d5a22adf603162a9201c87ba8f658e20d63e9e3389dffc0cb539227630d0d

210-break-10-observed.log  20:14  8 users, load averages: 1.28 1.78 1.89  exit=0  82c115805c4bbb2dfa95fe7a8d82dd16a6a16605996521f8b453c6ea0e346d21

211-break-10-restore.log  20:14  8 users, load averages: 1.28 1.78 1.89  exit=0  5e1b3fa1727cad99ba5caa07c472b32ec0428ec7eb60b6d20a4c88848169ebad

212-inspect-record-host.log  20:12  8 users, load averages: 1.99 1.98 1.96  exit=0  98e3216a80309d7b9e098a37f0ff6aabdfd64ffd8fe3a66cae2ce5b8dc0e9291

213-release-sample-shape.log  20:12  8 users, load averages: 1.99 1.98 1.96  exit=0  605637801fd6222a0f1610f922ea16eae5723c40891dd8aa62476d1ed299073b

214-release-error-shape.log  20:12  8 users, load averages: 1.99 1.98 1.96  exit=0  d8e68a9ac360a1cda7535a666d8de882e5b1c0d55985846224359b243a3ce7ba

215-release-shapes.log  20:12  8 users, load averages: 2.23 2.03 1.98  exit=0  d925bba993ae89f0ab4597bb02a5fa1dfc21324dca7df5133aefdf8099851408

216-release-auth-fields.log  20:12  8 users, load averages: 2.23 2.03 1.98  exit=0  03b1c263f9d24cd97df017ff4052349afc4ac2b639eb32032e95112545e44fc8

217-timer-restoration-proof.log  20:12  8 users, load averages: 2.23 2.03 1.98  exit=0  5cc3f88bd7ff8a03470c68c2880595eee0468c844eb249e10103b37e7f7d5a7c

218-prepare-full-checks.log  20:14  8 users, load averages: 1.30 1.79 1.89  exit=0  aa328254a3ca7aa3ce79ebbd397264c404a6e6ff431d88683f0e3d8aeda56220

219-stage-advisory-tests.log  20:14  8 users, load averages: 1.08 1.72 1.87  exit=0  5d0d9f7b18c5b531e63e8065a1e5f02725cd9f59aa5836ea7f1ac82d02ee8457

220-check-advisory-files.log  20:14  8 users, load averages: 1.08 1.72 1.87  exit=0  c0d40e54d422d78a25d4b3bcf912d2eb0412773172827ba0b3642bb035463a5c

221-check-advisory-paths.log  20:14  8 users, load averages: 1.08 1.72 1.87  exit=0  0565f978cf1897f0d7e5166b681d84a0bcaaec960f1ad8ef4524e4004270805c

222-interval-allowlist-proof.log  20:14  8 users, load averages: 1.08 1.72 1.87  exit=0  32c05c4b510e016729725add961b98654d393d91ef0ad35d5767ad81e49130cd

223-commit-advisory.log  20:14  8 users, load averages: 1.08 1.72 1.87  exit=0  34b746ea9dac41b2902895e028602c4a19481e75ecb4de33f9cf78bbf0462d8d

224-advisory-head.log  20:14  8 users, load averages: 1.08 1.72 1.87  exit=0  ec63fe8fdd940c043cf1370e7bd633c2859659cf9842d128118b6531a15cffb9

225-full-runtime.log  20:15  up 11:42, 8 users, load averages: 1.16 1.66 1.83  exit=0  cbe4a08738ed8f0b29dff8d8a54da933890f411247fbeddbd966478c051c06c5

226-full-lock-before.log  20:15  8 users, load averages: 1.15 1.65 1.83  exit=0  08eba044cd5e66c7164a64b03fdf0ab2dd3087ba61f14c11055dea0beb9b9001

227-full-install.log  20:15  up 11:42, 8 users, load averages: 1.13 1.64 1.82  exit=0  a4b431e495b4de010786f7d78ff2ad57aa3b442151eeae057e116145533ce5da

228-full-lock-after.log  20:15  8 users, load averages: 1.28 1.66 1.83  exit=0  0f248113de9ad3944d7d43ea3e2416b7b95dd05d587f87513f7bb021820c084c

229-full-install-tree.log  20:15  8 users, load averages: 1.28 1.66 1.83  exit=0  355e66abefad79f88dddf64b6a7d3ee54e3e0ccb427f1edead5fc65fc74112a6

230-full-install-status.log  20:15  8 users, load averages: 1.28 1.66 1.83  exit=0  e9e420ffa95a44c19e38e686d66c5376db8e9d246d6431f6806e3df6aa78e6ad

231-full-install-restore.log  20:15  8 users, load averages: 1.17 1.62 1.81  exit=0  0a23501396f4a40610175ef53fa2c987b486742da3a8f2df39100a324da9e76b

232-full-restored-tree.log  20:15  8 users, load averages: 1.17 1.62 1.81  exit=0  6d74df02108b1de519cc25f0136f4046dda3ebee7e703a30da779b76f5f87962

233-full-typecheck.log  20:15  up 11:43, 8 users, load averages: 1.17 1.62 1.81  exit=2  96a941b7f78a28529fc921051ad5d7bdeb2d01de365d089863d983569423a876

237-fix-manifest-row.log  20:15  8 users, load averages: 1.17 1.59 1.80  exit=0  8b52ee94a6bc67e3671d1db7047712751a42c84b1b9951cc5a43447a9e1d817e

238-fix-message.log  20:15  8 users, load averages: 1.17 1.59 1.80  exit=0  10a937806e73e91beaa2d52c398c27bed06e3cb2ff7f0026b6e5e60d7ea77b8d

239-check-message-fix.log  20:15  8 users, load averages: 1.17 1.59 1.80  exit=0  3e8a4359231f044ecc1bbe66512a316b0a1fb48c06f5d68333aaca3e06fba3a9

240-stage-row-fix.log  20:15  8 users, load averages: 1.17 1.59 1.80  exit=0  02084ab6c3725ceed6b728dd8ba22a9c88a85f251ece5bac7b8286219780355e

241-check-fix.log  20:15  8 users, load averages: 1.17 1.59 1.80  exit=0  9c391afd0d01d60f5a4cb887877236ac5a3e43164421d7769508717d40261edb

242-commit-row-fix.log  20:16  8 users, load averages: 1.29 1.60 1.80  exit=0  1c347fc142341fdb03701d7661b00d184a28dd6e7c74df98c9555b3d5cedc632

243-fix-head.log  20:16  8 users, load averages: 1.29 1.60 1.80  exit=0  f5d5193400ec8afa5da0e5b23b7d06d19cd021f1b8ea68b9180b6530dcd161ef

244-repeat-runtime.log  20:20  up 11:48, 8 users, load averages: 1.88 1.77 1.82  exit=0  7477bc0db407a1e1867a138ec101e200d5b384622ce47538ba06b57224ae9b86

245-repeat-lock-before.log  20:20  8 users, load averages: 1.88 1.77 1.82  exit=0  d24ddb7e34d23d4e979011863eb7a44c093982941acb6b9f0c84fe8c0cfd753f

246-repeat-install.log  20:20  up 11:48, 8 users, load averages: 1.88 1.77 1.82  exit=0  a2eab7ff569ea80ba0453bac35cad9c586af3e1822e70d0bc486ce446b631e29

247-repeat-lock-after.log  20:20  8 users, load averages: 2.19 1.85 1.85  exit=0  57aef6f09709014bd863b752cec3d5fa97a26ed95e8768adb9b23ebf6f798d5e

248-repeat-install-tree.log  20:20  8 users, load averages: 2.19 1.85 1.85  exit=0  01c712384d919bdd45fcd53f0622fe2c3f76860c3613008095c8051b5ee4c5ed

249-repeat-install-status.log  20:20  8 users, load averages: 2.19 1.85 1.85  exit=0  5345c556358aee742afad91c92b8df7a4bb22151e8d507a1eab6a4251a715c98

250-repeat-install-restore.log  20:20  8 users, load averages: 2.19 1.85 1.85  exit=0  c420e83374a1a75030ceb56e51903ce37de5ad28d7a5c6c3870cdfb3acfd3407

251-repeat-restored-tree.log  20:20  8 users, load averages: 2.19 1.85 1.85  exit=0  6f2dec1021f88204da9ec972a3f3b9af478f43febbe24a9708591d238faea034

252-repeat-typecheck.log  20:28  up 11:55, 8 users, load averages: 2.57 2.05 1.91  exit=0  d008b82c8f1abf8fc5822e964cd6605710466f836fa3cda15c3af2e0a6f0bd87

253-repeat-suite-runtime.log  20:36  up 12:04, 8 users, load averages: 4.32 3.79 2.96  exit=1  235cb6ddea4d8b0dc42cc82febe211aafc94cdc0d0e4af89f04ecf3135e8aba4

256-halt-state.log  20:37  8 users, load averages: 3.24 3.58 2.91  exit=0  3741f52bd58d8e9bc8233fbdddd5f12dc6251146ce319d1f202f16ec3b446e34

257-halt-commits.log  20:37  8 users, load averages: 3.24 3.58 2.91  exit=0  55e6b342ec65cb0c18728392446e2384d576563d69c477688ac849fa5cf5daa2

258-halt-stat.log  20:37  8 users, load averages: 3.24 3.58 2.91  exit=0  e6c9121fcd47a268d3a1082029b31a66e0811bd66134a95abd63c35398eb9442

259-halt-source-diff.log  20:37  8 users, load averages: 3.24 3.58 2.91  exit=0  9f9dcc0854558162d2a35faeef97c8967defc53a11880ddb60969f37b07cb021

260-halt-build-log.log  20:37  8 users, load averages: 3.24 3.58 2.91  exit=0  a3144dad1863d5d8f95adbc8cc4f6ec11832432d4e3802d592496cdb2d4e7539

261-halt-record-dir.log  20:37  8 users, load averages: 3.24 3.58 2.91  exit=0  26135908b3622f83b0b5bfa6411badb42f1e824b530c6684f8f0165f490e30f3

262-prepare-halt-report.log  20:38  8 users, load averages: 2.23 3.15 2.80  exit=0  5dfaa661166103225053867a0eb3fa55e4e2c6ef9c87af83605c31f8ccfbb70b

263-write-halt-report.log  20:38  8 users, load averages: 2.23 3.15 2.80  exit=0  7bf80b501351b149a5f6377b1a0fcbb0e5fe4f46918d7afcbd3db2a28f6d20a6

264-halt-report-format.log  20:38  8 users, load averages: 2.32 3.13 2.80  exit=0  1cb0b486b3d148f4fff8ee90f6233b7d581b04da0c11fb9646994b4c2de9b2ce

265-halt-report-digests.log  20:38  8 users, load averages: 2.32 3.13 2.80  exit=0  d82d5d5f5b07d870474aaf98a48a3936f7319ea81a8410f0fb678fe796014fcf

266-resume-manifest.log  22:07  8 users, load averages: 3.42 2.27 1.95  exit=0  10b1fc183549a602ae89eba21741a92a89c7f6fb00dab2c36b2c91a9af4a9ac8

267-resume-prompt-files.log  22:08  8 users, load averages: 3.23 2.25 1.95  exit=0  be782ec2dcbeb3292cc02d70e95d0c694335d44f4f7f95f5b9326e818d283ac9

268-resume-hidden-check.log  22:08  8 users, load averages: 3.23 2.25 1.95  exit=0  d3dd691a710677a02025bddaeb761139321999aa1fcd011bca7044fa9d9f31f2

269-resume-input-pins.log  22:08  8 users, load averages: 3.23 2.25 1.95  exit=0  bdc8bfc6a980561f97c2fbfe2da4418381b905d5ae9dc60c58c67de2c98b489b

270-resume-cli.log  22:08  8 users, load averages: 3.29 2.27 1.96  exit=0  7a120e5c25a2df263ab31eae480a4c74d74057c656bdf629fc11acca712a1144

271-resume-head.log  22:08  8 users, load averages: 3.29 2.27 1.96  exit=0  f033bee7a569982b256403115c3ea1556a4c739ed4de3de9369b9d6460c02c80

272-resume-branch.log  22:08  8 users, load averages: 3.29 2.27 1.96  exit=0  9f614eecebfba81852d5ad64f0bff880849b48ea01974590f5392ce61f8538c7

273-resume-tree.log  22:08  8 users, load averages: 3.29 2.27 1.96  exit=0  9003cb3e1e21d302d7e734c078b8b75742025efbe1b1ffd44a8c0a64c341066c

274-resume-stash.log  22:08  8 users, load averages: 3.29 2.27 1.96  exit=0  f7f3f37b81ea2e60be0cd3219db3f03fe03acecba6ec3282e5f3abdd21e9585d

275-resume-pr.log  22:08  8 users, load averages: 3.29 2.27 1.96  exit=0  6b03243989ace6d77183fc0b30fd48663a9c9a397b53288525c31eb7baa75891

276-resume-halt-report.log  22:08  8 users, load averages: 3.29 2.27 1.96  exit=0  84f6c27c22c3d3a2b098f3184c230f498ef5cb935982dcbb63ced00100b1c3b0

277-resume-halt-log.log  22:08  8 users, load averages: 3.29 2.27 1.96  exit=0  fe9ff8810903263ff9829791db2fdb5897289978f540d079c3277c9118555ae3

278-resume-record-dir.log  22:08  8 users, load averages: 3.29 2.27 1.96  exit=0  0c552a24ca0202ae71b005a4a8d75a65fa7a91c1c5529a9ab17c966a70ac26c0

279-resume-runtime.log  22:08  up 13:35, 8 users, load averages: 2.93 2.23 1.95  exit=0  a4422a0f0b9a491bdddf69fb386c398154457a3b3a924469851418520dccdc8c

280-resume-break-helper.log  22:08  8 users, load averages: 2.85 2.25 1.96  exit=0  d6d158de34eaf5454d266fd395f3b5ce48cc79c92f92a2a3a13f7158f3496c7f

281-break-11-diff.log  22:08  8 users, load averages: 2.85 2.25 1.96  exit=0  2cd3f65856229ba894443e83823d62589421a3edbe8722280b2b95b655880be4

282-break-11-runtime.log  22:09  up 13:36, 8 users, load averages: 2.15 2.14 1.93  exit=0  d472a3f5c936470b481aae92f6f5ffa6f1cea010de631d9d56929651f8e74bcd

283-break-11-old-wait.log  22:09  up 13:36, 8 users, load averages: 1.98 2.10 1.92  exit=0  45fe8757d9a29efdebeee5a028772cf3a5cbfadf7070f0ff7e55332bfda1a288

284-break-11-old.log  22:09  up 13:36, 8 users, load averages: 1.98 2.10 1.92  exit=1  060ef46ef8598e56c77054b9fb7ab0201c292d024728b8432b1caf630af6cf49

285-break-11-related-wait.log  22:09  up 13:36, 8 users, load averages: 1.98 2.10 1.92  exit=0  45fe8757d9a29efdebeee5a028772cf3a5cbfadf7070f0ff7e55332bfda1a288

286-break-11-related.log  22:09  up 13:36, 8 users, load averages: 1.98 2.10 1.92  exit=1  620af0468d05576d56b8e400b9953d3af50a9d690d53333309f396d84d4abe26

287-break-11-tests-wait.log  22:09  up 13:36, 8 users, load averages: 1.98 2.10 1.92  exit=0  45fe8757d9a29efdebeee5a028772cf3a5cbfadf7070f0ff7e55332bfda1a288

288-break-11-tests.log  22:09  up 13:36, 8 users, load averages: 1.98 2.10 1.92  exit=1  ef754c07f916cb00fc084ab952dcc8c0872b023d6636dcca2e115359365a04c4

289-break-11-observed.log  22:09  8 users, load averages: 1.98 2.10 1.92  exit=0  a7c50a900ca575174d1fafd1acd1d37121f09910e6f70962fbda409391fc62a9

290-break-11-restore.log  22:09  8 users, load averages: 1.98 2.10 1.92  exit=0  bc4e2ec145308569a99641c5dc61af003f91c99b1ec8d3ca2cda8b4006d59948

291-break-11-proof.log  22:09  8 users, load averages: 1.98 2.10 1.92  exit=0  5c5e39649d60a88a23b341b421c67871932c4fa851b2c68be31adc063f799d8d

292-break-12-diff.log  22:09  8 users, load averages: 1.98 2.10 1.92  exit=0  3873db64baf06fa8924eaf10375c423cfa53a2078ead905f0b9b028b16a2e377

293-break-12-runtime.log  22:09  up 13:36, 8 users, load averages: 1.90 2.09 1.91  exit=0  f6f54c357698ffcf7cda5e24733d1771a6e6a5d6601a95b152c518cb669b5c47

294-break-12-old-wait.log  22:09  up 13:36, 8 users, load averages: 1.90 2.09 1.91  exit=0  6fd684e9ccf901402c1569c03fc4c8717bfabe3f749b0695c5c5211ed36c3576

295-break-12-old.log  22:09  up 13:36, 8 users, load averages: 1.90 2.09 1.91  exit=1  48b83d71082618eb91d42afb21bce95d1c7de907e4ac6897a602d21270b00a51

296-break-12-tests-wait.log  22:09  up 13:36, 8 users, load averages: 1.90 2.09 1.91  exit=0  6fd684e9ccf901402c1569c03fc4c8717bfabe3f749b0695c5c5211ed36c3576

297-break-12-tests.log  22:09  up 13:36, 8 users, load averages: 1.90 2.09 1.91  exit=1  fc8fc8157f11b69e5e8d31033957866680de89a2014a98f7446e17e01e296fd0

298-break-12-observed.log  22:09  8 users, load averages: 1.90 2.09 1.91  exit=0  7bfc458568135d3e1da9eba65bad09d5fba2d384bb1ca8966546b396b14efda9

299-break-12-restore.log  22:09  8 users, load averages: 1.90 2.09 1.91  exit=0  7d8d0a3de90554e22a0178bc1c1bce51ff9e5aaab940f77637574082cfa0010d

300-break-12-proof.log  22:09  8 users, load averages: 1.90 2.09 1.91  exit=0  971be0ca201192375d9d57eabc5027d3fc548568a3d14f423f4607ffe2299684

301-remove-node-modules.log  22:09  8 users, load averages: 1.62 2.02 1.89  exit=0  b05720f7fa0564f627551f37d81b335a3ca97e7f2f62784082977437a4bb3dd3

302-after-removal-tree.log  22:09  8 users, load averages: 1.62 2.02 1.89  exit=0  32da89ff3cf0e91285e4f357c8b0b204803762fd80808e606c5314e943716582

303-resumed-full-runtime.log  22:12  up 13:40, 8 users, load averages: 7.40 3.56 2.48  exit=0  782189ca1e13644c2a8a456042bec98e23ee8bb91715d0ee10e090b9ccfa9459

304-resumed-full-lock-before.log  22:12  8 users, load averages: 7.05 3.55 2.49  exit=0  f8d8b269b46609dc6bbf6e8d37643ff949916c94d0b5d63dcadc706f41d5baef

305-resumed-full-install.log  22:12  up 13:40, 8 users, load averages: 7.05 3.55 2.49  exit=0  01c96c262114bdc318cc20c999cac4c8cd47a89f4b5335add371bfdba0065271

306-resumed-full-lock-after.log  22:12  8 users, load averages: 7.05 3.55 2.49  exit=0  f8d8b269b46609dc6bbf6e8d37643ff949916c94d0b5d63dcadc706f41d5baef

307-resumed-full-install-tree.log  22:12  8 users, load averages: 7.05 3.55 2.49  exit=0  17522c2c8c9ed02303cca966ab8d37a96d762d52e395b772f5b0c2188c602803

308-resumed-full-install-restore.log  22:12  8 users, load averages: 7.05 3.55 2.49  exit=0  c10cfe32aa880e98d7df26dff0367a92ba5f477af4a2ee7c2b156f174c076221

309-resumed-full-restored-tree.log  22:12  8 users, load averages: 7.05 3.55 2.49  exit=0  a726affa1ddd5a5df4fb5239fc40f8d51ce032d44e6a67f97716f61130cf2091

310-resumed-full-typecheck.log  22:12  up 13:40, 8 users, load averages: 7.05 3.55 2.49  exit=0  7c754034fb51a0bf7fe229ce52c46f7ea08a6e03f04aee99592af6c186ad24ea

311-resumed-suite-runtime.log  22:12  up 13:40, 8 users, load averages: 6.64 3.53 2.48  exit=0  4628b3e8cb4842a119bcc753e2b2859e129171d9eb29b51ec651b486dc3b25ed

312-resumed-suite-wait.log  22:12  up 13:40, 8 users, load averages: 6.59 3.57 2.51  exit=0  5c224399104d323e1eb88919c5ffbf1faf1311947be927e9f916a2a5ebda384f

313-resumed-suite.log  22:20  up 13:48, 2 users, load averages: 1.69 2.73 2.57  exit=1  c1fd97a268edc9789b6950d0ed8c0b60e25393beebd4d213c50fcf1e9f4c3840

314-capture-shape.log  22:12  8 users, load averages: 6.64 3.53 2.48  exit=0  cdc5b2a4e895d64855d62ef5c823e679024a425764a0afe13b82dbc8ae574a23

315-capture-auth.log  22:12  8 users, load averages: 6.64 3.53 2.48  exit=0  53abbed38bd62e665faa55e8d7d559b0e8e21a3aa6b924426b6e5837a4127d2d

316-evidence-util.log  22:12  8 users, load averages: 6.64 3.53 2.48  exit=0  3a5c174203e2fd2e35d9594a2236811449a81d4a2f8bba2782a5d5084b985ea7

317-prepare-phase1-evidence.log  22:13  8 users, load averages: 5.32 3.69 2.62  exit=0  48af4505a61bb59c571c25bc208c7d25a300c9eeee70f90623c1ed4747f457e9

365-prepare-build-log-completion.log  22:14  7 users, load averages: 3.52 3.49 2.61  exit=0  8f05ae8de90d77eff2b415d337db594fa2d66ffc5076436ddd57233d879411ce

366-evidence-log-names.log  22:15  7 users, load averages: 2.77 3.31 2.58  exit=0  7819e727c275bd839bbc5feda6467610634ddec576c4d4e4d6486f1ef62a2ef8

367-prepare-final-report.log  22:16  7 users, load averages: 2.45 3.12 2.55  exit=0  e9367ef835c567af1886a4cf38febc7b4e909d6ffd60f8d1f46d6e72ed95ce4f

368-closing-message.log  22:16  7 users, load averages: 2.62 3.07 2.56  exit=0  81b87f1466158a68ac27e9a0ff7a9ad664d466f35d845952f9d4c53ee2c83557

369-resumed-suite-failures.log  22:23  2 users, load averages: 1.89 2.42 2.47  exit=0  85e86ec00bce188f4f41dd5fb0ee996d41d9a6f3e411d69a1c48e1e3265195b3

370-harness-exception-source.log  22:23  2 users, load averages: 2.28 2.48 2.50  exit=0  30195ad09e48c339e021bd0fc50767ed093163b3f6a356d566a08e57ca9bb8e5

371-registry-changes.log  22:23  2 users, load averages: 2.28 2.48 2.50  exit=0  b1e45d9c993980c2a807bc88150698b797fe2a92a9f27202fb82fe6cbccb004b

372-bound-files.log  22:23  2 users, load averages: 2.28 2.48 2.50  exit=0  5f47414003bb69cfb4be0c5994ab03a9a1fe2a529687eea422376d50c01234a7

373-base-registry-digest.log  22:24  2 users, load averages: 2.35 2.48 2.50  exit=0  dc9c30aaaf50e1261ab42384c3304053128786ce01401f1aaa7ffeeef889ea25

374-head-registry-digest.log  22:24  2 users, load averages: 2.35 2.48 2.50  exit=0  d643e90cac8a65986c1daf296dedb686baab88685a9607558b4264ff167607bf

375-second-halt-tree.log  22:24  2 users, load averages: 2.35 2.48 2.50  exit=0  82d281cb84493392ce4ea5d6ae74819d0374d7921db4ba2e088e04cc7f8abe6b

376-second-halt-head.log  22:24  2 users, load averages: 2.35 2.48 2.50  exit=0  b5a08f658015ec435587102d4c0c873f0e3b1fc48068356463e0c7de23d268bc

377-second-halt-record.log  22:24  2 users, load averages: 2.35 2.48 2.50  exit=0  eedff898816739c10f171666fe0f518db568827ba220fcc3eee81037c4860b31

378-pin-rulings.log  22:24  2 users, load averages: 2.15 2.43 2.48  exit=0  5b8b439181853aa2155b10e4278660d9eb7b78a07bf75bfbce1a5dcdbec01f8f

379-second-halt-comparison.log  22:24  2 users, load averages: 2.15 2.43 2.48  exit=0  7a3ade3995c02a50963e1396371ed1c0b78976f6151e49f91c92c5333e0fe18b

380-prior-pin-authorization.log  22:24  2 users, load averages: 2.21 2.44 2.48  exit=0  bdcec8a697e62d52e43ef94d618423eb2ff7577d93e672f896594a896ba63c9a

381-second-halt-failure-block.log  22:24  2 users, load averages: 2.21 2.44 2.48  exit=0  b349dcd10899c718ac0794be69abdc3c532ec00095b0cff3d2110c6d8f441a10

11. Deviations

The Founder upheld the stop at log 253. He reported that installing two tools outside this build replaced the binary at /Users/michaeldaley/.bun/bin/bun with Bun 1.4.5, revision a7733435cf40429e3b35c36072769df2052b80f1, SHA-256 e2984124f1514e1e6bbda20adedbf07a02c443c6a5828853a15c7c7abf78e19f. Homebrew’s Bun changed at 01:32:07 UTC and his shell profile at 01:33:49 UTC on 2026-11-22. He stopped his programs and at 02:51:56 UTC moved the displaced binary to /Users/michaeldaley/bun-displaced-1.4.5-20261122T025156Z and restored Bun 1.4.2 from the published release. Its zip SHA-256 was 90987a3a16d7db556d886ac3d551e7b6d3edf0a1cf43acaed622e8676be1d12f. Bunx continued to link to the restored runtime. No builder command ran the displaced binary by path or changed the Founder’s profile or Homebrew installation.

The last passing check before the halt was log 244. The only later Bun commands preceding log 253 were the frozen install in log 246 and the typecheck in log 252. Both are excluded because the runtime under which they ran is uncertain. Log 253 exited on the unexpected digest before invoking Bun. Earlier runs stand under resume item 4.

The signed first resume message has SHA-256 be1771c3d03b5dfa225b808c21591d0bac519d08073cdc80b5d0dbe41ffd41e5. The original prompt has SHA-256 abf0766764f3587d9dd3de096749c2aa6249fc55cd455c3563e22c4744f300d2 at transfer commit 7c90de1501453f359a688be8439efd327abb3302, as the Founder identified it. The renamed halt report has SHA-256 c8e9327cbba2a9cf716bc6661f8ac4279bca7a80322904f71df1b146acb62fe1. The log of the failed runtime check has SHA-256 235cb6ddea4d8b0dc42cc82febe211aafc94cdc0d0e4af89f04ecf3135e8aba4. The resumed sandbox was workspace-write. The session was launched on-request and used per-command approvals. The restored runtime check at log 279 found the expected path, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5, version 1.4.2 and revision 744846f844374847c902b5e7fd59b4342a51ef99.

Resume item 5 corrected the instruction on earlier R3 tests. Their actual results under a break are recorded. Breaks 11 and 12 were made and restored after the fourth commit at f73b5649afff86b558978cb76d09132bc0a7396a, out of the original order. This supersedes the two declines in the opening. All twelve breaks were made. Log 301 removed all node_modules directories under tui before the fresh frozen install. Git status remained clean.

The first R1 pin run exposed four failures. Only the original registry expectation and the shared synthetic init version needed updates. All 24 focused tests then passed. The separate preflight record-version test already passed with 0.1.1, so its pins stayed. The R2 edit completed its two repository writes, then encountered an owner-read-only scratch mutation helper. Only that helper’s write permission and its private-symbol mutation strings were corrected. All 65 focused tests passed. The first full-run typecheck found TS2769 in the new manifest test. A separate self-fix commit validated the path and 64-digit digest before comparing bytes. The full run restarted from its first step. The later runtime halt and first resume determined which runs count. Frozen installs that changed the mode of packages/founder-act/src/main.ts were each followed by the specified checkout and a clean status check.

The initial tool report named the deferred namespace. Its individual tools became visible on catalog inspection and were then reported. One earlier raw authority-reading log, 037, retains a namespace suffix printed by the source. No exec input contained one of the six names of Addendum 2 B4. A baseline progress search had no matches. Exploratory timer-API lookups included an absent optional dependency directory and a no-match result. Neither was a test. Before the R1 and R2 commits each mutation was restored to the index, then the clean file was verified against the resulting commit.

Breaks 11 and 12 were made after the fourth commit and restored at f73b5649afff86b558978cb76d09132bc0a7396a. No break remains declined. The resumed typecheck and all added tests passed. The second halt is the existing whole-file pin outside B5 item 3. No tracked edit or new commit was made during this resumption. The opening build log is preserved. The signed resume requires its new facts in the completion section, which is still pending. No live call was made, no surface was run, no real provider key was used, no capability record was written and no request left the host other than any approved frozen-install downloads. The Founder’s B7 and B8 work, Phase 2 and the session-record check remain pending.

12. Single next decision

The Founder decides whether to authorize a digest-only update at test/phase3a/harness-separation.test.ts line 24 for the R1 registry bytes, SHA-256 6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4, and a resumed full run under the revised scope.
