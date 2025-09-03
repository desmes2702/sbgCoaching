// astro.config.ts — VERSION COMPLÈTE CORRIGÉE avec base et site

import { defineConfig } from 'astro/config';
import react   from '@astrojs/react';
import node    from '@astrojs/node';
import vercel  from '@astrojs/vercel';
import critters from 'astro-critters';
import { fileURLToPath } from 'url';
import path from 'path';

/* ---------- VARIABLES GLOBALES ---------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const isVercel = process.env.VERCEL === '1';
const isDev    = process.env.NODE_ENV === 'development';

const getAdapter = () =>
  isVercel
    ? vercel({ webAnalytics: { enabled: true } })
    : node({ mode: 'standalone' });

/* ---------- CONFIGURATION ASTRO ---------- */
export default defineConfig({
  /* ---------- SITE & BASE CONFIGURATION ---------- */
  site: 'https://sbgcoaching.be',      // ✅ URL canonique du site
  base: '/',                           // ✅ Force les chemins absolus (évite les 404)
  trailingSlash: 'ignore',            // ✅ Gestion cohérente des URLs

  /* ---------- INTÉGRATIONS ---------- */
  integrations: [
    react({ include: ['**/react/*', '**/partials/**/*.tsx'] }),
    critters({
      // Critical CSS inline pour de meilleures performances
    })
  ],

  /* ---------- ADAPTER ---------- */
  adapter: getAdapter(),
  output:  'server',

  /* ---------- VITE ---------- */
  vite: {
    /* ---- DEV SERVER ---- */
    server: {
      host: '0.0.0.0',
      port: 4321,
      strictPort: false,
      open: false,
      hmr: { port: 4322, overlay: true, clientPort: isDev ? 4322 : undefined },
      watch: {
        usePolling: process.platform === 'win32',
        interval: 100,
        binaryInterval: 300,
        ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**']
      }
    },

    /* ---- CSS/SCSS ---- */
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          additionalData: `@use "scss/abstracts" as *;`,
          charset: false,
          outputStyle: isDev ? 'expanded' : 'compressed',
          includePaths: [
            path.resolve(__dirname, 'src/scss'),
            path.resolve(__dirname, 'src/scss/abstracts'),
            path.resolve(__dirname, 'node_modules')
          ]
        }
      }
    },

    /* ---- ALIAS ---- */
    resolve: {
      alias: {
        '@':          path.resolve(__dirname, 'src'),
        '@scss':      path.resolve(__dirname, 'src/scss'),
        '@js':        path.resolve(__dirname, 'src/js'),
        '@partials':  path.resolve(__dirname, 'src/partials'),
        '@layouts':   path.resolve(__dirname, 'src/layouts'),
        '@perf':      path.resolve(__dirname, 'src/partials/components/perf'),
        '@components':path.resolve(__dirname, 'src/partials/components')
      }
    },

    /* ---- BUILD diff DEV/PROD ---- */
    ...(isDev
      ? {
          optimizeDeps: { include: ['react', 'react-dom'], force: false },
          cacheDir: 'node_modules/.vite',
          build:   { sourcemap: true, minify: false, cssCodeSplit: false }
        }
      : {
          build: {
            sourcemap:   false,
            minify:      'terser',
            cssCodeSplit:true,
            rollupOptions: {
              output: {
                manualChunks: {
                  'react-core': ['react', 'react-dom'],
                  'astro-core': ['@astrojs/react'],
                  vendor:       ['dompurify', 'nodemailer']
                },
                // ✅ Pas de modification des chemins CSS - laisse Astro gérer
                assetFileNames: info =>
                  info.name?.endsWith('.css')
                    ? '_astro/[name].[hash].css'      // ✅ Garde le préfixe _astro/
                    : '_astro/[name].[hash][extname]'
              }
            },
            cssMinify: 'lightningcss',
            terserOptions: { compress: { drop_console: true, drop_debugger: true } }
          }
        })
  },

  /* ---------- TOOLBAR DEV ---------- */
  ...(isDev && { devToolbar: { enabled: true } })
});
