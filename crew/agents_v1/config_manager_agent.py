# 📁 crew/agents-v1/config_manager_agent.py

import os
from crew.shared.file_ops import append_to_log, ensure_dir
from crew.shared.llm_utils import ask_llm
from crew.shared.mixin_log import LoggingMixin


class ConfigManagerAgent(LoggingMixin):
    def __init__(
        self,
        source_dir: str,
        log_file: str = None,
        output_dir: str = None,
        settings: dict = None,
    ):
        """
        Audit de configuration Astro/Vite/TS — Génère un rapport Markdown structuré.
        """
        self.source_dir = source_dir
        self.log_file = log_file
        self.output_dir = output_dir
        self.settings = settings or {}

        # Paramètres personnalisables via settings
        self.dry_run = self.settings.get("dry_run", True)
        self.auto_backup = self.settings.get("auto_backup", True)
        self.config_files = self.settings.get(
            "config_files",
            [
                "package.json",
                "vite.config.",
                "tsconfig.json",
                ".env",
                ".env.local",
                "astro.config.mjs",
            ],
        )

    def run(self):

        self._log(f"### 🧪 Test LLM depuis {self.__class__.__name__}")
        result = ask_llm("Quelle est la capitale de la France ?")
        self._log(f"🔁 Réponse LLM : {result}")

    """ def run(self):
        self._log("### 🧩 Étape 9 : ConfigManagerAgent (mode audit/dry-run)")
        ensure_dir(self.output_dir)

        for root, _, files in os.walk(self.source_dir):
            for file in files:
                if any(file.startswith(cf) or file == cf for cf in self.config_files):
                    self._analyze_and_audit(os.path.join(root, file))

        self._log(f"🔍 Fichiers analysés : {', '.join(self.config_files)}")
        self._log("✅ Audit configuration terminé et rapport généré\n") """

    def _analyze_and_audit(self, file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            original = f.read()

        prompt = (
            "Analyse ce fichier de configuration pour vérifier :\n"
            "- Conformité Astro/Vite/TypeScript/SCSS moderne\n"
            "- Sécurité (env, secrets, permissions, CORS, ...)\n"
            "- Accessibilité, SEO, performance (plugins, settings)\n"
            "- Meilleures pratiques (références 2024)\n"
            "NE MODIFIE PAS directement, fais uniquement un audit (dry-run).\n"
            "Génère un rapport Markdown hiérarchisé par niveau d’importance (Critical, High, Medium, Low, Info).\n"
            "Checklist résumée et recommandations précises à la fin du rapport.\n"
            f"Fichier à analyser :\n{original}"
        )

        result = ask_llm(prompt, model="llama-3-8b-instruct")
        report = self._extract_markdown_report(result)
        base = os.path.basename(file_path)
        report_path = os.path.join(self.output_dir, f"{base}.config_audit.md")
        if report:
            with open(report_path, "w", encoding="utf-8") as f:
                f.write(report)
            self._log(f"📝 Rapport config généré (audit only) : `{report_path}`")
        else:
            self._log(f"⚠️ Aucun rapport généré pour : `{file_path}`")

    def _extract_markdown_report(self, result):
        # Extrait le markdown si besoin
        if result and "```markdown" in result:
            return result.split("```markdown")[1].split("```")[0]
        return result

    def _log(self, content: str):
        append_to_log(self.log_file, content)
