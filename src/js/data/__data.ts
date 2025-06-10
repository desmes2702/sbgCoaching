export interface Testimonial {
  name: string;
  age?: string;
  job?: string;
  photo: string;
  text: string[];
  featured?: boolean;
}

export interface CompanyInfos {
  email: string;
  phone: string;
  address: string;
  map: string;
  social: {
    linkedin: string;
    facebook: string;
    instagram: string;
  };
  schemaOrg?: Record<string, unknown>;
}

// --- Données ---

export const companyInfos: CompanyInfos = {
  email: "contact@sbgcoaching.be",
  phone: "+32 472 25 77 24",
  address: "Rue du Marché 11, 4500 Huy, Belgique",
  map: "https://maps.app.goo.gl/rNuPnnZtMcZYjmWx8",
  social: {
    linkedin: "https://www.linkedin.com/company/sbg-leadership-coaching-and-consulting/",
    facebook: "https://www.facebook.com/samuelbillagarciacoaching",
    instagram: "https://www.instagram.com/sambillagarcia/",
  },
  schemaOrg: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "SBG Coaching",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rue du Marché 11",
      addressLocality: "Huy",
      addressRegion: "Liège",
      postalCode: "4500",
      addressCountry: "BE"
    },
    telephone: "+32 472 25 77 24",
    email: "contact@sbgcoaching.be"
  }
};

export const testimonials = [
  {
    name: "LABEYE et LALLEMEND",
    job: "Étude des Notaires",
    key: "entreprise",
    photo: "/img/testimonials/testimonial__labeyeLallemend.webp",
    text: [
      "Ces séances sont notre moment pour souffler. Elles nous permettent de déconnecter du travail, d’évacuer le stress et de retrouver de l’énergie.",
      "Après chaque session, on se sent plus léger et concentré.",
      "Partager ces entraînements nous rapproche. On se motive, on s’entraide et on découvre nos collègues sous un autre angle. Ça renforce nos liens et rend l’ambiance au travail encore plus agréable.",
      "On communique mieux, on collabore plus facilement et on aborde nos journées avec plus de sérénité. Ces séances nous font vraiment du bien, autant physiquement que mentalement."
    ]
  },
  {
    name: "Christian",
    job: null,
    key: "general",
    photo: "/img/testimonials/testimonial__christian.webp",
    text: [
      "Quand j’ai franchi les portes de la salle pour la première fois, j’étais rempli de doutes. Je voulais me (re)mettre au sport, mais je ne savais ni par où commencer ni comment utiliser les machines correctement.",
      "Dès le début, il a su m’écouter et m’orienter avec un programme parfaitement adapté à mes objectifs. Grâce à lui, j’ai appris à mieux comprendre mon corps, à ressentir chaque exercice et à maximiser mes entraînements.",
      "Et les résultats ont suivi : en quelques mois, j’ai perdu 8 kg et réduit ma masse grasse de 10 % !",
      "Ces progrès ont été une vraie révélation. J’ai pris goût à l’entraînement, gagné en confiance et, aujourd’hui, je construis mes propres séances avec motivation. Sans Sam, je n’aurais jamais atteint ce niveau de détermination.",
      "Ce n’est plus une question de volonté… mon corps et mon esprit réclament leurs séances !"
    ]
  },
  {
    name: "Justin",
    job: null,
    key: "general",
    photo: "/img/testimonials/testimonial__justin.webp",
    featured: true,
    text: [
      "Chaque semaine, il ajustait mes programmes en tenant compte de tous les aspects : repos, entraînements, alimentation et étirements. Ses conseils étaient toujours précis, et son suivi très réactif.",
      "Ce que j’ai particulièrement apprécié, c’est sa capacité à être à l’écoute et à répondre à toutes mes questions, même les plus techniques. Ses retours hebdomadaires étaient détaillés et me permettaient de progresser en toute sérénité.",
      "Aujourd’hui, je me sens plus polyvalent dans mes pratiques sportives et, surtout, j’ai adopté une approche durable qui ne met plus ma santé en danger.",
      "Pour toutes ces raisons, je recommande vivement Sam à toute personne déterminée à repousser ses limites, en toute sécurité et avec confiance."
    ]
  },
  {
    name: "Moïra PLENVAUX & Thérèse de NIJS",
    job: null,
    key: "entreprise",
    photo: "/img/testimonials/testimonial__plenevauxNijs.webp",
    text: [
      "L’approche du coach est rassurante : il adapte chaque mouvement en fonction de nos besoins et veille à notre bien-être. Cela rend les séances accessibles à tous et améliore notre confort au quotidien.",
      "Avant de commencer, nous avions tous des niveaux différents et certaines appréhensions. Grâce à l’accompagnement progressif, chacun a pu évoluer à son rythme.",
      "Les bienfaits vont bien au-delà du physique : cette routine nous permet aussi de mieux gérer la pression et de renforcer notre esprit d’équipe. On repart toujours plus sereins et motivés après chaque session."
    ]
  },
  {
    name: "UDH SPRL",
    job: null,
    key: "entreprise",
    photo: "/img/testimonials/testimonial__udhSprl.webp",
    text: [
      "Les cours de sport nous permettent de décompresser après notre journée de travail.",
      "Cela nous enlève tout le stress qu’on a pu avoir pendant la journée ainsi que la fatigue accumulée.",
      "Nous nous sentons toujours bien après une séance. Dès lors, le sport au travail renforce notre productivité. Nous repartons le lendemain plus concentrées, sans stress.",
      "En plus du bien-être physique, cela renforce les liens au sein de l’équipe."
    ]
  },
  {
    name: "Tiffany - Duchêne SA",
    job: "Chargée de communication",
    key: "entreprise",
    photo: "/img/testimonials/testimonial__ducheneSa.webp",
    text: [
      "Je voulais juste vous dire un grand merci pour ces super séances de circuit training chaque semaine ! C’est vraiment une chance de pouvoir participer à des cours directement au sein de l’entreprise.",
      "Non seulement cela nous permet de rester en forme, mais c’est aussi un excellent moyen de créer des liens entre collègues de différents services, ce qui renforce véritablement la cohésion au sein de l’équipe.",
      "En plus, l’ambiance est top, et notre coach est toujours super sympa et compétent, ce qui rend chaque séance agréable et motivante.",
      "Bref, c’est un vrai plaisir de participer à ces séances, et je suis sûre que tout le monde en profite pleinement !",
      "Merci encore, et à bientôt pour la prochaine session !"
    ]
  },
  {
    name: "Alice",
    job: null,
    key: "general",
    photo: "/img/testimonials/testimonial__alice.webp",
    text: [
      "Après 6 mois de travail à raison de 2 séances/semaine et un petit rééquilibrage alimentaire, quel changement ! Mes douleurs ont disparu, mon corps s’est resculpté, j’ai perdu 10 kg et pris du muscle.",
      "Je prends de nouveau plaisir à aller travailler sans craindre d’avoir mal et je peux à nouveau porter et cajoler mes petits bouts.",
      "Mon moral n’en est que meilleur, je revis complètement ! Merci Sam pour ta gentillesse, ta patience et ton professionnalisme."
    ]
  }
];



