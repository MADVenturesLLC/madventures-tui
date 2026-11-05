#!/usr/bin/env bash
# Task 58 certification run under DEC-20261104-02 B7, with Addendum 3 to DEC-20261104-02.
# The Founder runs this file on each certification host, in the foreground, in a terminal on that host:
#   bash task58-cert-run.sh
# It takes no argument. It clones the candidate commit fresh, runs plan section 8.3 steps 0 to 7
# and then every command of plan section 12.2, each once, writes one log per command and a manifest,
# and ends with one line: CERT_RUN_DONE host=<host> result=CLEAN or result=HALT.
# Nothing is rerun. A HALT result means the run is not used and comes to the Founder.

set -uo pipefail

CAND=ffcecaf9dbb6b2de3b406e475825137ddfe726b7
CAND_PARENTS="03e9efec79eaeacb0ff185e2d84cf94a14aa46e6 d8c91a25978fe8c3b748dd06ac3f87b01e835817"
SOURCE_BASELINE_SHA=aa16032c56fdf6c7105e99b1765ed9365d605bf4
DIFFCHECK_SHA=fe33892c34b87319d59b7f0562373aa2d188cc2a5565a0e0e2daed19f72d6438
REPO_URL=https://github.com/MADVenturesLLC/madventures-tui.git

stop() { echo "CERT_RUN_STOPPED_BEFORE_COMMANDS: $1"; exit 1; }

case "$(uname -s)" in
  Darwin)
    HOST=macbook
    h256() { shasum -a 256 "$1" | cut -c1-64; }
    BUN_REAL=/Users/michaeldaley/.bun/bin/bun
    BUN_SHA=35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5
    BUN_VER=1.4.2
    BUN_REV=744846f844374847c902b5e7fd59b4342a51ef99
    ;;
  Linux)
    HOST=ubuntu
    h256() { sha256sum "$1" | cut -c1-64; }
    BUN_REAL=/home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun
    BUN_SHA=0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb
    BUN_VER=1.4.1
    BUN_REV=69cb78c9097cebd3bdb832d9fff8b7d23abce09e
    ;;
  *) stop "unknown host $(uname -s)";;
esac
abspath() { perl -MCwd -e 'print Cwd::abs_path(shift), "\n"' "$1"; }
hermes_count() { ps -axo command= | grep -i "[h]ermes" | grep -v -e chrome-devtools-mcp | wc -l | tr -d " "; }

D=$HOME/builds/task58-cert-$HOST
R=$D/repo
L=$D/logs
test ! -e "$D" || stop "already exists: $D"

# Environment (Addendum 3 B2 and B3): no personal git configuration, and no credential-named variable.
export GIT_CONFIG_GLOBAL=/dev/null
export GIT_CONFIG_NOSYSTEM=1
for v in $(env | sed -n 's/^\([A-Za-z_][A-Za-z0-9_]*\)=.*/\1/p' | grep -E '(_TOKEN|_API_KEY|_SECRET)$' || true); do unset "$v"; done
export SOURCE_BASELINE_SHA

echo "host=$HOST candidate=$CAND"
HC=$(hermes_count); echo "hermes processes: $HC"; test "$HC" = 0 || stop "Hermes is running"

# Runtime (DEC-20261104-02 B7 item 1).
test -x "$BUN_REAL" || stop "runtime missing at $BUN_REAL"
test "$(h256 "$BUN_REAL")" = "$BUN_SHA" || stop "runtime SHA-256 differs"
test "$("$BUN_REAL" --version)" = "$BUN_VER" || stop "runtime version differs"
test "$("$BUN_REAL" -e 'process.stdout.write(Bun.revision)')" = "$BUN_REV" || stop "runtime revision differs"
mkdir -p "$D" "$L"
if [ "$HOST" = ubuntu ]; then
  BUNDIR=$D/bin
  mkdir -p "$BUNDIR"
  ln -s "$BUN_REAL" "$BUNDIR/bun"
  ln -s "$BUN_REAL" "$BUNDIR/bunx"
else
  BUNDIR=$(dirname "$BUN_REAL")
  test -e "$BUNDIR/bunx" || stop "no bunx beside the runtime"
fi
export PATH="$BUNDIR:$PATH"
test "$(command -v bun)" = "$BUNDIR/bun" || stop "bun on PATH is not the runtime"
test "$(abspath "$(command -v bun)")" = "$(abspath "$BUN_REAL")" || stop "bun does not resolve to the runtime"
test "$(abspath "$(command -v bunx)")" = "$(abspath "$BUN_REAL")" || stop "bunx does not resolve to the runtime"
command -v node >/dev/null || stop "node is not on PATH"
NODE_MAJOR=$(node --version | sed -n 's/^v\([0-9][0-9]*\)\..*/\1/p')
test -n "$NODE_MAJOR" && test "$NODE_MAJOR" -ge 20 || stop "node is older than 20"
echo "runtime OK: $(command -v bun) -> $(abspath "$(command -v bun)") $BUN_VER $BUN_REV; node $(node --version)"

