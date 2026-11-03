FOUNDER-ACT-20261103-TASK57-CLAUDE-CODE-INVESTIGATION: my list of surfaces for Task 57, the Claude Code version on my MacBook ruled on, and Task 57 authorized on the MacBook

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `6010de734d82ddebfc68ba0d75c8d4b65ec0e095` (the merge of pull request 216)
> **Binding base:** the `origin/main` commit the builder prompt names, which must contain the merge of this act's filing
> **Governs:** plan `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md`, milestone M25, Task 57; the Claude Code version on my MacBook under `DEC-20261013-05` B2; the composition of `overall` in every capability record
> **Read with:** plan Task 57 and sections 9 and 11.3; spec §§2.2, 2.3, 2.4, 4.2, 5.1, 5.2, 5.4, 5.5, 5.6, 6.6 and 9.13; `PLAN-OPEN-1`; `PLAN-OPEN-2`; `PLAN-OPEN-3`; `DEC-20261015-04` and the acts that corrected it, `DEC-20261016-03` to `DEC-20261017-02`; `DEC-20261013-01` B3; `DEC-20261013-03` B2 item 1; `DEC-20261013-05` B1 and B2; `DEC-20261020-01` B8; `DEC-20261023-01` Part B; `DEC-20261102-01` B4; `DEC-20261102-02` B4 to B8; `DEC-20261103-01` A2, B3, B4 and B8; `docs/verification/2026-08-12-antigravity-surface-investigation.md`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What Task 57 is.** Plan Task 57 investigates each surface I approve as a startup re-authorization alternative under the rubrics Task 56 applied. It writes one `CapabilityRecordV1` and one report `docs/verification/2026-08-12-surface-investigation-<surface>.md` per surface, and adds three named tests to `test/phase3a/evidence-pipeline.test.ts`. Its preconditions are that Task 56 is committed, which it is (pull request 157, merged at `911d44aa18a7ba5b332d469683faae22d29e3b73`), and that I have named my list. `DEC-20261102-01` B4 puts Task 57 and the M25 review first in the rest of Phase 3A, in either order with the hardening builds, and `DEC-20261020-01` B8 closes M25 after Task 57.

A2. **The Claude Code version on my MacBook.** On 2026-11-03 I ran `~/.local/bin/madbridge-claude-v5 --version`, which printed `2.1.314 (Claude Code)`, and its `auth status` filtered to three fields, which showed `loggedIn` true, `authMethod` `claude.ai` and `apiProvider` `firstParty`. The registration and `PLAN-OPEN-1` support only 2.1.296 (`DEC-20261013-05` B1). Under `DEC-20261013-05` B2 a host found on an unsupported version is a stop for my ruling, and under `DEC-20261013-01` B3 a preflight that includes Claude Code on this host fails as `identity_mismatch`. In Phase 3A that costs nothing: spec §4.2 keeps production `start` closed.

A3. **Not established.**
1. How the launcher reached 2.1.314: whether automatic updates were never turned off under `DEC-20261013-05` B2, were turned back on, or whether the launcher starts a program that another Claude Code installation updated.
2. Whether `madbridge-claude-v5` is a program, a symbolic link or a script, and so which file preflight would hash for it.
3. Which configuration directory the `auth status` of A2 read. The governed directory `~/.claude-madventures-v5` of `PLAN-OPEN-2` is read only when `CLAUDE_CONFIG_DIR` names it, and A2's command set it only if the launcher does.
4. The version of the governed launcher on the Ubuntu PC, where the Hardening D builder runs Claude Code 2.1.316 from `~/.local/bin/claude`. No capability record is written on Linux (`DEC-20261010-02` B5).
5. What the structured output of Claude Code 2.1.314 carries. No record in this repository has observed it.

