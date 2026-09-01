# Security Policy

This is a **private** MAD Ventures product repository. It is not an open
bounty program and it does not solicit public vulnerability reports.

The portfolio minimum controls live in FounderOS
`00-system/repository-security-standard.md`. Enforcement lives in this
repository. This file is the reporting policy, not a claim that every
control is already on.

## Supported versions

Only the default branch is in scope.

| Version | Supported |
| --- | --- |
| `main` | Yes |
| Any other branch, fork, or unpublished worktree | No |

There is no published numbered release. Do not treat a tag, a PR head, or
a local checkout as a supported version unless the Founder names it.

## Reporting a vulnerability

**Do not open a public GitHub issue, pull request, or discussion for a
security report.**

1. Prefer GitHub private vulnerability reporting if it is enabled on this
   repository: **Security → Report a vulnerability**.
2. Otherwise contact the repository owner, [@decivantiq](https://github.com/decivantiq),
   through a private channel. Do not include secrets, tokens, or customer
   data in the first message; say that you have a security report and wait
   for a channel that can hold it.

A report should include:

- the affected path, package, or workflow;
- the full commit SHA if known (40 characters, not abbreviated);
- reproduction steps that do not require production credentials;
- impact (what an attacker could do).

Do not include live secrets in the report. If a secret was exposed, say
that a rotation is required and name the credential class, not the value.

## What happens next

The Founder (or a Founder-delegated owner) triages the report. There is no
SLA published here. A leaked-secret finding is a **rotation event**, not
just a cleanup: rotate first, then record the rotation.

Fixes land through the same governed pull-request path as any other change
(`CONTRIBUTING.md`). A security report is not merge authorization.

## Scope

In scope: code, tests, CI, adapters, broker, PTY host, ledger, policy, and
workflows in this repository.

Out of scope unless the Founder says otherwise:

- social engineering, physical access, or denial-of-service;
- findings that require an already-compromised developer machine;
- issues that exist only in a discarded worktree or a closed pull request.

## Secrets in this repository

- Never commit `.env`, `.env.*`, keys, tokens, or credential files.
- Real values live in the deployment platform's secret store, not in git.
- CI must run without credentials unless a named phase requires a
  purpose-named secret.
- If you find a secret in history or in a diff, stop. Do not commit. Treat
  it as a rotation event and notify the Founder.

Enabling GitHub secret scanning, push protection, or Dependabot on this
repository is a Founder-only action (WF-17). This file does not authorize
those settings and does not claim they are currently enabled.

## Related files

- `CONTRIBUTING.md` — contribution and pre-commit secret-scan guidance
- `AGENTS.md` — agent operating rules for this repository
- `.github/CODEOWNERS` — default owner `@decivantiq`
