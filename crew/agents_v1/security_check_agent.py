# 📁 crew/agents-v1/security_check_agent.py

import os
from crew.shared.file_ops import append_to_log, ensure_dir
from crew.shared.llm_utils import ask_llm
from crew.shared.mixin_log import LoggingMixin


class SecurityCheckAgent(LoggingMixin):
    def __init__(
        self,
        source_dir: str,
        log_file: str = None,
        output_dir: str = None,
        settings: dict = None,
    ):
        """
        Agent d’audit de sécurité du code source (env, permissions, secrets, etc.)

        Args:
            source_dir (str): Dossier source à analyser
            log_file (str, optional): Fichier de log pour le résumé
            output_dir (str, optional): Dossier de rapport ou résultats
            settings (dict, optional): Paramètres de configuration dynamique
        """
        self.source_dir = source_dir
        self.log_file = log_file
        self.output_dir = output_dir
        self.settings = settings or {}

        # Valeurs personnalisables injectables depuis Orchestrator
        self.dry_run = self.settings.get("dry_run", True)
        self.auto_backup = self.settings.get("auto_backup", True)
        self.scope_extensions = self.settings.get(
            "scope_extensions", [".astro", ".html", ".js", ".tsx", ".ts"]
        )

    def run(self):
        self._log(f"### 🧪 Test LLM depuis {self.__class__.__name__}")
        result = ask_llm("Quelle est la capitale de la France ?")
        self._log(f"🔁 Réponse LLM : {result}")

    """ def run(self):
        self._log("### 🧩 Étape 7 : SecurityCheckAgent (mode audit/dry-run)")
        ensure_dir(self.output_dir)

        for root, _, files in os.walk(self.source_dir):
            for file in files:
                if file.endswith(tuple(self.scope_extensions)):
                    self._analyze_and_audit(os.path.join(root, file))

        self._log("✅ Audit sécurité terminé et rapport généré\n")
 """

    def _analyze_and_audit(self, file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            original = f.read()

        prompt = (
            "Analyse ce fichier pour détecter toute faille ou faiblesse de sécurité front-end ou fullstack.\n"
            "NE CORRIGE PAS automatiquement le code, fais uniquement un audit (dry-run).\n"
            "Génère un rapport Markdown ULTRA détaillé :\n"
            "- Hiérarchise chaque vulnérabilité détectée ou recommandation selon le niveau suivant : Critical, High, Medium, Low, Info.\n"
            "- Pour chaque alerte : donne la description, la ligne concernée, la recommandation.\n"
            "- Ajoute en bas une checklist résumée (Critical et High à traiter d’urgence).\n"
            "- Ajoute un résumé global en début de rapport.\n"
            "Voici le fichier à analyser :\n"
            f"{original}"
        )

        result = ask_llm(prompt)

        # Aucun code modifié, juste le rapport
        report = self._extract_markdown_report(result)
        base = os.path.basename(file_path)
        report_path = os.path.join(self.output_dir, f"{base}.security.md")
        if report:
            with open(report_path, "w", encoding="utf-8") as f:
                f.write(report)
            self._log(f"📝 Rapport sécurité généré (audit only) : `{report_path}`")
        else:
            self._log(f"⚠️ Aucun rapport généré pour : `{file_path}`")

    def _extract_markdown_report(self, result):
        # Tente d'extraire le markdown si le LLM l'encapsule
        if result and "```markdown" in result:
            return result.split("```markdown")[1].split("```")[0]
        return result

    def _log(self, content: str):
        append_to_log(self.log_file, content)