# Clone (B7 item 3).
git clone -q "$REPO_URL" "$R" || stop "clone failed"
cd "$R" || stop "cannot enter the clone"
git checkout -q --detach "$CAND" || stop "cannot check out $CAND"
test "$(git rev-parse HEAD)" = "$CAND" || stop "HEAD is not $CAND"
test "$(git log -1 --format=%P "$CAND")" = "$CAND_PARENTS" || stop "the candidate is not the merge of pull request 224"
git merge-base --is-ancestor "$CAND" origin/main || stop "origin/main does not contain the candidate"
LOCK_BEFORE=$(h256 bun.lock)

N=0
LOGF=""
BAD=0
REASONS=""
note_bad() { BAD=1; REASONS="$REASONS
$1"; echo "HALT REASON: $1"; }
newlog() { N=$((N+1)); LOGF=$(printf '%s/%03d-%s.log' "$L" "$N" "$1"); }

newlog install; f=$LOGF
{ echo '$ bun install --frozen-lockfile'; echo "uptime: $(uptime)"; echo "started: $(date -u +%Y-%m-%dT%H:%M:%SZ)"; } > "$f"
bun install --frozen-lockfile < /dev/null >> "$f" 2>&1; rc=$?
echo "command_exit=$rc" >> "$f"
test "$rc" = 0 || stop "bun install failed; see $f"

newlog tree-after-install; f=$LOGF
{ echo '$ git status --porcelain (before and after restoring the mode of packages/founder-act/src/main.ts)'; echo "before:"; git status --porcelain; } > "$f" 2>&1
if git status --porcelain | grep -qx ' M packages/founder-act/src/main.ts'; then
  git checkout -- packages/founder-act/src/main.ts
  echo "restored packages/founder-act/src/main.ts with git checkout" >> "$f"
fi
{ echo "after:"; git status --porcelain; } >> "$f" 2>&1
test -z "$(git status --porcelain)" || stop "the tree is not clean after install; see $f"
test "$(h256 bun.lock)" = "$LOCK_BEFORE" || stop "bun.lock changed during install"

newlog preflight-bunx; f=$LOGF
{ echo '$ bunx tsc --version (preflight of Addendum 3 B4; not a command of B7 item 4)'; bunx tsc --version; echo "command_exit=$?"; } > "$f" 2>&1
grep -q '^Version ' "$f" || stop "bunx does not run tsc; see $f"

# One command: its log holds the command, the uptime before it, its combined output and its exit status.
run() {
  local name=$1 cmd=$2 f rc
  newlog "$name"; f=$LOGF
  { printf '$ %s\n' "$cmd"; echo "uptime: $(uptime)"; echo "started: $(date -u +%Y-%m-%dT%H:%M:%SZ)"; } > "$f"
  ( cd "$R" && eval "$cmd" ) < /dev/null >> "$f" 2>&1
  rc=$?
  echo "command_exit=$rc" >> "$f"
  printf '%s command_exit=%s\n' "$(basename "$f")" "$rc" >> "$D/exits.txt"
  check "$f" "$cmd" "$rc"
}
want_line() { grep -q -- "$2" "$1" || note_bad "$(basename "$1"): no line $2"; }
check() {
  local f=$1 cmd=$2 rc=$3
  case "$cmd" in
    'git diff --check "$SOURCE_BASELINE_SHA"')
      test "$rc" = 2 || note_bad "$(basename "$f"): exit $rc, expected 2 (Addendum 3 B1)"
      test "$(sed '1,3d;$d' "$f" | { if [ "$HOST" = ubuntu ]; then sha256sum; else shasum -a 256; fi; } | cut -c1-64)" = "$DIFFCHECK_SHA" \
        || note_bad "$(basename "$f"): output differs from the 33 lines of Addendum 3 A1" ;;
    *'cli.ts start --json; echo'*) test "$rc" = 0 || note_bad "$(basename "$f"): exit $rc"; want_line "$f" '^exit=78$' ;;
    *'cli.ts status --json; echo'*|*'cli.ts pause --json; echo'*|*'cli.ts resume --json; echo'*|*'cli.ts close --json; echo'*)
      test "$rc" = 0 || note_bad "$(basename "$f"): exit $rc"; want_line "$f" '^exit=69$' ;;
    *'negative-control.ts; echo'*) test "$rc" = 0 || note_bad "$(basename "$f"): exit $rc"; want_line "$f" '^negative_control_exit=0$' ;;
    *'pty_host_processes='*) test "$rc" = 0 || note_bad "$(basename "$f"): exit $rc"; want_line "$f" '^pty_host_processes=0$' ;;
    *) test "$rc" = 0 || note_bad "$(basename "$f"): exit $rc, expected 0" ;;
  esac
}

