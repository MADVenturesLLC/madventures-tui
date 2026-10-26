ADDENDUM 3 TO THE STABILIZATION BUILDER PROMPT: the host-channel break. Paste this into the Codex session that stopped under addendum 2 item 5. It is signed by the Founder and is part of the builder prompt.

Your stop was correct. I rule as follows.

1. The facts. Under addendum 2 you found that the old descriptor count covered one ledger descriptor from ledger_open onward and three stdio channels per host from hosts onward, reworked only packages/supervisor/test/build-rollback.test.ts, uncommitted, to SHA-256 7a9a2d0aea615cfd0ee211364b8e651b1f8cab30c6d8e88e8a4ccef3ec4cc876, and ran three breaks that failed as intended. Your first break that retains a host channel left "rollback after step hosts leaves no partial session" passing, and you restored it. Whether that break kept the channel open or the assertion missed it is not established.
2. Diagnosis, bounded. Make that break again exactly as before. With it in place, and with the same descriptor probe you used under addendum 2, scoped to the test process's own descriptors, in a scratch copy outside the clone, record whether the retained channel is still open after rollback at the point the reworked assertion runs. Quote the evidence. Then restore the break and confirm the file's SHA-256.
3. What follows.
   a. If the channel was not open after rollback, the break did not test the assertion. Design one break that does keep a host channel open after rollback, show with the same probe that it does, and run it. It must fail the reworked test.
   b. If the channel was open and the assertion still passed, the assertion misses it. Under DEC-20261023-01 B4, fix the assertion within build-rollback.test.ts only, so that it checks that channel, then run the break again. It must fail.
   c. If neither can be established, or the fix of b. would touch any other path, raise any timeout, or weaken any other assertion, stop and report.
4. Then finish addendum 2 from item 5: every remaining break, one for each resource the reworked assertions check, including at least one host channel for each of the per-step test and the error-path test, then the full restart of D3, the commit and the saved files of its items 6 and 7.
5. Logs. Name every new log so that no existing log is overwritten.
6. Record. Under Deviations, record this stop, this addendum by its SHA-256, the evidence of item 2 and which branch of item 3 applied, and any fix under B4.

Everything else in the builder prompt and addenda 1 and 2 is unchanged.
