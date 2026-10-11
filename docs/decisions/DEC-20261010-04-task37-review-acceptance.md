FOUNDER-ACT-20261010-TASK37-REVIEW-ACCEPTANCE: Task 37 review verdict PASS accepted

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Pull request:** #134, branch `build/m16-task37-r1`, a draft
> **Head reviewed:** `6af09a91bd9f1d4a2b8129a51eb142a3991b6b48`
> **`origin/main` when drafted:** `7aa7a33d414c66f4c807f775172f32de84989a91`
> **Read with:** `DEC-20261010-03` (SHA-256 `b3af3e9b98381651aee31260759a886c0e1b232389ad5162f826608b4d8aef4c`) and item 3 of my merge authorization for PR #133, comment 6096989532, which is part of its D3; `DEC-20261010-02` (SHA-256 `cae5ac6b59618507f6ff3ef0f4d2cd5bca1909f328023248db8d234c4098b5a1`); `DEC-20261008-03` B3; plan sections 11.3 and 11.4
> **Verdict text of record:** my saved copy `/home/michaeldaley/m16-task37-r1-evidence/m16-task37-gemini-r1.md`, SHA-256 `3841221592796c3b573e308404de07667946154f4203f28092b9fb873d307f32`, 79 lines, 6,638 bytes
> **Builder prompt:** SHA-256 `6ed5048d7dd7792f26cac414d8cce357380064318895f248a7005123a3dae899`
> **Review prompt:** SHA-256 `5b82856ac4baad66ddbb2da1efd607f61dffdce75aede709bdb6b9f24ff924ac`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The build.** `session:codex/m16-task37-r1` committed `6af09a91bd9f1d4a2b8129a51eb142a3991b6b48` on `acab0dfadc4e4650ddeaadb836bc516156766848` under `DEC-20261010-03`, on my Ubuntu PC, with Bun 1.4.2. It changes exactly the six C1 paths, with 301 additions and 1 deletion, and ends with the E1 trailers. Under E4 I pushed the branch and opened draft PR #134 with the title and description the builder saved; the live description equals the saved file, SHA-256 `24b3c9ff0f9329ce1704c3eae76537158426bfa408d6a2048fc5588808ad147b`. Every check on the head succeeded, including Verify, Verify (macOS) and code-review. The builder's final report has SHA-256 `75ee0f1f45cef0e8d07fe4be9e51c0403858b46a466447f87ff74bb4aee1b4b8`, and its logs are kept in `/home/michaeldaley/m16-task37-r1-evidence`.

A2. **My rulings during the build.** The builder reported its harness as Codex and its model as the label the harness shows, GPT-6, which meets B9 item 1. It stopped and reported FOUNDER_DECISION_REQUIRED at each point below, and I answered in its session before it went on:

1. **Session skills.** Its Codex setup required two session skills that live outside the clone, `ai-psychiatry:all-the-medicine` and `superpowers:using-superpowers`, which its prompt barred it from reading. It stopped three times on this, once after a ruling of mine to ignore them, which its harness would not allow. I then ruled that it could read those two skills read-only, with the act and the prompt taking precedence. It read three skill files and the repository's own `build-gate` skill, and reported each path and SHA-256.
2. **Outside the sandbox.** Its sandbox made `.git` and Bun's cache read-only. I ruled that it ask my approval, one command at a time, to run `git fetch`, `bun install` and `git commit` outside the sandbox. No package was downloaded.
3. **The full suite outside the sandbox.** Inside the sandbox, the baseline failed because local sockets were denied with EPERM. I ruled those sandbox effects, and allowed the full-suite commands outside the sandbox with my approval. I also barred any process listing after it reported that one such command had shown the names of harness variables, not their values.
4. **Six Ubuntu host failures.** Outside the sandbox, the full suite at the unmodified base failed six tests: three F1/F2 real-run tests in `packages/tui-chaos`, the environment-forwarding test in `packages/broker`, and two lifecycle tests in `packages/pty-host/test/main-guard.test.ts`. I reproduced the same six in my own terminal outside Codex, at 1,572 pass and 6 fail in 1,578 tests across 97 files, log SHA-256 `43215130d8fb658abce637b2143a6fd08610a0b8790e9337f8118c0984d989e5`. I ruled them pre-existing Ubuntu host failures outside Task 37's scope, and that D4's full-suite check is met only if no test fails or errors other than those six, each failing as at the base. The builder's D4 full suite showed 1,577 pass and the same six.
5. **Test 2.** Its first green run failed because test 2 compared an error's full list of own properties, and Bun adds non-enumerable location properties to every error. I authorized it to replace that check with a scan showing that no planted ambient value appears in any property, the message, the stack or either string form, keeping the exact check on enumerable fields, and to restore the `tsconfig.json` final-newline convention.
6. **The unknown-reference check.** My ruling 5 wrongly kept the same check for the unknown reference unchanged. I corrected it the same way, and added a break that puts an ambient value into `UnknownEnvironmentAllowlistError`.
7. **A type error.** `tsc` rejected a test helper's return type. I authorized the type change, gave standing permission to fix defects of that kind in its own uncommitted files without changing what an assertion proves, and required all breaks to be rerun against the committed files.

A3. **The build's evidence.** The RED proof failed on the missing module, as the plan expects. All eleven breaks of D3, read with item 3, failed at least one test, each with the test reported, and so did the additional break of A2 item 6. All twelve were rerun against the committed files. D4: `tsc` exit 0; the focused file at 5 pass; the protocol suite and the architecture tests at 195 pass and 0 fail; `git diff --check` clean; and the changed paths exactly C1. `bun.lock` differs from the base only by the lines for the new workspace, after the builder restored the separator B7 names.

