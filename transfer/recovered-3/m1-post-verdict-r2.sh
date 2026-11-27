cd ~ && bash -c '
RX0=96c697b746951c30b042a55f43ab6a6456d6faf74f7421c0a31844103f213796
die() { echo "STOP: $1"; exit 1; }
h256() { shasum -a 256 "$1" | cut -c1-64; }
echo "=== M1 Tier-2 review of correction round 1 (review r2): the check of Phase 3B plan section 2C again, then the verdict posted on pull request 254 as decivantiq (bash $BASH_VERSION)"
W=/Users/michaeldaley/builds/review-m1-r2; RP=/Users/michaeldaley/builds/review-m1-r2.md
H=2fb92148c361ab7434d1e62e87cdeb9e59842b3f; PF=review-prompt-m1-antigravity-r2.md
PX=574991a7ee72772dee80f9b3b2293f19802b7f54b998a2107a04b9720f6bd173; PS=6a0587fb0bfc9fc71892de635401029c20aed74ba3742ab3df42f5bfd8ca618a
test -z "${CLAUDECODE:-}" || die "run this in a plain terminal, not inside an agent session"
test "$(uname -s)" = Darwin || die "run this on the MacBook"
command -v gh >/dev/null || die "gh not found"
test -f "$RP" && test -d "$W" || die "no report at $RP or no folder at $W"
command -v perl >/dev/null || die "perl not found"
FAILS=""
fail() { echo "FAILED: $1"; FAILS="$FAILS; $1"; }
echo "=== 1. the report"
RX=$(h256 "$RP")
echo "report $RX, $(grep -c "" "$RP") lines, $(wc -c < "$RP" | tr -d " ") bytes"
test "$RX" = "$RX0" && echo "it is the SHA-256 the reviewer printed" || fail "the report is not the $RX0 the reviewer printed"
RK=$W.report-1-$(echo "$RX" | cut -c1-8).md
if [ ! -e "$RK" ]; then cp -p "$RP" "$RK" && chmod a-w "$RK"; fi
test "$(h256 "$RK")" = "$RX" && echo "a read-only copy of this report is kept at $RK" || fail "the kept copy at $RK is not this report"
echo "=== 2. the folder the reviewer read"
test "$(git -C "$W/repo" rev-parse HEAD)" = $H && echo "repo/ at $H" || fail "repo/ is not at $H"
test -z "$(git --no-optional-locks -C "$W/repo" status --porcelain)" && echo "repo/ clean" || fail "repo/ is not clean: the reviewer left a change"
test "$(h256 "$W/prompt/SHA256.txt")" = $PS && (cd "$W/prompt" && shasum -a 256 -c --status SHA256.txt) && test "$(h256 "$W/prompt/$PF")" = $PX && echo "prompt/: SHA256.txt is the $PS your setup printed; every text, the description and the five E manifests unchanged; the review prompt is $PX" || fail "prompt/SHA256.txt is not the $PS your setup printed, prompt/ does not match it, or the review prompt is not $PX"
(cd "$W/E1" && shasum -a 256 -c --status builder-files.sha256) && echo "E1 unchanged" || fail "E1 does not match builder-files.sha256"
(cd "$W/E2" && shasum -a 256 -c --status SHA256.txt) && echo "E2 unchanged" || fail "E2 does not match its SHA256.txt"
(cd "$W/E3/logs" && shasum -a 256 -c --status ../MANIFEST.sha256) && echo "E3 unchanged" || fail "E3 does not match its manifest"
(cd "$W/E4/logs" && shasum -a 256 -c --status ../MANIFEST.sha256) && echo "E4 unchanged" || fail "E4 does not match its manifest"
(cd "$W/E5" && shasum -a 256 -c --status MANIFEST.sha256) && echo "E5 unchanged" || fail "E5 does not match its manifest"
test -z "$(find "$W/logs" "$W/scratch" -mindepth 1 ! -type f)" || fail "logs/ or scratch/ holds something other than files"
echo "logs/: $(ls -1 "$W/logs" | wc -l | tr -d " ") files; scratch/: $(ls -1 "$W/scratch" | wc -l | tr -d " ") files; hidden files there, not counted and not checked: $(find "$W/logs" "$W/scratch" -mindepth 1 -maxdepth 1 -name ".*" | sed "s|^$W/||" | tr "\n" " ")"
T=$(mktemp -d); trap "rm -rf \"$T\"" EXIT
cat > "$T/qc.pl" <<"PL"
use strict; use warnings;
my ($root, $report) = @ARGV;
open(my $fh, "<", $report) or die "cannot read report\n"; my @L = <$fh>; close $fh;
my ($ok, $bad, $unsourced) = (0, 0, 0); my @fails;
sub slurp { my $p = shift; open(my $h, "<", $p) or return undef; local $/; my $t = <$h>; close $h; $t .= "\n" if length($t) && substr($t, -1) ne "\n"; return $t; }
sub gshow { my ($r, $p) = @_; open(my $h, "-|", "git", "-C", $r, "show", "HEAD:$p") or return undef; local $/; my $t = <$h>; close $h or return undef; return undef unless defined $t; $t .= "\n" if length($t) && substr($t, -1) ne "\n"; return $t; }
sub trimt { my $s = shift; $s =~ s/[ \t]+\n/\n/g; return $s; }
for (my $i = 0; $i < @L; $i++) {
  if ($L[$i] =~ /^\s*>\s*(`{3,}|~{3,})/) { $bad++; push @fails, "report line " . ($i + 1) . ": a fence inside a block quote, which this check does not read"; next; }
  if ($L[$i] =~ /^\s*>?\s*(?:\*\*)?Source:/ && !($i + 1 < @L && $L[$i+1] =~ /^[ \t]*(`{3,}|~{3,})/)) { $bad++; push @fails, "report line " . ($i + 1) . ": a Source line not directly followed by an opening fence"; next; }
  next unless $L[$i] =~ /^([ \t]*)(`{3,}|~{3,})/;
  my ($ind, $fence) = (length($1), $2); my $ch = substr($fence, 0, 1); my $n = length($fence);
  my $open = $i; my $j = $i + 1;
  while ($j < @L) { if ($L[$j] =~ /^[ \t]*(`{3,}|~{3,})[ \t]*\r?$/ && substr($1, 0, 1) eq $ch && length($1) >= $n) { last } $j++ }
  my @c = @L[$open+1 .. $j-1];
  if ($ind > 0) { for (@c) { my $k = 0; $k++ while $k < $ind && substr($_, $k, 1) eq " "; $_ = substr($_, $k); } }
  my $content = join("", @c);
  my $src = ($open > 0 && $L[$open-1] =~ /^\s*Source:\s+(\S+)\s*$/) ? $1 : undef;
  my $where = "report line " . ($open + 1);
  $i = $j;
  if (!defined $src) { $unsourced++; push @fails, "$where: fenced block with no Source line directly above it"; next; }
  if ($src =~ /\.\./ || $src !~ m{^(logs|scratch|E1|E2|E3|E4|E5|prompt|repo)/}) { $bad++; push @fails, "$where: source not allowed: $src"; next; }
  if ($content !~ /\S/) { $bad++; push @fails, "$where: an empty block"; next; }
  if ($src =~ m{^repo/} && $src !~ m{^repo/(.+):(\d+)-(\d+)$}) { $bad++; push @fails, "$where: a repo/ source without :first-last lines: $src"; next; }
  if ($src =~ m{^repo/(.+):(\d+)-(\d+)$}) {
    my ($p, $a, $b) = ($1, $2, $3); my $t = gshow("$root/repo", $p);
    if (!defined $t) { $bad++; push @fails, "$where: no such file repo/$p at the head"; next; }
    my @fl = split(/(?<=\n)/, $t);
    if ($a < 1 || $b < $a || $b > @fl) { $bad++; push @fails, "$where: lines $a-$b outside repo/$p"; next; }
    my $want = join("", @fl[$a-1 .. $b-1]);
    if ($want eq $content) { $ok++ } else { $bad++; push @fails, "$where: block differs from repo/$p lines $a-$b" . (trimt($want) eq trimt($content) ? " (equal when spaces at line ends are ignored)" : ""); }
    next;
  }
  my $t = slurp("$root/$src");
  if (!defined $t) { $bad++; push @fails, "$where: no such file $src"; next; }
  if (index("\n" . $t, "\n" . $content) >= 0) { $ok++ } else { $bad++; push @fails, "$where: block not found in $src" . (index("\n" . trimt($t), "\n" . trimt($content)) >= 0 ? " (found when spaces at line ends are ignored)" : ""); }
}
print "quote check: $ok blocks found in their sources, $bad not found, $unsourced without a Source line\n";
print "  $_\n" for @fails;
exit(($bad + $unsourced) ? 1 : 0);
PL
cat > "$T/sec.pl" <<"PL"
use strict; use warnings;
my ($report, $n, $wh) = @ARGV;
my %kw = (1 => "Identity", 2 => "Verdict", 3 => "Findings", 4 => "What you executed", 5 => "The mutations", 6 => "The check", 7 => "Every log", 8 => "Anything", 9 => "Disagreements");
sub head { my ($l, $k) = @_; return 0 unless $l =~ /^\s*(?:#+\s*)?(?:\*\*)?\s*(\d+)\\?[.)]\s*(?:\*\*)?\s*(.*)/; return ($1 == $k && index(lc($2), lc($kw{$k})) == 0) ? 1 : 0; }
open(my $fh, "<", $report) or die "cannot read report\n"; my @L = <$fh>; close $fh;
my ($s, $e) = (-1, scalar(@L));
for my $i (0 .. $#L) { if ($s < 0) { $s = $i if head($L[$i], $n); } elsif ($n < 9 && head($L[$i], $n + 1)) { $e = $i; last; } }
exit 1 if $s < 0;
print @L[($wh ? $s : $s + 1) .. $e-1];
PL
echo "=== 3. the quotes"
QO=$(perl "$T/qc.pl" "$W" "$RP") || fail "a quoted block is not in its source, or has no Source line"
echo "$QO"; QN=$(echo "$QO" | sed -n "s/^quote check: \([0-9]*\) blocks.*/\1/p")
echo "=== 4. section 7: every log and script by SHA-256"
perl "$T/sec.pl" "$RP" 7 > "$T/s7" && test -s "$T/s7" || { grep -n -E "^[[:space:]]*([#*_]|[0-9])" "$RP" | cut -c1-90 | head -80; die "section 7 was not found by its heading; send this output to the drafting assistant"; }
perl -ne "my \$l = \$_; \$l =~ s/\x60//g; \$l =~ s/\*\*//g; my @h = (\$l =~ /\b([0-9a-f]{64})\b/g); my @f = (\$l =~ m{(?<![\w/])(?:logs|scratch)/[A-Za-z0-9][A-Za-z0-9._-]*}g); if (\$l =~ m{(?<![\w/])(logs|scratch)/([A-Za-z0-9][A-Za-z0-9._-]*)} || \$l =~ /[0-9a-f]{40,}/) { my (\$d, \$f) = (\$1, \$2); if (@h == 1 && @f == 1 && defined \$f) { print \"OK \$d/\$f \$h[0]\n\" } else { \$l =~ s/\s+\z//; print \"BAD \$l\n\" } }" "$T/s7" > "$T/s7p"
grep "^BAD " "$T/s7p" | sed "s/^BAD /  not a listing of one file with one 64-character SHA-256: /" | cut -c1-200
grep -q "^BAD " "$T/s7p" && fail "section 7 has a line that does not pair one file with one 64-character SHA-256"
grep "^OK " "$T/s7p" | cut -d" " -f2,3 | sort -u > "$T/listed"
for d in logs scratch; do for f in $(cd "$W/$d" && find . -mindepth 1 -maxdepth 1 -type f ! -name ".*" | sed "s|^\./||" | LC_ALL=C sort); do grep -q "^$d/$f " "$T/listed" || { echo "  NOT LISTED WITH A SHA-256: $d/$f, which is $(h256 "$W/$d/$f")"; fail "$d/$f is not listed with a SHA-256"; }; done; done
while read -r n x; do if [ ! -f "$W/$n" ]; then echo "  LISTED BUT MISSING: $n"; fail "$n is listed but missing"; elif [ "$(h256 "$W/$n")" != "$x" ]; then echo "  SHA-256 DIFFERS: $n is $(h256 "$W/$n"), listed $x"; fail "$n differs from its listed SHA-256"; fi; done < "$T/listed"
LN=$(grep -c "" "$T/listed"); echo "files listed with a 64-character SHA-256: $LN; files in logs/ and scratch/: $(( $(ls -1 "$W/logs" | wc -l) + $(ls -1 "$W/scratch" | wc -l) ))"
echo "re-read logs by name (compact, reread, re-read): $(ls -1 "$W/logs" | grep -c -i -e compact -e reread -e re-read || true)"
for f in $(ls -1 "$W/logs" | grep -i -e compact -e reread -e re-read || true); do grep -q "$PX" "$W/logs/$f" && echo "re-read log $f shows the prompt SHA-256" || fail "re-read log $f does not show the prompt SHA-256"; done
echo "=== 5. no token or key in the report"
TK=$(grep -cE "gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{20,}|sk-ant-[A-Za-z0-9_-]{20,}|sk-cp-[A-Za-z0-9_-]{16,}|sk-[A-Za-z0-9]{32,}|AKIA[0-9A-Z]{16}|xox[abprs]-[A-Za-z0-9-]{10,}|(^|[^A-Za-z0-9_])sk-[A-Za-z0-9_.-]{8,}" "$RP" || true)
echo "token-shaped lines: $TK"; test "$TK" = 0 || fail "the report has a token-shaped line"
echo "=== 6. what the report states (sections 1 to 3)"
grep -c "$H" "$RP" | sed "s/^/lines naming the head $H: /"
perl "$T/sec.pl" "$RP" 2 > "$T/s2" && perl "$T/sec.pl" "$RP" 3 > "$T/s3" || { grep -n -E "^[[:space:]]*([#*_]|[0-9])" "$RP" | cut -c1-90 | head -80; die "section 2 or 3 was not found by its heading; send this output to the drafting assistant"; }
for k in 1 4 5 6 8 9; do perl "$T/sec.pl" "$RP" $k > /dev/null || fail "section $k was not found by its heading"; done
perl "$T/sec.pl" "$RP" 2 h > "$T/s2h"
grep -i -E "^[^A-Za-z]*(overall[[:space:]]+)?verdict" "$T/s2h" | cut -c1-140
V1=$(grep -v -E "PASS, FAIL|FAIL or INCONCLUSIVE" "$T/s2h" | grep -i -o -E "^[^A-Za-z]*(overall[[:space:]]+)?verdict[[:punct:][:space:]]*(PASS|FAIL|INCONCLUSIVE)" | grep -o -E "(PASS|FAIL|INCONCLUSIVE)$")
V2=$(perl -ne "next unless /\S/; s/[*_\x60#>.:\s]//g; print \"\$_\n\" if /^(PASS|FAIL|INCONCLUSIVE)\z/; last" "$T/s2")
test -n "$V2" && echo "first line of section 2: $V2"
V=$(printf "%s\n%s\n" "$V1" "$V2" | grep -E "^(PASS|FAIL|INCONCLUSIVE)$" | sort -u | tr "\n" " ")
echo "overall verdict as stated: $V"
case "$V" in "PASS "|"FAIL "|"INCONCLUSIVE ") ;; *) fail "section 2 does not state one overall verdict";; esac
perl -0777 -ne "print \"\$1 \$2\n\" while /Item[*_\s]+(\d+)[*_\s]*\([^)]*\)[*_:\s\x60]*(PASS|FAIL|INCONCLUSIVE)\b/g" "$T/s2" > "$T/items"
echo "items: $(tr "\n" " " < "$T/items")"
IOK=0; test "$(cut -d" " -f1 "$T/items" | sort -n | tr "\n" " ")" = "1 2 3 4 5 6 7 8 9 " && IOK=1 || fail "section 2 does not give items 1 to 9 each once with PASS, FAIL or INCONCLUSIVE"
NS=$(grep -c -E "Classification[[:punct:][:space:]]*SUBSTANTIVE" "$T/s3" || true); NA=$(grep -c -E "Classification[[:punct:][:space:]]*ADVISORY" "$T/s3" || true); NN=$(grep -c -E "Classification[[:punct:][:space:]]*NOT COUNTING" "$T/s3" || true)
NH=$(grep -c -E "^[^A-Za-z]*Finding[[:space:]]+[0-9]+" "$T/s3" || true)
echo "findings by classification: SUBSTANTIVE $NS, ADVISORY $NA, NOT COUNTING $NN; findings headed Finding and a number: $NH"
if [ "$NH" = 0 ] && grep -q -i -E "^[^A-Za-z]*none[^A-Za-z]*$" "$T/s3"; then echo "section 3 says none"; else test "$NH" -gt 0 && test $((NS + NA + NN)) = "$NH" || fail "section 3 does not give one classification for each finding"; fi
NF=$(grep -c " FAIL$" "$T/items" || true); NI=$(grep -c " INCONCLUSIVE$" "$T/items" || true)
if [ "$IOK" != 1 ]; then echo "verdict consistency not checked, as the items did not parse"; elif [ "$NS" -gt 0 ] || [ "$NF" -gt 0 ]; then test "$V" = "FAIL " || fail "an item fails or a finding is SUBSTANTIVE, but the overall verdict is not FAIL"; elif [ "$NI" -gt 0 ]; then test "$V" = "INCONCLUSIVE " || fail "an item is INCONCLUSIVE, but the overall verdict is not INCONCLUSIVE"; else test "$V" = "PASS " || fail "every item passes and no finding is SUBSTANTIVE, but the overall verdict is not PASS"; fi
FI=$(grep " FAIL$" "$T/items" | cut -d" " -f1 | tr "\n" " ")
CL=$(grep -o -E "Classification[[:punct:][:space:]]*(SUBSTANTIVE|ADVISORY|NOT COUNTING)" "$T/s3" | grep -o -E "(SUBSTANTIVE|ADVISORY|NOT COUNTING)$" | tr "\n" " ")
test -z "$FAILS" || die "the check failed$FAILS; nothing was posted"
echo "SECTION_2C_CHECK: PASSED on report $RX: $QN quoted blocks found, $LN files listed with a matching SHA-256"
echo "=== the verdict"
echo "classifications in order: $CL; failing items: $FI"
test "$V" = "PASS " && test "$CL" = "NOT COUNTING ADVISORY ADVISORY " && test -z "$FI" && test "$(grep -c " PASS$" "$T/items")" = 9 || die "the report is not PASS with items 1 to 9 passing, Finding 1 NOT COUNTING and Findings 2 and 3 ADVISORY; nothing was posted"
echo "VERDICT PASS: ITEMS 1 TO 9 PASS; FINDING 1 NOT COUNTING, FINDINGS 2 AND 3 ADVISORY; NO SUBSTANTIVE FINDING"
echo "=== GitHub"
G="env -u GH_TOKEN gh"; R=MADVenturesLLC/madventures-tui; N=254; TB=claude/awesome-cray-vqrzbt
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
test "$($G api repos/$R/pulls/$N --jq "[.state,(.draft|tostring),.head.sha,.base.ref]|join(\" \")")" = "open true $H main" || die "pull request $N is not an open draft at $H against main"
test "$($G api -H "Accept: application/vnd.github.raw" "repos/$R/contents/transfer/$PF?ref=$TB" | shasum -a 256 | cut -c1-64)" = $PX || die "the review prompt on the transfer branch is not $PX"
echo "pull request $N: open draft at $H against main; main is $($G api repos/$R/commits/main --jq .sha); the review prompt on the transfer branch matches"
EV=$($G api --paginate "repos/$R/issues/$N/comments?per_page=100" --jq ".[]|(.body // \"\") as \$b|select(\$b|startswith(\"TIER-2 REVIEW VERDICT\"))|.id") || die "could not list the comments on pull request $N; nothing was posted"
test "$(echo $EV)" = "7152608903 7152609315" || die "the review verdicts on pull request $N are not exactly the first review, comments 7152608903 and 7152609315 (found: $(echo $EV)); nothing was posted"
EX=$($G api --paginate "repos/$R/issues/$N/comments?per_page=100" --jq ".[]|(.body // \"\") as \$b|select(\$b|contains(\"Head reviewed: $H\"))|.id") || die "could not list the comments on pull request $N; nothing was posted"
test -z "$EX" || die "a review verdict for $H is already posted on pull request $N (comment $(echo $EX)); nothing was posted"
echo "earlier verdicts on pull request $N: the first review only, comments 7152608903 and 7152609315; none yet for $H"
cat > "$T/split.pl" <<"PL"
use strict; use warnings;
my ($rp, $dir, $max) = @ARGV;
open(my $fh, "<", $rp) or die "cannot read report\n"; my @L = <$fh>; close $fh;
my (@u, @uh); my $cur = ""; my $curh = 1; my $in = "";
for my $l (@L) {
  if ($in eq "") {
    if ($l =~ /^ {0,3}#{1,6} /) { if (length($cur)) { push @u, $cur; push @uh, $curh; $cur = ""; } $curh = 1; }
    elsif ($l =~ /^[ \t]*(`{3,}|~{3,})/) { $in = $1; }
  } elsif ($l =~ /^[ \t]*(`{3,}|~{3,})[ \t]*\r?$/ && substr($1, 0, 1) eq substr($in, 0, 1) && length($1) >= length($in)) { $in = ""; $cur .= $l; next; }
  $cur .= $l;
  if ($in eq "" && $l =~ /^\s*$/) { push @u, $cur; push @uh, $curh; $cur = ""; $curh = 0; }
}
if (length($cur)) { push @u, $cur; push @uh, $curh; }
my (@secs, @cs);
for my $k (0 .. $#u) { if ($uh[$k] && @cs) { push @secs, [@cs]; @cs = (); } push @cs, $u[$k]; }
push @secs, [@cs] if @cs;
my @parts; my $p = "";
for my $s (@secs) {
  my $t = join("", @$s);
  if (length($p) + length($t) <= $max) { $p .= $t; next; }
  if (length($t) <= $max) { push @parts, $p if length($p); $p = $t; next; }
  for my $x (@$s) { die "a paragraph is longer than one comment\n" if length($x) > $max; if (length($p) + length($x) > $max) { push @parts, $p if length($p); $p = ""; } $p .= $x; }
}
push @parts, $p if length($p);
for my $i (0 .. $#parts) { open(my $o, ">", "$dir/part" . ($i + 1)) or die "cannot write\n"; print $o $parts[$i]; close $o; }
print scalar(@parts), "\n";
PL
NP=$(perl "$T/split.pl" "$RP" "$T" 56000) || die "the report could not be split; nothing was posted"
PARTS=""; for i in $(seq 1 $NP); do PARTS="$PARTS $T/part$i"; done
cat $PARTS | cmp -s - "$RP" || die "the parts do not join to the report; nothing was posted"
TOT=$(grep -c "" "$RP"); BYT=$(wc -c < "$RP" | tr -d " ")
NOTE="Tier-2 review of the first correction round of Phase 3B slice M1 under DEC-20261123-01 B15 and B25 and its Addendum 3 B8, at the exact head, from the review prompt with SHA-256 $PX (transfer/$PF on branch $TB of $R), run in Antigravity on the MacBook of the Founder. The first review, at 4630152f763baca0259d84c0d5817d0cea501145, was FAIL and is posted in comments 7152608903 and 7152609315. The check of Phase 3B plan section 2C that the Founder ran on the MacBook passed on this report, the first the reviewer of this round saved: each of its $QN quoted blocks is in the log, script, evidence file, prompt text or repository lines it names; each of the $LN files in the reviewer log and scratch folders is listed with a matching SHA-256; the review clone is at the head and clean; and the prompt, the description and the five evidence folders are unchanged. The report gives PASS on items 1 to 9, with Finding 1 classified NOT COUNTING and Findings 2 and 3 ADVISORY, and no SUBSTANTIVE finding. Under DEC-20261123-01 B25 a posted PASS at the exact head, after this check, lets this pull request be marked ready; it merges only by the merge authorization of the Founder naming its exact head and every review and review comment on it."
for i in $(seq 1 $NP); do test $(( $(wc -c < "$T/part$i") + ${#NOTE} + 1200 )) -le 65000 || die "part $i is too long for one comment; nothing was posted"; done
echo "the report: $TOT lines, $BYT bytes, in $NP part(s); CHECKS_OK: posting as decivantiq"
C=""; START=1
for i in $(seq 1 $NP); do
  PT="$T/part$i"; PH=$(h256 "$PT"); PL=$(grep -c "" "$PT")
  if [ $i = 1 ]; then
    { printf "TIER-2 REVIEW VERDICT: MADVenturesLLC/madventures-tui#%s (part 1 of %s)\n\n" $N $NP
      printf "Reviewer id: antigravity\nHead reviewed: %s\nVerdict: PASS, no SUBSTANTIVE finding, one NOT COUNTING and two ADVISORY findings\n" $H
      printf "Report SHA-256: %s (%s lines, %s bytes), as saved on the MacBook of the Founder at %s\n" $RX $TOT $BYT "$RP"
      printf "%s\n" "$NOTE"
      if [ $NP = 1 ]; then printf "The report is posted verbatim below in one part, lines 1 to %s, SHA-256 %s.\n\n" $((START+PL-1)) $PH; else printf "The report is posted verbatim in %s parts, split between sections or paragraphs and outside quoted blocks. This part holds lines 1 to %s, SHA-256 %s. The parts joined in order are the report byte for byte.\n\n" $NP $((START+PL-1)) $PH; fi; } > "$T/h$i"
  else
    { printf "TIER-2 REVIEW VERDICT, CONTINUED: MADVenturesLLC/madventures-tui#%s (part %s of %s)\n\n" $N $i $NP
      printf "Head reviewed: %s\nReport SHA-256: %s. Continues comment %s from line %s of the report, to line %s; this part SHA-256 %s.\n\n" $H $RX $C $START $((START+PL-1)) $PH; } > "$T/h$i"
  fi
  cat "$T/h$i" "$PT" > "$T/b$i"
  START=$((START+PL))
  C=$($G api repos/$R/issues/$N/comments -F body=@"$T/b$i" --jq .id) || die "posting part $i reported a failure; check pull request $N, do not run this again, and send this output to the drafting assistant"
  echo "POSTED part $i: $C"; eval "C$i=$C"
done
OKV=1
for i in $(seq 1 $NP); do
  eval "CI=\$C$i"; HL=$(grep -c "" "$T/h$i")
  $G api repos/$R/issues/comments/$CI --jq .body | tail -n +$((HL + 1)) > "$T/g$i"
  perl -0777 -e "open(A, \"<\", \$ARGV[0]); open(B, \"<\", \$ARGV[1]); my \$a = <A>; my \$b = <B>; \$a =~ s/\s+\z//; \$b =~ s/\s+\z//; exit(\$a eq \$b ? 0 : 1)" "$T/g$i" "$T/part$i" || { echo "MISMATCH: comment $CI differs from part $i"; OKV=0; }
done
[ $OKV = 1 ] || die "POSTED BUT NOT VERIFIED on pull request $N: $(for i in $(seq 1 $NP); do eval "printf \"%s \" \$C$i"; done); do not run this again; send this output to the drafting assistant"
echo "VERIFIED: each posted part equals its part of the report"
echo "VERDICT POSTED on pull request $N: $(for i in $(seq 1 $NP); do eval "printf \"%s \" \$C$i"; done); the pull request is still a draft, and marking it ready is the next command; paste this whole output to the drafting assistant"
' || echo STOPPED
