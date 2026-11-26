cd ~ && bash -c '
set -uo pipefail
die() { echo "STOP: $1"; exit 1; }
h256() { shasum -a 256 "$1" | cut -c1-64; }
echo "=== M1 Tier-2 review, second round (DEC-20261123-01 Addendum 3 B8): the review folder, version 1 (bash $BASH_VERSION)"
R=MADVenturesLLC/madventures-tui; G="env -u GH_TOKEN gh"; N=254; BR=build/3b-m1-r1
D=/Users/michaeldaley/builds/review-m1-r2; RPT=/Users/michaeldaley/builds/review-m1-r2.md
W=/Users/michaeldaley/builds/m1-r1; E5S=/Users/michaeldaley/builds/m1-record-check/check-20261125T150241Z; B24M=/Users/michaeldaley/builds/m1-b24-macbook-2fb92148
UH=michaeldaley@michaeldaley-z890-pro-rs-wifi-white; UB=builds/m1-b24-ubuntu-2fb92148; KF=/Users/michaeldaley/.secrets/minimax-mplan.key
H=2fb92148c361ab7434d1e62e87cdeb9e59842b3f; HP=d8818704410a72e277fc05a3a40535528b5da710; H0=4630152f763baca0259d84c0d5817d0cea501145
B=75aec139d503cbe1d34d0c6f3ac5bd514339570e; BB=60faaf8e35cf7f85078bccad73d563262736117b
TB=claude/awesome-cray-vqrzbt; RP=review-prompt-m1-antigravity-r2.md; XRP=574991a7ee72772dee80f9b3b2293f19802b7f54b998a2107a04b9720f6bd173
XE2=b074b13998eca4c583d8e59ac4303c643ea6f652da1066364bb30a81919b2587; XE3=f1c7438ac8abc89f4a2d053f281a7e991179500f82e7a5744b6ed143b10dd5d3; XE4=3baa609394e758ad5d01455c1bcfba846ba79e83c16fe8db0b97e98f0c3b0c12
XM5=fbe452e4f59069222b79dcb5e0d3fdca71fbcb56c07b306504a6f70840d2fb0d; XK=c1834dcc689e94cf57fb123a09a0600225d8e97b428c648f14276136e3dd383f; XB4C=2dcff5987b35e4a1e7c60e1b9229f32f7ebca58376ea0af0d39ba2b6ef647689
XFR=7110b26e50d1efe5f18adc82f07cbf0362350c126dce86ab7dba47fef8abe744; XPB=7927cf4c240e598fcbb94f7b755194dc8210e6a8b43c9b564a1c3f00e1cff355; XPS=8eb45350e487ee4b378d2d2f8e729abf50965b7b68c7d4109dac4cac82c8748f
XFR1=1b2b91eb7757245b3583cfd119353617555657a11a946606e5a331e30800beb3; XPB1=51ef3c6155856b8795d1ad870955860882b897e6ed04b53ae49d28b83e056aef
XPT=e92ca1ce72f458235121902eb2a09b254120e3a81c99606ce170b5c42113f4b9; HR1=eed8bc988d68dc9e1b601cba8ee3e0e3fecc80bd92fadfa45059027d5714f730; HR3=90bd5248ced3c56996588b44de5b0204efff1dbc059dae0e9b7d5d30d730479d
PRL="m1-halt-1-report.md m1-halt-3-report.md m1-report-1.md m1-report.md pr-body-1.md pr-body.md pr-title.txt "
MAINT="
decisions DEC-20261123-01-madv-surface-admission-records-and-m1.md e0f08199567641f47eba567ac0653bfc8f1ed9315b3ddfca8074d535b294cb8e
decisions DEC-20261112-03-addendum-1-resumed-session.md 830e3508dcdd8536f11f6549b81ab06224686374b0b785262cccdaad59c96b50
decisions DEC-20261108-04-phase-3b-standing-commission.md d373235e424bd7fbe4c1c5b1c5f4954eb1b02165db4e1365d9cfa1533aa93b29
decisions DEC-20261108-04-addendum-1-corrections.md 90e2f541fd0a232390ca0554067a2de8b37f15c933016eafe40ebde2cd2eff17
decisions DEC-20261115-02-addendum-3-phase-1-record-check.md 24f76dbb631d6058e81ccff93d3c9fecb11521b5a876c687ec0da1ee0f9e0a23
decisions DEC-20261115-02-addendum-4-key-check-and-clause-1.md 45131b839e0365a83462b3ee297007789ffe11cefc1a545a96784b85a1012bf4
decisions DEC-20261108-01-phase-3b-approval.md 319ba65b340696d66a655e21f648fed742a9c38bcbb1d876776abc27a27a9738
decisions DEC-20261112-02-model-record.md 3151cb9e178e918f0c07f5a4eb9931fa9d529debedf0ad4d91f5999844883da7
decisions DEC-20261108-03-phase-3b-h1.md 10cdc674ce746568c963aa2c5c34c95a69d9960ea469438b044bfb5fe4b9e9de
decisions DEC-20261108-03-addendum-2-codex-harness.md e04b54065b0f0bb465b2d14e14a39f3b31f9cb34a874f6f8210a7d7e74a8c1c1
decisions DEC-20261108-03-addendum-3-image-tool.md f2a0ef1063379902935760d9517b68d532cabf6e24699cdebb789681f78ce15e
decisions DEC-20261108-03-addendum-4-sandbox-halt.md e817470aea6be2c176d4ae75856fd793ef982bd28c9eb793df9c9038a5c1dfbc
decisions DEC-20261108-03-addendum-5-own-work.md e86e94a62c7067e4656114afe1713c1478814ffe446d1ffcc8b788accfc3ff3d
decisions DEC-20261108-03-addendum-6-names-in-text.md 24cef0ed5c968aa80ada586e473526d0f4f0b1de1331eba1d5a35051b1254ac9
decisions DEC-20261108-03-addendum-10-second-verdict.md d90d48718bc4ea6056af6f011f797a78eddcfd14e7111f15f823085c4388bca0
decisions DEC-20261108-03-addendum-11-governed-build.md e2d28cbd12485e9025c928403eb7beead9552ee378b023ddf5bc9e18febe00df
decisions DEC-20261115-01-madv-surface-0.1.1-records.md 5bf1d2353fa44fd4c346ce0207286eaba0726e42fb4314af4c2fb2aa5fe5ccd6
decisions DEC-20261112-03-addendum-2-gate-repeat.md 829248f1e2557ddbcfd33d6456f7056bfce73a008791cb88caa9660a5d979d29
decisions DEC-20261102-02-hardening-builds.md 04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550
decisions DEC-20261023-01-standing-build-rules.md bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5
decisions DEC-20261113-01-h2-records-and-merge.md 41e27eafc24a2eef238c080d1374b90fbe22d609f4ef5cbb66e07cccb5b347a5
decisions DEC-20261114-01-madv-surface-release.md 6bffc2c18927b90f4b5042f312947e5d39853ca53404a58a51b4602eb45652b8
decisions DEC-20261013-03-tests-4-6-ruling.md 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7
decisions DEC-20261104-02-hardening-f-and-task58.md 011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5
decisions DEC-20261117-01-linux-runtime-after-pr40304.md 252afc6bf85fb92a43e9b33cbbf718103a3c6060bdd04ffab9e2885b43d8c721
superpowers/specs 2026-08-12-phase-3a-runtime-foundation-design.md 472f3179c20f7f41c0e3feb5a65842bf3774cf6df01e8684a3ea86dcd811bce0
superpowers/plans 2026-08-12-phase-3a-runtime-foundation.md 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2
superpowers/plans 2026-09-19-phase-3b-live-tui-integration.md a48bf5457bf17cf5d554e541c5bb3609efacf6ad170ad6e56950b829a4269ccc
. AGENTS.md 0879ede2d3b07e137d1f3d5f75c131285277b44e61f1305d3d0d59da64f1dbca
"
TRT="
DEC-20261123-01-addendum-1-environment-values-in-logs.md 5cd930a3f2dbb8f3a85c63cfba5ed95f8088418ee132e89872d57e63fad75666
DEC-20261123-01-addendum-2-pty-echo.md f524cb055c363c57dbcaf25dc037645989d453a942f3ce120c7083735e6cc52c
DEC-20261123-01-addendum-3-first-verdict.md b7ff8171407289c4b4db9be9c76dfa049fdd8b0fe4f80076613f9aa6b48e43f7
builder-prompt-m1-codex-macbook.md 683951e9534f1517f68b690ceec554a3908a8dd6cebd2bd97f8791e56e6e4733
resume-m1-1-runtime.md c4436aa4cb445bb00682982b1dd38355bb822cfce2a9f15371b1c53d7a62bc9c
resume-m1-2-test-output.md 611e62f080409fe686392d45455622d509732bea2875e4a754cdb4c00f5263e5
resume-m1-3-pty-echo.md 7176750c77c97b52bb9a0f0e16f5d6ea68f7be8ed27b5f209a0940e7bff9f1ea
resume-m1-4-correction-round-1.md 3a05d0983a06b908afcae236f0e57a0816d0a31c99b4f935319dab11e41961fa
h2-record-check.mjs c1834dcc689e94cf57fb123a09a0600225d8e97b428c648f14276136e3dd383f
review-prompt-m1-antigravity-r1.md 9a5c4f50358fe8646af345327dfbc3a6576a4f27eb244dc551721c1c99f4254a
"
T=""; MADE=""
finish() { rc=$?; test -n "$T" && rm -rf "$T"; if [ $rc -ne 0 ] && [ -n "$MADE" ] && [ -d "$D" ]; then A="$D.incomplete-$(date -u +%Y%m%dT%H%M%SZ)"; chmod -R u+w "$D" 2>/dev/null; mv "$D" "$A" && echo "the unfinished folder was moved to $A; the reviewer must not use it"; fi; }
trap finish EXIT
test "$(uname -s)" = Darwin || die "run this on the MacBook"
test -z "${CLAUDECODE:-}" || die "run this in a plain terminal, not inside an agent session"
test ! -e "$D" || die "already exists: $D"
test ! -e "$RPT" || die "a report already exists: $RPT"
for t in git perl ssh tar pbcopy pbpaste; do command -v $t >/dev/null || die "$t not found"; done
test -r "$KF" && test "$(tr -d "\n\r" < "$KF" | wc -c | tr -d " ")" -ge 20 || die "the key file is not readable or holds no key"
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
test "$($G api repos/$R/pulls/$N --jq "[.state,(.draft|tostring),.head.sha]|join(\" \")")" = "open true $H" || die "PR $N is not an open draft at $H"
T=$(mktemp -d); mkdir -p "$T/E4"
echo "=== 0. E4 first: your Ubuntu run, from the PC in one connection; if ssh asks for a password, type your Ubuntu PC password"
ssh -o ConnectTimeout=15 "$UH" "tar -C $UB -cf - logs load-waits.log MANIFEST.sha256" < /dev/null | tar -C "$T/E4" -xf - || die "copy from the Ubuntu PC failed (see the ssh message above); nothing was made"
test "$(h256 "$T/E4/MANIFEST.sha256")" = $XE4 || die "the Ubuntu manifest is not $XE4; nothing was made"
(cd "$T/E4/logs" && shasum -a 256 -c --status ../MANIFEST.sha256) || die "the Ubuntu logs do not match their manifest; nothing was made"
echo "fetched: manifest $XE4, $(ls "$T/E4/logs" | wc -l | tr -d " ") logs"
mkdir -p "$D/prompt" "$D/E1" "$D/E2" "$D/E3" "$D/E4" "$D/E5" "$D/logs" "$D/scratch"; MADE=1
export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1
echo "=== 1. repo/ at $H"
git clone -q https://github.com/$R.git "$D/repo" < /dev/null || die "clone failed"
cd "$D/repo" || die "cannot enter the clone"
git fetch -q origin "+refs/heads/$TB:refs/remotes/origin/$TB" < /dev/null || die "cannot fetch $TB"
test "$(git rev-parse origin/$BR)" = $H || die "$BR is not at $H"
git checkout -q --detach $H || die "cannot check out $H"
test "$(git rev-parse HEAD)" = $H && test "$(git rev-parse $H^)" = $HP || die "HEAD or its parent differs"
test "$(git rev-list --count $B..$H)" = 15 && test "$(git rev-list --merges --count $B..$H)" = 0 || die "not fifteen commits without a merge from $B"
test "$(git rev-list --reverse $H0..$H | tr "\n" " ")" = "$HP $H " && test "$(git rev-parse $HP^)" = $H0 || die "the commits after $H0 are not $HP then $H"
git diff --name-only $BB $B > "$T/bd" || die "cannot compare the base with $BB"; test -s "$T/bd" && test -z "$(grep -vE "^docs/(decisions|verification)/" "$T/bd")" || die "the base changes more than docs/decisions/ and docs/verification/ against $BB"
echo "=== 2. the texts of prompt/"
echo "$MAINT" | while read -r dir name x; do test -n "$name" || continue; if [ "$dir" = . ]; then p=$name; else p=docs/$dir/$name; fi; git show "origin/main:$p" > "$D/prompt/$name" 2>/dev/null || { echo "MISSING $name"; exit 1; }; test "$(h256 "$D/prompt/$name")" = "$x" || { echo "DIFFERS $name"; exit 1; }; done || die "a text from main is missing or differs"
echo "$TRT" | while read -r name x; do test -n "$name" || continue; git show "origin/$TB:transfer/$name" > "$D/prompt/$name" 2>/dev/null || { echo "MISSING $name"; exit 1; }; test "$(h256 "$D/prompt/$name")" = "$x" || { echo "DIFFERS $name"; exit 1; }; done || die "a text from the transfer branch is missing or differs"
TC=$(git log -1 --format=%H "origin/$TB" -- "transfer/$RP"); test -n "$TC" || die "$RP is not on $TB"
git show "$TC:transfer/$RP" > "$D/prompt/$RP"; test "$(h256 "$D/prompt/$RP")" = $XRP || die "the review prompt at $TC is not the signed text"
git remote remove origin || die "cannot remove the remote"
test -z "$(git remote)" && test -z "$(git for-each-ref refs/remotes)" || die "the clone still has a remote"
test -z "$(git status --porcelain --untracked-files=all)" || die "the clone is not clean"
cd "$D" || die "cannot enter $D"
echo "texts: $(ls prompt | wc -l | tr -d " ") in prompt/, each with its signed or expected SHA-256; the review prompt from $TC; repo/ at $(git -C repo rev-parse HEAD), no remote, clean"
echo "=== 3. the description of pull request $N"
$G api repos/$R/pulls/$N --jq .body > "$T/body.raw" || die "cannot read the description"
perl -0777 -pe "s/\r//g; s/\n+\z/\n/" "$T/body.raw" > "$D/prompt/pr-254-description.md"
perl -0777 -pe "s/\r//g; s/\n+\z/\n/" "$W/pr/pr-body.md" > "$T/body.local"
cmp -s "$D/prompt/pr-254-description.md" "$T/body.local" || die "the posted description is not pr/pr-body.md"
echo "posted description equals pr/pr-body.md, normalized; $(grep -c "" "$D/prompt/pr-254-description.md") lines"
echo "=== 4. E1: the builder files"
test "$(cd "$W/pr" && LC_ALL=C ls | tr "\n" " ")" = "$PRL" || die "pr/ is not the seven expected files"
test "$(h256 "$W/pr/m1-report.md")" = $XFR && test "$(h256 "$W/pr/pr-body.md")" = $XPB && test "$(h256 "$W/pr/pr-title.txt")" = $XPT || die "the final report, pr-body.md or pr-title.txt changed"
test "$(h256 "$W/pr/m1-report-1.md")" = $XFR1 && test "$(h256 "$W/pr/pr-body-1.md")" = $XPB1 || die "the first final report or description changed"
test "$(h256 "$W/pr/m1-halt-1-report.md")" = $HR1 && test "$(h256 "$W/pr/m1-halt-3-report.md")" = $HR3 || die "a halt report changed"
test -z "$(ls "$W/logs" | grep "^124-")" || die "a log numbered 124 is in logs/"
test "$(h256 "$W/prompt/SHA256.txt")" = $XPS && (cd "$W/prompt" && shasum -a 256 -c --status SHA256.txt) || die "the builder prompt folder changed"
test -z "$(find "$W/logs" -mindepth 1 ! -type f | head -1)" || die "logs/ holds something other than files"
cp -R "$W/logs" "$D/E1/logs" && cp -R "$W/pr" "$D/E1/pr" && cp "$W/prompt/SHA256.txt" "$D/E1/prompt-SHA256.txt" || die "copy of E1 failed"
(cd "$D/E1" && find logs pr prompt-SHA256.txt -type f | LC_ALL=C sort | while IFS= read -r f; do shasum -a 256 "$f"; done) > "$T/bf"; mv "$T/bf" "$D/E1/builder-files.sha256"
(cd "$D/E1" && shasum -a 256 -c --status builder-files.sha256) || die "E1 does not match its list"
echo "E1: $(grep -c "" "$D/E1/builder-files.sha256") files listed: $(ls "$D/E1/logs" | wc -l | tr -d " ") logs, 7 pr files, the prompt list"
echo "=== 5. E2: the builder transcripts"
test "$(h256 "$W/evidence/SHA256.txt")" = $XE2 || die "the evidence list is not $XE2"
cp -R "$W/evidence/." "$D/E2/" || die "copy of E2 failed"
(cd "$D/E2" && shasum -a 256 -c --status SHA256.txt) || die "E2 does not match its SHA256.txt"
test "$(grep -c "" "$D/E2/SHA256.txt")" = 5 && test "$(cd "$D/E2" && find . -type f ! -name SHA256.txt | wc -l | tr -d " ")" = 5 || die "E2 is not the five listed files"
echo "E2: 5 transcripts, SHA256.txt $XE2"
echo "=== 6. E3: your MacBook run"
test "$(h256 "$B24M/MANIFEST.sha256")" = $XE3 || die "the MacBook manifest is not $XE3"
cp -R "$B24M/logs" "$D/E3/logs" && cp "$B24M/load-waits.log" "$B24M/MANIFEST.sha256" "$D/E3/" || die "copy of E3 failed"
(cd "$D/E3/logs" && shasum -a 256 -c --status ../MANIFEST.sha256) || die "E3 does not match its manifest"
for f in "$D"/E3/logs/*.log; do grep -q "  $(basename "$f")$" "$D/E3/MANIFEST.sha256" || die "$(basename "$f") of E3 is not listed"; done
echo "E3: manifest $XE3, $(ls "$D/E3/logs" | wc -l | tr -d " ") logs"
echo "=== 7. E4: your Ubuntu run, fetched in step 0"
cp -R "$T/E4/." "$D/E4/" || die "copy of E4 failed"
test "$(h256 "$D/E4/MANIFEST.sha256")" = $XE4 || die "the Ubuntu manifest is not $XE4"
(cd "$D/E4/logs" && shasum -a 256 -c --status ../MANIFEST.sha256) || die "E4 does not match its manifest"
for f in "$D"/E4/logs/*.log; do grep -q "  $(basename "$f")$" "$D/E4/MANIFEST.sha256" || die "$(basename "$f") of E4 is not listed"; done
echo "E4: manifest $XE4, $(ls "$D/E4/logs" | wc -l | tr -d " ") logs"
echo "=== 8. E5: your check of the session record"
test "$(h256 "$E5S/MANIFEST.sha256")" = $XM5 || die "the check folder is not the one your check printed"
(cd "$E5S" && shasum -a 256 -c --status MANIFEST.sha256) || die "$E5S does not match its manifest"
(cd "$E5S" && find . -type f ! -path "./upload/*" | LC_ALL=C sort | while IFS= read -r f; do mkdir -p "$D/E5/$(dirname "$f")" && cp "$f" "$D/E5/$f" || exit 1; done) || die "copy of $E5S failed"
(cd "$D/E5" && shasum -a 256 -c --status MANIFEST.sha256) || die "E5 does not match its manifest"
test "$(grep -c "" "$D/E5/MANIFEST.sha256")" = "$(cd "$D/E5" && find . -type f ! -name MANIFEST.sha256 | wc -l | tr -d " ")" || die "E5 holds a file its manifest does not list"
test "$(h256 "$D/E5/h2-record-check.mjs")" = $XK && test "$(h256 "$D/E5/b4-count.mjs")" = $XB4C && test "$(tail -1 "$D/E5/selftest.txt")" = SELFTEST_OK || die "E5: the check, the count or its self-test differs"
test "$(tail -1 "$D/E5/check.txt")" = CHECK_OK && test "$(tail -1 "$D/E5/b4.txt")" = B4_OK || die "E5: the check did not end CHECK_OK and B4_OK"
echo "E5 from $(basename "$E5S"): $(grep -c "" "$D/E5/MANIFEST.sha256") files, last line of check.txt: $(tail -1 "$D/E5/check.txt")"
cp "$D/E5/b4-count.mjs" "$D/prompt/b4-count.mjs"; test "$(h256 "$D/prompt/b4-count.mjs")" = $XB4C || die "b4-count.mjs differs"
echo "=== 9. no key in what the reviewer reads"
KEY=$(tr -d "\n\r" < "$KF"); test ${#KEY} -ge 20 || die "the key file does not hold a key"
grep -rlF -f <(printf "%s\n" "$KEY") "$D/prompt" "$D/E1" "$D/E2" "$D/E3" "$D/E4" "$D/E5" "$D/repo" > "$T/hits" 2> "$T/kerr"; KRC=$?; unset KEY
test $KRC -le 1 || die "the key search failed: $(head -2 "$T/kerr" | tr "\n" " ")"
NK=$(grep -c "" "$T/hits"); test "$NK" = 0 || die "$NK files hold the key itself; nothing goes to the reviewer"
echo "the key itself is in no file of the folder"
echo "=== 10. prompt/SHA256.txt and the quotes of the review prompt"
(cd "$D/prompt" && for f in $(LC_ALL=C ls); do shasum -a 256 "$f"; done; for m in ../E1/builder-files.sha256 ../E2/SHA256.txt ../E3/MANIFEST.sha256 ../E4/MANIFEST.sha256 ../E5/MANIFEST.sha256; do shasum -a 256 "$m"; done) > "$T/SHA256.txt"
mv "$T/SHA256.txt" "$D/prompt/SHA256.txt"; (cd "$D/prompt" && shasum -a 256 -c --status SHA256.txt) || die "prompt/SHA256.txt does not check"
cat > "$T/qc.pl" <<"GEN_m1_QC"
use strict; use warnings;
my ($root, $report) = @ARGV;
open(my $fh, "<", $report) or die "cannot read report\n"; my @L = <$fh>; close $fh;
my ($ok, $bad, $unsourced) = (0, 0, 0); my @fails;
sub slurp { my $p = shift; open(my $h, "<", $p) or return undef; local $/; my $t = <$h>; close $h; $t .= "\n" if length($t) && substr($t, -1) ne "\n"; return $t; }
for (my $i = 0; $i < @L; $i++) {
  next unless $L[$i] =~ /^\s*```/;
  my $open = $i; my $j = $i + 1;
  $j++ while $j < @L && $L[$j] !~ /^\s*```\s*$/;
  my $content = join("", @L[$open+1 .. $j-1]);
  my $src = ($open > 0 && $L[$open-1] =~ /^Source: (\S+)\s*$/) ? $1 : undef;
  my $where = "prompt line " . ($open + 1);
  $i = $j;
  if (!defined $src) { $unsourced++; push @fails, "$where: fenced block with no Source line"; next; }
  if ($src =~ /\.\./ || $src !~ m{^(E3|E4|E5)/}) { $bad++; push @fails, "$where: source not allowed: $src"; next; }
  my $t = slurp("$root/$src");
  if (!defined $t) { $bad++; push @fails, "$where: no such file $src"; next; }
  if (index("\n" . $t, "\n" . $content) >= 0) { $ok++ } else { $bad++; push @fails, "$where: block not found in $src"; }
}
print "quote check: $ok blocks found in their sources, $bad not found, $unsourced without a Source line\n";
print "  $_\n" for @fails;
exit(($bad + $unsourced) ? 1 : 0);
GEN_m1_QC
perl "$T/qc.pl" "$D" "$D/prompt/$RP" || die "a quote of the review prompt is not in its source; send this output to the drafting assistant"
chmod -R a-w "$D/prompt" "$D/E1" "$D/E2" "$D/E3" "$D/E4" "$D/E5"
pbcopy < "$D/prompt/$RP"
test "$(pbpaste | shasum -a 256 | cut -c1-64)" = "$XRP" || die "the clipboard differs from the review prompt"
echo "REVIEW FOLDER READY: $D (repo at $(git -C "$D/repo" rev-parse HEAD)); prompt/SHA256.txt $(h256 "$D/prompt/SHA256.txt"), $(grep -c "" "$D/prompt/SHA256.txt") lines"
HN="her"; HN="${HN}mes"
echo "PROMPT_COPIED; load now: $(sysctl -n vm.loadavg); processes naming $HN: $(ps -axo command= | grep -i "[h]ermes" | grep -v -e chrome-devtools-mcp | wc -l | tr -d " ")"
echo "NEXT, in a new terminal tab: cd $D && agy   then choose a Gemini model, start a new conversation and paste the prompt"
' || echo STOPPED
