export function managedSettingsDirectory(platform: string): string | undefined {
  if (platform === "darwin") return "/Library/Application Support/ClaudeCode";
  if (platform === "linux") return "/etc/claude-code";
}
