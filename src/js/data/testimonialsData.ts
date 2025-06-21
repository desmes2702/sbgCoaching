export interface TestimonialType {
  id: string;
  name: string;
  job: string | null;
  photo: string;
  key: "entreprise" | "general";
  featured?: boolean;
  text: string[];
  thumbnail?: string; // ✅ Ajouté
}

export const testimonials: TestimonialType[] = [
  {
    id: "alice-1",
    name: "Alice",
    job: null,
    photo: "/img/testimonials/testimonial__alice.webp",
    key: "general",
    text: [
      "Après 6 mois de travail à raison de 2 séances/semaine, j’ai progressivement retrouvé la motivation et le goût de l’effort.",
      "Je prends de nouveau plaisir à aller travailler, à bouger, à prendre soin de moi.",
      "Mon moral n’en est que meilleur. Ce suivi m’a apporté bien plus qu’un simple programme sportif."
    ]
  },
  {
    id: "tiffany-2",
    name: "Tiffany - Duchêne SA",
    job: "Chargée de communication",
    photo: "/img/testimonials/testimonial__ducheneSa.webp",
    key: "entreprise",
    text: [
      "Je voulais juste vous dire un grand merci pour les séances de sport que vous nous proposez chaque semaine.",
      "Non seulement cela nous permet de rester en forme, mais en plus cela renforce la cohésion d’équipe.",
      "L’ambiance est top, les exercices variés, et l’approche très pro !",
      "Bref, c’est un vrai plaisir d’y participer chaque semaine.",
      "Merci encore, et à bientôt pour la prochaine session !"
    ]
  },
  {
    id: "udh-3",
    name: "UDH SPRL",
    job: "Chargé(e) de dépollution environnementale",
    photo: "/img/testimonials/testimonial__udhSprl.webp",
    key: "entreprise",
    text: [
      "Les cours de sport nous permettent de décompresser après nos journées chargées.",
      "Cela nous enlève tout le stress et nous remet d’aplomb physiquement et mentalement.",
      "Nous nous sentons toujours bien après une séance, même si elle est intense.",
      "En plus du bien-être physique, ça renforce l’esprit d’équipe et la motivation collective."
    ]
  },
  {
    id: "plenevaux-4",
    name: "Moïra PLENVAUX & Thérèse de NIJS",
    job: "Étude notariale",
    photo: "/img/testimonials/testimonial__plenevauxNijs.webp",
    key: "entreprise",
    text: [
      "L’approche du coach est rassurante, structurée, et toujours adaptée à chacun.",
      "Avant de commencer, nous avions tous des niveaux différents, mais chacun progresse à son rythme.",
      "Les bienfaits vont bien au-delà du physique : meilleure humeur, plus d’énergie, et un vrai plaisir de se retrouver ensemble chaque semaine."
    ]
  },
  {
    id: "justin-5",
    name: "Justin",
    job: null,
    photo: "/img/testimonials/testimonial__justin.webp",
    thumbnail: "/img/general/general__post3-thumb.webp", // ✅ Miniature Hero
    key: "general",
    featured: true,
    text: [
      "Chaque semaine, il ajustait mes programmes en tenant compte de tous les aspects : repos, entraînements, alimentation et étirements.",
      "Ce que j’ai particulièrement apprécié, c’est sa capacité à être à l’écoute, à motiver sans jamais juger, et à trouver des solutions adaptées à chaque situation.",
      "Aujourd’hui, je me sens plus polyvalent dans mes pratiques sportives et bien plus solide mentalement.",
      "Pour toutes ces raisons, je recommande vivement Sam à toute personne souhaitant améliorer son bien-être de manière durable."
    ]
  },
  {
    id: "christian-6",
    name: "Christian",
    job: null,
    photo: "/img/testimonials/testimonial__christian.webp",
    thumbnail: "/img/general/general__post2-thumb.webp", // ✅ Miniature Hero
    key: "general",
    text: [
      "Quand j’ai franchi les portes de la salle pour la première fois, j’étais rempli de doutes. Je voulais me (re)mettre au sport, mais je ne savais ni par où commencer ni comment utiliser les machines correctement.",
      "Dès le début, il a su m’écouter et m’orienter avec un programme parfaitement adapté à mes objectifs, mon niveau et mes contraintes physiques.",
      "Et les résultats ont suivi : en quelques mois, j’ai perdu 8 kg et réduit ma masse grasse de 10 % !",
      "Ces progrès ont été une vraie révélation. J’ai pris goût à l’entraînement, gagné en confiance, et aujourd’hui, ce n’est plus une question de volonté… mon corps et mon esprit réclament leurs séances !"
    ]
  },
  {
    id: "labeye-7",
    name: "LABEYE et LALLEMEND",
    job: "Étude notariale",
    photo: "/img/testimonials/testimonial__labeyeLallemend.webp",
    key: "entreprise",
    text: [
      "Ces séances sont notre moment pour souffler. Elles nous permettent de déconnecter du travail, d’évacuer le stress et de retrouver de l’énergie.",
      "Après chaque session, on se sent plus léger et concentré.",
      "Partager ces entraînements nous rapproche. On se motive, on s’entraide et on découvre nos collègues sous un autre angle. Ça renforce nos liens et rend l’ambiance au travail encore plus agréable.",
      "On communique mieux, on collabore plus facilement et on aborde nos journées avec plus de sérénité. Ces séances nous font vraiment du bien, autant physiquement que mentalement."
    ]
  }
];
