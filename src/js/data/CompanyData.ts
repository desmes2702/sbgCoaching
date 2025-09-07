// src/js/data/CompanyData.ts - Version corrigée FR/SEO

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
  seo?: {
    keywords: string[];
    areaServed: string[];
    services: string[];
  };
}

// Mots-clés coaching entreprise (Liège)
export const SEO_COACHING_KEYWORDS = [
  "coaching sportif entreprise Liège",
  "coach sportif entreprises Liège",
  "team building sportif Liège",
  "bien-être au travail Liège",
  "coaching bien-être salariés Liège",
  "cohésion équipe sport Liège",
  "gestion stress travail sport Liège",
  "programme sport entreprise Liège",
  "corporate wellness Liège",
  "coaching santé prévention entreprise Liège",
];

export const SERVICES_COACHING = [
  "Coaching Sportif en Entreprise",
  "Team Building Sportif",
  "Programme Bien-être Salariés",
  "Coaching Gestion du Stress",
  "Séances Collectives Corporate",
  "Coaching Santé & Prévention",
  "Atelier Cohésion d’équipe",
  "Corporate Wellness Program",
];

export const AREA_SERVED = [
  "Liège",
  "Province de Liège",
  "Huy",
  "Engis",
  "Seraing",
  "Flémalle",
  "Saint-Georges-sur-Meuse",
  "Herstal",
  "Grâce-Hollogne",
  "Ans",
  "Awans",
  "Chaudfontaine",
  "Wallonie",
];

// Données entreprise
export const companyInfos: CompanyInfos = {
  email: "info@sbgcoaching.be",
  phone: "+32 494 20 50 75",
  address: "Route de Yernée 264, 4480 Engis, Belgique",
  map: "https://maps.app.goo.gl/mYQDcvFR6XqqGpR57",

  social: {
    linkedin: "https://www.linkedin.com/in/samuel-billa-garcia/",
    facebook: "https://www.facebook.com/samuelbillagarciacoaching",
    instagram: "https://www.instagram.com/sambillagarcia/",
  },

  seo: {
    keywords: SEO_COACHING_KEYWORDS,
    areaServed: AREA_SERVED,
    services: SERVICES_COACHING,
  },

  schemaOrg: {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SportsActivityLocation", "HealthAndBeautyBusiness"],

    // Nom & description optimisés
    name: "SBG Coaching – Coach Sportif Entreprise à Liège | Samuel Billa Garcia",
    alternateName: "SBG Coaching",
    description:
      "Coaching sportif en entreprise à Liège : bien-être au travail, team building sportif, gestion du stress et cohésion d’équipe. Programme sur mesure pour entreprises Province de Liège.",

    // Localisation précise
    address: {
      "@type": "PostalAddress",
      streetAddress: "Route de Yernée 264",
      addressLocality: "Engis",
      addressRegion: "Liège",
      postalCode: "4480",
      addressCountry: "BE",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: "50.544440",
      longitude: "5.340041",
    },

    // Contact
    telephone: "+32 494 20 50 75",
    email: "info@sbgcoaching.be",
    url: "https://sbgcoaching.be",

    // Services coaching entreprise détaillés
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services Coaching Sportif Entreprise Liège",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Coaching Sportif en Entreprise Liège",
            description:
              "Séances collectives de coaching sportif pour améliorer le bien-être au travail et la cohésion d’équipe",
            provider: { "@type": "Person", name: "Samuel Billa Garcia" },
            areaServed: AREA_SERVED,
            availableChannel: { "@type": "ServiceChannel", availableLanguage: "French" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Team Building Sportif Liège",
            description:
              "Ateliers team building par le sport pour renforcer la cohésion d’équipe et améliorer la communication",
            provider: { "@type": "Person", name: "Samuel Billa Garcia" },
            areaServed: AREA_SERVED,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Programme Bien-être Salariés Liège",
            description:
              "Programmes de sport en entreprise pour réduire le stress, améliorer la santé et prévenir l’absentéisme",
            provider: { "@type": "Person", name: "Samuel Billa Garcia" },
            areaServed: AREA_SERVED,
          },
        },
      ],
    },

    // Coach certifié
    employee: {
      "@type": "Person",
      name: "Samuel Billa Garcia",
      jobTitle: "Coach Sportif Entreprise Certifié",
      description:
        "Coach sportif spécialisé en coaching d’entreprise, team building et bien‑être au travail",
      sameAs: [
        "https://www.linkedin.com/in/samuel-billa-garcia/",
        "https://www.instagram.com/sambillagarcia/",
      ],
    },

    // Zone de service
    areaServed: AREA_SERVED,

    // Disponibilité
    openingHours: ["Mo-Fr 07:00-20:00", "Sa 08:00-18:00"],

    // Réseaux sociaux
    sameAs: [
      "https://www.linkedin.com/in/samuel-billa-garcia/",
      "https://www.facebook.com/samuelbillagarciacoaching",
      "https://www.instagram.com/sambillagarcia/",
    ],

    // Mots-clés SEO
    keywords: SEO_COACHING_KEYWORDS.join(", "),

    // Business metrics
    priceRange: "€€",
    paymentAccepted: ["Cash", "Credit Card", "Bank Transfer"],
    currenciesAccepted: "EUR",
  },
};

// Helpers SEO
export const getSeoKeywords = (type: "entreprise" | "general" | "all" = "all") => {
  switch (type) {
    case "entreprise":
      return SEO_COACHING_KEYWORDS.filter(
        (keyword) =>
          keyword.includes("entreprise") ||
          keyword.includes("team building") ||
          keyword.includes("bien-être travail")
      );
    case "general":
      return SEO_COACHING_KEYWORDS.filter(
        (keyword) => keyword.includes("coach sportif") && !keyword.includes("entreprise")
      );
    default:
      return SEO_COACHING_KEYWORDS;
  }
};

export const getSchemaForPage = (pageType: "home" | "entreprise" | "general") => {
  type Schema = Record<string, unknown> & { name?: string; description?: string };
  const baseSchema: Schema = { ...(companyInfos.schemaOrg as Record<string, unknown>) };

  switch (pageType) {
    case "entreprise":
      baseSchema.name = "SBG Coaching - Coaching Sportif Entreprise Liège | Team Building";
      baseSchema.description =
        "Spécialiste coaching sportif en entreprise à Liège. Team building, bien‑être au travail, cohésion d’équipe. Devis gratuit Province de Liège.";
      break;
    case "general":
      baseSchema.name = "SBG Coaching - Personal Trainer Liège | Coach Sportif Personnel";
      baseSchema.description =
        "Coach sportif personnel à Liège. Programme fitness sur mesure, perte de poids, musculation. Première séance offerte.";
      break;
  }

  return baseSchema;
};

export default companyInfos;
