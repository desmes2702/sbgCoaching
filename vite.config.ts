import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';

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
    // Optimisations CSS
    devSourcemap: false,
    modules: {
      generateScopedName: '[hash:base64:8]'
    },
    // Optimisations de chargement
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
    // Optimisations de build
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
        // Optimisation des noms de fichiers
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    // Optimisations supplémentaires
    cssCodeSplit: false, // Désactivé pour avoir un seul fichier CSS
    sourcemap: false,
    target: 'esnext',
    assetsInlineLimit: 4096, 
  },
});
