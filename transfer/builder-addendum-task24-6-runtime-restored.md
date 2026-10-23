ADDENDUM 6 TO THE TASK 24 BUILDER PROMPT: the runtime. Paste this into the Codex session that stopped at its runtime check before D1. It is signed by the Founder and is part of the builder prompt, as addenda 1 to 5 are.

Your stop was correct. I rule as follows.

1. The facts. After items 2 to 4 of addendum 4, the branch is at 942c225bb3d4c772ad68c9cac2a7d494655758b9 with a clean tree, and the four candidate files are in stash 91f0985ed0b5a7ff8328b426523b4091f6e8054c. Your runtime check then found /Users/michaeldaley/.bun/bin/bun at version 1.4.4, not the certification runtime.
2. The restore. Before pasting this addendum, I replace /Users/michaeldaley/.bun/bin/bun with the binary from the official Bun 1.4.2 release for macOS on arm64, after checking that its SHA-256 is 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. You install, upgrade, remove or change nothing on the host.
3. The check. Run the runtime check of THE TEST RUNTIME again, in full, and also report ls -l of /Users/michaeldaley/.bun/bin/bunx, which must be a symbolic link to bun. If any value differs from the builder prompt, stop.
4. A second check. Run the same runtime check again immediately before D3's bare bun test, and record it. If it differs then, stop; do not use any result obtained under another runtime.
5. Then continue with addendum 4 from item 5, in order: the host question, D1 on the new base, the restore of the stash, and the rest.
6. Under Deviations, record the version 1.4.4 finding verbatim, both runtime checks of this addendum, and this addendum by its SHA-256.

Everything else in the builder prompt and addenda 1 to 5 is unchanged.
