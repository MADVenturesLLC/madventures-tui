import { expect, test } from "bun:test";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

function filesUnder(root: string, prefix = ""): string[] {
  const paths: string[] = [];
  for (const entry of readdirSync(join(root, prefix), { withFileTypes: true })) {
    const relative = prefix + entry.name;
    if (entry.isDirectory()) paths.push(...filesUnder(root, relative + "/"));
    else {
      expect(entry.isFile()).toBe(true);
      paths.push(relative);
    }
  }
  return paths;
}

for (const folder of ["recorded"]) {
  test(folder + " manifest covers every fixture and matches its SHA-256", () => {
    const root = fileURLToPath(new URL("./fixtures/" + folder + "/", import.meta.url));
    const [header, ...rows] = readFileSync(join(root, "manifest.tsv"), "utf8").trimEnd().split("\n");
    expect(header!.split("\t").slice(0, 2)).toEqual(["fixture", "sha256"]);
    const entries = rows.map(row => {
      const [file, digest] = row.split("\t");
      if (!file || !digest || !/^[a-f0-9]{64}$/.test(digest)) throw new Error("Invalid fixture manifest row: " + row);
      return { file, digest };
    });
    // Comparing the sorted arrays detects duplicates as well as omissions.
    const files = filesUnder(root).filter(file => file !== "manifest.tsv").sort();
    expect(entries.map(entry => entry.file).sort()).toEqual(files);
    for (const { file, digest } of entries) {
      const bytes = readFileSync(join(root, file));
      expect({ file, digest: new Bun.CryptoHasher("sha256").update(bytes).digest("hex") }).toEqual({ file, digest });
    }
  });
}
