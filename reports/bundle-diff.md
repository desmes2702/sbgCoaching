# Bundle Diff (avant/après)

- Méthode: build Vite/Astro, inspection `dist/client/_astro`.
- Résultat (extrait):
- `AppointmentForm.*.js`: ~29.18 kB (gzip ~7.40 kB) — +0.83 kB (~+0.26 kB gzip) après normalisation de l’aperçu image (attributs width/height/decoding/loading).
  - Aucune nouvelle dépendance > 10 kB gzip ajoutée.
  - CSS: pas de duplication; réutilisation BEM classique.

> Remarque: pour un diff strict, conserver un artefact “avant” et comparer tailles gzip par fichier.
