import { c as createComponent, m as maybeRenderHead, a as renderComponent, r as renderTemplate, e as createAstro, b as addAttribute, g as renderSlot, h as renderHead } from './astro/server_DW3zcPNd.mjs';
import 'kleur/colors';
/* empty css                                 */
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import 'clsx';

const companyInfos = {
  email: "contact@sbgcoaching.be",
  phone: "+32 472 25 77 24",
  address: "Rue du Marché 11, 4500 Huy, Belgique",
  social: {
    linkedin: "https://www.linkedin.com/company/sbg-leadership-coaching-and-consulting/",
    facebook: "https://www.facebook.com/samuelbillagarciacoaching",
    instagram: "https://www.instagram.com/sambillagarcia/"
  },
  schemaOrg: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "SBG Coaching",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rue du Marché 11",
      addressLocality: "Huy",
      addressRegion: "Liège",
      postalCode: "4500",
      addressCountry: "BE"
    },
    telephone: "+32 472 25 77 24",
    email: "contact@sbgcoaching.be"
  }
};

function injectSchemaOrg() {
  if (!companyInfos.schemaOrg) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(companyInfos.schemaOrg, null, 2);
  document.head.appendChild(script);
  console.log("✅ Schema.org injecté dynamiquement");
}

function initFAQ() {
  const buttons = document.querySelectorAll(".faq__btn-more");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const faqItem = button.closest(".faq__item");
      const answer = faqItem.querySelector(".faq__answer");
      const isOpen = faqItem.classList.contains("faq--active");
      document.querySelectorAll(".faq__item").forEach((item) => {
        item.classList.remove("faq--active");
        item.querySelector(".faq__answer")?.classList.remove("is-visible");
        item.querySelector(".faq__btn-more")?.setAttribute("aria-expanded", "false");
        item.querySelector(".faq__btn-more")?.classList.remove("rotated");
      });
      if (!isOpen) {
        faqItem.classList.add("faq--active");
        answer.classList.add("is-visible");
        button.setAttribute("aria-expanded", "true");
        button.classList.add("rotated");
      }
    });
  });
}

const testimonials = [
  {
    name: "LABEYE et LALLEMEND",
    job: "Étude des Notaires",
    photo: "/img/testimonials/testimonial__labeyeLallemend.png",
    key: "entreprise",
    text: [
      "Ces séances sont notre moment pour souffler. Elles nous permettent de déconnecter du travail, d’évacuer le stress et de retrouver de l’énergie.",
      "Après chaque session, on se sent plus léger et concentré.",
      "Partager ces entraînements nous rapproche. On se motive, on s’entraide et on découvre nos collègues sous un autre angle. Ça renforce nos liens et rend l’ambiance au travail encore plus agréable.",
      "On communique mieux, on collabore plus facilement et on aborde nos journées avec plus de sérénité. Ces séances nous font vraiment du bien, autant physiquement que mentalement."
    ]
  },
  {
    name: "Christian",
    job: null,
    photo: "/img/testimonials/testimonial__christian.png",
    key: "general",
    text: [
      "Quand j’ai franchi les portes de la salle pour la première fois, j’étais rempli de doutes. Je voulais me (re)mettre au sport, mais je ne savais ni par où commencer ni comment utiliser les machines correctement.",
      "Dès le début, il a su m’écouter et m’orienter avec un programme parfaitement adapté à mes objectifs. Grâce à lui, j’ai appris à mieux comprendre mon corps, à ressentir chaque exercice et à maximiser mes entraînements.",
      "Et les résultats ont suivi : en quelques mois, j’ai perdu 8 kg et réduit ma masse grasse de 10 % !",
      "Ces progrès ont été une vraie révélation. J’ai pris goût à l’entraînement, gagné en confiance et, aujourd’hui, je construis mes propres séances avec motivation. Sans Sam, je n’aurais jamais atteint ce niveau de détermination.",
      "Ce n’est plus une question de volonté… mon corps et mon esprit réclament leurs séances !"
    ]
  },
  {
    name: "Justin",
    job: null,
    photo: "/img/testimonials/testimonial__justin.png",
    featured: true,
    key: "general",
    text: [
      "Chaque semaine, il ajustait mes programmes en tenant compte de tous les aspects : repos, entraînements, alimentation et étirements. Ses conseils étaient toujours précis, et son suivi très réactif.",
      "Ce que j’ai particulièrement apprécié, c’est sa capacité à être à l’écoute et à répondre à toutes mes questions, même les plus techniques. Ses retours hebdomadaires étaient détaillés et me permettaient de progresser en toute sérénité.",
      "Aujourd’hui, je me sens plus polyvalent dans mes pratiques sportives et, surtout, j’ai adopté une approche durable qui ne met plus ma santé en danger.",
      "Pour toutes ces raisons, je recommande vivement Sam à toute personne déterminée à repousser ses limites, en toute sécurité et avec confiance."
    ]
  },
  {
    name: "Moïra PLENVAUX & Thérèse de NIJS",
    job: null,
    photo: "/img/testimonials/testimonial__plenevauxNijs.png",
    key: "general",
    text: [
      "L’approche du coach est rassurante : il adapte chaque mouvement en fonction de nos besoins et veille à notre bien-être. Cela rend les séances accessibles à tous et améliore notre confort au quotidien.",
      "Avant de commencer, nous avions tous des niveaux différents et certaines appréhensions. Grâce à l’accompagnement progressif, chacun a pu évoluer à son rythme.",
      "Les bienfaits vont bien au-delà du physique : cette routine nous permet aussi de mieux gérer la pression et de renforcer notre esprit d’équipe. On repart toujours plus sereins et motivés après chaque session."
    ]
  },
  {
    name: "UDH SPRL",
    job: null,
    photo: "/img/testimonials/testimonial__udhSprl.png",
    key: "general",
    text: [
      "Les cours de sport nous permettent de décompresser après notre journée de travail.",
      "Cela nous enlève tout le stress qu’on a pu avoir pendant la journée ainsi que la fatigue accumulée.",
      "Nous nous sentons toujours bien après une séance. Dès lors, le sport au travail renforce notre productivité. Nous repartons le lendemain plus concentrées, sans stress.",
      "En plus du bien-être physique, cela renforce les liens au sein de l’équipe."
    ]
  },
  {
    name: "Tiffany - Duchêne SA",
    job: "Chargée de communication",
    photo: "/img/testimonials/testimonial__ducheneSa.png",
    key: "entreprise",
    text: [
      "Je voulais juste vous dire un grand merci pour ces super séances de circuit training chaque semaine ! C’est vraiment une chance de pouvoir participer à des cours directement au sein de l’entreprise.",
      "Non seulement cela nous permet de rester en forme, mais c’est aussi un excellent moyen de créer des liens entre collègues de différents services, ce qui renforce véritablement la cohésion au sein de l’équipe.",
      "En plus, l’ambiance est top, et notre coach est toujours super sympa et compétent, ce qui rend chaque séance agréable et motivante.",
      "Bref, c’est un vrai plaisir de participer à ces séances, et je suis sûre que tout le monde en profite pleinement !",
      "Merci encore, et à bientôt pour la prochaine session !"
    ]
  },
  {
    name: "Alice",
    job: null,
    photo: "/img/testimonials/testimonial__alice.png",
    key: "general",
    text: [
      "Après 6 mois de travail à raison de 2 séances/semaine et un petit rééquilibrage alimentaire, quel changement ! Mes douleurs ont disparu, mon corps s’est resculpté, j’ai perdu 10 kg et pris du muscle.",
      "Je prends de nouveau plaisir à aller travailler sans craindre d’avoir mal et je peux à nouveau porter et cajoler mes petits bouts.",
      "Mon moral n’en est que meilleur, je revis complètement ! Merci Sam pour ta gentillesse, ta patience et ton professionnalisme."
    ]
  }
];

