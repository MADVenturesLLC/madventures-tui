ADDENDUM 4 TO THE STABILIZATION BUILDER PROMPT: diagnosis of the preflight timeout. Paste this into the Codex session that stopped at D3 under addendum 3. It is signed by the Founder and is part of the builder prompt.

Your stop was correct, and D3 stays stopped. I rule as follows.

1. The facts. Under addendum 3 you established branch 3(b), fixed the host-channel assertion within build-rollback.test.ts, and ran all ten breaks as required. The uncommitted candidate has SHA-256 e9a189c784e54cedaf57a41a19a01ad093c7be0cab7fd0d1af684fbcb94309e8. In the restarted D3, the third run of packages/supervisor/test/preflight.test.ts failed the test "fixture preflight keeps pair policy and registration overrides local to each call" at line 202, with Expected true, Received false, and a timeout after 5000 ms. Neither commit nor the candidate changes that test.
2. Diagnosis only. Establish, with evidence you quote, why that run failed. You may:
   a. read the logs under /Users/michaeldaley/builds/stabilization-r1-pr/logs/, including the uptime before that run and the durations Bun printed for this test in every earlier run that included it, at D1, in the first D3 and in this D3;
   b. read the code that test and preflight run, and report what f.run() returned at line 202 if any log shows it;
   c. run that single test, with -t and its exact name, at most three times in a scratch copy of the clone outside the repository, recording uptime before each run and the test's printed duration, and, if useful, with diagnostic output added in the scratch copy only.
   Runs under c. are diagnostics, not D3: they are never counted toward D3 and are not reruns to obtain a pass under DEC-20261023-01 B5. Name every log so that no existing log is overwritten.
3. No fix. Change nothing in the clone. Keep the candidate uncommitted and unchanged, and confirm its SHA-256 at the end. Do not restart D3.
4. Report. Say whether the cause lies in the host's load, in the test, in production code, or in either commit or the candidate, with the evidence for it, and if it lies in the test, what the smallest change would be and which ruling would have to authorize it. Then stop and report FOUNDER_DECISION_REQUIRED.
5. Record. Under Deviations, record this stop and this addendum by its SHA-256.

Everything else in the builder prompt and addenda 1 to 3 is unchanged.
