import sys
import os

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../.."))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from crew.shared.paths import PATHS
from crew.orchestrator_agent import OrchestratorAgent
from crew.agents_v1.astro_converter_agent.astro_converter_agent import (
    AstroConverterAgent,
)

if __name__ == "__main__":
    # 1. Instanciation orchestrator pour avoir accès à tous les chemins centralisés
    orch = OrchestratorAgent(
        source_dir=PATHS["partials_source_dir"],
        config_dir=PATHS["config_dir"],
        report_dir=PATHS["report_dir"],
        test_dir=PATHS["test_dir"],
        output_dir=PATHS["partials_output_dir"],
        scss_root=PATHS["scss_root"],
    )

    # 2. Création de l'agent avec les chemins hérités de orch
    agent = AstroConverterAgent(
        source_dir=PATHS["partials_source_dir"],
        output_dir=PATHS["partials_output_dir"],
        log_file=orch.astro_log,
        orchestrator=orch,
    )

    print("Chemin source_dir absolu:", os.path.abspath(orch.source_dir))
    print("Contenu source_dir :", os.listdir(orch.source_dir))

    # 3. Exécution du run
    agent.run()
