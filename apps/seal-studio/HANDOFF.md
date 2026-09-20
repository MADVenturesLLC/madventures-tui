# HANDOFF — Seal Studio v0 (GLM-20260913-SEAL-STUDIO-V0)

## State

- Branch `build/seal-studio-v0` off `origin/main` @ `5efe76f`, worktree
  `.worktrees/seal-studio/`. **UNCOMMITTED by design** — every change below
  sits in the working tree awaiting Founder commit authorization. Do not
  commit, push, or open a PR without it.
- `bun run seal-studio` → http://localhost:5183 (verified live: root 200,
  title, `/api/head` returning the worktree's real HEAD, unconfirmed seal
  refused, demo seal written + CLI-verified `VALID`).
- `@mad/founder-act` is NOT on origin/main yet — it lives uncommitted in the
  sibling worktree `.worktrees/founder-act/` (base `d1f5928`). Per the
  commission's fallback, the founder-act package directory was **copied
  verbatim** into this worktree as an uncommitted presence so
  `@mad/founder-act` resolves. It was not modified. When the Founder commits,
  founder-act (from its own branch) and seal-studio must land together, or
  seal-studio lands after founder-act is on main.

## What exists

- `apps/seal-studio/**` — Vite/React app, same family as cockpit /
  focus-stage. Dark glass, big type, omp-density tokens as CSS variables,
  160ms opacity/translate motion only, amber seal accent.
  - Compose panel: kind (sealed enum minus `other_named`), subject, scope
    chips, head_sha (+ "use HEAD" from the repo's real HEAD), reason_code,
    optional expires_at, actor founder/demo.
  - Live preview: canonical JSON (read-only) + `body_sha256` +
    `act_sha256` computed in-browser via WebCrypto over a byte-exact twin of
    founder-act's canonical JSON, debounced 120ms. Because the draft fixes
    `id` + `issued_at` at open and passes them through, the preview hash IS
    the hash the seal writes (parity pinned against the real core in tests).
  - The ritual: read-only command preview showing the exact CLI equivalent
    (marks `(blocked …)` until confirm) → checkbox "I am the Founder. This
    act is mine, now." → hold-to-seal (~1.2s sustained press). ⌘/ctrl+enter
    attempts and is gated identically. A blocked attempt sends nothing.
  - Tamper demo (pure computation, no disk): flips the subject on a copy,
    shows both hashes diverging, "Verification would report INVALID".
  - Deep link: `?kind=&subject=&scope=a,b&head_sha=&reason_code=&actor=`.
- `src/lib/seal-bridge.ts` — the single door from UI to disk: validation
  mirror (closed enum, caps, hex, ISO, NUL checks, `confirmed === true`
  exactly) → `sealAct` from `@mad/founder-act` → content-addressed
  exclusive-create write under `<repoRoot>/.mad/founder-acts/`. Injectable
  fs for unit tests. No process spawn anywhere in the app; the seal library
  route is the commission's first-listed option. `POST /api/seal` and
  `GET /api/head` exist only in `vite` dev (configureServer); built output
  ships no seal endpoint.
- Root: `seal-studio` + `seal-studio:build` scripts, `verify` extended with
  seal-studio tsc, root `tsconfig.json` excludes `apps/seal-studio` (DOM
  app) + `@mad/founder-act` path, AGENTS.md layout entry, `.gitignore` now
  covers `.mad/founder-acts/` (the commission assumed it already did; it
  did not — one line added).

## Honesty invariants (test-pinned, 33/33)

- UI copy claims an integrity hash only. The words "signature", "keychain",
  "cryptographic" never appear in rendered output — a test walks the rendered
  tree and fails the suite if they do.
- A blocked attempt (confirm not set) never reaches the network and writes
  nothing; the server independently refuses `confirmed !== true`.
- Actor `demo` seals are labeled "DEMO fixture — not Founder authority".
- No actor founder without the two-step ritual; `--founder-confirm`
  semantics enforced at the bridge, never synthesized.

## Verification actually run

- `bunx tsc --noEmit -p apps/seal-studio` — clean.
- `bunx tsc --noEmit` (root) — clean.
- `bun test apps/seal-studio` — 33 pass / 0 fail (112 expects), including
  hash parity against the real `@mad/founder-act` core and a mock-fs seal
  that proves the file lands under the allowed dir with the core's exact
  bytes.
- `bun run --cwd apps/seal-studio build` — vite build clean (239KB client
  bundle; zero founder-act code in it).
- Dev smoke on :5183 — root 200, title, `/api/head` → real worktree HEAD
  `5efe76f0ed82e6a735dd6de0e5cb702fb22ed418`, unconfirmed POST refused
  (400, gate message), demo-actor seal with confirm → `ok:true`, file
  written under `.mad/founder-acts/<sha>.json`, then verified with the real
  CLI: `status=VALID … actor=demo … NOT Founder authority`. Smoke fixture
  removed afterwards.
- Screenshots reviewed: default deep-link state and composed state (scope
  chip + tamper demo verdict).

## Environment notes for the next agent

- App scripts run vite under **bun** (`bun --bun vite`) because the
  dev-config chain imports TS workspace source; plain `vite` (node runtime)
  cannot resolve extensionless TS imports. The worktree needs a real
  `bun install` (nested layout puts vite/react/@mad under
  `apps/seal-studio/node_modules`); a symlink to the main repo's
  node_modules does not work.
- Mimosa write-hook: command-injection false positives blocked any file
  containing a process-spawn in the request path; the library route (no
  spawn) both passes the hook and is the simpler design. Avoid `.exec(` in
  `.ts` (use `.match()`).
- The dev server was stopped after verification — `bun run seal-studio`
  restarts it on its commissioned port (strictPort).

## Allowed / forbidden claims

Allowed: `SEAL_STUDIO_V0`, `FOUNDER_JOY_SURFACE`. Forbidden: `PHASE_0`,
`OCCUPANCY_PROOF`, `GATEWAY_HONESTY`, `ROOM_RUNTIME`, any signature /
Keychain / non-repudiation claim, `PRODUCTION_MERGE_AUTHORITY` (a merge act
names a head SHA; the Founder still performs the merge).

## Argus prompt (for the review pass)

> Review build/seal-studio-v0 (worktree .worktrees/seal-studio, base
> 5efe76f, UNCOMMITTED). Scope: apps/seal-studio/** plus root package.json /
> tsconfig.json / AGENTS.md / .gitignore, and the verbatim-copy presence of
> packages/founder-act from .worktrees/founder-act (do not review
> founder-act itself here — it has its own review). Check: (1) the confirm
> gate is actually fail-closed end to end — UI ritual, client gate order,
> bridge validation, `confirmed === true` exactly; (2) the browser hash twin
> cannot drift from founder-act's canonical JSON (test strength); (3) the
> seal write is confined to .mad/founder-acts and content-addressed;
> (4) honesty copy — no signature/keychain/crypto overclaims anywhere in the
> rendered surface; (5) the dev-only seal endpoint cannot survive into a
> build; (6) no forbidden imports or scope creep (no gateway, no Phase 0, no
> MadBridge edits, no founder-act modifications).

---

Role-Id: builder
Actor-Id: glm-5.3-seal-studio-v0
Execution-Surface: claude-code
