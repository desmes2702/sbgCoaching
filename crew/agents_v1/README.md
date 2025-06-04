# 🚀 SBG Coaching — CrewAI Migration Toolkit

Ce dépôt contient l’infrastructure **multi-agents IA** pour migrer, refactorer et optimiser un site PHP/SCSS vers Astro moderne, accessible, SEO et maintenable.
**Chaque agent agit de façon modulaire et automatisée, avec logs, backups et rapports d’audit.**

---

## ⚙️ Architecture générale

- **OrchestratorAgent** : Chef d’orchestre, exécute la pipeline complète (migration, QA, sécurité…)
- **AstroConverterAgent** : Conversion PHP + partials en `.astro` propre
- **SCSSBinderAgent** : Lie chaque composant `.astro` à son SCSS dédié sans modifier ton design
- **AccessibilityAgent** : Applique/optimise l’accessibilité (a11y, ARIA, structure sémantique…)
- **SEOAgent** : Optimisation SEO ultra poussée (meta, schema.org, canonical, social, hreflang…)
- **SecurityCheckAgent** : Audit sécurité (XSS, headers, clés, best practices, rapport .md)
- **TestGeneratorAgent** : Génère des tests unitaires/integration (Playwright, Jest…)
- **ConfigManagerAgent** : Vérifie et audite tous les fichiers de config (.env, package.json, vite.config, tsconfig…)

---

## 🧠 Modèle IA utilisé

- Le modèle LLM utilisé est **centralisé dans `crew/shared/settings.py`** via la variable `DEFAULT_LLM_MODEL`.
- Par défaut : `"llama-3-8b-instruct"` (recommandé pour compatibilité locale, LM Studio, Ollama…)
- Pour basculer sur Mixtral, Nous Hermes ou tout autre modèle, il suffit de modifier **une ligne** dans ce fichier.
- Tous les agents appellent `ask_llm(prompt)` et récupèrent automatiquement le bon modèle.

---

## 📝 Usage

```bash
# 1. Démarrer l’orchestrateur depuis la racine du projet
python crew/orchestrator_agent.py

# 2. Les rapports et logs sont générés dans /logs/ et /reports/
# 3. Les tests générés sont dans /tests/
