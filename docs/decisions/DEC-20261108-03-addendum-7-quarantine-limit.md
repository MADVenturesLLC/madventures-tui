FOUNDER-ACT-20261108-PHASE-3B-H1 ADDENDUM 7: the time limit of the Task 33 quarantine test, and H1's sixth session

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** `DEC-20261108-03` B5, B8 item 2 and B10, and Addendum 6 B2, as read below
> **Read with:** `DEC-20261108-03` B7 to B10, B12 and B13; its Addenda 1 to 6; `DEC-20261103-01` B4; `DEC-20261023-01` Part B

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The pull request.** After the check of Addendum 6 B2 passed, my push command pushed `build/h1-r1` at `d09712a67db06fc6a7cee9bf0674ac8b509a8200` and opened draft pull request 234.

A2. **The failure.** In CI run 42755240268 at that head, Verify and code-review passed. Verify (macOS), job 129627989916, runs bare `bun test` twice. Its first run ended with 1914 pass and 0 fail. Its second run, with `TZ=America/New_York`, ended with 1913 pass and 1 fail: the test "quarantined modules admit only their sanctioned importers: mcp-server one edge, pty-manager none, both mcp-config none" of `test/phase3a/architecture-phase3a.test.ts` timed out after 5000 ms, at 5733.78 ms. My guarded command re-ran that failed job once, as job 129811131251. Its first run again ended with 1914 pass and 0 fail, and its second run failed the same test the same way, at 6487.24 ms.

A3. **The timings.** That test runs under Bun's default limit of 5000 ms, and it reads and parses every TypeScript file under `packages/`, `apps/` and `test/` six times. In five earlier Verify (macOS) jobs, 127387873966, 127725764890, 128816115697, 128960557350 and 129176457679, it ran four times each and took from 1050 to 3991 ms; in their second runs, from 1847 to 3342 ms. In H1's two jobs it took 3047.76 and 2061.53 ms in the first run, and 5733.78 and 6487.24 ms in the second. Both of H1's jobs, and four of the five earlier ones, ran on runner image version 20261104.0514.1.

A4. **The replay.** In a Linux container, with Bun 1.4.4, the drafting assistant ran bare `bun test` twice in sequence, the second with `TZ=America/New_York`, at the binding base and at H1's head, twice each. That test took from 2.63 to 3.11 s at the base and from 2.65 to 2.80 s at H1's head, with no slowdown in the second run. Each run whose log it kept had the same 8 failures at both commits, none in that file. The replay did not reproduce the slowdown of A2 and did not establish its cause.

A5. **The rules.** `DEC-20261108-03` B13 item 2 starts the review only after Verify (macOS) passes at H1's head. `DEC-20261103-01` B4 closed the known-failure set: no timing exception applies on any host.

A6. **The drafting assistant.** A Claude Code session read the job logs, ran the replay of A4, proposed the limit of B1, and drafted this addendum. It first read the failure of A2 as a slow runner and recommended the re-run on that reading; the second failure showed that reading was wrong. None of that is an independent review.

## Part B: Founder rulings

B1. **The time limit.** In `test/phase3a/architecture-phase3a.test.ts`, the test of A2 takes an explicit time limit of `15_000` ms, as its third argument, as the file's other long tests do. Nothing else in that test or that file changes: no assertion, no name and no other test. This changes the test on every host. It is not a timing exception under `DEC-20261103-01` B4, and it is not a tightening of `DEC-20261108-03` B5, so it has no break of B8 item 3.

B2. **The sixth session.** A sixth builder session resumes from `d09712a67db06fc6a7cee9bf0674ac8b509a8200`, keeping the Actor-Id, branch, clone and folders of `DEC-20261108-03` B6 item 1, under a builder prompt I sign that names this addendum. It:
1. makes the change of B1 as the sixth commit, touching only that file;
2. runs the runtime check and the first five gates of B8 item 4, in the order of Addendum 1 B1, each once, and then at once one more complete `bun test` with `TZ=America/New_York`, writing a JUnit report beside its log, from which it takes the time of the test of A2;
3. writes an addition to the build log and makes the seventh commit, touching only the build log;
4. runs the last four gates of B8 item 4 at the seventh commit, under Addendum 1 B1 and B2.

`DEC-20261108-03` B8 item 2 is read as seven commits, the last two these. Any failure in the runs of item 2, at any load, halts H1 for my ruling. Every other rule of the fifth-session builder prompt, as Addendum 5 reads it, applies.

B3. **The build log.** The addition records A1 to A4 and this addendum by name and SHA-256; the sixth session's commands, each with its load, exit status and log SHA-256; the summary lines of both complete runs, quoted; and the time of the test of A2 in the second run. It records the sixth session's identity report by saying whether its namespaces and tool names are the same as the fifth session's, and names any difference.

B4. **The check of Addendum 2 B4.** The sixth session writes none of the six names Addendum 2 B4 counts in any command, file, commit message or description; where it needs them, it refers to them as the six names of Addendum 2 B4. My push command runs the check of Addendum 6 B2 and goes on only if it finds exactly the four records of Addendum 6 A2, each with exactly its occurrences, and one more record started in `/Users/michaeldaley/builds/h1-r1`, with no top-level call outside those Addendum 2 B4 allows and no occurrence of those six names inside `exec`. Anything else halts H1 for my ruling.

B5. **The push and what follows.** My push command moves `build/h1-r1` forward from `d09712a67db06fc6a7cee9bf0674ac8b509a8200` to the seventh commit without a force push, and replaces the description of pull request 234 with the sixth session's. The pull request stays a draft. Verify, Verify (macOS) and code-review then run at the new head; my run of `DEC-20261108-03` B12 runs at the new head; and the review of its B13 covers B1 and B2 with items 6 to 11.

B6. **Counting and filing.** A halt is not a verdict and adds no round. These are new Founder rulings, which Phase 3A plan §11.3 does not count. This addendum takes effect when I sign it and is filed unchanged with the act that records H1's merge, with Addenda 1 to 6. Nothing else in `DEC-20261108-03` or its Addenda 1 to 6 changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-10

Actor-Id: founder
