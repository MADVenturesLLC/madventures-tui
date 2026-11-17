FOUNDER_DECISION_REQUIRED

Phase 2 halted at item 3 of the fourth signed resume. This is a prerequisite halt, not a verdict on M0.

1. Harness settings
Before any command, the harness showed sandbox workspace-write and approval on-request. Both match the required settings and were reported.

2. Call discipline
All calls inside exec were written directly in their exec inputs. No code was stored or loaded from a harness store, no dynamic code execution was used, and no barred tool was called. No exec input contained one of the six names of Addendum 2 B4.

3. Prompt verification: failed
The existing manifest check exited 0, but verified nine entries, not the required twelve. All nine existing entries passed. The directory listing showed ten files, not the required thirteen.

Required files absent from the listing:
prompt/DEC-20261115-02-addendum-6-ubuntu-check.md
prompt/DEC-20261115-02-addendum-7-ubuntu-identity-run-and-deferral.md
prompt/resume-m0-4-phase-2.md

Addendum 5 was read in full; it is marked ISSUED and signed Michael Daley, 2026-11-17. Reading Addendum 6 then exited 1 with this output:
cat: prompt/DEC-20261115-02-addendum-6-ubuntu-check.md: No such file or directory

No attempt was made to read Addendum 7 or to continue into Phase 2 work after the failed batch returned.

Command evidence:
logs/378-resume-4-prompt-manifest.log
Uptime: 10:13  4 users, load averages: 1.84 1.70 1.65
Exit: 0; nine existing manifest entries passed.
SHA-256: 3b6e588d868e1fb7c5d0fc0d1a6ce6a93ac18f0478cb7470c19bc558a9f7acba

logs/379-resume-4-prompt-files.log
Uptime: 10:13  4 users, load averages: 1.84 1.70 1.65
Exit: 0; listing differs from the required set.
SHA-256: c3f5bef626f52ccb230aae280ff4d7b5c0758a7ff099a37df6012983dae5eb3d

logs/380-resume-4-addendum-5.log
Uptime: 10:13  4 users, load averages: 1.84 1.70 1.65
Exit: 0; complete Addendum 5 read.
SHA-256: a0a7b1388a8369565a20257cd9b17a34f86a8eed9d819d368b7342ad58b76512

logs/381-resume-4-addendum-6.log
Uptime: 10:13  4 users, load averages: 1.84 1.70 1.65
Exit: 1; required file absent.
SHA-256: 405898e6bca0cb9da0f9697756774e535bc7cec3b09e09f4b506dd0ede9f7705

Those hashes were obtained with shasum -a 256 in logs/382-resume-4-halt-log-hashes.log. Before saving this halt report, logs/383-resume-4-halt-report-path.log confirmed that its destination did not exist.

4. Phase 1 state and runtime
Not checked in this resume because item 3 required a stop. The expected Phase 1 head named by the Founder is 7f94c272a4fd7fc3b4ab1d18920b80ac95c677d3; this resume has not independently reverified it, the branch, report hashes, accepted script hash, CLI build or Bun runtime.

5. Evidence
No evidence file or folder was read. Evidence integrity and sanitation checks did not run. Item 5 of the supplied fourth message also retains unfilled placeholders for the evidence manifest SHA-256, SANITIZE.txt SHA-256 and manifest file count; no value was inferred for them.

6. Work not performed
No fixture, test, packet, build-log amendment, commit, gate, pull-request title or pull-request description was made. No command in this resume changed anything under tui. No surface, live call, network call, real key or capability-store write occurred. The accepted record script and earlier reports were not edited.

7. Deviation
Phase 2 could not advance beyond its prompt precondition because the supplied prompt bundle is incomplete. Only command logs and this halt report were written.

Single next Founder decision
Provide the complete, hash-bound Phase 2 handoff and authorize resumption: the missing Addenda 6 and 7, the fourth signed resume and updated prompt manifest, with the three evidence hash/count placeholders completed. The builder will not edit the read-only handoff or guess those bindings.
