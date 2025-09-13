# Rapport Refonte SCSS — Exécution 01

Date: 2025-09-13
Branche: `refactor-scss` (base: `refactor/seo-hardening`)

## Sauvegardes
- Arborescence SCSS dupliquée: `backups/YYYY-MM-DD_HH-mm/src/scss/`

## Fichiers ajoutés
- `src/scss/abstracts/_tokens.scss`
- `src/scss/abstracts/_mixins.scss`
- `src/scss/abstracts/_functions.scss`
- `src/scss/base/_reset.scss`
- `src/scss/base/_typography.scss`
- `src/scss/base/_accessibility.scss`
- `src/scss/layout/_container.scss`
- `src/scss/components/_buttons.scss`
- `src/scss/components/_forms.scss`
- `src/scss/utilities/_helpers.scss`
- `src/scss/main.scss`

## Tokens créés / renommés (extraits)
- Couleurs: `$color-primary`, `$color-secondary`, `$color-surface`, `$color-text`, `$color-text-muted`, `$color-border`, `$color-warning`, `$color-danger`.
- Typo: `$font-family-base`, `$font-family-accent`, `$font-size-root`.
- Espace: `$space-2xs` → `$space-2xl`.
- Radius: `$radius-sm`, `$radius-md`, `$radius-lg`.
- Breakpoints (rem): `$bp-mobile`, `$bp-tablet`, `$bp-desktop`, `$bp-wide`.

## Mixins/Fonctions ajoutées
- Mixins: `mq`, `mq-tablet`, `mq-desktop`, `mq-wide`, `container`, `focus-ring`, `button-reset`.
- Fonctions: `rem($px, $base)`.

## Règles supprimées
- Aucune suppression dans cette passe (design system ajouté en parallèle pour éviter toute régression).

## Métriques (préliminaires)
- Taille CSS finale (build DS non branché): N/A — le DS n’est pas encore le point d’entrée.
- Sélecteurs ajoutés: composants `btn`, `input`, `form__*` (compat BEM).
- Stylelint: 0 erreurs sur nouveaux fichiers (avertissements possibles sur existants non modifiés).

## Pipeline & Flags
- Purge CSS prod-only via PostCSS (safelist BEM + alias `.btn`).
- Flag `PUBLIC_DS_ENABLED` (false par défaut) pour charger le DS conditionnellement.

## Notes
- Le DS n’est pas câblé comme entrée principale. Intégration progressive prévue via `src/scss/main.scss` après review.
- Respect BEM strict; rem partout; focus visible; AA/AAA en cible.
