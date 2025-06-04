import os
from datetime import datetime

from crew.agents_v1 import (
    AstroConverterAgent,
    SCSSBinderAgent,
    AccessibilityAgent,
    SEOAgent,
    SecurityCheckAgent,
    TestGeneratorAgent,
    ConfigManagerAgent,
    TSXIntegratorAgent,
)
from crew.shared.file_ops import append_to_log, ensure_dir


class OrchestratorAgent:
    def __init__(
        self,
        source_dir,
        config_dir,
        report_dir,
        test_dir,
        output_dir,
        scss_root,
        log_dir="crew/logs",
    ):
        # Variables importantes
        self.source_dir = source_dir
        self.config_dir = config_dir
        self.report_dir = report_dir
        self.test_dir = test_dir
        self.output_dir = output_dir
        self.scss_root = scss_root

        # Chemins logs
        self.log_dir = log_dir
        ensure_dir(self.log_dir)

        self.astro_log = os.path.join(self.log_dir, "astro_partials_log.md")
        self.page_log = os.path.join(self.log_dir, "astro_pages_log.md")
        self.scss_log = os.path.join(self.log_dir, "scss_log.md")
        self.a11y_log = os.path.join(self.log_dir, "accessibility_log.md")
        self.seo_log = os.path.join(self.log_dir, "seo_log.md")
        self.security_log = os.path.join(self.log_dir, "security_log.md")
        self.test_log = os.path.join(self.log_dir, "test_log.md")
        self.config_log = os.path.join(self.log_dir, "config_log.md")
        self.tsx_log = os.path.join(self.log_dir, "tsx_log.md")
        self.orchestrator_log = os.path.join(self.log_dir, "orchestrator_log.md")

        # Agents avec injection de self (orchestrator)
        self.agents = [
            AstroConverterAgent(
                source_dir=self.source_dir,
                log_file=self.astro_log,
                output_dir=self.output_dir,
                orchestrator=self,
            ),
            SCSSBinderAgent(
                source_dir="src/",
                log_file=self.scss_log,
                output_dir="src/scss/",
                settings={"scss_root": "src/scss/"},
            ),
            AccessibilityAgent(
                source_dir=self.source_dir,
                log_file=self.a11y_log,
                output_dir=None,
                settings={"aria_enforcement": True, "check_labels": True},
            ),
            SEOAgent(
                source_dir=self.source_dir,
                log_file=self.seo_log,
                output_dir=self.output_dir,
                settings={"language": "fr", "force_injection": False},
            ),
            SecurityCheckAgent(
                source_dir=self.source_dir,
                log_file=self.security_log,
                output_dir=self.report_dir,
                settings={
                    "dry_run": True,
                    "auto_backup": True,
                    "scope_extensions": [".astro", ".html", ".js", ".tsx", ".ts"],
                },
            ),
            TestGeneratorAgent(
                source_dir=self.source_dir,
                output_dir=self.test_dir,
                log_file=self.test_log,
                settings={
                    "dry_run": False,
                    "scope_extensions": [".astro", ".tsx", ".js", ".ts"],
                    "framework": "playwright",
                },
            ),
            ConfigManagerAgent(
                source_dir=self.config_dir,
                log_file=self.config_log,
                output_dir=self.report_dir,
                settings={
                    "dry_run": True,
                    "auto_backup": True,
                    "config_files": [
                        "package.json",
                        "vite.config.",
                        "tsconfig.json",
                        ".env",
                        ".env.local",
                        "astro.config.mjs",
                    ],
                },
            ),
            TSXIntegratorAgent(
                source_dir=self.source_dir,
                log_file=self.tsx_log,
                output_dir=self.output_dir,
                settings={"convert_to_strict": True, "extensions": [".js", ".jsx"]},
            ),
        ]

    def display_log_message(self, message: str):
        # Centralise l’affichage console, format pro clair
        if message.startswith("✅ Converti"):
            parts = message.split("→")
            source = parts[1].strip()
            target = parts[2].strip()
            print(
                f"[✔️ SUCCESS] {os.path.basename(source)} → {os.path.basename(target)}"
            )
        elif message.startswith("→ Lecture du fichier source"):
            file = message.split(":")[-1].strip()
            print(f"[📂 READ] {os.path.basename(file)}")
        elif message.startswith("→ Appel du LLM"):
            file = message.split("de")[-1].strip().rstrip(" ...")
            print(f"[🤖 LLM] Conversion en cours : {os.path.basename(file)} ...")
        elif message.startswith("❌") or message.startswith("⚠️"):
            print(f"[❗ ERROR] {message}")
        else:
            print(message)

    def _log(self, content):
        ensure_dir(os.path.dirname(self.orchestrator_log))
        timestamp = datetime.now().strftime("[%Y-%m-%d %H:%M:%S]")
        append_to_log(
            self.orchestrator_log, f"{timestamp} {content}\n\n"
        )  # Ajout d'une ligne vide

    def run(self):
        self._log("## 🚀 OrchestratorAgent — lancement de la pipeline complète")
        for agent in self.agents:
            agent.run()
        self._log("🎉 Pipeline CrewAI terminée avec succès !\n")


if __name__ == "__main__":
    orchestrator = OrchestratorAgent(
        source_dir="../src/",
        config_dir="..",
        report_dir="../reports/",
        test_dir="../tests/",
        output_dir="../converted/",
        scss_root="../src/scss/",
    )
    orchestrator.run()
