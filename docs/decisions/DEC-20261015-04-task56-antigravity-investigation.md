FOUNDER-ACT-20261015-TASK56-EXECUTION-AUTHORIZATION: Task 56, the formal Antigravity surface investigation, run on the MacBook

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `1ee5a1d5c37fb2c1a77f8b9bf952179c3530f438`
> **Binding base:** the `origin/main` commit the builder prompt names, which must contain this act
> **Governs:** plan `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md`, milestone M25, Task 56
> **Read with:** plan Task 56 and sections 4, 9 and 11.3; spec §§2.2, 2.3, 5.1, 5.2, 5.5, 5.6, 6.6, 6.7 and 9.13; `DEC-20261010-02` (SHA-256 `cae5ac6b59618507f6ff3ef0f4d2cd5bca1909f328023248db8d234c4098b5a1`) B5; `DEC-20261013-03` (SHA-256 `249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7`) B2; `DEC-20261013-04` (SHA-256 `2dd2ebd0715c8c6f70e963b5a6698a4bf4f71d5505021db18c490625bfe2d88f`); `DEC-20261014-01` (SHA-256 `f1f2bd610b444103bb16c3c2ce48f15be186b428bdb6c5e1e56c1b98f55338cd`); `DEC-20261014-03` (SHA-256 `494386cd2f946f2399e610a2b10b7d9f340f18edda4b38e75468a20afa0ce8e3`) B9, as item 3a of my merge authorization of pull request 153, comment 6203414147, reads it; `docs/verification/phase-3a-antigravity-preliminary.md`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What Task 56 is.** Plan Task 56 runs the formal investigation of the Antigravity surface against the identity rubric of spec §2.2, writes one `CapabilityRecordV1` for `antigravity`, pass or fail, commits the human-readable report `docs/verification/2026-08-12-antigravity-surface-investigation.md`, and adds three named tests in `test/phase3a/evidence-pipeline.test.ts`. Plan section 4 places M25 at rubric milestone 1 and makes it depend only on M15 and M16.

A2. **Its dependencies are met.** `DEC-20261010-01` (SHA-256 `13e8f01c68ccbaadb614ef5a579487018cd03f4407fbb3ef228bda4a6e585432`) closed M15, and `DEC-20261011-01` (SHA-256 `3182e026f21417ad85cb601a89201d447daee41f986d5c33512d6e17cb61b60f`) closed M16. Task 56 does not wait for M21.

A3. **Its host.** Spec §5.5 and `DEC-20261010-02` B5 allow no capability record on Linux, and `DEC-20261013-04` B1 and B2 leave the MacBook as the only supported macOS certification host. Task 56 therefore runs on the MacBook. Task 60 ran on the iMac; its report is history and, under plan §9.3, its attestation is not reused.

A4. **The gaps.** Plan Task 56 leaves six questions open:

1. Its tests read "the capability store", which exists only on the host that wrote it, so the tests could not pass in CI or on the reviewer's host.
2. The record has fields for PTY, process-group, termination and timing results, which only a governed session of the real binary could produce, and spec §9.13 forbids a live session of a surface without a passing identity primitive.
3. It names no requested model.
4. Its structured-mode primitives send prompts to Google.
5. Its builder, under `DEC-20261014-01` B1, is a Gemini session on the surface it investigates.
6. The default storage root may not exist on the MacBook.

Part B rules on each.

A5. **The drafting assistant.** It drafted this act after reading plan Task 56 and section 9, spec §§2.2, 2.3, 5.1, 5.2, 5.5, 6.6 and 9.13, the Antigravity registration in `packages/protocol/src/adapter-registry.ts`, `packages/protocol/src/capability-record.ts`, `packages/storage/src/capability-store.ts` and the Task 60 report, at the commit in the header. None of that is an independent review.

## Part B: Founder rulings

B1. **The builder.** The builder is a fresh Gemini 4 session on the Antigravity surface on my MacBook, in a fresh clone at the binding base, under `DEC-20261014-01` B1 and B7, with Actor-Id `session:antigravity/m25-task56-r1`. Spec §6.6 keeps the surface's role as the thing investigated separate from its use as the builder's surface. The builder cannot certify its own surface: the verdict follows the rubric of B2, and a result that meets the rubric's passing evidence is a stop under B9, not a record.

B2. **The rubric.** The rubric is spec §2.2 as it stands at the binding base. It is not edited during or after the investigation. Editing it is a stop.

B3. **The primitives.** The builder runs the binary that `command -v agy` resolves, by its absolute path, and records that path, its SHA-256 and its `--version` output before and after the investigation; a change between the two is a stop. It runs, each once:

