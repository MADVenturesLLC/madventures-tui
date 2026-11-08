Phase 3A host certification report: MacBook

Candidate commit: ffcecaf9dbb6b2de3b406e475825137ddfe726b7

Host: macbook

Certification run: ~/builds/task58-cert-macbook

Manifest SHA-256: 5f84892110eaaf87cae97c629800c86b74b0220b59a68331650bca9399f0d3bc

## 1. Candidate commit and branch

Output of `git rev-parse HEAD`, from `016-s83-git-rev-parse-HEAD.log`:

```text
ffcecaf9dbb6b2de3b406e475825137ddfe726b7
```

Output of `git branch --show-current`, from `017-s83-git-branch-show-current.log`:

```text
```

Branch: none, detached HEAD

The run was detached at the candidate commit: `git rev-parse HEAD` printed
it, `git branch --show-current` printed nothing, and `git status -sb`
printed `## HEAD (no branch)` (section 2).

## 2. Worktree state

Worktree: clean

At step 1 of plan §8.3, `git status -sb` printed only its branch line and
`git ls-files --others --exclude-standard` printed nothing. At the end of
the run, `099-end-state.log` records that `git status --porcelain` printed
nothing, that `bun.lock` had SHA-256
`34224c0133c44d967c4a4da8b75bf11093c573c47e42bcaf502c6d6f61c3e7c0`, which is
the SHA-256 of `bun.lock` at the candidate commit, and a count of 0 Hermes
processes.

After `bun install --frozen-lockfile` (`001-install.log`), `git status
--porcelain` listed `packages/founder-act/src/main.ts`, whose mode the
install changed. The run restored it with `git checkout` before any command
of plan §8.3, as DEC-20261104-02 B7 item 3 says, and `git status
--porcelain` then printed nothing. The whole of
`002-tree-after-install.log`:

```text
$ git status --porcelain (before and after restoring the mode of packages/founder-act/src/main.ts)
before:
 M packages/founder-act/src/main.ts
restored packages/founder-act/src/main.ts with git checkout
after:
```

Output of `git status -sb`, from `018-s83-git-status-sb.log`:

```text
## HEAD (no branch)
```

Output of `git ls-files --others --exclude-standard`, from `019-s83-git-ls-files-others-exclude-standard.log`:

```text
```

The output is empty: the run's tree held no untracked file.

Output of `git diff --name-only aa16032c56fdf6c7105e99b1765ed9365d605bf4`, from `020-s83-git-diff-name-only-SOURCE-BASELINE-SHA.log`:

