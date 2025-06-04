# 📁 crew/agents-v1/tsx_integrator_agent.py

import os
from crew.shared.file_ops import append_to_log, ensure_dir
from crew.shared.llm_utils import ask_llm
from crew.shared.mixin_log import LoggingMixin


class TSXIntegratorAgent(LoggingMixin):
    def __init__(
        self,
        source_dir: str,
        log_file: str = None,
        output_dir: str = None,
        settings: dict = None,
    ):
        """
        Agent de migration JavaScript ➜ TypeScript React (.tsx).

        Analyse les fichiers .js ou .jsx et les convertit vers .tsx en adaptant :
        - La syntaxe (JSX + TSX)
        - Les imports/exports
        - Le typage (si `convert_to_strict` est activé)

        Args:
            source_dir (str): Dossier source contenant les fichiers .js/.jsx à convertir
            log_file (str, optional): Fichier Markdown pour consigner les actions effectuées
            output_dir (str, optional): Dossier de destination pour les fichiers convertis en .tsx
            settings (dict, optional): Paramètres dynamiques :

                - "convert_to_strict" (bool) :
                  ➤ Si True (par défaut), force l’ajout de types explicites (props, return types, etc.)

                - "extensions" (list[str]) :
                  ➤ Liste des extensions ciblées pour la conversion (par défaut : [".js", ".jsx"])
        """
        self.source_dir = source_dir
        self.log_file = log_file
        self.output_dir = output_dir
        self.settings = settings or {}

        self.convert_to_strict = self.settings.get("convert_to_strict", True)
        self.extensions = self.settings.get("extensions", [".js", ".jsx"])

    def run(self):
        self._log("### 🧩 Étape 3 : TSXIntegratorAgent")
        for root, _, files in os.walk(self.source_dir):
            for file in files:
                if any(file.endswith(ext) for ext in self.extensions):
                    self._convert_file(os.path.join(root, file))
        self._log("✅ Intégration TSX terminée\n")

    def _convert_file(self, file_path):
        rel_path = os.path.relpath(file_path, self.source_dir)
        output_path = os.path.join(self.output_dir, rel_path).replace(".js", ".tsx")

        ensure_dir(os.path.dirname(output_path))

        with open(file_path, "r", encoding="utf-8") as f:
            js_content = f.read()

        prompt = (
            "Convertis ce fichier JavaScript en composant React TypeScript (.tsx) en respectant les bonnes pratiques modernes. "
            "Ajoute les types si possible, transforme les fonctions en composants si pertinent, et structure le code selon l’approche modulaire.\n\n"
            + js_content
        )

        tsx_content = ask_llm(prompt)

        if tsx_content and not tsx_content.startswith("[LLM Error]"):
            with open(output_path, "w", encoding="utf-8") as f:
                f.write(tsx_content)
            self._log(f"✅ Converti : `{file_path}` → `{output_path}`")
        else:
            self._log(
                f"⚠️ Échec de conversion avec Mixtral : `{file_path}` → {tsx_content}"
            )

    def _log(self, content: str):
        append_to_log(self.log_file, content)
