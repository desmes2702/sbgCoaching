# Formulaire de Prise de Rendez-vous (Module RDV)

## 1. Vue d'ensemble

Ce document détaille l'architecture et le fonctionnement du module de prise de rendez-vous intégré au projet SBG Coaching. Il s'agit d'un composant React "plug-and-play" conçu pour s'intégrer dans un environnement Astro, offrant une expérience utilisateur riche, accessible et robuste pour la collecte d'informations de coaching.

Le formulaire est un processus multi-étapes qui guide l'utilisateur à travers la saisie de ses besoins, gère la validation des données en temps réel, et culmine avec un récapitulatif éditable avant soumission par e-mail.

## 2. Fonctionnalités Clés

- **Processus Multi-étapes :** Le formulaire est divisé en 5 étapes logiques : Type de coaching, Durée, Informations complémentaires, Objectif, et Récapitulatif.
- **Validation en Temps Réel :** Chaque champ est validé au fur et à mesure. L'utilisateur ne peut pas progresser à l'étape suivante si l'étape actuelle n'est pas valide.
- **Persistance des Données :** Les informations saisies (hors fichiers) sont automatiquement sauvegardées dans le `localStorage` du navigateur, permettant à l'utilisateur de reprendre son brouillon plus tard.
- **Uploader de Fichiers :** Une interface de téléversement de fichiers avec support du glisser-déposer (Drag & Drop), validation du type (PDF, JPG, PNG), du poids (5 Mo/fichier) et du nombre (3 max) de fichiers.
- **Navigation Avancée :** La barre de progression est interactive et permet à l'utilisateur de revenir à n'importe quelle étape précédemment complétée.
- **Récapitulatif avec Édition en Ligne :** La dernière étape présente un résumé complet de toutes les informations. Chaque section peut être modifiée directement depuis cette page, sans avoir à naviguer en arrière, offrant une expérience fluide.
- **Soumission Sécurisée :** L'envoi du formulaire est géré par une fonction serverless Node.js hébergée sur Vercel, qui utilise Nodemailer avec le service SMTP de Zoho. Des mesures anti-spam légères (honeypot, temps de soumission minimal) sont en place.
- **Accessibilité (A11y) :** Une attention particulière a été portée à l'accessibilité, avec une sémantique HTML stricte, une gestion du focus, et l'utilisation extensive d'attributs ARIA (`aria-current`, `aria-expanded`, `aria-disabled`, etc.).

## 3. Architecture Technique

### 3.1. Frontend

- **Frameworks :** Le composant est écrit en **React avec TypeScript**, et est conçu pour être hydraté côté client dans une page **Astro** (`client:load`).
- **Gestion de l'état :** L'état complet du formulaire est centralisé dans un **réducteur React (`useReducer`)**, ce qui garantit un flux de données prévisible et facile à déboguer. L'état est défini par l'interface `RdvState`.
- **Style :** Le style est géré par un unique fichier **SCSS** (`_rdv.scss`) qui hérite des conventions (variables, mixins) du projet global pour une intégration visuelle parfaite.
- **Validation :** La logique de validation est isolée dans des fonctions pures (`/utils/validation.ts`), ce qui la rend réutilisable à travers les différents composants et dans la logique de navigation.

### 3.2. Backend (Serverless)

- **Endpoint :** Une route d'API Astro (`src/pages/api/rdv/submit.ts`) écoute les requêtes `POST`.
- **Runtime :** La fonction s'exécute dans un environnement **Node.js** sur Vercel.
- **Envoi d'e-mail :** **Nodemailer** est utilisé pour se connecter au serveur **SMTP de Zoho** et envoyer l'e-mail final, qui inclut les pièces jointes encodées en Base64.

## 4. Structure des Fichiers

Les fichiers du module sont organisés dans `src/js/forms/rdv/`.

```
src/js/forms/rdv/
├── AppointmentForm.tsx      # Composant principal, orchestre les étapes et la logique.
├── components/
│   ├── Progress.tsx         # Barre de progression interactive.
│   └── Uploader.tsx         # Composant de téléversement de fichiers.
├── hooks/
│   └── useLocalStorage.ts   # Hook pour la persistance des données.
├── state/
│   └── rdvReducer.ts        # Logique de gestion de l'état (useReducer).
├── steps/
│   ├── StepType.tsx         # Étape 1: Type de coaching.
│   ├── StepDuration.tsx     # Étape 2: Durée.
│   ├── StepFragility.tsx    # Étape 3: Fragilité et upload.
│   ├── StepObjective.tsx    # Étape 4: Objectif.
│   └── StepReview.tsx       # Étape 5: Récapitulatif avec édition en ligne.
├── types/
│   └── rdvTypes.ts          # Définitions TypeScript pour l'état, les actions, etc.
└── utils/
    └── validation.ts        # Fonctions pures de validation.

src/pages/api/rdv/
└── submit.ts                # API Serverless pour la soumission par e-mail.

src/scss/pages/informations/rdv/
└── _rdv.scss                  # Fichier de style global pour le formulaire.
```

