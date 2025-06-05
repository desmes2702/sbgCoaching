import { c as createComponent, e as createAstro, m as maybeRenderHead, r as renderTemplate, b as addAttribute, a as renderComponent } from '../chunks/astro/server_DW3zcPNd.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, a as LazyFadeIn } from '../chunks/BaseLayout_Bw84QKvE.mjs';
import 'clsx';
import { $ as $$Faq } from '../chunks/Faq_BGLDF1I_.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Hero;
  Astro2.props.currentPage || "index";
  return renderTemplate`${maybeRenderHead()}<div class="wrapper-1440-black"> <div class="subWrapper-col2  "> <section class="hero  "> <div class="hero__content"> <h1 class="hero__title title">Le seul mauvais entraînement est celui que l'on ne fait pas</h1> <p class="hero__subtitle">Votre corps mérite l'effort, votre esprit mérite la discipline. Ensemble, nous transformerons chaque excuse en une victoire personnelle. Faites le premier pas, le reste suivra.</p> <div class="hero__photo"></div> <a href="/contact" class="hero__cta button button-red" aria-label="prendre rendez-vous">Prendre rendez-vous</a> </div> </section> <section class="gallery "> <h2 class="gallery__title">Actualité</h2> <div class="gallery__grid"> <div class="gallery__item gallery__item-new"> <a href="https://instagram.com/post1" target="_blank" class="gallery__button">Voir</a> </div> <div class="gallery__item gallery__item-mid"> <a href="https://instagram.com/post2" target="_blank" class="gallery__button">Voir</a> </div> <div class="gallery__item gallery__item-last"> <a href="https://instagram.com/post3" target="_blank" class="gallery__button">Voir</a> </div> <div class="gallery__social"> <!-- Icônes sociales ici --> </div> </div> </section> </div> </div>`;
}, "C:/client/SBG_Coaching - v2/src/partials/index/Hero.astro", void 0);

const $$Program = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="wrapper-1440 "> <section class="home__training"> <h2 class="title">Un entraînement à votre échelle</h2> <p>Définissons ensemble le chemin à prendre pour répondre à vos besoins et atteindre les résultats auxquels vous aspirez.</p> <div class="home__training__img home__training__exemple"> <img class="home__training__card" src="/img/home__training__card.svg" alt="exemple du profil physique d'une femme de 34 ans, d'une taille de 167 cm et d'une masse corporelle de 83 kg"> <img class="home__training__arrow" src="/img/home__arrow.svg" alt=""> <img class="home__training__program" src="/img/home__training__program.svg" alt="Pour répondre à son programme SBG lui propose un programme sur-mesure, de : musculation, perte de poids et revalidation"> <img class="home__training__graph" src="/img/home__training__graph.svg" alt="En 3 mois, elle perd presque 10 kg"> </div> <div class="home__training__img home__training__program "> <img class="home__training__program1" src="/img/program1.png" alt="programme sur-mesure de course de 8 minutes comprenant 6 exercices"> <img class="home__training__program2" src="/img/program2.png" alt="prescription d'une journée type pour établir des plats adaptés selon l'heure et le profil de la personne"> </div> </section> </div>`;
}, "C:/client/SBG_Coaching - v2/src/partials/index/Program.astro", void 0);

const $$CoachingBusiness = createComponent(($$result, $$props, $$slots) => {
  const videoSrc = "videos/rtlTvi.mp4";
  return renderTemplate`${maybeRenderHead()}<div class="wrapper-1440-black "> <section id="business-coaching" class="business-coaching "> <h2 class="business-coaching__title subTitle">
Coaching <span class="business-coaching__highlight title">Entreprise</span> </h2> <p class="business-coaching__desc">
Nous croyons fermement que le bien-être des employés est essentiel pour une entreprise prospère. Grâce à nos sessions de coaching personnalisées, nous aidons les équipes à se surpasser, à renforcer leur cohésion et à améliorer leur santé physique et mentale.
</p> <p class="business-coaching__collaboration">
En collaboration avec <strong>UDH</strong>, pour l'accès à la salle de sport et le coaching en entreprise.
</p> <div class="business-coaching__media coaching__hero__wrapper" aria-label="Vidéo de présentation"> <div class="business-coaching__video-container video-wrapper"> <video${addAttribute(videoSrc, "src")} controls preload="metadata" class="business-coaching__video">
Votre navigateur ne prend pas en charge la lecture vidéo.
</video> </div> </div> <blockquote class="business-coaching__quote"> <p class="business-coaching__quote-text">
La crise du Covid, qui a démarré voici 4 ans, a mis en évidence l'importance du bien-être sur son lieu de travail.
</p> <p class="business-coaching__quote-text">
Pour y arriver, des entreprises intègrent désormais des séances de sport dans leur planning. Veiller au bien-être des employés par l'effort physique, c'est notre instant sport.
</p> <cite class="business-coaching__quote-author">RTL INFO</cite> </blockquote> <div class="business-coaching__cta"> <p class="business-coaching__cta-text">
Vous êtes une entreprise à la recherche de solutions pour booster la motivation et le bien-être de vos collaborateurs ?
</p> <a href="/entreprise" class="button button-black">
En savoir plus
</a> </div> </section> </div>
\`\`\``;
}, "C:/client/SBG_Coaching - v2/src/partials/index/CoachingBusiness.astro", void 0);

const $$Testimonials = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="wrapper-1440 "> <section id="testimonials-index" class="testimonials"> <h2 class="testimonials__title subTitle">Témoignages</h2> <h3 class="testimonials__subtitle title">Des résultats qui parlent</h3> <p class="testimonials__intro">Des clients satisfaits qui recommandent SBG Coaching :</p> <div class="testimonials__wrapper"> <div class="testimonials__item"> <!-- Ici tu peux ajouter tes éléments de témoignages --> </div> </div> <a class="testimonials__button button button-black" href="/testimonials">Tout voir</a> </section> </div>`;
}, "C:/client/SBG_Coaching - v2/src/partials/index/Testimonials.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Accueil | Coaching Sportif", "description": "Coaching sportif professionnel, individuel et en groupe. D\xE9couvrez nos services adapt\xE9s \xE0 vos besoins et vos objectifs.", "pageClass": "page__accueil", "dataPage": "index", "dataModules": "links faq scrollReveal", "dataVariant": "white", "seo": {
    url: "https://sbgcoaching.be/",
    /* image: "/img/og-home.jpg", */
    schemaType: "LocalBusiness"
  } }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main"> ${renderComponent($$result2, "Hero", $$Hero, { "currentPage": "index" })} ${renderComponent($$result2, "LazyFadeIn", LazyFadeIn, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@partials/performance/LazyFadeIn", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Program", $$Program, { "currentPage": "index" })} ` })} ${renderComponent($$result2, "LazyFadeIn", LazyFadeIn, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@partials/performance/LazyFadeIn", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CoachingBusiness", $$CoachingBusiness, { "currentPage": "index" })} ` })} ${renderComponent($$result2, "LazyFadeIn", LazyFadeIn, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@partials/performance/LazyFadeIn", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Testimonials", $$Testimonials, { "currentPage": "index" })} ` })} <!-- <OfflineInfo currentPage="index" /> --> </main> ${renderComponent($$result2, "LazyFadeIn", LazyFadeIn, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@partials/performance/LazyFadeIn", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "FAQ", $$Faq, {})} ` })} ` })}`;
}, "C:/client/SBG_Coaching - v2/src/pages/index.astro", void 0);

const $$file = "C:/client/SBG_Coaching - v2/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
