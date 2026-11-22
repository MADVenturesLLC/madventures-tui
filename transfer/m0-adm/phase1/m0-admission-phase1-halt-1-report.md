FOUNDER_DECISION_REQUIRED

Offline admission build of madv-surface, Phase 1. DEC-20261121-02 and signed Addendum 1.

The runtime check immediately before the restarted head suite failed. Expected SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. Observed SHA-256 e2984124f1514e1e6bbda20adedbf07a02c443c6a5828853a15c7c7abf78e19f at /Users/michaeldaley/.bun/bin/bun. The check exited 1 before invoking the changed executable. No runtime change was made by the builder.

1. Identity and runtime

Governed Codex, OpenAI GPT-6. The exact model identifier, effort, service tier and session ID were not shown. The agent was /root in Default collaboration mode, role builder, actor session:codex/3b-m0-admission-r1, execution surface codex. The host context named zsh, 2026-11-21 and America/New_York. The filesystem was workspace-write with restricted network. The Founder identified approval as on-request and reported an empty MCP server list. A separate approval policy value and reviewer ID were not displayed.

The visible functions were wait, request_user_input, request_user_input_async, send_message_to_user_async and exec. The nested catalog included apply_patch, exec_command, write_stdin, clock__curr_time and the six names of Addendum 2 B4. The clock namespace exposed sleep. The collaboration namespace exposed followup_task, interrupt_agent, list_agents, send_message and wait_agent, in addition to its member among the six names of Addendum 2 B4. The deferred harness namespace exposed create_thread, create_worktree, fork_thread, get_worktree_creation_status, list_archived_threads, list_threads, list_worktrees, read_thread, send_message_to_thread, set_thread_archived, set_thread_title and wait_threads. The additional top-level function send_message_to_user_async was reported and unused. The model record of DEC-20261112-02 B2 awaits the Founder's check.

The Founder’s pre-start MCP check is the source for the empty server list. The first report listed the visible namespaces and the extra async messaging tool. The individual deferred names became visible when the harness catalog was inspected later. I called only functions.exec, its exec_command and write_stdin, and functions.wait. No barred tool was called, no command or exec input contained one of the six names of Addendum 2 B4, and no exec input evaluated stored or string-loaded code. The Founder’s independent session-record check is pending.

logs/001-cli-version.log  SHA-256 4177ccbd71226a743f8d562eb04ac791599205ce83fb0fb082893afec986f2f0

14:31  8 users, load averages: 1.60 2.55 2.55  exit=0

WARNING: proceeding, even though we could not create PATH aliases: Operation not permitted (os error 1)
codex-cli 0.167.0

logs/005-user-name.log  SHA-256 c8236b701e2cd8fa2f88faf7997e82486acb0f9547d104f6e0b70b7b7e77ce62

14:31  8 users, load averages: 1.47 2.51 2.53  exit=0

daley40-lab

logs/006-user-email.log  SHA-256 4249d689e095e6781ce42f7c27ed6d2cfb1162ff72c3da3f379702664c737285

14:31  8 users, load averages: 1.47 2.51 2.53  exit=0

293512385+daley40-lab@users.noreply.github.com

logs/007-runtime.log  SHA-256 1f36c92027e3092358d7bc85c5322dbf1b0fab0bbfcdc3213e05ea438322c425

14:31  up  5:59, 8 users, load averages: 1.46 2.47 2.52  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/047-baseline-runtime.log  SHA-256 7e64125fca3d2b20f594b5a030934b58927d5cf304b05add00f69035816a27f8

14:38  up  6:05, 8 users, load averages: 1.41 1.75 2.14  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/055-baseline-suite-runtime.log  SHA-256 8a8698a19fad5f5ece629af1e0e9cbdbb59868e02dad42f46b2cb5bbcaa93520

14:40  up  6:08, 8 users, load averages: 1.36 1.55 1.99  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/085-r1-runtime.log  SHA-256 d9548863ffcec2cc41b4487b62439ba6957ecfa00628a467f1e6f4894e5b7234

17:07  up  8:34, 4 users, load averages: 6.44 2.67 1.95  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/110-break-1-runtime.log  SHA-256 74140c43ba313761c284effc9d6b1b69548bbc33c6cd68e7a8ac7e77816d8dd7

17:34  up  9:01, 4 users, load averages: 3.47 2.39 2.19  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/116-break-2-runtime.log  SHA-256 470c9a715951bc2cd49afc441e9568e9d2499391c1abb3edd44d45e91ce2a0de

18:30  up  9:58, 5 users, load averages: 2.59 2.58 2.65  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/131-r2-runtime.log  SHA-256 37a7266d8af5cd59e1c4b892869536bc2912e6ff6e81cfd7963e5efab29e4b7e

19:30  up 10:58, 5 users, load averages: 6.85 4.38 2.88  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/141-break-3-runtime.log  SHA-256 0ad35e2b3493ac82a40490baca1d4ed341c3531b1240e856b8ffaec4bf6fad03

20:02  up 11:30, 7 users, load averages: 1.74 1.60 1.80  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/147-break-4-runtime.log  SHA-256 f55dac7839cf59cd8183496ee8ae03be09ec9e9347c05650195bc0cb76d5e8d0

20:03  up 11:30, 7 users, load averages: 1.76 1.61 1.80  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/153-break-5-runtime.log  SHA-256 1d605e89a28f8ff471c6fb1a1241376c2d6c171a4392227f5fcf97294f8b9d46

20:03  up 11:30, 7 users, load averages: 1.86 1.63 1.81  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/159-break-6-runtime.log  SHA-256 1d605e89a28f8ff471c6fb1a1241376c2d6c171a4392227f5fcf97294f8b9d46

20:03  up 11:30, 7 users, load averages: 1.86 1.63 1.81  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/165-break-7-runtime.log  SHA-256 66c939f40129c1e86ff44498e903091b09c05b18f897881f8a8174d9b5241e26

20:03  up 11:30, 7 users, load averages: 1.71 1.60 1.80  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/177-r3-runtime.log  SHA-256 9174e6a2bfc15e679a1ccaf8b73fff0f35aa33e55c3affd18caaae8693fd4564

20:06  up 11:34, 8 users, load averages: 2.10 2.21 2.04  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/183-break-8-runtime.log  SHA-256 7c841ee430321137bdf3b0aa777dda83434d60eec621d157e309aa8595244fc3

20:09  up 11:37, 8 users, load averages: 1.41 1.91 1.94  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/193-break-9-runtime.log  SHA-256 0980a76c72c4fdad856bbb462889e412c2b04d3da9bfd154dbc80e09d3bef454

