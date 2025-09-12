# Bundle Diff (avant/après)

- Méthode: build Vite/Astro, inspection `dist/client/_astro`.
- Résultat (extrait):
  - `AppointmentForm.*.js`: ~28.35 kB (gzip ~7.14 kB) — +1.8 kB (~+0.54 kB gzip) dû à l’erreur summary + ancres.
  - Aucune nouvelle dépendance > 10 kB gzip ajoutée.
  - CSS: pas de duplication; réutilisation BEM classique.

> Remarque: pour un diff strict, conserver un artefact “avant” et comparer tailles gzip par fichier.
