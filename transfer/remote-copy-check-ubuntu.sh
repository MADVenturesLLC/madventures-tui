cd ~ && bash -c '
set -u
echo "HOST: $(uname -s) $(uname -m), $(date -u +%Y-%m-%dT%H:%M:%SZ)"
for C in "$HOME/.claude-madventures-v5" "$HOME/.claude"; do
  F="$C/remote-settings.json"; B=$(basename "$C")
  if [ -e "$F" ]; then
    echo "~/$B/remote-settings.json: present; $(stat -c "%s bytes, modified %y, owner %U, mode %a" "$F")"
    python3 -I - "$F" <<PY
import json, sys
try:
    d = json.load(open(sys.argv[1]))
except Exception as e:
    print("  not parseable as JSON:", type(e).__name__)
    sys.exit(0)
print("  top-level type:", type(d).__name__)
if isinstance(d, dict):
    print("  top-level keys, names only:", " ".join(sorted(d)) or "(none)")
    for k in sorted(d):
        v = d[k]
        if isinstance(v, dict):
            print("  under " + k + ": an object with", len(v), "keys")
        elif isinstance(v, list):
            print("  under " + k + ": a list of", len(v), "items")
elif isinstance(d, list):
    print("  a list of", len(d), "items")
PY
  else
    echo "~/$B/remote-settings.json: absent"
  fi
done
' || echo STOPPED