20:13  up 11:41, 8 users, load averages: 1.42 1.85 1.91  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/203-break-10-runtime.log  SHA-256 d05179b109195f64976d9be9f0fceb3d8e35fa1905f9ce344c25ec6647390eb1

20:14  up 11:41, 8 users, load averages: 1.30 1.79 1.89  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/225-full-runtime.log  SHA-256 cbe4a08738ed8f0b29dff8d8a54da933890f411247fbeddbd966478c051c06c5

20:15  up 11:42, 8 users, load averages: 1.16 1.66 1.83  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/244-repeat-runtime.log  SHA-256 7477bc0db407a1e1867a138ec101e200d5b384622ce47538ba06b57224ae9b86

20:20  up 11:48, 8 users, load averages: 1.88 1.77 1.82  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/253-repeat-suite-runtime.log  SHA-256 235cb6ddea4d8b0dc42cc82febe211aafc94cdc0d0e4af89f04ecf3135e8aba4

20:36  up 12:04, 8 users, load averages: 4.32 3.79 2.96  exit=1

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
e2984124f1514e1e6bbda20adedbf07a02c443c6a5828853a15c7c7abf78e19f  /Users/michaeldaley/.bun/bin/bun

The last check returned before the version and revision commands. Their values for the changed binary are unknown.

2. Workspace and preconditions

Working directory /Users/michaeldaley/builds/m0-admission-r1. Branch build/3b-m0-admission-r1. Starting HEAD 0678bd4412d5aaed963ae20f101959bd92f79811. Halt HEAD f73b5649afff86b558978cb76d09132bc0a7396a. Binding base 403a9f536539b96115aa44ab82436fe55d95b739.

Precondition 1 passed. Cached origin/main was the starting HEAD. Binding base was its first parent and ancestor. The diff contained only docs/decisions/DEC-20261121-02-madv-surface-admission.md. No stash or tracked changes. No corresponding origin build branch. The build log, investigation packet and new recorded folder were absent. The Founder reported empty output directories at launch. The later inventory found this session’s logs and empty pr and record directories.

logs/015-ancestry.log  SHA-256 58b5c2f4eb1128b0f6f4a38c012d9512dd805adbc1af1ca6a62be543b498d740

14:32  8 users, load averages: 1.62 2.38 2.48  exit=0

0678bd4412d5aaed963ae20f101959bd92f79811
403a9f536539b96115aa44ab82436fe55d95b739
docs/decisions/DEC-20261121-02-madv-surface-admission.md

logs/016-checkout.log  SHA-256 7e77d470cddad0a1c5f2fa4ab319339fbf9bb66466c0bba2ccb3cd328c302c39

Precondition 2 passed. Forty authority inputs matched their expected digests. Signed acts and the signed addendum have issued status. Prompt and release manifests passed, including complete coverage of the release export.

logs/019-authority-check.log  SHA-256 a5986336fafb9c789b3816f2d64dc10663d22625027ac3104e9287f3926cd8e4

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

logs/013-prompt-digests.log  SHA-256 c1072cb93c48fbc96feeef0ebecaaa2d7a08ab4fc5d94f706a1cc4c6e57d45b6

14:32  8 users, load averages: 1.62 2.38 2.48  exit=0

builder-prompt-m0-admission-codex-macbook.md: OK
DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md: OK
m0-record-r3.ts: OK

logs/014-release-digests.log  SHA-256 6d2d9887291fe0fdaa51417d51153055f45a2c05a5279b240595ca7c4d73fba3

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

Precondition 3 passed. The registration is at adapter-registry.ts lines 78–103. In the adapter index the context is at 6–13, constructor 85–88, push 106–120, first init 138–146, responses 147–158, finish 179–199, identity 201–205 and auth 206–216. In attestation.ts the constants are at 47–50, dispatch and deadlines at 90–91, 155–165 and 168–173. Environment lines 15–29 describe the madv-surface set. README lines 13 and 15 describe --no-tools and unexpected_tool_call, agent.ts lines 166 and 320 supply the init tools and the provider error. Full original line-numbered evidence is listed below. The opening build log quotes the selected lines.

logs/021-implementation.log  SHA-256 d9a39819f960941ac7c8d6faf5c45d6781858b8a8160168c6fcd5eaf0992eaa3

logs/022-recorded-tests.log  SHA-256 9baa8e3f96d13323540edf913728b90382738a675dab7c9bf119028987bd3a42

logs/023-registration.log  SHA-256 41d5e4bdc0e084c3bb88208f650370b6f9393796ef9ea3222758cb2472ec33d3

logs/024-supervisor.log  SHA-256 30918564b96df34280772f4ec8ebdc39feb917c3ee30cdb4cd3d29c235f08222

logs/025-env.log  SHA-256 c568c2fec014e2c5fdbaac2989ddbeb8edd2f77665f84af2bda2616139193023

logs/026-base-tests.log  SHA-256 e6c6bef4bbd3384766c0185bca6a74468db03d25d6c397791f01b9935a9969b2

logs/029-release-behavior.log  SHA-256 3d71d78d017f91e732eee940d47d2a807322a324c5d0dc37862735c4a6baaa1a

logs/030-fixture-manifest.log  SHA-256 27921c929f74105c664835676c6353a40d0665e35682007ef8be6aacad875b70

Manifest header

fixture	sha256	evidence_path	json-account-identifiers	email-addresses	token-patterns	uuid

Precondition 4 passed. Thirty indexed fixture files, complete path inventory.

logs/032-fixture-check.log  SHA-256 42f75db7be9474025ca77ff257c1f7c26aa5be690274502716c07daab40c7f45

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

Precondition 5 passed. Git grep results and all three record-reader calls at 168, 169 and 174 are in the following logs.

logs/033-consumers.log  SHA-256 cfa29d8391740c3d84b48b0b4fe96cfa73f635930a508e1594a2334f8435246c

logs/044-all-callers.log  SHA-256 254f8fefd7b1f7cc5f421542e2b1b309c6fa0aca4132119d23f6620d09b497e5

bun.lock
packages/adapter-madv-surface/package.json
packages/adapter-madv-surface/src/index.ts
packages/adapter-madv-surface/test/parser.test.ts
packages/adapter-madv-surface/test/recorded.test.ts
packages/supervisor/package.json
packages/supervisor/src/attestation.ts
packages/supervisor/test/madv-preflight.test.ts
packages/supervisor/test/madv-probes.test.ts
tsconfig.json

