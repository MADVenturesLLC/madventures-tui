cd ~ && bash -ec '
die() { echo "STOP: $1"; exit 1; }
h256() { shasum -a 256 "$1" | cut -c1-64; }
echo "=== M1: the Founder check before the push (DEC-20261123-01 B15 item 1, B25), version 1 (bash $BASH_VERSION)"
TR=MADVenturesLLC/madventures-tui; G="env -u GH_TOKEN gh"; TB=claude/awesome-cray-vqrzbt
W=/Users/michaeldaley/builds/m1-r1; D=$W/tui; P=$W/prompt; Q=$W/pr; EV=$W/evidence; BR=build/3b-m1-r1; L864=$W/logs/864-delivery-hashes.log
B=75aec139d503cbe1d34d0c6f3ac5bd514339570e; R6=d5d40d6dcd90a930c106cec55ea836c5cc4400ce; H=4630152f763baca0259d84c0d5817d0cea501145
XR=1b2b91eb7757245b3583cfd119353617555657a11a946606e5a331e30800beb3; HR1=eed8bc988d68dc9e1b601cba8ee3e0e3fecc80bd92fadfa45059027d5714f730; HR3=90bd5248ced3c56996588b44de5b0204efff1dbc059dae0e9b7d5d30d730479d
BL=docs/verification/phase-3b-m1-build-log.md; PK=docs/verification/phase-3b-m1-evidence.md; HS=test/phase3a/harness-separation.test.ts; BT=packages/supervisor/src/build.ts
TM=packages/pty-host/src/terminal.ts; MG=packages/pty-host/test/main-guard.test.ts
CH=/Users/michaeldaley/.codex-governed; S=$CH/sessions; RB=/Users/michaeldaley/.bun/bin/bun; RX=35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5; TSD=$D/node_modules/typescript
K=h2-record-check.mjs; KC=730df3014bf31d2dc0770cb4d30a4a4a79e30afe; CX=c1834dcc689e94cf57fb123a09a0600225d8e97b428c648f14276136e3dd383f
UP=transfer/m1/delivery; XTS=3ae902c92cc44dace175c0e69e13a4b0899f6983c6121d76b9ab8dd5795e7675; XSUM=7864e818ef53b3d4acd5609d08abbf1def18c45c83d729d65762f4c7471feefc
export GIT_OPTIONAL_LOCKS=0
AOK_M="^(packages/supervisor/src/(build|index|preflight)\.ts|packages/supervisor/test/(preflight|madv-allowlist)\.test\.ts|test/phase3a/harness-separation\.test\.ts|packages/adapter-claude-code/src/.+|packages/adapter-madv-surface/src/.+|packages/pty-host/src/terminal\.ts|packages/pty-host/test/main-guard\.test\.ts)$"
AOK_A="^(apps/madbridge/src/tui/live/.+|packages/supervisor/test/[^/]+\.ts|packages/adapter-claude-code/(src|test)/.+|packages/adapter-madv-surface/src/.+|packages/adapter-madv-surface/test/.+|test/phase3b/.+|scripts/phase3b/.+|docs/verification/phase-3b-m1-(build-log|evidence)\.md)$"
KEYRE="sk-(cp|ant)-[A-Za-z0-9_-]{12,}|ghp_[A-Za-z0-9]{20,}|gho_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}"
UUIDRE="[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}"
SIXRE="read_mcp_resource|list_mcp_resource_templates|list_mcp_resources|view_image|codex_tui|spawn_agent"
CFGRE="/Users/michaeldaley/\.(claude|secrets|ssh|config|hermes|madmik3|codex)"
test "$(uname -sm)" = "Darwin arm64" || die "run this on the MacBook"
command -v jq >/dev/null || die "jq not found"
T2=$(mktemp -d); trap "rm -rf \"$T2\"" EXIT
long() { perl -CSD -lne "print if length > 72" "$1" | wc -l | tr -d " "; }
echo "=== 1. the branch (B25; THE ORDER and ATTRIBUTION AND COMMITS of the builder prompt; Addendum 2 B5)"
cd "$D"
test "$(git rev-parse HEAD)" = "$H" || die "HEAD is not $H"
test "$(git branch --show-current)" = "$BR" || die "not on $BR"
test -z "$(git status --porcelain --untracked-files=all)" || die "tree not clean: $(git status --porcelain --untracked-files=all | head -3 | tr "\n" ";")"
test "$(git stash list | wc -l | tr -d " ")" = 0 || die "a stash exists"
test "$(git rev-list --count $B..$H)" = 13 || die "the branch does not hold exactly 13 commits on the base"
test "$(git rev-list --merges $B..$H | wc -l | tr -d " ")" = 0 || die "a merge commit"
F1=$(git rev-list --reverse $B..$H | head -1)
test "$(git rev-parse "$F1^@")" = "$B" || die "the first commit is not on the base alone"
git merge-base --is-ancestor $R6 $H || die "the commit of the halt, $R6, is not on the branch"
for c in $(git rev-list --reverse $B..$H); do
  test "$(git log -1 --format=%an $c)" = daley40-lab && test "$(git log -1 --format=%cn $c)" = daley40-lab || die "commit $c is not by daley40-lab"
  git log -1 --format=%B $c > "$T2/msg"
  test "$(git interpret-trailers --parse < "$T2/msg")" = "$(printf "Role-Id: builder\nActor-Id: session:codex/3b-m1-r1\nExecution-Surface: codex")" || die "commit $c does not end with exactly the three trailers"
  test "$(grep -ci "^co-authored-by:" "$T2/msg" || true)" = 0 || die "commit $c has a Co-authored-by line"
  test "$(long "$T2/msg")" = 0 || die "commit $c has a message line longer than 72 characters"
