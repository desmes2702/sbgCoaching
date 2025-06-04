import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import viteConfig from './vite.config.ts';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ✅ recrée __dirname pour le contexte ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  integrations: [react()],
  vite: {
    ...viteConfig,
  },
});
