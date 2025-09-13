// postcss.config.js
import postcssPresetEnv from 'postcss-preset-env';
let cssnano = null;
let purgecss = null;

const isProd = process.env.NODE_ENV === 'production';

try { cssnano = (await import('cssnano')).default; } catch {}
try { purgecss = (await import('@fullhuman/postcss-purgecss')).default; } catch {}

export default {
  plugins: [
    postcssPresetEnv({ stage: 3 }),
    isProd && purgecss && purgecss({
      content: [
        './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
        './public/**/*.html'
      ],
      defaultExtractor: (content) => content.match(/[\w-/:@%]+(?<!:)/g) || [],
      safelist: {
        standard: ['sr-only', 'visually-hidden'],
        deep: [/^btn/, /^button/, /^form__/, /^input/, /^is-/, /^has-/]
      }
    }),
    isProd && cssnano && cssnano({ preset: 'default' })
  ].filter(Boolean)
};

