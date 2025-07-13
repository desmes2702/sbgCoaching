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
  email: "info@sbgcoaching.be",
  phone: "+32 494 20 50 75",
  address: "Route de Yernée 264, 4480 Engis, Belgique",
  map: "https://maps.app.goo.gl/mYQDcvFR6XqqGpR57",
  social: {
    linkedin: "https://www.linkedin.com/in/samuel-billa-garcia/",
    facebook: "https://www.facebook.com/samuelbillagarciacoaching",
    instagram: "https://www.instagram.com/sambillagarcia/",
  },
  schemaOrg: {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SportsActivityLocation", "HealthAndBeautyBusiness"],
    name: "SBG Coaching – Coach sportif entreprise à Liège",
    description: "Coaching sportif en entreprise à Liège : bien-être au travail, prévention santé, team building et gestion du stress pour salariés et dirigeants.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Route de Yernée 264",
      addressLocality: "Engis",
      addressRegion: "Liège",
      postalCode: "4480",
      addressCountry: "BE"
    },
    telephone: "+32 494 20 50 75",
    email: "info@sbgcoaching.be",
    url: "https://sbgcoaching.be",
    sameAs: [
      "https://www.linkedin.com/in/samuel-billa-garcia/",
      "https://www.facebook.com/samuelbillagarciacoaching",
      "https://www.instagram.com/sambillagarcia/"
    ]
  }
};
