ADDENDUM 1 TO THE TASK 49 BUILDER PROMPT: the rollback break filter. Paste this into the Codex session that stopped at D3. It is signed by the Founder and is part of the builder prompt.

Your stop was correct. I rule as follows.

1. The facts. D1 passed. The RED run and the echo and resize breaks stand as you recorded them. The run of the third break used a -t filter whose parentheses bun test reads as regular-expression syntax, so it selected no test. That run tested nothing: it is not a break result and not a rerun to obtain a pass under DEC-20261023-01 B5. Its log stands and is recorded.
2. The third break again. Make the same break: the termination of one recorded process skipped on rollback. Show git diff before the run. Run bun test test/phase3a/harness-rollback.test.ts, the whole file with no -t filter, logged under a name that overwrites no existing log. Quote the summary lines and the assertion of every failing test. If the run reports fewer than twelve tests, or every test passes, stop. Restore the file and confirm its SHA-256 equals the value before the break.
3. Every -t filter. In any later run that uses -t, escape every regular-expression metacharacter of the test name, and confirm from the summary that the run reports the number of tests you meant to select. A run that reports zero tests is a failed check.
4. Then D4 of the builder prompt, from its first item, in full.
5. Record. Under Deviations, record this stop, this addendum by its SHA-256, the log of the run that selected no test, and the break of item 2 with its log's SHA-256. Then make the FINAL REPORT.

Everything else in the builder prompt is unchanged.
