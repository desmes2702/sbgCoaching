// scripts/report-css-size.mjs
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const dist = join(root, 'dist');
const reportPath = join(root, 'reports', 'SCSS-REFONTE01.md');

async function listCss(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (e) => {
    const res = join(dir, e.name);
    if (e.isDirectory()) return listCss(res);
    return res.endsWith('.css') ? [res] : [];
  }));
  return files.flat();
}

function fmt(bytes) {
  const kb = bytes / 1024;
  const mb = kb / 1024;
  if (mb >= 1) return `${mb.toFixed(2)} MB`;
  return `${kb.toFixed(2)} KB`;
}

async function run() {
  const cssFiles = await listCss(dist);
  let total = 0;
  for (const f of cssFiles) {
    const stat = await fs.stat(f);
    total += stat.size;
  }
  const line = `\n### Build métriques (flag ON local)\n- Fichiers CSS: ${cssFiles.length}\n- Taille totale CSS minifiée (prod+purge): **${fmt(total)}** (${total} bytes)\n- Date: ${new Date().toISOString()}\n`;
  await fs.appendFile(reportPath, line, 'utf8');
  console.log(line);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

