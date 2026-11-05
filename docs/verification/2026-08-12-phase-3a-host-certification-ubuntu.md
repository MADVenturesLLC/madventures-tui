Phase 3A host certification report: Ubuntu PC

Candidate commit: ffcecaf9dbb6b2de3b406e475825137ddfe726b7

Host: ubuntu

Certification run: ~/builds/task58-cert-ubuntu

Manifest SHA-256: 46dc20d0cd9282c8e15ab3034a83f0abe169c42afa369caa33863786dd83a791

## 1. Candidate commit and branch

Output of `git rev-parse HEAD`, from `017-s83-git-rev-parse-HEAD.log`:

```text
ffcecaf9dbb6b2de3b406e475825137ddfe726b7
```

Output of `git branch --show-current`, from `018-s83-git-branch-show-current.log`:

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
the run, `100-end-state.log` records that `git status --porcelain` printed
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

Output of `git status -sb`, from `019-s83-git-status-sb.log`:

```text
## HEAD (no branch)
```

Output of `git ls-files --others --exclude-standard`, from `020-s83-git-ls-files-others-exclude-standard.log`:

```text
```

The output is empty: the run's tree held no untracked file.

Output of `git diff --name-only aa16032c56fdf6c7105e99b1765ed9365d605bf4`, from `021-s83-git-diff-name-only-SOURCE-BASELINE-SHA.log`:

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
`016-s83-SOURCE-BASELINE-SHA-aa16032c56fdf6c7105e99b1765ed9365d605bf4.log`.

## 3. Runtime

Bun path: /home/michaeldaley/builds/task58-cert-ubuntu/bin/bun

Bun resolved path: /home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun

Bun version: 1.4.1

Bun SHA-256: 0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb

Bun revision: 69cb78c9097cebd3bdb832d9fff8b7d23abce09e

Node path: /home/michaeldaley/.nvm/versions/node/v22.23.2/bin/node

Node version: v22.23.2

Each value is the output of a step 0 command of the run:

| Line | Command | Log |
| --- | --- | --- |
| Bun path | `which bun` | `008-s83-0-which-bun.log` |
| Bun resolved path | `perl -MCwd -e 'print Cwd::abs_path(shift), "\n"' "$(which bun)"` | `014-s83-0-perl-MCwd-e-print-Cwd-abs-path-shift-n-which-bun.log` |
| Bun version | `bun --version` | `007-s83-0-bun-version.log` |
| Bun SHA-256 | `sha256sum "$(which bun)"` | `009-s83-0-sha256sum-which-bun.log`, its first field |
| Bun revision | `bun -e 'process.stdout.write(Bun.revision + "\n")'` | `015-s83-0-bun-e-process-stdout-write-Bun-revision-n.log` |
| Node path | `command -v node` | `010-s83-0-command-v-node.log` |
| Node version | `node --version` | `011-s83-0-node-version.log` |

`which bun` printed the `bun` of the run's own `bin` folder, and `perl`
resolved it to the custody path. Its revision and SHA-256 are those of the
Linux certification runtime of DEC-20261013-03 B2 item 2, the custodied
build of revision `69cb78c9097cebd3bdb832d9fff8b7d23abce09e`, as
DEC-20261104-02 B7 item 1 requires. `bun --version` prints `1.4.1` for that
build. Node.js v22.23.2 is 20 or later, as plan §8 requires.

## 4. Host

Architecture: x86_64

Operating system: Ubuntu 26.04.1 LTS

OS build: 7.0.0-42-generic

TERM: xterm-256color

Shell: /bin/bash

Each value is the output of a step 0 command of the run:

| Line | Command | Log | Taken from |
| --- | --- | --- | --- |
| Architecture | `uname -m` | `004-s83-0-uname-m.log` | the output |
| Operating system | `cat /etc/os-release` | `005-s83-0-cat-etc-os-release.log` | the value of the line `PRETTY_NAME="Ubuntu 26.04.1 LTS"`, without its quotes |
| OS build | `uname -r` | `006-s83-0-uname-r.log` | the kernel release |
| TERM | `printf '%s\n' "$TERM"` | `012-s83-0-printf-s-n-TERM.log` | the output |
| Shell | `printf '%s\n' "$SHELL"` | `013-s83-0-printf-s-n-SHELL.log` | the output |

## 5. Commands and complete counts

