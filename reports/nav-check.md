# Navigation Check — Étapes 4 → 5 → 6 (et retour)

- Contexte: Multimodal RDV (React/TSX), rendu d’une seule étape active.
- Correctif appliqué:
  - Rendu unique de l’étape courante (pas de panels parallèles).
  - Boutons de navigation `type="button"` (pas de submit implicite), suppression de `<form>` imbriqué dans la durée.
  - `StepDuration`: plus d’envoi de formulaire interne; `onNext` centralisé.
  - Provider/état stables; clamp défensif du step index si le total change.

## Scénarios testés (manuel)

1) Depuis Étape 4 (Durée)
   - Cliquer “Continuer” ⇒ Étape 5 (Coordonnées) OK
   - Cliquer “Continuer” ⇒ Étape 6 (Review) OK

2) Retour
   - Depuis Étape 6 → “Retour” ⇒ Étape 5 OK
   - “Retour” ⇒ Étape 4 OK

3) Aucune redirection vers Étape 1 observée.

4) Vérif Provider
   - Pas de remount du composant racine ni du provider (vérifié via React DevTools: identité stable du parent, états conservés).

## Notes cause racine

- Le retour à l’étape 1 provenait d’un submit implicite et/ou remount lié au formulaire interne de l’étape Durée.
- Le correctif force un rendu unique et enlève tout `<form>` imbriqué, avec des boutons `type="button"`.