```text
.agents/skills/build-gate/.gitignore
.agents/skills/build-gate/SKILL.md
.agents/skills/build-gate/assets/review-record.example.json
.agents/skills/build-gate/profiles/madventures-tui.json
.agents/skills/build-gate/scripts/assert_origin.py
.agents/skills/build-gate/scripts/build_gate/__init__.py
.agents/skills/build-gate/scripts/build_gate/engine.py
.agents/skills/build-gate/scripts/build_gate/freeze.py
.agents/skills/build-gate/scripts/build_gate/types.py
.agents/skills/build-gate/scripts/build_gate/validate.py
.agents/skills/build-gate/scripts/freeze_target.py
.agents/skills/build-gate/scripts/run_gates.py
.agents/skills/build-gate/scripts/validate_record.py
.agents/skills/build-gate/tests/test_cli.py
.agents/skills/build-gate/tests/test_engine.py
.agents/skills/build-gate/tests/test_freeze.py
.agents/skills/build-gate/tests/test_run_gates.py
.agents/skills/build-gate/tests/test_types.py
.agents/skills/build-gate/tests/test_validate.py
.agents/skills/build-gate/validation/pressure-scenarios.md
.github/CODEOWNERS
.github/actions/setup-qualified-bun/action.yml
.github/scripts/README.md
.github/scripts/attribution-shape-check.sh
.github/workflows/advisory-reviewers.yml
.github/workflows/attribution-shape.yml
.github/workflows/code-review.yml
.github/workflows/tui-chaos.yml
.github/workflows/verify.yml
.gitignore
AGENTS.md
CONTRIBUTING.md
HANDOFF-builder-to-operator-claim-boundary-20260906.md
HANDOFF-projector-room-status-v0-20260915.md
README.md
SECURITY.md
apps/madbridge/package.json
apps/madbridge/src/cli.ts
apps/madbridge/src/commands/close.ts
apps/madbridge/src/commands/doctor.ts
apps/madbridge/src/commands/export-evidence.ts
apps/madbridge/src/commands/follow.ts
apps/madbridge/src/commands/init.ts
apps/madbridge/src/commands/join.ts
apps/madbridge/src/commands/leave.ts
apps/madbridge/src/commands/pause.ts
apps/madbridge/src/commands/resume.ts
apps/madbridge/src/commands/room.test.ts
apps/madbridge/src/commands/room.ts
apps/madbridge/src/commands/rooms.ts
apps/madbridge/src/commands/start.ts
apps/madbridge/src/commands/status.ts
apps/madbridge/src/commands/verify-ledger.ts
apps/madbridge/src/fixture/harness.ts
apps/madbridge/src/tui/App.tsx
apps/madbridge/src/tui/components/ApprovalDialog.tsx
apps/madbridge/src/tui/components/DecisionStrip.tsx
apps/madbridge/src/tui/components/DockStrip.tsx
apps/madbridge/src/tui/components/EventLog.tsx
apps/madbridge/src/tui/components/FixtureBanner.tsx
apps/madbridge/src/tui/components/IncidentBand.tsx
apps/madbridge/src/tui/components/ModelBar.tsx
apps/madbridge/src/tui/components/ModelPicker.tsx
apps/madbridge/src/tui/components/PaneTabs.tsx
apps/madbridge/src/tui/components/RoomStatusBand.tsx
apps/madbridge/src/tui/components/SeatBar.tsx
apps/madbridge/src/tui/components/StatusBar.tsx
apps/madbridge/src/tui/components/agent-identity.ts
apps/madbridge/src/tui/hooks/useSeatState.ts
apps/madbridge/src/tui/keybindings.ts
apps/madbridge/src/tui/keyboard-router.ts
apps/madbridge/src/tui/main.tsx
apps/madbridge/src/tui/omp-catalog.ts
apps/madbridge/src/tui/panes/AntigravityPane.tsx
apps/madbridge/src/tui/panes/ClaudePane.tsx
apps/madbridge/src/tui/panes/GovernancePane.tsx
apps/madbridge/src/tui/room/client.ts
apps/madbridge/src/tui/room/flags.ts
apps/madbridge/src/tui/room/projection.ts
apps/madbridge/src/tui/room/receipts.ts
apps/madbridge/src/tui/room/session-store.ts
apps/madbridge/src/tui/theme.ts
apps/madbridge/src/tui/types.ts
apps/madbridge/test/cli-gate.test.ts
apps/madbridge/test/cli-placeholders.test.ts
apps/madbridge/test/cli.test.ts
apps/madbridge/test/doctor.test.ts
apps/madbridge/test/init-storage.test.ts
apps/madbridge/test/pty-focus.test.tsx
apps/madbridge/test/room-create-ack.test.ts
apps/madbridge/test/room-projection.test.tsx
apps/madbridge/test/room-verbs.test.ts
apps/madbridge/test/tui-governance-surfaces.test.tsx
apps/madbridge/test/tui-projection.test.tsx
apps/madbridge/test/tui-seats.test.tsx
apps/madbridge/test/tui-truth-safety.test.tsx
apps/madbridge/test/tui-writers-stage.test.tsx
apps/madv-agent/bin/madv
apps/madv-agent/package.json
apps/madv-agent/src/approval-keys.ts
apps/madv-agent/src/approval.tsx
apps/madv-agent/src/bootstrap.ts
apps/madv-agent/src/cli.ts
apps/madv-agent/src/events.ts
apps/madv-agent/src/lock.ts
apps/madv-agent/src/model-client.ts
apps/madv-agent/src/policy.ts
apps/madv-agent/src/proxy-error.ts
apps/madv-agent/src/proxy.ts
apps/madv-agent/src/scrub.ts
apps/madv-agent/src/session.ts
apps/madv-agent/src/tools/index.ts
apps/madv-agent/src/tui/App.tsx
apps/madv-agent/src/tui/components/ApprovalDialog.tsx
apps/madv-agent/src/tui/components/PromptInput.tsx
apps/madv-agent/src/tui/components/StatusBar.tsx
apps/madv-agent/src/tui/components/Transcript.tsx
apps/madv-agent/src/tui/main.tsx
apps/madv-agent/src/turn.ts
apps/madv-agent/test/approval-keys.test.ts
apps/madv-agent/test/chain-verifiability.test.ts
apps/madv-agent/test/cli.test.ts
apps/madv-agent/test/events.test.ts
apps/madv-agent/test/launcher-and-limits.test.ts
apps/madv-agent/test/lock-atomicity.test.ts
apps/madv-agent/test/lock.test.ts
apps/madv-agent/test/model-client.test.ts
apps/madv-agent/test/policy-boundary.test.ts
apps/madv-agent/test/scrub.test.ts
apps/madv-agent/test/session-containment.test.ts
apps/madv-agent/test/shell-timeout-forwarding.test.ts
apps/madv-agent/test/tools-approval-replay.test.ts
apps/madv-agent/test/tools-bypass-regressions.test.ts
apps/madv-agent/test/tools-shell-env.test.ts
apps/madv-agent/test/tui-approval.test.ts
apps/madv-agent/test/turn-loop-guards.test.ts
apps/madv-agent/tsconfig.json
apps/projector-mc/AGENTS.md
apps/projector-mc/README.md
apps/projector-mc/fixtures/demo.json
apps/projector-mc/fixtures/generate-demo.ts
apps/projector-mc/fixtures/room-status-fixture.json
apps/projector-mc/fixtures/room-status-vocabulary.pin.json
apps/projector-mc/index.html
apps/projector-mc/package.json
apps/projector-mc/src/App.tsx
apps/projector-mc/src/components/EvidenceDrawer.tsx
apps/projector-mc/src/components/HelpOverlay.tsx
apps/projector-mc/src/components/HeroVerdict.tsx
apps/projector-mc/src/components/RoomRail.tsx
apps/projector-mc/src/components/RoomStatusPanel.tsx
apps/projector-mc/src/components/StatusBar.tsx
apps/projector-mc/src/lib/fixture.ts
apps/projector-mc/src/lib/intent.ts
apps/projector-mc/src/lib/render-model.ts
apps/projector-mc/src/lib/room-status-fixture.ts
apps/projector-mc/src/lib/room-status.ts
apps/projector-mc/src/main.tsx
apps/projector-mc/src/tokens.css
apps/projector-mc/test/render-model.test.ts
apps/projector-mc/test/room-status.test.ts
apps/projector-mc/tsconfig.json
apps/projector-mc/vite.config.ts
apps/seal-studio/AGENTS.md
apps/seal-studio/HANDOFF.md
apps/seal-studio/README.md
apps/seal-studio/index.html
apps/seal-studio/package.json
apps/seal-studio/src/App.tsx
apps/seal-studio/src/components/SealBits.tsx
apps/seal-studio/src/lib/act-draft.ts
apps/seal-studio/src/lib/canonical.ts
apps/seal-studio/src/lib/seal-bridge.ts
apps/seal-studio/src/lib/seal-client.ts
apps/seal-studio/src/main.tsx
apps/seal-studio/src/tokens.css
apps/seal-studio/test/act-draft.test.ts
apps/seal-studio/test/canonical.test.ts
apps/seal-studio/test/seal-bridge.test.ts
apps/seal-studio/test/seal-client.test.ts
apps/seal-studio/test/ui.test.tsx
apps/seal-studio/tsconfig.json
apps/seal-studio/vite.config.ts
bun.lock
docs/STATUS.md
docs/decisions/DEC-20260812-01-phase-3a-runtime-foundation-supersession.md
docs/decisions/DEC-20260831-01-phase-3a-authority-drift-reconciliation.md
docs/decisions/DEC-20260902-01-task33-phase1-annex-r5.md
docs/decisions/DEC-20260902-01-task33-phase1-annex.md
docs/decisions/DEC-20260903-01-task26-m10-precondition-waiver.md
docs/decisions/DEC-20260903-02-m13-task30-34-waiver-and-execution-authorization.md
docs/decisions/DEC-20260916-01-task21b-snapshot-producer.md
docs/decisions/DEC-20260918-01-d9-snapshot-projection-sources.md
docs/decisions/DEC-20260919-01-d9-a1-command-legality-correction.md
docs/decisions/DEC-20260919-02-d9-a2-base-repin.md
docs/decisions/DEC-20260924-01-d10-task21b-execution-withdrawn.md
docs/decisions/DEC-20260924-02-d10-r1-task21b-execution.md
docs/decisions/DEC-20260924-03-m10-docs-act.md
docs/decisions/DEC-20260924-04-m10-docs-act-a1.md
docs/decisions/DEC-20260924-05-m9-harden-act.md
docs/decisions/DEC-20260925-01-m9-reviewed.md
docs/decisions/DEC-20260926-01-task22-execution-authorization.md
docs/decisions/DEC-20260929-01-task22-correction-authorization.md
docs/decisions/DEC-20260929-02-task22-correction-a1.md
docs/decisions/DEC-20260930-01-task22-b3-clarification.md
docs/decisions/DEC-20260930-02-task23-execution-authorization.md
docs/decisions/DEC-20261001-01-task23-correction-authorization.md
docs/decisions/DEC-20261001-02-task23-rereview-acceptance.md
docs/decisions/DEC-20261002-01-m14-task34-acceptance.md
docs/decisions/DEC-20261003-01-m14-review-request.md
docs/decisions/DEC-20261003-02-m14-verdict-fail-correction-c2.md
docs/decisions/DEC-20261004-01-m14-c2-rereview-request.md
docs/decisions/DEC-20261004-02-m14-c2-rereview-acceptance.md
docs/decisions/DEC-20261004-03-task35-execution-authorization.md
docs/decisions/DEC-20261005-01-task35-correction-authorization.md
docs/decisions/DEC-20261006-01-task35-b3-clarification.md
docs/decisions/DEC-20261007-01-task35-second-correction-authorization.md
docs/decisions/DEC-20261007-02-task35-builder-amendment.md
docs/decisions/DEC-20261007-03-task35-builder-amendment-2.md
docs/decisions/DEC-20261008-01-task35-third-correction-authorization.md
docs/decisions/DEC-20261008-02-task35-containment-scope.md
docs/decisions/DEC-20261008-03-task35-rereview-acceptance.md
docs/decisions/DEC-20261009-01-task36-execution-authorization.md
docs/decisions/DEC-20261009-02-task36-review-acceptance.md
docs/decisions/DEC-20261010-01-m15-checkpoint-closure.md
docs/decisions/DEC-20261010-02-linux-host-scope.md
docs/decisions/DEC-20261010-03-task37-execution-authorization.md
docs/decisions/DEC-20261010-04-task37-review-acceptance.md
docs/decisions/DEC-20261011-01-m16-checkpoint-closure.md
docs/decisions/DEC-20261011-02-ubuntu-failures-and-spike-run.md
docs/decisions/DEC-20261012-01-linux-amendment-ratification.md
docs/decisions/DEC-20261012-02-ubuntu-tests-4-6-investigation.md
docs/decisions/DEC-20261012-03-tests-4-6-cause-and-fix.md
docs/decisions/DEC-20261012-04-macos-runner-migration.md
docs/decisions/DEC-20261013-01-task45-execution-authorization.md
docs/decisions/DEC-20261013-02-f1f2-test-timeout.md
docs/decisions/DEC-20261013-03-tests-4-6-ruling.md
docs/decisions/DEC-20261013-04-imac-out-of-scope.md
docs/decisions/DEC-20261013-05-claude-code-2-1-296.md
docs/decisions/DEC-20261014-01-builder-reassignment.md
docs/decisions/DEC-20261014-02-task45-async-preflight.md
docs/decisions/DEC-20261014-03-task46-execution-authorization.md
docs/decisions/DEC-20261014-04-records-cleanup.md
docs/decisions/DEC-20261015-01-task45-macos-correction.md
docs/decisions/DEC-20261015-02-claude-code-version-range.md
docs/decisions/DEC-20261015-03-m20-checkpoint-closure.md
docs/decisions/DEC-20261015-04-task56-antigravity-investigation.md
docs/decisions/DEC-20261015-05-phase-3a-process.md
docs/decisions/DEC-20261016-01-m20-corrections.md
docs/decisions/DEC-20261016-02-task46-correction.md
docs/decisions/DEC-20261016-03-task56-correction.md
docs/decisions/DEC-20261016-04-task56-reinvestigation.md
docs/decisions/DEC-20261016-05-task56-help-scope-correction.md
docs/decisions/DEC-20261016-06-task56-review-correction.md
docs/decisions/DEC-20261017-01-task56-r4-correction.md
docs/decisions/DEC-20261017-02-task56-reassignment.md
docs/decisions/DEC-20261017-03-task46-reassignment.md
docs/decisions/DEC-20261017-04-amendment-1-cli-entry-point-and-madmik3-proxy.md
docs/decisions/DEC-20261017-04-amendment-2-b7-design-authorship.md
docs/decisions/DEC-20261017-04-amendment-3-session-store-containment.md
docs/decisions/DEC-20261017-04-native-agent-v0-new-app-authorization.md
docs/decisions/DEC-20261018-01-task47-execution-authorization.md
docs/decisions/DEC-20261018-02-task48-execution-authorization.md
docs/decisions/DEC-20261018-03-task49-execution-authorization.md
docs/decisions/DEC-20261020-01-phase-3a-order-and-records.md
docs/decisions/DEC-20261021-01-merge-records-and-m20-rulings.md
docs/decisions/DEC-20261022-01-tasks-24-25-execution-authorization.md
docs/decisions/DEC-20261022-02-cleanup-budget-test-correction.md
docs/decisions/DEC-20261023-01-standing-build-rules.md
docs/decisions/DEC-20261024-01-separation-pin-rule.md
docs/decisions/DEC-20261024-02-task25-delegate-forwarding.md
docs/decisions/DEC-20261025-01-task25-fencing-batch-count.md
docs/decisions/DEC-20261026-01-stabilization-s0-test.md
docs/decisions/DEC-20261026-02-stabilization-preflight-isolation-test.md
docs/decisions/DEC-20261027-01-m22-execution-authorization.md
docs/decisions/DEC-20261028-01-m22-checkpoint-closure.md
docs/decisions/DEC-20261028-02-m23-m24-single-build.md
docs/decisions/DEC-20261031-01-agents-merge-rule.md
docs/decisions/DEC-20261101-01-m23-m24-records-and-m21-closure.md
docs/decisions/DEC-20261102-01-phase-3a-carried-items.md
docs/decisions/DEC-20261102-02-hardening-builds.md
docs/decisions/DEC-20261102-04-hardening-records-and-hardening-c.md
docs/decisions/DEC-20261103-01-hardening-c-records-and-hardening-d.md
docs/decisions/DEC-20261103-02-addendum-1-task57-halt.md
docs/decisions/DEC-20261103-02-task57-claude-code-investigation.md
docs/decisions/DEC-20261103-03-hardening-d-records-and-hardening-e.md
docs/decisions/DEC-20261104-01-m25-records-and-hardening-e-records.md
docs/decisions/DEC-20261104-02-hardening-f-and-task58.md
docs/decisions/PLAN-OPEN-1-identity-authentication.md
docs/decisions/PLAN-OPEN-2-environment-allowlists.md
docs/decisions/PLAN-OPEN-3-capability-horizon.md
docs/decisions/PLAN-OPEN-4-node-pty-removal.md
docs/decisions/PLAN-OPEN-6-root-scripts.md
docs/decisions/PLAN-OPEN-7-snapshot-projection-sources.md
docs/decisions/PLAN-OPEN-approval-record.md
docs/design/madv-agent-v0-surface.md
docs/madv-agent/n1-credential-path.md
docs/madv-agent/n3-tools.md
docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md
docs/superpowers/plans/2026-09-19-phase-3b-live-tui-integration.md
docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md
docs/superpowers/specs/2026-09-19-phase-3b-live-tui-integration-design.md
docs/verification/2026-08-12-antigravity-surface-investigation.md
docs/verification/2026-08-12-bun-terminal-spike-imac.md
docs/verification/2026-08-12-bun-terminal-spike-macbook.md
docs/verification/2026-08-12-surface-investigation-claude-code.md
docs/verification/2026-08-22-m17-step8-dualhost-imac.md
docs/verification/2026-08-22-m17-step8-dualhost-macbook.md
docs/verification/2026-08-28-wf17-ground-truth-security-controls.md
docs/verification/2026-09-04-room-runtime-phase0.md
docs/verification/2026-09-06-m5-task12-final-checkpoint.md
docs/verification/2026-09-11-m6-final-checkpoint.md
docs/verification/2026-10-11-bun-terminal-spike-ubuntu.md
docs/verification/2026-10-12-tests-4-6-check-macbook.md
docs/verification/2026-10-12-tests-4-6-investigation-ubuntu.md
docs/verification/2026-10-13-tests-4-6-root-cause-ubuntu.md
docs/verification/hardening-a-build-log.md
docs/verification/hardening-b-build-log.md
docs/verification/hardening-c-build-log.md
docs/verification/hardening-d-build-log.md
docs/verification/hardening-e-build-log.md
docs/verification/hardening-f-build-log.md
docs/verification/m23-m24-build-log.md
docs/verification/phase-3a-antigravity-preliminary.md
docs/verification/phase-3a-correction-rounds.md
greptile.json
package.json
packages/adapter-antigravity/src/adapter.ts
packages/adapter-antigravity/src/attestation.ts
packages/adapter-antigravity/src/index.ts
packages/adapter-antigravity/test/integration.test.ts
packages/adapter-claude-code/src/adapter.ts
packages/adapter-claude-code/src/attestation.ts
packages/adapter-claude-code/src/index.ts
packages/adapter-claude-code/test/integration.test.ts
packages/broker/package.json
packages/broker/src/broker.ts
packages/broker/src/client.ts
packages/broker/src/command-legality.ts
packages/broker/src/fencing.ts
packages/broker/src/in-process-client.ts
packages/broker/src/index.ts
packages/broker/src/next-start-reconciliation.ts
packages/broker/src/pty-host-protocol.ts
packages/broker/src/pty-host-supervisor.ts
packages/broker/src/publish-legality.ts
packages/broker/src/reconciliation.ts
packages/broker/src/runtime-broker.ts
packages/broker/src/session-machine.ts
packages/broker/src/snapshot.ts
packages/broker/test/acknowledgement-deadline.test.ts
packages/broker/test/broker-client-contract.test.ts
packages/broker/test/broker.test.ts
packages/broker/test/command-legality.test.ts
packages/broker/test/fencing.test.ts
packages/broker/test/in-process-client.test.ts
packages/broker/test/incident-atomicity.test.ts
packages/broker/test/mcp-contract.test.ts
packages/broker/test/next-start-reconciliation.test.ts
packages/broker/test/pty-host-dotenv.test.ts
packages/broker/test/pty-host-protocol.test.ts
packages/broker/test/pty-host-supervisor.test.ts
packages/broker/test/publish-legality.test.ts
packages/broker/test/reconciliation.test.ts
packages/broker/test/session-machine.test.ts
packages/broker/test/snapshot.test.ts
packages/broker/test/socket.test.ts
packages/build-memory/AGENTS.md
packages/build-memory/README.md
packages/build-memory/package.json
packages/build-memory/src/cli.ts
packages/build-memory/src/index.ts
packages/build-memory/src/node-store.ts
packages/build-memory/test/build-memory.test.ts
packages/claim-boundary/README.md
packages/claim-boundary/package.json
packages/claim-boundary/src/index.ts
packages/claim-boundary/test/claim-boundary.test.ts
packages/founder-act/README.md
packages/founder-act/fixtures/572f5ee1a11eae6bdba5398ce695bd72316071ce50acc09d8bbcc386bed24a0c.json
packages/founder-act/fixtures/d1f23f457335506846581ca037397006d7f5269788cb0364178902487b7b449e.json
packages/founder-act/kind-name-allowlist.json
packages/founder-act/package.json
packages/founder-act/src/act.ts
packages/founder-act/src/canonical.ts
packages/founder-act/src/cli.ts
packages/founder-act/src/index.ts
packages/founder-act/src/main.ts
packages/founder-act/src/show.ts
packages/founder-act/src/verify.ts
packages/founder-act/test/founder-act.test.ts
packages/honesty-compiler/README.md
packages/honesty-compiler/fixtures/argus/packet-honest.json
packages/honesty-compiler/fixtures/build-memory/fixture-store.json
packages/honesty-compiler/fixtures/claims/honest-fixture-suite.json
packages/honesty-compiler/fixtures/claims/honest-spec-only.json
packages/honesty-compiler/fixtures/claims/honest-verify.json
packages/honesty-compiler/fixtures/claims/lying-bad-argus-sha.json
packages/honesty-compiler/fixtures/claims/lying-forbidden-token.json
packages/honesty-compiler/fixtures/claims/lying-missing-evidence.json
packages/honesty-compiler/fixtures/claims/lying-overclaim-rung.json
packages/honesty-compiler/fixtures/claims/lying-stale-ship.json
packages/honesty-compiler/fixtures/claims/lying-unknown-field.json
packages/honesty-compiler/fixtures/claims/pass-proving-ground-skip.json
packages/honesty-compiler/package.json
packages/honesty-compiler/scripts/seal-fixtures.ts
packages/honesty-compiler/src/bind.ts
packages/honesty-compiler/src/cli.ts
packages/honesty-compiler/src/compiler.ts
packages/honesty-compiler/src/emit.ts
packages/honesty-compiler/src/index.ts
packages/honesty-compiler/src/ir.ts
packages/honesty-compiler/src/node-io.ts
packages/honesty-compiler/src/parse.ts
packages/honesty-compiler/src/report.ts
packages/honesty-compiler/src/rung.ts
packages/honesty-compiler/test/generate-goldens.ts
packages/honesty-compiler/test/goldens/fail-bad-argus-sha.golden.json
packages/honesty-compiler/test/goldens/fail-forbidden-token.golden.json
packages/honesty-compiler/test/goldens/fail-missing-evidence.golden.json
packages/honesty-compiler/test/goldens/fail-overclaim-rung.golden.json
packages/honesty-compiler/test/goldens/fail-stale-ship.golden.json
packages/honesty-compiler/test/goldens/fail-unknown-field.golden.json
packages/honesty-compiler/test/goldens/pass-fixture-suite.golden.json
packages/honesty-compiler/test/goldens/pass-proving-ground-skip.golden.json
packages/honesty-compiler/test/goldens/pass-spec-only.golden.json
packages/honesty-compiler/test/goldens/pass-verify.golden.json
packages/honesty-compiler/test/honesty-compiler.test.ts
packages/ledger/src/index.ts
packages/ledger/src/ledger.ts
packages/ledger/src/rebuild.ts
packages/ledger/src/schema.ts
packages/ledger/test/lifecycle-append.test.ts
packages/ledger/test/rebuild.test.ts
packages/ledger/test/reduce-ledger-event.test.ts
packages/policy/src/engine.ts
packages/preflight/README.md
packages/preflight/checks.json
packages/preflight/package.json
packages/preflight/src/checks.ts
packages/preflight/src/cli.ts
packages/preflight/src/index.ts
packages/preflight/src/runner.ts
packages/preflight/src/spawn.ts
packages/preflight/test/preflight.test.ts
packages/protocol/src/adapter-registry.ts
packages/protocol/src/capability-record.ts
packages/protocol/src/index.ts
packages/protocol/src/lifecycle-events.ts
packages/protocol/src/normalization.ts
packages/protocol/src/pair-constraints.ts
packages/protocol/src/room-ipc-v2.ts
packages/protocol/src/surface-id.ts
packages/protocol/src/task-envelope.ts
packages/protocol/test/adapter-registry.test.ts
packages/protocol/test/capability-record.test.ts
packages/protocol/test/lifecycle-events.test.ts
packages/protocol/test/normalization.test.ts
packages/protocol/test/pair-constraints.test.ts
packages/protocol/test/room-ipc-v2.test.ts
packages/protocol/test/surface-id.test.ts
packages/protocol/test/task-envelope.test.ts
packages/pty-host/package.json
packages/pty-host/src/frames.ts
packages/pty-host/src/index.ts
packages/pty-host/src/launch.ts
packages/pty-host/src/main.ts
packages/pty-host/src/signals.ts
packages/pty-host/src/terminal.ts
packages/pty-host/test/environment.test.ts
packages/pty-host/test/eof-timer-early-fire.test.ts
packages/pty-host/test/eof-timer.test.ts
packages/pty-host/test/frames.test.ts
packages/pty-host/test/launch.test.ts
packages/pty-host/test/main-guard.test.ts
packages/pty-host/test/signals.test.ts
packages/room-runtime-worker/src/worker.ts
packages/single-verdict/AGENTS.md
packages/single-verdict/README.md
packages/single-verdict/package.json
packages/single-verdict/src/index.ts
packages/single-verdict/test/generate-goldens.ts
packages/single-verdict/test/goldens/ship.golden.json
packages/single-verdict/test/goldens/spec-only.golden.json
packages/single-verdict/test/goldens/stale-evidence.golden.json
packages/single-verdict/test/goldens/verify-pass-with-findings.golden.json
packages/single-verdict/test/single-verdict.test.ts
packages/storage/package.json
packages/storage/src/capability-store.ts
packages/storage/src/home.ts
packages/storage/src/index.ts
packages/storage/src/session-storage.ts
packages/storage/src/storage-root.ts
packages/storage/test/capability-store.test.ts
packages/storage/test/home.test.ts
packages/storage/test/session-storage.test.ts
packages/storage/test/storage-root.test.ts
packages/supervisor/package.json
packages/supervisor/src/attestation.ts
packages/supervisor/src/build.ts
packages/supervisor/src/environment.ts
packages/supervisor/src/index.ts
packages/supervisor/src/preflight.ts
packages/supervisor/test/attestation.test.ts
packages/supervisor/test/build-rollback.test.ts
packages/supervisor/test/build.test.ts
packages/supervisor/test/environment.test.ts
packages/supervisor/test/preflight.test.ts
packages/tui-chaos/README.md
packages/tui-chaos/package.json
packages/tui-chaos/src/asciinema.ts
packages/tui-chaos/src/cli.ts
packages/tui-chaos/src/evidence.ts
packages/tui-chaos/src/goldens.ts
packages/tui-chaos/src/pty/bridge.mjs
packages/tui-chaos/src/pty/session.ts
packages/tui-chaos/src/scenario/ansi-flood.ts
packages/tui-chaos/src/scenario/chaos-keys.ts
packages/tui-chaos/src/scenario/governance-focus.ts
packages/tui-chaos/src/scenario/layout-resize.ts
packages/tui-chaos/src/scenario/types.ts
packages/tui-chaos/src/screen.ts
packages/tui-chaos/src/tui-session.ts
packages/tui-chaos/test/evidence.test.ts
packages/tui-chaos/test/final-s1-s4.test.ts
packages/tui-chaos/test/fixture-stream.test.ts
packages/tui-chaos/test/goldens.test.ts
packages/tui-chaos/test/review-corrections.test.ts
packages/tui-chaos/test/screen.test.ts
test/acceptance/evidence-manifest.test.ts
test/acceptance/interruption-recovery.test.ts
test/acceptance/two-way-collaboration.test.ts
test/adapter-parity.shared.ts
test/architecture-boundaries.test.ts
test/phase0/parent-death.test.ts
test/phase0/prereq-c/c2-worker.test.ts
test/phase0/pty-pressure.test.ts
test/phase0/recovery-mode.test.ts
test/phase0/spike/gateway-child.ts
test/phase0/spike/phase0-lib.ts
test/phase0/spike/prerequisite-c-load.mjs
test/phase0/spike/pty-host-child.ts
test/phase0/viewer-death.test.ts
test/phase0/viewer-id.test.ts
test/phase3a/adversarial/attestation-drift.test.ts
test/phase3a/adversarial/auth-expiry.test.ts
test/phase3a/adversarial/cleanup-residuals.test.ts
test/phase3a/adversarial/descriptor-hygiene.test.ts
test/phase3a/adversarial/ledger-failure.test.ts
test/phase3a/adversarial/process-group.test.ts
test/phase3a/adversarial/sequence-invariants.test.ts
test/phase3a/adversarial/supervisor-death.test.ts
test/phase3a/adversarial/supervisor-entry.ts
test/phase3a/adversarial/wedged-host.test.ts
test/phase3a/architecture-phase3a.test.ts
test/phase3a/descendant-record-wait.test.ts
test/phase3a/environment-equality.test.ts
test/phase3a/evidence-pipeline.test.ts
test/phase3a/fixture-adapters.ts
test/phase3a/harness-lifecycle.test.ts
test/phase3a/harness-rollback.test.ts
test/phase3a/harness-separation.test.ts
test/phase3a/negative-control.ts
test/phase3a/runtime-harness.ts
test/phase3a/spike/bun-terminal-spike-reports.test.ts
test/phase3a/spike/bun-terminal-spike.test.ts
test/phase3a/spike/bun-terminal-spike.ts
testdata/tui-chaos/goldens/governance_focus.grid.txt
testdata/tui-chaos/goldens/layout_resize.grid.txt
tsconfig.json
```

