# AGENTS.md — apps/seal-studio

Seal Studio v0 (`GLM-20260913-SEAL-STUDIO-V0`) — a Founder-authorized
off-roadmap joy surface: the moment of commitment. Compose a FounderActV0
draft, watch its integrity hash settle live, seal through the two-step
ritual. Port 5183 (`bun run seal-studio`).

## Claim boundary

- Allowed claims: `SEAL_STUDIO_V0`, `FOUNDER_JOY_SURFACE`.
- Forbidden claims: `PHASE_0`, `OCCUPANCY_PROOF`, `GATEWAY_HONESTY`,
  `ROOM_RUNTIME`, and any claim of a cryptographic signature / Keychain /
  non-repudiation. The UI says "integrity hash/seal" — never more than a
  hash can prove. A test fails the suite if the overclaim words appear.

## Hard locks

- Seals go through `@mad/founder-act`'s `sealAct` core only. The bridge
  (`src/lib/seal-bridge.ts`) refuses any request whose `confirmed` is not
  exactly `true`; `--founder-confirm`-equivalent gating lives here and in the
  ritual UI, never synthesized elsewhere. The Founder's own seal requires the
  human at the checkbox + hold.
- Writes are confined to `<repoRoot>/.mad/founder-acts/` (gitignored),
  exclusive-create, content-addressed `<act_sha256>.json` — the same
  discipline as the CLI's `runSeal`. No process spawn anywhere in the app.
- The seal endpoint (`POST /api/seal`) exists only in `vite` dev
  (`configureServer`). Built output (`vite build` / `preview`) ships none.
- The client bundle never imports `@mad/founder-act` (it is node-crypto
  backed). `src/lib/canonical.ts` is a byte-exact browser twin, pinned by
  test against the package.
- Demo fixtures use actor `"demo"` and are labeled "not Founder authority".
  kind `other_named` stays a CLI affordance (allowlist file) — not in the UI.
- No network beyond this app's own dev middleware. No gateway daemon, no
  AE-01, no Phase 0, no MadBridge TUI edits, no founder-act file edits.

## The identity trick

The studio fixes `id` + `issued_at` when a draft opens and passes both
through to the seal (`--id` / `--issued-at` semantics of the core). That
makes the live browser hash EXACTLY the hash the seal writes — the preview
never lies. `test/act-draft.test.ts` proves parity against the real core.

## Keys

Tab through fields · `meta/ctrl+enter` attempts the seal (gated like every
other path) · hold-to-seal (~1.2s sustained press) · deep link
`/?kind=commission&subject=…&scope=a,b&head_sha=…&reason_code=…&actor=…`.
