# Audit « Classique » — RDV

Statut initial (rapide) — à compléter avec captures Lighthouse/JSON + axe-core

- A11y
  - Labels liés OK, messages d’erreur présents (`.form__error`).
  - Focus management: à améliorer (ajouté dans multimodal via focus sur titres d’étape).
  - Annonce de changement d’étape: ajouté (aria-live dans StepHeader).
- Sécurité
  - Consentement explicite manquant pour les données sensibles → ajouté à l’étape 3 du multimodal.
  - Anti-spam: délai minimal ajouté (2s) + honeypot.
- Performance/UX
  - Pas de dépendances lourdes ajoutées; réutilisation SCSS existant; autosave opt-in.
- SEO
  - Sémantique `<fieldset>/<legend>` respectée.

Actions correctives livrées
- Alignement BEM dans le multimodal via `uiClasses.ts` (réutilisation des `form__*` et `btn*`).
- Focus management et annonces SR.
- RGPD: consentement explicite + upload filtré.

À fournir en PR
- Captures Lighthouse (mobile/desktop) + JSON
- Rapport axe-core
- Bundle diff si JS/CSS change
- Table BEM Classique ↔ Multimodal (voir `docs/rdv/BEM-MAPPING.md`)

