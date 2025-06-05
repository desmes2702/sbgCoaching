import { c as createComponent, m as maybeRenderHead, r as renderTemplate, a as renderComponent } from '../chunks/astro/server_DW3zcPNd.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, a as LazyFadeIn } from '../chunks/BaseLayout_Bw84QKvE.mjs';
import 'clsx';
import { $ as $$Faq } from '../chunks/Faq_BGLDF1I_.mjs';
export { renderers } from '../renderers.mjs';

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="wrapper-1440-black"> <section class="about__hero "> <div class="about__hero__content "> <p class="about__hero__role"> <span class="highlight">Fondateur</span> SBG <span class="light">coaching</span> </p> <h1 class="about__hero__name title">Samuel <br>Billa Garcia</h1> <blockquote class="about__hero__quote">
Le seul mauvais entraînement<br>est celui que l’on ne fait pas.
<span class="about__hero__signature"></span> </blockquote> </div> <div class="about__hero__img"></div> </section> </div>`;
}, "C:/client/SBG_Coaching - v2/src/partials/about/Hero.astro", void 0);

const $$Experience = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="wrapper-1440 " id="wrapper-experience"> <section class="parcours fade-cascade"> <h2 class="parcours__title title">MON PARCOURS</h2> <div class="parcours__content"> <h3 class="parcours__subtitle">_FORMATIONS</h3> <ul class="parcours__list"> <li class="parcours__item parcours__item1"> <div class="parcours__info"> <h4 class="parcours__label">MONITEUR SPORTIF INITIATEUR</h4> <p class="parcours__desc">Haltérophilie et Powerlifting (ADEPS)</p> </div> <span class="parcours__date">2022</span> </li> <li class="parcours__item parcours__item2"> <div class="parcours__info"> <h4 class="parcours__label">U-BOUND</h4> <p class="parcours__desc">Radical fitness</p> </div> <span class="parcours__date">2021</span> </li> <li class="parcours__item parcours__item3"> <div class="parcours__info"> <h4 class="parcours__label">COACHING SPORTIF</h4> <p class="parcours__desc">HEPL - Haute Ecole de la Province de Liège</p> </div> <span class="parcours__date">2018 - 2022</span> </li> <li class="parcours__item parcours__item4"> <div class="parcours__info"> <h4 class="parcours__label">SPORT ÉTUDE - TENNIS</h4> <p class="parcours__desc">Études secondaires - IPES Huy</p> </div> <span class="parcours__date">2013 - 2016</span> </li> </ul> </div> <div class="parcours__section parcours__section__experience"> <h3 class="parcours__subtitle">_EXPÉRIENCE</h3> <ul class="parcours__list"> <li class="parcours__item"> <div class="parcours__info"> <h4 class="parcours__label">COACHING SPORTIF EN ENTREPRISE</h4> <p class="parcours__desc">Auto-entrepreneur</p> </div> <span class="parcours__date">2023 - 2025</span> </li> <li class="parcours__item"> <div class="parcours__info"> <h4 class="parcours__label">COACH SPORTIF</h4> <p class="parcours__desc">Life style fitness - Huy</p> </div> <span class="parcours__date">2017 - 2025</span> </li> </ul> </div> </section> </div>`;
}, "C:/client/SBG_Coaching - v2/src/partials/about/Experience.astro", void 0);

const $$Slogan = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="wrapper-982-black "> <section class="convictions "> <div class="convictions__container"> <h2 class="convictions__title title">MES CONVICTIONS</h2> <div class="convictions__slogan"> <div class="slogan__wrapper"> <p class="slogan__text">
Le seul mauvais entraînement est celui que l’on ne fait pas.
</p> </div> </div> <div class="convictions__intro"> <span class="convictions__dot"></span> <span class="convictions__label">Ce que cela signifie pour nous</span> </div> <div class="convictions__grid"> <div class="convictions__item"> <h3 class="convictions__item-title">Un pas après l’autre</h3> <p class="convictions__item-text">
Même un entraînement rapide vaut mieux que de rester inactif. Avec chaque effort, vous progressez.
</p> </div> <div class="convictions__item"> <h3 class="convictions__item-title">La constance avant tout</h3> <p class="convictions__item-text">
Aucun entraînement n'est jamais "raté". Chaque session, même courte, vous rapproche de votre objectif et renforce votre discipline.
</p> </div> <div class="convictions__item"> <h3 class="convictions__item-title">Un engagement personnel</h3> <p class="convictions__item-text">
En persévérant, vous vous montrez à vous-même que vous pouvez surmonter les obstacles, qu’ils soient physiques ou mentaux.
</p> </div> </div> </div> </section> </div>`;
}, "C:/client/SBG_Coaching - v2/src/partials/about/Slogan.astro", void 0);

const $$Message = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="wrapper-982 "> <section class="message"> <div class="message__container"> <h2 class="message__title title">Comment SBG vous accompagne&nbsp;?</h2> <p class="message__text"> <em>
Nous croyons fermement que le succès dans le sport, comme dans la vie, réside dans la régularité et la détermination. <br>
Chaque session est une nouvelle chance d’avancer et de grandir.<br>
Nous sommes là pour vous aider à donner le meilleur de vous-même, à votre rythme, sans pression inutile, mais avec le soutien et la motivation nécessaires pour aller toujours un peu plus loin.
</em> </p> <div class="message__logo"> <img src="/img/logo-black.svg" alt="Logo SBG Coaching"> </div> </div> </section> </div>`;
}, "C:/client/SBG_Coaching - v2/src/partials/about/Message.astro", void 0);

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "\xC0 propos de SBG Coaching | Bien-\xEAtre, performance et rigueur", "description": "SBG Coaching, sp\xE9cialiste du coaching sportif \xE0 Huy, vous accompagne avec rigueur et bienveillance. D\xE9couvrez sa mission, ses valeurs et son approche centr\xE9e sur l'humain.", "pageClass": "page", "dataPage": "about", "dataModules": "links faq", "dataVariant": "white", "seo": {
    url: "https://sbgcoaching.be/about",
    /* image: "/img/og-about.jpg", */
    // modifiable
    schemaType: "LocalBusiness"
  } }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "LazyFadeIn", LazyFadeIn, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@partials/performance/LazyFadeIn", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Experience", $$Experience, {})} ` })} ${renderComponent($$result2, "LazyFadeIn", LazyFadeIn, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@partials/performance/LazyFadeIn", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Slogan", $$Slogan, {})} ` })} ${renderComponent($$result2, "LazyFadeIn", LazyFadeIn, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@partials/performance/LazyFadeIn", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Message", $$Message, {})} ` })} ${renderComponent($$result2, "LazyFadeIn", LazyFadeIn, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@partials/performance/LazyFadeIn", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Faq", $$Faq, {})} ` })} </main> ` })}`;
}, "C:/client/SBG_Coaching - v2/src/pages/about.astro", void 0);

const $$file = "C:/client/SBG_Coaching - v2/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