A4. **What the code at the drafting commit does.**
1. `parseCapabilityRecord` requires `provider`, `organization_id` and `independence_domain` to equal the registration's. It does not compare `cli_version` with `supported_versions`, so a record of an unsupported version parses.
2. Preflight resolves the executable as the real path of `madbridge-claude-v5` on the approved path and hashes that file. It runs the identity probe, the registered `identity_probe.argv` followed by `--model` and the requested model, with the input `IDENTITY_PROBE_INPUT` of `packages/supervisor/src/attestation.ts`, and accepts it only when the first `system/init` event's `model` equals the requested model and its `claude_code_version` is supported. It runs `auth status` and accepts it only under `parseAuthReadiness`. Only after both does it read a record, through `latestFreshRecord`, and it then fails unless that record's `overall` is `pass`, its `requested_model` is the execution's model, its `role_eligibility` includes the execution's role and, for a reviewer, `independent_review_eligible` is true.
3. Nothing in the spec, the plan or `PLAN-OPEN-3` says how `overall` follows from the parts of a record. Spec §6.6 and plan §9.1 apply two rubrics to an investigation: the identity rubric of spec §2.2 and the auth-readiness rubric of spec §5.4.
4. Because production `start` is closed in Phase 3A, no governed session of a real binary can run, and a record's PTY, process-group, termination and timing results cannot be established.

A5. **What Task 56 taught.**
1. The binary under investigation changed between rounds, and the stored record and every capture had to be superseded (`DEC-20261016-04` A2 and A3).
2. A prescribed help form ran an operation on the binary (`DEC-20261016-05` A3).
3. A test that scanned report prose for forbidden claims failed after three corrections, and the builder was reassigned (`DEC-20261017-02` A3).
4. The accepted verdict failed spec §2.2 because no run of Antigravity's structured output named a provider, and because its `init.model` could be an echo of `--model` (section 5 of the Task 56 report).
This act is written to avoid items 1 to 3 and to apply the reading of item 4 to Claude Code without change.

A6. **The drafting assistant.** It drafted this act after reading, at the commit in the header: plan Task 57 and section 9; spec §§2.2 to 2.4, 4.2, 5.4 to 5.6, 6.6 and 9.13; `PLAN-OPEN-1`, `PLAN-OPEN-2` and `PLAN-OPEN-3`; `DEC-20261013-05`; `DEC-20261015-04` and the rulings of the acts that corrected it; the Task 56 report and tests; and `packages/protocol/src/adapter-registry.ts`, `packages/protocol/src/capability-record.ts`, `packages/storage/src/capability-store.ts`, `packages/supervisor/src/attestation.ts` and `packages/supervisor/src/preflight.ts`. It proposed each ruling. None of that is an independent review.

## Part B: Founder rulings

B1. **My list of surfaces.** My list for Task 57 is `claude-code`, the registered Claude Code surface, and nothing else. Codex, Grok, Cursor and every other surface are not on it, and Antigravity is not investigated again. Investigating a surface not on the list is unapproved scope expansion under plan §9.5. Only a later act of mine adds to the list.

B2. **The version, ruling the stop of `DEC-20261013-05` B2.**
1. The registration and `PLAN-OPEN-1` stay at 2.1.296. Neither this act nor Task 57 changes the adapter registry.
2. Task 57 investigates the launcher as it is installed when the investigation runs. If its version is not in `supported_versions`, the record and the report say so, as B6 item 6 requires.
3. A later version becomes supported only by a later act of mine that cites host evidence for it, as `DEC-20261013-05` B2 requires. Task 57's record and report may be that evidence.
4. Before I sign the builder prompt, I confirm that automatic updates are off for the governed launcher and run the pre-check of D1, whose output the builder prompt quotes. While the commands of B4 run, no other Claude Code session runs on my MacBook.

B3. **The rubric and how it is read.** The rubric is spec §2.2 as it stands at the binding base. It is not edited during or after the investigation. It is read as the accepted verdict of Task 56 read it for Antigravity, so that no surface gets a softer reading:
1. A passing clause is met only by what the session run itself emits in a structured mode, or by a documented primitive that reports on that same session.
2. Each passing clause needs both the resolved provider and the exact model. A provider named only by the adapter registration, by the form of a model identifier, by a configuration value, or by a separate process such as `auth status` is not the provider of the session.
3. A model string that could be an echo of `--model` is not, by itself, the resolved model.
4. `PLAN-OPEN-1` names `system/init.model` as Claude Code's evidence for live attestation. That ruling is unchanged, and this act does not decide whether it meets spec §2.2. The investigation records what it observes, and the verdict follows items 1 to 3.