Precondition 6 passed.

logs/017-host.log  SHA-256 3f21e453d4eb497d8e6419ad7e9553e77f06fbc3570b7d5551d921845383f9fb

14:32  8 users, load averages: 1.62 2.38 2.48  exit=0

Darwin arm64

Precondition 7 passed. See the baseline below.

3. Baseline

The first frozen install changed only the executable bit on packages/founder-act/src/main.ts. Git checkout restored it. The lockfile SHA-256 was a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830 before and after.

logs/035-base-lock.log  SHA-256 338f056f0f3693e0f0e9776e5e3c06ed72c034ebbd27cd90fb7e82551026cd9a

14:33  8 users, load averages: 1.32 2.12 2.38  exit=0

a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock

logs/047-baseline-runtime.log  SHA-256 7e64125fca3d2b20f594b5a030934b58927d5cf304b05add00f69035816a27f8

14:38  up  6:05, 8 users, load averages: 1.41 1.75 2.14  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/048-baseline-install.log  SHA-256 4aa8521e67c060aeffba46a9333e7920deee70d2fe645badf918e03fb631a1f9

14:40  up  6:07, 8 users, load averages: 0.98 1.49 1.98  exit=0

The named log preserves the verbatim output, including square brackets or a diff separator.

logs/049-baseline-lock.log  SHA-256 75edbd4be13626f07c47ee8918de90a81baddc78fe2692b0cfdd9663f8eec390

14:40  8 users, load averages: 1.06 1.50 1.98  exit=0

a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock

logs/050-install-tree.log  SHA-256 048ee6a5d17fd305fe35bb75793dd9e35dc91da296510c4bf16fa021786ca7b6

14:40  8 users, load averages: 1.06 1.50 1.98  exit=0

mode change 100644 => 100755 packages/founder-act/src/main.ts

logs/052-restore-install-mode.log  SHA-256 1e5f05198ff7991bbc4193848f57d7fac603eba2ba3b2decd3bf7d95449ab97e

14:40  8 users, load averages: 1.37 1.56 2.00  exit=0

logs/053-restored-install-status.log  SHA-256 f40927db56752d939f2edb5650adc0feced72d35e9391b045e2074613590da7f

14:40  8 users, load averages: 1.37 1.56 2.00  exit=0

logs/054-baseline-typecheck.log  SHA-256 c3e574a48e6317385c4073746305410ea654d419e684c518986f0932b2a7eb8f

14:40  up  6:08, 8 users, load averages: 1.34 1.55 1.99  exit=0

logs/055-baseline-suite-runtime.log  SHA-256 8a8698a19fad5f5ece629af1e0e9cbdbb59868e02dad42f46b2cb5bbcaa93520

14:40  up  6:08, 8 users, load averages: 1.36 1.55 1.99  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/056-baseline-wait.log  SHA-256 09d5641b26801da98f8e8b0757712ea01d71b746f894e7482e7b7589841bc82c

14:40  8 users, load averages: 1.36 1.55 1.99  exit=0

14:40  8 users, load averages: 1.36 1.55 1.99

logs/057-baseline-suite.log  SHA-256 4d249629ce62ce478b4d581332645acee24271f00fe97e104e8096e03c17b39d

14:40  up  6:08, 8 users, load averages: 1.50 1.57 1.99  exit=0

2027 pass
 0 fail
 27336 expect() calls

Bun reported 2027 tests across 147 files in 184.07 seconds. The verbatim timing-bearing final line is in logs/057-baseline-suite.log  SHA-256 4d249629ce62ce478b4d581332645acee24271f00fe97e104e8096e03c17b39d. Each result was present. The timing-free list contains 2027 passing entries across 147 files.

logs/071-base-list.log  SHA-256 40c337b7b22cebbc7dff8783392e36a7e7670b3c805f0a7ab2081be52a2c4a52

4. Requirements and deliberate breaks

### R1 · registration and pinned callers

Change supported_versions and identity_probe.argv in packages/protocol/src/adapter-registry.ts. Add “madv-surface 0.1.2 reserves --no-tools for the identity probe” to packages/protocol/test/adapter-registry.test.ts. Spell out the eleven launch arguments independently. Check the version, both vectors and the absence of --no-tools from launch. Run the existing registry, madv-probes and madv-preflight tests against the new registration. Update only the version or argument values that cause an existing assertion to fail. Break 1 removes the probe flag. Break 2 adds it to launch.

### R2 · probe and launch evidence

In packages/adapter-madv-surface/src/index.ts, use an optional boolean on MadvContext. This passes the production parseMadvIdentity caller's intent into the shared state machine while preserving the constructor and function signatures. The probe sets it in its own code. A launch uses the existing default. Check the init tool array after the existing init predicates. Require a non-empty response_id with the response predicates, after the model, Anthropic and family checks. Match claude or anthropic anywhere, case-insensitively.

Append three cases to packages/adapter-madv-surface/test/parser.test.ts, reusing its synthetic stream builders. Their names are “identity requires an empty tool array while a governed launch accepts tools”, “probe and launch require a non-empty string response_id on every response” and “Claude and Anthropic ids are refused before family resolution”. Collect the causes for all six ids in one assertion. In recorded.test.ts exercise both parser entry points for MacBook 04, 05 and 06 and Ubuntu 04 and 06, preserving version 0.1.1. Use the name “HOST NN recorded tools fail probe identity and pass a governed launch”. Check the other captures against the parser's existing cause precedence. Breaks 3–7 disable the probe guard, apply it to launches, accept missing response_id, restore the old Anthropic expression and remove the anthropic alternative.

### R3 · supervisor behavior and fixture integrity

Add packages/supervisor/test/madv-intervals.test.ts with “madv-surface identity keeps 500 ms grace and 1000 ms cleanup” and the corresponding auth case. Control the probe clock and spawned process through ProbeRuntime. Observe SIGTERM, SIGKILL and completion against fake timer deadlines. Add “madv-surface-v1 selects exactly the B6 variable set” in packages/supervisor/test/madv-allowlist.test.ts. Supply a synthetic value for every variable the selector asks for, including any new name, then compare the selected keys as a set. Add “recorded manifest covers every fixture and matches its SHA-256” in packages/adapter-madv-surface/test/fixture-integrity.test.ts. Walk the recorded directory, compare relative paths in both directions, reject duplicate manifest rows and hash each file's original bytes. Phase 1 covers M0's folder.