These are the exact changed files against the source baseline, 570 paths.
The log's command is `git diff --name-only "$SOURCE_BASELINE_SHA"`, with
`SOURCE_BASELINE_SHA` set to `aa16032c56fdf6c7105e99b1765ed9365d605bf4` by
`015-s83-SOURCE-BASELINE-SHA-aa16032c56fdf6c7105e99b1765ed9365d605bf4.log`.

## 3. Runtime

Bun path: /Users/michaeldaley/.bun/bin/bun

Bun resolved path: /Users/michaeldaley/.bun/bin/bun

Bun version: 1.4.2

Bun SHA-256: 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5

Bun revision: 744846f844374847c902b5e7fd59b4342a51ef99

Node path: /Users/michaeldaley/.local/bin/node

Node version: v26.5.1

Each value is the output of a step 0 command of the run:

| Line | Command | Log |
| --- | --- | --- |
| Bun path | `which bun` | `007-s83-0-which-bun.log` |
| Bun resolved path | `perl -MCwd -e 'print Cwd::abs_path(shift), "\n"' "$(which bun)"` | `013-s83-0-perl-MCwd-e-print-Cwd-abs-path-shift-n-which-bun.log` |
| Bun version | `bun --version` | `006-s83-0-bun-version.log` |
| Bun SHA-256 | `shasum -a 256 "$(which bun)"` | `008-s83-0-shasum-a-256-which-bun.log`, its first field |
| Bun revision | `bun -e 'process.stdout.write(Bun.revision + "\n")'` | `014-s83-0-bun-e-process-stdout-write-Bun-revision-n.log` |
| Node path | `command -v node` | `009-s83-0-command-v-node.log` |
| Node version | `node --version` | `010-s83-0-node-version.log` |

`which bun` and `perl` printed the same path. The path, version 1.4.2,
revision and SHA-256 are those DEC-20261104-02 B7 item 1 fixes for the
MacBook, the macOS certification runtime of DEC-20261013-03 B2 item 1.
Node.js v26.5.1 is 20 or later, as plan §8 requires.

## 4. Host

Architecture: arm64

Operating system: macOS 27.0.1

OS build: 26A434

TERM: xterm-256color

Shell: /bin/zsh

Each value is the output of a step 0 command of the run:

| Line | Command | Log | Taken from |
| --- | --- | --- | --- |
| Architecture | `uname -m` | `004-s83-0-uname-m.log` | the output |
| Operating system | `sw_vers` | `005-s83-0-sw-vers.log` | `ProductName` and `ProductVersion` |
| OS build | `sw_vers` | `005-s83-0-sw-vers.log` | `BuildVersion` |
| TERM | `printf '%s\n' "$TERM"` | `011-s83-0-printf-s-n-TERM.log` | the output |
| Shell | `printf '%s\n' "$SHELL"` | `012-s83-0-printf-s-n-SHELL.log` | the output |

`sw_vers` separates each name from its value with tab characters. The values
above are written without them, and its lines are not quoted here.

## 5. Commands and complete counts

Every log of the run, in the order the run wrote them. `001-install.log`,
`002-tree-after-install.log` and `003-preflight-bunx.log` are the install
and tree check of DEC-20261104-02 B7 item 3 and the `bunx` check of Addendum
3 B4 item 2, which are not commands of B7 item 4, and `099-end-state.log` is
the run's end-state check. `004-s83-0-uname-m.log` to
`038-s83-echo-pty-host-processes-pgrep-f-madv-pty-host-wc-l-tr-d.log` are
the commands of plan §8.3 steps 0 to 7, with step 0's two added commands of
B7 item 4, and `039-s122-bun-test-packages-protocol.log` to
`098-s122-bun-run-verify-phase3a.log` are the commands of plan §12.2, each
once, in their listed order. The command_exit column is the exit status each
log records; "not printed" means the log records none. A `|` inside a
command is written `\|`, as a Markdown table requires. For a test command,
the last column gives the count lines and the Ran line it printed, without
their leading space.

