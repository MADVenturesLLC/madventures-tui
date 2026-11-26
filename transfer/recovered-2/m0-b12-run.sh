cd ~ && bash -c '
set -uo pipefail
stop() { echo "M0_B12_NOT_STARTED: $1"; exit 1; }
H=6da70bc5892f6d2ab27475afdc348b32835b3f7e; HP=76c8c75baf69b9dbfeb4da3193b6cddab52a3686; BASE=0825a1e349ca5ea6427eea5f2de79dff234dc8f7
NM="her"; NM="${NM}mes"
KP="(^|[^A-Za-z0-9_])sk-[A-Za-z0-9_.-]{8,}|ghp_[A-Za-z0-9]{20,}|gho_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}"
case "$(uname -s)" in
  Darwin) HOST=macbook; h256() { shasum -a 256 "$1" | cut -c1-64; }; load1() { sysctl -n vm.loadavg | tr -d "{}" | awk "{print \$1}"; }
    BUN_REAL=/Users/michaeldaley/.bun/bin/bun; BUN_SHA=35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5; BUN_VER=1.4.2; BUN_REV=744846f844374847c902b5e7fd59b4342a51ef99 ;;
  Linux) HOST=ubuntu; h256() { sha256sum "$1" | cut -c1-64; }; load1() { cut -d" " -f1 /proc/loadavg; }
    BUN_REAL=/home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun; BUN_SHA=0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb; BUN_VER=1.4.1; BUN_REV=69cb78c9097cebd3bdb832d9fff8b7d23abce09e ;;
  *) stop "not a certification host: $(uname -s)" ;;