Breaks 8 and 9 shorten only the madv-surface timing budgets. Break 10 adds an optional variable to its list. The earlier probe and environment files run separately under their breaks. Break 11 is declined under B4. Both existing environment suites already assert that LC_CTYPE survives when supplied, so they cannot pass the requested removal. Break 12 is declined under B4. With the new init predicate, Ubuntu 05 fails identity at init, its ordinary result event is ignored after failure, and exit 1 supplies provider_error. Changing exit to 0 removes that cause, so the existing recorded test cannot pass under the break. The Founder retains both breaks at the final commit.

### R4 · scratch record reader

Copy the supplied M0 script to record/m0-admission-record.ts. Replace only the madv-surface path, both release hashes and the two version pins. Delete only the one-turn exception, its auxiliary checks and its limitation. Require a clean exit for capture 07. Compare the full source and unified diff. Run eight synthetic MacBook folders using the head's registration, with no write option. Check a passing folder, unexpected_tool_call, the retired turn-limit exception, a retired-model echo, tools in capture 04, the old version, the old hash and a manifest mismatch. The last three must exit with a refusal. The first four negative identity cases must print failed identity and overall results.

R1 changes the madv-surface registration. Of its existing pins, only the registry expectation and the shared synthetic init version required edits. The preflight test passed with its existing pin.

R2 uses a module-private symbol on MadvContext set only by parseMadvIdentity. It checks the empty init array only for a probe. Both entry points require non-empty string response ids and apply the six-id refusal rule. Only the five affected recorded success cases and their import changed. The prior causes for Ubuntu 05 and all 07 cases still pass.

R3 uses the runtime clock, signals and stream cancellation for both probe kinds, an ambient proxy returning a synthetic value for every requested name, and a complete directory walk with manifest and byte checks.

R4 was pending at the runtime halt. No scratch admission reader was created or run.

logs/087-r1-pins.log  SHA-256 86e6e532b38fa6aa11770ba5356d2d2f179c13c4a86aa358c56ff586f54b8169

17:15  up  8:42, 4 users, load averages: 1.30 1.67 1.74  exit=1

20 pass
 4 fail
 210 expect() calls

logs/092-r1-tests.log  SHA-256 6884c6ca9db2738141f6dee8b8d00cef49162b500078ba67f08b4a7e58253f36

17:20  up  8:48, 4 users, load averages: 1.55 2.47 2.18  exit=0

24 pass
 0 fail
 227 expect() calls

logs/133-r2-tests.log  SHA-256 e5fed9cd240ef34aa8e1291cc01533a9fc5f89f86a7e86998ebd08ccbb8dff52

19:35  up 11:03, 5 users, load averages: 1.75 3.19 2.80  exit=0

65 pass
 0 fail
 303 expect() calls

logs/179-r3-tests.log  SHA-256 0a4da030510c9e98f923ed29e600421db265d30643f7fffa468dfb2ca560d1ef

20:07  up 11:34, 8 users, load averages: 1.34 2.01 1.98  exit=0

4 pass
 0 fail
 71 expect() calls

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

Break 1

Verbatim diff

logs/109-break-1-diff.log  SHA-256 1a9bfaae38b31ebd02a7ada50c4a360c947ab6851c8c5b50fe16bec90e8ff573

The full failing run, including the diff in the assertion, is in logs/112-break-1-tests.log  SHA-256 f1b0fe1cd6de4c6661e3ddd87471772e79090f9d94a74c3d3cbcefbb7be93952. Individual results follow with timings removed.

(pass) registry values are stored already normalized
(pass) the registry contains exactly the three Founder-ratified surfaces
(pass) claude-code registration matches the PLAN-OPEN-1 ruling field for field
(pass) antigravity registration matches the PLAN-OPEN-1 ruling field for field
(pass) registry entries and the registry are deeply frozen
(pass) lookupRegistration returns the ratified entry and undefined for a syntactically valid unregistered surface
(pass) registry membership cannot be mutated at runtime
(fail) madv-surface registration matches DEC-20261115-02 field for field
(fail) madv-surface 0.1.2 reserves --no-tools for the identity probe

7 pass
 2 fail
 62 expect() calls

logs/114-break-1-restore.log  SHA-256 d16bcc0cf9fb1298e71e9f38024e81999e7fcafb5ae0896ca75508edd24a9d8f

17:36  4 users, load averages: 1.92 2.26 2.16  exit=0

6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4  tui/packages/protocol/src/adapter-registry.ts
6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4  -

Clean status and committed byte comparison

logs/123-registration-proof.log  SHA-256 15308c2beb230f6f76900150cdd634d38c786c5492e020d00d740d7ecae2dfbc

Break 2

Verbatim diff

logs/115-break-2-diff.log  SHA-256 5e7f3053b5a2e60da8dc97073f50b0fcc6af7ec70d5dc23a22216cb579bc423a

The full failing run, including the diff in the assertion, is in logs/118-break-2-tests.log  SHA-256 e09635e00f056a9bd028c79ea7d9e8ee9c37743b34e848b19a63deef722b3ff2. Individual results follow with timings removed.

(pass) registry values are stored already normalized
(pass) the registry contains exactly the three Founder-ratified surfaces
(pass) claude-code registration matches the PLAN-OPEN-1 ruling field for field
(pass) antigravity registration matches the PLAN-OPEN-1 ruling field for field
(pass) registry entries and the registry are deeply frozen
(pass) lookupRegistration returns the ratified entry and undefined for a syntactically valid unregistered surface
(pass) registry membership cannot be mutated at runtime
(fail) madv-surface registration matches DEC-20261115-02 field for field
(fail) madv-surface 0.1.2 reserves --no-tools for the identity probe

7 pass
 2 fail
 60 expect() calls

logs/120-break-2-restore.log  SHA-256 24890aa40811ec4cc17423cb045aa6783208485678a34b887b4cac9d8bcd1141

18:32  5 users, load averages: 1.39 2.26 2.52  exit=0

6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4  tui/packages/protocol/src/adapter-registry.ts
6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4  -

Clean status and committed byte comparison

logs/123-registration-proof.log  SHA-256 15308c2beb230f6f76900150cdd634d38c786c5492e020d00d740d7ecae2dfbc

Break 3

Verbatim diff

logs/140-break-3-diff.log  SHA-256 45229ff474852fced53c4171036995986c19d36d1ed4b4a3df28becbc1fb38e7