Every log of the run, in the order the run wrote them. `001-install.log`,
`002-tree-after-install.log` and `003-preflight-bunx.log` are the install
and tree check of DEC-20261104-02 B7 item 3 and the `bunx` check of Addendum
3 B4 item 2, which are not commands of B7 item 4, and `100-end-state.log` is
the run's end-state check. `004-s83-0-uname-m.log` to
`039-s83-echo-pty-host-processes-pgrep-f-madv-pty-host-wc-l-tr-d.log` are
the commands of plan §8.3 steps 0 to 7, with step 0's two added commands of
B7 item 4, and `040-s122-bun-test-packages-protocol.log` to
`099-s122-bun-run-verify-phase3a.log` are the commands of plan §12.2, each
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
| `005-s83-0-cat-etc-os-release.log` | `cat /etc/os-release` | 0 | not a test command |
| `006-s83-0-uname-r.log` | `uname -r` | 0 | not a test command |
| `007-s83-0-bun-version.log` | `bun --version` | 0 | not a test command |
| `008-s83-0-which-bun.log` | `which bun` | 0 | not a test command |
| `009-s83-0-sha256sum-which-bun.log` | `sha256sum "$(which bun)"` | 0 | not a test command |
| `010-s83-0-command-v-node.log` | `command -v node` | 0 | not a test command |
| `011-s83-0-node-version.log` | `node --version` | 0 | not a test command |
| `012-s83-0-printf-s-n-TERM.log` | `printf '%s\n' "$TERM"` | 0 | not a test command |
| `013-s83-0-printf-s-n-SHELL.log` | `printf '%s\n' "$SHELL"` | 0 | not a test command |
| `014-s83-0-perl-MCwd-e-print-Cwd-abs-path-shift-n-which-bun.log` | `perl -MCwd -e 'print Cwd::abs_path(shift), "\n"' "$(which bun)"` | 0 | not a test command |
| `015-s83-0-bun-e-process-stdout-write-Bun-revision-n.log` | `bun -e 'process.stdout.write(Bun.revision + "\n")'` | 0 | not a test command |
| `016-s83-SOURCE-BASELINE-SHA-aa16032c56fdf6c7105e99b1765ed9365d605bf4.log` | `SOURCE_BASELINE_SHA=aa16032c56fdf6c7105e99b1765ed9365d605bf4` | 0 | not a test command |
| `017-s83-git-rev-parse-HEAD.log` | `git rev-parse HEAD` | 0 | not a test command |
| `018-s83-git-branch-show-current.log` | `git branch --show-current` | 0 | not a test command |
| `019-s83-git-status-sb.log` | `git status -sb` | 0 | not a test command |
| `020-s83-git-ls-files-others-exclude-standard.log` | `git ls-files --others --exclude-standard` | 0 | not a test command |
| `021-s83-git-diff-name-only-SOURCE-BASELINE-SHA.log` | `git diff --name-only "$SOURCE_BASELINE_SHA"` | 0 | not a test command |
| `022-s83-bunx-tsc-noEmit.log` | `bunx tsc --noEmit` | 0 | not a test command |
| `023-s83-git-diff-check-SOURCE-BASELINE-SHA.log` | `git diff --check "$SOURCE_BASELINE_SHA"` | 2 | not a test command |
| `024-s83-bun-test.log` | `bun test` | 0 | 1902 pass; 0 fail; 20148 expect() calls; Ran 1902 tests across 140 files. [128.03s] |
| `025-s83-bun-test-test-architecture-boundaries-test-ts-test-phase3a-a.log` | `bun test test/architecture-boundaries.test.ts test/phase3a/architecture-phase3a.test.ts` | 0 | 59 pass; 0 fail; 557 expect() calls; Ran 59 tests across 2 files. [7.68s] |
| `026-s83-bun-test-test-phase3a-harness-separation-test-ts.log` | `bun test test/phase3a/harness-separation.test.ts` | 0 | 7 pass; 0 fail; 154 expect() calls; Ran 7 tests across 1 file. [1.59s] |
| `027-s83-bun-test-test-phase3a-spike.log` | `bun test test/phase3a/spike` | 0 | 11 pass; 0 fail; 111 expect() calls; Ran 11 tests across 2 files. [8.28s] |
| `028-s83-bun-test-test-phase3a-adversarial.log` | `bun test test/phase3a/adversarial` | 0 | 34 pass; 0 fail; 639 expect() calls; Ran 34 tests across 9 files. [10.38s] |
| `029-s83-bun-test-packages-pty-host-packages-supervisor-packages-stor.log` | `bun test packages/pty-host packages/supervisor packages/storage` | 0 | 160 pass; 0 fail; 6892 expect() calls; Ran 160 tests across 16 files. [59.76s] |
| `030-s83-bun-test-packages-protocol-packages-ledger-packages-broker.log` | `bun test packages/protocol packages/ledger packages/broker` | 0 | 521 pass; 0 fail; 4557 expect() calls; Ran 521 tests across 34 files. [9.63s] |
| `031-s83-bun-test-apps-madbridge.log` | `bun test apps/madbridge` | 0 | 518 pass; 0 fail; 2339 expect() calls; Ran 518 tests across 15 files. [4.79s] |
| `032-s83-bun-apps-madbridge-src-cli-ts-start-json-echo-exit.log` | `bun apps/madbridge/src/cli.ts start --json; echo "exit=$?"` | 0 | not a test command |
| `033-s83-bun-apps-madbridge-src-cli-ts-status-json-echo-exit.log` | `bun apps/madbridge/src/cli.ts status --json; echo "exit=$?"` | 0 | not a test command |
| `034-s83-bun-apps-madbridge-src-cli-ts-pause-json-echo-exit.log` | `bun apps/madbridge/src/cli.ts pause --json; echo "exit=$?"` | 0 | not a test command |
| `035-s83-bun-apps-madbridge-src-cli-ts-resume-json-echo-exit.log` | `bun apps/madbridge/src/cli.ts resume --json; echo "exit=$?"` | 0 | not a test command |
| `036-s83-bun-apps-madbridge-src-cli-ts-close-json-echo-exit.log` | `bun apps/madbridge/src/cli.ts close --json; echo "exit=$?"` | 0 | not a test command |
| `037-s83-bun-apps-madbridge-src-cli-ts-help.log` | `bun apps/madbridge/src/cli.ts --help` | 0 | not a test command |
| `038-s83-bun-test-phase3a-negative-control-ts-echo-negative-control-e.log` | `bun test/phase3a/negative-control.ts; echo "negative_control_exit=$?"` | 0 | not a test command |
| `039-s83-echo-pty-host-processes-pgrep-f-madv-pty-host-wc-l-tr-d.log` | `echo "pty_host_processes=$(pgrep -f madv-pty-host \| wc -l \| tr -d ' ')"` | 0 | not a test command |
| `040-s122-bun-test-packages-protocol.log` | `bun test packages/protocol` | 0 | 149 pass; 0 fail; 1551 expect() calls; Ran 149 tests across 11 files. [24.00ms] |
| `041-s122-bun-test-packages-ledger.log` | `bun test packages/ledger` | 0 | 64 pass; 0 fail; 258 expect() calls; Ran 64 tests across 5 files. [22.00ms] |
| `042-s122-bun-test-packages-broker.log` | `bun test packages/broker` | 0 | 308 pass; 0 fail; 2748 expect() calls; Ran 308 tests across 18 files. [9.60s] |
| `043-s122-bun-test-packages-storage.log` | `bun test packages/storage` | 0 | 30 pass; 0 fail; 233 expect() calls; Ran 30 tests across 4 files. [16.00ms] |
| `044-s122-bun-test-packages-pty-host.log` | `bun test packages/pty-host` | 0 | 50 pass; 0 fail; 816 expect() calls; Ran 50 tests across 7 files. [30.80s] |
| `045-s122-bun-test-packages-supervisor.log` | `bun test packages/supervisor` | 0 | 80 pass; 0 fail; 5843 expect() calls; Ran 80 tests across 5 files. [28.94s] |
| `046-s122-bun-test-packages-policy.log` | `bun test packages/policy` | 0 | 30 pass; 0 fail; 38 expect() calls; Ran 30 tests across 3 files. [7.00ms] |
| `047-s122-bun-test-packages-artifact-store.log` | `bun test packages/artifact-store` | 0 | 6 pass; 0 fail; 9 expect() calls; Ran 6 tests across 1 file. [6.00ms] |
| `048-s122-bun-test-packages-adapter-claude-code-packages-adapter-antig.log` | `bun test packages/adapter-claude-code packages/adapter-antigravity` | 0 | 22 pass; 0 fail; 45 expect() calls; Ran 22 tests across 6 files. [6.00ms] |
| `049-s122-bun-test-apps-madbridge.log` | `bun test apps/madbridge` | 0 | 518 pass; 0 fail; 2339 expect() calls; Ran 518 tests across 15 files. [4.77s] |
| `050-s122-bun-test-test-architecture-boundaries-test-ts.log` | `bun test test/architecture-boundaries.test.ts` | 0 | 10 pass; 0 fail; 39 expect() calls; Ran 10 tests across 1 file. [31.00ms] |
| `051-s122-bun-test-test-phase3a-architecture-phase3a-test-ts.log` | `bun test test/phase3a/architecture-phase3a.test.ts` | 0 | 49 pass; 0 fail; 518 expect() calls; Ran 49 tests across 1 file. [7.63s] |
| `052-s122-bun-test-test-phase3a-harness-separation-test-ts.log` | `bun test test/phase3a/harness-separation.test.ts` | 0 | 7 pass; 0 fail; 154 expect() calls; Ran 7 tests across 1 file. [1.64s] |
| `053-s122-bun-test-packages-ledger-test-reduce-ledger-event-test-ts.log` | `bun test packages/ledger/test/reduce-ledger-event.test.ts` | 0 | 20 pass; 0 fail; 80 expect() calls; Ran 20 tests across 1 file. [6.00ms] |
| `054-s122-bun-test-packages-ledger-test-lifecycle-append-test-ts.log` | `bun test packages/ledger/test/lifecycle-append.test.ts` | 0 | 13 pass; 0 fail; 97 expect() calls; Ran 13 tests across 1 file. [14.00ms] |
| `055-s122-bun-test-packages-broker-test-next-start-reconciliation-test.log` | `bun test packages/broker/test/next-start-reconciliation.test.ts` | 0 | 25 pass; 0 fail; 242 expect() calls; Ran 25 tests across 1 file. [10.00ms] |
| `056-s122-bun-test-packages-broker-test-fencing-test-ts.log` | `bun test packages/broker/test/fencing.test.ts` | 0 | 70 pass; 0 fail; 672 expect() calls; Ran 70 tests across 1 file. [40.00ms] |
| `057-s122-bun-test-packages-broker-test-incident-atomicity-test-ts.log` | `bun test packages/broker/test/incident-atomicity.test.ts` | 0 | 9 pass; 0 fail; 100 expect() calls; Ran 9 tests across 1 file. [28.00ms] |
| `058-s122-bun-test-packages-broker-test-broker-client-contract-test-ts.log` | `bun test packages/broker/test/broker-client-contract.test.ts` | 0 | 5 pass; 0 fail; 12 expect() calls; Ran 5 tests across 1 file. [6.00ms] |
| `059-s122-bun-test-packages-broker-test-command-legality-test-ts.log` | `bun test packages/broker/test/command-legality.test.ts` | 0 | 26 pass; 0 fail; 85 expect() calls; Ran 26 tests across 1 file. [6.00ms] |
| `060-s122-bun-test-packages-broker-test-publish-legality-test-ts.log` | `bun test packages/broker/test/publish-legality.test.ts` | 0 | 24 pass; 0 fail; 582 expect() calls; Ran 24 tests across 1 file. [35.00ms] |
| `061-s122-bun-test-packages-broker-test-in-process-client-test-ts.log` | `bun test packages/broker/test/in-process-client.test.ts` | 0 | 13 pass; 0 fail; 203 expect() calls; Ran 13 tests across 1 file. [383.00ms] |
| `062-s122-bun-test-packages-storage-test-home-test-ts.log` | `bun test packages/storage/test/home.test.ts` | 0 | 4 pass; 0 fail; 4 expect() calls; Ran 4 tests across 1 file. [5.00ms] |
| `063-s122-bun-test-packages-storage-test-storage-root-test-ts.log` | `bun test packages/storage/test/storage-root.test.ts` | 0 | 13 pass; 0 fail; 17 expect() calls; Ran 13 tests across 1 file. [5.00ms] |
| `064-s122-bun-test-packages-storage-test-session-storage-test-ts.log` | `bun test packages/storage/test/session-storage.test.ts` | 0 | 6 pass; 0 fail; 19 expect() calls; Ran 6 tests across 1 file. [6.00ms] |
| `065-s122-bun-test-packages-storage-test-capability-store-test-ts.log` | `bun test packages/storage/test/capability-store.test.ts` | 0 | 7 pass; 0 fail; 193 expect() calls; Ran 7 tests across 1 file. [12.00ms] |
| `066-s122-bun-test-packages-pty-host-test-frames-test-ts.log` | `bun test packages/pty-host/test/frames.test.ts` | 0 | 7 pass; 0 fail; 20 expect() calls; Ran 7 tests across 1 file. [4.00ms] |
| `067-s122-bun-test-packages-pty-host-test-main-guard-test-ts.log` | `bun test packages/pty-host/test/main-guard.test.ts` | 0 | 28 pass; 0 fail; 732 expect() calls; Ran 28 tests across 1 file. [12.47s] |
| `068-s122-bun-test-packages-pty-host-test-launch-test-ts.log` | `bun test packages/pty-host/test/launch.test.ts` | 0 | 5 pass; 0 fail; 17 expect() calls; Ran 5 tests across 1 file. [34.00ms] |
| `069-s122-bun-test-packages-pty-host-test-signals-test-ts.log` | `bun test packages/pty-host/test/signals.test.ts` | 0 | 5 pass; 0 fail; 13 expect() calls; Ran 5 tests across 1 file. [2.16s] |
| `070-s122-bun-test-packages-broker-test-pty-host-protocol-test-ts.log` | `bun test packages/broker/test/pty-host-protocol.test.ts` | 0 | 3 pass; 0 fail; 82 expect() calls; Ran 3 tests across 1 file. [4.00ms] |
| `071-s122-bun-test-packages-broker-test-pty-host-supervisor-test-ts.log` | `bun test packages/broker/test/pty-host-supervisor.test.ts` | 0 | 27 pass; 0 fail; 173 expect() calls; Ran 27 tests across 1 file. [8.79s] |
| `072-s122-bun-test-packages-supervisor-test-preflight-test-ts.log` | `bun test packages/supervisor/test/preflight.test.ts` | 0 | 31 pass; 0 fail; 368 expect() calls; Ran 31 tests across 1 file. [18.26s] |
| `073-s122-bun-test-packages-supervisor-test-environment-test-ts.log` | `bun test packages/supervisor/test/environment.test.ts` | 0 | 5 pass; 0 fail; 4621 expect() calls; Ran 5 tests across 1 file. [8.00ms] |
| `074-s122-bun-test-packages-supervisor-test-attestation-test-ts.log` | `bun test packages/supervisor/test/attestation.test.ts` | 0 | 21 pass; 0 fail; 224 expect() calls; Ran 21 tests across 1 file. [9.22s] |
| `075-s122-bun-test-packages-supervisor-test-build-rollback-test-ts.log` | `bun test packages/supervisor/test/build-rollback.test.ts` | 0 | 19 pass; 0 fail; 578 expect() calls; Ran 19 tests across 1 file. [1122.00ms] |
| `076-s122-bun-test-apps-madbridge-test-cli-test-ts.log` | `bun test apps/madbridge/test/cli.test.ts` | 0 | 29 pass; 0 fail; 81 expect() calls; Ran 29 tests across 1 file. [140.00ms] |
| `077-s122-bun-test-apps-madbridge-test-cli-gate-test-ts.log` | `bun test apps/madbridge/test/cli-gate.test.ts` | 0 | 8 pass; 0 fail; 25 expect() calls; Ran 8 tests across 1 file. [14.00ms] |
| `078-s122-bun-test-apps-madbridge-test-cli-placeholders-test-ts.log` | `bun test apps/madbridge/test/cli-placeholders.test.ts` | 0 | 11 pass; 0 fail; 44 expect() calls; Ran 11 tests across 1 file. [14.00ms] |
| `079-s122-bun-test-apps-madbridge-test-init-storage-test-ts.log` | `bun test apps/madbridge/test/init-storage.test.ts` | 0 | 6 pass; 0 fail; 17 expect() calls; Ran 6 tests across 1 file. [15.00ms] |
| `080-s122-bun-test-apps-madbridge-test-doctor-test-ts.log` | `bun test apps/madbridge/test/doctor.test.ts` | 0 | 12 pass; 0 fail; 87 expect() calls; Ran 12 tests across 1 file. [42.00ms] |
| `081-s122-bun-test-test-phase3a-harness-lifecycle-test-ts.log` | `bun test test/phase3a/harness-lifecycle.test.ts` | 0 | 9 pass; 0 fail; 90 expect() calls; Ran 9 tests across 1 file. [809.00ms] |
| `082-s122-bun-test-test-phase3a-harness-rollback-test-ts.log` | `bun test test/phase3a/harness-rollback.test.ts` | 0 | 12 pass; 0 fail; 223 expect() calls; Ran 12 tests across 1 file. [744.00ms] |
| `083-s122-bun-test-test-phase3a-environment-equality-test-ts.log` | `bun test test/phase3a/environment-equality.test.ts` | 0 | 3 pass; 0 fail; 86 expect() calls; Ran 3 tests across 1 file. [276.00ms] |
| `084-s122-bun-test-test-phase3a-evidence-pipeline-test-ts.log` | `bun test test/phase3a/evidence-pipeline.test.ts` | 0 | 30 pass; 0 fail; 2491 expect() calls; Ran 30 tests across 1 file. [2.35s] |
| `085-s122-bun-test-test-phase3a-spike.log` | `bun test test/phase3a/spike` | 0 | 11 pass; 0 fail; 111 expect() calls; Ran 11 tests across 2 files. [8.40s] |
| `086-s122-bun-test-test-phase3a-adversarial.log` | `bun test test/phase3a/adversarial` | 0 | 34 pass; 0 fail; 639 expect() calls; Ran 34 tests across 9 files. [10.40s] |
| `087-s122-bun-test-test-acceptance.log` | `bun test test/acceptance` | 0 | 87 pass; 0 fail; 214 expect() calls; Ran 87 tests across 4 files. [58.00ms] |
| `088-s122-bun-apps-madbridge-src-cli-ts-start-json-echo-exit-expect-78.log` | `bun apps/madbridge/src/cli.ts start --json; echo "exit=$?"   # expect 78` | 0 | not a test command |
| `089-s122-bun-apps-madbridge-src-cli-ts-status-json-echo-exit-expect-6.log` | `bun apps/madbridge/src/cli.ts status --json; echo "exit=$?"  # expect 69` | 0 | not a test command |
| `090-s122-bun-apps-madbridge-src-cli-ts-pause-json-echo-exit-expect-69.log` | `bun apps/madbridge/src/cli.ts pause --json; echo "exit=$?"   # expect 69` | 0 | not a test command |
| `091-s122-bun-apps-madbridge-src-cli-ts-resume-json-echo-exit-expect-6.log` | `bun apps/madbridge/src/cli.ts resume --json; echo "exit=$?"  # expect 69` | 0 | not a test command |
| `092-s122-bun-apps-madbridge-src-cli-ts-close-json-echo-exit-expect-69.log` | `bun apps/madbridge/src/cli.ts close --json; echo "exit=$?"   # expect 69` | 0 | not a test command |
| `093-s122-bun-test-phase3a-negative-control-ts-echo-negative-control-e.log` | `bun test/phase3a/negative-control.ts; echo "negative_control_exit=$?"     # expect 0` | 0 | not a test command |
| `094-s122-echo-pty-host-processes-pgrep-f-madv-pty-host-wc-l-tr-d-expe.log` | `echo "pty_host_processes=$(pgrep -f madv-pty-host \| wc -l \| tr -d ' ')"   # expect 0` | 0 | not a test command |
| `095-s122-bun-run-typecheck.log` | `bun run typecheck` | 0 | not a test command |
| `096-s122-bun-run-test-arch.log` | `bun run test:arch` | 0 | 59 pass; 0 fail; 557 expect() calls; Ran 59 tests across 2 files. [7.66s] |
| `097-s122-bun-run-test-phase3a.log` | `bun run test:phase3a` | 0 | 156 pass; 0 fail; 4314 expect() calls; Ran 156 tests across 18 files. [31.95s] |
| `098-s122-bun-run-test-adversarial.log` | `bun run test:adversarial` | 0 | 34 pass; 0 fail; 639 expect() calls; Ran 34 tests across 9 files. [10.47s] |
| `099-s122-bun-run-verify-phase3a.log` | `bun run verify:phase3a` | 0 | 59 pass; 0 fail; 557 expect() calls; Ran 59 tests across 2 files. [7.71s] then 156 pass; 0 fail; 4315 expect() calls; Ran 156 tests across 18 files. [31.94s] then 34 pass; 0 fail; 639 expect() calls; Ran 34 tests across 9 files. [10.33s] |
| `100-end-state.log` | `git status --porcelain; bun.lock SHA-256; Hermes process count` | not printed | not a test command |

