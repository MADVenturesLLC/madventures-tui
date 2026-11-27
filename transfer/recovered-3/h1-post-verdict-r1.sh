bash -ec '
die() { echo "STOP: $1"; exit 1; }
W=/Users/michaeldaley/builds/review-h1-r1; R1=/Users/michaeldaley/builds/review-h1-r1.md; RP=/Users/michaeldaley/builds/review-h1-r1-r2.md
H=8c7afeae7e3209be8033ad6315b4be313f907713; PX=47aa83bbb8427a340feaaafb6bab54cfba1cfacd78939e8f3c9b29164ae53653
h256() { shasum -a 256 "$1" | cut -c1-64; }
R=MADVenturesLLC/madventures-tui; N=234; G="env -u GH_TOKEN gh"
test "$(uname -s)" = Darwin || die "run this on the MacBook"
test -f "$RP" || die "no report at $RP yet"
test "$(h256 "$RP")" = 6a20836e8fd506720caaf17cffb86c32704fad3c4203a0e29e853c7d440fefed || die "the second report is not 6a20836e"
echo "REPORT $(h256 "$RP") lines=$(wc -l < "$RP" | tr -d " ") bytes=$(wc -c < "$RP" | tr -d " ")"
test "$(git -C "$W/repo" rev-parse HEAD)" = $H || die "review repo is not at $H"
FOLD=0
test "$(h256 "$R1")" = d625d2372a5d444e4983742d6ca4c950ac87c9f5bc0f003ce7d331da7b1553bf || die "the first report is no longer d625d237"
perl -e "open(A, \"<\", \$ARGV[0]) or die; open(B, \"<\", \$ARGV[1]) or die; my @a = <A>; my @b = <B>; if (@a != @b) { print \"FORMAT CHANGE CHECK: line counts differ, \".scalar(@a).\" and \".scalar(@b).\"\n\"; exit 1 } my (\$n, \$bad) = (0, 0); for my \$i (0 .. \$#a) { next if \$a[\$i] eq \$b[\$i]; if (\$a[\$i] =~ /^([ \t]*)\x60{3}/ && \$b[\$i] eq \$1.\"\x60\x60\".substr(\$a[\$i], length(\$1))) { \$n++ } else { \$bad++; print \"FORMAT CHANGE CHECK: line \".(\$i+1).\" changed beyond its fence\n\" } } print \"FORMAT CHANGE CHECK: \$n fence lines gained two backticks, \$bad other lines changed\n\"; exit((\$bad || !\$n) ? 1 : 0)" "$R1" "$RP" && echo "THE SECOND REPORT DIFFERS FROM d625d237 ONLY IN FENCE LINES" || { echo "THE SECOND REPORT CHANGES MORE THAN FENCES"; FOLD=1; }
test -z "$(git -C "$W/repo" status --porcelain)" && echo "REPO AT HEAD AND CLEAN" || { echo "REPO NOT CLEAN: the reviewer left a change"; FOLD=1; }
(cd "$W/prompt" && shasum -a 256 -c SHA256.txt > /dev/null) && echo "PROMPT, DESCRIPTION, ADDENDA AND E1, E2, E3 MANIFESTS UNCHANGED" || { echo "PROMPT FOLDER CHECK FAILED"; FOLD=1; }
(cd "$W/E1" && shasum -a 256 -c --status builder-files.sha256) && echo "E1 FILES UNCHANGED" || { echo "E1 CHECK FAILED"; FOLD=1; }
(cd "$W/E2/logs" && shasum -a 256 -c --status ../MANIFEST.sha256) && echo "E2 LOGS UNCHANGED" || { echo "E2 CHECK FAILED"; FOLD=1; }
(cd "$W/E3" && shasum -a 256 -c --status MANIFEST.sha256) && echo "E3 LOGS UNCHANGED" || { echo "E3 CHECK FAILED"; FOLD=1; }
T=$(mktemp -d)
cat > "$T/qc.pl" <<"PL"
use strict; use warnings;
my ($root, $report) = @ARGV;
open(my $fh, "<", $report) or die "cannot read report\n"; my @L = <$fh>; close $fh;
my ($ok, $bad, $unsourced) = (0, 0, 0); my @fails;
sub slurp { my $p = shift; open(my $h, "<", $p) or return undef; local $/; my $t = <$h>; close $h; $t .= "\n" if length($t) && substr($t, -1) ne "\n"; return $t; }
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
  if (!defined $src) { $unsourced++; push @fails, "$where: fenced block with no Source line"; next; }
  if ($src =~ /\.\./ || $src !~ m{^(logs|scratch|E1|E2|E3|prompt|repo)/}) { $bad++; push @fails, "$where: source not allowed: $src"; next; }
  if ($src =~ m{^repo/(.+):(\d+)-(\d+)$}) {
    my ($p, $a, $b) = ($1, $2, $3); my $t = slurp("$root/repo/$p");
    if (!defined $t) { $bad++; push @fails, "$where: no such file repo/$p"; next; }
    my @fl = split(/(?<=\n)/, $t);
    if ($a < 1 || $b < $a || $b > @fl) { $bad++; push @fails, "$where: lines $a-$b outside repo/$p"; next; }
    my $want = join("", @fl[$a-1 .. $b-1]);
    if ($want eq $content) { $ok++ } else { $bad++; push @fails, "$where: block differs from repo/$p lines $a-$b"; }
    next;
  }
  my $t = slurp("$root/$src");
  if (!defined $t) { $bad++; push @fails, "$where: no such file $src"; next; }
  if (index("\n" . $t, "\n" . $content) >= 0) { $ok++ } else { $bad++; push @fails, "$where: block not found in $src"; }
}
print "quote check: $ok blocks found in their sources, $bad not found, $unsourced without a Source line\n";
print "  $_\n" for @fails;
exit(($bad + $unsourced) ? 1 : 0);
PL
QOK=0; perl "$T/qc.pl" "$W" "$RP" && QOK=1
awk "/^[[:space:]]*#+[[:space:]]*7[.)][[:space:]]/{f=1} /^[[:space:]]*#+[[:space:]]*8[.)][[:space:]]/{f=0} f" "$RP" > "$T/s7"
test -s "$T/s7" || { echo "section 7 heading not found; reading the whole report for its file list"; cp "$RP" "$T/s7"; }
perl -ne "if (/([0-9a-f]{64})\s+(?:\S*\/)?([A-Za-z0-9._-]+\.[A-Za-z0-9]+)\s*\$/) { print \"\$2 \$1\n\" } elsif (/(?:\S*\/)?([A-Za-z0-9._-]+\.[A-Za-z0-9]+)\b[^\n]{0,40}?\b([0-9a-f]{64})/) { print \"\$1 \$2\n\" }" "$T/s7" | sort -u > "$T/listed"
BAD=0
for d in logs scratch; do for f in $(ls -1 "$W/$d"); do grep -q "^$f " "$T/listed" || { echo "NOT LISTED: $d/$f"; BAD=1; }; done; done
while read n h; do if [ -f "$W/logs/$n" ]; then p="$W/logs/$n"; elif [ -f "$W/scratch/$n" ]; then p="$W/scratch/$n"; else echo "LISTED BUT MISSING: $n"; BAD=1; continue; fi; test "$(h256 "$p")" = "$h" || { echo "HASH MISMATCH: $n"; BAD=1; }; done < "$T/listed"
echo "files listed in section 7: $(wc -l < "$T/listed" | tr -d " "); in logs/: $(ls -1 "$W/logs" | wc -l | tr -d " "); in scratch/: $(ls -1 "$W/scratch" | wc -l | tr -d " ")"
for f in $(ls -1 "$W/logs" | grep -i -e compact -e reread -e re-read || true); do grep -q "$PX" "$W/logs/$f" && echo "re-read log $f shows the prompt hash" || { echo "re-read log $f DOES NOT show the prompt hash"; BAD=1; }; done
TK=$(grep -cE "gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{20,}|sk-ant-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16}|xox[abprs]-[A-Za-z0-9-]{10,}" "$RP" || true); echo "token-shaped lines in the report: $TK"
echo "classification counts: SUBSTANTIVE $(grep -c SUBSTANTIVE "$RP" || true), ADVISORY $(grep -c ADVISORY "$RP" || true), NOT COUNTING $(grep -c "NOT COUNTING" "$RP" || true)"
echo "--- verdict lines:"; grep -n -m 18 -E "Verdict|^[[:space:]]*[-*]?[[:space:]]*\**Item [0-9]" "$RP" | cut -c1-220
test $QOK = 1 && test $BAD = 0 && test "$TK" = 0 && test $FOLD = 0 || die "the check of the report failed; not posting"
echo "=== the check of plan section 2C passed; the verdict"
awk "/^## 2\. Verdict/{f=1; next} f && NF {print; exit}" "$RP" | grep -q FAIL || die "the first line under section 2 of the report does not state FAIL"
test "$(grep -cE "^#+ *Finding [0-9]" "$RP")" = 3 || die "the report does not hold exactly three findings"
grep -qE "^#+ *Finding 1[^0-9].*SUBSTANTIVE" "$RP" || die "Finding 1 is not SUBSTANTIVE"
grep -qE "^#+ *Finding 2[^0-9].*ADVISORY" "$RP" || die "Finding 2 is not ADVISORY"
grep -qE "^#+ *Finding 3[^0-9].*ADVISORY" "$RP" || die "Finding 3 is not ADVISORY"
echo "VERDICT FAIL: FINDING 1 SUBSTANTIVE, FINDINGS 2 AND 3 ADVISORY"
echo "=== GitHub"
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
test "$($G api repos/$R/pulls/$N --jq "[.state,(.draft|tostring),.head.sha]|join(\" \")")" = "open true $H" || die "pull request $N is not an open draft at $H"
test -z "$($G api "repos/$R/issues/$N/comments?per_page=100" --jq ".[]|select(.body|contains(\"Head reviewed: $H\"))|.id")" || die "a verdict for this head is already posted"
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
TOT=$(wc -l < "$RP" | tr -d " "); BYT=$(wc -c < "$RP" | tr -d " ")
R1X=d625d2372a5d444e4983742d6ca4c950ac87c9f5bc0f003ce7d331da7b1553bf; RX=$(h256 "$RP")
NOTE="Review of Phase 3B slice H1 under DEC-20261108-03 B13 item 1, from the review prompt with SHA-256 $PX, run in Antigravity. The report records the model as not shown by the harness; the Founder records the model in the act that enters this verdict. The reviewer first wrote the report with SHA-256 $R1X. The check of plan section 2C that the Founder ran on the MacBook found five fenced blocks in it with no Source line: quoted git diffs of the certification reports hold lines of three backticks, which ended their blocks early. At a message from the Founder that asked for a change of format only, the same session wrote the report below, which the Founder check shows differs from the first only in 76 fence lines, each with two more backticks. On this report the check passed: every quoted block is in the log, script, evidence file, prompt text or repository lines it names; every file in the reviewer log and scratch folders is listed with a matching SHA-256; the review clone is at the head and clean; and the prompt, the description and the three evidence folders are unchanged. The report gives FAIL, with one finding classified SUBSTANTIVE and two ADVISORY. Under DEC-20261108-03 B13 item 3, H1 halts for the ruling of the Founder before any correction."
C=""; START=1
for i in $(seq 1 $NP); do
  PF="$T/part$i"; PH=$(h256 "$PF"); PL=$(wc -l < "$PF" | tr -d " ")
  if [ $i = 1 ]; then
    { printf "TIER-2 REVIEW VERDICT: MADVenturesLLC/madventures-tui#%s (part 1 of %s)\n\n" $N $NP
      printf "Reviewer id: antigravity\nHead reviewed: %s\nVerdict: FAIL, one SUBSTANTIVE finding, two ADVISORY findings\n" $H
      printf "Report SHA-256: %s (%s lines, %s bytes), as saved on the MacBook of the Founder at %s\n" $RX $TOT $BYT "$RP"
      printf "%s\n" "$NOTE"
      printf "The report is posted verbatim in %s parts, split before headings. This part holds lines 1 to %s, SHA-256 %s. The parts joined in order are the report byte for byte.\n\n" $NP $((START+PL-1)) $PH
      cat "$PF"; } > "$T/b$i"
  else
    { printf "TIER-2 REVIEW VERDICT, CONTINUED: MADVenturesLLC/madventures-tui#%s (part %s of %s)\n\n" $N $i $NP
      printf "Head reviewed: %s\nReport SHA-256: %s. Continues comment %s from line %s of the report; this part SHA-256 %s.\n\n" $H $RX $C $START $PH
      cat "$PF"; } > "$T/b$i"
  fi
  test $(wc -c < "$T/b$i") -le 60000 || die "part $i is too long for one comment"
  START=$((START+PL))
  [ $i = 1 ] && echo "CHECKS_OK: posting $NP parts"
  C=$($G api repos/$R/issues/$N/comments -F body=@"$T/b$i" --jq .id); echo "POSTED part $i: $C"
  eval "C$i=$C"
done
OKV=1
for i in $(seq 1 $NP); do
  eval "CI=\$C$i"; if [ $i = 1 ]; then SK=10; else SK=6; fi
  $G api repos/$R/issues/comments/$CI --jq .body | tail -n +$SK > "$T/g$i"
  perl -0777 -e "open(A, \"<\", \$ARGV[0]); open(B, \"<\", \$ARGV[1]); my \$a = <A>; my \$b = <B>; \$a =~ s/\n*\z//; \$b =~ s/\n*\z//; exit(\$a eq \$b ? 0 : 1)" "$T/g$i" "$T/part$i" || { echo "MISMATCH: comment $CI differs from part $i"; OKV=0; }
done
[ $OKV = 1 ] && echo "VERIFIED: each posted part equals its part of the report"
echo "POSTED 234: $(for i in $(seq 1 $NP); do eval "printf \"%s \" \$C$i"; done)"
rm -rf "$T"
' || echo STOPPED
