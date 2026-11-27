bash -ec '
die() { echo "STOP: $1"; exit 1; }
R=MADVenturesLLC/madventures-tui; N=234; BR=build/h1-r1; TB=claude/awesome-cray-vqrzbt
H=915dd0c4431e8f51458556c9f7ee64f6d8c303c6; HP=8c7afeae7e3209be8033ad6315b4be313f907713; B=1678f1839c600cacd38fd426f755afae021861bf
F=review-prompt-h1-antigravity-r3.md; FX=0cd7f0957899631dd0873decbff339c5d0ae526e0c2c15cc5f87f674b7726941
W=/Users/michaeldaley/builds/review-h1-r3; RP=/Users/michaeldaley/builds/review-h1-r3.md
W2=/Users/michaeldaley/builds/review-h1-r2; RP2=/Users/michaeldaley/builds/review-h1-r2.md; RP2X=844716e3022f284889534a662021ff8b8f932cbfe9145b110993e85245a3e1de; C2=6808073618
EV=/Users/michaeldaley/builds/h1-harness-evidence-20261111; EVM=aaaee2f5b797c71fd360796af8453a2a1e6a4fb6d9cc862e780b4f62c38a6073
CH=/Users/michaeldaley/.codex-governed; PK=/Users/michaeldaley/.codex-governed/packages/app-server-daemon; HR=/Users/michaeldaley/builds/h1-r1; S=/Users/michaeldaley/.codex-governed/sessions
QCX=1037aef01557b837d6df7385aee10c9ec0dc937bab6dd70156a8236ce4c1efd3
ADD="DEC-20261108-03-addendum-1-gate-order.md:ee5edbe2e3b377c11afd63a3b60775a802498d6be093f0dba619283569bd31fd DEC-20261108-03-addendum-2-codex-harness.md:e04b54065b0f0bb465b2d14e14a39f3b31f9cb34a874f6f8210a7d7e74a8c1c1 DEC-20261108-03-addendum-3-image-tool.md:f2a0ef1063379902935760d9517b68d532cabf6e24699cdebb789681f78ce15e DEC-20261108-03-addendum-4-sandbox-halt.md:e817470aea6be2c176d4ae75856fd793ef982bd28c9eb793df9c9038a5c1dfbc DEC-20261108-03-addendum-5-own-work.md:e86e94a62c7067e4656114afe1713c1478814ffe446d1ffcc8b788accfc3ff3d DEC-20261108-03-addendum-6-names-in-text.md:24cef0ed5c968aa80ada586e473526d0f4f0b1de1331eba1d5a35051b1254ac9 DEC-20261108-03-addendum-7-quarantine-limit.md:cd15d604dacb0bad4f27a18bda7936799076f3f8743301cb893bf3079c270361 DEC-20261108-03-addendum-8-gate-repeat.md:aca83d3bfcddc137687e0d2339ee409d937a2117342c9ffa6cdb10dc3da40c78 DEC-20261108-03-addendum-9-first-verdict.md:2381ba7b2b3778d4548b64120fe8198e3076e3c25fe28ce64965bf1c8fb902a0 DEC-20261108-03-addendum-10-second-verdict.md:d90d48718bc4ea6056af6f011f797a78eddcfd14e7111f15f823085c4388bca0"
G="env -u GH_TOKEN gh"
h256() { shasum -a 256 "$1" | cut -c1-64; }
test "$(uname -s)" = Darwin || die "run this on the MacBook"
command -v jq >/dev/null || die "jq not found"
command -v python3 >/dev/null || die "python3 not found"
for p in "$W" "$RP"; do test ! -e "$p" || die "already exists: $p"; done
echo "=== GitHub"
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
test "$($G api repos/$R/pulls/$N --jq "[.state,(.draft|tostring),.head.sha,.head.ref]|join(\" \")")" = "open true $H $BR" || die "pull request $N is not an open draft at $H"
V=$($G api "repos/$R/commits/$H/check-runs?per_page=100&filter=latest" --jq "[.check_runs[]|select(.name==\"Verify\" or .name==\"Verify (macOS)\")|\"\(.name)=\(.conclusion // .status)\"]|sort|join(\" \")")
CR=$($G api repos/$R/commits/$H/status --jq "[.statuses[]|select(.context==\"code-review\")|.state][0]")
echo "$V code-review=$CR"
test "$V" = "Verify (macOS)=success Verify=success" || die "Verify and Verify (macOS) are not both green at $H"
test "$CR" = success || die "code-review is not green at $H"
test "$($G api repos/$R/pulls/$N --jq .body | tr -d "\r")" = "$(tr -d "\r" < "$W2/prompt/pr-234-description.md")" || die "the posted description differs from the one the second review had"
test "$($G api repos/$R/issues/comments/$C2 --jq "[.user.login,(.issue_url|split(\"/\")|last),(.body|contains(\"Report SHA-256: $RP2X\")|tostring)]|join(\" \")")" = "decivantiq $N true" || die "comment $C2 is not the posted second verdict"
echo "pull request $N: open draft at $H, CI green, description unchanged, second verdict posted as comment $C2"
echo "=== the second review folder"
test "$(h256 "$RP2")" = $RP2X || die "the second report is not $RP2X"
(cd "$W2/prompt" && shasum -a 256 -c --status SHA256.txt) || die "the prompt folder of the second review has changed"
(cd "$W2/E1" && shasum -a 256 -c --status builder-files.sha256) || die "E1 of the second review has changed"
(cd "$W2/E2/logs" && shasum -a 256 -c --status ../MANIFEST.sha256) || die "E2 of the second review has changed"
(cd "$W2/E3" && shasum -a 256 -c --status MANIFEST.sha256) || die "E3 of the second review has changed"
echo "the second review folder is unchanged"
T=$(mktemp -d); test -n "$T" && test -d "$T" || die "no temporary folder"; mkdir "$T/E3"
echo "=== the check of Addendum 2 B4, run again read-only"
( W=$HR
echo "=== Addendum 2 B4, as Addendum 6 B2, Addendum 7 B4 and Addendum 9 B7 read it: every session record started in $W"
NAMES="read_mcp_resource|list_mcp_resources|list_mcp_resource_templates|view_image|codex_tui|spawn_agent"
R3=rollout-2026-11-08T20-04-43-01a1bdd6-0a76-7a63-869b-bcabc1a7e31a.jsonl
R4=rollout-2026-11-09T18-45-22-01a1c2b3-c154-79a0-83a7-e315c72e0e8d.jsonl
R5=rollout-2026-11-10T12-39-58-01a1c68b-94bb-7a13-8bf8-654f3e111cf4.jsonl
WREC=$(printf "%s\n" rollout-2026-11-08T18-51-11-01a1bd92-b707-7431-8632-1b2b88b7e5cc.jsonl rollout-2026-11-08T19-59-01-01a1bdd0-d3b9-7c90-b69f-f210bf3fb977.jsonl $R3 $R4 $R5 | LC_ALL=C sort)
WOCC=$( { for x in codex_tui list_mcp_resource_templates list_mcp_resources read_mcp_resource spawn_agent view_image; do echo "$R3 2026-11-09T01:21:15.274Z $x"; echo "$R4 2026-11-10T01:03:59.153Z $x"; echo "$R4 2026-11-10T01:05:33.527Z $x"; done; echo "$R4 2026-11-10T03:24:37.360Z codex_tui"; } | LC_ALL=C sort)
RECS=""; OCC=""; bad=0
for f in $(find "$S" -type f -name "rollout-*.jsonl" | LC_ALL=C sort); do
  c=$(jq -r "select(.type==\"session_meta\") | .payload.cwd // empty" "$f" | head -1)
  [ "$c" = "$W" ] || continue
  b=$(basename "$f"); RECS=$(printf "%s\n%s" "$RECS" "$b"); echo "== $b"
  jq -r "select(.type==\"session_meta\") | \" started \(.payload.timestamp // .timestamp // \"-\")\"" "$f" | head -1
  echo " user messages at: $(jq -r "select(.type==\"event_msg\" and .payload.type==\"user_message\") | .timestamp // \"-\"" "$f" | tr "\n" " ")"
  CALLS=$(jq -r "select(.type==\"response_item\") | .payload | select((.type // \"\") | test(\"call\$\")) | \"\(.type)|\(.namespace // \"\")|\(.name // \"-\")\"" "$f")
  if [ -n "$CALLS" ]; then printf "%s\n" "$CALLS" | sort | uniq -c; fi
  b1=$(printf "%s\n" "$CALLS" | awk -F"|" "NF==3 { n=\$3; sub(/^(functions|clock)(\\.|__)/, \"\", n); if (\$2==\"collaboration\" || \$2 ~ /codex_tui/ || \$3 ~ /collaboration|codex_tui/ || (n!=\"exec\" && n!=\"wait\" && n!=\"sleep\" && n!=\"request_user_input\" && n!=\"request_user_input_async\")) print }" | wc -l | tr -d " ")
  O=$(jq -r "select(.type==\"response_item\" and .payload.type==\"custom_tool_call\" and .payload.name==\"exec\") | \"\(.timestamp // \"-\") \(.payload.input // \"\" | tojson)\"" "$f" | while IFS= read -r L; do printf "%s\n" "$L" | grep -o -E "$NAMES" | sed "s/^/$b ${L%% *} /" || true; done)
  if [ -n "$O" ]; then echo " names inside exec, by call time:"; printf "%s\n" "$O" | cut -d" " -f2- | sort | uniq -c; OCC=$(printf "%s\n%s" "$OCC" "$O"); fi
  echo " barred top-level calls: $b1"
  bad=$((bad+b1))
done
GREC=$(printf "%s\n" "$RECS" | grep -v "^$" | LC_ALL=C sort || true)
GOCC=$(printf "%s\n" "$OCC" | grep -v "^$" | LC_ALL=C sort || true)
echo "records: $(printf "%s\n" "$GREC" | grep -c . || true); barred top-level calls: $bad; names inside exec: $(printf "%s\n" "$GOCC" | grep -c . || true)"
test -z "$(printf "%s\n" "$WREC" | LC_ALL=C comm -23 - <(printf "%s\n" "$GREC"))" || die "a record of Addendum 6 A2 or the sixth session record is missing; send this output to the drafting assistant"
EXTRA=$(printf "%s\n" "$GREC" | LC_ALL=C comm -13 <(printf "%s\n" "$WREC") - | grep -c . || true)
echo "records beyond the four of Addendum 6 A2 and the sixth session record: $EXTRA"
test "$EXTRA" = 1 || die "not exactly one record beyond those five; send this output to the drafting assistant"
test "$bad" = 0 || die "a barred top-level call; send this output to the drafting assistant"
test "$GOCC" = "$WOCC" || die "the names inside exec are not exactly those of Addendum 6 A2, with none in the sixth or seventh session record; send this output to the drafting assistant"
echo "B4_CHECK_OK"

) > "$T/check.raw" 2>&1 || { cat "$T/check.raw"; die "the check of Addendum 2 B4 stopped; send this output to the drafting assistant"; }
sed -E "s/[[:space:]]+$//" "$T/check.raw" > "$T/E3/b4-check.log"
tail -3 "$T/E3/b4-check.log"
test "$(h256 "$T/E3/b4-check.log")" = $QCX || { cat "$T/E3/b4-check.log"; die "the check output differs from the text the review prompt quotes; send this output to the drafting assistant"; }
echo "check output equals the quote of the review prompt"
( W=/Users/michaeldaley/builds/h1-r1; S=/Users/michaeldaley/.codex-governed/sessions
command -v jq >/dev/null || { echo "STOP: jq not found"; exit 1; }
NAMES="read_mcp_resource|list_mcp_resources|list_mcp_resource_templates|view_image|codex_tui|spawn_agent"
n=0
for f in $(find "$S" -type f -name "rollout-*.jsonl" | LC_ALL=C sort); do
  c=$(jq -r "select(.type==\"session_meta\") | .payload.cwd // empty" "$f" | head -1)
  [ "$c" = "$W" ] || continue
  n=$((n+1)); echo "== record $n: $(basename "$f")"
  jq -r "select(.type==\"session_meta\") | \" started \(.payload.timestamp // .timestamp // \"-\"), cli \(.payload.cli_version // \"-\")\"" "$f" | head -1
  CALLS=$(jq -r "select(.type==\"response_item\") | .payload | select((.type // \"\") | test(\"call\$\")) | \"\(.type)|\(.namespace // \"\")|\(.name // \"-\")\"" "$f")
  echo " top-level calls:"
  if [ -n "$CALLS" ]; then printf "%s\n" "$CALLS" | sort | uniq -c; fi
  echo " top-level calls the check counts as barred:"
  printf "%s\n" "$CALLS" | awk -F"|" "NF==3 { n=\$3; sub(/^(functions|clock)(\\.|__)/, \"\", n); if (\$2==\"collaboration\" || \$2 ~ /codex_tui/ || \$3 ~ /collaboration|codex_tui/ || (n!=\"exec\" && n!=\"wait\" && n!=\"sleep\" && n!=\"request_user_input\" && n!=\"request_user_input_async\")) print }" | sort | uniq -c
  echo " barred names inside exec, as the check counts them:"
  jq -r "select(.type==\"response_item\") | .payload | select(.type==\"custom_tool_call\" and .name==\"exec\") | .input // empty" "$f" | grep -o -E "$NAMES" | sort | uniq -c || true
  echo " each exec call holding one, by time, with 50 characters either side:"
  jq -r "select(.type==\"response_item\" and .payload.type==\"custom_tool_call\" and .payload.name==\"exec\") | \"\(.timestamp // \"-\") \(.payload.input // \"\" | tojson)\"" "$f" | while IFS= read -r L; do printf "%s\n" "$L" | grep -o -E ".{0,50}($NAMES).{0,50}" | sed "s/^/   ${L%% *}  /" || true; done
done
echo "records: $n"
echo DIAG_DONE

) > "$T/diag.raw" 2>&1 || { cat "$T/diag.raw"; die "the read-only command stopped"; }
sed -E "s/[[:space:]]+$//" "$T/diag.raw" > "$T/E3/b4-diag.log"
grep -qx "records: 6" "$T/E3/b4-diag.log" || { cat "$T/E3/b4-diag.log"; die "the read-only command did not find six records"; }
cmp -s "$T/E3/b4-check.log" "$W2/E3/b4-check.log" || die "the check output differs from E3 of the second review"
cmp -s "$T/E3/b4-diag.log" "$W2/E3/b4-diag.log" || { cat "$T/E3/b4-diag.log"; die "the read-only command output differs from E3 of the second review; send this output to the drafting assistant"; }
echo "both outputs equal E3 of the second review"
echo "=== the evidence of Addendum 10 A7"
test "$(h256 "$EV/MANIFEST.sha256")" = $EVM || die "the evidence manifest is not $EVM"
(cd "$EV" && shasum -a 256 -c --status MANIFEST.sha256) || die "a file of the evidence folder has changed"
TK=$(cat "$EV/app-server-daemon/daemon-updater.stderr.log" "$EV/packages-listing.txt" "$EV/version.json" | grep -cE "gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{20,}|sk-ant-[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16}|xox[abprs]-[A-Za-z0-9-]{10,}" || true)
test "$TK" = 0 || die "a token-shaped line in the evidence to be copied"
echo "the evidence folder matches $EVM; no token-shaped line in the files to be copied"
echo "=== E4"
mkdir -p "$T/E4/evidence/app-server-daemon"
cat > "$T/extract.py" <<"GEN_7f3a_PY"
import json, sys, os
SWITCH = "2026-11-10T21:46:10"
H1 = "/Users/michaeldaley/builds/h1-r1"
out = sys.argv[1]; files = sys.argv[2:]
recs = []
for path in files:
    meta = None; n = 0; first = None; last = None; after = 0; after_calls = 0; first_after = None; turns = []
    with open(path, errors="replace") as f:
        for line in f:
            try:
                d = json.loads(line)
            except Exception:
                continue
            t = d.get("type", "")
            p = d.get("payload") if isinstance(d.get("payload"), dict) else {}
            if t == "session_meta" and meta is None:
                meta = p
            ts = d.get("timestamp", "") or ""
            n += 1
            if ts:
                first = first or ts
                last = ts
            pt = p.get("type", "") or ""
            if ts and ts >= SWITCH:
                after += 1
                if first_after is None:
                    first_after = ts + " " + t + "/" + pt
                if t == "response_item" and pt in ("custom_tool_call", "function_call"):
                    after_calls += 1
            if t == "turn_context":
                sp = p.get("sandbox_policy") if isinstance(p.get("sandbox_policy"), dict) else {}
                fs = p.get("file_system_sandbox_policy") if isinstance(p.get("file_system_sandbox_policy"), dict) else {}
                ents = []
                for e in fs.get("entries", []) or []:
                    pp = e.get("path") if isinstance(e.get("path"), dict) else {}
                    if pp.get("type") == "special":
                        v = pp.get("value") if isinstance(pp.get("value"), dict) else {}
                        where = "special:" + str(v.get("kind"))
                    else:
                        where = str(pp.get("path"))
                    ents.append(str(e.get("access")) + " " + where)
                turns.append({"ts": ts, "model": p.get("model"), "effort": p.get("effort"), "approval": p.get("approval_policy"),
                              "reviewer": p.get("approvals_reviewer"), "sandbox": sp.get("type"), "network": sp.get("network_access"),
                              "fs": str(fs.get("type")) + " [" + "; ".join(ents) + "]", "cwd": p.get("cwd")})
    meta = meta or {}
    recs.append({"name": os.path.basename(path), "start": meta.get("timestamp"), "cli": meta.get("cli_version"), "cwd": meta.get("cwd"),
                 "n": n, "first": first, "last": last, "after": after, "after_calls": after_calls, "first_after": first_after, "turns": turns})
recs.sort(key=lambda r: r["name"])
with open(out, "w") as o:
    o.write("=== every session record whose session_meta cwd is " + H1 + ": session_meta, entries, entries from 2026-11-10T21:46:10Z, and the settings of each turn\n")
    for i, r in enumerate(recs, 1):
        o.write("== record " + str(i) + ": " + r["name"] + "\n")
        o.write(" session_meta: started " + str(r["start"]) + ", cli_version " + str(r["cli"]) + ", cwd " + str(r["cwd"]) + "\n")
        o.write(" entries: " + str(r["n"]) + ", first " + str(r["first"]) + ", last " + str(r["last"]) + "\n")
        o.write(" from 2026-11-10T21:46:10Z: " + str(r["after"]) + " entries, " + str(r["after_calls"]) + " tool calls; first such entry " + str(r["first_after"]) + "\n")
        o.write(" turns: " + str(len(r["turns"])) + "\n")
        for t in r["turns"]:
            o.write("  " + t["ts"] + " | model " + str(t["model"]) + " | effort " + str(t["effort"]) + " | approval " + str(t["approval"]) +
                    " | approvals reviewer " + str(t["reviewer"]) + " | sandbox " + str(t["sandbox"]) + " | network access " + str(t["network"]) +
                    " | file system " + t["fs"] + " | cwd " + str(t["cwd"]) + "\n")
    o.write("records: " + str(len(recs)) + "\n")
# the gate: what Addendum 10 states
R = [r["name"] for r in recs]
bad = []
want = ["rollout-2026-11-08T18-51-11-01a1bd92-b707-7431-8632-1b2b88b7e5cc.jsonl", "rollout-2026-11-08T19-59-01-01a1bdd0-d3b9-7c90-b69f-f210bf3fb977.jsonl",
        "rollout-2026-11-08T20-04-43-01a1bdd6-0a76-7a63-869b-bcabc1a7e31a.jsonl", "rollout-2026-11-09T18-45-22-01a1c2b3-c154-79a0-83a7-e315c72e0e8d.jsonl",
        "rollout-2026-11-10T12-39-58-01a1c68b-94bb-7a13-8bf8-654f3e111cf4.jsonl", "rollout-2026-11-11T10-37-11-01a1cb41-8567-7dd2-97e4-f29a7a538639.jsonl"]
if R != want:
    bad.append("the records are not the six of Addendum 10")
else:
    for i, r in enumerate(recs):
        wc = "0.167.1" if i == 5 else "0.167.0"
        if r["cli"] != wc: bad.append(r["name"] + ": cli_version " + str(r["cli"]) + ", not " + wc)
        if r["cwd"] != H1: bad.append(r["name"] + ": cwd " + str(r["cwd"]))
        for t in r["turns"]:
            exc = (i == 4 and t["ts"].startswith("2026-11-10T21:51:00"))
            if t["approval"] != "on-request": bad.append(r["name"] + " " + t["ts"] + ": approval " + str(t["approval"]))
            if t["reviewer"] != "user": bad.append(r["name"] + " " + t["ts"] + ": approvals reviewer " + str(t["reviewer"]))
            if t["cwd"] != H1: bad.append(r["name"] + " " + t["ts"] + ": cwd " + str(t["cwd"]))
            if exc:
                if t["sandbox"] != "read-only" or not t["fs"].startswith("restricted [") or any(not x.startswith("read ") for x in t["fs"][len("restricted ["):-1].split("; ")):
                    bad.append(r["name"] + " " + t["ts"] + ": not read-only with read access only")
            elif t["sandbox"] != "workspace-write" or t["network"] is not False:
                bad.append(r["name"] + " " + t["ts"] + ": sandbox " + str(t["sandbox"]) + ", network access " + str(t["network"]))
    r5 = recs[4]; r6 = recs[5]
    if [t["ts"][:19] for t in r5["turns"]] != ["2026-11-10T17:40:04", "2026-11-10T21:04:48", "2026-11-10T21:15:19", "2026-11-10T21:51:00"]: bad.append("record 5: its turns are not those of Addendum 10 A6")
    if (r5["after"], r5["after_calls"], str(r5["last"])[:19], str(r5["first_after"])[:19]) != (411, 57, "2026-11-10T22:33:36", "2026-11-10T21:46:12"): bad.append("record 5: entries from 21:46:10Z are not those of Addendum 10 A5 item 5")
    if str(r5["start"])[:19] != "2026-11-10T17:39:58": bad.append("record 5: start")
    if str(r6["start"])[:19] != "2026-11-11T15:37:11" or [t["ts"][:19] for t in r6["turns"]] != ["2026-11-11T15:37:53"]: bad.append("record 6: start or turns")
for b in bad:
    print("EXTRACT DIFFERS: " + b)
print("records: " + str(len(recs)) + "; the extract " + ("matches" if not bad else "DOES NOT match") + " Addendum 10 A5 items 5 and 6, A6 and B7 items 3 and 4")
sys.exit(1 if bad else 0)
GEN_7f3a_PY
RECS=$(for f in $(find "$S" -type f -name "rollout-*.jsonl" | LC_ALL=C sort); do c=$(jq -r "select(.type==\"session_meta\") | .payload.cwd // empty" "$f" | head -1); if [ "$c" = "$HR" ]; then echo "$f"; fi; done)
test -n "$RECS" || die "no session record found"
python3 "$T/extract.py" "$T/E4/records-extract.raw" $RECS || { sed -E "s/[[:space:]]+$//" "$T/E4/records-extract.raw"; die "the extract does not match Addendum 10; send this output to the drafting assistant"; }
sed -E "s/[[:space:]]+$//" "$T/E4/records-extract.raw" > "$T/E4/records-extract.log"; rm -f "$T/E4/records-extract.raw"
(cd "$PK" && find . -mindepth 1 -maxdepth 4 | LC_ALL=C sort | while IFS= read -r f; do if [ -L "$f" ]; then echo "$(TZ=UTC stat -f "%Sm" -t "%Y-%m-%dT%H:%M:%SZ" "$f") link $f -> $(readlink "$f")"; else echo "$(TZ=UTC stat -f "%Sm" -t "%Y-%m-%dT%H:%M:%SZ" "$f") $(stat -f "%HT" "$f" | tr " " "_") $f"; fi; done) > "$T/E4/packages-times.log"
(for p in "$CH/app-server-daemon/daemon-updater.pid" "$CH/app-server-daemon/daemon.pid"; do pid=$(grep -oE "[0-9]+" "$p" | head -1); if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then st=alive; else st="not running"; fi; echo "$(basename "$p"): pid $pid, $st when the setup ran, file modified $(TZ=UTC stat -f "%Sm" -t "%Y-%m-%dT%H:%M:%SZ" "$p")"; done; echo "setup ran at $(TZ=UTC date +%Y-%m-%dT%H:%M:%SZ)") > "$T/E4/server-state.log"
for f in app-server-daemon/daemon-updater.stderr.log app-server-daemon/daemon-updater.pid app-server-daemon/daemon.pid packages-listing.txt version.json; do cp -p "$EV/$f" "$T/E4/evidence/$f"; done
cp -p "$EV/MANIFEST.sha256" "$T/E4/evidence/MANIFEST.sha256"
grep -E "  \./(app-server-daemon/daemon-updater\.stderr\.log|app-server-daemon/daemon-updater\.pid|app-server-daemon/daemon\.pid|packages-listing\.txt|version\.json)$" "$EV/MANIFEST.sha256" > "$T/E4/evidence/subset.sha256"
test "$(wc -l < "$T/E4/evidence/subset.sha256" | tr -d " ")" = 5 || die "the evidence manifest does not list the five files"
(cd "$T/E4/evidence" && shasum -a 256 -c --status subset.sha256) || die "a copied evidence file differs"
(cd "$T/E4" && find . -type f | LC_ALL=C sort | grep -vx "./MANIFEST.sha256" | while IFS= read -r f; do shasum -a 256 "$f"; done) > "$T/manifest4"; mv "$T/manifest4" "$T/E4/MANIFEST.sha256"
grep -E "^(records|== record| session_meta| from 2026)" "$T/E4/records-extract.log"
cat "$T/E4/server-state.log"
echo "E4: $(wc -l < "$T/E4/MANIFEST.sha256" | tr -d " ") files listed"
echo "=== the review folder"
mkdir -p "$W/prompt" "$W/logs" "$W/scratch"
$G api -H "Accept: application/vnd.github.raw" "repos/$R/contents/transfer/$F?ref=$TB" > "$W/prompt/$F"
test "$(h256 "$W/prompt/$F")" = $FX || die "the review prompt on $TB differs"
for pair in $ADD; do n=${pair%%:*}; $G api -H "Accept: application/vnd.github.raw" "repos/$R/contents/transfer/$n?ref=$TB" > "$W/prompt/$n"; test "$(h256 "$W/prompt/$n")" = "${pair##*:}" || die "$n on $TB differs"; done
cp "$W2/prompt/pr-234-description.md" "$W/prompt/pr-234-description.md"
git -c credential.helper= -c "credential.helper=!env -u GH_TOKEN gh auth git-credential" clone -q --single-branch --branch main --no-tags https://github.com/$R.git "$W/repo"
git -C "$W/repo" -c credential.helper= -c "credential.helper=!env -u GH_TOKEN gh auth git-credential" fetch -q --no-tags origin $BR
test "$(git -C "$W/repo" rev-parse FETCH_HEAD)" = $H || die "the fetched head differs"
git -C "$W/repo" merge-base --is-ancestor $B $H || die "$B is not an ancestor of $H"
git -C "$W/repo" checkout -q --detach $H
git -C "$W/repo" remote remove origin
test "$(git -C "$W/repo" rev-parse HEAD)" = $H || die "repo is not at $H"
test "$(git -C "$W/repo" rev-parse $H^)" = $HP || die "the parent of $H is not $HP"
test -z "$(git -C "$W/repo" status --porcelain)" || die "repo not clean"
test -z "$(git -C "$W/repo" remote)" || die "repo has a remote"
cp -R "$W2/E1" "$W/E1"; cp -R "$W2/E2" "$W/E2"; cp -R "$W2/E3" "$W/E3"; cp -R "$T/E4" "$W/E4"
chmod -R u+w "$W/E1" "$W/E2" "$W/E3" "$W/E4"
(cd "$W/E1" && shasum -a 256 -c --status builder-files.sha256) || die "E1 copy check failed"
(cd "$W/E2/logs" && shasum -a 256 -c --status ../MANIFEST.sha256) || die "E2 copy check failed"
(cd "$W/E3" && shasum -a 256 -c --status MANIFEST.sha256) || die "E3 copy check failed"
(cd "$W/E4" && shasum -a 256 -c --status MANIFEST.sha256) || die "E4 check failed"
{ echo "$FX  $F"; echo "$(h256 "$W/prompt/pr-234-description.md")  pr-234-description.md"; for pair in $ADD; do echo "${pair##*:}  ${pair%%:*}"; done; echo "$(h256 "$W/E1/builder-files.sha256")  ../E1/builder-files.sha256"; echo "$(h256 "$W/E2/MANIFEST.sha256")  ../E2/MANIFEST.sha256"; echo "$(h256 "$W/E3/MANIFEST.sha256")  ../E3/MANIFEST.sha256"; echo "$(h256 "$W/E4/MANIFEST.sha256")  ../E4/MANIFEST.sha256"; } > "$W/prompt/SHA256.txt"
(cd "$W/prompt" && shasum -a 256 -c --status SHA256.txt) || die "prompt/SHA256.txt check failed"
grep -q "eeb0bd34311c060e3489679b6c1fd89d4f4bc3a9742603999dc73318f5e68a79  pr-234-description.md" "$W/prompt/SHA256.txt" || die "the description is not eeb0bd34"
echo "=== the quotes of the review prompt"
cat > "$T/qc.pl" <<"GEN_7f3a_PL"
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
  if ($src =~ /\.\./ || $src !~ m{^(E2|E3|E4)/}) { $bad++; push @fails, "$where: source not allowed: $src"; next; }
  my $t = slurp("$root/$src");
  if (!defined $t) { $bad++; push @fails, "$where: no such file $src"; next; }
  if (index("\n" . $t, "\n" . $content) >= 0) { $ok++ } else { $bad++; push @fails, "$where: block not found in $src"; }
}
print "quote check: $ok blocks found in their sources, $bad not found, $unsourced without a Source line\n";
print "  $_\n" for @fails;
exit(($bad + $unsourced) ? 1 : 0);
GEN_7f3a_PL
perl "$T/qc.pl" "$W" "$W/prompt/$F" || die "a quote of the review prompt is not in its source; send this output to the drafting assistant"
rm -rf "$T"
chmod -R a-w "$W/prompt" "$W/E1" "$W/E2" "$W/E3" "$W/E4"
echo "REVIEW FOLDER READY: $W (repo at $(git -C "$W/repo" rev-parse HEAD), E1 $(wc -l < "$W/E1/builder-files.sha256" | tr -d " ") files, E2, E3, E4, prompt)"; cat "$W/prompt/SHA256.txt"
pbcopy < "$W/prompt/$F"
test "$(pbpaste | shasum -a 256 | cut -c1-64)" = "$FX" || die "the clipboard differs from the review prompt"
echo "PROMPT_COPIED; load now: $(sysctl -n vm.loadavg)"
echo "NEXT, in a new terminal tab: cd $W && agy   then choose a Gemini model and paste the prompt"
' || echo STOPPED
