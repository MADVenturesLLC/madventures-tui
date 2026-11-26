cd ~ && bash -ec '
die() { echo "STOP: $1"; exit 1; }
h256() { sha256sum "$1" | cut -c1-64; }
echo "=== Linux runtime fact-finding after Bun pull request 40304 closed: the newest official Bun on the Ubuntu PC, read only, version 1 (bash $BASH_VERSION)"
CB=/home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun; CBX=0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb
MAIN=cec21d0f98688b71bef43b3f350fbd14d6606030; REPO=https://github.com/MADVenturesLLC/madventures-tui.git; MG=packages/pty-host/test/main-guard.test.ts
KP="(^|[^A-Za-z0-9_])sk-[A-Za-z0-9_.-]{8,}|ghp_[A-Za-z0-9]{20,}|gho_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}"
test "$(uname -sm)" = "Linux x86_64" || die "run this on the Ubuntu PC"
for t in git curl jq python3 sha256sum timeout node; do command -v "$t" >/dev/null || die "$t not found"; done
export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1
for v in $(env | sed -n "s/^\([A-Za-z_][A-Za-z0-9_]*\)=.*/\1/p" | grep -E "(_TOKEN|_API_KEY|_SECRET)$" || true); do unset "$v"; done
echo "=== 1. what stays as it is"
test "$(h256 "$CB")" = "$CBX" || die "the custodied Bun is not $CBX"
IB=$(command -v bun || true); IBX=none; if [ -n "$IB" ]; then IBX=$(h256 "$(readlink -f "$IB")"); fi
HC=$(pgrep -fi "herm""es" | wc -l | tr -d " ")
echo "custodied Bun $CBX: unchanged; the PC installed Bun: ${IB:-none} ($IBX); node $(node --version); processes naming hermes: $HC; load: $(cut -d" " -f1-3 /proc/loadavg)"
echo "=== 2. the newest official Bun release, from GitHub"
REL=$(curl -fsSL https://api.github.com/repos/oven-sh/bun/releases/latest) || die "could not read the latest Bun release"
TAG=$(printf "%s" "$REL" | jq -r .tag_name); PUB=$(printf "%s" "$REL" | jq -r .published_at); PRE=$(printf "%s" "$REL" | jq -r .prerelease)
case "$TAG" in bun-v[0-9]*) ;; *) die "unexpected release tag $TAG";; esac
test "$PRE" = false || die "the latest release is marked as a prerelease"
V=${TAG#bun-v}
D=$HOME/builds/bun-official-$V-check; L=$D/logs
test ! -e "$D" || die "ALREADY EXISTS: $D"
mkdir -p "$D/dl" "$D/bin" "$L"
URL=https://github.com/oven-sh/bun/releases/download/$TAG
curl -fsSL -o "$D/dl/bun-linux-x64.zip" "$URL/bun-linux-x64.zip" || die "download of bun-linux-x64.zip failed"
curl -fsSL -o "$D/dl/SHASUMS256.txt" "$URL/SHASUMS256.txt" || die "download of SHASUMS256.txt failed"
XZ=$(grep -E "[ *]bun-linux-x64[.]zip$" "$D/dl/SHASUMS256.txt" | head -1 | cut -c1-64)
test -n "$XZ" && test "$(h256 "$D/dl/bun-linux-x64.zip")" = "$XZ" || die "bun-linux-x64.zip does not match the release SHASUMS256.txt"
(cd "$D/dl" && python3 -m zipfile -e bun-linux-x64.zip .) || die "could not unpack the archive"
B=$D/dl/bun-linux-x64/bun; test -f "$B" || die "the archive holds no bun-linux-x64/bun"; chmod 755 "$B"
ln -s "$B" "$D/bin/bun"; ln -s "$B" "$D/bin/bunx"
BV=$("$B" --version); BR=$("$B" -e "process.stdout.write(Bun.revision)")
test "$BV" = "$V" || die "the binary reports $BV, not $V"
echo "official Bun $V (tag $TAG, published $PUB): archive SHA-256 $XZ matches SHASUMS256.txt; binary SHA-256 $(h256 "$B"); revision $BR; in $D, nowhere else"
echo "=== 3. a fresh clone of madventures-tui at main $MAIN"
git clone -q "$REPO" "$D/tui" || die "clone failed"
git -C "$D/tui" checkout -q --detach "$MAIN" || die "$MAIN is not in the clone"
test "$(git -C "$D/tui" rev-parse HEAD)" = "$MAIN" || die "HEAD is not $MAIN"
export PATH="$D/bin:$PATH"
test "$(command -v bun)" = "$D/bin/bun" && test "$(readlink -f "$(command -v bunx)")" = "$B" || die "bun on this run PATH is not the official binary"
run() { n=$1; shift; { echo "\$ $*"; echo "load: $(cut -d" " -f1-3 /proc/loadavg)"; } > "$L/$n.log"; if (cd "$D/tui" && "$@") >> "$L/$n.log" 2>&1; then e=0; else e=$?; fi; echo "exit=$e" >> "$L/$n.log"; echo "$e"; }
sumline() { f=$L/$1.log; echo "$(grep -E "^ *[0-9]+ pass$" "$f" | sed "s/^ *//" | head -1), $(grep -E "^ *[0-9]+ fail$" "$f" | sed "s/^ *//" | head -1); $(grep -E "^Ran [0-9]+ tests" "$f" | sed "s/ \[.*//" | head -1)"; }
echo "=== 4. install and type check with official Bun $V"
LB=$(h256 "$D/tui/bun.lock")
e=$(run 01-install bun install --frozen-lockfile); echo "frozen install: exit $e"
test "$e" = 0 || { tail -5 "$L/01-install.log"; die "FINDING: bun install --frozen-lockfile fails under Bun $V; nothing else ran"; }
test "$(h256 "$D/tui/bun.lock")" = "$LB" || die "FINDING: the install changed bun.lock under Bun $V"
test -z "$(git -C "$D/tui" -c core.fileMode=false status --porcelain --untracked-files=all)" || die "the install changed the clone"
e=$(run 02-typecheck bunx tsc --noEmit); echo "type check: exit $e, $(grep -c "" "$L/02-typecheck.log") log lines"
echo "=== 5. the PTY host tests of DEC-20261013-03, three times, then the whole suite once"
for i in 1 2 3; do e=$(run 03-main-guard-$i timeout 600 bun test "$MG"); echo "main-guard run $i: exit $e; $(sumline 03-main-guard-$i)"; done
echo "failing tests of main-guard run 1:"; grep -E "^\(fail\)" "$L/03-main-guard-1.log" | sed "s/ \[[0-9.]*m*s\]$//"
for i in 2 3; do echo "failing in main-guard run $i: $(grep -E "^\(fail\)" "$L/03-main-guard-$i.log" | sed "s/ \[[0-9.]*m*s\]$//" | tr "\n" ";" )"; done
e=$(run 04-suite timeout 1800 bun test); echo "whole suite: exit $e; $(sumline 04-suite)"
echo "failing tests in the whole suite (at most 30):"; grep -E "^\(fail\)" "$L/04-suite.log" | sed "s/ \[[0-9.]*m*s\]$//" | head -30
echo "=== 6. what stayed as it was"
test "$(h256 "$CB")" = "$CBX" || die "the custodied Bun changed"
if [ -n "$IB" ]; then test "$(h256 "$(readlink -f "$IB")")" = "$IBX" || die "the installed Bun changed"; fi
test -z "$(git -C "$D/tui" -c core.fileMode=false status --porcelain --untracked-files=all)" || echo "NOTE: the test run left changes in the clone: $(git -C "$D/tui" -c core.fileMode=false status --porcelain --untracked-files=all | head -5 | tr "\n" " ")"
NK=$(grep -l -E "$KP" "$L"/*.log | wc -l); test "$NK" = 0 || echo "NOTE: $NK log(s) hold a key-shaped string; do not paste those logs"
(cd "$L" && sha256sum *.log) > "$D/LOGS.sha256"
echo "custodied Bun and installed Bun unchanged; logs $L, LOGS.sha256 $(h256 "$D/LOGS.sha256")"
echo "OFFICIAL BUN CHECK DONE: Bun $V at $MAIN; main-guard $(sumline 03-main-guard-1) / $(sumline 03-main-guard-2) / $(sumline 03-main-guard-3); suite $(sumline 04-suite); paste this whole output to the drafting assistant"
' 2>&1 | tee "$HOME/linux-official-bun-check.out"; echo "(this output is also saved in ~/linux-official-bun-check.out)"
