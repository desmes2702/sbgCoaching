import { c as createComponent, m as maybeRenderHead, r as renderTemplate, a as renderComponent } from '../chunks/astro/server_DW3zcPNd.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, a as LazyFadeIn } from '../chunks/BaseLayout_Bw84QKvE.mjs';
import { C as CoachingHero } from '../chunks/CoachingHero_DDI_sQ2e.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import 'clsx';
import { $ as $$Faq } from '../chunks/Faq_BGLDF1I_.mjs';
export { renderers } from '../renderers.mjs';

const TYPES = [
  {
    key: "private",
    title: "Privé",
    subtitle1: "Un suivi personnalisé",
    text1: "Le coaching privé est idéal si vous souhaitez une attention particulière et un programme d'entraînement spécifiquement conçu pour vous.",
    subtitle2: "Flexibilité et résultats",
    text2: "Vous choisissez les créneaux qui vous conviennent et bénéficiez d’une progression optimale grâce à un suivi précis de vos performances.",
    btnClass: "button button-red",
    cardClass: "coaching__types__card coaching__types__card-private"
  },
  {
    key: "group",
    title: "Groupe",
    subtitle1: "Une dynamique de groupe motivante",
    text1: "Les entraînements en groupe sont parfaits pour ceux qui aiment partager leur effort avec d'autres.",
    subtitle2: "Adapté à tous les niveaux",
    text2: "Chaque exercice peut être ajusté pour répondre à vos capacités, tout en favorisant un esprit d’équipe.",
    btnClass: "button button-red",
    cardClass: "coaching__types__card coaching__types__card-group"
  },
  {
    key: "business",
    title: "Entreprise",
    subtitle1: "Bien-être et performance au travail",
    text1: "Offrez à vos équipes une expérience de coaching dédiée, directement sur le lieu de travail.",
    subtitle2: "Des bénéfices concrets",
    text2: "Diminution du stress, amélioration de la productivité et meilleure ambiance.",
    btnClass: "button button-black",
    cardClass: "coaching__types__card coaching__types__card-business"
  }
];
const DRAG_THRESHOLD = 10;
const MAX_DRAG = 50;
const ROTATE_OFFSET = 5;
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [breakpoint]);
  return isMobile;
}
const Type = () => {
  const [index, setIndex] = useState(1);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered] = useState(null);
  const startXRef = useRef(null);
  const startTouchX = useRef(null);
  const isMobile = useIsMobile();
  const onMouseDown = (e) => {
    startXRef.current = e.clientX;
    setIsDragging(true);
  };
  const onMouseMove = (e) => {
    if (!isDragging || startXRef.current === null) return;
    const diff = e.clientX - startXRef.current;
    const limitedDiff = Math.max(-50, Math.min(MAX_DRAG, diff));
    setDragX(limitedDiff);
  };
  const onMouseUp = () => {
    if (!isDragging) return;
    if (dragX > DRAG_THRESHOLD) {
      setIndex((prev) => prev === 0 ? TYPES.length - 1 : prev - 1);
    } else if (dragX < -10) {
      setIndex((prev) => prev === TYPES.length - 1 ? 0 : prev + 1);
    }
    setIsDragging(false);
    setDragX(0);
  };
  const onTouchStart = (e) => {
    startTouchX.current = e.touches[0].clientX;
    setIsDragging(true);
  };
  const onTouchMove = (e) => {
    if (startTouchX.current === null) return;
    const diff = e.touches[0].clientX - startTouchX.current;
    const limitedDiff = Math.max(-50, Math.min(MAX_DRAG, diff));
    setDragX(limitedDiff);
  };
  const onTouchEnd = () => {
    if (dragX > DRAG_THRESHOLD) {
      setIndex((prev) => prev === 0 ? TYPES.length - 1 : prev - 1);
    } else if (dragX < -10) {
      setIndex((prev) => prev === TYPES.length - 1 ? 0 : prev + 1);
    }
    setIsDragging(false);
    setDragX(0);
    startTouchX.current = null;
  };
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, dragX]);
  return /* @__PURE__ */ jsx("div", { className: "wrapper-1440-black ", id: "page__coaching__wrapper__types", children: /* @__PURE__ */ jsxs("section", { className: "coaching__types", role: "list", "aria-label": "Nos types de coaching", children: [
    /* @__PURE__ */ jsx("h2", { className: "coaching__types__title", children: "Nos types de coaching" }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `type__slider3d ${isDragging ? "is-grabbing" : ""}`,
        role: "list",
        "aria-label": "Types de coaching",
        onMouseDown,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        children: TYPES.map((type, i) => {
          const pos = (i - index + TYPES.length) % TYPES.length;
          let transform = "";
          let zIndex = 1;
          const rotateBoost = dragX !== 0 ? dragX > 0 ? ROTATE_OFFSET : -5 : 0;
          let baseScale = 1;
          const translateXSide = isMobile ? 20 : 25;
          if (pos === 0) {
            baseScale = 1;
            transform = `translateX(calc(-50% + ${dragX}px)) rotateY(${rotateBoost}deg) translateZ(0rem)`;
            zIndex = 2;
          } else if (pos === 1) {
            baseScale = 0.96;
            transform = `translateX(calc(-50% + ${dragX}px)) rotateY(${5 + rotateBoost}deg) translateX(${translateXSide}rem)`;
          } else if (pos === TYPES.length - 1) {
            baseScale = 0.96;
            transform = `translateX(calc(-50% + ${dragX}px)) rotateY(${ -5 + rotateBoost}deg) translateX(-${translateXSide}rem)`;
          } else {
            return null;
          }
          const isHovered = hovered === i;
          const scale = pos === 0 ? isHovered ? 1.025 : 1 : isHovered ? 0.985 : baseScale;
          const opacity = isMobile ? 1 : pos === 0 ? 1 : 0.7;
          const filter = isHovered || pos === 0 ? "none" : "blur(0px)";
          const boxShadow = pos === 0 ? "0 1.5rem 4rem rgba(0, 0, 0, 0.3)" : "none";
          const extraClass = pos === 0 ? "no-blur" : "";
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: `${type.cardClass} ${pos !== 0 ? "is-side" : ""} ${extraClass}`,
              style: { transform: `${transform} scale(${scale})`, zIndex, opacity, filter, boxShadow },
              onMouseEnter: () => setHovered(i),
              onMouseLeave: () => setHovered(null),
              tabIndex: 0,
              role: "listitem",
              "aria-label": `${type.title} type de coaching`,
              children: [
                /* @__PURE__ */ jsx("h3", { className: "coaching__types__card__title title", children: type.title }),
                /* @__PURE__ */ jsxs("div", { className: "coaching__types__card__content", children: [
                  /* @__PURE__ */ jsx("h4", { children: type.subtitle1 }),
                  /* @__PURE__ */ jsx("p", { children: type.text1 }),
                  /* @__PURE__ */ jsx("h4", { children: type.subtitle2 }),
                  /* @__PURE__ */ jsx("p", { children: type.text2 })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "coaching__types__card__cta", children: /* @__PURE__ */ jsx("a", { href: "contact", className: type.btnClass, children: "Commencez" }) })
              ]
            },
            type.key
          );
        })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "type__controls", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "type__prev",
          "aria-label": "Type précédent",
          type: "button",
          onClick: () => setIndex((prev) => prev === 0 ? TYPES.length - 1 : prev - 1)
        }
      ),
      /* @__PURE__ */ jsxs("span", { className: "type__index", children: [
        index + 1,
        " ",
        /* @__PURE__ */ jsxs("div", { children: [
          "/ ",
          TYPES.length
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "type__next",
          "aria-label": "Type suivant",
          type: "button",
          onClick: () => setIndex((prev) => prev === TYPES.length - 1 ? 0 : prev + 1)
        }
      )
    ] })
  ] }) });
};