## 5. Utilisation et API des Composants

### 5.1. Intégration

Pour utiliser le formulaire, importez `AppointmentForm` dans n'importe quelle page Astro et utilisez la directive `client:load` pour l'hydrater.

**Exemple (`src/pages/rdv.astro`):**
```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import AppointmentForm from '@/js/forms/rdv/AppointmentForm.tsx';
---
<BaseLayout title="Prendre Rendez-vous">
  <main class="container">
    <AppointmentForm client:load />
  </main>
</BaseLayout>
```

### 5.2. API des Composants d'Étape

Chaque composant d'étape (ex: `StepType.tsx`) accepte une prop `mode: "full" | "inline"`.

- **`mode="full"` (défaut) :** Affiche le composant en mode pleine page, avec titres et espacements, tel qu'utilisé dans le flux de navigation principal.
- **`mode="inline"` :** Affiche une version compacte du composant, sans titres ni espacements superflus. Ce mode est utilisé par `StepReview.tsx` pour l'édition en ligne.

## 6. Logique de Navigation et d'Édition

### 6.1. Navigation par la Barre de Progression

- L'état du formulaire contient une valeur `maxReachableStep` qui représente l'étape la plus avancée que l'utilisateur a validée.
- La barre de progression est composée de `<button>`. Un utilisateur peut cliquer sur n'importe quel bouton dont l'index est inférieur ou égal à `maxReachableStep`.
- L'action du réducteur `GO_TO_STEP` est protégée et ignore toute tentative de navigation vers une étape non encore atteinte.

### 6.2. Édition en Ligne

- Sur la page de récapitulatif, cliquer sur "Modifier" ne change pas d'étape. À la place, cela ouvre un éditeur directement dans la section concernée, en utilisant le composant d'étape correspondant en `mode="inline"`.
- La validation des champs se fait en temps réel dans l'éditeur, et le bouton "Enregistrer" n'est actif que si les données sont valides.

## 7. Configuration

### 7.1. Dépendances

Assurez-vous que `nodemailer` est installé dans le projet :
```bash
npm install nodemailer @types/nodemailer
```

### 7.2. Variables d'Environnement

Pour que la soumission par e-mail fonctionne, les variables d'environnement suivantes doivent être définies (via un fichier `.env` localement ou dans les paramètres de Vercel).

**Fichier `.env.example`:**
```env
# Configuration SMTP pour Zoho Mail
ZOHO_SMTP_HOST=smtp.zoho.eu
ZOHO_SMTP_PORT=465
ZOHO_SMTP_SECURE=true
ZOHO_SMTP_USER="votre-adresse@zoho.eu"
ZOHO_SMTP_PASS="voter-mot-de-passe-d-application"

# Adresse e-mail de destination pour les notifications
MAIL_TO="info@sbgcoaching.be"
```

## 8. Accessibilité

- **Navigation au clavier :** Le formulaire est entièrement navigable au clavier (Tab, Shift+Tab, Enter, Espace).
- **Attributs ARIA :**
  - `aria-current="step"` sur l'étape active de la progression.
  - `aria-disabled` sur les étapes futures.
  - `aria-expanded` et `aria-controls` pour les sections d'édition en ligne.
  - `aria-live` pour l'annonce des erreurs de validation.
- **Sémantique :** Utilisation correcte des balises `<nav>`, `<fieldset>`, `<legend>`, et `<label>`.

## 9. Axes d'Amélioration Possibles

- **Résumé des erreurs :** Sur la page de récapitulatif, afficher une liste cliquable des erreurs restantes pour guider l'utilisateur.
- **Indicateurs visuels :** Ajouter une icône "complété" ou "modifié" sur chaque section du récapitulatif.
- **Tests :** Implémenter des tests unitaires pour le réducteur et les fonctions de validation, et des tests End-to-End (avec Playwright ou Cypress) pour les parcours utilisateurs critiques.
- **Toasts de confirmation :** Afficher une notification non-intrusive (toast) après l'enregistrement d'une modification en ligne.