A4. **The verdict.** A fresh session under reviewer id `gemini-antigravity`, reporting its surface as the Antigravity CLI and its model as Gemini 3.1 Pro (High), reviewed the head in its own clone on my Ubuntu PC and received no guidance during its work. It returned PASS on all eight items of E5, with no findings. It reports `tsc` exit 0; the focused file at 5 pass; the protocol suite and the architecture tests at 195 pass and 0 fail; and the changed paths exactly C1. Its full suite showed 1,580 pass and 3 fail at the head and 1,575 pass and 3 fail at the base, the same three tests failing the same way at both: the environment-forwarding test and the two lifecycle tests of A2 item 4. The three F1/F2 tests passed in its run. Each of the six named breaks failed a test, matching the builder's report. Its probes cover both production registrations against the fourteen excluded variables, a missing required variable, an unknown reference, a variable set only in `process.env`, production and fixture redaction, freezing, an unchanged input and byte-identical repeat calls. It found no implementation that breaks a ruling while the five tests pass.

A5. **Gaps in the verdict.** It summarizes where the prompt required verbatim output: Bun's printed lines, and each probe's input as code with its output. It does not say whether any command ran outside a sandbox, does not show the act's SHA-256 on `main`, and leaves out the statement of the B10 consequence. Its item 2 describes building rules that belong to B3. The report was copied into my evidence folder and hashed on my machine at my direction; the values are in the header.

A6. **The review's setup.** A first review session started outside the reviewer clone, which did not yet exist, and returned INCONCLUSIVE before reading any code. Its report is kept as `m16-task37-gemini-r1-attempt1-inconclusive.md`, SHA-256 `9256b8aa68c8e9d8f87be5bf6e9b28e97c468acb71e4aaab59c17954b386a15b`. That session reported the model Gemini 3.8 Flash (High). B10 names the reviewer id `gemini-antigravity` and no model. I directed that the Gemini model does not matter for this review, and the review prompt's first line was changed from `gemini-3.1-pro-high` to any Gemini model, with nothing else changed.

A7. **Process notes owed.** These belong to earlier pull requests and are recorded here:

1. On PR #132, my ready-for-review authorization, comment 6093876958, named head `268bce015984ce1f318f3fa848342b4ced1a4063`, and the pull request left draft under it. Revision 2 was then pushed as `2c7fc6201363760ac3bef67b54c04b703d0846ae`, which voided that authorization. My merge authorization, comment 6096500870, named the revision 2 head. Before merging I re-ran code-review run 38025896154, an earlier failed run that held the merge, which that authorization did not name.
2. PR #133 merged on 2026-10-10 while GitHub reported the merge state unstable, under my signed addendum, comment 6097337800. The only runs on its head that had not succeeded were code-review runs 38025291385 and 38025291538, held for approval after Copilot's review. They were never approved or run.
3. Several guarded commands I ran earlier in this work were written as a subshell with `set -e` followed by an `||` fallback, which does not stop on a failed step. Each outcome was verified afterwards and no harm was found. Guarded commands now run as `bash -ec`.

A8. **The drafting assistant.** It wrote the builder prompt, the review prompt and the wording of the rulings in A2. What it checked itself: the PR head, parent and branch; the six paths and the diff stat; the `bun.lock`, `tsconfig.json`, `package.json` and `index.ts` diffs; the live description against the saved file; the trailers; the checks on the head; and the history of PR #132 and PR #133 in A7. It did not read the implementation or the test file in detail, and it ran no test. None of that is an independent review.

## Part B: Founder rulings

B1. **Verdict accepted.** The PASS at `6af09a91bd9f1d4a2b8129a51eb142a3991b6b48` is accepted. It adds no round. Rubric milestone 1 stays at 5 and rubric milestone 4 at 3. `DEC-20261010-03` B10 is not triggered.

B2. **The gaps in A5** are recorded and accepted. The decisive results are reported and agree with the builder's evidence and my own terminal run: the counts, the changed paths, the base comparison and the breaks.

B3. **The rulings in A2 stand,** and the deviations they record are accepted. My push and pull request under E4 are not deviations. The INCONCLUSIVE attempt in A6 is not a verdict and adds no round.

B4. **Linux evidence.** The six failures of A2 item 4 are recorded as the first Ubuntu PC evidence under `DEC-20261010-02`. That three of them passed in the reviewer's run suggests they depend on the environment they run in. They are not taken up under this act. A separate Founder act takes them up before the Ubuntu spike run of `DEC-20261010-02` B2.

B5. **The notes in A7 are accepted.** The comments in A7 stay as posted. The re-run in A7 item 1 and the unstable merge in A7 item 2 are not precedent.

B6. **What follows.** After this act is on `main` and the verdict is posted under C2, separate Founder acts naming the exact head may mark PR #134 ready for review and merge it. This act authorizes neither. The M16 review checkpoint closes only by a separate Founder act after Task 37 is on `main` (`DEC-20261010-03` E7).

## Part C: Filing and recording

C1. One docs-only pull request files this act and appends an entry to `docs/verification/phase-3a-correction-rounds.md`, and changes nothing else. The entry records the head, the reviewer id, the verdict SHA-256, PASS, no round added, the counts unchanged, the gaps in A5, the rulings in A2, the attempt in A6 and the Linux evidence in B4.

C2. After that pull request merges, the verdict text is posted verbatim on PR #134 as one comment, with a header naming the head, its SHA-256 and this act. Nothing else is posted on PR #134 with it.

## Part D: Not authorized

- Leaving draft, approving or merging PR #134: each needs a separate Founder act naming the exact head.
- Any change to code, tests, `bun.lock`, a manifest, the plan or a spec.
- Taking up the six Ubuntu host failures.
- M16 closure, M17 and every later task.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-10

Actor-Id: founder
