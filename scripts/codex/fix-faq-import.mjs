import { readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname, join, resolve } from 'path';

const file = 'src/partials/components/Faq.astro';
let code = readFileSync(file, 'utf8');
const dir = dirname(resolve(file));

// Cherche l'import fautif
const RE = /from\s+['"](\.\.\/\.\.\/js\/global\/_?faq)['"]/;
const m = code.match(RE);
if (!m) {
  console.log('ℹ️ Aucun import _faq/faq à corriger dans Faq.astro');
  process.exit(0);
}

// Essaie toutes les variantes possibles
const bases = ['../../js/global/_faq', '../../js/global/faq'];
const exts  = ['.ts', '.tsx', '.js', '.mjs'];
let fixed = null;

for (const b of bases) {
  for (const e of exts) {
    const abs = resolve(dir, b + e);
    if (existsSync(abs)) { fixed = b + e; break; }
  }
  if (fixed) break;
}

if (!fixed) {
  console.log('❌ Impossible de trouver le fichier _faq/faq avec extension (.ts/.tsx/.js/.mjs). Vérifie src/js/global/');
  process.exit(1);
}

code = code.replace(RE, `from '${fixed}'`);
writeFileSync(file, code);
console.log(`✅ Faq.astro corrigé → ${fixed}`);
