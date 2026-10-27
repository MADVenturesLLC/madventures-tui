ADDENDUM 2 TO THE M22 CORRECTIONS BUILDER PROMPT: the diagnostic copy. Paste this into the Codex session that stopped under addendum 1. It is signed by the Founder and is part of the builder prompt.

Your stop was correct. I rule as follows.

1. The facts. Under addendum 1 item 3, the first diagnostic failed against the code of commit 609178b84a35583ac86cae72376cd030a89eed0f, log SHA-256 cee89c25b540be5f1006d432c62851f8033d18cf4a7d9efdaceec99b111f769f. The second also failed, log SHA-256 785fc693142dccb576b8e4ca702014f3d179b80ce97f3581104e9ee349631a09, and you report that it ran against that same code, because a cp with a relative source path copied the scratch file onto itself. Both logs stand and are recorded.
2. Proof before any run. Report, with output you quote, the SHA-256 of packages/broker/src/runtime-broker.ts in three places: in the clone, which must be e4e7354365cf6b5b7dad56f5035370bf86cfea83896678e9547c63701afbe44f; in the scratch copy as it is now; and at commit 609178b84a35583ac86cae72376cd030a89eed0f, from git show. If the scratch file does not equal the file at that commit, or the clone's file differs from the value above, stop.
3. The copy. Copy the clone's runtime-broker.ts into the scratch copy using absolute paths for both source and destination, and show that the scratch file's SHA-256 now equals e4e7354365cf6b5b7dad56f5035370bf86cfea83896678e9547c63701afbe44f. Change nothing else in the scratch copy.
4. The run. Quote the whole diagnostic test as it stands in the scratch copy, and confirm that it asserts both the result of addendum 1 item 2 and that the session is interrupted. Then run it once, logged under a name that overwrites no existing log, and quote it verbatim. This run counts toward no D step; it is not a rerun to obtain a pass under DEC-20261023-01 B5, because the cause of the second run's failure is established by item 2. If it fails, stop and report; do not change the clone or the scratch copy.
5. Then continue addendum 1 from the deletion of the scratch copy in its item 3, through its items 4 to 10. Your answer under its item 5 is recorded.
6. Record. Under Deviations, record this stop, this addendum by its SHA-256, the copy error, all three diagnostic logs by their SHA-256, and the hashes of item 2.

Everything else in the builder prompt and addendum 1 is unchanged.
