ADDENDUM 2 TO THE TASK 24 CORRECTION BUILDER PROMPT: a relaunched session. Paste this as the third message of a new Codex CLI session on the Founder's MacBook, after the builder prompt and addendum 1, only if the session that ran D1 has closed. It is signed by the Founder and is part of the builder prompt.

You continue the work of an earlier Codex session with the same Actor-Id, session:codex/m10-task24-r2, which closed after it stopped at D3. I rule as follows.

1. Your identity report. Make it as the builder prompt says, with one change: the tree is not clean. HEAD must be c201cde18077b789b8aefe7c5f88db61d44649e5 on build/m10-task24-r1, and git diff must hash to the SHA-256 of /Users/michaeldaley/m10-task24-r2-pr/candidate.patch, 03a2ec2951e6e7f44acad542229db753f447e7c49763700976c8aefb26328154, covering exactly packages/broker/src/runtime-broker.ts, packages/broker/test/publish-legality.test.ts, packages/ledger/src/ledger.ts, packages/supervisor/src/build.ts and packages/supervisor/test/build.test.ts, with no untracked file. If any of this differs, stop.
2. Preconditions. Make preconditions 1, 2, 4 and 5 of the builder prompt. In place of precondition 3, confirm from the uncommitted diff that it holds exactly the work of DEC-20261023-01 C1 to C3 and nothing else, and quote what you rely on.
3. Carried forward. The earlier session's D1, RED runs and D2 breaks stand, as its logs under /Users/michaeldaley/m10-task24-r2-pr/logs/ record them. Read only those logs and the candidate.patch file in that folder; read no memory, transcript or notes of that or any other session. Report each log's file name and SHA-256 and quote its summary lines. Do not rerun D1, the RED runs or the breaks.
4. Then carry out addendum 1 from its item 2, in order, including the restart of D3.
5. Under Deviations, record the relaunch, this addendum by its SHA-256, and the logs you carried forward with their SHA-256 values.

Everything else in the builder prompt and addendum 1 is unchanged.
