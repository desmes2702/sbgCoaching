# 📁 crew/main.py

from agents_v1.snapshot_agent import SnapshotAgent


def main():
    print("🚀 Initialisation de CrewAI – Phase 1")
    snapshot = SnapshotAgent()
    snapshot.run()


if __name__ == "__main__":
    main()
