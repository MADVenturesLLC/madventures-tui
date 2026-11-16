FOUNDER_DECISION_REQUIRED
Phase 3B M0, Phase 1: stopped during preconditions, before the baseline.

1. Identity and runtime

Harness: Codex.
Model label shown: GPT-6, made by OpenAI.
The harness also describes this agent as Codex based on GPT-6.
Exact model snapshot, reasoning effort, session ID, CLI version in session
metadata, and approvals reviewer: not shown.
The reported model label is not a machine-verifiable resolved model ID.
Agent task identifier: /root.
Collaboration mode: Default.
Sandbox: workspace-write.
Approval policy: on-request.
Tool execution describes network access as restricted.
Loaded MCP servers: none shown; the Founder states none are loaded.
Shell: zsh.
Date shown: 2026-11-15.
Time zone: America/New_York.

Visible namespaces and tools, with the six names of Addendum 2 B4
represented by that phrase as the prompt requires in files:
functions: wait, request_user_input, request_user_input_async, exec.
Inside exec: apply_patch, exec_command, write_stdin, clock__curr_time,
and the six names of Addendum 2 B4 where applicable.
clock: sleep.
collaboration: followup_task, interrupt_agent, list_agents, send_message,
wait_agent, and the six names of Addendum 2 B4 where applicable.
The deferred namespace is among the six names of Addendum 2 B4.
Its individual tool names are not shown.
The initial identity message lists every visible name literally.
No additional namespace, web tool, image-generation or image-editing
tool, or goal tool is shown.

Calls made: functions.exec, with exec_command inside it, only.
No barred tool was called. No command or exec input contained any of
the six names of Addendum 2 B4. Tool output from reading governing
documents contains names; no such output was made into an exec input.
No memory lookup or earlier session record was read.

Governed CLI command:
 /Users/michaeldaley/builds/codex-governed-0.167.0/node_modules/.bin/codex --version

Its output, verbatim:
WARNING: proceeding, even though we could not create PATH aliases: Operation not permitted (os error 1)
codex-cli 0.167.0

Exit status: 0.
Log: logs/001-governed-version.log
SHA-256: 5b6201f03599ae5d6e1c01fd8a2202ea36ad1a844ed58e03d8bb92dbe90214ee

Git user.name: daley40-lab.
Git user.email: 293512385+daley40-lab@users.noreply.github.com.

Exactly one runtime check ran, with escalation approved for that command.
It passed. Its output:
 /Users/michaeldaley/.bun/bin/bun
 /Users/michaeldaley/.bun/bin/bunx
 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
 1.4.2
 744846f844374847c902b5e7fd59b4342a51ef99

Log: logs/007-runtime-check.log
SHA-256: 832fa84af43b8b1998ae233448b637a2094ae4d69652c5eeb2f965850741bc72
Exit status: 0.
The command set PATH within that command as required. No host setting changed.

2. Repository and preconditions

Working directory: /Users/michaeldaley/builds/m0-r1.
Branch: build/3b-m0-r1.
Binding base and current HEAD:
0825a1e349ca5ea6427eea5f2de79dff234dc8f7.
origin/main:
c0c0c31f1489de0378f8ce0726238b4e9603a84c.

Precondition 1: the branch, base, origin/main and ancestry matched.
The tree is clean and there is no stash. Neither the M0 build log nor
packages/adapter-madv-surface exists. pr and record were empty when
examined. logs held only this session's logs at that examination; the
first command had already created its required log, so initial emptiness
was not independently measured before logging started.

Every changed path from the base to origin/main:
docs/decisions/DEC-20261112-03-addendum-1-resumed-session.md
docs/decisions/DEC-20261112-03-addendum-2-gate-repeat.md
docs/decisions/DEC-20261113-01-h2-records-and-merge.md
docs/decisions/DEC-20261114-01-madv-surface-release.md
docs/decisions/DEC-20261114-02-minimax-plan-terms.md
docs/decisions/DEC-20261115-01-madv-surface-0.1.1-records.md
docs/decisions/DEC-20261115-02-phase-3b-m0.md
docs/verification/2026-11-15-madv-surface-0.1.1-release.md
docs/verification/phase-3a-correction-rounds.md

Evidence: logs/008-repository-preconditions.log
SHA-256: 171428209dfb6a358388f22d5b91fb48605e7f26c8fb051430a049ab57d3debc

