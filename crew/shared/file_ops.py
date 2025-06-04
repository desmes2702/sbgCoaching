# 📁 crew/shared/file_ops.py

import os
from datetime import datetime


def ensure_dir(path: str):
    os.makedirs(path, exist_ok=True)


def write_markdown_log(filepath: str, title: str, content: str):
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(
            f"""### 🧠 {title} – {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

{content}
"""
        )


def read_file(filepath: str) -> str:
    with open(filepath, "r", encoding="utf-8") as f:
        return f.read()


def write_file(filepath: str, content: str):
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)


def append_to_log(filepath: str, content: str):
    with open(filepath, "a", encoding="utf-8") as f:
        f.write(content + "\n")
