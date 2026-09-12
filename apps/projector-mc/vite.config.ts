// apps/projector-mc/vite.config.ts
// Thin-client projector: dev server binds all interfaces so the laptop can
// point at the host; fixture env is read with the MADV_ prefix.

import { defineConfig } from "vite";

const pkg = (name: string): string => new URL(`../../packages/${name}/src/index.ts`, import.meta.url).pathname;

export default defineConfig({
  esbuild: { jsx: "automatic" },
  envPrefix: "MADV_",
  resolve: {
    alias: {
      "@mad/build-memory": pkg("build-memory"),
      "@mad/single-verdict": pkg("single-verdict"),
      "@mad/claim-boundary": pkg("claim-boundary"),
    },
  },
  server: { host: true, port: 5180, strictPort: true },
  preview: { host: true, port: 5180, strictPort: true },
  build: { outDir: "dist" },
});
