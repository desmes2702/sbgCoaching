import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, resolve } from 'path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const aliasMap = {
  '@/': 'src/',
  '@partials/': 'src/partials/',
  '@scss/': 'src/scss/',
  '@layouts/': 'src/layouts/',
  '@': 'src/',
};

function resolveAlias(spec) {
  for (const [alias, target] of Object.entries(aliasMap)) {
    if (spec.startsWith(alias)) return join(ROOT, spec.replace(alias, target));
  }
  if (spec.startsWith('./') || spec.startsWith('../') || spec.startsWith('/')) {
    return resolve(spec.startsWith('/') ? join(ROOT, spec) : spec);
  }
  return null;
}

function tryWithExt(base) {
  const exts = ['.astro', '.tsx', '.ts', '.js', '.mjs'];
  for (const ext of exts) {
    if (existsSync(base + ext)) return ext;
    const idx = join(base, 'index' + ext);
    if (existsSync(idx)) return '/index' + ext;
  }
  return null;
}

function walk(dir, pred) {
  const out=[];
  (function rec(d){
    for (const f of readdirSync(d)) {
      const p = join(d,f), s = statSync(p);
      if (s.isDirectory()) rec(p); else if (pred(p)) out.push(p);
    }
  })(dir);
  return out;
}

const files = walk(SRC, p => /\.(astro|tsx|ts|js|mjs)$/.test(p));
const RE = /from\s+['"](@?\/[^'"]+|@[^'"]+|\.{1,2}\/[^'"]+)['"]/g;

let changed = 0;
for (const file of files) {
  let txt = readFileSync(file, 'utf8'), mod = false;
  const dir = dirname(file);
  txt = txt.replace(RE, (m, spec) => {
    if (!spec.startsWith('.') && !spec.startsWith('/') && !spec.startsWith('@')) return m;
    if (/\.(astro|tsx|ts|js|mjs)$/.test(spec)) return m;
    const abs = resolveAlias(spec) ?? resolve(dir, spec);
    const ext = tryWithExt(abs);
    if (!ext) return m;
    mod = true;
    return m.replace(spec, spec + ext);
  });
  if (mod) { writeFileSync(file, txt); changed++; console.log('í´§ Fix:', file); }
}
console.log(`\nâœ… Imports corrigÃ©s: ${changed} fichier(s).`);
