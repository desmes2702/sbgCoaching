import { mkdirSync, cpSync } from 'fs';
import { join } from 'path';
const stamp = new Date().toISOString().replaceAll(':','-').slice(0,19);
const dest  = join('backups', stamp);
mkdirSync(dest, { recursive: true });
try { cpSync('src', join(dest, 'src'), { recursive: true }); } catch {}
try { cpSync('public', join(dest, 'public'), { recursive: true }); } catch {}
try {
  cpSync('.', join(dest, 'root'), {
    recursive: true,
    filter: (src) => ([
      'package.json','astro.config.ts','vercel.json','vite.config.ts',
      'tsconfig.json','tsconfig.node.json','.eslintrc.json','.stylelintrc.json',
      '.cspell.json','ensureOg.mjs'
    ].includes(src.replace(/^\.\/?/,''))
  )});
} catch {}
console.log(`[snapshot] Backup created in ${dest}`);
