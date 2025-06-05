import { c as createComponent, a as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DW3zcPNd.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, c as companyInfos } from '../chunks/BaseLayout_Bw84QKvE.mjs';
export { renderers } from '../renderers.mjs';

const $$LegalMentions = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Mentions l\xE9gales | SBG Coaching", "description": "Mentions l\xE9gales et informations obligatoires de SBG Coaching : identit\xE9, contact, propri\xE9t\xE9 intellectuelle, RGPD, cookies et responsabilit\xE9.", "pageClass": "page__legal", "dataPage": "legal", "dataModules": "scrollReveal", "dataVariant": "white", "seo": {
    url: "https://sbgcoaching.be/legal",
    image: "/img/og-legal.jpg",
    schemaType: "Organization"
  } }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main wrapper-1440-black "> <section aria-labelledby="legal-title" class="legal"> <h1 id="legal-title" class="title">Mentions légales</h1> <h2>Éditeur du site</h2> <p> <strong>SBG Coaching</strong><br>
Adresse : ${companyInfos.address}<br>
Téléphone : <a${addAttribute(`tel:${companyInfos.phone.replace(/ /g, "")}`, "href")}>${companyInfos.phone}</a><br>
Email : <a${addAttribute(`mailto:${companyInfos.email}`, "href")}>${companyInfos.email}</a><br>
Numéro de TVA : BE 0717.915.212<br>
Directeur de la publication : Samuel Billa Garcia
</p> <h2>Hébergement</h2> <p>
Le site est hébergé par :<br>
OVH SAS<br>
2 rue Kellermann - 59100 Roubaix - France<br>
Téléphone : 1007
</p> <h2>Propriété intellectuelle</h2> <p>
Tout contenu présent sur ce site (textes, images, logos, vidéos, etc.) est la propriété exclusive de SBG Coaching ou de ses partenaires et est protégé par les lois sur la propriété intellectuelle. Toute reproduction, diffusion ou exploitation sans autorisation est strictement interdite.
</p> <h2>Protection des données personnelles</h2> <p>
Conformément au RGPD, SBG Coaching s’engage à protéger vos données personnelles. Aucune donnée ne sera utilisée à des fins commerciales sans votre consentement explicite. Pour en savoir plus, consultez notre <a href="/PrivacyPolicy">politique de confidentialité</a>.
</p> <h2>Cookies</h2> <p>
Ce site utilise des cookies nécessaires au bon fonctionnement. Vous pouvez gérer vos préférences via les paramètres de votre navigateur.
</p> <h2>Responsabilité</h2> <p>
SBG Coaching décline toute responsabilité pour les dommages directs ou indirects pouvant résulter de l’accès ou de l’utilisation de ce site.
</p> <h2>Contact</h2> <p>
Pour toute question relative aux mentions légales, vous pouvez nous contacter à : <a${addAttribute(`mailto:${companyInfos.email}`, "href")}>${companyInfos.email}</a>.
</p> </section> </main> ` })}`;
}, "C:/client/SBG_Coaching - v2/src/pages/LegalMentions.astro", void 0);

const $$file = "C:/client/SBG_Coaching - v2/src/pages/LegalMentions.astro";
const $$url = "/LegalMentions";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$LegalMentions,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
