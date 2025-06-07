import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel';
import netlify from '@astrojs/netlify';
import viteConfig from './vite.config.ts';

// Détermine l'environnement
const isVercel = process.env.VERCEL === '1';
const isNetlify = process.env.NETLIFY === 'true';

// Sélectionne l'adaptateur approprié
const getAdapter = () => {
  if (isVercel) return vercel();
  if (isNetlify) return netlify();
  return node({ mode: 'standalone' });
};

export default defineConfig({
  integrations: [react()],
  adapter: getAdapter(),
  vite: {
    ...viteConfig,
  },
});
