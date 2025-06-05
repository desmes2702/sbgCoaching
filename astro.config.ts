import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node'; // ✅
import viteConfig from './vite.config.ts';

export default defineConfig({
  integrations: [react()],
  adapter: node({ mode: 'standalone' }), // ✅ Build static clean
  output: 'static',
  vite: {
    ...viteConfig,
  },
});
