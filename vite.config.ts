import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// 🔁 Créer __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  server: {
    open: true,
    strictPort: true,
    proxy: {},
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@scss": resolve(__dirname, "src/scss"),
      "@js": resolve(__dirname, "src/js"),
      "@partials": resolve(__dirname, "src/partials"),
      "@layouts": resolve(__dirname, "src/layouts"),
      "@perf": resolve(__dirname, "src/partials/components/perf"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Tu peux ajouter des variables SCSS globales ici via `additionalData`
        // additionalData: `@use "@scss/abstracts/globals" as *;`
      },
    },
  },
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 600,
  },
});
