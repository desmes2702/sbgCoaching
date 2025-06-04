import os

PATHS = {
    # Partials
    "partials_source_dir": os.path.abspath(
        os.path.join(os.path.dirname(__file__), "../../pages/")
    ),
    "partials_output_dir": os.path.abspath(
        os.path.join(os.path.dirname(__file__), "../../src/partials/")
    ),
    # Pages
    "pages_source_dir": os.path.abspath(
        os.path.join(os.path.dirname(__file__), "../../public/")
    ),
    "pages_output_dir": os.path.abspath(
        os.path.join(os.path.dirname(__file__), "../../src/pages/")
    ),
    "config_dir": os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")),
    "report_dir": os.path.abspath(
        os.path.join(os.path.dirname(__file__), "../../reports/")
    ),
    "test_dir": os.path.abspath(
        os.path.join(os.path.dirname(__file__), "../../tests/")
    ),
    "scss_root": os.path.abspath(
        os.path.join(os.path.dirname(__file__), "../../src/scss/")
    ),
}
