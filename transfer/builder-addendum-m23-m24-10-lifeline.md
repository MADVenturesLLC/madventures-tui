ADDENDUM 10 TO THE M23-M24 BUILDER PROMPT: the lifeline mutation. Paste this into the Codex session session:codex/m23-m24-r4, which halted at Addendum 9, item 8. It is signed by the Founder and is part of the builder prompt, with Addenda 1 to 9.

Your halt was correct. I rule as follows.

1. The facts as you reported them. With killGroup in packages/pty-host/src/signals.ts changed to signal the process instead of the group, deliberate lifeline EOF terminates that child's process group only still passed, and the file restored to SHA-256 c5d2814420dc7d431a28cb7ef03229304daf5896bd50e9630268ba3d637fa90e. The second review, which you cannot read, reported that production reaches the lifeline-EOF group by more than one path, so that a change to killGroup alone is masked, and that packages/pty-host/test/signals.test.ts failed only when the lifeline-EOF path in packages/pty-host/src/main.ts was changed as well.
2. The reading. The finding of Addendum 9, item 6d, is advisory. A scenario test that runs the whole stack cannot be required to fail for a change that another production path covers, and production does not change for this finding. So:
   a. Item 7d is met by a lifeline-EOF scenario with a governed group member that outlives the child's own death unless the group is signalled, and a test that asserts that member is gone within the bound. Keep that test if you have made it; make it if you have not. It need not fail when only killGroup is changed.
   b. Item 8 no longer requires the killGroup check. Before you go on, report in one paragraph whether the lifeline-EOF scenario reaches killGroup at all, citing file and line, and which other production paths terminate the group there. Read code only for this; do not change production, and run no extra mutation.
3. Then continue item 8 from the colliding redacted keys, and then items 9 to 13, as Addendum 9 says.
4. Record. Under Deviations, in the build log's Correction round 2 section, and under Limitations in pr-body-r3.md: this halt, the failed check's log and its SHA-256, your paragraph of item 2b, that the lifeline-EOF group is covered by redundant production paths, and this addendum by its SHA-256.

Everything else in the builder prompt and Addenda 1 to 9 is unchanged.
