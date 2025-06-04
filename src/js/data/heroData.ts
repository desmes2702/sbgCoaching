import { testimonials } from "@/js/data/testimonialsData";

const generalTestimonials = testimonials.filter(t => t.key === "general");

// Helper pour tronquer à 100 caractères (sans couper un mot)
function truncateText(text: string): string {
  if (text.length <= 200) return text;
  return text.slice(0, 200).replace(/\s+\S*$/, '') + "...";
}

const photo1 = generalTestimonials[0]?.photo || "";
const photo2 = generalTestimonials[1]?.photo || "";
const name1 = generalTestimonials[0]?.name || "";
const name2 = generalTestimonials[1]?.name || "";
const para1 = generalTestimonials[0]?.text?.[0] ? truncateText(generalTestimonials[0].text[0]) : "";
const para2 = generalTestimonials[1]?.text?.[0] ? truncateText(generalTestimonials[1].text[0]) : "";

export interface HeroContent {
  title: string;
  paragraphs: string[];
  backgroundMain?: string;
  backgroundThumbnail?: string;
  video?: string;
  link?: {
    href: string;
    label: string;
  };
  id?: string;
}

export type HeroDataType = {
  entreprise: HeroContent[];
  general: HeroContent[];
};

export const heroData: HeroDataType = {
  entreprise: [
    {
      id: "entreprise-slide-1",
      title: "Coaching sportif <span>_Entreprise</span>",
      paragraphs: [
        "Dans le monde professionnel moderne, la productivité et le bien-être des employés sont plus interconnectés que jamais.",
        "Reconnaissant cette réalité, le coaching en entreprise émerge comme une solution incontournable pour les organisations visant l’excellence."
      ],
      backgroundMain: "/img/entreprise/entreprise__post1-main.png",
      backgroundThumbnail: "/img/entreprise/entreprise__post1-thumb.png"

    },
    {
      id: "entreprise-slide-2",
      title: "",
      paragraphs: [""],
      backgroundThumbnail: "/img/entreprise/entreprise__post2-thumb.png",
      video: "/videos/rtlTvi.mp4"

    },
    {
      id: "entreprise-slide-3",
      title: "<span class='highlight'>100% DÉDUCTIBLE !</span>",
      paragraphs: [
        "Le coaching en entreprise est déductible à 100% en Belgique.",
        "Offrez un avantage fiscal tout en investissant dans le bien-être à votre entreprise."
      ],
      backgroundMain: "/img/entreprise/entreprise__post3-main.png",
      backgroundThumbnail: "/img/entreprise/entreprise__post3-thumb.png",

      link: {
        href: "https://finances.belgium.be/fr/entreprises/frais-professionnels#q1",
        label: "En savoir plus sur cette déductibilité"
      }

    }
  ],
  general: [
    {
      id: "general-slide-1",
      title: "Coaching sportif <span>_Général</span>",
      paragraphs: [
        "Retrouvez la forme, gagnez en énergie et atteignez vos objectifs personnels.",
        "Avec un accompagnement sur-mesure, le coaching s’adapte à vous, pas l’inverse."
      ],
      backgroundMain: "/img/general/general__post1.png",
      backgroundThumbnail:"/img/general/general__post1-thumb.png"
    },
    {
      id: "general-slide-2",
      title: name1,
      paragraphs: [para1],
      backgroundMain: photo1,
      backgroundThumbnail:"/img/general/general__post2-thumb.png",
      link: {
        href: "/testimonials",
        label: "Lire le témoignage"
      }
    },
    {
      id: "general-slide-3",
      title: name2,
      paragraphs: [para2],
      backgroundMain: photo2,
      backgroundThumbnail:"/img/general/general__post3-thumb.png",
      link: {
        href: "/testimonials",
        label: "Lire le témoignage"
      }
    }
  ],
};

export default heroData;
