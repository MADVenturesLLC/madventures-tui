ADDENDUM 3 TO THE TASK 24 BUILDER PROMPT: the fixture cast at D3. Paste this into the Codex session that stopped at D3's typecheck. It is signed by the Founder and is part of the builder prompt, as addenda 1 and 2 are.

Your stop was correct. I rule as follows.

1. The facts. At D3, bunx tsc --noEmit exited 2 with TS2352 at packages/broker/test/publish-legality.test.ts line 249, where a deliberately malformed fixture is cast directly to BridgeEventV1. No commit exists. The four C1 paths are the only changed paths.
2. The correction. At that line only, change the direct cast to candidate as unknown as BridgeEventV1, the form packages/broker/test/command-legality.test.ts already uses for malformed fixtures. Change nothing else in any file. The fixture's value, the test's name and its assertions stay as they are.
3. D2 stands. A type assertion is erased at run time, so the RED run and the thirteen breaks are not rerun. Record the file's SHA-256 before and after the correction.
4. D3 restarts from its first item, in its order: bunx tsc --noEmit must exit 0 with no error; then publish-legality.test.ts with exactly 19 passing; bun test packages/broker with 0 fail; then bare bun test under addendum 2 item 3, with its uptime gate, run once, where any failure or error is a stop; git diff --check; and the changed-path list. If tsc reports any error after this correction, stop: do not fix it.
5. pr-body.md is plain readable text. It carries no compressed, encoded or packed content. For D1 and D3 it gives the commands, the uptime readings, and the verbatim summary and failure lines of each run; the full transcripts go in your final report. For the test label you withheld under addendum 1, give its file and line and why you withheld it, without its text.
6. Then commit, finish DELIVERABLES and rerun both attribution-shape-check modes; pr mode must examine the Task 24 commit. Under Deviations, record this addendum by its SHA-256, the TS2352 error verbatim, and both SHA-256 values of item 3.

Everything else in the builder prompt and addenda 1 and 2 is unchanged.
