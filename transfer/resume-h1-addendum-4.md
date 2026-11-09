RESUME UNDER ADDENDUM 4 TO DEC-20261108-03: a message from the Founder to the H1 builder session, session:codex/h1-r1.

1. First run shasum -a 256 prompt/DEC-20261108-03-addendum-4-sandbox-halt.md, log it as 095, and check it against prompt/SHA256.txt and against e817470aea6be2c176d4ae75856fd793ef982bd28c9eb793df9c9038a5c1dfbc. Read that addendum in full. If either value differs, stop and report.
2. Then check, each logged: codex --version still prints codex-cli 0.167.0; git -C tui rev-parse HEAD is 8e5b471aed5330dd1b620f2a040540871b6fd047 on build/h1-r1 and the tree is clean; pr/unfinished-item8.patch has SHA-256 78a8afc0a52f4230d91e1436b384b0d5e87923058d3138b6ca1a676ddad663d6; and the runtime check of THE TEST RUNTIME passes. Any difference is a stop.
3. Resume as Addendum 4 B5 says, from item 8 of THE WORK, continuing your log numbering. Under its B3, run every remaining command that runs Bun escalated from its first run, asking my approval for that command alone. Under its B2, if the item 8 change you commit is the change in pr/unfinished-item8.patch unchanged, log 090 is item 8's break run; if it differs, make and run a new break of it. Under its B4, where your harness's instructions and the acts differ, stop and report.
4. Everything else is as the fourth-session builder prompt says: THE TOOLS YOU CALL, the halts as Addendum 4 B1 reads DEC-20261108-03 B9 item 5, the gates in the order of Addendum 1, the build log, which also records Addendum 4 A1 to A3 and the two retries, the deliverables, and the final report.
5. pr/ already holds h1-halt-report.md, h1-halt-log-manifest.sha256 and unfinished-item8.patch. Leave them unchanged; they are not deliverables. Write pr-title.txt and pr-body.md beside them.

Signed: Michael Daley, 2026-11-09
