# SCSS Design System — Refonte (branche `refactor-scss`)

Origine: Branche créée à partir de `refactor/seo-hardening` (Vercel public), refonte Design System SCSS agence, auditée et prête pour review et tests. Aucun branchement en prod tant qu’aucune review n’est validée.

## Arborescence
```
src/scss/
  abstracts/   _tokens.scss, _mixins.scss, _functions.scss
  base/        _reset.scss, _typography.scss, _accessibility.scss
  layout/      _container.scss
  components/  _buttons.scss, _forms.scss
  pages/       (à compléter)
  themes/      (à compléter)
  utilities/   _helpers.scss
  main.scss    // point d’entrée unique
```

## Tokens (extraits)
- Couleurs
  - `$color-primary`: Couleur principale des CTA sur fonds sombres.
  - `$color-text`: Couleur du texte par défaut.
- Typo
  - `$font-family-base`: Police par défaut.
  - `$font-size-root`: Base (1rem = 16px).
- Espacements (rem): `$space-xs`, `$space-sm`, `$space-md`, …
- Radius: `$radius-sm`, `$radius-md`, `$radius-lg`
- Breakpoints (rem): `$bp-mobile`, `$bp-tablet`, `$bp-desktop`, `$bp-wide`

## Mixins & Fonctions
- `@mixin mq($min)` / `mq-tablet|mq-desktop|mq-wide`
- `@mixin container($max)`
- `@mixin focus-ring($color)`
- `@mixin button-reset`
- `@function rem($px, $base: 16)` → remify pixels

## Conventions
- BEM strict (`.button`, `.button--primary`, `.button__icon`)
- rem partout (pas de clamp())
- :focus-visible visible clavier; neutralisation possible via mixins
- Interdits: `!important` sauf justification commentée, `px` (sauf hairlines documentées)

## Accessibilité
- Contrastes AA/AAA pour les états par défaut et `:hover/:focus/:active`.
- Styles de focus visibles via `@include focus-ring()`.
- Zones de hit ≥ 44px logiques quand pertinent.

## Pipeline build/purge
- Minification: gérée par Vite/Astro + PostCSS.
- Purge CSS prod-only: PostCSS (`postcss.config.js`) active `@fullhuman/postcss-purgecss` uniquement si `NODE_ENV=production` avec safelist:
  - standard: `sr-only`, `visually-hidden`
  - deep: `/^btn/`, `/^button/`, `/^form__/`, `/^input/`, `/^is-/`, `/^has-/`
- DS conditionnel: `PUBLIC_DS_ENABLED` (false par défaut). Si true, le layout charge `@scss/main.scss` via un `<link>` côté head.
- Bouton primaire: couleur texte auto via `contrast-text()` selon le fond `$color-primary`.

## Migration Guide
- Les classes BEM existentes sont conservées. Nouvelle implémentation documentée dans `components/`.
- Déprécations: documenter au fil des intégrations.

## Comment utiliser
- Importer `src/scss/main.scss` comme point d’entrée unique.
- Progressivement mapper les pages/composants vers les nouveaux partiels.