| Log | Command | command_exit | Printed counts |
| --- | --- | --- | --- |
| `001-install.log` | `bun install --frozen-lockfile` | 0 | not a test command |
| `002-tree-after-install.log` | `git status --porcelain (before and after restoring the mode of packages/founder-act/src/main.ts)` | not printed | not a test command |
| `003-preflight-bunx.log` | `bunx tsc --version (preflight of Addendum 3 B4; not a command of B7 item 4)` | 0 | not a test command |
| `004-s83-0-uname-m.log` | `uname -m` | 0 | not a test command |
| `005-s83-0-sw-vers.log` | `sw_vers` | 0 | not a test command |
| `006-s83-0-bun-version.log` | `bun --version` | 0 | not a test command |
| `007-s83-0-which-bun.log` | `which bun` | 0 | not a test command |
| `008-s83-0-shasum-a-256-which-bun.log` | `shasum -a 256 "$(which bun)"` | 0 | not a test command |
| `009-s83-0-command-v-node.log` | `command -v node` | 0 | not a test command |
| `010-s83-0-node-version.log` | `node --version` | 0 | not a test command |
| `011-s83-0-printf-s-n-TERM.log` | `printf '%s\n' "$TERM"` | 0 | not a test command |
| `012-s83-0-printf-s-n-SHELL.log` | `printf '%s\n' "$SHELL"` | 0 | not a test command |
| `013-s83-0-perl-MCwd-e-print-Cwd-abs-path-shift-n-which-bun.log` | `perl -MCwd -e 'print Cwd::abs_path(shift), "\n"' "$(which bun)"` | 0 | not a test command |
| `014-s83-0-bun-e-process-stdout-write-Bun-revision-n.log` | `bun -e 'process.stdout.write(Bun.revision + "\n")'` | 0 | not a test command |
| `015-s83-SOURCE-BASELINE-SHA-aa16032c56fdf6c7105e99b1765ed9365d605bf4.log` | `SOURCE_BASELINE_SHA=aa16032c56fdf6c7105e99b1765ed9365d605bf4` | 0 | not a test command |
| `016-s83-git-rev-parse-HEAD.log` | `git rev-parse HEAD` | 0 | not a test command |
| `017-s83-git-branch-show-current.log` | `git branch --show-current` | 0 | not a test command |
| `018-s83-git-status-sb.log` | `git status -sb` | 0 | not a test command |
| `019-s83-git-ls-files-others-exclude-standard.log` | `git ls-files --others --exclude-standard` | 0 | not a test command |
| `020-s83-git-diff-name-only-SOURCE-BASELINE-SHA.log` | `git diff --name-only "$SOURCE_BASELINE_SHA"` | 0 | not a test command |
| `021-s83-bunx-tsc-noEmit.log` | `bunx tsc --noEmit` | 0 | not a test command |
| `022-s83-git-diff-check-SOURCE-BASELINE-SHA.log` | `git diff --check "$SOURCE_BASELINE_SHA"` | 2 | not a test command |
| `023-s83-bun-test.log` | `bun test` | 0 | 1902 pass; 0 fail; 20141 expect() calls; Ran 1902 tests across 140 files. [186.71s] |
| `024-s83-bun-test-test-architecture-boundaries-test-ts-test-phase3a-a.log` | `bun test test/architecture-boundaries.test.ts test/phase3a/architecture-phase3a.test.ts` | 0 | 59 pass; 0 fail; 557 expect() calls; Ran 59 tests across 2 files. [8.45s] |
| `025-s83-bun-test-test-phase3a-harness-separation-test-ts.log` | `bun test test/phase3a/harness-separation.test.ts` | 0 | 7 pass; 0 fail; 154 expect() calls; Ran 7 tests across 1 file. [1.67s] |
| `026-s83-bun-test-test-phase3a-spike.log` | `bun test test/phase3a/spike` | 0 | 11 pass; 0 fail; 111 expect() calls; Ran 11 tests across 2 files. [9.63s] |
| `027-s83-bun-test-test-phase3a-adversarial.log` | `bun test test/phase3a/adversarial` | 0 | 34 pass; 0 fail; 658 expect() calls; Ran 34 tests across 9 files. [22.01s] |
| `028-s83-bun-test-packages-pty-host-packages-supervisor-packages-stor.log` | `bun test packages/pty-host packages/supervisor packages/storage` | 0 | 160 pass; 0 fail; 6865 expect() calls; Ran 160 tests across 16 files. [85.40s] |
| `029-s83-bun-test-packages-protocol-packages-ledger-packages-broker.log` | `bun test packages/protocol packages/ledger packages/broker` | 0 | 521 pass; 0 fail; 4557 expect() calls; Ran 521 tests across 34 files. [13.19s] |
| `030-s83-bun-test-apps-madbridge.log` | `bun test apps/madbridge` | 0 | 518 pass; 0 fail; 2339 expect() calls; Ran 518 tests across 15 files. [8.70s] |
| `031-s83-bun-apps-madbridge-src-cli-ts-start-json-echo-exit.log` | `bun apps/madbridge/src/cli.ts start --json; echo "exit=$?"` | 0 | not a test command |
| `032-s83-bun-apps-madbridge-src-cli-ts-status-json-echo-exit.log` | `bun apps/madbridge/src/cli.ts status --json; echo "exit=$?"` | 0 | not a test command |
| `033-s83-bun-apps-madbridge-src-cli-ts-pause-json-echo-exit.log` | `bun apps/madbridge/src/cli.ts pause --json; echo "exit=$?"` | 0 | not a test command |
| `034-s83-bun-apps-madbridge-src-cli-ts-resume-json-echo-exit.log` | `bun apps/madbridge/src/cli.ts resume --json; echo "exit=$?"` | 0 | not a test command |
| `035-s83-bun-apps-madbridge-src-cli-ts-close-json-echo-exit.log` | `bun apps/madbridge/src/cli.ts close --json; echo "exit=$?"` | 0 | not a test command |
| `036-s83-bun-apps-madbridge-src-cli-ts-help.log` | `bun apps/madbridge/src/cli.ts --help` | 0 | not a test command |
| `037-s83-bun-test-phase3a-negative-control-ts-echo-negative-control-e.log` | `bun test/phase3a/negative-control.ts; echo "negative_control_exit=$?"` | 0 | not a test command |
| `038-s83-echo-pty-host-processes-pgrep-f-madv-pty-host-wc-l-tr-d.log` | `echo "pty_host_processes=$(pgrep -f madv-pty-host \| wc -l \| tr -d ' ')"` | 0 | not a test command |
| `039-s122-bun-test-packages-protocol.log` | `bun test packages/protocol` | 0 | 149 pass; 0 fail; 1551 expect() calls; Ran 149 tests across 11 files. [41.00ms] |
| `040-s122-bun-test-packages-ledger.log` | `bun test packages/ledger` | 0 | 64 pass; 0 fail; 258 expect() calls; Ran 64 tests across 5 files. [81.00ms] |
| `041-s122-bun-test-packages-broker.log` | `bun test packages/broker` | 0 | 308 pass; 0 fail; 2748 expect() calls; Ran 308 tests across 18 files. [13.44s] |
| `042-s122-bun-test-packages-storage.log` | `bun test packages/storage` | 0 | 30 pass; 0 fail; 233 expect() calls; Ran 30 tests across 4 files. [31.00ms] |
| `043-s122-bun-test-packages-pty-host.log` | `bun test packages/pty-host` | 0 | 50 pass; 0 fail; 788 expect() calls; Ran 50 tests across 7 files. [31.57s] |
| `044-s122-bun-test-packages-supervisor.log` | `bun test packages/supervisor` | 0 | 80 pass; 0 fail; 5844 expect() calls; Ran 80 tests across 5 files. [55.19s] |
| `045-s122-bun-test-packages-policy.log` | `bun test packages/policy` | 0 | 30 pass; 0 fail; 38 expect() calls; Ran 30 tests across 3 files. [16.00ms] |
| `046-s122-bun-test-packages-artifact-store.log` | `bun test packages/artifact-store` | 0 | 6 pass; 0 fail; 9 expect() calls; Ran 6 tests across 1 file. [11.00ms] |
| `047-s122-bun-test-packages-adapter-claude-code-packages-adapter-antig.log` | `bun test packages/adapter-claude-code packages/adapter-antigravity` | 0 | 22 pass; 0 fail; 45 expect() calls; Ran 22 tests across 6 files. [9.00ms] |
| `048-s122-bun-test-apps-madbridge.log` | `bun test apps/madbridge` | 0 | 518 pass; 0 fail; 2339 expect() calls; Ran 518 tests across 15 files. [9.50s] |
| `049-s122-bun-test-test-architecture-boundaries-test-ts.log` | `bun test test/architecture-boundaries.test.ts` | 0 | 10 pass; 0 fail; 39 expect() calls; Ran 10 tests across 1 file. [67.00ms] |
| `050-s122-bun-test-test-phase3a-architecture-phase3a-test-ts.log` | `bun test test/phase3a/architecture-phase3a.test.ts` | 0 | 49 pass; 0 fail; 518 expect() calls; Ran 49 tests across 1 file. [8.36s] |
| `051-s122-bun-test-test-phase3a-harness-separation-test-ts.log` | `bun test test/phase3a/harness-separation.test.ts` | 0 | 7 pass; 0 fail; 154 expect() calls; Ran 7 tests across 1 file. [1.81s] |
| `052-s122-bun-test-packages-ledger-test-reduce-ledger-event-test-ts.log` | `bun test packages/ledger/test/reduce-ledger-event.test.ts` | 0 | 20 pass; 0 fail; 80 expect() calls; Ran 20 tests across 1 file. [8.00ms] |
| `053-s122-bun-test-packages-ledger-test-lifecycle-append-test-ts.log` | `bun test packages/ledger/test/lifecycle-append.test.ts` | 0 | 13 pass; 0 fail; 97 expect() calls; Ran 13 tests across 1 file. [34.00ms] |
| `054-s122-bun-test-packages-broker-test-next-start-reconciliation-test.log` | `bun test packages/broker/test/next-start-reconciliation.test.ts` | 0 | 25 pass; 0 fail; 242 expect() calls; Ran 25 tests across 1 file. [12.00ms] |
| `055-s122-bun-test-packages-broker-test-fencing-test-ts.log` | `bun test packages/broker/test/fencing.test.ts` | 0 | 70 pass; 0 fail; 672 expect() calls; Ran 70 tests across 1 file. [119.00ms] |
| `056-s122-bun-test-packages-broker-test-incident-atomicity-test-ts.log` | `bun test packages/broker/test/incident-atomicity.test.ts` | 0 | 9 pass; 0 fail; 100 expect() calls; Ran 9 tests across 1 file. [64.00ms] |
| `057-s122-bun-test-packages-broker-test-broker-client-contract-test-ts.log` | `bun test packages/broker/test/broker-client-contract.test.ts` | 0 | 5 pass; 0 fail; 12 expect() calls; Ran 5 tests across 1 file. [8.00ms] |
| `058-s122-bun-test-packages-broker-test-command-legality-test-ts.log` | `bun test packages/broker/test/command-legality.test.ts` | 0 | 26 pass; 0 fail; 85 expect() calls; Ran 26 tests across 1 file. [7.00ms] |
| `059-s122-bun-test-packages-broker-test-publish-legality-test-ts.log` | `bun test packages/broker/test/publish-legality.test.ts` | 0 | 24 pass; 0 fail; 582 expect() calls; Ran 24 tests across 1 file. [71.00ms] |
| `060-s122-bun-test-packages-broker-test-in-process-client-test-ts.log` | `bun test packages/broker/test/in-process-client.test.ts` | 0 | 13 pass; 0 fail; 203 expect() calls; Ran 13 tests across 1 file. [446.00ms] |
| `061-s122-bun-test-packages-storage-test-home-test-ts.log` | `bun test packages/storage/test/home.test.ts` | 0 | 4 pass; 0 fail; 4 expect() calls; Ran 4 tests across 1 file. [10.00ms] |
| `062-s122-bun-test-packages-storage-test-storage-root-test-ts.log` | `bun test packages/storage/test/storage-root.test.ts` | 0 | 13 pass; 0 fail; 17 expect() calls; Ran 13 tests across 1 file. [11.00ms] |
| `063-s122-bun-test-packages-storage-test-session-storage-test-ts.log` | `bun test packages/storage/test/session-storage.test.ts` | 0 | 6 pass; 0 fail; 19 expect() calls; Ran 6 tests across 1 file. [12.00ms] |
| `064-s122-bun-test-packages-storage-test-capability-store-test-ts.log` | `bun test packages/storage/test/capability-store.test.ts` | 0 | 7 pass; 0 fail; 193 expect() calls; Ran 7 tests across 1 file. [22.00ms] |
| `065-s122-bun-test-packages-pty-host-test-frames-test-ts.log` | `bun test packages/pty-host/test/frames.test.ts` | 0 | 7 pass; 0 fail; 20 expect() calls; Ran 7 tests across 1 file. [7.00ms] |
| `066-s122-bun-test-packages-pty-host-test-main-guard-test-ts.log` | `bun test packages/pty-host/test/main-guard.test.ts` | 0 | 28 pass; 0 fail; 706 expect() calls; Ran 28 tests across 1 file. [12.93s] |
| `067-s122-bun-test-packages-pty-host-test-launch-test-ts.log` | `bun test packages/pty-host/test/launch.test.ts` | 0 | 5 pass; 0 fail; 17 expect() calls; Ran 5 tests across 1 file. [30.00ms] |
| `068-s122-bun-test-packages-pty-host-test-signals-test-ts.log` | `bun test packages/pty-host/test/signals.test.ts` | 0 | 5 pass; 0 fail; 13 expect() calls; Ran 5 tests across 1 file. [2.18s] |
| `069-s122-bun-test-packages-broker-test-pty-host-protocol-test-ts.log` | `bun test packages/broker/test/pty-host-protocol.test.ts` | 0 | 3 pass; 0 fail; 82 expect() calls; Ran 3 tests across 1 file. [7.00ms] |
| `070-s122-bun-test-packages-broker-test-pty-host-supervisor-test-ts.log` | `bun test packages/broker/test/pty-host-supervisor.test.ts` | 0 | 27 pass; 0 fail; 173 expect() calls; Ran 27 tests across 1 file. [11.89s] |
| `071-s122-bun-test-packages-supervisor-test-preflight-test-ts.log` | `bun test packages/supervisor/test/preflight.test.ts` | 0 | 31 pass; 0 fail; 369 expect() calls; Ran 31 tests across 1 file. [28.16s] |
| `072-s122-bun-test-packages-supervisor-test-environment-test-ts.log` | `bun test packages/supervisor/test/environment.test.ts` | 0 | 5 pass; 0 fail; 4621 expect() calls; Ran 5 tests across 1 file. [13.00ms] |
| `073-s122-bun-test-packages-supervisor-test-attestation-test-ts.log` | `bun test packages/supervisor/test/attestation.test.ts` | 0 | 21 pass; 0 fail; 224 expect() calls; Ran 21 tests across 1 file. [12.64s] |
| `074-s122-bun-test-packages-supervisor-test-build-rollback-test-ts.log` | `bun test packages/supervisor/test/build-rollback.test.ts` | 0 | 19 pass; 0 fail; 578 expect() calls; Ran 19 tests across 1 file. [11.65s] |
| `075-s122-bun-test-apps-madbridge-test-cli-test-ts.log` | `bun test apps/madbridge/test/cli.test.ts` | 0 | 29 pass; 0 fail; 81 expect() calls; Ran 29 tests across 1 file. [1.54s] |
| `076-s122-bun-test-apps-madbridge-test-cli-gate-test-ts.log` | `bun test apps/madbridge/test/cli-gate.test.ts` | 0 | 8 pass; 0 fail; 25 expect() calls; Ran 8 tests across 1 file. [17.00ms] |
| `077-s122-bun-test-apps-madbridge-test-cli-placeholders-test-ts.log` | `bun test apps/madbridge/test/cli-placeholders.test.ts` | 0 | 11 pass; 0 fail; 44 expect() calls; Ran 11 tests across 1 file. [17.00ms] |
| `078-s122-bun-test-apps-madbridge-test-init-storage-test-ts.log` | `bun test apps/madbridge/test/init-storage.test.ts` | 0 | 6 pass; 0 fail; 17 expect() calls; Ran 6 tests across 1 file. [20.00ms] |
| `079-s122-bun-test-apps-madbridge-test-doctor-test-ts.log` | `bun test apps/madbridge/test/doctor.test.ts` | 0 | 12 pass; 0 fail; 87 expect() calls; Ran 12 tests across 1 file. [2.76s] |
| `080-s122-bun-test-test-phase3a-harness-lifecycle-test-ts.log` | `bun test test/phase3a/harness-lifecycle.test.ts` | 0 | 9 pass; 0 fail; 91 expect() calls; Ran 9 tests across 1 file. [2.89s] |
| `081-s122-bun-test-test-phase3a-harness-rollback-test-ts.log` | `bun test test/phase3a/harness-rollback.test.ts` | 0 | 12 pass; 0 fail; 223 expect() calls; Ran 12 tests across 1 file. [5.93s] |
| `082-s122-bun-test-test-phase3a-environment-equality-test-ts.log` | `bun test test/phase3a/environment-equality.test.ts` | 0 | 3 pass; 0 fail; 86 expect() calls; Ran 3 tests across 1 file. [943.00ms] |
| `083-s122-bun-test-test-phase3a-evidence-pipeline-test-ts.log` | `bun test test/phase3a/evidence-pipeline.test.ts` | 0 | 30 pass; 0 fail; 2491 expect() calls; Ran 30 tests across 1 file. [7.36s] |
| `084-s122-bun-test-test-phase3a-spike.log` | `bun test test/phase3a/spike` | 0 | 11 pass; 0 fail; 111 expect() calls; Ran 11 tests across 2 files. [9.89s] |
| `085-s122-bun-test-test-phase3a-adversarial.log` | `bun test test/phase3a/adversarial` | 0 | 34 pass; 0 fail; 658 expect() calls; Ran 34 tests across 9 files. [22.92s] |
| `086-s122-bun-test-test-acceptance.log` | `bun test test/acceptance` | 0 | 87 pass; 0 fail; 214 expect() calls; Ran 87 tests across 4 files. [365.00ms] |
| `087-s122-bun-apps-madbridge-src-cli-ts-start-json-echo-exit-expect-78.log` | `bun apps/madbridge/src/cli.ts start --json; echo "exit=$?"   # expect 78` | 0 | not a test command |
| `088-s122-bun-apps-madbridge-src-cli-ts-status-json-echo-exit-expect-6.log` | `bun apps/madbridge/src/cli.ts status --json; echo "exit=$?"  # expect 69` | 0 | not a test command |
| `089-s122-bun-apps-madbridge-src-cli-ts-pause-json-echo-exit-expect-69.log` | `bun apps/madbridge/src/cli.ts pause --json; echo "exit=$?"   # expect 69` | 0 | not a test command |
| `090-s122-bun-apps-madbridge-src-cli-ts-resume-json-echo-exit-expect-6.log` | `bun apps/madbridge/src/cli.ts resume --json; echo "exit=$?"  # expect 69` | 0 | not a test command |
| `091-s122-bun-apps-madbridge-src-cli-ts-close-json-echo-exit-expect-69.log` | `bun apps/madbridge/src/cli.ts close --json; echo "exit=$?"   # expect 69` | 0 | not a test command |
| `092-s122-bun-test-phase3a-negative-control-ts-echo-negative-control-e.log` | `bun test/phase3a/negative-control.ts; echo "negative_control_exit=$?"     # expect 0` | 0 | not a test command |
| `093-s122-echo-pty-host-processes-pgrep-f-madv-pty-host-wc-l-tr-d-expe.log` | `echo "pty_host_processes=$(pgrep -f madv-pty-host \| wc -l \| tr -d ' ')"   # expect 0` | 0 | not a test command |
| `094-s122-bun-run-typecheck.log` | `bun run typecheck` | 0 | not a test command |
| `095-s122-bun-run-test-arch.log` | `bun run test:arch` | 0 | 59 pass; 0 fail; 557 expect() calls; Ran 59 tests across 2 files. [8.58s] |
| `096-s122-bun-run-test-phase3a.log` | `bun run test:phase3a` | 0 | 156 pass; 0 fail; 4334 expect() calls; Ran 156 tests across 18 files. [61.96s] |
| `097-s122-bun-run-test-adversarial.log` | `bun run test:adversarial` | 0 | 34 pass; 0 fail; 658 expect() calls; Ran 34 tests across 9 files. [22.98s] |
| `098-s122-bun-run-verify-phase3a.log` | `bun run verify:phase3a` | 0 | 59 pass; 0 fail; 557 expect() calls; Ran 59 tests across 2 files. [8.41s] then 156 pass; 0 fail; 4334 expect() calls; Ran 156 tests across 18 files. [59.66s] then 34 pass; 0 fail; 658 expect() calls; Ran 34 tests across 9 files. [24.44s] |
| `099-end-state.log` | `git status --porcelain; bun.lock SHA-256; Hermes process count` | not printed | not a test command |