Last lines of the bare `bun test`, from `024-s83-bun-test.log`:

```text
 1902 pass
 0 fail
 20148 expect() calls
Ran 1902 tests across 140 files. [128.03s]
```

This is the bare `bun test` of plan §12.1, run once as plan §8.3 step 3, and
under plan §12.3 it is the full-suite result. It ran 1902 tests across 140
files with 20148 expect() calls and 0 failures, above the floor of plan §8.8
of 714 tests, 2606 expect() calls and 35 files. Every other test command
above is filtered or path-scoped, and none is a suite count.

The whitespace check of plan §8.3 step 2, `git diff --check
"$SOURCE_BASELINE_SHA"`, is
`023-s83-git-diff-check-SOURCE-BASELINE-SHA.log`. Its command_exit is 2, and
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
| `032-s83-bun-apps-madbridge-src-cli-ts-start-json-echo-exit.log` | `{"ok":false,"error":"live_runtime_not_certified","hint":"Phase 3A runtime foundation is present; live startup requires Phase 3B certification."}` | `exit=78` |
| `033-s83-bun-apps-madbridge-src-cli-ts-status-json-echo-exit.log` | `{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls."}` | `exit=69` |
| `034-s83-bun-apps-madbridge-src-cli-ts-pause-json-echo-exit.log` | `{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls."}` | `exit=69` |
| `035-s83-bun-apps-madbridge-src-cli-ts-resume-json-echo-exit.log` | `{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls."}` | `exit=69` |
| `036-s83-bun-apps-madbridge-src-cli-ts-close-json-echo-exit.log` | `{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls. If the TUI is unresponsive during an incident, terminate the foreground supervisor process; supervisor exit terminates all governed children fail-closed."}` | `exit=69` |
| `088-s122-bun-apps-madbridge-src-cli-ts-start-json-echo-exit-expect-78.log` | `{"ok":false,"error":"live_runtime_not_certified","hint":"Phase 3A runtime foundation is present; live startup requires Phase 3B certification."}` | `exit=78` |
| `089-s122-bun-apps-madbridge-src-cli-ts-status-json-echo-exit-expect-6.log` | `{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls."}` | `exit=69` |
| `090-s122-bun-apps-madbridge-src-cli-ts-pause-json-echo-exit-expect-69.log` | `{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls."}` | `exit=69` |
| `091-s122-bun-apps-madbridge-src-cli-ts-resume-json-echo-exit-expect-6.log` | `{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls."}` | `exit=69` |
| `092-s122-bun-apps-madbridge-src-cli-ts-close-json-echo-exit-expect-69.log` | `{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls. If the TUI is unresponsive during an incident, terminate the foreground supervisor process; supervisor exit terminates all governed children fail-closed."}` | `exit=69` |

