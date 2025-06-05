import { c as createComponent, m as maybeRenderHead, r as renderTemplate, a as renderComponent } from '../chunks/astro/server_DW3zcPNd.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, a as LazyFadeIn } from '../chunks/BaseLayout_Bw84QKvE.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$TestimonialNew = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="wrapper-1440 " id="wrapper-1440__testimonial-new"> <section class="testimonial-new"> <h2 class="testimonial-new__title title">Des témoignages authentiques</h2> <h3 class="testimonial-new__subtitle">Des résultats concrets</h3> <p class="testimonial-new__description">
Que ce soit pour améliorer leurs performances, optimiser leur condition physique ou adopter un mode de vie plus sain,
      ces témoignages reflètent les résultats d’un travail sérieux et structuré.
</p> <h4 class="testimonials__type">Le plus récent</h4> <div class="testimonial-new__wrapper"> <div class="testimonial-new__image"></div> <div class="testimonial-new__content"> <h3 class="testimonial-new__name"></h3> <p class="testimonial-new__meta"> <span class="testimonial-new__job"></span> <span class="testimonial-new__age"></span> </p> <blockquote class="testimonial-new__quote"></blockquote> </div> </div> </section> </div>`;
}, "C:/client/SBG_Coaching - v2/src/partials/testimonials/TestimonialNew.astro", void 0);

const $$TestimonialsLast = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="wrapper-1440 "> <section id="testimonials-last" class="testimonials-last"> <h4 class="testimonials__type">Les plus anciens</h4> </section> </div>`;
}, "C:/client/SBG_Coaching - v2/src/partials/testimonials/TestimonialsLast.astro", void 0);

const $$TestimonialsSubmit = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="wrapper-1440-black "> <section class="testimonial__submit "> <h2 class="section-title title">Partage ton expérience</h2> <p>Tu veux aider d'autres personnes à franchir le pas ?</p> <a href="https://forms.gle/XSsVit1irmn1RUEGA" class="button button-red" target="_blank" rel="noopener noreferrer">
Laisser un témoignage
</a> </section> </div>`;
}, "C:/client/SBG_Coaching - v2/src/partials/testimonials/TestimonialsSubmit.astro", void 0);

const $$Testimonials = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "T\xE9moignages clients | Coaching sportif personnalis\xE9 \xE0 Huy", "description": "D\xE9couvrez les avis authentiques de nos clients sur leur exp\xE9rience de coaching avec SBG Coaching. Transformation, bien-\xEAtre et motivation au rendez-vous.", "pageClass": "page__testimonials", "dataPage": "testimonials", "dataModules": "testimonials links scrollReveal", "dataVariant": "black", "seo": {
    url: "https://sbgcoaching.be/testimonials",
    /*   image: "/img/og-testimonials.jpg", */
    // à générer si besoin
    schemaType: "Review"
  } }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main"> ${renderComponent($$result2, "TestimonialNew", $$TestimonialNew, {})} ${renderComponent($$result2, "LazyFadeIn", LazyFadeIn, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@partials/performance/LazyFadeIn", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "TestimonialsLast", $$TestimonialsLast, {})} ` })} ${renderComponent($$result2, "LazyFadeIn", LazyFadeIn, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@partials/performance/LazyFadeIn", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "TestimonialsSubmit", $$TestimonialsSubmit, {})} ` })} </main> ` })}`;
}, "C:/client/SBG_Coaching - v2/src/pages/testimonials.astro", void 0);

const $$file = "C:/client/SBG_Coaching - v2/src/pages/testimonials.astro";
const $$url = "/testimonials";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Testimonials,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
