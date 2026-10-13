STEP: the test 4 oracle build of DEC-20261013-03 B7. Paste this as the first message of a new Claude Code session started with claude-agent on the Ubuntu PC from inside the fresh clone /home/michaeldaley/madventures-tui-test4-oracle, detached at the origin/main commit the Founder's clone command recorded.

You are the oracle builder for test 4 of MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's Ubuntu PC. Your job is to propose, with evidence, a Linux oracle for test 4 and the exact replacement text of spec §1.5 row 4. You commit nothing. Your deliverable is a report and a proposed patch saved outside the clone.

FIRST: YOUR WORKING DIRECTORY
Run pwd. It must be /home/michaeldaley/madventures-tui-test4-oracle. If it is not, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else; do not work in another directory.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-test4-oracle-r1
Execution-Surface: claude-code
State, exactly as your harness shows them, the harness name and the model identifier. If the harness is not Claude Code, stop now and report FOUNDER_DECISION_REQUIRED.

AUTHORITY
One act governs this work: FOUNDER-ACT-20261013-TESTS-4-6-RULING, docs/decisions/DEC-20261013-03-tests-4-6-ruling.md on origin/main, SHA-256 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7. Read it in full first, especially A3, B4, B7 and Part D. Then read the root-cause report it files, docs/verification/2026-10-13-tests-4-6-root-cause-ubuntu.md, SHA-256 f9949b42f66450794d8a258704c6434ea572124d61ea06452e7c97a6f62868e0, section 4 on test 4, and spec §1.5 with its row 4. The act decides what you may do. This prompt only tells you how to work. If they disagree, the act wins and you report the disagreement. Read AGENTS.md as well. This host is Linux: use sha256sum, name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256.

WHAT IS ALREADY KNOWN (from the report; do not re-argue it, use it)
- Test 4 is "governed-child environment forwarding: exact key-set equality with the launch-frame env, ambient canary absent (C7 evidence 7)" in packages/broker/test/pty-host-supervisor.test.ts. Its fixture is launched through HostLaunchDescriptor.path as an absolute executable whose SHA-256 the test computes, with argv from the test, and its standard output is the Bun.Terminal PTY. The test reads the marker @@MADV_ENVKEYS key1,key2,...,@@ from the output facts.
- On this PC /usr/bin/awk is mawk 1.3.4 20260129. When its standard output is a terminal it reads every file as lines whatever RS is, so /proc/self/environ stops at the first NUL. split() inside the record, getline from the file, and -W posix and -W traditional did not avoid it; -W noninteractive and -W binary are rejected.
- With the macOS ENVIRON oracle on Linux, test 4 passed on this PC. The test's own comment records that ENVIRON gains keys under gawk and that a shell adds keys of its own, which is why Linux reads /proc/self/environ.

WHAT THE ORACLE MUST DO (act B7)
1. Start no shell, directly or indirectly.
2. Emit key names only and never a value, in the marker format the test already parses.
3. Give the correct key set when its standard output is a terminal.
4. Run as one absolute executable path with argv, as HostLaunchDescriptor requires, and keep the fixture alive long enough for the test to read its output, as the current fixture does.
You may propose a different executable or a different program for /usr/bin/awk. You keep every assertion and every timeout of test 4 unchanged, and you change nothing in the test outside the fixture's executable and argv. If no oracle meets all four, say so; that is a valid result.

