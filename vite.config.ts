import { defineConfig } from "vite";

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import tsconfigPaths from "vite-tsconfig-paths";
import postcssPresetEnv from "postcss-preset-env";
import cssnano from "cssnano";
import { visualizer } from "rollup-plugin-visualizer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    tsconfigPaths(), // align Vite with tsconfig paths
    visualizer({
      filename: "stats.html",
      template: "treemap",
      gzipSize: true,
      brotliSize: true,
      open: false,
    }),
  ],
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
    // ✅ Sass resolves "abstracts/globals" via the paths below
    preprocessorOptions: {
      scss: {
        includePaths: [
          resolve(__dirname, "src/scss"),
          resolve(__dirname, "src"), // optionnel (permits "scss/..." if needed)
        ],
        // ✅ Global injection (Sass understands this path)
        additionalData: `@use "abstracts/globals" as *;`,
        // silenceDeprecations: ["legacy-js-api"], // facultatif
      },
    },
    postcss: {
      plugins: [
        postcssPresetEnv({
          stage: 1,
          autoprefixer: { grid: true },
          features: { "nesting-rules": true },
        }),
        cssnano({
          preset: ["default", { discardComments: { removeAll: true } }],
        }),
      ],
    },
    devSourcemap: true,
  },
  server: {
    strictPort: true,
    port: 4321,
    open: false,
  },
  build: {
    target: "esnext",
    assetsInlineLimit: 4096,
    sourcemap: false,
  },
});
