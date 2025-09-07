// src/data/actualites/entrepriseData.ts
import { ActualiteEntrepriseType } from './types.js';

const entrepriseData: ActualiteEntrepriseType[] = [
  {
    id: "rtl-tvi",
    title: "RTL TVI : SBG Coaching en entreprise",
    paragraphs: [
      "Retour sur notre passage sur RTL TVI.",
      "Découvrez comment nous accompagnons les équipes en entreprise."
    ],
    backgroundThumbnail: "/img/entreprise/entreprise__post2-thumb.webp",
    video: "/videos/rtlTvi.mp4",
    date: "2024-05-12",
    tags: ["entreprise","média", "témoignage", "coaching", "interview"]
  },
  {
    id: "deductible-be",
    title: "<span class='highlight'>100% DÉDUCTIBLE !</span>",
    paragraphs: [
      "Le coaching en entreprise est déductible à 100% en Belgique.",
      "Offrez un avantage fiscal tout en investissant dans le bien-être à votre entreprise."
    ],
    backgroundThumbnail: "/img/entreprise/entreprise__post3-thumb.webp",
    date: "2024-06-01",
    tags: ["entreprise","avantage fiscal", "belgique"]
  },
  // Ajoute ici d'autres actualités entreprise...
];

export default entrepriseData;
