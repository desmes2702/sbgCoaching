import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';
import { visualizer } from 'rollup-plugin-visualizer'; // 👈 AJOUT ICI

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Ouvre le rapport dans ton navigateur à la fin du build
      filename: 'dist/stats.html', // Tu peux changer l’emplacement si tu veux
      gzipSize: true,
      brotliSize: true,
    })
    // ...d'autres plugins ici si besoin
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
        postcssPresetEnv({
          features: {
            'nesting-rules': true
          }
        }),
        cssnano({
          preset: ['default', {
            discardComments: {
              removeAll: true
            },
            normalizeWhitespace: true,
            minifyFontValues: true,
            minifyGradients: true
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
          'vendor': ['react', 'react-dom'],
          'styles': ['@/scss/main.scss']
        },
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    cssCodeSplit: false,
    sourcemap: false,
    target: 'esnext',
    assetsInlineLimit: 4096,
  },
});