B4. **The primitives.** The builder runs the commands below, each exactly once and in this order. They run from one runner script kept in the scratch root of B11, which the builder shows in full in the session before it runs.
- Every command runs with stdin from `/dev/null` unless stated.
- Its stdout and stderr are captured separately, and its exit status and any terminating signal are recorded.
- Each command has a limit of 120 seconds. If the runner ends a command at that limit, it records that it did.
- Every command that runs the launcher runs under `env -i` with exactly six variables, the required variables that `PLAN-OPEN-2` names for `claude-code-v1`:
  - `HOME=/Users/michaeldaley`;
  - `PATH=/Users/michaeldaley/.local/bin:/usr/bin:/bin:/usr/sbin:/sbin`;
  - `SHELL` set to the passwd shell that the pre-check of D1 records;
  - `TERM=xterm-256color`;
  - `TMPDIR` set to a directory of mode `0700` inside the scratch root;
  - `CLAUDE_CONFIG_DIR=/Users/michaeldaley/.claude-madventures-v5`.
  
  Its working directory is an empty directory inside the scratch root. None of the six values is a secret, and the report shows them.

In the list, `L` is `/Users/michaeldaley/.local/bin/madbridge-claude-v5`, `R` is what item 2 prints, `P` is the registered `identity_probe.argv` at the binding base written out in full, and `M` and `A` are the model and alias of B5.

1. `ls -l L`
2. `realpath L`
3. `file R`
4. `shasum -a 256 R`
5. `L --version`
6. `L --help`
7. `L auth --help`
8. `L auth status`, the registered auth-readiness primitive.
9. `L P`, with stdin the bytes of `IDENTITY_PROBE_INPUT` at the binding base.
10. `L P --model M`, with the same stdin: the identity probe exactly as preflight runs it.
11. `L P --model A`, with the same stdin.
12. `L --print --output-format json --no-session-persistence 'Reply with the single word ok.'`
13. Item 12 with `--model M` added before the prompt.
14. to 18. Items 1 to 5 again, in that order.

Items 9 to 13 reach a model. Nothing else runs `L`.

No command uses a flag that does any of the following:
- continues, resumes or names a conversation;
- selects an agent;
- adds or skips permissions;
- adds an MCP server or a setting;
- changes the launcher or its configuration.

A command that the help output documents as reporting the model, provider or session of a run is listed in the report and is not run.

B5. **The requested model.** The requested model `M` is the exact model identifier that the builder prompt names, and `A` is an alias for it that the launcher accepts. I name both there. The builder chooses neither and runs no command to list models.

B6. **The record.** The builder builds one record from what B4 observed and parses it with `parseCapabilityRecord`. It writes the record once with `writeCapabilityRecord`, under the default storage root of spec §5.1 resolved from the passwd home of spec §5.2, with no `MADV_STORAGE_DIR`. That call creates the `capability/claude-code` directory with mode `0700` if the directory is missing; the builder creates nothing else there. The record script is a scratch file and is not committed.
1. **Identity of the surface.** `surface` is `claude-code`. `provider`, `independence_domain` and `organization_id` are `anthropic`, copied from the registration. `requested_model` is `M`.
2. **Version and binary.**
   - `cli_version` is the first word that item 5 prints. It must equal the first word of item 18 and the `claude_code_version` of every `system/init` event of items 9 to 11.
   - `binary_path` is `R`.
   - `binary_sha256` is the hash that item 4 prints, which must equal item 17's.
3. **Host.** `host` describes my MacBook and the macOS certification runtime of `DEC-20261013-03` B2 item 1, with `term` `xterm-256color` and `shell` the `SHELL` of B4.
4. **Identity attestation.**
   - `identity_attestation.primitive` is `madbridge-claude-v5`, followed by `P` and `--model M` written out in full.
   - Its `result` follows B3.
   - Its `sanitized_facts` quotes each passing clause of spec §2.2, says whether that clause is met, and names the items and fields the answer rests on.
