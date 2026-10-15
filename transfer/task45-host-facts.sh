#!/usr/bin/env bash
# Task 45 host-facts check, DEC-20261013-01 B8. The Founder runs it, in a
# plain terminal, once on the MacBook and once on the Ubuntu PC.
# It prints no secret, email, organization or raw probe output. It reads no
# file content under ~/.claude-madventures-v5; it only stats one file there.
# It writes one report under ~/task45-host-facts and prints its SHA-256.
set -euo pipefail
export LC_ALL=C

OS=$(uname -s)
case "$OS" in Darwin|Linux) ;; *) echo "unsupported host: $OS"; exit 2;; esac
UIDN=$(id -u)
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
OUTDIR="$HOME/task45-host-facts"
mkdir -p "$OUTDIR"; chmod 700 "$OUTDIR"
REPORT="$OUTDIR/host-facts-$(echo "$OS" | tr A-Z a-z)-$STAMP.txt"
: > "$REPORT"; chmod 600 "$REPORT"
say() { printf '%s\n' "$*" | tee -a "$REPORT"; }

owner_mode() { # prints "<uid> <octal mode>" of a path, without reading it
  if [ "$OS" = Darwin ]; then stat -L -f '%u %Lp' "$1"; else stat -L -c '%u %a' "$1"; fi
}
real_dir() { (cd -P "$1" 2>/dev/null && pwd -P); }
inside() { [ "$1" = "$2" ] || case "$1" in "$2"/*) return 0;; *) return 1;; esac; }

# The five TMPDIR rules of PLAN-OPEN-2, applied to the value in $2.
tmpdir_rules() {
  local label=$1 value=$2 r ok=1 om
  say "$label: value $([ -n "$value" ] && echo present || echo missing)"
  if [ -n "$value" ] && [ "${value#/}" != "$value" ]; then say "  rule 1 (set, non-empty, absolute): pass"; else say "  rule 1 (set, non-empty, absolute): FAIL"; ok=0; fi
  r=$( [ -n "$value" ] && real_dir "$value" || true )
  if [ -n "$r" ]; then say "  rule 2 (realpath is an existing directory): pass ($r)"; else say "  rule 2 (realpath is an existing directory): FAIL"; ok=0; fi
  if [ -n "$r" ]; then
    om=$(owner_mode "$r")
    if [ "${om%% *}" = "$UIDN" ]; then say "  rule 3 (owned by uid $UIDN): pass"; else say "  rule 3 (owned by uid $UIDN): FAIL (owner ${om%% *})"; ok=0; fi
    if [ "${om##* }" = 700 ]; then say "  rule 4 (mode exactly 0700): pass"; else say "  rule 4 (mode exactly 0700): FAIL (mode ${om##* })"; ok=0; fi
    local t vt; t=$(real_dir /tmp); vt=$(real_dir /var/tmp)
    if inside "$r" "$t" || inside "$r" "$vt"; then say "  rule 5 (not /tmp or /var/tmp, nor inside them): FAIL ($t, $vt)"; ok=0; else say "  rule 5 (not /tmp or /var/tmp, nor inside them): pass"; fi
  else
    say "  rules 3 to 5: not evaluated"
  fi
  say "  $label overall: $([ $ok = 1 ] && echo PASS || echo FAIL)"
}

say "Task 45 host-facts check (DEC-20261013-01 B8)"
say "time_utc: $STAMP"
say "host: $OS $(uname -m)"
if [ "$OS" = Darwin ]; then say "os: macOS $(sw_vers -productVersion)"; else say "os: $(. /etc/os-release && echo "$PRETTY_NAME")"; fi
say "user: $(id -un) uid $UIDN"
say ""

say "== TMPDIR =="
tmpdir_rules "ambient TMPDIR" "${TMPDIR:-}"
if [ "$OS" = Linux ]; then tmpdir_rules "XDG_RUNTIME_DIR" "${XDG_RUNTIME_DIR:-}"; fi
say ""

say "== PATH components (PLAN-OPEN-2 PATH rules) =="
i=0; IFS=: read -r -a comps <<< "${PATH:-}"
for c in "${comps[@]}"; do
  i=$((i+1)); res=pass
  if [ -z "$c" ] || [ "${c#/}" = "$c" ] || [ ! -d "$c" ]; then res="FAIL (empty, relative or not a directory)"
  else
    om=$(owner_mode "$c"); o=${om%% *}; m=${om##* }
    if [ "$o" != 0 ] && [ "$o" != "$UIDN" ]; then res="FAIL (owner $o)"; fi
    if [ $(( 8#$m & 8#022 )) -ne 0 ]; then res="FAIL (mode $m is group- or world-writable)"; fi
  fi
  say "  $i $c: $res"
done
say ""

say "== madbridge-claude-v5 =="
MB=$(command -v madbridge-claude-v5 || true)
if [ -z "$MB" ]; then
  say "on PATH: no"
else
  say "on PATH: yes, in $(dirname "$MB")"
  say "version: $(env -i HOME="$HOME" PATH="$PATH" "$MB" --version 2>/dev/null | head -n 1 || echo unavailable)"
fi
say ""

if [ "$OS" = Linux ]; then
  CFG="$HOME/.claude-madventures-v5"
  say "== Ubuntu PC sign-in facts =="
  if [ -e "$CFG/.credentials.json" ]; then
    om=$(owner_mode "$CFG/.credentials.json"); say "credentials file in claude_config_dir: present, owner ${om%% *}, mode ${om##* }"
  else
    say "credentials file in claude_config_dir: absent"
  fi
  if [ -n "$MB" ] && [ -n "${XDG_RUNTIME_DIR:-}" ]; then
    WORK=$(mktemp -d "$XDG_RUNTIME_DIR/t45-facts.XXXXXX")
    PENV=(env -i HOME="$HOME" PATH="$PATH" SHELL="$SHELL" TERM="${TERM:-xterm-256color}" TMPDIR="$XDG_RUNTIME_DIR" CLAUDE_CONFIG_DIR="$CFG" USER="$(id -un)")
    # Auth-readiness probe: only the four predicate fields are kept.
    AUTH=$(cd "$WORK" && timeout 10 "${PENV[@]}" "$MB" auth status 2>/dev/null </dev/null || true)
    say "auth status predicate fields: $(printf '%s' "$AUTH" | bun -e '
      const t = await Bun.stdin.text(); let o; try { o = JSON.parse(t); } catch { console.log("unparseable"); process.exit(0); }
      const f = ["loggedIn","authMethod","apiProvider","subscriptionType"];
      console.log(f.map(k => k + "=" + (k in o ? JSON.stringify(o[k]) : "missing")).join(" "));')"
    AUTH=""
    # Identity probe: only whether the first system/init event carries a model
    # and a CLI version, and those two values, are kept.
    INIT=$(cd "$WORK" && printf '%s\n' '{"type":"user","message":{"role":"user","content":"Report session initialization."}}' \
      | timeout 60 "${PENV[@]}" "$MB" --print --input-format stream-json --output-format stream-json --verbose --no-session-persistence 2>/dev/null \
      | bun -e '
      for await (const line of console) { let e; try { e = JSON.parse(line); } catch { continue; }
        if (e?.type === "system" && e?.subtype === "init") {
          const m = typeof e.model === "string", v = typeof e.claude_code_version === "string";
          console.log("system/init: present; model " + (m ? "present (" + e.model + ")" : "missing") + "; CLI version " + (v ? "present (" + e.claude_code_version + ")" : "missing"));
          process.exit(0); } }
      console.log("system/init: absent");' || true)
    say "identity probe: ${INIT:-no output}"
    rm -rf "$WORK"
  else
    say "probes: not run (madbridge-claude-v5 not on PATH, or XDG_RUNTIME_DIR unset)"
  fi
  say ""
fi

say "report: $REPORT"
if [ "$OS" = Darwin ]; then shasum -a 256 "$REPORT"; else sha256sum "$REPORT"; fi
