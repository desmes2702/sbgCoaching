import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { t as testimonials, L as LinksSocial } from './BaseLayout_Bw84QKvE.mjs';

const generalTestimonials = testimonials.filter((t) => t.key === "general");
function truncateText(text) {
  if (text.length <= 200) return text;
  return text.slice(0, 200).replace(/\s+\S*$/, "") + "...";
}
const photo1 = generalTestimonials[0]?.photo || "";
const photo2 = generalTestimonials[1]?.photo || "";
const name1 = generalTestimonials[0]?.name || "";
const name2 = generalTestimonials[1]?.name || "";
const para1 = generalTestimonials[0]?.text?.[0] ? truncateText(generalTestimonials[0].text[0]) : "";
const para2 = generalTestimonials[1]?.text?.[0] ? truncateText(generalTestimonials[1].text[0]) : "";
const heroData = {
  entreprise: [
    {
      id: "entreprise-slide-1",
      title: "Coaching sportif <span>_Entreprise</span>",
      paragraphs: [
        "Dans le monde professionnel moderne, la productivité et le bien-être des employés sont plus interconnectés que jamais.",
        "Reconnaissant cette réalité, le coaching en entreprise émerge comme une solution incontournable pour les organisations visant l’excellence."
      ],
      backgroundMain: "/img/entreprise/entreprise__post1-main.png",
      backgroundThumbnail: "/img/entreprise/entreprise__post1-thumb.png"
    },
    {
      id: "entreprise-slide-2",
      title: "",
      paragraphs: [""],
      backgroundThumbnail: "/img/entreprise/entreprise__post2-thumb.png",
      video: "/videos/rtlTvi.mp4"
    },
    {
      id: "entreprise-slide-3",
      title: "<span class='highlight'>100% DÉDUCTIBLE !</span>",
      paragraphs: [
        "Le coaching en entreprise est déductible à 100% en Belgique.",
        "Offrez un avantage fiscal tout en investissant dans le bien-être à votre entreprise."
      ],
      backgroundMain: "/img/entreprise/entreprise__post3-main.png",
      backgroundThumbnail: "/img/entreprise/entreprise__post3-thumb.png",
      link: {
        href: "https://finances.belgium.be/fr/entreprises/frais-professionnels#q1",
        label: "En savoir plus sur cette déductibilité"
      }
    }
  ],
  general: [
    {
      id: "general-slide-1",
      title: "Coaching sportif <span>_Général</span>",
      paragraphs: [
        "Retrouvez la forme, gagnez en énergie et atteignez vos objectifs personnels.",
        "Avec un accompagnement sur-mesure, le coaching s’adapte à vous, pas l’inverse."
      ],
      backgroundMain: "/img/general/general__post1.png",
      backgroundThumbnail: "/img/general/general__post1-thumb.png"
    },
    {
      id: "general-slide-2",
      title: name1,
      paragraphs: [para1],
      backgroundMain: photo1,
      backgroundThumbnail: "/img/general/general__post2-thumb.png",
      link: {
        href: "/testimonials",
        label: "Lire le témoignage"
      }
    },
    {
      id: "general-slide-3",
      title: name2,
      paragraphs: [para2],
      backgroundMain: photo2,
      backgroundThumbnail: "/img/general/general__post3-thumb.png",
      link: {
        href: "/testimonials",
        label: "Lire le témoignage"
      }
    }
  ]
};