5. **Auth readiness.** `auth_readiness.primitive` is `madbridge-claude-v5 auth status`. Its `result` is `pass` when item 8 exits 0 and its stdout satisfies `parseAuthReadiness` of `packages/supervisor/src/attestation.ts` at the binding base; otherwise it is `fail`.
6. **PTY and limitations.** `pty` is `{"result":"fail","observed_ms":{}}`. `limitations` states each of the following that applies:
   - no governed session of the real binary ran, because spec §4.2 keeps production `start` closed in Phase 3A, so PTY, process-group, termination and timing results are not established;
   - if `cli_version` is not in `supported_versions`, both versions;
   - if `R` is not a Mach-O executable, that `binary_sha256` pins the launcher and not the program it starts.
7. **`overall`.** `overall` is `pass` exactly when `identity_attestation.result` and `auth_readiness.result` are both `pass`, and `fail` otherwise. This is how `overall` is composed in every capability record from now on.
8. **Role fields.** When `overall` is `pass`, `role_eligibility` is `["builder","independent-reviewer"]` and `independent_review_eligible` is true. When `overall` is `fail`, they are `[]` and false.
9. **Times and redaction.** `evaluated_at` is the moment the record is built, and `expires_at` is exactly 30 days later, as `PLAN-OPEN-3` requires. `redaction_rules_applied` lists the rules of B7 item 2.

B7. **The report.** The report `docs/verification/2026-08-12-surface-investigation-claude-code.md` holds every field of plan §9.3, and:
1. **Captures.** It reproduces every command of B4 exactly as run, with its environment, working directory and stdin source, its exit status and any signal, its duration, and its full stdout and stderr, with no elision, summary or truncation.
   - The captures use the form of the Task 56 report, except that each fence is a run of backticks longer than any run of backticks in its content.
   - Each stated byte count equals the byte length of the fenced content.
2. **Redaction.** Redaction follows spec §5.6. The runner applies it before any output reaches the builder or a file. It covers three rules:
   - email addresses;
   - in any JSON the output contains, the value of every key whose name contains `email`, `org`, `account` or `user`, in any case;
   - token patterns, including any string that begins `sk-ant-`.
   
   Each redaction is replaced in place by the string `<redacted:RULE>`, where `RULE` is the rule's name in `redaction_rules_applied`, and is counted per rule. The builder never reads, prints or keeps an unredacted capture.
3. **Verdicts.** A section takes each passing clause of spec §2.2 in turn and gives its verdict and the items and fields it rests on.
4. **Commands not run.** A section lists the commands of B4's last paragraph that were not run.
5. **Pre-check and version.** The report gives the pre-check of D1 as the builder prompt quotes it, and any difference between the observed version and `supported_versions`.
6. **The record.** A section headed `## Capability record` takes the form of the Task 56 report. It gives the stored record's path, a line `**Stored record filename:**`, a line `**Stored record SHA-256:**`, and one fenced `json` block whose bytes, followed by one newline, are byte for byte the stored file.

B8. **The tests.** Exactly the three tests of plan Task 57 Step 1, with exactly those names, are appended to `test/phase3a/evidence-pipeline.test.ts`.
- Every existing test and helper keeps its bytes; only the import statements may gain names.
- The tests read only committed files and the code at the binding base, never a storage root, so they pass in CI and on every host.
- No test scans report prose for claims about evidence.

1. **"every investigated surface has both a capability record and a committed report".**
   - The approved list is the constant `["claude-code"]`, from B1. The surfaces derived from the names of `docs/verification/2026-08-12-surface-investigation-*.md` must equal that list.
   - For each surface, the report's `## Capability record` section holds one `json` block. The block must:
     - parse under `parseCapabilityRecord`;
     - name that surface;
     - match the registration's provider, organization and independence domain;
     - equal `JSON.stringify` of the parsed record.
     
     Its recorded filename must equal `capabilityRecordFilename`, and its recorded SHA-256 must equal the SHA-256 of the block followed by one newline.
   - For `claude-code`, the record must agree with the captures as B6 requires:
     - the hash and version before and after;
     - `cli_version` and the `claude_code_version` of items 9 to 11;
     - `overall` and the role fields, as B6 items 7 and 8 compute them;
     - `auth_readiness.result`, as `parseAuthReadiness` gives it from item 8;
     - the limitations of B6 item 6;
     - where `identity_attestation.result` is `pass`, a `system/init` event in item 10 whose `model` is `requested_model`.
   - Its RED, before the report exists, is the derived list being empty.
