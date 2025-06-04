# 🧠 CrewAI – SBG Coaching

## 🎯 Objectif
Utiliser une équipe d'agents intelligents pour migrer et optimiser le site SBG Coaching, initialement basé sur PHP, vers une architecture moderne Astro + TSX + SCSS.

---

## 📁 Structure du dossier `crew/`

```
crew/
├── agents-v1/              # Agents de migration & transformation (PHP → Astro)
│   ├── snapshot_agent.py       # Sauvegarde automatique des fichiers avant modif
│   ├── orchestrator_agent.py   # Chef d’orchestre des agents v1
│   └── ...                     # Prochains : astro_converter_agent, tsx_integrator_agent, etc.
│
├── agents-v2/              # Agents de génération dynamique (formulaires, PDF...)
│   └── form_agent.py           # Ex: Formulaire de contact, avec validation + SCSS
│
├── shared/                 # Utilitaires partagés (fichiers, logs, outils)
│   └── file_ops.py             # Lecture/écriture fichiers, log markdown, etc.
│
├── main.py                 # Point d’entrée pour exécuter le crew
├── backups/                # Dossiers horodatés contenant les fichiers sauvegardés
└── logs/                   # Logs Markdown de chaque orchestration
```

---
## 🧠 Superviseur global

| Agent               | Rôle |
|---------------------|------|
| `OrchestratorAgent` | Gère l’enchaînement logique des agents, les logs, le lancement des sessions, et les backups |

## 🚀 Agents `v1` – Migration & refonte

| Agent | Rôle |
|-------|------|
| `SnapshotAgent` | Sauvegarde les fichiers à modifier dans `/backups/` |
| `AstroConverterAgent` | Convertit les `.php` + partials vers `.astro` |
| `TSXIntegratorAgent` | Passe les scripts en `.ts(x)` + adapte les imports |
| `SCSSBinderAgent` | Lie chaque composant à son fichier SCSS |
| `AccessibilityAgent` | Applique les normes WAI-ARIA, `role`, `alt`, etc. |
| `CrossCompatAgent` | Rends le site responsive et compatible navigateurs |
| `SEOAgent` | Optimise les balises, meta, titres et schéma.org |
| `BugFixerAgent` | Corrige erreurs console, affichage ou build |
| `OrchestratorAgent` | Supervise les agents v1 + centralise les logs |

| Ordre | Agent                 | Rôle principal                       |
| ----- | --------------------- | ------------------------------------ |
| 1     | `SnapshotAgent`       | Sauvegarde les fichiers avant modif  |
| 2     | `AstroConverterAgent` | Convertit `.php` en `.astro`         |
| 3     | `TSXIntegratorAgent`  | Passe `.js` en `.tsx`                |
| 4     | `SCSSBinderAgent`     | Lie composants à leurs fichiers SCSS |
| 5     | `AccessibilityAgent`  | Applique les bonnes pratiques a11y   |
| 6     | `CrossCompatAgent`    | Rends responsive & compatibilité     |
| 7     | `SEOAgent`            | Optimise SEO : meta, balises, schéma |
| 8     | `BugFixerAgent`       | Corrige erreurs et incohérences      |

## ✨ Agents `v2` – Génération intelligente

| Agent | Rôle |
|-------|------|
| `FormAgent` | Crée un formulaire `.astro` ou `.tsx` avec SCSS associé |
| `PDFAgent` | Génère des PDF à partir de templates Blade + données |
| `DiffuseAgent` | Injecte des composants dans des pages d'affichage planifié |
| `UploadAgent` | Crée composant upload + preview image/fichier |
| `ImportAgent` | Convertit CSV, Excel, Google Sheet en JSON |
| `DataAgent` | Crée tableaux dynamiques filtrables/exportables |
| `AIAgent` | Génère contenu (CTA, titres, descriptions, email) |


## 🛡️ Agents techniques (sécurité & config)

| Agent | Rôle |
|-------|------|
| `SecurityCheckAgent` | Vérifie l’absence de faille XSS, injection, etc. |
| `PerfAnalyzerAgent` | Vérifie taille DOM, lazyload, imports, font-swap |
| `TestGeneratorAgent` | Génère tests unitaires ou E2E |
| `DeploymentPrepAgent` | Clean + minify + prepare pour prod |
| `ConfigManagerAgent` | Gère et sauvegarde les fichiers critiques (`vite.config.ts`, `tsconfig.json`, etc.) |


---

## 🔐 Sécurité & Accès utilisateur SaaS

L’authentification des utilisateurs du site (admin, suivi, basique) repose sur **Laravel** côté serveur.

| Niveau de sécurité | Responsable |
|--------------------|-------------|
| 🔒 Authentification (login, rôles, tokens) | Backend Laravel via `AdminAgent` |
| 🔐 Vérification du code (XSS, CORS, headers, .env) | `SecurityCheckAgent`, `ConfigManagerAgent` |
| 🧪 Tests de sécurité frontend/API | `TestGeneratorAgent` |
| 🚀 Protection de l’environnement de build | `DeploymentPrepAgent` |

Les agents CI s’occupent uniquement du **code source et build**, **pas de la logique runtime des sessions ou API tokens.**

---

## 🔄 Sauvegardes & logs

- **Avant chaque action** → un dossier `/backups/YYYY-MM-DD_HH-MM/` est créé automatiquement.
- **Chaque session d’agent** est loguée dans `/logs/orchestration-report-*.md`


---

## 🧪 À faire ensuite
- Créer les autres agents progressivement dans `agents-v1/`
- Intégrer la gestion de config (`vite`, `ts`, `astro.config`) avec backups
- Ajouter un mode test/dry-run pour la CI future


---

Made with 🧠 by CrewAI & SBG Coaching