done
test "$(git log --format=%B $B..$H | grep -cE "$KEYRE|$SIXRE" || true)" = 0 || die "a commit message holds a key-like string or one of the six names; paste nothing, tell the drafting assistant"
git log --reverse --format="%H %s" $B..$H
test "$(git diff-tree --no-commit-id --name-only -r $F1)" = "$BL" || die "the first commit is not the build log alone"
test "$(git diff-tree --no-commit-id --name-only -r $H)" = "$BL" || die "the last commit is not the build log alone"
A2C=$(git rev-list --reverse --ancestry-path $R6..$H | head -1)
test "$(git rev-parse "$A2C^@")" = "$R6" || die "the commit after $R6 is not on it alone"
git diff-tree --no-commit-id --name-status -r $A2C | tr "\t" " " > "$T2/a2c"
test "$(grep -c "" "$T2/a2c")" = 3 && grep -qx "M $TM" "$T2/a2c" && grep -qx "M $MG" "$T2/a2c" && test "$(grep -cE "^A test/phase3b/[^ ]+$" "$T2/a2c")" = 1 || die "the commit after $R6 is not the change of Addendum 2 B1 with one new test under test/phase3b/"
test "$(git rev-list $B..$H -- $TM $MG)" = "$A2C" || die "a commit other than $A2C changes $TM or $MG"
git log -1 --format=%B $A2C | grep -qiE "addendum 2|f524cb05" || die "the body of $A2C does not name Addendum 2 (Addendum 2 B5)"
echo "the commit of Addendum 2 B5: $A2C, $(git log -1 --format=%s $A2C), on $R6; files: $(tr "\n" ";" < "$T2/a2c")"
echo "=== 2. the paths (B22, as Addendum 2 B1 and B3 amend it)"
git diff --no-renames --name-status $B $H | tr "\t" " " > "$T2/ns"
while read -r st p; do case "$st" in
  M) echo "$p" | grep -qE "$AOK_M" || die "changed outside B22: $p";;
  A) echo "$p" | grep -qE "$AOK_A" || die "added outside B22: $p"; case "$p" in packages/adapter-madv-surface/test/fixtures/*) die "a fixture was added: $p";; apps/*.test.*|apps/*.spec.*) die "a test under apps/: $p";; esac;;
  *) die "status $st on $p";; esac; done < "$T2/ns"
echo "$(grep -c "^M " "$T2/ns") files changed and $(grep -c "^A " "$T2/ns") added, each within B22 as Addendum 2 amends it"
test -z "$(git diff --name-only $B $H -- package.json bun.lock apps/madbridge/package.json apps/madbridge/src/tui/main.tsx apps/madbridge/src/commands/start.ts apps/madbridge/src/cli.ts packages/protocol packages/supervisor/src/attestation.ts packages/supervisor/src/environment.ts packages/supervisor/test/build-rollback.test.ts packages/adapter-madv-surface/test/fixtures test/phase3a/runtime-harness.ts test/phase3a/fixture-adapters.ts packages/pty-host/src/main.ts "*package.json" "*tsconfig*")" || die "a path that must stay byte-identical changed"
old() { git diff -U0 $B $H -- "$1" | awk "/^@@ /{split(\$2,o,\",\"); s=substr(o[1],2)+0; n=(o[2]==\"\")?1:o[2]+0; for(i=0;i<n;i++) print s+i}" | tr "\n" " "; }
hk() { git diff -U0 $B $H -- "$1" | grep "^@@ " | cut -d" " -f2,3 | tr "\n" " "; }
test "$(hk $HS)" = "-30 +30 " || die "harness-separation changes more than line 30: $(hk $HS)"
XBT=$(git show $H:$BT | shasum -a 256 | cut -c1-64)
for c in $(git rev-list $B..$H -- $BT); do x=$(git show $c:$BT | shasum -a 256 | cut -c1-64); git show $c:$HS | sed -n 30p | grep -q "$x" || die "at $c, line 30 of harness-separation does not pin build.ts, $x"; done
test "$(hk $MG)" = "-309 +309 -335 +335 " || die "main-guard changes more than lines 309 and 335: $(hk $MG)"
git diff -U0 $B $H -- $TM | grep -E "^\+[^+]" > "$T2/tm-added" || true
grep -q "localFlags" "$T2/tm-added" || die "the change of terminal.ts does not set localFlags"
test "$(grep -c "setRawMode" "$T2/tm-added" || true)" = 0 || die "the change of terminal.ts uses raw mode"
echo "harness-separation: line 30 alone, pinning build.ts $XBT; main-guard: lines 309 and 335 alone; terminal.ts: base lines changed: $(old $TM | wc -w | tr -d " "), lines added: $(grep -c "" "$T2/tm-added")"
for f in packages/supervisor/test/preflight.test.ts packages/supervisor/test/madv-allowlist.test.ts packages/supervisor/src/preflight.ts; do echo "$f: base lines changed: $(old $f | wc -w | tr -d " ")"; done
echo "--- $TM"; git diff $B $H -- $TM | sed -n "5,200p"
echo "--- $MG"; git diff -U0 $B $H -- $MG | grep -E "^[-+]" | grep -vE "^(\+\+\+|---) "
test "$(GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git diff --check $B $H | wc -l | tr -d " ")" = 0 || die "git diff --check is not clean"
git diff --stat $B $H | tail -1
echo "=== 3. the deliverables (DELIVERABLES and FINAL REPORT of the builder prompt; B23)"
test "$(LC_ALL=C ls "$Q" | tr "\n" " ")" = "m1-halt-1-report.md m1-halt-3-report.md m1-report.md pr-body.md pr-title.txt " || die "pr/ holds: $(LC_ALL=C ls "$Q" | tr "\n" " ")"
test "$(h256 "$Q/m1-halt-1-report.md")" = "$HR1" && test "$(h256 "$Q/m1-halt-3-report.md")" = "$HR3" || die "a halt report changed"
test "$(h256 "$Q/m1-report.md")" = "$XR" || die "the final report is not the one the builder reported, $XR"
test "$(grep -c "" "$Q/pr-title.txt")" = 1 && test "$(long "$Q/pr-title.txt")" = 0 || die "pr-title.txt is not one line of 72 characters or fewer"
git show $H:$BL > "$T2/build-log.md"; git show $H:$PK > "$T2/evidence-packet.md"
XBL=$(h256 "$T2/build-log.md"); XPK=$(h256 "$T2/evidence-packet.md"); XPT=$(h256 "$Q/pr-title.txt"); XPB=$(h256 "$Q/pr-body.md")
test -f "$L864" || die "log 864 is missing"
for x in "$XBL" "$XPK" "$XPT" "$XPB"; do test "$(grep -c "$x" "$L864" || true)" -ge 1 || die "log 864 does not list $x"; done
echo "build log $XBL; packet $XPK; pr-title.txt $XPT; pr-body.md $XPB: each listed in log 864; final report $XR (listed in log 864: $(grep -c "$XR" "$L864" || true))"
(cd "$P" && shasum -a 256 -c --status SHA256.txt) && test "$(h256 "$P/SHA256.txt")" = "$XSUM" && test "$(ls "$P" | wc -l | tr -d " ")" = 7 || die "prompt/ is not as your command of resume message 3 left it"
test -f "$EV/SHA256.txt" || die "evidence/ has no SHA256.txt"
(cd "$EV" && shasum -a 256 -c --status SHA256.txt) || die "a file in evidence/ does not match its SHA256.txt"
NEV=$(grep -c "" "$EV/SHA256.txt"); NC=0; for x in $(cut -c1-64 "$EV/SHA256.txt"); do if grep -q "$x" "$T2/evidence-packet.md"; then NC=$((NC+1)); fi; done
echo "evidence/: $NEV transcripts, each matching SHA256.txt ($(h256 "$EV/SHA256.txt")); cited by SHA-256 in the packet: $NC of $NEV"
git diff $B $H -- . ":(exclude)$BL" ":(exclude)$PK" > "$T2/code.diff"
n=$(git diff $B $H | grep -cE "$KEYRE" || true); test "$n" = 0 || die "the diff of the branch holds $n key-like strings; paste nothing, tell the drafting assistant this count"
for f in "$Q/m1-report.md" "$Q/pr-body.md" "$Q/pr-title.txt" "$T2/build-log.md" "$T2/evidence-packet.md" "$T2/code.diff"; do nm=$(basename "$f")
  n=$(grep -cE "$KEYRE" "$f" || true); test "$n" = 0 || die "$nm holds $n key-like strings; paste nothing, tell the drafting assistant this count"
  s=$(grep -cE "$SIXRE" "$f" || true); test "$s" = 0 || die "$nm names one of the six names on $s lines; tell the drafting assistant this count"
  c=$(grep -cE "$CFGRE" "$f" || true); case "$nm" in build-log.md|evidence-packet.md) test "$c" = 0 || die "$nm names a path under your configuration folders on $c lines (B23); tell the drafting assistant this count";; esac
  echo "$nm: $(grep -c "" "$f") lines; key-like 0; six names 0; lines naming a configuration folder $c; UUID-shaped strings $(grep -cE "$UUIDRE" "$f" || true)"; done
for f in "$T2/build-log.md" "$T2/evidence-packet.md"; do t=$(grep -cE "[[:blank:]]$" "$f" || true); test "$t" = 0 || die "$(basename "$f") has $t lines ending in a space or a tab"; done
echo "=== 4. the session-record check (DEC-20261108-03 Addendum 2 B4; Addenda 6 and 10; DEC-20261112-02 B2 and B5; DEC-20261115-02 Addendum 3 B4)"
for f in "$CH"/app-server-daemon/*.pid; do [ -f "$f" ] || continue; pid=$(grep -oE "[0-9]+" "$f" | head -1 || true); if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then die "a governed background server or updater runs ($(basename "$f"))"; fi; done
test "$(pgrep -f "$CH/packages/app-server-daemon" | wc -l | tr -d " ")" = 0 || die "a governed background server or updater runs"
test "$(h256 "$RB")" = "$RX" || die "the Bun runtime is not the macOS certification runtime"
test "$(jq -r .version "$TSD/package.json")" = 5.9.3 && test "$(h256 "$TSD/lib/typescript.js")" = "$XTS" || die "the TypeScript of the clone is not the TypeScript 5.9.3 of bun.lock"
E=/Users/michaeldaley/builds/m1-record-check/check-$(date -u +%Y%m%dT%H%M%SZ); test ! -e "$E" || die "ALREADY EXISTS: $E"; mkdir -p "$E"; cd "$E"
$G api "repos/$TR/contents/transfer/$K?ref=$KC" -H "Accept: application/vnd.github.raw" > "$E/$K"
test "$(h256 "$E/$K")" = "$CX" || die "the check at $KC is not the signed text"
"$RB" "$E/$K" selftest "$TSD" "$W" "$E/selftest-records" > "$E/selftest.txt" 2>&1 || true
tail -2 "$E/selftest.txt"
test "$(tail -1 "$E/selftest.txt")" = SELFTEST_OK || { cat "$E/selftest.txt"; die "the self-test failed, so the check does not run; nothing was uploaded"; }
"$RB" "$E/$K" check "$TSD" "$W" "$S" > "$E/check.txt" 2>&1 || true
cat "$E/check.txt"
cat > "$E/b4-count.mjs" <<"B4COUNT_JS_7c1d"
// Counts, in the exec inputs of the one governed record of FOLDER, the calls of eval, Function,
// load and store, the occurrences of the six names, and the inputs that do not parse, with whether
// the recorded output of each such input holds a SyntaxError. It prints times and counts only.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, basename } from "node:path";
import { createRequire } from "node:module";
const [tsDir, FOLDER, DIR] = process.argv.slice(2);
const ts = createRequire(import.meta.url)(tsDir);
const SIX = ["read_mcp_resource", "list_mcp_resource_templates", "list_mcp_resources", "view_image", "codex_tui", "spawn_agent"];
const files = [];
const go = d => { for (const e of readdirSync(d).sort()) { const f = join(d, e); if (statSync(f).isDirectory()) go(f); else if (/^rollout-.*\.jsonl$/.test(e)) files.push(f); } };
go(DIR);
const recs = [];
for (const f of files) {
  const items = readFileSync(f, "utf8").split("\n").filter(l => l.trim() !== "").map(l => JSON.parse(l));
  const m = items.find(x => x.type === "session_meta");
  if (m && m.payload && m.payload.cwd === FOLDER) recs.push([f, items]);
}
console.log("records: " + recs.length);
if (recs.length !== 1) { console.log("B4_STOP: not exactly one record"); process.exit(1); }
const [file, items] = recs[0];
console.log("record: " + basename(file));
const execs = items.filter(x => x.type === "response_item" && x.payload && x.payload.type === "custom_tool_call" && String(x.payload.name).replace(/^functions(\.|__)/, "") === "exec" && typeof x.payload.input === "string");
const outputs = new Map();
for (const x of items) if (x.type === "response_item" && x.payload && /output$/.test(String(x.payload.type || "")) && x.payload.call_id) outputs.set(x.payload.call_id, typeof x.payload.output === "string" ? x.payload.output : JSON.stringify(x.payload.output));
function parse(src) {
  const tries = [["cell.ts", ts.ScriptKind.TS, false], ["cell.js", ts.ScriptKind.JS, false], ["cell.ts", ts.ScriptKind.TS, true]];
  for (const [name, kind, wrap] of tries) {
    const text = wrap ? "(async () => {\n" + src + "\n})();\n" : src;
    const sf = ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, kind);
    if ((sf.parseDiagnostics || []).length === 0) return sf;
  }
  return null;
}
const tot = { eval: 0, Function: 0, load: 0, store: 0, computed: 0 };
let six = 0, bad = 0;
const unparsed = [];
for (const x of execs) {
  const src = x.payload.input;
  let n6 = 0;
  for (const n of SIX) n6 += src.split(n).length - 1;
  six += n6;
  const sf = parse(src);
  if (!sf) { const out = outputs.get(x.payload.call_id) || ""; unparsed.push(x.timestamp); console.log("exec input that does not parse at " + x.timestamp + ": " + src.length + " characters; occurrences of the six names in it: " + n6 + "; its recorded output holds a SyntaxError: " + (out.includes("SyntaxError") ? "yes" : "no")); if (!out.includes("SyntaxError") || n6 > 0) bad++; continue; }
  const walk = n => {
    if (ts.isCallExpression(n) || ts.isNewExpression(n)) {
      const e = n.expression;
      let name = "(computed)";
      if (ts.isIdentifier(e)) name = e.text;
      else if (ts.isPropertyAccessExpression(e)) name = e.name.text;
      else if (ts.isElementAccessExpression(e) && ts.isStringLiteralLike(e.argumentExpression)) name = e.argumentExpression.text;
      if (name === "(computed)") tot.computed++;
      else if (Object.prototype.hasOwnProperty.call(tot, name)) tot[name]++;
    }
    ts.forEachChild(n, walk);
  };
  walk(sf);
}
console.log("exec inputs: " + execs.length + "; not parsed: " + unparsed.length + "; occurrences of the six names, as any substring, in all of them: " + six + "; calls of eval " + tot.eval + ", Function " + tot.Function + ", load " + tot.load + ", store " + tot.store + "; calls through a computed callee " + tot.computed);
if (six > 0 || unparsed.length > 1 || tot.eval + tot.Function + tot.load + tot.store > 0) bad++;
console.log(bad === 0 ? "B4_OK" : "B4_STOP");
process.exit(bad === 0 ? 0 : 1);
B4COUNT_JS_7c1d
"$RB" "$E/b4-count.mjs" "$TSD" "$W" "$S" > "$E/b4.txt" 2>&1 || true
cat "$E/b4.txt"
(cd "$E" && find . -type f ! -name MANIFEST.sha256 | LC_ALL=C sort | xargs shasum -a 256 > MANIFEST.sha256)
EM=$(h256 "$E/MANIFEST.sha256"); echo "evidence: $E, MANIFEST.sha256 $EM"
test "$(tail -1 "$E/check.txt")" = CHECK_OK || die "the session-record check did not end CHECK_OK; send this whole output to the drafting assistant; nothing was uploaded"
test "$(tail -1 "$E/b4.txt")" = B4_OK || die "the count of code from a string did not end B4_OK; send this whole output to the drafting assistant; nothing was uploaded"
echo "=== 5. copies for the drafting assistant, as decivantiq, to $UP on $TB"
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
U=$E/upload; mkdir "$U"; cp "$T2/build-log.md" "$T2/evidence-packet.md" "$T2/code.diff" "$U/"; cp "$Q/m1-report.md" "$Q/pr-body.md" "$Q/pr-title.txt" "$U/"; cp "$EV/SHA256.txt" "$U/evidence-SHA256.txt"
{ echo "Founder check of M1 before the push, under DEC-20261123-01 B15 item 1 and B25: the session record under DEC-20261108-03 Addendum 2 B4, as its Addenda 6 B1 and 10 B6 and DEC-20261112-02 B2 and B5 read it, with the count of code from a string of DEC-20261115-02 Addendum 3 B4."; echo; echo "Check: $K, SHA-256 $CX, from transfer commit $KC, over $W. Evidence on the MacBook: $E, MANIFEST.sha256 $EM."; echo; echo "Self-test:"; tail -2 "$E/selftest.txt" | sed "s/^/    /"; echo; echo "Check:"; sed "s/^/    /" "$E/check.txt"; echo; echo "Count, b4-count.mjs, SHA-256 $(h256 "$E/b4-count.mjs"):"; sed "s/^/    /" "$E/b4.txt"; echo; echo "Head $H, branch $BR, base $B; commit of Addendum 2 B5 $A2C."; echo "Build log $XBL; packet $XPK; pr-title.txt $XPT; pr-body.md $XPB; final report $XR."; } > "$U/record-check.txt"
for f in "$U"/*; do nm=$(basename "$f"); X1=$(h256 "$f")
  if $G api "repos/$TR/contents/$UP/$nm?ref=$TB" -H "Accept: application/vnd.github.raw" > "$T2/$nm.remote" 2>/dev/null; then if [ "$(h256 "$T2/$nm.remote")" = "$X1" ]; then echo "$UP/$nm already there, $X1"; elif [ "$nm" = record-check.txt ]; then echo "$UP/$nm: the check of an earlier run is already there; the check of this run is in $E"; else die "$UP/$nm exists on $TB with other bytes"; fi; continue; fi
  base64 -i "$f" | tr -d "\n" > "$T2/$nm.b64"
  jq -n --arg m "transfer: M1 delivery, $nm (Founder copy)" --arg b "$TB" --rawfile c "$T2/$nm.b64" "{message:\$m,branch:\$b,content:\$c}" > "$T2/$nm.json"
  c=$($G api -X PUT "repos/$TR/contents/$UP/$nm" --input "$T2/$nm.json" --jq .commit.sha)
  test "$($G api "repos/$TR/contents/$UP/$nm?ref=$c" -H "Accept: application/vnd.github.raw" | shasum -a 256 | cut -c1-64)" = "$X1" || die "$UP/$nm on GitHub differs"
  echo "$UP/$nm $X1 in $c"; done
echo "M1 CHECKED: 13 commits to $H; paths within B22 as Addendum 2 amends it; deliverables match the builder report; session record CHECK_OK and B4_OK; copies on $TB under $UP; nothing was pushed to the build branch; paste this whole output to the drafting assistant"
' || echo STOPPED
