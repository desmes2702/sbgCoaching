import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel';
import viteConfig from './vite.config.ts';

// Détermine si nous sommes en production (Vercel) ou en développement
const isProduction = process.env.VERCEL === '1';

export default defineConfig({
  integrations: [react()],
  adapter: isProduction ? vercel() : node({
    mode: 'standalone'
  }),
  vite: {
    ...viteConfig,
  },
});
