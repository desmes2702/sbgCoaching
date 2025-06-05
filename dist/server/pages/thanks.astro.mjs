import { c as createComponent, a as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DW3zcPNd.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Bw84QKvE.mjs';
export { renderers } from '../renderers.mjs';

const $$Thanks = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Merci pour votre message", "description": "Confirmation d'envoi d'email \u2013 SBG Coaching", "dataVariant": "white", "dataPage": "thanks" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="wrapper-1440-black"> <div class="thanks__container"> <h1 class="thanks__title title">Merci pour votre message !</h1> <p class="thanks__subtitle">
Nous avons bien reçu votre demande.<br>
L’équipe SBG Coaching vous répondra très rapidement.<br><br> <!-- <strong>Un email de confirmation vient de vous être envoyé.</strong> --> </p> <a href="/" class="button button-red thanks__cta">Retour à l’accueil</a> </div> </section> ` })}`;
}, "C:/client/SBG_Coaching - v2/src/pages/thanks.astro", void 0);

const $$file = "C:/client/SBG_Coaching - v2/src/pages/thanks.astro";
const $$url = "/thanks";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Thanks,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
