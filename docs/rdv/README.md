# RDV — Formulaire multi-étapes (React/TSX + Astro)

- Étapes: Type → Objectifs → Âge & fragilités (+ photo optionnelle) → Durée → Coordonnées → Review
- Accessibilité: labels liés, aria-invalid/describedby, messages `role="alert"`, annonce de changement d’étape `aria-live="polite"`, focus géré sur le titre d’étape.
- Anti‑spam: honeypot + délai minimal 2s.
- RGPD: consentement explicite pour données sensibles à l’étape 3, non‑sauvegarde locale des champs sensibles.
- Performance: hydratation limitée au composant, pas de dépendance >10kB ajoutée.

## Composants
- `AppointmentForm.tsx`: orchestration, navigation, autosave opt‑in, soumission.
- Steps: `StepType.tsx`, `StepObjective.tsx`, `StepAgeFragility.tsx`, `StepDuration.tsx`, `StepCoords.tsx`, `StepReview.tsx`.
- Header: `StepHeader.tsx` (progression + contre-voix SR via aria‑live).

## Styles / BEM
- Réutilisation des classes classiques `form__*` lorsque possible.
- Boutons: `btn`, `btn--primary`, `btn--ghost`.
- Voir `docs/rdv/BEM-MAPPING.md` pour la table de correspondance complète.

## RGPD
- Étape 3: ajout d’une case « consentement explicite » obligatoire pour l’usage de données sensibles.
- Upload photo optionnel filtré (PNG/JPEG/WebP, ≤3MB). Non persisté en localStorage.
- Autosave: opt‑in (désactivé par défaut) et exclut les champs sensibles.

## Vérifications
- Lint/Types: `npm run lint:fix`, `npm run check:types`
- Build: `npm run build`
- Preview: `npm run preview -- --host --port 4321`

