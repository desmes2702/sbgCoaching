import { c as createComponent, m as maybeRenderHead, r as renderTemplate, a as renderComponent } from '../chunks/astro/server_DW3zcPNd.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, a as LazyFadeIn } from '../chunks/BaseLayout_Bw84QKvE.mjs';
import { C as CoachingHero } from '../chunks/CoachingHero_DDI_sQ2e.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import 'clsx';
import { $ as $$Faq } from '../chunks/Faq_BGLDF1I_.mjs';
export { renderers } from '../renderers.mjs';

const performanceContent = [
  {
    title: "Investissement dans le capital humain",
    description: [
      "SBG coaching propose un programme de coaching en entreprise unique, conçu pour répondre aux défis spécifiques des professionnels d’aujourd’hui.",
      "En se concentrant sur la santé physique et mentale, SBG aide les équipes à atteindre leur plein potentiel, favorisant ainsi un environnement de travail plus dynamique et productif."
    ]
  },
  {
    title: "Programmes sur mesure",
    description: [
      "Nos solutions sont entièrement personnalisées selon les besoins spécifiques de votre entreprise.",
      "Nous élaborons des programmes ciblés, qu'il s'agisse de séances collectives, de coaching individuel, ou de conférences bien-être adaptées à vos équipes."
    ]
  },
  {
    title: "Avantages tangibles",
    description: [
      "Nos interventions permettent de réduire l'absentéisme, d'améliorer la cohésion d'équipe et de renforcer la motivation des collaborateurs.",
      "Les entreprises constatent une hausse de la productivité et un climat de travail plus positif."
    ]
  }
];
const Performance = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const toggleContent = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  return /* @__PURE__ */ jsx("div", { className: "wrapper-1440-black", children: /* @__PURE__ */ jsxs("section", { className: "coaching__entrerpise__perfo section-height90 ", "aria-label": "Amélioration des performances en entreprise", children: [
    /* @__PURE__ */ jsx("h2", { children: "Une amélioration de vos performances en entreprise" }),
    /* @__PURE__ */ jsx("div", { className: "coaching__entrerpise__perfo__col1", children: /* @__PURE__ */ jsx("img", { src: "/img/entreprise__graph.svg", alt: "Graphique illustrant l'amélioration des performances en entreprise" }) }),
    /* @__PURE__ */ jsx("div", { className: "coaching__entrerpise__perfo__col2", children: /* @__PURE__ */ jsx("ul", { children: performanceContent.map((item, index) => {
      const contentId = `perfo-desc-${index}`;
      return /* @__PURE__ */ jsxs("li", { className: "entreprise__perfo__item", children: [
        /* @__PURE__ */ jsx("h3", { children: item.title }),
        /* @__PURE__ */ jsx(
          "div",
          {
            id: contentId,
            className: expandedIndex === index ? "open" : "",
            "aria-live": "polite",
            "aria-hidden": expandedIndex !== index,
            children: /* @__PURE__ */ jsx("div", { children: item.description.map((text, idx) => /* @__PURE__ */ jsx("p", { children: text }, idx)) })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `entreprise__perfo__btnMore ${expandedIndex === index ? "rotate" : ""}`,
            "aria-expanded": expandedIndex === index,
            "aria-controls": contentId,
            onClick: () => toggleContent(index),
            type: "button"
          }
        )
      ] }, index);
    }) }) })
  ] }) });
};

const $$Improve = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="wrapper-1440"> <section class="coaching-entreprise__improve section-height90 " aria-labelledby="improve-title"> <div class="coaching-entreprise__improve__grid"> <h2 class="coaching-entreprise__title title">
Des entreprises de toutes tailles
</h2> <p class="coaching-entreprise__intro">
Des entreprises de toutes tailles ont témoigné des impacts positifs du programme de SBG Coaching :
</p> <div class="coaching-entreprise__improve__col1"> <ul class="coaching-entreprise__benefits"> <li class="coaching-entreprise__benefit"> <span class="coaching-entreprise__label">Amélioration</span> <strong class="coaching-entreprise__text">La performance individuelle</strong> </li> <li class="coaching-entreprise__benefit"> <span class="coaching-entreprise__label">Amélioration</span> <strong class="coaching-entreprise__text">La satisfaction générale au sein de l’équipe</strong> </li> <li class="coaching-entreprise__benefit"> <span class="coaching-entreprise__label">Amélioration</span> <strong class="coaching-entreprise__text">L’ambiance de travail</strong> </li> </ul> <div class="coaching-entreprise__availability"> <h3>Nous nous déplaçons jusqu’à vous :</h3> <p>à partir de
<strong> 07 h 30 / pause midi / après votre travail</strong> </p> <div class="coaching-entreprise__independent"> <h3>Pour les indépendants</h3> <p>SBG Coaching s’engage à vous offrir une plage horaire sur mesure afin de répondre au mieux à vos disponibilités en tant que professionnel indépendant.
</p> </div> </div> </div> <div class="coaching-entreprise__improve__col2"> <div class="coaching-entreprise__context"> <p> <strong>Coaching sportif <span class="highlight">_Entreprise</span></strong>
par SBG Coaching représente une opportunité exceptionnelle pour les entreprises qui souhaitent investir dans le bien-être de leurs employés et, par extension, dans leur succès global.
</p> <p>
En adoptant une approche holistique qui valorise la santé physique et mentale, SBG vous aide à forger des équipes plus fortes, plus unies et plus performantes.
</p> </div> <img src="img/logo-black.svg" alt="Logo SBG Coaching Entreprise" class="coaching-entreprise__logo" loading="lazy"> </div> </div> </section> </div>`;
}, "C:/client/SBG_Coaching - v2/src/partials/entreprise/Improve.astro", void 0);

const $$Entreprise = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Coaching d\u2019entreprise | Sant\xE9 et performance au travail avec SBG Coaching", "description": "Boostez la productivit\xE9 et le bien-\xEAtre en entreprise gr\xE2ce \xE0 un coaching sportif adapt\xE9. Interventions sur site, team building, ergonomie et pr\xE9vention sant\xE9.", "pageClass": "page", "dataPage": "coaching-entreprise", "dataVariant": "black", "dataModules": "coaching faq links", "seo": {
    url: "https://sbgcoaching.be/coaching-entreprise",
    /* image: "/img/og-entreprise.jpg", */
    // à créer / ajouter
    schemaType: "LocalBusiness"
  } }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main"> <h1 class="visually-hidden">Coaching sportif pour les entreprises et professionnels</h1> ${renderComponent($$result2, "CoachingHero", CoachingHero, { "client:visible": true, "page": "entreprise", "client:component-hydration": "visible", "client:component-path": "@partials/components/CoachingHero.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "Performance", Performance, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@partials/entreprise/Performance", "client:component-export": "default" })} ${renderComponent($$result2, "LazyFadeIn", LazyFadeIn, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@partials/performance/LazyFadeIn", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Improve", $$Improve, {})} ` })} </main> ${renderComponent($$result2, "LazyFadeIn", LazyFadeIn, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@partials/performance/LazyFadeIn", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Faq", $$Faq, {})} ` })} ` })}`;
}, "C:/client/SBG_Coaching - v2/src/pages/entreprise.astro", void 0);

const $$file = "C:/client/SBG_Coaching - v2/src/pages/entreprise.astro";
const $$url = "/entreprise";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Entreprise,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
