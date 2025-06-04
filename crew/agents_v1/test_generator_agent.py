# 📁 crew/agents-v1/test_generator_agent.py

import os
from crew.shared.file_ops import append_to_log, ensure_dir
from crew.shared.llm_utils import ask_llm
from crew.shared.mixin_log import LoggingMixin


class TestGeneratorAgent(LoggingMixin):
    def __init__(
        self,
        source_dir: str,
        log_file: str = None,
        output_dir: str = None,
        settings: dict = None,
    ):
        """
        Agent générateur de fichiers de test automatisés pour les composants ASTRO/TSX/JS.

        Args:
            source_dir (str): Dossier contenant les composants à tester
            log_file (str, optional): Chemin de log Markdown
            output_dir (str, optional): Dossier dans lequel écrire les fichiers de test
            settings (dict, optional): Options dynamiques : dry-run, scope, frameworks, etc.
        """
        self.source_dir = source_dir
        self.log_file = log_file
        self.output_dir = output_dir
        self.settings = settings or {}

        self.dry_run = self.settings.get("dry_run", False)
        self.scope_extensions = self.settings.get(
            "scope_extensions", [".astro", ".tsx", ".js", ".ts"]
        )
        self.framework = self.settings.get("framework", "playwright")

    def run(self):
        self._log(f"### 🧪 Test LLM depuis {self.__class__.__name__}")
        result = ask_llm("Quelle est la capitale de la France ?")
        self._log(f"🔁 Réponse LLM : {result}")

    """ def run(self):
        self._log("### 🧩 Étape 8 : TestGeneratorAgent")
        ensure_dir(self.test_dir)

        for root, _, files in os.walk(self.source_dir):
            for file in files:
                if file.endswith(self.scope_extensions):
                    self._generate_tests(os.path.join(root, file), root)

        self._log("✅ Génération des tests terminée\n") """

    def _generate_tests(self, file_path, root_dir):
        with open(file_path, "r", encoding="utf-8") as f:
            original = f.read()

        # Sélection automatique du framework selon extension
        ext = os.path.splitext(file_path)[1]
        if ext == ".astro":
            framework = "Playwright (Astro)"
            test_ext = ".spec.ts"
        elif ext in (".tsx", ".js", ".ts"):
            framework = "Jest + Testing Library (React/TSX/JS/TS)"
            test_ext = ".test.tsx" if ext == ".tsx" else ".test.js"
        else:
            framework = "Générique"
            test_ext = ".test.js"

        prompt = (
            f"Génère un test automatisé ({framework}) pour ce composant.\n"
            "- Pour Astro, utilise Playwright (format .spec.ts)\n"
            "- Pour TSX/JS, utilise Jest + Testing Library (format .test.tsx/.test.js)\n"
            "- Inclue la vérification des props, interactions utilisateur, et des cas d’erreur\n"
            "- Retourne le code de test dans un bloc, puis un audit Markdown (couverture, points à surveiller)\n"
            "Composant à tester :\n"
            f"{original}"
        )

        result = ask_llm(prompt)

        test_code, audit = self._split_result(result)

        # Emplacement du fichier de test (structure miroir dans /tests/)
        rel_path = os.path.relpath(file_path, self.source_dir)
        test_path = os.path.join(
            self.test_dir, os.path.splitext(rel_path)[0] + test_ext
        )
        ensure_dir(os.path.dirname(test_path))

        if test_code and not test_code.startswith("[LLM Error]") and not self.dry_run:
            with open(test_path, "w", encoding="utf-8") as f:
                f.write(test_code)
            self._log(f"🧪 Test généré : `{test_path}`")
        else:
            self._log(f"🔎 Audit test (dry-run) : `{file_path}`")

        # Rapport d’audit
        if audit:
            audit_path = test_path + ".audit.md"
            with open(audit_path, "w", encoding="utf-8") as f:
                f.write(audit)
            self._log(f"📝 Rapport audit test : `{audit_path}`")

    def _split_result(self, result):
        # Cherche des séparateurs courants code/audit markdown
        if result and "```" in result:
            parts = result.split("```")
            code, audit = None, None
            for i in range(len(parts) - 1):
                if "markdown" in parts[i]:
                    audit = parts[i + 1]
                elif any(lang in parts[i] for lang in ("tsx", "js", "ts", "astro")):
                    code = parts[i + 1]
            return code, audit
        return result, ""

    def _log(self, content: str):
        append_to_log(self.log_file, content)
