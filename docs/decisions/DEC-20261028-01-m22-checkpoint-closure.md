FOUNDER-ACT-20261028-M22-CHECKPOINT-CLOSURE: the three M22 builds accepted, the M22 review checkpoint closed, and their open items carried forward

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Closed at:** `2b47fea87a766c345ab295ffb3342d6be445c231` (`origin/main` when drafted, the merge of pull request 202)
> **Governs:** plan `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md`, milestone M22, Tasks 48 to 50
> **Read with:** `DEC-20261027-01` (SHA-256 `86f1374492a833ce87ebdf81293c59e8805c547d8bc29e1aa682b17a769bcd8b`), its B1, B8, B9 and B10; `DEC-20261023-01` Part B; plan sections 4 and 11.3; my merge authorizations of pull requests 198, 201 and 202

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What remains open.** Plan Tasks 48 to 50 each end by stopping for the M22 review checkpoint. `DEC-20261027-01` B10 rules that M22 closes by a later act after Task 50 merges. Task 50 merged as pull request 202. This is that act.

A2. **The builds.** M22 holds Task 48, merged as pull request 174 before `DEC-20261027-01`, and the three builds that act authorized in order under its B1:
1. The M22 corrections of its B2 to B4, built by `session:codex/m22-corrections-r1`, head `5ef992f6ad6e53d18db493ed051d2fa59d5d2c5f`, merged as pull request 198 at `ce4b276aa49bb36c7736c82136de24db88360903`.
2. Task 49 under its B5, built by `session:codex/m22-task49-r1`, head `06fa371bae8195afa6524da6a02b35448fe8e8bb`, merged as pull request 201 at `2e62ebbb173d9649de999e5ef22c48812f36e6d0`.
3. Task 50 under its B6 and my readings R1 to R3, built by `session:codex/m22-task50-r1`, head `c7eabf0ec8ad676e2d3ecc63075eedae9bfc3535`, merged as pull request 202 at `2b47fea87a766c345ab295ffb3342d6be445c231`.
Each merge commit has the reviewed head as its second parent, changes exactly the paths its authorization names, carries parseable trailers, passes `attribution-shape-check.sh main`, and was followed by green push runs on `main`.

A3. **The reviews.** Each build was reviewed at its exact head by a fresh Gemini 4 session on Antigravity on my MacBook, reviewer id `antigravity`, and each verdict is posted verbatim on its pull request:
1. Pull request 198: PASS with no findings. Report SHA-256 `93877eb1b1b9b4cb39be64723d46303eeab164e4388a2cdc5c7db26db91ef275`, comments 6440061248 and 6440061784.
2. Pull request 201: PASS with no findings, and three successful attempts to defeat the tests that the report left unclassified, which my merge authorization ruled advisory. Report SHA-256 `c2e975c544cfd7cdeec5dfbacff4c734046b3d705ed47b6c706fd2b95c70b453`, comments 6455139522 and 6455140002.
3. Pull request 202: PASS with three advisory findings. Report SHA-256 `509229fa3e48c8ba79dba517420d858e466cc931c3bccdea038170012c98d0ae`, comments 6466766561 and 6466767164.
For each, the log check of `DEC-20261027-01` B8 found every log of the reviewer's folder in its report and no SHA-256 value that is not the hash of a log or of a file in the review clone or the certified runtime. For pull request 202 that check ran after the verdict was posted.

A4. **The authorizations of record.** The merges rest on comment 6452577539 on pull request 198, my third authorization of it after comment 6445076570 was voided; comment 6457665692 on pull request 201; and comment 6468466154 on pull request 202. Pull request 202 also carries comment 6468430984, posted two minutes earlier as decivantiq: a reformatted copy of the same text, in which the reference to the pull request became a link and the numbering of its items was lost.

A5. **Why no further review.** Each build was reviewed independently at its exact head, and the code on `main` is the code reviewed. A further milestone review would re-examine the same files. I close on the build reviews, as I did for M15, M16 and M20.