function initTestimonial() {
  const featured = testimonials.find((t) => t.featured === true);
  const lastTestimonials = testimonials.filter((t) => !t.featured);
  const imgContainer = document.querySelector(".testimonial-new__image");
  const contentContainer = document.querySelector(".testimonial-new__content");
  if (featured && imgContainer && contentContainer) {
    imgContainer.style.backgroundImage = `url('${featured.photo}')`;
    contentContainer.querySelector(".testimonial-new__name").textContent = featured.name;
    contentContainer.querySelector(".testimonial-new__job").textContent = featured.job || "";
    const quote = contentContainer.querySelector(".testimonial-new__quote");
    if (quote) {
      quote.innerHTML = featured.text.map((p) => `<p>${p}</p>`).join("");
    }
  }
  const lastSection = document.getElementById("testimonials-last");
  if (!lastSection) return;
  const wrapper = document.createElement("div");
  wrapper.className = "testimonials__wrapper";
  const col1 = document.createElement("div");
  col1.className = "testimonials__wrapper__col1";
  const col2 = document.createElement("div");
  col2.className = "testimonials__wrapper__col2";
  lastTestimonials.forEach((t, i) => {
    const item = document.createElement("div");
    item.className = "testimonial__item";
    const imageDiv = document.createElement("div");
    imageDiv.className = "testimonial__item__image";
    imageDiv.style.backgroundImage = `url('${t.photo}')`;
    const button = document.createElement("button");
    button.className = "testimonial__item__button";
    button.innerHTML = `Voir le témoignage <span class="testimonial__item__arrow"></span>`;
    const content = document.createElement("div");
    content.className = "testimonial__item__content";
    const header = `
      <header class="testimonial__item__header">
        <div>
          <h3 class="testimonial__item__name">${t.name}</h3>
        </div>
        ${t.job ? `<span>${t.job}</span>` : ""}
      </header>
    `;
    content.innerHTML = header + t.text.map((p) => `<p>${p}</p>`).join("");
    item.appendChild(imageDiv);
    item.appendChild(button);
    item.appendChild(content);
    if (i % 2 === 0) {
      col1.appendChild(item);
    } else {
      col2.appendChild(item);
    }
  });
  wrapper.appendChild(col1);
  wrapper.appendChild(col2);
  lastSection.appendChild(wrapper);
  document.querySelectorAll(".testimonial__item__button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".testimonial__item");
      const content = parent.querySelector(".testimonial__item__content");
      const isActive = content.classList.contains("testimonial__item__content-active");
      document.querySelectorAll(".testimonial__item__content").forEach(
        (el) => el.classList.remove("testimonial__item__content-active")
      );
      document.querySelectorAll(".testimonial__item__button").forEach(
        (el) => el.classList.remove("testimonial__item__button-active")
      );
      if (!isActive) {
        content.classList.add("testimonial__item__content-active");
        btn.classList.add("testimonial__item__button-active");
      }
    });
  });
}

