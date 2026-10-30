ADDENDUM 11 TO THE M23-M24 BUILDER PROMPT: the test you did not write. Paste this into the Codex session session:codex/m23-m24-r4. It is signed by the Founder and is part of the builder prompt, with Addenda 1 to 10.

Your question was right to ask. I rule as follows.

1. The facts as you reported them. A test at line 86 of test/phase3a/adversarial/process-group.test.ts appeared in the working tree while this session was halted, and this session did not write it. Syncthing does not touch /Users/michaeldaley/builds. Its source is not established.
2. Exclude it. Before any other step:
   a. Report the test's name, its full hunk from git diff, and the modification time of the file from stat.
   b. Save that hunk as /Users/michaeldaley/builds/m23-m24-r1-pr/logs/r4-foreign-test-hunk.patch and report its SHA-256.
   c. Remove exactly that hunk, and nothing else, from the working tree.
   d. For every other changed hunk in the working tree, say whether this session wrote it, from your own records and logs. If any hunk cannot be traced to this session, stop and report it; do not remove it.
3. Addendum 10, item 2a, then applies as written: if your own work holds no lifeline-EOF test with a group member that only a group signal clears, write one yourself. For that test a RED run is not required, because Addendum 10 rules that it need not fail when only killGroup changes; record that.
4. The tree has changed since your final gates began, so run the final gates of DEC-20261028-02 B7 again from the start, in full and in order, under Addendum 9, item 5. Then items 10 to 13 of Addendum 9.
5. Record. Under Deviations, in the build log's Correction round 2 section, and in pr-body-r3.md: that a test of unknown source appeared in the working tree while the session was halted; its name; the saved hunk by its SHA-256; that it was removed and is in no commit; your item 2d result; and this addendum by its SHA-256.

Everything else in the builder prompt and Addenda 1 to 10 is unchanged.