A6. **The process record.** During M22, a Hermes session on my MacBook pushed commit `48bba1d7884d86863ef75ed6938a43471f48807b` to pull request 198 at my request with my decivantiq credentials, against `DEC-20261027-01` B3, two minutes after my authorization; I restored the branch, and the later builds began only after a check that no Hermes process ran. Builders stopped on two omissions of the drafting assistant's prompts, each answered by an addendum I signed: in the corrections build, a prompt that placed the new duplicate lookup without saying how its failure is handled, which let a fail-open path into the first commit; and in Task 49, test names whose parentheses a test filter read as a regular expression. The corrections builder also stopped twice on its own execution errors, answered by addenda, and I resolved by one typed line a conflict the drafting assistant's third addendum made with the prompt's rule against square brackets. Two answers I gave to builders carried placeholders or statements the suggested text did not measure; the merge authorizations record them.

A7. **The drafting assistant.** It drafted this act, the prompts, addenda and merge authorizations of M22, and the readings R1 to R3. None of that is an independent review.

## Part B: Founder rulings

B1. **The verdicts.** I accept the three PASS verdicts of A3 at the heads of A2, with the rulings of my merge authorizations. None adds a round, and rubric milestone 10 stays at **0** correction rounds.

B2. **The M22 review checkpoint is closed** at `2b47fea87a766c345ab295ffb3342d6be445c231`, on the accepted verdicts and the merges of A2.

B3. **The authorization of record on pull request 202** is comment 6468466154, which is byte for byte the text I signed. Comment 6468430984 has no force and is not deleted.

B4. **Items carried forward.** Each stays open for a later act, and no code changes under this act. The act that next authorizes a change to the named path rules on each item that touches it.
1. **Production, packages/broker.** `spawnPtyHost` starts the PTY host with the repository root as its working directory, and Bun 1.4.2 loads a `.env` file found there into the host's environment despite the explicit environment. The act rules whether production starts the host without loading such a file, with a test.
2. **Production, packages/broker.** Whether production routes `pty_input` and `pty_resize` to the PTY host, which Task 49 does only through the harness, as `DEC-20261027-01` B5 item 4 and B9 leave to M23 or a later act.
3. **Tests, packages/broker.** A test of a failing duplicate lookup in both `publish` and `publishIncident`, and a test that a refused duplicate builds no record and consumes no event id.
4. **Tests, packages/pty-host.** A test that the governed child's environment holds only the launch frame's environment when the host's own environment holds more.
5. **Tests, test/phase3a.** A test that a refused `pty_input` or `pty_resize` never reaches the child; a test that the fixture exits cleanly on SIGINT; a check of the returned session by `Reflect.ownKeys`; and a refused command in the third environment test, so that an error payload is checked against the marker.
6. **Limitations stated, not defects.** The PTY host environment capture is the environment the build hands the host, not one it reports; no session path exercises the redaction of a secret-marked allowlisted value, because no allowlist marks one; and the Task 49 fixture detects a resize through Bun's undocumented `_refreshSize`.
7. The items of `DEC-20261027-01` B9 stay open, unchanged.

B5. **Agents and the Founder's credentials.** For the rest of Phase 3A, no agent session pushes, comments, approves, readies or merges in this repository with my decivantiq credentials. An agent that acts on GitHub here acts only as `daley40-lab`, and Hermes stays stopped while a governed build, review or merge of this repository runs, until it can no longer reach my decivantiq credentials.

B6. **What this does not open.** Closing M22 meets the M22 dependency of M23 and M24 in the plan section 4 table, and authorizes nothing. It does not close M21 or any other checkpoint, and does not rule on pull request 200.

## Part C: Filing and recording

C1. One docs-only pull request files this act and appends four entries to `docs/verification/phase-3a-correction-rounds.md`, and changes nothing else. Three entries record the verdicts of A3 under plan milestone M22 and rubric milestone 10, each with the reviewer id, the head, the report's SHA-256, the comments, and no round added. The fourth records the closure at the commit in B2, the count unchanged, and the items of B4.

## Part D: Not authorized

- Taking up any item of B4.
- Any change to code, tests, `bun.lock`, a manifest, the plan, the spec or any decision record other than this filing.
- M23 and every later milestone or task.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-28

Actor-Id: founder