The negative controls and the residual sweep printed:

From `038-s83-bun-test-phase3a-negative-control-ts-echo-negative-control-e.log`:

```text
broker_sock_matches[storage-root]=0
broker_sock_matches[legacy-quarantine]=0
broker_sock_matches[repo-worktree]=0
negative-control: PASS (no broker.sock under any governed root)
negative_control_exit=0
```

From `039-s83-echo-pty-host-processes-pgrep-f-madv-pty-host-wc-l-tr-d.log`:

```text
pty_host_processes=0
```

From `093-s122-bun-test-phase3a-negative-control-ts-echo-negative-control-e.log`:

```text
broker_sock_matches[storage-root]=0
broker_sock_matches[legacy-quarantine]=0
broker_sock_matches[repo-worktree]=0
negative-control: PASS (no broker.sock under any governed root)
negative_control_exit=0
```

From `094-s122-echo-pty-host-processes-pgrep-f-madv-pty-host-wc-l-tr-d-expe.log`:

```text
pty_host_processes=0
```

## 6. Spike criteria, adversarial criteria and measured timings

The two lines of the bare `bun test` that begin with the spike tag, from `024-s83-bun-test.log`:

```text
[spike] host=linux/x64 bun=1.4.1
[spike] pty_tty_allocation=5ms(pass) exact_binary_io=1ms(pass) resize_propagation=2ms(pass) process_group_and_signals=5ms(pass) child_and_grandchild_termination=5ms(pass) two_ptys_plus_adapter_no_leak=1ms(pass) supervisor_exit_modes=2024ms(pass) lifeline_eof=16ms(pass) pty_host_death=18ms(pass) sigstop_wedged_direct_pgid=264ms(pass) child_ignores_sigterm=705ms(pass) clean_exit_reporting=2019ms(pass) measured_timing=2024ms(pass)
```

The thirteen spike criteria, as the second line prints them:

| Criterion | Observed | Result |
| --- | --- | --- |
| `pty_tty_allocation` | 5 ms | pass |
| `exact_binary_io` | 1 ms | pass |
| `resize_propagation` | 2 ms | pass |
| `process_group_and_signals` | 5 ms | pass |
| `child_and_grandchild_termination` | 5 ms | pass |
| `two_ptys_plus_adapter_no_leak` | 1 ms | pass |
| `supervisor_exit_modes` | 2024 ms | pass |
| `lifeline_eof` | 16 ms | pass |
| `pty_host_death` | 18 ms | pass |
| `sigstop_wedged_direct_pgid` | 264 ms | pass |
| `child_ignores_sigterm` | 705 ms | pass |
| `clean_exit_reporting` | 2019 ms | pass |
| `measured_timing` | 2024 ms | pass |

The sub-assertions of the four compound criteria, by the names
`test/phase3a/spike/bun-terminal-spike.ts` gives them at the candidate
commit, each at the line that assigns it. Each is marked passed on the
strength of this pass line of the bare `bun test`, from
`024-s83-bun-test.log`:

