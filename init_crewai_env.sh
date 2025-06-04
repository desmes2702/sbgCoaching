#!/bin/bash

echo "🧼 Suppression de l'ancien environnement virtuel s'il existe..."
rm -rf crewai-env

echo "🐍 Création d'un nouvel environnement virtuel avec Python 3.10..."
py -3.10 -m venv crewai-env || { echo "❌ Erreur : Python 3.10 introuvable. Installe-le d'abord."; exit 1; }

echo "⚙️ Activation de l'environnement virtuel..."
source crewai-env/Scripts/activate || { echo "❌ Impossible d'activer l'environnement."; exit 1; }

echo "⬆️ Mise à jour de pip..."
./crewai-env/Scripts/python.exe -m pip install --upgrade pip

echo "📦 Installation de CrewAI..."
pip install crewai || { echo "❌ Installation de CrewAI échouée."; exit 1; }

echo "📁 Création du dossier 'crew/' si absent..."
mkdir -p crew

echo "🧠 Génération du fichier de test 'crew/main.py'..."
cat <<EOF > crew/main.py
from crewai import Agent, Task, Crew

# Agent de test
form_agent = Agent(
    role="FormAgent",
    goal="Créer des composants Astro de formulaire",
    backstory="Expert UI/UX pour sites dynamiques modernes.",
    allow_delegation=False
)

# Tâche simple à exécuter
form_task = Task(
    description="Génère un fichier .astro contenant un formulaire de contact avec nom, email, message et bouton Envoyer.",
    agent=form_agent
)

# Exécution
crew = Crew(
    agents=[form_agent],
    tasks=[form_task],
    verbose=True
)

if __name__ == "__main__":
    result = crew.kickoff()
    print("\\n--- Résultat ---\\n")
    print(result)
EOF

echo "✅ Environnement prêt !"
echo "▶️ Pour lancer le test :"
echo "source crewai-env/Scripts/activate && python crew/main.py"