2. **"no capability record is treated as a live authorization".**
   - The only production modules that call `readCapabilityRecords` or `latestFreshRecord` are `packages/storage/src/capability-store.ts` and `packages/supervisor/src/preflight.ts`.
   - In preflight, a record is read only after the identity and auth probes have passed, and it can only turn success into `capability_record_stale`.
   - A deliberate break that reads a record before a probe, or that lets a record produce success, makes the test fail.
3. **"no alternative is marked preselected or default".**
   - No record block of any investigation report, Task 56's included, and no registration in `ADAPTER_REGISTRY` has a key named `preselected`, `default` or `fallback` at any depth.
   - No report has a field line labelled `Preselected`, `Default` or `Fallback`.
   - Captured CLI output is the surface's own and is not checked.

B9. **Either result is a result.** A passing record and a failing record are both results. The builder writes the record whatever the verdict is and does not stop because of the verdict. A passing record is not a live authorization (spec §6.6), and no record is presented, preselected or used as a default (spec §2.4).

B10. **The builder.** The builder is a fresh Codex session on my MacBook, launched under `DEC-20261103-01` B3:
- Actor-Id `session:codex/m25-task57-r1`, on `build/m25-task57-r1`;
- in a fresh clone at `/Users/michaeldaley/builds/madventures-tui-m25-task57-r1`, at the binding base;
- with git identity `daley40-lab` and its no-reply address.

Its identity report comes first. It makes no GitHub call. When its sandbox would block a command of B4, a command of D2 or the record write of B6, it asks my approval in the session for that command alone. Every Bun process is the macOS certification runtime of `DEC-20261013-03` B2 item 1. The builder's surface is not the surface it investigates.

B11. **External transmission and reads.** For this task only, these leave my MacBook, and nothing else does:
- what the builder's harness sends to OpenAI as it works, including the redacted captures;
- what the launcher sends to Anthropic while items 5 to 13 and 18 run, including the inputs of items 9 to 13;
- `git fetch`;
- the package downloads of `bun install --frozen-lockfile`.

The builder reads nothing under:
- `~/.secrets`, `~/.ssh` or `~/.config/madventures`;
- `~/.madmik3-quarantine`, `~/.claude-madventures-v5` or `~/.hermes`;
- `~/.codex` or `~/.codex-governed`;
- any earlier session's memory or transcript.

It runs no command that prints a token, a credential or a key, prints its own or the ambient environment, or lists processes. The launcher reads its own configuration directory through `CLAUDE_CONFIG_DIR`; the builder does not.

Outside its clone, the builder reads only:
- `L` and `R`, as items 1 to 4 do;
- the runtime and Bun's install cache;
- the `capability/claude-code` directory and the record it wrote there;
- its scratch root, one disposable `mkdtemp` directory.

It writes only to that scratch root, to the record of B6, and to the pull request files of E3.

B12. **Halts, closed.** The build halts and reports to me only when:
1. a path outside C1 would change;
2. `L`, `R`, the SHA-256 or the version differs from the pre-check the builder prompt quotes, or differs between items 1 to 5 and items 14 to 18;
3. `cli_version` differs from the `claude_code_version` of any `system/init` event of items 9 to 11;
4. any output shows that the launcher's session ran a shell command, wrote a file outside its own configuration directory, signed in or out, installed or updated anything, or changed its configuration;
5. a command not in B4 would run `L`;
6. redaction would need a rule that B7 item 2 does not list, or an unredacted email address, account identifier or token is found after redaction;
7. the parser or the store rejects the record;
8. a test fails in a run of D2 or D4, under the load rule of `DEC-20261102-02` B4, with no known-failure set (`DEC-20261103-01` B4);
9. the session loads any MCP server;
10. the runtime is not the macOS certification runtime;
11. the binding base differs from the prompt.

