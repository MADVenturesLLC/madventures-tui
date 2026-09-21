# `.github/scripts/` — vendored CI checkers

## `attribution-shape-check.sh`

A **byte-identical vendored copy** of the canonical MAD Ventures OS attribution
checker. It is not maintained here.

| | |
|---|---|
| Canonical path | `MADVenturesLLC/FounderOS` → `00-system/scripts/attribution-shape-check.sh` |
| Vendored from | FounderOS `main` at `ec6a51383f14d1438ba5235990e491f03ee1b1e1` |
| Script last changed by | FounderOS `5e0afef489f6875a6fb3408997d26fbdaa4e5991` (2026-08-12, DEC-20260812-03 ratification) |
| `sha256` | `5f257ec45b2afae101f2d3350d12ee7b2bad8f9c604bec744a7031241f6379e9` |

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
