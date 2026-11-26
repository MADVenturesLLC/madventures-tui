cd ~ && bash -c '
set -uo pipefail
die() { echo "STOP: $1"; exit 1; }
h256() { shasum -a 256 "$1" | cut -c1-64; }
echo "=== admission build Tier-2 review: the review folder, version 1 (bash $BASH_VERSION)"
R=MADVenturesLLC/madventures-tui; G="env -u GH_TOKEN gh"; N=252; BR=build/3b-m0-admission-r1
D=/Users/michaeldaley/builds/review-m0-admission-r1; RPT=/Users/michaeldaley/builds/review-m0-admission-r1.md
W=/Users/michaeldaley/builds/m0-admission-r1; RC=/Users/michaeldaley/builds/m0-admission-record-check; B12M=/Users/michaeldaley/builds/m0-admission-b10-macbook-68d78a60
UH=michaeldaley@michaeldaley-z890-pro-rs-wifi-white; UB=builds/m0-admission-b10-ubuntu-68d78a60; KF=/Users/michaeldaley/.secrets/minimax-mplan.key
H=68d78a60338d9ff27ffab7b275aa3395e2a1c9bd; HP=330cbba13c430c526a03cd1be4a993ec9e067a12; H1=664c5678e516197fa1a14da3487e27821753ff48; B=0678bd4412d5aaed963ae20f101959bd92f79811; BB=403a9f536539b96115aa44ab82436fe55d95b739
TB=claude/awesome-cray-vqrzbt; TC=84b8ce2d5526370507fc6dd8b347e791fb0c928e; RP=review-prompt-m0-admission-antigravity-r1.md; XRP=b5ae6dffc2459bfa03c45a622eccb7fd325aa4c729cf7429ade27105b874e30c
XE2=c4d1e53cf90f50575fa80ac8f42f64544679466d54e3916f181e9a3ae637ea1f; XE3=c79d39a2577c54f2d8e5653bfe41660eeb2175c693d494548ad766a39df59235; XE4=7ebd2f8688666deb059e6314cd9dae2055f76cd9af7ba26315c1dc8aec0d2514
P1=$RC/phase1-20261122T050129Z; XM1=2f1e0e5d63597e93f87cb35cd7a55c68241c4e61c94de14a76f5b833d2b6193e; P2=$RC/phase2-20261122T200929Z; XM2=d4abd9059e3f5e263565d44684e08fcb3935af2f8e9d37af550bc2fce71fc4d2; XK=c1834dcc689e94cf57fb123a09a0600225d8e97b428c648f14276136e3dd383f; XB4C=2dcff5987b35e4a1e7c60e1b9229f32f7ebca58376ea0af0d39ba2b6ef647689
XS=c6d927b3b87e3ab10fa56709786fedd1f71ad5449bf2a5a037a137d94aece825; XFR=45c79ae55539a2bdeef0bf22b9988a1005acbc86c906dbd95ca7f447db5b7b47; XPB=97bae3df127dac0d1ba840d26eb84135234b864e1d5fa15d6710c69f47791460
PRL="m0-admission-phase1-halt-1-report.md m0-admission-phase1-halt-2-report.md m0-admission-phase1-report.md m0-admission-phase2-report.md pr-body.md pr-title.txt "
MAINT="
decisions DEC-20261121-02-madv-surface-admission.md 141ee53275999ba3f31a0b1f66bed93ffb7a80d6f3527cbff31b3885ead44dfe
decisions DEC-20261115-02-phase-3b-m0.md 5d8bd4a446d8b3120bddbc34dc11a5fdf83e3a07d9efcd04fbd7b8efdad8d22b
decisions DEC-20261115-02-addendum-1-m0-paths-and-tests.md 31576960c18a4c9607fca2785e54146df5f740af45b4437dc7f13890abaeca42
decisions DEC-20261115-02-addendum-2-environment-and-preflight-tests.md a6512b4ad4cadb10f014256922bd09efd4d1eb9d65d0a8e4c91102f4f4ca60a0
decisions DEC-20261115-02-addendum-3-phase-1-record-check.md 24f76dbb631d6058e81ccff93d3c9fecb11521b5a876c687ec0da1ee0f9e0a23
decisions DEC-20261115-02-addendum-4-key-check-and-clause-1.md 45131b839e0365a83462b3ee297007789ffe11cefc1a545a96784b85a1012bf4
decisions DEC-20261115-02-addendum-5-retired-id-plugin-and-json.md 666a82b2229272111f4d01b79c6ffba401a53f5236ae50f7f7c6a4b3651cd9ac
decisions DEC-20261115-02-addendum-6-ubuntu-check.md 2dac9e9acdcc4da16e80a60aff90d0b3079ee2558c29433cfafe7dcc9f0f8b26
decisions DEC-20261115-02-addendum-7-ubuntu-identity-run-and-deferral.md f6ed06f7d4f98e8155dfedbcf190eff938caddfabd848c2ecb489f595c7591fb
decisions DEC-20261115-02-addendum-8-pr245-reopen.md a812952a53b2619be73157a096f883d1bd04e90a4474cfcd638e30f8c677f435
decisions DEC-20261115-02-addendum-8-authorization-1-second-reopen.md 7559bf37c60b17c2e48e9152b664126d9ba7e24390447c7dfb5390fc567a06d9
decisions DEC-20261119-01-m0-records-and-merge.md 7076137d68f013705d8872eaf573cb13ee17319b9074bc20248d02a2d6316df2
decisions DEC-20261119-03-madv-surface-0.1.2-release.md 6823c07f50567a62abee020de693e192cc43ff47a75871e5bfad5bd16e671d9b
decisions DEC-20261121-01-madv-surface-0.1.2-records.md b0b81b4eeb505ee3926fbfb85ff6272c52abf9d89934205bc5633c8fa7bdffbf
decisions DEC-20261108-04-phase-3b-standing-commission.md d373235e424bd7fbe4c1c5b1c5f4954eb1b02165db4e1365d9cfa1533aa93b29
decisions DEC-20261108-04-addendum-1-corrections.md 90e2f541fd0a232390ca0554067a2de8b37f15c933016eafe40ebde2cd2eff17
decisions DEC-20261108-01-phase-3b-approval.md 319ba65b340696d66a655e21f648fed742a9c38bcbb1d876776abc27a27a9738
decisions DEC-20261108-02-phase-3b-builder-qualification.md 38ec4066f5c9487547befc81e00b80b69126d9140f1e66c0a8dcb35e5fe815ef
decisions DEC-20261108-03-phase-3b-h1.md 10cdc674ce746568c963aa2c5c34c95a69d9960ea469438b044bfb5fe4b9e9de
decisions DEC-20261108-03-addendum-2-codex-harness.md e04b54065b0f0bb465b2d14e14a39f3b31f9cb34a874f6f8210a7d7e74a8c1c1
decisions DEC-20261108-03-addendum-3-image-tool.md f2a0ef1063379902935760d9517b68d532cabf6e24699cdebb789681f78ce15e
decisions DEC-20261108-03-addendum-4-sandbox-halt.md e817470aea6be2c176d4ae75856fd793ef982bd28c9eb793df9c9038a5c1dfbc
decisions DEC-20261108-03-addendum-5-own-work.md e86e94a62c7067e4656114afe1713c1478814ffe446d1ffcc8b788accfc3ff3d
decisions DEC-20261108-03-addendum-6-names-in-text.md 24cef0ed5c968aa80ada586e473526d0f4f0b1de1331eba1d5a35051b1254ac9
decisions DEC-20261108-03-addendum-10-second-verdict.md d90d48718bc4ea6056af6f011f797a78eddcfd14e7111f15f823085c4388bca0
decisions DEC-20261108-03-addendum-11-governed-build.md e2d28cbd12485e9025c928403eb7beead9552ee378b023ddf5bc9e18febe00df
decisions DEC-20261112-02-model-record.md 3151cb9e178e918f0c07f5a4eb9931fa9d529debedf0ad4d91f5999844883da7
decisions DEC-20261115-01-madv-surface-0.1.1-records.md 5bf1d2353fa44fd4c346ce0207286eaba0726e42fb4314af4c2fb2aa5fe5ccd6
decisions DEC-20261112-03-addendum-2-gate-repeat.md 829248f1e2557ddbcfd33d6456f7056bfce73a008791cb88caa9660a5d979d29
decisions DEC-20261102-02-hardening-builds.md 04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550
decisions DEC-20261023-01-standing-build-rules.md bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5
decisions DEC-20261113-01-h2-records-and-merge.md 41e27eafc24a2eef238c080d1374b90fbe22d609f4ef5cbb66e07cccb5b347a5
decisions DEC-20261114-01-madv-surface-release.md 6bffc2c18927b90f4b5042f312947e5d39853ca53404a58a51b4602eb45652b8
decisions DEC-20261013-03-tests-4-6-ruling.md 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7
decisions DEC-20261104-02-hardening-f-and-task58.md 011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5
decisions DEC-20261117-01-linux-runtime-after-pr40304.md 252afc6bf85fb92a43e9b33cbbf718103a3c6060bdd04ffab9e2885b43d8c721
decisions DEC-20261024-01-separation-pin-rule.md fa0d114dbe3a37db38a7538e9a5c33da42755a47250d7ae4069233043c6ac85e
decisions PLAN-OPEN-2-environment-allowlists.md b60676aa47b216c36d9080c884650943cdac93dd12109d2864ebcf0eb6887d8c
decisions PLAN-OPEN-3-capability-horizon.md cca3061b91ffc9eb231003f5e5d7c20230f47cf8c2378f6f1241d57309618562
superpowers/plans 2026-09-19-phase-3b-live-tui-integration.md a48bf5457bf17cf5d554e541c5bb3609efacf6ad170ad6e56950b829a4269ccc
superpowers/specs 2026-09-19-phase-3b-live-tui-integration-design.md da8f4c8c35f617898368b340d710188686c9dc9faf2b23c4a6b284c1bb4d93fc
superpowers/specs 2026-08-12-phase-3a-runtime-foundation-design.md 472f3179c20f7f41c0e3feb5a65842bf3774cf6df01e8684a3ea86dcd811bce0
superpowers/plans 2026-08-12-phase-3a-runtime-foundation.md 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2
"
TRT="
DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md b6b9563ed1a2e154b4ef3b4d9ffe7666e6fd9870d82b87486f772d65f7f167aa
DEC-20261121-02-addendum-2-registry-digest.md 5dc0fddf411f8abce1e20df834ce21d0676b1fcd538fe12ad3d49a34ffa8be81
builder-prompt-m0-admission-codex-macbook.md abf0766764f3587d9dd3de096749c2aa6249fc55cd455c3563e22c4744f300d2
resume-m0-admission-1-runtime.md be1771c3d03b5dfa225b808c21591d0bac519d08073cdc80b5d0dbe41ffd41e5
resume-m0-admission-2-registry-digest.md eab2fbf86a415032716dd0cf56f01c9179994756f67f8b8bb8e21612e21534d7
resume-m0-admission-3-phase-2.md 0e54e70e354dd478ad43f40e47136cab7d6b6a136c990759831fbbc909d2a1a4
m0-r1/m0-record-r3.ts b9ba9bdadf0ca0b5e792ad78fc46f9212d763ad7455fb122343756be2e6fb593
h2-record-check.mjs c1834dcc689e94cf57fb123a09a0600225d8e97b428c648f14276136e3dd383f
"
test "$(uname -s)" = Darwin || die "run this on the MacBook"
test -z "${CLAUDECODE:-}" || die "run this in a plain terminal, not inside an agent session"
test ! -e "$D" || die "already exists: $D"
test ! -e "$RPT" || die "a report already exists: $RPT"
for t in git perl ssh tar pbcopy pbpaste; do command -v $t >/dev/null || die "$t not found"; done
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
test "$($G api repos/$R/pulls/$N --jq "[.state,(.draft|tostring),.head.sha]|join(\" \")")" = "open true $H" || die "PR $N is not an open draft at $H"
T=$(mktemp -d); mkdir -p "$T/E4"
echo "=== 0. E4 first: your Ubuntu run, from the PC in one connection; if ssh asks for a password, type your Ubuntu PC password"
ssh -o ConnectTimeout=15 "$UH" "tar -C $UB -cf - logs load-waits.log MANIFEST.sha256" < /dev/null | tar -C "$T/E4" -xf - || die "copy from the Ubuntu PC failed (see the ssh message above); nothing was made"
test "$(h256 "$T/E4/MANIFEST.sha256")" = $XE4 || die "the Ubuntu manifest is not $XE4; nothing was made"
(cd "$T/E4/logs" && shasum -a 256 -c --status ../MANIFEST.sha256) || die "the Ubuntu logs do not match their manifest; nothing was made"
echo "fetched: manifest $XE4, $(ls "$T/E4/logs" | wc -l | tr -d " ") logs"
mkdir -p "$D/prompt" "$D/E1" "$D/E2" "$D/E3" "$D/E4" "$D/E5/phase1" "$D/E5/phase2" "$D/logs" "$D/scratch"
export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1
echo "=== 1. repo/ at $H"
git clone -q https://github.com/$R.git "$D/repo" < /dev/null || die "clone failed"
cd "$D/repo" || die "cannot enter the clone"
git fetch -q origin "+refs/heads/$TB:refs/remotes/origin/$TB" < /dev/null || die "cannot fetch $TB"
test "$(git rev-parse origin/$BR)" = $H || die "$BR is not at $H"
git checkout -q --detach $H || die "cannot check out $H"
test "$(git rev-parse HEAD)" = $H && test "$(git rev-parse $H^)" = $HP || die "HEAD or its parent differs"
test "$(git rev-list --count $B..$H)" = 10 && test "$(git rev-list --merges --count $B..$H)" = 0 || die "not ten commits without a merge from $B"
test "$(git rev-list --reverse $B..$H | sed -n 7p)" = $H1 || die "the seventh commit is not $H1"
test "$(git diff --name-only $BB $B)" = docs/decisions/DEC-20261121-02-madv-surface-admission.md || die "the base is not the binding base with the act alone"
echo "=== 2. the texts of prompt/"
echo "$MAINT" | while read -r dir name x; do test -n "$name" || continue; git show "origin/main:docs/$dir/$name" > "$D/prompt/$name" 2>/dev/null || { echo "MISSING $name"; exit 1; }; test "$(h256 "$D/prompt/$name")" = "$x" || { echo "DIFFERS $name"; exit 1; }; done || die "a text from main is missing or differs"
echo "$TRT" | while read -r name x; do test -n "$name" || continue; bn=$(basename "$name"); git show "origin/$TB:transfer/$name" > "$D/prompt/$bn" 2>/dev/null || { echo "MISSING $name"; exit 1; }; test "$(h256 "$D/prompt/$bn")" = "$x" || { echo "DIFFERS $name"; exit 1; }; done || die "a text from the transfer branch is missing or differs"
test "$(git log -1 --format=%H "origin/$TB" -- "transfer/$RP")" = $TC || die "the latest commit of $RP is not $TC"
git show "$TC:transfer/$RP" > "$D/prompt/$RP"; test "$(h256 "$D/prompt/$RP")" = $XRP || die "the review prompt is not the signed text"
git remote remove origin || die "cannot remove the remote"
test -z "$(git remote)" && test -z "$(git for-each-ref refs/remotes)" || die "the clone still has a remote"
test -z "$(git status --porcelain --untracked-files=all)" || die "the clone is not clean"
cd "$D" || die "cannot enter $D"
echo "texts: $(ls prompt | wc -l | tr -d " ") in prompt/, each with its signed or expected SHA-256; repo/ at $(git -C repo rev-parse HEAD), no remote, clean"
echo "=== 3. the description of pull request $N"
$G api repos/$R/pulls/$N --jq .body > "$T/body.raw" || die "cannot read the description"
perl -0777 -pe "s/\r//g; s/\n+\z/\n/" "$T/body.raw" > "$D/prompt/pr-252-description.md"
perl -0777 -pe "s/\r//g; s/\n+\z/\n/" "$W/pr/pr-body.md" > "$T/body.local"
printf "\nRole-Id: builder\nActor-Id: session:codex/3b-m0-admission-r1\nExecution-Surface: codex\n" >> "$T/body.local"
cmp -s "$D/prompt/pr-252-description.md" "$T/body.local" || die "the posted description is not pr/pr-body.md followed by the three trailers"
echo "posted description equals pr/pr-body.md, normalized, followed by a blank line and the three trailers; $(grep -c "" "$D/prompt/pr-252-description.md") lines"
echo "=== 4. E1: the builder files"
test "$(cd "$W/pr" && LC_ALL=C ls | tr "\n" " ")" = "$PRL" || die "pr/ is not the six expected files"
test "$(h256 "$W/pr/m0-admission-phase2-report.md")" = $XFR && test "$(h256 "$W/pr/pr-body.md")" = $XPB || die "the Phase 2 report or pr-body.md changed"
test "$(cd "$W/record" && LC_ALL=C ls | tr "\n" " ")" = "m0-admission-record.ts " && test "$(h256 "$W/record/m0-admission-record.ts")" = $XS || die "record/ changed"
test "$(grep -c "" "$W/prompt/SHA256.txt")" = 7 && (cd "$W/prompt" && shasum -a 256 -c --status SHA256.txt) || die "the builder prompt folder changed"
cp -R "$W/logs" "$D/E1/logs" && cp -R "$W/pr" "$D/E1/pr" && cp -R "$W/record" "$D/E1/record" && cp "$W/prompt/SHA256.txt" "$D/E1/prompt-SHA256.txt" || die "copy of E1 failed"
(cd "$D/E1" && find logs pr record prompt-SHA256.txt -type f | LC_ALL=C sort | while IFS= read -r f; do shasum -a 256 "$f"; done) > "$T/bf"; mv "$T/bf" "$D/E1/builder-files.sha256"
(cd "$D/E1" && shasum -a 256 -c --status builder-files.sha256) || die "E1 does not match its list"
echo "E1: $(grep -c "" "$D/E1/builder-files.sha256") files listed: $(ls "$D/E1/logs" | wc -l | tr -d " ") logs, 6 pr files, the record script, the prompt list"
echo "=== 5. E2: the sanitized evidence"
test "$(h256 "$W/evidence/SHA256.txt")" = $XE2 || die "the evidence list is not $XE2"
cp -R "$W/evidence/." "$D/E2/" || die "copy of E2 failed"
(cd "$D/E2" && shasum -a 256 -c --status SHA256.txt) || die "E2 does not match its SHA256.txt"
test "$(grep -c "" "$D/E2/SHA256.txt")" = 123 && test "$(cd "$D/E2" && find . -type f ! -name SHA256.txt | wc -l | tr -d " ")" = 123 || die "E2 is not the 123 listed files"
echo "E2: 123 files, SHA256.txt $XE2"
echo "=== 6. E3: your MacBook run"
test "$(h256 "$B12M/MANIFEST.sha256")" = $XE3 || die "the MacBook manifest is not $XE3"
cp -R "$B12M/logs" "$D/E3/logs" && cp "$B12M/load-waits.log" "$B12M/MANIFEST.sha256" "$D/E3/" || die "copy of E3 failed"
(cd "$D/E3/logs" && shasum -a 256 -c --status ../MANIFEST.sha256) || die "E3 does not match its manifest"
for f in "$D"/E3/logs/*.log; do grep -q "  $(basename "$f")$" "$D/E3/MANIFEST.sha256" || die "$(basename "$f") of E3 is not listed"; done
echo "E3: manifest $XE3, $(ls "$D/E3/logs" | wc -l | tr -d " ") logs"
echo "=== 7. E4: your Ubuntu run, fetched in step 0"
cp -R "$T/E4/." "$D/E4/" || die "copy of E4 failed"
test "$(h256 "$D/E4/MANIFEST.sha256")" = $XE4 || die "the Ubuntu manifest is not $XE4"
(cd "$D/E4/logs" && shasum -a 256 -c --status ../MANIFEST.sha256) || die "E4 does not match its manifest"
for f in "$D"/E4/logs/*.log; do grep -q "  $(basename "$f")$" "$D/E4/MANIFEST.sha256" || die "$(basename "$f") of E4 is not listed"; done
echo "E4: manifest $XE4, $(ls "$D/E4/logs" | wc -l | tr -d " ") logs"
echo "=== 8. E5: your checks of the session record"
test "$(h256 "$P1/MANIFEST.sha256")" = $XM1 && test "$(h256 "$P2/MANIFEST.sha256")" = $XM2 || die "a check folder is not the one your checks printed"
for pair in "phase1 $P1" "phase2 $P2"; do
  set -- $pair; tgt=$D/E5/$1; src=$2
  (cd "$src" && shasum -a 256 -c --status MANIFEST.sha256) || die "$src does not match its manifest"
  (cd "$src" && find . -type f ! -path "./upload/*" | LC_ALL=C sort | while IFS= read -r f; do mkdir -p "$tgt/$(dirname "$f")" && cp "$f" "$tgt/$f" || exit 1; done) || die "copy of $src failed"
  (cd "$tgt" && shasum -a 256 -c --status MANIFEST.sha256) || die "$tgt does not match its manifest"
  test "$(grep -c "" "$tgt/MANIFEST.sha256")" = "$(cd "$tgt" && find . -type f ! -name MANIFEST.sha256 | wc -l | tr -d " ")" || die "$tgt holds a file its manifest does not list"
  test "$(h256 "$tgt/h2-record-check.mjs")" = $XK && test "$(h256 "$tgt/b4-count.mjs")" = $XB4C && test "$(tail -1 "$tgt/selftest.txt")" = SELFTEST_OK || die "$tgt: the check, the count or its self-test differs"
  test "$(tail -1 "$tgt/check.txt")" = CHECK_OK && test "$(tail -1 "$tgt/b4.txt")" = B4_OK || die "$tgt: the check did not end CHECK_OK and B4_OK"
  echo "E5/$1 from $(basename "$src"): $(grep -c "" "$tgt/MANIFEST.sha256") files, last line of check.txt: $(tail -1 "$tgt/check.txt")"
done
cp "$D/E5/phase2/b4-count.mjs" "$D/prompt/b4-count.mjs"; test "$(h256 "$D/prompt/b4-count.mjs")" = $XB4C || die "b4-count.mjs differs"
echo "=== 9. no key in what the reviewer reads"
test -r "$KF" || die "the key file is not readable"
KEY=$(tr -d "\n\r" < "$KF"); test ${#KEY} -ge 20 || die "the key file does not hold a key"
NK=$(grep -rlF -f <(printf "%s\n" "$KEY") "$D/prompt" "$D/E1" "$D/E2" "$D/E3" "$D/E4" "$D/E5" "$D/repo" 2>/dev/null | wc -l | tr -d " "); unset KEY
test "$NK" = 0 || die "$NK files hold the key itself; nothing goes to the reviewer"
echo "the key itself is in no file of the folder"
echo "=== 10. prompt/SHA256.txt and the quotes of the review prompt"
(cd "$D/prompt" && for f in $(LC_ALL=C ls); do shasum -a 256 "$f"; done; for m in ../E1/builder-files.sha256 ../E2/SHA256.txt ../E3/MANIFEST.sha256 ../E4/MANIFEST.sha256 ../E5/phase1/MANIFEST.sha256 ../E5/phase2/MANIFEST.sha256; do shasum -a 256 "$m"; done) > "$T/SHA256.txt"
mv "$T/SHA256.txt" "$D/prompt/SHA256.txt"; (cd "$D/prompt" && shasum -a 256 -c --status SHA256.txt) || die "prompt/SHA256.txt does not check"
cat > "$T/qc.pl" <<"GEN_m0_QC"
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
GEN_m0_QC
perl "$T/qc.pl" "$D" "$D/prompt/$RP" || die "a quote of the review prompt is not in its source; send this output to the drafting assistant"
rm -rf "$T"
chmod -R a-w "$D/prompt" "$D/E1" "$D/E2" "$D/E3" "$D/E4" "$D/E5"
echo "REVIEW FOLDER READY: $D (repo at $(git -C "$D/repo" rev-parse HEAD)); prompt/SHA256.txt $(h256 "$D/prompt/SHA256.txt"), $(grep -c "" "$D/prompt/SHA256.txt") lines"
pbcopy < "$D/prompt/$RP"
test "$(pbpaste | shasum -a 256 | cut -c1-64)" = "$XRP" || die "the clipboard differs from the review prompt"
HN="her"; HN="${HN}mes"
echo "PROMPT_COPIED; load now: $(sysctl -n vm.loadavg); processes naming $HN: $(ps -axo command= | grep -i "[h]ermes" | grep -v -e chrome-devtools-mcp | wc -l | tr -d " ")"
echo "NEXT, in a new terminal tab: cd $D && agy   then choose a Gemini model, start a new conversation and paste the prompt"
' || echo STOPPED
