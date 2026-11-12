FOUNDER-ACT-20261108-PHASE-3B-H1 ADDENDUM 11: the governed Codex build, after the shared npm build was updated

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** `DEC-20261108-03` Addendum 10 B5 item 3, as read below
> **Read with:** `DEC-20261108-03` Addendum 2 A3, B1 and B4; Addendum 10 A5, B5 and B6; `DEC-20261112-01` A4, B4 and B9; `DEC-20261015-05` B3

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The fix of Addendum 10 B5.** My command finished on my MacBook at 2026-11-12T02:20:35Z. Before any change it found the governed updater, process 46774, and a governed server, process 87586, each running the daemon package `0.167.2-aarch64-apple-darwin`, which the updater had selected at 2026-11-11T23:51:48Z. It copied the daemon folder, the governed `config.toml` and my launcher to `/Users/michaeldaley/builds/b5-environment-20261112`. It then added the one line `daemon_auto_start = false` to the governed configuration; stopped the updater and then the server, each on its first signal, deleting no file; and replaced my launcher `/Users/michaeldaley/builds/codex-governed`, SHA-256 `7a4c3271698ef58d8991fbe8011f9e70b22c2e720694c34d26a16fb0645711f6`, with one that runs `/Users/michaeldaley/.local/bin/codex` by full path and stops unless that build prints `codex-cli 0.167.0`, no governed server or updater runs and `daemon_auto_start` is false, SHA-256 `20ba7c7183e63e07f497221576e9306660db762bc316dcd8bbd532204e04194c`. That build then printed `codex-cli 0.167.0`. The folder's `MANIFEST.sha256` has SHA-256 `f89d83f76e25ce950277aa00f910f474b2ef4c2f4b4fb9c80d7daf9103c1c61c`.

A2. **The update.** At 2026-11-12T02:21:05Z I accepted my everyday Codex's offer to update itself. It ran `npm install --global @openai/codex`, from the folder `/`, under the Node.js runtime `/Users/michaeldaley/.hermes/node/bin/node`, and replaced the npm build at `/Users/michaeldaley/.local/bin/codex` with 0.167.2. My everyday Codex and my governed launcher used that one npm build.

A3. **The stop.** When I then started the probe of Addendum 10 B5 item 4, my launcher stopped before Codex started, because `/Users/michaeldaley/.local/bin/codex` printed `codex-cli 0.167.2`. No session started and no record was written. My check found no governed record started after record 6 of `DEC-20261112-01` A4, so no governed session has run on the 0.167.2 server or on the updated npm build.

A4. **The daemon packages.** The governed daemon's package folder now holds the releases `0.167.1-aarch64-apple-darwin` and `0.167.2-aarch64-apple-darwin`. The release `0.167.0-aarch64-apple-darwin` that my diagnostics listed there on 2026-11-11 is no longer there. My fix deleted no file.

A5. **Codex 0.167.0 on the npm registry.** `@openai/codex@0.167.0` has integrity `sha512-1FSQgbTIKAdTub5Ln6z36NT4eXDmBRkinfigzycbgn9yLZdJ3UdkQZqr0N7jnl8/D1xxT/Pz3Fl2l7S2dmRaFA==`, and its macOS arm64 package, `@openai/codex@0.167.0-darwin-arm64`, has integrity `sha512-7YtMDZX/jbWH9+fCVQg7BVsov8WvBzu4iuedXJEDlUdZxaTrYX2bEQwHIn3p0gxgSMfm30HGK9+bZm1aGSZaHw==`. In them, `bin/codex.js` has SHA-256 `e14fc83739c13c1074b12bd1acce4010c893c7f6fbfc1593b4a31d74cabb57af`, and the executable `vendor/aarch64-apple-darwin/bin/codex` has SHA-256 `030316ecfbb41f4e7946e584b0063ef333b7a36cd312ba349f2f6869e39b62cc` and 270,815,376 bytes. That `codex.js` finds the executable, sets `CODEX_MANAGED_PACKAGE_ROOT` and `CODEX_MANAGED_BY_NPM`, and replaces itself with the executable; the Node.js runtime that runs it does nothing else.

A6. **The drafting assistant.** A Claude Code session drafted the command of A1, the checks that found A2 to A4, and this addendum, and read A5 from the registry and from an installation it made of those two packages. None of that is an independent review.

## Part B: Founder rulings

B1. **The governed build.** Every governed Codex session in this repository runs Codex 0.167.0 from its own npm installation in `/Users/michaeldaley/builds/codex-governed-0.167.0`. My command makes it with one `npm install` of exactly `@openai/codex@0.167.0` into that folder alone, running no install script, and stops unless the installation's lockfile records the two integrity values of A5, its `bin/codex.js` and its executable have the SHA-256 values and size of A5, and the build prints `codex-cli 0.167.0`. Nothing else is installed into that folder, and nothing updates it.

B2. **No update offer in a governed session.** My command adds the one line `in_app_updates = false` to the features of the governed configuration, and stops unless the governed build then shows `in_app_updates` false, `daemon_auto_start` false and every feature of Addendum 2 A3 false.

B3. **Addendum 10 B5 item 3, read so.** `/Users/michaeldaley/builds/codex-governed` runs `/Users/michaeldaley/builds/codex-governed-0.167.0/node_modules/.bin/codex` by full path, and stops unless that build prints `codex-cli 0.167.0`, no governed background server or updater runs, and the governed configuration shows `daemon_auto_start` and `in_app_updates` false. The npm build of Addendum 10 A5 item 1 is no longer the governed build.

B4. **My everyday Codex.** My everyday Codex and the npm build at `/Users/michaeldaley/.local/bin/codex` are outside the governed harness. I may update them, and no governed session uses them.

B5. **Addendum 10 B5.** Its items 1 and 2 are met by the fix of A1, and its item 3 by B1 to B3. Its item 4, the probe, runs after them through the launcher of B3 and is otherwise unchanged. Addendum 10 B5 is met when my check of the probe passes. The act that records H2's merge enters the facts of A1 to A5 and the results of B1 to B5.

B6. **The check of Addendum 10 B6.** It is unchanged: every record after record 6 must name `cli_version` `0.167.0`, among its other requirements.

B7. **The update of A2.** It is not a deviation of any slice. No governed session ran on the updated build, and my launcher stopped the one I started.

B8. **Counting and filing.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. This addendum takes effect when I sign it, and is filed unchanged on `main`, by a filing pull request under a filing prompt I sign, before H2's builder session starts. It authorizes no build and starts no slice. Nothing else in `DEC-20261108-03` or its Addenda 1 to 10 changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-12

Actor-Id: founder
