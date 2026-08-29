# WF-17 Ground-Truth Check — Security Controls (recorded 2026-08-28; Founder check run 2026-08-29T02:15:58Z)

**Context:** Pre-authorization ground-truth check for `HO-20260822-01` (WF-17
run against `madventures-tui`), ahead of the Founder's WF-17 authorization.
Two checks were run against the same command and repository state: one in
the governed environment (this Claude Code session), one by the Founder in
a personal terminal session. Both results are preserved below, unedited.

## Authoritative result — Founder personal terminal session

Run 2026-08-29T02:15:58Z, environment: personal terminal (non-governed).
Command block and output as captured by the Founder:

```sh
{
  echo "# WF-17 Authorization Pre-Check Evidence"
  echo ""
  echo "Date: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "Founder: Michael Daley"
  echo "Environment: personal terminal (non-governed)"
  echo ""
  echo "## Token scope"
  echo '```'
  gh auth status
  echo '```'
  echo ""
  echo "## Default branch and head SHA"
  echo '```'
  echo "default_branch:"
  gh api repos/MADVenturesLLC/madventures-tui --jq '.default_branch'
  echo ""
  echo "main head SHA:"
  gh api repos/MADVenturesLLC/madventures-tui/branches/main --jq '.commit.sha'
  echo '```'
  echo ""
  echo "## Security controls state"
  echo '```'
  gh api repos/MADVenturesLLC/madventures-tui --jq '.security_and_analysis'
  echo '```'
} > security-analysis-precheck.md
```

Captured output (`security-analysis-precheck.md`):

````text
# WF-17 Authorization Pre-Check Evidence

Date: 2026-08-29T02:15:58Z
Founder: Michael Daley
Environment: personal terminal (non-governed)

## Token scope
```
github.com
  ✓ Logged in to github.com account decivantiq (keyring)
  - Active account: true
  - Git operations protocol: https
  - Token: gho_************************************
  - Token scopes: 'gist', 'read:org', 'repo', 'workflow'
```

## Default branch and head SHA
```
default_branch:
main

main head SHA:
7001409894c3757b2c77b307c2758ca15b3a064d
```

## Security controls state
```
{"code_security":{"status":"disabled"},"dependabot_security_updates":{"status":"disabled"},"secret_scanning":{"status":"disabled"},"secret_scanning_non_provider_patterns":{"status":"disabled"},"secret_scanning_push_protection":{"status":"disabled"},"secret_scanning_validity_checks":{"status":"disabled"}}
```
````

**Findings, this run:**

- Token: OAuth (`gho_...`) on the `decivantiq` keyring account, scopes
  `gist`, `read:org`, `repo`, `workflow`. The `repo` scope was sufficient
  for GitHub to return the full `security_and_analysis` object.
- `main` head SHA confirmed: `7001409894c3757b2c77b307c2758ca15b3a064d`
  (the PR #30 merge commit) — current at time of check, and unchanged as
  of this authorization.
- All six controls confirmed **disabled**: `code_security`,
  `dependabot_security_updates`, `secret_scanning`,
  `secret_scanning_non_provider_patterns`, `secret_scanning_push_protection`,
  `secret_scanning_validity_checks`.
- Source file, personal terminal: `~/madventures-tui-diag-evidence/sessions/wf-17-authorization-precheck/security-analysis-precheck.md`.
  This document embeds that file's full content directly, not a pointer to
  it, so the repository carries the complete record independent of that
  local path.

## Governed-environment cross-check (this session, 2026-08-28)

The same underlying command, run under this session's active credential
(`GH_TOKEN`, a fine-grained PAT), before the Founder's personal-terminal
check existed:

```sh
$ gh api repos/MADVenturesLLC/madventures-tui --jq '{private, visibility, security_and_analysis}'
{"private":true,"security_and_analysis":null,"visibility":"private"}

$ gh api repos/MADVenturesLLC/madventures-tui --jq '.permissions'
{"admin":true,"maintain":true,"pull":true,"push":true,"triage":true}

$ gh api repos/MADVenturesLLC/madventures-tui/vulnerability-alerts -i
HTTP/2.0 403 Forbidden

$ gh api repos/MADVenturesLLC/madventures-tui/branches/main/protection -i
HTTP/2.0 403 Forbidden
```

**Why this session returned `null` instead of the six per-control
fields.** This session's `gh` identity holds two credentials for the same
`decivantiq` account: the active fine-grained PAT (`github_pat_...`), and
the same OAuth token (`gho_...`, scopes `gist`/`read:org`/`repo`/`workflow`)
the Founder's personal terminal used, present but not active in this
session. The `.permissions.admin: true` field reflects the account's
role-based repository permission, which fine-grained PATs do not
automatically inherit — a fine-grained PAT only sees what it was
explicitly granted at creation. This one was not granted repository
Administration / security-events read, so GitHub returned `null` for the
whole `security_and_analysis` object and `403` on the two other
admin-gated endpoints tested, rather than an object with explicit
`disabled` fields.

**This is a fact of the governed environment's credential scope, not a
bug and not a contradiction of the Founder's result.** The governed
environment's fine-grained PAT is deliberately narrower than the
Founder's personal OAuth token; the `null`/`403` responses are the
expected behavior of that narrower grant, not evidence that the controls
are in some third, different state. Both observations are preserved here
as independent, non-conflicting facts about two different credentials
checking the same repository at the same commit.

## Independently corroborated by this session

- No WF-17 evidence found anywhere in `madventures-tui` or in MAD Ventures
  OS (`grep -rli "wf-17\|wf17"` across both trees) — only the existing
  scheduling references in `DEC-20260820-01` and `HO-20260822-01`, no run
  record.
- PR #30 (M18, "feat(pty-host): complete M18 private PTY host foundation")
  is merged; its merge commit `7001409894c3757b2c77b307c2758ca15b3a064d`
  is the current `main` tip — the same SHA the Founder's check confirmed.

## Provenance note

The six-controls-disabled finding and the head-SHA confirmation are the
Founder's own personal-terminal result, embedded here in full. The
governed-environment `null`/`403` result is this session's own,
independently observed. Neither is edited to match the other.
