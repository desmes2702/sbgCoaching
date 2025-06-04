from scss_binder_agent import SCSSBinderAgent  # adapte le chemin selon ton organisation


def main():
    agent = SCSSBinderAgent(
        source_dir="src/partials",  # ou src/pages selon ton projet
        scss_root="src/scss",
        log_file="crew/logs/scss_binder.log.md",
    )
    agent.run()


if __name__ == "__main__":
    main()
