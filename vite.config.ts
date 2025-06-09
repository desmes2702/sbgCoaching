import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';
import { visualizer } from 'rollup-plugin-visualizer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    visualizer({
      filename: 'stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
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
        // additionalData: `@use "@scss/abstracts/globals" as *;`
      },
    },
    devSourcemap: false,
    modules: {
      generateScopedName: '[hash:base64:8]'
    },
    postcss: {
      plugins: [
        postcssPresetEnv(),
        cssnano({
          preset: ['default', {
            discardComments: {
              removeAll: true
            },
            normalizeWhitespace: true
          }]
        })
      ]
    }
  },
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 600,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@astrojs/react']
        },
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    cssMinify: true,
    cssCodeSplit: false,
    sourcemap: false,
    target: 'esnext',
    assetsInlineLimit: 4096,
  },
});
