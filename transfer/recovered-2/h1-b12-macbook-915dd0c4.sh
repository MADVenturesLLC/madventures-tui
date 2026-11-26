bash -c '
set -uo pipefail
stop() { echo "B12_NOT_STARTED: $1"; exit 1; }
H=915dd0c4431e8f51458556c9f7ee64f6d8c303c6; HP=8c7afeae7e3209be8033ad6315b4be313f907713
BUN_REAL=/Users/michaeldaley/.bun/bin/bun
BUN_SHA=35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5; BUN_VER=1.4.2; BUN_REV=744846f844374847c902b5e7fd59b4342a51ef99
D=$HOME/builds/h1-b12-macbook-915dd0c4; R=$D/repo; L=$D/logs
h256() { shasum -a 256 "$1" | cut -c1-64; }
test "$(uname -s)" = Darwin || stop "not the MacBook: run this in a MacBook terminal"
test -z "${CLAUDECODE:-}" || stop "run this in a plain Terminal window, not inside an agent session"
test ! -e "$D" || stop "already exists: $D"
LOAD1=$(sysctl -n vm.loadavg | tr -d "{}" | awk "{print \$1}")
echo "load now: $(sysctl -n vm.loadavg)"
awk -v l="$LOAD1" "BEGIN { exit !(l < 2.0) }" || stop "one-minute load $LOAD1 is 2.0 or more: quit kimi, opencode and Hermes, wait two minutes, run this again"
export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1
for v in $(env | sed -n "s/^\([A-Za-z_][A-Za-z0-9_]*\)=.*/\1/p" | grep -E "(_TOKEN|_API_KEY|_SECRET)$" || true); do unset "$v"; done
test "$(h256 "$BUN_REAL")" = $BUN_SHA || stop "runtime SHA-256 differs"
test "$("$BUN_REAL" --version)" = $BUN_VER || stop "runtime version differs"
test "$("$BUN_REAL" -e "process.stdout.write(Bun.revision)")" = $BUN_REV || stop "runtime revision differs"
export PATH="$(dirname "$BUN_REAL"):$PATH"
test "$(command -v bun)" = "$BUN_REAL" || stop "bun on PATH is not the runtime"
test -e "$(dirname "$BUN_REAL")/bunx" || stop "no bunx beside the runtime"
echo "runtime OK: $BUN_REAL $BUN_VER $BUN_REV; TERM=${TERM:-unset} SHELL=${SHELL:-unset}"
mkdir -p "$L"
git clone -q https://github.com/MADVenturesLLC/madventures-tui.git "$R" < /dev/null || stop "clone failed"
cd "$R" || stop "cannot enter the clone"
git checkout -q --detach $H || stop "cannot check out $H"
test "$(git rev-parse HEAD)" = $H || stop "HEAD is not $H"
test "$(git rev-parse $H^)" = $HP || stop "parent of $H is not $HP"
test -z "$(git status --porcelain)" || stop "fresh clone not clean"
echo "fresh clone at $R detached at $H"
N=0; BAD=0; REASONS=""
bad() { BAD=1; REASONS="$REASONS; $1"; echo "HALT REASON: $1"; }
logrun() {
  N=$((N+1)); F=$(printf "%s/%03d-%s.log" "$L" $N "$1"); shift
  { printf "\$ %s\n" "$*"; echo "uptime: $(uptime)"; echo "started: $(date -u +%Y-%m-%dT%H:%M:%SZ)"; } > "$F"
  "$@" < /dev/null >> "$F" 2>&1; RC=$?
  echo "command_exit=$RC" >> "$F"; echo "$(basename "$F") command_exit=$RC"
}
body() { sed -n "4,\$p" "$1" | sed "\$d"; }
finish() {
  for f in "$L"/*.log; do echo "--- $(basename "$f"): first two and last eight lines"; head -n 2 "$f"; tail -n 8 "$f"; done
  (cd "$L" && for x in *.log; do printf "%s  %s\n" "$(h256 "$x")" "$x"; done) > "$D/MANIFEST.sha256"
  cat "$D/MANIFEST.sha256"; echo "manifest_sha256=$(h256 "$D/MANIFEST.sha256")"
  if [ $BAD = 0 ]; then echo "B12_DONE head=$H result=PASS"; else echo "B12_DONE head=$H result=HALT reasons:$REASONS"; fi
  exit 0
}
logrun install bun install --frozen-lockfile
test $RC = 0 || { bad "bun install exit $RC"; finish; }
if git status --porcelain | grep -qx " M packages/founder-act/src/main.ts"; then
  echo "before restore: $(git status --porcelain | tr "\n" ";")" | tee -a "$F"
  git checkout -- packages/founder-act/src/main.ts
  echo "after restore: $(git status --porcelain | tr "\n" ";")" | tee -a "$F"
fi
test -z "$(git status --porcelain)" || { bad "tree not clean after install"; finish; }
LOCK=$(h256 bun.lock)
after() { test -z "$(git status --porcelain)" || bad "$1: the tree changed"; test "$(h256 bun.lock)" = $LOCK || bad "$1: bun.lock changed"; }
logrun bare-bun-test bun test; after "bare bun test"
test $RC = 0 || bad "bare bun test exit $RC"
RAN=$(grep -E "^Ran [0-9]+ tests across [0-9]+ files\." "$F" || true)
PASSL=$(grep -E "^ *[0-9]+ pass$" "$F" || true); FAILL=$(grep -E "^ *[0-9]+ fail$" "$F" || true)
echo "bare bun test summary: $(printf "%s" "$PASSL" | tr -s " ") /$(printf "%s" "$FAILL" | tr -s " ") / $RAN"
test "$(printf "%s\n" "$RAN" | grep -c .)" = 1 || bad "bare bun test: not exactly one Ran line"
test "$(printf "%s\n" "$PASSL" | grep -c .)" = 1 || bad "bare bun test: not exactly one pass line"
test "$(printf "%s\n" "$FAILL" | grep -c .)" = 1 || bad "bare bun test: not exactly one fail line"
P=$(printf "%s" "$PASSL" | tr -dc 0-9); FL=$(printf "%s" "$FAILL" | tr -dc 0-9)
T=$(printf "%s" "$RAN" | sed -n "s/^Ran \([0-9]*\) tests across \([0-9]*\) files\..*/\1/p"); FI=$(printf "%s" "$RAN" | sed -n "s/^Ran \([0-9]*\) tests across \([0-9]*\) files\..*/\2/p")
test "${FL:-x}" = 0 || bad "bare bun test: fail count is ${FL:-missing}, not 0"
test "${P:-0}" -ge 1914 2>/dev/null || bad "bare bun test: pass count ${P:-missing} is below 1914"
test "${T:-0}" -ge 1914 2>/dev/null || bad "bare bun test: ran ${T:-missing} tests, below 1914"
test "${FI:-0}" -ge 140 2>/dev/null || bad "bare bun test: ran across ${FI:-missing} files, below 140"
logrun tsc bunx tsc --noEmit; after tsc
test $RC = 0 || bad "tsc exit $RC"
test -z "$(body "$F")" || bad "tsc printed output"
finish
'