Every other failure is handled under `DEC-20261023-01` Part B, and anything Part B makes a stop stays a stop. The investigation's verdict is never a halt.

B13. **Order and Hermes.** Task 57 may run before, during or after Hardening D, as `DEC-20261102-01` B4 item 2 allows: it touches none of Hardening D's paths, and its builder works only on my MacBook. Builder and reviewer sessions on my MacBook run one at a time. `DEC-20261102-02` B5 applies, with the Codex launch of `DEC-20261103-01` B3.

B14. **Corrections of `DEC-20261103-01`.**
1. **Its A2 item 2.** The words "Its description of the deadline test names a delay range and an elapsed-time assertion that the test file does not contain" are corrected to: "Its description of the deadline test names a delay range, `requestedDelayMs` in `[200, 250]` at lines 42 and 43, and an elapsed-time assertion, `elapsedMs >= 250` at line 55, neither of which the test file contains; the file bounds the delay as greater than 0 and at most 250 at lines 42 and 43, and its own elapsed-time assertion is `firedMs < 250` at line 47." This is the correction that item 3 of my merge authorization of pull request 216 promised.
2. **Its B8.** Its last sentence is amended to read: "The first act I sign after the Tier-2 verdict of Hardening D is posted enters that verdict in the correction-round log." This act is signed before that verdict exists.

B15. **Counting.** These are new Founder rulings, which plan §11.3 does not count. They add no round. No checkpoint closes.

B16. **What this does not open.** This act authorizes Task 57 for `claude-code` and nothing else. It changes no earlier ruling except as B2, B6 item 7 and B14 state.

## Part C: Scope

C1. Exactly two paths change:
- `docs/verification/2026-08-12-surface-investigation-claude-code.md`, new;
- `test/phase3a/evidence-pipeline.test.ts`, changed only as B8 allows.

The change is one commit, with the subject that plan Task 57 Step 7 gives: `docs(verification): record Founder-approved alternative surface investigations`.

C2. Every other path stays byte-identical to the binding base, including `bun.lock`, every manifest, the adapter registry, `PLAN-OPEN-1` and every package. No adapter registry entry or field is added or changed (plan Task 57 Step 6).

## Part D: Verification

D1. **Preconditions.**
1. Before I sign the builder prompt, I run a pre-check on my MacBook, outside every clone. Its output is quoted in the builder prompt. It prints:
   - `ls -l`, the real path, `file` and the SHA-256 of `L`;
   - whether `L`'s real path is the same file as the real path of `~/.local/bin/claude`;
   - the passwd shell;
   - in the environment of B4: `L --version`, and `L auth status` filtered to `loggedIn`, `authMethod`, `apiProvider` and `subscriptionType`.
   
   If `auth status` does not show `loggedIn` true, I sign in myself and run the pre-check again.
2. The binding base contains this act at the SHA-256 the builder prompt names, and the report path of C1 does not exist there.
3. The host is my MacBook, and `uname -sm` prints `Darwin arm64`.

D2. **Baseline.** The builder runs each of these once, one at a time, in the foreground, under the load rule:
- `bun install --frozen-lockfile`;
- `bunx tsc --noEmit`;
- `bun test test/phase3a packages/protocol packages/storage packages/supervisor`;
- bare `bun test`.

It records each run verbatim, with the host, the Bun version and revision, and the session's sandbox setting.

D3. **RED and breaks.**
- The tests are written first, and test 1's RED is recorded verbatim.
- After the report is written, the builder makes one deliberate break per test, each aimed at the property that B8 gives that test:
  - a changed byte in the record block or in a hash capture;
  - a record read before a probe in `packages/supervisor/src/preflight.ts`;
  - a `default` key added to a registration.
- Each break is shown failing its test and is then restored, and the builder confirms the restored file's SHA-256. No break is committed.

D4. **Final checks.**
- `bunx tsc --noEmit` exits 0.
- `test/phase3a/evidence-pipeline.test.ts` shows its earlier tests passing plus exactly three new passing tests.
- `bun test test/phase3a packages/protocol packages/storage packages/supervisor` and bare `bun test` show 0 fail.
- `git diff --check` is clean.
- The changed-path list against the binding base is exactly C1.
- The SHA-256 of the stored record file equals the one the report records.

