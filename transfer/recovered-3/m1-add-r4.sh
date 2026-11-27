cd ~ && bash -ec '
# Run once. If it stops after it has copied the texts into prompt/, tell the drafting assistant; do not run it again.
die() { echo "STOP: $1"; exit 1; }
h256() { shasum -a 256 "$1" | cut -c1-64; }
echo "=== M1 correction round 1: Addendum 3 and resume message 4 into the builder folder, version 1 (bash $BASH_VERSION)"
W=/Users/michaeldaley/builds/m1-r1; D=$W/tui; P=$W/prompt; Q=$W/pr; TB=claude/awesome-cray-vqrzbt
H=4630152f763baca0259d84c0d5817d0cea501145; BR=build/3b-m1-r1; RV1=/Users/michaeldaley/builds/review-m1-r1
HR1=eed8bc988d68dc9e1b601cba8ee3e0e3fecc80bd92fadfa45059027d5714f730; HR3=90bd5248ced3c56996588b44de5b0204efff1dbc059dae0e9b7d5d30d730479d
FR1=1b2b91eb7757245b3583cfd119353617555657a11a946606e5a331e30800beb3; PB1=51ef3c6155856b8795d1ad870955860882b897e6ed04b53ae49d28b83e056aef; PT=e92ca1ce72f458235121902eb2a09b254120e3a81c99606ce170b5c42113f4b9
EV=b074b13998eca4c583d8e59ac4303c643ea6f652da1066364bb30a81919b2587; RX=882bb886a52bdfc6064af8fba96c7e986f6eaa4f778e266c076613bca2fecfae
RB=/Users/michaeldaley/.bun/bin/bun; RBX=35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5; RBV=744846f844374847c902b5e7fd59b4342a51ef99
F=builder-prompt-m1-codex-macbook.md; X=683951e9534f1517f68b690ceec554a3908a8dd6cebd2bd97f8791e56e6e4733
M1=resume-m1-1-runtime.md; XM1=c4436aa4cb445bb00682982b1dd38355bb822cfce2a9f15371b1c53d7a62bc9c
AD=DEC-20261123-01-addendum-1-environment-values-in-logs.md; XAD=5cd930a3f2dbb8f3a85c63cfba5ed95f8088418ee132e89872d57e63fad75666
M2=resume-m1-2-test-output.md; XM2=611e62f080409fe686392d45455622d509732bea2875e4a754cdb4c00f5263e5
A2=DEC-20261123-01-addendum-2-pty-echo.md; XA2=f524cb055c363c57dbcaf25dc037645989d453a942f3ce120c7083735e6cc52c
M3=resume-m1-3-pty-echo.md; XM3=7176750c77c97b52bb9a0f0e16f5d6ea68f7be8ed27b5f209a0940e7bff9f1ea
A3=DEC-20261123-01-addendum-3-first-verdict.md; XA3=b7ff8171407289c4b4db9be9c76dfa049fdd8b0fe4f80076613f9aa6b48e43f7
M4=resume-m1-4-correction-round-1.md; XM4=3a05d0983a06b908afcae236f0e57a0816d0a31c99b4f935319dab11e41961fa
test "$(uname -sm)" = "Darwin arm64" || die "run this on the MacBook"
test -z "${CLAUDECODE:-}" || die "run this in a plain terminal, not inside an agent session"
echo "=== the verdict is posted on pull request 254 (Addendum 3 B1)"
G="env -u GH_TOKEN gh"
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
VL=$($G api --paginate "repos/MADVenturesLLC/madventures-tui/issues/254/comments?per_page=100" --jq ".[]|(.body // \"\") as \$b|select((\$b|startswith(\"TIER-2 REVIEW VERDICT: MADVenturesLLC/madventures-tui#254 (part 1 of \")) and (\$b|contains(\"Head reviewed: $H\")) and (\$b|contains(\"Report SHA-256: $RX\")))|.id") || die "could not list the comments on pull request 254"
NV=$(echo "$VL" | grep -c . || true)
test "$NV" = 1 || die "pull request 254 holds $NV first parts of the verdict on report $RX, not 1; post it first with m1-post-verdict-r1.sh"
echo "the verdict on report $RX is posted on pull request 254"
echo "=== the runtime"
test "$(h256 "$RB")" = "$RBX" || die "~/.bun/bin/bun is not the pinned 1.4.2; tell the drafting assistant"
test "$("$RB" --version)" = 1.4.2 && test "$("$RB" -e "process.stdout.write(Bun.revision)")" = "$RBV" || die "~/.bun/bin/bun is not 1.4.2 at revision $RBV"
echo "Bun 1.4.2, revision $RBV, SHA-256 $RBX"
echo "=== the host is quiet"
A="madv-"; A="/Users/michaeldaley/${A}harness"; HN="herm"; HN="${HN}es"
N=0; for p in $(lsof -a -d cwd -u "$(id -u)" -Fpn 2>/dev/null | awk -v a="$A" "/^p/{p=substr(\$0,2)} /^n/{d=substr(\$0,2); if (d==a || index(d, a \"/\")==1 || index(d, a \"-\")==1) print p}"); do c=$(ps -o ucomm= -p "$p" 2>/dev/null | tr -d " "); case "$c" in ""|zsh|-zsh|bash|-bash|sh|-sh|fish|-fish|login) ;; *) N=$((N+1));; esac; done
test "$N" = 0 || die "$N programs work in the madv-harness folders again; stop them first"
echo "madv-harness programs: 0; processes naming $HN (count only): $(pgrep -fi "$HN" | wc -l | tr -d " ")"
echo "=== the governed build and the session record to resume (Addendum 3 B4; counts only)"
CH=/Users/michaeldaley/.codex-governed; SID=01a20727-4377-78b1-8253-384942aea03c; CG="/Users/michaeldaley/builds/codex-"; CG="${CG}governed"
PC=$(pgrep -f "$CH/packages/app-server-daemon" | wc -l | tr -d " "); test "$PC" = 0 || die "a governed background server or updater runs (count $PC); stop it first"
NG=$(pgrep -f "$CG" | wc -l | tr -d " "); test "$NG" = 0 || die "a governed Codex session runs (count $NG); close it first"
NR=$(find "$CH/sessions" -type f -name "rollout-2026-11-23T01-45-43-$SID.jsonl" | wc -l | tr -d " "); test "$NR" = 1 || die "the session record of $SID was found $NR times, not once"
echo "no governed background server or session runs; the record of $SID is present once"
echo "=== the builder folder, as the review read it; the working tree is not touched"
test "$(git -C "$D" rev-parse HEAD)" = "$H" || die "HEAD is not $H"
test "$(git -C "$D" branch --show-current)" = "$BR" || die "not on $BR"
NC=$(git -C "$D" status --porcelain --untracked-files=all | wc -l | tr -d " "); test "$NC" = 0 || die "the working tree has $NC changed or new paths (names not printed); tell the drafting assistant"
echo "HEAD $H on $BR; working tree clean"
test "$(ls "$W/logs" | wc -l | tr -d " ")" = 858 && LC_ALL=C ls "$W/logs" | tail -1 | grep -q "^865-" || die "logs/ is not 858 files ending at log 865; tell the drafting assistant"
test "$(LC_ALL=C ls "$Q" | tr "\n" " ")" = "m1-halt-1-report.md m1-halt-3-report.md m1-report.md pr-body.md pr-title.txt " || die "pr/ is not the five files the review read"
test "$(h256 "$Q/m1-halt-1-report.md")" = $HR1 && test "$(h256 "$Q/m1-halt-3-report.md")" = $HR3 && test "$(h256 "$Q/m1-report.md")" = $FR1 && test "$(h256 "$Q/pr-body.md")" = $PB1 && test "$(h256 "$Q/pr-title.txt")" = $PT || die "a file of pr/ changed"
test -f "$RV1/E1/builder-files.sha256" || die "the review folder E1 list is missing at $RV1/E1"
grep -v "  prompt-SHA256.txt$" "$RV1/E1/builder-files.sha256" > /tmp/m1-add-r4-e1.$$; NE=$(grep -c "" /tmp/m1-add-r4-e1.$$)
(cd "$W" && shasum -a 256 -c --status /tmp/m1-add-r4-e1.$$) || { rm -f /tmp/m1-add-r4-e1.$$; die "logs/ or pr/ differs from what the review read"; }
rm -f /tmp/m1-add-r4-e1.$$; test "$NE" = 863 || die "the E1 list holds $NE logs and pr files, not 863"
test "$(h256 "$W/evidence/SHA256.txt")" = $EV && (cd "$W/evidence" && shasum -a 256 -c --status SHA256.txt) || die "evidence/ changed"
echo "logs/: 858 files, the last numbered 865, each as the review read it; pr/: the five files the review read; evidence/ unchanged"
test "$(LC_ALL=C ls "$P" | tr "\n" " ")" = "$AD $A2 SHA256.txt $F $M1 $M2 $M3 " || die "prompt/ holds something other than the prompt, resume messages 1 to 3, Addenda 1 and 2 and SHA256.txt"
(cd "$P" && shasum -a 256 -c --status SHA256.txt) && test "$(grep -c "" "$P/SHA256.txt")" = 6 || die "prompt/ no longer matches its six-line SHA256.txt"
for pair in "$F:$X" "$M1:$XM1" "$AD:$XAD" "$M2:$XM2" "$A2:$XA2" "$M3:$XM3"; do test "$(h256 "$P/${pair%%:*}")" = "${pair##*:}" || die "${pair%%:*} in prompt/ is not the signed text"; done
echo "=== Addendum 3 and resume message 4, from the transfer branch"
git -C "$D" fetch -q origin $TB
T=$(mktemp -d)
for t in "$A3:$XA3" "$M4:$XM4"; do nm=${t%%:*}; TC=$(git -C "$D" log -1 --format=%H "origin/$TB" -- "transfer/$nm"); test -n "$TC" || die "$nm is not on $TB"; git -C "$D" show "$TC:transfer/$nm" > "$T/$nm"; test "$(h256 "$T/$nm")" = "${t##*:}" || die "$nm at $TC is not the signed text"; echo "$nm from $TC"; done
test "$(git -C "$D" rev-parse HEAD)" = "$H" && test "$(git -C "$D" status --porcelain --untracked-files=all | wc -l | tr -d " ")" = 0 || die "the fetch changed the branch or the tree"
chmod 755 "$P"; chmod u+w "$P/SHA256.txt"
cp "$T/$A3" "$T/$M4" "$P/"; rm -rf "$T"
(cd "$P" && shasum -a 256 "$F" "$M1" "$AD" "$M2" "$A2" "$M3" "$A3" "$M4" > SHA256.txt)
chmod 444 "$P"/*; chmod 555 "$P"
(cd "$P" && shasum -a 256 -c --status SHA256.txt) || die "prompt/ check failed"
test "$(h256 "$P/$A3")" = "$XA3" && test "$(h256 "$P/$M4")" = "$XM4" || die "the copied texts in prompt/ are not the signed texts"
test "$(LC_ALL=C ls "$P" | tr "\n" " ")" = "$AD $A2 $A3 SHA256.txt $F $M1 $M2 $M3 $M4 " || die "prompt/ does not hold the nine files"
test "$(grep -c "" "$P/SHA256.txt")" = 8 || die "SHA256.txt does not hold eight lines"
echo "=== the first final report and description, renamed unchanged (Addendum 3 B6)"
mv "$Q/m1-report.md" "$Q/m1-report-1.md"; mv "$Q/pr-body.md" "$Q/pr-body-1.md"
test "$(h256 "$Q/m1-report-1.md")" = $FR1 && test "$(h256 "$Q/pr-body-1.md")" = $PB1 || die "a renamed file differs"
test "$(LC_ALL=C ls "$Q" | tr "\n" " ")" = "m1-halt-1-report.md m1-halt-3-report.md m1-report-1.md pr-body-1.md pr-title.txt " || die "pr/ is not the five expected files"
echo "pr/m1-report-1.md $FR1; pr/pr-body-1.md $PB1"
pbcopy < "$P/$M4"
test "$(pbpaste | shasum -a 256 | cut -c1-64)" = "$XM4" || die "clipboard differs from the resume message"
echo "load now: $(uptime | sed "s/.*load averages*: //")"
echo "ADDENDUM 3 AND RESUME MESSAGE 4 ADDED; prompt/ holds the prompt, four messages, three addenda and SHA256.txt (SHA-256 $(h256 "$P/SHA256.txt")); HEAD $H; resume message 4 COPIED"
echo "NEXT, in a new terminal tab: cd $W && $CG resume $SID -s workspace-write -a on-request ; in the resumed session run /mcp and confirm it lists no MCP server; then paste resume message 4"
' || echo STOPPED
