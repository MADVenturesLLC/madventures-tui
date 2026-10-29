ADDENDUM 7 TO THE M23-M24 BUILDER PROMPT: what Addendum 6, item 4, restricts. Paste this into the Codex session session:codex/m23-m24-r2, which halted before Task 54. It is signed by the Founder and is part of the builder prompt, with Addenda 1 to 6.

Your halt was correct; the sentence was mine and was unclear. I rule as follows.

1. Addendum 6, item 4, says where the liveness correction lands: in Task 53's commit, and in no separate correction commit. Its words "that commit is the only one to touch these files again" restrict the liveness helpers it corrected, not the files that hold them. They do not take any path out of DEC-20261028-02 B3.
2. Your second reading is right, and it reaches the harness too. Task 54, Task 55 and the final gates may change test/phase3a/runtime-harness.ts, and any other path of B3, as their plan steps and DEC-20261028-02 require. That includes the four fault switches of Task 54, Step 3. No later commit changes the corrected liveness helpers, unless a later task's plan step requires it; if one does, record it under Deviations with the reason.
3. Continue with Task 54 from Step 1, as the prompt and its addenda say, and then Task 55 and the final gates.
4. Record this halt and this addendum, by its SHA-256, under Deviations and in Task 54's section of the build log.

Everything else in the builder prompt and Addenda 1 to 6 is unchanged.