D5. **The description table.** The pull request description maps each of B3 to B9 to the section of the report or the assertion that pins it, and to the commit SHA.

## Part E: Builder binding, review and merge

E1. The builder's attribution, as the final paragraph of its commit message and of the pull request description:

```text
Role-Id: builder
Actor-Id: session:codex/m25-task57-r1
Execution-Surface: codex
```

E2. Before the pull request leaves draft, I run a command on my MacBook that prints the SHA-256 of the stored record file. It must equal the one the report records.

E3. The builder makes no GitHub call. It commits, saves the pull request title and description outside the clone, and stops with its report. My guarded command pushes the branch from my MacBook and opens the draft pull request.

E4. **Review.** The build is reviewed only after Verify, Verify (macOS) and code-review pass at its head.

The reviewer is a fresh Gemini 4 session on Antigravity on my MacBook that has seen no Task 57 material, with reviewer id `antigravity`, under a review prompt I sign. It:
- works in its own clone at the exact head, with the macOS certification runtime;
- writes its full report to a file in one pass;
- gets no guidance;
- runs neither the launcher nor any Claude Code.

It returns PASS only if all of these hold:
1. The rubric applied is spec §2.2 unchanged, read as B3 reads it, for each clause, and the verdict follows it.
2. Every command of B4 ran once, as listed, and nothing else ran `L`.
3. None of the following is treated as the resolved provider or the resolved model:
   - a requested flag or an alias;
   - a configuration value or a registration value;
   - an inference from a model's name;
   - a separate process.
4. The record block:
   - parses;
   - carries the fields that B6 requires;
   - composes `overall` and the role fields as B6 items 7 and 8 say;
   - matches the report.
5. The report shows full outputs and exit statuses, redacted as B7 says, with no unredacted email address, account identifier or credential.
6. The tests follow B8, and the changed paths are exactly C1.
7. The reviewer reproduces the D4 results and at least two of the D3 breaks.

E5. **Counting.** Task 57 is plan milestone M25, rubric milestone 1.
- A substantive FAIL counts one round under rubric milestone 1 for the builder. It is answered by one correction commit, by a fresh session under an addendum I sign, and a new review.
- A correction does not run B4 again unless I rule that the captures are defective.
- A second FAIL halts for my ruling.
- Under `DEC-20261008-03` B3, the reviewer is sent no correction that states expected results.

E6. **Merge.** Neither path of C1 is a governance path, so under `AGENTS.md`, as `DEC-20261031-01` amended it, the pull request needs no act of its own. My guarded commands:
- mark it ready after a posted Tier-2 PASS at its exact head;
- merge it by merge commit, re-running held code-review runs one at a time under `DEC-20261101-01` B6.

E7. **Records.** The next act I sign after the verdict is posted enters that verdict in `docs/verification/phase-3a-correction-rounds.md` under plan milestone M25 and rubric milestone 1. That review is the review of the M25 checkpoint, and M25 closes by an act of mine after that entry is on `main`.

## Part F: Filing

F1. One docs-only pull request files this act and changes nothing else. It touches `docs/decisions/`, so under `AGENTS.md`, as `DEC-20261031-01` amended it, it merges only by an act of mine naming its exact head.

## Part G: Not authorized

- Investigating any surface other than `claude-code`, and running B4 a second time without my ruling.
- Any change to the adapter registry, `PLAN-OPEN-1`, `PLAN-OPEN-2`, the rubric, the plan, the spec, `AGENTS.md` or any decision record, and any path outside C1.
- Any sign-in, sign-out, update, install or configuration change by an agent on any host.
- Any live or governed session of a real surface.
- Any capability record on Linux.
- Supporting any Claude Code version other than 2.1.296.
- Presenting, preselecting or using any capability record as a default or a fallback.
- Task 58, Task 59, M26, any Phase 3B work, and every build other than Task 57 and Hardening D.

## Part H: Signature

Signed:

— Michael Daley

Date: 2026-11-03

Actor-Id: founder
