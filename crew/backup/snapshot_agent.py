# 📁 crew/agents-v1/snapshot_agent.py

import os
import shutil
from datetime import datetime


class SnapshotAgent:
    def __init__(self, source_dir: str, backup_root: str):
        self.source_dir = source_dir
        self.backup_root = backup_root

    def run(self):
        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M")
        backup_path = os.path.join(self.backup_root, timestamp)
        os.makedirs(backup_path, exist_ok=True)

        print(f"📦 Création de la sauvegarde dans : {backup_path}\n")
        self._copy_recursive(self.source_dir, backup_path)

        self._write_log(backup_path)

    def _copy_recursive(self, src, dst):
        if os.path.isdir(src):
            shutil.copytree(src, dst, dirs_exist_ok=True)
        else:
            shutil.copy2(src, dst)

    def _write_log(self, backup_path):
        log_path = os.path.join(backup_path, "snapshot-report.md")
        with open(log_path, "w", encoding="utf-8") as f:
            f.write(
                f"""### 🧠 SnapshotAgent Report – {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

#### 📁 Répertoire source sauvegardé
- `{self.source_dir}`

#### 💾 Destination de la sauvegarde
- `{backup_path}`

#### ✅ Statut
- Sauvegarde complète terminée avec succès
"""
            )
        print(f"📝 Rapport de sauvegarde généré : {log_path}")
