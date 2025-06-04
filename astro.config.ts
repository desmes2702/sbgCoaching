import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify'; // ✅ Adapter ajouté
import viteConfig from './vite.config.ts';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  integrations: [react()],
  adapter: netlify(), // ✅ Ajout ici
  vite: {
    ...viteConfig,
  },
});