The full failing run, including the diff in the assertion, is in logs/143-break-3-tests.log  SHA-256 2b385f5538064cbfc0e9b9491fc15fd843f910950a4a1baaab2c6f851502be1c. Individual results follow with timings removed.

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

52 pass
 1 fail
 237 expect() calls

logs/145-break-3-restore.log  SHA-256 ae238cbd4b26788e19e9973698ecfcfd351c9fe672a250cccff344fcd65103a8

20:03  7 users, load averages: 1.76 1.61 1.80  exit=0

6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts
6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  -

Clean status and committed byte comparison

logs/171-parser-proof.log  SHA-256 78272ad12db3b211dc818decfd8e5960dd2d94f78a2234ccbbca6c8aa45a1c5b

Break 4

Verbatim diff

logs/146-break-4-diff.log  SHA-256 161ccda8215a088607264736a40058b9d982a58dc9fac3392c6998432d38543a

The full failing run, including the diff in the assertion, is in logs/149-break-4-tests.log  SHA-256 bf8c0f0ffa462fa86add45e5a4e27800092b8c05ee9323c9b2c93435866cef56. Individual results follow with timings removed.

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

52 pass
 1 fail
 243 expect() calls

logs/151-break-4-restore.log  SHA-256 663654d86cd76b987b56faebe2801b9d071ec885083e53988e1f81bdda5dc587

20:03  7 users, load averages: 1.86 1.63 1.81  exit=0

6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts
6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  -

Clean status and committed byte comparison

logs/171-parser-proof.log  SHA-256 78272ad12db3b211dc818decfd8e5960dd2d94f78a2234ccbbca6c8aa45a1c5b

Break 5

Verbatim diff

logs/152-break-5-diff.log  SHA-256 822f21b4ec0cfdbe545a334229099967b6e387957ba1fb5f2ccfcfd3bc704e7b

The full failing run, including the diff in the assertion, is in logs/155-break-5-tests.log  SHA-256 cf0b0ca60e61019b2b7551927694b4829651b701acc1ce58d61dd6751b9bec35. Individual results follow with timings removed.

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

52 pass
 1 fail
 228 expect() calls

logs/157-break-5-restore.log  SHA-256 697f9cec05d51d344bf3be1121f3d6876b3da874a2a6f21560d95eb0b13b4899

20:03  7 users, load averages: 1.86 1.63 1.81  exit=0

6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts
6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  -

Clean status and committed byte comparison

logs/171-parser-proof.log  SHA-256 78272ad12db3b211dc818decfd8e5960dd2d94f78a2234ccbbca6c8aa45a1c5b

Break 6

Verbatim diff

logs/158-break-6-diff.log  SHA-256 eea99e0674e0e0b9082ee1ace5d107017b4d4d0de0a153902782c607263547f5

The full failing run, including the diff in the assertion, is in logs/161-break-6-tests.log  SHA-256 ce916395de21825e415368597c1c95a5b8366996db8a649ae1719a3865e8af82. Individual results follow with timings removed.

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

52 pass
 1 fail
 243 expect() calls

logs/163-break-6-restore.log  SHA-256 b1bcff7d9b9f2c071bd5efa5344ab312d02f864e5839294b63af28a8c5bdc0ee

20:03  7 users, load averages: 1.71 1.60 1.80  exit=0

6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts
6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  -

Clean status and committed byte comparison

logs/171-parser-proof.log  SHA-256 78272ad12db3b211dc818decfd8e5960dd2d94f78a2234ccbbca6c8aa45a1c5b

Break 7

Verbatim diff

logs/164-break-7-diff.log  SHA-256 d759d490e2a69849f732d3285dd00d5d1c6b6a5d26fa56937c63e8cc7b9f408e

The full failing run, including the diff in the assertion, is in logs/167-break-7-tests.log  SHA-256 1c54e0ce6b24402e05352454b9e55a3473b3a08367ebb453ed3154436071d657. Individual results follow with timings removed.

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

52 pass
 1 fail
 243 expect() calls

logs/169-break-7-restore.log  SHA-256 1a172899a6196df44ed5f53603a471f02640b2fa471b99c2d19f1e9a0f277815

20:03  7 users, load averages: 1.71 1.60 1.80  exit=0

6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts
6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  -

Clean status and committed byte comparison

logs/171-parser-proof.log  SHA-256 78272ad12db3b211dc818decfd8e5960dd2d94f78a2234ccbbca6c8aa45a1c5b

Break 8

Verbatim diff

logs/182-break-8-diff.log  SHA-256 47351dce6fc8564dc803f75f4a4238abd108134d1a614c0076bc652f478654dd

Earlier suite under the mutation

logs/185-break-8-old.log  SHA-256 f0c76c1e2d15761fb7b0359e1aa819bbf0704740e756a201a5be4d5b60fce51e

(pass) dispatch keeps Claude probes and input unchanged
(pass) madv-surface identity continues beyond init to natural exit
(pass) registration chooses 30 seconds beside Claude's 5 seconds
(pass) madv-surface identity failures map to identity_mismatch
(pass) madv-surface auth failures map to auth_not_ready
(pass) madv-surface keeps both raw stream limits and metadata-only diagnostics
(pass) madv-surface pre-spawn cancellation and spawn failure fail closed
(pass) madv-surface cancellation retains bounded cleanup and reaping

8 pass
 0 fail
 124 expect() calls

Earlier suite under the mutation

logs/187-break-8-related.log  SHA-256 6669f04b5b96b5b8232b751f3164b234192f2db57d5e1d081f8f0bb31948cc49

(pass) identity accepts an exact model and supported CLI version
(pass) identity rejects a model mismatch
(pass) identity rejects a missing system/init event
(pass) identity rejects an unsupported CLI version
(pass) identity uses only the first system/init event and fixed stdin
(pass) identity ends a continuing session through bounded cleanup
(pass) successful bounded execution
(pass) spawn failure is bounded and fail closed
(pass) pre-spawn cancellation starts no child
(pass) post-spawn cancellation reaps within the cleanup budget
(pass) signal termination fails closed
(pass) stdout overflow fails closed
(pass) stderr overflow fails closed
(pass) exactly 65,536 bytes on either stream is permitted
(pass) execution deadline includes normal reaping
(pass) timeout uses a monotonic clock and forced SIGKILL
(pass) forced cleanup accounts for grace escalation and reaping
(pass) cleanup budget exhaustion fails closed
(pass) auth parsing occurs only after clean exit and reaping
(pass) malformed JSON and every incorrect auth predicate fail closed
(pass) diagnostics contain only metadata on success and every failure

