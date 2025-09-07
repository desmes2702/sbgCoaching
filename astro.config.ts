// astro.config.ts — SOLUTION FINALE AVEC ENUMCHANGEFREQ

import { defineConfig } from 'astro/config';
import react   from '@astrojs/react';
import node    from '@astrojs/node';
import vercel  from '@astrojs/vercel';
import critters from 'astro-critters';
import sitemap from '@astrojs/sitemap';

// Define EnumChangefreq locally if not available from the package
enum EnumChangefreq {
  ALWAYS = "always",
  HOURLY = "hourly",
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
  NEVER = "never"
}
import { visualizer } from 'rollup-plugin-visualizer';
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
  site: 'https://sbgcoaching.be',
  base: '/',
  trailingSlash: 'never',

  /* ---------- INTÉGRATIONS ---------- */
  integrations: [
    react({ include: ['**/react/*', '**/partials/**/*.tsx'] }),
    critters({
      // Critical CSS inline pour de meilleures performances
    }),
    sitemap({
      customPages: [
        'https://sbgcoaching.be/',
        'https://sbgcoaching.be/coaching-sportif-video',
        'https://sbgcoaching.be/coaching-entreprise',      
        'https://sbgcoaching.be/coaching-general',         
        'https://sbgcoaching.be/temoignages',
        'https://sbgcoaching.be/contact'
      ],
      filter: (page) => {
        const isRoot = page === 'https://sbgcoaching.be/';
        const hasTrailingSlash = /.+\/$/.test(page);
        const isAsset = page.includes('/_astro/') || page.includes('/dist/') || page.includes('/admin/') || page.includes('/api/');
        const isProgramme = page.includes('/programme');
        return (isRoot || !hasTrailingSlash) && !isAsset && !isProgramme;
      },
  changefreq: EnumChangefreq.WEEKLY,  // enum value
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        if (item.url === 'https://sbgcoaching.be/') {
          item.priority = 1.0;
          item.changefreq = EnumChangefreq.WEEKLY;  // enum value
        } else if (item.url.includes('coaching-sportif-video')) {
          item.priority = 0.9;
          item.changefreq = EnumChangefreq.WEEKLY;
        } else if (item.url.includes('coaching-entreprise')) {
          item.priority = 0.9;
          item.changefreq = EnumChangefreq.WEEKLY;
        } else if (item.url.includes('coaching-general')) {
          item.priority = 0.8;
          item.changefreq = EnumChangefreq.WEEKLY;
        } else if (item.url.includes('temoignages')) {
          item.priority = 0.8;
          item.changefreq = EnumChangefreq.MONTHLY;  // enum value
        } else if (item.url.includes('contact')) {
          item.priority = 0.7;
          item.changefreq = EnumChangefreq.MONTHLY;
        }
        return item;
      }
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
              /* ---- VISUALIZER INTÉGRÉ ---- */
              plugins: [
                visualizer({
                  filename: './dist/bundle-report.html',
                  open: true,
                  gzipSize: true,
                  brotliSize: true,
                  template: 'treemap'
                })
              ],
              output: {
                manualChunks: {
                  'react-core': ['react', 'react-dom'],
                  'astro-core': ['@astrojs/react'],
                  vendor:       ['dompurify', 'nodemailer']
                },
                assetFileNames: info =>
                  info.name?.endsWith('.css')
                    ? '_astro/[name].[hash].css'
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