```text
(pass) every compound criterion reports each sub-assertion individually [0.08ms]
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

The pass line of each adversarial test in the bare `bun test`, under the file line Bun printed before it, from `024-s83-bun-test.log`:

```text
test/phase3a/adversarial/attestation-drift.test.ts:
(pass) live attestation mismatch interrupts the session with identity_mismatch [235.26ms]
(pass) replacing the executable between preflight and exec is caught by the adjacent re-hash [73.43ms]
test/phase3a/adversarial/cleanup-residuals.test.ts:
(pass) the residual census retains durable closure and token evidence after storage deletion [79.37ms]
(pass) the first surface is torn down when the second surface fails to launch [73.31ms]
(pass) no child, descendant, host, descriptor, open ledger session, or live fencing token remains after the adversarial suite [1977.40ms]
test/phase3a/adversarial/auth-expiry.test.ts:
(pass) mid-session authentication expiry interrupts with authentication_expired [233.27ms]
(pass) recovery requires a new envelope and a new session, not a resume [309.03ms]
test/phase3a/adversarial/wedged-host.test.ts:
(pass) a SIGSTOPped host is cleared through the direct PGID path [387.69ms]
(pass) the wedged-host descendant survives host death without a direct PGID kill [185.83ms]
(pass) a host that never acknowledges a command is treated as host failure at 250 ms [386.38ms]
(pass) a wedged host receives no responsive-host grace [380.21ms]
(pass) a running host that drops its acknowledgement of a command is treated as host failure at 250 ms [386.55ms]
(pass) malformed host frames fail closed and interrupt the session [179.90ms]
(pass) unknown host frame tags fail closed [179.96ms]
test/phase3a/adversarial/supervisor-death.test.ts:
(pass) supervisor clean exit terminates every governed child [109.73ms]
(pass) supervisor SIGTERM terminates every governed child [108.86ms]
(pass) supervisor crash terminates every governed child [98.00ms]
(pass) supervisor SIGKILL terminates every governed child and leaves no typed terminal prefix [92.96ms]
(pass) next-start reconciliation appends session_unclean_closure after SIGKILL [94.84ms]
(pass) no governed process survives any supervisor-death scenario [405.59ms]
test/phase3a/adversarial/process-group.test.ts:
(pass) a grandchild in the governed process group is terminated [81.42ms]
(pass) a child that ignores SIGTERM is SIGKILLed within the outer bound [2090.27ms]
(pass) deliberate lifeline EOF terminates that child's process group only [244.59ms]
(pass) PTY-host exit interrupts the whole session with pty_host_failure [255.21ms]
(pass) a descendant that calls setsid is documented as escaping, not silently claimed contained [90.85ms]
test/phase3a/adversarial/ledger-failure.test.ts:
(pass) a mid-session append failure interrupts with ledger_write_failed [181.20ms]
(pass) an unrecordable interruption is completed by next-start reconciliation [192.73ms]
test/phase3a/adversarial/sequence-invariants.test.ts:
(pass) a duplicate output sequence interrupts the session [181.89ms]
(pass) an output sequence regression interrupts the session [184.82ms]
(pass) an output sequence gap interrupts the session [183.20ms]
(pass) a snapshot sequence gap interrupts the session [181.68ms]
(pass) every timing assertion reports observed values, not just pass [182.43ms]
test/phase3a/adversarial/descriptor-hygiene.test.ts:
(pass) with two PTY hosts and an adapter, no process holds a sibling's lifeline write end [80.17ms]
(pass) closing host A's stdin does not affect host B [259.57ms]
```

That is 34 adversarial tests in 9 files, all passing.

The measured timings of plan §8.5, against the bounds of spec §9.8. Every
value is taken from `024-s83-bun-test.log`, the bare `bun test` of this run;
the sources below quote the lines it comes from.

| Measurement | Bound | Observed | Source log |
| --- | --- | --- | --- |
| Host acknowledgement of a command | 250 ms or less | 1 ms, from `exact_binary_io=1ms(pass)` | `024-s83-bun-test.log` |
| termination_started after terminate | 500 ms or less | 0.58 ms, from `signals termination_started_ms=0.58` | `024-s83-bun-test.log` |
| Escalation after a missed acknowledgement or lifeline loss | 500 ms or less | smallest 250.1326390000031 ms, largest 250.55514799999946 ms, count 12: the `pgidKillAttemptedMs`, `hostKillAttemptedMs` and `escalatedMs` of the 4 `host_fault` lines of `test/phase3a/adversarial/wedged-host.test.ts` that carry an escalation | `024-s83-bun-test.log` |
| Responsive-host child grace | 2000 ms, after the host confirms SIGTERM | 2015.87 ms as `grace_ms`, with `termination_started_ms` 0.47 ms and `exited_ms` 2016.34 ms beside it, from `signals sigterm_ignored termination_started_ms=0.47 exited_ms=2016.34 grace_ms=2015.87` | `024-s83-bun-test.log` |
| Unresponsive or SIGSTOP host grace | none, direct PGID path | 264 ms, from `sigstop_wedged_direct_pgid=264ms(pass)` | `024-s83-bun-test.log` |
| All governed processes gone | 5000 ms or less | smallest 11.88 ms, largest 2032.88 ms, count 19: every `final_death_ms=` value the bare `bun test` printed; the 6 that `test/phase3a/adversarial/cleanup-residuals.test.ts` printed, the file plan §8.5 names, run from 14.217749999996158 ms to 73.16135600001144 ms | `024-s83-bun-test.log` |

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
emits just before it sends SIGTERM, to the `exited` fact. It is 2015.87 ms,
not below 2000, so the halt of Addendum 1 B4 did not occur. The whole of
that file's output:

```text
packages/pty-host/test/signals.test.ts:
signals termination_started_ms=0.58
(pass) termination_started is emitted within 500 ms [33.47ms]
signals sigterm_ignored termination_started_ms=0.47 exited_ms=2016.34 grace_ms=2015.87
(pass) a child ignoring SIGTERM is SIGKILLed after the 2 s grace [2049.17ms]
(pass) lifeline EOF terminates the child process group without a terminate command [31.96ms]
(pass) all deadlines are measured on a monotonic clock [0.35ms]
(pass) a grandchild in the same process group is terminated [40.51ms]
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
| a SIGSTOPped host is cleared through the direct PGID path | 250.45980100000452 ms | 250.47776800001157 ms | 250.47970100000384 ms |
| a host that never acknowledges a command is treated as host failure at 250 ms | 250.54607599999872 ms | 250.5547440000082 ms | 250.55514799999946 ms |
| a wedged host receives no responsive-host grace | 250.1326390000031 ms | 250.13855800000601 ms | 250.13894800000708 ms |
| a running host that drops its acknowledgement of a command is treated as host failure at 250 ms | 250.34189699999115 ms | 250.3499099999899 ms | 250.35034799999266 ms |

The SIGSTOP row is the spike's `sigstop_wedged_direct_pgid` criterion. Its
detail is printed only when it fails, and the passing test `a SIGSTOP-wedged
host earns no child grace` checks that the host never acknowledged, that
escalation started within 500 ms and that the whole took less than the 2000
ms grace. The whole of the output of
`test/phase3a/adversarial/wedged-host.test.ts`:

```text
test/phase3a/adversarial/wedged-host.test.ts:
host_fault {"detectedMs":254.44329399999697,"deathMs":278.942922000002,"escalation":{"reason":"pty_host_failure","state":"S3","escalated":true,"closeStdinCalled":true,"sessionInterruptionRequired":true,"pgidKillAttempted":true,"hostKillAttempted":true,"unnecessaryHostExitConfirmed":false,"killOrder":["pgid","host"],"observedMs":{"terminateSentMs":0.013763000009930693,"ackWindowEndedMs":250.37936000000627,"stdinClosedMs":250.40884400000505,"classifiedMs":250.42937700000766,"pgidKillAttemptedMs":250.45980100000452,"hostKillAttemptedMs":250.47776800001157,"escalatedMs":250.47970100000384}},"terminateAcks":0,"terminationStarted":false,"resizeAcks":0,"errorName":null,"sequenceKind":null,"publicationError":null,"sqliteCode":null,"authExpired":false,"reportedModel":null}
(pass) a SIGSTOPped host is cleared through the direct PGID path [387.69ms]
wedged_descendant_calibration host_dead_ms=105.31647600000724 descendant_alive=true
(pass) the wedged-host descendant survives host death without a direct PGID kill [185.83ms]
host_fault {"detectedMs":254.97106399999757,"deathMs":279.0980359999958,"escalation":{"reason":"pty_host_failure","state":"S3","escalated":true,"closeStdinCalled":true,"sessionInterruptionRequired":true,"pgidKillAttempted":true,"hostKillAttempted":true,"unnecessaryHostExitConfirmed":false,"killOrder":["pgid","host"],"observedMs":{"terminateSentMs":0.012448000008589588,"ackWindowEndedMs":250.49915500001225,"stdinClosedMs":250.51516600001196,"classifiedMs":250.52616500000295,"pgidKillAttemptedMs":250.54607599999872,"hostKillAttemptedMs":250.5547440000082,"escalatedMs":250.55514799999946}},"terminateAcks":0,"terminationStarted":false,"resizeAcks":0,"errorName":null,"sequenceKind":null,"publicationError":null,"sqliteCode":null,"authExpired":false,"reportedModel":null}
(pass) a host that never acknowledges a command is treated as host failure at 250 ms [386.38ms]
host_fault {"detectedMs":254.80283299999428,"deathMs":278.81798100000015,"escalation":{"reason":"pty_host_failure","state":"S3","escalated":true,"closeStdinCalled":true,"sessionInterruptionRequired":true,"pgidKillAttempted":true,"hostKillAttempted":true,"unnecessaryHostExitConfirmed":false,"killOrder":["pgid","host"],"observedMs":{"terminateSentMs":0.012690999996266328,"ackWindowEndedMs":250.10666299999866,"stdinClosedMs":250.11549999999988,"classifiedMs":250.12076900000102,"pgidKillAttemptedMs":250.1326390000031,"hostKillAttemptedMs":250.13855800000601,"escalatedMs":250.13894800000708}},"terminateAcks":0,"terminationStarted":false,"resizeAcks":0,"errorName":null,"sequenceKind":null,"publicationError":null,"sqliteCode":null,"authExpired":false,"reportedModel":null}
(pass) a wedged host receives no responsive-host grace [380.21ms]
host_fault {"detectedMs":254.19906400000036,"deathMs":278.85223300001235,"escalation":{"reason":"pty_host_failure","state":"S3","escalated":true,"closeStdinCalled":true,"sessionInterruptionRequired":true,"pgidKillAttempted":true,"hostKillAttempted":true,"unnecessaryHostExitConfirmed":false,"killOrder":["pgid","host"],"observedMs":{"terminateSentMs":0.062085999990813434,"ackWindowEndedMs":250.30321600000025,"stdinClosedMs":250.31202899999334,"classifiedMs":250.32512899998983,"pgidKillAttemptedMs":250.34189699999115,"hostKillAttemptedMs":250.3499099999899,"escalatedMs":250.35034799999266}},"terminateAcks":0,"terminationStarted":false,"resizeAcks":1,"errorName":null,"sequenceKind":null,"publicationError":null,"sqliteCode":null,"authExpired":false,"reportedModel":null}
(pass) a running host that drops its acknowledgement of a command is treated as host failure at 250 ms [386.55ms]
host_fault {"detectedMs":3.8876369999925373,"deathMs":27.56557099999918,"escalation":null,"terminateAcks":1,"terminationStarted":true,"resizeAcks":0,"errorName":"MalformedFrameError","sequenceKind":null,"publicationError":null,"sqliteCode":null,"authExpired":false,"reportedModel":null}
(pass) malformed host frames fail closed and interrupt the session [179.90ms]
host_fault {"detectedMs":3.289852999994764,"deathMs":27.15122600000177,"escalation":null,"terminateAcks":1,"terminationStarted":true,"resizeAcks":0,"errorName":"MalformedFrameError","sequenceKind":null,"publicationError":null,"sqliteCode":null,"authExpired":false,"reportedModel":null}
(pass) unknown host frame tags fail closed [179.96ms]
wedged-host alive EPERM count=0
```

