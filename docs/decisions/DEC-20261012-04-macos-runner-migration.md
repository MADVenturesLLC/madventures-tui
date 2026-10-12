FOUNDER-ACT-20261012-MACOS-RUNNER-MIGRATION: the two macOS CI jobs moved from macos-14 to macos-15

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `03dda124e9d6faa59abda6a3817410bcdf1765f8`
> **Ratifies:** the patch with SHA-256 `73fc8f1532a41f7a2802790ea8bf0628db035ee961b39f9794d30ecfab647be5` (1,815 bytes) against the three files in A3
> **Read with:** spec §1.5, `CONTRIBUTING.md`, `AGENTS.md`, `.github/actions/setup-qualified-bun/action.yml`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What was reported.** On 2026-10-12 I received a notice that GitHub is retiring its `macos-14` hosted runner image, citing issue 13518 of `actions/runner-images`, and that runs on `macos-14` would be interrupted that day from 14:00 to 24:00 UTC. The drafting assistant could not read that issue, and this act does not depend on the notice's dates. It depends only on the facts in A2 and A3.

A2. **What runs on `macos-14`.** On `main` at `03dda124e9d6faa59abda6a3817410bcdf1765f8`, two jobs name `runs-on: macos-14`: `Verify (macOS)` in `.github/workflows/verify.yml`, and `tui-chaos (macOS)` in `.github/workflows/tui-chaos.yml`. `CONTRIBUTING.md` and `AGENTS.md` list `Verify (macOS)` among the required checks of the `main-governed-merge` ruleset, and my merge authorizations name it as required. If GitHub stops running `macos-14`, that required check cannot pass, and no pull request can merge.

A3. **The change.** The patch in the header makes four one-line changes:

| File | Change | SHA-256 before | SHA-256 after |
| --- | --- | --- | --- |
| `.github/workflows/verify.yml` | `runs-on: macos-14` to `runs-on: macos-15`, and the comment "macos-14 is Apple Silicon" to "macos-15 is Apple Silicon" | `0ab7899bc29b188dbfe65266416100dabf9a2e4813656f169d87996c3c731053` | `7709f6011ecf77ef569983b868b513d788f57d026af38f47cbbdd9273c90a37c` |
| `.github/workflows/tui-chaos.yml` | `runs-on: macos-14` to `runs-on: macos-15` | `175ccf02e3371bfdb39cdad1a8365aab548333a8f3dc0455fb8dc95343064f9e` | `91d2eb433926d50e27bf3922ff329ab37f36ff60c7d20bdcf9a081b11b72ac8f` |
| `CONTRIBUTING.md` | "macOS-14" to "macOS-15" in the CI sentence | `0076434efea3a125903f65dc5c46a70f18ca7e27d7e47f2490ecb8fc0ccf8db0` | `f13e024d24cfcf2f0f4aaba39bd6b11b18bdee389fcbcf15f3e3ad78becd9781` |

Job ids, job names, steps, timeouts, action pins, the Bun setup and its secret are unchanged. After the patch, no file under `.github/`, nor `CONTRIBUTING.md` or `AGENTS.md`, names `macos-14`.

A4. **Why `macos-15`.** `.github/actions/setup-qualified-bun` installs the custodied Bun only on `Linux-x86_64` and `Darwin-arm64`, and stops with an error on any other platform. A macOS lane must therefore run on Apple Silicon unless that action changes. `macos-15` is GitHub's Apple Silicon label for macOS 15. The lane stays Apple Silicon only, as the comment in `verify.yml` already says, and a green "Setup Bun" step on the new runner shows that it is `Darwin-arm64`.

A5. **What is not touched.** Spec §1.5 says the required checks Verify and Verify (macOS) run on `ubuntu-24.04` and `macos-14`. CI runners are not certification hosts under that section, and certification is unaffected. The spec is not amended by this act.

A6. **The drafting assistant.** It drafted this act and the patch, read the three files and the Bun setup action, and checked the hashes in A3. It ran no workflow. None of that is an independent review.

## Part B: Founder rulings

B1. **Ratification.** I ratify the patch in the header. It takes effect when it is on `main` together with this act.

B2. **Required checks keep their names.** The check names `Verify (macOS)` and `tui-chaos (macOS)` are unchanged. Every ruling, ruleset and authorization that names them applies to the jobs on `macos-15`.

B3. **Proof on the filing pull request.** A pull request's checks run from the workflows in that pull request, so the filing pull request runs both macOS jobs on `macos-15`. It merges only when both succeed there, with every other required check, under my separate merge authorization. Each authorization for it states the runner label of both macOS jobs as GitHub reports it.

B4. **The spec.** Until the spec is next amended, the mention of `macos-14` in spec §1.5 is read as the runner that `.github/workflows/verify.yml` names on `main`.

B5. **The Intel lane.** Whether to add an Intel macOS lane stays open. This act does not decide it.

B6. **Other acts.** This act changes nothing in `DEC-20261012-03`. Its Part D still binds the build and the check it authorizes.

B7. **Counting.** This is a new Founder ruling, which plan §11.3 does not count. Rubric milestone 1 stays at **5** and rubric milestone 4 at **3**.

## Part C: Filing

C1. One pull request files this act, applies the patch to the three files in A3, and changes nothing else.

C2. If a `macos-14` run fails on another pull request before this act is on `main`, because GitHub did not run it, that failure is not a defect of that pull request. The run may be re-run once after the interruption ends. No merge proceeds unless the required checks succeed.

## Part D: Not authorized

- Any change to a step, action, pin, secret, timeout, job id or job name of any workflow, or to `.github/actions/setup-qualified-bun`.
- Any change to the spec, the plan, `PLAN-OPEN-2` or `AGENTS.md`.
- An Intel macOS lane, or any other runner change.
- Any change to code, tests, `bun.lock` or a manifest.
- Any act on the open items of `DEC-20261012-03`, Task 45 and every later task.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-12

Actor-Id: founder