Precondition 2: every AUTHORITY file's SHA-256 matched the supplied
value. The addendum and all listed acts inspected carry ISSUED status
and the Founder's signature. Both supplied manifests passed shasum -c.
No supplied prompt or reference file changed.
The reference files were checked by manifest; their functional review
had not begun when the test-authorization gap required stopping.

Commission SHA-256:
5d8bd4a446d8b3120bddbc34dc11a5fdf83e3a07d9efcd04fbd7b8efdad8d22b
Addendum 1 SHA-256:
31576960c18a4c9607fca2785e54146df5f740af45b4437dc7f13890abaeca42
Supplied prompt SHA-256:
286664ccb06fc164d7c939dba2f3fa3498793bdb84e0ee9ea51f986855f88824

Manifest-check log: logs/009-manifests-and-instructions.log
SHA-256: 6c2d65a4a55fe4e6d921132d350757c64e53c279ffd502f50136b366b3db82cc
Authority-hash log: logs/013-authority-hashes.log
SHA-256: 710a7e088c02a9d473d3993748b7a86ba0d4068b2c502c3736aa6588167118c3

Precondition 3: source inspection was underway. The registry,
environment module, attestation module, preflight module and manifests
read as DEC-20261115-02 A5 describes. Their full numbered text is in:
logs/054-base-registry-environment-manifests.log
SHA-256: 000f46b2234c2b83e6d658978df708c71e56d0ebfcb8b015ecd88c22955c510d
logs/055-base-attestation.log
SHA-256: 14e86dd35c3d58e84d2e4ac23ac19a75ba1e7a0e1583de5039f4e6a147b25622
logs/056-base-preflight.log
SHA-256: 254987ba02f2ce0c050b30636ab585269e7b8b62e73a349851c836b029ccfe41
The complete required quote assembly and every Addendum A1 cited line
were not completed before the halt. No completed-preconditions claim
is made.

Precondition 4: all three git blobs matched:
packages/supervisor/src/preflight.ts
ced2364d85c0117563533e6dc419575f06a09161
packages/supervisor/test/preflight.test.ts
182285abde26fae13f9403dba676349608a61265
test/phase3a/runtime-harness.ts
8e63d73f723c3fa7eea2e300c3e378e107957b0b

Preflight lines 143, 192 and 193 were printed with their numbers.
Those lines contain square characters, so their exact output is cited
by log instead of reproduced in this square-character-free report:
logs/057-base-blobs-importers-and-addendum-lines.log
SHA-256: 67c31d8c3831fe6c79da8efadea7da9ff45246f6760aa08679c72fefc299562d

