import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { visualizer } from 'rollup-plugin-visualizer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  plugins: [
    // Analyse de bundle en développement uniquement
    ...(isDev ? [
      visualizer({
        filename: 'stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
        template: 'treemap'
      })
    ] : [])
  ],

  // Configuration serveur optimisée
  server: {
    open: true,
    strictPort: true,
    host: true,
    cors: true,
    hmr: {
      overlay: true
      // clientPort: undefined supprimé - incompatible avec exactOptionalPropertyTypes
    }
  },

  // Alias centralisés (utilisés par Astro)
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

  // Build optimisé pour production
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 500,
    cssCodeSplit: false,
    
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2
      },
      mangle: {
        safari10: true
      }
    },

    rollupOptions: {
      treeshake: {
        preset: 'recommended'
        // pureResultProperty: true supprimé - n'existe pas dans TreeshakingOptions
      },
      output: {
        experimentalMinChunkSize: 1000,
        compact: true
      }
    }
  },

  // Optimisation des dépendances
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime'
    ],
    exclude: [
      '@astrojs/check',
      'astro'
    ]
  },

  // Configuration pour l'analyse CSS
  css: {
    devSourcemap: isDev
  }
});
