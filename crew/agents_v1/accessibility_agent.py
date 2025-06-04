from crew.shared.file_ops import append_to_log
from crew.shared.llm_utils import ask_llm
from crew.shared.mixin_log import LoggingMixin


class AccessibilityAgent(LoggingMixin):
    def __init__(
        self,
        source_dir: str,
        log_file: str = None,
        output_dir: str = None,
        settings: dict = None,
    ):
        """
        Agent d’analyse et d’amélioration de l’accessibilité du markup HTML/ASTRO.

        Args:
            source_dir (str): Chemin des fichiers source à auditer
            log_file (str, optional): Fichier Markdown où consigner les recommandations
            output_dir (str, optional): Répertoire cible pour les fichiers modifiés (si applicable)
            settings (dict, optional): Paramètres personnalisés (mode strict, éléments ciblés, etc.)
        """
        self.source_dir = source_dir
        self.log_file = log_file
        self.output_dir = output_dir
        self.settings = settings or {}

        # Exemple de réglages personnalisables
        self.aria_enforcement = self.settings.get("aria_enforcement", True)
        self.check_labels = self.settings.get("check_labels", True)

    def run(self):
        self._log(f"### 🧪 Test LLM depuis {self.__class__.__name__}")
        result = ask_llm("Quelle est la capitale de la France ?")
        self._log(f"🔁 Réponse LLM : {result}")

    """ def run(self):
        self._log("### 🧩 Étape 5 : AccessibilityAgent")
        for root, _, files in os.walk(self.source_dir):
            for file in files:
                if file.endswith(".astro"):
                    self._enhance_accessibility(os.path.join(root, file))
        self._log("✅ Accessibilité mise à jour\n") """

    def _enhance_accessibility(self, file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            original = f.read()

        prompt = (
            "Corrige et optimise l’accessibilité de ce code HTML/ASTRO en ajoutant les attributs nécessaires "
            "(aria-label, role, alt, tabindex, etc.). Rends le composant plus conforme aux standards a11y "
            "tout en conservant sa structure.\n\nVoici le code :\n" + original
        )

        corrected = ask_llm(prompt)

        if corrected and not corrected.startswith("[LLM Error]"):
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(corrected)
            self._log(f"♿ Fichier mis à jour avec LLM : `{file_path}`")
        else:
            self._log(f"⚠️ Échec LLM sur : `{file_path}` → {corrected}")

    def _log(self, content: str):
        append_to_log(self.log_file, content)
