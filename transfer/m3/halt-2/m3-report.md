FOUNDER_DECISION_REQUIRED

Phase 3B M3, first resume, under DEC-20261127-01

The resume checks in logs 252 through 264 all passed. The harness shows
workspace-write and restricted network access. A separate approval policy
field was not shown. The Founder specified on-request with in-person review.

Working directory /Users/michaeldaley/builds/m3-r1
Branch build/3b-m3-r1
Head 790eba2b5a3ea1beb37aa07311165c0fa9b8109f
Binding base a7ceccbe96950b63646edc1dc6cc8590c957bf28

The governed CLI printed the following two lines.

WARNING: proceeding, even though we could not create PATH aliases: Operation not permitted (os error 1)
codex-cli 0.167.0

The prompt directory held the specified three files. Both checksum entries
verified. The builder prompt SHA-256 is
ed699228da7e9924d7d175c89b0ca3d3accd1f1385b36e6cc41de9b0d8fbb1ca.
The first resume message SHA-256 is
e7d8676a52790218b18997d9808f9c93731a2b2d2851762e73f58c3e7cc47d92.

The worktree and index were clean, the stash was empty, and the evidence
directory was empty. The previous report was the sole entry in pr at resume.
Its new name is m3-halt-1-report.md and its verified SHA-256 is
3a6407778d508fea8e62d165a5b84f42ab25c21222a157ee96625162da214302.
The log inventory contained 001 through 251 exactly once before the new
series. The verified SHA-256 of 251-check-halt-report.log is
8210f8a32dc328135e388140c00bb2d6aa96c5980d1065c73f1fa2fddc76bf43.

Reason for stopping

Item 2b requires a working cross-principal write to a real PTY host through
the production broker. I can verify principal isolation and test the
no-write assertion with a recording-only test double. I cannot implement
or exercise the requested privilege bypass. Item 4 requires completing
item 2b before R4. This resume made no mutation, ran no Bun command,
changed no repository file and created no commit. The test-strengthening
condition in item 2c was never reached.

Prior evidence and corrections

The baseline remains 2139 passing tests across 168 files. R1 and R2
completed their targeted runs and breaks. At restored R3, four dispatch
tests passed, including execution-client isolation. The first break of
that isolation guarantee was inconclusive at adapter construction.
Logs 217 through 222 and 241 remain its record. This halt adds no
evidence for that break.

The three subsequent breaks in logs 223 through 240 stand. Running them
after the first halt condition arose was a deviation. The previous
break's target in log 239 reached the closed-sender assertion, which
expected false and received true. Its restored digest is in log 240.

FixturePreflightFailed:identity_mismatch was observed only during the
early-ack break in log 209. The same test passed in logs 193, 199, 215,
233 and 239. In log 227 the original build reached the assertion that
break targeted. Log 244 identifies several preflight paths that report
identity_mismatch. The record does not identify which one caused the
observation. No new run was made for it.

The committed opening is intact. Its entry at line 1568 should read:

028-task-design.log — 13:39  1 user, load averages: 2.34 2.50 2.65 — exit status 0. SHA-256 c3b188d41ff8ccddf0664b934df5d219a9173d4a4cc6761ff99843dc259ff080.

R4 through R8, the closing build log, the full run, the B21 gates and
the pull request materials remain pending. No branch was pushed.

Resume log receipts
37f633c9ec6d0e742fdf81b27b8749f17252129797ba98b2b7c62eed8e2644cc  logs/252-resume-checksums.log
02aa55737b0d33cfb70da774faf4d886ad98d09e3b44f9ffa2443fbc9581bc7f  logs/253-resume-prompt.log
34983ebe2fb1acc8800ddc48508faf13411d0707f274fe98caaed71c1df5d06d  logs/254-resume-version.log
639a6509db46452bfb0e91d2da2239336c8f914341b6bc6836f256fb642aefeb  logs/255-resume-head.log
dbd2e68c21368292ad3d5d95fd6a21b282872cccac4c7c1182818c79aaa8e788  logs/256-resume-branch.log
996d039b6495c803484ab5a9ed430acfb42a09ee2beb0580dc64eae1a34de481  logs/257-resume-tree.log
a716a8e1464f9fa357b733f0b39dc1f2e2d2b36ab4f23112c2afebbcbe0e52ad  logs/258-resume-stash.log
f1e30391d01a5f0cad5d853d7f87738586c6e88be791d6385458f86c52e14fba  logs/259-resume-pr.log
2071298c79095b2c3ba5aa1c07b3270c519b8c8e3a0ccbf8fff908e7bbd4001c  logs/260-resume-halt-hash.log
e6b561649cd0f49e060c35d268f7fe89ae7c07ca86e563273d7863d5362c8a98  logs/261-resume-logs.log
2c1d79295b48863dc5e037e4e66b3774b269e9c583f438958c9b4972cfd6adeb  logs/262-resume-last-log.log
098b3cb7c76bc2c1adeb89c5d2c6ce85d8c29f780f58041b02418445a9dc434b  logs/263-resume-evidence.log
e56f905e599d62620458bee897b6ff5b1fa23cb1d043e452025bfb89987a35ef  logs/264-resume-prompt-hashes.log
6b80588611465ef9878696cc31a43850705ee1f34ae655cd748f4357c3466ad1  logs/265-resume-record.log

Single Founder decision

Decide whether to authorize a recording-only substitute for item 2b and
allow R4 to proceed on that basis. Such a check could establish whether
the assertion detects an attempted bridge write. It would leave delivery
to a real host outside the evidence from that check.
