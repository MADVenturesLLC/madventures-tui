cd ~ && bash -c '
RX0=c58d5779ee3251e0c2efd745dfe47adccf94628f069d0efdd9cbe8b32075fee4
die() { echo "STOP: $1"; exit 1; }
h256() { shasum -a 256 "$1" | cut -c1-64; }
echo "=== admission build Tier-2 review: the check of Phase 3B plan section 2C on the corrected report, then the verdict posted on pull request 252, version 1 (bash $BASH_VERSION)"
W=/Users/michaeldaley/builds/review-m0-admission-r1; RP=/Users/michaeldaley/builds/review-m0-admission-r1.md
H=68d78a60338d9ff27ffab7b275aa3395e2a1c9bd; PF=review-prompt-m0-admission-antigravity-r1.md
PX=b5ae6dffc2459bfa03c45a622eccb7fd325aa4c729cf7429ade27105b874e30c; R1=17287543e21c8e51e48bce7cd298548a6cc0c7998a8442606be35016dbcb9073
RK=/Users/michaeldaley/builds/review-m0-admission-r1.report-1-17287543.md; M=founder-message-1-m0-admission-report.md; XM=086fa7a7cbdd4bfab99c38020e4ca647221d41504090e64efe3edcc6a319e5c3
test "$(uname -s)" = Darwin || die "run this on the MacBook"
test -z "${CLAUDECODE:-}" || die "run this in a plain terminal, not inside an agent session"
command -v jq >/dev/null || die "jq not found"
test -f "$RP" && test -d "$W" || die "no report at $RP or no folder at $W"
command -v perl >/dev/null || die "perl not found"
FAILS=""
fail() { echo "FAILED: $1"; FAILS="$FAILS; $1"; }
echo "=== 1. the report"
RX=$(h256 "$RP")
echo "report $RX, $(grep -c "" "$RP") lines, $(wc -c < "$RP" | tr -d " ") bytes"
test "$RX" = "$RX0" && echo "it is the SHA-256 the reviewer printed" || fail "the report is not the $RX0 the reviewer printed"
test "$RX" != $R1 || fail "the report is still the first report 17287543"
test -f "$RK" && test "$(h256 "$RK")" = $R1 && echo "the first report is kept unchanged at $RK" || fail "the first report is not kept unchanged at $RK"
grep -q "$XM" "$RP" && echo "the report names Founder message 1 by its SHA-256" || fail "the report does not name Founder message 1 by its SHA-256 $XM"
echo "=== 2. the folder the reviewer read"
test "$(git -C "$W/repo" rev-parse HEAD)" = $H && echo "repo/ at $H" || fail "repo/ is not at $H"
test -z "$(git -C "$W/repo" status --porcelain)" && echo "repo/ clean" || fail "repo/ is not clean: the reviewer left a change"
(cd "$W/prompt" && shasum -a 256 -c --status SHA256.txt) && test "$(h256 "$W/prompt/$PF")" = $PX && echo "prompt/: every text, the description and the six E manifests unchanged; the review prompt is $PX" || fail "prompt/ does not match its SHA256.txt, or the review prompt is not $PX"
(cd "$W/E1" && shasum -a 256 -c --status builder-files.sha256) && echo "E1 unchanged" || fail "E1 does not match builder-files.sha256"
(cd "$W/E2" && shasum -a 256 -c --status SHA256.txt) && echo "E2 unchanged" || fail "E2 does not match its SHA256.txt"
(cd "$W/E3/logs" && shasum -a 256 -c --status ../MANIFEST.sha256) && echo "E3 unchanged" || fail "E3 does not match its manifest"
(cd "$W/E4/logs" && shasum -a 256 -c --status ../MANIFEST.sha256) && echo "E4 unchanged" || fail "E4 does not match its manifest"
(cd "$W/E5/phase1" && shasum -a 256 -c --status MANIFEST.sha256) && (cd "$W/E5/phase2" && shasum -a 256 -c --status MANIFEST.sha256) && echo "E5 unchanged" || fail "E5 does not match its manifests"
(cd "$W/founder" && shasum -a 256 -c --status SHA256.txt) && test "$(h256 "$W/founder/$M")" = $XM && echo "founder/: Founder message 1 unchanged, $XM" || fail "founder/ does not match, or the message is not $XM"
NL=$(for f in "$W"/logs/*; do test "$f" -nt "$RK" && grep -l "$M: OK" "$f"; done)
test -n "$NL" && echo "made after the first report, records the check of the message ($M: OK): $(echo $NL | sed "s|[^ ]*/||g")" || fail "no log made after the first report records $M: OK"
test -z "$(find "$W/logs" "$W/scratch" -mindepth 1 ! -type f)" || fail "logs/ or scratch/ holds something other than files"
echo "logs/: $(ls -1 "$W/logs" | wc -l | tr -d " ") files; scratch/: $(ls -1 "$W/scratch" | wc -l | tr -d " ") files"
T=$(mktemp -d)
cat > "$T/qc.pl" <<"PL"
use strict; use warnings;
my ($root, $report) = @ARGV;
open(my $fh, "<", $report) or die "cannot read report\n"; my @L = <$fh>; close $fh;
my ($ok, $bad, $unsourced) = (0, 0, 0); my @fails;
sub slurp { my $p = shift; open(my $h, "<", $p) or return undef; local $/; my $t = <$h>; close $h; $t .= "\n" if length($t) && substr($t, -1) ne "\n"; return $t; }
sub trimt { my $s = shift; $s =~ s/[ \t]+\n/\n/g; return $s; }
for (my $i = 0; $i < @L; $i++) {
  next unless $L[$i] =~ /^([ \t]*)(`{3,}|~{3,})/;
  my ($ind, $fence) = (length($1), $2); my $ch = substr($fence, 0, 1); my $n = length($fence);
  my $open = $i; my $j = $i + 1;
  while ($j < @L) { if ($L[$j] =~ /^[ \t]*(`{3,}|~{3,})[ \t]*\r?$/ && substr($1, 0, 1) eq $ch && length($1) >= $n) { last } $j++ }
  my @c = @L[$open+1 .. $j-1];
  if ($ind > 0) { for (@c) { my $k = 0; $k++ while $k < $ind && substr($_, $k, 1) eq " "; $_ = substr($_, $k); } }
  my $content = join("", @c);
  my $src = ($open > 0 && $L[$open-1] =~ /^\s*Source: (\S+)\s*$/) ? $1 : undef;
  my $where = "report line " . ($open + 1);
  $i = $j;
  if (!defined $src) { $unsourced++; push @fails, "$where: fenced block with no Source line directly above it"; next; }
  if ($src =~ /\.\./ || $src !~ m{^(logs|scratch|E1|E2|E3|E4|E5|prompt|repo)/}) { $bad++; push @fails, "$where: source not allowed: $src"; next; }
  if ($src =~ m{^repo/(.+):(\d+)-(\d+)$}) {
    my ($p, $a, $b) = ($1, $2, $3); my $t = slurp("$root/repo/$p");
    if (!defined $t) { $bad++; push @fails, "$where: no such file repo/$p"; next; }
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
my ($report, $n) = @ARGV;
my %kw = (1 => "Identity", 2 => "Verdict", 3 => "Findings", 4 => "What you executed", 5 => "The mutations", 6 => "The checks", 7 => "Every log", 8 => "Anything", 9 => "Disagreements");
sub head { my ($l, $k) = @_; return 0 unless $l =~ /^\s*(?:#+\s*)?(?:\*\*)?\s*(\d+)[.)]\s*(?:\*\*)?\s*(.*)/; return ($1 == $k && index(lc($2), lc($kw{$k})) == 0) ? 1 : 0; }
open(my $fh, "<", $report) or die "cannot read report\n"; my @L = <$fh>; close $fh;
my ($s, $e) = (-1, scalar(@L));
for my $i (0 .. $#L) { if ($s < 0) { $s = $i if head($L[$i], $n); } elsif ($n < 9 && head($L[$i], $n + 1)) { $e = $i; last; } }
exit 1 if $s < 0;
print @L[$s+1 .. $e-1];
PL
echo "=== 3. the quotes"
QO=$(perl "$T/qc.pl" "$W" "$RP") || fail "a quoted block is not in its source, or has no Source line"
echo "$QO"; QN=$(echo "$QO" | sed -n "s/^quote check: \([0-9]*\) blocks.*/\1/p")
echo "=== 4. section 7: every log and script by SHA-256"
perl "$T/sec.pl" "$RP" 7 > "$T/s7" && test -s "$T/s7" || { grep -n -E "^[#*]" "$RP" | cut -c1-90; die "section 7 was not found by its heading; send this output to the drafting assistant"; }
perl -ne "my \$l = \$_; \$l =~ s/[\x60*]//g; my @h = (\$l =~ /\b([0-9a-f]{64})\b/g); if (\$l =~ m{\b(logs|scratch)/([A-Za-z0-9._-]+)} || \$l =~ /[0-9a-f]{40,}/) { my (\$d, \$f) = (\$1, \$2); if (@h == 1 && defined \$f) { print \"OK \$d/\$f \$h[0]\n\" } else { \$l =~ s/\s+\z//; print \"BAD \$l\n\" } }" "$T/s7" > "$T/s7p"
grep "^BAD " "$T/s7p" | sed "s/^BAD /  not a listing of one file with one 64-character SHA-256: /" | cut -c1-200
grep -q "^BAD " "$T/s7p" && fail "section 7 has a line that does not pair one file with one 64-character SHA-256"
grep "^OK " "$T/s7p" | cut -d" " -f2,3 | sort -u > "$T/listed"
for d in logs scratch; do for f in $(ls -1 "$W/$d"); do grep -q "^$d/$f " "$T/listed" || { echo "  NOT LISTED WITH A SHA-256: $d/$f, which is $(h256 "$W/$d/$f")"; fail "$d/$f is not listed with a SHA-256"; }; done; done
while read -r n x; do if [ ! -f "$W/$n" ]; then echo "  LISTED BUT MISSING: $n"; fail "$n is listed but missing"; elif [ "$(h256 "$W/$n")" != "$x" ]; then echo "  SHA-256 DIFFERS: $n is $(h256 "$W/$n"), listed $x"; fail "$n differs from its listed SHA-256"; fi; done < "$T/listed"
LN=$(grep -c "" "$T/listed"); echo "files listed with a 64-character SHA-256: $LN; files in logs/ and scratch/: $(( $(ls -1 "$W/logs" | wc -l) + $(ls -1 "$W/scratch" | wc -l) ))"
for f in $(ls -1 "$W/logs" | grep -i -e compact -e reread -e re-read || true); do grep -q "$PX" "$W/logs/$f" && echo "re-read log $f shows the prompt SHA-256" || fail "re-read log $f does not show the prompt SHA-256"; done
echo "=== 5. no token or key in the report"
TK=$(grep -cE "gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{20,}|sk-ant-[A-Za-z0-9_-]{20,}|sk-cp-[A-Za-z0-9_-]{16,}|sk-[A-Za-z0-9]{32,}|AKIA[0-9A-Z]{16}|xox[abprs]-[A-Za-z0-9-]{10,}" "$RP" || true)
echo "token-shaped lines: $TK"; test "$TK" = 0 || fail "the report has a token-shaped line"
echo "=== 6. what the report states (sections 1 to 3)"
grep -c "$H" "$RP" | sed "s/^/lines naming the head $H: /"
perl "$T/sec.pl" "$RP" 2 > "$T/s2" && perl "$T/sec.pl" "$RP" 3 > "$T/s3" || { grep -n -E "^[#*]" "$RP" | cut -c1-90; die "section 2 or 3 was not found by its heading; send this output to the drafting assistant"; }
grep -i -E "^[^A-Za-z]*verdict" "$T/s2" | cut -c1-110
perl -ne "print \"\$1 \$2\n\" if /Item\s+(\d+)\s*\([^)]*\)[*_:\s]*(PASS|FAIL|INCONCLUSIVE)\b/" "$T/s2" > "$T/items"
echo "items: $(tr "\n" " " < "$T/items")"
test "$(grep -c " PASS$" "$T/items")" = 13 && test "$(cut -d" " -f1 "$T/items" | sort -n | tr "\n" " ")" = "1 2 3 4 5 6 7 8 9 10 11 12 13 " || fail "section 2 does not give items 1 to 13 each PASS once"
grep -q -i -E "^[^A-Za-z]*verdict[*_:[:space:]]*PASS" "$T/s2" && ! grep -q -i -E "^[^A-Za-z]*verdict[*_:[:space:]]*(FAIL|INCONCLUSIVE)" "$T/s2" || fail "section 2 does not open with an overall PASS"
perl -ne "print \"\$2\n\" if /^\s*(?:[-*]\s*)?(?:\*\*)?(\d+)[.)]\s*(?:\*\*)?\s*(SUBSTANTIVE|ADVISORY|NOT COUNTING)\b/" "$T/s3" > "$T/finds"
NA=$(grep -c "^ADVISORY$" "$T/finds" || true); NO=$(grep -c -v "^ADVISORY$" "$T/finds" || true)
echo "findings: $NA ADVISORY, $NO SUBSTANTIVE or NOT COUNTING"
grep -E "^[[:space:]]*(\*\*)?[0-9]+[.)]" "$T/s3" | cut -c1-140
test "$NA" = 3 && test "$NO" = 0 || fail "section 3 does not hold exactly the three ADVISORY findings"
echo "=== 7. the changes from the first report"
DH=$(diff "$RK" "$RP" | grep -E "^[0-9]" | tr "\n" " "); echo "changed at: $DH"
test "$DH" = "65a66,70 322c327 421c426,427 425c431 " || fail "the changes from the first report are not the ones the Founder compared"
test -z "$FAILS" || die "the check failed$FAILS; nothing was posted"
echo "SECTION_2C_CHECK: PASSED on report $RX: $QN quoted blocks found, $LN files listed with a matching SHA-256"
echo "=== GitHub"
G="env -u GH_TOKEN gh"; R=MADVenturesLLC/madventures-tui; N=252; TB=claude/awesome-cray-vqrzbt; F=review-prompt-m0-admission-antigravity-r1.md
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
test "$($G api repos/$R/pulls/$N --jq "[.state,(.draft|tostring),.head.sha,.base.ref]|join(\" \")")" = "open true $H main" || die "pull request $N is not an open draft at $H against main"
test "$($G api -H "Accept: application/vnd.github.raw" "repos/$R/contents/transfer/$F?ref=$TB" | shasum -a 256 | cut -c1-64)" = $PX || die "the review prompt on the transfer branch is not $PX"
test "$($G api -H "Accept: application/vnd.github.raw" "repos/$R/contents/transfer/$M?ref=$TB" | shasum -a 256 | cut -c1-64)" = $XM || die "Founder message 1 on the transfer branch is not $XM"
echo "pull request $N: open draft at $H against main; main is $($G api repos/$R/commits/main --jq .sha); the review prompt and Founder message 1 on the transfer branch match"
test "$($G api "repos/$R/issues/$N/comments?per_page=100" --jq "[.[]|select(.body|startswith(\"TIER-2 REVIEW VERDICT\"))]|length")" = 0 || die "a review verdict is already posted on pull request $N"
cat > "$T/split.pl" <<"PL"
use strict; use warnings;
my ($rp, $dir, $max) = @ARGV;
open(my $fh, "<", $rp) or die "cannot read report\n"; my @L = <$fh>; close $fh;
my (@seg, $cur, $in); $cur = ""; $in = "";
for my $l (@L) {
  if ($in eq "") {
    if ($l =~ /^#{2,3} / && length($cur)) { push @seg, $cur; $cur = ""; }
    elsif ($l =~ /^[ \t]*(`{3,}|~{3,})/) { $in = $1; }
  } elsif ($l =~ /^[ \t]*(`{3,}|~{3,})[ \t]*\r?$/ && substr($1, 0, 1) eq substr($in, 0, 1) && length($1) >= length($in)) { $in = ""; }
  $cur .= $l;
}
push @seg, $cur if length($cur);
my @parts; my $p = "";
for my $s (@seg) { die "a section is longer than one comment\n" if length($s) > $max; if (length($p) && length($p) + length($s) > $max) { push @parts, $p; $p = ""; } $p .= $s; }
push @parts, $p if length($p);
for my $i (0 .. $#parts) { open(my $o, ">", "$dir/part" . ($i + 1)) or die "cannot write\n"; print $o $parts[$i]; close $o; }
print scalar(@parts), "\n";
PL
NP=$(perl "$T/split.pl" "$RP" "$T" 56000) || die "the report could not be split at its headings"
PARTS=""; for i in $(seq 1 $NP); do PARTS="$PARTS $T/part$i"; done
cat $PARTS | cmp -s - "$RP" || die "the parts do not join to the report"
TOT=$(grep -c "" "$RP"); BYT=$(wc -c < "$RP" | tr -d " ")
NOTE="Tier-2 review of the admission build of madv-surface 0.1.2 under DEC-20261121-02 B1 item 3 and B11, at the exact head, from the review prompt with SHA-256 $PX (transfer/$F on branch $TB of $R), run in Antigravity on the MacBook of the Founder with a Gemini model the report shows as Gemini 4 Hydrogen (Medium). The check of Phase 3B plan section 2C that the Founder ran on the MacBook failed on the first report the reviewer saved, SHA-256 $R1, on three points: one quoted block was not in the log it named, one line of section 7 did not hold a 64-character SHA-256, and the SHA-256 section 7 listed for one log was not the SHA-256 of that log. That report was not posted and is not a verdict. Founder message 1, SHA-256 $XM (transfer/$M on the same branch), named those three points to the same session without stating any value. The reviewer corrected them, recorded the message and its changes in section 4, and changed nothing else, as the comparison of the two reports shows: the object id on the index line of that block, the two values of section 7 and the line of its new log. The check passed on this corrected report: each of its $QN quoted blocks is in the log, script, evidence file, prompt text or repository lines it names; each of the $LN files of the reviewer log and scratch folders is listed with a matching SHA-256; the review clone is at the head and clean; and the prompt, the description, the texts, the five evidence folders and the message are unchanged. The report gives PASS, with items 1 to 13 PASS, three ADVISORY findings and no SUBSTANTIVE or NOT COUNTING finding. The Founder also records, from the times of the log files of the reviewer, that logs 008 to 017, among them its four Bun check scripts, were started while its own bare bun test of log 006 was still running, a run that item 8 calls foreground, and that its thirteen mutations and three attempts ran through one script under one load reading; no result turned on either. These, the three ADVISORY findings, the first report and Founder message 1 are for the records act of DEC-20261121-02. Under DEC-20261121-02 B1 item 4 this verdict counts under rubric milestones 1 and 3, in the count of the admission build. This posted PASS at the exact head is what lets the pull request be marked ready under B11. It is not a merge authorization. The Founder checks of the builder session record are transfer/m0-adm/phase1/record-check-phase1.txt and transfer/m0-adm/phase2/record-check-phase2.txt on the same branch."
C=""; START=1
for i in $(seq 1 $NP); do
  PF="$T/part$i"; PH=$(h256 "$PF"); PL=$(grep -c "" "$PF")
  if [ $i = 1 ]; then
    { printf "TIER-2 REVIEW VERDICT, ROUND 1: MADVenturesLLC/madventures-tui#%s (part 1 of %s)\n\n" $N $NP
      printf "Reviewer id: antigravity\nReview round: 1\nHead reviewed: %s\nVerdict: PASS; three ADVISORY findings, no SUBSTANTIVE finding\n" $H
      printf "Report SHA-256: %s (%s lines, %s bytes), as saved on the MacBook of the Founder at %s after Founder message 1\n" $RX $TOT $BYT "$RP"
      printf "%s\n" "$NOTE"
      if [ $NP = 1 ]; then printf "The report is posted verbatim below in one part, lines 1 to %s, SHA-256 %s.\n\n" $((START+PL-1)) $PH; else printf "The report is posted verbatim in %s parts, split before headings. This part holds lines 1 to %s, SHA-256 %s. The parts joined in order are the report byte for byte.\n\n" $NP $((START+PL-1)) $PH; fi
      cat "$PF"; } > "$T/b$i"
  else
    { printf "TIER-2 REVIEW VERDICT, CONTINUED: MADVenturesLLC/madventures-tui#%s (part %s of %s)\n\n" $N $i $NP
      printf "Head reviewed: %s\nReport SHA-256: %s. Continues comment %s from line %s of the report; this part SHA-256 %s.\n\n" $H $RX $C $START $PH
      cat "$PF"; } > "$T/b$i"
  fi
  test $(wc -c < "$T/b$i") -le 60000 || die "part $i is too long for one comment"
  START=$((START+PL))
  [ $i = 1 ] && echo "CHECKS_OK: posting $NP part(s) as decivantiq"
  C=$($G api repos/$R/issues/$N/comments -F body=@"$T/b$i" --jq .id); echo "POSTED part $i: $C"
  eval "C$i=$C"
done
OKV=1
for i in $(seq 1 $NP); do
  eval "CI=\$C$i"; if [ $i = 1 ]; then SK=11; else SK=6; fi
  $G api repos/$R/issues/comments/$CI --jq .body | tail -n +$SK > "$T/g$i"
  perl -0777 -e "open(A, \"<\", \$ARGV[0]); open(B, \"<\", \$ARGV[1]); my \$a = <A>; my \$b = <B>; \$a =~ s/\n*\z//; \$b =~ s/\n*\z//; exit(\$a eq \$b ? 0 : 1)" "$T/g$i" "$T/part$i" || { echo "MISMATCH: comment $CI differs from part $i"; OKV=0; }
done
rm -rf "$T"
[ $OKV = 1 ] && echo "VERIFIED: each posted part equals its part of the report" || echo "SEND THIS OUTPUT TO THE DRAFTING ASSISTANT"
echo "VERDICT POSTED on pull request $N: $(for i in $(seq 1 $NP); do eval "printf \"%s \" \$C$i"; done); paste this whole output to the drafting assistant"
' || echo STOPPED
