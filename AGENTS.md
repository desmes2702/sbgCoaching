# AGENTS.md

## Contexte
- Astro 5 + React/TSX, SCSS BEM, Vite, Vercel. URL: https://sbgcoaching.be/
- Noms de fichiers & structure **intouchés**. Imports avec extension (.ts/.tsx) obligatoires.

## Scripts
- Dev: `npm run dev`
- Build: `npm run build`
- Type/lint: `npm run check:types` · `npm run lint:fix`
- Preview: `npm run preview -- --host --port 4321`

## Règles SEO/A11y
- 1 seul `<h1>` par page, H2 ordonnés.
- Title 30–65, Meta 70–160, canonical propre.
- Ne jamais modifier les classes **BEM**.

## Sécurité
- Pas de push vers `main`. Toujours PR → `refactor/seo-hardening`.
- Montrer les **diffs** avant d’écrire.

## Commandes autorisées
- `git status`, `git checkout -b`, `git add -A`, `git commit`, `git push`
- `npm ci`, `npm run check:types`, `npm run lint:fix`, `npm run build`, `npm run preview`

## Interdits
- `git push main`, `reset --hard`, suppressions massives, téléchargements arbitraires.