Last lines of the bare `bun test`, from `023-s83-bun-test.log`:

```text
 1902 pass
 0 fail
 20141 expect() calls
Ran 1902 tests across 140 files. [186.71s]
```

This is the bare `bun test` of plan §12.1, run once as plan §8.3 step 3, and
under plan §12.3 it is the full-suite result. It ran 1902 tests across 140
files with 20141 expect() calls and 0 failures, above the floor of plan §8.8
of 714 tests, 2606 expect() calls and 35 files. Every other test command
above is filtered or path-scoped, and none is a suite count.

The whitespace check of plan §8.3 step 2, `git diff --check
"$SOURCE_BASELINE_SHA"`, is
`022-s83-git-diff-check-SOURCE-BASELINE-SHA.log`. Its command_exit is 2, and
its output is 33 lines, 2,138 bytes, SHA-256
`fe33892c34b87319d59b7f0562373aa2d188cc2a5565a0e0e2daed19f72d6438`: the
output that Addendum 3 A1 records, byte for byte. Under Addendum 3 B1 it
counts as clean under plan §8.8. Its lines are not quoted here; section 7
states the limitation.

The production-surface commands of plan §8.3 step 5 and plan §12.2 returned
their gated payloads. Each command ends with `echo "exit=$?"`, so its
command_exit is that of `echo` and the CLI's own exit status is the printed
`exit=` line:

| Log | Payload printed | Printed exit |
| --- | --- | --- |
| `031-s83-bun-apps-madbridge-src-cli-ts-start-json-echo-exit.log` | `{"ok":false,"error":"live_runtime_not_certified","hint":"Phase 3A runtime foundation is present; live startup requires Phase 3B certification."}` | `exit=78` |
| `032-s83-bun-apps-madbridge-src-cli-ts-status-json-echo-exit.log` | `{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls."}` | `exit=69` |
| `033-s83-bun-apps-madbridge-src-cli-ts-pause-json-echo-exit.log` | `{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls."}` | `exit=69` |
| `034-s83-bun-apps-madbridge-src-cli-ts-resume-json-echo-exit.log` | `{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls."}` | `exit=69` |
| `035-s83-bun-apps-madbridge-src-cli-ts-close-json-echo-exit.log` | `{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls. If the TUI is unresponsive during an incident, terminate the foreground supervisor process; supervisor exit terminates all governed children fail-closed."}` | `exit=69` |
| `087-s122-bun-apps-madbridge-src-cli-ts-start-json-echo-exit-expect-78.log` | `{"ok":false,"error":"live_runtime_not_certified","hint":"Phase 3A runtime foundation is present; live startup requires Phase 3B certification."}` | `exit=78` |
| `088-s122-bun-apps-madbridge-src-cli-ts-status-json-echo-exit-expect-6.log` | `{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls."}` | `exit=69` |
| `089-s122-bun-apps-madbridge-src-cli-ts-pause-json-echo-exit-expect-69.log` | `{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls."}` | `exit=69` |
| `090-s122-bun-apps-madbridge-src-cli-ts-resume-json-echo-exit-expect-6.log` | `{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls."}` | `exit=69` |
| `091-s122-bun-apps-madbridge-src-cli-ts-close-json-echo-exit-expect-69.log` | `{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls. If the TUI is unresponsive during an incident, terminate the foreground supervisor process; supervisor exit terminates all governed children fail-closed."}` | `exit=69` |

The negative controls and the residual sweep printed:

From `037-s83-bun-test-phase3a-negative-control-ts-echo-negative-control-e.log`:

```text
broker_sock_matches[storage-root]=0
  unreadable: /Users/michaeldaley/Library/Saved Application State/com.izotope.Ozone11.savedState: EACCES: permission denied, scandir '/Users/michaeldaley/Library/Saved Application State/com.izotope.Ozone11.savedState'
broker_sock_matches[legacy-quarantine]=0
broker_sock_matches[repo-worktree]=0
negative-control: PASS (no broker.sock under any governed root)
negative_control_exit=0
```

From `038-s83-echo-pty-host-processes-pgrep-f-madv-pty-host-wc-l-tr-d.log`:

```text
pty_host_processes=0
```

From `092-s122-bun-test-phase3a-negative-control-ts-echo-negative-control-e.log`:

```text
broker_sock_matches[storage-root]=0
  unreadable: /Users/michaeldaley/Library/Saved Application State/com.izotope.Ozone11.savedState: EACCES: permission denied, scandir '/Users/michaeldaley/Library/Saved Application State/com.izotope.Ozone11.savedState'
broker_sock_matches[legacy-quarantine]=0
broker_sock_matches[repo-worktree]=0
negative-control: PASS (no broker.sock under any governed root)
negative_control_exit=0
```

From `093-s122-echo-pty-host-processes-pgrep-f-madv-pty-host-wc-l-tr-d-expe.log`:

```text
pty_host_processes=0
```

## 6. Spike criteria, adversarial criteria and measured timings

The two lines of the bare `bun test` that begin with the spike tag, from `023-s83-bun-test.log`:

```text
[spike] host=darwin/arm64 bun=1.4.2
[spike] pty_tty_allocation=2ms(pass) exact_binary_io=1ms(pass) resize_propagation=3ms(pass) process_group_and_signals=25ms(pass) child_and_grandchild_termination=23ms(pass) two_ptys_plus_adapter_no_leak=0ms(pass) supervisor_exit_modes=2103ms(pass) lifeline_eof=57ms(pass) pty_host_death=43ms(pass) sigstop_wedged_direct_pgid=302ms(pass) child_ignores_sigterm=723ms(pass) clean_exit_reporting=2075ms(pass) measured_timing=2103ms(pass)
```

The thirteen spike criteria, as the second line prints them:

| Criterion | Observed | Result |
| --- | --- | --- |
| `pty_tty_allocation` | 2 ms | pass |
| `exact_binary_io` | 1 ms | pass |
| `resize_propagation` | 3 ms | pass |
| `process_group_and_signals` | 25 ms | pass |
| `child_and_grandchild_termination` | 23 ms | pass |
| `two_ptys_plus_adapter_no_leak` | 0 ms | pass |
| `supervisor_exit_modes` | 2103 ms | pass |
| `lifeline_eof` | 57 ms | pass |
| `pty_host_death` | 43 ms | pass |
| `sigstop_wedged_direct_pgid` | 302 ms | pass |
| `child_ignores_sigterm` | 723 ms | pass |
| `clean_exit_reporting` | 2075 ms | pass |
| `measured_timing` | 2103 ms | pass |

The sub-assertions of the four compound criteria, by the names
`test/phase3a/spike/bun-terminal-spike.ts` gives them at the candidate
commit, each at the line that assigns it. Each is marked passed on the
strength of this pass line of the bare `bun test`, from
`023-s83-bun-test.log`:

```text
(pass) every compound criterion reports each sub-assertion individually [0.07ms]
```

That test checks that each compound criterion reports exactly these
sub-assertions and that every one of them is true. A passing run prints no
sub-assertion values of its own.