# Plan section 8.3, step 0, with the Linux forms on the Ubuntu PC.
if [ "$HOST" = ubuntu ]; then
  STEP0=''
  IFS= read -r -d '' STEP0 <<'EOF' || true
uname -m
cat /etc/os-release
uname -r
bun --version
which bun
sha256sum "$(which bun)"
command -v node
node --version
printf '%s\n' "$TERM"
printf '%s\n' "$SHELL"
EOF
else
  STEP0=''
  IFS= read -r -d '' STEP0 <<'EOF' || true
uname -m
sw_vers
bun --version
which bun
shasum -a 256 "$(which bun)"
command -v node
node --version
printf '%s\n' "$TERM"
printf '%s\n' "$SHELL"
EOF
fi
# DEC-20261104-02 B7 item 4: the resolved path of bun and its Bun.revision.
STEP0="$STEP0
perl -MCwd -e 'print Cwd::abs_path(shift), \"\\n\"' \"\$(which bun)\"
bun -e 'process.stdout.write(Bun.revision + \"\\n\")'"

# Plan section 8.3, steps 1 to 7.
STEPS17=''
IFS= read -r -d '' STEPS17 <<'EOF' || true
SOURCE_BASELINE_SHA=aa16032c56fdf6c7105e99b1765ed9365d605bf4
git rev-parse HEAD
git branch --show-current
git status -sb
git ls-files --others --exclude-standard
git diff --name-only "$SOURCE_BASELINE_SHA"
bunx tsc --noEmit
git diff --check "$SOURCE_BASELINE_SHA"
bun test
bun test test/architecture-boundaries.test.ts test/phase3a/architecture-phase3a.test.ts
bun test test/phase3a/harness-separation.test.ts
bun test test/phase3a/spike
bun test test/phase3a/adversarial
bun test packages/pty-host packages/supervisor packages/storage
bun test packages/protocol packages/ledger packages/broker
bun test apps/madbridge
bun apps/madbridge/src/cli.ts start --json; echo "exit=$?"
bun apps/madbridge/src/cli.ts status --json; echo "exit=$?"
bun apps/madbridge/src/cli.ts pause --json; echo "exit=$?"
bun apps/madbridge/src/cli.ts resume --json; echo "exit=$?"
bun apps/madbridge/src/cli.ts close --json; echo "exit=$?"
bun apps/madbridge/src/cli.ts --help
bun test/phase3a/negative-control.ts; echo "negative_control_exit=$?"
echo "pty_host_processes=$(pgrep -f madv-pty-host | wc -l | tr -d ' ')"
EOF

# Plan section 12.2, every command in its listed order.
S122=''
IFS= read -r -d '' S122 <<'EOF' || true
bun test packages/protocol
bun test packages/ledger
bun test packages/broker
bun test packages/storage
bun test packages/pty-host
bun test packages/supervisor
bun test packages/policy
bun test packages/artifact-store
bun test packages/adapter-claude-code packages/adapter-antigravity
bun test apps/madbridge
bun test test/architecture-boundaries.test.ts
bun test test/phase3a/architecture-phase3a.test.ts
bun test test/phase3a/harness-separation.test.ts
bun test packages/ledger/test/reduce-ledger-event.test.ts
bun test packages/ledger/test/lifecycle-append.test.ts
bun test packages/broker/test/next-start-reconciliation.test.ts
bun test packages/broker/test/fencing.test.ts
bun test packages/broker/test/incident-atomicity.test.ts
bun test packages/broker/test/broker-client-contract.test.ts
bun test packages/broker/test/command-legality.test.ts
bun test packages/broker/test/publish-legality.test.ts
bun test packages/broker/test/in-process-client.test.ts
bun test packages/storage/test/home.test.ts
bun test packages/storage/test/storage-root.test.ts
bun test packages/storage/test/session-storage.test.ts
bun test packages/storage/test/capability-store.test.ts
bun test packages/pty-host/test/frames.test.ts
bun test packages/pty-host/test/main-guard.test.ts
bun test packages/pty-host/test/launch.test.ts
bun test packages/pty-host/test/signals.test.ts
bun test packages/broker/test/pty-host-protocol.test.ts
bun test packages/broker/test/pty-host-supervisor.test.ts
bun test packages/supervisor/test/preflight.test.ts
bun test packages/supervisor/test/environment.test.ts
bun test packages/supervisor/test/attestation.test.ts
bun test packages/supervisor/test/build-rollback.test.ts
bun test apps/madbridge/test/cli.test.ts
bun test apps/madbridge/test/cli-gate.test.ts
bun test apps/madbridge/test/cli-placeholders.test.ts
bun test apps/madbridge/test/init-storage.test.ts
bun test apps/madbridge/test/doctor.test.ts
bun test test/phase3a/harness-lifecycle.test.ts
bun test test/phase3a/harness-rollback.test.ts
bun test test/phase3a/environment-equality.test.ts
bun test test/phase3a/evidence-pipeline.test.ts
bun test test/phase3a/spike
bun test test/phase3a/adversarial
bun test test/acceptance
bun apps/madbridge/src/cli.ts start --json; echo "exit=$?"   # expect 78
bun apps/madbridge/src/cli.ts status --json; echo "exit=$?"  # expect 69
bun apps/madbridge/src/cli.ts pause --json; echo "exit=$?"   # expect 69
bun apps/madbridge/src/cli.ts resume --json; echo "exit=$?"  # expect 69
bun apps/madbridge/src/cli.ts close --json; echo "exit=$?"   # expect 69
bun test/phase3a/negative-control.ts; echo "negative_control_exit=$?"     # expect 0
echo "pty_host_processes=$(pgrep -f madv-pty-host | wc -l | tr -d ' ')"   # expect 0
bun run typecheck
bun run test:arch
bun run test:phase3a
bun run test:adversarial
bun run verify:phase3a
EOF