21 pass
 0 fail
 224 expect() calls

The full failing run, including the diff in the assertion, is in logs/189-break-8-tests.log  SHA-256 a2ca45f3a9e590275784372db8c3f3b4b984be6859dcb3d5a2b3b865f54dc088. Individual results follow with timings removed.

(fail) madv-surface identity keeps 500 ms grace and 1000 ms cleanup
(fail) madv-surface auth keeps 500 ms grace and 1000 ms cleanup

0 pass
 2 fail
 4 expect() calls

logs/191-break-8-restore.log  SHA-256 f06dddd9ca9b389aca0bc8683ea4413041ff124bd3679414318b6800677ff9ec

20:13  8 users, load averages: 1.64 1.91 1.94  exit=0

d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  tui/packages/supervisor/src/attestation.ts
d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  -

Clean status and committed byte comparison

logs/222-interval-allowlist-proof.log  SHA-256 32c05c4b510e016729725add961b98654d393d91ef0ad35d5767ad81e49130cd

Break 9

Verbatim diff

logs/192-break-9-diff.log  SHA-256 9d666a8815f810044558a3b44f6bf1c6060c8540d9dbc87b106212131e61c1e9

Earlier suite under the mutation

logs/195-break-9-old.log  SHA-256 f97b1a064d46c856f046f7631ef177ca011d8b937f3a5805b9a7bb398847fa0b

(pass) dispatch keeps Claude probes and input unchanged
(pass) madv-surface identity continues beyond init to natural exit
(pass) registration chooses 30 seconds beside Claude's 5 seconds
(pass) madv-surface identity failures map to identity_mismatch
(pass) madv-surface auth failures map to auth_not_ready
(pass) madv-surface keeps both raw stream limits and metadata-only diagnostics
(pass) madv-surface pre-spawn cancellation and spawn failure fail closed
(pass) madv-surface cancellation retains bounded cleanup and reaping

8 pass
 0 fail
 124 expect() calls

Earlier suite under the mutation

logs/197-break-9-related.log  SHA-256 a88e60a6648e757d032532917b00b3ec694beb702e3bde1fb989a6ff979604f2

(pass) identity accepts an exact model and supported CLI version
(pass) identity rejects a model mismatch
(pass) identity rejects a missing system/init event
(pass) identity rejects an unsupported CLI version
(pass) identity uses only the first system/init event and fixed stdin
(pass) identity ends a continuing session through bounded cleanup
(pass) successful bounded execution
(pass) spawn failure is bounded and fail closed
(pass) pre-spawn cancellation starts no child
(pass) post-spawn cancellation reaps within the cleanup budget
(pass) signal termination fails closed
(pass) stdout overflow fails closed
(pass) stderr overflow fails closed
(pass) exactly 65,536 bytes on either stream is permitted
(pass) execution deadline includes normal reaping
(pass) timeout uses a monotonic clock and forced SIGKILL
(pass) forced cleanup accounts for grace escalation and reaping
(pass) cleanup budget exhaustion fails closed
(pass) auth parsing occurs only after clean exit and reaping
(pass) malformed JSON and every incorrect auth predicate fail closed
(pass) diagnostics contain only metadata on success and every failure

21 pass
 0 fail
 224 expect() calls

The full failing run, including the diff in the assertion, is in logs/199-break-9-tests.log  SHA-256 2295efb3b43b147032434bd1685c30da47fbd1dbb9593005bf0a806c38c40181. Individual results follow with timings removed.

(fail) madv-surface identity keeps 500 ms grace and 1000 ms cleanup
(fail) madv-surface auth keeps 500 ms grace and 1000 ms cleanup

0 pass
 2 fail
 2 expect() calls

logs/201-break-9-restore.log  SHA-256 41552b53f210caefb677ce758f5e27aa2fe57a038c5eec4ea66d9a83a3d21450

20:14  8 users, load averages: 1.42 1.83 1.90  exit=0

d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  tui/packages/supervisor/src/attestation.ts
d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  -

Clean status and committed byte comparison

logs/222-interval-allowlist-proof.log  SHA-256 32c05c4b510e016729725add961b98654d393d91ef0ad35d5767ad81e49130cd

Break 10

Verbatim diff

logs/202-break-10-diff.log  SHA-256 104c854cd6130e6179bae6b6f00b9c432ef1845047674176a0b8f4d843c079b9

Earlier suite under the mutation

logs/205-break-10-old.log  SHA-256 748e9cb434427063a5929783189c2d1ee036cd27d64ffad7c2261c4d89409c8b

(pass) madv-surface-v1 has exactly the approved variables
(pass) madv-surface-v1 requires exactly the six required variables
(pass) madv-surface-v1 drops state, overrides and unlisted variables
(pass) madv-surface redacts its synthetic canary

4 pass
 0 fail
 38 expect() calls

Earlier suite under the mutation

logs/207-break-10-related.log  SHA-256 32601307dae0fae5a12a3dee820c155c8b86544716b8174ce490b3af59d48adb

(pass) no ambient variable outside the allowlist survives
(pass) a missing required allowlisted variable is a typed failure
(pass) secret-marked values are redacted from diagnostics while their names are retained
(pass) redaction reports which rules ran
(pass) the same registration produces byte-identical environments on repeated calls

5 pass
 0 fail
 7286 expect() calls

The full failing run, including the diff in the assertion, is in logs/209-break-10-tests.log  SHA-256 322d5a22adf603162a9201c87ba8f658e20d63e9e3389dffc0cb539227630d0d. Individual results follow with timings removed.

(fail) madv-surface-v1 selects exactly the B6 variable set

0 pass
 1 fail
 2 expect() calls

logs/211-break-10-restore.log  SHA-256 5e1b3fa1727cad99ba5caa07c472b32ec0428ec7eb60b6d20a4c88848169ebad

20:14  8 users, load averages: 1.28 1.78 1.89  exit=0

8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  tui/packages/supervisor/src/environment.ts
8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  -

Clean status and committed byte comparison

logs/222-interval-allowlist-proof.log  SHA-256 32c05c4b510e016729725add961b98654d393d91ef0ad35d5767ad81e49130cd

Break 11 declined under B4. Removing LC_CTYPE already fails the existing environment assertions, so the earlier suite cannot pass under that mutation.

Break 12 declined under B4. After R2 the Ubuntu 05 init fails the probe predicate. Changing its exit to zero removes the provider_error cause that its existing test expects. The Founder retains both breaks.

5. Existing test changes

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