| Criterion | Sub-assertion | Defined at | Result |
| --- | --- | --- | --- |
| `process_group_and_signals` | `pgid_equals_child_pid` | `test/phase3a/spike/bun-terminal-spike.ts:1106` | passed |
| `process_group_and_signals` | `distinct_from_fixture_host_group` | `test/phase3a/spike/bun-terminal-spike.ts:1108` | passed |
| `process_group_and_signals` | `distinct_from_driver_group` | `test/phase3a/spike/bun-terminal-spike.ts:1109` | passed |
| `process_group_and_signals` | `sigterm_to_group_observed` | `test/phase3a/spike/bun-terminal-spike.ts:1117` | passed |
| `process_group_and_signals` | `sigkill_to_group_clears_group` | `test/phase3a/spike/bun-terminal-spike.ts:1128` | passed |
| `child_and_grandchild_termination` | `group_had_child_and_grandchild` | `test/phase3a/spike/bun-terminal-spike.ts:1154` | passed |
| `child_and_grandchild_termination` | `child_gone_after_group_signal` | `test/phase3a/spike/bun-terminal-spike.ts:1159` | passed |
| `child_and_grandchild_termination` | `grandchild_gone_after_group_signal` | `test/phase3a/spike/bun-terminal-spike.ts:1160` | passed |
| `child_and_grandchild_termination` | `within_outer_bound` | `test/phase3a/spike/bun-terminal-spike.ts:1161` | passed |
| `two_ptys_plus_adapter_no_leak` | `adapter_holds_no_pty_descriptor` | `test/phase3a/spike/bun-terminal-spike.ts:1202` | passed |
| `two_ptys_plus_adapter_no_leak` | `closing_terminal_a_kills_only_its_reader` | `test/phase3a/spike/bun-terminal-spike.ts:1207` | passed |
| `two_ptys_plus_adapter_no_leak` | `terminal_b_independent_after_a_close` | `test/phase3a/spike/bun-terminal-spike.ts:1214` | passed |
| `two_ptys_plus_adapter_no_leak` | `adapter_unaffected_by_terminal_closures` | `test/phase3a/spike/bun-terminal-spike.ts:1215` | passed |
| `two_ptys_plus_adapter_no_leak` | `no_pty_descriptor_survives_cleanup` | `test/phase3a/spike/bun-terminal-spike.ts:1219` | passed |
| `supervisor_exit_modes` | `clean_exit_ladder` | `test/phase3a/spike/bun-terminal-spike.ts:1259` | passed |
| `supervisor_exit_modes` | `crash_sigabrt_orphans_detected_and_swept` | `test/phase3a/spike/bun-terminal-spike.ts:1285` | passed |
| `supervisor_exit_modes` | `sigterm_handled_ladder_runs` | `test/phase3a/spike/bun-terminal-spike.ts:1306` | passed |
| `supervisor_exit_modes` | `sigkill_orphans_detected_and_swept` | `test/phase3a/spike/bun-terminal-spike.ts:1325` | passed |

The pass line of each adversarial test in the bare `bun test`, under the file line Bun printed before it, from `023-s83-bun-test.log`:

```text
test/phase3a/adversarial/process-group.test.ts:
(pass) a grandchild in the governed process group is terminated [381.37ms]
(pass) a child that ignores SIGTERM is SIGKILLed within the outer bound [2315.27ms]
(pass) deliberate lifeline EOF terminates that child's process group only [510.21ms]
(pass) PTY-host exit interrupts the whole session with pty_host_failure [476.52ms]
(pass) a descendant that calls setsid is documented as escaping, not silently claimed contained [330.52ms]
test/phase3a/adversarial/supervisor-death.test.ts:
(pass) supervisor clean exit terminates every governed child [318.82ms]
(pass) supervisor SIGTERM terminates every governed child [331.23ms]
(pass) supervisor crash terminates every governed child [286.49ms]
(pass) supervisor SIGKILL terminates every governed child and leaves no typed terminal prefix [273.47ms]
(pass) next-start reconciliation appends session_unclean_closure after SIGKILL [301.72ms]
(pass) no governed process survives any supervisor-death scenario [1219.62ms]
test/phase3a/adversarial/cleanup-residuals.test.ts:
(pass) the residual census retains durable closure and token evidence after storage deletion [292.20ms]
(pass) the first surface is torn down when the second surface fails to launch [534.52ms]
(pass) no child, descendant, host, descriptor, open ledger session, or live fencing token remains after the adversarial suite [4690.16ms]
test/phase3a/adversarial/descriptor-hygiene.test.ts:
(pass) with two PTY hosts and an adapter, no process holds a sibling's lifeline write end [439.50ms]
(pass) closing host A's stdin does not affect host B [507.52ms]
test/phase3a/adversarial/attestation-drift.test.ts:
(pass) live attestation mismatch interrupts the session with identity_mismatch [466.71ms]
(pass) replacing the executable between preflight and exec is caught by the adjacent re-hash [318.02ms]
test/phase3a/adversarial/wedged-host.test.ts:
(pass) a SIGSTOPped host is cleared through the direct PGID path [600.88ms]
(pass) the wedged-host descendant survives host death without a direct PGID kill [422.94ms]
(pass) a host that never acknowledges a command is treated as host failure at 250 ms [601.33ms]
(pass) a wedged host receives no responsive-host grace [594.78ms]
(pass) a running host that drops its acknowledgement of a command is treated as host failure at 250 ms [642.79ms]
(pass) malformed host frames fail closed and interrupt the session [426.90ms]
(pass) unknown host frame tags fail closed [388.05ms]
test/phase3a/adversarial/auth-expiry.test.ts:
(pass) mid-session authentication expiry interrupts with authentication_expired [435.76ms]
(pass) recovery requires a new envelope and a new session, not a resume [721.30ms]
test/phase3a/adversarial/sequence-invariants.test.ts:
(pass) a duplicate output sequence interrupts the session [404.72ms]
(pass) an output sequence regression interrupts the session [417.20ms]
(pass) an output sequence gap interrupts the session [405.00ms]
(pass) a snapshot sequence gap interrupts the session [391.02ms]
(pass) every timing assertion reports observed values, not just pass [380.09ms]
test/phase3a/adversarial/ledger-failure.test.ts:
(pass) a mid-session append failure interrupts with ledger_write_failed [448.38ms]
(pass) an unrecordable interruption is completed by next-start reconciliation [390.85ms]
```

That is 34 adversarial tests in 9 files, all passing.

The measured timings of plan §8.5, against the bounds of spec §9.8. Every
value is taken from `023-s83-bun-test.log`, the bare `bun test` of this run;
the sources below quote the lines it comes from.

| Measurement | Bound | Observed | Source log |
| --- | --- | --- | --- |
| Host acknowledgement of a command | 250 ms or less | 1 ms, from `exact_binary_io=1ms(pass)` | `023-s83-bun-test.log` |
| termination_started after terminate | 500 ms or less | 0.51 ms, from `signals termination_started_ms=0.51` | `023-s83-bun-test.log` |
| Escalation after a missed acknowledgement or lifeline loss | 500 ms or less | smallest 250.24116599999252 ms, largest 250.8416670000006 ms, count 12: the `pgidKillAttemptedMs`, `hostKillAttemptedMs` and `escalatedMs` of the 4 `host_fault` lines of `test/phase3a/adversarial/wedged-host.test.ts` that carry an escalation | `023-s83-bun-test.log` |
| Responsive-host child grace | 2000 ms, after the host confirms SIGTERM | 2017.44 ms as `grace_ms`, with `termination_started_ms` 0.37 ms and `exited_ms` 2017.81 ms beside it, from `signals sigterm_ignored termination_started_ms=0.37 exited_ms=2017.81 grace_ms=2017.44` | `023-s83-bun-test.log` |
| Unresponsive or SIGSTOP host grace | none, direct PGID path | 302 ms, from `sigstop_wedged_direct_pgid=302ms(pass)` | `023-s83-bun-test.log` |
| All governed processes gone | 5000 ms or less | smallest 12.25 ms, largest 2031.14 ms, count 19: every `final_death_ms=` value the bare `bun test` printed; the 6 that `test/phase3a/adversarial/cleanup-residuals.test.ts` printed, the file plan §8.5 names, run from 14.582874999992782 ms to 534.2837500000023 ms | `023-s83-bun-test.log` |

### Sources of the measured timings

Host acknowledgement: the spike's `exact_binary_io` criterion, which
DEC-20261104-02 A4 item 4 names for this row; plan §8.5 calls it `exact_io`.
The spike prints each criterion in whole milliseconds. The test `host
acknowledgement is within 250 ms` passed.

`termination_started` and the responsive-host grace: the lines of
`packages/pty-host/test/signals.test.ts` in the bare `bun test`, the first
test's `termination_started_ms` and the second test's line of Addendum 1 B2,
timed as Addendum 2 B1 says. `grace_ms` is `exited_ms` less
`termination_started_ms`, the time from the host's confirmation, which it
emits just before it sends SIGTERM, to the `exited` fact. It is 2017.44 ms,
not below 2000, so the halt of Addendum 1 B4 did not occur. The whole of
that file's output:

```text
packages/pty-host/test/signals.test.ts:
signals termination_started_ms=0.51
(pass) termination_started is emitted within 500 ms [45.99ms]
signals sigterm_ignored termination_started_ms=0.37 exited_ms=2017.81 grace_ms=2017.44
(pass) a child ignoring SIGTERM is SIGKILLed after the 2 s grace [2062.27ms]
(pass) lifeline EOF terminates the child process group without a terminate command [46.61ms]
(pass) all deadlines are measured on a monotonic clock [0.48ms]
(pass) a grandchild in the same process group is terminated [45.35ms]
```

Escalation and the SIGSTOP host: the `host_fault` lines of
`test/phase3a/adversarial/wedged-host.test.ts`. Of its 6 lines, 4 carry an
escalation, from the 4 tests the table below names, in which the host missed
its acknowledgement of a command. The other 2 carry `"escalation":null`;
they come from the tests of malformed and unknown host frames. Spec §9.8
bounds escalation after a missed acknowledgement or a lifeline loss; the
values here are all after a missed acknowledgement. Each escalation value,
with the test whose pass line follows it:

| Test | `pgidKillAttemptedMs` | `hostKillAttemptedMs` | `escalatedMs` |
| --- | --- | --- | --- |
| a SIGSTOPped host is cleared through the direct PGID path | 250.66104100001394 ms | 250.6766250000219 ms | 250.67741600002046 ms |
| a host that never acknowledges a command is treated as host failure at 250 ms | 250.40366599999834 ms | 250.41441600001417 ms | 250.41500000000815 ms |
| a wedged host receives no responsive-host grace | 250.24116599999252 ms | 250.24629099998856 ms | 250.2463749999879 ms |
| a running host that drops its acknowledgement of a command is treated as host failure at 250 ms | 250.82829200002016 ms | 250.8407920000027 ms | 250.8416670000006 ms |

The SIGSTOP row is the spike's `sigstop_wedged_direct_pgid` criterion. Its
detail is printed only when it fails, and the passing test `a SIGSTOP-wedged
host earns no child grace` checks that the host never acknowledged, that
escalation started within 500 ms and that the whole took less than the 2000
ms grace. The whole of the output of
`test/phase3a/adversarial/wedged-host.test.ts`:

```text
test/phase3a/adversarial/wedged-host.test.ts:
host_fault {"detectedMs":258.2137909999874,"deathMs":284.48254099997575,"escalation":{"reason":"pty_host_failure","state":"S3","escalated":true,"closeStdinCalled":true,"sessionInterruptionRequired":true,"pgidKillAttempted":true,"hostKillAttempted":true,"unnecessaryHostExitConfirmed":false,"killOrder":["pgid","host"],"observedMs":{"terminateSentMs":0.023333000019192696,"ackWindowEndedMs":250.4342910000123,"stdinClosedMs":250.4810830000206,"classifiedMs":250.56925000000047,"pgidKillAttemptedMs":250.66104100001394,"hostKillAttemptedMs":250.6766250000219,"escalatedMs":250.67741600002046}},"terminateAcks":0,"terminationStarted":false,"resizeAcks":0,"errorName":null,"sequenceKind":null,"publicationError":null,"sqliteCode":null,"authExpired":false,"reportedModel":null}
(pass) a SIGSTOPped host is cleared through the direct PGID path [600.88ms]
wedged_descendant_calibration host_dead_ms=112.76820799999405 descendant_alive=true
(pass) the wedged-host descendant survives host death without a direct PGID kill [422.94ms]
host_fault {"detectedMs":254.288166000013,"deathMs":279.081124999997,"escalation":{"reason":"pty_host_failure","state":"S3","escalated":true,"closeStdinCalled":true,"sessionInterruptionRequired":true,"pgidKillAttempted":true,"hostKillAttempted":true,"unnecessaryHostExitConfirmed":false,"killOrder":["pgid","host"],"observedMs":{"terminateSentMs":0.011625000013737008,"ackWindowEndedMs":250.27733300000546,"stdinClosedMs":250.30470800001058,"classifiedMs":250.34825000001,"pgidKillAttemptedMs":250.40366599999834,"hostKillAttemptedMs":250.41441600001417,"escalatedMs":250.41500000000815}},"terminateAcks":0,"terminationStarted":false,"resizeAcks":0,"errorName":null,"sequenceKind":null,"publicationError":null,"sqliteCode":null,"authExpired":false,"reportedModel":null}
(pass) a host that never acknowledges a command is treated as host failure at 250 ms [601.33ms]
host_fault {"detectedMs":252.03845800002455,"deathMs":275.23045800000546,"escalation":{"reason":"pty_host_failure","state":"S3","escalated":true,"closeStdinCalled":true,"sessionInterruptionRequired":true,"pgidKillAttempted":true,"hostKillAttempted":true,"unnecessaryHostExitConfirmed":false,"killOrder":["pgid","host"],"observedMs":{"terminateSentMs":0.018041000002995133,"ackWindowEndedMs":250.21470799998497,"stdinClosedMs":250.2217079999973,"classifiedMs":250.22762499999953,"pgidKillAttemptedMs":250.24116599999252,"hostKillAttemptedMs":250.24629099998856,"escalatedMs":250.2463749999879}},"terminateAcks":0,"terminationStarted":false,"resizeAcks":0,"errorName":null,"sequenceKind":null,"publicationError":null,"sqliteCode":null,"authExpired":false,"reportedModel":null}
(pass) a wedged host receives no responsive-host grace [594.78ms]
host_fault {"detectedMs":255.45129200001247,"deathMs":281.211249999993,"escalation":{"reason":"pty_host_failure","state":"S3","escalated":true,"closeStdinCalled":true,"sessionInterruptionRequired":true,"pgidKillAttempted":true,"hostKillAttempted":true,"unnecessaryHostExitConfirmed":false,"killOrder":["pgid","host"],"observedMs":{"terminateSentMs":0.052583000011509284,"ackWindowEndedMs":250.69845800002804,"stdinClosedMs":250.71904200001154,"classifiedMs":250.75920800000313,"pgidKillAttemptedMs":250.82829200002016,"hostKillAttemptedMs":250.8407920000027,"escalatedMs":250.8416670000006}},"terminateAcks":0,"terminationStarted":false,"resizeAcks":1,"errorName":null,"sequenceKind":null,"publicationError":null,"sqliteCode":null,"authExpired":false,"reportedModel":null}
(pass) a running host that drops its acknowledgement of a command is treated as host failure at 250 ms [642.79ms]
host_fault {"detectedMs":1.8352909999957774,"deathMs":24.399208000017097,"escalation":null,"terminateAcks":1,"terminationStarted":true,"resizeAcks":0,"errorName":"MalformedFrameError","sequenceKind":null,"publicationError":null,"sqliteCode":null,"authExpired":false,"reportedModel":null}
(pass) malformed host frames fail closed and interrupt the session [426.90ms]
host_fault {"detectedMs":1.7456250000104774,"deathMs":24.144250000012107,"escalation":null,"terminateAcks":1,"terminationStarted":true,"resizeAcks":0,"errorName":"MalformedFrameError","sequenceKind":null,"publicationError":null,"sqliteCode":null,"authExpired":false,"reportedModel":null}
(pass) unknown host frame tags fail closed [388.05ms]
wedged-host alive EPERM count=0
```