All governed processes gone: every `final_death_ms=` value the bare `bun
test` printed, by file, in the order printed:

| File | Printed text | Value |
| --- | --- | --- |
| `test/phase3a/adversarial/attestation-drift.test.ts` | `adjacent_rehash final_death_ms=73.27058199999738` | 73.27058199999738 ms |
| `test/phase3a/adversarial/cleanup-residuals.test.ts` | `second_surface_failure final_death_ms=73.16135600001144` | 73.16135600001144 ms |
| `test/phase3a/adversarial/cleanup-residuals.test.ts` | `census_supervisor clean final_death_ms=30.617224999994505` | 30.617224999994505 ms |
| `test/phase3a/adversarial/cleanup-residuals.test.ts` | `census_supervisor SIGTERM final_death_ms=30.73602499999106` | 30.73602499999106 ms |
| `test/phase3a/adversarial/cleanup-residuals.test.ts` | `census_supervisor crash final_death_ms=15.432456000009552` | 15.432456000009552 ms |
| `test/phase3a/adversarial/cleanup-residuals.test.ts` | `census_supervisor SIGKILL final_death_ms=14.217749999996158` | 14.217749999996158 ms |
| `test/phase3a/adversarial/cleanup-residuals.test.ts` | `residual_census final_death_ms=26.59684600000037`, then the census record, not reproduced here | 26.59684600000037 ms |
| `test/phase3a/adversarial/supervisor-death.test.ts` | `supervisor clean: exit=0 signal=null final_death_ms=30.42` | 30.42 ms |
| `test/phase3a/adversarial/supervisor-death.test.ts` | `supervisor SIGTERM: exit=0 signal=null final_death_ms=29.89` | 29.89 ms |
| `test/phase3a/adversarial/supervisor-death.test.ts` | `supervisor crash: exit=1 signal=null final_death_ms=12.46` | 12.46 ms |
| `test/phase3a/adversarial/supervisor-death.test.ts` | `supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=11.92` | 11.92 ms |
| `test/phase3a/adversarial/supervisor-death.test.ts` | `supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=12.02` | 12.02 ms |
| `test/phase3a/adversarial/supervisor-death.test.ts` | `supervisor clean: exit=0 signal=null final_death_ms=29.98` | 29.98 ms |
| `test/phase3a/adversarial/supervisor-death.test.ts` | `supervisor SIGTERM: exit=0 signal=null final_death_ms=30.30` | 30.30 ms |
| `test/phase3a/adversarial/supervisor-death.test.ts` | `supervisor crash: exit=1 signal=null final_death_ms=12.61` | 12.61 ms |
| `test/phase3a/adversarial/supervisor-death.test.ts` | `supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=11.88` | 11.88 ms |
| `test/phase3a/adversarial/process-group.test.ts` | `ignore_SIGTERM: final_death_ms=2032.88` | 2032.88 ms |
| `test/phase3a/adversarial/process-group.test.ts` | `lifeline_EOF: final_death_ms=162.74` | 162.74 ms |
| `test/phase3a/adversarial/process-group.test.ts` | `host_exit: final_death_ms=202.09` | 202.09 ms |

## 7. Failures, retries, warnings and residual risks

Failures: none. Every test command of the run printed 0 fail, and every
command whose log records an exit status exited as plan §8.8 and
DEC-20261104-02 B7 item 6 expect: command_exit 0, except the whitespace
check's 2, which Addendum 3 B1 fixes; `start` printed `exit=78` and each of
the four placeholders `exit=69`. The first line of the run's `SUMMARY.txt`
is `host=ubuntu candidate=ffcecaf9dbb6b2de3b406e475825137ddfe726b7
result=CLEAN`.

Retries: none. Each command has one log, the manifest lists each log once,
and no log records a rerun, as DEC-20261104-02 B7 items 4 and 5 and Addendum
3 B4 item 3 require.

Load: each log of a command records `uptime` before it. The first load
average ranged from 0.00 to 0.93 over the run.

Warnings: `024-s83-bun-test.log` printed 11 lines that warn, 6 distinct,
each quoted below; in the order quoted they were printed once, once, once,
once, once, 6 times. The run had no failing test.

```text
lsof: WARNING: can't stat() fuse.portal file system /run/user/60578/doc
lsof: WARNING: can't stat() overlay file system /var/lib/docker/rootfs/overlayfs/68395f51bee8dad16e2dfcc236e428e406b7102cf4bc7cee3b1f9be4498a9085
lsof: WARNING: can't stat() overlay file system /var/lib/docker/rootfs/overlayfs/3a095b8d94ec1c630b137c0a65a65b3deb3af1655ce305126ee0ef5283fbb61d
lsof: WARNING: can't stat() nsfs file system /run/docker/netns/default
lsof: WARNING: can't stat() nsfs file system /run/docker/netns/5c03d27b0dae
react-test-renderer is deprecated. See https://react.dev/warnings/react-test-renderer
```

No other log of the run printed a warning.

No alive-check EPERM was counted: every `EPERM count=` line the bare `bun
test` printed shows 0, 6 lines in all.

Observation: the expect() counts of the same test command differ between its
runs within this run, with the same number of tests passing: `bun test
test/phase3a` made 4314 in `097-s122-bun-run-test-phase3a.log`, 4315 in
`099-s122-bun-run-verify-phase3a.log`. The Hardening F build log's
Observations record such variation too.

Residual risk, known and unsolved: the `setsid` residual of spec §3.5. A
descendant that calls `setsid()` can escape its original process group, and
Phase 3A claims process-group containment, not hostile-process containment.
The run recorded it, in the output of
`test/phase3a/adversarial/process-group.test.ts`:

