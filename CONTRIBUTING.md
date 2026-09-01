# Contributing

This is a **private**, founder-governed product repository
(`MADVenturesLLC/madventures-tui`). It is not open-source. Unsolicited
external contributions are not accepted.

Authorized work is performed by the Founder or by agents acting in the
`builder` role under a written Founder authorization. "I have the repo
cloned" is not authorization.

Agents: read `AGENTS.md` before doing any work.

## How work enters this repository

1. Branch from a clean `origin/main`. Never branch implementation work from
   a retained qualification or experiment branch.
2. Keep the change inside the authorized scope. Do not renovate adjacent
   files.
3. Verify locally before opening a pull request:

   ```bash
   bun install --frozen-lockfile
   bunx tsc --noEmit
   bun test
   git diff --check
   ```

   `bun run verify` runs typecheck then tests. Measure suite counts from
   that live run. Do not copy numbers from `README.md` or `docs/STATUS.md`.
4. Push the branch and open a **draft** pull request against `main`.
5. Required status checks on `main` (both branch protection and ruleset
   `main-governed-merge`): `Verify`, `Verify (macOS)`, `code-review`.
6. Merge happens only after a Founder-authored authorization that names the
   **exact** head SHA (full 40 characters). Green CI is not merge
   authorization. Do not push to `main`. Do not use `--admin` unless the
   Founder explicitly directs it.

In-repo skill `.agents/skills/build-gate/` is the fail-closed exact-SHA
gate used when preparing to push, open a PR, or declare a build complete.

## Pull requests

- One logical change per pull request.
- Title uses conventional commits (`feat:`, `fix:`, `docs:`, `test:`,
  `chore:`).
- Body states scope, what was verified, and what was not authorized.
- Corrections to a head already reported to the Founder land as a **new
  commit**, not an amend of the reported commit.
- Do not resolve review threads unless the Founder directs it.
- Code owners: `.github/CODEOWNERS` assigns `@decivantiq`. Draft pull
  requests do not auto-request that review; marking the PR ready for
  review does. Require-code-owner-review is currently off on `main`.

## Attribution

`DEC-20260820-01` binds this repository to FounderOS `DEC-20260718-05`.
Role-accountable commits and pull-request bodies carry:

```
Role-Id: <role from the originating assignment; never self-selected>
Actor-Id: <who performed the work; never a bare role name>
Execution-Surface: <registered surface_id when known>
```

`founder` is not a valid `Role-Id`. Direct-founder work uses
`Actor-Id: founder` alone. Never attribute agent-authored work to the
Founder.

Keep the raw trailer block at column 0 at the end of the pull-request
body. File writes go through local git (edit → commit → push). Never use a
GitHub API file-write tool to land content.

## Secret scanning (required before commit)

This repository does not install a mandatory pre-commit hook. The control
is still required (`repository-security-standard` / WF-17): scan the
staged diff yourself before every commit.

```bash
git diff --cached -U0 | grep -iE 'password|secret|api[_-]?key|token|BEGIN (RSA |OPENSSH )?PRIVATE|AKIA[0-9A-Z]{16}'
```

A hit is a **rotation event**, not just a cleanup. Do not commit. Do not
rewrite the value out of the diff and proceed. Rotate the credential, tell
the Founder, and only then continue.

Never add `.env`, `.env.*`, keys, PEM files, or credential dumps. Those
paths belong in `.gitignore`. Values belong in the deployment platform's
secret store.

See `SECURITY.md` for how to report a vulnerability. Do not open a public
issue for a security report.

## Local toolchain

- Bun 1.3.x (CI uses the qualified Bun composite action under
  `.github/actions/setup-qualified-bun`).
- TypeScript via `bunx tsc --noEmit`.
- Tests via `bun test`.

CI runs on pull requests to `main` (Ubuntu `Verify` and macOS-14
`Verify (macOS)`). It must run without credentials unless a named phase
requires a purpose-named secret.

## What this file does not do

- It does not invite public contributions.
- It does not authorize a Phase 3A task, a merge, a deploy, or a live
  runtime.
- It does not enable GitHub secret scanning, push protection, or
  required code-owner reviews. Those are Founder-only settings.
- It does not replace `AGENTS.md`.