const $$Football = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="wrapper-1440 "> <section class="jeune__footballer"> <h2 class="jeune__footballer__title"> <span class="title">PRÉPARATION PHYSIQUE</span> <em>_Jeunes Footballeurs </em> </h2> <div class="jeune__footballer__content"> <div> <div class="jeune__footballer__bloc jeune__footballer__bloc-1"> <h3 class="jeune__footballer__subtitle">Spécifiquement conçu pour les jeunes athlètes</h3> <p>
SBG Coaching propose des séances de préparation physique dédiées aux jeunes footballeurs, afin de renforcer leurs performances sur le terrain.
</p> <p>
Grâce à un travail ciblé sur l’endurance, la puissance, la vitesse et la coordination, nos coaches aident les jeunes à se développer de manière équilibrée et performante.
</p> </div> <div class="jeune__footballer__bloc"> <h3 class="jeune__footballer__subtitle">Renforcement des capacités sportives</h3> <p>
Les entraînements sont conçus pour améliorer la condition physique globale et la réactivité sur le terrain, tout en réduisant les risques de blessure.
</p> <p>
Parfait pour les jeunes talents en quête d’amélioration et de professionnalisation.
</p> </div> </div> <div class="jeune__footballer__img"></div> </div> </section> </div>`;
}, "C:/client/SBG_Coaching - v2/src/partials/general/Football.astro", void 0);

const $$General = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Coaching Sportif G\xE9n\xE9ral | SBG Coaching \u2013 Sant\xE9, Bien-\xEAtre et Performance", "description": "D\xE9couvrez nos programmes de coaching sportif g\xE9n\xE9ral adapt\xE9s \xE0 tous les niveaux. SBG Coaching vous accompagne dans votre transformation physique et mentale.", "pageClass": "page", "dataPage": "general", "dataModules": "coaching faq links scrollReveal", "dataVariant": "black", "seo": {
    url: "https://sbgcoaching.be/general",
    /*  image: "/img/og-general.jpg", */
    // à créer ou personnaliser
    schemaType: "LocalBusiness"
  } }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main"> <h1 class="visually-hidden">Coaching sportif général</h1> ${renderComponent($$result2, "CoachingHero", CoachingHero, { "client:visible": true, "page": "general", "client:component-hydration": "visible", "client:component-path": "@partials/components/CoachingHero.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "Type", Type, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@partials/general/Type.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "LazyFadeIn", LazyFadeIn, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@partials/performance/LazyFadeIn", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Football", $$Football, {})} ` })} </main> ${renderComponent($$result2, "LazyFadeIn", LazyFadeIn, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@partials/performance/LazyFadeIn", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Faq", $$Faq, {})} ` })} ` })}`;
}, "C:/client/SBG_Coaching - v2/src/pages/general.astro", void 0);

const $$file = "C:/client/SBG_Coaching - v2/src/pages/general.astro";
const $$url = "/general";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$General,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