const CoachingHero = ({ page }) => {
  const totalSlides = heroData[page].length;
  const [index, setIndex] = useState(0);
  const [main, setMain] = useState(heroData[page][0]);
  const [secondary, setSecondary] = useState(
    heroData[page].filter((_, i) => i !== 0)
  );
  const videoRef = useRef(null);
  const next = () => setIndex((current) => (current + 1) % totalSlides);
  const prev = () => setIndex((current) => (current - 1 + totalSlides) % totalSlides);
  useEffect(() => {
    const newMain = heroData[page][index];
    const newSecondary = heroData[page].filter((_, i) => i !== index);
    setMain(newMain);
    setSecondary(newSecondary);
    if (page === "entreprise" && index === 1 && videoRef.current) {
      videoRef.current.volume = 0.5;
    }
  }, [index, page]);
  const isTestimonial = main.link?.href === "/testimonials";
  const isVideo = !!main.video;
  const mainContentRef = useRef(null);
  useEffect(() => {
    mainContentRef.current?.focus();
  }, [index]);
  const handleThumbnailKey = (e, targetIndex) => {
    if (e.key === "Enter" || e.key === " ") {
      setIndex(targetIndex);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "wrapper-1440", id: "page__coaching__wrapper__hero", children: /* @__PURE__ */ jsxs(
    "section",
    {
      className: "coaching__hero",
      role: "region",
      "aria-label": `Section de présentation coaching ${page === "entreprise" ? "entreprise" : "général"}`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "coaching__hero-col1", children: /* @__PURE__ */ jsx("div", { className: "coaching__hero__content", children: /* @__PURE__ */ jsxs(
          "div",
          {
            id: `${page}-slide-${index + 1}`,
            className: [
              "coaching__hero__content__bck",
              `coaching__hero__content-bck${index + 1}`,
              isVideo ? "is-video" : "",
              isTestimonial ? "is-testimonial" : ""
            ].filter(Boolean).join(" "),
            style: page === "entreprise" && index === 1 && isVideo ? {} : main.backgroundMain ? { backgroundImage: `url(${main.backgroundMain})` } : {},
            tabIndex: -1,
            ref: mainContentRef,
            "aria-current": "true",
            "aria-live": "polite",
            children: [
              /* @__PURE__ */ jsxs("span", { className: "visually-hidden", children: [
                "Slide actif : ",
                main.title.replace(/<[^>]+>/g, "")
              ] }),
              isVideo ? /* @__PURE__ */ jsx("div", { className: "video-wrapper", children: /* @__PURE__ */ jsx(
                "video",
                {
                  ref: videoRef,
                  src: main.video,
                  autoPlay: true,
                  loop: true,
                  playsInline: true,
                  controls: true,
                  "aria-hidden": "true",
                  preload: "none"
                }
              ) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("h2", { className: "title", tabIndex: 0, dangerouslySetInnerHTML: { __html: main.title } }),
                main.paragraphs?.map((p, i) => /* @__PURE__ */ jsx("p", { children: p }, i)),
                main.link && /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    className: "link-underline-replay",
                    href: main.link.href,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: main.link.label
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "hero__content__btn", role: "group", "aria-label": "Navigation slides", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: prev,
                    "aria-label": "Slide précédent",
                    className: "hero__nav hero__nav--left",
                    tabIndex: 0,
                    type: "button"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "hero__index",
                    "aria-live": "polite",
                    "aria-atomic": "true",
                    tabIndex: 0,
                    children: index + 1
                  }
                ),
                /* @__PURE__ */ jsxs("span", { className: "hero__index-slash", "aria-hidden": "true", children: [
                  "/",
                  totalSlides
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: next,
                    "aria-label": "Slide suivant",
                    className: "hero__nav hero__nav--right",
                    tabIndex: 0,
                    type: "button"
                  }
                )
              ] }),
              !isVideo && /* @__PURE__ */ jsx("div", { className: "hero__content__cta", children: /* @__PURE__ */ jsx("a", { href: "/contact", className: "button button-red ", children: "Prendre rdv" }) })
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsx("div", { className: "wrapper-center", children: /* @__PURE__ */ jsxs("div", { className: "coaching__hero-col2", children: [
          /* @__PURE__ */ jsx("h2", { tabIndex: 0, children: "Actualité" }),
          secondary.map((item, i) => {
            const realIndex = heroData[page].findIndex((d) => d.id === item.id);
            const isSelected = index === realIndex;
            return /* @__PURE__ */ jsx(
              "div",
              {
                "aria-hidden": !isSelected,
                onClick: () => setIndex(realIndex > -1 ? realIndex : 0),
                onKeyDown: (e) => handleThumbnailKey(e, realIndex),
                className: `coaching__hero__content coaching__hero__content-secondary coaching__hero__content-secondary-${i + 1}`,
                style: item.backgroundThumbnail ? { backgroundImage: `url(${item.backgroundThumbnail})`, cursor: "pointer" } : { cursor: "pointer" },
                role: "button",
                tabIndex: 0,
                "aria-label": `Aller au slide ${realIndex + 1} : ${item.title.replace(/<[^>]+>/g, "")}`,
                "aria-current": isSelected ? "true" : void 0
              },
              item.id ?? `secondary-${i}`
            );
          }),
          /* @__PURE__ */ jsx("div", { className: "coaching__hero__social", children: /* @__PURE__ */ jsx(LinksSocial, { variant: "black", size: 24 }) })
        ] }) })
      ]
    }
  ) });
};

export { CoachingHero as C };