function hideFooterForm() {
  const footerForm = document.getElementById("footer-contact-form");
  if (footerForm) {
    footerForm.remove();
    console.log("🧼 Formulaire footer masqué sur la page RDV");
  }
}

function initRecaptcha() {
  if (!document.querySelector(".g-recaptcha")) return;
  const script = document.createElement("script");
  script.src = "https://www.google.com/recaptcha/api.js";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

function injectLegalContent() {
  const container = document.getElementById("legal-dynamic-content");
  if (!container) return;
  const { email, phone, address, social } = companyInfos;
  container.innerHTML = `
    <h1 class="title">Mentions légales</h1>

    <h2 class="subTitle">Éditeur du site</h2>
    <p><strong>SBG Coaching</strong><br>
    ${address}<br>
    TVA : BE 0717.915.212<br>
    Tél : ${phone}<br>
    Contact : <a href="mailto:${email}">${email}</a></p>

    <h2 class="subTitle">Responsable de la publication</h2>
    <p>SBG Coaching</p>

    <h2 class="subTitle">Hébergement</h2>
    <p>Ce site est hébergé par :<br>
    <strong>OVH</strong> – <a href="https://www.ovhcloud.com" target="_blank" rel="noopener">https://www.ovhcloud.com</a></p>

    <h2 class="subTitle">Propriété intellectuelle</h2>
    <p>Tous les contenus (textes, images, vidéos, logo, structure, code source, etc.) présents sur ce site sont protégés par le droit d’auteur et sont la propriété exclusive de SBG Coaching, sauf mention contraire.
    Toute reproduction, représentation, adaptation ou diffusion, totale ou partielle, est interdite sans autorisation écrite préalable.</p>

    <h2 class="subTitle">Protection des données personnelles (RGPD)</h2>
    <p>Les données transmises via le formulaire de contact sont utilisées uniquement pour répondre à votre demande.
    Elles ne sont ni transmises à des tiers, ni utilisées à d'autres fins.
    Vous pouvez demander leur modification ou leur suppression à tout moment en écrivant à <a href="mailto:${email}">${email}</a>.</p>

    <h2 class="subTitle">Données sensibles (santé, âge, condition physique)</h2>
    <p>SBG Coaching peut être amené à collecter certaines données sensibles, notamment en lien avec votre santé, votre âge ou votre condition physique,
    dans le cadre d’un accompagnement sportif personnalisé. Ces données sont traitées avec le plus haut niveau de confidentialité.</p>

    <p>Leur traitement repose sur votre <strong>consentement explicite</strong> recueilli lors de la prise de contact ou via les formulaires dédiés.
    Ces données ne sont <strong>jamais partagées</strong> avec des tiers, et ne sont conservées que pour la durée strictement nécessaire à l’accompagnement.</p>

    <p>Vous disposez d’un droit d’accès, de rectification ou de suppression de ces données.
    Pour exercer vos droits, vous pouvez nous contacter à tout moment via <a href="mailto:${email}">${email}</a>.</p>

    <h2 class="subTitle">Cookies</h2>
    <p>Le site peut utiliser des cookies techniques ou de mesure d’audience. Vous pouvez les désactiver via les paramètres de votre navigateur.</p>

    <h2 class="subTitle">Limitation de responsabilité</h2>
    <p>SBG Coaching ne saurait être tenu responsable des dommages directs ou indirects liés à l’utilisation du site ou à l’impossibilité d’y accéder.</p>

    <h2 class="subTitle">Loi applicable</h2>
    <p>Le site est soumis au droit belge. En cas de litige, les tribunaux de Namur sont compétents.</p>

    <h2 class="subTitle">Réseaux sociaux officiels</h2>
    <ul>
      <li><a href="${social.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li>
      <li><a href="${social.facebook}" target="_blank" rel="noopener">Facebook</a></li>
      <li><a href="${social.instagram}" target="_blank" rel="noopener">Instagram</a></li>
    </ul>
  `;
}

const page = document.body.dataset.page;
const modules = document.body.dataset.module?.split(" ") || [];
async function loadPageModule(page2) {
  switch (page2) {
    case "index":
      await import('./__slogan_DIO1oVQc.mjs');
      break;
    case "rdv": {
      const { initForm } = await import('./initForm_D_TQFK68.mjs');
      initForm();
      await import('./__sendForm_l0sNRNKZ.mjs');
      hideFooterForm();
      initRecaptcha();
      break;
    }
    case "about":
      await import('./__slogan_DIO1oVQc.mjs');
      break;
    case "legal":
      injectLegalContent();
      break;
    default:
      console.warn(`🟡 Aucune initialisation trouvée pour data-page="${page2}"`);
  }
  console.log(`✅ Script principal activé : ${page2}`);
}
document.addEventListener("DOMContentLoaded", () => {
  injectSchemaOrg();
  loadPageModule(page);
  if (modules.includes("faq")) initFAQ();
  if (modules.includes("testimonials")) initTestimonial();
});

const Menu = ({ variant = "white" }) => {
  const isWhite = variant === "white";
  const wrapperClass = isWhite ? "wrapper-1440-black" : "wrapper-1440";
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const menuRef = useRef(null);
  const openBtnRef = useRef(null);
  const lastFocusedRef = useRef(null);
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (isOpen) {
      document.body.classList.add("scroll-locked");
      requestAnimationFrame(() => {
        menu.classList.add("menu-open");
        const first = menu.querySelector(
          'a[href], button:not([disabled]), [tabindex="0"]'
        );
        first?.focus();
      });
    } else {
      document.body.classList.remove("scroll-locked");
      menu.classList.remove("menu-open");
      lastFocusedRef.current?.focus();
    }
  }, [isOpen]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);
  const trapFocus = (e) => {
    if (e.key !== "Tab" || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex="0"]'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: wrapperClass, suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsx("header", { className: "header", suppressHydrationWarning: true, children: /* @__PURE__ */ jsxs("div", { className: "header__container", children: [
      /* @__PURE__ */ jsx("div", { className: `header__logo ${variant === "black" ? "header__logo-black" : ""}`, children: /* @__PURE__ */ jsx("a", { href: "/", className: "header__logo-link", children: /* @__PURE__ */ jsx(
        "img",
        {
          id: "menu__logo",
          src: `/img/logo-${variant === "black" ? "black" : "white"}.svg`,
          alt: "Logo SBG"
        }
      ) }) }),
      /* @__PURE__ */ jsx("nav", { className: `header__nav ${variant === "black" ? "header__nav-black" : ""}`, suppressHydrationWarning: true, children: /* @__PURE__ */ jsxs("ul", { className: "header__nav-list", children: [
        /* @__PURE__ */ jsxs("li", { className: "header__nav-item", children: [
          /* @__PURE__ */ jsx("span", { children: "coaching" }),
          /* @__PURE__ */ jsx("a", { href: "/entreprise", className: "header__nav-link link-underline-appear", children: "Entreprise" })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "header__nav-item", children: [
          /* @__PURE__ */ jsx("span", { children: "coaching" }),
          /* @__PURE__ */ jsx("a", { href: "/general", className: "header__nav-link link-underline-appear", children: "Général" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          ref: openBtnRef,
          className: "header__btn__menu menu__toggle",
          "aria-label": "Ouvrir le menu",
          "aria-controls": "menu",
          "aria-expanded": isOpen,
          onClick: () => {
            lastFocusedRef.current = document.activeElement;
            setIsOpen(true);
          },
          children: /* @__PURE__ */ jsx(
            "img",
            {
              id: "menu__icon",
              src: `/img/icon__burger-${variant === "black" ? "black" : "white"}.svg`,
              alt: "Ouvrir le menu"
            }
          )
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: menuRef,
        id: "menu",
        className: "menu",
        role: "dialog",
        "aria-modal": "true",
        tabIndex: -1,
        onKeyDown: trapFocus,
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "menu__close",
              "aria-label": "Fermer le menu",
              onClick: () => setIsOpen(false),
              children: /* @__PURE__ */ jsx("img", { src: "/img/icon__close.svg", alt: "Fermer le menu" })
            }
          ),
          /* @__PURE__ */ jsxs("nav", { className: "menu__nav", children: [
            /* @__PURE__ */ jsxs("section", { className: "menu__section", children: [
              /* @__PURE__ */ jsx("h2", { className: "menu__title", children: "Informations" }),
              /* @__PURE__ */ jsxs("ul", { className: "menu__list", children: [
                /* @__PURE__ */ jsx("li", { className: "menu__item", children: /* @__PURE__ */ jsx("a", { href: "/", className: "menu__link link-underline-appear", children: "Accueil" }) }),
                /* @__PURE__ */ jsx("li", { className: "menu__item", children: /* @__PURE__ */ jsx("a", { href: "/testimonials", className: "menu__link link-underline-appear", children: "Témoignages" }) }),
                /* @__PURE__ */ jsx("li", { className: "menu__item", children: /* @__PURE__ */ jsx("a", { href: "/about", className: "menu__link link-underline-appear", children: "À Propos" }) }),
                /* @__PURE__ */ jsx("li", { className: "menu__item", children: /* @__PURE__ */ jsx("a", { href: "/contact", className: "menu__link link-underline-appear", children: "Contact" }) }),
                /* @__PURE__ */ jsx("li", { className: "menu__item menu__item__rdv", children: /* @__PURE__ */ jsx("a", { href: "/contact", className: "menu__link link-underline-replay", children: "Prise de rendez-vous" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "menu__section", children: [
              /* @__PURE__ */ jsx("h2", { className: "menu__title", children: "Coaching" }),
              /* @__PURE__ */ jsxs("ul", { className: "menu__list", children: [
                /* @__PURE__ */ jsx("li", { className: "menu__item", children: /* @__PURE__ */ jsx("a", { href: "/entreprise", className: "menu__link link-underline-appear", children: "Entreprise" }) }),
                /* @__PURE__ */ jsx("li", { className: "menu__item", children: /* @__PURE__ */ jsx("a", { href: "/program", className: "menu__link link-underline-appear", children: "Programmes" }) }),
                /* @__PURE__ */ jsx("li", { className: "menu__item", children: /* @__PURE__ */ jsx("a", { href: "/general", className: "menu__link link-underline-appear", children: "Général" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "menu__section menu__section__profil", children: [
              /* @__PURE__ */ jsx("h2", { className: "menu__title", children: "Mon espace" }),
              /* @__PURE__ */ jsxs("ul", { className: "menu__list", children: [
                /* @__PURE__ */ jsx("li", { className: "menu__item menu__item__program", children: /* @__PURE__ */ jsx("a", { href: "#my-programs", className: "menu__link link-underline-appear", children: "Mes programmes" }) }),
                /* @__PURE__ */ jsx("li", { className: "menu__item menu__item__info", children: /* @__PURE__ */ jsx("a", { href: "#my-info", className: "menu__link link-underline-appear", children: "Mes informations" }) }),
                /* @__PURE__ */ jsx("li", { className: "menu__item menu__item__disconnect", children: /* @__PURE__ */ jsx("a", { href: "#logout", className: "menu__link link-underline-appear", children: "Se déconnecter" }) })
              ] })
            ] })
          ] })
        ]
      }
    )
  ] });
};

const socialLinks = {
  linkedin: {
    url: "https://www.linkedin.com/company/sbg-leadership-coaching-and-consulting/",
    icon: "icon__linkedin",
    label: "LinkedIn",
    variant: "black"
  },
  facebook: {
    url: "https://www.facebook.com/samuelbillagarciacoaching",
    icon: "icon__facebook",
    label: "Facebook",
    variant: "black"
  },
  instagram: {
    url: "https://www.instagram.com/sambillagarcia/",
    icon: "icon__instagram",
    label: "Instagram",
    variant: "red"
  }
};

const LinksSocial = ({ variant, size = 24 }) => {
  return /* @__PURE__ */ jsx("ul", { className: "social", children: Object.entries(socialLinks).map(([platform, { url, icon, label }]) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
    "a",
    {
      href: url,
      className: "social__link",
      "aria-label": label,
      target: "_blank",
      rel: "noopener noreferrer",
      children: /* @__PURE__ */ jsx(
        "img",
        {
          src: `/img/${icon}-${variant ?? "black"}.svg`,
          alt: `${label} icon`,
          width: size,
          height: size,
          loading: "lazy"
        }
      )
    }
  ) }, platform)) });
};

const AUTO_SAVE_KEY = "sbg_contact_form_draft";
const COMPLETION_TIME = "2 min pour remplir ce formulaire";
function ContactForm() {
  const [form, setForm] = useState({
    lastname: "",
    firstname: "",
    phone: "",
    email: "",
    message: "",
    terms: false,
    honeypot: ""
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [startTime] = useState(Date.now());
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem(AUTO_SAVE_KEY);
    if (saved) setForm(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(form));
  }, [form]);
  useEffect(() => {
    const noErrors = Object.values(validationErrors).every((e) => !e);
    const allRequiredFilled = Boolean(form.lastname && form.firstname && form.email && form.message && form.terms);
    setIsFormValid(noErrors && allRequiredFilled);
  }, [validationErrors, form]);
  const validateField = (name, value) => {
    let error2 = "";
    if ((name === "lastname" || name === "firstname" || name === "message") && !value) {
      error2 = "Ce champ est requis.";
    }
    if (name === "email" && typeof value === "string") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error2 = "Adresse email invalide.";
      }
    }
    if (name === "phone" && typeof value === "string" && value.length > 0) {
      if (!/^0\d{2,3}[ .-]?\d{2}[ .-]?\d{2}[ .-]?\d{2}$/.test(value)) {
        error2 = "Format téléphone incorrect (ex : 0494 20 50 75).";
      }
    }
    if (name === "terms" && value !== true) {
      error2 = "Vous devez accepter les conditions.";
    }
    setValidationErrors((prev) => ({ ...prev, [name]: error2 }));
  };
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? e.target.checked : void 0;
    const fieldValue = type === "checkbox" ? checked : value;
    setForm((prev) => ({ ...prev, [name]: fieldValue }));
    validateField(name, fieldValue);
  };
  const [showRedirectMsg, setShowRedirectMsg] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (Date.now() - startTime < 3e3) {
      setError("Merci de patienter au moins 3 secondes avant de valider.");
      return;
    }
    if (form.honeypot) return;
    let hasError = false;
    Object.entries(form).forEach(([k, v]) => {
      validateField(k, v);
      if (validationErrors[k]) hasError = true;
    });
    if (hasError || !isFormValid) {
      setError("Merci de corriger les erreurs avant d’envoyer.");
      return;
    }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const result = await res.json();
      if (result.success) {
        setSuccess(true);
        setShowRedirectMsg(true);
        setForm({
          lastname: "",
          firstname: "",
          phone: "",
          email: "",
          message: "",
          terms: false,
          honeypot: ""
        });
        localStorage.removeItem(AUTO_SAVE_KEY);
        setTimeout(() => {
          window.location.href = "/thanks";
        }, 1800);
        return;
      } else {
        setSuccess(false);
        setError(result.error || "Erreur lors de l’envoi.");
      }
    } catch (err) {
      setSuccess(false);
      setError("Erreur réseau, veuillez réessayer.");
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "wrapper-982-black", children: /* @__PURE__ */ jsxs("section", { id: "footer-contact-form", className: "contact__form section-height90 ", children: [
    /* @__PURE__ */ jsx("h2", { className: "contact__title title", children: "Formulaire de contact" }),
    /* @__PURE__ */ jsx("p", { className: "contact__time-estimate", "aria-hidden": "true", children: COMPLETION_TIME }),
    /* @__PURE__ */ jsx("p", { className: "contact__intro", children: "Toutes les informations inscrites dans ce formulaire seront directement envoyées à notre boîte mail." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, noValidate: true, children: [
      /* @__PURE__ */ jsx("input", { type: "text", name: "honeypot", value: form.honeypot, onChange: handleChange, hidden: true, tabIndex: -1, "aria-hidden": "true" }),
      /* @__PURE__ */ jsxs("div", { className: "contact__wrapper-col1", children: [
        /* @__PURE__ */ jsxs("fieldset", { className: "contact__personal", children: [
          /* @__PURE__ */ jsx("legend", { children: "Informations personnelles" }),
          /* @__PURE__ */ jsx("label", { htmlFor: "lastname", className: "contact__label", children: "Nom*" }),
          /* @__PURE__ */ jsx("input", { type: "text", id: "lastname", name: "lastname", className: `contact__input ${validationErrors.lastname ? "no-margin" : ""}`, required: true, "aria-required": "true", autoComplete: "family-name", value: form.lastname, onChange: handleChange }),
          validationErrors.lastname && /* @__PURE__ */ jsx("p", { className: "form__error", role: "alert", children: validationErrors.lastname }),
          /* @__PURE__ */ jsx("label", { htmlFor: "firstname", className: "contact__label", children: "Prénom*" }),
          /* @__PURE__ */ jsx("input", { type: "text", id: "firstname", name: "firstname", className: `contact__input ${validationErrors.firstname ? "no-margin" : ""}`, required: true, "aria-required": "true", autoComplete: "given-name", value: form.firstname, onChange: handleChange }),
          validationErrors.firstname && /* @__PURE__ */ jsx("p", { className: "form__error", role: "alert", children: validationErrors.firstname })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { className: "contact__information", children: [
          /* @__PURE__ */ jsx("legend", { children: "Coordonnées" }),
          /* @__PURE__ */ jsx("label", { htmlFor: "phone", className: "contact__label", children: "Téléphone" }),
          /* @__PURE__ */ jsx("input", { type: "tel", id: "phone", name: "phone", className: `contact__input ${validationErrors.phone ? "no-margin" : ""}`, autoComplete: "tel", pattern: "^(\\+32\\s?[1-9]{1}[0-9]?\\s?\\d{2}\\s?\\d{2}\\s?\\d{2}|\\b0[1-9]{1}[0-9]?\\s?\\d{2}\\s?\\d{2}\\s?\\d{2})$", placeholder: "04XX XX XX XX", value: form.phone, onChange: handleChange }),
          validationErrors.phone && /* @__PURE__ */ jsx("p", { className: "form__error", role: "alert", children: validationErrors.phone }),
          /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "contact__label", children: "Email*" }),
          /* @__PURE__ */ jsx("input", { type: "email", id: "email", name: "email", className: `contact__input ${validationErrors.email ? "no-margin" : ""}`, required: true, "aria-required": "true", autoComplete: "email", placeholder: "exemple@domaine.com", value: form.email, onChange: handleChange }),
          validationErrors.email && /* @__PURE__ */ jsx("p", { className: "form__error", role: "alert", children: validationErrors.email })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "contact__wrapper-col2", children: [
        /* @__PURE__ */ jsxs("fieldset", { className: "contact__message", children: [
          /* @__PURE__ */ jsx("legend", { children: "Votre message" }),
          /* @__PURE__ */ jsx("label", { htmlFor: "message", className: "contact__label", children: "Message*" }),
          /* @__PURE__ */ jsx("textarea", { id: "message", name: "message", className: `contact__textarea ${validationErrors.message ? "no-margin" : ""}`, required: true, "aria-required": "true", value: form.message, onChange: handleChange }),
          validationErrors.message && /* @__PURE__ */ jsx("p", { className: "form__error", role: "alert", children: validationErrors.message })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { className: "contact__terms", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", id: "terms", name: "terms", required: true, "aria-required": "true", checked: form.terms, onChange: handleChange }),
            /* @__PURE__ */ jsxs("label", { htmlFor: "terms", children: [
              "J'accepte les ",
              /* @__PURE__ */ jsx("a", { href: "/LegalMentions", target: "_blank", rel: "noopener noreferrer", children: "mentions légales" }),
              " et les ",
              /* @__PURE__ */ jsx("a", { href: "/PrivacyPolicy", target: "_blank", rel: "noopener noreferrer", children: "conditions d'utilisation" }),
              "."
            ] })
          ] }),
          validationErrors.terms && /* @__PURE__ */ jsx("p", { className: "form__error", role: "alert", children: validationErrors.terms })
        ] }),
        error && /* @__PURE__ */ jsx("p", { className: "form__error", role: "alert", children: error }),
        success === true && /* @__PURE__ */ jsx("p", { className: "form__success", role: "status", children: "Votre message a bien été envoyé 🎉" }),
        success === false && /* @__PURE__ */ jsx("p", { className: "form__error", role: "alert", children: "Erreur lors de l'envoi du formulaire." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: `contact__button button button-red ${isFormValid ? "" : "button-disabled"}`,
            "aria-label": "Envoyer le formulaire de contact",
            disabled: !isFormValid,
            children: "Envoyer"
          }
        )
      ] })
    ] })
  ] }) });
}

function LazyFadeIn({
  children,
  className = ""
}) {
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const page = typeof document !== "undefined" ? document.body.dataset.page : "";
    if (page === "contact") {
      setIsVisible(true);
      return;
    }
    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInView) {
        setIsVisible(true);
      } else {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.disconnect();
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(el);
      }
    });
  }, []);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: wrapperRef,
      className: `fade-in-section ${isVisible ? "is-visible" : ""} ${className}`,
      children
    }
  );
}

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer> ${renderComponent($$result, "LazyFadeIn", LazyFadeIn, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@partials/performance/LazyFadeIn", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` <div class="wrapper-982 "> <section id="contact__info" class="contact__info section-height90"> <h2 class="title">Contactez-moi</h2> <p>Pour toutes informations, voici les coordonnées de SBG Coaching :</p> <ul aria-label="Mes différents moyens de contact"> <li class="contact__info__item contact__info__mail"> <a href="mailto:info@sbg.be" class="contact__link link-underline-replay ">info@sbg.be</a> </li> <li class="contact__info__item contact__info__phone"> <a href="tel:0494205075" class="contact__link">0494 20 50 75</a> </li> <li class="contact__info__item contact__info__map">
Route de Yernée 264, 4480 Engis
</li> </ul> <div class="contact__info__iframe"> <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2535.447894064328!2d5.338040776833654!3d50.544440180591536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c1aabcf7c0482d%3A0xf7bb9c0d8fdde17c!2sRte%20de%20Yern%C3%A9e%20264%2C%204480%20Engis%2C%20Belgique!5e0!3m2!1sfr!2sfr!4v1737715092033!5m2!1sfr!2sfr" width="100%" height="450" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> </div> <div class="contact__info__social"> <p>Rejoignez-nous !</p> ${renderComponent($$result2, "LinksSocial", LinksSocial, { "variant": "black" })} </div> </section> </div> ` })} <!-- 📨 Formulaire React dynamique --> ${renderComponent($$result, "LazyFadeIn", LazyFadeIn, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@partials/performance/LazyFadeIn", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ContactForm", ContactForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@partials/components/ContactForm.tsx", "client:component-export": "default" })} ` })} ${renderComponent($$result, "LazyFadeIn", LazyFadeIn, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@partials/performance/LazyFadeIn", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` <div class="wrapper-982 "> <section class="footer__nav"> <img src="/img/logo-black.svg" alt="logo de l'entreprise SBG Coaching" class="footer__logo"> <div class="footer__nav-col1"> <h2 class="footer__nav__slogan">
le seul mauvais entraînement est celui que l’on ne fait pas
</h2> <p>
Votre corps mérite l'effort, votre esprit mérite la discipline.
          Ensemble, nous transformerons chaque excuse en une victoire personnelle.
          Faites le premier pas, le reste suivra.
</p> </div> <nav class="footer__nav-col2"> <ul class="footer__nav__coaching"> <h3>Coaching</h3> <li><a href="/entreprise" class="link-underline-appear">Entreprise</a></li> <li><a href="/general" class="link-underline-appear">Général</a></li> <li><a href="/program" class="link-underline-appear">Programmes</a></li> </ul> <ul class="footer__nav__informations"> <h3>Informations</h3> <li class="nav__informations__item1"><a href="/" class="link-underline-appear">Accueil</a></li> <li class="nav__informations__item2"><a href="/about" class="link-underline-appear">À propos</a></li> <li class="nav__informations__item3"><a href="/testimonials" class="link-underline-appear">Témoignages</a></li> <li class="nav__informations__item4"><a href="/contact" class="link-underline-appear">Contact</a></li> <li class="footer__nav__rdv"> <a href="/contact" class="link-underline-replay"><strong>Prise de rendez-vous</strong></a> </li> </ul> </nav> <div class="footer__nav-col3"> <p class="footer__copyright">&copy; SBG Coaching 2025</p> <div class="footer__legal"> <a href="/LegalMentions" class="link-underline-appear">Mentions légales</a> <a href="/PrivacyPolicy" class="link-underline-appear">Conditions d'utilisation</a> </div> ${renderComponent($$result2, "LinksSocial", LinksSocial, { "variant": "black" })} </div> </section> </div> ` })} </footer>`;
}, "C:/client/SBG_Coaching - v2/src/partials/components/Footer.astro", void 0);

const $$FooterMenu = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer> <div class="wrapper-1440"> <section class="footer__nav" aria-label="Navigation pied de page"> <img src="/img/logo-black.svg" alt="logo de l'entreprise SBG Coaching" class="footer__logo"> <div class="footer__nav-col1"> <h2 class="footer__nav__slogan">
le seul mauvais entraînement est celui que l’on ne fait pas
</h2> <p>
Votre corps mérite l'effort, votre esprit mérite la discipline.
          Ensemble, nous transformerons chaque excuse en une victoire personnelle.
          Faites le premier pas, le reste suivra.
</p> </div> <nav class="footer__nav-col2" aria-label="Liens principaux"> <ul class="footer__nav__coaching"> <h3>Coaching</h3> <li><a href="/entreprise" class="link-underline-appear">Entreprise</a></li> <li><a href="/general" class="link-underline-appear">Général</a></li> <li><a href="/program" class="link-underline-appear">Programmes</a></li> </ul> <ul class="footer__nav__informations"> <h3>Informations</h3> <li class="nav__informations__item1"><a href="/" class="link-underline-appear">Accueil</a></li> <li class="nav__informations__item2"><a href="/about" class="link-underline-appear">À propos</a></li> <li class="nav__informations__item3"><a href="/testimonials" class="link-underline-appear">Témoignages</a></li> <li class="nav__informations__item4"><a href="/contact" class="link-underline-appear">Contact</a></li> <li class="footer__nav__rdv"> <a href="/contact" class="link-underline-replay"><strong>Prise de rendez-vous</strong></a> </li> </ul> </nav> <div class="footer__nav-col3"> <p class="footer__copyright">&copy; SBG Coaching 2025</p> <div class="footer__legal"> <a href="/LegalMentions" class="link-underline-appear">Mentions légales</a> <a href="/PrivacyPolicy" class="link-underline-appear">Conditions d'utilisation</a> </div> ${renderComponent($$result, "LinksSocial", LinksSocial, { "variant": "black" })} </div> </section> </div> </footer>`;
}, "C:/client/SBG_Coaching - v2/src/partials/components/FooterMenu.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$Seo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Seo;
  const {
    title,
    description,
    url,
    image = "/img/og-home.jpg",
    schemaType = "LocalBusiness"
  } = Astro2.props;
  const siteName = "SBG Coaching";
  const fullImageUrl = `https://sbgcoaching.be${image}`;
  return renderTemplate(_a || (_a = __template(['<!-- Canonical --><link rel="canonical"', '><!-- Open Graph --><meta property="og:type" content="website"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:url"', '><meta property="og:image"', '><meta property="og:site_name"', '><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- Schema.org JSON-LD --><script type="application/ld+json">\n  {JSON.stringify({\n    "@context": "https://schema.org",\n    "@type": schemaType,\n    name: siteName,\n    url,\n    logo: `https://sbgcoaching.be${logoUrl}`,\n    image: fullImageUrl,\n    description,\n    address: {\n      "@type": "PostalAddress",\n      addressCountry: "BE"\n    },\n    contactPoint: {\n      "@type": "ContactPoint",\n      email: "contact@sbgcoaching.be",\n      contactType: "customer support"\n    },\n    sameAs: [\n      "https://www.instagram.com/toncompte",\n      "https://www.facebook.com/toncompte",\n      "https://www.linkedin.com/in/tonprofil"\n    ]\n  })}\n<\/script>'], ['<!-- Canonical --><link rel="canonical"', '><!-- Open Graph --><meta property="og:type" content="website"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:url"', '><meta property="og:image"', '><meta property="og:site_name"', '><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- Schema.org JSON-LD --><script type="application/ld+json">\n  {JSON.stringify({\n    "@context": "https://schema.org",\n    "@type": schemaType,\n    name: siteName,\n    url,\n    logo: \\`https://sbgcoaching.be\\${logoUrl}\\`,\n    image: fullImageUrl,\n    description,\n    address: {\n      "@type": "PostalAddress",\n      addressCountry: "BE"\n    },\n    contactPoint: {\n      "@type": "ContactPoint",\n      email: "contact@sbgcoaching.be",\n      contactType: "customer support"\n    },\n    sameAs: [\n      "https://www.instagram.com/toncompte",\n      "https://www.facebook.com/toncompte",\n      "https://www.linkedin.com/in/tonprofil"\n    ]\n  })}\n<\/script>'])), addAttribute(url, "href"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(url, "content"), addAttribute(fullImageUrl, "content"), addAttribute(siteName, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(fullImageUrl, "content"));
}, "C:/client/SBG_Coaching - v2/src/partials/components/Seo.astro", void 0);

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title,
    description,
    pageClass,
    dataPage,
    dataModules,
    dataVariant = "white",
    seo
  } = Astro2.props;
  return renderTemplate`<html lang="fr"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title>${description && renderTemplate`<meta name="description"${addAttribute(description, "content")}>`}${seo && renderTemplate`${renderComponent($$result, "Seo", $$Seo, { "title": title, "description": description ?? "", "url": seo.url, "image": seo.image, "schemaType": seo.schemaType, "slot": "head" })}`}${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body${addAttribute(pageClass ?? "", "class")}${addAttribute(dataPage ?? "", "data-page")}${addAttribute(dataModules ?? "", "data-module")}${addAttribute(dataVariant, "data-variant")}> ${renderComponent($$result, "Menu", Menu, { "client:visible": true, "variant": dataVariant, "client:component-hydration": "visible", "client:component-path": "@partials/components/Menu", "client:component-export": "default" })} ${renderSlot($$result, $$slots["default"])} ${["legal", "privacy-policy", "thanks", "program"].includes(dataPage ?? "") ? renderTemplate`${renderComponent($$result, "FooterMenu", $$FooterMenu, {})}` : dataPage === "contact" ? null : renderTemplate`${renderComponent($$result, "Footer", $$Footer, {})}`} <link rel="stylesheet" href="/style/css/main.css"> </body></html>`;
}, "C:/client/SBG_Coaching - v2/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, ContactForm as C, LinksSocial as L, LazyFadeIn as a, companyInfos as c, testimonials as t };
