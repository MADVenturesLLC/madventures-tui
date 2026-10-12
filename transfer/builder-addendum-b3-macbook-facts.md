ADDENDUM 1 to the root-cause build prompt (SHA-256 73968656437cd8698affd3728b4ff3702577566e928f1501d27e31e5f32ef1a4). The Founder sends this as the second message of this session. It adds observed facts only. It changes no rule, scope limit, stop condition or report item of the prompt or of DEC-20261012-03, and it does not authorize reading, running or changing anything more.

WHAT WAS OBSERVED ON THE MACBOOK
Under DEC-20261012-03 B4, the Founder ran the MacBook check on 2026-10-12. Its report is on the MacBook only, at /Users/michaeldaley/macbook-b4-evidence/report/2026-10-12-tests-4-6-check-macbook.md, file SHA-256 81ce3600135ed0ecc2db5ea02ca11952c1ae37d63948db1b57e795026fcd5768, internal Report SHA-256 b398bb8caccbb9f869e96c188bfee92790cd54cf0e042c8a7405799a8ed80b45. You cannot read it, and you do not need to. It records:
- Candidate: 03dda124e9d6faa59abda6a3817410bcdf1765f8, a fresh clone, frozen install, clean tree at the end.
- Host: macOS 27.0.1 (build 26A434), arm64, kernel 27.0.0, TERM xterm-256color, standard input a terminal.
- Bun: /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99 (the official release, the same revision as the stock Bun on this PC; the binary differs because it is the macOS arm64 build). node: v26.5.1.
- Tests 4, 5 and 6, each run alone three times: all nine runs passed. Durations: test 4 about 21 to 27 ms, test 5 about 28 ms, test 6 about 27 ms.

HOW TO USE IT
Treat these as facts about a different host and operating system, not as evidence about this PC. They do not establish the cause of any failure here, and they do not tell you what any test should do on Linux. Record in your final report, for each test, whether your evidence on this PC agrees with, differs from, or is unrelated to these facts. Report item 5 (the pull request 40304 answer) must rest on your own evidence from this PC and the pull request's diff.
