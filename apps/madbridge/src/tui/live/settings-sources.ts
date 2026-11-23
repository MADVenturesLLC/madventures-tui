import { lstatSync, readdirSync } from "node:fs";
import { isAbsolute, join } from "node:path";
import { managedSettingsDirectory } from "./managed-settings";

type Cause = "managed_settings_platform_unsupported" | "managed_settings_unvalidated_source" | "managed_settings_remote_copy";
type Sources = { ok: true; paths: readonly string[] } | { ok: false; cause: Cause };

function present(path: string): boolean {
  return lstatSync(path, { throwIfNoEntry: false }) !== undefined;
}

function unvalidated(folder: string): boolean {
  if (present(join(folder, "managed-mcp.json"))) return true;
  const fragments = join(folder, "managed-settings.d");
  if (!present(fragments)) return false;
  return readdirSync(fragments, { withFileTypes: true }).some(entry =>
    !entry.isDirectory() && entry.name.endsWith(".json") && !entry.name.startsWith("."));
}

export function settingsSources(workingDirectory: string, configFolder: string, managedFolder: string | undefined,
  platform: string = process.platform): Sources {
  const platformFolder = managedSettingsDirectory(platform);
  if (!platformFolder) return { ok: false, cause: "managed_settings_platform_unsupported" };
  const folder = managedFolder ?? platformFolder;
  try {
    if (!isAbsolute(folder) || !isAbsolute(configFolder) || !isAbsolute(workingDirectory) || unvalidated(folder)) {
      return { ok: false, cause: "managed_settings_unvalidated_source" };
    }
  } catch { return { ok: false, cause: "managed_settings_unvalidated_source" }; }
  try {
    if (present(join(configFolder, "remote-settings.json"))) return { ok: false, cause: "managed_settings_remote_copy" };
  } catch { return { ok: false, cause: "managed_settings_unvalidated_source" }; }
  return { ok: true, paths: [
    join(configFolder, "settings.json"), join(folder, "managed-settings.json"),
    join(workingDirectory, ".claude", "settings.json"), join(workingDirectory, ".claude", "settings.local.json"),
  ] };
}
