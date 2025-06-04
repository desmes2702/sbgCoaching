import os
import re
from crew.shared.file_ops import append_to_log, ensure_dir
from crew.shared.mixin_log import LoggingMixin


class SCSSBinderAgent(LoggingMixin):
    def __init__(
        self,
        source_dir: str,  # Dossier des composants .astro à analyser
        scss_root: str,  # Racine du dossier SCSS (ex: src/scss)
        log_file: str = None,
    ):
        self.source_dir = source_dir
        self.scss_root = scss_root
        self.log_file = log_file

    def run(self):
        self._log("### 🧩 Étape SCSSBinderAgent : liaison + audit\n")
        self._audit_indexes()  # Audit dry-run

        for root, _, files in os.walk(self.source_dir):
            for file in files:
                if file.endswith(".astro"):
                    self._bind_scss(os.path.join(root, file))

        self._log("✅ Liaison SCSS terminée\n")

    def _audit_indexes(self):
        """
        Vérifie que tous les partials _*.scss sont bien @forward dans index.scss de chaque dossier,
        et que main.scss référence tous les index.scss.
        Log les erreurs sans modifier aucun fichier (dry run).
        """
        folders = sorted(
            [
                d
                for d in os.listdir(self.scss_root)
                if os.path.isdir(os.path.join(self.scss_root, d))
            ]
        )
        errors = []

        for folder in folders:
            folder_path = os.path.join(self.scss_root, folder)
            index_path = os.path.join(folder_path, "index.scss")
            partials = []
            for f in os.listdir(folder_path):
                if f.startswith("_") and f.endswith(".scss") and f != "index.scss":
                    partials.append(f[1:-5])  # sans _ et .scss

            forwards = []
            if os.path.isfile(index_path):
                with open(index_path, "r", encoding="utf-8") as f:
                    for line in f:
                        m = re.search(r'@forward\s+[\'"]([^\'"]+)[\'"]', line)
                        if m:
                            forwards.append(m.group(1).split("/")[-1])

            missing = [p for p in partials if p not in forwards]
            extra = [f for f in forwards if f not in partials]

            if missing or extra:
                self._log(f"Audit index.scss dossier `{folder}` : anomalies détectées")
                if missing:
                    self._log(f" - ⚠️ Partials NON forwardés : {', '.join(missing)}")
                    errors.append(
                        f"Partials non forwardés dans {folder}/index.scss : {missing}"
                    )
                if extra:
                    self._log(
                        f" - ⚠️ Entrées @forward sans fichier : {', '.join(extra)}"
                    )
                    errors.append(
                        f"Entrées forward sans fichier dans {folder}/index.scss : {extra}"
                    )
            else:
                self._log(f"Audit index.scss dossier `{folder}` : OK")

        main_path = os.path.join(self.scss_root, "main.scss")
        main_refs = []
        if os.path.isfile(main_path):
            with open(main_path, "r", encoding="utf-8") as f:
                for line in f:
                    m = re.search(r'@forward\s+[\'"]([^\'"]+)[\'"]', line)
                    if m:
                        main_refs.append(m.group(1).split("/")[-1])

        missing_indexes = [f for f in folders if f not in main_refs]
        if missing_indexes:
            self._log(
                f"Audit main.scss : dossiers index.scss NON référencés : {', '.join(missing_indexes)}"
            )
            errors.append(f"main.scss manque les références : {missing_indexes}")
        else:
            self._log("Audit main.scss : OK")

        if errors:
            self._log(f"Audit SCSSBinderAgent terminé avec {len(errors)} anomalies.\n")
        else:
            self._log("Audit SCSSBinderAgent terminé : aucun problème détecté.\n")

    def _bind_scss(self, file_path):
        filename = os.path.splitext(os.path.basename(file_path))[0]
        # Ignore les fichiers backup/anciens
        if filename.startswith("__") or file_path.endswith(".bak"):
            return

        import_path = self._find_scss_file(filename)

        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        style_block = f'<style lang="scss">\n@use "{import_path}";\n</style>\n\n'

        if style_block.strip() not in content:
            if content.lstrip().startswith("---"):
                first_block_end = content.find("---", 3)
                if first_block_end != -1:
                    insert_at = first_block_end + 3
                    content = (
                        content[:insert_at] + "\n" + style_block + content[insert_at:]
                    )
                else:
                    content = style_block + content
            else:
                content = style_block + content

            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            self._log(f"🔗 Bloc SCSS injecté dans : `{file_path}`")

    def _find_scss_file(self, filename):
        """
        Recherche le SCSS associé au composant/partial,
        en priorité dans les sous-dossiers de scss_root.
        Crée un fichier dans components/ si rien trouvé.
        """
        for sub in ["components", "base", "layout", "abstracts"]:
            candidate = os.path.join(self.scss_root, sub, f"_{filename}.scss")
            if os.path.exists(candidate):
                return f"@scss/{sub}/{filename}"

        # Sinon crée dans components
        default = os.path.join(self.scss_root, "components", f"_{filename}.scss")
        ensure_dir(os.path.dirname(default))
        if not os.path.exists(default):
            with open(default, "w", encoding="utf-8") as f:
                f.write(f"/* SCSS associé à {filename}.astro */\n")
            self._log(f"🧵 SCSS créé : `{default}`")
        return f"@scss/components/{filename}"

    def _log(self, content: str):
        append_to_log(self.log_file, content)
