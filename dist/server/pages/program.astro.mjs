import { c as createComponent, a as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DW3zcPNd.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Bw84QKvE.mjs';
export { renderers } from '../renderers.mjs';

const $$Program = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "\xC0 propos de SBG Coaching | Bien-\xEAtre, performance et rigueur", "description": "SBG Coaching, sp\xE9cialiste du coaching sportif \xE0 Huy, vous accompagne avec rigueur et bienveillance. D\xE9couvrez sa mission, ses valeurs et son approche centr\xE9e sur l'humain.", "pageClass": "page", "dataPage": "program", "dataModules": "links faq", "dataVariant": "white", "seo": {
    url: "https://sbgcoaching.be/program",
    /* image: "/img/og-about.jpg", */
    // modifiable
    schemaType: "LocalBusiness"
  } }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="wrapper-1440-black"> <section class="program__hero"> <h1> <span>À</span> <span></span><span>v</span><span>e</span><span>n</span><span>i</span><span>r</span> </h1> </section> </div> ` })}`;
}, "C:/client/SBG_Coaching - v2/src/pages/program.astro", void 0);

const $$file = "C:/client/SBG_Coaching - v2/src/pages/program.astro";
const $$url = "/program";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Program,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
