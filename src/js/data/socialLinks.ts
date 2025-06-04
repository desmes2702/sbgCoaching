// src/js/data/socialLinks.ts
export type SocialPlatform = "linkedin" | "facebook" | "instagram";

export interface SocialLink {
  url: string;
  icon: string;
  label: string;
  variant: "black" | "white" | "red";
}

export const socialLinks: Record<SocialPlatform, SocialLink> = {
  linkedin: {
    url: "https://www.linkedin.com/company/sbg-leadership-coaching-and-consulting/",
    icon: "icon__linkedin",
    label: "LinkedIn",
    variant: "black",
  },
  facebook: {
    url: "https://www.facebook.com/samuelbillagarciacoaching",
    icon: "icon__facebook",
    label: "Facebook",
    variant: "black",
  },
  instagram: {
    url: "https://www.instagram.com/sambillagarcia/",
    icon: "icon__instagram",
    label: "Instagram",
    variant: "red",
  },
};
