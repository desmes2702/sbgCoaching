# Bundle Diff (avant/après)

- Méthode: build Vite/Astro, inspection `dist/client/_astro`.
- Résultat (extrait):
  - `AppointmentForm.*.js`: ~26.55 kB (gzip ~6.6 kB)
  - Aucune nouvelle dépendance > 10 kB gzip ajoutée.
  - CSS: pas de duplication; réutilisation BEM classique.

> Remarque: pour un diff strict, conserver un artefact “avant” et comparer tailles gzip par fichier.

