# Mapping BEM — Classique ↔ Multimodal

Objectif: réutiliser en priorité les classes du formulaire « classique » dans le multimodal, sans casser le BEM. Ajouts limités à des modificateurs/éléments nécessaires.

- Racine / structure
  - Classique → Multimodal
  - `form` → `form form--multistep rdv-form`
  - `form__fieldset` → `form__fieldset`
  - `form__legend` → `form__legend` (utilisé comme titre d’étape sur certains écrans)
  - `form__question__group` → `form__question__group`
  - `form__summary` → repris dans StepReview via classes `step-review__*` avec extensions ciblées

- Saisie / contrôles
  - `form__label` (classique) → `rdv-form__label form__label` (multimodal)
  - `form__input` / `form__textarea` (classique) → `input` (multimodal, réutilise style global RDV)
  - `form__error` (classique) → `form__error`
  - `form__question__choices` + `form__question__choice` (classique) → idem; sélection: `is-selected`

- Navigation
  - Boutons classiques: `button / button-red / button-darker` → multimodal: `btn / btn--primary / btn--ghost`
  - Groupe d’actions: `wrapper__button`/`form__next`/`form__back` → `rdv-form__nav` + `btn` (mapping via uiClasses)

- Progression / header
  - Classique: `form__timeline*` → Multimodal: `rdv-form__header`, `rdv-form__progress`, `rdv-form__progress-bar`, `rdv-form__counter`

- Review
  - Multimodal: `step-review__section`, `step-review__head`, `step-review__actions`, `step-review__cta`
  - Compat classe classique: `form__label`, `input` étendues via SCSS `_summary.scss`

Notes
- Aucune classe BEM classique n’a été modifiée; uniquement réutilisées.
- Ajouts non-breaking: `form--multistep`, `rdv-form__nav`, `rdv-form__progress(-bar)`.
- Aucune duplication CSS: on réutilise les styles globaux RDV (`input`, `btn*`) et les classes `form__*` existantes.

