import os
import re
from crew.shared.file_ops import append_to_log, ensure_dir
from crew.shared.llm_utils import ask_llm
from crew.shared.mixin_log import LoggingMixin


class UniformizerAgent(LoggingMixin):
    def __init__(self, agents_dir, log_file):
        self.agents_dir = agents_dir
        self.log_file = log_file

    def run(self):
        self._log(f"### 🧪 Test LLM depuis {self.__class__.__name__}")
        result = ask_llm("Quelle est la capitale de la France ?")
        self._log(f"🔁 Réponse LLM : {result}")

    """ def run(self):
        self._log("# 🔎 Audit des signatures d'initialisation de tous les agents\n")
        found = False
        for file in os.listdir(self.agents_dir):
            if file.endswith("_agent.py"):
                path = os.path.join(self.agents_dir, file)
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                match = re.search(
                    r"class\s+(\w+)\s*:\s*\n\s+def __init__\s*\(([^)]*)\):", content
                )
                if match:
                    class_name = match.group(1)
                    params = (
                        match.group(2).replace("self,", "").replace("self", "").strip()
                    )
                    params_list = [
                        p.strip().split(":")[0] for p in params.split(",") if p.strip()
                    ]
                    self._log(
                        f"- **{class_name}** : `__init__({', '.join(params_list)})`"
                    )
                    found = True
                else:
                    self._log(f"- ⚠️ Pas de constructeur trouvé dans `{file}`")
        if not found:
            self._log("Aucun agent trouvé ou aucun constructeur repéré.")
        self._log(
            "\n👉 **Compare les signatures et adapte-les pour avoir le même ordre et le même nombre d'arguments partout !**\n"
        ) """

    def _log(self, message):
        print(message)
        with open(self.log_file, "a", encoding="utf-8") as f:
            f.write(message + "\n")


if __name__ == "__main__":
    agent = UniformizerAgent(
        agents_dir=".",  # Dossier courant, si tu es dans crew/agents_v1
        log_file="../uniformizer_report.md",
    )
    agent.run()