RUNTIME (act B4)
Run every test with the custodied binary at /home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun, by its full path, after confirming its SHA-256 is 0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb and that it prints the revision 69cb78c9097cebd3bdb832d9fff8b7d23abce09e for -e 'process.stdout.write(Bun.revision)'. Do not copy it, put it on the system PATH or change it. Run bun install --frozen-lockfile with the Bun on PATH; it must leave bun.lock byte-identical, with the mode restore of packages/founder-act/src/main.ts to 100644 allowed and reported.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. HEAD equals origin/main, the tree is clean, and HEAD is detached. Report the SHA.
2. On origin/main: DEC-20261013-03 and the root-cause report have the SHA-256 values above, and packages/broker/test/pty-host-supervisor.test.ts has SHA-256 dc284625464eac90b16161b6c204a2e68f03b7a7133de0296cf569b16fde4a9b. If any differs, stop.
3. Spec §1.5 row 4 on origin/main names /usr/bin/awk iterating ENVIRON for macOS and /usr/bin/awk reading /proc/self/environ for Linux.
4. The custodied binary's identity matches the RUNTIME section.
5. gh api user --jq .login prints daley40-lab. Do not run gh auth status, and never print a token or any part of one. On any 401, stop and report. You need GitHub only for git fetch.

METHOD
1. Reproduce: run test 4 alone once with the custodied binary and record the failure verbatim.
2. Explore candidates. For each one, record what you tried and the result, including the ones that fail. You may add temporary diagnostics and scratch files, inside the clone or under a directory you create below /home/michaeldaley/test4-oracle-work, and you revert or remove every one of them before you finish. Probe executables directly and under a pseudo-terminal, for example with script -qec, to see both cases.
3. For each candidate, establish from evidence on this PC: whether it starts a shell; whether its output can contain any value; and the exact key set it reports for a controlled environment, with standard output both a terminal and not a terminal. Use only fixed test variables of your own for this; never print a real environment value.
4. For the oracle you propose: apply it temporarily to test 4 and run test 4 alone three times with the custodied binary. Then show that the test can still fail for the reason it exists: with the oracle in place, temporarily add one extra key to the environment the launch frame passes to the child, and show test 4 fails on the key set; then revert that mutation. Then run the whole of packages/broker/test/pty-host-supervisor.test.ts once with the custodied binary.
5. State which /usr/bin/awk variants, or other executables, your evidence covers, and what you could not verify without installing software, such as gawk or busybox awk, or macOS.
6. Write the proposed change as a unified diff against origin/main, touching only packages/broker/test/pty-host-supervisor.test.ts, and write the exact replacement text of spec §1.5 row 4 as a second short file. Save both, and the full report, under /home/michaeldaley/test4-oracle-report/, outside the clone, with the SHA-256 of each file. Then restore the clone so that git status --porcelain is empty and HEAD is the commit of precondition 1.

DO NOT
- Install, upgrade or remove any package, or change any host setting, system PATH or shell profile.
- Commit, branch, push, open a pull request, or post any comment.
- Change any assertion or timeout of test 4, any other test, production code, bun.lock, a workflow, the spec, the plan or any decision record. Your proposals live only in the report directory.
- Run a provider executable, read files under ~/.secrets, ~/.ssh or ~/.config/madventures, print any environment variable's value, or run a command that lists processes.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, your harness is not Claude Code, a precondition fails, the custodied binary's identity differs, bun install changes the tree beyond the mode restore, you would need to do anything DO NOT forbids, or gh returns 401. A result of "no oracle meets all four requirements" is a normal outcome, not a stop: report it with the evidence.

FINAL REPORT (in this order)
1. Harness and model, as your harness shows them.
2. Preconditions, each result with full SHAs and hashes, and the host from uname -s.
3. Reproduction: the failure verbatim.
4. Candidates: each one tried, with its evidence for the four requirements.
5. The proposal: the oracle, why it meets each requirement, the three runs of test 4, the mutation run and its failure, and the full-file run.
6. Coverage: which awk variants or executables the evidence covers, and what is unverified.
7. The files in /home/michaeldaley/test4-oracle-report/, each with its SHA-256, including the diff and the row 4 text.
8. Diagnostics added and reverted, the final git status --porcelain, and HEAD.
9. Executed versus only read.
10. Deviations, or the word none.
11. The single next decision for the Founder: the later act that amends spec §1.5 row 4 and ratifies the change.
