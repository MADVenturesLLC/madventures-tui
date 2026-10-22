ADDENDUM 1 TO THE TASK 24 BUILDER PROMPT: the existing test suites. Paste this into the Codex session that stopped at its D1 baseline. It is signed by the Founder and is part of the builder prompt.

Your stop was correct: the prompt's limits, read literally, conflict with D1 and D3. I rule as follows.

1. Scope of the limits. The limits in DO NOT on executables and on process listing govern the commands you run yourself and the tests you write. They do not forbid running the repository's existing test suites, which D1 and D3 of DEC-20261022-01 require.
2. Existing tests. You run bun test packages/broker and bare bun test exactly as D1 and D3 say, including whatever the existing tests start or run, such as /bin/cat in packages/broker/test/pty-host-supervisor.test.ts and the PID-scoped ps -p call in test/phase0/parent-death.test.ts. You do not change, skip or filter any existing test to avoid them.
3. Your own commands and tests. You run no process-listing command yourself, and every executable a test you write starts is a fixture under a disposable mkdtemp root that emits only synthetic values, as the prompt says.
4. Output. If any test's output would print the value of an environment variable, a token, a credential or a key, stop and report without repeating the value.
5. Precondition 5. Ask me the one-line host question now and record my answer before D1.
6. Then continue from D1. Under Deviations, record this addendum by its SHA-256, the two tests you named, and the four lookups of nonexistent files.

Everything else in the builder prompt is unchanged.
