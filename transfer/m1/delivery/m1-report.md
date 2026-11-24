Phase 3B M1 builder report

1. Builder identity and runtime

Source: 838-opening-source.log, SHA-256 fe1078a0138efcdd44c18ad87b7180928e668e7e7870190e9381506eda5d65c2.

The local main reference and the binding base under B14 were 75aec139d503cbe1d34d0c6f3ac5bd514339570e. The branch is build/3b-m1-r1. The commission is DEC-20261123-01, SHA-256 e0f08199567641f47eba567ac0653bfc8f1ed9315b3ddfca8074d535b294cb8e. The builder prompt has SHA-256 683951e9534f1517f68b690ceec554a3908a8dd6cebd2bd97f8791e56e6e4733.

The harness identified itself as Codex, based on GPT-6 by OpenAI, primary agent /root, Default collaboration mode. A more specific model identifier, reasoning effort, service tier, session ID and approvals reviewer were not shown. The sandbox was workspace-write with network access restricted. The Founder identified the approval setting as on-request and confirmed no loaded MCP server. The setting was not separately displayed. The Founder's session-record check follows the build.

The functions namespace showed wait, request_user_input, request_user_input_async, send_message_to_user_async and exec. Inside exec the callable inventory included apply_patch, exec_command, write_stdin and clock__curr_time. Clock showed sleep. Collaboration also showed followup_task, interrupt_agent, list_agents, send_message and wait_agent. The remaining identifiers, including the deferred namespace, are the six names of Addendum 2 B4. The Founder recorded the additional functions tool send_message_to_user_async in resume item 2.

The working directory was /Users/michaeldaley/builds/m1-r1, the shell zsh and the timezone America/New_York. Git identity was daley40-lab with 293512385+daley40-lab@users.noreply.github.com. Attribution is builder, session:codex/3b-m1-r1 and codex.

The governed executable reported

WARNING: proceeding, even though we could not create PATH aliases: Operation not permitted (os error 1)
codex-cli 0.167.0

The inventory uses the collective name specified for written files. No tool barred by Addendum 2 B3 was called. No exec input contained any of the six names or ran code from a string. The governed build last line and the preceding warning are quoted above.

The initial version check and the resume check: 001-governed-version.log, SHA-256 bd97fb5e9acacee1240d03514f2f90f685dc3dbcadc4c8f606f93c7bbc6c3726
526-resume-governed-version.log, SHA-256 b1b01afc16459d31513974f5b86b13f905651b3a95039406ceded644b90e4b8f

Source: 838-opening-source.log, SHA-256 fe1078a0138efcdd44c18ad87b7180928e668e7e7870190e9381506eda5d65c2.

Runtime check 007 found Bun 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, binary SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. In check 042 the outer command set PATH, then started a nested zsh. The helper ran the barred Homebrew Bun 1.4.5, revision 826ef2a6f067f917560ef49cd12125f12f3dd0ad, binary SHA-256 d6056bfd39a0e1fac3ebbfa0842bddd389a8aaa237614a52239bb17472f63377. The session halted before any test. The Founder upheld the halt and retained pr/m1-halt-1-report.md, SHA-256 eed8bc988d68dc9e1b601cba8ee3e0e3fecc80bd92fadfa45059027d5714f730.

Resume message 1, SHA-256 c4436aa4cb445bb00682982b1dd38355bb822cfce2a9f15371b1c53d7a62bc9c, invalidated the frozen install in 033, the typecheck in 040 and runtime check 042. None counts. The last passing runtime check before them was 007. The prompt manifest, governed CLI, branch, base, clean tree, empty stash, retained halt report, offending log and empty evidence directory matched in 045–052. Command 053 removed all node_modules folders inside the clone and verified clean status. For every subsequent Bun command the invoking shell sets PATH and checks both absolute resolutions and the binary digest before executing Bun. No further shell is started between those checks and the Bun command.

Each runtime receipt below records the version, revision, binary hash and shell exit status. For every governed check the bun and bunx paths were /Users/michaeldaley/.bun/bin/bun and /Users/michaeldaley/.bun/bin/bunx. Check 042 instead resolved both names under /opt/homebrew/bin and halted the build even though its shell exit was zero. The resumed checks enforced both paths and the digest before execution.

007-runtime.log, SHA-256 3e2d7aeb52c6505240911f9dc8bfa9beec6234b9d6920d2cce4d11d819fb7672
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
042-baseline-runtime.log, SHA-256 7c0650151550ee7d95b47cad5368cb780c9176dc58e7523d8a9c0b80ce0f232a
1.4.5  826ef2a6f067f917560ef49cd12125f12f3dd0ad  d6056bfd39a0e1fac3ebbfa0842bddd389a8aaa237614a52239bb17472f63377  /opt/homebrew/bin/bun  exit status 0
054-resumed-runtime.log, SHA-256 2bd25b6d63f9a058365dd2b0e919b9868570df2830498b983bb63a417312cfab
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
062-pre-suite-runtime.log, SHA-256 92f37cbfadb4c7210dd30023509e955e06cb0f9f34c0754e20280287991e2daf
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
100-r1-runtime.log, SHA-256 cfe607f7a57fff088f66870972ae3f76c7f49c57db762e7c19e1e72cee6af564
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
122-break-detail-runtime.log, SHA-256 d654c1cdc5ea059b9ef9040ed54db33d3f85d411a385fb490046fa0d7a686d67
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
140-fix-runtime.log, SHA-256 4126d7510097897f81b8035104db923c27b337e89e2265f47c5c3d6cf87f3039
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
150-break-runtime.log, SHA-256 8c51b9cad94773ceaf4e6424a411dddcf37c048ecf22a2ba0bcccd1286b1fc65
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
162-monitor-runtime.log, SHA-256 60843d69bd16d1acbc32cd8092599c83a6df0784381005c37832a883b59deb52
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
172-r2-runtime.log, SHA-256 7e37dcc62294f9a18f20a0061fde58f672200f73dec2860e4c0e75d06e39b94b
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
183-encoder-runtime.log, SHA-256 1cb1de3fd194315816ef99afcfc462a64cf66e8d629c8e6d0f9447a250a67a3c
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
191-provider-runtime.log, SHA-256 976b1a79fc44106fb158534473274d48f92b0115058b942ea3cbb8380b644541
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
199-echo-runtime.log, SHA-256 22510f2ad4a84865fb2dd309754889c7550288f5b2c80f8f5b4c8cde02e0f2f4
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
207-rounds-runtime.log, SHA-256 7960bf890aa274f1678e144958d0de463a918c483598284e3c6c66cd6d9de0a8
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
215-result-time-runtime.log, SHA-256 d57994ad959715c9e9558a9a7a03aadcaaf94a2f1c6c90444e1ab619b137cf03
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
223-partial-runtime.log, SHA-256 bc50f2aef45f5cadee0e39782d2451c5ebbd4dafe45ae0c6cd5cf3619e34818f
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
231-fallback-runtime.log, SHA-256 b4b44c1fc543c70444aa4827ef9a23c8b768a8f8b7be679cef7269845f8f3450
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
252-r3-runtime.log, SHA-256 a8d9a6d745e02d5e7910952c35b6ee4a7102de325e5702bfb77d251b743be713
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
269-first-write-runtime.log, SHA-256 70c1d7e562119f0e2864fe335e26904874e723ed1b6bfb6e69cdbb39d57d23e7
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
277-assistant-runtime.log, SHA-256 aedd4e4397114c2e408db040131dee86476858808b53ec1bca34896096b0e3ab
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
285-extra-runtime.log, SHA-256 8064fdcdda3bfe7f0c6fbfe4def4415bc84a640855dee871ab45e2881eb6ae37
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
293-result-time-runtime.log, SHA-256 06891f0023eb4cd3bb539aa1809bf906a5f551c5f2ef0bb6653bd6dc277d00f2
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
301-later-line-runtime.log, SHA-256 b9f5be991d774479b630e02d3ec4e114e981286574cb77c6d289c4c1d5da635f
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
333-r4-runtime.log, SHA-256 8238b9e6a5866d027ef9ea4d581f755cf9b1f5661af04d4ec1aacf52529cb898
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
358-detector-runtime.log, SHA-256 2b0141687273b281a1a4d8a4a44559a16e00c3dd1cdce620a58433a9a3e56b94
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
377-r5-runtime.log, SHA-256 a0e001a7003ea31fa435e0910ffb5d52b31d4f9bb10f72297184729973fab8c9
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
390-darwin-map-runtime.log, SHA-256 b4855938147fce5e0c0f81a146eb1a4a58abcfc9b8787922f5b2b022cd88893a
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
398-remote-copy-runtime.log, SHA-256 ea9254ec1c537ecb31cd35c866b9b82120d4750907d289badfe1d647bfff8535
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
406-local-path-runtime.log, SHA-256 9b0e6ed7824abac042728e0a498ed5379116171271060f2edbc73965ba377162
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
415-r6-runtime.log, SHA-256 e6ba477bf8aba7e85b1f7a6bc4d67331fb002ac222b083569f5f376153675d4b
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
426-updater-runtime.log, SHA-256 35c3ea553325c1fa54e06ea7628bc1ae511a073fccbf497dceb9c77b7e8ad937
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
434-extra-setting-runtime.log, SHA-256 23b7b0a86002d016113c89bf27fc1af6654eb4aefd2bdeab1f90e9ac17c9aa0a
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
463-r7-runtime.log, SHA-256 ee81cafffd145f282db56af05c72813242fa5eca02c04f17ae89a8079d362f12
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
539-echo-test-runtime.log, SHA-256 3f3fbd7b3b6289edb45f800fb74fe1a16645e88896bb8c29ecaff4e41e3359ce
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
549-echo-runtime.log, SHA-256 7a41f31b4cd7946cb9c250fa18c405e490ea7032eae27c1b24c422f8d104b8f8
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
594-break-host-echo-runtime.log, SHA-256 a791741dca6d4374a20ad4b2e5bb9382f37b37e399d2aeda818837eaa9c528c0
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
605-r7-resume-runtime.log, SHA-256 415f0c372eebfec68ae72efa41b778ad115b06416f8610ab5c858bba0b774d26
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
642-break-present-runtime.log, SHA-256 71b38a967e9c451cd48ff27ec7d6e0b01e1a0e647b1018ce45f95c323345cd94
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
649-break-barrier-runtime.log, SHA-256 872a613a1e82fa40148170fce37daead1e4fcab7d08c32dc732ddd0f6053c3e3
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
656-break-budget-runtime.log, SHA-256 f6c129ccb78a3905e2f61b8b6f289a632c5caf693884752507578c87b5f74135
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
663-break-settings-runtime.log, SHA-256 b6b0d0d43fa4e2c16129c70df9fd69e46e1b0379eaea28f9bf363bbf614a9931
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
670-break-cancel-runtime.log, SHA-256 df51bfe1159080482b3a7e784e780f75da1f1fd5ad151b00b87b961289643af7
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
677-break-monitor-runtime.log, SHA-256 89ae7c7aaa163657352fa52d429a5674b1f15700ca294041d7a20aeca5f8f80d
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
690-r8-runtime.log, SHA-256 602ccecf81caf20e0c467493ee395533099604439ee00535ff96cc1d99b587e7
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
710-break-precedence-runtime.log, SHA-256 74a1535d770b995ed029513f8faa11d6326534e8d092cd563ec647e55062fe0c
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
717-break-required-runtime.log, SHA-256 59732da52583715323041205f8331a118d08bb4da3833db8fda0808a631c7633
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
724-break-import-runtime.log, SHA-256 0bc388d6eebe4f1181324ae4af35fc211d00aab7afcdbf5a2d03a1da6ed53ac6
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
731-break-legacy-runtime.log, SHA-256 a35175f2e5cc8602c0f2c26c386dc0ebf39e3e2a7249d739658eae1b016effcb
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
746-evidence-healthy-runtime.log, SHA-256 d4f528e2912225051ad664e6dca5c3ace514c93eaebc8141fc8b22f5829eecb3
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
749-evidence-failures-runtime.log, SHA-256 a26da0e85868b65219109e675e0b936555a749f377667c7128c55dc0d793d931
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
765-full-runtime.log, SHA-256 52c15d60d95d705d1731dcce3126e7e19fd0293739e4d80a4544469a0eab617d
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
773-full-suite-runtime.log, SHA-256 d30b545eb28f623e3bd16cb82e5bf2a1544ea0f327e9b8a9887f3ee4cd0ac622
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
815-gate-runtime.log, SHA-256 5bc637da979f077e19ef1cb7eb9571eb8d537c41a9e80e851e8694cd356c6fb2
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0
823-gate-suite-runtime.log, SHA-256 eff00bae7e5718387d3b2d41f19eb75251955ca0a10e7e18f786abf5a8f96b6b
1.4.2  744846f844374847c902b5e7fd59b4342a51ef99  35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun  exit status 0

2. Checkout and preconditions

Work directory /Users/michaeldaley/builds/m1-r1. Branch build/3b-m1-r1. Binding base and initial origin/main 75aec139d503cbe1d34d0c6f3ac5bd514339570e. Closing HEAD 4630152f763baca0259d84c0d5817d0cea501145. Immediate parent bbaa5e4149c8067bff81e77ad467671c170ee56b. The closing commit changes only docs/verification/phase-3b-m1-build-log.md. 814-closing-tip.log, SHA-256 1a4224e21ff8838ca1b69e74bd820af19a9ba386d0bc8d060e7feae5aad7e49b.

Source: 838-opening-source.log, SHA-256 fe1078a0138efcdd44c18ad87b7180928e668e7e7870190e9381506eda5d65c2.
Source line numbers cited for square brackets or a divider: 116, 133–136, 138, 187, 227, 240, 244, 246, 259–260, 280, 291, 299, 302, 310, 325, 401, 423, 436, 444, 446, 449, 452, 460, 468, 484, 496, 498, 503, 505, 507, 520, 527–530, 551, 562, 583–584, 625, 634, 638–639, 644–645.

1. The first parent of the base and verified ancestor is `60faaf8e35cf7f85078bccad73d563262736117b`. The four changed paths are docs/decisions/DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md, docs/decisions/DEC-20261121-02-addendum-2-registry-digest.md, docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md and docs/verification/phase-3a-correction-rounds.md. The checkout and stash were clean and no M1 remote-tracking branch was listed. All five proposed M1 paths were absent. The initial output directories were empty apart from this session's command logs by the time of listing.
2. All 42 authority files matched their specified SHA-256 at HEAD. The 37 DEC acts and addenda showed ISSUED and the Founder's signature. PLAN-OPEN-2 showed APPROVED. Both prompt files passed the resumed manifest.
3. Numbered base-source excerpts follow. They are taken from the listed command outputs. Blank lines between numbered source lines retain their source numbers. Quoted lines have trailing whitespace removed.
4. Imports of the internal seams occur in packages/supervisor/test/build-rollback.test.ts at 23, packages/supervisor/test/madv-preflight-support.ts at 6, packages/supervisor/test/preflight.test.ts at 7, and test/phase3a/runtime-harness.ts at 14 and 15. None occurs under apps. The separation pin at line 30 and the base build.ts both have SHA-256 `6008c0bab23f1bde66af3744c4731203f509f2890015b853ea6e50d6c4f4c44a`.
5. uname -sm reported Darwin arm64.
6. The resumed baseline passed as recorded below.

apps/madbridge/src/tui/main.tsx — `logs/020-entry.log`, SHA-256 `008751903d3aeadaf88be63c4650a406f915b17d2ab5a0e5a52b3d5cff5d156d`

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

packages/supervisor/src/build.ts — `logs/022-build-base.log`, SHA-256 `ded0e75dda5acdbedfc1ce218944194f01a0f219a2fbc03d7d11bd45384405a2`

   104	export interface LiveReattestationInput {
   105	  readonly executionId: string;
   106	  readonly model: string;
   107	  readonly provider: string;
   108	  readonly execution: LaunchExecution;
   109	  readonly registration: BuildSurfaceRegistration;
   110	  readonly host: BuildHostResource;
   111	  readonly child: BuildChildResource;
   112	}
   113
   114	export type LiveReattestationResult =
   115	  | {
   116	      readonly ok: true;
   117	      readonly evidenceKind: "actual_session";
   118	      readonly provider: string;
   119	      readonly model: string;
   120	      readonly cliVersion?: string;
   121	    }
   122	  | {
   123	      readonly ok: false;
   124	      readonly reason: string;
   125	      readonly evidenceKind?: "actual_session" | "configuration_only" | "unverified";
   126	      readonly provider?: string;
   127	      readonly model?: string;
   128	    };
   129
   130	export type LiveSurfaceAttester = (
   131	  input: LiveReattestationInput,
   132	) => Promise<LiveReattestationResult> | LiveReattestationResult;
   133
   134	export interface BuildSurfaceRegistration extends AdapterRegistrationV1 {
   135	  readonly live_attester?: LiveSurfaceAttester | null;
   136	}
(lines omitted)
   298	      for await (const fact of host.handle.facts()) {
(lines omitted)
(lines omitted)
(lines omitted)
   534	export async function runTransactionalBuild(input: BuildInput): Promise<BuildResult> {
   535	  const safeInput: BuildInput =
   536	    input !== null && typeof input === "object"
   537	      ? {
   538	          sessionId: input.sessionId,
   539	          envelope: input.envelope,
   540	          plan: input.plan,
   541	          ...(input.injectFailureAt !== undefined ? { injectFailureAt: input.injectFailureAt } : {}),
   542	        }
   543	      : ({} as BuildInput);
   544	  return runTransactionalBuildWithDependencies(safeInput);
   545	}
(lines omitted)
   920	        case "reattest": {
   921	          for (let i = 0; i < plan.executions.length; i += 1) {
(lines omitted)
   926	            const execId = envelopeExecution?.execution_id;
(lines omitted)
   928	            if (
   929	              envelopeExecution === undefined ||
   930	              host === undefined ||
   931	              child === undefined ||
   932	              child.childPid === null ||
   933	              child.pgid === null
   934	            ) {
   935	              return failAt(step, "reattestation_failed", currentExecutionIds);
   936	            }
   937	            if (execution.surface !== envelopeExecution.surface) {
   938	              return failAt(step, "reattestation_failed", currentExecutionIds);
   939	            }
   940	            const reg = resolveRegistration(execution.surface);
   941	            if (reg === undefined || typeof reg.live_attester !== "function") {
   942	              return failAt(step, "reattestation_failed", currentExecutionIds);
   943	            }
   944	            const verdict = await reg.live_attester({
   945	              executionId: envelopeExecution.execution_id,
   946	              model: envelopeExecution.model,
   947	              provider: envelopeExecution.provider,
   948	              execution,
   949	              registration: reg,
   950	              host,
   951	              child,
   952	            });
   953	            if (!verdict.ok) {
   954	              return failAt(step, "reattestation_failed", currentExecutionIds);
   955	            }
   956	            if (verdict.evidenceKind !== "actual_session") {
   957	              return failAt(step, "reattestation_failed", currentExecutionIds);
   958	            }
   959	            if (verdict.provider !== envelopeExecution.provider || verdict.provider !== reg.provider) {
   960	              return failAt(step, "reattestation_failed", currentExecutionIds);
   961	            }
   962	            if (verdict.model !== envelopeExecution.model) {
   963	              return failAt(step, "reattestation_failed", currentExecutionIds);
   964	            }
   965	            const record: LiveReattestationRecord = Object.freeze({
   966	              executionId: envelopeExecution.execution_id,
   967	              surface: execution.surface,
   968	              provider: verdict.provider,
   969	              model: verdict.model,
   970	              evidenceKind: "actual_session",
   971	              cliVersion: verdict.cliVersion ?? null,
   972	            });
   973	            reattestations.push(record);
   974	            resources.push(Object.freeze({ step: "reattest", reattestation: record }));
   975	          }
(lines omitted)
   977	          break;
   978	        }

packages/supervisor/src/index.ts — `logs/014-index.log`, SHA-256 `854f55c986c162eb491654c480c64e6c33e501e2258ac7a10677d06e1dc3cfab`

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
    12	export { BUILD_STEPS, runTransactionalBuild, rollbackBuild } from "./build";
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
    23	  LiveReattestationRecord,
    24	  LiveReattestationResult,
    25	  PartialBuildState,
    26	  RollbackOutcome,
    27	} from "./build";

packages/supervisor/src/preflight.ts — `logs/019-preflight-lines.log`, SHA-256 `9978975f1f09e77ce23add965ad099742ae5e582ee93013f3a6f8ae965e84dfd`

(lines omitted)
    84	  const u = userInfo(); const p = input.installation; const env = input.ambient;
    85	  if (u.uid !== p.installation_uid || u.homedir !== p.passwd_home || env.SHELL !== u.shell || !env.TERM) return false;
    86	  if (env.PATH !== p.approved_path || !p.approved_path) return false;
    87	  for (const entry of p.approved_path.split(":")) {
    88	    if (!entry || !isAbsolute(entry)) return false;
    89	    const stat = d.stat(d.realpath(entry) as string);
    90	    if (!stat.isDirectory() || (stat.uid !== 0 && stat.uid !== p.installation_uid) || (stat.mode & 0o022) !== 0) return false;
    91	  }
    92	  const temp = env.TMPDIR;
    93	  if (!temp || !isAbsolute(temp)) return false;
    94	  const canonical = d.realpath(temp) as string, info = d.stat(canonical);
    95	  if (!info.isDirectory() || info.uid !== p.installation_uid || (info.mode & 0o7777) !== 0o700) return false;
(lines omitted)
    97	  if (registrations.some(r => r.environment_allowlist_ref === "claude-code-v1")) {
    98	    if (p.claude_config_dir !== join(p.passwd_home, ".claude-madventures-v5") || env.CLAUDE_CONFIG_DIR !== p.claude_config_dir) return false;
    99	    if (input.invocationArguments.some(arg => arg === "--settings" || arg.startsWith("--settings="))) return false;
(lines omitted)
   101	    for (const path of input.settingsSources) {
(lines omitted)
   103	      let text: string;
   104	      try { text = readFileSync(path, "utf8"); } catch (error) {
   105	        if ((error as NodeJS.ErrnoException).code === "ENOENT") continue;
   106	        return false;
   107	      }
   108	      const settings = JSON.parse(text);
   109	      if (!settings || typeof settings !== "object" || Array.isArray(settings)) return false;
   110	      // Fail closed on unknown settings controls: a future provider/endpoint
   111	      // selector cannot silently become authorized by an old validator.
   112	      for (const key of Object.keys(settings)) if (key !== "env") return false;
   113	      if (settings.env !== undefined) {
   114	        if (!settings.env || typeof settings.env !== "object" || Array.isArray(settings.env)) return false;
(lines omitted)
   117	        }
   118	      }
   119	    }
   120	  }
   121	  return true;
   122	}
(lines omitted)
   124	export async function runPurePreflight(input: PreflightInput): Promise<PreflightResult> {
   125	  return runPurePreflightWithDependencies(input, {});
   126	}
(lines omitted)
   155	  try { if (!validateEnvironment(input, admitted, d)) return fail("auth_not_ready"); }

packages/supervisor/src/environment.ts — `logs/024-related.log`, SHA-256 `13e3c84c168a0f18f4f2a393c66142c6841711f3621684b6a034769faa2a6956`

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

packages/adapter-madv-surface/src/index.ts — `logs/023-adapters.log`, SHA-256 `3e2c77d9c132322c85cdca322e1baaa70fb5be66c758570b85d47c09100b4214`

    35	export const EVIDENCE_DEADLINE_MS = 30_000;
(lines omitted)
    37	  "auth_failed", "endpoint_refused", "provider_error", "identity_unavailable",
    38	  "model_refused", "domain_unresolved", "identity_mismatch",
(lines omitted)
(lines omitted)
    51	export function encodeUserInput(text: string): string {
    52	  return JSON.stringify({ type: "user", message: { role: "user", content: text } }) + "\n";
    53	}
(lines omitted)
    71	export class MadvSurfaceParser {
    72	  private readonly context: MadvContext;
(lines omitted)
    74	  private readonly decoder = new TextDecoder("utf-8", { fatal: true });
    75	  private buffer = "";
    76	  private wireSession: string | undefined;
    77	  private state: "init" | "waiting" | "response" | "tools" | "between" = "init";
    78	  private readonly tools = new Map<string, string>();
    79	  private readonly usedToolIds = new Set<string>();
    80	  private assistantSeen = false;
    81	  private responses = 0;
    82	  private waitingForEvidence = true;
    83	  private sentAt: number;
    84	  private failed: MadvFailure | undefined;
    85	  private finished = false;
    86
    87	  constructor(context: MadvContext, private readonly now: () => number = () => performance.now()) {
(lines omitted)
    89	    this.sentAt = now();
    90	  }
(lines omitted)
   108	  push(chunk: string | Uint8Array): MadvResult {
   109	    if (this.finished) { this.fail("identity_mismatch", "event_after_exit"); return this.snapshot(); }
   110	    this.checkDeadline();
   111	    try {
   112	      this.buffer += typeof chunk === "string" ? chunk : this.decoder.decode(chunk, { stream: true });
   113	      let newline: number;
   114	      while ((newline = this.buffer.indexOf("\n")) >= 0) {
   115	        const line = this.buffer.slice(0, newline); this.buffer = this.buffer.slice(newline + 1);
   116	        if (line.trim()) this.line(line);
   117	      }
   118	      // The largest release tool-result event is capped at 100 KB.
   119	      if (this.buffer.length > 262_144) this.fail("identity_mismatch", "oversized_event");
   120	    } catch { this.fail("identity_mismatch", "malformed_stream"); }
   121	    return this.snapshot();
   122	  }
(lines omitted)
   185	  finish(exitCode: number, signal: string | number | null = null): MadvResult {
   186	    if (!this.finished) {
   187	      try { this.buffer += this.decoder.decode(); } catch { this.fail("identity_mismatch", "malformed_stream"); }
   188	      if (this.buffer.trim()) this.line(this.buffer);
   189	      this.buffer = ""; this.checkDeadline(); this.finished = true;
   190	      if (signal !== null) this.fail("provider_error", "signal");
   191	      switch (exitCode) {
   192	        case 0: break;
   193	        case 5: this.fail("auth_failed", "exit"); break;
   194	        case 6: this.fail("endpoint_refused", "exit"); break;
   195	        case 1: this.fail("provider_error", "exit"); break;
   196	        case 3: this.fail("identity_unavailable", "exit"); break;
   197	        case 7: if (this.failed?.cause !== "domain_unresolved") this.fail("model_refused", "exit"); break;
   198	        case 4: this.fail("identity_mismatch", "exit"); break;
   199	        default: this.fail("provider_error", "unknown_exit");
   200	      }
   201	      if (!this.failed && (this.responses === 0 || this.waitingForEvidence)) this.fail("identity_unavailable", "model_response_missing");
   202	      if (!this.failed && this.tools.size !== 0) this.fail("identity_mismatch", "event_order");
   203	    }
   204	    return this.snapshot();
   205	  }

packages/adapter-claude-code/src/index.ts — `logs/023-adapters.log`, SHA-256 `3e2c77d9c132322c85cdca322e1baaa70fb5be66c758570b85d47c09100b4214`

     1	// packages/adapter-claude-code/src/index.ts
     2	export { ClaudeCodeAdapter } from "./adapter";
     3	export type {
     4	  AdapterV1,
     5	  ConfigChangeSet,
     6	  LaunchInput,
     7	  ManagedExecution,
     8	  ExecutionIdentity,
     9	} from "./adapter";
    10	export { attestClaudeCode, ModelIdentityUnverifiable } from "./attestation";
    11	export { realShell, fakeShell, resolveExecutable } from "./shell";
    12	export type { Shell, ShellResult } from "./shell";

packages/supervisor/src/attestation.ts — `logs/024-related.log`, SHA-256 `13e3c84c168a0f18f4f2a393c66142c6841711f3621684b6a034769faa2a6956`

     6	export const IDENTITY_PROBE_INPUT = '{"type":"user","message":{"role":"user","content":"Report session initialization."}}\n';
(lines omitted)
    62	function firstInit(output: string): Record<string, unknown> | undefined {
    63	  for (const line of output.split("\n")) {
    64	    if (line.trim() === "") continue;
    65	    try {
    66	      const event = JSON.parse(line);
    67	      if (event?.type === "system" && event?.subtype === "init") return event;
    68	    } catch { /* A non-init line is not identity evidence. */ }
    69	  }
    70	  return undefined;
    71	}
    72
(lines omitted)
    74	  const event = firstInit(output);
    75	  return event !== undefined && event.model === model
    76	    && typeof event.claude_code_version === "string"
    77	    && versions.includes(event.claude_code_version);
    78	}

packages/broker/src/pty-host-supervisor.ts — `logs/024-related.log`, SHA-256 `13e3c84c168a0f18f4f2a393c66142c6841711f3621684b6a034769faa2a6956`

    74	export interface PtyHostHandle {
    75	  readonly hostPid: number;
    76	  send(f: HostCommandFrame): void;
    77	  facts(): AsyncIterable<HostFactFrame>;
    78	  closeStdin(): void;
    79	  killPgid(): void;

packages/protocol/src/lifecycle-events.ts — `logs/024-related.log`, SHA-256 `13e3c84c168a0f18f4f2a393c66142c6841711f3621684b6a034769faa2a6956`

(lines omitted)
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
(lines omitted)

test/phase3a/harness-separation.test.ts — `logs/024-related.log`, SHA-256 `13e3c84c168a0f18f4f2a393c66142c6841711f3621684b6a034769faa2a6956`

    20	// Drift requires review; these are expression exceptions, never file exclusions.
    21	const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> = {
(lines omitted)
    23	  "packages/protocol/src/adapter-registry.ts": {
(lines omitted)
    25	  },
    26	  "packages/protocol/src/lifecycle-events.ts": {
(lines omitted)
    28	  },
    29	  "packages/supervisor/src/build.ts": {
(lines omitted)
    31	  },
    32	};

test/phase3a/architecture-phase3a.test.ts — `logs/025-architecture.log`, SHA-256 `84fcc971829e543ae44f586a7fa5ef36411a10c83dcc0b550371d4de4d245767`

(lines omitted)
   542	  const sourceFile = ts.createSourceFile(
   543	    fileName,
   544	    sourceText,
   545	    ts.ScriptTarget.Latest,
   546	    /* setParentNodes */ true,
   547	    scriptKindFor(fileName),
   548	  );
(lines omitted)
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
(lines omitted)
  1783	  test("launching every production entry point in bounded isolated processes creates no broker.sock", async () => {
  1784	    // ── CLI path: `start --json` must fail closed with the exact gate body.
  1785	    await runEntryPath({
(lines omitted)
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
(lines omitted)
  1799	      readiness: (out) => out.includes("NOCONN"),
(lines omitted)
  1801	    });
(lines omitted)
  2567	    // Both production entry points, in bounded isolated processes, create no
  2568	    // broker.sock at the legacy path or under MADV_RUNTIME_DIR.
(lines omitted)
  2570	    await runEntryPath({
(lines omitted)
  2572	      readiness: TUI_READY,
(lines omitted)
  2574	    });
  2575

apps/madbridge/test/tui-writers-stage.test.tsx — `logs/025-architecture.log`, SHA-256 `84fcc971829e543ae44f586a7fa5ef36411a10c83dcc0b550371d4de4d245767`

   983	  test("no setTimeout/setInterval/requestAnimationFrame/spinner imports", () => {
   984	    const tuiDir = join(process.cwd(), "apps/madbridge/src/tui");
   985	    const files = listSourceFiles(tuiDir);
   986	    expect(files.length).toBeGreaterThan(0);
   987
(lines omitted)
   989	      /\bsetTimeout\b/,
   990	      /\bsetInterval\b/,
   991	      /\brequestAnimationFrame\b/,
   992	      /\bclearTimeout\b/,
   993	      /\bclearInterval\b/,
   994	      // Animation/spinner libraries
(lines omitted)
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

test/phase3a/evidence-pipeline.test.ts — `logs/025-architecture.log`, SHA-256 `84fcc971829e543ae44f586a7fa5ef36411a10c83dcc0b550371d4de4d245767`

   877	  const modules: Record<string, unknown> = {
   878	    "node:fs": { constants: { X_OK: 1 }, accessSync() {}, statSync: stat,
   879	      realpathSync: (path: string) => path, readFileSync: () => Buffer.from("synthetic executable") },
   880	    "node:os": { userInfo: () => ({ uid: 42, homedir: "/fixture-home", shell: "/bin/zsh" }) },
   881	    "node:path": { basename: (path: string) => path.split("/").at(-1), isAbsolute: (path: string) => path.startsWith("/"),
(lines omitted)
   883	    "@madventures/protocol": { ...task57Protocol, parseTaskEnvelope: (value: unknown) => value },
   884	    "../../protocol/src/pair-constraints": { evaluatePairEligibilityWithDependencies: () => ({ ok: true }) },
   885	    "@madventures/storage": { proposeStorageRoot: () => "/fixture-storage", validateStorageRoot: () => ({ ok: true }),
   886	      latestFreshRecord: () => { calls.push("record"); return record; } },
   887	    "./environment": { buildAllowlistedEnvironment: () => ({}), MissingRequiredVariableError: class extends Error {} },
   888	    "./attestation": { IDENTITY_PROBE_INPUT: "synthetic input", runBoundedProbe: probe },
   889	  };
   890	  const module = { exports: {} as { runPurePreflight(input: unknown): Promise<{ ok: boolean; failure?: string; detail?: string }> } };
   891	  new Function("require", "module", "exports", "Bun", javascript)((name: string) => {
   892	    expect(Object.hasOwn(modules, name), `unexpected preflight dependency ${name}`).toBe(true);
(lines omitted)

packages/supervisor/test/build-rollback.test.ts — `logs/013-rollback.log`, SHA-256 `55f47ac4f11a3e1bc56a594d1e53f95d5d8b0e93836d66ec28d79e7a2505b5dd`

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
   603
   604	  const f = makeBuildFixture("ses-task46-no-tui");
   605	  const result = await f.run();
   606	  expect(result.ok).toBe(true);
   607	  if (result.ok) {
(lines omitted)
   610	    expect(result.state.resources.some((r) => (r.step as string) === "tui")).toBe(false);
   611	  }
   612
   613	  // B3: Production runTransactionalBuild ignores extra test-seam properties if passed at runtime.
   614	  const fProd = makeBuildFixture("ses-task46-prod-boundary");
   615	  let stepObserverCalled = false;
   616	  const prodResult = trackResult(
   617	    await supervisorIndex.runTransactionalBuild({
   618	      sessionId: fProd.sessionId,
   619	      envelope: fProd.envelope,
   620	      plan: fProd.plan,
   621	      registration: fProd.registration,
   622	      onStep: () => {
   623	        stepObserverCalled = true;
   624	      },
   625	    } as unknown as BuildInput),
   626	  );
   627	  expect(stepObserverCalled).toBe(false);
   628	  expect(prodResult.ok).toBe(false);
   629	  if (!prodResult.ok) {
   630	    expect(prodResult.failedStep).toBe("reattest");
   631	  }
   632	});
   633
   634	test("re-attestation failure before activation prevents any active snapshot", async () => {
   635	  // Case 1: Default ADAPTER_REGISTRY registrations have no live_attester in Phase 3A (B4),
   636	  // so reattest must fail closed under spec section 9.13 via production runTransactionalBuild.
   637	  const fDefault = makeBuildFixture("ses-task46-reattest-default");
   638	  const defaultResult = trackResult(
   639	    await runTransactionalBuild({
   640	      sessionId: fDefault.sessionId,
   641	      envelope: fDefault.envelope,
   642	      plan: fDefault.plan,
   643	    }),
   644	  );
   645	  expect(defaultResult.ok).toBe(false);
   646	  if (!defaultResult.ok) {
   647	    expect(defaultResult.failedStep).toBe("reattest");
   648	    expect(defaultResult.failure).toBe("reattestation_failed");
   649	    expect(defaultResult.detail).toBe("step=reattest execution=builder failure=reattestation_failed");
(lines omitted)
   651	      "storage",

packages/supervisor/test/preflight.test.ts — `logs/024-related.log`, SHA-256 `13e3c84c168a0f18f4f2a393c66142c6841711f3621684b6a034769faa2a6956`

   191	test("preflight fails with auth_not_ready", async () => {
   192	  const f = fixture();
(lines omitted)
   194	    writeFileSync(f.settings, content); await failure(f, "auth_not_ready");
   195	  }
   196	  writeFileSync(f.settings, '{}');
(lines omitted)
   199	  const sharedTemporaryRoot = realpathSync(mkdtempSync(join("/tmp", "task45-shared-temp-")));
   200	  roots.push(sharedTemporaryRoot);
   201	  f.input.ambient.TMPDIR = sharedTemporaryRoot; await failure(f, "auth_not_ready"); // Shared /tmp descendant, despite private ownership/mode.
   202	  f.input.ambient.TMPDIR = f.temp;
(lines omitted)
   205	  }
   206	  f.input.installation.installation_uid++; await failure(f, "auth_not_ready");
   207	});

apps/madbridge/src/commands/export-evidence.ts — `logs/024-related.log`, SHA-256 `13e3c84c168a0f18f4f2a393c66142c6841711f3621684b6a034769faa2a6956`

    12	import { redact, redactWithAllowlist, type EnvironmentAllowlistV1 } from "../../../../packages/supervisor/src/environment";

Authority digests verified at the binding base. Each line gives the path, SHA-256 and recorded length. 015-authority-verification.log, SHA-256 5e5ba47cf35c413c3762da6fa678cbdca4233cb5a1a596140ed45685466f0eaa.
docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md e0f08199567641f47eba567ac0653bfc8f1ed9315b3ddfca8074d535b294cb8e OK 203 lines
docs/decisions/DEC-20261108-04-phase-3b-standing-commission.md d373235e424bd7fbe4c1c5b1c5f4954eb1b02165db4e1365d9cfa1533aa93b29 OK 241 lines
docs/decisions/DEC-20261108-04-addendum-1-corrections.md 90e2f541fd0a232390ca0554067a2de8b37f15c933016eafe40ebde2cd2eff17 OK 48 lines
docs/decisions/DEC-20261119-02-managed-settings-branch.md 4149189677cccac7feedc948efdd217e8cdcc7c620cb11062832a718f976e9c7 OK 76 lines
docs/decisions/DEC-20261121-02-madv-surface-admission.md 141ee53275999ba3f31a0b1f66bed93ffb7a80d6f3527cbff31b3885ead44dfe OK 117 lines
docs/decisions/DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md b6b9563ed1a2e154b4ef3b4d9ffe7666e6fd9870d82b87486f772d65f7f167aa OK 48 lines
docs/decisions/DEC-20261121-02-addendum-2-registry-digest.md 5dc0fddf411f8abce1e20df834ce21d0676b1fcd538fe12ad3d49a34ffa8be81 OK 38 lines
docs/decisions/DEC-20261119-03-madv-surface-0.1.2-release.md 6823c07f50567a62abee020de693e192cc43ff47a75871e5bfad5bd16e671d9b OK 81 lines
docs/decisions/DEC-20261115-02-phase-3b-m0.md 5d8bd4a446d8b3120bddbc34dc11a5fdf83e3a07d9efcd04fbd7b8efdad8d22b OK 149 lines
docs/decisions/DEC-20261115-02-addendum-3-phase-1-record-check.md 24f76dbb631d6058e81ccff93d3c9fecb11521b5a876c687ec0da1ee0f9e0a23 OK 46 lines
docs/decisions/DEC-20261115-02-addendum-5-retired-id-plugin-and-json.md 666a82b2229272111f4d01b79c6ffba401a53f5236ae50f7f7c6a4b3651cd9ac OK 54 lines
docs/decisions/DEC-20261115-02-addendum-6-ubuntu-check.md 2dac9e9acdcc4da16e80a60aff90d0b3079ee2558c29433cfafe7dcc9f0f8b26 OK 46 lines
docs/decisions/DEC-20261119-01-m0-records-and-merge.md 7076137d68f013705d8872eaf573cb13ee17319b9074bc20248d02a2d6316df2 OK 112 lines
docs/decisions/DEC-20261016-02-task46-correction.md 863f0b7bff5e7cc662bfc43084120d6fff39af07daa3117521bc85f887b8d3c9 OK 92 lines
docs/decisions/DEC-20261024-01-separation-pin-rule.md fa0d114dbe3a37db38a7538e9a5c33da42755a47250d7ae4069233043c6ac85e OK 51 lines
docs/decisions/DEC-20261108-01-phase-3b-approval.md 319ba65b340696d66a655e21f648fed742a9c38bcbb1d876776abc27a27a9738 OK 95 lines
docs/decisions/DEC-20261015-03-m20-checkpoint-closure.md e4148fde243d15508513fbf22b58584c519d1d842ca7fefb016d266bf6f08f61 OK 68 lines
docs/decisions/DEC-20261020-01-phase-3a-order-and-records.md e5299202a83ad37e11fd619231422b41fc43779308531b62ae6a5cf06ee3c6b7 OK 68 lines
docs/decisions/DEC-20261027-01-m22-execution-authorization.md 86f1374492a833ce87ebdf81293c59e8805c547d8bc29e1aa682b17a769bcd8b OK 74 lines
docs/decisions/DEC-20261102-04-hardening-records-and-hardening-c.md 313bfedb64c0ff1eca5fa65024385bd3fc6400a63b3f616a1994de519fbffab2 OK 90 lines
docs/decisions/DEC-20261112-02-model-record.md 3151cb9e178e918f0c07f5a4eb9931fa9d529debedf0ad4d91f5999844883da7 OK 60 lines
docs/decisions/DEC-20261108-02-phase-3b-builder-qualification.md 38ec4066f5c9487547befc81e00b80b69126d9140f1e66c0a8dcb35e5fe815ef OK 83 lines
docs/decisions/DEC-20261108-03-addendum-2-codex-harness.md e04b54065b0f0bb465b2d14e14a39f3b31f9cb34a874f6f8210a7d7e74a8c1c1 OK 44 lines
docs/decisions/DEC-20261108-03-addendum-3-image-tool.md f2a0ef1063379902935760d9517b68d532cabf6e24699cdebb789681f78ce15e OK 36 lines
docs/decisions/DEC-20261108-03-addendum-4-sandbox-halt.md e817470aea6be2c176d4ae75856fd793ef982bd28c9eb793df9c9038a5c1dfbc OK 42 lines
docs/decisions/DEC-20261108-03-addendum-5-own-work.md e86e94a62c7067e4656114afe1713c1478814ffe446d1ffcc8b788accfc3ff3d OK 42 lines
docs/decisions/DEC-20261108-03-addendum-6-names-in-text.md 24cef0ed5c968aa80ada586e473526d0f4f0b1de1331eba1d5a35051b1254ac9 OK 48 lines
docs/decisions/DEC-20261108-03-addendum-10-second-verdict.md d90d48718bc4ea6056af6f011f797a78eddcfd14e7111f15f823085c4388bca0 OK 79 lines
docs/decisions/DEC-20261108-03-addendum-11-governed-build.md e2d28cbd12485e9025c928403eb7beead9552ee378b023ddf5bc9e18febe00df OK 50 lines
docs/decisions/DEC-20261112-03-addendum-2-gate-repeat.md 829248f1e2557ddbcfd33d6456f7056bfce73a008791cb88caa9660a5d979d29 OK 48 lines
docs/decisions/DEC-20261108-03-phase-3b-h1.md 10cdc674ce746568c963aa2c5c34c95a69d9960ea469438b044bfb5fe4b9e9de OK 160 lines
docs/decisions/DEC-20261113-01-h2-records-and-merge.md 41e27eafc24a2eef238c080d1374b90fbe22d609f4ef5cbb66e07cccb5b347a5 OK 125 lines
docs/decisions/DEC-20261102-02-hardening-builds.md 04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550 OK 67 lines
docs/decisions/DEC-20261023-01-standing-build-rules.md bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5 OK 123 lines
docs/decisions/DEC-20261013-03-tests-4-6-ruling.md 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7 OK 81 lines
docs/decisions/DEC-20261104-02-hardening-f-and-task58.md 011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5 OK 132 lines
docs/decisions/DEC-20261114-01-madv-surface-release.md 6bffc2c18927b90f4b5042f312947e5d39853ca53404a58a51b4602eb45652b8 OK 76 lines
docs/decisions/PLAN-OPEN-2-environment-allowlists.md b60676aa47b216c36d9080c884650943cdac93dd12109d2864ebcf0eb6887d8c OK 438 lines
docs/superpowers/plans/2026-09-19-phase-3b-live-tui-integration.md a48bf5457bf17cf5d554e541c5bb3609efacf6ad170ad6e56950b829a4269ccc OK 651 lines
docs/superpowers/specs/2026-09-19-phase-3b-live-tui-integration-design.md da8f4c8c35f617898368b340d710188686c9dc9faf2b23c4a6b284c1bb4d93fc OK 469 lines
docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md 472f3179c20f7f41c0e3feb5a65842bf3774cf6df01e8684a3ea86dcd811bce0 OK 2336 lines
AGENTS.md 0879ede2d3b07e137d1f3d5f75c131285277b44e61f1305d3d0d59da64f1dbca OK 251 lines

Final prompt inventory and exact digests. Source: 533-resume-prompt-manifest.log, SHA-256 f38a90b111b62e0c988cd425a1bcbfe78639ccba323dc550af2e23f8e87178f3.

683951e9534f1517f68b690ceec554a3908a8dd6cebd2bd97f8791e56e6e4733  builder-prompt-m1-codex-macbook.md
c4436aa4cb445bb00682982b1dd38355bb822cfce2a9f15371b1c53d7a62bc9c  resume-m1-1-runtime.md
5cd930a3f2dbb8f3a85c63cfba5ed95f8088418ee132e89872d57e63fad75666  DEC-20261123-01-addendum-1-environment-values-in-logs.md
611e62f080409fe686392d45455622d509732bea2875e4a754cdb4c00f5263e5  resume-m1-2-test-output.md
f524cb055c363c57dbcaf25dc037645989d453a942f3ce120c7083735e6cc52c  DEC-20261123-01-addendum-2-pty-echo.md
7176750c77c97b52bb9a0f0e16f5d6ea68f7be8ed27b5f209a0940e7bff9f1ea  resume-m1-3-pty-echo.md

Resume checks for the governed executable, branch, prior head, log 510 worktree hashes and retained halt reports. 524-resume-prompt-digests.log, SHA-256 aae4cbf2f26abdbae676cfd0f51a3c86f779885d347eb46646fec9286835d3d4
525-resume-prompt-list.log, SHA-256 b0f26951748f424674e1bc8e13cbf1d8a5f9ef5808b184f907dcc53efe97cbf5
526-resume-governed-version.log, SHA-256 b1b01afc16459d31513974f5b86b13f905651b3a95039406ceded644b90e4b8f
527-resume-branch.log, SHA-256 b33b6293e1c60e6a88c669243e2fd1a550fee6e92db38082b6242d24b7f9da1e
528-resume-head.log, SHA-256 d7144bca3b486239c2de299325740d2c410b9cfafbb573d7f5f87ed699a7c8a8
529-resume-paths.log, SHA-256 bdd12a3aa9718a97eb28880593883ecdb90100373ec7beaf465f65f8edac15bc
530-resume-working-digests.log, SHA-256 4213c5926d622714ed21ca337cdd7872f7af825bf47ef354b70b2be806ce9af4
531-resume-pr-dir.log, SHA-256 9d68b37986954c06992811b538068f1700a0dfd13a8f02440f7a137c991118d3
532-resume-report-digests.log, SHA-256 abeab3c4983d06cb47b03fc4501b5508649205df437771017f2dfcabd039edcc

3. Baseline

Source: 838-opening-source.log, SHA-256 fe1078a0138efcdd44c18ad87b7180928e668e7e7870190e9381506eda5d65c2.
Source line numbers cited for square brackets or a divider: 674.

| Command | UTC on 2026-11-23 | Initial load | Exit | Log |
| --- | --- | --- | --- | --- |
| Runtime check | 12:08:22–12:08:23 | 4.43 | 0 | logs/054-resumed-runtime.log, SHA-256 2bd25b6d63f9a058365dd2b0e919b9868570df2830498b983bb63a417312cfab |
| bun install --frozen-lockfile | 12:09:53–12:09:54 | 2.46 | 0 | logs/056-resumed-install.log, SHA-256 09b5a9a3ba849cebafa110420637e38aacd6890b7dfca3798c3c5469c12a5c5f |
| bunx tsc --noEmit | 12:20:54–12:20:57 | 1.41 | 0 | logs/061-resumed-types.log, SHA-256 3f8cc32a57c932b5baddc273d433e84eea652723b8f8d7ee5068249ace09a1ea |
| Pre-suite runtime check | 12:26:25–12:26:26 | 1.89 | 0 | logs/062-pre-suite-runtime.log, SHA-256 92f37cbfadb4c7210dd30023509e955e06cb0f9f34c0754e20280287991e2daf |
| Logged wait | immediately before 064 | 1.96 | 0 | logs/063-baseline-load.log, SHA-256 14220fedef8d3344da065f1ca8456def2ffbf5dfbb690ea7ba74d416c6f19c2a |
| bun test | 12:27:21–12:30:43 | 1.96 | 0 | logs/064-resumed-baseline.log, SHA-256 36590a0c31beb1f2f612d9aeb2d712783ffb63f63d5bb6fe470a817a5ceabfdf |

Both runtime checks matched the paths, version, revision and digest from check 007. The frozen install reported 51 packages installed and bun.lock stayed at SHA-256 a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830. The install changed the mode of packages/founder-act/src/main.ts from 100644 to 100755. The authorized checkout restored it, and git status printed nothing. The compiler printed nothing.

 2048 pass
 0 fail
 27582 expect() calls
(lines omitted)

All 2048 result lines were present. The list records file, full name and result without duration in logs/075-base-list.log, SHA-256 501aae2c5064e2f3e0b761685485ede9a89d75c35db6946dc94ff95d6c243a63. The checkout was clean after the suite.

2048 passed across 151 files. Zero failed, skipped or marked todo.
Source: 064-resumed-baseline.log, SHA-256 36590a0c31beb1f2f612d9aeb2d712783ffb63f63d5bb6fe470a817a5ceabfdf.
Source line numbers cited for square brackets or a divider: 6770.

 2048 pass
 0 fail
 27582 expect() calls
(lines omitted)

The base list is a file-by-file list of names and results. 075-base-list.log, SHA-256 501aae2c5064e2f3e0b761685485ede9a89d75c35db6946dc94ff95d6c243a63.

4. Requirements, tests and deliberate breaks

R1. In packages/supervisor/src/build.ts, runLiveTransactionalBuild supplies the surface-specific attesters to the existing transactional steps. LiveReattestationInput carries the session, signal and failure callback. The build selects the failure detail and records the first continuous failure on the appropriate side of activation. packages/supervisor/src/index.ts exports the production port and input types. test/phase3a/harness-separation.test.ts pins the new build digest. packages/supervisor/test/live-port.test.ts exercises the port using the disposable directories, repository, storage and stand-ins from test/phase3b/offline.ts.

R2. packages/adapter-claude-code/src/live.ts implements encodeUserInput, ClaudeReader and attestClaudeSession. A single subscription and parser span attestation and monitoring. The monotonic deadline covers the result. The adapter index exports these operations. packages/adapter-claude-code/test/live.test.ts and test/phase3b/wire-facts.ts exercise synthetic frames, cancellation, close and handover.

R3. packages/adapter-madv-surface/src/index.ts adds a separate encodeAttestationInput and opt-in launch context on MadvSurfaceParser. Existing probe and encoder callers retain their form. packages/adapter-madv-surface/src/live.ts runs attestMadvSession, retains the parser, and enforces the startup budget, deadline and result. packages/adapter-madv-surface/test/live.test.ts covers both encoder forms and startup and continuous identity checks.

R4. Each adapter's src/detectors.ts reads its registered detection rules. detectMadvFailure also handles the registered surface events and exit codes. Each adapter connects the detector through its src/index.ts and src/live.ts and exercises it through its test/live.test.ts. test/phase3b/detectors.test.ts covers the surface and cause returned.

R5. In apps/madbridge/src/tui/live/, managed-settings.ts supplies managedSettingsDirectory and settings-sources.ts supplies settingsSources. The caller checks the platform, managed fragments and policy files, and the remote settings copy before preflight. test/phase3b/settings-sources.test.ts exercises these stops and the four supplied locations.

R6. packages/supervisor/src/preflight.ts passes the envelope's Claude model into validateEnvironment. The B19 key and value rules run on preflight's existing path. packages/supervisor/test/preflight.test.ts adds acceptance and refusal cases. test/phase3b/preflight-input.ts uses a disposable storage override, synthetic identity records and the real public preflight.

Addendum 2. In packages/pty-host/src/terminal.ts, spawnGoverned clears only ECHO before spawn. In packages/pty-host/test/main-guard.test.ts lines 309 and 335, the expected bytes are the single line produced by cat. test/phase3b/pty-input-echo.test.ts gates the stand-in's first read on the host's acknowledgement and checks the complete output.

R7. apps/madbridge/src/tui/live/composition.ts wires settings, pure preflight, live build, the per-surface write budgets, present, cancellation and shutdown. test/phase3b/scenarios.ts calls the production path and checks durable interruption and group termination. test/phase3b/stand-in.ts reads and writes controlled stream-json lines. test/phase3b/offline.ts creates currently valid envelopes. test/phase3b/composition.test.ts covers the barrier and both probes and attesters, cancellation, the fourth call, the four settings sources, and interruption.

R8. packages/adapter-madv-surface/test/response-precedence.test.ts checks two absent-response-id cases. packages/supervisor/test/madv-allowlist.test.ts checks each variable's required and secret attributes through construction and redaction. test/phase3b/separation.test.ts inspects application source and calls the original public build without an attester.

R9. scripts/phase3b/healthy-starts.ts records two independent starts. scripts/phase3b/failures.ts records the barrier, wrong model and fallback. scripts/phase3b/transcript.ts publishes complete transcripts under the supplied directory. docs/verification/phase-3b-m1-evidence.md quotes them and records the limitations.

The design choice for madv-surface was a separate encoder for attestation and an optional launch context for the parser. The original encoder and probe code remained callable by existing clients. The R7 stand-in uses the host echo fix and ordinary input. The task detail recorded before implementation is in the opening source, lines 679–753. 838-opening-source.log, SHA-256 fe1078a0138efcdd44c18ad87b7180928e668e7e7870190e9381506eda5d65c2.

Every added test, its file and its B21 item or Addendum 2 test.
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

Changes to the task detail and corrections during development.
- R1's first fixture in log 102 used the same path for the repository and worktree. It now supplies the disposable worktree's .git path and verifies its fingerprint. The two R1 cases passed after the correction.
- R1's failure-detail test received the fixed synthetic text under Addendum 1. The deleted log is cited in Deviations. The change went in a separate commit because R1 had already been committed.
- R4's first typecheck in log 338 found four errors involving expected-cause types and exact optional properties. The adapters and test expectations now use the closed cause types, and the optional parser reason is included only when defined. The typecheck in 349 and test run in 351 passed.
- R7's first integration run in 472 used an expired fixture envelope. Its creation and expiry are now relative to the fixture's creation time. Runs 478 and 485 then exposed the independent PTY echo. Observation 488 identified the written user frame before the stand-in's startup marker and first read. The temporary observer was removed and checked in 508. The Founder amended the allowed paths in Addendum 2.
- In Addendum 2's new test, log 576 received no numeric exit code from the naturally exiting stand-in. After it acknowledges the exact input, the stand-in now waits for the host's terminate command and exits successfully on SIGTERM. Both complete output and exit code passed in 581. The patch utility's backup matched the original authored test and was moved to the builder's scratch directory, verified in logs 590 and 591. It was never committed.
- R7's settings-source test was expanded from project and local refusal to all four independent locations. The full six-case file passed in 632. The test name reflects this expanded coverage.
- The load waits 435, 465 and 553 reached 20 minutes. Testing resumed after the Founder's quiet notices and the successful repeated waits in 454, 471 and 559. Run 611 started at a first reading of 4.17 following an approval delay after its successful wait and passed all five cases. Subsequent test approvals cover a separately logged load wait immediately before the Bun command in the same foreground shell.

All 31 deliberate changes were restored. They produced 32 targeted file runs. Every added test failed in at least one of them. 848-gate-parity.log, SHA-256 36622e73f22715a18e76d6a9952f272ed2946e57a77da23e5e2caf5629508628. The failure extracts below cover the complete Bun run from version through summary. Lines disallowed by the report format are cited in the source receipt. The result list before each extract omits timings and includes the other tests in that file.

R1 closed failure detail

Deliberate change. 149-repeat-break-diff.log, SHA-256 ea2a1cd4b916d95a8e4dd59701d5f4b6fc7c2ee197d27191e1d1d0c425036170.

FAIL  packages/supervisor/test/live-port.test.ts  the live port passes the session and signal and rejects untrusted failure detail
PASS  packages/supervisor/test/live-port.test.ts  a continuous failure before activation fails reattestation for its surface

Source: 152-break-test.log, SHA-256 7d9d45506b5712682a1511ecc707c7ea15c1965afef67797f2f80bbbb86125af.
Source line numbers cited for square brackets or a divider: 7, 20–21, 26.

bun test v1.4.2 (744846f84)

packages/supervisor/test/live-port.test.ts:
(lines omitted)
21 |       expect(result.ok).toBe(false);
22 |       if (result.ok) throw new Error("expected a failed build");
23 |       expect(result.failedStep).toBe("reattest");
24 |       expect(result.failure).toBe("reattestation_failed");
25 |       expect(result.detail).toBe("step=reattest execution=builder failure=reattestation_failed surface=claude-code cause=attestation_malformed");
                                 ^
error: expect(received).toBe(expected)

Expected: "step=reattest execution=builder failure=reattestation_failed surface=claude-code cause=attestation_malformed"
Received: "step=reattest execution=builder failure=reattestation_failed surface=claude-code cause=M1 synthetic refusal"

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/supervisor/test/live-port.test.ts:25:29)
(lines omitted)

 1 pass
 1 fail
 12 expect() calls
(lines omitted)

Restore verification

Source: 155-verify-repeat.log, SHA-256 4d8e9f7063a6e6b05aa86776edf3754f16f82db932974f2760b0931c0a64ae1d.

committed 50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d packages/supervisor/src/build.ts
restored 50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d packages/supervisor/src/build.ts
git status --porcelain for the restored path is empty

R1 monitor failure before activation

Deliberate change. 161-break-monitor-diff.log, SHA-256 d9590e77ffd7f13e56dd85a58a4994992f3493a3ba2831ac7b44122f5f274d49.

PASS  packages/supervisor/test/live-port.test.ts  the live port passes the session and signal and rejects untrusted failure detail
FAIL  packages/supervisor/test/live-port.test.ts  a continuous failure before activation fails reattestation for its surface

Source: 164-monitor-test.log, SHA-256 f7704054d61a75fb801b59618fa584664ef6730554932cf0514199c06c654a12.
Source line numbers cited for square brackets or a divider: 7, 21, 26.

bun test v1.4.2 (744846f84)

packages/supervisor/test/live-port.test.ts:
(lines omitted)
38 |         else monitorFailure!("identity_mismatch");
39 |         return { ok: true, evidenceKind: "actual_session", model: input.model, provider: input.provider };
40 |       },
41 |     });
42 |     try {
43 |       expect(result.ok).toBe(false);
                             ^
error: expect(received).toBe(expected)

Expected: false
Received: true

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/supervisor/test/live-port.test.ts:43:25)
(lines omitted)

 1 pass
 1 fail
 8 expect() calls
(lines omitted)

Restore verification

Source: 167-monitor-verified.log, SHA-256 03d25b7c4a606aa8338ca27dce3e667ec53005143b23bdbf5a88ce9e4d18050d.

committed 50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d packages/supervisor/src/build.ts
restored 50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d packages/supervisor/src/build.ts
git status --porcelain for the restored path is empty

R2 input encoder

Deliberate change. 182-encoder-diff.log, SHA-256 612cad54423f7cc4214c32a1dc1cf73e76427fa6de12b85fee039c90e4b65788.

FAIL  packages/adapter-claude-code/test/live.test.ts  Claude encodes one stream-json user line
PASS  packages/adapter-claude-code/test/live.test.ts  Claude subscribes first and accepts only complete firstParty identity evidence
PASS  packages/adapter-claude-code/test/live.test.ts  Claude rejects malformed, missing, duplicate and echoed events
PASS  packages/adapter-claude-code/test/live.test.ts  Claude rejects a tool call or a third round-trip
PASS  packages/adapter-claude-code/test/live.test.ts  Claude keeps the result deadline and closes on cancellation
PASS  packages/adapter-claude-code/test/live.test.ts  Claude hands a partial line to its monitor and interrupts on fallback or model drift

Source: 185-encoder-test.log, SHA-256 7c2146f45e5e90b02be40a3693815f871cbee87f2e1a8d14e2cac8f7b7d9603f.
Source line numbers cited for square brackets or a divider: 24–29, 34.

bun test v1.4.2 (744846f84)

packages/adapter-claude-code/test/live.test.ts:
28 |   } else throw new Error("unexpected successful attestation");
29 |   expect(wire.closed).toBe(1);
30 | }
31 |
32 | test("Claude encodes one stream-json user line", () => {
33 |   expect(encodeUserInput('say "hi"\n')).toBe('{"type":"user","message":{"role":"user","content":"say \\"hi\\"\\n"}}\n');
                                             ^
error: expect(received).toBe(expected)

- "{"type":"user","message":{"role":"user","content":"say \"hi\"\n"}}
+ "{"type":"user","message":{"role":"user","content":"changed"}}
  "

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:33:41)
(lines omitted)

 5 pass
 1 fail
 103 expect() calls
(lines omitted)

Restore verification

Source: 188-encoder-verified.log, SHA-256 25238bac7f38ed50210db27723267046817f99f21ea0e1208f35fcb36fe158d7.

committed 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
restored 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
git status --porcelain for the restored path is empty

R2 first-party evidence

Deliberate change. 190-provider-diff.log, SHA-256 3268b7a0e9cf34df123c9ba001ced75a5c6e275eaf9fbc97e5315bf6b9846a5f.

PASS  packages/adapter-claude-code/test/live.test.ts  Claude encodes one stream-json user line
FAIL  packages/adapter-claude-code/test/live.test.ts  Claude subscribes first and accepts only complete firstParty identity evidence
PASS  packages/adapter-claude-code/test/live.test.ts  Claude rejects malformed, missing, duplicate and echoed events
PASS  packages/adapter-claude-code/test/live.test.ts  Claude rejects a tool call or a third round-trip
PASS  packages/adapter-claude-code/test/live.test.ts  Claude keeps the result deadline and closes on cancellation
FAIL  packages/adapter-claude-code/test/live.test.ts  Claude hands a partial line to its monitor and interrupts on fallback or model drift

Source: 193-provider-test.log, SHA-256 8fd80090fd1520948978c07407cb4920d19d776f936249c9b529f13b6ed82343.
Source line numbers cited for square brackets or a divider: 7, 18–21, 27, 31, 34, 40, 45.

bun test v1.4.2 (744846f84)

packages/adapter-claude-code/test/live.test.ts:
(lines omitted)
23 |   wire.end();
24 |   const value = await verdict;
25 |   if (!value.ok) {
26 |     expect(value.surface).toBe("claude-code");
27 |     expect(value.cause).toBe(expected);
28 |   } else throw new Error("unexpected successful attestation");
                        ^
error: unexpected successful attestation
      at rejects (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:28:20)
      at async <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:52:12)
(lines omitted)
110 |     wire.text(JSON.stringify(result) + "\r\n" + nextAssistant + later.slice(0, 7));
111 |     expect((await verdict).ok).toBe(true);
112 |     wire.text(later.slice(7) + "\n");
113 |     wire.end();
114 |     while (!wire.closed) await Bun.sleep(1);
(lines omitted)
                                ^
error: expect(received).toEqual(expected)

(lines omitted)
-   "identity_mismatch",
+   "attestation_missing",
(lines omitted)

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:115:27)
(lines omitted)

 4 pass
 2 fail
 81 expect() calls
(lines omitted)

Restore verification

Source: 196-provider-verified.log, SHA-256 2dbaf61ce8c78a775bb9e1eea8c768eaae7be96834e5b8c0025a1000807ea617.

committed 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
restored 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
git status --porcelain for the restored path is empty

R2 echoed input

Deliberate change. 198-echo-diff.log, SHA-256 b591a4abbe04eeca870858e286d897682a1ec93ca9ca4def66119edc80ffaa94.

PASS  packages/adapter-claude-code/test/live.test.ts  Claude encodes one stream-json user line
PASS  packages/adapter-claude-code/test/live.test.ts  Claude subscribes first and accepts only complete firstParty identity evidence
FAIL  packages/adapter-claude-code/test/live.test.ts  Claude rejects malformed, missing, duplicate and echoed events
PASS  packages/adapter-claude-code/test/live.test.ts  Claude rejects a tool call or a third round-trip
PASS  packages/adapter-claude-code/test/live.test.ts  Claude keeps the result deadline and closes on cancellation
PASS  packages/adapter-claude-code/test/live.test.ts  Claude hands a partial line to its monitor and interrupts on fallback or model drift

Source: 201-echo-test.log, SHA-256 c5abb6b1ca639cf363ebdecc1f9efbb304c58a378fb2d36b59bfc974b596582a.
Source line numbers cited for square brackets or a divider: 7–8, 23–26, 31.

bun test v1.4.2 (744846f84)

packages/adapter-claude-code/test/live.test.ts:
(lines omitted)
22 |   wire.events(...events);
23 |   wire.end();
24 |   const value = await verdict;
25 |   if (!value.ok) {
26 |     expect(value.surface).toBe("claude-code");
27 |     expect(value.cause).toBe(expected);
                             ^
error: expect(received).toBe(expected)

Expected: "attestation_malformed"
Received: "attestation_missing"

      at rejects (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:27:25)
      at async <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:59:9)
(lines omitted)

 5 pass
 1 fail
 72 expect() calls
(lines omitted)

Restore verification

Source: 204-echo-verified.log, SHA-256 ea66052a07c581ba59eaec2b09bd5061a5a16ef7a9c6850752b181cc592960d4.

committed 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
restored 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
git status --porcelain for the restored path is empty

R2 round-trip bound

Deliberate change. 206-rounds-diff.log, SHA-256 886a00f19ef033b86d7a3b7beea8515203598c539f480707571acdaa37b33522.

PASS  packages/adapter-claude-code/test/live.test.ts  Claude encodes one stream-json user line
PASS  packages/adapter-claude-code/test/live.test.ts  Claude subscribes first and accepts only complete firstParty identity evidence
PASS  packages/adapter-claude-code/test/live.test.ts  Claude rejects malformed, missing, duplicate and echoed events
FAIL  packages/adapter-claude-code/test/live.test.ts  Claude rejects a tool call or a third round-trip
PASS  packages/adapter-claude-code/test/live.test.ts  Claude keeps the result deadline and closes on cancellation
PASS  packages/adapter-claude-code/test/live.test.ts  Claude hands a partial line to its monitor and interrupts on fallback or model drift

Source: 209-rounds-test.log, SHA-256 e7331d3f4d7da841240cf28d1f53f91db79977fbeeb18d61d444edf22a9ba075.
Source line numbers cited for square brackets or a divider: 7–9, 20–22, 27.

bun test v1.4.2 (744846f84)

packages/adapter-claude-code/test/live.test.ts:
(lines omitted)
23 |   wire.end();
24 |   const value = await verdict;
25 |   if (!value.ok) {
26 |     expect(value.surface).toBe("claude-code");
27 |     expect(value.cause).toBe(expected);
28 |   } else throw new Error("unexpected successful attestation");
                        ^
error: unexpected successful attestation
      at rejects (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:28:20)
      at async <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:82:9)
(lines omitted)

 5 pass
 1 fail
 100 expect() calls
(lines omitted)

Restore verification

Source: 212-rounds-verified.log, SHA-256 6ba4e39424b49d6816d7a4dc474bb2657637da53e07f1114d0dc815014310b82.

committed 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
restored 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
git status --porcelain for the restored path is empty

R2 deadline through result

Deliberate change. 214-result-time-diff.log, SHA-256 f1e7a57ec1cc04cb471747a10f32e46b81fcb3b73fd25fd6e61c1695cb8e9f26.

PASS  packages/adapter-claude-code/test/live.test.ts  Claude encodes one stream-json user line
PASS  packages/adapter-claude-code/test/live.test.ts  Claude subscribes first and accepts only complete firstParty identity evidence
PASS  packages/adapter-claude-code/test/live.test.ts  Claude rejects malformed, missing, duplicate and echoed events
PASS  packages/adapter-claude-code/test/live.test.ts  Claude rejects a tool call or a third round-trip
FAIL  packages/adapter-claude-code/test/live.test.ts  Claude keeps the result deadline and closes on cancellation
PASS  packages/adapter-claude-code/test/live.test.ts  Claude hands a partial line to its monitor and interrupts on fallback or model drift

Source: 217-result-time-test.log, SHA-256 bc7e6a4f917a689fa6c20614fa295568c06f75083b426fcfd346322ca5f48bea.
Source line numbers cited for square brackets or a divider: 7–10, 24–25, 30.

bun test v1.4.2 (744846f84)

packages/adapter-claude-code/test/live.test.ts:
(lines omitted)
92 |   const late = start();
93 |   late.wire.events(init, assistant);
94 |   const timer = setTimeout(() => late.wire.events(result), 30_100);
95 |   try {
96 |     const second = await late.verdict;
97 |     expect(second.ok ? "success" : second.cause).toBe("attestation_deadline");
                                                      ^
error: expect(received).toBe(expected)

Expected: "attestation_deadline"
Received: "success"

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:97:50)
(lines omitted)

 5 pass
 1 fail
 101 expect() calls
(lines omitted)

Restore verification

Source: 220-result-time-verified.log, SHA-256 3eae840a274efed4086003e34b54c78e706ab223fc6b70f17660fff44f100fe1.

committed 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
restored 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
git status --porcelain for the restored path is empty

R2 partial line

Deliberate change. 222-partial-diff.log, SHA-256 bfe6f1cadac9424d881dc58ac7f62d71f8338ecb7f10ab54fa5d62eae03c5da6.

PASS  packages/adapter-claude-code/test/live.test.ts  Claude encodes one stream-json user line
PASS  packages/adapter-claude-code/test/live.test.ts  Claude subscribes first and accepts only complete firstParty identity evidence
FAIL  packages/adapter-claude-code/test/live.test.ts  Claude rejects malformed, missing, duplicate and echoed events
PASS  packages/adapter-claude-code/test/live.test.ts  Claude rejects a tool call or a third round-trip
PASS  packages/adapter-claude-code/test/live.test.ts  Claude keeps the result deadline and closes on cancellation
FAIL  packages/adapter-claude-code/test/live.test.ts  Claude hands a partial line to its monitor and interrupts on fallback or model drift

Source: 225-partial-test.log, SHA-256 7d2af7e4295b95302369441e51b731bfe4f2052a86a43893bd4c6b4cbb2758e5.
Source line numbers cited for square brackets or a divider: 7–10, 14, 18, 20–21, 27–29, 35, 39, 42, 48, 53.

bun test v1.4.2 (744846f84)

packages/adapter-claude-code/test/live.test.ts:
(lines omitted)
72 |   const { wire, verdict } = start();
73 |   wire.events(init, assistant, result, result);
74 |   await verdict;
(lines omitted)
                             ^
error: expect(received).toEqual(expected)

(lines omitted)
-   "attestation_duplicate",
(lines omitted)

- Expected  - 3
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:75:25)
(lines omitted)
110 |     wire.text(JSON.stringify(result) + "\r\n" + nextAssistant + later.slice(0, 7));
111 |     expect((await verdict).ok).toBe(true);
112 |     wire.text(later.slice(7) + "\n");
113 |     wire.end();
114 |     while (!wire.closed) await Bun.sleep(1);
(lines omitted)
                                ^
error: expect(received).toEqual(expected)

(lines omitted)
-   "identity_mismatch",
+   "attestation_malformed",
(lines omitted)

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:115:27)
(lines omitted)

 4 pass
 2 fail
 96 expect() calls
(lines omitted)

Restore verification

Source: 228-partial-verified.log, SHA-256 ce961864bd663ffcdf85465a06c2497e9bd0c07c48988e17393c5c394edca06a.

committed 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
restored 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
git status --porcelain for the restored path is empty

R2 fallback

Deliberate change. 230-fallback-diff.log, SHA-256 49724513fa4d6e27b8c1da113d9dd09c84d244227162c59a18ca45a20a3200b6.

PASS  packages/adapter-claude-code/test/live.test.ts  Claude encodes one stream-json user line
PASS  packages/adapter-claude-code/test/live.test.ts  Claude subscribes first and accepts only complete firstParty identity evidence
FAIL  packages/adapter-claude-code/test/live.test.ts  Claude rejects malformed, missing, duplicate and echoed events
PASS  packages/adapter-claude-code/test/live.test.ts  Claude rejects a tool call or a third round-trip
PASS  packages/adapter-claude-code/test/live.test.ts  Claude keeps the result deadline and closes on cancellation
FAIL  packages/adapter-claude-code/test/live.test.ts  Claude hands a partial line to its monitor and interrupts on fallback or model drift

Source: 233-fallback-test.log, SHA-256 d3f22ef7035acdfbc4e79ff2ad2853faf9ec1bd924902697efe6bbd2677657d7.
Source line numbers cited for square brackets or a divider: 7–8, 23–25, 31, 35, 38, 44, 49.

bun test v1.4.2 (744846f84)

packages/adapter-claude-code/test/live.test.ts:
(lines omitted)
22 |   wire.events(...events);
23 |   wire.end();
24 |   const value = await verdict;
25 |   if (!value.ok) {
26 |     expect(value.surface).toBe("claude-code");
27 |     expect(value.cause).toBe(expected);
                             ^
error: expect(received).toBe(expected)

Expected: "identity_mismatch"
Received: "attestation_missing"

      at rejects (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:27:25)
      at async <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:71:9)
(lines omitted)
110 |     wire.text(JSON.stringify(result) + "\r\n" + nextAssistant + later.slice(0, 7));
111 |     expect((await verdict).ok).toBe(true);
112 |     wire.text(later.slice(7) + "\n");
113 |     wire.end();
114 |     while (!wire.closed) await Bun.sleep(1);
(lines omitted)
                                ^
error: expect(received).toEqual(expected)

(lines omitted)
-   "identity_mismatch",
+   "attestation_missing",
(lines omitted)

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:115:27)
(lines omitted)

 4 pass
 2 fail
 94 expect() calls
(lines omitted)

Restore verification

Source: 236-fallback-verified.log, SHA-256 5f7fd02465cca2f219e2eb1ff2590540d7ec554f5e0e6815239a30c287f49948.

committed 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
restored 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
git status --porcelain for the restored path is empty

R3 attestation write

Deliberate change. 268-first-write-diff.log, SHA-256 b9fe77ab045ad452083918929f6177bdbaf4461d95f62979402bf3bbf4b7c3d9.

FAIL  packages/adapter-madv-surface/test/live.test.ts  madv encodes no_tools only on the attestation message
PASS  packages/adapter-madv-surface/test/live.test.ts  madv requires init, model response, assistant and success in order
PASS  packages/adapter-madv-surface/test/live.test.ts  madv rejects attestation tools and extra round-trips by their typed cause
PASS  packages/adapter-madv-surface/test/live.test.ts  madv waits for result through its deadline and closes on cancellation
PASS  packages/adapter-madv-surface/test/live.test.ts  madv preserves a later partial event and checks later responses

Source: 271-first-write-test.log, SHA-256 1f1865b602f2af451c318d0784d4fc749c9168839cbb489690009b367adc2e57.
Source line numbers cited for square brackets or a divider: 12, 16, 22, 28–32, 37.

bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/live.test.ts:
37 |   const message = "synthetic";
38 |   expect(encodeUserInput(message)).toBe('{"type":"user","message":{"role":"user","content":"synthetic"}}\n');
39 |   expect(encodeAttestationInput(message)).toBe('{"type":"user","message":{"role":"user","content":"synthetic"},"no_tools":true}\n');
40 |   const { wire, verdict } = start();
41 |   expect(wire.opened).toBe(1);
(lines omitted)
                           ^
error: expect(received).toEqual(expected)

(lines omitted)

- "{"type":"user","message":{"role":"user","content":"Reply with your model identifier and nothing else."},"no_tools":true}
+ "{"type":"user","message":{"role":"user","content":"Reply with your model identifier and nothing else."}}
  "
  ,
(lines omitted)

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-madv-surface/test/live.test.ts:42:23)
(lines omitted)

 4 pass
 1 fail
 84 expect() calls
(lines omitted)

Restore verification

Source: 274-first-write-verified.log, SHA-256 d8d21e3d46ac052065fbf2cb941c008871fc5ba25a8c61c7f961f51b5ab70863.

committed 9442814dac30beae89dc1a9d21948671be66537382504b921755acf25cc249b5 packages/adapter-madv-surface/src/live.ts
restored 9442814dac30beae89dc1a9d21948671be66537382504b921755acf25cc249b5 packages/adapter-madv-surface/src/live.ts
git status --porcelain for the restored path is empty

R3 required assistant

Deliberate change. 276-assistant-diff.log, SHA-256 fcdcdb4202fbe813323e89954a9fabab92c957f864c6545d9df6b1b169981317.

PASS  packages/adapter-madv-surface/test/live.test.ts  madv encodes no_tools only on the attestation message
FAIL  packages/adapter-madv-surface/test/live.test.ts  madv requires init, model response, assistant and success in order
PASS  packages/adapter-madv-surface/test/live.test.ts  madv rejects attestation tools and extra round-trips by their typed cause
PASS  packages/adapter-madv-surface/test/live.test.ts  madv waits for result through its deadline and closes on cancellation
PASS  packages/adapter-madv-surface/test/live.test.ts  madv preserves a later partial event and checks later responses

Source: 279-assistant-test.log, SHA-256 f5a849cb736a45a89be896c534521b965864d9f0436000bf064223795f1d0961.
Source line numbers cited for square brackets or a divider: 7–8, 22–25, 30.

bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/live.test.ts:
(lines omitted)
23 |   const { wire, verdict } = start();
24 |   wire.events(...events);
25 |   wire.end();
26 |   const answer = await verdict;
27 |   expect(answer.ok).toBe(false);
                         ^
error: expect(received).toBe(expected)

Expected: false
Received: true

      at rejects (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-madv-surface/test/live.test.ts:27:21)
      at async <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-madv-surface/test/live.test.ts:56:9)
(lines omitted)

 4 pass
 1 fail
 38 expect() calls
(lines omitted)

Restore verification

Source: 282-assistant-verified.log, SHA-256 03a4b224117daadb72bfbe7cb38b2a16c696e20a62ed1b163b5658217b37003e.

committed 709381535e554e1fc54ac6ab0cd83afefbf0ed78d7265427e7d20204a2769796 packages/adapter-madv-surface/src/index.ts
restored 709381535e554e1fc54ac6ab0cd83afefbf0ed78d7265427e7d20204a2769796 packages/adapter-madv-surface/src/index.ts
git status --porcelain for the restored path is empty

R3 extra response

Deliberate change. 284-extra-diff.log, SHA-256 a4095aebe39b0e341fd418e14718a58907ee5980725b9e45e65fd8b7810dbcf3.

PASS  packages/adapter-madv-surface/test/live.test.ts  madv encodes no_tools only on the attestation message
PASS  packages/adapter-madv-surface/test/live.test.ts  madv requires init, model response, assistant and success in order
FAIL  packages/adapter-madv-surface/test/live.test.ts  madv rejects attestation tools and extra round-trips by their typed cause
PASS  packages/adapter-madv-surface/test/live.test.ts  madv waits for result through its deadline and closes on cancellation
PASS  packages/adapter-madv-surface/test/live.test.ts  madv preserves a later partial event and checks later responses

Source: 287-extra-test.log, SHA-256 d357cb89491f8903f834c0438f827c9d0cbdc09723b99d6b9a7406ed9bcd29e3.
Source line numbers cited for square brackets or a divider: 7–8, 23–25, 30.

bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/live.test.ts:
(lines omitted)
25 |   wire.end();
26 |   const answer = await verdict;
27 |   expect(answer.ok).toBe(false);
28 |   if (!answer.ok) {
29 |     expect(answer.surface).toBe("madv-surface");
30 |     expect(answer.cause).toBe(cause);
                              ^
error: expect(received).toBe(expected)

Expected: "attestation_round_trips"
Received: "identity_mismatch"

      at rejects (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-madv-surface/test/live.test.ts:30:26)
      at async <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-madv-surface/test/live.test.ts:75:9)
(lines omitted)

 4 pass
 1 fail
 87 expect() calls
(lines omitted)

Restore verification

Source: 290-extra-verified.log, SHA-256 c2e8677d04778ec82a22b99dda1ff8ba74f09136978da991931afb9ba5224047.

committed 709381535e554e1fc54ac6ab0cd83afefbf0ed78d7265427e7d20204a2769796 packages/adapter-madv-surface/src/index.ts
restored 709381535e554e1fc54ac6ab0cd83afefbf0ed78d7265427e7d20204a2769796 packages/adapter-madv-surface/src/index.ts
git status --porcelain for the restored path is empty

R3 deadline through result

Deliberate change. 292-result-time-diff.log, SHA-256 fcbd7da7e4a1625297a9884a1c42b3756865a8092c94f0e9f0eaae40c0f41498.

PASS  packages/adapter-madv-surface/test/live.test.ts  madv encodes no_tools only on the attestation message
PASS  packages/adapter-madv-surface/test/live.test.ts  madv requires init, model response, assistant and success in order
PASS  packages/adapter-madv-surface/test/live.test.ts  madv rejects attestation tools and extra round-trips by their typed cause
FAIL  packages/adapter-madv-surface/test/live.test.ts  madv waits for result through its deadline and closes on cancellation
PASS  packages/adapter-madv-surface/test/live.test.ts  madv preserves a later partial event and checks later responses

Source: 295-result-time-test.log, SHA-256 9d2724a8e4e18488afb6cfd89a728670f964b9248e28cd9762ad9146f930382b.
Source line numbers cited for square brackets or a divider: 7–9, 23–24, 29.

bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/live.test.ts:
(lines omitted)
82 |   expect(cancelled.wire.closed).toBe(1);
83 |   const late = start(); late.wire.events(init, response, assistant);
84 |   const cleanup = setTimeout(late.wire.end, 31_000);
85 |   try {
86 |     const timeout = await late.verdict;
87 |     expect(timeout.ok ? "unexpected success" : timeout.cause).toBe("attestation_deadline");
                                                                   ^
error: expect(received).toBe(expected)

Expected: "attestation_deadline"
Received: "identity_unavailable"

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-madv-surface/test/live.test.ts:87:63)
(lines omitted)

 4 pass
 1 fail
 87 expect() calls
(lines omitted)

Restore verification

Source: 298-result-time-verified.log, SHA-256 c3337b943a640d45d04918c01218c0ce49863195eeba921c28bd760bcf5f2e54.

committed 9442814dac30beae89dc1a9d21948671be66537382504b921755acf25cc249b5 packages/adapter-madv-surface/src/live.ts
restored 9442814dac30beae89dc1a9d21948671be66537382504b921755acf25cc249b5 packages/adapter-madv-surface/src/live.ts
git status --porcelain for the restored path is empty

R3 partial line

Deliberate change. 300-later-line-diff.log, SHA-256 25ae031dac4200f750fde30d2724d14890a496fca2f63ee865a72d4448d1333f.

PASS  packages/adapter-madv-surface/test/live.test.ts  madv encodes no_tools only on the attestation message
PASS  packages/adapter-madv-surface/test/live.test.ts  madv requires init, model response, assistant and success in order
PASS  packages/adapter-madv-surface/test/live.test.ts  madv rejects attestation tools and extra round-trips by their typed cause
PASS  packages/adapter-madv-surface/test/live.test.ts  madv waits for result through its deadline and closes on cancellation
FAIL  packages/adapter-madv-surface/test/live.test.ts  madv preserves a later partial event and checks later responses

Source: 303-later-line-test.log, SHA-256 b7fd5b1a2f67810450c2658259082dcd1b31cec6166dd829499b0839f37f25a6.
Source line numbers cited for square brackets or a divider: 7–10, 16, 20, 23, 29, 34.

bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/live.test.ts:
(lines omitted)
 99 |   if (answer.ok) expect(answer.sendUserInput("another synthetic request")).toBe(true);
100 |   wire.text(later.slice(7) + "\n");
101 |   wire.end();
102 |   while (!wire.closed) await Bun.sleep(1);
103 |   expect(wire.opened).toBe(1);
(lines omitted)
                              ^
error: expect(received).toEqual(expected)

(lines omitted)
-   "model_refused",
+   "identity_mismatch",
(lines omitted)

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-madv-surface/test/live.test.ts:104:25)
(lines omitted)

 4 pass
 1 fail
 88 expect() calls
(lines omitted)

Restore verification

Source: 306-later-line-verified.log, SHA-256 627761fa2797e6f39567f27931ac1e6857279ebfdf39760e4725d6cba0ca8fbf.

committed 709381535e554e1fc54ac6ab0cd83afefbf0ed78d7265427e7d20204a2769796 packages/adapter-madv-surface/src/index.ts
restored 709381535e554e1fc54ac6ab0cd83afefbf0ed78d7265427e7d20204a2769796 packages/adapter-madv-surface/src/index.ts
git status --porcelain for the restored path is empty

R4 registered authentication error

Deliberate change. 357-detector-diff.log, SHA-256 b8947d270891508313511671c5f9c0c0cf597f90a2152cf8388c823efccb887e.

FAIL  test/phase3b/detectors.test.ts  registration detectors identify auth expiry and attestation failures by surface

Source: 360-detector-test.log, SHA-256 4df44e1c40002c9c379178bad59ed2b8648707c5a1b17c3e46d8f230a7e75e47.
Source line numbers cited for square brackets or a divider: 9–10, 20, 25.

bun test v1.4.2 (744846f84)

test/phase3b/detectors.test.ts:
 9 |   const status = { kind: "auth_status", exitCode: 1 } as const;
10 |   expect(detectClaudeFailure(claude, status)).toEqual({ surface: "claude-code", cause: "auth_failed" });
(lines omitted)
13 |     const obs = { kind: "event", event: { type: "system", subtype: "api_retry", error } } as const;
14 |     expect(detectClaudeFailure(claude, obs)?.cause).toBe("auth_failed");
                                                         ^
error: expect(received).toBe(expected)

Expected: "auth_failed"
Received: undefined

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/detectors.test.ts:14:53)
(lines omitted)

 0 pass
 1 fail
 3 expect() calls
(lines omitted)

Restore verification

Source: 363-detector-verified.log, SHA-256 3d54384c4227845cea75b463e9457344f3d81cad286b3d32b6f89a932f8ed671.

committed 392e5916ec42785dc516af01234875e623c2537762fc998218869c53f92619b0 packages/adapter-claude-code/src/detectors.ts
restored 392e5916ec42785dc516af01234875e623c2537762fc998218869c53f92619b0 packages/adapter-claude-code/src/detectors.ts
git status --porcelain for the restored path is empty

R5 Darwin managed folder

Deliberate change. 389-darwin-map-diff.log, SHA-256 81c0f96ad9c2bc4fd4ae9f0e9b0820c4202e2f6ba7ca124c78020ba0bd4d1af0.

FAIL  test/phase3b/settings-sources.test.ts  managed settings selects the platform folder and refuses an unsupported platform
PASS  test/phase3b/settings-sources.test.ts  managed settings refuses unvalidated files and the governed remote copy
PASS  test/phase3b/settings-sources.test.ts  settings sources include the supplied user, managed, project and local directories

Source: 392-darwin-map-test.log, SHA-256 644be97f0b079dac742330fdeb5711f43dea5d668c756343334af6ee7258b842.
Source line numbers cited for square brackets or a divider: 20–22, 27.

bun test v1.4.2 (744846f84)

test/phase3b/settings-sources.test.ts:
 5 | import { settingsSources } from "../../apps/madbridge/src/tui/live/settings-sources";
 6 | import { offlineStart } from "./offline";
 7 |
 8 | test("managed settings selects the platform folder and refuses an unsupported platform", () => {
 9 |   const mac = "/Library/Application Support/ClaudeCode", linux = "/etc/claude-code";
10 |   expect(managedSettingsDirectory("darwin")).toBe(mac);
                                                  ^
error: expect(received).toBe(expected)

Expected: "/Library/Application Support/ClaudeCode"
Received: "/etc/claude-code"

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/settings-sources.test.ts:10:46)
(lines omitted)

 2 pass
 1 fail
 7 expect() calls
(lines omitted)

Restore verification

Source: 395-darwin-map-verified.log, SHA-256 9becc6c3916be0d6d17ea73526c49e7e087a6f4a2a030e6cd77b5e800eee4c5f.

committed 7cf332b08569ef5a5c710e4f7d341af49f49f74d20d21b27c3705a8c526bfd23 apps/madbridge/src/tui/live/managed-settings.ts
restored 7cf332b08569ef5a5c710e4f7d341af49f49f74d20d21b27c3705a8c526bfd23 apps/madbridge/src/tui/live/managed-settings.ts
git status --porcelain for the restored path is empty

R5 remote copy

Deliberate change. 397-remote-copy-diff.log, SHA-256 f059583d3cd29ab4978079c81694094f0e84a7228b8eec0ade2bc5607dd438c9.

PASS  test/phase3b/settings-sources.test.ts  managed settings selects the platform folder and refuses an unsupported platform
FAIL  test/phase3b/settings-sources.test.ts  managed settings refuses unvalidated files and the governed remote copy
PASS  test/phase3b/settings-sources.test.ts  settings sources include the supplied user, managed, project and local directories

Source: 400-remote-copy-test.log, SHA-256 4a23b853a81522ce6c48903ba2c079a03ad7f48ad31c27fcffbe27d8faed9d17.
Source line numbers cited for square brackets or a divider: 7, 21, 26, 33–34, 39.

bun test v1.4.2 (744846f84)

test/phase3b/settings-sources.test.ts:
(lines omitted)
31 |       writeFileSync(path, "{}");
32 |       expect(check()).toEqual({ ok: false, cause: "managed_settings_unvalidated_source" });
33 |       rmSync(path);
34 |     }
35 |     writeFileSync(join(f.config, "remote-settings.json"), "{}");
36 |     expect(check()).toEqual({ ok: false, cause: "managed_settings_remote_copy" });
                         ^
error: expect(received).toEqual(expected)

  {
-   "cause": "managed_settings_remote_copy",
-   "ok": false,
+   "ok": true,
(lines omitted)
+     "/Users/michaeldaley/.madbridge-m1-OrwCc8/config/settings.json",
+     "/Users/michaeldaley/.madbridge-m1-OrwCc8/managed/managed-settings.json",
+     "/Users/michaeldaley/.madbridge-m1-OrwCc8/work/.claude/settings.json",
+     "/Users/michaeldaley/.madbridge-m1-OrwCc8/work/.claude/settings.local.json",
(lines omitted)
  }

- Expected  - 2
+ Received  + 7

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/settings-sources.test.ts:36:21)
(lines omitted)

 2 pass
 1 fail
 11 expect() calls
(lines omitted)

Restore verification

Source: 403-remote-copy-verified.log, SHA-256 368c6e2fe56955af8bba44c2ed13e61a39399edf45c983fac6f3deeff5a60070.

committed d4a6e7d785fd82d3a31420783f1dd309ac137837c66f020a0c90b96d665ffbf9 apps/madbridge/src/tui/live/settings-sources.ts
restored d4a6e7d785fd82d3a31420783f1dd309ac137837c66f020a0c90b96d665ffbf9 apps/madbridge/src/tui/live/settings-sources.ts
git status --porcelain for the restored path is empty

R5 local settings path

Deliberate change. 405-local-path-diff.log, SHA-256 70e01e52ea7ea88eda454d2ec40bfd3868cfa8501ff4c03fd331272da69410a1.

PASS  test/phase3b/settings-sources.test.ts  managed settings selects the platform folder and refuses an unsupported platform
PASS  test/phase3b/settings-sources.test.ts  managed settings refuses unvalidated files and the governed remote copy
FAIL  test/phase3b/settings-sources.test.ts  settings sources include the supplied user, managed, project and local directories

Source: 408-local-path-test.log, SHA-256 06ffc04ae63ced672a51942b8b6eb69384fb5df2211a7a486fdf62a445698eb7.
Source line numbers cited for square brackets or a divider: 7–8, 14, 18, 23, 29, 34.

bun test v1.4.2 (744846f84)

test/phase3b/settings-sources.test.ts:
(lines omitted)
40 | test("settings sources include the supplied user, managed, project and local directories", () => {
41 |   const f = offlineStart();
42 |   try {
43 |     const sources = settingsSources(f.work, f.config, f.managed);
44 |     expect(sources.ok).toBe(true);
(lines omitted)
                                               ^
error: expect(received).toEqual(expected)

(lines omitted)
    "/Users/michaeldaley/.madbridge-m1-kqHqIv/config/settings.json",
    "/Users/michaeldaley/.madbridge-m1-kqHqIv/managed/managed-settings.json",
    "/Users/michaeldaley/.madbridge-m1-kqHqIv/work/.claude/settings.json",
-   "/Users/michaeldaley/.madbridge-m1-kqHqIv/work/.claude/settings.local.json",
(lines omitted)

- Expected  - 1
+ Received  + 0

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/settings-sources.test.ts:45:43)
(lines omitted)

 2 pass
 1 fail
 11 expect() calls
(lines omitted)

Restore verification

Source: 411-local-path-verified.log, SHA-256 2fbdb093582e1298565bd30c3a65ac9d54cc2216914181f32deb19a56d4de868.

committed d4a6e7d785fd82d3a31420783f1dd309ac137837c66f020a0c90b96d665ffbf9 apps/madbridge/src/tui/live/settings-sources.ts
restored d4a6e7d785fd82d3a31420783f1dd309ac137837c66f020a0c90b96d665ffbf9 apps/madbridge/src/tui/live/settings-sources.ts
git status --porcelain for the restored path is empty

R6 admitted updater value

Deliberate change. 425-updater-diff.log, SHA-256 4c1e90386e57c457ec0a3cda9c9dc95156d8aee0598864e15989735a25e4a01a.

PASS  packages/supervisor/test/preflight.test.ts  preflight fails with envelope_invalid
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with cardinality
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with repository_fingerprint
PASS  packages/supervisor/test/preflight.test.ts  preflight canonicalizes a symlink-named worktree and preserves the same-repository check
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with repository_fingerprint when the envelope names another checkout or commit
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with repository_fingerprint when the repository root and the worktree belong to different repositories
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with executable_unresolved
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with identity_mismatch
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with identity_mismatch when the independence domain differs from the registration
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with auth_not_ready
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with pair_ineligible
PASS  packages/supervisor/test/preflight.test.ts  preflight threads its fixture registration resolver through pair eligibility
PASS  packages/supervisor/test/preflight.test.ts  public preflight rejects fixture dependencies before and after a test-seam call
PASS  packages/supervisor/test/preflight.test.ts  fixture preflight keeps pair policy and registration overrides local to each call
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with storage_root_invalid
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with host_capability_missing
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with capability_record_stale
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with home_mismatch
PASS  packages/supervisor/test/preflight.test.ts  temporary path recording sees files a child creates and removes before returning
PASS  packages/supervisor/test/preflight.test.ts  the returned plan's repository fingerprint is frozen
PASS  packages/supervisor/test/preflight.test.ts  preflight creates nothing
PASS  packages/supervisor/test/preflight.test.ts  probe environment equals launch environment
PASS  packages/supervisor/test/preflight.test.ts  a cached attestation is not reused across sessions
PASS  packages/supervisor/test/preflight.test.ts  a surface without an actual-session identity primitive is ineligible
PASS  packages/supervisor/test/preflight.test.ts  missing TERM fails preflight as auth_not_ready
PASS  packages/supervisor/test/preflight.test.ts  missing TMPDIR fails preflight as auth_not_ready
PASS  packages/supervisor/test/preflight.test.ts  a caught MissingRequiredVariableError maps to auth_not_ready
PASS  packages/supervisor/test/preflight.test.ts  the auth probe enforces the 5,000 ms execution deadline
PASS  packages/supervisor/test/preflight.test.ts  the auth probe escalates SIGTERM to SIGKILL within the forced-cleanup budget
PASS  packages/supervisor/test/preflight.test.ts  the auth probe reaps the child successfully
PASS  packages/supervisor/test/preflight.test.ts  cleanup-budget exhaustion fails closed as auth_not_ready
FAIL  packages/supervisor/test/preflight.test.ts  preflight accepts the governed settings and each allowed setting value
FAIL  packages/supervisor/test/preflight.test.ts  preflight rejects every unlisted settings control and invalid value shape
FAIL  packages/supervisor/test/preflight.test.ts  preflight accepts the governed settings and each allowed setting value
FAIL  packages/supervisor/test/preflight.test.ts  preflight rejects every unlisted settings control and invalid value shape

Source: 428-updater-test.log, SHA-256 319f0ef2586eee93ae4470af18f7e9b3725f1f8c64da882f704fca97f8b757d9.
Source line numbers cited for square brackets or a divider: 7–37, 51, 54, 65, 68–69, 74.

bun test v1.4.2 (744846f84)

packages/supervisor/test/preflight.test.ts:
(lines omitted)
362 |         autoMemoryEnabled: false, disableAllHooks: true, disableClaudeAiConnectors: true, effortLevel: "high",
363 |         modelSettings: entries(7, i => ({ effortLevel: i % 2 ? "xhigh" : "high" })), agentPushNotifEnabled: true,
364 |         inputNeededNotifEnabled: true, autoCompactEnabled: true, verbose: true, editorMode: "normal", theme: "light-daltonized",
365 |         ...(host === "linux" ? { model: "claude-fable-5-2" } : {}),
366 |       });
367 |       expect(result.ok ? "pass" : result.failure).toBe("pass");
                                                        ^
error: expect(received).toBe(expected)

Expected: "pass"
Received: "auth_not_ready"

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/supervisor/test/preflight.test.ts:367:51)
(lines omitted)
395 |       { agentPushNotifEnabled: "true" }, { inputNeededNotifEnabled: 0 }, { autoCompactEnabled: null },
396 |       { editorMode: "emacs" }, { theme: "a".repeat(65) }, { theme: "abc_def" }, { theme: 1 }, { theme: "abc\n" },
(lines omitted)
398 |     for (const setting of cases) {
399 |       const value = await f.run(setting);
400 |       expect(value.ok ? "unexpected success" : value.failure).toBe("auth_not_ready");
                                                                    ^
error: expect(received).toBe(expected)

Expected: "auth_not_ready"
Received: "unexpected success"

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/supervisor/test/preflight.test.ts:400:63)
(lines omitted)

2 tests failed:
(lines omitted)

 31 pass
 2 fail
 373 expect() calls
(lines omitted)

Restore verification

Source: 431-updater-verified.log, SHA-256 59f88a6926c23fbf8e51b5ce16ff94662aefdba20be11dcacee1ea3469a9b43a.

committed 7021477b7ba80671ef457892af84a69170f4ba36300e60568372b19c595851f5 packages/supervisor/src/preflight.ts
restored 7021477b7ba80671ef457892af84a69170f4ba36300e60568372b19c595851f5 packages/supervisor/src/preflight.ts
git status --porcelain for the restored path is empty

R6 unlisted settings key

Deliberate change. 433-extra-setting-diff.log, SHA-256 716fcb2c66046ebb068fc745f541c1c51f221237df60d77b21448031bcd2907e.

PASS  packages/supervisor/test/preflight.test.ts  preflight fails with envelope_invalid
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with cardinality
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with repository_fingerprint
PASS  packages/supervisor/test/preflight.test.ts  preflight canonicalizes a symlink-named worktree and preserves the same-repository check
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with repository_fingerprint when the envelope names another checkout or commit
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with repository_fingerprint when the repository root and the worktree belong to different repositories
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with executable_unresolved
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with identity_mismatch
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with identity_mismatch when the independence domain differs from the registration
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with auth_not_ready
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with pair_ineligible
PASS  packages/supervisor/test/preflight.test.ts  preflight threads its fixture registration resolver through pair eligibility
PASS  packages/supervisor/test/preflight.test.ts  public preflight rejects fixture dependencies before and after a test-seam call
PASS  packages/supervisor/test/preflight.test.ts  fixture preflight keeps pair policy and registration overrides local to each call
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with storage_root_invalid
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with host_capability_missing
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with capability_record_stale
PASS  packages/supervisor/test/preflight.test.ts  preflight fails with home_mismatch
PASS  packages/supervisor/test/preflight.test.ts  temporary path recording sees files a child creates and removes before returning
PASS  packages/supervisor/test/preflight.test.ts  the returned plan's repository fingerprint is frozen
PASS  packages/supervisor/test/preflight.test.ts  preflight creates nothing
PASS  packages/supervisor/test/preflight.test.ts  probe environment equals launch environment
PASS  packages/supervisor/test/preflight.test.ts  a cached attestation is not reused across sessions
PASS  packages/supervisor/test/preflight.test.ts  a surface without an actual-session identity primitive is ineligible
PASS  packages/supervisor/test/preflight.test.ts  missing TERM fails preflight as auth_not_ready
PASS  packages/supervisor/test/preflight.test.ts  missing TMPDIR fails preflight as auth_not_ready
PASS  packages/supervisor/test/preflight.test.ts  a caught MissingRequiredVariableError maps to auth_not_ready
PASS  packages/supervisor/test/preflight.test.ts  the auth probe enforces the 5,000 ms execution deadline
PASS  packages/supervisor/test/preflight.test.ts  the auth probe escalates SIGTERM to SIGKILL within the forced-cleanup budget
PASS  packages/supervisor/test/preflight.test.ts  the auth probe reaps the child successfully
PASS  packages/supervisor/test/preflight.test.ts  cleanup-budget exhaustion fails closed as auth_not_ready
PASS  packages/supervisor/test/preflight.test.ts  preflight accepts the governed settings and each allowed setting value
FAIL  packages/supervisor/test/preflight.test.ts  preflight rejects every unlisted settings control and invalid value shape
FAIL  packages/supervisor/test/preflight.test.ts  preflight rejects every unlisted settings control and invalid value shape

Source: 455-extra-setting-test.log, SHA-256 62c746dd2aaed6ddc04de196f18568ddbef66f2fb82b4fe37d6d0f735e69f2df.
Source line numbers cited for square brackets or a divider: 7–38, 41, 52, 55, 60.

bun test v1.4.2 (744846f84)

packages/supervisor/test/preflight.test.ts:
(lines omitted)
395 |       { agentPushNotifEnabled: "true" }, { inputNeededNotifEnabled: 0 }, { autoCompactEnabled: null },
396 |       { editorMode: "emacs" }, { theme: "a".repeat(65) }, { theme: "abc_def" }, { theme: 1 }, { theme: "abc\n" },
(lines omitted)
398 |     for (const setting of cases) {
399 |       const value = await f.run(setting);
400 |       expect(value.ok ? "unexpected success" : value.failure).toBe("auth_not_ready");
                                                                    ^
error: expect(received).toBe(expected)

Expected: "auth_not_ready"
Received: "unexpected success"

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/supervisor/test/preflight.test.ts:400:63)
(lines omitted)

1 tests failed:
(lines omitted)

 32 pass
 1 fail
 384 expect() calls
(lines omitted)

Restore verification

Source: 458-extra-setting-verified.log, SHA-256 4b9ce236c8b96ee6e35b9ce5c96bd649db9f3e41199705134f15fd8d9e562387.

committed 7021477b7ba80671ef457892af84a69170f4ba36300e60568372b19c595851f5 packages/supervisor/src/preflight.ts
restored 7021477b7ba80671ef457892af84a69170f4ba36300e60568372b19c595851f5 packages/supervisor/src/preflight.ts
git status --porcelain for the restored path is empty

Addendum 2 unread input

Deliberate change. 593-break-host-echo-diff.log, SHA-256 1b50eb9e18ff7b1668dc4e62e46b2cdaeaefe30d68eb3d3eb82f46956054ffb6.

FAIL  test/phase3b/pty-input-echo.test.ts  the PTY host does not echo a line written before the child reads it

Source: 596-break-unread-test.log, SHA-256 a8c09d6fcb4d2bcf50a4a5dab607dd071278b7042dcb3e79a10ec3617ad3fae6.
Source line numbers cited for square brackets or a divider: 25, 30.

bun test v1.4.2 (744846f84)

test/phase3b/pty-input-echo.test.ts:
42 |         } else if (fact.kind === "exited") {
43 |           exitCode = fact.code;
44 |           host.closeStdin();
45 |         }
46 |       }
47 |       expect(output).toBe("received\r\n");
                          ^
error: expect(received).toBe(expected)

- "received
+ "synthetic input
+ received
  "

- Expected  - 1
+ Received  + 2

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/pty-input-echo.test.ts:47:22)
(lines omitted)

 0 pass
 1 fail
 1 expect() calls
(lines omitted)

Restore verification

Source: 603-verify-host-restore.log, SHA-256 92154a009171bc6b9883b8a78aff1e3937c9328047227ee4fa8b112aef7ac7e4.

committed 18d4acdd270d9c36b6d7a30748609eb6ccffef59b2adb359543e46575f76784f packages/pty-host/src/terminal.ts
restored 18d4acdd270d9c36b6d7a30748609eb6ccffef59b2adb359543e46575f76784f packages/pty-host/src/terminal.ts
git status --porcelain for the restored path is empty

Addendum 2 lifecycle output

Deliberate change. 593-break-host-echo-diff.log, SHA-256 1b50eb9e18ff7b1668dc4e62e46b2cdaeaefe30d68eb3d3eb82f46956054ffb6.

PASS  packages/pty-host/test/main-guard.test.ts  direct invocation without a control channel fails before PTY creation
PASS  packages/pty-host/test/main-guard.test.ts  a command-line executable path confers no launch authority
PASS  packages/pty-host/test/main-guard.test.ts  an ambient MADV_ variable confers no launch authority
PASS  packages/pty-host/test/main-guard.test.ts  the first frame must be a launch frame
PASS  packages/pty-host/test/main-guard.test.ts  an artifact hash mismatch fails closed with no child created
FAIL  packages/pty-host/test/main-guard.test.ts  a valid session lifecycle emits every fact in order exactly once, with no truncation
PASS  packages/pty-host/test/main-guard.test.ts  natural child exit without a terminate command publishes an exact marker, drained, and exited exactly once
PASS  packages/pty-host/test/main-guard.test.ts  a second launch frame is rejected, not ignored, and never creates another child
PASS  packages/pty-host/test/main-guard.test.ts  a malformed steady-state frame is diagnosed, fails non-zero, and closes the session exactly once
PASS  packages/pty-host/test/main-guard.test.ts  early child output cannot precede launched and ready, and is required, not merely allowed
PASS  packages/pty-host/test/main-guard.test.ts  RED (Task 41): await_pty path must not force-close the PTY master before natural ptyClosed settlement — the confirmed Linux data-loss defect
PASS  packages/pty-host/test/main-guard.test.ts  clean PTY closure: child exit alone cannot emit drained; output before closure is retained; closure precedes drained; drained precedes exited
PASS  packages/pty-host/test/main-guard.test.ts  PTY closure EIO after child exit is normal join success (Linux close representation), drained then exited
PASS  packages/pty-host/test/main-guard.test.ts  PTY closure timeout: a never-settling ptyClosed fails closed within an injected bound, no drained, no exited
PASS  packages/pty-host/test/main-guard.test.ts  post-closure callback: an output callback after markClosed() is recorded as an invariant failure, not silently accepted or dropped, and emits no late output fact
PASS  packages/pty-host/test/main-guard.test.ts  drain correctness: a large, spaced-out shutdown tail fully arrives before drained, which precedes exited
PASS  packages/pty-host/test/main-guard.test.ts  PTY closes first, child.exited resolves more than two event-loop turns later: normal lifecycle succeeds without false containment
PASS  packages/pty-host/test/main-guard.test.ts  PTY EIO (Linux normal-close representation) then child exit: join succeeds, no automatic live-child failure
PASS  packages/pty-host/test/main-guard.test.ts  PTY fails while child is authoritatively still alive: containment exactly once, reader closes, non-zero diagnostic, no drained/exited, no unhandled rejection, no real PID signaled
PASS  packages/pty-host/test/main-guard.test.ts  unexpected clean PTY closure while child authoritatively alive: contained exactly once, no drained/exited, no real PID signaled
PASS  packages/pty-host/test/main-guard.test.ts  a code-less generic SIGKILL failure propagates: fail-closed, no silent success
PASS  packages/pty-host/test/main-guard.test.ts  steady-state child-exit-first lifecycle is unchanged: no containment signal, drained only after clean PTY closure, then exited
PASS  packages/pty-host/test/main-guard.test.ts  production probe: reaped Bun child fields mean not running
PASS  packages/pty-host/test/main-guard.test.ts  production probe: kill(0) success with non-zombie process is running; ESRCH is not running
PASS  packages/pty-host/test/main-guard.test.ts  production probe: EPERM, EACCES, and unknown kill(0) errors fail closed as running
PASS  packages/pty-host/test/main-guard.test.ts  production probe: Linux /proc stat zombie parsing handles command names with parentheses
PASS  packages/pty-host/test/main-guard.test.ts  production probe: macOS ps zombie states including Z+ are recognized
PASS  packages/pty-host/test/main-guard.test.ts  production probe EPERM on PTY-first path contains once (fail closed), never successful join
FAIL  packages/pty-host/test/main-guard.test.ts  a valid session lifecycle emits every fact in order exactly once, with no truncation

Source: 598-break-lifecycle-test.log, SHA-256 f6b0343ad407b5b91467f653197b7e64b339d5ab0679f1bcebbaebbf09d7328b.
Source line numbers cited for square brackets or a divider: 7–11, 16, 29–51, 54, 59.

bun test v1.4.2 (744846f84)

packages/pty-host/test/main-guard.test.ts:
(lines omitted)
330 |     expect(kinds.filter((k) => k === kind)).toHaveLength(1);
331 |   }
332 |
333 |   const acks = facts.filter((f) => f.kind === "ack");
(lines omitted)
335 |   expect(outputText(facts)).toBe("ping\r\n");
                                  ^
error: expect(received).toBe(expected)

  "ping
+ ping
  "

- Expected  - 0
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/pty-host/test/main-guard.test.ts:335:29)
(lines omitted)

1 tests failed:
(lines omitted)

 27 pass
 1 fail
 701 expect() calls
(lines omitted)

Restore verification

Source: 603-verify-host-restore.log, SHA-256 92154a009171bc6b9883b8a78aff1e3937c9328047227ee4fa8b112aef7ac7e4.

committed 18d4acdd270d9c36b6d7a30748609eb6ccffef59b2adb359543e46575f76784f packages/pty-host/src/terminal.ts
restored 18d4acdd270d9c36b6d7a30748609eb6ccffef59b2adb359543e46575f76784f packages/pty-host/src/terminal.ts
git status --porcelain for the restored path is empty

R7 present

Deliberate change. 641-break-present-diff.log, SHA-256 59a240015c36d2888c32f7aba49b5beb56bfbf4e721fe60b3f66b4b668d1da16.

FAIL  test/phase3b/composition.test.ts  both stand-ins pass probes and attestation before present
PASS  test/phase3b/composition.test.ts  a failed health barrier exits nonzero naming the component
PASS  test/phase3b/composition.test.ts  a second attester invocation refuses the fourth call before the child receives it
PASS  test/phase3b/composition.test.ts  composition refuses disallowed user, managed, project and local settings before launch
PASS  test/phase3b/composition.test.ts  startup cancellation closes the subscription and ends the stand-in group
FAIL  test/phase3b/composition.test.ts  monitor failures after activation durably interrupt with the registered reason

Source: 644-break-present-test.log, SHA-256 e22b162aeb89eacccd8e473de4c183b00a243c139240f8b34c9e5ac89a92a25f.
Source line numbers cited for square brackets or a divider: 20–24, 27, 38, 43.

bun test v1.4.2 (744846f84)

test/phase3b/composition.test.ts:
3 |
4 | test("both stand-ins pass probes and attestation before present", async () => {
5 |   const result = await runOfflineScenario("healthy");
6 |   expect(result.detail).toBe("");
7 |   expect(result.code).toBe(0);
8 |   expect(result.activated).toBe(true);
                               ^
error: expect(received).toBe(expected)

Expected: true
Received: false

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/composition.test.ts:8:28)
(lines omitted)
56 |
57 | test("monitor failures after activation durably interrupt with the registered reason", async () => {
(lines omitted)
59 |     const result = await runOfflineScenario(mode);
60 |     expect(result.detail).toBe("");
61 |     expect(result.activated).toBe(true);
                                  ^
error: expect(received).toBe(expected)

Expected: true
Received: false

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/composition.test.ts:61:30)
(lines omitted)

 4 pass
 2 fail
 39 expect() calls
(lines omitted)

Restore verification

Source: 646-verify-present.log, SHA-256 fd7cd45cd86700f3921d72cd713fdd99dee400f38cc837f9484bf0ab877f3d50.

committed e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
restored e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
git status --porcelain for the restored path is empty

R7 component failure status

Deliberate change. 648-break-barrier-diff.log, SHA-256 6e31e3182452db33748db46f0e4ee7501d3946ce673c82001ff544235dc2c435.

PASS  test/phase3b/composition.test.ts  both stand-ins pass probes and attestation before present
FAIL  test/phase3b/composition.test.ts  a failed health barrier exits nonzero naming the component
PASS  test/phase3b/composition.test.ts  a second attester invocation refuses the fourth call before the child receives it
PASS  test/phase3b/composition.test.ts  composition refuses disallowed user, managed, project and local settings before launch
PASS  test/phase3b/composition.test.ts  startup cancellation closes the subscription and ends the stand-in group
PASS  test/phase3b/composition.test.ts  monitor failures after activation durably interrupt with the registered reason

Source: 651-break-barrier-test.log, SHA-256 4a7e1f348349e3c385c999c32542cbb9ff9c24ba9b50ce7e84233a3de252b7dd.
Source line numbers cited for square brackets or a divider: 7, 21–25, 30.

bun test v1.4.2 (744846f84)

test/phase3b/composition.test.ts:
(lines omitted)
18 |   }
19 | }, 45_000);
20 |
21 | test("a failed health barrier exits nonzero naming the component", async () => {
22 |   const result = await runOfflineScenario("barrier");
23 |   expect(result.code).toBe(1);
                           ^
error: expect(received).toBe(expected)

Expected: 1
Received: 0

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/composition.test.ts:23:23)
(lines omitted)

 5 pass
 1 fail
 64 expect() calls
(lines omitted)

Restore verification

Source: 653-verify-barrier.log, SHA-256 dad090b09fccbd790bb554354fce199086836bbc94310a7abb45e7d4c0972832.

committed e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
restored e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
git status --porcelain for the restored path is empty

R7 fourth call

Deliberate change. 655-break-budget-diff.log, SHA-256 66919ebafb10482dc3f68d9f720720a006ac9991b010b074dbda63a01b030b09.

PASS  test/phase3b/composition.test.ts  both stand-ins pass probes and attestation before present
PASS  test/phase3b/composition.test.ts  a failed health barrier exits nonzero naming the component
FAIL  test/phase3b/composition.test.ts  a second attester invocation refuses the fourth call before the child receives it
PASS  test/phase3b/composition.test.ts  composition refuses disallowed user, managed, project and local settings before launch
PASS  test/phase3b/composition.test.ts  startup cancellation closes the subscription and ends the stand-in group
PASS  test/phase3b/composition.test.ts  monitor failures after activation durably interrupt with the registered reason

Source: 658-break-budget-test.log, SHA-256 0249aa02ed6103f6d0649a00b44b1d1296a76f36132ddcddce380793e07898b6.
Source line numbers cited for square brackets or a divider: 7–8, 12, 22–25, 30.

bun test v1.4.2 (744846f84)

test/phase3b/composition.test.ts:
(lines omitted)
27 | }, 45_000);
28 |
29 | test("a second attester invocation refuses the fourth call before the child receives it", async () => {
(lines omitted)
31 |     const result = await repeatInstalledAttester(surface);
32 |     expect(result.detail).toContain("surface=" + surface + " cause=attestation_budget_exhausted");
                               ^
error: expect(received).toContain(expected)

Expected to contain: "surface=claude-code cause=attestation_budget_exhausted"
Received: "unexpected success"

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/composition.test.ts:32:27)
(lines omitted)

 5 pass
 1 fail
 62 expect() calls
(lines omitted)

Restore verification

Source: 660-verify-budget.log, SHA-256 79131a7c844dc310f454aa24ea277a3073aa10639b95db387cc94d3079d26c99.

committed e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
restored e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
git status --porcelain for the restored path is empty

R7 missing local settings source

Deliberate change. 662-break-settings-diff.log, SHA-256 04dfcaafa5cc879d9bfdd461132c5f6bf387647cec76bd9d13869a0cc911ea40.

PASS  test/phase3b/composition.test.ts  both stand-ins pass probes and attestation before present
PASS  test/phase3b/composition.test.ts  a failed health barrier exits nonzero naming the component
PASS  test/phase3b/composition.test.ts  a second attester invocation refuses the fourth call before the child receives it
FAIL  test/phase3b/composition.test.ts  composition refuses disallowed user, managed, project and local settings before launch
PASS  test/phase3b/composition.test.ts  startup cancellation closes the subscription and ends the stand-in group
PASS  test/phase3b/composition.test.ts  monitor failures after activation durably interrupt with the registered reason

Source: 665-break-settings-test.log, SHA-256 2f218b65355bf500f0f4ce2ba76dda9025b81e25cde4ad99ec6cdb936c6056dc.
Source line numbers cited for square brackets or a divider: 7–9, 13, 23–25, 30.

bun test v1.4.2 (744846f84)

test/phase3b/composition.test.ts:
(lines omitted)
36 | }, 90_000);
37 |
38 | test("composition refuses disallowed user, managed, project and local settings before launch", async () => {
(lines omitted)
40 |     const result = await runOfflineScenario(location);
41 |     expect(result.code).toBe(1);
                             ^
error: expect(received).toBe(expected)

Expected: 1
Received: 0

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/composition.test.ts:41:25)
(lines omitted)

 5 pass
 1 fail
 63 expect() calls
(lines omitted)

Restore verification

Source: 667-verify-settings.log, SHA-256 3da20117b9aa67b58d7298509ba1d8f81cdc90f140d29fccb9f5f5dd45382b13.

committed e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
restored e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
git status --porcelain for the restored path is empty

R7 foreground cancellation

Deliberate change. 669-break-cancel-diff.log, SHA-256 596c3d306e7ac37cafd66c2378b48c1d213ed2f2d5ade7e880a6a8a5a275eabe.

PASS  test/phase3b/composition.test.ts  both stand-ins pass probes and attestation before present
PASS  test/phase3b/composition.test.ts  a failed health barrier exits nonzero naming the component
PASS  test/phase3b/composition.test.ts  a second attester invocation refuses the fourth call before the child receives it
PASS  test/phase3b/composition.test.ts  composition refuses disallowed user, managed, project and local settings before launch
FAIL  test/phase3b/composition.test.ts  startup cancellation closes the subscription and ends the stand-in group
PASS  test/phase3b/composition.test.ts  monitor failures after activation durably interrupt with the registered reason

Source: 672-break-cancel-test.log, SHA-256 d18cb55c49646d8f1ea4cbfdb65f03f297350140cec45e4fddb8bb02cda5d0cb.
Source line numbers cited for square brackets or a divider: 7–10, 24–25, 30.

bun test v1.4.2 (744846f84)

test/phase3b/composition.test.ts:
(lines omitted)
46 |   }
47 | }, 45_000);
48 |
49 | test("startup cancellation closes the subscription and ends the stand-in group", async () => {
50 |   const result = await runOfflineScenario("cancel");
51 |   expect(result.detail).toContain("surface=claude-code cause=attestation_cancelled");
                             ^
error: expect(received).toContain(expected)

Expected to contain: "surface=claude-code cause=attestation_cancelled"
Received: "step=reattest execution=builder failure=reattestation_failed surface=claude-code cause=attestation_deadline"

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/composition.test.ts:51:25)
(lines omitted)

 5 pass
 1 fail
 64 expect() calls
(lines omitted)

Restore verification

Source: 674-verify-cancel.log, SHA-256 f063fe590fcc4d83b4aacf1497e82f6df77676e1d7c19b7ee74c6f3007522ba9.

committed e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
restored e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
git status --porcelain for the restored path is empty

R7 active monitor interruption

Deliberate change. 676-break-monitor-diff.log, SHA-256 22651aa9a92176c911dff50f7f2c12d725801b531ab71a9dfcaf4b921d13794d.

PASS  test/phase3b/composition.test.ts  both stand-ins pass probes and attestation before present
PASS  test/phase3b/composition.test.ts  a failed health barrier exits nonzero naming the component
PASS  test/phase3b/composition.test.ts  a second attester invocation refuses the fourth call before the child receives it
PASS  test/phase3b/composition.test.ts  composition refuses disallowed user, managed, project and local settings before launch
PASS  test/phase3b/composition.test.ts  startup cancellation closes the subscription and ends the stand-in group
FAIL  test/phase3b/composition.test.ts  monitor failures after activation durably interrupt with the registered reason

Source: 679-break-monitor-test.log, SHA-256 6c60e6e220c55e29cbe0f168852baae2e3cfa47b4c14b4e2925bb645ab94c2e5.
Source line numbers cited for square brackets or a divider: 7–11, 15, 25, 30.

bun test v1.4.2 (744846f84)

test/phase3b/composition.test.ts:
(lines omitted)
55 | }, 45_000);
56 |
57 | test("monitor failures after activation durably interrupt with the registered reason", async () => {
(lines omitted)
59 |     const result = await runOfflineScenario(mode);
60 |     expect(result.detail).toBe("");
                               ^
error: expect(received).toBe(expected)

Expected: ""
Received: "present"

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/composition.test.ts:60:27)
(lines omitted)

 5 pass
 1 fail
 58 expect() calls
(lines omitted)

Restore verification

Source: 681-verify-monitor.log, SHA-256 5aa598c6cbe0a9f2da2a99c904eac121fe377566431f623bffa00ffbb166ff38.

committed 50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d packages/supervisor/src/build.ts
restored 50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d packages/supervisor/src/build.ts
git status --porcelain for the restored path is empty

R8 response id precedence

Deliberate change. 709-break-precedence-diff.log, SHA-256 483ddfcf61561ca650d0994fd2bbd6949de90a043515048dc4af6cd02852c51f.

FAIL  packages/adapter-madv-surface/test/response-precedence.test.ts  refused and unknown model families precede a missing response id

Source: 712-break-precedence-test.log, SHA-256 a579f1a0b6f73ae454e4ec543fe3fb7e4d62ec7ea9a1e1a9718348c953a5cd30.
Source line numbers cited for square brackets or a divider: 9, 12, 16, 21, 27, 32.

bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/response-precedence.test.ts:
12 |       response_independence_domain: "minimax", tls_verified_host: "api.minimax.io" };
13 |     const stream = JSON.stringify(init) + "\n" + JSON.stringify(response) + "\n";
(lines omitted)
15 |     return result.ok ? "accepted" : result.cause;
16 |   });
(lines omitted)
                        ^
error: expect(received).toEqual(expected)

(lines omitted)
-   "model_refused",
-   "domain_unresolved",
+   "identity_mismatch",
+   "identity_mismatch",
(lines omitted)

- Expected  - 2
+ Received  + 2

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-madv-surface/test/response-precedence.test.ts:17:20)
(lines omitted)

 0 pass
 1 fail
 1 expect() calls
(lines omitted)

Restore verification

Source: 714-verify-precedence.log, SHA-256 39db7a25077b2ac401db8768e7551d9edb9cb43d610cef2337debdcae6d361b1.

committed c3a4fcf9370dc3b6408d665d4b5006b311433c85e1adced552f6b1926e40082c packages/adapter-madv-surface/src/index.ts
restored c3a4fcf9370dc3b6408d665d4b5006b311433c85e1adced552f6b1926e40082c packages/adapter-madv-surface/src/index.ts
git status --porcelain for the restored path is empty

R8 required authentication variable

Deliberate change. 716-break-required-diff.log, SHA-256 9fc742ad0aa15fb10ca5cfd716a92007c2c3eec64cdb7ffb37a62e59a03af049.

PASS  packages/supervisor/test/madv-allowlist.test.ts  madv-surface-v1 selects exactly the B6 variable set
FAIL  packages/supervisor/test/madv-allowlist.test.ts  madv allowlist pins the required and secret attribute of every variable

Source: 719-break-required-test.log, SHA-256 a973b5a341a1a166ca9e9fc70782ef794e90053627321a398743ea9eda461e12.
Source line numbers cited for square brackets or a divider: 7, 10, 33, 38.

bun test v1.4.2 (744846f84)

packages/supervisor/test/madv-allowlist.test.ts:
(lines omitted)
21 |   for (const name of names) {
22 |     const remaining = { ...synthetic };
(lines omitted)
24 |     if (required.includes(name)) {
25 |       expect(() => buildAllowlistedEnvironment(registration, remaining))
26 |         .toThrow("Missing required environment variable " + name + " for madv-surface-v1");
              ^
error: expect(received).toThrow(expected)

Expected substring: "Missing required environment variable MINIMAX_API_KEY for madv-surface-v1"

Received function did not throw
Received value: {
  HOME: "offline-value-HOME.",
  PATH: "offline-value-PATH.",
  SHELL: "offline-value-SHELL.",
  TERM: "offline-value-TERM.",
  TMPDIR: "offline-value-TMPDIR.",
  LANG: "offline-value-LANG.",
  LC_ALL: "offline-value-LC_ALL.",
  LC_CTYPE: "offline-value-LC_CTYPE.",
  USER: "offline-value-USER.",
}

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/supervisor/test/madv-allowlist.test.ts:26:10)
(lines omitted)

 1 pass
 1 fail
 8 expect() calls
(lines omitted)

Restore verification

Source: 721-verify-required.log, SHA-256 52894c23f7729a2162e225822baef7ac378c4b0488d29a917d3c6350be3d1057.

committed 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb packages/supervisor/src/environment.ts
restored 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb packages/supervisor/src/environment.ts
git status --porcelain for the restored path is empty

R8 application seam import

Deliberate change. 723-break-import-diff.log, SHA-256 35fca757df0d9b79d6dfde33f1fdc448261fcd2f7270551bc8df4a6d1cc209bd.

FAIL  test/phase3b/separation.test.ts  application code imports neither internal supervisor seam
PASS  test/phase3b/separation.test.ts  the original public build still fails closed without an attester

Source: 726-break-import-test.log, SHA-256 f7349f99c50011559e841972b9664cf7d4db505d01a35fcfd88545c6566b54fe.
Source line numbers cited for square brackets or a divider: 12, 16–17, 19, 25–26, 31.

bun test v1.4.2 (744846f84)

test/phase3b/separation.test.ts:
41 |   for (const path of appSources(apps)) {
42 |     const text = readFileSync(path, "utf8");
43 |     if (!text.includes("WithDependencies") && !text.includes("supervisor/src/")) continue;
44 |     if (usesSeam(ts.createSourceFile(path, text, ts.ScriptTarget.Latest))) imports.push(path);
45 |   }
(lines omitted)
                       ^
error: expect(received).toEqual(expected)

(lines omitted)
+   "/Users/michaeldaley/builds/m1-r1/tui/apps/madbridge/src/tui/live/stand-in-import-break.ts",
(lines omitted)

- Expected  - 1
+ Received  + 3

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/separation.test.ts:46:19)
(lines omitted)

 1 pass
 1 fail
 6 expect() calls
(lines omitted)

Restore verification

Source: 728-verify-import.log, SHA-256 90ea6bbf8566d11ad2b3c4357433304b8300abcf4b4cf09f4790a074fd87e08e.

absent apps/madbridge/src/tui/live/stand-in-import-break.ts
git status is empty

R8 missing legacy attester

Deliberate change. 730-break-legacy-diff.log, SHA-256 0803734f2415e2a8856b5cd57696ed99f5213dd0dca0b6a8d1c9f9e68a9949f5.

PASS  test/phase3b/separation.test.ts  application code imports neither internal supervisor seam
FAIL  test/phase3b/separation.test.ts  the original public build still fails closed without an attester

Source: 733-break-legacy-test.log, SHA-256 2a14ee25365b5264be8ca2ad784c2d8ddb8d1d912930bec9661c842b94aef4df.
Source line numbers cited for square brackets or a divider: 7, 21, 26.

bun test v1.4.2 (744846f84)

test/phase3b/separation.test.ts:
(lines omitted)
51 |   try {
52 |     const result = await runTransactionalBuild({
53 |       sessionId: "offline-no-attester", envelope: fixture.envelope, plan: fixture.plan,
54 |     });
55 |     try {
56 |       expect(result.ok).toBe(false);
                             ^
error: expect(received).toBe(expected)

Expected: false
Received: true

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/separation.test.ts:56:25)
(lines omitted)

 1 pass
 1 fail
 2 expect() calls
(lines omitted)

Restore verification

Source: 735-verify-legacy.log, SHA-256 5d4bf1493b463da20284154ddc898234ad2bd109360118da036b5c6a987c6114.

committed 50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d packages/supervisor/src/build.ts
restored 50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d packages/supervisor/src/build.ts
git status --porcelain for the restored path is empty

5. Existing tests changed

test/phase3a/harness-separation.test.ts, line 30. DEC-20261024-01 B1 and B2 and DEC-20261123-01 B22 require repinning the digest. Its single allowed computed call is preserved.
packages/pty-host/test/main-guard.test.ts, lines 309 and 335. Addendum 2 B1 item 2 changes the expected echoed bytes to the single child-produced line.
packages/supervisor/test/preflight.test.ts, lines 332–403. B19 and the second entry of EXISTING TESTS authorize these added tests. The existing refusal cases still pass.
packages/supervisor/test/madv-allowlist.test.ts, line 3 and lines 13–35. B21 item 11 and the third entry of EXISTING TESTS authorize the test and its import.
The protected build-rollback tests and all other pre-existing test and fixture files have no changes.

Head-relative line numbers: 832-existing-test-lines.log, SHA-256 b89c652fa08eaf2eaa554d72e9a673b82ab231b2d4ef9050ce60390bd0afb270. Diffs in this report have trailing whitespace removed. The receipts retain the raw Git output.

Source: 831-existing-test-diff.log, SHA-256 a51d9dbfd5901a14d04b978da022f2a2ade207032c05d1dc29fe2929ed5c9e3f.
Source line numbers cited for square brackets or a divider: 19, 38, 44–47, 51, 59–60, 62, 69–71, 81, 96, 98, 110, 113, 116, 118, 125, 127–130, 133, 137, 149, 152–153.

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
(lines omitted)
-  expect(outputText(facts)).toBe("ping\r\nping\r\n");
+  expect(outputText(facts)).toBe("ping\r\n");

   const termStartedIdx = kinds.indexOf("termination_started");
   const terminateAckIdx = facts.findIndex((f) => f.kind === "ack" && f.ofKind === "terminate");
diff --git a/packages/supervisor/test/madv-allowlist.test.ts b/packages/supervisor/test/madv-allowlist.test.ts
index b33990e..4e0f358 100644
--- a/packages/supervisor/test/madv-allowlist.test.ts
+++ b/packages/supervisor/test/madv-allowlist.test.ts
@@ -1,6 +1,6 @@
 import { expect, test } from "bun:test";
 import { ADAPTER_REGISTRY, parseSurfaceId } from "@madventures/protocol";
-import { buildAllowlistedEnvironment } from "../src/environment";
+import { buildAllowlistedEnvironment, redact } from "../src/environment";

 test("madv-surface-v1 selects exactly the B6 variable set", () => {
   const registration = ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))!;
@@ -10,3 +10,26 @@ test("madv-surface-v1 selects exactly the B6 variable set", () => {
(lines omitted)
   expect(Object.keys(buildAllowlistedEnvironment(registration, ambient)).sort()).toEqual(approved.sort());
 });
+
+test("madv allowlist pins the required and secret attribute of every variable", () => {
+  const registration = ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))!;
(lines omitted)
+
+  for (const name of names) {
+    const remaining = { ...synthetic };
(lines omitted)
+    if (required.includes(name)) {
+      expect(() => buildAllowlistedEnvironment(registration, remaining))
+        .toThrow("Missing required environment variable " + name + " for madv-surface-v1");
+    } else {
+      expect(buildAllowlistedEnvironment(registration, remaining)).toEqual(remaining);
+    }
+  }
(lines omitted)
+  expect(redacted.text).toBe(names.map(name =>
(lines omitted)
+});
diff --git a/packages/supervisor/test/preflight.test.ts b/packages/supervisor/test/preflight.test.ts
index f8f117a..ba5d71e 100644
--- a/packages/supervisor/test/preflight.test.ts
+++ b/packages/supervisor/test/preflight.test.ts
@@ -329,3 +329,75 @@ test("the auth probe enforces the 5,000 ms execution deadline", async () => { co
(lines omitted)
+
+import { offlineStart } from "../../../test/phase3b/offline";
+import { offlinePreflight } from "../../../test/phase3b/preflight-input";
+
+function governedSettingsFixture() {
+  const f = offlineStart();
+  try {
+    const input = offlinePreflight(f);
+    const path = join(f.config, "settings.json");
(lines omitted)
+    const run = async (settings: unknown) => {
+      writeFileSync(path, JSON.stringify(settings));
+      return runPurePreflightWithDependencies(input, { probe: async request => ({
+        ok: true, diagnostic: { result: "pass", primitive: request.kind === "auth" ? "auth status" : "system/init",
+          exitCode: 0, signal: null, stdoutBytes: 0, stderrBytes: 0 },
+      }) });
+    };
+    return { run, dispose: f.dispose };
+  } catch (error) { f.dispose(); throw error; }
+}
+
+test("preflight accepts the governed settings and each allowed setting value", async () => {
+  const f = governedSettingsFixture();
+  const entries = (n: number, value: (i: number) => unknown) =>
(lines omitted)
+  try {
(lines omitted)
+      const result = await f.run({
+        env: { DISABLE_AUTOUPDATER: "1" }, permissions: { defaultMode: "dontAsk", deny: Array.from({ length: 27 }, (_, i) => "deny-" + i) },
+        enabledPlugins: entries(host === "darwin" ? 134 : 142, () => false), skillOverrides: entries(17, () => "off"),
+        autoMemoryEnabled: false, disableAllHooks: true, disableClaudeAiConnectors: true, effortLevel: "high",
+        modelSettings: entries(7, i => ({ effortLevel: i % 2 ? "xhigh" : "high" })), agentPushNotifEnabled: true,
+        inputNeededNotifEnabled: true, autoCompactEnabled: true, verbose: true, editorMode: "normal", theme: "light-daltonized",
+        ...(host === "linux" ? { model: "claude-fable-5-2" } : {}),
+      });
+      expect(result.ok ? "pass" : result.failure).toBe("pass");
+      if (result.ok) expect(result.plan.executions.some(e => "DISABLE_AUTOUPDATER" in e.environment)).toBe(false);
+    }
(lines omitted)
+      expect((await f.run({ effortLevel, modelSettings: { example: { effortLevel } } })).ok).toBe(true);
+    }
(lines omitted)
+      { agentPushNotifEnabled: false, inputNeededNotifEnabled: false, autoCompactEnabled: false, verbose: false },
+      { theme: "", editorMode: "vim" }, { theme: "Az-9".repeat(16) },
(lines omitted)
+      { env: { TERM: "xterm-256color" } },
(lines omitted)
+  } finally { f.dispose(); }
+}, 30_000);
+
+test("preflight rejects every unlisted settings control and invalid value shape", async () => {
+  const f = governedSettingsFixture();
+  try {
(lines omitted)
+      { unlisted: true }, { env: { DISABLE_AUTOUPDATER: 1 } }, { env: { DISABLE_AUTOUPDATER: "0" } },
(lines omitted)
+      { skillOverrides: null }, { skillOverrides: { a: false } }, { autoMemoryEnabled: true }, { disableAllHooks: false },
+      { disableClaudeAiConnectors: false }, { model: "other" }, { model: null }, { effortLevel: "other" },
(lines omitted)
+      { modelSettings: { a: { effortLevel: "low", model: "other" } } }, { modelSettings: { a: "high" } }, { verbose: 1 },
+      { agentPushNotifEnabled: "true" }, { inputNeededNotifEnabled: 0 }, { autoCompactEnabled: null },
+      { editorMode: "emacs" }, { theme: "a".repeat(65) }, { theme: "abc_def" }, { theme: 1 }, { theme: "abc\n" },
(lines omitted)
+    for (const setting of cases) {
+      const value = await f.run(setting);
+      expect(value.ok ? "unexpected success" : value.failure).toBe("auth_not_ready");
+    }
+  } finally { f.dispose(); }
+}, 30_000);
diff --git a/test/phase3a/harness-separation.test.ts b/test/phase3a/harness-separation.test.ts
index d3221df..326687a 100644
--- a/test/phase3a/harness-separation.test.ts
+++ b/test/phase3a/harness-separation.test.ts
@@ -27,7 +27,7 @@ const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> =
(lines omitted)
   },
   "packages/supervisor/src/build.ts": {
(lines omitted)
   },
 };

6. Commit history and attribution checks

0cb595500c5775d6d77a64fe01fd723100b1bf1f  parent 75aec139d503cbe1d34d0c6f3ac5bd514339570e
docs(verification): open the M1 build log with its task detail
Width and three final trailers verified. 089-message-opening.log, SHA-256 ffb6ca115cf0a22f40a0ad2c30df24872fda18010d5ec036106277c6236fc4f0

9542eb4b27f0ce009a389feb50d8eff68e7f0878  parent 0cb595500c5775d6d77a64fe01fd723100b1bf1f
feat(supervisor): install live attesters through the production build
Width and three final trailers verified. 114-r1-message-check.log, SHA-256 d81ffe66ea31521e05886f9282a63ee1bd8586babeea32b42b79af87bb93b813

dd19008a74a2ffbd85703f9dbb031a23e8571702  parent 9542eb4b27f0ce009a389feb50d8eff68e7f0878
test(supervisor): bound live-port failure diagnostics
Width and three final trailers verified. 146-fix-trailers.log, SHA-256 2ea8b955385e07f5c84a9ddc3f30d2e0a8953b58da4728da54fc70e3d10e47e4

0b85d3a2403527eb08182f96843b97b58db5d9c4  parent dd19008a74a2ffbd85703f9dbb031a23e8571702
feat(claude-code): attest and monitor the governed response stream
Width and three final trailers verified. 176-r2-message-check.log, SHA-256 b255ee4547dcc21bb8ea9e14742dcc9ba0b0423b1de66c897947e7c002bd957f

54eee8cdcb6703d7c1addf6b643ad0eefec75811  parent 0b85d3a2403527eb08182f96843b97b58db5d9c4
feat(madv): attest the first request and monitor later responses
Width and three final trailers verified. 262-r3-trailers.log, SHA-256 b0f4c3c05fc8a0882756c681466c5d80ed1265fab15ab41c9debc0a8869d6431

16a11409c10787f7413d0b99493b0938567e5eee  parent 54eee8cdcb6703d7c1addf6b643ad0eefec75811
feat(adapters): detect registered authentication and identity failures
Width and three final trailers verified. 348-new-r4-trailers.log, SHA-256 a66b44145029e6e3da0ae1f1f07ca992aa67d5a4291c35820f064a5e9011fee6

68ac32c85278d27eb76541ea9d7f18a0a12f87ed  parent 16a11409c10787f7413d0b99493b0938567e5eee
feat(tui): check managed policy and resolve settings sources
Width and three final trailers verified. 381-r5-trailers.log, SHA-256 5597b6eb273bc46d2b38ef5ce2cc5414226122e7db56eda6bf2c4e8eedf000ba

d5d40d6dcd90a930c106cec55ea836c5cc4400ce  parent 68ac32c85278d27eb76541ea9d7f18a0a12f87ed
feat(supervisor): validate governed settings against the envelope
Width and three final trailers verified. 420-r6-trailers.log, SHA-256 ae7db96f80fb434c55237ad188e4809d5b0756ca8977727b727000de2829a386

f1fdd9e646ee1c4aa0ddad136a19da13db2600ec  parent d5d40d6dcd90a930c106cec55ea836c5cc4400ce
fix(pty-host): disable terminal input echo before spawning the child
Width and three final trailers verified. 555-verify-echo-message.log, SHA-256 57039679f67d7678b59ee018bd9507101bbf25986f06e2a5ec65c0e12faef014

aedcdc025219a6ad4147d01d9ead8a5fd73575ea  parent f1fdd9e646ee1c4aa0ddad136a19da13db2600ec
feat(tui): compose the governed foreground session behind its barrier
Width and three final trailers verified. 630-r7-commit-width-and-attribution.log, SHA-256 545f2d98710625e50fb803f7eb55a495ccab4a5e6c2daa5cd94c76299b247f45

2f89e2e4b5ac7abeaa936cb68aa996e52795c664  parent aedcdc025219a6ad4147d01d9ead8a5fd73575ea
test: cover response precedence, environment rules and seam isolation
Width and three final trailers verified. 699-check-r8-message.log, SHA-256 afcd209bbde0bd7d07de22930678b46dc645e584c168c178e893fff685bde663

bbaa5e4149c8067bff81e77ad467671c170ee56b  parent 2f89e2e4b5ac7abeaa936cb68aa996e52795c664
test(verification): record offline M1 startup and failure transcripts
Width and three final trailers verified. 754-r9-trailers.log, SHA-256 abc7361681301aad85735c7f86bbe19df629e70b126d5e914cca26ff66979583

4630152f763baca0259d84c0d5817d0cea501145  parent bbaa5e4149c8067bff81e77ad467671c170ee56b
docs(verification): record M1
Width and three final trailers verified. 799-close-message-check.log, SHA-256 de21518f49b2076a5a0d1d8d0eb6775feb899a556ab61b0e235d6f1d8d3d87e8

860-confirm-delivery-state.log, SHA-256 905f254a29483a59dce199343115c2cf54a027151b52049777eab24c9ff669bc.
Closing commit, sole changed file and all 36 paths match; protected path diffs, whitespace check and untracked list empty.
0cb595500c5775d6d77a64fe01fd723100b1bf1f  parent 75aec139d503cbe1d34d0c6f3ac5bd514339570e
docs(verification): open the M1 build log with its task detail
Width and three final trailers verified. 089-message-opening.log, SHA-256 ffb6ca115cf0a22f40a0ad2c30df24872fda18010d5ec036106277c6236fc4f0

9542eb4b27f0ce009a389feb50d8eff68e7f0878  parent 0cb595500c5775d6d77a64fe01fd723100b1bf1f
feat(supervisor): install live attesters through the production build
Width and three final trailers verified. 114-r1-message-check.log, SHA-256 d81ffe66ea31521e05886f9282a63ee1bd8586babeea32b42b79af87bb93b813

dd19008a74a2ffbd85703f9dbb031a23e8571702  parent 9542eb4b27f0ce009a389feb50d8eff68e7f0878
test(supervisor): bound live-port failure diagnostics
Width and three final trailers verified. 146-fix-trailers.log, SHA-256 2ea8b955385e07f5c84a9ddc3f30d2e0a8953b58da4728da54fc70e3d10e47e4

0b85d3a2403527eb08182f96843b97b58db5d9c4  parent dd19008a74a2ffbd85703f9dbb031a23e8571702
feat(claude-code): attest and monitor the governed response stream
Width and three final trailers verified. 176-r2-message-check.log, SHA-256 b255ee4547dcc21bb8ea9e14742dcc9ba0b0423b1de66c897947e7c002bd957f

54eee8cdcb6703d7c1addf6b643ad0eefec75811  parent 0b85d3a2403527eb08182f96843b97b58db5d9c4
feat(madv): attest the first request and monitor later responses
Width and three final trailers verified. 262-r3-trailers.log, SHA-256 b0f4c3c05fc8a0882756c681466c5d80ed1265fab15ab41c9debc0a8869d6431

16a11409c10787f7413d0b99493b0938567e5eee  parent 54eee8cdcb6703d7c1addf6b643ad0eefec75811
feat(adapters): detect registered authentication and identity failures
Width and three final trailers verified. 348-new-r4-trailers.log, SHA-256 a66b44145029e6e3da0ae1f1f07ca992aa67d5a4291c35820f064a5e9011fee6

68ac32c85278d27eb76541ea9d7f18a0a12f87ed  parent 16a11409c10787f7413d0b99493b0938567e5eee
feat(tui): check managed policy and resolve settings sources
Width and three final trailers verified. 381-r5-trailers.log, SHA-256 5597b6eb273bc46d2b38ef5ce2cc5414226122e7db56eda6bf2c4e8eedf000ba

d5d40d6dcd90a930c106cec55ea836c5cc4400ce  parent 68ac32c85278d27eb76541ea9d7f18a0a12f87ed
feat(supervisor): validate governed settings against the envelope
Width and three final trailers verified. 420-r6-trailers.log, SHA-256 ae7db96f80fb434c55237ad188e4809d5b0756ca8977727b727000de2829a386

f1fdd9e646ee1c4aa0ddad136a19da13db2600ec  parent d5d40d6dcd90a930c106cec55ea836c5cc4400ce
fix(pty-host): disable terminal input echo before spawning the child
Width and three final trailers verified. 555-verify-echo-message.log, SHA-256 57039679f67d7678b59ee018bd9507101bbf25986f06e2a5ec65c0e12faef014

aedcdc025219a6ad4147d01d9ead8a5fd73575ea  parent f1fdd9e646ee1c4aa0ddad136a19da13db2600ec
feat(tui): compose the governed foreground session behind its barrier
Width and three final trailers verified. 630-r7-commit-width-and-attribution.log, SHA-256 545f2d98710625e50fb803f7eb55a495ccab4a5e6c2daa5cd94c76299b247f45

2f89e2e4b5ac7abeaa936cb68aa996e52795c664  parent aedcdc025219a6ad4147d01d9ead8a5fd73575ea
test: cover response precedence, environment rules and seam isolation
Width and three final trailers verified. 699-check-r8-message.log, SHA-256 afcd209bbde0bd7d07de22930678b46dc645e584c168c178e893fff685bde663

bbaa5e4149c8067bff81e77ad467671c170ee56b  parent 2f89e2e4b5ac7abeaa936cb68aa996e52795c664
test(verification): record offline M1 startup and failure transcripts
Width and three final trailers verified. 754-r9-trailers.log, SHA-256 abc7361681301aad85735c7f86bbe19df629e70b126d5e914cca26ff66979583

4630152f763baca0259d84c0d5817d0cea501145  parent bbaa5e4149c8067bff81e77ad467671c170ee56b
docs(verification): record M1
Width and three final trailers verified. 799-close-message-check.log, SHA-256 de21518f49b2076a5a0d1d8d0eb6775feb899a556ab61b0e235d6f1d8d3d87e8
Commits examined: 13
exit status 0

7. Offline evidence

scripts/phase3b/healthy-starts.ts ran both healthy surfaces. scripts/phase3b/failures.ts ran the storage barrier failure, wrong model and fallback after activation. scripts/phase3b/transcript.ts writes the transcript files.

Receipt | Command | Uptime and load | UTC start and end | Exit | SHA-256
| 746-evidence-healthy-runtime.log | runtime_check | 7:52  up 2 days, 23:19, 2 users, load averages: 3.66 2.46 2.35 | Tue Nov 24 12:52:10 UTC 2026 / Tue Nov 24 12:52:10 UTC 2026 | 0 | d4f528e2912225051ad664e6dca5c3ace514c93eaebc8141fc8b22f5829eecb3 |
| 747-evidence-healthy-load.log | wait_for_load | 7:52  up 2 days, 23:19, 2 users, load averages: 3.44 2.44 2.35 to 7:53  up 2 days, 23:20, 2 users, load averages: 1.83 2.16 2.25 | — | 0 | 02524f41433adb6fdee2dc825593096dcc2d3218f261f929bef8cddc61c6a929 |
| 748-evidence-healthy.log | bun scripts/phase3b/healthy-starts.ts /Users/michaeldaley/builds/m1-r1/evidence | 7:53  up 2 days, 23:20, 2 users, load averages: 1.83 2.16 2.25 | Tue Nov 24 12:53:13 UTC 2026 / Tue Nov 24 12:53:14 UTC 2026 | 0 | fbab5290c64f53287802189e4ded27aea28019a871d00ffa751d8937aad60561 |
| 749-evidence-failures-runtime.log | runtime_check | 7:53  up 2 days, 23:20, 2 users, load averages: 1.83 2.16 2.25 | Tue Nov 24 12:53:16 UTC 2026 / Tue Nov 24 12:53:17 UTC 2026 | 0 | a26da0e85868b65219109e675e0b936555a749f377667c7128c55dc0d793d931 |
| 750-evidence-failures-load.log | wait_for_load | 7:53  up 2 days, 23:20, 2 users, load averages: 1.85 2.15 2.24 to 7:53  up 2 days, 23:20, 2 users, load averages: 1.85 2.15 2.24 | — | 0 | 2e1a9df51823f615714e1677ca34d9ccf710ee4642e634c4862c082d052c97e4 |
| 751-evidence-failures.log | bun scripts/phase3b/failures.ts /Users/michaeldaley/builds/m1-r1/evidence | 7:53  up 2 days, 23:20, 2 users, load averages: 1.85 2.15 2.24 | Tue Nov 24 12:53:19 UTC 2026 / Tue Nov 24 12:53:20 UTC 2026 | 0 | 5dbe984af49955c02ca150a9bd42dbdf6afbba4d90ebabdcb450defdd9826b47 |

Source: 758-evidence-digests.log, SHA-256 e31f21897a79cba5dc49c49d9517704acacd5cdd78491444dfd6aa4b3d9884fb.

4544178d77ef083499747332fe8280470e4c25b7f2f6da7661e4d703ce07fee2  tui/scripts/phase3b/failures.ts
24b47050f7d8a8622347db58417ddb425c25da7c4d89a20dab9a063d875326af  tui/scripts/phase3b/healthy-starts.ts
7d18f8c01f814adaf3424bbf5bd95707676c3207611029ff040a0a2577d2d565  tui/scripts/phase3b/transcript.ts
b074b13998eca4c583d8e59ac4303c643ea6f652da1066364bb30a81919b2587  evidence/SHA256.txt
fbab5290c64f53287802189e4ded27aea28019a871d00ffa751d8937aad60561  logs/748-evidence-healthy.log
5dbe984af49955c02ca150a9bd42dbdf6afbba4d90ebabdcb450defdd9826b47  logs/751-evidence-failures.log

evidence/SHA256.txt  SHA-256 b074b13998eca4c583d8e59ac4303c643ea6f652da1066364bb30a81919b2587
evidence/attestation-failure.txt  SHA-256 5c8321b34c5f0b7b659e8ab33a237b316dbc5d5d0db754cdf1236f403d083af9
evidence/barrier-failure.txt  SHA-256 b76e91e35c62d816011f970775f1fc3b90920806965d30e1189c4eb1748e2c26
evidence/fallback.txt  SHA-256 40cc9f0c803ebd300986e12b0cdbce5032e7b622f45bfc585a04c2b42889de72
evidence/healthy-claude-code.txt  SHA-256 ac5c60ff7016f0be0903b8cb5beccfc28d156e2f604a29551f475983cd19504f
evidence/healthy-madv-surface.txt  SHA-256 2a078ee78a47a06d853057c8d27200d1eeadb9ca489b50ae57750080376c5f73

tui/docs/verification/phase-3b-m1-evidence.md  SHA-256 3dc677145aabdfb10446d3b505575d6690ca3b08fa07057dd108c4343b7f5d28

839-verify-transcripts.log, SHA-256 b8b18128aeb89cc145b55077331ac2454b74fa1ce56086e03d493088bb2bca68.
attestation-failure.txt: OK
barrier-failure.txt: OK
fallback.txt: OK
healthy-claude-code.txt: OK
healthy-madv-surface.txt: OK
exit status 0

The PTY host still chooses the child's working directory, and other readable files there are outside the environment allowlist. The TUI uses the relative supervisor and madv-surface adapter source imports required by B16. The host disables terminal echo before spawn. Whether a real surface enables it again remains unverified offline.

8. Full run at the evidence commit

Commit bbaa5e4149c8067bff81e77ad467671c170ee56b. Frozen install, silent typecheck and bare suite each ran once. bun.lock matched the base before and after at SHA-256 a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830. The authorized checkout restored the founder-act executable mode and left a clean tree.

Receipt | Command | Uptime and load | UTC start and end | Exit | SHA-256
| 765-full-runtime.log | runtime_check | 7:55  up 2 days, 23:22, 2 users, load averages: 1.18 1.88 2.13 | Tue Nov 24 12:55:13 UTC 2026 / Tue Nov 24 12:55:14 UTC 2026 | 0 | 52c15d60d95d705d1731dcce3126e7e19fd0293739e4d80a4544469a0eab617d |
| 766-full-lock-before.log | check_lock | 7:55  2 users, load averages: 1.18 1.88 2.13 | — | 0 | 1432d96378b2828b971bdb5ae9ea1e5b641acd079ed7813ad768e5cf8a821576 |
| 767-full-install.log | bun install --frozen-lockfile | 7:55  up 2 days, 23:22, 2 users, load averages: 1.18 1.88 2.13 | Tue Nov 24 12:55:18 UTC 2026 / Tue Nov 24 12:55:18 UTC 2026 | 0 | f07ec9d6e4e02a62fe5012252fb3a53e494988199468af226474ae23d94e72aa |
| 768-full-lock-after.log | check_lock | 7:55  2 users, load averages: 1.18 1.88 2.13 | — | 0 | 1432d96378b2828b971bdb5ae9ea1e5b641acd079ed7813ad768e5cf8a821576 |
| 769-full-install-state.log | git -C tui diff --summary | 7:55  2 users, load averages: 1.18 1.88 2.13 | — | 0 | 21764d781540503d12ad2d27f9edd1c7465f2d62cd90e978017d28df773818b7 |
| 770-full-restore-install-mode.log | git checkout -- packages/founder-act/src/main.ts | 7:55  2 users, load averages: 1.18 1.88 2.13 | — | 0 | e052fcf7d3dc25c181aa621c6e28d71c4c34e753c7c4f0ab73365c2019c2319a |
| 771-full-clean.log | check_clean | 7:55  2 users, load averages: 1.18 1.88 2.13 | — | 0 | bf7dae0d2a1042364d560f89088d900f26b3c6d6287ded6db7fb72d38afad260 |
| 772-full-typecheck.log | bunx tsc --noEmit | 7:55  up 2 days, 23:22, 2 users, load averages: 1.24 1.88 2.13 | Tue Nov 24 12:55:20 UTC 2026 / Tue Nov 24 12:55:23 UTC 2026 | 0 | 764f372007f65422d036346061a5c0eb6a05e4d71e01765d050bf00426207a6b |
| 773-full-suite-runtime.log | runtime_check | 7:55  up 2 days, 23:22, 2 users, load averages: 1.22 1.87 2.12 | Tue Nov 24 12:55:24 UTC 2026 / Tue Nov 24 12:55:24 UTC 2026 | 0 | d30b545eb28f623e3bd16cb82e5bf2a1544ea0f327e9b8a9887f3ee4cd0ac622 |
| 774-full-suite-load.log | wait_for_load | 7:55  up 2 days, 23:23, 2 users, load averages: 1.22 1.87 2.12 to 7:55  up 2 days, 23:23, 2 users, load averages: 1.22 1.87 2.12 | — | 0 | 799af491cfbd163d10b3f46a36572ac558b9d0916f33dafb1486c99e3d9191f7 |
| 775-full-suite.log | bun test | 7:55  up 2 days, 23:23, 2 users, load averages: 1.22 1.87 2.12 | Tue Nov 24 12:55:27 UTC 2026 / Tue Nov 24 12:59:48 UTC 2026 | 0 | e7d912fcb2dc582f2893b9ceaef10ef1ba375d3f0feb928f547550362733df60 |

2078 passed across 160 files. Zero failed, skipped or marked todo.
Source: 775-full-suite.log, SHA-256 e7d912fcb2dc582f2893b9ceaef10ef1ba375d3f0feb928f547550362733df60.
Source line numbers cited for square brackets or a divider: 6818.

 2078 pass
 0 fail
 27981 expect() calls
(lines omitted)

789-full-comparison.log, SHA-256 1f4eabcd4cea9f6619524dce37feb35cae654dcb43bedc89822610aa8c3544a4.
Every one of 2048 base tests passed at the same file and full name.
Tests: 2048 + 30 = 2078; files: 151 + 9 = 160.
Base source: 064-resumed-baseline.log SHA-256 36590a0c31beb1f2f612d9aeb2d712783ffb63f63d5bb6fe470a817a5ceabfdf
Head source: 775-full-suite.log SHA-256 e7d912fcb2dc582f2893b9ceaef10ef1ba375d3f0feb928f547550362733df60
packages/adapter-claude-code/test/live.test.ts | Claude encodes one stream-json user line | pass
packages/adapter-claude-code/test/live.test.ts | Claude hands a partial line to its monitor and interrupts on fallback or model drift | pass
packages/adapter-claude-code/test/live.test.ts | Claude keeps the result deadline and closes on cancellation | pass
packages/adapter-claude-code/test/live.test.ts | Claude rejects a tool call or a third round-trip | pass
packages/adapter-claude-code/test/live.test.ts | Claude rejects malformed, missing, duplicate and echoed events | pass
packages/adapter-claude-code/test/live.test.ts | Claude subscribes first and accepts only complete firstParty identity evidence | pass
packages/adapter-madv-surface/test/live.test.ts | madv encodes no_tools only on the attestation message | pass
packages/adapter-madv-surface/test/live.test.ts | madv preserves a later partial event and checks later responses | pass
packages/adapter-madv-surface/test/live.test.ts | madv rejects attestation tools and extra round-trips by their typed cause | pass
packages/adapter-madv-surface/test/live.test.ts | madv requires init, model response, assistant and success in order | pass
packages/adapter-madv-surface/test/live.test.ts | madv waits for result through its deadline and closes on cancellation | pass
packages/adapter-madv-surface/test/response-precedence.test.ts | refused and unknown model families precede a missing response id | pass
packages/supervisor/test/live-port.test.ts | a continuous failure before activation fails reattestation for its surface | pass
packages/supervisor/test/live-port.test.ts | the live port passes the session and signal and rejects untrusted failure detail | pass
packages/supervisor/test/madv-allowlist.test.ts | madv allowlist pins the required and secret attribute of every variable | pass
packages/supervisor/test/preflight.test.ts | preflight accepts the governed settings and each allowed setting value | pass
packages/supervisor/test/preflight.test.ts | preflight rejects every unlisted settings control and invalid value shape | pass
test/phase3b/composition.test.ts | a failed health barrier exits nonzero naming the component | pass
test/phase3b/composition.test.ts | a second attester invocation refuses the fourth call before the child receives it | pass
test/phase3b/composition.test.ts | both stand-ins pass probes and attestation before present | pass
test/phase3b/composition.test.ts | composition refuses disallowed user, managed, project and local settings before launch | pass
test/phase3b/composition.test.ts | monitor failures after activation durably interrupt with the registered reason | pass
test/phase3b/composition.test.ts | startup cancellation closes the subscription and ends the stand-in group | pass
test/phase3b/detectors.test.ts | registration detectors identify auth expiry and attestation failures by surface | pass
test/phase3b/pty-input-echo.test.ts | the PTY host does not echo a line written before the child reads it | pass
test/phase3b/separation.test.ts | application code imports neither internal supervisor seam | pass
test/phase3b/separation.test.ts | the original public build still fails closed without an attester | pass
test/phase3b/settings-sources.test.ts | managed settings refuses unvalidated files and the governed remote copy | pass
test/phase3b/settings-sources.test.ts | managed settings selects the platform folder and refuses an unsupported platform | pass
test/phase3b/settings-sources.test.ts | settings sources include the supplied user, managed, project and local directories | pass
exit status 0

Full result list: 788-full-test-list.log, SHA-256 4bfd4435ff6f71ca87be0fd8cd124903c2702f0f396d1c1678196207f3ed57a8. The bare suite supplied every name and result. The count arithmetic and added names appear in the comparison above.

Receipt | Command | Uptime and load | UTC start and end | Exit | SHA-256
| 788-full-test-list.log | python3 /private/tmp/m1-r1-IH7Fxlbw/list-suite.py 775 | 8:00  2 users, load averages: 1.54 1.71 1.98 | — | 0 | 4bfd4435ff6f71ca87be0fd8cd124903c2702f0f396d1c1678196207f3ed57a8 |
| 789-full-comparison.log | python3 /private/tmp/m1-r1-IH7Fxlbw/compare-suites.py 775 | 8:00  2 users, load averages: 1.54 1.71 1.98 | — | 0 | 1f4eabcd4cea9f6619524dce37feb35cae654dcb43bedc89822610aa8c3544a4 |
| 790-full-diff-check.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff --check 75aec139d503cbe1d34d0c6f3ac5bd514339570e HEAD | 8:00  2 users, load averages: 1.60 1.72 1.98 | — | 0 | db0fa1f0428f5c0270cd048a7c1b8aa37d25dbc8396db922174c67a88939ab14 |
| 791-full-changed-paths.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff --name-only 75aec139d503cbe1d34d0c6f3ac5bd514339570e HEAD | 8:00  2 users, load averages: 1.60 1.72 1.98 | — | 0 | ce04eea0004caa694e633de819f90047cf61780a88bc54a35ed1cbbf18146726 |
| 792-full-pin-diff.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff 75aec139d503cbe1d34d0c6f3ac5bd514339570e HEAD -- test/phase3a/harness-separation.test.ts | 8:00  2 users, load averages: 1.60 1.72 1.98 | — | 0 | e778b43e2f3cd1866dc7656be112a9c8488f020d4b16f429321eae8145900ac9 |
| 793-full-pty-test-diff.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff 75aec139d503cbe1d34d0c6f3ac5bd514339570e HEAD -- packages/pty-host/test/main-guard.test.ts | 8:00  2 users, load averages: 1.60 1.72 1.98 | — | 0 | 7db1983937a5af6d28a8c7044b2ab5214099959564b75a42df429553e0e52529 |
| 794-full-protected.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff --stat 75aec139d503cbe1d34d0c6f3ac5bd514339570e HEAD -- package.json bun.lock apps/madbridge/package.json apps/madbridge/src/tui/main.tsx apps/madbridge/src/commands/start.ts apps/madbridge/src/cli.ts packages/protocol packages/supervisor/src/attestation.ts packages/supervisor/src/environment.ts packages/supervisor/test/build-rollback.test.ts packages/adapter-madv-surface/test/fixtures test/phase3a/runtime-harness.ts test/phase3a/fixture-adapters.ts | 8:00  2 users, load averages: 1.60 1.72 1.98 | — | 0 | bbc48f09f57a56e2aeb857c0ee90ac30fe01b777198d4e5f4a28e6ab79dcfdf1 |
| 795-full-manifests.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff --stat 75aec139d503cbe1d34d0c6f3ac5bd514339570e HEAD -- '*package.json' '*tsconfig*' bun.lock | 8:00  2 users, load averages: 1.60 1.72 1.98 | — | 0 | 503fb7119eb31c7478a08527aa9e60679cb1c17d13d81e3c990a3ef04d9fca15 |
| 796-full-status.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui status -sb | 8:00  2 users, load averages: 1.60 1.72 1.98 | — | 0 | 91ba334081bf29010def86f7a5ce24086b855f3585ce0929adde80b568985c72 |
| 797-full-untracked.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui ls-files --others --exclude-standard | 8:00  2 users, load averages: 1.60 1.72 1.98 | — | 0 | 51cd51ff6099a96e85f812354e14dd5a6602dd8411e642bb854efc38ea73aa41 |

790-full-diff-check.log, SHA-256 db0fa1f0428f5c0270cd048a7c1b8aa37d25dbc8396db922174c67a88939ab14.
Empty command output.
exit status 0

791-full-changed-paths.log, SHA-256 ce04eea0004caa694e633de819f90047cf61780a88bc54a35ed1cbbf18146726.
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
exit status 0

Source: 792-full-pin-diff.log, SHA-256 e778b43e2f3cd1866dc7656be112a9c8488f020d4b16f429321eae8145900ac9.
Source line numbers cited for square brackets or a divider: 8, 11–12.

diff --git a/test/phase3a/harness-separation.test.ts b/test/phase3a/harness-separation.test.ts
index d3221df..326687a 100644
--- a/test/phase3a/harness-separation.test.ts
+++ b/test/phase3a/harness-separation.test.ts
@@ -27,7 +27,7 @@ const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> =
(lines omitted)
   },
   "packages/supervisor/src/build.ts": {
(lines omitted)
   },
 };

Source: 793-full-pty-test-diff.log, SHA-256 7db1983937a5af6d28a8c7044b2ab5214099959564b75a42df429553e0e52529.
Source line numbers cited for square brackets or a divider: 19.

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
(lines omitted)
-  expect(outputText(facts)).toBe("ping\r\nping\r\n");
+  expect(outputText(facts)).toBe("ping\r\n");

   const termStartedIdx = kinds.indexOf("termination_started");
   const terminateAckIdx = facts.findIndex((f) => f.kind === "ack" && f.ofKind === "terminate");

794-full-protected.log, SHA-256 bbc48f09f57a56e2aeb857c0ee90ac30fe01b777198d4e5f4a28e6ab79dcfdf1.
Empty command output.
exit status 0

795-full-manifests.log, SHA-256 503fb7119eb31c7478a08527aa9e60679cb1c17d13d81e3c990a3ef04d9fca15.
Empty command output.
exit status 0

796-full-status.log, SHA-256 91ba334081bf29010def86f7a5ce24086b855f3585ce0929adde80b568985c72.
## build/3b-m1-r1
exit status 0

797-full-untracked.log, SHA-256 51cd51ff6099a96e85f812354e14dd5a6602dd8411e642bb854efc38ea73aa41.
Empty command output.
exit status 0

9. B24 gates at the closing commit

Commit 4630152f763baca0259d84c0d5817d0cea501145. Frozen install, silent typecheck and bare suite each passed on the first gate run. The lockfile matched the base before and after at SHA-256 a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830. The install set the executable bit on packages/founder-act/src/main.ts. Its content and index were unchanged, the authorized checkout restored the mode and the worktree was clean.

Receipt | Command | Uptime and load | UTC start and end | Exit | SHA-256
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

824-gate-suite-wait.log, SHA-256 7ed5c30d3cc75c0874b85c8bf80a48b57f3b1786ac6e3260fb9f35d902bdd4e7.
 8:08  up 2 days, 23:36, 2 users, load averages: 1.77 1.82 1.94
exit status 0

2078 passed across 160 files. Zero failed, skipped or marked todo.
Source: 825-gate-suite.log, SHA-256 5e1777b4b26f74320cdb3acf3309b64f348c092fb68661bbae09937c832bcd75.
Source line numbers cited for square brackets or a divider: 6818.

 2078 pass
 0 fail
 27981 expect() calls
(lines omitted)

847-gate-compare.log, SHA-256 a48ea34da9ebd94de50d1da25d0ce444fd4ddcb9305588b58acbbae6d6956092.
Every one of 2048 base tests passed at the same file and full name.
Tests: 2048 + 30 = 2078; files: 151 + 9 = 160.
Base source: 064-resumed-baseline.log SHA-256 36590a0c31beb1f2f612d9aeb2d712783ffb63f63d5bb6fe470a817a5ceabfdf
Head source: 825-gate-suite.log SHA-256 5e1777b4b26f74320cdb3acf3309b64f348c092fb68661bbae09937c832bcd75
packages/adapter-claude-code/test/live.test.ts | Claude encodes one stream-json user line | pass
packages/adapter-claude-code/test/live.test.ts | Claude hands a partial line to its monitor and interrupts on fallback or model drift | pass
packages/adapter-claude-code/test/live.test.ts | Claude keeps the result deadline and closes on cancellation | pass
packages/adapter-claude-code/test/live.test.ts | Claude rejects a tool call or a third round-trip | pass
packages/adapter-claude-code/test/live.test.ts | Claude rejects malformed, missing, duplicate and echoed events | pass
packages/adapter-claude-code/test/live.test.ts | Claude subscribes first and accepts only complete firstParty identity evidence | pass
packages/adapter-madv-surface/test/live.test.ts | madv encodes no_tools only on the attestation message | pass
packages/adapter-madv-surface/test/live.test.ts | madv preserves a later partial event and checks later responses | pass
packages/adapter-madv-surface/test/live.test.ts | madv rejects attestation tools and extra round-trips by their typed cause | pass
packages/adapter-madv-surface/test/live.test.ts | madv requires init, model response, assistant and success in order | pass
packages/adapter-madv-surface/test/live.test.ts | madv waits for result through its deadline and closes on cancellation | pass
packages/adapter-madv-surface/test/response-precedence.test.ts | refused and unknown model families precede a missing response id | pass
packages/supervisor/test/live-port.test.ts | a continuous failure before activation fails reattestation for its surface | pass
packages/supervisor/test/live-port.test.ts | the live port passes the session and signal and rejects untrusted failure detail | pass
packages/supervisor/test/madv-allowlist.test.ts | madv allowlist pins the required and secret attribute of every variable | pass
packages/supervisor/test/preflight.test.ts | preflight accepts the governed settings and each allowed setting value | pass
packages/supervisor/test/preflight.test.ts | preflight rejects every unlisted settings control and invalid value shape | pass
test/phase3b/composition.test.ts | a failed health barrier exits nonzero naming the component | pass
test/phase3b/composition.test.ts | a second attester invocation refuses the fourth call before the child receives it | pass
test/phase3b/composition.test.ts | both stand-ins pass probes and attestation before present | pass
test/phase3b/composition.test.ts | composition refuses disallowed user, managed, project and local settings before launch | pass
test/phase3b/composition.test.ts | monitor failures after activation durably interrupt with the registered reason | pass
test/phase3b/composition.test.ts | startup cancellation closes the subscription and ends the stand-in group | pass
test/phase3b/detectors.test.ts | registration detectors identify auth expiry and attestation failures by surface | pass
test/phase3b/pty-input-echo.test.ts | the PTY host does not echo a line written before the child reads it | pass
test/phase3b/separation.test.ts | application code imports neither internal supervisor seam | pass
test/phase3b/separation.test.ts | the original public build still fails closed without an attester | pass
test/phase3b/settings-sources.test.ts | managed settings refuses unvalidated files and the governed remote copy | pass
test/phase3b/settings-sources.test.ts | managed settings selects the platform folder and refuses an unsupported platform | pass
test/phase3b/settings-sources.test.ts | settings sources include the supplied user, managed, project and local directories | pass
exit status 0

848-gate-parity.log, SHA-256 36622e73f22715a18e76d6a9952f272ed2946e57a77da23e5e2caf5629508628.
All 2078 file, name and result entries identical to the full run. Skipped 0. Todo 0.
All 30 added tests failed on a recorded deliberate change.
31 different changes; 32 file-level break runs.
exit status 0

The gate list records every file, test name and result. 846-gate-list.log, SHA-256 6dd6730ef62e30e66fcb6981998c92cb8f808880beeb96df85a01f67b4af6ef2.

Receipt | Command | Uptime and load | UTC start and end | Exit | SHA-256
| 846-gate-list.log | python3 /private/tmp/m1-r1-IH7Fxlbw/list-suite.py 825 | 8:13  2 users, load averages: 1.78 1.74 1.85 | — | 0 | 6dd6730ef62e30e66fcb6981998c92cb8f808880beeb96df85a01f67b4af6ef2 |
| 847-gate-compare.log | python3 /private/tmp/m1-r1-IH7Fxlbw/compare-suites.py 825 | 8:13  2 users, load averages: 1.78 1.74 1.85 | — | 0 | a48ea34da9ebd94de50d1da25d0ce444fd4ddcb9305588b58acbbae6d6956092 |
| 848-gate-parity.log | python3 - | 8:13  2 users, load averages: 1.78 1.74 1.85 | — | 0 | 36622e73f22715a18e76d6a9952f272ed2946e57a77da23e5e2caf5629508628 |
| 849-gate-path-check.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff --check 75aec139d503cbe1d34d0c6f3ac5bd514339570e HEAD | 8:13  2 users, load averages: 2.07 1.80 1.87 | — | 0 | 004ff21cb0fc0b6b597a30af2efd4cb31b6b19b2834d695e89a8094734179d79 |
| 850-gate-changed-paths.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff --name-only 75aec139d503cbe1d34d0c6f3ac5bd514339570e HEAD | 8:13  2 users, load averages: 2.07 1.80 1.87 | — | 0 | c7ace10a0858a4f97a1f01df5eae5f99b2bb40b947bd3e6e761fa3ec019340f1 |
| 851-gate-status.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui status -sb | 8:13  2 users, load averages: 2.07 1.80 1.87 | — | 0 | 2be58313efdffd75706193ffd3235795f34e35c69fb8d2cab41f198e4eabcb10 |
| 852-gate-untracked.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui ls-files --others --exclude-standard | 8:13  2 users, load averages: 2.07 1.80 1.87 | — | 0 | d502bbd119a2337b9afab93255a2b7cb58f49658bcd2aaf11f14521dfc046d66 |
| 853-gate-protected.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff --stat 75aec139d503cbe1d34d0c6f3ac5bd514339570e HEAD -- package.json bun.lock apps/madbridge/package.json apps/madbridge/src/tui/main.tsx apps/madbridge/src/commands/start.ts apps/madbridge/src/cli.ts packages/protocol packages/supervisor/src/attestation.ts packages/supervisor/src/environment.ts packages/supervisor/test/build-rollback.test.ts packages/adapter-madv-surface/test/fixtures test/phase3a/runtime-harness.ts test/phase3a/fixture-adapters.ts | 8:13  2 users, load averages: 2.07 1.80 1.87 | — | 0 | 152b8d58093158d9f4dbe6cd502dd4a21820be4fca2680f33a3f7e57952b5493 |
| 854-gate-manifests.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff --stat 75aec139d503cbe1d34d0c6f3ac5bd514339570e HEAD -- '*package.json' '*tsconfig*' bun.lock | 8:13  2 users, load averages: 2.07 1.80 1.87 | — | 0 | 86a880d7b17153138ff580941a5a30e0d3d97050674c6f04271189774869e3d0 |
| 855-gate-pin.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff 75aec139d503cbe1d34d0c6f3ac5bd514339570e HEAD -- test/phase3a/harness-separation.test.ts | 8:13  2 users, load averages: 2.07 1.80 1.87 | — | 0 | eef8f6bf4cf7b92b81a05ab5e2edc7233fedc78dd8af2b5e62c8f7a67c448688 |
| 856-gate-guard.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff 75aec139d503cbe1d34d0c6f3ac5bd514339570e HEAD -- packages/pty-host/test/main-guard.test.ts | 8:13  2 users, load averages: 2.07 1.80 1.87 | — | 0 | 277946566f9235c5e3fd12d6930b892a4a9b5bc13a17a5c79ca9916ff81f2085 |

849-gate-path-check.log, SHA-256 004ff21cb0fc0b6b597a30af2efd4cb31b6b19b2834d695e89a8094734179d79.
Empty command output.
exit status 0

850-gate-changed-paths.log, SHA-256 c7ace10a0858a4f97a1f01df5eae5f99b2bb40b947bd3e6e761fa3ec019340f1.
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
exit status 0

851-gate-status.log, SHA-256 2be58313efdffd75706193ffd3235795f34e35c69fb8d2cab41f198e4eabcb10.
## build/3b-m1-r1
exit status 0

852-gate-untracked.log, SHA-256 d502bbd119a2337b9afab93255a2b7cb58f49658bcd2aaf11f14521dfc046d66.
Empty command output.
exit status 0

853-gate-protected.log, SHA-256 152b8d58093158d9f4dbe6cd502dd4a21820be4fca2680f33a3f7e57952b5493.
Empty command output.
exit status 0

854-gate-manifests.log, SHA-256 86a880d7b17153138ff580941a5a30e0d3d97050674c6f04271189774869e3d0.
Empty command output.
exit status 0

Source: 855-gate-pin.log, SHA-256 eef8f6bf4cf7b92b81a05ab5e2edc7233fedc78dd8af2b5e62c8f7a67c448688.
Source line numbers cited for square brackets or a divider: 8, 11–12.

diff --git a/test/phase3a/harness-separation.test.ts b/test/phase3a/harness-separation.test.ts
index d3221df..326687a 100644
--- a/test/phase3a/harness-separation.test.ts
+++ b/test/phase3a/harness-separation.test.ts
@@ -27,7 +27,7 @@ const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> =
(lines omitted)
   },
   "packages/supervisor/src/build.ts": {
(lines omitted)
   },
 };

Source: 856-gate-guard.log, SHA-256 277946566f9235c5e3fd12d6930b892a4a9b5bc13a17a5c79ca9916ff81f2085.
Source line numbers cited for square brackets or a divider: 19.

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
(lines omitted)
-  expect(outputText(facts)).toBe("ping\r\nping\r\n");
+  expect(outputText(facts)).toBe("ping\r\n");

   const termStartedIdx = kinds.indexOf("termination_started");
   const terminateAckIdx = facts.findIndex((f) => f.kind === "ack" && f.ofKind === "terminate");

10. Diff against the binding base

Range 75aec139d503cbe1d34d0c6f3ac5bd514339570e to 4630152f763baca0259d84c0d5817d0cea501145. The statistic covers all 36 files. The following source diff covers the 34 files other than the build log and evidence packet. Each line carrying square brackets is cited by its line number in the complete local diff receipt.

Source: 829-head-stat.log, SHA-256 b457df95cce2c7d39d8a5d85bad0ecfe445034900a647ba790bfbd0ff0e73bdf.

 apps/madbridge/src/tui/live/composition.ts         |   92 +
 apps/madbridge/src/tui/live/managed-settings.ts    |    4 +
 apps/madbridge/src/tui/live/settings-sources.ts    |   37 +
 docs/verification/phase-3b-m1-build-log.md         | 4016 ++++++++++++++++++++
 docs/verification/phase-3b-m1-evidence.md          |   82 +
 packages/adapter-claude-code/src/detectors.ts      |   17 +
 packages/adapter-claude-code/src/index.ts          |    2 +
 packages/adapter-claude-code/src/live.ts           |  187 +
 packages/adapter-claude-code/test/live.test.ts     |  119 +
 packages/adapter-madv-surface/src/detectors.ts     |   29 +
 packages/adapter-madv-surface/src/index.ts         |   40 +-
 packages/adapter-madv-surface/src/live.ts          |  105 +
 packages/adapter-madv-surface/test/live.test.ts    |  106 +
 .../test/response-precedence.test.ts               |   18 +
 packages/pty-host/src/terminal.ts                  |    1 +
 packages/pty-host/test/main-guard.test.ts          |    4 +-
 packages/supervisor/src/build.ts                   |  141 +-
 packages/supervisor/src/index.ts                   |    5 +-
 packages/supervisor/src/preflight.ts               |   42 +-
 packages/supervisor/test/live-port.test.ts         |   51 +
 packages/supervisor/test/madv-allowlist.test.ts    |   25 +-
 packages/supervisor/test/preflight.test.ts         |   72 +
 scripts/phase3b/failures.ts                        |   26 +
 scripts/phase3b/healthy-starts.ts                  |   15 +
 scripts/phase3b/transcript.ts                      |   19 +
 test/phase3a/harness-separation.test.ts            |    2 +-
 test/phase3b/composition.test.ts                   |   68 +
 test/phase3b/detectors.test.ts                     |   42 +
 test/phase3b/offline.ts                            |   85 +
 test/phase3b/preflight-input.ts                    |   40 +
 test/phase3b/pty-input-echo.test.ts                |   56 +
 test/phase3b/scenarios.ts                          |  112 +
 test/phase3b/separation.test.ts                    |   65 +
 test/phase3b/settings-sources.test.ts              |   48 +
 test/phase3b/stand-in.ts                           |   69 +
 test/phase3b/wire-facts.ts                         |   38 +
 36 files changed, 5830 insertions(+), 50 deletions(-)

Source: 830-head-source-diff.log, SHA-256 25e26ad1bd3973cb1a89073ebb537ff076b684af9d2e03939e9db622607ef96b.
Source line numbers cited for square brackets or a divider: 42, 122, 149, 152, 164, 214, 228, 394–395, 397, 402, 405–406, 425–426, 431–438, 442–447, 449, 455–457, 461, 465–469, 485, 490–491, 501, 519, 553–554, 570, 604, 637, 662, 765, 774, 781–782, 802, 807, 811, 815–825, 833–835, 864, 880–881, 885, 888, 899, 918, 949–950, 952–953, 1007, 1039, 1051, 1064–1065, 1136, 1141–1142, 1171, 1174–1175, 1182, 1185, 1189, 1191, 1206, 1211, 1223–1224, 1227, 1232–1233, 1238, 1253, 1264–1265, 1310, 1316–1319, 1323, 1331–1332, 1334, 1341–1343, 1353, 1368, 1370, 1382, 1385, 1388, 1390, 1397, 1399–1402, 1405, 1409, 1426, 1458, 1460, 1483, 1487, 1499, 1502–1503, 1523, 1525, 1542, 1551, 1570, 1597–1598, 1601, 1605–1606, 1610, 1613–1615, 1622–1623, 1653–1654, 1673, 1678, 1680–1682, 1695, 1739, 1745, 1750–1751, 1753, 1761, 1782, 1785, 1794, 1798, 1848–1850, 1884, 1960–1961, 1967, 1991, 1997, 2052, 2067–2068, 2082, 2089, 2091, 2095, 2098, 2101, 2157, 2161–2162, 2187.

diff --git a/apps/madbridge/src/tui/live/composition.ts b/apps/madbridge/src/tui/live/composition.ts
new file mode 100644
index 0000000..49a5092
--- /dev/null
+++ b/apps/madbridge/src/tui/live/composition.ts
@@ -0,0 +1,92 @@
+import type { BrokerClient } from "@madventures/broker";
+import { parseTaskEnvelope, type TaskEnvelopeV1 } from "@madventures/protocol";
+import { attestClaudeSession } from "@madventures/adapter-claude-code";
+import { attestMadvSession } from "../../../../../packages/adapter-madv-surface/src/index";
+import { rollbackBuild, runLiveTransactionalBuild, runPurePreflight, type LiveBuildInput,
+  type PartialBuildState, type PreflightInput } from "../../../../../packages/supervisor/src/index";
+import { settingsSources } from "./settings-sources";
+
+interface Start {
+  envelope: TaskEnvelopeV1;
+  preflight: Omit<PreflightInput, "envelope" | "settingsSources">;
+  workingDirectory: string;
+  configFolder: string;
+  managedFolder?: string;
+  present(client: BrokerClient): void | Promise<void>;
+}
+type Result = { exitCode: 0; close(): Promise<void> } | { exitCode: 1; component: string; detail: string };
+
+function failed(component: string, detail: string = component): Result {
+  return { exitCode: 1, component, detail };
+}
+
+// The registered identity and auth probes have both passed when the build
+// asks for an attester. Count each subsequent write before sending its frame.
+function writeBudget(): () => boolean {
+  let calls = 2;
+  return () => {
+    if (calls >= 3) return false;
+    calls++;
+    return true;
+  };
+}
+
(lines omitted)
+  const claudeBudget = writeBudget(), madvBudget = writeBudget();
+  return surface => {
+    if (surface === "claude-code") return input => attestClaudeSession(input, claudeBudget);
+    if (surface === "madv-surface") return input => attestMadvSession(input, madvBudget);
+    return undefined;
+  };
+}
+
+async function closeActive(state: PartialBuildState): Promise<void> {
+  const phase = (await state.client!.getSnapshot()).phase;
+  if (phase === "active" || phase === "paused") await state.broker!.founderClose(crypto.randomUUID());
+  for (const host of state.hosts) {
+    for await (const _ of host.handle.facts()) { /* Wait for host exit before releasing the ledger. */ }
+  }
+  for (const adapter of state.adapters) await adapter.disconnect();
+  await state.client!.close();
+  state.ledger!.close();
+}
+
+export async function composeLiveSession(start: Start): Promise<Result> {
+  const sources = settingsSources(start.workingDirectory, start.configFolder, start.managedFolder, process.platform);
+  if (!sources.ok) return failed(sources.cause);
+  let envelope: TaskEnvelopeV1;
+  try { envelope = parseTaskEnvelope(structuredClone({ ...start.envelope })); }
+  catch { return failed("preflight", "envelope_invalid"); }
+  const controller = new AbortController();
+  const abort = () => controller.abort();
+  const caller = start.preflight.signal;
+  caller.addEventListener("abort", abort, { once: true });
+  process.once("SIGINT", abort);
+  process.once("SIGTERM", abort);
+  if (caller.aborted) abort();
+
+  try {
+    const preflight = await runPurePreflight({ ...start.preflight, envelope: { ...envelope },
+      settingsSources: sources.paths, signal: controller.signal });
+    if (!preflight.ok) return failed("preflight", preflight.failure);
+    const built = await runLiveTransactionalBuild({ sessionId: crypto.randomUUID(), envelope, plan: preflight.plan,
+      signal: controller.signal, attesterFor: createStartAttesters() });
+    if (!built.ok) {
+      await rollbackBuild(built.partialState);
+      return failed(built.failedStep, built.detail);
+    }
+    let closing: Promise<void> | undefined;
+    const close = () => closing ??= closeActive(built.state);
+    if (!built.state.client || built.snapshot.phase !== "active") {
+      await close();
+      return failed("activate");
+    }
+    try { await start.present(built.state.client); }
+    catch { await close(); return failed("present"); }
+    return { exitCode: 0, close };
+  } finally {
+    caller.removeEventListener("abort", abort);
+    process.removeListener("SIGINT", abort);
+    process.removeListener("SIGTERM", abort);
+  }
+}
diff --git a/apps/madbridge/src/tui/live/managed-settings.ts b/apps/madbridge/src/tui/live/managed-settings.ts
new file mode 100644
index 0000000..7719ff6
--- /dev/null
+++ b/apps/madbridge/src/tui/live/managed-settings.ts
@@ -0,0 +1,4 @@
+export function managedSettingsDirectory(platform: string): string | undefined {
+  if (platform === "darwin") return "/Library/Application Support/ClaudeCode";
+  if (platform === "linux") return "/etc/claude-code";
+}
diff --git a/apps/madbridge/src/tui/live/settings-sources.ts b/apps/madbridge/src/tui/live/settings-sources.ts
new file mode 100644
index 0000000..d29737c
--- /dev/null
+++ b/apps/madbridge/src/tui/live/settings-sources.ts
@@ -0,0 +1,37 @@
+import { lstatSync, readdirSync } from "node:fs";
+import { isAbsolute, join } from "node:path";
+import { managedSettingsDirectory } from "./managed-settings";
+
+type Cause = "managed_settings_platform_unsupported" | "managed_settings_unvalidated_source" | "managed_settings_remote_copy";
(lines omitted)
+
+function present(path: string): boolean {
+  return lstatSync(path, { throwIfNoEntry: false }) !== undefined;
+}
+
+function unvalidated(folder: string): boolean {
+  if (present(join(folder, "managed-mcp.json"))) return true;
+  const fragments = join(folder, "managed-settings.d");
+  if (!present(fragments)) return false;
+  return readdirSync(fragments, { withFileTypes: true }).some(entry =>
+    !entry.isDirectory() && entry.name.endsWith(".json") && !entry.name.startsWith("."));
+}
+
+export function settingsSources(workingDirectory: string, configFolder: string, managedFolder: string | undefined,
+  platform: string = process.platform): Sources {
+  const platformFolder = managedSettingsDirectory(platform);
+  if (!platformFolder) return { ok: false, cause: "managed_settings_platform_unsupported" };
+  const folder = managedFolder ?? platformFolder;
+  try {
+    if (!isAbsolute(folder) || !isAbsolute(configFolder) || !isAbsolute(workingDirectory) || unvalidated(folder)) {
+      return { ok: false, cause: "managed_settings_unvalidated_source" };
+    }
+  } catch { return { ok: false, cause: "managed_settings_unvalidated_source" }; }
+  try {
+    if (present(join(configFolder, "remote-settings.json"))) return { ok: false, cause: "managed_settings_remote_copy" };
+  } catch { return { ok: false, cause: "managed_settings_unvalidated_source" }; }
(lines omitted)
+    join(configFolder, "settings.json"), join(folder, "managed-settings.json"),
+    join(workingDirectory, ".claude", "settings.json"), join(workingDirectory, ".claude", "settings.local.json"),
(lines omitted)
+}
diff --git a/packages/adapter-claude-code/src/detectors.ts b/packages/adapter-claude-code/src/detectors.ts
new file mode 100644
index 0000000..040efda
--- /dev/null
+++ b/packages/adapter-claude-code/src/detectors.ts
@@ -0,0 +1,17 @@
+type Observation =
+  | { kind: "auth_status"; exitCode: number }
+  | { kind: "event"; event: Readonly<Record<string, unknown>> };
+
(lines omitted)
+  { surface: "claude-code"; cause: "auth_failed" | "identity_mismatch" } | undefined {
+  if (observation.kind === "auth_status") {
+    if (rules.includes("auth_status_exit_code:" + observation.exitCode)) return { surface: "claude-code", cause: "auth_failed" };
+  } else {
+    const event = observation.event;
+    if (event.type === "system" && event.subtype === "model_refusal_fallback") {
+      return { surface: "claude-code", cause: "identity_mismatch" };
+    }
+    if (event.type === "system" && event.subtype === "api_retry" && typeof event.error === "string" &&
+      rules.includes("system/api_retry.error:" + event.error)) return { surface: "claude-code", cause: "auth_failed" };
+  }
+}
diff --git a/packages/adapter-claude-code/src/index.ts b/packages/adapter-claude-code/src/index.ts
index de71769..bcd55c7 100644
--- a/packages/adapter-claude-code/src/index.ts
+++ b/packages/adapter-claude-code/src/index.ts
@@ -10,3 +10,5 @@ export type {
 export { attestClaudeCode, ModelIdentityUnverifiable } from "./attestation";
 export { realShell, fakeShell, resolveExecutable } from "./shell";
 export type { Shell, ShellResult } from "./shell";
+export { attestClaudeSession, encodeUserInput } from "./live";
+export { detectClaudeFailure } from "./detectors";
diff --git a/packages/adapter-claude-code/src/live.ts b/packages/adapter-claude-code/src/live.ts
new file mode 100644
index 0000000..84782f6
--- /dev/null
+++ b/packages/adapter-claude-code/src/live.ts
@@ -0,0 +1,187 @@
+import { detectClaudeFailure } from "./detectors";
+
+const PROMPT = "Reply with your model identifier and nothing else.";
+const DEADLINE_MS = 30_000;
+
+export function encodeUserInput(text: string): string {
+  return JSON.stringify({ type: "user", message: { role: "user", content: text } }) + "\n";
+}
+
+type Cause = "attestation_missing" | "attestation_malformed" | "attestation_duplicate" |
+  "identity_mismatch" | "auth_failed" | "attestation_deadline" | "attestation_cancelled" |
+  "attestation_tool_call" | "attestation_round_trips" | "attestation_budget_exhausted";
+type Verdict =
+  | { ok: true; evidenceKind: "actual_session"; provider: "anthropic"; model: string; cliVersion: string }
+  | { ok: false; surface: "claude-code"; cause: Cause; reason: Cause };
+
+interface Fact { kind: string; bytes?: Uint8Array }
+interface Input {
+  model: string;
+  signal: AbortSignal;
+  reportFailure(reason: string): void;
(lines omitted)
+  host: { handle: {
+    send(frame: { kind: "input"; bytes: Uint8Array }): void;
+    facts(): AsyncIterable<Fact>;
+  } };
+}
+
+const object = (value: unknown): value is Record<string, unknown> =>
+  value !== null && typeof value === "object" && !Array.isArray(value);
+const nonempty = (value: unknown): value is string => typeof value === "string" && value.length > 0;
+
+function matchesUsage(value: unknown, model: string, requireEvidence: boolean): boolean {
+  if (!object(value)) return false;
+  const entries = Object.entries(value);
(lines omitted)
+    key === model && object(usage) && usage.canonicalModel === model && usage.provider === "firstParty");
+}
+
+class ClaudeReader {
+  private readonly decoder = new TextDecoder("utf-8", { fatal: true });
+  private tail = "";
+  private session: string | undefined;
+  version = "";
+  complete = false;
+  private assistantSeen = false;
+  private readonly models = new Map<string, string>();
+  private retries = 0;
+
+  constructor(private readonly input: Input, private readonly passed: () => void) {}
+
+  push(bytes: Uint8Array): Cause | undefined {
+    try {
+      this.tail += this.decoder.decode(bytes, { stream: true });
+      let newline: number;
+      while ((newline = this.tail.indexOf("\n")) >= 0) {
+        const line = this.tail.slice(0, newline);
+        this.tail = this.tail.slice(newline + 1);
+        const failure = this.event(JSON.parse(line));
+        if (failure) return failure;
+      }
+    } catch { return "attestation_malformed"; }
+  }
+
+  finish(): Cause | undefined {
+    try {
+      this.tail += this.decoder.decode();
+      if (this.tail.length) return this.event(JSON.parse(this.tail));
+    } catch { return "attestation_malformed"; }
+  }
+
+  private event(event: unknown): Cause | undefined {
+    if (!object(event) || !nonempty(event.type)) return "attestation_malformed";
+    if (this.complete && event.type !== "assistant" && event.type !== "result" &&
+      !(event.type === "system" && (event.subtype === "model_refusal_fallback" || event.subtype === "api_retry"))) return;
+    if (!nonempty(event.session_id)) return "attestation_malformed";
+    if (this.session !== undefined && event.session_id !== this.session) return "attestation_duplicate";
+    const detection = detectClaudeFailure(this.input.registration.auth_failure_detection, { kind: "event", event });
+    if (detection) return detection.cause;
+    if (!this.complete && event.parent_tool_use_id != null) return "attestation_tool_call";
+
+    if (event.type === "system" && event.subtype === "init") {
+      if (this.session !== undefined) return this.complete ? undefined : "attestation_duplicate";
+      if (event.model !== this.input.model || !nonempty(event.claude_code_version) ||
+        !this.input.registration.supported_versions.includes(event.claude_code_version)) return "identity_mismatch";
+      this.session = event.session_id;
+      this.version = event.claude_code_version;
+      return;
+    }
+    if (this.session === undefined) return "attestation_malformed";
+    if (event.type === "assistant") {
+      const msg = event.message;
+      if (!object(msg) || !nonempty(msg.id) || !nonempty(msg.model)) return "attestation_malformed";
+      const previous = this.models.get(msg.id);
+      if (previous !== undefined && previous !== msg.model) return "attestation_duplicate";
+      if (msg.model !== this.input.model) return "identity_mismatch";
+      if (!this.complete) {
+        if (!Array.isArray(msg.content)) return "attestation_malformed";
+        if (msg.content.some(item => !object(item) || (item.type !== "text" && item.type !== "thinking"))) return "attestation_tool_call";
+      }
+      this.models.set(msg.id, msg.model);
+      this.assistantSeen = true;
+      return;
+    }
+    if (event.type === "result") {
+      if (!this.assistantSeen) return this.complete ? "attestation_duplicate" : "attestation_missing";
+      if (!this.complete) {
+        if (event.permission_denials !== undefined) {
+          if (!Array.isArray(event.permission_denials)) return "attestation_malformed";
+          if (event.permission_denials.length > 0) return "attestation_tool_call";
+        }
+        if (typeof event.num_turns !== "number" || !Number.isSafeInteger(event.num_turns) || event.num_turns < 1) {
+          return "attestation_malformed";
+        }
+        if (event.num_turns + this.retries > 2) return "attestation_round_trips";
+      }
+      if (event.subtype !== "success" || event.is_error !== false ||
+        !matchesUsage(event.modelUsage, this.input.model, true) ||
+        (event.model_usage_since_last_result !== undefined &&
+          !matchesUsage(event.model_usage_since_last_result, this.input.model, false))) return "identity_mismatch";
+      this.assistantSeen = false;
+      if (!this.complete) {
+        this.complete = true;
+        this.passed();
+      }
+      return;
+    }
+    if (this.complete || event.type === "rate_limit_event") return;
+    if (event.type === "system") {
+      if (event.subtype === "api_retry") { this.retries++; return; }
+      if (event.subtype === "thinking_tokens" || event.subtype === "informational" || event.subtype === "commands_changed") return;
+    }
+    return "attestation_malformed";
+  }
+}
+
+export function attestClaudeSession(input: Input, reserveWrite: () => boolean = () => true): Promise<Verdict> {
+  const { promise, resolve } = Promise.withResolvers<Verdict>();
+  let deadline = Infinity;
+  let timer: ReturnType<typeof setTimeout> | undefined;
+  let failed: Cause | undefined;
+  function stop(cause: Cause): void {
+    if (failed) return;
+    failed = cause;
+    clearTimeout(timer);
+    input.reportFailure(cause);
+  }
+  const abort = () => stop("attestation_cancelled");
+  const reader = new ClaudeReader(input, () => {
+    if (performance.now() >= deadline) { stop("attestation_deadline"); return; }
+    clearTimeout(timer);
+    resolve({ ok: true, evidenceKind: "actual_session", provider: "anthropic", model: input.model, cliVersion: reader.version });
+  });
+  async function consume(): Promise<void> {
+    try {
+      for await (const fact of input.host.handle.facts()) {
+        if (failed) break;
+        if (!reader.complete && performance.now() >= deadline) { stop("attestation_deadline"); break; }
+        if (fact.kind === "output" && fact.bytes) {
+          const cause = reader.push(fact.bytes);
+          if (cause) stop(cause);
+        } else if (fact.kind === "exited" || fact.kind === "drained") {
+          stop(reader.finish() ?? "attestation_missing");
+        }
+        if (failed) break;
+      }
+      if (!failed) stop(reader.finish() ?? "attestation_missing");
+    } catch { stop("attestation_malformed"); }
+    finally {
+      clearTimeout(timer);
+      input.signal.removeEventListener("abort", abort);
+      const cause = failed ?? "attestation_missing";
+      resolve({ ok: false, surface: "claude-code", cause, reason: cause });
+    }
+  }
+  input.signal.addEventListener("abort", abort, { once: true });
+  void consume();
+  if (input.signal.aborted) abort();
+  else if (!reserveWrite()) stop("attestation_budget_exhausted");
+  else {
+    deadline = performance.now() + DEADLINE_MS;
+    timer = setTimeout(() => stop("attestation_deadline"), DEADLINE_MS);
+    try { input.host.handle.send({ kind: "input", bytes: new TextEncoder().encode(encodeUserInput(PROMPT)) }); }
+    catch { stop("attestation_missing"); }
+  }
+  return promise;
+}
diff --git a/packages/adapter-claude-code/test/live.test.ts b/packages/adapter-claude-code/test/live.test.ts
new file mode 100644
index 0000000..bceb820
--- /dev/null
+++ b/packages/adapter-claude-code/test/live.test.ts
@@ -0,0 +1,119 @@
+import { expect, test } from "bun:test";
+import { attestClaudeSession, encodeUserInput } from "../src/live";
+import { wireFacts } from "../../../test/phase3b/wire-facts";
+
+const model = "offline-model";
+const id = "offline-session";
+const init = { type: "system", subtype: "init", session_id: id, model, claude_code_version: "supported" };
+const assistant = { type: "assistant", session_id: id, parent_tool_use_id: null,
(lines omitted)
+const result = { type: "result", session_id: id, subtype: "success", is_error: false, num_turns: 1,
(lines omitted)
+const fallback = { type: "system", subtype: "model_refusal_fallback", session_id: id };
+function start() {
+  const wire = wireFacts();
+  const verdict = attestClaudeSession({ ...wire, model,
(lines omitted)
+  return { wire, verdict };
+}
(lines omitted)
+  const { wire, verdict } = start();
+  wire.events(...events);
+  wire.end();
+  const value = await verdict;
+  if (!value.ok) {
+    expect(value.surface).toBe("claude-code");
+    expect(value.cause).toBe(expected);
+  } else throw new Error("unexpected successful attestation");
+  expect(wire.closed).toBe(1);
+}
+
+test("Claude encodes one stream-json user line", () => {
+  expect(encodeUserInput('say "hi"\n')).toBe('{"type":"user","message":{"role":"user","content":"say \\"hi\\"\\n"}}\n');
+});
+
+test("Claude subscribes first and accepts only complete firstParty identity evidence", async () => {
+  const { wire, verdict } = start();
+  expect(wire.opened).toBe(1);
(lines omitted)
+    ({ type: "system", subtype, session_id: id })), { type: "rate_limit_event", session_id: id }, assistant, assistant, result);
+  expect(await verdict).toEqual({ ok: true, provider: "anthropic", model, evidenceKind: "actual_session", cliVersion: "supported" });
+  expect(wire.closed).toBe(0);
+  wire.end();
(lines omitted)
+});
+
+test("Claude rejects malformed, missing, duplicate and echoed events", async () => {
(lines omitted)
+  }
(lines omitted)
+    const { wire, verdict } = start();
+    wire.push({ kind: "output", bytes }); wire.end();
+    const value = await verdict;
+    expect(value.ok ? "success" : value.cause).toBe("attestation_malformed");
+  }
(lines omitted)
+  const { wire, verdict } = start();
+  wire.events(init, assistant, result, result);
+  await verdict;
(lines omitted)
+});
+
+test("Claude rejects a tool call or a third round-trip", async () => {
(lines omitted)
+});
+
+test("Claude keeps the result deadline and closes on cancellation", async () => {
+  const cancelled = start();
+  cancelled.wire.controller.abort();
+  const first = await cancelled.verdict;
+  expect(first.ok ? "success" : first.cause).toBe("attestation_cancelled");
+  expect(cancelled.wire.closed).toBe(1);
+  const late = start();
+  late.wire.events(init, assistant);
+  const timer = setTimeout(() => late.wire.events(result), 30_100);
+  try {
+    const second = await late.verdict;
+    expect(second.ok ? "success" : second.cause).toBe("attestation_deadline");
+    expect(late.wire.closed).toBe(1);
(lines omitted)
+  } finally { clearTimeout(timer); late.wire.end(); }
+}, 40_000);
+
+test("Claude hands a partial line to its monitor and interrupts on fallback or model drift", async () => {
(lines omitted)
+    const { wire, verdict } = start();
+    const later = JSON.stringify(event);
+    wire.events(init, assistant);
+    const nextAssistant = event.type === "result" ? JSON.stringify(assistant) + "\n" : "";
+    wire.text(JSON.stringify(result) + "\r\n" + nextAssistant + later.slice(0, 7));
+    expect((await verdict).ok).toBe(true);
+    wire.text(later.slice(7) + "\n");
+    wire.end();
+    while (!wire.closed) await Bun.sleep(1);
(lines omitted)
+    expect(wire.opened).toBe(1);
+  }
+});
diff --git a/packages/adapter-madv-surface/src/detectors.ts b/packages/adapter-madv-surface/src/detectors.ts
new file mode 100644
index 0000000..1703113
--- /dev/null
+++ b/packages/adapter-madv-surface/src/detectors.ts
@@ -0,0 +1,29 @@
+import type { MadvResult, MadvFailureCause } from "./index";
+
+type Observation =
+  | { kind: "auth_status"; exitCode: number; verified?: unknown }
+  | { kind: "event"; type: unknown; subtype: unknown }
+  | { kind: "child_exit"; exitCode: number }
+  | { kind: "parsed"; result: MadvResult };
+
(lines omitted)
+  { surface: "madv-surface"; cause: MadvFailureCause; reason: string } | undefined {
+  switch (observation.kind) {
+    case "auth_status":
+      if (rules.includes("auth_status_exit_code:" + observation.exitCode) ||
+        (observation.verified === false && rules.includes("auth_status.verified:false"))) {
+        return { surface: "madv-surface", cause: "auth_failed", reason: "auth_predicate" };
+      }
+      break;
+    case "event":
+      if (observation.type === "system" && observation.subtype === "auth_failed" && rules.includes("system/auth_failed")) {
+        return { surface: "madv-surface", cause: "auth_failed", reason: "surface_fail_closed" };
+      }
+      break;
+    case "child_exit":
+      if (rules.includes("exit_code:" + observation.exitCode)) return { surface: "madv-surface", cause: "auth_failed", reason: "exit" };
+      break;
+    case "parsed":
+      if (!observation.result.ok) return { surface: "madv-surface", cause: observation.result.cause, reason: observation.result.reason };
+  }
+}
diff --git a/packages/adapter-madv-surface/src/index.ts b/packages/adapter-madv-surface/src/index.ts
index b825596..c75e0db 100644
--- a/packages/adapter-madv-surface/src/index.ts
+++ b/packages/adapter-madv-surface/src/index.ts
@@ -1,3 +1,5 @@
+import { detectMadvFailure } from "./detectors";
+
 // DEC-20261115-02 B3-B5; Phase 3B design 2.6. Pure parsing only:
 // the PTY host owns launch, and M1 owns interruption and timer wiring.
 export type MadvFailureCause =
@@ -6,6 +8,8 @@ export type MadvFailureCause =
 const identityProbe = Symbol("identity probe");
 export interface MadvContext {
(lines omitted)
+  readonly onAttested?: (version: string) => void;
   readonly executionId: string;
   readonly sessionId: string;
   readonly model: string;
@@ -51,6 +55,9 @@ function failure(context: Pick<MadvContext, "executionId" | "sessionId">, cause:
 export function encodeUserInput(text: string): string {
   return JSON.stringify({ type: "user", message: { role: "user", content: text } }) + "\n";
 }
+export function encodeAttestationInput(text: string): string {
+  return JSON.stringify({ type: "user", message: { role: "user", content: text }, no_tools: true }) + "\n";
+}
 function eventCause(subtype: unknown): MadvFailureCause | undefined {
   switch (subtype) {
     case "auth_failed": return "auth_failed";
@@ -73,6 +80,10 @@ export class MadvSurfaceParser {
(lines omitted)
   private readonly decoder = new TextDecoder("utf-8", { fatal: true });
   private buffer = "";
+  private version = "";
+  private attested = false;
+  private policyFailure?: "attestation_tool_call" | "attestation_round_trips";
+  get attestationFailure() { return this.policyFailure; }
   private wireSession: string | undefined;
   private state: "init" | "waiting" | "response" | "tools" | "between" = "init";
   private readonly tools = new Map<string, string>();
@@ -124,7 +135,21 @@ export class MadvSurfaceParser {
     let value: unknown;
     try { value = JSON.parse(line); } catch { this.fail("identity_mismatch", "malformed_stream"); return; }
     if (!object(value)) { this.fail("identity_mismatch", "malformed_event"); return; }
-    const cause = value.type === "system" ? eventCause(value.subtype) : undefined;
+    const attesting = this.context.onAttested !== undefined && !this.attested;
+    if (attesting && (value.type === "tool_use" || value.type === "tool_result" ||
+      (value.type === "system" && value.subtype === "provider_error" && value.code === "unexpected_tool_call"))) {
+      this.policyFailure ??= "attestation_tool_call";
+      this.fail("provider_error", "unexpected_tool_call");
+      return;
+    }
+    if (attesting && value.type === "model_response" && this.responses > 0) {
+      this.policyFailure ??= "attestation_round_trips";
+      this.fail("identity_mismatch", "extra_model_response");
+      return;
+    }
+    const detected = this.context.authFailureDetection && detectMadvFailure(this.context.authFailureDetection,
+      { kind: "event", type: value.type, subtype: value.subtype });
+    const cause = detected?.cause ?? (value.type === "system" ? eventCause(value.subtype) : undefined);
     // A later explicit failure can outrank an earlier identity difference.
     // No further successful event or tool can escape a failed parser.
     if (cause !== undefined) {
@@ -148,6 +173,7 @@ export class MadvSurfaceParser {
(lines omitted)
         this.fail("identity_mismatch", "init_tools"); return;
       }
+      this.version = value.surface_version;
       this.wireSession = value.session_id; this.state = "waiting";
     } else if (value.type === "model_response") {
       if (this.state !== "waiting" && !(this.state === "tools" && this.tools.size === 0)) { this.fail("identity_mismatch", "event_order"); return; }
@@ -178,9 +204,15 @@ export class MadvSurfaceParser {
     } else if (value.type === "result") {
       if ((this.state !== "response" && this.state !== "tools") || this.tools.size !== 0) { this.fail("identity_mismatch", "event_order"); return; }
       if (value.is_error !== false || value.subtype !== "success") { this.fail("provider_error", "result_error"); return; }
+      if (attesting && !this.assistantSeen) { this.fail("identity_mismatch", "assistant_missing"); return; }
       this.state = "between";
+      if (attesting) {
+        this.attested = true;
+        this.context.onAttested?.(this.version);
+      }
     } else { this.fail("identity_mismatch", "event_order"); return; }
-    this.events.push(Object.freeze({ executionId: this.context.executionId, sessionId: this.context.sessionId, event: freezeEvent(value) }));
+    // A live monitor consumes events in place and needs no session-long replay.
+    if (!this.context.onAttested) this.events.push(Object.freeze({ executionId: this.context.executionId, sessionId: this.context.sessionId, event: freezeEvent(value) }));
   }
   finish(exitCode: number, signal: string | number | null = null): MadvResult {
     if (!this.finished) {
@@ -199,6 +231,7 @@ export class MadvSurfaceParser {
         default: this.fail("provider_error", "unknown_exit");
       }
       if (!this.failed && (this.responses === 0 || this.waitingForEvidence)) this.fail("identity_unavailable", "model_response_missing");
+      if (!this.failed && this.context.onAttested && !this.attested) this.fail("identity_unavailable", "result_missing");
       if (!this.failed && this.tools.size !== 0) this.fail("identity_mismatch", "event_order");
     }
     return this.snapshot();
@@ -220,3 +253,6 @@ export function parseMadvAuthReadiness(output: string, exitCode = 0, signal: str
(lines omitted)
   } catch { return failure(context, "auth_failed", "auth_predicate"); }
 }
+
+export { attestMadvSession } from "./live";
+export { detectMadvFailure } from "./detectors";
diff --git a/packages/adapter-madv-surface/src/live.ts b/packages/adapter-madv-surface/src/live.ts
new file mode 100644
index 0000000..4e5fc69
--- /dev/null
+++ b/packages/adapter-madv-surface/src/live.ts
@@ -0,0 +1,105 @@
+import { detectMadvFailure } from "./detectors";
+import { EVIDENCE_DEADLINE_MS, MadvSurfaceParser, encodeAttestationInput, encodeUserInput,
+  type MadvFailureCause, type MadvResult } from "./index";
+
+const PROMPT = "Reply with your model identifier and nothing else.";
+type Cause = MadvFailureCause | "attestation_deadline" | "attestation_cancelled" |
+  "attestation_tool_call" | "attestation_round_trips" | "attestation_budget_exhausted";
+interface Input {
+  executionId: string;
+  sessionId: string;
+  model: string;
+  signal: AbortSignal;
+  reportFailure(cause: string): void;
(lines omitted)
+  host: { handle: {
+    facts(): AsyncIterable<{ kind: string; bytes?: Uint8Array; code?: number | null; signal?: string | null }>;
+    send(frame: { kind: "input"; bytes: Uint8Array }): void;
+  } };
+}
+type Failure = { ok: false; surface: "madv-surface"; cause: Cause; reason: Cause; parserReason?: string };
+type Verdict = Failure | { ok: true; evidenceKind: "actual_session"; provider: string;
+  model: string; cliVersion: string; sendUserInput(text: string): boolean };
+
+export function attestMadvSession(input: Input, reserveWrite: () => boolean = () => true): Promise<Verdict> {
+  const { promise, resolve } = Promise.withResolvers<Verdict>();
+  let deadline = Infinity;
+  let timer: ReturnType<typeof setTimeout> | undefined;
+  let failure: Failure | undefined;
+  let ready = false;
+  let closed = false;
+
+  function stop(cause: Cause, parserReason?: string): void {
+    if (failure) return;
+    failure = { ok: false, surface: "madv-surface", cause, reason: cause, ...(parserReason === undefined ? {} : { parserReason }) };
+    clearTimeout(timer);
+    input.reportFailure(cause);
+  }
+  const abort = () => stop("attestation_cancelled");
+  const parser = new MadvSurfaceParser({
+    executionId: input.executionId, sessionId: input.sessionId, model: input.model,
+    authFailureDetection: input.registration.auth_failure_detection,
+    supportedVersions: input.registration.supported_versions, provider: input.registration.provider,
+    independenceDomain: input.registration.independence_domain,
+    onAttested(version) {
+      if (performance.now() >= deadline) { stop("attestation_deadline"); return; }
+      clearTimeout(timer);
+      ready = true;
+      resolve({ ok: true, evidenceKind: "actual_session", provider: input.registration.provider,
+        model: input.model, cliVersion: version, sendUserInput });
+    },
+  });
+  function inspect(result: MadvResult): void {
+    const detection = detectMadvFailure(input.registration.auth_failure_detection, { kind: "parsed", result });
+    if (detection) stop(parser.attestationFailure ?? detection.cause, detection.reason);
+  }
+  function write(frame: string): void {
+    input.host.handle.send({ kind: "input", bytes: new TextEncoder().encode(frame) });
+  }
+  function sendUserInput(text: string): boolean {
+    if (closed || !ready || failure) return false;
+    inspect(parser.beginRequest());
+    if (failure) return false;
+    clearTimeout(timer);
+    timer = setTimeout(() => inspect(parser.checkDeadline()), EVIDENCE_DEADLINE_MS);
+    try { write(encodeUserInput(text)); } catch { stop("provider_error"); }
+    return !failure;
+  }
+  async function consume(): Promise<void> {
+    try {
+      for await (const fact of input.host.handle.facts()) {
+        if (failure) break;
+        if (!ready && performance.now() >= deadline) { stop("attestation_deadline"); break; }
+        if (fact.kind === "output" && fact.bytes) inspect(parser.push(fact.bytes));
+        if (fact.kind === "exited") {
+          const exitCode = fact.code ?? 1;
+          const result = parser.finish(exitCode, fact.signal ?? null);
+          const detection = detectMadvFailure(input.registration.auth_failure_detection, { kind: "child_exit", exitCode });
+          if (detection && !parser.attestationFailure) stop(detection.cause, detection.reason);
+          else inspect(result);
+          break;
+        }
+        if (failure) break;
+      }
+      if (!failure) inspect(parser.finish(0));
+    } catch { stop("identity_mismatch", "malformed_stream"); }
+    finally {
+      closed = true;
+      clearTimeout(timer);
+      input.signal.removeEventListener("abort", abort);
+      if (failure) resolve(failure);
+      else if (!ready) resolve({ ok: false, surface: "madv-surface", cause: "identity_unavailable",
+        reason: "identity_unavailable", parserReason: "result_missing" });
+    }
+  }
+  input.signal.addEventListener("abort", abort, { once: true });
+  void consume();
+  if (input.signal.aborted) abort();
+  else if (!reserveWrite()) stop("attestation_budget_exhausted");
+  else {
+    deadline = performance.now() + EVIDENCE_DEADLINE_MS;
+    timer = setTimeout(() => stop("attestation_deadline"), EVIDENCE_DEADLINE_MS);
+    try { write(encodeAttestationInput(PROMPT)); } catch { stop("provider_error"); }
+  }
+  return promise;
+}
diff --git a/packages/adapter-madv-surface/test/live.test.ts b/packages/adapter-madv-surface/test/live.test.ts
new file mode 100644
index 0000000..7230fa7
--- /dev/null
+++ b/packages/adapter-madv-surface/test/live.test.ts
@@ -0,0 +1,106 @@
+import { expect, test } from "bun:test";
+import { attestMadvSession, encodeAttestationInput, encodeUserInput } from "../src";
+import { wireFacts } from "../../../test/phase3b/wire-facts";
+
+const model = "MiniMax-M3.1-Flash";
(lines omitted)
+const stamp = { session_id: "synthetic-wire", ts: "2026-11-15T00:00:00Z" };
+const init = { ...stamp, type: "system", subtype: "init", surface: "madv-surface", surface_version: "0.1.2",
+  requested_model: model, provider: "minimax", profile: "minimax", endpoint_host: "api.minimax.io" };
+const response = { ...stamp, type: "model_response", response_model: model, response_id: "synthetic-response",
+  provider: "minimax", profile: "minimax", response_independence_domain: "minimax",
+  endpoint_host: "api.minimax.io", tls_verified_host: "api.minimax.io" };
+const assistant = { ...stamp, type: "assistant", response_model: model };
+const result = { ...stamp, type: "result", subtype: "success", is_error: false };
(lines omitted)
+function start() {
+  const wire = wireFacts();
+  const verdict = attestMadvSession({ ...wire, model, registration, executionId: "synthetic-execution",
+    sessionId: "synthetic-session" });
+  return { wire, verdict };
+}
(lines omitted)
+  const { wire, verdict } = start();
+  wire.events(...events);
+  wire.end();
+  const answer = await verdict;
+  expect(answer.ok).toBe(false);
+  if (!answer.ok) {
+    expect(answer.surface).toBe("madv-surface");
+    expect(answer.cause).toBe(cause);
+    if (reason) expect(answer.parserReason).toBe(reason);
+  }
+  expect(wire.closed).toBe(1);
+}
+
+test("madv encodes no_tools only on the attestation message", async () => {
+  const message = "synthetic";
+  expect(encodeUserInput(message)).toBe('{"type":"user","message":{"role":"user","content":"synthetic"}}\n');
+  expect(encodeAttestationInput(message)).toBe('{"type":"user","message":{"role":"user","content":"synthetic"},"no_tools":true}\n');
+  const { wire, verdict } = start();
+  expect(wire.opened).toBe(1);
(lines omitted)
+  wire.events(...approved);
+  const answer = await verdict;
+  expect(answer.ok).toBe(true);
+  if (answer.ok) expect(answer.sendUserInput(message)).toBe(true);
(lines omitted)
+  wire.events(response, assistant, result);
+  wire.end();
+  while (!wire.closed) await Bun.sleep(1);
(lines omitted)
+});
+
+test("madv requires init, model response, assistant and success in order", async () => {
(lines omitted)
+  const { wire, verdict } = start();
+  wire.text("{broken}\n"); wire.end();
+  const malformed = await verdict;
+  expect(malformed.ok ? "unexpected success" : malformed.parserReason).toBe("malformed_stream");
+});
+
+test("madv rejects attestation tools and extra round-trips by their typed cause", async () => {
(lines omitted)
+});
+
+test("madv waits for result through its deadline and closes on cancellation", async () => {
+  const cancelled = start(); cancelled.wire.controller.abort();
+  const abort = await cancelled.verdict;
+  expect(abort.ok ? "unexpected success" : abort.cause).toBe("attestation_cancelled");
+  expect(cancelled.wire.closed).toBe(1);
+  const late = start(); late.wire.events(init, response, assistant);
+  const cleanup = setTimeout(late.wire.end, 31_000);
+  try {
+    const timeout = await late.verdict;
+    expect(timeout.ok ? "unexpected success" : timeout.cause).toBe("attestation_deadline");
+    expect(late.wire.closed).toBe(1);
+  } finally { clearTimeout(cleanup); }
+}, 34_000);
+
+test("madv preserves a later partial event and checks later responses", async () => {
+  const { wire, verdict } = start();
+  wire.events(init, response, assistant);
+  const later = JSON.stringify({ ...response, response_model: "claude-synthetic" });
+  wire.text(JSON.stringify(result) + "\r\n" + later.slice(0, 7));
+  const answer = await verdict;
+  expect(answer.ok).toBe(true);
+  if (answer.ok) expect(answer.sendUserInput("another synthetic request")).toBe(true);
+  wire.text(later.slice(7) + "\n");
+  wire.end();
+  while (!wire.closed) await Bun.sleep(1);
+  expect(wire.opened).toBe(1);
(lines omitted)
+});
diff --git a/packages/adapter-madv-surface/test/response-precedence.test.ts b/packages/adapter-madv-surface/test/response-precedence.test.ts
new file mode 100644
index 0000000..88439d3
--- /dev/null
+++ b/packages/adapter-madv-surface/test/response-precedence.test.ts
@@ -0,0 +1,18 @@
+import { expect, test } from "bun:test";
+import { parseMadvIdentity } from "../src/index";
+
+test("refused and unknown model families precede a missing response id", () => {
+  const model = "MiniMax-M3.1-Flash";
+  const stamp = { session_id: "offline-precedence", ts: "2026-11-23T00:00:00Z" };
+  const identity = { provider: "minimax", profile: "minimax", endpoint_host: "api.minimax.io" };
+  const init = { ...stamp, ...identity, type: "system", subtype: "init", surface: "madv-surface",
(lines omitted)
+    const response = { ...stamp, ...identity, type: "model_response", response_model,
+      response_independence_domain: "minimax", tls_verified_host: "api.minimax.io" };
+    const stream = JSON.stringify(init) + "\n" + JSON.stringify(response) + "\n";
(lines omitted)
+    return result.ok ? "accepted" : result.cause;
+  });
(lines omitted)
+});
diff --git a/packages/pty-host/src/terminal.ts b/packages/pty-host/src/terminal.ts
index 786b29f..9009665 100644
--- a/packages/pty-host/src/terminal.ts
+++ b/packages/pty-host/src/terminal.ts
@@ -76,6 +76,7 @@ export function spawnGoverned(
       }
     },
   });
+  terminal.localFlags &= ~8; // ECHO on macOS and Linux.
(lines omitted)
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
(lines omitted)
-  expect(outputText(facts)).toBe("ping\r\nping\r\n");
+  expect(outputText(facts)).toBe("ping\r\n");

   const termStartedIdx = kinds.indexOf("termination_started");
   const terminateAckIdx = facts.findIndex((f) => f.kind === "ack" && f.ofKind === "terminate");
diff --git a/packages/supervisor/src/build.ts b/packages/supervisor/src/build.ts
index 7e6c46d..94f7887 100644
--- a/packages/supervisor/src/build.ts
+++ b/packages/supervisor/src/build.ts
@@ -102,6 +102,9 @@ export interface BuildChildResource {
 }

 export interface LiveReattestationInput {
+  readonly sessionId: string;
+  readonly signal: AbortSignal;
+  readonly reportFailure: (reason: string) => void;
   readonly executionId: string;
   readonly model: string;
   readonly provider: string;
@@ -135,6 +138,22 @@ export interface BuildSurfaceRegistration extends AdapterRegistrationV1 {
   readonly live_attester?: LiveSurfaceAttester | null;
 }

+export interface LiveBuildInput extends BuildInput {
+  readonly signal: AbortSignal;
+  readonly attesterFor: (surface: SurfaceId) => LiveSurfaceAttester | undefined;
+}
+
+// Use only build-owned literals in ledger and caller-visible detail.
+function liveFailureCause(surface: SurfaceId, reported: unknown): string {
(lines omitted)
+  const specific = surface === "madv-surface"
(lines omitted)
+  return shared.find(item => item === reported) ?? specific.find(item => item === reported)
+    ?? (surface === "madv-surface" ? "identity_mismatch" : "attestation_malformed");
+}
+
 export interface LiveReattestationRecord {
   readonly executionId: string;
   readonly surface: SurfaceId;
@@ -532,8 +551,15 @@ function formatFailureDetail(
  * uses ADAPTER_REGISTRY, spawnPtyHost, and default sources.
  */
 export async function runTransactionalBuild(input: BuildInput): Promise<BuildResult> {
-  const safeInput: BuildInput =
-    input !== null && typeof input === "object"
+  return executeBuild(publicBuildInput(input), {});
+}
+
+export function runLiveTransactionalBuild(input: LiveBuildInput): Promise<BuildResult> {
+  return executeBuild(publicBuildInput(input), {}, { signal: input.signal, attesterFor: input.attesterFor });
+}
+
+function publicBuildInput(input: BuildInput): BuildInput {
+  return input !== null && typeof input === "object"
       ? {
           sessionId: input.sessionId,
           envelope: input.envelope,
@@ -541,7 +567,6 @@ export async function runTransactionalBuild(input: BuildInput): Promise<BuildRes
           ...(input.injectFailureAt !== undefined ? { injectFailureAt: input.injectFailureAt } : {}),
         }
       : ({} as BuildInput);
-  return runTransactionalBuildWithDependencies(safeInput);
 }

 /**
@@ -553,6 +578,14 @@ export async function runTransactionalBuild(input: BuildInput): Promise<BuildRes
 export async function runTransactionalBuildWithDependencies(
   input: BuildWithDependenciesInput,
   overrides: BuildDependencies = {},
+): Promise<BuildResult> {
+  return executeBuild(input, overrides);
+}
+
+async function executeBuild(
+  input: BuildWithDependenciesInput,
+  overrides: BuildDependencies,
+  live?: Pick<LiveBuildInput, "signal" | "attesterFor">,
 ): Promise<BuildResult> {
   const rawInput = (input !== null && typeof input === "object" ? input : {}) as Partial<BuildWithDependenciesInput>;
   const sessionId = typeof rawInput.sessionId === "string" ? rawInput.sessionId : "";
@@ -597,6 +630,33 @@ export async function runTransactionalBuildWithDependencies(
   let sessionActivatedRow: LedgerRow | null = null;
   let localObservationSeq = 0;

+  const stopAttesters = new AbortController();
(lines omitted)
+  let firstFailure: { executionId: string; surface: SurfaceId; cause: string } | undefined;
+  let attesting = false;
+  let unwindState: PartialBuildState | undefined;
+  const reportFailure = (executionId: string, surface: SurfaceId, reported: unknown) => {
+    if (!live || firstFailure) return;
+    const cause = liveFailureCause(surface, reported);
+    firstFailure = { executionId, surface, cause };
+    if (sessionActivatedRow !== null && currentBroker !== null) {
+      const reason = cause === "auth_failed" ? "authentication_expired"
+        : cause === "provider_error" || cause === "endpoint_refused" ? "adapter_failure" : "identity_mismatch";
+      const phase = currentBroker.snapshotProjectionInput().lifecycle.phase;
+      if (phase === "active" || phase === "paused") {
+        void currentBroker.interrupt(reason, surface + ": " + cause, "high", sources.nextEventId(), null, executionId)
+          .catch(() => { for (const host of hosts) host.handle.closeStdin(); });
+      }
+    }
+    if (attesting && sessionActivatedRow === null) {
+      // A silent host's fact reader can be parked in next(). Start the normal
+      // rollback now so it can settle while the attester closes its reader.
+      unwindState = snapshotPartialState();
+      void rollbackBuild(unwindState).catch(() => { /* The caller joins this same rollback. */ });
+    }
+    stopAttesters.abort();
+  };
+
   const snapshotPartialState = (): PartialBuildState =>
     Object.freeze({
       sessionId,
@@ -647,14 +707,19 @@ export async function runTransactionalBuildWithDependencies(
     step: BuildStep,
     failure: BuildFailureCode,
(lines omitted)
-  ): BuildResult =>
-    Object.freeze({
-      ok: false as const,
-      failedStep: step,
-      failure,
-      detail: formatFailureDetail(step, failure, executionIds),
-      partialState: snapshotPartialState(),
+  ): BuildResult => {
+    // Freeze the primary failure before cancelling any other observer.
+    const first = firstFailure;
+    const detail = first
(lines omitted)
+        " surface=" + first.surface + " cause=" + first.cause
+      : formatFailureDetail(step, failure, executionIds);
+    if (live) stopAttesters.abort();
+    return Object.freeze({
+      ok: false as const, failedStep: first ? "reattest" : step,
+      failure: first ? "reattestation_failed" : failure, detail, partialState: unwindState ?? snapshotPartialState(),
     });
+  };

   let activeSnapshot: StampedBrokerSnapshot | null = null;

@@ -662,6 +727,7 @@ export async function runTransactionalBuildWithDependencies(
(lines omitted)

+    if (firstFailure) return failAt("reattest", "reattestation_failed");
     if (injectFailureAt === step) {
       return failAt(step, "injected_failure");
     }
@@ -938,30 +1004,36 @@ export async function runTransactionalBuildWithDependencies(
               return failAt(step, "reattestation_failed", currentExecutionIds);
             }
             const reg = resolveRegistration(execution.surface);
-            if (reg === undefined || typeof reg.live_attester !== "function") {
-              return failAt(step, "reattestation_failed", currentExecutionIds);
-            }
-            const verdict = await reg.live_attester({
-              executionId: envelopeExecution.execution_id,
-              model: envelopeExecution.model,
-              provider: envelopeExecution.provider,
-              execution,
-              registration: reg,
-              host,
-              child,
-            });
-            if (!verdict.ok) {
-              return failAt(step, "reattestation_failed", currentExecutionIds);
-            }
-            if (verdict.evidenceKind !== "actual_session") {
-              return failAt(step, "reattestation_failed", currentExecutionIds);
-            }
-            if (verdict.provider !== envelopeExecution.provider || verdict.provider !== reg.provider) {
+            const attester = live ? live.attesterFor(execution.surface) : reg?.live_attester;
+            const refuse = (reason: string) => {
+              reportFailure(host.executionId, execution.surface, reason);
               return failAt(step, "reattestation_failed", currentExecutionIds);
+            };
+            if (reg === undefined || typeof attester !== "function") {
+              return refuse(execution.surface === "madv-surface" ? "identity_unavailable" : "attestation_missing");
             }
-            if (verdict.model !== envelopeExecution.model) {
-              return failAt(step, "reattestation_failed", currentExecutionIds);
+            const notifyFailure = (reason: string) => reportFailure(host.executionId, execution.surface, reason);
+            let verdict: LiveReattestationResult;
+            try {
+              if (signal.aborted) return refuse("attestation_cancelled");
+              attesting = true;
+              verdict = await attester({
+                sessionId, signal, reportFailure: notifyFailure,
+                executionId: envelopeExecution.execution_id,
+                model: envelopeExecution.model,
+                provider: envelopeExecution.provider,
+                execution, registration: reg, host, child,
+              });
+            } catch {
+              return refuse(execution.surface === "madv-surface" ? "identity_mismatch" : "attestation_malformed");
+            } finally {
+              attesting = false;
             }
+            if (firstFailure) return failAt(step, "reattestation_failed", currentExecutionIds);
+            if (!verdict.ok) return refuse(verdict.reason);
+            if (verdict.evidenceKind !== "actual_session" ||
+              verdict.provider !== envelopeExecution.provider || verdict.provider !== reg.provider ||
+              verdict.model !== envelopeExecution.model) return refuse("identity_mismatch");
             const record: LiveReattestationRecord = Object.freeze({
               executionId: envelopeExecution.execution_id,
               surface: execution.surface,
@@ -1049,6 +1121,13 @@ export async function runTransactionalBuildWithDependencies(
           }
           const { state: beforeState, head: beforeHead } = replayLedgerState(ledger);
           const beforeSnapshot = await client.getSnapshot();
+          // No await separates this last monitor check from durable activation.
+          if (firstFailure) return failAt("reattest", "reattestation_failed");
+          if (live && signal.aborted) {
(lines omitted)
+            reportFailure(first.execution_id, first.surface, "attestation_cancelled");
+            return failAt("reattest", "reattestation_failed");
+          }
           const readyIds = children.map((child) => child.executionId);
(lines omitted)
diff --git a/packages/supervisor/src/index.ts b/packages/supervisor/src/index.ts
index 115fda0..1e7f27c 100644
--- a/packages/supervisor/src/index.ts
+++ b/packages/supervisor/src/index.ts
@@ -9,7 +9,7 @@ export {
 export { runPurePreflight } from "./preflight";
 export type { PreflightInput, PreflightFailure, PreflightOk, PreflightResult, LaunchPlan, LaunchExecution } from "./preflight";

-export { BUILD_STEPS, runTransactionalBuild, rollbackBuild } from "./build";
+export { BUILD_STEPS, runTransactionalBuild, runLiveTransactionalBuild, rollbackBuild } from "./build";
 export type {
   BuildAdapterHandle,
   BuildChildResource,
@@ -20,6 +20,9 @@ export type {
   BuildResult,
   BuildStep,
   CreatedBuildResource,
+  LiveBuildInput,
+  LiveReattestationInput,
+  LiveSurfaceAttester,
   LiveReattestationRecord,
   LiveReattestationResult,
   PartialBuildState,
diff --git a/packages/supervisor/src/preflight.ts b/packages/supervisor/src/preflight.ts
index 4361919..2edb02c 100644
--- a/packages/supervisor/src/preflight.ts
+++ b/packages/supervisor/src/preflight.ts
@@ -80,7 +80,7 @@ function fingerprint(root: string, worktree: string, d: PreflightDependencies):
(lines omitted)
 }

(lines omitted)
   const u = userInfo(); const p = input.installation; const env = input.ambient;
   if (u.uid !== p.installation_uid || u.homedir !== p.passwd_home || env.SHELL !== u.shell || !env.TERM) return false;
   if (env.PATH !== p.approved_path || !p.approved_path) return false;
@@ -98,6 +98,33 @@ function validateEnvironment(input: PreflightInput, registrations: readonly Adap
     if (p.claude_config_dir !== join(p.passwd_home, ".claude-madventures-v5") || env.CLAUDE_CONFIG_DIR !== p.claude_config_dir) return false;
     if (input.invocationArguments.some(arg => arg === "--settings" || arg.startsWith("--settings="))) return false;
(lines omitted)
+    const object = (v: unknown): v is Record<string, unknown> =>
+      v !== null && typeof v === "object" && !Array.isArray(v);
(lines omitted)
+    function allowedSetting(key: string, value: unknown): boolean {
+      switch (key) {
+        case "env":
(lines omitted)
+            name === "DISABLE_AUTOUPDATER" ? setting === "1" :
(lines omitted)
+        case "permissions":
+          return object(value) && Object.keys(value).length === 2 && value.defaultMode === "dontAsk" &&
+            Array.isArray(value.deny) && value.deny.every(item => typeof item === "string");
+        case "enabledPlugins": return object(value) && Object.values(value).every(v => v === false);
+        case "skillOverrides": return object(value) && Object.values(value).every(v => v === "off");
+        case "autoMemoryEnabled": return value === false;
+        case "disableAllHooks": case "disableClaudeAiConnectors": return value === true;
+        case "model": return typeof value === "string" && value === claudeModel;
+        case "effortLevel": return effort(value);
+        case "modelSettings": return object(value) && Object.values(value).every(setting =>
+          object(setting) && Object.keys(setting).length === 1 && effort(setting.effortLevel));
+        case "agentPushNotifEnabled": case "inputNeededNotifEnabled": case "autoCompactEnabled":
+        case "verbose": return typeof value === "boolean";
+        case "editorMode": return value === "normal" || value === "vim";
(lines omitted)
+        default: return false;
+      }
+    }
     for (const path of input.settingsSources) {
(lines omitted)
       let text: string;
@@ -106,16 +133,7 @@ function validateEnvironment(input: PreflightInput, registrations: readonly Adap
         return false;
       }
       const settings = JSON.parse(text);
-      if (!settings || typeof settings !== "object" || Array.isArray(settings)) return false;
-      // Fail closed on unknown settings controls: a future provider/endpoint
-      // selector cannot silently become authorized by an old validator.
-      for (const key of Object.keys(settings)) if (key !== "env") return false;
-      if (settings.env !== undefined) {
-        if (!settings.env || typeof settings.env !== "object" || Array.isArray(settings.env)) return false;
(lines omitted)
-        }
-      }
(lines omitted)
     }
   }
   return true;
@@ -152,7 +170,7 @@ export async function runPurePreflightWithDependencies(input: PreflightInput, ov
(lines omitted)
   }
-  try { if (!validateEnvironment(input, admitted, d)) return fail("auth_not_ready"); }
+  try { if (!validateEnvironment(input, admitted, d, envelope.executions.find(e => e.surface === "claude-code")?.model)) return fail("auth_not_ready"); }
   catch { return fail("auth_not_ready"); }
(lines omitted)
   try {
diff --git a/packages/supervisor/test/live-port.test.ts b/packages/supervisor/test/live-port.test.ts
new file mode 100644
index 0000000..ec8d554
--- /dev/null
+++ b/packages/supervisor/test/live-port.test.ts
@@ -0,0 +1,51 @@
+import { expect, test } from "bun:test";
+import { runLiveTransactionalBuild, type LiveReattestationInput } from "../src/index";
+import { closeOfflineBuild, offlineStart } from "../../../test/phase3b/offline";
+
+test("the live port passes the session and signal and rejects untrusted failure detail", async () => {
+  const fixture = offlineStart();
+  const controller = new AbortController();
(lines omitted)
+  try {
+    const result = await runLiveTransactionalBuild({
+      ...fixture, sessionId: "offline-port", signal: controller.signal,
+      attesterFor: () => input => {
+        seen.push(input);
+        return { ok: false, reason: "M1 synthetic refusal" };
+      },
+    });
+    try {
+      expect(seen.length).toBe(1);
(lines omitted)
+      expect(result.ok).toBe(false);
+      if (result.ok) throw new Error("expected a failed build");
+      expect(result.failedStep).toBe("reattest");
+      expect(result.failure).toBe("reattestation_failed");
+      expect(result.detail).toBe("step=reattest execution=builder failure=reattestation_failed surface=claude-code cause=attestation_malformed");
+    } finally { await closeOfflineBuild(result); }
+  } finally { fixture.dispose(); }
+});
+
+test("a continuous failure before activation fails reattestation for its surface", async () => {
+  const fixture = offlineStart();
+  let monitorFailure: ((reason: string) => void) | undefined;
+  try {
+    const result = await runLiveTransactionalBuild({
+      ...fixture, sessionId: "offline-monitor", signal: new AbortController().signal,
+      attesterFor: surface => input => {
+        if (surface === "claude-code") monitorFailure = input.reportFailure;
+        else monitorFailure!("identity_mismatch");
+        return { ok: true, evidenceKind: "actual_session", model: input.model, provider: input.provider };
+      },
+    });
+    try {
+      expect(result.ok).toBe(false);
+      if (result.ok) throw new Error("expected a failed build");
+      expect(result.failedStep).toBe("reattest");
+      expect(result.failure).toBe("reattestation_failed");
+      expect(result.detail).toBe("step=reattest execution=builder failure=reattestation_failed surface=claude-code cause=identity_mismatch");
+      expect(result.partialState.sessionActivatedRow === null).toBe(true);
+    } finally { await closeOfflineBuild(result); }
+  } finally { fixture.dispose(); }
+});
diff --git a/packages/supervisor/test/madv-allowlist.test.ts b/packages/supervisor/test/madv-allowlist.test.ts
index b33990e..4e0f358 100644
--- a/packages/supervisor/test/madv-allowlist.test.ts
+++ b/packages/supervisor/test/madv-allowlist.test.ts
@@ -1,6 +1,6 @@
 import { expect, test } from "bun:test";
 import { ADAPTER_REGISTRY, parseSurfaceId } from "@madventures/protocol";
-import { buildAllowlistedEnvironment } from "../src/environment";
+import { buildAllowlistedEnvironment, redact } from "../src/environment";

 test("madv-surface-v1 selects exactly the B6 variable set", () => {
   const registration = ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))!;
@@ -10,3 +10,26 @@ test("madv-surface-v1 selects exactly the B6 variable set", () => {
(lines omitted)
   expect(Object.keys(buildAllowlistedEnvironment(registration, ambient)).sort()).toEqual(approved.sort());
 });
+
+test("madv allowlist pins the required and secret attribute of every variable", () => {
+  const registration = ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))!;
(lines omitted)
+
+  for (const name of names) {
+    const remaining = { ...synthetic };
(lines omitted)
+    if (required.includes(name)) {
+      expect(() => buildAllowlistedEnvironment(registration, remaining))
+        .toThrow("Missing required environment variable " + name + " for madv-surface-v1");
+    } else {
+      expect(buildAllowlistedEnvironment(registration, remaining)).toEqual(remaining);
+    }
+  }
(lines omitted)
+  expect(redacted.text).toBe(names.map(name =>
(lines omitted)
+});
diff --git a/packages/supervisor/test/preflight.test.ts b/packages/supervisor/test/preflight.test.ts
index f8f117a..ba5d71e 100644
--- a/packages/supervisor/test/preflight.test.ts
+++ b/packages/supervisor/test/preflight.test.ts
@@ -329,3 +329,75 @@ test("the auth probe enforces the 5,000 ms execution deadline", async () => { co
(lines omitted)
+
+import { offlineStart } from "../../../test/phase3b/offline";
+import { offlinePreflight } from "../../../test/phase3b/preflight-input";
+
+function governedSettingsFixture() {
+  const f = offlineStart();
+  try {
+    const input = offlinePreflight(f);
+    const path = join(f.config, "settings.json");
(lines omitted)
+    const run = async (settings: unknown) => {
+      writeFileSync(path, JSON.stringify(settings));
+      return runPurePreflightWithDependencies(input, { probe: async request => ({
+        ok: true, diagnostic: { result: "pass", primitive: request.kind === "auth" ? "auth status" : "system/init",
+          exitCode: 0, signal: null, stdoutBytes: 0, stderrBytes: 0 },
+      }) });
+    };
+    return { run, dispose: f.dispose };
+  } catch (error) { f.dispose(); throw error; }
+}
+
+test("preflight accepts the governed settings and each allowed setting value", async () => {
+  const f = governedSettingsFixture();
+  const entries = (n: number, value: (i: number) => unknown) =>
(lines omitted)
+  try {
(lines omitted)
+      const result = await f.run({
+        env: { DISABLE_AUTOUPDATER: "1" }, permissions: { defaultMode: "dontAsk", deny: Array.from({ length: 27 }, (_, i) => "deny-" + i) },
+        enabledPlugins: entries(host === "darwin" ? 134 : 142, () => false), skillOverrides: entries(17, () => "off"),
+        autoMemoryEnabled: false, disableAllHooks: true, disableClaudeAiConnectors: true, effortLevel: "high",
+        modelSettings: entries(7, i => ({ effortLevel: i % 2 ? "xhigh" : "high" })), agentPushNotifEnabled: true,
+        inputNeededNotifEnabled: true, autoCompactEnabled: true, verbose: true, editorMode: "normal", theme: "light-daltonized",
+        ...(host === "linux" ? { model: "claude-fable-5-2" } : {}),
+      });
+      expect(result.ok ? "pass" : result.failure).toBe("pass");
+      if (result.ok) expect(result.plan.executions.some(e => "DISABLE_AUTOUPDATER" in e.environment)).toBe(false);
+    }
(lines omitted)
+      expect((await f.run({ effortLevel, modelSettings: { example: { effortLevel } } })).ok).toBe(true);
+    }
(lines omitted)
+      { agentPushNotifEnabled: false, inputNeededNotifEnabled: false, autoCompactEnabled: false, verbose: false },
+      { theme: "", editorMode: "vim" }, { theme: "Az-9".repeat(16) },
(lines omitted)
+      { env: { TERM: "xterm-256color" } },
(lines omitted)
+  } finally { f.dispose(); }
+}, 30_000);
+
+test("preflight rejects every unlisted settings control and invalid value shape", async () => {
+  const f = governedSettingsFixture();
+  try {
(lines omitted)
+      { unlisted: true }, { env: { DISABLE_AUTOUPDATER: 1 } }, { env: { DISABLE_AUTOUPDATER: "0" } },
(lines omitted)
+      { skillOverrides: null }, { skillOverrides: { a: false } }, { autoMemoryEnabled: true }, { disableAllHooks: false },
+      { disableClaudeAiConnectors: false }, { model: "other" }, { model: null }, { effortLevel: "other" },
(lines omitted)
+      { modelSettings: { a: { effortLevel: "low", model: "other" } } }, { modelSettings: { a: "high" } }, { verbose: 1 },
+      { agentPushNotifEnabled: "true" }, { inputNeededNotifEnabled: 0 }, { autoCompactEnabled: null },
+      { editorMode: "emacs" }, { theme: "a".repeat(65) }, { theme: "abc_def" }, { theme: 1 }, { theme: "abc\n" },
(lines omitted)
+    for (const setting of cases) {
+      const value = await f.run(setting);
+      expect(value.ok ? "unexpected success" : value.failure).toBe("auth_not_ready");
+    }
+  } finally { f.dispose(); }
+}, 30_000);
diff --git a/scripts/phase3b/failures.ts b/scripts/phase3b/failures.ts
new file mode 100644
index 0000000..cdf868f
--- /dev/null
+++ b/scripts/phase3b/failures.ts
@@ -0,0 +1,26 @@
+import { runOfflineScenario } from "../../test/phase3b/scenarios";
+import { writeTranscript } from "./transcript";
+
+if (import.meta.main) {
(lines omitted)
+  if (!directory) throw new Error("An evidence output directory is required.");
+
+  const barrier = await runOfflineScenario("barrier");
+  if (barrier.code !== 1 || barrier.component !== "storage" || barrier.presented) {
+    throw new Error("Offline storage barrier failed to stop presentation.");
+  }
+  writeTranscript(directory, "barrier-failure.txt", barrier.trace);
+
+  const attestation = await runOfflineScenario("attestation");
+  if (attestation.code !== 1 || attestation.presented || attestation.component !== "reattest" ||
+      !attestation.detail.includes("surface=claude-code cause=identity_mismatch")) {
+    throw new Error("Offline wrong-model attestation failed to stop presentation.");
+  }
+  writeTranscript(directory, "attestation-failure.txt", attestation.trace);
+
+  const fallback = await runOfflineScenario("fallback");
+  if (!fallback.activated || fallback.code !== 0 || fallback.reason !== "identity_mismatch" || !fallback.groupsEnded) {
+    throw new Error("Offline fallback failed to interrupt the active session.");
+  }
+  writeTranscript(directory, "fallback.txt", fallback.trace);
+}
diff --git a/scripts/phase3b/healthy-starts.ts b/scripts/phase3b/healthy-starts.ts
new file mode 100644
index 0000000..c50f640
--- /dev/null
+++ b/scripts/phase3b/healthy-starts.ts
@@ -0,0 +1,15 @@
+import { runOfflineScenario } from "../../test/phase3b/scenarios";
+import { writeTranscript } from "./transcript";
+
+if (import.meta.main) {
(lines omitted)
+  if (!directory) throw new Error("An evidence output directory is required.");
(lines omitted)
+    const result = await runOfflineScenario("healthy");
+    if (result.code !== 0 || !result.activated || !result.presented ||
+        !result.trace.includes(surface + " result success") || !result.groupsEnded) {
+      throw new Error("Offline healthy start failed for " + surface);
+    }
+    writeTranscript(directory, "healthy-" + surface + ".txt", result.trace);
+  }
+}
diff --git a/scripts/phase3b/transcript.ts b/scripts/phase3b/transcript.ts
new file mode 100644
index 0000000..8aec73e
--- /dev/null
+++ b/scripts/phase3b/transcript.ts
@@ -0,0 +1,19 @@
+import { linkSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs";
+import { join } from "node:path";
+
+export function writeTranscript(directory: string, name: string, trace: string): void {
+  const output = realpathSync(directory);
+  const temporary = mkdtempSync(join(output, ".m1-transcript-"));
+  try {
+    const prepared = join(temporary, name);
(lines omitted)
+      "Offline M1 | " + name,
+      "Stand-ins: madbridge-claude-v5 and madv-surface",
+      trace.trimEnd(), "",
(lines omitted)
+    linkSync(prepared, join(output, name));
+    console.log(name);
+  } finally {
+    rmSync(temporary, { recursive: true, force: true });
+  }
+}
diff --git a/test/phase3a/harness-separation.test.ts b/test/phase3a/harness-separation.test.ts
index d3221df..326687a 100644
--- a/test/phase3a/harness-separation.test.ts
+++ b/test/phase3a/harness-separation.test.ts
@@ -27,7 +27,7 @@ const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> =
(lines omitted)
   },
   "packages/supervisor/src/build.ts": {
(lines omitted)
   },
 };

diff --git a/test/phase3b/composition.test.ts b/test/phase3b/composition.test.ts
new file mode 100644
index 0000000..1659bdb
--- /dev/null
+++ b/test/phase3b/composition.test.ts
@@ -0,0 +1,68 @@
+import { expect, test } from "bun:test";
+import { repeatInstalledAttester, runOfflineScenario } from "./scenarios";
+
+test("both stand-ins pass probes and attestation before present", async () => {
+  const result = await runOfflineScenario("healthy");
+  expect(result.detail).toBe("");
+  expect(result.code).toBe(0);
+  expect(result.activated).toBe(true);
+  const stages = result.trace.trim().split("\n");
+  let previous = -1;
(lines omitted)
+    "claude-code attestation write", "claude-code result success", "madv-surface attestation write no_tools=true",
(lines omitted)
+    expect(stages.filter(s => s === event).length).toBe(1);
+    const index = stages.indexOf(event);
+    expect(index).toBeGreaterThan(previous);
+    previous = index;
+  }
+}, 45_000);
+
+test("a failed health barrier exits nonzero naming the component", async () => {
+  const result = await runOfflineScenario("barrier");
+  expect(result.code).toBe(1);
+  expect(result.component).toBe("storage");
+  expect(result.presented).toBe(false);
+  expect(result.trace).toContain("madv-surface auth probe");
+}, 45_000);
+
+test("a second attester invocation refuses the fourth call before the child receives it", async () => {
(lines omitted)
+    const result = await repeatInstalledAttester(surface);
+    expect(result.detail).toContain("surface=" + surface + " cause=attestation_budget_exhausted");
+    expect(result.trace.split("\n").filter(s => s.startsWith(surface + " attestation write")).length).toBe(1);
+    expect(result.trace).not.toContain("extra write");
+  }
+}, 90_000);
+
+test("composition refuses disallowed user, managed, project and local settings before launch", async () => {
(lines omitted)
+    const result = await runOfflineScenario(location);
+    expect(result.code).toBe(1);
+    expect(result.detail).toBe("auth_not_ready");
+    expect(result.presented).toBe(false);
+    expect(result.trace).not.toContain("probe");
+    expect(result.trace).not.toContain("launch");
+  }
+}, 45_000);
+
+test("startup cancellation closes the subscription and ends the stand-in group", async () => {
+  const result = await runOfflineScenario("cancel");
+  expect(result.detail).toContain("surface=claude-code cause=attestation_cancelled");
+  expect(result.code).toBe(1);
+  expect(result.presented).toBe(false);
+  expect(result.groupsEnded).toBe(true);
+}, 45_000);
+
+test("monitor failures after activation durably interrupt with the registered reason", async () => {
(lines omitted)
+    const result = await runOfflineScenario(mode);
+    expect(result.detail).toBe("");
+    expect(result.activated).toBe(true);
+    expect(result.reason).toBe(reason);
+    expect(result.groupsEnded).toBe(true);
+  }
+  const failure = await runOfflineScenario("attestation");
+  expect(failure.presented).toBe(false);
+  expect(failure.detail).toContain("surface=claude-code cause=identity_mismatch");
+}, 90_000);
diff --git a/test/phase3b/detectors.test.ts b/test/phase3b/detectors.test.ts
new file mode 100644
index 0000000..162cb7e
--- /dev/null
+++ b/test/phase3b/detectors.test.ts
@@ -0,0 +1,42 @@
+import { expect, test } from "bun:test";
+import { ADAPTER_REGISTRY, parseSurfaceId } from "@madventures/protocol";
+import { detectClaudeFailure } from "../../packages/adapter-claude-code/src/detectors";
+import { MadvSurfaceParser, detectMadvFailure } from "../../packages/adapter-madv-surface/src";
+
+test("registration detectors identify auth expiry and attestation failures by surface", () => {
+  const claude = ADAPTER_REGISTRY.get(parseSurfaceId("claude-code"))!.auth_failure_detection;
+  const madv = ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))!.auth_failure_detection;
+  const status = { kind: "auth_status", exitCode: 1 } as const;
+  expect(detectClaudeFailure(claude, status)).toEqual({ surface: "claude-code", cause: "auth_failed" });
(lines omitted)
+    const obs = { kind: "event", event: { type: "system", subtype: "api_retry", error } } as const;
+    expect(detectClaudeFailure(claude, obs)?.cause).toBe("auth_failed");
(lines omitted)
+  }
+  expect(detectClaudeFailure(claude, { kind: "event", event: { type: "system", subtype: "model_refusal_fallback" } }))
+    .toEqual({ surface: "claude-code", cause: "identity_mismatch" });
(lines omitted)
+    const failure = detectMadvFailure(madv, observation);
+    expect(failure?.surface).toBe("madv-surface");
+    expect(failure?.cause).toBe("auth_failed");
(lines omitted)
+  }
+  expect(detectMadvFailure(madv, { kind: "child_exit", exitCode: 1 })).toBeUndefined();
(lines omitted)
+      provider: "minimax", independenceDomain: "minimax", model: "MiniMax-offline" });
+    const failure = detectMadvFailure(madv, { kind: "parsed", result: parser.finish(code) });
+    expect(failure?.surface).toBe("madv-surface");
+    expect(failure?.cause).toBe(expected);
+    expect(failure?.reason).toBe("exit");
+  }
(lines omitted)
+      provider: "minimax", independenceDomain: "minimax", model: "MiniMax-offline" });
+    const result = parser.push(JSON.stringify({ type: "system", subtype }) + "\n");
+    expect(detectMadvFailure(madv, { kind: "parsed", result })?.cause).toBe(subtype);
+  }
+});
diff --git a/test/phase3b/offline.ts b/test/phase3b/offline.ts
new file mode 100644
index 0000000..de69c13
--- /dev/null
+++ b/test/phase3b/offline.ts
@@ -0,0 +1,85 @@
+import { mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
+import { userInfo } from "node:os";
+import { join } from "node:path";
+import { ADAPTER_REGISTRY, parseSurfaceId, parseTaskEnvelope, sha256CanonicalSync } from "@madventures/protocol";
+import { rollbackBuild, type BuildResult, type LaunchPlan } from "../../packages/supervisor/src/index";
+
+export function offlineStart() {
+  const user = userInfo();
+  const root = realpathSync(mkdtempSync(join(realpathSync(user.homedir), ".madbridge-m1-")));
+  const dispose = () => rmSync(root, { recursive: true, force: true });
+  try {
+    const folder = (name: string) => {
+      const path = join(root, name);
+      mkdirSync(path, { mode: 0o700 });
+      return path;
+    };
+    const work = folder("work"), bin = folder("bin"), temp = folder("temp"), storageRootOverride = folder("storage");
+    const config = folder("config"), managed = folder("managed");
(lines omitted)
+        cwd: work, env: { HOME: root, GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: "/dev/null" },
+        stdout: "pipe", stderr: "pipe",
+      });
+      if (result.exitCode !== 0) throw new Error("offline git setup failed");
+      return result.stdout;
+    };
+    git("init", "--template=", "-q", "-b", "offline");
+    git("-c", "user.name=Offline", "-c", "user.email=offline@example.invalid", "commit", "-qm", "offline", "--allow-empty");
+    const head = git("rev-parse", "HEAD").toString().trim();
+    const hash = (bytes: Uint8Array) => new Bun.CryptoHasher("sha256").update(bytes).digest("hex");
+    const statusSha256 = hash(git("status", "--porcelain=v1", "-z"));
+    const claude = ADAPTER_REGISTRY.get(parseSurfaceId("claude-code"))!;
+    const madv = ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))!;
+    const now = new Date().toISOString();
+    const unsigned = {
+      protocol_version: "madbridge-protocol/v1", task_id: "offline-m1", authorization_reference: "OFFLINE-M1",
+      repository: join(work, ".git"), worktree: work, branch: "offline",
+      repository_fingerprint: { kind: "commit", git_sha: head, sha256: statusSha256 },
(lines omitted)
+        { execution_id: "builder", role: "builder", surface: claude.surface, model: "claude-fable-5-2",
+          provider: claude.provider, independence_domain: claude.independence_domain, effort: "high" },
+        { execution_id: "reviewer", role: "independent-reviewer", surface: madv.surface, model: "MiniMax-M3.1-Flash",
+          provider: madv.provider, independence_domain: madv.independence_domain, effort: "high" },
(lines omitted)
+      initial_writer: "builder",
(lines omitted)
+        require_distinct_independence_domains: true, prohibit_self_review: true },
+      created_at: now, expires_at: new Date(Date.parse(now) + 86_400_000).toISOString(),
+    };
+    const envelope = parseTaskEnvelope({ ...unsigned, envelope_hash: sha256CanonicalSync(unsigned) });
+    const plan: LaunchPlan = {
+      storageRoot: storageRootOverride,
+      repositoryFingerprint: { root: work, worktree: work, head, statusSha256 },
+      executions: envelope.executions.map(execution => {
+        const registration = ADAPTER_REGISTRY.get(execution.surface)!;
+        const executablePath = join(bin, registration.executable_name);
+        writeFileSync(executablePath, '#!/bin/sh\ncd "${0%/*}/../work" || exit 2\nwhile IFS= read -r line; do :; done\n', { mode: 0o700 });
+        return { surface: execution.surface, executablePath, artifactSha256: hash(readFileSync(executablePath)),
(lines omitted)
+      }),
+    };
+    return { root, work, bin, temp, storageRootOverride, config, managed, user, now, envelope, plan, dispose };
+  } catch (error) {
+    dispose();
+    throw error;
+  }
+}
+
+export async function closeOfflineBuild(result: BuildResult): Promise<void> {
+  if (!result.ok) {
+    await rollbackBuild(result.partialState);
+    return;
+  }
+  const state = result.state;
+  if ((await state.client!.getSnapshot()).phase !== "closed") await state.broker!.founderClose("offline-close");
+  for (const host of state.hosts) {
+    // Drain to host exit before deleting the disposable files.
+    for await (const _ of host.handle.facts()) { }
+  }
+  for (const adapter of state.adapters) await adapter.disconnect();
+  await state.client!.close();
+  state.ledger!.close();
+}
diff --git a/test/phase3b/preflight-input.ts b/test/phase3b/preflight-input.ts
new file mode 100644
index 0000000..11c7419
--- /dev/null
+++ b/test/phase3b/preflight-input.ts
@@ -0,0 +1,40 @@
+import { readFileSync } from "node:fs";
+import { join } from "node:path";
+import { ADAPTER_REGISTRY, type ObservedSurfaceFacts } from "@madventures/protocol";
+import { writeCapabilityRecord } from "@madventures/storage";
+import type { PreflightInput } from "../../packages/supervisor/src/index";
+import type { offlineStart } from "./offline";
+
+// Write only records for the disposable executables installed for this start.
+export function offlinePreflight(f: ReturnType<typeof offlineStart>): PreflightInput {
+  const observed: Record<string, ObservedSurfaceFacts> = {};
+  for (const execution of f.envelope.executions) {
+    const registration = ADAPTER_REGISTRY.get(execution.surface)!;
+    const binary = join(f.bin, registration.executable_name);
(lines omitted)
+    const binary_sha256 = new Bun.CryptoHasher("sha256").update(readFileSync(binary)).digest("hex");
+    const host = { os_name: "Linux", os_version: "synthetic", kernel_release: "synthetic",
+      reported_model: execution.model, adapter_registration: execution.surface };
+    writeCapabilityRecord(f.storageRootOverride, f.work, f.work, {
+      surface: execution.surface, provider: registration.provider, requested_model: execution.model,
(lines omitted)
+      organization_id: registration.organization_id, cli_version, binary_path: binary, binary_sha256,
+      evaluated_at: f.now, expires_at: new Date(Date.parse(f.now) + 30 * 86400000).toISOString(), host,
+      identity_attestation: { result: "pass", primitive: "offline stream", sanitized_facts: "synthetic identity" },
+      auth_readiness: { result: "pass", primitive: "offline status" }, pty: { result: "pass", observed_ms: {} },
(lines omitted)
+    });
(lines omitted)
+  }
+  const config = join(f.user.homedir, ".claude-madventures-v5");
+  return {
+    envelope: { ...f.envelope }, repositoryRoot: f.work, worktree: f.work,
+    ambient: { HOME: f.user.homedir, SHELL: f.user.shell ?? "", TERM: "xterm-256color",
+      PATH: f.bin, TMPDIR: f.temp, CLAUDE_CONFIG_DIR: config, MINIMAX_API_KEY: "M1-SYNTHETIC-CANARY" },
+    installation: { installation_uid: f.user.uid, passwd_home: f.user.homedir, approved_path: f.bin, claude_config_dir: config },
(lines omitted)
+    hostCapabilities: { pty: true, processGroups: true, termination: true, timing: true },
+    observedHostFacts: observed, now: f.now, signal: new AbortController().signal,
+  };
+}
diff --git a/test/phase3b/pty-input-echo.test.ts b/test/phase3b/pty-input-echo.test.ts
new file mode 100644
index 0000000..5bc1ca1
--- /dev/null
+++ b/test/phase3b/pty-input-echo.test.ts
@@ -0,0 +1,56 @@
+import { expect, test } from "bun:test";
+import { writeFileSync } from "node:fs";
+import { join } from "node:path";
+import { spawnPtyHost } from "../../packages/broker/src/pty-host-supervisor";
+import { offlineStart } from "./offline";
+
+test("the PTY host does not echo a line written before the child reads it", async () => {
+  const fixture = offlineStart();
+  try {
+    const path = join(fixture.bin, "reader.js");
(lines omitted)
+      "#!" + process.execPath + " --no-env-file",
+      'import { existsSync, readSync, writeSync } from "node:fs";',
(lines omitted)
+      'while (!existsSync("permit-read")) await Bun.sleep(5);',
+      "const bytes = Buffer.alloc(64);",
+      "const count = readSync(0, bytes, 0, bytes.length, null);",
+      'if (bytes.toString("utf8", 0, count) !== "synthetic input\\n") process.exit(2);',
+      'process.on("SIGTERM", () => process.exit(0));',
+      'writeSync(1, "received\\n");',
+      "await Bun.sleep(10000);",
+      "",
(lines omitted)
+    writeFileSync(path, source, { mode: 0o700 });
+    const host = spawnPtyHost({
+      path, sha256: new Bun.CryptoHasher("sha256").update(source).digest("hex"),
(lines omitted)
+      env: { HOME: fixture.root, TMPDIR: fixture.temp, PATH: fixture.bin },
+    });
+    const deadline = setTimeout(() => host.closeStdin(), 5000);
+    try {
+      let output = "";
+      let exitCode: number | null = null;
+      for await (const fact of host.facts()) {
+        if (fact.kind === "ready") {
+          host.send({ kind: "input", bytes: new TextEncoder().encode("synthetic input\n") });
+        } else if (fact.kind === "ack" && fact.ofKind === "input") {
+          writeFileSync(join(fixture.work, "permit-read"), "");
+        } else if (fact.kind === "output") {
+          output += Buffer.from(fact.bytes).toString("ascii");
+          if (output.endsWith("received\r\n")) host.send({ kind: "terminate" });
+        } else if (fact.kind === "exited") {
+          exitCode = fact.code;
+          host.closeStdin();
+        }
+      }
+      expect(output).toBe("received\r\n");
+      expect(exitCode).toBe(0);
+    } finally {
+      clearTimeout(deadline);
+      host.closeStdin();
+    }
+  } finally {
+    fixture.dispose();
+  }
+}, 12000);
diff --git a/test/phase3b/scenarios.ts b/test/phase3b/scenarios.ts
new file mode 100644
index 0000000..b0b1804
--- /dev/null
+++ b/test/phase3b/scenarios.ts
@@ -0,0 +1,112 @@
+import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
+import { join } from "node:path";
+import { Ledger } from "@madventures/ledger";
+import { composeLiveSession, createStartAttesters } from "../../apps/madbridge/src/tui/live/composition";
+import { runPurePreflight, runLiveTransactionalBuild } from "../../packages/supervisor/src/index";
+import { closeOfflineBuild, offlineStart } from "./offline";
+import { offlinePreflight } from "./preflight-input";
+
+type Scenario = "healthy" | "barrier" | "attestation" | "fallback" | "madv-auth" | "cancel" | "user" | "managed" | "project" | "local";
+function prepare(mode: Scenario) {
+  const f = offlineStart();
+  try {
+    const source = readFileSync(new URL("./stand-in.ts", import.meta.url), "utf8");
+    const interpreter = "'" + process.execPath.replaceAll("'", "'\\''") + "'";
(lines omitted)
+    for (const child of f.plan.executions) {
+      writeFileSync(child.executablePath + ".ts", source);
+      writeFileSync(child.executablePath, bootstrap);
+    }
+    writeFileSync(join(f.root, "scenario"), mode);
+    const path = join(f.root, "trace");
+    writeFileSync(path, "");
+    return { ...f, input: offlinePreflight(f), trace: () => readFileSync(path, "utf8"),
+      note: (text: string) => appendFileSync(path, text + "\n") };
+  } catch (error) { f.dispose(); throw error; }
+}
+
+async function until(predicate: () => boolean | Promise<boolean>): Promise<void> {
+  const deadline = performance.now() + 5000;
+  while (!(await predicate())) {
+    if (performance.now() >= deadline) throw new Error("offline observation deadline");
+    await Bun.sleep(5);
+  }
+}
+
+export async function runOfflineScenario(mode: Scenario) {
+  const f = prepare(mode);
+  const controller = new AbortController();
+  let finished = false;
+  try {
+    if (mode === "barrier") writeFileSync(join(f.storageRootOverride, "sessions"), "synthetic obstruction");
+    if (mode === "user" || mode === "managed" || mode === "project" || mode === "local") {
+      const projectFolder = join(f.work, ".claude");
+      mkdirSync(projectFolder);
+      const files = {
+        user: join(f.config, "settings.json"), managed: join(f.managed, "managed-settings.json"),
+        project: join(projectFolder, "settings.json"), local: join(projectFolder, "settings.local.json"),
+      };
(lines omitted)
+    }
+    const cancel = mode === "cancel" ? until(() => finished || f.trace().includes("claude-code attestation write"))
+      .then(() => { if (!finished) controller.abort(); }) : Promise.resolve();
+    let reason = "", presented = false, activated = false;
+    let outcome;
+    try {
+      outcome = await composeLiveSession({ envelope: f.envelope, preflight: { ...f.input, signal: controller.signal },
+        workingDirectory: f.work, configFolder: f.config, managedFolder: f.managed, present: async client => {
+          const snapshot = await client.getSnapshot();
+          presented = true;
+          activated = snapshot.phase === "active" && snapshot.executions?.length === 2 &&
+            snapshot.executions.every(e => e.state === "ready") && snapshot.eventLog.some(e => e.type === "session_activated");
+          f.note("present " + snapshot.phase);
+          if (mode === "fallback" || mode === "madv-auth") {
+            writeFileSync(join(f.root, "release-monitor"), "");
+            await until(async () => (await client.getSnapshot()).phase === "closed");
+            const ledger = new Ledger(join(f.storageRootOverride, "sessions", snapshot.sessionId, "ledger", "ledger.sqlite3"));
+            try {
+              const row = ledger.readAfter(0).map(r => JSON.parse(r.event_json)).find(event => event.event_type === "session_interrupted");
+              reason = row?.reason_code ?? "";
+              f.note("session_interrupted " + reason);
+            } finally { ledger.close(); }
+          }
+        } });
+    } finally { finished = true; await cancel; }
+    if (outcome.exitCode === 0) await outcome.close();
+    const component = outcome.exitCode === 1 ? outcome.component : "";
+    const detail = outcome.exitCode === 1 ? outcome.detail : "";
+    f.note("exit " + outcome.exitCode + (component ? " " + component + " " + detail : ""));
+    const groupEnded = (surface: string) => {
+      const file = join(f.bin, (surface === "claude-code" ? "madbridge-claude-v5" : "madv-surface") + ".pid");
+      if (!existsSync(file)) return false;
+      const pid = Number(readFileSync(file, "utf8"));
+      if (!Number.isSafeInteger(pid) || pid <= 1) throw new Error("invalid stand-in pid");
+      try { process.kill(-pid, 0); return false; } catch (e) { return (e as NodeJS.ErrnoException).code === "ESRCH"; }
+    };
+    return { trace: f.trace(), code: outcome.exitCode, component, detail, presented, activated, reason,
+      groupsEnded: groupEnded("claude-code") && groupEnded("madv-surface") };
+  } finally { f.dispose(); }
+}
+
+export async function repeatInstalledAttester(target: string) {
+  const f = prepare("healthy");
+  try {
+    const preflight = await runPurePreflight(f.input);
+    if (!preflight.ok) throw new Error("offline probe failure " + preflight.failure);
+    const installed = createStartAttesters();
+    const build = await runLiveTransactionalBuild({ sessionId: "offline-budget", envelope: f.envelope,
+      plan: preflight.plan, signal: f.input.signal, attesterFor: surface => {
+        const attest = installed(surface);
+        if (!attest || surface !== target) return attest;
+        return async input => {
+          const first = await attest(input);
+          if (!first.ok) return first;
+          return attest(input);
+        };
+      } });
+    try { return { detail: build.ok ? "unexpected success" : build.detail, trace: f.trace() }; }
+    finally { await closeOfflineBuild(build); }
+  } finally { f.dispose(); }
+}
diff --git a/test/phase3b/separation.test.ts b/test/phase3b/separation.test.ts
new file mode 100644
index 0000000..a305ed8
--- /dev/null
+++ b/test/phase3b/separation.test.ts
@@ -0,0 +1,65 @@
+import { expect, test } from "bun:test";
+import { readdirSync, readFileSync } from "node:fs";
+import { join } from "node:path";
+import ts from "typescript";
+import { runTransactionalBuild } from "../../packages/supervisor/src/index";
+import { closeOfflineBuild, offlineStart } from "./offline";
+
+const apps = join(import.meta.dir, "../../apps");
(lines omitted)
+
+function* appSources(directory: string): Generator<string> {
+  for (const entry of readdirSync(directory, { withFileTypes: true })) {
+    const path = join(directory, entry.name);
+    if (entry.isDirectory() && entry.name !== "node_modules") yield* appSources(path);
(lines omitted)
+  }
+}
+
+function usesSeam(node: ts.Node): boolean {
+  if (ts.isImportSpecifier(node) || ts.isExportSpecifier(node)) {
+    return seams.has((node.propertyName ?? node.name).text);
+  }
+  if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)
+      && internalModule.test(node.moduleSpecifier.text) && node.importClause?.namedBindings
+      && ts.isNamespaceImport(node.importClause.namedBindings)) return true;
+  if (ts.isExportDeclaration(node) && !node.exportClause && node.moduleSpecifier
+      && ts.isStringLiteral(node.moduleSpecifier) && internalModule.test(node.moduleSpecifier.text)) return true;
+  if (ts.isPropertyAccessExpression(node) && seams.has(node.name.text)) return true;
+  if (ts.isElementAccessExpression(node) && ts.isStringLiteral(node.argumentExpression)
+      && seams.has(node.argumentExpression.text)) return true;
+  if (ts.isBindingElement(node)) {
+    const key = node.propertyName ?? node.name;
+    if ((ts.isIdentifier(key) || ts.isStringLiteral(key)) && seams.has(key.text)) return true;
+  }
+  return ts.forEachChild(node, child => usesSeam(child) || undefined) === true;
+}
+
+test("application code imports neither internal supervisor seam", () => {
(lines omitted)
+  for (const path of appSources(apps)) {
+    const text = readFileSync(path, "utf8");
+    if (!text.includes("WithDependencies") && !text.includes("supervisor/src/")) continue;
+    if (usesSeam(ts.createSourceFile(path, text, ts.ScriptTarget.Latest))) imports.push(path);
+  }
(lines omitted)
+});
+
+test("the original public build still fails closed without an attester", async () => {
+  const fixture = offlineStart();
+  try {
+    const result = await runTransactionalBuild({
+      sessionId: "offline-no-attester", envelope: fixture.envelope, plan: fixture.plan,
+    });
+    try {
+      expect(result.ok).toBe(false);
+      if (!result.ok) {
+        expect(result.failedStep).toBe("reattest");
+        expect(result.failure).toBe("reattestation_failed");
+        expect(result.detail).toBe("step=reattest execution=builder failure=reattestation_failed");
+        expect(result.partialState.completedSteps).not.toContain("activate");
+      }
+    } finally { await closeOfflineBuild(result); }
+  } finally { fixture.dispose(); }
+}, 15000);
diff --git a/test/phase3b/settings-sources.test.ts b/test/phase3b/settings-sources.test.ts
new file mode 100644
index 0000000..d69be84
--- /dev/null
+++ b/test/phase3b/settings-sources.test.ts
@@ -0,0 +1,48 @@
+import { expect, test } from "bun:test";
+import { mkdirSync, rmSync, writeFileSync } from "node:fs";
+import { join } from "node:path";
+import { managedSettingsDirectory } from "../../apps/madbridge/src/tui/live/managed-settings";
+import { settingsSources } from "../../apps/madbridge/src/tui/live/settings-sources";
+import { offlineStart } from "./offline";
+
+test("managed settings selects the platform folder and refuses an unsupported platform", () => {
+  const mac = "/Library/Application Support/ClaudeCode", linux = "/etc/claude-code";
+  expect(managedSettingsDirectory("darwin")).toBe(mac);
+  expect(managedSettingsDirectory("linux")).toBe(linux);
+  expect(managedSettingsDirectory("win32")).toBeUndefined();
+  expect(managedSettingsDirectory(process.platform)).toBe(process.platform === "darwin" ? mac : linux);
+  const f = offlineStart();
+  try {
+    expect(settingsSources(f.work, f.config, f.managed, "win32")).toEqual({ ok: false, cause: "managed_settings_platform_unsupported" });
+  } finally { f.dispose(); }
+});
+
+test("managed settings refuses unvalidated files and the governed remote copy", () => {
+  const f = offlineStart();
+  const check = () => settingsSources(f.work, f.config, f.managed);
+  try {
+    const fragments = join(f.managed, "managed-settings.d");
+    mkdirSync(fragments);
+    writeFileSync(join(fragments, ".hidden.json"), "{}");
+    mkdirSync(join(fragments, "folder.json"));
+    writeFileSync(join(fragments, "notes"), "");
+    expect(check().ok).toBe(true);
(lines omitted)
+      writeFileSync(path, "{}");
+      expect(check()).toEqual({ ok: false, cause: "managed_settings_unvalidated_source" });
+      rmSync(path);
+    }
+    writeFileSync(join(f.config, "remote-settings.json"), "{}");
+    expect(check()).toEqual({ ok: false, cause: "managed_settings_remote_copy" });
+  } finally { f.dispose(); }
+});
+
+test("settings sources include the supplied user, managed, project and local directories", () => {
+  const f = offlineStart();
+  try {
+    const sources = settingsSources(f.work, f.config, f.managed);
+    expect(sources.ok).toBe(true);
(lines omitted)
+  } finally { f.dispose(); }
+});
diff --git a/test/phase3b/stand-in.ts b/test/phase3b/stand-in.ts
new file mode 100644
index 0000000..2d9198f
--- /dev/null
+++ b/test/phase3b/stand-in.ts
@@ -0,0 +1,69 @@
+import { appendFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
+import { basename, dirname, join } from "node:path";
+
+// Installed as a script in a private bin directory by the offline scenarios.
+if (import.meta.main) {
(lines omitted)
+  const root = dirname(dirname(executable));
+  process.chdir(join(root, "work"));
+  process.on("SIGTERM", () => process.exit(0));
+  const claude = basename(executable) === "madbridge-claude-v5";
+  const surface = claude ? "claude-code" : "madv-surface";
+  const record = (s: string) => appendFileSync(join(root, "trace"), surface + " " + s + "\n");
(lines omitted)
+  const mode = readFileSync(join(root, "scenario"), "utf8");
(lines omitted)
+  const stamp = { session_id: "synthetic-wire", ts: "2026-11-23T00:00:00.000Z" };
+  const identity = { provider: "minimax", profile: "minimax", endpoint_host: "api.minimax.io" };
+  const init = claude ? { ...stamp, type: "system", subtype: "init", model, claude_code_version: "2.1.325" }
(lines omitted)
+  const response = { ...stamp, ...identity, type: "model_response", response_model: model,
+    response_id: "synthetic-response", response_independence_domain: "minimax", tls_verified_host: "api.minimax.io" };
(lines omitted)
+    : { ...stamp, type: "assistant", response_model: model };
+  const result = { ...stamp, type: "result", subtype: "success", is_error: false, num_turns: 1,
(lines omitted)
+  const prompt = "Reply with your model identifier and nothing else.";
+  if (process.argv.includes("auth")) {
+    record("auth probe");
+    emit(claude ? { loggedIn: true, authMethod: "claude.ai", apiProvider: "firstParty", subscriptionType: "max" }
+      : { loggedIn: true, authMethod: "plan_key", profile: "minimax", provider: "minimax", endpointHost: "api.minimax.io",
+          verified: true, verifyMethod: "read_only_endpoint" });
+  } else if (!process.stdin.isTTY) {
+    const input = JSON.parse(readFileSync(0, "utf8"));
+    if (input.message.content !== (claude ? "Report session initialization." : prompt) || input.no_tools !== undefined) process.exit(2);
+    record("identity probe");
+    if (claude) emit(init); else emit(init, response, assistant, result);
+  } else {
+    record("launch");
+    let tail = "", count = 0;
+    process.stdin.setEncoding("utf8");
+    function accept(chunk: string) {
+      tail += chunk;
+      let end: number;
+      while ((end = tail.indexOf("\n")) >= 0) {
+        const frame = JSON.parse(tail.slice(0, end));
+        tail = tail.slice(end + 1);
+        count++;
+        if (count > 1) { record("extra write"); continue; }
+        if (frame.message.content !== prompt || (claude ? frame.no_tools !== undefined : frame.no_tools !== true)) process.exit(3);
+        record(claude ? "attestation write" : "attestation write no_tools=true");
+        if (mode === "cancel" && claude) continue;
+        if (mode === "attestation" && claude) { emit({ ...init, model: "wrong-synthetic-model" }); continue; }
+        if (claude) emit(init, assistant, result); else emit(init, response, assistant, result);
+        record("result success");
+        if ((mode === "fallback" && claude) || (mode === "madv-auth" && !claude)) {
+          const timer = setInterval(() => {
+            if (!existsSync(join(root, "release-monitor"))) return;
+            clearInterval(timer);
+            const subtype = claude ? "model_refusal_fallback" : "auth_failed";
+            record(subtype);
+            emit({ ...stamp, type: "system", subtype });
+          }, 5);
+        }
+      }
+    }
+    process.stdin.on("data", accept);
+    process.stdin.resume();
+  }
+}
diff --git a/test/phase3b/wire-facts.ts b/test/phase3b/wire-facts.ts
new file mode 100644
index 0000000..a4cb77c
--- /dev/null
+++ b/test/phase3b/wire-facts.ts
@@ -0,0 +1,38 @@
+export interface WireFact { kind: string; bytes?: Uint8Array; code?: number | null; signal?: string | null }
+
+// A silent stream stays parked until a fact arrives or the owner ends the
+// stand-in, just as the production rollback settles the host's fact pump.
+export function wireFacts() {
(lines omitted)
+  let wake: (() => void) | undefined;
+  let ended = false;
+  let opened = 0, closed = 0;
(lines omitted)
+  const controller = new AbortController();
+  function push(fact: WireFact) { facts.push(fact); wake?.(); }
+  function end() { ended = true; wake?.(); }
+  async function* stream() {
+    opened++;
+    try {
+      for (;;) {
+        const fact = facts.shift();
+        if (fact) { yield fact; continue; }
+        if (ended) return;
+        await new Promise<void>(resolve => { wake = resolve; });
+      }
+    } finally { wake = undefined; closed++; }
+  }
+  return {
+    signal: controller.signal, controller, writes, failures,
+    get opened() { return opened; }, get closed() { return closed; },
+    host: { handle: { facts: stream, send(frame: { kind: "input"; bytes: Uint8Array }) {
+      if (!opened || closed) throw new Error("stand-in write without a live subscription");
+      writes.push(new TextDecoder().decode(frame.bytes));
+    } } },
+    reportFailure(cause: string) { failures.push(cause); end(); },
+    push, end,
+    text(text: string) { push({ kind: "output", bytes: new TextEncoder().encode(text) }); },
(lines omitted)
+  };
+}

11. Delivery digests and attribution

pr/pr-title.txt  SHA-256 e92ca1ce72f458235121902eb2a09b254120e3a81c99606ce170b5c42113f4b9
pr/pr-body.md  SHA-256 51ef3c6155856b8795d1ad870955860882b897e6ed04b53ae49d28b83e056aef
tui/docs/verification/phase-3b-m1-build-log.md  SHA-256 63370c5aecc9f4396ab30be0f4f7dd1a03d9930fa519921c347c6b712097b839
tui/docs/verification/phase-3b-m1-evidence.md  SHA-256 3dc677145aabdfb10446d3b505575d6690ca3b08fa07057dd108c4343b7f5d28

pr/m1-report.md is hashed after writing. Its exact SHA-256 is in the delivery-hashes log and the accompanying final message.

The title and body passed prbody mode. The pr range from the binding base through the closing head contains all 13 branch commits. Both checks exited zero.

858-prbody-attribution.log, SHA-256 0b70762fa663c1442170abd0b0bb5c4035e51bb36ded18672c7d89abff8a3da4.
attribution-shape-check: PASS — attribution shape valid (shape-only; attested values are not verified)
exit status 0

859-branch-attribution.log, SHA-256 7812be16e652c9c81147fe118692a883aa1b414c2181e8b2abcbfd564c767481.
attribution-shape-check: PASS — attribution shape valid (shape-only; attested values are not verified)
exit status 0

Commit count and each message-width and final trailer check: 860-confirm-delivery-state.log, SHA-256 905f254a29483a59dce199343115c2cf54a027151b52049777eab24c9ff669bc.

Command logs through the preparation of this report. Log 124 was deleted by the Founder as recorded in section 12.
logs/001-governed-version.log  SHA-256 bd97fb5e9acacee1240d03514f2f90f685dc3dbcadc4c8f606f93c7bbc6c3726
logs/002-pwd.log  SHA-256 13f5012f6f160992bb0bb3e07f8527aec38947e3a19895c9e1e3778db445c518
logs/003-branch.log  SHA-256 0c16249f3da892cb59011e146830bfa07eb3a44c12c687542d7c90569d54e04c
logs/004-head.log  SHA-256 b89f2fbe80edb107eb7f075b85f453a47186a7341348f811184728ee06373831
logs/005-git-name.log  SHA-256 6bf075debdf4ac483edaa3a5a9bcb42702fc9b4b82df9b3ef10d09ac6cc8b563
logs/006-git-email.log  SHA-256 1949dc61a8d4a04d133aa6ec94ea10079583731f9000cd7131bcf27ab98474e6
logs/007-runtime.log  SHA-256 3e2d7aeb52c6505240911f9dc8bfa9beec6234b9d6920d2cce4d11d819fb7672
logs/008-commission.log  SHA-256 f5b7f38e0d1a192495225ed9371a9fb528fee16cbb40b419e629ee7d0065a58d
logs/009-base-state.log  SHA-256 7c5fcc9647c0ca16960e10d7e3088a17f80b9a3b3547a873e5f715627b81596b
logs/010-folders.log  SHA-256 532d5e41e5b725857a3af814b492dd446494aaccf72997114785b524b5985402
logs/011-prompt.log  SHA-256 2b01579eca5c79768745d2aacf9c4a830f01ec77530c856c09f0e91419ff4556
logs/012-deliverable.log  SHA-256 2cda3feadd038411b23a2cbfd431a00c398a653441fc803857c3b34819333891
logs/013-rollback.log  SHA-256 55f47ac4f11a3e1bc56a594d1e53f95d5d8b0e93836d66ec28d79e7a2505b5dd
logs/014-index.log  SHA-256 854f55c986c162eb491654c480c64e6c33e501e2258ac7a10677d06e1dc3cfab
logs/015-authority-verification.log  SHA-256 5e5ba47cf35c413c3762da6fa678cbdca4233cb5a1a596140ed45685466f0eaa
logs/016-project-instructions.log  SHA-256 de195f314f695101eaac77c2456dcfc689d9d7b0cfb97651a17b491172acb8bb
logs/017-standing-rules.log  SHA-256 7a0de1b0b6480e47411ae7bc9d5dd7fd4982d0bf2955e03997cd28ef7da4f28e
logs/018-grounds.log  SHA-256 fdad9878fac813e931a2fdad4e8be211013b281c795f3c7335b6abd9af8d1eb5
logs/019-preflight-lines.log  SHA-256 9978975f1f09e77ce23add965ad099742ae5e582ee93013f3a6f8ae965e84dfd
logs/020-entry.log  SHA-256 008751903d3aeadaf88be63c4650a406f915b17d2ab5a0e5a52b3d5cff5d156d
logs/021-scratch.log  SHA-256 65b97314405e2b94224d88945988e7efabb3049699abdb78c952b99505e7a64e
logs/022-build-base.log  SHA-256 ded0e75dda5acdbedfc1ce218944194f01a0f219a2fbc03d7d11bd45384405a2
logs/023-adapters.log  SHA-256 3e2c77d9c132322c85cdca322e1baaa70fb5be66c758570b85d47c09100b4214
logs/024-related.log  SHA-256 13e3c84c168a0f18f4f2a393c66142c6841711f3621684b6a034769faa2a6956
logs/025-architecture.log  SHA-256 84fcc971829e543ae44f586a7fa5ef36411a10c83dcc0b550371d4de4d245767
logs/026-seam-references.log  SHA-256 fcd1e5eb1cdb2085e625e3c2d01818e030a3016c483fc17b31d2707513f4624a
logs/027-tui-and-host.log  SHA-256 33c12dbcbf1c2ac5a623a6a70d50e33f2a0bb1e647b24f02359619600bbefeca
logs/028-precondition-imports.log  SHA-256 3e78833181bc2de7e7ad0118ab9c99e34f12b24c2a66fc025180de65d23a1460
logs/029-host-and-model.log  SHA-256 de6d64f773c350542ed164111cf2821ddf548d25bc40ec8d7a2b2ccabce2c9d5
logs/030-transport.log  SHA-256 0ed979596af47edda57a191bdd83594b3f8f4d3c9b3381a9faa31dbb1f605910
logs/031-baseline-hash.log  SHA-256 5cf60ab3d73bbb8cb63e5044a68a646562aa25dae1b4a8b3bb2da26d5608e2bf
logs/032-logging-helper.log  SHA-256 c42844d6cfc2eba5c38a0190597331a1415aa948a6fd629e56b51451beb2fd09
logs/033-baseline-install.log  SHA-256 bf687d4eb8d9b4c274e3f996634138159c9dd257f64745394f470eaf47a6bc1d
logs/034-locked.log  SHA-256 19d0635cdcf92c1ebbd1d45faca8850e897d7f0fc922e4757416888e6c6f3c9a
logs/035-install-state.log  SHA-256 e7543581bf53d3e7c44ba31e2c26e3f0679b8c1cb66f370a19b5d5b81e8118e0
logs/036-import-lines.log  SHA-256 f82f393a636c5baaef0684c7f77039a1997939e8202a730058d3a20d93d026dd
logs/037-transport-context.log  SHA-256 50af301a28640b7016298d454d90d635309242f86ad746f5f2b6fd79ddb050a8
logs/038-restore-install-mode.log  SHA-256 a4417523cf79033b3e961c3446fb7bb383fa228870baa0e5a48dc09186464db7
logs/039-restored-state.log  SHA-256 56d14390a9bbd5ac1864e55a11becd34f9dd081ba1af9273e0d56323f039c1da
logs/040-baseline-types.log  SHA-256 ebb983ada6c3506848665278b73aae6a29526a6b162178b370ed20eee419cb79
logs/041-check-helpers.log  SHA-256 8e3275661d08198ecd02a8d266a3bd9116a75a2ca4455bf4632e38817970413b
logs/042-baseline-runtime.log  SHA-256 7c0650151550ee7d95b47cad5368cb780c9176dc58e7523d8a9c0b80ce0f232a
logs/043-report-source.log  SHA-256 61b2eeda335c0bca0f76dd60f7c66c16af1ba6a1d87b4bd3e68ed9caa214b606
logs/044-halt-report.log  SHA-256 7267a09736585fc1a1adc440620f254a748ca76fd08f1e33c99b584dc4bbfab5
logs/045-prompt-check.log  SHA-256 9ed42e211957366efdc8f21a2e34ac6760700af4a823da6cc001921a45f70de2
logs/046-prompt-files.log  SHA-256 adfb111ccba802e6dcff076b8ac1babd158cac6d1d1d3b72a901753d5b68e3e9
logs/047-governed-version.log  SHA-256 6802d9eb279e0bcc65208e89fa607672b53e3e02d516e9578022362d1022e982
logs/048-head.log  SHA-256 21e52fa18f32feeadb67be3cce89e71014e082d240ee6be6abb9b0492eea4151
logs/049-clean.log  SHA-256 01032923767dfd3b1fc9f7f1f1774cfda4f55af4e957f172901b83726aa21d3f
logs/050-halt-report.log  SHA-256 99160327d8cc9f1a998611b604d1174da9bfc82c27f8b5d151feec30f08a0d4e
logs/051-runtime-log.log  SHA-256 0df01e8576c5a3aa062e2520377676dd061ff45c6a50f2e818faeb3cf298f7ee
logs/052-evidence-dir.log  SHA-256 d56bb882cddd92b3592a4f2bb5d1ec79694959055e24ebb3f77041d54bf3958c
logs/053-remove-dependencies.log  SHA-256 d5813af0add60eec52e802b30638f3e647b9fad164df5e6f942392916abafd15
logs/054-resumed-runtime.log  SHA-256 2bd25b6d63f9a058365dd2b0e919b9868570df2830498b983bb63a417312cfab
logs/055-lock-before.log  SHA-256 4595768440915a16a4602a5fdadd099dbad0a28944ff1bac6575f18a00f79586
logs/056-resumed-install.log  SHA-256 09b5a9a3ba849cebafa110420637e38aacd6890b7dfca3798c3c5469c12a5c5f
logs/057-lock-after.log  SHA-256 ce260707f5b2dff20a9fe067055fbe42e23f20cc9afa349d5506cc3f90b1ff7e
logs/058-install-diff.log  SHA-256 e4c06320f1961b541ff27d6360116bc01cf2e9df512aacc117bf2418c963423b
logs/059-restore-mode.log  SHA-256 0a1492b7e5f4da264247eb8d1a717b19cc2b95f6af8a8704f326ae9d6f86fca2
logs/060-clean.log  SHA-256 252a444c81b6098f9399fed1f6986e2415eda1b9cc061b15c9c755ff3523df28
logs/061-resumed-types.log  SHA-256 3f8cc32a57c932b5baddc273d433e84eea652723b8f8d7ee5068249ace09a1ea
logs/062-pre-suite-runtime.log  SHA-256 92f37cbfadb4c7210dd30023509e955e06cb0f9f34c0754e20280287991e2daf
logs/063-baseline-load.log  SHA-256 14220fedef8d3344da065f1ca8456def2ffbf5dfbb690ea7ba74d416c6f19c2a
logs/064-resumed-baseline.log  SHA-256 36590a0c31beb1f2f612d9aeb2d712783ffb63f63d5bb6fe470a817a5ceabfdf
logs/065-health.log  SHA-256 10eef9b47c7484a6b3be6f3dd60ef65462fc3fc0b0cb6509bd2025da96d661c3
logs/066-m1-design.log  SHA-256 0c73b79a30ea51c34d301c61e3a2d8ba248e14703b98679ddc6cd7d03854fdaf
logs/067-host-protocol.log  SHA-256 437ad8139fa349e2dfce7e02f1bc3f3e1d38f9f760c098548726076a1662f4f8
logs/068-file-layout.log  SHA-256 b5c7dc168e901378980636b24ebc2037bb3480d7cf175a7da653675896ae307a
logs/069-settings.log  SHA-256 0375b3823a0f1acc631d81a8441273764160e2b0edca12d01c444c84a06ac3a4
logs/070-detector-registration.log  SHA-256 bbdab59651f1da041609ec99a4abc6cab8be5b67968415790c9345548b9b2458
logs/071-barrier.log  SHA-256 d70052975e83ae72d262f1ea1f8bcfbd75a089cbf0d54ee22cba3ffa24121980
logs/072-spec-section.log  SHA-256 e380a540389dec0786165a6cffbdfe9a76ac89d6184ebb7baae320740abc8946
logs/073-registration-and-launch.log  SHA-256 90f9b5710d840d169d261dc5b9bc137ca913687882eb47bab363aa9a8402ce55
logs/074-budget-and-git.log  SHA-256 1c47e685ec7acb60cccc8f41979b286c9757edb3bd0d6a5875cdfe5d8e26a50c
logs/075-base-list.log  SHA-256 501aae2c5064e2f3e0b761685485ede9a89d75c35db6946dc94ff95d6c243a63
logs/076-base-receipt.log  SHA-256 9f01d4a3c031798e18eae4a93191dab19aa282899255651b1561d8df1be60e5c
logs/077-settings-and-cwd.log  SHA-256 1cec5131a551f1fe7b68c1d5e83d60f51dd1f4f9a390fb99a119f60c993f5a4b
logs/078-input-guards.log  SHA-256 5923bfb5137b9f3ff5d63b995eb60691c182c9c5039f02033ff0f03db8429909
logs/079-broker-and-barrier.log  SHA-256 cb8f1ae9b71d537cbd8f8e1a3bbe0061daf5f41488c9b0d55e89e0f2984bfc93
logs/080-storage-limits.log  SHA-256 06a2e3d142e82e40a733ced32f8240cfb411ef1d93332216e558cbdeb44e4fdf
logs/081-composition-import-rules.log  SHA-256 d7b694796816d53e6b9b663a08e60e28947a2f82f431e17f93a31f2e4caec11f
logs/082-record-fixtures.log  SHA-256 9b13b4922d0df6f32aeb9d9502a9c135e82c49b817416a7e394ca2255c83975d
logs/083-spec-constraints.log  SHA-256 f9aa0b1b90a5a96b9447cfa8b2bfc9d4b26655a28b6073e907f27ea25ad7bea4
logs/084-probe-path.log  SHA-256 6c4b755aeb8349f8c20f8b7d829ac7393b7432838b6c0ff536d7b6eaa97ba7ee
logs/085-allowlist.log  SHA-256 5a9d814dee933d4e8ad6a0f2b14babb4272645dacb5036713516bed19677b1ae
logs/086-storage-files.log  SHA-256 e9420f0484c69a34a877e159a5307d25951d264baa893ef191adc9370fc5fe6c
logs/087-base-preflight-import.log  SHA-256 a5f2f4752716d6a7c1b4c3c3bf2a1c7946fb3f90bd2941363a20051eed6d23f1
logs/088-opening.log  SHA-256 7369a8eb9731c10fbc340b7048e22e13eca5528baaa4b5b30285e31e0c6ef138
logs/089-message-opening.log  SHA-256 ffb6ca115cf0a22f40a0ad2c30df24872fda18010d5ec036106277c6236fc4f0
logs/090-stage-opening.log  SHA-256 0df8c12f43543d8db27ca86fca45ab2b24f95d4de0a895b8a222874f7e327e63
logs/091-check-opening.log  SHA-256 87725610dfa210de0cebe7317aa1c35597f41a83cdd00aa07a4e63cce321f6c1
logs/092-commit-opening.log  SHA-256 315c9cc644e1007dff57d7429a1aa0bbd1c395d1588979eecc16ddd54950c6ff
logs/093-opening-sha.log  SHA-256 01a0d234c222e160f1d6b3b1db080b44f4b702e235ef10f035e7b55b5f2a0499
logs/094-storage-root.log  SHA-256 652838afae4a22fdb8ca663669b9a784ffa2cf1e112b6c519aa32e23d9e37b7d
logs/095-fixture-build.log  SHA-256 d0b90ab30bc72ed1399ae8e24f0006b63ad81098b05f62e4d456f75d383b061d
logs/096-runtime-contract.log  SHA-256 08cc5b46c24f4fcbea7d7c5f4de9b01aacaa30dc4bc0e3be1e8da9daeebf0fae
logs/097-option-types.log  SHA-256 9f20d95d8e7c1a935b712cedbf01c8b770544aad0999f0298b1b5be352e8c207
logs/098-edit-port.log  SHA-256 37b5648ac40165e04482dd1980d3e5ba040f473011bd7e8ad75ffa3e1bf46239
logs/099-port-tests.log  SHA-256 7e47ef32fa6725f903937cb474b794cd39c7d1a3fd039b9eaab7c1530fe668c9
logs/100-r1-runtime.log  SHA-256 cfe607f7a57fff088f66870972ae3f76c7f49c57db762e7c19e1e72cee6af564
logs/101-r1-load.log  SHA-256 4bf3115b02ffe41f6371610b4c92f72be60e46b4ce28c9420d1212935e8f2f97
logs/102-r1-port.log  SHA-256 384f14862159f105d58fc4b39fa588242df4ab331af0437f67537b5c9e564fe0
logs/103-subscription-test.log  SHA-256 420c13cd619d06fa250f87744f56915d1b39c73b803c4fba74fa1214b6d8bbd3
logs/104-event-fields.log  SHA-256 7a743dbe82d2975134e8d834d36ad5c893de5b46627c8cf35ce4c753a6e15b5e
logs/105-foundation.log  SHA-256 b09bafb040a25319dec6b99b0404c6d9d16c8d9e1519c514882145c0c60e14ca
logs/106-r1-correction.log  SHA-256 3b616e51a5b7faa502f23966bc1ed1cd59280270d2928096b90e9be894442569
logs/107-r1-retest-load.log  SHA-256 e6d2d4931b08c7f98c1c3bd813fbd5576e8649bce488bca1d96c5f6d67dce5e5
logs/108-r1-retest.log  SHA-256 005996ba5f6049b72bea2164bbdb0a421d6b12a2e30d15b1fac45cf97279fa98
logs/109-adapter-package-files.log  SHA-256 9b40408b69353f1f57275363d963030c309f50d44bb95b576e436f78708f3dd6
logs/110-surface-handoff.log  SHA-256 f626db0a5fb12b87f1094d9540895b64d2bb31e351aed7a1c6af823a5771ec1b
logs/111-broker-phase.log  SHA-256 74f2faedea7e7f86f52de7541b5563dfb6d9cb2f5bd8868b9a70d908435078af
logs/112-r1-message.log  SHA-256 13fd9981f85875d480ebe07677cad2989a973b194c3a1304d345577d170f515e
logs/113-r1-typecheck.log  SHA-256 bee222926173c7cb47cbcd1499463538a6f26f30b21a70edc61ba8a91e3e2165
logs/114-r1-message-check.log  SHA-256 d81ffe66ea31521e05886f9282a63ee1bd8586babeea32b42b79af87bb93b813
logs/115-r1-stage.log  SHA-256 172b81a9bc7814330c9b42f010fb75dfda967b0e041ec67e4df5992d96ce7a51
logs/116-r1-staged-check.log  SHA-256 2c16c62a8427900cd523b19ea52db53c71a9ca411b5b40ceadb8b826b21198cd
logs/117-r1-pin.log  SHA-256 722a1e6b703c71e45bce26e6a89191eafd7790de43e3860b0bb15042d8c4d413
logs/118-r1-commit.log  SHA-256 0b5f642fb1c4307d1c3029f73e0eedab1305afc36be590e5a7956dac3b8c6d68
logs/119-r1-revision.log  SHA-256 3312881080acc1fd83508eab36c84563d893a5ae58b5b4d94e0ed2e2e029a1d6
logs/120-break-untrusted-detail.log  SHA-256 7a05c921b5e867fda9f5d094d0e47163d54eb60c84e6d1164c514c53bef1a528
logs/121-break-detail-diff.log  SHA-256 85f9920356efc3fff664fa80611e9433303d803852f932e213dca3ff45bdbcea
logs/122-break-detail-runtime.log  SHA-256 d654c1cdc5ea059b9ef9040ed54db33d3f85d411a385fb490046fa0d7a686d67
logs/123-break-detail-load.log  SHA-256 be42b174d17f52ea3c12943cdb57ea11e1a2d4d4217b8399af89f8e69b837c1b
logs/125-read-addendum.log  SHA-256 ca4181c5c5bb8737337405a4edc5b6c07f473f2a1ada282bf4b3717f7f50b730
logs/126-resume-manifest.log  SHA-256 eeb8506f067d587772854b2fabf52168b801d317f47728040b75a585df83f9fd
logs/127-resume-files.log  SHA-256 e95e3c4dfac2041c83080322f82a4cbad9934d39a0aadd6760e16f4d9224a77a
logs/128-version.log  SHA-256 bccc2ab1cbeeea4e93ac4ed9169d99fdb690344bbbc342248d6cae03d308bb7b
logs/129-revision.log  SHA-256 8db8aa8ffb59cb4ea3850336e531b86f31898a2bd315907a7bb98e5ba74c8a52
logs/130-deleted-log.log  SHA-256 fb7669c22cb4acb2a0ae433f356dad8a237386251b6ec657352f1738d0035bda
logs/131-reports.log  SHA-256 3d2da6bd2028bb2bd4e70b88946b6bd5f6966e37b4eec8cb77f84a01198cc060
logs/132-check-break.log  SHA-256 1a15c93413c3f2e219b8d61c65a23cf931727ab1644df575976c9497da36d60e
logs/133-tree.log  SHA-256 d2dff9fe89654816c3b0c266503fa0c174a3883fdb253b1a7578690ce0fadbd9
logs/134-restore-port.log  SHA-256 9e70474d550b32ce6eed878b95c22a793d1bae3e3c9fbe83fbc5a1ce7a82735c
logs/135-restored-status.log  SHA-256 6b67fd7da623ea39eaeeadd8b40509e50c72e01cf7c90424480d578e6ad1d2d6
logs/136-restored-digest.log  SHA-256 e1c7679bf5b2f0754ff2ef534a6f696879e84322881637941f6bfdd1bf451873
logs/137-audit-files.log  SHA-256 dc0ac07913ccc672929ceba65595b6f7b9b1478a0ce51fa2a7609017e328e303
logs/138-audit-test-sources.log  SHA-256 1132f0c399eb94400a2960a124dedc21463cc7172bc4bf4fb3e58c6480ad65f4
logs/139-test-output-fix.log  SHA-256 3f869c12b9eb7d7e890a93f9d31c300da0f63332947549616c09b07cb0668b7e
logs/140-fix-runtime.log  SHA-256 4126d7510097897f81b8035104db923c27b337e89e2265f47c5c3d6cf87f3039
logs/141-fix-load.log  SHA-256 b02094d87334a8e2e6c33ea0c75dc29f4ab58d79260fed4c77a86b1147c132ee
logs/142-fix-test.log  SHA-256 3612a3b2cc006cd676bd53e0128a37db6339fffbdc0e23fd45106a659df49b63
logs/143-prepare-fix-message.log  SHA-256 00cdc13780fe0adbe1561a15016744c3d23bbb8d9fc01f81b969ac811c0113af
logs/144-create-break-tools.log  SHA-256 e8589589ab80694ab954da21e59fea23574fded75e8fc44957bcd5772d9fdc68
logs/145-test-self-fix-diff.log  SHA-256 d8244bbe239c2d4ac931a32843221e45ab0406a4d65c55503f4c716cbc79868f
logs/146-fix-trailers.log  SHA-256 2ea8b955385e07f5c84a9ddc3f30d2e0a8953b58da4728da54fc70e3d10e47e4
logs/147-audit-separation-change.log  SHA-256 cf5ac5dc8dd85b6715c71c0ca1725aea26a920019e078fd97ca37b3249d598d4
logs/148-repeat-break.log  SHA-256 6b7c88a0af95fab36e4fb7de82e6fdad6b50402f8855ac2389a7bcdd4b3d544b
logs/149-repeat-break-diff.log  SHA-256 ea2a1cd4b916d95a8e4dd59701d5f4b6fc7c2ee197d27191e1d1d0c425036170
logs/150-break-runtime.log  SHA-256 8c51b9cad94773ceaf4e6424a411dddcf37c048ecf22a2ba0bcccd1286b1fc65
logs/151-break-load.log  SHA-256 a07c47b48e8caca7c1ef4179b7554d1d2800dd5d6ab8c341d3d85a92853841c8
logs/152-break-test.log  SHA-256 7d9d45506b5712682a1511ecc707c7ea15c1965afef67797f2f80bbbb86125af
logs/153-break-receipt.log  SHA-256 2f54f7799c82d5d9957c9096391f874744180240d5ff26a27a685361d813e3f0
logs/154-restore-repeat.log  SHA-256 8a93216a453dab27e03ccd4bd568a315f13073b14fe652f7d4a8bdff0fa2a280
logs/155-verify-repeat.log  SHA-256 4d8e9f7063a6e6b05aa86776edf3754f16f82db932974f2760b0931c0a64ae1d
logs/156-stage-self-fix.log  SHA-256 fa4843323e94577babcc540447ee0305eaebe10885b189add79c2e239cb8b22b
logs/157-check-self-fix.log  SHA-256 31efaa0990534dfb36f432b3fd6188a4237bcae1669f9986629d60aab2eca276
logs/158-commit-self-fix.log  SHA-256 8bbf3468674734b2aa2210348e062c16a917a4c0e8882eb7e58d674a3c772be5
logs/159-self-fix-sha.log  SHA-256 4b473599c4256d18fa571d7478308ffe64822757c5f399ecb715a1a125021da0
logs/160-break-monitor.log  SHA-256 d6d379f615a146d4436452d9a5123302b616b2d6eceb8a101aa7f52a73949479
logs/161-break-monitor-diff.log  SHA-256 d9590e77ffd7f13e56dd85a58a4994992f3493a3ba2831ac7b44122f5f274d49
logs/162-monitor-runtime.log  SHA-256 60843d69bd16d1acbc32cd8092599c83a6df0784381005c37832a883b59deb52
logs/163-monitor-load.log  SHA-256 60ea356a2cb03e4a5feb3c391ae87518ae15d282bf1e3c653bba8397dc2ceca8
logs/164-monitor-test.log  SHA-256 f7704054d61a75fb801b59618fa584664ef6730554932cf0514199c06c654a12
logs/165-monitor-receipt.log  SHA-256 21a06d01270da7ba8fd515123962b03b25461a0d5439a704735f9932387d909a
logs/166-monitor-restore.log  SHA-256 2ed7ec0a4ee07825bce42756f82bc3a971e5c4adfd9fa9f5edcb0727ace64461
logs/167-monitor-verified.log  SHA-256 03d25b7c4a606aa8338ca27dce3e667ec53005143b23bdbf5a88ce9e4d18050d
logs/168-claude-attester.log  SHA-256 5be2da96999311bfa9ed7a4fc6cca0d3449b77c6e513663575e9e36554b4ff2f
logs/169-write-claude-reader.log  SHA-256 45e2e34c4a2356d1a3d002101a1e995195ba3363896a3cac11573afd3a0615b0
logs/170-claude-tests.log  SHA-256 04f5aeca0201df869e11f449aade842aa8ffacb7867c7d0fbe2cad3cf9803363
logs/171-claude-monitor-cases.log  SHA-256 7dc86472884e3426ce4d10cd6186b7a48f7c515691aa28937af89b0ca1eebb68
logs/172-r2-runtime.log  SHA-256 7e37dcc62294f9a18f20a0061fde58f672200f73dec2860e4c0e75d06e39b94b
logs/173-r2-load.log  SHA-256 a3d7522a21aab3b6b01d5158246e8514a66e6c0fe5cf9dc8c81c51f68d2ac556
logs/174-r2-test.log  SHA-256 0d108994681a602993b8a77d4937f272621e145a83abe790bd6ccee0b4c6fa51
logs/175-r2-message.log  SHA-256 b6efbf7e590059ece2f36012a136828ce6d06948c22b69308106a080411c2d89
logs/176-r2-message-check.log  SHA-256 b255ee4547dcc21bb8ea9e14742dcc9ba0b0423b1de66c897947e7c002bd957f
logs/177-r2-stage.log  SHA-256 d511520f62a8c0140cd6d5ea24b1a180dff2f7cd1ad0a847f8125e4f984ec3f6
logs/178-r2-check.log  SHA-256 5cfc96848be0f284fc122e2ea39862d756a4d0fbbea231d84b8d5fbcfc82258d
logs/179-r2-commit.log  SHA-256 69289a0d93aae61e781e84925d12b468fc18b0757ccf1ac6aa0b8c2308392d21
logs/180-r2-sha.log  SHA-256 3e8f94c85d495c0329980730176e9e28486a8cff29acdfc53d9c96e8a041fa80
logs/181-encoder-break.log  SHA-256 f5c5347367352bbac18c791fa2f9e8c947e291aebbd64388986f32ed2e171592
logs/182-encoder-diff.log  SHA-256 612cad54423f7cc4214c32a1dc1cf73e76427fa6de12b85fee039c90e4b65788
logs/183-encoder-runtime.log  SHA-256 1cb1de3fd194315816ef99afcfc462a64cf66e8d629c8e6d0f9447a250a67a3c
logs/184-encoder-load.log  SHA-256 374c26fcb5786f313d24ea1b61e499425ca0fc888717b69d7252807bf7412b78
logs/185-encoder-test.log  SHA-256 7c2146f45e5e90b02be40a3693815f871cbee87f2e1a8d14e2cac8f7b7d9603f
logs/186-encoder-receipt.log  SHA-256 0e25927757621bec0a55d36fc055ee8e85186eeed2a3211af553c299e5ce58eb
logs/187-encoder-restore.log  SHA-256 d8b99d13a57087649f5b59e61f78000becf380877584beb2f140bed73f061f3a
logs/188-encoder-verified.log  SHA-256 25238bac7f38ed50210db27723267046817f99f21ea0e1208f35fcb36fe158d7
logs/189-provider-break.log  SHA-256 a24f4c9b0b6786e9dcb66a61bbd305cf695e49d62c9e6b6024e14e32ee0569ec
logs/190-provider-diff.log  SHA-256 3268b7a0e9cf34df123c9ba001ced75a5c6e275eaf9fbc97e5315bf6b9846a5f
logs/191-provider-runtime.log  SHA-256 976b1a79fc44106fb158534473274d48f92b0115058b942ea3cbb8380b644541
logs/192-provider-load.log  SHA-256 6e5a68a2a2ea15d634ebc8b434f7023c003695f9435eb74edfc4f273e342fd6f
logs/193-provider-test.log  SHA-256 8fd80090fd1520948978c07407cb4920d19d776f936249c9b529f13b6ed82343
logs/194-provider-receipt.log  SHA-256 9ea0a590615ce7aafe84f38b6badcf81c3f3d4fbffb6f8c8a4edc1c5d06f527f
logs/195-provider-restore.log  SHA-256 e0716fa8f7b5829ec9c8d06bbe9dba6e9af808eb2c522dc3865cffeb25bc92f2
logs/196-provider-verified.log  SHA-256 2dbaf61ce8c78a775bb9e1eea8c768eaae7be96834e5b8c0025a1000807ea617
logs/197-echo-break.log  SHA-256 19ac13a403c9388b553c6759ba8df51be824dc90ce22c4f9c0525564b0df96c3
logs/198-echo-diff.log  SHA-256 b591a4abbe04eeca870858e286d897682a1ec93ca9ca4def66119edc80ffaa94
logs/199-echo-runtime.log  SHA-256 22510f2ad4a84865fb2dd309754889c7550288f5b2c80f8f5b4c8cde02e0f2f4
logs/200-echo-load.log  SHA-256 6a12f0f0ddf91ce1919812dd8828e4337f17c9882d7a4c935c3609720fdf2a9f
logs/201-echo-test.log  SHA-256 c5abb6b1ca639cf363ebdecc1f9efbb304c58a378fb2d36b59bfc974b596582a
logs/202-echo-receipt.log  SHA-256 b6726cc9c2c9ba12585240c89b9c50fec0024b1a1af73bfaf9aa59a21ecf174d
logs/203-echo-restore.log  SHA-256 58354940903bcf352296bb2692298731e4ae39ac005e1cb7c4138e35c9dbd630
logs/204-echo-verified.log  SHA-256 ea66052a07c581ba59eaec2b09bd5061a5a16ef7a9c6850752b181cc592960d4
logs/205-rounds-break.log  SHA-256 79e6cabb738a7bcf79a19af73486582fd3212da63fa337d48c40abab58db52a6
logs/206-rounds-diff.log  SHA-256 886a00f19ef033b86d7a3b7beea8515203598c539f480707571acdaa37b33522
logs/207-rounds-runtime.log  SHA-256 7960bf890aa274f1678e144958d0de463a918c483598284e3c6c66cd6d9de0a8
logs/208-rounds-load.log  SHA-256 bde797b4f834d1d1176b213a0f8a84606ba462fd51621a361b2d7277404e91f5
logs/209-rounds-test.log  SHA-256 e7331d3f4d7da841240cf28d1f53f91db79977fbeeb18d61d444edf22a9ba075
logs/210-rounds-receipt.log  SHA-256 7ba92824994c38447eedb1a603a5c7c82560298552a81065431e81c9f58359db
logs/211-rounds-restore.log  SHA-256 071fc3f8b42a036e50608166627aaf65a987396e3fc962211f4118b703567d16
logs/212-rounds-verified.log  SHA-256 6ba4e39424b49d6816d7a4dc474bb2657637da53e07f1114d0dc815014310b82
logs/213-result-time-break.log  SHA-256 ad636f040688251a0b8da7a7620c81313326d718bd1509615396cc9953fc6206
logs/214-result-time-diff.log  SHA-256 f1e7a57ec1cc04cb471747a10f32e46b81fcb3b73fd25fd6e61c1695cb8e9f26
logs/215-result-time-runtime.log  SHA-256 d57994ad959715c9e9558a9a7a03aadcaaf94a2f1c6c90444e1ab619b137cf03
logs/216-result-time-load.log  SHA-256 d2f59f5a71c9ffd52ecb3eaf25b0229d3e0d84ad30151266aba655a059c8d89a
logs/217-result-time-test.log  SHA-256 bc7e6a4f917a689fa6c20614fa295568c06f75083b426fcfd346322ca5f48bea
logs/218-result-time-receipt.log  SHA-256 bc26fc0dff6e5f9d86a4f318a1411ce4c71e44dd27ebd93aa58d11426b57a175
logs/219-result-time-restore.log  SHA-256 bf3c5c3f2921d681cf6ec470532456ae1d41b6d4662651e5c8e57f6362584c8d
logs/220-result-time-verified.log  SHA-256 3eae840a274efed4086003e34b54c78e706ab223fc6b70f17660fff44f100fe1
logs/221-partial-break.log  SHA-256 dbf0911b297e09c2a6ce163c63c4f275c871f4f7a72a3dacd705e8fe2d956b5e
logs/222-partial-diff.log  SHA-256 bfe6f1cadac9424d881dc58ac7f62d71f8338ecb7f10ab54fa5d62eae03c5da6
logs/223-partial-runtime.log  SHA-256 bc50f2aef45f5cadee0e39782d2451c5ebbd4dafe45ae0c6cd5cf3619e34818f
logs/224-partial-load.log  SHA-256 c8ca7239d2948bfc58143aed2ca717971a0bdbb4da944fd01f77cbd56436c30e
logs/225-partial-test.log  SHA-256 7d2af7e4295b95302369441e51b731bfe4f2052a86a43893bd4c6b4cbb2758e5
logs/226-partial-receipt.log  SHA-256 1c561143de51cfd84fc78138d2a4fcc3ae4b6fad96a8edb73c7b8ad0213043fb
logs/227-partial-restore.log  SHA-256 f74336f9c715ae015f68a19794371b55dfbeb5c9b9955ad548eb288f490dcfe8
logs/228-partial-verified.log  SHA-256 ce961864bd663ffcdf85465a06c2497e9bd0c07c48988e17393c5c394edca06a
logs/229-fallback-break.log  SHA-256 6bb96f8eda400af800bbefb55b3f37d27900820e0f2bf4cdbd7c4622204bd352
logs/230-fallback-diff.log  SHA-256 49724513fa4d6e27b8c1da113d9dd09c84d244227162c59a18ca45a20a3200b6
logs/231-fallback-runtime.log  SHA-256 b4b44c1fc543c70444aa4827ef9a23c8b768a8f8b7be679cef7269845f8f3450
logs/232-fallback-load.log  SHA-256 8eeee8d65d2ac9badade2b43b054fa11351cedcc4f8be941f3a9bd59a5f8e54b
logs/233-fallback-test.log  SHA-256 d3f22ef7035acdfbc4e79ff2ad2853faf9ec1bd924902697efe6bbd2677657d7
logs/234-fallback-receipt.log  SHA-256 2dabeefea395b6537bf5b692a3e52b1369575fd73fe6eff13fabac6b891440fb
logs/235-fallback-restore.log  SHA-256 bf03310e7fe88a602b8b64a82152a35458eb3554d01a277e4713fa701c255aa9
logs/236-fallback-verified.log  SHA-256 5f7fd02465cca2f219e2eb1ff2590540d7ec554f5e0e6815239a30c287f49948
logs/237-madv-parser.log  SHA-256 fba539ce7a5cfd8e4f9e238f47dbef65d9afd148598e41c399ca8c71d488d5a1
logs/238-madv-plan.log  SHA-256 6ed95045df1a989d9905c5e0121117a616d3f4c3c57b94f1fc0ff150c55d5d2d
logs/239-madv-act.log  SHA-256 a91a70b1f14b6b772eec64d8df21aa9efd0adaeb3d526cbfe581cb47af8f122c
logs/240-claude-wire.log  SHA-256 24a741e737a24124ab5b7a361f21777110f49c0aef6b8b42a55eb4dac0125a55
logs/241-r3-terms.log  SHA-256 31ac8bf4600867de7f69e515a1548275dd0e5590eda27d3e98fb30446a6b7ca5
logs/242-r3-detail.log  SHA-256 fad5e15e83b10f98dcc9d960e482cba50a43da8a75e0a4cf28bd81580cf39cd2
logs/243-r3-input.log  SHA-256 fe827b600fdec83cd3643543e3e2c9f7319f92aa9b7b21f4a9f7511826f03aa4
logs/244-madv-criteria.log  SHA-256 559da6324b189897f6f22e81f96cb9315b0334952732557d0a2d18e3283cf6b7
logs/246-r3-fixtures.log  SHA-256 67897c873a0b2754f7c6811106f466a22612442697fb7d04fcf5ca1e828c197b
logs/247-fact-types.log  SHA-256 73f69710e58730c7b4d49bd3ed29a5bb514aadabdd75faeeb753716fa0c90a20
logs/248-registration.log  SHA-256 4f50bd2e06c9262e0b110b01627d2e434a08f17e835be9a98e143541897f5393
logs/249-build-handover.log  SHA-256 a8e3e4bbe3b7562300b6931792795dfb1b031b796fc158dc39c67453e1b5ad1a
logs/250-r3-parser-edit.log  SHA-256 8ef58c8a7bf4d281a1447b99da1fadd7196e205febf964a6c157afa654def91d
logs/251-r3-attester.log  SHA-256 3b8c09f968b6b4e21e1d225fadb4d0818b5e0616f64565d93fc3b79b5c156be1
logs/252-r3-runtime.log  SHA-256 a8d9a6d745e02d5e7910952c35b6ee4a7102de325e5702bfb77d251b743be713
logs/253-r3-tests.log  SHA-256 95e77f50f1211249fdc0472480a2f29f878127b76609904d214c6d7badc0cbde
logs/254-r3-load.log  SHA-256 07b68c5c854285f2a0be631b6701b856bf6fc6c8be133979c3433234a5da5c58
logs/255-r3-test.log  SHA-256 a4a4426276a40de16009c326f877a9ca3e36ae4eac1ca44e0b61efb4fb9408d9
logs/256-settings-terms.log  SHA-256 1dc4929cd9d7663235d32336ed9fc36dc0ab4b8f18dd8e9232e17fb0a781c79b
logs/257-governed-settings.log  SHA-256 8e65623e40b2dda2577891feb16c4e27f8214cdd455d257f3babb4ccf1b1cabf
logs/258-planned-remaining.log  SHA-256 2cc3a7e5cf310555ad528c3928171c28457e187945473f2b032935f671122809
logs/259-commit-tools.log  SHA-256 dc17db61b6e50097f05552de8523ef098ca1e2bb677b42e706b894b4dbc3b5df
logs/260-r3-whitespace.log  SHA-256 5a3a50b166f11cabdeffd0c84ccff1b0466af67623b382d4e2b3bcfd83b001dd
logs/261-r3-message.log  SHA-256 b1673c37239c0fe3bca5050679995b1f038bb5015a7c835363a15fd96f81ef01
logs/262-r3-trailers.log  SHA-256 b0f4c3c05fc8a0882756c681466c5d80ed1265fab15ab41c9debc0a8869d6431
logs/263-r3-receipt.log  SHA-256 49db861b98d756e2342b5085a7d23cb0dde49de976bea8cf8f4ea38291d05878
logs/264-r3-stage.log  SHA-256 7fce309a476e05f669c3d06635853992cb2c91512713f2b5376a8078e1590b5a
logs/265-r3-commit.log  SHA-256 ac019d5b818edcce46da56733563298662145c73fa2c8ca21032b506a9dadead
logs/266-r3-head.log  SHA-256 4669ce6762d03367dd293996ae23c5f1a621c3ff724988f5312339ac9069bb6a
logs/267-first-write-break.log  SHA-256 02cb085d80f0f70464d2f01d07b922980e63fc41a258a53962d0edc5977105d4
logs/268-first-write-diff.log  SHA-256 b9fe77ab045ad452083918929f6177bdbaf4461d95f62979402bf3bbf4b7c3d9
logs/269-first-write-runtime.log  SHA-256 70c1d7e562119f0e2864fe335e26904874e723ed1b6bfb6e69cdbb39d57d23e7
logs/270-first-write-load.log  SHA-256 428c480f2f87d3e4b31b40d99766e4893c7a9ce38fbf6a75022df978f0ccf052
logs/271-first-write-test.log  SHA-256 1f1865b602f2af451c318d0784d4fc749c9168839cbb489690009b367adc2e57
logs/272-first-write-receipt.log  SHA-256 2d72f260318062bc092b83bae089e5ba58bb0e99926e87a7507eb2c6f35f7ea8
logs/273-first-write-restore.log  SHA-256 bb9f0467b3efc92c5375cf49b50bacbaef7ebf12f43c2389cbd1893f1b1f78d7
logs/274-first-write-verified.log  SHA-256 d8d21e3d46ac052065fbf2cb941c008871fc5ba25a8c61c7f961f51b5ab70863
logs/275-assistant-break.log  SHA-256 1e6e3550e22579c981f4129b0af554613fc824f80bb66e52d6422137ad4cfb14
logs/276-assistant-diff.log  SHA-256 fcdcdb4202fbe813323e89954a9fabab92c957f864c6545d9df6b1b169981317
logs/277-assistant-runtime.log  SHA-256 aedd4e4397114c2e408db040131dee86476858808b53ec1bca34896096b0e3ab
logs/278-assistant-load.log  SHA-256 c999a47a4a692d99ef45fffd3915da2f6ea4f900285b3f2e5e58925ba8993b49
logs/279-assistant-test.log  SHA-256 f5a849cb736a45a89be896c534521b965864d9f0436000bf064223795f1d0961
logs/280-assistant-receipt.log  SHA-256 36d70af383094d2cb2a73b78e70132d278694cd5c73e0634918d1a162773c599
logs/281-assistant-restore.log  SHA-256 20bf7d8da804752d96438db4e8871f4f077093dbbf0eb266d57a587766d248d7
logs/282-assistant-verified.log  SHA-256 03a4b224117daadb72bfbe7cb38b2a16c696e20a62ed1b163b5658217b37003e
logs/283-extra-break.log  SHA-256 1f3394d31c0a410211e452524b9b2816be4435004a9d9c7d3d1bf3cd0d72dbab
logs/284-extra-diff.log  SHA-256 a4095aebe39b0e341fd418e14718a58907ee5980725b9e45e65fd8b7810dbcf3
logs/285-extra-runtime.log  SHA-256 8064fdcdda3bfe7f0c6fbfe4def4415bc84a640855dee871ab45e2881eb6ae37
logs/286-extra-load.log  SHA-256 4823baa36f6122ab60a0fcbd421f6afa369694f0217e1a1f9b3ae21a58aac242
logs/287-extra-test.log  SHA-256 d357cb89491f8903f834c0438f827c9d0cbdc09723b99d6b9a7406ed9bcd29e3
logs/288-extra-receipt.log  SHA-256 101f69de23d56cd75e8bd9186b67bd847feb6ecafcb4b068793e3ce66c0880ee
logs/289-extra-restore.log  SHA-256 88945dde00b2bc9635c884533dbbf600c668f719471346d829f15701c2899b59
logs/290-extra-verified.log  SHA-256 c2e8677d04778ec82a22b99dda1ff8ba74f09136978da991931afb9ba5224047
logs/291-result-time-break.log  SHA-256 c2736beffb9ff68de6adfd1808092c8a4552bb16fcd93f88697d9ff8360f4c0b
logs/292-result-time-diff.log  SHA-256 fcbd7da7e4a1625297a9884a1c42b3756865a8092c94f0e9f0eaae40c0f41498
logs/293-result-time-runtime.log  SHA-256 06891f0023eb4cd3bb539aa1809bf906a5f551c5f2ef0bb6653bd6dc277d00f2
logs/294-result-time-load.log  SHA-256 cac72bb49a690d8c337507f3835a506a8846edc7c8db781eb8527a7fe7e78e2f
logs/295-result-time-test.log  SHA-256 9d2724a8e4e18488afb6cfd89a728670f964b9248e28cd9762ad9146f930382b
logs/296-result-time-receipt.log  SHA-256 822854419a29086f9e7da67de4b825961e6aee72f664b1ed6453987a4f81233a
logs/297-result-time-restore.log  SHA-256 d6a9ac927b49ce57265c40057484008d4eaad45b4b6929e2d1df6aa054895b05
logs/298-result-time-verified.log  SHA-256 c3337b943a640d45d04918c01218c0ce49863195eeba921c28bd760bcf5f2e54
logs/299-later-line-break.log  SHA-256 93fd4fe7b3a751c3e5d20702fa7aa411d922542ebc9bebaf92879a7128f7c052
logs/300-later-line-diff.log  SHA-256 25ae031dac4200f750fde30d2724d14890a496fca2f63ee865a72d4448d1333f
logs/301-later-line-runtime.log  SHA-256 b9f5be991d774479b630e02d3ec4e114e981286574cb77c6d289c4c1d5da635f
logs/302-later-line-load.log  SHA-256 774555ca640420894e5311851289eceab20ae76feed0059763cdafdfb1ed56c8
logs/303-later-line-test.log  SHA-256 b7fd5b1a2f67810450c2658259082dcd1b31cec6166dd829499b0839f37f25a6
logs/304-later-line-receipt.log  SHA-256 ba8e9d8e2f2eafd2e5b50e8303efcb247d7317747e5c96ff60d4bc5e61c4df90
logs/305-later-line-restore.log  SHA-256 e5975aab7f0aa97543f7f59da8ca38d3c42ab6dfa2fdf27bfe4a079d86f01736
logs/306-later-line-verified.log  SHA-256 627761fa2797e6f39567f27931ac1e6857279ebfdf39760e4725d6cba0ca8fbf
logs/307-preflight-input.log  SHA-256 12fb143c1d9ea44e54bf3ed3070058c81247138bcd65d237107d5c403d904a74
logs/308-offline-sources.log  SHA-256 ba75d77a9b5d3166527bd79a8d9da9504db746b89cf97140219c9e25b75750e0
logs/309-adapter-settings.log  SHA-256 495431efa510a697abfeab4c9b3137ecc020f39d4e2133a565c5fa494d9a6c34
logs/310-build-exits.log  SHA-256 e2e1bed9cd683dca88ab5e3e2184ee132bf2446c0442836b4cdd5b174396a62b
logs/311-port-tests.log  SHA-256 a7433a5d7270d276a391ac9d74e0ac04db7e28520fcc3a1c84856880754f127c
logs/312-standin-records.log  SHA-256 0bf5fa0edf7fc7ff17f48d324942590f933691d45c7461432e655c96fb555acd
logs/313-app-scans.log  SHA-256 d6165bebf5e8453909193987e8d1f2b0a7a20d80a643e576b0c84bdfbb28af73
logs/314-record-primitives.log  SHA-256 34767b3ba14c2f8e380a066df8a22bfa2e9f9655bbb1a939b8754b5704708a36
logs/315-probe-differences.log  SHA-256 3a4a40551511fc3c5914edd96ee81d900475b0ded33f74cf1d451e9df4b97a11
logs/316-leaf-deps.log  SHA-256 dd7cfa7b7cacdee9df2c078ae851a979e79a90c2413cd81d32d8dde3f78d5a15
logs/317-reused-record.log  SHA-256 bd97a74b7ff1ff6c521bae4b3a01f64a72c53cae1f4b441441d08cbeeea51f8e
logs/318-ready-process.log  SHA-256 3b6ba5bee0ada76c0551a289dd842b4686e8fbf48894f41f04464e39a35d3167
logs/319-terminal-mode.log  SHA-256 9d993404af99ed9555e8d5e242efb9ef83ddd6b1daac4e29ec67ba98ccdae25a
logs/320-record-builder.log  SHA-256 620a7654129d491f155ece90036e8aa545693da17e25a992441e46359e82df40
logs/321-interruption.log  SHA-256 f26c3c3a9bf8a6e37f5ab934f108ec0285257118332e8f1fb0be651f7c758374
logs/322-health-pieces.log  SHA-256 ab117d05578041ec098851fb216a17a5bb4c4ceec26857c9b7b23c1cd4d8131a
logs/323-freshness.log  SHA-256 83acc395be8d8bce30291e7c4091fd3dc2c8a7fef3fe99291dcd3ac5f3a66717
logs/324-live-mode-api.log  SHA-256 e7db353668c34cb525568e08e79872a4cb352aaa9757a34a2888f53326ed1037
logs/325-test-restrictions.log  SHA-256 8cdbd07ce0b8d02cd613a193ea36a8b7a14581536f824561bc2422b6915b9179
logs/326-detector-definitions.log  SHA-256 e2425d2761c6dcd3af11670d5e38df53a932d2485b10d999dedd451bf4af41da
logs/327-log-layout.log  SHA-256 3a7ac83d4253a68162596420879a905c5a6081d2ad8be6f481d78fc9edd39a2f
logs/328-scratch-assets.log  SHA-256 d8e7a08b1e92717cc5ed46c68a91cbed02f88cc587ebd7dcddf1d829a2bb00c7
logs/329-attribution-contract.log  SHA-256 70a30ab247ad8c3608a03e4587b8cba7f6aa40de8ca4b4b1409f268d4e20a565
logs/330-output-boundary.log  SHA-256 2be791b9f18041c9cd8b014db5fb6a9fd390cb6f42b5107328096a4fe9d404b5
logs/331-detectors.log  SHA-256 cdac152afd95521d3ec84e15a5421e30c955403d938558d9dc81e20e09bb4d82
logs/332-detector-tests.log  SHA-256 f8b4e1606fa38ddeceaeca03b60b3e41a9c36c31967fa1708b53a1a1271a552f
logs/333-r4-runtime.log  SHA-256 8238b9e6a5866d027ef9ea4d581f755cf9b1f5661af04d4ec1aacf52529cb898
logs/334-r4-load.log  SHA-256 e4dadf03466c94aeb4ad27cffb0ea92bab7e2c143b9163896455dd6bb534fa06
logs/335-r4-detectors.log  SHA-256 61b0a307d24a5f7d83639a6878f18d0b179e54f9c2f851be40a4927377379623
logs/336-r4-madv-load.log  SHA-256 9e03e8bddc9fff15f835a126f258ae009509e62118641dc850d9bee40b18fb20
logs/337-r4-madv.log  SHA-256 662721e35185201aa8b83194629dda2c1b65b332f48ce2a85d51d84030551030
logs/338-r4-types.log  SHA-256 63bd4019ff0edc278327fc4ebabb99513254a71b8f915c68b0852f6699da4f61
logs/339-r4-message.log  SHA-256 ed63185732b3b45c927fb7c2f4a99abb226277eee382361c68e59848241f6ba2
logs/340-r4-trailers.log  SHA-256 d39dbd9c7a4941ea2b2a84f76a1f317991b6a3aaefa1469e47ae26235b5a9b4f
logs/341-shorten-r4.log  SHA-256 6d11dd38c9955202e04d2cac10832e27bdbba3b1f69f65f2008ee0b487ea52c6
logs/342-r4-trailers.log  SHA-256 680fbece66638eac2d46f692c49369dd259824d280eb92bc4b72f7d11e72a2a9
logs/343-source-rules.log  SHA-256 fab82ec40c4a475be6e58a96cd24c08488442dfdb1a6d73d4cba78fd6e1f84a1
logs/344-index-contract.log  SHA-256 811861b66f5bb4dfa8c79d9f744a85004980a2d10ee38684ca70558582ace23a
logs/345-compile-fix-input.log  SHA-256 031d4fe9a0a6f03e7d5e807a4e5928ee3bd52b506886a97160a0263e50e04eb4
logs/346-all-claude-cases.log  SHA-256 f235ef7e4697e8c7be460af8e7535a3b8348dcc595dea4743d2d2f04d424f2be
logs/347-r4-type-fixes.log  SHA-256 5ec5f6953115daa20b7c2028dc71625217b8beb7ac4e984fe49bbf5e0520e820
logs/348-new-r4-trailers.log  SHA-256 a66b44145029e6e3da0ae1f1f07ca992aa67d5a4291c35820f064a5e9011fee6
logs/349-r4-types-fixed.log  SHA-256 1182c4660950a3f938d8da45d7c0dd462d73dac62e2fdfba3736b06ed4cbd6df
logs/350-r4-cases-load.log  SHA-256 51dc854d333fc2016cbbcc7b3245ae237ddd61958ab6293503b8e57c1b5802dc
logs/351-r4-cases.log  SHA-256 a3bb149f19fae4a8f9f603a87177758eee49ef2f4d0f31023923e99794cf7788
logs/352-composition-spec.log  SHA-256 c335adc1475a9f0819412e61df3aa63f0cd257c0d442c9cca878b72501e76473
logs/353-r4-stage.log  SHA-256 16187c1f3857446056c49d04c85b3c8fc874ee1c6ec4bb84e34b406e68eab8d7
logs/354-r4-commit.log  SHA-256 8fc4c3d97d627cc50bddb8b62b939575193fa4a520e022fd8c1147fb1341c5a3
logs/355-r4-head.log  SHA-256 432630f67838fc7e9164123001d93fc5d07d4c0792a8c35d2d5661ca3aaa38ee
logs/356-detector-break.log  SHA-256 b2eea5e7d1951fdf1a099a2d473d449dc73ebc9cf817a5d215b83880515f6a04
logs/357-detector-diff.log  SHA-256 b8947d270891508313511671c5f9c0c0cf597f90a2152cf8388c823efccb887e
logs/358-detector-runtime.log  SHA-256 2b0141687273b281a1a4d8a4a44559a16e00c3dd1cdce620a58433a9a3e56b94
logs/359-detector-load.log  SHA-256 d1805217b5de19bca245f6325d2266d29f1a2f5bfff7bd75f6a9b19353a344b9
logs/360-detector-test.log  SHA-256 4df44e1c40002c9c379178bad59ed2b8648707c5a1b17c3e46d8f230a7e75e47
logs/361-detector-receipt.log  SHA-256 156409d3310bf4bd8066ad4f10d650c33115c1cfd05ca816cee43d68bb2f87e8
logs/362-detector-restore.log  SHA-256 20f85ded0757c1f9ad34fc6362754dc92e838f1383393e507b518dc7d4703e5b
logs/363-detector-verified.log  SHA-256 3d54384c4227845cea75b463e9457344f3d81cad286b3d32b6f89a932f8ed671
logs/364-client-stops.log  SHA-256 0f3b59d4a2c6d49a5bcdd8108f6336aa547ee999227a36a9ac39f020dd072144
logs/365-architecture-package-boundaries.log  SHA-256 507f0956f92bd4d89b3c4bab22be5bfee36ef6412602ec8741a95e97f7b566fe
logs/366-closure-scan.log  SHA-256 107d740d20b7590c507c5683a637ed9a516cc2cd69b64b2c9f1d351e3612b631
logs/367-scan-roots.log  SHA-256 9737d59b712be22b83d7969cfefdee5ca86090c0e63f503d6ab7488f3fce5593
logs/368-host-launch.log  SHA-256 500a048d0815d626e7189a27c0f7a6a4cd14c97c0f0b28fa2b9e0ff866915c7f
logs/369-ledger-formats.log  SHA-256 46660f187fb06cc3863871084d779c88d84b4ce0fdc6a800f0c9052516283e67
logs/370-prepare-ledger.log  SHA-256 15a284109100430dc141f4deb7efca3d882f8d34be885942c8ed5bd5a7ca002a
logs/371-verify-list-reader.log  SHA-256 e3b43fbcd0c202eeb729f58c5db2b076d67d6eed4204f9cbcb7733c11665c03a
logs/372-r4-wait-state.log  SHA-256 ffda52d0302d39ab2ed13fc90f3478bf2b46dad498077fd3d72f158a35b1d947
logs/373-break-inventory.log  SHA-256 1ade7b0711f5943501d8fd949433b86ab2748b761337e8789acd613f5ee538e3
logs/374-break-book.log  SHA-256 24b3bb598497df9b3382c9affb80a57e783be1663e6829b74374055854db823b
logs/375-verify-break-book.log  SHA-256 ab4dbf7fd68f0b69423126c46015ea556ca9da1f4f4f23dd205de4ba8954ccd7
logs/376-settings-sources.log  SHA-256 641e8a019cedc9e22484ca88857b6973e2dd870a829091dc742787827aedf535
logs/377-r5-runtime.log  SHA-256 a0e001a7003ea31fa435e0910ffb5d52b31d4f9bb10f72297184729973fab8c9
logs/378-r5-load.log  SHA-256 1d651ab75175896f14a8cf2b66881814615f8411806cac293ca96a258a8240ff
logs/379-r5-test.log  SHA-256 14b297ed23bba1cc9f449c729adaa255216916429147305e488065f9e3c7fdb4
logs/380-r5-message.log  SHA-256 3390e865426693eb7a0447415bc593f2dc272ae2b033040ed8e298c643424bcc
logs/381-r5-trailers.log  SHA-256 5597b6eb273bc46d2b38ef5ce2cc5414226122e7db56eda6bf2c4e8eedf000ba
logs/382-record-parse-rules.log  SHA-256 00b560e6033d903770f68ab32f79794a7e18c50c0db0320d5009092cce50f678
logs/383-settings-wait-state.log  SHA-256 530f403fdbb6262f994aec61fdfc40d354fd441d59e998c2955270ddb6c29a15
logs/384-existing-terminal-observations.log  SHA-256 5e05066c2b63efdd335d61221dd1f9974ddc0c998c86dbe88b79ef66d5243a95
logs/385-r5-stage.log  SHA-256 add7e9d1fb4be040c488680d6dd3ccbd5f617865a62f667d8454e2ff9207b780
logs/386-r5-commit.log  SHA-256 2b8258b51bb2480b8fd4ddfabb5fec442c3427fbb1f87550c5674a1dbacaedc6
logs/387-r5-head.log  SHA-256 aa00502cc37215015d06f779ea385a5605a9d880ddbee3a47980447734135b6f
logs/388-darwin-map-break.log  SHA-256 94588dfe413e0b1e8aaa906ae20e4cc9dd42366ffb8406383f59ee235219c53e
logs/389-darwin-map-diff.log  SHA-256 81c0f96ad9c2bc4fd4ae9f0e9b0820c4202e2f6ba7ca124c78020ba0bd4d1af0
logs/390-darwin-map-runtime.log  SHA-256 b4855938147fce5e0c0f81a146eb1a4a58abcfc9b8787922f5b2b022cd88893a
logs/391-darwin-map-load.log  SHA-256 b0e82dcda0ac39977e4968e518b728e94e709ec20e294b168e584cf540001cbe
logs/392-darwin-map-test.log  SHA-256 644be97f0b079dac742330fdeb5711f43dea5d668c756343334af6ee7258b842
logs/393-darwin-map-receipt.log  SHA-256 84c70e66481d94ee6722d01f569fb529676b451c11b3d0092da439856cac72a0
logs/394-darwin-map-restore.log  SHA-256 aad48b46884c74e3301f51c1ae5e4f1ba43f25470166820c0d258baea9438234
logs/395-darwin-map-verified.log  SHA-256 9becc6c3916be0d6d17ea73526c49e7e087a6f4a2a030e6cd77b5e800eee4c5f
logs/396-remote-copy-break.log  SHA-256 090e23c4bb966595cb45abd71d6ec22d4f82c03ce8fc1de34f0a02a34d3edf3f
logs/397-remote-copy-diff.log  SHA-256 f059583d3cd29ab4978079c81694094f0e84a7228b8eec0ade2bc5607dd438c9
logs/398-remote-copy-runtime.log  SHA-256 ea9254ec1c537ecb31cd35c866b9b82120d4750907d289badfe1d647bfff8535
logs/399-remote-copy-load.log  SHA-256 664f8ec668ed6a27f3f9e68e45781e0fedb84de6001abc1ee7e847a897ec7dde
logs/400-remote-copy-test.log  SHA-256 4a23b853a81522ce6c48903ba2c079a03ad7f48ad31c27fcffbe27d8faed9d17
logs/401-remote-copy-receipt.log  SHA-256 bc476f9c2f40990d34c24797f660a07734114a07f0d76565348b35aa94481819
logs/402-remote-copy-restore.log  SHA-256 b576a3eca60593a816e6cc69899e5016bbae6ffa531d5d40b2da982b537be0eb
logs/403-remote-copy-verified.log  SHA-256 368c6e2fe56955af8bba44c2ed13e61a39399edf45c983fac6f3deeff5a60070
logs/404-local-path-break.log  SHA-256 d58a0539da51f2b5dd432d6a61c5cf544cb0ae13cbe5fe78485af98f3c78897e
logs/405-local-path-diff.log  SHA-256 70e01e52ea7ea88eda454d2ec40bfd3868cfa8501ff4c03fd331272da69410a1
logs/406-local-path-runtime.log  SHA-256 9b0e6ed7824abac042728e0a498ed5379116171271060f2edbc73965ba377162
logs/407-local-path-load.log  SHA-256 664f8ec668ed6a27f3f9e68e45781e0fedb84de6001abc1ee7e847a897ec7dde
logs/408-local-path-test.log  SHA-256 06ffc04ae63ced672a51942b8b6eb69384fb5df2211a7a486fdf62a445698eb7
logs/409-local-path-receipt.log  SHA-256 f9f221833ee94760576d0c648147c60fcfe9befeb09bb8c31faee696880ee4c6
logs/410-local-path-restore.log  SHA-256 e46d1f4755e02c8ded7d3e58ed661a2e5923880923e71e2b3b2d6abb2cc5bd73
logs/411-local-path-verified.log  SHA-256 2fbdb093582e1298565bd30c3a65ac9d54cc2216914181f32deb19a56d4de868
logs/412-r6-validator.log  SHA-256 8bc1e3e69d53a87fc90987115650e141a67e814c31fb74539317dd54f4692a12
logs/413-r6-fixture.log  SHA-256 43ab327c8e096c32f5133b5269344f65a6eea711e9acc41bb44ebb555523d4a0
logs/414-r6-tests.log  SHA-256 b705cdf75a5a9b5968e54245a247033f5fb563b262f14dbb8e430c7ba5a1c8a0
logs/415-r6-runtime.log  SHA-256 e6ba477bf8aba7e85b1f7a6bc4d67331fb002ac222b083569f5f376153675d4b
logs/416-r6-load.log  SHA-256 92f0fe32875d852e28b6e0ef6e09077543b37af0d5949a8b14a570444decaebe
logs/417-r6-test.log  SHA-256 bf281e116dbd14cdfa0269e131c13dd611aae49f4f695321c3f4cf3823dc8529
logs/418-r6-types.log  SHA-256 0b744786f9a112a41b234c5018c8a8df095891c9bf2f8b111a3e3f3e5e4d0df6
logs/419-r6-message.log  SHA-256 58cb21fd8a3194aca925ba352db8eca553c4c33cd6dd59bbff894b3d2946411f
logs/420-r6-trailers.log  SHA-256 ae7db96f80fb434c55237ad188e4809d5b0756ca8977727b727000de2829a386
logs/421-r6-stage.log  SHA-256 c25fad1150b5aadab4b2b08382c6f77b1731faf37af7654ef84701520a237e05
logs/422-r6-commit.log  SHA-256 60960c665207bb811d1acd05c9b3e9c2f6c36f3530928d0b31aca0e7f35f2673
logs/423-r6-head.log  SHA-256 3f852d042e9fba0cca527bd3d291bca10c982435cdff2b7460d0b36f8537f09d
logs/424-updater-break.log  SHA-256 7c6dbe97ceea1b31c0f129aecea603b261804a865024ae63fdf15df15ac1ad82
logs/425-updater-diff.log  SHA-256 4c1e90386e57c457ec0a3cda9c9dc95156d8aee0598864e15989735a25e4a01a
logs/426-updater-runtime.log  SHA-256 35c3ea553325c1fa54e06ea7628bc1ae511a073fccbf497dceb9c77b7e8ad937
logs/427-updater-load.log  SHA-256 97297652f824e49632a77d43e2464b568e425ac7760253909d6afa34e1ef23c5
logs/428-updater-test.log  SHA-256 319f0ef2586eee93ae4470af18f7e9b3725f1f8c64da882f704fca97f8b757d9
logs/429-updater-receipt.log  SHA-256 7b78301d0596c2f41c3efceab15345470de78501f83b43fa8aec9d5d153af11a
logs/430-updater-restore.log  SHA-256 01668de45559df2c5c09dc80c074129bc62e9639a7b475eac5e86cecbf13b29f
logs/431-updater-verified.log  SHA-256 59f88a6926c23fbf8e51b5ce16ff94662aefdba20be11dcacee1ea3469a9b43a
logs/432-extra-setting-break.log  SHA-256 e9795787933fc2aa6925e4fb3883f8517699797804667ef94029f32e7b53dcba
logs/433-extra-setting-diff.log  SHA-256 716fcb2c66046ebb068fc745f541c1c51f221237df60d77b21448031bcd2907e
logs/434-extra-setting-runtime.log  SHA-256 23b7b0a86002d016113c89bf27fc1af6654eb4aefd2bdeab1f90e9ac17c9aa0a
logs/435-extra-setting-load.log  SHA-256 2021cc764b051dc3b1aa4590fb5320ffb96646e5de1c641e056c1ff84479fd14
logs/440-snapshot-incidents.log  SHA-256 94a28cb131c5f845a6a80f97ffccc6460b5437275fd8b5ee9ba1b63eaeddd413
logs/441-broker-interrupt.log  SHA-256 eebad7637e33aa91e0a15b525963c8255e34d88feb4cefe54f5f307b86910eee
logs/442-pty-sends.log  SHA-256 f303919e8009d08df03fec0e4dd063c6bc3f19c53032b87db7fd06e80b2fc20f
logs/443-host-join.log  SHA-256 fb0e79d45f7b90606915a10466d5e8c422b5ca2e981c3f690c24ee63101e219c
logs/444-broker-client-projection.log  SHA-256 b8ca409f2ca3c9efb86decfe795e9f3737df0d5fa093d846e15db7498c295e32
logs/445-build-cleanup.log  SHA-256 c2e3fd866c7e3099007553201b6abd2cac54d8a12637f0bbcca6c3ff766161d8
logs/446-app-imports.log  SHA-256 9ee08c3b77b45a37be46a76d68f40c2827397e10d078588975713e364fa29a31
logs/447-storage-component.log  SHA-256 515e1bc969aabc1858bdcc9f0e4b6fe84c5128287ee9df8c130232ebd34d6c39
logs/448-input-acks.log  SHA-256 4987e82fd2e45eac4ab02403b3ae3bb2e5861d9013b12b586ec939c8e8bf3c8f
logs/449-ledger-access.log  SHA-256 06eb6e0f59477d67003b57fc3750f696eb11b59736d2046b8b4b9a2add805f02
logs/450-registered-flags.log  SHA-256 87ddb6bcdfee335160482d6909e46bbdaa71b5893f5668c84198d3688229edd5
logs/451-composition-boundaries.log  SHA-256 116174d508715628ade3dbc864e6824fca0f8bdba7b60ec30620c7fefab2c319
logs/452-extra-setting-wait.log  SHA-256 c767bf2f9ed9aa25157192cb4073c79f3fb505f025ad5f5a6cb71fa005498133
logs/453-wait-readings.log  SHA-256 bd4dbd08728eedcebd7eaae841e4b200688f6991f10fc2f0fada2be0677fd320
logs/454-extra-setting-load-repeat.log  SHA-256 8b83f98862e43270ef2e760b3acac906c056fac4ed50929b3e1a8a83a696271b
logs/455-extra-setting-test.log  SHA-256 62c746dd2aaed6ddc04de196f18568ddbef66f2fb82b4fe37d6d0f735e69f2df
logs/456-extra-setting-receipt.log  SHA-256 56bb9272ea3c22324284a873f911e3d96d86653a399aac1230bcab4823c4bf76
logs/457-extra-setting-restore.log  SHA-256 e405661d0452de62028578faafbfb56c26aeec417b487ce8973d88215449c3af
logs/458-extra-setting-verified.log  SHA-256 4b9ce236c8b96ee6e35b9ce5c96bd649db9f3e41199705134f15fd8d9e562387
logs/459-composition.log  SHA-256 fbf679153990838f6623f71f4086c55d588b07ec7812b08cdaf720bd0cd08434
logs/460-offline-standin.log  SHA-256 e9e231a15972027fe0a3f53e95b3dd3fc88c3b244b74a877047383002e63cff4
logs/461-scenarios.log  SHA-256 4685188b265637cda41a9b059f80aca3ed6bca23b48937d0e1f28eb126926091
logs/462-composition-tests.log  SHA-256 20a25ac4c795b3937ec6be837f11b5cf578a8ec29331db153a984e49fb261e5b
logs/463-r7-runtime.log  SHA-256 ee81cafffd145f282db56af05c72813242fa5eca02c04f17ae89a8079d362f12
logs/464-r7-types.log  SHA-256 a897cab47600962d3c30cd3ca75c538a3ae90ba7ebb45aeab6c989264b8d4958
logs/465-r7-load.log  SHA-256 73168897a1836441808fa47ea0b3f4946995f6d02edeb5edf8f9ff2e7c690d48
logs/467-pr-shape-input.log  SHA-256 9b303dc6d27ff6eb93fafbb3b47618eaef679e6ec5eb64d16e2d99666638fa70
logs/468-r4-r6-break-evidence.log  SHA-256 e0c18c432d6ec7214ca8d0315a7941b6ad59d391fa491c06af913f28de3b1882
logs/469-closed-client.log  SHA-256 a590d9d1a0b040fdc6df71106dd612d63ec35af04dcf5119e672c4e8a4009e62
logs/470-r7-wait.log  SHA-256 4ba60a398d09ed1d8a0d59d5d28cb6f31b13817f71caa14b9668e1988832a5fc
logs/471-r7-load-repeat.log  SHA-256 51606ce8accf78ae7294a2cfd9fc1828459f100f40281ce9517ea42ac9a70e4c
logs/472-r7-composition.log  SHA-256 8c5459c2c1e09ab96f3734540b8ad1ccf99db3fe4b6d8114ef4f9ea98169a340
logs/473-r7-message.log  SHA-256 73258a612947ad8e3740f3c6c22b8133ede96b655037e1914cdc2b6175eadf0d
logs/474-r7-trailers.log  SHA-256 02f3f01ff4bfaf06c777135379a9332d06f2cf3a2d75d7ac598941529df27f18
logs/475-fresh-test-envelope.log  SHA-256 0e296ed03ccbba303686b32653ddf7df034e5647264f8e5f4380cddb9a34a06b
logs/476-r7-expiry-trailers.log  SHA-256 602c969f152e263f216506fe97a54893b73abaaa9d90d50e761adf7ed752e0e8
logs/477-composition-load.log  SHA-256 f1cf2aa4cc6aea012e70b799c267f4d001f264e7fdbbeccc9cf100f20cef8b76
logs/478-composition-retest.log  SHA-256 333b22d8f796847764115addaad45f820e2c21fa1641aab8146f8a178b6da4f4
logs/479-check-date-context.log  SHA-256 f3360c6ad8dc62e122cb4389ab14022cf015786a35781bafe3846fe88acb9aca
logs/480-standin-traces.log  SHA-256 1b868ea68b250b1bb3b2d951dabca40032c2b5f888d816101b052525d4fa1476
logs/481-ready-signals.log  SHA-256 90ed6ba43b6d0bbc28e456a58c9fe12e373bbc61f2cd010d5d8a4ec8d063e5a5
logs/482-terminal-standin.log  SHA-256 bb5740b15c891f2184519a39031913fee7d1abca0ee8054060209905b9af6eab
logs/483-standin-bootstrap.log  SHA-256 50eb8e729bc0ba44e287d6db8129fc512ce6bab3077c41479e399e012dbeca44
logs/484-bootstrap-load.log  SHA-256 e6177b1c31e8023f8a8648b8e60d61137a23dabcb9bb03d073f7ae2ddd60f5dc
logs/485-bootstrap-test.log  SHA-256 fe9321c5f103632aac2c50e3ff6c7d52a5e7bb8f38f4142beef053b8abbe0c16
logs/486-observe-wire.log  SHA-256 1ba3cffa5e3607f1716301528e1d89abe9acfea0530766f14cacc039685f1a22
logs/487-wire-load.log  SHA-256 fd176c3d15e08b778a84183281ebd7bd5fe0183ff3387abaac17a6e092a1555b
logs/488-wire-classification.log  SHA-256 243098c8752897de10961d27818816b9f0633e75c9d252666837ef0a23b168f6
logs/489-host-readiness-lines.log  SHA-256 e1496522201d4b89d1c4e28597b35a6492ff54297248ddad7f94f58b088ab8d7
logs/490-pty-creation-lines.log  SHA-256 ce89e745788f560e27d51f67515b7a3f6384655af476832851b2357609a8fac6
logs/491-available-reports.log  SHA-256 604d1871bd15a6eb21b61ce0aa2444ebc1f68a97de3956342a26b8ce06ff90d7
logs/492-check-transport-path.log  SHA-256 ff38c8360a60dfee864be9819a6dc8a5fa32c139398d36bdb02935477015151a
logs/493-r7-diagnosis-inputs.log  SHA-256 484bb307fa27ff9a48b30d0979375e4690b3bc47d992c3a440c13a3cb1083950
logs/494-r7-composition.log  SHA-256 71b48b295de4d293f7a929e45915ad71c8a6858fc88390bb1778599a06f96f74
logs/495-r7-scenarios.log  SHA-256 d687ba03c9b7d79a3f46a4c4f9d66f8f5f94c9060839386f67575fed452f49ce
logs/496-r7-stand-in.log  SHA-256 14ae498d0fe9eb7139aa790f73a1d4b2fe888f54c0b93ad9da9399dad6db615d
logs/497-r7-rulings.log  SHA-256 fa2b4b2400f4448ebec01f242974842c6f7b4de77aeffd6f1261674e42682f83
logs/498-check-r7-authority.log  SHA-256 41b020d8178d9458414317304c5cb89a40a6d843fe6be215fe4ee639d0eccd4c
logs/499-echo-rule.log  SHA-256 5870b97bf4c52a46eeefddfdbcc5a9f1d644411e874fbd5b8df1a258159e510a
logs/500-readiness-facts.log  SHA-256 cadb1e138349c3b0bb185e628e97a4260bad3cff4cd431da05908c4f13f2c6d5
logs/501-build-order.log  SHA-256 ee8d23a1996e2cfa6f9a7570d385e4d291b173aee4201d64aeb0e34546a76f29
logs/502-classification.log  SHA-256 64ecdc1fd2bee580144c307f21bc0629062ef0a5141db65d3f0604b54b94bf6d
logs/503-offline-setup.log  SHA-256 28918b54e003ddd5dd5c964d42226c5f01f0b80122708b1b49a0476a9427438e
logs/504-wire-observation-diff.log  SHA-256 51dc314f96d7ef296cb5e6977e99808b729f927a1b6587aaa41cf6f1251a9249
logs/505-check-repository-state.log  SHA-256 e072f1c47b10d950774b63ebde6482617359e6af4be2194289957ba24d6a9ed5
logs/506-r7-tests.log  SHA-256 e8410a77d414af06b68ceee1e8cd32f3b818907ffff55f6e8d7d63989c8f4a6b
logs/507-restore-offline-scenario.log  SHA-256 b9fad46107bd6e275fa83b9728a656baa2ddeff70911c8167ac0cf0903b725b7
logs/508-verify-diagnostic-restore.log  SHA-256 19d3efcbd760706b9862bf4425f734117b6de02c92bc0302908994c6b2f65750
logs/509-halt-commits.log  SHA-256 2f29d8d87ee70db1f58f1aa455e409e33bf0b0cd1594850f9fafbe627931cea1
logs/510-halt-source-digests.log  SHA-256 45ad2f1a8a463abacdbcfdf99a24c0715f292ad15047a84f0c7b0f45cba91dba
logs/511-verify-transport-untouched.log  SHA-256 263a62b7e480a4d5b93e7a1ec8e098dcb2388969c5f7d92452dd028c08d0d66a
logs/512-check-load-results.log  SHA-256 513ee7b9f68ad07b8da44170d540ad77b707e6257be6a13efdf48e753169900d
logs/513-inspect-log-format.log  SHA-256 4502cbe8afcc3b7a71f00ed9dc952a90b60c47e5ce7cd01c977494bea1724f01
logs/514-check-r6-restoration.log  SHA-256 e5c9ff55c89579e5fcbeb877997c9034070442080dbc07d83581f3d4995e5675
logs/515-halt-pin-details.log  SHA-256 1416fb15ab478729ef67b1ef05785650eba2270e057498847ef417a350240786
logs/516-check-prior-deviations.log  SHA-256 4a3ae071b90916ca5d27de7d36ed6b2345a40e44a535db9441ed3e76b3ace116
logs/517-check-evidence-at-halt.log  SHA-256 18082aebae09fb2ceff857cae924ec1b1bbc1398e12aca9236be7ac299f3719b
logs/518-pre-halt-log-digests.log  SHA-256 5da3ccf17e8946ab7091f41a23986813af44bebec60a352de1ca88a8dce31878
logs/519-write-halt-report.log  SHA-256 bb65e318c8b6a9c5f8a5f8d244bb4048b626710e5386c12b42df9ec79e0af00e
logs/520-verify-halt-report-shape.log  SHA-256 ee312e3f7c2bbe23a95d486ce492665822207e34cd5066a41b9dfd4f7629cc3b
logs/521-halt-report-sha.log  SHA-256 ef7394f11be2ba05ec3d3ab433f0c12ae5cdab3827440d4d1afa0362597a159f
logs/522-halt-worktree.log  SHA-256 fd5ea3ebb46f080f4c431a90ef5b832b39aa9b6c7893427f9ca53ddd5f12dc08
logs/523-read-pty-echo-addendum.log  SHA-256 9ba90939cc7a51f575c90996b9edb6ec808569a1a11713b84aa351fe17c05cda
logs/524-resume-prompt-digests.log  SHA-256 aae4cbf2f26abdbae676cfd0f51a3c86f779885d347eb46646fec9286835d3d4
logs/525-resume-prompt-list.log  SHA-256 b0f26951748f424674e1bc8e13cbf1d8a5f9ef5808b184f907dcc53efe97cbf5
logs/526-resume-governed-version.log  SHA-256 b1b01afc16459d31513974f5b86b13f905651b3a95039406ceded644b90e4b8f
logs/527-resume-branch.log  SHA-256 b33b6293e1c60e6a88c669243e2fd1a550fee6e92db38082b6242d24b7f9da1e
logs/528-resume-head.log  SHA-256 d7144bca3b486239c2de299325740d2c410b9cfafbb573d7f5f87ed699a7c8a8
logs/529-resume-paths.log  SHA-256 bdd12a3aa9718a97eb28880593883ecdb90100373ec7beaf465f65f8edac15bc
logs/530-resume-working-digests.log  SHA-256 4213c5926d622714ed21ca337cdd7872f7af825bf47ef354b70b2be806ce9af4
logs/531-resume-pr-dir.log  SHA-256 9d68b37986954c06992811b538068f1700a0dfd13a8f02440f7a137c991118d3
logs/532-resume-report-digests.log  SHA-256 abeab3c4983d06cb47b03fc4501b5508649205df437771017f2dfcabd039edcc
logs/533-resume-prompt-manifest.log  SHA-256 f38a90b111b62e0c988cd425a1bcbfe78639ccba323dc550af2e23f8e87178f3
logs/534-echo-terminal.log  SHA-256 520e275525a3e1ca651e13b2f654e5fe9abf52c3f5ff302853792e2f9da5aff0
logs/535-echo-lifecycle.log  SHA-256 4fe0ad297df3688882571c1fb85651601b91b6022c5d1ef50f7eab28662233bb
logs/536-echo-test-files.log  SHA-256 89fdd82b33c1b1e4ea1a187a3ec6d958415c8d1855d562507d80187ab597af24
logs/537-echo-spike.log  SHA-256 696c502918a18688601d76e32cc0bbcb10d0b0113001803571fbc32c2238a877
logs/538-echo-scratch.log  SHA-256 eb1d0d12ef54556412d45df99011dea17fc18b82362832b2ae46ddc1b1c4d9d2
logs/539-echo-test-runtime.log  SHA-256 3f3fbd7b3b6289edb45f800fb74fe1a16645e88896bb8c29ecaff4e41e3359ce
logs/540-pty-cleanup.log  SHA-256 c2cdc811912436ed0a03fd4497750ee9ec0902ded6a9f657d37e2c0b91229244
logs/541-build-helper.log  SHA-256 95b79c72f5429409996e20e211fb1b1a57dc73dd8af23b3647e0152bfa818025
logs/542-phase3b-test-pattern.log  SHA-256 27031ad92898182e20c3750b9ca10029c0956a870be1728b93782bdea0a770cd
logs/543-retained-choices.log  SHA-256 7c02de329854bb20ec1c533558c4490d2f1bd277b220c16a06ee538dacb7aa39
logs/544-diagnostic-requirement.log  SHA-256 e2a08c8a51df8543005831752a5bc43cb152a381516f65f77d2d0699af733a78
logs/545-existing-host-test-usage.log  SHA-256 ce244c74873862a86e6c8b26c16b6d6e37990f0de217035570d0b3272c42aa63
logs/546-apply-authorized-echo.log  SHA-256 4c219a3cc66a5d1601e6f4f7db6d08885d6840a3f1af355ffc0b87c9713524c9
logs/547-verify-ready-write-protocol.log  SHA-256 9aa88c1243ae1ba0290f8edb34b26daabfcff800055c3139ab3455c9e5bce0d6
logs/548-create-echo-test.log  SHA-256 daa6d83d6b96c3e4980df7e8921024dcfa1e9a1019635c59fd7b6df6af2aedd4
logs/549-echo-runtime.log  SHA-256 7a41f31b4cd7946cb9c250fa18c405e490ea7032eae27c1b24c422f8d104b8f8
logs/550-confirm-addendum-diff.log  SHA-256 ebc957d1b7eb5e0deac07553c4ce59db08ab885a927bca00b1ab2f6ec03b9593
logs/551-commit-check-rules.log  SHA-256 a874d12d983c8a3bba70ae6c52e3cebf6d993f8b4867f2125db4a380bea5eb22
logs/552-current-record-helpers.log  SHA-256 7003e865f148f4637fd9bca88bd2fe201111d053bc85d3d342133ed386fc3085
logs/553-pty-echo-load.log  SHA-256 0cdcae13edd3e98c06a346fe577a6ae2798b6232892ef8b9db439f20f1edaf2e
logs/554-draft-echo-message.log  SHA-256 e5b0bf24ed5089f6a0bb53581c38c15bcf79fef8582649fde5d575b4493809c9
logs/555-verify-echo-message.log  SHA-256 57039679f67d7678b59ee018bd9507101bbf25986f06e2a5ec65c0e12faef014
logs/556-read-task-detail.log  SHA-256 dfdf7e15fd2af7cf1c1e9337c5305080a86e2075698c0fa6953e749f7f70e3ad
logs/557-read-standing-rules.log  SHA-256 1194f3cd9bea9601c5ef194eec19dd3ddda620a16da69995f0b2af940fad6551
logs/558-read-attribution-usage.log  SHA-256 13bdd078374c3d5ff490d5dd407ab12c93bb1b7ed848223a3514cb8e9e7706ed
logs/559-pty-echo-load-repeat.log  SHA-256 9aeff7740ec51b2c4a2b786d561844474343cb6ea22bfef4e42e153141c578bb
logs/560-pty-env.log  SHA-256 a0e39e78e22a1c3e16ece57c2ce6dfe8c5d55d855c909715d51d4c0a6a2079a9
logs/561-early-fire-load.log  SHA-256 eea250e8472385b4c86fc80fe4eebe1666fdd214e78d760b667023e2436b8b79
logs/562-early-fire.log  SHA-256 aec01a413cc9d8378cd329f7844575bbd22bb4930a0244b247f2366b04cccd7d
logs/563-eof-timer-load.log  SHA-256 f98dd75da6ce2394cac7688df7d11205878a1eadb0bc959e45b0f4ae60d5e46c
logs/564-eof-timer.log  SHA-256 5223473c491905999234f91edfbc6f72f04880b9475fa61ae4260fa82f5d7168
logs/565-frames-load.log  SHA-256 9329383637c8ebdef5666a5c55d26a9d4906a90926e0f40c8c13749471b5b441
logs/566-frames.log  SHA-256 fb88559e3a2a7bbd87d6d8285d8442350572333d9ea2d60eade2d43d2b5d6b28
logs/567-pty-launch-load.log  SHA-256 9329383637c8ebdef5666a5c55d26a9d4906a90926e0f40c8c13749471b5b441
logs/568-pty-launch.log  SHA-256 8284084ff3532985e807e8c33e02f7ed5499e6129b994ffbcab18751941fef82
logs/569-main-guard-load.log  SHA-256 d115d6f3a58e837180767319e12ed69249753b9a7572b28c4c4edc5ec5b6baaf
logs/570-main-guard.log  SHA-256 0480717c5838c5c0ab7e2878faa1fcd11e96dc9a2e279c5cc43034265f4e2c4d
logs/571-signals-load.log  SHA-256 6844b31a0626424363ac1d5c2e0f3a556c92cb6871d6f96fa7868f08ea6b1ecb
logs/572-signals.log  SHA-256 c50980638dc393ead328b5ef57bdce4662d33a25491684052feff468b00d6f0b
logs/573-broker-host-load.log  SHA-256 1bf2b01b0f8922d312722c102c56391ee1ebd059060007d90661cd041125b21e
logs/574-broker-host.log  SHA-256 7630a8d2f96c042d9cdf4af965d64950f329acced5a24178d7bf5a20444c1a23
logs/575-unread-input-load.log  SHA-256 8cfb2e22afba11c758ba0ce9c8409b7f6ebf99cd31ba344b0313da4bfee740cf
logs/576-unread-input.log  SHA-256 9ef1996cadda37bda741e0f1b51da1776668dd2e55155f4a8d331b6f1b2cdf61
logs/577-echo-shutdown.log  SHA-256 132cb31ae93153045d8188260bb8d69572aac955675fc75950d2a4740d6bd928
logs/578-read-echo-test.log  SHA-256 31c281fc25945077f6fa550081c67d520fba5786d06a4f00e1f4b20d268437b2
logs/579-echo-test-shutdown.log  SHA-256 0bddee906313667b5bf8660097227b6fbfca479b2cedb8019d8f1e7343c86a53
logs/580-echo-retest-load.log  SHA-256 6473fa780e3d3a917ea7f0ce4326bd0b41582eb33883e883a8c5975dc02ee958
logs/581-echo-retest.log  SHA-256 d5a6ed5fc0e4558c20313d26fdc643394604051cf990afde95de3b3d59d2fe15
logs/582-stage-host-echo.log  SHA-256 b42d3ded8149eaf7a78e31d5c8314ddd519424001ee76314f284681f7286c5bc
logs/583-staged-host-paths.log  SHA-256 18e4130e122341acb86cb542c4fe0aa3f1af20fea46a72bb2cf5e6441cbdcce9
logs/584-staged-host-check.log  SHA-256 ef1307ddf02425540f07e6831c1b7fa328dc400f72e2361605baf94c4c965dae
logs/585-commit-host-echo.log  SHA-256 b92ff406040eace0865993430c27843efd101f635a545b0a5cbc6ac3cee63c14
logs/586-check-host-commit.log  SHA-256 b274ab1f6daa71a8abc0b9cdecef3df77df3df3e3c0602d0563ddd077431b579
logs/587-host-commit-worktree.log  SHA-256 aff9da51bd38cfa497dfdf4185605b228c1433627a2a836e8cf4d9d1750bf3b7
logs/588-host-commit-r7-digests.log  SHA-256 28fb4ac5433b5305fbbe9790aba18141b477dac10e58141a6dca2fb725a2dd99
logs/589-break-helper-usage.log  SHA-256 2d05ca126992c785fc602472168b9cf738d937cc56f0e2133c90fbb6c36822a5
logs/590-preserve-patch-backup.log  SHA-256 0f9d207390d9e760f5e42a58b0ac900b588118462c4b94afd6b39bd043c5ceac
logs/591-verified-postcommit-state.log  SHA-256 729ab18c5e9a2bdf77db95e6167e1c7dabd04876f12a2ed57fecf18e97181524
logs/592-break-host-echo.log  SHA-256 86dbbf0378489464a0a40c295ff82b3b2830c5b2f986453cc05b19bdab6c7824
logs/593-break-host-echo-diff.log  SHA-256 1b50eb9e18ff7b1668dc4e62e46b2cdaeaefe30d68eb3d3eb82f46956054ffb6
logs/594-break-host-echo-runtime.log  SHA-256 a791741dca6d4374a20ad4b2e5bb9382f37b37e399d2aeda818837eaa9c528c0
logs/595-break-unread-load.log  SHA-256 74bccad3a2edbcdd968c19ca882515f15a5058cdfd916cbc7ed3b7d885c69d25
logs/596-break-unread-test.log  SHA-256 a8c09d6fcb4d2bcf50a4a5dab607dd071278b7042dcb3e79a10ec3617ad3fae6
logs/597-break-lifecycle-load.log  SHA-256 99abaf09dcceceb3841af56c033b72d08ebccef0e5c292aa055787140aa1dae9
logs/598-break-lifecycle-test.log  SHA-256 f6b0343ad407b5b91467f653197b7e64b339d5ab0679f1bcebbaebbf09d7328b
logs/599-stand-in-design.log  SHA-256 f44cef12b39a34a8fd3a4dc35a0a68159b8327b4c1b7dcd9c924db7e7af5cc83
logs/600-r7-design-and-breaks.log  SHA-256 e331d6b0a48c27d69749e38cec4775a16c384c8c9e3b17ec0e02f6cfb5818f14
logs/601-tests-r7.log  SHA-256 beb495e67b15f2c664290e44d014b291a2ecda11bb29fcc7562d69988fa72300
logs/602-restore-host-echo.log  SHA-256 876650aba7409598f9ccbfc41c1b8e358e74d1ddfb9fac43e212e574249a3e95
logs/603-verify-host-restore.log  SHA-256 92154a009171bc6b9883b8a78aff1e3937c9328047227ee4fa8b112aef7ac7e4
logs/604-remove-stand-in-echo-workaround.log  SHA-256 0b21626205acbbe9cac850d9de1fa4b4b719f26c3458b9b9a1ceff1aa0122e71
logs/605-r7-resume-runtime.log  SHA-256 415f0c372eebfec68ae72efa41b778ad115b06416f8610ab5c858bba0b774d26
logs/606-r7-composition-load.log  SHA-256 2f5036246ef1e0fecf60fc774685d6c66cf606e1b18c9f590cf58403d8e35d33
logs/607-r7-composition.log  SHA-256 2b30b07050c37d2552471daed9506dcd87f66affa53c14d0568911a7f32dde0f
logs/608-claude-echo-load.log  SHA-256 89acf24c7fb77051c36e820243b7e2adf8f4e521b134b1d7c62a28f5ce990aa6
logs/609-claude-echo.log  SHA-256 5c45b93517cc2f024b0eb1152d3088c1f8abfd6b1935d73347716c3758974454
logs/610-madv-echo-load.log  SHA-256 0c0e972bb1d4d2e4dfa38eb2ccef2a7ebdae6a2f613aaf331bb4614025d66096
logs/611-madv-echo.log  SHA-256 e337dda5d836a5970bf159b5ae94c2653254bc17079391326a51b08bd4b12851
logs/612-r7-break-sites.log  SHA-256 9ead8c465cbd3ce49e45b2c968d8655f50a6e55c061374463f6af23ad4a445eb
logs/613-r7-commit-message.log  SHA-256 c8e1ea6ed0c074f8ee099c70c263496baeac919eb01ef11bfd7cb804502853d3
logs/614-echo-cases.log  SHA-256 67a02b2aaafc4207dc2bdf4724503bd3aeeb1d7bbe0d28e4b88732c3ce82e654
logs/615-r7-file-list.log  SHA-256 c29d1e617e192b0f790e2385d708b77046686c376f7f1b217950265acaec3fcf
logs/616-check-madv-echo-input.log  SHA-256 e667c8cc7b54978ad318e79a357519100da2da655315f8a59a2db0e0dc5445f7
logs/617-r7-settings-output.log  SHA-256 5d8470d068a9c16e69c210587d5489717a0f1145107ea870ced51ce794d4628a
logs/618-r7-barrier-definition.log  SHA-256 f0ba4e086e27c9b5f11083e6dff6060425739a07459763dd10aff60b02725b25
logs/619-build-barrier.log  SHA-256 cf63fb8a3129bf013ce1eb02f7ebceee658518e4e35d627211a7a35336b8d3e0
logs/620-settings-proofs.log  SHA-256 a64f6db571e9f590bfa13679d4fec852b6cea9f235c3292e2193d7bdeea8b11c
logs/621-health-contract.log  SHA-256 8715006315729aee55165b48af39a21f3e0d5e9f3e7ba11b385ef9feac6401c6
logs/622-cover-all-settings-through-composition.log  SHA-256 665bf87a7a46e0d6989297e363cd8f3c8534366325fff32b9e8ad57292a0f34e
logs/623-advisory-requirements.log  SHA-256 c276ba6433c5edceee275af585f7dd9fa94bae89fb08df4a94b5e273dd8697f5
logs/624-allowlist-test.log  SHA-256 098da1dd4b1fdef62c8bb2fae3d505ce5bc1676d4f16f3349c43ed7a5589b958
logs/625-adapter-parser-contract.log  SHA-256 9c6f4933d1998d80717ac226492d99b580914330778127619b3b6328b270b388
logs/626-legacy-port-test.log  SHA-256 ef61c18baa241f93363cfb03508be7bd86d0507c92e4e13cc1bf5d54d09ff0d4
logs/627-allowlist-descriptor.log  SHA-256 1c31e0e62db140a6767ec82d272de9e817705914caef6e6661cce5952cce1a0d
logs/628-allowlist-access.log  SHA-256 b2f15176c12bafd2799b7dcb0073d1b6b73df6f708c72c0e06a639ca4d43d001
logs/629-write-suite-comparison.log  SHA-256 3afd303e20a068339ae3103279c513f9d3613668fadbab3987f997aeef7bff6f
logs/630-r7-commit-width-and-attribution.log  SHA-256 545f2d98710625e50fb803f7eb55a495ccab4a5e6c2daa5cd94c76299b247f45
logs/631-settings-composition-load.log  SHA-256 da82fd84eca6184074072b478fc65775d8326115503ee09f25ca37ae0129eb4b
logs/632-settings-composition.log  SHA-256 a83c78d5018f76c36133fcd902f3c8a6a0971fb484887c28b8adb3e937e313dd
logs/633-r7-types.log  SHA-256 f2b960828e55eae44b9ed798f6fc5c55d83ee4278d58e1671145b747814516c2
logs/634-review-evidence-records.log  SHA-256 9e36a13ded53086d469faded6a25d99ce0d0bd077fcb2263923587d0146bf3e2
logs/635-stage-r7.log  SHA-256 bc70e6603f249cde59c6ca80db127d11edab9ace3d66c86e56548513ece943dd
logs/636-r7-staged-check.log  SHA-256 f5c83aa0040950112cd64e66e963905026d3cfc5b2460f597b9b5407853240fe
logs/637-r7-staged-paths.log  SHA-256 e15592edea4d0934a859f6668172417865577dfc410b487607329dd42b8c6719
logs/638-commit-r7.log  SHA-256 f8322987830405ed6436d7a73752579627af17269fb36e2c5dd2a3bad5d78063
logs/639-r7-identity.log  SHA-256 e8cabe695c0fcabfa02db4c4c1daa6d89f75fcdbda3bed548b7580999b3df114
logs/640-break-present.log  SHA-256 dc04d66795d4a22cf78032641e08f0b15b26383a6199d755a0d16abdba64bd1d
logs/641-break-present-diff.log  SHA-256 59a240015c36d2888c32f7aba49b5beb56bfbf4e721fe60b3f66b4b668d1da16
logs/642-break-present-runtime.log  SHA-256 71b38a967e9c451cd48ff27ec7d6e0b01e1a0e647b1018ce45f95c323345cd94
logs/643-break-present-load.log  SHA-256 1a6db43d2736bb3c0d7c4fc8ee0041e112fe13a12e5f2a18c7d30e7cb8d9aa83
logs/644-break-present-test.log  SHA-256 e22b162aeb89eacccd8e473de4c183b00a243c139240f8b34c9e5ac89a92a25f
logs/645-restore-present.log  SHA-256 aa9db3a669a909ecff667950ac518abe6649ab59836769f47b00ea8cf6cb26fd
logs/646-verify-present.log  SHA-256 fd7cd45cd86700f3921d72cd713fdd99dee400f38cc837f9484bf0ab877f3d50
logs/647-break-barrier.log  SHA-256 b15c4248e6b5a65033dfed6b95161687dcfe52680aecc9208b38c5d6940f493f
logs/648-break-barrier-diff.log  SHA-256 6e31e3182452db33748db46f0e4ee7501d3946ce673c82001ff544235dc2c435
logs/649-break-barrier-runtime.log  SHA-256 872a613a1e82fa40148170fce37daead1e4fcab7d08c32dc732ddd0f6053c3e3
logs/650-break-barrier-load.log  SHA-256 d2e819209963d0e9a05075109ed1c7206b72828f56f9fcc60f8740dc21ec7e58
logs/651-break-barrier-test.log  SHA-256 4a7e1f348349e3c385c999c32542cbb9ff9c24ba9b50ce7e84233a3de252b7dd
logs/652-restore-barrier.log  SHA-256 4ea8ccac4123da4c8ad218f7cb10fcb078ff8f4ecfca5674ba419d15d1c1b29f
logs/653-verify-barrier.log  SHA-256 dad090b09fccbd790bb554354fce199086836bbc94310a7abb45e7d4c0972832
logs/654-break-budget.log  SHA-256 db9031b6d988b3a893ff1030a8c95490b8bce8404d8ce10b1a90f8f8329c524e
logs/655-break-budget-diff.log  SHA-256 66919ebafb10482dc3f68d9f720720a006ac9991b010b074dbda63a01b030b09
logs/656-break-budget-runtime.log  SHA-256 f6c129ccb78a3905e2f61b8b6f289a632c5caf693884752507578c87b5f74135
logs/657-break-budget-load.log  SHA-256 ae87398b33f3f6ea7edfc56f3119ace5cec922ceb25e7c4b283d513f8cfce641
logs/658-break-budget-test.log  SHA-256 0249aa02ed6103f6d0649a00b44b1d1296a76f36132ddcddce380793e07898b6
logs/659-restore-budget.log  SHA-256 dfeb584d6018d1d07f198510b6921f328de11d8c385fd17ed778b4d3af9e09d7
logs/660-verify-budget.log  SHA-256 79131a7c844dc310f454aa24ea277a3073aa10639b95db387cc94d3079d26c99
logs/661-break-settings.log  SHA-256 eeaa670835c7f636184174f222f92ca753a20c287e69b6f7b5c573332acc0e0d
logs/662-break-settings-diff.log  SHA-256 04dfcaafa5cc879d9bfdd461132c5f6bf387647cec76bd9d13869a0cc911ea40
logs/663-break-settings-runtime.log  SHA-256 b6b0d0d43fa4e2c16129c70df9fd69e46e1b0379eaea28f9bf363bbf614a9931
logs/664-break-settings-load.log  SHA-256 7d89c783a5ed7b49f2fa389e78e14c7edeca017a15b5019c452f9a7b5a5c878a
logs/665-break-settings-test.log  SHA-256 2f218b65355bf500f0f4ce2ba76dda9025b81e25cde4ad99ec6cdb936c6056dc
logs/666-restore-settings.log  SHA-256 2db93711d2537c22eefde765777bf3651520f61f796b274688ad1a826a2cd43e
logs/667-verify-settings.log  SHA-256 3da20117b9aa67b58d7298509ba1d8f81cdc90f140d29fccb9f5f5dd45382b13
logs/668-break-cancel.log  SHA-256 86a185e7d6d078660d95ef739792ef3914666d096365d37c9e040675829373db
logs/669-break-cancel-diff.log  SHA-256 596c3d306e7ac37cafd66c2378b48c1d213ed2f2d5ade7e880a6a8a5a275eabe
logs/670-break-cancel-runtime.log  SHA-256 df51bfe1159080482b3a7e784e780f75da1f1fd5ad151b00b87b961289643af7
logs/671-break-cancel-load.log  SHA-256 33d5e0ccbf195f2d8450630ac5fc56354d95008149825063023e11e702a10522
logs/672-break-cancel-test.log  SHA-256 d18cb55c49646d8f1ea4cbfdb65f03f297350140cec45e4fddb8bb02cda5d0cb
logs/673-restore-cancel.log  SHA-256 04498f1d31f83ff2ce41830d8118dd5700010ad8874717e36ad7b9bd24e26314
logs/674-verify-cancel.log  SHA-256 f063fe590fcc4d83b4aacf1497e82f6df77676e1d7c19b7ee74c6f3007522ba9
logs/675-break-monitor.log  SHA-256 903a6cd1760938201e6fd9583f65526e1dcc120b19244c94bc9fb4d94c06fa45
logs/676-break-monitor-diff.log  SHA-256 22651aa9a92176c911dff50f7f2c12d725801b531ab71a9dfcaf4b921d13794d
logs/677-break-monitor-runtime.log  SHA-256 89ae7c7aaa163657352fa52d429a5674b1f15700ca294041d7a20aeca5f8f80d
logs/678-break-monitor-load.log  SHA-256 dcb8c0ac0ef0882cb465d76c7de77b1becfbab5972a2a222627e78b8d8835f07
logs/679-break-monitor-test.log  SHA-256 6c60e6e220c55e29cbe0f168852baae2e3cfa47b4c14b4e2925bb645ab94c2e5
logs/680-restore-monitor.log  SHA-256 f2c2e18f65475362fa025b105b7d911811a77c6365947b820918d6fce8071425
logs/681-verify-monitor.log  SHA-256 5aa598c6cbe0a9f2da2a99c904eac121fe377566431f623bffa00ffbb166ff38
logs/682-existing-parser-examples.log  SHA-256 561756bdc7913b97cc31d2fe31f0f46774891f60728e3a17dac028c50926d432
logs/683-existing-source-scans.log  SHA-256 f27bbc91de0f1def4667df587d4f2465f6a8f1865d76896c6238427f4fed3afe
logs/684-legacy-failure-behavior.log  SHA-256 500785b9ec007b2d09cd7296d067d6ded566922a15925a3704403fba600fc238
logs/685-parser-test-support.log  SHA-256 4cf9344a1ba79c9133318527aef2df2f1250647a7f83468520162f492602f221
logs/686-confirm-advisory-scope.log  SHA-256 bf87d3b4308973b840f833c63f5e2169ff67f6b13c09758b25a7d814e485cb99
logs/687-add-precedence-test.log  SHA-256 e09df1f057884ca5cb116ab73119442d94a61b456fc3c8cdaf1c083ead4c5d96
logs/688-add-allowlist-attributes.log  SHA-256 a0b019f999ff92d4eee3d49522959ff1c1a73bb6d94a7d5a92b031553645d711
logs/689-add-separation-tests.log  SHA-256 043898a5036ed9605229ad61a29cb1a4facd1f6bb167d99ec134cb7c4807d9c4
logs/690-r8-runtime.log  SHA-256 602ccecf81caf20e0c467493ee395533099604439ee00535ff96cc1d99b587e7
logs/691-r8-typecheck.log  SHA-256 c89c1932aab9faf7210c79480d2f7aa542643c25fe10a91b50d1ceaa0643e064
logs/692-r8-precedence-load.log  SHA-256 680ef6e81c614fa54ba1d7b2c53e82c4a7c536c4f84f0b4185eb64352a373822
logs/693-r8-precedence.log  SHA-256 7df0a69e8582dfe3a95c89d50d4dfc7be7165d2b41db754a82f0e8449c7f6f08
logs/694-r8-allowlist-load.log  SHA-256 ff925a1fa7ec77b178227d1b9fc85123ba1ccd27e70af6b0f7ab435947c7f26a
logs/695-r8-allowlist.log  SHA-256 0aa831b4b9e339366314007c9c1e5850c7391b254928259ad80c88823b1aee9c
logs/696-r8-separation-load.log  SHA-256 4b9917ef25254af02d6fc435d91bf422d88750822357d825610fc0003d8b02fd
logs/697-r8-separation.log  SHA-256 9d1349f527675b9041dcdb79191ffeed4b36ffbbefb6444b9b2c3d9592438eb7
logs/698-write-r8-message.log  SHA-256 90fba77a2f18bf42a05fbcd07917b34aa66a1e21dcbde1ca8aa31ec23e00379c
logs/699-check-r8-message.log  SHA-256 afcd209bbde0bd7d07de22930678b46dc645e584c168c178e893fff685bde663
logs/700-build-changes.log  SHA-256 e80f7df8bef362c4da7eb874adb6159bfd39faf0784e1594b29c23b0ef718008
logs/701-r1-r6-self-fixes.log  SHA-256 8b1a8ac5e78a9f870bd15a4aac63c08b0f246a10e700225308e362bfcf3b7148
logs/702-opening-headings.log  SHA-256 bc5da5b8bf8386660ccb845c20f5bddc0b6a2b1fd74601cb799496edb0057054
logs/703-stage-r8.log  SHA-256 e9b3193cb0566924ec595df22ec95fa48932d3eecd97d54837ba10b56126f86a
logs/704-r8-staged-check.log  SHA-256 9d2d3bef1436cb59e67a25025dfddd1219d5b876e667260891b7908c38d4f92e
logs/705-r8-paths.log  SHA-256 9548d56abeab3f324545b220fd72b4babcc27124a94b21448a35a559a0ce53fb
logs/706-commit-r8.log  SHA-256 bf17adbbdd427643bd9d5f795b5cc6f77cac1c02a8942287fb539d7f610d9289
logs/707-r8-identity.log  SHA-256 b4c5b95600b1eb5fbd66f7b339a1c06cb8ca17f9fac77a78f4569817082d953a
logs/708-break-precedence.log  SHA-256 a84fc03cf7791f271a74d20192ccdb6e537c865f872b625ab311e6e3b2dcc9ac
logs/709-break-precedence-diff.log  SHA-256 483ddfcf61561ca650d0994fd2bbd6949de90a043515048dc4af6cd02852c51f
logs/710-break-precedence-runtime.log  SHA-256 74a1535d770b995ed029513f8faa11d6326534e8d092cd563ec647e55062fe0c
logs/711-break-precedence-load.log  SHA-256 c20d11207d10c96e6d518f6869bd0e36ebe0d2181f5caf661d0d4edf6e52d87b
logs/712-break-precedence-test.log  SHA-256 a579f1a0b6f73ae454e4ec543fe3fb7e4d62ec7ea9a1e1a9718348c953a5cd30
logs/713-restore-precedence.log  SHA-256 822a419eca8ece93ca9617d4c761c46728dcfce7af35e2726d9fe1f4078f7284
logs/714-verify-precedence.log  SHA-256 39db7a25077b2ac401db8768e7551d9edb9cb43d610cef2337debdcae6d361b1
logs/715-break-required.log  SHA-256 7c2c86b81fb6192b21c59a8eceac12a7530d53e2728cb0d4aed7f3cbedbd3c5a
logs/716-break-required-diff.log  SHA-256 9fc742ad0aa15fb10ca5cfd716a92007c2c3eec64cdb7ffb37a62e59a03af049
logs/717-break-required-runtime.log  SHA-256 59732da52583715323041205f8331a118d08bb4da3833db8fda0808a631c7633
logs/718-break-required-load.log  SHA-256 3865c74cb06e539ea86c7fb110a1f89760223daf314ee5da0418dd9d8af494dd
logs/719-break-required-test.log  SHA-256 a973b5a341a1a166ca9e9fc70782ef794e90053627321a398743ea9eda461e12
logs/720-restore-required.log  SHA-256 c8e986221ab458d0bde9b902bba30de7707b4e7ccdd2d7780b1c405e0c8b0115
logs/721-verify-required.log  SHA-256 52894c23f7729a2162e225822baef7ac378c4b0488d29a917d3c6350be3d1057
logs/722-break-import.log  SHA-256 7fbb4b85f4f2f502326751fc2c9cb1e33c2d4b55d7cab6f230c7fba69135ec58
logs/723-break-import-diff.log  SHA-256 35fca757df0d9b79d6dfde33f1fdc448261fcd2f7270551bc8df4a6d1cc209bd
logs/724-break-import-runtime.log  SHA-256 0bc388d6eebe4f1181324ae4af35fc211d00aab7afcdbf5a2d03a1da6ed53ac6
logs/725-break-import-load.log  SHA-256 2a9c5fd1083cc08f5276f246eaadd7913b8c2743702db95e12e8d4cfa200ac86
logs/726-break-import-test.log  SHA-256 f7349f99c50011559e841972b9664cf7d4db505d01a35fcfd88545c6566b54fe
logs/727-restore-import.log  SHA-256 18c842c4e759ad40defe1d0bf2d1453fcd035326ca61350346e225738eac72a9
logs/728-verify-import.log  SHA-256 90ea6bbf8566d11ad2b3c4357433304b8300abcf4b4cf09f4790a074fd87e08e
logs/729-break-legacy.log  SHA-256 50dc1ea731cb6a97d5f21e8885845e7ca58491749a1e94fb74e0670af754c1e0
logs/730-break-legacy-diff.log  SHA-256 0803734f2415e2a8856b5cd57696ed99f5213dd0dca0b6a8d1c9f9e68a9949f5
logs/731-break-legacy-runtime.log  SHA-256 a35175f2e5cc8602c0f2c26c386dc0ebf39e3e2a7249d739658eae1b016effcb
logs/732-break-legacy-load.log  SHA-256 b3c274cc99aba449e8fb5dc82c05a526c292f7ad0c22d6c82c8913db1c1990f0
logs/733-break-legacy-test.log  SHA-256 2a14ee25365b5264be8ca2ad784c2d8ddb8d1d912930bec9661c842b94aef4df
logs/734-restore-legacy.log  SHA-256 01d97477492350d23f87e176990ddb306d9b382991e7acabcb21aa7e345a2a1a
logs/735-verify-legacy.log  SHA-256 5d4bf1493b463da20284154ddc898234ad2bd109360118da036b5c6a987c6114
logs/736-nonzero-log-inventory.log  SHA-256 05091da295c49b85c4a4cd3979e90e3c6972ce059b5703ff91ead2ba3a0af85b
logs/737-r1-edit-status.log  SHA-256 5863d389931967dad3612472fda8d0f6af856e05f3684976785dd34d6c33bef5
logs/738-commit-logchecks.log  SHA-256 996caf7927963fc744db69ef78919a9f705e27fa69d4e2d55f5ea65554c4d237
logs/739-r3-r6-test-names.log  SHA-256 b2014c3526ae4e3e2a37733be8ebe3ad091d92dcb969691db31615271661042c
logs/740-extend-break-accounting.log  SHA-256 56357d75636dc399e65fa39e03e4e68a22e16834ce9009630ce5a9ecd937fa6a
logs/741-committed-functions.log  SHA-256 98817cabaa485f864dafa633b6a4347cd27c3669b6a3c417da4cd1a4e84386c7
logs/742-create-evidence-script-dir.log  SHA-256 31cdd63dc2f41a8e3d7033c5397c6803127dc7a220695aeea47b84c1112049f7
logs/743-add-transcript-writer.log  SHA-256 d016dadc2a0ed62a71db74385a99d6d989ad744730fc0972ac3fe37ba36ca82a
logs/744-add-healthy-evidence.log  SHA-256 de824b44e090a71f707187454d67a14ff716daf643dc7a233a83d6b2a77b54b8
logs/745-add-failure-evidence.log  SHA-256 949e188dd2b526762ff095210260244f0cc19adf7fa48d9381ce269d41c75a88
logs/746-evidence-healthy-runtime.log  SHA-256 d4f528e2912225051ad664e6dca5c3ace514c93eaebc8141fc8b22f5829eecb3
logs/747-evidence-healthy-load.log  SHA-256 02524f41433adb6fdee2dc825593096dcc2d3218f261f929bef8cddc61c6a929
logs/748-evidence-healthy.log  SHA-256 fbab5290c64f53287802189e4ded27aea28019a871d00ffa751d8937aad60561
logs/749-evidence-failures-runtime.log  SHA-256 a26da0e85868b65219109e675e0b936555a749f377667c7128c55dc0d793d931
logs/750-evidence-failures-load.log  SHA-256 2e1a9df51823f615714e1677ca34d9ccf710ee4642e634c4862c082d052c97e4
logs/751-evidence-failures.log  SHA-256 5dbe984af49955c02ca150a9bd42dbdf6afbba4d90ebabdcb450defdd9826b47
logs/752-complete-break-accounting.log  SHA-256 078ce15dd73639dbec660a0785888fac7a6c0f3b2ea6cf382d74e740a8c3c26f
logs/753-r9-message.log  SHA-256 2f354ff9a679c8d8d235c08ba2488615ac02821cd6e49a64254f8df2e93b62b6
logs/754-r9-trailers.log  SHA-256 abc7361681301aad85735c7f86bbe19df629e70b126d5e914cca26ff66979583
logs/755-evidence-manifest.log  SHA-256 fa5173fa3c89617f5801dbdafad38afc40d78532c67f5900ef7bfb670a173ec8
logs/756-verify-evidence.log  SHA-256 ec9485b77611e7853300c9334f89d98defddda095971f3bd2b834a6a51daf0a3
logs/757-read-transcripts.log  SHA-256 39cbb6cb659809a4db9a5092ad417831e55401740ee47d2e848ccbfe5affd653
logs/758-evidence-digests.log  SHA-256 e31f21897a79cba5dc49c49d9517704acacd5cdd78491444dfd6aa4b3d9884fb
logs/759-write-evidence-packet.log  SHA-256 57ed38d39ba1821c5221503fcdd80fdedccb99033c3b46101fefca23caab9419
logs/760-stage-r9.log  SHA-256 929840235f3be5b7ac6e71b0b51009714979074b5fbb9ae4bac38b1a13d48aca
logs/761-r9-staged-check.log  SHA-256 e3f5fce0200c60acd834f2787d4d8ab6fda7133980ad85f9e89285372a014663
logs/762-r9-paths.log  SHA-256 a1cdbaee47585196d6fe811045772f99c385610150acece94a377d68be0ef52a
logs/763-commit-r9.log  SHA-256 3f1ebe33f76a88901ed3c5ca4f1e4ee5636ccd41e061babaaf14a8b2cba4c43e
logs/764-r9-identity.log  SHA-256 5018d71e69fc235cb8053aae78e3b0411c4f23e63a59d5cc980d0ac0348d24ef
logs/765-full-runtime.log  SHA-256 52c15d60d95d705d1731dcce3126e7e19fd0293739e4d80a4544469a0eab617d
logs/766-full-lock-before.log  SHA-256 1432d96378b2828b971bdb5ae9ea1e5b641acd079ed7813ad768e5cf8a821576
logs/767-full-install.log  SHA-256 f07ec9d6e4e02a62fe5012252fb3a53e494988199468af226474ae23d94e72aa
logs/768-full-lock-after.log  SHA-256 1432d96378b2828b971bdb5ae9ea1e5b641acd079ed7813ad768e5cf8a821576
logs/769-full-install-state.log  SHA-256 21764d781540503d12ad2d27f9edd1c7465f2d62cd90e978017d28df773818b7
logs/770-full-restore-install-mode.log  SHA-256 e052fcf7d3dc25c181aa621c6e28d71c4c34e753c7c4f0ab73365c2019c2319a
logs/771-full-clean.log  SHA-256 bf7dae0d2a1042364d560f89088d900f26b3c6d6287ded6db7fb72d38afad260
logs/772-full-typecheck.log  SHA-256 764f372007f65422d036346061a5c0eb6a05e4d71e01765d050bf00426207a6b
logs/773-full-suite-runtime.log  SHA-256 d30b545eb28f623e3bd16cb82e5bf2a1544ea0f327e9b8a9887f3ee4cd0ac622
logs/774-full-suite-load.log  SHA-256 799af491cfbd163d10b3f46a36572ac558b9d0916f33dafb1486c99e3d9191f7
logs/775-full-suite.log  SHA-256 e7d912fcb2dc582f2893b9ceaef10ef1ba375d3f0feb928f547550362733df60
logs/776-baseline-list-procedure.log  SHA-256 b46a7c4d2092ec50b9da5e9ed3c45d615b91490320906ffe2fbdf29aa33b34a6
logs/777-write-record-mappings.log  SHA-256 3555f23b5bf2369b4338717e4075a6e7ca2906f44a62726491c9bfdfa19c31d0
logs/778-prepare-deviation-record.log  SHA-256 d62377742f247221a8bf89e5a472b55439d0b3c4ad606e27c944444dc287c7e1
logs/779-check-test-map-sources.log  SHA-256 0beb12fadb243fdc53a137ad23c2f664204aa8df3dcc7df107a7745315190143
logs/780-original-message-receipts.log  SHA-256 ba2f9e9bdbc7139c2f5469235567bc094e0d1463414f65f0762aad1a98bd6d53
logs/781-verify-accounting-inputs.log  SHA-256 0770c333d161c76e7c7e39c5ca9e6cac64ff4cabd0d05e3dc3e522fa3d7f6694
logs/782-identity-source.log  SHA-256 b5645954855917613e755271e27420a048563a74ae600a02cedcbe5880bcf449
logs/783-base-list-format.log  SHA-256 efc496844a89087f27c931cbcf0b86490b203cd610ef2c8a04696bc07b195117
logs/784-base-list-record-layout.log  SHA-256 692ef927225599170db6c36dec8a0c6b3b4ac13a0c48849d24f02482cdd011de
logs/785-write-suite-list-reader.log  SHA-256 d453359408e6cdbe06c86facd0ea6934e90f608109c6bd50c6959fc8dc951a4e
logs/786-draft-record-renderer.log  SHA-256 160a96be536fa69a2559be7f826a7eabed3c39ef6d44637d3926ce99208a8a77
logs/787-check-renderer.log  SHA-256 614a386d779bf10b0b44ee0121a97758d1820d2c532f308e4b13d7a506007ad8
logs/788-full-test-list.log  SHA-256 4bfd4435ff6f71ca87be0fd8cd124903c2702f0f396d1c1678196207f3ed57a8
logs/789-full-comparison.log  SHA-256 1f4eabcd4cea9f6619524dce37feb35cae654dcb43bedc89822610aa8c3544a4
logs/790-full-diff-check.log  SHA-256 db0fa1f0428f5c0270cd048a7c1b8aa37d25dbc8396db922174c67a88939ab14
logs/791-full-changed-paths.log  SHA-256 ce04eea0004caa694e633de819f90047cf61780a88bc54a35ed1cbbf18146726
logs/792-full-pin-diff.log  SHA-256 e778b43e2f3cd1866dc7656be112a9c8488f020d4b16f429321eae8145900ac9
logs/793-full-pty-test-diff.log  SHA-256 7db1983937a5af6d28a8c7044b2ab5214099959564b75a42df429553e0e52529
logs/794-full-protected.log  SHA-256 bbc48f09f57a56e2aeb857c0ee90ac30fe01b777198d4e5f4a28e6ab79dcfdf1
logs/795-full-manifests.log  SHA-256 503fb7119eb31c7478a08527aa9e60679cb1c17d13d81e3c990a3ef04d9fca15
logs/796-full-status.log  SHA-256 91ba334081bf29010def86f7a5ce24086b855f3585ce0929adde80b568985c72
logs/797-full-untracked.log  SHA-256 51cd51ff6099a96e85f812354e14dd5a6602dd8411e642bb854efc38ea73aa41
logs/798-close-message.log  SHA-256 64efe84e879c7d1be1d011ba9d91e56ec7c0bc3b1748fb783456970c0a71cde7
logs/799-close-message-check.log  SHA-256 de21518f49b2076a5a0d1d8d0eb6775feb899a556ab61b0e235d6f1d8d3d87e8
logs/800-check-report-sources.log  SHA-256 e9f48a40a964366b9b62d1170bf6fe1c6f8fcc094067145da2faf83db1a38f7a
logs/801-finalize-closing-renderer.log  SHA-256 6632289e7d018d69a151fe2d06fda9f338fd89717d77c8f7ec22fe41aed12a3d
logs/802-close-log.log  SHA-256 1f64d8fe0d370f53eb495e6f0f58c5e817a5b9d99a3890b3f79ebaf66ceb4723
logs/803-verify-log-packet-shape.log  SHA-256 e62a4bf976382d3a1080fea2bc654cff6c24f0e26651753a3ce7a4c3350ebd30
logs/804-read-shape-result.log  SHA-256 d787479e989ba3d74965a71da764d3b2c9c75893c2763b4272e38d9191f48a6c
logs/805-review-closing.log  SHA-256 8be9db75262e737a1ad212081de94c5bcb070c92a3cb99821490e7df82946a32
logs/806-closing-files.log  SHA-256 dd3643c2e56abc1c390658a01e10e52a45e40426dabe926fbc665aaec0105255
logs/807-report-tools.log  SHA-256 76e71ca4efe075c58e6c8a510b48e7ce5d46c605632e415433b6f66ad5caf8f1
logs/808-delivery-context.log  SHA-256 cacffc64346dc7e8f3fa1b9771d56abe334348711e12e447224aef0ba702e367
logs/809-check-delivery-modes.log  SHA-256 8e868a64fffacd39465035d159fac53679f504bfef9ad51bd30ec0fba94ba1fb
logs/810-stage-closing.log  SHA-256 5cfc17870361b5bcb2ffe912c4833ed9b73ca880a0c18a31db30922128e47113
logs/811-index-check.log  SHA-256 a13c8da2dddbf2b1d3e8a498e8c613ab7b044c0dfac6c2df8c13fea525c50e1b
logs/812-index-path.log  SHA-256 afab202da4ae6a3ef39a11d22187b8364004d0823e38fd0dc25470d883cceabf
logs/813-commit-closing.log  SHA-256 7e7eba92f571d2e76cc0ba384a0cd56dbac51b97c1907ce157ad6ff5286fd2e4
logs/814-closing-tip.log  SHA-256 1a4224e21ff8838ca1b69e74bd820af19a9ba386d0bc8d060e7feae5aad7e49b
logs/815-gate-runtime.log  SHA-256 5bc637da979f077e19ef1cb7eb9571eb8d537c41a9e80e851e8694cd356c6fb2
logs/816-gate-lock-before.log  SHA-256 f93acb1a2d0baa2a77821f7a5d2fb7c4913cc425c9e47a6ebf641f2c1cffc282
logs/817-gate-install.log  SHA-256 6b8f942b5a4e89cb37d0a368e3e369aa03da11f5e5cbb679f27a0f863f184429
logs/818-gate-lock-after.log  SHA-256 fecdb8ddaa7527a907da1e5966f7edfbf7bff7d8d73dff700d0c8828dc7f6394
logs/819-gate-install-status.log  SHA-256 7e1c2d67969af3965f723dec7614e496e930dc4a02149e6734ab77e6111e73d8
logs/820-gate-install-restore.log  SHA-256 c37318739afd31367b89f3bf43976fd89cbd1c7868a2d2b0928589699738a563
logs/821-gate-install-clean.log  SHA-256 e10bd4b4d3e49e9048b9653f56c221ea928eb87f1af04b3fbe6e5ace61d9dcd7
logs/822-gate-typecheck.log  SHA-256 5cf83ff1b38de47423e189eb58771a7e1a65c3b7b9f0903c14ba608011c28214
logs/823-gate-suite-runtime.log  SHA-256 eff00bae7e5718387d3b2d41f19eb75251955ca0a10e7e18f786abf5a8f96b6b
logs/824-gate-suite-wait.log  SHA-256 7ed5c30d3cc75c0874b85c8bf80a48b57f3b1786ac6e3260fb9f35d902bdd4e7
logs/825-gate-suite.log  SHA-256 5e1777b4b26f74320cdb3acf3309b64f348c092fb68661bbae09937c832bcd75
logs/826-review-source-sections.log  SHA-256 7e04037deb7b1f3a9a9313efbfe8b2995d67545431b21e062edcf16aaedf0702
logs/827-review-delivery-inputs.log  SHA-256 8ff035f6663ad4ad0d88f9f09a1f62e30d137e0a5c65b9d91731b3ed8a779736
logs/828-runtime-names.log  SHA-256 05aac9cf26ee803f44766acb6f89fffd4e5b1882ca8f25f0bb30a0666bc0cb6a
logs/829-head-stat.log  SHA-256 b457df95cce2c7d39d8a5d85bad0ecfe445034900a647ba790bfbd0ff0e73bdf
logs/830-head-source-diff.log  SHA-256 25e26ad1bd3973cb1a89073ebb537ff076b684af9d2e03939e9db622607ef96b
logs/831-existing-test-diff.log  SHA-256 a51d9dbfd5901a14d04b978da022f2a2ade207032c05d1dc29fe2929ed5c9e3f
logs/832-existing-test-lines.log  SHA-256 b89c652fa08eaf2eaa554d72e9a673b82ab231b2d4ef9050ce60390bd0afb270
logs/833-source-receipt-names.log  SHA-256 c014f0ad05fb47be06819e8ea8809c9d7b71a0e367e1918eed5985a44a05b2e5
logs/834-pr-body-rules.log  SHA-256 69326ea5e21b49e8c50fb1f7d6c387d858b32e8a2375868806549cfa22fd489c
logs/835-gate-text.log  SHA-256 ee7a1e0b954925b7d42857b0d65759aa8dbaa5de5f3c22c53201df1e234a2f7e
logs/836-select-report-inputs.log  SHA-256 c8f7935fcd88c3fa8407d5f1f8cf76f9e2677ac3dd48746cebdfcc39ed3f70a2
logs/837-failure-receipt-form.log  SHA-256 88f77d0a8acda00bacf5cb4fe2894ab0607d802f207676b490b7698ca99a6b4a
logs/838-opening-source.log  SHA-256 fe1078a0138efcdd44c18ad87b7180928e668e7e7870190e9381506eda5d65c2
logs/839-verify-transcripts.log  SHA-256 b8b18128aeb89cc145b55077331ac2454b74fa1ce56086e03d493088bb2bca68
logs/840-delivery-source-notes.log  SHA-256 0ef4905270f85090e2d1c4801eab027d2317f410bc7dc8016582226834c8af92
logs/841-delivery-source-notes.log  SHA-256 236d18e1888c1fd0f95de5f1dffe0b72eb1e69e1acc84a0b86e4f2021b198625
logs/842-delivery-requirements.log  SHA-256 80d8015c5a2174ba85ae24781ec9749683d6d68bb7c476f6db8421130983a229
logs/843-delivery-formatter.log  SHA-256 ce3647c1dcd0b8f5e7c192f36ff0d77f86850a44d45372b92ece149a399dd123
logs/844-review-test-lines.log  SHA-256 6cf6b3ff167d0bb76af03a39fe4023a80f42558829a259e722646e2620df37f5
logs/845-report-receipt-review.log  SHA-256 2e7af93ff063ec0bc88cc0a89d43092517cabffbf304e5edfbb8584253884794
logs/846-gate-list.log  SHA-256 6dd6730ef62e30e66fcb6981998c92cb8f808880beeb96df85a01f67b4af6ef2
logs/847-gate-compare.log  SHA-256 a48ea34da9ebd94de50d1da25d0ce444fd4ddcb9305588b58acbbae6d6956092
logs/848-gate-parity.log  SHA-256 36622e73f22715a18e76d6a9952f272ed2946e57a77da23e5e2caf5629508628
logs/849-gate-path-check.log  SHA-256 004ff21cb0fc0b6b597a30af2efd4cb31b6b19b2834d695e89a8094734179d79
logs/850-gate-changed-paths.log  SHA-256 c7ace10a0858a4f97a1f01df5eae5f99b2bb40b947bd3e6e761fa3ec019340f1
logs/851-gate-status.log  SHA-256 2be58313efdffd75706193ffd3235795f34e35c69fb8d2cab41f198e4eabcb10
logs/852-gate-untracked.log  SHA-256 d502bbd119a2337b9afab93255a2b7cb58f49658bcd2aaf11f14521dfc046d66
logs/853-gate-protected.log  SHA-256 152b8d58093158d9f4dbe6cd502dd4a21820be4fca2680f33a3f7e57952b5493
logs/854-gate-manifests.log  SHA-256 86a880d7b17153138ff580941a5a30e0d3d97050674c6f04271189774869e3d0
logs/855-gate-pin.log  SHA-256 eef8f6bf4cf7b92b81a05ab5e2edc7233fedc78dd8af2b5e62c8f7a67c448688
logs/856-gate-guard.log  SHA-256 277946566f9235c5e3fd12d6930b892a4a9b5bc13a17a5c79ca9916ff81f2085
logs/857-write-pr.log  SHA-256 52962a5b5609bf9a2115092af3641376985cb9c92442465546ba3068e360ba8f
logs/858-prbody-attribution.log  SHA-256 0b70762fa663c1442170abd0b0bb5c4035e51bb36ded18672c7d89abff8a3da4
logs/859-branch-attribution.log  SHA-256 7812be16e652c9c81147fe118692a883aa1b414c2181e8b2abcbfd564c767481
logs/860-confirm-delivery-state.log  SHA-256 905f254a29483a59dce199343115c2cf54a027151b52049777eab24c9ff669bc
logs/861-final-report-writer.log  SHA-256 7e783186a9b92536bcbfd0c17ff405fe8fc8fe37959272d71b1292f041e0e39c

12. Deviations

The Founder upheld three halts.

1. Runtime check 042 used the barred Homebrew Bun 1.4.5 after a nested shell changed resolution. The Founder invalidated the frozen install in 033, typecheck in 040 and check 042. After the install directories were removed the baseline was restarted under verified Bun 1.4.2. The first halt report has SHA-256 eed8bc988d68dc9e1b601cba8ee3e0e3fecc80bd92fadfa45059027d5714f730. 042-baseline-runtime.log, SHA-256 7c0650151550ee7d95b47cad5368cb780c9176dc58e7523d8a9c0b80ce0f232a.
2. The live-port break emitted an unsanitized diagnostic. The Founder deleted log 124, SHA-256 7294cb12c91044601c50df986f5566f930178b53dc3fd46dcef26300f8a34044. DEC-20261123-01 Addendum 1 has SHA-256 5cd930a3f2dbb8f3a85c63cfba5ed95f8088418ee132e89872d57e63fad75666; resume message 2 has SHA-256 611e62f080409fe686392d45455622d509732bea2875e4a754cdb4c00f5263e5. Commit dd19008a74a2ffbd85703f9dbb031a23e8571702 fed the port fixed synthetic diagnostic text. The repeated break failed its target on that text. 152-break-test.log, SHA-256 7d9d45506b5712682a1511ecc707c7ea15c1965afef67797f2f80bbbb86125af.
3. The host echoed the prompt before the stand-in could read it. The third halt report has SHA-256 90bd5248ced3c56996588b44de5b0204efff1dbc059dae0e9b7d5d30d730479d. DEC-20261123-01 Addendum 2, SHA-256 f524cb055c363c57dbcaf25dc037645989d453a942f3ce120c7083735e6cc52c, authorized the Phase 3A runtime change and two lines of its lifecycle test. Resume message 3 has SHA-256 7176750c77c97b52bb9a0f0e16f5d6ea68f7be8ed27b5f209a0940e7bff9f1ea. Commit f1fdd9e646ee1c4aa0ddad136a19da13db2600ec clears the echo bit before spawn. Both adapter tests still reject an input line returned as output. Their synthetic streams already supply that line. The composition stand-in no longer changes terminal mode, does a silent first read or saves the prompt in a file. Its small launcher changes to the disposable working directory, records the process-group leader and executes the stand-in implementation. Logs 607, 609 and 611 verify those decisions.

DEC-20261024-01 B2. In commit 9542eb4b27f0ce009a389feb50d8eff68e7f0878 the SHA-256 of packages/supervisor/src/build.ts changed from 6008c0bab23f1bde66af3744c4731203f509f2890015b853ea6e50d6c4f4c44a to 50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d. The one allowed computed call obtains the async iterator on host.handle.facts() and is unchanged. No exception was added. The quoted diff has trailing whitespace removed. 117-r1-pin.log, SHA-256 722a1e6b703c71e45bce26e6a89191eafd7790de43e3860b0bb15042d8c4d413.

Source: 117-r1-pin.log, SHA-256 722a1e6b703c71e45bce26e6a89191eafd7790de43e3860b0bb15042d8c4d413.
Source line numbers cited for square brackets or a divider: 8, 11–12.

diff --git a/test/phase3a/harness-separation.test.ts b/test/phase3a/harness-separation.test.ts
index d3221df..326687a 100644
--- a/test/phase3a/harness-separation.test.ts
+++ b/test/phase3a/harness-separation.test.ts
@@ -27,7 +27,7 @@ const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> =
(lines omitted)
   },
   "packages/supervisor/src/build.ts": {
(lines omitted)
   },
 };

The Addendum 2 B1 changes to the Phase 3A host and test, with trailing whitespace removed.

Source: 550-confirm-addendum-diff.log, SHA-256 ebc957d1b7eb5e0deac07553c4ce59db08ab885a927bca00b1ab2f6ec03b9593.
Source line numbers cited for square brackets or a divider: 12, 31.

diff --git a/packages/pty-host/src/terminal.ts b/packages/pty-host/src/terminal.ts
index 786b29f..9009665 100644
--- a/packages/pty-host/src/terminal.ts
+++ b/packages/pty-host/src/terminal.ts
@@ -76,6 +76,7 @@ export function spawnGoverned(
       }
     },
   });
+  terminal.localFlags &= ~8; // ECHO on macOS and Linux.
(lines omitted)
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
(lines omitted)
-  expect(outputText(facts)).toBe("ping\r\nping\r\n");
+  expect(outputText(facts)).toBe("ping\r\n");

   const termStartedIdx = kinds.indexOf("termination_started");
   const terminateAckIdx = facts.findIndex((f) => f.kind === "ack" && f.ofKind === "terminate");

The Addendum 2 wait reached the time limit in 553. The repeated wait reached 1.63 in 559. 553-pty-echo-load.log, SHA-256 0cdcae13edd3e98c06a346fe577a6ae2798b6232892ef8b9db439f20f1edaf2e
559-pty-echo-load-repeat.log, SHA-256 9aeff7740ec51b2c4a2b786d561844474343cb6ea22bfef4e42e153141c578bb.

A delivery source-index read used the wrong descriptive filename for log 152. The corrected read used its existing number. 840-delivery-source-notes.log, SHA-256 0ef4905270f85090e2d1c4801eab027d2317f410bc7dc8016582226834c8af92
841-delivery-source-notes.log, SHA-256 236d18e1888c1fd0f95de5f1dffe0b72eb1e69e1acc84a0b86e4f2021b198625.

No live call was made, no real surface was run, no real key was used and no Founder configuration folder was read. No capability record was written or renewed outside a disposable storage root created by a test or evidence script. No request left the host other than the permitted package downloads of bun install --frozen-lockfile. The M1 entry is reachable only from offline tests and evidence scripts.

The PTY host still chooses the child's working directory, and other readable files there are outside the environment allowlist. The TUI uses the relative supervisor and madv-surface adapter source imports required by B16. The host disables terminal echo before spawn. Whether a real surface enables it again remains unverified offline.

13. Founder's next decision

The Founder checks the session record. Every planned builder break was exercised and restored. After that check, the Founder decides whether to run the guarded B25 command to push this head and open a draft pull request. The Founder runs B24 from fresh clones on both certification hosts. Hosted Verify, Verify (macOS), independent review and live certification are outstanding.