All governed processes gone: every `final_death_ms=` value the bare `bun
test` printed, by file, in the order printed:

| File | Printed text | Value |
| --- | --- | --- |
| `test/phase3a/adversarial/process-group.test.ts` | `ignore_SIGTERM: final_death_ms=2031.14` | 2031.14 ms |
| `test/phase3a/adversarial/process-group.test.ts` | `lifeline_EOF: final_death_ms=174.53` | 174.53 ms |
| `test/phase3a/adversarial/process-group.test.ts` | `host_exit: final_death_ms=189.91` | 189.91 ms |
| `test/phase3a/adversarial/supervisor-death.test.ts` | `supervisor clean: exit=0 signal=null final_death_ms=28.55` | 28.55 ms |
| `test/phase3a/adversarial/supervisor-death.test.ts` | `supervisor SIGTERM: exit=0 signal=null final_death_ms=27.95` | 27.95 ms |
| `test/phase3a/adversarial/supervisor-death.test.ts` | `supervisor crash: exit=1 signal=null final_death_ms=14.44` | 14.44 ms |
| `test/phase3a/adversarial/supervisor-death.test.ts` | `supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=12.31` | 12.31 ms |
| `test/phase3a/adversarial/supervisor-death.test.ts` | `supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=12.25` | 12.25 ms |
| `test/phase3a/adversarial/supervisor-death.test.ts` | `supervisor clean: exit=0 signal=null final_death_ms=28.25` | 28.25 ms |
| `test/phase3a/adversarial/supervisor-death.test.ts` | `supervisor SIGTERM: exit=0 signal=null final_death_ms=27.84` | 27.84 ms |
| `test/phase3a/adversarial/supervisor-death.test.ts` | `supervisor crash: exit=1 signal=null final_death_ms=13.72` | 13.72 ms |
| `test/phase3a/adversarial/supervisor-death.test.ts` | `supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=12.37` | 12.37 ms |
| `test/phase3a/adversarial/cleanup-residuals.test.ts` | `second_surface_failure final_death_ms=534.2837500000023` | 534.2837500000023 ms |
| `test/phase3a/adversarial/cleanup-residuals.test.ts` | `census_supervisor clean final_death_ms=29.3002919999999` | 29.3002919999999 ms |
| `test/phase3a/adversarial/cleanup-residuals.test.ts` | `census_supervisor SIGTERM final_death_ms=29.168292000016663` | 29.168292000016663 ms |
| `test/phase3a/adversarial/cleanup-residuals.test.ts` | `census_supervisor crash final_death_ms=16.256500000017695` | 16.256500000017695 ms |
| `test/phase3a/adversarial/cleanup-residuals.test.ts` | `census_supervisor SIGKILL final_death_ms=14.582874999992782` | 14.582874999992782 ms |
| `test/phase3a/adversarial/cleanup-residuals.test.ts` | `residual_census final_death_ms=26.112999999983003`, then the census record, not reproduced here | 26.112999999983003 ms |
| `test/phase3a/adversarial/attestation-drift.test.ts` | `adjacent_rehash final_death_ms=317.7952079999959` | 317.7952079999959 ms |

## 7. Failures, retries, warnings and residual risks

Failures: none. Every test command of the run printed 0 fail, and every
command whose log records an exit status exited as plan §8.8 and
DEC-20261104-02 B7 item 6 expect: command_exit 0, except the whitespace
check's 2, which Addendum 3 B1 fixes; `start` printed `exit=78` and each of
the four placeholders `exit=69`. The first line of the run's `SUMMARY.txt`
is `host=macbook candidate=ffcecaf9dbb6b2de3b406e475825137ddfe726b7
result=CLEAN`.

Retries: none. Each command has one log, the manifest lists each log once,
and no log records a rerun, as DEC-20261104-02 B7 items 4 and 5 and Addendum
3 B4 item 3 require.

Load: each log of a command records `uptime` before it. The first load
average ranged from 1.57 to 4.72 over the run.

Warnings: `023-s83-bun-test.log` printed 6 lines that warn, each the line
quoted below. The run had no failing test.

```text
react-test-renderer is deprecated. See https://react.dev/warnings/react-test-renderer
```

No other log of the run printed a warning.

No alive-check EPERM was counted: every `EPERM count=` line the bare `bun
test` printed shows 0, 6 lines in all.

Residual risk, known and unsolved: the `setsid` residual of spec §3.5. A
descendant that calls `setsid()` can escape its original process group, and
Phase 3A claims process-group containment, not hostile-process containment.
The run recorded it, in the output of
`test/phase3a/adversarial/process-group.test.ts`:

```text
setsid_residual: recorded_count=1 group_containment=false
(pass) a descendant that calls setsid is documented as escaping, not silently claimed contained [330.52ms]
```

Spec §3.5 also documents simultaneous external SIGKILL of both supervisor
and PTY host before either can clean up as a residual, acceptable for
Version 1. This report makes no claim about it.

Residual risk, known and unsolved: the agent-printed-secret residual of spec
§5.6. An agent or provider may print a secret despite the supervisor's
rules, and Phase 3A does not claim exhaustive secret-free evidence.

Stated limitation under Addendum 3 B5: the 17 whitespace errors of Addendum
3 A1 that the check of plan §8.3 step 2 prints. Sixteen are trailing
whitespace in four decision records, DEC-20260812-01, DEC-20260926-01,
DEC-20260929-01 and DEC-20261103-02, in
`docs/verification/2026-09-11-m6-final-checkpoint.md` and in
`docs/superpowers/specs/2026-09-19-phase-3b-live-tui-integration-design.md`.
One is a blank line at the end of `apps/madv-agent/src/proxy.ts`, merged in
pull request 171, which is carried to the first Phase 3B act. The documents
stay as signed.

Limitation of the printed timings, as Addendum 2 and the Hardening F build
log record. The values of `packages/pty-host/test/signals.test.ts` are the
times at which the test's reader decoded each fact from the host's standard
output, measured from `t0`, which the test takes just before it sends the
terminate command, not the times at which the host emitted them. They
include pipe transit and the reader's own scheduling, both of which can grow
under load, but not the waiters' 20 ms re-check. Facts decoded from one
chunk get times microseconds apart, in the order decoded. `grace_ms` is not
the host's `grace_waited` of Addendum 1 B1, and no assertion checks it. The
spike prints each criterion in whole milliseconds, and the `host_fault` and
`final_death_ms` values are the test's own `performance.now()` measurements.

Quoted lines: no quoted line ends in whitespace or holds a tab in its log,
so every quoted line is byte for byte the line of its log.

## 8. Evidence

This report is written under DEC-20261104-02 B9 item 2, as its Addenda 1 to
3 amend it, only from the logs of this host's certification run, which the
Founder ran under DEC-20261104-02 B7 with the script of Addendum 3 B4. Of
the run, only `MANIFEST.sha256`, the `logs/` folder, `SUMMARY.txt` and
`exits.txt` were read. The line numbers of section 6 are those of the
repository file at the candidate commit.

The run's `MANIFEST.sha256` has SHA-256
`5f84892110eaaf87cae97c629800c86b74b0220b59a68331650bca9399f0d3bc` and lists
99 logs, each below with its SHA-256 as the manifest lists it. For this
report, on the Ubuntu PC, `sha256sum -c` over the run's `logs/` folder found
every log matching it, and every file of that folder is listed in it. The
run folder is `~/builds/task58-cert-macbook`, the folder of Addendum 3 B4
item 1. The logs do not print its absolute path. The copy read for this
report is the one the Founder's command of DEC-20261104-02 B8 placed at
`/home/michaeldaley/builds/task58-cert-macbook` on the Ubuntu PC.

`SUMMARY.txt`, SHA-256
`11cb92fc17317ce48ad01330a4d34369811db40fa8fd12323514ce672300cf5d`, and
`exits.txt`, SHA-256
`bf1f669cb07c713e2915b269bc039d4966255c13f99256fdf6c73ead31a9c69d`, are
outside the manifest. `SUMMARY.txt` states `result=CLEAN`, and each exit
`exits.txt` lists equals the exit its log records.

Contents of `MANIFEST.sha256`:

