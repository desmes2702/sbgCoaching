// src/js/main.ts
// 🌍 Modules globaux
import { injectSchemaOrg } from "@/js/global/__schemaOrg";
import { initFAQ } from "@/js/global/__faq";
import { initTestimonial } from "@/js/global/__testimonials";
/* import initScrollReveal from "@/js/global/__scrollReveal"; */
import { hideFooterForm } from "@/js/global/__footer";
import { initRecaptcha } from "@/js/global/__recaptcha";
import { injectLegalContent } from "@/js/legal/__mentions";

// 🧭 Page actuelle (via body[data-page])
type PageKey =
  | "index"
  | "rdv"
  | "about"
  | "legal"
  | "coaching-general"
  | "coaching-entreprise"
  | "contact"
  | "testimonial"
  | string;

async function loadPageModule(page: PageKey) {
  switch (page) {
    case "index":
      await import("@/js/about/__slogan");
      break;

    case "rdv": {
      const { initForm } = await import("@/js/global/initForm");
      initForm();
      await import("@/js/rdv/__sendForm");
      hideFooterForm();
      initRecaptcha();
      break;
    }

    case "about":
      await import("@/js/about/__slogan");
      break;

    case "legal":
      injectLegalContent();
      break;

    default:
      console.warn(`🟡 Aucune initialisation trouvée pour data-page="${page}"`);
  }

  console.log(`✅ Script principal activé : ${page}`);
}

// Vérifier si nous sommes dans un environnement navigateur
if (typeof window !== 'undefined') {
  // Préchargement du CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/src/scss/main.scss';
  document.head.appendChild(link);

  document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page as PageKey;
    const modules = document.body.dataset.module?.split(" ") || [];

    injectSchemaOrg();
    loadPageModule(page);

    if (modules.includes("faq")) initFAQ();
    if (modules.includes("testimonials")) initTestimonial();
   /*  if (modules.includes("scrollReveal")) initScrollReveal(); */
  });
}