esac
D=$HOME/builds/m0-b12-$HOST-6da70bc5; R=$D/repo; L=$D/logs
test -z "${CLAUDECODE:-}" || stop "run this in a plain terminal, not inside an agent session"
test ! -e "$D" || stop "already exists: $D (move it aside to run again)"
NH=$(pgrep -if "$NM" | wc -l | tr -d " ")
echo "host=$HOST head=$H load now: $(uptime | sed "s/.*load averages*: //"); processes naming $NM: $NH"
if [ $HOST = macbook ]; then test "$NH" = 0 || stop "pause $NM first: $NH processes name it"; fi
export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1
for v in $(env | sed -n "s/^\([A-Za-z_][A-Za-z0-9_]*\)=.*/\1/p" | grep -E "(_TOKEN|_API_KEY|_SECRET)$" || true); do unset "$v"; done
test -x "$BUN_REAL" || stop "runtime missing at $BUN_REAL"
test "$(h256 "$BUN_REAL")" = $BUN_SHA || stop "runtime SHA-256 differs"
test "$("$BUN_REAL" --version)" = $BUN_VER || stop "runtime version differs"
test "$("$BUN_REAL" -e "process.stdout.write(Bun.revision)")" = $BUN_REV || stop "runtime revision differs"
mkdir -p "$L"
if [ $HOST = ubuntu ]; then BUNDIR=$D/bin; mkdir -p "$BUNDIR"; ln -s "$BUN_REAL" "$BUNDIR/bun"; ln -s "$BUN_REAL" "$BUNDIR/bunx"; else BUNDIR=$(dirname "$BUN_REAL"); test -e "$BUNDIR/bunx" || stop "no bunx beside the runtime"; fi
export PATH="$BUNDIR:$PATH"
abspath() { perl -MCwd -e "print Cwd::abs_path(shift)" "$1"; }
test "$(abspath "$(command -v bun)")" = "$(abspath "$BUN_REAL")" || stop "bun on PATH is not the runtime"
test "$(abspath "$(command -v bunx)")" = "$(abspath "$BUN_REAL")" || stop "bunx on PATH is not the runtime"
NODE_MAJOR=$(node --version 2>/dev/null | sed -n "s/^v\([0-9][0-9]*\)\..*/\1/p")
test -n "$NODE_MAJOR" && test "$NODE_MAJOR" -ge 20 || stop "node 20 or later is not on PATH"
echo "runtime OK: $(command -v bun) $BUN_VER $BUN_REV, SHA-256 $BUN_SHA; node $(node --version)"
git clone -q https://github.com/MADVenturesLLC/madventures-tui.git "$R" < /dev/null || stop "clone failed"
cd "$R" || stop "cannot enter the clone"
test "$(git rev-parse origin/build/3b-m0-r1)" = $H || stop "the branch build/3b-m0-r1 is not at $H"
git checkout -q --detach $H || stop "cannot check out $H"
test "$(git rev-parse HEAD)" = $H || stop "HEAD is not $H"
test "$(git rev-parse $H^)" = $HP || stop "parent of $H is not $HP"
git merge-base --is-ancestor $BASE $H || stop "the binding base $BASE is not an ancestor of $H"
test -z "$(git status --porcelain)" || stop "fresh clone not clean"
DT=$(git diff --name-status --diff-filter=DR $BASE $H -- "*.test.ts" "*.test.tsx" "*.test.js" "*.test.mjs" | wc -l | tr -d " ")
echo "fresh clone at $R detached at $H on build/3b-m0-r1; test files of the base deleted or renamed: $DT"
N=0; BAD=0; REASONS=""
bad() { BAD=1; REASONS="$REASONS; $1"; echo "HALT REASON: $1"; }
waitload() {
  W=0
  while :; do
    l=$(load1); echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) before $1: one-minute load $l" >> "$D/load-waits.log"
    awk -v l="$l" "BEGIN { exit !(l < 2.0) }" && { echo "load $l before $1 (waited $((W * 30)) s)"; return 0; }
    W=$((W+1)); test $W -le 40 || return 1
    echo "load $l before $1: waiting"; sleep 30
  done
}
logrun() {
  N=$((N+1)); F=$(printf "%s/%03d-%s.log" "$L" $N "$1"); shift
  { printf "\$ %s\n" "$*"; echo "uptime: $(uptime)"; echo "started: $(date -u +%Y-%m-%dT%H:%M:%SZ)"; } > "$F"
  "$@" < /dev/null >> "$F" 2>&1; RC=$?
  echo "command_exit=$RC" >> "$F"; echo "$(basename "$F") command_exit=$RC"
}
body() { sed -n "4,\$p" "$1" | sed "\$d"; }
finish() {
  for f in "$L"/*.log; do echo "--- $(basename "$f"): first two and last eight lines"; head -n 2 "$f"; tail -n 8 "$f"; done
  NK=$(grep -l -E "$KP" "$L"/*.log 2>/dev/null | wc -l | tr -d " "); test "$NK" = 0 || echo "NOTE: $NK log(s) hold a key-shaped string; do not paste those logs"
  (cd "$L" && for x in *.log; do printf "%s  %s\n" "$(h256 "$x")" "$x"; done; printf "%s  %s\n" "$(h256 "$D/load-waits.log")" "../load-waits.log") > "$D/MANIFEST.sha256"
  cat "$D/MANIFEST.sha256"; echo "manifest_sha256=$(h256 "$D/MANIFEST.sha256")"
  echo "processes naming $NM at the end: $(pgrep -if "$NM" | wc -l | tr -d " ")"
  if [ $BAD = 0 ]; then echo "M0_B12_DONE host=$HOST head=$H result=PASS"; else echo "M0_B12_DONE host=$HOST head=$H result=HALT reasons:$REASONS"; fi
  exit 0
}
test "$DT" = 0 || bad "a test file of the base is deleted or renamed at $H"
waitload install || { bad "no load reading below 2.0 within 20 minutes before the install: quiet the host"; finish; }
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
waitload tsc || { bad "no load reading below 2.0 within 20 minutes before tsc: quiet the host"; finish; }
logrun tsc bunx tsc --noEmit; after tsc
test $RC = 0 || bad "tsc exit $RC"
test -z "$(body "$F")" || bad "tsc printed output"
waitload bare-bun-test || { bad "no load reading below 2.0 within 20 minutes before bare bun test: quiet the host"; finish; }
logrun bare-bun-test bun test; after "bare bun test"
test $RC = 0 || bad "bare bun test exit $RC"
RAN=$(grep -E "^Ran [0-9]+ tests across [0-9]+ files\." "$F" || true)
PASSL=$(grep -E "^ *[0-9]+ pass$" "$F" || true); FAILL=$(grep -E "^ *[0-9]+ fail$" "$F" || true)
SKIPL=$(grep -E "^ *[0-9]+ (skip|todo)$" "$F" || true)
echo "bare bun test summary: $(printf "%s" "$PASSL" | tr -s " ") /$(printf "%s" "$FAILL" | tr -s " ") / $RAN; skip or todo lines: ${SKIPL:-none}"
test "$(printf "%s\n" "$RAN" | grep -c .)" = 1 || bad "bare bun test: not exactly one Ran line"
test "$(printf "%s\n" "$PASSL" | grep -c .)" = 1 || bad "bare bun test: not exactly one pass line"
test "$(printf "%s\n" "$FAILL" | grep -c .)" = 1 || bad "bare bun test: not exactly one fail line"
P=$(printf "%s" "$PASSL" | tr -dc 0-9); FL=$(printf "%s" "$FAILL" | tr -dc 0-9)
T=$(printf "%s" "$RAN" | sed -n "s/^Ran \([0-9]*\) tests across \([0-9]*\) files\..*/\1/p"); FI=$(printf "%s" "$RAN" | sed -n "s/^Ran \([0-9]*\) tests across \([0-9]*\) files\..*/\2/p")
test "${FL:-x}" = 0 || bad "bare bun test: fail count is ${FL:-missing}, not 0"
test "${P:-0}" -ge 1945 2>/dev/null || bad "bare bun test: pass count ${P:-missing} is below the floor 1945"
test "${T:-0}" -ge 1945 2>/dev/null || bad "bare bun test: ran ${T:-missing} tests, below the floor 1945"
test "${FI:-0}" -ge 142 2>/dev/null || bad "bare bun test: ran across ${FI:-missing} files, below the floor 142"
test -z "$SKIPL" || bad "bare bun test: skipped or todo tests: $(printf "%s" "$SKIPL" | tr -s " " | tr "\n" " ")"
finish
'