```text
90b1783eafd4ac85277bf69290a7fb89ba73184561ca9d177f9ac997796135fc  001-install.log
debfbf29df491f9d1b2078bf2229a62e617bcad17a2e24f6bca069fc49696745  002-tree-after-install.log
1693ff0ab149f85d6c990293d7940fa0179c0f5359e7c6945cf6cb6568dbffa8  003-preflight-bunx.log
5dada7d89af94f9676946219b007d30913d961becb31b90a63fc990e1553d54e  004-s83-0-uname-m.log
424f6370248e4b640aba71ab161055c696cd73f9ebd55f13bd253037aea7a370  005-s83-0-sw-vers.log
c826c4c13b2841d885a8e75bde1dbfc545a7556d193c94dbed14fd627579c960  006-s83-0-bun-version.log
ac57c9091cc1dc1663e14874414cc24b3219eaf159dfeec6ba981dc670362610  007-s83-0-which-bun.log
c599d6f4b2fa71162a720e8b9b743673e297f7189e3b08daa889bf20f4ee49f3  008-s83-0-shasum-a-256-which-bun.log
b07a324c86696c9ac0b5ca16ff945967801861695dc0e90ca729306646bf7b18  009-s83-0-command-v-node.log
5ab97c2ef88913a17f9d1a94077d26ded938650956806e99aa5acc449e4b9aa4  010-s83-0-node-version.log
64b103fde3579f9454e11a2f4514dc59f337a2d0e452c2d50a8fb287c4b0a531  011-s83-0-printf-s-n-TERM.log
4cc63dd015d5bc9d54d134388fd8ba097e052405be9fd7ed56c5e83ff29fb2a5  012-s83-0-printf-s-n-SHELL.log
6967a0690ba9521b1c7460ca7cdd29856cf092adca8d0acbb966666f053eeed4  013-s83-0-perl-MCwd-e-print-Cwd-abs-path-shift-n-which-bun.log
7713fa97ab1f804bd835cbff62f32e59ac03298c226e73dd0d6faffe4b91cd99  014-s83-0-bun-e-process-stdout-write-Bun-revision-n.log
cd77ee2ce706da838b18e6b5720f0987ccfcc38b84cd788be117f1eaa10221f9  015-s83-SOURCE-BASELINE-SHA-aa16032c56fdf6c7105e99b1765ed9365d605bf4.log
728a8adc6566b7f592c734714520b9b1ed54caabda706b4640ca03004362741b  016-s83-git-rev-parse-HEAD.log
1af6755b37020e859f26301d09ff3e95d3c67aafec7bbbe8f53857dbab0c5c59  017-s83-git-branch-show-current.log
61a85eb1202404bf29528160ba8e776222b01f044a09e17af91f280de9503339  018-s83-git-status-sb.log
c9389138501f52878a1d564b672363384a5e802ed9dfe13d3f6c11743c07b753  019-s83-git-ls-files-others-exclude-standard.log
af63b76ed254964be4c18cd783a274717688b3d943b6f1766dd7a19a5a7be206  020-s83-git-diff-name-only-SOURCE-BASELINE-SHA.log
9f00eddbc3f7cee2d83cd1162b2c7ca18ea60643e4f062fd496ae9a408152658  021-s83-bunx-tsc-noEmit.log
fbeec49db53af1cc3780266f57fcedfb98945cbf9194f2a754c1148bdcf94807  022-s83-git-diff-check-SOURCE-BASELINE-SHA.log
a6405429a5a93df2b1e9bb90fd8c717bc485066891b57e9ada5779405af98e61  023-s83-bun-test.log
44cfcca9d69a1c313bd560804d2d4f6e3a3f20c58b6fb73581f6a6388a3374f8  024-s83-bun-test-test-architecture-boundaries-test-ts-test-phase3a-a.log
6ae7b4c9b3df4fa6b6aa1b09a9b9474d431805534692f16c46523451d63bb2d2  025-s83-bun-test-test-phase3a-harness-separation-test-ts.log
a5f3a3d41253e44677f7d91a84a6325a46c9feea40bf3252a635820bb5cef21c  026-s83-bun-test-test-phase3a-spike.log
c625c5aae6e71210c88a5903ca029166538d5e66d4c02106323ef40af4103659  027-s83-bun-test-test-phase3a-adversarial.log
88f3b293db6ea01dc42dfc59f514067e9d1221c19dfe891343c669feb098162c  028-s83-bun-test-packages-pty-host-packages-supervisor-packages-stor.log
21c157da21af6fdfa64a52a37e05624e9fe888de3bf373fec4d4cc9ff4486fd1  029-s83-bun-test-packages-protocol-packages-ledger-packages-broker.log
616b939f8786724941638ad82cb061c8e472e6fe2bb30c578b23d9925aa4dce4  030-s83-bun-test-apps-madbridge.log
0de25da6fbefa23afa02722a9ad2c62d72fe240ff258fa3450701a224e609ce9  031-s83-bun-apps-madbridge-src-cli-ts-start-json-echo-exit.log
baf48aff2d78f4e007789544aa794ca695d1fd0377d8f63bd6181b85b338dc8f  032-s83-bun-apps-madbridge-src-cli-ts-status-json-echo-exit.log
4f49a5f14f56c853a7186bdabc42ad5e6ad213e6bc847b93508f29c5bc9c19ce  033-s83-bun-apps-madbridge-src-cli-ts-pause-json-echo-exit.log
366c424cf3605230e65725dca414dd3c07855e6e80887bf0712e3114f7b2593c  034-s83-bun-apps-madbridge-src-cli-ts-resume-json-echo-exit.log
ecf9b3f1954b4e33bbafc4faabd708b3fc8c8d357f0cb9d3e158e8a773f57374  035-s83-bun-apps-madbridge-src-cli-ts-close-json-echo-exit.log
538a5c827d986f1bbc3d1cf25bffee334a3648f6a46d756da18f2bf9d619287a  036-s83-bun-apps-madbridge-src-cli-ts-help.log
1d19b336847b50ba1fd602d3081c7c18646f139d1756d8e6c1265bb1b906fa56  037-s83-bun-test-phase3a-negative-control-ts-echo-negative-control-e.log
71e6dd7e77e4ee35c622cc135f5206b84218d24549b124a9cd55efea36d35f2c  038-s83-echo-pty-host-processes-pgrep-f-madv-pty-host-wc-l-tr-d.log
38228ecf7786b864509f70831a7a98d6b63bd95dc7db4a4f4356b1b3de89a3c8  039-s122-bun-test-packages-protocol.log
b6d1fe1ccb276dd6047afbbe158b789440b5521f79265b2601e69934e28c3466  040-s122-bun-test-packages-ledger.log
96b2ecbc1257505c4a1ef17ffb0a8ad9c097a168f0ef8dd75be8ece25a42ab6d  041-s122-bun-test-packages-broker.log
62fbfa2c0a7f419bc05d04919dca819a5d6b5bbcb0dc3cfd14ece169df449ea5  042-s122-bun-test-packages-storage.log
a24815ebf62a2b6db0e7c784888587fd46211156793799322900d18e57d34260  043-s122-bun-test-packages-pty-host.log
eb49f99915dd2d89e7c6950437db9add24142e6f48e28282c73f37b951c2d437  044-s122-bun-test-packages-supervisor.log
410a8375eb0dcc29678b89b9d3e6ee2f51720a5d2703f92c6e750ec4d788ead2  045-s122-bun-test-packages-policy.log
844e5ed5042838e89627db8a0b6173c14727364a361ab2f8aa2906d05ad4f52f  046-s122-bun-test-packages-artifact-store.log
7ed2e71fc4bd523030b005c9b04f5567e4de9cbd4784c996a128187a2666d93b  047-s122-bun-test-packages-adapter-claude-code-packages-adapter-antig.log
296085e25aaa2dbef740a8ad598b20076815c5f861957068018086841d1659d8  048-s122-bun-test-apps-madbridge.log
f24e0c8c2c2cd9a726d1e30f6dc1dc60bb0c38641dabdea2075e482c2c67b79e  049-s122-bun-test-test-architecture-boundaries-test-ts.log
21cb4e3259b699730bedc791c6e26d10e11c62b706d3bb5ff59e2a5411418c1c  050-s122-bun-test-test-phase3a-architecture-phase3a-test-ts.log
ef6aec3f60a34378b6ff56d88ed80c457a4316b7d0c3f791b7e0fcad40f07d5b  051-s122-bun-test-test-phase3a-harness-separation-test-ts.log
7e4e2418efe92373b03fb93e0f03d4173a7f1a72132b60e08982e97a0069b4c9  052-s122-bun-test-packages-ledger-test-reduce-ledger-event-test-ts.log
9410eeb40319b1b541eb6c009d3ee89bd897552f167ea23c61ea9cbd52217bd8  053-s122-bun-test-packages-ledger-test-lifecycle-append-test-ts.log
d70a2663a1a3fde1365f8d0e8954a21990ca1941a85136497de847b7c60fa2a4  054-s122-bun-test-packages-broker-test-next-start-reconciliation-test.log
87acb4dedf76c85e938674b10ebd8233e85f097be8271e7fd1e3cb305edae29f  055-s122-bun-test-packages-broker-test-fencing-test-ts.log
e1d1503a6fb7a8b52e4b8b1958b6b14240727e9670d7aa3ea6ab045876b9dc22  056-s122-bun-test-packages-broker-test-incident-atomicity-test-ts.log
9598fb6c91f3ae3cece92875ac240eb7577833ecb7508af90b6ff5d507756fb7  057-s122-bun-test-packages-broker-test-broker-client-contract-test-ts.log
8f7cb2197045f7517a97d05e540c1696f674300af62347f9a62059acbbe032b4  058-s122-bun-test-packages-broker-test-command-legality-test-ts.log
7421ca84521b9d7cdc68967cd4d5dcd996df67e9a51340be17a60c2265d9bd93  059-s122-bun-test-packages-broker-test-publish-legality-test-ts.log
e9b373d0072679873f8716c73dd0ed53d4f6145b73201adc5a05552b4e0eba6d  060-s122-bun-test-packages-broker-test-in-process-client-test-ts.log
b768f3fd3fbcb4d47701c0ec9f34307fd46a3895eb5de2f0a661d719c8429a07  061-s122-bun-test-packages-storage-test-home-test-ts.log
5227ab51fc6151901605433e55cea5e87b85f22b930a8e4a47f294fe798939dd  062-s122-bun-test-packages-storage-test-storage-root-test-ts.log
8c5a786be728e546eb66f56bb7b07118afa1db8ccd45cbbac45dfb4b5a953f5c  063-s122-bun-test-packages-storage-test-session-storage-test-ts.log
bdf0a9aaac58f3c2c38b4570e0c9c234e33c9ad1e911c69876a117b9bff99cd2  064-s122-bun-test-packages-storage-test-capability-store-test-ts.log
6dcb40677859bce9b0fa71adc4d5a855a8dba3f7479c572df7dd6476cbbcd343  065-s122-bun-test-packages-pty-host-test-frames-test-ts.log
f13079df55425353735fa7c2698a2e903418d65cb2a99b37dd911d75fd7bedb9  066-s122-bun-test-packages-pty-host-test-main-guard-test-ts.log
7d887ee296d98abcbd0d1406b5c7c52b24ca5180d25f73b46bb0fb11622c9cc1  067-s122-bun-test-packages-pty-host-test-launch-test-ts.log
af524697676512a7e03dff9674699bf401694fd358837ca38ee4341453502708  068-s122-bun-test-packages-pty-host-test-signals-test-ts.log
1f705051984f67967790a12d98dcb731b45f492b613d9752eb9d8836e30ee606  069-s122-bun-test-packages-broker-test-pty-host-protocol-test-ts.log
8c190bc3e37053b8246277740feed2899830d6f7ab48544420df31c2cbce8aa4  070-s122-bun-test-packages-broker-test-pty-host-supervisor-test-ts.log
d481137b27dc4ca7661ede5376201eec06a730397d3b560219f13e61621e2044  071-s122-bun-test-packages-supervisor-test-preflight-test-ts.log
1467574861db728d8b2172b4d46a041d29e1780c3023c8f525ed02e549d3f9fd  072-s122-bun-test-packages-supervisor-test-environment-test-ts.log
ae1a89232530e1ee63bd0e791ff0444d80eec18736255e6f8b13c9c7950c774f  073-s122-bun-test-packages-supervisor-test-attestation-test-ts.log
103ad39f800609d53a2dec7b07c0bce9e3993571a9e850d40109fd7509d12eb2  074-s122-bun-test-packages-supervisor-test-build-rollback-test-ts.log
45df116780fd3c85e967fc1261b938704a624c3347b9066a21303acea6b881cf  075-s122-bun-test-apps-madbridge-test-cli-test-ts.log
c19e3aeab28aab3252225325857a854389d8ecbe9eda4e193ac84de66363c2da  076-s122-bun-test-apps-madbridge-test-cli-gate-test-ts.log
843529a2a05001a4367af8bd63c106cc1dd34c2b006b222cdaf491cbe4dcea8f  077-s122-bun-test-apps-madbridge-test-cli-placeholders-test-ts.log
2ad73f45e6f137396a3671f328595ab44672768f7733aa255545629165d4d25d  078-s122-bun-test-apps-madbridge-test-init-storage-test-ts.log
80f1cda0269fd854f47cba090b3120de0e3feb9088190424cfafe1ea3ff00cdc  079-s122-bun-test-apps-madbridge-test-doctor-test-ts.log
f80c0ec5fd69e04c814bbaea69b1da06bdcc3fc1620e269f45251a47fe9cfb10  080-s122-bun-test-test-phase3a-harness-lifecycle-test-ts.log
d9c59d4dce10381bb1a63b9de9a03c8d159a921fea7a82edc3b17ed9092eb952  081-s122-bun-test-test-phase3a-harness-rollback-test-ts.log
d155f50a32b62689af1b1a6ccf65c3a06cbe34c90f31de0dc01d6cde07a9eaaa  082-s122-bun-test-test-phase3a-environment-equality-test-ts.log
63dcf74a168bb4cc00e2aa7fd68a0dd5b4f205b6b9e2a9b56e7ce5996cedfc40  083-s122-bun-test-test-phase3a-evidence-pipeline-test-ts.log
9bc7f64175209673cd6b12207d38a38383e2694e9193e53111966436b744ac7c  084-s122-bun-test-test-phase3a-spike.log
92cfd652f9f8c6c04e24e452c9e9ebb92170a568823b5295b89e4fcf210c28c6  085-s122-bun-test-test-phase3a-adversarial.log
dfbb53f3a80ee03f1e9a8dad17f6187d4b00f424b66a138d34cb39bbecc69142  086-s122-bun-test-test-acceptance.log
b4e7f3429d4f31b9f8d2c96f9e2e5df7ffdd85f335b845c5d8582452ac7107d2  087-s122-bun-apps-madbridge-src-cli-ts-start-json-echo-exit-expect-78.log
36fcb1f17a26c180203b41e5cc7427a885ca6198983e0407ba3cb27678e26da9  088-s122-bun-apps-madbridge-src-cli-ts-status-json-echo-exit-expect-6.log
331322e87d82d5c33c79483ef2ac8d367e695a52fbe3b166db72f9d87a8575db  089-s122-bun-apps-madbridge-src-cli-ts-pause-json-echo-exit-expect-69.log
05f7b42cbefd19b264254779b20325d08afd1a84d93a889b5c127943ccf53046  090-s122-bun-apps-madbridge-src-cli-ts-resume-json-echo-exit-expect-6.log
5b7982f2e441315035e78a6981b2f43a679464b68f7d086e9e5fa21f7a13b21a  091-s122-bun-apps-madbridge-src-cli-ts-close-json-echo-exit-expect-69.log
1d9d62337642d7196fc8431aaa4671f0d463ed2c810aca7d6a38fae36f2e7df0  092-s122-bun-test-phase3a-negative-control-ts-echo-negative-control-e.log
b315a0ef50d2b4f6c52b8d2f59c4250c5cf7b4e0015c97b75b1563d23b2519eb  093-s122-echo-pty-host-processes-pgrep-f-madv-pty-host-wc-l-tr-d-expe.log
01f07c0774c9ae206614e3d630738f8613c76a57fdd4db9e0dd89b833915b5a0  094-s122-bun-run-typecheck.log
1941e9232728489aa51401c337dfc475b5cd13515403122c75ed3217a99f6799  095-s122-bun-run-test-arch.log
e7a0b2deae2fc64f48dc78ad0aa108759eb3482ffee854c4e604669c6b586834  096-s122-bun-run-test-phase3a.log
41a01d289c1341d9c4e98e0faa0aac902d8e4751cb7f608e317b145f093ae6fe  097-s122-bun-run-test-adversarial.log
7d02b5336e75678f18f8c3f31672385cb9a02801b1f800d5b95fe00190774657  098-s122-bun-run-verify-phase3a.log
798acf8e93dace57322833e877e51660c43632f93066dff2512934aa6dea0050  099-end-state.log
```

Report SHA-256: 5fde2ccafb42c6d5b9a975cb4e10a80abe6362a683322fd5ffff2ba56398c3cc