1. `--version`;
2. every help command the binary's own help output documents, and the help of every subcommand that output lists;
3. `models`;
4. `config get model`, which plan §9.4 already classes as failing evidence, recorded as an attempted primitive;
5. each structured output mode the help documents, once without `--model` and once with `--model` naming the model of B5, each with the fixed prompt `Reply with the single word ok.` and no other input;
6. any other command the help documents as reporting the model, provider or session of a run.

Every command runs with stdin from `/dev/null`, stdout and stderr captured to separate files, and the exit status read from `$?` immediately after. Item 5 and item 6 together make at most twelve runs that reach a model. No command uses a flag that continues, resumes or names a conversation, that selects an agent, or that skips permission prompts, and none changes the binary's configuration.

B4. **Authentication.** The builder signs in to nothing, signs out of nothing and changes no account state. If a command reports that the surface is not signed in, it records that output and continues with the commands that need no session. The auth-readiness result is `no_primitive` unless the help documents a non-mutating, non-interactive primitive for it, in which case the builder runs that primitive once and records its result.

B5. **The requested model.** The requested model is the exact identifier, as `agy models` prints it, that the builder prompt names. I name it in that prompt from the identity report of the Task 46 builder session. If `agy models` does not list it, the builder stops.

B6. **The record.** The builder builds the record from what it observed, with `independence_domain` `google` and `organization_id` `google` copied from the registration at the binding base. It parses the record with `parseCapabilityRecord` and writes it once with `writeCapabilityRecord`, under the default storage root of spec §5.1 resolved from the passwd home of spec §5.2, with no `MADV_STORAGE_DIR`. If that root does not exist, the builder creates it and its `capability` directory with mode `0700`, and nothing else. Where identity attestation fails:

1. `overall` and `identity_attestation.result` are `fail`, and `identity_attestation.sanitized_facts` names the precise rubric clause not met;
2. `role_eligibility` is empty and `independent_review_eligible` is `false`;
3. `pty.result` is `fail`, meaning not established, with an empty `observed_ms`, and `limitations` states that no governed session of the real binary ran, because spec §9.13 forbids one;
4. `limitations` also records any difference between the observed CLI version and the registration's `supported_versions`.

The record script is a scratch file outside the clone and is not committed. If the parser rejects a record built this way, the builder stops.

B7. **The tests read the committed copy.** The report carries, under the heading `Capability record`, one fenced `json` block whose bytes, followed by one newline, are byte for byte the stored record file, together with that file's name and SHA-256. The three tests of plan Task 56, with exactly those names, read the record from that block and parse it with `parseCapabilityRecord`. They read no storage root, so they pass in CI and on every host. "Reading the capability store" in plan Task 56 Step 1 is read as reading that block, and "persists a record" in its second test as asserting that the report carries the block and that the SHA-256 the report records equals the SHA-256 of the block's bytes followed by one newline. Plan Task 56 Step 2's expected RED is read as the failure the missing report causes.

B8. **The report.** The report holds every field of plan §9.3. It reproduces every command of B3 exactly as run, with its full stdout, its full stderr and its exit status, with no elision, summary or truncation. It applies the redaction of spec §5.6 to account identifiers and email addresses as well as to token patterns, marks each redaction in place, and lists the rules applied.

B9. **A passing result stops.** If any observation meets the passing evidence of spec §2.2, the builder writes no record and no report, commits nothing, and stops with its evidence for my ruling, as plan §9.4 requires.

B10. **External transmission.** For this task only, the builder may send to Google, through the Antigravity surface, what the harness sends while it works, and the fixed prompt of B3 item 5. Item 3a of my merge authorization of pull request 153 applies to it as it applies to `DEC-20261014-03` B9: the builder reads nothing under `~/.secrets`, `~/.ssh`, `~/.config/madventures`, `~/.madmik3-quarantine` or `~/.claude-madventures-v5`, and runs no command that prints the value of an environment variable, a token, a credential or a key, or that lists processes. A command whose output would breach these limits is a stop for my ruling. Beyond that, only `git fetch`, the package downloads of `bun install --frozen-lockfile`, and the model runs of B3 leave my host. The builder reads nothing outside its clone other than the binary under investigation, the macOS test runtime, Bun's install cache, the storage root of B6, and its own scratch files of B3 and B6, which it keeps under one disposable `mkdtemp` root.

B11. **Order on the MacBook.** The investigation starts only after the Task 46 builder session has ended, so that no other Antigravity session runs while the binary is investigated.

B12. **The runtime.** Every test runs with the macOS certification runtime of `DEC-20261013-03` B2 item 1. The record's `host` fields describe that runtime and the MacBook.

