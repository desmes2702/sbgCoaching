import os

LOG_PATH = "crew/logs/llm_extract_astro_errors.md"


def log_llm_output(source_file: str, llm_output: str):
    """Log les sorties LLM anormales pour audit/QA."""
    os.makedirs(os.path.dirname(LOG_PATH), exist_ok=True)
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(
            f"\n---\nFichier source : {source_file}\nSortie LLM :\n{llm_output}\n---\n"
        )


def extract_astro_code(llm_output: str, source_file: str = "unknown") -> str:
    """
    Extrait le code Astro depuis la première ligne pertinente (--- ou <).
    Si rien trouvé, log la sortie LLM pour analyse.
    Si le résultat paraît anormalement court (<5 lignes), log aussi.
    """
    lines = llm_output.splitlines()
    for i, line in enumerate(lines):
        if line.strip().startswith("---") or line.strip().startswith("<"):
            code = "\n".join(lines[i:]).strip()
            if len(code.splitlines()) < 5:
                log_llm_output(source_file, llm_output)
            return code
    # Si aucun bloc Astro détecté, log tout
    log_llm_output(source_file, llm_output)
    return llm_output.strip()
