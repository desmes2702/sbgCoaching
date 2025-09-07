import { readdirSync, statSync, readFileSync, writeFileSync, existsSync, rmSync } from 'fs';
import { join } from 'path';

function walk(dir, pred) {
  const out = [];
  (function rec(d){
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      const s = statSync(p);
      if (s.isDirectory()) rec(p); else if (!pred || pred(p)) out.push(p);
    }
  })(dir);
  return out;
}

// 0) Purger le cache stylelint (évite les restes)
try { if (existsSync('.stylelintcache')) rmSync('.stylelintcache'); } catch {}

// 1) Fixer tous les @use/@forward : retirer l'underscore après début/"/"
const files = walk('src/scss', p => p.endsWith('.scss'));
const RE = /@(use|forward)\s+(['"])([^'"]+)\2/g;
let changed = 0;

for (const f of files) {
  let txt = readFileSync(f, 'utf8');
  const before = txt;

  txt = txt.replace(RE, (m, kw, q, path) => {
    // supprime "_" au début du nom importé et après chaque '/'
    const fixed = path.replace(/(^|\/)_/g, '$1');
    return `@${kw} ${q}${fixed}${q}`;
  });

  if (txt !== before) {
    writeFileSync(f, txt);
    changed++;
    console.log('��� imports SCSS fix ->', f);
  }
}

// 2) Ajouter un fallback générique à TOUTES les font-family sans serif/monospace
const fontTargets = [
  'src/scss/pages/informations/rdv/_summary.scss',
  // tu peux en ajouter d'autres ici si besoin
];

for (const f of fontTargets) {
  if (!existsSync(f)) continue;
  let t = readFileSync(f, 'utf8');
  const before = t;
  t = t.replace(/font-family\s*:\s*([^;]+);/gi, (m, val) => {
    const v = val.trim();
    return /(serif|sans-serif|monospace)/i.test(v) ? m : `font-family: ${v}, sans-serif;`;
  });
  if (t !== before) {
    writeFileSync(f, t);
    console.log('��� font-family fallback ->', f);
  }
}

console.log(`\n✅ Terminé. Fichiers import SCSS modifiés: ${changed}`);
