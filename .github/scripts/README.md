# `.github/scripts/` — vendored CI checkers

## `attribution-shape-check.sh`

A **byte-identical vendored copy** of the canonical MAD Ventures OS attribution
checker. It is not maintained here.

| | |
|---|---|
| Canonical path | `MADVenturesLLC/FounderOS` → `00-system/scripts/attribution-shape-check.sh` |
| Vendored from | FounderOS `main` at `2960ed3027262bff59a539587fd92a3b4115a6a2` |
| Script last changed by | FounderOS `376fc0117a6e5d00b7261a0e6489c010ea4c926a` (2026-09-21, attribution lines matched one for one to git's trailers) |
| `sha256` | `6eeaf709c6b446556af3fe785b0877166e729996a833db61d4616934f50a7f2e` |

### Re-vendor history

| Date | From | To | Why |
|---|---|---|---|
| 2026-09-21 | `5f257ec45b2afae101f2d3350d12ee7b2bad8f9c604bec744a7031241f6379e9` | `ebda0fa2c0fa52e3b946fa3aa8b25d3f0096ae32bdc5e0471eba41718c20494e` | FounderOS PR #353 closed four fail-opens in the checker and its workflow: an unenumerable commit range reported PASS having examined nothing; `Role-Id-Secondary` was unvalidated on commits in `pr` and `main` mode, including on non-applicable commits; the PR-body sanitizer was itself a bypass; and the PR's own self-test ran before the body gate. Selftests 26 to 41. Merged as `9d4ab792b64daf4ea909fcda30fbbc04677a68ad` after an independent Tier-2 review at the exact head. This is the first exercise of the re-vendor procedure below, and it worked as intended: the defect was fixed canonically, merged, then copied down. |
| 2026-09-22 | `ebda0fa2c0fa52e3b946fa3aa8b25d3f0096ae32bdc5e0471eba41718c20494e` | `6eeaf709c6b446556af3fe785b0877166e729996a833db61d4616934f50a7f2e` | FounderOS PR #356 closed the `prbody` divider blind spot (a bare `---` anywhere in the body, or a divider-shaped PR title, strips every trailer from the merge commit while an end-anchored gate stays green; measured on FounderOS #355 and on this repository's `c3c7d9fe21036b8d90c9d2bf0feabf5e7d9df624`), closed the `Execution-Surface` asymmetry (the commit path now requires it wherever `Role-Id` is present, `unknown` accepted, as `prbody` always did), and made every attribution value come from `git interpret-trailers --parse` with a one-for-one multiset match against the raw lines. Selftests 41 to 81. Merged as `2960ed3027262bff59a539587fd92a3b4115a6a2` after an independent Tier-2 review at the exact head (static, the reviewer could not execute) and the Founder's SHA-named authorization. Second exercise of the procedure. The three workflow hardenings from the same PR (`PR_TITLE` on the body gate, head-object bootstrap, enforcing proposed-revision step) are ported into this repository's own workflow file in the same pull request, not vendored. |

### Rules

1. **Never edit this copy in place.** Change the canonical FounderOS copy first,
   get that change merged there, then re-vendor here in a separate commit that
   updates this table. Editing here silently forks the gate between repositories,
   which is the failure this file exists to prevent.
2. **Keep it byte-identical.** Divergence is then a single hash comparison rather
   than a diff review. Repository-specific adaptation belongs in
   `.github/workflows/attribution-shape.yml` (paths, runner, triggers), never in
   the checker.
3. `ROLE_ID_REGEX` inside the script must stay in sync with the roster in
   FounderOS `/04-agents/role-registry.md`. Its omission of
   `investment-acquisition-lead` is deliberate — that role is
   `activation_status: deferred`, and excluding it is how the non-attributability
   invariant is enforced rather than merely documented. Do not "fix" it here.

### Drift check

Run from a checkout that has both repositories side by side:

```sh
shasum -a 256 \
  FounderOS/00-system/scripts/attribution-shape-check.sh \
  madventures-tui/.github/scripts/attribution-shape-check.sh
```

Both hashes must match the table above. If FounderOS has moved, re-vendor; if
only this copy has moved, it was edited in place — revert it.

### What the checker does

Shape-only validation of the Attribution block (`DEC-20260718-05` clause 19,
hardened by `DEC-20260721-01`). It validates **form, never truth**: it cannot
tell whether an attested `Role-Id` is accurate, only whether the block is
well-formed. Modes: `pr`, `main`, `prbody`, `selftest` — see the script header.