```text
setsid_residual: recorded_count=1 group_containment=false
(pass) a descendant that calls setsid is documented as escaping, not silently claimed contained [90.85ms]
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

Runtime: plan §8 and §8.8 name Bun 1.4.2. On Linux the certification runtime
is the custodied build of DEC-20261013-03 B2 item 2, whose `bun --version`
is 1.4.1, as section 3 records. Under DEC-20261104-02 B7 item 2, this run
counts only if the expiry guard passes in the Verify job of Task 58's pull
request, which runs after this report is written; that pass is not shown
here.

TERM: the run recorded `xterm-256color`, as it was in the run's environment,
which Addendum 3 B3 says is recorded unchanged. Plan §8.2 lists
`xterm-ghostty`, the value observed on 2026-10-10.

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
`46dc20d0cd9282c8e15ab3034a83f0abe169c42afa369caa33863786dd83a791` and lists
100 logs, each below with its SHA-256 as the manifest lists it. For this
report, on the Ubuntu PC, `sha256sum -c` over the run's `logs/` folder found
every log matching it, and every file of that folder is listed in it. The
run folder is `~/builds/task58-cert-ubuntu`, the folder of Addendum 3 B4
item 1. Its absolute path, `/home/michaeldaley/builds/task58-cert-ubuntu`,
is part of the path `which bun` printed (section 3).

`SUMMARY.txt`, SHA-256
`718bdf25ffb9e35425510192442fc05190fcc377aa0f7309cbf6fa41c0f1b7f4`, and
`exits.txt`, SHA-256
`5f8b5efcec1964d2725a6e8b54b8b56f45b53b49f3ec82ae7c4d74d1f53eaf47`, are
outside the manifest. `SUMMARY.txt` states `result=CLEAN`, and each exit
`exits.txt` lists equals the exit its log records.

Contents of `MANIFEST.sha256`:

```text
a408dabb1a321d08ab3d7c3f380c3d913580067cea1c6276c089f3aa3847274f  001-install.log
debfbf29df491f9d1b2078bf2229a62e617bcad17a2e24f6bca069fc49696745  002-tree-after-install.log
1693ff0ab149f85d6c990293d7940fa0179c0f5359e7c6945cf6cb6568dbffa8  003-preflight-bunx.log
6c6e3dc7250cdfe1f4fcad7d6cf5502e6b4baa7f1096071aab5280b54be6476d  004-s83-0-uname-m.log
694360fe92c79574dc3e28467f038c7ef93a7025472fde97d2f9cf32cbf4fbb3  005-s83-0-cat-etc-os-release.log
f145587af1fa6665a9da6839e211d4fc5f272cb1e91569bcf96a69c3b80c674b  006-s83-0-uname-r.log
44024c4921b56e0fa091654a4ebb22845fe2cfa1073f9e2d311d3a75df86ba4f  007-s83-0-bun-version.log
f6fce594d9c7ad3290d6dd46ddbe983cc3d37f35d3b9c6e619c564ca9b8b8d09  008-s83-0-which-bun.log
1d05f5ebbb8318799e05e3dd9c2283f80b8465ed03a8ef107eab08ee1616e47d  009-s83-0-sha256sum-which-bun.log
1b4c2cac5b38c3dc330e71290e73247be9e662b5026ebc8393484ae7f0534b61  010-s83-0-command-v-node.log
ce9e8f2cddc66ebc94e7b2dc8dc1845f1922efd781b9f3e579c8522db0549e66  011-s83-0-node-version.log
0915baa415087f915ddd38d70f8d01ba36c7a44e3a039c57ce5bf5a0ea4bbaa8  012-s83-0-printf-s-n-TERM.log
464f2f01de49d69e0d5e4d332d4d5540cd6c7afa376c87e912952b8e3795882e  013-s83-0-printf-s-n-SHELL.log
bd16aa1b346ebaa50ea01f6e7000afd0ed744e614ebdd2cfe9817d201c960515  014-s83-0-perl-MCwd-e-print-Cwd-abs-path-shift-n-which-bun.log
2a4064ad6a5791eb7d6ff5307503709e15e17c02938b7f55fd0ab25995a95292  015-s83-0-bun-e-process-stdout-write-Bun-revision-n.log
7290876c484aafb7f369a56e6990fe31f5bc956980731dec8b08323731ac5deb  016-s83-SOURCE-BASELINE-SHA-aa16032c56fdf6c7105e99b1765ed9365d605bf4.log
216030f3ad50bdb75b86fc5d70c0c141c03895de6b043dce9eee0e171d140f10  017-s83-git-rev-parse-HEAD.log
4851d7e884452a015d0d78fb7fcdc05624064d4368264b1739717a9cb115aec9  018-s83-git-branch-show-current.log
866c594c6bac2002a623cb7e8310ff50b50bcd7708d2f501ba1b52018a11c3ca  019-s83-git-status-sb.log
c069d7ee57c1532e002c22a95b29c0689c5e9848059478a46418b07b6a12145e  020-s83-git-ls-files-others-exclude-standard.log
918b08407aa7c3f0a7e2fcce31fdf1d1d81fc368e1d565b40de1e5e85522257b  021-s83-git-diff-name-only-SOURCE-BASELINE-SHA.log
94e5ed414a0fc4d3e61dc1ef9c86e0ad7d5f0d7b67d0fd50d33c2b7ab8234582  022-s83-bunx-tsc-noEmit.log
5cb19f73edd9b41d01193f90542239a60b768de51f878e5cf3dd2080170507df  023-s83-git-diff-check-SOURCE-BASELINE-SHA.log
4e5199795f7671113447a19e9ef935766f920100511cb7ddd54befd66b4edfa8  024-s83-bun-test.log
acb221792e51c48c3e0f85c41333f78f44aec57679c50634febe0c190798a0b2  025-s83-bun-test-test-architecture-boundaries-test-ts-test-phase3a-a.log
b39a0639fa73840f5d93ed4f8021d28d0e9c514641173eebb374219619632b01  026-s83-bun-test-test-phase3a-harness-separation-test-ts.log
ff1e25e240756c4708d5d88f6a3fec549153f05e4466d72928fdd4fc8c4cdf4d  027-s83-bun-test-test-phase3a-spike.log
acfe8d40888b12881feb147185d9dd9bf5e0241d0f7b410f6b52d4578a1cc6c2  028-s83-bun-test-test-phase3a-adversarial.log
7da55ccc2d04f39f6a65e61f4bdad28fe128f400aeb9eaacacb644b005c4a3b5  029-s83-bun-test-packages-pty-host-packages-supervisor-packages-stor.log
42e0797c544660c92064455f171b0ac21e0bdb1343d54be3b4809a27c9d926f2  030-s83-bun-test-packages-protocol-packages-ledger-packages-broker.log
e2d59ef8332185b8f571b04bd407619cd5a895160bfd5035d2912d0380c6df1e  031-s83-bun-test-apps-madbridge.log
3c1c1ebf0734d2b900d2717c03e473b0387d9b1258628dafd60f6a1a3ed3cba9  032-s83-bun-apps-madbridge-src-cli-ts-start-json-echo-exit.log
ac36892095ccce8c84b1b3be2d5b15c5d019f7bc9fae905c4671b2a82c20aeea  033-s83-bun-apps-madbridge-src-cli-ts-status-json-echo-exit.log
d5a95d985cd828fefbe8bd36f216948466a149406ba59900087afb100872ea2b  034-s83-bun-apps-madbridge-src-cli-ts-pause-json-echo-exit.log
56af105d3aadfa83e61a332c3a2505e6e7ebd9f577c0af06f2774b05d452e556  035-s83-bun-apps-madbridge-src-cli-ts-resume-json-echo-exit.log
2e501c5e05ae94456ae444988efd2fc3e4655825bea9047c9ff0e25664da85ed  036-s83-bun-apps-madbridge-src-cli-ts-close-json-echo-exit.log
04320473245ae9b4c1dbaf9aa9d95aae441831d86ffb9b30ba24387701e4db42  037-s83-bun-apps-madbridge-src-cli-ts-help.log
a4abafa53922e5b4acca4aab1a92e00b942b186d2ae1455b1490e081b0537d13  038-s83-bun-test-phase3a-negative-control-ts-echo-negative-control-e.log
baa8a6365d2d558dbb856384dedf54a8dc3102a5ff270a7f968b0ca6d4e75c7d  039-s83-echo-pty-host-processes-pgrep-f-madv-pty-host-wc-l-tr-d.log
2c4e120c6a9aaf930c941697264fdcfd7cc880c40095678470b763978b269d49  040-s122-bun-test-packages-protocol.log
7493105bff7d8701752d2eb1f592d13c2c64f4b13a60d8f92c95272da46f234c  041-s122-bun-test-packages-ledger.log
c903cd31041545be6178b8b580c3baebfc37c70ebd644e31747e058507385725  042-s122-bun-test-packages-broker.log
75536cbb565c7711e7f3d34a2585516dbc4e8cebd5b401799ef9b209f3cb6464  043-s122-bun-test-packages-storage.log
75c9b6cc06384a8d303e7e02a6598c21538f44f3ab8ff7880de92d7aff7f75b0  044-s122-bun-test-packages-pty-host.log
eabd0f7c5cb9493d5798d1d9a1d775e17e5755f8ba8c6d1fd42084bad17fc712  045-s122-bun-test-packages-supervisor.log
2446e02805b7ad55b10b7fde26792f5501aaab0f2297ea8c607840fa4adcef4b  046-s122-bun-test-packages-policy.log
9375fc3015f7ad90ea1e6e5ecadb4c59f88e45e3413ee02398d7835ba581b59f  047-s122-bun-test-packages-artifact-store.log
e3af5486dad4133d7395c197e957ca7b0e236f9e987d8d3fef45af4fae7c17c0  048-s122-bun-test-packages-adapter-claude-code-packages-adapter-antig.log
d56fa75fb79bc7af2ee73cb2642ef5c342c8df54a4879f4afab3336937296f3d  049-s122-bun-test-apps-madbridge.log
28fb8403e24e6657176f3d5e1cb42ac1b79d397ebeaa0eb25ac935cb53dfe484  050-s122-bun-test-test-architecture-boundaries-test-ts.log
89e43aa2b077f03f70440eaa0fc68aa104c5dc11c3b3d7bf5194e6fcd509f44c  051-s122-bun-test-test-phase3a-architecture-phase3a-test-ts.log
20b3125b7da02835e00206e71832f8338fc3b60d2813554dd7459ad3565cee04  052-s122-bun-test-test-phase3a-harness-separation-test-ts.log
811a5006cc46716bdacdf67d2b0ce2c563d992eb8623b8a4ad048b39bdb7b9fa  053-s122-bun-test-packages-ledger-test-reduce-ledger-event-test-ts.log
c22fade3609a0db5fe08d27984ffd5904cd81d21c6aef5e21454d99b5ece3fc7  054-s122-bun-test-packages-ledger-test-lifecycle-append-test-ts.log
676ee34bc860b5af6fa214f616102f3b03d55cc4e2b1f46dcba85d8b2eab6fea  055-s122-bun-test-packages-broker-test-next-start-reconciliation-test.log
76be10ef90ca291ff52766a66d51423958b2bb26bacbfbe7b31a0405cb12ba47  056-s122-bun-test-packages-broker-test-fencing-test-ts.log
ae40089446a5b0a8ea87a8376c6791e1e265192e9fba00b309a62fc4fb980c71  057-s122-bun-test-packages-broker-test-incident-atomicity-test-ts.log
ea21526fa28c65231f9589f52dc248b4a89e1cbc7c0bb6568615001354f26be4  058-s122-bun-test-packages-broker-test-broker-client-contract-test-ts.log
cea614c616ccb9773aec63c7a3ff20214da9484669306c4aaabb5c04142d3dba  059-s122-bun-test-packages-broker-test-command-legality-test-ts.log
389a1d659732793facaf2d6c6f09b7c7d53d4041467134bbb1dcfb16cec65538  060-s122-bun-test-packages-broker-test-publish-legality-test-ts.log
b5966daf6c0558bab106511b60e76c90cbd31b9424b5cf79fd45d1db5d2e598e  061-s122-bun-test-packages-broker-test-in-process-client-test-ts.log
1f0a8153559dad8d65d2fbc96b20e02d0da28ead7386139ed671d2808eaa3602  062-s122-bun-test-packages-storage-test-home-test-ts.log
298f133aaf8d4c2320a1b785d2ff053afc2659773026b05b928d820b5b22c7ed  063-s122-bun-test-packages-storage-test-storage-root-test-ts.log
c9b5eb499ed1a095cc20f238cc5b26b29b9e13d6fed07fd26d185f2246f1bbea  064-s122-bun-test-packages-storage-test-session-storage-test-ts.log
51da2d67e12aa1bcdc4792c0611327dc24bb28d9873faaf4c3fc0c2edb6ee227  065-s122-bun-test-packages-storage-test-capability-store-test-ts.log
b900ad58e437bbaebb2751fa3de9cb12d908cfe445f77d1ae70cde7738e675b5  066-s122-bun-test-packages-pty-host-test-frames-test-ts.log
52560a6452f2d527e4f8714b520796c7d8bfde933bc4176d22b16d23d9b02a58  067-s122-bun-test-packages-pty-host-test-main-guard-test-ts.log
97f61ccfdd21843cc7271d5cf0ac812a8e886c9a6937493c2c6216d1ac6cd440  068-s122-bun-test-packages-pty-host-test-launch-test-ts.log
9cfc521ee30d528a8cb6da7d10f0c630bac41b7d6960e36574ee80897369d3df  069-s122-bun-test-packages-pty-host-test-signals-test-ts.log
987c6f2636dbf12dfad342b89c7c5eb5de491993b82bd2d1a4e0bc2e5b3dbd37  070-s122-bun-test-packages-broker-test-pty-host-protocol-test-ts.log
dba1b3d611dc716619417a7333c87c62b406142a78f2c57a49e58e7b5cc8e458  071-s122-bun-test-packages-broker-test-pty-host-supervisor-test-ts.log
44a44068fcb77c3df8a075d12e3b6246c3912ccd8e7ae4640eb15aa4c744822b  072-s122-bun-test-packages-supervisor-test-preflight-test-ts.log
3a4620e0a56055cf6e8fec40f43acf9c0358c8d882bdf6caa24f8c194b085aa8  073-s122-bun-test-packages-supervisor-test-environment-test-ts.log
bae9068841fe8af148c6b10245b72fcbab7708dd08caff632f0c0637c423116c  074-s122-bun-test-packages-supervisor-test-attestation-test-ts.log
b6f1bae6980af58bed3958d7dd7b82688ca5e8399cab9737ed60217b092eafff  075-s122-bun-test-packages-supervisor-test-build-rollback-test-ts.log
e8523c98f6980877c70c6860bba954e10bbd3e696eb58b70f638d25135db760b  076-s122-bun-test-apps-madbridge-test-cli-test-ts.log
4ff54fc8172cbc74aef94055aa2bae7bd0cf163526879a630cdf562029370ddd  077-s122-bun-test-apps-madbridge-test-cli-gate-test-ts.log
7d14cb30d5f115fb4e952c0b687468f2eb26dd51445df6305c9a014cf0f824ed  078-s122-bun-test-apps-madbridge-test-cli-placeholders-test-ts.log
ad157fc88e453dff3692603b29ca0e10d57435614e0504cb128e6e308b456c81  079-s122-bun-test-apps-madbridge-test-init-storage-test-ts.log
a58d02fe853ea20974430fe9762d9965d71e6409abfaa64297ed504dc8409557  080-s122-bun-test-apps-madbridge-test-doctor-test-ts.log
ba603814e5b6acea47022ffd1d357970cd1723c736c53117df142cb4aeb502f4  081-s122-bun-test-test-phase3a-harness-lifecycle-test-ts.log
a1c8b37c8a0961447106c0934fb16610af9ed897a992e5d9eeb3e50004baa692  082-s122-bun-test-test-phase3a-harness-rollback-test-ts.log
dde5e6ad91f04530e90415e6e54785e9096a54fce9ad7987ad918c611fcc8010  083-s122-bun-test-test-phase3a-environment-equality-test-ts.log
650e9934800d609869faaf1e5245cb25ae90cf4e58c5453706aa817420e1fefc  084-s122-bun-test-test-phase3a-evidence-pipeline-test-ts.log
737b9343175f28d3902ad411e18962780fef9b9e4f0ab4378cefcd9f68224317  085-s122-bun-test-test-phase3a-spike.log
39854df829bb2629a2742e880e6b4466f49021d09c8d98951f93289afcc2f563  086-s122-bun-test-test-phase3a-adversarial.log
510b4a8a4b7137e0e7b3e18ac304fc2325d41ddfea338772567f70d804475afb  087-s122-bun-test-test-acceptance.log
9d61f6da54e610390214c5f6c81e58a2ab66ca8f76d834bb350be04aaf90109a  088-s122-bun-apps-madbridge-src-cli-ts-start-json-echo-exit-expect-78.log
88a449778e03a2e608ecc8ce81d7ab0d83c46d4219f688c94535240fa972101c  089-s122-bun-apps-madbridge-src-cli-ts-status-json-echo-exit-expect-6.log
8940fd273c3dc69b412c2ccc5d2b788ae86569c9e1696a2030727456cba413a4  090-s122-bun-apps-madbridge-src-cli-ts-pause-json-echo-exit-expect-69.log
6b0b2f4a7146dcdb37563102d5545d89c57aaf625690223e629846d7d83b0349  091-s122-bun-apps-madbridge-src-cli-ts-resume-json-echo-exit-expect-6.log
5186aff189c9e5080eaabee1336d9734d3a5debd75727953b1dfbc9bda8f2bb2  092-s122-bun-apps-madbridge-src-cli-ts-close-json-echo-exit-expect-69.log
7b5bc70c918751cca99be74d61de5433b8ed017f4152e6f3d658aedc8bf7dd4d  093-s122-bun-test-phase3a-negative-control-ts-echo-negative-control-e.log
c1e4e07053a60ff94ecffc7eba219e620627ea2aaa6208722150e3aa8533bde0  094-s122-echo-pty-host-processes-pgrep-f-madv-pty-host-wc-l-tr-d-expe.log
3496d3fc878b89d25a420b6a37b7cc877d8c31ec03e561a86b20c2c917aad720  095-s122-bun-run-typecheck.log
8391c94547e304560c319440217492750b342f38726954c70d27007cbdd22748  096-s122-bun-run-test-arch.log
c9e8848adde61f21bab7f0cdc78f0be51c6cb5205bb5c307f04f9e54c2936b0c  097-s122-bun-run-test-phase3a.log
314cb0f78440b7d1f31d68448f64c15233855e8d27bcc837937ef275e477b16f  098-s122-bun-run-test-adversarial.log
38b8f13bb5bccad251d5990d09e15fc51083462714af960f541d9259e579c050  099-s122-bun-run-verify-phase3a.log
798acf8e93dace57322833e877e51660c43632f93066dff2512934aa6dea0050  100-end-state.log
```

Report SHA-256: 993937ac4263be6fe2b32172d1af4f1aa61cfc1b85661957095c2a027f210067
