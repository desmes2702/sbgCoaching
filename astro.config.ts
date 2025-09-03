import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel';
import { fileURLToPath } from 'url';
import path from 'path';

// Configuration compatible Windows/Mac/Linux
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isVercel = process.env.VERCEL === '1';

const getAdapter = () => {
  if (isVercel) return vercel({
    webAnalytics: { enabled: true }
  });
  return node({ mode: 'standalone' });
};

export default defineConfig({
  integrations: [
    react({
      include: ['**/react/*', '**/partials/**/*.tsx']
    })
  ],
  adapter: getAdapter(),
  output: 'server',
  
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "src/scss/abstracts/_variables.scss" as *;
            @use "src/scss/abstracts/_mixins.scss" as *;
            @use "src/scss/abstracts/_functions.scss" as *;
          `
        }
      }
    },
    
    // 🔧 CORRECTION : Alias compatible Windows
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@scss": path.resolve(__dirname, "src/scss"),
        "@js": path.resolve(__dirname, "src/js"),
        "@partials": path.resolve(__dirname, "src/partials"),
        "@layouts": path.resolve(__dirname, "src/layouts"),
        "@perf": path.resolve(__dirname, "src/partials/components/perf"),
      }
    },

    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-core': ['react', 'react-dom'],
            'astro-core': ['@astrojs/react']
          }
        }
      }
    }
  }
});
