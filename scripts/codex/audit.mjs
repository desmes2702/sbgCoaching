import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
const out=[];const ok=m=>out.push('✅ '+m);const ko=m=>out.push('❌ '+m);const info=m=>out.push('ℹ️ '+m);
const read=p=>{ try{ return readFileSync(p,'utf8'); }catch{ return null; } };
const walk=(d,exts)=>{ const L=[]; function rec(x){ for(const f of readdirSync(x)){ const p=join(x,f); const s=statSync(p); if(s.isDirectory()) rec(p); else if(!exts||exts.includes(extname(p))) L.push(p);} } try{rec(d);}catch{} return L; };
const has=p=>existsSync(p);

// 1) package.json scripts
const pkgRaw = read('package.json');
if(!pkgRaw){ ko('package.json introuvable.'); } else {
  const pkg = JSON.parse(pkgRaw);
  const prebuild = pkg?.scripts?.prebuild || '';
  const precodex = pkg?.scripts?.precodex || '';
  prebuild.includes('ensureOg.mjs') ? ok('prebuild exécute ensureOg.mjs') : ko('prebuild n’exécute pas ensureOg.mjs');
  precodex ? ok('scripts.precodex présent (snapshot).') : ko('scripts.precodex manquant.');
}

// 2) ensureOg.mjs présent
has('ensureOg.mjs') ? ok('ensureOg.mjs présent à la racine.') : ko('ensureOg.mjs manquant.');

// 3) OG fallback matériel
has('public/img/og-default.webp') ? ok('public/img/og-default.webp présent.') : ko('public/img/og-default.webp absent.');

// 4) vite.config: cssCodeSplit:false
const vite = read('vite.config.ts') || read('vite.config.js');
if(!vite){ ko('vite.config introuvable.'); }
else { /cssCodeSplit\s*:\s*false/.test(vite) ? ok('Vite: cssCodeSplit:false (bundle CSS unique).') : ko('Vite: cssCodeSplit:false NON détecté.'); }

// 5) astro.config: site/base/trailingSlash
const astro = read('astro.config.ts') || read('astro.config.mjs') || read('astro.config.js');
if(!astro){ ko('astro.config introuvable.'); }
else {
  /site:\s*['"]https?:\/\/sbgcoaching\.be\/?['"]/.test(astro) ? ok('Astro: site = https://sbgcoaching.be/') : ko('Astro: site non défini sur https://sbgcoaching.be/');
  /base:\s*['"]\/['"]/.test(astro) ? ok('Astro: base = "/"') : info('Astro: base non défini (OK par défaut).');
  /trailingSlash:\s*['"](ignore|never|always)['"]/.test(astro) ? ok('Astro: trailingSlash défini.') : info('Astro: trailingSlash non défini (OK par défaut).');
}

// 6) Liens CSS hardcodés dans .astro
const astroFiles = walk('src', null).filter(p=>p.endsWith('.astro'));
let hard=0;
for(const f of astroFiles){
  const t=read(f);
  if(t && /<link[^>]+rel=["']stylesheet["'][^>]*>/.test(t)){ hard++; out.push('⚠️  Lien CSS hardcodé: '+f); }
}
hard===0 ? ok('Aucun <link rel="stylesheet"> hardcodé (OK).') : ko('Liens CSS hardcodés détectés.');

// 7) SCSS: underscores interdits dans @use/@forward
const scssFiles = walk('src', ['.scss']);
let u=0; const RE_BAD=/@(use|forward)\s+["'][^"']*\/_[^"']*["']/g;
for(const f of scssFiles){ const t=read(f); if(t && RE_BAD.test(t)){ u++; out.push('❌ Underscore dans @use/@forward: '+f); } }
u===0 ? ok('SCSS OK: pas d’underscore dans @use/@forward.') : ko('SCSS: underscores détectés.');

// 8) Imports sans extension
const tsLike = walk('src', ['.ts','.tsx','.astro','.js','.mjs']);
let noExt=0; const RE_IMPORT=/from\s+['"](@?\/[^'"]+|@[^'"]+|\.{1,2}\/[^'"]+)['"]/g;
const looksPkg=s=>!s.startsWith('.') && !s.startsWith('/') && !s.startsWith('@/') && !s.startsWith('@scss') && !s.startsWith('@partials') && !s.startsWith('@layouts');
const hasExt=s=>/\.(ts|tsx|astro|js|mjs)$/.test(s);
for(const f of tsLike){ const t=read(f); if(!t) continue; for(const m of t.matchAll(RE_IMPORT)){ const spec=m[1]; if(looksPkg(spec)) continue; if(!hasExt(spec)){ noExt++; out.push('❌ Import sans extension ('+spec+') dans: '+f); } } }
noExt===0 ? ok('Imports locaux: extensions OK (.ts/.tsx/.astro).') : ko('Imports locaux sans extension détectés.');

console.log('\n=== RAPPORT CODEX ==='); for(const l of out) console.log(l);
process.exitCode = out.some(l=>l.startsWith('❌')) ? 1 : 0;
