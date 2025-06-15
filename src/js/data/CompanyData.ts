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