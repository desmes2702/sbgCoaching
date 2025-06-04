// src/js/main.ts
import "@/scss/main.scss";

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

const page = document.body.dataset.page as PageKey;
const modules = document.body.dataset.module?.split(" ") || [];

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

document.addEventListener("DOMContentLoaded", () => {
  injectSchemaOrg();
  loadPageModule(page);

  if (modules.includes("faq")) initFAQ();
  if (modules.includes("testimonials")) initTestimonial();
 /*  if (modules.includes("scrollReveal")) initScrollReveal(); */
});
