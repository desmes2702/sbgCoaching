import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import viteConfig from './vite.config.ts';

export default defineConfig({
  integrations: [react()],
  adapter: vercel(),
  vite: {
    ...viteConfig,
  },
});
