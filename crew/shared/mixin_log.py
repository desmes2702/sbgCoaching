import os
from crew.shared.file_ops import append_to_log


class LoggingMixin:
    def _log(self, content):
        if hasattr(self, "log_file") and self.log_file:
            os.makedirs(os.path.dirname(self.log_file), exist_ok=True)
            append_to_log(self.log_file, content)
