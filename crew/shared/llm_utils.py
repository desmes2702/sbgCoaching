import requests
from crew.shared.settings import DEFAULT_LLM_MODEL

LLM_ENDPOINT = "http://localhost:1234/v1/chat/completions"


def ask_llm(prompt: str, model: str = None, temperature: float = 0.0) -> str:
    model = model or DEFAULT_LLM_MODEL
    try:
        response = requests.post(
            LLM_ENDPOINT,
            headers={"Content-Type": "application/json"},
            json={
                "model": model,
                "messages": [{"role": "user", "content": prompt}],
                "temperature": temperature,
            },
        )
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]
    except Exception as e:
        return f"[LLM Error] {str(e)}"
