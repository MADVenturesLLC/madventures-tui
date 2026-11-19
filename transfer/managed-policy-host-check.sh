cd ~ && bash -c '
set -u
OS=$(uname -s); echo "HOST: $OS $(uname -m), $(date -u +%Y-%m-%dT%H:%M:%SZ)"
case "$OS" in
  Darwin) D="/Library/Application Support/ClaudeCode";;
  Linux) D=/etc/claude-code;;
  *) echo "STOP: unsupported OS $OS"; exit 1;;
esac
kind() { if [ -L "$1" ]; then echo symlink; elif [ -d "$1" ]; then echo directory; elif [ -f "$1" ]; then echo file; elif [ -e "$1" ]; then echo other; else echo absent; fi; }
echo "managed folder $D: $(kind "$D")"
echo "  managed-settings.json: $(kind "$D/managed-settings.json")"
echo "  managed-mcp.json: $(kind "$D/managed-mcp.json")"
echo "  managed-settings.d: $(kind "$D/managed-settings.d")"
N=0; [ -d "$D/managed-settings.d" ] && N=$(find "$D/managed-settings.d" -mindepth 1 -maxdepth 1 -name "*.json" ! -name ".*" 2>/dev/null | wc -l | tr -d " ")
echo "  drop-in .json files, count only: $N"
O=0; [ -d "$D" ] && O=$(find "$D" -mindepth 1 -maxdepth 1 2>/dev/null | wc -l | tr -d " ")
echo "  entries in the folder, count only: $O"
P=0
if [ "$OS" = Darwin ]; then
  MP="/Library/Managed Preferences"; U=$(id -un)
  echo "macOS profile domain com.anthropic.claudecode, system-wide: $(kind "$MP/com.anthropic.claudecode.plist")"
  echo "macOS profile domain com.anthropic.claudecode, this user: $(kind "$MP/$U/com.anthropic.claudecode.plist")"
  P=$(find "$MP" -maxdepth 2 -iname "*anthropic*" 2>/dev/null | wc -l | tr -d " ")
  echo "managed-preference files naming anthropic, count only: $P"
fi
R=0
for C in "$HOME/.claude-madventures-v5" "$HOME/.claude"; do
  B=$(basename "$C")
  echo "config folder ~/$B: $(kind "$C")"
  if [ -d "$C" ]; then
    echo "  remote-settings.json: $(kind "$C/remote-settings.json")"
    [ -e "$C/remote-settings.json" ] && R=$((R+1))
    find "$C" -mindepth 1 -maxdepth 1 \( -iname "*remote*" -o -iname "*policy*" -o -iname "*managed*" \) 2>/dev/null | sed -e "s|.*/||" | sort | while IFS= read -r f; do echo "  name match, name only: $f"; done
  fi
done
echo "SUMMARY $OS: folder $(kind "$D"); main file $(kind "$D/managed-settings.json"); drop-ins $N; managed-mcp $(kind "$D/managed-mcp.json"); profile files $P; cached server copies $R"
' || echo STOPPED
