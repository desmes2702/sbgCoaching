import { useState } from "react";

interface PerformanceContent {
  title: string;
  description: string[];
}

const performanceContent: PerformanceContent[] = [
  {
    title: "Investissement dans le capital humain",
    description: [
      "SBG coaching propose un programme de coaching en entreprise unique, conçu pour répondre aux défis spécifiques des professionnels d’aujourd’hui.",
      "En se concentrant sur la santé physique et mentale, SBG aide les équipes à atteindre leur plein potentiel, favorisant ainsi un environnement de travail plus dynamique et productif."
    ]
  },
  {
    title: "Programmes sur mesure",
    description: [
      "Nos solutions sont entièrement personnalisées selon les besoins spécifiques de votre entreprise.",
      "Nous élaborons des programmes ciblés, qu'il s'agisse de séances collectives, de coaching individuel, ou de conférences bien-être adaptées à vos équipes."
    ]
  },
  {
    title: "Avantages tangibles",
    description: [
      "Nos interventions permettent de réduire l'absentéisme, d'améliorer la cohésion d'équipe et de renforcer la motivation des collaborateurs.",
      "Les entreprises constatent une hausse de la productivité et un climat de travail plus positif."
    ]
  }
];

const Performance = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleContent = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="wrapper-1440-black">
      <section className="coaching__entrerpise__perfo section-height90 " aria-label="Amélioration des performances en entreprise">
        <h2>Une amélioration de vos performances en entreprise</h2>

        <div className="coaching__entrerpise__perfo__col1">
          <img src="/img/entreprise__graph.svg" alt="Graphique illustrant l'amélioration des performances en entreprise" />
        </div>

        <div className="coaching__entrerpise__perfo__col2">
          <ul>
            {performanceContent.map((item, index) => {
              const contentId = `perfo-desc-${index}`;
              return (
                <li className="entreprise__perfo__item" key={index}>
                  <h3>{item.title}</h3>
                  <div
                    id={contentId}
                    className={expandedIndex === index ? "open" : ""}
                    aria-live="polite"
                    aria-hidden={expandedIndex !== index}
                  >
                    <div>
                      {item.description.map((text, idx) => (
                        <p key={idx}>{text}</p>
                      ))}
                    </div>
                  </div>
                  <button
                    className={`entreprise__perfo__btnMore ${expandedIndex === index ? "rotate" : ""}`}
                    aria-expanded={expandedIndex === index}
                    aria-controls={contentId}
                    onClick={() => toggleContent(index)}
                    type="button"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Performance;
