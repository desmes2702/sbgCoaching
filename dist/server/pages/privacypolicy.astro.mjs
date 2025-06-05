import { c as createComponent, a as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DW3zcPNd.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, c as companyInfos } from '../chunks/BaseLayout_Bw84QKvE.mjs';
export { renderers } from '../renderers.mjs';

const $$PrivacyPolicy = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Politique de confidentialit\xE9 | SBG Coaching", "description": "D\xE9couvrez comment SBG Coaching prot\xE8ge vos donn\xE9es personnelles et respecte votre vie priv\xE9e conform\xE9ment au RGPD.", "pageClass": "page__privacy", "dataPage": "privacy-policy", "dataModules": "scrollReveal", "dataVariant": "white", "seo": {
    url: "https://sbgcoaching.be/privacy-policy",
    image: "/img/og-privacy.jpg",
    // optionnel, à créer si souhaité
    schemaType: "Organization"
  } }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main wrapper-1440-black "> <section aria-labelledby="privacy-title" class="legal"> <h1 id="privacy-title" class="title">Politique de confidentialité</h1> <p>
SBG Coaching attache une grande importance à la protection de vos données personnelles et au respect de votre vie privée, conformément au Règlement Général sur la Protection des Données (RGPD).
</p> <h2>1. Responsable du traitement</h2> <p> <strong>SBG Coaching</strong><br>
Adresse : ${companyInfos.address}<br>
Email : <a${addAttribute(`mailto:${companyInfos.email}`, "href")}>${companyInfos.email}</a><br>
Numéro de TVA : BE 0717.915.212
</p> <h2>2. Données collectées</h2> <p>
Nous collectons uniquement les données nécessaires pour répondre à vos demandes (formulaire de contact, prise de rendez-vous) : nom, prénom, email, téléphone, message, éventuellement objectifs de coaching.
</p> <h2>3. Finalités du traitement</h2> <p>Les données collectées sont utilisées uniquement pour :</p> <ul> <li>Traiter vos demandes de contact et de renseignements</li> <li>Organiser les séances de coaching</li> <li>Améliorer nos services et notre suivi</li> <li>Respecter nos obligations légales et contractuelles</li> </ul> <h2>4. Durée de conservation</h2> <p>
Vos données sont conservées pour la durée nécessaire à la réalisation des finalités ci-dessus, sauf obligation légale de conservation plus longue.
</p> <h2>5. Partage des données</h2> <p>
Vos données ne sont jamais transmises à des tiers à des fins commerciales. Elles peuvent être partagées uniquement avec des prestataires nécessaires à la gestion du site ou des services (hébergeur, outils de gestion, etc.), tenus au respect de la confidentialité.
</p> <div class="legal__droits"> <h2>6. Vos droits</h2> <p>Conformément au RGPD, vous disposez des droits suivants :</p> <ul> <li>Droit d’accès à vos données</li> <li>Droit de rectification ou de suppression</li> <li>Droit de limitation ou d’opposition au traitement</li> <li>Droit à la portabilité</li> <li>Droit d’introduire une réclamation auprès de l’Autorité de protection des données (Belgique)</li> </ul> <p>
Pour exercer vos droits, il vous suffit de nous contacter à l’adresse :<br> <a${addAttribute(`mailto:${companyInfos.email}`, "href")}>${companyInfos.email}</a> </p> </div> <h2>7. Cookies</h2> <p>
Nous utilisons uniquement des cookies techniques indispensables au fonctionnement du site. Aucun cookie de suivi ou de publicité n’est utilisé sans votre consentement explicite.
</p> <h2>8. Sécurité</h2> <p>
Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour garantir la sécurité de vos données et prévenir toute perte, utilisation détournée ou accès non autorisé.
</p> <h2>9. Modification de la politique</h2> <p>
Cette politique de confidentialité peut être mise à jour à tout moment. La date de dernière mise à jour figure en bas de page.
</p> <p style="font-size:0.9em;color:#888;">
Dernière mise à jour : ${(/* @__PURE__ */ new Date()).toLocaleDateString("fr-BE")} </p> </section> </main> ` })}`;
}, "C:/client/SBG_Coaching - v2/src/pages/PrivacyPolicy.astro", void 0);

const $$file = "C:/client/SBG_Coaching - v2/src/pages/PrivacyPolicy.astro";
const $$url = "/PrivacyPolicy";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$PrivacyPolicy,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