Original registry test lines 132 and 134, probe fixture line 9, recorded import line 3 and recorded loop lines 36–38. The case names and authorization are in the table. The full unified diff, including the square-bracketed code, is in logs/259-halt-source-diff.log  SHA-256 9f9dcc0854558162d2a35faeef97c8967defc53a11880ddb60969f37b07cb021. M0 fixture bytes stayed unchanged.

6. Commits and attribution checks

logs/257-halt-commits.log  SHA-256 55e6b342ec65cb0c18728392446e2384d576563d69c477688ac849fa5cf5daa2

20:37  8 users, load averages: 3.24 3.58 2.91  exit=0

0d13ae88aeda22601cf19c6c81759b4e1d5b03a2 0678bd4412d5aaed963ae20f101959bd92f79811 docs(verification): open the admission build log with its task detail
6b45f9e7291f8a968c31b2748cd7a25cc71fecce 0d13ae88aeda22601cf19c6c81759b4e1d5b03a2 feat(protocol): admit madv-surface 0.1.2 with a tool-free probe
548acd1c9073bd0aa35b6adadaac30a39691b865 6b45f9e7291f8a968c31b2748cd7a25cc71fecce fix(adapter-madv-surface): probe init tools, response ids, Claude ids
9cd6709f1616c06411b9f90c3fb4bfc88c377b11 548acd1c9073bd0aa35b6adadaac30a39691b865 test: hold the probe intervals, the allowlist set and fixture bytes
f73b5649afff86b558978cb76d09132bc0a7396a 9cd6709f1616c06411b9f90c3fb4bfc88c377b11 test: require a fixture path and SHA-256 in each manifest row

logs/078-check-message-1.log  SHA-256 c61c6798d53c31e9fd1ced8b0eecf2a93ba75a3859cd0806bf8a04adaaef7a44

14:44  4 users, load averages: 2.44 1.96 2.06  exit=0

maximum line width 70
7:Role-Id: builder
8:Actor-Id: session:codex/3b-m0-admission-r1
9:Execution-Surface: codex

logs/094-check-message-2.log  SHA-256 95f38f9fe8ffb853a560a4786008e400aaa5afd064e442f0223a18d5c1eb4f7e

17:17  4 users, load averages: 5.17 2.77 2.15  exit=0

maximum line width 69
9:Role-Id: builder
10:Actor-Id: session:codex/3b-m0-admission-r1
11:Execution-Surface: codex

logs/135-check-message-3.log  SHA-256 5baec452fa85a3c66d0d261257e28ef58bb18c7f765e1344de2f6943e435842f

19:32  5 users, load averages: 5.38 4.34 3.05  exit=0

maximum line width 69
11:Role-Id: builder
12:Actor-Id: session:codex/3b-m0-admission-r1
13:Execution-Surface: codex

logs/181-check-message-4.log  SHA-256 c291200425782d0fdc15e0b5f13a621c69d9bb0b4d0047ba70320cc341273aca

20:06  8 users, load averages: 1.77 2.14 2.02  exit=0

maximum line width 70
9:Role-Id: builder
10:Actor-Id: session:codex/3b-m0-admission-r1
11:Execution-Surface: codex

logs/239-check-message-fix.log  SHA-256 3e8a4359231f044ecc1bbe66512a316b0a1fb48c06f5d68333aaca3e06fba3a9

20:15  8 users, load averages: 1.17 1.59 1.80  exit=0

maximum line width 70
8:Role-Id: builder
9:Actor-Id: session:codex/3b-m0-admission-r1
10:Execution-Surface: codex

7. Full run of Phase 1

Initial attempt at 9cd6709f1616c06411b9f90c3fb4bfc88c377b11. The frozen install preserved the lockfile and set the founder-act executable bit. The builder restored the mode. The typecheck then failed at load 1.17.

logs/225-full-runtime.log  SHA-256 cbe4a08738ed8f0b29dff8d8a54da933890f411247fbeddbd966478c051c06c5

20:15  up 11:42, 8 users, load averages: 1.16 1.66 1.83  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/226-full-lock-before.log  SHA-256 08eba044cd5e66c7164a64b03fdf0ab2dd3087ba61f14c11055dea0beb9b9001

20:15  8 users, load averages: 1.15 1.65 1.83  exit=0

a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock

logs/227-full-install.log  SHA-256 a4b431e495b4de010786f7d78ff2ad57aa3b442151eeae057e116145533ce5da

20:15  up 11:42, 8 users, load averages: 1.13 1.64 1.82  exit=0

The named log preserves the verbatim output, including square brackets or a diff separator.

logs/228-full-lock-after.log  SHA-256 0f248113de9ad3944d7d43ea3e2416b7b95dd05d587f87513f7bb021820c084c

20:15  8 users, load averages: 1.28 1.66 1.83  exit=0

a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock

logs/229-full-install-tree.log  SHA-256 355e66abefad79f88dddf64b6a7d3ee54e3e0ccb427f1edead5fc65fc74112a6

20:15  8 users, load averages: 1.28 1.66 1.83  exit=0

mode change 100644 => 100755 packages/founder-act/src/main.ts

logs/230-full-install-status.log  SHA-256 e9e420ffa95a44c19e38e686d66c5376db8e9d246d6431f6806e3df6aa78e6ad

20:15  8 users, load averages: 1.28 1.66 1.83  exit=0

M packages/founder-act/src/main.ts

logs/231-full-install-restore.log  SHA-256 0a23501396f4a40610175ef53fa2c987b486742da3a8f2df39100a324da9e76b

20:15  8 users, load averages: 1.17 1.62 1.81  exit=0

logs/232-full-restored-tree.log  SHA-256 6d74df02108b1de519cc25f0136f4046dda3ebee7e703a30da779b76f5f87962

20:15  8 users, load averages: 1.17 1.62 1.81  exit=0

logs/233-full-typecheck.log  SHA-256 96a941b7f78a28529fc921051ad5d7bdeb2d01de365d089863d983569423a876

20:15  up 11:43, 8 users, load averages: 1.17 1.62 1.81  exit=2

packages/adapter-madv-surface/test/fixture-integrity.test.ts(33,108): error TS2769: No overload matches this call.
  Overload 1 of 2, '(expected: { file: string; digest: string; }): void', gave the following error.
    Type 'string | undefined' is not assignable to type 'string'.
      Type 'undefined' is not assignable to type 'string'.
  Overload 2 of 2, '(expected: NoInfer<{ file: string; digest: string; }>): void', gave the following error.
    Type 'string | undefined' is not assignable to type 'string'.
      Type 'undefined' is not assignable to type 'string'.

