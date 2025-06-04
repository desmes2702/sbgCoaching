import os
from crew.shared.file_ops import append_to_log, ensure_dir
from crew.shared.llm_utils import ask_llm
from crew.shared.mixin_log import LoggingMixin
from extract_llm.extract_astro import extract_astro_code  # ← Import du nettoyeur Astro


class AstroConverterAgent(LoggingMixin):
    def __init__(
        self,
        source_dir: str,
        log_file: str = None,
        output_dir: str = None,
        settings: dict = None,
        orchestrator=None,
    ):
        """
        Agent de conversion des fichiers PHP vers Astro (.astro)

        Args:
            source_dir (str): Dossier source contenant les fichiers PHP
            log_file (str, optional): Fichier log pour rapport
            output_dir (str, optional): Dossier cible pour les fichiers Astro générés
            settings (dict, optional): Options dynamiques (ex: extensions ciblées)
            orchestrator (OrchestratorAgent, optional): Objet orchestrateur pour log centralisé
        """
        self.source_dir = source_dir
        self.log_file = log_file
        self.output_dir = output_dir
        self.settings = settings or {}
        self.orchestrator = orchestrator

    def run(self):
        self._log("### 🧩 Étape 2 : AstroConverterAgent")

        for root, _, files in os.walk(self.source_dir):
            for file in files:
                if file.endswith(".php"):
                    self._convert_to_astro(os.path.join(root, file))

        self._log("✅ Conversion Astro terminée\n")

    def _convert_to_astro(self, file_path):
        rel_path = os.path.relpath(file_path, self.source_dir)
        output_path = os.path.join(self.output_dir, rel_path).replace(".php", ".astro")

        ensure_dir(os.path.dirname(output_path))

        self._log(f"   → Lecture du fichier source : {file_path}")
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                php_content = f.read()
        except Exception as e:
            self._log(f"❌ Erreur lecture fichier {file_path} : {e}")
            return

        prompt = (
            "Convertis ce fichier PHP en composant .astro moderne et accessible. "
            "Supprime le PHP, conserve la structure HTML utile, ajoute les balises Astro nécessaires et rends le composant exploitable dans Astro. "
            "NE DONNE QUE le contenu du fichier .astro final : pas d’explication, pas de commentaire, pas de balise Markdown, pas de titre, pas d’autres composants, juste le code du fichier prêt à être collé dans .astro.\n\n"
            + php_content
        )

        self._log(f"   → Appel du LLM pour conversion de {file_path} ...")
        astro_code = ask_llm(
            prompt, temperature=0.0
        )  # Ajout temperature=0.0 pour du déterminisme

        astro_code_clean = extract_astro_code(
            astro_code
        )  # ← Nettoyage ici AVANT écriture

        if astro_code_clean and not astro_code_clean.startswith("[LLM Error]"):
            try:
                with open(output_path, "w", encoding="utf-8") as f:
                    f.write(astro_code_clean)
                self._log(f"✅ Converti : {file_path} → {output_path}")
            except Exception as e:
                self._log(f"❌ Erreur écriture fichier {output_path} : {e}")
        else:
            self._log(
                f"⚠️ Échec de conversion avec LLM : {file_path} → {astro_code_clean}"
            )

    def _log(self, content: str):
        append_to_log(self.log_file, content)
        if self.orchestrator:
            self.orchestrator.display_log_message(content)
        else:
            print(content)
