bash -ec '
die() { echo "STOP: $1"; exit 1; }
W=/Users/michaeldaley/builds/review-h1-r3; RP=/Users/michaeldaley/builds/review-h1-r3.md
H=915dd0c4431e8f51458556c9f7ee64f6d8c303c6; PX=0cd7f0957899631dd0873decbff339c5d0ae526e0c2c15cc5f87f674b7726941
A10=transfer/DEC-20261108-03-addendum-10-second-verdict.md; A10X=d90d48718bc4ea6056af6f011f797a78eddcfd14e7111f15f823085c4388bca0; TB=claude/awesome-cray-vqrzbt; C2=6808073618
h256() { shasum -a 256 "$1" | cut -c1-64; }
R=MADVenturesLLC/madventures-tui; N=234; G="env -u GH_TOKEN gh"
test "$(uname -s)" = Darwin || die "run this on the MacBook"
test -f "$RP" || die "no report at $RP yet"
test "$(h256 "$RP")" = 08cc87d596734223b6051c4b5a512e68d87f61481fedeb0c3037ed10fb59a7c7 || die "the report is not 08cc87d5"
echo "REPORT $(h256 "$RP") lines=$(wc -l < "$RP" | tr -d " ") bytes=$(wc -c < "$RP" | tr -d " ")"
test "$(git -C "$W/repo" rev-parse HEAD)" = $H || die "review repo is not at $H"
FOLD=0
test -z "$(git -C "$W/repo" status --porcelain)" && echo "REPO AT HEAD AND CLEAN" || { echo "REPO NOT CLEAN: the reviewer left a change"; FOLD=1; }
(cd "$W/prompt" && shasum -a 256 -c SHA256.txt > /dev/null) && echo "PROMPT, DESCRIPTION, ADDENDA AND E1, E2, E3, E4 MANIFESTS UNCHANGED" || { echo "PROMPT FOLDER CHECK FAILED"; FOLD=1; }
(cd "$W/E1" && shasum -a 256 -c --status builder-files.sha256) && echo "E1 FILES UNCHANGED" || { echo "E1 CHECK FAILED"; FOLD=1; }
(cd "$W/E2/logs" && shasum -a 256 -c --status ../MANIFEST.sha256) && echo "E2 LOGS UNCHANGED" || { echo "E2 CHECK FAILED"; FOLD=1; }
(cd "$W/E3" && shasum -a 256 -c --status MANIFEST.sha256) && echo "E3 LOGS UNCHANGED" || { echo "E3 CHECK FAILED"; FOLD=1; }
(cd "$W/E4" && shasum -a 256 -c --status MANIFEST.sha256) && echo "E4 FILES UNCHANGED" || { echo "E4 CHECK FAILED"; FOLD=1; }
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
  if ($src =~ /\.\./ || $src !~ m{^(logs|scratch|E1|E2|E3|E4|prompt|repo)/}) { $bad++; push @fails, "$where: source not allowed: $src"; next; }
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
awk "/^[[:space:]]*#+[[:space:]]*6[.)][[:space:]]/{f=1} /^[[:space:]]*#+[[:space:]]*7[.)][[:space:]]/{f=0} f" "$RP" > "$T/s7"
test -s "$T/s7" || { echo "section 6 heading not found; reading the whole report for its file list"; cp "$RP" "$T/s7"; }
perl -ne "if (/([0-9a-f]{64})\s+(?:\S*\/)?([A-Za-z0-9._-]+\.[A-Za-z0-9]+)\s*\$/) { print \"\$2 \$1\n\" } elsif (/(?:\S*\/)?([A-Za-z0-9._-]+\.[A-Za-z0-9]+)\b[^\n]{0,40}?\b([0-9a-f]{64})/) { print \"\$1 \$2\n\" }" "$T/s7" | sort -u > "$T/listed"
BAD=0
for d in logs scratch; do for f in $(ls -1 "$W/$d"); do grep -q "^$f " "$T/listed" || { echo "NOT LISTED: $d/$f"; BAD=1; }; done; done
while read n h; do if [ -f "$W/logs/$n" ]; then p="$W/logs/$n"; elif [ -f "$W/scratch/$n" ]; then p="$W/scratch/$n"; else echo "LISTED BUT MISSING: $n"; BAD=1; continue; fi; test "$(h256 "$p")" = "$h" || { echo "HASH MISMATCH: $n"; BAD=1; }; done < "$T/listed"
echo "files listed in section 6: $(wc -l < "$T/listed" | tr -d " "); in logs/: $(ls -1 "$W/logs" | wc -l | tr -d " "); in scratch/: $(ls -1 "$W/scratch" | wc -l | tr -d " ")"
for f in $(ls -1 "$W/logs" | grep -i -e compact -e reread -e re-read || true); do grep -q "$PX" "$W/logs/$f" && echo "re-read log $f shows the prompt hash" || { echo "re-read log $f DOES NOT show the prompt hash"; BAD=1; }; done
TK=$(grep -cE "gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{20,}|sk-ant-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16}|xox[abprs]-[A-Za-z0-9-]{10,}" "$RP" || true); echo "token-shaped lines in the report: $TK"
echo "classification counts: SUBSTANTIVE $(grep -c SUBSTANTIVE "$RP" || true), ADVISORY $(grep -c ADVISORY "$RP" || true), NOT COUNTING $(grep -c "NOT COUNTING" "$RP" || true)"
echo "--- verdict lines:"; grep -n -m 18 -E "Verdict|^[[:space:]]*[-*]?[[:space:]]*\**Item [0-9]" "$RP" | cut -c1-220
test $QOK = 1 && test $BAD = 0 && test "$TK" = 0 && test $FOLD = 0 || die "the check of the report failed; not posting"
echo "=== the check of plan section 2C passed; the verdict"
VL=$(awk "/^#+ *2\. Verdict/{f=1; next} f && NF {print; exit}" "$RP")
echo "first line under section 2: $VL"
printf "%s\n" "$VL" | grep -q PASS || die "the first line under section 2 of the report does not state PASS"
printf "%s\n" "$VL" | grep -qE "FAIL|INCONCLUSIVE" && die "the first line under section 2 also states FAIL or INCONCLUSIVE"
for n in 1 2 3 4 5; do grep -qE "Item $n[^0-9].{0,160}PASS" "$RP" || die "item $n does not state PASS"; done
test "$(grep -cE "^#+ *Finding [0-9]" "$RP")" = 0 || die "the report holds a finding"
FL=$(awk "/^#+ *3\. Findings/{f=1; next} f && NF {print; exit}" "$RP" | tr -d "*_ ." | tr "[:upper:]" "[:lower:]")
test "$FL" = none || die "section 3 of the report does not say none"
test "$(grep -c SUBSTANTIVE "$RP")" = 0 || die "the report names a SUBSTANTIVE finding"
echo "VERDICT PASS: ITEMS 1 TO 5 PASS, NO FINDING"
echo "=== GitHub"
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
test "$($G api repos/$R/pulls/$N --jq "[.state,(.draft|tostring),.head.sha]|join(\" \")")" = "open true $H" || die "pull request $N is not an open draft at $H"
test "$($G api repos/$R/issues/comments/$C2 --jq "[.user.login,(.issue_url|split(\"/\")|last)]|join(\" \")")" = "decivantiq $N" || die "the second verdict comment $C2 is not on pull request $N"
test "$($G api -H "Accept: application/vnd.github.raw" "repos/$R/contents/$A10?ref=$TB" | shasum -a 256 | cut -c1-64)" = $A10X || die "Addendum 10 on the transfer branch is not $A10X"
echo "ADDENDUM 10 ON THE TRANSFER BRANCH IS $A10X"
RX=$(h256 "$RP")
test -z "$($G api "repos/$R/issues/$N/comments?per_page=100" --jq ".[]|select(.body|contains(\"Report SHA-256: $RX\"))|.id")" || die "this report is already posted"
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
NOTE="Third review of Phase 3B slice H1, under DEC-20261108-03 Addendum 10 B7, of item 6 of the second review alone, at the same head, from the review prompt with SHA-256 $PX, run in the Antigravity command-line interface on the MacBook of the Founder; the report records the model as not shown, and the Founder records the model in the act that records the merge of H1. The check of plan section 2C that the Founder ran on the MacBook passed on this report: every quoted block is in the log, script, evidence file, prompt text or repository lines it names; every file in the reviewer log and scratch folders is listed with a matching SHA-256; each re-read after compaction shows the prompt SHA-256; the review clone is at the head and clean; and the prompt, the description and the four evidence folders are unchanged. The report gives PASS, with items 1 to 5 PASS and no finding. Under DEC-20261108-03 Addendum 10 B7 (SHA-256 $A10X, on branch $TB of this repository), this is the posted Tier-2 PASS at the exact head of H1 that DEC-20261108-03 B14 and Phase 3B plan section 0A item 2 require. The second verdict is comment $C2."


C=""; START=1
for i in $(seq 1 $NP); do
  PF="$T/part$i"; PH=$(h256 "$PF"); PL=$(wc -l < "$PF" | tr -d " ")
  if [ $i = 1 ]; then
    { printf "TIER-2 REVIEW VERDICT, ROUND 3: MADVenturesLLC/madventures-tui#%s (part 1 of %s)\n\n" $N $NP
      printf "Reviewer id: antigravity\nReview round: 3\nHead reviewed: %s\nVerdict: PASS, no finding\n" $H
      printf "Report SHA-256: %s (%s lines, %s bytes), as saved on the MacBook of the Founder at %s\n" $RX $TOT $BYT "$RP"
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
  [ $i = 1 ] && echo "CHECKS_OK: posting $NP parts"
  C=$($G api repos/$R/issues/$N/comments -F body=@"$T/b$i" --jq .id); echo "POSTED part $i: $C"
  eval "C$i=$C"
done
OKV=1
for i in $(seq 1 $NP); do
  eval "CI=\$C$i"; if [ $i = 1 ]; then SK=11; else SK=6; fi
  $G api repos/$R/issues/comments/$CI --jq .body | tail -n +$SK > "$T/g$i"
  perl -0777 -e "open(A, \"<\", \$ARGV[0]); open(B, \"<\", \$ARGV[1]); my \$a = <A>; my \$b = <B>; \$a =~ s/\n*\z//; \$b =~ s/\n*\z//; exit(\$a eq \$b ? 0 : 1)" "$T/g$i" "$T/part$i" || { echo "MISMATCH: comment $CI differs from part $i"; OKV=0; }
done
[ $OKV = 1 ] && echo "VERIFIED: each posted part equals its part of the report"
echo "POSTED 234: $(for i in $(seq 1 $NP); do eval "printf \"%s \" \$C$i"; done)"
rm -rf "$T"
' || echo STOPPED
