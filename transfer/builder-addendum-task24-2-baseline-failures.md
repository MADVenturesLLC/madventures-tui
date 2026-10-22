ADDENDUM 2 TO THE TASK 24 BUILDER PROMPT: the two baseline failures. Paste this into the Codex session that stopped at its D1 baseline. It is signed by the Founder and is part of the builder prompt, as addendum 1 is.

Your stop was correct. I rule as follows.

1. The facts. At D1, on the unchanged binding base, with load averages near 2.1 to 2.5, bare bun test failed exactly two tests, both outside the paths of DEC-20261022-01 C1: "doctor: read-only invariant > no files created in cwd" in apps/madbridge/test/doctor.test.ts, by its 5000 ms test timeout; and "cleanup budget exhaustion fails closed" in packages/supervisor/test/attestation.test.ts, on its elapsed-time bound of less than 1150 ms, measured at 1290 ms. bun test packages/broker passed 271 of 271. Neither test is Task 24's to change.
2. D1. The act's D1 requires the baseline runs and their verbatim record; the stop on a failed baseline test comes from this prompt. For these two failures only, on exactly those causes, that stop is lifted: they are recorded verbatim as the baseline. D1 is not rerun.
3. D3 is unchanged. Under DEC-20261022-01 B10 no known-failure set and no timing exception applies on the MacBook, and D3 requires bare bun test to show 0 fail. Nothing in this addendum relaxes that. Before D3's bare bun test, run uptime; if its first load average is 2.0 or more, ask me in one line to quiet the host, wait for my answer, and run uptime again. Then run bare bun test once, in the foreground. Any failure or error in it, including either of these two tests, is a stop. Do not rerun it, run either file alone to excuse it, or treat it as a flake.
4. You change, skip or filter neither test, and no file outside C1.
5. The addendum 1 hash. The signed text of addendum 1 has SHA-256 e1001f673ec2ac317383125c72dae0ed0a36c1c6b11f8941a5b4e5be67425a11, at transfer commit 204588b803f094af2af7a295715144bc3660eb84. Your b29e536e value is the same text without its final newline. Record the signed value under Deviations, with yours beside it.
6. Then continue with the RED run and the rest of THE WORK. Your saved pr-body.md is a stop report; replace it with the description DELIVERABLES requires. Under Deviations, record this addendum by its SHA-256, both baseline failures, and the uptime readings before D3's bare bun test.

Everything else in the builder prompt and addendum 1 is unchanged.
