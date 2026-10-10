FOUNDER-ACT-20261010-TASK37-EXECUTION-AUTHORIZATION: Phase 3A M16 Task 37, the single allowlisted-environment producer

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Binding base:** `acab0dfadc4e4650ddeaadb836bc516156766848` (`origin/main` when drafted, the PR #131 merge commit)
> **Governs:** plan `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` (SHA-256 `bdd91837de5eba742e9a2f61553db74c164b58bae9d6fa1b8f96ee748ef18ed8` at the binding base), Task 37
> **Read with:** `DEC-20261010-02` (the Linux host scope act), `PLAN-OPEN-2-environment-allowlists.md` (SHA-256 `6f570ea8123c824687953cc64b793587b9a5acb4db56729c29bec383f694e1b0`, approved 2026-08-15), `DEC-20261010-01` B5, `DEC-20261009-02` A2, spec sections 5.4 and 9.12, plan sections 11.3 and 11.4

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The preconditions are met.** Plan Task 37 needs M15 reviewed and a written `PLAN-OPEN-2` ruling. `DEC-20261010-01` closed the M15 review checkpoint, and it is on `main` since merge commit `acab0dfadc4e4650ddeaadb836bc516156766848`. `PLAN-OPEN-2` was approved on 2026-08-15, and the file on `main` has the SHA-256 the approval record lists. `DEC-20261010-02` B7 rules that Task 37 does not depend on the platform and proceeds once that act is on `main`.

A2. **The plan.** Task 37 creates the package `packages/supervisor` with `environment.ts`, `index.ts` and a test, and adds a `paths` entry to `tsconfig.json`. It produces the interface `EnvironmentAllowlistV1` and the functions `buildAllowlistedEnvironment` and `redact`, and names five tests. It consumes `ADAPTER_REGISTRY` and `AdapterRegistrationV1.environment_allowlist_ref`.

A3. **What `PLAN-OPEN-2` fixes.** It gives the exact `claude-code-v1` and `antigravity-v1` allowlists, both with zero `secret: true` variables. It rules that Task 37 is a pure constructor that copies required and present optional variables from an ambient environment its caller has already validated, and does not read or validate the installation profile; Task 45 owns that validation. It requires that secret redaction still be tested with a fixture that has a `secret: true` variable.

A4. **Gaps in the plan text, ruled in Part B.** The plan does not say where the allowlists live, what an unknown reference does, what redaction replaces a value with, what a rule name is, or how a fixture allowlist reaches code that resolves allowlists only by a registration's reference. A new workspace package also changes `bun.lock`, which the plan's file list omits.

A5. **Rounds.** Plan section 4 maps M16 to rubric milestone 4 only. The log stands at round 3 under rubric milestone 4, over the budget of two in plan section 11.3. `DEC-20261010-01` B5 left the builder and reviewer to this act, with that count in view.

A6. **A note on PR #131.** My merge authorization for PR #131 was first posted outside the guarded command, as comment 6093263037: the same words as the signed text, with its list numbering and header layout lost and Windows line endings. The signed text was then posted by the guarded command as comment 6093276239, before the merge. The second comment is the record, and the first is superseded. This is the case `DEC-20261010-01` B4 rules against, and it is recorded here.

## Part B: Founder rulings

B1. **The allowlists.** `environment.ts` defines exactly two allowlists, `claude-code-v1` and `antigravity-v1`, with the variable names, order and `required` and `secret` flags `PLAN-OPEN-2` gives, deeply frozen, in one table keyed by the reference string. No other production source defines an allowlist. Nothing is keyed by a surface identifier.

B2. **Resolution.** Both public functions find the allowlist by `registration.environment_allowlist_ref` alone. An unknown reference throws `UnknownEnvironmentAllowlistError`, which carries the reference and nothing else. There is no fallback.

B3. **Building.** `buildAllowlistedEnvironment` reads only its `ambient` argument and never `process.env`. It does no I/O and reads no clock. For each allowlisted variable in order, it reads the ambient value once; if that is a string, the variable is copied; if not, a required variable throws `MissingRequiredVariableError` and an optional one is omitted. The error carries the variable's name and the reference, and never any value. Every other ambient variable is dropped. The result is a new frozen object whose keys follow the allowlist order. The input is never changed, and the same input gives a byte-identical result on every call.

B4. **Redaction.** `redact` treats each `secret: true` variable of the resolved allowlist whose value in `environment` is a non-empty string as one rule, named `secret-value:` followed by the variable name. Each rule replaces every occurrence of that value in the text with `<redacted:` followed by the variable name and `>`. Longer values are replaced before shorter ones, so no part of a longer value survives. `rulesApplied` lists the names of the rules that ran, in allowlist order, whether or not they matched. No value is returned, logged or kept. With either production allowlist, `redact` returns the text unchanged and an empty `rulesApplied`.

B5. **The fixture path.** `environment.ts` may export, for tests only, the two pure functions that do the work given an `EnvironmentAllowlistV1` directly. The public functions resolve the allowlist and call them, and do nothing else. `index.ts` does not export them. The redaction tests define their `secret: true` fixture allowlist inside the test file. No production allowlist, registry entry or reference is added for a fixture.

B6. **Exports.** `index.ts` exports exactly `EnvironmentAllowlistV1`, `buildAllowlistedEnvironment`, `redact`, `MissingRequiredVariableError` and `UnknownEnvironmentAllowlistError`.

B7. **The package and the lock file.** `packages/supervisor/package.json` is named `@madventures/supervisor`, version `0.1.0`, `"type": "module"`, `"private": true`, with `"dependencies": { "@madventures/protocol": "workspace:*" }`. `tsconfig.json` gains only the `@madventures/supervisor` `paths` entry pointing at `./packages/supervisor/src/index.ts`. `bun.lock` differs from the base only by the lines `bun install` writes for the new workspace and its dependency edge. Any other line `bun install` changes, such as the separator between the `@mad/founder-act` and `@mad/honesty-compiler` entries, is restored to the base, and `bun install --frozen-lockfile` must then leave `bun.lock` byte-identical.

B8. **Plan Step 6.** No test asserts that code cannot read `process.env`, as spec section 9.12 requires.

B9. **Rulings made in advance.** These points stopped the Task 36 builder, and I rule on them now:

1. The builder reports its harness and its model exactly as the harness shows them. A model label is enough. It stops only if the harness is not Codex.
2. The builder may run tests with local IPC and child processes permitted and off-machine traffic blocked. Inside a nested sandbox on macOS, the four failures and one error in `test/phase0/parent-death.test.ts`, `packages/pty-host/test/main-guard.test.ts` and `test/phase3a/spike/bun-terminal-spike.ts` that `DEC-20261009-02` A2 records are expected and are not a stop, as long as they fail identically at the base. Any other failure or error is a stop. On the Ubuntu PC, any failure or error is a stop.
3. Restoring a line under B7 is not a deviation.

B10. **The builder, the reviewer and the count.** The builder is a Codex session, as for Task 36, whose work passed with no round. The re-review in Part E is made under reviewer id `gemini-antigravity`, a Tier-2 reviewer plan section 11.3 counts. A substantive finding there is round 4 under rubric milestone 4. It requires reassignment, and I rule before anything else is done. Under `DEC-20261008-03` B3, the reviewer is sent no correction that states expected results.

## Part C: Authorized scope

C1. One commit that changes exactly these paths:

- `packages/supervisor/package.json` (new)
- `packages/supervisor/src/environment.ts` (new)
- `packages/supervisor/src/index.ts` (new)
- `packages/supervisor/test/environment.test.ts` (new)
- `tsconfig.json` (B7 only)
- `bun.lock` (B7 only)

C2. The test file contains exactly the five tests the plan names, with these names:

1. `no ambient variable outside the allowlist survives`
2. `a missing required allowlisted variable is a typed failure`
3. `secret-marked values are redacted from diagnostics while their names are retained`
4. `redaction reports which rules ran`
5. `the same registration produces byte-identical environments on repeated calls`

Test 1 also asserts, for both production registrations, that each of the fourteen variables `PLAN-OPEN-2` excludes is absent, that a present optional variable is copied, that an absent optional variable is omitted, and that the keys follow the allowlist order. Test 2 also asserts that the error carries the name and no value, and that an unknown reference throws `UnknownEnvironmentAllowlistError`. Test 3 also asserts, with the fixture of B5, that no part of a longer secret value survives when a shorter secret value is part of it. Test 4 also asserts the rule names and their order, and the empty result for both production registrations. Test 5 also asserts that the ambient input is unchanged and the result is frozen.

C3. Every other path stays byte-identical to the binding base. No caller of the new functions, no change to `packages/protocol`, the registry or any other package, and no preflight, probe or launch code.

## Part D: Verification

D1. **Before the first edit,** stop and report unless: `origin/main` contains the binding base and every path changed since it is under `docs/`; this act and `DEC-20261010-02` are on `origin/main` with Status ISSUED and signed; the plan and `PLAN-OPEN-2` have the SHA-256 values in the header; and `packages/supervisor` does not exist at the binding base.

D2. **Baseline,** recorded verbatim: `bunx tsc --noEmit`, `bun test packages/protocol` and bare `bun test`, with the builder's host, Bun version, user and sandbox settings. B9 item 2 applies.

D3. **RED proof.** Write the five tests first, run the focused file with no implementation and record the failure verbatim; the plan expects `Cannot find module "../src/environment"`. After the implementation passes, record one deliberate break per test that makes that test fail, and these breaks: copy the whole ambient environment; read `process.env` instead of `ambient`; skip the required-variable check; put a value into `MissingRequiredVariableError`; replace shorter secret values before longer ones; and list only the rules that matched. Restore after each, confirm the file's SHA-256, and commit none of them.

D4. **After implementation:**

```bash
bunx tsc --noEmit
bun test packages/supervisor/test/environment.test.ts
bun test packages/protocol test/phase3a/architecture-phase3a.test.ts
bun test
git diff --check
git diff --name-only acab0dfadc4e4650ddeaadb836bc516156766848
```

`tsc` exits 0. The focused file shows exactly 5 passing. The protocol suite and the architecture tests pass. The full suite shows `0 fail`, or, inside a nested sandbox, exactly the failures B9 item 2 names and nothing else. `git diff --check` is clean. The changed-path list is exactly C1.

D5. The PR description gets a table that maps each of B1 to B8 to the assertion or check that pins it and to the commit SHA.

## Part E: Builder binding and review

E1. Assign:

```text
Role-Id: builder
Actor-Id: session:codex/m16-task37-r1
Execution-Surface: codex
```

E2. Work in a fresh, full clone named `madventures-tui-m16-task37-r1` in the home directory of the host the builder runs on, on a new branch `build/m16-task37-r1` at the binding base. The builder reports its host. Codex is not installed on the Ubuntu PC as `DEC-20261010-02` A2 records, so the builder runs on the MacBook unless I install it there first.

E3. Commit subject:

```text
feat(supervisor): build allowlisted environments with secret redaction
```

The commit and the PR description end with the E1 trailers, each line 72 characters or shorter. One commit.

E4. The builder makes no GitHub calls. It commits, saves the PR title and description outside the clone, and stops with its report: the commit SHA, the D2 baseline, the D3 RED proof and breaks, the D4 results and the D5 table. I then push the branch and open the draft pull request with that description, and that is not a deviation.

E5. **Review.** Before the PR leaves draft, a fresh `gemini-antigravity` session that has seen no Task 37 material reviews the exact head in its own clone on the Ubuntu PC, as `DEC-20261010-02` B7 requires, writes its full report to a file in one pass, and gets no guidance during the review. PASS only if all of these pass:

1. The five tests exist with the C2 names and assertions.
2. The allowlists and their table follow B1, and resolution follows B2.
3. Building follows B3.
4. Redaction follows B4, and the fixture path follows B5.
5. The exports follow B6.
6. The package, `tsconfig.json` and `bun.lock` follow B7, the changed paths are exactly C1, and the architecture tests are green.
7. No test asserts that code cannot read `process.env`.
8. The reviewer reproduces the D4 results and at least three of the D3 breaks.

E6. The verdict is recorded on the PR with the reviewer id and the exact head SHA, and entered in `docs/verification/phase-3a-correction-rounds.md` under plan milestone M16 and rubric milestone 4.

E7. The Part E review is task-level. Task 37 is the only task in M16, and the M16 review checkpoint closes only by a separate Founder act.

## Part F: Not authorized

- Leaving draft and merging: each needs a separate Founder act naming the exact head.
- M16 closure, M17, and every later task, including Task 45's preflight.
- Any caller of the new functions, any change to `packages/protocol` or the registry, and any allowlist, reference or registry entry beyond B1.
- Any change to `PLAN-OPEN-2`, the plan, a spec or a decision record.
- Running the review.

## Part G: Signature

Signed:

— Michael Daley

Date: 2026-10-10

Actor-Id: founder
