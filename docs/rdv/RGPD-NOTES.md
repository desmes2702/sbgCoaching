# RGPD — Notes d’implémentation

- Étape 3 (Âge & fragilités)
  - Consentement explicite obligatoire avant de continuer et avant soumission finale.
  - Champs sensibles: âge, fragilité/handicap, détails associés, photo.
  - Autosave désactivé par défaut et exclut ces champs lorsqu’activé.
  - Upload photo optionnel, côté client: accept `image/*`, taille ≤ 3MB, notice EXIF.
  - Aucun envoi si consentement non coché, anti double‑submit (délai min 2s + bouton désactivé pendant l’envoi).

- Journalisation et messages d’erreur
  - Messages non verbeux côté client.
  - Ne pas logger le contenu sensible.

- Récapitulatif
  - Montrer la synthèse sans afficher d’aperçu de la photo.
  - Les champs sensibles sont éditables depuis la review, mais rien n’est persisté côté client.