name_of() { printf '%s' "$1" | sed -e 's/[^A-Za-z0-9]\{1,\}/-/g' -e 's/^-//' -e 's/-$//' | cut -c1-60; }
run_block() {
  local prefix=$1 block=$2 line
  while IFS= read -r line; do
    [ -n "$line" ] || continue
    run "$prefix-$(name_of "$line")" "$line"
  done <<< "$block"
}

echo "running plan section 8.3 steps 0 to 7, then section 12.2; this takes a while"
run_block s83-0 "$STEP0"
run_block s83 "$STEPS17"
run_block s122 "$S122"

# The printed timings of packages/pty-host/test/signals.test.ts (DEC-20261104-02 Addenda 1 and 2).
GRACE_ALL=""
for f in "$L"/*.log; do
  grep -q 'packages/pty-host/test/signals.test.ts:' "$f" || continue
  grep -q '^signals termination_started_ms=' "$f" || note_bad "$(basename "$f"): signals.test.ts ran but printed no termination_started_ms line"
  grep -q '^signals sigterm_ignored termination_started_ms=.* exited_ms=.* grace_ms=' "$f" || note_bad "$(basename "$f"): signals.test.ts ran but printed no grace_ms line"
  for g in $(sed -n 's/^signals sigterm_ignored .* grace_ms=\([0-9.]*\)$/\1/p' "$f"); do
    GRACE_ALL="$GRACE_ALL $g"
    awk -v g="$g" 'BEGIN { exit !(g < 2000) }' && note_bad "$(basename "$f"): grace_ms=$g is below 2000"
  done
done

# The end state.
newlog end-state; f=$LOGF
{ echo '$ git status --porcelain; bun.lock SHA-256; Hermes process count'; git status --porcelain; echo "bun.lock $(h256 bun.lock)"; echo "hermes processes: $(hermes_count)"; } > "$f" 2>&1
test -z "$(git status --porcelain)" || note_bad "the tree changed during the run; see $(basename "$f")"
test "$(h256 bun.lock)" = "$LOCK_BEFORE" || note_bad "bun.lock changed during the run"
test "$(hermes_count)" = 0 || note_bad "a Hermes process appeared during the run"

( cd "$L" && for x in *.log; do printf '%s  %s\n' "$(h256 "$x")" "$x"; done ) > "$D/MANIFEST.sha256"
RESULT=CLEAN; [ "$BAD" = 0 ] || RESULT=HALT
{
  echo "host=$HOST candidate=$CAND result=$RESULT"
  echo "logs=$(ls -1 "$L" | wc -l | tr -d ' ') manifest_sha256=$(h256 "$D/MANIFEST.sha256")"
  echo "grace_ms:$GRACE_ALL"
  echo "bare bun test: $(grep -h -E '^ *[0-9]+ (pass|fail)$|^Ran [0-9]+ tests across' "$L"/*-s83-bun-test.log | tr -s ' ' | tr '\n' ' ')"
  [ "$BAD" = 0 ] || printf 'halt reasons:%s\n' "$REASONS"
} | tee "$D/SUMMARY.txt"
echo "CERT_RUN_DONE host=$HOST result=$RESULT summary=$D/SUMMARY.txt"