The other two required lines, verbatim:
packages/supervisor/test/preflight.test.ts:298
test("the returned plan's repository fingerprint is frozen", async () => {
test/phase3a/runtime-harness.ts:14
import { runPurePreflightWithDependencies } from "../../packages/supervisor/src/preflight";

HEAD is unchanged, so the base blobs and lines remain the head's
blobs and lines. No implementation head exists.

Precondition 5: git grep printed the lines of the named supervisor
symbols and attestation imports in log 057. The search was broader than
needed and also printed unrelated modules. Relevant files include:
packages/supervisor/src/attestation.ts
packages/supervisor/src/preflight.ts
packages/supervisor/test/attestation.test.ts
packages/supervisor/test/preflight.test.ts
test/phase3a/evidence-pipeline.test.ts
A final exhaustive-importer validation was not completed before the halt.

Precondition 6: passed. uname -sm printed Darwin arm64.
Precondition 7: not run; stopping preceded the baseline.

Final state: git status --porcelain, git diff --stat, and
git ls-files --others --exclude-standard all printed nothing.
git diff --check exited 0.
Evidence: logs/058-halt-test-authorization-evidence.log
SHA-256: 933ef925b56a492113aebbf0e633bd6d99bb62e28cc3bb70eb962901cb1e64b9
Final-state log: logs/060-halt-final-state.log
SHA-256: fb00e32191b4f1b7353e088975977530f3b83f0e80a90c9db29a5af95b8cb54a

3. Baseline

Not run. No install, typecheck, suite, listing run or load wait ran.
No baseline result, bun.lock-before/after result or base list exists.

4. Task detail and the halt

No build-log opening or task-detail commit was made.
R1 through R6, their tests and their breaks were not implemented.

The halt is an existing-test authorization gap found by inspection,
not an observed test failure.

The commissioned R2 adds a real madv-surface registration.
The commissioned R3 makes MINIMAX_API_KEY required and secret.
Addendum 1 B3 item 2 requires the shared helper at
packages/supervisor/test/environment.test.ts:22 through 28 to supply
that key with a synthetic canary.

That file's registrations collection at line 13 iterates every registry
entry. The existing test "redaction reports which rules ran", beginning
at line 133, iterates that same collection at line 137. Its line 138
asserts that redact returns unchanged fixture text and an empty
rulesApplied array for each registration.

The production function redact at environment.ts:113 through 118
delegates to redactWithAllowlist. That function includes each present,
nonempty secret variable in its rules at lines 91 through 98. It reports
the rule even when the input text contains no occurrence of its value.
The existing assertion at test line 136 explicitly pins that behavior
for the no-match case.

Consequently, once the required helper supplies the canary and the new
registration exists, the line 138 assertion expects no rules but the
unchanged redaction contract reports the rule:
secret-value:MINIMAX_API_KEY

Changing the shared helper as authorized therefore exposes an additional
existing assertion that would need to admit the new secret-bearing
registration. Altering production reporting to suppress that rule merely
to retain this assertion would change the established redaction
contract rather than implement the commissioned allowlist.

Addendum 1 B3 item 2 names only these two tests:
"no ambient variable outside the allowlist survives"
"the same registration produces byte-identical environments on repeated calls"

It permits their count/helper adjustments. It does not name
"redaction reports which rules ran". That test is neither a version pin
nor an architecture test. Addendum 1 B3 says every other existing test
stays byte-identical, and B4 says any other change to an existing test
halts. No superior text supplies authorization for this assertion.

Controlling halt: DEC-20261115-02 B14 as Addendum 1 B4 reads it, and
the prompt's closed halt concerning an existing test needing a change
beyond EXISTING TESTS.

Source-file SHA-256 values:
packages/supervisor/test/environment.test.ts
645ee9662e39c883788e820a13131220ed19454fafdf222ad597f101651a5a9b
packages/supervisor/src/environment.ts
86cef1ebd2d91055da3acb47661edf2743382aa800ff6dc76ead2eb23f58d76f

Exact source lines and their numbers are in log 058, cited above.
Addendum B3 and B4 are printed in log 060, cited above.
No failing-run output is claimed because no such run occurred.

5. Existing tests changed

None. Every repository file remains byte-identical to the binding base.
There is no test diff.

6. Commits and attribution

No commits were made. There are no commit-message files or line-width
or trailer checks. The five planned commits have not begun.

7. Full run of Phase 1

Not reached. No whole-suite result, head test list, comparison,
arithmetic or lockfile diff exists.

8. Diff

The diff against 0825a1e349ca5ea6427eea5f2de79dff234dc8f7 is empty.
There are no changed repository files.

9. Record script

record/m0-record.ts was not written. No script run, synthetic folder,
capability-record write or Linux run occurred.

10. Artifacts and logs

docs/verification/phase-3b-m0-build-log.md does not exist, so it has
no artifact SHA-256. This halt report is pr/m0-phase1-report.md.
Its SHA-256 is printed by the report-validation command and reported
in the session's final message; no self-referential hash is embedded.

The attribution-shape-check was not run. There are no branch commits
from this session to examine, and Phase 1 did not reach its final checks.

Each command's full output remains in its numbered log with uptime and
exit status. Some tool responses abbreviated displayed output; the
tee logs remain full and were not truncated, compressed or encoded.
Governing-document reads whose displayed output was abbreviated were
followed by additional reads where needed.

Log 059 lists SHA-256 values for logs 001 through 058.
Its SHA-256:
84ca2e303f80b7c290bb57deaad9816f11ab2a542c786bb6e41b14602714545e

The log SHA-256 values from log 059 follow:
5b6201f03599ae5d6e1c01fd8a2202ea36ad1a844ed58e03d8bb92dbe90214ee  logs/001-governed-version.log
c5e10cf848cc68a9a8d51cb9a29c216f3c6db0f3adde797f7baac9264dfd142d  logs/002-pwd.log
40a2aaebec4852fd122a32a66d1ae5bd53413b298d14e512d56537d0172f9d3a  logs/003-branch.log
20b6d11e9c14097bf43addcb6fce0724d1a9702dd33fab76bb03f750df145667  logs/004-head.log
8b2073c22e0eea52c4dc7e5336e20ec83dcf4852830a97667833da2da4d04e37  logs/005-git-name.log
e7e67d5f1c8324c671c1bfed4528cdbd3cb2948bef60a28847e3b3b4644a086e  logs/006-git-email.log
832fa84af43b8b1998ae233448b637a2094ae4d69652c5eeb2f965850741bc72  logs/007-runtime-check.log
171428209dfb6a358388f22d5b91fb48605e7f26c8fb051430a049ab57d3debc  logs/008-repository-preconditions.log
6c2d65a4a55fe4e6d921132d350757c64e53c279ffd502f50136b366b3db82cc  logs/009-manifests-and-instructions.log
0c6044380372327d1a8c0e7eec6f447606466940792a7b94a3f430cb1b280da6  logs/010-authority-agents.log
fdb6fce7ac628f0f41a88bf57964ae38f27f0a2fc23e3ab2d4f9a86f44be9264  logs/011-authority-m0.log
6f848840ff5d6589b1192895235b9cfc5bdad008afc4858d59e052b1eebd9583  logs/012-authority-m0-addendum.log
710a7e088c02a9d473d3993748b7a86ba0d4068b2c502c3736aa6588167118c3  logs/013-authority-hashes.log
4eb0fd41571f9f958560601954a469656ed78f8b7cbe1f18054e294149ff9640  logs/014-authority-12.log
b7d272c5d49db44de75cda07d8d3efc0c5a17383aa126a0c1153a4cbe55a5f05  logs/015-authority-13.log
1d56307024f8ef96bc9996dc6e9e503be18a292e0ff4e2a5fddfbef812c929b3  logs/016-authority-14.log
0f015a92084419a23cd206ffaae5067f4c6b07a5b598355454dbd3a8c1d5de5f  logs/017-authority-15.log
97acd4a2d359bc5cb932fb8df78bca837bd3ce8d54948fd6a6500d3b67824b73  logs/018-authority-16.log
8ff6e90acc65e9d267c05ad5c4ccf1f043f4486aa5f39ff6768a30e7892a4faf  logs/019-authority-17.log
8bb17f609510abbd7ef33cf8a10cb78517a1d07172b447d20651b6a450601772  logs/020-authority-18.log
edcff6e5110b23e23dd6827c253b39a8daeedfed4486a4c1cb745c926a375e1b  logs/021-authority-22.log
73303a4eb074915dcceb892624c40069fee44847a08fb52062a6a9b3c93098e6  logs/022-read-harness-authority.log
a76c56255bc78f5467079accd8960568c4faaa5e1026c3052e5d0d71a498439b  logs/023-read-governed-build-authority.log
3b8850e6ee6017003ca9038c38a703ec7a30d796ee54237a9f042bd8671e2136  logs/024-authority-model.log
04376cb2169ba554bfd80c7894c8888321f619d0d0b6a18605194b70014217fe  logs/025-authority-1.log
1cabfe8be7fd5e4f30433ca982e89660ef997621fdeb2ec60b9fe8a0bf892ef8  logs/026-authority-2.log
f1e521672a11889623b345fac3595a113f43f30a0b2406f7e5db8af04b9373f6  logs/027-authority-3.log
8c9c762d4fb4782e727a35d6137445eb3d3b5a2d39f168fa279b565bb39dd1ef  logs/028-authority-4.log
ac16692e00c5f7cb371406242c918f6d198435313bd53b636377a5a9d35fbb59  logs/029-authority-5.log
b55e1d093bf2c48f8f304e1db72700fe27969c1028b5e85df4f285a2964fe7fc  logs/030-authority-6.log
4b9c5f7c8555dfb3aa7068e72b82dc8db031906a754ccb8b904aaadcb3f4f092  logs/031-authority-7.log
8684c4d58a2df07659f03f73000446e877b88ebda7724456c74d77dc53105c04  logs/032-read-h2-authority.log
11b7f00332ad8af79341e9c65de631bb1659238c0fe0346d1372028d1131fcab  logs/033-authority-8.log
7a78c6930dcf0fb73a434fb61278374405eae4287e6398fff732ee9e60c9c9af  logs/034-authority-9.log
def17d9797e316b98a5432aecb29afb8937d5a5e4461a14589d5eea537cba7c3  logs/035-authority-10.log
01c7333e1dbeae140d7d115482e47dcd29cc978fd72586650eac8811aab21026  logs/036-authority-19.log
79d0de69af6e62b999cc776ee1899a7f54bd931cc4fdb3b9fd1772f836c3d813  logs/037-authority-20.log
7081e40bf1e2ee02a2ed3fda9dd8e07fb75737d1ae45ba63b54f9339100f4216  logs/038-authority-21.log
668f5d3ca3686ce9375bc6f782a14e1dae090288675514fa84205c0a232712fc  logs/039-authority-23.log
0c886759fe17a6f3f19087a93c0d02237a82a143146ec3ceba5703b6eace3cef  logs/040-authority-24.log
4fd5c3471f470f32d2fb0af069bc59736289f462734ede2b3480280c7a6186e6  logs/041-authority-25.log
de7f677c5378630efcb5c34d5b9d225259f19fd20e887156f98f9d7b38c09e1e  logs/042-authority-26.log
9adf307333d46e2637eddf08d2908444a907022c8c3694534c3bf20892dec33a  logs/043-authority-27.log
51281767cce93517a24cc5f92383edd153f53deed73b4dd211a416c4088e3fc0  logs/044-authority-28.log
69f251e3c6c711881f164efd9ed8e0e3f487afb3daa89de9e653ede5a4b528ad  logs/045-authority-29.log
463eb7b5d8f00dbfe38100d661ab04a95ec1f4ae08480170515ddf26d4fdec35  logs/046-authority-30.log
3eb4e3c8eec2b4e61fc0eb78761ffd494fdbe74650b8e514ba4914c70cef1697  logs/047-authority-32.log
00a55535dec92e8dda18796d14c486ec5dce4d33ec47ca0fea796b7fa8be8102  logs/048-authority-31.log
cf60ebf067460ffa18f7bf169c3bffbafc9ea48d03b360a1f6ad146053920dce  logs/049-authority-3a-design-1.log
c42559a304b81e5a710f8fc907506f462f8c1e7664175dd156d2f0e74fc0a98c  logs/050-authority-3a-design-2.log
ff973c765f14e9edbf0ee07c9040a7f7d6a9065509cb65b9ea24ff148e18dd27  logs/051-authority-3a-design-3.log
4888a18233283920a59d9bf894360231ee30196ef8daab9efa08fddd0ceb095a  logs/052-authority-3a-design-4.log
c17c550d98e0489a828dedfe8c73bfa0bbda2388ad91b2a0f3e365043c6a2aca  logs/053-authority-read-gaps.log
000f46b2234c2b83e6d658978df708c71e56d0ebfcb8b015ecd88c22955c510d  logs/054-base-registry-environment-manifests.log
14e86dd35c3d58e84d2e4ac23ac19a75ba1e7a0e1583de5039f4e6a147b25622  logs/055-base-attestation.log
254987ba02f2ce0c050b30636ab585269e7b8b62e73a349851c836b029ccfe41  logs/056-base-preflight.log
67c31d8c3831fe6c79da8efadea7da9ff45246f6760aa08679c72fefc299562d  logs/057-base-blobs-importers-and-addendum-lines.log
933ef925b56a492113aebbf0e633bd6d99bb62e28cc3bb70eb962901cb1e64b9  logs/058-halt-test-authorization-evidence.log

11. Deviations and limits

The governed version command printed the PATH-alias warning quoted in
section 1 and exited 0. No setting was changed to address it.

Log 057 ends with exit status 2 because one rg argument mistakenly used
packages/adapter-claude-code relative to the workspace instead of the
clone. It reported that path missing. This is a read-command path error,
not a missing package in tui and not a test failure. No corrective
repository change was made.

The prerequisite inspection is incomplete because the additional
existing-test authorization gap required stopping. No baseline, task
detail, build commit, break, full run, record script, or attribution
gate is claimed.

No live call was made. No surface was run. No real key was used.
No capability record was written. No GitHub or network call was made;
bun install was not reached. No other agent was started.
The clone, prompt and reference remain unchanged.
Only this session's logs and this report were written.

12. Single next Founder decision

Authorize, by a signed amendment or ruling, the narrow change to
packages/supervisor/test/environment.test.ts:138 in the existing test
"redaction reports which rules ran", so that the new madv-surface-v1
registration expects secret-value:MINIMAX_API_KEY while the existing
registrations retain their existing expectation.

That decision is needed before implementation resumes. The MacBook
investigation, record-script runs at a completed Phase 1 head and
Phase 2 have not been reached.
