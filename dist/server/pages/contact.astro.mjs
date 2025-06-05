import { c as createComponent, a as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DW3zcPNd.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, L as LinksSocial, C as ContactForm } from '../chunks/BaseLayout_Bw84QKvE.mjs';
export { renderers } from '../renderers.mjs';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Contact | SBG Coaching \xE0 Li\xE8ge", "description": "Besoin d'un coaching sportif personnalis\xE9 ou d'une intervention en entreprise ? Contactez SBG Coaching \xE0 Li\xE8ge et obtenez une r\xE9ponse rapide et adapt\xE9e \xE0 vos objectifs de sant\xE9 et performance.", "pageClass": "page__contact", "dataPage": "contact", "dataVariant": "black", "dataModules": "links scrollReveal", "seo": {
    url: "https://sbgcoaching.be/contact",
    /* image: "/img/og-contact.jpg", */
    // à créer pour la page contact
    schemaType: "LocalBusiness"
  } }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main"> <div class="wrapper-982 "> <section id="contact__info" class="contact__info section-height90"> <h2 class="title">Contactez-moi</h2> <p>Pour toutes informations, voici les coordonnées de SBG Coaching :</p> <ul aria-label="Mes différents moyens de contact"> <li class="contact__info__item contact__info__mail"> <a href="mailto:info@sbg.be" class="contact__link link-underline-replay ">info@sbg.be</a> </li> <li class="contact__info__item contact__info__phone"> <a href="tel:0494205075" class="contact__link">0494 20 50 75</a> </li> <li class="contact__info__item contact__info__map">
Route de Yernée 264, 4480 Engis
</li> </ul> <div class="contact__info__iframe"> <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2535.447894064328!2d5.338040776833654!3d50.544440180591536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c1aabcf7c0482d%3A0xf7bb9c0d8fdde17c!2sRte%20de%20Yern%C3%A9e%20264%2C%204480%20Engis%2C%20Belgique!5e0!3m2!1sfr!2sfr!4v1737715092033!5m2!1sfr!2sfr" width="100%" height="450" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> </div> <div class="contact__info__social"> <p>Rejoignez-nous !</p> ${renderComponent($$result2, "LinksSocial", LinksSocial, { "variant": "black" })} </div> </section> </div> <!-- 📨 Formulaire React dynamique --> ${renderComponent($$result2, "ContactForm", ContactForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@partials/components/ContactForm.tsx", "client:component-export": "default" })} <div class="wrapper-982 "> <section class="footer__nav"> <img src="/img/logo-black.svg" alt="logo de l'entreprise SBG Coaching" class="footer__logo"> <div class="footer__nav-col1"> <h2 class="footer__nav__slogan">
le seul mauvais entraînement est celui que l’on ne fait pas
</h2> <p>
Votre corps mérite l'effort, votre esprit mérite la discipline.
          Ensemble, nous transformerons chaque excuse en une victoire personnelle.
          Faites le premier pas, le reste suivra.
</p> </div> <nav class="footer__nav-col2"> <ul class="footer__nav__coaching"> <h3>Coaching</h3> <li><a href="/entreprise" class="link-underline-appear">Entreprise</a></li> <li><a href="/general" class="link-underline-appear">Général</a></li> <li><a href="/program" class="link-underline-appear">Programmes</a></li> </ul> <ul class="footer__nav__informations"> <h3>Informations</h3> <li class="nav__informations__item1"><a href="/" class="link-underline-appear">Accueil</a></li> <li class="nav__informations__item2"><a href="/about" class="link-underline-appear">À propos</a></li> <li class="nav__informations__item3"><a href="/testimonials" class="link-underline-appear">Témoignages</a></li> <li class="nav__informations__item4"><a href="/contact" class="link-underline-appear">Contact</a></li> <li class="footer__nav__rdv"> <a href="/contact" class="link-underline-replay"><strong>Prise de rendez-vous</strong></a> </li> </ul> </nav> <div class="footer__nav-col3"> <p class="footer__copyright">&copy; SBG Coaching 2025</p> <div class="footer__legal"> <a href="/LegalMentions" class="link-underline-appear">Mentions légales</a> <a href="/PrivacyPolicy" class="link-underline-appear">Conditions d'utilisation</a> </div> ${renderComponent($$result2, "LinksSocial", LinksSocial, { "variant": "black" })} </div> </section> </div> </main> ` })}`;
}, "C:/client/SBG_Coaching - v2/src/pages/contact.astro", void 0);

const $$file = "C:/client/SBG_Coaching - v2/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
