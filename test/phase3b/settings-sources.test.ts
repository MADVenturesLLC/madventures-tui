import { expect, test } from "bun:test";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { managedSettingsDirectory } from "../../apps/madbridge/src/tui/live/managed-settings";
import { settingsSources } from "../../apps/madbridge/src/tui/live/settings-sources";
import { offlineStart } from "./offline";

test("managed settings selects the platform folder and refuses an unsupported platform", () => {
  const mac = "/Library/Application Support/ClaudeCode", linux = "/etc/claude-code";
  expect(managedSettingsDirectory("darwin")).toBe(mac);
  expect(managedSettingsDirectory("linux")).toBe(linux);
  expect(managedSettingsDirectory("win32")).toBeUndefined();
  expect(managedSettingsDirectory(process.platform)).toBe(process.platform === "darwin" ? mac : linux);
  const f = offlineStart();
  try {
    expect(settingsSources(f.work, f.config, f.managed, "win32")).toEqual({ ok: false, cause: "managed_settings_platform_unsupported" });
  } finally { f.dispose(); }
});

test("managed settings refuses unvalidated files and the governed remote copy", () => {
  const f = offlineStart();
  const check = () => settingsSources(f.work, f.config, f.managed);
  try {
    const fragments = join(f.managed, "managed-settings.d");
    mkdirSync(fragments);
    writeFileSync(join(fragments, ".hidden.json"), "{}");
    mkdirSync(join(fragments, "folder.json"));
    writeFileSync(join(fragments, "notes"), "");
    expect(check().ok).toBe(true);
    for (const path of [join(fragments, "policy.json"), join(f.managed, "managed-mcp.json")]) {
      writeFileSync(path, "{}");
      expect(check()).toEqual({ ok: false, cause: "managed_settings_unvalidated_source" });
      rmSync(path);
    }
    writeFileSync(join(f.config, "remote-settings.json"), "{}");
    expect(check()).toEqual({ ok: false, cause: "managed_settings_remote_copy" });
  } finally { f.dispose(); }
});

test("settings sources include the supplied user, managed, project and local directories", () => {
  const f = offlineStart();
  try {
    const sources = settingsSources(f.work, f.config, f.managed);
    expect(sources.ok).toBe(true);
    if (sources.ok) expect(sources.paths).toEqual([join(f.config, "settings.json"), join(f.managed, "managed-settings.json"),
      join(f.work, ".claude", "settings.json"), join(f.work, ".claude", "settings.local.json")]);
  } finally { f.dispose(); }
});