B13. **The reviewer and the count.** The Part E review is made by a fresh Codex session on my Ubuntu PC that has seen no Task 56 material, under reviewer id `codex`, a Tier-2 reviewer under `DEC-20261014-01` B4. It reviews the evidence and runs the tests; it does not run `agy`. A substantive finding is round 1 for the new builder under rubric milestone 1, under `DEC-20261014-01` B2. Under `DEC-20261008-03` B3, the reviewer is sent no correction that states expected results.

## Part C: Scope

C1. Exactly two paths change: `docs/verification/2026-08-12-antigravity-surface-investigation.md`, new, and `test/phase3a/evidence-pipeline.test.ts`, new. One commit, with the subject plan Task 56 Step 7 gives: `docs(verification): record the Antigravity surface investigation under the fixed rubric`.

C2. Every other path stays byte-identical to the binding base, including `bun.lock`, every manifest, the adapter registry and `packages/adapter-antigravity`. Outside the clone, the builder writes only the record and directories of B6, the scratch files of B3 and B6, and the pull request files of E3.

## Part D: Verification

D1. **Preconditions.** The binding base contains this act, `DEC-20261010-01` and `DEC-20261011-01`, each at the SHA-256 the builder prompt names. Neither path of C1 exists there. The host is the MacBook, `uname -sm` prints `Darwin arm64`, and the session's identity report of `DEC-20261014-01` B7 comes first.

D2. **Baseline,** recorded verbatim with the host, the Bun version and revision, the user and the session's sandbox setting: `bun install --frozen-lockfile`, `bunx tsc --noEmit`, `bun test test/phase3a packages/protocol packages/storage` and bare `bun test`, each run once, one at a time, in the foreground. On the MacBook no known-failure set applies.

D3. **RED and breaks.** The tests are written first and the RED failure recorded verbatim. After the report is written, the builder records one deliberate break for each of the three tests, each with the test that failed, restores after each, and confirms each file's SHA-256. No break is committed.

D4. **Final checks.** `tsc` exits 0. `test/phase3a/evidence-pipeline.test.ts` shows exactly 3 passing. `bun test test/phase3a packages/protocol packages/storage` and bare `bun test` show 0 fail. `git diff --check` is clean. The changed-path list against the binding base is exactly C1. The SHA-256 of the stored record file equals the one the report records.

D5. **The description table.** The pull request description maps B2 to B9 to the section of the report or the assertion that pins each, and to the commit SHA.

## Part E: Builder binding and review

E1. The builder's attribution, as the final paragraph of its commit message and of the pull request description:

```text
Role-Id: builder
Actor-Id: session:antigravity/m25-task56-r1
Execution-Surface: antigravity
```

E2. Before the pull request leaves draft, I run a command on the MacBook that prints the SHA-256 of the stored record file, and it must equal the one the report records.

E3. The builder makes no GitHub call. It commits, saves the pull request title and description outside the clone, and stops with its report. I push the branch and open the draft pull request.

E4. **Review.** Before the pull request leaves draft, the reviewer of B13 reviews the exact head in its own clone on the Ubuntu PC with the custodied runtime of `DEC-20261013-03` B2 item 2, writes its full report to a file in one pass, and gets no guidance during the review. On that host the known-failure set of `DEC-20261013-01` B9 applies. PASS only if all of these pass:

1. The rubric applied is spec §2.2 unchanged, and the verdict follows it for every primitive.
2. Every command B3 requires was run, or the report shows from the help output that it does not exist on this binary.
3. No configured model string, requested flag or conditional echo of a requested model is treated as passing evidence.
4. The record block parses, carries the fields B6 requires, and matches the report.
5. The report shows full outputs and exit statuses, and no unredacted account identifier, email address or credential.
6. The tests follow B7, and the changed paths are exactly C1.
7. The reviewer reproduces the D4 results and at least two of the D3 breaks.

E5. The verdict is recorded on the pull request with the reviewer id and the exact head SHA, and entered in `docs/verification/phase-3a-correction-rounds.md` under plan milestone M25 and rubric milestone 1.

## Part F: Not authorized

- Task 57, and any investigation of a surface other than `antigravity`.
- Any change to the adapter registry, `packages/adapter-antigravity`, the rubric, the plan, the spec or any decision record.
- Any sign-in, sign-out, configuration change or install on any host, and any live or governed session of a real surface.
- Writing a passing record, or any capability record on Linux.
- Starting the investigation before every precondition of D1 holds, or while the Task 46 builder session runs.

## Part G: Signature

Signed:

— Michael Daley

Date: 2026-10-15

Actor-Id: founder
