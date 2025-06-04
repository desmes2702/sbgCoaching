# 📁 crew/agents-v1/seo_agent.py

import os
from crew.shared.file_ops import append_to_log, ensure_dir
from crew.shared.llm_utils import ask_llm
from crew.shared.mixin_log import LoggingMixin


class SEOAgent(LoggingMixin):
    def __init__(
        self,
        source_dir: str,
        log_file: str = None,
        output_dir: str = None,
        settings: dict = None,
    ):
        """
        Agent d’analyse et d’optimisation SEO :
        - Génère les balises meta
        - Vérifie les titres, descriptions, liens, schéma.org
        - Injecte ou propose des améliorations dans les composants ou pages

        Args:
            source_dir (str): Dossier contenant les fichiers à analyser
            log_file (str, optional): Fichier log markdown
            output_dir (str, optional): Dossier cible pour les fichiers modifiés (si applicable)
            settings (dict, optional): Options SEO dynamiques (lang, force_injection, etc.)
        """
        self.source_dir = source_dir
        self.log_file = log_file
        self.output_dir = output_dir
        self.settings = settings or {}

    def run(self):
        self._log(f"### 🧪 Test LLM depuis {self.__class__.__name__}")
        result = ask_llm("Quelle est la capitale de la France ?")
        self._log(f"🔁 Réponse LLM : {result}")

    """ def run(self):
        self._log("### 🧩 Étape 6 : SEOAgent")
        for root, _, files in os.walk(self.source_dir):
            for file in files:
                if file.endswith(".astro"):
                    self._optimize_seo(os.path.join(root, file))
        self._log("✅ Optimisation SEO terminée\n") """

    def _optimize_seo(self, file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            original = f.read()

        prompt = (
            "Optimise ce fichier .astro pour atteindre un niveau SEO supérieur à celui d’une agence experte.\n"
            "Inclue :\n"
            "- Toutes les meta-balises importantes (title, description, robots, og:*, twitter:*)\n"
            "- Balises schema.org adaptées en JSON-LD\n"
            "- Hiérarchie Hn parfaite (un seul H1, structure logique)\n"
            "- Balise canonical générée dynamiquement\n"
            "- Optimisation des images (alt, lazy, webp si possible)\n"
            "- meta viewport + mobile friendly\n"
            "- Liens internes et externes enrichis (avec rel)\n"
            "- Landmarks sémantiques (main, nav, footer, etc.)\n"
            "- Accessibilité liée au SEO\n"
            "- Ajout des balises sociales pour WhatsApp, Messenger, LinkedIn\n"
            "- Analyse de la langue et balises hreflang si besoin\n"
            "Corrige tout ce qui manque dans le fichier suivant :\n"
            f"{original}"
        )

        result = ask_llm(prompt)

        if result and not result.startswith("[LLM Error]"):
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(result)
            self._log(f"🔍 SEO optimisé (niveau ++ agence) : `{file_path}`")
        else:
            self._log(f"⚠️ Erreur SEO avec LLM : `{file_path}` → {result}")

    def _log(self, content: str):
        append_to_log(self.log_file, content)
