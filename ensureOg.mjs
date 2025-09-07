import { existsSync, copyFileSync } from 'fs';
import { resolve } from 'path';
const dest = resolve('public/img/og-default.webp');
const candidates = [
  resolve('public/img/about__hero.webp'),
  resolve('public/img/program1.webp'),
  resolve('public/img/hero__bck-768.webp'),
  resolve('public/img/hero__bck-320.webp'),
];
try {
  if (!existsSync(dest)) {
    const src = candidates.find((p) => existsSync(p));
    if (src) {
      copyFileSync(src, dest);
      console.log(`[ensureOg] Created og-default.webp from: ${src}`);
    } else {
      console.warn('[ensureOg] Could not create og-default.webp (no source candidate found).');
    }
  } else {
    console.log('[ensureOg] og-default.webp already exists.');
  }
} catch (e) {
  console.warn('[ensureOg] Failed to ensure og-default.webp:', e?.message || e);
}