The corrective commit added path and digest validation, including 64 lowercase hexadecimal digits. The full run restarted from its first step at f73b5649afff86b558978cb76d09132bc0a7396a.

logs/244-repeat-runtime.log  SHA-256 7477bc0db407a1e1867a138ec101e200d5b384622ce47538ba06b57224ae9b86

20:20  up 11:48, 8 users, load averages: 1.88 1.77 1.82  exit=0

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/245-repeat-lock-before.log  SHA-256 d24ddb7e34d23d4e979011863eb7a44c093982941acb6b9f0c84fe8c0cfd753f

20:20  8 users, load averages: 1.88 1.77 1.82  exit=0

a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock

logs/246-repeat-install.log  SHA-256 a2eab7ff569ea80ba0453bac35cad9c586af3e1822e70d0bc486ce446b631e29

20:20  up 11:48, 8 users, load averages: 1.88 1.77 1.82  exit=0

The named log preserves the verbatim output, including square brackets or a diff separator.

logs/247-repeat-lock-after.log  SHA-256 57aef6f09709014bd863b752cec3d5fa97a26ed95e8768adb9b23ebf6f798d5e

20:20  8 users, load averages: 2.19 1.85 1.85  exit=0

a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock

logs/248-repeat-install-tree.log  SHA-256 01c712384d919bdd45fcd53f0622fe2c3f76860c3613008095c8051b5ee4c5ed

20:20  8 users, load averages: 2.19 1.85 1.85  exit=0

mode change 100644 => 100755 packages/founder-act/src/main.ts

logs/249-repeat-install-status.log  SHA-256 5345c556358aee742afad91c92b8df7a4bb22151e8d507a1eab6a4251a715c98

20:20  8 users, load averages: 2.19 1.85 1.85  exit=0

M packages/founder-act/src/main.ts

logs/250-repeat-install-restore.log  SHA-256 c420e83374a1a75030ceb56e51903ce37de5ad28d7a5c6c3870cdfb3acfd3407

20:20  8 users, load averages: 2.19 1.85 1.85  exit=0

logs/251-repeat-restored-tree.log  SHA-256 6f2dec1021f88204da9ec972a3f3b9af478f43febbe24a9708591d238faea034

20:20  8 users, load averages: 2.19 1.85 1.85  exit=0

logs/252-repeat-typecheck.log  SHA-256 d008b82c8f1abf8fc5822e964cd6605710466f836fa3cda15c3af2e0a6f0bd87

20:28  up 11:55, 8 users, load averages: 2.57 2.05 1.91  exit=0

logs/253-repeat-suite-runtime.log  SHA-256 235cb6ddea4d8b0dc42cc82febe211aafc94cdc0d0e4af89f04ecf3135e8aba4

20:36  up 12:04, 8 users, load averages: 4.32 3.79 2.96  exit=1

/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
e2984124f1514e1e6bbda20adedbf07a02c443c6a5828853a15c7c7abf78e19f  /Users/michaeldaley/.bun/bin/bun

The restarted typecheck passed with no output. The following runtime check failed on the executable digest. The head suite, test comparison and subsequent full-run gates were not run. The code adds eight test cases in three new files, with five permitted renames. No head count was measured.

8. Diff at the halt

Full diffs cited by log retain original bytes. Every diff line quoted here has its trailing whitespace removed. Square-bracketed lines are cited by log under the report-format rule.

logs/258-halt-stat.log  SHA-256 e6c9121fcd47a268d3a1082029b31a66e0811bd66134a95abd63c35398eb9442

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

Full non-build-log diff

logs/259-halt-source-diff.log  SHA-256 9f9dcc0854558162d2a35faeef97c8967defc53a11880ddb60969f37b07cb021

logs/259-halt-source-diff.log  SHA-256 9f9dcc0854558162d2a35faeef97c8967defc53a11880ddb60969f37b07cb021

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

9. Scratch record script

The record directory was empty at the halt. No R4 script, script hash, diff, synthetic result or Linux run exists for this build.

logs/261-halt-record-dir.log  SHA-256 26135908b3622f83b0b5bfa6411badb42f1e824b530c6684f8f0165f490e30f3

10. Artifact hashes and attribution

Opening build log SHA-256 cad21988bd927d480f558c046d15f3b03b4f47a4fc1c9547a46b485b6aeb96aa. Its Phase 1 completion section remains pending. The halt report’s own SHA-256 is detached and returned to the Founder after the report is closed. The final attribution-shape check was not reached. The five existing message checks are recorded in section 6.

Command evidence through the halt. Entries identify each log, the original load reading, exit status and SHA-256. Where a shell command contains report-forbidden punctuation, consult the named command log.

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

11. Deviations and corrections

The runtime changed between the successful restart check and the pre-suite check. The cause was not investigated. The workspace contains the opening build log, the R1–R3 commits and one self-fix. It has no delivery commit.

The first R1 pin run intentionally exposed four existing failures. Updating only the authorized version and argument pins restored all 24 focused tests. The capability-record preflight test passed before the pin edits and kept its original values.

The R2 edit command completed its two repository writes and then failed to update its local mutation helper. Copying from standard input had created that scratch file owner-read-only. Its owner write permission was added and only the helper update was repeated. The R2 focused run passed.

The first full-run typecheck error and the corrective commit are in sections 6 and 7. The initial baseline install and both later installs set the explicitly excepted executable bit. It was restored each time.

Raw authority-reading output in log 037 retains a quoted namespace suffix. The output is distinct from the command input. No tool with that name was invoked. The contemporaneous status check during the baseline found no failing test lines and returned the search tool’s no-match status. Optional local timer-API searches initially targeted an absent dependency directory and then found no matching asynchronous method. Neither search executed a test.

The initial identity report gave the deferred namespace before the individual names were exposed by the catalog. The report above records both observations. Proof of restored staged files against the new commit followed the requirement commit. The full source of each deliberate break and its return to the index were recorded before committing.

No GitHub call, live provider call or surface execution was made by the builder. No real provider key was used, no capability record was written and no request left the host on behalf of the builder except any downloads by the approved frozen installs. Phase 2, the investigation, the Founder’s host runs, independent review and session-record check remain pending.

12. Single next decision

The Founder decides how to restore the pinned Bun runtime and whether to authorize resumption from f73b5649afff86b558978cb76d09132bc0a7396a under a signed resume message. This halt supplies no basis to start the B7 investigation.
